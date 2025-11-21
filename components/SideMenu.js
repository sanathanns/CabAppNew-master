import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { useNavigate } from 'react-router-native';

export function SideMenu({ visible, onClose }) {
  const navigate = useNavigate();

  const menuItems = [
    { id: '1', icon: 'home', title: 'Home', route: '/' },
    { id: '2', icon: 'time', title: 'My Rides', route: '/activity' },
    { id: '3', icon: 'person', title: 'Profile', route: '/profile' },
    { id: '4', icon: 'card', title: 'Payment Methods', route: '/profile' },
    { id: '5', icon: 'settings', title: 'Settings', route: '/profile' },
    { id: '6', icon: 'shield-checkmark', title: 'Safety', route: '/profile' },
    { id: '7', icon: 'notifications', title: 'Notifications', route: '/profile' },
    { id: '8', icon: 'help-circle', title: 'Help & Support', route: '/profile' },
    { id: '9', icon: 'information-circle', title: 'About', route: '/profile' }
  ];

  const handleMenuPress = (route) => {
    onClose();
    setTimeout(() => navigate(route), 300);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={onClose}
        />
        
        <View style={styles.menuContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.profileSection}>
                <View style={styles.avatar}>
                  <Ionicons name="person" size={32} color="#fff" />
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.userName}>Sanathan NS</Text>
                  <Text style={styles.userEmail}>sanathan@example.com</Text>
                  <View style={styles.ratingBadge}>
                    <Ionicons name="star" size={12} color="#F59E0B" />
                    <Text style={styles.ratingText}>4.9</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Stats */}
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>24</Text>
                <Text style={styles.statLabel}>Trips</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>₹2,400</Text>
                <Text style={styles.statLabel}>Saved</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>5</Text>
                <Text style={styles.statLabel}>Favorites</Text>
              </View>
            </View>

            {/* Menu Items */}
            <View style={styles.menuList}>
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.menuItem}
                  onPress={() => handleMenuPress(item.route)}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuIconContainer}>
                    <Ionicons name={item.icon} size={22} color={theme.colors.primary} />
                  </View>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Ionicons name="chevron-forward" size={20} color={theme.colors.muted} />
                </TouchableOpacity>
              ))}
            </View>

            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8}>
              <Ionicons name="log-out-outline" size={22} color={theme.colors.danger} />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>

            <View style={{ height: 40 }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: theme.colors.overlay
  },
  backdrop: {
    flex: 1
  },
  menuContainer: {
    width: '80%',
    maxWidth: 320,
    backgroundColor: '#fff',
    ...theme.shadows.large
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)'
  },
  profileInfo: {
    marginLeft: 14,
    flex: 1
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
    letterSpacing: -0.3
  },
  userEmail: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
    marginBottom: 8
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start'
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#fff',
    marginLeft: 4
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border
  },
  statItem: {
    flex: 1,
    alignItems: 'center'
  },
  statValue: {
    fontSize: 20,
    fontWeight: '900',
    color: theme.colors.text,
    marginBottom: 4,
    letterSpacing: -0.5
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: theme.colors.border
  },
  menuList: {
    paddingTop: 12
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
    letterSpacing: -0.3
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: theme.colors.danger
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.danger,
    marginLeft: 8
  }
});
