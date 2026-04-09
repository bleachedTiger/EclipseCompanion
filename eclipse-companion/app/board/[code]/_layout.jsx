import { useState, useCallback } from "react";
import { Tabs, useLocalSearchParams } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";
import EndRoundModal from "../../../src/components/EndRoundModal";
import useWebSocket from "../../../src/hooks/useWebSocket";
import { drawTiles } from "../../../src/services/api";
import { SessionProvider } from "../../../src/context/SessionContext";
import BoardLayoutInner from "../../../src/components/BoardLayoutInner";

const TRACKS = [
  { name: "military", label: "Military", color: "#c026d3"},
  { name: "grid", label: "Grid", color: "#16a34a" },
  { name: "nano", label: "Nano", color: "#ca8a04"},
  { name: "rare", label: "Rare", color: "#000" },
]

export default function BoardLayout() {
  return (
    <SessionProvider>
      <BoardLayoutInner />
    </SessionProvider>
  );
}