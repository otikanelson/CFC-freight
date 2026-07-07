import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// Import all screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SupportScreen from '../screens/SupportScreen';
import PolicyScreen from '../screens/PolicyScreen';

const { width } = Dimensions.get('window');

interface AppNavigatorProps {
  onLogout: () => void;
  user?: any;
}

export default function AppNavigator({ onLogout, user }: AppNavigatorProps) {
  const [activeBottomTab, setActiveBottomTab] = useState('Home');

  // Unified global bottom navigation config - dynamic icon selector mapping
  const bottomTabs = [
    { id: 'Home', label: 'Home', iconActive: 'home' as const, iconInactive: 'home-outline' as const },
    { id: 'Profile', label: 'Profile', iconActive: 'person' as const, iconInactive: 'person-outline' as const },
    { id: 'Support', label: 'Support', iconActive: 'help-circle' as const, iconInactive: 'help-circle-outline' as const },
    { id: 'Policy', label: 'Policy', iconActive: 'shield' as const, iconInactive: 'shield-outline' as const },
  ];

  // Screen renderer injecting the parent actions properly
  const renderScreen = () => {
    switch (activeBottomTab) {
      case 'Home':
        return <HomeScreen user={user} />;
      case 'Profile':
        return <ProfileScreen onLogout={onLogout} />;
      case 'Support':
        return <SupportScreen />;
      case 'Policy':
        return <PolicyScreen />;
      default:
        return <HomeScreen user={user} />;
    }
  };

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
      {/* Main Screen Content Outlet */}
      <View style={styles.screenContainer}>
        {renderScreen()}
      </View>

      {/* Global Bottom Glass Navigation Bar */}
      <GlassContainer style={styles.bottomBar}>
        {bottomTabs.map((tab) => {
          const isActive = activeBottomTab === tab.id;
          return (
            <TouchableOpacity 
              key={tab.id} 
              onPress={() => setActiveBottomTab(tab.id)}
              style={styles.bottomTabButton}
              activeOpacity={0.7}
            >
              <Ionicons 
                name={isActive ? tab.iconActive : tab.iconInactive} 
                size={22} 
                color={isActive ? '#DC2626' : 'rgba(255,255,255,0.6)'} 
              />
              <Text style={[styles.bottomTabLabel, { color: isActive ? '#DC2626' : 'rgba(255,255,255,0.6)' }]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </GlassContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A0033', // Deep theme fallback backdrop
  },
  screenContainer: {
    flex: 1,
  },
  glass: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 24,
    position: 'absolute',
    bottom: 0,
    width: width - 32,
    zIndex: 99, // Ensures navigation layer registers touch events flawlessly
  },
  bottomTabButton: { 
    alignItems: 'center',
    flex: 1,
    paddingVertical: 4,
  },
  bottomTabLabel: { 
    fontSize: 11, 
    marginTop: 2, 
    fontWeight: '500' 
  },
});