package com.meeplehq.eclipse_companion.service;

import com.meeplehq.eclipse_companion.service.SessionCodeGenerator;
import com.meeplehq.eclipse_companion.model.Session;
import com.meeplehq.eclipse_companion.model.TechPool;
import com.meeplehq.eclipse_companion.model.TechTile;
import com.meeplehq.eclipse_companion.repository.SessionRepository;
import com.meeplehq.eclipse_companion.repository.TechPoolRepository;
import com.meeplehq.eclipse_companion.repository.TechTileRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SessionService {

    private final SessionRepository sessionRepository;
    private final TechTileRepository techTileRepository;
    private final TechPoolRepository techPoolRepository;
    private final SessionCodeGenerator codeGenerator;

    private static final Map<Integer, Integer> INITIAL_DRAW = Map.of(
            2, 12, 3, 14, 4, 16, 5, 18, 6, 20
    );

    private static final Map<Integer, Integer> ROUND_DRAW = Map.of(
            2, 5, 3, 6, 4, 7, 5, 8, 6, 9
    );

    // Create a new session in LOBBY status
    public Session createSession(int playerCount) {
        Session session = new Session();
        session.setCode(codeGenerator.generate());
        session.setPlayerCount(playerCount);
        return sessionRepository.save(session);
    }

    // Get session by code
    public Session getSession(String code) {
        return sessionRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException("Session not found: " + code));
    }

    // Seed the bag and do initial draw
    @Transactional
    public Session startSession(String code, int playerCount) {
        Session session = getSession(code);
        session.setPlayerCount(playerCount);
        session.setStatus(Session.Status.ACTIVE);

        // Seed the bag with all tech tiles
        List<TechTile> allTiles = techTileRepository.findAll();
        List<TechPool> pool = new ArrayList<>();

        for (TechTile tile : allTiles) {
            int copies = tile.getIsRare() ? 1 : tile.getCopies();
            for (int i = 0; i < copies; i++) {
                TechPool entry = new TechPool();
                entry.setSession(session);
                entry.setTechTile(tile);
                entry.setStatus(TechPool.Status.IN_BAG);
                pool.add(entry);
            }
        }

        techPoolRepository.saveAll(pool);
        sessionRepository.save(session);

        // Do the initial draw
        drawTiles(session, INITIAL_DRAW.get(playerCount));

        return session;
    }

    // Draw tiles for a new round
    @Transactional
    public Session drawForNewRound(String code) {
        Session session = getSession(code);
        int drawCount = ROUND_DRAW.get(session.getPlayerCount());
        drawTiles(session, drawCount);
        session.setRound(session.getRound() + 1);
        return sessionRepository.save(session);
    }

    // Core draw logic
    private void drawTiles(Session session, int count) {
        int drawn = 0;

        // Then draw main tiles up to count
        List<TechPool> toUpdate = new ArrayList<>();

        List<TechPool> availableTiles = techPoolRepository.findRandomTilesInBag(session);

        for (TechPool tile : availableTiles) {
            if (drawn >= count) break;
            tile.setStatus(TechPool.Status.AVAILABLE);
            toUpdate.add(tile);
            //If it's a rare don't count it toward the limit
            if (!tile.getTechTile().getIsRare()) {
                drawn++;
            }
        }

        techPoolRepository.saveAll(toUpdate);
    }

    // Purchase a tile
    @Transactional
    public TechPool purchaseTile(String code, Long poolId) {
        Session session = getSession(code);
        TechPool tile = techPoolRepository.findById(poolId)
                .orElseThrow(() -> new RuntimeException("Tile not found: " + poolId));

        if (!tile.getSession().getId().equals(session.getId())) {
            throw new RuntimeException("Tile does not belong to session");
        }

        tile.setStatus(TechPool.Status.PURCHASED);
        return techPoolRepository.save(tile);
    }

    // Get board state grouped by track
    public Map<String, List<TechPool>> getBoard(String code) {
        Session session = getSession(code);

        return Map.of(
                "military", techPoolRepository.findBySessionAndTechTile_TrackAndStatus(
                        session, TechTile.Track.MILITARY, TechPool.Status.AVAILABLE),
                "grid", techPoolRepository.findBySessionAndTechTile_TrackAndStatus(
                        session, TechTile.Track.GRID, TechPool.Status.AVAILABLE),
                "nano", techPoolRepository.findBySessionAndTechTile_TrackAndStatus(
                        session, TechTile.Track.NANO, TechPool.Status.AVAILABLE),
                "rare", techPoolRepository.findBySessionAndTechTile_TrackAndStatus(
                        session, TechTile.Track.RARE, TechPool.Status.AVAILABLE)
        );
    }
}