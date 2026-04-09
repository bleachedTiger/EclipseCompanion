import "text-encoding";
import { useEffect, useRef, useCallback } from "react";
import { Client } from "@stomp/stompjs";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "https://eclipse-api.meeplehq.com";
const WS_URL = BASE_URL.replace(/^https/, "wss").replace(/^http/, "ws") + "/ws-native";

export default function useWebSocket(code, onMessage) {
  const client = useRef(null);

  const connect = useCallback(() => {

    client.current = new Client({
      brokerURL: WS_URL,
      forceBinaryWSFrames: true,
      appendMissingNULLonIncoming: true,
      reconnectDelay: 3000,
      onConnect: () => {
        console.log("STOMP connected for session:", code);
        client.current.subscribe(`/topic/sessions/${code}`, (message) => {
          try {
            const data = JSON.parse(message.body);
            console.log("STOMP message received:", data);
            onMessage(data);
          } catch (e) {
            console.error("STOMP message parse error:", e);
          }
        });
      },
      onDisconnect: () => {
        console.log("STOMP disconnected for session:", code);
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame);
      },
      onWebSocketError: (error) => {
        console.error("WebSocket error:", error);
      },
      onWebSocketClose: (event) => {
        console.log("WebSocket closed:", event);
      },
    });

    client.current.activate();
  }, [code, onMessage]);

  useEffect(() => {
    connect();
    return () => {
      client.current?.deactivate();
    };
  }, [connect]);
}