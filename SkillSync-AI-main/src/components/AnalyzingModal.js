import { Modal, View, Text, ActivityIndicator } from "react-native";
import { colors } from "../theme/colors";

export default function AnalyzingModal({ visible }) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={{
        flex: 1, backgroundColor: "rgba(0,0,0,0.35)",
        justifyContent: "center", alignItems: "center"
      }}>
        <View style={{
          backgroundColor: "#fff", padding: 18, borderRadius: 16,
          width: 280, alignItems: "center"
        }}>
          <ActivityIndicator size="small" color={colors.blue} />
          <Text style={{ marginTop: 12, color: "#334155", fontFamily: "Inter_500Medium" }}>
            Analyzing your profile…
          </Text>
        </View>
      </View>
    </Modal>
  );
}
