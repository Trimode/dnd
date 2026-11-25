/**
 * Structured Inventory, Equipment, Auto-AC & Consumable Potions Manager (D&D 5.5e)
 * Persists directly to Supabase via worldState.data.partyCharacters[i].inventoryItems & currency.
 */
import { worldState } from '../state/worldState.js';
import { soundEngine } from '../audio/soundEngine.js';

export const INVENTORY_CATALOG = [
  // Weapons
  { name: 'Longsword', category: 'weapon', damage: '1d8', damageType: 'slashing', ability: 'str', mastery: 'Sap', weight: 3, notes: 'Versatile (1d10)' },
  { name: 'Greataxe', category: 'weapon', damage: '1d12', damageType: 'slashing', ability: 'str', mastery: 'Cleave', weight: 7, notes: 'Heavy, Two-Handed' },
  { name: 'Greatsword', category: 'weapon', damage: '2d6', damageType: 'slashing', ability: 'str', mastery: 'Graze', weight: 6, notes: 'Heavy, Two-Handed' },
  { name: 'Warhammer', category: 'weapon', damage: '1d8', damageType: 'bludgeoning', ability: 'str', mastery: 'Push', weight: 2, notes: 'Versatile (1d10)' },
  { name: 'Rapier', category: 'weapon', damage: '1d8', damageType: 'piercing', ability: 'dex', mastery: 'Vex', weight: 2, notes: 'Finesse' },
  { name: 'Longbow', category: 'weapon', damage: '1d8', damageType: 'piercing', ability: 'dex', mastery: 'Slow', weight: 2, notes: 'Range 150/600, Heavy' },
  { name: 'Dagger', category: 'weapon', damage: '1d4', damageType: 'piercing', ability: 'dex', mastery: 'Nick', weight: 1, notes: 'Finesse, Light, Thrown' },
  { name: 'Quarterstaff', category: 'weapon', damage: '1d6', damageType: 'bludgeoning', ability: 'str', mastery: 'Topple', weight: 4, notes: 'Versatile (1d8)' },
  // Armor
  { name: 'Leather Armor', category: 'armor', armorType: 'light', baseAc: 11, maxDex: 99, weight: 10, notes: 'Light Armor (11 + DEX)' },
  { name: 'Studded Leather', category: 'armor', armorType: 'light', baseAc: 12, maxDex: 99, weight: 13, notes: 'Light Armor (12 + DEX)' },
  { name: 'Chain Shirt', category: 'armor', armorType: 'medium', baseAc: 13, maxDex: 2, weight: 20, notes: 'Medium Armor (13 + DEX max 2)' },
  { name: 'Breastplate', category: 'armor', armorType: 'medium', baseAc: 14, maxDex: 2, weight: 20, notes: 'Medium Armor (14 + DEX max 2)' },
  { name: 'Half Plate', category: 'armor', armorType: 'medium', baseAc: 15, maxDex: 2, weight: 40, notes: 'Medium Armor (15 + DEX max 2, Stealth Disadv)' },
  { name: 'Chain Mail', category: 'armor', armorType: 'heavy', baseAc: 16, maxDex: 0, weight: 55, notes: 'Heavy Armor (AC 16, STR 13)' },
  { name: 'Splint Armor', category: 'armor', armorType: 'heavy', baseAc: 17, maxDex: 0, weight: 60, notes: 'Heavy Armor (AC 17, STR 15)' },
  { name: 'Plate Armor', category: 'armor', armorType: 'heavy', baseAc: 18, maxDex: 0, weight: 65, notes: 'Heavy Armor (AC 18, STR 15)' },
  // Shields
  { name: 'Shield', category: 'shield', acBonus: 2, weight: 6, notes: '+2 AC while equipped' },
  { name: 'Shield +1', category: 'shield', acBonus: 3, weight: 6, notes: 'Uncommon Magic Shield (+3 AC)' },
  // Magic Items / Wondrous
  { name: 'Cloak of Protection', category: 'magic', acBonus: 1, requiresAttunement: true, weight: 1, notes: '+1 AC & +1 all Saving Throws (Attunement)' },
  { name: 'Ring of Protection', category: 'magic', acBonus: 1, requiresAttunement: true, weight: 0, notes: '+1 AC & +1 all Saving Throws (Attunement)' },
  { name: 'Bag of Holding', category: 'magic', acBonus: 0, requiresAttunement: false, weight: 15, notes: 'Holds up to 500 lbs in extradimensional space' },
  // Potions & Consumables
  { name: 'Potion of Healing', category: 'potion', healDice: '2d4+2', quantity: 2, weight: 0.5, notes: 'Bonus Action: Regain 2d4+2 HP' },
  { name: 'Potion of Greater Healing', category: 'potion', healDice: '4d4+4', quantity: 1, weight: 0.5, notes: 'Bonus Action: Regain 4d4+4 HP' },
  { name: 'Potion of Superior Healing', category: 'potion', healDice: '8d4+8', quantity: 1, weight: 0.5, notes: 'Bonus Action: Regain 8d4+8 HP' }
];

