// src/screens/PostLoginWelcome.js
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
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function PostLoginWelcome({ navigation }) {
  const go = () => navigation.navigate("MainTabs"); // <- OnboardingScreen route

  return (
    <LinearGradient
      colors={["#31B0FF", "#1B4BD4", "#A317B9"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={s.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={s.safe}>
        {/* curved middle ribbon */}
        <View style={s.ribbonWrap}>
          <LinearGradient
            colors={["#fff9ff03", "#ff00e642"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.6, y: 1 }}
            style={s.ribbon}
          />
          <LinearGradient
            colors={["#00000020", "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={s.ribbonShadow}
          />
        </View>

        {/* top pill welcome */}
        <View style={s.pill}>
          <Text style={s.pillTitle}>Welcome to a Fast Blockchain</Text>
          <Text style={s.pillSub}>Your AI mentor for your career roadmap.</Text>
        </View>

        {/* vertical brand on the left */}
        <Text style={s.verticalBrand}>SkillSync AI</Text>

        {/* robot hero */}
        <Image
          source={require("../../assets/ai-logo2.png")}
          style={s.hero}
          resizeMode="contain"
        />

        {/* copy */}
        <View style={s.copyWrap}>
          <Text style={s.h1}>Ready to{"\n"}Learn</Text>
          <Text style={s.body}>
            EX : Our technology performing fast blockchain (120K TPS) and it has
            guaranteed AI-based data security.
          </Text>
          {/* optional link color piece */}
          <Text style={[s.body, { marginTop: 6 }]}>
            <Text style={{ color: "#79E0FF", textDecorationLine: "underline" }}>
              (mekata gelapena ekk dnnaaaa)
            </Text>
          </Text>
        </View>

        {/* get started */}
        <TouchableOpacity activeOpacity={0.9} onPress={go} style={s.cta}>
          <LinearGradient
            colors={["#7DF3FF", "#A08BFF"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={s.ctaBg}
          >
            <Text style={s.ctaText}>Get started</Text>
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  safe: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 24 : 0,
  },

  /* curved blue ribbon in the middle */
  ribbonWrap: { position: "absolute", top: height * 0.16, left: 0, right: 0 },
  ribbon: {
    position: "absolute",
    left: width * 0.035,
    width: width * 0.2,
    height: height * 0.38,
    borderRadius: width,
    transform: [{ rotate: "0deg" }],
    top: height * 0.06,
  },
  ribbonShadow: {
    position: "absolute",
    left: width * 0.035,
    width: width * 0.2,
    height: height * 0.38,
    borderRadius: width,
    top: height * 0.06,
  },

  /* top welcome pill */
  pill: {
    alignSelf: "center",
    marginTop: 45,
    paddingVertical: 10,
    paddingHorizontal: 26,
    backgroundColor: "#2F6DFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 3,
  },
  pillTitle: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 24,
    textAlign: "center",
  },
  pillSub: {
    color: "#CFE3FF",
    fontSize: 15,
    textAlign: "center",
    marginTop: 2,
  },

  /* vertical brand */
  verticalBrand: {
    position: "absolute",
    top: height * 0.37,
    left: -86,
    color: "#9dcbff30",
    fontSize: 50,
    fontWeight: "900",
    transform: [{ rotate: "-90deg" }],
  },

  hero: {
    alignSelf: "center",
    width: width * 0.7,
    height: height *0.5,
    marginTop: -30,
  },

  copyWrap: {
    marginTop: -50,
    paddingHorizontal: 18,
  },
  h1: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "800",
    lineHeight: 38,
  },
  body: {
    color: "#EAF2FF",
    marginTop: 10,
    fontSize: 15,
  },

  cta: {
    position: "absolute",
    left: 18,
    bottom: 56,
    marginTop: 6,
    marginBottom: -18,
    
  },
  ctaBg: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    
  },
  ctaText: {
    color: "#0A2145",
    fontWeight: "800",
    fontSize: 15,
  },
});
