import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../styles/theme";
import { useNavigate } from "react-router-native";

export function DriverCard({ driver, price, eta }) {
  const navigate = useNavigate();

  // Default driver mock (if nothing passed)
  const d = driver || {
    name: "Ravi Kumar",
    rating: 4.9,
    image: "https://i.pravatar.cc/150?img=12",
    carModel: "Hyundai Verna",
    carColor: "Silver",
    plate: "KA05 AB 1234",
    distance: "2.4 km"
  };

  const ridePrice = price || "₹180";
  const arrivalTime = eta || "4-6 min";

  function proceedToBooking() {
    const params = new URLSearchParams();
    params.set("driver", d.name);
    params.set("car", d.carModel);
    params.set("price", ridePrice);

    navigate(`/booking?${params.toString()}`);
  }

  return (
    <TouchableOpacity style={styles.card} onPress={proceedToBooking} activeOpacity={0.95}>
      
      {/* DRIVER IMAGE */}
      <Image source={{ uri: d.image }} style={styles.avatar} />

      {/* INFO BLOCK */}
      <View style={{ flex: 1, marginLeft: 14 }}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{d.name}</Text>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text style={styles.ratingText}>{d.rating}</Text>
          </View>
        </View>
        
        <Text style={styles.carText}>
          {d.carModel} • {d.carColor}
        </Text>

        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={14} color={theme.colors.muted} />
          <Text style={styles.infoText}>{arrivalTime} away</Text>
          <View style={styles.dot} />
          <Text style={styles.infoText}>{d.distance}</Text>
        </View>
      </View>

      {/* RIGHT SIDE BLOCK */}
      <View style={styles.right}>
        <Text style={styles.price}>{ridePrice}</Text>
        <View style={styles.bookBtn}>
          <Ionicons name="chevron-forward" size={16} color={theme.colors.primary} />
        </View>
      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 2,
    borderColor: theme.colors.border,
    ...theme.shadows.medium
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: theme.colors.primaryLight
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  name: {
    fontSize: 17,
    fontWeight: "800",
    color: theme.colors.text,
    marginRight: 8,
    letterSpacing: -0.3
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#92400E',
    marginLeft: 4
  },
  carText: {
    color: theme.colors.textLight,
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 8
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoText: {
    color: theme.colors.muted,
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 5
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.muted,
    marginHorizontal: 8
  },
  right: {
    alignItems: "flex-end",
    justifyContent: 'center'
  },
  price: {
    fontSize: 22,
    fontWeight: "900",
    color: theme.colors.primary,
    marginBottom: 10,
    letterSpacing: -0.5
  },
  bookBtn: {
    backgroundColor: theme.colors.primary,
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.small
  }
});
