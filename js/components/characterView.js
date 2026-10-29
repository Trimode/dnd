/**
 * Character Dossiers View (5.5e Statblocks & Lore)
 */
import { worldState } from '../state/worldState.js';
import { soundEngine } from '../audio/soundEngine.js';

export function renderCharacterView(container) {
  const { data, prefs } = worldState;
  const isDm = prefs.dmMode;

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h2>Legendary Champions & Wardens</h2>
        <div class="view-tagline">Dossiers, 5.5e Statblocks, Tactical Actions, and Secret Backstories</div>
      </div>
      <div style="display: flex; gap: 0.5rem;">
        <input type="text" id="char-search-input" placeholder="Filter champions by name, role, mastery..." 
               class="editor-input" style="width: 280px; padding: 0.4rem 0.75rem;">
      </div>
    </div>

    <div class="cards-grid" id="characters-grid-container">
      <!-- Injected dynamically -->
    </div>
  `;

  const gridContainer = container.querySelector('#characters-grid-container');
  const searchInput = container.querySelector('#char-search-input');

  function renderCards(filterText = '') {
    const term = filterText.toLowerCase();
    const filteredChars = data.characters.filter(c => 
      c.name.toLowerCase().includes(term) ||
      c.title.toLowerCase().includes(term) ||
      c.species.toLowerCase().includes(term) ||
      c.classRole.toLowerCase().includes(term) ||
      c.elementalAffinity.toLowerCase().includes(term) ||
      (c.weaponMastery && c.weaponMastery.some(m => m.toLowerCase().includes(term)))
    );

    if (filteredChars.length === 0) {
      gridContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem;">No champions match your filter.</div>`;
      return;
    }

    gridContainer.innerHTML = filteredChars.map(char => {
      // Elemental emblem icon
      let emblem = '*';
      if (char.elementalAffinity.includes('Fire')) emblem = 'F';
      else if (char.elementalAffinity.includes('Earth')) emblem = 'E';
      else if (char.elementalAffinity.includes('Frost') || char.elementalAffinity.includes('Water')) emblem = 'W';
      else if (char.elementalAffinity.includes('Air')) emblem = 'A';
      else if (char.elementalAffinity.includes('All')) emblem = '*';

      return `
        <div class="char-card" id="card-${char.id}">
          <div class="char-card-header">
            <div class="char-avatar-emblem">${emblem}</div>
            <div class="char-info-top">
              <h3>${char.name}</h3>
              <div class="char-title-tag">${char.title}</div>
            </div>
          </div>

          <div class="char-meta-row">
            <span class="meta-badge">${char.species}</span>
            <span class="meta-badge">${char.classRole}</span>
            <span class="meta-badge" style="color: var(--text-gold);">${char.elementalAffinity}</span>
            <span class="meta-badge">${char.alignment}</span>
          </div>

          <div class="char-quote-box" title="Click to hear resonance" style="cursor: pointer;">
            ${char.quote}
          </div>

          <div class="char-bio">${char.bio}</div>

          <div style="font-size: 0.9rem;">
            <strong>Bastion Seat:</strong> <span style="color: var(--text-gold);">${char.bastion}</span>
          </div>

          <!-- 5.5e Weapon Masteries -->
          <div>
            <div style="font-family: var(--font-sans); font-size: 0.75rem; font-weight: 700; color: var(--text-gold); margin-bottom: 0.35rem;">
              5.5e WEAPON MASTERIES
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
              ${char.weaponMastery.map(m => `<span class="mastery-badge">${m}</span>`).join('')}
            </div>
          </div>

          <!-- 5.5e Statblock Table -->
          <div class="statblock-compact">
            <div class="stats-scores-row">
              <div class="score-box"><div class="score-label">STR</div><div class="score-val">${char.stats5e.str}</div></div>
              <div class="score-box"><div class="score-label">DEX</div><div class="score-val">${char.stats5e.dex}</div></div>
              <div class="score-box"><div class="score-label">CON</div><div class="score-val">${char.stats5e.con}</div></div>
              <div class="score-box"><div class="score-label">INT</div><div class="score-val">${char.stats5e.int}</div></div>
              <div class="score-box"><div class="score-label">WIS</div><div class="score-val">${char.stats5e.wis}</div></div>
              <div class="score-box"><div class="score-label">CHA</div><div class="score-val">${char.stats5e.cha}</div></div>
            </div>
            <div class="stat-summary-row">
              <div><strong>AC:</strong> ${char.stats5e.ac}</div>
              <div><strong>HP:</strong> ${char.stats5e.hp}</div>
              <div><strong>Rating:</strong> <span style="color: var(--text-gold);">${char.stats5e.cr}</span></div>
            </div>
          </div>

          <!-- Tactical Abilities -->
          <div>
            <div style="font-family: var(--font-sans); font-size: 0.75rem; font-weight: 700; color: var(--text-gold); margin-bottom: 0.35rem;">
              TACTICAL & LEGENDARY ACTIONS
            </div>
            <ul class="abilities-list">
              ${char.tacticalAbilities.map(ab => `<li class="ability-item">${ab}</li>`).join('')}
            </ul>
          </div>

          <!-- DM Secret Reveal Banner -->
          ${worldState.prefs.dmMode && char.secretsDM ? `
            <div class="dm-secret-banner">
              <div class="banner-title">DM Confidential Lore & True Motive</div>
              <div class="banner-text">${char.secretsDM}</div>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    // Quote click sound
    gridContainer.querySelectorAll('.char-quote-box').forEach(q => {
      q.addEventListener('click', () => {
        soundEngine.playDiceRoll(true);
      });
    });
  }

  searchInput.addEventListener('input', (e) => {
    renderCards(e.target.value);
  });

  renderCards();
}
