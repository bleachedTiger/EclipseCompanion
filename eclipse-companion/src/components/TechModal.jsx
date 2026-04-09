import { View, Text, Image, Modal, Pressable, StyleSheet } from "react-native";
import { TILE_IMAGES } from "../constants/tileImages";

export default function TechModal({ tech, visible, onClose, onPurchase }) {
  if (!tech) return null;

  const image = TILE_IMAGES[tech.name];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modal}>
          <Image
            source={image}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.name}>{tech.name}</Text>
          <Text style={styles.description}>{tech.description}</Text>
          <View style={styles.buttons}>
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.purchaseButton, { backgroundColor: tech.color }]}
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
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
  },
  buttons: {
    flexDirection: "row",
    gap: 12,
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
    name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  description: {
    color: "#aaa",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
});