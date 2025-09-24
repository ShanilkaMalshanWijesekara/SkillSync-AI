// src/screens/CompareScreen.js
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

/* --- SAMPLE TEXTS (tap "Sample" to autofill) --- */
const SAMPLE_RESUME =
  "Projects: E-commerce frontend (React, Tailwind), Mobile app (React Native).\nSkills: JavaScript, HTML, CSS, Git, REST APIs, MongoDB basics.\nCerts: Google UX basics.";
const SAMPLE_JD =
  "Looking for a React developer with TypeScript, React Router, testing (Jest), API integration, and CI familiarity. Bonus: Docker and Accessibility (a11y).";

export default function CompareScreen({ navigation }) {
  const { height } = useWindowDimensions();
  const scale = Math.max(0.85, Math.min(1.0, height / 820));

  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [noStore, setNoStore] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const canAnalyze = useMemo(() => resume.trim().length > 30 && jd.trim().length > 30, [resume, jd]);

  // fake progress loader
  const timerRef = useRef(null);
  useEffect(() => {
    if (!analyzing) return;
    setProgress(0);
    timerRef.current = setInterval(() => {
      setProgress((p) => {
        const next = p + (p < 60 ? 4 : p < 85 ? 3 : 2);
        if (next >= 100) {
          clearInterval(timerRef.current);
          // navigate to results after a short delay to show 100%
          setTimeout(() => {
            setAnalyzing(false);
            navigation.navigate("Results");
          }, 350);
          return 100;
        }
        return next;
      });
    }, 120);
    return () => clearInterval(timerRef.current);
  }, [analyzing, navigation]);

  const padH = 18 * scale;
  const titleF = 22 * scale;
  const labelF = 13 * scale;
  const bodyF = 14.5 * scale;
  const btnH = 46 * scale;
  const chipF = 12 * scale;

  return (
    <LinearGradient colors={["#0B3F91", "#061E3A"]} style={{ flex: 1 }}>
      {/* Top bar */}
      <View style={{ paddingTop: 12 + (Platform.OS === "ios" ? 24 : 6), paddingBottom: 10, paddingHorizontal: padH, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{ color: "#CFE3FF", fontSize: 12 * scale }}>6m</Text>
        <Text style={{ color: "#CFE3FF", fontSize: 12 * scale }}>⋯</Text>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: padH, paddingBottom: 90 }} keyboardShouldPersistTaps="handled">
          {/* Hero title */}
          <View style={{ marginBottom: 14 * scale }}>
            <Text style={{ color: "#EAF2FF", fontSize: 25 * scale, fontWeight: "700",alignItems:"center",textAlign:"center",marginBottom:20}}>
              Your AI Mentor for Your{"\n"}Career Roadmap
            </Text>
          </View>

          {/* Resume card */}
          <Card
            title="Your Resume (Text)"
            value={resume}
            onChangeText={setResume}
            placeholder="Paste your resume text here…"
            labelF={labelF}
            bodyF={bodyF}
            chipF={chipF}
            onSample={() => setResume(SAMPLE_RESUME)}
            onClear={() => setResume("")}
          />

          {/* JD card */}
          <Card
            title="Target Job Description"
            value={jd}
            onChangeText={setJd}
            placeholder="Paste the job description here…"
            labelF={labelF}
            bodyF={bodyF}
            chipF={chipF}
            onSample={() => setJd(SAMPLE_JD)}
            onClear={() => setJd("")}
          />

          {/* Privacy + Analyze */}
          <View style={{ marginTop: 12 * scale, gap: 12 }}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setNoStore((v) => !v)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  borderWidth: 2,
                  borderColor: noStore ? "#60A5FA" : "rgba(255,255,255,0.8)",
                  backgroundColor: noStore ? "#2A6EF5" : "transparent",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {noStore ? <Text style={{ color: "#fff", fontWeight: "700" }}>✓</Text> : null}
              </View>
              <Text style={{ color: "#CFE3FF", fontSize: 12.5 * scale }}>
                Don’t save my data (privacy-first)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={!canAnalyze}
              onPress={() => setAnalyzing(true)}
              activeOpacity={0.9}
              style={{
                height: btnH,
                borderRadius: 12,
                backgroundColor: canAnalyze ? "#2A6EF5" : "rgba(255,255,255,0.25)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 * scale }}>
                Analyze
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      

      {/* Analyzing overlay */}
      <Modal visible={analyzing} transparent animationType="fade" onRequestClose={() => setAnalyzing(false)}>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.35)", justifyContent: "center", alignItems: "center", padding: 18 }}>
          <View style={{ width: "100%", maxWidth: 380, backgroundColor: "#0B1220", borderRadius: 18, padding: 18, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" }}>
            <Text style={{ color: "#EAF2FF", fontWeight: "700", marginBottom: 10 }}>Comparing…</Text>
            <Text style={{ color: "#BFD3EE", fontSize: 13, marginBottom: 14 }}>
              We’re analyzing your resume against the job description.
            </Text>
            <View style={{ height: 10, backgroundColor: "rgba(255,255,255,0.18)", borderRadius: 999, overflow: "hidden" }}>
              <View style={{ width: `${progress}%`, height: 10, backgroundColor: "#2A6EF5" }} />
            </View>
            <Text style={{ color: "#9FC0F4", fontSize: 12, marginTop: 8 }}>{progress}%</Text>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

/* -------------------- Components -------------------- */

function Card({
  title,
  value,
  onChangeText,
  placeholder,
  labelF,
  bodyF,
  chipF,
  onSample,
  onClear,
}) {
  const chars = value.length;
  return (
    <View
      style={{
        backgroundColor: "rgba(255,255,255,0.08)",
        borderColor: "rgba(255,255,255,0.16)",
        borderWidth: 1,
        borderRadius: 18,
        padding: 12,
        marginBottom: 14,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <Text style={{ color: "#EAF2FF", fontWeight: "700", fontSize: 14.5 }}>
          {title}
        </Text>
        <Text style={{ color: "#9DB6DA", fontSize: 12 }}>{chars} chars</Text>
      </View>

      <TextInput
        multiline
        placeholder={placeholder}
        placeholderTextColor="rgba(207,227,255,0.6)"
        value={value}
        onChangeText={onChangeText}
        style={{
          minHeight: 120,
          maxHeight: 240,
          padding: 10,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.18)",
          backgroundColor: "rgba(255,255,255,0.12)",
          color: "#fff",
          fontSize: bodyF,
          lineHeight: 20,
          textAlignVertical: "top",
        }}
      />

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Chip label="Paste" onPress={() => pasteTo(onChangeText)} fontSize={chipF} />
          <Chip label="Clear" onPress={onClear} fontSize={chipF} />
        </View>
        <TouchableOpacity
          onPress={onSample}
          style={{
            paddingHorizontal: 12,
            height: 32,
            borderRadius: 10,
            backgroundColor: "#2A6EF5",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 12 }}>Sample</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Chip({ label, onPress, fontSize = 12 }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 30,
        paddingHorizontal: 12,
        borderRadius: 999,
        backgroundColor: "rgba(255,255,255,0.10)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.16)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "#D9E8FF", fontSize, fontWeight: "600" }}>{label}</Text>
    </TouchableOpacity>
  );
}

function NavItem({ label, active, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ alignItems: "center", paddingVertical: 4, minWidth: 64 }}>
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          backgroundColor: active ? "#2A6EF5" : "rgba(255,255,255,0.14)",
          marginBottom: 4,
        }}
      />
      <Text style={{ color: active ? "#93C5FD" : "#CFE3FF", fontSize: 11, fontWeight: active ? "700" : "500" }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/* -------------- helpers -------------- */
// Paste helper (works in Expo Go / RN 0.74+ with Clipboard API)
async function pasteTo(setter) {
  try {
    // dynamic import to avoid extra dependency if not used
    const { getStringAsync, hasStringAsync } = await import("expo-clipboard");
    const ok = await hasStringAsync();
    if (!ok) return;
    const s = await getStringAsync();
    if (s) setter((prev) => (prev ? prev + (prev.endsWith("\n") ? "" : "\n") + s : s));
  } catch {
    // no-op if clipboard not available
  }
}
