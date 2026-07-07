import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function SupportScreen() {
  const contactMethods = [
    { id: 'call', label: 'Call Us', icon: 'call-outline' as const, color: '#DC2626' },
    { id: 'email', label: 'Email Us', icon: 'mail-outline' as const, color: '#38BDF8' },
    { id: 'whatsapp', label: 'WhatsApp', icon: 'chatbubble-ellipses-outline' as const, color: '#25D366' },
  ];

  const faqs = [
    'How do I reset my password?',
    'Where can I find my transaction history?',
    'How do I contact customer support?',
    'What should I do if I encounter an error?',
    'How do I change my account settings?',
  ];

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
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Title */}
        <Text style={styles.screenTitle}>How can we help you?</Text>

        {/* Action Channels Row */}
        <View style={styles.channelsGrid}>
          {contactMethods.map((method) => (
            <TouchableOpacity key={method.id} style={styles.channelTouch}>
              <GlassContainer style={styles.channelCard}>
                <View style={[styles.iconWrapper, { backgroundColor: 'rgba(255,255,255,0.06)' }]}>
                  <Ionicons name={method.icon} size={22} color={method.color} />
                </View>
                <Text style={styles.channelLabel}>{method.label}</Text>
              </GlassContainer>
            </TouchableOpacity>
          ))}
        </View>

        {/* Review Banner Card */}
        <Text style={styles.sectionHeading}>Review</Text>
        <GlassContainer style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <Ionicons name="heart-circle-outline" size={24} color="#DC2626" />
            <Text style={styles.reviewTitle}>We value your feedback</Text>
          </View>
          <Text style={styles.bodyDescription}>
            We would love to hear your thoughts about our app! Please leave a review to help us constantly improve your logistics ecosystem.
          </Text>
          <TouchableOpacity style={styles.reviewButton}>
            <Text style={styles.reviewButtonText}>Write a Review</Text>
            <Ionicons name="arrow-forward" size={14} color="#ffffff" />
          </TouchableOpacity>
        </GlassContainer>

        {/* FAQ Section */}
        <Text style={styles.sectionHeading}>FAQ</Text>
        <GlassContainer style={styles.faqCard}>
          {faqs.map((faq, index) => (
            <TouchableOpacity key={index} style={[styles.faqItem, index === faqs.length - 1 && styles.noBorder]}>
              <View style={styles.faqRow}>
                <Text style={styles.faqNumber}>{index + 1}.</Text>
                <Text style={styles.faqText}>{faq}</Text>
                <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.3)" />
              </View>
            </TouchableOpacity>
          ))}
        </GlassContainer>

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 110 },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  screenTitle: { color: '#ffffff', fontSize: 24, fontWeight: '700', marginBottom: 25 },
  sectionHeading: { color: 'rgba(255, 255, 255, 0.5)', fontSize: 13, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.8, marginTop: 24, marginBottom: 12 },
  channelsGrid: { flexDirection: 'row', gap: 12 },
  channelTouch: { flex: 1 },
  channelCard: { paddingVertical: 20, alignItems: 'center', justifyContent: 'center', gap: 10 },
  iconWrapper: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  channelLabel: { color: '#ffffff', fontSize: 13, fontWeight: '600' },
  reviewCard: { padding: 20, gap: 12 },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  reviewTitle: { color: '#ffffff', fontSize: 15, fontWeight: '600' },
  bodyDescription: { color: 'rgba(255, 255, 255, 0.7)', fontSize: 13, lineHeight: 19 },
  reviewButton: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 6, backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginTop: 4 },
  reviewButtonText: { color: '#ffffff', fontSize: 12, fontWeight: '600' },
  faqCard: { paddingVertical: 8, paddingHorizontal: 16 },
  faqItem: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255, 255, 255, 0.06)' },
  noBorder: { borderBottomWidth: 0 },
  faqRow: { flexDirection: 'row', alignItems: 'center' },
  faqNumber: { color: '#DC2626', fontWeight: '700', width: 22, fontSize: 13 },
  faqText: { color: 'rgba(255, 255, 255, 0.85)', fontSize: 13, flex: 1, fontWeight: '500' },
});