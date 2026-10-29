/**
 * Detailed Fantasy World Map with Fluid Wheel Zoom & Drag Panning
 */
import { worldState } from '../state/worldState.js';

export function renderMapView(container) {
  const { data } = worldState;

  container.innerHTML = `
    <div class="map-module-wrapper">
      <div class="map-controls-bar">
        <div class="map-filters" id="map-filters-group">
          <button class="filter-chip active" data-filter="all">All Bleeding Realms</button>
          <button class="filter-chip" data-filter="Fire">Fire Domain</button>
          <button class="filter-chip" data-filter="Earth">Earth Domain</button>
          <button class="filter-chip" data-filter="Water">Water Domain</button>
          <button class="filter-chip" data-filter="Air">Air Domain</button>
          <button class="filter-chip" data-filter="Bleedland">Bleedlands (Transition Zones)</button>
          <button class="filter-chip" data-filter="Bastion">Strongholds & Bastions</button>
        </div>
        <div class="map-action-btns">
          <span style="font-family: var(--font-sans); font-size: 0.75rem; color: var(--text-muted); align-self: center; margin-right: 0.5rem;">
            Scroll wheel to zoom • Drag to pan
          </span>
          <button class="btn" id="map-center-btn">Center Map</button>
        </div>
      </div>

      <div class="map-canvas-container" id="map-container">
        <svg id="world-map-svg" class="interactive-map-svg" viewBox="0 0 1000 562" preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter id="pin-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.8"/>
            </filter>
          </defs>

          <!-- Master Hand-Drawn Fantasy Map Illustration Background -->
          <image href="assets/world_map.jpg" x="0" y="0" width="1000" height="562" preserveAspectRatio="xMidYMid slice" />

          <!-- Delicate Leyline Resonance Web (stroke-only, fill=none) -->
          <g stroke="#d4af37" stroke-width="1.5" stroke-dasharray="5,5" stroke-opacity="0.65" fill="none">
            <path d="M 160,290 Q 330,280 500,270 T 780,370" />
            <path d="M 670,170 Q 580,220 500,270 T 190,440" />
            <path d="M 190,440 Q 400,430 620,430 T 780,370" />
            <path d="M 260,155 Q 380,210 440,360 T 860,445" />
          </g>

          <!-- Interactive Pins Layer -->
          <g id="map-pins-layer"></g>
        </svg>

        <!-- Location Inspector Flyout Panel -->
        <div class="map-flyout-panel" id="map-flyout">
          <div class="flyout-header">
            <div>
              <h3 id="flyout-title">Region Name</h3>
              <span id="flyout-domain" class="flyout-meta-badge">Domain</span>
            </div>
            <button class="close-btn" id="flyout-close-btn">&times;</button>
          </div>
          <div class="flyout-body" id="flyout-body"></div>
        </div>

        <div class="map-zoom-controls">
          <button class="zoom-btn" id="zoom-in-btn" title="Zoom In">+</button>
          <button class="zoom-btn" id="zoom-out-btn" title="Zoom Out">−</button>
          <button class="zoom-btn" id="zoom-reset-btn" title="Reset Zoom">↺</button>
        </div>
      </div>
    </div>
  `;

  initMapInteractivity(container);
}

