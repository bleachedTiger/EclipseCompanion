import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator  } from "react-native";
import { useRouter } from "expo-router";
import { createSession } from "../src/services/api";

export default function HomeScreen() {
    const router = useRouter();
    const [joinCode, setJoinCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreate = async () => {
      try {
        setLoading(true);
        setError(null);
        const session = await createSession();
        router.push(`/lobby/${session.code}`);
      } catch (e) {
        setError("Failed to create session. Is the server running?");
      } finally {
        setLoading(false);
      }
    };

    const handleJoin = async () => {
        if(joinCode.trim().length === 0) return;
        router.push(`/lobby/${joinCode.trim().toUpperCase()}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Eclipse Companion</Text>
            <Text style={styles.subtitle}>2nd Dawn for the Galaxy</Text>

            {error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <Pressable style={[styles.primaryButton, loading && styles.disabled]} 
              onPress={handleCreate}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Create Session</Text>
              )}
            </Pressable>

            <View style={styles.divider}>
                <Text style={styles.dividerText}>or Join a Session</Text>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Enter session code"
                placeholderTextColor= "#888"
                value={joinCode}
                onChangeText={setJoinCode}
                autoCapitalize="characters"
                maxLength={6}
            />
            
            <Pressable 
            style={[styles.secondaryButton, !joinCode && styles.disabled]} 
            onPress={handleJoin} 
            disabled={!joinCode}
            >
                <Text style={styles.secondaryButtonText}>Join Session</Text>
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
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
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
  primaryButton: {
    backgroundColor: "#5b21b6",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  divider: {
    marginVertical: 24,
  },
  dividerText: {
    color: "#888",
    fontSize: 13,
  },
  input: {
    backgroundColor: "#1e1e2e",
    color: "#fff",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "100%",
    fontSize: 16,
    marginBottom: 12,
    textAlign: "center",
    letterSpacing: 4,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#5b21b6",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#5b21b6",
    fontSize: 16,
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.4,
  },
});