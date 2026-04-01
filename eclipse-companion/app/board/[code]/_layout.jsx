import { Tabs, useLocalSearchParams } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";

const TRACKS = [
  { name: "military", label: "Military", color: "#c026d3"},
  { name: "grid", label: "Grid", color: "#16a34a" },
  { name: "nano", label: "Nano", color: "#ca8a04"},
  { name: "rare", label: "Rare", color: "#000" },
]

export default function BoardLayout() {
  const { code } = useLocalSearchParams();

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#0f0f1a" },
        headerTintColor: "#fff",
        tabBarStyle: { 
          backgroundColor: "#0f0f1a",
          borderTopColor: "#1e1e2e",
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#555",
        headerTitle: ({ children }) => (
          <View style={styles.headerTitle}>
            <Text style={styles.headerTrackLabel}>{children}</Text>
            <Text style={styles.sessionCode}>{code}</Text>
          </View>
        ),
        headerRight: () => (
          <View style={styles.headerRight}>
            <Text style={styles.roundText}>Round 1</Text>
            <Pressable style={styles.endRoundButton}>
              <Text style={styles.endRoundText}>End Round</Text>
            </Pressable>
          </View>
        ),
      }}
    >
      {TRACKS.map((track) => (
        <Tabs.Screen
          key={track.name}
          name={track.name}
          options={{
            title: track.label,
            headerTitle: `${track.label} Research`,
            tabBarActiveTintColor: track.color,
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    alignItems: "center",
  },
  headerTrackLabel: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  sessionCode: {
    color: "#555",
    fontSize: 11,
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginRight: 16,
  },
  roundText: {
    color: "#888",
    fontSize: 13,
  },
  endRoundButton: {
    backgroundColor: "#1e1e2e",
    borderWidth: 1,
    borderColor: "#333",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  endRoundText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});