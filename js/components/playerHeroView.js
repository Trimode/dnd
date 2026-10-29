/**
 * Player Hero Console & Daily Campaign Journal Component for D&D 5.5e
 * Features Account Ownership Access Control, DM Active Session Monitor,
 * Interactive Character Sheet, Current World Location Radar, and Daily Notes by Days with Titles
 */
import { worldState } from '../state/worldState.js';
import { soundEngine } from '../utils/soundEngine.js';

export function renderHeroView(container) {
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
      const partyTab = document.querySelector('.nav-tab-btn[data-tab="party"]');
      if (partyTab) partyTab.click();
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
        <div class="hero-avatar-large">${activeHero.avatar || 'PC'}</div>
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
            <h2 style="margin: 0; font-size: 1.6rem; color: var(--text-gold);">${activeHero.name}</h2>
            <span class="meta-badge">${activeHero.alignment || 'Neutral'}</span>
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
        <button class="btn btn-sm" id="btn-hero-short-rest" title="Take Short Rest">Short Rest</button>
        <button class="btn btn-sm btn-primary" id="btn-hero-long-rest" title="Take Long Rest">Long Rest</button>
        <button class="btn btn-sm" id="btn-hero-view-map" title="View Current Location on World Map">Map</button>
      </div>
    </div>

    <!-- Live Dice Check Result Banner -->
    <div id="hero-dice-result-banner" style="display: none; margin-bottom: 1rem;" class="bastion-turn-log"></div>

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
      activeHero.conditions = [];
      worldState.saveData();
      soundEngine.playDiceRoll(true);
      alert(`Long Rest completed! ${activeHero.name} fully restored HP, cleared conditions, and refilled class resources.`);
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
