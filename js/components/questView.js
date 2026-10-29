/**
 * Notice Board & Rumor Mill Component
 */
import { worldState } from '../state/worldState.js';

export function renderQuestView(container) {
  const { data, prefs } = worldState;

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h2>Notice Board, Tavern Rumors & Mysteries</h2>
        <div class="view-tagline">Bounties, Whispers from the Slagfields, and Ancient Prophecies</div>
      </div>
      <div>
        <button class="btn btn-primary" id="add-rumor-btn">Post New Rumor</button>
      </div>
    </div>

    <div class="cards-grid" id="quests-cards-container" style="padding-top: 1rem;">
      <!-- Populated dynamically -->
    </div>

    <!-- Modal for new rumor -->
    <div class="modal-overlay" id="rumor-modal">
      <div class="modal-card">
        <div class="modal-header">
          <h3>Post a Notice or Tavern Rumor</h3>
          <button class="close-btn" id="close-rumor-modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="editor-form-group">
            <label class="editor-label">Rumor / Notice Title</label>
            <input type="text" id="new-rumor-title" class="editor-input" placeholder="e.g. Mystery in the Mist Spires">
          </div>
          <div class="editor-form-group">
            <label class="editor-label">Tavern / Origin Source</label>
            <input type="text" id="new-rumor-source" class="editor-input" placeholder="e.g. Kegnir Mountain Taproom">
          </div>
          <div class="editor-form-group">
            <label class="editor-label">Rumor Text (What Players Hear)</label>
            <textarea id="new-rumor-text" class="editor-textarea" placeholder="Describe the rumor or bounty..."></textarea>
          </div>
          <div class="editor-form-group">
            <label class="editor-label">Veracity / Authenticity</label>
            <select id="new-rumor-veracity" class="theme-select">
              <option value="True">True</option>
              <option value="Half-Truth">Half-Truth</option>
              <option value="Blatant Lie">Blatant Lie</option>
            </select>
          </div>
          <div class="editor-form-group">
            <label class="editor-label">DM Secret Behind the Rumor</label>
            <input type="text" id="new-rumor-dm" class="editor-input" placeholder="What is actually happening backstage...">
          </div>
          <div class="editor-form-group">
            <label class="editor-label">Offered Reward</label>
            <input type="text" id="new-rumor-reward" class="editor-input" placeholder="e.g. 500 GP + Runic Charm">
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn" id="cancel-rumor-btn">Cancel</button>
          <button class="btn btn-primary" id="save-rumor-btn">Pin Notice</button>
        </div>
      </div>
    </div>
  `;

  const cardsContainer = container.querySelector('#quests-cards-container');
  const modal = container.querySelector('#rumor-modal');
  const addBtn = container.querySelector('#add-rumor-btn');
  const closeBtn = container.querySelector('#close-rumor-modal');
  const cancelBtn = container.querySelector('#cancel-rumor-btn');
  const saveBtn = container.querySelector('#save-rumor-btn');

  function renderCards() {
    cardsContainer.innerHTML = data.rumors.map(r => `
      <div class="quest-card" id="quest-${r.id}">
        <div class="pin-icon">•</div>
        <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #8d6e63; font-family: var(--font-sans);">
          <span>From: ${r.source}</span>
          <span style="font-weight: 700; color: ${r.status === 'Completed' ? '#2e7d32' : '#d84315'};">[${r.status || 'Available'}]</span>
        </div>

        <h3>${r.title}</h3>
        <p class="quest-rumor-text">"${r.rumorText}"</p>

        <div class="quest-reward">Reward: ${r.reward}</div>

        <div style="margin-top: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
          <button class="btn btn-sm toggle-quest-status-btn" data-id="${r.id}" style="font-size: 0.75rem; padding: 2px 8px; background: #efebe9; color: #3e2723; border: 1px solid #bcaaa4;">
            ${r.status === 'Completed' ? 'Reopen' : 'Mark Complete'}
          </button>
          ${worldState.prefs.dmMode ? `
            <span style="font-family: var(--font-sans); font-size: 0.75rem; font-weight: bold; color: ${r.veracity === 'True' ? '#2e7d32' : r.veracity === 'Half-Truth' ? '#f57f17' : '#c62828'};">
              [DM: ${r.veracity}]
            </span>
          ` : ''}
        </div>

        ${worldState.prefs.dmMode && r.dmHook ? `
          <div class="dm-secret-banner" style="margin-top: 0.75rem; background: rgba(198, 40, 40, 0.1); border-color: #ef9a9a;">
            <div class="banner-title" style="color: #c62828;">DM True Hook</div>
            <div class="banner-text" style="color: #4e342e; font-size: 0.85rem;">${r.dmHook}</div>
          </div>
        ` : ''}
      </div>
    `).join('');

    cardsContainer.querySelectorAll('.toggle-quest-status-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const q = data.rumors.find(item => item.id === id);
        if (q) {
          const newStatus = q.status === 'Completed' ? 'Available' : 'Completed';
          worldState.updateQuestStatus(id, newStatus);
          renderCards();
        }
      });
    });
  }

  addBtn.addEventListener('click', () => modal.classList.add('active'));
  closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  cancelBtn.addEventListener('click', () => modal.classList.remove('active'));

  saveBtn.addEventListener('click', () => {
    const title = container.querySelector('#new-rumor-title').value.trim();
    const source = container.querySelector('#new-rumor-source').value.trim();
    const text = container.querySelector('#new-rumor-text').value.trim();
    const veracity = container.querySelector('#new-rumor-veracity').value;
    const dm = container.querySelector('#new-rumor-dm').value.trim();
    const reward = container.querySelector('#new-rumor-reward').value.trim();

    if (!title || !text) {
      alert('Please fill out at least the title and rumor text.');
      return;
    }

    data.rumors.unshift({
      id: 'rumor-' + Date.now(),
      title,
      source: source || 'Local Tavern',
      rumorText: text,
      veracity,
      dmHook: dm || 'No extra confidential notes.',
      reward: reward || 'Standard Bounty',
      status: 'Available'
    });

    worldState.saveData();
    modal.classList.remove('active');
    renderCards();
  });

  renderCards();
}
