import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function WelcomeScreen() {
  return (
    <LinearGradient colors={["#1064A3", "#042B56"]} start={{x:0,y:0}} end={{x:0,y:1}} style={styles.container}>
      <SafeAreaView style={{flex:1}}>
        <View style={styles.card}>
          <Text style={styles.title}>Welcome to SkillSync AI</Text>
          <Text style={styles.subtitle}>Your AI mentor for your career roadmap.</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    backgroundColor: "#1B3469",
    marginTop: 60,
    marginHorizontal: 24,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  title: { color: "#FFFFFF", fontSize: 20, fontWeight: "800" },
  subtitle: { color: "#D5E2FF", marginTop: 6 },
});
