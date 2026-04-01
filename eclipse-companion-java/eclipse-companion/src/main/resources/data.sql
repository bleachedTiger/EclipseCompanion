INSERT INTO tech_tiles (name, track, cost, description, copies, is_rare)
SELECT * FROM (VALUES
                   -- Military (Fuchsia)
                   ('Neutron Bombs',     'MILITARY', 8,  'Allows your ships to deal additional damage to enemy ships and installations.', 5, false),
                   ('Starbase',          'MILITARY', 6,  'Construct powerful starbases to defend your systems from attack.',               5, false),
                   ('Plasma Cannon',     'MILITARY', 7,  'A powerful weapon that deals heavy damage to enemy ships.',                      5, false),
                   ('Phase Shield',      'MILITARY', 7,  'Advanced shielding technology that reduces incoming damage.',                    5, false),
                   ('Advanced Mining',   'MILITARY', 6,  'Improves your mining operations to extract more resources.',                    4, false),
                   ('Tachyon Source',    'MILITARY', 8,  'A powerful energy source that enhances your ships capabilities.',               3, false),
                   ('Gluon Computer',    'MILITARY', 9,  'Advanced targeting computer that improves hit probability.',                    3, false),
                   ('Plasma Missile',    'MILITARY', 10, 'Long range missiles that deal devastating damage.',                             3, false),
                   -- Grid (Green)
                   ('Gauss Shield',      'GRID', 6,  'Defensive shielding that absorbs incoming fire.',                                   5, false),
                   ('Fusion Source',     'GRID', 5,  'Efficient energy source that powers your fleet.',                                   5, false),
                   ('Improved Hull',     'GRID', 5,  'Reinforced hull plating that increases ship durability.',                           5, false),
                   ('Positron Computer', 'GRID', 7,  'Advanced computer system that improves ship targeting.',                            5, false),
                   ('Advanced Economy',  'GRID', 6,  'Improves your economic output across all systems.',                                 4, false),
                   ('Tachyon Drive',     'GRID', 7,  'Advanced drive system that increases ship speed.',                                  3, false),
                   ('Antimatter Cannon', 'GRID', 9,  'Powerful cannon that deals massive damage to enemy ships.',                        3, false),
                   ('Quantum Grid',      'GRID', 8,  'Advanced power grid that improves all ship systems.',                               3, false),
                   -- Nano (Yellow)
                   ('Nanorobots',        'NANO', 5,  'Nanoscale robots that repair ship damage during combat.',                           5, false),
                   ('Fusion Drive',      'NANO', 6,  'Efficient drive system that improves ship maneuverability.',                        5, false),
                   ('Orbital',           'NANO', 5,  'Orbital installations that improve system productivity.',                           5, false),
                   ('Advanced Robotics', 'NANO', 7,  'Advanced robotic systems that improve ship capabilities.',                         5, false),
                   ('Advanced Labs',     'NANO', 7,  'Cutting edge research facilities that accelerate tech development.',               4, false),
                   ('Monolith',          'NANO', 10, 'Mysterious ancient structures that grant victory points.',                         3, false),
                   ('Wormhole Generator','NANO', 9,  'Generates stable wormholes for rapid fleet movement.',                             3, false),
                   ('Artifact Key',      'NANO', 8,  'Unlocks ancient artifacts granting powerful bonuses.',                             3, false),
                   -- Rare (Black)
                   ('Antimatter Splitter',  'RARE', 8,  'Splits antimatter for devastating area attacks.',          1, true),
                   ('Conifold Field',       'RARE', 7,  'Exotic field generator with unique defensive properties.', 1, true),
                   ('Neutron Absorber',     'RARE', 6,  'Absorbs neutron radiation to power ship systems.',         1, true),
                   ('Absorption Shield',    'RARE', 8,  'Advanced shield that absorbs and redirects enemy fire.',   1, true),
                   ('Cloaking Device',      'RARE', 9,  'Renders your ships invisible to enemy sensors.',           1, true),
                   ('Improved Logistics',   'RARE', 5,  'Streamlines supply chains improving fleet efficiency.',    1, true),
                   ('Sentient Hull',        'RARE', 10, 'Self-aware hull that adapts to combat conditions.',        1, true),
                   ('Soliton Cannon',       'RARE', 9,  'Fires concentrated soliton waves at enemy vessels.',       1, true),
                   ('Transition Drive',     'RARE', 7,  'Allows ships to transition between dimensions.',           1, true),
                   ('Warp Portal',          'RARE', 8,  'Creates stable warp portals for instant fleet movement.',  1, true),
                   ('Flux Missile',         'RARE', 7,  'Missiles that flux between dimensions to bypass shields.', 1, true),
                   ('Pico Modulator',       'RARE', 6,  'Modulates systems at the pico scale for efficiency.',      1, true),
                   ('Ancient Labs',         'RARE', 8,  'Rediscovered ancient research facilities.',                1, true),
                   ('Zero-Point Source',    'RARE', 9,  'Harvests energy from the quantum vacuum.',                 1, true),
                   ('Metasynthesis',        'RARE', 10, 'Advanced synthesis technology with broad applications.',   1, true)
              ) AS t(name, track, cost, description, copies, is_rare)
WHERE NOT EXISTS (SELECT 1 FROM tech_tiles LIMIT 1);