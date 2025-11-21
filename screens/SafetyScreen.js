import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigate } from "react-router-native";
import { theme } from "../styles/theme";

export function SafetyScreen() {
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate(-1)} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Women Safety</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.sectionTitle}>Emergency Helplines</Text>
        <View style={styles.card}>
          <Text style={styles.text}>📞 Women Helpline: 1091</Text>
          <Text style={styles.text}>📞 Police Emergency: 100</Text>
          <Text style={styles.text}>📞 National Helpline: 181</Text>
          <Text style={styles.text}>📞 Ambulance: 108</Text>
        </View>

        <Text style={styles.sectionTitle}>Safety Guidelines</Text>
        <View style={styles.card}>
          <Text style={styles.text}>• Share your ride with trusted contacts</Text>
          <Text style={styles.text}>• Sit in the back seat</Text>
          <Text style={styles.text}>• Verify driver details before entering</Text>
          <Text style={styles.text}>• Avoid isolated pickup locations</Text>
        </View>

        <Text style={styles.sectionTitle}>App Safety Features</Text>
        <View style={styles.card}>
          <Text style={styles.text}>✔ Live location sharing</Text>
          <Text style={styles.text}>✔ Emergency SOS button</Text>
          <Text style={styles.text}>✔ Verified women drivers</Text>
          <Text style={styles.text}>✔ Background-verified drivers</Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { backgroundColor: theme.colors.primary, padding: 16, flexDirection: "row", alignItems: "center" },
  backBtn: { marginRight: 14 },
  headerTitle: { fontSize: 20, fontWeight: "800", color: "#fff" },
  content: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginTop: 20, marginBottom: 10 },
  card: { backgroundColor: "#F8FAFF", padding: 16, borderRadius: 12, marginBottom: 16, elevation: 2 },
  text: { fontSize: 15, marginBottom: 6, color: theme.colors.text }
});
