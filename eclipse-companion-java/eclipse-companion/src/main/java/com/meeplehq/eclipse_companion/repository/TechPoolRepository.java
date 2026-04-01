package com.meeplehq.eclipse_companion.repository;

import com.meeplehq.eclipse_companion.model.Session;
import com.meeplehq.eclipse_companion.model.TechPool;
import com.meeplehq.eclipse_companion.model.TechTile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TechPoolRepository extends JpaRepository<TechPool, Long> {

    List<TechPool> findBySessionAndStatus(Session session, TechPool.Status status);

    List<TechPool> findBySessionAndTechTile_TrackAndStatus(
            Session session,
            TechTile.Track track,
            TechPool.Status status
    );

    @Query("SELECT t FROM TechPool t WHERE t.session = :session " +
            "AND t.status = 'IN_BAG' " +
            "ORDER BY RANDOM()")
    List<TechPool> findRandomTilesInBag(Session session);
}