import { View, Text, Modal, Pressable, StyleSheet } from "react-native";

export default function TechModal({ visible, onClose, tech, onPurchase }) {
    if (!tech) return null;

    return(
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <Pressable style={[styles.modal, { borderColor: tech.color }]}>
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.name}>{tech.name}</Text>
                            <Text style={styles.track}>{tech.track}</Text>
                        </View>
                        <View style={styles.costBadge}>
                            <Text style={styles.costText}>{tech.cost}</Text>
                        </View>
                    </View>

                    <Text style={styles.description}>{tech.description}</Text>

                    <View style={styles.buttons}>
                        <Pressable style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </Pressable>
                        <Pressable 
                            style={[styles.purchaseButton, {backgroundColor: tech.color}]}
                            onPress={() => {
                                onPurchase(tech);
                                onClose();
                            }}
                            >
                                <Text style={styles.purchaseText}>Purchase</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    )
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
    padding: 24,
    width: "100%",
    gap: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  track: {
    color: "#888",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  costBadge: {
    backgroundColor: "#0f0f1a",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    minWidth: 56,
  },
  costLabel: {
    color: "#555",
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 2,
  },
  costValue: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  description: {
    color: "#aaa",
    fontSize: 14,
    lineHeight: 20,
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
  purchaseButton: {
    flex: 2,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  purchaseText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});