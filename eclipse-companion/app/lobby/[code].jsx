import { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { startSession, getSession } from "../../src/services/api";

const PLAYER_COUNTS = [2, 3, 4, 5, 6];

export default function LobbyScreen() {
  const { code } = useLocalSearchParams();
  const router = useRouter();
  const [playerCount, setPlayerCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const checkSession = async () => {
      console.log("checkSession firing for code:", code);
      try {
        const session = await getSession(code);
        console.log("session status:", session.status);
        if (session.status === "ACTIVE") {
          router.replace(`/board/${code}/military`);
          return;
        }
        setPlayerCount(session.playerCount);
      } catch (e) {
        setError("Session not found.");
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, [code]);


  const handleStartGame = async () => {
    try {
      setLoading(true);
      setError(null);
      await startSession(code, playerCount);
      router.replace(`/board/${code}/military`);
    } catch (e) {
      setError("Failed to start session. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#5b21b6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Session Code</Text>
      <Text style={styles.code}>{code}</Text>
      <Text style={styles.hint}>Share this code with other players</Text>

      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Number of Players</Text>
        <View style={styles.playerCountRow}>
          {PLAYER_COUNTS.map((count) => (
            <Pressable
              key={count}
              style={[
                styles.countButton,
                playerCount === count && styles.countButtonActive,
              ]}
              onPress={() => setPlayerCount(count)}
            >
              <Text
                style={[
                  styles.countButtonText,
                  playerCount === count && styles.countButtonTextActive,
                ]}
              >
                {count}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Pressable
        style={[styles.startButton, loading && styles.disabled]}
        onPress={handleStartGame}
        disabled={loading}
      >
        <Text style={styles.startButtonText}>Start Game</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f1a",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  label: {
    fontSize: 13,
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 8,
  },
  code: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#ffffff",
    letterSpacing: 8,
    marginBottom: 8,
  },
  hint: {
    fontSize: 13,
    color: "#555",
    marginBottom: 48,
  },
  errorBox: {
    backgroundColor: "#2a0a0a",
    borderWidth: 1,
    borderColor: "#dc2626",
    borderRadius: 8,
    padding: 12,
    width: "100%",
    marginBottom: 16,
  },
  errorText: {
    color: "#dc2626",
    fontSize: 13,
  },
  section: {
    width: "100%",
    marginBottom: 48,
  },
  sectionLabel: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 16,
    textAlign: "center",
  },
  playerCountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  countButton: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e1e2e",
  },
  countButtonActive: {
    backgroundColor: "#5b21b6",
    borderColor: "#5b21b6",
  },
  countButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#888",
  },
  countButtonTextActive: {
    color: "#fff",
  },
  startButton: {
    backgroundColor: "#5b21b6",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  startButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.4,
  },
});