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

/** -------- Slides / promo content -------- */
const SLIDES = [
  {
    key: "s1",
    title: "Set Your Target Coins\nFor Future",
    body:
      "EX : Our technology performing fast blockchain (mekata gelapena ekk dnnaaa)",
    image: require("../../assets/4.png"),
  },
  {
    key: "s2",
    title: "Recommended Skills\nNow a days",
    body:
      "EX : Our technology performing fast blockchain (mekata gelapena ekk dnnaaa)",
    image: require("../../assets/5.png"),
  },
  {
    key: "s3",
    title: "Recommended YouTube\nVideo",
    body:
      "EX : Our technology performing fast blockchain (mekata gelapena ekk dnnaaa)",
    image: require("../../assets/3.png"),
  },
];

const CHIPS = ["TypeScript", "Unit testing (Jest)", "React Router", "Java", "UI/UX"];

/** -------- One pretty “promo card” inside a slide -------- */
const PromoCard = ({ item, onStart }) => {
  return (
    <LinearGradient
      colors={["#0B0B0B", "#1A1A1A"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={st.card}
    >
      {/* right pink gradient rim */}
      <LinearGradient
        colors={["#FF5AD3", "#AA4DFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={st.cardRim}
      />

      {/* content row */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1, paddingRight: 8 }}>
          <Text style={st.cardTitle}>{item.title}</Text>
          <Text style={st.cardBody}>
            {item.body}{" "}
            <Text style={{ color: "#79E0FF", textDecorationLine: "underline" }}>
              (dnnaaa)
            </Text>
          </Text>

          <TouchableOpacity onPress={onStart} activeOpacity={0.9} style={st.getBtn}>
            <Text style={st.getBtnText}>Get started</Text>
          </TouchableOpacity>
        </View>

        <Image source={item.image} style={st.cardImg} resizeMode="contain" />
      </View>
    </LinearGradient>
  );
};

/** -------- Whole slide (background, header, watermark, promo section, lists) -------- */
const Slide = React.memo(function Slide({ item, slideIndex, total, onStart }) {
  return (
    <LinearGradient
      colors={["#2AA6F2", "#173D87", "#C333B7"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={st.slide}
    >
      {/* middle curved ribbon */}
      <View style={st.ribbonWrap}>
        <LinearGradient
          colors={["#4AC9FF", "#113C7F"]}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 0.6, y: 1 }}
          style={st.ribbon}
        />
      </View>

      {/* top welcome pill */}
      <View style={st.pill}>
        <Text style={st.pillTitle}>Welcome to SkillSync</Text>
        <Text style={st.pillSub}>Your AI mentor for your career roadmap.</Text>
      </View>

      {/* left watermark */}
      <Text style={st.watermark}>SkillSync AI</Text>

      {/* promo card */}
      <PromoCard item={item} onStart={onStart} />

      {/* dots under card */}
      <View style={st.innerDots}>
        {Array.from({ length: total }).map((_, i) => (
          <View
            key={i}
            style={[st.dot, i === slideIndex ? st.dotActive : null]}
          />
        ))}
      </View>

      {/* languages header */}
      <View style={st.sectionHeader}>
        <Text style={st.sectionTitle}>Recommended Languages</Text>
        <TouchableOpacity activeOpacity={0.85} style={st.viewAll}>
          <Text style={st.viewAllText}>View all</Text>
        </TouchableOpacity>
      </View>

      {/* chips */}
      <View style={st.chipsRow}>
        {CHIPS.map((c) => (
          <View key={c} style={st.chip}>
            <Text style={st.chipText}>{c}</Text>
          </View>
        ))}
      </View>

      {/* 2 rows of rounded placeholders (cards) */}
      <View style={st.grid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <View key={i} style={[st.placeholder, (i + 1) % 3 === 0 && { marginRight: 0 }]} />
        ))}
      </View>

      {/* bottom rounded placeholders */}
      <View style={st.bottomPills}>
        <View style={st.bottomPill} />
        <View style={st.bottomPill} />
        <View style={[st.bottomPill, { width: SCREEN_WIDTH * 0.42 }]} />
      </View>
    </LinearGradient>
  );
});

export default function OnboardingScreen({ navigation }) {
  const listRef = useRef(null);
  const [index, setIndex] = useState(0);

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
      navigation.replace("MainTabs"); // end of onboarding
    }
  }, [index, navigation]);

  const onSkip = useCallback(() => {
    navigation.replace("MainTabs");
  }, [navigation]);

  const renderItem = useCallback(
    ({ item, index: slideIdx }) => (
      <Slide
        item={item}
        slideIndex={slideIdx}
        total={SLIDES.length}
        onStart={goNext}
      />
    ),
    [goNext]
  );

  const keyExtractor = useCallback((it) => it.key, []);
  const isLast = index === SLIDES.length - 1;

  return (
    <SafeAreaView style={st.safe}>
      <StatusBar barStyle="light-content" />
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

      {/* footer controls */}
      <View style={st.footer}>
        <TouchableOpacity
          style={st.cta}
          activeOpacity={0.9}
          onPress={goNext}
          accessibilityRole="button"
          accessibilityLabel={isLast ? "Get Started" : "Continue"}
        >
          <Text style={st.ctaText}>{isLast ? "Get Started" : "Continue"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginTop: 8 }}
          onPress={onSkip}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel="Skip onboarding"
        >
          <Text style={st.skip}>Skip</Text>
        </TouchableOpacity>

        <View style={st.dots}>
          {SLIDES.map((_, i) => (
            <View key={i} style={[st.dot, i === index && st.dotActive]} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

/* ------------------- styles ------------------- */
const st = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0B2D63",
    paddingTop: Platform.OS === "android" ? 24 : 0,
  },
  slide: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  /* curved ribbon */
  ribbonWrap: { position: "absolute", top: SCREEN_HEIGHT * 0.16, left: 0, right: 0 },
  ribbon: {
    alignSelf: "center",
    width: SCREEN_WIDTH * 0.58,
    height: SCREEN_HEIGHT * 0.9,
    borderRadius: SCREEN_WIDTH,
  },

  /* top welcome pill */
  pill: {
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#2F6DFF",
    borderRadius: 18,
    marginTop: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 3,
  },
  pillTitle: { color: "#FFFFFF", fontWeight: "800", fontSize: 16, textAlign: "center" },
  pillSub: { color: "#CFE3FF", fontSize: 12, textAlign: "center", marginTop: 2 },

  /* watermark */
  watermark: {
    position: "absolute",
    top: SCREEN_HEIGHT * 0.32,
    left: -6,
    color: "#C0DBFF33",
    fontSize: 54,
    fontWeight: "700",
    transform: [{ rotate: "-90deg" }],
  },

  /* promo card */
  card: {
    marginTop: 16,
    borderRadius: 18,
    padding: 12,
    overflow: "hidden",
  },
  cardRim: {
    position: "absolute",
    right: -10,
    top: -10,
    bottom: -10,
    width: 28,
    borderRadius: 18,
    opacity: 0.7,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 22,
  },
  cardBody: {
    color: "#EAEFFD",
    marginTop: 8,
    fontSize: 12.5,
  },
  cardImg: { width: 118, height: 92, marginLeft: 6 },
  getBtn: {
    marginTop: 10,
    alignSelf: "flex-start",
    backgroundColor: "#42D1FF",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  getBtnText: { color: "#0C1D42", fontWeight: "800", fontSize: 12.5 },

  innerDots: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 8,
    gap: 6,
  },

  /* sections */
  sectionHeader: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 6,
  },
  sectionTitle: { color: "#FFFFFF", fontWeight: "700" },
  viewAll: {
    backgroundColor: "#FFFFFFDD",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  viewAllText: { color: "#0B1C3E", fontWeight: "700", fontSize: 12 },

  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
    paddingHorizontal: 6,
  },
  chip: {
    backgroundColor: "#F6C752",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  chipText: { color: "#0A2145", fontWeight: "700", fontSize: 12 },

  grid: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
    paddingHorizontal: 6,
  },
  placeholder: {
    width: (SCREEN_WIDTH - 16 - 12 - 16) / 3, // 3 columns
    height: 105,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginRight: 6,
  },

  bottomPills: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 16,
    paddingHorizontal: 6,
    marginBottom: 90, // leave room for footer controls
  },
  bottomPill: {
    width: SCREEN_WIDTH * 0.26,
    height: 16,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.25)",
  },

  /* global dots + footer */
  footer: {
    position: "absolute",
    bottom: 18,
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
  skip: { color: "#FFFFFF", opacity: 0.9, fontWeight: "600", marginTop: 4 },
  dots: { flexDirection: "row", gap: 7, marginTop: 6 },
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
    backgroundColor: "#FFFFFF",
  },
});
