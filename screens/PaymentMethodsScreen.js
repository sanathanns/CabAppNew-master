import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Modal
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../styles/theme";
import { useNavigate } from "react-router-native";

export function PaymentMethodsScreen() {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState(120); // dummy wallet amount
  const [addModal, setAddModal] = useState(false);
  const [amount, setAmount] = useState("");

  function addMoney(option) {
    if (!amount) return;
    const newAmount = wallet + parseInt(amount);
    setWallet(newAmount);
    setAddModal(false);
    setAmount("");
    alert(`Money added via ${option}`);
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigate(-1)}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* WALLET CARD */}
      <View style={styles.walletCard}>
        <Text style={styles.walletLabel}>SheCab Wallet</Text>
        <Text style={styles.walletAmount}>₹{wallet}</Text>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setAddModal(true)}
        >
          <Ionicons name="add-circle" size={20} color="#fff" />
          <Text style={styles.addBtnText}>Add Money</Text>
        </TouchableOpacity>
      </View>

      {/* OTHER PAYMENT OPTIONS */}
      <View style={styles.list}>
        <Text style={styles.sectionTitle}>Other Payment Methods</Text>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="card" size={22} color={theme.colors.primary} />
          <Text style={styles.optionText}>Credit / Debit Card</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="cash" size={22} color={theme.colors.primary} />
          <Text style={styles.optionText}>Cash</Text>
        </TouchableOpacity>
      </View>

      {/* ADD MONEY MODAL */}
      <Modal visible={addModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Add Money to Wallet</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />

            <Text style={styles.payVia}>Pay Via</Text>

            {/* GPay */}
            <TouchableOpacity
              style={styles.payOption}
              onPress={() => addMoney("Google Pay")}
            >
              <Ionicons name="logo-google" size={24} color="#DB4437" />
              <Text style={styles.payText}>Google Pay</Text>
            </TouchableOpacity>

            {/* PhonePe */}
            <TouchableOpacity
              style={styles.payOption}
              onPress={() => addMoney("PhonePe")}
            >
              <Ionicons name="phone-portrait" size={24} color="#5a31f4" />
              <Text style={styles.payText}>PhonePe</Text>
            </TouchableOpacity>

            {/* Paytm */}
            <TouchableOpacity
              style={styles.payOption}
              onPress={() => addMoney("Paytm")}
            >
              <Ionicons name="logo-paypal" size={24} color="#003087" />
              <Text style={styles.payText}>Paytm</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeModal}
              onPress={() => setAddModal(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

/* ====================== STYLES ======================= */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: theme.colors.text,
  },

  walletCard: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 20,
    borderRadius: 16,
    ...theme.shadows.medium,
  },

  walletLabel: {
    fontSize: 14,
    color: theme.colors.muted,
  },

  walletAmount: {
    fontSize: 32,
    fontWeight: "900",
    marginVertical: 8,
    color: theme.colors.text,
  },

  addBtn: {
    flexDirection: "row",
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    alignSelf: "flex-start",
  },

  addBtnText: {
    color: "#fff",
    fontWeight: "800",
    marginLeft: 6,
  },

  list: {
    marginHorizontal: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
    color: theme.colors.text,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
    ...theme.shadows.small,
  },

  optionText: {
    marginLeft: 12,
    fontSize: 15,
    color: theme.colors.text,
  },

  /* MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },

  modalCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 14,
    color: theme.colors.text,
  },

  input: {
    backgroundColor: "#f1f1f1",
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
  },

  payVia: {
    fontSize: 14,
    color: theme.colors.muted,
    marginBottom: 10,
  },

  payOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },

  payText: {
    fontSize: 16,
    marginLeft: 10,
    color: theme.colors.text,
  },

  closeModal: {
    alignSelf: "center",
    marginTop: 16,
  },

  closeText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: "700",
  },
});
