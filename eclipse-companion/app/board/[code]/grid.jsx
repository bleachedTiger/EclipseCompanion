import { View, Text, StyleSheet } from "react-native";

export default function GridTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Grid Research</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0f1a", alignItems: "center", justifyContent: "center" },
  text: { color: "#16a34a", fontSize: 18 },
});