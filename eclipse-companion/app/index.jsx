import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
    const router = useRouter();
    const [joinCode, setJoinCode] = useState("");

    const handleCreate = async () => {
        //TODO: call POST /sessions
        //For now navigate with placeholder code
        router.push("/lobby/ABC123");
    };

    const handleJoin = async () => {
        if(joinCode.trim().length === 0) return;
        router.push(`/lobby/${joinCode.trim().toUpperCase()}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Eclipse Companion</Text>
            <Text style={styles.subtitle}>2nd Dawn for the Galaxy</Text>

            <Pressable style={styles.primaryButton} onPress={handleCreate}>
                <Text style={styles.buttonText}>Create Session</Text>
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
