/**
 * 5.5e Weapon Masteries & Elemental Infusions Matrix
 */
import { worldState } from '../state/worldState.js';

export function renderMasteryView(container) {
  const { data } = worldState;

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h2>5.5e Weapon Masteries & Elemental Infusions</h2>
        <div class="view-tagline">Master Rules, Bleedland Forge Enhancements, and Custom Weapon Crafting</div>
      </div>
    </div>

    <!-- Interactive Weapon Infusion Forge -->
    <div class="bastion-turn-panel">
      <h3 style="font-size: 1.25rem; color: var(--text-gold); margin-bottom: 0.5rem;">
        4N-V1L & Garrick's Elemental Forge: Custom Weapon Generator
      </h3>
      <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 1rem;">
        Select a weapon base, apply a 2024 D&D 5.5e mastery property, and infuse it with a bleeding elemental domain.
      </p>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: flex-end;">
        <div>
          <label class="editor-label">Base Weapon</label>
          <select id="forge-weapon-select" class="theme-select" style="padding: 0.5rem 0.85rem;">
            <option value="Greatsword">Greatsword (2d6 Slashing)</option>
            <option value="Warhammer">Warhammer (1d8/1d10 Bludgeoning)</option>
            <option value="Halberd">Halberd (1d10 Reach)</option>
            <option value="Longbow">Longbow (1d8 Piercing)</option>
            <option value="Scimitar">Scimitar (1d6 Slashing, Light)</option>
            <option value="Maul">Maul (2d6 Heavy)</option>
            <option value="Quarterstaff">Quarterstaff (1d6/1d8 Versatile)</option>
          </select>
        </div>

        <div>
          <label class="editor-label">5.5e Mastery</label>
          <select id="forge-mastery-select" class="theme-select" style="padding: 0.5rem 0.85rem;">
            ${data.weaponMasteries.map(m => `<option value="${m.name}">${m.name} (${m.category})</option>`).join('')}
          </select>
        </div>

        <div>
          <label class="editor-label">Elemental Bleed Infusion</label>
          <select id="forge-element-select" class="theme-select" style="padding: 0.5rem 0.85rem;">
            <option value="Slagfield Magma">Slagfield Magma (4N-V1L Craft)</option>
            <option value="Glacial Rime">Glacial Rime (Kirrag's Frost-Breaker)</option>
            <option value="Kegnir Runic Steel">Kegnir Runic Steel (Garrick's Hearth)</option>
            <option value="Ebonflame Void">Ebonflame Void (Carrus Nether-Pyre)</option>
            <option value="Foregrove Ironwood">Foregrove Ironwood (Jensen's Sylvan)</option>
            <option value="Mist-Spire Acoustic">Mist-Spire Acoustic (Thousand Tongues)</option>
          </select>
        </div>

        <button class="btn btn-primary" id="forge-craft-btn">Forge Elemental Weapon</button>
      </div>

      <div id="forged-weapon-card" style="display: none; margin-top: 1.25rem;" class="char-card">
        <!-- Result card -->
      </div>
    </div>

    <!-- Masteries Grid -->
    <div class="cards-grid" id="masteries-cards-container">
      ${data.weaponMasteries.map(m => `
        <div class="mastery-card">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3 style="font-size: 1.25rem; color: var(--text-gold);">${m.name}</h3>
            <span class="mastery-badge">${m.category}</span>
          </div>

          <p style="font-size: 0.95rem; line-height: 1.5;">${m.effect}</p>

          <div class="elemental-synergy-box">
            <strong style="color: var(--text-gold);">Bleedland Synergy:</strong><br>
            ${m.elementalSynergy}
          </div>

          <div style="font-size: 0.85rem; color: var(--text-muted);">
            <strong>Signature Practitioners:</strong> ${m.signatureUsers.join(', ')}
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // Custom Forge logic
  const craftBtn = container.querySelector('#forge-craft-btn');
  const wSelect = container.querySelector('#forge-weapon-select');
  const mSelect = container.querySelector('#forge-mastery-select');
  const eSelect = container.querySelector('#forge-element-select');
  const resultCard = container.querySelector('#forged-weapon-card');

  craftBtn.addEventListener('click', () => {
    const w = wSelect.value;
    const m = mSelect.value;
    const e = eSelect.value;

    resultCard.style.display = 'block';
    resultCard.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <h3 style="font-size: 1.3rem; color: var(--text-gold);">${e} ${w} of the Bleedlands</h3>
          <div style="font-size: 0.85rem; color: var(--text-muted);">Masterwork 5.5e Weapon Infusion</div>
        </div>
        <span class="meta-badge" style="background: rgba(212, 175, 55, 0.2); color: var(--text-gold);">Mastery: ${m}</span>
      </div>

      <div style="font-size: 0.95rem; margin: 0.5rem 0;">
        <strong>Weapon Property (5.5e):</strong> On attack hit, triggers <strong>${m}</strong> mastery mechanics seamlessly alongside standard damage.
      </div>

      <div class="elemental-synergy-box">
        <strong>Elemental Resonance Effect:</strong><br>
        Infused with ${e}. On a critical strike or mastery trigger, deals an additional 1d8 elemental damage and inflicts a secondary status effect (Ignited, Chilled, Rooted, or Sapped).
      </div>
    `;
  });
}
