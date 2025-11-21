// screens/ActivityScreen.js
import React, { useRef, useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Animated,
  Pressable,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../styles/theme";
import { SideMenu } from "../components/SideMenu";

/**
 * High-fidelity Ride History / Activity Screen
 * - Copy to screens/ActivityScreen.js
 * - Uses only RN core + @expo/vector-icons
 */

/* -------------------- Sample enriched data -------------------- */
const SAMPLE_RIDES = [
  {
    id: "r1",
    pickup: "MG Road, Mangalore",
    drop: "City Mall, Mangalore",
    datetime: "Nov 10, 2025 • 14:20",
    distance: "3.2 km",
    fare: "₹150",
    payment: "Card • **** 4242",
    status: "Completed",
    vehicleType: "Economy",
    driver: {
      name: "Amit Singh",
      rating: 4.9,
      avatar: "https://i.pravatar.cc/150?img=5",
      car: "Swift Dzire",
      plate: "KA05 XZ 1111",
    },
  },
  {
    id: "r2",
    pickup: "Airport Terminal 1",
    drop: "Tech Park, Bommanahalli",
    datetime: "Oct 02, 2025 • 09:05",
    distance: "18.6 km",
    fare: "₹650",
    payment: "Cash",
    status: "Completed",
    vehicleType: "SUV",
    driver: {
      name: "Neha Patil",
      rating: 4.8,
      avatar: "https://i.pravatar.cc/150?img=12",
      car: "Toyota Innova",
      plate: "KA01 AB 2345",
    },
  },
  {
    id: "r3",
    pickup: "Station Road",
    drop: "Central Park",
    datetime: "Sep 12, 2025 • 19:30",
    distance: "5.4 km",
    fare: "₹220",
    payment: "UPI",
    status: "Cancelled",
    vehicleType: "Sedan",
    driver: {
      name: "Ravi Kumar",
      rating: 4.6,
      avatar: "https://i.pravatar.cc/150?img=18",
      car: "Hyundai Verna",
      plate: "KA07 CD 9988",
    },
  },
];

/* -------------------- Star rating component -------------------- */
function StarRating({ value = 0, onChange }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <View style={{ flexDirection: "row" }}>
      {stars.map((s) => (
        <TouchableOpacity key={s} onPress={() => onChange(s)} activeOpacity={0.8}>
          <Ionicons
            name={s <= value ? "star" : "star-outline"}
            size={22}
            color={s <= value ? "#FFD166" : theme.colors.muted}
            style={{ marginRight: 6 }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

/* -------------------- Activity Item (card) -------------------- */
function RideCard({ item, index }) {
  const [expanded, setExpanded] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [tip, setTip] = useState("");
  const scale = useRef(new Animated.Value(1)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // entrance fade-in (staggered)
    Animated.timing(fade, {
      toValue: 1,
      duration: 360,
      delay: index * 60,
      useNativeDriver: true,
    }).start();
  }, []);

  function onPressCard() {
    // micro interaction: quick scale
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.985, duration: 90, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();

    setExpanded((v) => !v);
  }

  function quickTip(amount) {
    setTip(amount);
  }

  return (
    <Animated.View style={[styles.timelineRow, { opacity: fade, transform: [{ scale }] }]}>
      {/* Left timeline column */}
      <View style={styles.timelineCol}>
        <View style={[styles.dot, item.status === "Cancelled" && styles.dotCancelled]} />
        <View style={styles.line} />
      </View>

      {/* Card */}
      <Pressable onPress={onPressCard} style={({ pressed }) => [{ opacity: pressed ? 0.95 : 1 }]}>
        <View style={[styles.card]}>
          {/* Trip header */}
          <View style={styles.rowBetween}>
            <View style={{ flex: 1 }}>
              <Text style={styles.tripTitle}>{item.pickup} → {item.drop && item.drop.split(',')[0]}</Text>
              <Text style={styles.tripTime}>{item.datetime} • {item.distance}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={[styles.fare]}>{item.fare}</Text>
              <View style={[styles.statusBadge, item.status === "Completed" ? styles.statusCompleted : item.status === "Cancelled" ? styles.statusCancelled : styles.statusOngoing]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
          </View>

          {/* Details row */}
          <View style={[styles.rowBetween, { marginTop: 12 }]}>
            {/* Driver */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={{ uri: item.driver.avatar }} style={styles.driverAvatar} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.driverName}>{item.driver.name}</Text>
                <Text style={styles.driverMeta}>{item.driver.car} • {item.driver.plate}</Text>
                <View style={{ marginTop: 6 }}>
                  <StarRating value={Math.round(item.driver.rating)} onChange={() => {}} />
                </View>
              </View>
            </View>

            {/* Payment */}
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.smallMuted}>{item.payment}</Text>
              <Text style={styles.smallMuted}>{item.vehicleType}</Text>
            </View>
          </View>

          {/* Expandable rating area */}
          {expanded && (
            <Animated.View style={{ marginTop: 14 }}>
              <View style={styles.divider} />

              <Text style={[styles.sectionTitle, { marginTop: 10 }]}>Rate your trip</Text>

              <View style={{ marginTop: 8 }}>
                <StarRating value={rating} onChange={setRating} />
              </View>

              <TextInput
                placeholder="Write a short feedback (optional)"
                value={feedback}
                onChangeText={setFeedback}
                style={styles.input}
                multiline
                numberOfLines={3}
              />

              <Text style={[styles.sectionTitle, { marginTop: 8, fontSize: 14 }]}>Add a tip</Text>
              <View style={{ flexDirection: "row", marginTop: 8 }}>
                {["₹10", "₹20", "₹50"].map((amt) => (
                  <TouchableOpacity
                    key={amt}
                    style={[styles.tipBtn, tip === amt && styles.tipBtnActive]}
                    onPress={() => quickTip(amt)}
                    activeOpacity={0.85}
                  >
                    <Text style={[styles.tipText, tip === amt && styles.tipTextActive]}>{amt}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={[styles.tipBtn, { paddingHorizontal: 14 }]}
                  onPress={() => quickTip("Custom")}
                >
                  <Text style={styles.tipText}>Custom</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.actionsRow}>
                <TouchableOpacity style={styles.secondaryBtn} onPress={() => { setRating(0); setFeedback(""); setTip(""); }}>
                  <Text style={styles.secondaryBtnText}>Reset</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.primaryBtn} onPress={() => {
                  // in a real app you'd submit rating to API
                  // here we just collapse and show a subtle animation
                  setExpanded(false);
                }}>
                  <Text style={styles.primaryBtnText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
}

/* -------------------- ActivityScreen -------------------- */
export function ActivityScreen() {
  const [rides, setRides] = useState(SAMPLE_RIDES);
  const [filter, setFilter] = useState({ date: "All", price: "All", status: "All", vehicle: "All" });
  const [menuVisible, setMenuVisible] = useState(false);

  // simple filter handler (client side)
  function applyFilter(key, value) {
    setFilter((f) => ({ ...f, [key]: value }));
    // demo: we won't mutate list content here; production can filter items accordingly
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setMenuVisible(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="menu" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Activity</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your ride history</Text>
        <Text style={styles.headerSub}>Explore past trips, rate drivers, and add tips.</Text>
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        <FlatList
          data={[
            { key: "date", label: filter.date },
            { key: "price", label: "Price" },
            { key: "status", label: filter.status },
            { key: "vehicle", label: filter.vehicle }
          ]}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(i) => i.key}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.chip}
              activeOpacity={0.85}
              onPress={() => applyFilter(item.key, "All")}
            >
              <Text style={styles.chipText}>{item.label}</Text>
              <Ionicons name="chevron-down" size={18} color={theme.colors.muted} style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Timeline + Cards */}
      <FlatList
        data={rides}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        renderItem={({ item, index }) => <RideCard item={item} index={index} />}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />

      {/* SIDE MENU */}
      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </SafeAreaView>
  );
}

/* -------------------- STYLES -------------------- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },

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

  header: { paddingHorizontal: 16, paddingTop: 16 },
  headerTitle: { fontSize: 22, fontWeight: "900", color: theme.colors.text },
  headerSub: { marginTop: 6, color: theme.colors.muted },

  filters: { marginTop: 14, paddingLeft: 16 },
  chip: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2
  },
  chipText: { fontWeight: "700", color: theme.colors.text },

  timelineRow: { flexDirection: "row", alignItems: "flex-start" },
  timelineCol: { width: 28, alignItems: "center", marginTop: 14 },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: theme.colors.primary },
  dotCancelled: { backgroundColor: "#f97373" },
  line: { width: 2, flex: 1, backgroundColor: "#e6eef6", marginTop: 4 },

  card: {
    backgroundColor: "#fff",
    marginLeft: 4,
    borderRadius: 14,
    padding: 14,
    flex: 1,
    elevation: 3
  },
  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },

  tripTitle: { fontWeight: "900", fontSize: 15, color: theme.colors.text, maxWidth: 240 },
  tripTime: { color: theme.colors.muted, marginTop: 4, fontSize: 12 },

  fare: { fontSize: 16, fontWeight: "900", color: theme.colors.primary },
  statusBadge: { marginTop: 8, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontWeight: "800", color: "#fff", fontSize: 11 },

  statusCompleted: { backgroundColor: "#16a34a" },
  statusCancelled: { backgroundColor: "#ef4444" },
  statusOngoing: { backgroundColor: "#f59e0b" },

  driverAvatar: { width: 56, height: 56, borderRadius: 12 },
  driverName: { fontWeight: "800", fontSize: 14 },
  driverMeta: { color: theme.colors.muted, marginTop: 4, fontSize: 12 },

  divider: { height: 1, backgroundColor: "#eee", marginTop: 8, marginBottom: 8 },

  sectionTitle: { fontWeight: "800", color: theme.colors.text },
  input: {
    marginTop: 10,
    backgroundColor: "#fafafa",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#eee",
    textAlignVertical: "top"
  },

  tipBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 10,
    elevation: 2
  },
  tipBtnActive: {
    backgroundColor: theme.colors.primary
  },
  tipText: {
    fontWeight: "800",
    color: theme.colors.text
  },
  tipTextActive: {
    color: "#fff"
  },

  actionsRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  secondaryBtn: { backgroundColor: "#fff", padding: 12, borderRadius: 10, elevation: 2, flex: 1, marginRight: 8 },
  secondaryBtnText: { color: theme.colors.text, fontWeight: "800", textAlign: "center" },
  primaryBtn: { backgroundColor: theme.colors.primary, padding: 12, borderRadius: 10, flex: 1 },
  primaryBtnText: { color: "#fff", fontWeight: "900", textAlign: "center" },
});
