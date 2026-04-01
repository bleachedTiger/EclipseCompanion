import { View, Text, StyleSheet } from "react-native";

export default function RareTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Rare Research</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0f1a", alignItems: "center", justifyContent: "center" },
  text: { color: "#000", fontSize: 18 },
});