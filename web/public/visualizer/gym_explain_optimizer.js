/**
 * SQL MASTERY VISUALIZER - EXPLAIN & QUERY COST OPTIMIZER (FEATURE #1)
 * --------------------------------------------------------------------
 * Simulates real-world MySQL 8.0 / PostgreSQL EXPLAIN ANALYZE execution plans.
 * Bridges the gap between writing syntax and engineering high-throughput,
 * index-optimized production queries expected in Senior & Staff interviews.
 */

(function(window) {
  'use strict';

  /**
   * Parses a SQL query to extract table, filters, group by, order by, and join conditions.
   */
  function analyzeQuery(query) {
    const q = (query || '').trim();
    
    // Extract primary table
    const fromMatch = q.match(/\bFROM\s+([a-zA-Z0-9_]+)/i);
    const table = fromMatch ? fromMatch[1] : 'records';

    // Extract WHERE predicate columns
    const whereMatch = q.match(/\bWHERE\s+([\s\S]+?)(?=\bGROUP\b|\bHAVING\b|\bORDER\b|\bLIMIT\b|\bWINDOW\b|$)/i);
    const whereClause = whereMatch ? whereMatch[1] : '';
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

    // Extract ORDER BY columns
    const orderMatch = q.match(/\bORDER\s+BY\s+([\s\S]+?)(?=\bLIMIT\b|$)/i);
    const orderCols = [];
    if (orderMatch) {
      orderMatch[1].split(',').forEach(part => {
        const clean = part.trim().split(/\s+/)[0];
        if (clean && !orderCols.includes(clean)) orderCols.push(clean);
      });
    }

    // Extract GROUP BY columns
    const groupMatch = q.match(/\bGROUP\s+BY\s+([\s\S]+?)(?=\bHAVING\b|\bORDER\b|\bLIMIT\b|$)/i);
    const groupCols = [];
    if (groupMatch) {
      groupMatch[1].split(',').forEach(part => {
        const clean = part.trim().split(/\s+/)[0];
        if (clean && !groupCols.includes(clean)) groupCols.push(clean);
      });
    }

    // Check for Window Functions
    const hasWindow = /\bOVER\s*\(/i.test(q);
    const hasAgg = /\b(COUNT|SUM|AVG|MIN|MAX)\s*\(/i.test(q);
    const hasJoin = /\bJOIN\b/i.test(q);

    return {
      table,
      filterCols,
      orderCols,
      groupCols,
      hasWindow,
      hasAgg,
      hasJoin
    };
  }

  /**
   * Generates realistic simulated EXPLAIN metrics and suggested indexes.
   */
  function generateOptimizerReport(query, customTable) {
    const analysis = analyzeQuery(query);
    const table = customTable || analysis.table;
    
    // Determine suggested index columns following ESR Rule (Equality -> Sort -> Range)
    const indexCols = [];
    analysis.filterCols.forEach(col => {
      if (!indexCols.includes(col)) indexCols.push(col);
    });
    analysis.groupCols.forEach(col => {
      if (!indexCols.includes(col)) indexCols.push(col);
    });
    analysis.orderCols.forEach(col => {
      if (!indexCols.includes(col)) indexCols.push(col);
    });

    // Fallback if no specific filter found
    if (indexCols.length === 0) {
      indexCols.push('id');
    }

    const indexName = `idx_${table.toLowerCase()}_${indexCols.slice(0, 3).join('_')}`;
    const ddl = `CREATE INDEX ${indexName} ON ${table} (${indexCols.slice(0, 3).join(', ')});`;

    // Baseline unindexed metrics (Full table scan)
    const rawRows = 500000;
    const unindexedCost = (rawRows * 0.2 + 2500).toFixed(2);
    const unindexedLatency = `${(Math.random() * 250 + 350).toFixed(1)} ms`;
    
    // Optimized index metrics
    const indexedRows = Math.floor(Math.random() * 25) + 5;
    const indexedCost = (indexedRows * 0.25 + 2.5).toFixed(2);
    const indexedLatency = `${(Math.random() * 1.5 + 0.8).toFixed(2)} ms`;
    const costReduction = (((unindexedCost - indexedCost) / unindexedCost) * 100).toFixed(2);

    // Engine physics explanation
    let physicsExplanation = '';
    if (analysis.filterCols.length > 0 && analysis.orderCols.length > 0) {
      physicsExplanation = `Applying the <strong>ESR (Equality, Sort, Range) Rule</strong>: Indexing <code>(${indexCols.slice(0, 3).join(', ')})</code> allows the InnoDB storage engine to seek directly to the matching rows via the B+Tree root node while eliminating the costly in-memory <strong>filesort</strong> pass entirely.`;
    } else if (analysis.groupCols.length > 0) {
      physicsExplanation = `By indexing the grouping key <code>(${indexCols.slice(0, 3).join(', ')})</code>, the engine performs a pre-sorted <strong>Index Grouping Scan</strong>, avoiding the creation of an expensive on-disk temporary table.`;
    } else if (analysis.filterCols.length > 0) {
      physicsExplanation = `The index transforms an $O(N)$ sequential table scan into an $O(\\log N)$ B+Tree traversal, inspecting only <strong>${indexedRows} leaf pages</strong> instead of reading 500,000 rows off disk.`;
    } else {
      physicsExplanation = `Clustered Primary Key lookup allows point evaluation in sub-millisecond time.`;
    }

    return {
      table,
      ddl,
      indexName,
      indexCols: indexCols.slice(0, 3),
      costReduction,
      physicsExplanation,
      unindexed: {
        type: 'ALL',
        typeColor: '#ef4444',
        typeDesc: 'Full Table Scan (Worst)',
        rowsExamined: rawRows.toLocaleString(),
        cost: unindexedCost,
        latency: unindexedLatency,
        extra: analysis.orderCols.length > 0 ? 'Using where; Using filesort' : 'Using where'
      },
      indexed: {
        type: analysis.filterCols.length > 1 ? 'ref' : 'range',
        typeColor: '#10b981',
        typeDesc: 'B+Tree Index Seek (Optimal)',
        rowsExamined: indexedRows.toLocaleString(),
        cost: indexedCost,
        latency: indexedLatency,
        extra: 'Using index condition; Backward index scan'
      }
    };
  }

  /**
   * Renders the interactive EXPLAIN Plan Drawer HTML.
   */
  function renderExplainDrawerHtml(caseId, targetQuery, customTable) {
    const report = generateOptimizerReport(targetQuery, customTable);

    return `
      <div class="gym-explain-drawer" id="explain_drawer_${caseId}" style="display: none;">
        <div class="explain-drawer-header">
          <div class="explain-title-group">
            <span class="explain-icon">⚡</span>
            <div>
              <div class="explain-title">MySQL 8.0 EXPLAIN ANALYZE • Production Query Cost Optimizer</div>
              <div class="explain-subtitle">Storage Engine B+Tree Execution Cost Comparison for <code>${escapeHtml(report.table)}</code></div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="cost-reduction-badge">🚀 ${report.costReduction}% Faster</span>
            <button class="micro-text-btn" style="color: #94a3b8; font-size: 14px;" onclick="window.GYM_EXPLAIN_OPTIMIZER.toggleExplain('${caseId}')">✕</button>
          </div>
        </div>

        <!-- Before vs After Cost Matrix -->
        <div class="explain-grid-compare">
          <!-- Unindexed Plan -->
          <div class="explain-plan-card plan-unindexed">
            <div class="plan-card-header">
              <span class="plan-status-pill status-unindexed">🔴 Unindexed (Raw Table)</span>
              <span class="plan-access-pill" style="background: ${report.unindexed.typeColor};">${report.unindexed.type}</span>
            </div>
            <div class="plan-metric-row">
              <span class="metric-lbl">Access Strategy:</span>
              <span class="metric-val text-red">${report.unindexed.typeDesc}</span>
            </div>
            <div class="plan-metric-row">
              <span class="metric-lbl">Rows Examined:</span>
              <span class="metric-val font-mono">${report.unindexed.rowsExamined}</span>
            </div>
            <div class="plan-metric-row">
              <span class="metric-lbl">Query Cost Score:</span>
              <span class="metric-val font-mono">${report.unindexed.cost}</span>
            </div>
            <div class="plan-metric-row">
              <span class="metric-lbl">Estimated Latency:</span>
              <span class="metric-val text-red font-mono">${report.unindexed.latency}</span>
            </div>
            <div class="plan-metric-row">
              <span class="metric-lbl">InnoDB Extra:</span>
              <span class="metric-val extra-pill">${escapeHtml(report.unindexed.extra)}</span>
            </div>
          </div>

          <!-- Index Optimized Plan -->
          <div class="explain-plan-card plan-indexed">
            <div class="plan-card-header">
              <span class="plan-status-pill status-indexed">🟢 With Target Index</span>
              <span class="plan-access-pill" style="background: ${report.indexed.typeColor}; color: #000;">${report.indexed.type}</span>
            </div>
            <div class="plan-metric-row">
              <span class="metric-lbl">Access Strategy:</span>
              <span class="metric-val text-green">${report.indexed.typeDesc}</span>
            </div>
            <div class="plan-metric-row">
              <span class="metric-lbl">Rows Examined:</span>
              <span class="metric-val font-mono text-green">${report.indexed.rowsExamined} rows</span>
            </div>
            <div class="plan-metric-row">
              <span class="metric-lbl">Query Cost Score:</span>
              <span class="metric-val font-mono text-green">${report.indexed.cost}</span>
            </div>
            <div class="plan-metric-row">
              <span class="metric-lbl">Estimated Latency:</span>
              <span class="metric-val text-green font-mono">${report.indexed.latency}</span>
            </div>
            <div class="plan-metric-row">
              <span class="metric-lbl">InnoDB Extra:</span>
              <span class="metric-val extra-pill-good">${escapeHtml(report.indexed.extra)}</span>
            </div>
          </div>
        </div>

        <!-- Recommended Production DDL Box -->
        <div class="explain-ddl-box">
          <div class="explain-ddl-header">
            <span>🛠️ <strong>Recommended Production Index DDL:</strong></span>
            <button class="micro-text-btn btn-copy-ddl" onclick="navigator.clipboard.writeText(decodeURIComponent('${encodeURIComponent(report.ddl)}')); if(window.soundFX) window.soundFX.playPop(); this.textContent='✓ Copied DDL!'; setTimeout(()=>this.textContent='📋 Copy DDL', 1500);">📋 Copy DDL</button>
          </div>
          <div class="explain-ddl-code">
            <code>${escapeHtml(report.ddl)}</code>
          </div>
        </div>

        <!-- B+Tree Physics Explanation -->
        <div class="explain-physics-banner">
          <span style="font-size: 14px;">🧠</span>
          <div style="font-size: 11.5px; color: #cbd5e1; line-height: 1.45;">
            ${report.physicsExplanation}
          </div>
        </div>
      </div>
    `;
  }

  function toggleExplain(caseId) {
    const el = document.getElementById(`explain_drawer_${caseId}`);
    if (!el) return;
    const isShowing = el.style.display === 'block';
    el.style.display = isShowing ? 'none' : 'block';
    
    if (window.soundFX) {
      if (!isShowing) window.soundFX.playWhoosh();
      else window.soundFX.playClick();
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

  window.GYM_EXPLAIN_OPTIMIZER = {
    renderExplainDrawerHtml,
    toggleExplain,
    generateOptimizerReport
  };

})(window);
