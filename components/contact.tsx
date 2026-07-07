import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function ContactContent() {
  const GlassContainer = ({ children, style }) => (
    <LinearGradient
      colors={['rgba(255, 255, 255, 0.12)', 'rgba(255, 255, 255, 0.04)']}
      style={[styles.glass, style]}
    >
      {children}
    </LinearGradient>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Quick Action Interactive Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#DC2626' }]}>
          <Ionicons name="call" size={18} color="#ffffff" />
          <Text style={styles.actionButtonText}>Call Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#25D366' }]}>
          <Ionicons name="logo-whatsapp" size={18} color="#ffffff" />
          <Text style={styles.actionButtonText}>WhatsApp</Text>
        </TouchableOpacity>
      </View>

      {/* Services Offered Glass Panel */}
      <Text style={styles.sectionTitle}>Services Offered</Text>
      <GlassContainer style={styles.infoCard}>
        {['Custom Duty Processing', 'Logistics Management', 'Supply Chain Solutions'].map((service, i) => (
          <View key={i} style={styles.bulletRow}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.infoText}>{service}</Text>
          </View>
        ))}
      </GlassContainer>

      {/* Contact Metadata Panel */}
      <Text style={styles.sectionTitle}>Contact Information</Text>
      <GlassContainer style={styles.infoCard}>
        <View style={styles.itemRow}>
          <Ionicons name="call-outline" size={16} color="rgba(255,255,255,0.6)" />
          <Text style={styles.infoText}>+23490 3125 5504</Text>
        </View>
        <View style={styles.itemRow}>
          <Ionicons name="mail-outline" size={16} color="rgba(255,255,255,0.6)" />
          <Text style={styles.infoText}>documentation@cfcterminal.com</Text>
        </View>
        <View style={styles.itemRow}>
          <Ionicons name="globe-outline" size={16} color="rgba(255,255,255,0.6)" />
          <Text style={styles.linkText}>www.cfcterminal.com</Text>
        </View>
        <View style={styles.itemRow}>
          <Ionicons name="location-outline" size={16} color="rgba(255,255,255,0.6)" />
          <Text style={styles.infoText}>CFC Office HQ, 4 Ilorin Street, Surulere, Lagos State, Nigeria</Text>
        </View>
      </GlassContainer>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  actionRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
  },
  actionButtonText: { color: '#ffffff', fontWeight: '700', fontSize: 13 },
  sectionTitle: { color: '#ffffff', fontSize: 14, fontWeight: '600', marginTop: 8, marginBottom: 12, opacity: 0.8 },
  glass: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  infoCard: { padding: 16, gap: 12, marginBottom: 16 },
  bulletRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  bulletPoint: { color: '#DC2626', fontSize: 16 },
  itemRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  infoText: { color: 'rgba(255, 255, 255, 0.85)', fontSize: 12, lineHeight: 18, flex: 1 },
  linkText: { color: '#38BDF8', fontSize: 12, fontWeight: '600' }
});