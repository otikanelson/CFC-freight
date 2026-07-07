import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function PolicyScreen() {
  const [activeTab, setActiveTab] = useState('terms');

  const termsContent = [
    { title: '1. Acceptance of Terms', body: 'By accessing or using our app, you agree to these Terms of Use and our Privacy Policy. If you do not agree with any part of these terms, you may not access or use our app.' },
    { title: '2. Use of the App', body: 'You may use our app for lawful purposes only and in accordance with these Terms of Use. You agree not to use our app for any illegal or unauthorized purpose.' },
    { title: '3. Account Registration', body: 'Some features of our app may require you to register for an account. When registering for an account, you agree to provide accurate, current, and complete information.' },
    { title: '4. Intellectual Property Rights', body: 'All content, systems, trademarks, and configurations deployed inside this software remain the unique exclusive property of CFC Freight systems.' }
  ];

  const privacyContent = [
    { title: '1. Information We Collect', body: 'We collect asset tracking metrics, location profiles data, and cargo logistics specifications required to run operational clearances smoothly.' },
    { title: '2. How We Use Information', body: 'Your data is strictly utilized to process customs clearance forms, calculate destination duties, and optimize delivery route management systems.' }
  ];

  const activeData = activeTab === 'terms' ? termsContent : privacyContent;

  const GlassContainer = ({ children, style }) => (
    <LinearGradient
      colors={['rgba(255, 255, 255, 0.12)', 'rgba(255, 255, 255, 0.04)']}
      style={[styles.glassCard, style]}
    >
      {children}
    </LinearGradient>
  );

  return (
    <LinearGradient colors={['#7A1B30', '#1A0033']} style={styles.container}>
      
      {/* Page Title Header */}
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Policy</Text>
      </View>

      {/* Segmented Control Selector Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'terms' && styles.activeTabButton]} 
          onPress={() => setActiveTab('terms')}
        >
          <Text style={[styles.tabLabel, activeTab === 'terms' && styles.activeTabLabel]}>Terms & Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'privacy' && styles.activeTabButton]} 
          onPress={() => setActiveTab('privacy')}
        >
          <Text style={[styles.tabLabel, activeTab === 'privacy' && styles.activeTabLabel]}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>

      {/* Dynamic Content Display Board */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.contentMainHeading}>
          {activeTab === 'terms' ? 'Terms & Conditions' : 'Privacy Policy'}
        </Text>
        
        <Text style={styles.introParagraph}>
          Welcome to CFC Freight App! By accessing or using our app, you agree to comply with and be bound by the following operational definitions. Please read these terms carefully.
        </Text>

        <GlassContainer style={styles.policyDocumentArea}>
          {activeData.map((section, index) => (
            <View key={index} style={styles.sectionBlock}>
              <Text style={styles.sectionBlockTitle}>{section.title}</Text>
              <Text style={styles.sectionBlockBody}>{section.body}</Text>
            </View>
          ))}
        </GlassContainer>
      </ScrollView>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60 },
  header: { paddingHorizontal: 20, marginBottom: 15 },
  screenTitle: { color: '#ffffff', fontSize: 24, fontWeight: '700' },
  tabBar: { flexDirection: 'row', marginHorizontal: 20, backgroundColor: 'rgba(255, 255, 255, 0.06)', borderRadius: 25, padding: 4, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', marginBottom: 20 },
  tabButton: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 22 },
  activeTabButton: { backgroundColor: '#DC2626' },
  tabLabel: { color: 'rgba(255, 255, 255, 0.5)', fontSize: 13, fontWeight: '600' },
  activeTabLabel: { color: '#ffffff', fontWeight: '700' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 110 },
  contentMainHeading: { color: '#ffffff', fontSize: 18, fontWeight: '700', marginBottom: 8 },
  introParagraph: { color: 'rgba(255, 255, 255, 0.65)', fontSize: 13, lineHeight: 20, marginBottom: 20 },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  policyDocumentArea: { padding: 20, gap: 20 },
  sectionBlock: { gap: 6 },
  sectionBlockTitle: { color: '#ffffff', fontSize: 14, fontWeight: '600' },
  sectionBlockBody: { color: 'rgba(255, 255, 255, 0.75)', fontSize: 13, lineHeight: 20 },
});