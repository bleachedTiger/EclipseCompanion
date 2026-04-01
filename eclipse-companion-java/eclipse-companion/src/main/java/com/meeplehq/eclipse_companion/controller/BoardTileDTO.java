package com.meeplehq.eclipse_companion.controller;

import com.meeplehq.eclipse_companion.model.TechPool;
import lombok.Data;

@Data
public class BoardTileDTO {
    private Long poolId;
    private String name;
    private String track;
    private Integer cost;
    private String description;
    private Integer availableCount;

    public static BoardTileDTO from(TechPool pool, int availableCount) {
        BoardTileDTO dto = new BoardTileDTO();
        dto.setPoolId(pool.getId());
        dto.setName(pool.getTechTile().getName());
        dto.setTrack(pool.getTechTile().getTrack().name());
        dto.setCost(pool.getTechTile().getCost());
        dto.setDescription(pool.getTechTile().getDescription());
        dto.setAvailableCount(availableCount);
        return dto;
    }
}