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

  // 1.25. MAGIC COMPENDIUM & MERCHANT ARCHETYPES
/**
 * D&D 5.5e Magic Item Compendium & Dynamic Merchant Archetype Catalogs (v2.1)
 */
const MERCHANT_ARCHETYPES = [
  {
    id: 'shopkeeper',
    name: 'General Shopkeeper',
    icon: '🏪',
    defaultShopName: 'The Crossroads Outfitter',
    defaultMerchantName: 'Bramwell Copperkettle',
    greeting: '"Packs, torches, rope, and a few oddities from passing caravans. Everything an adventurer needs!"',
    defaultMaxRarity: 'Uncommon',
    includeMagicDefault: true
  },
  {
    id: 'alchemist',
    name: 'Alchemist & Apothecary',
    icon: '⚗️',
    defaultShopName: 'The Bubbling Alembic',
    defaultMerchantName: 'Vespera Nightbloom',
    greeting: '"Mind the green vials — they bite back. Potions, poultices, and elixirs brewed fresh at dawn."',
    defaultMaxRarity: 'Rare',
    includeMagicDefault: true
  },
  {
    id: 'blacksmith',
    name: 'Blacksmith & Armorer',
    icon: '⚒️',
    defaultShopName: 'Ironheart Forge & Anvil',
    defaultMerchantName: 'Torin Emberforge',
    greeting: '"Steel tempered in dragon-coal. If it breaks in battle, bring me the hilt and I will forge it twice as strong."',
    defaultMaxRarity: 'Rare',
    includeMagicDefault: true
  },
  {
    id: 'tailor',
    name: 'Tailor & Clothier',
    icon: '🧵',
    defaultShopName: 'The Gilded Spindle',
    defaultMerchantName: 'Madame Mireille Silkbough',
    greeting: '"Fine silks, weatherproof cloaks, and enchantments woven subtly into every hem."',
    defaultMaxRarity: 'Rare',
    includeMagicDefault: true
  },
  {
    id: 'arcanist',
    name: 'Arcane Enchanter & Scribe',
    icon: '🔮',
    defaultShopName: 'Aether & Quill Curios',
    defaultMerchantName: 'Archivist Orin Vance',
    greeting: '"Scrolls, staves, focuses, and rings attuned to the ley-currents. Please do not touch the floating orbs."',
    defaultMaxRarity: 'Very Rare',
    includeMagicDefault: true
  },
  {
    id: 'fence',
    name: 'Black Market Fence',
    icon: '🗡️',
    defaultShopName: 'The Velvet Alley Backroom',
    defaultMerchantName: 'Sable "No-Questions" Vex',
    greeting: '"Keep your voice low and your coin purse heavy. You did not buy these from me."',
    defaultMaxRarity: 'Very Rare',
    includeMagicDefault: true
  },
  {
    id: 'relic_peddler',
    name: 'Traveling Relic Peddler',
    icon: '🐪',
    defaultShopName: 'Wandering Bazaar of Oddities',
    defaultMerchantName: 'Zephyr the Star-Bound',
    greeting: '"From sunken citadels and astral vaults — my wagon moves at sunrise, so claim your destiny tonight!"',
    defaultMaxRarity: 'Legendary',
    includeMagicDefault: true
  }
];
const MUNDANE_VENDOR_CATALOG = [
  // Shopkeeper / General
  { id: 'mun-explorers-pack', name: "Explorer's Pack", category: 'gear', rarity: 'Mundane', isMagic: false, priceGp: 10, stock: 5, merchantTypes: ['shopkeeper'], notes: 'Backpack, bedroll, mess kit, tinderbox, 10 torches, 10 rations, waterskin, 50ft rope.' },
  { id: 'mun-healers-kit', name: "Healer's Kit", category: 'gear', rarity: 'Mundane', isMagic: false, priceGp: 5, stock: 6, merchantTypes: ['shopkeeper', 'alchemist'], notes: '10 uses. Stabilize a dying creature without a Medicine check.' },
  { id: 'mun-hooded-lantern', name: 'Hooded Lantern', category: 'gear', rarity: 'Mundane', isMagic: false, priceGp: 5, stock: 4, merchantTypes: ['shopkeeper'], notes: 'Bright light 30ft, dim light +30ft for 6 hours per pint of oil.' },
  { id: 'mun-silk-rope', name: 'Silk Rope (50 ft)', category: 'gear', rarity: 'Mundane', isMagic: false, priceGp: 10, stock: 5, merchantTypes: ['shopkeeper', 'tailor'], notes: 'Lightweight 5 lb rope, 2 HP, DC 17 Strength to burst.' },
  { id: 'mun-rations', name: 'Trail Rations (5 Days)', category: 'gear', rarity: 'Mundane', isMagic: false, priceGp: 3, stock: 12, merchantTypes: ['shopkeeper'], notes: 'Dry travel fare for overland journeys.' },
  { id: 'mun-climbers-kit', name: "Climber's Kit", category: 'gear', rarity: 'Mundane', isMagic: false, priceGp: 25, stock: 3, merchantTypes: ['shopkeeper', 'blacksmith'], notes: 'Pitons, boot tips, gloves, and harness for anchoring climbs.' },
  // Alchemist
  { id: 'mun-antitoxin', name: 'Antitoxin Vial', category: 'potion', rarity: 'Mundane', isMagic: false, priceGp: 50, stock: 4, merchantTypes: ['alchemist', 'shopkeeper'], notes: 'Advantage on saving throws against poison for 1 hour.' },
  { id: 'mun-alchemists-fire', name: "Alchemist's Fire (Flask)", category: 'potion', rarity: 'Mundane', isMagic: false, priceGp: 50, stock: 4, merchantTypes: ['alchemist', 'fence'], notes: 'Ranged throw 20ft; target takes 1d4 fire damage at start of each turn until extinguished.' },
  { id: 'mun-acid-vial', name: 'Acid Vial', category: 'potion', rarity: 'Mundane', isMagic: false, priceGp: 25, stock: 5, merchantTypes: ['alchemist', 'fence'], notes: 'Ranged throw 20ft; deals 2d6 acid damage on hit.' },
  { id: 'mun-holy-water', name: 'Holy Water (Flask)', category: 'potion', rarity: 'Mundane', isMagic: false, priceGp: 25, stock: 4, merchantTypes: ['alchemist', 'arcanist'], notes: 'Deals 2d6 radiant damage to fiends and undead.' },
  { id: 'mun-herbalism-kit', name: 'Herbalism Kit', category: 'gear', rarity: 'Mundane', isMagic: false, priceGp: 5, stock: 3, merchantTypes: ['alchemist'], notes: 'Required to brew Potions of Healing and antitoxins.' },
  // Blacksmith
  { id: 'mun-longsword', name: 'Masterwork Longsword', category: 'weapon', rarity: 'Mundane', isMagic: false, priceGp: 15, stock: 4, damageDice: '1d8', merchantTypes: ['blacksmith'], notes: '1d8 slashing (Versatile 1d10), Sap Mastery.' },
  { id: 'mun-greatsword', name: 'Tempered Greatsword', category: 'weapon', rarity: 'Mundane', isMagic: false, priceGp: 50, stock: 2, damageDice: '2d6', merchantTypes: ['blacksmith'], notes: '2d6 slashing, Heavy, Two-Handed, Graze Mastery.' },
  { id: 'mun-longbow', name: 'Yew Longbow + 20 Arrows', category: 'weapon', rarity: 'Mundane', isMagic: false, priceGp: 51, stock: 3, damageDice: '1d8', merchantTypes: ['blacksmith', 'shopkeeper'], notes: '1d8 piercing, 150/600ft, Slow Mastery.' },
  { id: 'mun-shield', name: 'Steel Heater Shield', category: 'shield', rarity: 'Mundane', isMagic: false, priceGp: 10, stock: 5, acBonus: 2, merchantTypes: ['blacksmith'], notes: '+2 AC while wielded.' },
  { id: 'mun-breastplate', name: 'Breastplate Armor', category: 'armor', rarity: 'Mundane', isMagic: false, priceGp: 400, stock: 2, baseAc: 14, armorType: 'medium', merchantTypes: ['blacksmith'], notes: 'AC 14 + DEX (max 2). No Stealth disadvantage.' },
  { id: 'mun-half-plate', name: 'Half Plate Armor', category: 'armor', rarity: 'Mundane', isMagic: false, priceGp: 750, stock: 1, baseAc: 15, armorType: 'medium', merchantTypes: ['blacksmith'], notes: 'AC 15 + DEX (max 2).' },
  { id: 'mun-plate-armor', name: 'Full Plate Armor', category: 'armor', rarity: 'Mundane', isMagic: false, priceGp: 1500, stock: 1, baseAc: 18, armorType: 'heavy', merchantTypes: ['blacksmith'], notes: 'AC 18 (Requires STR 15).' },
  // Tailor
  { id: 'mun-fine-clothes', name: 'Noble Courtier Attire', category: 'wondrous', rarity: 'Mundane', isMagic: false, priceGp: 15, stock: 4, merchantTypes: ['tailor'], notes: 'Tailored velvet & gold trim; grants social credibility at high courts.' },
  { id: 'mun-travel-cloak', name: 'Fur-Lined Weather Cloak', category: 'wondrous', rarity: 'Mundane', isMagic: false, priceGp: 12, stock: 6, merchantTypes: ['tailor', 'shopkeeper'], notes: 'Protects against freezing rain and harsh mountain winds.' },
  { id: 'mun-studded-leather', name: 'Tailored Studded Leather', category: 'armor', rarity: 'Mundane', isMagic: false, priceGp: 45, stock: 3, baseAc: 12, armorType: 'light', merchantTypes: ['tailor', 'blacksmith', 'fence'], notes: 'AC 12 + DEX mod. Supple dark-dyed leather.' },
  { id: 'mun-weavers-kit', name: "Weaver's & Disguise Fabrics", category: 'gear', rarity: 'Mundane', isMagic: false, priceGp: 25, stock: 3, merchantTypes: ['tailor', 'fence'], notes: 'Reversible cloaks, dyes, and theatrical garments.' },
  // Arcanist
  { id: 'mun-arcane-focus', name: 'Crystal Arcane Focus', category: 'wondrous', rarity: 'Mundane', isMagic: false, priceGp: 10, stock: 5, merchantTypes: ['arcanist'], notes: 'Channeled spellcasting focus for Wizards, Sorcerers & Warlocks.' },
  { id: 'mun-spellbook', name: 'Gilded Blank Spellbook', category: 'gear', rarity: 'Mundane', isMagic: false, priceGp: 50, stock: 3, merchantTypes: ['arcanist'], notes: '100 vellum pages bound in dragon-embossed leather.' },
  { id: 'mun-component-pouch', name: 'Component Pouch', category: 'gear', rarity: 'Mundane', isMagic: false, priceGp: 25, stock: 4, merchantTypes: ['arcanist', 'alchemist'], notes: 'Watertight belt pouch holding standard material components.' },
  // Fence
  { id: 'mun-thieves-tools', name: "Master Thieves' Tools", category: 'gear', rarity: 'Mundane', isMagic: false, priceGp: 25, stock: 4, merchantTypes: ['fence', 'shopkeeper'], notes: 'File, lockpicks, small mirror, narrow-bladed scissors, and pliers.' },
  { id: 'mun-basic-poison', name: 'Vial of Basic Poison', category: 'potion', rarity: 'Mundane', isMagic: false, priceGp: 100, stock: 3, merchantTypes: ['fence', 'alchemist'], notes: 'Coat 1 weapon or 3 ammo; DC 10 CON save or +1d4 poison damage.' },
  { id: 'mun-caltrops', name: 'Bag of Caltrops & Smoke Pellets', category: 'gear', rarity: 'Mundane', isMagic: false, priceGp: 15, stock: 6, merchantTypes: ['fence'], notes: 'Covers a 5ft square or creates quick getaway cover.' }
];
const MAGIC_ITEM_COMPENDIUM = [
  // COMMON
  { id: 'mag-potion-healing', name: 'Potion of Healing', rarity: 'Common', category: 'Potion', attunement: false, priceGp: 50, healDice: '2d4+2', merchantTypes: ['alchemist', 'shopkeeper', 'relic_peddler'], description: 'Regain 2d4 + 2 Hit Points as a Bonus Action (D&D 5.5e).' },
  { id: 'mag-cloak-billowing', name: 'Cloak of Billowing', rarity: 'Common', category: 'Wondrous', attunement: false, priceGp: 60, merchantTypes: ['tailor', 'relic_peddler'], description: 'Use a Bonus Action to make this cloak billow dramatically even in still air.' },
  { id: 'mag-clockwork-amulet', name: 'Clockwork Amulet', rarity: 'Common', category: 'Wondrous', attunement: false, priceGp: 100, merchantTypes: ['arcanist', 'shopkeeper', 'relic_peddler'], description: 'Once per day, forgo rolling the d20 on an attack roll and take a 10 instead.' },
  { id: 'mag-moontouched-sword', name: 'Moon-Touched Longsword', rarity: 'Common', category: 'Weapon', attunement: false, priceGp: 100, damageDice: '1d8', merchantTypes: ['blacksmith', 'relic_peddler'], description: 'Unsheathed, sheds bright moonlight in a 15-foot radius and dim light for an additional 15 feet.' },
  { id: 'mag-scroll-shield', name: 'Spell Scroll (1st Level: Shield)', rarity: 'Common', category: 'Scroll', attunement: false, priceGp: 75, merchantTypes: ['arcanist', 'relic_peddler'], description: 'Single-use scroll granting +5 AC as a Reaction until the start of your next turn.' },
  { id: 'mag-ruby-warmage', name: 'Ruby of the War Mage', rarity: 'Common', category: 'Wondrous', attunement: true, priceGp: 100, merchantTypes: ['arcanist', 'blacksmith'], description: 'Attach to a simple or martial weapon to use it as a spellcasting focus.' },

  // UNCOMMON
  { id: 'mag-potion-greater-healing', name: 'Potion of Greater Healing', rarity: 'Uncommon', category: 'Potion', attunement: false, priceGp: 150, healDice: '4d4+4', merchantTypes: ['alchemist', 'relic_peddler'], description: 'Regain 4d4 + 4 Hit Points as a Bonus Action.' },
  { id: 'mag-bag-of-holding', name: 'Bag of Holding', rarity: 'Uncommon', category: 'Wondrous', attunement: false, priceGp: 400, merchantTypes: ['shopkeeper', 'arcanist', 'relic_peddler'], description: 'Extradimensional interior holds up to 500 lbs (64 cu ft) while always weighing only 15 lbs.' },
  { id: 'mag-cloak-protection', name: 'Cloak of Protection', rarity: 'Uncommon', category: 'Wondrous', attunement: true, priceGp: 500, acBonus: 1, merchantTypes: ['tailor', 'arcanist', 'relic_peddler'], description: 'Gain a +1 bonus to Armor Class and all Saving Throws while worn.' },
  { id: 'mag-boots-elvenkind', name: 'Boots of Elvenkind', rarity: 'Uncommon', category: 'Wondrous', attunement: false, priceGp: 400, merchantTypes: ['tailor', 'fence', 'relic_peddler'], description: 'Your steps make no sound; gain Advantage on Dexterity (Stealth) checks made to move silently.' },
  { id: 'mag-cloak-elvenkind', name: 'Cloak of Elvenkind', rarity: 'Uncommon', category: 'Wondrous', attunement: true, priceGp: 450, merchantTypes: ['tailor', 'fence'], description: 'Pull hood up to give Wisdom (Perception) checks to see you Disadvantage and your Stealth checks Advantage.' },
  { id: 'mag-weapon-plus1', name: '+1 Enchanted Weapon', rarity: 'Uncommon', category: 'Weapon', attunement: false, priceGp: 450, damageDice: '1d8+1', merchantTypes: ['blacksmith', 'relic_peddler'], description: 'Gain a +1 bonus to attack and damage rolls made with this magic weapon.' },
  { id: 'mag-shield-plus1', name: '+1 Sentinel Shield', rarity: 'Uncommon', category: 'Armor', attunement: false, priceGp: 450, acBonus: 3, merchantTypes: ['blacksmith'], description: 'Provides +3 total AC (+2 shield + 1 magic) and sharpens battlefield awareness.' },
  { id: 'mag-pearl-power', name: 'Pearl of Power', rarity: 'Uncommon', category: 'Wondrous', attunement: true, priceGp: 450, merchantTypes: ['arcanist', 'relic_peddler'], description: 'Once per dawn, regain one expended spell slot of up to 3rd level.' },
  { id: 'mag-wand-magic-missiles', name: 'Wand of Magic Missiles', rarity: 'Uncommon', category: 'Wand', attunement: false, priceGp: 450, merchantTypes: ['arcanist', 'fence', 'relic_peddler'], description: '7 charges. Expend 1+ charges to cast Magic Missile without expending a spell slot.' },
  { id: 'mag-gloves-thievery', name: 'Gloves of Thievery', rarity: 'Uncommon', category: 'Wondrous', attunement: false, priceGp: 450, merchantTypes: ['fence', 'tailor'], description: 'Invisible while worn. Grants a +5 bonus to Sleight of Hand and Thieves\' Tools checks.' },
  { id: 'mag-alchemy-jug', name: 'Alchemy Jug', rarity: 'Uncommon', category: 'Wondrous', attunement: false, priceGp: 350, merchantTypes: ['alchemist', 'shopkeeper'], description: 'Produces chosen liquids (acid, oil, wine, honey, fresh water, mayonnaise) once per day.' },
  { id: 'mag-gauntlets-ogre', name: 'Gauntlets of Ogre Power', rarity: 'Uncommon', category: 'Wondrous', attunement: true, priceGp: 500, merchantTypes: ['blacksmith', 'relic_peddler'], description: 'Your Strength score becomes 19 while you wear these gauntlets.' },
  { id: 'mag-winged-boots', name: 'Winged Boots', rarity: 'Uncommon', category: 'Wondrous', attunement: true, priceGp: 600, merchantTypes: ['tailor', 'relic_peddler'], description: 'Gain a Flying Speed equal to your Walking Speed for up to 4 hours.' },

  // RARE
  { id: 'mag-flame-tongue', name: 'Flame Tongue Longsword', rarity: 'Rare', category: 'Weapon', attunement: true, priceGp: 2500, damageDice: '1d8+2d6', merchantTypes: ['blacksmith', 'relic_peddler'], description: 'Bonus Action to ignite the blade, dealing an extra 2d6 Fire damage on every hit and shedding 40ft bright light.' },
  { id: 'mag-ring-protection', name: 'Ring of Protection', rarity: 'Rare', category: 'Ring', attunement: true, priceGp: 2000, acBonus: 1, merchantTypes: ['arcanist', 'fence', 'relic_peddler'], description: 'Gain a +1 bonus to Armor Class and all Saving Throws.' },
  { id: 'mag-ring-spell-storing', name: 'Ring of Spell Storing', rarity: 'Rare', category: 'Ring', attunement: true, priceGp: 2800, merchantTypes: ['arcanist', 'relic_peddler'], description: 'Stores up to 5 levels worth of spells cast into it, allowing the wearer to cast them later.' },
  { id: 'mag-cloak-displacement', name: 'Cloak of Displacement', rarity: 'Rare', category: 'Wondrous', attunement: true, priceGp: 2600, merchantTypes: ['tailor', 'fence', 'relic_peddler'], description: 'Projects an illusion causing attack rolls against you to have Disadvantage until you take damage this turn.' },
  { id: 'mag-potion-superior-healing', name: 'Potion of Superior Healing', rarity: 'Rare', category: 'Potion', attunement: false, priceGp: 500, healDice: '8d4+8', merchantTypes: ['alchemist', 'relic_peddler'], description: 'Regain 8d4 + 8 Hit Points as a Bonus Action.' },
  { id: 'mag-potion-invisibility', name: 'Potion of Invisibility', rarity: 'Rare', category: 'Potion', attunement: false, priceGp: 650, merchantTypes: ['alchemist', 'fence'], description: 'Become Invisible for 1 hour (ends early if you attack or cast a spell).' },
  { id: 'mag-sun-blade', name: 'Sun Blade', rarity: 'Rare', category: 'Weapon', attunement: true, priceGp: 3200, damageDice: '1d8+2', merchantTypes: ['blacksmith', 'relic_peddler'], description: '+2 Finesse blade of pure radiance dealing Radiant damage (+1d8 extra vs. Undead).' },
  { id: 'mag-wand-fireballs', name: 'Wand of Fireballs', rarity: 'Rare', category: 'Wand', attunement: true, priceGp: 2400, merchantTypes: ['arcanist', 'relic_peddler'], description: '7 charges. Cast Fireball (DC 15 DEX, 8d6 fire) by expending 1+ charges.' },
  { id: 'mag-amulet-health', name: 'Amulet of Health', rarity: 'Rare', category: 'Wondrous', attunement: true, priceGp: 2500, merchantTypes: ['alchemist', 'arcanist', 'relic_peddler'], description: 'Your Constitution score becomes 19 while you wear this amulet.' },
  { id: 'mag-armor-plus1', name: '+1 Mithral Half Plate', rarity: 'Rare', category: 'Armor', attunement: false, priceGp: 2200, baseAc: 16, armorType: 'medium', merchantTypes: ['blacksmith'], description: 'AC 16 + DEX (max 2). No Stealth disadvantage and no Strength requirement.' },

  // VERY RARE
  { id: 'mag-staff-power', name: 'Staff of Power', rarity: 'Very Rare', category: 'Staff', attunement: true, priceGp: 18000, acBonus: 2, merchantTypes: ['arcanist', 'relic_peddler'], description: '+2 AC, +2 Saves, +2 Spell Attack, 20 charges for Fireball, Lightning Bolt, Cone of Cold, Wall of Force.' },
  { id: 'mag-belt-fire-giant', name: 'Belt of Fire Giant Strength', rarity: 'Very Rare', category: 'Wondrous', attunement: true, priceGp: 16000, merchantTypes: ['blacksmith', 'relic_peddler'], description: 'Your Strength score becomes 25 while wearing this forged iron belt.' },
  { id: 'mag-robe-scintillating', name: 'Robe of Scintillating Colors', rarity: 'Very Rare', category: 'Wondrous', attunement: true, priceGp: 14000, merchantTypes: ['tailor', 'arcanist', 'relic_peddler'], description: '3 charges. Emit blinding prism light giving attackers Disadvantage and stunning nearby foes.' },
  { id: 'mag-potion-supreme-healing', name: 'Potion of Supreme Healing', rarity: 'Very Rare', category: 'Potion', attunement: false, priceGp: 1500, healDice: '10d4+20', merchantTypes: ['alchemist', 'relic_peddler'], description: 'Regain 10d4 + 20 Hit Points as a Bonus Action.' },
  { id: 'mag-oathbow', name: 'Oathbow', rarity: 'Very Rare', category: 'Weapon', attunement: true, priceGp: 12000, damageDice: '1d8+3d6', merchantTypes: ['blacksmith', 'fence', 'relic_peddler'], description: 'Swear an oath against a sworn enemy: Advantage on attacks and +3d6 piercing damage.' },
  { id: 'mag-cloak-arachnida', name: 'Cloak of Arachnida', rarity: 'Very Rare', category: 'Wondrous', attunement: true, priceGp: 11000, merchantTypes: ['tailor', 'fence'], description: 'Poison resistance, Climb Speed equal to walking speed, walk on ceilings, cast Web.' },

  // LEGENDARY & ARTIFACT
  { id: 'mag-holy-avenger', name: 'Holy Avenger', rarity: 'Legendary', category: 'Weapon', attunement: true, priceGp: 50000, damageDice: '1d8+3', merchantTypes: ['relic_peddler'], description: '+3 Weapon; +2d10 Radiant damage vs. Fiends & Undead; 10ft aura grants Advantage on saves vs. spells.' },
  { id: 'mag-cloak-invisibility', name: 'Cloak of Invisibility', rarity: 'Legendary', category: 'Wondrous', attunement: true, priceGp: 45000, merchantTypes: ['fence', 'relic_peddler'], description: 'Pull hood up to become Invisible for up to 2 hours even while attacking or casting spells.' },
  { id: 'mag-robe-archmagi', name: 'Robe of the Archmagi', rarity: 'Legendary', category: 'Armor', attunement: true, priceGp: 50000, baseAc: 15, armorType: 'light', merchantTypes: ['arcanist', 'tailor', 'relic_peddler'], description: 'AC 15 + DEX, Advantage on saves vs. spells, +2 Spell Save DC and Spell Attack bonus.' },
  { id: 'mag-ring-three-wishes', name: 'Ring of Three Wishes', rarity: 'Legendary', category: 'Ring', attunement: false, priceGp: 75000, merchantTypes: ['relic_peddler'], description: 'Contains 3 charges to cast the Wish spell and reshape reality itself.' },
  { id: 'mag-vorpal-sword', name: 'Vorpal Greatsword', rarity: 'Legendary', category: 'Weapon', attunement: true, priceGp: 60000, damageDice: '2d6+3', merchantTypes: ['blacksmith', 'relic_peddler'], description: '+3 Weapon; ignores Slashing resistance; rolling a natural 20 severs a foe\'s head (or deals +6d8 slashing).' },
  { id: 'mag-eye-aetheria', name: 'Heart of the Bleeding Crucible', rarity: 'Artifact', category: 'Wondrous', attunement: true, priceGp: 100000, acBonus: 2, merchantTypes: ['relic_peddler'], description: 'Mythic Aetheria Artifact: +2 AC, resistance to Fire & Cold, and once per dawn unleash an Elemental Nova (60ft radius).' }
];

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

  async fetchOfficialSubclasses() {
    if (!this.isAvailable()) return null;
    const { data, error } = await this.client
      .from('official_subclasses')
      .select('class_name, name, source_book')
      .order('id', { ascending: true });
    if (error) {
      console.warn('[Supabase] fetchOfficialSubclasses error:', error.message);
      return null;
    }
    const grouped = {};
    (data || []).forEach(row => {
      if (!grouped[row.class_name]) grouped[row.class_name] = [];
      grouped[row.class_name].push(`${row.name} (${row.source_book})`);
    });
    return grouped;
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

  async createCampaignWithPassword({ id, name, shortName, subtitle, description, password, system = 'D&D 5.5e' }) {
    if (!this.isAvailable()) return null;
    try {
      const { data, error } = await this.client.rpc('create_campaign_with_password', {
        p_id: id,
        p_name: name,
        p_short_name: shortName || name,
        p_subtitle: subtitle || '',
        p_description: description || '',
        p_password: password,
        p_system: system
      });
      if (error) {
        console.warn('[Supabase] create_campaign_with_password RPC error:', error.message);
        return { success: false, error: error.message };
      }
      return data;
    } catch (e) {
      console.warn('[Supabase] createCampaignWithPassword failed:', e);
      return { success: false, error: e.message };
    }
  }

  async uploadBattlemapImage(campaignId, file) {
    if (!this.isAvailable() || !file) return { success: false, error: 'Supabase Storage unavailable' };
    try {
      const ext = (file.name || 'map.png').split('.').pop().toLowerCase().replace(/[^a-z0-9]/g, '') || 'png';
      const path = `${campaignId || 'demo'}/battlemap_${Date.now()}.${ext}`;
      const { error } = await this.client.storage
        .from('battlemaps')
        .upload(path, file, { upsert: true, contentType: file.type || 'image/png' });
      if (error) {
        return { success: false, error: error.message };
      }
      const { data: urlData } = this.client.storage.from('battlemaps').getPublicUrl(path);
      return { success: true, url: urlData?.publicUrl || null, path };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  async uploadPortraitImage(campaignId, charId, file) {
    if (!this.isAvailable() || !file) return { success: false, error: 'Supabase Storage unavailable' };
    try {
      const ext = (file.name || 'portrait.png').split('.').pop().toLowerCase().replace(/[^a-z0-9]/g, '') || 'png';
      const path = `${campaignId || 'demo'}/${charId || 'hero'}_${Date.now()}.${ext}`;
      const { error } = await this.client.storage
        .from('portraits')
        .upload(path, file, { upsert: true, contentType: file.type || 'image/png' });
      if (error) {
        return { success: false, error: error.message };
      }
      const { data: urlData } = this.client.storage.from('portraits').getPublicUrl(path);
      return { success: true, url: urlData?.publicUrl || null, path };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  async fetchEncounterPresets(campaignId) {
    if (!this.isAvailable()) return null;
    const { data, error } = await this.client
      .from('encounter_presets')
      .select('id, name, difficulty, total_xp, snapshot, created_at')
      .eq('campaign_id', campaignId || 'demo')
      .order('created_at', { ascending: false });
    if (error) {
      console.warn('[Supabase] fetchEncounterPresets error:', error.message);
      return null;
    }
    return (data || []).map(r => ({
      id: r.id,
      name: r.name,
      difficulty: r.difficulty,
      totalXp: r.total_xp || 0,
      snapshot: r.snapshot || {},
      createdAt: r.created_at ? new Date(r.created_at).getTime() : Date.now()
    }));
  }

  async saveEncounterPreset(campaignId, preset) {
    if (!this.isAvailable() || !preset) return { success: false };
    const { error } = await this.client.from('encounter_presets').upsert({
      id: preset.id,
      campaign_id: campaignId || 'demo',
      name: preset.name,
      difficulty: preset.difficulty || 'Medium',
      total_xp: Number(preset.totalXp) || 0,
      snapshot: preset.snapshot || {},
      updated_at: new Date().toISOString()
    }, { onConflict: 'id' });
    if (error) return { success: false, error: error.message };
    return { success: true };
  }

  async deleteEncounterPreset(presetId) {
    if (!this.isAvailable()) return { success: false };
    const { error } = await this.client.from('encounter_presets').delete().eq('id', presetId);
    if (error) return { success: false, error: error.message };
    return { success: true };
  }

  async fetchCustomMonsters(campaignId) {
    if (!this.isAvailable()) return null;
    const { data, error } = await this.client
      .from('custom_monsters')
      .select('*')
      .eq('campaign_id', campaignId || 'demo')
      .order('created_at', { ascending: false });
    if (error) return null;
    return (data || []).map(r => ({
      id: r.id,
      name: r.name,
      ac: r.ac,
      hp: r.hp,
      speed: r.speed,
      attackMod: r.attack_mod,
      dmgFormula: r.dmg_formula,
      dmgType: r.dmg_type,
      crXp: r.cr_xp,
      abilities: Array.isArray(r.abilities) ? r.abilities : [],
      stats: r.stats || {},
      portraitUrl: r.portrait_url || null
    }));
  }

  async saveCustomMonster(campaignId, m) {
    if (!this.isAvailable() || !m) return { success: false };
    const { error } = await this.client.from('custom_monsters').upsert({
      id: m.id,
      campaign_id: campaignId || 'demo',
      name: m.name,
      ac: Number(m.ac) || 14,
      hp: Number(m.hp) || 30,
      speed: Number(m.speed) || 6,
      attack_mod: Number(m.attackMod) || 5,
      dmg_formula: m.dmgFormula || '1d8+3',
      dmg_type: m.dmgType || 'slashing',
      cr_xp: Number(m.crXp) || 450,
      abilities: Array.isArray(m.abilities) ? m.abilities : [],
      stats: m.stats || {},
      portrait_url: m.portraitUrl || null,
      updated_at: new Date().toISOString()
    }, { onConflict: 'id' });
    return error ? { success: false, error: error.message } : { success: true };
  }

  async deleteCustomMonster(monsterId) {
    if (!this.isAvailable()) return { success: false };
    const { error } = await this.client.from('custom_monsters').delete().eq('id', monsterId);
    return error ? { success: false, error: error.message } : { success: true };
  }

  async fetchLootChests(campaignId) {
    if (!this.isAvailable()) return null;
    const { data, error } = await this.client
      .from('loot_chests')
      .select('*')
      .eq('campaign_id', campaignId || 'demo')
      .order('created_at', { ascending: false });
    if (error) return null;
    return (data || []).map(r => ({
      id: r.id,
      title: r.title,
      gold: r.gold || 0,
      items: Array.isArray(r.items) ? r.items : [],
      status: r.status || 'open',
      createdAt: r.created_at ? new Date(r.created_at).getTime() : Date.now()
    }));
  }

  async saveLootChest(campaignId, chest) {
    if (!this.isAvailable() || !chest) return { success: false };
    const { error } = await this.client.from('loot_chests').upsert({
      id: chest.id,
      campaign_id: campaignId || 'demo',
      title: chest.title,
      gold: Number(chest.gold) || 0,
      items: Array.isArray(chest.items) ? chest.items : [],
      status: chest.status || 'open',
      updated_at: new Date().toISOString()
    }, { onConflict: 'id' });
    return error ? { success: false, error: error.message } : { success: true };
  }

  async fetchSessionRecaps(campaignId) {
    if (!this.isAvailable()) return null;
    const { data, error } = await this.client
      .from('session_recaps')
      .select('*')
      .eq('campaign_id', campaignId || 'demo')
      .order('created_at', { ascending: false });
    if (error) return null;
    return (data || []).map(r => ({
      id: r.id,
      sessionNumber: r.session_number || 1,
      title: r.title,
      summary: r.summary || '',
      highlights: Array.isArray(r.highlights) ? r.highlights : [],
      createdAt: r.created_at ? new Date(r.created_at).getTime() : Date.now()
    }));
  }

  async saveSessionRecap(campaignId, recap) {
    if (!this.isAvailable() || !recap) return { success: false };
    const { error } = await this.client.from('session_recaps').upsert({
      id: recap.id,
      campaign_id: campaignId || 'demo',
      session_number: Number(recap.sessionNumber) || 1,
      title: recap.title,
      summary: recap.summary || '',
      highlights: Array.isArray(recap.highlights) ? recap.highlights : []
    }, { onConflict: 'id' });
    return error ? { success: false, error: error.message } : { success: true };
  }

  async fetchCampaignHandouts(campaignId) {
    if (!this.isAvailable()) return null;
    const { data, error } = await this.client
      .from('campaign_handouts')
      .select('*')
      .eq('campaign_id', campaignId || 'demo')
      .order('created_at', { ascending: false });
    if (error) return null;
    return (data || []).map(r => ({
      id: r.id,
      title: r.title,
      content: r.content || '',
      imageUrl: r.image_url || null,
      targetCharId: r.target_char_id || 'ALL',
      targetLabel: r.target_label || 'All Players',
      senderName: r.sender_name || 'Dungeon Master',
      createdAt: r.created_at ? new Date(r.created_at).getTime() : Date.now()
    }));
  }

  async saveCampaignHandout(campaignId, h) {
    if (!this.isAvailable() || !h) return { success: false };
    const { error } = await this.client.from('campaign_handouts').upsert({
      id: h.id,
      campaign_id: campaignId || 'demo',
      title: h.title,
      content: h.content || '',
      image_url: h.imageUrl || null,
      target_char_id: h.targetCharId || 'ALL',
      target_label: h.targetLabel || 'All Players',
      sender_name: h.senderName || 'Dungeon Master'
    }, { onConflict: 'id' });
    return error ? { success: false, error: error.message } : { success: true };
  }

  async deleteCampaignHandout(handoutId) {
    if (!this.isAvailable()) return { success: false };
    const { error } = await this.client.from('campaign_handouts').delete().eq('id', handoutId);
    return error ? { success: false, error: error.message } : { success: true };
  }

  async savePartyLocation(campaignId, partyLocation) {
    if (!this.isAvailable() || !partyLocation) return { success: false };
    const { error } = await this.client
      .from('campaigns')
      .update({ party_location: partyLocation, updated_at: new Date().toISOString() })
      .eq('id', campaignId || 'demo');
    return error ? { success: false, error: error.message } : { success: true };
  }

  async saveWorldAtmosphere(campaignId, atmosphere) {
    if (!this.isAvailable() || !atmosphere) return { success: false };
    const { error } = await this.client
      .from('campaigns')
      .update({ world_atmosphere: atmosphere, updated_at: new Date().toISOString() })
      .eq('id', campaignId || 'demo');
    return error ? { success: false, error: error.message } : { success: true };
  }

  async saveShopInventory(campaignId, shopInventory) {
    if (!this.isAvailable() || !Array.isArray(shopInventory)) return { success: false };
    const { error } = await this.client
      .from('campaigns')
      .update({ shop_inventory: shopInventory, updated_at: new Date().toISOString() })
      .eq('id', campaignId || 'demo');
    return error ? { success: false, error: error.message } : { success: true };
  }

  async fetchCampaignQuests(campaignId) {
    if (!this.isAvailable()) return null;
    const { data, error } = await this.client
      .from('campaign_quests')
      .select('*')
      .eq('campaign_id', campaignId || 'demo')
      .order('created_at', { ascending: false });
    if (error) return null;
    return (data || []).map(r => ({
      id: r.id,
      title: r.title,
      giver: r.giver || 'Unknown Patron',
      description: r.description || '',
      rewardGold: r.reward_gold || 0,
      rewardXp: r.reward_xp || 0,
      status: r.status || 'active',
      objectives: Array.isArray(r.objectives) ? r.objectives : [],
      createdAt: r.created_at ? new Date(r.created_at).getTime() : Date.now()
    }));
  }

  async saveCampaignQuest(campaignId, q) {
    if (!this.isAvailable() || !q) return { success: false };
    const { error } = await this.client.from('campaign_quests').upsert({
      id: q.id,
      campaign_id: campaignId || 'demo',
      title: q.title,
      giver: q.giver || 'Unknown Patron',
      description: q.description || '',
      reward_gold: Number(q.rewardGold) || 0,
      reward_xp: Number(q.rewardXp) || 0,
      status: q.status || 'active',
      objectives: Array.isArray(q.objectives) ? q.objectives : [],
      updated_at: new Date().toISOString()
    }, { onConflict: 'id' });
    return error ? { success: false, error: error.message } : { success: true };
  }

  async saveAmbientAudio(campaignId, ambientAudio) {
    if (!this.isAvailable() || !ambientAudio) return { success: false };
    const { error } = await this.client
      .from('campaigns')
      .update({ ambient_audio: ambientAudio, updated_at: new Date().toISOString() })
      .eq('id', campaignId || 'demo');
    return error ? { success: false, error: error.message } : { success: true };
  }

  async saveFactionReputation(campaignId, reputation) {
    if (!this.isAvailable() || !Array.isArray(reputation)) return { success: false };
    const { error } = await this.client
      .from('campaigns')
      .update({ faction_reputation: reputation, updated_at: new Date().toISOString() })
      .eq('id', campaignId || 'demo');
    return error ? { success: false, error: error.message } : { success: true };
  }

  async saveActiveVendor(campaignId, activeVendor) {
    if (!this.isAvailable() || !activeVendor) return { success: false };
    const { error } = await this.client
      .from('campaigns')
      .update({ active_vendor: activeVendor, updated_at: new Date().toISOString() })
      .eq('id', campaignId || 'demo');
    return error ? { success: false, error: error.message } : { success: true };
  }

  async saveCustomMagicItems(campaignId, customMagicItems) {
    if (!this.isAvailable() || !Array.isArray(customMagicItems)) return { success: false };
    const { error } = await this.client
      .from('campaigns')
      .update({ custom_magic_items: customMagicItems, updated_at: new Date().toISOString() })
      .eq('id', campaignId || 'demo');
    return error ? { success: false, error: error.message } : { success: true };
  }

  async fetchCampaignChat(campaignId) {
    if (!this.isAvailable()) return null;
    const { data, error } = await this.client
      .from('campaign_chat')
      .select('*')
      .eq('campaign_id', campaignId || 'demo')
      .order('created_at', { ascending: true })
      .limit(100);
    if (error) return null;
    return (data || []).map(r => ({
      id: r.id,
      senderName: r.sender_name,
      senderRole: r.sender_role || 'player',
      recipientName: r.recipient_name || null,
      message: r.message,
      isWhisper: Boolean(r.is_whisper),
      createdAt: r.created_at ? new Date(r.created_at).getTime() : Date.now()
    }));
  }

  async sendCampaignChatMessage(campaignId, msg) {
    if (!this.isAvailable() || !msg) return { success: false };
    const { error } = await this.client.from('campaign_chat').upsert({
      id: msg.id,
      campaign_id: campaignId || 'demo',
      sender_name: msg.senderName || 'Adventurer',
      sender_role: msg.senderRole || 'player',
      recipient_name: msg.recipientName || null,
      message: msg.message,
      is_whisper: Boolean(msg.isWhisper)
    }, { onConflict: 'id' });
    return error ? { success: false, error: error.message } : { success: true };
  }

  subscribePresence(campaignId, userMeta, onPresenceSync) {
    if (!this.isAvailable()) return null;
    if (this.presenceChannel) {
      try { this.client.removeChannel(this.presenceChannel); } catch (_) {}
      this.presenceChannel = null;
    }
    const key = (userMeta && userMeta.id) ? userMeta.id : ('guest_' + Math.random().toString(36).slice(2, 8));
    const channel = this.client.channel(`campaign-presence-${campaignId || 'demo'}`, {
      config: { presence: { key } }
    });
    channel.on('presence', { event: 'sync' }, () => {
      const state = channel.presenceState();
      const online = [];
      Object.values(state).forEach(arr => {
        if (Array.isArray(arr) && arr[0]) online.push(arr[0]);
      });
      if (onPresenceSync) onPresenceSync(online);
    });
    this.presenceChannel = channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await channel.track({
          id: key,
          name: (userMeta && userMeta.name) || 'Adventurer',
          role: (userMeta && userMeta.role) || 'Player',
          onlineAt: new Date().toISOString()
        });
      }
    });
    return this.presenceChannel;
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
    this.version = '2.1';
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
      const [cloudData, remotePresets, remoteMonsters, remoteChests, remoteRecaps, remoteHandouts, remoteQuests, remoteChat] = await Promise.all([
        supabaseDb.loadCampaignData(targetId, seedData),
        supabaseDb.fetchEncounterPresets(targetId),
        supabaseDb.fetchCustomMonsters(targetId),
        supabaseDb.fetchLootChests(targetId),
        supabaseDb.fetchSessionRecaps(targetId),
        supabaseDb.fetchCampaignHandouts(targetId),
        supabaseDb.fetchCampaignQuests(targetId),
        supabaseDb.fetchCampaignChat(targetId)
      ]);
      if (cloudData) {
        this.data = cloudData;
        if (Array.isArray(remotePresets)) this.data.encounterPresets = remotePresets;
        if (Array.isArray(remoteMonsters)) this.data.customMonsters = remoteMonsters;
        if (Array.isArray(remoteChests)) this.data.lootChests = remoteChests;
        if (Array.isArray(remoteRecaps)) this.data.sessionRecaps = remoteRecaps;
        if (Array.isArray(remoteHandouts)) this.data.campaignHandouts = remoteHandouts;
        if (Array.isArray(remoteQuests)) this.data.campaignQuests = remoteQuests;
        if (Array.isArray(remoteChat)) this.data.campaignChat = remoteChat;
        this.ensureDefaults();
        this.saveData(true); // Update local cache without re-triggering cloud write
      }

      // 3b. Subscribe to Supabase Realtime Presence for live online player count
      const activeUser = this.getActiveUser();
      supabaseDb.subscribePresence(
        targetId,
        {
          id: activeUser ? activeUser.id : ('guest_' + (this.prefs.activeHeroId || 'anon')),
          name: activeUser ? activeUser.displayName : (this.prefs.dmMode ? 'Dungeon Master' : 'Adventurer'),
          role: this.prefs.dmMode ? 'DM' : 'Player'
        },
        (online) => this.updateOnlinePlayers(online)
      );

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

  async createCampaign({ name, shortName, subtitle, description, password, system = 'D&D 5.5e' }) {
    const cleanName = (name || '').trim();
    const cleanPw = (password || '').trim();
    if (!cleanName || cleanName.length < 2) return { success: false, error: 'Campaign name is required.' };
    if (!cleanPw || cleanPw.length < 2) return { success: false, error: 'Password must be at least 2 characters.' };

    const slug = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || ('camp-' + Date.now());
    const id = this.games.some(g => g.id === slug) ? `${slug}-${Date.now().toString().slice(-4)}` : slug;

    let created = {
      id,
      name: cleanName,
      shortName: (shortName || cleanName.split(' ')[0]).trim(),
      subtitle: (subtitle || 'Custom D&D 5.5e Campaign').trim(),
      description: (description || 'Custom campaign realm hosted in Supabase.').trim(),
      status: 'active',
      password: cleanPw,
      system: system || 'D&D 5.5e',
      regionsCount: 11,
      partyCount: 0,
      tag: 'Custom Campaign'
    };

    if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      const remote = await supabaseDb.createCampaignWithPassword({
        id,
        name: created.name,
        shortName: created.shortName,
        subtitle: created.subtitle,
        description: created.description,
        password: cleanPw,
        system: created.system
      });
      if (remote && remote.success && remote.campaign) {
        created = { ...created, ...remote.campaign, password: cleanPw };
      } else if (remote && remote.error) {
        return { success: false, error: remote.error };
      }
    }

    this.games.push(created);
    this.notify();
    return { success: true, campaign: created };
  }

  // ==========================================
  // STRUCTURED INVENTORY, AUTO-AC & SPELL SLOTS
  // ==========================================
  recalculateCharacterAc(char) {
    if (!char) return 10;
    const getMod = (v) => Math.floor(((parseInt(v, 10) || 10) - 10) / 2);
    const dexMod = getMod(char.stats?.dex);
    const conMod = getMod(char.stats?.con);
    const wisMod = getMod(char.stats?.wis);
    const items = Array.isArray(char.inventoryItems) ? char.inventoryItems : [];
    const equipped = items.filter(i => i.equipped);
    const armor = equipped.find(i => i.category === 'armor');
    const shield = equipped.find(i => i.category === 'shield');
    const magicBonus = equipped
      .filter(i => i.category === 'magic' && Number(i.acBonus) > 0)
      .reduce((sum, i) => sum + Number(i.acBonus), 0);

    let baseAc = 10 + dexMod;
    const clsLower = String(char.classRole || '').toLowerCase();
    if (armor) {
      const cap = armor.maxDex !== undefined ? Number(armor.maxDex) : 99;
      baseAc = (Number(armor.baseAc) || 11) + Math.min(dexMod, cap);
    } else if (clsLower.includes('barbarian')) {
      baseAc = 10 + dexMod + conMod;
    } else if (clsLower.includes('monk') && !shield) {
      baseAc = 10 + dexMod + wisMod;
    }
    char.ac = baseAc + (shield ? (Number(shield.acBonus) || 2) : 0) + magicBonus;
    return char.ac;
  }

  addInventoryItem(charId, itemData) {
    if (!this.canControlCharacter(charId)) return null;
    const char = (this.data.partyCharacters || []).find(c => c.id === charId);
    if (!char) return null;
    if (!Array.isArray(char.inventoryItems)) char.inventoryItems = [];

    // Stack identical potions
    if (itemData.category === 'potion') {
      const existing = char.inventoryItems.find(i => i.name === itemData.name);
      if (existing) {
        existing.quantity = (existing.quantity || 1) + (itemData.quantity || 1);
        this.saveData();
        return existing;
      }
    }

    const newItem = {
      ...itemData,
      id: 'item_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      quantity: itemData.quantity || 1,
      equipped: false
    };
    char.inventoryItems.push(newItem);
    this.saveData();
    return newItem;
  }

  toggleEquipItem(charId, itemId) {
    if (!this.canControlCharacter(charId)) return null;
    const char = (this.data.partyCharacters || []).find(c => c.id === charId);
    if (!char || !Array.isArray(char.inventoryItems)) return null;
    const item = char.inventoryItems.find(i => i.id === itemId);
    if (!item) return null;

    const nextEquipped = !item.equipped;
    if (nextEquipped && item.requiresAttunement) {
      const attunedCount = char.inventoryItems.filter(i => i.equipped && i.requiresAttunement).length;
      if (attunedCount >= 3) {
        return { success: false, error: 'Maximum of 3 attuned magic items reached.' };
      }
    }

    // Unequip competing armor or shield slot automatically
    if (nextEquipped && (item.category === 'armor' || item.category === 'shield')) {
      char.inventoryItems.forEach(i => {
        if (i.category === item.category && i.id !== item.id) i.equipped = false;
      });
    }

    item.equipped = nextEquipped;
    if (item.category === 'armor' || item.category === 'shield' || (item.category === 'magic' && Number(item.acBonus) > 0)) {
      this.recalculateCharacterAc(char);
    }
    if (nextEquipped && item.category === 'weapon' && item.mastery) {
      if (!Array.isArray(char.weaponMasteries)) char.weaponMasteries = [];
      const tag = `${item.mastery} (${item.name})`;
      if (!char.weaponMasteries.includes(tag)) char.weaponMasteries.push(tag);
    }

    this.saveData();
    return { success: true, item, ac: char.ac };
  }

  consumeInventoryItem(charId, itemId) {
    if (!this.canControlCharacter(charId)) return { success: false };
    const char = (this.data.partyCharacters || []).find(c => c.id === charId);
    if (!char || !Array.isArray(char.inventoryItems)) return { success: false };
    const item = char.inventoryItems.find(i => i.id === itemId);
    if (!item) return { success: false };

    let healed = 0;
    if (item.healDice) {
      const m = String(item.healDice).match(/(\d+)d(\d+)(?:\+(\d+))?/i);
      if (m) {
        const count = parseInt(m[1], 10);
        const sides = parseInt(m[2], 10);
        const bonus = parseInt(m[3] || '0', 10);
        let sum = bonus;
        for (let i = 0; i < count; i++) sum += Math.floor(Math.random() * sides) + 1;
        healed = sum;
        char.hpCurrent = Math.min(char.hpMax || 10, (char.hpCurrent || 0) + healed);
      }
    }

    item.quantity = (item.quantity || 1) - 1;
    if (item.quantity <= 0) {
      char.inventoryItems = char.inventoryItems.filter(i => i.id !== itemId);
    }

    if (healed > 0) {
      this.logDiceRoll({
        rollerName: `${char.name} (${char.playerName || 'Hero'})`,
        rollerAvatar: char.avatar || '🧪',
        rollType: 'heal',
        label: `Drank ${item.name}`,
        formula: item.healDice,
        total: healed,
        note: `Restored +${healed} HP (now ${char.hpCurrent}/${char.hpMax})`
      });
    } else {
      this.saveData();
    }
    return { success: true, healed, hpCurrent: char.hpCurrent };
  }

  removeInventoryItem(charId, itemId) {
    if (!this.canControlCharacter(charId)) return;
    const char = (this.data.partyCharacters || []).find(c => c.id === charId);
    if (!char || !Array.isArray(char.inventoryItems)) return;
    const wasAcItem = char.inventoryItems.some(i => i.id === itemId && i.equipped && (i.category === 'armor' || i.category === 'shield' || Number(i.acBonus) > 0));
    char.inventoryItems = char.inventoryItems.filter(i => i.id !== itemId);
    if (wasAcItem) this.recalculateCharacterAc(char);
    this.saveData();
  }

  updateCharacterCurrency(charId, delta = {}) {
    if (!this.canControlCharacter(charId)) return;
    const char = (this.data.partyCharacters || []).find(c => c.id === charId);
    if (!char) return;
    if (!char.currency) char.currency = { gp: 50, sp: 0, cp: 0 };
    ['gp', 'sp', 'cp'].forEach(k => {
      if (delta[k]) char.currency[k] = Math.max(0, (char.currency[k] || 0) + Number(delta[k]));
    });
    this.saveData();
  }

  spendSpellSlot(charId, slotLevel) {
    const char = (this.data.partyCharacters || []).find(c => c.id === charId);
    if (!char || !slotLevel || Number(slotLevel) <= 0) return { success: true, remaining: null };
    if (!char.spellSlots || Object.keys(char.spellSlots).length === 0) return { success: true, remaining: null };
    if (!char.spellSlotsRemaining) {
      char.spellSlotsRemaining = { ...char.spellSlots };
    }
    const key = String(slotLevel);
    const avail = Number(char.spellSlotsRemaining[key] ?? char.spellSlots[key] ?? 0);
    if (avail <= 0) {
      return { success: false, error: `No Level ${slotLevel} spell slots remaining! Take a Long Rest to recover.` };
    }
    char.spellSlotsRemaining[key] = avail - 1;
    this.saveData();
    return { success: true, remaining: char.spellSlotsRemaining[key] };
  }

  restoreSpellSlots(charId = null) {
    const chars = charId
      ? (this.data.partyCharacters || []).filter(c => c.id === charId)
      : (this.data.partyCharacters || []);
    chars.forEach(c => {
      if (c.spellSlots) c.spellSlotsRemaining = { ...c.spellSlots };
    });
    this.saveData();
  }

  saveCombatState(combatSnapshot) {
    this.data.combatState = combatSnapshot;
    this.saveData();
  }

  // ==========================================
  // ENCOUNTER PRESETS, PORTRAITS & PRESENCE
  // ==========================================
  setCharacterPortrait(charId, portraitUrl) {
    if (!this.canControlCharacter(charId)) return false;
    const char = (this.data.partyCharacters || []).find(c => c.id === charId);
    if (!char) return false;
    char.portraitUrl = portraitUrl || null;
    this.saveData();
    return true;
  }

  getEncounterPresets() {
    if (!Array.isArray(this.data.encounterPresets)) this.data.encounterPresets = [];
    return this.data.encounterPresets;
  }

  async saveEncounterPreset({ name, difficulty = 'Medium', totalXp = 0, snapshot = {} }) {
    if (!Array.isArray(this.data.encounterPresets)) this.data.encounterPresets = [];
    const preset = {
      id: 'enc_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      name: (name || 'Untitled Encounter').trim(),
      difficulty,
      totalXp: Number(totalXp) || 0,
      snapshot,
      createdAt: Date.now()
    };
    this.data.encounterPresets.unshift(preset);
    if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      await supabaseDb.saveEncounterPreset(this.activeGameId || 'demo', preset);
    }
    this.saveData(true);
    return { success: true, preset };
  }

  async deleteEncounterPreset(presetId) {
    if (!Array.isArray(this.data.encounterPresets)) return;
    this.data.encounterPresets = this.data.encounterPresets.filter(p => p.id !== presetId);
    if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      await supabaseDb.deleteEncounterPreset(presetId);
    }
    this.saveData(true);
  }

  subscribePresence(listener) {
    if (!this.presenceListeners) this.presenceListeners = [];
    this.presenceListeners.push(listener);
    listener(this.onlinePlayers || []);
    return () => {
      this.presenceListeners = this.presenceListeners.filter(l => l !== listener);
    };
  }

  updateOnlinePlayers(players) {
    this.onlinePlayers = Array.isArray(players) ? players : [];
    (this.presenceListeners || []).forEach(l => {
      try { l(this.onlinePlayers); } catch (_) {}
    });
  }

  // ==========================================
  // DEATH SAVING THROWS & STABILIZATION (5.5e)
  // ==========================================
  rollDeathSave(charId, forcedRoll = null) {
    if (!this.canControlCharacter(charId)) return { success: false, error: 'No permission' };
    const char = (this.data.partyCharacters || []).find(c => c.id === charId);
    if (!char) return { success: false, error: 'Character not found' };

    if (!char.deathSaves) char.deathSaves = { successes: 0, failures: 0, stabilized: false };
    const d20 = forcedRoll !== null ? Number(forcedRoll) : (Math.floor(Math.random() * 20) + 1);
    let outcome = '';

    if (d20 === 20) {
      char.hpCurrent = 1;
      char.deathSaves = { successes: 0, failures: 0, stabilized: false };
      outcome = 'NAT 20! Regained 1 HP and stood back up!';
    } else if (d20 === 1) {
      char.deathSaves.failures = Math.min(3, (char.deathSaves.failures || 0) + 2);
      outcome = char.deathSaves.failures >= 3 ? 'NAT 1! 2 failures — Hero has fallen.' : 'NAT 1! Suffered 2 Death Save failures.';
    } else if (d20 >= 10) {
      char.deathSaves.successes = Math.min(3, (char.deathSaves.successes || 0) + 1);
      if (char.deathSaves.successes >= 3) {
        char.deathSaves.stabilized = true;
        outcome = 'Success (3/3)! Hero is now STABILIZED.';
      } else {
        outcome = `Success (${char.deathSaves.successes}/3)`;
      }
    } else {
      char.deathSaves.failures = Math.min(3, (char.deathSaves.failures || 0) + 1);
      outcome = char.deathSaves.failures >= 3 ? 'Failure (3/3) — Hero has fallen.' : `Failure (${char.deathSaves.failures}/3)`;
    }

    this.logDiceRoll({
      rollerName: `${char.name} (${char.playerName || 'Hero'})`,
      rollerAvatar: char.avatar || '💀',
      rollType: 'death_save',
      label: 'Death Saving Throw',
      formula: `1d20 (${d20})`,
      d20Result: d20,
      total: d20,
      dc: 10,
      success: d20 >= 10,
      note: outcome
    });

    return { success: true, d20, outcome, deathSaves: char.deathSaves, hpCurrent: char.hpCurrent };
  }

  stabilizeCharacter(charId) {
    if (!this.canControlCharacter(charId)) return false;
    const char = (this.data.partyCharacters || []).find(c => c.id === charId);
    if (!char) return false;
    char.deathSaves = { successes: 3, failures: 0, stabilized: true };
    this.saveData();
    return true;
  }

  resetDeathSaves(charId) {
    const char = (this.data.partyCharacters || []).find(c => c.id === charId);
    if (!char) return;
    char.deathSaves = { successes: 0, failures: 0, stabilized: false };
    this.saveData();
  }

  // ==========================================
  // DM LOOT CHESTS & PARTY ITEM DISTRIBUTION
  // ==========================================
  getLootChests() {
    if (!Array.isArray(this.data.lootChests)) this.data.lootChests = [];
    return this.data.lootChests;
  }

  async createLootChest({ title = 'Treasure Hoard', gold = 100, items = [] }) {
    if (!Array.isArray(this.data.lootChests)) this.data.lootChests = [];
    const chest = {
      id: 'loot_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      title: title.trim() || 'Treasure Hoard',
      gold: Math.max(0, parseInt(gold, 10) || 0),
      items: items.map(it => ({ ...it, claimedBy: null })),
      status: 'open',
      createdAt: Date.now()
    };
    this.data.lootChests.unshift(chest);
    if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      await supabaseDb.saveLootChest(this.activeGameId || 'demo', chest);
    }
    this.saveData(true);
    return { success: true, chest };
  }

  async claimLootItem(chestId, itemIndex, charId) {
    const chest = this.getLootChests().find(c => c.id === chestId);
    const char = (this.data.partyCharacters || []).find(c => c.id === charId);
    if (!chest || !char || !chest.items[itemIndex] || chest.items[itemIndex].claimedBy) {
      return { success: false, error: 'Item already claimed or unavailable.' };
    }
    const lootItem = chest.items[itemIndex];
    lootItem.claimedBy = char.name;
    this.addInventoryItem(char.id, lootItem);
    if (chest.gold <= 0 && chest.items.every(i => i.claimedBy)) {
      chest.status = 'claimed';
    }
    if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      await supabaseDb.saveLootChest(this.activeGameId || 'demo', chest);
    }
    this.notify();
    return { success: true, item: lootItem, hero: char.name };
  }

  async splitLootGold(chestId) {
    const chest = this.getLootChests().find(c => c.id === chestId);
    const party = this.data.partyCharacters || [];
    if (!chest || chest.gold <= 0 || party.length === 0) return { success: false };
    const share = Math.floor(chest.gold / party.length);
    const remainder = chest.gold % party.length;
    party.forEach((p, idx) => {
      if (!p.currency) p.currency = { gp: 50, sp: 0, cp: 0 };
      p.currency.gp = (p.currency.gp || 0) + share + (idx === 0 ? remainder : 0);
    });
    const distributed = chest.gold;
    chest.gold = 0;
    if (chest.items.every(i => i.claimedBy)) chest.status = 'claimed';
    if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      await supabaseDb.saveLootChest(this.activeGameId || 'demo', chest);
    }
    this.saveData();
    return { success: true, share, distributed, partyCount: party.length };
  }

  // ==========================================
  // CUSTOM HOMEBREW MONSTER CREATOR
  // ==========================================
  getCustomMonsters() {
    if (!Array.isArray(this.data.customMonsters)) this.data.customMonsters = [];
    return this.data.customMonsters;
  }

  async createCustomMonster(monsterData) {
    if (!Array.isArray(this.data.customMonsters)) this.data.customMonsters = [];
    const monster = {
      id: 'mon_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      name: (monsterData.name || 'Custom Beast').trim(),
      ac: parseInt(monsterData.ac, 10) || 14,
      hp: parseInt(monsterData.hp, 10) || 35,
      speed: parseInt(monsterData.speed, 10) || 6,
      attackMod: parseInt(monsterData.attackMod, 10) || 5,
      dmgFormula: (monsterData.dmgFormula || '1d8+3').trim(),
      dmgType: (monsterData.dmgType || 'slashing').trim(),
      crXp: parseInt(monsterData.crXp, 10) || 450,
      abilities: Array.isArray(monsterData.abilities) ? monsterData.abilities : ['ember_hex'],
      stats: monsterData.stats || { str: 14, dex: 12, con: 14, int: 8, wis: 10, cha: 8 },
      portraitUrl: monsterData.portraitUrl || null
    };
    this.data.customMonsters.unshift(monster);
    if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      await supabaseDb.saveCustomMonster(this.activeGameId || 'demo', monster);
    }
    this.saveData(true);
    return { success: true, monster };
  }

  async deleteCustomMonster(monsterId) {
    this.data.customMonsters = this.getCustomMonsters().filter(m => m.id !== monsterId);
    if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      await supabaseDb.deleteCustomMonster(monsterId);
    }
    this.saveData(true);
  }

  // ==========================================
  // SESSION RECAP & AUTO-CHRONICLE GENERATOR
  // ==========================================
  getSessionRecaps() {
    if (!Array.isArray(this.data.sessionRecaps)) this.data.sessionRecaps = [];
    return this.data.sessionRecaps;
  }

  async generateSessionRecap(customTitle = '') {
    const recaps = this.getSessionRecaps();
    const sessionNumber = recaps.length + 1;
    const rolls = (this.data.diceRollLogs || []).slice(0, 15);
    const crits = rolls.filter(r => r.isCrit).map(r => `💥 ${r.rollerName} rolled a Natural 20 on ${r.label}!`);
    const levelUps = rolls.filter(r => r.rollType === 'level_up').map(r => `⬆️ ${r.rollerName}: ${r.label} (${r.note})`);
    const deathSaves = rolls.filter(r => r.rollType === 'death_save').map(r => `💀 ${r.rollerName}: ${r.note}`);
    const recentJournals = (this.data.journalEntries || []).slice(0, 3).map(j => `📖 ${j.day} — ${j.title} (${j.location})`);
    const recentLoot = this.getLootChests().slice(0, 2).map(c => `💰 Discovered ${c.title} (${c.items.length} items)`);

    const highlights = [...levelUps, ...crits, ...deathSaves, ...recentLoot, ...recentJournals].slice(0, 10);
    const partyNames = (this.data.partyCharacters || []).map(c => `${c.name} (Lv ${c.level || 1})`).join(', ');
    const summary = `Session #${sessionNumber} Chronicle for ${partyNames || 'the Party'}. Recorded ${rolls.length} rolls, ${levelUps.length} level-up(s), ${crits.length} critical hit(s), and ${recentJournals.length} journal entry highlight(s).`;

    const recap = {
      id: 'recap_' + Date.now(),
      sessionNumber,
      title: (customTitle || `Session ${sessionNumber}: Chronicle of Aetheria`).trim(),
      summary,
      highlights: highlights.length > 0 ? highlights : ['The party explored the Bleeding Realms and prepared for their next encounter.'],
      createdAt: Date.now()
    };

    recaps.unshift(recap);
    if (!Array.isArray(this.data.timeline)) this.data.timeline = [];
    this.data.timeline.unshift({
      id: 'tl_' + recap.id,
      era: `Session ${sessionNumber}`,
      year: new Date().toLocaleDateString(),
      title: recap.title,
      description: recap.summary + (highlights.length ? ' Highlights: ' + highlights.slice(0, 3).join(' | ') : '')
    });

    if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      await supabaseDb.saveSessionRecap(this.activeGameId || 'demo', recap);
    }
    this.saveData();
    return { success: true, recap };
  }

  // ==========================================
  // DM HANDOUTS & PRIVATE CLUE SHARING
  // ==========================================
  getHandouts(forCharId = null) {
    if (!Array.isArray(this.data.campaignHandouts)) this.data.campaignHandouts = [];
    if (!forCharId || this.prefs.dmMode) return this.data.campaignHandouts;
    return this.data.campaignHandouts.filter(h => h.targetCharId === 'ALL' || h.targetCharId === forCharId);
  }

  async sendHandout({ title, content, imageUrl = null, targetCharId = 'ALL', targetLabel = 'All Players' }) {
    if (!Array.isArray(this.data.campaignHandouts)) this.data.campaignHandouts = [];
    const handout = {
      id: 'ho_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      title: (title || 'Secret Clue').trim(),
      content: (content || '').trim(),
      imageUrl: imageUrl || null,
      targetCharId: targetCharId || 'ALL',
      targetLabel: targetLabel || (targetCharId === 'ALL' ? 'All Players' : targetCharId),
      senderName: 'Dungeon Master',
      createdAt: Date.now()
    };
    this.data.campaignHandouts.unshift(handout);
    if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      await supabaseDb.saveCampaignHandout(this.activeGameId || 'demo', handout);
    }
    this.saveData(true);
    return { success: true, handout };
  }

  async deleteHandout(handoutId) {
    this.data.campaignHandouts = this.getHandouts().filter(h => h.id !== handoutId);
    if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      await supabaseDb.deleteCampaignHandout(handoutId);
    }
    this.saveData(true);
  }

  // ==========================================
  // WORLD MAP PARTY TRACKER & TRAVEL CALCULATOR
  // ==========================================
  getPartyLocation() {
    if (!this.data.partyLocation) {
      const firstReg = (this.data.regions || [])[0];
      this.data.partyLocation = {
        regionId: firstReg ? firstReg.id : 'region-foregrove',
        regionName: firstReg ? firstReg.name : 'The Foregrove Canopy',
        travelDaysTotal: 0
      };
    }
    return this.data.partyLocation;
  }

  calculateTravel(fromRegionId, toRegionId, pace = 'normal') {
    const regions = this.data.regions || [];
    const fromR = regions.find(r => r.id === fromRegionId) || regions[0];
    const toR = regions.find(r => r.id === toRegionId);
    if (!fromR || !toR || fromR.id === toR.id) {
      return { distanceMiles: 0, travelDays: 0, rationsNeeded: 0, pace };
    }
    const fromX = (fromR.coordinates?.x ?? 50) * 10;
    const fromY = (fromR.coordinates?.y ?? 50) * 5.6;
    const toX = (toR.coordinates?.x ?? 50) * 10;
    const toY = (toR.coordinates?.y ?? 50) * 5.6;
    const pxDist = Math.hypot(toX - fromX, toY - fromY);
    const distanceMiles = Math.max(6, Math.round(pxDist * 0.45));
    const milesPerDay = pace === 'fast' ? 30 : (pace === 'slow' ? 18 : 24);
    const travelDays = Math.max(1, Math.ceil(distanceMiles / milesPerDay));
    const partyCount = Math.max(1, (this.data.partyCharacters || []).length);
    return { distanceMiles, travelDays, rationsNeeded: travelDays * partyCount, pace };
  }

  async movePartyToRegion(regionId, pace = 'normal') {
    const target = (this.data.regions || []).find(r => r.id === regionId);
    if (!target) return { success: false, error: 'Region not found' };
    const current = this.getPartyLocation();
    const travel = this.calculateTravel(current.regionId, regionId, pace);
    const updated = {
      regionId: target.id,
      regionName: target.name,
      travelDaysTotal: (current.travelDaysTotal || 0) + travel.travelDays,
      lastMove: { from: current.regionName, to: target.name, ...travel, timestamp: Date.now() }
    };
    this.data.partyLocation = updated;
    // Sync every hero's Current World Location Radar
    (this.data.partyCharacters || []).forEach(c => {
      if (!c.currentSituation) c.currentSituation = {};
      c.currentSituation.locationName = target.name;
      c.currentSituation.lastUpdatedDay = `Day ${updated.travelDaysTotal || 1}`;
    });
    if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      await supabaseDb.savePartyLocation(this.activeGameId || 'demo', updated);
    }
    this.saveData();
    return { success: true, partyLocation: updated, travel };
  }

  // ==========================================
  // PRINTABLE 5.5e CHARACTER SHEET & JSON EXPORT
  // ==========================================
  exportCharacterJson(charId) {
    const char = (this.data.partyCharacters || []).find(c => c.id === charId);
    if (!char) return null;
    return JSON.stringify(char, null, 2);
  }

  generatePrintableSheetHtml(charId) {
    const c = (this.data.partyCharacters || []).find(ch => ch.id === charId);
    if (!c) return '';
    const getMod = (v) => {
      const m = Math.floor(((parseInt(v, 10) || 10) - 10) / 2);
      return m >= 0 ? `+${m}` : `${m}`;
    };
    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${c.name} — D&D 5.5e Character Sheet</title>
      <style>body{font-family:Georgia,serif;color:#111;max-width:820px;margin:24px auto;padding:0 20px;}
      h1{margin:0;border-bottom:2px solid #9a7b2c;padding-bottom:6px;} .grid{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;margin:14px 0;text-align:center;}
      .box{border:1px solid #333;border-radius:6px;padding:8px;} .vitals{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:12px 0;text-align:center;}
      .sec{margin-top:14px;border-top:1px solid #ccc;padding-top:8px;} @media print{.no-print{display:none;}}</style></head>
      <body><div class="no-print" style="text-align:right;margin-bottom:10px;"><button onclick="window.print()">🖨️ Print / Save as PDF</button></div>
      <h1>${c.name} <span style="font-size:0.65em;font-weight:normal;">(Level ${c.level || 1} ${c.species} ${c.classRole})</span></h1>
      <div style="font-size:0.9em;color:#444;margin-top:4px;">Player: ${c.playerName || 'Adventurer'} • Alignment: ${c.alignment || 'Neutral'} • Background: ${c.background || 'Wayfarer'}</div>
      <div class="vitals">
        <div class="box"><strong>HP</strong><br>${c.hpCurrent}/${c.hpMax}</div>
        <div class="box"><strong>AC</strong><br>${c.ac}</div>
        <div class="box"><strong>Initiative</strong><br>${c.initiativeMod || '+0'}</div>
        <div class="box"><strong>Speed</strong><br>${c.speed || '30 ft'}</div>
      </div>
      <div class="grid">${['str','dex','con','int','wis','cha'].map(s => `<div class="box"><strong>${s.toUpperCase()}</strong><br>${c.stats?.[s] || 10} (${getMod(c.stats?.[s])})</div>`).join('')}</div>
      <div class="sec"><strong>Feats &amp; Features:</strong> ${(c.feats || []).concat(c.features || []).join(', ') || 'None'}</div>
      <div class="sec"><strong>Known Spells:</strong> ${(c.spells || []).join(', ') || 'None'}</div>
      <div class="sec"><strong>5.5e Weapon Masteries:</strong> ${(c.weaponMasteries || []).join(', ') || 'None'}</div>
      <div class="sec"><strong>Equipment:</strong> ${(c.inventoryItems || []).map(i => `${i.name}${i.equipped ? ' [Equipped]' : ''}`).join(', ') || (c.equipment || []).join(', ') || 'Standard Pack'}</div>
      </body></html>`;
  }

  // ==========================================
  // 18 D&D 5.5e SKILLS MATRIX (PROFICIENCY & EXPERTISE)
  // ==========================================
  getDnd55eSkills() {
    return [
      { name: 'Acrobatics', stat: 'dex' }, { name: 'Animal Handling', stat: 'wis' },
      { name: 'Arcana', stat: 'int' }, { name: 'Athletics', stat: 'str' },
      { name: 'Deception', stat: 'cha' }, { name: 'History', stat: 'int' },
      { name: 'Insight', stat: 'wis' }, { name: 'Intimidation', stat: 'cha' },
      { name: 'Investigation', stat: 'int' }, { name: 'Medicine', stat: 'wis' },
      { name: 'Nature', stat: 'int' }, { name: 'Perception', stat: 'wis' },
      { name: 'Performance', stat: 'cha' }, { name: 'Persuasion', stat: 'cha' },
      { name: 'Religion', stat: 'int' }, { name: 'Sleight of Hand', stat: 'dex' },
      { name: 'Stealth', stat: 'dex' }, { name: 'Survival', stat: 'wis' }
    ];
  }

  getSkillBonus(char, skillName) {
    const def = this.getDnd55eSkills().find(s => s.name === skillName);
    if (!char || !def) return 0;
    const baseMod = Math.floor(((parseInt(char.stats?.[def.stat], 10) || 10) - 10) / 2);
    const pb = Math.ceil((parseInt(char.level, 10) || 1) / 4) + 1;
    const rank = (char.skillProficiencies && char.skillProficiencies[skillName]) || 0; // 0=none, 1=prof, 2=expertise
    return baseMod + (rank * pb);
  }

  toggleSkillProficiency(charId, skillName) {
    if (!this.canControlCharacter(charId)) return 0;
    const char = (this.data.partyCharacters || []).find(c => c.id === charId);
    if (!char) return 0;
    if (!char.skillProficiencies) char.skillProficiencies = {};
    const next = ((char.skillProficiencies[skillName] || 0) + 1) % 3;
    char.skillProficiencies[skillName] = next;
    if (skillName === 'Perception') {
      char.passivePerception = 10 + this.getSkillBonus(char, 'Perception');
    } else if (skillName === 'Insight') {
      char.passiveInsight = 10 + this.getSkillBonus(char, 'Insight');
    }
    this.saveData();
    return next;
  }

  rollSkillCheck(charId, skillName) {
    const char = (this.data.partyCharacters || []).find(c => c.id === charId);
    if (!char) return null;
    const bonus = this.getSkillBonus(char, skillName);
    const d20 = Math.floor(Math.random() * 20) + 1;
    const total = d20 + bonus;
    const entry = this.logDiceRoll({
      rollerName: `${char.name} (${char.playerName || 'Hero'})`,
      rollerAvatar: char.avatar || '🎯',
      rollType: 'check',
      label: `${skillName} Check`,
      formula: `1d20 (${d20}) ${bonus >= 0 ? '+' : '-'} ${Math.abs(bonus)}`,
      d20Result: d20,
      total
    });
    return { d20, bonus, total, entry };
  }

  // ==========================================
  // TOWN MARKET & MERCHANT SHOP (SUPABASE)
  // ==========================================
  getShopInventory() {
    if (!Array.isArray(this.data.shopInventory) || this.data.shopInventory.length === 0) {
      this.data.shopInventory = [
        { name: 'Potion of Healing', category: 'potion', healDice: '2d4+2', priceGp: 50, stock: 6, notes: 'Regain 2d4+2 HP' },
        { name: 'Potion of Greater Healing', category: 'potion', healDice: '4d4+4', priceGp: 150, stock: 2, notes: 'Regain 4d4+4 HP' },
        { name: 'Longsword', category: 'weapon', damage: '1d8', damageType: 'slashing', mastery: 'Sap', priceGp: 15, stock: 4, notes: 'Versatile (1d10)' },
        { name: 'Longbow', category: 'weapon', damage: '1d8', damageType: 'piercing', mastery: 'Slow', priceGp: 50, stock: 3, notes: 'Range 150/600' },
        { name: 'Studded Leather', category: 'armor', armorType: 'light', baseAc: 12, maxDex: 99, priceGp: 45, stock: 3, notes: 'AC 12 + DEX' },
        { name: 'Shield', category: 'shield', acBonus: 2, priceGp: 10, stock: 5, notes: '+2 AC' },
        { name: 'Half Plate', category: 'armor', armorType: 'medium', baseAc: 15, maxDex: 2, priceGp: 750, stock: 1, notes: 'AC 15 + DEX (max 2)' },
        { name: 'Cloak of Protection', category: 'magic', acBonus: 1, requiresAttunement: true, priceGp: 500, stock: 1, notes: '+1 AC & Saves (Attunement)' }
      ];
    }
    return this.data.shopInventory;
  }

  async buyShopItem(charId, itemIndex) {
    const char = (this.data.partyCharacters || []).find(c => c.id === charId);
    const shop = this.getShopInventory();
    const item = shop[itemIndex];
    if (!char || !item) return { success: false, error: 'Item unavailable' };
    if ((item.stock || 0) <= 0) return { success: false, error: 'Out of stock' };
    if (!char.currency) char.currency = { gp: 50, sp: 0, cp: 0 };
    const discountPct = this.getMerchantDiscountPercent ? this.getMerchantDiscountPercent() : 0;
    const effectivePrice = Math.max(1, Math.round(item.priceGp * (1 - discountPct / 100)));
    if ((char.currency.gp || 0) < effectivePrice) {
      return { success: false, error: `Not enough GP (need ${effectivePrice} GP, have ${char.currency.gp || 0} GP).` };
    }
    char.currency.gp -= effectivePrice;
    item.stock -= 1;
    this.addInventoryItem(char.id, { ...item, quantity: 1 });
    if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      await supabaseDb.saveShopInventory(this.activeGameId || 'demo', shop);
    }
    return { success: true, item: item.name, paidGp: effectivePrice, discountPct, remainingGp: char.currency.gp };
  }

  sellInventoryItem(charId, itemId, baseValueGp = 20) {
    if (!this.canControlCharacter(charId)) return { success: false };
    const char = (this.data.partyCharacters || []).find(c => c.id === charId);
    if (!char || !Array.isArray(char.inventoryItems)) return { success: false };
    const item = char.inventoryItems.find(i => i.id === itemId);
    if (!item) return { success: false };
    const credit = Math.max(1, Math.floor((item.priceGp || baseValueGp) / 2));
    if (!char.currency) char.currency = { gp: 50, sp: 0, cp: 0 };
    char.currency.gp = (char.currency.gp || 0) + credit;
    this.removeInventoryItem(char.id, itemId);
    return { success: true, creditedGp: credit, newGp: char.currency.gp };
  }

  // ==========================================
  // WEATHER, TIME-OF-DAY & ATMOSPHERE (SUPABASE)
  // ==========================================
  getWorldAtmosphere() {
    if (!this.data.worldAtmosphere) {
      this.data.worldAtmosphere = { timeOfDay: 'Day', weather: 'Clear', dayCount: 1 };
    }
    return this.data.worldAtmosphere;
  }

  async setWorldAtmosphere(updates = {}) {
    const cur = this.getWorldAtmosphere();
    this.data.worldAtmosphere = { ...cur, ...updates, updatedAt: Date.now() };
    if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      await supabaseDb.saveWorldAtmosphere(this.activeGameId || 'demo', this.data.worldAtmosphere);
    }
    this.saveData(true);
    return this.data.worldAtmosphere;
  }

  // ==========================================
  // LIVE PARTY QUEST BOARD (SUPABASE)
  // ==========================================
  getQuests() {
    if (!Array.isArray(this.data.campaignQuests)) this.data.campaignQuests = [];
    return this.data.campaignQuests;
  }

  async createQuest({ title, giver = 'Guildmaster', description = '', rewardGold = 250, rewardXp = 500, objectives = [] }) {
    if (!Array.isArray(this.data.campaignQuests)) this.data.campaignQuests = [];
    const quest = {
      id: 'quest_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      title: (title || 'Untitled Quest').trim(),
      giver: (giver || 'Unknown Patron').trim(),
      description: (description || '').trim(),
      rewardGold: Number(rewardGold) || 0,
      rewardXp: Number(rewardXp) || 0,
      status: 'active',
      objectives: objectives.map(o => (typeof o === 'string' ? { text: o, done: false } : { text: o.text, done: !!o.done })),
      createdAt: Date.now()
    };
    this.data.campaignQuests.unshift(quest);
    if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      await supabaseDb.saveCampaignQuest(this.activeGameId || 'demo', quest);
    }
    this.saveData(true);
    return { success: true, quest };
  }

  async toggleQuestObjective(questId, objIndex) {
    const q = this.getQuests().find(x => x.id === questId);
    if (!q || !q.objectives[objIndex]) return false;
    q.objectives[objIndex].done = !q.objectives[objIndex].done;
    if (q.objectives.length > 0 && q.objectives.every(o => o.done)) {
      q.status = 'completed';
    }
    if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      await supabaseDb.saveCampaignQuest(this.activeGameId || 'demo', q);
    }
    this.saveData(true);
    return true;
  }

  async setQuestStatus(questId, status) {
    const q = this.getQuests().find(x => x.id === questId);
    if (!q) return false;
    q.status = status;
    if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      await supabaseDb.saveCampaignQuest(this.activeGameId || 'demo', q);
    }
    this.saveData(true);
    return true;
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

  // Faction Standing updates (with Supabase Reputation Sync & Merchant Discounts)
  getFactionStandingTier(standing = 0) {
    if (standing >= 4) return 'Sworn';
    if (standing >= 2) return 'Allied';
    if (standing <= -3) return 'Hostile';
    if (standing <= -1) return 'Wary';
    return 'Neutral';
  }

  getMerchantDiscountPercent() {
    const factions = this.data.factions || [];
    const maxStanding = factions.reduce((mx, f) => Math.max(mx, f.playerStanding || 0), 0);
    if (maxStanding >= 4) return 20;
    if (maxStanding >= 2) return 10;
    return 0;
  }

  async updatePartyStanding(factionId, delta) {
    const faction = (this.data.factions || []).find(f => f.id === factionId);
    if (!faction) return null;
    faction.playerStanding = Math.max(-5, Math.min(5, (faction.playerStanding || 0) + delta));
    const repSnapshot = (this.data.factions || []).map(f => ({
      id: f.id,
      name: f.name,
      standing: f.playerStanding || 0,
      tier: this.getFactionStandingTier(f.playerStanding || 0)
    }));
    this.data.factionReputation = repSnapshot;
    this.saveData();
    if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      await supabaseDb.saveFactionReputation(this.activeGameId || 'demo', repSnapshot);
    }
    return { factionId, standing: faction.playerStanding, tier: this.getFactionStandingTier(faction.playerStanding) };
  }

  // ==========================================
  // INTERACTIVE SPELL SLOT TRACKER & CASTING (v1.9)
  // ==========================================
  getSpellSlots(char) {
    if (!char) return { max: {}, remaining: {}, pact: null };
    if (!char.spellSlots || Object.keys(char.spellSlots).length === 0) {
      const lvl = Math.max(1, parseInt(char.level, 10) || 1);
      const role = (char.classRole || '').toLowerCase();
      if (role.includes('warlock')) {
        const pactCount = lvl >= 11 ? 3 : (lvl >= 2 ? 2 : 1);
        const pactLevel = Math.min(5, Math.ceil(lvl / 2));
        char.spellSlots = { [pactLevel]: pactCount };
        char.pactSlots = { level: pactLevel, max: pactCount, remaining: pactCount };
      } else {
        const full = {
          1: lvl >= 3 ? 4 : (lvl === 2 ? 3 : 2),
          2: lvl >= 4 ? 3 : (lvl === 3 ? 2 : 0),
          3: lvl >= 6 ? 3 : (lvl === 5 ? 2 : 0),
          4: lvl >= 9 ? 3 : (lvl >= 7 ? lvl - 6 : 0),
          5: lvl >= 10 ? 2 : (lvl === 9 ? 1 : 0)
        };
        const clean = {};
        Object.entries(full).forEach(([k, v]) => { if (v > 0) clean[k] = v; });
        char.spellSlots = clean;
      }
    }
    if (!char.spellSlotsRemaining) {
      char.spellSlotsRemaining = { ...char.spellSlots };
    }
    Object.keys(char.spellSlots).forEach(lvl => {
      if (char.spellSlotsRemaining[lvl] === undefined) {
        char.spellSlotsRemaining[lvl] = char.spellSlots[lvl];
      }
    });
    return { max: char.spellSlots, remaining: char.spellSlotsRemaining, pact: char.pactSlots || null };
  }

  castSpell(charId, spellName, slotLevel = 1, isConcentration = false) {
    if (!this.canControlCharacter(charId)) return { success: false, error: 'Permission denied' };
    const char = (this.data.partyCharacters || []).find(c => c.id === charId);
    if (!char) return { success: false, error: 'Character not found' };
    const slots = this.getSpellSlots(char);
    const lvlKey = String(slotLevel);
    if (slotLevel > 0) {
      const rem = slots.remaining[lvlKey] ?? 0;
      if (rem <= 0) {
        return { success: false, error: `No Level ${slotLevel} spell slots remaining!` };
      }
      slots.remaining[lvlKey] = rem - 1;
      if (char.pactSlots && String(char.pactSlots.level) === lvlKey) {
        char.pactSlots.remaining = Math.max(0, (char.pactSlots.remaining || 0) - 1);
      }
    }
    if (isConcentration) {
      char.concentratingOn = spellName;
    }
    this.logDiceRoll({
      rollerName: char.name,
      rollerAvatar: char.avatar || '✨',
      rollType: 'spell',
      label: `Cast ${spellName}${slotLevel > 0 ? ` (Lvl ${slotLevel} Slot)` : ' (Cantrip)'}`,
      formula: isConcentration ? 'Concentration Active' : 'Instantaneous',
      total: slotLevel,
      note: isConcentration ? `Concentrating on ${spellName}` : `Remaining L${slotLevel} slots: ${slotLevel > 0 ? slots.remaining[lvlKey] : '∞'}`
    });
    return { success: true, spell: spellName, slotLevel, remaining: slotLevel > 0 ? slots.remaining[lvlKey] : null, concentratingOn: char.concentratingOn || null };
  }

  restoreSpellSlots(charId, restType = 'long') {
    const char = (this.data.partyCharacters || []).find(c => c.id === charId);
    if (!char) return false;
    const slots = this.getSpellSlots(char);
    if (restType === 'short') {
      if (char.pactSlots) {
        char.pactSlots.remaining = char.pactSlots.max;
        slots.remaining[String(char.pactSlots.level)] = char.pactSlots.max;
      }
    } else {
      Object.keys(slots.max).forEach(k => { slots.remaining[k] = slots.max[k]; });
      if (char.pactSlots) char.pactSlots.remaining = char.pactSlots.max;
      char.concentratingOn = null;
    }
    this.saveData();
    return true;
  }

  // ==========================================
  // TABLETOP SOUNDBOARD & AMBIENT AUDIO MIXER (SUPABASE)
  // ==========================================
  getAmbientAudio() {
    if (!this.data.ambientAudio) {
      this.data.ambientAudio = { track: 'none', volume: 0.5, sfx: null, updatedAt: 0 };
    }
    return this.data.ambientAudio;
  }

  async setAmbientAudio(patch = {}) {
    const cur = this.getAmbientAudio();
    this.data.ambientAudio = { ...cur, ...patch, updatedAt: Date.now() };
    this.saveData();
    if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      await supabaseDb.saveAmbientAudio(this.activeGameId || 'demo', this.data.ambientAudio);
    }
    return this.data.ambientAudio;
  }

  // ==========================================
  // IN-CAMPAIGN PARTY CHAT & PRIVATE WHISPERS (SUPABASE REALTIME)
  // ==========================================
  getChatMessages(viewerName = null, isDm = null) {
    if (!Array.isArray(this.data.campaignChat)) this.data.campaignChat = [];
    const dm = isDm !== null ? Boolean(isDm) : Boolean(this.prefs?.dmMode);
    if (dm || !viewerName) return this.data.campaignChat;
    const vLower = String(viewerName).toLowerCase();
    return this.data.campaignChat.filter(m => {
      if (!m.isWhisper) return true;
      return String(m.senderName || '').toLowerCase() === vLower ||
             String(m.recipientName || '').toLowerCase() === vLower;
    });
  }

  async sendChatMessage({ senderName = 'Adventurer', senderRole = 'player', recipientName = null, message = '' } = {}) {
    let cleanMsg = String(message || '').trim();
    if (!cleanMsg) return { success: false, error: 'Empty message' };
    let target = recipientName ? String(recipientName).trim() : null;
    let isWhisper = Boolean(target);

    // Support /w @Target message syntax
    const wMatch = cleanMsg.match(/^\/w\s+@?(\S+)\s+(.+)$/i);
    if (wMatch) {
      target = wMatch[1];
      cleanMsg = wMatch[2].trim();
      isWhisper = true;
    }

    const entry = {
      id: 'chat-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      senderName,
      senderRole: senderRole || (this.prefs?.dmMode ? 'dm' : 'player'),
      recipientName: target,
      message: cleanMsg,
      isWhisper,
      createdAt: Date.now()
    };
    if (!Array.isArray(this.data.campaignChat)) this.data.campaignChat = [];
    this.data.campaignChat.push(entry);
    if (this.data.campaignChat.length > 100) this.data.campaignChat.shift();
    this.saveData();
    if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      await supabaseDb.sendCampaignChatMessage(this.activeGameId || 'demo', entry);
    }
    return { success: true, entry };
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
      subclass: charData.subclass || null,
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

  levelUpCharacter(charId, levelUpData = {}) {
    if (!this.canControlCharacter(charId)) {
      return { success: false, error: 'You do not have permission to level up this character.' };
    }
    const char = (this.data.partyCharacters || []).find(c => c.id === charId);
    if (!char) {
      return { success: false, error: 'Character not found.' };
    }

    const oldLevel = parseInt(char.level, 10) || 1;
    if (oldLevel >= 20) {
      return { success: false, error: 'Character is already at maximum level (20).' };
    }
    const newLevel = Math.min(20, oldLevel + 1);

    if (!char.stats) {
      char.stats = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
    }

    const getMod = (v) => Math.floor(((parseInt(v, 10) || 10) - 10) / 2);
    const oldConMod = getMod(char.stats.con);
    const oldDexMod = getMod(char.stats.dex);
    const oldWisMod = getMod(char.stats.wis);

    // 1. Apply ASI / Half-Feat Ability Score Increases
    const statIncreases = levelUpData.statIncreases || {};
    const maxCap = newLevel >= 19 ? 22 : 20;
    const appliedAsi = {};
    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(stat => {
      const inc = parseInt(statIncreases[stat], 10) || 0;
      if (inc > 0) {
        const before = parseInt(char.stats[stat], 10) || 10;
        const after = Math.min(maxCap, before + inc);
        char.stats[stat] = after;
        appliedAsi[stat] = after - before;
      }
    });

    const newConMod = getMod(char.stats.con);
    const newDexMod = getMod(char.stats.dex);
    const newWisMod = getMod(char.stats.wis);

    // 2. Calculate Total HP Gain (Rolled/Fixed/Manual + CON + Retroactive CON + Tough/Dwarf)
    const rawRoll = Number.isFinite(Number(levelUpData.hpRoll)) ? Number(levelUpData.hpRoll) : 6;
    const perLevelHp = Math.max(1, rawRoll + newConMod);
    const retroConBonus = Math.max(0, (newConMod - oldConMod) * oldLevel);

    const existingFeats = Array.isArray(char.feats) ? char.feats : [];
    const newFeatName = levelUpData.feat ? String(levelUpData.feat).trim() : '';
    const alreadyHadTough = existingFeats.some(f => String(f).toLowerCase().includes('tough'));
    const gainedToughNow = !alreadyHadTough && newFeatName.toLowerCase().includes('tough');
    const toughBonus = gainedToughNow ? (2 * newLevel) : (alreadyHadTough ? 2 : 0);
    const dwarfBonus = (char.species || '').toLowerCase().includes('dwarf') ? 1 : 0;

    const totalHpGained = perLevelHp + retroConBonus + toughBonus + dwarfBonus;

    char.level = newLevel;
    char.hpMax = (parseInt(char.hpMax, 10) || 10) + totalHpGained;
    char.hpCurrent = (parseInt(char.hpCurrent, 10) || 0) + totalHpGained;

    // 3. Recalculate Derived Combat Stats
    char.initiativeMod = newDexMod >= 0 ? `+${newDexMod}` : `${newDexMod}`;
    char.passivePerception = 10 + newWisMod + (newFeatName.toLowerCase().includes('observant') ? 5 : 0);
    char.passiveInsight = 10 + newWisMod;

    // Update Unarmored Defense AC if relevant stats increased
    const clsLower = (char.classRole || '').toLowerCase();
    if (clsLower.includes('barbarian')) {
      const unarmored = 10 + newDexMod + newConMod;
      if (unarmored > (char.ac || 10)) char.ac = unarmored;
    } else if (clsLower.includes('monk')) {
      const unarmored = 10 + newDexMod + newWisMod;
      if (unarmored > (char.ac || 10)) char.ac = unarmored;
    } else if (newDexMod > oldDexMod && (char.ac || 10) < 16) {
      char.ac = (char.ac || 10) + (newDexMod - oldDexMod);
    }

    // 4. Subclass
    if (levelUpData.subclass && String(levelUpData.subclass).trim()) {
      const sub = String(levelUpData.subclass).trim();
      char.subclass = sub;
      const baseClass = (char.classRole || 'Adventurer').split('(')[0].trim();
      char.classRole = `${baseClass} (${sub})`;
    }

    // 5. Class Features
    if (!Array.isArray(char.features)) char.features = [];
    const newFeatures = Array.isArray(levelUpData.features) ? levelUpData.features : [];
    newFeatures.forEach(feat => {
      const label = typeof feat === 'string' ? feat : feat.name;
      if (label && !char.features.includes(label)) {
        char.features.push(label);
      }
    });

    // 6. Feats
    if (!Array.isArray(char.feats)) char.feats = [];
    if (newFeatName && !char.feats.includes(newFeatName)) {
      char.feats.push(newFeatName);
    }

    // 7. Spells & Spell Slots
    if (!Array.isArray(char.spells)) char.spells = [];
    const newSpells = Array.isArray(levelUpData.spells) ? levelUpData.spells : [];
    newSpells.forEach(sp => {
      const clean = String(sp).trim();
      if (clean && !char.spells.includes(clean)) {
        char.spells.push(clean);
      }
    });
    if (levelUpData.spellSlots && Object.keys(levelUpData.spellSlots).length > 0) {
      char.spellSlots = levelUpData.spellSlots;
    }

    // 8. Weapon Masteries
    if (!Array.isArray(char.weaponMasteries)) char.weaponMasteries = [];
    const newMasteries = Array.isArray(levelUpData.weaponMasteries) ? levelUpData.weaponMasteries : [];
    newMasteries.forEach(m => {
      const clean = String(m).trim();
      if (clean && !char.weaponMasteries.includes(clean)) {
        char.weaponMasteries.push(clean);
      }
    });

    // 9. Append Level-Up Audit History
    if (!Array.isArray(char.levelHistory)) char.levelHistory = [];
    const historyRecord = {
      fromLevel: oldLevel,
      toLevel: newLevel,
      hpGained: totalHpGained,
      hpMethod: levelUpData.hpMethod || 'average',
      hpRoll: rawRoll,
      subclass: levelUpData.subclass || null,
      feat: newFeatName || null,
      asi: Object.keys(appliedAsi).length > 0 ? appliedAsi : null,
      features: newFeatures.map(f => (typeof f === 'string' ? f : f.name)),
      spells: newSpells,
      weaponMasteries: newMasteries,
      timestamp: Date.now()
    };
    char.levelHistory.unshift(historyRecord);

    // 10. Log HP Roll & Level-Up Celebration to Synchronized Dice Log (persisted in Supabase)
    if (!this.data.diceRollLogs) this.data.diceRollLogs = [];
    const summaryBits = [`+${totalHpGained} Max HP`];
    if (levelUpData.subclass) summaryBits.push(`Subclass: ${levelUpData.subclass}`);
    if (newFeatName) summaryBits.push(`Feat: ${newFeatName}`);
    if (Object.keys(appliedAsi).length > 0) {
      summaryBits.push('ASI: ' + Object.entries(appliedAsi).map(([k, v]) => `+${v} ${k.toUpperCase()}`).join(', '));
    }
    if (newSpells.length > 0) summaryBits.push(`Spells: ${newSpells.join(', ')}`);

    this.data.diceRollLogs.unshift({
      id: 'roll_lvl_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      rollerName: `${char.name} (${char.playerName || 'Hero'})`,
      rollerAvatar: char.avatar || '⬆️',
      rollType: 'level_up',
      label: `Level Up: Lv ${oldLevel} → Lv ${newLevel}`,
      formula: `${levelUpData.hpMethod === 'roll' ? 'Rolled' : levelUpData.hpMethod === 'manual' ? 'Manual' : 'Avg'} (${rawRoll}) + CON (${newConMod >= 0 ? '+' + newConMod : newConMod})${retroConBonus ? ' + Retro CON (+' + retroConBonus + ')' : ''}${toughBonus ? ' + Tough (+' + toughBonus + ')' : ''}`,
      d20Result: null,
      total: totalHpGained,
      dc: null,
      success: true,
      isCrit: false,
      isNat1: false,
      advantageMode: 'normal',
      note: summaryBits.join(' • '),
      timestamp: Date.now(),
      timeStr: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    });
    if (this.data.diceRollLogs.length > 80) this.data.diceRollLogs.pop();

    // Single saveData() persists both party_characters + dice_roll_logs to Supabase & refreshes UI once
    this.saveData();
    return { success: true, character: char, historyRecord };
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
      // D&D 5.5e Concentration Save Auto-Tracker (v2.0)
      if (delta < 0 && char.concentratingOn) {
        const dmg = Math.abs(delta);
        const dc = Math.max(10, Math.floor(dmg / 2));
        char.pendingConcentrationSave = { spell: char.concentratingOn, dc, damage: dmg, timestamp: Date.now() };
      }
    }
    this.saveData();
  }

  // ==========================================
  // v2.0: CONCENTRATION AUTO-TRACKER & HEROIC INSPIRATION
  // ==========================================
  rollConcentrationSave(charId, useInspiration = false) {
    const char = (this.data.partyCharacters || []).find(c => c.id === charId);
    if (!char) return { success: false, error: 'Character not found' };
    const pending = char.pendingConcentrationSave || { spell: char.concentratingOn || 'Active Spell', dc: 10, damage: 0 };
    const conMod = Math.floor((((char.stats && char.stats.con) || 10) - 10) / 2);
    const d1 = Math.floor(Math.random() * 20) + 1;
    const d2 = Math.floor(Math.random() * 20) + 1;
    const hasAdv = Boolean(useInspiration && char.inspiration);
    if (hasAdv) char.inspiration = false;
    const d20 = hasAdv ? Math.max(d1, d2) : d1;
    const total = d20 + conMod;
    const passed = total >= pending.dc;
    char.pendingConcentrationSave = null;
    if (!passed) {
      char.concentratingOn = null;
    }
    this.logDiceRoll({
      rollerName: char.name,
      rollerAvatar: char.avatar || '🔮',
      rollType: 'save',
      label: `Concentration Save (${pending.spell})`,
      formula: hasAdv ? `max(${d1},${d2}) + ${conMod} [Heroic Inspiration]` : `1d20(${d20}) ${conMod >= 0 ? '+' : ''}${conMod}`,
      d20Result: d20,
      total,
      dc: pending.dc,
      success: passed,
      note: passed ? `Maintained concentration on ${pending.spell}` : `Lost concentration on ${pending.spell}!`
    });
    return { success: true, passed, d20, total, dc: pending.dc, spell: pending.spell, usedInspiration: hasAdv };
  }

  spendHeroicInspiration(charId) {
    const char = (this.data.partyCharacters || []).find(c => c.id === charId);
    if (!char || !char.inspiration) return { success: false, error: 'No Heroic Inspiration available' };
    char.inspiration = false;
    this.logDiceRoll({
      rollerName: char.name,
      rollerAvatar: char.avatar || '⭐',
      rollType: 'check',
      label: 'Spent Heroic Inspiration',
      formula: 'D&D 5.5e Reroll / Advantage',
      total: 20,
      note: `${char.name} invoked Heroic Inspiration!`
    });
    return { success: true };
  }

  // ==========================================
  // v2.0: BATTLEMAT AOE SPELL TEMPLATES (SUPABASE SYNCED)
  // ==========================================
  getAoeTemplates() {
    if (!this.data.battlematState) this.data.battlematState = {};
    if (!Array.isArray(this.data.battlematState.aoeTemplates)) {
      this.data.battlematState.aoeTemplates = [];
    }
    return this.data.battlematState.aoeTemplates;
  }

  async addAoeTemplate({ shape = 'sphere', radiusFt = 20, x = 5, y = 5, color = 'rgba(239, 68, 68, 0.35)', label = 'Fireball (20ft)' } = {}) {
    const list = this.getAoeTemplates();
    const tpl = {
      id: 'aoe-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      shape,
      radiusFt: Number(radiusFt) || 20,
      x: Number(x) || 5,
      y: Number(y) || 5,
      color,
      label
    };
    list.push(tpl);
    this.saveData();
    if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      await supabaseDb.saveBattlematState(this.activeGameId || 'demo', this.data.battlematState);
    }
    return tpl;
  }

  async clearAoeTemplates() {
    if (!this.data.battlematState) this.data.battlematState = {};
    this.data.battlematState.aoeTemplates = [];
    this.saveData();
    if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      await supabaseDb.saveBattlematState(this.activeGameId || 'demo', this.data.battlematState);
    }
    return true;
  }

  // ==========================================
  // v2.0: 5.5e DM SCREEN QUICK-REFERENCE & ENCOUNTER XP DISTRIBUTOR
  // ==========================================
  getDmScreenReference() {
    return {
      dcTable: [
        { label: 'Very Easy', dc: 5 },
        { label: 'Easy', dc: 10 },
        { label: 'Medium', dc: 15 },
        { label: 'Hard', dc: 20 },
        { label: 'Very Hard', dc: 25 },
        { label: 'Nearly Impossible', dc: 30 }
      ],
      coverRules: [
        { type: 'Half Cover', bonus: '+2 AC and DEX Saves' },
        { type: 'Three-Quarters Cover', bonus: '+5 AC and DEX Saves' },
        { type: 'Total Cover', bonus: 'Cannot be targeted directly' }
      ],
      exhaustion2024: 'D&D 5.5e (2024): Each level of Exhaustion imposes −2 to all D20 Tests and −5 ft Speed (Death at Level 6). Long Rest reduces Exhaustion by 1.',
      travelPace: [
        { pace: 'Fast', milesPerDay: 30, effect: '−5 Passive Perception' },
        { pace: 'Normal', milesPerDay: 24, effect: 'Standard awareness' },
        { pace: 'Slow', milesPerDay: 18, effect: 'Able to use Stealth' }
      ]
    };
  }

  awardEncounterXp(totalXp = 0, goldTotal = 0, label = 'Combat Victory') {
    const heroes = this.data.partyCharacters || [];
    if (heroes.length === 0) return { success: false, error: 'No party heroes to reward' };
    const xpEach = Math.max(0, Math.floor((Number(totalXp) || 0) / heroes.length));
    const gpEach = Math.max(0, Math.floor((Number(goldTotal) || 0) / heroes.length));
    const xpThresholds = [0, 0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000];
    const readyHeroes = [];
    heroes.forEach(h => {
      h.xp = (Number(h.xp) || 0) + xpEach;
      if (!h.currency) h.currency = { gp: 50, sp: 0, cp: 0 };
      h.currency.gp = (Number(h.currency.gp) || 0) + gpEach;
      const nextLvl = Math.min(20, (parseInt(h.level, 10) || 1) + 1);
      if (h.level < 20 && h.xp >= (xpThresholds[nextLvl] || 999999)) {
        h.readyToLevelUp = true;
        readyHeroes.push(h.name);
      }
    });
    this.logDiceRoll({
      rollerName: 'Dungeon Master',
      rollerAvatar: '🏆',
      rollType: 'level_up',
      label: `${label}: +${xpEach} XP${gpEach > 0 ? ` & +${gpEach} GP` : ''} each`,
      formula: `${totalXp} XP / ${heroes.length} heroes`,
      total: xpEach,
      note: readyHeroes.length ? `Ready to Level Up: ${readyHeroes.join(', ')}` : 'XP & Gold distributed to party'
    });
    return { success: true, xpEach, gpEach, readyHeroes };
  }

  // ==========================================
  // v2.0: FULL CAMPAIGN SNAPSHOT BACKUP, RESTORE & KPI SUMMARY
  // ==========================================
  exportCampaignSnapshot() {
    return JSON.stringify({
      snapshotVersion: '2.0',
      exportedAt: new Date().toISOString(),
      campaignId: this.activeGameId || 'demo',
      data: this.data
    }, null, 2);
  }

  importCampaignSnapshot(jsonStr) {
    try {
      const parsed = JSON.parse(jsonStr);
      const payload = parsed && parsed.data ? parsed.data : parsed;
      if (!payload || !Array.isArray(payload.partyCharacters)) {
        return { success: false, error: 'Invalid v2.0 campaign snapshot format.' };
      }
      this.data = payload;
      this.ensureDefaults();
      this.saveData();
      return { success: true, heroCount: this.data.partyCharacters.length };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  getCampaignKpiSummary() {
    const heroes = this.data.partyCharacters || [];
    const avgLevel = heroes.length
      ? Number((heroes.reduce((s, h) => s + (parseInt(h.level, 10) || 1), 0) / heroes.length).toFixed(1))
      : 0;
    const activeQuests = (this.data.campaignQuests || []).filter(q => q.status === 'active').length;
    const alliedFactions = (this.data.factions || []).filter(f => (f.playerStanding || 0) >= 2).length;
    return {
      version: this.version || '2.1',
      heroCount: heroes.length,
      avgLevel,
      activeQuests,
      alliedFactions,
      merchantDiscountPct: this.getMerchantDiscountPercent ? this.getMerchantDiscountPercent() : 0,
      chatCount: (this.data.campaignChat || []).length,
      aoeCount: this.getAoeTemplates().length
    };
  }

  // ==========================================
  // v2.1: MAGIC ITEM COMPENDIUM & DM AWARD SYSTEM (SUPABASE)
  // ==========================================
  getMagicCompendium({ search = '', rarity = 'all', category = 'all', attunement = 'all' } = {}) {
    const base = (typeof MAGIC_ITEM_COMPENDIUM !== 'undefined' && Array.isArray(MAGIC_ITEM_COMPENDIUM)) ? MAGIC_ITEM_COMPENDIUM : [];
    const custom = Array.isArray(this.data.customMagicItems) ? this.data.customMagicItems : [];
    const merged = [...custom, ...base];
    const q = String(search || '').trim().toLowerCase();
    return merged.filter(item => {
      if (rarity !== 'all' && String(item.rarity || '').toLowerCase() !== String(rarity).toLowerCase()) return false;
      if (category !== 'all' && String(item.category || '').toLowerCase() !== String(category).toLowerCase()) return false;
      if (attunement === 'yes' && !item.attunement) return false;
      if (attunement === 'no' && item.attunement) return false;
      if (q) {
        const hay = `${item.name} ${item.rarity} ${item.category} ${item.description || ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  async addCustomMagicItem(itemData = {}) {
    if (!itemData.name || !String(itemData.name).trim()) return { success: false, error: 'Item name is required' };
    if (!Array.isArray(this.data.customMagicItems)) this.data.customMagicItems = [];
    const newItem = {
      id: 'mag-custom-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      name: String(itemData.name).trim(),
      rarity: itemData.rarity || 'Rare',
      category: itemData.category || 'Wondrous',
      attunement: Boolean(itemData.attunement),
      priceGp: Math.max(1, parseInt(itemData.priceGp, 10) || 500),
      acBonus: itemData.acBonus ? Number(itemData.acBonus) : undefined,
      damageDice: itemData.damageDice || undefined,
      healDice: itemData.healDice || undefined,
      merchantTypes: Array.isArray(itemData.merchantTypes) && itemData.merchantTypes.length ? itemData.merchantTypes : ['relic_peddler', 'arcanist'],
      description: String(itemData.description || 'Homebrew magic artifact crafted by the Dungeon Master.').trim(),
      isHomebrew: true
    };
    this.data.customMagicItems.unshift(newItem);
    this.saveData();
    if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      await supabaseDb.saveCustomMagicItems(this.activeGameId || 'demo', this.data.customMagicItems);
    }
    return { success: true, item: newItem };
  }

  awardMagicItemToHero(itemId, targetHeroId, dmNote = '') {
    const allItems = this.getMagicCompendium();
    const item = allItems.find(i => i.id === itemId);
    const hero = (this.data.partyCharacters || []).find(c => c.id === targetHeroId);
    if (!item) return { success: false, error: 'Magic item not found in compendium' };
    if (!hero) return { success: false, error: 'Target hero not found' };

    const invCategory = String(item.category || 'magic').toLowerCase();
    const added = this.addInventoryItem(hero.id, {
      name: item.name,
      category: ['weapon', 'armor', 'potion', 'shield'].includes(invCategory) ? invCategory : 'magic',
      rarity: item.rarity,
      isMagic: true,
      requiresAttunement: Boolean(item.attunement),
      priceGp: item.priceGp || 100,
      acBonus: item.acBonus || 0,
      baseAc: item.baseAc || undefined,
      armorType: item.armorType || undefined,
      damageDice: item.damageDice || undefined,
      healDice: item.healDice || undefined,
      notes: item.description,
      quantity: 1
    });

    this.logDiceRoll({
      rollerName: 'Dungeon Master',
      rollerAvatar: '🎁',
      rollType: 'level_up',
      label: `Awarded ${item.name} (${item.rarity}) → ${hero.name}`,
      formula: item.attunement ? 'Requires Attunement' : 'No Attunement',
      total: item.priceGp || 0,
      note: dmNote || item.description
    });
    return { success: true, item: item.name, hero: hero.name, inventoryItem: added };
  }

  async awardMagicItemToLootChest(itemId, chestTitle = 'DM Magic Treasure Drop') {
    const allItems = this.getMagicCompendium();
    const item = allItems.find(i => i.id === itemId);
    if (!item) return { success: false, error: 'Magic item not found' };
    const res = await this.createLootChest({
      title: chestTitle || `Treasure: ${item.name}`,
      gold: 0,
      items: [{
        name: item.name,
        category: String(item.category || 'magic').toLowerCase(),
        rarity: item.rarity,
        isMagic: true,
        requiresAttunement: Boolean(item.attunement),
        priceGp: item.priceGp || 100,
        acBonus: item.acBonus || 0,
        healDice: item.healDice || undefined,
        notes: item.description,
        quantity: 1
      }]
    });
    return { success: true, chest: (res && res.chest) ? res.chest : res };
  }

  // ==========================================
  // v2.1: DYNAMIC ON-THE-FLY VENDOR & MERCHANT TAB (SUPABASE SYNCED)
  // ==========================================
  getMerchantArchetypes() {
    return (typeof MERCHANT_ARCHETYPES !== 'undefined' && Array.isArray(MERCHANT_ARCHETYPES)) ? MERCHANT_ARCHETYPES : [];
  }

  _buildVendorStock(archetypeId, maxRarity = 'Rare', includeMagic = true) {
    const rarityOrder = ['Mundane', 'Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary', 'Artifact'];
    const maxIdx = Math.max(0, rarityOrder.indexOf(maxRarity));
    const mundanePool = (typeof MUNDANE_VENDOR_CATALOG !== 'undefined' ? MUNDANE_VENDOR_CATALOG : [])
      .filter(i => Array.isArray(i.merchantTypes) && i.merchantTypes.includes(archetypeId));
    const magicPool = includeMagic
      ? this.getMagicCompendium().filter(i => {
          const rIdx = rarityOrder.indexOf(i.rarity || 'Common');
          const matchesType = Array.isArray(i.merchantTypes) && i.merchantTypes.includes(archetypeId);
          return matchesType && rIdx > 0 && rIdx <= maxIdx;
        })
      : [];

    const items = [];
    mundanePool.forEach(m => {
      items.push({ ...m, isMagic: false, rarity: 'Mundane', stock: m.stock || 3 });
    });
    magicPool.forEach(mg => {
      const rIdx = rarityOrder.indexOf(mg.rarity || 'Common');
      const defaultStock = rIdx <= 1 ? 3 : (rIdx === 2 ? 2 : 1);
      items.push({
        id: mg.id,
        name: mg.name,
        category: String(mg.category || 'magic').toLowerCase(),
        rarity: mg.rarity,
        isMagic: true,
        requiresAttunement: Boolean(mg.attunement),
        priceGp: mg.priceGp || 100,
        acBonus: mg.acBonus || 0,
        baseAc: mg.baseAc || undefined,
        armorType: mg.armorType || undefined,
        damageDice: mg.damageDice || undefined,
        healDice: mg.healDice || undefined,
        notes: mg.description,
        stock: defaultStock
      });
    });
    return items;
  }

  getActiveVendor() {
    if (!this.data.activeVendor || !this.data.activeVendor.archetypeId) {
      const archetypes = this.getMerchantArchetypes();
      const def = archetypes[0] || {
        id: 'shopkeeper',
        name: 'General Shopkeeper',
        icon: '🏪',
        defaultShopName: 'The Crossroads Outfitter',
        defaultMerchantName: 'Bramwell Copperkettle',
        greeting: '"Everything an adventurer needs!"',
        defaultMaxRarity: 'Uncommon',
        includeMagicDefault: true
      };
      this.data.activeVendor = {
        archetypeId: def.id,
        archetypeName: def.name,
        icon: def.icon,
        shopName: def.defaultShopName,
        merchantName: def.defaultMerchantName,
        greeting: def.greeting,
        maxRarity: def.defaultMaxRarity || 'Uncommon',
        includeMagic: def.includeMagicDefault !== false,
        priceModifierPct: 0,
        inventory: this._buildVendorStock(def.id, def.defaultMaxRarity || 'Uncommon', def.includeMagicDefault !== false),
        updatedAt: Date.now()
      };
    }
    return this.data.activeVendor;
  }

  async setVendorArchetype(archetypeId, opts = {}) {
    const archetypes = this.getMerchantArchetypes();
    const arch = archetypes.find(a => a.id === archetypeId) || archetypes[0];
    if (!arch) return { success: false, error: 'Unknown merchant archetype' };
    const maxRarity = opts.maxRarity || arch.defaultMaxRarity || 'Rare';
    const includeMagic = opts.includeMagic !== undefined ? Boolean(opts.includeMagic) : (arch.includeMagicDefault !== false);
    const priceModifierPct = opts.priceModifierPct !== undefined ? Number(opts.priceModifierPct) : 0;

    this.data.activeVendor = {
      archetypeId: arch.id,
      archetypeName: arch.name,
      icon: arch.icon,
      shopName: opts.shopName || arch.defaultShopName,
      merchantName: opts.merchantName || arch.defaultMerchantName,
      greeting: opts.greeting || arch.greeting,
      maxRarity,
      includeMagic,
      priceModifierPct,
      inventory: this._buildVendorStock(arch.id, maxRarity, includeMagic),
      updatedAt: Date.now()
    };
    this.saveData();
    if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      await supabaseDb.saveActiveVendor(this.activeGameId || 'demo', this.data.activeVendor);
    }
    return { success: true, vendor: this.data.activeVendor };
  }

  async restockActiveVendor() {
    const v = this.getActiveVendor();
    v.inventory = this._buildVendorStock(v.archetypeId, v.maxRarity || 'Rare', v.includeMagic !== false);
    v.updatedAt = Date.now();
    this.saveData();
    if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      await supabaseDb.saveActiveVendor(this.activeGameId || 'demo', v);
    }
    return { success: true, vendor: v };
  }

  async addItemToActiveVendor(itemObj) {
    const v = this.getActiveVendor();
    if (!itemObj || !itemObj.name) return { success: false, error: 'Invalid item' };
    v.inventory.unshift({
      id: itemObj.id || ('vend-' + Date.now()),
      name: itemObj.name,
      category: String(itemObj.category || 'magic').toLowerCase(),
      rarity: itemObj.rarity || (itemObj.isMagic ? 'Uncommon' : 'Mundane'),
      isMagic: itemObj.isMagic !== undefined ? Boolean(itemObj.isMagic) : (itemObj.rarity && itemObj.rarity !== 'Mundane'),
      requiresAttunement: Boolean(itemObj.attunement || itemObj.requiresAttunement),
      priceGp: Math.max(1, parseInt(itemObj.priceGp, 10) || 50),
      acBonus: itemObj.acBonus || 0,
      damageDice: itemObj.damageDice || undefined,
      healDice: itemObj.healDice || undefined,
      notes: itemObj.description || itemObj.notes || '',
      stock: Math.max(1, parseInt(itemObj.stock, 10) || 1)
    });
    v.updatedAt = Date.now();
    this.saveData();
    if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      await supabaseDb.saveActiveVendor(this.activeGameId || 'demo', v);
    }
    return { success: true, vendor: v };
  }

  async removeItemFromActiveVendor(itemIndex) {
    const v = this.getActiveVendor();
    if (itemIndex < 0 || itemIndex >= v.inventory.length) return { success: false };
    v.inventory.splice(itemIndex, 1);
    v.updatedAt = Date.now();
    this.saveData();
    if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      await supabaseDb.saveActiveVendor(this.activeGameId || 'demo', v);
    }
    return { success: true };
  }

  getVendorEffectivePrice(basePriceGp) {
    const v = this.getActiveVendor();
    const vendorMod = Number(v.priceModifierPct) || 0;
    const factionDisc = this.getMerchantDiscountPercent ? this.getMerchantDiscountPercent() : 0;
    const netMultiplier = Math.max(0.25, (1 + vendorMod / 100) * (1 - factionDisc / 100));
    return Math.max(1, Math.round((Number(basePriceGp) || 1) * netMultiplier));
  }

  async buyFromActiveVendor(charId, itemIndex) {
    const char = (this.data.partyCharacters || []).find(c => c.id === charId);
    const v = this.getActiveVendor();
    const item = v.inventory[itemIndex];
    if (!char || !item) return { success: false, error: 'Item unavailable' };
    if ((item.stock || 0) <= 0) return { success: false, error: 'Sold out' };
    if (!char.currency) char.currency = { gp: 50, sp: 0, cp: 0 };
    const price = this.getVendorEffectivePrice(item.priceGp);
    if ((char.currency.gp || 0) < price) {
      return { success: false, error: `Not enough GP (need ${price} GP, have ${char.currency.gp || 0} GP).` };
    }
    char.currency.gp -= price;
    item.stock -= 1;
    this.addInventoryItem(char.id, { ...item, quantity: 1 });
    this.logDiceRoll({
      rollerName: char.name,
      rollerAvatar: v.icon || '🏪',
      rollType: 'check',
      label: `Purchased ${item.name} from ${v.merchantName}`,
      formula: `${price} GP (${v.shopName})`,
      total: price,
      note: `Remaining GP: ${char.currency.gp} GP`
    });
    if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      await supabaseDb.saveActiveVendor(this.activeGameId || 'demo', v);
    }
    return { success: true, item: item.name, paidGp: price, remainingGp: char.currency.gp };
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
      if (c.spellSlots) {
        c.spellSlotsRemaining = { ...c.spellSlots };
      }
      if (c.pactSlots) c.pactSlots.remaining = c.pactSlots.max;
      c.concentratingOn = null;
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
      if (c.pactSlots) {
        c.pactSlots.remaining = c.pactSlots.max;
        if (c.spellSlotsRemaining) c.spellSlotsRemaining[String(c.pactSlots.level)] = c.pactSlots.max;
      }
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
      case 'tavern':
        this.createFireAmbience();
        break;
      case 'rain':
        this.createForestAmbience();
        break;
      case 'dungeon':
        this.createEarthAmbience();
        break;
      case 'boss':
        this.createFireAmbience();
        this.createEarthAmbience();
        break;
      case 'none':
        this.stopAmbience();
        break;
      default:
        this.createFireAmbience();
    }
  }

  setVolume(vol = 0.5) {
    this.initContext();
    const clamped = Math.max(0, Math.min(1, Number(vol) || 0));
    if (this.gainNode && this.ctx && !this.isMuted) {
      this.gainNode.gain.setTargetAtTime(clamped * 0.4, this.ctx.currentTime, 0.1);
    }
  }

  playSfx(sfxId) {
    this.initContext();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    if (sfxId === 'sword') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.18);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain); gain.connect(this.gainNode);
      osc.start(now); osc.stop(now + 0.24);
    } else if (sfxId === 'thunder') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(95, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 0.9);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.95);
      osc.connect(gain); gain.connect(this.gainNode);
      osc.start(now); osc.stop(now + 1.0);
    } else if (sfxId === 'spell') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.35);
      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.connect(gain); gain.connect(this.gainNode);
      osc.start(now); osc.stop(now + 0.48);
    } else {
      // Fanfare / Chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, now);
      osc.frequency.setValueAtTime(880, now + 0.12);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      osc.connect(gain); gain.connect(this.gainNode);
      osc.start(now); osc.stop(now + 0.58);
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
          <div id="map-atmosphere-hud" style="display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(212,175,55,0.4); border-radius: 6px; padding: 3px 8px; font-size: 0.75rem; margin-right: 0.5rem;">
            <span id="atmo-status-badge" style="color: #fde047; font-weight: bold;">☀️ Day • Clear</span>
            <select id="atmo-time-select" class="editor-input" style="font-size: 0.72rem; padding: 1px 4px; width: auto;" title="Time of Day (DM Synced)">
              <option value="Dawn">Dawn</option>
              <option value="Day">Day</option>
              <option value="Dusk">Dusk</option>
              <option value="Midnight">Midnight</option>
            </select>
            <select id="atmo-weather-select" class="editor-input" style="font-size: 0.72rem; padding: 1px 4px; width: auto;" title="Weather (DM Synced)">
              <option value="Clear">Clear</option>
              <option value="Rain">Rain</option>
              <option value="Blizzard">Blizzard</option>
              <option value="Ash Storm">Ash Storm</option>
              <option value="Arcane Tempest">Arcane Tempest</option>
            </select>
          </div>
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

          <!-- Dynamic Atmosphere Tint Overlay (Time-of-Day & Weather Synced via Supabase) -->
          <rect id="world-map-atmosphere-tint" x="0" y="0" width="1000" height="562" fill="#000000" fill-opacity="0" pointer-events="none" />

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

    // Live World Map Party Token (Synced with Supabase)
    const partyLoc = worldState.getPartyLocation ? worldState.getPartyLocation() : null;
    if (partyLoc) {
      const activeReg = (worldState.data.regions || []).find(r => r.id === partyLoc.regionId);
      if (activeReg) {
        const pCoords = regionCoords[activeReg.id] || (activeReg.coordinates ? { x: activeReg.coordinates.x * 10, y: activeReg.coordinates.y * 5.6 } : { x: 500, y: 280 });
        const partyG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        partyG.setAttribute('id', 'world-map-party-token');
        partyG.setAttribute('transform', `translate(${pCoords.x + 24}, ${pCoords.y - 22})`);
        partyG.innerHTML = `
          <circle cx="0" cy="0" r="13" fill="#0284c7" stroke="#fde047" stroke-width="2.5" />
          <text x="0" y="4" font-size="11" text-anchor="middle" fill="#fff">🧭</text>
        `;
        pinsLayer.appendChild(partyG);
      }
    }

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

    // Party Travel Calculator & Move Party Here (Supabase)
    if (typeof worldState.getPartyLocation === 'function') {
      const curLoc = worldState.getPartyLocation();
      const travel = worldState.calculateTravel(curLoc.regionId, region.id, 'normal');
      const isHere = curLoc.regionId === region.id;
      html += `
        <div style="margin-top: 0.85rem; padding: 0.75rem; background: rgba(2, 132, 199, 0.12); border: 1px solid rgba(56, 189, 248, 0.45); border-radius: 6px;">
          <div style="font-weight: bold; font-size: 0.82rem; color: #0369a1; margin-bottom: 0.3rem;">🧭 Party Location &amp; Travel Calculator</div>
          ${isHere
            ? `<div style="font-size: 0.8rem; color: #0c4a6e;">The party is currently camped in <strong>${region.name}</strong> (Day ${curLoc.travelDaysTotal || 1}).</div>`
            : `<div style="font-size: 0.8rem; color: #0c4a6e; margin-bottom: 0.5rem;">From <strong>${curLoc.regionName}</strong>: ~<strong>${travel.distanceMiles} miles</strong> (${travel.travelDays} day${travel.travelDays === 1 ? '' : 's'} at Normal pace, ${travel.rationsNeeded} rations).</div>
               <button type="button" class="btn btn-sm btn-primary" id="btn-move-party-here" data-region-id="${region.id}" style="width: 100%;">🧭 Move Party Here (+${travel.travelDays}d)</button>`
          }
        </div>
      `;
    }

    flyoutBody.innerHTML = html;

    flyoutBody.querySelector('#btn-move-party-here')?.addEventListener('click', async () => {
      await worldState.movePartyToRegion(region.id, 'normal');
      renderPins();
      openFlyout(region);
    });
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

  // Weather & Time-of-Day Atmosphere Controller (DM Synced via Supabase)
  const atmoBadge = container.querySelector('#atmo-status-badge');
  const atmoTimeSel = container.querySelector('#atmo-time-select');
  const atmoWeatherSel = container.querySelector('#atmo-weather-select');
  const atmoTint = container.querySelector('#world-map-atmosphere-tint');

  function applyAtmosphereUi() {
    if (typeof worldState.getWorldAtmosphere !== 'function') return;
    const atmo = worldState.getWorldAtmosphere();
    const isDm = !!worldState.prefs.dmMode;
    const timeIcons = { Dawn: '🌅', Day: '☀️', Dusk: '🌇', Midnight: '🌙' };
    const weatherIcons = { Clear: '', Rain: '🌧️', Blizzard: '❄️', 'Ash Storm': '🌋', 'Arcane Tempest': '⚡' };
    if (atmoBadge) {
      atmoBadge.textContent = `${timeIcons[atmo.timeOfDay] || '☀️'} ${atmo.timeOfDay} • ${weatherIcons[atmo.weather] || ''} ${atmo.weather}`.trim();
    }
    if (atmoTimeSel) {
      atmoTimeSel.value = atmo.timeOfDay || 'Day';
      atmoTimeSel.style.display = isDm ? 'inline-block' : 'none';
    }
    if (atmoWeatherSel) {
      atmoWeatherSel.value = atmo.weather || 'Clear';
      atmoWeatherSel.style.display = isDm ? 'inline-block' : 'none';
    }
    if (atmoTint) {
      const tintMap = {
        Dawn: { fill: '#f59e0b', op: '0.14' },
        Day: { fill: '#000000', op: '0' },
        Dusk: { fill: '#ea580c', op: '0.20' },
        Midnight: { fill: '#0f172a', op: '0.42' }
      };
      let t = tintMap[atmo.timeOfDay] || tintMap.Day;
      if (atmo.weather === 'Arcane Tempest') t = { fill: '#6d28d9', op: '0.26' };
      else if (atmo.weather === 'Blizzard') t = { fill: '#bae6fd', op: '0.22' };
      else if (atmo.weather === 'Ash Storm') t = { fill: '#7f1d1d', op: '0.24' };
      atmoTint.setAttribute('fill', t.fill);
      atmoTint.setAttribute('fill-opacity', t.op);
    }
  }

  atmoTimeSel?.addEventListener('change', async () => {
    await worldState.setWorldAtmosphere({ timeOfDay: atmoTimeSel.value });
    applyAtmosphereUi();
  });
  atmoWeatherSel?.addEventListener('change', async () => {
    await worldState.setWorldAtmosphere({ weather: atmoWeatherSel.value });
    applyAtmosphereUi();
  });

  resetMap();
  renderPins();
  applyAtmosphereUi();
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

  const discountPct = typeof worldState.getMerchantDiscountPercent === 'function' ? worldState.getMerchantDiscountPercent() : 0;

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h2>Factions & Continental Influence Matrix</h2>
        <div class="view-tagline">Political Power, Alliances, Party Reputation (Supabase Synced), and DM-Exclusive Standing Boons & Afflictions</div>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span class="meta-badge" id="faction-merchant-discount-badge" style="background: rgba(16,185,129,0.18); border-color: #10b981; color: #6ee7b7;">
          🏪 Town Market Discount: ${discountPct}% ${discountPct >= 20 ? '(Sworn)' : discountPct >= 10 ? '(Allied)' : '(Standard)'}
        </span>
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
        <h2>Notice Board, Active Quest Log &amp; Tavern Rumors</h2>
        <div class="view-tagline">Supabase-Synced Party Quests, Checkable Objectives, Bounties &amp; Mysteries</div>
      </div>
      <div style="display: flex; gap: 0.5rem;">
        ${prefs.dmMode ? `<button class="btn btn-primary" id="add-active-quest-btn">+ New Party Quest</button>` : ''}
        <button class="btn" id="add-rumor-btn">Post New Rumor</button>
      </div>
    </div>

    <!-- Live Party Quest Board (Supabase Synced) -->
    <div id="active-quest-board-panel" style="margin-bottom: 1.5rem; background: var(--bg-card); border: 1px solid rgba(212,175,55,0.4); border-radius: var(--radius-md); padding: 1rem;">
      <strong style="color: var(--text-gold); font-size: 0.95rem;">📋 Active Party Quest Board (Supabase Live)</strong>
      <div id="active-quests-list" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0.75rem; margin-top: 0.65rem;"></div>
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

  // Render Live Party Quest Board (Supabase)
  function renderQuestBoard() {
    const list = container.querySelector('#active-quests-list');
    if (!list) return;
    const quests = worldState.getQuests ? worldState.getQuests() : [];
    if (quests.length === 0) {
      list.innerHTML = `<div style="color: var(--text-muted); font-size: 0.82rem; font-style: italic;">No active quests pinned yet. DM can click "+ New Party Quest" to assign objectives &amp; rewards.</div>`;
      return;
    }
    list.innerHTML = quests.map(q => `
      <div style="background: var(--bg-tertiary); border: 1px solid ${q.status === 'completed' ? 'rgba(34,197,94,0.45)' : 'var(--border-subtle)'}; border-radius: var(--radius-sm); padding: 0.75rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
          <strong style="color: var(--text-gold);">${q.title}</strong>
          <span style="font-size: 0.68rem; text-transform: uppercase; font-weight: 700; color: ${q.status === 'completed' ? '#86efac' : '#fde047'};">${q.status}</span>
        </div>
        <div style="font-size: 0.76rem; color: var(--text-secondary); margin-bottom: 0.45rem;">${q.description || ''} <span style="color:var(--text-muted);">(${q.rewardGold} GP • ${q.rewardXp} XP)</span></div>
        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
          ${(q.objectives || []).map((o, idx) => `
            <label style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.76rem; cursor: pointer; text-decoration: ${o.done ? 'line-through' : 'none'}; color: ${o.done ? 'var(--text-muted)' : 'var(--text-primary)'};">
              <input type="checkbox" class="quest-obj-chk" data-qid="${q.id}" data-idx="${idx}" ${o.done ? 'checked' : ''}>
              <span>${o.text}</span>
            </label>
          `).join('')}
        </div>
      </div>
    `).join('');

    list.querySelectorAll('.quest-obj-chk').forEach(chk => {
      chk.addEventListener('change', async () => {
        await worldState.toggleQuestObjective(chk.getAttribute('data-qid'), parseInt(chk.getAttribute('data-idx'), 10));
        renderQuestBoard();
      });
    });
  }
  renderQuestBoard();

  container.querySelector('#add-active-quest-btn')?.addEventListener('click', async () => {
    const title = prompt('Quest Title:', 'Seal the Ebonflame Rift');
    if (!title) return;
    const objRaw = prompt('Objectives (comma-separated):', 'Locate the Rift Anchor, Defeat the Ash Warden, Close the Tear') || 'Complete primary objective';
    const rewardGold = parseInt(prompt('Gold Reward (GP):', '400') || '400', 10);
    await worldState.createQuest({
      title,
      rewardGold,
      rewardXp: 1000,
      objectives: objRaw.split(',').map(s => s.trim()).filter(Boolean)
    });
    renderQuestBoard();
  });
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

  // COMPONENT: levelUpModal.js
/**
 * D&D 5.5e Character Level-Up Wizard Modal
 * Supports HP rolling / fixed average / manual roll, class features by level,
 * subclass selection, Ability Score Improvements (ASI), 5.5e Feats & Epic Boons,
 * new Spells & Spell Slot progression, Weapon Masteries, and Supabase cloud persistence.
 */
const DND_LEVEL_UP_DATA = {
  classes: {
    Artificer: {
      hitDie: 8,
      caster: 'half',
      asiLevels: [4, 8, 12, 16, 19],
      subclasses: [
        'Alchemist (TCoE / Eberron)',
        'Armorer (TCoE)',
        'Artillerist (TCoE / Eberron)',
        'Battle Smith (TCoE / Eberron)'
      ],
      featuresByLevel: {
        2: ['Infuse Item (4 Infusions Known, 2 Active)'],
        3: ['Artificer Specialist (Subclass)', 'The Right Tool for the Job'],
        4: ['Ability Score Improvement / Feat'],
        5: ['Artificer Specialist Feature (Extra Attack / Alchemical Savant / Arcane Firearm)'],
        6: ['Tool Expertise', 'Infusions (6 Known, 3 Active)'],
        7: ['Flash of Genius'],
        8: ['Ability Score Improvement / Feat'],
        9: ['Artificer Specialist Feature'],
        10: ['Magic Item Adept', 'Infusions (8 Known, 4 Active)'],
        11: ['Spell-Storing Item'],
        12: ['Ability Score Improvement / Feat'],
        13: ['4th-Level Spell Slot'],
        14: ['Magic Item Savant', 'Infusions (10 Known, 5 Active)'],
        15: ['Artificer Specialist Capstone'],
        16: ['Ability Score Improvement / Feat'],
        17: ['5th-Level Spell Slot'],
        18: ['Magic Item Master', 'Infusions (12 Known, 6 Active)'],
        19: ['Epic Boon'],
        20: ['Soul of Artifice']
      }
    },
    Barbarian: {
      hitDie: 12,
      caster: 'none',
      asiLevels: [4, 8, 12, 16, 19],
      subclasses: [
        'Path of the Berserker (PHB 2024 / 2014)',
        'Path of the Wild Heart / Totem Warrior (PHB 2024 / 2014)',
        'Path of the World Tree (PHB 2024)',
        'Path of the Zealot (PHB 2024 / XGtE)',
        'Path of the Ancestral Guardian (XGtE)',
        'Path of the Storm Herald (XGtE)',
        'Path of the Battlerager (SCAG)',
        'Path of the Beast (TCoE)',
        'Path of Wild Magic (TCoE)',
        'Path of the Giant (Bigby\'s)'
      ],
      featuresByLevel: {
        2: ['Danger Sense', 'Reckless Attack'],
        3: ['Barbarian Subclass', 'Primal Knowledge'],
        4: ['Ability Score Improvement / Feat'],
        5: ['Extra Attack', 'Fast Movement (+10 ft)'],
        6: ['Subclass Feature'],
        7: ['Feral Instinct', 'Instinctive Pounce'],
        8: ['Ability Score Improvement / Feat'],
        9: ['Brutal Strike (+1d10)'],
        10: ['Subclass Feature'],
        11: ['Relentless Rage'],
        12: ['Ability Score Improvement / Feat'],
        13: ['Improved Brutal Strike'],
        14: ['Subclass Feature'],
        15: ['Persistent Rage'],
        16: ['Ability Score Improvement / Feat'],
        17: ['Improved Brutal Strike (+2d10)'],
        18: ['Indomitable Might'],
        19: ['Epic Boon'],
        20: ['Primal Champion (+4 STR, +4 CON)']
      }
    },
    Bard: {
      hitDie: 8,
      caster: 'full',
      asiLevels: [4, 8, 12, 16, 19],
      subclasses: [
        'College of Dance (PHB 2024)',
        'College of Glamour (PHB 2024 / XGtE)',
        'College of Lore (PHB 2024 / 2014)',
        'College of Valor (PHB 2024 / 2014)',
        'College of Swords (XGtE)',
        'College of Whispers (XGtE)',
        'College of Creation (TCoE)',
        'College of Eloquence (TCoE / MOoT)',
        'College of Spirits (VRGtR)'
      ],
      featuresByLevel: {
        2: ['Expertise', 'Jack of All Trades'],
        3: ['Bard Subclass'],
        4: ['Ability Score Improvement / Feat'],
        5: ['Font of Inspiration (d8)'],
        6: ['Subclass Feature'],
        7: ['Countercharm'],
        8: ['Ability Score Improvement / Feat'],
        9: ['Expertise (2 more)'],
        10: ['Magical Secrets (d10)'],
        11: ['6th-Level Spell Slot'],
        12: ['Ability Score Improvement / Feat'],
        13: ['7th-Level Spell Slot'],
        14: ['Subclass Feature'],
        15: ['Bardic Inspiration (d12)'],
        16: ['Ability Score Improvement / Feat'],
        17: ['9th-Level Spell Slot'],
        18: ['Superior Inspiration'],
        19: ['Epic Boon'],
        20: ['Words of Creation']
      }
    },
    Cleric: {
      hitDie: 8,
      caster: 'full',
      asiLevels: [4, 8, 12, 16, 19],
      subclasses: [
        'Life Domain (PHB 2024 / 2014)',
        'Light Domain (PHB 2024 / 2014)',
        'Trickery Domain (PHB 2024 / 2014)',
        'War Domain (PHB 2024 / 2014)',
        'Knowledge Domain (PHB 2014)',
        'Nature Domain (PHB 2014)',
        'Tempest Domain (PHB 2014)',
        'Death Domain (DMG)',
        'Arcana Domain (SCAG)',
        'Forge Domain (XGtE)',
        'Grave Domain (XGtE)',
        'Order Domain (TCoE / GGtR)',
        'Peace Domain (TCoE)',
        'Twilight Domain (TCoE)'
      ],
      featuresByLevel: {
        2: ['Channel Divinity', 'Divine Spark / Turn Undead'],
        3: ['Cleric Subclass'],
        4: ['Ability Score Improvement / Feat'],
        5: ['Sear Undead'],
        6: ['Subclass Feature', 'Channel Divinity (2/rest)'],
        7: ['Blessed Strikes'],
        8: ['Ability Score Improvement / Feat'],
        9: ['5th-Level Spell Slot'],
        10: ['Divine Intervention'],
        11: ['6th-Level Spell Slot'],
        12: ['Ability Score Improvement / Feat'],
        13: ['7th-Level Spell Slot'],
        14: ['Improved Blessed Strikes'],
        15: ['8th-Level Spell Slot'],
        16: ['Ability Score Improvement / Feat'],
        17: ['Subclass Feature (Capstone)'],
        18: ['Channel Divinity (3/rest)'],
        19: ['Epic Boon'],
        20: ['Greater Divine Intervention']
      }
    },
    Druid: {
      hitDie: 8,
      caster: 'full',
      asiLevels: [4, 8, 12, 16, 19],
      subclasses: [
        'Circle of the Land (PHB 2024 / 2014)',
        'Circle of the Moon (PHB 2024 / 2014)',
        'Circle of the Sea (PHB 2024)',
        'Circle of the Stars (PHB 2024 / TCoE)',
        'Circle of Dreams (XGtE)',
        'Circle of the Shepherd (XGtE)',
        'Circle of Spores (TCoE / GGtR)',
        'Circle of Wildfire (TCoE)'
      ],
      featuresByLevel: {
        2: ['Wild Shape', 'Wild Companion'],
        3: ['Druid Subclass'],
        4: ['Ability Score Improvement / Feat'],
        5: ['Wild Resurgence'],
        6: ['Subclass Feature'],
        7: ['Elemental Fury'],
        8: ['Ability Score Improvement / Feat'],
        9: ['5th-Level Spell Slot'],
        10: ['Subclass Feature'],
        11: ['6th-Level Spell Slot'],
        12: ['Ability Score Improvement / Feat'],
        13: ['7th-Level Spell Slot'],
        14: ['Subclass Feature'],
        15: ['Improved Elemental Fury'],
        16: ['Ability Score Improvement / Feat'],
        17: ['9th-Level Spell Slot'],
        18: ['Beast Spells'],
        19: ['Epic Boon'],
        20: ['Archdruid']
      }
    },
    Fighter: {
      hitDie: 10,
      caster: 'none',
      asiLevels: [4, 6, 8, 12, 14, 16, 19],
      subclasses: [
        'Battle Master (PHB 2024 / 2014)',
        'Champion (PHB 2024 / 2014)',
        'Eldritch Knight (PHB 2024 / 2014)',
        'Psi Warrior (PHB 2024 / TCoE)',
        'Arcane Archer (XGtE)',
        'Cavalier (XGtE)',
        'Samurai (XGtE)',
        'Banneret / Purple Dragon Knight (SCAG)',
        'Rune Knight (TCoE)',
        'Echo Knight (EGtW)'
      ],
      featuresByLevel: {
        2: ['Action Surge', 'Tactical Mind'],
        3: ['Fighter Subclass'],
        4: ['Ability Score Improvement / Feat'],
        5: ['Extra Attack', 'Tactical Shift'],
        6: ['Ability Score Improvement / Feat'],
        7: ['Subclass Feature'],
        8: ['Ability Score Improvement / Feat'],
        9: ['Indomitable (1/long rest)', 'Tactical Master'],
        10: ['Subclass Feature'],
        11: ['Two Extra Attacks (3 Attacks)'],
        12: ['Ability Score Improvement / Feat'],
        13: ['Indomitable (2/long rest)', 'Studied Attacks'],
        14: ['Ability Score Improvement / Feat'],
        15: ['Subclass Feature'],
        16: ['Ability Score Improvement / Feat'],
        17: ['Action Surge (2/rest)', 'Indomitable (3/long rest)'],
        18: ['Subclass Feature'],
        19: ['Epic Boon'],
        20: ['Three Extra Attacks (4 Attacks)']
      }
    },
    Monk: {
      hitDie: 8,
      caster: 'none',
      asiLevels: [4, 8, 12, 16, 19],
      subclasses: [
        'Warrior of Mercy (PHB 2024 / TCoE)',
        'Warrior of Shadow (PHB 2024 / 2014)',
        'Warrior of the Elements (PHB 2024 / 2014)',
        'Warrior of the Open Hand (PHB 2024 / 2014)',
        'Way of the Long Death (SCAG)',
        'Way of the Sun Soul (SCAG / XGtE)',
        'Way of the Drunken Master (XGtE)',
        'Way of the Kensei (XGtE)',
        'Way of the Astral Self (TCoE)',
        'Way of the Ascendant Dragon (Fizban\'s)'
      ],
      featuresByLevel: {
        2: ["Monk's Focus", 'Unarmored Movement (+10 ft)', 'Uncanny Metabolism'],
        3: ['Monk Subclass', 'Deflect Attacks'],
        4: ['Ability Score Improvement / Feat', 'Slow Fall'],
        5: ['Extra Attack', 'Stunning Strike', 'Martial Arts (d8)'],
        6: ['Empowered Strikes', 'Subclass Feature'],
        7: ['Evasion'],
        8: ['Ability Score Improvement / Feat'],
        9: ['Acrobatic Movement'],
        10: ['Heightened Focus', 'Self-Restoration'],
        11: ['Subclass Feature', 'Martial Arts (d10)'],
        12: ['Ability Score Improvement / Feat'],
        13: ['Deflect Energy'],
        14: ['Disciplined Survivor'],
        15: ['Perfect Focus'],
        16: ['Ability Score Improvement / Feat'],
        17: ['Subclass Feature', 'Martial Arts (d12)'],
        18: ['Superior Defense'],
        19: ['Epic Boon'],
        20: ['Body and Mind (+4 DEX, +4 WIS)']
      }
    },
    Paladin: {
      hitDie: 10,
      caster: 'half',
      asiLevels: [4, 8, 12, 16, 19],
      subclasses: [
        'Oath of Devotion (PHB 2024 / 2014)',
        'Oath of Glory (PHB 2024 / TCoE / MOoT)',
        'Oath of the Ancients (PHB 2024 / 2014)',
        'Oath of Vengeance (PHB 2024 / 2014)',
        'Oathbreaker (DMG)',
        'Oath of the Crown (SCAG)',
        'Oath of Conquest (XGtE)',
        'Oath of Redemption (XGtE)',
        'Oath of the Watchers (TCoE)'
      ],
      featuresByLevel: {
        2: ['Fighting Style', "Paladin's Smite"],
        3: ['Paladin Subclass', 'Channel Divinity'],
        4: ['Ability Score Improvement / Feat'],
        5: ['Extra Attack', 'Faithful Steed'],
        6: ['Aura of Protection'],
        7: ['Subclass Feature'],
        8: ['Ability Score Improvement / Feat'],
        9: ['Abjure Foes'],
        10: ['Aura of Courage'],
        11: ['Radiant Strikes (+1d8)'],
        12: ['Ability Score Improvement / Feat'],
        13: ['4th-Level Spell Slot'],
        14: ['Restoring Touch'],
        15: ['Subclass Feature'],
        16: ['Ability Score Improvement / Feat'],
        17: ['5th-Level Spell Slot'],
        18: ['Aura Expansion (30 ft)'],
        19: ['Epic Boon'],
        20: ['Subclass Capstone']
      }
    },
    Ranger: {
      hitDie: 10,
      caster: 'half',
      asiLevels: [4, 8, 12, 16, 19],
      subclasses: [
        'Beast Master (PHB 2024 / 2014)',
        'Fey Wanderer (PHB 2024 / TCoE)',
        'Gloom Stalker (PHB 2024 / XGtE)',
        'Hunter (PHB 2024 / 2014)',
        'Horizon Walker (XGtE)',
        'Monster Slayer (XGtE)',
        'Swarmkeeper (TCoE)',
        'Drakewarden (Fizban\'s)'
      ],
      featuresByLevel: {
        2: ['Deft Explorer', 'Fighting Style'],
        3: ['Ranger Subclass'],
        4: ['Ability Score Improvement / Feat'],
        5: ['Extra Attack'],
        6: ['Roving (+10 ft Speed, Climb & Swim)'],
        7: ['Subclass Feature'],
        8: ['Ability Score Improvement / Feat'],
        9: ['Expertise (2 Skills)'],
        10: ['Tireless'],
        11: ['Subclass Feature'],
        12: ['Ability Score Improvement / Feat'],
        13: ['Relentless Hunter'],
        14: ["Nature's Veil"],
        15: ['Subclass Feature'],
        16: ['Ability Score Improvement / Feat'],
        17: ['Precise Hunter'],
        18: ['Feral Senses'],
        19: ['Epic Boon'],
        20: ['Foe Slayer']
      }
    },
    Rogue: {
      hitDie: 8,
      caster: 'none',
      asiLevels: [4, 8, 10, 12, 16, 19],
      subclasses: [
        'Arcane Trickster (PHB 2024 / 2014)',
        'Assassin (PHB 2024 / 2014)',
        'Soulknife (PHB 2024 / TCoE)',
        'Thief (PHB 2024 / 2014)',
        'Mastermind (SCAG / XGtE)',
        'Swashbuckler (SCAG / XGtE)',
        'Inquisitive (XGtE)',
        'Scout (XGtE)',
        'Phantom (TCoE)'
      ],
      featuresByLevel: {
        2: ['Cunning Action'],
        3: ['Rogue Subclass', 'Steady Aim', 'Sneak Attack (2d6)'],
        4: ['Ability Score Improvement / Feat'],
        5: ['Cunning Strike', 'Uncanny Dodge', 'Sneak Attack (3d6)'],
        6: ['Expertise (2 more)'],
        7: ['Evasion', 'Reliable Talent', 'Sneak Attack (4d6)'],
        8: ['Ability Score Improvement / Feat'],
        9: ['Subclass Feature', 'Sneak Attack (5d6)'],
        10: ['Ability Score Improvement / Feat'],
        11: ['Improved Cunning Strike', 'Sneak Attack (6d6)'],
        12: ['Ability Score Improvement / Feat'],
        13: ['Subclass Feature', 'Sneak Attack (7d6)'],
        14: ['Devious Strikes'],
        15: ['Slippery Mind', 'Sneak Attack (8d6)'],
        16: ['Ability Score Improvement / Feat'],
        17: ['Subclass Feature', 'Sneak Attack (9d6)'],
        18: ['Elusive'],
        19: ['Epic Boon', 'Sneak Attack (10d6)'],
        20: ['Stroke of Luck']
      }
    },
    Sorcerer: {
      hitDie: 6,
      caster: 'full',
      asiLevels: [4, 8, 12, 16, 19],
      subclasses: [
        'Aberrant Sorcery / Aberrant Mind (PHB 2024 / TCoE)',
        'Clockwork Sorcery / Clockwork Soul (PHB 2024 / TCoE)',
        'Draconic Sorcery / Draconic Bloodline (PHB 2024 / 2014)',
        'Wild Magic Sorcery (PHB 2024 / 2014)',
        'Storm Sorcery (SCAG / XGtE)',
        'Divine Soul (XGtE)',
        'Shadow Magic (XGtE)',
        'Lunar Sorcery (Dragonlance)'
      ],
      featuresByLevel: {
        2: ['Font of Magic (Sorcery Points)', 'Metamagic (2 options)'],
        3: ['Sorcerer Subclass'],
        4: ['Ability Score Improvement / Feat'],
        5: ['Sorcerous Restoration'],
        6: ['Subclass Feature'],
        7: ['Sorcery Incarnate'],
        8: ['Ability Score Improvement / Feat'],
        9: ['5th-Level Spell Slot'],
        10: ['Metamagic (2 more options)'],
        11: ['6th-Level Spell Slot'],
        12: ['Ability Score Improvement / Feat'],
        13: ['7th-Level Spell Slot'],
        14: ['Subclass Feature'],
        15: ['8th-Level Spell Slot'],
        16: ['Ability Score Improvement / Feat'],
        17: ['Metamagic (2 more)', '9th-Level Spell Slot'],
        18: ['Subclass Feature'],
        19: ['Epic Boon'],
        20: ['Arcane Apotheosis']
      }
    },
    Warlock: {
      hitDie: 8,
      caster: 'pact',
      asiLevels: [4, 8, 12, 16, 19],
      subclasses: [
        'Archfey Patron (PHB 2024 / 2014)',
        'Celestial Patron (PHB 2024 / XGtE)',
        'Fiend Patron (PHB 2024 / 2014)',
        'Great Old One Patron (PHB 2024 / 2014)',
        'The Undying (SCAG)',
        'The Hexblade (XGtE)',
        'The Fathomless (TCoE)',
        'The Genie (TCoE)',
        'The Undead (VRGtR)'
      ],
      featuresByLevel: {
        2: ['Magical Cunning', 'Eldritch Invocations (3 total)'],
        3: ['Warlock Subclass', '2nd-Level Pact Slots'],
        4: ['Ability Score Improvement / Feat'],
        5: ['3rd-Level Pact Slots', 'Eldritch Invocations (5 total)'],
        6: ['Subclass Feature'],
        7: ['4th-Level Pact Slots', 'Eldritch Invocations (6 total)'],
        8: ['Ability Score Improvement / Feat'],
        9: ['Contact Patron', '5th-Level Pact Slots'],
        10: ['Subclass Feature'],
        11: ['Mystic Arcanum (6th-Level)'],
        12: ['Ability Score Improvement / Feat'],
        13: ['Mystic Arcanum (7th-Level)'],
        14: ['Subclass Feature'],
        15: ['Mystic Arcanum (8th-Level)'],
        16: ['Ability Score Improvement / Feat'],
        17: ['Mystic Arcanum (9th-Level)', '4 Pact Slots'],
        18: ['Eldritch Invocations (10 total)'],
        19: ['Epic Boon'],
        20: ['Eldritch Master']
      }
    },
    Wizard: {
      hitDie: 6,
      caster: 'full',
      asiLevels: [4, 8, 12, 16, 19],
      subclasses: [
        'Abjurer / School of Abjuration (PHB 2024 / 2014)',
        'Diviner / School of Divination (PHB 2024 / 2014)',
        'Evoker / School of Evocation (PHB 2024 / 2014)',
        'Illusionist / School of Illusion (PHB 2024 / 2014)',
        'School of Conjuration (PHB 2014)',
        'School of Enchantment (PHB 2014)',
        'School of Necromancy (PHB 2014)',
        'School of Transmutation (PHB 2014)',
        'Bladesinging (SCAG / TCoE)',
        'War Magic (XGtE)',
        'Order of Scribes (TCoE)',
        'Chronurgy Magic (EGtW)',
        'Graviturgy Magic (EGtW)'
      ],
      featuresByLevel: {
        2: ['Scholar (Expertise in Arcane Skill)'],
        3: ['Wizard Subclass', '2nd-Level Spell Slots'],
        4: ['Ability Score Improvement / Feat'],
        5: ['Memorize Spell', '3rd-Level Spell Slots'],
        6: ['Subclass Feature'],
        7: ['4th-Level Spell Slots'],
        8: ['Ability Score Improvement / Feat'],
        9: ['5th-Level Spell Slots'],
        10: ['Subclass Feature'],
        11: ['6th-Level Spell Slots'],
        12: ['Ability Score Improvement / Feat'],
        13: ['7th-Level Spell Slots'],
        14: ['Subclass Feature'],
        15: ['8th-Level Spell Slots'],
        16: ['Ability Score Improvement / Feat'],
        17: ['9th-Level Spell Slots'],
        18: ['Spell Mastery'],
        19: ['Epic Boon'],
        20: ['Signature Spells']
      }
    }
  },

  feats: [
    { name: 'Alert', halfStat: null, desc: 'Add Proficiency Bonus to Initiative; swap initiative with an ally.' },
    { name: 'Tough', halfStat: null, desc: '+2 Max HP per character level (retroactive and on every future level up).' },
    { name: 'War Caster', halfStat: ['int', 'wis', 'cha'], desc: '+1 INT/WIS/CHA, Advantage on Concentration saves, cast spells as Opportunity Attacks.' },
    { name: 'Great Weapon Master', halfStat: ['str'], desc: '+1 STR, add Proficiency Bonus to Heavy weapon damage, bonus action Cleave on crit/kill.' },
    { name: 'Sharpshooter', halfStat: ['dex'], desc: '+1 DEX, bypass cover, no disadvantage at long range or in melee.' },
    { name: 'Sentinel', halfStat: ['str', 'dex'], desc: '+1 STR/DEX, Opportunity Attacks reduce target speed to 0 and punish Disengage.' },
    { name: 'Fey-Touched', halfStat: ['int', 'wis', 'cha'], desc: '+1 INT/WIS/CHA, learn Misty Step + 1 Divination/Enchantment 1st-level spell.' },
    { name: 'Shadow-Touched', halfStat: ['int', 'wis', 'cha'], desc: '+1 INT/WIS/CHA, learn Invisibility + 1 Illusion/Necromancy 1st-level spell.' },
    { name: 'Resilient', halfStat: ['str', 'dex', 'con', 'int', 'wis', 'cha'], desc: '+1 to chosen ability and gain Saving Throw proficiency in that ability.' },
    { name: 'Polearm Master', halfStat: ['str', 'dex'], desc: '+1 STR/DEX, bonus action butt-end strike (1d4), reactive strike on enemy approach.' },
    { name: 'Shield Master', halfStat: ['str'], desc: '+1 STR, Shield Bash (Push/Prone) after Attack, negate DEX save damage with reaction.' },
    { name: 'Mage Slayer', halfStat: ['str', 'dex'], desc: '+1 STR/DEX, Concentration Breaker, Guarded Mind auto-succeed once per short rest.' },
    { name: 'Observant', halfStat: ['int', 'wis'], desc: '+1 INT/WIS, +5 Passive Perception, Quick Search as a Bonus Action.' },
    { name: 'Telekinetic', halfStat: ['int', 'wis', 'cha'], desc: '+1 INT/WIS/CHA, invisible Mage Hand, Bonus Action 5-ft telekinetic shove.' },
    { name: 'Dual Wielder', halfStat: ['str', 'dex'], desc: '+1 STR/DEX, Enhanced Dual Wielding bonus attack with non-Heavy weapons.' },
    { name: 'Heavy Armor Master', halfStat: ['str', 'con'], desc: '+1 STR/CON, reduce Bludgeoning/Piercing/Slashing damage by Proficiency Bonus.' },
    { name: 'Lucky', halfStat: null, desc: 'Gain Luck Points equal to Proficiency Bonus to grant Advantage or impose Disadvantage.' },
    { name: 'Boon of Combat Prowess (Epic)', halfStat: ['str', 'dex', 'con', 'int', 'wis', 'cha'], desc: 'Lvl 19+: +1 any stat (cap 30); once per turn, turn a missed attack into a hit.' },
    { name: 'Boon of Dimensional Travel (Epic)', halfStat: ['str', 'dex', 'con', 'int', 'wis', 'cha'], desc: 'Lvl 19+: +1 any stat; teleport 30 ft immediately after Attack or Magic action.' }
  ],

  spellsByLevel: {
    0: ['Fire Bolt', 'Eldritch Blast', 'Guidance', 'Mage Hand', 'Minor Illusion', 'Prestidigitation', 'Ray of Frost', 'Sacred Flame', 'Toll the Dead', 'Vicious Mockery', 'Booming Blade', 'Thorn Whip'],
    1: ['Shield', 'Magic Missile', 'Healing Word', 'Cure Wounds', 'Bless', 'Guiding Bolt', 'Hunter\'s Mark', 'Hex', 'Thunderwave', 'Chromatic Orb', 'Faerie Fire', 'Find Familiar', 'Absorb Elements', 'Silvery Barbs'],
    2: ['Misty Step', 'Spiritual Weapon', 'Hold Person', 'Invisibility', 'Pass without Trace', 'Web', 'Mirror Image', 'Moonbeam', 'Scorching Ray', 'Lesser Restoration', 'Shatter', 'Aid'],
    3: ['Fireball', 'Counterspell', 'Spirit Guardians', 'Revivify', 'Haste', 'Fly', 'Hypnotic Pattern', 'Lightning Bolt', 'Dispel Magic', 'Call Lightning', 'Aura of Vitality', 'Conjure Animals'],
    4: ['Polymorph', 'Dimension Door', 'Greater Invisibility', 'Banishment', 'Wall of Fire', 'Death Ward', 'Blight', 'Ice Storm', 'Find Greater Steed'],
    5: ['Wall of Force', 'Cone of Cold', 'Greater Restoration', 'Mass Cure Wounds', 'Hold Monster', 'Synaptic Static', 'Steel Wind Strike', 'Animate Objects', 'Teleportation Circle'],
    6: ['Chain Lightning', 'Disintegrate', 'Heal', 'Sunbeam', 'Globe of Invulnerability', 'Heroes\' Feast', 'True Seeing'],
    7: ['Forcecage', 'Teleport', 'Finger of Death', 'Fire Storm', 'Resurrection', 'Prismatic Spray'],
    8: ['Maze', 'Mind Blank', 'Sunburst', 'Holy Aura', 'Dominate Monster'],
    9: ['Wish', 'Meteor Swarm', 'Power Word Kill', 'True Resurrection', 'Foresight', 'Time Stop']
  },

  weaponMasteries: [
    'Cleave (Greataxe / Halberd)',
    'Graze (Glaive / Greatsword)',
    'Nick (Dagger / Scimitar)',
    'Push (Pike / Greatclub)',
    'Sap (Longsword / Mace / Flail)',
    'Slow (Longbow / Whip / Club)',
    'Topple (Battleaxe / Warhammer / Quarterstaff)',
    'Vex (Rapier / Shortsword / Handaxe)'
  ],

  getProficiencyBonus(level) {
    return Math.ceil((parseInt(level, 10) || 1) / 4) + 1;
  },

  resolveClassKey(classRole) {
    const raw = String(classRole || 'Fighter').toLowerCase();
    const keys = Object.keys(this.classes);
    return keys.find(k => raw.includes(k.toLowerCase())) || 'Fighter';
  },

  getSpellSlotsForLevel(casterType, level) {
    const lvl = Math.max(1, Math.min(20, parseInt(level, 10) || 1));
    if (casterType === 'none') return {};
    if (casterType === 'pact') {
      const slotCount = lvl === 1 ? 1 : lvl < 11 ? 2 : lvl < 17 ? 3 : 4;
      const slotLvl = Math.min(5, Math.ceil(lvl / 2));
      return { [`Pact Lvl ${slotLvl}`]: slotCount };
    }
    const eff = casterType === 'half' ? Math.ceil(lvl / 2) : lvl;
    const fullTable = {
      1: { 1: 2 },
      2: { 1: 3 },
      3: { 1: 4, 2: 2 },
      4: { 1: 4, 2: 3 },
      5: { 1: 4, 2: 3, 3: 2 },
      6: { 1: 4, 2: 3, 3: 3 },
      7: { 1: 4, 2: 3, 3: 3, 4: 1 },
      8: { 1: 4, 2: 3, 3: 3, 4: 2 },
      9: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
      10: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
      11: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
      12: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
      13: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
      14: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
      15: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
      16: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
      17: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1, 9: 1 },
      18: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 1, 7: 1, 8: 1, 9: 1 },
      19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 1, 8: 1, 9: 1 },
      20: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 2, 8: 1, 9: 1 }
    };
    return fullTable[Math.min(20, eff)] || {};
  },

  getMaxSpellLevel(casterType, level) {
    if (casterType === 'none') return 0;
    if (casterType === 'pact') return Math.min(5, Math.ceil(level / 2));
    const slots = this.getSpellSlotsForLevel(casterType, level);
    const lvls = Object.keys(slots).map(Number).filter(n => !isNaN(n));
    return lvls.length > 0 ? Math.max(...lvls) : 1;
  }
};
function openLevelUpModal(charId, onComplete = null) {
  const char = (worldState.data.partyCharacters || []).find(c => c.id === charId);
  if (!char) {
    alert('Character not found.');
    return;
  }
  if (!worldState.canControlCharacter(char.id)) {
    alert('You can only level up your own hero (or unlock Dungeon Master mode).');
    return;
  }
  const currentLevel = parseInt(char.level, 10) || 1;
  if (currentLevel >= 20) {
    alert(`${char.name} has already reached maximum level (Level 20)!`);
    return;
  }

  const nextLevel = currentLevel + 1;
  const classKey = DND_LEVEL_UP_DATA.resolveClassKey(char.classRole);
  const classInfo = DND_LEVEL_UP_DATA.classes[classKey];
  const fixedAvg = Math.floor(classInfo.hitDie / 2) + 1;
  const isAsiLevel = classInfo.asiLevels.includes(nextLevel);
  const needsSubclass = nextLevel === 3 || (!char.subclass && nextLevel >= 3);
  const isCaster = classInfo.caster !== 'none' || (char.classRole || '').toLowerCase().includes('eldritch') || (char.classRole || '').toLowerCase().includes('trickster');
  const maxSpellLvl = isCaster ? Math.max(1, DND_LEVEL_UP_DATA.getMaxSpellLevel(classInfo.caster === 'none' ? 'half' : classInfo.caster, nextLevel)) : 0;
  const newSpellSlots = isCaster ? DND_LEVEL_UP_DATA.getSpellSlotsForLevel(classInfo.caster === 'none' ? 'half' : classInfo.caster, nextLevel) : {};
  const unlockedFeatures = classInfo.featuresByLevel[nextLevel] || [`${classKey} Class Progression`];

  const state = {
    hpMethod: 'average', // 'average' | 'roll' | 'manual'
    hpRoll: fixedAvg,
    hasRolledHp: false,
    subclass: char.subclass || '',
    customSubclass: '',
    grantAsiOrFeat: isAsiLevel,
    asiMode: 'asi', // 'asi' | 'feat'
    asiAlloc: { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 },
    selectedFeat: '',
    customFeat: '',
    halfFeatStat: '',
    selectedSpells: [],
    customSpell: '',
    spellFilterLevel: Math.min(maxSpellLvl, 1),
    selectedMastery: ''
  };

  // Ensure overlay container exists
  let modal = document.getElementById('character-level-up-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'character-level-up-modal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  const getMod = (v) => Math.floor(((parseInt(v, 10) || 10) - 10) / 2);
  const fmtMod = (m) => (m >= 0 ? `+${m}` : `${m}`);

  function getPendingStatIncreases() {
    const inc = { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 };
    if (!state.grantAsiOrFeat) return inc;
    if (state.asiMode === 'asi') {
      Object.keys(inc).forEach(k => { inc[k] = state.asiAlloc[k] || 0; });
    } else if (state.asiMode === 'feat' && state.halfFeatStat) {
      inc[state.halfFeatStat] = 1;
    }
    return inc;
  }

  function getProjectedStats() {
    const inc = getPendingStatIncreases();
    const out = {};
    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(k => {
      out[k] = Math.min(nextLevel >= 19 ? 22 : 20, (parseInt(char.stats?.[k], 10) || 10) + inc[k]);
    });
    return out;
  }

  function getProjectedHpGain() {
    const oldConMod = getMod(char.stats?.con || 10);
    const projStats = getProjectedStats();
    const newConMod = getMod(projStats.con);
    const perLvl = Math.max(1, (parseInt(state.hpRoll, 10) || 1) + newConMod);
    const retroCon = Math.max(0, (newConMod - oldConMod) * currentLevel);
    const featName = (state.grantAsiOrFeat && state.asiMode === 'feat') ? (state.customFeat || state.selectedFeat) : '';
    const hadTough = (char.feats || []).some(f => String(f).toLowerCase().includes('tough'));
    const gainedTough = !hadTough && featName.toLowerCase().includes('tough');
    const toughBonus = gainedTough ? (2 * nextLevel) : (hadTough ? 2 : 0);
    const dwarfBonus = (char.species || '').toLowerCase().includes('dwarf') ? 1 : 0;
    return {
      total: perLvl + retroCon + toughBonus + dwarfBonus,
      newConMod,
      retroCon,
      toughBonus,
      dwarfBonus
    };
  }

  function renderModal() {
    const projStats = getProjectedStats();
    const hpInfo = getProjectedHpGain();
    const oldProf = DND_LEVEL_UP_DATA.getProficiencyBonus(currentLevel);
    const newProf = DND_LEVEL_UP_DATA.getProficiencyBonus(nextLevel);
    const asiSpent = Object.values(state.asiAlloc).reduce((a, b) => a + b, 0);
    const selectedFeatObj = DND_LEVEL_UP_DATA.feats.find(f => f.name === state.selectedFeat);

    modal.innerHTML = `
      <div class="modal-card" style="max-width: 820px; max-height: 90vh;">
        <div class="modal-header" style="background: linear-gradient(90deg, rgba(212, 175, 55, 0.2), rgba(56, 189, 248, 0.12)); border-bottom: 1px solid var(--accent-gold);">
          <div>
            <h3 style="margin: 0; color: var(--text-gold); font-size: 1.25rem;">
              ⬆️ Level Up: ${char.name} (Level ${currentLevel} → Level ${nextLevel})
            </h3>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">
              ${char.species} • ${classKey} (Hit Die: d${classInfo.hitDie}) • Proficiency Bonus: +${oldProf}${newProf > oldProf ? ` → <strong style="color:#81c784;">+${newProf}</strong>` : ''}
            </div>
          </div>
          <button class="close-btn" id="close-level-up-modal">&times;</button>
        </div>

        <div class="modal-body" style="padding: 1.25rem; overflow-y: auto; display: flex; flex-direction: column; gap: 1.25rem;">

          <!-- 1. Features Gained at New Level -->
          <div style="background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem;">
            <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: var(--text-gold); margin-bottom: 0.5rem;">
              1. Class Abilities & Features Gained at Level ${nextLevel}
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.45rem;">
              ${unlockedFeatures.map(f => `
                <span style="background: rgba(212, 175, 55, 0.16); border: 1px solid rgba(212, 175, 55, 0.45); color: var(--text-gold); padding: 0.25rem 0.65rem; border-radius: var(--radius-full); font-size: 0.82rem; font-weight: 600;">
                  ✦ ${f}
                </span>
              `).join('')}
            </div>
          </div>

          <!-- 2. Hit Points Increase (Roll / Fixed Average / Manual) -->
          <div style="background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
              <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: var(--text-gold);">
                2. Hit Points Increase (d${classInfo.hitDie} + CON ${fmtMod(hpInfo.newConMod)})
              </div>
              <div style="font-size: 0.95rem; font-weight: 700; color: #81c784;">
                +${hpInfo.total} HP (Max HP: ${char.hpMax} → ${char.hpMax + hpInfo.total})
              </div>
            </div>

            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.75rem;">
              <button type="button" class="btn btn-sm ${state.hpMethod === 'average' ? 'btn-primary' : ''}" data-hp-method="average">
                📊 Fixed Average (${fixedAvg} + CON)
              </button>
              <button type="button" class="btn btn-sm ${state.hpMethod === 'roll' ? 'btn-primary' : ''}" data-hp-method="roll" id="btn-lvl-roll-hp">
                🎲 Roll 1d${classInfo.hitDie} for HP ${state.hpMethod === 'roll' && state.hasRolledHp ? `(Rolled: ${state.hpRoll})` : ''}
              </button>
              <button type="button" class="btn btn-sm ${state.hpMethod === 'manual' ? 'btn-primary' : ''}" data-hp-method="manual">
                ✏️ Manual Table Roll
              </button>
            </div>

            ${state.hpMethod === 'manual' ? `
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <label for="lvl-manual-hp-input" style="font-size: 0.85rem;">Die Result (1–${classInfo.hitDie}):</label>
                <input type="number" id="lvl-manual-hp-input" class="form-control" min="1" max="${classInfo.hitDie}" value="${state.hpRoll}" style="width: 90px; text-align: center; font-weight: 700;">
              </div>
            ` : ''}

            ${(hpInfo.retroCon > 0 || hpInfo.toughBonus > 0 || hpInfo.dwarfBonus > 0) ? `
              <div style="margin-top: 0.5rem; font-size: 0.78rem; color: #a5d6a7;">
                Bonuses applied:
                ${hpInfo.retroCon > 0 ? ` • Retroactive CON (+${hpInfo.retroCon})` : ''}
                ${hpInfo.toughBonus > 0 ? ` • Tough Feat (+${hpInfo.toughBonus})` : ''}
                ${hpInfo.dwarfBonus > 0 ? ` • Dwarven Toughness (+${hpInfo.dwarfBonus})` : ''}
              </div>
            ` : ''}
          </div>

          <!-- 3. Subclass Selection (Level 3 or Unchosen) -->
          ${needsSubclass ? `
            <div style="background: var(--bg-tertiary); border: 1px solid rgba(56, 189, 248, 0.35); border-radius: var(--radius-md); padding: 1rem;">
              <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #38bdf8; margin-bottom: 0.6rem;">
                3. Choose Your ${classKey} Subclass (5.5e)
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem;">
                <select id="lvl-subclass-select" class="form-control">
                  <option value="">-- Select Official 5.5e Subclass --</option>
                  ${classInfo.subclasses.map(sc => `<option value="${sc}" ${state.subclass === sc ? 'selected' : ''}>${sc}</option>`).join('')}
                </select>
                <input type="text" id="lvl-subclass-custom" class="form-control" placeholder="Or enter custom subclass..." value="${state.customSubclass}">
              </div>
            </div>
          ` : ''}

          <!-- 4. Ability Score Improvement (ASI) OR 5.5e Feat -->
          <div style="background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.6rem;">
              <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: var(--text-gold);">
                4. Ability Score Improvement (ASI) or 5.5e Feat
              </div>
              ${!isAsiLevel ? `
                <label style="font-size: 0.78rem; color: var(--text-secondary); display: flex; align-items: center; gap: 0.35rem; cursor: pointer;">
                  <input type="checkbox" id="lvl-toggle-bonus-asi" ${state.grantAsiOrFeat ? 'checked' : ''}>
                  Grant Bonus / DM-Awarded Feat or ASI
                </label>
              ` : `<span style="font-size: 0.75rem; color: #81c784; font-weight: 700;">Unlocked at Level ${nextLevel}!</span>`}
            </div>

            ${state.grantAsiOrFeat ? `
              <div style="display: flex; gap: 0.5rem; margin-bottom: 0.85rem;">
                <button type="button" class="btn btn-sm ${state.asiMode === 'asi' ? 'btn-primary' : ''}" data-asi-mode="asi">
                  Ability Score Improvement (+2 Total)
                </button>
                <button type="button" class="btn btn-sm ${state.asiMode === 'feat' ? 'btn-primary' : ''}" data-asi-mode="feat">
                  Choose a 5.5e Feat / Epic Boon
                </button>
              </div>

              ${state.asiMode === 'asi' ? `
                <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.6rem;">
                  Points Remaining: <strong style="color: ${2 - asiSpent === 0 ? '#81c784' : 'var(--text-gold)'};">${2 - asiSpent} / 2</strong>
                </div>
                <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 0.4rem; text-align: center;">
                  ${['str', 'dex', 'con', 'int', 'wis', 'cha'].map(stat => {
                    const base = parseInt(char.stats?.[stat], 10) || 10;
                    const inc = state.asiAlloc[stat] || 0;
                    const proj = projStats[stat];
                    return `
                      <div style="background: var(--bg-card); padding: 0.4rem; border-radius: var(--radius-sm); border: 1px solid ${inc > 0 ? 'var(--accent-gold)' : 'var(--border-subtle)'};">
                        <div style="font-size: 0.7rem; font-weight: 700; color: var(--text-gold);">${stat.toUpperCase()}</div>
                        <div style="font-size: 1rem; font-weight: 700;">${proj} <span style="font-size: 0.7rem; color: #81c784;">(${fmtMod(getMod(proj))})</span></div>
                        <div style="display: flex; justify-content: center; gap: 0.25rem; margin-top: 0.25rem;">
                          <button type="button" class="btn btn-sm lvl-asi-dec" data-stat="${stat}" style="padding: 1px 6px;" ${inc <= 0 ? 'disabled' : ''}>-</button>
                          <button type="button" class="btn btn-sm lvl-asi-inc" data-stat="${stat}" style="padding: 1px 6px;" ${(asiSpent >= 2 || proj >= (nextLevel >= 19 ? 22 : 20)) ? 'disabled' : ''}>+</button>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              ` : `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; margin-bottom: 0.5rem;">
                  <select id="lvl-feat-select" class="form-control">
                    <option value="">-- Choose a 5.5e Feat --</option>
                    ${DND_LEVEL_UP_DATA.feats.map(f => `<option value="${f.name}" ${state.selectedFeat === f.name ? 'selected' : ''}>${f.name}</option>`).join('')}
                  </select>
                  <input type="text" id="lvl-feat-custom" class="form-control" placeholder="Or enter custom feat..." value="${state.customFeat}">
                </div>
                ${selectedFeatObj ? `
                  <div style="font-size: 0.8rem; color: var(--text-secondary); background: rgba(0,0,0,0.2); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); margin-bottom: 0.5rem;">
                    <strong>${selectedFeatObj.name}:</strong> ${selectedFeatObj.desc}
                  </div>
                ` : ''}
                ${selectedFeatObj && selectedFeatObj.halfStat ? `
                  <div style="display: flex; align-items: center; gap: 0.6rem;">
                    <label for="lvl-half-feat-stat" style="font-size: 0.8rem; font-weight: 600; color: var(--text-gold);">Half-Feat +1 Ability Bonus:</label>
                    <select id="lvl-half-feat-stat" class="form-control" style="width: 140px;">
                      <option value="">-- Choose --</option>
                      ${selectedFeatObj.halfStat.map(s => `<option value="${s}" ${state.halfFeatStat === s ? 'selected' : ''}>+1 ${s.toUpperCase()} (${(char.stats?.[s] || 10)} → ${(char.stats?.[s] || 10) + 1})</option>`).join('')}
                    </select>
                  </div>
                ` : ''}
              `}
            ` : `
              <div style="font-size: 0.82rem; color: var(--text-muted);">
                Next standard ASI / Feat level for ${classKey}: Level ${classInfo.asiLevels.find(l => l > nextLevel) || 19}.
              </div>
            `}
          </div>

          <!-- 5. New Spells & Spell Slots (Spellcasters & Half-Casters) -->
          ${isCaster ? `
            <div style="background: var(--bg-tertiary); border: 1px solid rgba(129, 140, 248, 0.35); border-radius: var(--radius-md); padding: 1rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.6rem;">
                <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #a5b4fc;">
                  5. New Spells & Spell Slots (Up to Level ${maxSpellLvl})
                </div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">
                  Slots: ${Object.entries(newSpellSlots).map(([k, v]) => `<strong>L${k}:</strong> ${v}`).join(' • ')}
                </div>
              </div>

              <div style="display: flex; gap: 0.3rem; flex-wrap: wrap; margin-bottom: 0.6rem;">
                ${Array.from({ length: maxSpellLvl + 1 }, (_, i) => i).map(lvl => `
                  <button type="button" class="btn btn-sm ${state.spellFilterLevel === lvl ? 'btn-primary' : ''}" data-spell-lvl="${lvl}" style="padding: 2px 8px; font-size: 0.75rem;">
                    ${lvl === 0 ? 'Cantrips' : 'Lvl ' + lvl}
                  </button>
                `).join('')}
              </div>

              <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.7rem;">
                ${(DND_LEVEL_UP_DATA.spellsByLevel[state.spellFilterLevel] || []).map(sp => {
                  const chosen = state.selectedSpells.includes(sp);
                  const known = (char.spells || []).includes(sp);
                  return `
                    <button type="button" class="btn btn-sm lvl-spell-chip ${chosen ? 'btn-primary' : ''}" data-spell="${sp}" style="font-size: 0.75rem; padding: 3px 8px; ${known ? 'opacity: 0.5;' : ''}" ${known ? 'disabled title="Already known"' : ''}>
                      ${chosen ? '✓ ' : '+ '}${sp}
                    </button>
                  `;
                }).join('')}
              </div>

              <div style="display: flex; gap: 0.5rem;">
                <input type="text" id="lvl-custom-spell-input" class="form-control" placeholder="Add custom / homebrew spell..." value="${state.customSpell}" style="flex: 1;">
                <button type="button" class="btn btn-sm" id="btn-add-custom-spell">+ Add Spell</button>
              </div>
              ${state.selectedSpells.length > 0 ? `
                <div style="margin-top: 0.5rem; font-size: 0.78rem; color: #a5b4fc;">
                  Learning: <strong>${state.selectedSpells.join(', ')}</strong>
                </div>
              ` : ''}
            </div>
          ` : ''}

          <!-- 6. Optional 5.5e Weapon Mastery -->
          <div style="background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0.85rem 1rem;">
            <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: var(--text-gold); margin-bottom: 0.5rem;">
              ${isCaster ? '6.' : '5.'} Optional 5.5e Weapon Mastery Unlock
            </div>
            <select id="lvl-mastery-select" class="form-control">
              <option value="">-- Keep Current Weapon Masteries --</option>
              ${DND_LEVEL_UP_DATA.weaponMasteries.map(m => `<option value="${m}" ${state.selectedMastery === m ? 'selected' : ''}>+ ${m}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="modal-footer" style="display: flex; justify-content: space-between; align-items: center; padding: 0.85rem 1.25rem; border-top: 1px solid var(--border-subtle);">
          <div style="font-size: 0.82rem; color: var(--text-muted);">
            Saves immediately to Supabase Cloud &amp; syncs live to party.
          </div>
          <div style="display: flex; gap: 0.6rem;">
            <button type="button" class="btn" id="cancel-level-up-btn">Cancel</button>
            <button type="button" class="btn btn-primary" id="confirm-level-up-btn" style="font-weight: 700;">
              ✨ Confirm Level ${nextLevel} (+${hpInfo.total} HP)
            </button>
          </div>
        </div>
      </div>
    `;

    bindModalEvents();
  }

  function closeModal() {
    modal.classList.remove('active');
  }

  function bindModalEvents() {
    modal.querySelector('#close-level-up-modal')?.addEventListener('click', closeModal);
    modal.querySelector('#cancel-level-up-btn')?.addEventListener('click', closeModal);

    // HP method buttons
    modal.querySelectorAll('button[data-hp-method]').forEach(btn => {
      btn.addEventListener('click', () => {
        const m = btn.getAttribute('data-hp-method');
        state.hpMethod = m;
        if (m === 'average') {
          state.hpRoll = fixedAvg;
        } else if (m === 'roll') {
          state.hpRoll = Math.floor(Math.random() * classInfo.hitDie) + 1;
          state.hasRolledHp = true;
          try { soundEngine.playDiceRoll(state.hpRoll === classInfo.hitDie); } catch (_) {}
        }
        renderModal();
      });
    });

    modal.querySelector('#lvl-manual-hp-input')?.addEventListener('change', (e) => {
      const val = Math.max(1, Math.min(classInfo.hitDie, parseInt(e.target.value, 10) || 1));
      state.hpRoll = val;
      renderModal();
    });

    // Subclass
    modal.querySelector('#lvl-subclass-select')?.addEventListener('change', (e) => {
      state.subclass = e.target.value;
    });
    modal.querySelector('#lvl-subclass-custom')?.addEventListener('input', (e) => {
      state.customSubclass = e.target.value;
    });

    // Bonus ASI/Feat toggle
    modal.querySelector('#lvl-toggle-bonus-asi')?.addEventListener('change', (e) => {
      state.grantAsiOrFeat = e.target.checked;
      renderModal();
    });

    // ASI vs Feat mode
    modal.querySelectorAll('button[data-asi-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.asiMode = btn.getAttribute('data-asi-mode');
        renderModal();
      });
    });

    // ASI +/- buttons
    modal.querySelectorAll('.lvl-asi-inc').forEach(btn => {
      btn.addEventListener('click', () => {
        const s = btn.getAttribute('data-stat');
        const spent = Object.values(state.asiAlloc).reduce((a, b) => a + b, 0);
        if (spent < 2) {
          state.asiAlloc[s] = (state.asiAlloc[s] || 0) + 1;
          renderModal();
        }
      });
    });
    modal.querySelectorAll('.lvl-asi-dec').forEach(btn => {
      btn.addEventListener('click', () => {
        const s = btn.getAttribute('data-stat');
        if ((state.asiAlloc[s] || 0) > 0) {
          state.asiAlloc[s] -= 1;
          renderModal();
        }
      });
    });

    // Feat picker
    modal.querySelector('#lvl-feat-select')?.addEventListener('change', (e) => {
      state.selectedFeat = e.target.value;
      const featObj = DND_LEVEL_UP_DATA.feats.find(f => f.name === state.selectedFeat);
      state.halfFeatStat = (featObj && featObj.halfStat && featObj.halfStat.length === 1) ? featObj.halfStat[0] : '';
      renderModal();
    });
    modal.querySelector('#lvl-feat-custom')?.addEventListener('input', (e) => {
      state.customFeat = e.target.value;
    });
    modal.querySelector('#lvl-half-feat-stat')?.addEventListener('change', (e) => {
      state.halfFeatStat = e.target.value;
      renderModal();
    });

    // Spell level tabs & chips
    modal.querySelectorAll('button[data-spell-lvl]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.spellFilterLevel = parseInt(btn.getAttribute('data-spell-lvl'), 10);
        renderModal();
      });
    });
    modal.querySelectorAll('.lvl-spell-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const sp = btn.getAttribute('data-spell');
        if (state.selectedSpells.includes(sp)) {
          state.selectedSpells = state.selectedSpells.filter(x => x !== sp);
        } else {
          state.selectedSpells.push(sp);
        }
        renderModal();
      });
    });
    modal.querySelector('#lvl-custom-spell-input')?.addEventListener('input', (e) => {
      state.customSpell = e.target.value;
    });
    modal.querySelector('#btn-add-custom-spell')?.addEventListener('click', () => {
      const sp = (state.customSpell || '').trim();
      if (sp && !state.selectedSpells.includes(sp)) {
        state.selectedSpells.push(sp);
        state.customSpell = '';
        renderModal();
      }
    });

    // Mastery
    modal.querySelector('#lvl-mastery-select')?.addEventListener('change', (e) => {
      state.selectedMastery = e.target.value;
    });

    // Confirm Level Up
    modal.querySelector('#confirm-level-up-btn')?.addEventListener('click', () => {
      const chosenSubclass = (state.customSubclass || state.subclass || '').trim();
      const chosenFeat = (state.grantAsiOrFeat && state.asiMode === 'feat')
        ? (state.customFeat || state.selectedFeat || '').trim()
        : '';

      const payload = {
        hpMethod: state.hpMethod,
        hpRoll: state.hpRoll,
        subclass: chosenSubclass || null,
        statIncreases: getPendingStatIncreases(),
        feat: chosenFeat || null,
        features: unlockedFeatures,
        spells: state.selectedSpells,
        spellSlots: isCaster ? newSpellSlots : null,
        weaponMasteries: state.selectedMastery ? [state.selectedMastery] : []
      };

      const res = worldState.levelUpCharacter(char.id, payload);
      if (!res.success) {
        alert(res.error || 'Could not complete level up.');
        return;
      }

      try { soundEngine.playDiceRoll(true); } catch (_) {}
      closeModal();
      if (typeof onComplete === 'function') onComplete(res);
    });
  }

  renderModal();
  modal.classList.add('active');
}

  // COMPONENT: inventoryManager.js
