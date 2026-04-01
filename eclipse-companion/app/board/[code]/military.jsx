import { View, Text, StyleSheet } from "react-native";

export default function MilitaryTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Military Research</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0f1a", alignItems: "center", justifyContent: "center" },
  text: { color: "#c026d3", fontSize: 18 },
});