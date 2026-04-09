package com.meeplehq.eclipse_companion.config;

import com.meeplehq.eclipse_companion.model.TechTile;
import com.meeplehq.eclipse_companion.repository.TechTileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements ApplicationRunner {

    private final TechTileRepository techTileRepository;

    @Override
    public void run(ApplicationArguments args) {
        if (techTileRepository.count() > 0) return;

        List<TechTile> tiles = List.of(
                // Military
                tile("Neutron Bombs",      TechTile.Track.MILITARY, 8,  "When Attacking Population, all Population Cubes in a Sector are destroyed automatically (see the Attacking Population section of the Combat Phase section).",5, false),
                tile("Starbase",           TechTile.Track.MILITARY, 6,  "You may Build Starbases.",5, false),
                tile("Plasma Cannon",      TechTile.Track.MILITARY, 7,  "You may Upgrade your Ship Blueprints with Plasma Cannon Ship Parts.",5, false),
                tile("Phase Shield",       TechTile.Track.MILITARY, 7,  "You may Upgrade your Ship Blueprints with phase shield Ship Parts.",5, false),
                tile("Advanced Mining",    TechTile.Track.MILITARY, 6,  "You may place Population Cubes in Advanced Materials Population Squares with your Colony Ships.",4, false),
                tile("Tachyon Source",     TechTile.Track.MILITARY, 8,  "You may Upgrade your Ship Blueprints with Tachyon Source Ship Parts.",3, false),
                tile("Gluon Computer",     TechTile.Track.MILITARY, 9,  "You may Upgrade your Ship Blueprints with Gluon Computer Ship Parts",3, false),
                tile("Plasma Missile",     TechTile.Track.MILITARY, 10, "You may Upgrade your Ship Blueprints with Plasma Missile Ship Parts.",3, false),
                // Grid
                tile("Gauss Shield",       TechTile.Track.GRID, 6,  "You may Upgrade your Ship Blueprints with Gauss Shield Ship Parts.",5, false),
                tile("Fusion Source",      TechTile.Track.GRID, 5,  "You may Upgrade your Ship Blueprints with Fusion Source Ship Parts.",5, false),
                tile("Improved Hull",      TechTile.Track.GRID, 5,  "You may Upgrade your Ship Blueprints with Improved Hull Ship Parts.",5, false),
                tile("Positron Computer",  TechTile.Track.GRID, 7,  "Upgrade your Ship Blueprints with Positron Computer Ship Parts.",5, false),
                tile("Advanced Economy",   TechTile.Track.GRID, 6,  "You may place Population Cubes in Advanced Money Population Squares with your Colony Ships.",4, false),
                tile("Tachyon Drive",      TechTile.Track.GRID, 7,  "You may Upgrade your Ship Blueprints with Tachyon Drive Ship Parts.",3, false),
                tile("Antimatter Cannon",  TechTile.Track.GRID, 9,  "You may Upgrade your Ship Blueprints with Antimatter Cannon Ship Parts.",3, false),
                tile("Quantum Grid",       TechTile.Track.GRID, 8,  "You receive two additional Influence Discs, placed immediately on your Influence Track.",3, false),
                // Nano
                tile("Nanorobots",         TechTile.Track.NANO, 5,  "You have one extra Activation when taking the Build Action.",5, false),
                tile("Fusion Drive",       TechTile.Track.NANO, 6,  "You may Upgrade your Ship Blueprints with Fusion Drive Ship Parts.",5, false),
                tile("Orbital",            TechTile.Track.NANO, 5,  "You may Build Orbitals..",5, false),
                tile("Advanced Robotics",  TechTile.Track.NANO, 7,  "You receive one additional Influence Disc, placed immediately on your Influence Track.", 5, false),
                tile("Advanced Labs",      TechTile.Track.NANO, 7,  "You may place Population Cubes in Advanced Science Population Squares with your Colony Ships.",4, false),
                tile("Monolith",           TechTile.Track.NANO, 10, "You may Build Monoliths.",3, false),
                tile("Wormhole Generator", TechTile.Track.NANO, 9,  "You may Explore, Move to, and Influence adjacent Sectors if the edges connecting the Sectors contain one Wormhole.",3, false),
                tile("Artifact Key",       TechTile.Track.NANO, 8,  "For each Artifact  on Sectors you Control, immediately gain 5 Resources of a single type.",3, false),
                // Rare
                tile("Antimatter Splitter", TechTile.Track.RARE, 8,  "Allows you to split damage from Antimatter Cannons freely over targets.",1, true),
                tile("Conifold Field",      TechTile.Track.RARE, 7,  "You may Upgrade your Ship Blueprints with Conifold Field Ship Parts.",1, true),
                tile("Neutron Absorber",    TechTile.Track.RARE, 6,  "Enemy Neutron Bombs have no effect on you. Note: this does not affect Planta's Species weakness.",1, true),
                tile("Absorption Shield",   TechTile.Track.RARE, 8,  "You may Upgrade your Ship Blueprints with Absorption Shield Ship Parts.",1, true),
                tile("Cloaking Device",     TechTile.Track.RARE, 9,  "Two Ships are required to Pin each of your Ships (see the Move section of the Action Phase section for details on Pinning).",1, true),
                tile("Improved Logistics",  TechTile.Track.RARE, 5,  "Gain 1 additional Move Activation during each Move Action you take.",1, true),
                tile("Sentient Hull",       TechTile.Track.RARE, 10, "You may Upgrade your Ship Blueprints with Sentient Hull Ship Parts.",1, true),
                tile("Soliton Cannon",      TechTile.Track.RARE, 9,  "You may Upgrade your Ship Blueprints with Soliton Cannon Ship Parts.",1, true),
                tile("Transition Drive",    TechTile.Track.RARE, 7,  "You may Upgrade your Ship Blueprints with Transition Drive Ship Parts.",1, true),
                tile("Warp Portal",         TechTile.Track.RARE, 8,  "Immediately place the Warp Portal Tile on any Sector you Control. The Warp Portal Tile connects this Sector to all other Warp Portal Sectors and is worth 1 VP if Controlled at the end of the game (see the Warp Portal section for details).",1, true),
                tile("Flux Missile",        TechTile.Track.RARE, 7,  "You may Upgrade your Ship Blueprints with Flux Missile Ship Parts.",1, true),
                tile("Pico Modulator",      TechTile.Track.RARE, 6,  "Gain 2 additional Upgrade Activations during each Upgrade Action you take.",1, true),
                tile("Ancient Labs",        TechTile.Track.RARE, 8,  "Immediately draw and resolve one Discovery Tile (see the Discovery Tiles section).",1, true),
                tile("Zero-Point Source",   TechTile.Track.RARE, 9,  "You may Upgrade your Ship Blueprints with Zero-Point Source Ship Parts.",1, true),
                tile("Metasynthesis",       TechTile.Track.RARE, 10, "You may place Population Cubes in any Advanced Population Squares with your Colony Ships.",1, true)
        );

        techTileRepository.saveAll(tiles);
        System.out.println("Seeded " + tiles.size() + " tech tiles.");
    }

    private TechTile tile(String name, TechTile.Track track, int cost,
                          String description, int copies, boolean isRare) {
        TechTile t = new TechTile();
        t.setName(name);
        t.setTrack(track);
        t.setCost(cost);
        t.setDescription(description);
        t.setCopies(copies);
        t.setIsRare(isRare);
        return t;
    }
}