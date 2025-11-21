// ./screens/DriverDetailsScreen.js
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Alert } from "react-native";
import { useParams, useLocation, useNavigate } from "react-router-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../styles/theme";

export function DriverDetailsScreen() {
  const { rideId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const q = new URLSearchParams(location.search);

  const pickup = q.get("pickup") || "Pickup";
  const destination = q.get("destination") || "Destination";
  const km = q.get("km") ? `${Number(q.get("km")).toFixed(2)} km` : "—";
  const price = q.get("price") ? `₹${q.get("price")}` : "₹120";

  const carModel = q.get("carModel") || "Car Model";
  const carImage = q.get("carImage") || null;

  const driverName = q.get("driverName") || "Driver";
  const driverImg = q.get("driverImg") || `https://i.pravatar.cc/150?img=12`;
  const driverPhone = q.get("driverPhone") || "N/A";

  function onConfirm() {
    // navigate to dummy payment screen, pass back same params
    const params = new URLSearchParams(location.search);
    navigate(`/payment?${params.toString()}`);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.topRow}>
          <TouchableOpacity onPress={() => navigate(-1)} style={styles.backBtn}><Ionicons name="arrow-back" size={22} color={theme.colors.text} /></TouchableOpacity>
          <Text style={styles.title}>Driver Details</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.profileCard}>
          <Image source={{ uri: driverImg }} style={styles.avatar} />
          <Text style={styles.name}>{driverName}</Text>
          <Text style={styles.star}>⭐ 4.9 • 120 rides</Text>

          <View style={styles.contactRow}>
            <Ionicons name="call" size={18} color={theme.colors.primary} />
            <Text style={styles.phone}>{driverPhone}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Vehicle</Text>
          {carImage ? <Image source={{ uri: carImage }} style={styles.carImage} /> : null}
          <Text style={styles.carModel}>{carModel}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Trip</Text>
          <Text style={styles.bold}>{pickup.split(",")[0]} → {destination.split(",")[0]}</Text>
          <Text style={styles.muted}>Distance: {km}</Text>
          <Text style={[styles.bold, { marginTop: 12 }]}>Estimated Fare: {price}</Text>
        </View>

        <TouchableOpacity style={styles.confirmBtn} onPress={onConfirm}>
          <Text style={styles.confirmText}>Confirm & Pay</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  container: { flex: 1, padding: 16 },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  backBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 18, fontWeight: "800", color: theme.colors.text },
  profileCard: { backgroundColor: "#fff", padding: 18, borderRadius: 14, alignItems: "center", marginBottom: 14, elevation: 3 },
  avatar: { width: 100, height: 100, borderRadius: 18, marginBottom: 8 },
  name: { fontSize: 18, fontWeight: "900" },
  star: { color: theme.colors.muted, marginTop: 6 },
  contactRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  phone: { marginLeft: 8, color: theme.colors.text, fontWeight: "700" },
  card: { backgroundColor: "#fff", padding: 14, borderRadius: 12, marginBottom: 12 },
  cardTitle: { fontWeight: "800", marginBottom: 8 },
  carImage: { width: "100%", height: 110, resizeMode: "contain", marginBottom: 8 },
  carModel: { fontWeight: "700", color: theme.colors.muted },
  bold: { fontWeight: "800", marginTop: 6 },
  muted: { color: theme.colors.muted, marginTop: 4 },
  confirmBtn: { backgroundColor: theme.colors.primary, paddingVertical: 14, borderRadius: 12, alignItems: "center", marginTop: 10 },
  confirmText: { color: "#fff", fontWeight: "900", fontSize: 16 },
});
