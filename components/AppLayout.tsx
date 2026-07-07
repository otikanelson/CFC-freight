import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// Import all screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SupportScreen from '../screens/SupportScreen';
import PolicyScreen from '../screens/PolicyScreen';

const { width } = Dimensions.get('window');
const TAB_WIDTH = (width - 64) / 4;

export default function AppNavigator() {
  const [activeBottomTab, setActiveBottomTab] = useState('Home');
  const slideAnimation = useRef(new Animated.Value(0)).current;

  // Bottom navigation configuration
  const bottomTabs = [
    { id: 'Home', label: 'Home', iconActive: 'home' as const, iconInactive: 'home-outline' as const },
    { id: 'Profile', label: 'Profile', iconActive: 'person' as const, iconInactive: 'person-outline' as const },
    { id: 'Support', label: 'Support', iconActive: 'help-circle' as const, iconInactive: 'help-circle-outline' as const },
    { id: 'Policy', label: 'Policy', iconActive: 'shield' as const, iconInactive: 'shield-outline' as const },
  ];

  // Animate slide when tab changes
  useEffect(() => {
    const tabIndex = bottomTabs.findIndex(tab => tab.id === activeBottomTab);
    Animated.spring(slideAnimation, {
      toValue: tabIndex * TAB_WIDTH,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  }, [activeBottomTab]);

  // Screen renderer
  const renderScreen = () => {
    switch (activeBottomTab) {
      case 'Home':
        return <HomeScreen user={undefined} />;
      case 'Profile':
        return <ProfileScreen onLogout={undefined} />;
      case 'Support':
        return <SupportScreen />;
      case 'Policy':
        return <PolicyScreen />;
      default:
        return <HomeScreen user={undefined} />;
    }
  };

  // Glass Container for bottom navigation
  const GlassContainer = ({ children, style }) => (
    <LinearGradient
      colors={[
        'rgba(255, 255, 255, 0.15)',
        'rgba(255, 255, 255, 0.10)',
        'rgba(255, 255, 255, 0.05)',
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.glass, style]}
    >
      {children}
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      {/* Main Screen Content */}
      <View style={styles.screenContainer}>
        {renderScreen()}
      </View>

      {/* Bottom Glass Navigation Bar with Sliding Circle */}
      <View style={styles.bottomBarContainer}>
        <GlassContainer style={styles.bottomBar}>
          {/* Animated Glass Circle Background */}
          <Animated.View
            style={[
              styles.activeCircle,
              {
                transform: [{ translateX: slideAnimation }],
              },
            ]}
          >
            <LinearGradient
              colors={[
                'rgba(255, 255, 255, 0.25)',
                'rgba(255, 255, 255, 0.15)',
                'rgba(255, 255, 255, 0.08)',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.circleGradient}
            />
          </Animated.View>

          {/* Tab Buttons */}
          {bottomTabs.map((tab, index) => {
            const isActive = activeBottomTab === tab.id;
            return (
              <TouchableOpacity 
                key={tab.id} 
                onPress={() => setActiveBottomTab(tab.id)}
                style={[styles.bottomTabButton, { width: TAB_WIDTH }]}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={isActive ? tab.iconActive : tab.iconInactive} 
                  size={22} 
                  color={isActive ? '#ffffff' : 'rgba(255,255,255,0.6)'} 
                />
                <Text style={[styles.bottomTabLabel, { color: isActive ? '#ffffff' : 'rgba(255,255,255,0.6)' }]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </GlassContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
  },
  glass: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 34, // Safe area for iOS
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    position: 'relative',
  },
  activeCircle: {
    position: 'absolute',
    top: 8,
    left: 4,
    width: TAB_WIDTH - 8,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  circleGradient: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  bottomTabButton: { 
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    zIndex: 1,
  },
  bottomTabLabel: { 
    fontSize: 11, 
    marginTop: 2, 
    fontWeight: '500' 
  },
});