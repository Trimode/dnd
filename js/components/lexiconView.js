/**
 * Monastery of a Thousand Tongues Primordial Lexicon & Runes
 */
import { worldState } from '../state/worldState.js';
import { soundEngine } from '../audio/soundEngine.js';

export function renderLexiconView(container) {
  const { data } = worldState;

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h2>Monastery of a Thousand Tongues: Primordial Lexicon</h2>
        <div class="view-tagline">Acoustic Runes, Primordial Dialects (Ignan, Terran, Aquan, Auran), and Prophecies</div>
      </div>
    </div>

    <!-- Lexicon Translator Tool -->
    <div class="bastion-turn-panel">
      <h3 style="font-size: 1.2rem; color: var(--text-gold); margin-bottom: 0.5rem;">
        Primordial Resonance Translator
      </h3>
      <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 1rem;">
        Type an invocation or concept to generate phonetic Primordial incantations used by the monks of the Mist Spire.
      </p>
      
      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
        <input type="text" id="lexicon-input" placeholder="e.g., fire, stone, oath, shadow, storm, protect..." 
               class="editor-input" style="flex: 1; min-width: 260px;">
        <button class="btn btn-primary" id="translate-btn">Chant Invocation</button>
      </div>

      <div id="translation-output-box" style="display: none;" class="bastion-turn-log"></div>
    </div>

    <!-- Dialect Filter Tabs -->
    <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;" id="dialect-filter-group">
      <button class="filter-chip active" data-dialect="all">All Primordial Dialects</button>
      <button class="filter-chip" data-dialect="Ignan">Ignan (Fire)</button>
      <button class="filter-chip" data-dialect="Terran">Terran (Earth)</button>
      <button class="filter-chip" data-dialect="Aquan">Aquan (Water)</button>
      <button class="filter-chip" data-dialect="Auran">Auran (Air)</button>
      <button class="filter-chip" data-dialect="Confluence">Confluence</button>
      <button class="filter-chip" data-dialect="Ebonflame">Void-Ignan</button>
    </div>

    <!-- Lexicon Cards Grid -->
    <div class="lexicon-grid" id="lexicon-cards-container">
      <!-- Injected dynamically -->
    </div>
  `;

  const cardsContainer = container.querySelector('#lexicon-cards-container');
  const input = container.querySelector('#lexicon-input');
  const transBtn = container.querySelector('#translate-btn');
  const outputBox = container.querySelector('#translation-output-box');

  let activeDialect = 'all';

  function renderLexicon() {
    const filtered = data.primordialLexicon.filter(item => {
      if (activeDialect === 'all') return true;
      return item.dialect.includes(activeDialect);
    });

    cardsContainer.innerHTML = filtered.map(item => `
      <div class="rune-card">
        <div class="rune-glyph-large">${item.symbol}</div>
        <div class="rune-meaning">"${item.phrase}"</div>
        <div class="rune-phonetic">${item.pronunciation}</div>
        <div style="font-size: 0.95rem; color: var(--text-primary); margin: 0.5rem 0;">
          <strong>Meaning:</strong> ${item.meaning}
        </div>
        <div style="font-size: 0.85rem; color: var(--text-muted);">
          <strong>Usage:</strong> ${item.usage}
        </div>
        <div style="margin-top: 0.75rem;">
          <button class="btn btn-sm play-resonance-btn" data-dialect="${item.dialect}" style="font-size: 0.8rem; padding: 3px 8px;">
            Pronounce Resonance
          </button>
        </div>
      </div>
    `).join('');

    // Audio resonance trigger
    cardsContainer.querySelectorAll('.play-resonance-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const d = btn.getAttribute('data-dialect');
        if (d.includes('Ignan')) soundEngine.playAmbience('ambient-fire');
        else if (d.includes('Terran')) soundEngine.playAmbience('ambient-earth');
        else if (d.includes('Aquan')) soundEngine.playAmbience('ambient-frost');
        else if (d.includes('Auran')) soundEngine.playAmbience('ambient-monastery');
        else soundEngine.playDiceRoll(true);
      });
    });
  }

  // Filter clicks
  container.querySelectorAll('#dialect-filter-group .filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      container.querySelectorAll('#dialect-filter-group .filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeDialect = chip.getAttribute('data-dialect');
      renderLexicon();
    });
  });

  // Translation generator
  function performTranslation() {
    const query = input.value.trim().toLowerCase();
    if (!query) return;

    soundEngine.playAmbience('ambient-monastery');
    outputBox.style.display = 'block';

    const words = query.split(/\s+/);
    const primordialSyllables = ['Khel', 'Vorash', 'Zul', 'Nath', 'Shae', 'Umbra', 'Durn', 'Zephyr', 'Rizar', 'Aethel', 'Ignis', 'Tor'];
    
    const translatedPhrase = words.map(() => primordialSyllables[Math.floor(Math.random() * primordialSyllables.length)]).join(' ');
    const phonetic = translatedPhrase.split(' ').map(w => w.toUpperCase() + '-ah').join(' ');

    outputBox.innerHTML = `
      <div style="font-family: var(--font-heading); font-size: 1.1rem; color: var(--text-gold);">
        Monastery Glyph Synthesis: "${query}"
      </div>
      <div style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin: 0.35rem 0;">
        "${translatedPhrase} Kar-Nox"
      </div>
      <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-gold);">
        Pronunciation: [ ${phonetic} KAR-noks ]
      </div>
      <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.35rem;">
        Resonates with: <strong>Planar Sound Harmonic of the Bleedlands</strong>
      </div>
    `;
  }

  transBtn.addEventListener('click', performTranslation);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') performTranslation();
  });

  renderLexicon();
}
