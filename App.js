// App.js (React Router + Fullscreen Routing)
import React from "react";
import { SafeAreaView, StatusBar, View, StyleSheet } from "react-native";
import { NativeRouter, Routes, Route } from "react-router-native";
import { theme } from "./styles/theme";

// Screens
import { HomeScreen } from "./screens/HomeScreen";
import { BookingScreen } from "./screens/BookingScreen";
import { ActivityScreen } from "./screens/ActivityScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { SearchScreen } from "./screens/SearchScreen";
import { RideResultsScreen } from "./screens/RideResultsScreen";
import { DriverDetailsScreen } from "./screens/DriverDetailsScreen";
import { PaymentScreen } from "./screens/PaymentScreen";
import { SafetyScreen } from "./screens/SafetyScreen";
import { HelpSupportScreen } from "./screens/HelpSupportScreen";
import { AboutScreen } from "./screens/AboutScreen";
import { PaymentMethodsScreen } from "./screens/PaymentMethodsScreen";




// ------------------------------
// TABS WRAPPER - Only Home / Activity / Profile
// ------------------------------
function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/activity" element={<ActivityScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/safety" element={<SafetyScreen />} />
        <Route path="/help" element={<HelpSupportScreen />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/payment-methods" element={<PaymentMethodsScreen />} />



      </Routes>
    </View>
  );
}

// ------------------------------
// MAIN ROUTER
// ------------------------------
export default function App() {
  return (
    <NativeRouter>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <StatusBar barStyle="dark-content" />

        <Routes>

          {/* MAIN APP WITH TABS */}
          <Route path="/*" element={<TabLayout />} />

          {/* FULLSCREEN ROUTES */}
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/results" element={<RideResultsScreen />} />
          <Route path="/driver/:rideId" element={<DriverDetailsScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/booking" element={<BookingScreen />} />

        </Routes>

      </SafeAreaView>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({});
