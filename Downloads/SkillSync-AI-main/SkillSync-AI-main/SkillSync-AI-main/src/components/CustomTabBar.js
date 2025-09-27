import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ICONS = {
  Home: require("../../assets/icons/home.png"),
  Compare: require("../../assets/icons/compare.png"),
  Results: require("../../assets/icons/result.webp"),
  Settings: require("../../assets/icons/setting.png"),
};

export default function CustomTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        position: "absolute",
        left: 12,
        right: 12,
        bottom: Math.max(insets.bottom, 10),
        backgroundColor: "#FFFFFF",
        borderRadius: 28,
        paddingHorizontal: 10,
        paddingVertical: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 8,
      }}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const label =
          descriptors[route.key]?.options?.tabBarLabel ??
          descriptors[route.key]?.options?.title ??
          route.name;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.9}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              height: 48,
              marginHorizontal: 4,
              borderRadius: 16,
              backgroundColor: isFocused ? "#E5E7EB" : "transparent", // grey highlight
            }}
          >
            <Image
              source={ICONS[route.name] || ICONS.Home}
              style={{
                width: 22,
                height: 22,
                tintColor: "#000",
                opacity: isFocused ? 1 : 0.7,
                marginBottom: 4,
              }}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 12,
                fontWeight: isFocused ? "700" : "600",
                color: "#000",
              }}
            >
              {label === "Results" ? "Result" : label === "Settings" ? "Setting" : label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
