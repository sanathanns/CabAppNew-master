// ./screens/PaymentScreen.js
import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useLocation, useNavigate } from "react-router-native";
import { theme } from "../styles/theme";

export function PaymentScreen() {
  const navigate = useNavigate();
  const loc = useLocation();
  const q = new URLSearchParams(loc.search);

  const pickup = q.get("pickup");
  const destination = q.get("destination");
  const price = q.get("price") || q.get("priceText") || "120";

  const [card, setCard] = useState("");
  const [name, setName] = useState("");
  const [processing, setProcessing] = useState(false);

  function onPay() {
    if (card.length < 10 || name.length < 2) {
      Alert.alert("Incomplete", "Enter card number (dummy) and name");
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      // success -> go to booking route with same params
      const params = new URLSearchParams();
      params.set("pickup", pickup);
      params.set("destination", destination);
      params.set("price", price);
      params.set("paid", "true");
      navigate(`/booking?${params.toString()}`);
    }, 1200);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>Dummy Payment</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Amount</Text>
        <Text style={styles.amount}>₹{price}</Text>

        <Text style={[styles.label, { marginTop: 12 }]}>Card number</Text>
        <TextInput value={card} onChangeText={setCard} placeholder="0000 0000 0000 0000" style={styles.input} keyboardType="numeric" />

        <Text style={[styles.label, { marginTop: 8 }]}>Name on card</Text>
        <TextInput value={name} onChangeText={setName} placeholder="Your name" style={styles.input} />

        <TouchableOpacity style={[styles.payBtn, processing && { opacity: 0.7 }]} onPress={onPay} disabled={processing}>
          <Text style={styles.payText}>{processing ? "Processing..." : "Pay ₹" + price}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, padding: 18, backgroundColor: theme.colors.background },
  title: { fontSize: 20, fontWeight: "900", marginBottom: 12, color: theme.colors.text },
  card: { backgroundColor: "#fff", padding: 16, borderRadius: 12 },
  label: { fontSize: 13, color: theme.colors.muted, fontWeight: "700" },
  amount: { fontSize: 22, fontWeight: "900", marginTop: 4 },
  input: { marginTop: 8, padding: 12, backgroundColor: "#F6F7FA", borderRadius: 8 },
  payBtn: { marginTop: 16, backgroundColor: theme.colors.primary, paddingVertical: 14, borderRadius: 10, alignItems: "center" },
  payText: { color: "#fff", fontWeight: "900" },
});
