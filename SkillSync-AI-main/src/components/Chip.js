import { Text, View } from "react-native";

export default function Chip({ text, bg="#EAF2FF", fg="#1E40AF" }) {
  return (
    <View style={{
      paddingHorizontal: 10, paddingVertical: 6,
      borderRadius: 999, backgroundColor: bg, marginRight: 8, marginBottom: 8
    }}>
      <Text style={{ color: fg, fontFamily: "Inter_500Medium" }}>{text}</Text>
    </View>
  );
}
