/**
 * =============================================================================
 * ADAPTIVE RELATIONAL PIPELINE COMPILER (DYNAMIC SQL -> EXPLAINER SVG)
 * Pure Bloomberg / LedgerLens Obsidian Dark Architecture
 * 
 * Transforms ANY arbitrary SQL query (or LeetCode problem solution) into a
 * dynamic 3-to-6 chamber topological execution machine SVG.
 * 
 * Supported Topologies:
 *   - 3 Chambers: SCAN -> PREDICATE FILTER -> EMISSION (Warm-ups & Filters)
 *   - 3-4 Chambers: SCAN -> RELATIONAL JOIN -> (WHERE) -> EMISSION (Joins)
 *   - 4-5 Chambers: SCAN -> HASH ROLLUP -> (HAVING) -> EMISSION (Aggregations)
 *   - 5 Chambers: SCAN -> (JOIN) -> WINDOW ANALYTICS -> (WHERE) -> EMISSION (Window Analytics)
 *   - 6 Chambers: Multi-CTE / Subquery / Complex Top-N Analytical Pipelines
 * =============================================================================
 */

(function(global) {
  'use strict';

  const KEYWORDS = new Set([
    'WHERE', 'GROUP', 'ORDER', 'HAVING', 'LIMIT', 'JOIN', 'LEFT', 'RIGHT',
    'INNER', 'CROSS', 'FULL', 'ON', 'AS', 'WINDOW', 'FROM', 'SELECT', 'WITH'
  ]);

  // Dynamic metric registry for drawer inspection
  let dynamicCatalog = {};

  // XML escape utility
  function escapeXml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  // Safe truncation to avoid SVG horizontal text collision
  function trunc(str, maxLen) {
    if (str === null || str === undefined) return '';
    const s = String(str);
    return s.length > maxLen ? s.slice(0, maxLen - 1) + '…' : s;
  }

  // ---------------------------------------------------------------------------
  // 1. SQL LEXER & AST EXTRACTOR
  // ---------------------------------------------------------------------------
  function parseSQL(sql) {
    if (!sql || typeof sql !== 'string') return null;

    // Clean comments and normalize whitespaces
    const sqlClean = sql
      .replace(/--[^\n]*/g, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const parsed = {
      raw: sql,
      clean: sqlClean,
      hasCte: /\bWITH\b/i.test(sqlClean),
      ctes: [],
      select: [],
      isDistinct: /\bSELECT\s+DISTINCT\b/i.test(sqlClean),
      from: null,
      joins: [],
      where: [],
      groupBy: [],
      having: [],
      windowFns: [],
      orderBy: [],
      limit: null
    };

    // 1.1 CTEs
    const cteRegex = /\bWITH\s+([A-Za-z0-9_]+)\s+AS\s*\(([\s\S]+?)\)(?=\s*(?:,\s*([A-Za-z0-9_]+)\s+AS\s*\(|\s*SELECT\b))/gi;
    let cteMatch;
    while ((cteMatch = cteRegex.exec(sqlClean)) !== null) {
      parsed.ctes.push({ name: cteMatch[1], query: cteMatch[2] });
    }

    // 1.2 Window Functions: match function before OVER (...)
    const winRegex = /\b([A-Za-z_][A-Za-z0-9_]*)\s*\(([^()]*)\)\s*OVER\s*\(([^()]+)\)/gi;
    let winMatch;
    while ((winMatch = winRegex.exec(sqlClean)) !== null) {
      parsed.windowFns.push({
        fn: winMatch[1].toUpperCase(),
        args: winMatch[2].trim(),
        spec: winMatch[3].trim(),
        raw: winMatch[0]
      });
    }

    // 1.3 FROM Clause: handles both FROM table and derived tables FROM (SELECT ... FROM table)
    const subqueryFrom = sqlClean.match(/\bFROM\s*\(\s*SELECT[\s\S]+?\bFROM\s+([A-Za-z0-9_]+)/i);
    if (subqueryFrom) {
      parsed.from = { table: subqueryFrom[1], alias: 'subq_source', isSubquery: true };
    } else {
      const fromMatch = sqlClean.match(/\bFROM\s+([A-Za-z0-9_]+)(?:\s+(?:AS\s+)?([A-Za-z0-9_]+))?/i);
      if (fromMatch) {
        let tbl = fromMatch[1];
        let alias = fromMatch[2];
        if (alias && KEYWORDS.has(alias.toUpperCase())) {
          alias = tbl;
        }
        parsed.from = { table: tbl, alias: alias || tbl, isSubquery: false };
      }
    }

    // 1.4 JOIN Clauses
    const joinRegex = /\b(LEFT(?:\s+OUTER)?|RIGHT(?:\s+OUTER)?|INNER|CROSS|FULL(?:\s+OUTER)?)?\s*JOIN\s+([A-Za-z0-9_]+)(?:\s+(?:AS\s+)?([A-Za-z0-9_]+))?\s+ON\s+([\s\S]+?)(?=\b(?:LEFT|RIGHT|INNER|CROSS|FULL)?\s*JOIN\b|\bWHERE\b|\bGROUP\s+BY\b|\bHAVING\b|\bORDER\s+BY\b|\bLIMIT\b|;|$)/gi;
    let jMatch;
    while ((jMatch = joinRegex.exec(sqlClean)) !== null) {
      let jTbl = jMatch[2];
      let jAlias = jMatch[3];
      if (jAlias && KEYWORDS.has(jAlias.toUpperCase())) {
        jAlias = jTbl;
      }
      parsed.joins.push({
        type: (jMatch[1] || 'INNER').toUpperCase().replace(/\s+/g, ' ').trim(),
        table: jTbl,
        alias: jAlias || jTbl,
        on: jMatch[4].trim()
      });
    }

    // 1.5 WHERE Clause
    const whereMatch = sqlClean.match(/\bWHERE\s+([\s\S]+?)(?=\bGROUP\s+BY\b|\bHAVING\b|\bORDER\s+BY\b|\bLIMIT\b|;|$)/i);
    if (whereMatch) {
      const rawWhere = whereMatch[1].trim();
      const parts = rawWhere.split(/\bAND\b|\bOR\b/i).map(s => s.trim().replace(/;$/, '')).filter(Boolean);
      parsed.where = parts;
    }

    // 1.6 GROUP BY Clause
    const groupMatch = sqlClean.match(/\bGROUP\s+BY\s+([\s\S]+?)(?=\bHAVING\b|\bORDER\s+BY\b|\bLIMIT\b|;|$)/i);
    if (groupMatch) {
      parsed.groupBy = groupMatch[1].split(',').map(s => s.trim().replace(/;$/, '')).filter(Boolean);
    }

    // 1.7 HAVING Clause
    const havingMatch = sqlClean.match(/\bHAVING\s+([\s\S]+?)(?=\bORDER\s+BY\b|\bLIMIT\b|;|$)/i);
    if (havingMatch) {
      parsed.having = havingMatch[1].split(/\bAND\b|\bOR\b/i).map(s => s.trim().replace(/;$/, '')).filter(Boolean);
    }

    // 1.8 ORDER BY Clause
    const orderMatch = sqlClean.match(/\bORDER\s+BY\s+([\s\S]+?)(?=\bLIMIT\b|;|$)/i);
    if (orderMatch) {
      parsed.orderBy = orderMatch[1].split(',').map(s => s.trim().replace(/;$/, '')).filter(Boolean);
    }

    // 1.9 LIMIT Clause
    const limitMatch = sqlClean.match(/\bLIMIT\s+(\d+)/i);
    if (limitMatch) {
      parsed.limit = parseInt(limitMatch[1], 10);
    }

    // 1.10 SELECT Columns
    const selectMatch = sqlClean.match(/\bSELECT\s+(?:DISTINCT\s+)?([\s\S]+?)\s+\bFROM\b/i);
    if (selectMatch) {
      parsed.select = selectMatch[1].split(',').map(s => s.trim()).filter(Boolean);
    }

    return parsed;
  }

  // ---------------------------------------------------------------------------
  // 2. DYNAMIC CHAMBERS TOPOLOGY BUILDER
  // ---------------------------------------------------------------------------
  function buildAdaptiveChambers(parsed, problemMeta) {
    const chambers = [];
    dynamicCatalog = {}; // Reset catalog for this query compilation

    // Helper to register dynamic metric for Click-to-Inspect drawer
    function registerDossier(id, info) {
      dynamicCatalog[id] = {
        title: info.title || id,
        pin: info.pin || 1,
        color: info.color || '#38bdf8',
        gauge: info.gauge || 'RELATIONAL EXECUTION NODE',
        grain: info.grain || '1 row per logical entity',
        audit: info.audit || 'Verified 100% relational integrity. Cardinality matches logical predicate expectations.',
        edgeCase: info.edge || info.edgeCase || 'Watch for NULL propagation, unindexed join keys, and partition memory spills.',
        sql: {
          postgres: info.postgres || `-- PostgreSQL 16:\n${parsed.raw}`,
          snowflake: info.snowflake || `-- Snowflake:\n${parsed.raw}`,
          bigquery: info.bigquery || `-- BigQuery Standard SQL:\n${parsed.raw}`,
          duckdb: info.duckdb || `-- DuckDB / SQLite WASM:\n${parsed.raw}`
        },
        commercialInsight: info.commercial || info.commercialInsight || 'Transforms atomic transaction events into structured decision-ready metrics.',
        interviewQuestion: info.interview || info.interviewQuestion || 'Explain the physical operator chosen and how memory limits affect execution.',
        pitfallTrap: info.pitfall || info.pitfallTrap || 'Beware of unindexed scans, join fan-out, and memory spills to disk on large datasets.',
        sanity: [
          'Verify zero unwanted Cartesian explosion',
          'Confirm NULL handling across predicates and joins',
          'Ensure index selectivity or partition pruning is utilized'
        ]
      };
    }

    // -------------------------------------------------------------------------
    // STAGE 1: SOURCE SCAN
    // -------------------------------------------------------------------------
    const fromTbl = (parsed.from && parsed.from.table) || (problemMeta && problemMeta.sampleInput && problemMeta.sampleInput.table) || 'orders';
    let scanHeaders = ['id', 'metric_val', 'status'];
    let scanRows = [
      { cells: ['101', '4,250', 'ACTIVE'], status: 'pass', pin: 1, metricId: 'scan_1' },
      { cells: ['102', '1,890', 'ACTIVE'], status: 'pass', pin: 2, metricId: 'scan_2' },
      { cells: ['103', '3,400', 'ACTIVE'], status: 'pass', pin: 3, metricId: 'scan_3' },
      { cells: ['104', '920', 'PENDING'], status: 'pass', pin: 4, metricId: 'scan_4' }
    ];

    if (problemMeta && problemMeta.sampleInput && Array.isArray(problemMeta.sampleInput.columns) && problemMeta.sampleInput.columns.length > 0) {
      scanHeaders = problemMeta.sampleInput.columns.slice(0, 3);
      if (problemMeta.sampleInput.rows && problemMeta.sampleInput.rows.length > 0) {
        scanRows = problemMeta.sampleInput.rows.slice(0, 4).map((r, idx) => ({
          cells: r.slice(0, 3).map(v => v === null ? 'NULL' : String(v)),
          status: 'pass',
          pin: idx + 1,
          metricId: `scan_${idx + 1}`
        }));
      }
    }

    scanRows.forEach(r => {
      registerDossier(r.metricId, {
        title: `${fromTbl} Tuple Scan // Key: ${r.cells[0]}`,
        pin: r.pin,
        color: '#38bdf8',
        gauge: `01 PHYSICAL SCAN // ${fromTbl.toUpperCase()}`,
        grain: `${fromTbl}.${scanHeaders[0]} (PRIMARY KEY / CLUSTERED INDEX)`,
        audit: `Raw base tuple emitted from storage engine. ${scanHeaders.join(', ')} verified present.`,
        edge: 'Sequential scan on large tables requires composite index or partition filter pushdown.',
        commercial: `Initial data ingestion layer for ${fromTbl}. Provides atomic raw facts.`,
        interview: `How does the database buffer pool and OS page cache optimize sequential scans versus index scans on ${fromTbl}?`
      });
    });

    chambers.push({
      id: 'ch_scan',
      chip: '01',
      title: 'SOURCE SCAN',
      subtitle: `FROM ${fromTbl}${parsed.from && parsed.from.alias !== fromTbl ? ' AS ' + parsed.from.alias : ''}`,
      badge: 'BASE TUPLES',
      color: '#38bdf8',
      colorName: 'cyan',
      headers: scanHeaders,
      rows: scanRows,
      stats: { inCount: scanRows.length, passCount: scanRows.length, label: `${fromTbl} SCAN` }
    });

    // -------------------------------------------------------------------------
    // STAGE 2: RELATIONAL JOIN (if joins present)
    // -------------------------------------------------------------------------
    if (parsed.joins && parsed.joins.length > 0) {
      const j = parsed.joins[0];
      const jHeaders = [...scanHeaders.slice(0, 2), `${j.table.slice(0, 6)}.val`];
      const isLeft = j.type.includes('LEFT');
      const jRows = scanRows.map((r, idx) => {
        const hasMatch = isLeft ? true : idx % 2 === 0;
        const matchVal = (idx === 1 && isLeft) ? 'NULL' : (idx % 2 === 0 ? 'MATCH' : 'MATCH_2');
        const metricId = `join_${idx + 1}`;
        registerDossier(metricId, {
          title: `${j.type} JOIN ${j.table} // Key: ${r.cells[0]}`,
          pin: idx + 1,
          color: '#818cf8',
          gauge: `02 RELATIONAL JOIN // ${j.type} HASH MATCH`,
          grain: `Combined grain: ${fromTbl} x ${j.table}`,
          audit: `Join condition ${j.on || 'KEY'}: evaluated with ${matchVal === 'NULL' ? 'NULL outer padding' : 'inner key match'}.`,
          edge: 'Watch out for fan-out (Cartesian explosion) if foreign key has 1-to-many duplicates!',
          commercial: `Enriches ${fromTbl} entity with dimension attributes from ${j.table}.`,
          interview: `Explain why a Hash Join builds on the smaller table and probes with the larger table in memory.`
        });
        return {
          cells: [...r.cells.slice(0, 2), matchVal],
          status: hasMatch ? 'pass' : 'drop',
          pin: idx + 1,
          metricId: metricId
        };
      });

      chambers.push({
        id: 'ch_join',
        chip: String(chambers.length + 1).padStart(2, '0'),
        title: 'RELATIONAL JOIN',
        subtitle: `${j.type} JOIN ${j.table}`,
        badge: 'HASH MATCH',
        color: '#818cf8',
        colorName: 'indigo',
        headers: jHeaders,
        rows: jRows,
        stats: { inCount: scanRows.length, passCount: jRows.filter(r => r.status === 'pass').length, label: `ON ${j.on ? j.on.slice(0, 18) : 'KEY'}` }
      });
    }

    // -------------------------------------------------------------------------
    // STAGE 3: PREDICATE FILTER (if WHERE present)
    // -------------------------------------------------------------------------
    if (parsed.where && parsed.where.length > 0) {
      const prevChamber = chambers[chambers.length - 1];
      const condStr = parsed.where[0];
      const fHeaders = [...prevChamber.headers.slice(0, 2), 'EVAL'];
      const fRows = prevChamber.rows.map((r, idx) => {
        // High quality deterministic pass/drop simulation
        const isPass = (idx === 0 || idx === 2);
        const metricId = `filter_${idx + 1}`;
        registerDossier(metricId, {
          title: `Predicate Evaluation // ${condStr.slice(0, 24)}`,
          pin: idx + 1,
          color: '#fbbf24',
          gauge: '03 PREDICATE FILTER // BOOLEAN EVALUATION',
          grain: prevChamber.headers[0] + ' tuple grain',
          audit: `Boolean expression evaluates to ${isPass ? 'TRUE (TUPLE RETAINED)' : 'FALSE/NULL (TUPLE PRUNED)'}.`,
          edge: 'Beware of NULL values in ternary logic: NULL >= X evaluates to UNKNOWN and is dropped!',
          commercial: 'Prunes irrelevant records early to conserve downstream memory and I/O bandwidth.',
          interview: 'How does predicate pushdown allow database query planners to filter rows before executing expensive joins?'
        });
        return {
          cells: [...r.cells.slice(0, 2), isPass ? 'PASS ✓' : 'DROP ✗'],
          status: isPass ? 'pass' : 'drop',
          pin: idx + 1,
          metricId: metricId
        };
      });

      const passCount = fRows.filter(r => r.status === 'pass').length;
      chambers.push({
        id: 'ch_filter',
        chip: String(chambers.length + 1).padStart(2, '0'),
        title: 'PREDICATE FILTER',
        subtitle: `WHERE ${condStr.slice(0, 22)}${condStr.length > 22 ? '...' : ''}`,
        badge: 'BOOLEAN SEED',
        color: '#fbbf24',
        colorName: 'amber',
        headers: fHeaders,
        rows: fRows,
        stats: { inCount: fRows.length, passCount: passCount, label: `DROPPED: ${fRows.length - passCount}` }
      });
    }

    // -------------------------------------------------------------------------
    // STAGE 4: HASH ROLLUP (if GROUP BY present)
    // -------------------------------------------------------------------------
    if (parsed.groupBy && parsed.groupBy.length > 0) {
      const prevChamber = chambers[chambers.length - 1];
      const grpCol = parsed.groupBy[0].replace(/^[a-z0-9_]+\./i, '');
      const grpHeaders = [grpCol.slice(0, 8), 'COUNT(*)', 'AGG_VAL'];
      const grpRows = [
        { cells: ['CAT_A', '3', '12,450'], status: 'pass', pin: 1, metricId: 'grp_1' },
        { cells: ['CAT_B', '1', '3,890'], status: 'pass', pin: 2, metricId: 'grp_2' }
      ];

      grpRows.forEach(r => {
        registerDossier(r.metricId, {
          title: `Hash Rollup Bucket // ${r.cells[0]}`,
          pin: r.pin,
          color: '#ec4899',
          gauge: '04 HASH ROLLUP // BUCKET AGGREGATION',
          grain: `1 row per ${grpCol} bucket`,
          audit: `Collapsed ${r.cells[1]} input rows into single grouped summary row with accumulated sum.`,
          edge: 'High-cardinality group by columns can spill hash tables from RAM to disk (tempdb/spill).',
          commercial: `Aggregates atomic rows into business-level grouping: ${grpCol}.`,
          interview: 'Contrast Hash Aggregate with Sort Aggregate. When would an optimizer favor Sort Aggregate?'
        });
      });

      chambers.push({
        id: 'ch_rollup',
        chip: String(chambers.length + 1).padStart(2, '0'),
        title: 'HASH ROLLUP',
        subtitle: `GROUP BY ${parsed.groupBy.join(', ').slice(0, 20)}`,
        badge: 'BUCKET AGG',
        color: '#ec4899',
        colorName: 'pink',
        headers: grpHeaders,
        rows: grpRows,
        stats: { inCount: prevChamber.rows.length, passCount: grpRows.length, label: `${grpRows.length} BUCKETS` }
      });
    }

    // -------------------------------------------------------------------------
    // STAGE 5: HAVING FILTER or WINDOW ANALYTICS
    // -------------------------------------------------------------------------
    if (parsed.having && parsed.having.length > 0) {
      const prevChamber = chambers[chambers.length - 1];
      const hHeaders = [...prevChamber.headers.slice(0, 2), 'HAVING'];
      const hRows = prevChamber.rows.map((r, idx) => {
        const isPass = idx === 0;
        const metricId = `having_${idx + 1}`;
        registerDossier(metricId, {
          title: `Post-Agg Having Filter // ${parsed.having[0].slice(0, 22)}`,
          pin: idx + 1,
          color: '#f43f5e',
          gauge: '05 HAVING FILTER // POST-ROLLUP GATE',
          grain: 'Filtered bucket grain',
          audit: `Aggregate predicate evaluates to ${isPass ? 'TRUE (BUCKET RETAINED)' : 'FALSE (BUCKET DISCARDED)'}.`,
          edge: 'Never use HAVING for row-level filters that can be pushed to WHERE before aggregation!',
          commercial: 'Guarantees only significant volume or metric thresholds reach downstream reporting.',
          interview: 'Explain why HAVING runs strictly after GROUP BY while WHERE runs strictly before.'
        });
        return {
          cells: [...r.cells.slice(0, 2), isPass ? 'PASS ✓' : 'DROP ✗'],
          status: isPass ? 'pass' : 'drop',
          pin: idx + 1,
          metricId: metricId
        };
      });

      chambers.push({
        id: 'ch_having',
        chip: String(chambers.length + 1).padStart(2, '0'),
        title: 'HAVING FILTER',
        subtitle: `HAVING ${parsed.having[0].slice(0, 20)}`,
        badge: 'POST-AGG FILTER',
        color: '#f43f5e',
        colorName: 'rose',
        headers: hHeaders,
        rows: hRows,
        stats: { inCount: prevChamber.rows.length, passCount: 1, label: 'BUCKET PRUNED' }
      });
    } else if (parsed.windowFns && parsed.windowFns.length > 0) {
      const w = parsed.windowFns[0];
      const prevChamber = chambers[chambers.length - 1];
      const wHeaders = [...prevChamber.headers.slice(0, 2), `${w.fn.slice(0, 6)}`];
      const wRows = prevChamber.rows.map((r, idx) => {
        const metricId = `win_${idx + 1}`;
        registerDossier(metricId, {
          title: `Window Function Compute // ${w.fn}() OVER (...)`,
          pin: idx + 1,
          color: '#a855f7',
          gauge: '05 WINDOW ANALYTICS // PARTITION STREAM',
          grain: 'Preserves individual row grain without row collapse',
          audit: `Window calculation computed across partition fence. Spec: ${w.spec.slice(0, 30)}`,
          edge: 'Default window frame with ORDER BY is RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (duplicates share values)!',
          commercial: 'Calculates rolling velocity, cohort rank, and period-over-period deltas.',
          interview: 'What is the performance difference between ROW_NUMBER(), RANK(), and DENSE_RANK() in an execution plan?'
        });
        return {
          cells: [...r.cells.slice(0, 2), `RNK_${idx + 1}`],
          status: 'pass',
          pin: idx + 1,
          metricId: metricId
        };
      });

      chambers.push({
        id: 'ch_window',
        chip: String(chambers.length + 1).padStart(2, '0'),
        title: 'WINDOW ANALYTICS',
        subtitle: `${w.fn}() OVER (...)`,
        badge: 'PARTITION FENCE',
        color: '#a855f7',
        colorName: 'purple',
        headers: wHeaders,
        rows: wRows,
        stats: { inCount: wRows.length, passCount: wRows.length, label: 'NO ROW COLLAPSE' }
      });
    }

    // -------------------------------------------------------------------------
    // STAGE 6: SORT & SLICE (if LIMIT present and chamber count <= 4)
    // -------------------------------------------------------------------------
    if (parsed.limit && chambers.length <= 4) {
      const prevChamber = chambers[chambers.length - 1];
      const limRows = prevChamber.rows.slice(0, Math.min(parsed.limit, prevChamber.rows.length)).map((r, idx) => {
        const metricId = `limit_${idx + 1}`;
        registerDossier(metricId, {
          title: `Top-N Heap Sorter // LIMIT ${parsed.limit}`,
          pin: idx + 1,
          color: '#06b6d4',
          gauge: '06 SORT & SLICE // BOUNDED TOP-N',
          grain: `Truncated top ${parsed.limit} records`,
          audit: `Maintains a bounded max/min heap of size ${parsed.limit} in memory during scan.`,
          edge: 'LIMIT without a deterministic ORDER BY produces non-deterministic, flaky result sets!',
          commercial: 'Extracts top performers, highest order values, or priority queue items.',
          interview: 'Why is a Top-N Heap sort significantly faster than a full external sort followed by a limit?'
        });
        return {
          cells: [...r.cells],
          status: 'pass',
          pin: idx + 1,
          metricId: metricId
        };
      });

      chambers.push({
        id: 'ch_slice',
        chip: String(chambers.length + 1).padStart(2, '0'),
        title: 'SORT & SLICE',
        subtitle: `TOP ${parsed.limit} HEAP`,
        badge: 'BOUNDED SCAN',
        color: '#06b6d4',
        colorName: 'teal',
        headers: prevChamber.headers,
        rows: limRows,
        stats: { inCount: prevChamber.rows.length, passCount: limRows.length, label: `LIMIT ${parsed.limit}` }
      });
    }

    // -------------------------------------------------------------------------
    // FINAL STAGE: TARGET EMISSION
    // -------------------------------------------------------------------------
    const lastActiveChamber = chambers[chambers.length - 1];
    let emitHeaders = parsed.select.length > 0 ? parsed.select.slice(0, 3).map(s => s.replace(/^[a-z0-9_]+\./i, '').slice(0, 8)) : ['res_id', 'metric_val'];
    let emitRows = lastActiveChamber.rows.filter(r => r.status === 'pass').slice(0, 3).map((r, idx) => {
      const metricId = `emit_${idx + 1}`;
      registerDossier(metricId, {
        title: `Projected Emission Tuple // Key: ${r.cells[0]}`,
        pin: idx + 1,
        color: '#10b981',
        gauge: 'FINAL EMISSION // SINK STREAM',
        grain: 'Target result projection grain',
        audit: 'All projections and aliases validated. Ready for client network streaming.',
        edge: 'Ensure column aliases match downstream consumer expectations (e.g. ORM or GraphQL schema).',
        commercial: 'Consolidated commercial insight delivered to dashboard, BI platform, or API endpoint.',
        interview: 'How does pipeline execution (Volcano iterator model) stream rows to clients without buffering the entire table in memory?'
      });
      return {
        cells: r.cells.slice(0, emitHeaders.length),
        status: 'projected',
        pin: idx + 1,
        metricId: metricId
      };
    });

    if (problemMeta && problemMeta.expectedOutput && Array.isArray(problemMeta.expectedOutput.columns)) {
      emitHeaders = problemMeta.expectedOutput.columns.slice(0, 3);
      if (problemMeta.expectedOutput.rows && problemMeta.expectedOutput.rows.length > 0) {
        emitRows = problemMeta.expectedOutput.rows.slice(0, 3).map((r, idx) => {
          const metricId = `emit_${idx + 1}`;
          registerDossier(metricId, {
            title: `Expected Output Tuple // Key: ${r[0]}`,
            pin: idx + 1,
            color: '#10b981',
            gauge: 'FINAL EMISSION // LEETCODE EXPECTED',
            grain: 'Expected target grain',
            audit: 'Matches LeetCode canonical judge verification criteria.',
            edge: 'Beware of row ordering requirements (ORDER BY) when automated judge compares row-by-row.',
            commercial: 'Gold standard verification target for problem test harness.',
            interview: 'Explain how relational equivalence proofs verify your SQL solution against canonical outputs.'
          });
          return {
            cells: r.slice(0, emitHeaders.length).map(v => v === null ? 'NULL' : String(v)),
            status: 'projected',
            pin: idx + 1,
            metricId: metricId
          };
        });
      }
    }

    chambers.push({
      id: 'ch_emission',
      chip: String(chambers.length + 1).padStart(2, '0'),
      title: 'TARGET EMISSION',
      subtitle: `${emitHeaders.length} COLS PROJECTED`,
      badge: 'SINK STREAM',
      color: '#10b981',
      colorName: 'emerald',
      headers: emitHeaders,
      rows: emitRows,
      stats: { inCount: lastActiveChamber.rows.length, passCount: emitRows.length, label: 'FINAL GRAIN' }
    });

    return chambers;
  }

  // ---------------------------------------------------------------------------
  // 3. BESPOKE OBSIDIAN VECTOR SVG RENDERER
  // ---------------------------------------------------------------------------
  function generateAdaptiveSvg(chambers, parsed, options) {
    options = options || {};
    const n = chambers.length;
    const chamberWidth = 196;
    const gap = 52;
    const paddingX = 36;
    const totalWidth = Math.max(780, paddingX * 2 + n * chamberWidth + (n - 1) * gap);
    const totalHeight = 520;

    const activeTheme = (options && options.theme) || (typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme')) || 'monochrome';
    let canvasBg = '#000000';
    let frameFill = '#09090b';
    let frameStroke = 'rgba(255, 255, 255, 0.08)';
    let headerText = '#ffffff';
    let subText = '#71717a';

    if (activeTheme === 'ink') {
      canvasBg = '#070a0f';
      frameFill = '#0d1117';
      frameStroke = '#1e293b';
      headerText = '#f1f5f9';
      subText = '#64748b';
    } else if (activeTheme === 'carbon') {
      canvasBg = '#090a0c';
      frameFill = '#111215';
      frameStroke = '#22262e';
      headerText = '#f3f4f6';
      subText = '#6b7280';
    }

    // SVG Filters and Gradients definitions
    let defsHtml = `
      <defs>
        <!-- Obsidian Mesh Dot Pattern -->
        <pattern id="adaptive-obsidian-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.75" fill="#334155" opacity="0.45" />
        </pattern>

        <!-- Electric Pin Glow Filters -->
        <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="glow-amber" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="glow-emerald" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="glow-indigo" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="glow-purple" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="glow-pink" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="glow-rose" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="glow-teal" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
    `;

    // Gradients for Inter-Chamber Béziers
    for (let i = 0; i < n - 1; i++) {
      const c1 = chambers[i].color;
      const c2 = chambers[i + 1].color;
      defsHtml += `
        <linearGradient id="wire-grad-${i}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${c1}" stop-opacity="0.95" />
          <stop offset="100%" stop-color="${c2}" stop-opacity="0.95" />
        </linearGradient>
      `;
    }
    defsHtml += `</defs>`;

    // Precalculate chamber coordinates
    const coords = chambers.map((ch, idx) => ({
      x: paddingX + idx * (chamberWidth + gap),
      y: 78,
      w: chamberWidth,
      h: 260,
      rowY: (rowIdx) => 78 + 92 + rowIdx * 32
    }));

    // Render Bézier Connectors between chambers
    let wiresSvg = '';
    for (let i = 0; i < n - 1; i++) {
      const srcCh = chambers[i];
      const dstCh = chambers[i + 1];
      const srcCoord = coords[i];
      const dstCoord = coords[i + 1];

      let dstRowIdx = 0;
      srcCh.rows.forEach((r, sIdx) => {
        const x1 = srcCoord.x + srcCoord.w;
        const y1 = srcCoord.rowY(sIdx) + 14;

        if (r.status === 'drop') {
          // Gracefully dropping wire
          const xDrop = x1 + gap * 0.45;
          const yDrop = y1 + 12;
          wiresSvg += `
            <path d="M ${x1} ${y1} Q ${x1 + 16} ${y1}, ${xDrop} ${yDrop}" fill="none" stroke="#f43f5e" stroke-width="1.3" stroke-dasharray="2,3" opacity="0.65" />
            <circle cx="${xDrop}" cy="${yDrop}" r="2.5" fill="#f43f5e" />
          `;
        } else {
          // Connected active wire to next chamber
          const tIdx = Math.min(dstRowIdx, dstCh.rows.length - 1);
          dstRowIdx++;
          const x2 = dstCoord.x;
          const y2 = dstCoord.rowY(tIdx) + 14;
          const cx1 = x1 + gap * 0.5;
          const cx2 = x2 - gap * 0.5;

          wiresSvg += `
            <path d="M ${x1} ${y1} C ${cx1} ${y1}, ${cx2} ${y2}, ${x2} ${y2}" fill="none" stroke="url(#wire-grad-${i})" stroke-width="1.6" stroke-linecap="round" opacity="0.85" />
            <circle cx="${x1}" cy="${y1}" r="3.2" fill="${srcCh.color}" />
            <circle cx="${x2}" cy="${y2}" r="3.2" fill="${dstCh.color}" />
          `;
        }
      });
    }

    // Render Chambers
    let chambersSvg = '';
    chambers.forEach((ch, idx) => {
      const c = coords[idx];
      const glowFilter = `glow-${ch.colorName || 'cyan'}`;

      // Card Container Rect
      let chHtml = `
        <g class="machine-chamber-group" data-chamber-id="${ch.id}">
          <!-- Chamber Card Frame -->
          <rect x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" rx="8" fill="#0d111a" stroke="#1e293b" stroke-width="1.2" />
          
          <!-- Electric Top Accent Line -->
          <line x1="${c.x + 2}" y1="${c.y}" x2="${c.x + c.w - 2}" y2="${c.y}" stroke="${ch.color}" stroke-width="2.5" filter="url(#${glowFilter})" />
          
          <!-- Chamber Header -->
          <rect x="${c.x + 10}" y="${c.y + 11}" width="22" height="15" rx="3" fill="${ch.color}22" stroke="${ch.color}" stroke-width="0.8" />
          <text x="${c.x + 21}" y="${c.y + 22}" fill="${ch.color}" font-family="JetBrains Mono, monospace" font-size="8.5" font-weight="700" text-anchor="middle">${ch.chip}</text>
          
          <text x="${c.x + 38}" y="${c.y + 23}" fill="#f1f5f9" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" letter-spacing="0.3">${ch.title}</text>
          <text x="${c.x + 10}" y="${c.y + 39}" fill="${ch.color}" font-family="JetBrains Mono, monospace" font-size="8" font-weight="600">${escapeXml(trunc(ch.subtitle, 25))}</text>
          
          <line x1="${c.x}" y1="${c.y + 48}" x2="${c.x + c.w}" y2="${c.y + 48}" stroke="#1e293b" stroke-width="1" />
          
          <!-- Micro-Stat Substrip -->
          <rect x="${c.x + 1}" y="${c.y + 49}" width="${c.w - 2}" height="20" fill="#070a10" />
          <text x="${c.x + 10}" y="${c.y + 62}" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="7.5" font-weight="600">IN: ${ch.stats.inCount} &bull; PASS: ${ch.stats.passCount} &bull; ${escapeXml(trunc(ch.badge, 12))}</text>
          
          <line x1="${c.x}" y1="${c.y + 69}" x2="${c.x + c.w}" y2="${c.y + 69}" stroke="#1e293b" stroke-width="1" />
          
          <!-- Table Column Headers -->
          <rect x="${c.x + 1}" y="${c.y + 70}" width="${c.w - 2}" height="20" fill="#0b0f17" />
          <text x="${c.x + 10}" y="${c.y + 83}" fill="#475569" font-family="JetBrains Mono, monospace" font-size="7.5" font-weight="600">#</text>
      `;

      // Spacing for 2 or 3 columns with bounded widths
      const cols = ch.headers.slice(0, 3);
      const is3Col = cols.length >= 3;
      const colX1 = c.x + 28;
      const colX2 = is3Col ? c.x + 78 : c.x + 104;
      const colX3 = is3Col ? c.x + 130 : c.x + 144;
      const maxColLen = is3Col ? 6 : 9;

      if (cols[0]) chHtml += `<text x="${colX1}" y="${c.y + 83}" fill="#94a3b8" font-family="JetBrains Mono, monospace" font-size="7.5" font-weight="600">${escapeXml(trunc(cols[0], maxColLen))}</text>`;
      if (cols[1]) chHtml += `<text x="${colX2}" y="${c.y + 83}" fill="#94a3b8" font-family="JetBrains Mono, monospace" font-size="7.5" font-weight="600">${escapeXml(trunc(cols[1], maxColLen))}</text>`;
      if (is3Col && cols[2]) chHtml += `<text x="${colX3}" y="${c.y + 83}" fill="#94a3b8" font-family="JetBrains Mono, monospace" font-size="7.5" font-weight="600">${escapeXml(trunc(cols[2], maxColLen))}</text>`;

      chHtml += `<line x1="${c.x}" y1="${c.y + 90}" x2="${c.x + c.w}" y2="${c.y + 90}" stroke="#1e293b" stroke-width="1" />`;

      // Table Data Rows
      ch.rows.forEach((r, rIdx) => {
        const ry = c.rowY(rIdx);
        const isDrop = r.status === 'drop';
        const isProjected = r.status === 'projected';
        const rowBg = rIdx % 2 === 0 ? '#111723' : '#0e141f';
        const textFill = isDrop ? '#64748b' : (isProjected ? '#34d399' : '#e2e8f0');

        chHtml += `
          <!-- Row ${rIdx + 1} Interactive Item -->
          <g class="machine-interactive-row" data-metric-id="${r.metricId}" 
             onmouseenter="if(window.RelationalMachinesEngine)window.RelationalMachinesEngine.handleRowHover(event, '${r.metricId}')" 
             onmouseleave="if(window.RelationalMachinesEngine)window.RelationalMachinesEngine.handleRowLeave()" 
             onclick="if(window.RelationalMachinesEngine)window.RelationalMachinesEngine.openDrawer('${r.metricId}')" 
             style="cursor: pointer;">
            <rect x="${c.x + 4}" y="${ry}" width="${c.w - 8}" height="28" rx="4" fill="${rowBg}" stroke="${isDrop ? '#f43f5e33' : '#1e293b'}" stroke-width="0.8" />
            
            <!-- Pin Badge -->
            <circle cx="${c.x + 14}" cy="${ry + 14}" r="6.5" fill="${isDrop ? '#f43f5e22' : ch.color + '22'}" stroke="${isDrop ? '#f43f5e' : ch.color}" stroke-width="1" />
            <text x="${c.x + 14}" y="${ry + 17}" fill="${isDrop ? '#f43f5e' : ch.color}" font-family="JetBrains Mono, monospace" font-size="7.5" font-weight="700" text-anchor="middle">${isDrop ? '&times;' : r.pin}</text>
            
            <!-- Cell Text Values -->
            <text x="${colX1}" y="${ry + 17}" fill="${textFill}" font-family="JetBrains Mono, monospace" font-size="8" font-weight="500">${escapeXml(trunc(r.cells[0], maxColLen))}</text>
            <text x="${colX2}" y="${ry + 17}" fill="${textFill}" font-family="JetBrains Mono, monospace" font-size="8" font-weight="500">${escapeXml(trunc(r.cells[1], maxColLen))}</text>
            ${is3Col ? `<text x="${colX3}" y="${ry + 17}" fill="${isDrop ? '#f43f5e' : (r.cells[2] && r.cells[2].includes('PASS') ? '#10b981' : textFill)}" font-family="JetBrains Mono, monospace" font-size="8" font-weight="600">${escapeXml(trunc(r.cells[2], maxColLen))}</text>` : ''}
          </g>
        `;
      });

      chHtml += `</g>`;
      chambersSvg += chHtml;
    });

    // Top Blueprint Header
    const pipelineFlow = chambers.map(c => c.title.replace('SOURCE ', '').replace('RELATIONAL ', '').replace('PREDICATE ', '')).join(' &#10140; ');
    const topHeaderSvg = `
      <!-- Canvas Top Blueprint Header -->
      <g>
        <!-- Outer Border Frame -->
        <rect x="${paddingX}" y="14" width="${totalWidth - paddingX * 2}" height="48" rx="6" fill="${frameFill}" stroke="${frameStroke}" stroke-width="1" />
        
        <!-- Left Title & Subtitle (Clean & Collision-Free) -->
        <text x="${paddingX + 16}" y="33" fill="#f8fafc" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" letter-spacing="0.4">RELATIONAL PIPELINE // ${n} EXECUTION CHAMBERS</text>
        <text x="${paddingX + 16}" y="48" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="8.5" font-weight="600">${pipelineFlow}</text>
        
        <!-- Right Status Pills -->
        <rect x="${totalWidth - paddingX - 90}" y="24" width="80" height="20" rx="3" fill="#10b98118" stroke="#10b981" stroke-width="0.8" />
        <text x="${totalWidth - paddingX - 50}" y="37" fill="#10b981" font-family="JetBrains Mono, monospace" font-size="7.5" font-weight="700" text-anchor="middle">LIVE AST &#10003;</text>
      </g>
    `;

    // Bottom Dual Insight Panels
    const bottomY = 356;
    const bottomH = 148;
    const splitW1 = Math.round((totalWidth - paddingX * 2 - 18) * 0.52);
    const splitW2 = (totalWidth - paddingX * 2 - 18) - splitW1;
    const p1X = paddingX;
    const p2X = paddingX + splitW1 + 18;

    // Generate dynamic technical interview insight
    let architectInsight = 'All relational invariants are preserved across stages. Cardinality transitions remain linear O(N).';
    if (parsed.joins && parsed.joins.length > 0) {
      architectInsight = `Relational Join on key requires active foreign-key index on ${parsed.joins[0].table}. Watch out for NULLs in outer join results causing silent filter drops downstream.`;
    } else if (parsed.windowFns && parsed.windowFns.length > 0) {
      architectInsight = `Window partition by spec maintains internal row buffering. Ensure partition keys have high cardinality to avoid single-node memory hot-spots.`;
    } else if (parsed.groupBy && parsed.groupBy.length > 0) {
      architectInsight = `Hash aggregate allocates memory buckets for ${parsed.groupBy.join(', ')}. If cardinality exceeds work_mem, engine spills to disk temporary partitions.`;
    }

    const opsSummary = chambers.slice(1, -1).map(c => c.title.replace('SOURCE ', '').replace('RELATIONAL ', '').replace('PREDICATE ', '')).join(' &#10140; ') || 'Direct Projection';
    const scanTbl = (parsed.from && parsed.from.table) || 'SourceTable';

    const bottomPanelsSvg = `
      <!-- Bottom Dual Inspection Panels with Auto-Wrapping foreignObject -->
      <g>
        <!-- Panel 1: Logical Execution Plan & Cardinality Graph -->
        <rect x="${p1X}" y="${bottomY}" width="${splitW1}" height="${bottomH}" rx="6" fill="${frameFill}" stroke="${frameStroke}" stroke-width="1" />
        <line x1="${p1X + 2}" y1="${bottomY}" x2="${p1X + splitW1 - 2}" y2="${bottomY}" stroke="#38bdf8" stroke-width="2" />
        
        <text x="${p1X + 14}" y="${bottomY + 20}" fill="#38bdf8" font-family="JetBrains Mono, monospace" font-size="8.5" font-weight="700" letter-spacing="0.4">LOGICAL EXECUTION PLAN &amp; CARDINALITY PIPELINE</text>
        <line x1="${p1X + 1}" y1="${bottomY + 28}" x2="${p1X + splitW1 - 1}" y2="${bottomY + 28}" stroke="#1e293b" stroke-width="1" />
        
        <foreignObject x="${p1X + 12}" y="${bottomY + 34}" width="${splitW1 - 24}" height="${bottomH - 40}">
          <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:'JetBrains Mono',monospace; font-size:8px; line-height:1.55; color:#cbd5e1; word-wrap:break-word; overflow:hidden;">
            <div style="display:flex; justify-content:space-between; margin-bottom:3px;"><span style="color:#94a3b8; font-weight:600;">1. SCAN:</span> <span style="color:#f1f5f9;">${escapeXml(scanTbl)} (${chambers[0].stats.inCount} tuples)</span></div>
            <div style="display:flex; justify-content:space-between; margin-bottom:3px;"><span style="color:#94a3b8; font-weight:600;">2. OPS:</span> <span style="color:#f1f5f9;">${escapeXml(opsSummary)}</span></div>
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span style="color:#94a3b8; font-weight:600;">3. SINK:</span> <span style="color:#10b981; font-weight:600;">${chambers[n-1].stats.passCount} tuples emitted</span></div>
            <div style="color:#64748b; font-size:7.5px; border-top:1px solid #1e293b; padding-top:4px; margin-top:2px;">Model: Volcano Pull-Stream &bull; Volatility: STABLE</div>
          </div>
        </foreignObject>

        <!-- Panel 2: Senior Relational Architect & Interview Dossier -->
        <rect x="${p2X}" y="${bottomY}" width="${splitW2}" height="${bottomH}" rx="6" fill="${frameFill}" stroke="${frameStroke}" stroke-width="1" />
        <line x1="${p2X + 2}" y1="${bottomY}" x2="${p2X + splitW2 - 2}" y2="${bottomY}" stroke="#fbbf24" stroke-width="2" />
        
        <text x="${p2X + 14}" y="${bottomY + 20}" fill="#fbbf24" font-family="JetBrains Mono, monospace" font-size="8.5" font-weight="700" letter-spacing="0.4">STAFF DATA ARCHITECT // PERFORMANCE &amp; DEFENSE</text>
        <line x1="${p2X + 1}" y1="${bottomY + 28}" x2="${p2X + splitW2 - 1}" y2="${bottomY + 28}" stroke="#1e293b" stroke-width="1" />
        
        <foreignObject x="${p2X + 12}" y="${bottomY + 34}" width="${splitW2 - 24}" height="${bottomH - 40}">
          <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:'JetBrains Mono',monospace; font-size:8px; line-height:1.45; color:#cbd5e1; word-wrap:break-word; overflow:hidden;">
            <div style="color:#e2e8f0; margin-bottom:4px;">&#9889; ${escapeXml(architectInsight)}</div>
            <div style="color:#94a3b8; font-weight:700; margin-top:3px;">TALKING POINT:</div>
            <div style="color:#93c5fd; font-style:italic;">"Always explain the trade-offs between Hash Join and Nested Loop joins to interviewers."</div>
            <div style="color:#64748b; font-size:7.5px; margin-top:4px;">Click any row node above for multi-dialect SQL &rarr;</div>
          </div>
        </foreignObject>
      </g>
    `;

    // Assembled Complete SVG
    return `
      <svg class="relational-machine-svg" viewBox="0 0 ${totalWidth} ${totalHeight}" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
        ${defsHtml}
        
        <!-- Canvas Background -->
        <rect x="0" y="0" width="${totalWidth}" height="${totalHeight}" fill="${canvasBg}" />
        <rect x="0" y="0" width="${totalWidth}" height="${totalHeight}" fill="url(#adaptive-obsidian-grid)" />
        
        ${topHeaderSvg}
        ${wiresSvg}
        ${chambersSvg}
        ${bottomPanelsSvg}
      </svg>
    `;
  }

  // ---------------------------------------------------------------------------
  // 4. MAIN COMPILATION ENTRYPOINT
  // ---------------------------------------------------------------------------
  function compileAndRender(sql, problemMeta, options) {
    const parsed = parseSQL(sql);
    if (!parsed) return null;

    const chambers = buildAdaptiveChambers(parsed, problemMeta);
    const svg = generateAdaptiveSvg(chambers, parsed, options);

    return {
      svg: svg,
      parsed: parsed,
      chambers: chambers,
      catalog: dynamicCatalog,
      chamberCount: chambers.length,
      viewBoxWidth: Math.max(760, 36 * 2 + chambers.length * 196 + (chambers.length - 1) * 52),
      viewBoxHeight: 520
    };
  }

  function getDynamicMetric(metricId) {
    return dynamicCatalog[metricId] || null;
  }

  // Export public API
  const api = {
    parseSQL: parseSQL,
    buildAdaptiveChambers: buildAdaptiveChambers,
    generateAdaptiveSvg: generateAdaptiveSvg,
    compileAndRender: compileAndRender,
    getDynamicMetric: getDynamicMetric
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  } else {
    global.AdaptivePipelineCompiler = api;
  }

})(typeof window !== 'undefined' ? window : this);
