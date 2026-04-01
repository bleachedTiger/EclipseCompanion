import { View, Text, Modal, Pressable, StyleSheet } from "react-native";

export default function EndRoundModal({ visible, round, onConfirm, onClose }) {
    return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modal}>
          <Text style={styles.title}>End Round {round}?</Text>

          <Text style={styles.description}>
            New Research tiles will be drawn for Round {round + 1}
          </Text>

          <View style={styles.buttons}>
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmText}>Draw Tiles</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}  

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  modal: {
    backgroundColor: "#1e1e2e",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
    padding: 24,
    width: "100%",
    gap: 16,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  warningBox: {
    backgroundColor: "#2a1a00",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ca8a04",
    padding: 12,
    gap: 4,
  },
  warningText: {
    color: "#ca8a04",
    fontSize: 14,
    fontWeight: "600",
  },
  warningSubtext: {
    color: "#92660a",
    fontSize: 12,
  },
  allClearBox: {
    backgroundColor: "#0a2a0a",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#16a34a",
    padding: 12,
  },
  allClearText: {
    color: "#16a34a",
    fontSize: 14,
    fontWeight: "600",
  },
  description: {
    color: "#888",
    fontSize: 13,
  },
  buttons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelText: {
    color: "#888",
    fontSize: 15,
    fontWeight: "600",
  },
  confirmButton: {
    flex: 2,
    backgroundColor: "#5b21b6",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  confirmText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});