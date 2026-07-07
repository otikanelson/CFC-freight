import React, { useState, useRef } from 'react';
import { View, Text, Animated, Dimensions, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import GlassmorphismBackground from '../components/GlassmorphismBackground';
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';

const { width } = Dimensions.get('window');
const SCREEN_PADDING = 24;
const SLIDE_WIDTH = width - (SCREEN_PADDING * 2);

interface AuthScreenProps {
  onAuthSuccess: (isGuest?: boolean, user?: any) => void;
}

export default function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(false);
  const slideAnimation = useRef(new Animated.Value(0)).current;

  const toggleAuth = (toLogin: boolean) => {
    Animated.timing(slideAnimation, {
      toValue: toLogin ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsLogin(toLogin));
  };

  const handleAuthSuccess = (user: any) => {
    onAuthSuccess(false, user); // false means not guest mode
  };

  return (
    <GlassmorphismBackground variant="secondary">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container} bounces={false}>

          {/* Header Logo */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../assets/icon.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.companyName}>CFC FREIGHT</Text>
            <Text style={styles.tagline}>Your Trusted Logistics Partner</Text>
          </View>

          {/* Animated Form Container */}
          <View style={styles.formContainer}>
            <Animated.View
              style={[
                styles.formsWrapper,
                {
                  transform: [
                    {
                      translateX: slideAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -SLIDE_WIDTH],
                      }),
                    },
                  ],
                },
              ]}
            >
              {/* Sign Up Form */}
              <View style={styles.formSlide}>
                <SignUpForm onSwitchToLogin={() => toggleAuth(true)} onAuthSuccess={handleAuthSuccess} />
              </View>

              {/* Login Form */}
              <View style={styles.formSlide}>
                <LoginForm onSwitchToSignUp={() => toggleAuth(false)} onAuthSuccess={handleAuthSuccess} />
              </View>
            </Animated.View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </GlassmorphismBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#ffffff',
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  logoImage: {
    width: 70,
    height: 70,
  },
  companyName: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  tagline: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    textAlign: 'center',
  },
  formContainer: {
    overflow: 'hidden',
    width: SLIDE_WIDTH,
  },
  formsWrapper: {
    flexDirection: 'row',
    width: SLIDE_WIDTH * 2,
  },
  formSlide: {
    width: SLIDE_WIDTH,
  },
});