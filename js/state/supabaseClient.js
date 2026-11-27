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

export const supabaseDb = new SupabaseCampaignService();
