import { useState, useEffect, useCallback } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from "react-native";
import { useGlobalSearchParams } from "expo-router";
import TechCard from "../../../src/components/TechCard";
import TechModal from "../../../src/components/TechModal";
import { getBoard, purchaseTile } from "../../../src/services/api";
import useWebSocket from "../../../src/hooks/useWebSocket";
import { useSession } from "../../../src/context/SessionContext";

export default function RareTab() {
  const { code } = useGlobalSearchParams();
  const [tiles, setTiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTile, setSelectedTile] = useState(null);

  const { lastDraw } = useSession();

  const fetchBoard = useCallback(async () => {
    try {
      const board = await getBoard(code);
      setTiles(board.rare ?? []);
    } catch (e) {
      console.error("Failed to fetch board:", e);
    } finally {
      setLoading(false);
    }
  }, [code]);

  useEffect(() => {
    fetchBoard();
  }, [lastDraw]);

  const handleMessage = useCallback((data) => {
    if (data.type === "TILE_PURCHASED") {
      setTiles((prev) =>
        prev
          .map((t) =>
            t.poolIds.includes(data.poolId)
              ? { ...t, poolIds: t.poolIds.filter(id => id !== data.poolId), availableCount: t.availableCount - 1 }
              : t
          )
          .filter((t) => t.availableCount > 0)
      );
    }
    if (data.type === "ROUND_DRAWN") {
      fetchBoard();
    }
  }, [fetchBoard]);

  useWebSocket(code, handleMessage);

  const handlePurchase = async (tile) => {
    try {
      const poolIdToUse = tile.poolIds[0];
      await purchaseTile(code, poolIdToUse);
      setTiles((prev) =>
        prev
          .map((t) =>
            t.poolIds[0] === poolIdToUse
              ? { ...t, poolIds: t.poolIds.slice(1), availableCount: t.availableCount - 1 }
              : t
          )
          .filter((t) => t.availableCount > 0)
      );
    } catch (e) {
      console.error("Failed to purchase tile:", e);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color="#000000" />
      </View>
    );
  }

  
  if (tiles.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No Rare Research available</Text>
      </View>
    );
  }
    
return (
    <View style={styles.container}>
      <FlatList
        data={tiles}
        keyExtractor={(item) => item.poolIds[0].toString()}
        numColumns={3}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TechCard
            tech={{ ...item, color:"#000000"}}
            availableCount={item.availableCount}
            onPress={() => setSelectedTile(item)}
          />
        )}
      />
        <TechModal
            tech={selectedTile ? { ...selectedTile, color:"#000000" } : null}
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