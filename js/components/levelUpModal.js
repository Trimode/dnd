/**
 * D&D 5.5e Character Level-Up Wizard Modal
 * Supports HP rolling / fixed average / manual roll, class features by level,
 * subclass selection, Ability Score Improvements (ASI), 5.5e Feats & Epic Boons,
 * new Spells & Spell Slot progression, Weapon Masteries, and Supabase cloud persistence.
 */
import { worldState } from '../state/worldState.js';
import { soundEngine } from '../audio/soundEngine.js';

export const DND_LEVEL_UP_DATA = {
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

export function openLevelUpModal(charId, onComplete = null) {
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
