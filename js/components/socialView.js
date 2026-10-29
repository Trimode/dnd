/**
 * Social Lounge & Downtime View Component
 * Handles non-combat roleplay, live synchronized dice roll logging,
 * and DM-pushed saving throw / skill check requests.
 */
import { worldState } from '../state/worldState.js';
import { soundEngine } from '../audio/soundEngine.js';

let activeFilter = 'all'; // 'all' | 'save' | 'check' | 'attack' | 'dice_roller'
let activeAdvMode = 'normal'; // 'normal' | 'adv' | 'dis'

export function renderSocialView(container) {
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
