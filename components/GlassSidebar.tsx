import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { height } = Dimensions.get('window');

interface SidebarItem {
  id: string;
  label: string;
  icon?: string;
  badge?: number;
}

interface GlassSidebarProps {
  items: SidebarItem[];
  activeItem: string;
  onItemPress: (itemId: string) => void;
  isVisible: boolean;
  onClose: () => void;
}

export default function GlassSidebar({ 
  items, 
  activeItem, 
  onItemPress, 
  isVisible, 
  onClose 
}: GlassSidebarProps) {
  const slideAnimation = React.useRef(new Animated.Value(isVisible ? 0 : -300)).current;

  React.useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: isVisible ? 0 : -300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <TouchableOpacity 
        style={styles.backdrop} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View style={styles.backdropGradient} />
      </TouchableOpacity>

      {/* Sidebar */}
      <Animated.View 
        style={[
          styles.container,
          {
            transform: [{ translateX: slideAnimation }]
          }
        ]}
      >
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0.18)',
            'rgba(255, 255, 255, 0.12)',
            'rgba(255, 255, 255, 0.06)'
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.glassContainer}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Menu</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            {items.map((item, index) => {
              const isActive = item.id === activeItem;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.menuItem, isActive && styles.activeMenuItem]}
                  onPress={() => {
                    onItemPress(item.id);
                    onClose();
                  }}
                  activeOpacity={0.7}
                >
                  {isActive && (
                    <LinearGradient
                      colors={[
                        'rgba(255, 255, 255, 0.25)',
                        'rgba(255, 255, 255, 0.15)',
                        'rgba(255, 255, 255, 0.08)'
                      ]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.activeBackground}
                    />
                  )}
                  
                  <View style={styles.menuItemContent}>
                    {/* Icon */}
                    <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
                      <Text style={[styles.icon, isActive && styles.activeIcon]}>
                        {item.icon || '◆'}
                      </Text>
                    </View>
                    
                    {/* Label */}
                    <Text style={[styles.menuLabel, isActive && styles.activeMenuLabel]}>
                      {item.label}
                    </Text>
                    
                    {/* Badge */}
                    {item.badge && item.badge > 0 && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                          {item.badge > 99 ? '99+' : item.badge.toString()}
                        </Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.footerDivider} />
            <TouchableOpacity style={styles.footerItem}>
              <Text style={styles.footerText}>Settings</Text>
            </TouchableOpacity>
          </View>
          
          {/* Frosted glass effect overlay */}
          <View style={styles.frostOverlay} />
        </LinearGradient>
        
        {/* Subtle border */}
        <View style={styles.border} />
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 998,
  },
  backdropGradient: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 280,
    zIndex: 999,
    paddingTop: 60, // Status bar padding
    paddingBottom: 34, // Safe area
  },
  glassContainer: {
    flex: 1,
    marginLeft: 16,
    marginRight: 8,
    marginVertical: 16,
    borderRadius: 24,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: 'bold',
  },
  menuContainer: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    marginHorizontal: 12,
    marginVertical: 4,
    borderRadius: 16,
    position: 'relative',
  },
  activeMenuItem: {
    // Active styling handled by gradient background
  },
  activeBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  activeIconContainer: {
    // Additional styling if needed
  },
  icon: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  activeIcon: {
    color: '#ffffff',
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  activeMenuLabel: {
    color: '#ffffff',
    fontWeight: '600',
  },
  badge: {
    backgroundColor: '#DC2626',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  footer: {
    paddingTop: 20,
  },
  footerDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 24,
    marginBottom: 16,
  },
  footerItem: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  footerText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  frostOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 24,
  },
  border: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 8,
    bottom: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    pointerEvents: 'none',
  },
});