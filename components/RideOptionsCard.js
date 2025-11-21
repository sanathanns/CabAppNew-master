import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../styles/theme";
import { useNavigate, useLocation } from "react-router-native";
import { RIDES } from "../data/rides";

export function RideOptionsCard({ visible, onClose }) {
  const navigate = useNavigate();
  const locationState = useLocation();

  const params = new URLSearchParams(locationState.search);

  const pickup = params.get("pickup") || "Pickup";
  const destination = params.get("destination") || "Destination";

  const pickupLat = params.get("pickupLat");
  const pickupLon = params.get("pickupLon");
  const destLat = params.get("destLat");
  const destLon = params.get("destLon");

  const [loading, setLoading] = useState(false);

  function book(ride) {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      const newParams = new URLSearchParams();

      newParams.set("rideName", ride.name);

      newParams.set("pickup", pickup);
      newParams.set("pickupLat", pickupLat);
      newParams.set("pickupLon", pickupLon);

      newParams.set("destination", destination);
      newParams.set("destLat", destLat);
      newParams.set("destLon", destLon);

      newParams.set("carModel", ride.carModel);
      newParams.set("carColor", ride.color);
      newParams.set("carImage", ride.image);

      newParams.set("driverName", ride.driverName);
      newParams.set("driverRating", ride.driverRating);
      newParams.set("driverImg", ride.driverImg);

      newParams.set("price", ride.price);
      newParams.set("eta", ride.eta);

      navigate(`/driver/${ride.id}?${newParams.toString()}`);

      onClose();
    }, 900);
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.handle} />

          <Text style={styles.title}>Available Rides</Text>
          <Text style={styles.subtitle}>
            {pickup.split(",")[0]} → {destination.split(",")[0]}
          </Text>

          <FlatList
            data={RIDES}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.row}
                onPress={() => book(item)}
                disabled={loading}
                activeOpacity={0.9}
              >
                {/* Ride Image */}
                <View style={styles.leftSection}>
                  <Image source={{ uri: item.image }} style={styles.rideImage} />
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{item.name}</Text>
                  </View>
                </View>

                {/* Ride Info */}
                <View style={styles.middleSection}>
                  <Text style={styles.carModel}>{item.carModel}</Text>
                  <View style={styles.detailsRow}>
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text style={styles.details}> {item.rating}</Text>
                    <View style={styles.separator} />
                    <Ionicons name="person" size={12} color={theme.colors.muted} />
                    <Text style={styles.details}> {item.seats}</Text>
                  </View>
                  <View style={styles.etaRow}>
                    <Ionicons name="time-outline" size={13} color={theme.colors.primary} />
                    <Text style={styles.eta}> {item.eta}</Text>
                  </View>
                </View>

                {/* Price + Arrow */}
                <View style={styles.rightSection}>
                  <Text style={styles.price}>{item.price}</Text>
                  <View style={styles.arrowBtn}>
                    <Ionicons name="chevron-forward" size={20} color="#fff" />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>

          {loading && (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Text style={styles.loadingText}>Finding your ride...</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

/* ===================== STYLES ===================== */

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: theme.colors.overlay
  },
  sheet: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 28,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    maxHeight: Dimensions.get("window").height * 0.75,
    ...theme.shadows.large
  },
  handle: {
    width: 48,
    height: 5,
    backgroundColor: theme.colors.border,
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 20
  },

  title: { 
    fontSize: 26, 
    fontWeight: "900", 
    color: theme.colors.text,
    letterSpacing: -0.5,
    marginBottom: 4
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 20,
    marginTop: 4
  },

  row: {
    flexDirection: "row",
    padding: 18,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: 'center',
    ...theme.shadows.small
  },

  leftSection: {
    alignItems: 'center',
    marginRight: 16
  },

  rideImage: { 
    width: 75, 
    height: 50, 
    resizeMode: "contain" 
  },

  categoryBadge: {
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 6
  },

  categoryText: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.primary,
    letterSpacing: 0.5
  },

  middleSection: {
    flex: 1
  },

  carModel: { 
    color: theme.colors.text, 
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.3
  },

  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6
  },

  details: { 
    fontSize: 13, 
    fontWeight: "700", 
    color: theme.colors.textLight
  },

  separator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.muted,
    marginHorizontal: 10
  },

  etaRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  eta: { 
    color: theme.colors.primary, 
    fontWeight: "800",
    fontSize: 13
  },

  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginLeft: 14
  },

  price: { 
    fontSize: 20, 
    fontWeight: "900",
    color: theme.colors.primary,
    marginBottom: 10,
    letterSpacing: -0.5
  },

  arrowBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.small
  },

  closeBtn: { 
    alignItems: "center", 
    paddingVertical: 18,
    marginTop: 10,
    backgroundColor: theme.colors.background,
    borderRadius: 16
  },

  closeText: {
    color: theme.colors.textLight,
    fontWeight: '800',
    fontSize: 16
  },

  loading: {
    position: "absolute",
    top: "38%",
    left: 24,
    right: 24,
    backgroundColor: "#fff",
    padding: 28,
    borderRadius: 24,
    alignItems: "center",
    ...theme.shadows.large
  },

  loadingText: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text
  }
});
