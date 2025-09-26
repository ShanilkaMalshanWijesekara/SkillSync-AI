// src/screens/SplashScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function SplashScreen({ navigation }) {
  const go = () => navigation.replace("Onboarding"); // go to Onboarding on button press only

  return (
    <LinearGradient
      colors={["#f200ffa3", "#0B3D91", "#062552"]}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safe}>
        {/* decorative top blob */}
        <LinearGradient
          colors={["#BDAEFF", "transparent"]}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.topBlob}
          pointerEvents="none"
        />

        {/* Brand near the top */}
        <Text style={styles.brand}>
          <Text style={{ fontWeight: "800" }}>SkillSync </Text>
          <Text style={{ fontWeight: "900" }}>AI</Text>
        </Text>

        {/* Centered content area */}
        <View style={styles.centerWrap}>
          <Image
            source={require("../../assets/ai-logo2.png")}
            style={styles.hero}
            resizeMode="contain"
          />
        </View>

        {/* Bottom button */}
        <View style={styles.footer}>
          <TouchableOpacity activeOpacity={0.9} onPress={go}>
            <View style={styles.btnWrap}>
              <Text style={styles.btnText}>Get Started</Text>
              {/* soft glow underline */}
              
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1, paddingTop: Platform.OS === "android" ? 24 : 0 },
  topBlob: {
    position: "absolute",
    top: -110,
    left: -40,
    width: 320,
    height: 220,
    borderBottomLeftRadius: 220,
    borderBottomRightRadius: 220,
    opacity: 0.9,
  },
  brand: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 40,
    textAlign: "left",
    paddingHorizontal: 24,
    marginTop: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
    paddingTop: 70,
    paddingLeft: 65,
  },
  // ---- centering the image properly ----
  centerWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // keep some space so the brand and button don’t overlap
    paddingTop: 1,
    paddingBottom: 10,
    
  },
  hero: {
    width: 460,
    height: 460,
  },
  // --------------------------------------
  footer: {
    alignItems: "center",
    marginBottom: 28,
  },
  btnWrap: {
    width: 280,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 4,
  },
  btnText: { color: "#0E1A3A", fontWeight: "800", fontSize: 16 },
  btnGlow: {
    position: "absolute",
    bottom: -8,
    left: 20,
    right: 20,
    height: 6,
    borderRadius: 8,
    opacity: 0.9,
  },
});