export function calculateHeroAcFromEquipment(char) {
  const getMod = (v) => Math.floor(((parseInt(v, 10) || 10) - 10) / 2);
  const dexMod = getMod(char.stats?.dex);
  const conMod = getMod(char.stats?.con);
  const wisMod = getMod(char.stats?.wis);
  const items = Array.isArray(char.inventoryItems) ? char.inventoryItems : [];
  const equipped = items.filter(i => i.equipped);

  const armor = equipped.find(i => i.category === 'armor');
  const shield = equipped.find(i => i.category === 'shield');
  const magicBonus = equipped
    .filter(i => i.category === 'magic' && Number(i.acBonus) > 0)
    .reduce((sum, i) => sum + Number(i.acBonus), 0);

  let baseAc = 10 + dexMod;
  const clsLower = String(char.classRole || '').toLowerCase();

  if (armor) {
    const cap = armor.maxDex !== undefined ? Number(armor.maxDex) : 99;
    baseAc = (Number(armor.baseAc) || 11) + Math.min(dexMod, cap);
  } else if (clsLower.includes('barbarian')) {
    baseAc = 10 + dexMod + conMod;
  } else if (clsLower.includes('monk') && !shield) {
    baseAc = 10 + dexMod + wisMod;
  }

  const shieldBonus = shield ? (Number(shield.acBonus) || 2) : 0;
  return baseAc + shieldBonus + magicBonus;
}