/**
 * Structured Inventory, Equipment, Auto-AC & Consumable Potions Manager (D&D 5.5e)
 * Persists directly to Supabase via worldState.data.partyCharacters[i].inventoryItems & currency.
 */
const INVENTORY_CATALOG = [
  // Weapons
  { name: 'Longsword', category: 'weapon', damage: '1d8', damageType: 'slashing', ability: 'str', mastery: 'Sap', weight: 3, notes: 'Versatile (1d10)' },
  { name: 'Greataxe', category: 'weapon', damage: '1d12', damageType: 'slashing', ability: 'str', mastery: 'Cleave', weight: 7, notes: 'Heavy, Two-Handed' },
  { name: 'Greatsword', category: 'weapon', damage: '2d6', damageType: 'slashing', ability: 'str', mastery: 'Graze', weight: 6, notes: 'Heavy, Two-Handed' },
  { name: 'Warhammer', category: 'weapon', damage: '1d8', damageType: 'bludgeoning', ability: 'str', mastery: 'Push', weight: 2, notes: 'Versatile (1d10)' },
  { name: 'Rapier', category: 'weapon', damage: '1d8', damageType: 'piercing', ability: 'dex', mastery: 'Vex', weight: 2, notes: 'Finesse' },
  { name: 'Longbow', category: 'weapon', damage: '1d8', damageType: 'piercing', ability: 'dex', mastery: 'Slow', weight: 2, notes: 'Range 150/600, Heavy' },
  { name: 'Dagger', category: 'weapon', damage: '1d4', damageType: 'piercing', ability: 'dex', mastery: 'Nick', weight: 1, notes: 'Finesse, Light, Thrown' },
  { name: 'Quarterstaff', category: 'weapon', damage: '1d6', damageType: 'bludgeoning', ability: 'str', mastery: 'Topple', weight: 4, notes: 'Versatile (1d8)' },
  // Armor
  { name: 'Leather Armor', category: 'armor', armorType: 'light', baseAc: 11, maxDex: 99, weight: 10, notes: 'Light Armor (11 + DEX)' },
  { name: 'Studded Leather', category: 'armor', armorType: 'light', baseAc: 12, maxDex: 99, weight: 13, notes: 'Light Armor (12 + DEX)' },
  { name: 'Chain Shirt', category: 'armor', armorType: 'medium', baseAc: 13, maxDex: 2, weight: 20, notes: 'Medium Armor (13 + DEX max 2)' },
  { name: 'Breastplate', category: 'armor', armorType: 'medium', baseAc: 14, maxDex: 2, weight: 20, notes: 'Medium Armor (14 + DEX max 2)' },
  { name: 'Half Plate', category: 'armor', armorType: 'medium', baseAc: 15, maxDex: 2, weight: 40, notes: 'Medium Armor (15 + DEX max 2, Stealth Disadv)' },
  { name: 'Chain Mail', category: 'armor', armorType: 'heavy', baseAc: 16, maxDex: 0, weight: 55, notes: 'Heavy Armor (AC 16, STR 13)' },
  { name: 'Splint Armor', category: 'armor', armorType: 'heavy', baseAc: 17, maxDex: 0, weight: 60, notes: 'Heavy Armor (AC 17, STR 15)' },
  { name: 'Plate Armor', category: 'armor', armorType: 'heavy', baseAc: 18, maxDex: 0, weight: 65, notes: 'Heavy Armor (AC 18, STR 15)' },
  // Shields
  { name: 'Shield', category: 'shield', acBonus: 2, weight: 6, notes: '+2 AC while equipped' },
  { name: 'Shield +1', category: 'shield', acBonus: 3, weight: 6, notes: 'Uncommon Magic Shield (+3 AC)' },
  // Magic Items / Wondrous
  { name: 'Cloak of Protection', category: 'magic', acBonus: 1, requiresAttunement: true, weight: 1, notes: '+1 AC & +1 all Saving Throws (Attunement)' },
  { name: 'Ring of Protection', category: 'magic', acBonus: 1, requiresAttunement: true, weight: 0, notes: '+1 AC & +1 all Saving Throws (Attunement)' },
  { name: 'Bag of Holding', category: 'magic', acBonus: 0, requiresAttunement: false, weight: 15, notes: 'Holds up to 500 lbs in extradimensional space' },
  // Potions & Consumables
  { name: 'Potion of Healing', category: 'potion', healDice: '2d4+2', quantity: 2, weight: 0.5, notes: 'Bonus Action: Regain 2d4+2 HP' },
  { name: 'Potion of Greater Healing', category: 'potion', healDice: '4d4+4', quantity: 1, weight: 0.5, notes: 'Bonus Action: Regain 4d4+4 HP' },
  { name: 'Potion of Superior Healing', category: 'potion', healDice: '8d4+8', quantity: 1, weight: 0.5, notes: 'Bonus Action: Regain 8d4+8 HP' }
];
function calculateHeroAcFromEquipment(char) {
  const getMod = (v) => Math.floor(((parseInt(v, 10) || 10) - 10) / 2);
  const dexMod = getMod(char.stats?.dex);
  const conMod = getMod(char.stats?.con);
  const wisMod = getMod(char.stats?.wis);
  const items = Array.isArray(char.inventoryItems) ? char.inventoryItems : [];
  const equipped = items.filter(i => i.equipped);

  const armor = equipped.find(i => i.category === 'armor');
  const shield = equipped.find(i => i.category === 'shield');
  const magicBonus = equipped
    .filter(i => i.category === 'magic' && Number(i.acBonus) > 0)
    .reduce((sum, i) => sum + Number(i.acBonus), 0);

  let baseAc = 10 + dexMod;
  const clsLower = String(char.classRole || '').toLowerCase();

  if (armor) {
    const cap = armor.maxDex !== undefined ? Number(armor.maxDex) : 99;
    baseAc = (Number(armor.baseAc) || 11) + Math.min(dexMod, cap);
  } else if (clsLower.includes('barbarian')) {
    baseAc = 10 + dexMod + conMod;
  } else if (clsLower.includes('monk') && !shield) {
    baseAc = 10 + dexMod + wisMod;
  }

  const shieldBonus = shield ? (Number(shield.acBonus) || 2) : 0;
  return baseAc + shieldBonus + magicBonus;
}
function renderInventoryManager(container, hero, onUpdated) {
  if (!container || !hero) return;
  const items = Array.isArray(hero.inventoryItems) ? hero.inventoryItems : [];
  const currency = hero.currency || { gp: 50, sp: 0, cp: 0 };
  const attunedCount = items.filter(i => i.equipped && i.requiresAttunement).length;
  const canEdit = worldState.canControlCharacter(hero.id);

  container.innerHTML = `
    <div style="margin-top: 1rem; background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0.85rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.65rem;">
        <div>
          <strong style="color: var(--text-gold); font-size: 0.9rem;">🎒 Equipment, Inventory &amp; Attunement</strong>
          <span style="font-size: 0.72rem; color: var(--text-muted); margin-left: 0.5rem;">Attuned: <strong>${attunedCount}/3</strong></span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.45rem; font-size: 0.78rem;">
          <span style="background: rgba(212,175,55,0.16); color: var(--text-gold); padding: 2px 7px; border-radius: 4px; border: 1px solid rgba(212,175,55,0.35);">
            <strong>${currency.gp || 0}</strong> GP
          </span>
          <span style="background: rgba(148,163,184,0.15); color: #cbd5e1; padding: 2px 6px; border-radius: 4px;">
            <strong>${currency.sp || 0}</strong> SP
          </span>
          <span style="background: rgba(180,83,9,0.2); color: #fdba74; padding: 2px 6px; border-radius: 4px;">
            <strong>${currency.cp || 0}</strong> CP
          </span>
          ${canEdit ? `
            <button type="button" class="btn-tiny inv-gold-adj" data-delta="10" title="Add 10 GP">+10g</button>
            <button type="button" class="btn-tiny inv-gold-adj" data-delta="-10" title="Spend 10 GP">-10g</button>
          ` : ''}
        </div>
      </div>

      ${items.length === 0 ? `
        <div style="font-size: 0.8rem; color: var(--text-muted); font-style: italic; padding: 0.5rem 0;">
          No structured gear yet. Add weapons, armor, shields, or potions from the 5.5e Armory below to auto-calculate AC and combat attacks.
        </div>
      ` : `
        <div style="display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 0.75rem;">
          ${items.map(item => `
            <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; background: var(--bg-card); border: 1px solid ${item.equipped ? 'rgba(212,175,55,0.55)' : 'var(--border-subtle)'}; border-radius: var(--radius-sm); padding: 0.4rem 0.6rem; font-size: 0.8rem;">
              <div style="min-width: 0;">
                <div style="display: flex; align-items: center; gap: 0.35rem; flex-wrap: wrap;">
                  <strong style="color: ${item.equipped ? 'var(--text-gold)' : 'var(--text-primary)'};">${item.name}</strong>
                  ${item.quantity && item.quantity > 1 ? `<span style="font-size:0.7rem; color:#94a3b8;">x${item.quantity}</span>` : ''}
                  ${item.equipped ? `<span style="font-size:0.65rem; background:rgba(76,175,80,0.2); color:#81c784; padding:1px 5px; border-radius:3px;">Equipped</span>` : ''}
                  ${item.damage ? `<span style="font-size:0.68rem; color:#fca5a5;">${item.damage} ${item.damageType || ''}</span>` : ''}
                  ${item.mastery ? `<span style="font-size:0.65rem; color:#fcd34d;">[${item.mastery}]</span>` : ''}
                  ${item.baseAc ? `<span style="font-size:0.68rem; color:#7dd3fc;">AC ${item.baseAc}${item.maxDex > 0 ? '+DEX' : ''}</span>` : ''}
                  ${item.acBonus ? `<span style="font-size:0.68rem; color:#7dd3fc;">+${item.acBonus} AC</span>` : ''}
                  ${item.healDice ? `<span style="font-size:0.68rem; color:#86efac;">Heals ${item.healDice}</span>` : ''}
                </div>
                ${item.notes ? `<div style="font-size: 0.7rem; color: var(--text-muted);">${item.notes}</div>` : ''}
              </div>
              ${canEdit ? `
                <div style="display: flex; gap: 0.25rem; flex-shrink: 0;">
                  ${item.category === 'potion' ? `
                    <button type="button" class="btn-tiny inv-drink-btn" data-id="${item.id}" style="background: rgba(34,197,94,0.2); color: #86efac; border-color: rgba(34,197,94,0.4);">🧪 Drink</button>
                  ` : `
                    <button type="button" class="btn-tiny inv-equip-btn" data-id="${item.id}">${item.equipped ? 'Unequip' : 'Equip'}</button>
                  `}
                  <button type="button" class="btn-tiny inv-remove-btn" data-id="${item.id}" style="color: #fca5a5;" title="Remove item">&times;</button>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      `}

      ${canEdit ? `
        <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; border-top: 1px solid var(--border-subtle); padding-top: 0.6rem;">
          <select id="inv-catalog-select" class="theme-select" style="flex: 1; min-width: 180px; font-size: 0.76rem; padding: 0.3rem 0.5rem;">
            <option value="">-- Quick-Add from 5.5e Armory --</option>
            ${INVENTORY_CATALOG.map((it, idx) => `<option value="${idx}">[${it.category.toUpperCase()}] ${it.name} — ${it.notes}</option>`).join('')}
          </select>
          <button type="button" class="btn btn-sm btn-primary" id="inv-add-catalog-btn" style="font-size: 0.75rem;">+ Add Gear</button>
        </div>
      ` : ''}
    </div>
  `;

  if (!canEdit) return;

  container.querySelectorAll('.inv-gold-adj').forEach(btn => {
    btn.addEventListener('click', () => {
      const delta = parseInt(btn.getAttribute('data-delta'), 10) || 0;
      worldState.updateCharacterCurrency(hero.id, { gp: delta });
      if (onUpdated) onUpdated();
    });
  });

  container.querySelector('#inv-add-catalog-btn')?.addEventListener('click', () => {
    const sel = container.querySelector('#inv-catalog-select');
    const idx = sel ? parseInt(sel.value, 10) : NaN;
    if (isNaN(idx) || !INVENTORY_CATALOG[idx]) return;
    worldState.addInventoryItem(hero.id, INVENTORY_CATALOG[idx]);
    if (onUpdated) onUpdated();
  });

  container.querySelectorAll('.inv-equip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      worldState.toggleEquipItem(hero.id, btn.getAttribute('data-id'));
      if (onUpdated) onUpdated();
    });
  });

  container.querySelectorAll('.inv-drink-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const res = worldState.consumeInventoryItem(hero.id, btn.getAttribute('data-id'));
      if (res && res.success) {
        try { soundEngine.playDiceRoll(true); } catch (_) {}
      }
      if (onUpdated) onUpdated();
    });
  });

  container.querySelectorAll('.inv-remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      worldState.removeInventoryItem(hero.id, btn.getAttribute('data-id'));
      if (onUpdated) onUpdated();
    });
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
        <button class="btn" id="export-campaign-snapshot-btn" style="border-color: #38bdf8; color: #7dd3fc;" title="Export Full v2.0 Campaign Cloud Snapshot">💾 Backup Campaign</button>
        <button class="btn" id="import-campaign-snapshot-btn" style="border-color: #c084fc; color: #d8b4fe;" title="Restore Full v2.0 Campaign Snapshot">📂 Restore Snapshot</button>
      </div>
        <button class="btn btn-sm" id="btn-long-rest" style="background: rgba(76, 175, 80, 0.2); border-color: #4caf50; color: #a5d6a7;" title="Full HP & Resource Reset">
          Long Rest (Reset All)
        </button>
      </div>
    </div>

    <!-- v2.0 Campaign Overview KPI Strip -->
    ${(() => {
      const kpi = typeof worldState.getCampaignKpiSummary === 'function' ? worldState.getCampaignKpiSummary() : { heroCount: characters.length, avgLevel, activeQuests: 0, alliedFactions: 0, merchantDiscountPct: 0 };
      return `
        <div id="v20-campaign-kpi-strip" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.6rem; margin-bottom: 1rem;">
          <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.55rem 0.75rem; text-align: center;">
            <div style="font-size: 1.15rem; font-weight: bold; color: var(--text-gold);">${kpi.heroCount}</div>
            <div style="font-size: 0.7rem; color: var(--text-muted);">ACTIVE HEROES (AVG LV ${kpi.avgLevel})</div>
          </div>
          <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.55rem 0.75rem; text-align: center;">
            <div style="font-size: 1.15rem; font-weight: bold; color: #7dd3fc;">${kpi.activeQuests}</div>
            <div style="font-size: 0.7rem; color: var(--text-muted);">ACTIVE PARTY QUESTS</div>
          </div>
          <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.55rem 0.75rem; text-align: center;">
            <div style="font-size: 1.15rem; font-weight: bold; color: #6ee7b7;">${kpi.alliedFactions} (${kpi.merchantDiscountPct}% OFF)</div>
            <div style="font-size: 0.7rem; color: var(--text-muted);">ALLIED FACTIONS &amp; SHOP</div>
          </div>
          <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.55rem 0.75rem; text-align: center;">
            <div style="font-size: 1.15rem; font-weight: bold; color: #d8b4fe;">${partyHpPercent}%</div>
            <div style="font-size: 0.7rem; color: var(--text-muted);">PARTY VITALITY</div>
          </div>
        </div>
      `;
    })()}

    <!-- Shared Bag of Holding / Party Stash Accordion -->
    <details style="margin-bottom: 1rem; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0.75rem 1rem;">
      <summary style="cursor: pointer; font-weight: bold; color: var(--text-gold); font-size: 0.9rem;">
        Shared Bag of Holding & Communal Equipment (Click to expand)
      </summary>
      <div style="margin-top: 0.6rem; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">
        ${settings.sharedBag || 'Empty bag of holding.'}
      </div>
    </details>

    <!-- DM Loot Chest & Session Recap Bar (Supabase Synced) -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
      <div style="background: var(--bg-card); border: 1px solid rgba(212,175,55,0.35); border-radius: var(--radius-md); padding: 0.85rem 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <strong style="color: var(--text-gold); font-size: 0.9rem;">💰 Party Loot Chests (Supabase)</strong>
          ${prefs.dmMode ? `<button class="btn btn-sm btn-primary" id="party-drop-loot-btn" style="font-size: 0.72rem; padding: 2px 8px;">+ Drop Treasure</button>` : ''}
        </div>
        <div id="party-loot-chests-list" style="display: flex; flex-direction: column; gap: 0.45rem; font-size: 0.8rem;"></div>
      </div>

      <div style="background: var(--bg-card); border: 1px solid rgba(56,189,248,0.35); border-radius: var(--radius-md); padding: 0.85rem 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <strong style="color: #7dd3fc; font-size: 0.9rem;">📜 Session Recaps &amp; Auto-Chronicle</strong>
          <div style="display: flex; gap: 0.3rem;">
            ${prefs.dmMode ? `<button class="btn btn-sm" id="party-send-handout-btn" style="font-size: 0.72rem; padding: 2px 8px; border-color: #c084fc; color: #d8b4fe;">📬 Send Clue</button>` : ''}
            <button class="btn btn-sm" id="party-gen-recap-btn" style="font-size: 0.72rem; padding: 2px 8px; border-color: #38bdf8; color: #7dd3fc;">📜 Generate Recap</button>
          </div>
        </div>
        <div id="party-recaps-list" style="display: flex; flex-direction: column; gap: 0.45rem; font-size: 0.8rem; max-height: 180px; overflow-y: auto;"></div>
      </div>
    </div>

    <!-- Interactive Merchant Shop & Town Market (Supabase Synced) -->
    <div style="background: var(--bg-card); border: 1px solid rgba(16,185,129,0.35); border-radius: var(--radius-md); padding: 0.9rem 1rem; margin-bottom: 1.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.65rem;">
        <div>
          <strong style="color: #6ee7b7; font-size: 0.95rem;">🏪 Town Market &amp; Merchant Shop (Supabase)</strong>
          <span style="font-size: 0.75rem; color: var(--text-muted); margin-left: 0.5rem;">Buy gear into your pack or sell items for 50% GP value</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <label for="shop-buyer-select" style="font-size: 0.75rem; color: var(--text-muted);">Buyer / Seller:</label>
          <select id="shop-buyer-select" class="editor-input" style="font-size: 0.78rem; padding: 2px 6px; width: auto;"></select>
          <span id="shop-buyer-gold" style="font-size: 0.8rem; font-weight: bold; color: var(--text-gold);"></span>
        </div>
      </div>
      <div id="party-merchant-shop-list" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 0.55rem; font-size: 0.78rem;"></div>
    </div>

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
                <button class="btn btn-sm level-up-party-btn" data-id="${char.id}" style="background: rgba(212, 175, 55, 0.2); border-color: var(--accent-gold); color: var(--text-gold); font-weight: 700;" title="Level Up ${char.name}">
                  ⬆ Lvl Up
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

    gridContainer.querySelectorAll('.level-up-party-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openLevelUpModal(id, () => renderPartyCards());
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

  // Render Loot Chests & Session Recaps
  function renderLootAndRecaps() {
    const lootList = container.querySelector('#party-loot-chests-list');
    const recapList = container.querySelector('#party-recaps-list');
    const activeHero = worldState.getActiveHero();

    if (lootList) {
      const chests = worldState.getLootChests();
      if (chests.length === 0) {
        lootList.innerHTML = `<div style="color: var(--text-muted); font-style: italic;">No active treasure chests. DM can drop gold &amp; items here.</div>`;
      } else {
        lootList.innerHTML = chests.slice(0, 3).map(ch => `
          <div style="background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
              <strong style="color: var(--text-gold);">${ch.title}</strong>
              ${ch.gold > 0 ? `<button class="btn-tiny split-gold-btn" data-id="${ch.id}" style="color:#fde047;">Split ${ch.gold} GP</button>` : `<span style="font-size:0.7rem;color:#86efac;">Gold Split</span>`}
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.3rem;">
              ${(ch.items || []).map((it, idx) => it.claimedBy
                ? `<span style="font-size:0.7rem; color:var(--text-muted); text-decoration:line-through;">${it.name} (${it.claimedBy})</span>`
                : `<button class="btn-tiny claim-loot-item-btn" data-chest="${ch.id}" data-idx="${idx}" title="Claim into ${activeHero ? activeHero.name : 'Active Hero'}'s inventory">Claim ${it.name}</button>`
              ).join('')}
            </div>
          </div>
        `).join('');

        lootList.querySelectorAll('.split-gold-btn').forEach(btn => {
          btn.addEventListener('click', async () => {
            await worldState.splitLootGold(btn.getAttribute('data-id'));
            renderLootAndRecaps();
          });
        });
        lootList.querySelectorAll('.claim-loot-item-btn').forEach(btn => {
          btn.addEventListener('click', async () => {
            if (!activeHero) return;
            await worldState.claimLootItem(btn.getAttribute('data-chest'), parseInt(btn.getAttribute('data-idx'), 10), activeHero.id);
            renderLootAndRecaps();
          });
        });
      }
    }

    if (recapList) {
      const recaps = worldState.getSessionRecaps();
      if (recaps.length === 0) {
        recapList.innerHTML = `<div style="color: var(--text-muted); font-style: italic;">Click "Generate Recap" after a session to auto-compile combat highlights, level-ups &amp; journals into Supabase.</div>`;
      } else {
        recapList.innerHTML = recaps.slice(0, 3).map(rc => `
          <div style="background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.5rem;">
            <strong style="color: #7dd3fc;">${rc.title}</strong>
            <div style="font-size: 0.74rem; color: var(--text-secondary); margin: 0.2rem 0;">${rc.summary}</div>
            <ul style="margin: 0; padding-left: 1.1rem; font-size: 0.72rem; color: var(--text-muted);">
              ${(rc.highlights || []).slice(0, 3).map(h => `<li>${h}</li>`).join('')}
            </ul>
          </div>
        `).join('');
      }
    }
  }
  renderLootAndRecaps();

  // Interactive Merchant Shop & Town Market (Supabase Synced)
  const buyerSelect = container.querySelector('#shop-buyer-select');
  const buyerGoldEl = container.querySelector('#shop-buyer-gold');
  const shopListEl = container.querySelector('#party-merchant-shop-list');

  function populateBuyerSelect() {
    if (!buyerSelect) return;
    const prev = buyerSelect.value;
    const chars = worldState.data.partyCharacters || [];
    const activeHero = worldState.getActiveHero ? worldState.getActiveHero() : chars[0];
    buyerSelect.innerHTML = chars.length
      ? chars.map(c => `<option value="${c.id}">${c.name}</option>`).join('')
      : `<option value="">No Hero Available</option>`;
    if (prev && chars.some(c => c.id === prev)) {
      buyerSelect.value = prev;
    } else if (activeHero) {
      buyerSelect.value = activeHero.id;
    }
  }

  function renderMerchantShop() {
    if (!shopListEl || typeof worldState.getShopInventory !== 'function') return;
    populateBuyerSelect();
    const chars = worldState.data.partyCharacters || [];
    const selectedHero = chars.find(c => c.id === buyerSelect?.value) || chars[0];
    const heroGp = selectedHero?.currency?.gp ?? 0;
    if (buyerGoldEl) {
      buyerGoldEl.textContent = selectedHero ? `💰 ${heroGp} GP` : '';
    }

    const items = worldState.getShopInventory();
    shopListEl.innerHTML = items.map((item, idx) => {
      const outOfStock = (item.stock ?? 0) <= 0;
      const canAfford = selectedHero && heroGp >= (item.priceGp || 0);
      return `
        <div style="background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.55rem 0.65rem; display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.3rem;">
              <strong style="color: var(--text-primary);">${item.name}</strong>
              <span style="color: var(--text-gold); font-weight: bold;">${item.priceGp} GP</span>
            </div>
            <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 2px;">
              ${item.category || 'gear'} • Stock: <strong>${item.stock ?? 0}</strong>${item.notes ? ` • ${item.notes}` : ''}
            </div>
          </div>
          <button type="button" class="btn btn-sm shop-buy-btn" data-idx="${idx}" ${outOfStock || !canAfford ? 'disabled' : ''} style="font-size: 0.72rem; padding: 3px 8px; border-color: #10b981; color: #6ee7b7; ${outOfStock || !canAfford ? 'opacity: 0.45; cursor: not-allowed;' : ''}">
            ${outOfStock ? 'Sold Out' : `Buy (${item.priceGp} GP)`}
          </button>
        </div>
      `;
    }).join('');

    shopListEl.querySelectorAll('.shop-buy-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!selectedHero) return;
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        const res = await worldState.buyShopItem(selectedHero.id, idx);
        if (!res.success && res.error) alert(res.error);
        soundEngine.playDiceRoll(true);
        renderMerchantShop();
      });
    });
  }

  buyerSelect?.addEventListener('change', renderMerchantShop);
  renderMerchantShop();

  container.querySelector('#party-drop-loot-btn')?.addEventListener('click', async () => {
    const title = prompt('Treasure Chest Name:', 'Goblin Vault Hoard');
    if (!title) return;
    const gold = parseInt(prompt('Gold Pieces (GP) in chest:', '150') || '150', 10);
    const catalog = (typeof INVENTORY_CATALOG !== 'undefined') ? INVENTORY_CATALOG : [];
    const sampleItems = [
      catalog.find(i => i.name === 'Potion of Healing') || { name: 'Potion of Healing', category: 'potion', healDice: '2d4+2', quantity: 1 },
      catalog.find(i => i.name === 'Cloak of Protection') || { name: 'Cloak of Protection', category: 'magic', acBonus: 1, requiresAttunement: true }
    ];
    await worldState.createLootChest({ title, gold, items: sampleItems });
    renderLootAndRecaps();
  });

  container.querySelector('#party-gen-recap-btn')?.addEventListener('click', async () => {
    await worldState.generateSessionRecap();
    renderLootAndRecaps();
  });

  container.querySelector('#party-send-handout-btn')?.addEventListener('click', async () => {
    const title = prompt('Handout / Secret Clue Title:', 'Torn Obsidian Letter');
    if (!title) return;
    const content = prompt('Clue Content:', 'Meet beneath the Foregrove roots at midnight. Bring the rune key.');
    if (!content) return;
    await worldState.sendHandout({ title, content, targetCharId: 'ALL', targetLabel: 'All Players' });
    alert(`Handout "${title}" sent to the party via Supabase!`);
  });

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

  // v2.0 Full Campaign Snapshot Backup & Restore (Supabase Synced)
  container.querySelector('#export-campaign-snapshot-btn')?.addEventListener('click', () => {
    const snap = worldState.exportCampaignSnapshot();
    const blob = new Blob([snap], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aetheria_v20_campaign_snapshot_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  container.querySelector('#import-campaign-snapshot-btn')?.addEventListener('click', () => {
    const raw = prompt('Paste a v2.0 Campaign Snapshot JSON to restore:');
    if (!raw) return;
    const res = worldState.importCampaignSnapshot(raw);
    if (res.success) {
      alert(`Campaign snapshot restored (${res.heroCount} heroes) and synced to Supabase!`);
      renderPartyView(container);
    } else {
      alert('Restore failed: ' + res.error);
    }
  });
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
        <div style="position: relative; display: inline-flex;">
          <div class="hero-avatar-large" style="overflow: hidden; padding: 0;">
            ${activeHero.portraitUrl ? `<img src="${activeHero.portraitUrl}" alt="${activeHero.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: inherit;">` : (activeHero.avatar || 'PC')}
          </div>
          ${worldState.canControlCharacter(activeHero.id) ? `
            <label for="hero-portrait-file-input" title="Upload Character Portrait (Supabase Storage)" style="position: absolute; bottom: -4px; right: -4px; width: 24px; height: 24px; border-radius: 50%; background: var(--bg-secondary); border: 1px solid var(--accent-gold); color: var(--text-gold); display: flex; align-items: center; justify-content: center; font-size: 0.72rem; cursor: pointer; box-shadow: var(--shadow-sm);">
              📷
            </label>
            <input type="file" id="hero-portrait-file-input" accept="image/*" style="display: none;">
          ` : ''}
        </div>
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
            <h2 style="margin: 0; font-size: 1.6rem; color: var(--text-gold);">${activeHero.name}</h2>
            <span class="meta-badge">${activeHero.alignment || 'Neutral'}</span>
            <button type="button" id="btn-hero-inspiration-pill" title="Toggle D&D 5.5e Heroic Inspiration" style="cursor:pointer; font-size: 0.74rem; padding: 2px 8px; border-radius: 12px; border: 1px solid ${activeHero.inspiration ? '#fde047' : 'var(--border-subtle)'}; background: ${activeHero.inspiration ? 'rgba(250, 204, 21, 0.22)' : 'var(--bg-tertiary)'}; color: ${activeHero.inspiration ? '#fde047' : 'var(--text-muted)'}; font-weight: bold;">
              ⭐ ${activeHero.inspiration ? 'Heroic Inspiration READY' : 'No Inspiration'}
            </button>
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
        <button class="btn btn-sm" id="btn-hero-level-up" style="background: rgba(212, 175, 55, 0.22); border-color: var(--accent-gold); color: var(--text-gold); font-weight: 700;" title="Level Up Character (Roll HP, Features, Feats & Spells)">⬆ Level Up</button>
        <button class="btn btn-sm" id="btn-hero-print-sheet" title="Open Printable / PDF D&D 5.5e Character Sheet">🖨️ Print Sheet</button>
        <button class="btn btn-sm" id="btn-hero-export-json" title="Download Hero Backup JSON">💾 JSON</button>
        <button class="btn btn-sm" id="btn-hero-short-rest" title="Take Short Rest">Short Rest</button>
        <button class="btn btn-sm btn-primary" id="btn-hero-long-rest" title="Take Long Rest">Long Rest</button>
        <button class="btn btn-sm" id="btn-hero-view-map" title="View Current Location on World Map">Map</button>
      </div>
    </div>

    <!-- Live Dice Check Result Banner -->
    <div id="hero-dice-result-banner" style="display: none; margin-bottom: 1rem;" class="bastion-turn-log"></div>

    <!-- v2.0 Concentration Save Auto-Tracker Banner -->
    ${activeHero.pendingConcentrationSave ? `
      <div id="hero-concentration-banner" style="margin-bottom: 1rem; background: rgba(245, 158, 11, 0.16); border: 1px solid rgba(251, 191, 36, 0.6); border-radius: var(--radius-md); padding: 0.75rem 1rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.6rem;">
        <div>
          <strong style="color: #fde047; font-size: 0.92rem;">🔮 CONCENTRATION CHECK REQUIRED — ${activeHero.pendingConcentrationSave.spell}</strong>
          <div style="font-size: 0.78rem; color: var(--text-secondary);">Took ${activeHero.pendingConcentrationSave.damage} damage → Constitution Saving Throw <strong>DC ${activeHero.pendingConcentrationSave.dc}</strong></div>
        </div>
        <div style="display: flex; gap: 0.4rem;">
          <button type="button" class="btn btn-sm btn-primary" id="btn-hero-roll-conc-save">🎲 Roll CON Save (DC ${activeHero.pendingConcentrationSave.dc})</button>
          ${activeHero.inspiration ? `<button type="button" class="btn btn-sm" id="btn-hero-roll-conc-adv" style="border-color: #fde047; color: #fde047;">⭐ Roll w/ Inspiration</button>` : ''}
        </div>
      </div>
    ` : ''}

    <!-- Interactive 5.5e Death Saving Throws Banner (Active when at 0 HP) -->
    ${(activeHero.hpCurrent || 0) <= 0 ? `
      <div id="hero-death-saves-banner" style="margin-bottom: 1rem; background: rgba(239, 68, 68, 0.14); border: 1px solid rgba(239, 68, 68, 0.55); border-radius: var(--radius-md); padding: 0.85rem 1rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
        <div>
          <strong style="color: #fca5a5; font-size: 0.95rem;">💀 ${activeHero.deathSaves?.stabilized ? 'STABILIZED AT 0 HP' : 'DEATH SAVING THROWS (0 HP — DYING)'}</strong>
          <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem;">
            Successes: <strong style="color: #86efac;">${'●'.repeat(activeHero.deathSaves?.successes || 0)}${'○'.repeat(3 - (activeHero.deathSaves?.successes || 0))}</strong>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            Failures: <strong style="color: #f87171;">${'●'.repeat(activeHero.deathSaves?.failures || 0)}${'○'.repeat(3 - (activeHero.deathSaves?.failures || 0))}</strong>
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button type="button" class="btn btn-sm btn-primary" id="btn-hero-death-save" style="background: linear-gradient(135deg, #b91c1c, #ef4444); border-color: #f87171;">🎲 Roll Death Save</button>
          <button type="button" class="btn btn-sm" id="btn-hero-stabilize" style="border-color: #86efac; color: #86efac;">🩹 Stabilize</button>
        </div>
      </div>
    ` : ''}

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

          <!-- Feats & Class Features -->
          ${((activeHero.feats && activeHero.feats.length > 0) || (activeHero.features && activeHero.features.length > 0)) ? `
            <div style="margin-top: 0.85rem;">
              <div style="font-size: 0.75rem; font-weight: bold; color: var(--text-gold); margin-bottom: 0.25rem;">
                FEATS &amp; CLASS FEATURES
              </div>
              <div style="display: flex; flex-wrap: wrap; gap: 0.3rem;">
                ${(activeHero.feats || []).map(f => `<span style="background: rgba(56, 189, 248, 0.16); border: 1px solid rgba(56, 189, 248, 0.4); color: #7dd3fc; padding: 2px 7px; border-radius: 4px; font-size: 0.72rem; font-weight: 600;">★ ${f}</span>`).join('')}
                ${(activeHero.features || []).map(f => `<span style="background: rgba(212, 175, 55, 0.12); border: 1px solid rgba(212, 175, 55, 0.3); color: var(--text-secondary); padding: 2px 7px; border-radius: 4px; font-size: 0.72rem;">✦ ${f}</span>`).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Interactive Spell Slot Tracker & One-Click Spellcasting (Supabase) -->
          ${(() => {
            const spInfo = typeof worldState.getSpellSlots === 'function' ? worldState.getSpellSlots(activeHero) : { max: {}, remaining: {} };
            const slotLevels = Object.keys(spInfo.max || {});
            return `
              <div style="margin-top: 0.85rem; background: rgba(99, 102, 241, 0.08); border: 1px solid rgba(129, 140, 248, 0.35); border-radius: var(--radius-md); padding: 0.65rem 0.75rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.45rem;">
                  <strong style="font-size: 0.78rem; color: #a5b4fc;">✨ SPELL SLOTS &amp; ONE-CLICK CASTING</strong>
                  ${activeHero.concentratingOn ? `<span id="hero-conc-badge" style="font-size: 0.7rem; background: rgba(245, 158, 11, 0.2); border: 1px solid #f59e0b; color: #fde047; padding: 1px 6px; border-radius: 10px;">🔮 Concentrating: <strong>${activeHero.concentratingOn}</strong></span>` : ''}
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.5rem;">
                  ${slotLevels.map(lvl => {
                    const max = spInfo.max[lvl] || 0;
                    const rem = spInfo.remaining[lvl] ?? max;
                    return `<button type="button" class="btn btn-sm hero-cast-slot-btn" data-lvl="${lvl}" title="Click to expend a Level ${lvl} slot" style="font-size: 0.7rem; padding: 2px 7px; border-color: #818cf8; color: ${rem > 0 ? '#c7d2fe' : '#64748b'};">L${lvl}: ${'●'.repeat(rem)}${'○'.repeat(Math.max(0, max - rem))} (${rem}/${max})</button>`;
                  }).join('')}
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 0.3rem; align-items: center;">
                  ${(activeHero.spells || []).map(sp => `<button type="button" class="hero-quick-spell-btn" data-spell="${sp}" title="Cast ${sp} (deducts lowest available slot & logs to Dice Log)" style="cursor:pointer; background: rgba(129, 140, 248, 0.18); border: 1px solid rgba(129, 140, 248, 0.4); color: #e0e7ff; padding: 2px 7px; border-radius: 4px; font-size: 0.72rem;">✨ ${sp}</button>`).join('')}
                  <button type="button" class="btn btn-sm" id="hero-custom-cast-btn" style="font-size: 0.68rem; padding: 2px 7px; border-color: #6366f1; color: #a5b4fc;">+ Cast Spell</button>
                </div>
              </div>
            `;
          })()}

          <!-- Structured Equipment, Auto-AC & Potions Container -->
          <div id="hero-inventory-manager-mount"></div>

          <!-- Interactive 18 D&D 5.5e Skills Matrix (Proficiency & Expertise) -->
          <details style="margin-top: 1rem; background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0.75rem;" open>
            <summary style="cursor: pointer; font-weight: bold; color: var(--text-gold); font-size: 0.85rem;">
              🎯 5.5e Skills Matrix (18 Skills — Click dot for Prof/Exp, Click name to Roll)
            </summary>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(175px, 1fr)); gap: 0.3rem; margin-top: 0.6rem;">
              ${(worldState.getDnd55eSkills ? worldState.getDnd55eSkills() : []).map(sk => {
                const rank = (activeHero.skillProficiencies && activeHero.skillProficiencies[sk.name]) || 0;
                const bonus = worldState.getSkillBonus ? worldState.getSkillBonus(activeHero, sk.name) : 0;
                const fmtB = bonus >= 0 ? `+${bonus}` : `${bonus}`;
                const badge = rank === 2 ? '★' : (rank === 1 ? '●' : '○');
                const col = rank === 2 ? '#fde047' : (rank === 1 ? '#86efac' : '#64748b');
                return `
                  <div style="display: flex; align-items: center; justify-content: space-between; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 4px; padding: 3px 6px; font-size: 0.74rem;">
                    <div style="display: flex; align-items: center; gap: 5px;">
                      <button type="button" class="hero-skill-prof-btn" data-skill="${sk.name}" title="Cycle: None / Proficient / Expertise" style="background:none;border:none;cursor:pointer;color:${col};font-size:0.85rem;padding:0;">${badge}</button>
                      <button type="button" class="hero-skill-roll-btn" data-skill="${sk.name}" style="background:none;border:none;cursor:pointer;color:var(--text-primary);padding:0;text-align:left;">${sk.name}</button>
                    </div>
                    <strong style="color: ${bonus >= 0 ? '#86efac' : '#fca5a5'}; font-family: var(--font-mono);">${fmtB}</strong>
                  </div>
                `;
              }).join('')}
            </div>
          </details>

          <!-- DM Handouts & Secret Clues Drawer (Supabase) -->
          ${(worldState.getHandouts && worldState.getHandouts(activeHero.id).length > 0) ? `
            <div style="margin-top: 1rem; background: rgba(168, 85, 247, 0.1); border: 1px solid rgba(168, 85, 247, 0.4); border-radius: var(--radius-md); padding: 0.75rem;">
              <strong style="color: #d8b4fe; font-size: 0.85rem;">📬 DM Handouts &amp; Secret Clues</strong>
              <div style="display: flex; flex-direction: column; gap: 0.4rem; margin-top: 0.5rem;">
                ${worldState.getHandouts(activeHero.id).slice(0, 5).map(h => `
                  <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.45rem 0.6rem; font-size: 0.78rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <strong style="color: var(--text-gold);">${h.title}</strong>
                      <span style="font-size: 0.66rem; color: #c084fc;">${h.targetCharId === 'ALL' ? 'Party' : 'Private'}</span>
                    </div>
                    <div style="color: var(--text-secondary); margin-top: 0.2rem;">${h.content}</div>
                  </div>
                `).join('')}
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
  const levelUpBtn = container.querySelector('#btn-hero-level-up');
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

  // Mount Structured Inventory Manager
  const invMount = container.querySelector('#hero-inventory-manager-mount');
  if (invMount && typeof renderInventoryManager === 'function') {
    renderInventoryManager(invMount, activeHero, () => renderHeroView(container));
  }

  // Upload Custom Character Portrait (Supabase Storage)
  const portraitInput = container.querySelector('#hero-portrait-file-input');
  if (portraitInput) {
    portraitInput.addEventListener('change', async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
        const res = await supabaseDb.uploadPortraitImage(worldState.activeGameId || 'demo', activeHero.id, file);
        if (res && res.success && res.url) {
          worldState.setCharacterPortrait(activeHero.id, res.url);
          renderHeroView(container);
          return;
        }
      }
      const reader = new FileReader();
      reader.onload = () => {
        worldState.setCharacterPortrait(activeHero.id, reader.result);
        renderHeroView(container);
      };
      reader.readAsDataURL(file);
    });
  }

  // Level Up Wizard Trigger
  if (levelUpBtn) {
    levelUpBtn.addEventListener('click', () => {
      openLevelUpModal(activeHero.id, () => renderHeroView(container));
    });
  }

  // Printable Sheet & Hero JSON Export
  container.querySelector('#btn-hero-print-sheet')?.addEventListener('click', () => {
    const html = worldState.generatePrintableSheetHtml(activeHero.id);
    const w = window.open('', '_blank', 'width=880,height=720');
    if (w) { w.document.write(html); w.document.close(); }
  });
  container.querySelector('#btn-hero-export-json')?.addEventListener('click', () => {
    const json = worldState.exportCharacterJson(activeHero.id);
    if (!json) return;
    const blob = new Blob([json], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${(activeHero.name || 'hero').toLowerCase().replace(/[^a-z0-9]+/g, '_')}_5_5e.json`;
    a.click();
  });

  // Death Saving Throws & Stabilize Handlers
  container.querySelector('#btn-hero-death-save')?.addEventListener('click', () => {
    const res = worldState.rollDeathSave(activeHero.id);
    if (res && res.success) {
      try { soundEngine.playDiceRoll(res.d20 === 20); } catch (_) {}
      renderHeroView(container);
    }
  });
  container.querySelector('#btn-hero-stabilize')?.addEventListener('click', () => {
    worldState.stabilizeCharacter(activeHero.id);
    renderHeroView(container);
  });

  // 18 Skills Matrix Handlers
  container.querySelectorAll('.hero-skill-prof-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      worldState.toggleSkillProficiency(activeHero.id, btn.getAttribute('data-skill'));
      renderHeroView(container);
    });
  });
  container.querySelectorAll('.hero-skill-roll-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sk = btn.getAttribute('data-skill');
      const r = worldState.rollSkillCheck(activeHero.id, sk);
      if (r && diceResultBanner) {
        try { soundEngine.playDiceRoll(r.d20 === 20); } catch (_) {}
        diceResultBanner.style.display = 'block';
        diceResultBanner.innerHTML = `🎯 <strong>${activeHero.name}</strong> rolled <strong>${sk}</strong>: <code>1d20 (${r.d20}) ${r.bonus >= 0 ? '+' : '-'} ${Math.abs(r.bonus)}</code> = <strong style="color:var(--text-gold);font-size:1.1rem;">${r.total}</strong>`;
      }
    });
  });

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
      if (activeHero.spellSlots) {
        activeHero.spellSlotsRemaining = { ...activeHero.spellSlots };
      }
      activeHero.conditions = [];
      worldState.saveData();
      soundEngine.playDiceRoll(true);
      alert(`Long Rest completed! ${activeHero.name} fully restored HP, Spell Slots, cleared conditions, and refilled class resources.`);
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

  // Interactive Spell Slot & One-Click Spellcasting Handlers (v1.9)
  container.querySelectorAll('.hero-cast-slot-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lvl = parseInt(btn.getAttribute('data-lvl'), 10) || 1;
      const res = worldState.castSpell(activeHero.id, `Level ${lvl} Spell`, lvl, false);
      if (!res.success && res.error) alert(res.error);
      else if (soundEngine.playSfx) soundEngine.playSfx('spell');
      renderHeroView(container);
    });
  });

  container.querySelectorAll('.hero-quick-spell-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const spName = btn.getAttribute('data-spell');
      const spInfo = worldState.getSpellSlots(activeHero);
      const availLvl = Object.keys(spInfo.remaining || {}).find(k => (spInfo.remaining[k] || 0) > 0);
      const slotLvl = availLvl ? parseInt(availLvl, 10) : 0;
      const res = worldState.castSpell(activeHero.id, spName, slotLvl, false);
      if (!res.success && res.error) alert(res.error);
      else if (soundEngine.playSfx) soundEngine.playSfx('spell');
      renderHeroView(container);
    });
  });

  container.querySelector('#hero-custom-cast-btn')?.addEventListener('click', () => {
    const spName = prompt('Spell Name to Cast:', 'Fireball');
    if (!spName) return;
    const slotLvl = parseInt(prompt('Spell Slot Level (0 for Cantrip):', '1') || '1', 10);
    const isConc = confirm('Does this spell require Concentration?');
    const res = worldState.castSpell(activeHero.id, spName.trim(), slotLvl, isConc);
    if (!res.success && res.error) alert(res.error);
    else if (soundEngine.playSfx) soundEngine.playSfx('spell');
    renderHeroView(container);
  });

  // v2.0 Heroic Inspiration & Concentration Auto-Save Handlers
  container.querySelector('#btn-hero-inspiration-pill')?.addEventListener('click', () => {
    worldState.toggleCharacterInspiration(activeHero.id);
    renderHeroView(container);
  });
  container.querySelector('#btn-hero-roll-conc-save')?.addEventListener('click', () => {
    const res = worldState.rollConcentrationSave(activeHero.id, false);
    if (res.success) alert(`Concentration Save (${res.spell}): Rolled ${res.total} vs DC ${res.dc} → ${res.passed ? 'MAINTAINED!' : 'CONCENTRATION LOST!'}`);
    renderHeroView(container);
  });
  container.querySelector('#btn-hero-roll-conc-adv')?.addEventListener('click', () => {
    const res = worldState.rollConcentrationSave(activeHero.id, true);
    if (res.success) alert(`Concentration Save w/ Inspiration (${res.spell}): Rolled ${res.total} vs DC ${res.dc} → ${res.passed ? 'MAINTAINED!' : 'CONCENTRATION LOST!'}`);
    renderHeroView(container);
  });

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
    { name: 'Artificer', hitDie: 8, primary: 'INT & CON', masteries: [], armor: 'Shields, Light & Medium Armor' },
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
    selectedClass: CLASS_LIST[5], // Fighter
    selectedSubclass: '',
    customSubclass: '',
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
              <label for="create-char-class">Class (D&D 5.5e / Official)</label>
              <select id="create-char-class" class="form-control">
                ${CLASS_LIST.map(c => `<option value="${c.name}" ${c.name === state.selectedClass.name ? 'selected' : ''}>${c.name} (d${c.hitDie}) - ${c.primary}</option>`).join('')}
              </select>
              <small style="color: var(--text-muted); font-size: 0.75rem; display: block; margin-top: 0.25rem;">Armor: ${state.selectedClass.armor}</small>
            </div>
          </div>

          <!-- Official Subclass Picker (All Official WotC Books) -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div class="form-group">
              <label for="create-char-subclass">Official Subclass ${state.level >= 3 ? '(Unlocked)' : '(Optional / Chosen at Lv 3)'}</label>
              <select id="create-char-subclass" class="form-control">
                <option value="">-- Choose Subclass (Optional at Lv 1–2) --</option>
                ${((typeof DND_LEVEL_UP_DATA !== 'undefined' && DND_LEVEL_UP_DATA.classes[state.selectedClass.name]) ? DND_LEVEL_UP_DATA.classes[state.selectedClass.name].subclasses : []).map(sc => `
                  <option value="${sc}" ${state.selectedSubclass === sc ? 'selected' : ''}>${sc}</option>
                `).join('')}
              </select>
            </div>
            <div class="form-group">
              <label for="create-char-subclass-custom">Or Custom / Homebrew Subclass</label>
              <input type="text" id="create-char-subclass-custom" class="form-control" placeholder="Leave blank to use official list..." value="${state.customSubclass}">
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
        state.selectedSubclass = '';
        render();
      });
    }

    const subclassSelect = container.querySelector('#create-char-subclass');
    if (subclassSelect) {
      subclassSelect.addEventListener('change', (e) => {
        state.selectedSubclass = e.target.value;
      });
    }

    const customSubclassInput = container.querySelector('#create-char-subclass-custom');
    if (customSubclassInput) {
      customSubclassInput.addEventListener('input', (e) => {
        state.customSubclass = e.target.value;
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
        const chosenSubclass = (state.customSubclass || state.selectedSubclass || '').trim();
        const charPayload = {
          name: name,
          level: state.level,
          species: state.selectedSpecies.name,
          classRole: chosenSubclass ? `${state.selectedClass.name} (${chosenSubclass})` : state.selectedClass.name,
          subclass: chosenSubclass || null,
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
          ${isDm ? `<button id="combat-award-xp-btn" class="btn btn-sm" style="border-color: #fde047; color: #fde047;" title="Distribute Encounter XP & Gold to Party (Supabase)">🏆 Award XP</button>` : ''}
          <button id="combat-dm-screen-btn" class="btn btn-sm" style="border-color: #38bdf8; color: #7dd3fc;" title="Open D&D 5.5e Quick Reference DM Screen">📖 5.5e DM Screen</button>
        </div>
      </div>

      <!-- v2.0 AoE Spell Templates Toolbar (Supabase Synced) -->
      <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem; padding: 0.4rem 0.75rem; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); margin-bottom: 0.5rem; font-size: 0.75rem;">
        <strong style="color: var(--text-gold);">🎯 AoE Spell Templates (Supabase):</strong>
        <button type="button" class="btn btn-sm combat-aoe-btn" data-shape="sphere" data-radius="20" data-color="rgba(239,68,68,0.34)" data-label="Fireball (20ft Sphere)" style="font-size: 0.7rem; padding: 2px 7px;">🔥 20ft Sphere</button>
        <button type="button" class="btn btn-sm combat-aoe-btn" data-shape="cone" data-radius="15" data-color="rgba(249,115,22,0.34)" data-label="Burning Hands (15ft Cone)" style="font-size: 0.7rem; padding: 2px 7px;">🌊 15ft Cone</button>
        <button type="button" class="btn btn-sm combat-aoe-btn" data-shape="line" data-radius="30" data-color="rgba(56,189,248,0.36)" data-label="Lightning Bolt (30ft Line)" style="font-size: 0.7rem; padding: 2px 7px;">⚡ 30ft Line</button>
        <button type="button" class="btn btn-sm combat-aoe-btn" data-shape="cube" data-radius="20" data-color="rgba(168,85,247,0.34)" data-label="Thunderwave (20ft Cube)" style="font-size: 0.7rem; padding: 2px 7px;">🧊 20ft Cube</button>
        <button type="button" class="btn btn-sm" id="combat-clear-aoe-btn" style="font-size: 0.7rem; padding: 2px 7px; border-color: #f87171; color: #fca5a5;">✕ Clear AoE</button>
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
              <button class="combat-act-btn" data-action="RULER" style="grid-column: span 2;">📏 Distance Ruler &amp; Line of Sight</button>
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
                <optgroup id="combat-custom-monsters-optgroup" label="Custom Homebrew Bestiary (Supabase)">
                  ${(worldState.getCustomMonsters ? worldState.getCustomMonsters() : []).map(m => `<option value="custom_${m.id}">${m.name} (AC ${m.ac}, HP ${m.hp})</option>`).join('')}
                </optgroup>
              </select>

              <select id="combat-spawn-team" class="theme-select" style="width: 100%; font-size: 0.75rem; margin-bottom: 0.4rem;" title="Side for spawned NPCs and monsters (party members always join the party)">
                <option value="enemy" selected>Spawn as: Hostile Enemy</option>
                <option value="ally">Spawn as: Allied NPC</option>
              </select>

              <div style="display: flex; gap: 0.35rem; margin-bottom: 0.4rem;">
                <button id="combat-drop-unit-btn" class="btn btn-sm btn-primary" style="flex: 1; font-size: 0.75rem;">Drop on Map</button>
                <button id="combat-paint-btn" class="btn btn-sm" style="flex: 1; font-size: 0.75rem;">Paint: OFF</button>
                <button id="combat-new-monster-btn" class="btn btn-sm" style="font-size: 0.72rem; border-color: var(--accent-gold); color: var(--text-gold);" title="Create Custom Homebrew Monster (Supabase)">+ Monster</button>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: var(--text-secondary);">
              <span>Grid: <strong id="combat-grid-label">11x11</strong></span>
              <input type="range" id="combat-grid-slider" min="6" max="30" value="11" style="width: 120px; cursor: pointer;">
            </div>

            <!-- DM Terrain, Fog of War & Custom Battlemap Upload -->
            <div id="combat-dm-map-tools" style="margin-top: 0.65rem; padding-top: 0.6rem; border-top: 1px solid var(--border-subtle); display: flex; flex-direction: column; gap: 0.4rem;">
              <div style="font-size: 0.72rem; font-weight: 700; color: var(--text-gold); text-transform: uppercase;">
                🗺️ Terrain, Fog of War &amp; Custom Map
              </div>
              <div style="display: flex; gap: 0.3rem; flex-wrap: wrap;">
                <select id="combat-brush-select" class="theme-select" style="flex: 1; font-size: 0.72rem; padding: 2px 6px;">
                  <option value="">Brush: OFF (Normal Click)</option>
                  <option value="wall">🧱 Paint Wall / Obstacle</option>
                  <option value="difficult">🌿 Paint Difficult Terrain</option>
                  <option value="water">🌊 Paint Water</option>
                  <option value="fire">🔥 Paint Hazard / Fire</option>
                  <option value="erase_terrain">🧹 Erase Terrain</option>
                  <option value="fog_hide">🌫️ Fog of War: Hide Tile</option>
                  <option value="fog_reveal">☀️ Fog of War: Reveal Tile</option>
                </select>
              </div>
              <div style="display: flex; gap: 0.3rem;">
                <button id="combat-fog-cover-all" class="btn btn-sm" style="flex: 1; font-size: 0.68rem; padding: 2px 4px;">Cover All Fog</button>
                <button id="combat-fog-reveal-all" class="btn btn-sm" style="flex: 1; font-size: 0.68rem; padding: 2px 4px;">Reveal All Fog</button>
              </div>
              <div style="display: flex; gap: 0.3rem; align-items: center;">
                <label for="combat-map-file-input" class="btn btn-sm" style="flex: 1; font-size: 0.68rem; padding: 3px 6px; text-align: center; cursor: pointer; margin: 0;">
                  📤 Upload Battlemap
                </label>
                <input type="file" id="combat-map-file-input" accept="image/*" style="display: none;">
                <button id="combat-map-clear-btn" class="btn btn-sm" style="font-size: 0.68rem; padding: 3px 6px; color: #fca5a5;">Clear Map</button>
              </div>
            </div>

            <!-- DM Encounter Builder & Saved Presets (Supabase) -->
            <div id="combat-encounter-presets-panel" style="margin-top: 0.65rem; padding-top: 0.6rem; border-top: 1px solid var(--border-subtle); display: flex; flex-direction: column; gap: 0.4rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.72rem; font-weight: 700; color: var(--text-gold); text-transform: uppercase;">⚔️ Encounter Presets</span>
                <span id="combat-cr-badge" style="font-size: 0.66rem; font-weight: 700; padding: 1px 6px; border-radius: 4px; background: rgba(234,179,8,0.2); color: #fde047;">Medium</span>
              </div>
              <div style="display: flex; gap: 0.3rem;">
                <input type="text" id="combat-preset-name" placeholder="Encounter name..." style="flex: 1; font-size: 0.7rem; padding: 2px 6px; background: var(--bg-tertiary); color: #fff; border: 1px solid var(--border-subtle); border-radius: 3px;">
                <button id="combat-save-preset-btn" class="btn btn-sm btn-primary" style="font-size: 0.68rem; padding: 2px 7px;">💾 Save</button>
              </div>
              <div style="display: flex; gap: 0.3rem;">
                <select id="combat-preset-select" class="theme-select" style="flex: 1; font-size: 0.7rem; padding: 2px 5px;">
                  <option value="">-- Saved Encounters (0) --</option>
                </select>
                <button id="combat-load-preset-btn" class="btn btn-sm" style="font-size: 0.68rem; padding: 2px 6px;">Load</button>
                <button id="combat-delete-preset-btn" class="btn btn-sm" style="font-size: 0.68rem; padding: 2px 6px; color: #fca5a5;" title="Delete Preset">&times;</button>
              </div>
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
    activeBrush: '',
    terrain: {},
    fogOfWar: {},
    mapImageUrl: null,
    rulerOrigin: null,
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

    // Distance Ruler & Line-of-Sight Measurement
    if (cState.selectedAction === 'RULER') {
      if (!cState.rulerOrigin) {
        cState.rulerOrigin = { x: gx, y: gy };
        notifyToast(`Ruler origin set at (${gx}, ${gy}). Hover or click target tile.`);
      } else {
        const res = measureDistance(cState.rulerOrigin, { x: gx, y: gy });
        notifyToast(`📏 ${res.feet} ft (${res.tiles} tiles) — ${res.hasLoS ? 'Clear Line of Sight' : 'BLOCKED BY WALL'}`);
        cState.rulerOrigin = null;
      }
      return;
    }

    // Terrain & Fog of War Brush Painting
    if (cState.activeBrush) {
      const key = `${gx},${gy}`;
      if (cState.activeBrush === 'erase_terrain') {
        delete cState.terrain[key];
      } else if (cState.activeBrush === 'fog_hide') {
        cState.fogOfWar[key] = true;
      } else if (cState.activeBrush === 'fog_reveal') {
        delete cState.fogOfWar[key];
      } else {
        cState.terrain[key] = cState.activeBrush;
      }
      persistCombatToCloud();
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

  // 5.5e Condition Automation & Concentration Save Engine
  function getEntityConditions(unit) {
    if (!unit) return [];
    const local = Array.isArray(unit.conditions) ? unit.conditions : [];
    if (unit.team === 'player') {
      const pc = (worldState.data.partyCharacters || []).find(c => c.id === (unit.partyCharId || unit.id));
      if (pc && Array.isArray(pc.conditions)) {
        return Array.from(new Set([...local, ...pc.conditions]));
      }
    }
    return local;
  }

  function getConditionCombatEffects(attacker, target, isMelee = true) {
    const atkConds = getEntityConditions(attacker).map(c => c.toLowerCase());
    const tgtConds = getEntityConditions(target).map(c => c.toLowerCase());
    let hasAdv = false;
    let hasDis = false;
    let autoCrit = false;
    let blessed = atkConds.includes('blessed');

    if (atkConds.includes('poisoned') || atkConds.includes('blinded') || atkConds.includes('prone') || atkConds.includes('restrained')) {
      hasDis = true;
    }
    if (atkConds.includes('invisible') || atkConds.includes('advantage')) {
      hasAdv = true;
    }
    if (tgtConds.includes('paralyzed') || tgtConds.includes('unconscious')) {
      hasAdv = true;
      if (isMelee) autoCrit = true;
    }
    if (tgtConds.includes('stunned') || tgtConds.includes('restrained') || tgtConds.includes('blinded')) {
      hasAdv = true;
    }
    if (tgtConds.includes('prone')) {
      if (isMelee) hasAdv = true;
      else hasDis = true;
    }

    let resolvedMode = 'NORMAL';
    if (hasAdv && !hasDis) resolvedMode = 'ADVANTAGE';
    else if (hasDis && !hasAdv) resolvedMode = 'DISADVANTAGE';
    return { resolvedMode, autoCrit, blessed };
  }

  function checkConcentrationSave(target, damageAmount) {
    if (!target || !target.concentratingOn || damageAmount <= 0 || target.hp <= 0) {
      if (target && target.hp <= 0 && target.concentratingOn) {
        logMsg(`💫 ${target.name} drops concentration on ${target.concentratingOn} (incapacitated).`, '#fbbf24');
        target.concentratingOn = null;
      }
      return null;
    }
    const dc = Math.max(10, Math.floor(damageAmount / 2));
    const pc = (worldState.data.partyCharacters || []).find(c => c.id === (target.partyCharId || target.id));
    const hasWarCaster = pc && Array.isArray(pc.feats) && pc.feats.some(f => String(f).toLowerCase().includes('war caster'));
    const r = rollWithMode(hasWarCaster ? 'ADVANTAGE' : 'NORMAL');
    const mod = computeSaveMod(target, 'CON');
    const total = r.d20 + mod;
    const kept = total >= dc;
    if (kept) {
      logMsg(`🧠 ${target.name} maintains Concentration on ${target.concentratingOn}! (CON Save ${total} vs DC ${dc}${hasWarCaster ? ', War Caster Adv' : ''})`, '#38bdf8');
    } else {
      logMsg(`💥 ${target.name} LOSES Concentration on ${target.concentratingOn}! (CON Save ${total} vs DC ${dc})`, '#f87171');
      pushFloater(target, 'CONC LOST', '#f87171');
      target.concentratingOn = null;
    }
    return { dc, total, kept, hasWarCaster };
  }

  function applyDamage(target, amount, type, sourceName) {
    target.hp = Math.max(0, target.hp - amount);
    pushFloater(target, `-${amount}`, '#ef4444');
    syncPartyHp(target);
    if (target.hp === 0) {
      if (target.team === 'player') logMsg(`💀 ${target.name} drops to 0 HP and falls unconscious!`, '#f87171');
      else logMsg(`☠ ${target.name} is slain${sourceName ? ` by ${sourceName}` : ''}!`, '#fbbf24');
    }
    if (target.concentratingOn) {
      checkConcentrationSave(target, amount);
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
    const isMelee = dist(actor, target) <= 1;
    const condFx = getConditionCombatEffects(actor, target, isMelee);
    const effectiveMode = advMode !== 'NORMAL' ? advMode : condFx.resolvedMode;
    const r = rollWithMode(effectiveMode);
    const blessBonus = condFx.blessed ? (Math.floor(Math.random() * 4) + 1) : 0;
    const total = r.d20 + bonus + blessBonus;
    const hit = r.d20 === 20 || (r.d20 !== 1 && total >= target.ac);
    const crit = r.d20 === 20 || (hit && condFx.autoCrit);
    const entry = {
      rollerName: rollerLabel(actor),
      rollerAvatar: actor.avatar || '🎲',
      rollType: 'attack',
      label: `${label} → ${target.name}`,
      formula: `${r.text} ${bonus >= 0 ? '+' : '-'} ${Math.abs(bonus)}${blessBonus ? ` + ${blessBonus} (Bless)` : ''}`,
      d20Result: r.d20,
      total,
      dc: target.ac,
      success: hit,
      advantageMode: effectiveMode.toLowerCase(),
      note: `vs AC ${target.ac}${condFx.autoCrit ? ' [AUTO-CRIT]' : ''}`
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
    if (actor.team === 'player' && ab.level > 0 && typeof worldState.spendSpellSlot === 'function') {
      worldState.spendSpellSlot(actor.partyCharId || actor.id, ab.level);
    }
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
    persistCombatToCloud();
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
    } else if (val.startsWith('custom_')) {
      const mid = val.replace('custom_', '');
      const mData = (worldState.getCustomMonsters ? worldState.getCustomMonsters() : []).find(m => m.id === mid);
      if (mData) {
        cState.entities.push(buildMonsterEntity(mData.name, cx, cy, teamChoice, {
          ac: mData.ac,
          hp: mData.hp,
          maxHp: mData.hp,
          speed: mData.speed || 6,
          attackMod: mData.attackMod || 5,
          dmgFormula: mData.dmgFormula || '1d8+3',
          dmgType: mData.dmgType || 'slashing',
          abilities: mData.abilities || ['ember_hex'],
          portraitUrl: mData.portraitUrl || null
        }));
        persistCombatToCloud();
        notifyToast(`Custom monster ${mData.name} spawned!`);
        renderInitiativeList();
        renderEncounterPresetsUi();
      }
    } else {
      cState.entities.push(buildMonsterEntity(val, cx, cy, teamChoice));
      persistCombatToCloud();
      notifyToast(`${val} spawned on map (${teamChoice})!`);
      renderInitiativeList();
      renderEncounterPresetsUi();
    }
  });

  // Create Custom Homebrew Monster Button
  container.querySelector('#combat-new-monster-btn')?.addEventListener('click', async () => {
    const name = prompt('Custom Monster Name:', 'Obsidian Golem');
    if (!name) return;
    const ac = parseInt(prompt('Armor Class (AC):', '16') || '16', 10);
    const hp = parseInt(prompt('Max Hit Points (HP):', '65') || '65', 10);
    const dmgFormula = prompt('Attack Damage Dice (e.g. 2d8+4):', '2d8+4') || '2d8+4';
    const crXp = parseInt(prompt('CR Experience Value (XP, e.g. 700):', '700') || '700', 10);
    const res = await worldState.createCustomMonster({ name, ac, hp, dmgFormula, crXp });
    if (res && res.success) {
      const grp = container.querySelector('#combat-custom-monsters-optgroup');
      if (grp) {
        grp.innerHTML = worldState.getCustomMonsters().map(m => `<option value="custom_${m.id}">${m.name} (AC ${m.ac}, HP ${m.hp})</option>`).join('');
      }
      notifyToast(`Saved custom monster "${name}" to Supabase!`);
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

  // ==========================================
  // LIVE SUPABASE BATTLEMAT SYNC, TERRAIN, FOG & CUSTOM MAP
  // ==========================================
  let mapBgImg = null;
  let loadedMapUrl = null;
  let lastCloudCombatJson = '';

  function setMapImageUrl(url) {
    cState.mapImageUrl = url || null;
    if (!url) {
      mapBgImg = null;
      loadedMapUrl = null;
    } else if (url !== loadedMapUrl) {
      loadedMapUrl = url;
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => { mapBgImg = img; };
      img.src = url;
    }
  }

  function setTerrainTile(gx, gy, type) {
    const key = `${gx},${gy}`;
    if (!type || type === 'erase') delete cState.terrain[key];
    else cState.terrain[key] = type;
    persistCombatToCloud();
  }

  function setFogTile(gx, gy, hidden) {
    const key = `${gx},${gy}`;
    if (hidden) cState.fogOfWar[key] = true;
    else delete cState.fogOfWar[key];
    persistCombatToCloud();
  }

  // Distance Ruler, Bresenham Line-of-Sight & Wall/Difficult Terrain Movement Rules
  function hasLineOfSight(x0, y0, x1, y1) {
    let cx = x0, cy = y0;
    const dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;
    while (!(cx === x1 && cy === y1)) {
      if (!(cx === x0 && cy === y0) && cState.terrain[`${cx},${cy}`] === 'wall') {
        return false;
      }
      const e2 = 2 * err;
      if (e2 > -dy) { err -= dy; cx += sx; }
      if (e2 < dx) { err += dx; cy += sy; }
    }
    return true;
  }

  function measureDistance(a, b) {
    const tiles = Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
    const hasLoS = hasLineOfSight(a.x, a.y, b.x, b.y);
    return { tiles, feet: tiles * 5, hasLoS };
  }

  function getMoveCost(actor, gx, gy) {
    const key = `${gx},${gy}`;
    if (cState.terrain[key] === 'wall') return Infinity;
    const baseDist = Math.max(Math.abs(actor.x - gx), Math.abs(actor.y - gy));
    if (!hasLineOfSight(actor.x, actor.y, gx, gy)) return Infinity;
    return cState.terrain[key] === 'difficult' ? baseDist * 2 : baseDist;
  }

  function persistCombatToCloud() {
    const snapshot = {
      gridSize: cState.gridSize,
      entities: cState.entities.map(e => ({ ...e })),
      combat: {
        active: cState.combat.active,
        round: cState.combat.round,
        order: cState.combat.order,
        turnIndex: cState.combat.turnIndex
      },
      terrain: { ...cState.terrain },
      fogOfWar: { ...cState.fogOfWar },
      mapImageUrl: cState.mapImageUrl || null,
      updatedAt: Date.now()
    };
    lastCloudCombatJson = JSON.stringify({ ...snapshot, updatedAt: 0 });
    if (typeof worldState.saveCombatState === 'function') {
      worldState.saveCombatState(snapshot);
    }
  }

  function hydrateCombatFromCloud() {
    const remote = worldState.data && worldState.data.combatState;
    if (!remote || typeof remote !== 'object') return;
    const sig = JSON.stringify({ ...remote, updatedAt: 0 });
    if (sig === lastCloudCombatJson) return;
    lastCloudCombatJson = sig;

    if (remote.gridSize) cState.gridSize = remote.gridSize;
    if (Array.isArray(remote.entities) && remote.entities.length > 0) {
      cState.entities = remote.entities.map(e => ({ ...e }));
    }
    if (remote.combat) {
      cState.combat.active = !!remote.combat.active;
      cState.combat.round = remote.combat.round || 0;
      cState.combat.order = Array.isArray(remote.combat.order) ? remote.combat.order : [];
      cState.combat.turnIndex = remote.combat.turnIndex || 0;
    }
    if (remote.terrain && typeof remote.terrain === 'object') {
      cState.terrain = { ...remote.terrain };
    }
    if (remote.fogOfWar && typeof remote.fogOfWar === 'object') {
      cState.fogOfWar = { ...remote.fogOfWar };
    }
    if (remote.mapImageUrl !== undefined) {
      setMapImageUrl(remote.mapImageUrl);
    }
    renderTurnUi();
    renderInitiativeList();
    updatePhaseHeader();
  }

  // Bind DM Terrain, Fog & Battlemap Upload Controls
  const brushSelect = container.querySelector('#combat-brush-select');
  if (brushSelect) {
    brushSelect.addEventListener('change', (e) => {
      cState.activeBrush = e.target.value;
      if (cState.activeBrush) {
        cState.selectedAction = null;
        updateActionUi();
      }
    });
  }
  container.querySelector('#combat-fog-cover-all')?.addEventListener('click', () => {
    for (let x = 0; x < cState.gridSize; x++) {
      for (let y = 0; y < cState.gridSize; y++) {
        cState.fogOfWar[`${x},${y}`] = true;
      }
    }
    persistCombatToCloud();
    notifyToast('Fog of War covers the battlefield (DM sees through)');
  });
  container.querySelector('#combat-fog-reveal-all')?.addEventListener('click', () => {
    cState.fogOfWar = {};
    persistCombatToCloud();
    notifyToast('Fog of War cleared');
  });
  container.querySelector('#combat-map-file-input')?.addEventListener('change', async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    notifyToast('Uploading battlemap to Supabase Storage...');
    if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      const res = await supabaseDb.uploadBattlemapImage(worldState.activeGameId || 'demo', file);
      if (res && res.success && res.url) {
        setMapImageUrl(res.url);
        persistCombatToCloud();
        notifyToast('Battlemap uploaded & synced live to all players!');
        return;
      }
    }
    // Local FileReader fallback when offline
    const reader = new FileReader();
    reader.onload = () => {
      setMapImageUrl(reader.result);
      persistCombatToCloud();
      notifyToast('Battlemap loaded locally');
    };
    reader.readAsDataURL(file);
  });
  container.querySelector('#combat-map-clear-btn')?.addEventListener('click', () => {
    setMapImageUrl(null);
    persistCombatToCloud();
    notifyToast('Battlemap background cleared');
  });

  // Encounter Builder CR Calculator & Supabase Presets
  const MONSTER_XP_MAP = {
    'Goblin': 50, 'Goblin Alpha': 200, 'Orc': 100, 'Skeleton': 50,
    'Owlbear': 700, 'Troll': 1800, 'Red Dragon Wyrmling': 1100
  };
  const LEVEL_XP_THRESHOLDS = {
    1: [25, 50, 75, 100], 2: [50, 100, 150, 200], 3: [75, 150, 225, 400],
    4: [125, 250, 375, 500], 5: [250, 500, 750, 1100], 6: [300, 600, 900, 1400],
    7: [350, 750, 1100, 1700], 8: [450, 900, 1400, 2100], 9: [550, 1100, 1600, 2400],
    10: [600, 1200, 1900, 2800]
  };

  function calculateEncounterDifficulty(entities = cState.entities, partyChars = worldState.data.partyCharacters || []) {
    const foes = (entities || []).filter(e => e.team === 'enemy' && e.hp > 0);
    const totalXp = foes.reduce((sum, f) => {
      const matched = Object.keys(MONSTER_XP_MAP).find(k => (f.name || '').toLowerCase().includes(k.toLowerCase()));
      return sum + (matched ? MONSTER_XP_MAP[matched] : Math.max(50, (f.maxHp || 15) * 10));
    }, 0);
    const partyList = partyChars.length > 0 ? partyChars : [{ level: 3 }];
    let easy = 0, med = 0, hard = 0, deadly = 0;
    partyList.forEach(p => {
      const t = LEVEL_XP_THRESHOLDS[Math.min(10, Math.max(1, parseInt(p.level, 10) || 1))] || [250, 500, 750, 1100];
      easy += t[0]; med += t[1]; hard += t[2]; deadly += t[3];
    });
    let rating = 'Easy';
    if (totalXp >= deadly) rating = 'Deadly';
    else if (totalXp >= hard) rating = 'Hard';
    else if (totalXp >= med) rating = 'Medium';
    return { rating, totalXp, monsterCount: foes.length, partyCount: partyList.length };
  }

  function renderEncounterPresetsUi() {
    const badge = container.querySelector('#combat-cr-badge');
    const sel = container.querySelector('#combat-preset-select');
    const diff = calculateEncounterDifficulty();
    if (badge) {
      badge.textContent = `${diff.rating} (${diff.totalXp} XP)`;
      const colors = { Easy: '#86efac', Medium: '#fde047', Hard: '#fdba74', Deadly: '#fca5a5' };
      badge.style.color = colors[diff.rating] || '#fde047';
    }
    if (sel) {
      const presets = worldState.getEncounterPresets();
      sel.innerHTML = `<option value="">-- Saved Encounters (${presets.length}) --</option>` +
        presets.map(p => `<option value="${p.id}">${p.name} [${p.difficulty} • ${p.totalXp} XP]</option>`).join('');
    }
  }

  async function saveCurrentEncounterPreset(nameInput) {
    const diff = calculateEncounterDifficulty();
    const snapshot = {
      gridSize: cState.gridSize,
      entities: cState.entities.map(e => ({ ...e })),
      terrain: { ...cState.terrain },
      fogOfWar: { ...cState.fogOfWar },
      mapImageUrl: cState.mapImageUrl || null
    };
    const res = await worldState.saveEncounterPreset({
      name: nameInput || `Encounter (${diff.rating})`,
      difficulty: diff.rating,
      totalXp: diff.totalXp,
      snapshot
    });
    renderEncounterPresetsUi();
    return res;
  }

  function loadEncounterPresetById(presetId) {
    const preset = worldState.getEncounterPresets().find(p => p.id === presetId);
    if (!preset || !preset.snapshot) return false;
    const snap = preset.snapshot;
    if (snap.gridSize) cState.gridSize = snap.gridSize;
    if (Array.isArray(snap.entities)) cState.entities = snap.entities.map(e => ({ ...e }));
    cState.terrain = { ...(snap.terrain || {}) };
    cState.fogOfWar = { ...(snap.fogOfWar || {}) };
    setMapImageUrl(snap.mapImageUrl || null);
    persistCombatToCloud();
    renderEncounterPresetsUi();
    renderTurnUi();
    renderInitiativeList();
    notifyToast(`Loaded encounter: ${preset.name}`);
    return true;
  }

  container.querySelector('#combat-save-preset-btn')?.addEventListener('click', async () => {
    const nameEl = container.querySelector('#combat-preset-name');
    const name = (nameEl?.value || '').trim();
    const res = await saveCurrentEncounterPreset(name);
    if (res && res.success) {
      if (nameEl) nameEl.value = '';
      notifyToast(`Encounter saved to Supabase: ${res.preset.name}`);
    }
  });
  container.querySelector('#combat-load-preset-btn')?.addEventListener('click', () => {
    const sel = container.querySelector('#combat-preset-select');
    if (sel && sel.value) loadEncounterPresetById(sel.value);
  });
  container.querySelector('#combat-delete-preset-btn')?.addEventListener('click', async () => {
    const sel = container.querySelector('#combat-preset-select');
    if (sel && sel.value) {
      await worldState.deleteEncounterPreset(sel.value);
      renderEncounterPresetsUi();
      notifyToast('Encounter preset deleted');
    }
  });
  renderEncounterPresetsUi();

  // Hydrate initial combat session from Supabase if present
  hydrateCombatFromCloud();

  // Listen to worldState state changes for real-time rolls, requests & live battlemat sync
  worldState.subscribe(() => {
    hydrateCombatFromCloud();
    renderEncounterPresetsUi();
    renderCombatPendingBanner();
    updateActionUi();
    renderTurnUi();
  });

  // Render Loop
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const ts = cState.tileSize;

    // Custom Uploaded Battlemap Background Image
    if (mapBgImg && mapBgImg.complete) {
      ctx.save();
      ctx.globalAlpha = 0.85;
      ctx.drawImage(mapBgImg, 0, 0, canvas.width, canvas.height);
      ctx.restore();
    }

    // Painted Terrain Tiles (Wall, Difficult, Water, Fire)
    const terrainColors = {
      wall: 'rgba(51, 65, 85, 0.88)',
      difficult: 'rgba(180, 83, 9, 0.35)',
      water: 'rgba(14, 165, 233, 0.42)',
      fire: 'rgba(239, 68, 68, 0.45)'
    };
    Object.keys(cState.terrain || {}).forEach(key => {
      const tType = cState.terrain[key];
      const parts = key.split(',');
      const tx = parseInt(parts[0], 10);
      const ty = parseInt(parts[1], 10);
      if (!isNaN(tx) && !isNaN(ty) && terrainColors[tType]) {
        ctx.fillStyle = terrainColors[tType];
        ctx.fillRect(tx * ts, ty * ts, ts, ts);
        if (tType === 'wall') {
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.6)';
          ctx.lineWidth = 2;
          ctx.strokeRect(tx * ts + 2, ty * ts + 2, ts - 4, ts - 4);
        }
      }
    });

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

    // Move range highlight (respects Walls & Difficult Terrain)
    if (cState.selectedEntity && cState.selectedAction === 'MOVE') {
      for (let x = 0; x < cState.gridSize; x++) {
        for (let y = 0; y < cState.gridSize; y++) {
          const cost = getMoveCost(cState.selectedEntity, x, y);
          if (cost <= cState.selectedEntity.movementLeft && !cState.entities.find(e => e.x === x && e.y === y && e.hp > 0)) {
            ctx.fillStyle = cState.terrain[`${x},${y}`] === 'difficult' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(59, 130, 246, 0.2)';
            ctx.fillRect(x * ts, y * ts, ts, ts);
          }
        }
      }
    }

    // Distance Ruler & Line-of-Sight Overlay
    if (cState.selectedAction === 'RULER' && cState.rulerOrigin && cState.hoveredTile) {
      const a = cState.rulerOrigin;
      const b = cState.hoveredTile;
      const m = measureDistance(a, b);
      const ax = a.x * ts + ts / 2, ay = a.y * ts + ts / 2;
      const bx = b.x * ts + ts / 2, by = b.y * ts + ts / 2;
      ctx.save();
      ctx.beginPath();
      ctx.setLineDash([6, 4]);
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.strokeStyle = m.hasLoS ? '#fde047' : '#ef4444';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.setLineDash([]);
      const midX = (ax + bx) / 2, midY = (ay + by) / 2;
      const label = `${m.feet} ft${m.hasLoS ? '' : ' (BLOCKED)'}`;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.fillRect(midX - 42, midY - 11, 84, 20);
      ctx.fillStyle = m.hasLoS ? '#fde047' : '#fca5a5';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, midX, midY - 1);
      ctx.restore();
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

    // Entities (with Custom Portrait Token Art & Concentration Indicator)
    const tokenImages = cState._tokenImages || (cState._tokenImages = {});
    cState.entities.forEach(ent => {
      if (ent.hp <= 0) return;
      const px = ent.x * ts + ts/2;
      const py = ent.y * ts + ts/2;
      const radius = ts * 0.42;

      const pc = ent.team === 'player' ? (worldState.data.partyCharacters || []).find(c => c.id === (ent.partyCharId || ent.id)) : null;
      const portraitUrl = ent.portraitUrl || (pc && pc.portraitUrl) || null;

      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.fillStyle = ent.color || '#3b82f6';
      ctx.fill();

      if (portraitUrl) {
        if (!tokenImages[portraitUrl]) {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.src = portraitUrl;
          tokenImages[portraitUrl] = img;
        }
        const img = tokenImages[portraitUrl];
        if (img && img.complete && img.naturalWidth > 0) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(px, py, radius - 1, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(img, px - radius, py - radius, radius * 2, radius * 2);
          ctx.restore();
        }
      } else {
        // Avatar Initials
        const initial = ent.avatar || (ent.name || 'U').substring(0, 2).toUpperCase();
        ctx.font = `bold ${Math.floor(ts * 0.38)}px Inter, sans-serif`;
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(initial, px, py);
      }

      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.strokeStyle = ent.id === cState.selectedEntity?.id ? '#fff' : (ent.team === 'player' ? '#60a5fa' : '#ef4444');
      ctx.lineWidth = 2;
      ctx.stroke();

      // Concentration badge ('C')
      if (ent.concentratingOn) {
        ctx.beginPath();
        ctx.arc(px + radius * 0.72, py - radius * 0.72, 7, 0, Math.PI * 2);
        ctx.fillStyle = '#eab308';
        ctx.fill();
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 9px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('C', px + radius * 0.72, py - radius * 0.72);
      }

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

    // v2.0 AoE Spell Templates Overlay (Supabase Synced)
    if (typeof worldState.getAoeTemplates === 'function') {
      const templates = worldState.getAoeTemplates();
      templates.forEach(t => {
        const cx = (t.x + 0.5) * ts;
        const cy = (t.y + 0.5) * ts;
        const rPx = Math.max(ts, ((t.radiusFt || 20) / 5) * ts);
        ctx.save();
        ctx.fillStyle = t.color || 'rgba(239, 68, 68, 0.34)';
        ctx.strokeStyle = '#fde047';
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (t.shape === 'cube') {
          ctx.rect(cx - rPx / 2, cy - rPx / 2, rPx, rPx);
        } else if (t.shape === 'line') {
          ctx.rect(cx, cy - ts * 0.45, rPx, ts * 0.9);
        } else if (t.shape === 'cone') {
          ctx.moveTo(cx, cy);
          ctx.arc(cx, cy, rPx, -Math.PI / 6, Math.PI / 6);
          ctx.closePath();
        } else {
          ctx.arc(cx, cy, rPx, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(t.label || 'AoE', cx, cy - 4);
        ctx.restore();
      });
    }

    // Fog of War Overlay (opaque for players, translucent for DM)
    const fogKeys = Object.keys(cState.fogOfWar || {});
    if (fogKeys.length > 0) {
      const isViewingAsDm = cState.currentPerspective === 'DM';
      ctx.fillStyle = isViewingAsDm ? 'rgba(8, 10, 16, 0.42)' : 'rgba(8, 10, 16, 0.96)';
      fogKeys.forEach(key => {
        if (!cState.fogOfWar[key]) return;
        const parts = key.split(',');
        const fx = parseInt(parts[0], 10);
        const fy = parseInt(parts[1], 10);
        if (!isNaN(fx) && !isNaN(fy)) {
          ctx.fillRect(fx * ts, fy * ts, ts, ts);
        }
      });
    }

    animationFrameId = requestAnimationFrame(render);
  }
  animationFrameId = requestAnimationFrame(render);

  // v2.0 AoE Templates, Encounter XP Distributor & 5.5e DM Screen Handlers
  container.querySelectorAll('.combat-aoe-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const shape = btn.getAttribute('data-shape');
      const radiusFt = parseInt(btn.getAttribute('data-radius'), 10) || 20;
      const color = btn.getAttribute('data-color');
      const label = btn.getAttribute('data-label');
      await worldState.addAoeTemplate({ shape, radiusFt, x: 5, y: 5, color, label });
      logMsg(`Placed AoE Template: ${label}`, 'system');
    });
  });

  container.querySelector('#combat-clear-aoe-btn')?.addEventListener('click', async () => {
    await worldState.clearAoeTemplates();
    logMsg('Cleared all Battlemat AoE templates.', 'system');
  });

  container.querySelector('#combat-award-xp-btn')?.addEventListener('click', () => {
    const xp = parseInt(prompt('Total Encounter XP to split across party:', '1200') || '0', 10);
    const gp = parseInt(prompt('Total Gold Pieces (GP) loot to split:', '200') || '0', 10);
    if (!xp && !gp) return;
    const res = worldState.awardEncounterXp(xp, gp, 'Combat Victory');
    if (res.success) {
      alert(`Awarded +${res.xpEach} XP & +${res.gpEach} GP to each hero!${res.readyHeroes.length ? `\nReady to Level Up: ${res.readyHeroes.join(', ')}` : ''}`);
    }
  });

  container.querySelector('#combat-dm-screen-btn')?.addEventListener('click', () => {
    const ref = worldState.getDmScreenReference();
    const dcLines = ref.dcTable.map(d => `${d.label}: DC ${d.dc}`).join(' | ');
    const covLines = ref.coverRules.map(c => `${c.type}: ${c.bonus}`).join('\n');
    const paceLines = ref.travelPace.map(p => `${p.pace}: ${p.milesPerDay} mi/day (${p.effect})`).join('\n');
    alert(`📖 D&D 5.5e (2024) DM QUICK SCREEN\n\n[DC TABLE]\n${dcLines}\n\n[COVER]\n${covLines}\n\n[EXHAUSTION 2024]\n${ref.exhaustion2024}\n\n[TRAVEL PACE]\n${paceLines}`);
  });

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
    persistCombatToCloud,
    hydrateCombatFromCloud,
    setTerrainTile,
    setFogTile,
    setMapImageUrl,
    calculateEncounterDifficulty,
    saveCurrentEncounterPreset,
    loadEncounterPresetById,
    getConditionCombatEffects,
    checkConcentrationSave,
    hasLineOfSight,
    measureDistance,
    getMoveCost,
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
        <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
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

      <!-- Tabletop Soundboard & Ambient Audio Mixer + Private Whisper Bar (Supabase Synced) -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 0.75rem; margin-bottom: 0.85rem;">
        <div style="background: var(--bg-card); border: 1px solid rgba(56,189,248,0.35); border-radius: var(--radius-md); padding: 0.65rem 0.85rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.45rem;">
            <strong style="font-size: 0.82rem; color: #7dd3fc;">🎵 Tabletop Soundboard &amp; Audio Mixer (DM Synced)</strong>
            <span id="soundboard-track-label" style="font-size: 0.72rem; color: var(--text-gold);">Track: ${(worldState.getAmbientAudio ? worldState.getAmbientAudio().track : 'none')}</span>
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; align-items: center;">
            <select id="soundboard-track-select" class="editor-input" style="font-size: 0.74rem; padding: 2px 6px; width: auto;" ${!isDm ? 'disabled' : ''}>
              ${['none', 'tavern', 'rain', 'dungeon', 'boss'].map(t => `<option value="${t}" ${(worldState.getAmbientAudio && worldState.getAmbientAudio().track === t) ? 'selected' : ''}>${t === 'none' ? 'Silence' : t.charAt(0).toUpperCase() + t.slice(1)}</option>`).join('')}
            </select>
            <button type="button" class="btn btn-sm soundboard-sfx-btn" data-sfx="sword" style="font-size: 0.7rem; padding: 2px 6px;">⚔️ Clash</button>
            <button type="button" class="btn btn-sm soundboard-sfx-btn" data-sfx="thunder" style="font-size: 0.7rem; padding: 2px 6px;">⚡ Thunder</button>
            <button type="button" class="btn btn-sm soundboard-sfx-btn" data-sfx="spell" style="font-size: 0.7rem; padding: 2px 6px;">✨ Spell</button>
            <button type="button" class="btn btn-sm soundboard-sfx-btn" data-sfx="fanfare" style="font-size: 0.7rem; padding: 2px 6px;">🎺 Fanfare</button>
          </div>
        </div>

        <div style="background: var(--bg-card); border: 1px solid rgba(168,85,247,0.35); border-radius: var(--radius-md); padding: 0.65rem 0.85rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
            <strong style="font-size: 0.82rem; color: #d8b4fe;">💬 Party Chat &amp; Private Whispers (Supabase)</strong>
            <span style="font-size: 0.68rem; color: var(--text-muted);">Tip: /w @DM secret message</span>
          </div>
          <div id="supabase-chat-feed" style="max-height: 90px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.75rem; margin-bottom: 0.45rem;">
            ${(worldState.getChatMessages ? worldState.getChatMessages(activeHero?.name || 'Adventurer', isDm) : []).slice(-6).map(m => `
              <div style="padding: 2px 6px; border-radius: 4px; background: ${m.isWhisper ? 'rgba(168,85,247,0.16)' : 'var(--bg-tertiary)'};">
                <strong style="color: ${m.isWhisper ? '#e879f9' : 'var(--text-gold)'};">${m.senderName}${m.isWhisper ? ` → ${m.recipientName} (Whisper)` : ''}:</strong>
                <span style="color: var(--text-secondary);"> ${m.message}</span>
              </div>
            `).join('') || `<div style="color: var(--text-muted); font-style: italic;">No whispers or party messages yet.</div>`}
          </div>
          <form id="supabase-whisper-form" style="display: flex; gap: 0.35rem;">
            <input type="text" id="supabase-whisper-input" class="editor-input" placeholder="Say to party or /w @DM ..." style="flex: 1; font-size: 0.76rem; padding: 3px 7px;">
            <button type="submit" class="btn btn-sm btn-primary" style="font-size: 0.72rem; padding: 3px 9px;">Send</button>
          </form>
        </div>
      </div>

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

  // 11. Tabletop Soundboard & Ambient Audio Mixer (Supabase)
  const trackSel = container.querySelector('#soundboard-track-select');
  if (trackSel) {
    trackSel.addEventListener('change', async () => {
      await worldState.setAmbientAudio({ track: trackSel.value });
      if (soundEngine.setMuted) soundEngine.setMuted(trackSel.value === 'none');
      if (soundEngine.playAmbience) soundEngine.playAmbience(trackSel.value);
      renderSocialView(container);
    });
  }
  container.querySelectorAll('.soundboard-sfx-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const sfx = btn.getAttribute('data-sfx');
      await worldState.setAmbientAudio({ sfx });
      if (soundEngine.setMuted) soundEngine.setMuted(false);
      if (soundEngine.playSfx) soundEngine.playSfx(sfx);
    });
  });

  // 12. Party Chat & Private Whispers Form (Supabase)
  const whisperForm = container.querySelector('#supabase-whisper-form');
  if (whisperForm) {
    whisperForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const inp = container.querySelector('#supabase-whisper-input');
      const text = inp?.value.trim();
      if (!text) return;
      const isDm = Boolean(worldState.prefs.dmMode);
      const senderName = isDm ? 'DM' : (activeHero?.name || 'Adventurer');
      await worldState.sendChatMessage({ senderName, senderRole: isDm ? 'dm' : 'player', message: text });
      inp.value = '';
      renderSocialView(container);
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

  // COMPONENT: compendiumView.js
/**
 * Magic Item Compendium & DM Award System (v2.1)
 * Players can browse, search & filter all 5.5e magic items;
 * DM can award any item directly to a Hero, drop to a Loot Chest, stock in the Active Vendor, or craft Homebrew items.
 */
let compSearch = '';
let compRarity = 'all';
let compCategory = 'all';
let compAttunement = 'all';

const RARITY_STYLES = {
  Common: { bg: 'rgba(148,163,184,0.18)', border: '#94a3b8', color: '#cbd5e1' },
  Uncommon: { bg: 'rgba(34,197,94,0.18)', border: '#22c55e', color: '#86efac' },
  Rare: { bg: 'rgba(56,189,248,0.18)', border: '#38bdf8', color: '#7dd3fc' },
  'Very Rare': { bg: 'rgba(168,85,247,0.2)', border: '#a855f7', color: '#d8b4fe' },
  Legendary: { bg: 'rgba(245,158,11,0.22)', border: '#f59e0b', color: '#fde047' },
  Artifact: { bg: 'rgba(239,68,68,0.22)', border: '#ef4444', color: '#fca5a5' }
};
function renderCompendiumView(container) {
  const isDm = Boolean(worldState.prefs?.dmMode);
  const heroes = worldState.data.partyCharacters || [];
  const items = typeof worldState.getMagicCompendium === 'function'
    ? worldState.getMagicCompendium({ search: compSearch, rarity: compRarity, category: compCategory, attunement: compAttunement })
    : [];

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h2>✨ Magic Item Compendium &amp; DM Vault</h2>
        <div class="view-tagline">Browse official D&amp;D 5.5e &amp; homebrew magic items${isDm ? ' — DM Award System &amp; Vendor Stocking Active (Supabase Synced)' : ' — Inspect rarities, attunement &amp; properties'}</div>
      </div>
      <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
        <span class="meta-badge" style="background: rgba(168,85,247,0.18); border-color: #a855f7; color: #d8b4fe;">${items.length} Magic Items</span>
        ${isDm ? `<button type="button" class="btn btn-primary btn-sm" id="comp-add-homebrew-btn">+ Craft Homebrew Magic Item</button>` : ''}
      </div>
    </div>

    <!-- Filter & Search Bar -->
    <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 0.6rem; margin-bottom: 1rem; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0.75rem;">
      <input type="text" id="comp-search-input" class="editor-input" value="${compSearch}" placeholder="Search magic items by name, effect, or trait...">
      <select id="comp-rarity-select" class="editor-input">
        ${['all', 'Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary', 'Artifact'].map(r => `<option value="${r}" ${compRarity === r ? 'selected' : ''}>${r === 'all' ? 'All Rarities' : r}</option>`).join('')}
      </select>
      <select id="comp-category-select" class="editor-input">
        ${['all', 'Weapon', 'Armor', 'Wondrous', 'Potion', 'Ring', 'Staff', 'Wand', 'Scroll'].map(c => `<option value="${c}" ${compCategory === c ? 'selected' : ''}>${c === 'all' ? 'All Categories' : c}</option>`).join('')}
      </select>
      <select id="comp-attune-select" class="editor-input">
        <option value="all" ${compAttunement === 'all' ? 'selected' : ''}>Attunement: Any</option>
        <option value="yes" ${compAttunement === 'yes' ? 'selected' : ''}>Requires Attunement</option>
        <option value="no" ${compAttunement === 'no' ? 'selected' : ''}>No Attunement</option>
      </select>
    </div>

    ${isDm ? `
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 1rem; padding: 0.65rem 0.9rem; background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.45); border-radius: var(--radius-md); font-size: 0.82rem;">
        <div><strong style="color: var(--text-gold);">🎁 DM Quick Award Target:</strong> Choose which hero receives awarded items below (synced to Supabase immediately).</div>
        <select id="comp-dm-award-hero-select" class="editor-input" style="width: auto; font-size: 0.8rem; padding: 3px 8px;">
          ${heroes.length ? heroes.map(h => `<option value="${h.id}">${h.name} (Lv ${h.level || 1} ${h.classRole || ''})</option>`).join('') : `<option value="">No Heroes in Party</option>`}
        </select>
      </div>
    ` : ''}

    <!-- Magic Item Cards Grid -->
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 0.85rem;">
      ${items.map(item => {
        const rs = RARITY_STYLES[item.rarity] || RARITY_STYLES.Common;
        return `
          <div style="background: var(--bg-card); border: 1px solid ${rs.border}55; border-radius: var(--radius-md); padding: 0.85rem; display: flex; flex-direction: column; justify-content: space-between; gap: 0.55rem;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.4rem;">
                <strong style="font-size: 0.98rem; color: var(--text-primary);">${item.name}${item.isHomebrew ? ' <span style="font-size:0.65rem;color:#f472b6;">[HOMEBREW]</span>' : ''}</strong>
                <span style="font-size: 0.68rem; font-weight: 700; padding: 2px 7px; border-radius: 10px; background: ${rs.bg}; border: 1px solid ${rs.border}; color: ${rs.color}; white-space: nowrap;">${item.rarity}</span>
              </div>
              <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 3px; display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <span>📦 ${item.category}</span>
                <span>💰 ~${(item.priceGp || 0).toLocaleString()} GP</span>
                ${item.attunement ? `<span style="color: #fbbf24;">✦ Requires Attunement</span>` : `<span>No Attunement</span>`}
              </div>
              <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.45; margin: 0.5rem 0 0;">${item.description}</p>
            </div>

            ${isDm ? `
              <div style="display: flex; gap: 0.35rem; flex-wrap: wrap; border-top: 1px dashed var(--border-subtle); padding-top: 0.55rem;">
                <button type="button" class="btn btn-sm btn-primary comp-award-hero-btn" data-id="${item.id}" style="font-size: 0.72rem; padding: 3px 8px; flex: 1;">🎁 Award to Hero</button>
                <button type="button" class="btn btn-sm comp-drop-chest-btn" data-id="${item.id}" style="font-size: 0.72rem; padding: 3px 8px; border-color: #eab308; color: #fde047;" title="Drop into Party Loot Chest">💰 Chest</button>
                <button type="button" class="btn btn-sm comp-stock-vendor-btn" data-id="${item.id}" style="font-size: 0.72rem; padding: 3px 8px; border-color: #10b981; color: #6ee7b7;" title="Stock in Active Vendor">🏪 Stock</button>
              </div>
            ` : ''}
          </div>
        `;
      }).join('') || `<div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-muted);">No magic items match your current filters.</div>`}
    </div>
  `;

  // Filter Events
  container.querySelector('#comp-search-input')?.addEventListener('input', (e) => {
    compSearch = e.target.value;
    renderCompendiumView(container);
    const inp = container.querySelector('#comp-search-input');
    if (inp) { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }
  });
  container.querySelector('#comp-rarity-select')?.addEventListener('change', (e) => {
    compRarity = e.target.value;
    renderCompendiumView(container);
  });
  container.querySelector('#comp-category-select')?.addEventListener('change', (e) => {
    compCategory = e.target.value;
    renderCompendiumView(container);
  });
  container.querySelector('#comp-attune-select')?.addEventListener('change', (e) => {
    compAttunement = e.target.value;
    renderCompendiumView(container);
  });

  // DM Award & Homebrew Events
  container.querySelector('#comp-add-homebrew-btn')?.addEventListener('click', async () => {
    const name = prompt('Homebrew Magic Item Name:', 'Frostbite Signet');
    if (!name) return;
    const rarity = prompt('Rarity (Common / Uncommon / Rare / Very Rare / Legendary / Artifact):', 'Rare') || 'Rare';
    const category = prompt('Category (Weapon / Armor / Wondrous / Potion / Ring / Staff / Wand / Scroll):', 'Ring') || 'Wondrous';
    const priceGp = parseInt(prompt('Suggested Value (GP):', '1800') || '1800', 10);
    const attunement = confirm('Does this item require Attunement?');
    const description = prompt('Item Effects & Lore:', 'Grants resistance to Cold damage and lets you cast Ray of Frost at will.') || '';
    await worldState.addCustomMagicItem({ name, rarity, category, priceGp, attunement, description });
    if (soundEngine.playSfx) soundEngine.playSfx('fanfare');
    renderCompendiumView(container);
  });

  container.querySelectorAll('.comp-award-hero-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const heroId = container.querySelector('#comp-dm-award-hero-select')?.value;
      if (!heroId) { alert('No hero selected to award!'); return; }
      const res = worldState.awardMagicItemToHero(btn.getAttribute('data-id'), heroId);
      if (res.success) {
        if (soundEngine.playSfx) soundEngine.playSfx('fanfare');
        alert(`🎁 Awarded "${res.item}" directly to ${res.hero}'s inventory (synced to Supabase)!`);
      } else {
        alert(res.error || 'Could not award item.');
      }
    });
  });

  container.querySelectorAll('.comp-drop-chest-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const res = await worldState.awardMagicItemToLootChest(btn.getAttribute('data-id'));
      if (res.success) {
        if (soundEngine.playSfx) soundEngine.playSfx('spell');
        alert(`💰 Dropped magic item into a new Party Loot Chest (Supabase)!`);
      }
    });
  });

  container.querySelectorAll('.comp-stock-vendor-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const item = worldState.getMagicCompendium().find(i => i.id === btn.getAttribute('data-id'));
      if (!item) return;
      const res = await worldState.addItemToActiveVendor(item);
      if (res.success) {
        alert(`🏪 Stocked "${item.name}" into ${res.vendor.shopName} (${res.vendor.merchantName})!`);
      }
    });
  });
}

  // COMPONENT: vendorView.js
