/**
 * Dynamic On-the-Fly Vendor & Merchant Tab (v2.1 — Supabase Synced)
 * DM can switch merchant archetype ("alignment") on the fly: Alchemist, Blacksmith, Tailor,
 * General Shopkeeper, Arcane Enchanter, Black Market Fence, or Traveling Relic Peddler.
 */
import { worldState } from '../state/worldState.js';
import { soundEngine } from '../audio/soundEngine.js';

let vendorFilterType = 'all'; // 'all' | 'magic' | 'mundane'

export function renderVendorView(container) {
  const isDm = Boolean(worldState.prefs?.dmMode);
  const archetypes = typeof worldState.getMerchantArchetypes === 'function' ? worldState.getMerchantArchetypes() : [];
  const vendor = typeof worldState.getActiveVendor === 'function' ? worldState.getActiveVendor() : { inventory: [] };
  const heroes = worldState.data.partyCharacters || [];
  const activeHero = (typeof worldState.getActiveHero === 'function' ? worldState.getActiveHero() : null) || heroes[0];
  const factionDiscount = typeof worldState.getMerchantDiscountPercent === 'function' ? worldState.getMerchantDiscountPercent() : 0;

  const filteredStock = (vendor.inventory || []).map((item, idx) => ({ item, idx })).filter(({ item }) => {
    if (vendorFilterType === 'magic') return Boolean(item.isMagic);
    if (vendorFilterType === 'mundane') return !item.isMagic;
    return true;
  });

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h2>${vendor.icon || '🏪'} ${vendor.shopName || 'Town Market'}</h2>
        <div class="view-tagline">
          Proprietor: <strong>${vendor.merchantName || 'Merchant'}</strong> • Specialty: <span style="color: var(--text-gold); font-weight: 700;">${vendor.archetypeName || 'Shopkeeper'}</span>
          ${factionDiscount > 0 ? ` • <span style="color: #6ee7b7; font-weight: 700;">Faction Standing Discount: −${factionDiscount}%</span>` : ''}
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
        <label for="vendor-buyer-select" style="font-size: 0.78rem; color: var(--text-muted);">Active Shopper:</label>
        <select id="vendor-buyer-select" class="editor-input" style="width: auto; font-size: 0.8rem; padding: 3px 8px;">
          ${heroes.length ? heroes.map(h => `<option value="${h.id}" ${activeHero && activeHero.id === h.id ? 'selected' : ''}>${h.name} (${h.currency?.gp ?? 50} GP)</option>`).join('') : `<option value="">No Hero</option>`}
        </select>
      </div>
    </div>

    <!-- Flavor Greeting Banner -->
    <div style="background: rgba(212,175,55,0.08); border-left: 3px solid var(--text-gold); border-radius: var(--radius-sm); padding: 0.65rem 1rem; margin-bottom: 1rem; font-style: italic; color: var(--text-secondary); font-size: 0.88rem;">
      ${vendor.greeting || '"Welcome, traveler! Browse my wares."'}
    </div>

    <!-- DM On-The-Fly Merchant Switcher Deck -->
    ${isDm ? `
      <div id="dm-vendor-control-deck" style="background: rgba(15, 23, 42, 0.82); border: 1px solid rgba(56,189,248,0.45); border-radius: var(--radius-md); padding: 0.85rem 1rem; margin-bottom: 1.15rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.65rem;">
          <strong style="color: #7dd3fc; font-size: 0.9rem;">🎭 DM Live Merchant Switcher (Updates All Players via Supabase)</strong>
          <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
            <button type="button" class="btn btn-sm" id="dm-vendor-restock-btn" style="border-color: #fde047; color: #fde047;">🎲 Restock Wares</button>
            <button type="button" class="btn btn-sm" id="dm-vendor-add-custom-btn" style="border-color: #10b981; color: #6ee7b7;">+ Stock Custom Item</button>
          </div>
        </div>

        <!-- Quick Archetype Alignment Pills -->
        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.7rem;">
          ${archetypes.map(a => `
            <button type="button" class="btn btn-sm dm-vendor-arch-btn ${vendor.archetypeId === a.id ? 'btn-primary' : ''}" data-arch="${a.id}" style="font-size: 0.75rem; padding: 4px 10px;">
              ${a.icon} ${a.name}
            </button>
          `).join('')}
        </div>

        <!-- Fine-Tune Rarity, Magic Toggle, Markup & Custom Name -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 0.5rem; font-size: 0.78rem;">
          <div>
            <label style="color: var(--text-muted); font-size: 0.7rem; display: block;">Shop Name</label>
            <input type="text" id="dm-vendor-shop-name" class="editor-input" value="${vendor.shopName || ''}" style="font-size: 0.78rem; padding: 3px 7px;">
          </div>
          <div>
            <label style="color: var(--text-muted); font-size: 0.7rem; display: block;">Merchant Name</label>
            <input type="text" id="dm-vendor-merch-name" class="editor-input" value="${vendor.merchantName || ''}" style="font-size: 0.78rem; padding: 3px 7px;">
          </div>
          <div>
            <label style="color: var(--text-muted); font-size: 0.7rem; display: block;">Max Magic Rarity</label>
            <select id="dm-vendor-max-rarity" class="editor-input" style="font-size: 0.78rem; padding: 3px 7px;">
              ${['Mundane', 'Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary', 'Artifact'].map(r => `<option value="${r}" ${vendor.maxRarity === r ? 'selected' : ''}>${r === 'Mundane' ? 'Mundane Only' : `Up to ${r}`}</option>`).join('')}
            </select>
          </div>
          <div>
            <label style="color: var(--text-muted); font-size: 0.7rem; display: block;">Price Markup / Discount (%)</label>
            <input type="number" id="dm-vendor-price-mod" class="editor-input" value="${vendor.priceModifierPct || 0}" min="-50" max="100" step="5" style="font-size: 0.78rem; padding: 3px 7px;">
          </div>
          <div style="display: flex; align-items: flex-end;">
            <button type="button" class="btn btn-sm btn-primary" id="dm-vendor-apply-btn" style="width: 100%; font-size: 0.78rem;">☁️ Apply &amp; Sync Shop</button>
          </div>
        </div>
      </div>
    ` : ''}

    <!-- Filter Chips: All / Magic / Non-Magic -->
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.85rem;">
      <div style="display: flex; gap: 0.4rem;">
        <button type="button" class="filter-chip vendor-filter-btn ${vendorFilterType === 'all' ? 'active' : ''}" data-filter="all">All Wares (${(vendor.inventory || []).length})</button>
        <button type="button" class="filter-chip vendor-filter-btn ${vendorFilterType === 'magic' ? 'active' : ''}" data-filter="magic">✨ Magic Items (${(vendor.inventory || []).filter(i => i.isMagic).length})</button>
        <button type="button" class="filter-chip vendor-filter-btn ${vendorFilterType === 'mundane' ? 'active' : ''}" data-filter="mundane">🎒 Non-Magic Gear (${(vendor.inventory || []).filter(i => !i.isMagic).length})</button>
      </div>
      <div style="font-size: 0.75rem; color: var(--text-muted);">
        ${vendor.priceModifierPct ? `Merchant Price Modifier: <strong>${vendor.priceModifierPct > 0 ? '+' : ''}${vendor.priceModifierPct}%</strong>` : 'Standard Merchant Pricing'}
      </div>
    </div>

    <!-- Vendor Stock Grid -->
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(265px, 1fr)); gap: 0.75rem; margin-bottom: 1.5rem;">
      ${filteredStock.map(({ item, idx }) => {
        const effPrice = worldState.getVendorEffectivePrice(item.priceGp);
        const outOfStock = (item.stock || 0) <= 0;
        return `
          <div style="background: var(--bg-card); border: 1px solid ${item.isMagic ? 'rgba(168,85,247,0.45)' : 'var(--border-subtle)'}; border-radius: var(--radius-md); padding: 0.75rem; display: flex; flex-direction: column; justify-content: space-between; gap: 0.45rem;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.35rem;">
                <strong style="color: ${item.isMagic ? '#e9d5ff' : 'var(--text-primary)'}; font-size: 0.92rem;">${item.isMagic ? '✨ ' : ''}${item.name}</strong>
                <span style="color: var(--text-gold); font-weight: 800; font-size: 0.85rem; white-space: nowrap;">${effPrice.toLocaleString()} GP</span>
              </div>
              <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 2px;">
                ${item.rarity || 'Mundane'} • ${item.category || 'gear'} • Stock: <strong>${item.stock ?? 0}</strong>${item.requiresAttunement ? ' • ✦ Attune' : ''}
              </div>
              ${item.notes ? `<div style="font-size: 0.76rem; color: var(--text-secondary); margin-top: 0.35rem; line-height: 1.4;">${item.notes}</div>` : ''}
            </div>
            <div style="display: flex; gap: 0.35rem; margin-top: 0.25rem;">
              <button type="button" class="btn btn-sm vendor-buy-btn" data-idx="${idx}" ${outOfStock ? 'disabled' : ''} style="flex: 1; font-size: 0.74rem; border-color: #10b981; color: #6ee7b7; ${outOfStock ? 'opacity: 0.45; cursor: not-allowed;' : ''}">
                ${outOfStock ? 'Sold Out' : `Buy (${effPrice.toLocaleString()} GP)`}
              </button>
              ${isDm ? `<button type="button" class="btn btn-sm vendor-remove-btn" data-idx="${idx}" title="DM: Remove item from shop" style="font-size: 0.72rem; border-color: #ef4444; color: #fca5a5;">✕</button>` : ''}
            </div>
          </div>
        `;
      }).join('') || `<div style="grid-column: 1 / -1; text-align: center; padding: 1.5rem; color: var(--text-muted);">No wares in this category.</div>`}
    </div>

    <!-- Quick Sell From Hero Pack Panel -->
    ${activeHero && Array.isArray(activeHero.inventoryItems) && activeHero.inventoryItems.length > 0 ? `
      <div style="background: var(--bg-card); border: 1px solid rgba(212,175,55,0.3); border-radius: var(--radius-md); padding: 0.85rem 1rem;">
        <strong style="color: var(--text-gold); font-size: 0.88rem;">💰 Sell Gear from ${activeHero.name}'s Pack (50% GP Credit)</strong>
        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.55rem;">
          ${activeHero.inventoryItems.map(inv => {
            const sellVal = Math.max(1, Math.floor((inv.priceGp || 20) / 2));
            return `<button type="button" class="btn btn-sm vendor-sell-btn" data-item-id="${inv.id}" style="font-size: 0.72rem; border-color: #f59e0b; color: #fde047;">Sell ${inv.name} (+${sellVal} GP)</button>`;
          }).join('')}
        </div>
      </div>
    ` : ''}
  `;

  // Buyer selector
  container.querySelector('#vendor-buyer-select')?.addEventListener('change', (e) => {
    worldState.setActiveHero(e.target.value);
    renderVendorView(container);
  });

  // Filter chips
  container.querySelectorAll('.vendor-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      vendorFilterType = btn.getAttribute('data-filter');
      renderVendorView(container);
    });
  });

  // DM Switch Archetype On-The-Fly
  container.querySelectorAll('.dm-vendor-arch-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const archId = btn.getAttribute('data-arch');
      await worldState.setVendorArchetype(archId);
      if (soundEngine.playSfx) soundEngine.playSfx('fanfare');
      renderVendorView(container);
    });
  });

  // DM Apply Fine-Tuned Settings
  container.querySelector('#dm-vendor-apply-btn')?.addEventListener('click', async () => {
    const shopName = container.querySelector('#dm-vendor-shop-name')?.value.trim();
    const merchantName = container.querySelector('#dm-vendor-merch-name')?.value.trim();
    const maxRarity = container.querySelector('#dm-vendor-max-rarity')?.value || 'Rare';
    const priceModifierPct = parseInt(container.querySelector('#dm-vendor-price-mod')?.value || '0', 10);
    await worldState.setVendorArchetype(vendor.archetypeId, {
      shopName,
      merchantName,
      maxRarity,
      includeMagic: maxRarity !== 'Mundane',
      priceModifierPct
    });
    renderVendorView(container);
  });

  // DM Restock
  container.querySelector('#dm-vendor-restock-btn')?.addEventListener('click', async () => {
    await worldState.restockActiveVendor();
    renderVendorView(container);
  });

  // DM Stock Custom Item
  container.querySelector('#dm-vendor-add-custom-btn')?.addEventListener('click', async () => {
    const name = prompt('Item Name to Stock:', 'Elixir of Dragon Breath');
    if (!name) return;
    const priceGp = parseInt(prompt('Base Price (GP):', '250') || '250', 10);
    const isMagic = confirm('Is this a Magic Item?');
    const rarity = isMagic ? (prompt('Rarity (Common / Uncommon / Rare / Very Rare / Legendary):', 'Uncommon') || 'Uncommon') : 'Mundane';
    const notes = prompt('Description / Effect:', 'Breathe a 15ft cone of fire (3d6) once within 1 hour.') || '';
    await worldState.addItemToActiveVendor({ name, priceGp, isMagic, rarity, notes, stock: 1 });
    renderVendorView(container);
  });

  // Buy from Active Vendor
  container.querySelectorAll('.vendor-buy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const buyerId = container.querySelector('#vendor-buyer-select')?.value;
      if (!buyerId) return;
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      const res = await worldState.buyFromActiveVendor(buyerId, idx);
      if (!res.success && res.error) alert(res.error);
      else if (soundEngine.playDiceRoll) soundEngine.playDiceRoll(true);
      renderVendorView(container);
    });
  });

  // DM Remove Item
  container.querySelectorAll('.vendor-remove-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      await worldState.removeItemFromActiveVendor(idx);
      renderVendorView(container);
    });
  });

  // Sell from Pack
  container.querySelectorAll('.vendor-sell-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!activeHero) return;
      const itemId = btn.getAttribute('data-item-id');
      worldState.sellInventoryItem(activeHero.id, itemId, 20);
      if (soundEngine.playDiceRoll) soundEngine.playDiceRoll(false);
      renderVendorView(container);
    });
  });
}
