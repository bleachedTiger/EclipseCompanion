package com.meeplehq.eclipse_companion.controller;

import com.meeplehq.eclipse_companion.model.TechPool;
import lombok.Data;

import java.util.List;

@Data
public class BoardTileDTO {
    private List<Long> poolIds;
    private String name;
    private String track;
    private Integer cost;
    private String description;
    private Integer availableCount;

    public static BoardTileDTO from(List<TechPool> group) {
        BoardTileDTO dto = new BoardTileDTO();
        dto.setPoolIds(group.stream()
                .map(TechPool::getId)
                .collect(java.util.stream.Collectors.toList()));
        dto.setName(group.getFirst().getTechTile().getName());
        dto.setTrack(group.getFirst().getTechTile().getTrack().name());
        dto.setCost(group.getFirst().getTechTile().getCost());
        dto.setDescription(group.getFirst().getTechTile().getDescription());
        dto.setAvailableCount(group.size());
        return dto;
    }
}