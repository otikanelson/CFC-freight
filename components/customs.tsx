import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CustomsContent({ selectedProcess, onSelect }) {
  const processes = [
    'CUSTOM_DUTY_PROCESSING',
    'OTHER PAYMENT'
  ];

  const GlassContainer = ({ children, isSelected }) => (
    <LinearGradient
      colors={['rgba(255, 255, 255, 0.12)', 'rgba(255, 255, 255, 0.04)']}
      style={[styles.glassCard, isSelected && styles.selectedCard]}
    >
      {children}
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Select customs option</Text>
      {processes.map((item, index) => {
        const isSelected = selectedProcess === item;
        return (
          <TouchableOpacity key={index} onPress={() => onSelect(item)}>
            <GlassContainer isSelected={isSelected}>
              <Text style={[styles.processText, isSelected && styles.selectedProcessText]}>
                {item}
              </Text>
              <View style={[styles.radioCircle, isSelected && styles.radioCircleActive]} />
            </GlassContainer>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  sectionTitle: { color: '#ffffff', fontSize: 14, fontWeight: '600', marginBottom: 16, opacity: 0.8 },
  glassCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingHorizontal: 18,
    marginBottom: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  selectedCard: { backgroundColor: 'rgba(255, 255, 255, 0.15)', borderColor: '#ffffff' },
  processText: { color: 'rgba(255, 255, 255, 0.8)', fontWeight: '600', fontSize: 12 },
  selectedProcessText: { color: '#ffffff' },
  radioCircle: { width: 16, height: 16, borderRadius: 8, borderWidth: 2, borderColor: 'rgba(255, 255, 255, 0.3)' },
  radioCircleActive: { borderColor: '#ffffff', backgroundColor: '#ffffff' },
});