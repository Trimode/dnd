/**
 * D&D 5.5e Magic Item Compendium & Dynamic Merchant Archetype Catalogs (v2.1)
 */

export const MERCHANT_ARCHETYPES = [
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

export const MUNDANE_VENDOR_CATALOG = [
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

export const MAGIC_ITEM_COMPENDIUM = [
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