/**
 * Dynamic On-the-Fly Vendor & Merchant Tab (v2.1 — Supabase Synced)
 * DM can switch merchant archetype ("alignment") on the fly: Alchemist, Blacksmith, Tailor,
 * General Shopkeeper, Arcane Enchanter, Black Market Fence, or Traveling Relic Peddler.
 */
let vendorFilterType = 'all'; // 'all' | 'magic' | 'mundane'
function renderVendorView(container) {
  const isDm = Boolean(worldState.prefs?.dmMode);
  const archetypes = typeof worldState.getMerchantArchetypes === 'function' ? worldState.getMerchantArchetypes() : [];
  const vendor = typeof worldState.getActiveVendor === 'function' ? worldState.getActiveVendor() : { inventory: [] };
  const heroes = worldState.data.partyCharacters || [];
  const activeHero = (typeof worldState.getActiveHero === 'function' ? worldState.getActiveHero() : null) || heroes[0];
  const factionDiscount = typeof worldState.getMerchantDiscountPercent === 'function' ? worldState.getMerchantDiscountPercent() : 0;

  const filteredStock = (vendor.inventory || []).map((item, idx) => ({ item, idx })).filter(({ item }) => {
    if (vendorFilterType === 'magic') return Boolean(item.isMagic);
    if (vendorFilterType === 'mundane') return !item.isMagic;
    return true;
  });

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h2>${vendor.icon || '🏪'} ${vendor.shopName || 'Town Market'}</h2>
        <div class="view-tagline">
          Proprietor: <strong>${vendor.merchantName || 'Merchant'}</strong> • Specialty: <span style="color: var(--text-gold); font-weight: 700;">${vendor.archetypeName || 'Shopkeeper'}</span>
          ${factionDiscount > 0 ? ` • <span style="color: #6ee7b7; font-weight: 700;">Faction Standing Discount: −${factionDiscount}%</span>` : ''}
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
        <label for="vendor-buyer-select" style="font-size: 0.78rem; color: var(--text-muted);">Active Shopper:</label>
        <select id="vendor-buyer-select" class="editor-input" style="width: auto; font-size: 0.8rem; padding: 3px 8px;">
          ${heroes.length ? heroes.map(h => `<option value="${h.id}" ${activeHero && activeHero.id === h.id ? 'selected' : ''}>${h.name} (${h.currency?.gp ?? 50} GP)</option>`).join('') : `<option value="">No Hero</option>`}
        </select>
      </div>
    </div>

    <!-- Flavor Greeting Banner -->
    <div style="background: rgba(212,175,55,0.08); border-left: 3px solid var(--text-gold); border-radius: var(--radius-sm); padding: 0.65rem 1rem; margin-bottom: 1rem; font-style: italic; color: var(--text-secondary); font-size: 0.88rem;">
      ${vendor.greeting || '"Welcome, traveler! Browse my wares."'}
    </div>

    <!-- DM On-The-Fly Merchant Switcher Deck -->
    ${isDm ? `
      <div id="dm-vendor-control-deck" style="background: rgba(15, 23, 42, 0.82); border: 1px solid rgba(56,189,248,0.45); border-radius: var(--radius-md); padding: 0.85rem 1rem; margin-bottom: 1.15rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.65rem;">
          <strong style="color: #7dd3fc; font-size: 0.9rem;">🎭 DM Live Merchant Switcher (Updates All Players via Supabase)</strong>
          <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
            <button type="button" class="btn btn-sm" id="dm-vendor-restock-btn" style="border-color: #fde047; color: #fde047;">🎲 Restock Wares</button>
            <button type="button" class="btn btn-sm" id="dm-vendor-add-custom-btn" style="border-color: #10b981; color: #6ee7b7;">+ Stock Custom Item</button>
          </div>
        </div>

        <!-- Quick Archetype Alignment Pills -->
        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.7rem;">
          ${archetypes.map(a => `
            <button type="button" class="btn btn-sm dm-vendor-arch-btn ${vendor.archetypeId === a.id ? 'btn-primary' : ''}" data-arch="${a.id}" style="font-size: 0.75rem; padding: 4px 10px;">
              ${a.icon} ${a.name}
            </button>
          `).join('')}
        </div>

        <!-- Fine-Tune Rarity, Magic Toggle, Markup & Custom Name -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 0.5rem; font-size: 0.78rem;">
          <div>
            <label style="color: var(--text-muted); font-size: 0.7rem; display: block;">Shop Name</label>
            <input type="text" id="dm-vendor-shop-name" class="editor-input" value="${vendor.shopName || ''}" style="font-size: 0.78rem; padding: 3px 7px;">
          </div>
          <div>
            <label style="color: var(--text-muted); font-size: 0.7rem; display: block;">Merchant Name</label>
            <input type="text" id="dm-vendor-merch-name" class="editor-input" value="${vendor.merchantName || ''}" style="font-size: 0.78rem; padding: 3px 7px;">
          </div>
          <div>
            <label style="color: var(--text-muted); font-size: 0.7rem; display: block;">Max Magic Rarity</label>
            <select id="dm-vendor-max-rarity" class="editor-input" style="font-size: 0.78rem; padding: 3px 7px;">
              ${['Mundane', 'Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary', 'Artifact'].map(r => `<option value="${r}" ${vendor.maxRarity === r ? 'selected' : ''}>${r === 'Mundane' ? 'Mundane Only' : `Up to ${r}`}</option>`).join('')}
            </select>
          </div>
          <div>
            <label style="color: var(--text-muted); font-size: 0.7rem; display: block;">Price Markup / Discount (%)</label>
            <input type="number" id="dm-vendor-price-mod" class="editor-input" value="${vendor.priceModifierPct || 0}" min="-50" max="100" step="5" style="font-size: 0.78rem; padding: 3px 7px;">
          </div>
          <div style="display: flex; align-items: flex-end;">
            <button type="button" class="btn btn-sm btn-primary" id="dm-vendor-apply-btn" style="width: 100%; font-size: 0.78rem;">☁️ Apply &amp; Sync Shop</button>
          </div>
        </div>
      </div>
    ` : ''}

    <!-- Filter Chips: All / Magic / Non-Magic -->
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.85rem;">
      <div style="display: flex; gap: 0.4rem;">
        <button type="button" class="filter-chip vendor-filter-btn ${vendorFilterType === 'all' ? 'active' : ''}" data-filter="all">All Wares (${(vendor.inventory || []).length})</button>
        <button type="button" class="filter-chip vendor-filter-btn ${vendorFilterType === 'magic' ? 'active' : ''}" data-filter="magic">✨ Magic Items (${(vendor.inventory || []).filter(i => i.isMagic).length})</button>
        <button type="button" class="filter-chip vendor-filter-btn ${vendorFilterType === 'mundane' ? 'active' : ''}" data-filter="mundane">🎒 Non-Magic Gear (${(vendor.inventory || []).filter(i => !i.isMagic).length})</button>
      </div>
      <div style="font-size: 0.75rem; color: var(--text-muted);">
        ${vendor.priceModifierPct ? `Merchant Price Modifier: <strong>${vendor.priceModifierPct > 0 ? '+' : ''}${vendor.priceModifierPct}%</strong>` : 'Standard Merchant Pricing'}
      </div>
    </div>

    <!-- Vendor Stock Grid -->
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(265px, 1fr)); gap: 0.75rem; margin-bottom: 1.5rem;">
      ${filteredStock.map(({ item, idx }) => {
        const effPrice = worldState.getVendorEffectivePrice(item.priceGp);
        const outOfStock = (item.stock || 0) <= 0;
        return `
          <div style="background: var(--bg-card); border: 1px solid ${item.isMagic ? 'rgba(168,85,247,0.45)' : 'var(--border-subtle)'}; border-radius: var(--radius-md); padding: 0.75rem; display: flex; flex-direction: column; justify-content: space-between; gap: 0.45rem;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.35rem;">
                <strong style="color: ${item.isMagic ? '#e9d5ff' : 'var(--text-primary)'}; font-size: 0.92rem;">${item.isMagic ? '✨ ' : ''}${item.name}</strong>
                <span style="color: var(--text-gold); font-weight: 800; font-size: 0.85rem; white-space: nowrap;">${effPrice.toLocaleString()} GP</span>
              </div>
              <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 2px;">
                ${item.rarity || 'Mundane'} • ${item.category || 'gear'} • Stock: <strong>${item.stock ?? 0}</strong>${item.requiresAttunement ? ' • ✦ Attune' : ''}
              </div>
              ${item.notes ? `<div style="font-size: 0.76rem; color: var(--text-secondary); margin-top: 0.35rem; line-height: 1.4;">${item.notes}</div>` : ''}
            </div>
            <div style="display: flex; gap: 0.35rem; margin-top: 0.25rem;">
              <button type="button" class="btn btn-sm vendor-buy-btn" data-idx="${idx}" ${outOfStock ? 'disabled' : ''} style="flex: 1; font-size: 0.74rem; border-color: #10b981; color: #6ee7b7; ${outOfStock ? 'opacity: 0.45; cursor: not-allowed;' : ''}">
                ${outOfStock ? 'Sold Out' : `Buy (${effPrice.toLocaleString()} GP)`}
              </button>
              ${isDm ? `<button type="button" class="btn btn-sm vendor-remove-btn" data-idx="${idx}" title="DM: Remove item from shop" style="font-size: 0.72rem; border-color: #ef4444; color: #fca5a5;">✕</button>` : ''}
            </div>
          </div>
        `;
      }).join('') || `<div style="grid-column: 1 / -1; text-align: center; padding: 1.5rem; color: var(--text-muted);">No wares in this category.</div>`}
    </div>

    <!-- Quick Sell From Hero Pack Panel -->
    ${activeHero && Array.isArray(activeHero.inventoryItems) && activeHero.inventoryItems.length > 0 ? `
      <div style="background: var(--bg-card); border: 1px solid rgba(212,175,55,0.3); border-radius: var(--radius-md); padding: 0.85rem 1rem;">
        <strong style="color: var(--text-gold); font-size: 0.88rem;">💰 Sell Gear from ${activeHero.name}'s Pack (50% GP Credit)</strong>
        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.55rem;">
          ${activeHero.inventoryItems.map(inv => {
            const sellVal = Math.max(1, Math.floor((inv.priceGp || 20) / 2));
            return `<button type="button" class="btn btn-sm vendor-sell-btn" data-item-id="${inv.id}" style="font-size: 0.72rem; border-color: #f59e0b; color: #fde047;">Sell ${inv.name} (+${sellVal} GP)</button>`;
          }).join('')}
        </div>
      </div>
    ` : ''}
  `;

  // Buyer selector
  container.querySelector('#vendor-buyer-select')?.addEventListener('change', (e) => {
    worldState.setActiveHero(e.target.value);
    renderVendorView(container);
  });

  // Filter chips
  container.querySelectorAll('.vendor-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      vendorFilterType = btn.getAttribute('data-filter');
      renderVendorView(container);
    });
  });

  // DM Switch Archetype On-The-Fly
  container.querySelectorAll('.dm-vendor-arch-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const archId = btn.getAttribute('data-arch');
      await worldState.setVendorArchetype(archId);
      if (soundEngine.playSfx) soundEngine.playSfx('fanfare');
      renderVendorView(container);
    });
  });

  // DM Apply Fine-Tuned Settings
  container.querySelector('#dm-vendor-apply-btn')?.addEventListener('click', async () => {
    const shopName = container.querySelector('#dm-vendor-shop-name')?.value.trim();
    const merchantName = container.querySelector('#dm-vendor-merch-name')?.value.trim();
    const maxRarity = container.querySelector('#dm-vendor-max-rarity')?.value || 'Rare';
    const priceModifierPct = parseInt(container.querySelector('#dm-vendor-price-mod')?.value || '0', 10);
    await worldState.setVendorArchetype(vendor.archetypeId, {
      shopName,
      merchantName,
      maxRarity,
      includeMagic: maxRarity !== 'Mundane',
      priceModifierPct
    });
    renderVendorView(container);
  });

  // DM Restock
  container.querySelector('#dm-vendor-restock-btn')?.addEventListener('click', async () => {
    await worldState.restockActiveVendor();
    renderVendorView(container);
  });

  // DM Stock Custom Item
  container.querySelector('#dm-vendor-add-custom-btn')?.addEventListener('click', async () => {
    const name = prompt('Item Name to Stock:', 'Elixir of Dragon Breath');
    if (!name) return;
    const priceGp = parseInt(prompt('Base Price (GP):', '250') || '250', 10);
    const isMagic = confirm('Is this a Magic Item?');
    const rarity = isMagic ? (prompt('Rarity (Common / Uncommon / Rare / Very Rare / Legendary):', 'Uncommon') || 'Uncommon') : 'Mundane';
    const notes = prompt('Description / Effect:', 'Breathe a 15ft cone of fire (3d6) once within 1 hour.') || '';
    await worldState.addItemToActiveVendor({ name, priceGp, isMagic, rarity, notes, stock: 1 });
    renderVendorView(container);
  });

  // Buy from Active Vendor
  container.querySelectorAll('.vendor-buy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const buyerId = container.querySelector('#vendor-buyer-select')?.value;
      if (!buyerId) return;
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      const res = await worldState.buyFromActiveVendor(buyerId, idx);
      if (!res.success && res.error) alert(res.error);
      else if (soundEngine.playDiceRoll) soundEngine.playDiceRoll(true);
      renderVendorView(container);
    });
  });

  // DM Remove Item
  container.querySelectorAll('.vendor-remove-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      await worldState.removeItemFromActiveVendor(idx);
      renderVendorView(container);
    });
  });

  // Sell from Pack
  container.querySelectorAll('.vendor-sell-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!activeHero) return;
      const itemId = btn.getAttribute('data-item-id');
      worldState.sellInventoryItem(activeHero.id, itemId, 20);
      if (soundEngine.playDiceRoll) soundEngine.playDiceRoll(false);
      renderVendorView(container);
    });
  });
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
    window.APP_VERSION = '2.1';
    window.renderMapView = renderMapView;
    window.renderCombatView = renderCombatView;
    window.renderCharacterCreateView = renderCharacterCreateView;
    window.renderCompendiumView = renderCompendiumView;
    window.renderVendorView = renderVendorView;
    window.MAGIC_ITEM_COMPENDIUM = MAGIC_ITEM_COMPENDIUM;
    window.MERCHANT_ARCHETYPES = MERCHANT_ARCHETYPES;
    window.openLevelUpModal = openLevelUpModal;
    window.DND_LEVEL_UP_DATA = DND_LEVEL_UP_DATA;
    window.INVENTORY_CATALOG = INVENTORY_CATALOG;
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
      vendors: document.getElementById('view-vendors'),
      compendium: document.getElementById('view-compendium'),
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
        case 'vendors': if (typeof renderVendorView === 'function') renderVendorView(container); break;
        case 'compendium': if (typeof renderCompendiumView === 'function') renderCompendiumView(container); break;
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
      }).join('') + `
        <div class="game-tile-card create-campaign-tile" id="open-create-campaign-tile" style="border-style: dashed; border-color: rgba(212,175,55,0.55); justify-content: center; align-items: center; text-align: center; min-height: 190px;">
          <div style="font-size: 2rem; color: var(--text-gold); margin-bottom: 0.4rem;">＋</div>
          <h4 class="game-tile-title" style="color: var(--text-gold); margin-bottom: 0.35rem;">Create New Campaign</h4>
          <p class="game-tile-desc" style="flex: 0; margin-bottom: 0.75rem;">Launch an isolated D&D 5.5e realm with its own custom password in Supabase.</p>
          <span class="btn btn-sm" style="border-color: var(--accent-gold); color: var(--text-gold);">+ New Realm</span>
        </div>
      `;

      gameTilesGrid.querySelectorAll('.game-tile-card[data-game-id]').forEach(card => {
        card.addEventListener('click', () => {
          const gameId = card.getAttribute('data-game-id');
          openPasswordPrompt(gameId);
        });
      });

      const createTile = gameTilesGrid.querySelector('#open-create-campaign-tile');
      if (createTile) {
        createTile.addEventListener('click', () => {
          const createView = document.getElementById('game-create-view');
          const createErr = document.getElementById('game-create-error');
          if (createErr) createErr.style.display = 'none';
          if (gameTilesView) gameTilesView.style.display = 'none';
          if (gamePasswordView) gamePasswordView.style.display = 'none';
          if (createView) createView.style.display = 'block';
        });
      }
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
      const createView = document.getElementById('game-create-view');
      if (createView) createView.style.display = 'none';
      if (gamePasswordView) gamePasswordView.style.display = 'none';
      if (gameTilesView) gameTilesView.style.display = 'block';
      renderGameTiles();
    }

    const gameCreateForm = document.getElementById('game-create-form');
    const backFromCreateBtn = document.getElementById('back-from-create-btn');
    const cancelCreateCampBtn = document.getElementById('cancel-create-camp-btn');
    if (backFromCreateBtn) backFromCreateBtn.addEventListener('click', showTilesView);
    if (cancelCreateCampBtn) cancelCreateCampBtn.addEventListener('click', showTilesView);
    if (gameCreateForm) {
      gameCreateForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const errBox = document.getElementById('game-create-error');
        const name = (document.getElementById('new-camp-name')?.value || '').trim();
        const shortName = (document.getElementById('new-camp-short')?.value || '').trim();
        const subtitle = (document.getElementById('new-camp-subtitle')?.value || '').trim();
        const description = (document.getElementById('new-camp-desc')?.value || '').trim();
        const password = (document.getElementById('new-camp-password')?.value || '').trim();
        const res = await worldState.createCampaign({ name, shortName, subtitle, description, password });
        if (!res.success) {
          if (errBox) {
            errBox.textContent = res.error || 'Could not create campaign.';
            errBox.style.display = 'block';
          }
          return;
        }
        isGameUnlocked = true;
        worldState.setActiveGame(res.campaign.id);
        updateHeaderGameName();
        gameCreateForm.reset();
        if (gameSelectModal) {
          gameSelectModal.classList.remove('active');
          if (closeGameSelectBtn) closeGameSelectBtn.style.display = 'inline-block';
        }
      });
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

    // Online Player Presence Pill
    const presenceBadge = document.getElementById('online-presence-indicator');
    worldState.subscribePresence((online) => {
      if (!presenceBadge) return;
      if (online && online.length > 0) {
        presenceBadge.style.display = 'inline-flex';
        presenceBadge.textContent = `🟢 ${online.length} Online`;
        presenceBadge.title = 'Online now: ' + online.map(p => `${p.name} (${p.role})`).join(', ');
      } else {
        presenceBadge.style.display = 'none';
      }
    });

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

