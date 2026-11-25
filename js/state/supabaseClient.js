/**
 * Supabase Database & Realtime Sync Client for The Bleeding Realms of Aetheria
 * Handles Postgres persistence (Hybrid Relational + JSONB), Campaign Password RPC,
 * Auto-seeding on first launch, and Supabase Realtime multiplayer sync.
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

  async fetchCampaigns() {
    if (!this.isAvailable()) return null;
    const { data, error } = await this.client
      .from('campaigns')
      .select('id, name, short_name, subtitle, description, status, tag, system, regions_count, party_settings, social_scene, metadata')
      .order('created_at', { ascending: true });

    if (error) {
      console.warn('[Supabase] fetchCampaigns error:', error.message);
      return null;
    }

    // Count party characters per campaign
    const { data: charRows } = await this.client
      .from('party_characters')
      .select('campaign_id');

    const countByCampaign = {};
    (charRows || []).forEach(r => {
      countByCampaign[r.campaign_id] = (countByCampaign[r.campaign_id] || 0) + 1;
    });

    return (data || []).map(row => ({
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

    // First-time launch for 'demo': seed the database from INITIAL_WORLD_DATA
    if (loreRows.length === 0 && charRows.length === 0 && fallbackSeedData) {
      console.info(`[Supabase] Campaign '${campaignId}' is empty — seeding initial world data into Supabase...`);
      await this.syncCampaignData(campaignId, fallbackSeedData);
      return JSON.parse(JSON.stringify(fallbackSeedData));
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

    return hydrated;
  }

  scheduleSync(campaignId, worldData, onStatusChange = null) {
    if (!this.isAvailable()) return;
    if (this.syncTimer) clearTimeout(this.syncTimer);
    if (onStatusChange) onStatusChange('syncing');

    this.syncTimer = setTimeout(async () => {
      try {
        await this.syncCampaignData(campaignId, worldData);
        if (onStatusChange) onStatusChange('live');
      } catch (err) {
        console.warn('[Supabase] Background sync failed:', err);
        if (onStatusChange) onStatusChange('error');
      }
    }, 350);
  }

  async syncCampaignData(campaignId, worldData) {
    if (!this.isAvailable() || !worldData) return false;
    this.isSyncing = true;
    this.lastLocalWriteAt = Date.now();

    try {
      // 1. Update campaign metadata / settings / socialScene
      await this.client
        .from('campaigns')
        .update({
          party_settings: worldData.partySettings || {},
          social_scene: worldData.socialScene || {},
          metadata: worldData.metadata || {},
          regions_count: Array.isArray(worldData.regions) ? worldData.regions.length : 0,
          updated_at: new Date().toISOString()
        })
        .eq('id', campaignId);

      // 2. Sync Player Accounts (must precede party_characters due to owner_user_id FK)
      const users = (worldData.users || []).map(u => this.mapUserToDb(u, campaignId));
      if (users.length > 0) {
        await this.client.from('player_accounts').upsert(users, { onConflict: 'id' });
      }

      // 3. Sync Party Characters (upsert + prune deleted)
      const validUserIds = new Set(users.map(u => u.id));
      const chars = (worldData.partyCharacters || []).map(c => {
        const mapped = this.mapCharacterToDb(c, campaignId);
        if (mapped.owner_user_id && !validUserIds.has(mapped.owner_user_id)) {
          mapped.owner_user_id = null;
        }
        return mapped;
      });
      if (chars.length > 0) {
        await this.client.from('party_characters').upsert(chars, { onConflict: 'id' });
      }
      const { data: existingChars } = await this.client
        .from('party_characters')
        .select('id')
        .eq('campaign_id', campaignId);
      const keepCharIds = new Set(chars.map(c => c.id));
      const deleteCharIds = (existingChars || []).map(r => r.id).filter(id => !keepCharIds.has(id));
      if (deleteCharIds.length > 0) {
        await this.client.from('party_characters').delete().in('id', deleteCharIds);
      }

      // 4. Sync Journal Entries
      const journals = (worldData.journalEntries || []).map(j => this.mapJournalToDb(j, campaignId));
      if (journals.length > 0) {
        await this.client.from('journal_entries').upsert(journals, { onConflict: 'id' });
      }
      const { data: existingJournals } = await this.client
        .from('journal_entries')
        .select('id')
        .eq('campaign_id', campaignId);
      const keepJournalIds = new Set(journals.map(j => j.id));
      const deleteJournalIds = (existingJournals || []).map(r => r.id).filter(id => !keepJournalIds.has(id));
      if (deleteJournalIds.length > 0) {
        await this.client.from('journal_entries').delete().in('id', deleteJournalIds);
      }

      // 5. Sync Social Messages
      const messages = (worldData.socialMessages || []).map(m => this.mapMessageToDb(m, campaignId));
      if (messages.length > 0) {
        await this.client.from('social_messages').upsert(messages, { onConflict: 'id' });
      }

      // 6. Sync Dice Roll Logs
      const rolls = (worldData.diceRollLogs || []).map(r => this.mapRollToDb(r, campaignId));
      if (rolls.length > 0) {
        await this.client.from('dice_roll_logs').upsert(rolls, { onConflict: 'id' });
      } else {
        await this.client.from('dice_roll_logs').delete().eq('campaign_id', campaignId);
      }

      // 7. Sync Pending Roll Requests
      const reqs = (worldData.pendingRollRequests || []).map(r => this.mapRequestToDb(r, campaignId));
      if (reqs.length > 0) {
        await this.client.from('pending_roll_requests').upsert(reqs, { onConflict: 'id' });
      }
      const { data: existingReqs } = await this.client
        .from('pending_roll_requests')
        .select('id')
        .eq('campaign_id', campaignId);
      const keepReqIds = new Set(reqs.map(r => r.id));
      const deleteReqIds = (existingReqs || []).map(r => r.id).filter(id => !keepReqIds.has(id));
      if (deleteReqIds.length > 0) {
        await this.client.from('pending_roll_requests').delete().in('id', deleteReqIds);
      }

      // 8. Sync Hybrid JSONB Lore Categories
      const loreRows = LORE_CATEGORIES
        .filter(cat => worldData[cat] !== undefined)
        .map(cat => ({
          campaign_id: campaignId,
          category: cat,
          payload: worldData[cat],
          updated_at: new Date().toISOString()
        }));
      if (loreRows.length > 0) {
        await this.client.from('campaign_lore').upsert(loreRows, { onConflict: 'campaign_id,category' });
      }

      // 9. Sync Combat Session if present
      if (worldData.combatState) {
        await this.client.from('combat_sessions').upsert({
          campaign_id: campaignId,
          state: worldData.combatState,
          updated_at: new Date().toISOString()
        }, { onConflict: 'campaign_id' });
      }

      return true;
    } finally {
      this.isSyncing = false;
      this.lastLocalWriteAt = Date.now();
    }
  }

  subscribeRealtime(campaignId, onRemoteUpdate, onStatusChange = null) {
    if (!this.isAvailable()) return;

    if (this.realtimeChannel) {
      try {
        this.client.removeChannel(this.realtimeChannel);
      } catch (_) {}
      this.realtimeChannel = null;
    }

    this.activeCampaignId = campaignId;

    const handleChange = () => {
      // Ignore echo events triggered by our own local write within the last 1.2s
      if (this.isSyncing || (Date.now() - this.lastLocalWriteAt < 1200)) return;
      if (onRemoteUpdate) onRemoteUpdate();
    };

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
        handleChange
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
