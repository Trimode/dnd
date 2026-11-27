/**
 * World State Management with Supabase Cloud Persistence, Realtime Sync & Local Cache
 */
import { INITIAL_WORLD_DATA } from '../data/worldData.js';
import { supabaseDb } from './supabaseClient.js';

const STORAGE_KEY = 'dnd_bleeding_realms_data_v1';
const PREFS_KEY = 'dnd_bleeding_realms_prefs_v1';

class WorldStateManager {
  constructor() {
    this.version = '2.2';
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

export const worldState = new WorldStateManager();

