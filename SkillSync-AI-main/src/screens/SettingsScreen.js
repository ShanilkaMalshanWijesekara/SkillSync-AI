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
