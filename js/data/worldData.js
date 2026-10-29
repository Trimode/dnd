/**
 * D&D 5.5e Bleeding Realms World Compendium Data
 * Integrated with the user's characters, lore, and elemental bleeding geography.
 */

export const INITIAL_WORLD_DATA = {
  metadata: {
    worldName: "The Bleeding Realms of Aetheria",
    version: "5.5e",
    tagline: "Where Primal Elements Clash and Bleed into Diverse Lands & Peoples",
    description: "A world governed by four ancient Primordial Anchors. At the frontiers where fire, earth, water, and air collide, the landscape and its inhabitants undergo wondrous and volatile hybridization.",
    currentEra: "Era of the Fractured Confluence (Year 842 FC)"
  },

  // Elemental Domains & Bleeding Regions
  pantheon: [
    {
      id: "deity-oathrizar",
      name: "Oathrizar, The Living Covenant",
      title: "The Arbiter of the Four Bleeds",
      category: "Distant Titan & Living Relic",
      alignment: "True Neutral",
      elementalDomain: "All 4 Elements in Harmony",
      domains: "Balance, Order, Covenants, Protection",
      clericDomains: "Order, Peace, Protection",
      recommendedOaths: "Oath of the Watchers, Oath of Devotion",
      symbol: "*",
      tenets: "When the elements war, the world bleeds. When they unite, the world ascends. Swear no oath you cannot carve into stone.",
      overview: "The unified consciousness of the four elemental titan kings who sacrificed their mortal forms to seal the continental fracture. Revered across all four bleeding realms as the supreme balance keeper.",
      walkingManifestation: "Physically rests as the sentient Titan Greatsword upon the Plinth in Crucible City. Speaks in harmonized quad-chords to chosen champions.",
      blessingQuote: "Carry my edge not for slaughter, but to hold the seams of reality together.",
      inspiredBoon: "Gain Advantage on saving throws against elemental damage, and once per long rest you can change the damage type of any spell or weapon attack.",
      dmSecrets: "Oathrizar can only be permanently shattered if all four elemental bleedlands are completely drained of their magic."
    },
    {
      id: "deity-ignis-vael",
      name: "Sol-Pyros (Ignis-Vael)",
      title: "The Radiant Sun-Pyre & The Eternal Flame",
      category: "Distant Cosmic Titan",
      alignment: "Lawful Neutral / Zealous",
      elementalDomain: "Fire & Radiant Light",
      domains: "Sun, Radiant Light, War, Purification",
      clericDomains: "Light, War, Forge",
      recommendedOaths: "Oath of Glory, Oath of the Crown",
      symbol: "*",
      tenets: "Burn away weakness, deceit, and darkness until only sacred radiant truth remains. Fire does not negotiate with the corrupt.",
      overview: "The distant cosmic progenitor of fire. Worshipped with blinding splendor across the Caldera of Pyros by inquisitors, solar paladins, and fire-touched zealots.",
      walkingManifestation: "Too radiant to descend without burning the land; manifests through solar flare visions and holy pillars of fuel-less fire in the Sunken Pyre cathedral.",
      blessingQuote: "Let your soul ignite with holy wrath; the shadow shall find no foothold in your heart.",
      inspiredBoon: "Your melee attacks and fire spells deal an extra 1d6 Radiant damage and illuminate enemies, preventing invisibility.",
      dmSecrets: "Sol-Pyros is secretly terrified of the 'Black Sun' prophesied by the Void Rifts, which is why his inquisitors are so ruthless."
    },
    {
      id: "deity-khel-durn",
      name: "Khel-Durn (The Granite Father)",
      title: "The World-Bone & Lord of the Deep Hearth",
      category: "Slumbering Earth Titan",
      alignment: "Lawful Good",
      elementalDomain: "Earth & Hearth-Stone",
      domains: "Mountains, Mining, Fermentation, Craft, Endurance",
      clericDomains: "Earth, Forge, Life, Community",
      recommendedOaths: "Oath of the Crown, Oath of Redemption",
      symbol: "*",
      tenets: "Stone outlasts empires. Guard the hearth, honor the weld, brew with unbending pride, and never abandon a clan-kin.",
      overview: "The colossal progenitor of earth slumbering miles beneath the Iron Crags. Dwarven and Goliathan clans consider earthquakes and mineral springs to be his steady pulse.",
      walkingManifestation: "Wanders the mountain taverns in the guise of an old greybeard miner asking for a draft of ale. If a dwarf shares their drink generously, Khel-Durn blesses their forge with runic gold veins.",
      blessingQuote: "Drink deep of the mountain's blood, lad. Stand fast; let the wind break against you, not you against the wind.",
      inspiredBoon: "+10 Temporary HP after every rest, and you cannot be knocked prone or moved against your will while standing on solid stone.",
      dmSecrets: "Garrick Kegnir once unknowingly shared an ale with Khel-Durn in a tavern; that interaction gave Garrick his master brew secrets."
    },
    {
      id: "deity-4nv1l-vulcanis",
      name: "Vulcanis / 4N-V1L (The Living Anvil)",
      title: "Sovereign of the Living Forge & The Clockwork Spark",
      category: "Walking God (Public)",
      alignment: "Neutral Good",
      elementalDomain: "Earth + Fire (Magma Bleed)",
      domains: "Artifice, Smiths, Clockwork Evolution, Forgework",
      clericDomains: "Forge, Knowledge, Artifice",
      recommendedOaths: "Oath of Devotion, Oath of the Open Sea",
      symbol: "*",
      tenets: "Flesh tires, stone weathers, but the weld endures. Create that which outlives yourself, and protect the living from the cold void.",
      overview: "An ancient Primordial Automaton who attained godhood during the First Age. Unlike distant deities, he lives and works right alongside mortal artisans in the Slagfields.",
      walkingManifestation: "Walks openly in the Great Anvil Foundry as 4N-V1L! Mortals leave offerings of rare ingots and flux at his anvil, though 4N-V1L insists he is merely a humble craftsman.",
      blessingQuote: "No steel is born sharp. It must be heated, hammered, and quenched. You are being forged for greatness.",
      inspiredBoon: "Gain proficiency with all artisan smithing tools, and your weapon strikes gain the 5.5e 'Graze' or 'Cleave' mastery effect.",
      dmSecrets: "4N-V1L's internal thermal core houses the sole surviving star-shard from the creation of the elemental quadrants."
    },
    {
      id: "deity-aurelia-sylvan",
      name: "Aurelia Sylvan-Mane (The Root-Mother)",
      title: "Lady of the Canopy & The Primal Lioness",
      category: "Walking God (Incognito)",
      alignment: "Neutral Good",
      elementalDomain: "Earth + Water/Flora (Foregrove Bleed)",
      domains: "Nature, Primeval Forests, Beasts, Rebirth, Healing",
      clericDomains: "Nature, Life, Twilight",
      recommendedOaths: "Oath of the Ancients",
      symbol: "*",
      tenets: "Listen to the canopy. The roots carry warning long before the storm arrives. Take only what the forest yields freely.",
      overview: "The living soul of the Foregrove. She nurtures ancient root systems that connect the entire continent and maintains harmony between predators and prey.",
      walkingManifestation: "Wanders the green woods disguised as 'Old Mother Rowan', an eccentric herbalist with a basket of glowing moss, or as an elusive celestial white lynx.",
      blessingQuote: "Let the earth cradle your weariness. In every fallen leaf lies the seed of next spring's canopy.",
      inspiredBoon: "You gain a climbing speed equal to your walking speed, and you can cast 'Speak with Animals' and 'Goodberry' at will.",
      dmSecrets: "She and Lord Jensen Lion Foregrove communicate telepathically through the Heartwood world-seed tree."
    },
    {
      id: "deity-skirra",
      name: "Skirra the Snow-Bane",
      title: "The Frost-Mother & Avalanche Sovereign",
      category: "Walking Demi-God & Ancestral Spirit",
      alignment: "Chaotic Good",
      elementalDomain: "Earth + Glacial Ice (Permafrost Bleed)",
      domains: "Survival, Winter, Avalanches, Unyielding Endurance",
      clericDomains: "Tempest, War, Survival",
      recommendedOaths: "Oath of Vengeance, Oath of Conquest",
      symbol: "*",
      tenets: "The mountain tests you with stone; the winter tests you with frost. Break what seeks to break you. Stand unbroken.",
      overview: "A legendary goliath barbarian who ascended to demi-godhood after wrestling a frost-leviathan. She is the ancestral patron of the northern clans.",
      walkingManifestation: "Spiritually fused with Warlord Kirrag Snow Breaker. During blood-moon battles, she manifests as an ethereal 12-foot frost giant standing behind him.",
      blessingQuote: "Crying from cold won't warm your blood. Grip your axe and let the battle-heat burn within you!",
      inspiredBoon: "Immunity to extreme cold exhaustion, and whenever you reduce an enemy to 0 HP, you gain 15 Temporary HP.",
      dmSecrets: "Skirra's frozen tomb lies at the highest summit of the Frostfang Range, guarded by ice drakes."
    },
    {
      id: "deity-aethovox",
      name: "Aethovox, The Endless Breath",
      title: "Lord of the Resonant Sky & The Multivox",
      category: "Distant Cosmic Primordial",
      alignment: "Neutral Good",
      elementalDomain: "Air & Acoustic Sound",
      domains: "Sky, Acoustics, Languages, Knowledge, Prophecy",
      clericDomains: "Knowledge, Tempest, Trickery",
      recommendedOaths: "Oath of the Open Sea, Oath of Devotion",
      symbol: "*",
      tenets: "Every element sings a syllable of creation. To listen without fear is to master reality. The wind carries all secrets.",
      overview: "The living atmosphere of the realm. Aethovox speaks not in mortal words, but in atmospheric pressure changes, acoustic harmonics, and melodic breezes.",
      walkingManifestation: "Does not possess a physical body; speaks through the great silver chimes of the Monastery of a Thousand Tongues.",
      blessingQuote: "Speak clearly, child of dust. Your words resonate through the heavens longer than you realize.",
      inspiredBoon: "You can understand all spoken languages, and your spells with vocal components have their range increased by 30 feet.",
      dmSecrets: "Aethovox is the only entity that remembers the true origin of the continent before the Shattering."
    },
    {
      id: "deity-shae-lir",
      name: "Shae-Lir (The Abyssal Mother)",
      title: "Lady of the Sunken Spire & Tidal Sovereign",
      category: "Distant Cosmic Primordial",
      alignment: "Chaotic Neutral",
      elementalDomain: "Water & The Abyssal Trench",
      domains: "Oceans, Storms, Tides, Deep Mysteries, Fate",
      clericDomains: "Tempest, Twilight, Arcana",
      recommendedOaths: "Oath of the Open Sea",
      symbol: "*",
      tenets: "Tides yield to no emperor. Flow around immovable obstacles, or batter them into sand with patient waves.",
      overview: "The unfathomable deity of the ocean depths. Revered by tritons, sea-elves, and coastal navigators across the Abyssal Fjords of Aquas.",
      walkingManifestation: "Manifests as colossal bioluminescent tidal projections or deep-sea leviathan avatars during lunar eclipses.",
      blessingQuote: "The surface only sees foam and waves. Plunge deep if you seek true pearls of power.",
      inspiredBoon: "You gain a swimming speed of 40 feet, the ability to breathe underwater, and darkvision out to 120 feet.",
      dmSecrets: "Shae-Lir keeps a sunken prison beneath the Trench of Whispers holding void leviathans from the outer dark."
    },
    {
      id: "deity-neth-malok",
      name: "Neth-Malok, The Ash-Eater",
      title: "The Fallen Flame & Lord of Nether-Pyres",
      category: "Fallen & Corrupted Deity",
      alignment: "Neutral Evil",
      elementalDomain: "Fire + Shadow/Void (Forbidden Bleed)",
      domains: "Necrotic Fire, Starvation, Eclipse, Void Blight",
      clericDomains: "Death, Twilight, Nether-Pyromancy",
      recommendedOaths: "Oath of Conquest, Oath of Treachery",
      symbol: "*",
      tenets: "Shadow feeds the flame that light cannot quench. In the cold black ash lies the ultimate silence of the cosmos.",
      overview: "Once the benevolent god of twilight hearths and gentle embers, Neth-Malok was trapped in a void rift during the First Shattering and twisted into a starving shadow deity.",
      walkingManifestation: "Whispers from obsidian mirrors and shadow-fire braziers in the Ebonflame Scar. Carrus Ebonflame constantly resists his insidious whispers.",
      blessingQuote: "Burn without warmth, hunger without end... Drink of the void and watch their fragile suns crumble.",
      inspiredBoon: "Your fire damage can be converted into necrotic damage that ignores fire immunity, and you gain resistance to necrotic damage.",
      dmSecrets: "Neth-Malok's heart is a cracked obsidian gem hidden within the deepest rift of the Ebonflame Scar."
    },
    {
      id: "deity-zephyra-null",
      name: "Zephyra-Null, The Erased Gale",
      title: "The Silent Fifth Element & The Forgotten Aether",
      category: "Lost & Forgotten Deity",
      alignment: "True Neutral",
      elementalDomain: "The 5th Element (Quintessence & Void)",
      domains: "Lost Lore, Space, Time, Fading Memories",
      clericDomains: "Arcana, Knowledge, Twilight",
      recommendedOaths: "Oath of the Watchers",
      symbol: "*",
      tenets: "All that was recorded can be unwritten. In the silence between elements lies the true canvas of the cosmos.",
      overview: "The forgotten fifth deity of Pure Aether whose name and temples were systematically erased during the signing of the First Covenant to prevent planar collapse.",
      walkingManifestation: "Worshipped by no living churches; exists only as harmonic echoes trapped in the subterranean bell vaults of the Mist Spire.",
      blessingQuote: "You remember what all others have forgotten. Let silence be your armor.",
      inspiredBoon: "Once per long rest, you can turn invisible and step through solid walls up to 10 feet thick as an action.",
      dmSecrets: "If Zephyra-Null's true name is spoken aloud on the Plinth of Oathrizar, the fifth elemental plane of Aether will reconnect."
    },
    {
      id: "deity-liora",
      name: "Liora of the Last Candle",
      title: "The Tender of the Lonely Hearth & The Fragile Spark",
      category: "The God with a Single Worshipper",
      alignment: "Neutral Good",
      elementalDomain: "Minor Spark of Hearth-Light & Memory",
      domains: "Quiet Hearths, Lost Travelers, Hope, Fading Sparks",
      clericDomains: "Light, Peace, Twilight",
      recommendedOaths: "Oath of Devotion, Oath of Redemption",
      symbol: "*",
      tenets: "Never let a traveler freeze in the dark. Keep the small fires burning when grand empires fall. Kindness is the only light that outlasts time.",
      overview: "A dying, intensely gentle minor goddess whose divine existence is sustained by only one remaining mortal in the entire world.",
      soleWorshipper: "Barnaby the Blind Bell-Ringer (an 82-year-old hermit at the edge of the Cinder Steppes who lights a single tallow candle at dusk and whispers her name).",
      blessingQuote: "I am small... like a candle in the night. But even the smallest flame can guide a lost soul home.",
      inspiredBoon: "Divine Spark of the Last Candle: If you or an ally within 30 ft would be reduced to 0 HP, you immediately drop to 1 HP instead and emit a soothing 30-ft burst of healing (3d8 HP to all allies). Once used, Barnaby's candle flickers, requiring the party to aid him to restore the boon.",
      dmSecrets: "If Barnaby dies and no one lights his evening candle, Liora will fade into stardust forever. If a player character takes up her devotion, she ascends back into a major protector deity."
    }
  ],

  regions: [
    {
      id: "region-pyros",
      name: "The Caldera of Pyros",
      domain: "Fire",
      type: "Core Element",
      color: "#e65100",
      gradient: "linear-gradient(135deg, #b71c1c, #ff6f00)",
      coordinates: { x: 78, y: 72 },
      climate: "Extreme heat, radiant thermal geysers, obsidian plains, ash-draped skies.",
      capital: "Ignis Sanctum",
      ruler: "The Cinder Conclave & High Inquisitor Pyrok",
      overview: "The heart of pure elemental fire. Rivers of liquid flame carve through obsidian plateaus. Its inhabitants are fire-touched humans, azer, and tieflings forged in holy fervor.",
      dangerLevel: "Deadly (Extreme Heat & Ash Choke)",
      pointsOfInterest: [
        { name: "The Sunken Pyre", type: "Holy Shrine", desc: "The primary cathedral of Pyrok the Pious where divine sacred flame burns without fuel." },
        { name: "Obsidian Spire", type: "Fortress", desc: "Tower carved from a single volcanic crystal, housing the Flame Wardens." }
      ],
      dmNotes: "Deep beneath the Sunken Pyre lies an ancient seal restraining an elder magma leviathan that feeds on sacred radiant devotion."
    },
    {
      id: "region-slagfields",
      name: "The Slagfields & Smoldering Forges",
      domain: "Fire + Earth (Bleed)",
      type: "Bleedland",
      color: "#bf360c",
      gradient: "linear-gradient(135deg, #ff5722, #5d4037)",
      coordinates: { x: 62, y: 65 },
      climate: "Dense metallic smoke, glowing basalt ridges, geothermal steam vents.",
      capital: "The Great Anvil Foundry",
      ruler: "4N-V1L (Master of the Living Forge) & Guild of Iron-Smelters",
      overview: "Where volcanic fire meets mineral-rich living stone. The earth here sweats molten iron, and the people are unparalleled master smiths, magma-dwarves, and brass-skinned constructs.",
      dangerLevel: "Moderate (Toxic fumes, molten rifts)",
      pointsOfInterest: [
        { name: "4N-V1L's Sovereign Crucible", type: "Bastion / Forge", desc: "The colossal subterranean workshop where 4N-V1L works ancient runic metals and trains construct smiths." },
        { name: "Slag River Canal", type: "Trade Route", desc: "Heavily fortified canal transporting molten slag and high-grade ingots across the continent." }
      ],
      dmNotes: "4N-V1L's memory core contains fragments of the Primordial Titan that first broke the continent into elemental quadrants."
    },
    {
      id: "region-terran",
      name: "The Iron Crags of Terran",
      domain: "Earth",
      type: "Core Element",
      color: "#4e342e",
      gradient: "linear-gradient(135deg, #3e2723, #795548)",
      coordinates: { x: 28, y: 68 },
      climate: "Sub-alpine crags, deep subterranean hollows, magnetic iron stone valleys.",
      capital: "Kegnir Deep-Hold",
      ruler: "Thane Garrick Ironbrown Kegnir & The Council of Anvils",
      overview: "Towering mountain ranges of unbreakable granite and magnetic iron. The Dwarven and Goliathan clans live in deep subterranean bastions enriched by runic geomancy.",
      dangerLevel: "High (Cave-ins, stone rocs, magnetic storms)",
      pointsOfInterest: [
        { name: "The Kegnir Iron-Hearth Brewery", type: "Bastion / Brewery", desc: "Garrick Ironbrown Kegnir's world-famous mountain brewery, infusing mineral waters with fiery subterranean hops and runic warding." },
        { name: "Hall of Echoing Runes", type: "Ancient Vault", desc: "A mile-deep amphitheater where earth-speakers commune with the continental tectonic plates." }
      ],
      dmNotes: "Garrick's secret yeast strain is cultivated from the sap of an ancient petrified earth-treant, granting vitality to those who drink it."
    },
    {
      id: "region-glacial-crags",
      name: "The Glacial Crags & Permafrost Ridge",
      domain: "Earth + Water/Ice (Bleed)",
      type: "Bleedland",
      color: "#006064",
      gradient: "linear-gradient(135deg, #00838f, #455a64)",
      coordinates: { x: 24, y: 34 },
      climate: "Bitter blizzards, black glacier rifts, ice-fused granite bastions.",
      capital: "Frost-Breaker Hold",
      ruler: "Warlord Kirrag Snow Breaker",
      overview: "The collision of unbreakable stone and unrelenting glacial ice. The terrain is an impenetrable maze of frozen mountain passes defended by hearty ice-carvers, frost-barbarians, and rime-forged warriors.",
      dangerLevel: "Deadly (Hyperthermia, avalanche giants, frost drakes)",
      pointsOfInterest: [
        { name: "The Shattered Glacier", type: "Battleground", desc: "The legendary mountain pass cleaved in twain by Kirrag Snow Breaker during the Rime-War." },
        { name: "Rime-Stone Fortress", type: "Bastion / Stronghold", desc: "Kirrag's seat of power, reinforced by ice that never melts and stone enchanted with freezing runes." }
      ],
      dmNotes: "Kirrag's warhammer was forged inside a frozen magma vent; when swung, it shatters armor through instant thermal shock."
    },
    {
      id: "region-aquas",
      name: "The Abyssal Fjords of Aquas",
      domain: "Water",
      type: "Core Element",
      color: "#0d47a1",
      gradient: "linear-gradient(135deg, #01579b, #0288d1)",
      coordinates: { x: 18, y: 18 },
      climate: "Endless rain, ocean chasms, bioluminescent tidal reefs.",
      capital: "Oceana Spires",
      ruler: "The Tide-Mother Synod",
      overview: "A majestic seascape of sunken coral cities, tidal fjords, and perpetual squalls. Inhabited by tritons, sea-elves, and tide-callers.",
      dangerLevel: "High (Maelstroms, leviathans)",
      pointsOfInterest: [
        { name: "The Trench of Whispers", type: "Subsea Trench", desc: "Deep water trench that reflects sound across entire oceans." },
        { name: "Coral Citadel", type: "Capital", desc: "Living reef palace that responds to tidal magic." }
      ],
      dmNotes: "The ocean floor hides a gate to the Elemental Plane of Water that is slowly widening."
    },
    {
      id: "region-mist-spires",
      name: "The Mist Spires & Cloud Nexus",
      domain: "Water + Air (Bleed)",
      type: "Bleedland",
      color: "#37474f",
      gradient: "linear-gradient(135deg, #455a64, #78909c)",
      coordinates: { x: 42, y: 22 },
      climate: "Floating fog-shrouded peaks, perpetual drizzle, swirling acoustic winds.",
      capital: "The Monastic Heights",
      ruler: "High Abbot Vaelen & The Order of the Thousand Tongues",
      overview: "Sheer rock pillars suspended between sea mist and sky currents. Sound travels here with supernatural clarity, making it the perfect sanctuary for language, acoustics, and meditation.",
      dangerLevel: "Moderate (Dizzying heights, sudden wind shear)",
      pointsOfInterest: [
        { name: "Monastery of a Thousand Tongues", type: "Monastery / Sanctuary", desc: "Perched atop a three-thousand-foot mist spire, where monks decipher the primordial languages of the elements." },
        { name: "The Resonance Chime Array", type: "Acoustic Wonder", desc: "Giant silver chimes that chime when elemental storms approach, warning all bleeding realms." }
      ],
      dmNotes: "The Monks have recorded a prophecy in the 'Tome of All Dialects' stating that when the bleedlands cease to mix, the continent will shatter."
    },
    {
      id: "region-zephyr",
      name: "The Floating Mesa of Zephyr",
      domain: "Air",
      type: "Core Element",
      color: "#00695c",
      gradient: "linear-gradient(135deg, #004d40, #26a69a)",
      coordinates: { x: 74, y: 20 },
      climate: "Howling updrafts, lightning storms, crystal-clear high altitude.",
      capital: "Aethelgard High-Sky",
      ruler: "The Zephyr Ascendancy",
      overview: "Gravity-defying islands drifting on thermal columns. Home to aarakocra, storm sorcerers, and skyship navigators.",
      dangerLevel: "High (Fall hazard, lightning elementals)",
      pointsOfInterest: [
        { name: "The Storm Crown", type: "Vortex", desc: "A perpetual tempest harnessed to power elemental airships." }
      ],
      dmNotes: "Sky-pirates have established hidden anchorages inside the perpetual cloud cover."
    },
    {
      id: "region-cinder-steppes",
      name: "The Cinder Steppes & Plasma Flats",
      domain: "Fire + Air (Bleed)",
      type: "Bleedland",
      color: "#e64a19",
      gradient: "linear-gradient(135deg, #d84315, #ff8a65)",
      coordinates: { x: 82, y: 44 },
      climate: "Superheated desert winds, plasma tornadoes, glowing amber dunes.",
      capital: "Sol-Riven Citadel",
      ruler: "Pyrok the Pious (Crusade Garrison)",
      overview: "Where fire catches wind: thermal tornadoes ignite the sands into molten glass. The nomadic tribes here ride wind-gliders and wield fire-whips.",
      dangerLevel: "Deadly (Thermal storms, fire elementals)",
      pointsOfInterest: [
        { name: "The Glass Sea", type: "Natural Wonder", desc: "Miles of desert sand fused into reflective crystal by ancient plasma lightning." }
      ],
      dmNotes: "Pyrok is excavating a fallen solar beacon beneath the glass dunes."
    },
    {
      id: "region-foregrove",
      name: "The Foregrove Canopy & Primal Roots",
      domain: "Earth + Water/Flora (Bleed)",
      type: "Bleedland",
      color: "#2e7d32",
      gradient: "linear-gradient(135deg, #1b5e20, #4caf50)",
      coordinates: { x: 48, y: 52 },
      climate: "Dense primeval rainforest, bioluminescent moss, ancient colossal ironwood trees.",
      capital: "The Lion Heartwood",
      ruler: "Lord Jensen Lion Foregrove",
      overview: "Where living earth drinks deep of mineral springs. The trees here are centuries old, armored in ironwood bark, and guarded by noble wardens, rangers, and earth-beasts.",
      dangerLevel: "Moderate (Primal predators, sentient root snares)",
      pointsOfInterest: [
        { name: "Foregrove Sanctuary", type: "Bastion / Grove", desc: "Jensen Lion Foregrove's ancestral citadel built into the branches of a colossal world-seed tree." },
        { name: "The Amber Pools", type: "Healing Spring", desc: "Enchanted water that accelerates natural regeneration and cleanses elemental curses." }
      ],
      dmNotes: "Jensen is hiding an ancient artifact tied to Oathrizar within the hollow roots of the Heartwood."
    },
    {
      id: "region-ebonflame",
      name: "The Ebonflame Scar & Void Rifts",
      domain: "Fire + Shadow/Void (Forbidden Bleed)",
      type: "Bleedland",
      color: "#212121",
      gradient: "linear-gradient(135deg, #000000, #311b92)",
      coordinates: { x: 88, y: 82 },
      climate: "Freezing black flames, necrotic cinder, sky darkened by void ash.",
      capital: "The Onyx Sanctum",
      ruler: "Archmage Carrus Ebonflame",
      overview: "A forbidden zone where fiery magic was twisted by shadow incursions. The flames here consume light and heat instead of producing it, burning with an eerie obsidian glow.",
      dangerLevel: "Extreme (Shadow blight, ebonflame wraiths)",
      pointsOfInterest: [
        { name: "The Ebon Spire", type: "Dark Academy", desc: "Carrus Ebonflame's forbidden laboratory where shadowfire pyromancy is taught." },
        { name: "The Abyssal Rift", type: "Planar Gate", desc: "Tear in reality leaking void energy that fuels ebonflame spells." }
      ],
      dmNotes: "Carrus does not seek destruction, but rather seeks to master the void before it inevitably consumes the failing elemental barriers."
    },
    {
      id: "region-crucible",
      name: "The Primordial Crucible (The Great Confluence)",
      domain: "All Elements (The Core Bleed)",
      type: "Heartland",
      color: "#6a1b9a",
      gradient: "linear-gradient(135deg, #4a148c, #ab47bc)",
      coordinates: { x: 50, y: 40 },
      climate: "Dynamic climate that shifts between seasons in hours; prismatic skies.",
      capital: "Crucible City",
      ruler: "The Grand Council of the Covenant",
      overview: "The geographical and magical center of the continent where all four elements converge. A thriving metropolis of diverse hybrid races, merchant leagues, and scholars.",
      dangerLevel: "Low to Moderate (Magical anomalies)",
      pointsOfInterest: [
        { name: "The Plinth of Oathrizar", type: "Monument", desc: "The legendary pedestal where the Covenant of Oathrizar was signed to maintain continental harmony." },
        { name: "The Four-Spire Bazaar", type: "Market", desc: "Vast market where goods from all four elemental corners and bleedlands are traded." }
      ],
      dmNotes: "The Plinth houses the activation key for the continent's elemental stabilization grid."
    }
  ],

  // Key Characters & Dossiers
  characters: [
    {
      id: "char-garrick",
      name: "Garrick Ironbrown Kegnir",
      title: "Thane of Kegnir & Master Brew-Smith",
      species: "Mountain Dwarf",
      classRole: "Fighter / Runic Artisan 5.5e",
      elementalAffinity: "Earth & Hearth-Fire",
      alignment: "Lawful Good",
      homeRegion: "The Iron Crags of Terran",
      bastion: "The Kegnir Iron-Hearth Brewery & Vault",
      quote: "\"Good stone holds up your roof. Good brew holds up your soul. I forge both with equal pride.\"",
      bio: "A legendary figure among the mountain clans, Garrick combines centuries of dwarven craftsmanship with runic fermentation. His legendary brews can bolster warriors before battle or melt toxic elemental poisons. He is a fierce ally of 4N-V1L and frequently trades with the Foregrove.",
      personality: "Jovial yet immovable as granite. Always has an ale ready for friends and a heavy warhammer for oathbreakers.",
      weaponMastery: ["Topple (Warhammer)", "Push (Heavy Shield)"],
      secretsDM: "Garrick possesses one of the seven Runic Keystones required to awaken the Slumbering Earth Titan. He keeps it disguised as the fermentation tap in his private reserve keg.",
      stats5e: {
        str: 18, dex: 12, con: 18, int: 14, wis: 16, cha: 14,
        ac: 19, hp: 124, cr: "CR 8 (Legendary NPC)"
      },
      tacticalAbilities: [
        "Runic Fortification: Allies within 15 ft gain +2 AC and resistance to poison and fire.",
        "Hearth-Fire Quaff: Bonus action to drink a restorative brew, regaining 4d8 HP and ending one condition.",
        "Ground-Shattering Blow: Attack that triggers 5.5e Topple and forces a DC 16 Str save or falls prone with 2d10 bludgeoning."
      ]
    },
    {
      id: "char-4nv1l",
      name: "4N-V1L (The Living Anvil)",
      title: "Sovereign of the Living Forge",
      species: "Primordial Automaton / Warforged Titan",
      classRole: "Artificer / Forge Master 5.5e",
      elementalAffinity: "Earth & Fire (Magma Confluence)",
      alignment: "Neutral Good",
      homeRegion: "The Slagfields & Smoldering Forges",
      bastion: "4N-V1L's Sovereign Crucible",
      quote: "\"Flesh wearies. Stone crumbles. The weld endures.\"",
      bio: "Constructed during the First Age to help shape the elemental aqueducts, 4N-V1L attained full sentience when a shard of a living earth-star merged with its thermal core. Today, 4N-V1L leads the smiths of the Slagfields, crafting legendary masterwork weapons and maintaining peace between the hot-tempered fire nomads and stubborn mountain dwarves.",
      personality: "Methodical, deeply philosophical, speaks with a resonant metallic timbre. Fascinated by biological emotions and mortal poetry.",
      weaponMastery: ["Cleave (Greatsword)", "Graze (Greataxe)", "Sap (Maul)"],
      secretsDM: "4N-V1L is slowly running low on primordial spark. It requires a rare isotope found only in the deepest rift of the Ebonflame Scar or the core of the Sunken Pyre.",
      stats5e: {
        str: 20, dex: 10, con: 20, int: 18, wis: 14, cha: 12,
        ac: 20, hp: 165, cr: "CR 11 (Mythic Construct)"
      },
      tacticalAbilities: [
        "Molten Armor: Melee attackers within 5 ft take 2d8 fire damage on hit.",
        "Masterwork Reforging: Can reforge any broken weapon or armor in 1 action during combat.",
        "Seismic Slam: Recharges 5-6. Emits a 30-ft shockwave of magma: 6d8 fire + 6d8 bludgeoning (DC 17 Dex half)."
      ]
    },
    {
      id: "char-kirrag",
      name: "Kirrag Snow Breaker",
      title: "Warlord of the Permafrost Ridge",
      species: "Goliath / Frost-Kin",
      classRole: "Barbarian (Path of the Glacial Crag) 5.5e",
      elementalAffinity: "Earth & Frost/Water",
      alignment: "Chaotic Good",
      homeRegion: "The Glacial Crags & Permafrost Ridge",
      bastion: "Rime-Stone Fortress",
      quote: "\"The mountain tests you with stone. The winter tests you with cold. I am the test you will not survive.\"",
      bio: "Standing nearly eight feet tall, Kirrag earned the title 'Snow Breaker' when he single-handedly split an advancing avalanche to save his clan. He commands the frost-hardened clans of the high passes, preventing dangerous incursions from planar beasts trapped beneath the ice sheets.",
      personality: "Fierce, honorable, respects raw strength and unyielding conviction. Loves tests of endurance and feast songs.",
      weaponMastery: ["Push (Maul)", "Topple (Halberd)", "Slow (Heavy Pick)"],
      secretsDM: "Kirrag carries a frost-curse from an ancient rime titan. As long as he stays in the cold, he is virtually unkillable, but prolonged exposure to Pyrok's deserts weakens his life force.",
      stats5e: {
        str: 22, dex: 14, con: 20, int: 10, wis: 14, cha: 16,
        ac: 18, hp: 180, cr: "CR 10 (Boss NPC)"
      },
      tacticalAbilities: [
        "Glacial Rage (5.5e Bonus): Gains resistance to all damage except psychic, +4 damage to melee, and cold aura (10 ft, 1d10 cold).",
        "Avalanche Cleave: Hits up to 3 adjacent creatures in a sweeping arc.",
        "Unyielding Permafrost: If reduced to 0 HP, immediately drops to 1 HP instead (3/day)."
      ]
    },
    {
      id: "char-pyrok",
      name: "Pyrok the Pious",
      title: "Grand Inquisitor of the Sunken Pyre",
      species: "Human (Fire-Touched)",
      classRole: "Cleric of the Radiant Pyre / Paladin 5.5e",
      elementalAffinity: "Fire & Radiant Light",
      alignment: "Lawful Neutral / Lawful Zealous",
      homeRegion: "The Caldera of Pyros",
      bastion: "The Sunken Pyre Cathedral",
      quote: "\"Fire does not merely burn—it purifies. It burns away weakness, deceit, and darkness until only divine truth remains.\"",
      bio: "Pyrok is the supreme spiritual leader of the Fire Domain. Believing that all life originated from sacred primal flame, his crusaders patrol the bleeding borders, burning out corruption. While respected for banishing horrors from the dark void, his zealotry puts him at constant political odds with Carrus Ebonflame and the tolerant Monks of the Thousand Tongues.",
      personality: "Impassioned orator, strictly ascetic, unbending in religious law, but protective of the innocent faithful.",
      weaponMastery: ["Vex (Flaming Morningstar)", "Nick (Sacred Scimitar)"],
      secretsDM: "Pyrok suffers from recurring prophetic nightmares of the 'Black Sun'—the exact omen Carrus Ebonflame is studying.",
      stats5e: {
        str: 16, dex: 12, con: 16, int: 12, wis: 20, cha: 18,
        ac: 21, hp: 140, cr: "CR 10 (High Cleric)"
      },
      tacticalAbilities: [
        "Radiant Cinder Aura: Hostiles starting turn within 15 ft take 3d6 radiant/fire damage and cannot benefit from invisibility.",
        "Divine Smite (5.5e Spells): Casts bonus action Radiant Smite dealing 4d8 radiant + blinding effect.",
        "Cleansing Conflagration: Channel Divinity to cure all conditions on allies within 30 ft while burning enemies."
      ]
    },
    {
      id: "char-jensen",
      name: "Jensen Lion Foregrove",
      title: "Lord Warden of the Verdant Roots",
      species: "Half-Elf / Wood Kin",
      classRole: "Ranger (Fey-Warden) / Druid 5.5e",
      elementalAffinity: "Earth & Primal Life/Water",
      alignment: "Neutral Good",
      homeRegion: "The Foregrove Canopy & Primal Roots",
      bastion: "Foregrove Sanctuary",
      quote: "\"Listen closely to the canopy. The roots tell of an imbalance long before the storm arrives.\"",
      bio: "Descended from the ancient Lionguard nobility, Jensen chose the wild woods over palace courtyards. He commands a network of rangers, druids, and awakened beast companions who patrol the green bleedlands, ensuring civilization does not strip the primordial earth of its life-force.",
      personality: "Calm, observant, speaks softly with unwavering authority. Accompanied by his ancient celestial lynx, 'Sun-Paw'.",
      weaponMastery: ["Slow (Longbow)", "Vex (Twin Sylvan Shortswords)", "Nick (Hunting Dagger)"],
      secretsDM: "Jensen holds an ancient pact with the Green Dragon that sleeps beneath the Foregrove's deepest roots. They share an uneasy truce to defend the realm from void incursions.",
      stats5e: {
        str: 14, dex: 20, con: 16, int: 14, wis: 18, cha: 16,
        ac: 18, hp: 130, cr: "CR 9 (Master Ranger)"
      },
      tacticalAbilities: [
        "Hunter's Mark (5.5e Free Concentration): Extra 1d6 force damage per hit with free shifting.",
        "Ironwood Volley: Fires a cone of thorn-arrows dealing 5d8 piercing + DC 16 Restrained.",
        "Forest Camouflage: Can vanish as a bonus action, becoming invisible until next attack."
      ]
    },
    {
      id: "char-carrus",
      name: "Carrus Ebonflame",
      title: "Arch-Mage of the Obsidian Rift",
      species: "Tiefling (Shadow-Veined)",
      classRole: "Wizard (School of Nether-Pyromancy) 5.5e",
      elementalAffinity: "Fire & Shadow/Void",
      alignment: "Chaotic Neutral",
      homeRegion: "The Ebonflame Scar & Void Rifts",
      bastion: "The Onyx Sanctum",
      quote: "\"You fear the dark fire because it does not warm you. But in the frozen dark of the cosmos, only cold fire can burn through nothingness.\"",
      bio: "A brilliant and controversial scholar cast out of traditional elemental academies for experimenting with shadow-infused pyromancy. Carrus discovered that by blending pure fire with void ether, one can craft spells that pierce even elemental immunities.",
      personality: "Pragmatic, sarcastic, intensely inquisitive. Unbothered by orthodox morality, but harbors no desire to see the world destroyed.",
      weaponMastery: ["Sap (Quarterstaff of Black Ash)"],
      secretsDM: "Carrus is secretly working on an elemental ward engine to seal the tearing rift in the continent. He needs components that Pyrok controls, which prevents direct cooperation.",
      stats5e: {
        str: 10, dex: 16, con: 16, int: 22, wis: 14, cha: 16,
        ac: 17, hp: 115, cr: "CR 12 (Archmage)"
      },
      tacticalAbilities: [
        "Ebonflame Cascade: 8d6 necrotic + 8d6 fire in a 20-ft radius (ignores fire resistance).",
        "Shadow Slip: Teleport 30 ft as a reaction upon taking damage, leaving an illusory cinder decoy.",
        "Void Singularity: Summons a miniature black hole pulling all targets within 25 ft and dealing 4d10 force damage."
      ]
    },
    {
      id: "char-oathrizar",
      name: "Oathrizar (The Bound Sovereign)",
      title: "The Living Covenant & Primal Titan Greatsword",
      species: "Sentient Artifact / Titan Essence",
      classRole: "Cosmic Artifact & Protector Order",
      elementalAffinity: "All 4 Elements in Harmony",
      alignment: "True Neutral",
      homeRegion: "The Primordial Crucible",
      bastion: "The Plinth of Oathrizar",
      quote: "\"When the elements war, the world bleeds. When they unite, the world ascends.\"",
      bio: "Oathrizar is both the legendary sentient Greatsword forged from all four elemental nexuses, and the ancient order of knights dedicated to wielding it in times of continental collapse. Whoever is chosen by Oathrizar gains mastery over all elemental bleed arts.",
      personality: "Speaks telepathically with the harmonized voices of fire, stone, wave, and wind. Judges candidates strictly on balance.",
      weaponMastery: ["Cleave", "Push", "Topple", "Vex", "Graze", "Sap", "Nick", "Slow (All Masteries Active)"],
      secretsDM: "Oathrizar is the key to sealing or unleashing the Primordial World-Core. If shattered, the four continents will drift apart permanently.",
      stats5e: {
        str: 24, dex: 18, con: 22, int: 20, wis: 20, cha: 22,
        ac: 22, hp: 300, cr: "Artifact / CR 18 Avatar"
      },
      tacticalAbilities: [
        "Prismatic Blade: Can switch damage type freely between Fire, Cold, Lightning, Thunder, and Bludgeoning.",
        "Elemental Quake: Forces all hostiles in 60 ft to succeed on DC 20 saves or be knocked prone, pushed 20 ft, and deafened.",
        "Aegis of the Four Winds: Grants user and 4 allies within 30 ft immunity to all elemental damage for 1 round (1/day)."
      ]
    },
    {
      id: "char-vaelen",
      name: "High Abbot Vaelen the Multivox",
      title: "Grand Keeper of the Thousand Tongues",
      species: "Elf (Wind-Whisperer)",
      classRole: "Monk (Way of the Primordial Word) 5.5e",
      elementalAffinity: "Air, Water & Primordial Sound",
      alignment: "Lawful Good",
      homeRegion: "The Mist Spires & Cloud Nexus",
      bastion: "Monastery of a Thousand Tongues",
      quote: "\"Every stone hums Terran; every ember crackles Ignan. To listen without fear is to master all creation.\"",
      bio: "Leader of the Monastery of a Thousand Tongues. Vaelen has spent over three centuries cataloging the acoustic dialects of the elemental planes. He can speak the raw syllables of creation, altering reality with vocal vibration alone.",
      personality: "Serene, deeply patient, speaks in multiple harmonic tones simultaneously.",
      weaponMastery: ["Slow (Quarterstaff)", "Nick (Kama)"],
      secretsDM: "Vaelen is deaf to normal mortal speech, but hears the thoughts and vibrations of everything around him with absolute precision.",
      stats5e: {
        str: 12, dex: 20, con: 16, int: 18, wis: 22, cha: 16,
        ac: 21, hp: 135, cr: "CR 11 (Grandmaster Monk)"
      },
      tacticalAbilities: [
        "Stunning Word (5.5e Monk): Can spend Focus to stun targets using vocal harmonics (DC 18 Wis).",
        "Elemental Resonant Stride: Can fly 60 ft per round on acoustic updrafts without provoking opportunity attacks.",
        "Thousand Tongues Chant: Creates a 40-ft silence/counterspell aura that redirects enemy elemental spells."
      ]
    }
  ],

  // Factions & Organizations
  factions: [
    {
      id: "fac-thousand-tongues",
      name: "Monastery of a Thousand Tongues",
      motto: "\"In the Harmony of All Tongues, Truth Resonates.\"",
      leader: "High Abbot Vaelen the Multivox",
      headquarters: "The Mist Spire Sanctuary",
      alignment: "Lawful Good",
      influence: 88,
      playerStanding: 2, // -5 (Hated) to +5 (Exalted)
      overview: "An ancient monastic order and scholarly sanctuary dedicated to preserving primordial languages, elemental acoustics, and maintaining political neutrality across the bleeding realms.",
      allies: ["The Foregrove Wardens", "Kegnir Iron-Clans", "The Covenant of Oathrizar"],
      rivals: ["The Ebonflame Cabal"],
      perks: [
        "Standing +2: Access to the Primordial Archive and translation of ancient runic glyphs.",
        "Standing +4: Training in the Way of the Primordial Word (exclusive 5.5e feat / technique)."
      ],
      dmBonusesAndAfflictions: {
        bonuses: [
          { threshold: "+1 to +2", name: "Wind-Whisper Network", effect: "Monks share local rumors and regional gossip; Advantage on History and Insight checks regarding ancient lore and languages." },
          { threshold: "+3 to +5", name: "Sanctuary of Silence", effect: "Free safe lodging at any mist retreat; +1 bonus on Persuasion checks when interacting with scholars, sages, and diplomats." }
        ],
        afflictions: [
          { threshold: "-1 to -2", name: "The Vow of Silence", effect: "Monks refuse to speak with the party, communicating only in cold gestures; Disadvantage on Persuasion checks in the Mist Spires." },
          { threshold: "-3 to -5", name: "Acoustic Disfavor", effect: "Monks ring warning bells when the party enters settlements, putting local watchmen on alert and making subtle urban stealth tricky (+2 to NPC passive perception)." }
        ]
      },
      dmSecrets: "The monastery is guarding a subterranean bell chamber capable of dampening any continental seismic event."
    },
    {
      id: "fac-kegnir",
      name: "The Kegnir Iron & Forge Guild",
      motto: "\"Pounded in Fire, Quenched in Honor.\"",
      leader: "Garrick Ironbrown Kegnir & 4N-V1L",
      headquarters: "Kegnir Deep-Hold & The Slag Foundry",
      alignment: "Lawful Good",
      influence: 92,
      playerStanding: 3,
      overview: "A powerful alliance between mountain dwarves, master artificers, and construct smiths. They control major mining veins, high-end 5.5e weapon crafting, and the continent's finest brew supply.",
      allies: ["Frost-Breaker Clans", "The Foregrove Wardens", "Monastery of a Thousand Tongues"],
      rivals: ["Pyros Radiant Conclave (Tense Trade)"],
      perks: [
        "Standing +1: 20% discount on masterwork weapons and Bastion construction materials.",
        "Standing +3: Ability to commission 5.5e Elemental Infused Weapons with custom masteries."
      ],
      dmBonusesAndAfflictions: {
        bonuses: [
          { threshold: "+1 to +2", name: "Hearth-Side Hospitality", effect: "Free pints of Garrick's Hearth-Ale at any dwarven tavern; Advantage on Charisma checks with craftsmen and miners." },
          { threshold: "+3 to +5", name: "Guild VIP & Forge Access", effect: "15% discount on all metal goods and mundane repairs; priority commissioning for custom weapon forging." }
        ],
        afflictions: [
          { threshold: "-1 to -2", name: "Watered Down Ale", effect: "Dwarven taverns charge double for drinks, and blacksmiths grumble, pushing party gear repairs to the back of the queue (takes 1 extra day)." },
          { threshold: "-3 to -5", name: "The Heavy Gavel", effect: "Guild bouncers and dwarven merchants refuse casual service and give cold stares; Disadvantage on Persuasion checks with dwarven clans." }
        ]
      },
      dmSecrets: "They have a secret underground rail network powered by geothermal steam that connects all major dwarven outposts."
    },
    {
      id: "fac-frost-breaker",
      name: "The Frost-Breaker Clans",
      motto: "\"Unbroken as the Ice, Strong as the Stone.\"",
      leader: "Warlord Kirrag Snow Breaker",
      headquarters: "Frost-Breaker Hold",
      alignment: "Chaotic Good",
      influence: 75,
      playerStanding: 1,
      overview: "A fierce federation of goliaths, frost barbarians, and rime rangers guarding the northern permafrost ridges and frozen mountain passes.",
      allies: ["The Kegnir Iron Guild"],
      rivals: ["Pyros Inquisitors", "Ebonflame Cultists"],
      perks: [
        "Standing +2: Cold weather survival expertise; immunity to extreme frost exhaustion.",
        "Standing +4: Kirrag can be summoned to assist in a major boss battle with his ice warband."
      ],
      dmBonusesAndAfflictions: {
        bonuses: [
          { threshold: "+1 to +2", name: "Fireside Kinship", effect: "Warm welcome in northern yurts and hunter camps; hunters share trail rations and give +1 to Survival checks navigating snow terrain." },
          { threshold: "+3 to +5", name: "Kirrag's Mark of Respect", effect: "Goliaths and frost warriors treat the party as proven peers; Advantage on Intimidation checks against bandits and raiders in northern lands." }
        ],
        afflictions: [
          { threshold: "-1 to -2", name: "The Cold Stare", effect: "Northern scouts refuse to share fires or point out mountain shortcuts, making overland mountain travel take 25% longer." },
          { threshold: "-3 to -5", name: "Clan Challenger Brawls", effect: "Hot-headed frost barbarians frequently challenge party members to harmless tavern brawls, wrestling matches, or drinking contests before answering questions." }
        ]
      },
      dmSecrets: "The clans guard an ancient frozen leviathan whose blood can be used to forge near-invulnerable cryo-steel."
    },
    {
      id: "fac-radiant-pyre",
      name: "The Radiant Pyre Inquisitors",
      motto: "\"Purged in Holy Fire, Reborn in Light.\"",
      leader: "High Inquisitor Pyrok the Pious",
      headquarters: "The Sunken Pyre",
      alignment: "Lawful Neutral",
      influence: 84,
      playerStanding: 0,
      overview: "A zealous religious army enforcing sacred fire laws and eradicating shadow, void, and necrotic magic throughout the continent.",
      allies: ["Zephyr Ascendancy"],
      rivals: ["The Ebonflame Cabal (Bitter War)", "The Foregrove Wardens (Ideological Tension)"],
      perks: [
        "Standing +2: Sanctuary in any Radiant Pyre chapel; free divine healing.",
        "Standing +4: Authorization to wield Sacred Flame relics in inquisitorial investigations."
      ],
      dmBonusesAndAfflictions: {
        bonuses: [
          { threshold: "+1 to +2", name: "Clerical Favor", effect: "Radiant priests provide free herbal teas, minor wound dressing, and +1 on Religion checks; well-received by devout temple-goers." },
          { threshold: "+3 to +5", name: "Inquisitorial Writ of Passage", effect: "City gate guards wave the party through without cargo inspection; Advantage on Charisma checks when speaking with city watchmen." }
        ],
        afflictions: [
          { threshold: "-1 to -2", name: "Suspicious Inquest", effect: "Inquisitor acolytes ask intrusive questions about party religious affiliations, causing minor 10-minute delays at gate checkpoints." },
          { threshold: "-3 to -5", name: "Branded as Wayward", effect: "Clergy refuse blessings and preach cautionary gossip about the party, giving Disadvantage on Deception checks when dealing with city authorities." }
        ]
      },
      dmSecrets: "Pyrok has secretly placed inquisitor sleeper cells in Crucible City to monitor the council."
    },
    {
      id: "fac-foregrove-wardens",
      name: "The Foregrove Wardens",
      motto: "\"Rooted in Earth, Branching into Eternity.\"",
      leader: "Lord Jensen Lion Foregrove",
      headquarters: "The Lion Heartwood",
      alignment: "Neutral Good",
      influence: 80,
      playerStanding: 2,
      overview: "Guardians of the primal wildlands and bleeding forest ecosystems. They protect ancient fauna, sacred springs, and prevent over-industrialization by the smith guilds.",
      allies: ["Monastery of a Thousand Tongues", "Kegnir Iron-Clans"],
      rivals: ["The Radiant Pyre Inquisitors", "Slagfield Poachers"],
      perks: [
        "Standing +2: Beast messenger network across the entire continent.",
        "Standing +4: Summoning of ancient Sylvan Treants to defend player Bastions."
      ],
      dmBonusesAndAfflictions: {
        bonuses: [
          { threshold: "+1 to +2", name: "Canopy Hospitality", effect: "Sylvan rangers provide secure tree-canopy campsites; Advantage on Animal Handling checks with woodland beasts." },
          { threshold: "+3 to +5", name: "Friend of the Green Roots", effect: "Druids share secret foraging locations for rare medicinal herbs; +1 on Nature and Survival checks in woodland biomes." }
        ],
        afflictions: [
          { threshold: "-1 to -2", name: "Cold Forest Greeting", effect: "Woodland scouts refuse to point out safe river crossings; forage yield is minimal and bland." },
          { threshold: "-3 to -5", name: "Woodland Nuisance", effect: "Mischievous forest critters (badgers, squirrels, ravens) constantly pester the party's camp, untying boots and stealing shiny trinkets or trail rations." }
        ]
      },
      dmSecrets: "The Heartwood tree has a direct root connection to the Feywild."
    },
    {
      id: "fac-ebonflame",
      name: "The Ebonflame Cabal",
      motto: "\"In the Black Ash, We Find Dominion.\"",
      leader: "Archmage Carrus Ebonflame",
      headquarters: "The Onyx Sanctum",
      alignment: "Chaotic Neutral",
      influence: 68,
      playerStanding: -1,
      overview: "An underground syndicate of pyromancers, shadow warlocks, and outcasts experimenting with void-cinder magic on the edge of the realm.",
      allies: [],
      rivals: ["The Radiant Pyre Inquisitors", "The Frost-Breakers"],
      perks: [
        "Standing +2: Access to forbidden necrotic-fire spell scrolls.",
        "Standing +4: Ability to enchant weapons with the 'Ebonflame Ignition' property."
      ],
      dmBonusesAndAfflictions: {
        bonuses: [
          { threshold: "+1 to +2", name: "Shadow Market Welcome", effect: "Smugglers and underground arcanists greet the party cordially; Advantage on Investigation checks in taverns and criminal dens." },
          { threshold: "+3 to +5", name: "Nether-Whisper Intelligence", effect: "Cabal informants discreetly share juicy political blackmail and secrets regarding rival nobles and merchant guilds." }
        ],
        afflictions: [
          { threshold: "-1 to -2", name: "Dark Gossip", effect: "Cabal scouts spread minor rumors that the party brings bad luck; cautious innkeepers require an upfront 5 GP cleaning deposit." },
          { threshold: "-3 to -5", name: "Underworld Cold Shoulder", effect: "Black market fences close their doors when the party approaches; shadow contacts intentionally give unreliable tips or charge double fees for information." }
        ]
      },
      dmSecrets: "They are the only faction that understands the coming Void Breach is not caused by them, but by the weakening of the continental anchors."
    },
    {
      id: "fac-oathrizar-covenant",
      name: "The Knights of Oathrizar",
      motto: "\"Four Elements, One Unbroken Oath.\"",
      leader: "The Grand Marshal of the Plinth",
      headquarters: "Crucible City",
      alignment: "True Neutral",
      influence: 95,
      playerStanding: 1,
      overview: "An elite pan-elemental order sworn to maintain peace between the four domains and safeguard the central Crucible from civil war.",
      allies: ["All Recognized Factions"],
      rivals: ["Anarchists & Void Blighters"],
      perks: [
        "Standing +3: Continental diplomatic immunity in all neutral zones.",
        "Standing +5: The party is nominated as Champions of the Plinth."
      ],
      dmBonusesAndAfflictions: {
        bonuses: [
          { threshold: "+1 to +2", name: "Covenant Courtesy", effect: "Settlement guards and town watchmen treat the party politely; +1 on Persuasion checks when speaking with civic bureaucrats." },
          { threshold: "+3 to +5", name: "Plinth Inner Circle Access", effect: "Invited to upper-tier council debates and grand municipal banquets in Crucible City; access to the Private Archives of the Covenant." }
        ],
        afflictions: [
          { threshold: "-1 to -2", name: "Bureaucratic Red Tape", effect: "Town clerks and municipal scribes demand extra stamps and paperwork from the party, causing annoying delays entering municipal halls." },
          { threshold: "-3 to -5", name: "Watchful Guard Escort", effect: "City marshals assign a stern junior guard to shadow the party in public markets, taking notes on their purchases and conversations." }
        ]
      },
      dmSecrets: "They hold the spare scabbard of Oathrizar, which can resurrect a fallen wielder once per century."
    }
  ],

  // 5.5e Bastions & Player Strongholds
  bastions: [
    {
      id: "bastion-kegnir",
      name: "The Kegnir Iron-Hearth Brewery & Vault",
      owner: "Garrick Ironbrown Kegnir",
      location: "The Iron Crags of Terran",
      level: 9,
      orderPoints: 240,
      defenseRating: 18,
      specialFacilities: [
        { name: "Grand Brewery", type: "Crafting / Buff", benefit: "Produces 50 kegs of Hearth-Ale per Bastion turn. Grants +10 Temp HP and poison immunity for 24h to troops." },
        { name: "Runic Smithy", type: "Crafting / Weapons", benefit: "Can craft +2 Runic weapons and armor; reduces crafting time by 50%." },
        { name: "Subterranean Barracks", type: "Defense", benefit: "Houses 60 Dwarven Shield-Bearers. Defends against siege attacks." },
        { name: "Vault of the Earth-Mother", type: "Treasury", benefit: "Generates 250 GP profit per Bastion turn via mineral trade." }
      ],
      hirelings: [
        { name: "Durnan Stout-Barrel", role: "Master Brewer", loyalty: 95 },
        { name: "Bari Stone-Carver", role: "Rune Scribe", loyalty: 90 },
        { name: "Captain Horgar", role: "Garrison Commander", loyalty: 88 }
      ]
    },
    {
      id: "bastion-anvil",
      name: "4N-V1L's Sovereign Crucible",
      owner: "4N-V1L",
      location: "The Slagfields & Smoldering Forges",
      level: 11,
      orderPoints: 310,
      defenseRating: 20,
      specialFacilities: [
        { name: "Magma Forge Nexus", type: "Master Crafting", benefit: "Enables crafting of Primordial & Clockwork Golems and Elemental Infused Gear." },
        { name: "Automaton Repair Bay", type: "Maintenance", benefit: "Repairs and upgrades construct companions during long rests." },
        { name: "Geothermal Power Core", type: "Utility", benefit: "Powers perimeter electric fences and auto-turrets (DC 17 Dex, 4d10 lightning)." },
        { name: "Arcane Library of Alloys", type: "Research", benefit: "Unlocks experimental alloy blueprints for weapon masteries." }
      ],
      hirelings: [
        { name: "Unit-09 'Sparky'", role: "Assistant Smith Golem", loyalty: 100 },
        { name: "Kaelen Brass-Vein", role: "Lead Metallurgist", loyalty: 85 }
      ]
    },
    {
      id: "bastion-foregrove",
      name: "Foregrove Sanctuary",
      owner: "Jensen Lion Foregrove",
      location: "The Foregrove Canopy & Primal Roots",
      level: 8,
      orderPoints: 210,
      defenseRating: 16,
      specialFacilities: [
        { name: "Canopy Menagerie", type: "Beast Training", benefit: "Trains flying and hunting beasts for party scouts." },
        { name: "Amber Healing Garden", type: "Alchemy", benefit: "Harvests rare reagents that produce 5 Supreme Healing Potions per turn." },
        { name: "Living Root Walls", type: "Defense", benefit: "Ensnaring root traps around perimeter; grants half cover to all defenders." },
        { name: "Teleportation Tree", type: "Fast Travel", benefit: "Connects to other Great Trees across the continent." }
      ],
      hirelings: [
        { name: "Sun-Paw", role: "Celestial Lynx Companion", loyalty: 100 },
        { name: "Sister Elara", role: "Herbalist Druid", loyalty: 92 }
      ]
    },
    {
      id: "bastion-thousand-tongues",
      name: "Sanctuary of the Thousand Tongues",
      owner: "High Abbot Vaelen",
      location: "The Mist Spires",
      level: 10,
      orderPoints: 280,
      defenseRating: 17,
      specialFacilities: [
        { name: "Hall of Primordial Echoes", type: "Acoustic Arcana", benefit: "Monks can cast Clairvoyance across any bleeding region once per week." },
        { name: "Scriptorium of Ancient Dialects", type: "Lore & Research", benefit: "Translates forgotten grimoires, spells, and planar messages." },
        { name: "Sky Meditation Gardens", type: "Rest & Focus", benefit: "Grants party +1 to all saving throws for 7 days after a long rest." },
        { name: "Bell Tower of Calamity", type: "Early Warning", benefit: "Detects planar rifts and army movements within 200 miles." }
      ],
      hirelings: [
        { name: "Brother Koru", role: "Head Scribe", loyalty: 94 },
        { name: "Monk Jin", role: "Wind-Dancer Sentinel", loyalty: 90 }
      ]
    }
  ],

  // Monastery of a Thousand Tongues Primordial Lexicon
  primordialLexicon: [
    {
      phrase: "Ignis Vorash (Ignan)",
      meaning: "May the sacred fire burn away your impurities.",
      dialect: "Ignan (Fire)",
      pronunciation: "EEG-nees voh-RASH",
      usage: "Used by Pyrok's clergy and fire-smiths as both a blessing and a warning.",
      symbol: "*"
    },
    {
      phrase: "Terran Khel-Durn (Terran)",
      meaning: "Stone endures when flesh is dust.",
      dialect: "Terran (Earth)",
      pronunciation: "TEH-ran khel-DOORN",
      usage: "Traditional greeting among Garrick's clan and deep mountain miners.",
      symbol: "*"
    },
    {
      phrase: "Aquas Shae-Lirin (Aquan)",
      meaning: "Tides yield to no emperor.",
      dialect: "Aquan (Water)",
      pronunciation: "AH-kwahs shay-LEER-een",
      usage: "Proverb of the coastal navigators and mist monks.",
      symbol: "*"
    },
    {
      phrase: "Auran Vael-Zephyr (Auran)",
      meaning: "Listen to what the wind carries before speaking.",
      dialect: "Auran (Air)",
      pronunciation: "OW-rahn vay-el ZEF-eer",
      usage: "Motto of the Monastery of a Thousand Tongues.",
      symbol: "*"
    },
    {
      phrase: "Oath-Rizar Kar-Nath (Primordial Confluence)",
      meaning: "By the four pillars, our covenant shall not break.",
      dialect: "Confluence Primordial",
      pronunciation: "OHTH-ree-zar kar-NAHTH",
      usage: "The binding oath recited when forging alliances across bleeding borders.",
      symbol: "*"
    },
    {
      phrase: "Neth-Pyros Umbra (Ebonflame Dialect)",
      meaning: "Shadow feeds the flame that light cannot quench.",
      dialect: "Ebonflame / Void-Ignan",
      pronunciation: "NETH-pee-rohs OOM-brah",
      usage: "Incantation used by Carrus Ebonflame to summon dark fire.",
      symbol: "*"
    }
  ],

  // 5.5e Weapon Masteries & Elemental Infusions
  weaponMasteries: [
    {
      name: "Cleave",
      category: "Melee",
      effect: "If you hit a creature with a melee attack roll, you can make a melee attack roll with the same weapon against a second creature within 5 ft of the first that is also within your reach.",
      elementalSynergy: "Magma-Forged Cleave (Slagfield Craft): Hits the second target with a burst of 1d6 fire splash.",
      signatureUsers: ["4N-V1L", "Warlord Kirrag"]
    },
    {
      name: "Push",
      category: "Melee & Ranged",
      effect: "If you hit a creature with this weapon, you can push the creature up to 10 feet straight away from yourself if it is Large or smaller.",
      elementalSynergy: "Garrick's Tectonic Shunt (Terran Craft): Pushes the target 15 ft and knocks them prone on stone surfaces.",
      signatureUsers: ["Garrick Ironbrown Kegnir", "Kirrag Snow Breaker"]
    },
    {
      name: "Topple",
      category: "Melee",
      effect: "If you hit a creature with this weapon, you can force the creature to make a Constitution saving throw (DC 8 + Str mod + PB) or fall Prone.",
      elementalSynergy: "Permafrost Rime-Topple: If the creature fails by 5 or more, their movement speed becomes 0 until end of next turn.",
      signatureUsers: ["Garrick Ironbrown Kegnir", "Kirrag Snow Breaker"]
    },
    {
      name: "Vex",
      category: "Melee & Ranged",
      effect: "If you hit a creature with this weapon and deal damage to it, you have Advantage on your next attack roll against that creature before the end of your next turn.",
      elementalSynergy: "Solar Flare Vex (Pyrok's Blessing): The target is illuminated in sacred light, denying cover against your allies.",
      signatureUsers: ["Pyrok the Pious", "Jensen Lion Foregrove"]
    },
    {
      name: "Sap",
      category: "Melee",
      effect: "If you hit a creature with this weapon, that creature has Disadvantage on its next attack roll before the start of your next turn.",
      elementalSynergy: "Ebonflame Leech (Carrus's Infusion): Saps strength while transferring 1d4 temporary HP to the attacker.",
      signatureUsers: ["4N-V1L", "Carrus Ebonflame"]
    },
    {
      name: "Slow",
      category: "Melee & Ranged",
      effect: "If you hit a creature and deal damage, you can reduce its Speed by 10 feet until the start of your next turn.",
      elementalSynergy: "Thorn-Snare Slow (Jensen's Craft): Roots lash out; flying creatures lose 20 ft of fly speed.",
      signatureUsers: ["Jensen Lion Foregrove", "High Abbot Vaelen"]
    },
    {
      name: "Nick",
      category: "Light Weapons",
      effect: "When you make the extra attack of the Light weapon property, you can make it as part of the Attack action instead of as a Bonus Action.",
      elementalSynergy: "Zephyr Gale-Nick: Allows a free 5-foot step without provoking opportunity attacks.",
      signatureUsers: ["Jensen Lion Foregrove", "Pyrok the Pious"]
    },
    {
      name: "Graze",
      category: "Heavy Melee",
      effect: "If your attack roll misses a creature, you still deal damage to that creature equal to the ability modifier you used to make the attack roll.",
      elementalSynergy: "4N-V1L's Inevitable Impact: Deals bludgeoning damage plus 2 fire damage even on a complete miss.",
      signatureUsers: ["4N-V1L", "Kirrag Snow Breaker"]
    }
  ],

  // World Timeline & Eras
  timeline: [
    {
      era: "First Age: The Shattering",
      year: "1 AFC",
      title: "The Great Elemental Cleaving",
      desc: "The ancient continent was struck by a falling celestial star. The four elemental titans clashed, splitting the land into distinct elemental quadrants.",
      keyFigures: ["The Four Primordial Titans", "Ancient Forebears"]
    },
    {
      era: "First Age",
      year: "120 AFC",
      title: "The Forging of 4N-V1L",
      desc: "Master dwarven and gnomish geomancers forge 4N-V1L in the deep magma flues to regulate tectonic fault lines.",
      keyFigures: ["4N-V1L", "Early Kegnir Scribes"]
    },
    {
      era: "Second Age: The Age of Bleed",
      year: "340 AFC",
      title: "The Rise of the Bleedlands",
      desc: "Elemental borders begin to soften and bleed into one another, creating diverse hybrid ecosystems, biomes, and unique sub-races.",
      keyFigures: ["Founders of the Monastery of a Thousand Tongues"]
    },
    {
      era: "Second Age",
      year: "510 AFC",
      title: "The Covenant of Oathrizar",
      desc: "Following the bloody War of the Ash Plains, all major lords sign the Covenant of Oathrizar upon the Plinth in Crucible City.",
      keyFigures: ["The First Knight of Oathrizar", "Kegnir Ancestors", "Sunken Pyre Patriarchs"]
    },
    {
      era: "Third Age: Era of the Fractured Confluence",
      year: "790 AFC",
      title: "Kirrag's Snow-Break",
      desc: "Warlord Kirrag single-handedly cleaves the Great Glacier, routing an invading army of shadow-frost demons and saving the mountain holds.",
      keyFigures: ["Kirrag Snow Breaker", "Garrick Ironbrown Kegnir"]
    },
    {
      era: "Third Age (Current)",
      year: "835 AFC",
      title: "The Discovery of the Ebonflame Rift",
      desc: "Carrus Ebonflame discovers the void tear in the south-east wastes, beginning the controversial study of shadow-fire.",
      keyFigures: ["Carrus Ebonflame", "Pyrok the Pious"]
    },
    {
      era: "Third Age (Current)",
      year: "842 AFC (Present Day)",
      title: "The Tremors of the Confluence",
      desc: "The elemental borders begin bleeding at an accelerated rate, causing volatile new storms and planar rifts.",
      keyFigures: ["Garrick", "4N-V1L", "Kirrag", "Pyrok", "Jensen", "Carrus", "Vaelen"]
    }
  ],

  // Quest Hooks & Rumors Mill
  rumors: [
    {
      id: "rumor-1",
      title: "The Stolen Kegnir Reserve",
      source: "Tavern in Slagfield Outpost",
      rumorText: "A caravan carrying Garrick Kegnir's legendary Runic Fire-Mead was ambushed by shadow-fiends near the Ebonflame border.",
      veracity: "True",
      dmHook: "The raiders weren't fiends—they were rogue disciples of Carrus looking for high-potency yeast to stabilize void rifts.",
      reward: "750 GP + 1 Keg of Hearth-Ale + Faction Rep (+2 Kegnir)",
      status: "Available"
    },
    {
      id: "rumor-2",
      title: "4N-V1L's Core Murmurs",
      source: "Foundry Apprentice in Crucible City",
      rumorText: "They say 4N-V1L has been standing motionless at the midnight hour, reciting ancient prophecies in a tongue no one understands.",
      veracity: "Half-Truth",
      dmHook: "4N-V1L's core is picking up seismic harmonic broadcasts from the Monastery of a Thousand Tongues.",
      reward: "Ancient Blueprint + Artificer Tool Upgrades",
      status: "Available"
    },
    {
      id: "rumor-3",
      title: "Kirrag's Challenge of the Crags",
      source: "Notice Board in Frost-Breaker Hold",
      rumorText: "Warlord Kirrag offers a bag of uncut glacial gems and a masterwork rime-halberd to any warrior who can best him in three rounds of wrestling.",
      veracity: "True",
      dmHook: "Kirrag is actually testing warriors to find worthy scouts for an expedition into the frozen underworld.",
      reward: "Masterwork Rime-Halberd (5.5e Topple) + 500 GP",
      status: "Available"
    },
    {
      id: "rumor-4",
      title: "The Witch of the Foregrove",
      source: "Radiant Pyre Missionary",
      rumorText: "Jensen Foregrove is harboring a coven of dark witches who are poisoning the tree roots with void rot.",
      veracity: "Blatant Lie",
      dmHook: "Pyrok's overzealous subordinates are fabricating lies to justify an inquisitorial purge of the natural druid groves.",
      reward: "Exposure of Corrupt Inquisitor + Foregrove Boon",
      status: "Available"
    },
    {
      id: "rumor-5",
      title: "The Awakening of Oathrizar",
      source: "Prophesied by High Abbot Vaelen",
      rumorText: "The greatsword Oathrizar has begun to glow with an all-color luminescence. The sword seeks a mortal champion before the next solar eclipse.",
      veracity: "True",
      dmHook: "The party must travel to all four elemental bleed sanctuaries to gather attunement shards before the sword can be safely drawn.",
      reward: "Attunement to Oathrizar + Epic Boon",
      status: "Available"
    }
  ],

  // Active Player Characters & Party Roster
  partySettings: {
    partyName: "The Bleedland Wayfarers",
    partyGold: 340,
    partyLevel: 5,
    sharedBag: "Bag of Holding (500 lbs capacity): 3x Potion of Greater Healing, 2x Rations of Hearth-Bread, 1x Runic Compass of the Confluence, 50 ft Silk Rope, Cartographer's Tools."
  },

  partyCharacters: [
    {
      id: "pc-1",
      name: "Theron Storm-Breaker",
      playerName: "Alex",
      level: 5,
      species: "Goliath (Frost-Kin)",
      classRole: "Barbarian (Path of the Berserker 5.5e)",
      alignment: "Chaotic Good",
      avatar: "TH",
      hpCurrent: 58,
      hpMax: 58,
      tempHp: 0,
      ac: 16,
      speed: "35 ft",
      initiativeMod: "+2",
      passivePerception: 13,
      passiveInsight: 11,
      stats: { str: 18, dex: 14, con: 16, int: 10, wis: 12, cha: 10 },
      weaponMasteries: ["Push (Greataxe)", "Topple (Warhammer)"],
      entryPoint: {
        regionId: "region-glacial-crags",
        regionName: "The Glacial Crags of Permafrost",
        locationName: "Frost-Breaker Foothills Pass",
        entryBackstory: "Descended from the jagged northern crags after surviving a brutal glacial blizzard with his clan.",
        dmHook: "Theron carries a frost-runed bone dagger given by Kirrag that glows cold blue whenever void tears manifest."
      },
      personalityTraits: "I fear no blizzard or beast, but the convoluted etiquette of city politics makes my head spin.",
      ideals: "Strength is a gift meant to shelter those who cannot fight for themselves.",
      bonds: "My warband was scattered in an avalanche; I will scour every bleedland to find my surviving kin.",
      flaws: "I leap headfirst into combat before hearing the full strategic plan.",
      inventory: "Greataxe +1, Heavy Wolf-Fur Cloak, Explorer's Pack, Horn of Valhalla (Silver), 45 GP",
      conditions: [],
      classResources: { label: "Rages", current: 3, max: 3 },
      dmSecrets: "Theron's ancestor was one of the legendary Titansmiths. His bone dagger is an ancient key that unlocks a subterranean cryo-vault.",
      currentSituation: {
        locationName: "Frost-Breaker Foothills Pass",
        regionId: "region-glacial-crags",
        regionName: "The Glacial Crags of Permafrost",
        climate: "Frigid sub-zero winds with howling blizzard gusts",
        dangerLevel: "High (Permafrost Beasts & Frost Trolls)",
        statusNote: "Camped in a sheltered rime-cave. Watch rotations set; 4 days of hearth-bread rations remaining.",
        lastUpdatedDay: "Day 2"
      }
    },
    {
      id: "pc-2",
      name: "Lyra Dawnbloom",
      playerName: "Sam",
      level: 5,
      species: "Sun Elf (Foregrove Kin)",
      classRole: "Cleric (Life Domain / 5.5e)",
      alignment: "Neutral Good",
      avatar: "LY",
      hpCurrent: 38,
      hpMax: 38,
      tempHp: 0,
      ac: 18,
      speed: "30 ft",
      initiativeMod: "+1",
      passivePerception: 16,
      passiveInsight: 16,
      stats: { str: 14, dex: 12, con: 14, int: 12, wis: 18, cha: 14 },
      weaponMasteries: ["Sap (Mace)"],
      entryPoint: {
        regionId: "region-foregrove",
        regionName: "The Foregrove Canopy & Primal Roots",
        locationName: "The Amber Pools Sanctuary",
        entryBackstory: "Emerged from the deep sacred groves after receiving a vision of the bleeding roots calling for aid.",
        dmHook: "Lyra was personally blessed by Old Mother Rowan (Aurelia in disguise) with a world-seed acorn that slowly sprouts."
      },
      personalityTraits: "I see the spark of vitality in all living things and speak to trees as if they were old elders.",
      ideals: "Balance: life and death must flow in natural rhythm without corruption from dark fire.",
      bonds: "I swore an oath to Jensen Lion Foregrove to preserve the boundary springs.",
      flaws: "I trust strangers far too readily, believing everyone has good intentions.",
      inventory: "Mace of Disruption, Shield of the Canopy (+1 AC on grass), Healer's Kit (10 uses), Holy Symbol of Aurelia, 60 GP",
      conditions: [],
      classResources: { label: "Channel Divinity", current: 2, max: 2 },
      dmSecrets: "The acorn Lyra carries is actually the dormant avatar seed of the Next World Tree.",
      currentSituation: {
        locationName: "The Amber Pools Sanctuary",
        regionId: "region-foregrove",
        regionName: "The Foregrove Canopy & Primal Roots",
        climate: "Verdant, humid mist infused with living spores",
        dangerLevel: "Moderate (Territorial Treants & Primal Hydras)",
        statusNote: "Gathering sacred amber sap; preparing healing balms for the journey south.",
        lastUpdatedDay: "Day 1"
      }
    },
    {
      id: "pc-3",
      name: "Kaelen Ash-Walker",
      playerName: "Jordan",
      level: 5,
      species: "Tiefling (Shadow-Veined)",
      classRole: "Rogue (Soulknife 5.5e)",
      alignment: "Chaotic Neutral",
      avatar: "KA",
      hpCurrent: 40,
      hpMax: 40,
      tempHp: 0,
      ac: 16,
      speed: "30 ft",
      initiativeMod: "+4",
      passivePerception: 14,
      passiveInsight: 13,
      stats: { str: 10, dex: 18, con: 14, int: 14, wis: 12, cha: 14 },
      weaponMasteries: ["Nick (Dagger)", "Vex (Shortsword)"],
      entryPoint: {
        regionId: "region-cinder-steppes",
        regionName: "The Cinder Steppes & Plasma Flats",
        locationName: "The Glass Sea Frontier",
        entryBackstory: "Escaped across the glowing crystal flats of the Glass Sea while evading an overzealous inquisitor patrol.",
        dmHook: "Kaelen carries a forged cipher token stolen from Carrus Ebonflame's desk in the Onyx Sanctum."
      },
      personalityTraits: "I always keep one eye on the tavern exit and a hand near my blade.",
      ideals: "Freedom: No god, king, or inquisitor has the right to chain a mortal soul.",
      bonds: "Someone in Crucible City framed me for stealing a covenant relic; I will clear my name.",
      flaws: "I cannot resist pocketing curious shiny trinkets when no one is looking.",
      inventory: "Twin Psionic Cinder Daggers, Thieves' Tools, Shadow-Cloak of Elvenkind, Grappling Hook, 85 GP",
      conditions: [],
      classResources: { label: "Psionic Energy Dice (d8)", current: 6, max: 6 },
      dmSecrets: "Kaelen is secretly the illegitimate child of an inquisitor high commander who thinks he died in the Glass Sea.",
      currentSituation: {
        locationName: "The Glass Sea Frontier",
        regionId: "region-cinder-steppes",
        regionName: "The Cinder Steppes & Plasma Flats",
        climate: "Scorching radiant heat with shimmering crystal glare",
        dangerLevel: "High (Inquisitor Crusades & Glass Wyrms)",
        statusNote: "Lurking beneath an overhang of crystallized quartz. Tracking an inquisitorial supply caravan.",
        lastUpdatedDay: "Day 1"
      }
    },
    {
      id: "pc-4",
      name: "Vespera Gale-Singer",
      playerName: "Morgan",
      level: 5,
      species: "Human (Wind-Touched)",
      classRole: "Wizard (School of Evocation 5.5e)",
      alignment: "Neutral Good",
      avatar: "VE",
      hpCurrent: 32,
      hpMax: 32,
      tempHp: 0,
      ac: 15,
      speed: "30 ft",
      initiativeMod: "+2",
      passivePerception: 12,
      passiveInsight: 14,
      stats: { str: 9, dex: 14, con: 14, int: 18, wis: 13, cha: 12 },
      weaponMasteries: ["Slow (Quarterstaff)"],
      entryPoint: {
        regionId: "region-mist-spires",
        regionName: "The Mist Spires & Cloud Nexus",
        locationName: "Monastery of a Thousand Tongues Spire",
        entryBackstory: "Graduated from the acoustic towers atop the Mist Spires to chart how elemental sound weaves through bleedlands.",
        dmHook: "Vespera's spellbook vibrates harmonically whenever she is within 1 mile of an Oathrizar shrine."
      },
      personalityTraits: "I take copious notes on everything, from tavern stew recipes to arcane acoustic frequencies.",
      ideals: "Knowledge: The mysteries of the elemental confluences are meant to be shared, not hoarded.",
      bonds: "High Abbot Vaelen entrusted me with cataloging primordial dialect variations across the realm.",
      flaws: "I get so absorbed reading scrolls that I forget to watch my step on cliffs and dungeons.",
      inventory: "Acoustic Tuning Fork Focus, Spellbook of Bound Clouds, Scroll of Lightning Bolt, Scholar's Pack, 70 GP",
      conditions: [],
      classResources: { label: "Arcane Recovery (1/Day)", current: 1, max: 1 },
      dmSecrets: "Vespera has discovered a hidden fifth harmonic in the Primordial Lexicon that corresponds to Zephyra-Null.",
      currentSituation: {
        locationName: "Monastery of a Thousand Tongues Spire",
        regionId: "region-mist-spires",
        regionName: "The Mist Spires & Cloud Nexus",
        climate: "Thin alpine atmosphere vibrating with resonant thunder",
        dangerLevel: "Extreme (Vortex Storms & Roc Aeries)",
        statusNote: "Transcribing acoustic frequencies from the clouds; preparing sky-skiff tether for descent.",
        lastUpdatedDay: "Day 1"
      }
    }
  ],

  // Player User Accounts
  users: [
    { id: "user-alex", username: "alex", password: "123", displayName: "Alex", avatar: "A", claimedCharId: "pc-1" },
    { id: "user-sam", username: "sam", password: "123", displayName: "Sam", avatar: "S", claimedCharId: "pc-2" },
    { id: "user-jordan", username: "jordan", password: "123", displayName: "Jordan", avatar: "J", claimedCharId: "pc-3" },
    { id: "user-morgan", username: "morgan", password: "123", displayName: "Morgan", avatar: "M", claimedCharId: "pc-4" }
  ],

  // Campaign Daily Journal Entries ("Adventurer's Log by Days with Titles")
  journalEntries: [
    {
      id: "j-1",
      charId: "pc-1",
      day: "Day 1",
      title: "Descent from the Glacial Crags & The Frost-Bitten Chasm",
      location: "Permafrost Ridge Pass, Glacial Crags",
      notes: "We crossed the frozen chasm using heavy goliath climbing ropes. The gale was howling with frost-elemental spirits. I spotted a scouting unit from Kirrag's Frost-Breaker guard watching us from the upper cliffs, but they did not engage. Shared a draught of Garrick's runic hearth-ale to ward off frostbite.",
      situation: "Resting in a sheltered ice-cave. Fire lit with runic hearth-wood. Watch set for the night.",
      tags: ["Journey", "Survival", "Faction Meeting"],
      isPrivate: false,
      timestamp: 1718000000000
    },
    {
      id: "j-2",
      charId: "pc-1",
      day: "Day 2",
      title: "The Slagfield Frontier & 4N-V1L's Anvil Echoes",
      location: "The Cinder Slagfields Border",
      notes: "The ice melted underfoot as the ground shifted into glowing obsidian slag. The rhythmic clanging of 4N-V1L's great titan hammer echoed across the dunes. Traded two winter wolf pelts with a wandering dwarf smith for 15 runic iron spikes.",
      situation: "Approaching Crucible City frontier gate. Guard patrol requested our faction standing passes.",
      tags: ["Exploration", "Trade", "Living Forge"],
      isPrivate: false,
      timestamp: 1718086400000
    },
    {
      id: "j-3",
      charId: "pc-2",
      day: "Day 1",
      title: "Visions at the Amber Pool & Mother Rowan's Blessing",
      location: "Amber Pools Sanctuary, Foregrove Canopy",
      notes: "The sacred waters of the Amber Pools glowed with vibrant phosphorescence. Old Mother Rowan gave me a gentle smile and whispered that the world tree's heartbeat was quickening under the bleeding pressure. She blessed my acorn focus with living dew.",
      situation: "Gathering sacred amber sap and preparing healing poultices for the journey southward.",
      tags: ["Vision", "Blessing", "Deity Encounter"],
      isPrivate: false,
      timestamp: 1718000000000
    },
    {
      id: "j-4",
      charId: "pc-3",
      day: "Day 1",
      title: "Evading the Sunken Pyre Zealots across the Glass Sea",
      location: "Glass Sea Frontier, Cinder Steppes",
      notes: "Grand Inquisitor Pyrok's zealots were sweeping the western ridge with radiant solar mirrors. I slipped between the crystallized quartz dunes using psionic stealth. Managed to lift a sealed courier ledger from their supply wagon without tripping the fire-alarms.",
      situation: "Hiding in an abandoned glass-blower's kiln until dusk. Decoding the inquisitor ledger.",
      tags: ["Stealth", "Inquisitors", "Relic Theft"],
      isPrivate: true,
      timestamp: 1718000000000
    },
    {
      id: "j-5",
      charId: "pc-4",
      day: "Day 1",
      title: "The Acoustic Harmonics of the Cloud Spires",
      location: "Mist Spire Heights",
      notes: "High Abbot Vaelen conducted the morning hymn across all seven acoustic peaks. The Primordial Lexicon resonates at 432 Hz in this altitude. Charted wind updrafts that will allow our sky-skiff to glide safely toward the Crucible Valley.",
      situation: "Tethering the sky-skiff and cataloging acoustic dialect scrolls before departure.",
      tags: ["Lexicon", "Arcana", "Wind Mastery"],
      isPrivate: false,
      timestamp: 1718000000000
    }
  ]
};

