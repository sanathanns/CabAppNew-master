import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { useLocation, useNavigate } from 'react-router-native';

export function BookingScreen() {

  const navigate = useNavigate();
  const location = useLocation();
  const q = new URLSearchParams(location.search);
  
  const pickup = q.get("pickup") || "Pickup Location";
  const destination = q.get("destination") || "Destination";
  const driver = q.get("driver") || "Driver";
  const price = q.get("price") || "₹0";
  const eta = q.get("eta") || "5 min";

  const [finding, setFinding] = useState(true);
  const [found, setFound] = useState(false);
  const [progress] = useState(new Animated.Value(0));

  useEffect(() => {
    // Animate progress bar
    Animated.timing(progress, {
      toValue: 1,
      duration: 1400,
      useNativeDriver: false
    }).start();

    const t = setTimeout(() => {
      setFinding(false);
      setFound(true);
    }, 1400);
    return () => clearTimeout(t);
  }, []);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backBtn} 
          onPress={() => navigate("/")}
          activeOpacity={0.8}
        >
          <Ionicons name="close" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Status</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.container}>
      
        {finding && (
          <View style={styles.findingContainer}>
            <View style={styles.iconCircle}>
              <Ionicons name="car" size={40} color={theme.colors.primary} />
            </View>
            
            <Text style={styles.findingTitle}>Finding your ride...</Text>
            <Text style={styles.findingSubtitle}>Please wait while we connect you with a driver</Text>
            
            <View style={styles.progressBar}>
              <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
            </View>

            <View style={styles.tripInfo}>
              <View style={styles.tripRow}>
                <Ionicons name="navigate" size={18} color={theme.colors.primary} />
                <Text style={styles.tripText}>{pickup.split(",")[0]}</Text>
              </View>
              <View style={styles.tripRow}>
                <Ionicons name="location" size={18} color={theme.colors.danger} />
                <Text style={styles.tripText}>{destination.split(",")[0]}</Text>
              </View>
            </View>
          </View>
        )}

        {found && (
          <View style={styles.successContainer}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark-circle" size={80} color={theme.colors.success} />
            </View>
            
            <Text style={styles.successTitle}>Driver Found!</Text>
            <Text style={styles.successSubtitle}>{driver} is on the way</Text>

            <View style={styles.detailsCard}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Estimated Fare</Text>
                <Text style={styles.detailValue}>{price}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Arrival Time</Text>
                <Text style={[styles.detailValue, { color: theme.colors.primary }]}>{eta}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.trackBtn}
              onPress={() => navigate("/")}
              activeOpacity={0.9}
            >
              <Text style={styles.trackText}>Track Your Ride</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
    backgroundColor: theme.colors.background 
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center'
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text
  },

  container: { 
    padding: 20,
    flex: 1,
    justifyContent: 'center'
  },

  findingContainer: {
    alignItems: 'center'
  },

  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24
  },

  findingTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.text,
    marginBottom: 8,
    letterSpacing: -0.5
  },

  findingSubtitle: {
    fontSize: 15,
    color: theme.colors.muted,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 40
  },

  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: theme.colors.border,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 32
  },

  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 3
  },

  tripInfo: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.small
  },

  tripRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14
  },

  tripText: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.text,
    marginLeft: 12,
    flex: 1
  },

  successContainer: {
    alignItems: 'center'
  },

  successIcon: {
    marginBottom: 20
  },

  successTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.text,
    marginBottom: 8,
    letterSpacing: -0.5
  },

  successSubtitle: {
    fontSize: 16,
    color: theme.colors.muted,
    fontWeight: '600',
    marginBottom: 32
  },

  detailsCard: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: theme.borderRadius.lg,
    marginBottom: 24,
    ...theme.shadows.small
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14
  },

  detailLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.muted
  },

  detailValue: {
    fontSize: 17,
    fontWeight: '800',
    color: theme.colors.text
  },

  trackBtn: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: theme.borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.medium
  },

  trackText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
    marginRight: 8
  }
});
