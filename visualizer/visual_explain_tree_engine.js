/**
 * SQL MASTERY VISUALIZER - VISUAL EXPLAIN ANALYZE EXECUTION PLAN TREE
 * ---------------------------------------------------------------------
 * High-fidelity, interactive query execution plan visualizer for Query Studio.
 * Models physical storage engine behaviors across PostgreSQL 16, MySQL 8.0,
 * and DuckDB-WASM with interactive tree flows, "What-If" B+Tree index simulation,
 * cardinality estimation error analysis, and SARGability diagnostics.
 */

(function(window) {
  'use strict';

  // Internal Engine State
  const State = {
    currentSql: '',
    currentSteps: null,
    dialect: 'postgres', // 'postgres' | 'mysql' | 'duckdb'
    viewMode: 'tree',     // 'tree' | 'matrix' | 'raw'
    simulatedIndexActive: false,
    selectedNodeId: null
  };

  /**
   * Deep query parser for execution planning
   */
  function analyzeSql(rawSql) {
    const q = (rawSql || '').trim();
    if (!q) {
      return {
        mainTable: 'TRIANGLES',
        joinedTables: [],
        filterCols: [],
        orderCols: [],
        groupCols: [],
        hasAgg: false,
        hasWindow: false,
        hasLimit: false,
        limitVal: null,
        isSargable: true,
        nonSargableReason: '',
        rawSql: q
      };
    }

    // Main Table
    const fromMatch = q.match(/\bFROM\s+([a-zA-Z0-9_]+)/i);
    const mainTable = fromMatch ? fromMatch[1] : 'records';

    // Joins
    const joinMatches = [...q.matchAll(/\b(?:INNER\s+|LEFT\s+|RIGHT\s+|FULL\s+|CROSS\s+)?JOIN\s+([a-zA-Z0-9_]+)(?:\s+(?:AS\s+)?([a-zA-Z0-9_]+))?(?:\s+ON\s+([\s\S]+?)(?=\bJOIN\b|\bWHERE\b|\bGROUP\b|\bORDER\b|\bLIMIT\b|$))?/gi)];
    const joinedTables = joinMatches.map(m => ({
      table: m[1],
      alias: m[2] || m[1],
      condition: m[3] ? m[3].trim() : ''
    }));

    // WHERE clause
    const whereMatch = q.match(/\bWHERE\s+([\s\S]+?)(?=\bGROUP\b|\bHAVING\b|\bWINDOW\b|\bORDER\b|\bLIMIT\b|$)/i);
    const whereClause = whereMatch ? whereMatch[1].trim() : '';

    // SARGability check
    let isSargable = true;
    let nonSargableReason = '';
    if (whereClause) {
      if (/\b(LIKE\s*['"]%)/i.test(whereClause)) {
        isSargable = false;
        nonSargableReason = 'Leading wildcard (%prefix) prevents B+Tree index range scan; forces full sequential table scan.';
      } else if (/\b(LOWER|UPPER|YEAR|MONTH|DAY|DATE|SUBSTRING|TRIM|ROUND|ABS)\s*\([a-zA-Z0-9_.]+\)/i.test(whereClause)) {
        isSargable = false;
        nonSargableReason = 'Function wrapped around indexed column prevents direct index seek without a Functional Index.';
      } else if (/[a-zA-Z0-9_.]+\s*[\+\-\*\/]\s*\d+\s*[=><]/i.test(whereClause)) {
        isSargable = false;
        nonSargableReason = 'Arithmetic operation on column forces runtime per-row CPU computation; rewrite as column = constant - offset.';
      }
    }

    // Filter columns
    const filterCols = [];
    if (whereClause) {
      const colMatches = whereClause.match(/\b([a-zA-Z0-9_]+)\s*(=|!=|<>|>|<|>=|<=|\bLIKE\b|\bIN\b|\bBETWEEN\b|\bIS\b)/gi);
      if (colMatches) {
        colMatches.forEach(m => {
          const col = m.split(/\s*(=|!=|<>|>|<|>=|<=|\bLIKE\b|\bIN\b|\bBETWEEN\b|\bIS\b)/i)[0].trim();
          if (col && !['AND', 'OR', 'NOT', 'NULL', 'TRUE', 'FALSE'].includes(col.toUpperCase())) {
            if (!filterCols.includes(col)) filterCols.push(col);
          }
        });
      }
    }

    // GROUP BY
    const groupMatch = q.match(/\bGROUP\s+BY\s+([\s\S]+?)(?=\bHAVING\b|\bWINDOW\b|\bORDER\b|\bLIMIT\b|$)/i);
    const groupCols = [];
    if (groupMatch) {
      groupMatch[1].split(',').forEach(p => {
        const c = p.trim().split(/\s+/)[0];
        if (c && !groupCols.includes(c)) groupCols.push(c);
      });
    }

    // ORDER BY
    const orderMatch = q.match(/\bORDER\s+BY\s+([\s\S]+?)(?=\bLIMIT\b|$)/i);
    const orderCols = [];
    if (orderMatch) {
      orderMatch[1].split(',').forEach(p => {
        const parts = p.trim().split(/\s+/);
        if (parts[0]) orderCols.push({ col: parts[0], dir: (parts[1] || 'ASC').toUpperCase() });
      });
    }

    // LIMIT
    const limitMatch = q.match(/\bLIMIT\s+(\d+)/i);
    const hasLimit = !!limitMatch;
    const limitVal = limitMatch ? parseInt(limitMatch[1], 10) : null;

    // Checks
    const hasAgg = /\b(COUNT|SUM|AVG|MIN|MAX)\s*\(/i.test(q);
    const hasWindow = /\bOVER\s*\(/i.test(q);

    return {
      mainTable,
      joinedTables,
      whereClause,
      filterCols,
      orderCols,
      groupCols,
      hasAgg,
      hasWindow,
      hasLimit,
      limitVal,
      isSargable,
      nonSargableReason,
      rawSql: q
    };
  }

  /**
   * Build the hierarchical execution plan tree
   */
  function buildExecutionPlan(analysis, isSimulated, dialect) {
    const table = analysis.mainTable;
    const hasWhere = analysis.filterCols.length > 0;
    const hasOrder = analysis.orderCols.length > 0;
    const hasGroup = analysis.groupCols.length > 0 || analysis.hasAgg;
    const hasJoins = analysis.joinedTables.length > 0;
    const hasWindow = analysis.hasWindow;
    const hasLimit = analysis.hasLimit;

    // Suggested index name & DDL
    const candidateCols = [...analysis.filterCols];
    analysis.groupCols.forEach(c => { if (!candidateCols.includes(c)) candidateCols.push(c); });
    analysis.orderCols.forEach(o => { if (!candidateCols.includes(o.col)) candidateCols.push(o.col); });
    if (candidateCols.length === 0) candidateCols.push('id');
    const indexCols = candidateCols.slice(0, 3);
    const indexName = `idx_${table.toLowerCase()}_${indexCols.join('_')}`;
    const recommendedDdl = `CREATE INDEX ${indexName} ON ${table} (${indexCols.join(', ')});`;

    // Baseline unindexed numbers
    const baselineRawRows = 250000;
    let totalStartupCost = 0.00;
    let totalRunCost = 0.00;
    let totalExecutionTimeMs = 0.00;

    // Helper to generate node IDs
    let nodeSeq = 1;
    const genId = () => `plan_node_${nodeSeq++}`;

    // 1. Leaf Scan Node(s)
    let scanNode;
    if (isSimulated) {
      // Index Scan / Index Only Scan
      const isIndexOnly = !analysis.rawSql.includes('*') && indexCols.length >= 2;
      const opName = isIndexOnly ? 'Index Only Scan' : 'Index Scan';
      const rowsExamined = Math.max(5, Math.floor(baselineRawRows * 0.0003));
      const scanCost = (rowsExamined * 0.28 + 3.5).toFixed(2);
      const scanTime = (Math.random() * 0.15 + 0.08).toFixed(3);

      scanNode = {
        id: genId(),
        operator: opName,
        target: `using ${indexName} on ${table}`,
        typeCategory: 'scan',
        icon: isIndexOnly ? '⚡' : '🔍',
        badgeColor: '#10b981',
        cost: { startup: 0.08, total: parseFloat(scanCost) },
        rows: { estimated: rowsExamined, actual: rowsExamined, errorFactor: 1.0 },
        timing: { timeMs: parseFloat(scanTime), loops: 1 },
        buffers: { sharedHit: 4, sharedRead: 0, dirtied: 0 },
        details: isIndexOnly
          ? `Covering B+Tree Index Scan. All queried columns satisfied directly from index leaf pages without secondary Heap Table dereferencing.`
          : `Index Range Scan along B+Tree leaves. Direct equality/range seek locates matching row pointers with O(log N) depth.`,
        optimizationTip: `Optimal access path achieved via index ${indexName}. Zero sequential disk reads.`,
        isBottleneck: false,
        children: []
      };
    } else {
      // Sequential Table Scan (Unindexed)
      const scanCost = (baselineRawRows * 0.2 + 1250).toFixed(2);
      const scanTime = (Math.random() * 45 + 180).toFixed(2);
      const isBottleneck = true;

      scanNode = {
        id: genId(),
        operator: 'Seq Scan',
        target: `on ${table} (Full Table Scan)`,
        typeCategory: 'scan',
        icon: '⚠️',
        badgeColor: '#ef4444',
        cost: { startup: 0.00, total: parseFloat(scanCost) },
        rows: { estimated: baselineRawRows, actual: baselineRawRows, errorFactor: 1.0 },
        timing: { timeMs: parseFloat(scanTime), loops: 1 },
        buffers: { sharedHit: 1420, sharedRead: 3840, dirtied: 0 },
        details: analysis.isSargable
          ? `Engine forced to perform a Full Table Scan because no covering index exists for filter [${analysis.filterCols.join(', ') || 'ALL'}]. Reads every disk page into buffer pool.`
          : `NON-SARGABLE PREDICATE DETECTED: ${analysis.nonSargableReason}`,
        optimizationTip: `Add index on (${indexCols.join(', ')}) to replace this $O(N)$ table scan with an $O(\\log N)$ B+Tree index seek.`,
        isBottleneck: true,
        children: []
      };
    }

    // 2. WHERE Filter Node (if applicable and not integrated)
    let currentTop = scanNode;
    if (hasWhere && !isSimulated) {
      const filterPassedRows = Math.floor(baselineRawRows * 0.08);
      const filterCost = (parseFloat(currentTop.cost.total) + 120).toFixed(2);
      const filterTime = (parseFloat(currentTop.timing.timeMs) + 12.5).toFixed(2);

      const filterNode = {
        id: genId(),
        operator: 'Filter Predicate',
        target: analysis.whereClause ? `Filter: (${analysis.whereClause.length > 45 ? analysis.whereClause.slice(0, 42) + '...' : analysis.whereClause})` : 'Filter: Column Conditions',
        typeCategory: 'filter',
        icon: '✂️',
        badgeColor: '#f59e0b',
        cost: { startup: currentTop.cost.startup, total: parseFloat(filterCost) },
        rows: { estimated: filterPassedRows, actual: filterPassedRows, errorFactor: 1.05 },
        timing: { timeMs: parseFloat(filterTime), loops: 1 },
        buffers: { sharedHit: 0, sharedRead: 0, dirtied: 0 },
        details: `CPU-bound tuple filter. Evaluated ${baselineRawRows.toLocaleString()} candidate rows; rejected ${(baselineRawRows - filterPassedRows).toLocaleString()} rows.`,
        optimizationTip: analysis.isSargable ? `Create index on filter keys to push filter down into B+Tree scan.` : analysis.nonSargableReason,
        isBottleneck: false,
        children: [currentTop]
      };
      currentTop = filterNode;
    }

    // 3. JOIN Node (if joined tables present)
    if (hasJoins) {
      analysis.joinedTables.forEach(jt => {
        const joinType = jt.condition ? 'Hash Join' : 'Nested Loop';
        const innerScan = {
          id: genId(),
          operator: isSimulated ? 'Index Scan' : 'Seq Scan',
          target: `${isSimulated ? `using idx_${jt.table.toLowerCase()}_id` : 'Seq Scan'} on ${jt.table} ${jt.alias}`,
          typeCategory: 'scan',
          icon: isSimulated ? '⚡' : '🔍',
          badgeColor: isSimulated ? '#10b981' : '#f97316',
          cost: { startup: 0.00, total: isSimulated ? 14.5 : 850.0 },
          rows: { estimated: isSimulated ? 45 : 12500, actual: isSimulated ? 45 : 12500, errorFactor: 1.0 },
          timing: { timeMs: isSimulated ? 0.09 : 18.4, loops: 1 },
          buffers: { sharedHit: 120, sharedRead: 0, dirtied: 0 },
          details: `Inner relation scan for join key matching on ${jt.condition || 'foreign key'}.`,
          optimizationTip: `Ensure foreign key column in ${jt.table} has a supporting index.`,
          isBottleneck: !isSimulated,
          children: []
        };

        const joinCost = (parseFloat(currentTop.cost.total) + innerScan.cost.total + (isSimulated ? 15 : 240)).toFixed(2);
        const joinTime = (parseFloat(currentTop.timing.timeMs) + innerScan.timing.timeMs + (isSimulated ? 0.12 : 25.0)).toFixed(2);

        const joinNode = {
          id: genId(),
          operator: joinType,
          target: jt.condition ? `Hash Cond: (${jt.condition})` : `Cartesian Nested Loop on ${jt.table}`,
          typeCategory: 'join',
          icon: '🔀',
          badgeColor: '#0284c7',
          cost: { startup: isSimulated ? 1.5 : 140.0, total: parseFloat(joinCost) },
          rows: { estimated: 3500, actual: 3480, errorFactor: 1.01 },
          timing: { timeMs: parseFloat(joinTime), loops: 1 },
          buffers: { sharedHit: 520, sharedRead: 0, dirtied: 0 },
          details: `${joinType} operator. Builds in-memory hash table of the inner table and probes using outer stream join keys.`,
          optimizationTip: isSimulated ? `Hash table fits entirely in work_mem (no temp file disk spill).` : `Ensure work_mem is large enough to prevent 2-pass batch hash spilling to disk.`,
          isBottleneck: false,
          children: [currentTop, innerScan]
        };
        currentTop = joinNode;
      });
    }

    // 4. GROUP BY / Aggregation Node
    if (hasGroup) {
      const aggCost = (parseFloat(currentTop.cost.total) + (isSimulated ? 8 : 185)).toFixed(2);
      const aggTime = (parseFloat(currentTop.timing.timeMs) + (isSimulated ? 0.08 : 14.5)).toFixed(2);
      const groupKeyDesc = analysis.groupCols.length > 0 ? `Group Key: (${analysis.groupCols.join(', ')})` : 'Scalar Aggregation';

      const aggNode = {
        id: genId(),
        operator: 'HashAggregate',
        target: groupKeyDesc,
        typeCategory: 'aggregate',
        icon: '📊',
        badgeColor: '#eab308',
        cost: { startup: parseFloat(currentTop.cost.total), total: parseFloat(aggCost) },
        rows: { estimated: 120, actual: 118, errorFactor: 1.02 },
        timing: { timeMs: parseFloat(aggTime), loops: 1 },
        buffers: { sharedHit: 45, sharedRead: 0, dirtied: 0 },
        details: `Aggregates input stream rows into memory buckets by hash key. Computes COUNT, SUM, AVG accumulators in a single pass.`,
        optimizationTip: isSimulated ? `Pre-sorted index allows StreamAggregate, avoiding hash table overhead.` : `If group cardinality is high, increase work_mem to prevent disk spill.`,
        isBottleneck: false,
        children: [currentTop]
      };
      currentTop = aggNode;
    }

    // 5. WINDOW Aggregation Node
    if (hasWindow) {
      const winCost = (parseFloat(currentTop.cost.total) + 95).toFixed(2);
      const winTime = (parseFloat(currentTop.timing.timeMs) + 6.2).toFixed(2);

      const winNode = {
        id: genId(),
        operator: 'WindowAgg',
        target: 'OVER (PARTITION BY / ORDER BY)',
        typeCategory: 'window',
        icon: '🪟',
        badgeColor: '#a855f7',
        cost: { startup: parseFloat(currentTop.cost.total), total: parseFloat(winCost) },
        rows: { estimated: currentTop.rows.actual, actual: currentTop.rows.actual, errorFactor: 1.0 },
        timing: { timeMs: parseFloat(winTime), loops: 1 },
        buffers: { sharedHit: 10, sharedRead: 0, dirtied: 0 },
        details: `Window function calculation engine. Buffers partition frames in memory to calculate rankings (ROW_NUMBER, DENSE_RANK) or moving aggregates.`,
        optimizationTip: `Composite index on (partition_col, order_col) eliminates the mandatory intermediate sort pass.`,
        isBottleneck: false,
        children: [currentTop]
      };
      currentTop = winNode;
    }

    // 6. ORDER BY / Sort Node
    if (hasOrder) {
      if (isSimulated) {
        // Sort is ELIMINATED because B+Tree is already ordered!
        // We add an explanatory tag to currentTop
        currentTop.details += ` [B+Tree Sort Elimination: Pre-ordered index scan on (${indexCols.join(', ')}) eliminated the in-memory filesort pass completely!]`;
      } else {
        const sortCost = (parseFloat(currentTop.cost.total) + 310).toFixed(2);
        const sortTime = (parseFloat(currentTop.timing.timeMs) + 22.0).toFixed(2);
        const sortKeyStr = analysis.orderCols.map(o => `${o.col} ${o.dir}`).join(', ');

        const sortNode = {
          id: genId(),
          operator: hasLimit ? 'Top-N Heapsort' : 'Sort (quicksort in-memory)',
          target: `Sort Key: ${sortKeyStr}`,
          typeCategory: 'sort',
          icon: '↕️',
          badgeColor: '#ec4899',
          cost: { startup: parseFloat(currentTop.cost.total), total: parseFloat(sortCost) },
          rows: { estimated: currentTop.rows.actual, actual: currentTop.rows.actual, errorFactor: 1.0 },
          timing: { timeMs: parseFloat(sortTime), loops: 1 },
          buffers: { sharedHit: 0, sharedRead: 0, dirtied: 0 },
          details: `Sort operation. Allocates sort buffer in memory. If input volume exceeds work_mem (Postgres) or sort_buffer_size (MySQL), spills to disk temp files (filesort).`,
          optimizationTip: `Applying ESR rule: Adding (${analysis.orderCols.map(o => o.col).join(', ')}) to the index allows pre-sorted index order and eliminates this sort node completely!`,
          isBottleneck: !hasLimit,
          children: [currentTop]
        };
        currentTop = sortNode;
      }
    }

    // 7. LIMIT Node
    if (hasLimit) {
      const limitVal = analysis.limitVal || 10;
      const limitCost = (parseFloat(currentTop.cost.total) * Math.min(1.0, limitVal / Math.max(1, currentTop.rows.actual))).toFixed(2);
      const limitTime = (parseFloat(currentTop.timing.timeMs) * (isSimulated ? 0.3 : 0.95)).toFixed(2);

      const limitNode = {
        id: genId(),
        operator: 'Limit',
        target: `Limit: ${limitVal} Rows`,
        typeCategory: 'limit',
        icon: '🛑',
        badgeColor: '#64748b',
        cost: { startup: currentTop.cost.startup, total: parseFloat(limitCost) },
        rows: { estimated: limitVal, actual: limitVal, errorFactor: 1.0 },
        timing: { timeMs: parseFloat(limitTime), loops: 1 },
        buffers: { sharedHit: 0, sharedRead: 0, dirtied: 0 },
        details: `Short-circuits execution and stops reading child rows once ${limitVal} tuples have been produced.`,
        optimizationTip: isSimulated ? `Combined with index scan, allows early-exit without reading subsequent pages.` : `Without an index, must still scan and sort all prior rows before picking top ${limitVal}.`,
        isBottleneck: false,
        children: [currentTop]
      };
      currentTop = limitNode;
    }

    // Calculate total summary metrics
    totalStartupCost = currentTop.cost.startup;
    totalRunCost = currentTop.cost.total;
    totalExecutionTimeMs = currentTop.timing.timeMs;

    // Flatten all nodes to calculate relative cost % and find peak bottleneck
    const allNodes = [];
    function walk(node) {
      allNodes.push(node);
      if (node.children) node.children.forEach(walk);
    }
    walk(currentTop);

    allNodes.forEach(node => {
      node.costPercent = Math.max(1, Math.round((node.cost.total / Math.max(1, totalRunCost)) * 100));
    });

    // Find highest bottleneck
    const bottleneckNode = allNodes.reduce((max, node) => node.cost.total > max.cost.total ? node : max, allNodes[0]);

    return {
      rootNode: currentTop,
      allNodes,
      bottleneckNode,
      recommendedDdl,
      indexName,
      indexCols,
      isSimulated,
      dialect,
      summary: {
        totalCost: totalRunCost,
        executionTimeMs: totalExecutionTimeMs,
        planningTimeMs: (Math.random() * 0.15 + 0.12).toFixed(2),
        bufferCacheHit: isSimulated ? '100% (Shared RAM Buffers)' : '84% (Disk Reads Required)',
        costReduction: isSimulated ? 93.4 : 0.0
      }
    };
  }

  /**
   * Main Render Controller
   */
  function renderTreeForQuery(sql, steps) {
    State.currentSql = sql || State.currentSql;
    State.currentSteps = steps || State.currentSteps;

    const container = document.getElementById('explainPlanTreeContainer');
    if (!container) return;

    const analysis = analyzeSql(State.currentSql);
    const plan = buildExecutionPlan(analysis, State.simulatedIndexActive, State.dialect);

    let html = `
      <div class="visual-explain-wrapper">
        <!-- Top Controls & Telemetry Dashboard -->
        <div class="explain-top-bar">
          <div class="explain-brand-group">
            <span class="explain-live-dot"></span>
            <div class="explain-main-title">
              <strong>EXPLAIN ANALYZE • Production Execution Plan Tree</strong>
              <span class="explain-version-badge">${getDialectLabel(State.dialect)}</span>
            </div>
          </div>

          <!-- Dialect & View Mode Switchers -->
          <div class="explain-action-controls">
            <div class="explain-pill-group" title="Select Database Planner Engine Dialect">
              <button class="exp-pill-btn ${State.dialect === 'postgres' ? 'active' : ''}" onclick="window.VISUAL_EXPLAIN_TREE_ENGINE.switchDialect('postgres')">🐘 PostgreSQL</button>
              <button class="exp-pill-btn ${State.dialect === 'mysql' ? 'active' : ''}" onclick="window.VISUAL_EXPLAIN_TREE_ENGINE.switchDialect('mysql')">🐬 MySQL 8.0</button>
              <button class="exp-pill-btn ${State.dialect === 'duckdb' ? 'active' : ''}" onclick="window.VISUAL_EXPLAIN_TREE_ENGINE.switchDialect('duckdb')">🦆 DuckDB</button>
            </div>

            <div class="explain-pill-group" title="Select Visualization Mode">
              <button class="exp-pill-btn ${State.viewMode === 'tree' ? 'active' : ''}" onclick="window.VISUAL_EXPLAIN_TREE_ENGINE.switchViewMode('tree')">🌳 Flow Tree</button>
              <button class="exp-pill-btn ${State.viewMode === 'matrix' ? 'active' : ''}" onclick="window.VISUAL_EXPLAIN_TREE_ENGINE.switchViewMode('matrix')">📊 Cost Matrix</button>
              <button class="exp-pill-btn ${State.viewMode === 'raw' ? 'active' : ''}" onclick="window.VISUAL_EXPLAIN_TREE_ENGINE.switchViewMode('raw')">📜 Raw Plan</button>
            </div>
          </div>
        </div>

        <!-- KPI Metrics Banner -->
        <div class="explain-kpi-grid">
          <div class="kpi-card ${State.simulatedIndexActive ? 'kpi-optimized' : ''}">
            <div class="kpi-label">TOTAL PLANNER COST</div>
            <div class="kpi-value font-mono">${plan.summary.totalCost.toLocaleString()}</div>
            <div class="kpi-subtext">${State.simulatedIndexActive ? '🟢 93.4% Cost Reduction' : '🔴 Unindexed Access Path'}</div>
          </div>

          <div class="kpi-card ${State.simulatedIndexActive ? 'kpi-optimized' : ''}">
            <div class="kpi-label">EXECUTION TIME (WALL CLOCK)</div>
            <div class="kpi-value font-mono">${plan.summary.executionTimeMs} ms</div>
            <div class="kpi-subtext">Planning: ${plan.summary.planningTimeMs} ms</div>
          </div>

          <div class="kpi-card">
            <div class="kpi-label">BUFFER POOL HIT RATIO</div>
            <div class="kpi-value font-mono">${State.simulatedIndexActive ? '100%' : '84%'}</div>
            <div class="kpi-subtext">${plan.summary.bufferCacheHit}</div>
          </div>

          <div class="kpi-card ${plan.bottleneckNode.isBottleneck ? 'kpi-alert' : ''}">
            <div class="kpi-label">CRITICAL BOTTLENECK</div>
            <div class="kpi-value font-mono text-truncate">${escapeHtml(plan.bottleneckNode.operator)}</div>
            <div class="kpi-subtext">${plan.bottleneckNode.costPercent}% of total query cost</div>
          </div>
        </div>

        <!-- What-If B+Tree Index Simulator -->
        <div class="explain-whatif-card">
          <div class="whatif-header">
            <div class="whatif-left">
              <span class="whatif-sparkle">⚡</span>
              <div>
                <strong style="font-size: 13px; color: var(--text-primary);">What-If Optimizer: B+Tree Index Simulation</strong>
                <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 2px;">
                  Simulate the physical impact of adding a production composite index following the <strong>ESR (Equality, Sort, Range)</strong> rule.
                </div>
              </div>
            </div>
            <div class="whatif-toggle-wrap">
              <label class="whatif-switch">
                <input type="checkbox" id="chkSimulateIndex" ${State.simulatedIndexActive ? 'checked' : ''} onchange="window.VISUAL_EXPLAIN_TREE_ENGINE.toggleSimulatedIndex()">
                <span class="whatif-slider"></span>
              </label>
              <span class="whatif-toggle-label">${State.simulatedIndexActive ? 'Index Active (Optimized)' : 'Simulate Index'}</span>
            </div>
          </div>

          <div class="whatif-ddl-row">
            <code class="whatif-code">${escapeHtml(plan.recommendedDdl)}</code>
            <button class="btn-copy-ddl" onclick="window.VISUAL_EXPLAIN_TREE_ENGINE.copyDdl('${encodeURIComponent(plan.recommendedDdl)}', this)">
              📋 Copy DDL
            </button>
          </div>
        </div>
    `;

    // View Mode Rendering
    if (State.viewMode === 'tree') {
      html += `
        <div class="explain-tree-viewport">
          <div class="tree-flow-instructions">
            <span>Flow direction: <strong>Base Tables (Bottom)</strong> ➔ <strong>Pipeline Processing (Middle)</strong> ➔ <strong>Final Result Stream (Top)</strong></span>
            <span style="color: var(--text-muted);">Click any node to inspect physical storage engine physics</span>
          </div>

          <div class="tree-flow-container">
            ${renderTreeNodeHtml(plan.rootNode, plan.bottleneckNode.id, 0)}
          </div>
        </div>
      `;
    } else if (State.viewMode === 'matrix') {
      html += renderMatrixHtml(plan.allNodes, plan.summary.totalCost);
    } else if (State.viewMode === 'raw') {
      html += renderRawPlanHtml(plan, analysis);
    }

    // Node Details Drawer (if selected)
    if (State.selectedNodeId) {
      const selected = plan.allNodes.find(n => n.id === State.selectedNodeId);
      if (selected) {
        html += renderNodeDetailModalHtml(selected);
      }
    }

    html += `</div>`;
    container.innerHTML = html;
  }

  /**
   * Render single tree node recursively
   */
  function renderTreeNodeHtml(node, bottleneckId, depth) {
    const isBottleneck = node.id === bottleneckId && node.costPercent > 35;
    const isSelected = node.id === State.selectedNodeId;

    let childrenHtml = '';
    if (node.children && node.children.length > 0) {
      childrenHtml = `
        <div class="tree-children-row">
          ${node.children.map(child => renderTreeNodeHtml(child, bottleneckId, depth + 1)).join('')}
        </div>
      `;
    }

    // Cost progress bar color
    let barColor = '#10b981';
    if (node.costPercent > 50) barColor = '#ef4444';
    else if (node.costPercent > 25) barColor = '#f59e0b';

    return `
      <div class="tree-branch-wrapper">
        <div class="tree-node-card ${isBottleneck ? 'node-bottleneck' : ''} ${isSelected ? 'node-selected' : ''}" 
             onclick="window.VISUAL_EXPLAIN_TREE_ENGINE.selectNode('${node.id}')"
             id="${node.id}">
          
          <div class="node-card-top">
            <div class="node-operator-badge" style="border-left: 3px solid ${node.badgeColor};">
              <span class="node-icon">${node.icon}</span>
              <span class="node-op-name">${escapeHtml(node.operator)}</span>
            </div>
            <div class="node-cost-pct" style="color: ${barColor};">
              ${node.costPercent}% Cost
            </div>
          </div>

          <div class="node-target-code font-mono">
            ${escapeHtml(node.target)}
          </div>

          <!-- Cost Bar -->
          <div class="node-cost-bar-track">
            <div class="node-cost-bar-fill" style="width: ${Math.min(100, node.costPercent)}%; background: ${barColor};"></div>
          </div>

          <!-- Cardinality & Cost Metrics -->
          <div class="node-metrics-grid font-mono">
            <div class="node-metric-cell">
              <span class="m-lbl">Cost:</span>
              <span class="m-val">${node.cost.startup} .. ${node.cost.total}</span>
            </div>
            <div class="node-metric-cell">
              <span class="m-lbl">Rows:</span>
              <span class="m-val">${node.rows.actual.toLocaleString()}</span>
            </div>
            <div class="node-metric-cell">
              <span class="m-lbl">Time:</span>
              <span class="m-val">${node.timing.timeMs} ms</span>
            </div>
          </div>

          ${isBottleneck ? `
            <div class="bottleneck-pill">
              🔥 Critical Cost Bottleneck
            </div>
          ` : ''}
        </div>

        ${childrenHtml ? `
          <div class="tree-connector-line">
            <svg class="tree-connector-arrow" width="16" height="24" viewBox="0 0 16 24">
              <line x1="8" y1="0" x2="8" y2="20" stroke="var(--border-default)" stroke-width="2" />
              <polyline points="4,16 8,22 12,16" fill="none" stroke="var(--border-default)" stroke-width="2" />
            </svg>
          </div>
          ${childrenHtml}
        ` : ''}
      </div>
    `;
  }

  /**
   * Render Tabular Cost Matrix View
   */
  function renderMatrixHtml(nodes, totalCost) {
    const sorted = [...nodes].sort((a, b) => b.cost.total - a.cost.total);

    return `
      <div class="explain-matrix-wrapper">
        <div class="matrix-heading">
          <strong>Physical Operator Cost Matrix</strong>
          <span style="font-size: 11px; color: var(--text-muted);">Operators ranked by descending total cost consumption</span>
        </div>
        <table class="clean-table matrix-table">
          <thead>
            <tr>
              <th>Operator</th>
              <th>Target Object / Predicate</th>
              <th>Cost Share</th>
              <th>Startup .. Total Cost</th>
              <th>Actual Rows</th>
              <th>Wall Time</th>
              <th>Buffer Reads</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${sorted.map(n => `
              <tr class="${n.costPercent > 40 ? 'row-bottleneck' : ''}">
                <td>
                  <span class="matrix-op-cell">
                    <span>${n.icon}</span>
                    <strong>${escapeHtml(n.operator)}</strong>
                  </span>
                </td>
                <td class="font-mono text-truncate" style="max-width: 240px;" title="${escapeHtml(n.target)}">
                  ${escapeHtml(n.target)}
                </td>
                <td>
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <span class="font-mono" style="font-weight: 600;">${n.costPercent}%</span>
                    <div style="width: 48px; height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden;">
                      <div style="width: ${n.costPercent}%; height: 100%; background: ${n.costPercent > 40 ? '#ef4444' : n.costPercent > 20 ? '#f59e0b' : '#10b981'};"></div>
                    </div>
                  </div>
                </td>
                <td class="font-mono">${n.cost.startup} .. ${n.cost.total}</td>
                <td class="font-mono">${n.rows.actual.toLocaleString()}</td>
                <td class="font-mono">${n.timing.timeMs} ms</td>
                <td class="font-mono">${n.buffers.sharedHit + n.buffers.sharedRead} blks</td>
                <td>
                  <button class="micro-text-btn" onclick="window.VISUAL_EXPLAIN_TREE_ENGINE.selectNode('${n.id}')">Inspect</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  /**
   * Render Raw Plan Text View
   */
  function renderRawPlanHtml(plan, analysis) {
    let rawText = '';

    if (State.dialect === 'postgres') {
      rawText = `
QUERY PLAN: PostgreSQL 16.2 EXPLAIN (ANALYZE, BUFFERS, VERBOSE, TIMING, COSTS)
-------------------------------------------------------------------------------------------------------------------------
${renderPgRaw(plan.rootNode, 0)}
Planning Time: ${plan.summary.planningTimeMs} ms
Execution Time: ${plan.summary.executionTimeMs} ms
Buffers: shared hit=${plan.isSimulated ? 14 : 1420} read=${plan.isSimulated ? 0 : 3840}
Storage Access Method: ${plan.isSimulated ? 'B+Tree Index Range Scan' : 'Sequential Heap Scan'}
Optimization Index Candidate: ${plan.recommendedDdl}
      `.trim();
    } else if (State.dialect === 'mysql') {
      rawText = `
EXPLAIN ANALYZE (MySQL 8.0.36 InnoDB Storage Engine)
-------------------------------------------------------------------------------------------------------------------------
${renderMysqlRaw(plan.rootNode, 0)}
Planning time: ${plan.summary.planningTimeMs} ms
Actual execution time: ${plan.summary.executionTimeMs} ms
Handler reads: ${plan.isSimulated ? 'Key read: 12, Read next: 12' : 'Read rnd_next: 250000'}
Using filesort: ${plan.isSimulated ? 'NO (Pre-ordered index scan)' : 'YES (Sort buffer overflow)'}
      `.trim();
    } else {
      rawText = `
DuckDB Vectorized Execution Plan (Columnar Chunk Pipeline)
-------------------------------------------------------------------------------------------------------------------------
┌───────────────────────────┐
│       ${plan.rootNode.operator.padEnd(19)} │  Cost: ${plan.rootNode.cost.total}
└─────────────┬─────────────┘
              │ (${plan.rootNode.rows.actual} tuples / 2048-vector chunk)
┌─────────────┴─────────────┐
│  ${(plan.bottleneckNode.operator + ' (' + plan.bottleneckNode.target.split(' ')[0] + ')').padEnd(25)} │  Time: ${plan.bottleneckNode.timing.timeMs} ms
└───────────────────────────┘
Filter Pushdown: ${analysis.isSargable ? 'ACTIVE (Pushed into Parquet/Memory scan)' : 'DISABLED (Non-SARGable)'}
Projection Pushdown: ACTIVE (${analysis.filterCols.length + 2} of 18 columns read)
      `.trim();
    }

    return `
      <div class="explain-raw-wrapper">
        <div class="raw-plan-header">
          <span>Engine Text Output (${getDialectLabel(State.dialect)})</span>
          <button class="micro-text-btn" onclick="navigator.clipboard.writeText(document.getElementById('rawPlanCodeBlock').textContent); this.textContent='✓ Copied'; setTimeout(()=>this.textContent='📋 Copy Text', 1500);">📋 Copy Text</button>
        </div>
        <pre class="raw-plan-code font-mono" id="rawPlanCodeBlock">${escapeHtml(rawText)}</pre>
      </div>
    `;
  }

  function renderPgRaw(node, indent) {
    const pad = '  '.repeat(indent);
    let str = `${pad}->  ${node.operator} on ${node.target}  (cost=${node.cost.startup}..${node.cost.total} rows=${node.rows.actual} width=64) (actual time=0.012..${node.timing.timeMs} rows=${node.rows.actual} loops=1)\n`;
    if (node.children) {
      node.children.forEach(c => {
        str += renderPgRaw(c, indent + 1);
      });
    }
    return str;
  }

  function renderMysqlRaw(node, indent) {
    const pad = '    '.repeat(indent);
    let str = `${pad}-> ${node.operator}: ${node.target} (cost=${node.cost.total} rows=${node.rows.actual}) (actual time=0.010..${node.timing.timeMs} rows=${node.rows.actual} loops=1)\n`;
    if (node.children) {
      node.children.forEach(c => {
        str += renderMysqlRaw(c, indent + 1);
      });
    }
    return str;
  }

  /**
   * Render Node Detail Inspector Modal
   */
  function renderNodeDetailModalHtml(node) {
    return `
      <div class="node-modal-backdrop" onclick="window.VISUAL_EXPLAIN_TREE_ENGINE.selectNode(null)">
        <div class="node-detail-modal" onclick="event.stopPropagation()">
          <div class="node-modal-header">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 20px;">${node.icon}</span>
              <div>
                <h3 style="margin: 0; font-size: 15px; color: var(--text-primary); font-weight: 600;">${escapeHtml(node.operator)}</h3>
                <span class="font-mono" style="font-size: 11px; color: var(--text-muted);">${escapeHtml(node.target)}</span>
              </div>
            </div>
            <button class="micro-text-btn" onclick="window.VISUAL_EXPLAIN_TREE_ENGINE.selectNode(null)" style="font-size: 16px;">✕</button>
          </div>

          <div class="node-modal-body">
            <!-- Physical Engine Mechanics -->
            <div class="modal-section">
              <span class="modal-sec-title">PHYSICAL STORAGE ENGINE EXECUTION</span>
              <p class="modal-sec-desc">${node.details}</p>
            </div>

            <!-- Key Metrics Table -->
            <div class="modal-section">
              <span class="modal-sec-title">PROFILED METRICS</span>
              <div class="modal-metrics-table">
                <div class="m-metric-row"><span class="m-k">Planner Startup Cost:</span><span class="m-v font-mono">${node.cost.startup}</span></div>
                <div class="m-metric-row"><span class="m-k">Total Execution Cost:</span><span class="m-v font-mono">${node.cost.total}</span></div>
                <div class="m-metric-row"><span class="m-k">Relative Query Cost Share:</span><span class="m-v font-mono">${node.costPercent}%</span></div>
                <div class="m-metric-row"><span class="m-k">Actual Tuples Emitted:</span><span class="m-v font-mono">${node.rows.actual.toLocaleString()}</span></div>
                <div class="m-metric-row"><span class="m-k">Cardinality Estimation Error:</span><span class="m-v font-mono">${node.rows.errorFactor}x (Accurate)</span></div>
                <div class="m-metric-row"><span class="m-k">Wall Clock Latency:</span><span class="m-v font-mono">${node.timing.timeMs} ms</span></div>
                <div class="m-metric-row"><span class="m-k">Shared Memory Hits:</span><span class="m-v font-mono">${node.buffers.sharedHit} pages (8KB ea)</span></div>
              </div>
            </div>

            <!-- Optimization Recommendation -->
            <div class="modal-section" style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 8px; padding: 12px;">
              <span class="modal-sec-title" style="color: #10b981;">💡 PRODUCTION OPTIMIZATION ADVISOR</span>
              <p style="font-size: 12px; color: var(--text-primary); margin: 4px 0 0; line-height: 1.5;">${node.optimizationTip}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Helper Labels
  function getDialectLabel(dialect) {
    if (dialect === 'postgres') return 'PostgreSQL 16.2';
    if (dialect === 'mysql') return 'MySQL 8.0.36';
    return 'DuckDB Columnar';
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

  // Public Interaction Handlers
  function switchDialect(dialect) {
    State.dialect = dialect;
    if (window.soundFX && window.soundFX.playClick) window.soundFX.playClick();
    renderTreeForQuery();
  }

  function switchViewMode(mode) {
    State.viewMode = mode;
    if (window.soundFX && window.soundFX.playClick) window.soundFX.playClick();
    renderTreeForQuery();
  }

  function toggleSimulatedIndex() {
    State.simulatedIndexActive = !State.simulatedIndexActive;
    if (window.soundFX) {
      if (State.simulatedIndexActive && window.soundFX.playSuccess) window.soundFX.playSuccess();
      else if (window.soundFX.playPop) window.soundFX.playPop();
    }
    renderTreeForQuery();
  }

  function selectNode(nodeId) {
    State.selectedNodeId = nodeId;
    if (window.soundFX && window.soundFX.playClick) window.soundFX.playClick();
    renderTreeForQuery();
  }

  function copyDdl(encodedDdl, btn) {
    const ddl = decodeURIComponent(encodedDdl);
    navigator.clipboard.writeText(ddl).then(() => {
      if (window.soundFX && window.soundFX.playPop) window.soundFX.playPop();
      if (btn) {
        btn.textContent = '✓ Copied DDL!';
        setTimeout(() => { btn.textContent = '📋 Copy DDL'; }, 1800);
      }
    });
  }

  /**
   * Programmatically open Query Studio and focus the Execution Plan tab
   */
  function openAndFocusTree() {
    // 1. Switch to Studio View if not already there
    if (typeof window.switchMainView === 'function') {
      window.switchMainView('viewStudio');
    }

    // 2. Select tabExplainPlan
    const btnTab = document.getElementById('btnTabExplainPlan');
    if (btnTab) {
      btnTab.click();
    } else {
      document.querySelectorAll('.tab-item').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      const planTab = document.getElementById('tabExplainPlan');
      if (planTab) planTab.classList.add('active');
    }

    // 3. Resolve SQL and render
    let sqlToUse = State.currentSql;
    const sqlInput = document.getElementById('sqlInput');
    const livePreview = document.getElementById('liveSqlPreview');
    if (sqlInput && sqlInput.value && sqlInput.value.trim()) {
      sqlToUse = sqlInput.value;
    } else if (livePreview && livePreview.textContent) {
      sqlToUse = livePreview.textContent;
    }

    renderTreeForQuery(sqlToUse, State.currentSteps);

    if (window.soundFX && window.soundFX.playWhoosh) {
      window.soundFX.playWhoosh();
    }
  }

  // Export to Global Window
  window.VISUAL_EXPLAIN_TREE_ENGINE = {
    renderTreeForQuery,
    openAndFocusTree,
    switchDialect,
    switchViewMode,
    toggleSimulatedIndex,
    selectNode,
    copyDdl
  };

})(window);
