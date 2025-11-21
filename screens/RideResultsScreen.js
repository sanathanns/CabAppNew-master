// ./screens/RideResultsScreen.js
import React, { useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useLocation, useNavigate } from "react-router-native";
import { RIDES } from "../data/rides";
import { theme } from "../styles/theme";

/* haversine -> km */
function haversineKm(lat1, lon1, lat2, lon2) {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function useQuery() {
  const loc = useLocation();
  return new URLSearchParams(loc.search);
}

export function RideResultsScreen() {
  const navigate = useNavigate();
  const q = useQuery();

  const pickup = q.get("pickup") || "Unknown";
  const destination = q.get("destination") || "Unknown";
  const pickupLat = parseFloat(q.get("pickupLat"));
  const pickupLon = parseFloat(q.get("pickupLon"));
  const destLat = parseFloat(q.get("destLat"));
  const destLon = parseFloat(q.get("destLon"));

  const distanceKm = useMemo(() => {
    if (pickupLat && pickupLon && destLat && destLon) {
      return haversineKm(pickupLat, pickupLon, destLat, destLon);
    }
    return null;
  }, [pickupLat, pickupLon, destLat, destLon]);

  const rides = useMemo(() => {
    return RIDES.map((r) => {
      const km = distanceKm || 5; // fallback estimate 5 km if no coords
      const priceNum = Math.max(Math.round(r.base + r.per_km * km), 20);
      return {
        ...r,
        priceNum,
        priceText: `₹${priceNum}`,
        distanceKm: km ? km.toFixed(2) : null,
      };
    });
  }, [distanceKm]);

  function selectRide(ride) {
    const params = new URLSearchParams();
    params.set("pickup", pickup);
    params.set("destination", destination);
    if (pickupLat) params.set("pickupLat", pickupLat);
    if (pickupLon) params.set("pickupLon", pickupLon);
    if (destLat) params.set("destLat", destLat);
    if (destLon) params.set("destLon", destLon);
    params.set("km", ride.distanceKm);
    params.set("price", ride.priceNum);
    params.set("rideName", ride.name);
    // include ride/driver details
    params.set("carModel", ride.carModel);
    params.set("carImage", ride.image);
    params.set("driverName", ride.driverName);
    params.set("driverImg", ride.driverImg);
    params.set("driverPhone", ride.driverPhone);

    navigate(`/driver/${ride.id}?${params.toString()}`);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Available rides</Text>
      <Text style={styles.sub}>
        {pickup.split(",")[0]} → {destination.split(",")[0]}
      </Text>

      {distanceKm == null ? (
        <Text style={{ margin: 12, color: theme.colors.muted }}>
          Coordinates not available — price shown is estimated.
        </Text>
      ) : (
        <Text style={{ marginHorizontal: 12, marginBottom: 8, color: theme.colors.muted }}>
          Distance: {distanceKm.toFixed(2)} km
        </Text>
      )}

      <FlatList
        data={rides}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => selectRide(item)}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={{ uri: item.image }} style={styles.carImage} />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.carModel}>{item.carModel} • {item.seats} seats</Text>
                <Text style={styles.eta}>{item.eta}</Text>
              </View>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.price}>{item.priceText}</Text>
              {item.distanceKm && <Text style={styles.km}>{item.distanceKm} km</Text>}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  heading: { fontSize: 18, fontWeight: "800", margin: 12 },
  sub: { color: theme.colors.muted, marginHorizontal: 12, marginBottom: 8 },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    marginBottom: 12,
  },
  carImage: { width: 72, height: 42, resizeMode: "contain" },
  name: { fontWeight: "900" },
  carModel: { color: theme.colors.muted, marginTop: 6, fontSize: 13 },
  eta: { color: theme.colors.muted, marginTop: 4 },
  price: { fontWeight: "900", fontSize: 16 },
  km: { color: theme.colors.muted, marginTop: 6 },
});
