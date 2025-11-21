import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { theme } from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { SideMenu } from '../components/SideMenu';

export function ProfileScreen() {
  const [menuVisible, setMenuVisible] = useState(false);

  const menuItems = [
    { id: '1', icon: 'card-outline', title: 'Payment Methods', subtitle: 'Manage your payment options' },
    { id: '2', icon: 'settings-outline', title: 'Ride Preferences', subtitle: 'Customize your experience' },
    { id: '3', icon: 'shield-checkmark-outline', title: 'Safety & Privacy', subtitle: 'Your security matters' },
    { id: '4', icon: 'notifications-outline', title: 'Notifications', subtitle: 'Manage alerts' },
    { id: '5', icon: 'help-circle-outline', title: 'Help & Support', subtitle: 'Get assistance' },
    { id: '6', icon: 'information-circle-outline', title: 'About', subtitle: 'App version 1.0.0' }
  ];

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header with Menu Button */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setMenuVisible(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="menu" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* PROFILE HEADER */}
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={36} color="#fff" />
              </View>
              <TouchableOpacity style={styles.editBadge} activeOpacity={0.8}>
                <Ionicons name="camera" size={14} color="#fff" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.profileInfo}>
              <Text style={styles.name}>Sanathan NS</Text>
              <Text style={styles.memberSince}>Member since 2024</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#F59E0B" />
                <Text style={styles.rating}>4.9</Text>
                <Text style={styles.ratingLabel}> • Excellent rider</Text>
              </View>
            </View>
          </View>

          {/* STATS CARDS */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>Trips</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>₹2,400</Text>
              <Text style={styles.statLabel}>Saved</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>5</Text>
              <Text style={styles.statLabel}>Favorites</Text>
            </View>
          </View>

          {/* MENU ITEMS */}
          <View style={styles.menuSection}>
            {menuItems.map((item, index) => (
              <TouchableOpacity 
                key={item.id} 
                style={[
                  styles.menuItem,
                  index === menuItems.length - 1 && { borderBottomWidth: 0 }
                ]}
                activeOpacity={0.8}
              >
                <View style={styles.menuIcon}>
                  <Ionicons name={item.icon} size={24} color="#fff" />
                </View>
                <View style={styles.menuContent}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={theme.colors.muted} />
              </TouchableOpacity>
            ))}
          </View>

          {/* LOGOUT BUTTON */}
          <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8}>
            <Ionicons name="log-out-outline" size={20} color={theme.colors.danger} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* SIDE MENU */}
      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
    backgroundColor: '#fff'
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: '#fff'
  },

  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center'
  },

  topBarTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.text,
    letterSpacing: -0.3
  },

  container: { 
    padding: 24,
    paddingBottom: 100
  },

  header: { 
    alignItems: 'center',
    marginBottom: 28
  },

  avatarContainer: {
    position: 'relative',
    marginBottom: 18
  },

  avatar: { 
    width: 110, 
    height: 110, 
    borderRadius: 55, 
    backgroundColor: theme.colors.primary, 
    alignItems: 'center', 
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: theme.colors.primaryLight,
    ...theme.shadows.large
  },

  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#fff',
    ...theme.shadows.medium
  },

  profileInfo: {
    alignItems: 'center'
  },

  name: { 
    fontSize: 28, 
    fontWeight: '900',
    color: theme.colors.text,
    letterSpacing: -0.5,
    marginBottom: 6
  },

  memberSince: { 
    color: theme.colors.muted,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full
  },

  rating: {
    fontSize: 15,
    fontWeight: '800',
    color: '#92400E',
    marginLeft: 5
  },

  ratingLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#92400E'
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
    gap: 12
  },

  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    ...theme.shadows.medium
  },

  statValue: {
    fontSize: 26,
    fontWeight: '900',
    color: theme.colors.primary,
    marginBottom: 8,
    letterSpacing: -0.5
  },

  statLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },

  menuSection: {
    backgroundColor: theme.colors.background,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: theme.colors.border,
    marginBottom: 24
  },

  menuItem: { 
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.border
  },

  menuIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16
  },

  menuContent: {
    flex: 1
  },

  menuTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.text,
    marginBottom: 4,
    letterSpacing: -0.3
  },

  menuSubtitle: {
    fontSize: 14,
    color: theme.colors.muted,
    fontWeight: '600'
  },

  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: theme.colors.danger
  },

  logoutText: {
    fontSize: 17,
    fontWeight: '800',
    color: theme.colors.danger,
    marginLeft: 10
  }
});
