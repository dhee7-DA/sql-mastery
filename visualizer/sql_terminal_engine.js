/**
 * SQL TERMINAL & WEBASSEMBLY QUERY ENGINE
 * In-browser SQLite 3.45.2 WASM Client-Side Execution Engine
 * Offline-capable, zero latency, full DDL/DML, Window Functions & CTE support.
 */

window.SqlTerminalEngine = (function() {
  'use strict';

  let SQL = null;
  let db = null;
  let isInitialized = false;
  let isLoading = false;
  let activeSidebarTab = 'tables'; // 'tables' | 'presets'
  let cachedTables = []; // [{ name, count, columns: [{ name, type, pk }] }]
  let currentResults = null;
  let filterTerm = '';

  /**
   * Root DOM initialization
   */
  async function init() {
    if (isInitialized) return;
    const container = document.getElementById('viewSqlTerminal');
    if (!container) return;

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
    }
  }

  /**
   * Load SQLite WebAssembly module
   */
  async function loadSqliteWasm() {
    if (db) return;
    updateStatus('running', 'Loading WebAssembly binary...');

    // Try loading via window.initSqlJs
    if (typeof window.initSqlJs !== 'function') {
      throw new Error('SQLite WASM loader (sql-wasm.js) is not present on window.');
    }

    SQL = await window.initSqlJs({
      locateFile: file => {
        // First try relative path in visualizer
        return file;
      }
    });

    db = new SQL.Database();
    updateStatus('ready', 'SQLite 3.45.2 WASM Ready');
  }

  /**
   * Seed database with the 12 domain tables
   */
  function seedDatabase() {
    if (!db || !window.SQL_TERMINAL_DATA) return;
    db.run(window.SQL_TERMINAL_DATA.seedSql);
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
          // Get columns
          const colRes = db.exec(`PRAGMA table_info(${tableName});`);
          const columns = colRes && colRes[0] ? colRes[0].values.map(c => ({
            cid: c[0],
            name: c[1],
            type: c[2] || 'TEXT',
            notnull: c[3],
            dflt: c[4],
            pk: c[5]
          })) : [];

          // Get row count
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
              Full client-side SQL engine with zero network latency. 12 pre-seeded institutional tables across 5 industry domains.
            </div>
          </div>
        </div>
        <div class="terminal-hero-stats">
          <div class="terminal-stat-chip"><strong>12</strong> Production Tables</div>
          <div class="terminal-stat-chip"><strong>100%</strong> Offline Engine</div>
          <div class="terminal-stat-chip"><strong>Window &amp; CTEs</strong> Full Support</div>
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
              <strong>Sir Bloop Co-Pilot:</strong> Ready to crunch records! Press <code>Cmd+Enter</code> or click <strong>Run Query</strong> to execute against SQLite WASM.
            </div>
          </div>

          <!-- Results Grid Card -->
          <div class="terminal-results-card">
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
      // Update line numbers on input and scroll
      textarea.addEventListener('input', () => updateGutters(textarea, gutters));
      textarea.addEventListener('scroll', () => {
        if (gutters) gutters.scrollTop = textarea.scrollTop;
      });

      // Keyboard shortcuts
      textarea.addEventListener('keydown', (e) => {
        // Tab key indent
        if (e.key === 'Tab') {
          e.preventDefault();
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          textarea.value = textarea.value.substring(0, start) + '  ' + textarea.value.substring(end);
          textarea.selectionStart = textarea.selectionEnd = start + 2;
          updateGutters(textarea, gutters);
        }

        // Cmd+Enter or Ctrl+Enter to execute
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          e.preventDefault();
          executeQuery();
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
        // Grab the last query result if multi-statement
        const activeResult = results[results.length - 1];
        currentResults = activeResult;
        filterTerm = '';

        const filterInput = document.getElementById('terminalResultsFilter');
        if (filterInput) filterInput.value = '';

        updateStatus('success', `Returned ${activeResult.values.length} rows in ${durationMs}ms`);
        updateStats(activeResult.values.length, `${durationMs}ms`);
        renderResultsTable(activeResult);

        // Sir Bloop commentary
        setBloopMessage(generateSuccessCommentary(sql, activeResult.values.length, durationMs), 'happy');

        if (window.soundFX && typeof window.soundFX.playSuccess === 'function') {
          window.soundFX.playSuccess();
        }
      } else {
        // DDL or DML statement without result set (e.g., INSERT, CREATE, DROP)
        currentResults = null;
        updateStatus('success', `Query OK. Executed in ${durationMs}ms`);
        updateStats(0, `${durationMs}ms`);
        renderDmlSuccess(durationMs);
        inspectDatabaseSchema().then(() => renderSidebarContent());

        setBloopMessage(`✅ DDL/DML statement executed cleanly in ${durationMs}ms! Schema metadata refreshed.`, 'celebrate');
      }
    } catch (err) {
      const durationMs = (performance.now() - startTime).toFixed(1);
      currentResults = null;
      updateStatus('error', 'Execution Error');
      updateStats(0, `${durationMs}ms`);
      renderErrorCard(err.message);

      // Bloop diagnostic hint
      setBloopMessage(generateErrorDiagnostic(err.message, sql), 'thinking');

      if (window.soundFX && typeof window.soundFX.playError === 'function') {
        window.soundFX.playError();
      }
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
    
    // Headers
    csvContent += columns.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',') + '\r\n';
    
    // Rows
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
      'RANK', 'DENSE_RANK', 'CREATE TABLE', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE'
    ];

    // Capitalize keywords cleanly using word boundary regex
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
    if (!confirm('Reset in-memory database to default seed state? Any custom tables or updates will be reverted.')) {
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
      return `Clean relational join! Processed and returned ${rows} records in ${ms}ms.`;
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
        <div style="padding: 2.5rem; text-align: center; color: #f87171;">
          <h2>Failed to Launch SQLite WASM</h2>
          <p>${escapeHtml(msg)}</p>
        </div>
      `;
    }
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
    setSidebarTab,
    handleSidebarSearch,
    toggleTableCard,
    peekTable,
    loadPreset,
    executeQuery,
    filterResults,
    exportCsv,
    formatSql,
    clearEditor,
    resetDatabase
  };
})();
