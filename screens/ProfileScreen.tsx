import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface ProfileScreenProps {
  onLogout: () => void;
}

export default function ProfileScreen({ onLogout }: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Somto Otika');
  const [description, setDescription] = useState('Software Engineer | Logistics & Operations Lead');

  const GlassContainer = ({ children, style }: { children: React.ReactNode; style?: any }) => (
    <LinearGradient
      colors={['rgba(255, 255, 255, 0.12)', 'rgba(255, 255, 255, 0.04)']}
      style={[styles.glass, style]}
    >
      {children}
    </LinearGradient>
  );

  return (
    <LinearGradient colors={['#7A1B30', '#1A0033']} style={styles.container}>
      
      {/* Stock Image Header Cap */}
      <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1000' }} 
        style={styles.heroImage}
        resizeMode="cover"
      >
        <LinearGradient 
          colors={['rgba(0, 0, 0, 0.1)', 'rgba(26, 0, 51, 0.85)', '#1A0033']} 
          style={StyleSheet.absoluteFillObject} 
        />
      </ImageBackground>

      {/* Profile Header Block */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity 
          style={styles.editBadge} 
          onPress={() => setIsEditing(!isEditing)}
        >
          <Ionicons name={isEditing ? "checkmark" : "create-outline"} size={16} color="#ffffff" />
          <Text style={styles.editBadgeText}>{isEditing ? "Save" : "Edit"}</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Info Form Area */}
      <View style={styles.contentArea}>
        <GlassContainer style={styles.profileCard}>
          
          {/* Avatar Placeholder */}
          <View style={styles.avatarContainer}>
            <LinearGradient colors={['#DC2626', '#7A1B30']} style={styles.avatarGradient}>
              <Ionicons name="person" size={40} color="#ffffff" />
            </LinearGradient>
          </View>

          {/* Editable Name Field */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Full Name</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
              />
            ) : (
              <Text style={styles.valueText}>{name}</Text>
            )}
          </View>

          {/* Editable Description Field */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Short Description</Text>
            {isEditing ? (
              <TextInput
                style={[styles.input, styles.multilineInput]}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={3}
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
              />
            ) : (
              <Text style={styles.valueText}>{description || "No description provided."}</Text>
            )}
          </View>

        </GlassContainer>

        {/* Reusable Glass Logout Button */}
        <TouchableOpacity onPress={onLogout} style={styles.logoutButtonContainer}>
          <GlassContainer style={styles.logoutCard}>
            <Ionicons name="log-out-outline" size={20} color="#DC2626" />
            <Text style={styles.logoutText}>Log Out</Text>
          </GlassContainer>
        </TouchableOpacity>
      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingTop: 60 
  },
  heroImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 240,
  },
  glass: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 25,
    zIndex: 2,
  },
  headerTitle: { 
    color: '#ffffff', 
    fontSize: 24, 
    fontWeight: '700' 
  },
  editBadge: { 
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.15)', 
    paddingHorizontal: 14, 
    paddingVertical: 6, 
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  editBadgeText: { 
    color: '#ffffff', 
    fontWeight: '600', 
    fontSize: 13 
  },
  contentArea: { 
    flex: 1,
    paddingHorizontal: 24,
    gap: 20,
  },
  profileCard: {
    padding: 24,
    alignItems: 'center',
    gap: 20,
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: 'hidden',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  avatarGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldGroup: {
    width: '100%',
    gap: 6,
  },
  label: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  valueText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 4,
  },
  input: {
    color: '#ffffff',
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 4,
  },
  multilineInput: {
    textAlignVertical: 'top',
  },
  logoutButtonContainer: {
    marginTop: 'auto', // Pushes the logout button to the absolute bottom of the content area
    marginBottom: 110, // Leaves clean space above the bottom tab navigation bar
  },
  logoutCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    gap: 8,
    borderColor: 'rgba(220, 38, 38, 0.3)',
  },
  logoutText: {
    color: '#DC2626',
    fontWeight: '700',
    fontSize: 15,
  },
});