function initMapInteractivity(container) {
  const { data } = worldState;
  const mapContainer = container.querySelector('#map-container');
  const svg = container.querySelector('#world-map-svg');
  const pinsLayer = container.querySelector('#map-pins-layer');
  const flyout = container.querySelector('#map-flyout');
  const flyoutBody = container.querySelector('#flyout-body');
  const flyoutTitle = container.querySelector('#flyout-title');
  const flyoutDomain = container.querySelector('#flyout-domain');
  const flyoutClose = container.querySelector('#flyout-close-btn');

  let currentFilter = 'all';

  // Base map dimensions
  const BASE_W = 1000;
  const BASE_H = 562;

  // ViewBox State
  let curX = 0;
  let curY = 0;
  let curW = BASE_W;
  let curH = BASE_H;
  let zoomLevel = 1.0;

  // Dragging state
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let startViewX = 0;
  let startViewY = 0;

  const regionCoords = {
    'region-glacial-crags': { x: 260, y: 155 },
    'region-aquas': { x: 160, y: 290 },
    'region-terran': { x: 190, y: 440 },
    'region-foregrove': { x: 440, y: 360 },
    'region-crucible': { x: 500, y: 270 },
    'region-mist-spires': { x: 670, y: 170 },
    'region-zephyr': { x: 770, y: 200 },
    'region-cinder-steppes': { x: 710, y: 295 },
    'region-slagfields': { x: 620, y: 430 },
    'region-pyros': { x: 780, y: 370 },
    'region-ebonflame': { x: 860, y: 445 }
  };

  function updateViewBox(smooth = false) {
    // Clamp dimensions
    zoomLevel = Math.max(0.75, Math.min(zoomLevel, 4.0));
    curW = BASE_W / zoomLevel;
    curH = BASE_H / zoomLevel;

    // Clamp coordinates to keep map in view
    const minX = -BASE_W * 0.2;
    const maxX = BASE_W * 1.2 - curW;
    const minY = -BASE_H * 0.2;
    const maxY = BASE_H * 1.2 - curH;

    curX = Math.max(minX, Math.min(curX, maxX));
    curY = Math.max(minY, Math.min(curY, maxY));

    svg.setAttribute('viewBox', `${curX} ${curY} ${curW} ${curH}`);
  }

  function renderPins() {
    pinsLayer.innerHTML = '';

    data.regions.forEach(region => {
      if (currentFilter !== 'all') {
        if (currentFilter === 'Bleedland' && region.type !== 'Bleedland') return;
        if (currentFilter === 'Bastion' && !region.pointsOfInterest.some(p => p.type.includes('Bastion'))) return;
        if (['Fire', 'Earth', 'Water', 'Air'].includes(currentFilter) && !region.domain.includes(currentFilter)) return;
      }

      const coords = regionCoords[region.id] || { x: region.coordinates.x * 10, y: region.coordinates.y * 5.6 };
      const posX = coords.x;
      const posY = coords.y;

      const pinG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      pinG.setAttribute('class', 'map-pin');
      pinG.setAttribute('transform', `translate(${posX}, ${posY})`);
      pinG.setAttribute('data-region-id', region.id);

      const isBastion = region.pointsOfInterest.some(p => p.type.includes('Bastion'));
      const emblemSymbol = isBastion ? 'B' : region.type === 'Bleedland' ? '*' : 'R';

      pinG.innerHTML = `
        <circle cx="0" cy="0" r="18" fill="${region.color}" fill-opacity="0.3" class="map-pin-pulse" />
        
        <g class="pin-core" filter="url(#pin-glow)">
          <circle cx="0" cy="0" r="12" fill="#2b1f14" stroke="#d4af37" stroke-width="2" />
          <circle cx="0" cy="0" r="9" fill="${region.color}" fill-opacity="0.9"/>
          <text x="0" y="3.5" font-family="sans-serif" font-size="9" fill="#ffffff" text-anchor="middle" font-weight="bold">${emblemSymbol}</text>
        </g>

        <g transform="translate(0, 22)" class="pin-label-group" filter="url(#pin-glow)">
          <rect x="-60" y="-9" width="120" height="18" rx="4" fill="#1e140c" fill-opacity="0.92" stroke="#d4af37" stroke-width="1" />
          <text x="0" y="3" font-family="Cinzel, serif" font-size="9.5" font-weight="700" 
                fill="#f5eedb" text-anchor="middle" class="pin-label">${region.name}</text>
        </g>
      `;

      pinG.addEventListener('click', (e) => {
        e.stopPropagation();
        openFlyout(region);
      });

      pinsLayer.appendChild(pinG);
    });
  }

  function openFlyout(region) {
    flyoutTitle.textContent = region.name;
    flyoutDomain.textContent = `${region.domain} • ${region.type}`;

    let html = `
      <p><strong>Capital / Seat:</strong> ${region.capital}</p>
      <p><strong>Ruler / Vanguard:</strong> ${region.ruler}</p>
      <p><strong>Climate & Atmosphere:</strong> ${region.climate}</p>
      <p><strong>Danger Rating:</strong> <span style="color: #bf360c; font-weight: bold;">${region.dangerLevel}</span></p>
      
      <div style="margin-top: 0.5rem;">
        <h4>Cartographic Lore</h4>
        <p>${region.overview}</p>
      </div>

      <div style="margin-top: 0.5rem;">
        <h4>Strongholds & Points of Interest</h4>
        <ul class="poi-list">
          ${region.pointsOfInterest.map(poi => `
            <li class="poi-item">
              <div class="poi-name">${poi.name} <span style="font-size: 0.75rem; color: #8d6e4f;">[${poi.type}]</span></div>
              <div class="poi-desc">${poi.desc}</div>
            </li>
          `).join('')}
        </ul>
      </div>
    `;

    if (worldState.prefs.dmMode && region.dmNotes) {
      html += `
        <div class="dm-secret-banner" style="background: rgba(198, 40, 40, 0.12); border: 1px dashed #c62828; border-radius: 6px; padding: 0.75rem; margin-top: 0.75rem;">
          <div class="banner-title" style="color: #c62828; font-weight: bold; font-size: 0.8rem;">DM Confidential Note</div>
          <div class="banner-text" style="color: #4e342e; font-size: 0.9rem;">${region.dmNotes}</div>
        </div>
      `;
    }

    flyoutBody.innerHTML = html;
    flyout.classList.add('open');
  }

  // Fluid Mouse Wheel Zoom centered on cursor
  mapContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    const rect = svg.getBoundingClientRect();
    const mouseXNorm = (e.clientX - rect.left) / rect.width;
    const mouseYNorm = (e.clientY - rect.top) / rect.height;

    // SVG point before zoom
    const targetSvgX = curX + mouseXNorm * curW;
    const targetSvgY = curY + mouseYNorm * curH;

    // Calculate zoom delta
    const zoomDelta = e.deltaY < 0 ? 1.15 : 0.87;
    const nextZoom = Math.max(0.75, Math.min(zoomLevel * zoomDelta, 4.0));

    if (nextZoom !== zoomLevel) {
      zoomLevel = nextZoom;
      const nextW = BASE_W / zoomLevel;
      const nextH = BASE_H / zoomLevel;

      curX = targetSvgX - mouseXNorm * nextW;
      curY = targetSvgY - mouseYNorm * nextH;
      curW = nextW;
      curH = nextH;

      updateViewBox();
    }
  }, { passive: false });

  // Fluid Click-and-Drag Panning
  svg.addEventListener('mousedown', (e) => {
    if (e.target.closest('.map-pin') || e.target.closest('.map-flyout-panel')) return;
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    startViewX = curX;
    startViewY = curY;
    svg.classList.add('panning');
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const rect = svg.getBoundingClientRect();
    const deltaScreenX = e.clientX - dragStartX;
    const deltaScreenY = e.clientY - dragStartY;

    const deltaSvgX = (deltaScreenX / rect.width) * curW;
    const deltaSvgY = (deltaScreenY / rect.height) * curH;

    curX = startViewX - deltaSvgX;
    curY = startViewY - deltaSvgY;
    updateViewBox();
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      svg.classList.remove('panning');
    }
  });

  // Filter chips
  container.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      container.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentFilter = chip.getAttribute('data-filter');
      renderPins();
    });
  });

  flyoutClose.addEventListener('click', () => flyout.classList.remove('open'));

  // Step Zoom Buttons
  container.querySelector('#zoom-in-btn').addEventListener('click', () => {
    const centerSvgX = curX + curW / 2;
    const centerSvgY = curY + curH / 2;
    zoomLevel = Math.min(zoomLevel * 1.25, 4.0);
    const nextW = BASE_W / zoomLevel;
    const nextH = BASE_H / zoomLevel;
    curX = centerSvgX - nextW / 2;
    curY = centerSvgY - nextH / 2;
    updateViewBox();
  });

  container.querySelector('#zoom-out-btn').addEventListener('click', () => {
    const centerSvgX = curX + curW / 2;
    const centerSvgY = curY + curH / 2;
    zoomLevel = Math.max(zoomLevel / 1.25, 0.75);
    const nextW = BASE_W / zoomLevel;
    const nextH = BASE_H / zoomLevel;
    curX = centerSvgX - nextW / 2;
    curY = centerSvgY - nextH / 2;
    updateViewBox();
  });

  function resetMap() {
    zoomLevel = 1.0;
    curX = 0;
    curY = 0;
    curW = BASE_W;
    curH = BASE_H;
    updateViewBox();
  }

  container.querySelector('#zoom-reset-btn').addEventListener('click', resetMap);
  container.querySelector('#map-center-btn').addEventListener('click', resetMap);

  resetMap();
  renderPins();
}
