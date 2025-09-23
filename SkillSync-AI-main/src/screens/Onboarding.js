import { LinearGradient } from "expo-linear-gradient";
import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "../theme/colors";
import PrimaryButton from "../components/PrimaryButton";

const slides = [
  { h: "Welcome to SkillSync", p: "Your AI mentor for your career roadmap." },
  { h: "Match your skills with jobs", p: "Analyze your resume vs job descriptions & get a Fit Score." },
  { h: "Bridge the gap", p: "Find missing skills, keywords & learning resources. Privacy-first." }
];

export default function OnboardingScreen({ navigation }) {
  const go = () => navigation.replace("Login");
  return (
    <LinearGradient colors={[colors.bgTop, colors.bgBottom]} style={{ flex: 1, padding: 24 }}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        {slides.map((s, i) => (
          <View key={i} style={{ marginBottom: 28 }}>
            <Text style={{ color: colors.white, fontFamily: "Inter_700Bold", fontSize: 24 }}>{s.h}</Text>
            <Text style={{ color: colors.text, marginTop: 6, fontFamily: "Inter_400Regular" }}>{s.p}</Text>
          </View>
        ))}
      </View>
      <View style={{ gap: 12 }}>
        <PrimaryButton title="Continue" onPress={go} />
        <TouchableOpacity onPress={go} style={{ alignItems: "center", paddingVertical: 8 }}>
          <Text style={{ color: colors.textMuted, fontFamily: "Inter_500Medium" }}>Skip</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
