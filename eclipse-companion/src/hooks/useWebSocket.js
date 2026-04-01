import { useEffect, useRef, useCallback } from "react";

const WS_URL = "wss://eclipse-api.meeplehq.com/ws";

export default function useWebSocket(code, onMessage) {
  const ws = useRef(null);

  const connect = useCallback(() => {
    ws.current = new WebSocket(`${WS_URL}/sessions/${code}`);

    ws.current.onopen = () => {
      console.log("WebSocket connected:", code);
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (e) {
        console.error("WebSocket message parse error:", e);
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected, attempting reconnect in 3s...");
      setTimeout(connect, 3000);
    };
  }, [code]);

  useEffect(() => {
    connect();
    return () => {
      ws.current?.close();
    };
  }, [connect]);

  const send = useCallback((data) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(data));
    }
  }, []);

  return { send };
}