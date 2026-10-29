/**
 * Factions & Continental Influence Matrix Component for D&D 5.5e
 * Features DM-Exclusive Dynamic Standing Bonuses & Afflictions
 */
import { worldState } from '../state/worldState.js';

export function renderFactionView(container) {
  const { data } = worldState;

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h2>Factions & Continental Influence Matrix</h2>
        <div class="view-tagline">Political Power, Alliances, Party Reputation, and DM-Exclusive Standing Boons & Afflictions</div>
      </div>
    </div>
    <div class="cards-grid" id="factions-grid-container"></div>
  `;

  const gridContainer = container.querySelector('#factions-grid-container');

  function renderCards() {
    gridContainer.innerHTML = data.factions.map(faction => {
      const standing = faction.playerStanding || 0;
      let rankLabel = 'Neutral';
      let rankClass = 'neutral';
      if (standing >= 4) { rankLabel = 'Exalted (+4/+5)'; rankClass = 'exalted'; }
      else if (standing >= 2) { rankLabel = 'Honored (+2/+3)'; rankClass = 'friendly'; }
      else if (standing >= 1) { rankLabel = 'Friendly (+1)'; rankClass = 'friendly'; }
      else if (standing <= -3) { rankLabel = 'Hated (-3/-5)'; rankClass = 'hostile'; }
      else if (standing <= -1) { rankLabel = 'Hostile (-1/-2)'; rankClass = 'hostile'; }

      // Calculate currently active DM effect
      let activeDmEffect = null;
      if (faction.dmBonusesAndAfflictions) {
        if (standing >= 3) {
          activeDmEffect = { type: 'bonus', title: 'Active High Tier Bonus (+3 to +5)', data: faction.dmBonusesAndAfflictions.bonuses[1] };
        } else if (standing >= 1) {
          activeDmEffect = { type: 'bonus', title: 'Active Mid Tier Bonus (+1 to +2)', data: faction.dmBonusesAndAfflictions.bonuses[0] };
        } else if (standing <= -3) {
          activeDmEffect = { type: 'affliction', title: 'Active Severe Affliction (-3 to -5)', data: faction.dmBonusesAndAfflictions.afflictions[1] };
        } else if (standing <= -1) {
          activeDmEffect = { type: 'affliction', title: 'Active Minor Affliction (-1 to -2)', data: faction.dmBonusesAndAfflictions.afflictions[0] };
        } else {
          activeDmEffect = { type: 'neutral', title: 'Neutral Standing (0)', data: { name: 'No Active Boons or Afflictions', effect: 'Faction monitors the party with watchful neutrality. Standard market rates apply.' } };
        }
      }

      return `
        <div class="faction-card">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <h3 style="font-size: 1.3rem;">${faction.name}</h3>
              <div style="font-style: italic; font-size: 0.85rem; color: var(--text-gold); margin-top: 0.2rem;">
                ${faction.motto}
              </div>
            </div>
            <span class="meta-badge">${faction.alignment}</span>
          </div>

          <div style="font-size: 0.9rem;">
            <strong>Supreme Leader:</strong> ${faction.leader}<br>
            <strong>Stronghold Seat:</strong> ${faction.headquarters}
          </div>

          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-family: var(--font-sans); color: var(--text-muted);">
              <span>Continental Influence</span>
              <span><strong>${faction.influence}%</strong></span>
            </div>
            <div class="influence-bar-wrapper">
              <div class="influence-fill" style="width: ${faction.influence}%;"></div>
            </div>
          </div>

          <div class="standing-control-row">
            <div style="display: flex; flex-direction: column;">
              <span style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-sans);">PARTY STANDING</span>
              <span class="standing-rank-badge ${rankClass}">${rankLabel} [${standing > 0 ? '+' + standing : standing}]</span>
            </div>
            ${worldState.prefs.dmMode ? `
              <div style="display: flex; gap: 0.35rem; align-items: center;">
                <button class="btn btn-sm standing-btn" data-faction-id="${faction.id}" data-delta="-1" title="DM: Decrease Standing">−</button>
                <button class="btn btn-sm standing-btn" data-faction-id="${faction.id}" data-delta="1" title="DM: Increase Standing">+</button>
                <span style="font-size: 0.7rem; color: #ff7961; font-weight: bold; margin-left: 0.2rem;">(DM)</span>
              </div>
            ` : ''}
          </div>

          <p style="font-size: 0.95rem;">${faction.overview}</p>

          <div style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.85rem;">
            <div>
              <strong style="color: #4caf50;">Known Allies:</strong> 
              ${faction.allies.length > 0 ? faction.allies.join(', ') : 'None / Isolated'}
            </div>
            <div>
              <strong style="color: #e57373;">Rivals & Conflicts:</strong> 
              ${faction.rivals.length > 0 ? faction.rivals.join(', ') : 'None'}
            </div>
          </div>

          <!-- Public Player Perks -->
          <div>
            <div style="font-family: var(--font-sans); font-size: 0.75rem; font-weight: 700; color: var(--text-gold); margin-bottom: 0.35rem;">
              PUBLIC REPUTATION PERKS
            </div>
            <ul class="abilities-list">
              ${faction.perks.map(p => `<li class="ability-item" style="border-left-color: #4caf50;">${p}</li>`).join('')}
            </ul>
          </div>

          <!-- DM-EXCLUSIVE ACTIVE BONUSES & AFFLICTIONS MATRIX -->
          ${worldState.prefs.dmMode && faction.dmBonusesAndAfflictions ? `
            <div class="standing-matrix-dm">
              <div style="font-family: var(--font-sans); font-size: 0.75rem; font-weight: 700; color: #ff7961; text-transform: uppercase; letter-spacing: 0.05em; display: flex; justify-content: space-between; align-items: center;">
                <span>DM Standing Mechanics</span>
                <span style="font-size: 0.7rem; color: var(--text-muted);">(Hidden from Players)</span>
              </div>

              <!-- Currently Active Threshold Effect -->
              <div class="active-effect-banner ${activeDmEffect.type}">
                <strong>${activeDmEffect.title}: ${activeDmEffect.data.name}</strong><br>
                <span>${activeDmEffect.data.effect}</span>
              </div>

              <!-- Complete Threshold Reference for DM -->
              <div style="margin-top: 0.35rem;">
                <div style="font-size: 0.75rem; font-weight: bold; color: var(--text-gold); margin-bottom: 0.25rem;">
                  All Standing Thresholds:
                </div>
                <div class="threshold-tier-list">
                  <div class="threshold-tier-item" style="color: #81c784;">
                    <span><strong>Tier +3 to +5 (Exalted):</strong> ${faction.dmBonusesAndAfflictions.bonuses[1].name}</span>
                    <span style="color: #c8e6c9;">${faction.dmBonusesAndAfflictions.bonuses[1].effect}</span>
                  </div>
                  <div class="threshold-tier-item" style="color: #a5d6a7;">
                    <span><strong>Tier +1 to +2 (Friendly):</strong> ${faction.dmBonusesAndAfflictions.bonuses[0].name}</span>
                    <span style="color: #c8e6c9;">${faction.dmBonusesAndAfflictions.bonuses[0].effect}</span>
                  </div>
                  <div class="threshold-tier-item" style="color: #ffab91;">
                    <span><strong>Tier -1 to -2 (Hostile):</strong> ${faction.dmBonusesAndAfflictions.afflictions[0].name}</span>
                    <span style="color: #ffcdd2;">${faction.dmBonusesAndAfflictions.afflictions[0].effect}</span>
                  </div>
                  <div class="threshold-tier-item" style="color: #ef9a9a;">
                    <span><strong>Tier -3 to -5 (Hated):</strong> ${faction.dmBonusesAndAfflictions.afflictions[1].name}</span>
                    <span style="color: #ffcdd2;">${faction.dmBonusesAndAfflictions.afflictions[1].effect}</span>
                  </div>
                </div>
              </div>
            </div>
          ` : ''}

          ${worldState.prefs.dmMode && faction.dmSecrets ? `
            <div class="dm-secret-banner" style="margin-top: 0.5rem;">
              <div class="banner-title">DM Confidential Agendas & Undercover Cells</div>
              <div class="banner-text">${faction.dmSecrets}</div>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    gridContainer.querySelectorAll('.standing-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const fId = btn.getAttribute('data-faction-id');
        const delta = parseInt(btn.getAttribute('data-delta'), 10);
        worldState.updatePartyStanding(fId, delta);
        renderCards();
      });
    });
  }

  renderCards();
}
