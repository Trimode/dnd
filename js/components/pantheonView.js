/**
 * Pantheon & Divine Titans View Component for D&D 5.5e
 */
import { worldState } from '../state/worldState.js';

export function renderPantheonView(container) {
  const { data } = worldState;
  const pantheon = data.pantheon || [];

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h2>The Divine Pantheon & Elemental Titans</h2>
        <div class="view-tagline">Distant Progenitors, Walking Avatars, Fallen Deities, and the God of the Last Candle</div>
      </div>
      <div>
        <input type="text" id="deity-search-input" placeholder="Filter deities, domains, tenets..." class="editor-input" style="width: 280px; padding: 0.4rem 0.75rem;">
      </div>
    </div>

    <!-- Interactive Prayer Altar / Divine Blessing Chamber -->
    <div class="prayer-altar-box">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h3 style="color: var(--text-gold); font-size: 1.25rem; margin-bottom: 0.35rem;">
            The Altar of the Bleeding Covenant
          </h3>
          <p style="font-size: 0.95rem; color: var(--text-secondary);">
            Kneel before a chosen deity or elemental titan to offer prayer, swear a 5.5e sacred oath, and receive an inspired divine blessing.
          </p>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <select id="altar-deity-select" class="theme-select" style="font-size: 0.95rem; padding: 0.5rem 0.85rem;">
            ${pantheon.map(d => `<option value="${d.id}">${d.name} (${d.category})</option>`).join('')}
          </select>
          <button class="btn btn-primary" id="commune-deity-btn">Offer Prayer / Swear Oath</button>
        </div>
      </div>

      <div id="altar-blessing-result" style="display: none; margin-top: 1.25rem;" class="bastion-turn-log"></div>
    </div>

    <!-- Filter Bar -->
    <div class="map-controls-bar" style="margin-bottom: 1.5rem;">
      <div class="map-filters" id="deity-filters-group">
        <button class="filter-chip active" data-filter="all">All Divinities</button>
        <button class="filter-chip" data-filter="Distant">Distant Titans</button>
        <button class="filter-chip" data-filter="Walking">Walking / Incognito Gods</button>
        <button class="filter-chip" data-filter="Fallen">Fallen & Corrupted</button>
        <button class="filter-chip" data-filter="Lost">Lost Ones</button>
        <button class="filter-chip" data-filter="Solitary">Single Worshipper</button>
      </div>
    </div>

    <div class="cards-grid" id="deities-cards-container"></div>
  `;

  const cardsContainer = container.querySelector('#deities-cards-container');
  const searchInput = container.querySelector('#deity-search-input');
  const altarSelect = container.querySelector('#altar-deity-select');
  const communeBtn = container.querySelector('#commune-deity-btn');
  const blessingResult = container.querySelector('#altar-blessing-result');

  let currentFilter = 'all';

  function renderDeityCards(query = '') {
    const term = query.toLowerCase();
    const filtered = pantheon.filter(d => {
      const matchesText = d.name.toLowerCase().includes(term) ||
                          d.title.toLowerCase().includes(term) ||
                          d.domains.toLowerCase().includes(term) ||
                          d.clericDomains.toLowerCase().includes(term) ||
                          d.tenets.toLowerCase().includes(term);

      if (!matchesText) return false;
      if (currentFilter === 'all') return true;
      if (currentFilter === 'Distant' && d.category.includes('Distant')) return true;
      if (currentFilter === 'Walking' && d.category.includes('Walking')) return true;
      if (currentFilter === 'Fallen' && d.category.includes('Fallen')) return true;
      if (currentFilter === 'Lost' && d.category.includes('Lost')) return true;
      if (currentFilter === 'Solitary' && d.category.includes('Single')) return true;
      return false;
    });

    cardsContainer.innerHTML = filtered.map(d => {
      let pillClass = 'titan';
      if (d.category.includes('Walking')) pillClass = 'walking';
      else if (d.category.includes('Fallen')) pillClass = 'fallen';
      else if (d.category.includes('Lost')) pillClass = 'lost';
      else if (d.category.includes('Single')) pillClass = 'solitary';

      return `
        <div class="deity-card">
          <div class="deity-card-header">
            <div class="deity-symbol-large">${d.symbol}</div>
            <div style="flex: 1;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;">
                <h3 style="font-size: 1.3rem;">${d.name}</h3>
                <span class="deity-type-pill ${pillClass}">${d.category}</span>
              </div>
              <div class="deity-title-banner">${d.title}</div>
            </div>
          </div>

          <div class="char-meta-row">
            <span class="meta-badge">${d.alignment}</span>
            <span class="meta-badge">${d.elementalDomain}</span>
            <span class="meta-badge" style="color: var(--text-gold);">${d.clericDomains}</span>
          </div>

          <div class="tenets-box">
            <strong style="color: var(--text-gold);">Sacred Tenet & Dogma:</strong><br>
            "${d.tenets}"
          </div>

          <div style="font-size: 0.95rem; line-height: 1.5;">
            ${d.overview}
          </div>

          ${d.walkingManifestation ? `
            <div class="mortal-incarnation-box">
              <strong>Presence Among Mortals:</strong><br>
              ${d.walkingManifestation}
            </div>
          ` : ''}

          ${d.soleWorshipper ? `
            <div style="background: rgba(33, 150, 243, 0.12); border: 1px dashed #2196f3; border-radius: var(--radius-md); padding: 0.75rem 1rem; font-size: 0.9rem; color: #bbdefb;">
              <strong>Sole Mortal Worshipper:</strong><br>
              ${d.soleWorshipper}
            </div>
          ` : ''}

          <div style="font-size: 0.85rem; color: var(--text-muted);">
            <strong>5.5e Paladin / Cleric Oaths:</strong> ${d.recommendedOaths}
          </div>

          ${worldState.prefs.dmMode && d.dmSecrets ? `
            <div class="dm-secret-banner">
              <div class="banner-title">DM Divine Secrets & True Genesis</div>
              <div class="banner-text">${d.dmSecrets}</div>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  container.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      container.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentFilter = chip.getAttribute('data-filter');
      renderDeityCards(searchInput.value);
    });
  });

  searchInput.addEventListener('input', (e) => renderDeityCards(e.target.value));

  communeBtn.addEventListener('click', () => {
    const dId = altarSelect.value;
    const deity = pantheon.find(d => d.id === dId);
    if (!deity) return;

    blessingResult.style.display = 'block';
    blessingResult.innerHTML = `
      <div style="font-size: 1.15rem; font-weight: 700; color: var(--text-gold); margin-bottom: 0.35rem;">
        Communion with ${deity.name} (${deity.title})
      </div>
      <div style="margin-bottom: 0.5rem; color: var(--text-primary);">
        "${deity.blessingQuote || deity.tenets}"
      </div>
      <div style="padding: 0.6rem 0.85rem; background: rgba(212, 175, 55, 0.15); border-left: 3px solid var(--text-gold); border-radius: 4px; color: var(--text-highlight);">
        <strong>5.5e Inspired Boon:</strong> ${deity.inspiredBoon}
      </div>
    `;
  });

  renderDeityCards();
}
