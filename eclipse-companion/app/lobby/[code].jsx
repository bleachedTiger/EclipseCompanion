import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const PLAYER_COUNTS = [2, 3, 4, 5, 6];

export default function LobbyScreen() {
    const { code } = useLocalSearchParams();
    const router = useRouter();
    const [playerCount, setPlayerCount] = useState(4);

    const handleStartGame = async () => {
        // TODO: call POST /sessions/{code}/start
        router.push(`/board/${code}/military`);
    };

    return(
        <View style={styles.container}>
            <Text style={styles.label}>Session Code</Text>
            <Text style={styles.code}>{code}</Text>
            <Text style={styles.hint}>Share this code with your friends to join the session</Text>

            <View style={styles.section}>
                <Text style={styles.sectionLabel}>Player Count</Text>
                <View style={styles.playerCountRow}>
                    {PLAYER_COUNTS.map(count => (
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

            <Pressable style={styles.startButton} onPress={handleStartGame}>
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
});