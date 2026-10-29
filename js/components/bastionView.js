/**
 * 5.5e Bastion Command Deck & Turn Simulator
 */
import { worldState } from '../state/worldState.js';
import { soundEngine } from '../audio/soundEngine.js';

export function renderBastionView(container) {
  const { data, prefs } = worldState;

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h2>5.5e Bastion Deck & Stronghold Management</h2>
        <div class="view-tagline">Manage Player Facilities, Hirelings, Order Points, and Execute Bastion Turns</div>
      </div>
    </div>

    <!-- Bastion Turn Simulator Panel -->
    <div class="bastion-turn-panel">
      <h3 style="font-size: 1.25rem; color: var(--text-gold); margin-bottom: 0.5rem;">
        Issue Bastion Turn Order
      </h3>
      <p style="font-size: 0.95rem; color: var(--text-secondary);">
        Select an active stronghold and issue a 5.5e Bastion Order to generate resources, recruit specialists, or construct magical upgrades.
      </p>

      <div style="display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap;">
        <select id="bastion-select" class="theme-select" style="font-size: 1rem; padding: 0.5rem 1rem;">
          ${data.bastions.map(b => `<option value="${b.id}">${b.name} (${b.owner})</option>`).join('')}
        </select>
      </div>

      <div class="order-selector-grid">
        <button class="order-btn" data-order="craft">
          <span class="order-title">Craft Order</span>
          <span class="order-desc">Forge magical munitions, weapons, or runic brews (+25 Order Pts)</span>
        </button>
        <button class="order-btn" data-order="harvest">
          <span class="order-title">Harvest Order</span>
          <span class="order-desc">Gather gold, timber, rare roots, or minerals (+Gold & +20 Pts)</span>
        </button>
        <button class="order-btn" data-order="recruit">
          <span class="order-title">Recruit Order</span>
          <span class="order-desc">Enlist sentinels & specialists (+1 Bastion Defense Rating)</span>
        </button>
        <button class="order-btn" data-order="trade">
          <span class="order-title">Trade Order</span>
          <span class="order-desc">Dispatch trade caravans to Crucible City (+300+ GP)</span>
        </button>
        <button class="order-btn" data-order="empower">
          <span class="order-title">Empower Order</span>
          <span class="order-desc">Primordial acoustic rites granting combat inspiration</span>
        </button>
      </div>

      <div id="turn-result-box" style="display: none;" class="bastion-turn-log">
        <!-- Turn output -->
      </div>
    </div>

    <!-- Bastions Grid -->
    <div class="cards-grid" id="bastions-cards-container">
      <!-- Injected dynamically -->
    </div>
  `;

  const cardsContainer = container.querySelector('#bastions-cards-container');
  const bastionSelect = container.querySelector('#bastion-select');
  const resultBox = container.querySelector('#turn-result-box');

  function renderBastionCards() {
    cardsContainer.innerHTML = data.bastions.map(b => `
      <div class="char-card" id="bastion-card-${b.id}">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <h3 style="font-size: 1.3rem;">${b.name}</h3>
            <div style="font-size: 0.85rem; color: var(--text-gold);">
              Lord / Overseer: <strong>${b.owner}</strong>
            </div>
          </div>
          <span class="meta-badge" style="font-weight: 700;">Level ${b.level}</span>
        </div>

        <div class="char-meta-row">
          <span class="meta-badge">${b.location}</span>
          <span class="meta-badge" style="color: var(--text-gold);">Order Pts: ${b.orderPoints}</span>
          <span class="meta-badge" style="color: #4caf50;">Defense Rating: ${b.defenseRating}</span>
        </div>

        <!-- Special Facilities -->
        <div>
          <div style="font-family: var(--font-sans); font-size: 0.75rem; font-weight: 700; color: var(--text-gold); margin-bottom: 0.35rem;">
            SPECIAL 5.5e FACILITIES
          </div>
          <ul class="abilities-list">
            ${b.specialFacilities.map(fac => `
              <li class="ability-item">
                <strong>${fac.name}</strong> <span style="font-size: 0.75rem; color: var(--text-gold);">[${fac.type}]</span>:
                <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 2px;">${fac.benefit}</div>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Hirelings -->
        <div>
          <div style="font-family: var(--font-sans); font-size: 0.75rem; font-weight: 700; color: var(--text-gold); margin-bottom: 0.35rem;">
            RETAINERS & HIRELINGS
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
            ${b.hirelings.map(h => `
              <span class="meta-badge" title="Loyalty: ${h.loyalty}%">
                ${h.name} (${h.role})
              </span>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  // Order click handlers
  container.querySelectorAll('.order-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const bId = bastionSelect.value;
      const order = btn.getAttribute('data-order');
      const res = worldState.executeBastionTurn(bId, order);
      soundEngine.playDiceRoll(res && res.randomEvent && res.randomEvent.title.includes('Blessing'));

      if (res) {
        resultBox.style.display = 'block';
        resultBox.innerHTML = `
          <div style="font-weight: 700; color: var(--text-gold); font-size: 1.05rem; margin-bottom: 0.3rem;">
            Bastion Turn Completed: ${res.bastionName} [${res.order.toUpperCase()} ORDER]
          </div>
          <div style="margin-bottom: 0.35rem;">${res.description}</div>
          <div style="color: #4caf50;"><strong>Reward:</strong> +${res.orderPointsEarned} Order Points ${res.goldEarned > 0 ? `| +${res.goldEarned} GP` : ''}</div>
          <div style="color: var(--text-highlight); font-style: italic;">${res.specialBonus}</div>
          ${res.randomEvent ? `
            <div style="margin-top: 0.5rem; padding: 0.5rem; background: rgba(212, 175, 55, 0.15); border-left: 3px solid var(--text-gold); border-radius: 4px;">
              <strong>${res.randomEvent.title}</strong>: ${res.randomEvent.desc}
            </div>
          ` : ''}
        `;
        renderBastionCards();
      }
    });
  });

  renderBastionCards();
}
