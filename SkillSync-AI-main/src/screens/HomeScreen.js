// src/screens/HomeScreen.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen({ navigation }) {
  return (
    <LinearGradient colors={["#0B3F91", "#061E3A"]} style={{ flex: 1, padding: 20 }}>
      <View style={{ paddingTop: 60 }}>
        <Text style={{ color: "#fff", fontSize: 28, fontWeight: "800" }}>
          Welcome to SkillSync AI
        </Text>
        <Text style={{ color: "#CFE3FF", marginTop: 8, fontSize: 14 }}>
          Your AI mentor for your career roadmap.
        </Text>
      </View>

      <View style={{ marginTop: 24, gap: 12 }}>
        <Action onPress={() => navigation.navigate("Compare")} label="Compare Resume ↔ JD" />
        <Action onPress={() => navigation.navigate("Results")} label="View Results" />
        <Action onPress={() => navigation.navigate("Settings")} label="Settings" />
      </View>
    </LinearGradient>
  );
}

function Action({ label, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={{
        height: 52,
        borderRadius: 14,
        backgroundColor: "rgba(255,255,255,0.12)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.18)",
        justifyContent: "center",
        paddingHorizontal: 16,
      }}
    >
      <Text style={{ color: "#EAF2FF", fontSize: 16, fontWeight: "700" }}>{label}</Text>
    </TouchableOpacity>
  );
}
