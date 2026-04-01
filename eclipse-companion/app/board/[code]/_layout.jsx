import { useState, useCallback } from "react";
import { Tabs, useLocalSearchParams } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";
import EndRoundModal from "../../../src/components/EndRoundModal";
import useWebSocket from "../../../src/hooks/useWebSocket";
import { drawTiles } from "../../../src/services/api";

const TRACKS = [
  { name: "military", label: "Military", color: "#c026d3"},
  { name: "grid", label: "Grid", color: "#16a34a" },
  { name: "nano", label: "Nano", color: "#ca8a04"},
  { name: "rare", label: "Rare", color: "#000" },
]

export default function BoardLayout() {
  const { code } = useLocalSearchParams();
  const [round, setRound] = useState(1);
  const [showEndRound, setShowEndRound] = useState(false);

  const handleMessage = useCallback((data) => {
    if (data.type === "ROUND_DRAWN") {
      setRound(data.round);
    }
  }, []);

  useWebSocket(code, handleMessage);

  const handleConfirmEndRound = async () => {
    try {
      await drawTiles(code);
      setShowEndRound(false);
    } catch (e) {
      console.error("Failed to draw tiles:", e);
    }
  };

   return (
    <>
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
          headerRight: () => (
            <View style={styles.headerRight}>
              <Text style={styles.roundText}>Round {round}</Text>
              <Pressable
                style={styles.endRoundButton}
                onPress={() => setShowEndRound(true)}
              >
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
              tabBarActiveTintColor: track.color,
            }}
          />
        ))}
      </Tabs>

      <EndRoundModal
        visible={showEndRound}
        round={round}
        onConfirm={handleConfirmEndRound}
        onClose={() => setShowEndRound(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
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