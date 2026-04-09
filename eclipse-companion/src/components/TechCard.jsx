import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import { TILE_IMAGES } from "../constants/tileImages";

export default function TechCard({ tech, availableCount, onPress }) {
  const image = TILE_IMAGES[tech.name];
    return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image
        source={image}
        style={styles.image}
        resizeMode="cover"
      />
      {availableCount > 1 && (
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{availableCount}</Text>
        </View>
      )}
    </Pressable>
    );
}

const styles = StyleSheet.create({
  card: {
    width: "31%",
    aspectRatio: 1,
    margin: "1%",
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
countBadge: {
    position: "absolute",
    bottom: 6,
    right: 6,
    backgroundColor: "#fff",
    borderRadius: 999,
    width: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    elevation: 10,
  },
  countText: {
    color: "#0f0f1a",
    fontSize: 12,
    fontWeight: "700",
  },
});