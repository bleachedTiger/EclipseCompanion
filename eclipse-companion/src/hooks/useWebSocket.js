import { useEffect, useRef, useCallback } from "react";
import { Client } from "@stomp/stompjs";

const WS_URL = "ws://eclipse-api.meeplehq.com/ws/websocket";

export default function useWebSocket(code, onMessage) {
  const client = useRef(null);

  const connect = useCallback(() => {
    client.current = new Client({
      brokerURL: WS_URL,
      reconnectDelay: 3000,
      onConnect: () => {
        console.log("STOMP connected:", code);
        client.current.subscribe(`/topic/sessions/${code}`, (message) => {
          try {
            const data = JSON.parse(message.body);
            onMessage(data);
          } catch (e) {
            console.error("STOMP message parse error:", e);
          }
        });
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame);
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