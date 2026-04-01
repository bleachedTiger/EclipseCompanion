import { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import TechCard from "../../../src/components/TechCard";
import TechModal from "../../../src/components/TechModal";

const PLACEHOLDER_TECHS = [
  { id: 1, name: "Neutron Bombs", cost: 8, color: "#c026d3" },
  { id: 2, name: "Starbase", cost: 6, color: "#c026d3" },
  { id: 3, name: "Plasma Cannon", cost: 7, color: "#c026d3" },
  { id: 4, name: "Phase Shield", cost: 7, color: "#c026d3" },
  { id: 5, name: "Advanced Mining", cost: 6, color: "#c026d3" },
  { id: 6, name: "Tachyon Source", cost: 8, color: "#c026d3" },
];

export default function MilitaryTab() {

    const [selectedTech, setSelectedTech] = useState(null);

    const handlePurchase = (tech) => {
        console.log("Purchased", tech.name);
        //TODO: Call PATCH /sessions/{code}/tiles/{poolId}/purchase
    }

  return (
    <View style={styles.container}>
      <FlatList
        data={PLACEHOLDER_TECHS}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TechCard
            tech={item}
            availableCount={2}
            onPress={() => setSelectedTech(item)}
          />
        )}
      />
        <TechModal
            tech={selectedTech}
            visible={!!selectedTech}
            onClose={() => setSelectedTech(null)}
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
});