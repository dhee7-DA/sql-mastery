/**
 * =============================================================================
 * STUDIO WORKBENCH ENGINE (CURRICULUM PROBLEM ARENA & RELATIONAL LAB)
 * 30 Graded Problems Organized by Topic (01-10 in order) & Difficulty (Easy/Med/Hard)
 * Cathryn Lavery Editorial Diagram Engine (Bespoke SVGs for Every Question)
 * Compact Ergonomic 50/50 Layout · Smooth Natural Scrolling
 * SQLite WASM In-Memory Engine · Visual Output Diff (✓ MATCH / + EXTRA / - MISSING)
 * 6-Stage Execution Pipeline Stepper · EXPLAIN Plan Tree · Deep Engine Explainer
 * =============================================================================
 */

window.StudioWorkbenchEngine = (function() {
  'use strict';

  // State
  function getStudioSqlInputElement() {
    return document.getElementById('studioSqlInput') || document.querySelector('.studio-code-textarea') || document.querySelector('#viewStudio textarea');
  }

  let state = {
    activeTopicSeq: '01',
    activeDifficulty: 'all', // 'all' | 'easy' | 'medium' | 'hard'
    activeProblemId: '01_1',
    activeTable: 'CITY',
    activeDialect: 'mysql', // 'mysql' | 'postgres' | 'snowflake' | 'ansi'
    layoutMode: 'split',    // 'split' | 'editor' | 'results'
    editorMode: 'raw',      // 'raw' | 'builder'
    zenMode: false,
    activeTab: 'tabDiagram', // 'tabDiagram' | 'tabStepper' | 'tabDiff' | 'tabSchema' | 'tabExplainPlan' | 'tabExplainer'
    showSolution: false,
    testResult: null,
    isPlaying: false,
    playTimer: null,
    splitPercent: 50,
    currentStepIndex: 0,
    tilesOpen: false,        // Collapsible problem tiles drawer state
    filterSearch: ''         // Filter search keyword
  };

  const DIALECT_SPECS = {
    mysql: {
      name: 'MySQL 8.0',
      features: ['CTE Support', 'Window Functions', 'REGEXP_LIKE', 'JSON_TABLE', 'IFNULL()'],
      guidance: 'Default MySQL 8.0 engine with recursive CTEs, window frames, and JSON operators.'
    },
    postgres: {
      name: 'PostgreSQL 16',
      features: ['ILIKE', 'STRING_AGG()', 'DISTINCT ON', 'GENERATE_SERIES', 'NULLS LAST'],
      guidance: 'PostgreSQL features ILIKE for case-insensitive matching and STRING_AGG() for concats.'
    },
    snowflake: {
      name: 'Snowflake',
      features: ['QUALIFY Clause', 'FLATTEN()', 'IFF()', 'ZEROIFNULL', 'TRY_TO_NUMBER'],
      guidance: 'Snowflake supports QUALIFY to filter directly after window functions without wrapping CTEs!'
    },
    ansi: {
      name: 'ANSI SQL:2016',
      features: ['COALESCE()', 'FETCH FIRST N ROWS', 'CASE WHEN', 'STANDARD JOINS'],
      guidance: 'Strict portable ANSI standard compliant across all modern cloud warehouses.'
    }
  };

  // Comprehensive Relational Schema Map
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

    container.scrollTop = 0;
    renderWorkbenchShell(container);
    bindStudioEvents();
    syncEditorLineNumbers();

    // Run initial query
    const sqlInput = getStudioSqlInputElement();
    if (sqlInput && sqlInput.value && sqlInput.value.trim()) {
      runStudioQuery(sqlInput.value);
    }
  }

  // ---------------------------------------------------------------------------
  // RENDER WORKBENCH SHELL (COMPACT & ERGONOMIC)
  // ---------------------------------------------------------------------------
  function renderWorkbenchShell(container) {
    const allProblems = getAllProblems();
    const currentProb = getProblemById(state.activeProblemId);
    const curProbIndex = Math.max(0, allProblems.findIndex(p => p.id === state.activeProblemId));
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

    // Problems for active topic
    const topicProblems = allProblems.filter(p => {
      const matchTopic = (p.topicSeq === state.activeTopicSeq);
      const matchDiff = state.activeDifficulty === 'all' ? true : (p.difficulty === state.activeDifficulty);
      return matchTopic && matchDiff;
    });

    const schema = TABLE_SCHEMAS[currentTable] || { name: currentTable, description: 'Table schema', columns: [] };
    const rawRows = (window.DATABASE && window.DATABASE[currentTable]) || [];
    const sampleRows = rawRows.slice(0, 8);

    container.innerHTML = `
      <section id="section-studio" class="section-studio-workspace" style="display:contents;">
      <div class="studio-workbench-wrapper ${state.zenMode ? 'zen-mode' : ''}">
        
        <!-- Pinned Sticky Top Controls Dock (Never Scrolls Away) -->
        <div class="studio-header-dock" id="studioHeaderDock">
        
        <!-- 1. Sleek 44px Topbar Header -->
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

          <!-- Action Controls & Layout -->
          <div class="studio-topbar-right">
            <button id="btnStudioRunProblem" class="dossier-btn primary" title="Execute Query (Ctrl + Enter)">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              <span>Run</span>
            </button>
            <button id="btnStudioVerifyProblem" class="dossier-btn verify" title="Compare against expected solution">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>Verify</span>
            </button>

            <div class="studio-bar-sep"></div>

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

                        <!-- 2. Problem Carousel & Range Slider Bar + Collapsible All-Topics Tiles Hub -->
        <section class="studio-carousel-bar">
          <!-- Active Problem Pill Left -->
          <div class="carousel-active-pill">
            <span class="carousel-topic-badge">TOPIC ${state.activeTopicSeq}</span>
            <span class="carousel-prob-title">${currentProb.title}</span>
            <span class="carousel-tier-badge ${currentProb.difficulty}">${currentProb.difficulty.toUpperCase()}</span>
            <span class="carousel-table-badge">Target: <strong>${currentProb.targetTable}</strong></span>
          </div>

          <!-- Problem Carousel Range Slider Scrubber Center -->
          <div class="carousel-slider-controller">
            <button type="button" id="btnPrevProblemSlider" class="carousel-nav-btn prev" title="Previous Problem (Arrow Left)">
              &#9664; Prev
            </button>
            <div class="carousel-range-wrapper">
              <input type="range" id="problemCarouselRange" min="1" max="30" value="${curProbIndex + 1}" step="1" class="carousel-range-input" title="Problem Slider: Slide across all 30 problems">
              <span class="carousel-range-indicator">Problem <strong>${curProbIndex + 1}</strong> of 30</span>
            </div>
            <button type="button" id="btnNextProblemSlider" class="carousel-nav-btn next" title="Next Problem (Arrow Right)">
              Next &#9654;
            </button>
          </div>

          <!-- Browse All 10 Topics & 30 Problems Collapsible Button Right -->
          <button type="button" id="btnToggleProblemTiles" class="btn-toggle-tiles ${state.tilesOpen ? 'active' : ''}" title="View and search all 30 problems across 10 topics">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            <span>Browse All 10 Topics &amp; 30 Problems</span>
            <span class="tiles-badge-count">30</span>
            <span class="tiles-state-chevron">${state.tilesOpen ? '&#9650; Collapse' : '&#9660; Expand Tiles'}</span>
          </button>
        </section>

        <!-- Collapsible Problem & Topic Tiles Drawer -->
        <section class="studio-tiles-drawer ${state.tilesOpen ? 'open' : 'collapsed'}" id="studioProblemTilesDrawer" style="display: ${state.tilesOpen ? 'block' : 'none'};">
          <div class="tiles-drawer-header">
            <div class="tiles-filter-group">
              <span class="tiles-filter-label">Filter:</span>
              <button type="button" class="tiles-filter-btn ${state.activeDifficulty === 'all' ? 'active' : ''}" data-diff="all">All (30)</button>
              <button type="button" class="tiles-filter-btn easy ${state.activeDifficulty === 'easy' ? 'active' : ''}" data-diff="easy">Easy (10)</button>
              <button type="button" class="tiles-filter-btn medium ${state.activeDifficulty === 'medium' ? 'active' : ''}" data-diff="medium">Med (10)</button>
              <button type="button" class="tiles-filter-btn hard ${state.activeDifficulty === 'hard' ? 'active' : ''}" data-diff="hard">Hard (10)</button>
            </div>

            <div class="tiles-topic-jumps">
              <span class="tiles-filter-label">Jump to Topic:</span>
              ${topicsList.map(t => `
                <button type="button" class="tiles-jump-chip ${t.seq === state.activeTopicSeq ? 'active' : ''}" data-jumptopic="${t.seq}" title="${t.title}">T${t.seq}</button>
              `).join('')}
            </div>

            <div class="tiles-search-box">
              <input type="text" id="tilesSearchInput" placeholder="Quick search 30 problems..." value="${state.filterSearch || ''}">
              <button type="button" id="btnCloseTilesDrawer" class="tiles-close-btn" title="Close Drawer">&#10005; Close</button>
            </div>
          </div>

          <!-- All 10 Topics & 30 Problems Grid -->
          <div class="tiles-grid-content" id="tilesGridContent">
            ${renderAllTopicTilesHtml(allProblems, topicsList)}
          </div>
        </section>

        <!-- 3. Active Problem Context & Task Banner -->
        <section class="studio-active-brief-banner">
          <div class="brief-banner-left">
            <div class="brief-title-row">
              <span class="problem-tier-badge ${currentProb.difficulty}">${currentProb.difficulty.toUpperCase()}</span>
              <h2 class="brief-title">${currentProb.title}</h2>
              <span class="status-pill">Target: <strong>${currentProb.targetTable}</strong></span>
              ${currentProb.expectedRowCount !== null ? `<span class="status-pill status-pill-accent">${currentProb.expectedRowCount} Tuples Expected</span>` : ''}
            </div>
            <p class="brief-spec-text">${currentProb.spec}</p>
          </div>

          <div class="brief-banner-right">
            <button id="btnStudioToggleSolution" class="dossier-micro-btn" title="Toggle Expected SQL Solution">
              <span>${state.showSolution ? 'Hide Solution' : 'Solution'}</span>
            </button>
            <button id="btnStudioResetProblem" class="dossier-micro-btn" title="Reset Starter SQL">
              <span>Reset</span>
            </button>
            <button id="btnStudioShowSchemaTab" class="dossier-micro-btn" onclick="window.StudioWorkbenchEngine.setStageTab('tabSchema');" title="Inspect Target Table Schema &amp; Data">
              <span>Schema Peek</span>
            </button>
          </div>
        </section>

        ${state.showSolution ? `
          <div class="studio-solution-popdown">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <span style="font-size:10.5px; font-weight:700; color:#2563eb; text-transform:uppercase; font-family:var(--font-mono, monospace);">Canonical Solution:</span>
              <button id="btnLoadSolutionToEditor" class="micro-text-btn" style="color:#2563eb; font-weight:600; cursor:pointer; background:none; border:none;">Load into Editor &rarr;</button>
            </div>
            <pre style="margin:0; font-size:11px; font-family:var(--font-mono, monospace); color:var(--text-primary); white-space:pre-wrap;">${currentProb.expectedSolutionSql}</pre>
          </div>
        ` : ''}

        </div><!-- End of studio-header-dock -->

        <!-- 4. Main Resizable Split Workspace Grid -->
        <main class="studio-workspace-grid layout-${state.layoutMode}" id="studioWorkspaceGrid" style="${state.layoutMode === 'split' ? 'grid-template-columns: ' + state.splitPercent + '% 12px calc(' + (100 - state.splitPercent) + '% - 12px);' : ''}">
          
          <!-- Left Column: Code Editor & Action Strip & Telemetry -->
          <section class="studio-editor-column" id="studioEditorCol">
            
            <!-- Prominent Primary Actions & Column Inserter Toolbar -->
            <div class="studio-editor-toolbar-header">
              <div class="editor-action-strip">
                <button type="button" id="btnEditorRun" class="studio-btn-action primary" title="Run Query (Ctrl + Enter)">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  <span>Run Query</span>
                  <kbd>Ctrl+↵</kbd>
                </button>
                <button type="button" id="btnEditorVerify" class="studio-btn-action verify" title="Compare against expected solution">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Verify</span>
                </button>
                <button type="button" id="btnEditorFormat" class="studio-btn-action subtle" title="Prettify &amp; Format SQL">
                  <span>Format</span>
                </button>
                <div class="editor-slider-modes">
                  <button type="button" class="mode-slider-btn ${state.layoutMode === 'editor' ? 'active' : ''}" data-layout="editor" title="Full Editor">◨ Editor</button>
                  <button type="button" class="mode-slider-btn ${state.layoutMode === 'split' ? 'active' : ''}" data-layout="split" title="50/50 Split Slider">◧ Split</button>
                  <button type="button" class="mode-slider-btn ${state.layoutMode === 'results' ? 'active' : ''}" data-layout="results" title="Full Diagram">◩ Diagram</button>
                </div>
              </div>

              <!-- Quick Column Inserters -->
              <div class="studio-column-pills-bar" id="studioColumnPillsBar">
                <span class="col-pill-label">Insert:</span>
                <div class="col-pill-list" id="studioColPillsList">
                  ${schema.columns.map(c => `
                    <button type="button" class="col-pill-btn" onclick="window.StudioWorkbenchEngine.insertColumnName('${c.name}')" title="Insert ${c.name}">+ ${c.name}</button>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- Monaco-Style Code Editor -->
            <div class="studio-editor-body" id="studioRawSqlContainer">
              <div class="code-editor-wrapper">
                <div class="editor-gutter" id="studioLineNumbers">1</div>
                <textarea id="studioSqlInput" class="studio-code-textarea" spellcheck="false" wrap="off" placeholder="-- Write SQL query here...">${(currentProb.starterSql || 'SELECT * FROM ' + currentTable + ';').trim()}</textarea>
              </div>
            </div>

            <!-- Telemetry Bar -->
            <div class="query-telemetry-bar" id="queryTelemetryBar">
              <div class="telemetry-chip plan-chip" id="telemetryPlanChip" title="Click to view Execution Plan Tree" style="cursor: pointer;" onclick="window.StudioWorkbenchEngine.setStageTab('tabExplainPlan');">
                <span class="telemetry-label">PLAN:</span>
                <span class="telemetry-val" id="telemetryPlanVal">INDEX RANGE SEEK</span>
              </div>
              <div class="telemetry-chip latency-chip" id="telemetryLatencyChip" title="Execution Latency">
                <span class="telemetry-label">LATENCY:</span>
                <span class="telemetry-val" id="telemetryLatencyVal">0.8 ms</span>
              </div>
              <div class="telemetry-chip buffer-chip" id="telemetryBufferChip" title="Buffer Pool Hit Ratio">
                <span class="telemetry-label">BUFFER:</span>
                <span class="telemetry-val" id="telemetryBufferVal">100% (RAM)</span>
              </div>
              <div class="telemetry-chip select-chip" id="telemetrySelectChip" title="Row Selectivity">
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
              </div>
            </div>
          </section>

          <!-- Interactive Split Resizer Slider Divider (Drag or Double-Click) -->
                    <!-- Interactive Split Resizer Slider Divider (Drag, Double-Click, or Snap) -->
          <div class="studio-split-slider" id="studioSplitSlider" title="Drag slider to resize panes &bull; Double click to reset 50/50">
            <div class="split-slider-knob">
              <div class="split-slider-grip">
                <span></span><span></span><span></span>
              </div>
              <span class="split-slider-tag">SLIDER</span>
            </div>
          </div>
          </div>

          <!-- Right Column: Visualizer Stage with Cathryn Lavery Editorial Diagrams -->
          <section class="studio-stage-column" id="studioStageCol">
            
            <div class="card viewer-card">
              <!-- Stage Tabs Bar -->
              <div class="viewer-tabs">
                <div class="tab-group">
                  <button class="tab-item ${state.activeTab === 'tabDiagram' ? 'active' : ''}" data-tab="tabDiagram">
                    Editorial Diagram (SVG)
                    <span class="hot-badge" style="background: rgba(37, 99, 235, 0.12); color: #2563eb; font-size: 8.5px; padding: 1px 4px; border-radius: 3px; font-weight: 700; margin-left: 3px;">DESIGN</span>
                  </button>
                  <button type="button" class="tab-item tab-machines-direct-btn" onclick="if(typeof selectNavView==='function'){selectNavView('viewRelationalMachines', 'Relational Machines', null);}else if(typeof switchMainView==='function'){switchMainView('viewRelationalMachines');}else{window.location.hash='#machines';}" title="View Obsidian 3-Gauge Relational Machines &amp; Explainer SVGs" style="color: #0284c7; font-weight: 700; cursor: pointer;">
                    Relational Machines
                    <span class="hot-badge" style="background: rgba(14, 165, 233, 0.18); color: #0284c7; font-size: 8.5px; padding: 1px 5px; border-radius: 3px; font-weight: 800; margin-left: 3px; border: 1px solid rgba(14, 165, 233, 0.3);">3 GAUGES</span>
                  </button>
                  <button class="tab-item ${state.activeTab === 'tabStepper' ? 'active' : ''}" data-tab="tabStepper">Data Grid</button>
                  <button class="tab-item ${state.activeTab === 'tabDiff' ? 'active' : ''}" data-tab="tabDiff">
                    Visual Diff
                    ${state.testResult ? (`<span class="hot-badge" style="background:${state.testResult.passed ? 'rgba(22,163,74,0.15)' : 'rgba(220,38,38,0.15)'}; color:${state.testResult.passed ? '#16a34a' : '#dc2626'}; font-size:8.5px; padding:1px 4px; border-radius:3px; font-weight:700; margin-left:3px;">${state.testResult.passed ? 'PASS' : 'DIFF'}</span>`) : ''}
                  </button>
                  <button class="tab-item ${state.activeTab === 'tabPipeline' ? 'active' : ''}" data-tab="tabPipeline">6-Stage Stepper</button>
                  <button class="tab-item ${state.activeTab === 'tabSchema' ? 'active' : ''}" data-tab="tabSchema">Schema &amp; Tuples</button>
                  <button class="tab-item ${state.activeTab === 'tabExplainPlan' ? 'active' : ''}" data-tab="tabExplainPlan">EXPLAIN Plan</button>
                  <button class="tab-item ${state.activeTab === 'tabExplainer' ? 'active' : ''}" data-tab="tabExplainer">Engine Explainer</button>
                </div>
                <div class="row-count-tag" id="rowCounterBadge">0 rows</div>
              </div>

              <!-- Stage Tab Panels -->
              <div class="viewer-content">
                
                <!-- Tab 1: Cathryn Lavery Editorial Vector Diagram -->
                <div class="tab-pane ${state.activeTab === 'tabDiagram' ? 'active' : ''}" id="tabDiagram">
                  <div class="machines-quick-jump-banner" style="margin-bottom: 12px; padding: 8px 12px; background: rgba(14, 165, 233, 0.08); border: 1px solid rgba(14, 165, 233, 0.22); border-radius: 6px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
                    <div style="display:flex; align-items:center; gap:8px;">
                      <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#0ea5e9; box-shadow: 0 0 6px rgba(14, 165, 233, 0.6);"></span>
                      <span style="font-size:11.5px; font-weight:700; color:var(--text-primary, #0f172a);">Looking for the 3-Gauge Relational Machines &amp; Data Analysis Explainer SVGs?</span>
                    </div>
                    <button type="button" onclick="if(typeof selectNavView==='function'){selectNavView('viewRelationalMachines', 'Relational Machines', null);}else{window.location.hash='#machines';}" style="background: #0284c7; color: #ffffff; border: none; padding: 4px 10px; border-radius: 5px; font-size: 11px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 4px; box-shadow: 0 1px 3px rgba(2, 132, 199, 0.3);">
                      <span>Open Relational Machines</span>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                  </div>
                  <div class="editorial-diagram-container" id="editorialDiagramContainer">
                    ${renderEditorialDiagramSvg(currentProb)}
                  </div>
                </div>

                <!-- Tab 2: Live Output Data Grid -->
                <div class="tab-pane ${state.activeTab === 'tabStepper' ? 'active' : ''}" id="tabStepper">
                  <div class="table-scroll-wrapper" id="stepperTableContainer"></div>
                </div>

                <!-- Tab 3: Visual Relational Output Diff Grid -->
                <div class="tab-pane ${state.activeTab === 'tabDiff' ? 'active' : ''}" id="tabDiff">
                  <div id="studioDiffContainer" class="studio-diff-container">
                    ${renderDiffContentHtml()}
                  </div>
                </div>

                <!-- Tab 4: 6-Stage Physical Pipeline Stepper -->
                <div class="tab-pane ${state.activeTab === 'tabPipeline' ? 'active' : ''}" id="tabPipeline">
                  <div class="stepper-top" style="padding: 10px 14px 6px 14px;">
                    <div class="stepper-meta">
                      <span class="step-counter" id="stepCounterLabel">STEP ${(state.currentStepIndex || 0) + 1} OF 6</span>
                      <h3 class="step-heading" id="stepHeadingLabel" style="font-size: 13px;">FROM Clause: Table Scan</h3>
                    </div>
                    <div class="stepper-controls">
                      <button id="btnPrevStep" class="icon-btn" title="Previous Step">◀</button>
                      <button id="btnPlayPause" class="play-btn"><span id="playBtnText">${state.isPlaying ? 'Pause' : 'Play'}</span></button>
                      <button id="btnNextStep" class="icon-btn" title="Next Step">▶</button>
                      <button id="btnResetStep" class="icon-btn" title="Reset Step">↺</button>
                    </div>
                  </div>

                  <!-- Interactive 6-Stage Execution Slider Track -->
                  <div class="stepper-slider-panel">
                    <span class="stepper-slider-label">STAGE SLIDER:</span>
                    <button class="stepper-slider-arrow" id="btnSliderPrev" title="Previous Stage (◀)">◀</button>
                    <input type="range" min="0" max="5" value="${state.currentStepIndex || 0}" step="1" id="stepperRangeSlider" class="stepper-range-slider" title="Drag to scrub through physical execution phases">
                    <button class="stepper-slider-arrow" id="btnSliderNext" title="Next Stage (▶)">▶</button>
                    <span class="stepper-slider-val" id="stepperSliderVal">01 FROM</span>
                  </div>

                  <div class="stepper-track" id="stepperTrack" style="padding: 4px 14px;">
                    <button class="track-node active" data-step="0"><span class="node-num">01</span><span class="node-name">FROM</span></button>
                    <div class="track-line"></div>
                    <button class="track-node" data-step="1"><span class="node-num">02</span><span class="node-name">WHERE</span></button>
                    <div class="track-line"></div>
                    <button class="track-node" data-step="2"><span class="node-num">03</span><span class="node-name">GROUP BY</span></button>
                    <div class="track-line"></div>
                    <button class="track-node" data-step="3"><span class="node-num">04</span><span class="node-name">HAVING</span></button>
                    <div class="track-line"></div>
                    <button class="track-node" data-step="4"><span class="node-num">05</span><span class="node-name">SELECT</span></button>
                    <div class="track-line"></div>
                    <button class="track-node" data-step="5"><span class="node-num">06</span><span class="node-name">ORDER/LIMIT</span></button>
                  </div>

                  <div class="step-explanation" id="stepExplanationText" style="margin: 0 14px 10px 14px; font-size: 11.5px;">
                    Loading table buffer into memory.
                  </div>

                  <div id="pipelineStepResultsGrid" style="overflow-x: auto; max-height: 240px; padding: 0 14px 14px 14px;"></div>
                </div>

                <!-- Tab 5: Real Schema Tables & Live Sample Tuples -->
                <div class="tab-pane ${state.activeTab === 'tabSchema' ? 'active' : ''}" id="tabSchema">
                  <div style="padding: 12px 14px; display: flex; flex-direction: column; gap: 10px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px;">
                      <div>
                        <strong style="font-size: 13px; color: var(--text-primary);">Table: ${schema.name}</strong>
                        <span style="font-size: 11px; color: var(--text-muted); margin-left: 8px;">${schema.description}</span>
                      </div>
                      <span class="status-pill" style="font-size: 10px;">${rawRows.length} Total Tuples</span>
                    </div>

                    <!-- Column definitions table -->
                    <div style="overflow-x: auto; border: 1px solid var(--border-default); border-radius: 6px;">
                      <table class="studio-diff-table" style="font-size: 11px;">
                        <thead>
                          <tr>
                            <th>Column Name</th>
                            <th>Data Type</th>
                            <th>Key Constraint</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${schema.columns.map(c => `
                            <tr>
                              <td><strong>${c.name}</strong></td>
                              <td><span class="status-pill" style="font-size: 10px;">${c.type}</span></td>
                              <td>${c.key ? (`<span class="status-pill status-pill-accent" style="font-size: 10px;">${c.key}</span>`) : '<span style="color:var(--text-muted);">-</span>'}</td>
                              <td>
                                <button class="col-pill-btn" onclick="window.StudioWorkbenchEngine.insertColumnName('${c.name}')">+ Insert</button>
                              </td>
                            </tr>
                          `).join('')}
                        </tbody>
                      </table>
                    </div>

                    <!-- Live Sample Tuples Grid -->
                    <div>
                      <div style="font-size: 11px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Live Sample Tuples (${sampleRows.length} of ${rawRows.length} rows):</div>
                      <div style="overflow-x: auto; border: 1px solid var(--border-default); border-radius: 6px; max-height: 220px;">
                        <table class="studio-diff-table" style="font-size: 10.5px;">
                          <thead>
                            <tr>
                              ${schema.columns.map(c => `<th>${c.name}</th>`).join('')}
                            </tr>
                          </thead>
                          <tbody>
                            ${sampleRows.map(r => `
                              <tr>
                                ${schema.columns.map(c => `<td>${r[c.name] !== undefined ? String(r[c.name]) : '<em style="color:#a1a1aa">NULL</em>'}</td>`).join('')}
                              </tr>
                            `).join('')}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Tab 6: Visual Execution Plan Tree -->
                <div class="tab-pane ${state.activeTab === 'tabExplainPlan' ? 'active' : ''}" id="tabExplainPlan">
                  <div class="explain-plan-tree-container" id="explainPlanTreeContainer"></div>
                </div>

                <!-- Tab 7: Deep Engine Explainer -->
                <div class="tab-pane ${state.activeTab === 'tabExplainer' ? 'active' : ''}" id="tabExplainer">
                  <div id="studioExplainerContainer" style="padding: 14px; overflow-y: auto; max-height: 480px;">
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
  // CATHRYN LAVERY EDITORIAL DIAGRAM ENGINE (10 BESPOKE TOPIC ARCHITECTURES)
  // Strict 4px Grid · Hairlines #e4e4e7 · Single Focal Accent · Orthogonal Vectors
  // Zero Emojis · Zero Drop Shadows · Zero Mermaid Slop · High Typographic Contrast
  // ---------------------------------------------------------------------------

  // -------------------------------------------------------------------------  // ---------------------------------------------------------------------------
    // ---------------------------------------------------------------------------
  // RENDER ALL 10 TOPIC TILES & 30 PROBLEMS (COLLAPSIBLE DRAWER)
  // ---------------------------------------------------------------------------
  function renderAllTopicTilesHtml(allProblems, topicsList) {
    const q = (state.filterSearch || '').toLowerCase().trim();
    const diff = state.activeDifficulty || 'all';

    return topicsList.map(t => {
      const topicProblems = allProblems.filter(p => p.topicSeq === t.seq);
      const isTopicActive = t.seq === state.activeTopicSeq;

      let problemsHtml = '';
      topicProblems.forEach(p => {
        const isSelected = p.id === state.activeProblemId;
        const matchesDiff = diff === 'all' || p.difficulty === diff;
        const matchesSearch = !q ||
          p.title.toLowerCase().includes(q) ||
          p.spec.toLowerCase().includes(q) ||
          p.targetTable.toLowerCase().includes(q) ||
          t.title.toLowerCase().includes(q);
        const isHidden = !matchesDiff || !matchesSearch;

        problemsHtml += '<div class="problem-tile-card ' + (isSelected ? 'selected-problem' : '') + ' ' + p.difficulty + ' ' + (isHidden ? 'filtered-out' : '') + '" data-problemid="' + p.id + '" title="Click to load: ' + p.title + '">' +
          '<div class="tile-card-top">' +
            '<span class="tile-card-diff-badge ' + p.difficulty + '">' + p.difficulty.toUpperCase() + '</span>' +
            '<span class="tile-card-tier">' + p.tierName + '</span>' +
            '<span class="tile-card-table">Target: <strong>' + p.targetTable + '</strong></span>' +
          '</div>' +
          '<h4 class="tile-card-heading">' + p.title + '</h4>' +
          '<p class="tile-card-summary">' + p.spec + '</p>' +
          '<div class="tile-card-footer">' +
            '<span class="tile-card-status">' + (isSelected ? '&#9679; ACTIVE IN WORKBENCH' : 'Click to Load &amp; Solve &rarr;') + '</span>' +
            (p.expectedRowCount !== null ? '<span class="tile-card-rows">' + p.expectedRowCount + ' tuples expected</span>' : '') +
          '</div>' +
        '</div>';
      });

      return '<div class="topic-tile-accordion ' + (isTopicActive ? 'active-topic' : '') + '" id="topicTile_' + t.seq + '">' +
        '<div class="topic-tile-header">' +
          '<div class="topic-tile-meta">' +
            '<span class="topic-tile-seq">TOPIC ' + t.seq + '</span>' +
            '<h3 class="topic-tile-title">' + t.title + '</h3>' +
          '</div>' +
          '<div class="topic-tile-badges">' +
            '<span class="topic-tile-count">' + topicProblems.length + ' Problems</span>' +
            (isTopicActive ? '<span class="topic-active-badge">ACTIVE TOPIC</span>' : '') +
          '</div>' +
        '</div>' +
        '<div class="topic-tile-problems-grid">' +
          problemsHtml +
        '</div>' +
      '</div>';
    }).join('');
  }

  function renderEditorialDiagramSvg(prob) {
    var seq = prob.topicSeq || '01';
    var accentColor = 
      seq === '01' ? '#2563eb' :
      seq === '02' ? '#dc2626' :
      seq === '03' ? '#d97706' :
      seq === '04' ? '#7c3aed' :
      seq === '05' ? '#0284c7' :
      seq === '06' ? '#059669' :
      seq === '07' ? '#4f46e5' :
      seq === '08' ? '#ea580c' :
      seq === '09' ? '#0891b2' : '#9333ea';

    var inner = '';
    var footerNote = '';

    if (seq === '01') {
      inner = getTopic01Svg(prob, accentColor);
      footerNote = 'Physical projection isolates required column vectors directly into CPU registers, pruning unreferenced fields to eliminate disk/bus bandwidth overhead.';
    } else if (seq === '02') {
      inner = getTopic02Svg(prob, accentColor);
      footerNote = 'SARGable predicates enable B-Tree index traversal (O(log N)), cutting off full heap scans before memory allocation.';
    } else if (seq === '03') {
      inner = getTopic03Svg(prob, accentColor);
      footerNote = 'Top-N heap optimization maintains a bounded in-memory priority queue of size K, avoiding expensive disk-based external merge sorts.';
    } else if (seq === '04') {
      inner = getTopic04Svg(prob, accentColor);
      footerNote = 'Vector aggregators condense N relational tuples down to 1 scalar summary row in a single sequential pass over columnar memory.';
    } else if (seq === '05') {
      inner = getTopic05Svg(prob, accentColor);
      footerNote = 'GROUP BY constructs in-memory hash buckets; HAVING executes post-aggregation filtering on bucket aggregates before emission.';
    } else if (seq === '06') {
      inner = getTopic06Svg(prob, accentColor);
      footerNote = 'Hash joins hash the smaller relation into an in-memory hash table, then probe it with the outer relation in linear O(N + M) time.';
    } else if (seq === '07') {
      inner = getTopic07Svg(prob, accentColor);
      footerNote = 'Self-joins project a table against itself; directional inequality predicates (A.id < B.id) eliminate duplicate symmetric permutations.';
    } else if (seq === '08') {
      inner = getTopic08Svg(prob, accentColor);
      footerNote = 'CASE expressions evaluate conditions in strict sequential order; the first branch evaluating to TRUE short-circuits remaining evaluations.';
    } else if (seq === '09') {
      inner = getTopic09Svg(prob, accentColor);
      footerNote = 'Common Table Expressions provide clean modular DAG composition, materialized in ephemeral memory buffers or inlined by modern cost-based optimizers.';
    } else {
      inner = getTopic10Svg(prob, accentColor);
      footerNote = 'Window functions calculate peer aggregations over defined row frames without collapsing the underlying relational tuples.';
    }

    return `
      <div style="width: 100%; height: 100%; display: flex; flex-direction: column; background: var(--bg-surface, #ffffff); border-radius: 6px; overflow: hidden;">
        
        <!-- Editorial Header Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; border-bottom: 1px solid var(--border-default, #e4e4e7); background: var(--bg-card-subtle, #fcfcfb);">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-family: var(--font-mono, monospace); font-size: 10px; font-weight: 700; color: ${accentColor}; text-transform: uppercase; letter-spacing: 0.5px;">
              TOPIC ${prob.topicSeq} ARCHITECTURE // ${prob.tierName ? prob.tierName.toUpperCase() : 'STANDARD'}
            </span>
            <span style="color: var(--border-default);">&bull;</span>
            <span style="font-size: 11px; font-weight: 600; color: var(--text-primary);">${prob.title}</span>
          </div>
          <span style="font-size: 9.5px; font-family: var(--font-mono, monospace); color: var(--text-muted); text-transform: uppercase;">
            CATHRYN LAVERY EDITORIAL DESIGN SYSTEM
          </span>
        </div>

        <!-- Inline Responsive SVG Vector -->
        <div style="flex: 1; padding: 12px; display: flex; align-items: center; justify-content: center; min-height: 330px;">
          <svg viewBox="0 0 740 330" style="width: 100%; height: auto; max-height: 370px;" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="arrowHead" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="${accentColor}" />
              </marker>
              <marker id="arrowMuted" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#71717a" />
              </marker>
              <marker id="arrowGreen" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#059669" />
              </marker>
              <marker id="arrowRed" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#dc2626" />
              </marker>
              <pattern id="diagGridDots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#e4e4e7" opacity="0.6" />
              </pattern>
            </defs>

            <!-- Grid Backdrop -->
            <rect width="740" height="330" fill="url(#diagGridDots)" rx="6" />

            ${inner}
          </svg>
        </div>

        <!-- Editorial Caption Footer -->
        <div style="padding: 8px 14px; border-top: 1px solid var(--border-default, #e4e4e7); background: var(--bg-card-subtle, #fcfcfb); font-size: 11px; color: var(--text-secondary); display: flex; justify-content: space-between; align-items: center;">
          <span><strong>Physical Execution:</strong> ${footerNote}</span>
          <span style="font-family: var(--font-mono, monospace); font-size: 10px; color: var(--text-muted);">LATENCY ~0.8ms</span>
        </div>
      </div>
    `;
  }

  // ---------------------------------------------------------------------------
  // BESPOKE TOPIC SVG GENERATORS
  // ---------------------------------------------------------------------------
  
  // Topic 01: SELECT & FROM - Column Pruning & Projection Funnel
  function getTopic01Svg(prob, accent) {
    var table = prob.targetTable || 'CITY';
    var cols = table === 'CITY' 
      ? ['ID (PK)', 'NAME', 'COUNTRYCODE', 'DISTRICT', 'POPULATION']
      : ['id (PK)', 'first_name', 'department', 'salary', 'hire_date'];
    
    var colPills = cols.map(function(c, i) {
      var isSelected = i === 1 || i === 4;
      return `
        <rect x="12" y="${62 + i * 36}" width="176" height="28" rx="4" fill="${isSelected ? 'rgba(37,99,235,0.06)' : '#fafafa'}" stroke="${isSelected ? accent : '#e4e4e7'}" stroke-width="${isSelected ? '1.4' : '1'}" />
        <text x="20" y="${80 + i * 36}" font-family="ui-monospace, monospace" font-size="9.5" font-weight="${isSelected ? '700' : '500'}" fill="${isSelected ? accent : '#18181b'}">
          ${c} ${isSelected ? '★' : ''}
        </text>
      `;
    }).join('');

    return `
      <!-- Card 1: Source Table Column Vectors -->
      <g transform="translate(24, 28)">
        <rect width="200" height="274" rx="6" fill="#ffffff" stroke="#d4d4d8" stroke-width="1.2" />
        <rect width="200" height="30" rx="6" fill="#f4f4f5" />
        <text x="12" y="20" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#18181b">TABLE: ${table}</text>
        <text x="12" y="48" font-family="ui-monospace, monospace" font-size="9" fill="#71717a">COLUMN SCAN // DISK</text>
        ${colPills}
        <text x="100" y="260" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">5 Column Vectors In-Memory</text>
      </g>

      <!-- Connectors: Selected Columns to Projection Funnel -->
      <path d="M 224 112 H 264" fill="none" stroke="${accent}" stroke-width="1.6" marker-end="url(#arrowHead)" />
      <path d="M 224 220 H 264" fill="none" stroke="${accent}" stroke-width="1.6" marker-end="url(#arrowHead)" />
      <path d="M 224 76 H 248 V 60 H 264" fill="none" stroke="#a1a1aa" stroke-dasharray="3 3" stroke-width="1" />
      <path d="M 224 148 H 248 V 160 H 264" fill="none" stroke="#a1a1aa" stroke-dasharray="3 3" stroke-width="1" />

      <!-- Card 2: Column Projection Gate -->
      <g transform="translate(268, 48)">
        <rect width="192" height="234" rx="6" fill="#ffffff" stroke="${accent}" stroke-width="1.5" />
        <rect width="192" height="30" rx="6" fill="${accent}" />
        <text x="96" y="20" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#ffffff">PROJECTION FUNNEL</text>
        <text x="14" y="52" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="${accent}">SELECT CLAUSE FILTER</text>
        
        <rect x="12" y="62" width="168" height="46" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="20" y="80" font-family="ui-monospace, monospace" font-size="9.5" font-weight="700" fill="#18181b">ACTIVE REGISTERS</text>
        <text x="20" y="96" font-family="ui-monospace, monospace" font-size="8.5" fill="${accent}">${cols[1]}, ${cols[4]}</text>

        <rect x="12" y="118" width="168" height="46" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="20" y="136" font-family="ui-monospace, monospace" font-size="9.5" font-weight="700" fill="#71717a">PRUNED COLUMNS</text>
        <text x="20" y="152" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Bypassed (Zero CPU Copy)</text>

        <rect x="12" y="176" width="168" height="36" rx="4" fill="rgba(37,99,235,0.06)" />
        <text x="96" y="198" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="${accent}">FAST-PATH EMISSION</text>
      </g>

      <!-- Connector: Projection to Result -->
      <path d="M 460 165 H 496" fill="none" stroke="${accent}" stroke-width="1.6" marker-end="url(#arrowHead)" />

      <!-- Card 3: Materialized Result Relation -->
      <g transform="translate(500, 28)">
        <rect width="216" height="274" rx="6" fill="#ffffff" stroke="#10b981" stroke-width="1.4" />
        <rect width="216" height="30" rx="6" fill="rgba(16,185,129,0.12)" />
        <text x="12" y="20" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#047857">RESULT SET (EMITTED)</text>
        <text x="12" y="48" font-family="ui-monospace, monospace" font-size="9" fill="#059669">${prob.expectedRowCount || 5} TUPLES PROJECTED</text>
        
        <rect x="12" y="62" width="192" height="26" rx="4" fill="rgba(16,185,129,0.05)" stroke="rgba(16,185,129,0.2)" stroke-width="1" />
        <text x="20" y="79" font-family="ui-monospace, monospace" font-size="9" font-weight="600" fill="#047857">1 &bull; Scottsdale | 202,705</text>

        <rect x="12" y="96" width="192" height="26" rx="4" fill="rgba(16,185,129,0.05)" stroke="rgba(16,185,129,0.2)" stroke-width="1" />
        <text x="20" y="113" font-family="ui-monospace, monospace" font-size="9" font-weight="600" fill="#047857">2 &bull; Corona | 124,966</text>

        <rect x="12" y="130" width="192" height="26" rx="4" fill="rgba(16,185,129,0.05)" stroke="rgba(16,185,129,0.2)" stroke-width="1" />
        <text x="20" y="147" font-family="ui-monospace, monospace" font-size="9" font-weight="600" fill="#047857">3 &bull; Concord | 121,780</text>

        <rect x="12" y="164" width="192" height="26" rx="4" fill="rgba(16,185,129,0.05)" stroke="rgba(16,185,129,0.2)" stroke-width="1" />
        <text x="20" y="181" font-family="ui-monospace, monospace" font-size="9" font-weight="600" fill="#047857">4 &bull; Cedar Rapids | 120,758</text>

        <rect x="12" y="198" width="192" height="26" rx="4" fill="rgba(16,185,129,0.05)" stroke="rgba(16,185,129,0.2)" stroke-width="1" />
        <text x="20" y="215" font-family="ui-monospace, monospace" font-size="9" font-weight="600" fill="#047857">5 &bull; Coral Springs | 117,549</text>

        <rect x="12" y="234" width="192" height="28" rx="4" fill="#f4f4f5" />
        <text x="108" y="252" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9.5" font-weight="700" fill="#059669">✓ 100% RELATIONAL MATCH</text>
      </g>
    `;
  }

  // Topic 02: WHERE - SARGable Predicate Barrier Gate
  function getTopic02Svg(prob, accent) {
    return `
      <!-- Card 1: Input Tuples Stream -->
      <g transform="translate(24, 28)">
        <rect width="190" height="274" rx="6" fill="#ffffff" stroke="#d4d4d8" stroke-width="1.2" />
        <rect width="190" height="30" rx="6" fill="#f4f4f5" />
        <text x="12" y="20" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#18181b">INPUT TUPLE STREAM</text>
        <text x="12" y="48" font-family="ui-monospace, monospace" font-size="9" fill="#71717a">PHYSICAL HEAP SCAN</text>
        
        <rect x="10" y="62" width="170" height="34" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="18" y="78" font-family="ui-monospace, monospace" font-size="9.5" font-weight="600" fill="#18181b">Tuple 1: pop = 202,705</text>
        <text x="18" y="90" font-family="ui-monospace, monospace" font-size="8" fill="#059669">Satisfies &gt; 100k</text>

        <rect x="10" y="106" width="170" height="34" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="18" y="122" font-family="ui-monospace, monospace" font-size="9.5" font-weight="600" fill="#18181b">Tuple 2: pop = 85,000</text>
        <text x="18" y="134" font-family="ui-monospace, monospace" font-size="8" fill="#dc2626">Fails Predicate</text>

        <rect x="10" y="150" width="170" height="34" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="18" y="166" font-family="ui-monospace, monospace" font-size="9.5" font-weight="600" fill="#18181b">Tuple 3: pop = 124,966</text>
        <text x="18" y="178" font-family="ui-monospace, monospace" font-size="8" fill="#059669">Satisfies &gt; 100k</text>

        <rect x="10" y="194" width="170" height="34" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="18" y="210" font-family="ui-monospace, monospace" font-size="9.5" font-weight="600" fill="#18181b">Tuple 4: pop = 42,100</text>
        <text x="18" y="222" font-family="ui-monospace, monospace" font-size="8" fill="#dc2626">Fails Predicate</text>

        <text x="95" y="260" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Unfiltered Tuple Buffer</text>
      </g>

      <path d="M 214 165 H 244" fill="none" stroke="${accent}" stroke-width="1.6" marker-end="url(#arrowHead)" />

      <!-- Card 2: Predicate Evaluator Gate -->
      <g transform="translate(248, 28)">
        <rect width="216" height="274" rx="6" fill="#ffffff" stroke="${accent}" stroke-width="1.5" />
        <rect width="216" height="30" rx="6" fill="${accent}" />
        <text x="108" y="20" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#ffffff">WHERE PREDICATE GATE</text>
        <text x="14" y="48" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="${accent}">BOOLEAN EVALUATION // 3VL</text>
        
        <rect x="12" y="62" width="192" height="42" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="20" y="78" font-family="ui-monospace, monospace" font-size="9.5" font-weight="700" fill="#18181b">SARGABLE CONDITION</text>
        <text x="20" y="94" font-family="ui-monospace, monospace" font-size="8.5" fill="${accent}">POPULATION &gt; 100,000</text>

        <rect x="12" y="114" width="192" height="64" rx="4" fill="rgba(5,150,105,0.06)" stroke="rgba(5,150,105,0.3)" stroke-width="1" />
        <text x="20" y="132" font-family="ui-monospace, monospace" font-size="9.5" font-weight="700" fill="#047857">TRUE CHANNEL &rarr; PASS</text>
        <text x="20" y="148" font-family="ui-monospace, monospace" font-size="8.5" fill="#059669">Streamed to Result Buffer</text>
        <text x="20" y="164" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Index Seek: O(log N)</text>

        <rect x="12" y="188" width="192" height="52" rx="4" fill="rgba(220,38,38,0.06)" stroke="rgba(220,38,38,0.3)" stroke-width="1" />
        <text x="20" y="206" font-family="ui-monospace, monospace" font-size="9.5" font-weight="700" fill="#dc2626">FALSE/NULL &rarr; SINK</text>
        <text x="20" y="222" font-family="ui-monospace, monospace" font-size="8.5" fill="#dc2626">Zero Memory Spill</text>

        <text x="108" y="260" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Three-Valued Logic Engine</text>
      </g>

      <path d="M 464 146 H 496" fill="none" stroke="#059669" stroke-width="1.8" marker-end="url(#arrowGreen)" />
      <path d="M 464 214 H 496" fill="none" stroke="#dc2626" stroke-width="1.8" marker-end="url(#arrowRed)" />

      <!-- Card 3a: Qualifying Output Buffer -->
      <g transform="translate(500, 28)">
        <rect width="216" height="136" rx="6" fill="#ffffff" stroke="#059669" stroke-width="1.4" />
        <rect width="216" height="28" rx="6" fill="rgba(5,150,105,0.12)" />
        <text x="12" y="19" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#047857">QUALIFYING BUFFER</text>
        <text x="12" y="44" font-family="ui-monospace, monospace" font-size="8.5" fill="#059669">TUPLES PASSED (5)</text>
        
        <rect x="10" y="52" width="196" height="22" rx="3" fill="rgba(5,150,105,0.05)" />
        <text x="16" y="67" font-family="ui-monospace, monospace" font-size="8.5" font-weight="600" fill="#047857">1813 &bull; Scottsdale (202k)</text>

        <rect x="10" y="78" width="196" height="22" rx="3" fill="rgba(5,150,105,0.05)" />
        <text x="16" y="93" font-family="ui-monospace, monospace" font-size="8.5" font-weight="600" fill="#047857">1814 &bull; Corona (124k)</text>

        <text x="108" y="122" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" fill="#059669">✓ 100% SELECTIVITY MATCH</text>
      </g>

      <!-- Card 3b: Pruned Discard Sink -->
      <g transform="translate(500, 176)">
        <rect width="216" height="126" rx="6" fill="#ffffff" stroke="#dc2626" stroke-width="1.2" stroke-dasharray="3 3" />
        <rect width="216" height="28" rx="6" fill="rgba(220,38,38,0.08)" />
        <text x="12" y="19" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#dc2626">DISCARDED SINK</text>
        <text x="12" y="44" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">REJECTED TUPLES (3)</text>
        
        <rect x="10" y="52" width="196" height="22" rx="3" fill="#fcfcfb" />
        <text x="16" y="67" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">1888 &bull; Small Town (85k)</text>

        <text x="108" y="106" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" font-weight="600" fill="#dc2626">PRUNED FROM PIPELINE</text>
      </g>
    `;
  }

  // Topic 03: ORDER BY & LIMIT - Top-N Priority Queue Heap & Keyset Fence
  function getTopic03Svg(prob, accent) {
    return `
      <!-- Card 1: Unsorted Tuple Stream -->
      <g transform="translate(24, 28)">
        <rect width="190" height="274" rx="6" fill="#ffffff" stroke="#d4d4d8" stroke-width="1.2" />
        <rect width="190" height="30" rx="6" fill="#f4f4f5" />
        <text x="12" y="20" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#18181b">UNSORTED STREAM</text>
        <text x="12" y="48" font-family="ui-monospace, monospace" font-size="9" fill="#71717a">ARBITRARY HEAP ORDER</text>
        
        <rect x="10" y="62" width="170" height="26" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="18" y="79" font-family="ui-monospace, monospace" font-size="9" fill="#18181b">R1: Val = 82,000</text>

        <rect x="10" y="94" width="170" height="26" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="18" y="111" font-family="ui-monospace, monospace" font-size="9" fill="#18181b">R2: Val = 195,000</text>

        <rect x="10" y="126" width="170" height="26" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="18" y="143" font-family="ui-monospace, monospace" font-size="9" fill="#18181b">R3: Val = 61,000</text>

        <rect x="10" y="158" width="170" height="26" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="18" y="175" font-family="ui-monospace, monospace" font-size="9" fill="#18181b">R4: Val = 142,000</text>

        <rect x="10" y="190" width="170" height="26" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="18" y="207" font-family="ui-monospace, monospace" font-size="9" fill="#18181b">R5: Val = 110,000</text>

        <text x="95" y="260" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">N Tuples In Stream</text>
      </g>

      <path d="M 214 165 H 244" fill="none" stroke="${accent}" stroke-width="1.6" marker-end="url(#arrowHead)" />

      <!-- Card 2: Top-N Heap Comparator Engine -->
      <g transform="translate(248, 28)">
        <rect width="216" height="274" rx="6" fill="#ffffff" stroke="${accent}" stroke-width="1.5" />
        <rect width="216" height="30" rx="6" fill="${accent}" />
        <text x="108" y="20" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#ffffff">TOP-N PRIORITY QUEUE</text>
        <text x="14" y="48" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="${accent}">QUICKSORT &amp; HEAP FENCE</text>
        
        <rect x="12" y="62" width="192" height="42" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="20" y="78" font-family="ui-monospace, monospace" font-size="9.5" font-weight="700" fill="#18181b">PRIMARY COMPARATOR</text>
        <text x="20" y="94" font-family="ui-monospace, monospace" font-size="8.5" fill="${accent}">ORDER BY val DESC</text>

        <rect x="12" y="112" width="192" height="38" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="20" y="128" font-family="ui-monospace, monospace" font-size="9.5" font-weight="700" fill="#18181b">TIE-BREAKER KEY</text>
        <text x="20" y="142" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">id ASC (Deterministic)</text>

        <rect x="12" y="158" width="192" height="52" rx="4" fill="rgba(217,119,6,0.08)" stroke="${accent}" stroke-width="1.4" stroke-dasharray="4 3" />
        <text x="108" y="178" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9.5" font-weight="700" fill="${accent}">KEYSET FENCE: LIMIT 5</text>
        <text x="108" y="194" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Discarding Rank &gt; 5 Immediately</text>

        <rect x="12" y="220" width="192" height="28" rx="4" fill="#f4f4f5" />
        <text x="108" y="238" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" font-weight="600" fill="#18181b">ZERO DISK SPILL // RAM</text>
      </g>

      <path d="M 464 165 H 496" fill="none" stroke="${accent}" stroke-width="1.6" marker-end="url(#arrowHead)" />

      <!-- Card 3: Top-K Ordered Result -->
      <g transform="translate(500, 28)">
        <rect width="216" height="274" rx="6" fill="#ffffff" stroke="#10b981" stroke-width="1.4" />
        <rect width="216" height="30" rx="6" fill="rgba(16,185,129,0.12)" />
        <text x="12" y="20" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#047857">BOUNDED TOP-K RESULT</text>
        <text x="12" y="48" font-family="ui-monospace, monospace" font-size="9" fill="#059669">5 ORDERED TUPLES</text>
        
        <rect x="10" y="62" width="196" height="26" rx="4" fill="rgba(16,185,129,0.05)" />
        <text x="18" y="79" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#047857">1 &bull; 195,000 (Rank #1)</text>

        <rect x="10" y="94" width="196" height="26" rx="4" fill="rgba(16,185,129,0.05)" />
        <text x="18" y="111" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#047857">2 &bull; 142,000 (Rank #2)</text>

        <rect x="10" y="126" width="196" height="26" rx="4" fill="rgba(16,185,129,0.05)" />
        <text x="18" y="143" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#047857">3 &bull; 110,000 (Rank #3)</text>

        <rect x="10" y="158" width="196" height="26" rx="4" fill="rgba(16,185,129,0.05)" />
        <text x="18" y="175" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#047857">4 &bull; 82,000 (Rank #4)</text>

        <rect x="10" y="190" width="196" height="26" rx="4" fill="rgba(16,185,129,0.05)" />
        <text x="18" y="207" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#047857">5 &bull; 61,000 (Rank #5)</text>

        <rect x="10" y="230" width="196" height="28" rx="4" fill="#f4f4f5" />
        <text x="108" y="248" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#059669">✓ PERFECT OFFSET ALIGNMENT</text>
      </g>
    `;
  }

  // Topic 04: AGGREGATES - Multi-Row Vector Reducer Condenser
  function getTopic04Svg(prob, accent) {
    return `
      <!-- Card 1: Multi-Row Column Vector -->
      <g transform="translate(24, 28)">
        <rect width="190" height="274" rx="6" fill="#ffffff" stroke="#d4d4d8" stroke-width="1.2" />
        <rect width="190" height="30" rx="6" fill="#f4f4f5" />
        <text x="12" y="20" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#18181b">COLUMN VECTORS (N)</text>
        <text x="12" y="48" font-family="ui-monospace, monospace" font-size="9" fill="#71717a">N TUPLES IN COLUMN</text>
        
        <rect x="10" y="62" width="170" height="24" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="18" y="78" font-family="ui-monospace, monospace" font-size="9" fill="#18181b">Row 1: 90,000</text>

        <rect x="10" y="92" width="170" height="24" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="18" y="108" font-family="ui-monospace, monospace" font-size="9" fill="#18181b">Row 2: 120,000</text>

        <rect x="10" y="122" width="170" height="24" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="18" y="138" font-family="ui-monospace, monospace" font-size="9" fill="#18181b">Row 3: 75,000</text>

        <rect x="10" y="152" width="170" height="24" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="18" y="168" font-family="ui-monospace, monospace" font-size="9" fill="#18181b">Row 4: 110,000</text>

        <rect x="10" y="182" width="170" height="24" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="18" y="198" font-family="ui-monospace, monospace" font-size="9" fill="#18181b">Row 5: 95,000</text>

        <text x="95" y="260" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Streaming to Accumulator</text>
      </g>

      <path d="M 214 74 H 234 V 140 H 250" fill="none" stroke="${accent}" stroke-width="1.4" />
      <path d="M 214 104 H 242 V 150 H 250" fill="none" stroke="${accent}" stroke-width="1.4" />
      <path d="M 214 134 H 250" fill="none" stroke="${accent}" stroke-width="1.6" marker-end="url(#arrowHead)" />
      <path d="M 214 164 H 242 V 154 H 250" fill="none" stroke="${accent}" stroke-width="1.4" />
      <path d="M 214 194 H 234 V 160 H 250" fill="none" stroke="${accent}" stroke-width="1.4" />

      <!-- Card 2: Reduction Kernel -->
      <g transform="translate(254, 48)">
        <rect width="210" height="234" rx="6" fill="#ffffff" stroke="${accent}" stroke-width="1.5" />
        <rect width="210" height="30" rx="6" fill="${accent}" />
        <text x="105" y="20" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#ffffff">VECTOR REDUCTION KERNEL</text>
        <text x="14" y="52" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="${accent}">MATHEMATICAL ACCUMULATORS</text>
        
        <rect x="12" y="62" width="186" height="36" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="20" y="78" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#18181b">COUNT(*) &rarr; Σ 1</text>
        <text x="20" y="90" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">N = 5 Tuples</text>

        <rect x="12" y="104" width="186" height="36" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="20" y="120" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#18181b">SUM(col) &rarr; Σ x_i</text>
        <text x="20" y="132" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Total = 490,000</text>

        <rect x="12" y="146" width="186" height="36" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="20" y="162" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#18181b">AVG(col) &rarr; Σ x_i / N</text>
        <text x="20" y="174" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Mean = 98,000.00</text>

        <text x="105" y="210" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" font-weight="600" fill="${accent}">1 PASS // CONDENSED TO 1 ROW</text>
      </g>

      <path d="M 464 165 H 496" fill="none" stroke="${accent}" stroke-width="1.6" marker-end="url(#arrowHead)" />

      <!-- Card 3: 1-Row Summary Vector -->
      <g transform="translate(500, 74)">
        <rect width="216" height="182" rx="6" fill="#ffffff" stroke="#10b981" stroke-width="1.4" />
        <rect width="216" height="30" rx="6" fill="rgba(16,185,129,0.12)" />
        <text x="12" y="20" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#047857">SCALAR RESULT (1 ROW)</text>
        <text x="12" y="48" font-family="ui-monospace, monospace" font-size="9" fill="#059669">N &rarr; 1 CONDENSATION</text>
        
        <rect x="10" y="60" width="196" height="28" rx="4" fill="rgba(16,185,129,0.05)" />
        <text x="18" y="78" font-family="ui-monospace, monospace" font-size="9.5" font-weight="700" fill="#047857">COUNT: 5</text>

        <rect x="10" y="94" width="196" height="28" rx="4" fill="rgba(16,185,129,0.05)" />
        <text x="18" y="112" font-family="ui-monospace, monospace" font-size="9.5" font-weight="700" fill="#047857">AVG: 98,000.00</text>

        <rect x="10" y="132" width="196" height="28" rx="4" fill="#f4f4f5" />
        <text x="108" y="150" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#059669">✓ SINGLE TUPLE EMISSION</text>
      </g>
    `;
  }

  // Topic 05: GROUP BY & HAVING - Hash Bucketing & HAVING Barrier Gate
  function getTopic05Svg(prob, accent) {
    return `
      <!-- Card 1: Input Tuples with Keys -->
      <g transform="translate(24, 28)">
        <rect width="180" height="274" rx="6" fill="#ffffff" stroke="#d4d4d8" stroke-width="1.2" />
        <rect width="180" height="30" rx="6" fill="#f4f4f5" />
        <text x="12" y="20" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#18181b">UNGROUPED STREAM</text>
        <text x="12" y="48" font-family="ui-monospace, monospace" font-size="9" fill="#71717a">STREAMING TUPLES</text>
        
        <rect x="10" y="62" width="160" height="26" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="16" y="79" font-family="ui-monospace, monospace" font-size="9" fill="#18181b">T1 &bull; Dept: Eng</text>

        <rect x="10" y="94" width="160" height="26" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="16" y="111" font-family="ui-monospace, monospace" font-size="9" fill="#18181b">T2 &bull; Dept: Sales</text>

        <rect x="10" y="126" width="160" height="26" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="16" y="143" font-family="ui-monospace, monospace" font-size="9" fill="#18181b">T3 &bull; Dept: Eng</text>

        <rect x="10" y="158" width="160" height="26" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="16" y="175" font-family="ui-monospace, monospace" font-size="9" fill="#18181b">T4 &bull; Dept: HR</text>

        <rect x="10" y="190" width="160" height="26" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="16" y="207" font-family="ui-monospace, monospace" font-size="9" fill="#18181b">T5 &bull; Dept: Sales</text>

        <text x="90" y="260" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Routed by Hash Key</text>
      </g>

      <path d="M 204 165 H 234" fill="none" stroke="${accent}" stroke-width="1.6" marker-end="url(#arrowHead)" />

      <!-- Card 2: Hash Partitioning & HAVING Gate -->
      <g transform="translate(238, 28)">
        <rect width="230" height="274" rx="6" fill="#ffffff" stroke="${accent}" stroke-width="1.5" />
        <rect width="230" height="30" rx="6" fill="${accent}" />
        <text x="115" y="20" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#ffffff">HASH BUCKET PARTITIONS</text>
        <text x="14" y="48" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="${accent}">GROUP BY + HAVING GATE</text>
        
        <rect x="10" y="58" width="210" height="42" rx="4" fill="rgba(2,132,199,0.06)" stroke="${accent}" stroke-width="1.2" />
        <text x="18" y="74" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#0369a1">BUCKET A // 'Engineering'</text>
        <text x="18" y="90" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Count: 2 | Sum: 210,000</text>

        <rect x="10" y="106" width="210" height="42" rx="4" fill="rgba(2,132,199,0.06)" stroke="${accent}" stroke-width="1.2" />
        <text x="18" y="122" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#0369a1">BUCKET B // 'Sales'</text>
        <text x="18" y="138" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Count: 2 | Sum: 185,000</text>

        <rect x="10" y="154" width="210" height="38" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="18" y="170" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#71717a">BUCKET C // 'HR'</text>
        <text x="18" y="184" font-family="ui-monospace, monospace" font-size="8" fill="#dc2626">Count: 1 &rarr; Fails HAVING &gt; 1</text>

        <rect x="10" y="198" width="210" height="36" rx="4" fill="rgba(220,38,38,0.06)" stroke="#dc2626" stroke-width="1" stroke-dasharray="3 3" />
        <text x="115" y="215" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" fill="#dc2626">HAVING COUNT(*) &gt; 1 BARRIER</text>
        <text x="115" y="227" text-anchor="middle" font-family="ui-monospace, monospace" font-size="7.5" fill="#71717a">Bucket C Dropped Post-Aggregate</text>

        <text x="115" y="258" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">In-Memory Hash Buckets</text>
      </g>

      <path d="M 468 128 H 500" fill="none" stroke="#059669" stroke-width="1.8" marker-end="url(#arrowGreen)" />

      <!-- Card 3: Qualified Emitted Groups -->
      <g transform="translate(504, 50)">
        <rect width="212" height="230" rx="6" fill="#ffffff" stroke="#10b981" stroke-width="1.4" />
        <rect width="212" height="30" rx="6" fill="rgba(16,185,129,0.12)" />
        <text x="12" y="20" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#047857">EMITTED GROUPS</text>
        <text x="12" y="48" font-family="ui-monospace, monospace" font-size="9" fill="#059669">2 GROUPS QUALIFIED</text>
        
        <rect x="10" y="60" width="192" height="36" rx="4" fill="rgba(16,185,129,0.05)" />
        <text x="18" y="77" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#047857">1 &bull; Engineering</text>
        <text x="18" y="89" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Count: 2 | Sum: 210k</text>

        <rect x="10" y="104" width="192" height="36" rx="4" fill="rgba(16,185,129,0.05)" />
        <text x="18" y="121" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#047857">2 &bull; Sales</text>
        <text x="18" y="133" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Count: 2 | Sum: 185k</text>

        <rect x="10" y="152" width="192" height="28" rx="4" fill="#f4f4f5" />
        <text x="106" y="170" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" fill="#059669">✓ 100% GROUP ALIGNMENT</text>
      </g>
    `;
  }

  // Topic 06: JOINS - Relational Hash Join Matrix & NULL Padding
  function getTopic06Svg(prob, accent) {
    return `
      <!-- Card 1a: Build Table -->
      <g transform="translate(24, 28)">
        <rect width="180" height="120" rx="6" fill="#ffffff" stroke="#d4d4d8" stroke-width="1.2" />
        <rect width="180" height="26" rx="6" fill="#f4f4f5" />
        <text x="10" y="18" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#18181b">BUILD TABLE: Orders (R)</text>
        
        <rect x="8" y="34" width="164" height="20" rx="3" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="14" y="48" font-family="ui-monospace, monospace" font-size="8.5" fill="#18181b">O101 &bull; CustID: 1</text>

        <rect x="8" y="58" width="164" height="20" rx="3" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="14" y="72" font-family="ui-monospace, monospace" font-size="8.5" fill="#18181b">O102 &bull; CustID: 2</text>

        <rect x="8" y="82" width="164" height="20" rx="3" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="14" y="96" font-family="ui-monospace, monospace" font-size="8.5" fill="#18181b">O103 &bull; CustID: 1</text>
      </g>

      <!-- Card 1b: Probe Table -->
      <g transform="translate(24, 164)">
        <rect width="180" height="138" rx="6" fill="#ffffff" stroke="#d4d4d8" stroke-width="1.2" />
        <rect width="180" height="26" rx="6" fill="#f4f4f5" />
        <text x="10" y="18" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#18181b">PROBE: Customers (S)</text>
        
        <rect x="8" y="34" width="164" height="20" rx="3" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="14" y="48" font-family="ui-monospace, monospace" font-size="8.5" fill="#18181b">C1 &bull; Alice (Match)</text>

        <rect x="8" y="58" width="164" height="20" rx="3" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="14" y="72" font-family="ui-monospace, monospace" font-size="8.5" fill="#18181b">C2 &bull; Bob (Match)</text>

        <rect x="8" y="82" width="164" height="20" rx="3" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="14" y="96" font-family="ui-monospace, monospace" font-size="8.5" fill="#18181b">C3 &bull; Carol (No Orders)</text>

        <text x="90" y="126" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Probes Build Hash Table</text>
      </g>

      <path d="M 204 88 H 234" fill="none" stroke="${accent}" stroke-width="1.4" marker-end="url(#arrowHead)" />
      <path d="M 204 220 H 234" fill="none" stroke="${accent}" stroke-width="1.4" marker-end="url(#arrowHead)" />

      <!-- Card 2: Hash Match & Join Operator -->
      <g transform="translate(238, 28)">
        <rect width="230" height="274" rx="6" fill="#ffffff" stroke="${accent}" stroke-width="1.5" />
        <rect width="230" height="30" rx="6" fill="${accent}" />
        <text x="115" y="20" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#ffffff">RELATIONAL HASH MATCH</text>
        <text x="14" y="48" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="${accent}">ON R.customer_id = S.id</text>
        
        <rect x="10" y="58" width="210" height="48" rx="4" fill="rgba(5,150,105,0.06)" stroke="#059669" stroke-width="1.2" />
        <text x="18" y="76" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#047857">MATCH: C1 &harr; O101, O103</text>
        <text x="18" y="92" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Hash Key Match &rarr; Emitted</text>

        <rect x="10" y="114" width="210" height="48" rx="4" fill="rgba(5,150,105,0.06)" stroke="#059669" stroke-width="1.2" />
        <text x="18" y="132" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#047857">MATCH: C2 &harr; O102</text>
        <text x="18" y="148" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Hash Key Match &rarr; Emitted</text>

        <rect x="10" y="170" width="210" height="48" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="18" y="188" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#dc2626">UNMATCHED: C3 &harr; NULL</text>
        <text x="18" y="204" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">LEFT JOIN Padded / INNER Dropped</text>

        <text x="115" y="258" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Linear Time: O(N + M)</text>
      </g>

      <path d="M 468 165 H 500" fill="none" stroke="${accent}" stroke-width="1.6" marker-end="url(#arrowHead)" />

      <!-- Card 3: Combined Relational Output -->
      <g transform="translate(504, 28)">
        <rect width="212" height="274" rx="6" fill="#ffffff" stroke="#10b981" stroke-width="1.4" />
        <rect width="212" height="30" rx="6" fill="rgba(16,185,129,0.12)" />
        <text x="12" y="20" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#047857">JOINED RELATION</text>
        <text x="12" y="48" font-family="ui-monospace, monospace" font-size="9" fill="#059669">COMPOSITE TUPLES</text>
        
        <rect x="10" y="60" width="192" height="26" rx="4" fill="rgba(16,185,129,0.05)" />
        <text x="16" y="77" font-family="ui-monospace, monospace" font-size="8.5" font-weight="600" fill="#047857">O101 | C1 (Alice)</text>

        <rect x="10" y="94" width="192" height="26" rx="4" fill="rgba(16,185,129,0.05)" />
        <text x="16" y="111" font-family="ui-monospace, monospace" font-size="8.5" font-weight="600" fill="#047857">O102 | C2 (Bob)</text>

        <rect x="10" y="128" width="192" height="26" rx="4" fill="rgba(16,185,129,0.05)" />
        <text x="16" y="145" font-family="ui-monospace, monospace" font-size="8.5" font-weight="600" fill="#047857">O103 | C1 (Alice)</text>

        <rect x="10" y="162" width="192" height="26" rx="4" fill="#fafafa" />
        <text x="16" y="179" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">NULL | C3 (Carol)</text>

        <rect x="10" y="230" width="192" height="28" rx="4" fill="#f4f4f5" />
        <text x="106" y="248" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" fill="#059669">✓ 100% TUPLE JOINED</text>
      </g>
    `;
  }

  // Topic 07: ADVANCED JOINS - Self-Join Coordinate Matrix & Reflection
  function getTopic07Svg(prob, accent) {
    return `
      <!-- Card 1: Self Relation Inputs -->
      <g transform="translate(24, 28)">
        <rect width="180" height="274" rx="6" fill="#ffffff" stroke="#d4d4d8" stroke-width="1.2" />
        <rect width="180" height="30" rx="6" fill="#f4f4f5" />
        <text x="12" y="20" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#18181b">SELF RELATION (T &times; T)</text>
        <text x="12" y="48" font-family="ui-monospace, monospace" font-size="9" fill="#71717a">CARTESIAN PRODUCT</text>
        
        <rect x="10" y="62" width="160" height="42" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="18" y="80" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#18181b">ALIAS A</text>
        <text x="18" y="94" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Tuples {1, 2, 3, 4}</text>

        <rect x="10" y="118" width="160" height="42" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="18" y="136" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#18181b">ALIAS B</text>
        <text x="18" y="150" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Tuples {1, 2, 3, 4}</text>

        <text x="90" y="260" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">N &times; N Permutations</text>
      </g>

      <path d="M 204 165 H 234" fill="none" stroke="${accent}" stroke-width="1.6" marker-end="url(#arrowHead)" />

      <!-- Card 2: Symmetric Reflection Matrix -->
      <g transform="translate(238, 28)">
        <rect width="230" height="274" rx="6" fill="#ffffff" stroke="${accent}" stroke-width="1.5" />
        <rect width="230" height="30" rx="6" fill="${accent}" />
        <text x="115" y="20" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#ffffff">COORDINATE MATRIX (X &le; Y)</text>
        <text x="14" y="48" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="${accent}">REFLECTION PRUNING</text>
        
        <g transform="translate(30, 64)">
          <rect x="0" y="0" width="48" height="38" fill="rgba(79,70,229,0.12)" stroke="#e4e4e7" />
          <text x="24" y="24" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" fill="#4f46e5">(1,1)</text>

          <rect x="54" y="0" width="48" height="38" fill="rgba(79,70,229,0.12)" stroke="#e4e4e7" />
          <text x="78" y="24" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" fill="#4f46e5">(1,2)</text>

          <rect x="108" y="0" width="48" height="38" fill="rgba(79,70,229,0.12)" stroke="#e4e4e7" />
          <text x="132" y="24" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" fill="#4f46e5">(1,3)</text>

          <rect x="0" y="44" width="48" height="38" fill="#f4f4f5" stroke="#e4e4e7" stroke-dasharray="2 2" />
          <text x="24" y="68" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8" fill="#a1a1aa">Pruned</text>

          <rect x="54" y="44" width="48" height="38" fill="rgba(79,70,229,0.12)" stroke="#e4e4e7" />
          <text x="78" y="68" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" fill="#4f46e5">(2,2)</text>

          <rect x="108" y="44" width="48" height="38" fill="rgba(79,70,229,0.12)" stroke="#e4e4e7" />
          <text x="132" y="68" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" fill="#4f46e5">(2,3)</text>

          <rect x="0" y="88" width="48" height="38" fill="#f4f4f5" stroke="#e4e4e7" stroke-dasharray="2 2" />
          <text x="24" y="112" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8" fill="#a1a1aa">Pruned</text>

          <rect x="54" y="88" width="48" height="38" fill="#f4f4f5" stroke="#e4e4e7" stroke-dasharray="2 2" />
          <text x="78" y="112" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8" fill="#a1a1aa">Pruned</text>

          <rect x="108" y="88" width="48" height="38" fill="rgba(79,70,229,0.12)" stroke="#e4e4e7" />
          <text x="132" y="112" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" fill="#4f46e5">(3,3)</text>
        </g>

        <text x="115" y="240" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8" font-weight="700" fill="#4f46e5">PREDICATE: A.id &le; B.id</text>
        <text x="115" y="258" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Lower Triangle Pruned</text>
      </g>

      <path d="M 468 165 H 500" fill="none" stroke="${accent}" stroke-width="1.6" marker-end="url(#arrowHead)" />

      <!-- Card 3: Deduplicated Canonical Pairs -->
      <g transform="translate(504, 28)">
        <rect width="212" height="274" rx="6" fill="#ffffff" stroke="#10b981" stroke-width="1.4" />
        <rect width="212" height="30" rx="6" fill="rgba(16,185,129,0.12)" />
        <text x="12" y="20" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#047857">CANONICAL PAIRS</text>
        <text x="12" y="48" font-family="ui-monospace, monospace" font-size="9" fill="#059669">ZERO MIRROR DUPLICATES</text>
        
        <rect x="10" y="60" width="192" height="26" rx="4" fill="rgba(16,185,129,0.05)" />
        <text x="16" y="77" font-family="ui-monospace, monospace" font-size="8.5" font-weight="600" fill="#047857">Pair (1, 1): Self-Match</text>

        <rect x="10" y="94" width="192" height="26" rx="4" fill="rgba(16,185,129,0.05)" />
        <text x="16" y="111" font-family="ui-monospace, monospace" font-size="8.5" font-weight="600" fill="#047857">Pair (1, 2): Unique</text>

        <rect x="10" y="128" width="192" height="26" rx="4" fill="rgba(16,185,129,0.05)" />
        <text x="16" y="145" font-family="ui-monospace, monospace" font-size="8.5" font-weight="600" fill="#047857">Pair (1, 3): Unique</text>

        <rect x="10" y="162" width="192" height="26" rx="4" fill="rgba(16,185,129,0.05)" />
        <text x="16" y="179" font-family="ui-monospace, monospace" font-size="8.5" fill="#047857">Pair (2, 3): Unique</text>

        <rect x="10" y="230" width="192" height="28" rx="4" fill="#f4f4f5" />
        <text x="106" y="248" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" fill="#059669">✓ DEDUPLICATED RELATIONS</text>
      </g>
    `;
  }

  // Topic 08: CASE WHEN - Orthogonal Multiplexer Decision Gate
  function getTopic08Svg(prob, accent) {
    return `
      <!-- Card 1: Input Attributes -->
      <g transform="translate(24, 28)">
        <rect width="180" height="274" rx="6" fill="#ffffff" stroke="#d4d4d8" stroke-width="1.2" />
        <rect width="180" height="30" rx="6" fill="#f4f4f5" />
        <text x="12" y="20" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#18181b">INPUT ATTRIBUTES</text>
        <text x="12" y="48" font-family="ui-monospace, monospace" font-size="9" fill="#71717a">COLUMN TUPLE VALUES</text>
        
        <rect x="10" y="62" width="160" height="34" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="16" y="78" font-family="ui-monospace, monospace" font-size="9" fill="#18181b">T1: score = 94</text>
        <text x="16" y="90" font-family="ui-monospace, monospace" font-size="8" fill="#ea580c">Evaluates to Branch 1</text>

        <rect x="10" y="106" width="160" height="34" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="16" y="122" font-family="ui-monospace, monospace" font-size="9" fill="#18181b">T2: score = 78</text>
        <text x="16" y="134" font-family="ui-monospace, monospace" font-size="8" fill="#ea580c">Evaluates to Branch 2</text>

        <rect x="10" y="150" width="160" height="34" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="16" y="166" font-family="ui-monospace, monospace" font-size="9" fill="#18181b">T3: score = 52</text>
        <text x="16" y="178" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Evaluates to ELSE</text>

        <text x="90" y="260" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Short-Circuit Execution</text>
      </g>

      <path d="M 204 165 H 234" fill="none" stroke="${accent}" stroke-width="1.6" marker-end="url(#arrowHead)" />

      <!-- Card 2: Decision Ladder Multiplexer -->
      <g transform="translate(238, 28)">
        <rect width="230" height="274" rx="6" fill="#ffffff" stroke="${accent}" stroke-width="1.5" />
        <rect width="230" height="30" rx="6" fill="${accent}" />
        <text x="115" y="20" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#ffffff">DECISION MULTIPLEXER</text>
        <text x="14" y="48" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="${accent}">SHORT-CIRCUIT CASCADE</text>
        
        <rect x="10" y="58" width="210" height="42" rx="4" fill="rgba(234,88,12,0.06)" stroke="${accent}" stroke-width="1.2" />
        <text x="18" y="74" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#c2410c">WHEN score &ge; 90 THEN 'A'</text>
        <text x="18" y="90" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Matches T1 &rarr; Short-Circuits</text>

        <rect x="10" y="106" width="210" height="42" rx="4" fill="rgba(234,88,12,0.06)" stroke="${accent}" stroke-width="1.2" />
        <text x="18" y="122" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#c2410c">WHEN score &ge; 75 THEN 'B'</text>
        <text x="18" y="138" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Matches T2 &rarr; Short-Circuits</text>

        <rect x="10" y="154" width="210" height="42" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="18" y="170" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#71717a">ELSE 'C' (Default)</text>
        <text x="18" y="186" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Fallback for Remaining Tuples</text>

        <rect x="10" y="210" width="210" height="32" rx="4" fill="#f4f4f5" />
        <text x="115" y="230" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" fill="#18181b">SYNTHESIZED COLUMN OUTPUT</text>
      </g>

      <path d="M 468 165 H 500" fill="none" stroke="${accent}" stroke-width="1.6" marker-end="url(#arrowHead)" />

      <!-- Card 3: Synthesized Output Column -->
      <g transform="translate(504, 28)">
        <rect width="212" height="274" rx="6" fill="#ffffff" stroke="#10b981" stroke-width="1.4" />
        <rect width="212" height="30" rx="6" fill="rgba(16,185,129,0.12)" />
        <text x="12" y="20" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#047857">EMITTED ATTRIBUTES</text>
        <text x="12" y="48" font-family="ui-monospace, monospace" font-size="9" fill="#059669">EVALUATED COLUMN</text>
        
        <rect x="10" y="60" width="192" height="32" rx="4" fill="rgba(16,185,129,0.05)" />
        <text x="16" y="80" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#047857">T1: score=94 &rarr; 'A'</text>

        <rect x="10" y="100" width="192" height="32" rx="4" fill="rgba(16,185,129,0.05)" />
        <text x="16" y="120" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#047857">T2: score=78 &rarr; 'B'</text>

        <rect x="10" y="140" width="192" height="32" rx="4" fill="rgba(16,185,129,0.05)" />
        <text x="16" y="160" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#047857">T3: score=52 &rarr; 'C'</text>

        <rect x="10" y="230" width="192" height="28" rx="4" fill="#f4f4f5" />
        <text x="106" y="248" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" fill="#059669">✓ 100% BRANCH FIDELITY</text>
      </g>
    `;
  }

  // Topic 09: SUBQUERIES & CTES - Ephemeral CTE Buffer DAG
  function getTopic09Svg(prob, accent) {
    return `
      <!-- Card 1a: CTE Definition -->
      <g transform="translate(24, 28)">
        <rect width="190" height="126" rx="6" fill="#ffffff" stroke="#d4d4d8" stroke-width="1.2" />
        <rect width="190" height="28" rx="6" fill="#f4f4f5" />
        <text x="10" y="18" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#18181b">WITH cte_name AS (...)</text>
        
        <rect x="8" y="36" width="174" height="22" rx="3" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="14" y="51" font-family="ui-monospace, monospace" font-size="8.5" fill="#18181b">SELECT dept, AVG(salary)</text>

        <rect x="8" y="62" width="174" height="22" rx="3" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="14" y="77" font-family="ui-monospace, monospace" font-size="8.5" fill="#18181b">FROM Employees</text>

        <text x="95" y="112" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Materialized in RAM Buffer</text>
      </g>

      <!-- Card 1b: Ephemeral Buffer -->
      <g transform="translate(24, 168)">
        <rect width="190" height="134" rx="6" fill="#ffffff" stroke="${accent}" stroke-width="1.4" />
        <rect width="190" height="28" rx="6" fill="rgba(8,145,178,0.12)" />
        <text x="10" y="18" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#0e7490">RAM BUFFER // EPHEMERAL</text>
        
        <rect x="8" y="36" width="174" height="20" rx="3" fill="rgba(8,145,178,0.05)" />
        <text x="14" y="50" font-family="ui-monospace, monospace" font-size="8" font-weight="600" fill="#0e7490">Eng: 105,000</text>

        <rect x="8" y="60" width="174" height="20" rx="3" fill="rgba(8,145,178,0.05)" />
        <text x="14" y="74" font-family="ui-monospace, monospace" font-size="8" font-weight="600" fill="#0e7490">Sales: 92,500</text>

        <text x="95" y="114" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Inlined or Spooled in Memory</text>
      </g>

      <path d="M 214 220 H 244" fill="none" stroke="${accent}" stroke-width="1.6" marker-end="url(#arrowHead)" />

      <!-- Card 2: Outer Query DAG Planner -->
      <g transform="translate(248, 28)">
        <rect width="216" height="274" rx="6" fill="#ffffff" stroke="${accent}" stroke-width="1.5" />
        <rect width="216" height="30" rx="6" fill="${accent}" />
        <text x="108" y="20" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#ffffff">OUTER QUERY DAG PLANNER</text>
        <text x="14" y="48" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="${accent}">RELATIONAL COMPOSITION</text>
        
        <rect x="10" y="60" width="196" height="48" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="18" y="78" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#18181b">OUTER FROM / JOIN</text>
        <text x="18" y="94" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">References CTE buffer</text>

        <rect x="10" y="116" width="196" height="48" rx="4" fill="rgba(8,145,178,0.06)" stroke="${accent}" stroke-width="1" />
        <text x="18" y="134" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#0e7490">CORRELATION EVALUATOR</text>
        <text x="18" y="150" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Subquery inlined if cheap</text>

        <rect x="10" y="172" width="196" height="42" rx="4" fill="#f4f4f5" />
        <text x="108" y="196" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" font-weight="600" fill="#18181b">COST-BASED OPTIMIZATION</text>

        <text x="108" y="258" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">DAG Acyclic Execution</text>
      </g>

      <path d="M 464 165 H 496" fill="none" stroke="${accent}" stroke-width="1.6" marker-end="url(#arrowHead)" />

      <!-- Card 3: Final Output -->
      <g transform="translate(500, 28)">
        <rect width="216" height="274" rx="6" fill="#ffffff" stroke="#10b981" stroke-width="1.4" />
        <rect width="216" height="30" rx="6" fill="rgba(16,185,129,0.12)" />
        <text x="12" y="20" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#047857">FINAL DAG RESULT</text>
        <text x="12" y="48" font-family="ui-monospace, monospace" font-size="9" fill="#059669">EMITTED TUPLES</text>
        
        <rect x="10" y="60" width="196" height="28" rx="4" fill="rgba(16,185,129,0.05)" />
        <text x="18" y="78" font-family="ui-monospace, monospace" font-size="8.5" font-weight="600" fill="#047857">Alice &bull; Salary &gt; Avg (Eng)</text>

        <rect x="10" y="96" width="196" height="28" rx="4" fill="rgba(16,185,129,0.05)" />
        <text x="18" y="114" font-family="ui-monospace, monospace" font-size="8.5" font-weight="600" fill="#047857">Bob &bull; Salary &gt; Avg (Sales)</text>

        <rect x="10" y="230" width="196" height="28" rx="4" fill="#f4f4f5" />
        <text x="108" y="248" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" fill="#059669">✓ ZERO UNNECESSARY PASSES</text>
      </g>
    `;
  }

  // Topic 10: WINDOW FUNCTIONS - Partitioned Sliding Frame & Accumulator
  function getTopic10Svg(prob, accent) {
    return `
      <!-- Card 1: Partitioned Tuples -->
      <g transform="translate(24, 28)">
        <rect width="180" height="274" rx="6" fill="#ffffff" stroke="#d4d4d8" stroke-width="1.2" />
        <rect width="180" height="30" rx="6" fill="#f4f4f5" />
        <text x="12" y="20" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#18181b">PARTITIONED ROWS</text>
        <text x="12" y="48" font-family="ui-monospace, monospace" font-size="9" fill="#71717a">PARTITION BY dept</text>
        
        <rect x="8" y="60" width="164" height="24" rx="3" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="14" y="76" font-family="ui-monospace, monospace" font-size="8.5" fill="#18181b">Row 1: Eng (80k)</text>

        <rect x="8" y="88" width="164" height="24" rx="3" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="14" y="104" font-family="ui-monospace, monospace" font-size="8.5" fill="#18181b">Row 2: Eng (95k)</text>

        <rect x="8" y="116" width="164" height="24" rx="3" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="14" y="132" font-family="ui-monospace, monospace" font-size="8.5" fill="#18181b">Row 3: Eng (110k)</text>

        <line x1="8" y1="148" x2="172" y2="148" stroke="${accent}" stroke-dasharray="3 3" stroke-width="1.4" />
        <text x="90" y="160" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8" fill="${accent}">--- PARTITION BOUNDARY ---</text>

        <rect x="8" y="170" width="164" height="24" rx="3" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="14" y="186" font-family="ui-monospace, monospace" font-size="8.5" fill="#18181b">Row 4: Sales (70k)</text>

        <text x="90" y="260" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Preserving All Tuples</text>
      </g>

      <path d="M 204 165 H 234" fill="none" stroke="${accent}" stroke-width="1.6" marker-end="url(#arrowHead)" />

      <!-- Card 2: Sliding Frame Accumulator -->
      <g transform="translate(238, 28)">
        <rect width="230" height="274" rx="6" fill="#ffffff" stroke="${accent}" stroke-width="1.5" />
        <rect width="230" height="30" rx="6" fill="${accent}" />
        <text x="115" y="20" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#ffffff">SLIDING WINDOW FRAME</text>
        <text x="14" y="48" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="${accent}">OVER (ORDER BY hire_date)</text>
        
        <rect x="10" y="58" width="210" height="42" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="18" y="74" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#18181b">ORDER WITHIN PARTITION</text>
        <text x="18" y="88" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">hire_date ASC / salary ASC</text>

        <rect x="10" y="108" width="210" height="64" rx="4" fill="rgba(147,51,234,0.08)" stroke="${accent}" stroke-width="1.2" />
        <text x="18" y="126" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#7e22ce">FRAME ACCUMULATOR</text>
        <text x="18" y="142" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">ROWS BETWEEN UNBOUNDED</text>
        <text x="18" y="156" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">PRECEDING AND CURRENT ROW</text>

        <rect x="10" y="180" width="210" height="38" rx="4" fill="#fafafa" stroke="#e4e4e7" stroke-width="1" />
        <text x="18" y="196" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" fill="#18181b">FUNCTIONS SUPPORTED</text>
        <text x="18" y="210" font-family="ui-monospace, monospace" font-size="8" fill="#7e22ce">ROW_NUMBER, RANK, DENSE_RANK, SUM</text>

        <text x="115" y="258" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Zero Row Collapsing</text>
      </g>

      <path d="M 468 165 H 500" fill="none" stroke="${accent}" stroke-width="1.6" marker-end="url(#arrowHead)" />

      <!-- Card 3: Preserved Tuples with Analytics -->
      <g transform="translate(504, 28)">
        <rect width="212" height="274" rx="6" fill="#ffffff" stroke="#10b981" stroke-width="1.4" />
        <rect width="212" height="30" rx="6" fill="rgba(16,185,129,0.12)" />
        <text x="12" y="20" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#047857">PRESERVED ROWS + METRIC</text>
        <text x="12" y="48" font-family="ui-monospace, monospace" font-size="9" fill="#059669">INDIVIDUAL TUPLES INTACT</text>
        
        <rect x="10" y="60" width="192" height="26" rx="4" fill="rgba(16,185,129,0.05)" />
        <text x="16" y="77" font-family="ui-monospace, monospace" font-size="8.5" font-weight="600" fill="#047857">Eng: 80k &bull; Rank #1 (Running 80k)</text>

        <rect x="10" y="94" width="192" height="26" rx="4" fill="rgba(16,185,129,0.05)" />
        <text x="16" y="111" font-family="ui-monospace, monospace" font-size="8.5" font-weight="600" fill="#047857">Eng: 95k &bull; Rank #2 (Running 175k)</text>

        <rect x="10" y="128" width="192" height="26" rx="4" fill="rgba(16,185,129,0.05)" />
        <text x="16" y="145" font-family="ui-monospace, monospace" font-size="8.5" font-weight="600" fill="#047857">Eng: 110k &bull; Rank #3 (Running 285k)</text>

        <rect x="10" y="162" width="192" height="26" rx="4" fill="rgba(16,185,129,0.05)" />
        <text x="16" y="179" font-family="ui-monospace, monospace" font-size="8.5" font-weight="600" fill="#047857">Sales: 70k &bull; Rank #1 (Running 70k)</text>

        <rect x="10" y="230" width="192" height="28" rx="4" fill="#f4f4f5" />
        <text x="106" y="248" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" fill="#059669">✓ 100% RELATIONAL PRESERVATION</text>
      </g>
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
          <div style="font-weight: 600; font-size: 13px; color: var(--text-primary); margin-bottom: 4px;">Click 'Verify' to test your SQL against expected output</div>
          <p style="font-size: 11.5px; max-width: 360px; margin: 0 auto;">Evaluates your result tuples against canonical expected answers and color-codes matched, extra, and missing rows.</p>
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
            SQL is declarative: written syntax starts with <code>SELECT</code>, but physical relational engines execute in strict order:
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
    // 1. Problem Carousel Range Slider Scrubber
    const carouselRange = document.getElementById('problemCarouselRange');
    if (carouselRange) {
      carouselRange.addEventListener('input', (e) => {
        const idx = parseInt(e.target.value, 10) - 1;
        const all = getAllProblems();
        if (all[idx]) {
          selectProblem(all[idx].id);
        }
      });
    }

    // 2. Carousel Prev & Next Slider Buttons
    const btnPrevProb = document.getElementById('btnPrevProblemSlider');
    if (btnPrevProb) {
      btnPrevProb.addEventListener('click', () => {
        const all = getAllProblems();
        const curIdx = all.findIndex(p => p.id === state.activeProblemId);
        const targetIdx = curIdx > 0 ? curIdx - 1 : all.length - 1;
        selectProblem(all[targetIdx].id);
      });
    }

    const btnNextProb = document.getElementById('btnNextProblemSlider');
    if (btnNextProb) {
      btnNextProb.addEventListener('click', () => {
        const all = getAllProblems();
        const curIdx = all.findIndex(p => p.id === state.activeProblemId);
        const targetIdx = curIdx < all.length - 1 ? curIdx + 1 : 0;
        selectProblem(all[targetIdx].id);
      });
    }

    // 3. Toggle Collapsible All-Topics & Problems Tiles Drawer
    const btnToggleTiles = document.getElementById('btnToggleProblemTiles');
    if (btnToggleTiles) {
      btnToggleTiles.addEventListener('click', () => {
        state.tilesOpen = !state.tilesOpen;
        const drawer = document.getElementById('studioProblemTilesDrawer');
        if (drawer) {
          drawer.style.display = state.tilesOpen ? 'block' : 'none';
          drawer.classList.toggle('open', state.tilesOpen);
          drawer.classList.toggle('collapsed', !state.tilesOpen);
        }
        btnToggleTiles.classList.toggle('active', state.tilesOpen);
        const chevron = btnToggleTiles.querySelector('.tiles-state-chevron');
        if (chevron) chevron.innerHTML = state.tilesOpen ? '&#9650; Collapse' : '&#9660; Expand Tiles';
      });
    }

    const btnCloseDrawer = document.getElementById('btnCloseTilesDrawer');
    if (btnCloseDrawer) {
      btnCloseDrawer.addEventListener('click', () => {
        state.tilesOpen = false;
        const drawer = document.getElementById('studioProblemTilesDrawer');
        if (drawer) {
          drawer.style.display = 'none';
          drawer.classList.remove('open');
          drawer.classList.add('collapsed');
        }
        if (btnToggleTiles) {
          btnToggleTiles.classList.remove('active');
          const chevron = btnToggleTiles.querySelector('.tiles-state-chevron');
          if (chevron) chevron.innerHTML = '&#9660; Expand Tiles';
        }
      });
    }

    // 4. Click on Problem Tile Card in Drawer
    document.querySelectorAll('.problem-tile-card').forEach(card => {
      card.addEventListener('click', () => {
        const probId = card.dataset.problemid;
        if (probId) {
          selectProblem(probId);
        }
      });
    });

    // 5. Drawer Difficulty Filter Buttons
    document.querySelectorAll('.tiles-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const diff = btn.dataset.diff || 'all';
        state.activeDifficulty = diff;
        document.querySelectorAll('.tiles-filter-btn').forEach(b => b.classList.toggle('active', b === btn));
        applyTilesFilter();
      });
    });

    // 6. Drawer Live Keyword Search
    const searchInput = document.getElementById('tilesSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.filterSearch = e.target.value.toLowerCase().trim();
        applyTilesFilter();
      });
    }

    function applyTilesFilter() {
      const q = (state.filterSearch || '').toLowerCase().trim();
      const diff = state.activeDifficulty || 'all';
      document.querySelectorAll('.problem-tile-card').forEach(card => {
        const pId = card.dataset.problemid;
        const prob = getProblemById(pId);
        if (!prob) return;
        const matchesDiff = diff === 'all' || prob.difficulty === diff;
        const matchesSearch = !q ||
          prob.title.toLowerCase().includes(q) ||
          prob.spec.toLowerCase().includes(q) ||
          prob.targetTable.toLowerCase().includes(q) ||
          prob.topicTitle.toLowerCase().includes(q);
        card.classList.toggle('filtered-out', !(matchesDiff && matchesSearch));
      });
    }

    // 7. Drawer Jump to Topic Chips
    document.querySelectorAll('.tiles-jump-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const seq = chip.dataset.jumptopic;
        if (seq) {
          const targetTile = document.getElementById('topicTile_' + seq);
          if (targetTile) {
            targetTile.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            targetTile.style.boxShadow = '0 0 0 3px #2563eb';
            setTimeout(() => { targetTile.style.boxShadow = ''; }, 1200);
          }
        }
      });
    });

    // 8. Layout Split Preset Buttons (70% Editor, 50/50, 70% Stage)
    document.querySelectorAll('[data-layout-pct]').forEach(btn => {
      btn.addEventListener('click', () => {
        const pct = parseInt(btn.dataset.layoutPct, 10);
        if (!isNaN(pct)) {
          state.splitPercent = pct;
          state.layoutMode = 'split';
          const grid = document.getElementById('studioWorkspaceGrid');
          if (grid) {
            grid.className = 'studio-workspace-grid layout-split';
            grid.style.gridTemplateColumns = pct + '% 14px calc(' + (100 - pct) + '% - 14px)';
          }
          document.querySelectorAll('[data-layout-pct]').forEach(b => b.classList.toggle('active', b === btn));
        }
      });
    });

    // Run Problem Button
    const btnRun = document.getElementById('btnStudioRunProblem');
    if (btnRun) {
      btnRun.addEventListener('click', () => {
        const sqlInput = getStudioSqlInputElement();
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
        const sqlInput = getStudioSqlInputElement();
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
        const sqlInput = getStudioSqlInputElement();
        if (prob && sqlInput) {
          sqlInput.value = prob.starterSql;
          state.testResult = null;
          syncEditorLineNumbers();
          runStudioQuery(sqlInput.value);
        }
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

    // Stage Tabs
    document.querySelectorAll('.tab-item').forEach(tab => {
      tab.addEventListener('click', () => {
        const tabKey = tab.dataset.tab;
        if (tabKey) setStageTab(tabKey);
      });
    });

    // Draggable Split Pane Slider
    const splitSlider = document.getElementById('studioSplitSlider');
    const grid = document.getElementById('studioWorkspaceGrid');
    if (splitSlider && grid) {
      let isDragging = false;

      const onStart = (e) => {
        isDragging = true;
        splitSlider.classList.add('dragging');
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
      };

      const onMove = (e) => {
        if (!isDragging) return;
        const rect = grid.getBoundingClientRect();
        const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0].clientX);
        if (clientX === undefined) return;
        const offset = clientX - rect.left;
        let pct = Math.round((offset / rect.width) * 100);
        pct = Math.max(20, Math.min(80, pct));
        state.splitPercent = pct;
        grid.style.gridTemplateColumns = pct + '% 12px calc(' + (100 - pct) + '% - 12px)';
      };

      const onEnd = () => {
        if (isDragging) {
          isDragging = false;
          splitSlider.classList.remove('dragging');
          document.body.style.cursor = '';
          document.body.style.userSelect = '';
        }
      };

      splitSlider.addEventListener('mousedown', onStart);
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onEnd);

      splitSlider.addEventListener('touchstart', onStart, { passive: true });
      window.addEventListener('touchmove', onMove, { passive: true });
      window.addEventListener('touchend', onEnd);

      // Double-click to reset 50/50
      splitSlider.addEventListener('dblclick', () => {
        state.splitPercent = 50;
        grid.style.gridTemplateColumns = '50% 12px calc(50% - 12px)';
      });
    }

    // Editor Action Buttons
    const btnEdRun = document.getElementById('btnEditorRun');
    if (btnEdRun) {
      btnEdRun.addEventListener('click', () => {
        const sqlInput = getStudioSqlInputElement();
        if (sqlInput) runStudioQuery(sqlInput.value);
      });
    }

    const btnEdVerify = document.getElementById('btnEditorVerify');
    if (btnEdVerify) {
      btnEdVerify.addEventListener('click', () => {
        verifyCurrentProblem();
      });
    }

    const btnEdFmt = document.getElementById('btnEditorFormat');
    if (btnEdFmt) {
      btnEdFmt.addEventListener('click', () => {
        formatCurrentSql();
      });
    }

    // Layout Mode Buttons (both header and editor toolbar)
    document.querySelectorAll('.studio-layout-btn, .mode-slider-btn').forEach(b => {
      b.addEventListener('click', () => {
        const lm = b.dataset.layout;
        if (lm) {
          state.layoutMode = lm;
          init();
        }
      });
    });

    // 6-Stage Range Slider & Controls
    const rangeSlider = document.getElementById('stepperRangeSlider');
    if (rangeSlider) {
      rangeSlider.addEventListener('input', (e) => {
        const idx = parseInt(e.target.value, 10);
        goToStep(idx);
      });
    }

    const btnSlPrev = document.getElementById('btnSliderPrev');
    if (btnSlPrev) {
      btnSlPrev.addEventListener('click', () => {
        const cur = (window.EngineState && window.EngineState.currentStepIndex) || 0;
        if (cur > 0) goToStep(cur - 1);
      });
    }

    const btnSlNext = document.getElementById('btnSliderNext');
    if (btnSlNext) {
      btnSlNext.addEventListener('click', () => {
        const cur = (window.EngineState && window.EngineState.currentStepIndex) || 0;
        const max = (window.EngineState && window.EngineState.steps && window.EngineState.steps.length) || 6;
        if (cur < max - 1) goToStep(cur + 1);
      });
    }

    // Track Node Click
    document.querySelectorAll('.track-node').forEach(node => {
      node.addEventListener('click', () => {
        const stepIdx = parseInt(node.dataset.step, 10);
        if (!isNaN(stepIdx)) goToStep(stepIdx);
      });
    });

    // Stepper Controls
    const btnNext = document.getElementById('btnNextStep');
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        const cur = (window.EngineState && window.EngineState.currentStepIndex) || 0;
        const max = (window.EngineState && window.EngineState.steps && window.EngineState.steps.length) || 6;
        if (cur < max - 1) goToStep(cur + 1);
      });
    }
    const btnPrev = document.getElementById('btnPrevStep');
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        const cur = (window.EngineState && window.EngineState.currentStepIndex) || 0;
        if (cur > 0) goToStep(cur - 1);
      });
    }
    const btnResetStep = document.getElementById('btnResetStep');
    if (btnResetStep) {
      btnResetStep.addEventListener('click', () => {
        goToStep(0);
      });
    }
    const btnPlay = document.getElementById('btnPlayPause');
    if (btnPlay) {
      btnPlay.addEventListener('click', () => togglePlayStepper());
    }

    // SQL Textarea Shortcuts
    const sqlInput = getStudioSqlInputElement();
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

  function selectProblem(probId) {
    state.activeProblemId = probId;
    state.testResult = null;
    state.tilesOpen = false;
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

      // If user is on diagram tab, switch to Data Grid tab so they see results, or stay if they want
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

    const sqlInput = getStudioSqlInputElement();
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

    if (tabKey === 'tabDiagram') {
      const box = document.getElementById('editorialDiagramContainer');
      if (box) box.innerHTML = renderEditorialDiagramSvg(getProblemById(state.activeProblemId));
    } else if (tabKey === 'tabDiff') {
      const diffBox = document.getElementById('studioDiffContainer');
      if (diffBox) diffBox.innerHTML = renderDiffContentHtml();
    } else if (tabKey === 'tabExplainer') {
      const expBox = document.getElementById('studioExplainerContainer');
      if (expBox) expBox.innerHTML = renderEngineExplainerHtml(getProblemById(state.activeProblemId));
    }
  }

  function insertColumnName(colName) {
    const sqlInput = getStudioSqlInputElement();
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
    const sqlInput = getStudioSqlInputElement();
    if (!sqlInput || !sqlInput.value) return;
    const val = sqlInput.value.trim();

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
    const sqlInput = getStudioSqlInputElement();
    const gutter = document.getElementById('studioLineNumbers');
    if (!sqlInput || !gutter) return;
    const lines = (sqlInput.value || '').split('\n').length;
    let html = '';
    for (let i = 1; i <= Math.max(lines, 1); i++) {
      html += i + '<br>';
    }
    gutter.innerHTML = html;
  }

  function goToStep(idx) {
    state.currentStepIndex = idx;
    if (typeof window.renderStep === 'function') {
      window.renderStep(idx);
    }
    const sl = document.getElementById('stepperRangeSlider');
    if (sl) sl.value = idx;
    const names = ['01 FROM', '02 WHERE', '03 GROUP BY', '04 HAVING', '05 SELECT', '06 LIMIT'];
    const lbl = document.getElementById('stepperSliderVal');
    if (lbl) lbl.textContent = names[idx] || ('STEP ' + (idx + 1));

    // Update active track node in studio
    const nodes = document.querySelectorAll('.track-node');
    nodes.forEach((el, i) => {
      el.classList.remove('active', 'completed');
      if (i === idx) el.classList.add('active');
      else if (i < idx) el.classList.add('completed');
    });

    // Render pipelineStepResultsGrid
    const step = (window.EngineState && window.EngineState.steps && window.EngineState.steps[idx]);
    if (step) {
      renderPipelineGrid(step);
    }
  }

  function renderPipelineGrid(step) {
    const grid = document.getElementById('pipelineStepResultsGrid');
    if (!grid) return;
    const rows = step.rows || [];
    const cols = step.columns || (rows[0] ? Object.keys(rows[0]) : []);

    if (!rows.length) {
      grid.innerHTML = '<div style="padding:16px; font-size:11px; color:var(--text-muted); font-family:var(--font-mono, monospace);">0 rows at this execution stage.</div>';
      return;
    }

    let h = '<div style="font-size:10.5px; font-weight:700; color:var(--text-secondary); margin-bottom:6px;">Stage Tuples Buffer (' + rows.length + ' rows):</div>';
    h += '<table class="studio-diff-table" style="font-size:10.5px;"><thead><tr>';
    cols.forEach(c => { h += '<th>' + c + '</th>'; });
    if (step.isWhereEvaluation) h += '<th>Filter Verdict</th>';
    h += '</tr></thead><tbody>';

    rows.slice(0, 10).forEach(r => {
      let trStyle = '';
      if (step.isWhereEvaluation) {
        trStyle = r._passed ? 'background:rgba(22,163,74,0.06);' : 'background:rgba(220,38,38,0.06); color:#71717a;';
      }
      h += '<tr style="' + trStyle + '">';
      cols.forEach(c => {
        const val = r[c] !== undefined ? String(r[c]) : '<em style="color:#a1a1aa">NULL</em>';
        h += '<td>' + val + '</td>';
      });
      if (step.isWhereEvaluation) {
        h += '<td>' + (r._passed ? '<span class="status-pill status-pill-accent" style="font-size:9.5px; background:rgba(22,163,74,0.15); color:#16a34a;">PASS</span>' : '<span class="status-pill" style="font-size:9.5px; background:rgba(220,38,38,0.15); color:#dc2626;">FILTERED</span>') + '</td>';
      }
      h += '</tr>';
    });
    h += '</tbody></table>';
    grid.innerHTML = h;
  }

  // Globally wire step helpers
  window.goToStep = goToStep;
  window.setStep = goToStep;
  window.nextStep = () => {
    const cur = (window.EngineState && window.EngineState.currentStepIndex) || 0;
    const max = (window.EngineState && window.EngineState.steps && window.EngineState.steps.length) || 6;
    if (cur < max - 1) goToStep(cur + 1);
  };
  window.prevStep = () => {
    const cur = (window.EngineState && window.EngineState.currentStepIndex) || 0;
    if (cur > 0) goToStep(cur - 1);
  };

  function togglePlayStepper() {
    state.isPlaying = !state.isPlaying;
    const playBtn = document.getElementById('btnPlayPause');
    const playText = document.getElementById('playBtnText');

    if (state.isPlaying) {
      if (playBtn) playBtn.classList.add('playing');
      if (playText) playText.textContent = 'Pause';

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
