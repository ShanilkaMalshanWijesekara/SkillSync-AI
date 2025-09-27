// src/screens/OnboardingScreen.js
import React, { useMemo, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
  I18nManager,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const IS_RTL = I18nManager.isRTL;

const SLIDES = [
  {
    key: "s1",
    image: require("../../assets/4.png"),
    titleTop: "AI Powered App of",
    titleBottom: "You Need",
    body:
      "Every group must complete and submit their proposal on or before the deadline. Please plan your work accordingly and avoid delays.",
  },
  {
    key: "s2",
    image: require("../../assets/5.png"),
    titleTop: "The Art of Smart",
    titleBottom: "Conversation",
    body:
      "Every group must complete and submit their proposal on or before the deadline. Please plan your work accordingly and avoid delays.",
  },
  {
    key: "s3",
    image: require("../../assets/3.png"),
    titleTop: "The Art of Smart",
    titleBottom: "Conversation",
    body:
      "Every group must complete and submit their proposal on or before the deadline. Please plan your work accordingly and avoid delays.",
  },
];

const Slide = React.memo(function Slide({ item }) {
  return (
    <LinearGradient
      colors={["#1E66D0", "#f159ffcc", "#0e5fd1ff"]}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0, y: 0.5 }}
      style={styles.slide}
    >
      <StatusBar barStyle="light-content" />
      <Text style={styles.brand}>
        <Text style={{ color: "#a47affff" }}>Skill</Text>
        <Text style={{ color: "#C2D7FF" }}>Sync</Text>
        <Text style={{ color: "#FF7AD9" }}> AI</Text>
      </Text>

      <View style={styles.band} />

      <Image source={item.image} style={styles.hero} resizeMode="contain" />

      <Text style={styles.titleTop}>{item.titleTop}</Text>
      <Text style={styles.titleBottom}>{item.titleBottom}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </LinearGradient>
  );
});

export default function OnboardingScreen({ navigation }) {
  const listRef = useRef(null);
  const [index, setIndex] = useState(0);

  // JS-safe callback (no TS types)
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      const next = viewableItems[0].index ?? 0;
      setIndex(next);
    }
  }).current;

  const viewabilityConfig = useMemo(
    () => ({ itemVisiblePercentThreshold: 60 }),
    []
  );

  const getItemLayout = useCallback(
    (_data, i) => ({
      length: SCREEN_WIDTH,
      offset: SCREEN_WIDTH * i,
      index: i,
    }),
    []
  );

  const goNext = useCallback(() => {
    if (index < SLIDES.length - 1) {
      listRef.current?.scrollToIndex({ index: index + 1, animated: true });
    } else {
      navigation.replace("Login");
    }
  }, [index, navigation]);

  const onSkip = useCallback(() => {
    navigation.replace("Login");
  }, [navigation]);

  const renderItem = useCallback(({ item }) => <Slide item={item} />, []);
  const keyExtractor = useCallback((it) => it.key, []);
  const isLast = index === SLIDES.length - 1;

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        ref={listRef}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        data={SLIDES}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={getItemLayout}
        inverted={IS_RTL}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.cta}
          activeOpacity={0.9}
          onPress={goNext}
          accessibilityRole="button"
          accessibilityLabel={isLast ? "Get Started" : "Continue"}
        >
          <Text style={styles.ctaText}>{isLast ? "Get Started" : "Continue"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginTop: 8 }}
          onPress={onSkip}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel="Skip onboarding"
        >
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>

        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0B2D63",
    paddingTop: Platform.OS === "android" ? 24 : 0,
  },
  slide: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    paddingHorizontal: 24,
    paddingTop: 8,
    alignItems: "center",
  },
  brand: {
    width: "100%",
    textAlign: "center",
    marginTop: 20,
    fontSize: 40,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  band: {
    position: "absolute",
    top: SCREEN_HEIGHT * 0.3,
    left: -20,
    right: -20,
    height: 130,
    backgroundColor: "#0F5DBB",
    opacity: 0.26,
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
    transform: [{ scaleX: 1.06 }],
  },
  hero: {
    width: SCREEN_WIDTH * 0.78,
    height: SCREEN_HEIGHT * 0.36,
    marginTop: 24,
  },
  titleTop: {
    marginTop: 10,
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
  },
  titleBottom: {
    marginTop: 2,
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
  },
  body: {
    marginTop: 10,
    color: "#E6EEFF",
    textAlign: "center",
    lineHeight: 20,
    maxWidth: SCREEN_WIDTH * 0.84,
  },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  cta: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 999,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 3,
  },
  ctaText: { color: "#0E1A3A", fontWeight: "800", fontSize: 15 },
  skip: { color: "#FFFFFF", opacity: 0.9, fontWeight: "600", marginTop: 2 },
  dots: { flexDirection: "row", gap: 7, marginTop: 8 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#D0D8F0",
    opacity: 0.6,
  },
  dotActive: {
    opacity: 1,
    width: 18,
    borderRadius: 10,
  },
});
