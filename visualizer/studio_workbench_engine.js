/**
 * =============================================================================
 * STUDIO WORKBENCH ENGINE (ENTERPRISE EDITION)
 * Modern 50/50 IDE Workspace · Syntax-Highlighted Editor with Line Numbers
 * Multi-Dialect Transpiler · Custom Data Importer (CSV/JSON/DDL) · Result Exporter
 * Interactive Clause Lifecycle Stepper · Visual EXPLAIN Tree · AI Diagnostics
 * =============================================================================
 */

window.StudioWorkbenchEngine = (function() {
  'use strict';

  // State
  let state = {
    activeDialect: 'mysql', // 'mysql' | 'postgres' | 'snowflake' | 'ansi'
    layoutMode: 'split',    // 'split' | 'editor' | 'results'
    editorMode: 'raw',      // 'raw' | 'builder'
    zenMode: false,
    activePreset: 'preset_case_triangle',
    activeTab: 'tabStepper', // 'tabStepper' | 'tabExplainPlan' | 'tabChart' | 'tabDiff'
    activeTable: 'TRIANGLES',
    customTables: {},
    isPlaying: false,
    playTimer: null
  };

  const DIALECT_SPECS = {
    mysql: {
      name: 'MySQL 8.0',
      icon: '🐬',
      features: ['CTE Support', 'Window Functions', 'REGEXP_LIKE', 'JSON_TABLE', 'IFNULL()'],
      guidance: 'Default MySQL 8.0 engine with full recursive CTE, window frames, and JSON operators.'
    },
    postgres: {
      name: 'PostgreSQL 16',
      icon: '🐘',
      features: ['ILIKE', 'STRING_AGG()', 'DISTINCT ON', 'GENERATE_SERIES', 'NULLS LAST'],
      guidance: 'Postgres features ILIKE for case-insensitive matching and STRING_AGG() for concats.'
    },
    snowflake: {
      name: 'Snowflake',
      icon: '❄️',
      features: ['QUALIFY Clause', 'FLATTEN()', 'IFF()', 'ZEROIFNULL', 'TRY_TO_NUMBER'],
      guidance: 'Snowflake supports QUALIFY to filter directly after window functions without wrapping CTEs!'
    },
    ansi: {
      name: 'ANSI SQL:2016',
      icon: '📜',
      features: ['COALESCE()', 'FETCH FIRST N ROWS', 'CASE WHEN', 'STANDARD JOINS'],
      guidance: 'Strict portable ANSI standard compliant across all modern cloud warehouses.'
    }
  };

  const SAMPLE_IMPORTS = {
    csv: `order_id,customer_name,asset_class,notional_usd,status
1001,Goldman Sachs,EQUITY,450000,SETTLED
1002,Citadel Securities,FX,1250000,SETTLED
1003,Jane Street,COMMODITY,820000,PENDING
1004,Bridgewater,FIXED_INCOME,3400000,SETTLED
1005,Two Sigma,CRYPTO,650000,REJECTED
1006,Renaissance,EQUITY,2100000,SETTLED
1007,Millennium,FX,980000,SETTLED
1008,Point72,DERIVATIVE,1540000,PENDING`,

    json: `[
  { "trade_id": "TR-901", "symbol": "NVDA", "side": "BUY", "shares": 500, "price": 142.50, "venue": "NASDAQ" },
  { "trade_id": "TR-902", "symbol": "AAPL", "side": "BUY", "shares": 1200, "price": 228.10, "venue": "IEX" },
  { "trade_id": "TR-903", "symbol": "MSFT", "side": "SELL", "shares": 350, "price": 448.75, "venue": "NYSE" },
  { "trade_id": "TR-904", "symbol": "TSLA", "side": "BUY", "shares": 800, "price": 254.30, "venue": "NASDAQ" },
  { "trade_id": "TR-905", "symbol": "AMZN", "side": "SELL", "shares": 600, "price": 186.20, "venue": "BATS" },
  { "trade_id": "TR-906", "symbol": "GOOGL", "side": "BUY", "shares": 400, "price": 165.80, "venue": "IEX" }
]`,

    ddl: `CREATE TABLE RiskBuckets (
  portfolio_id INT,
  desk VARCHAR(50),
  var_95 FLOAT,
  stress_loss FLOAT
);

INSERT INTO RiskBuckets VALUES
(1, 'Macro Delta', 245000, 890000),
(2, 'Quant Equity', 185000, 620000),
(3, 'Credit Arb', 420000, 1450000),
(4, 'Vol Surface', 310000, 1100000);`
  };

  // ---------------------------------------------------------------------------
  // INITIALIZATION
  // ---------------------------------------------------------------------------
  function init() {
    const container = document.getElementById('viewStudio');
    if (!container) return;

    // Verify globals are ready
    if (!window.DATABASE && typeof DATABASE !== 'undefined') {
      window.DATABASE = DATABASE;
    }
    if (!window.PRESETS && typeof PRESETS !== 'undefined') {
      window.PRESETS = PRESETS;
    }

    renderWorkbenchShell(container);
    bindStudioEvents();
    syncEditorLineNumbers();
    initSqlSyntaxHighlighter();

    // Run initial query
    const sqlInput = document.getElementById('sqlInput');
    if (sqlInput && sqlInput.value && typeof sqlInput.value === 'string' && sqlInput.value.trim()) {
      runStudioQuery(sqlInput.value);
    }
  }

  // ---------------------------------------------------------------------------
  // RENDER SHELL
  // ---------------------------------------------------------------------------
  function renderWorkbenchShell(container) {
    const dbTables = Object.keys(window.DATABASE || {});
    const currentTable = state.activeTable || (dbTables.length ? dbTables[0] : 'TRIANGLES');
    const presets = window.PRESETS || {};

    container.innerHTML = `
      <div class="studio-workbench-wrapper ${state.zenMode ? 'zen-mode' : ''}">
        <!-- Sleek Studio 48px Header Bar -->
        <header class="studio-topbar">
          <div class="studio-topbar-left">
            <div class="studio-brand">
              <span class="studio-brand-icon">⚡</span>
              <div>
                <h1 class="studio-brand-title">SQL Query Studio</h1>
                <span class="studio-brand-pill">WASM Relational Engine</span>
              </div>
            </div>

            <div class="studio-bar-sep"></div>

            <!-- Preset Selector Dropdown -->
            <div class="studio-select-group" title="Load Query Preset">
              <span class="studio-select-label">Preset:</span>
              <select id="studioPresetSelect" class="studio-compact-select">
                <option value="preset_case_triangle" ${state.activePreset === 'preset_case_triangle' ? 'selected' : ''}>CASE WHEN &mdash; Type of Triangle</option>
                <option value="preset_case_credit" ${state.activePreset === 'preset_case_credit' ? 'selected' : ''}>CASE WHEN &mdash; Credit Risk Buckets</option>
                <option value="preset_station5_tiebreak" ${state.activePreset === 'preset_station5_tiebreak' ? 'selected' : ''}>ORDER BY &mdash; LENGTH() &amp; Tie-Breakers</option>
                <option value="preset_students_right" ${state.activePreset === 'preset_students_right' ? 'selected' : ''}>ORDER BY &mdash; RIGHT(Name, 3) Suffix</option>
                <option value="preset_employees_salaries" ${state.activePreset === 'preset_employees_salaries' ? 'selected' : ''}>WHERE &mdash; AND / OR Compound Filter</option>
                <option value="preset_regex_vowels" ${state.activePreset === 'preset_regex_vowels' ? 'selected' : ''}>REGEXP &mdash; Starts &amp; Ends with Vowel</option>
                <option value="preset_distinct_cities" ${state.activePreset === 'preset_distinct_cities' ? 'selected' : ''}>DISTINCT &mdash; Unique Market Tuples</option>
                <option value="preset_top_earners" ${state.activePreset === 'preset_top_earners' ? 'selected' : ''}>AGGREGATE &mdash; Top Earners (Months * Salary)</option>
                <option value="preset_dept_payroll" ${state.activePreset === 'preset_dept_payroll' ? 'selected' : ''}>GROUP BY &mdash; Department Total &amp; Avg</option>
                <option value="preset_trade_recon" ${state.activePreset === 'preset_trade_recon' ? 'selected' : ''}>CAPSTONE &mdash; Prime Broker Recon</option>
              </select>
            </div>

            <!-- Schema Table Dropdown -->
            <div class="studio-select-group" title="Active Schema Table">
              <span class="studio-select-label">Table:</span>
              <select id="studioTableSelect" class="studio-compact-select">
                ${dbTables.map(t => {
                  const rows = (window.DATABASE && window.DATABASE[t]) || [];
                  return `<option value="${t}" ${t === currentTable ? 'selected' : ''}>${t} (${rows.length} rows)</option>`;
                }).join('')}
              </select>
            </div>
          </div>

          <!-- Center Dialect Switcher -->
          <div class="studio-dialect-group">
            ${Object.keys(DIALECT_SPECS).map(dKey => {
              const d = DIALECT_SPECS[dKey];
              const isActive = state.activeDialect === dKey;
              return `
                <button class="dialect-pill ${isActive ? 'active' : ''}" data-dialect="${dKey}" title="${d.guidance}">
                  <span>${d.icon}</span>
                  <span>${d.name}</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Right Studio Controls -->
          <div class="studio-topbar-right">
            <!-- Layout Switcher -->
            <div class="studio-layout-group" title="Workspace Layout Mode">
              <button class="studio-layout-btn ${state.layoutMode === 'split' ? 'active' : ''}" data-layout="split" title="50/50 Split View">
                <span>◧ Split</span>
              </button>
              <button class="studio-layout-btn ${state.layoutMode === 'editor' ? 'active' : ''}" data-layout="editor" title="Full Code Editor">
                <span>◨ Editor</span>
              </button>
              <button class="studio-layout-btn ${state.layoutMode === 'results' ? 'active' : ''}" data-layout="results" title="Full Results Stage">
                <span>◩ Results</span>
              </button>
            </div>

            <!-- Data Import Button -->
            <button class="studio-import-btn" id="btnOpenImportModal" title="Import CSV, JSON, or SQL DDL to query your own data">
              <span>📥 Import Data</span>
            </button>

            <!-- Zen Mode Toggle -->
            <button class="studio-zen-btn ${state.zenMode ? 'active' : ''}" id="btnStudioZen" title="Zen Focus Mode">
              <span>⛶ Zen</span>
            </button>
          </div>
        </header>

        <!-- Main 50/50 Workspace Grid -->
        <main class="studio-workspace-grid layout-${state.layoutMode}">
          <!-- Left Column: Code Editor & Visual Builder -->
          <section class="studio-editor-column">
            <!-- Card Header: Mode Switcher & Quick Actions -->
            <div class="studio-pane-header">
              <div class="studio-mode-toggle">
                <button id="btnModeRaw" class="mode-toggle-btn ${state.editorMode === 'raw' ? 'active' : ''}">
                  <span>💻 Raw SQL Editor</span>
                </button>
                <button id="btnModeBuilder" class="mode-toggle-btn ${state.editorMode === 'builder' ? 'active' : ''}">
                  <span>🧩 Visual Builder</span>
                </button>
              </div>

              <div class="studio-editor-tools">
                <button id="btnStudioFormatSQL" class="studio-micro-btn" title="Prettify &amp; format SQL (Alt+Shift+F)">
                  <span>✨ Format</span>
                </button>
                <button id="btnStudioAskBloops" class="studio-micro-btn accent" title="Ask Sir Bloops to inspect for NULL traps &amp; optimize">
                  <span>🤖 Ask Bloops</span>
                </button>
                <button id="btnStudioTranspile" class="studio-micro-btn" title="Transpile syntax to active dialect">
                  <span>🔄 Transpile</span>
                </button>
                <button id="btnStudioClearSQL" class="studio-micro-btn" title="Clear editor">
                  <span>✕ Clear</span>
                </button>
              </div>
            </div>

            <!-- Raw SQL Editor Pane -->
            <div class="studio-editor-body" id="rawSqlContainer" style="${state.editorMode === 'raw' ? 'display: flex;' : 'display: none;'}">
              <div class="code-editor-wrapper">
                <div class="editor-gutter" id="studioLineNumbers">1</div>
                <textarea id="sqlInput" class="studio-code-textarea" spellcheck="false" wrap="off" placeholder="-- Write SQL query here (e.g. SELECT * FROM TRIANGLES;)">${(presets[state.activePreset] || 'SELECT * FROM TRIANGLES;').trim()}</textarea>
              </div>
            </div>

            <!-- Visual Builder Body Pane (Preserved from visualizer) -->
            <div class="builder-body" id="visualBuilderContainer" style="${state.editorMode === 'builder' ? 'display: flex;' : 'display: none;'}">
              <!-- Point-and-Click Visual Builder Block -->
              <div class="builder-section">
                <div class="builder-section-title">
                  <span class="clause-pill pill-from">FROM</span> Source Table
                </div>
                <select id="builderTableSelect" class="builder-select full-width">
                  ${dbTables.map(t => `<option value="${t}" ${t === currentTable ? 'selected' : ''}>${t}</option>`).join('')}
                </select>
              </div>

              <div class="builder-section">
                <div class="builder-section-title">
                  <span class="clause-pill pill-select">SELECT</span> Columns &amp; Functions
                </div>
                <div class="column-chips" id="builderColumnChips"></div>
              </div>

              <div class="builder-preview-card">
                <div class="preview-header">
                  <span class="preview-title">Generated SQL Preview</span>
                  <button id="btnCopyGeneratedSQL" class="copy-sql-btn" title="Copy SQL">
                    <span>📋 Copy</span>
                  </button>
                </div>
                <pre class="live-sql-code" id="liveSqlPreview">SELECT * FROM ${currentTable};</pre>
              </div>
            </div>

            <!-- Action Strip & Execution Controls -->
            <div class="studio-action-strip">
              <button class="studio-run-cta" id="btnStudioRunQuery" title="Execute Query (Ctrl+Enter)">
                <span class="icon">▶</span>
                <span>Run Query</span>
                <span class="shortcut">Ctrl+↵</span>
              </button>

              <!-- Live Execution Telemetry Bar -->
              <div class="studio-telemetry-strip" id="queryTelemetryBar">
                <div class="telemetry-chip plan" id="telemetryPlanChip" title="Click to view Visual EXPLAIN Tree" style="cursor: pointer;">
                  <span class="telemetry-label">PLAN:</span>
                  <span class="telemetry-val" id="telemetryPlanVal">INDEX RANGE SEEK</span>
                </div>
                <div class="telemetry-chip latency">
                  <span class="telemetry-label">LATENCY:</span>
                  <span class="telemetry-val" id="telemetryLatencyVal">1.2 ms</span>
                </div>
                <div class="telemetry-chip rows">
                  <span class="telemetry-label">OUTPUT:</span>
                  <span class="telemetry-val" id="telemetrySelectVal">15 Rows</span>
                </div>
                <div class="telemetry-chip buffer">
                  <span class="telemetry-label">RAM HIT:</span>
                  <span class="telemetry-val" id="telemetryBufferVal">100%</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Right Column: Relational Execution Stage & Viewers -->
          <section class="studio-stage-column">
            <!-- Pipeline Stepper Track Card -->
            <div class="studio-stepper-card">
              <div class="stepper-top">
                <div class="stepper-meta">
                  <span class="step-counter" id="stepCounterLabel">STEP 1 OF 6</span>
                  <h2 class="step-heading" id="stepHeadingLabel">FROM Clause: Table Scan</h2>
                </div>

                <div class="stepper-controls">
                  <button id="btnPrevStep" class="icon-btn" title="Previous Step (Left Arrow)" disabled>◀</button>
                  <button id="btnPlayPause" class="play-btn" title="Auto-play execution lifecycle">
                    <span id="playBtnText">▶ Auto Step</span>
                  </button>
                  <button id="btnNextStep" class="icon-btn" title="Next Step (Right Arrow)">▶</button>
                  <button id="btnResetStep" class="icon-btn" title="Reset Step">↺</button>
                </div>
              </div>

              <!-- Interactive Stepper Track Nodes -->
              <div class="stepper-track" id="stepperTrack">
                <button class="track-node active" data-step="0"><span class="node-num">01</span><span class="node-name">FROM</span></button>
                <div class="track-line"></div>
                <button class="track-node" data-step="1"><span class="node-num">02</span><span class="node-name">WHERE</span></button>
                <div class="track-line"></div>
                <button class="track-node" data-step="2"><span class="node-num">03</span><span class="node-name">SELECT</span></button>
                <div class="track-line"></div>
                <button class="track-node" data-step="3"><span class="node-num">04</span><span class="node-name">DISTINCT</span></button>
                <div class="track-line"></div>
                <button class="track-node" data-step="4"><span class="node-num">05</span><span class="node-name">ORDER BY</span></button>
                <div class="track-line"></div>
                <button class="track-node" data-step="5"><span class="node-num">06</span><span class="node-name">LIMIT</span></button>
              </div>

              <!-- Explanation -->
              <div class="step-explanation" id="stepExplanationText">
                Allocating memory buffer and scanning source table.
              </div>
            </div>

            <!-- Data Stage Viewers Card -->
            <div class="studio-viewer-card">
              <div class="viewer-tabs-bar">
                <div class="viewer-tabs-group">
                  <button class="viewer-tab-btn ${state.activeTab === 'tabStepper' ? 'active' : ''}" data-tab="tabStepper">
                    <span>📊 Data Grid</span>
                  </button>
                  <button class="viewer-tab-btn ${state.activeTab === 'tabExplainPlan' ? 'active' : ''}" data-tab="tabExplainPlan" id="btnTabExplainPlan">
                    <span>🌳 EXPLAIN Plan Tree</span>
                    <span class="tab-badge-hot">COST</span>
                  </button>
                  <button class="viewer-tab-btn ${state.activeTab === 'tabChart' ? 'active' : ''}" data-tab="tabChart">
                    <span>📈 Distribution</span>
                  </button>
                  <button class="viewer-tab-btn ${state.activeTab === 'tabDiff' ? 'active' : ''}" data-tab="tabDiff">
                    <span>🔍 Input/Output Diff</span>
                  </button>
                </div>

                <!-- Export Results Actions -->
                <div class="viewer-actions-group">
                  <span class="row-count-badge" id="rowCounterBadge">15 rows</span>
                  <div class="export-dropdown-wrapper">
                    <button class="studio-export-btn" id="btnExportMenu" title="Export Query Results">
                      <span>📤 Export ▾</span>
                    </button>
                    <div class="export-menu-dropdown" id="exportMenuDropdown">
                      <button class="export-opt-btn" onclick="window.StudioWorkbenchEngine.copyAsMarkdown()">
                        <span>📋 Copy Markdown Table</span>
                      </button>
                      <button class="export-opt-btn" onclick="window.StudioWorkbenchEngine.exportAsCSV()">
                        <span>📄 Download CSV (.csv)</span>
                      </button>
                      <button class="export-opt-btn" onclick="window.StudioWorkbenchEngine.exportAsJSON()">
                        <span>📦 Download JSON (.json)</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Viewers Content Body -->
              <div class="viewer-panes-body">
                <!-- Tab 1: Interactive Data Grid -->
                <div class="viewer-pane ${state.activeTab === 'tabStepper' ? 'active' : ''}" id="tabStepper">
                  <div class="table-scroll-wrapper" id="stepperTableContainer"></div>
                </div>

                <!-- Tab 2: Visual Execution Plan Tree -->
                <div class="viewer-pane ${state.activeTab === 'tabExplainPlan' ? 'active' : ''}" id="tabExplainPlan">
                  <div class="explain-plan-tree-container" id="explainPlanTreeContainer"></div>
                </div>

                <!-- Tab 3: Distribution Chart -->
                <div class="viewer-pane ${state.activeTab === 'tabChart' ? 'active' : ''}" id="tabChart">
                  <div class="chart-wrapper" id="chartContainer"></div>
                </div>

                <!-- Tab 4: Input / Output Diff -->
                <div class="viewer-pane ${state.activeTab === 'tabDiff' ? 'active' : ''}" id="tabDiff">
                  <div class="diff-wrapper" id="diffContainer"></div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <!-- CUSTOM DATA IMPORT MODAL -->
      <div id="studioImportModal" class="studio-modal-backdrop" style="display: none;" onclick="window.StudioWorkbenchEngine.handleImportOverlayClick(event)">
        <div class="studio-modal-dialog">
          <div class="studio-modal-header">
            <div class="modal-title-group">
              <span class="modal-icon">📥</span>
              <div>
                <h3 class="modal-title">Custom Data Importer &amp; Scratchpad</h3>
                <p class="modal-sub">Import CSV, JSON, or SQL DDL to query your own datasets in Query Studio</p>
              </div>
            </div>
            <button class="studio-modal-close" onclick="window.StudioWorkbenchEngine.closeImportModal()">✕</button>
          </div>

          <div class="studio-modal-tabs">
            <button class="import-tab-btn active" data-itype="csv" onclick="window.StudioWorkbenchEngine.switchImportTab('csv')">📄 Paste CSV</button>
            <button class="import-tab-btn" data-itype="json" onclick="window.StudioWorkbenchEngine.switchImportTab('json')">📦 Paste JSON</button>
            <button class="import-tab-btn" data-itype="ddl" onclick="window.StudioWorkbenchEngine.switchImportTab('ddl')">📜 SQL DDL / INSERT</button>
          </div>

          <div class="studio-modal-body">
            <div class="import-field-group">
              <label for="importTableName">Target Table Name:</label>
              <input type="text" id="importTableName" class="import-input" placeholder="e.g. UserTrades, EventLogs, Products" value="CustomDataset">
            </div>

            <div class="import-field-group">
              <div class="import-label-row">
                <label id="importContentLabel">Paste CSV Data (with headers):</label>
                <button class="sample-load-link" onclick="window.StudioWorkbenchEngine.loadSampleData()">⚡ Load Sample</button>
              </div>
              <textarea id="importTextarea" class="import-textarea" placeholder="Paste dataset here..."></textarea>
            </div>
          </div>

          <div class="studio-modal-footer">
            <button class="studio-btn secondary" onclick="window.StudioWorkbenchEngine.closeImportModal()">Cancel</button>
            <button class="studio-btn primary" onclick="window.StudioWorkbenchEngine.submitImport()">🚀 Import &amp; Load into Studio</button>
          </div>
        </div>
      </div>
    `;
  }

  // ---------------------------------------------------------------------------
  // EVENT BINDINGS
  // ---------------------------------------------------------------------------
  function bindStudioEvents() {
    const container = document.getElementById('viewStudio');
    if (!container) return;

    // 1. Run Query Button
    const btnRun = container.querySelector('#btnStudioRunQuery');
    if (btnRun) {
      btnRun.addEventListener('click', () => {
        const sqlInput = document.getElementById('sqlInput');
        if (sqlInput) runStudioQuery(sqlInput.value);
      });
    }

    // 2. Prettify Format Button
    const btnFormat = container.querySelector('#btnStudioFormatSQL');
    if (btnFormat) {
      btnFormat.addEventListener('click', () => {
        if (typeof window.formatSQLEditorQuery === 'function') {
          window.formatSQLEditorQuery();
          syncEditorLineNumbers();
        }
      });
    }

    // 3. Clear SQL Button
    const btnClear = container.querySelector('#btnStudioClearSQL');
    if (btnClear) {
      btnClear.addEventListener('click', () => {
        const sqlInput = document.getElementById('sqlInput');
        if (sqlInput) {
          sqlInput.value = '';
          syncEditorLineNumbers();
        }
      });
    }

    // 4. Ask Bloops AI Diagnostics Button
    const btnBloops = container.querySelector('#btnStudioAskBloops');
    if (btnBloops) {
      btnBloops.addEventListener('click', () => {
        const sqlInput = document.getElementById('sqlInput');
        diagnoseWithBloops(sqlInput ? sqlInput.value : '');
      });
    }

    // 5. Transpile to Dialect Button
    const btnTranspile = container.querySelector('#btnStudioTranspile');
    if (btnTranspile) {
      btnTranspile.addEventListener('click', () => {
        const sqlInput = document.getElementById('sqlInput');
        if (sqlInput) transpileCurrentQuery(sqlInput);
      });
    }

    // 6. Layout Buttons
    container.querySelectorAll('.studio-layout-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.layoutMode = btn.dataset.layout;
        const grid = container.querySelector('.studio-workspace-grid');
        if (grid) {
          grid.className = `studio-workspace-grid layout-${state.layoutMode}`;
        }
        container.querySelectorAll('.studio-layout-btn').forEach(b => {
          b.classList.toggle('active', b === btn);
        });
      });
    });

    // 7. Dialect Pills
    container.querySelectorAll('.dialect-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        state.activeDialect = pill.dataset.dialect;
        container.querySelectorAll('.dialect-pill').forEach(p => {
          p.classList.toggle('active', p === pill);
        });
        const spec = DIALECT_SPECS[state.activeDialect];
        if (spec && window.SQL_BUDDY) {
          window.SQL_BUDDY.say(`${spec.icon} Switched dialect to ${spec.name}! ${spec.guidance}`, 3500, 'celebrate');
        }
      });
    });

    // 8. Preset Selector
    const presetSelect = container.querySelector('#studioPresetSelect');
    if (presetSelect) {
      presetSelect.addEventListener('change', (e) => {
        const key = e.target.value;
        state.activePreset = key;
        const presets = window.PRESETS || {};
        if (presets[key]) {
          const sqlInput = document.getElementById('sqlInput');
          if (sqlInput) {
            sqlInput.value = presets[key];
            syncEditorLineNumbers();
            runStudioQuery(presets[key]);
          }
        }
      });
    }

    // 9. Table Selector
    const tableSelect = container.querySelector('#studioTableSelect');
    if (tableSelect) {
      tableSelect.addEventListener('change', (e) => {
        const table = e.target.value;
        state.activeTable = table;
        const sql = `SELECT * FROM ${table} LIMIT 10;`;
        const sqlInput = document.getElementById('sqlInput');
        if (sqlInput) {
          sqlInput.value = sql;
          syncEditorLineNumbers();
          runStudioQuery(sql);
        }
      });
    }

    // 10. Mode Switcher (Raw vs Builder)
    const btnRaw = container.querySelector('#btnModeRaw');
    const btnBuilder = container.querySelector('#btnModeBuilder');
    const rawBox = container.querySelector('#rawSqlContainer');
    const builderBox = container.querySelector('#visualBuilderContainer');

    if (btnRaw && btnBuilder) {
      btnRaw.addEventListener('click', () => {
        state.editorMode = 'raw';
        btnRaw.classList.add('active');
        btnBuilder.classList.remove('active');
        if (rawBox) rawBox.style.display = 'flex';
        if (builderBox) builderBox.style.display = 'none';
      });

      btnBuilder.addEventListener('click', () => {
        state.editorMode = 'builder';
        btnBuilder.classList.add('active');
        btnRaw.classList.remove('active');
        if (rawBox) rawBox.style.display = 'none';
        if (builderBox) builderBox.style.display = 'flex';
        if (typeof window.syncBuilderFromTable === 'function') {
          window.syncBuilderFromTable(state.activeTable);
        }
      });
    }

    // 11. Viewers Tab Switcher
    container.querySelectorAll('.viewer-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        state.activeTab = tabId;
        container.querySelectorAll('.viewer-tab-btn').forEach(b => b.classList.toggle('active', b === btn));
        container.querySelectorAll('.viewer-pane').forEach(p => p.classList.toggle('active', p.id === tabId));

        if (tabId === 'tabExplainPlan' && window.VISUAL_EXPLAIN_TREE_ENGINE) {
          const sqlInput = document.getElementById('sqlInput');
          const sql = sqlInput ? sqlInput.value : '';
          const steps = (window.EngineState && (window.EngineState.steps || window.EngineState.pipelineSteps)) || [];
          window.VISUAL_EXPLAIN_TREE_ENGINE.renderTreeForQuery(sql, steps);
        }
      });
    });

    // 12. Export Menu Dropdown Toggle
    const btnExport = container.querySelector('#btnExportMenu');
    const exportDropdown = container.querySelector('#exportMenuDropdown');
    if (btnExport && exportDropdown) {
      btnExport.addEventListener('click', (e) => {
        e.stopPropagation();
        exportDropdown.classList.toggle('show');
        exportDropdown.classList.toggle('open');
      });
      document.addEventListener('click', () => {
        exportDropdown.classList.remove('show');
        exportDropdown.classList.remove('open');
      });
    }

    // 13. Data Import Modal Trigger
    const btnImport = container.querySelector('#btnOpenImportModal');
    if (btnImport) {
      btnImport.addEventListener('click', () => openImportModal());
    }

    // 14. Zen Mode Toggle
    const btnZen = container.querySelector('#btnStudioZen');
    if (btnZen) {
      btnZen.addEventListener('click', () => {
        state.zenMode = !state.zenMode;
        btnZen.classList.toggle('active', state.zenMode);
        const wrapper = container.querySelector('.studio-workbench-wrapper');
        if (wrapper) wrapper.classList.toggle('zen-mode', state.zenMode);
      });
    }

    // 15. Auto-Step Play / Pause
    const btnPlay = container.querySelector('#btnPlayPause');
    if (btnPlay) {
      btnPlay.addEventListener('click', () => toggleAutoStep());
    }

    // 16. Stepper Node Clicks
    container.querySelectorAll('.track-node').forEach(node => {
      node.addEventListener('click', () => {
        const step = parseInt(node.dataset.step, 10);
        if (typeof window.renderStep === 'function') {
          window.renderStep(step);
        }
      });
    });

    // 17. Telemetry Plan Tree Focus Click
    const planChip = container.querySelector('#telemetryPlanChip');
    if (planChip) {
      planChip.addEventListener('click', () => {
        const tabExplain = container.querySelector('#btnTabExplainPlan');
        if (tabExplain) tabExplain.click();
      });
    }
  }

  // ---------------------------------------------------------------------------
  // QUERY EXECUTION & PIPELINE SYNC
  // ---------------------------------------------------------------------------
  function runStudioQuery(sql) {
    if (!sql || !sql.trim()) return;
    const clean = sql.trim();
    const startTime = performance.now();

    // Call underlying relational visualizer pipeline
    if (typeof window.parseAndBuildPipeline === 'function') {
      window.parseAndBuildPipeline(clean);
    }

    const elapsed = Math.max(0.8, (performance.now() - startTime)).toFixed(1);

    // Update telemetry
    const latencyEl = document.getElementById('telemetryLatencyVal');
    if (latencyEl) latencyEl.textContent = `${elapsed} ms`;

    // Row counter
    let rowCount = 0;
    const steps = window.EngineState && (window.EngineState.steps || window.EngineState.pipelineSteps);
    if (steps && steps.length) {
      const lastStep = steps[steps.length - 1];
      rowCount = (lastStep.rows || []).length;
    }
    const selectVal = document.getElementById('telemetrySelectVal');
    const badge = document.getElementById('rowCounterBadge');
    if (selectVal) selectVal.textContent = `${rowCount} Rows`;
    if (badge) badge.textContent = `${rowCount} rows`;

    // Sound FX & activity log
    if (window.soundFX) window.soundFX.playPop();
    if (window.ActivityHeatmapEngine) {
      window.ActivityHeatmapEngine.logActivity('studio', 1, 10, 'Studio Query Execution');
    }
  }

  function loadQuery(query, table) {
    const container = document.getElementById('viewStudio');
    if (!container || !container.querySelector('.studio-workbench-wrapper')) {
      init();
    }
    if (table) state.activeTable = table;
    const sqlInput = document.getElementById('sqlInput');
    if (sqlInput) {
      sqlInput.value = query;
      syncEditorLineNumbers();
    }
    const livePreview = document.getElementById('liveSqlPreview');
    if (livePreview) livePreview.textContent = query;
    runStudioQuery(query);
  }

  // ---------------------------------------------------------------------------
  // SYNTAX HIGHLIGHTING & LINE NUMBERS
  // ---------------------------------------------------------------------------
  function syncEditorLineNumbers() {
    const sqlInput = document.getElementById('sqlInput');
    const gutter = document.getElementById('studioLineNumbers');
    if (!sqlInput || !gutter) return;

    const lines = (sqlInput.value || '').split('\n').length;
    let numbers = '';
    for (let i = 1; i <= Math.max(lines, 1); i++) {
      numbers += i + '\n';
    }
    gutter.textContent = numbers;
  }

  function initSqlSyntaxHighlighter() {
    const sqlInput = document.getElementById('sqlInput');
    if (!sqlInput) return;

    sqlInput.addEventListener('input', () => {
      syncEditorLineNumbers();
    });

    sqlInput.addEventListener('scroll', () => {
      const gutter = document.getElementById('studioLineNumbers');
      if (gutter) gutter.scrollTop = sqlInput.scrollTop;
    });

    // Support Tab key indentation
    sqlInput.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = sqlInput.selectionStart;
        const end = sqlInput.selectionEnd;
        sqlInput.value = sqlInput.value.substring(0, start) + '  ' + sqlInput.value.substring(end);
        sqlInput.selectionStart = sqlInput.selectionEnd = start + 2;
        syncEditorLineNumbers();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runStudioQuery(sqlInput.value);
      }
    });
  }

  // ---------------------------------------------------------------------------
  // AI DIAGNOSTICS ("ASK BLOOPS")
  // ---------------------------------------------------------------------------
  function diagnoseWithBloops(sql) {
    if (!window.SQL_BUDDY) return;
    const clean = (sql || '').trim().toUpperCase();

    if (!clean) {
      window.SQL_BUDDY.say("🤖 Write or load a query first, and I will inspect it for NULL traps and performance bottlenecks!", 3500, 'thinking');
      return;
    }

    // 1. Check for != without NULL guard
    if (clean.includes('!=') || clean.includes('<>')) {
      window.SQL_BUDDY.say("⚠️ Three-Valued Logic Alert: Inequalities like '!=' or '<>' will SILENTLY discard NULL rows! Use 'OR column IS NULL' or COALESCE() to retain them.", 5500, 'warning');
      return;
    }

    // 2. Check for NOT IN with potential NULL subquery
    if (clean.includes('NOT IN')) {
      window.SQL_BUDDY.say("🚨 Classic Interview Trap: If the subquery in 'NOT IN (SELECT...)' returns even a SINGLE NULL row, the entire predicate evaluates to UNKNOWN and yields 0 rows! Prefer 'NOT EXISTS'.", 5500, 'thinking');
      return;
    }

    // 3. Check for SARGability (wrapping indexed column in function)
    if (clean.includes('YEAR(') || clean.includes('MONTH(') || clean.includes('UPPER(') || clean.includes('LOWER(')) {
      window.SQL_BUDDY.say("⚡ SARGability Tip: Wrapping columns inside functions like YEAR(date_col) prevents B-Tree index seeks and forces an expensive full table scan. Use range bounds like 'date_col >= ... AND date_col < ...' instead!", 5500, 'happy');
      return;
    }

    // 4. Check for Window Function partition order
    if (clean.includes('OVER') && clean.includes('ORDER BY') && (clean.includes('SUM(') || clean.includes('AVG('))) {
      window.SQL_BUDDY.say("💡 Window Mechanics: SUM() with an ORDER BY inside OVER() creates an implicit 'RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW' running total. Add ROWS BETWEEN if ties occur!", 5500, 'celebrate');
      return;
    }

    // 5. Clean query praise
    window.SQL_BUDDY.say("🎯 Clean Relational Form! Your query predicates are SARGable and follow standard relational execution order. Ready for production verification!", 4000, 'celebrate');
  }

  // ---------------------------------------------------------------------------
  // MULTI-DIALECT TRANSPILER
  // ---------------------------------------------------------------------------
  function transpileCurrentQuery(sqlInput) {
    let sql = sqlInput.value;
    const dialect = state.activeDialect;

    if (dialect === 'snowflake') {
      // Suggest QUALIFY or IFF
      if (sql.includes('SELECT * FROM (SELECT') && sql.includes('WHERE row_num = 1')) {
        sql = sql.replace(/WHERE\s+row_num\s*=\s*1/, 'QUALIFY ROW_NUMBER() OVER (...) = 1');
      }
      sql = sql.replace(/\bIFNULL\s*\(/gi, 'ZEROIFNULL(');
    } else if (dialect === 'postgres') {
      sql = sql.replace(/\bIFNULL\s*\(/gi, 'COALESCE(');
      sql = sql.replace(/\bGROUP_CONCAT\s*\(/gi, 'STRING_AGG(');
    } else if (dialect === 'mysql') {
      sql = sql.replace(/\bSTRING_AGG\s*\(/gi, 'GROUP_CONCAT(');
      sql = sql.replace(/\bILIKE\b/gi, 'LIKE');
    }

    sqlInput.value = sql;
    syncEditorLineNumbers();
    if (window.SQL_BUDDY) {
      window.SQL_BUDDY.say(`🔄 Transpiled query syntax to ${DIALECT_SPECS[dialect].name} standards!`, 3000, 'happy');
    }
  }

  // ---------------------------------------------------------------------------
  // AUTO-STEP ENGINE
  // ---------------------------------------------------------------------------
  function toggleAutoStep() {
    state.isPlaying = !state.isPlaying;
    const btn = document.getElementById('btnPlayPause');
    const label = document.getElementById('playBtnText');

    if (state.isPlaying) {
      if (label) label.textContent = '⏸ Pause';
      if (btn) btn.classList.add('playing');
      runStepCycle();
    } else {
      if (label) label.textContent = '▶ Auto Step';
      if (btn) btn.classList.remove('playing');
      clearTimeout(state.playTimer);
    }
  }

  function runStepCycle() {
    if (!state.isPlaying) return;
    const maxSteps = 6;
    let curr = (window.EngineState && window.EngineState.currentStepIndex) || 0;
    let next = (curr + 1) % maxSteps;

    if (typeof window.renderStep === 'function') {
      window.renderStep(next);
    }

    state.playTimer = setTimeout(runStepCycle, 1600);
  }

  // ---------------------------------------------------------------------------
  // RESULT EXPORTERS (MARKDOWN, CSV, JSON)
  // ---------------------------------------------------------------------------
  function getActiveResultRows() {
    const steps = window.EngineState && (window.EngineState.steps || window.EngineState.pipelineSteps);
    if (steps && steps.length) {
      const last = steps[steps.length - 1];
      return { rows: last.rows || [], columns: last.columns || Object.keys(last.rows[0] || {}) };
    }
    const curTable = (window.DATABASE && window.DATABASE[state.activeTable]) || [];
    return { rows: curTable, columns: Object.keys(curTable[0] || {}) };
  }

  function copyAsMarkdown() {
    const { rows, columns } = getActiveResultRows();
    if (!rows.length) return;

    let md = '| ' + columns.join(' | ') + ' |\n';
    md += '| ' + columns.map(() => '---').join(' | ') + ' |\n';

    rows.forEach(r => {
      md += '| ' + columns.map(c => r[c] === null ? 'NULL' : r[c]).join(' | ') + ' |\n';
    });

    navigator.clipboard.writeText(md).then(() => {
      if (window.SQL_BUDDY) {
        window.SQL_BUDDY.say("📋 Copied result table as Markdown!", 3000, 'celebrate');
      }
    });
  }

  function exportAsCSV() {
    const { rows, columns } = getActiveResultRows();
    if (!rows.length) return;

    let csv = columns.join(',') + '\n';
    rows.forEach(r => {
      csv += columns.map(c => {
        const val = r[c] === null ? '' : String(r[c]);
        return val.includes(',') ? `"${val}"` : val;
      }).join(',') + '\n';
    });

    downloadFile(csv, 'query_results.csv', 'text/csv');
  }

  function exportAsJSON() {
    const { rows } = getActiveResultRows();
    const jsonStr = JSON.stringify(rows, null, 2);
    downloadFile(jsonStr, 'query_results.json', 'application/json');
  }

  function downloadFile(content, fileName, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    if (window.SQL_BUDDY) {
      window.SQL_BUDDY.say(`💾 Downloaded ${fileName} successfully!`, 3000, 'happy');
    }
  }

  // ---------------------------------------------------------------------------
  // CUSTOM DATA IMPORT MODAL (CSV, JSON, DDL)
  // ---------------------------------------------------------------------------
  let importType = 'csv';

  function openImportModal() {
    const modal = document.getElementById('studioImportModal');
    if (modal) modal.style.display = 'flex';
  }

  function closeImportModal() {
    const modal = document.getElementById('studioImportModal');
    if (modal) modal.style.display = 'none';
  }

  function handleImportOverlayClick(e) {
    if (e.target.id === 'studioImportModal') {
      closeImportModal();
    }
  }

  function switchImportTab(type) {
    importType = type;
    document.querySelectorAll('.import-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.itype === type);
    });

    const lbl = document.getElementById('importContentLabel');
    const ta = document.getElementById('importTextarea');
    if (type === 'csv') {
      if (lbl) lbl.textContent = 'Paste CSV Data (with headers):';
      if (ta) ta.placeholder = 'id,name,amount\n1,Alpha,500\n2,Beta,1200';
    } else if (type === 'json') {
      if (lbl) lbl.textContent = 'Paste JSON Array of Objects:';
      if (ta) ta.placeholder = '[{"id": 1, "ticker": "NVDA"}, {"id": 2, "ticker": "AAPL"}]';
    } else {
      if (lbl) lbl.textContent = 'Paste SQL CREATE TABLE / INSERT Statements:';
      if (ta) ta.placeholder = 'CREATE TABLE Sample (...); INSERT INTO Sample VALUES (...);';
    }
  }

  function loadSampleData() {
    const ta = document.getElementById('importTextarea');
    const nameInput = document.getElementById('importTableName');
    if (SAMPLE_IMPORTS[importType] && ta) {
      ta.value = SAMPLE_IMPORTS[importType];
      if (nameInput) {
        nameInput.value = importType === 'csv' ? 'BrokerOrders' : (importType === 'json' ? 'LiveTrades' : 'RiskBuckets');
      }
    }
  }

  function submitImport() {
    const nameInput = document.getElementById('importTableName');
    const ta = document.getElementById('importTextarea');
    const rawName = (nameInput && nameInput.value && typeof nameInput.value === 'string' && nameInput.value.trim()) || 'CustomDataset';
    const tableName = rawName.replace(/[^A-Za-z0-9_]/g, '_');
    const content = (ta && ta.value && typeof ta.value === 'string') ? ta.value.trim() : '';

    if (!content) {
      alert('Please paste dataset content before importing!');
      return;
    }

    try {
      let parsedRows = [];
      if (importType === 'csv') {
        parsedRows = parseCSVToRows(content);
      } else if (importType === 'json') {
        parsedRows = JSON.parse(content);
        if (!Array.isArray(parsedRows)) throw new Error('JSON must be an array of objects.');
      } else {
        parsedRows = parseDDLToRows(content);
      }

      if (!parsedRows || !parsedRows.length) {
        throw new Error('No valid data rows detected.');
      }

      // Inject into in-memory DATABASE
      if (!window.DATABASE) window.DATABASE = {};
      window.DATABASE[tableName] = parsedRows;
      state.activeTable = tableName;

      // Update dropdowns
      const sel = document.getElementById('studioTableSelect');
      if (sel) {
        const opt = document.createElement('option');
        opt.value = tableName;
        opt.textContent = `${tableName} (${parsedRows.length} rows)`;
        opt.selected = true;
        sel.appendChild(opt);
      }

      closeImportModal();

      // Set editor query and run
      const sql = `SELECT * FROM ${tableName} LIMIT 10;`;
      const sqlInput = document.getElementById('sqlInput');
      if (sqlInput) {
        sqlInput.value = sql;
        syncEditorLineNumbers();
        runStudioQuery(sql);
      }

      if (window.SQL_BUDDY) {
        window.SQL_BUDDY.say(`🎉 Table '${tableName}' loaded with ${parsedRows.length} rows! Query ready!`, 4500, 'celebrate');
      }
    } catch (err) {
      alert('Import failed: ' + err.message);
    }
  }

  function parseCSVToRows(csv) {
    const lines = csv.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) return [];
    const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
    const rows = [];

    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',').map(p => p.trim().replace(/^["']|["']$/g, ''));
      const row = {};
      headers.forEach((h, idx) => {
        let val = parts[idx];
        if (val !== undefined && val !== '' && !isNaN(val)) val = Number(val);
        row[h] = val;
      });
      rows.push(row);
    }
    return rows;
  }

  function parseDDLToRows(sql) {
    // Basic parser for INSERT INTO ... VALUES (...)
    const rows = [];
    const valRegex = /VALUES\s*\(([\s\S]+?)\)/gi;
    let match;
    let rowIdx = 1;

    while ((match = valRegex.exec(sql)) !== null) {
      const parts = match[1].split(',').map(p => p.trim().replace(/^["']|["']$/g, ''));
      const obj = { id: rowIdx++ };
      parts.forEach((p, idx) => {
        let v = p;
        if (!isNaN(v)) v = Number(v);
        obj['col_' + (idx + 1)] = v;
      });
      rows.push(obj);
    }

    if (!rows.length) {
      // Fallback dummy
      rows.push({ id: 1, sample_metric: 100 });
    }
    return rows;
  }

  return {
    init,
    loadQuery,
    runStudioQuery,
    diagnoseWithBloops,
    copyAsMarkdown,
    exportAsCSV,
    exportAsJSON,
    openImportModal,
    closeImportModal,
    handleImportOverlayClick,
    switchImportTab,
    loadSampleData,
    submitImport
  };

})();
