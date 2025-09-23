// src/screens/Onboarding.js
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  useWindowDimensions,
  Pressable,
  AccessibilityInfo,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SLIDES = [
  {
    id: "1",
    title: "Welcome to SkillSync",
    body: "Your AI mentor for your career roadmap.",
  },
  {
    id: "2",
    title: "Match your skills with jobs",
    body: "Analyze your resume vs job descriptions and get a Fit Score.",
  },
  {
    id: "3",
    title: "Bridge the gap",
    body: "Find missing skills, keywords, and learning resources.",
  },
];

export default function Onboarding({ navigation }) {
  const { width } = useWindowDimensions();
  const listRef = useRef(null);
  const [index, setIndex] = useState(0);

  const goNext = async () => {
    if (index < SLIDES.length - 1) {
      listRef.current?.scrollToIndex({ index: index + 1, animated: true });
    } else {
      await AsyncStorage.setItem("seen_onboarding", "1");
      navigation.replace("MainTabs"); // or "Login"/"SignUp" if you prefer
    }
  };

  const skipAll = async () => {
    await AsyncStorage.setItem("seen_onboarding", "1");
    navigation.replace("MainTabs");
  };

  return (
    <LinearGradient colors={["#0E3166", "#072645", "#041A32"]} style={{ flex: 1 }}>
      <FlatList
        ref={listRef}
        data={SLIDES}
        keyExtractor={(i) => i.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const i = Math.round(e.nativeEvent.contentOffset.x / width);
          setIndex(i);
        }}
        renderItem={({ item }) => (
          <View
            style={{
              width,
              paddingHorizontal: 24,
              paddingTop: 90,
              paddingBottom: 120,
              justifyContent: "flex-start",
            }}
            accessible
            accessibilityRole="summary"
            accessibilityLabel={`${item.title}. ${item.body}`}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 32,
                fontWeight: "800",
                letterSpacing: 0.2,
              }}
              maxFontSizeMultiplier={1.3}
            >
              {item.title}
            </Text>
            <Text
              style={{
                color: "#CFE3FF",
                fontSize: 16,
                lineHeight: 24,
                marginTop: 10,
              }}
              maxFontSizeMultiplier={1.3}
            >
              {item.body}
            </Text>
          </View>
        )}
      />

      {/* Dots + buttons */}
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 26,
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        {/* dots */}
        <View style={{ flexDirection: "row", gap: 8, marginBottom: 14 }}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={{
                width: i === index ? 22 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: i === index ? "#60A5FA" : "rgba(255,255,255,0.35)",
              }}
              accessibilityElementsHidden
              importantForAccessibility="no"
            />
          ))}
        </View>

        {/* primary button */}
        <Pressable
          onPress={goNext}
          style={({ pressed }) => ({
            width: "92%",
            height: 52,
            borderRadius: 16,
            backgroundColor: "#3B82F6",
            opacity: pressed ? 0.9 : 1,
            alignItems: "center",
            justifyContent: "center",
          })}
          accessibilityRole="button"
          accessibilityLabel={index < SLIDES.length - 1 ? "Continue" : "Get started"}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "800" }}>
            {index < SLIDES.length - 1 ? "Continue" : "Get Started"}
          </Text>
        </Pressable>

        {/* skip */}
        <Pressable
          onPress={skipAll}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Skip onboarding"
          style={{ marginTop: 12 }}
        >
          <Text style={{ color: "#BFD3EE", fontSize: 16 }}>Skip</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}
