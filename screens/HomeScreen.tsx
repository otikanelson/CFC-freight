import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ClearingContent from '../components/clearing';
import LogisticsContent from '../components/logistics';
import CustomsContent from '../components/customs';
import ContactContent from '../components/contact';

const { width } = Dimensions.get('window');

interface HomeScreenProps {
  user?: {
    fullName?: string;
  };
}

// Expects user object as a prop to keep the design secure and scalable
export default function HomeScreen({ user }: HomeScreenProps) {
  const [activeSideTab, setActiveSideTab] = useState('Clearing');
  const [selectedProcess, setSelectedProcess] = useState(null);

  const sideTabs = [
    { id: 'Clearing', label: 'Clearing', icon: 'briefcase' },
    { id: 'Logistics', label: 'Logistics', icon: 'car' },
    { id: 'Customs', label: 'Customs', icon: 'document-text' },
    { id: 'Contact', label: 'Contact', icon: 'call' },
  ];

  // Dynamic Content Dispatcher
  const renderDynamicContent = () => {
    switch (activeSideTab) {
      case 'Clearing':
        return <ClearingContent selectedProcess={selectedProcess} onSelect={setSelectedProcess} />;
      case 'Logistics':
        return <LogisticsContent selectedProcess={selectedProcess} onSelect={setSelectedProcess} />;
      case 'Customs':
        return <CustomsContent selectedProcess={selectedProcess} onSelect={setSelectedProcess} />;
      case 'Contact':
        return <ContactContent />;
      default:
        return null;
    }
  };

  return (
    <LinearGradient colors={['#7A1B30', '#1A0033']} style={styles.container}>
      {/* Background Header Cap */}
      <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1000' }} 
        style={styles.heroImage}
        resizeMode="cover"
      >
        <LinearGradient colors={['rgba(0, 0, 0, 0.1)', 'rgba(26, 0, 51, 0.85)', '#1A0033']} style={StyleSheet.absoluteFillObject} />
      </ImageBackground>

      {/* Header Profile Info Block */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome,</Text>
          {/* Robust fallback ensures a safe, non-crashing UI state */}
          <Text style={styles.userName}>{user?.fullName || 'Somto Otika'}</Text>
        </View>
        <View style={styles.logoBadge}><Text style={styles.logoBadgeText}>CFC</Text></View>
      </View>

      {/* Workspace Area Layout */}
      <View style={styles.workspace}>
        {/* Micro-Pill Navigation Sidebar */}
        <View style={styles.sidebar}>
          {sideTabs.map((tab) => {
            const isActive = activeSideTab === tab.id;
            return (
              <TouchableOpacity 
                key={tab.id} 
                onPress={() => {
                  setActiveSideTab(tab.id);
                  setSelectedProcess(null); // Clear selections on tab switch
                }}
                style={[styles.sideTabButton, isActive && styles.activeSidePill]}
              >
                <Ionicons name={isActive ? tab.icon : `${tab.icon}-outline`} size={18} color={isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.6)'} />
                <Text style={[styles.sideTabLabel, isActive && styles.activeSideText]} numberOfLines={1}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Workspace Display Outlet Container */}
        <View style={styles.contentArea}>
          {renderDynamicContent()}
        </View>
      </View>

      {/* Global Bottom Bar is removed from here! It's completely delegated to AppNavigator */}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60 },
  heroImage: { position: 'absolute', top: 0, left: 0, right: 0, height: 240 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 25, zIndex: 2 },
  welcomeText: { color: 'rgba(255, 255, 255, 0.6)', fontSize: 14 },
  userName: { color: '#ffffff', fontSize: 24, fontWeight: '700' },
  logoBadge: { backgroundColor: '#DC2626', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8 },
  logoBadgeText: { color: '#ffffff', fontWeight: 'bold', fontSize: 14 },
  workspace: { flex: 1, flexDirection: 'row', paddingHorizontal: 16, gap: 16, marginBottom: 110 }, // Generous bottom margin to stay perfectly clear of the glass tab bar overlay
  sidebar: { width: 58, alignItems: 'center', justifyContent: 'flex-start', gap: 14, paddingTop: 8 },
  sideTabButton: { alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.08)' },
  activeSidePill: { backgroundColor: '#DC2626', borderColor: 'rgba(255, 255, 255, 0.25)', shadowColor: '#DC2626', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  sideTabLabel: { fontSize: 8, marginTop: 2, color: 'rgba(255, 255, 255, 0.5)', fontWeight: '500', maxWidth: 50 },
  activeSideText: { color: '#ffffff', fontWeight: '700' },
  contentArea: { flex: 1 },
});