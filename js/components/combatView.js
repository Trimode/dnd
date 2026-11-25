/**
 * Tactical Combat Engine & Battlemat View (D&D 5.5e Integrated for Aetheria)
 */
import { worldState } from '../state/worldState.js';
import { soundEngine } from '../audio/soundEngine.js';

export function renderCombatView(container) {
  if (container.dataset.combatInitialized === 'true') {
    window.dispatchEvent(new Event('resize'));
    return;
  }
  container.dataset.combatInitialized = 'true';

  const isDm = worldState.prefs.dmMode;
  const party = worldState.data.partyCharacters || [];
  const champions = worldState.data.characters || [];

  container.innerHTML = `
    <div class="combat-view-container">
      <!-- Top Tactical Header -->
      <div class="combat-top-deck">
        <div class="combat-deck-left">
          <h2><span>Tactical Battlemat & Combat Deck</span></h2>
          <span class="version-pill">5.5e Tactical Grid</span>
        </div>

        <div class="combat-deck-right">
          <!-- Perspective Selector -->
          <div class="combat-perspective-box">
            <span>View Perspective:</span>
            <select id="combat-perspective-select">
              <option value="DM">DM (All-Seeing)</option>
              ${party.map(p => `<option value="${p.id}">View as: ${p.name}</option>`).join('')}
            </select>
          </div>

          <!-- Phase Indicator -->
          <div id="combat-phase-indicator" class="filter-chip active" style="font-weight: bold; background: #1e293b; color: #94a3b8; border-color: #475569;">
            OUT OF COMBAT
          </div>

          <!-- Round Tracker -->
          <div style="font-size: 0.8rem; font-weight: bold; color: var(--text-gold); background: var(--bg-tertiary); padding: 0.35rem 0.65rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
            Round: <span id="combat-round-counter" style="color: #4ade80;">—</span>
          </div>

          <!-- Start / End Combat (DM) -->
          <button id="combat-start-btn" class="btn btn-sm btn-primary" style="font-weight: bold; padding: 0.4rem 0.9rem;">
            Roll Initiative (DM)
          </button>
          <button id="combat-end-btn" class="btn btn-sm" style="font-weight: bold; padding: 0.4rem 0.9rem; display: none; color: #fca5a5; border-color: rgba(239, 68, 68, 0.5);">
            End Combat
          </button>
        </div>
      </div>

      <!-- 3-Column Tactical Layout -->
      <div class="combat-main-layout">
        
        <!-- Left Column: Unit Actions & Queue -->
        <aside class="combat-panel">
          <div class="combat-panel-title">
            <span>Active Unit</span>
            <button id="combat-quick-ping-btn" class="btn btn-sm" style="padding: 2px 6px; font-size: 0.7rem; color: #38bdf8; border-color: #38bdf8;">
              Ping Map
            </button>
          </div>

          <div id="combat-active-unit-info" style="font-size: 0.8rem; color: var(--text-muted); min-height: 55px; display: flex; flex-direction: column; justify-content: center;">
            Select a unit on the battlemat to plan moves.
          </div>

          <!-- Action Controls -->
          <div id="combat-action-controls" style="display: none; flex-direction: column; gap: 0.5rem;">
            <!-- Advantage / Disadvantage Pills -->
            <div class="combat-adv-group">
              <button class="combat-adv-pill" data-mode="ADVANTAGE">Advantage</button>
              <button class="combat-adv-pill active-norm" data-mode="NORMAL">Normal</button>
              <button class="combat-adv-pill" data-mode="DISADVANTAGE">Disadvantage</button>
            </div>

            <!-- Actions -->
            <div class="combat-action-grid">
              <button class="combat-act-btn" data-action="MOVE">Move</button>
              <button class="combat-act-btn" data-action="ATTACK">Attack</button>
              <button class="combat-act-btn" data-action="CAST">Spell / Ability</button>
              <button class="combat-act-btn" data-action="PING">Ping</button>
            </div>

            <!-- Spell / Ability Selector (populated per unit) -->
            <select id="combat-spell-select" class="theme-select" style="display: none; width: 100%; font-size: 0.75rem;"></select>

            <!-- DM Unit Saving Throws Panel -->
            <div id="combat-unit-save-panel" style="display: none; margin-top: 0.5rem; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: var(--radius-sm); padding: 0.4rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
                <span style="font-size: 0.72rem; font-weight: bold; color: #fca5a5;">🛡️ Unit Saving Throw:</span>
                <div style="display: flex; align-items: center; gap: 0.25rem;">
                  <span style="font-size: 0.65rem; color: var(--text-muted);">DC:</span>
                  <input type="number" id="combat-unit-save-dc" value="15" min="5" max="30" style="width: 38px; font-size: 0.7rem; padding: 1px 3px; background: var(--bg-tertiary); color: #fff; border: 1px solid var(--border-subtle); border-radius: 3px;">
                </div>
              </div>
              <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 0.25rem;">
                <button class="unit-save-btn combat-stat-save-btn" data-stat="STR">STR</button>
                <button class="unit-save-btn combat-stat-save-btn" data-stat="DEX">DEX</button>
                <button class="unit-save-btn combat-stat-save-btn" data-stat="CON">CON</button>
                <button class="unit-save-btn combat-stat-save-btn" data-stat="INT">INT</button>
                <button class="unit-save-btn combat-stat-save-btn" data-stat="WIS">WIS</button>
                <button class="unit-save-btn combat-stat-save-btn" data-stat="CHA">CHA</button>
              </div>
            </div>

            <!-- DM Push Request Panel (When player token selected) -->
            <div id="combat-dm-push-panel" style="display: none; margin-top: 0.5rem; background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.35); border-radius: var(--radius-sm); padding: 0.45rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
                <span style="font-size: 0.72rem; font-weight: bold; color: #93c5fd;">⚡ Push Request to Player:</span>
                <span id="combat-push-target-label" style="font-size: 0.7rem; color: var(--text-gold); font-weight: bold;"></span>
              </div>
              <div style="display: flex; gap: 0.25rem; margin-bottom: 0.25rem;">
                <select id="combat-push-save-type" class="theme-select" style="flex: 1; font-size: 0.7rem; padding: 2px;">
                  <option value="save_DEX">DEX Saving Throw</option>
                  <option value="save_CON">CON Saving Throw</option>
                  <option value="save_WIS">WIS Saving Throw</option>
                  <option value="save_STR">STR Saving Throw</option>
                  <option value="save_INT">INT Saving Throw</option>
                  <option value="save_CHA">CHA Saving Throw</option>
                  <option value="check_Perception">Perception Check</option>
                  <option value="check_Stealth">Stealth Check</option>
                  <option value="check_Athletics">Athletics Check</option>
                  <option value="save_Concentration">Concentration Save</option>
                </select>
                <input type="number" id="combat-push-save-dc" value="15" min="5" max="30" placeholder="DC" style="width: 42px; font-size: 0.7rem; padding: 2px 4px; background: var(--bg-tertiary); color: #fff; border: 1px solid var(--border-subtle); border-radius: 3px;">
              </div>
              <input type="text" id="combat-push-save-reason" placeholder="Reason (e.g. Fireball save, Ambush spot)" style="width: 100%; font-size: 0.7rem; padding: 2px 6px; background: var(--bg-tertiary); color: #fff; border: 1px solid var(--border-subtle); border-radius: 3px; margin-bottom: 0.3rem;">
              <button id="combat-push-save-submit-btn" class="btn btn-sm btn-primary" style="width: 100%; font-size: 0.7rem; padding: 3px 0; background: linear-gradient(135deg, #1d4ed8, #3b82f6); color: #fff;">
                ⚡ Send Prompt to Player
              </button>
            </div>
          </div>

          <!-- Current Turn & Action Economy -->
          <div id="combat-turn-box" style="border-top: 1px solid var(--border-subtle); padding-top: 0.5rem; margin-top: 0.25rem;"></div>

          <!-- Initiative Order -->
          <div style="flex: 1; display: flex; flex-direction: column; min-height: 120px; border-top: 1px solid var(--border-subtle); padding-top: 0.5rem;">
            <div class="combat-panel-title" style="border: none; padding-bottom: 0.25rem;">
              <span>Initiative Order</span>
              <label id="combat-auto-npc-label" style="display: none; align-items: center; gap: 0.25rem; font-size: 0.65rem; color: var(--text-muted); cursor: pointer;" title="Automatically run enemy and allied NPC turns">
                <input type="checkbox" id="combat-auto-npc-chk"> Auto NPC turns
              </label>
            </div>
            <div id="combat-initiative-list" style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 0.25rem; max-height: 220px;"></div>
          </div>
        </aside>

        <!-- Center Column: The Battlefield Canvas -->
        <section class="battlefield-section">
          <!-- Notification Toast -->
          <div id="combat-notification-toast" class="combat-toast">Notification</div>

          <!-- Animated Dice Roll Modal -->
          <div id="combat-dice-modal" class="combat-dice-overlay" style="display: none;">
            <div id="combat-dice-box" class="combat-dice-box">
              <span id="combat-dice-label" style="font-size: 0.7rem; font-weight: 800; color: var(--text-gold); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.25rem;">Attack Roll</span>
              <div style="position: relative; display: flex; align-items: center; justify-content: center; margin: 0.5rem 0;">
                <div style="width: 64px; height: 64px; border: 2px solid var(--border-gold); background: var(--bg-primary); border-radius: 8px; display: flex; align-items: center; justify-content: center;"></div>
                <span id="combat-dice-value" style="position: absolute; font-size: 1.8rem; font-weight: 900; color: #fff; text-shadow: 0 2px 8px rgba(0,0,0,0.8);">20</span>
              </div>
              <div id="combat-dice-subtext" style="font-size: 0.8rem; color: var(--text-secondary);"></div>
              <div id="combat-dice-extra" style="font-size: 0.75rem; margin-top: 0.35rem;"></div>
            </div>
          </div>

          <!-- Pending DM Roll Request Banner on Combat Screen -->
          <div id="combat-pending-banner-container" style="display: none; padding: 0 0.5rem; margin-bottom: 0.35rem;"></div>

          <!-- Canvas Viewport with Pan Support -->
          <div id="combat-canvas-container" class="canvas-scroll-container">
            <canvas id="battlefield-canvas" width="550" height="550"></canvas>
          </div>
        </section>

        <!-- Right Column: DM Tools, Tactical Pings & Combat Log -->
        <aside class="combat-panel">
          <!-- Tactical Pings & Whispers Panel -->
          <div style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem;">
            <div class="combat-panel-title">
              <span>Tactical Pings & Whispers</span>
            </div>
            <p style="font-size: 0.75rem; color: var(--text-muted); margin: 0.35rem 0 0.5rem;">
              Right-click or Shift-click any square to ping. Choose ping visibility:
            </p>

            <div style="display: flex; flex-direction: column; gap: 0.3rem; font-size: 0.75rem; margin-bottom: 0.5rem;">
              <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer;">
                <input type="radio" name="dm-ping-vis" id="combat-ping-vis-all" checked>
                <span><strong>Public Ping</strong> (All see it)</span>
              </label>
              <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer;">
                <input type="radio" name="dm-ping-vis" id="combat-ping-vis-custom">
                <span><strong>Secret Ping</strong> (Whisper to Selected)</span>
              </label>
            </div>

            <!-- Custom Recipients Checkboxes -->
            <div id="combat-ping-custom-container" style="display: none; background: var(--bg-tertiary); border: 1px solid rgba(168, 85, 247, 0.4); border-radius: var(--radius-sm); padding: 0.5rem; margin-bottom: 0.5rem;">
              <span style="font-size: 0.7rem; font-weight: bold; color: #c084fc; text-transform: uppercase;">Recipients:</span>
              <div id="combat-ping-recipients-list" style="display: flex; flex-direction: column; gap: 0.25rem; margin-top: 0.25rem;">
                ${party.map(p => `
                  <label style="display: flex; align-items: center; gap: 0.35rem; font-size: 0.75rem; cursor: pointer;">
                    <input type="checkbox" value="${p.id}" class="combat-ping-chk" checked>
                    <span>${p.name}</span>
                  </label>
                `).join('')}
              </div>
            </div>

            <!-- Ping Color Selection -->
            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.75rem;">
              <span style="color: var(--text-secondary);">Ping Style:</span>
              <div style="display: flex; gap: 0.35rem;">
                <button data-color="#38bdf8" class="combat-ping-color-btn" style="width: 18px; height: 18px; border-radius: 50%; background: #38bdf8; border: 2px solid #fff; cursor: pointer;" title="Notice Blue"></button>
                <button data-color="#a855f7" class="combat-ping-color-btn" style="width: 18px; height: 18px; border-radius: 50%; background: #a855f7; border: 1px solid transparent; cursor: pointer;" title="Arcane Purple"></button>
                <button data-color="#eab308" class="combat-ping-color-btn" style="width: 18px; height: 18px; border-radius: 50%; background: #eab308; border: 1px solid transparent; cursor: pointer;" title="Warning Gold"></button>
                <button data-color="#ef4444" class="combat-ping-color-btn" style="width: 18px; height: 18px; border-radius: 50%; background: #ef4444; border: 1px solid transparent; cursor: pointer;" title="Hostile Red"></button>
              </div>
            </div>
          </div>

          <!-- DM Spawner & Bestiary -->
          <div style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem;">
            <div class="combat-panel-title">
              <span>Spawn Units & Encounters</span>
            </div>
            
            <div style="margin: 0.4rem 0;">
              <select id="combat-spawn-select" class="theme-select" style="width: 100%; font-size: 0.75rem; margin-bottom: 0.4rem;">
                <optgroup label="Aetheria Campaign Party">
                  ${party.map(p => `<option value="party_${p.id}">${p.name} (AC ${p.ac}, HP ${p.hpMax})</option>`).join('')}
                </optgroup>
                <optgroup label="Aetheria Champions & NPCs">
                  ${champions.slice(0, 4).map(c => `<option value="champ_${c.id}">${c.name} (Affinity: ${c.elementalAffinity})</option>`).join('')}
                </optgroup>
                <optgroup label="5.5e Bestiary">
                  <option value="Goblin" selected>Goblin (AC 15, HP 7)</option>
                  <option value="Goblin Alpha">Goblin Alpha (AC 16, HP 21)</option>
                  <option value="Orc">Orc (AC 13, HP 15)</option>
                  <option value="Skeleton">Skeleton (AC 13, HP 13)</option>
                  <option value="Owlbear">Owlbear (AC 13, HP 59)</option>
                  <option value="Troll">Troll (AC 15, HP 84)</option>
                  <option value="Red Dragon Wyrmling">Red Dragon Wyrmling (AC 17, HP 75)</option>
                </optgroup>
              </select>

              <select id="combat-spawn-team" class="theme-select" style="width: 100%; font-size: 0.75rem; margin-bottom: 0.4rem;" title="Side for spawned NPCs and monsters (party members always join the party)">
                <option value="enemy" selected>Spawn as: Hostile Enemy</option>
                <option value="ally">Spawn as: Allied NPC</option>
              </select>

              <div style="display: flex; gap: 0.35rem; margin-bottom: 0.4rem;">
                <button id="combat-drop-unit-btn" class="btn btn-sm btn-primary" style="flex: 1; font-size: 0.75rem;">Drop on Map</button>
                <button id="combat-paint-btn" class="btn btn-sm" style="flex: 1; font-size: 0.75rem;">Paint: OFF</button>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: var(--text-secondary);">
              <span>Grid: <strong id="combat-grid-label">11x11</strong></span>
              <input type="range" id="combat-grid-slider" min="6" max="30" value="11" style="width: 120px; cursor: pointer;">
            </div>

            <!-- DM Terrain, Fog of War & Custom Battlemap Upload -->
            <div id="combat-dm-map-tools" style="margin-top: 0.65rem; padding-top: 0.6rem; border-top: 1px solid var(--border-subtle); display: flex; flex-direction: column; gap: 0.4rem;">
              <div style="font-size: 0.72rem; font-weight: 700; color: var(--text-gold); text-transform: uppercase;">
                🗺️ Terrain, Fog of War &amp; Custom Map
              </div>
              <div style="display: flex; gap: 0.3rem; flex-wrap: wrap;">
                <select id="combat-brush-select" class="theme-select" style="flex: 1; font-size: 0.72rem; padding: 2px 6px;">
                  <option value="">Brush: OFF (Normal Click)</option>
                  <option value="wall">🧱 Paint Wall / Obstacle</option>
                  <option value="difficult">🌿 Paint Difficult Terrain</option>
                  <option value="water">🌊 Paint Water</option>
                  <option value="fire">🔥 Paint Hazard / Fire</option>
                  <option value="erase_terrain">🧹 Erase Terrain</option>
                  <option value="fog_hide">🌫️ Fog of War: Hide Tile</option>
                  <option value="fog_reveal">☀️ Fog of War: Reveal Tile</option>
                </select>
              </div>
              <div style="display: flex; gap: 0.3rem;">
                <button id="combat-fog-cover-all" class="btn btn-sm" style="flex: 1; font-size: 0.68rem; padding: 2px 4px;">Cover All Fog</button>
                <button id="combat-fog-reveal-all" class="btn btn-sm" style="flex: 1; font-size: 0.68rem; padding: 2px 4px;">Reveal All Fog</button>
              </div>
              <div style="display: flex; gap: 0.3rem; align-items: center;">
                <label for="combat-map-file-input" class="btn btn-sm" style="flex: 1; font-size: 0.68rem; padding: 3px 6px; text-align: center; cursor: pointer; margin: 0;">
                  📤 Upload Battlemap
                </label>
                <input type="file" id="combat-map-file-input" accept="image/*" style="display: none;">
                <button id="combat-map-clear-btn" class="btn btn-sm" style="font-size: 0.68rem; padding: 3px 6px; color: #fca5a5;">Clear Map</button>
              </div>
            </div>

            <!-- DM Encounter Builder & Saved Presets (Supabase) -->
            <div id="combat-encounter-presets-panel" style="margin-top: 0.65rem; padding-top: 0.6rem; border-top: 1px solid var(--border-subtle); display: flex; flex-direction: column; gap: 0.4rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.72rem; font-weight: 700; color: var(--text-gold); text-transform: uppercase;">⚔️ Encounter Presets</span>
                <span id="combat-cr-badge" style="font-size: 0.66rem; font-weight: 700; padding: 1px 6px; border-radius: 4px; background: rgba(234,179,8,0.2); color: #fde047;">Medium</span>
              </div>
              <div style="display: flex; gap: 0.3rem;">
                <input type="text" id="combat-preset-name" placeholder="Encounter name..." style="flex: 1; font-size: 0.7rem; padding: 2px 6px; background: var(--bg-tertiary); color: #fff; border: 1px solid var(--border-subtle); border-radius: 3px;">
                <button id="combat-save-preset-btn" class="btn btn-sm btn-primary" style="font-size: 0.68rem; padding: 2px 7px;">💾 Save</button>
              </div>
              <div style="display: flex; gap: 0.3rem;">
                <select id="combat-preset-select" class="theme-select" style="flex: 1; font-size: 0.7rem; padding: 2px 5px;">
                  <option value="">-- Saved Encounters (0) --</option>
                </select>
                <button id="combat-load-preset-btn" class="btn btn-sm" style="font-size: 0.68rem; padding: 2px 6px;">Load</button>
                <button id="combat-delete-preset-btn" class="btn btn-sm" style="font-size: 0.68rem; padding: 2px 6px; color: #fca5a5;" title="Delete Preset">&times;</button>
              </div>
            </div>
          </div>

          <!-- Combat & Real-time Dice Roll Log -->
          <div style="flex: 1; display: flex; flex-direction: column; min-height: 120px;">
            <div class="combat-panel-title" style="border: none; padding-bottom: 0.25rem; display: flex; justify-content: space-between; align-items: center;">
              <span>Combat & Dice Roll Log</span>
              <button id="combat-clear-log-btn" style="background: none; border: none; color: #ff5252; font-size: 0.65rem; font-weight: bold; cursor: pointer;">Clear</button>
            </div>
            <div id="combat-log-stream" style="flex: 1; overflow-y: auto; background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.5rem; font-family: var(--font-mono); font-size: 0.75rem; display: flex; flex-direction: column; gap: 0.25rem; max-height: 155px;">
              <div style="color: var(--text-muted); font-style: italic;">Tactical & Dice deck ready. Shift-click to ping.</div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  `;

  // Initialize Combat Controller inside this view
  initCombatEngine(container);
}

