import { useState, useEffect, useCallback } from "react";
import { Tabs, useGlobalSearchParams } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";
import EndRoundModal from "./EndRoundModal";
import useWebSocket from "../hooks/useWebSocket";
import { drawTiles } from "../services/api";
import { useSession } from "../context/SessionContext";
import { getSession } from "../services/api";

const TRACKS = [
  { name: "military", label: "Military", color: "#c026d3" },
  { name: "grid", label: "Grid", color: "#16a34a" },
  { name: "nano", label: "Nano", color: "#ca8a04" },
  { name: "rare", label: "Rare", color: "#000000" },
];

export default function BoardLayoutInner() {
  const { code } = useGlobalSearchParams();
  const { triggerRefetch } = useSession();
  const [round, setRound] = useState(1);
  const [showEndRound, setShowEndRound] = useState(false);

  // fetch real round on mount
  useEffect(() => {
    const fetchRound = async () => {
      try {
        const session = await getSession(code);
        setRound(session.round);
      } catch (e) {
        console.error("Failed to fetch session round:", e);
      }
    };
    fetchRound();
  }, [code]);

  const handleMessage = useCallback((data) => {
    if (data.type === "ROUND_DRAWN") {
      setRound(data.round);
      triggerRefetch();
    }
  }, [triggerRefetch]);

  useWebSocket(code, handleMessage);

  const handleConfirmEndRound = async () => {
    try {
      const session = await drawTiles(code);
      setRound(session.round);
      triggerRefetch();
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