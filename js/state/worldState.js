/**
 * World State Management with Supabase Cloud Persistence, Realtime Sync & Local Cache
 */
import { INITIAL_WORLD_DATA } from '../data/worldData.js';
import { supabaseDb } from './supabaseClient.js';

const STORAGE_KEY = 'dnd_bleeding_realms_data_v1';
const PREFS_KEY = 'dnd_bleeding_realms_prefs_v1';

class WorldStateManager {
  constructor() {
    this.version = '1.2';
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

export const worldState = new WorldStateManager();

