/**
 * Magic Item Compendium & DM Award System (v2.1)
 * Players can browse, search & filter all 5.5e magic items;
 * DM can award any item directly to a Hero, drop to a Loot Chest, stock in the Active Vendor, or craft Homebrew items.
 */
import { worldState } from '../state/worldState.js';
import { soundEngine } from '../audio/soundEngine.js';

let compSearch = '';
let compRarity = 'all';
let compCategory = 'all';
let compAttunement = 'all';

const RARITY_STYLES = {
  Common: { bg: 'rgba(148,163,184,0.18)', border: '#94a3b8', color: '#cbd5e1' },
  Uncommon: { bg: 'rgba(34,197,94,0.18)', border: '#22c55e', color: '#86efac' },
  Rare: { bg: 'rgba(56,189,248,0.18)', border: '#38bdf8', color: '#7dd3fc' },
  'Very Rare': { bg: 'rgba(168,85,247,0.2)', border: '#a855f7', color: '#d8b4fe' },
  Legendary: { bg: 'rgba(245,158,11,0.22)', border: '#f59e0b', color: '#fde047' },
  Artifact: { bg: 'rgba(239,68,68,0.22)', border: '#ef4444', color: '#fca5a5' }
};

export function renderCompendiumView(container) {
  const isDm = Boolean(worldState.prefs?.dmMode);
  const heroes = worldState.data.partyCharacters || [];
  const items = typeof worldState.getMagicCompendium === 'function'
    ? worldState.getMagicCompendium({ search: compSearch, rarity: compRarity, category: compCategory, attunement: compAttunement })
    : [];

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h2>✨ Magic Item Compendium &amp; DM Vault</h2>
        <div class="view-tagline">Browse official D&amp;D 5.5e &amp; homebrew magic items${isDm ? ' — DM Award System &amp; Vendor Stocking Active (Supabase Synced)' : ' — Inspect rarities, attunement &amp; properties'}</div>
      </div>
      <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
        <span class="meta-badge" style="background: rgba(168,85,247,0.18); border-color: #a855f7; color: #d8b4fe;">${items.length} Magic Items</span>
        ${isDm ? `<button type="button" class="btn btn-primary btn-sm" id="comp-add-homebrew-btn">+ Craft Homebrew Magic Item</button>` : ''}
      </div>
    </div>

    <!-- Filter & Search Bar -->
    <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 0.6rem; margin-bottom: 1rem; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0.75rem;">
      <input type="text" id="comp-search-input" class="editor-input" value="${compSearch}" placeholder="Search magic items by name, effect, or trait...">
      <select id="comp-rarity-select" class="editor-input">
        ${['all', 'Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary', 'Artifact'].map(r => `<option value="${r}" ${compRarity === r ? 'selected' : ''}>${r === 'all' ? 'All Rarities' : r}</option>`).join('')}
      </select>
      <select id="comp-category-select" class="editor-input">
        ${['all', 'Weapon', 'Armor', 'Wondrous', 'Potion', 'Ring', 'Staff', 'Wand', 'Scroll'].map(c => `<option value="${c}" ${compCategory === c ? 'selected' : ''}>${c === 'all' ? 'All Categories' : c}</option>`).join('')}
      </select>
      <select id="comp-attune-select" class="editor-input">
        <option value="all" ${compAttunement === 'all' ? 'selected' : ''}>Attunement: Any</option>
        <option value="yes" ${compAttunement === 'yes' ? 'selected' : ''}>Requires Attunement</option>
        <option value="no" ${compAttunement === 'no' ? 'selected' : ''}>No Attunement</option>
      </select>
    </div>

    ${isDm ? `
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 1rem; padding: 0.65rem 0.9rem; background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.45); border-radius: var(--radius-md); font-size: 0.82rem;">
        <div><strong style="color: var(--text-gold);">🎁 DM Quick Award Target:</strong> Choose which hero receives awarded items below (synced to Supabase immediately).</div>
        <select id="comp-dm-award-hero-select" class="editor-input" style="width: auto; font-size: 0.8rem; padding: 3px 8px;">
          ${heroes.length ? heroes.map(h => `<option value="${h.id}">${h.name} (Lv ${h.level || 1} ${h.classRole || ''})</option>`).join('') : `<option value="">No Heroes in Party</option>`}
        </select>
      </div>
    ` : ''}

    <!-- Magic Item Cards Grid -->
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 0.85rem;">
      ${items.map(item => {
        const rs = RARITY_STYLES[item.rarity] || RARITY_STYLES.Common;
        return `
          <div style="background: var(--bg-card); border: 1px solid ${rs.border}55; border-radius: var(--radius-md); padding: 0.85rem; display: flex; flex-direction: column; justify-content: space-between; gap: 0.55rem;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.4rem;">
                <strong style="font-size: 0.98rem; color: var(--text-primary);">${item.name}${item.isHomebrew ? ' <span style="font-size:0.65rem;color:#f472b6;">[HOMEBREW]</span>' : ''}</strong>
                <span style="font-size: 0.68rem; font-weight: 700; padding: 2px 7px; border-radius: 10px; background: ${rs.bg}; border: 1px solid ${rs.border}; color: ${rs.color}; white-space: nowrap;">${item.rarity}</span>
              </div>
              <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 3px; display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <span>📦 ${item.category}</span>
                <span>💰 ~${(item.priceGp || 0).toLocaleString()} GP</span>
                ${item.attunement ? `<span style="color: #fbbf24;">✦ Requires Attunement</span>` : `<span>No Attunement</span>`}
              </div>
              <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.45; margin: 0.5rem 0 0;">${item.description}</p>
            </div>

            ${isDm ? `
              <div style="display: flex; gap: 0.35rem; flex-wrap: wrap; border-top: 1px dashed var(--border-subtle); padding-top: 0.55rem;">
                <button type="button" class="btn btn-sm btn-primary comp-award-hero-btn" data-id="${item.id}" style="font-size: 0.72rem; padding: 3px 8px; flex: 1;">🎁 Award to Hero</button>
                <button type="button" class="btn btn-sm comp-drop-chest-btn" data-id="${item.id}" style="font-size: 0.72rem; padding: 3px 8px; border-color: #eab308; color: #fde047;" title="Drop into Party Loot Chest">💰 Chest</button>
                <button type="button" class="btn btn-sm comp-stock-vendor-btn" data-id="${item.id}" style="font-size: 0.72rem; padding: 3px 8px; border-color: #10b981; color: #6ee7b7;" title="Stock in Active Vendor">🏪 Stock</button>
              </div>
            ` : ''}
          </div>
        `;
      }).join('') || `<div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-muted);">No magic items match your current filters.</div>`}
    </div>
  `;

  // Filter Events
  container.querySelector('#comp-search-input')?.addEventListener('input', (e) => {
    compSearch = e.target.value;
    renderCompendiumView(container);
    const inp = container.querySelector('#comp-search-input');
    if (inp) { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }
  });
  container.querySelector('#comp-rarity-select')?.addEventListener('change', (e) => {
    compRarity = e.target.value;
    renderCompendiumView(container);
  });
  container.querySelector('#comp-category-select')?.addEventListener('change', (e) => {
    compCategory = e.target.value;
    renderCompendiumView(container);
  });
  container.querySelector('#comp-attune-select')?.addEventListener('change', (e) => {
    compAttunement = e.target.value;
    renderCompendiumView(container);
  });

  // DM Award & Homebrew Events
  container.querySelector('#comp-add-homebrew-btn')?.addEventListener('click', async () => {
    const name = prompt('Homebrew Magic Item Name:', 'Frostbite Signet');
    if (!name) return;
    const rarity = prompt('Rarity (Common / Uncommon / Rare / Very Rare / Legendary / Artifact):', 'Rare') || 'Rare';
    const category = prompt('Category (Weapon / Armor / Wondrous / Potion / Ring / Staff / Wand / Scroll):', 'Ring') || 'Wondrous';
    const priceGp = parseInt(prompt('Suggested Value (GP):', '1800') || '1800', 10);
    const attunement = confirm('Does this item require Attunement?');
    const description = prompt('Item Effects & Lore:', 'Grants resistance to Cold damage and lets you cast Ray of Frost at will.') || '';
    await worldState.addCustomMagicItem({ name, rarity, category, priceGp, attunement, description });
    if (soundEngine.playSfx) soundEngine.playSfx('fanfare');
    renderCompendiumView(container);
  });

  container.querySelectorAll('.comp-award-hero-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const heroId = container.querySelector('#comp-dm-award-hero-select')?.value;
      if (!heroId) { alert('No hero selected to award!'); return; }
      const res = worldState.awardMagicItemToHero(btn.getAttribute('data-id'), heroId);
      if (res.success) {
        if (soundEngine.playSfx) soundEngine.playSfx('fanfare');
        alert(`🎁 Awarded "${res.item}" directly to ${res.hero}'s inventory (synced to Supabase)!`);
      } else {
        alert(res.error || 'Could not award item.');
      }
    });
  });

  container.querySelectorAll('.comp-drop-chest-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const res = await worldState.awardMagicItemToLootChest(btn.getAttribute('data-id'));
      if (res.success) {
        if (soundEngine.playSfx) soundEngine.playSfx('spell');
        alert(`💰 Dropped magic item into a new Party Loot Chest (Supabase)!`);
      }
    });
  });

  container.querySelectorAll('.comp-stock-vendor-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const item = worldState.getMagicCompendium().find(i => i.id === btn.getAttribute('data-id'));
      if (!item) return;
      const res = await worldState.addItemToActiveVendor(item);
      if (res.success) {
        alert(`🏪 Stocked "${item.name}" into ${res.vendor.shopName} (${res.vendor.merchantName})!`);
      }
    });
  });
}
