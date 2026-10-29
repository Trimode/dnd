/**
 * Main Application Orchestrator
 */
import { worldState } from './state/worldState.js';
import { soundEngine } from './audio/soundEngine.js';
import { diceRoller } from './components/diceRoller.js';

import { renderMapView } from './components/mapView.js';
import { renderCharacterView } from './components/characterView.js';
import { renderFactionView } from './components/factionView.js';
import { renderBastionView } from './components/bastionView.js';
import { renderLexiconView } from './components/lexiconView.js';
import { renderMasteryView } from './components/masteryView.js';
import { renderTimelineView } from './components/timelineView.js';
import { renderQuestView } from './components/questView.js';
import { renderEditorView } from './components/editorView.js';
import { renderCombatView } from './components/combatView.js';

class WorldDashboardApp {
  constructor() {
    this.viewContainers = {};
  }

  init() {
    this.cacheDom();
    this.bindEvents();
    this.initViews();
    diceRoller.init();

    // Apply saved preferences
    document.documentElement.className = worldState.prefs.theme || 'theme-obsidian';
    this.themeSelect.value = worldState.prefs.theme || 'theme-obsidian';
    this.updateDmModeUI(worldState.prefs.dmMode);

    // Render initial active tab
    this.switchTab(worldState.prefs.activeTab || 'map');

    // Subscribe to state updates
    worldState.subscribe(() => {
      this.refreshCurrentView();
    });
  }

  cacheDom() {
    this.navTabs = document.querySelectorAll('.nav-tab-btn');
    this.themeSelect = document.getElementById('theme-select');
    this.dmToggle = document.getElementById('dm-toggle-switch');
    this.audioToggle = document.getElementById('audio-toggle-btn');
    this.searchTrigger = document.getElementById('search-trigger-btn');
    this.searchModal = document.getElementById('search-modal');
    this.searchInput = document.getElementById('global-search-input');
    this.searchResults = document.getElementById('global-search-results');
    this.closeSearchBtn = document.getElementById('close-search-modal');

    // View containers
    this.viewContainers = {
      map: document.getElementById('view-map'),
      combat: document.getElementById('view-combat'),
      characters: document.getElementById('view-characters'),
      factions: document.getElementById('view-factions'),
      bastions: document.getElementById('view-bastions'),
      lexicon: document.getElementById('view-lexicon'),
      masteries: document.getElementById('view-masteries'),
      timeline: document.getElementById('view-timeline'),
      quests: document.getElementById('view-quests'),
      editor: document.getElementById('view-editor')
    };
  }

