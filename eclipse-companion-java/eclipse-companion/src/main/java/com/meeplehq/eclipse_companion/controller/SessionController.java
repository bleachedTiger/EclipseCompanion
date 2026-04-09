package com.meeplehq.eclipse_companion.controller;

import com.meeplehq.eclipse_companion.model.Session;
import com.meeplehq.eclipse_companion.model.TechPool;
import com.meeplehq.eclipse_companion.service.SessionService;
import com.meeplehq.eclipse_companion.websocket.GameEventPublisher;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/sessions")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SessionController {

    private final SessionService sessionService;
    private final GameEventPublisher eventPublisher;

    // POST /sessions
    @PostMapping
    public ResponseEntity<Session> createSession(@RequestBody CreateSessionRequest request) {
        Session session = sessionService.createSession(request.playerCount());
        return ResponseEntity.ok(session);
    }

    // GET /sessions/{code}
    @GetMapping("/{code}")
    public ResponseEntity<Session> getSession(@PathVariable String code) {
        Session session = sessionService.getSession(code);
        return ResponseEntity.ok(session);
    }

    // POST /sessions/{code}/start
    @PostMapping("/{code}/start")
    public ResponseEntity<?> startSession(
            @PathVariable String code,
            @RequestBody StartSessionRequest request
    ) {
        try {
            Session session = sessionService.startSession(code, request.playerCount());
            return ResponseEntity.ok(session);
        } catch (RuntimeException e) {
            return ResponseEntity.status(409).body(e.getMessage());
        }
    }

    // POST /sessions/{code}/draw
    @PostMapping("/{code}/draw")
    public ResponseEntity<Session> drawTiles(@PathVariable String code) {
        Session session = sessionService.drawForNewRound(code);
        eventPublisher.publishRoundDrawn(code, session.getRound());
        return ResponseEntity.ok(session);
    }

    // PATCH /sessions/{code}/tiles/{poolId}/purchase
    @PatchMapping("/{code}/tiles/{poolId}/purchase")
    public ResponseEntity<TechPool> purchaseTile(
            @PathVariable String code,
            @PathVariable Long poolId
    ) {
        System.out.println("Purchasing tile " + poolId + " for session " + code);
        TechPool tile = sessionService.purchaseTile(code, poolId);
        eventPublisher.publishTilePurchased(code, poolId, tile.getTechTile().getId());
        return ResponseEntity.ok(tile);
    }

    @GetMapping("/{code}/board")
    public ResponseEntity<Map<String, List<BoardTileDTO>>> getBoard(@PathVariable String code) {
        return ResponseEntity.ok(sessionService.getBoard(code));
    }

    // Request records
    record CreateSessionRequest(int playerCount) {}
    record StartSessionRequest(int playerCount) {}
}