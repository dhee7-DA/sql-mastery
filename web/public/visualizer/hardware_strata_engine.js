/**
 * SQL MASTERY - 3D HARDWARE STRATA ENGINE
 * ------------------------------------------------------------------------
 * 60fps GPU-accelerated 3D isometric database engine exploder with
 * vertical laser conduits, physical latency hierarchies, and interactive
 * layer telemetry.
 */

(function(window) {
  'use strict';

  const State = {
    selectedLayerId: 'layer_03_buffer',
    isExploded: true,
    isSimulating: false,
    rotX: 54,
    rotZ: -36
  };

  /**
   * Initialize 3D Hardware Strata in container
   */
  function init(targetContainerId = 'viewHardwareStrata') {
    const container = document.getElementById(targetContainerId);
    if (!container) return;

    renderWorkspace(container);
    bindStageInteractions(container);
  }

  /**
   * Render complete workspace layout
   */
  function renderWorkspace(container) {
    const layers = window.HARDWARE_STRATA_DATA || [];
    const selectedLayer = layers.find(l => l.id === State.selectedLayerId) || layers[2];

    container.innerHTML = `
      <div class="strata-workspace-container">
        <!-- Top Ambient Glow -->
        <div class="strata-ambient-glow"></div>

        <!-- Top Header Navigation -->
        <header class="strata-header">
          <div class="strata-header-left">
            <div class="strata-header-badge">
              <span class="strata-gem-pulse"></span>
              <span class="strata-badge-text">DATABASE INTERNALS // 3D ISOMETRIC STRATA</span>
            </div>
            <h1 class="strata-main-title">Hardware Storage Engine Hierarchy</h1>
            <p class="strata-main-sub">Explore the physical execution path from raw SQL client AST down to DDR5 memory page frames, WAL sequential fsync barriers, and PCIe NVMe flash blocks.</p>
          </div>

          <div class="strata-header-actions">
            <button class="btn-strata-action ${State.isExploded ? 'active' : ''}" id="btnToggleExplode" onclick="window.HARDWARE_STRATA_ENGINE.toggleExplode()">
              <span class="action-icon">⬡</span>
              <span id="txtExplodeBtn">${State.isExploded ? 'Collapse Stack' : 'Explode 3D Layers'}</span>
            </button>
            <button class="btn-strata-action btn-strata-primary" onclick="window.HARDWARE_STRATA_ENGINE.simulateQueryFlow()">
              <span class="action-icon">⚡</span>
              <span>Simulate Query Flow</span>
            </button>
          </div>
        </header>

        <!-- Main Workspace: 3D Stage (Left) & Inspection Dossier (Right) -->
        <div class="strata-grid">
          
          <!-- 3D Isometric Interactive Stage -->
          <div class="strata-stage-card">
            <div class="strata-stage-controls">
              <span class="stage-status-chip">
                <span class="chip-dot"></span>
                <span>3D ISOMETRIC VIEWPORT</span>
              </span>
              <div class="stage-hint">Drag cursor to rotate tilt &bull; Click slab to inspect</div>
            </div>

            <div class="strata-stage-viewport" id="strataStageViewport">
              <!-- Animated Vertical Laser Conduits -->
              <svg class="strata-conduits-svg" id="strataConduitsSvg" viewBox="0 0 400 600">
                <defs>
                  <linearGradient id="laserBeamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#10b981" stop-opacity="0.8"/>
                    <stop offset="25%" stop-color="#6366f1" stop-opacity="0.8"/>
                    <stop offset="50%" stop-color="#06b6d4" stop-opacity="0.9"/>
                    <stop offset="75%" stop-color="#f59e0b" stop-opacity="0.8"/>
                    <stop offset="100%" stop-color="#f43f5e" stop-opacity="0.8"/>
                  </linearGradient>
                </defs>
                <!-- Central vertical data conduit -->
                <line x1="200" y1="80" x2="200" y2="520" stroke="url(#laserBeamGrad)" stroke-width="2.5" stroke-dasharray="6 4" class="conduit-line-pulse"/>
                <line x1="140" y1="120" x2="140" y2="480" stroke="rgba(255,255,255,0.12)" stroke-width="1.2" stroke-dasharray="4 4"/>
                <line x1="260" y1="120" x2="260" y2="480" stroke="rgba(255,255,255,0.12)" stroke-width="1.2" stroke-dasharray="4 4"/>
              </svg>

              <!-- 3D Layers Stack Wrapper -->
              <div class="strata-3d-stack ${State.isExploded ? 'is-exploded' : 'is-collapsed'}" id="strata3DStack">
                ${layers.map((layer, idx) => renderLayerSlabHtml(layer, idx)).join('')}
              </div>
            </div>

            <!-- Bottom Latency Ruler -->
            <div class="strata-latency-ruler">
              <span class="ruler-step step-l1">L1 Cache (0.5 ns)</span>
              <span class="ruler-arrow">&rarr;</span>
              <span class="ruler-step step-l3">L3 Cache (20 ns)</span>
              <span class="ruler-arrow">&rarr;</span>
              <span class="ruler-step step-ram">RAM (100 ns)</span>
              <span class="ruler-arrow">&rarr;</span>
              <span class="ruler-step step-nvme">NVMe SSD (10 μs)</span>
              <span class="ruler-arrow">&rarr;</span>
              <span class="ruler-step step-disk">Magnetic Disk (10 ms)</span>
            </div>
          </div>

          <!-- Layer Telemetry & Inspection Dossier (Right) -->
          <div class="strata-dossier-card" id="strataDossierCard">
            ${renderDossierHtml(selectedLayer)}
          </div>

        </div>
      </div>
    `;
  }

  /**
   * Render single 3D Slab HTML
   */
  function renderLayerSlabHtml(layer, idx) {
    const isSelected = layer.id === State.selectedLayerId;
    return `
      <div class="strata-slab-wrapper layer-lvl-${layer.level} ${isSelected ? 'is-selected' : ''}" 
           id="slab_${layer.id}" 
           onclick="window.HARDWARE_STRATA_ENGINE.selectLayer('${layer.id}')"
           style="--layer-color: ${layer.color};">
        
        <div class="strata-slab-face strata-slab-top">
          <div class="slab-content-grid">
            <div class="slab-icon-wrap">
              ${layer.svgIcon}
            </div>
            <div class="slab-info-group">
              <div class="slab-tag-row">
                <span class="slab-num">LAYER 0${layer.level}</span>
                <span class="slab-badge" style="color: ${layer.color}; border-color: ${layer.color}40; background: ${layer.color}15;">
                  ${escapeHtml(layer.badge)}
                </span>
              </div>
              <div class="slab-name">${escapeHtml(layer.shortName)}</div>
            </div>
            <div class="slab-latency-tag font-mono">
              ${escapeHtml(layer.latency)}
            </div>
          </div>
        </div>

        <div class="strata-slab-edge strata-slab-front"></div>
        <div class="strata-slab-edge strata-slab-right"></div>
      </div>
    `;
  }

  /**
   * Render Inspection Dossier HTML
   */
  function renderDossierHtml(layer) {
    return `
      <div class="dossier-header" style="border-left: 3px solid ${layer.color};">
        <div class="dossier-tag-row">
          <span class="dossier-badge" style="color: ${layer.color}; background: ${layer.color}15; border: 1px solid ${layer.color}35;">
            LAYER 0${layer.level} &bull; ${escapeHtml(layer.badge)}
          </span>
          <span class="dossier-hw-tier">${escapeHtml(layer.hardwareTier)}</span>
        </div>
        <h2 class="dossier-title">${escapeHtml(layer.title)}</h2>
        <p class="dossier-summary">${escapeHtml(layer.summary)}</p>
      </div>

      <!-- Latency & Throughput Benchmark Gauge -->
      <div class="dossier-kpi-banner">
        <div class="dossier-kpi-box">
          <span class="kpi-lbl">PHYSICAL ACCESS LATENCY</span>
          <span class="kpi-val font-mono" style="color: ${layer.color};">${escapeHtml(layer.latency)}</span>
          <span class="kpi-sub">Hardware Bus Clock</span>
        </div>
        <div class="dossier-kpi-box">
          <span class="kpi-lbl">VOLATILITY STATUS</span>
          <span class="kpi-val font-mono">${layer.level <= 3 ? '⚡ Volatile (RAM)' : '🔒 Durable (Non-Volatile)'}</span>
          <span class="kpi-sub">${layer.level <= 3 ? 'Cleared on power off' : 'Survives kernel panic'}</span>
        </div>
      </div>

      <!-- Mechanics & Architectural Invariants -->
      <div class="dossier-section">
        <h4 class="dossier-subheading">Core Physical Mechanics &amp; Invariants</h4>
        <ul class="dossier-mechanics-list">
          ${layer.details.map(d => `<li>${escapeHtml(d)}</li>`).join('')}
        </ul>
      </div>

      <!-- Complexity & Physical Formulas -->
      <div class="dossier-section">
        <h4 class="dossier-subheading">Mathematical Formulas &amp; Cost Equations</h4>
        <div class="dossier-formulas-grid">
          ${layer.formulas.map(f => `
            <div class="formula-card">
              <span class="formula-lbl">${escapeHtml(f.label)}</span>
              <span class="formula-val font-mono">${escapeHtml(f.val)}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Production Tuning Knobs -->
      <div class="dossier-section">
        <h4 class="dossier-subheading">Critical Production Tuning Knobs</h4>
        <div class="tuning-knobs-list">
          ${layer.tuningKnobs.map(k => `
            <div class="knob-row">
              <div class="knob-name-group">
                <span class="knob-name font-mono">${escapeHtml(k.name)}</span>
                <span class="knob-desc">${escapeHtml(k.desc)}</span>
              </div>
              <div class="knob-val-badge font-mono">
                ${escapeHtml(k.defaultVal)} <span class="knob-unit">${escapeHtml(k.unit)}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Production Incident Trap -->
      <div class="dossier-trap-card">
        <div class="trap-header">
          <span class="trap-gem"></span>
          <span class="trap-title">PRODUCTION INCIDENT: ${escapeHtml(layer.incidentTrap.title)}</span>
        </div>
        <p class="trap-gotcha">${escapeHtml(layer.incidentTrap.gotcha)}</p>
        <pre class="trap-code font-mono"><code>${escapeHtml(layer.incidentTrap.fixSql)}</code></pre>
      </div>

      <!-- Action Bridges -->
      <div class="dossier-footer-actions">
        <button class="btn-dossier-action btn-dossier-studio" onclick="window.HARDWARE_STRATA_ENGINE.launchStudioWithFix('${layer.id}')">
          <span>🚀 Test Mitigation in Studio</span>
        </button>
        <button class="btn-dossier-action btn-dossier-profiler" onclick="window.HARDWARE_STRATA_ENGINE.launchProfilerWithLayer('${layer.id}')">
          <span>🌳 Inspect Execution Tree</span>
        </button>
      </div>
    `;
  }

  /**
   * Bind 3D mouse rotation and hover interactions
   */
  function bindStageInteractions(container) {
    const stage = container.querySelector('#strataStageViewport');
    const stack = container.querySelector('#strata3DStack');
    if (!stage || !stack) return;

    let isHovering = false;

    stage.addEventListener('mouseenter', () => { isHovering = true; });
    stage.addEventListener('mouseleave', () => {
      isHovering = false;
      stack.style.transform = `rotateX(${State.rotX}deg) rotateZ(${State.rotZ}deg)`;
    });

    stage.addEventListener('mousemove', (e) => {
      if (!isHovering) return;
      const rect = stage.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;

      const tiltX = (State.rotX - normY * 12).toFixed(1);
      const tiltZ = (State.rotZ + normX * 12).toFixed(1);

      stack.style.transform = `rotateX(${tiltX}deg) rotateZ(${tiltZ}deg)`;
    });
  }

  /**
   * Select a layer to inspect
   */
  function selectLayer(layerId) {
    if (State.selectedLayerId === layerId) return;
    State.selectedLayerId = layerId;

    if (window.soundFX && window.soundFX.playClick) {
      window.soundFX.playClick();
    }

    // Update slab selection highlight
    document.querySelectorAll('.strata-slab-wrapper').forEach(s => s.classList.remove('is-selected'));
    const selectedSlab = document.getElementById(`slab_${layerId}`);
    if (selectedSlab) selectedSlab.classList.add('is-selected');

    // Update dossier panel
    const layer = (window.HARDWARE_STRATA_DATA || []).find(l => l.id === layerId);
    const dossier = document.getElementById('strataDossierCard');
    if (layer && dossier) {
      dossier.innerHTML = renderDossierHtml(layer);
      // Soft entrance animation
      dossier.style.opacity = '0';
      dossier.style.transform = 'translateY(8px)';
      requestAnimationFrame(() => {
        dossier.style.transition = 'opacity 240ms ease, transform 260ms cubic-bezier(0.16, 1, 0.3, 1)';
        dossier.style.opacity = '1';
        dossier.style.transform = 'translateY(0)';
      });
    }
  }

  /**
   * Toggle between Exploded and Collapsed 3D Stack
   */
  function toggleExplode() {
    State.isExploded = !State.isExploded;

    if (window.soundFX && window.soundFX.playWhoosh) {
      window.soundFX.playWhoosh();
    }

    const stack = document.getElementById('strata3DStack');
    const btn = document.getElementById('btnToggleExplode');
    const txt = document.getElementById('txtExplodeBtn');

    if (stack) {
      if (State.isExploded) {
        stack.classList.remove('is-collapsed');
        stack.classList.add('is-exploded');
      } else {
        stack.classList.remove('is-exploded');
        stack.classList.add('is-collapsed');
      }
    }

    if (btn) btn.classList.toggle('active', State.isExploded);
    if (txt) txt.textContent = State.isExploded ? 'Collapse Stack' : 'Explode 3D Layers';
  }

  /**
   * Simulate Query Flow: Animate laser pulse descending through all 5 layers
   */
  function simulateQueryFlow() {
    if (State.isSimulating) return;
    State.isSimulating = true;

    if (window.soundFX && window.soundFX.playZap) {
      window.soundFX.playZap();
    }

    const slabs = [
      document.getElementById('slab_layer_01_client'),
      document.getElementById('slab_layer_02_optimizer'),
      document.getElementById('slab_layer_03_buffer'),
      document.getElementById('slab_layer_04_wal'),
      document.getElementById('slab_layer_05_storage')
    ];

    let step = 0;
    const interval = setInterval(() => {
      slabs.forEach(s => s && s.classList.remove('is-pulse-active'));
      if (step < slabs.length) {
        if (slabs[step]) slabs[step].classList.add('is-pulse-active');
        if (window.soundFX && window.soundFX.playPop) window.soundFX.playPop();
        step++;
      } else {
        clearInterval(interval);
        State.isSimulating = false;
        setTimeout(() => {
          slabs.forEach(s => s && s.classList.remove('is-pulse-active'));
        }, 400);
      }
    }, 280);
  }

  /**
   * Launch Studio Workbench with mitigation SQL
   */
  function launchStudioWithFix(layerId) {
    const layer = (window.HARDWARE_STRATA_DATA || []).find(l => l.id === layerId);
    if (!layer) return;

    if (typeof window.selectNavView === 'function') {
      window.selectNavView('viewStudio', 'Section Studio', null);
    } else if (typeof window.switchMainView === 'function') {
      window.switchMainView('viewStudio');
    }

    const sqlInput = document.getElementById('sqlInput');
    if (sqlInput) {
      sqlInput.value = layer.incidentTrap.fixSql;
      if (typeof window.runQueryManual === 'function') {
        setTimeout(window.runQueryManual, 120);
      }
    }
  }

  /**
   * Launch Visual Query Profiler
   */
  function launchProfilerWithLayer(layerId) {
    if (typeof window.selectNavView === 'function') {
      window.selectNavView('viewQueryProfiler', 'Visual Query Profiler', 'navGroupExplore');
    } else if (typeof window.switchMainView === 'function') {
      window.switchMainView('viewQueryProfiler');
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Public API
  window.HARDWARE_STRATA_ENGINE = {
    init,
    selectLayer,
    toggleExplode,
    simulateQueryFlow,
    launchStudioWithFix,
    launchProfilerWithLayer,
    getState: () => State
  };

  // Auto initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init('viewHardwareStrata'));
  } else {
    setTimeout(() => init('viewHardwareStrata'), 120);
  }

})(window);
