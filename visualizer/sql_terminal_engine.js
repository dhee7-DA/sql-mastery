/**
 * SQL TERMINAL & WEBASSEMBLY QUERY ENGINE
 * In-browser SQLite 3.45.2 WASM Client-Side Execution Engine
 * Offline-capable, zero latency, full DDL/DML, Window Functions, CTEs,
 * and Visual EXPLAIN QUERY PLAN & Performance Optimizer.
 */

window.SqlTerminalEngine = (function() {
  'use strict';

  let SQL = null;
  let db = null;
  let isInitialized = false;
  let activeSidebarTab = 'tables'; // 'tables' | 'presets'
  let activeOutputTab = 'grid'; // 'grid' | 'plan' | 'advisor'
  let cachedTables = []; // [{ name, count, columns: [{ name, type, pk }] }]
  let currentResults = null;
  let currentPlan = null;
  let currentPlanAnalysis = null;
  let isInitializing = false;
  let userCustomIndexes = []; // ['idx_name', ...]
  let filterTerm = '';

  /**
   * Root DOM initialization
   */
  async function init() {
    if (isInitialized || isInitializing) return;
    isInitializing = true;
    const container = document.getElementById('viewSqlTerminal');
    if (!container) {
      isInitializing = false;
      return;
    }

    renderWorkbenchSkeleton(container);
    setupEventListeners();

    try {
      await loadSqliteWasm();
      seedDatabase();
      await inspectDatabaseSchema();
      renderSidebarContent();
      
      // Load preset 1 as default
      if (window.SQL_TERMINAL_DATA && window.SQL_TERMINAL_DATA.presets && window.SQL_TERMINAL_DATA.presets.length > 0) {
        loadPreset(window.SQL_TERMINAL_DATA.presets[0].id, false);
      }
      
      executeQuery();
      isInitialized = true;
    } catch (err) {
      console.error('Failed to initialize SQLite WASM:', err);
      showFatalError(err.message);
    } finally {
      isInitializing = false;
    }
  }

  /**
   * Load SQLite WebAssembly module
   */
  async function loadSqliteWasm() {
    if (db) return;
    updateStatus('running', 'Loading WebAssembly binary...');

    if (typeof window.initSqlJs !== 'function') {
      throw new Error('SQLite WASM loader (sql-wasm.js) is not present on window.');
    }

    SQL = await window.initSqlJs({
      locateFile: file => file
    });

    db = new SQL.Database();
    updateStatus('ready', 'SQLite 3.45.2 WASM Ready');
  }

  /**
   * Seed database with the 12 domain tables
   */
  function seedDatabase(force = false) {
    if (!db || !window.SQL_TERMINAL_DATA) return;
    if (!force) {
      try {
        const check = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name='fx_daily_rates';");
        if (check && check[0] && check[0].values.length > 0) {
          return;
        }
      } catch (e) {}
    }
    db.run(window.SQL_TERMINAL_DATA.seedSql);
    userCustomIndexes = [];
  }

  /**
   * Introspect tables and columns from SQLite metadata
   */
  async function inspectDatabaseSchema() {
    if (!db) return;
    try {
      const tablesRes = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name ASC;");
      cachedTables = [];
      if (tablesRes && tablesRes[0]) {
        const tableNames = tablesRes[0].values.map(row => row[0]);
        for (const tableName of tableNames) {
          const colRes = db.exec(`PRAGMA table_info(${tableName});`);
          const columns = colRes && colRes[0] ? colRes[0].values.map(c => ({
            cid: c[0],
            name: c[1],
            type: c[2] || 'TEXT',
            notnull: c[3],
            dflt: c[4],
            pk: c[5]
          })) : [];

          let count = 0;
          try {
            const countRes = db.exec(`SELECT COUNT(*) FROM ${tableName};`);
            if (countRes && countRes[0]) count = countRes[0].values[0][0];
          } catch (e) {
            count = 0;
          }

          cachedTables.push({ name: tableName, count, columns });
        }
      }

      // Also refresh active custom indexes
      const idxRes = db.exec("SELECT name FROM sqlite_master WHERE type='index' AND name LIKE 'idx_custom_%';");
      if (idxRes && idxRes[0]) {
        userCustomIndexes = idxRes[0].values.map(r => r[0]);
      }
    } catch (err) {
      console.error('Schema inspection error:', err);
    }
  }

  /**
   * Build UI HTML Shell
   */
  function renderWorkbenchSkeleton(container) {
    container.innerHTML = `
      <!-- 1. Hero Header Banner -->
      <div class="terminal-hero">
        <div class="terminal-hero-title-group">
          <div class="terminal-hero-icon">💻</div>
          <div>
            <h1 class="terminal-hero-title">
              In-Browser SQL Terminal
              <span class="terminal-wasm-pill"><span class="terminal-wasm-dot"></span> SQLite 3.45.2 WASM</span>
            </h1>
            <div class="terminal-hero-sub">
              Full client-side SQL engine with zero network latency, visual EXPLAIN execution plan tree, and automated index optimizer.
            </div>
          </div>
        </div>
        <div class="terminal-hero-stats">
          <div class="terminal-stat-chip"><strong>12</strong> Production Tables</div>
          <div class="terminal-stat-chip"><strong>100%</strong> Offline Engine</div>
          <div class="terminal-stat-chip"><strong>EXPLAIN</strong> Visual Optimizer</div>
        </div>
      </div>

      <!-- 2. Main Split Workbench -->
      <div class="terminal-workbench">
        <!-- Left: Schema & Presets Navigator -->
        <aside class="terminal-sidebar">
          <div class="terminal-sidebar-tabs">
            <button class="terminal-sidebar-tab active" id="tabTerminalTables" onclick="window.SqlTerminalEngine.setSidebarTab('tables')">
              <span>📋</span> Tables (<span id="sidebarTableCount">12</span>)
            </button>
            <button class="terminal-sidebar-tab" id="tabTerminalPresets" onclick="window.SqlTerminalEngine.setSidebarTab('presets')">
              <span>⚡</span> Presets (<span id="sidebarPresetCount">6</span>)
            </button>
          </div>
          <div class="terminal-sidebar-search">
            <input type="text" class="terminal-search-input" id="terminalSidebarSearch" placeholder="Filter tables or presets..." oninput="window.SqlTerminalEngine.handleSidebarSearch(this.value)">
          </div>
          <div class="terminal-sidebar-content" id="terminalSidebarList">
            <!-- Rendered dynamically -->
          </div>
        </aside>

        <!-- Right: Editor & Execution Grid -->
        <main class="terminal-main">
          <!-- Editor Card -->
          <div class="terminal-editor-card">
            <div class="terminal-toolbar">
              <div class="terminal-query-label">
                <span id="terminalCurrentQueryTitle">Custom Query Console</span>
              </div>
              <div class="terminal-toolbar-btns">
                <button class="terminal-btn" onclick="window.SqlTerminalEngine.formatSql()" title="Uppercase keywords and align">
                  ✨ Format
                </button>
                <button class="terminal-btn" onclick="window.SqlTerminalEngine.clearEditor()" title="Clear editor textarea">
                  🗑️ Clear
                </button>
                <button class="terminal-btn" onclick="window.SqlTerminalEngine.resetDatabase()" title="Restore 12 tables to original seed state">
                  🔄 Reset DB
                </button>
                <button class="terminal-btn terminal-btn-explain" id="btnTerminalExplain" onclick="window.SqlTerminalEngine.explainQueryPlan()" title="Generate visual execution plan (Alt+Enter)">
                  ⚡ Explain Plan (⌥⏎)
                </button>
                <button class="terminal-btn terminal-btn-primary" id="btnTerminalRun" onclick="window.SqlTerminalEngine.executeQuery()">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  Run Query (⌘⏎)
                </button>
              </div>
            </div>

            <!-- Code Editor Area -->
            <div class="terminal-editor-wrap">
              <div class="terminal-editor-gutters" id="terminalEditorGutters">1</div>
              <textarea 
                class="terminal-editor-textarea" 
                id="terminalEditorTextarea" 
                spellcheck="false" 
                placeholder="-- Write standard SQL here (SELECT, WITH CTE, WINDOW, JOIN, INSERT, UPDATE, CREATE)...
SELECT * FROM internal_trade_blotter LIMIT 10;"
              ></textarea>
            </div>

            <!-- Execution Status Strip -->
            <div class="terminal-status-strip">
              <div class="terminal-status-indicator">
                <span class="terminal-status-dot" id="terminalStatusDot"></span>
                <span id="terminalStatusText">READY</span>
              </div>
              <div class="terminal-status-meta">
                <span>Rows: <strong id="terminalStatRows">-</strong></span>
                <span>Time: <strong id="terminalStatTime">-</strong></span>
                <span>Engine: <strong>WASM Memory</strong></span>
              </div>
            </div>
          </div>

          <!-- Bloop Co-Pilot Hint Strip -->
          <div class="terminal-bloop-banner" id="terminalBloopBanner">
            <div class="terminal-bloop-avatar">🐡</div>
            <div class="terminal-bloop-text" id="terminalBloopText">
              <strong>Sir Bloop Co-Pilot:</strong> Ready to crunch records! Press <code>Cmd+Enter</code> to execute, or <code>Alt+Enter</code> to analyze the query execution plan.
            </div>
          </div>

          <!-- Results & Optimizer Card -->
          <div class="terminal-results-card">
            <!-- Output Sub-Navigation Tabs -->
            <div class="terminal-output-tabs">
              <button class="terminal-output-tab active" id="tabOutputGrid" onclick="window.SqlTerminalEngine.setOutputTab('grid')">
                <span>📊</span> Results Grid
              </button>
              <button class="terminal-output-tab" id="tabOutputPlan" onclick="window.SqlTerminalEngine.setOutputTab('plan')">
                <span>⚡</span> Execution Plan Tree (<span id="planOpCount">0</span> ops)
              </button>
              <button class="terminal-output-tab" id="tabOutputAdvisor" onclick="window.SqlTerminalEngine.setOutputTab('advisor')">
                <span>💡</span> Index &amp; Cost Advisor (<span id="planScoreBadge">100/100</span>)
              </button>
            </div>

            <!-- Pane 1: Results Grid -->
            <div id="paneOutputGrid">
              <div class="terminal-results-header">
                <div class="terminal-results-title">
                  <span>📊 Query Output</span>
                  <span class="terminal-table-badge" id="terminalResultsBadge">0 rows</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <input 
                    type="text" 
                    class="terminal-results-filter-input" 
                    id="terminalResultsFilter" 
                    placeholder="Filter results..." 
                    oninput="window.SqlTerminalEngine.filterResults(this.value)"
                  >
                  <button class="terminal-btn" onclick="window.SqlTerminalEngine.exportCsv()" id="btnTerminalExport" title="Export as CSV file">
                    📥 Export CSV
                  </button>
                </div>
              </div>

              <div class="terminal-results-table-wrap" id="terminalResultsWrap">
                <div class="terminal-empty-state">
                  <div class="terminal-empty-icon">⚡</div>
                  <div>Run a query or pick a preset from the sidebar to inspect records.</div>
                </div>
              </div>
            </div>

            <!-- Pane 2: Execution Plan Tree -->
            <div id="paneOutputPlan" style="display: none;">
              <!-- Scorecard Header -->
              <div class="terminal-plan-header" id="terminalPlanHeader">
                <div class="terminal-plan-score-group">
                  <div class="terminal-plan-gauge score-optimal" id="planGauge">
                    <span id="planGaugeVal">100</span>
                  </div>
                  <div class="terminal-plan-score-meta">
                    <h4 id="planScoreGrade">Plan Health: 100/100 (Optimal)</h4>
                    <p id="planScoreSummary">Zero full table scans. All predicates covered by binary index lookups.</p>
                  </div>
                </div>
                <div class="terminal-plan-chips" id="planChips">
                  <div class="terminal-plan-chip chip-scan">0 Scans</div>
                  <div class="terminal-plan-chip chip-index">0 Index Searches</div>
                  <div class="terminal-plan-chip chip-btree">0 Temp B-Trees</div>
                </div>
              </div>

              <!-- Hierarchical Nodes Tree -->
              <div class="terminal-plan-tree" id="terminalPlanTree">
                <div class="terminal-empty-state">
                  <div class="terminal-empty-icon">⚡</div>
                  <div>Click <strong>Explain Plan (⌥⏎)</strong> to inspect SQLite's physical execution plan.</div>
                </div>
              </div>
            </div>

            <!-- Pane 3: Index & Cost Advisor -->
            <div id="paneOutputAdvisor" style="display: none;">
              <div class="terminal-advisor-pane" id="terminalAdvisorContent">
                <!-- Dynamically populated by renderAdvisor -->
              </div>
            </div>

          </div>
        </main>
      </div>
    `;
  }

  /**
   * Set up keyboard shortcuts and textarea sync
   */
  function setupEventListeners() {
    const textarea = document.getElementById('terminalEditorTextarea');
    const gutters = document.getElementById('terminalEditorGutters');

    if (textarea) {
      textarea.addEventListener('input', () => updateGutters(textarea, gutters));
      textarea.addEventListener('scroll', () => {
        if (gutters) gutters.scrollTop = textarea.scrollTop;
      });

      textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          e.preventDefault();
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          textarea.value = textarea.value.substring(0, start) + '  ' + textarea.value.substring(end);
          textarea.selectionStart = textarea.selectionEnd = start + 2;
          updateGutters(textarea, gutters);
        }

        // Cmd+Enter or Ctrl+Enter to execute query
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          e.preventDefault();
          executeQuery();
        }

        // Alt+Enter or Option+Enter to explain query plan
        if (e.altKey && e.key === 'Enter') {
          e.preventDefault();
          explainQueryPlan();
        }
      });
    }
  }

  function updateGutters(textarea, gutters) {
    if (!textarea || !gutters) return;
    const lines = (textarea.value.match(/\n/g) || []).length + 1;
    let gutterHtml = '';
    for (let i = 1; i <= lines; i++) {
      gutterHtml += i + '<br>';
    }
    gutters.innerHTML = gutterHtml;
  }

  /**
   * Output Tab Switcher
   */
  function setOutputTab(tab) {
    activeOutputTab = tab;
    ['tabOutputGrid', 'tabOutputPlan', 'tabOutputAdvisor'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('active');
    });
    ['paneOutputGrid', 'paneOutputPlan', 'paneOutputAdvisor'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });

    if (tab === 'grid') {
      const btn = document.getElementById('tabOutputGrid');
      const pane = document.getElementById('paneOutputGrid');
      if (btn) btn.classList.add('active');
      if (pane) pane.style.display = 'block';
    } else if (tab === 'plan') {
      const btn = document.getElementById('tabOutputPlan');
      const pane = document.getElementById('paneOutputPlan');
      if (btn) btn.classList.add('active');
      if (pane) pane.style.display = 'block';
    } else if (tab === 'advisor') {
      const btn = document.getElementById('tabOutputAdvisor');
      const pane = document.getElementById('paneOutputAdvisor');
      if (btn) btn.classList.add('active');
      if (pane) pane.style.display = 'block';
    }
  }

  /**
   * Render left sidebar content according to active tab
   */
  function renderSidebarContent(searchQuery = '') {
    const listEl = document.getElementById('terminalSidebarList');
    if (!listEl) return;

    const query = searchQuery.trim().toLowerCase();

    if (activeSidebarTab === 'tables') {
      const filtered = cachedTables.filter(t => !query || t.name.toLowerCase().includes(query));
      if (filtered.length === 0) {
        listEl.innerHTML = `<div style="padding:1.5rem; text-align:center; color:#64748b; font-size:0.8rem;">No tables match "${escapeHtml(query)}"</div>`;
        return;
      }

      listEl.innerHTML = filtered.map(t => `
        <div class="terminal-table-card" id="card_tbl_${t.name}">
          <div class="terminal-table-header" onclick="window.SqlTerminalEngine.toggleTableCard('${t.name}')">
            <span class="terminal-table-title">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18"/></svg>
              ${escapeHtml(t.name)}
            </span>
            <div class="terminal-table-actions">
              <span class="terminal-table-badge">${t.count} rows</span>
              <button class="terminal-btn-peek" onclick="event.stopPropagation(); window.SqlTerminalEngine.peekTable('${t.name}')" title="SELECT * FROM ${t.name} LIMIT 25">
                Peek
              </button>
            </div>
          </div>
          <div class="terminal-columns-list">
            ${t.columns.map(c => `
              <div class="terminal-col-row">
                <span class="terminal-col-name">${c.pk ? '🔑 ' : ''}${escapeHtml(c.name)}</span>
                <span class="terminal-col-type">${escapeHtml(c.type)}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('');
    } else {
      const presets = (window.SQL_TERMINAL_DATA && window.SQL_TERMINAL_DATA.presets) || [];
      const filtered = presets.filter(p => 
        !query || 
        p.title.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );

      if (filtered.length === 0) {
        listEl.innerHTML = `<div style="padding:1.5rem; text-align:center; color:#64748b; font-size:0.8rem;">No presets match "${escapeHtml(query)}"</div>`;
        return;
      }

      listEl.innerHTML = filtered.map(p => `
        <div class="terminal-preset-card" onclick="window.SqlTerminalEngine.loadPreset('${p.id}')">
          <div class="terminal-preset-header">
            <span class="terminal-preset-cat">${escapeHtml(p.category)}</span>
            <span style="font-size:0.72rem; color:#64748b;">Preset</span>
          </div>
          <div class="terminal-preset-title">${escapeHtml(p.title)}</div>
          <div class="terminal-preset-desc">${escapeHtml(p.description)}</div>
        </div>
      `).join('');
    }
  }

  function setSidebarTab(tab) {
    activeSidebarTab = tab;
    document.querySelectorAll('.terminal-sidebar-tab').forEach(b => b.classList.remove('active'));
    if (tab === 'tables') {
      const btn = document.getElementById('tabTerminalTables');
      if (btn) btn.classList.add('active');
    } else {
      const btn = document.getElementById('tabTerminalPresets');
      if (btn) btn.classList.add('active');
    }
    const searchInput = document.getElementById('terminalSidebarSearch');
    const q = searchInput ? searchInput.value : '';
    renderSidebarContent(q);
  }

  function handleSidebarSearch(query) {
    renderSidebarContent(query);
  }

  function toggleTableCard(tableName) {
    const card = document.getElementById('card_tbl_' + tableName);
    if (card) {
      card.classList.toggle('expanded');
    }
  }

  function peekTable(tableName) {
    const sql = `SELECT * FROM ${tableName} LIMIT 25;`;
    setEditorSql(sql, `Peek Table: ${tableName}`);
    executeQuery();
  }

  function loadPreset(presetId, autoRun = true) {
    const presets = (window.SQL_TERMINAL_DATA && window.SQL_TERMINAL_DATA.presets) || [];
    const p = presets.find(item => item.id === presetId);
    if (!p) return;

    setEditorSql(p.sql, `${p.category}: ${p.title}`);
    if (autoRun) {
      executeQuery();
      if (window.soundFX && typeof window.soundFX.playClick === 'function') {
        window.soundFX.playClick();
      }
    }
  }

  function setEditorSql(sql, title) {
    const textarea = document.getElementById('terminalEditorTextarea');
    const titleEl = document.getElementById('terminalCurrentQueryTitle');
    const gutters = document.getElementById('terminalEditorGutters');

    if (textarea) {
      textarea.value = sql;
      updateGutters(textarea, gutters);
    }
    if (titleEl && title) {
      titleEl.textContent = title;
    }
  }

  /**
   * Execute current SQL in textarea
   */
  function executeQuery() {
    const textarea = document.getElementById('terminalEditorTextarea');
    if (!textarea || !db) return;

    const sql = textarea.value.trim();
    if (!sql) {
      updateStatus('ready', 'Editor is empty');
      return;
    }

    updateStatus('running', 'Executing SQL in WASM...');
    const startTime = performance.now();

    try {
      const results = db.exec(sql);
      const durationMs = (performance.now() - startTime).toFixed(1);

      if (results && results.length > 0) {
        const activeResult = results[results.length - 1];
        currentResults = activeResult;
        filterTerm = '';

        const filterInput = document.getElementById('terminalResultsFilter');
        if (filterInput) filterInput.value = '';

        updateStatus('success', `Returned ${activeResult.values.length} rows in ${durationMs}ms`);
        updateStats(activeResult.values.length, `${durationMs}ms`);
        renderResultsTable(activeResult);
        setOutputTab('grid');

        // Sir Bloop commentary
        setBloopMessage(generateSuccessCommentary(sql, activeResult.values.length, durationMs), 'happy');

        if (window.soundFX && typeof window.soundFX.playSuccess === 'function') {
          window.soundFX.playSuccess();
        }
      } else {
        currentResults = null;
        updateStatus('success', `Query OK. Executed in ${durationMs}ms`);
        updateStats(0, `${durationMs}ms`);
        renderDmlSuccess(durationMs);
        setOutputTab('grid');
        inspectDatabaseSchema().then(() => renderSidebarContent());

        setBloopMessage(`✅ Statement executed cleanly in ${durationMs}ms! Schema state updated.`, 'celebrate');
      }
    } catch (err) {
      const durationMs = (performance.now() - startTime).toFixed(1);
      currentResults = null;
      updateStatus('error', 'Execution Error');
      updateStats(0, `${durationMs}ms`);
      renderErrorCard(err.message);
      setOutputTab('grid');

      setBloopMessage(generateErrorDiagnostic(err.message, sql), 'thinking');

      if (window.soundFX && typeof window.soundFX.playError === 'function') {
        window.soundFX.playError();
      }
    }
  }

  /**
   * EXPLAIN QUERY PLAN Execution & Analysis
   */
  function explainQueryPlan() {
    const textarea = document.getElementById('terminalEditorTextarea');
    if (!textarea || !db) return;

    let sql = textarea.value.trim();
    if (!sql) {
      updateStatus('ready', 'Editor is empty');
      return;
    }

    // Clean any leading EXPLAIN prefix if present
    sql = sql.replace(/^EXPLAIN\s+QUERY\s+PLAN\s+/i, '').replace(/^EXPLAIN\s+/i, '');

    updateStatus('running', 'Generating Execution Plan...');
    const startTime = performance.now();

    try {
      const planRes = db.exec("EXPLAIN QUERY PLAN " + sql);
      const durationMs = (performance.now() - startTime).toFixed(1);

      if (planRes && planRes[0]) {
        currentPlan = planRes[0].values;
        updateStatus('success', `Plan ready in ${durationMs}ms (${currentPlan.length} operations)`);

        const analysis = analyzePlan(currentPlan, sql);
        currentPlanAnalysis = analysis;

        // Render Tree & Advisor
        renderPlanTree(analysis);
        renderAdvisor(analysis);

        // Update Badge counters
        const opCountEl = document.getElementById('planOpCount');
        const scoreBadgeEl = document.getElementById('planScoreBadge');
        if (opCountEl) opCountEl.textContent = currentPlan.length;
        if (scoreBadgeEl) scoreBadgeEl.textContent = `${analysis.healthScore}/100`;

        setOutputTab('plan');
        setBloopMessage(analysis.bloopAdvice, analysis.bloopMood);

        if (window.soundFX && typeof window.soundFX.playSuccess === 'function') {
          window.soundFX.playSuccess();
        }
      } else {
        throw new Error('SQLite did not produce a query plan for this statement.');
      }
    } catch (err) {
      const durationMs = (performance.now() - startTime).toFixed(1);
      updateStatus('error', 'Plan Error');
      renderPlanError(err.message);
      setOutputTab('plan');
      setBloopMessage(`⚠️ Could not generate execution plan: ${err.message}`, 'thinking');

      if (window.soundFX && typeof window.soundFX.playError === 'function') {
        window.soundFX.playError();
      }
    }
  }

  /**
   * Plan AST Analysis & Health Scoring
   */
  function analyzePlan(rows, originalSql) {
    let healthScore = 100;
    let scanCount = 0;
    let indexCount = 0;
    let btreeCount = 0;
    let autoIndexCount = 0;
    const recommendations = [];
    const scannedTables = new Set();

    const parsedNodes = rows.map((r, idx) => {
      const id = r[0];
      const parent = r[1];
      const detail = r[3] || '';
      const detailUpper = detail.toUpperCase();

      let opType = 'UNKNOWN';
      let badgeClass = 'op-subquery';
      let complexity = 'O(N)';
      let impactText = '';

      if (detailUpper.includes('SCAN')) {
        opType = 'FULL TABLE SCAN';
        badgeClass = 'op-scan';
        complexity = 'O(N)';
        scanCount++;
        healthScore -= 25;
        impactText = 'Full scan through every page in the table. High I/O overhead.';

        const matchTable = detail.match(/SCAN\s+([a-zA-Z0-9_]+)/i);
        if (matchTable && matchTable[1]) {
          scannedTables.add(matchTable[1]);
        }
      } else if (detailUpper.includes('SEARCH') && detailUpper.includes('USING INDEX')) {
        opType = 'INDEX LOOKUP';
        badgeClass = 'op-index';
        complexity = 'O(log N)';
        indexCount++;
        healthScore += 5;
        impactText = 'Direct binary tree probe via B-Tree index. Optimal performance.';
      } else if (detailUpper.includes('SEARCH') && detailUpper.includes('USING AUTOMATIC')) {
        opType = 'AUTO INDEX';
        badgeClass = 'op-autoindex';
        complexity = 'O(N log N) build';
        autoIndexCount++;
        healthScore -= 15;
        impactText = 'SQLite dynamically built a temporary in-memory index on the fly.';
      } else if (detailUpper.includes('USE TEMP B-TREE')) {
        opType = 'TEMP B-TREE';
        badgeClass = 'op-btree';
        complexity = 'O(N log N)';
        btreeCount++;
        healthScore -= 15;
        impactText = 'Materialized sort or group buffer in memory.';
      } else if (detailUpper.includes('CO-ROUTINE') || detailUpper.includes('SUBQUERY')) {
        opType = 'CO-ROUTINE';
        badgeClass = 'op-subquery';
        complexity = 'O(N)';
        impactText = 'Materialized subquery execution pipeline.';
      } else if (detailUpper.includes('COMPOUND')) {
        opType = 'COMPOUND MERGE';
        badgeClass = 'op-compound';
        complexity = 'O(N)';
        impactText = 'Relational set union/intersection merger.';
      } else {
        opType = 'RELATIONAL OP';
        badgeClass = 'op-subquery';
        complexity = 'O(1)';
        impactText = 'Pipeline data flow node.';
      }

      return {
        id,
        parent,
        detail,
        opType,
        badgeClass,
        complexity,
        impactText,
        depth: parent === 0 ? 0 : 1
      };
    });

    healthScore = Math.max(10, Math.min(100, healthScore));

    // Automated index suggestions
    if (scannedTables.size > 0) {
      scannedTables.forEach(tableName => {
        // Find matching columns from WHERE or ON clause
        const tableObj = cachedTables.find(t => t.name.toLowerCase() === tableName.toLowerCase());
        const candidates = [];
        if (tableObj && tableObj.columns) {
          tableObj.columns.forEach(col => {
            const reg = new RegExp(`\\b${col.name}\\b`, 'i');
            if (reg.test(originalSql) && !col.pk) {
              candidates.push(col.name);
            }
          });
        }

        const colsToUse = candidates.slice(0, 2);
        const indexCols = colsToUse.length > 0 ? colsToUse.join(', ') : 'id';
        const indexName = `idx_custom_${tableName}_${colsToUse.join('_') || 'scan'}`;

        recommendations.push({
          targetTable: tableName,
          reason: `Eliminate full table scan on <code>${escapeHtml(tableName)}</code>`,
          sql: `CREATE INDEX IF NOT EXISTS ${indexName} ON ${tableName}(${indexCols});`,
          indexName
        });
      });
    }

    if (btreeCount > 0 && originalSql.toUpperCase().includes('ORDER BY')) {
      recommendations.push({
        targetTable: 'Sorting Optimization',
        reason: 'Eliminate temporary B-Tree sort buffer by providing pre-sorted index order',
        sql: `-- Tip: append the ORDER BY column to your existing WHERE index!`,
        indexName: null
      });
    }

    // Co-Pilot Advice
    let bloopAdvice = '';
    let bloopMood = 'happy';

    if (healthScore >= 90) {
      bloopAdvice = `⚡ <strong>Pristine Execution Plan (Score: ${healthScore}/100)!</strong> All table lookups utilize indexed B-Trees with zero unindexed table scans.`;
      bloopMood = 'celebrate';
    } else if (healthScore >= 70) {
      bloopAdvice = `💡 <strong>Good Execution Plan (Score: ${healthScore}/100):</strong> Fast execution, but has ${btreeCount > 0 ? 'an in-memory sort buffer' : 'some table scan overhead'}. Check the <strong>Index Advisor</strong> tab for 1-click speedups!`;
      bloopMood = 'happy';
    } else {
      bloopAdvice = `🚨 <strong>Performance Alert (Score: ${healthScore}/100):</strong> Detected ${scanCount} Full Table Scan(s)! Switch to the <strong>Index &amp; Cost Advisor</strong> tab and click <em>Apply Index</em> to eliminate the bottleneck!`;
      bloopMood = 'thinking';
    }

    return {
      nodes: parsedNodes,
      healthScore,
      scanCount,
      indexCount,
      btreeCount,
      autoIndexCount,
      recommendations,
      bloopAdvice,
      bloopMood
    };
  }

  /**
   * Render Execution Plan Tree
   */
  function renderPlanTree(analysis) {
    const treeEl = document.getElementById('terminalPlanTree');
    const gaugeEl = document.getElementById('planGauge');
    const gaugeValEl = document.getElementById('planGaugeVal');
    const scoreGradeEl = document.getElementById('planScoreGrade');
    const scoreSummaryEl = document.getElementById('planScoreSummary');
    const chipsEl = document.getElementById('planChips');

    if (!treeEl) return;

    // Update Scorecard
    if (gaugeValEl) gaugeValEl.textContent = analysis.healthScore;
    if (gaugeEl) {
      gaugeEl.className = 'terminal-plan-gauge ' + (
        analysis.healthScore >= 85 ? 'score-optimal' :
        analysis.healthScore >= 65 ? 'score-warning' : 'score-danger'
      );
    }

    if (scoreGradeEl) {
      scoreGradeEl.textContent = `Plan Health: ${analysis.healthScore}/100 (${
        analysis.healthScore >= 85 ? 'Grade A: Optimal' :
        analysis.healthScore >= 65 ? 'Grade B: Moderate' : 'Grade C: Scan Heavy'
      })`;
    }

    if (scoreSummaryEl) {
      scoreSummaryEl.textContent = analysis.healthScore >= 85
        ? 'Fully covered by binary indexed probes. Zero table scans or memory bottlenecks.'
        : `Identified ${analysis.scanCount} full table scan(s) and ${analysis.btreeCount} sort buffer(s).`;
    }

    if (chipsEl) {
      chipsEl.innerHTML = `
        <div class="terminal-plan-chip chip-scan">${analysis.scanCount} Full Scans</div>
        <div class="terminal-plan-chip chip-index">${analysis.indexCount} Index Searches</div>
        <div class="terminal-plan-chip chip-btree">${analysis.btreeCount} Temp B-Trees</div>
      `;
    }

    // Render Nodes
    treeEl.innerHTML = analysis.nodes.map(node => `
      <div class="terminal-plan-node" style="margin-left: ${node.depth * 28}px;">
        <span class="terminal-node-badge ${node.badgeClass}">${node.opType}</span>
        <div class="terminal-node-body">
          <div class="terminal-node-detail">
            ${node.depth > 0 ? '<span style="color:#64748b;">└── </span>' : ''}
            ${highlightPlanDetail(node.detail)}
          </div>
          <div class="terminal-node-meta">
            <span class="terminal-complexity-pill">${node.complexity}</span>
            <span>${node.impactText}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  function highlightPlanDetail(detail) {
    return escapeHtml(detail)
      .replace(/\b(SCAN|SEARCH|USING INDEX|USING AUTOMATIC COVERING INDEX|USE TEMP B-TREE)\b/g, '<strong style="color:#38bdf8;">$1</strong>')
      .replace(/\b(ORDER BY|GROUP BY)\b/g, '<span style="color:#c084fc;">$1</span>');
  }

  /**
   * Render Index & Cost Advisor Pane
   */
  function renderAdvisor(analysis) {
    const advisorContent = document.getElementById('terminalAdvisorContent');
    if (!advisorContent) return;

    let html = `
      <div class="terminal-advice-card">
        <div class="terminal-advice-header">
          <div class="terminal-advice-title">
            <span>⚡ Automated Physical Index Optimizer</span>
          </div>
          <span class="terminal-table-badge">WASM Memory Engine</span>
        </div>
        <div class="terminal-advice-desc">
          The engine analyzed your relational predicates, foreign key joins, and ordering clauses. 
          Apply suggested indexes directly into your running SQLite WASM database to watch your execution plan transform in real-time.
        </div>
      </div>
    `;

    if (analysis.recommendations.length === 0) {
      html += `
        <div class="terminal-advice-card" style="border-color: rgba(16, 185, 129, 0.3); background: rgba(16, 185, 129, 0.04);">
          <div class="terminal-advice-title" style="color: #34d399;">
            ✅ Zero Index Recommendations Needed!
          </div>
          <div class="terminal-advice-desc">
            Your query is already executing at maximum efficiency using primary keys and existing indexes.
          </div>
        </div>
      `;
    } else {
      analysis.recommendations.forEach(rec => {
        html += `
          <div class="terminal-advice-card">
            <div class="terminal-advice-header">
              <div class="terminal-advice-title">
                <span>🎯 Target: ${escapeHtml(rec.targetTable)}</span>
              </div>
              ${rec.indexName ? `
                <button class="terminal-btn-apply-index" onclick="window.SqlTerminalEngine.applySuggestedIndex('${escapeHtml(rec.sql)}', '${rec.indexName}')">
                  ⚡ 1-Click Apply Index
                </button>
              ` : ''}
            </div>
            <div class="terminal-advice-desc">${rec.reason}</div>
            <div class="terminal-sql-codeblock">
              <code>${escapeHtml(rec.sql)}</code>
            </div>
          </div>
        `;
      });
    }

    // Active Custom User Indexes section
    if (userCustomIndexes.length > 0) {
      html += `
        <div class="terminal-advice-card">
          <div class="terminal-advice-header">
            <div class="terminal-advice-title">
              <span>🗂️ Active Custom Indexes in WASM Memory (${userCustomIndexes.length})</span>
            </div>
            <button class="terminal-btn" onclick="window.SqlTerminalEngine.dropAllCustomIndexes()">
              Drop All Indexes
            </button>
          </div>
          <div class="terminal-indexes-list">
            ${userCustomIndexes.map(idx => `
              <div class="terminal-index-item">
                <span>🔑 ${escapeHtml(idx)}</span>
                <button class="terminal-btn-peek" onclick="window.SqlTerminalEngine.dropCustomIndex('${idx}')">
                  Drop
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    advisorContent.innerHTML = html;
  }

  function renderPlanError(msg) {
    const treeEl = document.getElementById('terminalPlanTree');
    if (treeEl) {
      treeEl.innerHTML = `
        <div class="terminal-error-card">
          <div style="font-weight: 700; color: #f87171; margin-bottom: 0.4rem;">
            Failed to Generate Query Plan
          </div>
          <div>${escapeHtml(msg)}</div>
        </div>
      `;
    }
  }

  /**
   * Apply Suggested Index to SQLite WASM
   */
  async function applySuggestedIndex(indexSql, indexName) {
    if (!db) return;
    try {
      db.run(indexSql);
      if (!userCustomIndexes.includes(indexName)) {
        userCustomIndexes.push(indexName);
      }
      await inspectDatabaseSchema();
      renderSidebarContent();

      if (window.soundFX && typeof window.soundFX.playSuccess === 'function') {
        window.soundFX.playSuccess();
      }

      // Automatically re-run explain plan so user sees instant improvement!
      explainQueryPlan();
      setBloopMessage(`🚀 Custom index <code>${indexName}</code> applied! Watch your scan turn into a high-speed indexed probe!`, 'celebrate');
    } catch (err) {
      alert(`Could not create index: ${err.message}`);
    }
  }

  async function dropCustomIndex(indexName) {
    if (!db) return;
    try {
      db.run(`DROP INDEX IF EXISTS ${indexName};`);
      userCustomIndexes = userCustomIndexes.filter(i => i !== indexName);
      await inspectDatabaseSchema();
      renderSidebarContent();
      explainQueryPlan();
      setBloopMessage(`Index <code>${indexName}</code> dropped. Plan re-evaluated.`, 'happy');
    } catch (err) {
      alert(`Could not drop index: ${err.message}`);
    }
  }

  async function dropAllCustomIndexes() {
    if (!db) return;
    try {
      for (const idx of [...userCustomIndexes]) {
        db.run(`DROP INDEX IF EXISTS ${idx};`);
      }
      userCustomIndexes = [];
      await inspectDatabaseSchema();
      renderSidebarContent();
      explainQueryPlan();
      setBloopMessage(`All custom indexes dropped.`, 'happy');
    } catch (err) {
      alert(`Could not drop indexes: ${err.message}`);
    }
  }

  /**
   * Render interactive table grid with sticky headers and value formatting
   */
  function renderResultsTable(result) {
    const wrap = document.getElementById('terminalResultsWrap');
    const badge = document.getElementById('terminalResultsBadge');
    if (!wrap) return;

    const columns = result.columns;
    let values = result.values;

    if (filterTerm) {
      values = values.filter(row => 
        row.some(val => String(val).toLowerCase().includes(filterTerm))
      );
    }

    if (badge) {
      badge.textContent = `${values.length} of ${result.values.length} rows`;
    }

    if (values.length === 0) {
      wrap.innerHTML = `
        <div class="terminal-empty-state">
          <div class="terminal-empty-icon">🔍</div>
          <div>No records match filter "${escapeHtml(filterTerm)}"</div>
        </div>
      `;
      return;
    }

    let html = `
      <table class="terminal-table">
        <thead>
          <tr>
            <th class="terminal-row-num">#</th>
            ${columns.map(col => `<th>${escapeHtml(col)}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
    `;

    values.forEach((row, idx) => {
      html += `<tr><td class="terminal-row-num">${idx + 1}</td>`;
      row.forEach(val => {
        if (val === null || val === undefined) {
          html += `<td><span class="terminal-null-tag">NULL</span></td>`;
        } else if (typeof val === 'number') {
          html += `<td class="terminal-num-cell">${formatNumber(val)}</td>`;
        } else {
          html += `<td>${escapeHtml(String(val))}</td>`;
        }
      });
      html += `</tr>`;
    });

    html += `</tbody></table>`;
    wrap.innerHTML = html;
  }

  function renderDmlSuccess(durationMs) {
    const wrap = document.getElementById('terminalResultsWrap');
    const badge = document.getElementById('terminalResultsBadge');
    if (badge) badge.textContent = '0 rows (DML/DDL)';
    if (wrap) {
      wrap.innerHTML = `
        <div class="terminal-empty-state">
          <div class="terminal-empty-icon">⚡</div>
          <div style="font-weight: 600; color: #34d399;">Statement Executed Successfully</div>
          <div style="font-size: 0.8rem; color: #94a3b8;">Elapsed: ${durationMs} ms. Database state updated.</div>
        </div>
      `;
    }
  }

  function renderErrorCard(msg) {
    const wrap = document.getElementById('terminalResultsWrap');
    const badge = document.getElementById('terminalResultsBadge');
    if (badge) badge.textContent = 'Error';
    if (wrap) {
      wrap.innerHTML = `
        <div class="terminal-error-card">
          <div style="font-weight: 700; color: #f87171; margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.4rem;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            SQL Syntax or Runtime Exception
          </div>
          <div>${escapeHtml(msg)}</div>
        </div>
      `;
    }
  }

  function filterResults(term) {
    filterTerm = term.trim().toLowerCase();
    if (currentResults) {
      renderResultsTable(currentResults);
    }
  }

  function exportCsv() {
    if (!currentResults || !currentResults.values || currentResults.values.length === 0) {
      alert('No query results available to export.');
      return;
    }

    const { columns, values } = currentResults;
    let csvContent = 'data:text/csv;charset=utf-8,';
    
    csvContent += columns.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',') + '\r\n';
    
    values.forEach(row => {
      csvContent += row.map(val => {
        if (val === null || val === undefined) return '""';
        return `"${String(val).replace(/"/g, '""')}"`;
      }).join(',') + '\r\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sql_terminal_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function formatSql() {
    const textarea = document.getElementById('terminalEditorTextarea');
    if (!textarea) return;
    let code = textarea.value;

    const keywords = [
      'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'GROUP BY', 'HAVING', 'ORDER BY',
      'ASC', 'DESC', 'LIMIT', 'OFFSET', 'JOIN', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN',
      'FULL OUTER JOIN', 'CROSS JOIN', 'ON', 'AS', 'WITH', 'UNION ALL', 'UNION',
      'INTERSECT', 'EXCEPT', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'OVER', 'PARTITION BY',
      'ROWS BETWEEN', 'UNBOUNDED PRECEDING', 'CURRENT ROW', 'FOLLOWING', 'COALESCE',
      'NULLIF', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'LAG', 'LEAD', 'ROW_NUMBER',
      'RANK', 'DENSE_RANK', 'CREATE TABLE', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE',
      'EXPLAIN', 'QUERY', 'PLAN'
    ];

    keywords.forEach(kw => {
      const reg = new RegExp(`\\b${kw}\\b`, 'gi');
      code = code.replace(reg, kw);
    });

    textarea.value = code;
    updateGutters(textarea, document.getElementById('terminalEditorGutters'));
  }

  function clearEditor() {
    const textarea = document.getElementById('terminalEditorTextarea');
    if (textarea) {
      textarea.value = '';
      updateGutters(textarea, document.getElementById('terminalEditorGutters'));
    }
  }

  function resetDatabase() {
    if (!confirm('Reset in-memory database to default seed state? Any custom tables or indexes will be reverted.')) {
      return;
    }
    if (db) {
      db.close();
      db = new SQL.Database();
      seedDatabase();
      inspectDatabaseSchema().then(() => renderSidebarContent());
      updateStatus('ready', 'Database reset to initial seed state');
      setBloopMessage('🔄 Database re-seeded! All 12 domain tables refreshed to pristine factory state.', 'celebrate');
    }
  }

  /**
   * Status & telemetry updates
   */
  function updateStatus(state, text) {
    const dot = document.getElementById('terminalStatusDot');
    const txt = document.getElementById('terminalStatusText');
    if (dot) {
      dot.className = 'terminal-status-dot ' + state;
    }
    if (txt) {
      txt.textContent = text;
    }
  }

  function updateStats(rows, time) {
    const elRows = document.getElementById('terminalStatRows');
    const elTime = document.getElementById('terminalStatTime');
    if (elRows) elRows.textContent = rows;
    if (elTime) elTime.textContent = time;
  }

  function setBloopMessage(html, mood = 'happy') {
    const textEl = document.getElementById('terminalBloopText');
    if (textEl) {
      textEl.innerHTML = `<strong>Sir Bloop Co-Pilot:</strong> ${html}`;
    }
    if (window.SQL_BUDDY && typeof window.SQL_BUDDY.say === 'function') {
      window.SQL_BUDDY.say(stripHtml(html), 4000, mood);
    }
  }

  function generateSuccessCommentary(sql, rows, ms) {
    const upper = sql.toUpperCase();
    if (upper.includes('FULL OUTER JOIN')) {
      return `Brilliant reconciliation join! Found ${rows} records across both settlement ledgers in ${ms}ms. Look for NULLs to spot phantom or unauthorized trades!`;
    }
    if (upper.includes('LAG') || upper.includes('LEAD')) {
      return `Outstanding window offset query! Evaluated partition frames across ${rows} rows in ${ms}ms with zero self-joins!`;
    }
    if (upper.includes('WITH') && upper.includes('LAG')) {
      return `Executive-grade SaaS MRR bridge! Calculated retention, contraction, and expansion deltas across ${rows} cohort transitions in ${ms}ms!`;
    }
    if (upper.includes('JOIN') && upper.includes('WHERE')) {
      return `Clean relational join! Processed and returned ${rows} records in ${ms}ms. Click <strong>Explain Plan (⌥⏎)</strong> to inspect indexing!`;
    }
    return `Query executed in ${ms}ms! SQLite WASM processed ${rows} rows in-memory.`;
  }

  function generateErrorDiagnostic(err, sql) {
    const errLower = err.toLowerCase();
    if (errLower.includes('no such table')) {
      return `⚠️ Table not found! Check the <strong>Tables</strong> explorer in the left sidebar to verify table name spelling.`;
    }
    if (errLower.includes('no such column')) {
      return `⚠️ Column reference missing or misspelled! Click on a table card in the sidebar to expand its full column schema.`;
    }
    if (errLower.includes('syntax error')) {
      return `⚠️ SQL syntax error detected! Check for missing commas between SELECT columns, unclosed parentheses, or misplaced keywords.`;
    }
    if (errLower.includes('ambiguous column name')) {
      return `⚠️ Ambiguous column name! Prefix the column with its table alias (e.g. <code>i.trade_id</code> or <code>c.cleared_qty</code>).`;
    }
    return `⚠️ ${escapeHtml(err)}`;
  }

  function showFatalError(msg) {
    const container = document.getElementById('viewSqlTerminal');
    if (container) {
      container.innerHTML = `
        <div style="padding: 3.5rem 1.5rem; text-align: center; max-width: 580px; margin: 2rem auto; background: rgba(15, 23, 42, 0.9); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 14px; box-shadow: 0 12px 36px rgba(0,0,0,0.4);">
          <div style="font-size: 2.8rem; margin-bottom: 0.8rem;">⚠️</div>
          <h2 style="margin: 0 0 0.5rem; color: #f87171; font-size: 1.35rem;">Failed to Launch SQLite WASM</h2>
          <p style="color: #94a3b8; font-family: monospace; font-size: 0.85rem; margin-bottom: 1.5rem; background: rgba(0,0,0,0.3); padding: 0.75rem; border-radius: 8px;">${escapeHtml(msg)}</p>
          <button class="terminal-btn terminal-btn-primary" onclick="window.SqlTerminalEngine.retryInit()" style="padding: 0.65rem 1.35rem; font-size: 0.88rem; cursor: pointer;">
            🔄 Reset &amp; Relaunch SQLite Engine
          </button>
        </div>
      `;
    }
  }

  function retryInit() {
    isInitialized = false;
    isInitializing = false;
    if (db) {
      try { db.close(); } catch (e) {}
      db = null;
    }
    init();
  }

  function formatNumber(num) {
    if (Number.isInteger(num)) return num.toLocaleString();
    return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 });
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

  function stripHtml(html) {
    return html.replace(/<[^>]*>?/gm, '');
  }

  return {
    init,
    retryInit,
    setSidebarTab,
    setOutputTab,
    handleSidebarSearch,
    toggleTableCard,
    peekTable,
    loadPreset,
    executeQuery,
    explainQueryPlan,
    applySuggestedIndex,
    dropCustomIndex,
    dropAllCustomIndexes,
    filterResults,
    exportCsv,
    formatSql,
    clearEditor,
    resetDatabase
  };
})();
