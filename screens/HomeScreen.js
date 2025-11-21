// screens/HomeScreen.js
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  StatusBar,
  ScrollView
} from "react-native";

import { MapComponent } from "../components/MapComponent";
import { RecentLocations } from "../components/RecentLocations";
import { RideOptionsCard } from "../components/RideOptionsCard";
import { DriverCard } from "../components/DriverCard";
import { SideMenu } from "../components/SideMenu";

import { theme } from "../styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { useLocation, useNavigate } from "react-router-native";

export function HomeScreen() {
  const navigate = useNavigate();
  const locationState = useLocation();

  // guard: locationState.search may be undefined — default to empty string
  const rawSearch = (locationState && locationState.search) ? locationState.search : "";

  // read query params from router location
  const params = new URLSearchParams(rawSearch);

  const pickupParam = params.get("pickup");
  const destParam = params.get("destination");
  const trigger = params.get("trigger");

  const pickupLat = params.get("pickupLat");
  const pickupLon = params.get("pickupLon");
  const destLat = params.get("destLat");
  const destLon = params.get("destLon");

  // local states (we reflect query params in state to re-render UI)
  const [pickup, setPickup] = useState(pickupParam);
  const [destination, setDestination] = useState(destParam);
  const [showRide, setShowRide] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  // responsive width for web
  const isWeb = Platform.OS === "web";
  const width = isWeb ? Math.min(520, Dimensions.get("window").width - 40) : "100%";

  // keep local state in sync with query params (when search screen navigates back)
  useEffect(() => {
    setPickup(pickupParam);
    setDestination(destParam);
  }, [pickupParam, destParam]);

  // auto open ride options when both pickup and destination are set (and only once)
  useEffect(() => {
    if (pickupParam && destParam && trigger === "rides") {
      setShowRide(true);
    }
  }, [pickupParam, destParam, trigger]);

  // ----------------------
  // Saved places handler
  // ----------------------
  function handleSavedPlace(item) {
    // Map saved place id -> coordinates & label (MG Road, Tech Park, Airport T2)
    // You can change these strings/coords as needed.
    let addr = "";
    let lat = "";
    let lon = "";
    if (item.id === "1") {
      // Home -> MG Road, Bangalore
      addr = "MG Road, Bangalore, Karnataka, India";
      lat = "12.9754";
      lon = "77.6050";
    } else if (item.id === "2") {
      // Work -> Manyata Tech Park (example)
      addr = "Manyata Tech Park, Nagavara, Bangalore, Karnataka, India";
      lat = "13.0389";
      lon = "77.5970";
    } else if (item.id === "3") {
      // Airport -> Kempegowda International Airport (Terminal 2 area)
      addr = "Kempegowda International Airport, Bangalore (Terminal 2)";
      lat = "13.1986";
      lon = "77.7066";
    } else {
      // fallback: use item.detail if provided
      addr = item.detail || item.name || "Saved Place";
      lat = item.lat || "";
      lon = item.lon || "";
    }

    // set as destination (you can change to pickup by using pickup params)
    const query = new URLSearchParams();
    // If you want selected place to be pickup instead of destination, swap keys
    query.set("destination", addr);
    if (lat) query.set("destLat", lat);
    if (lon) query.set("destLon", lon);

    // optionally keep existing pickup if set
    if (pickup) {
      query.set("pickup", pickup);
      if (pickupLat) query.set("pickupLat", pickupLat);
      if (pickupLon) query.set("pickupLon", pickupLon);
    }

    navigate(`/?${query.toString()}`);
  }

  // ----------------------
  // Services grid data
  // ----------------------
  const SERVICES = [
    { id: "auto", name: "Auto", subtitle: "Short trips", color: "#10B981" },
    { id: "trip", name: "Trip", subtitle: "Regular ride", color: "#3B82F6" },
    { id: "bike", name: "Bike", subtitle: "Two-wheeler", color: "#F97316" },
    { id: "intercity", name: "Intercity", subtitle: "Long haul", color: "#8B5CF6" },
    { id: "reserve", name: "Reserve", subtitle: "Pre-book", color: "#06B6D4" },
    { id: "courier", name: "Courier", subtitle: "Parcel delivery", color: "#F59E0B" },
    { id: "teens", name: "Teens", subtitle: "Teen rides", color: "#EF4444" },
    { id: "seniors", name: "Seniors", subtitle: "Senior-friendly", color: "#6B7280" }
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={[isWeb ? styles.webWrap : styles.mobileWrap, { width }]}>

        {/* ---------------- MAP SECTION ---------------- */}
        <View style={styles.mapWrap}>
          <MapComponent
            style={{ borderRadius: 0 }}
            region={
              pickupLat && pickupLon
                ? {
                    latitude: parseFloat(pickupLat),
                    longitude: parseFloat(pickupLon),
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                  }
                : undefined
            }
          />

          {/* ---------------- TOP OVERLAY: MENU + SPLIT SEARCH BAR ---------------- */}
          <View style={styles.topOverlay}>

            {/* menu button */}
            <TouchableOpacity
              style={styles.menuBtn}
              onPress={() => setMenuVisible(true)}
              activeOpacity={0.85}
            >
              <Ionicons name="menu" size={24} color={theme.colors.text} />
            </TouchableOpacity>

            {/* split card: pickup | destination */}
            <View style={styles.splitCard}>
              {/* left half */}
              <TouchableOpacity
                style={styles.halfLeft}
                onPress={() => navigate("/search?type=pickup")}
                activeOpacity={0.85}
              >
                <View style={styles.halfLeftInner}>
                  <Ionicons name="navigate" size={18} color={theme.colors.primary} />
                  <View style={{ marginLeft: 8, flex: 1 }}>
                    <Text style={styles.halfLabel}>Pickup</Text>
                    <Text style={styles.halfValue} numberOfLines={1}>
                      {pickup ? pickup.split(",")[0] : "Choose pickup"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* vertical divider */}
              <View style={styles.divider} />

              {/* right half */}
              <TouchableOpacity
                style={styles.halfRight}
                onPress={() => navigate("/search?type=destination")}
                activeOpacity={0.85}
              >
                <View style={styles.halfRightInner}>
                  <Ionicons name="flag" size={18} color="#EF4444" />
                  <View style={{ marginLeft: 8, flex: 1 }}>
                    <Text style={styles.halfLabel}>Destination</Text>
                    <Text style={styles.halfValue} numberOfLines={1}>
                      {destination ? destination.split(",")[0] : "Choose destination"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

          </View>
        </View>

        {/* ---------------- BOTTOM SCROLLABLE CONTENT ---------------- */}
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* SAVED PLACES / RECENT */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Saved Places</Text>
            <RecentLocations onSelect={handleSavedPlace} />
            <Text style={{ marginTop: 8, color: theme.colors.muted, fontSize: 12 }}>
              Tap a saved place to set as destination (MG Road, Tech Park, Airport T2)
            </Text>
          </View>

          {/* QUICK BOOK */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Book</Text>
            <Text style={styles.sectionSubtitle}>Choose your ride type</Text>

            <View style={styles.quickBookRow}>
              {[
                { name: "Auto", price: "₹80", icon: "bicycle", color: "#10B981" },
                { name: "Sedan", price: "₹120", icon: "car", color: "#3B82F6" },
                { name: "SUV", price: "₹250", icon: "car-sport", color: "#8B5CF6" }
              ].map((ride) => (
                <TouchableOpacity
                  key={ride.name}
                  style={styles.quickBookCard}
                  onPress={() => setShowRide(true)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.quickBookIcon, { backgroundColor: ride.color }]}>
                    <Ionicons name={ride.icon} size={28} color="#fff" />
                  </View>
                  <Text style={styles.quickBookName}>{ride.name}</Text>
                  <Text style={styles.quickBookPrice}>{ride.price}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* SERVICES GRID (replaces Nearby driver) */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Services</Text>
            <Text style={styles.sectionSubtitle}>Choose a service tailored for women</Text>

            <View style={styles.servicesGrid}>
              {SERVICES.map((s) => (
                <TouchableOpacity
                  key={s.id}
                  style={styles.serviceCard}
                  activeOpacity={0.8}
                  onPress={() => {
                    // set a quick destination/preset or open the ride sheet — here we open ride options
                    setShowRide(true);
                  }}
                >
                  <View style={[styles.serviceIcon, { backgroundColor: s.color }]}>
                    <Text style={styles.serviceIconText}>{s.name.charAt(0)}</Text>
                  </View>
                  <Text style={styles.serviceName}>{s.name}</Text>
                  <Text style={styles.serviceSub}>{s.subtitle}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>

      {/* RIDE OPTIONS SHEET */}
      <RideOptionsCard visible={showRide} onClose={() => setShowRide(false)} />

      {/* SIDE MENU */}
      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </SafeAreaView>
  );
}

/* ---------------------- STYLES ---------------------- */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F9FAFB"
  },
  webWrap: {
    flex: 1,
    alignSelf: "center",
    maxWidth: 600
  },
  mobileWrap: {
    flex: 1
  },

  /* MAP */
  mapWrap: {
    height: 300,
    width: "100%",
    backgroundColor: "#EFF6FF",
    position: "relative"
  },

  /* TOP OVERLAY container */
  topOverlay: {
    position: "absolute",
    top: 16,
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    zIndex: 10
  },

  /* MENU */
  menuBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8
      },
      android: {
        elevation: 4
      }
    })
  },

  /* SPLIT CARD (single row with two halves) */
  splitCard: {
    flex: 1,
    height: 56,
    backgroundColor: "#fff",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.07,
        shadowRadius: 8
      },
      android: {
        elevation: 4
      }
    })
  },

  halfLeft: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    paddingLeft: 12
  },
  halfLeftInner: {
    flexDirection: "row",
    alignItems: "center"
  },

  halfRight: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    paddingLeft: 12,
    paddingRight: 12
  },
  halfRightInner: {
    flexDirection: "row",
    alignItems: "center"
  },

  divider: {
    width: 1,
    height: "60%",
    backgroundColor: "#F3F4F6"
  },

  halfLabel: {
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "700"
  },

  halfValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    marginTop: 2
  },

  /* CONTENT BELOW MAP */
  content: {
    flex: 1,
    backgroundColor: "#F9FAFB"
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20
  },

  section: {
    marginBottom: 24
  },

  sectionTitle: {
    fontWeight: "700",
    fontSize: 18,
    color: "#111827",
    marginBottom: 4
  },

  sectionSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
    marginBottom: 12
  },

  quickBookRow: {
    flexDirection: "row",
    gap: 12
  },

  quickBookCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    flex: 1,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8
      },
      android: {
        elevation: 3
      }
    })
  },

  quickBookIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12
  },

  quickBookName: {
    fontWeight: "600",
    fontSize: 14,
    color: "#111827",
    marginBottom: 4
  },

  quickBookPrice: {
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "500"
  },

  /* SERVICES GRID */
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12
  },

  serviceCard: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "flex-start",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8
      },
      android: {
        elevation: 2
      }
    })
  },

  serviceIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },

  serviceIconText: {
    color: "#fff",
    fontWeight: "900"
  },

  serviceName: {
    fontWeight: "800",
    fontSize: 15,
    color: "#111827"
  },

  serviceSub: {
    color: "#6B7280",
    fontSize: 12,
    marginTop: 4
  }
});
