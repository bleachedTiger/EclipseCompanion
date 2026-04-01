package com.meeplehq.eclipse_companion.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "tech_tiles")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class TechTile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Track track;

    @Column(nullable = false)
    private Integer cost;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Integer copies;

    @Column(nullable = false)
    private Boolean isRare;

    public enum Track {
        MILITARY, GRID, NANO, RARE
    }
}