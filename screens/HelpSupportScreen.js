import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../styles/theme";
import { useNavigate } from "react-router-native";

export function HelpSupportScreen() {
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate(-1)} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.sectionTitle}>FAQs</Text>
        <View style={styles.card}>
          <Text style={styles.text}>• How to book a ride?</Text>
          <Text style={styles.text}>• How to cancel a trip?</Text>
          <Text style={styles.text}>• Payment related issues</Text>
          <Text style={styles.text}>• Safety guidelines</Text>
        </View>

        <Text style={styles.sectionTitle}>Contact Support</Text>
        <View style={styles.card}>
          <Text style={styles.text}>📞 Support Phone: 1800-202-4040</Text>
          <Text style={styles.text}>📧 Email: support@cabapp.com</Text>
        </View>

        <Text style={styles.sectionTitle}>Report an Issue</Text>
        <View style={styles.card}>
          <Text style={styles.text}>• Report unsafe driver</Text>
          <Text style={styles.text}>• Report lost item</Text>
          <Text style={styles.text}>• Report payment issue</Text>
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
  text: { fontSize: 15, marginBottom: 6 }
});
