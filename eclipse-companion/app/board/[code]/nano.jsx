import { View, Text, StyleSheet } from "react-native";

export default function NanoTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nano Research</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0f1a", alignItems: "center", justifyContent: "center" },
  text: { color: "#ca8a04", fontSize: 18 },
});