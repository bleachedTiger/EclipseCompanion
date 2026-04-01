package com.meeplehq.eclipse_companion.websocket;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class GameEventPublisher {

    private final SimpMessagingTemplate messagingTemplate;

    public void publishTilePurchased(String code, Long poolId, Long techTileId) {
        messagingTemplate.convertAndSend(
                "/topic/sessions/" + code,
                Map.of(
                        "type", "TILE_PURCHASED",
                        "poolId", poolId,
                        "techTileId", techTileId
                )
        );
    }

    public void publishRoundDrawn(String code, int round) {
        messagingTemplate.convertAndSend(
                "/topic/sessions/" + code,
                Map.of(
                        "type", "ROUND_DRAWN",
                        "round", round
                )
        );
    }
}