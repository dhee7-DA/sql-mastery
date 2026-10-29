/**
 * =============================================================================
 * STUDIO WORKBENCH ENGINE (CURRICULUM PROBLEM ARENA & RELATIONAL LAB)
 * 30 Graded Problems Organized by Topic (01-10 in order) & Difficulty (Easy/Med/Hard)
 * Interactive Schema Table Inspector · Live Sample Data Preview
 * SQLite WASM In-Memory Engine · Visual Output Diff (✓ MATCH / + EXTRA / - MISSING)
 * 6-Stage Execution Pipeline Stepper · EXPLAIN Plan Tree · Deep Engine Explainer
 * =============================================================================
 */

window.StudioWorkbenchEngine = (function() {
  'use strict';

  // State
  let state = {
    activeTopicSeq: '01',
    activeDifficulty: 'all', // 'all' | 'easy' | 'medium' | 'hard'
    activeProblemId: '01_1',
    activeTable: 'CITY',
    activeDialect: 'mysql', // 'mysql' | 'postgres' | 'snowflake' | 'ansi'
    layoutMode: 'split',    // 'split' | 'editor' | 'results'
    editorMode: 'raw',      // 'raw' | 'builder'
    zenMode: false,
    activeTab: 'tabStepper', // 'tabStepper' | 'tabDiff' | 'tabExplainPlan' | 'tabExplainer' | 'tabChart'
    showSolution: false,
    showSchemaDock: true,
    testResult: null,
    isPlaying: false,
    playTimer: null
  };

  const DIALECT_SPECS = {
    mysql: {
      name: 'MySQL 8.0',
      icon: '',
      features: ['CTE Support', 'Window Functions', 'REGEXP_LIKE', 'JSON_TABLE', 'IFNULL()'],
      guidance: 'Default MySQL 8.0 engine with recursive CTEs, window frames, and JSON operators.'
    },
    postgres: {
      name: 'PostgreSQL 16',
      icon: '',
      features: ['ILIKE', 'STRING_AGG()', 'DISTINCT ON', 'GENERATE_SERIES', 'NULLS LAST'],
      guidance: 'PostgreSQL features ILIKE for case-insensitive matching and STRING_AGG() for concats.'
    },
    snowflake: {
      name: 'Snowflake',
      icon: '',
      features: ['QUALIFY Clause', 'FLATTEN()', 'IFF()', 'ZEROIFNULL', 'TRY_TO_NUMBER'],
      guidance: 'Snowflake supports QUALIFY to filter directly after window functions without wrapping CTEs!'
    },
    ansi: {
      name: 'ANSI SQL:2016',
      icon: '',
      features: ['COALESCE()', 'FETCH FIRST N ROWS', 'CASE WHEN', 'STANDARD JOINS'],
      guidance: 'Strict portable ANSI standard compliant across all modern cloud warehouses.'
    }
  };

  // Comprehensive Relational Schema Map for Inspector & Live Previews
  const TABLE_SCHEMAS = {
    CITY: {
      name: 'CITY',
      description: 'Global municipal demographic census registry',
      columns: [
        { name: 'ID', type: 'INTEGER', key: 'PK' },
        { name: 'NAME', type: 'VARCHAR(100)' },
        { name: 'COUNTRYCODE', type: 'VARCHAR(3)' },
        { name: 'DISTRICT', type: 'VARCHAR(50)' },
        { name: 'POPULATION', type: 'INTEGER' }
      ]
    },
    STATION: {
      name: 'STATION',
      description: 'Weather Observation Station geographical coordinates',
      columns: [
        { name: 'ID', type: 'INTEGER', key: 'PK' },
        { name: 'CITY', type: 'VARCHAR(50)' },
        { name: 'STATE', type: 'VARCHAR(2)' },
        { name: 'LAT_N', type: 'NUMERIC(10,4)' },
        { name: 'LONG_W', type: 'NUMERIC(10,4)' }
      ]
    },
    Employees: {
      name: 'Employees',
      description: 'Enterprise staff payroll, department, and tenure roster',
      columns: [
        { name: 'id', type: 'INTEGER', key: 'PK' },
        { name: 'first_name', type: 'VARCHAR(50)' },
        { name: 'department', type: 'VARCHAR(50)' },
        { name: 'salary', type: 'INTEGER' },
        { name: 'tenure', type: 'INTEGER (Mos)' },
        { name: 'bonus', type: 'INTEGER (Nullable)' }
      ]
    },
    Employee: {
      name: 'Employee',
      description: 'HackerRank classic employee compensation ledger',
      columns: [
        { name: 'employee_id', type: 'INTEGER', key: 'PK' },
        { name: 'name', type: 'VARCHAR(50)' },
        { name: 'months', type: 'INTEGER' },
        { name: 'salary', type: 'INTEGER' }
      ]
    },
    Customers: {
      name: 'Customers',
      description: 'Retail client account profiles and credit risk ratings',
      columns: [
        { name: 'customer_id', type: 'INTEGER', key: 'PK' },
        { name: 'first_name', type: 'VARCHAR(50)' },
        { name: 'city', type: 'VARCHAR(50)' },
        { name: 'state', type: 'VARCHAR(2)' },
        { name: 'country', type: 'VARCHAR(3)' },
        { name: 'credit_score', type: 'INTEGER' }
      ]
    },
    Orders: {
      name: 'Orders',
      description: 'Customer order transaction ledger and fulfillment status',
      columns: [
        { name: 'order_id', type: 'INTEGER', key: 'PK' },
        { name: 'order_total', type: 'NUMERIC(10,2)' },
        { name: 'is_prime_member', type: 'BOOLEAN' },
        { name: 'destination_zip', type: 'VARCHAR(10)' },
        { name: 'order_status', type: 'VARCHAR(30)' }
      ]
    },
    TRIANGLES: {
      name: 'TRIANGLES',
      description: 'Geometric 3-sided dimension coordinates (A, B, C)',
      columns: [
        { name: 'A', type: 'INTEGER' },
        { name: 'B', type: 'INTEGER' },
        { name: 'C', type: 'INTEGER' }
      ]
    },
    Functions: {
      name: 'Functions',
      description: 'Coordinate integer relation pairs for symmetric analysis',
      columns: [
        { name: 'X', type: 'INTEGER' },
        { name: 'Y', type: 'INTEGER' }
      ]
    },
    Hackers: {
      name: 'Hackers',
      description: 'Competitive coding hacker profiles',
      columns: [
        { name: 'hacker_id', type: 'INTEGER', key: 'PK' },
        { name: 'name', type: 'VARCHAR(50)' }
      ]
    },
    Challenges: {
      name: 'Challenges',
      description: 'Algorithm challenge submissions authored per hacker',
      columns: [
        { name: 'challenge_id', type: 'INTEGER', key: 'PK' },
        { name: 'hacker_id', type: 'INTEGER', key: 'FK' }
      ]
    },
    Country: {
      name: 'Country',
      description: 'Sovereign nation continent registry for join verification',
      columns: [
        { name: 'CODE', type: 'VARCHAR(3)', key: 'PK' },
        { name: 'NAME', type: 'VARCHAR(100)' },
        { name: 'CONTINENT', type: 'VARCHAR(50)' }
      ]
    },
    STUDENTS: {
      name: 'STUDENTS',
      description: 'Academic grade evaluation roster',
      columns: [
        { name: 'ID', type: 'INTEGER', key: 'PK' },
        { name: 'Name', type: 'VARCHAR(50)' },
        { name: 'Marks', type: 'INTEGER' }
      ]
    }
  };

  // Helper to extract all 30 problems from MASTERY_COURSE_DATA
  function getAllProblems() {
    const rawData = (typeof window !== 'undefined' && window.MASTERY_COURSE_DATA) || [];
    const problems = [];

    rawData.forEach(topic => {
      const topicSeq = topic.seq || '01';
      const topicTitle = topic.title || ('Topic ' + topicSeq);
      const list = topic.problems || (topic.problem ? [topic.problem] : []);

      list.forEach((p, idx) => {
        const tierId = p.tierId || (idx + 1);
        const id = topicSeq + '_' + tierId;
        problems.push({
          id,
          topicSeq,
          topicTitle,
          topicShortName: topic.shortName || (topicSeq + '. ' + topicTitle),
          tierId,
          tierName: p.tierName || ('Tier ' + tierId),
          difficulty: (p.difficulty || 'easy').toLowerCase(),
          badgeClass: p.badgeClass || (p.difficulty || 'easy').toLowerCase(),
          title: p.title || ('Problem ' + id),
          targetTable: p.targetTable || 'Employees',
          spec: p.spec || '',
          starterSql: p.starterSql || 'SELECT * FROM ' + (p.targetTable || 'Employees') + ';',
          expectedSolutionSql: p.expectedSolutionSql || p.starterSql,
          expectedRowCount: p.expectedRowCount !== undefined ? p.expectedRowCount : null,
          deepTheory: topic.deepTheory || [],
          interviewDefense: topic.interviewDefense || null
        });
      });
    });

    return problems;
  }

  function getProblemById(id) {
    const all = getAllProblems();
    return all.find(p => p.id === id) || all[0];
  }

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

    const currentProb = getProblemById(state.activeProblemId);
    if (currentProb) {
      state.activeTable = currentProb.targetTable;
      state.activeTopicSeq = currentProb.topicSeq;
    }

    renderWorkbenchShell(container);
    bindStudioEvents();
    syncEditorLineNumbers();
    initSqlSyntaxHighlighter();

    // Run initial query
    const sqlInput = document.getElementById('sqlInput');
    if (sqlInput && sqlInput.value && sqlInput.value.trim()) {
      runStudioQuery(sqlInput.value);
    }
  }

  // ---------------------------------------------------------------------------
  // RENDER WORKBENCH SHELL
  // ---------------------------------------------------------------------------
  function renderWorkbenchShell(container) {
    const allProblems = getAllProblems();
    const currentProb = getProblemById(state.activeProblemId);
    const dbTables = Object.keys(TABLE_SCHEMAS);
    const currentTable = state.activeTable || currentProb.targetTable || 'CITY';

    // Unique topics list
    const topicsMap = new Map();
    allProblems.forEach(p => {
      if (!topicsMap.has(p.topicSeq)) {
        topicsMap.set(p.topicSeq, { seq: p.topicSeq, title: p.topicTitle, shortName: p.topicShortName });
      }
    });
    const topicsList = Array.from(topicsMap.values());

    // Filter problems
    const filteredProblems = allProblems.filter(p => {
      const matchTopic = state.activeDifficulty === 'all' ? (p.topicSeq === state.activeTopicSeq) : true;
      const matchDiff = state.activeDifficulty === 'all' ? true : (p.difficulty === state.activeDifficulty);
      return matchTopic && matchDiff;
    });

    // Schema preview data
    const schema = TABLE_SCHEMAS[currentTable] || { name: currentTable, description: 'Table schema', columns: [] };
    const rawRows = (window.DATABASE && window.DATABASE[currentTable]) || [];
    const sampleRows = rawRows.slice(0, 6);

    container.innerHTML = `
      <section id="section-studio" class="section-studio-workspace" style="display:contents;">
      <div class="studio-workbench-wrapper ${state.zenMode ? 'zen-mode' : ''}">
        
        <!-- Topbar Header -->
        <header class="studio-topbar">
          <div class="studio-topbar-left">
            <div class="studio-brand">
              <span class="studio-brand-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
              </span>
              <div>
                <h1 class="studio-brand-title">Section Studio</h1>
                <span class="studio-brand-pill">Relational Arena · 30 Problems</span>
              </div>
            </div>

            <div class="studio-bar-sep"></div>

            <!-- Table Quick Switcher -->
            <div class="studio-select-group" title="Active Schema Table">
              <span class="studio-select-label">Table:</span>
              <select id="studioTableSelect" class="studio-compact-select">
                ${dbTables.map(t => {
                  const cnt = (window.DATABASE && window.DATABASE[t] && window.DATABASE[t].length) || 0;
                  return `<option value="${t}" ${t === currentTable ? 'selected' : ''}>${t} (${cnt} rows)</option>`;
                }).join('')}
              </select>
            </div>
          </div>

          <!-- Dialect Switcher -->
          <div class="studio-dialect-group">
            ${Object.keys(DIALECT_SPECS).map(dKey => {
              const d = DIALECT_SPECS[dKey];
              const isActive = state.activeDialect === dKey;
              return `
                <button class="dialect-pill ${isActive ? 'active' : ''}" data-dialect="${dKey}" title="${d.guidance}">
                  <span>${d.name}</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Layout & Zen Controls -->
          <div class="studio-topbar-right">
            <div class="studio-layout-group">
              <button class="studio-layout-btn ${state.layoutMode === 'split' ? 'active' : ''}" data-layout="split" title="50/50 Split View">
                <span>◧ Split</span>
              </button>
              <button class="studio-layout-btn ${state.layoutMode === 'editor' ? 'active' : ''}" data-layout="editor" title="Full Editor">
                <span>◨ Editor</span>
              </button>
              <button class="studio-layout-btn ${state.layoutMode === 'results' ? 'active' : ''}" data-layout="results" title="Full Results">
                <span>◩ Results</span>
              </button>
            </div>

            <button class="studio-zen-btn ${state.zenMode ? 'active' : ''}" id="btnStudioZen" title="Zen Focus Mode">
              <span>⛶ Zen</span>
            </button>
          </div>
        </header>

        <!-- PROBLEM ARENA & TOPIC NAVIGATOR -->
        <section class="studio-problem-hub">
          <div class="studio-problem-hub-top">
            <div class="studio-hub-title-wrap">
              <span class="studio-hub-badge">Query Problem Arena</span>
              <span class="studio-hub-title">Curriculum Topics &amp; Graded Problem Tiers</span>
              <span class="studio-hub-meta">(30 Graded Problems across 10 Topics in Sequential Order)</span>
            </div>

            <!-- Difficulty Segment Filters -->
            <div class="studio-diff-tabs">
              <button class="diff-filter-btn ${state.activeDifficulty === 'all' ? 'active' : ''}" data-diff="all">All (30)</button>
              <button class="diff-filter-btn easy ${state.activeDifficulty === 'easy' ? 'active' : ''}" data-diff="easy">Easy (10)</button>
              <button class="diff-filter-btn medium ${state.activeDifficulty === 'medium' ? 'active' : ''}" data-diff="medium">Medium (10)</button>
              <button class="diff-filter-btn hard ${state.activeDifficulty === 'hard' ? 'active' : ''}" data-diff="hard">Hard (10)</button>
            </div>
          </div>

          <!-- Topic Selector Sequential Rail (Topics 01-10 in Order) -->
          <div class="studio-topic-rail" id="studioTopicRail">
            ${topicsList.map(t => {
              const isActive = t.seq === state.activeTopicSeq;
              return `
                <button class="studio-topic-pill ${isActive ? 'active' : ''}" data-topic="${t.seq}" title="${t.title}">
                  <span class="studio-topic-num">${t.seq}</span>
                  <span>${t.title}</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Problem Cards Carousel / Grid -->
          <div class="studio-problems-track" id="studioProblemsTrack">
            ${filteredProblems.map(p => {
              const isSelected = p.id === state.activeProblemId;
              return `
                <div class="studio-problem-card ${isSelected ? 'active' : ''}" data-problemid="${p.id}">
                  <div class="problem-card-top">
                    <span class="problem-topic-tag">Topic ${p.topicSeq} · Tier ${p.tierId}</span>
                    <span class="problem-tier-badge ${p.difficulty}">${p.difficulty}</span>
                  </div>
                  <h3 class="problem-card-title" title="${p.title}">${p.title}</h3>
                  <div class="problem-card-footer">
                    <span>Target: <strong class="problem-card-table">${p.targetTable}</strong></span>
                    <span>${p.expectedRowCount !== null ? (p.expectedRowCount + ' rows') : ''}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </section>

        <!-- ACTIVE PROBLEM DOSSIER & SPEC CARD -->
        <section class="studio-active-dossier" id="studioActiveDossier">
          <div class="dossier-headline-row">
            <div class="dossier-title-area">
              <div class="dossier-meta-tags">
                <span class="status-pill status-pill-accent">Topic ${currentProb.topicSeq}: ${currentProb.topicTitle}</span>
                <span class="problem-tier-badge ${currentProb.difficulty}">${currentProb.tierName} (${currentProb.difficulty.toUpperCase()})</span>
                <span class="status-pill" style="font-family:var(--font-mono, monospace);">Target Table: <strong>${currentProb.targetTable}</strong></span>
                ${currentProb.expectedRowCount !== null ? `<span class="status-pill" style="background:rgba(16,185,129,0.1);color:#10b981;border:1px solid rgba(16,185,129,0.3);">Expected: ${currentProb.expectedRowCount} Rows</span>` : ''}
              </div>
              <h2 style="font-size:15px; font-weight:700; margin:4px 0 0 0; color:var(--text-primary);">${currentProb.title}</h2>
            </div>

            <!-- Action Controls -->
            <div class="dossier-actions-row">
              <button id="btnStudioRunProblem" class="dossier-btn primary" title="Execute Query (Ctrl + Enter)">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                <span>Run Query</span>
              </button>
              <button id="btnStudioVerifyProblem" class="dossier-btn verify" title="Compare against expected solution">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>Verify Solution</span>
              </button>
              <button id="btnStudioToggleSolution" class="dossier-btn" title="Toggle Expected SQL Solution">
                <span>${state.showSolution ? 'Hide Solution' : 'Show Solution'}</span>
              </button>
              <button id="btnStudioResetProblem" class="dossier-btn" title="Reset to Starter SQL">
                <span>Reset Starter</span>
              </button>
              <button id="btnStudioToggleSchema" class="dossier-btn" title="Toggle Schema Inspector">
                <span>${state.showSchemaDock ? 'Hide Schema' : 'Inspect Schema'}</span>
              </button>
            </div>
          </div>

          <!-- Problem Spec Description -->
          <div class="dossier-spec-text">
            <strong>Task:</strong> ${currentProb.spec}
          </div>

          <!-- Optional Expected Solution Box -->
          ${state.showSolution ? `
            <div style="margin-top:10px; padding:10px 14px; background:rgba(37,99,235,0.06); border:1px solid rgba(37,99,235,0.25); border-radius:6px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span style="font-size:11px; font-weight:700; color:#2563eb; text-transform:uppercase;">Canonical Expected Solution:</span>
                <button id="btnLoadSolutionToEditor" class="micro-text-btn" style="color:#2563eb; font-weight:600; cursor:pointer; background:none; border:none;">Load into Editor &rarr;</button>
              </div>
              <pre style="margin:0; font-size:11.5px; font-family:var(--font-mono, monospace); color:var(--text-primary); white-space:pre-wrap;">${currentProb.expectedSolutionSql}</pre>
            </div>
          ` : ''}
        </section>

        <!-- INTERACTIVE REAL SCHEMA TABLES INSPECTOR DOCK -->
        ${state.showSchemaDock ? `
          <section class="studio-schema-dock" id="studioSchemaDock">
            <div class="schema-dock-header">
              <div class="schema-dock-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>
                <span>Database Schema: <strong>${schema.name}</strong></span>
                <span class="status-pill" style="font-size:10px;">${schema.columns.length} Columns · ${rawRows.length} Total Tuples</span>
              </div>
              <span style="font-size:11px; color:var(--text-muted);">Click column pills to insert into editor at cursor position</span>
            </div>

            <!-- Columns Grid -->
            <div class="schema-cols-grid">
              ${schema.columns.map(c => `
                <button class="schema-col-card" onclick="window.StudioWorkbenchEngine.insertColumnName('${c.name}')" title="Click to insert ${c.name} into editor">
                  <span class="col-name">+ ${c.name}</span>
                  <span class="col-type">${c.type} ${c.key ? ('[' + c.key + ']') : ''}</span>
                </button>
              `).join('')}
            </div>

            <!-- Live Sample Data Preview Table -->
            <div class="schema-sample-preview">
              <table class="schema-sample-table">
                <thead>
                  <tr>
                    ${schema.columns.map(c => `<th>${c.name}</th>`).join('')}
                  </tr>
                </thead>
                <tbody>
                  ${sampleRows.map(r => `
                    <tr>
                      ${schema.columns.map(c => `<td>${r[c.name] !== undefined ? String(r[c.name]) : 'NULL'}</td>`).join('')}
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </section>
        ` : ''}

        <!-- MAIN 50/50 WORKSPACE GRID -->
        <main class="studio-workspace-grid layout-${state.layoutMode}">
          
          <!-- Left Column: Code Editor -->
          <section class="studio-editor-column">
            <div class="studio-pane-header">
              <div class="studio-mode-toggle">
                <button class="mode-toggle-btn active">
                  <span>SQL Editor</span>
                </button>
              </div>

              <div class="studio-editor-tools">
                <button id="btnStudioFormatSQL" class="studio-micro-btn" title="Prettify &amp; format SQL (Alt+Shift+F)">
                  <span>Format</span>
                </button>
                <button id="btnStudioClearSQL" class="studio-micro-btn" title="Clear editor">
                  <span>✕ Clear</span>
                </button>
              </div>
            </div>

            <!-- Quick Column Inserter Strip -->
            <div class="studio-column-pills-bar" id="studioColumnPillsBar">
              <span class="col-pill-label">Insert Column:</span>
              <div class="col-pill-list" id="studioColPillsList">
                ${schema.columns.map(c => `
                  <button type="button" class="col-pill-btn" onclick="window.StudioWorkbenchEngine.insertColumnName('${c.name}')" title="Insert ${c.name}">+ ${c.name}</button>
                `).join('')}
              </div>
            </div>

            <!-- Raw SQL Editor Body -->
            <div class="studio-editor-body" id="rawSqlContainer" style="display: flex;">
              <div class="code-editor-wrapper">
                <div class="editor-gutter" id="studioLineNumbers">1</div>
                <textarea id="sqlInput" class="studio-code-textarea" spellcheck="false" wrap="off" placeholder="-- Write SQL query here...">${(currentProb.starterSql || 'SELECT * FROM ' + currentTable + ';').trim()}</textarea>
              </div>
            </div>

            <!-- Physical Query Execution Telemetry -->
            <div class="query-telemetry-bar" id="queryTelemetryBar">
              <div class="telemetry-chip plan-chip" id="telemetryPlanChip" title="Click to view interactive Execution Plan Tree" style="cursor: pointer;" onclick="window.StudioWorkbenchEngine.setStageTab('tabExplainPlan');">
                <span class="telemetry-label">PLAN:</span>
                <span class="telemetry-val" id="telemetryPlanVal">INDEX RANGE SEEK</span>
              </div>
              <div class="telemetry-chip latency-chip" id="telemetryLatencyChip" title="Estimated Engine Execution Latency">
                <span class="telemetry-label">LATENCY:</span>
                <span class="telemetry-val" id="telemetryLatencyVal">0.8 ms</span>
              </div>
              <div class="telemetry-chip buffer-chip" id="telemetryBufferChip" title="Buffer Pool Hit Ratio">
                <span class="telemetry-label">BUFFER HIT:</span>
                <span class="telemetry-val" id="telemetryBufferVal">100% (RAM)</span>
              </div>
              <div class="telemetry-chip select-chip" id="telemetrySelectChip" title="Row Filter Selectivity Ratio">
                <span class="telemetry-label">ROWS:</span>
                <span class="telemetry-val" id="telemetrySelectVal">${sampleRows.length} Rows</span>
              </div>
            </div>

            <div class="editor-statusbar">
              <span class="shortcut-legend">
                <kbd>Ctrl</kbd> + <kbd>Enter</kbd> Run · 
                <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd> Format
              </span>
              <div style="display: flex; align-items: center; gap: 6px;">
                <button id="btnFormatSQLInline" class="btn-format-inline" onclick="window.StudioWorkbenchEngine.formatCurrentSql();" title="Prettify SQL">
                  Prettify SQL
                </button>
                <button id="btnExplainPlanInline" class="btn-format-inline" style="background: rgba(16, 185, 129, 0.12); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3);" onclick="window.StudioWorkbenchEngine.setStageTab('tabExplainPlan');" title="Inspect EXPLAIN Tree">
                  EXPLAIN Tree
                </button>
              </div>
            </div>
          </section>

          <!-- Right Column: Execution Lifecycle & Visualization Panels -->
          <section class="studio-stage-column">
            
            <!-- 6-Stage Pipeline Stepper Track -->
            <div class="card stepper-card">
              <div class="stepper-top">
                <div class="stepper-meta">
                  <span class="step-counter" id="stepCounterLabel">STEP 1 OF 6</span>
                  <h2 class="step-heading" id="stepHeadingLabel">FROM Clause: Table Scan</h2>
                </div>

                <div class="stepper-controls">
                  <button id="btnPrevStep" class="icon-btn" title="Previous Step">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
                  </button>
                  <button id="btnPlayPause" class="play-btn">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" id="playIcon"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    <span id="playBtnText">Play</span>
                  </button>
                  <button id="btnNextStep" class="icon-btn" title="Next Step">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
                  <button id="btnResetStep" class="icon-btn" title="Reset Step">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                  </button>
                </div>
              </div>

              <!-- Linear Track Steps -->
              <div class="stepper-track" id="stepperTrack">
                <button class="track-node active" data-step="0">
                  <span class="node-num">01</span>
                  <span class="node-name">FROM</span>
                </button>
                <div class="track-line"></div>
                <button class="track-node" data-step="1">
                  <span class="node-num">02</span>
                  <span class="node-name">WHERE</span>
                </button>
                <div class="track-line"></div>
                <button class="track-node" data-step="2">
                  <span class="node-num">03</span>
                  <span class="node-name">GROUP BY</span>
                </button>
                <div class="track-line"></div>
                <button class="track-node" data-step="3">
                  <span class="node-num">04</span>
                  <span class="node-name">HAVING</span>
                </button>
                <div class="track-line"></div>
                <button class="track-node" data-step="4">
                  <span class="node-num">05</span>
                  <span class="node-name">SELECT</span>
                </button>
                <div class="track-line"></div>
                <button class="track-node" data-step="5">
                  <span class="node-num">06</span>
                  <span class="node-name">ORDER/LIMIT</span>
                </button>
              </div>

              <div class="step-explanation" id="stepExplanationText">
                Loading table buffer into memory.
              </div>
            </div>

            <!-- Stage Viewer Tabs -->
            <div class="card viewer-card">
              <div class="viewer-tabs">
                <div class="tab-group">
                  <button class="tab-item ${state.activeTab === 'tabStepper' ? 'active' : ''}" data-tab="tabStepper">Data Grid</button>
                  <button class="tab-item ${state.activeTab === 'tabDiff' ? 'active' : ''}" data-tab="tabDiff">
                    Visual Diff
                    ${state.testResult ? (`<span class="hot-badge" style="background:${state.testResult.passed ? 'rgba(22,163,74,0.15)' : 'rgba(220,38,38,0.15)'}; color:${state.testResult.passed ? '#16a34a' : '#dc2626'}; font-size:9px; padding:1px 5px; border-radius:4px; font-weight:700; margin-left:4px;">${state.testResult.passed ? 'PASSED' : 'DIFF'}</span>`) : ''}
                  </button>
                  <button class="tab-item ${state.activeTab === 'tabExplainPlan' ? 'active' : ''}" data-tab="tabExplainPlan">
                    Execution Plan Tree
                    <span class="hot-badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); font-size: 9px; padding: 1px 5px; border-radius: 4px; font-weight: 700; margin-left: 4px;">EXPLAIN</span>
                  </button>
                  <button class="tab-item ${state.activeTab === 'tabExplainer' ? 'active' : ''}" data-tab="tabExplainer">Engine &amp; Traps Explainer</button>
                </div>
                <div class="row-count-tag" id="rowCounterBadge">0 rows</div>
              </div>

              <div class="viewer-content">
                <!-- Tab 1: Live Stepper Data Grid -->
                <div class="tab-pane ${state.activeTab === 'tabStepper' ? 'active' : ''}" id="tabStepper">
                  <div class="table-scroll-wrapper" id="stepperTableContainer"></div>
                </div>

                <!-- Tab 2: Visual Relational Output Diff Grid -->
                <div class="tab-pane ${state.activeTab === 'tabDiff' ? 'active' : ''}" id="tabDiff">
                  <div id="studioDiffContainer" class="studio-diff-container">
                    ${renderDiffContentHtml()}
                  </div>
                </div>

                <!-- Tab 3: Visual Execution Plan Tree -->
                <div class="tab-pane ${state.activeTab === 'tabExplainPlan' ? 'active' : ''}" id="tabExplainPlan">
                  <div class="explain-plan-tree-container" id="explainPlanTreeContainer"></div>
                </div>

                <!-- Tab 4: Deep Under-the-Hood Engine Explainer -->
                <div class="tab-pane ${state.activeTab === 'tabExplainer' ? 'active' : ''}" id="tabExplainer">
                  <div id="studioExplainerContainer" style="padding: 16px; overflow-y: auto; max-height: 480px;">
                    ${renderEngineExplainerHtml(currentProb)}
                  </div>
                </div>
              </div>
            </div>

          </section>
        </main>

      </div>
      </section>
    `;
  }

  // ---------------------------------------------------------------------------
  // DIFF & EXPLAINER HTML GENERATORS
  // ---------------------------------------------------------------------------
  function renderDiffContentHtml() {
    if (!state.testResult) {
      return `
        <div style="padding: 32px; text-align: center; color: var(--text-muted);">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 10px auto; opacity: 0.5;"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
          <div style="font-weight: 600; font-size: 13px; color: var(--text-primary); margin-bottom: 4px;">Click 'Verify Solution' to run differential test</div>
          <p style="font-size: 11.5px; max-width: 360px; margin: 0 auto;">Evaluates your SQL output against the canonical solution and marks matches, missing rows, and extra unexpected tuples.</p>
        </div>
      `;
    }

    const res = state.testResult;
    const diff = res.diff || {};
    const diffRows = diff.diffRows || [];
    const allCols = diff.allCols || res.userCols || [];

    return `
      <div class="studio-verification-banner ${res.passed ? 'pass' : 'fail'}">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span>${res.passed ? '✓ Test Passed: All Tuples Match Expected Output!' : '✕ Solution Diff Mismatch'}</span>
        </div>
        <div class="banner-stats">
          <span>Match: <strong>${diff.matchCount || 0}</strong></span> ·
          <span>Extra: <strong>${diff.extraCount || 0}</strong></span> ·
          <span>Missing: <strong>${diff.missingCount || 0}</strong></span> ·
          <span>Latency: <strong>${res.latencyMs} ms</strong></span>
        </div>
      </div>

      <div style="overflow-x: auto; border: 1px solid var(--border-default); border-radius: 6px;">
        <table class="studio-diff-table">
          <thead>
            <tr>
              <th style="width: 80px;">Status</th>
              ${allCols.map(c => `<th>${c}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${diffRows.map(dr => {
              const row = dr.row || {};
              const badgeClass = dr.status || 'match';
              return `
                <tr class="diff-row ${badgeClass}">
                  <td><span class="diff-status-badge ${badgeClass}">${dr.badge}</span></td>
                  ${allCols.map(c => `<td>${row[c] !== undefined ? String(row[c]) : 'NULL'}</td>`).join('')}
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderEngineExplainerHtml(prob) {
    const defense = prob.interviewDefense;
    const deepTheory = prob.deepTheory || [];

    return `
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <!-- Relational Execution Flow -->
        <div style="background: var(--bg-card-subtle, #f8f8f9); padding: 14px; border-radius: 8px; border: 1px solid var(--border-subtle, #e4e4e7);">
          <h4 style="margin: 0 0 6px 0; font-size: 13px; font-weight: 700; color: var(--text-primary);">Physical Execution Lifecycle for Topic ${prob.topicSeq}</h4>
          <p style="margin: 0 0 8px 0; font-size: 12px; color: var(--text-secondary); line-height: 1.4;">
            SQL is declarative: written syntax starts with <code>SELECT</code>, but physical relational engines (MySQL, PostgreSQL, SQLite, Snowflake) execute in strict order:
          </p>
          <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap; font-family: var(--font-mono, monospace); font-size: 11px;">
            <span style="padding: 2px 7px; background: #e0e7ff; color: #3730a3; border-radius: 4px; font-weight: 700;">1. FROM</span> &rarr;
            <span style="padding: 2px 7px; background: #fee2e2; color: #991b1b; border-radius: 4px; font-weight: 700;">2. WHERE</span> &rarr;
            <span style="padding: 2px 7px; background: #fef3c7; color: #92400e; border-radius: 4px; font-weight: 700;">3. GROUP BY</span> &rarr;
            <span style="padding: 2px 7px; background: #e0f2fe; color: #075985; border-radius: 4px; font-weight: 700;">4. HAVING</span> &rarr;
            <span style="padding: 2px 7px; background: #dcfce7; color: #166534; border-radius: 4px; font-weight: 700;">5. SELECT</span> &rarr;
            <span style="padding: 2px 7px; background: #f3e8ff; color: #6b21a8; border-radius: 4px; font-weight: 700;">6. ORDER &amp; LIMIT</span>
          </div>
        </div>

        ${defense ? `
          <!-- Interview Gotcha & Spoken Defense -->
          <div style="background: rgba(217, 119, 6, 0.05); padding: 14px; border-radius: 8px; border: 1px solid rgba(217, 119, 6, 0.25);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #d97706; font-family: var(--font-mono, monospace);">FAANG Interview Defense · ${defense.difficulty || 'L4/L5 Standard'}</span>
              <span style="font-size: 10px; font-weight: 600; color: var(--text-muted);">Concept: ${defense.testedConcept || 'Relational Execution'}</span>
            </div>
            <h4 style="margin: 0 0 6px 0; font-size: 13px; font-weight: 700; color: var(--text-primary);">Q: ${defense.question}</h4>
            <p style="margin: 0 0 8px 0; font-size: 12px; color: var(--text-secondary); line-height: 1.45;">${defense.spokenAnswer}</p>
            ${defense.codeSnippet ? `
              <pre style="margin: 0; padding: 8px 12px; background: #1e1e2e; color: #cdd6f4; border-radius: 5px; font-size: 11px; font-family: var(--font-mono, monospace); overflow-x: auto;">${defense.codeSnippet}</pre>
            ` : ''}
          </div>
        ` : ''}

        ${deepTheory && deepTheory.length > 0 ? `
          <!-- Deep Theory Module -->
          <div style="background: var(--bg-card-subtle, #f8f8f9); padding: 14px; border-radius: 8px; border: 1px solid var(--border-subtle, #e4e4e7);">
            <h4 style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; color: var(--text-primary);">${deepTheory[0].title}</h4>
            <div style="font-size: 12px; color: var(--text-secondary); line-height: 1.45; white-space: pre-wrap;">${deepTheory[0].body}</div>
          </div>
        ` : ''}
      </div>
    `;
  }

  // ---------------------------------------------------------------------------
  // EVENT BINDINGS
  // ---------------------------------------------------------------------------
  function bindStudioEvents() {
    // Topic Pill Click
    const topicRail = document.getElementById('studioTopicRail');
    if (topicRail) {
      topicRail.addEventListener('click', (e) => {
        const btn = e.target.closest('.studio-topic-pill');
        if (!btn) return;
        const topicSeq = btn.dataset.topic;
        if (topicSeq) {
          state.activeTopicSeq = topicSeq;
          const all = getAllProblems();
          const firstProb = all.find(p => p.topicSeq === topicSeq && (state.activeDifficulty === 'all' || p.difficulty === state.activeDifficulty));
          if (firstProb) {
            selectProblem(firstProb.id);
          } else {
            init();
          }
        }
      });
    }

    // Difficulty Filter Click
    document.querySelectorAll('.diff-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const diff = btn.dataset.diff;
        if (diff) {
          state.activeDifficulty = diff;
          const all = getAllProblems();
          const matchProb = all.find(p => (diff === 'all' || p.difficulty === diff) && (diff === 'all' ? p.topicSeq === state.activeTopicSeq : true));
          if (matchProb) {
            selectProblem(matchProb.id);
          } else {
            init();
          }
        }
      });
    });

    // Problem Card Click
    const problemsTrack = document.getElementById('studioProblemsTrack');
    if (problemsTrack) {
      problemsTrack.addEventListener('click', (e) => {
        const card = e.target.closest('.studio-problem-card');
        if (!card) return;
        const probId = card.dataset.problemid;
        if (probId) selectProblem(probId);
      });
    }

    // Run Problem Button
    const btnRun = document.getElementById('btnStudioRunProblem');
    if (btnRun) {
      btnRun.addEventListener('click', () => {
        const sqlInput = document.getElementById('sqlInput');
        if (sqlInput) runStudioQuery(sqlInput.value);
      });
    }

    // Verify Problem Button
    const btnVerify = document.getElementById('btnStudioVerifyProblem');
    if (btnVerify) {
      btnVerify.addEventListener('click', () => {
        verifyCurrentProblem();
      });
    }

    // Toggle Solution Button
    const btnToggleSol = document.getElementById('btnStudioToggleSolution');
    if (btnToggleSol) {
      btnToggleSol.addEventListener('click', () => {
        state.showSolution = !state.showSolution;
        init();
      });
    }

    // Load Solution into Editor Link
    const btnLoadSol = document.getElementById('btnLoadSolutionToEditor');
    if (btnLoadSol) {
      btnLoadSol.addEventListener('click', () => {
        const prob = getProblemById(state.activeProblemId);
        const sqlInput = document.getElementById('sqlInput');
        if (prob && sqlInput) {
          sqlInput.value = prob.expectedSolutionSql;
          syncEditorLineNumbers();
          runStudioQuery(sqlInput.value);
        }
      });
    }

    // Reset Problem Button
    const btnReset = document.getElementById('btnStudioResetProblem');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        const prob = getProblemById(state.activeProblemId);
        const sqlInput = document.getElementById('sqlInput');
        if (prob && sqlInput) {
          sqlInput.value = prob.starterSql;
          state.testResult = null;
          syncEditorLineNumbers();
          runStudioQuery(sqlInput.value);
        }
      });
    }

    // Toggle Schema Dock Button
    const btnToggleSchema = document.getElementById('btnStudioToggleSchema');
    if (btnToggleSchema) {
      btnToggleSchema.addEventListener('click', () => {
        state.showSchemaDock = !state.showSchemaDock;
        init();
      });
    }

    // Table Selector Change
    const tableSelect = document.getElementById('studioTableSelect');
    if (tableSelect) {
      tableSelect.addEventListener('change', (e) => {
        state.activeTable = e.target.value;
        init();
      });
    }

    // Dialect Switcher
    document.querySelectorAll('.dialect-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeDialect = btn.dataset.dialect || 'mysql';
        document.querySelectorAll('.dialect-pill').forEach(b => b.classList.toggle('active', b === btn));
      });
    });

    // Layout Switcher
    document.querySelectorAll('.studio-layout-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const layout = btn.dataset.layout;
        if (layout) {
          state.layoutMode = layout;
          const grid = document.querySelector('.studio-workspace-grid');
          if (grid) {
            grid.className = 'studio-workspace-grid layout-' + layout;
          }
          document.querySelectorAll('.studio-layout-btn').forEach(b => b.classList.toggle('active', b === btn));
        }
      });
    });

    // Zen Mode
    const btnZen = document.getElementById('btnStudioZen');
    if (btnZen) {
      btnZen.addEventListener('click', () => {
        state.zenMode = !state.zenMode;
        const wrap = document.querySelector('.studio-workbench-wrapper');
        if (wrap) wrap.classList.toggle('zen-mode', state.zenMode);
        btnZen.classList.toggle('active', state.zenMode);
      });
    }

    // Format SQL Tool
    const btnFormat = document.getElementById('btnStudioFormatSQL');
    if (btnFormat) {
      btnFormat.addEventListener('click', () => formatCurrentSql());
    }

    // Clear SQL Tool
    const btnClear = document.getElementById('btnStudioClearSQL');
    if (btnClear) {
      btnClear.addEventListener('click', () => {
        const sqlInput = document.getElementById('sqlInput');
        if (sqlInput) {
          sqlInput.value = '';
          syncEditorLineNumbers();
        }
      });
    }

    // Stage Tabs
    document.querySelectorAll('.tab-item').forEach(tab => {
      tab.addEventListener('click', () => {
        const tabKey = tab.dataset.tab;
        if (tabKey) setStageTab(tabKey);
      });
    });

    // Stepper Controls
    const btnNext = document.getElementById('btnNextStep');
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        if (typeof window.nextStep === 'function') window.nextStep();
      });
    }
    const btnPrev = document.getElementById('btnPrevStep');
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        if (typeof window.prevStep === 'function') window.prevStep();
      });
    }
    const btnResetStep = document.getElementById('btnResetStep');
    if (btnResetStep) {
      btnResetStep.addEventListener('click', () => {
        if (typeof window.setStep === 'function') window.setStep(0);
      });
    }
    const btnPlay = document.getElementById('btnPlayPause');
    if (btnPlay) {
      btnPlay.addEventListener('click', () => togglePlayStepper());
    }

    // SQL Textarea Shortcuts
    const sqlInput = document.getElementById('sqlInput');
    if (sqlInput) {
      sqlInput.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          e.preventDefault();
          runStudioQuery(sqlInput.value);
        } else if (e.altKey && e.shiftKey && (e.key === 'F' || e.key === 'f')) {
          e.preventDefault();
          formatCurrentSql();
        }
      });
      sqlInput.addEventListener('input', () => syncEditorLineNumbers());
      sqlInput.addEventListener('scroll', () => {
        const gutter = document.getElementById('studioLineNumbers');
        if (gutter) gutter.scrollTop = sqlInput.scrollTop;
      });
    }
  }

  // Select problem helper
  function selectProblem(probId) {
    state.activeProblemId = probId;
    state.testResult = null;
    const prob = getProblemById(probId);
    if (prob) {
      state.activeTable = prob.targetTable;
      state.activeTopicSeq = prob.topicSeq;
    }
    init();
  }

  // ---------------------------------------------------------------------------
  // QUERY EXECUTION & VERIFICATION
  // ---------------------------------------------------------------------------
  function runStudioQuery(sql) {
    if (!sql || !sql.trim()) return;
    const t0 = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();

    try {
      if (typeof window.parseAndBuildPipeline === 'function') {
        window.parseAndBuildPipeline(sql);
      }

      const t1 = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
      const latencyMs = Math.max(0.1, Math.round((t1 - t0) * 100) / 100);

      const latEl = document.getElementById('telemetryLatencyVal');
      if (latEl) latEl.textContent = latencyMs + ' ms';

      const steps = (window.EngineState && window.EngineState.steps) || [];
      const lastStep = steps.length ? steps[steps.length - 1] : null;
      const rowCount = lastStep ? (lastStep.rows || []).length : 0;

      const rowBadge = document.getElementById('rowCounterBadge');
      if (rowBadge) rowBadge.textContent = rowCount + ' rows';

      const selVal = document.getElementById('telemetrySelectVal');
      if (selVal) selVal.textContent = rowCount + ' Rows';

      // Auto update results view
      if (typeof window.renderCurrentStep === 'function') {
        window.renderCurrentStep();
      }

      // Update EXPLAIN tree if engine available
      if (window.VISUAL_EXPLAIN_TREE_ENGINE && typeof window.VISUAL_EXPLAIN_TREE_ENGINE.updateTree === 'function') {
        window.VISUAL_EXPLAIN_TREE_ENGINE.updateTree(sql);
      }
    } catch (err) {
      console.error('Studio execution error:', err);
    }
  }

  function verifyCurrentProblem() {
    const prob = getProblemById(state.activeProblemId);
    if (!prob) return;

    const sqlInput = document.getElementById('sqlInput');
    const userSql = (sqlInput && sqlInput.value && sqlInput.value.trim()) || prob.starterSql;
    const expSql = prob.expectedSolutionSql || prob.starterSql;

    const userRes = executeSafe(userSql, prob.targetTable);
    const expRes = executeSafe(expSql, prob.targetTable);

    if (userRes.error) {
      state.testResult = {
        passed: false,
        error: userRes.error,
        latencyMs: userRes.latencyMs || 0.5,
        message: 'SQL Error: ' + userRes.error
      };
      setStageTab('tabDiff');
      return;
    }

    const uRows = userRes.rows || [];
    const eRows = expRes.rows || [];
    const uCols = userRes.columns || (uRows[0] ? Object.keys(uRows[0]) : []);
    const eCols = expRes.columns || (eRows[0] ? Object.keys(eRows[0]) : []);

    const diff = computeDiff(uRows, eRows, uCols, eCols);
    const passed = diff.isPerfectMatch;

    state.testResult = {
      passed,
      userRows: uRows,
      expRows: eRows,
      userCols: uCols,
      expCols: eCols,
      latencyMs: userRes.latencyMs || 0.8,
      diff
    };

    setStageTab('tabDiff');

    if (passed && window.soundFX && typeof window.soundFX.playSuccess === 'function') {
      window.soundFX.playSuccess();
    }
  }

  function executeSafe(sql, targetTable) {
    const t0 = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
    try {
      if (typeof window.parseAndBuildPipeline === 'function') {
        window.parseAndBuildPipeline(sql);
        const steps = (window.EngineState && window.EngineState.steps) || [];
        if (steps.length > 0) {
          const last = steps[steps.length - 1];
          const t1 = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
          const latencyMs = Math.max(0.1, Math.round((t1 - t0) * 100) / 100);
          return {
            columns: last.columns || Object.keys((last.rows && last.rows[0]) || {}),
            rows: (last.rows || []).map(r => {
              const c = { ...r };
              delete c._passed;
              delete c._reason;
              return c;
            }),
            latencyMs
          };
        }
      }
      return { columns: ['result'], rows: [{ result: 'Executed' }], latencyMs: 0.5 };
    } catch (err) {
      return { error: err.message, latencyMs: 0.5 };
    }
  }

  function computeDiff(uRows, eRows, uCols, eCols) {
    const norm = (v) => {
      if (v === null || v === undefined) return 'NULL';
      if (typeof v === 'number') return String(Math.round(v * 10000) / 10000);
      return String(v).trim();
    };

    const cols = (eCols && eCols.length) ? eCols : (uCols || []);
    const allCols = Array.from(new Set([...cols, ...(uCols || [])]));

    const expMap = new Map();
    (eRows || []).forEach(r => {
      const fp = cols.map(c => norm(r[c])).join('|||');
      expMap.set(fp, (expMap.get(fp) || 0) + 1);
    });

    const diffRows = [];
    let matchCount = 0;
    let extraCount = 0;

    (uRows || []).forEach(u => {
      const fp = cols.map(c => norm(u[c])).join('|||');
      if (expMap.has(fp) && expMap.get(fp) > 0) {
        expMap.set(fp, expMap.get(fp) - 1);
        matchCount++;
        diffRows.push({ status: 'match', badge: '✓ MATCH', row: u });
      } else {
        extraCount++;
        diffRows.push({ status: 'extra', badge: '+ EXTRA', row: u });
      }
    });

    let missingCount = 0;
    (eRows || []).forEach(e => {
      const fp = cols.map(c => norm(e[c])).join('|||');
      if (expMap.has(fp) && expMap.get(fp) > 0) {
        expMap.set(fp, expMap.get(fp) - 1);
        missingCount++;
        diffRows.push({ status: 'missing', badge: '- MISSING', row: e });
      }
    });

    return {
      diffRows,
      matchCount,
      extraCount,
      missingCount,
      allCols,
      isPerfectMatch: extraCount === 0 && missingCount === 0 && (uRows || []).length === (eRows || []).length
    };
  }

  // ---------------------------------------------------------------------------
  // STAGE CONTROLS & HELPERS
  // ---------------------------------------------------------------------------
  function setStageTab(tabKey) {
    state.activeTab = tabKey;
    document.querySelectorAll('.tab-item').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tabKey);
    });
    document.querySelectorAll('.tab-pane').forEach(p => {
      p.classList.toggle('active', p.id === tabKey);
    });

    if (tabKey === 'tabDiff') {
      const diffBox = document.getElementById('studioDiffContainer');
      if (diffBox) diffBox.innerHTML = renderDiffContentHtml();
    } else if (tabKey === 'tabExplainer') {
      const expBox = document.getElementById('studioExplainerContainer');
      if (expBox) expBox.innerHTML = renderEngineExplainerHtml(getProblemById(state.activeProblemId));
    }
  }

  function insertColumnName(colName) {
    const sqlInput = document.getElementById('sqlInput');
    if (!sqlInput) return;
    const start = sqlInput.selectionStart || 0;
    const end = sqlInput.selectionEnd || 0;
    const val = sqlInput.value;
    sqlInput.value = val.substring(0, start) + colName + val.substring(end);
    sqlInput.selectionStart = sqlInput.selectionEnd = start + colName.length;
    sqlInput.focus();
    syncEditorLineNumbers();
  }

  function formatCurrentSql() {
    const sqlInput = document.getElementById('sqlInput');
    if (!sqlInput || !sqlInput.value) return;
    const val = sqlInput.value.trim();

    // Standard SQL keyword uppercase formatter
    const keywords = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'GROUP BY', 'HAVING', 'ORDER BY', 'LIMIT', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'FULL JOIN', 'ON', 'AS', 'DISTINCT', 'WITH', 'UNION', 'UNION ALL', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'OVER', 'PARTITION BY', 'ROWS BETWEEN', 'UNBOUNDED PRECEDING', 'CURRENT ROW'];

    let formatted = val;
    keywords.forEach(kw => {
      const regex = new RegExp('\\b' + kw.replace(/ /g, '\\s+') + '\\b', 'gi');
      formatted = formatted.replace(regex, kw);
    });

    sqlInput.value = formatted;
    syncEditorLineNumbers();
  }

  function syncEditorLineNumbers() {
    const sqlInput = document.getElementById('sqlInput');
    const gutter = document.getElementById('studioLineNumbers');
    if (!sqlInput || !gutter) return;
    const lines = (sqlInput.value || '').split('\n').length;
    let html = '';
    for (let i = 1; i <= Math.max(lines, 1); i++) {
      html += i + '<br>';
    }
    gutter.innerHTML = html;
  }

  function initSqlSyntaxHighlighter() {
    // Basic setup if present
  }

  function togglePlayStepper() {
    state.isPlaying = !state.isPlaying;
    const playBtn = document.getElementById('btnPlayPause');
    const playIcon = document.getElementById('playIcon');
    const playText = document.getElementById('playBtnText');

    if (state.isPlaying) {
      if (playBtn) playBtn.classList.add('playing');
      if (playText) playText.textContent = 'Pause';
      if (playIcon) playIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';

      state.playTimer = setInterval(() => {
        const curStep = (window.EngineState && window.EngineState.currentStep) || 0;
        const total = (window.EngineState && window.EngineState.steps && window.EngineState.steps.length) || 6;
        if (curStep >= total - 1) {
          if (typeof window.setStep === 'function') window.setStep(0);
        } else {
          if (typeof window.nextStep === 'function') window.nextStep();
        }
      }, 1500);
    } else {
      if (playBtn) playBtn.classList.remove('playing');
      if (playText) playText.textContent = 'Play';
      if (playIcon) playIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
      if (state.playTimer) clearInterval(state.playTimer);
    }
  }

  // Public Interface
  return {
    init,
    selectProblem,
    runStudioQuery,
    verifyCurrentProblem,
    setStageTab,
    insertColumnName,
    formatCurrentSql
  };

})();
