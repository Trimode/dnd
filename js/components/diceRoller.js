/**
 * 5.5e Polyhedral Dice Roller Component with Sound Synthesis
 */
import { soundEngine } from '../audio/soundEngine.js';
import { worldState } from '../state/worldState.js';

class DiceRollerModal {
  constructor() {
    this.history = [];
    this.modal = null;
    this.advantageMode = 'normal'; // 'normal' | 'adv' | 'dis'
  }

  init() {
    this.modal = document.getElementById('dice-modal');
    if (!this.modal) return;

    this.bindEvents();
  }

  bindEvents() {
    const trigger = document.getElementById('dice-roller-trigger');
    const closeBtn = document.getElementById('close-dice-modal');
    const advBtns = this.modal.querySelectorAll('.adv-mode-btn');

    if (trigger) {
      trigger.addEventListener('click', () => this.open());
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    // Advantage toggles
    advBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        advBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.advantageMode = btn.getAttribute('data-adv');
      });
    });

    // Dice click buttons
    this.modal.querySelectorAll('.dice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sides = parseInt(btn.getAttribute('data-sides'), 10);
        this.roll(sides);
      });
    });

    // Custom expression input
    const customRollBtn = this.modal.querySelector('#custom-roll-btn');
    if (customRollBtn) {
      customRollBtn.addEventListener('click', () => {
        const count = parseInt(this.modal.querySelector('#dice-count-input').value, 10) || 1;
        const mod = parseInt(this.modal.querySelector('#dice-mod-input').value, 10) || 0;
        const sides = parseInt(this.modal.querySelector('#dice-sides-select').value, 10) || 20;
        this.rollMultiple(count, sides, mod);
      });
    }
  }

  open() {
    this.modal.classList.add('active');
  }

  close() {
    this.modal.classList.remove('active');
  }

  roll(sides) {
    const mod = parseInt(this.modal.querySelector('#dice-mod-input').value, 10) || 0;
    
    if (sides === 20 && this.advantageMode !== 'normal') {
      const r1 = Math.floor(Math.random() * 20) + 1;
      const r2 = Math.floor(Math.random() * 20) + 1;
      const chosen = this.advantageMode === 'adv' ? Math.max(r1, r2) : Math.min(r1, r2);
      const total = chosen + mod;
      const isCrit = chosen === 20;

      soundEngine.playDiceRoll(isCrit);

      this.displayResult({
        total,
        mainRoll: chosen,
        isCrit,
        isNat1: chosen === 1,
        formula: `1d20 (${this.advantageMode.toUpperCase()}: [${r1}, ${r2}] -> ${chosen}) ${mod !== 0 ? (mod > 0 ? '+' + mod : mod) : ''}`
      });
    } else {
      const r = Math.floor(Math.random() * sides) + 1;
      const total = r + mod;
      const isCrit = sides === 20 && r === 20;

      soundEngine.playDiceRoll(isCrit);

      this.displayResult({
        total,
        mainRoll: r,
        isCrit,
        isNat1: sides === 20 && r === 1,
        formula: `1d${sides} (${r}) ${mod !== 0 ? (mod > 0 ? '+' + mod : mod) : ''}`
      });
    }
  }

  rollMultiple(count, sides, mod) {
    let rolls = [];
    let sum = 0;
    for (let i = 0; i < count; i++) {
      const r = Math.floor(Math.random() * sides) + 1;
      rolls.push(r);
      sum += r;
    }
    const total = sum + mod;
    soundEngine.playDiceRoll(false);

    this.displayResult({
      total,
      mainRoll: sum,
      isCrit: false,
      isNat1: false,
      formula: `${count}d${sides} [${rolls.join(', ')}] ${mod !== 0 ? (mod > 0 ? '+' + mod : mod) : ''}`
    });
  }

  displayResult({ total, mainRoll, isCrit, isNat1, formula }) {
    const numDisplay = this.modal.querySelector('#roll-number-display');
    const breakdown = this.modal.querySelector('#roll-breakdown-display');
    const historyList = this.modal.querySelector('#roll-history-list');

    numDisplay.textContent = total;
    if (isCrit) {
      numDisplay.style.color = '#4caf50';
      breakdown.innerHTML = `<span style="color: #4caf50; font-weight: bold;">NATURAL 20! CRITICAL HIT!</span> • ${formula}`;
    } else if (isNat1) {
      numDisplay.style.color = '#f44336';
      breakdown.innerHTML = `<span style="color: #f44336; font-weight: bold;">NATURAL 1! CRITICAL MISS!</span> • ${formula}`;
    } else {
      numDisplay.style.color = 'var(--text-gold)';
      breakdown.textContent = formula;
    }

    // Add to history
    this.history.unshift({ total, formula, time: new Date().toLocaleTimeString() });
    if (this.history.length > 8) this.history.pop();

    historyList.innerHTML = this.history.map(h => `
      <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding: 2px 0;">
        <span>${h.formula}</span>
        <span style="font-weight: bold; color: var(--text-gold);">= ${h.total}</span>
      </div>
    `).join('');

    // Broadcast to shared worldState dice log
    if (typeof worldState !== 'undefined' && worldState.logDiceRoll) {
      let rollerName = 'Adventurer';
      let rollerAvatar = '🎲';
      if (worldState.prefs && worldState.prefs.dmMode) {
        rollerName = 'Dungeon Master (DM)';
        rollerAvatar = 'DM';
      } else {
        const user = typeof worldState.getActiveUser === 'function' ? worldState.getActiveUser() : null;
        const hero = typeof worldState.getActiveHero === 'function' ? worldState.getActiveHero() : null;
        if (user && hero) {
          rollerName = `${hero.name} (${user.displayName})`;
          rollerAvatar = hero.avatar || user.avatar || 'PC';
        } else if (user) {
          rollerName = user.displayName;
          rollerAvatar = user.avatar || 'PC';
        } else if (hero) {
          rollerName = hero.name;
          rollerAvatar = hero.avatar || 'PC';
        }
      }

      worldState.logDiceRoll({
        rollerName,
        rollerAvatar,
        rollType: 'dice_roller',
        label: `Polyhedral Roll (${formula})`,
        formula,
        d20Result: isCrit ? 20 : (isNat1 ? 1 : mainRoll),
        total,
        dc: null,
        success: null,
        advantageMode: this.advantageMode,
        note: ''
      });
    }
  }
}

export const diceRoller = new DiceRollerModal();
