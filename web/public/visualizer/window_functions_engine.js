/**
 * ============================================================================
 * 🪟 WINDOW FUNCTIONS MASTERY COCKPIT (Day 11 & Day 12 Engine)
 * ============================================================================
 * An interactive, visual, and physics-driven cockpit covering:
 *   1. Ranking Arena: ROW_NUMBER vs RANK vs DENSE_RANK vs NTILE with Tie-Break Physics
 *   2. Sliding Frame Aperture: ROWS/RANGE BETWEEN ... AND ... with Real-Time Accumulator HUD
 *   3. Offset Vector Tracer: LAG & LEAD with curved SVG peek arrows and boundary fallbacks
 *   4. GROUP BY vs PARTITION BY: Physical split-topology demonstrating N->1 vs N->N
 *   5. Physical Execution Pipeline Simulator: 6-step database engine internals trace
 *
 * Built with Framer Motion spring physics aesthetics, high-contrast syntax highlighting,
 * and zero external bundle dependencies.
 * ============================================================================
 */

(function (window) {
  'use strict';

  // --- 1. CURATED DATASETS ---
  const DATASETS = {
    salaries: {
      id: 'salaries',
      name: 'Corporate Salaries (Day 11 Ranking)',
      icon: '🏢',
      description: 'Employee compensation data with deliberate ties to inspect rank gaps.',
      partitionCol: 'dept',
      orderCol: 'salary',
      orderDir: 'DESC',
      rows: [
        { id: 101, name: 'Alice Chen', dept: 'Engineering', salary: 95000, title: 'Staff Engineer', hireDate: '2021-03-15' },
        { id: 102, name: 'Bob Smith', dept: 'Engineering', salary: 85000, title: 'Sr Developer', hireDate: '2022-01-10' },
        { id: 103, name: 'Charlie Lee', dept: 'Engineering', salary: 85000, title: 'Sr Developer', hireDate: '2022-04-20' }, // TIE with Bob
        { id: 104, name: 'David Kim', dept: 'Engineering', salary: 70000, title: 'Jr Developer', hireDate: '2023-06-01' },
        { id: 105, name: 'Elena Rostova', dept: 'Sales', salary: 92000, title: 'Account Exec', hireDate: '2020-11-05' },
        { id: 106, name: 'Frank Miller', dept: 'Sales', salary: 78000, title: 'Sales Rep', hireDate: '2021-08-12' },
        { id: 107, name: 'Grace Hopper', dept: 'Sales', salary: 78000, title: 'Sales Rep', hireDate: '2022-09-18' }, // TIE with Frank
        { id: 108, name: 'Hannah Abbott', dept: 'Marketing', salary: 88000, title: 'Brand Director', hireDate: '2019-07-22' },
        { id: 109, name: 'Ian Wright', dept: 'Marketing', salary: 72000, title: 'Content Lead', hireDate: '2023-02-14' }
      ]
    },
    revenue: {
      id: 'revenue',
      name: 'Daily Revenue & Orders (Day 12 Frames)',
      icon: '📈',
      description: 'Chronological sales stream with identical dates to demonstrate ROWS vs RANGE trap.',
      partitionCol: 'channel',
      orderCol: 'order_date',
      orderDir: 'ASC',
      rows: [
        { id: 201, date: '2026-03-01', channel: 'Online', amount: 120, orders: 4, customer: 'Acme Corp' },
        { id: 202, date: '2026-03-02', channel: 'Online', amount: 250, orders: 8, customer: 'Stark Ind' },
        { id: 203, date: '2026-03-03', channel: 'Online', amount: 180, orders: 5, customer: 'Wayne Ent' }, // Tied date with 204
        { id: 204, date: '2026-03-03', channel: 'Online', amount: 220, orders: 6, customer: 'Cyberdyne' }, // Tied date with 203
        { id: 205, date: '2026-03-04', channel: 'Online', amount: 310, orders: 9, customer: 'Umbrella Co' },
        { id: 206, date: '2026-03-01', channel: 'Retail', amount: 80, orders: 2, customer: 'Local Store A' },
        { id: 207, date: '2026-03-02', channel: 'Retail', amount: 150, orders: 5, customer: 'Local Store B' },
        { id: 208, date: '2026-03-03', channel: 'Retail', amount: 95, orders: 3, customer: 'Local Store C' },
        { id: 209, date: '2026-03-04', channel: 'Retail', amount: 210, orders: 7, customer: 'Local Store D' }
      ]
    },
    telemetry: {
      id: 'telemetry',
      name: 'User Session Telemetry (Day 12 LAG/LEAD)',
      icon: '⏱️',
      description: 'User access logs for sequential deltas, idle interval analysis & churn detection.',
      partitionCol: 'user_id',
      orderCol: 'session_time',
      orderDir: 'ASC',
      rows: [
        { id: 301, user: 'User 10', sessionTime: '10:00:00', pageViews: 12, spent: 45, action: 'Login' },
        { id: 302, user: 'User 10', sessionTime: '10:15:30', pageViews: 28, spent: 120, action: 'Checkout' },
        { id: 303, user: 'User 10', sessionTime: '11:45:00', pageViews: 5, spent: 0, action: 'Browse' },
        { id: 304, user: 'User 10', sessionTime: '14:20:10', pageViews: 18, spent: 75, action: 'Cart' },
        { id: 305, user: 'User 22', sessionTime: '09:30:00', pageViews: 8, spent: 20, action: 'Login' },
        { id: 306, user: 'User 22', sessionTime: '09:42:15', pageViews: 14, spent: 65, action: 'Purchase' },
        { id: 307, user: 'User 22', sessionTime: '12:10:00', pageViews: 3, spent: 0, action: 'Logout' }
      ]
    }
  };

  // --- 2. CURATED SQL PROBLEMS & INTERVIEW PATTERNS ---
  const PROBLEMS = [
    {
      id: 'P01',
      title: 'Top Earners per Department',
      tier: 'medium',
      topic: 'ranking',
      dataset: 'salaries',
      sql: `SELECT employee_id, name, dept, salary,
       DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS dept_rank
FROM Employees
QUALIFY dept_rank <= 2;`,
      summary: 'Find the top 2 highest paid employees in every department, handling ties seamlessly without skipping ranks.',
      keyInsight: 'DENSE_RANK() ensures that if two employees tie for 1st place, the next employee is ranked 2nd (no skipped rank numbers).'
    },
    {
      id: 'P02',
      title: 'Cumulative Running Revenue Total',
      tier: 'easy',
      topic: 'frame',
      dataset: 'revenue',
      sql: `SELECT date, channel, amount,
       SUM(amount) OVER (
           PARTITION BY channel 
           ORDER BY date ASC 
           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS running_revenue
FROM DailyRevenue;`,
      summary: 'Calculate the running cumulative cash inflow partitioned by channel as each transaction arrives.',
      keyInsight: 'Explicitly specify ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW to avoid the dangerous default RANGE tied-date inflation trap.'
    },
    {
      id: 'P03',
      title: '3-Day Moving Average Smoother',
      tier: 'medium',
      topic: 'frame',
      dataset: 'revenue',
      sql: `SELECT date, channel, amount,
       ROUND(AVG(amount) OVER (
           PARTITION BY channel 
           ORDER BY date ASC 
           ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING
       ), 2) AS smoothed_3day_avg
FROM DailyRevenue;`,
      summary: 'Smooth short-term sales volatility using a symmetric 3-day sliding frame window aperture.',
      keyInsight: '1 PRECEDING captures yesterday, CURRENT ROW captures today, and 1 FOLLOWING captures tomorrow.'
    },
    {
      id: 'P04',
      title: 'Session Inactivity Delta (LAG)',
      tier: 'medium',
      topic: 'offset',
      dataset: 'telemetry',
      sql: `SELECT user, sessionTime, pageViews,
       LAG(pageViews, 1, 0) OVER (
           PARTITION BY user 
           ORDER BY sessionTime ASC
       ) AS prev_views,
       pageViews - LAG(pageViews, 1, pageViews) OVER (
           PARTITION BY user 
           ORDER BY sessionTime ASC
       ) AS views_delta
FROM UserTelemetry;`,
      summary: 'Calculate the change in page views compared directly to the previous session of the same user.',
      keyInsight: 'LAG(col, 1, default) peeks 1 row backward in the partition. The 3rd parameter prevents NULL on the very first partition row.'
    },
    {
      id: 'P05',
      title: 'GROUP BY vs PARTITION BY Cardinality',
      tier: 'easy',
      topic: 'partition_vs_group',
      dataset: 'salaries',
      sql: `-- Window Functions preserve individual rows (N -> N):
SELECT name, dept, salary,
       AVG(salary) OVER (PARTITION BY dept) AS dept_avg,
       salary - AVG(salary) OVER (PARTITION BY dept) AS diff_from_avg
FROM Employees;

-- Whereas GROUP BY collapses rows (N -> 1):
-- SELECT dept, AVG(salary) FROM Employees GROUP BY dept;`,
      summary: 'Compare why window functions enrich individual rows while GROUP BY permanently collapses detailed input rows.',
      keyInsight: 'Window functions retain all N original rows side-by-side with partition-level aggregates.'
    }
  ];

  // --- 3. STATE MANAGEMENT ---
  const state = {
    activeMode: 'ranking', // 'ranking' | 'frame' | 'offset' | 'partition_vs_group'
    activeDatasetId: 'salaries',
    currentProblemIndex: 0,
    selectedRowIndex: 1, // Currently focused row
    tiesEnabled: true, // For ranking arena tie-break test
    framePreset: 'running', // 'running' | 'moving_avg' | 'remaining' | 'custom'
    frameType: 'ROWS', // 'ROWS' | 'RANGE'
    offsetK: 1, // For LAG/LEAD
    offsetDirection: 'LAG', // 'LAG' | 'LEAD'
    offsetDefaultValue: '0',
    partitionCollapseSim: false, // For Mode 4 GROUP BY morph
    pipelineStep: 0, // 0 to 5 for Simulator
    isAutoPlaying: false,
    autoPlayTimer: null,
    activeTokenHover: null // token currently hovered in Query Blueprint
  };

  // --- 4. COMPUTATION HELPERS (Pure Math & Window Logic) ---

  // Partition grouping helper
  function getPartitions(dataset, tiesEnabled) {
    const rawRows = JSON.parse(JSON.stringify(dataset.rows));

    // If ties disabled, modify tied values slightly to show strict order
    if (!tiesEnabled && dataset.id === 'salaries') {
      const charlie = rawRows.find(r => r.name === 'Charlie Lee');
      if (charlie) charlie.salary = 82000; // Distinct from Bob's 85000
      const grace = rawRows.find(r => r.name === 'Grace Hopper');
      if (grace) grace.salary = 74000; // Distinct from Frank's 78000
    }

    const partitionsMap = {};
    rawRows.forEach((row, originalIndex) => {
      row._origIdx = originalIndex;
      const partKey = row[dataset.partitionCol] || 'All';
      if (!partitionsMap[partKey]) partitionsMap[partKey] = [];
      partitionsMap[partKey].push(row);
    });

    // Sort within each partition
    const sortedPartitions = {};
    Object.keys(partitionsMap).forEach(key => {
      const arr = partitionsMap[key];
      arr.sort((a, b) => {
        const valA = a[dataset.orderCol];
        const valB = b[dataset.orderCol];
        if (dataset.orderDir === 'DESC') {
          return valB > valA ? 1 : valB < valA ? -1 : 0;
        } else {
          return valA > valB ? 1 : valA < valB ? -1 : 0;
        }
      });

      // Compute Ranking metrics for each row
      let currentDenseRank = 0;
      let lastVal = null;
      const n = arr.length;
      const ntileK = 3;

      arr.forEach((row, idx) => {
        const val = row[dataset.orderCol];

        // 1. ROW_NUMBER(): strictly 1, 2, 3...
        row._rowNumber = idx + 1;

        // 2. DENSE_RANK(): increments only when value changes
        if (val !== lastVal) {
          currentDenseRank++;
          lastVal = val;
        }
        row._denseRank = currentDenseRank;

        // 3. RANK(): count of preceding strictly superior rows + 1
        const tiesAhead = arr.filter(r => (dataset.orderDir === 'DESC' ? r[dataset.orderCol] > val : r[dataset.orderCol] < val)).length;
        row._rank = tiesAhead + 1;

        // 4. NTILE(k): bucket division
        row._ntile = Math.min(ntileK, Math.floor((idx * ntileK) / n) + 1);
      });

      sortedPartitions[key] = arr;
    });

    return sortedPartitions;
  }

  // Flattened sorted rows across all partitions
  function getFlattenedRows(dataset, tiesEnabled) {
    const parts = getPartitions(dataset, tiesEnabled);
    const flat = [];
    Object.keys(parts).forEach(key => {
      parts[key].forEach(r => flat.push(r));
    });
    return flat;
  }

  // Compute Active Window Frame for a given row in its partition
  function computeActiveFrame(partitionRows, targetRowIndex, preset, frameType, orderCol) {
    const n = partitionRows.length;
    let startIdx = 0;
    let endIdx = targetRowIndex;

    if (preset === 'running') {
      startIdx = 0;
      endIdx = targetRowIndex;
    } else if (preset === 'moving_avg') {
      startIdx = Math.max(0, targetRowIndex - 1);
      endIdx = Math.min(n - 1, targetRowIndex + 1);
    } else if (preset === 'remaining') {
      startIdx = targetRowIndex;
      endIdx = n - 1;
    } else { // trailing 2
      startIdx = Math.max(0, targetRowIndex - 2);
      endIdx = targetRowIndex;
    }

    // IF RANGE mode and tied values exist:
    if (frameType === 'RANGE' && preset === 'running') {
      const targetVal = partitionRows[targetRowIndex][orderCol];
      // Expand endIdx to include ALL rows in partition sharing the exact same value!
      for (let i = targetRowIndex + 1; i < n; i++) {
        if (partitionRows[i][orderCol] === targetVal) {
          endIdx = i;
        } else {
          break;
        }
      }
    }

    const capturedRows = partitionRows.slice(startIdx, endIdx + 1);
    return {
      startIdx,
      endIdx,
      capturedRows,
      isRangeInflated: frameType === 'RANGE' && endIdx > targetRowIndex
    };
  }

  // --- 5. MAIN RENDER CONTROLLER ---
  const WindowFunctionsEngine = {
    init: function () {
      const container = document.getElementById('viewWindowMatrix');
      if (!container) return;
      this.bindGlobalKeyboard();
      this.render();
    },

    setMode: function (mode) {
      if (state.activeMode === mode) return;
      state.activeMode = mode;
      state.selectedRowIndex = 0;

      // Set optimal dataset for mode BEFORE stopping autoplay or rendering
      if (mode === 'ranking' || mode === 'partition_vs_group') {
        state.activeDatasetId = 'salaries';
      } else if (mode === 'frame') {
        state.activeDatasetId = 'revenue';
      } else if (mode === 'offset') {
        state.activeDatasetId = 'telemetry';
      }

      this.stopAutoPlay();
      this.render();
      if (window.AudioFX) window.AudioFX.playClick();
      if (window.SQL_BUDDY) {
        if (mode === 'ranking') window.SQL_BUDDY.say('🏆 Ranking Arena: Notice how RANK() skips ranks on ties (1, 2, 2, 4) while DENSE_RANK() stays contiguous (1, 2, 2, 3)!', 4000, 'curious');
        else if (mode === 'frame') window.SQL_BUDDY.say('🪟 Sliding Frame Aperture: Watch the green window brackets expand row-by-row as the running accumulator recalculates!', 4000, 'happy');
        else if (mode === 'offset') window.SQL_BUDDY.say('🏹 Offset Vector Tracer: Curved peek arrows show how LAG & LEAD retrieve adjacent rows without expensive self-joins!', 4000, 'spark');
        else if (mode === 'partition_vs_group') window.SQL_BUDDY.say('⚖️ GROUP BY vs PARTITION BY: Notice that window functions preserve all individual detail rows (N → N)!', 4000, 'bulb');
      }
    },

    setProblem: function (pIndex) {
      state.currentProblemIndex = pIndex;
      const p = PROBLEMS[pIndex];
      state.activeMode = p.topic;
      state.activeDatasetId = p.dataset;
      state.selectedRowIndex = 1;
      this.stopAutoPlay();
      this.render();
      if (window.AudioFX) window.AudioFX.playSuccess();
    },

    setDataset: function (dsId) {
      state.activeDatasetId = dsId;
      state.selectedRowIndex = 0;
      this.render();
      if (window.AudioFX) window.AudioFX.playClick();
    },

    toggleTies: function () {
      state.tiesEnabled = !state.tiesEnabled;
      this.render();
      if (window.AudioFX) window.AudioFX.playBlip();
    },

    setFramePreset: function (preset) {
      state.framePreset = preset;
      this.render();
      if (window.AudioFX) window.AudioFX.playClick();
    },

    setFrameType: function (type) {
      state.frameType = type;
      this.render();
      if (window.AudioFX) window.AudioFX.playBlip();
    },

    setOffsetDirection: function (dir) {
      state.offsetDirection = dir;
      this.render();
      if (window.AudioFX) window.AudioFX.playClick();
    },

    setOffsetK: function (k) {
      state.offsetK = parseInt(k, 10);
      this.render();
      if (window.AudioFX) window.AudioFX.playBlip();
    },

    selectRow: function (idx) {
      state.selectedRowIndex = idx;
      this.render();
      if (window.AudioFX) window.AudioFX.playClick();
    },

    toggleAutoPlay: function () {
      if (state.isAutoPlaying) {
        this.stopAutoPlay();
      } else {
        this.startAutoPlay();
      }
    },

    startAutoPlay: function () {
      state.isAutoPlaying = true;
      const flatRows = getFlattenedRows(DATASETS[state.activeDatasetId], state.tiesEnabled);
      const maxIdx = flatRows.length - 1;

      state.autoPlayTimer = setInterval(() => {
        state.selectedRowIndex = (state.selectedRowIndex + 1) % (maxIdx + 1);
        this.render();
        if (window.AudioFX) window.AudioFX.playBlip();
      }, 1400);
      this.render();
    },

    stopAutoPlay: function () {
      state.isAutoPlaying = false;
      if (state.autoPlayTimer) {
        clearInterval(state.autoPlayTimer);
        state.autoPlayTimer = null;
      }
      this.render();
    },

    stepPipeline: function (direction) {
      state.pipelineStep = Math.max(0, Math.min(5, state.pipelineStep + direction));
      this.render();
      if (window.AudioFX) window.AudioFX.playClick();
    },

    setTokenHover: function (token) {
      state.activeTokenHover = token;
      this.applyTokenHighlight(token);
    },

    clearTokenHover: function () {
      state.activeTokenHover = null;
      this.clearTokenHighlight();
    },

    applyTokenHighlight: function (token) {
      const container = document.getElementById('viewWindowMatrix');
      if (!container) return;
      container.querySelectorAll('.wf-highlightable').forEach(el => {
        const matches = el.getAttribute('data-wf-token') === token;
        el.classList.toggle('wf-token-active-spring', matches);
        el.classList.toggle('wf-token-dimmed', !matches && token !== null);
      });
    },

    clearTokenHighlight: function () {
      const container = document.getElementById('viewWindowMatrix');
      if (!container) return;
      container.querySelectorAll('.wf-highlightable').forEach(el => {
        el.classList.remove('wf-token-active-spring');
        el.classList.remove('wf-token-dimmed');
      });
    },

    bindGlobalKeyboard: function () {
      if (this._keysBound) return;
      this._keysBound = true;

      window.addEventListener('keydown', (e) => {
        const view = document.getElementById('viewWindowMatrix');
        if (!view || !view.classList.contains('active')) return;

        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (e.key === '1') this.setMode('ranking');
        else if (e.key === '2') this.setMode('frame');
        else if (e.key === '3') this.setMode('offset');
        else if (e.key === '4') this.setMode('partition_vs_group');
        else if (e.key === 't' || e.key === 'T') this.toggleTies();
        else if (e.key === ' ') {
          e.preventDefault();
          this.toggleAutoPlay();
        } else if (e.key === '[' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const flatRows = getFlattenedRows(DATASETS[state.activeDatasetId], state.tiesEnabled);
          state.selectedRowIndex = Math.max(0, state.selectedRowIndex - 1);
          this.render();
        } else if (e.key === ']' || e.key === 'ArrowRight') {
          e.preventDefault();
          const flatRows = getFlattenedRows(DATASETS[state.activeDatasetId], state.tiesEnabled);
          state.selectedRowIndex = Math.min(flatRows.length - 1, state.selectedRowIndex + 1);
          this.render();
        }
      });
    },

    // --- HTML RENDER PIPELINE ---
    render: function () {
      const container = document.getElementById('viewWindowMatrix');
      if (!container) return;

      const dataset = DATASETS[state.activeDatasetId];
      const flatRows = getFlattenedRows(dataset, state.tiesEnabled);
      const partitions = getPartitions(dataset, state.tiesEnabled);
      const activeProblem = PROBLEMS[state.currentProblemIndex];

      // Safe clamp
      if (state.selectedRowIndex >= flatRows.length) state.selectedRowIndex = 0;
      const focusedRow = flatRows[state.selectedRowIndex] || flatRows[0];

      container.innerHTML = `
        <div class="wf-cockpit-wrapper">
          <!-- TOP HERO & NAVIGATION BAR -->
          ${this.renderTopBar(activeProblem)}

          <!-- INTERACTIVE QUERY BLUEPRINT -->
          ${this.renderQueryBlueprint(activeProblem)}

          <!-- MAIN DUAL-STAGE INTERACTIVE ARENA -->
          <div class="wf-main-arena-grid">
            <!-- LEFT STAGE: The Physical Partition Table & Interactive Vectors -->
            <div class="wf-stage-card wf-left-stage">
              ${this.renderLeftStageHeader(dataset, flatRows)}
              ${this.renderActiveModeStage(dataset, partitions, flatRows, focusedRow)}
            </div>

            <!-- RIGHT STAGE: HUD, Mathematical Dissection & Accumulator -->
            <div class="wf-stage-card wf-right-stage">
              ${this.renderRightStageHUD(dataset, partitions, flatRows, focusedRow)}
            </div>
          </div>

          <!-- PHYSICAL EXECUTION PIPELINE SIMULATOR (DRAWER / FOOTER) -->
          ${this.renderPipelineSimulatorBar(dataset)}
        </div>
      `;
    },

    renderTopBar: function (activeProblem) {
      return `
        <div class="wf-hero-banner">
          <div class="wf-hero-left">
            <div class="wf-badge-row">
              <span class="wf-badge wf-badge-day">DAY 11 &amp; 12</span>
              <span class="wf-badge wf-badge-engine">ANALYTICAL SQL ENGINE</span>
              <span class="wf-badge wf-badge-live">LIVE SPRING INTERACTION</span>
            </div>
            <h1 class="wf-hero-title">
              <span class="wf-hero-icon">🪟</span> Window Functions Cockpit
              <span class="wf-title-sub">Partitioning, Ranking Matrix, Sliding Frames &amp; Offsets</span>
            </h1>
          </div>

          <!-- 4-WAY INTERACTIVE MODE SWITCHER -->
          <div class="wf-mode-selector-pill-group">
            <button class="wf-mode-tab ${state.activeMode === 'ranking' ? 'active' : ''}" 
                    onclick="WindowFunctionsEngine.setMode('ranking')">
              <span class="wf-tab-emoji">🏆</span>
              <span class="wf-tab-text">1. Ranking Arena</span>
            </button>
            <button class="wf-mode-tab ${state.activeMode === 'frame' ? 'active' : ''}" 
                    onclick="WindowFunctionsEngine.setMode('frame')">
              <span class="wf-tab-emoji">🪟</span>
              <span class="wf-tab-text">2. Sliding Frame</span>
            </button>
            <button class="wf-mode-tab ${state.activeMode === 'offset' ? 'active' : ''}" 
                    onclick="WindowFunctionsEngine.setMode('offset')">
              <span class="wf-tab-emoji">🏹</span>
              <span class="wf-tab-text">3. Offset Tracer</span>
            </button>
            <button class="wf-mode-tab ${state.activeMode === 'partition_vs_group' ? 'active' : ''}" 
                    onclick="WindowFunctionsEngine.setMode('partition_vs_group')">
              <span class="wf-tab-emoji">⚖️</span>
              <span class="wf-tab-text">4. Group vs Partition</span>
            </button>
          </div>
        </div>

        <!-- PROBLEM CATALOG QUICK PICKER -->
        <div class="wf-problem-scroller-bar">
          <span class="wf-problem-label">🎯 FAANG Case Challenge:</span>
          <div class="wf-problem-pills-wrap">
            ${PROBLEMS.map((p, idx) => `
              <button class="wf-prob-btn ${state.currentProblemIndex === idx ? 'active' : ''}"
                      onclick="WindowFunctionsEngine.setProblem(${idx})">
                <span class="wf-prob-num">${p.id}</span>
                <span class="wf-prob-name">${p.title}</span>
                <span class="wf-tier-dot ${p.tier}"></span>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    },

    renderQueryBlueprint: function (problem) {
      return `
        <div class="wf-blueprint-box">
          <div class="wf-blueprint-header">
            <div class="wf-bp-title-wrap">
              <span class="wf-bp-dot"></span>
              <span class="wf-bp-title">Interactive Query Blueprint</span>
              <span class="wf-bp-hint">(Hover tokens to inspect physical execution on the live table below)</span>
            </div>
            <div class="wf-bp-actions">
              <span class="wf-kb-badge" title="Hotkeys active">⌨️ 1-4 Modes | [ ] Scrubber | Space Play | T Ties</span>
            </div>
          </div>
          <div class="wf-blueprint-code">
            ${this.highlightQueryTokens(problem.sql)}
          </div>
        </div>
      `;
    },

    highlightQueryTokens: function (sql) {
      let code = sql;
      // Wrap known tokens with interactive hover spans
      const tokens = [
        { key: 'partition', regex: /\b(PARTITION BY\s+[\w_]+)\b/gi, label: 'PARTITION BY', class: 'wf-tok-partition' },
        { key: 'orderby', regex: /\b(ORDER BY\s+[\w_\s]+(DESC|ASC))\b/gi, label: 'ORDER BY', class: 'wf-tok-orderby' },
        { key: 'dense_rank', regex: /\b(DENSE_RANK\(\))\b/gi, label: 'DENSE_RANK()', class: 'wf-tok-func' },
        { key: 'rank', regex: /\b(RANK\(\))\b/gi, label: 'RANK()', class: 'wf-tok-func' },
        { key: 'row_number', regex: /\b(ROW_NUMBER\(\))\b/gi, label: 'ROW_NUMBER()', class: 'wf-tok-func' },
        { key: 'sum_over', regex: /\b(SUM\([^)]+\))\b/gi, label: 'SUM()', class: 'wf-tok-func' },
        { key: 'avg_over', regex: /\b(AVG\([^)]+\))\b/gi, label: 'AVG()', class: 'wf-tok-func' },
        { key: 'lag', regex: /\b(LAG\([^)]+\))\b/gi, label: 'LAG()', class: 'wf-tok-func' },
        { key: 'rows_between', regex: /\b(ROWS BETWEEN\s+[^;]+ROW|ROWS BETWEEN\s+[^;]+FOLLOWING)\b/gi, label: 'FRAME', class: 'wf-tok-frame' },
        { key: 'qualify', regex: /\b(QUALIFY\s+[^;]+)\b/gi, label: 'QUALIFY', class: 'wf-tok-qualify' }
      ];

      tokens.forEach(t => {
        code = code.replace(t.regex, (match) => {
          return `<span class="wf-query-token ${t.class}" 
                        onmouseenter="WindowFunctionsEngine.setTokenHover('${t.key}')" 
                        onmouseleave="WindowFunctionsEngine.clearTokenHover()"
                        title="${t.label} token">${match}</span>`;
        });
      });

      return `<pre><code>${code}</code></pre>`;
    },

    renderLeftStageHeader: function (dataset, flatRows) {
      return `
        <div class="wf-stage-top-controls">
          <div class="wf-controls-left">
            <span class="wf-stage-badge">PHYSICAL STAGE</span>
            <span class="wf-dataset-title">${dataset.icon} ${dataset.name}</span>
            <span class="wf-row-count-badge">${flatRows.length} Rows</span>
          </div>
          <div class="wf-controls-right">
            ${state.activeMode === 'ranking' ? `
              <button class="wf-btn-pill ${state.tiesEnabled ? 'wf-active-amber' : ''}" 
                      onclick="WindowFunctionsEngine.toggleTies()" 
                      title="Toggle ties in salaries to observe RANK() skip gaps">
                <span>⚡ Ties in Data:</span>
                <strong>${state.tiesEnabled ? 'ON (Charlie & Bob tied)' : 'OFF (All distinct)'}</strong>
              </button>
            ` : ''}

            ${state.activeMode === 'frame' ? `
              <div class="wf-btn-pill-group">
                <button class="wf-frame-pill ${state.frameType === 'ROWS' ? 'active' : ''}"
                        onclick="WindowFunctionsEngine.setFrameType('ROWS')">ROWS (Physical)</button>
                <button class="wf-frame-pill ${state.frameType === 'RANGE' ? 'active-range' : ''}"
                        onclick="WindowFunctionsEngine.setFrameType('RANGE')"
                        title="Demonstrates the default RANGE tied-date inflation trap!">
                  RANGE (Logical ⚠️)
                </button>
              </div>
            ` : ''}

            ${state.activeMode === 'offset' ? `
              <div class="wf-btn-pill-group">
                <button class="wf-frame-pill ${state.offsetDirection === 'LAG' ? 'active' : ''}"
                        onclick="WindowFunctionsEngine.setOffsetDirection('LAG')">LAG (Look-Back)</button>
                <button class="wf-frame-pill ${state.offsetDirection === 'LEAD' ? 'active' : ''}"
                        onclick="WindowFunctionsEngine.setOffsetDirection('LEAD')">LEAD (Look-Ahead)</button>
                <select class="wf-offset-select" onchange="WindowFunctionsEngine.setOffsetK(this.value)">
                  <option value="1" ${state.offsetK === 1 ? 'selected' : ''}>Offset: k = 1</option>
                  <option value="2" ${state.offsetK === 2 ? 'selected' : ''}>Offset: k = 2</option>
                  <option value="3" ${state.offsetK === 3 ? 'selected' : ''}>Offset: k = 3</option>
                </select>
              </div>
            ` : ''}

            <!-- Scrubber Controller -->
            <button class="wf-btn-icon ${state.isAutoPlaying ? 'active-play' : ''}" 
                    onclick="WindowFunctionsEngine.toggleAutoPlay()" 
                    title="Spacebar to Auto-Slide Window Frame">
              ${state.isAutoPlaying ? '⏸️' : '▶️'}
            </button>
          </div>
        </div>
      `;
    },

    // --- MODE-SPECIFIC ACTIVE STAGE DISPATCH ---
    renderActiveModeStage: function (dataset, partitions, flatRows, focusedRow) {
      if (state.activeMode === 'ranking') {
        return this.renderRankingStage(dataset, partitions, focusedRow);
      } else if (state.activeMode === 'frame') {
        return this.renderFrameStage(dataset, partitions, focusedRow);
      } else if (state.activeMode === 'offset') {
        return this.renderOffsetStage(dataset, partitions, focusedRow);
      } else if (state.activeMode === 'partition_vs_group') {
        return this.renderPartitionVsGroupStage(dataset, partitions, flatRows);
      }
      return '';
    },

    // --- 1. RANKING ARENA STAGE ---
    renderRankingStage: function (dataset, partitions, focusedRow) {
      const partKeys = Object.keys(partitions);
      let globalRowCounter = 0;

      return `
        <div class="wf-ranking-stage-wrap">
          <div class="wf-stage-explainer-banner">
            <span class="wf-banner-icon">💡</span>
            <div class="wf-banner-text">
              <strong>The Big 4 Ranking Dissection:</strong>
              Compare how <code>ROW_NUMBER()</code>, <code>RANK()</code>, <code>DENSE_RANK()</code> and <code>NTILE(3)</code> handle ties.
              Notice rows with identical salaries (marked with <span class="wf-tie-chip">TIE</span>).
            </div>
          </div>

          <div class="wf-partitions-container">
            ${partKeys.map((pKey, pIdx) => {
              const rows = partitions[pKey];
              const pColors = ['#818cf8', '#34d399', '#f472b6', '#38bdf8'];
              const pColor = pColors[pIdx % pColors.length];

              return `
                <div class="wf-partition-lane wf-highlightable" data-wf-token="partition" style="--p-color: ${pColor}">
                  <div class="wf-partition-header">
                    <span class="wf-part-pill" style="background: ${pColor}20; color: ${pColor}; border-color: ${pColor}50;">
                      PARTITION BY ${dataset.partitionCol} = <strong>'${pKey}'</strong>
                    </span>
                    <span class="wf-part-meta">${rows.length} Employees</span>
                  </div>

                  <div class="wf-table-responsive">
                    <table class="wf-table wf-ranking-table">
                      <thead>
                        <tr>
                          <th style="width: 44px;">#</th>
                          <th>Employee</th>
                          <th>Title</th>
                          <th>Salary (ORDER BY)</th>
                          <th class="wf-col-hl wf-col-rn">ROW_NUMBER()</th>
                          <th class="wf-col-hl wf-col-rank">RANK()</th>
                          <th class="wf-col-hl wf-col-dense">DENSE_RANK()</th>
                          <th class="wf-col-hl wf-col-ntile">NTILE(3)</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${rows.map((row) => {
                          const thisIndex = globalRowCounter++;
                          const isFocused = thisIndex === state.selectedRowIndex;
                          const isTied = rows.filter(r => r[dataset.orderCol] === row[dataset.orderCol]).length > 1;
                          const hasGap = row._rank !== row._denseRank;

                          return `
                            <tr class="wf-row wf-clickable ${isFocused ? 'wf-focused-row' : ''} ${isTied ? 'wf-tied-row' : ''}"
                                onclick="WindowFunctionsEngine.selectRow(${thisIndex})">
                              <td class="wf-row-idx">${thisIndex + 1}</td>
                              <td class="wf-cell-name">
                                <strong>${row.name}</strong>
                                ${isTied ? '<span class="wf-tie-badge">TIE</span>' : ''}
                              </td>
                              <td class="wf-cell-title">${row.title}</td>
                              <td class="wf-cell-salary">
                                <span class="wf-salary-pill">$${row.salary.toLocaleString()}</span>
                              </td>
                              <td class="wf-col-hl wf-col-rn">
                                <span class="wf-rank-badge rn-badge">${row._rowNumber}</span>
                              </td>
                              <td class="wf-col-hl wf-col-rank">
                                <span class="wf-rank-badge rank-badge ${hasGap ? 'badge-gap' : ''}">
                                  ${row._rank}
                                  ${hasGap ? '<span class="wf-gap-indicator" title="Rank skipped due to ties ahead!">⚠️ GAP</span>' : ''}
                                </span>
                              </td>
                              <td class="wf-col-hl wf-col-dense">
                                <span class="wf-rank-badge dense-badge">${row._denseRank}</span>
                              </td>
                              <td class="wf-col-hl wf-col-ntile">
                                <span class="wf-rank-badge ntile-badge">B${row._ntile}</span>
                              </td>
                            </tr>
                          `;
                        }).join('')}
                      </tbody>
                    </table>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    },

    // --- 2. SLIDING FRAME APERTURE STAGE ---
    renderFrameStage: function (dataset, partitions, focusedRow) {
      const partKey = focusedRow[dataset.partitionCol];
      const partRows = partitions[partKey] || [];
      const rowInPartIdx = partRows.findIndex(r => r.id === focusedRow.id);

      // Compute physical frame aperture
      const frameInfo = computeActiveFrame(partRows, Math.max(0, rowInPartIdx), state.framePreset, state.frameType, dataset.orderCol);

      return `
        <div class="wf-frame-stage-wrap">
          <!-- Frame Preset Selector Bar -->
          <div class="wf-frame-controls-bar">
            <span class="wf-fctrl-title">🪟 Sliding Frame Clause:</span>
            <div class="wf-frame-presets">
              <button class="wf-fpreset-btn ${state.framePreset === 'running' ? 'active' : ''}"
                      onclick="WindowFunctionsEngine.setFramePreset('running')">
                <span>Cumulative Total</span>
                <code>UNBOUNDED PRECEDING AND CURRENT ROW</code>
              </button>
              <button class="wf-fpreset-btn ${state.framePreset === 'moving_avg' ? 'active' : ''}"
                      onclick="WindowFunctionsEngine.setFramePreset('moving_avg')">
                <span>3-Row Moving Window</span>
                <code>1 PRECEDING AND 1 FOLLOWING</code>
              </button>
              <button class="wf-fpreset-btn ${state.framePreset === 'remaining' ? 'active' : ''}"
                      onclick="WindowFunctionsEngine.setFramePreset('remaining')">
                <span>Reverse Backlog</span>
                <code>CURRENT ROW AND UNBOUNDED FOLLOWING</code>
              </button>
            </div>
          </div>

          <!-- Alert for RANGE tied-date inflation -->
          ${frameInfo.isRangeInflated ? `
            <div class="wf-alert-inflation">
              <span class="wf-alert-icon">⚠️</span>
              <div class="wf-alert-content">
                <strong>DEADLY INTERVIEW TRAP DETECTED: Default RANGE Cumulative Inflation!</strong>
                Because multiple rows on <code>${focusedRow.date}</code> share the exact same ORDER BY value,
                SQL's default <code>RANGE</code> treats all tied rows as belonging to CURRENT ROW simultaneously!
                Result: Cumulative sum inflates prematurely for all tied rows.
                <em>Solution: Always explicitly write <code>ROWS BETWEEN ...</code>!</em>
              </div>
            </div>
          ` : ''}

          <!-- Partition Frame Container -->
          <div class="wf-partition-lane" style="--p-color: #38bdf8;">
            <div class="wf-partition-header">
              <span class="wf-part-pill" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border-color: rgba(56, 189, 248, 0.4);">
                PARTITION: ${dataset.partitionCol} = <strong>'${partKey}'</strong>
              </span>
              <span class="wf-frame-aperture-badge">
                Aperture Frame: Rows [${frameInfo.startIdx + 1} to ${frameInfo.endIdx + 1}] (${frameInfo.capturedRows.length} Rows Captured)
              </span>
            </div>

            <div class="wf-table-responsive">
              <table class="wf-table wf-frame-table">
                <thead>
                  <tr>
                    <th style="width: 40px;">Frame</th>
                    <th style="width: 50px;">Row</th>
                    <th>Date</th>
                    <th>Orders</th>
                    <th>Amount ($)</th>
                    <th>Customer</th>
                    <th>Role in Frame</th>
                  </tr>
                </thead>
                <tbody>
                  ${partRows.map((r, pIdx) => {
                    const isInsideFrame = pIdx >= frameInfo.startIdx && pIdx <= frameInfo.endIdx;
                    const isCurrent = pIdx === rowInPartIdx;
                    const isStart = pIdx === frameInfo.startIdx;
                    const isEnd = pIdx === frameInfo.endIdx;

                    let frameRole = '';
                    if (isCurrent) frameRole = '🎯 CURRENT ROW';
                    else if (isInsideFrame && pIdx < rowInPartIdx) frameRole = `⬅️ ${rowInPartIdx - pIdx} PRECEDING`;
                    else if (isInsideFrame && pIdx > rowInPartIdx) frameRole = `➡️ ${pIdx - rowInPartIdx} FOLLOWING`;
                    else frameRole = '— (Outside Aperture)';

                    // Global index for selection
                    const flatRows = getFlattenedRows(dataset, state.tiesEnabled);
                    const globalIdx = flatRows.findIndex(row => row.id === r.id);

                    return `
                      <tr class="wf-row wf-clickable ${isInsideFrame ? 'wf-in-frame' : 'wf-out-frame'} ${isCurrent ? 'wf-current-row-highlight' : ''}"
                          onclick="WindowFunctionsEngine.selectRow(${globalIdx})">
                        <td class="wf-frame-bracket-cell">
                          ${isStart ? '<span class="wf-bracket-marker top">┌</span>' : ''}
                          ${isInsideFrame && !isStart && !isEnd ? '<span class="wf-bracket-marker mid">│</span>' : ''}
                          ${isEnd ? '<span class="wf-bracket-marker bottom">└</span>' : ''}
                        </td>
                        <td class="wf-row-idx">${pIdx + 1}</td>
                        <td class="wf-cell-date">
                          <strong>${r.date}</strong>
                        </td>
                        <td>${r.orders} orders</td>
                        <td class="wf-cell-amount">$${r.amount}</td>
                        <td class="wf-cell-cust">${r.customer}</td>
                        <td class="wf-cell-role">
                          <span class="wf-role-pill ${isCurrent ? 'role-current' : isInsideFrame ? 'role-in' : 'role-out'}">
                            ${frameRole}
                          </span>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    },

    // --- 3. OFFSET VECTOR TRACER (LAG/LEAD) STAGE ---
    renderOffsetStage: function (dataset, partitions, focusedRow) {
      const partKey = focusedRow[dataset.partitionCol];
      const partRows = partitions[partKey] || [];
      const rowInPartIdx = partRows.findIndex(r => r.id === focusedRow.id);

      const k = state.offsetK;
      const isLag = state.offsetDirection === 'LAG';
      const targetIdx = isLag ? rowInPartIdx - k : rowInPartIdx + k;
      const isOutOfBounds = targetIdx < 0 || targetIdx >= partRows.length;
      const targetRow = isOutOfBounds ? null : partRows[targetIdx];

      return `
        <div class="wf-offset-stage-wrap">
          <div class="wf-stage-explainer-banner">
            <span class="wf-banner-icon">🏹</span>
            <div class="wf-banner-text">
              <strong>Offset Navigation Vectors (${state.offsetDirection}):</strong>
              Peeking <code>${k} row${k > 1 ? 's' : ''}</code> ${isLag ? 'backward' : 'forward'} within <strong>${partKey}</strong>.
              ${isOutOfBounds 
                ? `<span class="wf-warn-pill">⚠️ BOUNDARY HIT: Peeking outside partition &rarr; Defaulting to <strong>${state.offsetDefaultValue}</strong></span>` 
                : `<span class="wf-success-pill">✨ Target Row Located: Row ${targetIdx + 1} (${targetRow.sessionTime})</span>`}
            </div>
          </div>

          <div class="wf-partition-lane" style="--p-color: #a78bfa;">
            <div class="wf-partition-header">
              <span class="wf-part-pill" style="background: rgba(167, 139, 250, 0.15); color: #a78bfa; border-color: rgba(167, 139, 250, 0.4);">
                PARTITION: ${dataset.partitionCol} = <strong>'${partKey}'</strong>
              </span>
              <span class="wf-offset-formula-badge">
                ${state.offsetDirection}(pageViews, ${k}, ${state.offsetDefaultValue}) OVER (ORDER BY sessionTime)
              </span>
            </div>

            <div class="wf-table-responsive">
              <table class="wf-table wf-offset-table">
                <thead>
                  <tr>
                    <th style="width: 50px;">Vector</th>
                    <th style="width: 44px;">#</th>
                    <th>Session Time</th>
                    <th>Page Views</th>
                    <th>Amount Spent</th>
                    <th>Action</th>
                    <th>${state.offsetDirection}(${k}) Result</th>
                    <th>Delta (&Delta;)</th>
                  </tr>
                </thead>
                <tbody>
                  ${partRows.map((r, pIdx) => {
                    const isCurrent = pIdx === rowInPartIdx;
                    const isTarget = pIdx === targetIdx;

                    // Calculate offset value for this specific row in the table
                    const thisTargetIdx = isLag ? pIdx - k : pIdx + k;
                    const thisOutOfBounds = thisTargetIdx < 0 || thisTargetIdx >= partRows.length;
                    const thisTargetRow = thisOutOfBounds ? null : partRows[thisTargetIdx];
                    const offsetVal = thisOutOfBounds ? state.offsetDefaultValue : thisTargetRow.pageViews;
                    const delta = thisOutOfBounds ? 0 : r.pageViews - thisTargetRow.pageViews;

                    const flatRows = getFlattenedRows(dataset, state.tiesEnabled);
                    const globalIdx = flatRows.findIndex(row => row.id === r.id);

                    return `
                      <tr class="wf-row wf-clickable ${isCurrent ? 'wf-offset-origin' : ''} ${isTarget ? 'wf-offset-target' : ''}"
                          onclick="WindowFunctionsEngine.selectRow(${globalIdx})">
                        <td class="wf-vector-icon-cell">
                          ${isCurrent ? '<span class="wf-vec-dot-start" title="Current Row (Look Origin)">●</span>' : ''}
                          ${isTarget ? '<span class="wf-vec-arrow-head" title="Target Row (Look Destination)">➔</span>' : ''}
                        </td>
                        <td class="wf-row-idx">${pIdx + 1}</td>
                        <td class="wf-cell-time"><code>${r.sessionTime}</code></td>
                        <td class="wf-cell-views"><strong>${r.pageViews} views</strong></td>
                        <td>$${r.spent}</td>
                        <td><span class="wf-action-tag">${r.action}</span></td>
                        <td class="wf-cell-offset-result">
                          <span class="wf-offset-res-pill ${thisOutOfBounds ? 'res-null' : 'res-ok'}">
                            ${thisOutOfBounds ? `${state.offsetDefaultValue} (Default)` : `${offsetVal} views`}
                          </span>
                        </td>
                        <td class="wf-cell-delta">
                          <span class="wf-delta-pill ${delta > 0 ? 'delta-pos' : delta < 0 ? 'delta-neg' : 'delta-zero'}">
                            ${delta > 0 ? `+${delta}` : delta}
                          </span>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    },

    // --- 4. GROUP BY VS PARTITION BY STAGE ---
    renderPartitionVsGroupStage: function (dataset, partitions, flatRows) {
      const partKeys = Object.keys(partitions);
      const isSalary = dataset.id === 'salaries';
      const valCol = isSalary ? 'salary' : dataset.id === 'revenue' ? 'amount' : 'pageViews';
      const labelCol = isSalary ? 'name' : dataset.id === 'revenue' ? 'customer' : 'user';
      const partCol = dataset.partitionCol;

      // Compute GROUP BY aggregations (N -> 1)
      const groupSummaries = partKeys.map(key => {
        const rows = partitions[key] || [];
        const total = rows.reduce((acc, r) => acc + (r[valCol] || 0), 0);
        const avg = Math.round(total / (rows.length || 1));
        const maxVal = rows.length ? Math.max(...rows.map(r => r[valCol] || 0)) : 0;
        return {
          groupKey: key,
          count: rows.length,
          avgVal: avg,
          maxVal: maxVal
        };
      });

      return `
        <div class="wf-split-topology-wrap">
          <div class="wf-topology-column wf-col-groupby">
            <div class="wf-topo-header">
              <span class="wf-topo-icon">💥</span>
              <div>
                <h3 class="wf-topo-title">GROUP BY ${partCol} (Collapsing)</h3>
                <span class="wf-topo-sub">Row Count Reduction: <strong>${flatRows.length} &rarr; ${groupSummaries.length}</strong> (Original Rows Destroyed)</span>
              </div>
            </div>

            <div class="wf-topo-table-wrap">
              <table class="wf-table">
                <thead>
                  <tr>
                    <th>${partCol.toUpperCase()}</th>
                    <th>Row Count</th>
                    <th>AVG(${valCol})</th>
                    <th>MAX(${valCol})</th>
                  </tr>
                </thead>
                <tbody>
                  ${groupSummaries.map(g => `
                    <tr class="wf-row wf-collapsed-row">
                      <td><strong>${g.groupKey}</strong></td>
                      <td><span class="wf-badge-count">${g.count} rows collapsed</span></td>
                      <td>${isSalary ? '$' : ''}${g.avgVal.toLocaleString()}</td>
                      <td>${isSalary ? '$' : ''}${g.maxVal.toLocaleString()}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <div class="wf-topo-loss-card">
              <span class="wf-loss-icon">⚠️</span>
              <div class="wf-loss-text">
                <strong>Individual Details Lost Forever:</strong>
                You can never see individual names, timestamps, or personal metric records here without an expensive self-join!
              </div>
            </div>
          </div>

          <div class="wf-topology-divider">
            <span class="wf-vs-pill">VS</span>
          </div>

          <div class="wf-topology-column wf-col-partition">
            <div class="wf-topo-header">
              <span class="wf-topo-icon">✨</span>
              <div>
                <h3 class="wf-topo-title">OVER (PARTITION BY ${partCol}) (Preserving)</h3>
                <span class="wf-topo-sub">Cardinality Preserved: <strong>${flatRows.length} &rarr; ${flatRows.length}</strong> (Enriched Side-by-Side)</span>
              </div>
            </div>

            <div class="wf-topo-table-wrap">
              <table class="wf-table">
                <thead>
                  <tr>
                    <th>Entity (${labelCol})</th>
                    <th>${partCol}</th>
                    <th>Individual Value</th>
                    <th>Partition Avg (Window)</th>
                    <th>Diff (&Delta;)</th>
                  </tr>
                </thead>
                <tbody>
                  ${flatRows.map(r => {
                    const rowPartVal = r[partCol] || 'All';
                    const deptSummary = groupSummaries.find(g => g.groupKey === rowPartVal) || { avgVal: 0 };
                    const rowVal = r[valCol] || 0;
                    const diff = rowVal - deptSummary.avgVal;
                    return `
                      <tr class="wf-row wf-preserved-row">
                        <td><strong>${r[labelCol] || r.id}</strong></td>
                        <td>${rowPartVal}</td>
                        <td class="wf-cell-salary">${isSalary ? '$' : ''}${rowVal.toLocaleString()}</td>
                        <td class="wf-cell-window-val">${isSalary ? '$' : ''}${deptSummary.avgVal.toLocaleString()}</td>
                        <td>
                          <span class="wf-delta-pill ${diff >= 0 ? 'delta-pos' : 'delta-neg'}">
                            ${diff >= 0 ? `+${isSalary ? '$' : ''}${diff.toLocaleString()}` : `-${isSalary ? '$' : ''}${Math.abs(diff).toLocaleString()}`}
                          </span>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>

            <div class="wf-topo-gain-card">
              <span class="wf-gain-icon">🎯</span>
              <div class="wf-gain-text">
                <strong>Maximum Relational Power:</strong>
                Every detail column sits comfortably alongside partition-level aggregations in a single database scan!
              </div>
            </div>
          </div>
        </div>
      `;
    },

    // --- RIGHT STAGE: HUD & ACCUMULATOR ---
    renderRightStageHUD: function (dataset, partitions, flatRows, focusedRow) {
      if (state.activeMode === 'ranking') {
        return this.renderRankingHUD(dataset, partitions, focusedRow);
      } else if (state.activeMode === 'frame') {
        return this.renderFrameHUD(dataset, partitions, focusedRow);
      } else if (state.activeMode === 'offset') {
        return this.renderOffsetHUD(dataset, partitions, focusedRow);
      } else if (state.activeMode === 'partition_vs_group') {
        return this.renderPartitionVsGroupHUD();
      }
      return '';
    },

    renderRankingHUD: function (dataset, partitions, focusedRow) {
      const partKey = focusedRow[dataset.partitionCol];
      const partRows = partitions[partKey] || [];
      const hasTie = partRows.filter(r => r[dataset.orderCol] === focusedRow[dataset.orderCol]).length > 1;

      return `
        <div class="wf-hud-container">
          <div class="wf-hud-card">
            <div class="wf-hud-card-header">
              <span class="wf-hud-dot green"></span>
              <h4>Focused Row Dossier</h4>
              <span class="wf-hud-tag">${focusedRow.name}</span>
            </div>

            <div class="wf-stat-grid">
              <div class="wf-stat-box">
                <span class="wf-sb-label">Department</span>
                <span class="wf-sb-val">${focusedRow.dept}</span>
              </div>
              <div class="wf-stat-box">
                <span class="wf-sb-label">Individual Salary</span>
                <span class="wf-sb-val text-emerald">$${focusedRow.salary.toLocaleString()}</span>
              </div>
              <div class="wf-stat-box">
                <span class="wf-sb-label">ROW_NUMBER()</span>
                <span class="wf-sb-val text-sky">${focusedRow._rowNumber}</span>
              </div>
              <div class="wf-stat-box">
                <span class="wf-sb-label">RANK()</span>
                <span class="wf-sb-val text-amber">${focusedRow._rank}</span>
              </div>
              <div class="wf-stat-box">
                <span class="wf-sb-label">DENSE_RANK()</span>
                <span class="wf-sb-val text-purple">${focusedRow._denseRank}</span>
              </div>
              <div class="wf-stat-box">
                <span class="wf-sb-label">NTILE(3) Bucket</span>
                <span class="wf-sb-val text-pink">Bucket #${focusedRow._ntile}</span>
              </div>
            </div>

            <div class="wf-hud-formula-card">
              <div class="wf-formula-title">Mathematical Dissection of Rankings:</div>
              <ul class="wf-formula-list">
                <li>
                  <strong>ROW_NUMBER() = ${focusedRow._rowNumber}</strong>:
                  Arbitrary sequential counter. Ignores identical salaries completely.
                </li>
                <li>
                  <strong>RANK() = ${focusedRow._rank}</strong>:
                  Strictly equal to <code>(Superior Rows Count + 1)</code>. 
                  ${hasTie ? '<span class="text-amber">⚠️ Tie detected! A gap will occur in subsequent rows.</span>' : 'Contiguous rank.'}
                </li>
                <li>
                  <strong>DENSE_RANK() = ${focusedRow._denseRank}</strong>:
                  Strictly equal to <code>(Distinct Superior Values + 1)</code>. No ranks are ever skipped!
                </li>
                <li>
                  <strong>NTILE(3) = Bucket ${focusedRow._ntile}</strong>:
                  Equi-depth distribution partition.
                </li>
              </ul>
            </div>
          </div>

          <!-- Interview Trap Secret -->
          <div class="wf-trap-card">
            <div class="wf-trap-header">
              <span class="wf-trap-badge">SENIOR FAANG SECRET</span>
              <span class="wf-trap-title">Why can't Window Functions go in WHERE?</span>
            </div>
            <p class="wf-trap-body">
              Query execution order: <code>FROM &rarr; WHERE &rarr; GROUP BY &rarr; HAVING &rarr; WINDOW EVALUATION &rarr; SELECT &rarr; QUALIFY</code>.
              When <code>WHERE</code> executes, window functions literally <strong>do not exist yet</strong> in memory! Always wrap in a CTE or use <code>QUALIFY</code>.
            </p>
          </div>
        </div>
      `;
    },

    renderFrameHUD: function (dataset, partitions, focusedRow) {
      const partKey = focusedRow[dataset.partitionCol];
      const partRows = partitions[partKey] || [];
      const rowInPartIdx = partRows.findIndex(r => r.id === focusedRow.id);
      const frameInfo = computeActiveFrame(partRows, Math.max(0, rowInPartIdx), state.framePreset, state.frameType, dataset.orderCol);

      // Running accumulation math
      const amounts = frameInfo.capturedRows.map(r => r.amount);
      const sum = amounts.reduce((a, b) => a + b, 0);
      const avg = (sum / (amounts.length || 1)).toFixed(2);
      const min = amounts.length ? Math.min(...amounts) : 0;
      const max = amounts.length ? Math.max(...amounts) : 0;

      return `
        <div class="wf-hud-container">
          <div class="wf-hud-card">
            <div class="wf-hud-card-header">
              <span class="wf-hud-dot blue"></span>
              <h4>Live Running Accumulator HUD</h4>
              <span class="wf-hud-tag">${state.frameType} Frame</span>
            </div>

            <div class="wf-accumulator-box">
              <div class="wf-acc-buffer">
                <span class="wf-acc-label">Active Memory Buffer Elements:</span>
                <div class="wf-acc-chips">
                  ${amounts.map(amt => `<span class="wf-acc-chip">$${amt}</span>`).join(' + ')}
                </div>
              </div>

              <div class="wf-stat-grid">
                <div class="wf-stat-box">
                  <span class="wf-sb-label">SUM(amount)</span>
                  <span class="wf-sb-val text-emerald">$${sum}</span>
                </div>
                <div class="wf-stat-box">
                  <span class="wf-sb-label">AVG(amount)</span>
                  <span class="wf-sb-val text-sky">$${avg}</span>
                </div>
                <div class="wf-stat-box">
                  <span class="wf-sb-label">COUNT(rows)</span>
                  <span class="wf-sb-val text-purple">${amounts.length}</span>
                </div>
                <div class="wf-stat-box">
                  <span class="wf-sb-label">MIN &hellip; MAX</span>
                  <span class="wf-sb-val text-amber">$${min} &hellip; $${max}</span>
                </div>
              </div>
            </div>

            <div class="wf-hud-formula-card">
              <div class="wf-formula-title">Active Aperture Syntax:</div>
              <code class="wf-code-inline">
                ${state.frameType} BETWEEN 
                ${state.framePreset === 'running' ? 'UNBOUNDED PRECEDING AND CURRENT ROW' :
                  state.framePreset === 'moving_avg' ? '1 PRECEDING AND 1 FOLLOWING' :
                  'CURRENT ROW AND UNBOUNDED FOLLOWING'}
              </code>
              <p style="font-size: 11px; color: var(--text-secondary); margin-top: 8px;">
                Physical scanner is evaluating row <strong>#${rowInPartIdx + 1} (${focusedRow.date})</strong>.
                As the engine moves forward, earlier rows are accumulated into the state vector.
              </p>
            </div>
          </div>

          <!-- RANGE vs ROWS Trap Card -->
          <div class="wf-trap-card">
            <div class="wf-trap-header">
              <span class="wf-trap-badge">CRITICAL GOTCHA</span>
              <span class="wf-trap-title">The Silent Default RANGE Trap</span>
            </div>
            <p class="wf-trap-body">
              If you omit the frame clause after <code>ORDER BY</code>, ANSI SQL defaults to:
              <code>RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code>.
              <strong>RANGE</strong> evaluates duplicates simultaneously, causing running totals to jump erratically on tied dates!
            </p>
          </div>
        </div>
      `;
    },

    renderOffsetHUD: function (dataset, partitions, focusedRow) {
      const partKey = focusedRow[dataset.partitionCol];
      const partRows = partitions[partKey] || [];
      const rowInPartIdx = partRows.findIndex(r => r.id === focusedRow.id);
      const k = state.offsetK;
      const isLag = state.offsetDirection === 'LAG';
      const targetIdx = isLag ? rowInPartIdx - k : rowInPartIdx + k;
      const isOutOfBounds = targetIdx < 0 || targetIdx >= partRows.length;
      const targetRow = isOutOfBounds ? null : partRows[targetIdx];

      return `
        <div class="wf-hud-container">
          <div class="wf-hud-card">
            <div class="wf-hud-card-header">
              <span class="wf-hud-dot purple"></span>
              <h4>Offset Vector Inspector</h4>
              <span class="wf-hud-tag">${state.offsetDirection}(k=${k})</span>
            </div>

            <div class="wf-stat-grid">
              <div class="wf-stat-box">
                <span class="wf-sb-label">Origin Row</span>
                <span class="wf-sb-val text-sky">Row #${rowInPartIdx + 1} (${focusedRow.sessionTime})</span>
              </div>
              <div class="wf-stat-box">
                <span class="wf-sb-label">Origin Page Views</span>
                <span class="wf-sb-val text-emerald">${focusedRow.pageViews} views</span>
              </div>
              <div class="wf-stat-box">
                <span class="wf-sb-label">Target Row</span>
                <span class="wf-sb-val ${isOutOfBounds ? 'text-amber' : 'text-purple'}">
                  ${isOutOfBounds ? 'OUT OF BOUNDS' : `Row #${targetIdx + 1} (${targetRow.sessionTime})`}
                </span>
              </div>
              <div class="wf-stat-box">
                <span class="wf-sb-label">Target Value</span>
                <span class="wf-sb-val ${isOutOfBounds ? 'text-amber' : 'text-emerald'}">
                  ${isOutOfBounds ? `${state.offsetDefaultValue} (Fallback)` : `${targetRow.pageViews} views`}
                </span>
              </div>
            </div>

            <div class="wf-hud-formula-card">
              <div class="wf-formula-title">Canonical MoM / Sequential Delta Formula:</div>
              <pre class="wf-formula-code"><code>&Delta; = Current - ${state.offsetDirection}(${k})
Growth % = (&Delta; / Target) &times; 100%</code></pre>
              <p style="font-size: 11px; color: var(--text-secondary); margin-top: 6px;">
                Before window functions, calculating this required an $O(N^2)$ self-join on <code>t1.id = t2.id - 1</code>.
                With <code>${state.offsetDirection}()</code>, the engine performs this in an optimal single-pass scan!
              </p>
            </div>
          </div>
        </div>
      `;
    },

    renderPartitionVsGroupHUD: function () {
      return `
        <div class="wf-hud-container">
          <div class="wf-hud-card">
            <div class="wf-hud-card-header">
              <span class="wf-hud-dot emerald"></span>
              <h4>Relational Topology Theorem</h4>
              <span class="wf-hud-tag">SQL:2003 Standard</span>
            </div>

            <div class="wf-topology-matrix-box">
              <div class="wf-matrix-row">
                <span class="wf-mat-title">Mathematical Dimension</span>
                <span class="wf-mat-left">GROUP BY (Aggregate)</span>
                <span class="wf-mat-right">OVER(PARTITION BY) (Window)</span>
              </div>
              <div class="wf-matrix-row">
                <span class="wf-mat-title">Row Cardinality</span>
                <span class="wf-mat-left text-amber">Many-to-One (N &rarr; 1)</span>
                <span class="wf-mat-right text-emerald">Many-to-Many (N &rarr; N)</span>
              </div>
              <div class="wf-matrix-row">
                <span class="wf-mat-title">Detail Visibility</span>
                <span class="wf-mat-left text-rose">Collapsed / Destroyed</span>
                <span class="wf-mat-right text-emerald">Preserved Side-by-Side</span>
              </div>
              <div class="wf-matrix-row">
                <span class="wf-mat-title">Filter Clause</span>
                <span class="wf-mat-left">HAVING</span>
                <span class="wf-mat-right">QUALIFY or CTE Subquery</span>
              </div>
            </div>
          </div>
        </div>
      `;
    },

    // --- 5. PHYSICAL EXECUTION PIPELINE SIMULATOR ---
    renderPipelineSimulatorBar: function (dataset) {
      const steps = [
        { num: 1, name: 'FROM & SCAN', desc: 'Scan raw rows from storage disk/buffer pool' },
        { num: 2, name: 'WHERE FILTER', desc: 'Filter individual rows by predicates (if any)' },
        { num: 3, name: 'HASH PARTITION', desc: 'Distribute rows into partition buckets in memory' },
        { num: 4, name: 'IN-PARTITION SORT', desc: 'Sort rows within each partition bucket by ORDER BY key' },
        { num: 5, name: 'WINDOW CALC', desc: 'Evaluate sliding frame aperture & compute window functions' },
        { num: 6, name: 'QUALIFY & SELECT', desc: 'Filter final window results & project columns' }
      ];

      return `
        <div class="wf-pipeline-drawer">
          <div class="wf-pipe-header">
            <div class="wf-pipe-title-wrap">
              <span class="wf-pipe-icon">⚙️</span>
              <span class="wf-pipe-title">Database Engine Internal Execution Pipeline</span>
              <span class="wf-pipe-step-badge">Step ${state.pipelineStep + 1} of 6</span>
            </div>
            <div class="wf-pipe-controls">
              <button class="wf-pipe-btn" onclick="WindowFunctionsEngine.stepPipeline(-1)" ${state.pipelineStep === 0 ? 'disabled' : ''}>&larr; Prev Step</button>
              <button class="wf-pipe-btn" onclick="WindowFunctionsEngine.stepPipeline(1)" ${state.pipelineStep === 5 ? 'disabled' : ''}>Next Step &rarr;</button>
            </div>
          </div>

          <div class="wf-pipe-steps-strip">
            ${steps.map((st, sIdx) => {
              const isActive = sIdx === state.pipelineStep;
              const isPast = sIdx < state.pipelineStep;
              return `
                <div class="wf-pipe-step-card ${isActive ? 'active' : isPast ? 'past' : ''}"
                     onclick="WindowFunctionsEngine.stepPipeline(${sIdx - state.pipelineStep})">
                  <div class="wf-step-num-pill">${st.num}</div>
                  <div class="wf-step-name">${st.name}</div>
                  <div class="wf-step-desc">${st.desc}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }
  };

  // Expose to window
  window.WindowFunctionsEngine = WindowFunctionsEngine;

})(window);
