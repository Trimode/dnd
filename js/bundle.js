/**
 * The Bleeding Realms of Aetheria - Consolidated Application Bundle (Clean 5.5e)
 */
(function() {
  'use strict';

  // 1. WORLD DATA
/**
 * D&D 5.5e Bleeding Realms World Compendium Data
 * Integrated with the user's characters, lore, and elemental bleeding geography.
 */
const INITIAL_WORLD_DATA = {
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
  const worldData = INITIAL_WORLD_DATA;

  // 1.5. SUPABASE CLIENT
/**
 * Supabase Database & Realtime Sync Client for The Bleeding Realms of Aetheria
 * Optimized with per-table diff fingerprinting, parallel upserts, and targeted Realtime reloads.
 */

const SUPABASE_URL = 'https://jpagabqwrfjnjlbsrxbe.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_KQYsJ2wul_3xh14bqK8Evw_p-b0pNvA';

const LORE_CATEGORIES = [
  'pantheon',
  'regions',
  'characters',
  'factions',
  'bastions',
  'primordialLexicon',
  'weaponMasteries',
  'timeline',
  'rumors'
];

class SupabaseCampaignService {
  constructor() {
    this.client = null;
    this.realtimeChannel = null;
    this.activeCampaignId = null;
    this.isSyncing = false;
    this.lastLocalWriteAt = 0;
    this.syncTimer = null;
    this.realtimeTimers = {};
    this.lastSyncedSnapshots = {}; // campaignId -> { sectionKey: serializedString }
    this.initClient();
  }

  initClient() {
    if (typeof window !== 'undefined' && window.supabase && typeof window.supabase.createClient === 'function') {
      try {
        this.client = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
          realtime: {
            params: { eventsPerSecond: 10 }
          }
        });
      } catch (e) {
        console.warn('[Supabase] Failed to initialize client, falling back to local cache:', e);
        this.client = null;
      }
    }
    return this.client;
  }

  isAvailable() {
    if (!this.client) this.initClient();
    return !!this.client;
  }

  getSnapshotMap(campaignId) {
    if (!this.lastSyncedSnapshots[campaignId]) {
      this.lastSyncedSnapshots[campaignId] = {};
    }
    return this.lastSyncedSnapshots[campaignId];
  }

  recordSnapshots(campaignId, worldData) {
    if (!worldData) return;
    const snap = this.getSnapshotMap(campaignId);
    snap.campaignMeta = JSON.stringify({
      partySettings: worldData.partySettings || {},
      socialScene: worldData.socialScene || {},
      metadata: worldData.metadata || {},
      regionsCount: Array.isArray(worldData.regions) ? worldData.regions.length : 0
    });
    snap.users = JSON.stringify(worldData.users || []);
    snap.partyCharacters = JSON.stringify(worldData.partyCharacters || []);
    snap.journalEntries = JSON.stringify(worldData.journalEntries || []);
    snap.socialMessages = JSON.stringify(worldData.socialMessages || []);
    snap.diceRollLogs = JSON.stringify(worldData.diceRollLogs || []);
    snap.pendingRollRequests = JSON.stringify(worldData.pendingRollRequests || []);
    snap.combatState = JSON.stringify(worldData.combatState || null);
    LORE_CATEGORIES.forEach(cat => {
      if (worldData[cat] !== undefined) {
        snap[`lore:${cat}`] = JSON.stringify(worldData[cat]);
      }
    });
  }

  async fetchCampaigns() {
    if (!this.isAvailable()) return null;
    const [campRes, charRes] = await Promise.all([
      this.client
        .from('campaigns')
        .select('id, name, short_name, subtitle, description, status, tag, system, regions_count, party_settings, social_scene, metadata')
        .order('created_at', { ascending: true }),
      this.client
        .from('party_characters')
        .select('campaign_id')
    ]);

    if (campRes.error) {
      console.warn('[Supabase] fetchCampaigns error:', campRes.error.message);
      return null;
    }

    const countByCampaign = {};
    (charRes.data || []).forEach(r => {
      countByCampaign[r.campaign_id] = (countByCampaign[r.campaign_id] || 0) + 1;
    });

    return (campRes.data || []).map(row => ({
      id: row.id,
      name: row.name,
      shortName: row.short_name,
      subtitle: row.subtitle,
      description: row.description,
      status: row.status,
      tag: row.tag,
      system: row.system,
      regionsCount: row.regions_count || 0,
      partyCount: countByCampaign[row.id] || 0,
      partySettings: row.party_settings || {},
      socialScene: row.social_scene || {},
      metadata: row.metadata || {}
    }));
  }

  async verifyCampaignPassword(campaignId, password) {
    if (!this.isAvailable()) return null;
    try {
      const { data, error } = await this.client.rpc('verify_campaign_password', {
        p_campaign_id: campaignId || 'demo',
        p_password: password || ''
      });
      if (error) {
        console.warn('[Supabase] verify_campaign_password RPC error:', error.message);
        return null;
      }
      return data === true;
    } catch (e) {
      console.warn('[Supabase] verifyCampaignPassword failed:', e);
      return null;
    }
  }

  // Row mappers: DB <-> App WorldData format
  mapCharacterFromDb(row) {
    const details = row.details || {};
    return {
      ...details,
      id: row.id,
      name: row.name,
      playerName: row.player_name,
      userId: row.owner_user_id,
      ownerUserId: row.owner_user_id,
      claimedUserId: row.owner_user_id,
      level: row.level,
      species: row.species,
      classRole: row.class_role,
      alignment: row.alignment,
      background: row.background,
      originFeat: row.origin_feat,
      avatar: row.avatar,
      hpCurrent: row.hp_current,
      hpMax: row.hp_max,
      tempHp: row.temp_hp,
      ac: row.ac,
      speed: row.speed,
      initiativeMod: row.initiative_mod,
      passivePerception: row.passive_perception,
      passiveInsight: row.passive_insight,
      inspiration: !!row.inspiration,
      stats: row.stats || { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 }
    };
  }

  mapCharacterToDb(char, campaignId) {
    const {
      id, name, playerName, userId, ownerUserId, claimedUserId,
      level, species, classRole, alignment, background, originFeat,
      avatar, hpCurrent, hpMax, tempHp, ac, speed, initiativeMod,
      passivePerception, passiveInsight, inspiration, stats, ...details
    } = char;

    return {
      id: id,
      campaign_id: campaignId,
      owner_user_id: ownerUserId || claimedUserId || userId || null,
      name: name || 'Unnamed Champion',
      player_name: playerName || 'Adventurer',
      level: parseInt(level, 10) || 1,
      species: species || 'Human',
      class_role: classRole || 'Fighter',
      alignment: alignment || 'Neutral Good',
      background: background || 'Wayfarer',
      origin_feat: originFeat || 'Lucky',
      avatar: avatar || 'PC',
      hp_current: Number.isFinite(Number(hpCurrent)) ? Number(hpCurrent) : 12,
      hp_max: Number.isFinite(Number(hpMax)) ? Number(hpMax) : 12,
      temp_hp: Number.isFinite(Number(tempHp)) ? Number(tempHp) : 0,
      ac: Number.isFinite(Number(ac)) ? Number(ac) : 14,
      speed: speed || '30 ft',
      initiative_mod: initiativeMod || '+0',
      passive_perception: Number.isFinite(Number(passivePerception)) ? Number(passivePerception) : 10,
      passive_insight: Number.isFinite(Number(passiveInsight)) ? Number(passiveInsight) : 10,
      inspiration: !!inspiration,
      stats: stats || { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
      details: details || {},
      updated_at: new Date().toISOString()
    };
  }

  mapUserFromDb(row) {
    return {
      id: row.id,
      username: row.username,
      displayName: row.display_name,
      password: row.password_hash,
      avatar: row.avatar || 'PC',
      claimedCharId: row.claimed_char_id || null,
      createdAt: row.created_at ? new Date(row.created_at).getTime() : Date.now()
    };
  }

  mapUserToDb(user, campaignId) {
    return {
      id: user.id,
      campaign_id: campaignId,
      username: (user.username || '').trim().toLowerCase(),
      display_name: user.displayName || user.username || 'Player',
      password_hash: user.password || '',
      avatar: user.avatar || 'PC',
      claimed_char_id: user.claimedCharId || null
    };
  }

  mapJournalFromDb(row) {
    return {
      id: row.id,
      charId: row.char_id,
      day: row.day,
      title: row.title,
      location: row.location,
      notes: row.notes,
      situation: row.situation,
      tags: Array.isArray(row.tags) ? row.tags : ['Journal'],
      isPrivate: !!row.is_private,
      timestamp: row.created_at ? new Date(row.created_at).getTime() : Date.now()
    };
  }

  mapJournalToDb(entry, campaignId) {
    return {
      id: entry.id,
      campaign_id: campaignId,
      char_id: entry.charId || 'pc-1',
      day: entry.day || 'Day 1',
      title: entry.title || 'Untitled Entry',
      location: entry.location || 'The Bleeding Realms',
      notes: entry.notes || '',
      situation: entry.situation || '',
      tags: Array.isArray(entry.tags) ? entry.tags : ['Journal'],
      is_private: !!entry.isPrivate,
      updated_at: new Date().toISOString()
    };
  }

  mapMessageFromDb(row) {
    return {
      id: row.id,
      senderName: row.sender_name,
      senderAvatar: row.sender_avatar,
      senderRole: row.sender_role,
      type: row.msg_type,
      text: row.text,
      timeStr: row.time_str,
      timestamp: row.created_at ? new Date(row.created_at).getTime() : Date.now()
    };
  }

  mapMessageToDb(msg, campaignId) {
    return {
      id: msg.id,
      campaign_id: campaignId,
      sender_name: msg.senderName || 'Adventurer',
      sender_avatar: msg.senderAvatar || 'PC',
      sender_role: msg.senderRole || 'Player',
      msg_type: msg.type || 'ic',
      text: msg.text || '',
      time_str: msg.timeStr || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }

  mapRollFromDb(row) {
    return {
      id: row.id,
      rollerName: row.roller_name,
      rollerAvatar: row.roller_avatar,
      rollType: row.roll_type,
      label: row.label,
      formula: row.formula,
      d20Result: row.d20_result,
      total: row.total,
      dc: row.dc,
      success: row.success,
      isCrit: !!row.is_crit,
      isNat1: !!row.is_nat1,
      advantageMode: row.advantage_mode || 'normal',
      note: row.note || '',
      timeStr: row.time_str,
      timestamp: row.created_at ? new Date(row.created_at).getTime() : Date.now()
    };
  }

  mapRollToDb(roll, campaignId) {
    return {
      id: roll.id,
      campaign_id: campaignId,
      roller_name: roll.rollerName || 'Adventurer',
      roller_avatar: roll.rollerAvatar || '🎲',
      roll_type: roll.rollType || 'dice_roller',
      label: roll.label || 'Roll',
      formula: roll.formula || String(roll.total || 0),
      d20_result: typeof roll.d20Result === 'number' ? roll.d20Result : null,
      total: Number(roll.total) || 0,
      dc: roll.dc !== null && roll.dc !== undefined && roll.dc !== '' ? Number(roll.dc) : null,
      success: typeof roll.success === 'boolean' ? roll.success : null,
      is_crit: !!roll.isCrit,
      is_nat1: !!roll.isNat1,
      advantage_mode: roll.advantageMode || 'normal',
      note: roll.note || '',
      time_str: roll.timeStr || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
  }

  mapRequestFromDb(row) {
    return {
      id: row.id,
      targetCharId: row.target_char_id,
      targetPlayerName: row.target_player_name,
      requestedBy: row.requested_by,
      type: row.req_type,
      ability: row.ability,
      skill: row.skill,
      dc: row.dc,
      reason: row.reason,
      status: row.status,
      createdAt: row.created_at ? new Date(row.created_at).getTime() : Date.now()
    };
  }

  mapRequestToDb(req, campaignId) {
    return {
      id: req.id,
      campaign_id: campaignId,
      target_char_id: req.targetCharId || 'ALL',
      target_player_name: req.targetPlayerName || 'All Players',
      requested_by: req.requestedBy || 'DM',
      req_type: req.type || 'save',
      ability: req.ability || 'DEX',
      skill: req.skill || null,
      dc: req.dc !== null && req.dc !== undefined && req.dc !== '' ? Number(req.dc) : null,
      reason: req.reason || '',
      status: req.status || 'pending'
    };
  }

  async loadCampaignData(campaignId, fallbackSeedData = null) {
    if (!this.isAvailable()) return null;

    const [
      campRes,
      usersRes,
      charsRes,
      journalsRes,
      msgsRes,
      rollsRes,
      reqsRes,
      loreRes,
      combatRes
    ] = await Promise.all([
      this.client.from('campaigns').select('*').eq('id', campaignId).maybeSingle(),
      this.client.from('player_accounts').select('*').eq('campaign_id', campaignId),
      this.client.from('party_characters').select('*').eq('campaign_id', campaignId).order('created_at', { ascending: true }),
      this.client.from('journal_entries').select('*').eq('campaign_id', campaignId).order('created_at', { ascending: false }),
      this.client.from('social_messages').select('*').eq('campaign_id', campaignId).order('created_at', { ascending: true }).limit(100),
      this.client.from('dice_roll_logs').select('*').eq('campaign_id', campaignId).order('created_at', { ascending: false }).limit(80),
      this.client.from('pending_roll_requests').select('*').eq('campaign_id', campaignId).order('created_at', { ascending: false }).limit(25),
      this.client.from('campaign_lore').select('*').eq('campaign_id', campaignId),
      this.client.from('combat_sessions').select('*').eq('campaign_id', campaignId).maybeSingle()
    ]);

    if (campRes.error) {
      console.warn('[Supabase] loadCampaignData error:', campRes.error.message);
      return null;
    }

    const loreRows = loreRes.data || [];
    const charRows = charsRes.data || [];

    // First-time launch: seed the database from INITIAL_WORLD_DATA
    if (loreRows.length === 0 && charRows.length === 0 && fallbackSeedData) {
      console.info(`[Supabase] Campaign '${campaignId}' is empty — seeding initial world data into Supabase...`);
      await this.syncCampaignData(campaignId, fallbackSeedData, true);
      const seeded = JSON.parse(JSON.stringify(fallbackSeedData));
      this.recordSnapshots(campaignId, seeded);
      return seeded;
    }

    const hydrated = fallbackSeedData ? JSON.parse(JSON.stringify(fallbackSeedData)) : {};

    if (campRes.data) {
      if (campRes.data.metadata && Object.keys(campRes.data.metadata).length > 0) {
        hydrated.metadata = { ...(hydrated.metadata || {}), ...campRes.data.metadata };
      }
      if (campRes.data.party_settings && Object.keys(campRes.data.party_settings).length > 0) {
        hydrated.partySettings = { ...(hydrated.partySettings || {}), ...campRes.data.party_settings };
      }
      if (campRes.data.social_scene && Object.keys(campRes.data.social_scene).length > 0) {
        hydrated.socialScene = { ...(hydrated.socialScene || {}), ...campRes.data.social_scene };
      }
    }

    loreRows.forEach(row => {
      hydrated[row.category] = row.payload;
    });

    hydrated.users = (usersRes.data || []).map(r => this.mapUserFromDb(r));
    hydrated.partyCharacters = charRows.map(r => this.mapCharacterFromDb(r));
    hydrated.journalEntries = (journalsRes.data || []).map(r => this.mapJournalFromDb(r));
    hydrated.socialMessages = (msgsRes.data || []).map(r => this.mapMessageFromDb(r));
    hydrated.diceRollLogs = (rollsRes.data || []).map(r => this.mapRollFromDb(r));
    hydrated.pendingRollRequests = (reqsRes.data || []).map(r => this.mapRequestFromDb(r));
    if (combatRes.data && combatRes.data.state && Object.keys(combatRes.data.state).length > 0) {
      hydrated.combatState = combatRes.data.state;
    }

    this.recordSnapshots(campaignId, hydrated);
    return hydrated;
  }

  // Targeted single-table reload for Realtime updates (avoids re-fetching unchanged lore)
  async loadTableSlice(campaignId, tableName) {
    if (!this.isAvailable()) return null;
    switch (tableName) {
      case 'campaigns': {
        const { data } = await this.client.from('campaigns').select('party_settings, social_scene, metadata').eq('id', campaignId).maybeSingle();
        if (!data) return null;
        return {
          partySettings: data.party_settings || {},
          socialScene: data.social_scene || {},
          metadata: data.metadata || {}
        };
      }
      case 'player_accounts': {
        const { data } = await this.client.from('player_accounts').select('*').eq('campaign_id', campaignId);
        return { users: (data || []).map(r => this.mapUserFromDb(r)) };
      }
      case 'party_characters': {
        const { data } = await this.client.from('party_characters').select('*').eq('campaign_id', campaignId).order('created_at', { ascending: true });
        return { partyCharacters: (data || []).map(r => this.mapCharacterFromDb(r)) };
      }
      case 'journal_entries': {
        const { data } = await this.client.from('journal_entries').select('*').eq('campaign_id', campaignId).order('created_at', { ascending: false });
        return { journalEntries: (data || []).map(r => this.mapJournalFromDb(r)) };
      }
      case 'social_messages': {
        const { data } = await this.client.from('social_messages').select('*').eq('campaign_id', campaignId).order('created_at', { ascending: true }).limit(100);
        return { socialMessages: (data || []).map(r => this.mapMessageFromDb(r)) };
      }
      case 'dice_roll_logs': {
        const { data } = await this.client.from('dice_roll_logs').select('*').eq('campaign_id', campaignId).order('created_at', { ascending: false }).limit(80);
        return { diceRollLogs: (data || []).map(r => this.mapRollFromDb(r)) };
      }
      case 'pending_roll_requests': {
        const { data } = await this.client.from('pending_roll_requests').select('*').eq('campaign_id', campaignId).order('created_at', { ascending: false }).limit(25);
        return { pendingRollRequests: (data || []).map(r => this.mapRequestFromDb(r)) };
      }
      case 'campaign_lore': {
        const { data } = await this.client.from('campaign_lore').select('*').eq('campaign_id', campaignId);
        const patch = {};
        (data || []).forEach(r => { patch[r.category] = r.payload; });
        return patch;
      }
      case 'combat_sessions': {
        const { data } = await this.client.from('combat_sessions').select('state').eq('campaign_id', campaignId).maybeSingle();
        return data ? { combatState: data.state } : null;
      }
      default:
        return null;
    }
  }

  scheduleSync(campaignId, worldData, onStatusChange = null) {
    if (!this.isAvailable()) return;
    if (this.syncTimer) clearTimeout(this.syncTimer);
    if (onStatusChange) onStatusChange('syncing');

    this.syncTimer = setTimeout(async () => {
      try {
        await this.syncCampaignData(campaignId, worldData, false);
        if (onStatusChange) onStatusChange('live');
      } catch (err) {
        console.warn('[Supabase] Background sync failed:', err);
        if (onStatusChange) onStatusChange('error');
      }
    }, 300);
  }

  async syncCollectionWithDeletes(table, campaignId, rows) {
    if (rows.length > 0) {
      await this.client.from(table).upsert(rows, { onConflict: 'id' });
    }
    const { data: existing } = await this.client.from(table).select('id').eq('campaign_id', campaignId);
    const keepIds = new Set(rows.map(r => r.id));
    const deleteIds = (existing || []).map(r => r.id).filter(id => !keepIds.has(id));
    if (deleteIds.length > 0) {
      await this.client.from(table).delete().in('id', deleteIds);
    }
  }

  async syncCampaignData(campaignId, worldData, forceFull = false) {
    if (!this.isAvailable() || !worldData) return false;
    this.isSyncing = true;
    this.lastLocalWriteAt = Date.now();

    const snap = this.getSnapshotMap(campaignId);
    const tasks = [];

    try {
      // 1. Campaign metadata / settings / socialScene (only if changed)
      const metaJson = JSON.stringify({
        partySettings: worldData.partySettings || {},
        socialScene: worldData.socialScene || {},
        metadata: worldData.metadata || {},
        regionsCount: Array.isArray(worldData.regions) ? worldData.regions.length : 0
      });
      if (forceFull || snap.campaignMeta !== metaJson) {
        tasks.push(
          this.client
            .from('campaigns')
            .update({
              party_settings: worldData.partySettings || {},
              social_scene: worldData.socialScene || {},
              metadata: worldData.metadata || {},
              regions_count: Array.isArray(worldData.regions) ? worldData.regions.length : 0,
              updated_at: new Date().toISOString()
            })
            .eq('id', campaignId)
            .then(() => { snap.campaignMeta = metaJson; })
        );
      }

      // 2. Player Accounts & Party Characters (respect FK order if both changed)
      const usersJson = JSON.stringify(worldData.users || []);
      const charsJson = JSON.stringify(worldData.partyCharacters || []);
      const usersDirty = forceFull || snap.users !== usersJson;
      const charsDirty = forceFull || snap.partyCharacters !== charsJson;

      if (usersDirty || charsDirty) {
        tasks.push((async () => {
          const users = (worldData.users || []).map(u => this.mapUserToDb(u, campaignId));
          if (usersDirty && users.length > 0) {
            await this.client.from('player_accounts').upsert(users, { onConflict: 'id' });
            snap.users = usersJson;
          }
          if (charsDirty) {
            const validUserIds = new Set(users.map(u => u.id));
            const chars = (worldData.partyCharacters || []).map(c => {
              const mapped = this.mapCharacterToDb(c, campaignId);
              if (mapped.owner_user_id && !validUserIds.has(mapped.owner_user_id)) {
                mapped.owner_user_id = null;
              }
              return mapped;
            });
            await this.syncCollectionWithDeletes('party_characters', campaignId, chars);
            snap.partyCharacters = charsJson;
          }
        })());
      }

      // 3. Journal Entries (only if changed)
      const journalsJson = JSON.stringify(worldData.journalEntries || []);
      if (forceFull || snap.journalEntries !== journalsJson) {
        const journals = (worldData.journalEntries || []).map(j => this.mapJournalToDb(j, campaignId));
        tasks.push(
          this.syncCollectionWithDeletes('journal_entries', campaignId, journals)
            .then(() => { snap.journalEntries = journalsJson; })
        );
      }

      // 4. Social Messages (only if changed)
      const msgsJson = JSON.stringify(worldData.socialMessages || []);
      if (forceFull || snap.socialMessages !== msgsJson) {
        const messages = (worldData.socialMessages || []).map(m => this.mapMessageToDb(m, campaignId));
        if (messages.length > 0) {
          tasks.push(
            this.client.from('social_messages').upsert(messages, { onConflict: 'id' })
              .then(() => { snap.socialMessages = msgsJson; })
          );
        }
      }

      // 5. Dice Roll Logs (only if changed)
      const rollsJson = JSON.stringify(worldData.diceRollLogs || []);
      if (forceFull || snap.diceRollLogs !== rollsJson) {
        const rolls = (worldData.diceRollLogs || []).map(r => this.mapRollToDb(r, campaignId));
        tasks.push(
          (rolls.length > 0
            ? this.client.from('dice_roll_logs').upsert(rolls, { onConflict: 'id' })
            : this.client.from('dice_roll_logs').delete().eq('campaign_id', campaignId)
          ).then(() => { snap.diceRollLogs = rollsJson; })
        );
      }

      // 6. Pending Roll Requests (only if changed)
      const reqsJson = JSON.stringify(worldData.pendingRollRequests || []);
      if (forceFull || snap.pendingRollRequests !== reqsJson) {
        const reqs = (worldData.pendingRollRequests || []).map(r => this.mapRequestToDb(r, campaignId));
        tasks.push(
          this.syncCollectionWithDeletes('pending_roll_requests', campaignId, reqs)
            .then(() => { snap.pendingRollRequests = reqsJson; })
        );
      }

      // 7. Hybrid JSONB Lore Categories (only dirty categories!)
      const dirtyLoreRows = [];
      const dirtyLoreSnaps = [];
      LORE_CATEGORIES.forEach(cat => {
        if (worldData[cat] !== undefined) {
          const catJson = JSON.stringify(worldData[cat]);
          if (forceFull || snap[`lore:${cat}`] !== catJson) {
            dirtyLoreRows.push({
              campaign_id: campaignId,
              category: cat,
              payload: worldData[cat],
              updated_at: new Date().toISOString()
            });
            dirtyLoreSnaps.push([`lore:${cat}`, catJson]);
          }
        }
      });
      if (dirtyLoreRows.length > 0) {
        tasks.push(
          this.client.from('campaign_lore').upsert(dirtyLoreRows, { onConflict: 'campaign_id,category' })
            .then(() => {
              dirtyLoreSnaps.forEach(([k, v]) => { snap[k] = v; });
            })
        );
      }

      // 8. Combat Session (only if changed)
      const combatJson = JSON.stringify(worldData.combatState || null);
      if (worldData.combatState && (forceFull || snap.combatState !== combatJson)) {
        tasks.push(
          this.client.from('combat_sessions').upsert({
            campaign_id: campaignId,
            state: worldData.combatState,
            updated_at: new Date().toISOString()
          }, { onConflict: 'campaign_id' })
            .then(() => { snap.combatState = combatJson; })
        );
      }

      if (tasks.length > 0) {
        await Promise.all(tasks);
      }
      return true;
    } finally {
      this.isSyncing = false;
      this.lastLocalWriteAt = Date.now();
    }
  }

  subscribeRealtime(campaignId, onTablePatch, onStatusChange = null) {
    if (!this.isAvailable()) return;

    if (this.realtimeChannel) {
      try {
        this.client.removeChannel(this.realtimeChannel);
      } catch (_) {}
      this.realtimeChannel = null;
    }

    this.activeCampaignId = campaignId;

    const tables = [
      'campaigns',
      'player_accounts',
      'party_characters',
      'journal_entries',
      'social_messages',
      'dice_roll_logs',
      'pending_roll_requests',
      'campaign_lore',
      'combat_sessions'
    ];

    let channel = this.client.channel(`campaign-live-${campaignId}`);
    tables.forEach(table => {
      const filterCol = table === 'campaigns' ? 'id' : 'campaign_id';
      channel = channel.on(
        'postgres_changes',
        { event: '*', schema: 'public', table, filter: `${filterCol}=eq.${campaignId}` },
        () => {
          // Ignore echo events triggered by our own local write
          if (this.isSyncing || (Date.now() - this.lastLocalWriteAt < 1200)) return;
          if (this.realtimeTimers[table]) clearTimeout(this.realtimeTimers[table]);
          this.realtimeTimers[table] = setTimeout(async () => {
            const patch = await this.loadTableSlice(campaignId, table);
            if (patch && onTablePatch) {
              onTablePatch(patch);
            }
          }, 150);
        }
      );
    });

    this.realtimeChannel = channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        if (onStatusChange) onStatusChange('live');
      } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
        if (onStatusChange) onStatusChange('offline');
      }
    });
  }
}
const supabaseDb = new SupabaseCampaignService();

  // 2. WORLD STATE
/**
 * World State Management with Supabase Cloud Persistence, Realtime Sync & Local Cache
 */
const STORAGE_KEY = 'dnd_bleeding_realms_data_v1';
const PREFS_KEY = 'dnd_bleeding_realms_prefs_v1';

class WorldStateManager {
  constructor() {
    this.version = '1.0';
    this.cloudStatus = 'connecting'; // 'connecting' | 'live' | 'syncing' | 'offline' | 'error'
    this.cloudListeners = [];
    this.cloudReady = false;
    this.games = [
      {
        id: 'demo',
        name: 'The Bleeding Realms (Demo)',
        shortName: 'Demo',
        subtitle: 'Where Primal Elements Clash and Bleed into Diverse Lands & Peoples',
        status: 'active',
        password: 'bubbles',
        system: 'D&D 5.5e',
        regionsCount: 11,
        partyCount: 3,
        tag: 'Active Demo',
        description: 'The active 5.5e campaign compendium: interactive atlas, dynamic region pins, and tactical combat battlemat.'
      },
      {
        id: 'slagfields',
        name: 'Shadows of the Slagfields',
        shortName: 'Slagfields',
        subtitle: 'Subterranean Dwarven Strongholds & Smoldering Forges',
        status: 'slot',
        password: 'bubbles',
        system: 'D&D 5.5e',
        regionsCount: 4,
        partyCount: 0,
        tag: 'Campaign Slot 2',
        description: 'Magma rivers, deep iron forges, and ancient fire elementals. (Password: bubbles)'
      },
      {
        id: 'permafrost',
        name: 'Glacial Crags Expedition',
        shortName: 'Permafrost',
        subtitle: 'High-Altitude Survival & Permafrost Ridge',
        status: 'slot',
        password: 'bubbles',
        system: 'D&D 5.5e',
        regionsCount: 5,
        partyCount: 0,
        tag: 'Campaign Slot 3',
        description: 'Frozen spires, rime wolves, and frost giant ruins. (Password: bubbles)'
      }
    ];
    this.activeGameId = 'demo';
    this.data = this.loadData();
    this.ensureDefaults();
    this.prefs = this.loadPrefs();
    this.listeners = [];
  }

  ensureDefaults() {
    if (!this.data) this.data = {};
    if (!this.data.diceRollLogs) {
      this.data.diceRollLogs = [
        {
          id: 'roll-init-1',
          rollerName: 'Theron Storm-Breaker (Alex)',
          rollerAvatar: 'TH',
          rollType: 'check',
          label: 'Athletics (Strength)',
          formula: '1d20 (15) + 4',
          d20Result: 15,
          total: 19,
          dc: 15,
          success: true,
          isCrit: false,
          isNat1: false,
          advantageMode: 'normal',
          note: 'Hauling climbing ropes across the frost chasm',
          timestamp: Date.now() - 3600000,
          timeStr: '09:15:20'
        },
        {
          id: 'roll-init-2',
          rollerName: 'Lyra Dawnbloom (Sam)',
          rollerAvatar: 'LY',
          rollType: 'save',
          label: 'WIS Saving Throw',
          formula: '1d20 (14) + 6',
          d20Result: 14,
          total: 20,
          dc: 14,
          success: true,
          isCrit: false,
          isNat1: false,
          advantageMode: 'normal',
          note: 'Resisting whispers from the Primordial void tear',
          timestamp: Date.now() - 2400000,
          timeStr: '09:35:10'
        },
        {
          id: 'roll-init-3',
          rollerName: 'Kaelen Ash-Walker (Jordan)',
          rollerAvatar: 'KA',
          rollType: 'check',
          label: 'Stealth (Dexterity)',
          formula: '1d20 (17) + 7',
          d20Result: 17,
          total: 24,
          dc: 16,
          success: true,
          isCrit: false,
          isNat1: false,
          advantageMode: 'adv',
          note: 'Slipping past the Inquisitor sentry patrol in the Glass Dunes',
          timestamp: Date.now() - 1200000,
          timeStr: '09:55:42'
        }
      ];
    }
    if (!this.data.pendingRollRequests) {
      this.data.pendingRollRequests = [];
    }
    if (!this.data.socialMessages) {
      this.data.socialMessages = [
        {
          id: 'msg-init-1',
          senderName: 'Dungeon Master',
          senderAvatar: 'DM',
          senderRole: 'DM',
          type: 'dm_narration',
          text: 'The gale whips outside the rime-cave, scattering needles of ice against the stone entrance. The hearthfire crackles warmly with fragrant amber-pine logs.',
          timestamp: Date.now() - 3600000,
          timeStr: '09:12'
        },
        {
          id: 'msg-init-2',
          senderName: 'Theron Storm-Breaker (Alex)',
          senderAvatar: 'TH',
          senderRole: 'Player',
          type: 'ic',
          text: 'Stack the wolf-pelts near the threshold. The howling out there is not natural wind—Kirrag’s frost-trolls are roaming.',
          timestamp: Date.now() - 2700000,
          timeStr: '09:27'
        },
        {
          id: 'msg-init-3',
          senderName: 'Lyra Dawnbloom (Sam)',
          senderAvatar: 'LY',
          senderRole: 'Player',
          type: 'ic',
          text: 'I have steeped sacred amber-pine tea for everyone. Drink it hot; it will steady your hands and clear the cold from your lungs.',
          timestamp: Date.now() - 1800000,
          timeStr: '09:42'
        },
        {
          id: 'msg-init-4',
          senderName: 'Kaelen Ash-Walker (Jordan)',
          senderAvatar: 'KA',
          senderRole: 'Player',
          type: 'ic',
          text: 'I scouted the upper ridge before dusk. Tracks lead toward the old dwarven forge. Tomorrow we move before sunrise.',
          timestamp: Date.now() - 900000,
          timeStr: '09:58'
        }
      ];
    }
    if (!this.data.socialScene) {
      this.data.socialScene = {
        title: 'Frost-Breaker Foothills Rime-Cave Campfire',
        region: 'The Glacial Crags of Permafrost',
        atmosphere: 'Frigid winds howl outside, but the hearthfire glows warm and amber against crystalline walls.',
        mood: 'Campfire Rest & Strategy',
        lighting: 'Warm Firelight'
      };
    }
  }

  loadData() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load saved world data, reverting to defaults:', e);
    }
    return JSON.parse(JSON.stringify(INITIAL_WORLD_DATA));
  }

  loadPrefs() {
    try {
      const saved = localStorage.getItem(PREFS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load saved preferences:', e);
    }
    return {
      dmMode: false,
      theme: 'theme-obsidian',
      audioVolume: 0.35,
      soundMuted: true,
      activeTab: 'map',
      selectedRegionId: null,
      selectedCharId: null,
      selectedFactionId: null,
      filterCategory: 'all'
    };
  }

  saveData(skipCloudSync = false) {
    try {
      const cacheKey = this.activeGameId && this.activeGameId !== 'demo'
        ? `${STORAGE_KEY}_${this.activeGameId}`
        : STORAGE_KEY;
      localStorage.setItem(cacheKey, JSON.stringify(this.data));
    } catch (e) {
      console.error('Failed to save world data:', e);
    }
    if (!skipCloudSync && typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      supabaseDb.scheduleSync(this.activeGameId || 'demo', this.data, (st) => this.setCloudStatus(st));
    }
    this.notify();
  }

  savePrefs(silent = false) {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(this.prefs));
    } catch (e) {
      console.error('Failed to save preferences:', e);
    }
    if (!silent) this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  subscribeCloudStatus(listener) {
    this.cloudListeners.push(listener);
    listener(this.cloudStatus);
    return () => {
      this.cloudListeners = this.cloudListeners.filter(l => l !== listener);
    };
  }

  setCloudStatus(status) {
    this.cloudStatus = status;
    this.cloudListeners.forEach(l => {
      try { l(status); } catch (_) {}
    });
  }

  async initCloud(campaignId = null) {
    const targetId = campaignId || this.activeGameId || 'demo';
    if (typeof supabaseDb === 'undefined' || !supabaseDb.isAvailable()) {
      this.setCloudStatus('offline');
      return false;
    }

    this.setCloudStatus('connecting');
    try {
      // 1. Fetch campaign list from Supabase
      const remoteGames = await supabaseDb.fetchCampaigns();
      if (remoteGames && remoteGames.length > 0) {
        this.games = remoteGames;
      }

      // 2. Load campaign data (auto-seeds 'demo' on first launch if empty)
      const seedData = targetId === 'demo' ? this.data : JSON.parse(JSON.stringify(INITIAL_WORLD_DATA));
      const cloudData = await supabaseDb.loadCampaignData(targetId, seedData);
      if (cloudData) {
        this.data = cloudData;
        this.ensureDefaults();
        this.saveData(true); // Update local cache without re-triggering cloud write
      }

      // 3. Subscribe to Supabase Realtime for targeted single-table live updates
      supabaseDb.subscribeRealtime(
        targetId,
        (patch) => {
          if (patch && typeof patch === 'object') {
            this.data = { ...this.data, ...patch };
            this.ensureDefaults();
            supabaseDb.recordSnapshots(targetId, this.data);
            this.saveData(true);
          }
        },
        (status) => this.setCloudStatus(status)
      );

      this.cloudReady = true;
      this.setCloudStatus('live');
      return true;
    } catch (err) {
      console.warn('[WorldState] Cloud initialization failed, using local cache:', err);
      this.setCloudStatus('offline');
      return false;
    }
  }

  getActiveGame() {
    return this.games.find(g => g.id === this.activeGameId) || this.games[0];
  }

  setActiveGame(gameId) {
    const game = this.games.find(g => g.id === gameId);
    if (game) {
      this.activeGameId = gameId;
      this.prefs.activeGameId = gameId;
      this.savePrefs();
      this.initCloud(gameId);
    }
  }

  verifyGamePassword(gameId, password) {
    if (!password) return false;
    const clean = password.trim().toLowerCase();
    if (clean === 'bubbles') return true;
    const game = this.games.find(g => g.id === gameId);
    return game && game.password && game.password.toLowerCase() === clean;
  }

  async verifyGamePasswordAsync(gameId, password) {
    if (!password) return false;
    if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      const remoteResult = await supabaseDb.verifyCampaignPassword(gameId, password);
      if (remoteResult !== null) return remoteResult;
    }
    return this.verifyGamePassword(gameId, password);
  }

  notify() {
    this.listeners.forEach(l => l(this.data, this.prefs));
  }

  // Preference setters
  setDmMode(enabled) {
    this.prefs.dmMode = enabled;
    this.savePrefs();
  }

  checkDmPassword(entered) {
    if (!entered) return false;
    const clean = entered.trim().toLowerCase();
    return clean === 'aetheria' || clean === 'dm' || clean === 'dnd5e' || clean === 'admin' || clean === '123' || clean === 'password';
  }

  setTheme(themeName) {
    this.prefs.theme = themeName;
    document.documentElement.className = themeName;
    this.savePrefs();
  }

  setActiveTab(tabName) {
    this.prefs.activeTab = tabName;
    this.savePrefs();
  }

  setSelectedRegion(regionId) {
    this.prefs.selectedRegionId = regionId;
    this.savePrefs();
  }

  setSelectedChar(charId) {
    this.prefs.selectedCharId = charId;
    this.savePrefs();
  }

  setSelectedFaction(factionId) {
    this.prefs.selectedFactionId = factionId;
    this.savePrefs();
  }

  // Faction Standing updates
  updatePartyStanding(factionId, delta) {
    const faction = this.data.factions.find(f => f.id === factionId);
    if (faction) {
      faction.playerStanding = Math.max(-5, Math.min(5, (faction.playerStanding || 0) + delta));
      this.saveData();
    }
  }

  // 5.5e Bastion Turn Executor
  executeBastionTurn(bastionId, orderType) {
    const bastion = this.data.bastions.find(b => b.id === bastionId);
    if (!bastion) return null;

    let result = {
      bastionName: bastion.name,
      order: orderType,
      orderPointsEarned: 0,
      goldEarned: 0,
      description: '',
      specialBonus: '',
      randomEvent: null
    };

    switch (orderType) {
      case 'craft':
        result.orderPointsEarned = 25;
        result.description = 'Artisans and smiths worked around the clock forging runic components and masterwork gear.';
        result.specialBonus = 'Crafted 1 batch of 5.5e Elemental Munitions / Infused Rations.';
        break;
      case 'harvest':
        result.goldEarned = 150 + (bastion.level * 20);
        result.orderPointsEarned = 20;
        result.description = 'Harvested subterranean mineral seams, rare grove herbs, or mountain hops.';
        result.specialBonus = 'Stockpiles refilled for the coming season.';
        break;
      case 'recruit':
        result.orderPointsEarned = 15;
        result.description = 'Recruited 5 specialized hirelings to bolster defense and upkeep.';
        bastion.defenseRating = (bastion.defenseRating || 15) + 1;
        result.specialBonus = 'Bastion Defense Rating increased by +1.';
        break;
      case 'trade':
        result.goldEarned = 300 + (bastion.level * 30);
        result.orderPointsEarned = 30;
        result.description = 'Dispatched trade caravans across the bleeding borders to Crucible City.';
        result.specialBonus = 'Gained favor with local merchant guilds.';
        break;
      case 'empower':
        result.orderPointsEarned = 50;
        result.description = 'Held primordial rites and acoustic chants in the sanctuary halls.';
        result.specialBonus = 'All active defenders gain Advantage on their next initiative roll.';
        break;
      default:
        result.orderPointsEarned = 10;
        result.description = 'Routine maintenance and patrols performed.';
    }

    bastion.orderPoints = (bastion.orderPoints || 100) + result.orderPointsEarned;

    // Bastion Random Event (d20 check)
    const eventRoll = Math.floor(Math.random() * 20) + 1;
    if (eventRoll >= 18) {
      result.randomEvent = {
        title: 'Primordial Alignment Blessing',
        desc: 'An elemental aurora bathed the stronghold. Order points gained this turn are doubled!'
      };
      bastion.orderPoints += result.orderPointsEarned;
    } else if (eventRoll <= 3) {
      result.randomEvent = {
        title: 'Bleedland Storm Squall',
        desc: 'A volatile thermal-frost storm tested the ramparts. Defenders held, but 50 GP was spent on repairs.'
      };
    }

    this.saveData();
    return result;
  }

  // Quest status update
  updateQuestStatus(questId, newStatus) {
    const quest = this.data.rumors.find(r => r.id === questId);
    if (quest) {
      quest.status = newStatus;
      this.saveData();
    }
  }

  // ==========================================
  // PARTY ROSTER & CHARACTER METHODS
  // ==========================================
  addPartyCharacter(charData) {
    if (!this.data.partyCharacters) this.data.partyCharacters = [];
    if (!charData.id) {
      charData.id = 'pc-' + Date.now();
    }
    this.data.partyCharacters.push(charData);
    this.saveData();
    return charData;
  }

  updatePartyCharacter(charId, updates) {
    const index = (this.data.partyCharacters || []).findIndex(c => c.id === charId);
    if (index !== -1) {
      this.data.partyCharacters[index] = { ...this.data.partyCharacters[index], ...updates };
      this.saveData();
      return this.data.partyCharacters[index];
    }
    return null;
  }

  createPartyCharacter(charData, userId = null) {
    if (!this.data.partyCharacters) this.data.partyCharacters = [];

    const initials = (charData.name || 'Hero')
      .split(' ')
      .filter(w => w.length > 0)
      .map(w => w[0].toUpperCase())
      .slice(0, 2)
      .join('') || 'PC';

    const charId = 'pc-' + Date.now();
    const activeUser = userId 
      ? (this.data.users || []).find(u => u.id === userId)
      : this.getActiveUser();

    const stats = {
      str: parseInt(charData.stats?.str, 10) || 10,
      dex: parseInt(charData.stats?.dex, 10) || 10,
      con: parseInt(charData.stats?.con, 10) || 10,
      int: parseInt(charData.stats?.int, 10) || 10,
      wis: parseInt(charData.stats?.wis, 10) || 10,
      cha: parseInt(charData.stats?.cha, 10) || 10
    };

    const getMod = (val) => Math.floor((val - 10) / 2);
    const conMod = getMod(stats.con);
    const dexMod = getMod(stats.dex);
    const wisMod = getMod(stats.wis);

    const level = parseInt(charData.level, 10) || 1;
    const hitDie = parseInt(charData.hitDie, 10) || 10;
    const baseHp = hitDie + conMod + (level > 1 ? (level - 1) * (Math.floor(hitDie / 2) + 1 + conMod) : 0);
    const calculatedHp = Math.max(1, charData.hpMax || baseHp);

    let defaultAc = 10 + dexMod;
    if (charData.classRole && charData.classRole.includes('Barbarian')) {
      defaultAc = 10 + dexMod + conMod;
    } else if (charData.classRole && charData.classRole.includes('Monk')) {
      defaultAc = 10 + dexMod + wisMod;
    } else if (charData.classRole && (charData.classRole.includes('Fighter') || charData.classRole.includes('Paladin'))) {
      defaultAc = 16;
    } else {
      defaultAc = 11 + dexMod;
    }

    const calculatedAc = charData.ac || defaultAc;
    const initMod = dexMod >= 0 ? `+${dexMod}` : `${dexMod}`;

    const newChar = {
      id: charId,
      name: (charData.name || 'Unnamed Champion').trim(),
      playerName: activeUser ? activeUser.displayName : (charData.playerName || 'Adventurer'),
      userId: activeUser ? activeUser.id : null,
      ownerUserId: activeUser ? activeUser.id : null,
      claimedUserId: activeUser ? activeUser.id : null,
      level: level,
      species: charData.species || 'Human',
      classRole: charData.classRole || 'Fighter',
      alignment: charData.alignment || 'Neutral Good',
      background: charData.background || 'Wayfarer',
      originFeat: charData.originFeat || 'Lucky',
      avatar: initials,
      hpCurrent: calculatedHp,
      hpMax: calculatedHp,
      tempHp: 0,
      ac: calculatedAc,
      speed: charData.speed || '30 ft',
      initiativeMod: initMod,
      passivePerception: 10 + wisMod,
      passiveInsight: 10 + wisMod,
      stats: stats,
      statMethod: charData.statMethod || 'custom',
      weaponMasteries: charData.weaponMasteries || ['Topple (Warhammer)', 'Cleave (Greataxe)'],
      equipment: charData.equipment || ["Explorer's Pack", "Dungeoneer's Pack", "Rations (5 days)"],
      features: charData.features || [],
      entryPoint: charData.entryPoint || {
        regionId: 'region-foregrove',
        regionName: 'The Foregrove Canopy',
        locationName: 'Verdant Border Gate',
        entryBackstory: charData.backstory || 'Journeyed into the Bleeding Realms in search of ancient primordial knowledge.',
        dmHook: charData.dmHook || 'Carries a strange etched token discovered during the journey.'
      }
    };

    this.data.partyCharacters.push(newChar);

    if (activeUser) {
      activeUser.claimedCharId = charId;
    }

    this.prefs.activeHeroId = charId;
    this.savePrefs(true);
    this.saveData();

    return newChar;
  }

  deletePartyCharacter(charId) {
    if (this.data.partyCharacters) {
      this.data.partyCharacters = this.data.partyCharacters.filter(c => c.id !== charId);
      this.saveData();
    }
  }

  adjustPartyHp(charId, delta, isTemp = false) {
    if (!this.canControlCharacter(charId)) return;
    const char = (this.data.partyCharacters || []).find(c => c.id === charId);
    if (!char) return;
    if (isTemp) {
      char.tempHp = Math.max(0, (char.tempHp || 0) + delta);
    } else {
      if (delta < 0 && (char.tempHp || 0) > 0) {
        const absorb = Math.min(char.tempHp, Math.abs(delta));
        char.tempHp -= absorb;
        const remainder = Math.abs(delta) - absorb;
        char.hpCurrent = Math.max(0, Math.min(char.hpMax, (char.hpCurrent || char.hpMax) - remainder));
      } else {
        char.hpCurrent = Math.max(0, Math.min(char.hpMax, (char.hpCurrent || char.hpMax) + delta));
      }
    }
    this.saveData();
  }

  togglePartyCondition(charId, conditionName) {
    if (!this.canControlCharacter(charId)) return;
    const char = (this.data.partyCharacters || []).find(c => c.id === charId);
    if (!char) return;
    if (!char.conditions) char.conditions = [];
    const idx = char.conditions.indexOf(conditionName);
    if (idx !== -1) {
      char.conditions.splice(idx, 1);
    } else {
      char.conditions.push(conditionName);
    }
    this.saveData();
  }

  partyLongRest(targetCharId = null) {
    const isDm = Boolean(this.prefs && this.prefs.dmMode);
    (this.data.partyCharacters || []).forEach(c => {
      if (targetCharId && c.id !== targetCharId) return;
      if (!isDm && !this.canControlCharacter(c.id, c)) return;
      c.hpCurrent = c.hpMax;
      c.tempHp = 0;
      if (c.classResources && c.classResources.max) {
        c.classResources.current = c.classResources.max;
      }
      c.conditions = (c.conditions || []).filter(cond => cond !== 'Poisoned' && cond !== 'Exhaustion');
    });
    this.saveData();
  }

  partyShortRest(targetCharId = null) {
    const isDm = Boolean(this.prefs && this.prefs.dmMode);
    (this.data.partyCharacters || []).forEach(c => {
      if (targetCharId && c.id !== targetCharId) return;
      if (!isDm && !this.canControlCharacter(c.id, c)) return;
      const heal = Math.floor(c.hpMax * 0.4);
      c.hpCurrent = Math.min(c.hpMax, (c.hpCurrent || 0) + heal);
    });
    this.saveData();
  }

  updatePartyGold(delta) {
    if (!this.data.partySettings) {
      this.data.partySettings = { partyGold: 300, partyName: 'The Bleedland Wayfarers', partyLevel: 5 };
    }
    this.data.partySettings.partyGold = Math.max(0, (this.data.partySettings.partyGold || 0) + delta);
    this.saveData();
  }

  // ==========================================
  // PLAYER ACCOUNT & AUTHENTICATION
  // ==========================================
  registerUser(username, password, displayName, avatar = 'PC', initialCharId = null) {
    if (!this.data.users) this.data.users = [];
    const cleanUsername = username.trim().toLowerCase();
    const existing = this.data.users.find(u => u.username.toLowerCase() === cleanUsername);
    if (existing) {
      return { success: false, error: 'Username already taken. Please choose another.' };
    }

    const newUser = {
      id: 'user-' + Date.now(),
      username: cleanUsername,
      password: password.trim(),
      displayName: displayName.trim() || username.trim(),
      avatar: avatar || 'PC',
      claimedCharId: initialCharId || null,
      createdAt: Date.now()
    };

    this.data.users.push(newUser);
    this.saveData();
    this.loginUser(newUser.username, newUser.password);
    return { success: true, user: newUser };
  }

  loginUser(username, password) {
    if (!this.data.users) this.data.users = [];
    const cleanUsername = username.trim().toLowerCase();
    const user = this.data.users.find(u => u.username.toLowerCase() === cleanUsername);
    if (!user) {
      return { success: false, error: 'Account not found. Check username or register.' };
    }
    if (user.password !== password.trim()) {
      return { success: false, error: 'Incorrect password.' };
    }

    this.prefs.activeUserId = user.id;
    if (user.claimedCharId) {
      this.prefs.activeHeroId = user.claimedCharId;
    }
    this.savePrefs();
    return { success: true, user };
  }

  logoutUser() {
    this.prefs.activeUserId = null;
    this.savePrefs();
  }

  getActiveUser() {
    if (!this.prefs.activeUserId || !this.data.users) return null;
    return this.data.users.find(u => u.id === this.prefs.activeUserId) || null;
  }

  claimCharacter(userId, charId) {
    const user = (this.data.users || []).find(u => u.id === userId);
    this.prefs.activeHeroId = charId;
    this.savePrefs(true);
    if (user) {
      user.claimedCharId = charId;
      const char = (this.data.partyCharacters || []).find(c => c.id === charId);
      if (char) {
        char.playerName = user.displayName;
      }
      this.saveData();
    } else {
      this.notify();
    }
  }

  setActiveHero(charId) {
    this.prefs.activeHeroId = charId;
    this.savePrefs();
  }

  getActiveHero() {
    const chars = this.data.partyCharacters || [];
    if (this.prefs.activeHeroId) {
      const found = chars.find(c => c.id === this.prefs.activeHeroId);
      if (found) return found;
    }
    return chars[0] || null;
  }

  // ==========================================
  // CHARACTER OWNERSHIP & PERMISSION ENFORCEMENT
  // ==========================================
  canControlCharacter(charOrId, entity = null) {
    // 1. Dungeon Master can control everything
    if (this.prefs && this.prefs.dmMode) return true;

    // 2. If entity is specified and is an enemy or hostile NPC, only DM can control
    if (entity && entity.team && entity.team !== 'player') return false;

    // 3. Resolve target character ID
    let targetId = typeof charOrId === 'string' ? charOrId : (charOrId ? charOrId.id : null);
    if (!targetId && entity) targetId = entity.id;

    if (typeof targetId === 'string' && targetId.startsWith('party_')) {
      targetId = targetId.replace('party_', '');
    }

    // 4. Resolve character from partyCharacters
    const party = this.data.partyCharacters || [];
    const charObj = party.find(c => c.id === targetId || (entity && c.name === entity.name));

    // 5. Resolve active user
    const activeUser = this.getActiveUser();

    // If a user account is signed in:
    if (activeUser) {
      if (activeUser.claimedCharId && (activeUser.claimedCharId === targetId || (charObj && charObj.id === activeUser.claimedCharId))) {
        return true;
      }
      if (charObj) {
        if (charObj.claimedUserId && charObj.claimedUserId === activeUser.id) return true;
        if (charObj.ownerUserId && charObj.ownerUserId === activeUser.id) return true;
        if (charObj.playerName && activeUser.displayName && charObj.playerName.trim().toLowerCase() === activeUser.displayName.trim().toLowerCase()) return true;
        if (charObj.playerName && activeUser.username && charObj.playerName.trim().toLowerCase() === activeUser.username.trim().toLowerCase()) return true;
      }
      return false;
    }

    return false;
  }

  getCharacterOwnerName(charOrId, entity = null) {
    let targetId = typeof charOrId === 'string' ? charOrId : (charOrId ? charOrId.id : null);
    if (!targetId && entity) targetId = entity.id;
    if (typeof targetId === 'string' && targetId.startsWith('party_')) {
      targetId = targetId.replace('party_', '');
    }
    const party = this.data.partyCharacters || [];
    const charObj = party.find(c => c.id === targetId || (entity && c.name === entity.name));
    if (charObj && charObj.playerName) return charObj.playerName;
    const users = this.data.users || [];
    const user = users.find(u => u.claimedCharId === targetId);
    if (user) return user.displayName;
    return 'Dungeon Master';
  }

  // ==========================================
  // CAMPAIGN DAILY JOURNAL & SITUATION NOTES
  // ==========================================
  getJournalEntriesForChar(charId) {
    if (!this.data.journalEntries) this.data.journalEntries = [];
    return this.data.journalEntries.filter(j => j.charId === charId);
  }

  addJournalEntry(entry) {
    if (!this.data.journalEntries) this.data.journalEntries = [];
    const newEntry = {
      id: 'j-' + Date.now(),
      charId: entry.charId,
      day: entry.day || 'Day 1',
      title: entry.title || 'Untitled Daily Entry',
      location: entry.location || 'The Bleeding Realms',
      notes: entry.notes || '',
      situation: entry.situation || '',
      tags: entry.tags || ['Journal'],
      isPrivate: !!entry.isPrivate,
      timestamp: Date.now()
    };
    this.data.journalEntries.unshift(newEntry);

    // If situation note is provided, update character's active situation
    if (entry.situation) {
      this.updateCharacterSituation(entry.charId, entry.location, entry.situation, entry.day);
    } else {
      this.saveData();
    }
    return newEntry;
  }

  updateJournalEntry(entryId, updated) {
    if (!this.data.journalEntries) return;
    const item = this.data.journalEntries.find(j => j.id === entryId);
    if (item) {
      Object.assign(item, updated, { lastModified: Date.now() });
      this.saveData();
    }
  }

  deleteJournalEntry(entryId) {
    if (!this.data.journalEntries) return;
    this.data.journalEntries = this.data.journalEntries.filter(j => j.id !== entryId);
    this.saveData();
  }

  updateCharacterSituation(charId, locationName, statusNote, lastUpdatedDay = 'Today') {
    const char = (this.data.partyCharacters || []).find(c => c.id === charId);
    if (char) {
      if (!char.currentSituation) {
        char.currentSituation = {};
      }
      if (locationName) char.currentSituation.locationName = locationName;
      if (statusNote) char.currentSituation.statusNote = statusNote;
      if (lastUpdatedDay) char.currentSituation.lastUpdatedDay = lastUpdatedDay;
      this.saveData();
    }
  }

  // ==========================================
  // SYNCHRONIZED DICE ROLL LOGGING
  // ==========================================
  logDiceRoll({ rollerName, rollerAvatar, rollType = 'dice_roller', label = 'Roll', formula = '', d20Result = null, total = 0, dc = null, success = null, advantageMode = 'normal', note = '' }) {
    if (!this.data.diceRollLogs) this.data.diceRollLogs = [];
    const numTotal = Number(total);
    const numDc = dc !== null && dc !== undefined && dc !== '' ? Number(dc) : null;
    let isSuccess = success;
    if (isSuccess === null && numDc !== null) {
      isSuccess = numTotal >= numDc;
    }

    const entry = {
      id: 'roll_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      rollerName: rollerName || 'Adventurer',
      rollerAvatar: rollerAvatar || '🎲',
      rollType, // 'save' | 'check' | 'attack' | 'damage' | 'dice_roller' | 'contest'
      label: label || 'Roll',
      formula: formula || String(numTotal),
      d20Result: typeof d20Result === 'number' ? d20Result : null,
      total: numTotal,
      dc: numDc,
      success: isSuccess,
      isCrit: d20Result === 20,
      isNat1: d20Result === 1,
      advantageMode: advantageMode || 'normal',
      note: note || '',
      timestamp: Date.now(),
      timeStr: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    this.data.diceRollLogs.unshift(entry);
    if (this.data.diceRollLogs.length > 80) this.data.diceRollLogs.pop();
    this.saveData();
    return entry;
  }

  getDiceRollLogs(limit = 50) {
    if (!this.data.diceRollLogs) this.data.diceRollLogs = [];
    return this.data.diceRollLogs.slice(0, limit);
  }

  clearDiceRollLogs() {
    this.data.diceRollLogs = [];
    this.saveData();
  }

  // ==========================================
  // DM ROLL & SAVING THROW REQUESTS
  // ==========================================
  pushRollRequest({ targetCharId = 'ALL', targetPlayerName = 'All Players', requestedBy = 'DM', type = 'save', ability = 'DEX', skill = null, dc = null, reason = '' }) {
    if (!this.data.pendingRollRequests) this.data.pendingRollRequests = [];
    const req = {
      id: 'req_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      targetCharId: targetCharId || 'ALL',
      targetPlayerName: targetPlayerName || 'All Players',
      requestedBy: requestedBy || 'DM',
      type: type || 'save', // 'save' | 'check'
      ability: (ability || 'DEX').toUpperCase(),
      skill: skill || null,
      dc: dc !== null && dc !== undefined && dc !== '' ? Number(dc) : null,
      reason: reason || '',
      createdAt: Date.now(),
      status: 'pending'
    };

    this.data.pendingRollRequests.unshift(req);
    if (this.data.pendingRollRequests.length > 25) this.data.pendingRollRequests.pop();
    this.saveData();
    return req;
  }

  resolveRollRequest(requestId, rollData = null) {
    if (!this.data.pendingRollRequests) return;
    this.data.pendingRollRequests = this.data.pendingRollRequests.filter(r => r.id !== requestId);
    if (rollData) {
      this.logDiceRoll(rollData);
    } else {
      this.saveData();
    }
  }

  dismissRollRequest(requestId) {
    if (!this.data.pendingRollRequests) return;
    this.data.pendingRollRequests = this.data.pendingRollRequests.filter(r => r.id !== requestId);
    this.saveData();
  }

  getPendingRollRequests(forCharId = null) {
    if (!this.data.pendingRollRequests) this.data.pendingRollRequests = [];
    if (!forCharId) return this.data.pendingRollRequests;
    return this.data.pendingRollRequests.filter(r => r.targetCharId === 'ALL' || r.targetCharId === forCharId);
  }

  // ==========================================
  // SOCIAL / ROLEPLAY MESSAGES & SCENE
  // ==========================================
  sendSocialMessage({ senderName, senderAvatar = 'PC', senderRole = 'Player', text, type = 'ic' }) {
    if (!this.data.socialMessages) this.data.socialMessages = [];
    if (!text || !text.trim()) return;

    const msg = {
      id: 'msg_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      senderName: senderName || 'Adventurer',
      senderAvatar: senderAvatar || 'PC',
      senderRole: senderRole || 'Player',
      type: type || 'ic', // 'ic' | 'ooc' | 'dm_narration' | 'emote'
      text: text.trim(),
      timestamp: Date.now(),
      timeStr: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    this.data.socialMessages.push(msg);
    if (this.data.socialMessages.length > 100) this.data.socialMessages.shift();
    this.saveData();
    return msg;
  }

  getSocialMessages(limit = 60) {
    if (!this.data.socialMessages) this.data.socialMessages = [];
    return this.data.socialMessages.slice(-limit);
  }

  updateSocialScene(sceneData) {
    if (!this.data.socialScene) this.data.socialScene = {};
    Object.assign(this.data.socialScene, sceneData);
    this.saveData();
  }

  toggleCharacterInspiration(charId) {
    const char = (this.data.partyCharacters || []).find(c => c.id === charId);
    if (char) {
      char.inspiration = !char.inspiration;
      this.saveData();
      return char.inspiration;
    }
    return false;
  }

  // Full Export/Import
  exportWorldJson() {
    return JSON.stringify(this.data, null, 2);
  }

  importWorldJson(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.metadata && parsed.regions && parsed.characters) {
        this.data = parsed;
        this.saveData();
        return { success: true };
      }
      return { success: false, error: 'JSON does not match world data structure.' };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  resetToDefault() {
    this.data = JSON.parse(JSON.stringify(INITIAL_WORLD_DATA));
    this.saveData();
  }
}
const worldState = new WorldStateManager();

  // 3. SOUND ENGINE
/**
 * Web Audio API Procedural Sound Engine
 * Generates ambient elemental soundscapes and tactical dice sounds without external assets.
 */

class ProceduralSoundEngine {
  constructor() {
    this.ctx = null;
    this.currentTrack = null;
    this.gainNode = null;
    this.isMuted = true;
    this.activeNodes = [];
  }

  initContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(0.25, this.ctx.currentTime);
        this.gainNode.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setTargetAtTime(muted ? 0 : 0.25, this.ctx.currentTime, 0.1);
    }
    if (!muted && !this.currentTrack) {
      this.playAmbience('ambient-fire');
    }
  }

  stopAmbience() {
    this.activeNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        node.disconnect();
      } catch (e) {}
    });
    this.activeNodes = [];
    this.currentTrack = null;
  }

  playAmbience(type) {
    this.initContext();
    if (!this.ctx) return;
    this.stopAmbience();
    this.currentTrack = type;

    if (this.isMuted) return;

    switch (type) {
      case 'ambient-fire':
      case 'fire':
        this.createFireAmbience();
        break;
      case 'ambient-frost':
      case 'frost':
      case 'water':
        this.createFrostAmbience();
        break;
      case 'ambient-earth':
      case 'earth':
        this.createEarthAmbience();
        break;
      case 'ambient-monastery':
      case 'monastery':
      case 'air':
        this.createMonasteryAmbience();
        break;
      case 'ambient-forest':
      case 'forest':
        this.createForestAmbience();
        break;
      default:
        this.createFireAmbience();
    }
  }

  // Generates brown/pink noise buffer
  createNoiseBuffer() {
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5;
    }
    return buffer;
  }

  createFireAmbience() {
    // Low furnace drone + crackling filter
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.createNoiseBuffer();
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(55, this.ctx.currentTime); // Low A

    const oscGain = this.ctx.createGain();
    oscGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(this.gainNode);
    osc.connect(oscGain);
    oscGain.connect(this.gainNode);

    noise.start();
    osc.start();
    this.activeNodes.push(noise, filter, osc, oscGain);
  }

  createFrostAmbience() {
    // High howling wind + icy resonance
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.createNoiseBuffer();
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(650, this.ctx.currentTime);
    filter.Q.setValueAtTime(4, this.ctx.currentTime);

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    const oscGain = this.ctx.createGain();
    oscGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(this.gainNode);
    osc.connect(oscGain);
    oscGain.connect(this.gainNode);

    noise.start();
    osc.start();
    this.activeNodes.push(noise, filter, osc, oscGain);
  }

  createEarthAmbience() {
    // Deep sub drone + rhythmic anvil ping simulation
    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(45, this.ctx.currentTime);

    const oscGain = this.ctx.createGain();
    oscGain.gain.setValueAtTime(0.15, this.ctx.currentTime);

    osc.connect(oscGain);
    oscGain.connect(this.gainNode);
    osc.start();
    this.activeNodes.push(osc, oscGain);
  }

  createMonasteryAmbience() {
    // Singing bowl harmonic drone
    [130.81, 196.00, 261.63, 392.00].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(0.05 / (i + 1), this.ctx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(this.gainNode);
      osc.start();
      this.activeNodes.push(osc, oscGain);
    });
  }

  createForestAmbience() {
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.createNoiseBuffer();
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(480, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(this.gainNode);
    noise.start();
    this.activeNodes.push(noise, filter);
  }

  // Play a tactile dice clatter
  playDiceRoll(isCritical = false) {
    this.initContext();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    for (let i = 0; i < 4; i++) {
      const click = this.ctx.createOscillator();
      const clickGain = this.ctx.createGain();

      click.type = 'triangle';
      click.frequency.setValueAtTime(180 + Math.random() * 240, now + (i * 0.05));
      clickGain.gain.setValueAtTime(0.3, now + (i * 0.05));
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + (i * 0.05) + 0.04);

      click.connect(clickGain);
      clickGain.connect(this.gainNode);

      click.start(now + (i * 0.05));
      click.stop(now + (i * 0.05) + 0.05);
    }

    if (isCritical) {
      setTimeout(() => {
        const chime = this.ctx.createOscillator();
        const chimeGain = this.ctx.createGain();
        chime.type = 'sine';
        chime.frequency.setValueAtTime(880, this.ctx.currentTime);
        chimeGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
        chime.connect(chimeGain);
        chimeGain.connect(this.gainNode);
        chime.start();
        chime.stop(this.ctx.currentTime + 1.2);
      }, 250);
    }
  }
}
const soundEngine = new ProceduralSoundEngine();

  // COMPONENT: mapView.js
/**
 * Detailed Fantasy World Map with Fluid Wheel Zoom & Drag Panning
 */
function renderMapView(container) {
  const { data } = worldState;

  container.innerHTML = `
    <div class="map-module-wrapper">
      <div class="map-controls-bar">
        <div class="map-filters" id="map-filters-group">
          <button class="filter-chip active" data-filter="all">All Bleeding Realms</button>
          <button class="filter-chip" data-filter="Fire">Fire Domain</button>
          <button class="filter-chip" data-filter="Earth">Earth Domain</button>
          <button class="filter-chip" data-filter="Water">Water Domain</button>
          <button class="filter-chip" data-filter="Air">Air Domain</button>
          <button class="filter-chip" data-filter="Bleedland">Bleedlands (Transition Zones)</button>
          <button class="filter-chip" data-filter="Bastion">Strongholds & Bastions</button>
        </div>
        <div class="map-action-btns">
          <span style="font-family: var(--font-sans); font-size: 0.75rem; color: var(--text-muted); align-self: center; margin-right: 0.5rem;">
            Scroll wheel to zoom • Drag to pan
          </span>
          <button class="btn" id="map-center-btn">Center Map</button>
        </div>
      </div>

      <div class="map-canvas-container" id="map-container">
        <svg id="world-map-svg" class="interactive-map-svg" viewBox="0 0 1000 562" preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter id="pin-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.8"/>
            </filter>
          </defs>

          <!-- Master Hand-Drawn Fantasy Map Illustration Background -->
          <image href="assets/world_map.jpg" x="0" y="0" width="1000" height="562" preserveAspectRatio="xMidYMid slice" />

          <!-- Delicate Leyline Resonance Web (stroke-only, fill=none) -->
          <g stroke="#d4af37" stroke-width="1.5" stroke-dasharray="5,5" stroke-opacity="0.65" fill="none">
            <path d="M 160,290 Q 330,280 500,270 T 780,370" />
            <path d="M 670,170 Q 580,220 500,270 T 190,440" />
            <path d="M 190,440 Q 400,430 620,430 T 780,370" />
            <path d="M 260,155 Q 380,210 440,360 T 860,445" />
          </g>

          <!-- Interactive Pins Layer -->
          <g id="map-pins-layer"></g>
        </svg>

        <!-- Location Inspector Flyout Panel -->
        <div class="map-flyout-panel" id="map-flyout">
          <div class="flyout-header">
            <div>
              <h3 id="flyout-title">Region Name</h3>
              <span id="flyout-domain" class="flyout-meta-badge">Domain</span>
            </div>
            <button class="close-btn" id="flyout-close-btn">&times;</button>
          </div>
          <div class="flyout-body" id="flyout-body"></div>
        </div>

        <div class="map-zoom-controls">
          <button class="zoom-btn" id="zoom-in-btn" title="Zoom In">+</button>
          <button class="zoom-btn" id="zoom-out-btn" title="Zoom Out">−</button>
          <button class="zoom-btn" id="zoom-reset-btn" title="Reset Zoom">↺</button>
        </div>
      </div>
    </div>
  `;

  initMapInteractivity(container);
}

function initMapInteractivity(container) {
  const { data } = worldState;
  const mapContainer = container.querySelector('#map-container');
  const svg = container.querySelector('#world-map-svg');
  const pinsLayer = container.querySelector('#map-pins-layer');
  const flyout = container.querySelector('#map-flyout');
  const flyoutBody = container.querySelector('#flyout-body');
  const flyoutTitle = container.querySelector('#flyout-title');
  const flyoutDomain = container.querySelector('#flyout-domain');
  const flyoutClose = container.querySelector('#flyout-close-btn');

  let currentFilter = 'all';

  // Base map dimensions
  const BASE_W = 1000;
  const BASE_H = 562;

  // ViewBox State
  let curX = 0;
  let curY = 0;
  let curW = BASE_W;
  let curH = BASE_H;
  let zoomLevel = 1.0;

  // Dragging state
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let startViewX = 0;
  let startViewY = 0;

  const regionCoords = {
    'region-glacial-crags': { x: 260, y: 155 },
    'region-aquas': { x: 160, y: 290 },
    'region-terran': { x: 190, y: 440 },
    'region-foregrove': { x: 440, y: 360 },
    'region-crucible': { x: 500, y: 270 },
    'region-mist-spires': { x: 670, y: 170 },
    'region-zephyr': { x: 770, y: 200 },
    'region-cinder-steppes': { x: 710, y: 295 },
    'region-slagfields': { x: 620, y: 430 },
    'region-pyros': { x: 780, y: 370 },
    'region-ebonflame': { x: 860, y: 445 }
  };

  function updateViewBox(smooth = false) {
    // Clamp dimensions
    zoomLevel = Math.max(0.75, Math.min(zoomLevel, 4.0));
    curW = BASE_W / zoomLevel;
    curH = BASE_H / zoomLevel;

    // Clamp coordinates to keep map in view
    const minX = -BASE_W * 0.2;
    const maxX = BASE_W * 1.2 - curW;
    const minY = -BASE_H * 0.2;
    const maxY = BASE_H * 1.2 - curH;

    curX = Math.max(minX, Math.min(curX, maxX));
    curY = Math.max(minY, Math.min(curY, maxY));

    svg.setAttribute('viewBox', `${curX} ${curY} ${curW} ${curH}`);
  }

  function renderPins() {
    pinsLayer.innerHTML = '';

    data.regions.forEach(region => {
      if (currentFilter !== 'all') {
        if (currentFilter === 'Bleedland' && region.type !== 'Bleedland') return;
        if (currentFilter === 'Bastion' && !region.pointsOfInterest.some(p => p.type.includes('Bastion'))) return;
        if (['Fire', 'Earth', 'Water', 'Air'].includes(currentFilter) && !region.domain.includes(currentFilter)) return;
      }

      const coords = regionCoords[region.id] || { x: region.coordinates.x * 10, y: region.coordinates.y * 5.6 };
      const posX = coords.x;
      const posY = coords.y;

      const pinG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      pinG.setAttribute('class', 'map-pin');
      pinG.setAttribute('transform', `translate(${posX}, ${posY})`);
      pinG.setAttribute('data-region-id', region.id);

      const isBastion = region.pointsOfInterest.some(p => p.type.includes('Bastion'));
      const emblemSymbol = isBastion ? 'B' : region.type === 'Bleedland' ? '*' : 'R';

      // Generous initial estimate based on Cinzel uppercase character metrics so text NEVER overflows container box
      const charWidth = 7.4;
      const padX = 14;
      const initialWidth = Math.max(90, Math.ceil(region.name.length * charWidth + padX * 2));
      const initialX = -Math.round(initialWidth / 2);

      pinG.innerHTML = `
        <circle cx="0" cy="0" r="18" fill="${region.color}" fill-opacity="0.3" class="map-pin-pulse" />
        
        <g class="pin-core" filter="url(#pin-glow)">
          <circle cx="0" cy="0" r="12" fill="#2b1f14" stroke="#d4af37" stroke-width="2" />
          <circle cx="0" cy="0" r="9" fill="${region.color}" fill-opacity="0.9"/>
          <text x="0" y="3.5" font-family="sans-serif" font-size="9" fill="#ffffff" text-anchor="middle" font-weight="bold">${emblemSymbol}</text>
        </g>

        <g transform="translate(0, 22)" class="pin-label-group" filter="url(#pin-glow)">
          <rect x="${initialX}" y="-9" width="${initialWidth}" height="18" rx="4" fill="#1e140c" fill-opacity="0.94" stroke="#d4af37" stroke-width="1" />
          <text x="0" y="3.5" font-family="Cinzel, serif" font-size="9" font-weight="700" 
                fill="#f5eedb" text-anchor="middle" class="pin-label">${region.name}</text>
        </g>
      `;

      pinG.addEventListener('click', (e) => {
        e.stopPropagation();
        openFlyout(region);
      });

      pinsLayer.appendChild(pinG);
    });

    // Precise dynamic autosizing for all pin label containers based on rendered text dimensions
    function autoSizePinLabels() {
      pinsLayer.querySelectorAll('.map-pin').forEach(pin => {
        try {
          const textEl = pin.querySelector('.pin-label');
          const rectEl = pin.querySelector('.pin-label-group rect');
          if (textEl && rectEl) {
            const computedLen = textEl.getComputedTextLength ? textEl.getComputedTextLength() : 0;
            if (computedLen > 10) {
              const exactWidth = Math.ceil(computedLen + 20); // 10px clean padding on each side
              rectEl.setAttribute('width', exactWidth);
              rectEl.setAttribute('x', -Math.round(exactWidth / 2));
            }
          }
        } catch (e) {}
      });
    }

    autoSizePinLabels();
    requestAnimationFrame(autoSizePinLabels);
    setTimeout(autoSizePinLabels, 100);
    setTimeout(autoSizePinLabels, 300);
    if (document.fonts) {
      document.fonts.ready.then(autoSizePinLabels);
    }
  }

  function openFlyout(region) {
    flyoutTitle.textContent = region.name;
    flyoutDomain.textContent = `${region.domain} • ${region.type}`;

    let html = `
      <p><strong>Capital / Seat:</strong> ${region.capital}</p>
      <p><strong>Ruler / Vanguard:</strong> ${region.ruler}</p>
      <p><strong>Climate & Atmosphere:</strong> ${region.climate}</p>
      <p><strong>Danger Rating:</strong> <span style="color: #bf360c; font-weight: bold;">${region.dangerLevel}</span></p>
      
      <div style="margin-top: 0.5rem;">
        <h4>Cartographic Lore</h4>
        <p>${region.overview}</p>
      </div>

      <div style="margin-top: 0.5rem;">
        <h4>Strongholds & Points of Interest</h4>
        <ul class="poi-list">
          ${region.pointsOfInterest.map(poi => `
            <li class="poi-item">
              <div class="poi-name">${poi.name} <span style="font-size: 0.75rem; color: #8d6e4f;">[${poi.type}]</span></div>
              <div class="poi-desc">${poi.desc}</div>
            </li>
          `).join('')}
        </ul>
      </div>
    `;

    if (worldState.prefs.dmMode && region.dmNotes) {
      html += `
        <div class="dm-secret-banner" style="background: rgba(198, 40, 40, 0.12); border: 1px dashed #c62828; border-radius: 6px; padding: 0.75rem; margin-top: 0.75rem;">
          <div class="banner-title" style="color: #c62828; font-weight: bold; font-size: 0.8rem;">DM Confidential Note</div>
          <div class="banner-text" style="color: #4e342e; font-size: 0.9rem;">${region.dmNotes}</div>
        </div>
      `;
    }

    flyoutBody.innerHTML = html;
    flyout.classList.add('open');
  }

  // Fluid Mouse Wheel Zoom centered on cursor
  mapContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    const rect = svg.getBoundingClientRect();
    const mouseXNorm = (e.clientX - rect.left) / rect.width;
    const mouseYNorm = (e.clientY - rect.top) / rect.height;

    // SVG point before zoom
    const targetSvgX = curX + mouseXNorm * curW;
    const targetSvgY = curY + mouseYNorm * curH;

    // Calculate zoom delta
    const zoomDelta = e.deltaY < 0 ? 1.15 : 0.87;
    const nextZoom = Math.max(0.75, Math.min(zoomLevel * zoomDelta, 4.0));

    if (nextZoom !== zoomLevel) {
      zoomLevel = nextZoom;
      const nextW = BASE_W / zoomLevel;
      const nextH = BASE_H / zoomLevel;

      curX = targetSvgX - mouseXNorm * nextW;
      curY = targetSvgY - mouseYNorm * nextH;
      curW = nextW;
      curH = nextH;

      updateViewBox();
    }
  }, { passive: false });

  // Fluid Click-and-Drag Panning
  svg.addEventListener('mousedown', (e) => {
    if (e.target.closest('.map-pin') || e.target.closest('.map-flyout-panel')) return;
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    startViewX = curX;
    startViewY = curY;
    svg.classList.add('panning');
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const rect = svg.getBoundingClientRect();
    const deltaScreenX = e.clientX - dragStartX;
    const deltaScreenY = e.clientY - dragStartY;

    const deltaSvgX = (deltaScreenX / rect.width) * curW;
    const deltaSvgY = (deltaScreenY / rect.height) * curH;

    curX = startViewX - deltaSvgX;
    curY = startViewY - deltaSvgY;
    updateViewBox();
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      svg.classList.remove('panning');
    }
  });

  // Filter chips
  container.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      container.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentFilter = chip.getAttribute('data-filter');
      renderPins();
    });
  });

  flyoutClose.addEventListener('click', () => flyout.classList.remove('open'));

  // Step Zoom Buttons
  container.querySelector('#zoom-in-btn').addEventListener('click', () => {
    const centerSvgX = curX + curW / 2;
    const centerSvgY = curY + curH / 2;
    zoomLevel = Math.min(zoomLevel * 1.25, 4.0);
    const nextW = BASE_W / zoomLevel;
    const nextH = BASE_H / zoomLevel;
    curX = centerSvgX - nextW / 2;
    curY = centerSvgY - nextH / 2;
    updateViewBox();
  });

  container.querySelector('#zoom-out-btn').addEventListener('click', () => {
    const centerSvgX = curX + curW / 2;
    const centerSvgY = curY + curH / 2;
    zoomLevel = Math.max(zoomLevel / 1.25, 0.75);
    const nextW = BASE_W / zoomLevel;
    const nextH = BASE_H / zoomLevel;
    curX = centerSvgX - nextW / 2;
    curY = centerSvgY - nextH / 2;
    updateViewBox();
  });

  function resetMap() {
    zoomLevel = 1.0;
    curX = 0;
    curY = 0;
    curW = BASE_W;
    curH = BASE_H;
    updateViewBox();
  }

  container.querySelector('#zoom-reset-btn').addEventListener('click', resetMap);
  container.querySelector('#map-center-btn').addEventListener('click', resetMap);

  resetMap();
  renderPins();
}

  // COMPONENT: characterView.js
/**
 * Character Dossiers View (5.5e Statblocks & Lore)
 */
function renderCharacterView(container) {
  const { data, prefs } = worldState;
  const isDm = prefs.dmMode;

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h2>Legendary Champions & Wardens</h2>
        <div class="view-tagline">Dossiers, 5.5e Statblocks, Tactical Actions, and Secret Backstories</div>
      </div>
      <div style="display: flex; gap: 0.5rem;">
        <input type="text" id="char-search-input" placeholder="Filter champions by name, role, mastery..." 
               class="editor-input" style="width: 280px; padding: 0.4rem 0.75rem;">
      </div>
    </div>

    <div class="cards-grid" id="characters-grid-container">
      <!-- Injected dynamically -->
    </div>
  `;

  const gridContainer = container.querySelector('#characters-grid-container');
  const searchInput = container.querySelector('#char-search-input');

  function renderCards(filterText = '') {
    const term = filterText.toLowerCase();
    const filteredChars = data.characters.filter(c => 
      c.name.toLowerCase().includes(term) ||
      c.title.toLowerCase().includes(term) ||
      c.species.toLowerCase().includes(term) ||
      c.classRole.toLowerCase().includes(term) ||
      c.elementalAffinity.toLowerCase().includes(term) ||
      (c.weaponMastery && c.weaponMastery.some(m => m.toLowerCase().includes(term)))
    );

    if (filteredChars.length === 0) {
      gridContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem;">No champions match your filter.</div>`;
      return;
    }

    gridContainer.innerHTML = filteredChars.map(char => {
      // Elemental emblem icon
      let emblem = '*';
      if (char.elementalAffinity.includes('Fire')) emblem = 'F';
      else if (char.elementalAffinity.includes('Earth')) emblem = 'E';
      else if (char.elementalAffinity.includes('Frost') || char.elementalAffinity.includes('Water')) emblem = 'W';
      else if (char.elementalAffinity.includes('Air')) emblem = 'A';
      else if (char.elementalAffinity.includes('All')) emblem = '*';

      return `
        <div class="char-card" id="card-${char.id}">
          <div class="char-card-header">
            <div class="char-avatar-emblem">${emblem}</div>
            <div class="char-info-top">
              <h3>${char.name}</h3>
              <div class="char-title-tag">${char.title}</div>
            </div>
          </div>

          <div class="char-meta-row">
            <span class="meta-badge">${char.species}</span>
            <span class="meta-badge">${char.classRole}</span>
            <span class="meta-badge" style="color: var(--text-gold);">${char.elementalAffinity}</span>
            <span class="meta-badge">${char.alignment}</span>
          </div>

          <div class="char-quote-box" title="Click to hear resonance" style="cursor: pointer;">
            ${char.quote}
          </div>

          <div class="char-bio">${char.bio}</div>

          <div style="font-size: 0.9rem;">
            <strong>Bastion Seat:</strong> <span style="color: var(--text-gold);">${char.bastion}</span>
          </div>

          <!-- 5.5e Weapon Masteries -->
          <div>
            <div style="font-family: var(--font-sans); font-size: 0.75rem; font-weight: 700; color: var(--text-gold); margin-bottom: 0.35rem;">
              5.5e WEAPON MASTERIES
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
              ${char.weaponMastery.map(m => `<span class="mastery-badge">${m}</span>`).join('')}
            </div>
          </div>

          <!-- 5.5e Statblock Table -->
          <div class="statblock-compact">
            <div class="stats-scores-row">
              <div class="score-box"><div class="score-label">STR</div><div class="score-val">${char.stats5e.str}</div></div>
              <div class="score-box"><div class="score-label">DEX</div><div class="score-val">${char.stats5e.dex}</div></div>
              <div class="score-box"><div class="score-label">CON</div><div class="score-val">${char.stats5e.con}</div></div>
              <div class="score-box"><div class="score-label">INT</div><div class="score-val">${char.stats5e.int}</div></div>
              <div class="score-box"><div class="score-label">WIS</div><div class="score-val">${char.stats5e.wis}</div></div>
              <div class="score-box"><div class="score-label">CHA</div><div class="score-val">${char.stats5e.cha}</div></div>
            </div>
            <div class="stat-summary-row">
              <div><strong>AC:</strong> ${char.stats5e.ac}</div>
              <div><strong>HP:</strong> ${char.stats5e.hp}</div>
              <div><strong>Rating:</strong> <span style="color: var(--text-gold);">${char.stats5e.cr}</span></div>
            </div>
          </div>

          <!-- Tactical Abilities -->
          <div>
            <div style="font-family: var(--font-sans); font-size: 0.75rem; font-weight: 700; color: var(--text-gold); margin-bottom: 0.35rem;">
              TACTICAL & LEGENDARY ACTIONS
            </div>
            <ul class="abilities-list">
              ${char.tacticalAbilities.map(ab => `<li class="ability-item">${ab}</li>`).join('')}
            </ul>
          </div>

          <!-- DM Secret Reveal Banner -->
          ${worldState.prefs.dmMode && char.secretsDM ? `
            <div class="dm-secret-banner">
              <div class="banner-title">DM Confidential Lore & True Motive</div>
              <div class="banner-text">${char.secretsDM}</div>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    // Quote click sound
    gridContainer.querySelectorAll('.char-quote-box').forEach(q => {
      q.addEventListener('click', () => {
        soundEngine.playDiceRoll(true);
      });
    });
  }

  searchInput.addEventListener('input', (e) => {
    renderCards(e.target.value);
  });

  renderCards();
}

  // COMPONENT: factionView.js
/**
 * Factions & Continental Influence Matrix Component for D&D 5.5e
 * Features DM-Exclusive Dynamic Standing Bonuses & Afflictions
 */
function renderFactionView(container) {
  const { data } = worldState;

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h2>Factions & Continental Influence Matrix</h2>
        <div class="view-tagline">Political Power, Alliances, Party Reputation, and DM-Exclusive Standing Boons & Afflictions</div>
      </div>
    </div>
    <div class="cards-grid" id="factions-grid-container"></div>
  `;

  const gridContainer = container.querySelector('#factions-grid-container');

  function renderCards() {
    gridContainer.innerHTML = data.factions.map(faction => {
      const standing = faction.playerStanding || 0;
      let rankLabel = 'Neutral';
      let rankClass = 'neutral';
      if (standing >= 4) { rankLabel = 'Exalted (+4/+5)'; rankClass = 'exalted'; }
      else if (standing >= 2) { rankLabel = 'Honored (+2/+3)'; rankClass = 'friendly'; }
      else if (standing >= 1) { rankLabel = 'Friendly (+1)'; rankClass = 'friendly'; }
      else if (standing <= -3) { rankLabel = 'Hated (-3/-5)'; rankClass = 'hostile'; }
      else if (standing <= -1) { rankLabel = 'Hostile (-1/-2)'; rankClass = 'hostile'; }

      // Calculate currently active DM effect
      let activeDmEffect = null;
      if (faction.dmBonusesAndAfflictions) {
        if (standing >= 3) {
          activeDmEffect = { type: 'bonus', title: 'Active High Tier Bonus (+3 to +5)', data: faction.dmBonusesAndAfflictions.bonuses[1] };
        } else if (standing >= 1) {
          activeDmEffect = { type: 'bonus', title: 'Active Mid Tier Bonus (+1 to +2)', data: faction.dmBonusesAndAfflictions.bonuses[0] };
        } else if (standing <= -3) {
          activeDmEffect = { type: 'affliction', title: 'Active Severe Affliction (-3 to -5)', data: faction.dmBonusesAndAfflictions.afflictions[1] };
        } else if (standing <= -1) {
          activeDmEffect = { type: 'affliction', title: 'Active Minor Affliction (-1 to -2)', data: faction.dmBonusesAndAfflictions.afflictions[0] };
        } else {
          activeDmEffect = { type: 'neutral', title: 'Neutral Standing (0)', data: { name: 'No Active Boons or Afflictions', effect: 'Faction monitors the party with watchful neutrality. Standard market rates apply.' } };
        }
      }

      return `
        <div class="faction-card">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <h3 style="font-size: 1.3rem;">${faction.name}</h3>
              <div style="font-style: italic; font-size: 0.85rem; color: var(--text-gold); margin-top: 0.2rem;">
                ${faction.motto}
              </div>
            </div>
            <span class="meta-badge">${faction.alignment}</span>
          </div>

          <div style="font-size: 0.9rem;">
            <strong>Supreme Leader:</strong> ${faction.leader}<br>
            <strong>Stronghold Seat:</strong> ${faction.headquarters}
          </div>

          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-family: var(--font-sans); color: var(--text-muted);">
              <span>Continental Influence</span>
              <span><strong>${faction.influence}%</strong></span>
            </div>
            <div class="influence-bar-wrapper">
              <div class="influence-fill" style="width: ${faction.influence}%;"></div>
            </div>
          </div>

          <div class="standing-control-row">
            <div style="display: flex; flex-direction: column;">
              <span style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-sans);">PARTY STANDING</span>
              <span class="standing-rank-badge ${rankClass}">${rankLabel} [${standing > 0 ? '+' + standing : standing}]</span>
            </div>
            ${worldState.prefs.dmMode ? `
              <div style="display: flex; gap: 0.35rem; align-items: center;">
                <button class="btn btn-sm standing-btn" data-faction-id="${faction.id}" data-delta="-1" title="DM: Decrease Standing">−</button>
                <button class="btn btn-sm standing-btn" data-faction-id="${faction.id}" data-delta="1" title="DM: Increase Standing">+</button>
                <span style="font-size: 0.7rem; color: #ff7961; font-weight: bold; margin-left: 0.2rem;">(DM)</span>
              </div>
            ` : ''}
          </div>

          <p style="font-size: 0.95rem;">${faction.overview}</p>

          <div style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.85rem;">
            <div>
              <strong style="color: #4caf50;">Known Allies:</strong> 
              ${faction.allies.length > 0 ? faction.allies.join(', ') : 'None / Isolated'}
            </div>
            <div>
              <strong style="color: #e57373;">Rivals & Conflicts:</strong> 
              ${faction.rivals.length > 0 ? faction.rivals.join(', ') : 'None'}
            </div>
          </div>

          <!-- Public Player Perks -->
          <div>
            <div style="font-family: var(--font-sans); font-size: 0.75rem; font-weight: 700; color: var(--text-gold); margin-bottom: 0.35rem;">
              PUBLIC REPUTATION PERKS
            </div>
            <ul class="abilities-list">
              ${faction.perks.map(p => `<li class="ability-item" style="border-left-color: #4caf50;">${p}</li>`).join('')}
            </ul>
          </div>

          <!-- DM-EXCLUSIVE ACTIVE BONUSES & AFFLICTIONS MATRIX -->
          ${worldState.prefs.dmMode && faction.dmBonusesAndAfflictions ? `
            <div class="standing-matrix-dm">
              <div style="font-family: var(--font-sans); font-size: 0.75rem; font-weight: 700; color: #ff7961; text-transform: uppercase; letter-spacing: 0.05em; display: flex; justify-content: space-between; align-items: center;">
                <span>DM Standing Mechanics</span>
                <span style="font-size: 0.7rem; color: var(--text-muted);">(Hidden from Players)</span>
              </div>

              <!-- Currently Active Threshold Effect -->
              <div class="active-effect-banner ${activeDmEffect.type}">
                <strong>${activeDmEffect.title}: ${activeDmEffect.data.name}</strong><br>
                <span>${activeDmEffect.data.effect}</span>
              </div>

              <!-- Complete Threshold Reference for DM -->
              <div style="margin-top: 0.35rem;">
                <div style="font-size: 0.75rem; font-weight: bold; color: var(--text-gold); margin-bottom: 0.25rem;">
                  All Standing Thresholds:
                </div>
                <div class="threshold-tier-list">
                  <div class="threshold-tier-item" style="color: #81c784;">
                    <span><strong>Tier +3 to +5 (Exalted):</strong> ${faction.dmBonusesAndAfflictions.bonuses[1].name}</span>
                    <span style="color: #c8e6c9;">${faction.dmBonusesAndAfflictions.bonuses[1].effect}</span>
                  </div>
                  <div class="threshold-tier-item" style="color: #a5d6a7;">
                    <span><strong>Tier +1 to +2 (Friendly):</strong> ${faction.dmBonusesAndAfflictions.bonuses[0].name}</span>
                    <span style="color: #c8e6c9;">${faction.dmBonusesAndAfflictions.bonuses[0].effect}</span>
                  </div>
                  <div class="threshold-tier-item" style="color: #ffab91;">
                    <span><strong>Tier -1 to -2 (Hostile):</strong> ${faction.dmBonusesAndAfflictions.afflictions[0].name}</span>
                    <span style="color: #ffcdd2;">${faction.dmBonusesAndAfflictions.afflictions[0].effect}</span>
                  </div>
                  <div class="threshold-tier-item" style="color: #ef9a9a;">
                    <span><strong>Tier -3 to -5 (Hated):</strong> ${faction.dmBonusesAndAfflictions.afflictions[1].name}</span>
                    <span style="color: #ffcdd2;">${faction.dmBonusesAndAfflictions.afflictions[1].effect}</span>
                  </div>
                </div>
              </div>
            </div>
          ` : ''}

          ${worldState.prefs.dmMode && faction.dmSecrets ? `
            <div class="dm-secret-banner" style="margin-top: 0.5rem;">
              <div class="banner-title">DM Confidential Agendas & Undercover Cells</div>
              <div class="banner-text">${faction.dmSecrets}</div>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    gridContainer.querySelectorAll('.standing-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const fId = btn.getAttribute('data-faction-id');
        const delta = parseInt(btn.getAttribute('data-delta'), 10);
        worldState.updatePartyStanding(fId, delta);
        renderCards();
      });
    });
  }

  renderCards();
}

  // COMPONENT: bastionView.js
/**
 * 5.5e Bastion Command Deck & Turn Simulator
 */
function renderBastionView(container) {
  const { data, prefs } = worldState;

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h2>5.5e Bastion Deck & Stronghold Management</h2>
        <div class="view-tagline">Manage Player Facilities, Hirelings, Order Points, and Execute Bastion Turns</div>
      </div>
    </div>

    <!-- Bastion Turn Simulator Panel -->
    <div class="bastion-turn-panel">
      <h3 style="font-size: 1.25rem; color: var(--text-gold); margin-bottom: 0.5rem;">
        Issue Bastion Turn Order
      </h3>
      <p style="font-size: 0.95rem; color: var(--text-secondary);">
        Select an active stronghold and issue a 5.5e Bastion Order to generate resources, recruit specialists, or construct magical upgrades.
      </p>

      <div style="display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap;">
        <select id="bastion-select" class="theme-select" style="font-size: 1rem; padding: 0.5rem 1rem;">
          ${data.bastions.map(b => `<option value="${b.id}">${b.name} (${b.owner})</option>`).join('')}
        </select>
      </div>

      <div class="order-selector-grid">
        <button class="order-btn" data-order="craft">
          <span class="order-title">Craft Order</span>
          <span class="order-desc">Forge magical munitions, weapons, or runic brews (+25 Order Pts)</span>
        </button>
        <button class="order-btn" data-order="harvest">
          <span class="order-title">Harvest Order</span>
          <span class="order-desc">Gather gold, timber, rare roots, or minerals (+Gold & +20 Pts)</span>
        </button>
        <button class="order-btn" data-order="recruit">
          <span class="order-title">Recruit Order</span>
          <span class="order-desc">Enlist sentinels & specialists (+1 Bastion Defense Rating)</span>
        </button>
        <button class="order-btn" data-order="trade">
          <span class="order-title">Trade Order</span>
          <span class="order-desc">Dispatch trade caravans to Crucible City (+300+ GP)</span>
        </button>
        <button class="order-btn" data-order="empower">
          <span class="order-title">Empower Order</span>
          <span class="order-desc">Primordial acoustic rites granting combat inspiration</span>
        </button>
      </div>

      <div id="turn-result-box" style="display: none;" class="bastion-turn-log">
        <!-- Turn output -->
      </div>
    </div>

    <!-- Bastions Grid -->
    <div class="cards-grid" id="bastions-cards-container">
      <!-- Injected dynamically -->
    </div>
  `;

  const cardsContainer = container.querySelector('#bastions-cards-container');
  const bastionSelect = container.querySelector('#bastion-select');
  const resultBox = container.querySelector('#turn-result-box');

  function renderBastionCards() {
    cardsContainer.innerHTML = data.bastions.map(b => `
      <div class="char-card" id="bastion-card-${b.id}">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <h3 style="font-size: 1.3rem;">${b.name}</h3>
            <div style="font-size: 0.85rem; color: var(--text-gold);">
              Lord / Overseer: <strong>${b.owner}</strong>
            </div>
          </div>
          <span class="meta-badge" style="font-weight: 700;">Level ${b.level}</span>
        </div>

        <div class="char-meta-row">
          <span class="meta-badge">${b.location}</span>
          <span class="meta-badge" style="color: var(--text-gold);">Order Pts: ${b.orderPoints}</span>
          <span class="meta-badge" style="color: #4caf50;">Defense Rating: ${b.defenseRating}</span>
        </div>

        <!-- Special Facilities -->
        <div>
          <div style="font-family: var(--font-sans); font-size: 0.75rem; font-weight: 700; color: var(--text-gold); margin-bottom: 0.35rem;">
            SPECIAL 5.5e FACILITIES
          </div>
          <ul class="abilities-list">
            ${b.specialFacilities.map(fac => `
              <li class="ability-item">
                <strong>${fac.name}</strong> <span style="font-size: 0.75rem; color: var(--text-gold);">[${fac.type}]</span>:
                <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 2px;">${fac.benefit}</div>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Hirelings -->
        <div>
          <div style="font-family: var(--font-sans); font-size: 0.75rem; font-weight: 700; color: var(--text-gold); margin-bottom: 0.35rem;">
            RETAINERS & HIRELINGS
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
            ${b.hirelings.map(h => `
              <span class="meta-badge" title="Loyalty: ${h.loyalty}%">
                ${h.name} (${h.role})
              </span>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  // Order click handlers
  container.querySelectorAll('.order-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const bId = bastionSelect.value;
      const order = btn.getAttribute('data-order');
      const res = worldState.executeBastionTurn(bId, order);
      soundEngine.playDiceRoll(res && res.randomEvent && res.randomEvent.title.includes('Blessing'));

      if (res) {
        resultBox.style.display = 'block';
        resultBox.innerHTML = `
          <div style="font-weight: 700; color: var(--text-gold); font-size: 1.05rem; margin-bottom: 0.3rem;">
            Bastion Turn Completed: ${res.bastionName} [${res.order.toUpperCase()} ORDER]
          </div>
          <div style="margin-bottom: 0.35rem;">${res.description}</div>
          <div style="color: #4caf50;"><strong>Reward:</strong> +${res.orderPointsEarned} Order Points ${res.goldEarned > 0 ? `| +${res.goldEarned} GP` : ''}</div>
          <div style="color: var(--text-highlight); font-style: italic;">${res.specialBonus}</div>
          ${res.randomEvent ? `
            <div style="margin-top: 0.5rem; padding: 0.5rem; background: rgba(212, 175, 55, 0.15); border-left: 3px solid var(--text-gold); border-radius: 4px;">
              <strong>${res.randomEvent.title}</strong>: ${res.randomEvent.desc}
            </div>
          ` : ''}
        `;
        renderBastionCards();
      }
    });
  });

  renderBastionCards();
}

  // COMPONENT: lexiconView.js
/**
 * Monastery of a Thousand Tongues Primordial Lexicon & Runes
 */
function renderLexiconView(container) {
  const { data } = worldState;

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h2>Monastery of a Thousand Tongues: Primordial Lexicon</h2>
        <div class="view-tagline">Acoustic Runes, Primordial Dialects (Ignan, Terran, Aquan, Auran), and Prophecies</div>
      </div>
    </div>

    <!-- Lexicon Translator Tool -->
    <div class="bastion-turn-panel">
      <h3 style="font-size: 1.2rem; color: var(--text-gold); margin-bottom: 0.5rem;">
        Primordial Resonance Translator
      </h3>
      <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 1rem;">
        Type an invocation or concept to generate phonetic Primordial incantations used by the monks of the Mist Spire.
      </p>
      
      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
        <input type="text" id="lexicon-input" placeholder="e.g., fire, stone, oath, shadow, storm, protect..." 
               class="editor-input" style="flex: 1; min-width: 260px;">
        <button class="btn btn-primary" id="translate-btn">Chant Invocation</button>
      </div>

      <div id="translation-output-box" style="display: none;" class="bastion-turn-log"></div>
    </div>

    <!-- Dialect Filter Tabs -->
    <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;" id="dialect-filter-group">
      <button class="filter-chip active" data-dialect="all">All Primordial Dialects</button>
      <button class="filter-chip" data-dialect="Ignan">Ignan (Fire)</button>
      <button class="filter-chip" data-dialect="Terran">Terran (Earth)</button>
      <button class="filter-chip" data-dialect="Aquan">Aquan (Water)</button>
      <button class="filter-chip" data-dialect="Auran">Auran (Air)</button>
      <button class="filter-chip" data-dialect="Confluence">Confluence</button>
      <button class="filter-chip" data-dialect="Ebonflame">Void-Ignan</button>
    </div>

    <!-- Lexicon Cards Grid -->
    <div class="lexicon-grid" id="lexicon-cards-container">
      <!-- Injected dynamically -->
    </div>
  `;

  const cardsContainer = container.querySelector('#lexicon-cards-container');
  const input = container.querySelector('#lexicon-input');
  const transBtn = container.querySelector('#translate-btn');
  const outputBox = container.querySelector('#translation-output-box');

  let activeDialect = 'all';

  function renderLexicon() {
    const filtered = data.primordialLexicon.filter(item => {
      if (activeDialect === 'all') return true;
      return item.dialect.includes(activeDialect);
    });

    cardsContainer.innerHTML = filtered.map(item => `
      <div class="rune-card">
        <div class="rune-glyph-large">${item.symbol}</div>
        <div class="rune-meaning">"${item.phrase}"</div>
        <div class="rune-phonetic">${item.pronunciation}</div>
        <div style="font-size: 0.95rem; color: var(--text-primary); margin: 0.5rem 0;">
          <strong>Meaning:</strong> ${item.meaning}
        </div>
        <div style="font-size: 0.85rem; color: var(--text-muted);">
          <strong>Usage:</strong> ${item.usage}
        </div>
        <div style="margin-top: 0.75rem;">
          <button class="btn btn-sm play-resonance-btn" data-dialect="${item.dialect}" style="font-size: 0.8rem; padding: 3px 8px;">
            Pronounce Resonance
          </button>
        </div>
      </div>
    `).join('');

    // Audio resonance trigger
    cardsContainer.querySelectorAll('.play-resonance-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const d = btn.getAttribute('data-dialect');
        if (d.includes('Ignan')) soundEngine.playAmbience('ambient-fire');
        else if (d.includes('Terran')) soundEngine.playAmbience('ambient-earth');
        else if (d.includes('Aquan')) soundEngine.playAmbience('ambient-frost');
        else if (d.includes('Auran')) soundEngine.playAmbience('ambient-monastery');
        else soundEngine.playDiceRoll(true);
      });
    });
  }

  // Filter clicks
  container.querySelectorAll('#dialect-filter-group .filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      container.querySelectorAll('#dialect-filter-group .filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeDialect = chip.getAttribute('data-dialect');
      renderLexicon();
    });
  });

  // Translation generator
  function performTranslation() {
    const query = input.value.trim().toLowerCase();
    if (!query) return;

    soundEngine.playAmbience('ambient-monastery');
    outputBox.style.display = 'block';

    const words = query.split(/\s+/);
    const primordialSyllables = ['Khel', 'Vorash', 'Zul', 'Nath', 'Shae', 'Umbra', 'Durn', 'Zephyr', 'Rizar', 'Aethel', 'Ignis', 'Tor'];
    
    const translatedPhrase = words.map(() => primordialSyllables[Math.floor(Math.random() * primordialSyllables.length)]).join(' ');
    const phonetic = translatedPhrase.split(' ').map(w => w.toUpperCase() + '-ah').join(' ');

    outputBox.innerHTML = `
      <div style="font-family: var(--font-heading); font-size: 1.1rem; color: var(--text-gold);">
        Monastery Glyph Synthesis: "${query}"
      </div>
      <div style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin: 0.35rem 0;">
        "${translatedPhrase} Kar-Nox"
      </div>
      <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-gold);">
        Pronunciation: [ ${phonetic} KAR-noks ]
      </div>
      <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.35rem;">
        Resonates with: <strong>Planar Sound Harmonic of the Bleedlands</strong>
      </div>
    `;
  }

  transBtn.addEventListener('click', performTranslation);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') performTranslation();
  });

  renderLexicon();
}

  // COMPONENT: masteryView.js
/**
 * 5.5e Weapon Masteries & Elemental Infusions Matrix
 */
function renderMasteryView(container) {
  const { data } = worldState;

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h2>5.5e Weapon Masteries & Elemental Infusions</h2>
        <div class="view-tagline">Master Rules, Bleedland Forge Enhancements, and Custom Weapon Crafting</div>
      </div>
    </div>

    <!-- Interactive Weapon Infusion Forge -->
    <div class="bastion-turn-panel">
      <h3 style="font-size: 1.25rem; color: var(--text-gold); margin-bottom: 0.5rem;">
        4N-V1L & Garrick's Elemental Forge: Custom Weapon Generator
      </h3>
      <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 1rem;">
        Select a weapon base, apply a 2024 D&D 5.5e mastery property, and infuse it with a bleeding elemental domain.
      </p>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: flex-end;">
        <div>
          <label class="editor-label">Base Weapon</label>
          <select id="forge-weapon-select" class="theme-select" style="padding: 0.5rem 0.85rem;">
            <option value="Greatsword">Greatsword (2d6 Slashing)</option>
            <option value="Warhammer">Warhammer (1d8/1d10 Bludgeoning)</option>
            <option value="Halberd">Halberd (1d10 Reach)</option>
            <option value="Longbow">Longbow (1d8 Piercing)</option>
            <option value="Scimitar">Scimitar (1d6 Slashing, Light)</option>
            <option value="Maul">Maul (2d6 Heavy)</option>
            <option value="Quarterstaff">Quarterstaff (1d6/1d8 Versatile)</option>
          </select>
        </div>

        <div>
          <label class="editor-label">5.5e Mastery</label>
          <select id="forge-mastery-select" class="theme-select" style="padding: 0.5rem 0.85rem;">
            ${data.weaponMasteries.map(m => `<option value="${m.name}">${m.name} (${m.category})</option>`).join('')}
          </select>
        </div>

        <div>
          <label class="editor-label">Elemental Bleed Infusion</label>
          <select id="forge-element-select" class="theme-select" style="padding: 0.5rem 0.85rem;">
            <option value="Slagfield Magma">Slagfield Magma (4N-V1L Craft)</option>
            <option value="Glacial Rime">Glacial Rime (Kirrag's Frost-Breaker)</option>
            <option value="Kegnir Runic Steel">Kegnir Runic Steel (Garrick's Hearth)</option>
            <option value="Ebonflame Void">Ebonflame Void (Carrus Nether-Pyre)</option>
            <option value="Foregrove Ironwood">Foregrove Ironwood (Jensen's Sylvan)</option>
            <option value="Mist-Spire Acoustic">Mist-Spire Acoustic (Thousand Tongues)</option>
          </select>
        </div>

        <button class="btn btn-primary" id="forge-craft-btn">Forge Elemental Weapon</button>
      </div>

      <div id="forged-weapon-card" style="display: none; margin-top: 1.25rem;" class="char-card">
        <!-- Result card -->
      </div>
    </div>

    <!-- Masteries Grid -->
    <div class="cards-grid" id="masteries-cards-container">
      ${data.weaponMasteries.map(m => `
        <div class="mastery-card">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3 style="font-size: 1.25rem; color: var(--text-gold);">${m.name}</h3>
            <span class="mastery-badge">${m.category}</span>
          </div>

          <p style="font-size: 0.95rem; line-height: 1.5;">${m.effect}</p>

          <div class="elemental-synergy-box">
            <strong style="color: var(--text-gold);">Bleedland Synergy:</strong><br>
            ${m.elementalSynergy}
          </div>

          <div style="font-size: 0.85rem; color: var(--text-muted);">
            <strong>Signature Practitioners:</strong> ${m.signatureUsers.join(', ')}
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // Custom Forge logic
  const craftBtn = container.querySelector('#forge-craft-btn');
  const wSelect = container.querySelector('#forge-weapon-select');
  const mSelect = container.querySelector('#forge-mastery-select');
  const eSelect = container.querySelector('#forge-element-select');
  const resultCard = container.querySelector('#forged-weapon-card');

  craftBtn.addEventListener('click', () => {
    const w = wSelect.value;
    const m = mSelect.value;
    const e = eSelect.value;

    resultCard.style.display = 'block';
    resultCard.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <h3 style="font-size: 1.3rem; color: var(--text-gold);">${e} ${w} of the Bleedlands</h3>
          <div style="font-size: 0.85rem; color: var(--text-muted);">Masterwork 5.5e Weapon Infusion</div>
        </div>
        <span class="meta-badge" style="background: rgba(212, 175, 55, 0.2); color: var(--text-gold);">Mastery: ${m}</span>
      </div>

      <div style="font-size: 0.95rem; margin: 0.5rem 0;">
        <strong>Weapon Property (5.5e):</strong> On attack hit, triggers <strong>${m}</strong> mastery mechanics seamlessly alongside standard damage.
      </div>

      <div class="elemental-synergy-box">
        <strong>Elemental Resonance Effect:</strong><br>
        Infused with ${e}. On a critical strike or mastery trigger, deals an additional 1d8 elemental damage and inflicts a secondary status effect (Ignited, Chilled, Rooted, or Sapped).
      </div>
    `;
  });
}

  // COMPONENT: timelineView.js
/**
 * Chronological World Timeline & Major Eras
 */
function renderTimelineView(container) {
  const { data } = worldState;

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h2>⏳ Chronological History of the Bleeding Realms</h2>
        <div class="view-tagline">Eras of Creation, Calamities, Legendary Wars, and Present Day Conflicts</div>
      </div>
    </div>

    <div class="timeline-track">
      ${data.timeline.map((evt, idx) => `
        <div class="timeline-node">
          <div class="timeline-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
              <span class="timeline-era">${evt.era}</span>
              <span class="meta-badge" style="font-family: var(--font-mono);">${evt.year}</span>
            </div>
            <h3 style="font-size: 1.2rem; color: var(--text-gold); margin-bottom: 0.35rem;">${evt.title}</h3>
            <p style="font-size: 0.95rem; line-height: 1.5; color: var(--text-primary);">${evt.desc}</p>
            <div style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--text-muted);">
              <strong>Key Figures:</strong> ${evt.keyFigures.join(', ')}
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

  // COMPONENT: questView.js
/**
 * Notice Board & Rumor Mill Component
 */
function renderQuestView(container) {
  const { data, prefs } = worldState;

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h2>Notice Board, Tavern Rumors & Mysteries</h2>
        <div class="view-tagline">Bounties, Whispers from the Slagfields, and Ancient Prophecies</div>
      </div>
      <div>
        <button class="btn btn-primary" id="add-rumor-btn">Post New Rumor</button>
      </div>
    </div>

    <div class="cards-grid" id="quests-cards-container" style="padding-top: 1rem;">
      <!-- Populated dynamically -->
    </div>

    <!-- Modal for new rumor -->
    <div class="modal-overlay" id="rumor-modal">
      <div class="modal-card">
        <div class="modal-header">
          <h3>Post a Notice or Tavern Rumor</h3>
          <button class="close-btn" id="close-rumor-modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="editor-form-group">
            <label class="editor-label">Rumor / Notice Title</label>
            <input type="text" id="new-rumor-title" class="editor-input" placeholder="e.g. Mystery in the Mist Spires">
          </div>
          <div class="editor-form-group">
            <label class="editor-label">Tavern / Origin Source</label>
            <input type="text" id="new-rumor-source" class="editor-input" placeholder="e.g. Kegnir Mountain Taproom">
          </div>
          <div class="editor-form-group">
            <label class="editor-label">Rumor Text (What Players Hear)</label>
            <textarea id="new-rumor-text" class="editor-textarea" placeholder="Describe the rumor or bounty..."></textarea>
          </div>
          <div class="editor-form-group">
            <label class="editor-label">Veracity / Authenticity</label>
            <select id="new-rumor-veracity" class="theme-select">
              <option value="True">True</option>
              <option value="Half-Truth">Half-Truth</option>
              <option value="Blatant Lie">Blatant Lie</option>
            </select>
          </div>
          <div class="editor-form-group">
            <label class="editor-label">DM Secret Behind the Rumor</label>
            <input type="text" id="new-rumor-dm" class="editor-input" placeholder="What is actually happening backstage...">
          </div>
          <div class="editor-form-group">
            <label class="editor-label">Offered Reward</label>
            <input type="text" id="new-rumor-reward" class="editor-input" placeholder="e.g. 500 GP + Runic Charm">
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn" id="cancel-rumor-btn">Cancel</button>
          <button class="btn btn-primary" id="save-rumor-btn">Pin Notice</button>
        </div>
      </div>
    </div>
  `;

  const cardsContainer = container.querySelector('#quests-cards-container');
  const modal = container.querySelector('#rumor-modal');
  const addBtn = container.querySelector('#add-rumor-btn');
  const closeBtn = container.querySelector('#close-rumor-modal');
  const cancelBtn = container.querySelector('#cancel-rumor-btn');
  const saveBtn = container.querySelector('#save-rumor-btn');

  function renderCards() {
    cardsContainer.innerHTML = data.rumors.map(r => `
      <div class="quest-card" id="quest-${r.id}">
        <div class="pin-icon">•</div>
        <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #8d6e63; font-family: var(--font-sans);">
          <span>From: ${r.source}</span>
          <span style="font-weight: 700; color: ${r.status === 'Completed' ? '#2e7d32' : '#d84315'};">[${r.status || 'Available'}]</span>
        </div>

        <h3>${r.title}</h3>
        <p class="quest-rumor-text">"${r.rumorText}"</p>

        <div class="quest-reward">Reward: ${r.reward}</div>

        <div style="margin-top: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
          <button class="btn btn-sm toggle-quest-status-btn" data-id="${r.id}" style="font-size: 0.75rem; padding: 2px 8px; background: #efebe9; color: #3e2723; border: 1px solid #bcaaa4;">
            ${r.status === 'Completed' ? 'Reopen' : 'Mark Complete'}
          </button>
          ${worldState.prefs.dmMode ? `
            <span style="font-family: var(--font-sans); font-size: 0.75rem; font-weight: bold; color: ${r.veracity === 'True' ? '#2e7d32' : r.veracity === 'Half-Truth' ? '#f57f17' : '#c62828'};">
              [DM: ${r.veracity}]
            </span>
          ` : ''}
        </div>

        ${worldState.prefs.dmMode && r.dmHook ? `
          <div class="dm-secret-banner" style="margin-top: 0.75rem; background: rgba(198, 40, 40, 0.1); border-color: #ef9a9a;">
            <div class="banner-title" style="color: #c62828;">DM True Hook</div>
            <div class="banner-text" style="color: #4e342e; font-size: 0.85rem;">${r.dmHook}</div>
          </div>
        ` : ''}
      </div>
    `).join('');

    cardsContainer.querySelectorAll('.toggle-quest-status-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const q = data.rumors.find(item => item.id === id);
        if (q) {
          const newStatus = q.status === 'Completed' ? 'Available' : 'Completed';
          worldState.updateQuestStatus(id, newStatus);
          renderCards();
        }
      });
    });
  }

  addBtn.addEventListener('click', () => modal.classList.add('active'));
  closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  cancelBtn.addEventListener('click', () => modal.classList.remove('active'));

  saveBtn.addEventListener('click', () => {
    const title = container.querySelector('#new-rumor-title').value.trim();
    const source = container.querySelector('#new-rumor-source').value.trim();
    const text = container.querySelector('#new-rumor-text').value.trim();
    const veracity = container.querySelector('#new-rumor-veracity').value;
    const dm = container.querySelector('#new-rumor-dm').value.trim();
    const reward = container.querySelector('#new-rumor-reward').value.trim();

    if (!title || !text) {
      alert('Please fill out at least the title and rumor text.');
      return;
    }

    data.rumors.unshift({
      id: 'rumor-' + Date.now(),
      title,
      source: source || 'Local Tavern',
      rumorText: text,
      veracity,
      dmHook: dm || 'No extra confidential notes.',
      reward: reward || 'Standard Bounty',
      status: 'Available'
    });

    worldState.saveData();
    modal.classList.remove('active');
    renderCards();
  });

  renderCards();
}

  // COMPONENT: pantheonView.js
/**
 * Pantheon & Divine Titans View Component for D&D 5.5e
 */
function renderPantheonView(container) {
  const { data } = worldState;
  const pantheon = data.pantheon || [];

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h2>The Divine Pantheon & Elemental Titans</h2>
        <div class="view-tagline">Distant Progenitors, Walking Avatars, Fallen Deities, and the God of the Last Candle</div>
      </div>
      <div>
        <input type="text" id="deity-search-input" placeholder="Filter deities, domains, tenets..." class="editor-input" style="width: 280px; padding: 0.4rem 0.75rem;">
      </div>
    </div>

    <!-- Interactive Prayer Altar / Divine Blessing Chamber -->
    <div class="prayer-altar-box">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h3 style="color: var(--text-gold); font-size: 1.25rem; margin-bottom: 0.35rem;">
            The Altar of the Bleeding Covenant
          </h3>
          <p style="font-size: 0.95rem; color: var(--text-secondary);">
            Kneel before a chosen deity or elemental titan to offer prayer, swear a 5.5e sacred oath, and receive an inspired divine blessing.
          </p>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <select id="altar-deity-select" class="theme-select" style="font-size: 0.95rem; padding: 0.5rem 0.85rem;">
            ${pantheon.map(d => `<option value="${d.id}">${d.name} (${d.category})</option>`).join('')}
          </select>
          <button class="btn btn-primary" id="commune-deity-btn">Offer Prayer / Swear Oath</button>
        </div>
      </div>

      <div id="altar-blessing-result" style="display: none; margin-top: 1.25rem;" class="bastion-turn-log"></div>
    </div>

    <!-- Filter Bar -->
    <div class="map-controls-bar" style="margin-bottom: 1.5rem;">
      <div class="map-filters" id="deity-filters-group">
        <button class="filter-chip active" data-filter="all">All Divinities</button>
        <button class="filter-chip" data-filter="Distant">Distant Titans</button>
        <button class="filter-chip" data-filter="Walking">Walking / Incognito Gods</button>
        <button class="filter-chip" data-filter="Fallen">Fallen & Corrupted</button>
        <button class="filter-chip" data-filter="Lost">Lost Ones</button>
        <button class="filter-chip" data-filter="Solitary">Single Worshipper</button>
      </div>
    </div>

    <div class="cards-grid" id="deities-cards-container"></div>
  `;

  const cardsContainer = container.querySelector('#deities-cards-container');
  const searchInput = container.querySelector('#deity-search-input');
  const altarSelect = container.querySelector('#altar-deity-select');
  const communeBtn = container.querySelector('#commune-deity-btn');
  const blessingResult = container.querySelector('#altar-blessing-result');

  let currentFilter = 'all';

  function renderDeityCards(query = '') {
    const term = query.toLowerCase();
    const filtered = pantheon.filter(d => {
      const matchesText = d.name.toLowerCase().includes(term) ||
                          d.title.toLowerCase().includes(term) ||
                          d.domains.toLowerCase().includes(term) ||
                          d.clericDomains.toLowerCase().includes(term) ||
                          d.tenets.toLowerCase().includes(term);

      if (!matchesText) return false;
      if (currentFilter === 'all') return true;
      if (currentFilter === 'Distant' && d.category.includes('Distant')) return true;
      if (currentFilter === 'Walking' && d.category.includes('Walking')) return true;
      if (currentFilter === 'Fallen' && d.category.includes('Fallen')) return true;
      if (currentFilter === 'Lost' && d.category.includes('Lost')) return true;
      if (currentFilter === 'Solitary' && d.category.includes('Single')) return true;
      return false;
    });

    cardsContainer.innerHTML = filtered.map(d => {
      let pillClass = 'titan';
      if (d.category.includes('Walking')) pillClass = 'walking';
      else if (d.category.includes('Fallen')) pillClass = 'fallen';
      else if (d.category.includes('Lost')) pillClass = 'lost';
      else if (d.category.includes('Single')) pillClass = 'solitary';

      return `
        <div class="deity-card">
          <div class="deity-card-header">
            <div class="deity-symbol-large">${d.symbol}</div>
            <div style="flex: 1;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;">
                <h3 style="font-size: 1.3rem;">${d.name}</h3>
                <span class="deity-type-pill ${pillClass}">${d.category}</span>
              </div>
              <div class="deity-title-banner">${d.title}</div>
            </div>
          </div>

          <div class="char-meta-row">
            <span class="meta-badge">${d.alignment}</span>
            <span class="meta-badge">${d.elementalDomain}</span>
            <span class="meta-badge" style="color: var(--text-gold);">${d.clericDomains}</span>
          </div>

          <div class="tenets-box">
            <strong style="color: var(--text-gold);">Sacred Tenet & Dogma:</strong><br>
            "${d.tenets}"
          </div>

          <div style="font-size: 0.95rem; line-height: 1.5;">
            ${d.overview}
          </div>

          ${d.walkingManifestation ? `
            <div class="mortal-incarnation-box">
              <strong>Presence Among Mortals:</strong><br>
              ${d.walkingManifestation}
            </div>
          ` : ''}

          ${d.soleWorshipper ? `
            <div style="background: rgba(33, 150, 243, 0.12); border: 1px dashed #2196f3; border-radius: var(--radius-md); padding: 0.75rem 1rem; font-size: 0.9rem; color: #bbdefb;">
              <strong>Sole Mortal Worshipper:</strong><br>
              ${d.soleWorshipper}
            </div>
          ` : ''}

          <div style="font-size: 0.85rem; color: var(--text-muted);">
            <strong>5.5e Paladin / Cleric Oaths:</strong> ${d.recommendedOaths}
          </div>

          ${worldState.prefs.dmMode && d.dmSecrets ? `
            <div class="dm-secret-banner">
              <div class="banner-title">DM Divine Secrets & True Genesis</div>
              <div class="banner-text">${d.dmSecrets}</div>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  container.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      container.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentFilter = chip.getAttribute('data-filter');
      renderDeityCards(searchInput.value);
    });
  });

  searchInput.addEventListener('input', (e) => renderDeityCards(e.target.value));

  communeBtn.addEventListener('click', () => {
    const dId = altarSelect.value;
    const deity = pantheon.find(d => d.id === dId);
    if (!deity) return;

    blessingResult.style.display = 'block';
    blessingResult.innerHTML = `
      <div style="font-size: 1.15rem; font-weight: 700; color: var(--text-gold); margin-bottom: 0.35rem;">
        Communion with ${deity.name} (${deity.title})
      </div>
      <div style="margin-bottom: 0.5rem; color: var(--text-primary);">
        "${deity.blessingQuote || deity.tenets}"
      </div>
      <div style="padding: 0.6rem 0.85rem; background: rgba(212, 175, 55, 0.15); border-left: 3px solid var(--text-gold); border-radius: 4px; color: var(--text-highlight);">
        <strong>5.5e Inspired Boon:</strong> ${deity.inspiredBoon}
      </div>
    `;
  });

  renderDeityCards();
}

  // COMPONENT: editorView.js
/**
 * World Lore Customizer, JSON Hub & Handout Exporter
 */
function renderEditorView(container) {
  const { data } = worldState;

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h2>World Lore Editor & JSON Hub</h2>
        <div class="view-tagline">Import your Google Docs lore, customize characters & regions, or export clean JSON backups</div>
      </div>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <button class="btn btn-primary" id="download-json-btn">Export Campaign JSON</button>
        <label class="btn" style="cursor: pointer;">
          Load JSON File
          <input type="file" id="upload-json-file" accept=".json" style="display: none;">
        </label>
        <button class="btn" id="generate-handout-btn">Generate Player Handout</button>
        <button class="btn btn-danger" id="reset-world-btn">Reset to Default</button>
      </div>
    </div>

    <!-- Live JSON Editor Area -->
    <div class="bastion-turn-panel">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
        <h3 style="font-size: 1.2rem; color: var(--text-gold);">
          Raw Campaign Data JSON
        </h3>
        <button class="btn btn-sm btn-primary" id="save-json-editor-btn">Save & Apply Changes</button>
      </div>
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">
        You can directly edit character bios, region descriptions, and 5.5e stat blocks here. Click "Save & Apply Changes" to update the dashboard.
      </p>
      <textarea id="raw-json-textarea" class="editor-textarea" style="font-family: var(--font-mono); font-size: 0.85rem; min-height: 420px;"></textarea>
    </div>

    <!-- Modal for Printable Player Handout -->
    <div class="modal-overlay" id="handout-modal">
      <div class="modal-card" style="max-width: 900px;">
        <div class="modal-header">
          <h3>Player Campaign Lore Handout (Spoiler-Free)</h3>
          <button class="close-btn" id="close-handout-modal">&times;</button>
        </div>
        <div class="modal-body">
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
            Copy this formatted markdown text to share with your players or paste into your campaign wiki.
          </p>
          <textarea id="handout-markdown-area" class="editor-textarea" style="font-family: var(--font-mono); font-size: 0.9rem; min-height: 380px;" readonly></textarea>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" id="copy-handout-btn">Copy to Clipboard</button>
          <button class="btn" id="done-handout-btn">Done</button>
        </div>
      </div>
    </div>
  `;

  const textarea = container.querySelector('#raw-json-textarea');
  const saveBtn = container.querySelector('#save-json-editor-btn');
  const downloadBtn = container.querySelector('#download-json-btn');
  const uploadInput = container.querySelector('#upload-json-file');
  const resetBtn = container.querySelector('#reset-world-btn');
  const handoutBtn = container.querySelector('#generate-handout-btn');
  const handoutModal = container.querySelector('#handout-modal');
  const handoutArea = container.querySelector('#handout-markdown-area');
  const closeHandout = container.querySelector('#close-handout-modal');
  const doneHandout = container.querySelector('#done-handout-btn');
  const copyHandout = container.querySelector('#copy-handout-btn');

  // Populate editor
  textarea.value = JSON.stringify(data, null, 2);

  saveBtn.addEventListener('click', () => {
    const res = worldState.importWorldJson(textarea.value);
    if (res.success) {
      alert('World data updated successfully!');
    } else {
      alert('Error updating JSON: ' + res.error);
    }
  });

  // Download JSON
  downloadBtn.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bleeding_realms_campaign_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // Upload JSON
  uploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const res = worldState.importWorldJson(evt.target.result);
      if (res.success) {
        textarea.value = JSON.stringify(worldState.data, null, 2);
        alert('Campaign data successfully loaded from file!');
      } else {
        alert('Failed to load JSON file: ' + res.error);
      }
    };
    reader.readAsText(file);
  });

  // Reset
  resetBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all world data to default? Any unsaved edits will be lost.')) {
      worldState.resetToDefault();
      textarea.value = JSON.stringify(worldState.data, null, 2);
      alert('World data reset to defaults.');
    }
  });

  // Generate Player Handout Markdown
  handoutBtn.addEventListener('click', () => {
    let md = `# Welcome to ${data.metadata.worldName}\n`;
    md += `*${data.metadata.tagline}*\n\n`;
    md += `## Continental Overview\n${data.metadata.description}\n\n`;
    md += `**Current Era**: ${data.metadata.currentEra}\n\n---\n\n`;

    md += `## The Elemental Bleedlands & Geography\n\n`;
    data.regions.forEach(r => {
      md += `### ${r.name} (${r.domain})\n`;
      md += `- **Capital / Seat**: ${r.capital}\n`;
      md += `- **Ruler / Guardian**: ${r.ruler}\n`;
      md += `- **Climate**: ${r.climate}\n`;
      md += `- **Overview**: ${r.overview}\n\n`;
    });

    md += `\n---\n\n## Notable Champions & Figures of Legend\n\n`;
    data.characters.forEach(c => {
      md += `### ${c.name} - ${c.title}\n`;
      md += `*${c.quote}*\n\n`;
      md += `- **Species / Role**: ${c.species} (${c.classRole})\n`;
      md += `- **Elemental Affinity**: ${c.elementalAffinity}\n`;
      md += `- **Seat / Bastion**: ${c.bastion}\n`;
      md += `- **Lore**: ${c.bio}\n\n`;
    });

    handoutArea.value = md;
    handoutModal.classList.add('active');
  });

  closeHandout.addEventListener('click', () => handoutModal.classList.remove('active'));
  doneHandout.addEventListener('click', () => handoutModal.classList.remove('active'));
  copyHandout.addEventListener('click', () => {
    handoutArea.select();
    navigator.clipboard.writeText(handoutArea.value);
    alert('Handout markdown copied to clipboard!');
  });
}

  // COMPONENT: partyView.js
/**
 * Party Status Monitor & Player Character Creation / Upload System for D&D 5.5e
 * Features Live Vitals HUD, World Entry Point Integration, and DM Confidential Command View
 */
function renderPartyView(container) {
  const { data, prefs } = worldState;
  const characters = data.partyCharacters || [];
  const settings = data.partySettings || { partyName: 'The Bleedland Wayfarers', partyGold: 340, partyLevel: 5, sharedBag: 'Bag of Holding' };

  // Calculate average party stats
  const avgLevel = characters.length > 0 ? (characters.reduce((sum, c) => sum + (c.level || 1), 0) / characters.length).toFixed(1) : 1;
  const totalHpCurrent = characters.reduce((sum, c) => sum + (c.hpCurrent || 0), 0);
  const totalHpMax = characters.reduce((sum, c) => sum + (c.hpMax || 1), 0);
  const partyHpPercent = totalHpMax > 0 ? Math.round((totalHpCurrent / totalHpMax) * 100) : 100;

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h2>Party Status Monitor & Character Roster</h2>
        <div class="view-tagline">Real-time Vitals HUD, World Entry Points, 5.5e Masteries, Inventory & DM Secret Hooks</div>
      </div>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <button class="btn btn-primary" id="open-char-wizard-btn">+ Create / Upload Character</button>
        <button class="btn" id="import-char-json-btn">Import JSON</button>
        <button class="btn" id="export-party-json-btn">Export Party</button>
      </div>
        <button class="btn btn-sm" id="btn-long-rest" style="background: rgba(76, 175, 80, 0.2); border-color: #4caf50; color: #a5d6a7;" title="Full HP & Resource Reset">
          Long Rest (Reset All)
        </button>
      </div>
    </div>

    <!-- Shared Bag of Holding / Party Stash Accordion -->
    <details style="margin-bottom: 1.5rem; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0.75rem 1rem;">
      <summary style="cursor: pointer; font-weight: bold; color: var(--text-gold); font-size: 0.9rem;">
        Shared Bag of Holding & Communal Equipment (Click to expand)
      </summary>
      <div style="margin-top: 0.6rem; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">
        ${settings.sharedBag || 'Empty bag of holding.'}
      </div>
    </details>

    <!-- Character Cards Grid -->
    <div class="party-grid" id="party-characters-grid"></div>

    <!-- Character Creation / Upload Wizard Modal -->
    <div class="modal-overlay" id="char-wizard-modal">
      <div class="modal-card" style="max-width: 720px; max-height: 90vh; display: flex; flex-direction: column;">
        <div class="modal-header">
          <h3 style="color: var(--text-gold); display: flex; align-items: center; gap: 0.5rem;">
            Player Character Builder & World Entry System
          </h3>
          <button class="close-btn" id="close-char-wizard-btn">&times;</button>
        </div>
        <div class="modal-body" style="overflow-y: auto; padding: 1.25rem;">
          <form id="char-builder-form" style="display: flex; flex-direction: column; gap: 1rem;">
            
            <!-- Basic Info Row -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.85rem;">
              <div class="editor-form-group">
                <label class="editor-label">Character Name *</label>
                <input type="text" id="wiz-name" class="editor-input" required placeholder="e.g. Torvin Iron-Hand">
              </div>
              <div class="editor-form-group">
                <label class="editor-label">Player Name</label>
                <input type="text" id="wiz-player" class="editor-input" placeholder="e.g. Sarah">
              </div>
              <div class="editor-form-group">
                <label class="editor-label">Avatar Emoji / Symbol</label>
                <input type="text" id="wiz-avatar" class="editor-input" value="" style="text-align: center;">
              </div>
            </div>

            <!-- Class, Species, Level, Alignment -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 0.85rem;">
              <div class="editor-form-group">
                <label class="editor-label">Species / Lineage *</label>
                <input type="text" id="wiz-species" class="editor-input" required placeholder="e.g. Goliath, Sun Elf, Human">
              </div>
              <div class="editor-form-group">
                <label class="editor-label">Class & Subclass (5.5e) *</label>
                <input type="text" id="wiz-class" class="editor-input" required placeholder="e.g. Barbarian (Berserker)">
              </div>
              <div class="editor-form-group">
                <label class="editor-label">Level</label>
                <input type="number" id="wiz-level" class="editor-input" value="5" min="1" max="20">
              </div>
              <div class="editor-form-group">
                <label class="editor-label">Alignment</label>
                <select id="wiz-alignment" class="editor-input">
                  <option value="Lawful Good">Lawful Good (Crusader)</option>
                  <option value="Neutral Good" selected>Neutral Good (Benefactor)</option>
                  <option value="Chaotic Good">Chaotic Good (Rebel)</option>
                  <option value="Lawful Neutral">Lawful Neutral (Judge)</option>
                  <option value="True Neutral">True Neutral (Arbiter)</option>
                  <option value="Chaotic Neutral">Chaotic Neutral (Free Spirit)</option>
                  <option value="Lawful Evil">Lawful Evil (Dominator)</option>
                  <option value="Neutral Evil">Neutral Evil (Malefactor)</option>
                  <option value="Chaotic Evil">Chaotic Evil (Destroyer)</option>
                  <option value="Unaligned">Unaligned / Primal Beast</option>
                </select>
              </div>
            </div>

            <!-- Vitals: HP, AC, Speed -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 0.85rem;">
              <div class="editor-form-group">
                <label class="editor-label">Max HP *</label>
                <input type="number" id="wiz-hp" class="editor-input" required value="45" min="1">
              </div>
              <div class="editor-form-group">
                <label class="editor-label">Armor Class (AC) *</label>
                <input type="number" id="wiz-ac" class="editor-input" required value="16" min="1">
              </div>
              <div class="editor-form-group">
                <label class="editor-label">Speed</label>
                <input type="text" id="wiz-speed" class="editor-input" value="30 ft">
              </div>
              <div class="editor-form-group">
                <label class="editor-label">Initiative Mod</label>
                <input type="text" id="wiz-init" class="editor-input" value="+2">
              </div>
            </div>

            <!-- Enhanced Ability Scores (STR, DEX, CON, INT, WIS, CHA) with 4d6 Drop Lowest Rolling -->
            <div style="background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem; flex-wrap: wrap; gap: 0.5rem;">
                <label class="editor-label" style="margin-bottom: 0; font-size: 0.95rem;">
                  Core Ability Scores (Manual or Roll 4d6 Drop Lowest)
                </label>
                <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
                  <button type="button" class="btn btn-sm" id="roll-all-stats-btn" style="background: rgba(212, 175, 55, 0.2); border-color: var(--text-gold); color: var(--text-gold);">
                    Roll All 6 Stats (4d6 Drop Lowest)
                  </button>
                  <button type="button" class="btn btn-sm" id="standard-array-btn" title="Set standard array: 15, 14, 13, 12, 10, 8">
                    Standard Array
                  </button>
                </div>
              </div>

              <!-- Live Dice Roll Breakdown Log -->
              <div id="stat-dice-roll-log" style="display: none; font-family: var(--font-mono); font-size: 0.8rem; background: rgba(0,0,0,0.5); border: 1px solid var(--border-strong); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); margin-bottom: 0.75rem; color: #a5d6a7;"></div>

              <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 0.5rem;">
                <!-- STR -->
                <div class="score-input-box" style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.5rem 0.25rem; text-align: center; display: flex; flex-direction: column; gap: 0.25rem;">
                  <span style="font-weight: bold; color: var(--text-gold); font-size: 0.85rem;">STR</span>
                  <input type="number" id="wiz-str" class="editor-input wiz-stat-input" value="16" min="1" max="30" style="text-align: center; font-weight: bold; font-size: 1.1rem; padding: 0.25rem 0;">
                  <span id="wiz-str-mod" style="font-size: 0.75rem; color: #81c784; font-weight: bold;">+3</span>
                  <button type="button" class="quick-hp-btn roll-single-stat-btn" data-stat="str" title="Roll 4d6 drop lowest for STR">Roll</button>
                </div>
                <!-- DEX -->
                <div class="score-input-box" style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.5rem 0.25rem; text-align: center; display: flex; flex-direction: column; gap: 0.25rem;">
                  <span style="font-weight: bold; color: var(--text-gold); font-size: 0.85rem;">DEX</span>
                  <input type="number" id="wiz-dex" class="editor-input wiz-stat-input" value="14" min="1" max="30" style="text-align: center; font-weight: bold; font-size: 1.1rem; padding: 0.25rem 0;">
                  <span id="wiz-dex-mod" style="font-size: 0.75rem; color: #81c784; font-weight: bold;">+2</span>
                  <button type="button" class="quick-hp-btn roll-single-stat-btn" data-stat="dex" title="Roll 4d6 drop lowest for DEX">Roll</button>
                </div>
                <!-- CON -->
                <div class="score-input-box" style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.5rem 0.25rem; text-align: center; display: flex; flex-direction: column; gap: 0.25rem;">
                  <span style="font-weight: bold; color: var(--text-gold); font-size: 0.85rem;">CON</span>
                  <input type="number" id="wiz-con" class="editor-input wiz-stat-input" value="14" min="1" max="30" style="text-align: center; font-weight: bold; font-size: 1.1rem; padding: 0.25rem 0;">
                  <span id="wiz-con-mod" style="font-size: 0.75rem; color: #81c784; font-weight: bold;">+2</span>
                  <button type="button" class="quick-hp-btn roll-single-stat-btn" data-stat="con" title="Roll 4d6 drop lowest for CON">Roll</button>
                </div>
                <!-- INT -->
                <div class="score-input-box" style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.5rem 0.25rem; text-align: center; display: flex; flex-direction: column; gap: 0.25rem;">
                  <span style="font-weight: bold; color: var(--text-gold); font-size: 0.85rem;">INT</span>
                  <input type="number" id="wiz-int" class="editor-input wiz-stat-input" value="10" min="1" max="30" style="text-align: center; font-weight: bold; font-size: 1.1rem; padding: 0.25rem 0;">
                  <span id="wiz-int-mod" style="font-size: 0.75rem; color: var(--text-muted);">+0</span>
                  <button type="button" class="quick-hp-btn roll-single-stat-btn" data-stat="int" title="Roll 4d6 drop lowest for INT">Roll</button>
                </div>
                <!-- WIS -->
                <div class="score-input-box" style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.5rem 0.25rem; text-align: center; display: flex; flex-direction: column; gap: 0.25rem;">
                  <span style="font-weight: bold; color: var(--text-gold); font-size: 0.85rem;">WIS</span>
                  <input type="number" id="wiz-wis" class="editor-input wiz-stat-input" value="12" min="1" max="30" style="text-align: center; font-weight: bold; font-size: 1.1rem; padding: 0.25rem 0;">
                  <span id="wiz-wis-mod" style="font-size: 0.75rem; color: #81c784; font-weight: bold;">+1</span>
                  <button type="button" class="quick-hp-btn roll-single-stat-btn" data-stat="wis" title="Roll 4d6 drop lowest for WIS">Roll</button>
                </div>
                <!-- CHA -->
                <div class="score-input-box" style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.5rem 0.25rem; text-align: center; display: flex; flex-direction: column; gap: 0.25rem;">
                  <span style="font-weight: bold; color: var(--text-gold); font-size: 0.85rem;">CHA</span>
                  <input type="number" id="wiz-cha" class="editor-input wiz-stat-input" value="10" min="1" max="30" style="text-align: center; font-weight: bold; font-size: 1.1rem; padding: 0.25rem 0;">
                  <span id="wiz-cha-mod" style="font-size: 0.75rem; color: var(--text-muted);">+0</span>
                  <button type="button" class="quick-hp-btn roll-single-stat-btn" data-stat="cha" title="Roll 4d6 drop lowest for CHA">Roll</button>
                </div>
              </div>
            </div>

            <!-- 5.5e Weapon Masteries -->
            <div class="editor-form-group">
              <label class="editor-label">5.5e Weapon Masteries (Comma-separated)</label>
              <input type="text" id="wiz-masteries" class="editor-input" placeholder="e.g. Cleave (Greataxe), Push (Heavy Shield), Topple (Warhammer)">
            </div>

            <!-- WORLD ENTRY POINT SECTION -->
            <div style="background: rgba(212, 175, 55, 0.08); border: 1px solid var(--border-strong); border-radius: var(--radius-md); padding: 0.85rem;">
              <label class="editor-label" style="color: var(--text-gold); font-size: 0.95rem; margin-bottom: 0.5rem; display: block;">
                World Entry Point & Bleeding Frontier Origin
              </label>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; margin-bottom: 0.6rem;">
                <div>
                  <label style="font-size: 0.75rem; color: var(--text-muted);">Starting Region / Domain</label>
                  <select id="wiz-entry-region" class="editor-input" style="width: 100%;">
                    ${data.regions.map(r => `<option value="${r.id}" data-name="${r.name}">${r.name} (${r.domain})</option>`).join('')}
                  </select>
                </div>
                <div>
                  <label style="font-size: 0.75rem; color: var(--text-muted);">Specific Landmark / Frontier Post</label>
                  <input type="text" id="wiz-entry-location" class="editor-input" placeholder="e.g. Slagfield Outpost, Mist Spire Steps">
                </div>
              </div>
              <div class="editor-form-group">
                <label style="font-size: 0.75rem; color: var(--text-muted);">Entry Circumstances / How did the character arrive?</label>
                <textarea id="wiz-entry-story" class="editor-textarea" style="min-height: 60px;" placeholder="e.g. Arrived on a trade skiff through the acoustic clouds; fled an inquisitor crusade across the sands..."></textarea>
              </div>
            </div>

            <!-- Roleplay Dossier: Backstory, Traits, Inventory -->
            <div class="editor-form-group">
              <label class="editor-label">Public Backstory Summary</label>
              <textarea id="wiz-backstory" class="editor-textarea" style="min-height: 70px;" placeholder="Brief backstory that companion players know..."></textarea>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem;">
              <div class="editor-form-group">
                <label class="editor-label">Personality Traits & Ideals</label>
                <textarea id="wiz-traits" class="editor-textarea" style="min-height: 60px;" placeholder="Traits, Ideals, Bonds & Flaws..."></textarea>
              </div>
              <div class="editor-form-group">
                <label class="editor-label">Equipment, Weapons & Currency</label>
                <textarea id="wiz-inventory" class="editor-textarea" style="min-height: 60px;" placeholder="e.g. +1 Longsword, Studded Leather, Healer's Kit, 50 GP..."></textarea>
              </div>
            </div>

            <!-- DM SECRET PLOT HOOK (Only visible to DM) -->
            <div style="background: rgba(244, 67, 54, 0.08); border: 1px dashed rgba(244, 67, 54, 0.4); border-radius: var(--radius-md); padding: 0.85rem;">
              <label class="editor-label" style="color: #ff7961;">
                Confidential DM Secrets & Plot Hooks (Hidden from other players)
              </label>
              <textarea id="wiz-dmsecrets" class="editor-textarea" style="min-height: 60px; border-color: rgba(244, 67, 54, 0.3);" placeholder="Secret heritage, hidden curse, undercover allegiance, or DM opening hook..."></textarea>
            </div>

            <div class="modal-footer" style="padding: 0; margin-top: 0.5rem;">
              <button type="button" class="btn" id="cancel-wiz-btn">Cancel</button>
              <button type="submit" class="btn btn-primary">Save Character to Roster</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  const gridContainer = container.querySelector('#party-characters-grid');
  const wizardModal = container.querySelector('#char-wizard-modal');
  const openWizBtn = container.querySelector('#open-char-wizard-btn');
  const closeWizBtn = container.querySelector('#close-char-wizard-btn');
  const cancelWizBtn = container.querySelector('#cancel-wiz-btn');
  const wizForm = container.querySelector('#char-builder-form');
  const importJsonBtn = container.querySelector('#import-char-json-btn');
  const exportPartyBtn = container.querySelector('#export-party-json-btn');
  const goldAddBtn = container.querySelector('#party-gold-add');
  const goldSubBtn = container.querySelector('#party-gold-sub');
  const shortRestBtn = container.querySelector('#btn-short-rest');
  const longRestBtn = container.querySelector('#btn-long-rest');

  // Render all active party cards
  function renderPartyCards() {
    if (!characters || characters.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--bg-card); border: 1px dashed var(--border-subtle); border-radius: var(--radius-lg);">
          <div style="font-size: 3rem; margin-bottom: 0.5rem;"></div>
          <h3 style="color: var(--text-gold);">No Adventurers in the Party Yet</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 0.25rem;">
            Click <strong>"+ Create / Upload Character"</strong> above to create your hero or import a character JSON sheet!
          </p>
        </div>
      `;
      return;
    }

    gridContainer.innerHTML = characters.map(char => {
      const curHp = char.hpCurrent !== undefined ? char.hpCurrent : char.hpMax;
      const maxHp = char.hpMax || 1;
      const hpRatio = maxHp > 0 ? (curHp / maxHp) : 1;
      let hpFillClass = '';
      if (hpRatio <= 0.25) hpFillClass = 'critical';
      else if (hpRatio <= 0.5) hpFillClass = 'danger';

      const commonConditions = ['Advantage', 'Blessed', 'Poisoned', 'Restrained', 'Stunned', 'Unconscious', 'Exhaustion'];
      const activeConds = char.conditions || [];

      function getMod(val) {
        const mod = Math.floor(((val || 10) - 10) / 2);
        return mod >= 0 ? '+' + mod : '' + mod;
      }

        const owner = (data.users || []).find(u => u.claimedCharId === char.id || (char.playerName && u.displayName.toLowerCase() === char.playerName.toLowerCase()));
        const activeUser = worldState.getActiveUser();
        const isMyHero = activeUser && (activeUser.claimedCharId === char.id || owner?.id === activeUser.id);
        const isDm = !!worldState.prefs.dmMode;
        const canControlThis = worldState.canControlCharacter(char.id, char);

        return `
          <div class="party-char-card" data-char-id="${char.id}">
            <!-- Header -->
            <div class="char-hud-header">
              <div class="char-avatar-box">${char.avatar || 'PC'}</div>
              <div class="char-title-block">
                <h3>${char.name}</h3>
                <div class="char-subtag">
                  ${char.species} • ${char.classRole} (Lvl ${char.level || 1}) 
                  ${owner ? `• <span style="color: #a5d6a7;"><em>${owner.displayName}</em></span>` : `• <span style="color: #ffe082;"><em>Unclaimed</em></span>`}
                </div>
              </div>
              <span class="meta-badge">${char.alignment || 'Neutral'}</span>
            </div>

            <!-- Live HP Gauge Bar -->
            <div class="hp-bar-container">
              <div class="hp-bar-labels">
                <span><strong>HP:</strong> ${curHp} / ${maxHp} ${char.tempHp > 0 ? `<span style="color: #42a5f5;">(+${char.tempHp} Temp)</span>` : ''}</span>
                <div class="quick-hp-controls">
                  ${canControlThis ? `
                    <button class="quick-hp-btn hp-adj-btn" data-id="${char.id}" data-delta="-5">−5</button>
                    <button class="quick-hp-btn hp-adj-btn" data-id="${char.id}" data-delta="-1">−1</button>
                    <button class="quick-hp-btn hp-adj-btn" data-id="${char.id}" data-delta="1">+1</button>
                    <button class="quick-hp-btn hp-adj-btn" data-id="${char.id}" data-delta="5">+5</button>
                    <button class="quick-hp-btn hp-temp-btn" data-id="${char.id}" title="Add 5 Temp HP">+5 Temp</button>
                  ` : `
                    <span style="font-size: 0.68rem; color: var(--text-muted);">🔒 Read-Only</span>
                  `}
                </div>
              </div>
              <div class="hp-bar-track">
                <div class="hp-bar-fill ${hpFillClass}" style="width: ${Math.min(100, Math.max(0, Math.round(hpRatio * 100)))}%;"></div>
              </div>
            </div>

            <!-- Core Defense & Mobility Row -->
            <div class="char-core-stats-row">
              <div class="core-stat-item">
                <div class="stat-num">${char.ac || 15}</div>
                <div class="stat-lbl">AC</div>
              </div>
              <div class="core-stat-item">
                <div class="stat-num">${char.initiativeMod || '+0'}</div>
                <div class="stat-lbl">INITIATIVE</div>
              </div>
              <div class="core-stat-item">
                <div class="stat-num">${char.speed || '30 ft'}</div>
                <div class="stat-lbl">SPEED</div>
              </div>
              <div class="core-stat-item">
                <div class="stat-num">${char.passivePerception || 10}</div>
                <div class="stat-lbl">PASSIVE PERC</div>
              </div>
            </div>

            <!-- Ability Scores Row -->
            <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 0.25rem; text-align: center; font-size: 0.75rem; background: var(--bg-tertiary); padding: 0.35rem; border-radius: var(--radius-sm);">
              <div><strong style="color: var(--text-gold);">STR</strong><br>${char.stats?.str || 10} (${getMod(char.stats?.str)})</div>
              <div><strong style="color: var(--text-gold);">DEX</strong><br>${char.stats?.dex || 10} (${getMod(char.stats?.dex)})</div>
              <div><strong style="color: var(--text-gold);">CON</strong><br>${char.stats?.con || 10} (${getMod(char.stats?.con)})</div>
              <div><strong style="color: var(--text-gold);">INT</strong><br>${char.stats?.int || 10} (${getMod(char.stats?.int)})</div>
              <div><strong style="color: var(--text-gold);">WIS</strong><br>${char.stats?.wis || 10} (${getMod(char.stats?.wis)})</div>
              <div><strong style="color: var(--text-gold);">CHA</strong><br>${char.stats?.cha || 10} (${getMod(char.stats?.cha)})</div>
            </div>

            <!-- 5.5e Weapon Masteries -->
            ${char.weaponMasteries && char.weaponMasteries.length > 0 ? `
              <div>
                <div style="font-size: 0.75rem; font-weight: bold; color: var(--text-gold); margin-bottom: 0.25rem;">
                  5.5e WEAPON MASTERIES
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 0.3rem;">
                  ${char.weaponMasteries.map(m => `<span class="mastery-badge">${m}</span>`).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Class Resource Tracker -->
            ${char.classResources ? `
              <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.25); padding: 0.4rem 0.6rem; border-radius: var(--radius-sm); font-size: 0.8rem;">
                <span><strong>${char.classResources.label || 'Resources'}:</strong></span>
                <div style="display: flex; align-items: center; gap: 0.4rem;">
                  ${canControlThis ? `<button class="quick-hp-btn res-adj-btn" data-id="${char.id}" data-delta="-1">−</button>` : ''}
                  <span style="font-weight: bold; color: var(--text-gold);">${char.classResources.current || 0} / ${char.classResources.max || 1}</span>
                  ${canControlThis ? `<button class="quick-hp-btn res-adj-btn" data-id="${char.id}" data-delta="1">+</button>` : ''}
                </div>
              </div>
            ` : ''}

            <!-- Status Conditions Toggle Row -->
            <div>
              <div style="font-size: 0.75rem; font-weight: bold; color: var(--text-muted); margin-bottom: 0.25rem;">
                CONDITIONS & STATUS:
              </div>
              <div class="conditions-pills-row">
                ${commonConditions.map(cond => `
                  <span class="condition-pill ${activeConds.includes(cond) ? 'active' : ''}" data-char-id="${char.id}" data-condition="${cond}" style="${!canControlThis ? 'cursor: default; opacity: 0.7;' : ''}">
                    ${cond}
                  </span>
                `).join('')}
              </div>
            </div>

            <!-- WORLD ENTRY POINT INTEGRATION -->
            ${char.entryPoint ? `
              <div style="border-top: 1px dashed var(--border-subtle); padding-top: 0.6rem;">
                <div style="font-size: 0.75rem; font-weight: bold; color: var(--text-gold); margin-bottom: 0.25rem;">
                  WORLD ENTRY POINT:
                </div>
                <div class="entry-point-pill jump-to-entry" data-region-id="${char.entryPoint.regionId || 'region-crucible'}">
                  <span>${char.entryPoint.regionName || 'Crucible City'}</span>
                  ${char.entryPoint.locationName ? `<span style="opacity: 0.8;">• ${char.entryPoint.locationName}</span>` : ''}
                </div>
                <p style="font-size: 0.85rem; font-style: italic; color: var(--text-secondary); margin-top: 0.35rem;">
                  "${char.entryPoint.entryBackstory || 'Stepped into the Bleeding Realms.'}"
                </p>
              </div>
            ` : ''}

            <!-- Inventory & Roleplay Dossier Accordion -->
            <details style="font-size: 0.85rem; border-top: 1px solid var(--border-subtle); padding-top: 0.4rem;">
              <summary style="cursor: pointer; color: var(--text-gold);">Backstory, Traits & Inventory</summary>
              <div style="margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.4rem;">
                ${char.personalityTraits ? `<div><strong>Traits:</strong> ${char.personalityTraits}</div>` : ''}
                ${char.ideals ? `<div><strong>Ideals:</strong> ${char.ideals}</div>` : ''}
                ${char.bonds ? `<div><strong>Bonds:</strong> ${char.bonds}</div>` : ''}
                ${char.flaws ? `<div><strong>Flaws:</strong> ${char.flaws}</div>` : ''}
                ${char.inventory ? `<div><strong>Gear & Coins:</strong> ${char.inventory}</div>` : ''}
              </div>
            </details>

            <!-- Action Bar: Play as Hero / Ownership Guard -->
            <div style="display: flex; gap: 0.4rem; margin-top: 0.75rem; flex-wrap: wrap;">
              ${isDm || isMyHero ? `
                <button class="btn btn-sm btn-primary play-hero-btn" data-id="${char.id}" style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.35rem;">
                  ${isMyHero ? 'Open My Sheet & Journal' : 'Inspect Sheet & Journal'}
                </button>
              ` : (owner ? `
                <div style="flex: 1; background: rgba(0,0,0,0.3); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.35rem 0.6rem; font-size: 0.8rem; color: var(--text-muted); text-align: center;">
                  Commanded by ${owner.displayName}
                </div>
              ` : (activeUser ? `
                <button class="btn btn-sm btn-primary claim-hero-btn" data-id="${char.id}" style="flex: 1;">
                  Claim & Play ${char.name}
                </button>
              ` : `
                <button class="btn btn-sm hero-signin-prompt-btn" style="flex: 1; opacity: 0.85;">
                  Sign In to Command
                </button>
              `))}

              ${activeUser && isDm ? `
                <button class="btn btn-sm claim-hero-btn" data-id="${char.id}" title="Assign or switch claimed hero">
                  ${owner ? `Assigned: ${owner.displayName}` : 'Assign'}
                </button>
              ` : ''}
            </div>

            <!-- DM-ONLY COMMAND & SECRETS SECTION -->
          ${worldState.prefs.dmMode ? `
            <div class="dm-char-command">
              <div class="dm-title">
                <span>DM Command & Secrets</span>
                <span style="font-size: 0.7rem; color: #ffab91;">(Hidden from Players)</span>
              </div>
              
              <!-- Passive Stats Bar for DM -->
              <div style="display: flex; justify-content: space-between; font-size: 0.75rem; border-bottom: 1px solid rgba(244,67,54,0.3); padding-bottom: 0.3rem;">
                <span><strong>Passive Perception:</strong> ${char.passivePerception || 10}</span>
                <span><strong>Passive Insight:</strong> ${char.passiveInsight || 10}</span>
              </div>

              <!-- Private Character Secret -->
              ${char.dmSecrets ? `
                <div>
                  <strong style="color: #ff8a80;">Character Secret / Arc:</strong>
                  <div style="font-size: 0.8rem; color: #ffebee; margin-top: 0.15rem;">${char.dmSecrets}</div>
                </div>
              ` : ''}

              <!-- DM Opening Entry Hook -->
              ${char.entryPoint && char.entryPoint.dmHook ? `
                <div>
                  <strong style="color: #ffab91;">DM Entry Scene Prompt:</strong>
                  <div style="font-size: 0.8rem; color: #ffebee; font-style: italic; margin-top: 0.15rem;">${char.entryPoint.dmHook}</div>
                </div>
              ` : ''}

              <!-- DM Action Row -->
              <div style="display: flex; justify-content: flex-end; gap: 0.4rem; margin-top: 0.25rem;">
                <button class="btn btn-sm delete-char-btn" data-id="${char.id}" style="background: rgba(244,67,54,0.2); border-color: #f44336; color: #ff8a80;">
                  Remove
                </button>
              </div>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    // Attach Interactive Event Listeners to Character Cards
    gridContainer.querySelectorAll('.hp-adj-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (!worldState.canControlCharacter(id)) {
          alert(`You cannot modify this character! It is controlled by ${worldState.getCharacterOwnerName(id)}.`);
          return;
        }
        const delta = parseInt(btn.getAttribute('data-delta'), 10);
        worldState.adjustPartyHp(id, delta, false);
        soundEngine.playDiceRoll(delta > 0);
        renderPartyCards();
      });
    });

    gridContainer.querySelectorAll('.hp-temp-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (!worldState.canControlCharacter(id)) {
          alert(`You cannot modify this character! It is controlled by ${worldState.getCharacterOwnerName(id)}.`);
          return;
        }
        worldState.adjustPartyHp(id, 5, true);
        soundEngine.playDiceRoll(true);
        renderPartyCards();
      });
    });

    gridContainer.querySelectorAll('.res-adj-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (!worldState.canControlCharacter(id)) {
          alert(`You cannot modify this character! It is controlled by ${worldState.getCharacterOwnerName(id)}.`);
          return;
        }
        const delta = parseInt(btn.getAttribute('data-delta'), 10);
        const char = (characters || []).find(c => c.id === id);
        if (char && char.classResources) {
          char.classResources.current = Math.max(0, Math.min(char.classResources.max || 10, (char.classResources.current || 0) + delta));
          worldState.saveData();
          renderPartyCards();
        }
      });
    });

    gridContainer.querySelectorAll('.condition-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const cId = pill.getAttribute('data-char-id');
        if (!worldState.canControlCharacter(cId)) {
          alert(`You cannot modify this character! It is controlled by ${worldState.getCharacterOwnerName(cId)}.`);
          return;
        }
        const cond = pill.getAttribute('data-condition');
        worldState.togglePartyCondition(cId, cond);
        renderPartyCards();
      });
    });

    gridContainer.querySelectorAll('.jump-to-entry').forEach(btn => {
      btn.addEventListener('click', () => {
        const regId = btn.getAttribute('data-region-id');
        if (regId) {
          worldState.setSelectedRegion(regId);
          const mapTab = document.querySelector('.nav-tab-btn[data-tab="map"]');
          if (mapTab) mapTab.click();
        }
      });
    });

    gridContainer.querySelectorAll('.play-hero-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        worldState.setActiveHero(id);
        const heroTab = document.querySelector('.nav-tab-btn[data-tab="hero"]');
        if (heroTab) heroTab.click();
      });
    });

    gridContainer.querySelectorAll('.claim-hero-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const user = worldState.getActiveUser();
        if (user) {
          worldState.claimCharacter(user.id, id);
          soundEngine.playDiceRoll(true);
          const c = (characters || []).find(char => char.id === id);
          alert(`⭐ You have claimed ${c ? c.name : 'this character'} as your hero!`);
          renderPartyCards();
        }
      });
    });

    gridContainer.querySelectorAll('.hero-signin-prompt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const playerAuthModal = document.getElementById('player-auth-modal');
        if (playerAuthModal) {
          playerAuthModal.classList.add('active');
          document.getElementById('tab-login-btn')?.click();
        }
      });
    });

    gridContainer.querySelectorAll('.delete-char-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cId = btn.getAttribute('data-id');
        if (confirm('Are you sure you want to remove this adventurer from the roster?')) {
          worldState.deletePartyCharacter(cId);
          renderPartyCards();
        }
      });
    });
  }

  renderPartyCards();

  // Party Gold Controls
  if (goldAddBtn) {
    goldAddBtn.addEventListener('click', () => {
      worldState.updatePartyGold(10);
      renderPartyView(container);
    });
  }
  if (goldSubBtn) {
    goldSubBtn.addEventListener('click', () => {
      worldState.updatePartyGold(-10);
      renderPartyView(container);
    });
  }

  // Rest Controls
  if (shortRestBtn) {
    shortRestBtn.addEventListener('click', () => {
      const isDm = !!worldState.prefs.dmMode;
      worldState.partyShortRest();
      soundEngine.playDiceRoll(true);
      if (isDm) {
        alert('Short Rest completed! Entire party regained ~40% HP.');
      } else {
        const myChars = (characters || []).filter(c => worldState.canControlCharacter(c.id, c));
        alert(`Short Rest completed for ${myChars.map(c => c.name).join(', ') || 'your character'}! Regained ~40% HP.`);
      }
      renderPartyCards();
    });
  }
  if (longRestBtn) {
    longRestBtn.addEventListener('click', () => {
      const isDm = !!worldState.prefs.dmMode;
      worldState.partyLongRest();
      soundEngine.playDiceRoll(true);
      if (isDm) {
        alert('Long Rest completed! All HP restored, temporary conditions cleared, and class resources refilled for the party.');
      } else {
        const myChars = (characters || []).filter(c => worldState.canControlCharacter(c.id, c));
        alert(`Long Rest completed for ${myChars.map(c => c.name).join(', ') || 'your character'}! All HP restored and resources refilled.`);
      }
      renderPartyCards();
    });
  }

  // Character Wizard Open/Close
  function openWizard() {
    wizardModal.classList.add('active');
    wizForm.reset();
    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(stat => updateStatModDisplay(stat));
    const log = container.querySelector('#stat-dice-roll-log');
    if (log) log.style.display = 'none';
  }
  function closeWizard() {
    wizardModal.classList.remove('active');
  }

  if (openWizBtn) {
    openWizBtn.addEventListener('click', () => {
      const createTab = document.querySelector('.nav-tab-btn[data-tab="create-hero"]');
      if (createTab) {
        createTab.click();
      } else {
        openWizard();
      }
    });
  }
  if (closeWizBtn) closeWizBtn.addEventListener('click', closeWizard);
  if (cancelWizBtn) cancelWizBtn.addEventListener('click', closeWizard);

  // 4d6 Drop Lowest Rolling Engine
  function roll4d6DropLowest() {
    const rolls = [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1
    ];
    rolls.sort((a, b) => a - b);
    const dropped = rolls[0];
    const kept = rolls.slice(1);
    const total = kept.reduce((a, b) => a + b, 0);
    return { total, rolls, dropped, kept };
  }

  function updateStatModDisplay(statKey) {
    const input = container.querySelector(`#wiz-${statKey}`);
    const badge = container.querySelector(`#wiz-${statKey}-mod`);
    if (!input || !badge) return;
    const val = parseInt(input.value, 10) || 10;
    const mod = Math.floor((val - 10) / 2);
    const modStr = mod >= 0 ? '+' + mod : '' + mod;
    badge.textContent = modStr;
    badge.style.color = mod >= 0 ? '#81c784' : '#ef5350';
  }

  ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(stat => {
    const input = container.querySelector(`#wiz-${stat}`);
    if (input) {
      input.addEventListener('input', () => updateStatModDisplay(stat));
    }
  });

  // Roll Single Stat Button
  container.querySelectorAll('.roll-single-stat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const stat = btn.getAttribute('data-stat');
      const res = roll4d6DropLowest();
      const input = container.querySelector(`#wiz-${stat}`);
      if (input) {
        input.value = res.total;
        updateStatModDisplay(stat);
      }
      soundEngine.playDiceRoll(res.total >= 14);
      const log = container.querySelector('#stat-dice-roll-log');
      if (log) {
        log.style.display = 'block';
        log.innerHTML = `<strong>${stat.toUpperCase()} Roll:</strong> 4d6 [${res.rolls.join(', ')}] • Dropped lowest: <strong>${res.dropped}</strong> • Kept: <strong>[${res.kept.join(', ')}] = ${res.total}</strong>`;
      }
    });
  });

  // Roll All 6 Stats Button
  const rollAllBtn = container.querySelector('#roll-all-stats-btn');
  if (rollAllBtn) {
    rollAllBtn.addEventListener('click', () => {
      const stats = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
      const logs = [];
      stats.forEach(s => {
        const res = roll4d6DropLowest();
        const input = container.querySelector(`#wiz-${s}`);
        if (input) {
          input.value = res.total;
          updateStatModDisplay(s);
        }
        logs.push(`<strong>${s.toUpperCase()}</strong>: ${res.total} <span style="opacity: 0.7;">[${res.kept.join('+')}] (~${res.dropped}~)</span>`);
      });
      soundEngine.playDiceRoll(true);
      const log = container.querySelector('#stat-dice-roll-log');
      if (log) {
        log.style.display = 'block';
        log.innerHTML = `<strong>Rolled All 6 Ability Scores (4d6 drop lowest):</strong><br>${logs.join(' • ')}`;
      }
    });
  }

  // Standard Array Button (15, 14, 13, 12, 10, 8)
  const stdArrayBtn = container.querySelector('#standard-array-btn');
  if (stdArrayBtn) {
    stdArrayBtn.addEventListener('click', () => {
      const values = { str: 15, dex: 14, con: 13, int: 12, wis: 10, cha: 8 };
      Object.keys(values).forEach(s => {
        const input = container.querySelector(`#wiz-${s}`);
        if (input) {
          input.value = values[s];
          updateStatModDisplay(s);
        }
      });
      soundEngine.playDiceRoll(false);
      const log = container.querySelector('#stat-dice-roll-log');
      if (log) {
        log.style.display = 'block';
        log.innerHTML = `<strong>Standard Array Applied:</strong> STR: 15, DEX: 14, CON: 13, INT: 12, WIS: 10, CHA: 8`;
      }
    });
  }

  // Character Form Submit
  if (wizForm) {
    wizForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const regionSelect = container.querySelector('#wiz-entry-region');
      const selectedOption = regionSelect.options[regionSelect.selectedIndex];

      const newChar = {
        id: 'pc-' + Date.now(),
        name: container.querySelector('#wiz-name').value.trim(),
        playerName: container.querySelector('#wiz-player').value.trim(),
        avatar: container.querySelector('#wiz-avatar').value.trim() || 'PC',
        species: container.querySelector('#wiz-species').value.trim(),
        classRole: container.querySelector('#wiz-class').value.trim(),
        level: parseInt(container.querySelector('#wiz-level').value, 10) || 1,
        alignment: container.querySelector('#wiz-alignment').value.trim() || 'Neutral Good',
        hpCurrent: parseInt(container.querySelector('#wiz-hp').value, 10) || 30,
        hpMax: parseInt(container.querySelector('#wiz-hp').value, 10) || 30,
        tempHp: 0,
        ac: parseInt(container.querySelector('#wiz-ac').value, 10) || 14,
        speed: container.querySelector('#wiz-speed').value.trim() || '30 ft',
        initiativeMod: container.querySelector('#wiz-init').value.trim() || '+0',
        stats: {
          str: parseInt(container.querySelector('#wiz-str').value, 10) || 10,
          dex: parseInt(container.querySelector('#wiz-dex').value, 10) || 10,
          con: parseInt(container.querySelector('#wiz-con').value, 10) || 10,
          int: parseInt(container.querySelector('#wiz-int').value, 10) || 10,
          wis: parseInt(container.querySelector('#wiz-wis').value, 10) || 10,
          cha: parseInt(container.querySelector('#wiz-cha').value, 10) || 10
        },
        passivePerception: 10 + Math.floor(((parseInt(container.querySelector('#wiz-wis').value, 10) || 10) - 10) / 2),
        passiveInsight: 10 + Math.floor(((parseInt(container.querySelector('#wiz-wis').value, 10) || 10) - 10) / 2),
        weaponMasteries: container.querySelector('#wiz-masteries').value.split(',').map(s => s.trim()).filter(Boolean),
        entryPoint: {
          regionId: regionSelect.value,
          regionName: selectedOption ? selectedOption.getAttribute('data-name') : 'Crucible City',
          locationName: container.querySelector('#wiz-entry-location').value.trim() || 'Border Camp',
          entryBackstory: container.querySelector('#wiz-entry-story').value.trim() || 'Arrived at the bleeding frontiers.',
          dmHook: `Arrived through ${selectedOption ? selectedOption.getAttribute('data-name') : 'the realm'}; local rumors mention their arrival.`
        },
        personalityTraits: container.querySelector('#wiz-traits').value.trim(),
        inventory: container.querySelector('#wiz-inventory').value.trim() || 'Basic Adventuring Pack',
        dmSecrets: container.querySelector('#wiz-dmsecrets').value.trim(),
        conditions: []
      };

      worldState.addPartyCharacter(newChar);
      soundEngine.playDiceRoll(true);
      closeWizard();
      renderPartyView(container);
    });
  }

  // Import Character JSON
  if (importJsonBtn) {
    importJsonBtn.addEventListener('click', () => {
      const raw = prompt('Paste character JSON or array of character sheets:');
      if (!raw) return;
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          parsed.forEach(c => worldState.addPartyCharacter(c));
        } else if (parsed.name) {
          worldState.addPartyCharacter(parsed);
        }
        soundEngine.playDiceRoll(true);
        alert('Characters imported successfully!');
        renderPartyView(container);
      } catch (err) {
        alert('Invalid JSON format: ' + err.message);
      }
    });
  }

  // Export Party JSON
  if (exportPartyBtn) {
    exportPartyBtn.addEventListener('click', () => {
      const exportData = {
        partySettings: worldState.data.partySettings,
        partyCharacters: worldState.data.partyCharacters
      };
      const str = JSON.stringify(exportData, null, 2);
      const blob = new Blob([str], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `aetheria_party_roster_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }
}

  // COMPONENT: playerHeroView.js
/**
 * Player Hero Console & Daily Campaign Journal Component for D&D 5.5e
 * Features Account Ownership Access Control, DM Active Session Monitor,
 * Interactive Character Sheet, Current World Location Radar, and Daily Notes by Days with Titles
 */
function renderHeroView(container) {
  const { data, prefs } = worldState;
  const isDm = !!prefs.dmMode;
  const activeUser = worldState.getActiveUser();
  const allCharacters = data.partyCharacters || [];
  const allUsers = data.users || [];

  // =========================================================================
  // 1. ACCESS CONTROL CHECK: PROMPT LOGIN IF NOT LOGGED IN & NOT IN DM MODE
  // =========================================================================
  if (!activeUser && !isDm) {
    container.innerHTML = `
      <div class="view-header">
        <div>
          <h2>Player Hero Console & Campaign Journal</h2>
          <div class="view-tagline">Secure Adventurer Portal • 5.5e Tactical Sheet • Location Radar • Daily Chronicle</div>
        </div>
      </div>
      <div class="auth-required-container">
        <div class="auth-required-card">
          <div class="auth-lock-icon"></div>
          <h2 style="color: var(--text-gold); margin-bottom: 0.5rem;">Adventurer Sign-In Required</h2>
          <p style="color: var(--text-secondary); max-width: 540px; margin: 0.5rem auto 1.5rem; line-height: 1.6; font-size: 0.95rem;">
            To access your character's sheet, update your camp's tactical situation, and chronicle daily campaign logs, please sign into the account that commands this hero.
          </p>
          <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
            <button class="btn btn-primary btn-lg" id="hero-prompt-login-btn">
              Sign In to Your Account
            </button>
            <button class="btn btn-lg" id="hero-prompt-register-btn">
              Create Adventurer Account
            </button>
          </div>
          <div style="margin-top: 2rem; padding: 1rem; background: rgba(0,0,0,0.35); border: 1px dashed var(--border-subtle); border-radius: var(--radius-md); font-size: 0.85rem; color: var(--text-muted); text-align: left; max-width: 540px; margin-left: auto; margin-right: auto;">
            <strong style="color: var(--text-gold); display: block; margin-bottom: 0.35rem;">Available Player Accounts:</strong>
            <ul style="margin: 0; padding-left: 1.25rem; line-height: 1.5;">
              <li><code>alex</code> → Garrick Ironbrown Kegnir (Barbarian 5)</li>
              <li><code>sam</code> → Kaelen Shadow-Drift (Rogue 5)</li>
              <li><code>jordan</code> → Kirrag Snow-Breaker (Fighter 5)</li>
              <li><code>morgan</code> → Vespera Gale-Singer (Wizard 5)</li>
            </ul>
            <div style="margin-top: 0.5rem; font-size: 0.8rem; color: #ffab91;">
              <strong>Dungeon Masters:</strong> Click "Player Environment" at top right to enter DM mode.
            </div>
          </div>
        </div>
      </div>
    `;

    const playerAuthModal = document.getElementById('player-auth-modal');
    container.querySelector('#hero-prompt-login-btn')?.addEventListener('click', () => {
      if (playerAuthModal) {
        playerAuthModal.classList.add('active');
        document.getElementById('tab-login-btn')?.click();
      }
    });
    container.querySelector('#hero-prompt-register-btn')?.addEventListener('click', () => {
      if (playerAuthModal) {
        playerAuthModal.classList.add('active');
        document.getElementById('tab-register-btn')?.click();
      }
    });
    return;
  }

  // =========================================================================
  // 2. DETERMINE ACCESSIBLE CHARACTERS
  // =========================================================================
  // DM sees all characters. A player sees only characters they own/claimed.
  let allowedCharacters = [];
  if (isDm) {
    allowedCharacters = allCharacters;
  } else if (activeUser) {
    allowedCharacters = allCharacters.filter(c => c.id === activeUser.claimedCharId || c.playerName?.toLowerCase() === activeUser.displayName?.toLowerCase() || c.ownerUserId === activeUser.id);
  }

  // If player is logged in but hasn't claimed any character yet:
  if (!isDm && allowedCharacters.length === 0) {
    const unclaimed = allCharacters.filter(c => !allUsers.some(u => u.claimedCharId === c.id));
    container.innerHTML = `
      <div class="view-header">
        <div>
          <h2>Welcome, ${activeUser.displayName}!</h2>
          <div class="view-tagline">Claim an Adventurer to Begin Your Chronicle</div>
        </div>
      </div>
      <div style="max-width: 700px; margin: 2rem auto; text-align: center; background: var(--bg-card); border: 1px solid var(--border-strong); border-radius: var(--radius-lg); padding: 2.5rem 1.5rem;">
        <div style="font-size: 3rem; margin-bottom: 0.5rem;"></div>
        <h3 style="color: var(--text-gold); font-size: 1.4rem;">No Character Claimed for "${activeUser.username}"</h3>
        <p style="color: var(--text-secondary); margin: 0.5rem 0 1.5rem;">
          Select an available hero from the roster below to link them to your account, or create a brand new character!
        </p>

        ${unclaimed.length > 0 ? `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; text-align: left;">
            ${unclaimed.map(c => `
              <div style="background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem; display: flex; flex-direction: column; justify-content: space-between; gap: 0.5rem;">
                <div>
                  <div style="font-size: 1.5rem;">${c.avatar || 'PC'}</div>
                  <strong style="color: var(--text-gold); font-size: 1.05rem;">${c.name}</strong>
                  <div style="font-size: 0.8rem; color: var(--text-muted);">${c.species} • ${c.classRole} (Lvl ${c.level || 1})</div>
                </div>
                <button class="btn btn-sm btn-primary claim-this-hero-btn" data-id="${c.id}">
                  Claim & Play ${c.name}
                </button>
              </div>
            `).join('')}
          </div>
        ` : `
          <p style="color: var(--text-muted); font-style: italic; margin-bottom: 1.5rem;">All existing starter heroes are currently claimed. Create a new adventurer for your campaign!</p>
        `}

        <button class="btn" id="btn-jump-create-char">
          Create New Hero in Party Roster
        </button>
      </div>
    `;

    container.querySelectorAll('.claim-this-hero-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const charId = btn.getAttribute('data-id');
        worldState.claimCharacter(activeUser.id, charId);
        soundEngine.playDiceRoll(true);
        renderHeroView(container);
      });
    });

    container.querySelector('#btn-jump-create-char')?.addEventListener('click', () => {
      const createTab = document.querySelector('.nav-tab-btn[data-tab="create-hero"]');
      if (createTab) {
        createTab.click();
      } else {
        const partyTab = document.querySelector('.nav-tab-btn[data-tab="party"]');
        if (partyTab) partyTab.click();
      }
    });
    return;
  }

  // Get active hero
  let activeHero = null;
  if (!isDm && activeUser && activeUser.claimedCharId) {
    activeHero = allCharacters.find(c => c.id === activeUser.claimedCharId) || allowedCharacters[0];
  } else {
    activeHero = worldState.getActiveHero() || allowedCharacters[0];
  }

  if (!activeHero) {
    activeHero = allowedCharacters[0];
  }

  const entries = worldState.getJournalEntriesForChar(activeHero.id);
  const curHp = activeHero.hpCurrent !== undefined ? activeHero.hpCurrent : activeHero.hpMax;
  const maxHp = activeHero.hpMax || 1;
  const hpRatio = maxHp > 0 ? (curHp / maxHp) : 1;
  let hpFillClass = '';
  if (hpRatio <= 0.25) hpFillClass = 'critical';
  else if (hpRatio <= 0.5) hpFillClass = 'danger';

  function getMod(val) {
    const mod = Math.floor(((val || 10) - 10) / 2);
    return mod >= 0 ? '+' + mod : '' + mod;
  }

  const situation = activeHero.currentSituation || {
    locationName: activeHero.entryPoint?.locationName || 'Bleeding Frontier',
    regionId: activeHero.entryPoint?.regionId || 'region-crucible',
    regionName: activeHero.entryPoint?.regionName || 'The Primordial Crucible',
    climate: 'Temperate confluence of elemental winds',
    dangerLevel: 'Moderate',
    statusNote: activeHero.entryPoint?.entryBackstory || 'Active in the field.',
    lastUpdatedDay: 'Day 1'
  };

  // Find user owning this character (if any)
  const charOwner = allUsers.find(u => u.claimedCharId === activeHero.id || (activeHero.playerName && u.displayName.toLowerCase() === activeHero.playerName.toLowerCase()));

  container.innerHTML = `
    <!-- ========================================================================= -->
    <!-- 3. DM LIVE SESSION MONITOR (VISIBLE IN DM MODE)                           -->
    <!-- ========================================================================= -->
    ${isDm ? `
      <div class="dm-session-monitor-card">
        <div class="dm-monitor-header">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.3rem;"></span>
            <div>
              <strong style="color: #ff7961; font-size: 1.05rem; letter-spacing: 0.04em;">DM LIVE SESSION & PLAYER TABLE MONITOR</strong>
              <div style="font-size: 0.75rem; color: #ffcdd2;">Real-time overview of logged-in players, assigned heroes & camp situations</div>
            </div>
          </div>
          <span style="font-size: 0.75rem; background: rgba(244,67,54,0.25); border: 1px solid #f44336; color: #ffcdd2; padding: 0.2rem 0.6rem; border-radius: 12px; font-weight: bold;">
            DM Master Access
          </span>
        </div>

        <div class="dm-player-table-grid">
          ${allUsers.map(u => {
            const isCurrentActive = activeUser && activeUser.id === u.id;
            const hero = allCharacters.find(c => c.id === u.claimedCharId);
            const sit = hero?.currentSituation;
            return `
              <div class="dm-player-pill ${isCurrentActive ? 'online' : 'offline'} ${hero?.id === activeHero.id ? 'inspecting' : ''}">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <div style="display: flex; align-items: center; gap: 0.4rem;">
                    <span class="status-indicator-dot ${isCurrentActive ? 'dot-online' : 'dot-offline'}" title="${isCurrentActive ? 'Online / Logged In' : 'Registered / Offline'}"></span>
                    <strong style="color: var(--text-gold); font-size: 0.9rem;">${u.displayName}</strong>
                    <span style="font-size: 0.75rem; color: var(--text-muted);">(@${u.username})</span>
                  </div>
                  <span style="font-size: 0.7rem; color: ${isCurrentActive ? '#81c784' : 'var(--text-muted)'}; font-weight: bold;">
                    ${isCurrentActive ? 'LOGGED IN' : 'Standby'}
                  </span>
                </div>

                ${hero ? `
                  <div style="margin-top: 0.35rem; display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; background: rgba(0,0,0,0.3); padding: 0.35rem 0.5rem; border-radius: var(--radius-sm); font-size: 0.8rem;">
                    <div style="display: flex; align-items: center; gap: 0.35rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                      <span>${hero.avatar || 'PC'}</span>
                      <span style="font-weight: bold; color: var(--text-primary);">${hero.name}</span>
                      <span style="color: var(--text-muted); font-size: 0.75rem;">(Lvl ${hero.level || 1} ${hero.classRole.split(' ')[0]})</span>
                    </div>
                    <span style="font-size: 0.75rem; color: ${hero.hpCurrent <= hero.hpMax * 0.3 ? '#ff8a80' : '#a5d6a7'}; font-weight: bold;">
                      ${hero.hpCurrent || hero.hpMax}/${hero.hpMax} HP
                    </span>
                  </div>
                  ${sit ? `
                    <div style="font-size: 0.75rem; color: #ffcc80; margin-top: 0.25rem; font-style: italic; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                      ${sit.locationName || 'Field'} • "${sit.statusNote || 'Standing ready.'}"
                    </div>
                  ` : ''}
                  <button class="btn btn-tiny dm-inspect-hero-btn" data-char-id="${hero.id}" style="margin-top: 0.4rem; width: 100%; border-color: rgba(212,175,55,0.4); color: var(--text-gold);">
                    Inspect ${hero.name}'s Sheet & Journal
                  </button>
                ` : `
                  <div style="font-size: 0.75rem; color: var(--text-muted); font-style: italic; margin-top: 0.35rem;">
                    No hero currently claimed.
                  </div>
                `}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    ` : ''}

    <!-- Top Hero Console Header -->
    <div class="hero-console-header">
      <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
        <div class="hero-avatar-large">${activeHero.avatar || 'PC'}</div>
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
            <h2 style="margin: 0; font-size: 1.6rem; color: var(--text-gold);">${activeHero.name}</h2>
            <span class="meta-badge">${activeHero.alignment || 'Neutral'}</span>
            ${charOwner ? `
              <span style="font-size: 0.75rem; background: rgba(76, 175, 80, 0.2); border: 1px solid #4caf50; color: #a5d6a7; padding: 0.2rem 0.5rem; border-radius: 12px; font-weight: bold;">
                Owned by ${charOwner.displayName} (@${charOwner.username})
              </span>
            ` : `
              <span style="font-size: 0.75rem; background: rgba(255, 193, 7, 0.2); border: 1px solid #ffc107; color: #ffe082; padding: 0.2rem 0.5rem; border-radius: 12px;">
                Unclaimed Adventurer
              </span>
            `}
          </div>
          <div style="color: var(--text-secondary); font-size: 0.95rem; margin-top: 0.2rem;">
            ${activeHero.species} • <strong>${activeHero.classRole}</strong> (Level ${activeHero.level || 1})
          </div>
        </div>
      </div>

      <!-- Hero Switcher & Top Controls -->
      <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
        ${allowedCharacters.length > 1 ? `
          <select id="hero-select-dropdown" class="theme-select" style="padding: 0.4rem 0.75rem; font-size: 0.9rem;">
            ${allowedCharacters.map(c => `<option value="${c.id}" ${c.id === activeHero.id ? 'selected' : ''}>${c.avatar || 'PC'} ${c.name} (Lvl ${c.level || 1})</option>`).join('')}
          </select>
        ` : ''}
        <button class="btn btn-sm" id="btn-hero-short-rest" title="Take Short Rest">Short Rest</button>
        <button class="btn btn-sm btn-primary" id="btn-hero-long-rest" title="Take Long Rest">Long Rest</button>
        <button class="btn btn-sm" id="btn-hero-view-map" title="View Current Location on World Map">Map</button>
      </div>
    </div>

    <!-- Live Dice Check Result Banner -->
    <div id="hero-dice-result-banner" style="display: none; margin-bottom: 1rem;" class="bastion-turn-log"></div>

    <!-- Main Two-Column Layout -->
    <div class="hero-view-grid">
      
      <!-- LEFT COLUMN: 5.5e Tactical Sheet & Situation Radar -->
      <div class="hero-left-column">

        <!-- CURRENT WORLD LOCATION & SITUATION RADAR -->
        <div class="situation-radar-card">
          <div class="radar-header">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.2rem;"></span>
              <strong style="color: var(--text-gold); font-size: 1.05rem;">Current World Location & Situation</strong>
            </div>
            <span class="day-pill-badge">${situation.lastUpdatedDay || 'Day 1'}</span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; font-size: 0.85rem; margin-bottom: 0.6rem;">
            <div>
              <span style="color: var(--text-muted); font-size: 0.75rem; display: block;">CURRENT REGION</span>
              <strong style="color: var(--text-primary);">${situation.regionName || 'The Confluence'}</strong>
            </div>
            <div>
              <span style="color: var(--text-muted); font-size: 0.75rem; display: block;">CAMP / LANDMARK</span>
              <strong style="color: var(--text-primary);">${situation.locationName || 'Frontier Post'}</strong>
            </div>
            <div>
              <span style="color: var(--text-muted); font-size: 0.75rem; display: block;">CLIMATE & ATMOSPHERE</span>
              <span>${situation.climate || 'Variable'}</span>
            </div>
            <div>
              <span style="color: var(--text-muted); font-size: 0.75rem; display: block;">DANGER RATING</span>
              <span style="color: #ff8a80; font-weight: bold;">${situation.dangerLevel || 'Moderate'}</span>
            </div>
          </div>

          <!-- Live Editable Situation Note -->
          <div style="border-top: 1px dashed var(--border-subtle); padding-top: 0.6rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
              <span style="font-size: 0.75rem; font-weight: bold; color: var(--text-gold);">TACTICAL SITUATION & CAMP STATUS:</span>
              <button class="btn btn-tiny" id="edit-situation-toggle-btn">Update Situation</button>
            </div>
            <div id="situation-display-box" style="font-size: 0.9rem; font-style: italic; color: var(--text-secondary); line-height: 1.4; background: rgba(0,0,0,0.25); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm);">
              "${situation.statusNote || 'Standing ready with the party.'}"
            </div>

            <!-- Inline Edit Situation Form -->
            <div id="situation-edit-form" style="display: none; margin-top: 0.5rem;">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.4rem;">
                <input type="text" id="edit-sit-loc" class="editor-input" value="${situation.locationName || ''}" placeholder="Current Camp / Landmark">
                <input type="text" id="edit-sit-day" class="editor-input" value="${situation.lastUpdatedDay || 'Day 1'}" placeholder="e.g. Day 3, 14th of Frost">
              </div>
              <textarea id="edit-sit-text" class="editor-textarea" style="min-height: 60px; margin-bottom: 0.4rem;" placeholder="What is your character's immediate situation, watch order, or danger status?">${situation.statusNote || ''}</textarea>
              <div style="display: flex; justify-content: flex-end; gap: 0.4rem;">
                <button class="btn btn-sm" id="cancel-situation-btn">Cancel</button>
                <button class="btn btn-sm btn-primary" id="save-situation-btn">Save Situation</button>
              </div>
            </div>
          </div>
        </div>

        <!-- LIVE HP & COMBAT RADAR -->
        <div class="party-char-card" style="padding: 1.1rem;">
          <!-- HP Bar -->
          <div class="hp-bar-container" style="margin-bottom: 0.75rem;">
            <div class="hp-bar-labels">
              <span style="font-size: 1rem;"><strong>Hit Points:</strong> ${curHp} / ${maxHp} ${activeHero.tempHp > 0 ? `<span style="color: #42a5f5;">(+${activeHero.tempHp} Temp)</span>` : ''}</span>
              <div class="quick-hp-controls">
                <button class="quick-hp-btn hero-hp-adj" data-delta="-5">−5</button>
                <button class="quick-hp-btn hero-hp-adj" data-delta="-1">−1</button>
                <button class="quick-hp-btn hero-hp-adj" data-delta="1">+1</button>
                <button class="quick-hp-btn hero-hp-adj" data-delta="5">+5</button>
                <button class="quick-hp-btn hero-temp-adj" title="Add 5 Temp HP">+5 Temp</button>
              </div>
            </div>
            <div class="hp-bar-track" style="height: 14px;">
              <div class="hp-bar-fill ${hpFillClass}" style="width: ${Math.min(100, Math.max(0, Math.round(hpRatio * 100)))}%;"></div>
            </div>
          </div>

          <!-- Combat Defense Stats -->
          <div class="char-core-stats-row" style="margin-bottom: 0.85rem;">
            <div class="core-stat-item">
              <div class="stat-num">${activeHero.ac || 15}</div>
              <div class="stat-lbl">ARMOR CLASS</div>
            </div>
            <div class="core-stat-item">
              <div class="stat-num">${activeHero.initiativeMod || '+0'}</div>
              <div class="stat-lbl">INITIATIVE</div>
            </div>
            <div class="core-stat-item">
              <div class="stat-num">${activeHero.speed || '30 ft'}</div>
              <div class="stat-lbl">SPEED</div>
            </div>
            <div class="core-stat-item">
              <div class="stat-num">${activeHero.passivePerception || 10}</div>
              <div class="stat-lbl">PASSIVE PERC</div>
            </div>
          </div>

          <!-- 6 Ability Scores with Interactive Rollers -->
          <div>
            <div style="font-size: 0.75rem; font-weight: bold; color: var(--text-gold); margin-bottom: 0.4rem; display: flex; justify-content: space-between;">
              <span>ABILITY SCORES & ROLLS</span>
              <span style="font-size: 0.7rem; color: var(--text-muted);">(Click score to roll Check, 'Save' for Saving Throw)</span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 0.35rem; text-align: center;">
              ${['str', 'dex', 'con', 'int', 'wis', 'cha'].map(s => {
                const val = activeHero.stats?.[s] || 10;
                const mod = getMod(val);
                return `
                  <div class="score-input-box" style="padding: 0.35rem 0.15rem; background: var(--bg-tertiary);">
                    <div style="font-weight: bold; color: var(--text-gold); font-size: 0.75rem;">${s.toUpperCase()}</div>
                    <button class="roll-check-btn" data-stat="${s}" data-mod="${mod}" data-val="${val}" style="background: none; border: none; cursor: pointer; color: var(--text-primary); font-size: 1.1rem; font-weight: bold; font-family: var(--font-heading);" title="Roll ${s.toUpperCase()} Check (d20 ${mod})">
                      ${val}
                    </button>
                    <div style="font-size: 0.75rem; color: #81c784; font-weight: bold;">${mod}</div>
                    <button class="btn-tiny roll-save-btn" data-stat="${s}" data-mod="${mod}" style="margin-top: 0.2rem; font-size: 0.65rem;" title="Roll ${s.toUpperCase()} Saving Throw">
                      Save
                    </button>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- 5.5e Weapon Masteries -->
          ${activeHero.weaponMasteries && activeHero.weaponMasteries.length > 0 ? `
            <div style="margin-top: 0.85rem;">
              <div style="font-size: 0.75rem; font-weight: bold; color: var(--text-gold); margin-bottom: 0.25rem;">
                5.5e WEAPON MASTERIES
              </div>
              <div style="display: flex; flex-wrap: wrap; gap: 0.3rem;">
                ${activeHero.weaponMasteries.map(m => `<span class="mastery-badge">${m}</span>`).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Class Resources & Conditions -->
          <div style="margin-top: 0.85rem; display: flex; flex-direction: column; gap: 0.6rem;">
            ${activeHero.classResources ? `
              <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.3); padding: 0.4rem 0.6rem; border-radius: var(--radius-sm); font-size: 0.85rem;">
                <span><strong>${activeHero.classResources.label || 'Resources'}:</strong></span>
                <div style="display: flex; align-items: center; gap: 0.4rem;">
                  <button class="quick-hp-btn hero-res-adj" data-delta="-1">−</button>
                  <span style="font-weight: bold; color: var(--text-gold);">${activeHero.classResources.current || 0} / ${activeHero.classResources.max || 1}</span>
                  <button class="quick-hp-btn hero-res-adj" data-delta="1">+</button>
                </div>
              </div>
            ` : ''}

            <!-- Conditions Pills -->
            <div class="conditions-pills-row">
              ${['Advantage', 'Blessed', 'Poisoned', 'Restrained', 'Stunned', 'Unconscious', 'Exhaustion'].map(cond => `
                <span class="condition-pill ${(activeHero.conditions || []).includes(cond) ? 'active' : ''}" data-condition="${cond}">
                  ${cond}
                </span>
              `).join('')}
            </div>
          </div>

          <!-- Inventory & Roleplay Dossier -->
          <details style="margin-top: 0.85rem; font-size: 0.85rem; border-top: 1px solid var(--border-subtle); padding-top: 0.5rem;">
            <summary style="cursor: pointer; color: var(--text-gold); font-weight: bold;">Backstory, Equipment & Character Dossier</summary>
            <div style="margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.4rem; color: var(--text-secondary);">
              ${activeHero.personalityTraits ? `<div><strong>Personality:</strong> ${activeHero.personalityTraits}</div>` : ''}
              ${activeHero.ideals ? `<div><strong>Ideals:</strong> ${activeHero.ideals}</div>` : ''}
              ${activeHero.bonds ? `<div><strong>Bonds:</strong> ${activeHero.bonds}</div>` : ''}
              ${activeHero.flaws ? `<div><strong>Flaws:</strong> ${activeHero.flaws}</div>` : ''}
              ${activeHero.inventory ? `<div style="background: rgba(0,0,0,0.25); padding: 0.4rem; border-radius: var(--radius-sm);"><strong>Gear & Coins:</strong> ${activeHero.inventory}</div>` : ''}
            </div>
          </details>
        </div>
      </div>

      <!-- RIGHT COLUMN: Chronological Daily Journal ("Adventurer's Log by Days with Titles") -->
      <div class="hero-right-column">
        <div class="journal-container-card">
          
          <!-- Journal Header -->
          <div class="journal-header">
            <div>
              <h3 style="color: var(--text-gold); font-size: 1.2rem; display: flex; align-items: center; gap: 0.5rem; margin: 0;">
                Adventurer's Log & Daily Situation Journal
              </h3>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.15rem;">
                Chronological campaign chronicle organized by in-game days with titles
              </div>
            </div>
            <button class="btn btn-primary" id="open-new-journal-modal-btn">
              + New Day Entry
            </button>
          </div>

          <!-- Search / Filter Log Bar -->
          <div style="margin: 0.85rem 0; display: flex; gap: 0.5rem;">
            <input type="text" id="journal-search-input" class="editor-input" placeholder="Filter daily notes by title, day (e.g. Day 1), location, or tags..." style="width: 100%; padding: 0.45rem 0.75rem; font-size: 0.85rem;">
          </div>

          <!-- Daily Timeline Entries List -->
          <div class="journal-timeline-list" id="journal-entries-timeline"></div>
        </div>
      </div>
    </div>

    <!-- NEW JOURNAL ENTRY MODAL -->
    <div class="modal-overlay" id="new-journal-modal">
      <div class="modal-card" style="max-width: 600px; max-height: 90vh; display: flex; flex-direction: column;">
        <div class="modal-header">
          <h3 style="color: var(--text-gold); display: flex; align-items: center; gap: 0.5rem;">
            Log New Day Campaign Entry
          </h3>
          <button class="close-btn" id="close-journal-modal-btn">&times;</button>
        </div>
        <div class="modal-body" style="overflow-y: auto; padding: 1.25rem;">
          <form id="new-journal-form" style="display: flex; flex-direction: column; gap: 0.85rem;">
            
            <div style="display: grid; grid-template-columns: 120px 1fr; gap: 0.75rem;">
              <div class="editor-form-group">
                <label class="editor-label">Day / Date *</label>
                <input type="text" id="j-form-day" class="editor-input" required value="Day ${entries.length + 1}" placeholder="e.g. Day 3">
              </div>
              <div class="editor-form-group">
                <label class="editor-label">Day Title / Headline *</label>
                <input type="text" id="j-form-title" class="editor-input" required placeholder="e.g. The Ambush at the Spires">
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
              <div class="editor-form-group">
                <label class="editor-label">Location / Region</label>
                <input type="text" id="j-form-location" class="editor-input" value="${situation.locationName || ''}" placeholder="e.g. Mist Spire Steps">
              </div>
              <div class="editor-form-group">
                <label class="editor-label">Tags (Comma-separated)</label>
                <input type="text" id="j-form-tags" class="editor-input" value="Journey, Exploration" placeholder="e.g. Combat, Discovery, Relic">
              </div>
            </div>

            <div class="editor-form-group">
              <label class="editor-label">Daily Chronicle & Situation Notes *</label>
              <textarea id="j-form-notes" class="editor-textarea" style="min-height: 110px;" required placeholder="What happened on this day? Who did you meet, what clues did you uncover, or what foes were slain?"></textarea>
            </div>

            <div class="editor-form-group" style="background: rgba(212, 175, 55, 0.08); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.6rem;">
              <label class="editor-label" style="font-size: 0.8rem; margin-bottom: 0.25rem;">
                Immediate Camp / Situation Summary (Updates Character Location Radar)
              </label>
              <input type="text" id="j-form-situation" class="editor-input" placeholder="e.g. Resting in a cave near the waterfall; watch order set.">
            </div>

            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="checkbox" id="j-form-private">
              <label for="j-form-private" style="font-size: 0.85rem; color: var(--text-secondary); cursor: pointer;">
                Mark as Private Note (Only visible to you and the DM)
              </label>
            </div>

            <div class="modal-footer" style="padding: 0; margin-top: 0.5rem;">
              <button type="button" class="btn" id="cancel-journal-modal-btn">Cancel</button>
              <button type="submit" class="btn btn-primary">Save Day Entry to Journal</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  // Attach Event Handlers
  const heroSelect = container.querySelector('#hero-select-dropdown');
  const shortRestBtn = container.querySelector('#btn-hero-short-rest');
  const longRestBtn = container.querySelector('#btn-hero-long-rest');
  const viewMapBtn = container.querySelector('#btn-hero-view-map');
  const diceResultBanner = container.querySelector('#hero-dice-result-banner');
  const timelineContainer = container.querySelector('#journal-entries-timeline');
  const searchInput = container.querySelector('#journal-search-input');

  // Situation Form Controls
  const editSitBtn = container.querySelector('#edit-situation-toggle-btn');
  const sitDisplay = container.querySelector('#situation-display-box');
  const sitForm = container.querySelector('#situation-edit-form');
  const cancelSitBtn = container.querySelector('#cancel-situation-btn');
  const saveSitBtn = container.querySelector('#save-situation-btn');

  // Journal Modal Controls
  const journalModal = container.querySelector('#new-journal-modal');
  const openJournalModalBtn = container.querySelector('#open-new-journal-modal-btn');
  const closeJournalModalBtn = container.querySelector('#close-journal-modal-btn');
  const cancelJournalModalBtn = container.querySelector('#cancel-journal-modal-btn');
  const newJournalForm = container.querySelector('#new-journal-form');

  // DM Inspect Button Listeners
  container.querySelectorAll('.dm-inspect-hero-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cId = btn.getAttribute('data-char-id');
      worldState.setActiveHero(cId);
      renderHeroView(container);
    });
  });

  // Switch Active Hero
  if (heroSelect) {
    heroSelect.addEventListener('change', (e) => {
      worldState.setActiveHero(e.target.value);
      renderHeroView(container);
    });
  }

  // Rest Controls
  if (shortRestBtn) {
    shortRestBtn.addEventListener('click', () => {
      const heal = Math.floor(activeHero.hpMax * 0.4);
      activeHero.hpCurrent = Math.min(activeHero.hpMax, (activeHero.hpCurrent || 0) + heal);
      worldState.saveData();
      soundEngine.playDiceRoll(true);
      alert(`Short Rest completed! ${activeHero.name} regained ${heal} HP.`);
      renderHeroView(container);
    });
  }

  if (longRestBtn) {
    longRestBtn.addEventListener('click', () => {
      activeHero.hpCurrent = activeHero.hpMax;
      activeHero.tempHp = 0;
      if (activeHero.classResources && activeHero.classResources.max) {
        activeHero.classResources.current = activeHero.classResources.max;
      }
      activeHero.conditions = [];
      worldState.saveData();
      soundEngine.playDiceRoll(true);
      alert(`Long Rest completed! ${activeHero.name} fully restored HP, cleared conditions, and refilled class resources.`);
      renderHeroView(container);
    });
  }

  // Jump to World Map
  if (viewMapBtn) {
    viewMapBtn.addEventListener('click', () => {
      if (situation.regionId) {
        worldState.setSelectedRegion(situation.regionId);
      }
      const mapTab = document.querySelector('.nav-tab-btn[data-tab="map"]');
      if (mapTab) mapTab.click();
    });
  }

  // Quick HP Controls
  container.querySelectorAll('.hero-hp-adj').forEach(btn => {
    btn.addEventListener('click', () => {
      const delta = parseInt(btn.getAttribute('data-delta'), 10);
      worldState.adjustPartyHp(activeHero.id, delta, false);
      soundEngine.playDiceRoll(delta > 0);
      renderHeroView(container);
    });
  });

  container.querySelector('.hero-temp-adj')?.addEventListener('click', () => {
    worldState.adjustPartyHp(activeHero.id, 5, true);
    soundEngine.playDiceRoll(true);
    renderHeroView(container);
  });

  // Class Resources Adjustment
  container.querySelectorAll('.hero-res-adj').forEach(btn => {
    btn.addEventListener('click', () => {
      const delta = parseInt(btn.getAttribute('data-delta'), 10);
      if (activeHero.classResources) {
        activeHero.classResources.current = Math.max(0, Math.min(activeHero.classResources.max || 10, (activeHero.classResources.current || 0) + delta));
        worldState.saveData();
        renderHeroView(container);
      }
    });
  });

  // Conditions Toggle
  container.querySelectorAll('.condition-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const cond = pill.getAttribute('data-condition');
      worldState.togglePartyCondition(activeHero.id, cond);
      renderHeroView(container);
    });
  });

  // Ability Check & Saving Throw Dice Rollers
  function handleDiceRoll(statName, modStr, isSave = false) {
    const mod = parseInt(modStr, 10) || 0;
    const d20 = Math.floor(Math.random() * 20) + 1;
    const total = d20 + mod;
    const isCrit = d20 === 20;
    const isFumble = d20 === 1;

    soundEngine.playDiceRoll(d20 >= 10);

    let critText = '';
    if (isCrit) critText = '<span style="color: #ffeb3b; font-weight: bold;"> NATURAL 20!</span>';
    if (isFumble) critText = '<span style="color: #f44336; font-weight: bold;"> NATURAL 1!</span>';

    diceResultBanner.style.display = 'block';
    diceResultBanner.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong style="color: var(--text-gold); font-size: 1.1rem;">
            ${activeHero.name}'s ${statName.toUpperCase()} ${isSave ? 'Saving Throw' : 'Ability Check'}:
          </strong>
          <span style="font-size: 1.25rem; font-weight: bold; margin-left: 0.5rem; color: #ffffff;">
            ${total}
          </span>
          ${critText}
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.15rem; font-family: var(--font-mono);">
            Roll: [d20: ${d20}] ${mod >= 0 ? '+' : ''}${mod} modifier = <strong>${total}</strong>
          </div>
        </div>
        <button class="btn btn-tiny" id="dismiss-roll-banner">&times;</button>
      </div>
    `;

    diceResultBanner.querySelector('#dismiss-roll-banner')?.addEventListener('click', () => {
      diceResultBanner.style.display = 'none';
    });
  }

  container.querySelectorAll('.roll-check-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const stat = btn.getAttribute('data-stat');
      const mod = btn.getAttribute('data-mod');
      handleDiceRoll(stat, mod, false);
    });
  });

  container.querySelectorAll('.roll-save-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const stat = btn.getAttribute('data-stat');
      const mod = btn.getAttribute('data-mod');
      handleDiceRoll(stat, mod, true);
    });
  });

  // Situation Edit Toggle
  if (editSitBtn) {
    editSitBtn.addEventListener('click', () => {
      sitDisplay.style.display = 'none';
      sitForm.style.display = 'block';
    });
  }
  if (cancelSitBtn) {
    cancelSitBtn.addEventListener('click', () => {
      sitForm.style.display = 'none';
      sitDisplay.style.display = 'block';
    });
  }
  if (saveSitBtn) {
    saveSitBtn.addEventListener('click', () => {
      const loc = container.querySelector('#edit-sit-loc').value.trim();
      const day = container.querySelector('#edit-sit-day').value.trim();
      const text = container.querySelector('#edit-sit-text').value.trim();
      worldState.updateCharacterSituation(activeHero.id, loc, text, day);
      soundEngine.playDiceRoll(true);
      renderHeroView(container);
    });
  }

  // Journal Timeline Renderer
  function renderJournalTimeline(query = '') {
    const term = query.toLowerCase();
    const filtered = entries.filter(e => {
      return e.title.toLowerCase().includes(term) ||
             e.day.toLowerCase().includes(term) ||
             e.location.toLowerCase().includes(term) ||
             e.notes.toLowerCase().includes(term) ||
             (e.tags && e.tags.some(t => t.toLowerCase().includes(term)));
    });

    if (filtered.length === 0) {
      timelineContainer.innerHTML = `
        <div style="text-align: center; padding: 2.5rem; background: var(--bg-tertiary); border: 1px dashed var(--border-subtle); border-radius: var(--radius-md); color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.35rem;"></div>
          <p>No journal entries matching your search. Click <strong>"+ New Day Entry"</strong> to chronicle your hero's journey!</p>
        </div>
      `;
      return;
    }

    timelineContainer.innerHTML = filtered.map(item => {
      const formattedDate = new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      return `
        <div class="journal-day-card" data-entry-id="${item.id}">
          <div class="journal-card-header">
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <span class="day-number-badge">${item.day}</span>
              <h4 style="margin: 0; color: var(--text-gold); font-size: 1.05rem;">${item.title}</h4>
              ${item.isPrivate ? `<span style="font-size: 0.7rem; color: #ffab91; background: rgba(244,67,54,0.15); border: 1px solid rgba(244,67,54,0.3); padding: 0.1rem 0.4rem; border-radius: 8px;">Private</span>` : ''}
            </div>
            <div style="display: flex; gap: 0.35rem; align-items: center;">
              <span style="font-size: 0.75rem; color: var(--text-muted);">${formattedDate}</span>
              <button class="btn-tiny delete-entry-btn" data-id="${item.id}" title="Delete Entry" style="color: #ff8a80;"></button>
            </div>
          </div>

          <div style="font-size: 0.8rem; color: var(--text-secondary); margin: 0.35rem 0; display: flex; align-items: center; gap: 0.35rem;">
            <span><strong>${item.location || 'The Bleeding Realms'}</strong></span>
          </div>

          <div class="journal-body-text">${item.notes}</div>

          ${item.situation ? `
            <div style="margin-top: 0.5rem; font-size: 0.8rem; font-style: italic; color: #81c784; background: rgba(0,0,0,0.2); padding: 0.35rem 0.5rem; border-radius: var(--radius-sm);">
              <strong>Situation at Camp:</strong> "${item.situation}"
            </div>
          ` : ''}

          ${item.tags && item.tags.length > 0 ? `
            <div style="display: flex; flex-wrap: wrap; gap: 0.25rem; margin-top: 0.5rem;">
              ${item.tags.map(t => `<span class="journal-tag-pill">#${t}</span>`).join('')}
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    timelineContainer.querySelectorAll('.delete-entry-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (confirm('Are you sure you want to delete this journal entry?')) {
          worldState.deleteJournalEntry(id);
          renderHeroView(container);
        }
      });
    });
  }

  renderJournalTimeline();

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderJournalTimeline(e.target.value);
    });
  }

  // Journal Modal Open/Close
  function openJournalModal() {
    journalModal.classList.add('active');
    newJournalForm.reset();
    container.querySelector('#j-form-day').value = `Day ${entries.length + 1}`;
    container.querySelector('#j-form-location').value = situation.locationName || '';
  }
  function closeJournalModal() {
    journalModal.classList.remove('active');
  }

  if (openJournalModalBtn) openJournalModalBtn.addEventListener('click', openJournalModal);
  if (closeJournalModalBtn) closeJournalModalBtn.addEventListener('click', closeJournalModal);
  if (cancelJournalModalBtn) cancelJournalModalBtn.addEventListener('click', closeJournalModal);

  if (newJournalForm) {
    newJournalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newEntry = {
        charId: activeHero.id,
        day: container.querySelector('#j-form-day').value.trim() || `Day ${entries.length + 1}`,
        title: container.querySelector('#j-form-title').value.trim() || 'Untitled Day Entry',
        location: container.querySelector('#j-form-location').value.trim() || situation.locationName || 'The Bleeding Realms',
        notes: container.querySelector('#j-form-notes').value.trim(),
        situation: container.querySelector('#j-form-situation').value.trim(),
        tags: container.querySelector('#j-form-tags').value.split(',').map(s => s.trim()).filter(Boolean),
        isPrivate: container.querySelector('#j-form-private').checked
      };

      worldState.addJournalEntry(newEntry);
      soundEngine.playDiceRoll(true);
      closeJournalModal();
      renderHeroView(container);
    });
  }
}

  // COMPONENT: characterCreateView.js
/**
 * Character Creation Screen for D&D 5.5e
 * Standard Array, Point Buy (27 pts), 4d6 Drop Lowest, and Custom / Manual Stat Input
 * Saves character directly to active player account and party roster for immediate gameplay.
 */
function renderCharacterCreateView(container) {
  const activeUser = worldState.getActiveUser();

  // 5.5e Data Reference
  const SPECIES_LIST = [
    { name: 'Human', speed: '30 ft', trait: 'Resourceful (Inspiration per Long Rest), Skillful, Versatile' },
    { name: 'Elf', speed: '30 ft', trait: 'Darkvision 60ft, Keen Senses (Perception prof), Fey Ancestry' },
    { name: 'Dwarf', speed: '30 ft', trait: 'Darkvision 120ft, Dwarven Resilience (Poison res), Toughness (+1 HP/lvl)' },
    { name: 'Halfling', speed: '30 ft', trait: 'Lucky (Reroll 1s on d20), Brave, Halfling Nimbleness' },
    { name: 'Dragonborn', speed: '30 ft', trait: 'Breath Weapon (Line/Cone 1d10), Elemental Damage Resistance' },
    { name: 'Gnome', speed: '30 ft', trait: 'Darkvision 60ft, Gnomish Cunning (Adv on INT/WIS/CHA saves)' },
    { name: 'Tiefling', speed: '30 ft', trait: 'Darkvision 60ft, Fiendish Legacy (Thaumaturgy, Fire Resistance)' },
    { name: 'Orc', speed: '30 ft', trait: 'Darkvision 120ft, Adrenaline Rush (Bonus Dash + Temp HP), Relentless Endurance' },
    { name: 'Goliath', speed: '35 ft', trait: 'Giant Ancestry, Large Form (Enlarge bonus), Powerful Build' },
    { name: 'Aasimar', speed: '30 ft', trait: 'Celestial Revelation (Wings/Radiance), Healing Hands, Necrotic/Radiant Res' }
  ];

  const CLASS_LIST = [
    { name: 'Barbarian', hitDie: 12, primary: 'STR & CON', masteries: ['Cleave (Greataxe)', 'Topple (Warhammer)'], armor: 'Shields, Light & Medium Armor' },
    { name: 'Bard', hitDie: 8, primary: 'CHA & DEX', masteries: ['Vex (Shortsword)'], armor: 'Light Armor' },
    { name: 'Cleric', hitDie: 8, primary: 'WIS & CON', masteries: ['Sap (Mace)'], armor: 'Shields, Light & Medium Armor' },
    { name: 'Druid', hitDie: 8, primary: 'WIS & CON', masteries: ['Slow (Quarterstaff)'], armor: 'Shields & Light Armor' },
    { name: 'Fighter', hitDie: 10, primary: 'STR/DEX & CON', masteries: ['Push (Pike)', 'Graze (Greatsword)', 'Topple (Battleaxe)'], armor: 'All Armor & Shields' },
    { name: 'Monk', hitDie: 8, primary: 'DEX & WIS', masteries: ['Nick (Dagger)'], armor: 'Unarmored Defense' },
    { name: 'Paladin', hitDie: 10, primary: 'STR & CHA', masteries: ['Push (Halberd)', 'Sap (Flail)'], armor: 'All Armor & Shields' },
    { name: 'Ranger', hitDie: 10, primary: 'DEX & WIS', masteries: ['Slow (Longbow)', 'Vex (Scimitar)'], armor: 'Shields, Light & Medium Armor' },
    { name: 'Rogue', hitDie: 8, primary: 'DEX', masteries: ['Nick (Dagger)', 'Vex (Rapier)'], armor: 'Light Armor' },
    { name: 'Sorcerer', hitDie: 6, primary: 'CHA & CON', masteries: [], armor: 'None' },
    { name: 'Warlock', hitDie: 8, primary: 'CHA & CON', masteries: ['Sap (Mace)'], armor: 'Light Armor' },
    { name: 'Wizard', hitDie: 6, primary: 'INT & CON', masteries: [], armor: 'None' }
  ];

  const BACKGROUND_LIST = [
    { name: 'Wayfarer', feat: 'Lucky' },
    { name: 'Soldier', feat: 'Savage Attacker' },
    { name: 'Acolyte', feat: 'Magic Initiate (Cleric)' },
    { name: 'Criminal', feat: 'Alert' },
    { name: 'Guard', feat: 'Alert' },
    { name: 'Guide', feat: 'Magic Initiate (Druid)' },
    { name: 'Hermit', feat: 'Healer' },
    { name: 'Noble', feat: 'Skilled' },
    { name: 'Sage', feat: 'Magic Initiate (Wizard)' },
    { name: 'Sailor', feat: 'Tavern Brawler' },
    { name: 'Artisan', feat: 'Crafter' }
  ];

  const POINT_BUY_COST = {
    8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9
  };

  // Local state for creator
  let state = {
    activeMethod: 'standard', // 'standard', 'point-buy', 'roll', 'custom'
    stats: { str: 15, dex: 14, con: 13, int: 12, wis: 10, cha: 8 },
    standardAssigned: { str: 15, dex: 14, con: 13, int: 12, wis: 10, cha: 8 },
    pointBuy: { str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8 },
    rolledPools: [
      { dice: [5, 4, 3, 1], dropped: 1, total: 12 },
      { dice: [6, 5, 4, 2], dropped: 2, total: 15 },
      { dice: [5, 5, 4, 3], dropped: 3, total: 14 },
      { dice: [6, 4, 3, 2], dropped: 2, total: 13 },
      { dice: [4, 4, 2, 1], dropped: 1, total: 10 },
      { dice: [3, 3, 2, 1], dropped: 1, total: 8 }
    ],
    selectedClass: CLASS_LIST[4], // Fighter
    selectedSpecies: SPECIES_LIST[0], // Human
    level: 1,
    characterName: '',
    selectedBackground: BACKGROUND_LIST[0],
    alignment: 'Neutral Good',
    backstory: ''
  };

  function getMod(val) {
    const num = parseInt(val, 10) || 10;
    return Math.floor((num - 10) / 2);
  }

  function formatMod(val) {
    const m = getMod(val);
    return m >= 0 ? `+${m}` : `${m}`;
  }

  function getPointBuySpent() {
    return Object.values(state.pointBuy).reduce((sum, score) => sum + (POINT_BUY_COST[score] || 0), 0);
  }

  function calculateHp() {
    const conMod = getMod(getActiveStats().con);
    const hitDie = state.selectedClass.hitDie;
    const lvl = parseInt(state.level, 10) || 1;
    if (lvl <= 1) return hitDie + conMod;
    const avgIncrease = Math.floor(hitDie / 2) + 1 + conMod;
    return Math.max(1, (hitDie + conMod) + (lvl - 1) * avgIncrease);
  }

  function calculateAc() {
    const dexMod = getMod(getActiveStats().dex);
    const conMod = getMod(getActiveStats().con);
    const wisMod = getMod(getActiveStats().wis);

    if (state.selectedClass.name === 'Barbarian') {
      return 10 + dexMod + conMod;
    }
    if (state.selectedClass.name === 'Monk') {
      return 10 + dexMod + wisMod;
    }
    if (state.selectedClass.name === 'Fighter' || state.selectedClass.name === 'Paladin') {
      return 16; // Chain Mail default
    }
    return 11 + dexMod; // Leather armor default
  }

  function getActiveStats() {
    if (state.activeMethod === 'standard') return state.standardAssigned;
    if (state.activeMethod === 'point-buy') return state.pointBuy;
    if (state.activeMethod === 'roll') return state.stats;
    return state.stats; // custom
  }

  function roll4d6DropLowest() {
    const pools = [];
    for (let i = 0; i < 6; i++) {
      const rolls = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
      ];
      rolls.sort((a, b) => b - a);
      const dropped = rolls.pop();
      const total = rolls.reduce((sum, d) => sum + d, 0);
      pools.push({ dice: [...rolls, dropped], dropped, total });
    }
    state.rolledPools = pools;
    // Auto-assign descending to primary abilities
    const sortedTotals = pools.map(p => p.total).sort((a, b) => b - a);
    state.stats.str = sortedTotals[0];
    state.stats.con = sortedTotals[1];
    state.stats.dex = sortedTotals[2];
    state.stats.wis = sortedTotals[3];
    state.stats.int = sortedTotals[4];
    state.stats.cha = sortedTotals[5];
  }

  function render() {
    const activeStats = getActiveStats();
    const hp = calculateHp();
    const ac = calculateAc();
    const dexMod = formatMod(activeStats.dex);
    const speed = state.selectedSpecies.speed;
    const spentPoints = getPointBuySpent();
    const remainingPoints = 27 - spentPoints;

    container.innerHTML = `
      <div class="view-header">
        <div>
          <h2>✦ Hero Forge & Character Creation (D&D 5.5e)</h2>
          <div class="view-tagline">Create an adventurer with Standard Array, Point Buy, 4d6 Dice Roll, or Custom Stats &bull; Saves directly to your account.</div>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <button class="btn btn-sm btn-back" id="btn-cancel-creation">&larr; Return to Party</button>
        </div>
      </div>

      <!-- Account Connection Header Banner -->
      <div style="margin-bottom: 1.5rem; background: var(--bg-card); border: 1px solid ${activeUser ? 'rgba(76, 175, 80, 0.4)' : 'rgba(212, 175, 55, 0.4)'}; border-radius: var(--radius-md); padding: 0.85rem 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
        <div>
          <span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-gold); font-weight: 700;">Account Link:</span>
          ${activeUser ? `
            <span style="margin-left: 0.5rem; font-size: 0.95rem; color: #81c784; font-weight: 600;">
              👤 Bound to <strong>${activeUser.displayName}</strong> (@${activeUser.username})
            </span>
          ` : `
            <span style="margin-left: 0.5rem; font-size: 0.9rem; color: var(--text-secondary);">
              Unregistered (Saving will create a guest hero, or you can sign in below)
            </span>
          `}
        </div>
        ${!activeUser ? `
          <button type="button" class="btn btn-sm" id="btn-login-before-create" style="background: rgba(212, 175, 55, 0.2); border-color: var(--accent-gold); color: var(--text-gold);">
            Sign In / Register Account
          </button>
        ` : ''}
      </div>

      <div style="display: grid; grid-template-columns: 1fr 340px; gap: 1.5rem; align-items: start;">
        <!-- Left Column: Creation Form -->
        <div style="background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.5rem;">
          
          <!-- Step 1: Character Basics -->
          <h3 style="color: var(--text-gold); margin-bottom: 1rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.4rem; font-size: 1.15rem;">
            1. Character Identity & Origins
          </h3>

          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div class="form-group">
              <label for="create-char-name">Hero Name *</label>
              <input type="text" id="create-char-name" class="form-control" placeholder="e.g. Kaelen Ash-Walker" value="${state.characterName}" required>
            </div>
            <div class="form-group">
              <label for="create-char-level">Level</label>
              <input type="number" id="create-char-level" class="form-control" min="1" max="20" value="${state.level}">
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div class="form-group">
              <label for="create-char-species">5.5e Species / Lineage</label>
              <select id="create-char-species" class="form-control">
                ${SPECIES_LIST.map(s => `<option value="${s.name}" ${s.name === state.selectedSpecies.name ? 'selected' : ''}>${s.name} (${s.speed})</option>`).join('')}
              </select>
              <small style="color: var(--text-muted); font-size: 0.75rem; display: block; margin-top: 0.25rem;">${state.selectedSpecies.trait}</small>
            </div>

            <div class="form-group">
              <label for="create-char-class">Class (D&D 5.5e)</label>
              <select id="create-char-class" class="form-control">
                ${CLASS_LIST.map(c => `<option value="${c.name}" ${c.name === state.selectedClass.name ? 'selected' : ''}>${c.name} (d${c.hitDie}) - ${c.primary}</option>`).join('')}
              </select>
              <small style="color: var(--text-muted); font-size: 0.75rem; display: block; margin-top: 0.25rem;">Armor: ${state.selectedClass.armor}</small>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
            <div class="form-group">
              <label for="create-char-background">5.5e Background</label>
              <select id="create-char-background" class="form-control">
                ${BACKGROUND_LIST.map(b => `<option value="${b.name}" ${b.name === state.selectedBackground.name ? 'selected' : ''}>${b.name} (Feat: ${b.feat})</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label for="create-char-alignment">Alignment</label>
              <select id="create-char-alignment" class="form-control">
                <option value="Lawful Good" ${state.alignment === 'Lawful Good' ? 'selected' : ''}>Lawful Good</option>
                <option value="Neutral Good" ${state.alignment === 'Neutral Good' ? 'selected' : ''}>Neutral Good</option>
                <option value="Chaotic Good" ${state.alignment === 'Chaotic Good' ? 'selected' : ''}>Chaotic Good</option>
                <option value="Lawful Neutral" ${state.alignment === 'Lawful Neutral' ? 'selected' : ''}>Lawful Neutral</option>
                <option value="True Neutral" ${state.alignment === 'True Neutral' ? 'selected' : ''}>True Neutral</option>
                <option value="Chaotic Neutral" ${state.alignment === 'Chaotic Neutral' ? 'selected' : ''}>Chaotic Neutral</option>
              </select>
            </div>
          </div>

          <!-- Step 2: Ability Score Generation -->
          <h3 style="color: var(--text-gold); margin-bottom: 0.75rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.4rem; font-size: 1.15rem; display: flex; justify-content: space-between; align-items: center;">
            <span>2. Ability Score Generation</span>
            <span style="font-size: 0.8rem; font-family: var(--font-sans); color: var(--text-muted); text-transform: none;">Choose your generation system</span>
          </h3>

          <!-- Method Switcher Pills -->
          <div style="display: flex; gap: 0.4rem; margin-bottom: 1.25rem; flex-wrap: wrap;">
            <button type="button" class="btn btn-sm ${state.activeMethod === 'standard' ? 'btn-primary' : ''}" data-method="standard">
              Standard Array (15, 14, 13, 12, 10, 8)
            </button>
            <button type="button" class="btn btn-sm ${state.activeMethod === 'point-buy' ? 'btn-primary' : ''}" data-method="point-buy">
              Point Buy (27 Pts)
            </button>
            <button type="button" class="btn btn-sm ${state.activeMethod === 'roll' ? 'btn-primary' : ''}" data-method="roll">
              🎲 4d6 Drop Lowest
            </button>
            <button type="button" class="btn btn-sm ${state.activeMethod === 'custom' ? 'btn-primary' : ''}" data-method="custom">
              ✏️ Custom / Manual Input
            </button>
          </div>

          <!-- Method 1: Standard Array Interface -->
          ${state.activeMethod === 'standard' ? `
            <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; border: 1px solid var(--border-subtle);">
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.8rem;">
                Assign each standard value (<strong>15, 14, 13, 12, 10, 8</strong>) to an ability.
              </p>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem;">
                ${['str', 'dex', 'con', 'int', 'wis', 'cha'].map(stat => `
                  <div class="form-group" style="margin-bottom: 0;">
                    <label style="text-transform: uppercase; font-weight: 700; color: var(--text-gold);">${stat.toUpperCase()}</label>
                    <select class="form-control std-stat-select" data-stat="${stat}">
                      ${[15, 14, 13, 12, 10, 8].map(val => `
                        <option value="${val}" ${state.standardAssigned[stat] === val ? 'selected' : ''}>${val} (${formatMod(val)})</option>
                      `).join('')}
                    </select>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Method 2: Point Buy Interface -->
          ${state.activeMethod === 'point-buy' ? `
            <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; border: 1px solid var(--border-subtle);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem;">
                <span style="font-size: 0.9rem; font-weight: 600;">Point Buy Budget (8-15):</span>
                <span style="font-size: 0.95rem; font-weight: 700; color: ${remainingPoints < 0 ? '#ef5350' : '#81c784'};">
                  Remaining Points: ${remainingPoints} / 27
                </span>
              </div>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem;">
                ${['str', 'dex', 'con', 'int', 'wis', 'cha'].map(stat => `
                  <div style="background: var(--bg-card); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <div style="font-weight: 700; color: var(--text-gold); text-transform: uppercase; font-size: 0.8rem;">${stat.toUpperCase()}</div>
                      <div style="font-size: 1.1rem; font-weight: 700;">${state.pointBuy[stat]} <span style="font-size: 0.75rem; color: var(--text-muted);">(${formatMod(state.pointBuy[stat])})</span></div>
                    </div>
                    <div style="display: flex; gap: 0.25rem;">
                      <button type="button" class="btn btn-sm btn-pb-dec" data-stat="${stat}" ${state.pointBuy[stat] <= 8 ? 'disabled' : ''}>-</button>
                      <button type="button" class="btn btn-sm btn-pb-inc" data-stat="${stat}" ${state.pointBuy[stat] >= 15 ? 'disabled' : ''}>+</button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Method 3: 4d6 Drop Lowest Interface -->
          ${state.activeMethod === 'roll' ? `
            <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; border: 1px solid var(--border-subtle);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem;">
                <span style="font-size: 0.9rem; font-weight: 600;">Rolled Pools (4d6 drop lowest):</span>
                <button type="button" class="btn btn-sm" id="btn-roll-dice" style="background: rgba(212, 175, 55, 0.2); border-color: var(--accent-gold); color: var(--text-gold);">
                  🎲 Re-Roll All 6 Abilities
                </button>
              </div>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.6rem; margin-bottom: 0.75rem;">
                ${state.rolledPools.map((p, idx) => `
                  <div style="background: var(--bg-card); padding: 0.5rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); font-size: 0.8rem;">
                    <div style="font-size: 0.7rem; color: var(--text-muted);">Roll #${idx + 1}</div>
                    <div style="font-size: 1.1rem; font-weight: 700; color: var(--text-gold);">${p.total}</div>
                    <div style="font-size: 0.7rem; color: var(--text-muted);">Dice: [${p.dice.join(', ')}] (drop ${p.dropped})</div>
                  </div>
                `).join('')}
              </div>
              <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 0.4rem;">
                ${['str', 'dex', 'con', 'int', 'wis', 'cha'].map(stat => `
                  <div>
                    <label style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase;">${stat}</label>
                    <input type="number" class="form-control roll-stat-input" data-stat="${stat}" value="${state.stats[stat]}" min="3" max="18" style="padding: 0.25rem; font-size: 0.85rem; text-align: center;">
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Method 4: Custom / Manual Stats Interface -->
          ${state.activeMethod === 'custom' ? `
            <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; border: 1px solid var(--border-subtle);">
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.8rem;">
                Enter any custom ability scores directly (supports rolled tabletop stats, DM adjustments, or homebrew).
              </p>
              <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 0.5rem;">
                ${['str', 'dex', 'con', 'int', 'wis', 'cha'].map(stat => `
                  <div class="form-group" style="margin-bottom: 0;">
                    <label style="text-transform: uppercase; font-weight: 700; color: var(--text-gold); font-size: 0.75rem; text-align: center; display: block;">${stat}</label>
                    <input type="number" class="form-control custom-stat-input" data-stat="${stat}" min="1" max="30" value="${state.stats[stat]}" style="text-align: center; font-weight: 700; font-size: 1rem;">
                    <span style="display: block; text-align: center; font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">
                      (${formatMod(state.stats[stat])})
                    </span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Step 3: Backstory & Campaign Notes -->
          <h3 style="color: var(--text-gold); margin-bottom: 0.75rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.4rem; font-size: 1.15rem;">
            3. Campaign Integration & Backstory
          </h3>
          <div class="form-group">
            <label for="create-char-backstory">Character Chronicle / Origin Backstory</label>
            <textarea id="create-char-backstory" class="form-control" rows="3" placeholder="Describe where your character entered The Bleeding Realms, their personal quest, or secret DM hook...">${state.backstory}</textarea>
          </div>

          <div style="margin-top: 1.5rem; display: flex; justify-content: flex-end; gap: 0.75rem;">
            <button type="button" class="btn" id="btn-reset-creator">Reset</button>
            <button type="button" class="btn btn-primary" id="btn-save-character" style="font-size: 1rem; padding: 0.6rem 1.5rem;">
              ⚔️ Forge Character & Enter Game ✦
            </button>
          </div>
        </div>

        <!-- Right Column: Live Sheet Preview HUD -->
        <div style="position: sticky; top: 1rem;">
          <div style="background: var(--bg-card); border: 1px solid var(--border-strong); border-radius: var(--radius-lg); padding: 1.25rem; box-shadow: var(--shadow-md);">
            <div style="text-align: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem; margin-bottom: 1rem;">
              <div style="width: 52px; height: 52px; border-radius: 50%; background: linear-gradient(135deg, var(--accent-fire), var(--accent-water)); display: flex; align-items: center; justify-content: center; font-size: 1.3rem; font-weight: bold; margin: 0 auto 0.5rem; border: 1px solid var(--accent-gold);">
                ${(state.characterName || 'PC').substring(0, 2).toUpperCase()}
              </div>
              <h3 style="margin: 0; color: var(--text-gold); font-size: 1.15rem;">
                ${state.characterName || 'Unnamed Hero'}
              </h3>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">
                Level ${state.level} ${state.selectedSpecies.name} ${state.selectedClass.name}
              </div>
            </div>

            <!-- Core Live Combat Vitals -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; text-align: center; margin-bottom: 1rem;">
              <div style="background: var(--bg-tertiary); padding: 0.5rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
                <div style="font-size: 1.25rem; font-weight: 700; color: #81c784;">${hp}</div>
                <div style="font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase;">Max HP</div>
              </div>
              <div style="background: var(--bg-tertiary); padding: 0.5rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
                <div style="font-size: 1.25rem; font-weight: 700; color: var(--text-gold);">${ac}</div>
                <div style="font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase;">AC</div>
              </div>
              <div style="background: var(--bg-tertiary); padding: 0.5rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
                <div style="font-size: 1.25rem; font-weight: 700; color: #64b5f6;">${dexMod}</div>
                <div style="font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase;">Initiative</div>
              </div>
            </div>

            <!-- Live Ability Scores List -->
            <div style="background: var(--bg-tertiary); border-radius: var(--radius-sm); padding: 0.6rem; margin-bottom: 1rem;">
              <div style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: var(--text-gold); margin-bottom: 0.4rem;">
                Ability Scores & Modifiers
              </div>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.4rem; text-align: center;">
                ${['str', 'dex', 'con', 'int', 'wis', 'cha'].map(s => `
                  <div style="background: var(--bg-card); padding: 0.35rem; border-radius: var(--radius-xs); border: 1px solid var(--border-subtle);">
                    <span style="font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase;">${s}</span>
                    <div style="font-weight: 700; font-size: 0.95rem;">${activeStats[s]}</div>
                    <span style="font-size: 0.7rem; color: var(--text-gold); font-weight: 600;">${formatMod(activeStats[s])}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Masteries & Feats Preview -->
            <div style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.4;">
              <div><strong>Speed:</strong> ${speed}</div>
              <div><strong>Origin Feat:</strong> ${state.selectedBackground.feat}</div>
              <div style="margin-top: 0.4rem;">
                <strong>5.5e Weapon Masteries:</strong>
                <div style="display: flex; flex-wrap: wrap; gap: 0.25rem; margin-top: 0.2rem;">
                  ${state.selectedClass.masteries.length > 0 ? state.selectedClass.masteries.map(m => `
                    <span style="background: rgba(212, 175, 55, 0.15); border: 1px solid rgba(212, 175, 55, 0.3); color: var(--text-gold); padding: 1px 5px; border-radius: 3px; font-size: 0.68rem;">${m}</span>
                  `).join('') : '<span style="color: var(--text-muted); font-size: 0.7rem;">None (Spellcaster)</span>'}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    // Return button
    const cancelBtn = container.querySelector('#btn-cancel-creation');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        const partyTab = document.querySelector('.nav-tab-btn[data-tab="party"]');
        if (partyTab) partyTab.click();
      });
    }

    // Login prompt button
    const loginBtn = container.querySelector('#btn-login-before-create');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        const playerAuthModal = document.getElementById('player-auth-modal');
        if (playerAuthModal) {
          playerAuthModal.classList.add('active');
          document.getElementById('tab-login-btn')?.click();
        }
      });
    }

    // Method selection pills
    container.querySelectorAll('button[data-method]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeMethod = btn.getAttribute('data-method');
        render();
      });
    });

    // Inputs binding
    const nameInput = container.querySelector('#create-char-name');
    if (nameInput) {
      nameInput.addEventListener('input', (e) => {
        state.characterName = e.target.value;
        const hudName = container.querySelector('.view-card h3, .view-tagline');
        // Partial refresh or quick sync
        const titleEl = container.querySelector('h3[style*="font-size: 1.15rem"]');
        if (titleEl) titleEl.textContent = state.characterName || 'Unnamed Hero';
      });
    }

    const levelInput = container.querySelector('#create-char-level');
    if (levelInput) {
      levelInput.addEventListener('change', (e) => {
        state.level = parseInt(e.target.value, 10) || 1;
        render();
      });
    }

    const speciesSelect = container.querySelector('#create-char-species');
    if (speciesSelect) {
      speciesSelect.addEventListener('change', (e) => {
        state.selectedSpecies = SPECIES_LIST.find(s => s.name === e.target.value) || SPECIES_LIST[0];
        render();
      });
    }

    const classSelect = container.querySelector('#create-char-class');
    if (classSelect) {
      classSelect.addEventListener('change', (e) => {
        state.selectedClass = CLASS_LIST.find(c => c.name === e.target.value) || CLASS_LIST[0];
        render();
      });
    }

    const bgSelect = container.querySelector('#create-char-background');
    if (bgSelect) {
      bgSelect.addEventListener('change', (e) => {
        state.selectedBackground = BACKGROUND_LIST.find(b => b.name === e.target.value) || BACKGROUND_LIST[0];
        render();
      });
    }

    const alignSelect = container.querySelector('#create-char-alignment');
    if (alignSelect) {
      alignSelect.addEventListener('change', (e) => {
        state.alignment = e.target.value;
      });
    }

    const backstoryInput = container.querySelector('#create-char-backstory');
    if (backstoryInput) {
      backstoryInput.addEventListener('input', (e) => {
        state.backstory = e.target.value;
      });
    }

    // Standard Array dropdowns
    container.querySelectorAll('.std-stat-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const stat = sel.getAttribute('data-stat');
        state.standardAssigned[stat] = parseInt(e.target.value, 10);
        render();
      });
    });

    // Point Buy +/- buttons
    container.querySelectorAll('.btn-pb-inc').forEach(btn => {
      btn.addEventListener('click', () => {
        const stat = btn.getAttribute('data-stat');
        const curr = state.pointBuy[stat];
        if (curr < 15) {
          state.pointBuy[stat] = curr + 1;
          render();
        }
      });
    });

    container.querySelectorAll('.btn-pb-dec').forEach(btn => {
      btn.addEventListener('click', () => {
        const stat = btn.getAttribute('data-stat');
        const curr = state.pointBuy[stat];
        if (curr > 8) {
          state.pointBuy[stat] = curr - 1;
          render();
        }
      });
    });

    // 4d6 Roll button
    const rollDiceBtn = container.querySelector('#btn-roll-dice');
    if (rollDiceBtn) {
      rollDiceBtn.addEventListener('click', () => {
        try { soundEngine.playDiceRoll(true); } catch (_) {}
        roll4d6DropLowest();
        render();
      });
    }

    // 4d6 stat inputs
    container.querySelectorAll('.roll-stat-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const stat = input.getAttribute('data-stat');
        state.stats[stat] = parseInt(e.target.value, 10) || 10;
        render();
      });
    });

    // Custom stat inputs
    container.querySelectorAll('.custom-stat-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const stat = input.getAttribute('data-stat');
        state.stats[stat] = parseInt(e.target.value, 10) || 10;
        render();
      });
    });

    // Reset button
    const resetBtn = container.querySelector('#btn-reset-creator');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        state.characterName = '';
        state.stats = { str: 15, dex: 14, con: 13, int: 12, wis: 10, cha: 8 };
        state.pointBuy = { str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8 };
        render();
      });
    }

    // Save Character Button
    const saveBtn = container.querySelector('#btn-save-character');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const name = (state.characterName || '').trim();
        if (!name) {
          alert('Please enter a character name to forge your hero.');
          const nameInput = container.querySelector('#create-char-name');
          if (nameInput) nameInput.focus();
          return;
        }

        const activeStats = getActiveStats();
        const charPayload = {
          name: name,
          level: state.level,
          species: state.selectedSpecies.name,
          classRole: state.selectedClass.name,
          hitDie: state.selectedClass.hitDie,
          alignment: state.alignment,
          background: state.selectedBackground.name,
          originFeat: state.selectedBackground.feat,
          hpMax: calculateHp(),
          ac: calculateAc(),
          speed: state.selectedSpecies.speed,
          stats: activeStats,
          statMethod: state.activeMethod,
          weaponMasteries: state.selectedClass.masteries,
          backstory: state.backstory
        };

        const created = worldState.createPartyCharacter(charPayload);

        try { soundEngine.playDiceRoll(true); } catch (_) {}

        alert(`🎉 ${created.name} (${created.species} ${created.classRole}) forged successfully and saved to your account!`);

        // Switch to the Player Hero view to immediately play/view the sheet
        const heroTab = document.querySelector('.nav-tab-btn[data-tab="hero"]');
        if (heroTab) {
          heroTab.click();
        } else {
          const partyTab = document.querySelector('.nav-tab-btn[data-tab="party"]');
          if (partyTab) partyTab.click();
        }
      });
    }
  }

  render();
}

  // COMPONENT: combatView.js
/**
 * Tactical Combat Engine & Battlemat View (D&D 5.5e Integrated for Aetheria)
 */
function renderCombatView(container) {
  if (container.dataset.combatInitialized === 'true') {
    window.dispatchEvent(new Event('resize'));
    return;
  }
  container.dataset.combatInitialized = 'true';

  const isDm = worldState.prefs.dmMode;
  const party = worldState.data.partyCharacters || [];
  const champions = worldState.data.characters || [];

  container.innerHTML = `
    <div class="combat-view-container">
      <!-- Top Tactical Header -->
      <div class="combat-top-deck">
        <div class="combat-deck-left">
          <h2><span>Tactical Battlemat & Combat Deck</span></h2>
          <span class="version-pill">5.5e Tactical Grid</span>
        </div>

        <div class="combat-deck-right">
          <!-- Perspective Selector -->
          <div class="combat-perspective-box">
            <span>View Perspective:</span>
            <select id="combat-perspective-select">
              <option value="DM">DM (All-Seeing)</option>
              ${party.map(p => `<option value="${p.id}">View as: ${p.name}</option>`).join('')}
            </select>
          </div>

          <!-- Phase Indicator -->
          <div id="combat-phase-indicator" class="filter-chip active" style="font-weight: bold; background: #1e293b; color: #94a3b8; border-color: #475569;">
            OUT OF COMBAT
          </div>

          <!-- Round Tracker -->
          <div style="font-size: 0.8rem; font-weight: bold; color: var(--text-gold); background: var(--bg-tertiary); padding: 0.35rem 0.65rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
            Round: <span id="combat-round-counter" style="color: #4ade80;">—</span>
          </div>

          <!-- Start / End Combat (DM) -->
          <button id="combat-start-btn" class="btn btn-sm btn-primary" style="font-weight: bold; padding: 0.4rem 0.9rem;">
            Roll Initiative (DM)
          </button>
          <button id="combat-end-btn" class="btn btn-sm" style="font-weight: bold; padding: 0.4rem 0.9rem; display: none; color: #fca5a5; border-color: rgba(239, 68, 68, 0.5);">
            End Combat
          </button>
        </div>
      </div>

      <!-- 3-Column Tactical Layout -->
      <div class="combat-main-layout">
        
        <!-- Left Column: Unit Actions & Queue -->
        <aside class="combat-panel">
          <div class="combat-panel-title">
            <span>Active Unit</span>
            <button id="combat-quick-ping-btn" class="btn btn-sm" style="padding: 2px 6px; font-size: 0.7rem; color: #38bdf8; border-color: #38bdf8;">
              Ping Map
            </button>
          </div>

          <div id="combat-active-unit-info" style="font-size: 0.8rem; color: var(--text-muted); min-height: 55px; display: flex; flex-direction: column; justify-content: center;">
            Select a unit on the battlemat to plan moves.
          </div>

          <!-- Action Controls -->
          <div id="combat-action-controls" style="display: none; flex-direction: column; gap: 0.5rem;">
            <!-- Advantage / Disadvantage Pills -->
            <div class="combat-adv-group">
              <button class="combat-adv-pill" data-mode="ADVANTAGE">Advantage</button>
              <button class="combat-adv-pill active-norm" data-mode="NORMAL">Normal</button>
              <button class="combat-adv-pill" data-mode="DISADVANTAGE">Disadvantage</button>
            </div>

            <!-- Actions -->
            <div class="combat-action-grid">
              <button class="combat-act-btn" data-action="MOVE">Move</button>
              <button class="combat-act-btn" data-action="ATTACK">Attack</button>
              <button class="combat-act-btn" data-action="CAST">Spell / Ability</button>
              <button class="combat-act-btn" data-action="PING">Ping</button>
            </div>

            <!-- Spell / Ability Selector (populated per unit) -->
            <select id="combat-spell-select" class="theme-select" style="display: none; width: 100%; font-size: 0.75rem;"></select>

            <!-- DM Unit Saving Throws Panel -->
            <div id="combat-unit-save-panel" style="display: none; margin-top: 0.5rem; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: var(--radius-sm); padding: 0.4rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
                <span style="font-size: 0.72rem; font-weight: bold; color: #fca5a5;">🛡️ Unit Saving Throw:</span>
                <div style="display: flex; align-items: center; gap: 0.25rem;">
                  <span style="font-size: 0.65rem; color: var(--text-muted);">DC:</span>
                  <input type="number" id="combat-unit-save-dc" value="15" min="5" max="30" style="width: 38px; font-size: 0.7rem; padding: 1px 3px; background: var(--bg-tertiary); color: #fff; border: 1px solid var(--border-subtle); border-radius: 3px;">
                </div>
              </div>
              <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 0.25rem;">
                <button class="unit-save-btn combat-stat-save-btn" data-stat="STR">STR</button>
                <button class="unit-save-btn combat-stat-save-btn" data-stat="DEX">DEX</button>
                <button class="unit-save-btn combat-stat-save-btn" data-stat="CON">CON</button>
                <button class="unit-save-btn combat-stat-save-btn" data-stat="INT">INT</button>
                <button class="unit-save-btn combat-stat-save-btn" data-stat="WIS">WIS</button>
                <button class="unit-save-btn combat-stat-save-btn" data-stat="CHA">CHA</button>
              </div>
            </div>

            <!-- DM Push Request Panel (When player token selected) -->
            <div id="combat-dm-push-panel" style="display: none; margin-top: 0.5rem; background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.35); border-radius: var(--radius-sm); padding: 0.45rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
                <span style="font-size: 0.72rem; font-weight: bold; color: #93c5fd;">⚡ Push Request to Player:</span>
                <span id="combat-push-target-label" style="font-size: 0.7rem; color: var(--text-gold); font-weight: bold;"></span>
              </div>
              <div style="display: flex; gap: 0.25rem; margin-bottom: 0.25rem;">
                <select id="combat-push-save-type" class="theme-select" style="flex: 1; font-size: 0.7rem; padding: 2px;">
                  <option value="save_DEX">DEX Saving Throw</option>
                  <option value="save_CON">CON Saving Throw</option>
                  <option value="save_WIS">WIS Saving Throw</option>
                  <option value="save_STR">STR Saving Throw</option>
                  <option value="save_INT">INT Saving Throw</option>
                  <option value="save_CHA">CHA Saving Throw</option>
                  <option value="check_Perception">Perception Check</option>
                  <option value="check_Stealth">Stealth Check</option>
                  <option value="check_Athletics">Athletics Check</option>
                  <option value="save_Concentration">Concentration Save</option>
                </select>
                <input type="number" id="combat-push-save-dc" value="15" min="5" max="30" placeholder="DC" style="width: 42px; font-size: 0.7rem; padding: 2px 4px; background: var(--bg-tertiary); color: #fff; border: 1px solid var(--border-subtle); border-radius: 3px;">
              </div>
              <input type="text" id="combat-push-save-reason" placeholder="Reason (e.g. Fireball save, Ambush spot)" style="width: 100%; font-size: 0.7rem; padding: 2px 6px; background: var(--bg-tertiary); color: #fff; border: 1px solid var(--border-subtle); border-radius: 3px; margin-bottom: 0.3rem;">
              <button id="combat-push-save-submit-btn" class="btn btn-sm btn-primary" style="width: 100%; font-size: 0.7rem; padding: 3px 0; background: linear-gradient(135deg, #1d4ed8, #3b82f6); color: #fff;">
                ⚡ Send Prompt to Player
              </button>
            </div>
          </div>

          <!-- Current Turn & Action Economy -->
          <div id="combat-turn-box" style="border-top: 1px solid var(--border-subtle); padding-top: 0.5rem; margin-top: 0.25rem;"></div>

          <!-- Initiative Order -->
          <div style="flex: 1; display: flex; flex-direction: column; min-height: 120px; border-top: 1px solid var(--border-subtle); padding-top: 0.5rem;">
            <div class="combat-panel-title" style="border: none; padding-bottom: 0.25rem;">
              <span>Initiative Order</span>
              <label id="combat-auto-npc-label" style="display: none; align-items: center; gap: 0.25rem; font-size: 0.65rem; color: var(--text-muted); cursor: pointer;" title="Automatically run enemy and allied NPC turns">
                <input type="checkbox" id="combat-auto-npc-chk"> Auto NPC turns
              </label>
            </div>
            <div id="combat-initiative-list" style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 0.25rem; max-height: 220px;"></div>
          </div>
        </aside>

        <!-- Center Column: The Battlefield Canvas -->
        <section class="battlefield-section">
          <!-- Notification Toast -->
          <div id="combat-notification-toast" class="combat-toast">Notification</div>

          <!-- Animated Dice Roll Modal -->
          <div id="combat-dice-modal" class="combat-dice-overlay" style="display: none;">
            <div id="combat-dice-box" class="combat-dice-box">
              <span id="combat-dice-label" style="font-size: 0.7rem; font-weight: 800; color: var(--text-gold); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.25rem;">Attack Roll</span>
              <div style="position: relative; display: flex; align-items: center; justify-content: center; margin: 0.5rem 0;">
                <div style="width: 64px; height: 64px; border: 2px solid var(--border-gold); background: var(--bg-primary); border-radius: 8px; display: flex; align-items: center; justify-content: center;"></div>
                <span id="combat-dice-value" style="position: absolute; font-size: 1.8rem; font-weight: 900; color: #fff; text-shadow: 0 2px 8px rgba(0,0,0,0.8);">20</span>
              </div>
              <div id="combat-dice-subtext" style="font-size: 0.8rem; color: var(--text-secondary);"></div>
              <div id="combat-dice-extra" style="font-size: 0.75rem; margin-top: 0.35rem;"></div>
            </div>
          </div>

          <!-- Pending DM Roll Request Banner on Combat Screen -->
          <div id="combat-pending-banner-container" style="display: none; padding: 0 0.5rem; margin-bottom: 0.35rem;"></div>

          <!-- Canvas Viewport with Pan Support -->
          <div id="combat-canvas-container" class="canvas-scroll-container">
            <canvas id="battlefield-canvas" width="550" height="550"></canvas>
          </div>
        </section>

        <!-- Right Column: DM Tools, Tactical Pings & Combat Log -->
        <aside class="combat-panel">
          <!-- Tactical Pings & Whispers Panel -->
          <div style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem;">
            <div class="combat-panel-title">
              <span>Tactical Pings & Whispers</span>
            </div>
            <p style="font-size: 0.75rem; color: var(--text-muted); margin: 0.35rem 0 0.5rem;">
              Right-click or Shift-click any square to ping. Choose ping visibility:
            </p>

            <div style="display: flex; flex-direction: column; gap: 0.3rem; font-size: 0.75rem; margin-bottom: 0.5rem;">
              <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer;">
                <input type="radio" name="dm-ping-vis" id="combat-ping-vis-all" checked>
                <span><strong>Public Ping</strong> (All see it)</span>
              </label>
              <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer;">
                <input type="radio" name="dm-ping-vis" id="combat-ping-vis-custom">
                <span><strong>Secret Ping</strong> (Whisper to Selected)</span>
              </label>
            </div>

            <!-- Custom Recipients Checkboxes -->
            <div id="combat-ping-custom-container" style="display: none; background: var(--bg-tertiary); border: 1px solid rgba(168, 85, 247, 0.4); border-radius: var(--radius-sm); padding: 0.5rem; margin-bottom: 0.5rem;">
              <span style="font-size: 0.7rem; font-weight: bold; color: #c084fc; text-transform: uppercase;">Recipients:</span>
              <div id="combat-ping-recipients-list" style="display: flex; flex-direction: column; gap: 0.25rem; margin-top: 0.25rem;">
                ${party.map(p => `
                  <label style="display: flex; align-items: center; gap: 0.35rem; font-size: 0.75rem; cursor: pointer;">
                    <input type="checkbox" value="${p.id}" class="combat-ping-chk" checked>
                    <span>${p.name}</span>
                  </label>
                `).join('')}
              </div>
            </div>

            <!-- Ping Color Selection -->
            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.75rem;">
              <span style="color: var(--text-secondary);">Ping Style:</span>
              <div style="display: flex; gap: 0.35rem;">
                <button data-color="#38bdf8" class="combat-ping-color-btn" style="width: 18px; height: 18px; border-radius: 50%; background: #38bdf8; border: 2px solid #fff; cursor: pointer;" title="Notice Blue"></button>
                <button data-color="#a855f7" class="combat-ping-color-btn" style="width: 18px; height: 18px; border-radius: 50%; background: #a855f7; border: 1px solid transparent; cursor: pointer;" title="Arcane Purple"></button>
                <button data-color="#eab308" class="combat-ping-color-btn" style="width: 18px; height: 18px; border-radius: 50%; background: #eab308; border: 1px solid transparent; cursor: pointer;" title="Warning Gold"></button>
                <button data-color="#ef4444" class="combat-ping-color-btn" style="width: 18px; height: 18px; border-radius: 50%; background: #ef4444; border: 1px solid transparent; cursor: pointer;" title="Hostile Red"></button>
              </div>
            </div>
          </div>

          <!-- DM Spawner & Bestiary -->
          <div style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem;">
            <div class="combat-panel-title">
              <span>Spawn Units & Encounters</span>
            </div>
            
            <div style="margin: 0.4rem 0;">
              <select id="combat-spawn-select" class="theme-select" style="width: 100%; font-size: 0.75rem; margin-bottom: 0.4rem;">
                <optgroup label="Aetheria Campaign Party">
                  ${party.map(p => `<option value="party_${p.id}">${p.name} (AC ${p.ac}, HP ${p.hpMax})</option>`).join('')}
                </optgroup>
                <optgroup label="Aetheria Champions & NPCs">
                  ${champions.slice(0, 4).map(c => `<option value="champ_${c.id}">${c.name} (Affinity: ${c.elementalAffinity})</option>`).join('')}
                </optgroup>
                <optgroup label="5.5e Bestiary">
                  <option value="Goblin" selected>Goblin (AC 15, HP 7)</option>
                  <option value="Goblin Alpha">Goblin Alpha (AC 16, HP 21)</option>
                  <option value="Orc">Orc (AC 13, HP 15)</option>
                  <option value="Skeleton">Skeleton (AC 13, HP 13)</option>
                  <option value="Owlbear">Owlbear (AC 13, HP 59)</option>
                  <option value="Troll">Troll (AC 15, HP 84)</option>
                  <option value="Red Dragon Wyrmling">Red Dragon Wyrmling (AC 17, HP 75)</option>
                </optgroup>
              </select>

              <select id="combat-spawn-team" class="theme-select" style="width: 100%; font-size: 0.75rem; margin-bottom: 0.4rem;" title="Side for spawned NPCs and monsters (party members always join the party)">
                <option value="enemy" selected>Spawn as: Hostile Enemy</option>
                <option value="ally">Spawn as: Allied NPC</option>
              </select>

              <div style="display: flex; gap: 0.35rem; margin-bottom: 0.4rem;">
                <button id="combat-drop-unit-btn" class="btn btn-sm btn-primary" style="flex: 1; font-size: 0.75rem;">Drop on Map</button>
                <button id="combat-paint-btn" class="btn btn-sm" style="flex: 1; font-size: 0.75rem;">Paint: OFF</button>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: var(--text-secondary);">
              <span>Grid: <strong id="combat-grid-label">11x11</strong></span>
              <input type="range" id="combat-grid-slider" min="6" max="30" value="11" style="width: 120px; cursor: pointer;">
            </div>
          </div>

          <!-- Combat & Real-time Dice Roll Log -->
          <div style="flex: 1; display: flex; flex-direction: column; min-height: 120px;">
            <div class="combat-panel-title" style="border: none; padding-bottom: 0.25rem; display: flex; justify-content: space-between; align-items: center;">
              <span>Combat & Dice Roll Log</span>
              <button id="combat-clear-log-btn" style="background: none; border: none; color: #ff5252; font-size: 0.65rem; font-weight: bold; cursor: pointer;">Clear</button>
            </div>
            <div id="combat-log-stream" style="flex: 1; overflow-y: auto; background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.5rem; font-family: var(--font-mono); font-size: 0.75rem; display: flex; flex-direction: column; gap: 0.25rem; max-height: 155px;">
              <div style="color: var(--text-muted); font-style: italic;">Tactical & Dice deck ready. Shift-click to ping.</div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  `;

  // Initialize Combat Controller inside this view
  initCombatEngine(container);
}

// Full Combat Engine Logic
function initCombatEngine(container) {
  const canvas = container.querySelector('#battlefield-canvas');
  const canvasContainer = container.querySelector('#combat-canvas-container');
  if (!canvas || !canvasContainer) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId = null;
  let audioCtx = null;

  // State
  const cState = {
    gridSize: 11,
    minTileSize: 50,
    tileSize: 50,
    currentPerspective: 'DM',
    selectedEntity: null,
    selectedAction: null,
    advantageMode: 'NORMAL',
    selectedSpellId: null,
    isPaintActive: false,
    hoveredTile: null,
    dmPingVis: 'ALL',
    dmPingRecipients: [],
    dmPingColor: '#38bdf8',
    activePings: [],
    entities: [],
    effects: [],
    // Initiative / turn engine
    combat: { active: false, round: 0, order: [], turnIndex: 0, aiRunning: false },
    autoNpc: false
  };

  // ==========================================
  // SPELL & ABILITY LIBRARY (shared by players, NPCs and monsters)
  // kind: attack (attack roll) | auto (auto-hit) | save (single-target save)
  //       aoe (area save) | heal | teleport
  // range / radius are in tiles (1 tile = 5 ft)
  // ==========================================
  const ABILITIES = {
    firebolt:      { name: 'Fire Bolt', kind: 'attack', range: 24, dmg: '1d10', type: 'fire', level: 0 },
    sacred_flame:  { name: 'Sacred Flame', kind: 'save', save: 'DEX', range: 12, dmg: '2d8', type: 'radiant', half: false, level: 0 },
    magic_missile: { name: 'Magic Missile', kind: 'auto', range: 24, dmg: '3d4+3', type: 'force', level: 1 },
    guiding_bolt:  { name: 'Guiding Bolt', kind: 'attack', range: 24, dmg: '4d6', type: 'radiant', level: 1 },
    cure_wounds:   { name: 'Cure Wounds', kind: 'heal', range: 1, heal: '2d8+4', level: 1 },
    healing_word:  { name: 'Healing Word', kind: 'heal', range: 12, heal: '2d4+4', level: 1, bonus: true },
    thunderwave:   { name: 'Thunderwave', kind: 'aoe', save: 'CON', centerSelf: true, radius: 1, dmg: '2d8', type: 'thunder', half: true, level: 1 },
    misty_step:    { name: 'Misty Step', kind: 'teleport', range: 6, level: 2, bonus: true },
    scorching_ray: { name: 'Scorching Ray', kind: 'attack', range: 24, dmg: '6d6', type: 'fire', level: 2 },
    fireball:      { name: 'Fireball', kind: 'aoe', save: 'DEX', range: 30, radius: 4, dmg: '8d6', type: 'fire', half: true, level: 3 },
    // Weapons & monster abilities
    shortbow:      { name: 'Shortbow', kind: 'attack', range: 16, dmg: '1d6+2', type: 'piercing', weapon: true },
    longbow:       { name: 'Longbow', kind: 'attack', range: 30, dmg: '1d8+3', type: 'piercing', weapon: true },
    javelin:       { name: 'Javelin', kind: 'attack', range: 6, dmg: '1d6+3', type: 'piercing', weapon: true },
    psychic_blade: { name: 'Psychic Blade (thrown)', kind: 'attack', range: 12, dmg: '1d6+4', type: 'psychic', weapon: true },
    ember_hex:     { name: 'Ember Hex', kind: 'save', save: 'WIS', range: 12, dmg: '2d6', type: 'fire', half: true },
    frost_breath:  { name: 'Frost Breath (Recharge)', kind: 'aoe', save: 'CON', range: 3, radius: 2, dmg: '4d8', type: 'cold', half: true, uses: 1 },
    fire_breath:   { name: 'Fire Breath (Recharge)', kind: 'aoe', save: 'DEX', range: 3, radius: 2, dmg: '7d6', type: 'fire', half: true, uses: 1 },
    terrify_roar:  { name: 'Terrifying Roar', kind: 'save', save: 'WIS', range: 6, dmg: '2d6', type: 'psychic', half: true, uses: 1 }
  };

  // 5.5e Bestiary templates for spawned monsters
  const BESTIARY = {
    'Goblin':              { ac: 15, hp: 7,  speed: 6, init: 2, attackMod: 4, dmgFormula: '1d6+2',  dmgType: 'slashing',    weaponName: 'Scimitar',   abilities: ['shortbow', 'ember_hex'], spellDC: 12 },
    'Goblin Alpha':        { ac: 16, hp: 21, speed: 6, init: 2, attackMod: 5, dmgFormula: '1d8+3',  dmgType: 'slashing',    weaponName: 'Scimitar',   abilities: ['shortbow', 'ember_hex', 'scorching_ray'], spellDC: 13 },
    'Orc':                 { ac: 13, hp: 15, speed: 6, init: 1, attackMod: 5, dmgFormula: '1d12+3', dmgType: 'slashing',    weaponName: 'Greataxe',   abilities: ['javelin', 'terrify_roar'], spellDC: 12 },
    'Skeleton':            { ac: 13, hp: 13, speed: 6, init: 2, attackMod: 4, dmgFormula: '1d6+2',  dmgType: 'piercing',    weaponName: 'Shortsword', abilities: ['shortbow', 'ember_hex'], spellDC: 12 },
    'Owlbear':             { ac: 13, hp: 59, speed: 8, init: 1, attackMod: 7, dmgFormula: '2d8+5',  dmgType: 'slashing',    weaponName: 'Rend',       abilities: ['terrify_roar'], spellDC: 14 },
    'Troll':               { ac: 15, hp: 84, speed: 6, init: 1, attackMod: 7, dmgFormula: '2d6+4',  dmgType: 'slashing',    weaponName: 'Claw',       abilities: ['frost_breath'], spellDC: 14 },
    'Red Dragon Wyrmling': { ac: 17, hp: 75, speed: 6, init: 0, attackMod: 6, dmgFormula: '1d10+4', dmgType: 'piercing',    weaponName: 'Bite',       abilities: ['fire_breath', 'fireball'], spellDC: 14 }
  };

  const rollD20 = () => Math.floor(Math.random() * 20) + 1;
  const statMod = (v) => Math.floor(((v || 10) - 10) / 2);
  const dist = (a, b) => Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
  const sideOf = (ent) => (ent.team === 'player' || ent.team === 'ally') ? 'party' : 'foe';
  const isHostile = (a, b) => sideOf(a) !== sideOf(b);

  // Roll a formula like "2d6+4" or "1d6+4+3d6"; doubleDice for critical hits
  function rollDice(formula, doubleDice = false) {
    const terms = String(formula).replace(/\s/g, '').match(/[+-]?[^+-]+/g) || [];
    const rolls = [];
    let total = 0;
    terms.forEach(term => {
      const sign = term.startsWith('-') ? -1 : 1;
      const body = term.replace(/^[+-]/, '');
      const m = body.match(/^(\d+)d(\d+)$/i);
      if (m) {
        const count = parseInt(m[1], 10) * (doubleDice ? 2 : 1);
        const sides = parseInt(m[2], 10);
        for (let i = 0; i < count; i++) {
          const r = Math.floor(Math.random() * sides) + 1;
          rolls.push(r);
          total += sign * r;
        }
      } else {
        total += sign * (parseInt(body, 10) || 0);
      }
    });
    return { total: Math.max(0, total), rolls };
  }

  // Build a battlemat unit from a party character sheet
  function buildPartyEntity(p, x, y, color) {
    const s = p.stats || {};
    const lvl = p.level || 5;
    const pb = Math.ceil(1 + lvl / 4);
    const role = (p.classRole || '').toLowerCase();
    const strM = statMod(s.str), dexM = statMod(s.dex);
    const castStat = role.includes('cleric') || role.includes('druid') || role.includes('ranger') ? 'wis'
      : (role.includes('wizard') || role.includes('artificer') ? 'int' : 'cha');
    const castM = statMod(s[castStat]);

    let abilities = [];
    let dmgFormula = `1d8+${Math.max(strM, dexM)}`;
    let weaponName = 'Weapon';
    let dmgType = 'slashing';
    let spellSlots = {};
    if (role.includes('barbarian')) {
      abilities = ['javelin']; dmgFormula = `1d12+${strM + 2}`; weaponName = 'Greataxe (Rage)';
    } else if (role.includes('cleric')) {
      abilities = ['sacred_flame', 'guiding_bolt', 'cure_wounds', 'healing_word'];
      dmgFormula = `1d8+${strM}`; weaponName = 'Mace'; dmgType = 'bludgeoning';
      spellSlots = { 1: { max: 4, current: 4 }, 2: { max: 3, current: 3 }, 3: { max: 2, current: 2 } };
    } else if (role.includes('rogue')) {
      abilities = ['psychic_blade', 'shortbow']; dmgFormula = `1d6+${dexM}+3d6`; weaponName = 'Psychic Blade + Sneak Attack'; dmgType = 'psychic';
    } else if (role.includes('wizard') || role.includes('sorcerer')) {
      abilities = ['firebolt', 'magic_missile', 'thunderwave', 'misty_step', 'scorching_ray', 'fireball'];
      dmgFormula = `1d6+${Math.max(strM, dexM)}`; weaponName = 'Quarterstaff'; dmgType = 'bludgeoning';
      spellSlots = { 1: { max: 4, current: 4 }, 2: { max: 3, current: 3 }, 3: { max: 2, current: 2 } };
    } else if (role.includes('ranger')) {
      abilities = ['longbow', 'cure_wounds'];
      spellSlots = { 1: { max: 4, current: 4 }, 2: { max: 2, current: 2 } };
    } else {
      abilities = ['javelin'];
    }
    const speedFt = parseInt(String(p.speed || '30'), 10) || 30;
    return {
      id: p.id,
      partyId: p.id,
      name: p.name,
      team: 'player',
      color: color || '#3b82f6',
      avatar: (p.name || 'PC').substring(0, 2).toUpperCase(),
      x, y,
      hp: p.hpCurrent !== undefined ? p.hpCurrent : p.hpMax,
      maxHp: p.hpMax || 30,
      ac: p.ac || 14,
      speed: Math.round(speedFt / 5),
      movementLeft: Math.round(speedFt / 5),
      init: parseInt(p.initiativeMod, 10) || dexM,
      stats: s,
      level: lvl,
      classRole: p.classRole,
      playerName: p.playerName,
      attackMod: Math.max(strM, dexM) + pb,
      spellAttack: castM + pb,
      spellDC: 8 + pb + castM,
      dmgFormula, dmgType, weaponName,
      abilities,
      spellSlots
    };
  }

  function buildMonsterEntity(name, x, y, team = 'enemy', overrides = {}) {
    const t = BESTIARY[name] || { ac: 14, hp: 20, speed: 6, init: 1, attackMod: 4, dmgFormula: '1d8+2', dmgType: 'slashing', weaponName: 'Strike', abilities: [], spellDC: 12 };
    return Object.assign({
      id: 'mon_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      name,
      team,
      color: team === 'ally' ? '#14b8a6' : '#ef4444',
      avatar: name.substring(0, 2).toUpperCase(),
      x, y,
      hp: t.hp, maxHp: t.hp, ac: t.ac,
      speed: t.speed, movementLeft: t.speed,
      init: t.init,
      attackMod: t.attackMod, spellAttack: t.attackMod, spellDC: t.spellDC,
      dmgFormula: t.dmgFormula, dmgType: t.dmgType, weaponName: t.weaponName,
      abilities: [...t.abilities],
      abilityUses: {}
    }, overrides);
  }

  // Populate Initial Entities from Aetheria Party & Monsters
  const partyData = worldState.data.partyCharacters || [];
  const partyColors = ['#3b82f6', '#10b981', '#a855f7', '#f59e0b', '#ec4899', '#06b6d4'];
  cState.entities = partyData.slice(0, 6).map((p, i) => buildPartyEntity(p, 2 + (i % 2), 4 + i, partyColors[i % partyColors.length]));
  cState.entities.push(
    buildMonsterEntity('Goblin Alpha', 8, 4, 'enemy', { id: 'mon-1', name: 'Ash Goblin Alpha', avatar: 'GA', abilities: ['shortbow', 'ember_hex'] }),
    buildMonsterEntity('Troll', 8, 7, 'enemy', { id: 'mon-2', name: 'Frost Troll', avatar: 'FT', color: '#0288d1', hp: 65, maxHp: 65, dmgType: 'cold', abilities: ['frost_breath'] })
  );
  // Helper: Play Web Audio synthesized ping chime
  function playChime(isSecret = false) {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = isSecret ? 'triangle' : 'sine';
      const t = audioCtx.currentTime;
      if (isSecret) {
        osc.frequency.setValueAtTime(587.33, t);
        osc.frequency.exponentialRampToValueAtTime(880, t + 0.18);
      } else {
        osc.frequency.setValueAtTime(880, t);
        osc.frequency.exponentialRampToValueAtTime(1318.51, t + 0.15);
      }
      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.35);
    } catch(e) {}
  }

  function logMsg(msg, colorClass = 'var(--text-secondary)') {
    const stream = container.querySelector('#combat-log-stream');
    if (!stream) return;
    const el = document.createElement('div');
    el.style.color = colorClass;
    el.style.lineHeight = '1.4';
    el.innerHTML = `> ${msg}`;
    stream.appendChild(el);
    stream.scrollTop = stream.scrollHeight;
  }

  function notifyToast(text) {
    const toast = container.querySelector('#combat-notification-toast');
    if (!toast) return;
    toast.textContent = text;
    toast.style.opacity = '1';
    toast.style.transform = 'translate(-50%, 0)';
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translate(-50%, -10px)';
    }, 2400);
  }

  function triggerPing(gx, gy) {
    let senderName = 'DM';
    let senderAvatar = 'DM';
    let recipients = 'ALL';
    let color = cState.dmPingColor || '#38bdf8';

    if (cState.currentPerspective === 'DM') {
      if (cState.dmPingVis === 'CUSTOM' && cState.dmPingRecipients.length > 0) {
        recipients = [...cState.dmPingRecipients];
        color = '#a855f7';
      } else {
        recipients = 'ALL';
        color = cState.dmPingColor;
      }
    } else {
      const p = cState.entities.find(e => e.id === cState.currentPerspective);
      if (p) {
        senderName = p.name;
        senderAvatar = p.avatar || p.name.substring(0, 2).toUpperCase();
        color = p.color || '#3b82f6';
        recipients = 'ALL';
      }
    }

    const isSecret = Array.isArray(recipients);
    const pingObj = {
      id: 'ping_' + Date.now(),
      x: gx,
      y: gy,
      senderName,
      senderAvatar,
      recipients,
      color,
      isSecret,
      life: 80,
      maxLife: 80
    };

    cState.activePings.push(pingObj);

    // Can perspective see it?
    const canSee = cState.currentPerspective === 'DM' || recipients === 'ALL' || (Array.isArray(recipients) && recipients.includes(cState.currentPerspective));
    if (canSee) {
      playChime(isSecret);
      if (isSecret) {
        if (cState.currentPerspective === 'DM') {
          const names = recipients.map(id => (cState.entities.find(e => e.id === id) || {}).name || id).join(', ');
          logMsg(`[Secret Ping to ${names}] DM marked (${gx}, ${gy})`, '#c084fc');
          notifyToast(`Secret Ping sent to: ${names}`);
        } else {
          logMsg(`[DM Whisper] DM pointed out square (${gx}, ${gy})`, '#c084fc');
          notifyToast(`DM whispered a ping at (${gx}, ${gy})!`);
        }
      } else {
        logMsg(`${senderName} pinged square (${gx}, ${gy})`, '#38bdf8');
        notifyToast(`${senderName} pinged (${gx}, ${gy})`);
      }
    }
  }

  // Canvas Layout & Resize
  function resizeCanvas() {
    canvas.width = cState.gridSize * cState.minTileSize;
    canvas.height = cState.gridSize * cState.minTileSize;
    cState.tileSize = cState.minTileSize;
  }
  resizeCanvas();

  // Canvas Mouse Events
  let isDragging = false, startPanX = 0, startPanY = 0, scrollL = 0, scrollT = 0, hasDragged = false;
  canvasContainer.addEventListener('mousedown', (e) => {
    if (e.button !== 0 || cState.isPaintActive) return;
    isDragging = true;
    hasDragged = false;
    startPanX = e.pageX - canvasContainer.offsetLeft;
    startPanY = e.pageY - canvasContainer.offsetTop;
    scrollL = canvasContainer.scrollLeft;
    scrollT = canvasContainer.scrollTop;
  });

  canvasContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const walkX = (e.pageX - canvasContainer.offsetLeft) - startPanX;
    const walkY = (e.pageY - canvasContainer.offsetTop) - startPanY;
    if (Math.abs(walkX) > 5 || Math.abs(walkY) > 5) {
      hasDragged = true;
      canvasContainer.scrollLeft = scrollL - walkX;
      canvasContainer.scrollTop = scrollT - walkY;
    }
  });

  const stopPan = () => { isDragging = false; };
  canvasContainer.addEventListener('mouseup', stopPan);
  canvasContainer.addEventListener('mouseleave', stopPan);

  // Coordinate translation handling any canvas scaling or viewport differences
  function getCanvasTileCoords(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / (rect.width || 1);
    const scaleY = canvas.height / (rect.height || 1);
    const clientX = (e.clientX - rect.left) * scaleX;
    const clientY = (e.clientY - rect.top) * scaleY;
    const gx = Math.floor(clientX / cState.tileSize);
    const gy = Math.floor(clientY / cState.tileSize);
    return {
      gx,
      gy,
      inBounds: gx >= 0 && gx < cState.gridSize && gy >= 0 && gy < cState.gridSize
    };
  }

  // Hover Tracking
  const updateHoverTile = (e) => {
    const coords = getCanvasTileCoords(e);
    if (coords.inBounds) {
      cState.hoveredTile = { x: coords.gx, y: coords.gy };
    } else {
      cState.hoveredTile = null;
    }
  };

  canvas.addEventListener('mousemove', updateHoverTile);
  canvasContainer.addEventListener('mousemove', updateHoverTile);

  canvas.addEventListener('mouseleave', () => {
    cState.hoveredTile = null;
  });

  // Right-Click Context Menu -> Instant Ping
  canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const coords = getCanvasTileCoords(e);
    if (coords.inBounds) {
      triggerPing(coords.gx, coords.gy);
    }
  });

  // Canvas Click Handler
  canvas.addEventListener('click', (e) => {
    if (hasDragged) { hasDragged = false; return; }
    const coords = getCanvasTileCoords(e);
    if (!coords.inBounds) return;
    const gx = coords.gx;
    const gy = coords.gy;

    if (e.shiftKey || e.altKey || cState.selectedAction === 'PING') {
      triggerPing(gx, gy);
      if (cState.selectedAction === 'PING') {
        cState.selectedAction = null;
        updateActionUi();
      }
      return;
    }

    const clickedEntity = cState.entities.find(ent => ent.x === gx && ent.y === gy && ent.hp > 0);

    if (cState.selectedAction) {
      handleActionClick(gx, gy, clickedEntity);
    } else {
      handleUnitClick(clickedEntity);
    }
  });

  function handleUnitClick(entity) {
    if (entity) {
      cState.selectedEntity = entity;
      cState.selectedAction = null;
      if (entity.team === 'player') {
        notifyToast(`Selected ${entity.name}`);
      } else {
        notifyToast(`${entity.team === 'ally' ? 'Ally' : 'Enemy'}: ${entity.name} (AC: ${entity.ac}, HP: ${entity.hp}/${entity.maxHp})`);
      }
    } else {
      cState.selectedEntity = null;
      cState.selectedAction = null;
    }
    updateActionUi();
  }

  // ==========================================
  // TURN / ACTION ECONOMY HELPERS
  // ==========================================
  function currentTurnEntity() {
    const c = cState.combat;
    if (!c.active || c.order.length === 0) return null;
    return cState.entities.find(e => e.id === c.order[c.turnIndex]) || null;
  }

  function canAct(actor, isBonus = false) {
    if (worldState.prefs && worldState.prefs.dmMode) return { ok: true }; // DM has full authority to act/test
    const c = cState.combat;
    if (!c.active) return { ok: true }; // free-form actions outside of initiative (no action economy)
    if (c.aiRunning) return { ok: false, reason: 'Wait for the current NPC turn to finish.' };
    const cur = currentTurnEntity();
    if (!cur || cur.id !== actor.id) return { ok: false, reason: `It is not ${actor.name}'s turn${cur ? ` (current: ${cur.name})` : ''}.` };
    if (isBonus ? actor.bonusUsed : actor.actionUsed) {
      return { ok: false, reason: isBonus ? 'Bonus action already used this turn.' : 'Action already used this turn.' };
    }
    return { ok: true };
  }

  function hasSlotFor(actor, level) {
    if (worldState.prefs && worldState.prefs.dmMode) return true;
    if (!level || !actor.spellSlots || Object.keys(actor.spellSlots).length === 0) return true;
    return Object.keys(actor.spellSlots).some(l => parseInt(l, 10) >= level && actor.spellSlots[l].current > 0);
  }

  function spendSlot(actor, level) {
    if (!level || !actor.spellSlots || Object.keys(actor.spellSlots).length === 0) return null;
    const lvls = Object.keys(actor.spellSlots).map(n => parseInt(n, 10)).filter(l => l >= level).sort((a, b) => a - b);
    for (const l of lvls) {
      if (actor.spellSlots[l].current > 0) { actor.spellSlots[l].current--; return l; }
    }
    return null;
  }

  function usableAbilities(actor) {
    const isDm = Boolean(worldState.prefs && worldState.prefs.dmMode);
    const keys = Object.keys(ABILITIES);
    return keys.filter(id => {
      const ab = ABILITIES[id];
      if (!ab) return false;
      if (isDm) return true;
      if (actor.abilities && actor.abilities.includes(id)) {
        if (ab.uses && ((actor.abilityUses || {})[id] || 0) >= ab.uses) return false;
        return hasSlotFor(actor, ab.level);
      }
      return hasSlotFor(actor, ab.level);
    });
  }

  function describeAbility(actor, id) {
    const ab = ABILITIES[id];
    if (!ab) return id;
    const parts = [];
    parts.push(ab.level === 0 ? 'Cantrip' : (ab.level ? `Lvl ${ab.level}` : (ab.weapon ? 'Weapon' : 'Ability')));
    if (ab.dmg) parts.push(`${ab.dmg} ${ab.type}`);
    if (ab.heal) parts.push(`heal ${ab.heal}`);
    if (ab.save) parts.push(`${ab.save} save DC ${actor.spellDC || 15}`);
    if (ab.radius) parts.push(`${ab.radius * 5}ft radius AoE`);
    if (ab.kind === 'attack') parts.push(`+${ab.weapon ? actor.attackMod : (actor.spellAttack || 6)} to hit`);
    if (ab.kind === 'auto') parts.push('auto-hit');
    if (ab.centerSelf) parts.push(`${ab.radius * 5 + 5}ft around self`);
    else if (ab.range) parts.push(ab.range <= 1 ? 'touch' : `${ab.range * 5}ft range`);
    if (ab.bonus) parts.push('bonus action');
    if (ab.uses) parts.push(`${Math.max(0, ab.uses - ((actor.abilityUses || {})[id] || 0))} use left`);
    return `${ab.name} [${parts.join(' • ')}]`;
  }

  // ==========================================
  // DAMAGE, HEALING & SAVES
  // ==========================================
  function pushFloater(ent, text, color) {
    cState.effects.push({ text, x: ent.x * cState.tileSize + cState.tileSize / 2, y: ent.y * cState.tileSize + cState.tileSize / 2, color, life: 40, offset: 0 });
  }

  function syncPartyHp(ent) {
    if (!ent.partyId) return;
    const pc = (worldState.data.partyCharacters || []).find(p => p.id === ent.partyId);
    if (pc) {
      pc.hpCurrent = ent.hp;
      worldState.saveData();
    }
  }

  function applyDamage(target, amount, type, sourceName) {
    target.hp = Math.max(0, target.hp - amount);
    pushFloater(target, `-${amount}`, '#ef4444');
    syncPartyHp(target);
    if (target.hp === 0) {
      if (target.team === 'player') logMsg(`💀 ${target.name} drops to 0 HP and falls unconscious!`, '#f87171');
      else logMsg(`☠ ${target.name} is slain${sourceName ? ` by ${sourceName}` : ''}!`, '#fbbf24');
    }
  }

  function applyHeal(target, amount) {
    const wasDown = target.hp <= 0;
    target.hp = Math.min(target.maxHp, target.hp + amount);
    pushFloater(target, `+${amount}`, '#4ade80');
    syncPartyHp(target);
    if (wasDown && target.hp > 0) logMsg(`✨ ${target.name} is revived and back on their feet!`, '#4ade80');
  }

  function computeSaveMod(unit, statKey) {
    const key = statKey.toLowerCase();
    if (unit.stats && unit.stats[key] !== undefined) {
      let mod = statMod(unit.stats[key]);
      if (unit.classRole) {
        const role = unit.classRole.toLowerCase();
        const pb = Math.ceil(1 + (unit.level || 5) / 4);
        if ((role.includes('barbarian') && (statKey === 'STR' || statKey === 'CON')) ||
            (role.includes('fighter') && (statKey === 'STR' || statKey === 'CON')) ||
            (role.includes('cleric') && (statKey === 'WIS' || statKey === 'CHA')) ||
            (role.includes('rogue') && (statKey === 'DEX' || statKey === 'INT')) ||
            (role.includes('ranger') && (statKey === 'STR' || statKey === 'DEX')) ||
            (role.includes('wizard') && (statKey === 'INT' || statKey === 'WIS'))) {
          mod += pb;
        }
      }
      return mod;
    }
    const name = unit.name.toLowerCase();
    if (name.includes('goblin')) return statKey === 'DEX' ? 2 : (statKey === 'STR' ? -1 : 0);
    if (name.includes('troll')) return statKey === 'CON' ? 5 : (statKey === 'STR' ? 4 : (statKey === 'DEX' ? 1 : -1));
    if (name.includes('dragon')) return statKey === 'STR' ? 4 : (statKey === 'DEX' ? 1 : (statKey === 'CON' ? 3 : 2));
    if (name.includes('orc')) return statKey === 'STR' ? 3 : (statKey === 'CON' ? 3 : (statKey === 'INT' ? -2 : 0));
    if (name.includes('skeleton')) return statKey === 'DEX' ? 2 : (statKey === 'CON' ? 2 : -1);
    if (name.includes('owlbear')) return statKey === 'STR' ? 5 : (statKey === 'CON' ? 3 : 1);
    return 2;
  }

  function rollerLabel(unit) {
    return unit.team === 'player' && unit.playerName ? `${unit.name} (${unit.playerName})` : unit.name;
  }

  // Auto-rolls a saving throw for any unit (players use their real sheet stats)
  function rollSaveFor(unit, statKey, dc, sourceLabel) {
    const mod = computeSaveMod(unit, statKey);
    const d20 = rollD20();
    const total = d20 + mod;
    const success = total >= dc;
    const entry = {
      rollerName: rollerLabel(unit),
      rollerAvatar: unit.avatar || '🎲',
      rollType: 'save',
      label: `${statKey} Saving Throw`,
      formula: `1d20 (${d20}) ${mod >= 0 ? '+' : '-'} ${Math.abs(mod)}`,
      d20Result: d20,
      total,
      dc,
      success,
      advantageMode: 'normal',
      note: `vs ${sourceLabel}`
    };
    worldState.logDiceRoll(entry);
    appendRollToCombatLog(entry);
    return success;
  }

  function rollWithMode(mode) {
    const d1 = rollD20(), d2 = rollD20();
    if (mode === 'ADVANTAGE') return { d20: Math.max(d1, d2), text: `1d20 [ADV: ${d1}, ${d2}]` };
    if (mode === 'DISADVANTAGE') return { d20: Math.min(d1, d2), text: `1d20 [DIS: ${d1}, ${d2}]` };
    return { d20: d1, text: `1d20 (${d1})` };
  }

  function makeAttackRoll(actor, target, bonus, label, dmgFormula, dmgType, advMode = 'NORMAL') {
    const r = rollWithMode(advMode);
    const total = r.d20 + bonus;
    const crit = r.d20 === 20;
    const hit = crit || (r.d20 !== 1 && total >= target.ac);
    const entry = {
      rollerName: rollerLabel(actor),
      rollerAvatar: actor.avatar || '🎲',
      rollType: 'attack',
      label: `${label} → ${target.name}`,
      formula: `${r.text} ${bonus >= 0 ? '+' : '-'} ${Math.abs(bonus)}`,
      d20Result: r.d20,
      total,
      dc: target.ac,
      success: hit,
      advantageMode: advMode.toLowerCase(),
      note: `vs AC ${target.ac}`
    };
    worldState.logDiceRoll(entry);
    appendRollToCombatLog(entry);
    if (hit) {
      const dmg = rollDice(dmgFormula, crit).total;
      logMsg(`${crit ? '💥 CRITICAL! ' : ''}${actor.name}'s ${label} hits ${target.name} for ${dmg} ${dmgType} damage.`, isHostile(actor, { team: 'player' }) ? '#f87171' : '#4ade80');
      applyDamage(target, dmg, dmgType, actor.name);
    } else {
      logMsg(`${actor.name}'s ${label} misses ${target.name}.`, '#94a3b8');
      pushFloater(target, 'MISS', '#94a3b8');
    }
    return hit;
  }

  function performWeaponAttack(actor, target, advMode = 'NORMAL') {
    return makeAttackRoll(actor, target, actor.attackMod || 4, actor.weaponName || 'Strike', actor.dmgFormula || '1d6+2', actor.dmgType || 'slashing', advMode);
  }

  // Execute a spell / ability. Hostile casters (enemies, hostile NPCs) target the party the same way players target enemies.
  function executeAbility(actor, id, target, tile, advMode = 'NORMAL') {
    const ab = ABILITIES[id];
    if (!ab) return false;
    const slotUsed = spendSlot(actor, ab.level);
    if (ab.uses) {
      actor.abilityUses = actor.abilityUses || {};
      actor.abilityUses[id] = (actor.abilityUses[id] || 0) + 1;
    }
    const dc = actor.spellDC || 13;
    const castLabel = `${actor.name} uses ${ab.name}${slotUsed ? ` (Lvl ${slotUsed} slot)` : ''}`;
    const castColor = sideOf(actor) === 'foe' ? '#fb7185' : '#c084fc';

    if (ab.kind === 'attack') {
      logMsg(`${castLabel} at ${target.name}.`, castColor);
      makeAttackRoll(actor, target, ab.weapon ? actor.attackMod : actor.spellAttack, ab.name, ab.dmg, ab.type, advMode);
    } else if (ab.kind === 'auto') {
      const dmg = rollDice(ab.dmg).total;
      logMsg(`${castLabel}: ${target.name} takes ${dmg} ${ab.type} damage (auto-hit).`, castColor);
      applyDamage(target, dmg, ab.type, actor.name);
    } else if (ab.kind === 'save') {
      logMsg(`${castLabel} on ${target.name} (${ab.save} save DC ${dc}).`, castColor);
      const saved = rollSaveFor(target, ab.save, dc, `${actor.name}'s ${ab.name}`);
      const full = rollDice(ab.dmg).total;
      const dmg = saved ? (ab.half ? Math.floor(full / 2) : 0) : full;
      if (dmg > 0) {
        logMsg(`  ↳ ${target.name} ${saved ? 'partially resists and' : ''} takes ${dmg} ${ab.type} damage.`, castColor);
        applyDamage(target, dmg, ab.type, actor.name);
      } else {
        logMsg(`  ↳ ${target.name} avoids the effect entirely.`, '#94a3b8');
        pushFloater(target, 'SAVED', '#93c5fd');
      }
    } else if (ab.kind === 'aoe') {
      const center = ab.centerSelf ? { x: actor.x, y: actor.y } : tile;
      logMsg(`${castLabel} centred on (${center.x}, ${center.y}) — ${ab.save} save DC ${dc}!`, castColor);
      cState.effects.push({ kind: 'aoe', gx: center.x, gy: center.y, radius: ab.radius, color: ab.type === 'cold' ? '#38bdf8' : (ab.type === 'thunder' ? '#a78bfa' : '#f97316'), life: 30, maxLife: 30 });
      const victims = cState.entities.filter(e => e.hp > 0 && dist(e, center) <= ab.radius && !(ab.centerSelf && e.id === actor.id));
      if (victims.length === 0) logMsg('  ↳ No creatures caught in the area.', '#94a3b8');
      const full = rollDice(ab.dmg).total;
      victims.forEach(v => {
        const saved = rollSaveFor(v, ab.save, dc, `${actor.name}'s ${ab.name}`);
        const dmg = saved ? (ab.half ? Math.floor(full / 2) : 0) : full;
        logMsg(`  ↳ ${v.name} ${saved ? 'saves and takes' : 'fails and takes'} ${dmg} ${ab.type} damage.`, castColor);
        if (dmg > 0) applyDamage(v, dmg, ab.type, actor.name);
      });
    } else if (ab.kind === 'heal') {
      const amt = rollDice(ab.heal).total;
      logMsg(`${castLabel} on ${target.name}, restoring ${amt} HP.`, '#4ade80');
      applyHeal(target, amt);
    } else if (ab.kind === 'teleport') {
      actor.x = tile.x;
      actor.y = tile.y;
      logMsg(`${castLabel} and teleports to (${tile.x}, ${tile.y}).`, castColor);
    }
    return true;
  }

  function markActionSpent(actor, ab) {
    if (ab && ab.bonus) actor.bonusUsed = true;
    else actor.actionUsed = true;
  }

  function handleActionClick(gx, gy, clickedEntity) {
    const actor = cState.selectedEntity;
    if (!actor) return;
    if (!worldState.canControlCharacter(actor.id, actor)) {
      notifyToast(`You cannot control ${actor.name}! (Controlled by ${worldState.getCharacterOwnerName(actor.id, actor)})`);
      return;
    }
    if (actor.hp <= 0) return notifyToast(`${actor.name} is unconscious.`);
    const act = cState.selectedAction;
    const c = cState.combat;

    if (act === 'MOVE') {
      if (c.active) {
        const cur = currentTurnEntity();
        if (c.aiRunning) return notifyToast('Wait for the current NPC turn to finish.');
        if (!cur || cur.id !== actor.id) return notifyToast(`It is not ${actor.name}'s turn.`);
      }
      if (clickedEntity) return notifyToast('Space occupied!');
      const d = Math.max(Math.abs(actor.x - gx), Math.abs(actor.y - gy));
      if (c.active && d > actor.movementLeft) return notifyToast(`Not enough movement! (${actor.movementLeft * 5}ft left)`);
      actor.x = gx;
      actor.y = gy;
      if (c.active) actor.movementLeft -= d;
      logMsg(`${actor.name} moves ${d * 5}ft.`, 'var(--text-primary)');
      if (c.active && actor.movementLeft > 0) {
        updateActionUi();
        renderTurnUi();
        return; // keep MOVE selected while movement remains
      }
    } else if (act === 'ATTACK') {
      const chk = canAct(actor, false);
      if (!chk.ok) return notifyToast(chk.reason);
      if (!clickedEntity || clickedEntity.hp <= 0 || !isHostile(actor, clickedEntity)) return notifyToast('Target a hostile creature!');
      if (dist(actor, clickedEntity) > (actor.reach || 1)) return notifyToast('Target out of melee reach! Use a ranged ability or move closer.');
      performWeaponAttack(actor, clickedEntity, cState.advantageMode);
      actor.actionUsed = true;
    } else if (act === 'CAST') {
      const id = cState.selectedSpellId;
      const ab = ABILITIES[id];
      if (!ab) return notifyToast('Choose a spell or ability first.');
      const isDm = Boolean(worldState.prefs && worldState.prefs.dmMode);
      if (!isDm) {
        const chk = canAct(actor, !!ab.bonus);
        if (!chk.ok) return notifyToast(chk.reason);
        if (!usableAbilities(actor).includes(id)) return notifyToast(`${ab.name} is unavailable (no slots / uses left).`);
      }

      const tile = { x: gx, y: gy };
      if (ab.kind === 'attack' || ab.kind === 'auto' || ab.kind === 'save') {
        if (!clickedEntity || clickedEntity.hp <= 0 || !isHostile(actor, clickedEntity)) return notifyToast('Target a hostile creature!');
        if (dist(actor, clickedEntity) > ab.range) return notifyToast(`Out of range (${ab.range * 5}ft).`);
        executeAbility(actor, id, clickedEntity, tile, cState.advantageMode);
      } else if (ab.kind === 'heal') {
        if (!clickedEntity || isHostile(actor, clickedEntity)) return notifyToast('Target a friendly creature to heal!');
        if (dist(actor, clickedEntity) > ab.range) return notifyToast(`Out of range (${ab.range <= 1 ? 'touch' : ab.range * 5 + 'ft'}).`);
        executeAbility(actor, id, clickedEntity, tile);
      } else if (ab.kind === 'aoe') {
        // AoE spells target any square on the map within range (e.g. Fireball)
        if (!ab.centerSelf && dist(actor, tile) > ab.range) {
          return notifyToast(`Target square is out of range (${ab.range * 5}ft max).`);
        }
        executeAbility(actor, id, null, tile);
      } else if (ab.kind === 'teleport') {
        if (clickedEntity) return notifyToast('Tile occupied!');
        if (dist(actor, tile) > ab.range) return notifyToast(`Out of range (${ab.range * 5}ft).`);
        executeAbility(actor, id, null, tile);
      }
      markActionSpent(actor, ab);
    }
    cState.selectedAction = null;
    updateActionUi();
    renderTurnUi();
    checkCombatEnd();
  }

  function populateAbilitySelect(actor) {
    const spellSelect = container.querySelector('#combat-spell-select');
    if (!spellSelect) return;
    const isDm = Boolean(worldState.prefs && worldState.prefs.dmMode);
    const unitIds = (actor.abilities || []).filter(id => ABILITIES[id]);
    const usable = usableAbilities(actor);

    const aoeIds = ['fireball', 'thunderwave', 'frost_breath', 'fire_breath'];
    const attackIds = ['magic_missile', 'scorching_ray', 'firebolt', 'sacred_flame', 'guiding_bolt', 'ember_hex', 'terrify_roar', 'shortbow', 'longbow', 'javelin', 'psychic_blade'];
    const utilityIds = ['cure_wounds', 'healing_word', 'misty_step'];

    const renderOpt = (id) => {
      const ab = ABILITIES[id];
      if (!ab) return '';
      const available = isDm || usable.includes(id);
      return `<option value="${id}" ${available ? '' : 'disabled'}>${describeAbility(actor, id)}${available ? '' : ' — unavailable'}</option>`;
    };

    let html = '';
    if (unitIds.length > 0) {
      html += `<optgroup label="Unit Prepared Spells & Abilities">` + unitIds.map(renderOpt).join('') + `</optgroup>`;
    }
    html += `<optgroup label="💥 Area of Effect (AoE) & Ground Spells">` + aoeIds.map(renderOpt).join('') + `</optgroup>`;
    html += `<optgroup label="⚔️ Single-Target Spells & Attacks">` + attackIds.filter(id => !unitIds.includes(id)).map(renderOpt).join('') + `</optgroup>`;
    html += `<optgroup label="✨ Healing, Utility & Teleport">` + utilityIds.filter(id => !unitIds.includes(id)).map(renderOpt).join('') + `</optgroup>`;

    const sig = actor.id + '|' + isDm;
    if (spellSelect.dataset.sig !== sig) {
      spellSelect.innerHTML = html;
      spellSelect.dataset.sig = sig;
    }

    if (!cState.selectedSpellId || !ABILITIES[cState.selectedSpellId]) {
      cState.selectedSpellId = unitIds[0] || 'fireball';
    }
    spellSelect.value = cState.selectedSpellId;
  }

  function updateActionUi() {
    const actor = cState.selectedEntity;
    const info = container.querySelector('#combat-active-unit-info');
    const controls = container.querySelector('#combat-action-controls');
    const spellSelect = container.querySelector('#combat-spell-select');
    const unitSavePanel = container.querySelector('#combat-unit-save-panel');
    const dmPushPanel = container.querySelector('#combat-dm-push-panel');
    const isDm = Boolean(worldState.prefs && worldState.prefs.dmMode);

    container.querySelectorAll('.combat-act-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.action === cState.selectedAction);
    });

    if (actor) {
      const canControl = worldState.canControlCharacter(actor.id, actor);
      const ownerName = worldState.getCharacterOwnerName(actor.id, actor);
      const cur = currentTurnEntity();
      const isTurn = cState.combat.active && cur && cur.id === actor.id;
      const teamLabel = actor.team === 'player' ? 'Player' : (actor.team === 'ally' ? 'Allied NPC' : 'Enemy');
      const teamBg = actor.team === 'player' ? 'rgba(59, 130, 246, 0.2)' : (actor.team === 'ally' ? 'rgba(20, 184, 166, 0.2)' : 'rgba(239, 68, 68, 0.2)');
      const teamFg = actor.team === 'player' ? '#93c5fd' : (actor.team === 'ally' ? '#5eead4' : '#fca5a5');
      const slots = actor.spellSlots && Object.keys(actor.spellSlots).length
        ? Object.keys(actor.spellSlots).map(l => `L${l}: ${actor.spellSlots[l].current}/${actor.spellSlots[l].max}`).join(' · ')
        : '';

      info.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
          <span style="font-size: 0.85rem; font-weight: bold; color: var(--text-gold); background: var(--bg-tertiary); padding: 2px 6px; border-radius: 4px;">${actor.avatar || actor.name.substring(0, 2).toUpperCase()}</span>
          <div>
            <strong style="color: var(--text-gold); font-size: 0.9rem;">${actor.name}</strong>
            <span style="font-size: 0.7rem; color: var(--text-muted); margin-left: 0.35rem;">(AC ${actor.ac})</span>
            <span class="badge" style="font-size: 0.65rem; margin-left: 0.35rem; background: ${teamBg}; color: ${teamFg};">${teamLabel}</span>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-secondary);">
          <span>HP: <strong style="color: ${actor.hp <= 0 ? '#f87171' : '#4ade80'};">${actor.hp}</strong> / ${actor.maxHp}</span>
          <span>Move: <strong style="color: #60a5fa;">${actor.movementLeft * 5}</strong>/${actor.speed * 5}ft</span>
        </div>
        ${slots ? `<div style="font-size: 0.68rem; color: #c4b5fd; margin-top: 0.2rem;">Spell slots: ${slots}</div>` : ''}
        ${cState.combat.active ? `
          <div style="margin-top: 0.3rem; font-size: 0.7rem; color: ${isTurn ? '#fbbf24' : 'var(--text-muted)'};">
            ${isTurn ? '▶ Acting now' : `⏳ Waiting — current turn: ${cur ? cur.name : '—'}`}
          </div>
        ` : ''}
        ${!canControl ? `
          <div style="margin-top: 0.45rem; padding: 0.35rem 0.55rem; background: rgba(148, 163, 184, 0.08); border: 1px dashed rgba(148, 163, 184, 0.35); border-radius: var(--radius-sm); font-size: 0.7rem; color: var(--text-muted); display: flex; align-items: center; justify-content: space-between;">
            <span>🔒 Controlled by: <strong style="color: var(--text-gold);">${ownerName}</strong></span>
            <span class="badge" style="background: rgba(244, 67, 54, 0.15); color: #fca5a5; font-size: 0.65rem;">Read-Only</span>
          </div>
        ` : ''}
      `;

      // ONLY the player who owns this character or the DM has action controls
      if (canControl && actor.hp > 0) {
        controls.style.display = 'flex';
        populateAbilitySelect(actor);
        spellSelect.style.display = 'block';
        if (cState.selectedAction === 'CAST') {
          spellSelect.style.border = '1px solid #fbbf24';
          spellSelect.style.boxShadow = '0 0 10px rgba(251, 191, 36, 0.45)';
        } else {
          spellSelect.style.border = '1px solid var(--border-subtle)';
          spellSelect.style.boxShadow = 'none';
        }
      } else {
        controls.style.display = 'none';
        spellSelect.style.display = 'none';
      }

      // 1. Show Saving Throws panel for DM controlled units (ONLY for DM)
      if (unitSavePanel) unitSavePanel.style.display = isDm ? 'block' : 'none';

      // 2. Show Push Request panel if DM mode active AND a Player Character is selected
      if (dmPushPanel) {
        if (isDm && actor.team === 'player') {
          dmPushPanel.style.display = 'block';
          const targetLbl = container.querySelector('#combat-push-target-label');
          if (targetLbl) targetLbl.textContent = actor.playerName || actor.name;
        } else {
          dmPushPanel.style.display = 'none';
        }
      }
    } else {
      info.innerHTML = cState.combat.active ? 'Select a unit on the battlemat.' : 'Select a unit on the battlemat to reposition it.';
      controls.style.display = 'none';
      spellSelect.style.display = 'none';
      if (unitSavePanel) unitSavePanel.style.display = 'none';
      if (dmPushPanel) dmPushPanel.style.display = 'none';
    }
  }
  // Helper: Append a real-time roll into the combat log stream
  function appendRollToCombatLog(roll) {
    const stream = container.querySelector('#combat-log-stream');
    if (!stream) return;
    const el = document.createElement('div');
    el.className = 'combat-roll-log-entry';
    el.style.borderLeft = roll.success === true ? '3px solid #22c55e' : (roll.success === false ? '3px solid #ef4444' : '3px solid var(--text-gold)');
    el.style.background = 'rgba(255, 255, 255, 0.04)';
    el.style.padding = '3px 6px';
    el.style.borderRadius = '3px';
    el.style.margin = '2px 0';
    el.style.lineHeight = '1.3';

    const outcome = roll.success === true ? '<span style="color: #4ade80; font-weight: bold;">[SUCCESS]</span>' : (roll.success === false ? '<span style="color: #f87171; font-weight: bold;">[FAILED]</span>' : '');
    const critBadge = roll.isCrit ? '<span style="color: #4ade80; font-weight: bold;">[NAT 20!]</span> ' : (roll.isNat1 ? '<span style="color: #f87171; font-weight: bold;">[NAT 1!]</span> ' : '');

    el.innerHTML = `
      <div style="display: flex; justify-content: space-between; font-size: 0.7rem;">
        <span style="color: var(--text-gold); font-weight: bold;">🎲 ${roll.rollerName}</span>
        <span style="color: var(--text-muted); font-size: 0.65rem;">${roll.timeStr || ''}</span>
      </div>
      <div style="font-size: 0.72rem; color: var(--text-primary);">
        ${critBadge}<strong>${roll.label}</strong>: ${roll.formula} = <strong style="color: var(--text-gold); font-size: 0.8rem;">${roll.total}</strong> ${outcome}
      </div>
      ${roll.note ? `<div style="font-size: 0.65rem; color: var(--text-secondary); font-style: italic;">↳ "${roll.note}"</div>` : ''}
    `;
    stream.appendChild(el);
    stream.scrollTop = stream.scrollHeight;
  }

  // Roll Saving Throw for DM-controlled unit
  function rollUnitSavingThrow(unit, statKey, dcVal) {
    const dc = dcVal ? parseInt(dcVal, 10) : null;
    const mod = computeSaveMod(unit, statKey);

    const d1 = Math.floor(Math.random() * 20) + 1;
    const d2 = Math.floor(Math.random() * 20) + 1;
    let d20 = d1;
    let formula = `1d20 (${d1})`;
    if (cState.advantageMode === 'ADVANTAGE') {
      d20 = Math.max(d1, d2);
      formula = `1d20 [ADV: ${d1}, ${d2} -> ${d20}]`;
    } else if (cState.advantageMode === 'DISADVANTAGE') {
      d20 = Math.min(d1, d2);
      formula = `1d20 [DIS: ${d1}, ${d2} -> ${d20}]`;
    }

    const total = d20 + mod;
    formula += mod >= 0 ? ` + ${mod}` : ` - ${Math.abs(mod)}`;
    const isCrit = d20 === 20;

    soundEngine.playDiceRoll(isCrit);

    const isSuccess = dc !== null ? total >= dc : null;

    const rollEntry = {
      rollerName: `${unit.name} (DM)`,
      rollerAvatar: unit.avatar || 'DM',
      rollType: 'save',
      label: `${statKey} Saving Throw`,
      formula,
      d20Result: d20,
      total,
      dc,
      success: isSuccess,
      advantageMode: cState.advantageMode.toLowerCase(),
      note: `Tactical Unit Save vs DC ${dc || 'None'}`
    };

    worldState.logDiceRoll(rollEntry);
    appendRollToCombatLog(rollEntry);

    const msg = `${unit.name} rolls ${statKey} Save: ${total}${dc ? (isSuccess ? ' (SUCCESS)' : ' (FAILED)') : ''}`;
    notifyToast(msg);
  }

  // Push Roll Request from DM to Player selected on battlemap
  function pushRequestToSelectedPlayer(playerUnit, saveType, dcVal, reasonVal) {
    const pData = (worldState.data.partyCharacters || []).find(p => p.id === playerUnit.id || p.name === playerUnit.name);
    const targetPlayerName = pData ? `${pData.playerName || pData.name} (${pData.name})` : playerUnit.name;
    const targetCharId = pData ? pData.id : playerUnit.id;
    const isSave = saveType.startsWith('save_');
    const ability = saveType.replace('save_', '').replace('check_', '');
    const dc = dcVal ? parseInt(dcVal, 10) : null;
    const reason = reasonVal || 'Combat Encounter Threat';

    worldState.pushRollRequest({
      targetCharId,
      targetPlayerName,
      requestedBy: 'DM',
      type: isSave ? 'save' : 'check',
      ability,
      dc,
      reason
    });

    soundEngine.playDiceRoll(false);
    notifyToast(`⚡ Pushed ${ability} ${isSave ? 'Save' : 'Check'} request to ${targetPlayerName}!`);
    logMsg(`⚡ DM pushed ${ability} ${isSave ? 'Save' : 'Check'} request (DC ${dc || 'None'}) to ${targetPlayerName}`, '#38bdf8');
    renderCombatPendingBanner();
  }

  // Render Pending DM Request Banner on Combat Screen
  function renderCombatPendingBanner() {
    const bannerBox = container.querySelector('#combat-pending-banner-container');
    if (!bannerBox) return;

    const activeHero = typeof worldState.getActiveHero === 'function' ? worldState.getActiveHero() : null;
    const isDm = Boolean(worldState.prefs && worldState.prefs.dmMode);

    const pending = typeof worldState.getPendingRollRequests === 'function'
      ? (isDm ? (worldState.data.pendingRollRequests || []) : worldState.getPendingRollRequests(activeHero ? activeHero.id : null))
      : [];

    if (pending.length === 0) {
      bannerBox.style.display = 'none';
      bannerBox.innerHTML = '';
      return;
    }

    const req = pending[0];
    const ability = req.ability || 'DEX';
    const isSave = req.type === 'save';
    const hero = activeHero || (worldState.data.partyCharacters || [])[0];
    const heroStats = (hero && hero.stats) || {};
    const mod = Math.floor(((heroStats[ability.toLowerCase()] || 10) - 10) / 2);
    const modStr = mod >= 0 ? '+' + mod : String(mod);
    const canResolve = isDm || (req.targetCharId === 'ALL') || worldState.canControlCharacter(req.targetCharId);

    bannerBox.style.display = 'block';
    bannerBox.innerHTML = `
      <div class="roll-request-banner" style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(185, 28, 28, 0.25)); border: 1px solid #f59e0b; border-radius: var(--radius-sm); padding: 0.5rem 0.75rem;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <strong style="color: #fbbf24; font-size: 0.8rem; display: flex; align-items: center; gap: 0.35rem;">
            ⚡ DM REQUEST: ${ability} ${isSave ? 'Saving Throw' : 'Check'} ${req.dc ? `(DC ${req.dc})` : ''}
          </strong>
          <span style="font-size: 0.7rem; color: var(--text-muted);">${req.targetPlayerName || 'You'}</span>
        </div>
        ${req.reason ? `<div style="font-size: 0.72rem; color: var(--text-secondary); font-style: italic; margin: 2px 0;">"${req.reason}"</div>` : ''}
        ${canResolve ? `
          <div style="display: flex; gap: 0.35rem; margin-top: 0.3rem;">
            <button class="btn btn-sm btn-primary combat-resolve-req-btn" data-adv="normal" style="flex: 1; font-size: 0.75rem; padding: 3px 6px;">
              🎲 Roll ${ability} Save (${modStr})
            </button>
            <button class="btn btn-sm combat-resolve-req-btn" data-adv="adv" style="font-size: 0.75rem; padding: 3px 6px; color: #4ade80;">
              Adv
            </button>
            <button class="btn btn-sm combat-resolve-req-btn" data-adv="dis" style="font-size: 0.75rem; padding: 3px 6px; color: #f87171;">
              Dis
            </button>
            ${isDm ? `
              <button class="btn btn-sm combat-dismiss-req-btn" style="background: none; border: 1px solid rgba(255,255,255,0.2); font-size: 0.7rem; padding: 2px 6px;">✕</button>
            ` : ''}
          </div>
        ` : `
          <div style="font-size: 0.72rem; color: var(--text-muted); font-style: italic; margin-top: 0.3rem;">
            ⏳ Awaiting roll from <strong style="color: var(--text-gold);">${req.targetPlayerName}</strong>... (Only character owner or DM can roll)
          </div>
        `}
      </div>
    `;

    bannerBox.querySelectorAll('.combat-resolve-req-btn').forEach(b => {
      b.addEventListener('click', () => {
        const advMode = b.getAttribute('data-adv') || 'normal';
        resolvePlayerPromptRoll(req, hero, advMode);
      });
    });

    const dismissBtn = bannerBox.querySelector('.combat-dismiss-req-btn');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', () => {
        worldState.dismissRollRequest(req.id);
        renderCombatPendingBanner();
      });
    }
  }

  function resolvePlayerPromptRoll(req, hero, advMode) {
    const ability = req.ability || 'DEX';
    const isSave = req.type === 'save';
    const dc = req.dc;
    const reason = req.reason || '';

    const heroStats = (hero && hero.stats) || {};
    const baseMod = Math.floor(((heroStats[ability.toLowerCase()] || 10) - 10) / 2);
    let pb = 2;
    if (hero && hero.level) pb = Math.ceil(1 + hero.level / 4);
    let profBonus = 0;
    if (isSave && hero && hero.classRole) {
      const role = hero.classRole.toLowerCase();
      if ((role.includes('barbarian') && (ability === 'STR' || ability === 'CON')) ||
          (role.includes('cleric') && (ability === 'WIS' || ability === 'CHA')) ||
          (role.includes('rogue') && (ability === 'DEX' || ability === 'INT')) ||
          (role.includes('wizard') && (ability === 'INT' || ability === 'WIS'))) {
        profBonus = pb;
      }
    }
    const totalMod = baseMod + profBonus;

    const d1 = Math.floor(Math.random() * 20) + 1;
    const d2 = Math.floor(Math.random() * 20) + 1;
    let d20 = d1;
    let formula = `1d20 (${d1})`;
    if (advMode === 'adv') {
      d20 = Math.max(d1, d2);
      formula = `1d20 [ADV: ${d1}, ${d2} -> ${d20}]`;
    } else if (advMode === 'dis') {
      d20 = Math.min(d1, d2);
      formula = `1d20 [DIS: ${d1}, ${d2} -> ${d20}]`;
    }

    const total = d20 + totalMod;
    formula += totalMod >= 0 ? ` + ${totalMod}` : ` - ${Math.abs(totalMod)}`;
    const isCrit = d20 === 20;

    soundEngine.playDiceRoll(isCrit);

    const isSuccess = dc !== null ? total >= dc : null;
    let rollerName = hero ? hero.name : 'Adventurer';
    if (hero && hero.playerName) rollerName += ` (${hero.playerName})`;

    const rollEntry = {
      rollerName,
      rollerAvatar: hero ? (hero.avatar || 'PC') : '🎲',
      rollType: isSave ? 'save' : 'check',
      label: `${ability} ${isSave ? 'Saving Throw' : 'Check'}`,
      formula,
      d20Result: d20,
      total,
      dc,
      success: isSuccess,
      advantageMode: advMode,
      note: reason
    };

    worldState.resolveRollRequest(req.id, rollEntry);
    appendRollToCombatLog(rollEntry);
    notifyToast(`${rollerName} rolled ${total}${dc ? (isSuccess ? ' (SUCCESS)' : ' (FAILED)') : ''}`);
    renderCombatPendingBanner();
  }

  // ==========================================
  // INITIATIVE & TURN SEQUENCING ENGINE
  // ==========================================
  function rollInitiative() {
    const alive = cState.entities.filter(e => e.hp > 0);
    if (alive.length === 0) return;

    logMsg('⚔️ --- INITIATIVE ROLLS ---', 'var(--text-gold)');
    const rolls = alive.map(ent => {
      const d20 = rollD20();
      const bonus = ent.init !== undefined ? ent.init : (statMod(ent.stats?.dex) || 0);
      const total = d20 + bonus;
      const entry = {
        rollerName: rollerLabel(ent),
        rollerAvatar: ent.avatar || '🎲',
        rollType: 'initiative',
        label: 'Initiative',
        formula: `1d20 (${d20}) ${bonus >= 0 ? '+' : '-'} ${Math.abs(bonus)}`,
        d20Result: d20,
        total,
        dc: null,
        success: null,
        advantageMode: 'normal',
        note: `Combat Turn Order`
      };
      worldState.logDiceRoll(entry);
      appendRollToCombatLog(entry);
      return { ent, total, tieBreaker: bonus };
    });

    // Sort descending by initiative, then by dex bonus
    rolls.sort((a, b) => b.total - a.total || b.tieBreaker - a.tieBreaker);

    cState.combat.active = true;
    cState.combat.round = 1;
    cState.combat.turnIndex = 0;
    cState.combat.order = rolls.map(r => r.ent.id);

    // Announce order in combat log
    const orderStr = rolls.map((r, i) => `${i + 1}. ${r.ent.name} (${r.total})`).join(' → ');
    logMsg(`Turn Order: ${orderStr}`, '#38bdf8');

    updatePhaseHeader();
    startTurn(cState.combat.order[0]);
  }

  function startTurn(entityId) {
    const ent = cState.entities.find(e => e.id === entityId);
    if (!ent || ent.hp <= 0) {
      advanceTurn();
      return;
    }

    // Reset turn economy
    ent.movementLeft = ent.speed;
    ent.actionUsed = false;
    ent.bonusUsed = false;

    // Auto-select acting entity for player clarity
    cState.selectedEntity = ent;
    cState.selectedAction = null;

    logMsg(`▶ Round ${cState.combat.round}: ${ent.name}'s turn begins.`, sideOf(ent) === 'foe' ? '#f87171' : '#60a5fa');
    notifyToast(`${ent.name}'s turn!`);

    renderTurnUi();
    renderInitiativeList();
    updateActionUi();

    // Check for AI-driven turn (Enemies & Allied NPCs)
    if (ent.team !== 'player' && cState.autoNpc) {
      runNpcTurn(ent);
    }
  }

  function advanceTurn() {
    const c = cState.combat;
    if (!c.active) return;

    if (checkCombatEnd()) return;

    // Find next alive entity in initiative order
    let nextIdx = c.turnIndex + 1;
    let wrapped = false;
    if (nextIdx >= c.order.length) {
      nextIdx = 0;
      wrapped = true;
      c.round++;
      logMsg(`--- Round ${c.round} Begins ---`, 'var(--text-gold)');
    }

    // Scan for next entity with HP > 0
    let loops = 0;
    while (loops < c.order.length) {
      const candidateId = c.order[nextIdx];
      const candidate = cState.entities.find(e => e.id === candidateId);
      if (candidate && candidate.hp > 0) {
        c.turnIndex = nextIdx;
        updatePhaseHeader();
        startTurn(candidateId);
        return;
      }
      nextIdx++;
      if (nextIdx >= c.order.length) {
        nextIdx = 0;
        c.round++;
        logMsg(`--- Round ${c.round} Begins ---`, 'var(--text-gold)');
      }
      loops++;
    }

    // If loop finishes, everyone is dead
    endCombat();
  }

  function endCombat() {
    cState.combat.active = false;
    cState.combat.round = 0;
    cState.combat.turnIndex = 0;
    cState.combat.order = [];
    cState.combat.aiRunning = false;
    cState.selectedAction = null;

    cState.entities.forEach(e => {
      e.movementLeft = e.speed;
      e.actionUsed = false;
      e.bonusUsed = false;
    });

    logMsg('🏁 --- COMBAT ENDED ---', 'var(--text-gold)');
    notifyToast('Combat has ended.');

    updatePhaseHeader();
    renderTurnUi();
    renderInitiativeList();
    updateActionUi();
  }

  function checkCombatEnd() {
    if (!cState.combat.active) return false;
    const aliveParty = cState.entities.filter(e => (e.team === 'player' || e.team === 'ally') && e.hp > 0);
    const aliveFoes = cState.entities.filter(e => e.team === 'enemy' && e.hp > 0);

    if (aliveFoes.length === 0) {
      logMsg('🏆 Victory! All hostile threats have been eliminated.', '#4ade80');
      notifyToast('Encounter Cleared!');
      endCombat();
      return true;
    }
    if (aliveParty.length === 0) {
      logMsg('💀 Defeat! The entire party has fallen unconscious.', '#ef4444');
      notifyToast('All party members defeated.');
      endCombat();
      return true;
    }
    return false;
  }

  function updatePhaseHeader() {
    const indicator = container.querySelector('#combat-phase-indicator');
    const roundBox = container.querySelector('#combat-round-counter');
    const startBtn = container.querySelector('#combat-start-btn');
    const endBtn = container.querySelector('#combat-end-btn');
    const autoLabel = container.querySelector('#combat-auto-npc-label');

    if (cState.combat.active) {
      if (indicator) {
        indicator.textContent = `ROUND ${cState.combat.round}`;
        indicator.style.background = '#7f1d1d';
        indicator.style.color = '#fca5a5';
        indicator.style.borderColor = '#ef4444';
      }
      if (roundBox) roundBox.textContent = `${cState.combat.round}`;
      if (startBtn) startBtn.style.display = 'none';
      if (endBtn) endBtn.style.display = 'inline-block';
      if (autoLabel) autoLabel.style.display = 'flex';
    } else {
      if (indicator) {
        indicator.textContent = 'OUT OF COMBAT';
        indicator.style.background = '#1e293b';
        indicator.style.color = '#94a3b8';
        indicator.style.borderColor = '#475569';
      }
      if (roundBox) roundBox.textContent = '—';
      if (startBtn) startBtn.style.display = 'inline-block';
      if (endBtn) endBtn.style.display = 'none';
      if (autoLabel) autoLabel.style.display = 'none';
    }
  }

  // ==========================================
  // AUTONOMOUS NPC & MONSTER AI TURN
  // Enemies target players/allies; Allied NPCs target enemies.
  // ==========================================
  async function runNpcTurn(npc) {
    if (cState.combat.aiRunning) return;
    cState.combat.aiRunning = true;
    renderTurnUi();

    try {
      await new Promise(r => setTimeout(r, 700));
      if (!cState.combat.active || npc.hp <= 0) return;

      const oppTeam = isHostile(npc, { team: 'player' }) ? ['player', 'ally'] : ['enemy'];
      const targets = cState.entities.filter(e => oppTeam.includes(e.team) && e.hp > 0);
      if (targets.length === 0) return;

      // Find nearest hostile target
      targets.sort((a, b) => dist(npc, a) - dist(npc, b));
      let primaryTarget = targets[0];
      const startPos = { x: npc.x, y: npc.y };
      const logMovement = () => {
        const moved = dist(startPos, npc);
        if (moved > 0) {
          logMsg(`${npc.name} moves ${moved * 5}ft toward ${primaryTarget.name}.`, 'var(--text-primary)');
          startPos.x = npc.x;
          startPos.y = npc.y;
        }
      };

      // 1. Check if NPC has an available AoE ability that catches multiple targets
      const usable = usableAbilities(npc);
      const aoeId = usable.find(id => ABILITIES[id]?.kind === 'aoe');
      if (aoeId && !npc.actionUsed) {
        const ab = ABILITIES[aoeId];
        const center = ab.centerSelf ? { x: npc.x, y: npc.y } : { x: primaryTarget.x, y: primaryTarget.y };
        if (dist(npc, center) <= (ab.range || 30)) {
          executeAbility(npc, aoeId, null, center);
          markActionSpent(npc, ab);
          await new Promise(r => setTimeout(r, 800));
        }
      }

      // 2. Movement Step: Step closer toward target if not in reach
      if (!npc.actionUsed) {
        const preferredReach = usable.some(id => (ABILITIES[id]?.kind === 'attack' || ABILITIES[id]?.kind === 'save' || ABILITIES[id]?.kind === 'auto') && ABILITIES[id].range > 2) ? 4 : 1;
        while (dist(npc, primaryTarget) > preferredReach && npc.movementLeft > 0) {
          const stepX = Math.sign(primaryTarget.x - npc.x);
          const stepY = Math.sign(primaryTarget.y - npc.y);
          const nextX = npc.x + stepX;
          const nextY = npc.y + stepY;
          const blocked = cState.entities.find(e => e.x === nextX && e.y === nextY && e.hp > 0);
          if (blocked) break;
          npc.x = nextX;
          npc.y = nextY;
          npc.movementLeft--;
        }
        logMovement();
      }

      // 3. Action Step: Spell, ranged ability, or weapon melee
      if (!npc.actionUsed) {
        const targetDist = dist(npc, primaryTarget);
        // Look for targeted spell / ability first (save, spell attack, auto-hit)
        const attackAbilityId = usable.find(id => {
          const ab = ABILITIES[id];
          return (ab?.kind === 'attack' || ab?.kind === 'save' || ab?.kind === 'auto') && targetDist <= (ab.range || 20);
        });

        if (attackAbilityId) {
          const ab = ABILITIES[attackAbilityId];
          executeAbility(npc, attackAbilityId, primaryTarget, { x: primaryTarget.x, y: primaryTarget.y });
          markActionSpent(npc, ab);
        } else if (targetDist <= (npc.reach || 1)) {
          performWeaponAttack(npc, primaryTarget, 'NORMAL');
          npc.actionUsed = true;
        } else {
          // Still out of reach: Dash action to close the distance
          npc.movementLeft += npc.speed;
          while (dist(npc, primaryTarget) > 1 && npc.movementLeft > 0) {
            const stepX = Math.sign(primaryTarget.x - npc.x);
            const stepY = Math.sign(primaryTarget.y - npc.y);
            const nextX = npc.x + stepX;
            const nextY = npc.y + stepY;
            if (cState.entities.find(e => e.x === nextX && e.y === nextY && e.hp > 0)) break;
            npc.x = nextX;
            npc.y = nextY;
            npc.movementLeft--;
          }
          logMsg(`${npc.name} takes the Dash action.`, 'var(--text-muted)');
          logMovement();
          npc.actionUsed = true;
        }
        await new Promise(r => setTimeout(r, 800));
      }
    } finally {
      cState.combat.aiRunning = false;
      if (cState.combat.active) logMsg(`${npc.name} ends their turn.`, 'var(--text-muted)');
      renderTurnUi();
      advanceTurn();
    }
  }

  // ==========================================
  // RENDER INITIATIVE & TURN CONTROLS
  // ==========================================
  function handleDmResolveCurrent() {
    const cur = cState.combat.order.length > 0 ? cState.entities.find(e => e.id === cState.combat.order[cState.combat.turnIndex]) : null;
    if (!cur) return;
    const isPlayer = cur.team === 'player';
    logMsg(`⚙ DM resolves ${cur.name}'s turn${isPlayer ? ` on behalf of ${cur.playerName || 'the player'}` : ''}.`, '#fbbf24');
    runNpcTurn(cur);
  }

  function renderTurnUi() {
    const turnBox = container.querySelector('#combat-turn-box');
    if (!turnBox) return;

    if (!cState.combat.active) {
      turnBox.innerHTML = `
        <div style="font-size: 0.72rem; color: var(--text-muted); text-align: center; padding: 0.25rem 0;">
          Combat not started. Click <strong>Roll Initiative</strong> to enter turn order.
        </div>
      `;
      return;
    }

    const cur = currentTurnEntity();
    if (!cur) {
      turnBox.innerHTML = '';
      return;
    }

    const isDm = Boolean(worldState.prefs && worldState.prefs.dmMode);
    const canControl = isDm || worldState.canControlCharacter(cur.id, cur);
    const isPlayer = cur.team === 'player';
    const isAiBusy = cState.combat.aiRunning;

    turnBox.innerHTML = `
      <div style="background: var(--bg-secondary); border: 1px solid var(--border-gold); border-radius: var(--radius-sm); padding: 0.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
          <div style="display: flex; align-items: center; gap: 0.35rem;">
            <span style="font-size: 0.75rem; font-weight: bold; color: var(--text-gold);">ACTIVE TURN:</span>
            <strong style="font-size: 0.85rem; color: #fff;">${cur.name}</strong>
          </div>
          <span class="badge" style="background: ${cur.team === 'player' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(239, 68, 68, 0.2)'}; color: ${cur.team === 'player' ? '#93c5fd' : '#fca5a5'}; font-size: 0.65rem;">
            ${cur.team === 'player' ? 'Player Turn' : 'NPC / Enemy'}
          </span>
        </div>

        <!-- Economy Counters -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.25rem; font-size: 0.7rem; text-align: center; margin-bottom: 0.45rem;">
          <div style="background: var(--bg-tertiary); padding: 3px; border-radius: 3px;">
            <div style="color: var(--text-muted); font-size: 0.62rem;">ACTION</div>
            <strong style="color: ${cur.actionUsed ? '#f87171' : '#4ade80'};">${cur.actionUsed ? 'SPENT' : 'READY'}</strong>
          </div>
          <div style="background: var(--bg-tertiary); padding: 3px; border-radius: 3px;">
            <div style="color: var(--text-muted); font-size: 0.62rem;">BONUS</div>
            <strong style="color: ${cur.bonusUsed ? '#f87171' : '#4ade80'};">${cur.bonusUsed ? 'SPENT' : 'READY'}</strong>
          </div>
          <div style="background: var(--bg-tertiary); padding: 3px; border-radius: 3px;">
            <div style="color: var(--text-muted); font-size: 0.62rem;">MOVE</div>
            <strong style="color: #60a5fa;">${cur.movementLeft * 5}ft</strong>
          </div>
        </div>

        <!-- Turn Controls: each unit resolves its own turn; DM can resolve on behalf of absent players -->
        <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
          ${canControl ? `
            <button id="combat-end-turn-btn" class="btn btn-sm btn-primary" ${isAiBusy ? 'disabled' : ''} style="flex: 1; font-size: 0.75rem; padding: 4px;">
              ${isAiBusy ? 'Resolving turn...' : 'End Turn ➔'}
            </button>
          ` : `
            <div style="flex: 1; font-size: 0.7rem; color: var(--text-muted); font-style: italic; text-align: center; padding: 3px 0;">
              Waiting for ${cur.playerName || cur.name} to take their turn...
            </div>
          `}
        </div>
        ${isDm && !isAiBusy ? `
          <div style="display: flex; gap: 0.35rem; margin-top: 0.3rem;">
            <button id="combat-dm-resolve-btn" class="btn btn-sm" title="${isPlayer ? 'Player is away or unable: the DM auto-resolves this character\'s turn' : 'Run this NPC\'s turn automatically'}" style="flex: 1; font-size: 0.7rem; padding: 3px 6px; color: #fbbf24; border-color: rgba(251, 191, 36, 0.5);">
              ${isPlayer ? `⚙ Resolve for ${cur.playerName || 'player'} (DM)` : '⚙ Auto-resolve turn (DM)'}
            </button>
            <button id="combat-force-next-btn" class="btn btn-sm" title="Skip this unit's turn" style="font-size: 0.7rem; padding: 3px 8px; color: #fca5a5;">
              Skip
            </button>
          </div>
        ` : ''}
      </div>
    `;

    const endTurnBtn = turnBox.querySelector('#combat-end-turn-btn');
    if (endTurnBtn) {
      endTurnBtn.addEventListener('click', () => {
        logMsg(`${cur.name} ends their turn.`, 'var(--text-muted)');
        advanceTurn();
      });
    }

    const dmResolveBtn = turnBox.querySelector('#combat-dm-resolve-btn');
    if (dmResolveBtn) {
      dmResolveBtn.addEventListener('click', () => {
        handleDmResolveCurrent();
      });
    }

    const forceNextBtn = turnBox.querySelector('#combat-force-next-btn');
    if (forceNextBtn) {
      forceNextBtn.addEventListener('click', () => {
        logMsg(`⏭ DM skips ${cur.name}'s turn.`, 'var(--text-muted)');
        advanceTurn();
      });
    }
  }

  function renderInitiativeList() {
    const list = container.querySelector('#combat-initiative-list');
    if (!list) return;

    if (!cState.combat.active || cState.combat.order.length === 0) {
      list.innerHTML = '<div style="font-size: 0.72rem; color: var(--text-muted); font-style: italic; text-align: center; margin-top: 0.5rem;">Roll initiative to generate turn order.</div>';
      return;
    }

    list.innerHTML = cState.combat.order.map((id, index) => {
      const ent = cState.entities.find(e => e.id === id);
      if (!ent) return '';
      const isCurrent = index === cState.combat.turnIndex;
      const isDead = ent.hp <= 0;
      const isPlayer = ent.team === 'player';
      const isAlly = ent.team === 'ally';
      const borderCol = isCurrent ? '#fbbf24' : (isPlayer ? '#3b82f6' : (isAlly ? '#14b8a6' : '#ef4444'));

      return `
        <div class="initiative-entry" data-id="${ent.id}" style="display: flex; align-items: center; justify-content: space-between; background: ${isCurrent ? 'rgba(245, 158, 11, 0.15)' : 'var(--bg-tertiary)'}; border-left: 3px solid ${borderCol}; padding: 0.25rem 0.45rem; border-radius: var(--radius-sm); font-size: 0.72rem; opacity: ${isDead ? '0.45' : '1'}; cursor: pointer;">
          <div style="display: flex; align-items: center; gap: 0.35rem;">
            <span style="font-weight: bold; color: ${isCurrent ? '#fbbf24' : 'var(--text-muted)'}; min-width: 14px;">${index + 1}.</span>
            <span style="font-weight: bold; color: ${isCurrent ? '#fff' : 'var(--text-primary)'};">${ent.name}</span>
            ${isCurrent ? '<span style="color: #fbbf24; font-size: 0.65rem;">▶ CURRENT</span>' : ''}
          </div>
          <div style="display: flex; align-items: center; gap: 0.35rem;">
            <span style="font-size: 0.68rem; color: ${isDead ? '#ef4444' : '#4ade80'};">${isDead ? 'DOWN' : `${ent.hp}/${ent.maxHp}`}</span>
          </div>
        </div>
      `;
    }).join('');

    list.querySelectorAll('.initiative-entry').forEach(el => {
      el.addEventListener('click', () => {
        const ent = cState.entities.find(e => e.id === el.dataset.id);
        if (ent) {
          cState.selectedEntity = ent;
          updateActionUi();
        }
      });
    });
  }
  // UI Event Bindings
  const startBtn = container.querySelector('#combat-start-btn');
  if (startBtn) startBtn.addEventListener('click', rollInitiative);

  const endBtn = container.querySelector('#combat-end-btn');
  if (endBtn) endBtn.addEventListener('click', endCombat);

  const autoNpcChk = container.querySelector('#combat-auto-npc-chk');
  if (autoNpcChk) {
    autoNpcChk.addEventListener('change', (e) => {
      cState.autoNpc = Boolean(e.target.checked);
      notifyToast(cState.autoNpc ? 'Auto NPC turns enabled' : 'Auto NPC turns paused');
    });
  }

  const spellSelectElem = container.querySelector('#combat-spell-select');
  if (spellSelectElem) {
    spellSelectElem.addEventListener('change', (e) => {
      cState.selectedSpellId = e.target.value;
      cState.selectedAction = 'CAST';
      updateActionUi();
      const selAb = ABILITIES[cState.selectedSpellId];
      if (selAb?.kind === 'aoe') {
        notifyToast(`💥 Target square for ${selAb.name} (${selAb.radius * 5}ft radius, ${selAb.range * 5}ft range). Hover over the map to preview radius, click any square to cast!`);
      } else if (selAb?.kind === 'teleport') {
        notifyToast(`✨ Click any square within ${selAb.range * 5}ft to teleport!`);
      } else {
        notifyToast(`🎯 Select target creature for ${selAb ? selAb.name : 'spell'}...`);
      }
    });
  }

  // Action Buttons
  container.querySelectorAll('.combat-act-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const act = e.currentTarget.dataset.action;
      cState.selectedAction = act;
      container.querySelectorAll('.combat-act-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');

      if (act === 'CAST') {
        if (!cState.selectedSpellId) {
          cState.selectedSpellId = 'fireball';
        }
        if (cState.selectedEntity) {
          populateAbilitySelect(cState.selectedEntity);
        }
        updateActionUi();
        const selAb = ABILITIES[cState.selectedSpellId];
        if (selAb?.kind === 'aoe') {
          notifyToast(`💥 Target square for ${selAb.name} (${selAb.radius * 5}ft radius). Hover over the map to preview radius, click square to cast!`);
        } else if (selAb?.kind === 'teleport') {
          notifyToast(`✨ Select square to teleport (${selAb.range * 5}ft range)`);
        } else {
          notifyToast(`🎯 Select target creature for ${selAb ? selAb.name : 'spell'}...`);
        }
      } else {
        updateActionUi();
        if (act === 'PING') notifyToast('Click any square on the map to ping!');
        else notifyToast(`Select target for ${act.toLowerCase()}...`);
      }
    });
  });

  // Quick Ping Button
  container.querySelector('#combat-quick-ping-btn').addEventListener('click', () => {
    cState.selectedAction = 'PING';
    notifyToast('Click any square on the battlemat to ping!');
  });

  // Advantage Pills
  container.querySelectorAll('.combat-adv-pill').forEach(btn => {
    btn.addEventListener('click', (e) => {
      cState.advantageMode = e.currentTarget.dataset.mode;
      container.querySelectorAll('.combat-adv-pill').forEach(b => b.className = 'combat-adv-pill');
      if (cState.advantageMode === 'ADVANTAGE') e.currentTarget.classList.add('active-adv');
      else if (cState.advantageMode === 'DISADVANTAGE') e.currentTarget.classList.add('active-dis');
      else e.currentTarget.classList.add('active-norm');
    });
  });

  // Perspective Switcher
  container.querySelector('#combat-perspective-select').addEventListener('change', (e) => {
    cState.currentPerspective = e.target.value;
    if (cState.currentPerspective === 'DM') {
      cState.selectedEntity = null;
      notifyToast('Perspective: DM (All-Seeing)');
    } else {
      const p = cState.entities.find(ent => ent.id === cState.currentPerspective);
      if (p) {
        cState.selectedEntity = p;
        notifyToast(`Perspective: ${p.name}`);
      }
    }
    updateActionUi();
  });

  // DM Ping Radio Buttons
  const pAll = container.querySelector('#combat-ping-vis-all');
  const pCustom = container.querySelector('#combat-ping-vis-custom');
  const customBox = container.querySelector('#combat-ping-custom-container');
  if (pAll && pCustom) {
    pAll.addEventListener('change', () => {
      cState.dmPingVis = 'ALL';
      customBox.style.display = 'none';
      notifyToast('DM Pings visible to ALL.');
    });
    pCustom.addEventListener('change', () => {
      cState.dmPingVis = 'CUSTOM';
      customBox.style.display = 'block';
      notifyToast('DM Pings visible to selected only.');
    });
  }

  // Ping Recipient Checkboxes
  container.querySelectorAll('.combat-ping-chk').forEach(chk => {
    chk.addEventListener('change', () => {
      cState.dmPingRecipients = Array.from(container.querySelectorAll('.combat-ping-chk:checked')).map(c => c.value);
    });
  });
  cState.dmPingRecipients = Array.from(container.querySelectorAll('.combat-ping-chk:checked')).map(c => c.value);

  // Ping Color Presets
  container.querySelectorAll('.combat-ping-color-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      cState.dmPingColor = e.currentTarget.dataset.color;
      container.querySelectorAll('.combat-ping-color-btn').forEach(b => b.style.borderColor = 'transparent');
      e.currentTarget.style.borderColor = '#fff';
    });
  });

  // Grid Slider
  container.querySelector('#combat-grid-slider').addEventListener('input', (e) => {
    cState.gridSize = parseInt(e.target.value);
    container.querySelector('#combat-grid-label').textContent = `${cState.gridSize}x${cState.gridSize}`;
    resizeCanvas();
  });

  // Drop Unit Button
  container.querySelector('#combat-drop-unit-btn').addEventListener('click', () => {
    const val = container.querySelector('#combat-spawn-select').value;
    const teamChoice = (container.querySelector('#combat-spawn-team')?.value) || 'enemy';
    const cx = Math.floor(cState.gridSize / 2);
    const cy = Math.floor(cState.gridSize / 2);

    if (val.startsWith('party_')) {
      const pid = val.replace('party_', '');
      const pData = partyData.find(p => p.id === pid);
      if (pData) {
        cState.entities.push(buildPartyEntity(pData, cx, cy, '#3b82f6'));
        notifyToast(`${pData.name} placed on map!`);
        renderInitiativeList();
      }
    } else if (val.startsWith('champ_')) {
      const cid = val.replace('champ_', '');
      const cData = champions.find(c => c.id === cid);
      const champName = cData ? cData.name : 'Champion NPC';
      cState.entities.push(buildMonsterEntity(champName, cx, cy, teamChoice, {
        ac: 16,
        hp: 45,
        maxHp: 45,
        speed: 6,
        attackMod: 6,
        dmgFormula: '1d8+3',
        abilities: ['firebolt', 'thunderwave']
      }));
      notifyToast(`${champName} spawned on map!`);
      renderInitiativeList();
    } else {
      cState.entities.push(buildMonsterEntity(val, cx, cy, teamChoice));
      notifyToast(`${val} spawned on map (${teamChoice})!`);
      renderInitiativeList();
    }
  });

  // Paint Spawn Button
  const paintBtn = container.querySelector('#combat-paint-btn');
  paintBtn.addEventListener('click', () => {
    cState.isPaintActive = !cState.isPaintActive;
    paintBtn.textContent = cState.isPaintActive ? 'Paint: ON' : 'Paint: OFF';
    paintBtn.style.color = cState.isPaintActive ? '#ec4899' : 'inherit';
    notifyToast(cState.isPaintActive ? 'Paint Mode ON: Click and drag on map.' : 'Paint Mode OFF.');
  });

  // Wire DM Unit Saving Throw Buttons
  container.querySelectorAll('.combat-stat-save-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const actor = cState.selectedEntity;
      if (!actor) return;
      const stat = btn.getAttribute('data-stat');
      const dcInp = container.querySelector('#combat-unit-save-dc');
      rollUnitSavingThrow(actor, stat, dcInp ? dcInp.value : 15);
    });
  });

  // Wire DM Push Request Button
  const pushSubmitBtn = container.querySelector('#combat-push-save-submit-btn');
  if (pushSubmitBtn) {
    pushSubmitBtn.addEventListener('click', () => {
      const actor = cState.selectedEntity;
      if (!actor) return;
      const typeSelect = container.querySelector('#combat-push-save-type');
      const dcInp = container.querySelector('#combat-push-save-dc');
      const reasonInp = container.querySelector('#combat-push-save-reason');
      pushRequestToSelectedPlayer(actor, typeSelect.value, dcInp ? dcInp.value : 15, reasonInp ? reasonInp.value : '');
    });
  }

  // Wire Clear Log Button
  const clearLogBtn = container.querySelector('#combat-clear-log-btn');
  if (clearLogBtn) {
    clearLogBtn.addEventListener('click', () => {
      const stream = container.querySelector('#combat-log-stream');
      if (stream) stream.innerHTML = '<div style="color: var(--text-muted); font-style: italic;">Log cleared.</div>';
    });
  }

  // Populate recent dice rolls into combat log stream
  const initialRolls = typeof worldState.getDiceRollLogs === 'function' ? worldState.getDiceRollLogs(6) : [];
  if (initialRolls.length > 0) {
    initialRolls.slice().reverse().forEach(r => appendRollToCombatLog(r));
  }
  renderCombatPendingBanner();
  renderTurnUi();
  renderInitiativeList();
  updatePhaseHeader();

  // Listen to worldState state changes for real-time rolls and requests
  worldState.subscribe(() => {
    renderCombatPendingBanner();
    updateActionUi();
    renderTurnUi();
  });

  // Render Loop
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const ts = cState.tileSize;

    // Grid lines
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.15)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= cState.gridSize; x++) {
      ctx.beginPath();
      ctx.moveTo(x * ts, 0);
      ctx.lineTo(x * ts, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= cState.gridSize; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * ts);
      ctx.lineTo(canvas.width, y * ts);
      ctx.stroke();
    }

    // Move range highlight
    if (cState.selectedEntity && cState.selectedAction === 'MOVE') {
      ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
      for (let x = 0; x < cState.gridSize; x++) {
        for (let y = 0; y < cState.gridSize; y++) {
          const d = Math.max(Math.abs(cState.selectedEntity.x - x), Math.abs(cState.selectedEntity.y - y));
          if (d <= cState.selectedEntity.movementLeft && !cState.entities.find(e => e.x === x && e.y === y && e.hp > 0)) {
            ctx.fillRect(x * ts, y * ts, ts, ts);
          }
        }
      }
    }

    // Spell / Ability Targeting & AoE Radius Preview
    if (cState.selectedEntity && cState.selectedAction === 'CAST' && cState.selectedSpellId) {
      const actor = cState.selectedEntity;
      const ab = ABILITIES[cState.selectedSpellId];
      if (ab) {
        const inCastingRange = (tx, ty) => Math.max(Math.abs(actor.x - tx), Math.abs(actor.y - ty)) <= (ab.range || 30);

        // 1. Highlight casting range on the grid
        if (ab.range && !ab.centerSelf) {
          ctx.fillStyle = 'rgba(168, 85, 247, 0.08)';
          ctx.strokeStyle = 'rgba(168, 85, 247, 0.22)';
          ctx.lineWidth = 1;
          for (let x = 0; x < cState.gridSize; x++) {
            for (let y = 0; y < cState.gridSize; y++) {
              if (inCastingRange(x, y)) {
                ctx.fillRect(x * ts, y * ts, ts, ts);
                ctx.strokeRect(x * ts + 0.5, y * ts + 0.5, ts - 1, ts - 1);
              }
            }
          }
        }

        // 2. AoE Radius Preview (follows hovered tile dynamically from point of origin, or centers around actor if self-centered)
        if (ab.kind === 'aoe') {
          const center = ab.centerSelf
            ? { x: actor.x, y: actor.y }
            : (cState.hoveredTile || null);

          if (center) {
            const inRange = ab.centerSelf || inCastingRange(center.x, center.y);
            const isFire = ab.type === 'fire';
            const isCold = ab.type === 'cold';

            const tileFillCol = inRange
              ? (isFire ? 'rgba(249, 115, 22, 0.38)' : (isCold ? 'rgba(56, 189, 248, 0.35)' : 'rgba(168, 85, 247, 0.35)'))
              : 'rgba(239, 68, 68, 0.22)';
            const tileBorderCol = inRange
              ? (isFire ? 'rgba(249, 115, 22, 0.8)' : (isCold ? 'rgba(56, 189, 248, 0.8)' : 'rgba(192, 132, 252, 0.8)'))
              : 'rgba(239, 68, 68, 0.55)';
            const perimeterCol = inRange
              ? (isFire ? '#f97316' : (isCold ? '#38bdf8' : '#c084fc'))
              : '#ef4444';

            // Find all living creatures within the blast zone
            const victimsInBlast = cState.entities.filter(e => e.hp > 0 && dist(e, center) <= ab.radius && !(ab.centerSelf && e.id === actor.id));

            // Highlight every individual square inside the radius
            for (let x = 0; x < cState.gridSize; x++) {
              for (let y = 0; y < cState.gridSize; y++) {
                if (Math.max(Math.abs(center.x - x), Math.abs(center.y - y)) <= ab.radius) {
                  if (!(ab.centerSelf && x === actor.x && y === actor.y)) {
                    ctx.fillStyle = tileFillCol;
                    ctx.fillRect(x * ts, y * ts, ts, ts);
                    ctx.strokeStyle = tileBorderCol;
                    ctx.lineWidth = 1.5;
                    ctx.strokeRect(x * ts + 1, y * ts + 1, ts - 2, ts - 2);
                  }
                }
              }
            }

            // Outline perimeter of AoE with dash
            const minX = Math.max(0, center.x - ab.radius);
            const maxX = Math.min(cState.gridSize - 1, center.x + ab.radius);
            const minY = Math.max(0, center.y - ab.radius);
            const maxY = Math.min(cState.gridSize - 1, center.y + ab.radius);
            ctx.save();
            ctx.strokeStyle = perimeterCol;
            ctx.lineWidth = 2.5;
            ctx.setLineDash([6, 3]);
            ctx.strokeRect(minX * ts, minY * ts, (maxX - minX + 1) * ts, (maxY - minY + 1) * ts);
            ctx.restore();

            // Highlight creatures inside the blast zone with warning rings
            victimsInBlast.forEach(v => {
              ctx.save();
              ctx.beginPath();
              ctx.arc(v.x * ts + ts / 2, v.y * ts + ts / 2, ts * 0.46, 0, Math.PI * 2);
              ctx.strokeStyle = '#ef4444';
              ctx.lineWidth = 3;
              ctx.stroke();
              ctx.restore();
            });

            // Point of origin crosshair reticle on the center square
            ctx.save();
            ctx.strokeStyle = inRange ? '#fbbf24' : '#ef4444';
            ctx.lineWidth = 2.5;
            ctx.strokeRect(center.x * ts + 2, center.y * ts + 2, ts - 4, ts - 4);
            // Crosshairs
            ctx.beginPath();
            ctx.moveTo(center.x * ts + ts / 2, center.y * ts);
            ctx.lineTo(center.x * ts + ts / 2, (center.y + 1) * ts);
            ctx.moveTo(center.x * ts, center.y * ts + ts / 2);
            ctx.lineTo((center.x + 1) * ts, center.y * ts + ts / 2);
            ctx.stroke();
            // Center bullseye
            ctx.beginPath();
            ctx.arc(center.x * ts + ts / 2, center.y * ts + ts / 2, 4, 0, Math.PI * 2);
            ctx.fillStyle = inRange ? '#fbbf24' : '#ef4444';
            ctx.fill();
            ctx.restore();

            // Floating tactical pill badge above the blast
            ctx.save();
            const radiusFt = ab.radius * 5;
            const badgeText = inRange
              ? `💥 ${ab.name} [${radiusFt}ft Radius • ${victimsInBlast.length} in blast] — Click square to cast`
              : `⛔ ${ab.name} [${radiusFt}ft Radius] — OUT OF RANGE (Max ${ab.range * 5}ft)`;
            ctx.font = 'bold 11px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const textMetrics = ctx.measureText(badgeText);
            const badgeW = textMetrics.width + 18;
            const badgeH = 22;
            const badgeX = Math.max(badgeW / 2 + 4, Math.min(canvas.width - badgeW / 2 - 4, center.x * ts + ts / 2));
            const badgeY = Math.max(badgeH / 2 + 4, minY * ts - 14);

            ctx.fillStyle = inRange ? 'rgba(15, 23, 42, 0.94)' : 'rgba(127, 29, 29, 0.96)';
            ctx.strokeStyle = inRange ? '#f97316' : '#ef4444';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            if (typeof ctx.roundRect === 'function') {
              ctx.roundRect(badgeX - badgeW / 2, badgeY - badgeH / 2, badgeW, badgeH, 4);
            } else {
              ctx.rect(badgeX - badgeW / 2, badgeY - badgeH / 2, badgeW, badgeH);
            }
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = inRange ? '#fff' : '#fca5a5';
            ctx.fillText(badgeText, badgeX, badgeY);
            ctx.restore();
          }
        } else if (ab.kind === 'teleport' && cState.hoveredTile) {
          // Teleport destination tile preview
          const inRange = Math.max(Math.abs(actor.x - cState.hoveredTile.x), Math.abs(actor.y - cState.hoveredTile.y)) <= ab.range;
          ctx.fillStyle = inRange ? 'rgba(192, 132, 252, 0.35)' : 'rgba(239, 68, 68, 0.25)';
          ctx.fillRect(cState.hoveredTile.x * ts, cState.hoveredTile.y * ts, ts, ts);
          ctx.strokeStyle = inRange ? '#c084fc' : '#ef4444';
          ctx.lineWidth = 2;
          ctx.strokeRect(cState.hoveredTile.x * ts + 1, cState.hoveredTile.y * ts + 1, ts - 2, ts - 2);
        } else if (cState.hoveredTile) {
          // Single target reticle
          const inRange = Math.max(Math.abs(actor.x - cState.hoveredTile.x), Math.abs(actor.y - cState.hoveredTile.y)) <= ab.range;
          ctx.strokeStyle = inRange ? '#fbbf24' : '#ef4444';
          ctx.lineWidth = 2;
          ctx.strokeRect(cState.hoveredTile.x * ts + 2, cState.hoveredTile.y * ts + 2, ts - 4, ts - 4);
        }
      }
    }

    // Selection border
    if (cState.selectedEntity) {
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.strokeRect(cState.selectedEntity.x * ts + 1, cState.selectedEntity.y * ts + 1, ts - 2, ts - 2);
    }

    // Entities
    cState.entities.forEach(ent => {
      if (ent.hp <= 0) return;
      const px = ent.x * ts + ts/2;
      const py = ent.y * ts + ts/2;
      const radius = ts * 0.42;

      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.fillStyle = ent.color || '#3b82f6';
      ctx.fill();
      ctx.strokeStyle = ent.id === cState.selectedEntity?.id ? '#fff' : (ent.team === 'player' ? '#60a5fa' : '#ef4444');
      ctx.lineWidth = 2;
      ctx.stroke();

      // Avatar Initials
      const initial = ent.avatar || (ent.name || 'U').substring(0, 2).toUpperCase();
      ctx.font = `bold ${Math.floor(ts * 0.38)}px Inter, sans-serif`;
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(initial, px, py);

      // HP Bar
      const hpR = Math.max(0, ent.hp / ent.maxHp);
      const bw = ts * 0.8, bh = 4;
      ctx.fillStyle = '#334155';
      ctx.fillRect(px - bw/2, py + radius - 2, bw, bh);
      ctx.fillStyle = hpR < 0.25 ? '#ef4444' : (hpR < 0.5 ? '#eab308' : '#22c55e');
      ctx.fillRect(px - bw/2, py + radius - 2, bw * hpR, bh);
    });

    // Pings (Filtered by Perspective)
    for (let i = cState.activePings.length - 1; i >= 0; i--) {
      const ping = cState.activePings[i];
      const canSee = cState.currentPerspective === 'DM' || ping.recipients === 'ALL' || (Array.isArray(ping.recipients) && ping.recipients.includes(cState.currentPerspective));

      if (canSee) {
        const px = ping.x * ts + ts/2;
        const py = ping.y * ts + ts/2;
        const prog = 1 - (ping.life / ping.maxLife);
        const alpha = Math.max(0, ping.life / ping.maxLife);
        const r1 = (prog * ts * 1.5) % (ts * 1.5);

        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, r1, 0, Math.PI * 2);
        ctx.strokeStyle = ping.color;
        ctx.globalAlpha = alpha * (1 - r1 / (ts * 1.5));
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(px, py, ts * 0.18, 0, Math.PI * 2);
        ctx.fillStyle = ping.color;
        ctx.fill();

        ctx.fillStyle = '#fff';
        ctx.font = '10px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(ping.isSecret ? `[Secret] ${ping.senderName}` : ping.senderName, px, py - ts * 0.4);
        ctx.restore();
      }

      ping.life--;
      if (ping.life <= 0) cState.activePings.splice(i, 1);
    }

    // Floater Damage Text & AoE Blast Flashes
    for (let i = cState.effects.length - 1; i >= 0; i--) {
      const eff = cState.effects[i];
      if (eff.kind === 'aoe') {
        const alpha = Math.max(0, eff.life / eff.maxLife);
        ctx.save();
        ctx.globalAlpha = alpha * 0.55;
        ctx.fillStyle = eff.color;
        const minX = Math.max(0, eff.gx - eff.radius), maxX = Math.min(cState.gridSize - 1, eff.gx + eff.radius);
        const minY = Math.max(0, eff.gy - eff.radius), maxY = Math.min(cState.gridSize - 1, eff.gy + eff.radius);
        ctx.fillRect(minX * ts, minY * ts, (maxX - minX + 1) * ts, (maxY - minY + 1) * ts);
        ctx.restore();
        eff.life--;
        if (eff.life <= 0) cState.effects.splice(i, 1);
        continue;
      }
      ctx.fillStyle = eff.color;
      ctx.font = 'bold 16px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(eff.text, eff.x, eff.y - eff.offset);
      eff.offset += 1;
      eff.life--;
      if (eff.life <= 0) cState.effects.splice(i, 1);
    }

    animationFrameId = requestAnimationFrame(render);
  }
  animationFrameId = requestAnimationFrame(render);

  // Expose controller on container and window for testing, automated verification and external integrations
  container._combatController = {
    cState,
    ABILITIES,
    BESTIARY,
    rollInitiative,
    advanceTurn,
    endCombat,
    startTurn,
    runNpcTurn,
    handleDmResolveCurrent,
    canAct,
    isHostile,
    executeAbility,
    performWeaponAttack,
    updateActionUi,
    handleUnitClick,
    handleActionClick,
    dist,
    logMsg
  };
  if (typeof window !== 'undefined') {
    window._lastCombatController = container._combatController;
    window.renderCombatView = renderCombatView;
  }
}

  // COMPONENT: socialView.js
/**
 * Social Lounge & Downtime View Component
 * Handles non-combat roleplay, live synchronized dice roll logging,
 * and DM-pushed saving throw / skill check requests.
 */
let activeFilter = 'all'; // 'all' | 'save' | 'check' | 'attack' | 'dice_roller'
let activeAdvMode = 'normal'; // 'normal' | 'adv' | 'dis'
function renderSocialView(container) {
  const party = worldState.data.partyCharacters || [];
  const scene = worldState.data.socialScene || {
    title: 'Frost-Breaker Foothills Rime-Cave Campfire',
    region: 'The Glacial Crags of Permafrost',
    atmosphere: 'Frigid winds howl outside, but the hearthfire glows warm and amber against crystalline walls.',
    mood: 'Campfire Rest & Strategy',
    lighting: 'Warm Firelight'
  };

  const isDm = Boolean(worldState.prefs.dmMode);
  const activeUser = typeof worldState.getActiveUser === 'function' ? worldState.getActiveUser() : null;
  const activeHero = typeof worldState.getActiveHero === 'function' ? worldState.getActiveHero() : (party[0] || null);
  const canControlActive = worldState.canControlCharacter(activeHero ? activeHero.id : null, activeHero);
  const activeHeroOwner = worldState.getCharacterOwnerName(activeHero ? activeHero.id : null, activeHero);
  const myHero = party.find(p => worldState.canControlCharacter(p.id, p));
  const controllableParty = isDm ? party : party.filter(p => worldState.canControlCharacter(p.id, p));

  const pendingRequests = typeof worldState.getPendingRollRequests === 'function' 
    ? worldState.getPendingRollRequests(activeHero ? activeHero.id : null) 
    : [];

  const rollLogs = typeof worldState.getDiceRollLogs === 'function' 
    ? worldState.getDiceRollLogs(60) 
    : [];

  const messages = typeof worldState.getSocialMessages === 'function' 
    ? worldState.getSocialMessages(50) 
    : [];

  // Filter rolls if tab selected
  const filteredRolls = activeFilter === 'all' 
    ? rollLogs 
    : rollLogs.filter(r => r.rollType === activeFilter || (activeFilter === 'save' && r.rollType === 'save') || (activeFilter === 'check' && r.rollType === 'check'));

  // Calculate Hero modifiers
  const stats = (activeHero && activeHero.stats) || { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
  const getMod = (val) => Math.floor((val - 10) / 2);
  const formatMod = (mod) => (mod >= 0 ? '+' + mod : String(mod));

  container.innerHTML = `
    <div class="social-container">
      
      <!-- Top Scene Header & Downtime Banner -->
      <header class="social-header-banner">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="font-size: 1.6rem; background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;">
            🔥
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <h2 style="font-family: var(--font-cinzel); font-size: 1.1rem; color: var(--text-gold); margin: 0;">
                ${scene.title}
              </h2>
              <span class="badge" style="background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.4); font-size: 0.7rem;">
                ${scene.mood}
              </span>
            </div>
            <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.15rem;">
              ${scene.atmosphere}
            </div>
          </div>
        </div>

        <!-- Downtime Rest Controls -->
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <button class="btn btn-sm" id="social-short-rest-btn" title="Take a 1-hour Short Rest to spend hit dice and regain short-rest abilities">
            ☕ Short Rest
          </button>
          <button class="btn btn-sm btn-primary" id="social-long-rest-btn" title="Take an 8-hour Long Rest to regain all HP and spell slots">
            ⛺ Long Rest
          </button>
          ${isDm ? `
            <button class="btn btn-sm" id="social-edit-scene-btn" style="background: rgba(239, 68, 68, 0.2); border-color: rgba(239, 68, 68, 0.5); color: #fca5a5;">
              ⚙️ DM Scene
            </button>
          ` : ''}
        </div>
      </header>

      <!-- Main Three-Column Social Layout -->
      <div class="social-layout">
        
        <!-- ==========================================
             LEFT COLUMN: PARTY LOUNGE & HEROES
             ========================================== -->
        <aside class="social-panel">
          <div class="social-panel-header">
            <span class="social-panel-title">👥 Party Lounge (${party.length})</span>
            <span style="font-size: 0.7rem; color: var(--text-muted);">Non-Combat Scene</span>
          </div>

          <div class="social-panel-body" id="social-party-list">
            ${party.map(p => {
              const isCurrent = activeHero && activeHero.id === p.id;
              const hpPct = Math.round((p.hpCurrent / p.hpMax) * 100);
              const isInspired = Boolean(p.inspiration);
              const canControlThis = worldState.canControlCharacter(p.id, p);
              const owner = worldState.getCharacterOwnerName(p.id, p);
              return `
                <div class="party-lounge-card ${isCurrent ? 'active-user-card' : ''}" data-char-id="${p.id}">
                  <div style="display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 0.45rem;">
                      <div class="party-avatar" style="width: 32px; height: 32px; font-size: 0.8rem; background: var(--bg-tertiary); border: 1px solid var(--border-gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; color: var(--text-gold);">
                        ${p.avatar || p.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <strong style="font-size: 0.85rem; color: var(--text-primary); display: block;">${p.name}</strong>
                        <span style="font-size: 0.7rem; color: var(--text-muted);">${p.playerName ? `${p.playerName} • ` : ''}${p.classRole}</span>
                      </div>
                    </div>
                    
                    <!-- Inspiration Star -->
                    <button class="inspiration-toggle-btn" data-char-id="${p.id}" title="${isDm ? 'Click to toggle Inspiration' : (isInspired ? 'Character has Inspiration!' : 'No Inspiration')}" style="background: none; border: none; cursor: ${isDm ? 'pointer' : 'default'}; font-size: 1.1rem; opacity: ${isInspired ? '1' : '0.3'}; filter: ${isInspired ? 'drop-shadow(0 0 6px #f59e0b)' : 'none'};">
                      ⭐
                    </button>
                  </div>

                  <!-- HP & Vitals Bar -->
                  <div style="margin-top: 0.2rem;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--text-secondary); margin-bottom: 2px;">
                      <span>HP: <strong style="color: ${hpPct < 30 ? '#ef4444' : '#4ade80'};">${p.hpCurrent}</strong> / ${p.hpMax}</span>
                      <span>AC: <strong>${p.ac}</strong> | Perc: <strong>${p.passivePerception || 10}</strong></span>
                    </div>
                    <div style="height: 4px; background: var(--bg-tertiary); border-radius: 2px; overflow: hidden;">
                      <div style="height: 100%; width: ${hpPct}%; background: ${hpPct < 30 ? '#ef4444' : (hpPct < 60 ? '#f59e0b' : '#22c55e')};"></div>
                    </div>
                  </div>

                  <!-- Situation / Roleplay Note -->
                  ${p.currentSituation?.statusNote ? `
                    <div style="font-size: 0.7rem; color: var(--text-secondary); font-style: italic; background: var(--bg-tertiary); padding: 3px 6px; border-radius: 3px; border-left: 2px solid var(--text-gold);">
                      "${p.currentSituation.statusNote}"
                    </div>
                  ` : ''}

                  <!-- Actions & Ownership Pill -->
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.2rem;">
                    <div>
                      ${canControlThis ? `
                        <span class="badge" style="background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.35); font-size: 0.65rem;">
                          ${isDm ? 'DM Controlled' : 'Your Hero'}
                        </span>
                      ` : `
                        <span style="font-size: 0.65rem; color: var(--text-muted);">
                          🔒 ${owner}
                        </span>
                      `}
                    </div>
                    <button class="btn btn-tiny select-hero-btn" data-char-id="${p.id}" style="font-size: 0.65rem; padding: 1px 6px;">
                      ${isCurrent ? 'Viewing' : 'Select Hero'}
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </aside>

        <!-- ==========================================
             MIDDLE COLUMN: LIVE DICE ROLL STREAM & QUICK CHECKS
             ========================================== -->
        <main class="social-panel" style="flex: 1;">
          <div class="social-panel-header">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="social-panel-title">🎲 Live Synchronized Dice Log</span>
              <span class="badge" style="background: rgba(34, 197, 94, 0.2); color: #4ade80; font-size: 0.65rem; border: 1px solid rgba(34, 197, 94, 0.4);">
                Live Feed
              </span>
            </div>
            
            <div style="display: flex; align-items: center; gap: 0.35rem;">
              <button class="filter-chip roll-filter-btn ${activeFilter === 'all' ? 'active' : ''}" data-filter="all" style="font-size: 0.7rem; padding: 2px 8px;">All</button>
              <button class="filter-chip roll-filter-btn ${activeFilter === 'save' ? 'active' : ''}" data-filter="save" style="font-size: 0.7rem; padding: 2px 8px;">Saves</button>
              <button class="filter-chip roll-filter-btn ${activeFilter === 'check' ? 'active' : ''}" data-filter="check" style="font-size: 0.7rem; padding: 2px 8px;">Checks</button>
              ${isDm ? `<button id="clear-dice-logs-btn" style="background: none; border: none; color: #f87171; font-size: 0.7rem; cursor: pointer; margin-left: 0.25rem;">Clear</button>` : ''}
            </div>
          </div>

          <div class="social-panel-body" style="gap: 0.6rem;">

            <!-- ==========================================
                 PENDING DM ROLL REQUESTS BANNER (IF ANY)
                 ========================================== -->
            ${pendingRequests.length > 0 ? `
              <div id="social-pending-requests-container" style="display: flex; flex-direction: column; gap: 0.4rem;">
                ${pendingRequests.map(req => {
                  const reqAbility = req.ability || 'DEX';
                  const canResolve = isDm || req.targetCharId === 'ALL' || worldState.canControlCharacter(req.targetCharId);
                  const targetChar = party.find(p => p.id === req.targetCharId) || activeHero;
                  const charMod = targetChar ? getMod(targetChar.stats?.[reqAbility.toLowerCase()] || 10) : 0;
                  return `
                    <div class="roll-request-banner" data-req-id="${req.id}">
                      <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 0.75rem; font-weight: bold; color: #fbbf24; display: flex; align-items: center; gap: 0.35rem;">
                          ⚡ DM Roll Request: <strong>${req.type === 'save' ? `${reqAbility} Saving Throw` : `${reqAbility} Check`}</strong>
                          ${req.dc ? `<span class="badge" style="background: #b45309; color: #fff; font-size: 0.65rem;">DC ${req.dc}</span>` : ''}
                        </span>
                        <span style="font-size: 0.7rem; color: var(--text-muted);">Target: ${req.targetPlayerName || 'You'}</span>
                      </div>
                      ${req.reason ? `
                        <div style="font-size: 0.75rem; color: var(--text-secondary); font-style: italic;">
                          "${req.reason}"
                        </div>
                      ` : ''}
                      ${canResolve ? `
                        <div style="display: flex; gap: 0.4rem; align-items: center; margin-top: 0.25rem;">
                          <button class="btn btn-sm btn-primary resolve-request-btn" data-req-id="${req.id}" data-adv="normal" style="flex: 1; font-size: 0.75rem; padding: 4px 8px;">
                            🎲 Roll Normal (${formatMod(charMod)})
                          </button>
                          <button class="btn btn-sm resolve-request-btn" data-req-id="${req.id}" data-adv="adv" style="font-size: 0.75rem; padding: 4px 8px; color: #4ade80;">
                            Advantage
                          </button>
                          <button class="btn btn-sm resolve-request-btn" data-req-id="${req.id}" data-adv="dis" style="font-size: 0.75rem; padding: 4px 8px; color: #f87171;">
                            Disadvantage
                          </button>
                          ${isDm ? `
                            <button class="btn btn-sm dismiss-request-btn" data-req-id="${req.id}" style="background: none; border: 1px solid rgba(255,255,255,0.2); font-size: 0.7rem; padding: 4px 6px;" title="Dismiss">
                              ✕
                            </button>
                          ` : ''}
                        </div>
                      ` : `
                        <div style="margin-top: 0.25rem; font-size: 0.72rem; color: var(--text-muted); display: flex; align-items: center; justify-content: space-between;">
                          <span>⏳ Awaiting roll from <strong>${req.targetPlayerName || 'assigned player'}</strong>...</span>
                          <span style="font-size: 0.68rem; color: #fca5a5;">🔒 Controlled by ${worldState.getCharacterOwnerName(req.targetCharId)}</span>
                        </div>
                      `}
                    </div>
                  `;
                }).join('')}
              </div>
            ` : ''}

            <!-- ==========================================
                 ROLL LOGS FEED (SHARED AMONG PLAYERS & DM)
                 ========================================== -->
            <div id="social-rolls-feed" style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 0.4rem; min-height: 180px; max-height: 280px; background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.5rem;">
              ${filteredRolls.length === 0 ? `
                <div style="text-align: center; color: var(--text-muted); font-size: 0.8rem; margin: auto;">
                  No dice rolls logged yet. Roll an ability check or saving throw below!
                </div>
              ` : filteredRolls.map(r => {
                const isCrit = r.isCrit;
                const isNat1 = r.isNat1;
                const badgeClass = r.success === true ? 'roll-badge-success' : (r.success === false ? 'roll-badge-fail' : 'roll-badge-neutral');
                const badgeText = r.success === true ? `SUCCESS${r.dc ? ` (vs DC ${r.dc})` : ''}` : (r.success === false ? `FAILED${r.dc ? ` (vs DC ${r.dc})` : ''}` : `TOTAL: ${r.total}`);
                return `
                  <div class="roll-card ${isCrit ? 'crit-success' : (isNat1 ? 'crit-fail' : '')}">
                    <div class="roll-card-header">
                      <span class="roll-card-roller">
                        <span style="font-size: 0.75rem; font-weight: bold; background: var(--bg-tertiary); padding: 1px 5px; border-radius: 3px; color: var(--text-gold); border: 1px solid var(--border-subtle);">
                          ${r.rollerAvatar || '🎲'}
                        </span>
                        <strong>${r.rollerName}</strong>
                        <span style="font-size: 0.7rem; color: var(--text-secondary); margin-left: 0.25rem;">— ${r.label}</span>
                      </span>
                      <span class="roll-card-time">${r.timeStr}</span>
                    </div>

                    <div class="roll-card-content">
                      <span class="roll-card-formula">${r.formula}</span>
                      <div style="display: flex; align-items: center; gap: 0.4rem;">
                        ${isCrit ? `<span class="badge" style="background: #15803d; color: #fff; font-size: 0.65rem;">NAT 20!</span>` : ''}
                        ${isNat1 ? `<span class="badge" style="background: #991b1b; color: #fff; font-size: 0.65rem;">NAT 1!</span>` : ''}
                        <span class="roll-card-badge ${badgeClass}">${badgeText}</span>
                      </div>
                    </div>

                    ${r.note ? `
                      <div style="font-size: 0.68rem; color: var(--text-muted); font-style: italic;">
                        Context: ${r.note}
                      </div>
                    ` : ''}
                  </div>
                `;
              }).join('')}
            </div>

            <!-- ==========================================
                 PLAYER QUICK CHECK & SAVING THROW TRAY
                 ========================================== -->
            <div style="background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.65rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.45rem;">
                <span style="font-size: 0.75rem; font-weight: bold; color: var(--text-gold); text-transform: uppercase;">
                  Quick Checks & Saves (${activeHero ? activeHero.name : 'Active Hero'})
                </span>
                
                <!-- Adv / Dis Mode Toggle -->
                <div style="display: flex; gap: 0.25rem;">
                  <button class="adv-toggle-btn ${activeAdvMode === 'normal' ? 'active' : ''}" data-mode="normal" style="font-size: 0.68rem; padding: 2px 6px; border: 1px solid var(--border-subtle); background: ${activeAdvMode === 'normal' ? 'var(--text-gold)' : 'var(--bg-tertiary)'}; color: ${activeAdvMode === 'normal' ? '#000' : 'var(--text-primary)'}; border-radius: 3px; cursor: pointer;">
                    Normal
                  </button>
                  <button class="adv-toggle-btn ${activeAdvMode === 'adv' ? 'active' : ''}" data-mode="adv" style="font-size: 0.68rem; padding: 2px 6px; border: 1px solid var(--border-subtle); background: ${activeAdvMode === 'adv' ? '#15803d' : 'var(--bg-tertiary)'}; color: #fff; border-radius: 3px; cursor: pointer;">
                    Adv
                  </button>
                  <button class="adv-toggle-btn ${activeAdvMode === 'dis' ? 'active' : ''}" data-mode="dis" style="font-size: 0.68rem; padding: 2px 6px; border: 1px solid var(--border-subtle); background: ${activeAdvMode === 'dis' ? '#991b1b' : 'var(--bg-tertiary)'}; color: #fff; border-radius: 3px; cursor: pointer;">
                    Dis
                  </button>
                </div>
              </div>

              ${!canControlActive ? `
                <div style="background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 4px; padding: 6px 10px; margin-bottom: 0.5rem; display: flex; align-items: center; justify-content: space-between;">
                  <span style="font-size: 0.72rem; color: #fca5a5; display: flex; align-items: center; gap: 0.35rem;">
                    🔒 <strong>Read-Only:</strong> ${activeHero ? activeHero.name : 'Character'} is controlled by <strong>${activeHeroOwner}</strong>.
                  </span>
                  ${myHero ? `
                    <button class="btn btn-tiny select-hero-btn" data-char-id="${myHero.id}" style="font-size: 0.68rem; padding: 2px 8px; background: rgba(34, 197, 94, 0.2); border-color: rgba(34, 197, 94, 0.4); color: #86efac; cursor: pointer;">
                      Switch to ${myHero.name}
                    </button>
                  ` : ''}
                </div>
              ` : ''}

              <!-- 6 Core Ability Checks -->
              <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 0.35rem; margin-bottom: 0.45rem; ${!canControlActive ? 'opacity: 0.4; pointer-events: none;' : ''}">
                ${['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'].map(st => {
                  const m = getMod(stats[st.toLowerCase()] || 10);
                  return `
                    <button class="quick-stat-check-btn" data-stat="${st}" data-is-save="false" ${!canControlActive ? 'disabled' : ''} style="background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: 4px; padding: 4px 2px; text-align: center; cursor: ${canControlActive ? 'pointer' : 'not-allowed'}; transition: all 0.15s ease;">
                      <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: bold;">${st}</div>
                      <div style="font-size: 0.8rem; color: var(--text-gold); font-weight: bold;">${formatMod(m)}</div>
                    </button>
                  `;
                }).join('')}
              </div>

              <!-- 6 Core Saving Throws -->
              <div style="margin-bottom: 0.45rem; ${!canControlActive ? 'opacity: 0.4; pointer-events: none;' : ''}">
                <div style="font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.25rem;">Saving Throws:</div>
                <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 0.35rem;">
                  ${['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'].map(st => {
                    const m = getMod(stats[st.toLowerCase()] || 10);
                    return `
                      <button class="quick-stat-check-btn" data-stat="${st}" data-is-save="true" ${!canControlActive ? 'disabled' : ''} style="background: rgba(59, 130, 246, 0.12); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 4px; padding: 3px 2px; text-align: center; cursor: ${canControlActive ? 'pointer' : 'not-allowed'};">
                        <div style="font-size: 0.65rem; color: #93c5fd; font-weight: bold;">${st} Save</div>
                      </button>
                    `;
                  }).join('')}
                </div>
              </div>

              <!-- Popular Skills & Custom Check -->
              <div style="display: flex; gap: 0.35rem; flex-wrap: wrap; ${!canControlActive ? 'opacity: 0.4; pointer-events: none;' : ''}">
                ${[
                  { name: 'Perception', stat: 'WIS' },
                  { name: 'Insight', stat: 'WIS' },
                  { name: 'Stealth', stat: 'DEX' },
                  { name: 'Athletics', stat: 'STR' },
                  { name: 'Investigation', stat: 'INT' },
                  { name: 'Persuasion', stat: 'CHA' }
                ].map(sk => {
                  const m = getMod(stats[sk.stat.toLowerCase()] || 10);
                  return `
                    <button class="quick-skill-check-btn" data-skill="${sk.name}" data-stat="${sk.stat}" ${!canControlActive ? 'disabled' : ''} style="background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: 3px; font-size: 0.68rem; color: var(--text-secondary); padding: 2px 6px; cursor: ${canControlActive ? 'pointer' : 'not-allowed'};">
                      ${sk.name} (${formatMod(m)})
                    </button>
                  `;
                }).join('')}
              </div>
            </div>

          </div>
        </main>

        <!-- ==========================================
             RIGHT COLUMN: IN-CHARACTER CHAT & DM PUSH CONSOLE
             ========================================== -->
        <aside class="social-panel social-right-col">
          <div class="social-panel-header">
            <span class="social-panel-title">💬 In-Character Dialogue</span>
            <span style="font-size: 0.7rem; color: var(--text-gold);">Campfire & Banter</span>
          </div>

          <div class="social-panel-body" style="gap: 0.6rem;">
            
            <!-- Chat Stream -->
            <div id="social-chat-stream" style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 0.5rem; min-height: 180px; max-height: 250px; background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.6rem;">
              ${messages.map(m => {
                const isDmMsg = m.type === 'dm_narration' || m.senderRole === 'DM';
                const isEmote = m.type === 'emote';
                return `
                  <div style="display: flex; flex-direction: column; gap: 0.15rem; background: ${isDmMsg ? 'rgba(244, 67, 54, 0.1)' : 'var(--bg-secondary)'}; border: 1px solid ${isDmMsg ? 'rgba(244, 67, 54, 0.3)' : 'var(--border-subtle)'}; border-radius: var(--radius-sm); padding: 0.4rem 0.55rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.72rem;">
                      <strong style="color: ${isDmMsg ? '#fca5a5' : 'var(--text-gold)'}; display: flex; align-items: center; gap: 0.25rem;">
                        ${isDmMsg ? '🛡️ ' : ''}${m.senderName}
                      </strong>
                      <span style="font-size: 0.65rem; color: var(--text-muted);">${m.timeStr}</span>
                    </div>
                    <div style="font-size: 0.78rem; color: ${isEmote ? 'var(--text-secondary)' : 'var(--text-primary)'}; font-style: ${isEmote || isDmMsg ? 'italic' : 'normal'}; line-height: 1.35;">
                      ${isEmote ? `*${m.text}*` : m.text}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            <!-- Dialogue Composer -->
            <form id="social-chat-form" style="display: flex; flex-direction: column; gap: 0.35rem;">
              <div style="display: flex; gap: 0.35rem;">
                <select id="chat-speaker-select" class="theme-select" style="flex: 1; font-size: 0.7rem; padding: 3px 6px;">
                  ${isDm ? `<option value="DM">Dungeon Master (Narration)</option>` : ''}
                  ${controllableParty.map(p => `
                    <option value="${p.id}" ${activeHero && activeHero.id === p.id ? 'selected' : ''}>
                      ${p.name} (${p.playerName || 'PC'})
                    </option>
                  `).join('')}
                  ${!isDm && controllableParty.length === 0 ? `<option value="" disabled selected>Sign in to speak as your hero</option>` : ''}
                </select>

                <select id="chat-type-select" class="theme-select" style="width: 85px; font-size: 0.7rem; padding: 3px 4px;">
                  <option value="ic">Say</option>
                  <option value="emote">*Emote*</option>
                  <option value="ooc">((OOC))</option>
                </select>
              </div>

              <div style="display: flex; gap: 0.35rem;">
                <input type="text" id="chat-msg-input" placeholder="Type in-character banter..." style="flex: 1; font-size: 0.75rem; padding: 4px 8px; background: var(--bg-tertiary); color: var(--text-primary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);" autocomplete="off">
                <button type="submit" class="btn btn-sm btn-primary" style="font-size: 0.75rem; padding: 4px 10px;">Send</button>
              </div>
            </form>

            <!-- ==========================================
                 DM PUSH ROLL REQUEST CONSOLE (DM MODE ONLY)
                 ========================================== -->
            ${isDm ? `
              <div style="border-top: 1px solid rgba(244, 67, 54, 0.3); padding-top: 0.5rem; margin-top: 0.25rem;">
                <div style="font-size: 0.75rem; font-weight: bold; color: #fca5a5; display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.35rem;">
                  <span>⚡ DM: Push Roll Request to Players</span>
                  <span class="badge" style="background: #7f1d1d; color: #fca5a5; font-size: 0.6rem;">DM Deck</span>
                </div>

                <form id="dm-push-request-form" style="display: flex; flex-direction: column; gap: 0.35rem; background: rgba(244, 67, 54, 0.08); border: 1px solid rgba(244, 67, 54, 0.25); border-radius: var(--radius-sm); padding: 0.5rem;">
                  <div style="display: flex; gap: 0.25rem;">
                    <!-- Target Player -->
                    <select id="dm-push-target" class="theme-select" style="flex: 1; font-size: 0.7rem; padding: 2px;">
                      <option value="ALL">All Players (Party)</option>
                      ${party.map(p => `<option value="${p.id}">${p.name} (${p.playerName || 'PC'})</option>`).join('')}
                    </select>

                    <!-- Request Type -->
                    <select id="dm-push-type" class="theme-select" style="width: 90px; font-size: 0.7rem; padding: 2px;">
                      <option value="save">Save</option>
                      <option value="check">Check</option>
                    </select>
                  </div>

                  <div style="display: flex; gap: 0.25rem;">
                    <!-- Stat / Skill -->
                    <select id="dm-push-ability" class="theme-select" style="flex: 1; font-size: 0.7rem; padding: 2px;">
                      <option value="DEX">DEX (Reflex / Fireball)</option>
                      <option value="CON">CON (Poison / Stamina)</option>
                      <option value="WIS">WIS (Mind / Willpower)</option>
                      <option value="STR">STR (Athletics / Force)</option>
                      <option value="INT">INT (Arcana / Memory)</option>
                      <option value="CHA">CHA (Banishment / Presence)</option>
                      <option value="Perception">Perception Check</option>
                      <option value="Insight">Insight Check</option>
                      <option value="Stealth">Stealth Check</option>
                    </select>

                    <!-- DC Input -->
                    <input type="number" id="dm-push-dc" placeholder="DC" value="15" min="5" max="30" style="width: 48px; font-size: 0.7rem; padding: 2px 4px; background: var(--bg-tertiary); color: #fff; border: 1px solid var(--border-subtle); border-radius: 3px;">
                  </div>

                  <!-- Reason Context -->
                  <input type="text" id="dm-push-reason" placeholder="Reason (e.g. Dragon breath / Noticing hidden ambush)" style="font-size: 0.7rem; padding: 3px 6px; background: var(--bg-tertiary); color: #fff; border: 1px solid var(--border-subtle); border-radius: 3px;">

                  <button type="submit" class="btn btn-sm btn-primary" style="font-size: 0.72rem; padding: 4px; background: linear-gradient(135deg, #b91c1c, #ef4444); color: #fff;">
                    ⚡ Push Request to Player(s)
                  </button>
                </form>
              </div>
            ` : ''}

          </div>
        </aside>

      </div>
    </div>
  `;

  // Bind all interactive events inside this container
  bindSocialEvents(container, party, activeHero);
}

function bindSocialEvents(container, party, activeHero) {
  // 1. Rest Buttons
  const shortRestBtn = container.querySelector('#social-short-rest-btn');
  if (shortRestBtn) {
    shortRestBtn.addEventListener('click', () => {
      soundEngine.playDiceRoll(false);
      const isDm = Boolean(worldState.prefs.dmMode);
      if (isDm) {
        alert('Short Rest Completed! Party has rested for 1 hour, bound wounds, and recovered short-rest resources.');
      } else {
        const myChars = party.filter(p => worldState.canControlCharacter(p.id, p));
        if (myChars.length === 0) {
          alert('You do not control any characters to take a short rest.');
          return;
        }
        alert(`Short Rest Completed for ${myChars.map(c => c.name).join(', ')}! 1 hour rested.`);
      }
    });
  }

  const longRestBtn = container.querySelector('#social-long-rest-btn');
  if (longRestBtn) {
    longRestBtn.addEventListener('click', () => {
      soundEngine.playDiceRoll(true);
      const isDm = Boolean(worldState.prefs.dmMode);
      if (isDm) {
        party.forEach(p => {
          p.hpCurrent = p.hpMax;
          if (p.classResources) p.classResources.current = p.classResources.max;
        });
        worldState.saveData();
        alert('Long Rest Completed! Full HP and spell slots restored for the entire party.');
      } else {
        const myChars = party.filter(p => worldState.canControlCharacter(p.id, p));
        if (myChars.length === 0) {
          alert('You do not control any characters to take a long rest.');
          return;
        }
        myChars.forEach(p => {
          p.hpCurrent = p.hpMax;
          if (p.classResources) p.classResources.current = p.classResources.max;
        });
        worldState.saveData();
        alert(`Long Rest Completed for ${myChars.map(c => c.name).join(', ')}! Full HP and spell slots restored.`);
      }
    });
  }

  // 2. Inspiration Toggles (DM click)
  container.querySelectorAll('.inspiration-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!worldState.prefs.dmMode) return;
      const charId = btn.getAttribute('data-char-id');
      const newState = worldState.toggleCharacterInspiration(charId);
      soundEngine.playDiceRoll(newState);
    });
  });

  // 3. Hero Selection
  container.querySelectorAll('.select-hero-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const charId = btn.getAttribute('data-char-id');
      worldState.setActiveHero(charId);
    });
  });

  // 4. Adv / Dis Mode Toggles
  container.querySelectorAll('.adv-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeAdvMode = btn.getAttribute('data-mode');
      renderSocialView(container);
    });
  });

  // 5. Quick Ability & Saving Throw Checks
  container.querySelectorAll('.quick-stat-check-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!worldState.canControlCharacter(activeHero ? activeHero.id : null, activeHero)) {
        alert(`You cannot roll for ${activeHero ? activeHero.name : 'this character'}! It is controlled by ${worldState.getCharacterOwnerName(activeHero ? activeHero.id : null, activeHero)}.`);
        return;
      }
      const statKey = btn.getAttribute('data-stat');
      const isSave = btn.getAttribute('data-is-save') === 'true';
      executeStatRoll(statKey, isSave, null, activeHero, activeAdvMode);
    });
  });

  // 6. Quick Skill Checks
  container.querySelectorAll('.quick-skill-check-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!worldState.canControlCharacter(activeHero ? activeHero.id : null, activeHero)) {
        alert(`You cannot roll for ${activeHero ? activeHero.name : 'this character'}! It is controlled by ${worldState.getCharacterOwnerName(activeHero ? activeHero.id : null, activeHero)}.`);
        return;
      }
      const skillName = btn.getAttribute('data-skill');
      const statKey = btn.getAttribute('data-stat');
      executeStatRoll(statKey, false, skillName, activeHero, activeAdvMode);
    });
  });

  // 7. Resolve Pending Roll Request
  container.querySelectorAll('.resolve-request-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const reqId = btn.getAttribute('data-req-id');
      const advMode = btn.getAttribute('data-adv') || 'normal';
      const reqs = worldState.data.pendingRollRequests || [];
      const targetReq = reqs.find(r => r.id === reqId);
      if (!targetReq) return;

      const isDm = Boolean(worldState.prefs.dmMode);
      const canResolve = isDm || targetReq.targetCharId === 'ALL' || worldState.canControlCharacter(targetReq.targetCharId);
      if (!canResolve) {
        alert('You cannot resolve this request because you do not control the target character!');
        return;
      }

      let rollingHero = activeHero;
      if (targetReq.targetCharId && targetReq.targetCharId !== 'ALL') {
        const found = party.find(p => p.id === targetReq.targetCharId);
        if (found) rollingHero = found;
      }

      const ability = targetReq.ability || 'DEX';
      const isSave = targetReq.type === 'save';
      const dc = targetReq.dc;
      const reason = targetReq.reason || '';

      executeStatRoll(ability, isSave, targetReq.skill, rollingHero, advMode, dc, reason, reqId);
    });
  });

  // Dismiss Pending Request
  container.querySelectorAll('.dismiss-request-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const reqId = btn.getAttribute('data-req-id');
      worldState.dismissRollRequest(reqId);
    });
  });

  // 8. Filter Chips
  container.querySelectorAll('.roll-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.getAttribute('data-filter');
      renderSocialView(container);
    });
  });

  // Clear Dice Logs
  const clearLogsBtn = container.querySelector('#clear-dice-logs-btn');
  if (clearLogsBtn) {
    clearLogsBtn.addEventListener('click', () => {
      if (confirm('Clear the shared dice roll log?')) {
        worldState.clearDiceRollLogs();
      }
    });
  }

  // 9. In-Character Dialogue Form
  const chatForm = container.querySelector('#social-chat-form');
  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = container.querySelector('#chat-msg-input');
      const speakerSelect = container.querySelector('#chat-speaker-select');
      const typeSelect = container.querySelector('#chat-type-select');
      const text = input.value.trim();
      if (!text) return;

      let senderName = 'Adventurer';
      let senderAvatar = 'PC';
      let senderRole = 'Player';

      if (speakerSelect.value === 'DM') {
        if (!worldState.prefs.dmMode) {
          alert('Only the Dungeon Master can speak as the DM!');
          return;
        }
        senderName = 'Dungeon Master';
        senderAvatar = 'DM';
        senderRole = 'DM';
      } else {
        const found = party.find(p => p.id === speakerSelect.value);
        if (!found || !worldState.canControlCharacter(found.id, found)) {
          alert('You can only speak as a character you control!');
          return;
        }
        senderName = `${found.name}${found.playerName ? ` (${found.playerName})` : ''}`;
        senderAvatar = found.avatar || 'PC';
      }

      worldState.sendSocialMessage({
        senderName,
        senderAvatar,
        senderRole,
        text,
        type: typeSelect.value
      });

      input.value = '';
    });
  }

  // 10. DM Push Request Form
  const dmPushForm = container.querySelector('#dm-push-request-form');
  if (dmPushForm) {
    dmPushForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const targetId = container.querySelector('#dm-push-target').value;
      const type = container.querySelector('#dm-push-type').value;
      const ability = container.querySelector('#dm-push-ability').value;
      const dcVal = container.querySelector('#dm-push-dc').value;
      const reasonVal = container.querySelector('#dm-push-reason').value.trim();

      let targetPlayerName = 'All Players';
      if (targetId !== 'ALL') {
        const pChar = party.find(p => p.id === targetId);
        if (pChar) targetPlayerName = `${pChar.playerName || pChar.name} (${pChar.name})`;
      }

      worldState.pushRollRequest({
        targetCharId: targetId,
        targetPlayerName,
        requestedBy: 'DM',
        type,
        ability,
        dc: dcVal ? parseInt(dcVal, 10) : null,
        reason: reasonVal
      });

      soundEngine.playDiceRoll(false);
      alert(`⚡ Push request for ${ability} ${type === 'save' ? 'Saving Throw' : 'Check'} sent to ${targetPlayerName}!`);
    });
  }
}

// Roll calculation & logging helper
function executeStatRoll(statKey, isSave, skillName, hero, advMode = 'normal', dc = null, note = '', reqId = null) {
  if (hero && !worldState.canControlCharacter(hero.id, hero)) {
    alert(`You cannot roll for ${hero.name}! It is controlled by ${worldState.getCharacterOwnerName(hero.id, hero)}.`);
    return;
  }
  const stats = (hero && hero.stats) || { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
  const getMod = (val) => Math.floor((val - 10) / 2);
  let baseMod = getMod(stats[statKey.toLowerCase()] || 10);

  // Proficiency bonus calculation for 5.5e
  let pb = 2;
  if (hero && hero.level) pb = Math.ceil(1 + hero.level / 4);

  // If saving throw with proficiency
  let profBonus = 0;
  if (isSave && hero && hero.classRole) {
    const role = hero.classRole.toLowerCase();
    if ((role.includes('barbarian') && (statKey === 'STR' || statKey === 'CON')) ||
        (role.includes('cleric') && (statKey === 'WIS' || statKey === 'CHA')) ||
        (role.includes('rogue') && (statKey === 'DEX' || statKey === 'INT')) ||
        (role.includes('wizard') && (statKey === 'INT' || statKey === 'WIS'))) {
      profBonus = pb;
    }
  }

  const totalMod = baseMod + profBonus;

  // Roll d20
  const d1 = Math.floor(Math.random() * 20) + 1;
  const d2 = Math.floor(Math.random() * 20) + 1;
  let d20 = d1;
  let formula = `1d20 (${d1})`;

  if (advMode === 'adv') {
    d20 = Math.max(d1, d2);
    formula = `1d20 [ADV: ${d1}, ${d2} -> ${d20}]`;
  } else if (advMode === 'dis') {
    d20 = Math.min(d1, d2);
    formula = `1d20 [DIS: ${d1}, ${d2} -> ${d20}]`;
  }

  formula += totalMod >= 0 ? ` + ${totalMod}` : ` - ${Math.abs(totalMod)}`;
  const total = d20 + totalMod;

  const isCrit = d20 === 20;
  const isNat1 = d20 === 1;

  soundEngine.playDiceRoll(isCrit);

  const label = skillName 
    ? `${skillName} Check (${statKey})` 
    : (isSave ? `${statKey} Saving Throw` : `${statKey} Ability Check`);

  const rollType = isSave ? 'save' : 'check';

  let rollerName = hero ? hero.name : 'Adventurer';
  if (hero && hero.playerName) rollerName += ` (${hero.playerName})`;
  const rollerAvatar = hero ? (hero.avatar || 'PC') : '🎲';

  const entry = {
    rollerName,
    rollerAvatar,
    rollType,
    label,
    formula,
    d20Result: d20,
    total,
    dc: dc !== null ? Number(dc) : null,
    success: dc !== null ? total >= Number(dc) : null,
    advantageMode: advMode,
    note
  };

  if (reqId) {
    worldState.resolveRollRequest(reqId, entry);
  } else {
    worldState.logDiceRoll(entry);
  }
}

  // COMPONENT: diceRoller.js
/**
 * 5.5e Polyhedral Dice Roller Component with Sound Synthesis
 */
class DiceRollerModal {
  constructor() {
    this.history = [];
    this.modal = null;
    this.advantageMode = 'normal'; // 'normal' | 'adv' | 'dis'
  }

  init() {
    this.modal = document.getElementById('dice-modal');
    if (!this.modal) return;

    this.bindEvents();
  }

  bindEvents() {
    const trigger = document.getElementById('dice-roller-trigger');
    const closeBtn = document.getElementById('close-dice-modal');
    const advBtns = this.modal.querySelectorAll('.adv-mode-btn');

    if (trigger) {
      trigger.addEventListener('click', () => this.open());
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    // Advantage toggles
    advBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        advBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.advantageMode = btn.getAttribute('data-adv');
      });
    });

    // Dice click buttons
    this.modal.querySelectorAll('.dice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sides = parseInt(btn.getAttribute('data-sides'), 10);
        this.roll(sides);
      });
    });

    // Custom expression input
    const customRollBtn = this.modal.querySelector('#custom-roll-btn');
    if (customRollBtn) {
      customRollBtn.addEventListener('click', () => {
        const count = parseInt(this.modal.querySelector('#dice-count-input').value, 10) || 1;
        const mod = parseInt(this.modal.querySelector('#dice-mod-input').value, 10) || 0;
        const sides = parseInt(this.modal.querySelector('#dice-sides-select').value, 10) || 20;
        this.rollMultiple(count, sides, mod);
      });
    }
  }

  open() {
    this.modal.classList.add('active');
  }

  close() {
    this.modal.classList.remove('active');
  }

  roll(sides) {
    const mod = parseInt(this.modal.querySelector('#dice-mod-input').value, 10) || 0;
    
    if (sides === 20 && this.advantageMode !== 'normal') {
      const r1 = Math.floor(Math.random() * 20) + 1;
      const r2 = Math.floor(Math.random() * 20) + 1;
      const chosen = this.advantageMode === 'adv' ? Math.max(r1, r2) : Math.min(r1, r2);
      const total = chosen + mod;
      const isCrit = chosen === 20;

      soundEngine.playDiceRoll(isCrit);

      this.displayResult({
        total,
        mainRoll: chosen,
        isCrit,
        isNat1: chosen === 1,
        formula: `1d20 (${this.advantageMode.toUpperCase()}: [${r1}, ${r2}] -> ${chosen}) ${mod !== 0 ? (mod > 0 ? '+' + mod : mod) : ''}`
      });
    } else {
      const r = Math.floor(Math.random() * sides) + 1;
      const total = r + mod;
      const isCrit = sides === 20 && r === 20;

      soundEngine.playDiceRoll(isCrit);

      this.displayResult({
        total,
        mainRoll: r,
        isCrit,
        isNat1: sides === 20 && r === 1,
        formula: `1d${sides} (${r}) ${mod !== 0 ? (mod > 0 ? '+' + mod : mod) : ''}`
      });
    }
  }

  rollMultiple(count, sides, mod) {
    let rolls = [];
    let sum = 0;
    for (let i = 0; i < count; i++) {
      const r = Math.floor(Math.random() * sides) + 1;
      rolls.push(r);
      sum += r;
    }
    const total = sum + mod;
    soundEngine.playDiceRoll(false);

    this.displayResult({
      total,
      mainRoll: sum,
      isCrit: false,
      isNat1: false,
      formula: `${count}d${sides} [${rolls.join(', ')}] ${mod !== 0 ? (mod > 0 ? '+' + mod : mod) : ''}`
    });
  }

  displayResult({ total, mainRoll, isCrit, isNat1, formula }) {
    const numDisplay = this.modal.querySelector('#roll-number-display');
    const breakdown = this.modal.querySelector('#roll-breakdown-display');
    const historyList = this.modal.querySelector('#roll-history-list');

    numDisplay.textContent = total;
    if (isCrit) {
      numDisplay.style.color = '#4caf50';
      breakdown.innerHTML = `<span style="color: #4caf50; font-weight: bold;">NATURAL 20! CRITICAL HIT!</span> • ${formula}`;
    } else if (isNat1) {
      numDisplay.style.color = '#f44336';
      breakdown.innerHTML = `<span style="color: #f44336; font-weight: bold;">NATURAL 1! CRITICAL MISS!</span> • ${formula}`;
    } else {
      numDisplay.style.color = 'var(--text-gold)';
      breakdown.textContent = formula;
    }

    // Add to history
    this.history.unshift({ total, formula, time: new Date().toLocaleTimeString() });
    if (this.history.length > 8) this.history.pop();

    historyList.innerHTML = this.history.map(h => `
      <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding: 2px 0;">
        <span>${h.formula}</span>
        <span style="font-weight: bold; color: var(--text-gold);">= ${h.total}</span>
      </div>
    `).join('');

    // Broadcast to shared worldState dice log
    if (typeof worldState !== 'undefined' && worldState.logDiceRoll) {
      let rollerName = 'Adventurer';
      let rollerAvatar = '🎲';
      if (worldState.prefs && worldState.prefs.dmMode) {
        rollerName = 'Dungeon Master (DM)';
        rollerAvatar = 'DM';
      } else {
        const user = typeof worldState.getActiveUser === 'function' ? worldState.getActiveUser() : null;
        const hero = typeof worldState.getActiveHero === 'function' ? worldState.getActiveHero() : null;
        if (user && hero) {
          rollerName = `${hero.name} (${user.displayName})`;
          rollerAvatar = hero.avatar || user.avatar || 'PC';
        } else if (user) {
          rollerName = user.displayName;
          rollerAvatar = user.avatar || 'PC';
        } else if (hero) {
          rollerName = hero.name;
          rollerAvatar = hero.avatar || 'PC';
        }
      }

      worldState.logDiceRoll({
        rollerName,
        rollerAvatar,
        rollType: 'dice_roller',
        label: `Polyhedral Roll (${formula})`,
        formula,
        d20Result: isCrit ? 20 : (isNat1 ? 1 : mainRoll),
        total,
        dc: null,
        success: null,
        advantageMode: this.advantageMode,
        note: ''
      });
    }
  }
}
const diceRoller = new DiceRollerModal();

  if (typeof window !== 'undefined') {
    window.APP_VERSION = '1.0';
    window.renderMapView = renderMapView;
    window.renderCombatView = renderCombatView;
    window.renderCharacterCreateView = renderCharacterCreateView;
    window.supabaseDb = supabaseDb;
    window.worldState = worldState;
  }
  // ==========================================
  // MAIN APP INITIALIZER WITH DM & PLAYER PORTAL
  // ==========================================
  function initApp() {
    const navTabs = document.querySelectorAll('.nav-tab-btn');
    const themeSelect = document.getElementById('theme-select');
    const dmToggle = document.getElementById('dm-toggle-switch');
    const dmToggleLabel = document.getElementById('dm-toggle-label');
    const audioToggle = document.getElementById('audio-toggle-btn');
    const searchTrigger = document.getElementById('search-trigger-btn');
    const searchModal = document.getElementById('search-modal');
    const searchInput = document.getElementById('global-search-input');
    const searchResults = document.getElementById('global-search-results');
    const closeSearchBtn = document.getElementById('close-search-modal');

    // DM Auth Modal DOM elements
    const dmAuthModal = document.getElementById('dm-auth-modal');
    const dmModalCard = document.getElementById('dm-modal-card');
    const dmPwInput = document.getElementById('dm-password-input');
    const dmAuthError = document.getElementById('dm-auth-error');
    const closeDmAuthBtn = document.getElementById('close-dm-auth-modal');
    const cancelDmAuthBtn = document.getElementById('cancel-dm-auth-btn');
    const submitDmAuthBtn = document.getElementById('submit-dm-auth-btn');

    // Player Auth Modal & Header DOM elements
    const playerAuthModal = document.getElementById('player-auth-modal');
    const playerAccountContainer = document.getElementById('player-account-container');
    const closePlayerAuthBtn = document.getElementById('close-player-auth-modal');
    const tabLoginBtn = document.getElementById('tab-login-btn');
    const tabRegisterBtn = document.getElementById('tab-register-btn');
    const loginForm = document.getElementById('player-login-form');
    const registerForm = document.getElementById('player-register-form');
    const authAlertBox = document.getElementById('auth-alert-box');
    const regClaimCharSelect = document.getElementById('reg-claim-char');
    const cancelLoginBtn = document.getElementById('cancel-login-modal');
    const cancelRegisterBtn = document.getElementById('cancel-register-modal');

    const viewContainers = {
      map: document.getElementById('view-map'),
      combat: document.getElementById('view-combat'),
      social: document.getElementById('view-social'),
      hero: document.getElementById('view-hero'),
      party: document.getElementById('view-party'),
      'create-hero': document.getElementById('view-create-hero'),
      pantheon: document.getElementById('view-pantheon'),
      characters: document.getElementById('view-characters'),
      factions: document.getElementById('view-factions'),
      bastions: document.getElementById('view-bastions'),
      lexicon: document.getElementById('view-lexicon'),
      masteries: document.getElementById('view-masteries'),
      timeline: document.getElementById('view-timeline'),
      quests: document.getElementById('view-quests'),
      editor: document.getElementById('view-editor')
    };

    function switchTab(tabId) {
      worldState.setActiveTab(tabId);
      navTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-tab') === tabId));
      Object.keys(viewContainers).forEach(key => {
        if (viewContainers[key]) {
          viewContainers[key].classList.toggle('active', key === tabId);
        }
      });
      refreshView(tabId);
    }

    function refreshView(tabId) {
      const container = viewContainers[tabId];
      if (!container) return;
      switch (tabId) {
        case 'map': renderMapView(container); break;
        case 'combat': renderCombatView(container); break;
        case 'social': renderSocialView(container); break;
        case 'hero': if (typeof renderHeroView === 'function') renderHeroView(container); else if (typeof renderPlayerHeroView === 'function') renderPlayerHeroView(container); break;
        case 'party': renderPartyView(container); break;
        case 'create-hero': renderCharacterCreateView(container); break;
        case 'pantheon': renderPantheonView(container); break;
        case 'characters': renderCharacterView(container); break;
        case 'factions': renderFactionView(container); break;
        case 'bastions': renderBastionView(container); break;
        case 'lexicon': renderLexiconView(container); break;
        case 'masteries': renderMasteryView(container); break;
        case 'timeline': renderTimelineView(container); break;
        case 'quests': renderQuestView(container); break;
        case 'editor': renderEditorView(container); break;
      }
    }

    navTabs.forEach(tab => {
      tab.addEventListener('click', () => switchTab(tab.getAttribute('data-tab')));
    });

    if (themeSelect) {
      themeSelect.addEventListener('change', (e) => worldState.setTheme(e.target.value));
      themeSelect.value = worldState.prefs.theme || 'theme-obsidian';
      document.documentElement.className = worldState.prefs.theme || 'theme-obsidian';
    }

    // ==========================================
    // PLAYER ACCOUNT HEADER & AUTH PORTAL LOGIC
    // ==========================================
    function updatePlayerAuthUi() {
      if (!playerAccountContainer) return;
      const user = worldState.getActiveUser();
      const hero = worldState.getActiveHero();

      if (user) {
        playerAccountContainer.innerHTML = `
          <div class="player-user-pill">
            <span><strong>${user.displayName}</strong></span>
            ${hero ? `<span style="font-size: 0.75rem; color: var(--text-gold); cursor: pointer;" id="header-hero-link" title="Open ${hero.name}'s Sheet & Journal">(${hero.name})</span>` : ''}
            <button class="btn-tiny" id="header-logout-btn" title="Sign Out" style="margin-left: 0.25rem; font-size: 0.7rem; color: #ff8a80;">Sign Out</button>
          </div>
        `;
        const link = playerAccountContainer.querySelector('#header-hero-link');
        if (link) link.addEventListener('click', () => switchTab('hero'));
        const lBtn = playerAccountContainer.querySelector('#header-logout-btn');
        if (lBtn) lBtn.addEventListener('click', () => {
          worldState.logoutUser();
          updatePlayerAuthUi();
          refreshView(worldState.prefs.activeTab);
        });
      } else {
        playerAccountContainer.innerHTML = `
          <button class="player-account-btn" id="open-player-auth-btn" title="Log in or register your adventurer account">
            <span>Sign In / Join</span>
          </button>
        `;
        const pBtn = playerAccountContainer.querySelector('#open-player-auth-btn');
        if (pBtn) pBtn.addEventListener('click', openPlayerModal);
      }
    }

    function openPlayerModal() {
      if (!playerAuthModal) return;
      populateClaimCharDropdown();
      authAlertBox.style.display = 'none';
      playerAuthModal.classList.add('active');
      setAuthTab('login');
      setTimeout(() => {
        const u = document.getElementById('login-username');
        if (u) u.focus();
      }, 100);
    }

    function closePlayerModal() {
      if (playerAuthModal) playerAuthModal.classList.remove('active');
    }

    function populateClaimCharDropdown() {
      if (!regClaimCharSelect) return;
      const chars = worldState.data.partyCharacters || [];
      regClaimCharSelect.innerHTML = '<option value="">-- Create or select hero later --</option>' +
        chars.map(c => `<option value="${c.id}">${c.name} (${c.classRole}, Lvl ${c.level || 1})</option>`).join('');
    }

    function setAuthTab(tab) {
      if (tab === 'login') {
        tabLoginBtn.classList.add('active');
        tabRegisterBtn.classList.remove('active');
        loginForm.style.display = 'flex';
        registerForm.style.display = 'none';
      } else {
        tabRegisterBtn.classList.add('active');
        tabLoginBtn.classList.remove('active');
        registerForm.style.display = 'flex';
        loginForm.style.display = 'none';
        populateClaimCharDropdown();
      }
    }

    if (tabLoginBtn) tabLoginBtn.addEventListener('click', () => setAuthTab('login'));
    if (tabRegisterBtn) tabRegisterBtn.addEventListener('click', () => setAuthTab('register'));
    if (closePlayerAuthBtn) closePlayerAuthBtn.addEventListener('click', closePlayerModal);
    if (cancelLoginBtn) cancelLoginBtn.addEventListener('click', closePlayerModal);
    if (cancelRegisterBtn) cancelRegisterBtn.addEventListener('click', closePlayerModal);

    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const u = document.getElementById('login-username').value;
        const p = document.getElementById('login-password').value;
        const res = worldState.loginUser(u, p);
        if (res.success) {
          soundEngine.playDiceRoll(true);
          closePlayerModal();
          updatePlayerAuthUi();
          switchTab('hero');
        } else {
          authAlertBox.style.display = 'block';
          authAlertBox.style.background = 'rgba(244, 67, 54, 0.2)';
          authAlertBox.style.border = '1px solid #f44336';
          authAlertBox.style.color = '#ff8a80';
          authAlertBox.textContent = res.error;
        }
      });
    }

    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const u = document.getElementById('reg-username').value;
        const d = document.getElementById('reg-displayname').value;
        const p = document.getElementById('reg-password').value;
        const a = document.getElementById('reg-avatar').value;
        const c = document.getElementById('reg-claim-char').value;

        const res = worldState.registerUser(u, p, d, a, c);
        if (res.success) {
          soundEngine.playDiceRoll(true);
          closePlayerModal();
          updatePlayerAuthUi();
          switchTab('hero');
        } else {
          authAlertBox.style.display = 'block';
          authAlertBox.style.background = 'rgba(244, 67, 54, 0.2)';
          authAlertBox.style.border = '1px solid #f44336';
          authAlertBox.style.color = '#ff8a80';
          authAlertBox.textContent = res.error;
        }
      });
    }

    // DM UI Updates
    function updateDmUi(isDm) {
      dmToggle.classList.toggle('active', isDm);
      dmToggleLabel.textContent = isDm ? 'DM Environment (Active)' : 'Player Environment';
    }

    // DM Toggle / Auth Logic
    if (dmToggle) {
      dmToggle.addEventListener('click', () => {
        if (worldState.prefs.dmMode) {
          worldState.setDmMode(false);
          updateDmUi(false);
        } else {
          dmPwInput.value = '';
          dmAuthError.style.display = 'none';
          dmAuthModal.classList.add('active');
          setTimeout(() => dmPwInput.focus(), 100);
        }
      });
      updateDmUi(worldState.prefs.dmMode);
    }

    function closeDmModal() {
      dmAuthModal.classList.remove('active');
      dmPwInput.value = '';
      dmAuthError.style.display = 'none';
    }

    function handleDmUnlock() {
      const entered = dmPwInput.value;
      if (worldState.checkDmPassword(entered)) {
        worldState.setDmMode(true);
        updateDmUi(true);
        closeDmModal();
        soundEngine.playDiceRoll(true);
      } else {
        dmAuthError.style.display = 'block';
        dmModalCard.classList.remove('shake-anim');
        void dmModalCard.offsetWidth;
        dmModalCard.classList.add('shake-anim');
      }
    }

    if (closeDmAuthBtn) closeDmAuthBtn.addEventListener('click', closeDmModal);
    if (cancelDmAuthBtn) cancelDmAuthBtn.addEventListener('click', closeDmModal);
    if (submitDmAuthBtn) submitDmAuthBtn.addEventListener('click', handleDmUnlock);

    if (dmPwInput) {
      dmPwInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleDmUnlock();
      });
    }

    if (audioToggle) {
      audioToggle.addEventListener('click', () => {
        const isMuted = !soundEngine.isMuted;
        soundEngine.setMuted(isMuted);
        audioToggle.classList.toggle('active', !isMuted);
        audioToggle.textContent = isMuted ? 'Muted' : 'Audio';
      });
    }

    function openSearch() {
      searchModal.classList.add('active');
      searchInput.value = '';
      searchResults.innerHTML = '';
      setTimeout(() => searchInput.focus(), 100);
    }

    if (searchTrigger) searchTrigger.addEventListener('click', openSearch);
    if (closeSearchBtn) closeSearchBtn.addEventListener('click', () => searchModal.classList.remove('active'));

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const term = e.target.value.trim().toLowerCase();
        if (!term) { searchResults.innerHTML = ''; return; }
        const matches = [];
        worldState.data.regions.forEach(r => {
          if (r.name.toLowerCase().includes(term) || r.domain.toLowerCase().includes(term)) {
            matches.push({ title: r.name, type: 'Region (' + r.domain + ')', tab: 'map' });
          }
        });
        if (worldState.data.partyCharacters) {
          worldState.data.partyCharacters.forEach(pc => {
            if (pc.name.toLowerCase().includes(term) || pc.classRole.toLowerCase().includes(term) || (pc.playerName && pc.playerName.toLowerCase().includes(term))) {
              matches.push({ title: pc.name + ' (' + pc.classRole + ')', type: 'Party Hero', tab: 'hero' });
            }
          });
        }
        if (worldState.data.journalEntries) {
          worldState.data.journalEntries.forEach(j => {
            if (j.title.toLowerCase().includes(term) || j.notes.toLowerCase().includes(term) || j.day.toLowerCase().includes(term)) {
              matches.push({ title: j.day + ': ' + j.title, type: 'Campaign Journal Entry', tab: 'hero' });
            }
          });
        }
        if (worldState.data.pantheon) {
          worldState.data.pantheon.forEach(d => {
            if (d.name.toLowerCase().includes(term) || d.title.toLowerCase().includes(term) || d.clericDomains.toLowerCase().includes(term)) {
              matches.push({ title: d.name + ' (' + d.title + ')', type: 'Deity [' + d.category + ']', tab: 'pantheon' });
            }
          });
        }
        worldState.data.characters.forEach(c => {
          if (c.name.toLowerCase().includes(term) || c.title.toLowerCase().includes(term)) {
            matches.push({ title: c.name, type: 'Champion (' + c.classRole + ')', tab: 'characters' });
          }
        });
        worldState.data.factions.forEach(f => {
          if (f.name.toLowerCase().includes(term)) {
            matches.push({ title: f.name, type: 'Faction', tab: 'factions' });
          }
        });
        searchResults.innerHTML = matches.map(m => `
          <li class="search-result-item" data-tab="${m.tab}">
            <span class="result-title">${m.title}</span>
            <span class="result-type">${m.type}</span>
          </li>
        `).join('');
        searchResults.querySelectorAll('.search-result-item').forEach(item => {
          item.addEventListener('click', () => {
            searchModal.classList.remove('active');
            switchTab(item.getAttribute('data-tab'));
          });
        });
      });
    }

    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openSearch();
      }
      if (e.key === 'Escape') {
        if (searchModal) searchModal.classList.remove('active');
        if (dmAuthModal) closeDmModal();
        if (playerAuthModal) closePlayerModal();
        if (isGameUnlocked && gameSelectModal) closeGameSelectModal();
        diceRoller.close();
      }
    });

    // ==========================================
    // CAMPAIGN SELECTION TILE SYSTEM & PASSWORD PORTAL
    // ==========================================
    const gameSelectModal = document.getElementById('game-select-modal');
    const closeGameSelectBtn = document.getElementById('close-game-select-modal');
    const gameSwitcherBtn = document.getElementById('game-switcher-btn');
    const headerActiveGameName = document.getElementById('header-active-game-name');
    const gameTilesView = document.getElementById('game-tiles-view');
    const gameTilesGrid = document.getElementById('game-tiles-grid');
    const gamePasswordView = document.getElementById('game-password-view');
    const targetGameTitle = document.getElementById('target-game-title');
    const targetGameSubtitle = document.getElementById('target-game-subtitle');
    const gamePasswordForm = document.getElementById('game-password-form');
    const gamePasswordInput = document.getElementById('game-password-input');
    const gamePasswordError = document.getElementById('game-password-error');
    const toggleGamePwBtn = document.getElementById('toggle-game-pw-btn');
    const backToTilesBtn = document.getElementById('back-to-tiles-btn');
    const cancelPasswordBtn = document.getElementById('cancel-password-btn');

    let pendingGameId = 'demo';
    let isGameUnlocked = false;

    function renderGameTiles() {
      if (!gameTilesGrid) return;
      const games = worldState.games || [];
      const activeGame = worldState.getActiveGame();

      gameTilesGrid.innerHTML = games.map(g => {
        const isActive = g.id === activeGame.id;
        return `
          <div class="game-tile-card ${isActive ? 'is-active' : ''}" data-game-id="${g.id}">
            <div class="game-tile-badge ${g.status}">${g.tag || (isActive ? 'Active Demo' : 'Slot')}</div>
            <div class="game-tile-header">
              <span class="game-tile-icon">✦</span>
              <h4 class="game-tile-title">${g.name}</h4>
            </div>
            <p class="game-tile-desc">${g.description}</p>
            <div class="game-tile-meta">
              <span>📜 ${g.system}</span>
              <span>🗺️ ${g.regionsCount} Regions</span>
              <span>⚔️ ${g.partyCount ? g.partyCount + ' Heroes' : 'Open Slot'}</span>
            </div>
            <button type="button" class="btn btn-sm btn-tile-select ${isActive ? 'btn-primary' : ''}" data-game-id="${g.id}">
              ${isActive ? 'Enter Active Campaign ✦' : 'Select Campaign &rarr;'}
            </button>
          </div>
        `;
      }).join('');

      gameTilesGrid.querySelectorAll('.game-tile-card').forEach(card => {
        card.addEventListener('click', () => {
          const gameId = card.getAttribute('data-game-id');
          openPasswordPrompt(gameId);
        });
      });
    }

    function openPasswordPrompt(gameId) {
      pendingGameId = gameId || 'demo';
      const game = (worldState.games || []).find(g => g.id === pendingGameId) || worldState.getActiveGame();

      if (targetGameTitle) targetGameTitle.textContent = game.name;
      if (targetGameSubtitle) targetGameSubtitle.textContent = game.subtitle;
      if (gamePasswordError) gamePasswordError.style.display = 'none';
      if (gamePasswordInput) {
        gamePasswordInput.value = '';
        setTimeout(() => gamePasswordInput.focus(), 80);
      }

      if (gameTilesView) gameTilesView.style.display = 'none';
      if (gamePasswordView) gamePasswordView.style.display = 'block';
    }

    function showTilesView() {
      if (gamePasswordView) gamePasswordView.style.display = 'none';
      if (gameTilesView) gameTilesView.style.display = 'block';
      renderGameTiles();
    }

    async function handleGamePasswordSubmit(e) {
      if (e) e.preventDefault();
      const entered = (gamePasswordInput ? gamePasswordInput.value : '').trim();

      if (!entered) {
        showGamePasswordError('Please enter the campaign password.');
        return;
      }

      const isValid = await worldState.verifyGamePasswordAsync(pendingGameId, entered);
      if (isValid) {
        isGameUnlocked = true;
        worldState.setActiveGame(pendingGameId);
        updateHeaderGameName();

        if (gameSelectModal) {
          gameSelectModal.classList.remove('active');
          if (closeGameSelectBtn) closeGameSelectBtn.style.display = 'inline-block';
        }

        if (typeof soundEngine !== 'undefined' && soundEngine.play) {
          try { soundEngine.play('dice'); } catch (_) {}
        }
      } else {
        showGamePasswordError('Incorrect campaign password. Please check your key or use "bubbles".');
        if (gamePasswordInput) {
          gamePasswordInput.classList.add('error');
          gamePasswordInput.focus();
          gamePasswordInput.select();
        }
      }
    }

    function showGamePasswordError(msg) {
      if (!gamePasswordError) return;
      gamePasswordError.textContent = msg;
      gamePasswordError.style.display = 'block';
    }

    function updateHeaderGameName() {
      if (!headerActiveGameName) return;
      const active = worldState.getActiveGame();
      headerActiveGameName.textContent = active ? (active.shortName || active.name) : 'Demo';
    }

    function openGameSelectModal() {
      if (!gameSelectModal) return;
      showTilesView();
      gameSelectModal.classList.add('active');
    }

    function closeGameSelectModal() {
      if (isGameUnlocked && gameSelectModal) {
        gameSelectModal.classList.remove('active');
      }
    }

    if (gamePasswordForm) gamePasswordForm.addEventListener('submit', handleGamePasswordSubmit);
    if (backToTilesBtn) backToTilesBtn.addEventListener('click', showTilesView);
    if (cancelPasswordBtn) cancelPasswordBtn.addEventListener('click', () => {
      if (isGameUnlocked) {
        closeGameSelectModal();
      } else {
        showTilesView();
      }
    });
    if (closeGameSelectBtn) closeGameSelectBtn.addEventListener('click', closeGameSelectModal);
    if (gameSwitcherBtn) gameSwitcherBtn.addEventListener('click', openGameSelectModal);

    if (toggleGamePwBtn && gamePasswordInput) {
      toggleGamePwBtn.addEventListener('click', () => {
        const isPw = gamePasswordInput.type === 'password';
        gamePasswordInput.type = isPw ? 'text' : 'password';
        toggleGamePwBtn.textContent = isPw ? '🔒' : '👁';
      });
    }

    // Cloud Sync Status Indicator
    const cloudSyncBadge = document.getElementById('cloud-sync-indicator');
    function updateCloudSyncBadge(status) {
      if (!cloudSyncBadge) return;
      cloudSyncBadge.className = 'cloud-sync-badge ' + status;
      const labels = {
        live: '⚡ Supabase Live',
        syncing: '☁️ Saving...',
        connecting: '☁️ Connecting...',
        offline: '💾 Local Cache',
        error: '⚠️ Sync Retry'
      };
      cloudSyncBadge.textContent = labels[status] || '☁️ Synced';
    }
    worldState.subscribeCloudStatus(updateCloudSyncBadge);

    // Initialize Game Portal on site load
    renderGameTiles();
    updateHeaderGameName();
    openGameSelectModal();

    // Hydrate from Supabase & subscribe to Realtime
    worldState.initCloud(worldState.activeGameId || 'demo').then(() => {
      renderGameTiles();
      updateHeaderGameName();
    });

    worldState.subscribe(() => {
      refreshView(worldState.prefs.activeTab);
      updatePlayerAuthUi();
      updateHeaderGameName();
    });

    diceRoller.init();
    updatePlayerAuthUi();
    if (typeof window !== 'undefined') {
      window.worldState = worldState;
    }
    switchTab(worldState.prefs.activeTab || 'map');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();