export function renderInventoryManager(container, hero, onUpdated) {
  if (!container || !hero) return;
  const items = Array.isArray(hero.inventoryItems) ? hero.inventoryItems : [];
  const currency = hero.currency || { gp: 50, sp: 0, cp: 0 };
  const attunedCount = items.filter(i => i.equipped && i.requiresAttunement).length;
  const canEdit = worldState.canControlCharacter(hero.id);

  container.innerHTML = `
    <div style="margin-top: 1rem; background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0.85rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.65rem;">
        <div>
          <strong style="color: var(--text-gold); font-size: 0.9rem;">🎒 Equipment, Inventory &amp; Attunement</strong>
          <span style="font-size: 0.72rem; color: var(--text-muted); margin-left: 0.5rem;">Attuned: <strong>${attunedCount}/3</strong></span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.45rem; font-size: 0.78rem;">
          <span style="background: rgba(212,175,55,0.16); color: var(--text-gold); padding: 2px 7px; border-radius: 4px; border: 1px solid rgba(212,175,55,0.35);">
            <strong>${currency.gp || 0}</strong> GP
          </span>
          <span style="background: rgba(148,163,184,0.15); color: #cbd5e1; padding: 2px 6px; border-radius: 4px;">
            <strong>${currency.sp || 0}</strong> SP
          </span>
          <span style="background: rgba(180,83,9,0.2); color: #fdba74; padding: 2px 6px; border-radius: 4px;">
            <strong>${currency.cp || 0}</strong> CP
          </span>
          ${canEdit ? `
            <button type="button" class="btn-tiny inv-gold-adj" data-delta="10" title="Add 10 GP">+10g</button>
            <button type="button" class="btn-tiny inv-gold-adj" data-delta="-10" title="Spend 10 GP">-10g</button>
          ` : ''}
        </div>
      </div>

      ${items.length === 0 ? `
        <div style="font-size: 0.8rem; color: var(--text-muted); font-style: italic; padding: 0.5rem 0;">
          No structured gear yet. Add weapons, armor, shields, or potions from the 5.5e Armory below to auto-calculate AC and combat attacks.
        </div>
      ` : `
        <div style="display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 0.75rem;">
          ${items.map(item => `
            <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; background: var(--bg-card); border: 1px solid ${item.equipped ? 'rgba(212,175,55,0.55)' : 'var(--border-subtle)'}; border-radius: var(--radius-sm); padding: 0.4rem 0.6rem; font-size: 0.8rem;">
              <div style="min-width: 0;">
                <div style="display: flex; align-items: center; gap: 0.35rem; flex-wrap: wrap;">
                  <strong style="color: ${item.equipped ? 'var(--text-gold)' : 'var(--text-primary)'};">${item.name}</strong>
                  ${item.quantity && item.quantity > 1 ? `<span style="font-size:0.7rem; color:#94a3b8;">x${item.quantity}</span>` : ''}
                  ${item.equipped ? `<span style="font-size:0.65rem; background:rgba(76,175,80,0.2); color:#81c784; padding:1px 5px; border-radius:3px;">Equipped</span>` : ''}
                  ${item.damage ? `<span style="font-size:0.68rem; color:#fca5a5;">${item.damage} ${item.damageType || ''}</span>` : ''}
                  ${item.mastery ? `<span style="font-size:0.65rem; color:#fcd34d;">[${item.mastery}]</span>` : ''}
                  ${item.baseAc ? `<span style="font-size:0.68rem; color:#7dd3fc;">AC ${item.baseAc}${item.maxDex > 0 ? '+DEX' : ''}</span>` : ''}
                  ${item.acBonus ? `<span style="font-size:0.68rem; color:#7dd3fc;">+${item.acBonus} AC</span>` : ''}
                  ${item.healDice ? `<span style="font-size:0.68rem; color:#86efac;">Heals ${item.healDice}</span>` : ''}
                </div>
                ${item.notes ? `<div style="font-size: 0.7rem; color: var(--text-muted);">${item.notes}</div>` : ''}
              </div>
              ${canEdit ? `
                <div style="display: flex; gap: 0.25rem; flex-shrink: 0;">
                  ${item.category === 'potion' ? `
                    <button type="button" class="btn-tiny inv-drink-btn" data-id="${item.id}" style="background: rgba(34,197,94,0.2); color: #86efac; border-color: rgba(34,197,94,0.4);">🧪 Drink</button>
                  ` : `
                    <button type="button" class="btn-tiny inv-equip-btn" data-id="${item.id}">${item.equipped ? 'Unequip' : 'Equip'}</button>
                  `}
                  <button type="button" class="btn-tiny inv-remove-btn" data-id="${item.id}" style="color: #fca5a5;" title="Remove item">&times;</button>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      `}

      ${canEdit ? `
        <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; border-top: 1px solid var(--border-subtle); padding-top: 0.6rem;">
          <select id="inv-catalog-select" class="theme-select" style="flex: 1; min-width: 180px; font-size: 0.76rem; padding: 0.3rem 0.5rem;">
            <option value="">-- Quick-Add from 5.5e Armory --</option>
            ${INVENTORY_CATALOG.map((it, idx) => `<option value="${idx}">[${it.category.toUpperCase()}] ${it.name} — ${it.notes}</option>`).join('')}
          </select>
          <button type="button" class="btn btn-sm btn-primary" id="inv-add-catalog-btn" style="font-size: 0.75rem;">+ Add Gear</button>
        </div>
      ` : ''}
    </div>
  `;

  if (!canEdit) return;

  container.querySelectorAll('.inv-gold-adj').forEach(btn => {
    btn.addEventListener('click', () => {
      const delta = parseInt(btn.getAttribute('data-delta'), 10) || 0;
      worldState.updateCharacterCurrency(hero.id, { gp: delta });
      if (onUpdated) onUpdated();
    });
  });

  container.querySelector('#inv-add-catalog-btn')?.addEventListener('click', () => {
    const sel = container.querySelector('#inv-catalog-select');
    const idx = sel ? parseInt(sel.value, 10) : NaN;
    if (isNaN(idx) || !INVENTORY_CATALOG[idx]) return;
    worldState.addInventoryItem(hero.id, INVENTORY_CATALOG[idx]);
    if (onUpdated) onUpdated();
  });

  container.querySelectorAll('.inv-equip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      worldState.toggleEquipItem(hero.id, btn.getAttribute('data-id'));
      if (onUpdated) onUpdated();
    });
  });

  container.querySelectorAll('.inv-drink-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const res = worldState.consumeInventoryItem(hero.id, btn.getAttribute('data-id'));
      if (res && res.success) {
        try { soundEngine.playDiceRoll(true); } catch (_) {}
      }
      if (onUpdated) onUpdated();
    });
  });

  container.querySelectorAll('.inv-remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      worldState.removeInventoryItem(hero.id, btn.getAttribute('data-id'));
      if (onUpdated) onUpdated();
    });
  });
}
