/**
 * Party Status Monitor & Player Character Creation / Upload System for D&D 5.5e
 * Features Live Vitals HUD, World Entry Point Integration, and DM Confidential Command View
 */
import { worldState } from '../state/worldState.js';
import { soundEngine } from '../audio/soundEngine.js';

export function renderPartyView(container) {
  const { data, prefs } = worldState;
  const characters = data.partyCharacters || [];
  const settings = data.partySettings || { partyName: 'The Bleedland Wayfarers', partyGold: 340, partyLevel: 5, sharedBag: 'Bag of Holding' };

  // Calculate average party stats
  const avgLevel = characters.length > 0 ? (characters.reduce((sum, c) => sum + (c.level || 1), 0) / characters.length).toFixed(1) : 1;
  const totalHpCurrent = characters.reduce((sum, c) => sum + (c.hpCurrent || 0), 0);
  const totalHpMax = characters.reduce((sum, c) => sum + (c.hpMax || 1), 0);
  const partyHpPercent = totalHpMax > 0 ? Math.round((totalHpCurrent / totalHpMax) * 100) : 100;

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h2>Party Status Monitor & Character Roster</h2>
        <div class="view-tagline">Real-time Vitals HUD, World Entry Points, 5.5e Masteries, Inventory & DM Secret Hooks</div>
      </div>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <button class="btn btn-primary" id="open-char-wizard-btn">+ Create / Upload Character</button>
        <button class="btn" id="import-char-json-btn">Import JSON</button>
        <button class="btn" id="export-party-json-btn">Export Party</button>
      </div>
        <button class="btn btn-sm" id="btn-long-rest" style="background: rgba(76, 175, 80, 0.2); border-color: #4caf50; color: #a5d6a7;" title="Full HP & Resource Reset">
          Long Rest (Reset All)
        </button>
      </div>
    </div>

    <!-- Shared Bag of Holding / Party Stash Accordion -->
    <details style="margin-bottom: 1.5rem; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0.75rem 1rem;">
      <summary style="cursor: pointer; font-weight: bold; color: var(--text-gold); font-size: 0.9rem;">
        Shared Bag of Holding & Communal Equipment (Click to expand)
      </summary>
      <div style="margin-top: 0.6rem; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">
        ${settings.sharedBag || 'Empty bag of holding.'}
      </div>
    </details>

    <!-- Character Cards Grid -->
    <div class="party-grid" id="party-characters-grid"></div>

    <!-- Character Creation / Upload Wizard Modal -->
    <div class="modal-overlay" id="char-wizard-modal">
      <div class="modal-card" style="max-width: 720px; max-height: 90vh; display: flex; flex-direction: column;">
        <div class="modal-header">
          <h3 style="color: var(--text-gold); display: flex; align-items: center; gap: 0.5rem;">
            Player Character Builder & World Entry System
          </h3>
          <button class="close-btn" id="close-char-wizard-btn">&times;</button>
        </div>
        <div class="modal-body" style="overflow-y: auto; padding: 1.25rem;">
          <form id="char-builder-form" style="display: flex; flex-direction: column; gap: 1rem;">
            
            <!-- Basic Info Row -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.85rem;">
              <div class="editor-form-group">
                <label class="editor-label">Character Name *</label>
                <input type="text" id="wiz-name" class="editor-input" required placeholder="e.g. Torvin Iron-Hand">
              </div>
              <div class="editor-form-group">
                <label class="editor-label">Player Name</label>
                <input type="text" id="wiz-player" class="editor-input" placeholder="e.g. Sarah">
              </div>
              <div class="editor-form-group">
                <label class="editor-label">Avatar Emoji / Symbol</label>
                <input type="text" id="wiz-avatar" class="editor-input" value="" style="text-align: center;">
              </div>
            </div>

            <!-- Class, Species, Level, Alignment -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 0.85rem;">
              <div class="editor-form-group">
                <label class="editor-label">Species / Lineage *</label>
                <input type="text" id="wiz-species" class="editor-input" required placeholder="e.g. Goliath, Sun Elf, Human">
              </div>
              <div class="editor-form-group">
                <label class="editor-label">Class & Subclass (5.5e) *</label>
                <input type="text" id="wiz-class" class="editor-input" required placeholder="e.g. Barbarian (Berserker)">
              </div>
              <div class="editor-form-group">
                <label class="editor-label">Level</label>
                <input type="number" id="wiz-level" class="editor-input" value="5" min="1" max="20">
              </div>
              <div class="editor-form-group">
                <label class="editor-label">Alignment</label>
                <select id="wiz-alignment" class="editor-input">
                  <option value="Lawful Good">Lawful Good (Crusader)</option>
                  <option value="Neutral Good" selected>Neutral Good (Benefactor)</option>
                  <option value="Chaotic Good">Chaotic Good (Rebel)</option>
                  <option value="Lawful Neutral">Lawful Neutral (Judge)</option>
                  <option value="True Neutral">True Neutral (Arbiter)</option>
                  <option value="Chaotic Neutral">Chaotic Neutral (Free Spirit)</option>
                  <option value="Lawful Evil">Lawful Evil (Dominator)</option>
                  <option value="Neutral Evil">Neutral Evil (Malefactor)</option>
                  <option value="Chaotic Evil">Chaotic Evil (Destroyer)</option>
                  <option value="Unaligned">Unaligned / Primal Beast</option>
                </select>
              </div>
            </div>

            <!-- Vitals: HP, AC, Speed -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 0.85rem;">
              <div class="editor-form-group">
                <label class="editor-label">Max HP *</label>
                <input type="number" id="wiz-hp" class="editor-input" required value="45" min="1">
              </div>
              <div class="editor-form-group">
                <label class="editor-label">Armor Class (AC) *</label>
                <input type="number" id="wiz-ac" class="editor-input" required value="16" min="1">
              </div>
              <div class="editor-form-group">
                <label class="editor-label">Speed</label>
                <input type="text" id="wiz-speed" class="editor-input" value="30 ft">
              </div>
              <div class="editor-form-group">
                <label class="editor-label">Initiative Mod</label>
                <input type="text" id="wiz-init" class="editor-input" value="+2">
              </div>
            </div>

            <!-- Enhanced Ability Scores (STR, DEX, CON, INT, WIS, CHA) with 4d6 Drop Lowest Rolling -->
            <div style="background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem; flex-wrap: wrap; gap: 0.5rem;">
                <label class="editor-label" style="margin-bottom: 0; font-size: 0.95rem;">
                  Core Ability Scores (Manual or Roll 4d6 Drop Lowest)
                </label>
                <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
                  <button type="button" class="btn btn-sm" id="roll-all-stats-btn" style="background: rgba(212, 175, 55, 0.2); border-color: var(--text-gold); color: var(--text-gold);">
                    Roll All 6 Stats (4d6 Drop Lowest)
                  </button>
                  <button type="button" class="btn btn-sm" id="standard-array-btn" title="Set standard array: 15, 14, 13, 12, 10, 8">
                    Standard Array
                  </button>
                </div>
              </div>

              <!-- Live Dice Roll Breakdown Log -->
              <div id="stat-dice-roll-log" style="display: none; font-family: var(--font-mono); font-size: 0.8rem; background: rgba(0,0,0,0.5); border: 1px solid var(--border-strong); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); margin-bottom: 0.75rem; color: #a5d6a7;"></div>

              <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 0.5rem;">
                <!-- STR -->
                <div class="score-input-box" style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.5rem 0.25rem; text-align: center; display: flex; flex-direction: column; gap: 0.25rem;">
                  <span style="font-weight: bold; color: var(--text-gold); font-size: 0.85rem;">STR</span>
                  <input type="number" id="wiz-str" class="editor-input wiz-stat-input" value="16" min="1" max="30" style="text-align: center; font-weight: bold; font-size: 1.1rem; padding: 0.25rem 0;">
                  <span id="wiz-str-mod" style="font-size: 0.75rem; color: #81c784; font-weight: bold;">+3</span>
                  <button type="button" class="quick-hp-btn roll-single-stat-btn" data-stat="str" title="Roll 4d6 drop lowest for STR">Roll</button>
                </div>
                <!-- DEX -->
                <div class="score-input-box" style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.5rem 0.25rem; text-align: center; display: flex; flex-direction: column; gap: 0.25rem;">
                  <span style="font-weight: bold; color: var(--text-gold); font-size: 0.85rem;">DEX</span>
                  <input type="number" id="wiz-dex" class="editor-input wiz-stat-input" value="14" min="1" max="30" style="text-align: center; font-weight: bold; font-size: 1.1rem; padding: 0.25rem 0;">
                  <span id="wiz-dex-mod" style="font-size: 0.75rem; color: #81c784; font-weight: bold;">+2</span>
                  <button type="button" class="quick-hp-btn roll-single-stat-btn" data-stat="dex" title="Roll 4d6 drop lowest for DEX">Roll</button>
                </div>
                <!-- CON -->
                <div class="score-input-box" style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.5rem 0.25rem; text-align: center; display: flex; flex-direction: column; gap: 0.25rem;">
                  <span style="font-weight: bold; color: var(--text-gold); font-size: 0.85rem;">CON</span>
                  <input type="number" id="wiz-con" class="editor-input wiz-stat-input" value="14" min="1" max="30" style="text-align: center; font-weight: bold; font-size: 1.1rem; padding: 0.25rem 0;">
                  <span id="wiz-con-mod" style="font-size: 0.75rem; color: #81c784; font-weight: bold;">+2</span>
                  <button type="button" class="quick-hp-btn roll-single-stat-btn" data-stat="con" title="Roll 4d6 drop lowest for CON">Roll</button>
                </div>
                <!-- INT -->
                <div class="score-input-box" style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.5rem 0.25rem; text-align: center; display: flex; flex-direction: column; gap: 0.25rem;">
                  <span style="font-weight: bold; color: var(--text-gold); font-size: 0.85rem;">INT</span>
                  <input type="number" id="wiz-int" class="editor-input wiz-stat-input" value="10" min="1" max="30" style="text-align: center; font-weight: bold; font-size: 1.1rem; padding: 0.25rem 0;">
                  <span id="wiz-int-mod" style="font-size: 0.75rem; color: var(--text-muted);">+0</span>
                  <button type="button" class="quick-hp-btn roll-single-stat-btn" data-stat="int" title="Roll 4d6 drop lowest for INT">Roll</button>
                </div>
                <!-- WIS -->
                <div class="score-input-box" style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.5rem 0.25rem; text-align: center; display: flex; flex-direction: column; gap: 0.25rem;">
                  <span style="font-weight: bold; color: var(--text-gold); font-size: 0.85rem;">WIS</span>
                  <input type="number" id="wiz-wis" class="editor-input wiz-stat-input" value="12" min="1" max="30" style="text-align: center; font-weight: bold; font-size: 1.1rem; padding: 0.25rem 0;">
                  <span id="wiz-wis-mod" style="font-size: 0.75rem; color: #81c784; font-weight: bold;">+1</span>
                  <button type="button" class="quick-hp-btn roll-single-stat-btn" data-stat="wis" title="Roll 4d6 drop lowest for WIS">Roll</button>
                </div>
                <!-- CHA -->
                <div class="score-input-box" style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.5rem 0.25rem; text-align: center; display: flex; flex-direction: column; gap: 0.25rem;">
                  <span style="font-weight: bold; color: var(--text-gold); font-size: 0.85rem;">CHA</span>
                  <input type="number" id="wiz-cha" class="editor-input wiz-stat-input" value="10" min="1" max="30" style="text-align: center; font-weight: bold; font-size: 1.1rem; padding: 0.25rem 0;">
                  <span id="wiz-cha-mod" style="font-size: 0.75rem; color: var(--text-muted);">+0</span>
                  <button type="button" class="quick-hp-btn roll-single-stat-btn" data-stat="cha" title="Roll 4d6 drop lowest for CHA">Roll</button>
                </div>
              </div>
            </div>

            <!-- 5.5e Weapon Masteries -->
            <div class="editor-form-group">
              <label class="editor-label">5.5e Weapon Masteries (Comma-separated)</label>
              <input type="text" id="wiz-masteries" class="editor-input" placeholder="e.g. Cleave (Greataxe), Push (Heavy Shield), Topple (Warhammer)">
            </div>

            <!-- WORLD ENTRY POINT SECTION -->
            <div style="background: rgba(212, 175, 55, 0.08); border: 1px solid var(--border-strong); border-radius: var(--radius-md); padding: 0.85rem;">
              <label class="editor-label" style="color: var(--text-gold); font-size: 0.95rem; margin-bottom: 0.5rem; display: block;">
                World Entry Point & Bleeding Frontier Origin
              </label>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; margin-bottom: 0.6rem;">
                <div>
                  <label style="font-size: 0.75rem; color: var(--text-muted);">Starting Region / Domain</label>
                  <select id="wiz-entry-region" class="editor-input" style="width: 100%;">
                    ${data.regions.map(r => `<option value="${r.id}" data-name="${r.name}">${r.name} (${r.domain})</option>`).join('')}
                  </select>
                </div>
                <div>
                  <label style="font-size: 0.75rem; color: var(--text-muted);">Specific Landmark / Frontier Post</label>
                  <input type="text" id="wiz-entry-location" class="editor-input" placeholder="e.g. Slagfield Outpost, Mist Spire Steps">
                </div>
              </div>
              <div class="editor-form-group">
                <label style="font-size: 0.75rem; color: var(--text-muted);">Entry Circumstances / How did the character arrive?</label>
                <textarea id="wiz-entry-story" class="editor-textarea" style="min-height: 60px;" placeholder="e.g. Arrived on a trade skiff through the acoustic clouds; fled an inquisitor crusade across the sands..."></textarea>
              </div>
            </div>

            <!-- Roleplay Dossier: Backstory, Traits, Inventory -->
            <div class="editor-form-group">
              <label class="editor-label">Public Backstory Summary</label>
              <textarea id="wiz-backstory" class="editor-textarea" style="min-height: 70px;" placeholder="Brief backstory that companion players know..."></textarea>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem;">
              <div class="editor-form-group">
                <label class="editor-label">Personality Traits & Ideals</label>
                <textarea id="wiz-traits" class="editor-textarea" style="min-height: 60px;" placeholder="Traits, Ideals, Bonds & Flaws..."></textarea>
              </div>
              <div class="editor-form-group">
                <label class="editor-label">Equipment, Weapons & Currency</label>
                <textarea id="wiz-inventory" class="editor-textarea" style="min-height: 60px;" placeholder="e.g. +1 Longsword, Studded Leather, Healer's Kit, 50 GP..."></textarea>
              </div>
            </div>

            <!-- DM SECRET PLOT HOOK (Only visible to DM) -->
            <div style="background: rgba(244, 67, 54, 0.08); border: 1px dashed rgba(244, 67, 54, 0.4); border-radius: var(--radius-md); padding: 0.85rem;">
              <label class="editor-label" style="color: #ff7961;">
                Confidential DM Secrets & Plot Hooks (Hidden from other players)
              </label>
              <textarea id="wiz-dmsecrets" class="editor-textarea" style="min-height: 60px; border-color: rgba(244, 67, 54, 0.3);" placeholder="Secret heritage, hidden curse, undercover allegiance, or DM opening hook..."></textarea>
            </div>

            <div class="modal-footer" style="padding: 0; margin-top: 0.5rem;">
              <button type="button" class="btn" id="cancel-wiz-btn">Cancel</button>
              <button type="submit" class="btn btn-primary">Save Character to Roster</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  const gridContainer = container.querySelector('#party-characters-grid');
  const wizardModal = container.querySelector('#char-wizard-modal');
  const openWizBtn = container.querySelector('#open-char-wizard-btn');
  const closeWizBtn = container.querySelector('#close-char-wizard-btn');
  const cancelWizBtn = container.querySelector('#cancel-wiz-btn');
  const wizForm = container.querySelector('#char-builder-form');
  const importJsonBtn = container.querySelector('#import-char-json-btn');
  const exportPartyBtn = container.querySelector('#export-party-json-btn');
  const goldAddBtn = container.querySelector('#party-gold-add');
  const goldSubBtn = container.querySelector('#party-gold-sub');
  const shortRestBtn = container.querySelector('#btn-short-rest');
  const longRestBtn = container.querySelector('#btn-long-rest');

  // Render all active party cards
  function renderPartyCards() {
    if (!characters || characters.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--bg-card); border: 1px dashed var(--border-subtle); border-radius: var(--radius-lg);">
          <div style="font-size: 3rem; margin-bottom: 0.5rem;"></div>
          <h3 style="color: var(--text-gold);">No Adventurers in the Party Yet</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 0.25rem;">
            Click <strong>"+ Create / Upload Character"</strong> above to create your hero or import a character JSON sheet!
          </p>
        </div>
      `;
      return;
    }

    gridContainer.innerHTML = characters.map(char => {
      const curHp = char.hpCurrent !== undefined ? char.hpCurrent : char.hpMax;
      const maxHp = char.hpMax || 1;
      const hpRatio = maxHp > 0 ? (curHp / maxHp) : 1;
      let hpFillClass = '';
      if (hpRatio <= 0.25) hpFillClass = 'critical';
      else if (hpRatio <= 0.5) hpFillClass = 'danger';

      const commonConditions = ['Advantage', 'Blessed', 'Poisoned', 'Restrained', 'Stunned', 'Unconscious', 'Exhaustion'];
      const activeConds = char.conditions || [];

      function getMod(val) {
        const mod = Math.floor(((val || 10) - 10) / 2);
        return mod >= 0 ? '+' + mod : '' + mod;
      }

        const owner = (data.users || []).find(u => u.claimedCharId === char.id || (char.playerName && u.displayName.toLowerCase() === char.playerName.toLowerCase()));
        const activeUser = worldState.getActiveUser();
        const isMyHero = activeUser && (activeUser.claimedCharId === char.id || owner?.id === activeUser.id);
        const isDm = !!worldState.prefs.dmMode;
        const canControlThis = worldState.canControlCharacter(char.id, char);

        return `
          <div class="party-char-card" data-char-id="${char.id}">
            <!-- Header -->
            <div class="char-hud-header">
              <div class="char-avatar-box">${char.avatar || 'PC'}</div>
              <div class="char-title-block">
                <h3>${char.name}</h3>
                <div class="char-subtag">
                  ${char.species} • ${char.classRole} (Lvl ${char.level || 1}) 
                  ${owner ? `• <span style="color: #a5d6a7;"><em>${owner.displayName}</em></span>` : `• <span style="color: #ffe082;"><em>Unclaimed</em></span>`}
                </div>
              </div>
              <span class="meta-badge">${char.alignment || 'Neutral'}</span>
            </div>

            <!-- Live HP Gauge Bar -->
            <div class="hp-bar-container">
              <div class="hp-bar-labels">
                <span><strong>HP:</strong> ${curHp} / ${maxHp} ${char.tempHp > 0 ? `<span style="color: #42a5f5;">(+${char.tempHp} Temp)</span>` : ''}</span>
                <div class="quick-hp-controls">
                  ${canControlThis ? `
                    <button class="quick-hp-btn hp-adj-btn" data-id="${char.id}" data-delta="-5">−5</button>
                    <button class="quick-hp-btn hp-adj-btn" data-id="${char.id}" data-delta="-1">−1</button>
                    <button class="quick-hp-btn hp-adj-btn" data-id="${char.id}" data-delta="1">+1</button>
                    <button class="quick-hp-btn hp-adj-btn" data-id="${char.id}" data-delta="5">+5</button>
                    <button class="quick-hp-btn hp-temp-btn" data-id="${char.id}" title="Add 5 Temp HP">+5 Temp</button>
                  ` : `
                    <span style="font-size: 0.68rem; color: var(--text-muted);">🔒 Read-Only</span>
                  `}
                </div>
              </div>
              <div class="hp-bar-track">
                <div class="hp-bar-fill ${hpFillClass}" style="width: ${Math.min(100, Math.max(0, Math.round(hpRatio * 100)))}%;"></div>
              </div>
            </div>

            <!-- Core Defense & Mobility Row -->
            <div class="char-core-stats-row">
              <div class="core-stat-item">
                <div class="stat-num">${char.ac || 15}</div>
                <div class="stat-lbl">AC</div>
              </div>
              <div class="core-stat-item">
                <div class="stat-num">${char.initiativeMod || '+0'}</div>
                <div class="stat-lbl">INITIATIVE</div>
              </div>
              <div class="core-stat-item">
                <div class="stat-num">${char.speed || '30 ft'}</div>
                <div class="stat-lbl">SPEED</div>
              </div>
              <div class="core-stat-item">
                <div class="stat-num">${char.passivePerception || 10}</div>
                <div class="stat-lbl">PASSIVE PERC</div>
              </div>
            </div>

            <!-- Ability Scores Row -->
            <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 0.25rem; text-align: center; font-size: 0.75rem; background: var(--bg-tertiary); padding: 0.35rem; border-radius: var(--radius-sm);">
              <div><strong style="color: var(--text-gold);">STR</strong><br>${char.stats?.str || 10} (${getMod(char.stats?.str)})</div>
              <div><strong style="color: var(--text-gold);">DEX</strong><br>${char.stats?.dex || 10} (${getMod(char.stats?.dex)})</div>
              <div><strong style="color: var(--text-gold);">CON</strong><br>${char.stats?.con || 10} (${getMod(char.stats?.con)})</div>
              <div><strong style="color: var(--text-gold);">INT</strong><br>${char.stats?.int || 10} (${getMod(char.stats?.int)})</div>
              <div><strong style="color: var(--text-gold);">WIS</strong><br>${char.stats?.wis || 10} (${getMod(char.stats?.wis)})</div>
              <div><strong style="color: var(--text-gold);">CHA</strong><br>${char.stats?.cha || 10} (${getMod(char.stats?.cha)})</div>
            </div>

            <!-- 5.5e Weapon Masteries -->
            ${char.weaponMasteries && char.weaponMasteries.length > 0 ? `
              <div>
                <div style="font-size: 0.75rem; font-weight: bold; color: var(--text-gold); margin-bottom: 0.25rem;">
                  5.5e WEAPON MASTERIES
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 0.3rem;">
                  ${char.weaponMasteries.map(m => `<span class="mastery-badge">${m}</span>`).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Class Resource Tracker -->
            ${char.classResources ? `
              <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.25); padding: 0.4rem 0.6rem; border-radius: var(--radius-sm); font-size: 0.8rem;">
                <span><strong>${char.classResources.label || 'Resources'}:</strong></span>
                <div style="display: flex; align-items: center; gap: 0.4rem;">
                  ${canControlThis ? `<button class="quick-hp-btn res-adj-btn" data-id="${char.id}" data-delta="-1">−</button>` : ''}
                  <span style="font-weight: bold; color: var(--text-gold);">${char.classResources.current || 0} / ${char.classResources.max || 1}</span>
                  ${canControlThis ? `<button class="quick-hp-btn res-adj-btn" data-id="${char.id}" data-delta="1">+</button>` : ''}
                </div>
              </div>
            ` : ''}

            <!-- Status Conditions Toggle Row -->
            <div>
              <div style="font-size: 0.75rem; font-weight: bold; color: var(--text-muted); margin-bottom: 0.25rem;">
                CONDITIONS & STATUS:
              </div>
              <div class="conditions-pills-row">
                ${commonConditions.map(cond => `
                  <span class="condition-pill ${activeConds.includes(cond) ? 'active' : ''}" data-char-id="${char.id}" data-condition="${cond}" style="${!canControlThis ? 'cursor: default; opacity: 0.7;' : ''}">
                    ${cond}
                  </span>
                `).join('')}
              </div>
            </div>

            <!-- WORLD ENTRY POINT INTEGRATION -->
            ${char.entryPoint ? `
              <div style="border-top: 1px dashed var(--border-subtle); padding-top: 0.6rem;">
                <div style="font-size: 0.75rem; font-weight: bold; color: var(--text-gold); margin-bottom: 0.25rem;">
                  WORLD ENTRY POINT:
                </div>
                <div class="entry-point-pill jump-to-entry" data-region-id="${char.entryPoint.regionId || 'region-crucible'}">
                  <span>${char.entryPoint.regionName || 'Crucible City'}</span>
                  ${char.entryPoint.locationName ? `<span style="opacity: 0.8;">• ${char.entryPoint.locationName}</span>` : ''}
                </div>
                <p style="font-size: 0.85rem; font-style: italic; color: var(--text-secondary); margin-top: 0.35rem;">
                  "${char.entryPoint.entryBackstory || 'Stepped into the Bleeding Realms.'}"
                </p>
              </div>
            ` : ''}

            <!-- Inventory & Roleplay Dossier Accordion -->
            <details style="font-size: 0.85rem; border-top: 1px solid var(--border-subtle); padding-top: 0.4rem;">
              <summary style="cursor: pointer; color: var(--text-gold);">Backstory, Traits & Inventory</summary>
              <div style="margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.4rem;">
                ${char.personalityTraits ? `<div><strong>Traits:</strong> ${char.personalityTraits}</div>` : ''}
                ${char.ideals ? `<div><strong>Ideals:</strong> ${char.ideals}</div>` : ''}
                ${char.bonds ? `<div><strong>Bonds:</strong> ${char.bonds}</div>` : ''}
                ${char.flaws ? `<div><strong>Flaws:</strong> ${char.flaws}</div>` : ''}
                ${char.inventory ? `<div><strong>Gear & Coins:</strong> ${char.inventory}</div>` : ''}
              </div>
            </details>

            <!-- Action Bar: Play as Hero / Ownership Guard -->
            <div style="display: flex; gap: 0.4rem; margin-top: 0.75rem; flex-wrap: wrap;">
              ${isDm || isMyHero ? `
                <button class="btn btn-sm btn-primary play-hero-btn" data-id="${char.id}" style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.35rem;">
                  ${isMyHero ? 'Open My Sheet & Journal' : 'Inspect Sheet & Journal'}
                </button>
              ` : (owner ? `
                <div style="flex: 1; background: rgba(0,0,0,0.3); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.35rem 0.6rem; font-size: 0.8rem; color: var(--text-muted); text-align: center;">
                  Commanded by ${owner.displayName}
                </div>
              ` : (activeUser ? `
                <button class="btn btn-sm btn-primary claim-hero-btn" data-id="${char.id}" style="flex: 1;">
                  Claim & Play ${char.name}
                </button>
              ` : `
                <button class="btn btn-sm hero-signin-prompt-btn" style="flex: 1; opacity: 0.85;">
                  Sign In to Command
                </button>
              `))}

              ${activeUser && isDm ? `
                <button class="btn btn-sm claim-hero-btn" data-id="${char.id}" title="Assign or switch claimed hero">
                  ${owner ? `Assigned: ${owner.displayName}` : 'Assign'}
                </button>
              ` : ''}
            </div>

            <!-- DM-ONLY COMMAND & SECRETS SECTION -->
          ${worldState.prefs.dmMode ? `
            <div class="dm-char-command">
              <div class="dm-title">
                <span>DM Command & Secrets</span>
                <span style="font-size: 0.7rem; color: #ffab91;">(Hidden from Players)</span>
              </div>
              
              <!-- Passive Stats Bar for DM -->
              <div style="display: flex; justify-content: space-between; font-size: 0.75rem; border-bottom: 1px solid rgba(244,67,54,0.3); padding-bottom: 0.3rem;">
                <span><strong>Passive Perception:</strong> ${char.passivePerception || 10}</span>
                <span><strong>Passive Insight:</strong> ${char.passiveInsight || 10}</span>
              </div>

              <!-- Private Character Secret -->
              ${char.dmSecrets ? `
                <div>
                  <strong style="color: #ff8a80;">Character Secret / Arc:</strong>
                  <div style="font-size: 0.8rem; color: #ffebee; margin-top: 0.15rem;">${char.dmSecrets}</div>
                </div>
              ` : ''}

              <!-- DM Opening Entry Hook -->
              ${char.entryPoint && char.entryPoint.dmHook ? `
                <div>
                  <strong style="color: #ffab91;">DM Entry Scene Prompt:</strong>
                  <div style="font-size: 0.8rem; color: #ffebee; font-style: italic; margin-top: 0.15rem;">${char.entryPoint.dmHook}</div>
                </div>
              ` : ''}

              <!-- DM Action Row -->
              <div style="display: flex; justify-content: flex-end; gap: 0.4rem; margin-top: 0.25rem;">
                <button class="btn btn-sm delete-char-btn" data-id="${char.id}" style="background: rgba(244,67,54,0.2); border-color: #f44336; color: #ff8a80;">
                  Remove
                </button>
              </div>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    // Attach Interactive Event Listeners to Character Cards
    gridContainer.querySelectorAll('.hp-adj-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (!worldState.canControlCharacter(id)) {
          alert(`You cannot modify this character! It is controlled by ${worldState.getCharacterOwnerName(id)}.`);
          return;
        }
        const delta = parseInt(btn.getAttribute('data-delta'), 10);
        worldState.adjustPartyHp(id, delta, false);
        soundEngine.playDiceRoll(delta > 0);
        renderPartyCards();
      });
    });

    gridContainer.querySelectorAll('.hp-temp-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (!worldState.canControlCharacter(id)) {
          alert(`You cannot modify this character! It is controlled by ${worldState.getCharacterOwnerName(id)}.`);
          return;
        }
        worldState.adjustPartyHp(id, 5, true);
        soundEngine.playDiceRoll(true);
        renderPartyCards();
      });
    });

    gridContainer.querySelectorAll('.res-adj-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (!worldState.canControlCharacter(id)) {
          alert(`You cannot modify this character! It is controlled by ${worldState.getCharacterOwnerName(id)}.`);
          return;
        }
        const delta = parseInt(btn.getAttribute('data-delta'), 10);
        const char = (characters || []).find(c => c.id === id);
        if (char && char.classResources) {
          char.classResources.current = Math.max(0, Math.min(char.classResources.max || 10, (char.classResources.current || 0) + delta));
          worldState.saveData();
          renderPartyCards();
        }
      });
    });

    gridContainer.querySelectorAll('.condition-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const cId = pill.getAttribute('data-char-id');
        if (!worldState.canControlCharacter(cId)) {
          alert(`You cannot modify this character! It is controlled by ${worldState.getCharacterOwnerName(cId)}.`);
          return;
        }
        const cond = pill.getAttribute('data-condition');
        worldState.togglePartyCondition(cId, cond);
        renderPartyCards();
      });
    });

    gridContainer.querySelectorAll('.jump-to-entry').forEach(btn => {
      btn.addEventListener('click', () => {
        const regId = btn.getAttribute('data-region-id');
        if (regId) {
          worldState.setSelectedRegion(regId);
          const mapTab = document.querySelector('.nav-tab-btn[data-tab="map"]');
          if (mapTab) mapTab.click();
        }
      });
    });

    gridContainer.querySelectorAll('.play-hero-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        worldState.setActiveHero(id);
        const heroTab = document.querySelector('.nav-tab-btn[data-tab="hero"]');
        if (heroTab) heroTab.click();
      });
    });

    gridContainer.querySelectorAll('.claim-hero-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const user = worldState.getActiveUser();
        if (user) {
          worldState.claimCharacter(user.id, id);
          soundEngine.playDiceRoll(true);
          const c = (characters || []).find(char => char.id === id);
          alert(`⭐ You have claimed ${c ? c.name : 'this character'} as your hero!`);
          renderPartyCards();
        }
      });
    });

    gridContainer.querySelectorAll('.hero-signin-prompt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const playerAuthModal = document.getElementById('player-auth-modal');
        if (playerAuthModal) {
          playerAuthModal.classList.add('active');
          document.getElementById('tab-login-btn')?.click();
        }
      });
    });

    gridContainer.querySelectorAll('.delete-char-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cId = btn.getAttribute('data-id');
        if (confirm('Are you sure you want to remove this adventurer from the roster?')) {
          worldState.deletePartyCharacter(cId);
          renderPartyCards();
        }
      });
    });
  }

  renderPartyCards();

  // Party Gold Controls
  if (goldAddBtn) {
    goldAddBtn.addEventListener('click', () => {
      worldState.updatePartyGold(10);
      renderPartyView(container);
    });
  }
  if (goldSubBtn) {
    goldSubBtn.addEventListener('click', () => {
      worldState.updatePartyGold(-10);
      renderPartyView(container);
    });
  }

  // Rest Controls
  if (shortRestBtn) {
    shortRestBtn.addEventListener('click', () => {
      const isDm = !!worldState.prefs.dmMode;
      worldState.partyShortRest();
      soundEngine.playDiceRoll(true);
      if (isDm) {
        alert('Short Rest completed! Entire party regained ~40% HP.');
      } else {
        const myChars = (characters || []).filter(c => worldState.canControlCharacter(c.id, c));
        alert(`Short Rest completed for ${myChars.map(c => c.name).join(', ') || 'your character'}! Regained ~40% HP.`);
      }
      renderPartyCards();
    });
  }
  if (longRestBtn) {
    longRestBtn.addEventListener('click', () => {
      const isDm = !!worldState.prefs.dmMode;
      worldState.partyLongRest();
      soundEngine.playDiceRoll(true);
      if (isDm) {
        alert('Long Rest completed! All HP restored, temporary conditions cleared, and class resources refilled for the party.');
      } else {
        const myChars = (characters || []).filter(c => worldState.canControlCharacter(c.id, c));
        alert(`Long Rest completed for ${myChars.map(c => c.name).join(', ') || 'your character'}! All HP restored and resources refilled.`);
      }
      renderPartyCards();
    });
  }

  // Character Wizard Open/Close
  function openWizard() {
    wizardModal.classList.add('active');
    wizForm.reset();
    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(stat => updateStatModDisplay(stat));
    const log = container.querySelector('#stat-dice-roll-log');
    if (log) log.style.display = 'none';
  }
  function closeWizard() {
    wizardModal.classList.remove('active');
  }

  if (openWizBtn) openWizBtn.addEventListener('click', openWizard);
  if (closeWizBtn) closeWizBtn.addEventListener('click', closeWizard);
  if (cancelWizBtn) cancelWizBtn.addEventListener('click', closeWizard);

  // 4d6 Drop Lowest Rolling Engine
  function roll4d6DropLowest() {
    const rolls = [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1
    ];
    rolls.sort((a, b) => a - b);
    const dropped = rolls[0];
    const kept = rolls.slice(1);
    const total = kept.reduce((a, b) => a + b, 0);
    return { total, rolls, dropped, kept };
  }

  function updateStatModDisplay(statKey) {
    const input = container.querySelector(`#wiz-${statKey}`);
    const badge = container.querySelector(`#wiz-${statKey}-mod`);
    if (!input || !badge) return;
    const val = parseInt(input.value, 10) || 10;
    const mod = Math.floor((val - 10) / 2);
    const modStr = mod >= 0 ? '+' + mod : '' + mod;
    badge.textContent = modStr;
    badge.style.color = mod >= 0 ? '#81c784' : '#ef5350';
  }

  ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(stat => {
    const input = container.querySelector(`#wiz-${stat}`);
    if (input) {
      input.addEventListener('input', () => updateStatModDisplay(stat));
    }
  });

  // Roll Single Stat Button
  container.querySelectorAll('.roll-single-stat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const stat = btn.getAttribute('data-stat');
      const res = roll4d6DropLowest();
      const input = container.querySelector(`#wiz-${stat}`);
      if (input) {
        input.value = res.total;
        updateStatModDisplay(stat);
      }
      soundEngine.playDiceRoll(res.total >= 14);
      const log = container.querySelector('#stat-dice-roll-log');
      if (log) {
        log.style.display = 'block';
        log.innerHTML = `<strong>${stat.toUpperCase()} Roll:</strong> 4d6 [${res.rolls.join(', ')}] • Dropped lowest: <strong>${res.dropped}</strong> • Kept: <strong>[${res.kept.join(', ')}] = ${res.total}</strong>`;
      }
    });
  });

  // Roll All 6 Stats Button
  const rollAllBtn = container.querySelector('#roll-all-stats-btn');
  if (rollAllBtn) {
    rollAllBtn.addEventListener('click', () => {
      const stats = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
      const logs = [];
      stats.forEach(s => {
        const res = roll4d6DropLowest();
        const input = container.querySelector(`#wiz-${s}`);
        if (input) {
          input.value = res.total;
          updateStatModDisplay(s);
        }
        logs.push(`<strong>${s.toUpperCase()}</strong>: ${res.total} <span style="opacity: 0.7;">[${res.kept.join('+')}] (~${res.dropped}~)</span>`);
      });
      soundEngine.playDiceRoll(true);
      const log = container.querySelector('#stat-dice-roll-log');
      if (log) {
        log.style.display = 'block';
        log.innerHTML = `<strong>Rolled All 6 Ability Scores (4d6 drop lowest):</strong><br>${logs.join(' • ')}`;
      }
    });
  }

  // Standard Array Button (15, 14, 13, 12, 10, 8)
  const stdArrayBtn = container.querySelector('#standard-array-btn');
  if (stdArrayBtn) {
    stdArrayBtn.addEventListener('click', () => {
      const values = { str: 15, dex: 14, con: 13, int: 12, wis: 10, cha: 8 };
      Object.keys(values).forEach(s => {
        const input = container.querySelector(`#wiz-${s}`);
        if (input) {
          input.value = values[s];
          updateStatModDisplay(s);
        }
      });
      soundEngine.playDiceRoll(false);
      const log = container.querySelector('#stat-dice-roll-log');
      if (log) {
        log.style.display = 'block';
        log.innerHTML = `<strong>Standard Array Applied:</strong> STR: 15, DEX: 14, CON: 13, INT: 12, WIS: 10, CHA: 8`;
      }
    });
  }

  // Character Form Submit
  if (wizForm) {
    wizForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const regionSelect = container.querySelector('#wiz-entry-region');
      const selectedOption = regionSelect.options[regionSelect.selectedIndex];

      const newChar = {
        id: 'pc-' + Date.now(),
        name: container.querySelector('#wiz-name').value.trim(),
        playerName: container.querySelector('#wiz-player').value.trim(),
        avatar: container.querySelector('#wiz-avatar').value.trim() || 'PC',
        species: container.querySelector('#wiz-species').value.trim(),
        classRole: container.querySelector('#wiz-class').value.trim(),
        level: parseInt(container.querySelector('#wiz-level').value, 10) || 1,
        alignment: container.querySelector('#wiz-alignment').value.trim() || 'Neutral Good',
        hpCurrent: parseInt(container.querySelector('#wiz-hp').value, 10) || 30,
        hpMax: parseInt(container.querySelector('#wiz-hp').value, 10) || 30,
        tempHp: 0,
        ac: parseInt(container.querySelector('#wiz-ac').value, 10) || 14,
        speed: container.querySelector('#wiz-speed').value.trim() || '30 ft',
        initiativeMod: container.querySelector('#wiz-init').value.trim() || '+0',
        stats: {
          str: parseInt(container.querySelector('#wiz-str').value, 10) || 10,
          dex: parseInt(container.querySelector('#wiz-dex').value, 10) || 10,
          con: parseInt(container.querySelector('#wiz-con').value, 10) || 10,
          int: parseInt(container.querySelector('#wiz-int').value, 10) || 10,
          wis: parseInt(container.querySelector('#wiz-wis').value, 10) || 10,
          cha: parseInt(container.querySelector('#wiz-cha').value, 10) || 10
        },
        passivePerception: 10 + Math.floor(((parseInt(container.querySelector('#wiz-wis').value, 10) || 10) - 10) / 2),
        passiveInsight: 10 + Math.floor(((parseInt(container.querySelector('#wiz-wis').value, 10) || 10) - 10) / 2),
        weaponMasteries: container.querySelector('#wiz-masteries').value.split(',').map(s => s.trim()).filter(Boolean),
        entryPoint: {
          regionId: regionSelect.value,
          regionName: selectedOption ? selectedOption.getAttribute('data-name') : 'Crucible City',
          locationName: container.querySelector('#wiz-entry-location').value.trim() || 'Border Camp',
          entryBackstory: container.querySelector('#wiz-entry-story').value.trim() || 'Arrived at the bleeding frontiers.',
          dmHook: `Arrived through ${selectedOption ? selectedOption.getAttribute('data-name') : 'the realm'}; local rumors mention their arrival.`
        },
        personalityTraits: container.querySelector('#wiz-traits').value.trim(),
        inventory: container.querySelector('#wiz-inventory').value.trim() || 'Basic Adventuring Pack',
        dmSecrets: container.querySelector('#wiz-dmsecrets').value.trim(),
        conditions: []
      };

      worldState.addPartyCharacter(newChar);
      soundEngine.playDiceRoll(true);
      closeWizard();
      renderPartyView(container);
    });
  }

  // Import Character JSON
  if (importJsonBtn) {
    importJsonBtn.addEventListener('click', () => {
      const raw = prompt('Paste character JSON or array of character sheets:');
      if (!raw) return;
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          parsed.forEach(c => worldState.addPartyCharacter(c));
        } else if (parsed.name) {
          worldState.addPartyCharacter(parsed);
        }
        soundEngine.playDiceRoll(true);
        alert('Characters imported successfully!');
        renderPartyView(container);
      } catch (err) {
        alert('Invalid JSON format: ' + err.message);
      }
    });
  }

  // Export Party JSON
  if (exportPartyBtn) {
    exportPartyBtn.addEventListener('click', () => {
      const exportData = {
        partySettings: worldState.data.partySettings,
        partyCharacters: worldState.data.partyCharacters
      };
      const str = JSON.stringify(exportData, null, 2);
      const blob = new Blob([str], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `aetheria_party_roster_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }
}
