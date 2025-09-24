import Svg, { Circle } from "react-native-svg";
import { View, Text } from "react-native";

export default function ScoreRing({ value = 72, size = 130, stroke = 12, color = "#2A6EF5" }) {
  const radius = (size - stroke) / 2;
  const c = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(100, value));
  const offset = c - (pct / 100) * c;

  return (
    <View style={{ alignItems: "center" }}>
      <Svg width={size} height={size}>
        <Circle cx={size/2} cy={size/2} r={radius} stroke="#e5e7eb" strokeWidth={stroke} fill="transparent" />
        <Circle
          cx={size/2} cy={size/2} r={radius}
          stroke={color} strokeWidth={stroke} fill="transparent"
          strokeDasharray={`${c} ${c}`} strokeDashoffset={offset} strokeLinecap="round"
        />
      </Svg>
      <Text style={{ position: "absolute", top: size/2 - 16, fontSize: 28, color: "#0f172a", fontFamily: "Inter_700Bold" }}>
        {pct}%
      </Text>
      <Text style={{ marginTop: 6, color: "#475569", fontFamily: "Inter_500Medium" }}>Fit Score</Text>
    </View>
  );
}
