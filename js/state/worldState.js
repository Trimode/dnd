/**
 * World State Management with Supabase Cloud Persistence, Realtime Sync & Local Cache
 */
import { INITIAL_WORLD_DATA } from '../data/worldData.js';
import { supabaseDb } from './supabaseClient.js';

const STORAGE_KEY = 'dnd_bleeding_realms_data_v1';
const PREFS_KEY = 'dnd_bleeding_realms_prefs_v1';

class WorldStateManager {
  constructor() {
    this.version = '1.7';
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
      const [cloudData, remotePresets, remoteMonsters, remoteChests, remoteRecaps, remoteHandouts] = await Promise.all([
        supabaseDb.loadCampaignData(targetId, seedData),
        supabaseDb.fetchEncounterPresets(targetId),
        supabaseDb.fetchCustomMonsters(targetId),
        supabaseDb.fetchLootChests(targetId),
        supabaseDb.fetchSessionRecaps(targetId),
        supabaseDb.fetchCampaignHandouts(targetId)
      ]);
      if (cloudData) {
        this.data = cloudData;
        if (Array.isArray(remotePresets)) this.data.encounterPresets = remotePresets;
        if (Array.isArray(remoteMonsters)) this.data.customMonsters = remoteMonsters;
        if (Array.isArray(remoteChests)) this.data.lootChests = remoteChests;
        if (Array.isArray(remoteRecaps)) this.data.sessionRecaps = remoteRecaps;
        if (Array.isArray(remoteHandouts)) this.data.campaignHandouts = remoteHandouts;
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

