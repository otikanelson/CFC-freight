import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ShipmentCardProps {
  trackingNumber: string;
  status: 'in-transit' | 'delivered' | 'pending' | 'delayed';
  destination: string;
  estimatedDelivery: string;
  onPress?: () => void;
}

const statusColors = {
  'in-transit': '#3B82F6',
  'delivered': '#10B981',
  'pending': '#F59E0B',
  'delayed': '#EF4444',
};

const statusLabels = {
  'in-transit': 'In Transit',
  'delivered': 'Delivered',
  'pending': 'Pending',
  'delayed': 'Delayed',
};

export default function ShipmentCard({ 
  trackingNumber, 
  status, 
  destination, 
  estimatedDelivery, 
  onPress 
}: ShipmentCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.trackingNumber}>{trackingNumber}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusColors[status] }]}>
          <Text style={styles.statusText}>{statusLabels[status]}</Text>
        </View>
      </View>
      
      <Text style={styles.destination}>To: {destination}</Text>
      <Text style={styles.delivery}>Est. Delivery: {estimatedDelivery}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  trackingNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#ffffff',
  },
  destination: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  delivery: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});