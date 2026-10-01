import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import SplashScreen from './screens/SplashScreen';
import CustomSplashScreen from './screens/CustomSplashScreen';
import AuthScreen from './screens/AuthScreen';
import AppNavigator from './components/AppNavigator';
import ErrorBoundary from './components/ErrorBoundary';
import { authService } from './services/authService';
import { getUser } from './services/storageService';

// Safe console logging for production
const safeLog = (...args) => {
  try {
    if (__DEV__ || console) {
      console.log(...args);
    }
  } catch (e) {
    // Silent fail
  }
};

const safeError = (...args) => {
  try {
    if (__DEV__ || console) {
      console.error(...args);
    }
  } catch (e) {
    // Silent fail
  }
};

const safeWarn = (...args) => {
  try {
    if (__DEV__ || console) {
      console.warn(...args);
    }
  } catch (e) {
    // Silent fail
  }
};

type AppState = 'splash' | 'customSplash' | 'auth' | 'main' | 'loading';

export default function App() {
  const [appState, setAppState] = useState<AppState>('loading');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  // Check for existing authentication on app start
  useEffect(() => {
    let isMounted = true;
    
    const checkAuthState = async () => {
      try {
        const isAuth = await authService.isAuthenticated();
        if (isMounted) {
          if (isAuth) {
            const user = await getUser();
            setIsAuthenticated(true);
            setUserData(user);
            setAppState('main');
          } else {
            setAppState('splash');
          }
        }
      } catch (error) {
        safeError('Auth check failed:', error);
        // If there's an error, clear any corrupted data and start fresh
        try {
          await authService.logout();
        } catch (logoutError) {
          safeError('Logout failed:', logoutError);
        }
        if (isMounted) {
          setAppState('splash');
        }
      }
    };

    // Add a timeout to prevent indefinite loading
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        safeWarn('Auth check timed out, showing splash');
        setAppState('splash');
      }
    }, 5000);

    checkAuthState().finally(() => {
      clearTimeout(timeoutId);
    });

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  // Handle splash screen completion
  const handleSplashComplete = () => {
    setAppState('customSplash');
  };

  // Handle custom splash screen completion
  const handleCustomSplashComplete = () => {
    setAppState('auth');
  };

  // Handle authentication success OR guest bypass
  const handleAuthSuccess = (isGuest?: boolean, user?: any) => {
    if (isGuest) {
      setIsGuestMode(true);
      setIsAuthenticated(false);
      setUserData({ fullName: 'Guest User' });
    } else {
      setIsGuestMode(false);
      setIsAuthenticated(true);
      setUserData(user);
    }
    setAppState('main');
  };

  // Handle logout
  const handleLogout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
    setIsGuestMode(false);
    setUserData(null);
    setAppState('auth');
  };

  // Show loading screen
  if (appState === 'loading') {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#DC2626" />
      </View>
    );
  }

  // Render current screen based on app state
  const renderCurrentScreen = () => {
    switch (appState) {
      case 'splash':
        return <SplashScreen onFinish={handleSplashComplete} />;
      case 'customSplash':
        return <CustomSplashScreen onFinish={handleCustomSplashComplete} />;
      case 'auth':
        return <AuthScreen onAuthSuccess={handleAuthSuccess} />;
      case 'main':
        return <AppNavigator onLogout={handleLogout} user={userData} />;
      default:
        return <SplashScreen onFinish={handleSplashComplete} />;
    }
  };

  return (
    <ErrorBoundary>
      <StatusBar style="light" />
      {renderCurrentScreen()}
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A0033',
  },
});