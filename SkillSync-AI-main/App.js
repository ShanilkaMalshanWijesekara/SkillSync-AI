// App.js
import "react-native-gesture-handler";
import React from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./src/navigation/RootNavigator";



// Fonts
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import {
  NotoSansSinhala_400Regular,
  NotoSansSinhala_500Medium,
  NotoSansSinhala_700Bold,
} from "@expo-google-fonts/noto-sans-sinhala";

const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: "#001a3a" },
};

export default function App() {
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    NotoSansSinhala_400Regular,
    NotoSansSinhala_500Medium,
    NotoSansSinhala_700Bold,
  });

  if (!loaded) return <View style={{ flex: 1, backgroundColor: "#001a3a" }} />;

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navTheme}>
        <StatusBar style="light" />
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}