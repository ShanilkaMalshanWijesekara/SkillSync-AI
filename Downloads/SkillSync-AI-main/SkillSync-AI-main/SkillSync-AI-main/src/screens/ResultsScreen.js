// src/screens/ResultsScreen.js
import React, { useEffect, useMemo, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const SAMPLE = {
  score: 72,
  existing: ["React", "REST APIs", "Git", "MongoDB basics"],
  missing: ["TypeScript", "Jest", "Accessibility (a11y)", "CI/CD"],
  keywords: [
    "TypeScript",
    "Unit testing (Jest)",
    "React Router",
    "a11y",
    "CI/CD",
  ],
  resources: [
    {
      platform: "FreeCodeCamp",
      title: "TypeScript for JS Devs",
      level: "Beginner",
      cost: "Free",
      url: "https://www.freecodecamp.org/",
    },
    {
      platform: "YouTube • Net Ninja",
      title: "Jest Crash Course",
      level: "Beginner",
      cost: "Free",
      url: "https://youtube.com",
    },
    {
      platform: "Udemy",
      title: "React Testing with Jest",
      level: "Intermediate",
      cost: "Paid",
      url: "https://udemy.com",
    },
    {
      platform: "Web.dev",
      title: "Accessibility Fundamentals",
      level: "Beginner",
      cost: "Free",
      url: "https://web.dev",
    },
  ],
};

export default function ResultsScreen({ route, navigation }) {
  const data = route?.params?.data ?? SAMPLE;

  // animated score number (0 -> score)
  const animated = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    animated.setValue(0);
    Animated.timing(animated, {
      toValue: data.score,
      duration: 900,
      useNativeDriver: false, // text interpolation needs false
    }).start();
  }, [data.score]);

  // Turn the animated value into text (0 -> data.score)
  const scoreAnimText = useMemo(
    () =>
      animated.interpolate({
        inputRange: [0, Math.max(1, data.score)],
        outputRange: ["0", String(data.score)],
        extrapolate: "clamp",
      }),
    [animated, data.score]
  );

  const tip =
    data.score >= 85
      ? "Great match — polish your resume keywords."
      : data.score >= 70
      ? "Nice fit. Focus on TypeScript & testing for a quick uplift."
      : "Close! Add missing skills & keywords to improve your fit.";

  return (
    <LinearGradient
      colors={["#0C1E40", "#0A3D7A", "#082247"]}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 140 }} // extra bottom space for tab bar
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text
          style={{
            color: "#fff",
            fontSize: 25,
            fontWeight: "700",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Your AI Mentor for Your Career Roadmap.
        </Text>

        {/* Fit Card */}
        <Card title="Your Fit">
          <View
            style={{
              backgroundColor: "#F6F7FB",
              borderRadius: 14,
              paddingVertical: 16,
              paddingHorizontal: 12,
              alignItems: "center",
            }}
          >
            {/* simple ring look */}
            <View
              style={{
                width: 108,
                height: 108,
                borderRadius: 54,
                borderWidth: 10,
                borderColor: "#E5E7EB",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 8,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: 54,
                  borderWidth: 10,
                  borderColor:
                    data.score >= 70
                      ? "#22C55E"
                      : data.score >= 50
                      ? "#F59E0B"
                      : "#EF4444",
                  transform: [{ rotateZ: "120deg" }],
                  opacity: 0.85,
                }}
              />
              <Animated.Text
                style={{ fontSize: 22, fontWeight: "900", color: "#0f172a" }}
              >
                {scoreAnimText}%
              </Animated.Text>
              <Text style={{ fontSize: 12, color: "#334155" }}>Fit Score</Text>
            </View>
            <Text style={{ textAlign: "center", color: "#475569" }}>{tip}</Text>
          </View>
        </Card>

        {/* Keywords */}
        <Card title="Resume Keywords to Add" padTight>
          <ChipRow items={data.keywords} color="#FDE68A" text="#92400E" />
        </Card>

        {/* Existing */}
        <Card title="Existing Skills" padTight>
          <ChipRow items={data.existing} color="#DCFCE7" text="#166534" />
        </Card>

        {/* Missing */}
        <Card title="Missing Skills" padTight>
          <ChipRow items={data.missing} color="#FEE2E2" text="#991B1B" />
        </Card>

        {/* Resources */}
        <Card
          title="Recommended Resources"
          rightHint="Filters: Free • Beginner"
        >
          <View style={{ rowGap: 10 }}>
            {data.resources.map((r, i) => (
              <View
                key={i}
                style={{
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  backgroundColor: "#F8FAFC",
                  padding: 12,
                }}
              >
                <Text style={{ fontSize: 12, color: "#64748B" }}>
                  {r.platform}
                </Text>
                <Text
                  style={{ fontSize: 14, color: "#0F172A", fontWeight: "700" }}
                >
                  {r.title}
                </Text>
                <Text style={{ fontSize: 12, color: "#64748B" }}>
                  {r.level} • {r.cost}
                </Text>
                <TouchableOpacity
                  onPress={() => r.url && Linking.openURL(r.url)}
                >
                  <Text style={{ color: "#2563EB", marginTop: 6 }}>
                    Open link →
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </Card>

        {/* Actions */}
        <View style={{ flexDirection: "row", marginTop: 8 }}>
          <PrimaryBtn
            label="Re-analyze"
            onPress={() => navigation.navigate("Compare")}
          />
          <View style={{ width: 10 }} />
          <GhostBtn
            label="Save Result"
            onPress={() => {
              /* TODO: hook to backend / local save */
            }}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

/* ---------------- helpers ---------------- */

function Card({ title, children, rightHint, padTight = false }) {
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: padTight ? 10 : 14,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}
      >
        <Text
          style={{ fontSize: 16, fontWeight: "800", color: "#0F172A", flex: 1 }}
        >
          {title}
        </Text>
        {!!rightHint && (
          <Text style={{ fontSize: 11, color: "#64748B" }}>{rightHint}</Text>
        )}
      </View>
      {children}
    </View>
  );
}

function ChipRow({ items, color, text }) {
  return (
    <View
      style={{ flexDirection: "row", flexWrap: "wrap", marginHorizontal: -4 }}
    >
      {items.map((t, i) => (
        <View
          key={`${t}-${i}`}
          style={{
            backgroundColor: color,
            paddingVertical: 6,
            paddingHorizontal: 10,
            borderRadius: 999,
            margin: 4, // replaces 'gap' for wider RN support
          }}
        >
          <Text style={{ color: text, fontWeight: "700", fontSize: 12 }}>
            {t}
          </Text>
        </View>
      ))}
    </View>
  );
}

function PrimaryBtn({ label, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        height: 48,
        borderRadius: 12,
        backgroundColor: "#2563EB",
        alignItems: "center",
        justifyContent: "center",
      }}
      activeOpacity={0.9}
    >
      <Text style={{ color: "#fff", fontWeight: "800" }}>{label}</Text>
    </TouchableOpacity>
  );
}

function GhostBtn({ label, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        height: 48,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.5)",
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
      }}
      activeOpacity={0.9}
    >
      <Text style={{ color: "#E2E8F0", fontWeight: "800" }}>{label}</Text>
    </TouchableOpacity>
  );
}
