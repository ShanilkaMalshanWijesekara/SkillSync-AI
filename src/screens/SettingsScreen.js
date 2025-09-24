// src/screens/SettingsScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Ionicons,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const Item = ({ icon, label, onPress, danger = false, rightArrow = true }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.item, danger && styles.itemDanger]}>
    <View style={styles.itemLeft}>
      {icon}
      <Text style={[styles.itemText, danger && styles.itemTextDanger]}>{label}</Text>
    </View>
    {rightArrow && (
      <Feather name="chevron-right" size={22} color={danger ? "#ff6b6b" : "#0E1A3A"} />
    )}
  </TouchableOpacity>
);

export default function SettingsScreen({ navigation }) {
  return (
    <LinearGradient colors={["#0C2148", "#0C2148"]} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safe}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => navigation?.goBack?.()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.topBarTitle}>Settings</Text>
          <View style={{ width: 26 }} />{/* placeholder to balance back icon */}
        </View>

        {/* Title */}
        <Text style={styles.title}>Your AI Mentor for Your{"\n"}Career Roadmap.</Text>

        {/* Light “panel” background to mimic the mid-screen divider */}
        <View style={styles.panelWrap}>
          {/* Group 1 */}
          <View style={styles.card}>
            <Item
              label="Notifications"
              icon={<Ionicons name="notifications-outline" size={22} color="#0E1A3A" style={styles.icon} />}
              onPress={() => {}}
            />
            <View style={styles.divider} />
            <Item
              label="Account"
              icon={<Feather name="user" size={22} color="#0E1A3A" style={styles.icon} />}
              onPress={() => {}}
            />
          </View>

          {/* Group 2 */}
          <View style={styles.card}>
            <Item
              label="Privacy"
              icon={<MaterialCommunityIcons name="shield-eye-outline" size={22} color="#0E1A3A" style={styles.icon} />}
              onPress={() => {}}
            />
            <View style={styles.divider} />
            <Item
              label="Security"
              icon={<MaterialIcons name="security" size={22} color="#0E1A3A" style={styles.icon} />}
              onPress={() => {}}
            />
            <View style={styles.divider} />
            <Item
              label="About & Help"
              icon={<Ionicons name="information-circle-outline" size={22} color="#0E1A3A" style={styles.icon} />}
              onPress={() => {}}
            />
          </View>

          {/* Logout */}
          <View style={styles.card}>
            <Item
              label="Log Out"
              icon={<MaterialCommunityIcons name="logout" size={22} color="#ff6b6b" style={styles.icon} />}
              onPress={() => {}}
              danger
              rightArrow={false}
            />
          </View>
        </View>

        {/* Bottom tab bar notch hint (optional; your real TabNavigator will render its own) */}
        <View style={styles.tabGhost} />
      </SafeAreaView>
    </LinearGradient>
  );
}

const RADIUS = 16;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0C2148" },
  safe: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 24 : 0,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 4,
    justifyContent: "space-between",
  },
  topBarTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 16,
    lineHeight: 24,
  },
  panelWrap: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "transparent",
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: RADIUS,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 16,
    // subtle shadow
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 3,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    justifyContent: "space-between",
  },
  itemDanger: {
    backgroundColor: "#FFF5F5",
    borderRadius: RADIUS - 4,
    paddingHorizontal: 6,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0E1A3A",
  },
  itemTextDanger: {
    color: "#ff6b6b",
    fontWeight: "700",
  },
  icon: { marginRight: 12 },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E6E9F2",
  },
  tabGhost: {
    height: 18, // just to leave room for a real bottom tab bar
  },
});

import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Switch } from "react-native";
import { colors } from "../theme/colors";
import { useState } from "react";

export default function SettingsScreen() {
  const [dark, setDark] = useState(false);
  const [noStore, setNoStore] = useState(true);
  const [lang, setLang] = useState("English");

  return (
    <LinearGradient colors={[colors.bgTop, colors.bgBottom]} style={{ flex: 1, padding: 16 }}>
      <Text style={{ color: colors.white, fontFamily: "Inter_700Bold", fontSize: 18, marginVertical: 8 }}>Settings</Text>

      <View style={{ backgroundColor: "#fff", padding: 16, borderRadius: 16, marginBottom: 12 }}>
        <Text style={{ fontFamily: "Inter_700Bold", color: "#0f172a", marginBottom: 8 }}>Language</Text>
        <Text style={{ fontFamily: "Inter_500Medium", color: "#475569" }}>{lang}</Text>
      </View>

      <View style={{ backgroundColor: "#fff", padding: 16, borderRadius: 16, marginBottom: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontFamily: "Inter_700Bold", color: "#0f172a" }}>Dark Mode</Text>
        <Switch value={dark} onValueChange={setDark} />
      </View>

      <View style={{ backgroundColor: "#fff", padding: 16, borderRadius: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontFamily: "Inter_700Bold", color: "#0f172a" }}>Don’t store my data</Text>
        <Switch value={noStore} onValueChange={setNoStore} />
      </View>
    </LinearGradient>
  );
}
