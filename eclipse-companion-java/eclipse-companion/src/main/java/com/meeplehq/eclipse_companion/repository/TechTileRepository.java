package com.meeplehq.eclipse_companion.repository;

import com.meeplehq.eclipse_companion.model.TechTile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TechTileRepository extends JpaRepository<TechTile, Long> {
    List<TechTile> findByTrack(TechTile.Track track);
}