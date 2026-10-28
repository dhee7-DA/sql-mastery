/**
 * SQL MASTERY VISUALIZER - RELATIONAL DATA-FLOW DAG ENGINE (FEATURE #3)
 * ---------------------------------------------------------------------
 * Deconstructs SQL queries into a step-by-step Relational Algebra pipeline.
 * Visualizes row volume compression, operator transformations (σ, π, ⋈, γ, τ, ω),
 * and allows interactive inspection of intermediate row tuples at each stage.
 */

(function(window) {
  'use strict';

  /**
   * Deconstructs a SQL query into an array of Relational Algebra pipeline nodes.
   */
  function buildDataFlowPipeline(query, defaultTable) {
    const q = (query || '').trim();
    const table = defaultTable || extractPrimaryTable(q);
    const nodes = [];

    // Stage 1: BASE SCAN (Input stream)
    const baseRows = 100000;
    nodes.push({
      id: 'scan',
      symbol: 'SCAN',
      opName: 'Table Scan (Scan)',
      badge: '📥 Raw Ingestion',
      clause: `FROM ${table}`,
      inRows: 0,
      outRows: baseRows,
      volumeChange: '100,000 Rows (12.8 MB)',
      changeType: 'base',
      description: `Reads storage pages from heap/clustered index for table '${table}'.`,
      sampleTuples: [
        { id: 101, [table + '_ref']: 'TX-9021', value: 120.50, status: 'COMPLETED', date: '2026-03-01' },
        { id: 102, [table + '_ref']: 'TX-9022', value: 45.00, status: 'PENDING', date: '2026-03-01' },
        { id: 103, [table + '_ref']: 'TX-9023', value: 890.00, status: 'COMPLETED', date: '2026-03-02' },
        { id: 104, [table + '_ref']: 'TX-9024', value: 15.20, status: 'FAILED', date: '2026-03-02' }
      ]
    });

    let currentRows = baseRows;

    // Stage 2: RELATIONAL JOIN (if present)
    if (/\bJOIN\b/i.test(q)) {
      const joinMatch = q.match(/\b(LEFT|INNER|RIGHT|FULL|CROSS)?\s*JOIN\s+([a-zA-Z0-9_]+)/i);
      const joinedTable = joinMatch ? joinMatch[2] : 'joined_rel';
      const joinType = (joinMatch && joinMatch[1]) ? joinMatch[1].toUpperCase() : 'INNER';
      
      const outJoinRows = joinType === 'INNER' ? Math.round(currentRows * 0.92) : currentRows;
      nodes.push({
        id: 'join',
        symbol: '⋈',
        opName: `${joinType} Hash Join (⋈)`,
        badge: '🔗 Relational Pairing',
        clause: `JOIN ${joinedTable}`,
        inRows: currentRows,
        outRows: outJoinRows,
        volumeChange: `${outJoinRows.toLocaleString()} Rows (+Tuples)`,
        changeType: 'join',
        description: `Builds hash table on joining keys; matches foreign keys to synthesize composite relational tuples.`,
        sampleTuples: [
          { id: 101, [table + '_ref']: 'TX-9021', partner_name: 'Acme Corp', tier: 'Enterprise' },
          { id: 102, [table + '_ref']: 'TX-9022', partner_name: 'BioTech Ltd', tier: 'Standard' },
          { id: 103, [table + '_ref']: 'TX-9023', partner_name: 'Nova Systems', tier: 'Enterprise' }
        ]
      });
      currentRows = outJoinRows;
    }

    // Stage 3: SELECTION / FILTER (WHERE)
    if (/\bWHERE\b/i.test(q)) {
      const whereMatch = q.match(/\bWHERE\s+([\s\S]+?)(?=\bGROUP\b|\bHAVING\b|\bORDER\b|\bLIMIT\b|\bWINDOW\b|$)/i);
      const predicate = whereMatch ? whereMatch[1].trim() : 'predicate = true';
      const filteredRows = Math.round(currentRows * 0.14); // ~86% reduction

      nodes.push({
        id: 'filter',
        symbol: 'σ',
        opName: 'Selection Filter (σ)',
        badge: '🔻 -86% Volume Cut',
        clause: `WHERE ${truncate(predicate, 45)}`,
        inRows: currentRows,
        outRows: filteredRows,
        volumeChange: `${filteredRows.toLocaleString()} Rows (-86% cut)`,
        changeType: 'reduction',
        description: `Evaluates boolean predicates row-by-row; prunes non-matching tuples before aggregation.`,
        sampleTuples: [
          { id: 101, [table + '_ref']: 'TX-9021', value: 120.50, status: 'COMPLETED' },
          { id: 103, [table + '_ref']: 'TX-9023', value: 890.00, status: 'COMPLETED' }
        ]
      });
      currentRows = filteredRows;
    }

    // Stage 4: GROUPING & AGGREGATION (GROUP BY)
    if (/\bGROUP\s+BY\b/i.test(q)) {
      const groupMatch = q.match(/\bGROUP\s+BY\s+([\s\S]+?)(?=\bHAVING\b|\bORDER\b|\bLIMIT\b|$)/i);
      const groupCols = groupMatch ? groupMatch[1].trim() : 'group_keys';
      const groupedRows = Math.max(12, Math.round(currentRows * 0.12)); // ~88% group compression

      nodes.push({
        id: 'groupby',
        symbol: 'γ',
        opName: 'Hash Aggregate (γ)',
        badge: '📦 Heavy Compression',
        clause: `GROUP BY ${truncate(groupCols, 40)}`,
        inRows: currentRows,
        outRows: groupedRows,
        volumeChange: `${groupedRows.toLocaleString()} Groups (-88%)`,
        changeType: 'compression',
        description: `Buckets incoming tuples into hash slots by grouping keys and accumulates metric accumulators (SUM/COUNT/AVG).`,
        sampleTuples: [
          { group_key: 'Enterprise', total_records: 412, total_revenue: 148500.00 },
          { group_key: 'Standard', total_records: 1240, total_revenue: 89200.00 },
          { group_key: 'Growth', total_records: 230, total_revenue: 34100.00 }
        ]
      });
      currentRows = groupedRows;
    }

    // Stage 5: POST-AGGREGATION FILTER (HAVING)
    if (/\bHAVING\b/i.test(q)) {
      const havingMatch = q.match(/\bHAVING\s+([\s\S]+?)(?=\bORDER\b|\bLIMIT\b|$)/i);
      const havingCond = havingMatch ? havingMatch[1].trim() : 'aggregate > threshold';
      const afterHaving = Math.max(4, Math.round(currentRows * 0.35));

      nodes.push({
        id: 'having',
        symbol: 'σ_γ',
        opName: 'Group Filter (HAVING σ)',
        badge: '🎯 Metric Pruning',
        clause: `HAVING ${truncate(havingCond, 40)}`,
        inRows: currentRows,
        outRows: afterHaving,
        volumeChange: `${afterHaving.toLocaleString()} Groups Retained`,
        changeType: 'reduction',
        description: `Filters grouped summary records using aggregate values after reduction pass.`,
        sampleTuples: [
          { group_key: 'Enterprise', total_records: 412, total_revenue: 148500.00 }
        ]
      });
      currentRows = afterHaving;
    }

    // Stage 6: WINDOW FUNCTION BUFFERING (OVER)
    if (/\bOVER\s*\(/i.test(q)) {
      nodes.push({
        id: 'window',
        symbol: 'ω',
        opName: 'Window Framing (ω)',
        badge: '🪟 Partition Framing',
        clause: `OVER (PARTITION BY ... ORDER BY ...)`,
        inRows: currentRows,
        outRows: currentRows,
        volumeChange: `${currentRows.toLocaleString()} Rows (+Ranks)`,
        changeType: 'passthrough',
        description: `Materializes partitions into memory buffers; assigns moving metrics (RANK, LEAD, LAG) across frames without collapsing cardinality.`,
        sampleTuples: [
          { item_id: 'A-1', metric: 490, win_rank: 1, win_dense_rank: 1 },
          { item_id: 'A-2', metric: 410, win_rank: 2, win_dense_rank: 2 },
          { item_id: 'A-3', metric: 410, win_rank: 2, win_dense_rank: 2 }
        ]
      });
    }

    // Stage 7: ORDERING / FILESORT (ORDER BY)
    if (/\bORDER\s+BY\b/i.test(q)) {
      const orderMatch = q.match(/\bORDER\s+BY\s+([\s\S]+?)(?=\bLIMIT\b|$)/i);
      const orderCols = orderMatch ? orderMatch[1].trim() : 'columns';

      nodes.push({
        id: 'sort',
        symbol: 'τ',
        opName: 'Top-N / Sort (τ)',
        badge: '⚡ Sequence Re-order',
        clause: `ORDER BY ${truncate(orderCols, 40)}`,
        inRows: currentRows,
        outRows: currentRows,
        volumeChange: `${currentRows.toLocaleString()} Sorted Rows`,
        changeType: 'sort',
        description: `Orders incoming stream using B+Tree index traversal or memory Priority Queue / QuickSort.`,
        sampleTuples: [
          { rank: 1, item: 'A-1', value: 980 },
          { rank: 2, item: 'B-3', value: 840 },
          { rank: 3, item: 'C-7', value: 720 }
        ]
      });
    }

    // Stage 8: LIMIT / SLICING
    if (/\bLIMIT\b/i.test(q)) {
      const limitMatch = q.match(/\bLIMIT\s+([0-9]+)/i);
      const limitVal = limitMatch ? parseInt(limitMatch[1], 10) : 10;
      const finalLimitRows = Math.min(currentRows, limitVal);

      nodes.push({
        id: 'limit',
        symbol: 'π_k',
        opName: 'Limit / Slicing (π)',
        badge: '🎯 Final Slice',
        clause: `LIMIT ${limitVal}`,
        inRows: currentRows,
        outRows: finalLimitRows,
        volumeChange: `${finalLimitRows} Target Rows`,
        changeType: 'limit',
        description: `Early-terminates operator iterator upon reaching requested row quota, discarding remainder of stream.`,
        sampleTuples: [
          { row_idx: 1, metric: 'Top Tier Alpha' },
          { row_idx: 2, metric: 'Top Tier Beta' }
        ]
      });
      currentRows = finalLimitRows;
    }

    // Stage 9: PROJECTION
    nodes.push({
      id: 'project',
      symbol: 'π',
      opName: 'Projection (π)',
      badge: '✨ Final Output',
      clause: 'SELECT final_columns',
      inRows: currentRows,
      outRows: currentRows,
      volumeChange: `${currentRows} Rows (Output)`,
      changeType: 'output',
      description: `Discards internal join/filter helper columns; constructs final wire-format response tuples.`,
      sampleTuples: [
        { result: 'Transmitted to client application' }
      ]
    });

    return nodes;
  }

  function extractPrimaryTable(query) {
    const m = (query || '').match(/\bFROM\s+([a-zA-Z0-9_]+)/i);
    return m ? m[1] : 'records';
  }

  function truncate(str, maxLen) {
    if (!str) return '';
    return str.length > maxLen ? str.substring(0, maxLen) + '...' : str;
  }

  /**
   * Renders the Relational Data-Flow DAG drawer HTML.
   */
  function renderDataFlowDrawerHtml(caseId, targetQuery, table) {
    const pipeline = buildDataFlowPipeline(targetQuery, table);
    const totalReduction = pipeline.length > 1 
      ? Math.round((1 - (pipeline[pipeline.length - 1].outRows / pipeline[0].outRows)) * 10000) / 100
      : 0;

    return `
      <div class="gym-dataflow-drawer" id="dataflow_drawer_${caseId}" style="display: none;">
        <!-- Top Metrics Bar -->
        <div class="dataflow-header">
          <div class="dataflow-header-left">
            <span class="dataflow-logo-icon">📊</span>
            <div>
              <div class="dataflow-title">Relational Algebra Data-Flow DAG</div>
              <div class="dataflow-subtitle">Logical transformation pipeline • Volume compression & operator stream</div>
            </div>
          </div>
          <div class="dataflow-compression-tag">
            <span style="font-size: 10px; color: #94a3b8;">OVERALL COMPRESSION:</span>
            <span class="compression-stat">${totalReduction > 0 ? `-${totalReduction}%` : 'Passthrough'}</span>
          </div>
        </div>

        <!-- Interactive Horizontal Pipeline Stream -->
        <div class="dataflow-pipeline-track" id="dag_track_${caseId}">
          ${pipeline.map((node, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === pipeline.length - 1;
            return `
              ${!isFirst ? `
                <div class="dag-arrow-connector">
                  <div class="dag-arrow-line"></div>
                  <div class="dag-arrow-head">▶</div>
                </div>
              ` : ''}

              <div class="dag-node-card ${idx === 0 ? 'active' : ''}" 
                   id="dagnode_${caseId}_${idx}"
                   onclick="window.GYM_DATAFLOW_GRAPH && window.GYM_DATAFLOW_GRAPH.inspectNode('${caseId}', ${idx})">
                <div class="node-symbol-row">
                  <span class="node-symbol">${escapeHtml(node.symbol)}</span>
                  <span class="node-badge ${node.changeType}">${escapeHtml(node.badge)}</span>
                </div>
                <div class="node-opname">${escapeHtml(node.opName)}</div>
                <div class="node-clause"><code>${escapeHtml(node.clause)}</code></div>
                <div class="node-volume-row">
                  <span class="node-volume-val">${escapeHtml(node.volumeChange)}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Node Inspector: Detailed Operator Physics & Tuple Preview -->
        <div class="dag-inspector-panel" id="dag_inspector_${caseId}">
          ${renderInspectorHtml(pipeline[0])}
        </div>
      </div>
    `;
  }

  /**
   * Renders the tuple inspector HTML for a selected node.
   */
  function renderInspectorHtml(node) {
    if (!node) return '';
    return `
      <div class="inspector-card">
        <div class="inspector-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="inspector-symbol">${escapeHtml(node.symbol)}</span>
            <span class="inspector-opname">${escapeHtml(node.opName)}</span>
          </div>
          <div class="inspector-meta-pills">
            <span class="meta-pill">IN: ${node.inRows.toLocaleString()} rows</span>
            <span class="meta-pill" style="color: #38bdf8;">OUT: ${node.outRows.toLocaleString()} rows</span>
          </div>
        </div>
        <div class="inspector-desc">${escapeHtml(node.description)}</div>

        <!-- Sample Intermediate Tuples -->
        <div class="inspector-tuples-box">
          <div class="inspector-tuples-header">
            <span>🔬 Sample Intermediate Tuples Transiting Operator:</span>
            <span style="font-size: 10px; color: #64748b;">(Evaluated in Buffer Pool Memory)</span>
          </div>
          <div class="inspector-table-wrapper">
            <table class="inspector-table">
              <thead>
                <tr>
                  ${Object.keys(node.sampleTuples[0] || {}).map(k => `<th>${escapeHtml(k)}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${node.sampleTuples.map(row => `
                  <tr>
                    ${Object.values(row).map(v => `<td>${escapeHtml(String(v))}</td>`).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Handles click on a DAG node to inspect its intermediate schema and tuples.
   */
  function inspectNode(caseId, nodeIndex) {
    const cardEl = document.getElementById(`case_card_${caseId}`) || document.getElementById(`dock_${caseId}`)?.closest('.case-study-card');
    const targetQuery = cardEl ? (cardEl.dataset.targetQuery || '') : '';
    const table = cardEl ? (cardEl.dataset.table || 'records') : 'records';

    const pipeline = buildDataFlowPipeline(targetQuery, table);
    const node = pipeline[nodeIndex];
    if (!node) return;

    // Highlight selected node
    pipeline.forEach((_, idx) => {
      const el = document.getElementById(`dagnode_${caseId}_${idx}`);
      if (el) {
        if (idx === nodeIndex) el.classList.add('active');
        else el.classList.remove('active');
      }
    });

    // Update inspector view
    const insp = document.getElementById(`dag_inspector_${caseId}`);
    if (insp) {
      insp.innerHTML = renderInspectorHtml(node);
    }

    if (window.soundFX) window.soundFX.playClick();
  }

  /**
   * Toggles display of the Relational Data-Flow DAG drawer.
   */
  function toggleDataFlow(caseId) {
    const el = document.getElementById(`dataflow_drawer_${caseId}`);
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

  window.GYM_DATAFLOW_GRAPH = {
    renderDataFlowDrawerHtml,
    toggleDataFlow,
    inspectNode,
    buildDataFlowPipeline
  };

})(window);
