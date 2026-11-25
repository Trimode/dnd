/**
 * Character Creation Screen for D&D 5.5e
 * Standard Array, Point Buy (27 pts), 4d6 Drop Lowest, and Custom / Manual Stat Input
 * Saves character directly to active player account and party roster for immediate gameplay.
 */
import { worldState } from '../state/worldState.js';
import { soundEngine } from '../audio/soundEngine.js';

export function renderCharacterCreateView(container) {
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