  bindEvents() {
    // Navigation Tabs
    this.navTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');
        this.switchTab(tabId);
      });
    });

    // Theme selector
    this.themeSelect.addEventListener('change', (e) => {
      worldState.setTheme(e.target.value);
    });

    // DM Mode toggle
    this.dmToggle.addEventListener('click', () => {
      const current = worldState.prefs.dmMode;
      worldState.setDmMode(!current);
      this.updateDmModeUI(!current);
    });

    // Audio toggle
    this.audioToggle.addEventListener('click', () => {
      const isMuted = !soundEngine.isMuted;
      soundEngine.setMuted(isMuted);
      this.audioToggle.classList.toggle('active', !isMuted);
      this.audioToggle.textContent = isMuted ? '🔇' : '🔊';
    });

    // Search Palette
    this.searchTrigger.addEventListener('click', () => this.openSearch());
    this.closeSearchBtn.addEventListener('click', () => this.closeSearch());
    this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));

    // Global keyboard shortcuts
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.openSearch();
      }
      if (e.key === 'Escape') {
        this.closeSearch();
        diceRoller.close();
      }
    });
  }

  switchTab(tabId) {
    worldState.setActiveTab(tabId);

    // Update tab buttons
    this.navTabs.forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-tab') === tabId);
    });

    // Toggle container visibility
    Object.keys(this.viewContainers).forEach(key => {
      const el = this.viewContainers[key];
      if (el) {
        el.classList.toggle('active', key === tabId);
      }
    });

    this.refreshView(tabId);
  }

  initViews() {
    // Pre-mount components
    renderMapView(this.viewContainers.map);
    if (this.viewContainers.combat) renderCombatView(this.viewContainers.combat);
    renderCharacterView(this.viewContainers.characters);
    renderFactionView(this.viewContainers.factions);
    renderBastionView(this.viewContainers.bastions);
    renderLexiconView(this.viewContainers.lexicon);
    renderMasteryView(this.viewContainers.masteries);
    renderTimelineView(this.viewContainers.timeline);
    renderQuestView(this.viewContainers.quests);
    renderEditorView(this.viewContainers.editor);
  }

  refreshCurrentView() {
    this.refreshView(worldState.prefs.activeTab);
  }

  refreshView(tabId) {
    const container = this.viewContainers[tabId];
    if (!container) return;

    switch (tabId) {
      case 'map':
        renderMapView(container);
        break;
      case 'combat':
        renderCombatView(container);
        break;
      case 'characters':
        renderCharacterView(container);
        break;
      case 'factions':
        renderFactionView(container);
        break;
      case 'bastions':
        renderBastionView(container);
        break;
      case 'lexicon':
        renderLexiconView(container);
        break;
      case 'masteries':
        renderMasteryView(container);
        break;
      case 'timeline':
        renderTimelineView(container);
        break;
      case 'quests':
        renderQuestView(container);
        break;
      case 'editor':
        renderEditorView(container);
        break;
    }
  }

  updateDmModeUI(isDm) {
    this.dmToggle.classList.toggle('active', isDm);
    this.dmToggle.querySelector('.dm-label').textContent = isDm ? 'DM Mode (Active)' : 'Player Mode';
  }

  // Global Search Modal
  openSearch() {
    this.searchModal.classList.add('active');
    this.searchInput.value = '';
    this.searchResults.innerHTML = '';
    setTimeout(() => this.searchInput.focus(), 100);
  }

  closeSearch() {
    this.searchModal.classList.remove('active');
  }

  handleSearch(query) {
    const term = query.trim().toLowerCase();
    if (!term) {
      this.searchResults.innerHTML = '';
      return;
    }

    const { data } = worldState;
    const matches = [];

    // Search Regions
    data.regions.forEach(r => {
      if (r.name.toLowerCase().includes(term) || r.domain.toLowerCase().includes(term) || r.overview.toLowerCase().includes(term)) {
        matches.push({ title: r.name, type: 'Region (' + r.domain + ')', tab: 'map', id: r.id });
      }
    });

    // Search Characters
    data.characters.forEach(c => {
      if (c.name.toLowerCase().includes(term) || c.title.toLowerCase().includes(term) || c.classRole.toLowerCase().includes(term)) {
        matches.push({ title: c.name, type: 'Champion (' + c.classRole + ')', tab: 'characters', id: c.id });
      }
    });

    // Search Factions
    data.factions.forEach(f => {
      if (f.name.toLowerCase().includes(term) || f.motto.toLowerCase().includes(term)) {
        matches.push({ title: f.name, type: 'Faction', tab: 'factions', id: f.id });
      }
    });

    // Search Bastions
    data.bastions.forEach(b => {
      if (b.name.toLowerCase().includes(term) || b.owner.toLowerCase().includes(term)) {
        matches.push({ title: b.name, type: 'Bastion', tab: 'bastions', id: b.id });
      }
    });

    // Search Lexicon
    data.primordialLexicon.forEach(l => {
      if (l.phrase.toLowerCase().includes(term) || l.meaning.toLowerCase().includes(term)) {
        matches.push({ title: l.phrase, type: 'Primordial Rune', tab: 'lexicon', id: l.phrase });
      }
    });

    if (matches.length === 0) {
      this.searchResults.innerHTML = `<li class="search-result-item" style="color: var(--text-muted);">No matching lore entries found for "${query}".</li>`;
      return;
    }

    this.searchResults.innerHTML = matches.slice(0, 10).map(m => `
      <li class="search-result-item" data-tab="${m.tab}" data-id="${m.id}">
        <span class="result-title">${m.title}</span>
        <span class="result-type">${m.type}</span>
      </li>
    `).join('');

    this.searchResults.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const tab = item.getAttribute('data-tab');
        this.closeSearch();
        this.switchTab(tab);
      });
    });
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  const app = new WorldDashboardApp();
  app.init();
});
