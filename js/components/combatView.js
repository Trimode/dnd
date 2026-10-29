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
          <div id="combat-phase-indicator" class="filter-chip active" style="font-weight: bold; background: #1e3a8a; color: #93c5fd; border-color: #3b82f6;">
            PLANNING
          </div>

          <!-- Ready Tracker -->
          <div style="font-size: 0.8rem; font-weight: bold; color: var(--text-gold); background: var(--bg-tertiary); padding: 0.35rem 0.65rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
            Ready: <span id="combat-ready-counter" style="color: #4ade80;">0/${party.length}</span>
          </div>

          <!-- Force Resolve Button -->
          <button id="combat-resolve-btn" class="btn btn-sm btn-primary" style="font-weight: bold; padding: 0.4rem 0.9rem;">
            Force Resolve (DM)
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
              <button class="combat-act-btn" data-action="CAST">Cast</button>
              <button class="combat-act-btn" data-action="PING">Ping</button>
            </div>

            <!-- Spell Selector -->
            <select id="combat-spell-select" class="theme-select" style="display: none; width: 100%; font-size: 0.75rem;">
              <option value="firebolt">Firebolt [Cantrip] (1d10 fire)</option>
              <option value="magic_missile">Magic Missile [Lvl 1] (3d4+3 force, auto-hit)</option>
              <option value="cure_wounds">Cure Wounds [Lvl 1] (1d8+3 heal, touch)</option>
              <option value="thunderwave">Thunderwave [Lvl 1] (2d8 thunder, Con save DC 14)</option>
              <option value="misty_step">Misty Step [Lvl 2] (30ft teleport, bonus)</option>
              <option value="scorching_ray">Scorching Ray [Lvl 2] (4d6 fire burst)</option>
              <option value="fireball">Fireball [Lvl 3] (8d6 fire, 20ft AoE, Dex save DC 15)</option>
            </select>

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

          <!-- Action Queue -->
          <div style="flex: 1; display: flex; flex-direction: column; min-height: 120px; border-top: 1px solid var(--border-subtle); padding-top: 0.5rem; margin-top: 0.25rem;">
            <div class="combat-panel-title" style="border: none; padding-bottom: 0.25rem;">
              <span>Action Queue</span>
              <button id="combat-clear-queue-btn" style="background: none; border: none; color: #ff5252; font-size: 0.7rem; font-weight: bold; cursor: pointer;">Clear</button>
            </div>
            <div id="combat-queue-list" style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 0.35rem; max-height: 140px;">
              <div style="font-size: 0.75rem; font-style: italic; color: var(--text-muted); text-align: center; margin-top: 0.75rem;">Queue is empty.</div>
            </div>
          </div>

          <!-- Party Ready Check -->
          <div style="border-top: 1px solid var(--border-subtle); padding-top: 0.5rem;">
            <div style="font-size: 0.75rem; font-weight: bold; color: var(--text-gold); text-transform: uppercase; margin-bottom: 0.35rem;">Party Ready Check</div>
            <div id="combat-party-ready-list" style="display: flex; flex-direction: column; gap: 0.25rem;"></div>
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

              <div style="display: flex; gap: 0.35rem; margin-bottom: 0.4rem;">
                <button id="combat-drop-unit-btn" class="btn btn-sm btn-primary" style="flex: 1; font-size: 0.75rem;">Drop on Map</button>
                <button id="combat-paint-btn" class="btn btn-sm" style="flex: 1; font-size: 0.75rem;">Paint: OFF</button>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: var(--text-secondary);">
              <span>Grid: <strong id="combat-grid-label">11x11</strong></span>
              <input type="range" id="combat-grid-slider" min="6" max="30" value="11" style="width: 120px; cursor: pointer;">
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
    phase: 'PLANNING',
    currentPerspective: 'DM',
    selectedEntity: null,
    selectedAction: null,
    advantageMode: 'NORMAL',
    selectedSpellId: 'firebolt',
    isPaintActive: false,
    hoveredTile: null,
    dmPingVis: 'ALL',
    dmPingRecipients: [],
    dmPingColor: '#38bdf8',
    activePings: [],
    actionQueue: [],
    entities: [],
    effects: []
  };

  // Populate Initial Entities from Aetheria Party & Monsters
  const partyData = worldState.data.partyCharacters || [];
  cState.entities = [
    {
      id: 'pc-1',
      name: partyData[0]?.name || 'Theron',
      team: 'player',
      color: '#3b82f6',
      avatar: 'TH',
      x: 3,
      y: 6,
      hp: partyData[0]?.hpCurrent || 58,
      maxHp: partyData[0]?.hpMax || 58,
      ac: partyData[0]?.ac || 16,
      speed: 7,
      movementLeft: 7,
      isReady: false,
      spellSlots: {},
      attackMod: +7,
      dmgFormula: '1d12+4',
      dmgType: 'slashing'
    },
    {
      id: 'pc-2',
      name: partyData[1]?.name || 'Lyra Dawnbloom',
      team: 'player',
      color: '#10b981',
      avatar: 'LY',
      x: 3,
      y: 5,
      hp: partyData[1]?.hpCurrent || 38,
      maxHp: partyData[1]?.hpMax || 38,
      ac: partyData[1]?.ac || 18,
      speed: 6,
      movementLeft: 6,
      isReady: false,
      spellSlots: { 1: { max: 4, current: 4 }, 2: { max: 3, current: 3 }, 3: { max: 2, current: 2 } },
      attackMod: +6,
      dmgFormula: '1d8+3',
      dmgType: 'radiant'
    },
    {
      id: 'mon-1',
      name: 'Ash Goblin Alpha',
      team: 'enemy',
      color: '#ef4444',
      avatar: 'GA',
      x: 8,
      y: 5,
      hp: 21,
      maxHp: 21,
      ac: 16,
      speed: 6,
      movementLeft: 6,
      attackMod: +5,
      dmgFormula: '1d8+3',
      dmgType: 'slashing'
    },
    {
      id: 'mon-2',
      name: 'Frost Troll',
      team: 'enemy',
      color: '#0288d1',
      avatar: 'FT',
      x: 8,
      y: 7,
      hp: 65,
      maxHp: 65,
      ac: 15,
      speed: 6,
      movementLeft: 6,
      attackMod: +7,
      dmgFormula: '2d6+4',
      dmgType: 'cold'
    }
  ];

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

  // Hover Tracking
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const gx = Math.floor((e.clientX - rect.left) / cState.tileSize);
    const gy = Math.floor((e.clientY - rect.top) / cState.tileSize);
    if (gx >= 0 && gx < cState.gridSize && gy >= 0 && gy < cState.gridSize) {
      cState.hoveredTile = { x: gx, y: gy };
    } else {
      cState.hoveredTile = null;
    }
  });

  // Right-Click Context Menu -> Instant Ping
  canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const gx = Math.floor((e.clientX - rect.left) / cState.tileSize);
    const gy = Math.floor((e.clientY - rect.top) / cState.tileSize);
    if (gx >= 0 && gx < cState.gridSize && gy >= 0 && gy < cState.gridSize) {
      triggerPing(gx, gy);
    }
  });

  // Canvas Click Handler
  canvas.addEventListener('click', (e) => {
    if (hasDragged) { hasDragged = false; return; }
    const rect = canvas.getBoundingClientRect();
    const gx = Math.floor((e.clientX - rect.left) / cState.tileSize);
    const gy = Math.floor((e.clientY - rect.top) / cState.tileSize);

    if (e.shiftKey || e.altKey || cState.selectedAction === 'PING') {
      triggerPing(gx, gy);
      if (cState.selectedAction === 'PING') {
        cState.selectedAction = null;
        updateActionUi();
      }
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
        notifyToast(`Enemy: ${entity.name} (AC: ${entity.ac}, HP: ${entity.hp}/${entity.maxHp})`);
      }
    } else {
      cState.selectedEntity = null;
      cState.selectedAction = null;
    }
    updateActionUi();
  }

  function handleActionClick(gx, gy, clickedEntity) {
    const actor = cState.selectedEntity;
    if (!actor) return;
    if (!worldState.canControlCharacter(actor.id, actor)) {
      notifyToast(`You cannot control ${actor.name}! (Controlled by ${worldState.getCharacterOwnerName(actor.id, actor)})`);
      return;
    }
    const act = cState.selectedAction;

    if (act === 'MOVE') {
      if (clickedEntity) return notifyToast('Space occupied!');
      const dist = Math.max(Math.abs(actor.x - gx), Math.abs(actor.y - gy));
      if (dist > actor.movementLeft) return notifyToast(`Not enough move! (${actor.movementLeft} left)`);
      actor.x = gx;
      actor.y = gy;
      actor.movementLeft -= dist;
      logMsg(`${actor.name} advanced ${dist} tile(s).`, 'var(--text-primary)');
      updateActionUi();
    } else if (act === 'ATTACK') {
      if (!clickedEntity || clickedEntity.team !== 'enemy') return notifyToast('Must target an enemy!');
      const dist = Math.max(Math.abs(actor.x - clickedEntity.x), Math.abs(actor.y - clickedEntity.y));
      if (dist > 1) return notifyToast('Target out of melee reach!');
      cState.actionQueue.push({
        type: 'ATTACK',
        actorId: actor.id,
        targetId: clickedEntity.id,
        advantageMode: cState.advantageMode,
        desc: `${actor.name} prepares to strike ${clickedEntity.name}`
      });
      notifyToast('Attack queued.');
      renderQueue();
    } else if (act === 'CAST') {
      const spellId = cState.selectedSpellId;
      if (spellId === 'misty_step') {
        if (clickedEntity) return notifyToast('Tile occupied!');
        actor.x = gx;
        actor.y = gy;
        logMsg(`${actor.name} casts Misty Step and teleports!`, '#c084fc');
        notifyToast('Teleported immediately.');
      } else if (spellId === 'fireball' || spellId === 'thunderwave') {
        cState.actionQueue.push({
          type: 'CAST',
          spellId: spellId,
          actorId: actor.id,
          targetX: gx,
          targetY: gy,
          desc: `${actor.name} casts ${spellId.toUpperCase()} at (${gx}, ${gy})`
        });
        notifyToast('Spell queued.');
        renderQueue();
      } else {
        if (!clickedEntity || clickedEntity.team !== 'enemy') return notifyToast('Target an enemy!');
        cState.actionQueue.push({
          type: 'CAST',
          spellId: spellId,
          actorId: actor.id,
          targetId: clickedEntity.id,
          advantageMode: cState.advantageMode,
          desc: `${actor.name} casts ${spellId} at ${clickedEntity.name}`
        });
        notifyToast('Spell queued.');
        renderQueue();
      }
    }
    cState.selectedAction = null;
    updateActionUi();
  }

  function updateActionUi() {
    const actor = cState.selectedEntity;
    const info = container.querySelector('#combat-active-unit-info');
    const controls = container.querySelector('#combat-action-controls');
    const spellSelect = container.querySelector('#combat-spell-select');
    const unitSavePanel = container.querySelector('#combat-unit-save-panel');
    const dmPushPanel = container.querySelector('#combat-dm-push-panel');
    const isDm = Boolean(worldState.prefs && worldState.prefs.dmMode);

    container.querySelectorAll('.combat-act-btn').forEach(b => b.classList.remove('active'));

    if (actor) {
      const canControl = worldState.canControlCharacter(actor.id, actor);
      const ownerName = worldState.getCharacterOwnerName(actor.id, actor);

      info.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
          <span style="font-size: 0.85rem; font-weight: bold; color: var(--text-gold); background: var(--bg-tertiary); padding: 2px 6px; border-radius: 4px;">${actor.avatar || actor.name.substring(0, 2).toUpperCase()}</span>
          <div>
            <strong style="color: var(--text-gold); font-size: 0.9rem;">${actor.name}</strong>
            <span style="font-size: 0.7rem; color: var(--text-muted); margin-left: 0.35rem;">(AC ${actor.ac})</span>
            <span class="badge" style="font-size: 0.65rem; margin-left: 0.35rem; background: ${actor.team === 'player' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(239, 68, 68, 0.2)'}; color: ${actor.team === 'player' ? '#93c5fd' : '#fca5a5'};">
              ${actor.team === 'player' ? 'Player' : 'Enemy / NPC'}
            </span>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-secondary);">
          <span>HP: <strong style="color: #4ade80;">${actor.hp}</strong> / ${actor.maxHp}</span>
          <span>Move: <strong style="color: #60a5fa;">${actor.movementLeft}</strong>/${actor.speed}</span>
        </div>
        ${!canControl ? `
          <div style="margin-top: 0.45rem; padding: 0.35rem 0.55rem; background: rgba(148, 163, 184, 0.08); border: 1px dashed rgba(148, 163, 184, 0.35); border-radius: var(--radius-sm); font-size: 0.7rem; color: var(--text-muted); display: flex; align-items: center; justify-content: space-between;">
            <span>🔒 Controlled by: <strong style="color: var(--text-gold);">${ownerName}</strong></span>
            <span class="badge" style="background: rgba(244, 67, 54, 0.15); color: #fca5a5; font-size: 0.65rem;">Read-Only</span>
          </div>
        ` : ''}
      `;

      // ONLY the player who owns this character or the DM has action controls
      if (canControl) {
        controls.style.display = 'flex';
        if (cState.selectedAction === 'CAST') spellSelect.style.display = 'block';
        else spellSelect.style.display = 'none';
      } else {
        controls.style.display = 'none';
        spellSelect.style.display = 'none';
      }

      // 1. Show Saving Throws panel for DM controlled units (ONLY for DM)
      if (unitSavePanel) {
        if (isDm) {
          unitSavePanel.style.display = 'block';
        } else {
          unitSavePanel.style.display = 'none';
        }
      }

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
      info.innerHTML = 'Select a unit on the battlemat to plan moves.';
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
    let mod = 0;
    const name = unit.name.toLowerCase();
    if (unit.stats && unit.stats[statKey.toLowerCase()] !== undefined) {
      mod = Math.floor((unit.stats[statKey.toLowerCase()] - 10) / 2);
    } else {
      if (name.includes('goblin')) {
        mod = statKey === 'DEX' ? 2 : (statKey === 'STR' ? -1 : (statKey === 'CON' ? 0 : 0));
      } else if (name.includes('troll')) {
        mod = statKey === 'CON' ? 5 : (statKey === 'STR' ? 4 : (statKey === 'WIS' ? -1 : (statKey === 'DEX' ? 1 : -1)));
      } else if (name.includes('dragon')) {
        mod = statKey === 'STR' ? 4 : (statKey === 'DEX' ? 1 : (statKey === 'CON' ? 3 : 2));
      } else if (name.includes('orc')) {
        mod = statKey === 'STR' ? 3 : (statKey === 'CON' ? 3 : (statKey === 'INT' ? -2 : 0));
      } else if (name.includes('skeleton')) {
        mod = statKey === 'DEX' ? 2 : (statKey === 'CON' ? 2 : -1);
      } else if (name.includes('owlbear')) {
        mod = statKey === 'STR' ? 5 : (statKey === 'CON' ? 3 : 1);
      } else {
        mod = 2;
      }
    }

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

  function renderQueue() {
    const list = container.querySelector('#combat-queue-list');
    list.innerHTML = '';
    if (cState.actionQueue.length === 0) {
      list.innerHTML = '<div style="font-size: 0.75rem; font-style: italic; color: var(--text-muted); text-align: center; margin-top: 0.75rem;">Queue is empty.</div>';
      return;
    }
    cState.actionQueue.forEach((a, idx) => {
      const actor = cState.entities.find(e => e.id === a.actorId);
      const canControl = worldState.canControlCharacter(a.actorId, actor);
      const el = document.createElement('div');
      el.style.background = 'var(--bg-tertiary)';
      el.style.borderLeft = '3px solid var(--text-gold)';
      el.style.borderRadius = 'var(--radius-sm)';
      el.style.padding = '0.35rem 0.5rem';
      el.style.fontSize = '0.75rem';
      el.style.display = 'flex';
      el.style.justifyContent = 'space-between';
      el.style.alignItems = 'center';
      el.innerHTML = `
        <span>${a.desc}</span>
        ${canControl ? `<button style="background: none; border: none; color: #ff5252; font-weight: bold; cursor: pointer;" title="Cancel action">&times;</button>` : `<span style="font-size: 0.65rem; color: var(--text-muted);">Queued</span>`}
      `;
      if (canControl) {
        el.querySelector('button').addEventListener('click', () => {
          cState.actionQueue.splice(idx, 1);
          renderQueue();
        });
      }
      list.appendChild(el);
    });
  }

  function renderReadyList() {
    const readyContainer = container.querySelector('#combat-party-ready-list');
    const counter = container.querySelector('#combat-ready-counter');
    const players = cState.entities.filter(e => e.team === 'player');
    const readyCount = players.filter(e => e.isReady).length;
    if (counter) counter.textContent = `${readyCount}/${players.length}`;

    readyContainer.innerHTML = '';
    players.forEach(p => {
      const canControl = worldState.canControlCharacter(p.id, p);
      const ownerName = worldState.getCharacterOwnerName(p.id, p);
      const el = document.createElement('div');
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'space-between';
      el.style.background = 'var(--bg-tertiary)';
      el.style.borderRadius = '3px';
      el.style.padding = '0.2rem 0.5rem';
      el.style.fontSize = '0.75rem';
      el.innerHTML = `
        <span title="Controlled by: ${ownerName}">${p.name} ${!canControl ? `<span style="font-size: 0.65rem; color: var(--text-muted);">(${ownerName})</span>` : ''}</span>
        <button style="border: none; border-radius: 3px; font-size: 0.65rem; font-weight: bold; padding: 1px 6px; cursor: ${canControl ? 'pointer' : 'default'}; opacity: ${canControl ? '1' : '0.6'}; background: ${p.isReady ? '#15803d' : 'var(--bg-secondary)'}; color: ${p.isReady ? '#fff' : 'var(--text-muted)'};" title="${canControl ? 'Click to toggle ready' : `Controlled by ${ownerName}`}">
          ${p.isReady ? 'READY' : 'WAITING'}
        </button>
      `;
      if (canControl) {
        el.querySelector('button').addEventListener('click', () => {
          p.isReady = !p.isReady;
          renderReadyList();
        });
      }
      readyContainer.appendChild(el);
    });
  }
  renderReadyList();

  // Execution Phase
  async function resolveCombatRound() {
    cState.phase = 'EXECUTION';
    const indicator = container.querySelector('#combat-phase-indicator');
    const resolveBtn = container.querySelector('#combat-resolve-btn');
    indicator.textContent = 'EXECUTION';
    indicator.style.background = '#7f1d1d';
    indicator.style.color = '#fca5a5';
    indicator.style.borderColor = '#ef4444';
    resolveBtn.disabled = true;

    logMsg('--- Turn Execution Begins ---', 'var(--text-gold)');

    for (const action of cState.actionQueue) {
      const actor = cState.entities.find(e => e.id === action.actorId);
      if (!actor || actor.hp <= 0) continue;

      if (action.type === 'ATTACK') {
        const target = cState.entities.find(e => e.id === action.targetId);
        if (!target || target.hp <= 0) continue;

        const d1 = Math.floor(Math.random() * 20) + 1;
        const total = d1 + (actor.attackMod || 5);
        if (d1 === 20 || total >= target.ac) {
          const dmg = Math.floor(Math.random() * 8) + 4;
          target.hp = Math.max(0, target.hp - dmg);
          logMsg(`${actor.name} strikes ${target.name} (Rolled ${total} vs AC ${target.ac}) for ${dmg} dmg!`, '#4ade80');
          cState.effects.push({ text: `-${dmg}`, x: target.x * cState.tileSize + cState.tileSize/2, y: target.y * cState.tileSize + cState.tileSize/2, color: '#ef4444', life: 35, offset: 0 });
        } else {
          logMsg(`${actor.name} misses ${target.name} (Rolled ${total} vs AC ${target.ac}).`, '#94a3b8');
        }
      } else if (action.type === 'CAST') {
        if (action.spellId === 'fireball') {
          const cx = action.targetX, cy = action.targetY;
          logMsg(`${actor.name} detonates Fireball at (${cx}, ${cy})!`, '#fb923c');
          const victims = cState.entities.filter(e => e.hp > 0 && Math.max(Math.abs(e.x - cx), Math.abs(e.y - cy)) <= 3);
          victims.forEach(v => {
            const dmg = Math.floor(Math.random() * 24) + 12;
            v.hp = Math.max(0, v.hp - dmg);
            logMsg(`  ↳ ${v.name} takes ${dmg} fire damage!`, '#fb923c');
            cState.effects.push({ text: `-${dmg}`, x: v.x * cState.tileSize + cState.tileSize/2, y: v.y * cState.tileSize + cState.tileSize/2, color: '#f97316', life: 35, offset: 0 });
          });
        }
      }
      await new Promise(r => setTimeout(r, 600));
    }

    // Enemy AI Step
    const aliveEnemies = cState.entities.filter(e => e.team === 'enemy' && e.hp > 0);
    const alivePlayers = cState.entities.filter(e => e.team === 'player' && e.hp > 0);
    if (aliveEnemies.length > 0 && alivePlayers.length > 0) {
      logMsg('--- Hostile Counter-Action ---', '#f87171');
      for (const enemy of aliveEnemies) {
        const target = alivePlayers[0];
        const dist = Math.max(Math.abs(enemy.x - target.x), Math.abs(enemy.y - target.y));
        if (dist > 1) {
          enemy.x += Math.sign(target.x - enemy.x);
          enemy.y += Math.sign(target.y - enemy.y);
        }
        if (Math.max(Math.abs(enemy.x - target.x), Math.abs(enemy.y - target.y)) === 1) {
          const dmg = Math.floor(Math.random() * 6) + 2;
          target.hp = Math.max(0, target.hp - dmg);
          logMsg(`${enemy.name} attacks ${target.name} for ${dmg} damage!`, '#ef4444');
          cState.effects.push({ text: `-${dmg}`, x: target.x * cState.tileSize + cState.tileSize/2, y: target.y * cState.tileSize + cState.tileSize/2, color: '#ef4444', life: 35, offset: 0 });
        }
      }
    }

    // Cleanup & Reset Turn
    cState.actionQueue = [];
    cState.entities.forEach(e => {
      if (e.team === 'player') e.isReady = false;
      e.movementLeft = e.speed;
    });
    cState.phase = 'PLANNING';
    indicator.textContent = 'PLANNING';
    indicator.style.background = '#1e3a8a';
    indicator.style.color = '#93c5fd';
    indicator.style.borderColor = '#3b82f6';
    resolveBtn.disabled = false;
    renderQueue();
    renderReadyList();
    updateActionUi();
    logMsg('--- Planning Phase Begins ---', 'var(--text-gold)');
  }

  // UI Event Bindings
  container.querySelector('#combat-resolve-btn').addEventListener('click', resolveCombatRound);
  container.querySelector('#combat-clear-queue-btn').addEventListener('click', () => {
    cState.actionQueue = [];
    renderQueue();
    notifyToast('Queue cleared.');
  });

  // Action Buttons
  container.querySelectorAll('.combat-act-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const act = e.currentTarget.dataset.action;
      cState.selectedAction = act;
      container.querySelectorAll('.combat-act-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');

      const spSelect = container.querySelector('#combat-spell-select');
      if (act === 'CAST') spSelect.style.display = 'block';
      else spSelect.style.display = 'none';

      if (act === 'PING') notifyToast('Click any square on the map to ping!');
      else notifyToast(`Select target for ${act.toLowerCase()}...`);
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
    const cx = Math.floor(cState.gridSize / 2);
    const cy = Math.floor(cState.gridSize / 2);

    if (val.startsWith('party_')) {
      const pid = val.replace('party_', '');
      const pData = partyData.find(p => p.id === pid);
      if (pData) {
        cState.entities.push({
          id: 'pc_' + Date.now(),
          name: pData.name,
          team: 'player',
          color: '#3b82f6',
          avatar: pData.name.substring(0, 2).toUpperCase(),
          x: cx,
          y: cy,
          hp: pData.hpCurrent,
          maxHp: pData.hpMax,
          ac: pData.ac,
          speed: 6,
          movementLeft: 6,
          isReady: false
        });
        notifyToast(`${pData.name} placed on map!`);
        renderReadyList();
      }
    } else {
      cState.entities.push({
        id: 'mon_' + Date.now(),
        name: val,
        team: 'enemy',
        color: '#ef4444',
        avatar: val.substring(0, 2).toUpperCase(),
        x: cx,
        y: cy,
        hp: 20,
        maxHp: 20,
        ac: 14,
        speed: 6,
        movementLeft: 6
      });
      notifyToast(`${val} spawned on map!`);
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

  // Listen to worldState state changes for real-time rolls and requests
  worldState.subscribe(() => {
    renderCombatPendingBanner();
    updateActionUi();
  });

  // Render Loop
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const ts = cState.tileSize;

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
          const dist = Math.max(Math.abs(cState.selectedEntity.x - x), Math.abs(cState.selectedEntity.y - y));
          if (dist <= cState.selectedEntity.movementLeft && !cState.entities.find(e => e.x === x && e.y === y && e.hp > 0)) {
            ctx.fillRect(x * ts, y * ts, ts, ts);
          }
        }
      }
    }

    // Selection border
    if (cState.selectedEntity) {
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.strokeRect(cState.selectedEntity.x * ts + 1, cState.selectedEntity.y * ts + 1, ts - 2, ts - 2);
    }

    // Entities
    cState.entities.forEach(ent => {
      if (ent.hp <= 0) return;
      const px = ent.x * ts + ts/2;
      const py = ent.y * ts + ts/2;
      const radius = ts * 0.42;

      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.fillStyle = ent.color || '#3b82f6';
      ctx.fill();
      ctx.strokeStyle = ent.id === cState.selectedEntity?.id ? '#fff' : (ent.team === 'player' ? '#60a5fa' : '#ef4444');
      ctx.lineWidth = 2;
      ctx.stroke();

      // Avatar Initials
      const initial = ent.avatar || (ent.name || 'U').substring(0, 2).toUpperCase();
      ctx.font = `bold ${Math.floor(ts * 0.38)}px Inter, sans-serif`;
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(initial, px, py);

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

    // Floater Damage Text
    for (let i = cState.effects.length - 1; i >= 0; i--) {
      const eff = cState.effects[i];
      ctx.fillStyle = eff.color;
      ctx.font = 'bold 16px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(eff.text, eff.x, eff.y - eff.offset);
      eff.offset += 1;
      eff.life--;
      if (eff.life <= 0) cState.effects.splice(i, 1);
    }

    animationFrameId = requestAnimationFrame(render);
  }
  animationFrameId = requestAnimationFrame(render);
}
