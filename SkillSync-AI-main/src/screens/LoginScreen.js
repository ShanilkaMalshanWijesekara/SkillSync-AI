// src/screens/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const emailErr = email.length > 0 && !EMAIL_RE.test(email);
  const canLogin = EMAIL_RE.test(email) && pwd.length >= 6;

  const onLogin = () => {
    // TODO: call your real backend here
    navigation.replace("PostLoginWelcome");
  };

  return (
    <LinearGradient
      colors={["#e725f1ff", "#0B5EC9", "#0A1E46"]}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={s.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={60}
      >
        <ScrollView
          contentContainerStyle={s.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Decorative curved band */}
          <LinearGradient
            colors={["#ffc9fcff", "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={s.curve}
            pointerEvents="none"
          />

          {/* Hero */}
          <Image source={require("../../assets/robot.png")} style={s.hero} resizeMode="contain" />

          {/* Headings */}
          <Text style={s.welcome}>
            <Text style={{ fontWeight: "800" }}>Welcome</Text>
            <Text style={{ fontWeight: "900" }}>!</Text>
          </Text>
          <Text style={s.subtitle}>We’re Glad to see you</Text>

          {/* Inputs */}
          <View style={s.form}>
            {/* Email */}
            <View style={s.inputWrap}>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email Address"
                placeholderTextColor="rgba(255,255,255,0.85)"
                keyboardType="email-address"
                autoCapitalize="none"
                style={s.input}
              />
              {/* right edge light */}
              <LinearGradient
                colors={["#FFFFFF90", "#FFFFFF00"]}
                start={{ x: 1, y: 0.5 }}
                end={{ x: 0, y: 0.5 }}
                style={s.inputEdge}
              />
            </View>
            {emailErr && <Text style={s.error}>Please enter a valid email</Text>}

            {/* Password */}
            <View style={s.inputWrap}>
              <TextInput
                value={pwd}
                onChangeText={setPwd}
                placeholder="Type a password"
                placeholderTextColor="rgba(255,255,255,0.85)"
                secureTextEntry={!showPwd}
                style={s.input}
              />
              <TouchableOpacity onPress={() => setShowPwd((v) => !v)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Text style={s.show}>{showPwd ? "Hide" : "Show"}</Text>
              </TouchableOpacity>
              <LinearGradient
                colors={["#FFFFFF90", "#FFFFFF00"]}
                start={{ x: 1, y: 0.5 }}
                end={{ x: 0, y: 0.5 }}
                style={s.inputEdge}
              />
            </View>

            {/* Login */}
            <TouchableOpacity
              onPress={onLogin}
              disabled={!canLogin}
              activeOpacity={0.9}
              style={[s.loginBtn, !canLogin && { opacity: 0.6 }]}
            >
              <Text style={s.loginText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}} style={s.forgotBtn}>
              <Text style={s.forgotText}>Forgot the password?</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={s.dividerRow}>
            <View style={s.line} />
            <Text style={s.dividerLabel}>Or Login with</Text>
            <View style={s.line} />
          </View>

          {/* Social buttons */}
          <View style={s.socialRow}>
            <TouchableOpacity activeOpacity={0.9} style={s.socialBtn}>
              <Image source={require("../../assets/google.png")} style={s.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} style={s.socialBtn}>
              <Image source={require("../../assets/facebook.png")} style={s.socialIcon} />
            </TouchableOpacity>
          </View>

          {/* Footer link */}
          <View style={s.footer}>
            <Text style={s.footerText}>
              Don’t have an account?{" "}
              <Text onPress={() => navigation.navigate("SignUp")} style={s.footerLink}>
                Sign up
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: 22, paddingTop: 16, paddingBottom: 30 },
  curve: {
    position: "absolute",
    top: -140,
    right: -80,
    width: 520,
    height: 300,
    borderBottomLeftRadius: 360,
    borderBottomRightRadius: 360,
    opacity: 0.9,
  },
  hero: {
    width: 200,
    height: 200,
    marginTop: 10,
    marginLeft: -42,
    alignSelf: "flex-start",
  },
  welcome: {
    color: "#FFFFFF",
    fontSize: 42,
    textAlign: "center",
    marginTop: -40,
  },
  subtitle: {
    color: "#D7E6FF",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 18,
  },
  form: { marginTop: 6 },
  inputWrap: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.35)",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    marginTop: 12,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
  },
  inputEdge: {
    position: "absolute",
    right: 2,
    top: 2,
    bottom: 2,
    width: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  show: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 10,
  },
  error: {
    color: "#FFD2D2",
    marginTop: 6,
    marginLeft: 6,
    fontSize: 12,
  },
  loginBtn: {
    marginTop: 14,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 3,
  },
  loginText: { color: "#0A2345", fontWeight: "800", fontSize: 16 },
  forgotBtn: { alignSelf: "center", marginTop: 10 },
  forgotText: { color: "#CFE3FF", textDecorationLine: "underline", fontSize: 12 },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 26,
    paddingHorizontal: 6,
  },
  line: { flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.35)" },
  dividerLabel: { color: "#fff", marginHorizontal: 10, fontWeight: "600" },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 18,
    gap: 40,
  },
  socialBtn: {
    width: 58,
    height: 58,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 20,
    elevation: 2,
  },
  socialIcon: { width: 80, height: 40, resizeMode: "contain" },
  footer: { alignItems: "center", marginTop: 34 },
  footerText: { color: "#CFE3FF" },
  footerLink: { color: "#FFFFFF", textDecorationLine: "underline", fontWeight: "700" },
});
