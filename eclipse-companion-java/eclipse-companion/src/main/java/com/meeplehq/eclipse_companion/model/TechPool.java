package com.meeplehq.eclipse_companion.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.meeplehq.eclipse_companion.model.TechTile;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "tech_pool")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class TechPool {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id", nullable = false)
    private Session session;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tech_tile_id", nullable = false)
    private TechTile techTile;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    public enum Status {
        IN_BAG, AVAILABLE, PURCHASED
    }
}