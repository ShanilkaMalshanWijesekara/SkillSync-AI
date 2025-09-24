import { TextInput, View, Text } from "react-native";
import { colors } from "../theme/colors";
//...comment..//
export default function TextField({
  label,
  placeholder,
  secure,
  value,
  onChangeText,
  multiline,
  style,
  keyboardType,
}) {
  return (
    <View style={[{ marginBottom: 12 }, style]}>
      {label ? (
        <Text
          style={{
            color: colors.text,
            marginBottom: 8,
            fontFamily: "Inter_500Medium",
          }}
        >
          {label}
        </Text>
      ) : null}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure}
        multiline={multiline}
        keyboardType={keyboardType}
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          color: colors.white,
          backgroundColor: "rgba(255,255,255,0.06)",
          borderRadius: 14,
          paddingHorizontal: 14,
          paddingVertical: multiline ? 12 : 12,
          fontFamily: "Inter_400Regular",
          minHeight: multiline ? 120 : undefined,
        }}
      />
    </View>
  );
}
