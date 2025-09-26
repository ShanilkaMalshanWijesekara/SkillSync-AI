// src/screens/HomeScreen.js
import React, {
  useMemo,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
  FlatList,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width: W } = Dimensions.get("window");

/* ── Only the promo content changes ─────────────────────── */
const PROMOS = [
  {
    key: "coins",
    title: "Set Your Target Coins\nFor Future",
    body:
      "EX : Our technology performing fast blockchain (mekata gelapena ekk dnnaaa)",
    image: require("../../assets/8.png"),
    cta: "Get started",
  },
  {
    key: "skills",
    title: "Recommended Skills\nNow a days",
    body:
      "EX : Our technology performing fast blockchain (mekata gelapena ekk dnnaaa)",
    image: require("../../assets/6.png"),
    cta: "Get started",
  },
  {
    key: "video",
    title: "Recommended YouTube\nVideo",
    body:
      "EX : Our technology performing fast blockchain (mekata gelapena ekk dnnaaa)",
    image: require("../../assets/7.png"),
    cta: "Get started",
  },
];

const CHIPS = [
  "TypeScript",
  "Unit testing (Jest)",
  "React Router",
  "Java",
  "UI/UX",
];

/* ── Small card component to keep renderItem tiny ───────── */
const PromoCard = ({ item, onPress }) => {
  return (
    <LinearGradient
      colors={["#0c00f57e", "#67005d70" ,"#ff00e677" ]} // softer palette
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={s.card}
    >
      {/* faint accent rim */}
      <LinearGradient
        colors={["#FF7DD6AA", "#A38BFF99"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={s.cardRim}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1, paddingRight: 8 }}>
          <Text style={s.cardTitle}>{item.title}</Text>
          <Text style={s.cardBody}>
            {item.body}{" "}
            <Text
              style={{ color: "#79E0FF", textDecorationLine: "underline" }}
            >
              (dnnaaa)
            </Text>
          </Text>
          <TouchableOpacity
            onPress={() => onPress(item)}
            activeOpacity={0.9}
            style={s.getBtn}
          >
            <Text style={s.getBtnText}>{item.cta}</Text>
          </TouchableOpacity>
        </View>

        <Image source={item.image} style={s.cardImg} resizeMode="contain" />
      </View>
    </LinearGradient>
  );
};

export default function HomeScreen({ navigation }) {
  const promoRef = useRef(null);
  const [active, setActive] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems?.length) setActive(viewableItems[0].index ?? 0);
  }).current;

  const viewabilityConfig = useMemo(
    () => ({ itemVisiblePercentThreshold: 60 }),
    []
  );

  const getItemLayout = useCallback(
    (_d, i) => ({ length: W - 32, offset: (W - 32) * i, index: i }),
    []
  );

  const onPromoPress = useCallback((item) => {
    // e.g. navigation.navigate("Compare");
  }, []);

  /* ── Auto-rotate promos every 4s (pauses while dragging) ─ */
  useEffect(() => {
    if (isDragging) return;
    const id = setInterval(() => {
      const next = (active + 1) % PROMOS.length;
      promoRef.current?.scrollToIndex({ index: next, animated: true });
      setActive(next);
    }, 4000);
    return () => clearInterval(id);
  }, [active, isDragging]);

  return (
    <LinearGradient
      colors={["#2AA6F2", "#173D87", "#C333B7"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={s.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={s.safe}>
        <ScrollView contentContainerStyle={{ paddingBottom: 28 }}>
          {/* top welcome pill */}
          <View style={s.pill}>
            <Text style={s.pillTitle}>Welcome to SkillSync</Text>
            <Text style={s.pillSub}>
              Your AI mentor for your career roadmap.
            </Text>
          </View>

          {/* ── TOP BOX (only this changes) ───────────────── */}
          <View style={{ marginTop: 14 }}>
            <FlatList
              ref={promoRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              data={PROMOS}
              keyExtractor={(it) => it.key}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
              getItemLayout={getItemLayout}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              onScrollBeginDrag={() => setIsDragging(true)}
              onScrollEndDrag={() => setIsDragging(false)}
              renderItem={({ item }) => (
                <PromoCard item={item} onPress={onPromoPress} />
              )}
            />

            {/* small dots for the top box only */}
            <View style={s.innerDots}>
              {PROMOS.map((_, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() =>
                    promoRef.current?.scrollToIndex({ index: i, animated: true })
                  }
                  activeOpacity={0.8}
                >
                  <View style={[s.dot, i === active && s.dotActive]} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {/* ──────────────────────────────────────────────── */}

          {/* languages header */}
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Recommended Languages</Text>
            <TouchableOpacity activeOpacity={0.85} style={s.viewAll}>
              <Text style={s.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>

          {/* chips */}
          <View style={s.chipsRow}>
            {CHIPS.map((c) => (
              <View key={c} style={s.chip}>
                <Text style={s.chipText}>{c}</Text>
              </View>
            ))}
          </View>

          {/* 2 rows of placeholders */}
          <View style={s.grid}>
            {Array.from({ length: 6 }).map((_, i) => (
              <View
                key={i}
                style={[s.placeholder, (i + 1) % 3 === 0 && { marginRight: 0 }]}
              />
            ))}
          </View>

          {/* bottom rounded pills */}
          <View style={s.bottomPills}>
            <View style={s.bottomPill} />
            <View style={s.bottomPill} />
            <View style={[s.bottomPill, { width: W * 0.42 }]} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1, paddingTop: Platform.OS === "android" ? 24 : 0 },

  pill: {
    alignSelf: "center",
    marginTop: 45,
    paddingVertical: 10,
    paddingHorizontal: 26,
    backgroundColor: "#2F6DFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 3,
  },
  pillTitle: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 24,
    textAlign: "center",
  },
  pillSub: {
    color: "#CFE3FF",
    fontSize: 12,
    textAlign: "center",
    marginTop: 2,
  },

  /* top promo card */
  card: {
    width: W - 32,
    borderRadius: 16,
    padding: 12,
    overflow: "hidden",
    marginHorizontal: 8,
  },
  cardRim: {
    position: "absolute",
    right: -12,
    top: -12,
    bottom: -12,
    width: 22,
    borderRadius: 16,
    opacity: 0.55,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 22,
  },
  cardBody: { color: "#EAEFFD", marginTop: 8, fontSize: 12.5 },
  cardImg: { width: 110, height: 90, marginLeft: 6 },
  getBtn: {
    marginTop: 10,
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  getBtnText: { color: "#0C1D42", fontWeight: "800", fontSize: 12.5 },

  innerDots: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 8,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#D0D8F0",
    opacity: 0.5,
  },
  dotActive: {
    opacity: 1,
    width: 18,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },

  sectionHeader: {
    marginTop: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    paddingHorizontal: 16,
  },
  chip: {
    backgroundColor: "rgba(255,255,255,0.28)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  chipText: { color: "#FFFFFF", fontWeight: "600", fontSize: 12 },

  grid: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
    paddingHorizontal: 16,
  },
  placeholder: {
    width: (W - 16 * 2 - 12) / 3,
    height: 100,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.18)",
    marginRight: 6,
  },

  bottomPills: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  bottomPill: {
    width: W * 0.26,
    height: 16,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.22)",
  },
});
