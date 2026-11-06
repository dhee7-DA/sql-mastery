/**
 * SQL MASTERY - RELATIONAL PARTICLE COLLIDER ENGINE
 * ------------------------------------------------------------------------
 * 60fps GPU-accelerated HTML5 Canvas physics simulation of query execution.
 * Tuples are rendered as physical particle capsules flowing through laser
 * predicate gates, magnetic join vortexes, and glass group accumulators.
 */

(function(window) {
  'use strict';

  const State = {
    activeScenarioId: 'scenario_filter_laser',
    isRunning: true,
    speedMultiplier: 1.0,
    particles: [],
    sparkParticles: [],
    lastEmitTime: 0,
    emitIndex: 0,
    animFrameId: null,
    stats: { emitted: 0, passed: 0, deflected: 0 },
    bucketStats: {
      Engineering: { count: 0, sum: 0 },
      Product: { count: 0, sum: 0 },
      Design: { count: 0, sum: 0 }
    }
  };

  let canvasEl = null;
  let ctx = null;

  /**
   * Initialize Collider in target container
   */
  function init(targetContainerId = 'viewRelationalCollider') {
    const container = document.getElementById(targetContainerId);
    if (!container) return;

    renderWorkspace(container);
    setupCanvas();
    startSimulationLoop();
  }

  /**
   * Render complete workspace layout
   */
  function renderWorkspace(container) {
    const scenarios = window.COLLIDER_SCENARIOS || [];
    const currentScenario = scenarios.find(s => s.id === State.activeScenarioId) || scenarios[0];

    container.innerHTML = `
      <div class="collider-workspace-container">
        <!-- Top Ambient Glow -->
        <div class="collider-ambient-glow"></div>

        <!-- Header -->
        <header class="collider-header">
          <div class="collider-header-left">
            <div class="collider-badge">
              <span class="collider-pulse-gem"></span>
              <span class="collider-badge-text">RELATIONAL ALGEBRA // PARTICLE COLLIDER</span>
            </div>
            <h1 class="collider-title">Relational Dataflow Particle Collider</h1>
            <p class="collider-sub">Watch physical query execution physics in real time: tuples emit from table heap blocks, collide with high-energy predicate lasers, and centrifuge into volumetric glass accumulators.</p>
          </div>

          <div class="collider-header-actions">
            <div class="collider-scenario-picker">
              <span class="picker-lbl">Scenario:</span>
              <select id="selColliderScenario" class="collider-select" onchange="window.RELATIONAL_COLLIDER_ENGINE.selectScenario(this.value)">
                ${scenarios.map(s => `
                  <option value="${s.id}" ${s.id === State.activeScenarioId ? 'selected' : ''}>
                    ${escapeHtml(s.title)} (${escapeHtml(s.category)})
                  </option>
                `).join('')}
              </select>
            </div>
            <button class="btn-collider-action" onclick="window.RELATIONAL_COLLIDER_ENGINE.injectPoisonTuple()">
              <span>☠️ Inject Poison NULL</span>
            </button>
            <button class="btn-collider-action btn-collider-primary" onclick="window.RELATIONAL_COLLIDER_ENGINE.togglePlay()">
              <span id="txtPlayBtn">${State.isRunning ? '⏸ Pause' : '▶ Play'}</span>
            </button>
          </div>
        </header>

        <!-- Main Simulation Card -->
        <div class="collider-main-card">
          <!-- Canvas Top Toolstrip -->
          <div class="collider-canvas-strip">
            <div class="strip-left">
              <span class="strip-tag font-mono">CHAMBER: ${escapeHtml(currentScenario.category.toUpperCase())}</span>
              <span class="strip-algebra font-mono">${escapeHtml(currentScenario.relationalAlgebra)}</span>
            </div>
            <div class="strip-right">
              <div class="speed-toggle-group">
                <button class="btn-speed ${State.speedMultiplier === 0.5 ? 'active' : ''}" onclick="window.RELATIONAL_COLLIDER_ENGINE.setSpeed(0.5, this)">0.5x</button>
                <button class="btn-speed ${State.speedMultiplier === 1.0 ? 'active' : ''}" onclick="window.RELATIONAL_COLLIDER_ENGINE.setSpeed(1.0, this)">1x</button>
                <button class="btn-speed ${State.speedMultiplier === 2.0 ? 'active' : ''}" onclick="window.RELATIONAL_COLLIDER_ENGINE.setSpeed(2.0, this)">2x</button>
              </div>
              <button class="btn-reset-sim" onclick="window.RELATIONAL_COLLIDER_ENGINE.resetSimulation()" title="Clear & Restart Simulation">
                ↺ Reset
              </button>
            </div>
          </div>

          <!-- HTML5 Physics Canvas Viewport -->
          <div class="collider-canvas-viewport" id="colliderViewportWrap">
            <canvas id="colliderCanvas"></canvas>
          </div>

          <!-- Bottom Telemetry HUD Bar -->
          <div class="collider-telemetry-bar">
            <div class="telemetry-stat">
              <span class="stat-lbl">TUPLES EMITTED</span>
              <span class="stat-val font-mono" id="statEmitted">0</span>
            </div>
            <div class="telemetry-stat stat-passed">
              <span class="stat-lbl">PASSED PREDICATE</span>
              <span class="stat-val font-mono" id="statPassed">0</span>
            </div>
            <div class="telemetry-stat stat-deflected">
              <span class="stat-lbl">DEFLECTED REJECTS</span>
              <span class="stat-val font-mono" id="statDeflected">0</span>
            </div>
            <div class="telemetry-stat">
              <span class="stat-lbl">PHYSICS FPS</span>
              <span class="stat-val font-mono" style="color: #38bdf8;">60.0</span>
            </div>
          </div>
        </div>

        <!-- SQL Definition & Explanation Box -->
        <div class="collider-dossier-card">
          <div class="collider-dossier-left">
            <h3 class="dossier-scenario-name">${escapeHtml(currentScenario.title)}</h3>
            <p class="dossier-scenario-desc">${escapeHtml(currentScenario.description)}</p>
            <div class="collider-actions-row">
              <button class="btn-bridge-studio" onclick="window.RELATIONAL_COLLIDER_ENGINE.launchInStudio()">
                🚀 Open in Studio Workbench
              </button>
              <button class="btn-bridge-profiler" onclick="window.RELATIONAL_COLLIDER_ENGINE.launchInProfiler()">
                🌳 Explain in Tree Profiler
              </button>
            </div>
          </div>
          <div class="collider-dossier-right">
            <div class="sql-box-label">EXECUTING RELATIONAL STATEMENT</div>
            <pre class="collider-sql-pre font-mono"><code>${escapeHtml(currentScenario.sql)}</code></pre>
          </div>
        </div>

      </div>
    `;
  }

  /**
   * Setup Canvas dimensions and HiDPI DPI scaling
   */
  function setupCanvas() {
    canvasEl = document.getElementById('colliderCanvas');
    if (!canvasEl) return;
    const wrap = document.getElementById('colliderViewportWrap');
    if (!wrap) return;

    const rect = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const w = rect.width || 1000;
    const h = 420;

    canvasEl.width = w * dpr;
    canvasEl.height = h * dpr;
    canvasEl.style.width = `${w}px`;
    canvasEl.style.height = `${h}px`;

    ctx = canvasEl.getContext('2d');
    ctx.scale(dpr, dpr);
  }

  /**
   * Reset simulation and metrics
   */
  function resetSimulation() {
    State.particles = [];
    State.sparkParticles = [];
    State.stats = { emitted: 0, passed: 0, deflected: 0 };
    State.bucketStats = {
      Engineering: { count: 0, sum: 0 },
      Product: { count: 0, sum: 0 },
      Design: { count: 0, sum: 0 }
    };
    State.emitIndex = 0;
    updateTelemetryDom();
  }

  /**
   * Select a new scenario
   */
  function selectScenario(scenarioId) {
    if (State.activeScenarioId === scenarioId) return;
    State.activeScenarioId = scenarioId;
    resetSimulation();
    init('viewRelationalCollider');
  }

  /**
   * Toggle Play / Pause
   */
  function togglePlay() {
    State.isRunning = !State.isRunning;
    const btn = document.getElementById('txtPlayBtn');
    if (btn) btn.textContent = State.isRunning ? '⏸ Pause' : '▶ Play';
  }

  /**
   * Speed multiplier setter
   */
  function setSpeed(multiplier, btn) {
    if (State.speedMultiplier > 0) {
      const ratio = multiplier / State.speedMultiplier;
      State.particles.forEach(p => {
        p.vx *= ratio;
        p.vy *= ratio;
      });
    }
    State.speedMultiplier = multiplier;
    document.querySelectorAll('.btn-speed').forEach(b => b.classList.remove('active'));
    if (btn) {
      btn.classList.add('active');
    } else {
      document.querySelectorAll('.btn-speed').forEach(b => {
        if (b.textContent.trim() === `${multiplier}x`) b.classList.add('active');
      });
    }
  }

  /**
   * Inject a Poison NULL tuple into the active pipeline
   */
  function injectPoisonTuple() {
    if (window.soundFX && window.soundFX.playPop) window.soundFX.playPop();

    const poison = {
      id: `poison_${Date.now()}`,
      label: 'NULL_POISON',
      cols: { id: 999, val: null, status: 'UNKNOWN' },
      passes: false,
      isPoison: true,
      x: 30,
      y: 190,
      vx: 4.6 * State.speedMultiplier,
      vy: 0,
      color: '#ec4899', // Pink
      state: 'emitted',
      scale: 1.1
    };

    State.particles.push(poison);
    State.stats.emitted++;
    updateTelemetryDom();
  }

  /**
   * Emit regular tuples based on scenario schedule
   */
  function checkEmitTuple(timestamp) {
    if (!State.isRunning) return;
    if (timestamp - State.lastEmitTime < 850 / State.speedMultiplier) return;

    State.lastEmitTime = timestamp;
    const scenario = (window.COLLIDER_SCENARIOS || []).find(s => s.id === State.activeScenarioId);
    if (!scenario) return;

    const tuples = scenario.tuples || [];
    if (tuples.length === 0) return;

    const dataTuple = tuples[State.emitIndex % tuples.length];
    State.emitIndex++;

    const isGroup = scenario.id === 'scenario_groupby_cylinder';
    const isThreeValued = scenario.id === 'scenario_three_valued_null';

    const p = {
      id: `p_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      x: 40,
      y: 190 + (Math.random() * 16 - 8),
      vx: 4.8 * State.speedMultiplier,
      vy: 0,
      data: dataTuple,
      passes: isThreeValued ? (dataTuple.outcome === 'TRUE') : (dataTuple.passes !== false),
      bucket: dataTuple.bucket || null,
      color: isThreeValued ? (dataTuple.color || '#10b981') : (isGroup ? (getBucketColor(dataTuple.bucket)) : '#38bdf8'),
      label: dataTuple.cols ? Object.values(dataTuple.cols)[0] : 'Tuple',
      sublabel: dataTuple.cols ? `$${dataTuple.cols.amount || dataTuple.cols.salary || dataTuple.cols.bonus || ''}` : '',
      state: 'emitted',
      alpha: 1.0
    };

    State.particles.push(p);
    State.stats.emitted++;
    updateTelemetryDom();
  }

  function getBucketColor(bucket) {
    if (bucket === 'Engineering') return '#10b981';
    if (bucket === 'Product') return '#6366f1';
    if (bucket === 'Design') return '#06b6d4';
    return '#fbbf24';
  }

  /**
   * Main 60fps Physics & Render Loop
   */
  function startSimulationLoop() {
    if (State.animFrameId) cancelAnimationFrame(State.animFrameId);
    let lastTime = 0;

    function frame(timestamp) {
      if (!lastTime) lastTime = timestamp;
      const dt = Math.min(100, Math.max(16, timestamp - lastTime));
      const timeScale = dt / 16.667;
      lastTime = timestamp;

      checkEmitTuple(timestamp);
      updatePhysics(timeScale);
      renderFrame();
      State.animFrameId = requestAnimationFrame(frame);
    }

    State.animFrameId = requestAnimationFrame(frame);
  }

  /**
   * Fast-forward simulation by N frames (synchronous step)
   */
  function simulateFrames(frameCount = 60) {
    const fakeTime = performance.now();
    for (let f = 0; f < frameCount; f++) {
      checkEmitTuple(fakeTime + f * 16.667);
      updatePhysics(1.0);
    }
    renderFrame();
  }

  /**
   * Update particle positions, laser checks, and cylinder drops
   */
  function updatePhysics(timeScale = 1.0) {
    if (!State.isRunning) return;

    const wrap = document.getElementById('colliderViewportWrap');
    const width = wrap ? wrap.clientWidth : 1000;
    const height = 420;
    const isGroupScenario = State.activeScenarioId === 'scenario_groupby_cylinder';

    const laserX = width * 0.45;

    // 1. Update Particles
    for (let i = State.particles.length - 1; i >= 0; i--) {
      const p = State.particles[i];
      p.x += p.vx * timeScale;
      p.y += p.vy * timeScale;

      if (!isGroupScenario) {
        // Laser Gate Collision Check
        if (p.x >= laserX && p.state === 'emitted') {
          spawnSparks(laserX, p.y, p.passes ? '#10b981' : '#ef4444');

          if (p.passes) {
            p.state = 'passed';
            p.color = '#10b981'; // Turn vibrant emerald
            p.vx = 6.2 * State.speedMultiplier; // Boost speed
            State.stats.passed++;
            if (window.soundFX && window.soundFX.playPop) window.soundFX.playPop();
          } else {
            p.state = 'deflected';
            p.color = p.isPoison ? '#ec4899' : '#ef4444'; // Turn red / poison pink
            p.vx = 2.4 * State.speedMultiplier;
            p.vy = 3.6 * State.speedMultiplier; // Deflect down into waste chute
            State.stats.deflected++;
            if (window.soundFX && window.soundFX.playZap) window.soundFX.playZap();
          }
          updateTelemetryDom();
        }

        // Fading out deflected particles as they enter bottom bin
        if (p.state === 'deflected' && p.y > 330) {
          p.alpha -= 0.04;
        }

        // Remove offscreen
        if (p.x > width + 50 || p.y > height + 50 || p.alpha <= 0) {
          State.particles.splice(i, 1);
        }
      } else {
        // GROUP BY Cylinder Drop Physics
        const bucketX = {
          Engineering: width * 0.52,
          Product: width * 0.68,
          Design: width * 0.84
        }[p.bucket] || width * 0.68;

        if (p.x >= bucketX && p.state === 'emitted') {
          p.state = 'dropping';
          p.vx = 0;
          p.vy = 4.8 * State.speedMultiplier;
        }

        if (p.state === 'dropping' && p.y >= 310) {
          // Dropped into cylinder!
          spawnSparks(bucketX, 310, p.color);
          if (State.bucketStats[p.bucket]) {
            State.bucketStats[p.bucket].count++;
            State.bucketStats[p.bucket].sum += (p.data.cols.salary || 1000);
          }
          State.stats.passed++;
          updateTelemetryDom();
          if (window.soundFX && window.soundFX.playPop) window.soundFX.playPop();
          State.particles.splice(i, 1);
        }
      }
    }

    // 2. Update Spark Particles
    for (let s = State.sparkParticles.length - 1; s >= 0; s--) {
      const sp = State.sparkParticles[s];
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.alpha -= 0.04;
      if (sp.alpha <= 0) State.sparkParticles.splice(s, 1);
    }
  }

  function spawnSparks(x, y, color) {
    for (let i = 0; i < 10; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3.5 + 1.5;
      State.sparkParticles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: color,
        size: Math.random() * 2.5 + 1.5,
        alpha: 1.0
      });
    }
  }

  /**
   * Render complete Canvas Scene
   */
  function renderFrame() {
    if (!ctx || !canvasEl) return;
    const wrap = document.getElementById('colliderViewportWrap');
    const width = wrap ? wrap.clientWidth : 1000;
    const height = 420;

    // Clear frame with deep gradient
    ctx.clearRect(0, 0, width, height);

    // 1. Draw Static Pipelines & Conduits
    drawConduitTrack(ctx, 40, 190, width - 80, 190);

    const isGroupScenario = State.activeScenarioId === 'scenario_groupby_cylinder';
    const laserX = width * 0.45;

    if (!isGroupScenario) {
      // 2. Draw Predicate Laser Gate
      drawLaserGate(ctx, laserX, 40, 340);

      // 3. Draw Deflected Rejects Waste Funnel
      drawRejectChute(ctx, laserX + 20, 240, laserX + 90, 360);
    } else {
      // 2. Draw Group Cylinders
      drawGroupCylinders(ctx, width);
    }

    // 4. Draw Emitter Funnel on the Left
    drawIntakeEmitter(ctx, 20, 190);

    // 5. Draw Output Platter on the Right
    if (!isGroupScenario) {
      drawOutputPlatter(ctx, width - 40, 190);
    }

    // 6. Draw In-Flight Particles
    State.particles.forEach(p => drawParticleCapsule(ctx, p));

    // 7. Draw Sparks
    State.sparkParticles.forEach(sp => {
      ctx.save();
      ctx.globalAlpha = Math.max(0, sp.alpha);
      ctx.fillStyle = sp.color;
      ctx.beginPath();
      ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  /**
   * Draw Main Pipeline Track
   */
  function drawConduitTrack(ctx, x1, y1, x2, y2) {
    ctx.save();
    // Glowing pipe
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 32;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Central neon wire
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }

  /**
   * Draw Laser Filter Gate
   */
  function drawLaserGate(ctx, x, yTop, yBottom) {
    ctx.save();
    const isThreeValued = State.activeScenarioId === 'scenario_three_valued_null';
    const isJoin = State.activeScenarioId === 'scenario_hash_join_vortex';

    let colTop = '#10b981';
    let colMid = '#6ee7b7';
    let colBot = '#059669';
    let gateLabel = 'PREDICATE LASER GATE (WHERE)';

    if (isThreeValued) {
      colTop = '#38bdf8';
      colMid = '#a5f3fc';
      colBot = '#0284c7';
      gateLabel = 'THREE-VALUED LOGIC TRUTH GATE (TRUE vs UNKNOWN)';
    } else if (isJoin) {
      colTop = '#8b5cf6';
      colMid = '#c4b5fd';
      colBot = '#6d28d9';
      gateLabel = 'HASH JOIN EQUALITY GATE (MAGNETIC VORTEX)';
    }

    // Laser glow
    const grad = ctx.createLinearGradient(x, yTop, x, yBottom);
    grad.addColorStop(0, colTop);
    grad.addColorStop(0.5, colMid);
    grad.addColorStop(1, colBot);

    ctx.shadowColor = colTop;
    ctx.shadowBlur = 18;
    ctx.strokeStyle = grad;
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(x, yTop);
    ctx.lineTo(x, yBottom);
    ctx.stroke();

    // Laser emitter diodes
    ctx.shadowBlur = 0;
    ctx.fillStyle = colTop;
    ctx.beginPath();
    ctx.arc(x, yTop, 6, 0, Math.PI * 2);
    ctx.arc(x, yBottom, 6, 0, Math.PI * 2);
    ctx.fill();

    // Label
    ctx.font = 'bold 9px monospace';
    ctx.fillStyle = colMid;
    ctx.textAlign = 'center';
    ctx.fillText(gateLabel, x, yTop - 12);
    ctx.restore();
  }

  /**
   * Draw Reject Chute
   */
  function drawRejectChute(ctx, x1, y1, x2, y2) {
    ctx.save();
    const isThreeValued = State.activeScenarioId === 'scenario_three_valued_null';
    const chuteLabel = isThreeValued ? 'DEFLECTED UNKNOWN / NULL' : 'DEFLECTED REJECTS (FALSE/NULL)';

    ctx.strokeStyle = 'rgba(239, 68, 68, 0.25)';
    ctx.lineWidth = 26;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    ctx.font = 'bold 9px monospace';
    ctx.fillStyle = '#f87171';
    ctx.textAlign = 'left';
    ctx.fillText(chuteLabel, x2 + 10, y2);
    ctx.restore();
  }

  /**
   * Draw GROUP BY Volumetric Cylinders
   */
  function drawGroupCylinders(ctx, width) {
    const buckets = [
      { key: 'Engineering', label: 'Eng', x: width * 0.52, color: '#10b981' },
      { key: 'Product', label: 'Prod', x: width * 0.68, color: '#6366f1' },
      { key: 'Design', label: 'Design', x: width * 0.84, color: '#06b6d4' }
    ];

    buckets.forEach(b => {
      const stats = State.bucketStats[b.key] || { count: 0, sum: 0 };
      const maxFill = 140;
      const fillHeight = Math.min(maxFill, stats.count * 28);

      ctx.save();
      // Glass cylinder outline
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 2;
      ctx.fillStyle = 'rgba(15, 20, 32, 0.6)';
      ctx.beginPath();
      ctx.roundRect(b.x - 30, 200, 60, 160, [0, 0, 12, 12]);
      ctx.fill();
      ctx.stroke();

      // Liquid fill
      if (fillHeight > 0) {
        ctx.fillStyle = `${b.color}40`;
        ctx.strokeStyle = b.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(b.x - 28, 360 - fillHeight, 56, fillHeight, [0, 0, 10, 10]);
        ctx.fill();
        ctx.stroke();
      }

      // Cylinder Labels & Metrics
      ctx.font = 'bold 11px sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(b.label, b.x, 385);

      ctx.font = 'bold 12px monospace';
      ctx.fillStyle = b.color;
      ctx.fillText(`COUNT: ${stats.count}`, b.x, 185);
      ctx.font = '10px monospace';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`SUM: $${(stats.sum / 1000).toFixed(0)}k`, b.x, 170);

      ctx.restore();
    });
  }

  /**
   * Draw Intake Emitter
   */
  function drawIntakeEmitter(ctx, x, y) {
    ctx.save();
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - 15, y - 25);
    ctx.lineTo(x + 15, y - 10);
    ctx.lineTo(x + 15, y + 10);
    ctx.lineTo(x - 15, y + 25);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.font = 'bold 9px monospace';
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'center';
    ctx.fillText('HEAP EMITTER', x + 5, y - 32);
    ctx.restore();
  }

  /**
   * Draw Output Platter
   */
  function drawOutputPlatter(ctx, x, y) {
    ctx.save();
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.font = 'bold 9px monospace';
    ctx.fillStyle = '#10b981';
    ctx.textAlign = 'center';
    ctx.fillText('RESULT PLATTER', x, y - 32);
    ctx.restore();
  }

  /**
   * Draw Single Particle Capsule
   */
  function drawParticleCapsule(ctx, p) {
    ctx.save();
    ctx.globalAlpha = p.alpha;

    const w = 68;
    const h = 26;
    const x = p.x - w / 2;
    const y = p.y - h / 2;

    // Glowing shadow
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 10;

    // Capsule background
    ctx.fillStyle = 'rgba(8, 10, 16, 0.95)';
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 13);
    ctx.fill();
    ctx.stroke();

    ctx.shadowBlur = 0;

    // Primary text
    ctx.font = 'bold 9px monospace';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(String(p.label).substr(0, 10), p.x, p.y - 1);

    // Sublabel
    if (p.sublabel) {
      ctx.font = '8px monospace';
      ctx.fillStyle = p.color;
      ctx.fillText(p.sublabel, p.x, p.y + 9);
    }

    ctx.restore();
  }

  /**
   * Update DOM Telemetry readouts
   */
  function updateTelemetryDom() {
    const elE = document.getElementById('statEmitted');
    const elP = document.getElementById('statPassed');
    const elD = document.getElementById('statDeflected');
    if (elE) elE.textContent = State.stats.emitted;
    if (elP) elP.textContent = State.stats.passed;
    if (elD) elD.textContent = State.stats.deflected;
  }

  /**
   * Launch Studio Workbench with current scenario SQL
   */
  function launchInStudio() {
    const scenario = (window.COLLIDER_SCENARIOS || []).find(s => s.id === State.activeScenarioId);
    if (!scenario) return;

    if (typeof window.selectNavView === 'function') {
      window.selectNavView('viewStudio', 'Section Studio', null);
    } else if (typeof window.switchMainView === 'function') {
      window.switchMainView('viewStudio');
    }

    const sqlInput = document.getElementById('sqlInput');
    if (sqlInput) {
      sqlInput.value = scenario.sql;
      if (typeof window.runQueryManual === 'function') {
        setTimeout(window.runQueryManual, 120);
      }
    }
  }

  /**
   * Launch Visual Query Profiler
   */
  function launchInProfiler() {
    const scenario = (window.COLLIDER_SCENARIOS || []).find(s => s.id === State.activeScenarioId);
    if (!scenario) return;

    if (typeof window.selectNavView === 'function') {
      window.selectNavView('viewQueryProfiler', 'Visual Query Profiler', 'navGroupExplore');
    } else if (typeof window.switchMainView === 'function') {
      window.switchMainView('viewQueryProfiler');
    }

    if (window.QUERY_PROFILER_ENGINE) {
      window.QUERY_PROFILER_ENGINE.openWithSql(scenario.sql);
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
  window.RELATIONAL_COLLIDER_ENGINE = {
    init,
    selectScenario,
    togglePlay,
    setSpeed,
    injectPoisonTuple,
    resetSimulation,
    simulateFrames,
    launchInStudio,
    launchInProfiler,
    getState: () => State
  };

  // Auto initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init('viewRelationalCollider'));
  } else {
    setTimeout(() => init('viewRelationalCollider'), 140);
  }

})(window);