// Full Combat Engine Logic
function initCombatEngine(container) {
  const canvas = container.querySelector('#battlefield-canvas');
  const canvasContainer = container.querySelector('#combat-canvas-container');
  if (!canvas || !canvasContainer) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId = null;
  let audioCtx = null;

  // State
  const cState = {
    gridSize: 11,
    minTileSize: 50,
    tileSize: 50,
    currentPerspective: 'DM',
    selectedEntity: null,
    selectedAction: null,
    advantageMode: 'NORMAL',
    selectedSpellId: null,
    isPaintActive: false,
    activeBrush: '',
    terrain: {},
    fogOfWar: {},
    mapImageUrl: null,
    hoveredTile: null,
    dmPingVis: 'ALL',
    dmPingRecipients: [],
    dmPingColor: '#38bdf8',
    activePings: [],
    entities: [],
    effects: [],
    // Initiative / turn engine
    combat: { active: false, round: 0, order: [], turnIndex: 0, aiRunning: false },
    autoNpc: false
  };

  // ==========================================
  // SPELL & ABILITY LIBRARY (shared by players, NPCs and monsters)
  // kind: attack (attack roll) | auto (auto-hit) | save (single-target save)
  //       aoe (area save) | heal | teleport
  // range / radius are in tiles (1 tile = 5 ft)
  // ==========================================
  const ABILITIES = {
    firebolt:      { name: 'Fire Bolt', kind: 'attack', range: 24, dmg: '1d10', type: 'fire', level: 0 },
    sacred_flame:  { name: 'Sacred Flame', kind: 'save', save: 'DEX', range: 12, dmg: '2d8', type: 'radiant', half: false, level: 0 },
    magic_missile: { name: 'Magic Missile', kind: 'auto', range: 24, dmg: '3d4+3', type: 'force', level: 1 },
    guiding_bolt:  { name: 'Guiding Bolt', kind: 'attack', range: 24, dmg: '4d6', type: 'radiant', level: 1 },
    cure_wounds:   { name: 'Cure Wounds', kind: 'heal', range: 1, heal: '2d8+4', level: 1 },
    healing_word:  { name: 'Healing Word', kind: 'heal', range: 12, heal: '2d4+4', level: 1, bonus: true },
    thunderwave:   { name: 'Thunderwave', kind: 'aoe', save: 'CON', centerSelf: true, radius: 1, dmg: '2d8', type: 'thunder', half: true, level: 1 },
    misty_step:    { name: 'Misty Step', kind: 'teleport', range: 6, level: 2, bonus: true },
    scorching_ray: { name: 'Scorching Ray', kind: 'attack', range: 24, dmg: '6d6', type: 'fire', level: 2 },
    fireball:      { name: 'Fireball', kind: 'aoe', save: 'DEX', range: 30, radius: 4, dmg: '8d6', type: 'fire', half: true, level: 3 },
    // Weapons & monster abilities
    shortbow:      { name: 'Shortbow', kind: 'attack', range: 16, dmg: '1d6+2', type: 'piercing', weapon: true },
    longbow:       { name: 'Longbow', kind: 'attack', range: 30, dmg: '1d8+3', type: 'piercing', weapon: true },
    javelin:       { name: 'Javelin', kind: 'attack', range: 6, dmg: '1d6+3', type: 'piercing', weapon: true },
    psychic_blade: { name: 'Psychic Blade (thrown)', kind: 'attack', range: 12, dmg: '1d6+4', type: 'psychic', weapon: true },
    ember_hex:     { name: 'Ember Hex', kind: 'save', save: 'WIS', range: 12, dmg: '2d6', type: 'fire', half: true },
    frost_breath:  { name: 'Frost Breath (Recharge)', kind: 'aoe', save: 'CON', range: 3, radius: 2, dmg: '4d8', type: 'cold', half: true, uses: 1 },
    fire_breath:   { name: 'Fire Breath (Recharge)', kind: 'aoe', save: 'DEX', range: 3, radius: 2, dmg: '7d6', type: 'fire', half: true, uses: 1 },
    terrify_roar:  { name: 'Terrifying Roar', kind: 'save', save: 'WIS', range: 6, dmg: '2d6', type: 'psychic', half: true, uses: 1 }
  };

  // 5.5e Bestiary templates for spawned monsters
  const BESTIARY = {
    'Goblin':              { ac: 15, hp: 7,  speed: 6, init: 2, attackMod: 4, dmgFormula: '1d6+2',  dmgType: 'slashing',    weaponName: 'Scimitar',   abilities: ['shortbow', 'ember_hex'], spellDC: 12 },
    'Goblin Alpha':        { ac: 16, hp: 21, speed: 6, init: 2, attackMod: 5, dmgFormula: '1d8+3',  dmgType: 'slashing',    weaponName: 'Scimitar',   abilities: ['shortbow', 'ember_hex', 'scorching_ray'], spellDC: 13 },
    'Orc':                 { ac: 13, hp: 15, speed: 6, init: 1, attackMod: 5, dmgFormula: '1d12+3', dmgType: 'slashing',    weaponName: 'Greataxe',   abilities: ['javelin', 'terrify_roar'], spellDC: 12 },
    'Skeleton':            { ac: 13, hp: 13, speed: 6, init: 2, attackMod: 4, dmgFormula: '1d6+2',  dmgType: 'piercing',    weaponName: 'Shortsword', abilities: ['shortbow', 'ember_hex'], spellDC: 12 },
    'Owlbear':             { ac: 13, hp: 59, speed: 8, init: 1, attackMod: 7, dmgFormula: '2d8+5',  dmgType: 'slashing',    weaponName: 'Rend',       abilities: ['terrify_roar'], spellDC: 14 },
    'Troll':               { ac: 15, hp: 84, speed: 6, init: 1, attackMod: 7, dmgFormula: '2d6+4',  dmgType: 'slashing',    weaponName: 'Claw',       abilities: ['frost_breath'], spellDC: 14 },
    'Red Dragon Wyrmling': { ac: 17, hp: 75, speed: 6, init: 0, attackMod: 6, dmgFormula: '1d10+4', dmgType: 'piercing',    weaponName: 'Bite',       abilities: ['fire_breath', 'fireball'], spellDC: 14 }
  };

  const rollD20 = () => Math.floor(Math.random() * 20) + 1;
  const statMod = (v) => Math.floor(((v || 10) - 10) / 2);
  const dist = (a, b) => Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
  const sideOf = (ent) => (ent.team === 'player' || ent.team === 'ally') ? 'party' : 'foe';
  const isHostile = (a, b) => sideOf(a) !== sideOf(b);

  // Roll a formula like "2d6+4" or "1d6+4+3d6"; doubleDice for critical hits
  function rollDice(formula, doubleDice = false) {
    const terms = String(formula).replace(/\s/g, '').match(/[+-]?[^+-]+/g) || [];
    const rolls = [];
    let total = 0;
    terms.forEach(term => {
      const sign = term.startsWith('-') ? -1 : 1;
      const body = term.replace(/^[+-]/, '');
      const m = body.match(/^(\d+)d(\d+)$/i);
      if (m) {
        const count = parseInt(m[1], 10) * (doubleDice ? 2 : 1);
        const sides = parseInt(m[2], 10);
        for (let i = 0; i < count; i++) {
          const r = Math.floor(Math.random() * sides) + 1;
          rolls.push(r);
          total += sign * r;
        }
      } else {
        total += sign * (parseInt(body, 10) || 0);
      }
    });
    return { total: Math.max(0, total), rolls };
  }

  // Build a battlemat unit from a party character sheet
  function buildPartyEntity(p, x, y, color) {
    const s = p.stats || {};
    const lvl = p.level || 5;
    const pb = Math.ceil(1 + lvl / 4);
    const role = (p.classRole || '').toLowerCase();
    const strM = statMod(s.str), dexM = statMod(s.dex);
    const castStat = role.includes('cleric') || role.includes('druid') || role.includes('ranger') ? 'wis'
      : (role.includes('wizard') || role.includes('artificer') ? 'int' : 'cha');
    const castM = statMod(s[castStat]);

    let abilities = [];
    let dmgFormula = `1d8+${Math.max(strM, dexM)}`;
    let weaponName = 'Weapon';
    let dmgType = 'slashing';
    let spellSlots = {};
    if (role.includes('barbarian')) {
      abilities = ['javelin']; dmgFormula = `1d12+${strM + 2}`; weaponName = 'Greataxe (Rage)';
    } else if (role.includes('cleric')) {
      abilities = ['sacred_flame', 'guiding_bolt', 'cure_wounds', 'healing_word'];
      dmgFormula = `1d8+${strM}`; weaponName = 'Mace'; dmgType = 'bludgeoning';
      spellSlots = { 1: { max: 4, current: 4 }, 2: { max: 3, current: 3 }, 3: { max: 2, current: 2 } };
    } else if (role.includes('rogue')) {
      abilities = ['psychic_blade', 'shortbow']; dmgFormula = `1d6+${dexM}+3d6`; weaponName = 'Psychic Blade + Sneak Attack'; dmgType = 'psychic';
    } else if (role.includes('wizard') || role.includes('sorcerer')) {
      abilities = ['firebolt', 'magic_missile', 'thunderwave', 'misty_step', 'scorching_ray', 'fireball'];
      dmgFormula = `1d6+${Math.max(strM, dexM)}`; weaponName = 'Quarterstaff'; dmgType = 'bludgeoning';
      spellSlots = { 1: { max: 4, current: 4 }, 2: { max: 3, current: 3 }, 3: { max: 2, current: 2 } };
    } else if (role.includes('ranger')) {
      abilities = ['longbow', 'cure_wounds'];
      spellSlots = { 1: { max: 4, current: 4 }, 2: { max: 2, current: 2 } };
    } else {
      abilities = ['javelin'];
    }
    const speedFt = parseInt(String(p.speed || '30'), 10) || 30;
    return {
      id: p.id,
      partyId: p.id,
      name: p.name,
      team: 'player',
      color: color || '#3b82f6',
      avatar: (p.name || 'PC').substring(0, 2).toUpperCase(),
      x, y,
      hp: p.hpCurrent !== undefined ? p.hpCurrent : p.hpMax,
      maxHp: p.hpMax || 30,
      ac: p.ac || 14,
      speed: Math.round(speedFt / 5),
      movementLeft: Math.round(speedFt / 5),
      init: parseInt(p.initiativeMod, 10) || dexM,
      stats: s,
      level: lvl,
      classRole: p.classRole,
      playerName: p.playerName,
      attackMod: Math.max(strM, dexM) + pb,
      spellAttack: castM + pb,
      spellDC: 8 + pb + castM,
      dmgFormula, dmgType, weaponName,
      abilities,
      spellSlots
    };
  }

  function buildMonsterEntity(name, x, y, team = 'enemy', overrides = {}) {
    const t = BESTIARY[name] || { ac: 14, hp: 20, speed: 6, init: 1, attackMod: 4, dmgFormula: '1d8+2', dmgType: 'slashing', weaponName: 'Strike', abilities: [], spellDC: 12 };
    return Object.assign({
      id: 'mon_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      name,
      team,
      color: team === 'ally' ? '#14b8a6' : '#ef4444',
      avatar: name.substring(0, 2).toUpperCase(),
      x, y,
      hp: t.hp, maxHp: t.hp, ac: t.ac,
      speed: t.speed, movementLeft: t.speed,
      init: t.init,
      attackMod: t.attackMod, spellAttack: t.attackMod, spellDC: t.spellDC,
      dmgFormula: t.dmgFormula, dmgType: t.dmgType, weaponName: t.weaponName,
      abilities: [...t.abilities],
      abilityUses: {}
    }, overrides);
  }

  // Populate Initial Entities from Aetheria Party & Monsters
  const partyData = worldState.data.partyCharacters || [];
  const partyColors = ['#3b82f6', '#10b981', '#a855f7', '#f59e0b', '#ec4899', '#06b6d4'];
  cState.entities = partyData.slice(0, 6).map((p, i) => buildPartyEntity(p, 2 + (i % 2), 4 + i, partyColors[i % partyColors.length]));
  cState.entities.push(
    buildMonsterEntity('Goblin Alpha', 8, 4, 'enemy', { id: 'mon-1', name: 'Ash Goblin Alpha', avatar: 'GA', abilities: ['shortbow', 'ember_hex'] }),
    buildMonsterEntity('Troll', 8, 7, 'enemy', { id: 'mon-2', name: 'Frost Troll', avatar: 'FT', color: '#0288d1', hp: 65, maxHp: 65, dmgType: 'cold', abilities: ['frost_breath'] })
  );
  // Helper: Play Web Audio synthesized ping chime
  function playChime(isSecret = false) {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = isSecret ? 'triangle' : 'sine';
      const t = audioCtx.currentTime;
      if (isSecret) {
        osc.frequency.setValueAtTime(587.33, t);
        osc.frequency.exponentialRampToValueAtTime(880, t + 0.18);
      } else {
        osc.frequency.setValueAtTime(880, t);
        osc.frequency.exponentialRampToValueAtTime(1318.51, t + 0.15);
      }
      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.35);
    } catch(e) {}
  }

  function logMsg(msg, colorClass = 'var(--text-secondary)') {
    const stream = container.querySelector('#combat-log-stream');
    if (!stream) return;
    const el = document.createElement('div');
    el.style.color = colorClass;
    el.style.lineHeight = '1.4';
    el.innerHTML = `> ${msg}`;
    stream.appendChild(el);
    stream.scrollTop = stream.scrollHeight;
  }

  function notifyToast(text) {
    const toast = container.querySelector('#combat-notification-toast');
    if (!toast) return;
    toast.textContent = text;
    toast.style.opacity = '1';
    toast.style.transform = 'translate(-50%, 0)';
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translate(-50%, -10px)';
    }, 2400);
  }

  function triggerPing(gx, gy) {
    let senderName = 'DM';
    let senderAvatar = 'DM';
    let recipients = 'ALL';
    let color = cState.dmPingColor || '#38bdf8';

    if (cState.currentPerspective === 'DM') {
      if (cState.dmPingVis === 'CUSTOM' && cState.dmPingRecipients.length > 0) {
        recipients = [...cState.dmPingRecipients];
        color = '#a855f7';
      } else {
        recipients = 'ALL';
        color = cState.dmPingColor;
      }
    } else {
      const p = cState.entities.find(e => e.id === cState.currentPerspective);
      if (p) {
        senderName = p.name;
        senderAvatar = p.avatar || p.name.substring(0, 2).toUpperCase();
        color = p.color || '#3b82f6';
        recipients = 'ALL';
      }
    }

    const isSecret = Array.isArray(recipients);
    const pingObj = {
      id: 'ping_' + Date.now(),
      x: gx,
      y: gy,
      senderName,
      senderAvatar,
      recipients,
      color,
      isSecret,
      life: 80,
      maxLife: 80
    };

    cState.activePings.push(pingObj);

    // Can perspective see it?
    const canSee = cState.currentPerspective === 'DM' || recipients === 'ALL' || (Array.isArray(recipients) && recipients.includes(cState.currentPerspective));
    if (canSee) {
      playChime(isSecret);
      if (isSecret) {
        if (cState.currentPerspective === 'DM') {
          const names = recipients.map(id => (cState.entities.find(e => e.id === id) || {}).name || id).join(', ');
          logMsg(`[Secret Ping to ${names}] DM marked (${gx}, ${gy})`, '#c084fc');
          notifyToast(`Secret Ping sent to: ${names}`);
        } else {
          logMsg(`[DM Whisper] DM pointed out square (${gx}, ${gy})`, '#c084fc');
          notifyToast(`DM whispered a ping at (${gx}, ${gy})!`);
        }
      } else {
        logMsg(`${senderName} pinged square (${gx}, ${gy})`, '#38bdf8');
        notifyToast(`${senderName} pinged (${gx}, ${gy})`);
      }
    }
  }

  // Canvas Layout & Resize
  function resizeCanvas() {
    canvas.width = cState.gridSize * cState.minTileSize;
    canvas.height = cState.gridSize * cState.minTileSize;
    cState.tileSize = cState.minTileSize;
  }
  resizeCanvas();

  // Canvas Mouse Events
  let isDragging = false, startPanX = 0, startPanY = 0, scrollL = 0, scrollT = 0, hasDragged = false;
  canvasContainer.addEventListener('mousedown', (e) => {
    if (e.button !== 0 || cState.isPaintActive) return;
    isDragging = true;
    hasDragged = false;
    startPanX = e.pageX - canvasContainer.offsetLeft;
    startPanY = e.pageY - canvasContainer.offsetTop;
    scrollL = canvasContainer.scrollLeft;
    scrollT = canvasContainer.scrollTop;
  });

  canvasContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const walkX = (e.pageX - canvasContainer.offsetLeft) - startPanX;
    const walkY = (e.pageY - canvasContainer.offsetTop) - startPanY;
    if (Math.abs(walkX) > 5 || Math.abs(walkY) > 5) {
      hasDragged = true;
      canvasContainer.scrollLeft = scrollL - walkX;
      canvasContainer.scrollTop = scrollT - walkY;
    }
  });

  const stopPan = () => { isDragging = false; };
  canvasContainer.addEventListener('mouseup', stopPan);
  canvasContainer.addEventListener('mouseleave', stopPan);

  // Coordinate translation handling any canvas scaling or viewport differences
  function getCanvasTileCoords(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / (rect.width || 1);
    const scaleY = canvas.height / (rect.height || 1);
    const clientX = (e.clientX - rect.left) * scaleX;
    const clientY = (e.clientY - rect.top) * scaleY;
    const gx = Math.floor(clientX / cState.tileSize);
    const gy = Math.floor(clientY / cState.tileSize);
    return {
      gx,
      gy,
      inBounds: gx >= 0 && gx < cState.gridSize && gy >= 0 && gy < cState.gridSize
    };
  }

  // Hover Tracking
  const updateHoverTile = (e) => {
    const coords = getCanvasTileCoords(e);
    if (coords.inBounds) {
      cState.hoveredTile = { x: coords.gx, y: coords.gy };
    } else {
      cState.hoveredTile = null;
    }
  };

  canvas.addEventListener('mousemove', updateHoverTile);
  canvasContainer.addEventListener('mousemove', updateHoverTile);

  canvas.addEventListener('mouseleave', () => {
    cState.hoveredTile = null;
  });

  // Right-Click Context Menu -> Instant Ping
  canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const coords = getCanvasTileCoords(e);
    if (coords.inBounds) {
      triggerPing(coords.gx, coords.gy);
    }
  });

  // Canvas Click Handler
  canvas.addEventListener('click', (e) => {
    if (hasDragged) { hasDragged = false; return; }
    const coords = getCanvasTileCoords(e);
    if (!coords.inBounds) return;
    const gx = coords.gx;
    const gy = coords.gy;

    if (e.shiftKey || e.altKey || cState.selectedAction === 'PING') {
      triggerPing(gx, gy);
      if (cState.selectedAction === 'PING') {
        cState.selectedAction = null;
        updateActionUi();
      }
      return;
    }

    // Terrain & Fog of War Brush Painting
    if (cState.activeBrush) {
      const key = `${gx},${gy}`;
      if (cState.activeBrush === 'erase_terrain') {
        delete cState.terrain[key];
      } else if (cState.activeBrush === 'fog_hide') {
        cState.fogOfWar[key] = true;
      } else if (cState.activeBrush === 'fog_reveal') {
        delete cState.fogOfWar[key];
      } else {
        cState.terrain[key] = cState.activeBrush;
      }
      persistCombatToCloud();
      return;
    }

    const clickedEntity = cState.entities.find(ent => ent.x === gx && ent.y === gy && ent.hp > 0);

    if (cState.selectedAction) {
      handleActionClick(gx, gy, clickedEntity);
    } else {
      handleUnitClick(clickedEntity);
    }
  });

  function handleUnitClick(entity) {
    if (entity) {
      cState.selectedEntity = entity;
      cState.selectedAction = null;
      if (entity.team === 'player') {
        notifyToast(`Selected ${entity.name}`);
      } else {
        notifyToast(`${entity.team === 'ally' ? 'Ally' : 'Enemy'}: ${entity.name} (AC: ${entity.ac}, HP: ${entity.hp}/${entity.maxHp})`);
      }
    } else {
      cState.selectedEntity = null;
      cState.selectedAction = null;
    }
    updateActionUi();
  }

  // ==========================================
  // TURN / ACTION ECONOMY HELPERS
  // ==========================================
  function currentTurnEntity() {
    const c = cState.combat;
    if (!c.active || c.order.length === 0) return null;
    return cState.entities.find(e => e.id === c.order[c.turnIndex]) || null;
  }

  function canAct(actor, isBonus = false) {
    if (worldState.prefs && worldState.prefs.dmMode) return { ok: true }; // DM has full authority to act/test
    const c = cState.combat;
    if (!c.active) return { ok: true }; // free-form actions outside of initiative (no action economy)
    if (c.aiRunning) return { ok: false, reason: 'Wait for the current NPC turn to finish.' };
    const cur = currentTurnEntity();
    if (!cur || cur.id !== actor.id) return { ok: false, reason: `It is not ${actor.name}'s turn${cur ? ` (current: ${cur.name})` : ''}.` };
    if (isBonus ? actor.bonusUsed : actor.actionUsed) {
      return { ok: false, reason: isBonus ? 'Bonus action already used this turn.' : 'Action already used this turn.' };
    }
    return { ok: true };
  }

  function hasSlotFor(actor, level) {
    if (worldState.prefs && worldState.prefs.dmMode) return true;
    if (!level || !actor.spellSlots || Object.keys(actor.spellSlots).length === 0) return true;
    return Object.keys(actor.spellSlots).some(l => parseInt(l, 10) >= level && actor.spellSlots[l].current > 0);
  }

  function spendSlot(actor, level) {
    if (!level || !actor.spellSlots || Object.keys(actor.spellSlots).length === 0) return null;
    const lvls = Object.keys(actor.spellSlots).map(n => parseInt(n, 10)).filter(l => l >= level).sort((a, b) => a - b);
    for (const l of lvls) {
      if (actor.spellSlots[l].current > 0) { actor.spellSlots[l].current--; return l; }
    }
    return null;
  }

  function usableAbilities(actor) {
    const isDm = Boolean(worldState.prefs && worldState.prefs.dmMode);
    const keys = Object.keys(ABILITIES);
    return keys.filter(id => {
      const ab = ABILITIES[id];
      if (!ab) return false;
      if (isDm) return true;
      if (actor.abilities && actor.abilities.includes(id)) {
        if (ab.uses && ((actor.abilityUses || {})[id] || 0) >= ab.uses) return false;
        return hasSlotFor(actor, ab.level);
      }
      return hasSlotFor(actor, ab.level);
    });
  }

  function describeAbility(actor, id) {
    const ab = ABILITIES[id];
    if (!ab) return id;
    const parts = [];
    parts.push(ab.level === 0 ? 'Cantrip' : (ab.level ? `Lvl ${ab.level}` : (ab.weapon ? 'Weapon' : 'Ability')));
    if (ab.dmg) parts.push(`${ab.dmg} ${ab.type}`);
    if (ab.heal) parts.push(`heal ${ab.heal}`);
    if (ab.save) parts.push(`${ab.save} save DC ${actor.spellDC || 15}`);
    if (ab.radius) parts.push(`${ab.radius * 5}ft radius AoE`);
    if (ab.kind === 'attack') parts.push(`+${ab.weapon ? actor.attackMod : (actor.spellAttack || 6)} to hit`);
    if (ab.kind === 'auto') parts.push('auto-hit');
    if (ab.centerSelf) parts.push(`${ab.radius * 5 + 5}ft around self`);
    else if (ab.range) parts.push(ab.range <= 1 ? 'touch' : `${ab.range * 5}ft range`);
    if (ab.bonus) parts.push('bonus action');
    if (ab.uses) parts.push(`${Math.max(0, ab.uses - ((actor.abilityUses || {})[id] || 0))} use left`);
    return `${ab.name} [${parts.join(' • ')}]`;
  }

  // ==========================================
  // DAMAGE, HEALING & SAVES
  // ==========================================
  function pushFloater(ent, text, color) {
    cState.effects.push({ text, x: ent.x * cState.tileSize + cState.tileSize / 2, y: ent.y * cState.tileSize + cState.tileSize / 2, color, life: 40, offset: 0 });
  }

  function syncPartyHp(ent) {
    if (!ent.partyId) return;
    const pc = (worldState.data.partyCharacters || []).find(p => p.id === ent.partyId);
    if (pc) {
      pc.hpCurrent = ent.hp;
      worldState.saveData();
    }
  }

  // 5.5e Condition Automation & Concentration Save Engine
  function getEntityConditions(unit) {
    if (!unit) return [];
    const local = Array.isArray(unit.conditions) ? unit.conditions : [];
    if (unit.team === 'player') {
      const pc = (worldState.data.partyCharacters || []).find(c => c.id === (unit.partyCharId || unit.id));
      if (pc && Array.isArray(pc.conditions)) {
        return Array.from(new Set([...local, ...pc.conditions]));
      }
    }
    return local;
  }

  function getConditionCombatEffects(attacker, target, isMelee = true) {
    const atkConds = getEntityConditions(attacker).map(c => c.toLowerCase());
    const tgtConds = getEntityConditions(target).map(c => c.toLowerCase());
    let hasAdv = false;
    let hasDis = false;
    let autoCrit = false;
    let blessed = atkConds.includes('blessed');

    if (atkConds.includes('poisoned') || atkConds.includes('blinded') || atkConds.includes('prone') || atkConds.includes('restrained')) {
      hasDis = true;
    }
    if (atkConds.includes('invisible') || atkConds.includes('advantage')) {
      hasAdv = true;
    }
    if (tgtConds.includes('paralyzed') || tgtConds.includes('unconscious')) {
      hasAdv = true;
      if (isMelee) autoCrit = true;
    }
    if (tgtConds.includes('stunned') || tgtConds.includes('restrained') || tgtConds.includes('blinded')) {
      hasAdv = true;
    }
    if (tgtConds.includes('prone')) {
      if (isMelee) hasAdv = true;
      else hasDis = true;
    }

    let resolvedMode = 'NORMAL';
    if (hasAdv && !hasDis) resolvedMode = 'ADVANTAGE';
    else if (hasDis && !hasAdv) resolvedMode = 'DISADVANTAGE';
    return { resolvedMode, autoCrit, blessed };
  }

  function checkConcentrationSave(target, damageAmount) {
    if (!target || !target.concentratingOn || damageAmount <= 0 || target.hp <= 0) {
      if (target && target.hp <= 0 && target.concentratingOn) {
        logMsg(`💫 ${target.name} drops concentration on ${target.concentratingOn} (incapacitated).`, '#fbbf24');
        target.concentratingOn = null;
      }
      return null;
    }
    const dc = Math.max(10, Math.floor(damageAmount / 2));
    const pc = (worldState.data.partyCharacters || []).find(c => c.id === (target.partyCharId || target.id));
    const hasWarCaster = pc && Array.isArray(pc.feats) && pc.feats.some(f => String(f).toLowerCase().includes('war caster'));
    const r = rollWithMode(hasWarCaster ? 'ADVANTAGE' : 'NORMAL');
    const mod = computeSaveMod(target, 'CON');
    const total = r.d20 + mod;
    const kept = total >= dc;
    if (kept) {
      logMsg(`🧠 ${target.name} maintains Concentration on ${target.concentratingOn}! (CON Save ${total} vs DC ${dc}${hasWarCaster ? ', War Caster Adv' : ''})`, '#38bdf8');
    } else {
      logMsg(`💥 ${target.name} LOSES Concentration on ${target.concentratingOn}! (CON Save ${total} vs DC ${dc})`, '#f87171');
      pushFloater(target, 'CONC LOST', '#f87171');
      target.concentratingOn = null;
    }
    return { dc, total, kept, hasWarCaster };
  }

  function applyDamage(target, amount, type, sourceName) {
    target.hp = Math.max(0, target.hp - amount);
    pushFloater(target, `-${amount}`, '#ef4444');
    syncPartyHp(target);
    if (target.hp === 0) {
      if (target.team === 'player') logMsg(`💀 ${target.name} drops to 0 HP and falls unconscious!`, '#f87171');
      else logMsg(`☠ ${target.name} is slain${sourceName ? ` by ${sourceName}` : ''}!`, '#fbbf24');
    }
    if (target.concentratingOn) {
      checkConcentrationSave(target, amount);
    }
  }

  function applyHeal(target, amount) {
    const wasDown = target.hp <= 0;
    target.hp = Math.min(target.maxHp, target.hp + amount);
    pushFloater(target, `+${amount}`, '#4ade80');
    syncPartyHp(target);
    if (wasDown && target.hp > 0) logMsg(`✨ ${target.name} is revived and back on their feet!`, '#4ade80');
  }

  function computeSaveMod(unit, statKey) {
    const key = statKey.toLowerCase();
    if (unit.stats && unit.stats[key] !== undefined) {
      let mod = statMod(unit.stats[key]);
      if (unit.classRole) {
        const role = unit.classRole.toLowerCase();
        const pb = Math.ceil(1 + (unit.level || 5) / 4);
        if ((role.includes('barbarian') && (statKey === 'STR' || statKey === 'CON')) ||
            (role.includes('fighter') && (statKey === 'STR' || statKey === 'CON')) ||
            (role.includes('cleric') && (statKey === 'WIS' || statKey === 'CHA')) ||
            (role.includes('rogue') && (statKey === 'DEX' || statKey === 'INT')) ||
            (role.includes('ranger') && (statKey === 'STR' || statKey === 'DEX')) ||
            (role.includes('wizard') && (statKey === 'INT' || statKey === 'WIS'))) {
          mod += pb;
        }
      }
      return mod;
    }
    const name = unit.name.toLowerCase();
    if (name.includes('goblin')) return statKey === 'DEX' ? 2 : (statKey === 'STR' ? -1 : 0);
    if (name.includes('troll')) return statKey === 'CON' ? 5 : (statKey === 'STR' ? 4 : (statKey === 'DEX' ? 1 : -1));
    if (name.includes('dragon')) return statKey === 'STR' ? 4 : (statKey === 'DEX' ? 1 : (statKey === 'CON' ? 3 : 2));
    if (name.includes('orc')) return statKey === 'STR' ? 3 : (statKey === 'CON' ? 3 : (statKey === 'INT' ? -2 : 0));
    if (name.includes('skeleton')) return statKey === 'DEX' ? 2 : (statKey === 'CON' ? 2 : -1);
    if (name.includes('owlbear')) return statKey === 'STR' ? 5 : (statKey === 'CON' ? 3 : 1);
    return 2;
  }

  function rollerLabel(unit) {
    return unit.team === 'player' && unit.playerName ? `${unit.name} (${unit.playerName})` : unit.name;
  }

  // Auto-rolls a saving throw for any unit (players use their real sheet stats)
  function rollSaveFor(unit, statKey, dc, sourceLabel) {
    const mod = computeSaveMod(unit, statKey);
    const d20 = rollD20();
    const total = d20 + mod;
    const success = total >= dc;
    const entry = {
      rollerName: rollerLabel(unit),
      rollerAvatar: unit.avatar || '🎲',
      rollType: 'save',
      label: `${statKey} Saving Throw`,
      formula: `1d20 (${d20}) ${mod >= 0 ? '+' : '-'} ${Math.abs(mod)}`,
      d20Result: d20,
      total,
      dc,
      success,
      advantageMode: 'normal',
      note: `vs ${sourceLabel}`
    };
    worldState.logDiceRoll(entry);
    appendRollToCombatLog(entry);
    return success;
  }

  function rollWithMode(mode) {
    const d1 = rollD20(), d2 = rollD20();
    if (mode === 'ADVANTAGE') return { d20: Math.max(d1, d2), text: `1d20 [ADV: ${d1}, ${d2}]` };
    if (mode === 'DISADVANTAGE') return { d20: Math.min(d1, d2), text: `1d20 [DIS: ${d1}, ${d2}]` };
    return { d20: d1, text: `1d20 (${d1})` };
  }

  function makeAttackRoll(actor, target, bonus, label, dmgFormula, dmgType, advMode = 'NORMAL') {
    const isMelee = dist(actor, target) <= 1;
    const condFx = getConditionCombatEffects(actor, target, isMelee);
    const effectiveMode = advMode !== 'NORMAL' ? advMode : condFx.resolvedMode;
    const r = rollWithMode(effectiveMode);
    const blessBonus = condFx.blessed ? (Math.floor(Math.random() * 4) + 1) : 0;
    const total = r.d20 + bonus + blessBonus;
    const hit = r.d20 === 20 || (r.d20 !== 1 && total >= target.ac);
    const crit = r.d20 === 20 || (hit && condFx.autoCrit);
    const entry = {
      rollerName: rollerLabel(actor),
      rollerAvatar: actor.avatar || '🎲',
      rollType: 'attack',
      label: `${label} → ${target.name}`,
      formula: `${r.text} ${bonus >= 0 ? '+' : '-'} ${Math.abs(bonus)}${blessBonus ? ` + ${blessBonus} (Bless)` : ''}`,
      d20Result: r.d20,
      total,
      dc: target.ac,
      success: hit,
      advantageMode: effectiveMode.toLowerCase(),
      note: `vs AC ${target.ac}${condFx.autoCrit ? ' [AUTO-CRIT]' : ''}`
    };
    worldState.logDiceRoll(entry);
    appendRollToCombatLog(entry);
    if (hit) {
      const dmg = rollDice(dmgFormula, crit).total;
      logMsg(`${crit ? '💥 CRITICAL! ' : ''}${actor.name}'s ${label} hits ${target.name} for ${dmg} ${dmgType} damage.`, isHostile(actor, { team: 'player' }) ? '#f87171' : '#4ade80');
      applyDamage(target, dmg, dmgType, actor.name);
    } else {
      logMsg(`${actor.name}'s ${label} misses ${target.name}.`, '#94a3b8');
      pushFloater(target, 'MISS', '#94a3b8');
    }
    return hit;
  }

  function performWeaponAttack(actor, target, advMode = 'NORMAL') {
    return makeAttackRoll(actor, target, actor.attackMod || 4, actor.weaponName || 'Strike', actor.dmgFormula || '1d6+2', actor.dmgType || 'slashing', advMode);
  }

  // Execute a spell / ability. Hostile casters (enemies, hostile NPCs) target the party the same way players target enemies.
  function executeAbility(actor, id, target, tile, advMode = 'NORMAL') {
    const ab = ABILITIES[id];
    if (!ab) return false;
    const slotUsed = spendSlot(actor, ab.level);
    if (actor.team === 'player' && ab.level > 0 && typeof worldState.spendSpellSlot === 'function') {
      worldState.spendSpellSlot(actor.partyCharId || actor.id, ab.level);
    }
    if (ab.uses) {
      actor.abilityUses = actor.abilityUses || {};
      actor.abilityUses[id] = (actor.abilityUses[id] || 0) + 1;
    }
    const dc = actor.spellDC || 13;
    const castLabel = `${actor.name} uses ${ab.name}${slotUsed ? ` (Lvl ${slotUsed} slot)` : ''}`;
    const castColor = sideOf(actor) === 'foe' ? '#fb7185' : '#c084fc';

    if (ab.kind === 'attack') {
      logMsg(`${castLabel} at ${target.name}.`, castColor);
      makeAttackRoll(actor, target, ab.weapon ? actor.attackMod : actor.spellAttack, ab.name, ab.dmg, ab.type, advMode);
    } else if (ab.kind === 'auto') {
      const dmg = rollDice(ab.dmg).total;
      logMsg(`${castLabel}: ${target.name} takes ${dmg} ${ab.type} damage (auto-hit).`, castColor);
      applyDamage(target, dmg, ab.type, actor.name);
    } else if (ab.kind === 'save') {
      logMsg(`${castLabel} on ${target.name} (${ab.save} save DC ${dc}).`, castColor);
      const saved = rollSaveFor(target, ab.save, dc, `${actor.name}'s ${ab.name}`);
      const full = rollDice(ab.dmg).total;
      const dmg = saved ? (ab.half ? Math.floor(full / 2) : 0) : full;
      if (dmg > 0) {
        logMsg(`  ↳ ${target.name} ${saved ? 'partially resists and' : ''} takes ${dmg} ${ab.type} damage.`, castColor);
        applyDamage(target, dmg, ab.type, actor.name);
      } else {
        logMsg(`  ↳ ${target.name} avoids the effect entirely.`, '#94a3b8');
        pushFloater(target, 'SAVED', '#93c5fd');
      }
    } else if (ab.kind === 'aoe') {
      const center = ab.centerSelf ? { x: actor.x, y: actor.y } : tile;
      logMsg(`${castLabel} centred on (${center.x}, ${center.y}) — ${ab.save} save DC ${dc}!`, castColor);
      cState.effects.push({ kind: 'aoe', gx: center.x, gy: center.y, radius: ab.radius, color: ab.type === 'cold' ? '#38bdf8' : (ab.type === 'thunder' ? '#a78bfa' : '#f97316'), life: 30, maxLife: 30 });
      const victims = cState.entities.filter(e => e.hp > 0 && dist(e, center) <= ab.radius && !(ab.centerSelf && e.id === actor.id));
      if (victims.length === 0) logMsg('  ↳ No creatures caught in the area.', '#94a3b8');
      const full = rollDice(ab.dmg).total;
      victims.forEach(v => {
        const saved = rollSaveFor(v, ab.save, dc, `${actor.name}'s ${ab.name}`);
        const dmg = saved ? (ab.half ? Math.floor(full / 2) : 0) : full;
        logMsg(`  ↳ ${v.name} ${saved ? 'saves and takes' : 'fails and takes'} ${dmg} ${ab.type} damage.`, castColor);
        if (dmg > 0) applyDamage(v, dmg, ab.type, actor.name);
      });
    } else if (ab.kind === 'heal') {
      const amt = rollDice(ab.heal).total;
      logMsg(`${castLabel} on ${target.name}, restoring ${amt} HP.`, '#4ade80');
      applyHeal(target, amt);
    } else if (ab.kind === 'teleport') {
      actor.x = tile.x;
      actor.y = tile.y;
      logMsg(`${castLabel} and teleports to (${tile.x}, ${tile.y}).`, castColor);
    }
    return true;
  }

  function markActionSpent(actor, ab) {
    if (ab && ab.bonus) actor.bonusUsed = true;
    else actor.actionUsed = true;
  }

  function handleActionClick(gx, gy, clickedEntity) {
    const actor = cState.selectedEntity;
    if (!actor) return;
    if (!worldState.canControlCharacter(actor.id, actor)) {
      notifyToast(`You cannot control ${actor.name}! (Controlled by ${worldState.getCharacterOwnerName(actor.id, actor)})`);
      return;
    }
    if (actor.hp <= 0) return notifyToast(`${actor.name} is unconscious.`);
    const act = cState.selectedAction;
    const c = cState.combat;

    if (act === 'MOVE') {
      if (c.active) {
        const cur = currentTurnEntity();
        if (c.aiRunning) return notifyToast('Wait for the current NPC turn to finish.');
        if (!cur || cur.id !== actor.id) return notifyToast(`It is not ${actor.name}'s turn.`);
      }
      if (clickedEntity) return notifyToast('Space occupied!');
      const d = Math.max(Math.abs(actor.x - gx), Math.abs(actor.y - gy));
      if (c.active && d > actor.movementLeft) return notifyToast(`Not enough movement! (${actor.movementLeft * 5}ft left)`);
      actor.x = gx;
      actor.y = gy;
      if (c.active) actor.movementLeft -= d;
      logMsg(`${actor.name} moves ${d * 5}ft.`, 'var(--text-primary)');
      if (c.active && actor.movementLeft > 0) {
        updateActionUi();
        renderTurnUi();
        return; // keep MOVE selected while movement remains
      }
    } else if (act === 'ATTACK') {
      const chk = canAct(actor, false);
      if (!chk.ok) return notifyToast(chk.reason);
      if (!clickedEntity || clickedEntity.hp <= 0 || !isHostile(actor, clickedEntity)) return notifyToast('Target a hostile creature!');
      if (dist(actor, clickedEntity) > (actor.reach || 1)) return notifyToast('Target out of melee reach! Use a ranged ability or move closer.');
      performWeaponAttack(actor, clickedEntity, cState.advantageMode);
      actor.actionUsed = true;
    } else if (act === 'CAST') {
      const id = cState.selectedSpellId;
      const ab = ABILITIES[id];
      if (!ab) return notifyToast('Choose a spell or ability first.');
      const isDm = Boolean(worldState.prefs && worldState.prefs.dmMode);
      if (!isDm) {
        const chk = canAct(actor, !!ab.bonus);
        if (!chk.ok) return notifyToast(chk.reason);
        if (!usableAbilities(actor).includes(id)) return notifyToast(`${ab.name} is unavailable (no slots / uses left).`);
      }

      const tile = { x: gx, y: gy };
      if (ab.kind === 'attack' || ab.kind === 'auto' || ab.kind === 'save') {
        if (!clickedEntity || clickedEntity.hp <= 0 || !isHostile(actor, clickedEntity)) return notifyToast('Target a hostile creature!');
        if (dist(actor, clickedEntity) > ab.range) return notifyToast(`Out of range (${ab.range * 5}ft).`);
        executeAbility(actor, id, clickedEntity, tile, cState.advantageMode);
      } else if (ab.kind === 'heal') {
        if (!clickedEntity || isHostile(actor, clickedEntity)) return notifyToast('Target a friendly creature to heal!');
        if (dist(actor, clickedEntity) > ab.range) return notifyToast(`Out of range (${ab.range <= 1 ? 'touch' : ab.range * 5 + 'ft'}).`);
        executeAbility(actor, id, clickedEntity, tile);
      } else if (ab.kind === 'aoe') {
        // AoE spells target any square on the map within range (e.g. Fireball)
        if (!ab.centerSelf && dist(actor, tile) > ab.range) {
          return notifyToast(`Target square is out of range (${ab.range * 5}ft max).`);
        }
        executeAbility(actor, id, null, tile);
      } else if (ab.kind === 'teleport') {
        if (clickedEntity) return notifyToast('Tile occupied!');
        if (dist(actor, tile) > ab.range) return notifyToast(`Out of range (${ab.range * 5}ft).`);
        executeAbility(actor, id, null, tile);
      }
      markActionSpent(actor, ab);
    }
    cState.selectedAction = null;
    updateActionUi();
    renderTurnUi();
    checkCombatEnd();
  }

  function populateAbilitySelect(actor) {
    const spellSelect = container.querySelector('#combat-spell-select');
    if (!spellSelect) return;
    const isDm = Boolean(worldState.prefs && worldState.prefs.dmMode);
    const unitIds = (actor.abilities || []).filter(id => ABILITIES[id]);
    const usable = usableAbilities(actor);

    const aoeIds = ['fireball', 'thunderwave', 'frost_breath', 'fire_breath'];
    const attackIds = ['magic_missile', 'scorching_ray', 'firebolt', 'sacred_flame', 'guiding_bolt', 'ember_hex', 'terrify_roar', 'shortbow', 'longbow', 'javelin', 'psychic_blade'];
    const utilityIds = ['cure_wounds', 'healing_word', 'misty_step'];

    const renderOpt = (id) => {
      const ab = ABILITIES[id];
      if (!ab) return '';
      const available = isDm || usable.includes(id);
      return `<option value="${id}" ${available ? '' : 'disabled'}>${describeAbility(actor, id)}${available ? '' : ' — unavailable'}</option>`;
    };

    let html = '';
    if (unitIds.length > 0) {
      html += `<optgroup label="Unit Prepared Spells & Abilities">` + unitIds.map(renderOpt).join('') + `</optgroup>`;
    }
    html += `<optgroup label="💥 Area of Effect (AoE) & Ground Spells">` + aoeIds.map(renderOpt).join('') + `</optgroup>`;
    html += `<optgroup label="⚔️ Single-Target Spells & Attacks">` + attackIds.filter(id => !unitIds.includes(id)).map(renderOpt).join('') + `</optgroup>`;
    html += `<optgroup label="✨ Healing, Utility & Teleport">` + utilityIds.filter(id => !unitIds.includes(id)).map(renderOpt).join('') + `</optgroup>`;

    const sig = actor.id + '|' + isDm;
    if (spellSelect.dataset.sig !== sig) {
      spellSelect.innerHTML = html;
      spellSelect.dataset.sig = sig;
    }

    if (!cState.selectedSpellId || !ABILITIES[cState.selectedSpellId]) {
      cState.selectedSpellId = unitIds[0] || 'fireball';
    }
    spellSelect.value = cState.selectedSpellId;
  }

  function updateActionUi() {
    const actor = cState.selectedEntity;
    const info = container.querySelector('#combat-active-unit-info');
    const controls = container.querySelector('#combat-action-controls');
    const spellSelect = container.querySelector('#combat-spell-select');
    const unitSavePanel = container.querySelector('#combat-unit-save-panel');
    const dmPushPanel = container.querySelector('#combat-dm-push-panel');
    const isDm = Boolean(worldState.prefs && worldState.prefs.dmMode);

    container.querySelectorAll('.combat-act-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.action === cState.selectedAction);
    });

    if (actor) {
      const canControl = worldState.canControlCharacter(actor.id, actor);
      const ownerName = worldState.getCharacterOwnerName(actor.id, actor);
      const cur = currentTurnEntity();
      const isTurn = cState.combat.active && cur && cur.id === actor.id;
      const teamLabel = actor.team === 'player' ? 'Player' : (actor.team === 'ally' ? 'Allied NPC' : 'Enemy');
      const teamBg = actor.team === 'player' ? 'rgba(59, 130, 246, 0.2)' : (actor.team === 'ally' ? 'rgba(20, 184, 166, 0.2)' : 'rgba(239, 68, 68, 0.2)');
      const teamFg = actor.team === 'player' ? '#93c5fd' : (actor.team === 'ally' ? '#5eead4' : '#fca5a5');
      const slots = actor.spellSlots && Object.keys(actor.spellSlots).length
        ? Object.keys(actor.spellSlots).map(l => `L${l}: ${actor.spellSlots[l].current}/${actor.spellSlots[l].max}`).join(' · ')
        : '';

      info.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
          <span style="font-size: 0.85rem; font-weight: bold; color: var(--text-gold); background: var(--bg-tertiary); padding: 2px 6px; border-radius: 4px;">${actor.avatar || actor.name.substring(0, 2).toUpperCase()}</span>
          <div>
            <strong style="color: var(--text-gold); font-size: 0.9rem;">${actor.name}</strong>
            <span style="font-size: 0.7rem; color: var(--text-muted); margin-left: 0.35rem;">(AC ${actor.ac})</span>
            <span class="badge" style="font-size: 0.65rem; margin-left: 0.35rem; background: ${teamBg}; color: ${teamFg};">${teamLabel}</span>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-secondary);">
          <span>HP: <strong style="color: ${actor.hp <= 0 ? '#f87171' : '#4ade80'};">${actor.hp}</strong> / ${actor.maxHp}</span>
          <span>Move: <strong style="color: #60a5fa;">${actor.movementLeft * 5}</strong>/${actor.speed * 5}ft</span>
        </div>
        ${slots ? `<div style="font-size: 0.68rem; color: #c4b5fd; margin-top: 0.2rem;">Spell slots: ${slots}</div>` : ''}
        ${cState.combat.active ? `
          <div style="margin-top: 0.3rem; font-size: 0.7rem; color: ${isTurn ? '#fbbf24' : 'var(--text-muted)'};">
            ${isTurn ? '▶ Acting now' : `⏳ Waiting — current turn: ${cur ? cur.name : '—'}`}
          </div>
        ` : ''}
        ${!canControl ? `
          <div style="margin-top: 0.45rem; padding: 0.35rem 0.55rem; background: rgba(148, 163, 184, 0.08); border: 1px dashed rgba(148, 163, 184, 0.35); border-radius: var(--radius-sm); font-size: 0.7rem; color: var(--text-muted); display: flex; align-items: center; justify-content: space-between;">
            <span>🔒 Controlled by: <strong style="color: var(--text-gold);">${ownerName}</strong></span>
            <span class="badge" style="background: rgba(244, 67, 54, 0.15); color: #fca5a5; font-size: 0.65rem;">Read-Only</span>
          </div>
        ` : ''}
      `;

      // ONLY the player who owns this character or the DM has action controls
      if (canControl && actor.hp > 0) {
        controls.style.display = 'flex';
        populateAbilitySelect(actor);
        spellSelect.style.display = 'block';
        if (cState.selectedAction === 'CAST') {
          spellSelect.style.border = '1px solid #fbbf24';
          spellSelect.style.boxShadow = '0 0 10px rgba(251, 191, 36, 0.45)';
        } else {
          spellSelect.style.border = '1px solid var(--border-subtle)';
          spellSelect.style.boxShadow = 'none';
        }
      } else {
        controls.style.display = 'none';
        spellSelect.style.display = 'none';
      }

      // 1. Show Saving Throws panel for DM controlled units (ONLY for DM)
      if (unitSavePanel) unitSavePanel.style.display = isDm ? 'block' : 'none';

      // 2. Show Push Request panel if DM mode active AND a Player Character is selected
      if (dmPushPanel) {
        if (isDm && actor.team === 'player') {
          dmPushPanel.style.display = 'block';
          const targetLbl = container.querySelector('#combat-push-target-label');
          if (targetLbl) targetLbl.textContent = actor.playerName || actor.name;
        } else {
          dmPushPanel.style.display = 'none';
        }
      }
    } else {
      info.innerHTML = cState.combat.active ? 'Select a unit on the battlemat.' : 'Select a unit on the battlemat to reposition it.';
      controls.style.display = 'none';
      spellSelect.style.display = 'none';
      if (unitSavePanel) unitSavePanel.style.display = 'none';
      if (dmPushPanel) dmPushPanel.style.display = 'none';
    }
  }
  // Helper: Append a real-time roll into the combat log stream
  function appendRollToCombatLog(roll) {
    const stream = container.querySelector('#combat-log-stream');
    if (!stream) return;
    const el = document.createElement('div');
    el.className = 'combat-roll-log-entry';
    el.style.borderLeft = roll.success === true ? '3px solid #22c55e' : (roll.success === false ? '3px solid #ef4444' : '3px solid var(--text-gold)');
    el.style.background = 'rgba(255, 255, 255, 0.04)';
    el.style.padding = '3px 6px';
    el.style.borderRadius = '3px';
    el.style.margin = '2px 0';
    el.style.lineHeight = '1.3';

    const outcome = roll.success === true ? '<span style="color: #4ade80; font-weight: bold;">[SUCCESS]</span>' : (roll.success === false ? '<span style="color: #f87171; font-weight: bold;">[FAILED]</span>' : '');
    const critBadge = roll.isCrit ? '<span style="color: #4ade80; font-weight: bold;">[NAT 20!]</span> ' : (roll.isNat1 ? '<span style="color: #f87171; font-weight: bold;">[NAT 1!]</span> ' : '');

    el.innerHTML = `
      <div style="display: flex; justify-content: space-between; font-size: 0.7rem;">
        <span style="color: var(--text-gold); font-weight: bold;">🎲 ${roll.rollerName}</span>
        <span style="color: var(--text-muted); font-size: 0.65rem;">${roll.timeStr || ''}</span>
      </div>
      <div style="font-size: 0.72rem; color: var(--text-primary);">
        ${critBadge}<strong>${roll.label}</strong>: ${roll.formula} = <strong style="color: var(--text-gold); font-size: 0.8rem;">${roll.total}</strong> ${outcome}
      </div>
      ${roll.note ? `<div style="font-size: 0.65rem; color: var(--text-secondary); font-style: italic;">↳ "${roll.note}"</div>` : ''}
    `;
    stream.appendChild(el);
    stream.scrollTop = stream.scrollHeight;
  }

  // Roll Saving Throw for DM-controlled unit
  function rollUnitSavingThrow(unit, statKey, dcVal) {
    const dc = dcVal ? parseInt(dcVal, 10) : null;
    const mod = computeSaveMod(unit, statKey);

    const d1 = Math.floor(Math.random() * 20) + 1;
    const d2 = Math.floor(Math.random() * 20) + 1;
    let d20 = d1;
    let formula = `1d20 (${d1})`;
    if (cState.advantageMode === 'ADVANTAGE') {
      d20 = Math.max(d1, d2);
      formula = `1d20 [ADV: ${d1}, ${d2} -> ${d20}]`;
    } else if (cState.advantageMode === 'DISADVANTAGE') {
      d20 = Math.min(d1, d2);
      formula = `1d20 [DIS: ${d1}, ${d2} -> ${d20}]`;
    }

    const total = d20 + mod;
    formula += mod >= 0 ? ` + ${mod}` : ` - ${Math.abs(mod)}`;
    const isCrit = d20 === 20;

    soundEngine.playDiceRoll(isCrit);

    const isSuccess = dc !== null ? total >= dc : null;

    const rollEntry = {
      rollerName: `${unit.name} (DM)`,
      rollerAvatar: unit.avatar || 'DM',
      rollType: 'save',
      label: `${statKey} Saving Throw`,
      formula,
      d20Result: d20,
      total,
      dc,
      success: isSuccess,
      advantageMode: cState.advantageMode.toLowerCase(),
      note: `Tactical Unit Save vs DC ${dc || 'None'}`
    };

    worldState.logDiceRoll(rollEntry);
    appendRollToCombatLog(rollEntry);

    const msg = `${unit.name} rolls ${statKey} Save: ${total}${dc ? (isSuccess ? ' (SUCCESS)' : ' (FAILED)') : ''}`;
    notifyToast(msg);
  }

  // Push Roll Request from DM to Player selected on battlemap
  function pushRequestToSelectedPlayer(playerUnit, saveType, dcVal, reasonVal) {
    const pData = (worldState.data.partyCharacters || []).find(p => p.id === playerUnit.id || p.name === playerUnit.name);
    const targetPlayerName = pData ? `${pData.playerName || pData.name} (${pData.name})` : playerUnit.name;
    const targetCharId = pData ? pData.id : playerUnit.id;
    const isSave = saveType.startsWith('save_');
    const ability = saveType.replace('save_', '').replace('check_', '');
    const dc = dcVal ? parseInt(dcVal, 10) : null;
    const reason = reasonVal || 'Combat Encounter Threat';

    worldState.pushRollRequest({
      targetCharId,
      targetPlayerName,
      requestedBy: 'DM',
      type: isSave ? 'save' : 'check',
      ability,
      dc,
      reason
    });

    soundEngine.playDiceRoll(false);
    notifyToast(`⚡ Pushed ${ability} ${isSave ? 'Save' : 'Check'} request to ${targetPlayerName}!`);
    logMsg(`⚡ DM pushed ${ability} ${isSave ? 'Save' : 'Check'} request (DC ${dc || 'None'}) to ${targetPlayerName}`, '#38bdf8');
    renderCombatPendingBanner();
  }

  // Render Pending DM Request Banner on Combat Screen
  function renderCombatPendingBanner() {
    const bannerBox = container.querySelector('#combat-pending-banner-container');
    if (!bannerBox) return;

    const activeHero = typeof worldState.getActiveHero === 'function' ? worldState.getActiveHero() : null;
    const isDm = Boolean(worldState.prefs && worldState.prefs.dmMode);

    const pending = typeof worldState.getPendingRollRequests === 'function'
      ? (isDm ? (worldState.data.pendingRollRequests || []) : worldState.getPendingRollRequests(activeHero ? activeHero.id : null))
      : [];

    if (pending.length === 0) {
      bannerBox.style.display = 'none';
      bannerBox.innerHTML = '';
      return;
    }

    const req = pending[0];
    const ability = req.ability || 'DEX';
    const isSave = req.type === 'save';
    const hero = activeHero || (worldState.data.partyCharacters || [])[0];
    const heroStats = (hero && hero.stats) || {};
    const mod = Math.floor(((heroStats[ability.toLowerCase()] || 10) - 10) / 2);
    const modStr = mod >= 0 ? '+' + mod : String(mod);
    const canResolve = isDm || (req.targetCharId === 'ALL') || worldState.canControlCharacter(req.targetCharId);

    bannerBox.style.display = 'block';
    bannerBox.innerHTML = `
      <div class="roll-request-banner" style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(185, 28, 28, 0.25)); border: 1px solid #f59e0b; border-radius: var(--radius-sm); padding: 0.5rem 0.75rem;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <strong style="color: #fbbf24; font-size: 0.8rem; display: flex; align-items: center; gap: 0.35rem;">
            ⚡ DM REQUEST: ${ability} ${isSave ? 'Saving Throw' : 'Check'} ${req.dc ? `(DC ${req.dc})` : ''}
          </strong>
          <span style="font-size: 0.7rem; color: var(--text-muted);">${req.targetPlayerName || 'You'}</span>
        </div>
        ${req.reason ? `<div style="font-size: 0.72rem; color: var(--text-secondary); font-style: italic; margin: 2px 0;">"${req.reason}"</div>` : ''}
        ${canResolve ? `
          <div style="display: flex; gap: 0.35rem; margin-top: 0.3rem;">
            <button class="btn btn-sm btn-primary combat-resolve-req-btn" data-adv="normal" style="flex: 1; font-size: 0.75rem; padding: 3px 6px;">
              🎲 Roll ${ability} Save (${modStr})
            </button>
            <button class="btn btn-sm combat-resolve-req-btn" data-adv="adv" style="font-size: 0.75rem; padding: 3px 6px; color: #4ade80;">
              Adv
            </button>
            <button class="btn btn-sm combat-resolve-req-btn" data-adv="dis" style="font-size: 0.75rem; padding: 3px 6px; color: #f87171;">
              Dis
            </button>
            ${isDm ? `
              <button class="btn btn-sm combat-dismiss-req-btn" style="background: none; border: 1px solid rgba(255,255,255,0.2); font-size: 0.7rem; padding: 2px 6px;">✕</button>
            ` : ''}
          </div>
        ` : `
          <div style="font-size: 0.72rem; color: var(--text-muted); font-style: italic; margin-top: 0.3rem;">
            ⏳ Awaiting roll from <strong style="color: var(--text-gold);">${req.targetPlayerName}</strong>... (Only character owner or DM can roll)
          </div>
        `}
      </div>
    `;

    bannerBox.querySelectorAll('.combat-resolve-req-btn').forEach(b => {
      b.addEventListener('click', () => {
        const advMode = b.getAttribute('data-adv') || 'normal';
        resolvePlayerPromptRoll(req, hero, advMode);
      });
    });

    const dismissBtn = bannerBox.querySelector('.combat-dismiss-req-btn');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', () => {
        worldState.dismissRollRequest(req.id);
        renderCombatPendingBanner();
      });
    }
  }

  function resolvePlayerPromptRoll(req, hero, advMode) {
    const ability = req.ability || 'DEX';
    const isSave = req.type === 'save';
    const dc = req.dc;
    const reason = req.reason || '';

    const heroStats = (hero && hero.stats) || {};
    const baseMod = Math.floor(((heroStats[ability.toLowerCase()] || 10) - 10) / 2);
    let pb = 2;
    if (hero && hero.level) pb = Math.ceil(1 + hero.level / 4);
    let profBonus = 0;
    if (isSave && hero && hero.classRole) {
      const role = hero.classRole.toLowerCase();
      if ((role.includes('barbarian') && (ability === 'STR' || ability === 'CON')) ||
          (role.includes('cleric') && (ability === 'WIS' || ability === 'CHA')) ||
          (role.includes('rogue') && (ability === 'DEX' || ability === 'INT')) ||
          (role.includes('wizard') && (ability === 'INT' || ability === 'WIS'))) {
        profBonus = pb;
      }
    }
    const totalMod = baseMod + profBonus;

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

    const total = d20 + totalMod;
    formula += totalMod >= 0 ? ` + ${totalMod}` : ` - ${Math.abs(totalMod)}`;
    const isCrit = d20 === 20;

    soundEngine.playDiceRoll(isCrit);

    const isSuccess = dc !== null ? total >= dc : null;
    let rollerName = hero ? hero.name : 'Adventurer';
    if (hero && hero.playerName) rollerName += ` (${hero.playerName})`;

    const rollEntry = {
      rollerName,
      rollerAvatar: hero ? (hero.avatar || 'PC') : '🎲',
      rollType: isSave ? 'save' : 'check',
      label: `${ability} ${isSave ? 'Saving Throw' : 'Check'}`,
      formula,
      d20Result: d20,
      total,
      dc,
      success: isSuccess,
      advantageMode: advMode,
      note: reason
    };

    worldState.resolveRollRequest(req.id, rollEntry);
    appendRollToCombatLog(rollEntry);
    notifyToast(`${rollerName} rolled ${total}${dc ? (isSuccess ? ' (SUCCESS)' : ' (FAILED)') : ''}`);
    renderCombatPendingBanner();
  }

  // ==========================================
  // INITIATIVE & TURN SEQUENCING ENGINE
  // ==========================================
  function rollInitiative() {
    const alive = cState.entities.filter(e => e.hp > 0);
    if (alive.length === 0) return;

    logMsg('⚔️ --- INITIATIVE ROLLS ---', 'var(--text-gold)');
    const rolls = alive.map(ent => {
      const d20 = rollD20();
      const bonus = ent.init !== undefined ? ent.init : (statMod(ent.stats?.dex) || 0);
      const total = d20 + bonus;
      const entry = {
        rollerName: rollerLabel(ent),
        rollerAvatar: ent.avatar || '🎲',
        rollType: 'initiative',
        label: 'Initiative',
        formula: `1d20 (${d20}) ${bonus >= 0 ? '+' : '-'} ${Math.abs(bonus)}`,
        d20Result: d20,
        total,
        dc: null,
        success: null,
        advantageMode: 'normal',
        note: `Combat Turn Order`
      };
      worldState.logDiceRoll(entry);
      appendRollToCombatLog(entry);
      return { ent, total, tieBreaker: bonus };
    });

    // Sort descending by initiative, then by dex bonus
    rolls.sort((a, b) => b.total - a.total || b.tieBreaker - a.tieBreaker);

    cState.combat.active = true;
    cState.combat.round = 1;
    cState.combat.turnIndex = 0;
    cState.combat.order = rolls.map(r => r.ent.id);

    // Announce order in combat log
    const orderStr = rolls.map((r, i) => `${i + 1}. ${r.ent.name} (${r.total})`).join(' → ');
    logMsg(`Turn Order: ${orderStr}`, '#38bdf8');

    updatePhaseHeader();
    startTurn(cState.combat.order[0]);
  }

  function startTurn(entityId) {
    const ent = cState.entities.find(e => e.id === entityId);
    if (!ent || ent.hp <= 0) {
      advanceTurn();
      return;
    }

    // Reset turn economy
    ent.movementLeft = ent.speed;
    ent.actionUsed = false;
    ent.bonusUsed = false;

    // Auto-select acting entity for player clarity
    cState.selectedEntity = ent;
    cState.selectedAction = null;

    logMsg(`▶ Round ${cState.combat.round}: ${ent.name}'s turn begins.`, sideOf(ent) === 'foe' ? '#f87171' : '#60a5fa');
    notifyToast(`${ent.name}'s turn!`);

    renderTurnUi();
    renderInitiativeList();
    updateActionUi();

    // Check for AI-driven turn (Enemies & Allied NPCs)
    if (ent.team !== 'player' && cState.autoNpc) {
      runNpcTurn(ent);
    }
  }

  function advanceTurn() {
    const c = cState.combat;
    if (!c.active) return;

    if (checkCombatEnd()) return;

    // Find next alive entity in initiative order
    let nextIdx = c.turnIndex + 1;
    let wrapped = false;
    if (nextIdx >= c.order.length) {
      nextIdx = 0;
      wrapped = true;
      c.round++;
      logMsg(`--- Round ${c.round} Begins ---`, 'var(--text-gold)');
    }

    // Scan for next entity with HP > 0
    let loops = 0;
    while (loops < c.order.length) {
      const candidateId = c.order[nextIdx];
      const candidate = cState.entities.find(e => e.id === candidateId);
      if (candidate && candidate.hp > 0) {
        c.turnIndex = nextIdx;
        updatePhaseHeader();
        startTurn(candidateId);
        return;
      }
      nextIdx++;
      if (nextIdx >= c.order.length) {
        nextIdx = 0;
        c.round++;
        logMsg(`--- Round ${c.round} Begins ---`, 'var(--text-gold)');
      }
      loops++;
    }

    // If loop finishes, everyone is dead
    endCombat();
  }

  function endCombat() {
    cState.combat.active = false;
    cState.combat.round = 0;
    cState.combat.turnIndex = 0;
    cState.combat.order = [];
    cState.combat.aiRunning = false;
    cState.selectedAction = null;

    cState.entities.forEach(e => {
      e.movementLeft = e.speed;
      e.actionUsed = false;
      e.bonusUsed = false;
    });

    logMsg('🏁 --- COMBAT ENDED ---', 'var(--text-gold)');
    notifyToast('Combat has ended.');

    updatePhaseHeader();
    renderTurnUi();
    renderInitiativeList();
    updateActionUi();
    persistCombatToCloud();
  }

  function checkCombatEnd() {
    if (!cState.combat.active) return false;
    const aliveParty = cState.entities.filter(e => (e.team === 'player' || e.team === 'ally') && e.hp > 0);
    const aliveFoes = cState.entities.filter(e => e.team === 'enemy' && e.hp > 0);

    if (aliveFoes.length === 0) {
      logMsg('🏆 Victory! All hostile threats have been eliminated.', '#4ade80');
      notifyToast('Encounter Cleared!');
      endCombat();
      return true;
    }
    if (aliveParty.length === 0) {
      logMsg('💀 Defeat! The entire party has fallen unconscious.', '#ef4444');
      notifyToast('All party members defeated.');
      endCombat();
      return true;
    }
    return false;
  }

  function updatePhaseHeader() {
    const indicator = container.querySelector('#combat-phase-indicator');
    const roundBox = container.querySelector('#combat-round-counter');
    const startBtn = container.querySelector('#combat-start-btn');
    const endBtn = container.querySelector('#combat-end-btn');
    const autoLabel = container.querySelector('#combat-auto-npc-label');

    if (cState.combat.active) {
      if (indicator) {
        indicator.textContent = `ROUND ${cState.combat.round}`;
        indicator.style.background = '#7f1d1d';
        indicator.style.color = '#fca5a5';
        indicator.style.borderColor = '#ef4444';
      }
      if (roundBox) roundBox.textContent = `${cState.combat.round}`;
      if (startBtn) startBtn.style.display = 'none';
      if (endBtn) endBtn.style.display = 'inline-block';
      if (autoLabel) autoLabel.style.display = 'flex';
    } else {
      if (indicator) {
        indicator.textContent = 'OUT OF COMBAT';
        indicator.style.background = '#1e293b';
        indicator.style.color = '#94a3b8';
        indicator.style.borderColor = '#475569';
      }
      if (roundBox) roundBox.textContent = '—';
      if (startBtn) startBtn.style.display = 'inline-block';
      if (endBtn) endBtn.style.display = 'none';
      if (autoLabel) autoLabel.style.display = 'none';
    }
  }

  // ==========================================
  // AUTONOMOUS NPC & MONSTER AI TURN
  // Enemies target players/allies; Allied NPCs target enemies.
  // ==========================================
  async function runNpcTurn(npc) {
    if (cState.combat.aiRunning) return;
    cState.combat.aiRunning = true;
    renderTurnUi();

    try {
      await new Promise(r => setTimeout(r, 700));
      if (!cState.combat.active || npc.hp <= 0) return;

      const oppTeam = isHostile(npc, { team: 'player' }) ? ['player', 'ally'] : ['enemy'];
      const targets = cState.entities.filter(e => oppTeam.includes(e.team) && e.hp > 0);
      if (targets.length === 0) return;

      // Find nearest hostile target
      targets.sort((a, b) => dist(npc, a) - dist(npc, b));
      let primaryTarget = targets[0];
      const startPos = { x: npc.x, y: npc.y };
      const logMovement = () => {
        const moved = dist(startPos, npc);
        if (moved > 0) {
          logMsg(`${npc.name} moves ${moved * 5}ft toward ${primaryTarget.name}.`, 'var(--text-primary)');
          startPos.x = npc.x;
          startPos.y = npc.y;
        }
      };

      // 1. Check if NPC has an available AoE ability that catches multiple targets
      const usable = usableAbilities(npc);
      const aoeId = usable.find(id => ABILITIES[id]?.kind === 'aoe');
      if (aoeId && !npc.actionUsed) {
        const ab = ABILITIES[aoeId];
        const center = ab.centerSelf ? { x: npc.x, y: npc.y } : { x: primaryTarget.x, y: primaryTarget.y };
        if (dist(npc, center) <= (ab.range || 30)) {
          executeAbility(npc, aoeId, null, center);
          markActionSpent(npc, ab);
          await new Promise(r => setTimeout(r, 800));
        }
      }

      // 2. Movement Step: Step closer toward target if not in reach
      if (!npc.actionUsed) {
        const preferredReach = usable.some(id => (ABILITIES[id]?.kind === 'attack' || ABILITIES[id]?.kind === 'save' || ABILITIES[id]?.kind === 'auto') && ABILITIES[id].range > 2) ? 4 : 1;
        while (dist(npc, primaryTarget) > preferredReach && npc.movementLeft > 0) {
          const stepX = Math.sign(primaryTarget.x - npc.x);
          const stepY = Math.sign(primaryTarget.y - npc.y);
          const nextX = npc.x + stepX;
          const nextY = npc.y + stepY;
          const blocked = cState.entities.find(e => e.x === nextX && e.y === nextY && e.hp > 0);
          if (blocked) break;
          npc.x = nextX;
          npc.y = nextY;
          npc.movementLeft--;
        }
        logMovement();
      }

      // 3. Action Step: Spell, ranged ability, or weapon melee
      if (!npc.actionUsed) {
        const targetDist = dist(npc, primaryTarget);
        // Look for targeted spell / ability first (save, spell attack, auto-hit)
        const attackAbilityId = usable.find(id => {
          const ab = ABILITIES[id];
          return (ab?.kind === 'attack' || ab?.kind === 'save' || ab?.kind === 'auto') && targetDist <= (ab.range || 20);
        });

        if (attackAbilityId) {
          const ab = ABILITIES[attackAbilityId];
          executeAbility(npc, attackAbilityId, primaryTarget, { x: primaryTarget.x, y: primaryTarget.y });
          markActionSpent(npc, ab);
        } else if (targetDist <= (npc.reach || 1)) {
          performWeaponAttack(npc, primaryTarget, 'NORMAL');
          npc.actionUsed = true;
        } else {
          // Still out of reach: Dash action to close the distance
          npc.movementLeft += npc.speed;
          while (dist(npc, primaryTarget) > 1 && npc.movementLeft > 0) {
            const stepX = Math.sign(primaryTarget.x - npc.x);
            const stepY = Math.sign(primaryTarget.y - npc.y);
            const nextX = npc.x + stepX;
            const nextY = npc.y + stepY;
            if (cState.entities.find(e => e.x === nextX && e.y === nextY && e.hp > 0)) break;
            npc.x = nextX;
            npc.y = nextY;
            npc.movementLeft--;
          }
          logMsg(`${npc.name} takes the Dash action.`, 'var(--text-muted)');
          logMovement();
          npc.actionUsed = true;
        }
        await new Promise(r => setTimeout(r, 800));
      }
    } finally {
      cState.combat.aiRunning = false;
      if (cState.combat.active) logMsg(`${npc.name} ends their turn.`, 'var(--text-muted)');
      renderTurnUi();
      advanceTurn();
    }
  }

  // ==========================================
  // RENDER INITIATIVE & TURN CONTROLS
  // ==========================================
  function handleDmResolveCurrent() {
    const cur = cState.combat.order.length > 0 ? cState.entities.find(e => e.id === cState.combat.order[cState.combat.turnIndex]) : null;
    if (!cur) return;
    const isPlayer = cur.team === 'player';
    logMsg(`⚙ DM resolves ${cur.name}'s turn${isPlayer ? ` on behalf of ${cur.playerName || 'the player'}` : ''}.`, '#fbbf24');
    runNpcTurn(cur);
  }

  function renderTurnUi() {
    const turnBox = container.querySelector('#combat-turn-box');
    if (!turnBox) return;

    if (!cState.combat.active) {
      turnBox.innerHTML = `
        <div style="font-size: 0.72rem; color: var(--text-muted); text-align: center; padding: 0.25rem 0;">
          Combat not started. Click <strong>Roll Initiative</strong> to enter turn order.
        </div>
      `;
      return;
    }

    const cur = currentTurnEntity();
    if (!cur) {
      turnBox.innerHTML = '';
      return;
    }

    const isDm = Boolean(worldState.prefs && worldState.prefs.dmMode);
    const canControl = isDm || worldState.canControlCharacter(cur.id, cur);
    const isPlayer = cur.team === 'player';
    const isAiBusy = cState.combat.aiRunning;

    turnBox.innerHTML = `
      <div style="background: var(--bg-secondary); border: 1px solid var(--border-gold); border-radius: var(--radius-sm); padding: 0.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
          <div style="display: flex; align-items: center; gap: 0.35rem;">
            <span style="font-size: 0.75rem; font-weight: bold; color: var(--text-gold);">ACTIVE TURN:</span>
            <strong style="font-size: 0.85rem; color: #fff;">${cur.name}</strong>
          </div>
          <span class="badge" style="background: ${cur.team === 'player' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(239, 68, 68, 0.2)'}; color: ${cur.team === 'player' ? '#93c5fd' : '#fca5a5'}; font-size: 0.65rem;">
            ${cur.team === 'player' ? 'Player Turn' : 'NPC / Enemy'}
          </span>
        </div>

        <!-- Economy Counters -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.25rem; font-size: 0.7rem; text-align: center; margin-bottom: 0.45rem;">
          <div style="background: var(--bg-tertiary); padding: 3px; border-radius: 3px;">
            <div style="color: var(--text-muted); font-size: 0.62rem;">ACTION</div>
            <strong style="color: ${cur.actionUsed ? '#f87171' : '#4ade80'};">${cur.actionUsed ? 'SPENT' : 'READY'}</strong>
          </div>
          <div style="background: var(--bg-tertiary); padding: 3px; border-radius: 3px;">
            <div style="color: var(--text-muted); font-size: 0.62rem;">BONUS</div>
            <strong style="color: ${cur.bonusUsed ? '#f87171' : '#4ade80'};">${cur.bonusUsed ? 'SPENT' : 'READY'}</strong>
          </div>
          <div style="background: var(--bg-tertiary); padding: 3px; border-radius: 3px;">
            <div style="color: var(--text-muted); font-size: 0.62rem;">MOVE</div>
            <strong style="color: #60a5fa;">${cur.movementLeft * 5}ft</strong>
          </div>
        </div>

        <!-- Turn Controls: each unit resolves its own turn; DM can resolve on behalf of absent players -->
        <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
          ${canControl ? `
            <button id="combat-end-turn-btn" class="btn btn-sm btn-primary" ${isAiBusy ? 'disabled' : ''} style="flex: 1; font-size: 0.75rem; padding: 4px;">
              ${isAiBusy ? 'Resolving turn...' : 'End Turn ➔'}
            </button>
          ` : `
            <div style="flex: 1; font-size: 0.7rem; color: var(--text-muted); font-style: italic; text-align: center; padding: 3px 0;">
              Waiting for ${cur.playerName || cur.name} to take their turn...
            </div>
          `}
        </div>
        ${isDm && !isAiBusy ? `
          <div style="display: flex; gap: 0.35rem; margin-top: 0.3rem;">
            <button id="combat-dm-resolve-btn" class="btn btn-sm" title="${isPlayer ? 'Player is away or unable: the DM auto-resolves this character\'s turn' : 'Run this NPC\'s turn automatically'}" style="flex: 1; font-size: 0.7rem; padding: 3px 6px; color: #fbbf24; border-color: rgba(251, 191, 36, 0.5);">
              ${isPlayer ? `⚙ Resolve for ${cur.playerName || 'player'} (DM)` : '⚙ Auto-resolve turn (DM)'}
            </button>
            <button id="combat-force-next-btn" class="btn btn-sm" title="Skip this unit's turn" style="font-size: 0.7rem; padding: 3px 8px; color: #fca5a5;">
              Skip
            </button>
          </div>
        ` : ''}
      </div>
    `;

    const endTurnBtn = turnBox.querySelector('#combat-end-turn-btn');
    if (endTurnBtn) {
      endTurnBtn.addEventListener('click', () => {
        logMsg(`${cur.name} ends their turn.`, 'var(--text-muted)');
        advanceTurn();
      });
    }

    const dmResolveBtn = turnBox.querySelector('#combat-dm-resolve-btn');
    if (dmResolveBtn) {
      dmResolveBtn.addEventListener('click', () => {
        handleDmResolveCurrent();
      });
    }

    const forceNextBtn = turnBox.querySelector('#combat-force-next-btn');
    if (forceNextBtn) {
      forceNextBtn.addEventListener('click', () => {
        logMsg(`⏭ DM skips ${cur.name}'s turn.`, 'var(--text-muted)');
        advanceTurn();
      });
    }
  }

  function renderInitiativeList() {
    const list = container.querySelector('#combat-initiative-list');
    if (!list) return;

    if (!cState.combat.active || cState.combat.order.length === 0) {
      list.innerHTML = '<div style="font-size: 0.72rem; color: var(--text-muted); font-style: italic; text-align: center; margin-top: 0.5rem;">Roll initiative to generate turn order.</div>';
      return;
    }

    list.innerHTML = cState.combat.order.map((id, index) => {
      const ent = cState.entities.find(e => e.id === id);
      if (!ent) return '';
      const isCurrent = index === cState.combat.turnIndex;
      const isDead = ent.hp <= 0;
      const isPlayer = ent.team === 'player';
      const isAlly = ent.team === 'ally';
      const borderCol = isCurrent ? '#fbbf24' : (isPlayer ? '#3b82f6' : (isAlly ? '#14b8a6' : '#ef4444'));

      return `
        <div class="initiative-entry" data-id="${ent.id}" style="display: flex; align-items: center; justify-content: space-between; background: ${isCurrent ? 'rgba(245, 158, 11, 0.15)' : 'var(--bg-tertiary)'}; border-left: 3px solid ${borderCol}; padding: 0.25rem 0.45rem; border-radius: var(--radius-sm); font-size: 0.72rem; opacity: ${isDead ? '0.45' : '1'}; cursor: pointer;">
          <div style="display: flex; align-items: center; gap: 0.35rem;">
            <span style="font-weight: bold; color: ${isCurrent ? '#fbbf24' : 'var(--text-muted)'}; min-width: 14px;">${index + 1}.</span>
            <span style="font-weight: bold; color: ${isCurrent ? '#fff' : 'var(--text-primary)'};">${ent.name}</span>
            ${isCurrent ? '<span style="color: #fbbf24; font-size: 0.65rem;">▶ CURRENT</span>' : ''}
          </div>
          <div style="display: flex; align-items: center; gap: 0.35rem;">
            <span style="font-size: 0.68rem; color: ${isDead ? '#ef4444' : '#4ade80'};">${isDead ? 'DOWN' : `${ent.hp}/${ent.maxHp}`}</span>
          </div>
        </div>
      `;
    }).join('');

    list.querySelectorAll('.initiative-entry').forEach(el => {
      el.addEventListener('click', () => {
        const ent = cState.entities.find(e => e.id === el.dataset.id);
        if (ent) {
          cState.selectedEntity = ent;
          updateActionUi();
        }
      });
    });
  }
  // UI Event Bindings
  const startBtn = container.querySelector('#combat-start-btn');
  if (startBtn) startBtn.addEventListener('click', rollInitiative);

  const endBtn = container.querySelector('#combat-end-btn');
  if (endBtn) endBtn.addEventListener('click', endCombat);

  const autoNpcChk = container.querySelector('#combat-auto-npc-chk');
  if (autoNpcChk) {
    autoNpcChk.addEventListener('change', (e) => {
      cState.autoNpc = Boolean(e.target.checked);
      notifyToast(cState.autoNpc ? 'Auto NPC turns enabled' : 'Auto NPC turns paused');
    });
  }

  const spellSelectElem = container.querySelector('#combat-spell-select');
  if (spellSelectElem) {
    spellSelectElem.addEventListener('change', (e) => {
      cState.selectedSpellId = e.target.value;
      cState.selectedAction = 'CAST';
      updateActionUi();
      const selAb = ABILITIES[cState.selectedSpellId];
      if (selAb?.kind === 'aoe') {
        notifyToast(`💥 Target square for ${selAb.name} (${selAb.radius * 5}ft radius, ${selAb.range * 5}ft range). Hover over the map to preview radius, click any square to cast!`);
      } else if (selAb?.kind === 'teleport') {
        notifyToast(`✨ Click any square within ${selAb.range * 5}ft to teleport!`);
      } else {
        notifyToast(`🎯 Select target creature for ${selAb ? selAb.name : 'spell'}...`);
      }
    });
  }

  // Action Buttons
  container.querySelectorAll('.combat-act-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const act = e.currentTarget.dataset.action;
      cState.selectedAction = act;
      container.querySelectorAll('.combat-act-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');

      if (act === 'CAST') {
        if (!cState.selectedSpellId) {
          cState.selectedSpellId = 'fireball';
        }
        if (cState.selectedEntity) {
          populateAbilitySelect(cState.selectedEntity);
        }
        updateActionUi();
        const selAb = ABILITIES[cState.selectedSpellId];
        if (selAb?.kind === 'aoe') {
          notifyToast(`💥 Target square for ${selAb.name} (${selAb.radius * 5}ft radius). Hover over the map to preview radius, click square to cast!`);
        } else if (selAb?.kind === 'teleport') {
          notifyToast(`✨ Select square to teleport (${selAb.range * 5}ft range)`);
        } else {
          notifyToast(`🎯 Select target creature for ${selAb ? selAb.name : 'spell'}...`);
        }
      } else {
        updateActionUi();
        if (act === 'PING') notifyToast('Click any square on the map to ping!');
        else notifyToast(`Select target for ${act.toLowerCase()}...`);
      }
    });
  });

  // Quick Ping Button
  container.querySelector('#combat-quick-ping-btn').addEventListener('click', () => {
    cState.selectedAction = 'PING';
    notifyToast('Click any square on the battlemat to ping!');
  });

  // Advantage Pills
  container.querySelectorAll('.combat-adv-pill').forEach(btn => {
    btn.addEventListener('click', (e) => {
      cState.advantageMode = e.currentTarget.dataset.mode;
      container.querySelectorAll('.combat-adv-pill').forEach(b => b.className = 'combat-adv-pill');
      if (cState.advantageMode === 'ADVANTAGE') e.currentTarget.classList.add('active-adv');
      else if (cState.advantageMode === 'DISADVANTAGE') e.currentTarget.classList.add('active-dis');
      else e.currentTarget.classList.add('active-norm');
    });
  });

  // Perspective Switcher
  container.querySelector('#combat-perspective-select').addEventListener('change', (e) => {
    cState.currentPerspective = e.target.value;
    if (cState.currentPerspective === 'DM') {
      cState.selectedEntity = null;
      notifyToast('Perspective: DM (All-Seeing)');
    } else {
      const p = cState.entities.find(ent => ent.id === cState.currentPerspective);
      if (p) {
        cState.selectedEntity = p;
        notifyToast(`Perspective: ${p.name}`);
      }
    }
    updateActionUi();
  });

  // DM Ping Radio Buttons
  const pAll = container.querySelector('#combat-ping-vis-all');
  const pCustom = container.querySelector('#combat-ping-vis-custom');
  const customBox = container.querySelector('#combat-ping-custom-container');
  if (pAll && pCustom) {
    pAll.addEventListener('change', () => {
      cState.dmPingVis = 'ALL';
      customBox.style.display = 'none';
      notifyToast('DM Pings visible to ALL.');
    });
    pCustom.addEventListener('change', () => {
      cState.dmPingVis = 'CUSTOM';
      customBox.style.display = 'block';
      notifyToast('DM Pings visible to selected only.');
    });
  }

  // Ping Recipient Checkboxes
  container.querySelectorAll('.combat-ping-chk').forEach(chk => {
    chk.addEventListener('change', () => {
      cState.dmPingRecipients = Array.from(container.querySelectorAll('.combat-ping-chk:checked')).map(c => c.value);
    });
  });
  cState.dmPingRecipients = Array.from(container.querySelectorAll('.combat-ping-chk:checked')).map(c => c.value);

  // Ping Color Presets
  container.querySelectorAll('.combat-ping-color-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      cState.dmPingColor = e.currentTarget.dataset.color;
      container.querySelectorAll('.combat-ping-color-btn').forEach(b => b.style.borderColor = 'transparent');
      e.currentTarget.style.borderColor = '#fff';
    });
  });

  // Grid Slider
  container.querySelector('#combat-grid-slider').addEventListener('input', (e) => {
    cState.gridSize = parseInt(e.target.value);
    container.querySelector('#combat-grid-label').textContent = `${cState.gridSize}x${cState.gridSize}`;
    resizeCanvas();
  });

  // Drop Unit Button
  container.querySelector('#combat-drop-unit-btn').addEventListener('click', () => {
    const val = container.querySelector('#combat-spawn-select').value;
    const teamChoice = (container.querySelector('#combat-spawn-team')?.value) || 'enemy';
    const cx = Math.floor(cState.gridSize / 2);
    const cy = Math.floor(cState.gridSize / 2);

    if (val.startsWith('party_')) {
      const pid = val.replace('party_', '');
      const pData = partyData.find(p => p.id === pid);
      if (pData) {
        cState.entities.push(buildPartyEntity(pData, cx, cy, '#3b82f6'));
        notifyToast(`${pData.name} placed on map!`);
        renderInitiativeList();
      }
    } else if (val.startsWith('champ_')) {
      const cid = val.replace('champ_', '');
      const cData = champions.find(c => c.id === cid);
      const champName = cData ? cData.name : 'Champion NPC';
      cState.entities.push(buildMonsterEntity(champName, cx, cy, teamChoice, {
        ac: 16,
        hp: 45,
        maxHp: 45,
        speed: 6,
        attackMod: 6,
        dmgFormula: '1d8+3',
        abilities: ['firebolt', 'thunderwave']
      }));
      notifyToast(`${champName} spawned on map!`);
      renderInitiativeList();
    } else {
      cState.entities.push(buildMonsterEntity(val, cx, cy, teamChoice));
      notifyToast(`${val} spawned on map (${teamChoice})!`);
      renderInitiativeList();
    }
  });

  // Paint Spawn Button
  const paintBtn = container.querySelector('#combat-paint-btn');
  paintBtn.addEventListener('click', () => {
    cState.isPaintActive = !cState.isPaintActive;
    paintBtn.textContent = cState.isPaintActive ? 'Paint: ON' : 'Paint: OFF';
    paintBtn.style.color = cState.isPaintActive ? '#ec4899' : 'inherit';
    notifyToast(cState.isPaintActive ? 'Paint Mode ON: Click and drag on map.' : 'Paint Mode OFF.');
  });

  // Wire DM Unit Saving Throw Buttons
  container.querySelectorAll('.combat-stat-save-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const actor = cState.selectedEntity;
      if (!actor) return;
      const stat = btn.getAttribute('data-stat');
      const dcInp = container.querySelector('#combat-unit-save-dc');
      rollUnitSavingThrow(actor, stat, dcInp ? dcInp.value : 15);
    });
  });

  // Wire DM Push Request Button
  const pushSubmitBtn = container.querySelector('#combat-push-save-submit-btn');
  if (pushSubmitBtn) {
    pushSubmitBtn.addEventListener('click', () => {
      const actor = cState.selectedEntity;
      if (!actor) return;
      const typeSelect = container.querySelector('#combat-push-save-type');
      const dcInp = container.querySelector('#combat-push-save-dc');
      const reasonInp = container.querySelector('#combat-push-save-reason');
      pushRequestToSelectedPlayer(actor, typeSelect.value, dcInp ? dcInp.value : 15, reasonInp ? reasonInp.value : '');
    });
  }

  // Wire Clear Log Button
  const clearLogBtn = container.querySelector('#combat-clear-log-btn');
  if (clearLogBtn) {
    clearLogBtn.addEventListener('click', () => {
      const stream = container.querySelector('#combat-log-stream');
      if (stream) stream.innerHTML = '<div style="color: var(--text-muted); font-style: italic;">Log cleared.</div>';
    });
  }

  // Populate recent dice rolls into combat log stream
  const initialRolls = typeof worldState.getDiceRollLogs === 'function' ? worldState.getDiceRollLogs(6) : [];
  if (initialRolls.length > 0) {
    initialRolls.slice().reverse().forEach(r => appendRollToCombatLog(r));
  }
  renderCombatPendingBanner();
  renderTurnUi();
  renderInitiativeList();
  updatePhaseHeader();

  // ==========================================
  // LIVE SUPABASE BATTLEMAT SYNC, TERRAIN, FOG & CUSTOM MAP
  // ==========================================
  let mapBgImg = null;
  let loadedMapUrl = null;
  let lastCloudCombatJson = '';

  function setMapImageUrl(url) {
    cState.mapImageUrl = url || null;
    if (!url) {
      mapBgImg = null;
      loadedMapUrl = null;
    } else if (url !== loadedMapUrl) {
      loadedMapUrl = url;
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => { mapBgImg = img; };
      img.src = url;
    }
  }

  function setTerrainTile(gx, gy, type) {
    const key = `${gx},${gy}`;
    if (!type || type === 'erase') delete cState.terrain[key];
    else cState.terrain[key] = type;
    persistCombatToCloud();
  }

  function setFogTile(gx, gy, hidden) {
    const key = `${gx},${gy}`;
    if (hidden) cState.fogOfWar[key] = true;
    else delete cState.fogOfWar[key];
    persistCombatToCloud();
  }

  function persistCombatToCloud() {
    const snapshot = {
      gridSize: cState.gridSize,
      entities: cState.entities.map(e => ({ ...e })),
      combat: {
        active: cState.combat.active,
        round: cState.combat.round,
        order: cState.combat.order,
        turnIndex: cState.combat.turnIndex
      },
      terrain: { ...cState.terrain },
      fogOfWar: { ...cState.fogOfWar },
      mapImageUrl: cState.mapImageUrl || null,
      updatedAt: Date.now()
    };
    lastCloudCombatJson = JSON.stringify({ ...snapshot, updatedAt: 0 });
    if (typeof worldState.saveCombatState === 'function') {
      worldState.saveCombatState(snapshot);
    }
  }

  function hydrateCombatFromCloud() {
    const remote = worldState.data && worldState.data.combatState;
    if (!remote || typeof remote !== 'object') return;
    const sig = JSON.stringify({ ...remote, updatedAt: 0 });
    if (sig === lastCloudCombatJson) return;
    lastCloudCombatJson = sig;

    if (remote.gridSize) cState.gridSize = remote.gridSize;
    if (Array.isArray(remote.entities) && remote.entities.length > 0) {
      cState.entities = remote.entities.map(e => ({ ...e }));
    }
    if (remote.combat) {
      cState.combat.active = !!remote.combat.active;
      cState.combat.round = remote.combat.round || 0;
      cState.combat.order = Array.isArray(remote.combat.order) ? remote.combat.order : [];
      cState.combat.turnIndex = remote.combat.turnIndex || 0;
    }
    if (remote.terrain && typeof remote.terrain === 'object') {
      cState.terrain = { ...remote.terrain };
    }
    if (remote.fogOfWar && typeof remote.fogOfWar === 'object') {
      cState.fogOfWar = { ...remote.fogOfWar };
    }
    if (remote.mapImageUrl !== undefined) {
      setMapImageUrl(remote.mapImageUrl);
    }
    renderTurnUi();
    renderInitiativeList();
    updatePhaseHeader();
  }

  // Bind DM Terrain, Fog & Battlemap Upload Controls
  const brushSelect = container.querySelector('#combat-brush-select');
  if (brushSelect) {
    brushSelect.addEventListener('change', (e) => {
      cState.activeBrush = e.target.value;
      if (cState.activeBrush) {
        cState.selectedAction = null;
        updateActionUi();
      }
    });
  }
  container.querySelector('#combat-fog-cover-all')?.addEventListener('click', () => {
    for (let x = 0; x < cState.gridSize; x++) {
      for (let y = 0; y < cState.gridSize; y++) {
        cState.fogOfWar[`${x},${y}`] = true;
      }
    }
    persistCombatToCloud();
    notifyToast('Fog of War covers the battlefield (DM sees through)');
  });
  container.querySelector('#combat-fog-reveal-all')?.addEventListener('click', () => {
    cState.fogOfWar = {};
    persistCombatToCloud();
    notifyToast('Fog of War cleared');
  });
  container.querySelector('#combat-map-file-input')?.addEventListener('change', async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    notifyToast('Uploading battlemap to Supabase Storage...');
    if (typeof supabaseDb !== 'undefined' && supabaseDb.isAvailable()) {
      const res = await supabaseDb.uploadBattlemapImage(worldState.activeGameId || 'demo', file);
      if (res && res.success && res.url) {
        setMapImageUrl(res.url);
        persistCombatToCloud();
        notifyToast('Battlemap uploaded & synced live to all players!');
        return;
      }
    }
    // Local FileReader fallback when offline
    const reader = new FileReader();
    reader.onload = () => {
      setMapImageUrl(reader.result);
      persistCombatToCloud();
      notifyToast('Battlemap loaded locally');
    };
    reader.readAsDataURL(file);
  });
  container.querySelector('#combat-map-clear-btn')?.addEventListener('click', () => {
    setMapImageUrl(null);
    persistCombatToCloud();
    notifyToast('Battlemap background cleared');
  });

  // Encounter Builder CR Calculator & Supabase Presets
  const MONSTER_XP_MAP = {
    'Goblin': 50, 'Goblin Alpha': 200, 'Orc': 100, 'Skeleton': 50,
    'Owlbear': 700, 'Troll': 1800, 'Red Dragon Wyrmling': 1100
  };
  const LEVEL_XP_THRESHOLDS = {
    1: [25, 50, 75, 100], 2: [50, 100, 150, 200], 3: [75, 150, 225, 400],
    4: [125, 250, 375, 500], 5: [250, 500, 750, 1100], 6: [300, 600, 900, 1400],
    7: [350, 750, 1100, 1700], 8: [450, 900, 1400, 2100], 9: [550, 1100, 1600, 2400],
    10: [600, 1200, 1900, 2800]
  };

  function calculateEncounterDifficulty(entities = cState.entities, partyChars = worldState.data.partyCharacters || []) {
    const foes = (entities || []).filter(e => e.team === 'enemy' && e.hp > 0);
    const totalXp = foes.reduce((sum, f) => {
      const matched = Object.keys(MONSTER_XP_MAP).find(k => (f.name || '').toLowerCase().includes(k.toLowerCase()));
      return sum + (matched ? MONSTER_XP_MAP[matched] : Math.max(50, (f.maxHp || 15) * 10));
    }, 0);
    const partyList = partyChars.length > 0 ? partyChars : [{ level: 3 }];
    let easy = 0, med = 0, hard = 0, deadly = 0;
    partyList.forEach(p => {
      const t = LEVEL_XP_THRESHOLDS[Math.min(10, Math.max(1, parseInt(p.level, 10) || 1))] || [250, 500, 750, 1100];
      easy += t[0]; med += t[1]; hard += t[2]; deadly += t[3];
    });
    let rating = 'Easy';
    if (totalXp >= deadly) rating = 'Deadly';
    else if (totalXp >= hard) rating = 'Hard';
    else if (totalXp >= med) rating = 'Medium';
    return { rating, totalXp, monsterCount: foes.length, partyCount: partyList.length };
  }

  function renderEncounterPresetsUi() {
    const badge = container.querySelector('#combat-cr-badge');
    const sel = container.querySelector('#combat-preset-select');
    const diff = calculateEncounterDifficulty();
    if (badge) {
      badge.textContent = `${diff.rating} (${diff.totalXp} XP)`;
      const colors = { Easy: '#86efac', Medium: '#fde047', Hard: '#fdba74', Deadly: '#fca5a5' };
      badge.style.color = colors[diff.rating] || '#fde047';
    }
    if (sel) {
      const presets = worldState.getEncounterPresets();
      sel.innerHTML = `<option value="">-- Saved Encounters (${presets.length}) --</option>` +
        presets.map(p => `<option value="${p.id}">${p.name} [${p.difficulty} • ${p.totalXp} XP]</option>`).join('');
    }
  }

  async function saveCurrentEncounterPreset(nameInput) {
    const diff = calculateEncounterDifficulty();
    const snapshot = {
      gridSize: cState.gridSize,
      entities: cState.entities.map(e => ({ ...e })),
      terrain: { ...cState.terrain },
      fogOfWar: { ...cState.fogOfWar },
      mapImageUrl: cState.mapImageUrl || null
    };
    const res = await worldState.saveEncounterPreset({
      name: nameInput || `Encounter (${diff.rating})`,
      difficulty: diff.rating,
      totalXp: diff.totalXp,
      snapshot
    });
    renderEncounterPresetsUi();
    return res;
  }

  function loadEncounterPresetById(presetId) {
    const preset = worldState.getEncounterPresets().find(p => p.id === presetId);
    if (!preset || !preset.snapshot) return false;
    const snap = preset.snapshot;
    if (snap.gridSize) cState.gridSize = snap.gridSize;
    if (Array.isArray(snap.entities)) cState.entities = snap.entities.map(e => ({ ...e }));
    cState.terrain = { ...(snap.terrain || {}) };
    cState.fogOfWar = { ...(snap.fogOfWar || {}) };
    setMapImageUrl(snap.mapImageUrl || null);
    persistCombatToCloud();
    renderEncounterPresetsUi();
    renderTurnUi();
    renderInitiativeList();
    notifyToast(`Loaded encounter: ${preset.name}`);
    return true;
  }

  container.querySelector('#combat-save-preset-btn')?.addEventListener('click', async () => {
    const nameEl = container.querySelector('#combat-preset-name');
    const name = (nameEl?.value || '').trim();
    const res = await saveCurrentEncounterPreset(name);
    if (res && res.success) {
      if (nameEl) nameEl.value = '';
      notifyToast(`Encounter saved to Supabase: ${res.preset.name}`);
    }
  });
  container.querySelector('#combat-load-preset-btn')?.addEventListener('click', () => {
    const sel = container.querySelector('#combat-preset-select');
    if (sel && sel.value) loadEncounterPresetById(sel.value);
  });
  container.querySelector('#combat-delete-preset-btn')?.addEventListener('click', async () => {
    const sel = container.querySelector('#combat-preset-select');
    if (sel && sel.value) {
      await worldState.deleteEncounterPreset(sel.value);
      renderEncounterPresetsUi();
      notifyToast('Encounter preset deleted');
    }
  });
  renderEncounterPresetsUi();

  // Hydrate initial combat session from Supabase if present
  hydrateCombatFromCloud();

  // Listen to worldState state changes for real-time rolls, requests & live battlemat sync
  worldState.subscribe(() => {
    hydrateCombatFromCloud();
    renderEncounterPresetsUi();
    renderCombatPendingBanner();
    updateActionUi();
    renderTurnUi();
  });

  // Render Loop
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const ts = cState.tileSize;

    // Custom Uploaded Battlemap Background Image
    if (mapBgImg && mapBgImg.complete) {
      ctx.save();
      ctx.globalAlpha = 0.85;
      ctx.drawImage(mapBgImg, 0, 0, canvas.width, canvas.height);
      ctx.restore();
    }

    // Painted Terrain Tiles (Wall, Difficult, Water, Fire)
    const terrainColors = {
      wall: 'rgba(51, 65, 85, 0.88)',
      difficult: 'rgba(180, 83, 9, 0.35)',
      water: 'rgba(14, 165, 233, 0.42)',
      fire: 'rgba(239, 68, 68, 0.45)'
    };
    Object.keys(cState.terrain || {}).forEach(key => {
      const tType = cState.terrain[key];
      const parts = key.split(',');
      const tx = parseInt(parts[0], 10);
      const ty = parseInt(parts[1], 10);
      if (!isNaN(tx) && !isNaN(ty) && terrainColors[tType]) {
        ctx.fillStyle = terrainColors[tType];
        ctx.fillRect(tx * ts, ty * ts, ts, ts);
        if (tType === 'wall') {
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.6)';
          ctx.lineWidth = 2;
          ctx.strokeRect(tx * ts + 2, ty * ts + 2, ts - 4, ts - 4);
        }
      }
    });

    // Grid lines
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.15)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= cState.gridSize; x++) {
      ctx.beginPath();
      ctx.moveTo(x * ts, 0);
      ctx.lineTo(x * ts, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= cState.gridSize; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * ts);
      ctx.lineTo(canvas.width, y * ts);
      ctx.stroke();
    }

    // Move range highlight
    if (cState.selectedEntity && cState.selectedAction === 'MOVE') {
      ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
      for (let x = 0; x < cState.gridSize; x++) {
        for (let y = 0; y < cState.gridSize; y++) {
          const d = Math.max(Math.abs(cState.selectedEntity.x - x), Math.abs(cState.selectedEntity.y - y));
          if (d <= cState.selectedEntity.movementLeft && !cState.entities.find(e => e.x === x && e.y === y && e.hp > 0)) {
            ctx.fillRect(x * ts, y * ts, ts, ts);
          }
        }
      }
    }

    // Spell / Ability Targeting & AoE Radius Preview
    if (cState.selectedEntity && cState.selectedAction === 'CAST' && cState.selectedSpellId) {
      const actor = cState.selectedEntity;
      const ab = ABILITIES[cState.selectedSpellId];
      if (ab) {
        const inCastingRange = (tx, ty) => Math.max(Math.abs(actor.x - tx), Math.abs(actor.y - ty)) <= (ab.range || 30);

        // 1. Highlight casting range on the grid
        if (ab.range && !ab.centerSelf) {
          ctx.fillStyle = 'rgba(168, 85, 247, 0.08)';
          ctx.strokeStyle = 'rgba(168, 85, 247, 0.22)';
          ctx.lineWidth = 1;
          for (let x = 0; x < cState.gridSize; x++) {
            for (let y = 0; y < cState.gridSize; y++) {
              if (inCastingRange(x, y)) {
                ctx.fillRect(x * ts, y * ts, ts, ts);
                ctx.strokeRect(x * ts + 0.5, y * ts + 0.5, ts - 1, ts - 1);
              }
            }
          }
        }

        // 2. AoE Radius Preview (follows hovered tile dynamically from point of origin, or centers around actor if self-centered)
        if (ab.kind === 'aoe') {
          const center = ab.centerSelf
            ? { x: actor.x, y: actor.y }
            : (cState.hoveredTile || null);

          if (center) {
            const inRange = ab.centerSelf || inCastingRange(center.x, center.y);
            const isFire = ab.type === 'fire';
            const isCold = ab.type === 'cold';

            const tileFillCol = inRange
              ? (isFire ? 'rgba(249, 115, 22, 0.38)' : (isCold ? 'rgba(56, 189, 248, 0.35)' : 'rgba(168, 85, 247, 0.35)'))
              : 'rgba(239, 68, 68, 0.22)';
            const tileBorderCol = inRange
              ? (isFire ? 'rgba(249, 115, 22, 0.8)' : (isCold ? 'rgba(56, 189, 248, 0.8)' : 'rgba(192, 132, 252, 0.8)'))
              : 'rgba(239, 68, 68, 0.55)';
            const perimeterCol = inRange
              ? (isFire ? '#f97316' : (isCold ? '#38bdf8' : '#c084fc'))
              : '#ef4444';

            // Find all living creatures within the blast zone
            const victimsInBlast = cState.entities.filter(e => e.hp > 0 && dist(e, center) <= ab.radius && !(ab.centerSelf && e.id === actor.id));

            // Highlight every individual square inside the radius
            for (let x = 0; x < cState.gridSize; x++) {
              for (let y = 0; y < cState.gridSize; y++) {
                if (Math.max(Math.abs(center.x - x), Math.abs(center.y - y)) <= ab.radius) {
                  if (!(ab.centerSelf && x === actor.x && y === actor.y)) {
                    ctx.fillStyle = tileFillCol;
                    ctx.fillRect(x * ts, y * ts, ts, ts);
                    ctx.strokeStyle = tileBorderCol;
                    ctx.lineWidth = 1.5;
                    ctx.strokeRect(x * ts + 1, y * ts + 1, ts - 2, ts - 2);
                  }
                }
              }
            }

            // Outline perimeter of AoE with dash
            const minX = Math.max(0, center.x - ab.radius);
            const maxX = Math.min(cState.gridSize - 1, center.x + ab.radius);
            const minY = Math.max(0, center.y - ab.radius);
            const maxY = Math.min(cState.gridSize - 1, center.y + ab.radius);
            ctx.save();
            ctx.strokeStyle = perimeterCol;
            ctx.lineWidth = 2.5;
            ctx.setLineDash([6, 3]);
            ctx.strokeRect(minX * ts, minY * ts, (maxX - minX + 1) * ts, (maxY - minY + 1) * ts);
            ctx.restore();

            // Highlight creatures inside the blast zone with warning rings
            victimsInBlast.forEach(v => {
              ctx.save();
              ctx.beginPath();
              ctx.arc(v.x * ts + ts / 2, v.y * ts + ts / 2, ts * 0.46, 0, Math.PI * 2);
              ctx.strokeStyle = '#ef4444';
              ctx.lineWidth = 3;
              ctx.stroke();
              ctx.restore();
            });

            // Point of origin crosshair reticle on the center square
            ctx.save();
            ctx.strokeStyle = inRange ? '#fbbf24' : '#ef4444';
            ctx.lineWidth = 2.5;
            ctx.strokeRect(center.x * ts + 2, center.y * ts + 2, ts - 4, ts - 4);
            // Crosshairs
            ctx.beginPath();
            ctx.moveTo(center.x * ts + ts / 2, center.y * ts);
            ctx.lineTo(center.x * ts + ts / 2, (center.y + 1) * ts);
            ctx.moveTo(center.x * ts, center.y * ts + ts / 2);
            ctx.lineTo((center.x + 1) * ts, center.y * ts + ts / 2);
            ctx.stroke();
            // Center bullseye
            ctx.beginPath();
            ctx.arc(center.x * ts + ts / 2, center.y * ts + ts / 2, 4, 0, Math.PI * 2);
            ctx.fillStyle = inRange ? '#fbbf24' : '#ef4444';
            ctx.fill();
            ctx.restore();

            // Floating tactical pill badge above the blast
            ctx.save();
            const radiusFt = ab.radius * 5;
            const badgeText = inRange
              ? `💥 ${ab.name} [${radiusFt}ft Radius • ${victimsInBlast.length} in blast] — Click square to cast`
              : `⛔ ${ab.name} [${radiusFt}ft Radius] — OUT OF RANGE (Max ${ab.range * 5}ft)`;
            ctx.font = 'bold 11px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const textMetrics = ctx.measureText(badgeText);
            const badgeW = textMetrics.width + 18;
            const badgeH = 22;
            const badgeX = Math.max(badgeW / 2 + 4, Math.min(canvas.width - badgeW / 2 - 4, center.x * ts + ts / 2));
            const badgeY = Math.max(badgeH / 2 + 4, minY * ts - 14);

            ctx.fillStyle = inRange ? 'rgba(15, 23, 42, 0.94)' : 'rgba(127, 29, 29, 0.96)';
            ctx.strokeStyle = inRange ? '#f97316' : '#ef4444';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            if (typeof ctx.roundRect === 'function') {
              ctx.roundRect(badgeX - badgeW / 2, badgeY - badgeH / 2, badgeW, badgeH, 4);
            } else {
              ctx.rect(badgeX - badgeW / 2, badgeY - badgeH / 2, badgeW, badgeH);
            }
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = inRange ? '#fff' : '#fca5a5';
            ctx.fillText(badgeText, badgeX, badgeY);
            ctx.restore();
          }
        } else if (ab.kind === 'teleport' && cState.hoveredTile) {
          // Teleport destination tile preview
          const inRange = Math.max(Math.abs(actor.x - cState.hoveredTile.x), Math.abs(actor.y - cState.hoveredTile.y)) <= ab.range;
          ctx.fillStyle = inRange ? 'rgba(192, 132, 252, 0.35)' : 'rgba(239, 68, 68, 0.25)';
          ctx.fillRect(cState.hoveredTile.x * ts, cState.hoveredTile.y * ts, ts, ts);
          ctx.strokeStyle = inRange ? '#c084fc' : '#ef4444';
          ctx.lineWidth = 2;
          ctx.strokeRect(cState.hoveredTile.x * ts + 1, cState.hoveredTile.y * ts + 1, ts - 2, ts - 2);
        } else if (cState.hoveredTile) {
          // Single target reticle
          const inRange = Math.max(Math.abs(actor.x - cState.hoveredTile.x), Math.abs(actor.y - cState.hoveredTile.y)) <= ab.range;
          ctx.strokeStyle = inRange ? '#fbbf24' : '#ef4444';
          ctx.lineWidth = 2;
          ctx.strokeRect(cState.hoveredTile.x * ts + 2, cState.hoveredTile.y * ts + 2, ts - 4, ts - 4);
        }
      }
    }

    // Selection border
    if (cState.selectedEntity) {
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.strokeRect(cState.selectedEntity.x * ts + 1, cState.selectedEntity.y * ts + 1, ts - 2, ts - 2);
    }

    // Entities (with Custom Portrait Token Art & Concentration Indicator)
    const tokenImages = cState._tokenImages || (cState._tokenImages = {});
    cState.entities.forEach(ent => {
      if (ent.hp <= 0) return;
      const px = ent.x * ts + ts/2;
      const py = ent.y * ts + ts/2;
      const radius = ts * 0.42;

      const pc = ent.team === 'player' ? (worldState.data.partyCharacters || []).find(c => c.id === (ent.partyCharId || ent.id)) : null;
      const portraitUrl = ent.portraitUrl || (pc && pc.portraitUrl) || null;

      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.fillStyle = ent.color || '#3b82f6';
      ctx.fill();

      if (portraitUrl) {
        if (!tokenImages[portraitUrl]) {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.src = portraitUrl;
          tokenImages[portraitUrl] = img;
        }
        const img = tokenImages[portraitUrl];
        if (img && img.complete && img.naturalWidth > 0) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(px, py, radius - 1, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(img, px - radius, py - radius, radius * 2, radius * 2);
          ctx.restore();
        }
      } else {
        // Avatar Initials
        const initial = ent.avatar || (ent.name || 'U').substring(0, 2).toUpperCase();
        ctx.font = `bold ${Math.floor(ts * 0.38)}px Inter, sans-serif`;
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(initial, px, py);
      }

      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.strokeStyle = ent.id === cState.selectedEntity?.id ? '#fff' : (ent.team === 'player' ? '#60a5fa' : '#ef4444');
      ctx.lineWidth = 2;
      ctx.stroke();

      // Concentration badge ('C')
      if (ent.concentratingOn) {
        ctx.beginPath();
        ctx.arc(px + radius * 0.72, py - radius * 0.72, 7, 0, Math.PI * 2);
        ctx.fillStyle = '#eab308';
        ctx.fill();
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 9px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('C', px + radius * 0.72, py - radius * 0.72);
      }

      // HP Bar
      const hpR = Math.max(0, ent.hp / ent.maxHp);
      const bw = ts * 0.8, bh = 4;
      ctx.fillStyle = '#334155';
      ctx.fillRect(px - bw/2, py + radius - 2, bw, bh);
      ctx.fillStyle = hpR < 0.25 ? '#ef4444' : (hpR < 0.5 ? '#eab308' : '#22c55e');
      ctx.fillRect(px - bw/2, py + radius - 2, bw * hpR, bh);
    });

    // Pings (Filtered by Perspective)
    for (let i = cState.activePings.length - 1; i >= 0; i--) {
      const ping = cState.activePings[i];
      const canSee = cState.currentPerspective === 'DM' || ping.recipients === 'ALL' || (Array.isArray(ping.recipients) && ping.recipients.includes(cState.currentPerspective));

      if (canSee) {
        const px = ping.x * ts + ts/2;
        const py = ping.y * ts + ts/2;
        const prog = 1 - (ping.life / ping.maxLife);
        const alpha = Math.max(0, ping.life / ping.maxLife);
        const r1 = (prog * ts * 1.5) % (ts * 1.5);

        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, r1, 0, Math.PI * 2);
        ctx.strokeStyle = ping.color;
        ctx.globalAlpha = alpha * (1 - r1 / (ts * 1.5));
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(px, py, ts * 0.18, 0, Math.PI * 2);
        ctx.fillStyle = ping.color;
        ctx.fill();

        ctx.fillStyle = '#fff';
        ctx.font = '10px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(ping.isSecret ? `[Secret] ${ping.senderName}` : ping.senderName, px, py - ts * 0.4);
        ctx.restore();
      }

      ping.life--;
      if (ping.life <= 0) cState.activePings.splice(i, 1);
    }

    // Floater Damage Text & AoE Blast Flashes
    for (let i = cState.effects.length - 1; i >= 0; i--) {
      const eff = cState.effects[i];
      if (eff.kind === 'aoe') {
        const alpha = Math.max(0, eff.life / eff.maxLife);
        ctx.save();
        ctx.globalAlpha = alpha * 0.55;
        ctx.fillStyle = eff.color;
        const minX = Math.max(0, eff.gx - eff.radius), maxX = Math.min(cState.gridSize - 1, eff.gx + eff.radius);
        const minY = Math.max(0, eff.gy - eff.radius), maxY = Math.min(cState.gridSize - 1, eff.gy + eff.radius);
        ctx.fillRect(minX * ts, minY * ts, (maxX - minX + 1) * ts, (maxY - minY + 1) * ts);
        ctx.restore();
        eff.life--;
        if (eff.life <= 0) cState.effects.splice(i, 1);
        continue;
      }
      ctx.fillStyle = eff.color;
      ctx.font = 'bold 16px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(eff.text, eff.x, eff.y - eff.offset);
      eff.offset += 1;
      eff.life--;
      if (eff.life <= 0) cState.effects.splice(i, 1);
    }

    // Fog of War Overlay (opaque for players, translucent for DM)
    const fogKeys = Object.keys(cState.fogOfWar || {});
    if (fogKeys.length > 0) {
      const isViewingAsDm = cState.currentPerspective === 'DM';
      ctx.fillStyle = isViewingAsDm ? 'rgba(8, 10, 16, 0.42)' : 'rgba(8, 10, 16, 0.96)';
      fogKeys.forEach(key => {
        if (!cState.fogOfWar[key]) return;
        const parts = key.split(',');
        const fx = parseInt(parts[0], 10);
        const fy = parseInt(parts[1], 10);
        if (!isNaN(fx) && !isNaN(fy)) {
          ctx.fillRect(fx * ts, fy * ts, ts, ts);
        }
      });
    }

    animationFrameId = requestAnimationFrame(render);
  }
  animationFrameId = requestAnimationFrame(render);

  // Expose controller on container and window for testing, automated verification and external integrations
  container._combatController = {
    cState,
    ABILITIES,
    BESTIARY,
    rollInitiative,
    advanceTurn,
    endCombat,
    startTurn,
    runNpcTurn,
    handleDmResolveCurrent,
    canAct,
    isHostile,
    executeAbility,
    performWeaponAttack,
    updateActionUi,
    handleUnitClick,
    handleActionClick,
    persistCombatToCloud,
    hydrateCombatFromCloud,
    setTerrainTile,
    setFogTile,
    setMapImageUrl,
    calculateEncounterDifficulty,
    saveCurrentEncounterPreset,
    loadEncounterPresetById,
    getConditionCombatEffects,
    checkConcentrationSave,
    dist,
    logMsg
  };
  if (typeof window !== 'undefined') {
    window._lastCombatController = container._combatController;
    window.renderCombatView = renderCombatView;
  }
}
