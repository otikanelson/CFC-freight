import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface TabItem {
  id: string;
  label: string;
  icon?: string; // You can use icon fonts or replace with Image component
}

interface GlassBottomTabProps {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (tabId: string) => void;
}

export default function GlassBottomTab({ tabs, activeTab, onTabPress }: GlassBottomTabProps) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          'rgba(255, 255, 255, 0.15)',
          'rgba(255, 255, 255, 0.08)',
          'rgba(255, 255, 255, 0.03)'
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.glassContainer}
      >
        <View style={styles.tabsWrapper}>
          {tabs.map((tab, index) => {
            const isActive = tab.id === activeTab;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[styles.tab, isActive && styles.activeTab]}
                onPress={() => onTabPress(tab.id)}
                activeOpacity={0.7}
              >
                {isActive && (
                  <LinearGradient
                    colors={[
                      'rgba(255, 255, 255, 0.25)',
                      'rgba(255, 255, 255, 0.15)',
                      'rgba(255, 255, 255, 0.08)'
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.activeBackground}
                  />
                )}
                
                {/* Icon placeholder - replace with actual icons */}
                <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
                  <Text style={[styles.icon, isActive && styles.activeIcon]}>
                    {tab.icon || '●'}
                  </Text>
                </View>
                
                <Text style={[styles.label, isActive && styles.activeLabel]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        
        {/* Frosted glass effect overlay */}
        <View style={styles.frostOverlay} />
      </LinearGradient>
      
      {/* Subtle border */}
      <View style={styles.border} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 34, // Safe area for iOS
  },
  glassContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
    overflow: 'hidden',
  },
  tabsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 16,
    position: 'relative',
  },
  activeTab: {
    // Active tab styling handled by gradient background
  },
  activeBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  activeIconContainer: {
    // Additional styling for active icon container if needed
  },
  icon: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  activeIcon: {
    color: '#ffffff',
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  activeLabel: {
    color: '#ffffff',
    fontWeight: '600',
  },
  frostOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 24,
  },
  border: {
    position: 'absolute',
    top: 0,
    left: 16,
    right: 16,
    bottom: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    pointerEvents: 'none',
  },
});