import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    // Auto-navigate after a short delay (optional)
    const timer = setTimeout(() => checkOnboarding(), 1800);
    return () => clearTimeout(timer);
  }, []);

  const checkOnboarding = async () => {
    try {
      const seen = await AsyncStorage.getItem("seen_onboarding");
      if (seen) {
        navigation.replace("MainTabs"); // Skip onboarding if already completed
      } else {
        navigation.replace("Onboarding");
      }
    } catch (error) {
      console.warn("Error checking onboarding flag", error);
      navigation.replace("Onboarding"); // fallback
    }
  };

  return (
    <LinearGradient
      colors={["#2C90F5", "#001A3A"]}
      style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 40 }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Top Section */}
        <View style={{ alignItems: "center", marginTop: 100 }}>
          <Text
            style={{
              fontSize: 36,
              fontFamily: "Inter_700Bold",
              color: "#fff",
              marginBottom: 50,
              textAlign: "center",
            }}
          >
            SkillSync <Text style={{ color: "#0EF0FF" }}>AI</Text>
          </Text>

          <Image
            source={require("../../assets/ai-logo.png")}
            style={{
              width: 230,
              height: 230,
              resizeMode: "contain",
            }}
          />
        </View>

        {/* Bottom Button (Manual Option) */}
        <TouchableOpacity
          onPress={checkOnboarding}
          style={{
            backgroundColor: "#fff",
            borderRadius: 50,
            paddingVertical: 14,
            paddingHorizontal: 100,
            marginBottom: 30,
            elevation: 4,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
          }}
        >
          <Text
            style={{
              color: "#000",
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
