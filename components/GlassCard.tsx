import React from 'react';
import { View, ViewProps, StyleSheet, Platform } from 'react-native';

interface GlassCardProps extends ViewProps {
  children?: React.ReactNode;
  intensity?: 'light' | 'medium' | 'strong';
  bordered?: boolean;
}

export default function GlassCard({ 
  children, 
  intensity = 'medium',
  bordered = true,
  style,
  ...props 
}: GlassCardProps) {
  
  const intensityOpacity = {
    light: 0.1,
    medium: Platform.OS === 'android' ? 0.25 : 0.2,
    strong: Platform.OS === 'android' ? 0.35 : 0.3,
  };

  const cardStyle = [
    styles.base,
    Platform.OS === 'android' && styles.androidFloat,
    {
      backgroundColor: `rgba(255, 255, 255, ${intensityOpacity[intensity]})`,
    },
    bordered && styles.bordered,
    style
  ];

  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  androidFloat: {
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  bordered: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
});