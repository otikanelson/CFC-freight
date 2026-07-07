import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GlassmorphismBackgroundProps extends ViewProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  overlay?: boolean;
}

export default function GlassmorphismBackground({ 
  children, 
  variant = 'primary',
  overlay = true,
  style,
  ...props 
}: GlassmorphismBackgroundProps) {
  
  const gradientColors = {
    primary: ['#DC2626', '#B91C1C', '#991B1B'] as const,
    secondary: ['#DC2626', '#7C3AED', '#5B21B6'] as const,
    accent: ['#EF4444', '#F97316', '#DC2626'] as const,
  };

  const overlayColors = {
    primary: ['rgba(220, 38, 38, 0.9)', 'rgba(185, 28, 28, 0.7)', 'rgba(153, 27, 27, 0.8)'] as const,
    secondary: ['rgba(220, 38, 38, 0.9)', 'rgba(124, 58, 237, 0.8)', 'rgba(91, 33, 182, 0.9)'] as const,
    accent: ['rgba(239, 68, 68, 0.9)', 'rgba(249, 115, 22, 0.8)', 'rgba(220, 38, 38, 0.9)'] as const,
  };

  return (
    <View style={[styles.container, style]} {...props}>
      <LinearGradient
        colors={gradientColors[variant]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.absoluteFill}
      />
      
      {overlay && (
        <LinearGradient
          colors={overlayColors[variant]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.absoluteFill}
        />
      )}
      
      <View style={styles.glassOverlay} />
      
      <View style={styles.contentContainer}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  glassOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
    zIndex: 10,
  },
});