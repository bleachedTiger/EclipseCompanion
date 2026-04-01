import { View, Text, Pressable, StyleSheet } from "react-native";

export default function TechCard({ tech, availableCount, onPress }) {
    return (
        <Pressable style={[styles.card, { borderColor: tech.color }]} onPress={onPress}>
            <View style={styles.topRow}>
                <Text style={styles.cost}>{tech.cost}</Text>
            </View>

            <Text style={styles.name}>{tech.name}</Text>

            <View style={styles.bottomRow}>
                <View style={styles.countBadge}>
                    <Text style={styles.countText}>{availableCount}</Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
card: {
    backgroundColor: "#1e1e2e",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    width: "31%",
    aspectRatio: 1,
    margin: "1%",
    justifyContent: "space-between",
  },
  topRow: {
    alignItems: "flex-end",
  },
  cost: {
    color: "#aaa",
    fontSize: 12,
    fontWeight: "600",
  },
  name: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    flexShrink: 1,
  },
  bottomRow: {
    alignItems: "flex-start",
  },
  countBadge: {
    backgroundColor: "#fff",
    borderRadius: 999,
    width: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  countText: {
    color: "#0f0f1a",
    fontSize: 12,
    fontWeight: "700",
  },
});