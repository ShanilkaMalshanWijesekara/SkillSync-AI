import { Text, TouchableOpacity } from "react-native";
import { colors } from "../theme/colors";

export default function PrimaryButton({ title, onPress, style, disabled }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[{
        backgroundColor: disabled ? "#335a9d" : colors.blue,
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: "center"
      }, style]}
    >
      <Text style={{ color: "#fff", fontFamily: "Inter_600SemiBold", fontSize: 16 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
