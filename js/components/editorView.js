/**
 * World Lore Customizer, JSON Hub & Handout Exporter
 */
import { worldState } from '../state/worldState.js';

export function renderEditorView(container) {
  const { data } = worldState;

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h2>World Lore Editor & JSON Hub</h2>
        <div class="view-tagline">Import your Google Docs lore, customize characters & regions, or export clean JSON backups</div>
      </div>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <button class="btn btn-primary" id="download-json-btn">Export Campaign JSON</button>
        <label class="btn" style="cursor: pointer;">
          Load JSON File
          <input type="file" id="upload-json-file" accept=".json" style="display: none;">
        </label>
        <button class="btn" id="generate-handout-btn">Generate Player Handout</button>
        <button class="btn btn-danger" id="reset-world-btn">Reset to Default</button>
      </div>
    </div>

    <!-- Live JSON Editor Area -->
    <div class="bastion-turn-panel">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
        <h3 style="font-size: 1.2rem; color: var(--text-gold);">
          Raw Campaign Data JSON
        </h3>
        <button class="btn btn-sm btn-primary" id="save-json-editor-btn">Save & Apply Changes</button>
      </div>
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">
        You can directly edit character bios, region descriptions, and 5.5e stat blocks here. Click "Save & Apply Changes" to update the dashboard.
      </p>
      <textarea id="raw-json-textarea" class="editor-textarea" style="font-family: var(--font-mono); font-size: 0.85rem; min-height: 420px;"></textarea>
    </div>

    <!-- Modal for Printable Player Handout -->
    <div class="modal-overlay" id="handout-modal">
      <div class="modal-card" style="max-width: 900px;">
        <div class="modal-header">
          <h3>Player Campaign Lore Handout (Spoiler-Free)</h3>
          <button class="close-btn" id="close-handout-modal">&times;</button>
        </div>
        <div class="modal-body">
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
            Copy this formatted markdown text to share with your players or paste into your campaign wiki.
          </p>
          <textarea id="handout-markdown-area" class="editor-textarea" style="font-family: var(--font-mono); font-size: 0.9rem; min-height: 380px;" readonly></textarea>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" id="copy-handout-btn">Copy to Clipboard</button>
          <button class="btn" id="done-handout-btn">Done</button>
        </div>
      </div>
    </div>
  `;

  const textarea = container.querySelector('#raw-json-textarea');
  const saveBtn = container.querySelector('#save-json-editor-btn');
  const downloadBtn = container.querySelector('#download-json-btn');
  const uploadInput = container.querySelector('#upload-json-file');
  const resetBtn = container.querySelector('#reset-world-btn');
  const handoutBtn = container.querySelector('#generate-handout-btn');
  const handoutModal = container.querySelector('#handout-modal');
  const handoutArea = container.querySelector('#handout-markdown-area');
  const closeHandout = container.querySelector('#close-handout-modal');
  const doneHandout = container.querySelector('#done-handout-btn');
  const copyHandout = container.querySelector('#copy-handout-btn');

  // Populate editor
  textarea.value = JSON.stringify(data, null, 2);

  saveBtn.addEventListener('click', () => {
    const res = worldState.importWorldJson(textarea.value);
    if (res.success) {
      alert('World data updated successfully!');
    } else {
      alert('Error updating JSON: ' + res.error);
    }
  });

  // Download JSON
  downloadBtn.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bleeding_realms_campaign_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // Upload JSON
  uploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const res = worldState.importWorldJson(evt.target.result);
      if (res.success) {
        textarea.value = JSON.stringify(worldState.data, null, 2);
        alert('Campaign data successfully loaded from file!');
      } else {
        alert('Failed to load JSON file: ' + res.error);
      }
    };
    reader.readAsText(file);
  });

  // Reset
  resetBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all world data to default? Any unsaved edits will be lost.')) {
      worldState.resetToDefault();
      textarea.value = JSON.stringify(worldState.data, null, 2);
      alert('World data reset to defaults.');
    }
  });

  // Generate Player Handout Markdown
  handoutBtn.addEventListener('click', () => {
    let md = `# Welcome to ${data.metadata.worldName}\n`;
    md += `*${data.metadata.tagline}*\n\n`;
    md += `## Continental Overview\n${data.metadata.description}\n\n`;
    md += `**Current Era**: ${data.metadata.currentEra}\n\n---\n\n`;

    md += `## The Elemental Bleedlands & Geography\n\n`;
    data.regions.forEach(r => {
      md += `### ${r.name} (${r.domain})\n`;
      md += `- **Capital / Seat**: ${r.capital}\n`;
      md += `- **Ruler / Guardian**: ${r.ruler}\n`;
      md += `- **Climate**: ${r.climate}\n`;
      md += `- **Overview**: ${r.overview}\n\n`;
    });

    md += `\n---\n\n## Notable Champions & Figures of Legend\n\n`;
    data.characters.forEach(c => {
      md += `### ${c.name} - ${c.title}\n`;
      md += `*${c.quote}*\n\n`;
      md += `- **Species / Role**: ${c.species} (${c.classRole})\n`;
      md += `- **Elemental Affinity**: ${c.elementalAffinity}\n`;
      md += `- **Seat / Bastion**: ${c.bastion}\n`;
      md += `- **Lore**: ${c.bio}\n\n`;
    });

    handoutArea.value = md;
    handoutModal.classList.add('active');
  });

  closeHandout.addEventListener('click', () => handoutModal.classList.remove('active'));
  doneHandout.addEventListener('click', () => handoutModal.classList.remove('active'));
  copyHandout.addEventListener('click', () => {
    handoutArea.select();
    navigator.clipboard.writeText(handoutArea.value);
    alert('Handout markdown copied to clipboard!');
  });
}
