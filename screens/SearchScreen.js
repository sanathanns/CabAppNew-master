// ./screens/SearchScreen.js
import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { useLocation, useNavigate } from "react-router-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../styles/theme";

/**
 * Improved SearchScreen:
 * - Debounced calls to Nominatim
 * - Accept typed text as fallback if suggestions missing
 * - Keep pickup & destination in local state
 */

export function SearchScreen() {
  const navigate = useNavigate();
  const locationState = useLocation();

  // local state
  const [queryPickup, setQueryPickup] = useState("");
  const [queryDest, setQueryDest] = useState("");
  const [pickup, setPickup] = useState(null); // {name, lat, lon}
  const [destination, setDestination] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeField, setActiveField] = useState(null); // 'pickup' | 'destination'

  // debounce ref
  const timerRef = useRef(null);

  // helper: run search with debounce
  function debouncedSearch(text) {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      searchLocation(text);
    }, 300);
  }

  // search using Nominatim (India bias)
  async function searchLocation(text) {
    if (!text || text.length < 3) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        text + " India"
      )}&addressdetails=1&limit=10`;

      const res = await fetch(url, {
        headers: { "User-Agent": "CabApp/1.0" },
      });
      const data = await res.json();
      const formatted = (data || []).map((item) => ({
        name: item.display_name,
        lat: item.lat,
        lon: item.lon,
      }));
      setResults(formatted);
    } catch (e) {
      console.warn("Search error:", e);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  // when user selects an item from suggestions
  function selectResult(item) {
    if (activeField === "pickup") {
      setPickup(item);
      setQueryPickup(item.name.split(",")[0] || item.name);
    } else if (activeField === "destination") {
      setDestination(item);
      setQueryDest(item.name.split(",")[0] || item.name);
    }
    setResults([]);
    setActiveField(null);
    Keyboard.dismiss();
  }

  // Use typed text as fallback and navigate to results
  function showRides() {
    // Both fields must have something (either selected or typed)
    const pickupValue = pickup ? pickup.name : queryPickup;
    const destinationValue = destination ? destination.name : queryDest;

    if (!pickupValue || !destinationValue) return;

    // If we don't have coordinates (no suggestion selected) we will pass empty coords
    const params = new URLSearchParams();
    params.set("pickup", pickupValue);
    if (pickup && pickup.lat) {
      params.set("pickupLat", pickup.lat);
      params.set("pickupLon", pickup.lon);
    }
    params.set("destination", destinationValue);
    if (destination && destination.lat) {
      params.set("destLat", destination.lat);
      params.set("destLon", destination.lon);
    }

    // Also set a trigger so home knows to auto-open ride sheet if needed
    params.set("trigger", "rides");

    navigate(`/results?${params.toString()}`);
  }

  // Helper: clear field
  function clearField(field) {
    if (field === "pickup") {
      setPickup(null);
      setQueryPickup("");
    } else {
      setDestination(null);
      setQueryDest("");
    }
    setResults([]);
  }

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const canShowRides =
    (pickup || queryPickup.length >= 3) && (destination || queryDest.length >= 3);

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>Search & select locations</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Pickup</Text>
        <View style={styles.inputRow}>
          <Ionicons name="ellipse" size={12} color={theme.colors.primary} />
          <TextInput
            placeholder="Type pickup location"
            value={queryPickup}
            onFocus={() => {
              setActiveField("pickup");
              setResults([]);
            }}
            onChangeText={(t) => {
              setQueryPickup(t);
              setActiveField("pickup");
              debouncedSearch(t);
            }}
            style={styles.input}
            returnKeyType="next"
          />
          {(pickup || queryPickup) ? (
            <TouchableOpacity onPress={() => clearField("pickup")}>
              <Ionicons name="close-circle" size={18} color="#999" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Destination</Text>
        <View style={styles.inputRow}>
          <Ionicons name="location" size={16} color={theme.colors.muted} />
          <TextInput
            placeholder="Type destination"
            value={queryDest}
            onFocus={() => {
              setActiveField("destination");
              setResults([]);
            }}
            onChangeText={(t) => {
              setQueryDest(t);
              setActiveField("destination");
              debouncedSearch(t);
            }}
            style={styles.input}
            returnKeyType="search"
          />
          {(destination || queryDest) ? (
            <TouchableOpacity onPress={() => clearField("destination")}>
              <Ionicons name="close-circle" size={18} color="#999" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {loading && <ActivityIndicator style={{ marginTop: 8 }} color={theme.colors.primary} />}

      {/* Suggestions */}
      {!loading && results.length > 0 && (
        <FlatList
          style={{ maxHeight: 260, marginTop: 8 }}
          data={results}
          keyExtractor={(item, idx) => String(idx)}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.resultRow} onPress={() => selectResult(item)}>
              <Ionicons name="location-outline" size={18} color={theme.colors.primary} />
              <View style={{ marginLeft: 10 }}>
                <Text numberOfLines={1} style={styles.resultTitle}>
                  {item.name.split(",")[0]}
                </Text>
                <Text numberOfLines={1} style={styles.resultSub}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {/* No suggestions but typed text — show gentle hint */}
      {!loading && results.length === 0 && (activeField === "pickup" ? queryPickup.length >= 3 : activeField === "destination" ? queryDest.length >= 3 : false) && (
        <Text style={styles.hint}>No suggestions — you can still use the typed address.</Text>
      )}

      <TouchableOpacity
        style={[styles.showButton, !canShowRides && { opacity: 0.5 }]}
        disabled={!canShowRides}
        onPress={showRides}
      >
        <Text style={styles.showText}>Show Rides</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, padding: 18, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "900", marginBottom: 14, color: theme.colors.text },
  field: { marginBottom: 10 },
  label: { fontSize: 12, fontWeight: "700", color: "#6B7280", marginBottom: 6 },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F7FA",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },
  input: { marginLeft: 8, flex: 1, fontSize: 15, color: "#111" },
  resultRow: {
    flexDirection: "row",
    backgroundColor: "#FBFBFB",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    alignItems: "center",
  },
  resultTitle: { fontWeight: "800" },
  resultSub: { color: "#666", fontSize: 12, marginTop: 4, maxWidth: 320 },
  showButton: {
    marginTop: 12,
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  showText: { color: "#fff", fontWeight: "800", fontSize: 16 },
  hint: { color: "#666", marginTop: 8, fontSize: 13 },
});
