/**
 * Chronological World Timeline & Major Eras
 */
import { worldState } from '../state/worldState.js';

export function renderTimelineView(container) {
  const { data } = worldState;

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h2>⏳ Chronological History of the Bleeding Realms</h2>
        <div class="view-tagline">Eras of Creation, Calamities, Legendary Wars, and Present Day Conflicts</div>
      </div>
    </div>

    <div class="timeline-track">
      ${data.timeline.map((evt, idx) => `
        <div class="timeline-node">
          <div class="timeline-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
              <span class="timeline-era">${evt.era}</span>
              <span class="meta-badge" style="font-family: var(--font-mono);">${evt.year}</span>
            </div>
            <h3 style="font-size: 1.2rem; color: var(--text-gold); margin-bottom: 0.35rem;">${evt.title}</h3>
            <p style="font-size: 0.95rem; line-height: 1.5; color: var(--text-primary);">${evt.desc}</p>
            <div style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--text-muted);">
              <strong>Key Figures:</strong> ${evt.keyFigures.join(', ')}
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}
