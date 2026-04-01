import { useState, useEffect, useCallback } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import TechCard from "../../../src/components/TechCard";
import TechModal from "../../../src/components/TechModal";
import { getBoard, purchaseTile } from "../../../src/services/api";
import useWebSocket from "../../../src/hooks/useWebSocket";

export default function MilitaryTab() {
    const { code } = useLocalSearchParams();
    const [tiles, setTiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTile, setSelectedTile] = useState(null);

    const fetchBoard = useCallback(async () => {
      try {
        const board = await getBoard(code);
        setTiles(board.military ?? []);
      } catch (e) {
        console.error("Failed to fetch board:", e);
      } finally {
        setLoading(false);
      }
    }, [code]);

    useEffect(() => {
      fetchBoard();
    }, [fetchBoard]);

    const handleMessage = useCallback((data) => {
      if (data.type === "TILE_PURCHASED") {
        setTiles((prev) =>
          prev.filter((t) => t.poolId !== data.poolId)
        );
      }
      if (data.type === "ROUND_DRAWN") {
        fetchBoard();
      }
    }, [fetchBoard]);

    useWebSocket(code, handleMessage);

  const handlePurchase = async (tile) => {
    try {
      await purchaseTile(code, tile.poolId);
      setTiles((prev) => prev.filter((t) => t.poolId !== tile.poolId));
    } catch (e) {
      console.error("Failed to purchase tile:", e);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color="#c026d3" />
      </View>
    );
  }

  if (tiles.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No military tiles available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tiles}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TechCard
            tech={{ ...item, color:"#c026d3"}}
            availableCount={item.availableCount}
            onPress={() => setSelectedTile(item)}
          />
        )}
      />
        <TechModal
            tech={selectedTile ? { ...selectedTile, color:"#c026d3" } : null}
            visible={!!selectedTile}
            onClose={() => setSelectedTile(null)}
            onPurchase={handlePurchase}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f1a",
  },
  list: {
    padding: 8,
  },
  centered: {
    flex: 1,
    backgroundColor: "#0f0f1a",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#555",
    fontSize: 14,
  },
});