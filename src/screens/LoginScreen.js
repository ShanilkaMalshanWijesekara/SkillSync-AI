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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canLogin = emailOk && pwd.length >= 6;

  const onLogin = () => {
    // TODO: call your real auth here
    navigation.replace("MainTabs"); // go to tabs after login
  };

  return (
    <LinearGradient colors={["#0B5EC9", "#001A3A"]} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={60}
      >
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 120, paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={{ color: "#fff", fontSize: 36, fontWeight: "900", textAlign: "center" }}>
            Welcome!
          </Text>
          <Text style={{ color: "#CFE3FF", textAlign: "center", marginTop: 10 }}>
            We’re Glad to see you
          </Text>

          {/* Inputs */}
          <TextInput
            placeholder="Email Address"
            placeholderTextColor="rgba(255,255,255,0.85)"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={{
              marginTop: 50,
              height: 46,
              borderRadius: 10,
              paddingHorizontal: 14,
              color: "#fff",
              backgroundColor: "rgba(255,255,255,0.35)",
            }}
          />
          <TextInput
            placeholder="Type a password"
            placeholderTextColor="rgba(255,255,255,0.85)"
            value={pwd}
            onChangeText={setPwd}
            secureTextEntry
            style={{
              marginTop: 10,
              height: 46,
              borderRadius: 10,
              paddingHorizontal: 14,
              color: "#fff",
              backgroundColor: "rgba(255,255,255,0.35)",
            }}
          />

          {/* Login */}
          <TouchableOpacity
            onPress={onLogin}
            disabled={!canLogin}
            activeOpacity={0.9}
            style={{
              marginTop: 12,
              height: 46,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              opacity: canLogin ? 1 : 0.6,
            }}
          >
            <Text style={{ color: "#0A2345", fontWeight: "700" }}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}} style={{ alignSelf: "center", marginTop: 25}}>
            <Text style={{ color: "#CFE3FF", textDecorationLine: "underline", fontSize: 12 }}>
              Forgot the password?
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.35)" }} />
            <Text style={{ color: "#fff", marginHorizontal: 10 }}>Or Login with</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.35)" }} />
          </View>

          {/* Icons only */}
          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 25, gap: 60 }}>
            <TouchableOpacity activeOpacity={0.9}>
              <Image source={require("../../assets/google.png")} style={{ width: 50, height: 50 }} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9}>
              <Image source={require("../../assets/facebook.png")} style={{ width: 50, height: 50 }} />
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={{ alignItems: "center", marginTop: 180 }}>
            <Text style={{ color: "#CFE3FF" }}>
              Don’t have an account?{" "}
              <Text
                onPress={() => navigation.navigate("SignUp")}
                style={{ color: "#fff", textDecorationLine: "underline", fontWeight: "700" }}
              >
                Sign up
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
