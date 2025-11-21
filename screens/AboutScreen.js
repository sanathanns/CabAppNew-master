import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigate } from "react-router-native";
import { theme } from "../styles/theme";

export function AboutScreen() {
  const navigate = useNavigate();

  return (
    <SafeAreaView style={styles.safe}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate(-1)} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About SheCab</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        <Text style={styles.title}>SheCab — Women’s Only Safe Ride Service</Text>

        <Text style={styles.text}>
          SheCab is a women-exclusive cab service designed to provide safe, 
          comfortable, and reliable travel for women across India. 
          Our mission is to ensure every woman can travel freely and confidently 
          without fear or discomfort.
        </Text>

        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.text}>
          To create a transportation ecosystem where women feel safe, empowered, 
          and respected. SheCab aims to eliminate travel anxiety and promote 
          independent, secure mobility.
        </Text>

        <Text style={styles.sectionTitle}>Why Choose SheCab?</Text>
        <Text style={styles.bullet}>• Women-only drivers for complete safety</Text>
        <Text style={styles.bullet}>• 24/7 SOS helpline</Text>
        <Text style={styles.bullet}>• Live ride tracking</Text>
        <Text style={styles.bullet}>• Instant helpline access</Text>
        <Text style={styles.bullet}>• Transparent pricing</Text>

        <Text style={styles.sectionTitle}>Safety Commitments</Text>
        <Text style={styles.text}>
          Every driver on SheCab is identity-verified, trained in emergency response, 
          and committed to providing a respectful and safe environment for female riders.
        </Text>

        <Text style={styles.sectionTitle}>Our Vision</Text>
        <Text style={styles.text}>
          To become India’s leading women-focused mobility platform and provide 
          safe rides in every major city.
        </Text>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: theme.colors.text,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 12,
    color: theme.colors.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 16,
    marginBottom: 6,
    color: theme.colors.text,
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    color: theme.colors.muted,
  },
  bullet: {
    fontSize: 15,
    marginVertical: 4,
    color: theme.colors.text,
  },
});
