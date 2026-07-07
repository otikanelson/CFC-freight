import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

interface CustomSplashScreenProps {
  onFinish: () => void;
}

export default function CustomSplashScreen({ onFinish }: CustomSplashScreenProps) {
  useEffect(() => {
    // 5 second duration as requested
    const timer = setTimeout(() => {
      onFinish();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/splash-icon.png')} 
        style={Platform.OS === 'android' ? styles.splashImageAndroid : styles.splashImageIOS}
        resizeMode={Platform.OS === 'android' ? 'cover' : 'cover'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  splashImageAndroid: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  splashImageIOS: {
    width: width,
    height: height,
  },
});