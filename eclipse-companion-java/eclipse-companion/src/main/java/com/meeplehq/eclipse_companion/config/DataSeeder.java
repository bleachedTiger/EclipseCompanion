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
                tile("Neutron Bombs",      TechTile.Track.MILITARY, 8,  "Allows your ships to deal additional damage to enemy ships and installations.", 5, false),
                tile("Starbase",           TechTile.Track.MILITARY, 6,  "Construct powerful starbases to defend your systems from attack.",               5, false),
                tile("Plasma Cannon",      TechTile.Track.MILITARY, 7,  "A powerful weapon that deals heavy damage to enemy ships.",                      5, false),
                tile("Phase Shield",       TechTile.Track.MILITARY, 7,  "Advanced shielding technology that reduces incoming damage.",                    5, false),
                tile("Advanced Mining",    TechTile.Track.MILITARY, 6,  "Improves your mining operations to extract more resources.",                     4, false),
                tile("Tachyon Source",     TechTile.Track.MILITARY, 8,  "A powerful energy source that enhances your ships capabilities.",                3, false),
                tile("Gluon Computer",     TechTile.Track.MILITARY, 9,  "Advanced targeting computer that improves hit probability.",                     3, false),
                tile("Plasma Missile",     TechTile.Track.MILITARY, 10, "Long range missiles that deal devastating damage.",                              3, false),
                // Grid
                tile("Gauss Shield",       TechTile.Track.GRID, 6,  "Defensive shielding that absorbs incoming fire.",                  5, false),
                tile("Fusion Source",      TechTile.Track.GRID, 5,  "Efficient energy source that powers your fleet.",                  5, false),
                tile("Improved Hull",      TechTile.Track.GRID, 5,  "Reinforced hull plating that increases ship durability.",          5, false),
                tile("Positron Computer",  TechTile.Track.GRID, 7,  "Advanced computer system that improves ship targeting.",           5, false),
                tile("Advanced Economy",   TechTile.Track.GRID, 6,  "Improves your economic output across all systems.",                4, false),
                tile("Tachyon Drive",      TechTile.Track.GRID, 7,  "Advanced drive system that increases ship speed.",                 3, false),
                tile("Antimatter Cannon",  TechTile.Track.GRID, 9,  "Powerful cannon that deals massive damage to enemy ships.",        3, false),
                tile("Quantum Grid",       TechTile.Track.GRID, 8,  "Advanced power grid that improves all ship systems.",              3, false),
                // Nano
                tile("Nanorobots",         TechTile.Track.NANO, 5,  "Nanoscale robots that repair ship damage during combat.",          5, false),
                tile("Fusion Drive",       TechTile.Track.NANO, 6,  "Efficient drive system that improves ship maneuverability.",       5, false),
                tile("Orbital",            TechTile.Track.NANO, 5,  "Orbital installations that improve system productivity.",          5, false),
                tile("Advanced Robotics",  TechTile.Track.NANO, 7,  "Advanced robotic systems that improve ship capabilities.",         5, false),
                tile("Advanced Labs",      TechTile.Track.NANO, 7,  "Cutting edge research facilities that accelerate tech development.", 4, false),
                tile("Monolith",           TechTile.Track.NANO, 10, "Mysterious ancient structures that grant victory points.",         3, false),
                tile("Wormhole Generator", TechTile.Track.NANO, 9,  "Generates stable wormholes for rapid fleet movement.",             3, false),
                tile("Artifact Key",       TechTile.Track.NANO, 8,  "Unlocks ancient artifacts granting powerful bonuses.",             3, false),
                // Rare
                tile("Antimatter Splitter", TechTile.Track.RARE, 8,  "Splits antimatter for devastating area attacks.",          1, true),
                tile("Conifold Field",      TechTile.Track.RARE, 7,  "Exotic field generator with unique defensive properties.", 1, true),
                tile("Neutron Absorber",    TechTile.Track.RARE, 6,  "Absorbs neutron radiation to power ship systems.",         1, true),
                tile("Absorption Shield",   TechTile.Track.RARE, 8,  "Advanced shield that absorbs and redirects enemy fire.",   1, true),
                tile("Cloaking Device",     TechTile.Track.RARE, 9,  "Renders your ships invisible to enemy sensors.",           1, true),
                tile("Improved Logistics",  TechTile.Track.RARE, 5,  "Streamlines supply chains improving fleet efficiency.",    1, true),
                tile("Sentient Hull",       TechTile.Track.RARE, 10, "Self-aware hull that adapts to combat conditions.",        1, true),
                tile("Soliton Cannon",      TechTile.Track.RARE, 9,  "Fires concentrated soliton waves at enemy vessels.",       1, true),
                tile("Transition Drive",    TechTile.Track.RARE, 7,  "Allows ships to transition between dimensions.",           1, true),
                tile("Warp Portal",         TechTile.Track.RARE, 8,  "Creates stable warp portals for instant fleet movement.",  1, true),
                tile("Flux Missile",        TechTile.Track.RARE, 7,  "Missiles that flux between dimensions to bypass shields.", 1, true),
                tile("Pico Modulator",      TechTile.Track.RARE, 6,  "Modulates systems at the pico scale for efficiency.",      1, true),
                tile("Ancient Labs",        TechTile.Track.RARE, 8,  "Rediscovered ancient research facilities.",                1, true),
                tile("Zero-Point Source",   TechTile.Track.RARE, 9,  "Harvests energy from the quantum vacuum.",                 1, true),
                tile("Metasynthesis",       TechTile.Track.RARE, 10, "Advanced synthesis technology with broad applications.",   1, true)
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