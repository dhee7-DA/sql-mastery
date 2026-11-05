// =============================================================================
// INTERACTIVE GUIDED DRILLS ENGINE (CLAUSE SCRAMBLER, STEP BUILDER & TRAP BUSTER)
// =============================================================================

(function() {
  'use strict';

  // ---------------------------------------------------------------------------
  // 1. DATA: CLAUSE ORDER SCRAMBLER SCENARIOS
  // ---------------------------------------------------------------------------
  const SCRAMBLER_SCENARIOS = [
    {
      id: 'scrambler_std',
      name: 'Standard Aggregate Lifecycle',
      description: 'The canonical 7-stage query lifecycle with grouping and thresholds.',
      correctOrder: ['FROM', 'WHERE', 'GROUP BY', 'HAVING', 'SELECT', 'ORDER BY', 'LIMIT'],
      explanations: {
        'FROM': 'Stage 1: Allocates working memory table and binds table metadata from disk.',
        'WHERE': 'Stage 2: Filters raw tuples row-by-row before any grouping or math occurs.',
        'GROUP BY': 'Stage 3: Buckets surviving rows into discrete partition groups.',
        'HAVING': 'Stage 4: Filters aggregated groups based on summary functions (e.g. COUNT, SUM).',
        'SELECT': 'Stage 5: Computes expressions, evaluates column aliases, and projects final fields.',
        'ORDER BY': 'Stage 6: Sorts the projected result set using temporary sort buffer.',
        'LIMIT': 'Stage 7: Truncates output stream to top N tuples right before client transmission.'
      }
    },
    {
      id: 'scrambler_window',
      name: 'Analytical Window Lifecycle',
      description: 'Physical lifecycle when window functions and DISTINCT are present.',
      correctOrder: ['FROM', 'WHERE', 'GROUP BY', 'HAVING', 'SELECT', 'DISTINCT', 'ORDER BY', 'LIMIT'],
      explanations: {
        'FROM': 'Stage 1: Ingests base relation into engine RAM.',
        'WHERE': 'Stage 2: Discards non-qualifying tuples early.',
        'GROUP BY': 'Stage 3: Assembles group buckets for standard aggregates.',
        'HAVING': 'Stage 4: Prunes aggregate buckets.',
        'SELECT': 'Stage 5: Computes OVER () analytical partitions across surviving rows.',
        'DISTINCT': 'Stage 6: Deduplicates output rows if DISTINCT keyword was specified.',
        'ORDER BY': 'Stage 7: Sorts final projected tuples.',
        'LIMIT': 'Stage 8: Clips result set to row limit.'
      }
    },
    {
      id: 'scrambler_join',
      name: 'Relational Multi-Table Join Lifecycle',
      description: 'Physical lifecycle when joining tables with predicates.',
      correctOrder: ['FROM', 'ON', 'JOIN', 'WHERE', 'SELECT', 'ORDER BY', 'LIMIT'],
      explanations: {
        'FROM': 'Stage 1: Identifies left primary table.',
        'ON': 'Stage 2: Evaluates cross-table join condition (hash/merge/nested loop).',
        'JOIN': 'Stage 3: Synthesizes combined virtual Cartesian / matching rows.',
        'WHERE': 'Stage 4: Filters combined joined records.',
        'SELECT': 'Stage 5: Projects requested columns across both tables.',
        'ORDER BY': 'Stage 6: Sorts final combined stream.',
        'LIMIT': 'Stage 7: Slices top N records.'
      }
    }
  ];

  // ---------------------------------------------------------------------------
  // 2. DATA: CLAUSE-BY-CLAUSE STEP BUILDER (LIVE TUPLE TRANSFORMER)
  // ---------------------------------------------------------------------------
  const STEP_BUILDER_CHALLENGES = [
    {
      id: 'builder_eng_lead',
      title: 'Target: Find Departments with >= 2 High-Earners (Salary >= 80k)',
      description: 'Assemble the query clause-by-clause and observe how surviving tuples transform at each physical stage.',
      targetSql: `SELECT department, COUNT(*) AS count_high_earners, AVG(salary) AS avg_salary\nFROM Employees\nWHERE salary >= 80000\nGROUP BY department\nHAVING COUNT(*) >= 2\nORDER BY avg_salary DESC\nLIMIT 1;`,
      initialRows: [
        { emp_id: 101, name: 'Alice Smith', department: 'Engineering', salary: 95000 },
        { emp_id: 102, name: 'Bob Jones', department: 'Marketing', salary: 62000 },
        { emp_id: 103, name: 'Charlie Brown', department: 'Engineering', salary: 82000 },
        { emp_id: 104, name: 'Diana Prince', department: 'Sales', salary: 74000 },
        { emp_id: 105, name: 'Evan Wright', department: 'Engineering', salary: 95000 },
        { emp_id: 106, name: 'Fiona Gallagher', department: 'Sales', salary: 58000 },
        { emp_id: 107, name: 'George Clark', department: 'Marketing', salary: 68000 },
        { emp_id: 108, name: 'Hannah Abbott', department: 'Finance', salary: 89000 }
      ],
      stages: [
        {
          clause: 'FROM Employees',
          keyword: 'FROM',
          desc: 'Loads all 8 employee records from disk into engine RAM buffer.',
          sqlChunk: 'SELECT *\nFROM Employees;',
          transform: (rows) => rows.map(r => ({ ...r, _status: 'loaded', _label: 'IN RAM BUFFER' }))
        },
        {
          clause: 'WHERE salary >= 80000',
          keyword: 'WHERE',
          desc: 'Evaluates predicate: 4 employees pass (>= 80k), 4 are dropped.',
          sqlChunk: 'SELECT *\nFROM Employees\nWHERE salary >= 80000;',
          transform: (rows) => rows.map(r => {
            const passes = r.salary >= 80000;
            return {
              ...r,
              _status: passes ? 'passed' : 'rejected',
              _label: passes ? 'SURVIVED (>= 80k)' : `DROPPED ($${r.salary.toLocaleString()})`
            };
          })
        },
        {
          clause: 'GROUP BY department',
          keyword: 'GROUP BY',
          desc: 'Collapses the 4 surviving rows into 2 department buckets: Engineering (3) and Finance (1).',
          sqlChunk: 'SELECT department, COUNT(*), AVG(salary)\nFROM Employees\nWHERE salary >= 80000\nGROUP BY department;',
          transform: () => [
            { department: 'Engineering', high_earners: 3, avg_salary: '$90,667', _status: 'passed', _label: 'BUCKET: 3 EMPS' },
            { department: 'Finance', high_earners: 1, avg_salary: '$89,000', _status: 'passed', _label: 'BUCKET: 1 EMP' }
          ]
        },
        {
          clause: 'HAVING COUNT(*) >= 2',
          keyword: 'HAVING',
          desc: 'Filters aggregated groups: Finance has only 1 employee >= 80k and is eliminated! Only Engineering survives.',
          sqlChunk: 'SELECT department, COUNT(*), AVG(salary)\nFROM Employees\nWHERE salary >= 80000\nGROUP BY department\nHAVING COUNT(*) >= 2;',
          transform: () => [
            { department: 'Engineering', high_earners: 3, avg_salary: '$90,667', _status: 'passed', _label: 'QUALIFIED (COUNT=3 >= 2)' },
            { department: 'Finance', high_earners: 1, avg_salary: '$89,000', _status: 'rejected', _label: 'PRUNED (COUNT=1 < 2)' }
          ]
        },
        {
          clause: 'SELECT department, COUNT(*), AVG(salary)',
          keyword: 'SELECT',
          desc: 'Projects final requested column aliases and formats calculated numbers.',
          sqlChunk: 'SELECT department, COUNT(*) AS count_high_earners, AVG(salary) AS avg_salary\nFROM Employees\nWHERE salary >= 80000\nGROUP BY department\nHAVING COUNT(*) >= 2;',
          transform: () => [
            { department: 'Engineering', count_high_earners: 3, avg_salary: '$90,667', _status: 'passed', _label: 'FINAL PROJECTION' }
          ]
        },
        {
          clause: 'ORDER BY avg_salary DESC',
          keyword: 'ORDER BY',
          desc: 'Sorts remaining groups by computed average salary descending.',
          sqlChunk: 'SELECT department, COUNT(*) AS count_high_earners, AVG(salary) AS avg_salary\nFROM Employees\nWHERE salary >= 80000\nGROUP BY department\nHAVING COUNT(*) >= 2\nORDER BY avg_salary DESC;',
          transform: () => [
            { department: 'Engineering', count_high_earners: 3, avg_salary: '$90,667', _status: 'passed', _label: 'RANK #1 (SORTED)' }
          ]
        },
        {
          clause: 'LIMIT 1',
          keyword: 'LIMIT',
          desc: 'Transmits final winning row to client.',
          sqlChunk: 'SELECT department, COUNT(*) AS count_high_earners, AVG(salary) AS avg_salary\nFROM Employees\nWHERE salary >= 80000\nGROUP BY department\nHAVING COUNT(*) >= 2\nORDER BY avg_salary DESC\nLIMIT 1;',
          transform: () => [
            { department: 'Engineering', count_high_earners: 3, avg_salary: '$90,667', _status: 'passed', _label: 'EMITTED TO CLIENT' }
          ]
        }
      ]
    }
  ];

  // ---------------------------------------------------------------------------
  // 3. DATA: SQL TRAP BUSTER / FAULT-FINDER
  // ---------------------------------------------------------------------------
  const TRAP_BUSTER_SCENARIOS = [
    {
      id: 'trap_null_eq',
      title: 'Trap 01: Equality Comparison with NULL',
      severity: 'LOGIC CRASH',
      concept: 'Three-Valued Logic: NULL is never equal to NULL',
      brokenSql: `SELECT emp_id, name, bonus\nFROM Employees\nWHERE bonus = NULL;`,
      fixedSql: `SELECT emp_id, name, bonus\nFROM Employees\nWHERE bonus IS NULL;`,
      brokenClause: 'WHERE bonus = NULL',
      explanation: 'In ANSI SQL, NULL represents an UNKNOWN state. Comparing anything with NULL using `=` (e.g. `bonus = NULL`) evaluates to UNKNOWN, which the WHERE clause treats as FALSE. The query returns 0 rows silently without an error!',
      patchReason: 'Replaced `=` with `IS NULL` to perform boolean identity check instead of scalar value comparison.'
    },
    {
      id: 'trap_alias_where',
      title: 'Trap 02: Using Column Alias in WHERE Clause',
      severity: 'SYNTAX ERROR',
      concept: 'Physical Lifecycle Order: WHERE executes BEFORE SELECT',
      brokenSql: `SELECT emp_id, name, salary * 0.15 AS annual_bonus\nFROM Employees\nWHERE annual_bonus > 10000;`,
      fixedSql: `SELECT emp_id, name, salary * 0.15 AS annual_bonus\nFROM Employees\nWHERE (salary * 0.15) > 10000;`,
      brokenClause: 'WHERE annual_bonus > 10000',
      explanation: 'At Stage 2 (WHERE), the engine is filtering raw rows from disk. The column alias `annual_bonus` is defined at Stage 5 (SELECT). The compiler halts immediately with: "Column \'annual_bonus\' does not exist".',
      patchReason: 'Repeated the underlying calculation `(salary * 0.15)` inside the WHERE clause, or wrap in a CTE.'
    },
    {
      id: 'trap_window_where',
      title: 'Trap 03: Filtering Window Functions in WHERE',
      severity: 'SYNTAX ERROR',
      concept: 'Window Calculation Happens in SELECT, After WHERE',
      brokenSql: `SELECT emp_id, name, department, salary,\n       ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk\nFROM Employees\nWHERE ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) = 1;`,
      fixedSql: `WITH RankedEmployees AS (\n  SELECT emp_id, name, department, salary,\n         ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk\n  FROM Employees\n)\nSELECT * FROM RankedEmployees WHERE rnk = 1;`,
      brokenClause: 'WHERE ROW_NUMBER() ... = 1',
      explanation: 'Window functions can ONLY be evaluated after WHERE and GROUP BY have already completed. Putting an OVER() clause in WHERE produces: "Window functions are not allowed in WHERE".',
      patchReason: 'Encapsulated the window calculation inside a Common Table Expression (CTE) and filtered the resulting rank column.'
    },
    {
      id: 'trap_nonsargable_func',
      title: 'Trap 04: Non-SARGable Function Call on Indexed Date',
      severity: 'PERF COLLAPSE',
      concept: 'Function wrapping defeats B+ Tree Index Seek',
      brokenSql: `SELECT order_id, customer_id, total_amount\nFROM OrdersStorage\nWHERE SUBSTR(order_date, 1, 4) = '2024';`,
      fixedSql: `SELECT order_id, customer_id, total_amount\nFROM OrdersStorage\nWHERE order_date >= '2024-01-01' AND order_date < '2025-01-01';`,
      brokenClause: 'WHERE SUBSTR(order_date, 1, 4) = \'2024\'',
      explanation: 'Applying SUBSTR() forces the database engine to evaluate the string function on every single row in the table, destroying index seek capabilities and causing a full table scan.',
      patchReason: 'Rewrote the query as a contiguous range predicate: `order_date >= ... AND order_date < ...`, restoring an $O(\\log N)$ B+ Tree seek.'
    },
    {
      id: 'trap_not_in_null',
      title: 'Trap 05: The NOT IN (NULL) Catastrophe',
      severity: 'SILENT DATA LOSS',
      concept: 'NOT IN fails completely if candidate subquery contains NULL',
      brokenSql: `SELECT emp_id, name\nFROM OrgHierarchy\nWHERE emp_id NOT IN (\n  SELECT manager_id FROM OrgHierarchy\n);`,
      fixedSql: `SELECT e.emp_id, e.name\nFROM OrgHierarchy AS e\nWHERE NOT EXISTS (\n  SELECT 1 FROM OrgHierarchy AS m WHERE m.manager_id = e.emp_id\n);`,
      brokenClause: 'WHERE emp_id NOT IN (...)',
      explanation: 'If `manager_id` contains even a single NULL (e.g. the CEO has no manager), `emp_id NOT IN (...)` expands to `e != 101 AND e != NULL`. Since `e != NULL` is UNKNOWN, the entire condition evaluates to FALSE for every row, returning 0 rows total!',
      patchReason: 'Replaced `NOT IN` with `NOT EXISTS`, which relies on row existence testing and is completely immune to NULL poisoning.'
    },
    {
      id: 'trap_last_val_frame',
      title: 'Trap 06: LAST_VALUE Default Frame Trap',
      severity: 'LOGIC ERROR',
      concept: 'ANSI Default Frame stops at CURRENT ROW',
      brokenSql: `SELECT name, department, salary,\n       LAST_VALUE(salary) OVER (\n         PARTITION BY department ORDER BY salary DESC\n       ) AS lowest_in_dept\nFROM Employees;`,
      fixedSql: `SELECT name, department, salary,\n       LAST_VALUE(salary) OVER (\n         PARTITION BY department ORDER BY salary DESC\n         RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS lowest_in_dept\nFROM Employees;`,
      brokenClause: 'LAST_VALUE(...) OVER (PARTITION BY ... ORDER BY ...)',
      explanation: 'Because ORDER BY was specified without explicit frame bounds, SQL silently applies: `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`. Consequently, LAST_VALUE() stops at the current row, returning the employee\'s OWN salary instead of the department minimum!',
      patchReason: 'Explicitly extended the window frame to `UNBOUNDED FOLLOWING` to reveal the true partition terminus.'
    }
  ];

  // ---------------------------------------------------------------------------
  // STATE MANAGEMENT
  // ---------------------------------------------------------------------------
  let currentScramblerScenarioIdx = 0;
  let scramblerUserPicks = [];
  let scramblerStreak = 0;
  let scramblerBestStreak = 0;

  let currentBuilderStageIdx = 0;

  let currentTrapIdx = 0;
  let trapIsFixed = false;

  // ---------------------------------------------------------------------------
  // EXPOSED RENDERERS
  // ---------------------------------------------------------------------------
  window.GuidedDrillsEngine = {
    init: function() {
      this.renderScrambler();
      this.renderStepBuilder();
      this.renderTrapBuster();
    },

    // -------------------------------------------------------------------------
    // DRILL 1: CLAUSE SCRAMBLER
    // -------------------------------------------------------------------------
    renderScrambler: function() {
      const container = document.getElementById('drillScramblerContainer');
      if (!container) return;

      const scenario = SCRAMBLER_SCENARIOS[currentScramblerScenarioIdx];
      // Available choices = correct order minus what user already picked, shuffled
      const remainingTokens = scenario.correctOrder.filter(t => !scramblerUserPicks.includes(t));
      // Deterministic pseudo-shuffle for remaining
      const shuffled = [...remainingTokens].sort((a, b) => a.localeCompare(b));

      const isComplete = scramblerUserPicks.length === scenario.correctOrder.length;

      let slotsHtml = '';
      scenario.correctOrder.forEach((targetClause, idx) => {
        const picked = scramblerUserPicks[idx];
        const isFilled = !!picked;
        slotsHtml += `
          <div class="scrambler-slot ${isFilled ? 'filled' : ''}">
            <span class="slot-number">STAGE 0${idx + 1}</span>
            <div class="slot-token ${isFilled ? 'active' : 'empty'}">
              ${isFilled ? picked : '<span class="slot-placeholder">Drop Clause</span>'}
            </div>
          </div>
        `;
      });

      let choicesHtml = '';
      if (!isComplete) {
        choicesHtml = `
          <div class="scrambler-choices-grid">
            ${shuffled.map(token => `
              <button class="scrambler-choice-chip" onclick="window.GuidedDrillsEngine.pickScramblerToken('${token}')">
                <span class="chip-dot"></span>
                <span>${token}</span>
              </button>
            `).join('')}
          </div>
        `;
      } else {
        choicesHtml = `
          <div class="scrambler-success-banner">
            <div style="font-weight: 700; color: #10b981; font-size: 13px; margin-bottom: 4px;">
              &check; PHYSICAL LIFECYCLE PERFECTLY CONSTRUCTED!
            </div>
            <p style="font-size: 11.5px; color: #a1a1aa; margin: 0 0 10px 0;">
              You verified the exact order of physical database engine execution: ${scenario.correctOrder.join(' &rarr; ')}.
            </p>
            <button class="btn-solve-in-studio" onclick="window.GuidedDrillsEngine.nextScramblerScenario()">
              Next Scenario &rarr;
            </button>
          </div>
        `;
      }

      container.innerHTML = `
        <div class="drill-card-header">
          <div>
            <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
              <span class="status-pill" style="background: rgba(16, 185, 129, 0.15); color: #10b981; border-color: rgba(16, 185, 129, 0.3);">
                DRILL 01: CLAUSE SCRAMBLER
              </span>
              <span style="font-family: var(--font-mono); font-size: 10px; color: var(--text-muted);">
                Streak: <strong style="color: #ffffff;">${scramblerStreak}</strong> | Best: ${scramblerBestStreak}
              </span>
            </div>
            <h3 style="font-size: 14px; font-weight: 700; color: #ffffff; margin: 0;">
              ${scenario.name}
            </h3>
            <p style="font-size: 11.5px; color: var(--text-muted); margin: 3px 0 0 0;">
              ${scenario.description} Click clauses in the exact order the database engine executes them physically.
            </p>
          </div>
          <button class="card-nav-btn" onclick="window.GuidedDrillsEngine.resetScrambler()" style="font-size: 11px;">
            Reset Sequence
          </button>
        </div>

        <div class="scrambler-slots-row">
          ${slotsHtml}
        </div>

        ${choicesHtml}

        <div id="scramblerFeedbackBox" class="scrambler-feedback-box" style="display: ${scramblerUserPicks.length > 0 ? 'block' : 'none'};">
          ${scramblerUserPicks.length > 0 ? `
            <span style="font-weight: 700; color: #10b981;">Last Stage Placed (${scramblerUserPicks[scramblerUserPicks.length - 1]}):</span>
            ${scenario.explanations[scramblerUserPicks[scramblerUserPicks.length - 1]] || ''}
          ` : ''}
        </div>
      `;
    },

    pickScramblerToken: function(token) {
      const scenario = SCRAMBLER_SCENARIOS[currentScramblerScenarioIdx];
      const nextExpectedIdx = scramblerUserPicks.length;
      const expectedToken = scenario.correctOrder[nextExpectedIdx];

      if (token === expectedToken) {
        if (window.soundFX) window.soundFX.playPop();
        scramblerUserPicks.push(token);
        if (scramblerUserPicks.length === scenario.correctOrder.length) {
          scramblerStreak++;
          if (scramblerStreak > scramblerBestStreak) scramblerBestStreak = scramblerStreak;
          if (window.soundFX) window.soundFX.playSuccess();
        }
        this.renderScrambler();
      } else {
        if (window.soundFX) window.soundFX.playError();
        scramblerStreak = 0;
        const feedback = document.getElementById('scramblerFeedbackBox');
        if (feedback) {
          feedback.style.display = 'block';
          feedback.innerHTML = `
            <span style="color: #ef4444; font-weight: 700;">&cross; INCORRECT CLAUSE ORDER:</span>
            Cannot execute <strong>${token}</strong> at Stage 0${nextExpectedIdx + 1}! The database engine requires <strong>${expectedToken}</strong> here because: ${scenario.explanations[expectedToken] || ''}
          `;
        }
      }
    },

    resetScrambler: function() {
      scramblerUserPicks = [];
      this.renderScrambler();
    },

    nextScramblerScenario: function() {
      currentScramblerScenarioIdx = (currentScramblerScenarioIdx + 1) % SCRAMBLER_SCENARIOS.length;
      scramblerUserPicks = [];
      this.renderScrambler();
    },

    // -------------------------------------------------------------------------
    // DRILL 2: STEP BUILDER & TUPLE TRANSFORMER
    // -------------------------------------------------------------------------
    renderStepBuilder: function() {
      const container = document.getElementById('drillStepBuilderContainer');
      if (!container) return;

      const challenge = STEP_BUILDER_CHALLENGES[0];
      const currentStage = challenge.stages[currentBuilderStageIdx];
      const transformedRows = currentStage.transform(challenge.initialRows);

      const displayCols = Object.keys(transformedRows[0] || {}).filter(k => !k.startsWith('_'));

      let stepperHtml = `
        <div class="builder-stepper-row">
          ${challenge.stages.map((stg, idx) => {
            const isActive = idx === currentBuilderStageIdx;
            const isCompleted = idx < currentBuilderStageIdx;
            return `
              <button class="builder-stage-chip ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" onclick="window.GuidedDrillsEngine.setBuilderStage(${idx})">
                <span class="clause-pill pill-${stg.keyword.toLowerCase().replace(/[^a-z]/g, '')}" style="margin: 0; padding: 1px 4px; font-size: 8.5px;">${stg.keyword}</span>
                <span>${idx + 1}. ${stg.keyword}</span>
              </button>
            `;
          }).join('')}
        </div>
      `;

      let tableHtml = `
        <div class="guided-table-wrap" style="margin-top: 10px;">
          <table>
            <thead>
              <tr>
                ${displayCols.map(c => `<th>${c}</th>`).join('')}
                <th style="width: 170px;">MEMORY ENGINE STATUS</th>
              </tr>
            </thead>
            <tbody>
              ${transformedRows.map(r => {
                const isRej = r._status === 'rejected';
                const isPass = r._status === 'passed';
                const trClass = isRej ? 'row-rejected-dim' : (isPass ? 'row-passed-highlight' : '');
                let badgeClass = 'tag-badge';
                if (isPass) badgeClass = 'badge-active-pass';
                if (isRej) badgeClass = 'badge-active-drop';
                return `
                  <tr class="${trClass}">
                    ${displayCols.map(c => `<td>${r[c] !== undefined ? r[c] : 'NULL'}</td>`).join('')}
                    <td>
                      <span class="guided-row-badge ${badgeClass}">${r._label || 'ACTIVE'}</span>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      `;

      container.innerHTML = `
        <div class="drill-card-header">
          <div>
            <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
              <span class="status-pill" style="background: rgba(59, 130, 246, 0.15); color: #3b82f6; border-color: rgba(59, 130, 246, 0.3);">
                DRILL 02: TUPLE TRANSFORMER
              </span>
              <span style="font-family: var(--font-mono); font-size: 10px; color: var(--text-muted);">
                Stage ${currentBuilderStageIdx + 1} of ${challenge.stages.length}
              </span>
            </div>
            <h3 style="font-size: 14px; font-weight: 700; color: #ffffff; margin: 0;">
              ${challenge.title}
            </h3>
            <p style="font-size: 11.5px; color: var(--text-muted); margin: 3px 0 0 0;">
              ${challenge.description}
            </p>
          </div>
        </div>

        ${stepperHtml}

        <div class="builder-stage-details">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-family: var(--font-mono); font-size: 11px; font-weight: 700; color: #ffffff;">
              Active Clause: <span style="color: #10b981;">${currentStage.clause}</span>
            </span>
            <span style="font-family: var(--font-mono); font-size: 10px; color: var(--text-muted);">
              Surviving Records: <strong>${transformedRows.filter(r => r._status !== 'rejected').length}</strong>
            </span>
          </div>
          <p style="font-size: 11px; color: #a1a1aa; margin: 0 0 8px 0;">
            ${currentStage.desc}
          </p>
          <div class="guided-code-box" style="margin: 0; padding: 6px 10px;">
            <code style="font-size: 10.5px;">${currentStage.sqlChunk}</code>
          </div>
        </div>

        ${tableHtml}

        <div style="display: flex; justify-content: space-between; margin-top: 12px;">
          <button class="card-nav-btn" ${currentBuilderStageIdx === 0 ? 'disabled' : ''} onclick="window.GuidedDrillsEngine.setBuilderStage(${currentBuilderStageIdx - 1})">
            &larr; Previous Stage
          </button>
          <button class="btn-solve-in-studio" ${currentBuilderStageIdx === challenge.stages.length - 1 ? 'disabled' : ''} onclick="window.GuidedDrillsEngine.setBuilderStage(${currentBuilderStageIdx + 1})">
            ${currentBuilderStageIdx === challenge.stages.length - 1 ? 'Goal Completed &check;' : 'Next Stage &rarr;'}
          </button>
        </div>
      `;
    },

    setBuilderStage: function(idx) {
      if (window.soundFX) window.soundFX.playPop();
      currentBuilderStageIdx = idx;
      this.renderStepBuilder();
    },

    // -------------------------------------------------------------------------
    // DRILL 3: SQL TRAP BUSTER
    // -------------------------------------------------------------------------
    renderTrapBuster: function() {
      const container = document.getElementById('drillTrapBusterContainer');
      if (!container) return;

      const trap = TRAP_BUSTER_SCENARIOS[currentTrapIdx];

      container.innerHTML = `
        <div class="drill-card-header">
          <div>
            <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
              <span class="status-pill" style="background: rgba(239, 68, 68, 0.15); color: #ef4444; border-color: rgba(239, 68, 68, 0.3);">
                DRILL 03: SQL TRAP BUSTER
              </span>
              <span class="status-pill" style="border-color: #ef4444; color: #ef4444;">
                ${trap.severity}
              </span>
              <span style="font-family: var(--font-mono); font-size: 10px; color: var(--text-muted);">
                Trap ${currentTrapIdx + 1} of ${TRAP_BUSTER_SCENARIOS.length}
              </span>
            </div>
            <h3 style="font-size: 14px; font-weight: 700; color: #ffffff; margin: 0;">
              ${trap.title}
            </h3>
            <p style="font-size: 11.5px; color: var(--text-muted); margin: 3px 0 0 0;">
              ${trap.concept}
            </p>
          </div>
          <div style="display: flex; gap: 6px;">
            <button class="card-nav-btn" onclick="window.GuidedDrillsEngine.prevTrap()">
              &larr; Prev
            </button>
            <button class="card-nav-btn" onclick="window.GuidedDrillsEngine.nextTrap()">
              Next &rarr;
            </button>
          </div>
        </div>

        <div class="trap-comparison-grid">
          <!-- Broken Query Box -->
          <div class="trap-code-column ${trapIsFixed ? 'dimmed' : 'active-broken'}">
            <div class="trap-column-header" style="color: #ef4444;">
              <span>&cross; DEFECTIVE QUERY (Production Trap)</span>
            </div>
            <div class="guided-code-box" style="margin: 0; min-height: 90px;">
              <code style="color: #fca5a5;">${trap.brokenSql}</code>
            </div>
            <div class="trap-fault-tag">
              Broken Clause: <strong>${trap.brokenClause}</strong>
            </div>
          </div>

          <!-- Fixed Query Box -->
          <div class="trap-code-column ${trapIsFixed ? 'active-fixed' : 'pending'}">
            <div class="trap-column-header" style="color: ${trapIsFixed ? '#10b981' : '#71717a'};">
              <span>${trapIsFixed ? '&check; CORRECTED ENTERPRISE CODE' : 'REPAIRED SQL (Click 1-Click Patch)'}</span>
            </div>
            <div class="guided-code-box" style="margin: 0; min-height: 90px;">
              <code style="color: ${trapIsFixed ? '#6ee7b7' : '#71717a'};">${trapIsFixed ? trap.fixedSql : '-- Waiting for 1-Click Fix --'}</code>
            </div>
            <div class="trap-fault-tag" style="border-color: ${trapIsFixed ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.1)'};">
              ${trapIsFixed ? trap.patchReason : 'Pending patch application'}
            </div>
          </div>
        </div>

        <div class="trap-explanation-panel">
          <h4 style="font-size: 12px; font-weight: 700; color: #ffffff; margin: 0 0 4px 0;">
            Physical Engine Root Cause Analysis:
          </h4>
          <p style="font-size: 11.5px; color: #a1a1aa; margin: 0 0 10px 0;">
            ${trap.explanation}
          </p>

          <div style="display: flex; gap: 10px; align-items: center;">
            <button class="btn-solve-in-studio" onclick="window.GuidedDrillsEngine.applyTrapFix()">
              ${trapIsFixed ? '&check; Patch Applied (Re-Run)' : '⚡ Apply 1-Click Patch &amp; Verify'}
            </button>
            ${trapIsFixed ? `
              <span style="font-family: var(--font-mono); font-size: 11px; color: #10b981;">
                &check; Relational invariants satisfied! Safe to ship to prod.
              </span>
            ` : ''}
          </div>
        </div>
      `;
    },

    applyTrapFix: function() {
      if (window.soundFX) window.soundFX.playSuccess();
      trapIsFixed = true;
      this.renderTrapBuster();
    },

    nextTrap: function() {
      currentTrapIdx = (currentTrapIdx + 1) % TRAP_BUSTER_SCENARIOS.length;
      trapIsFixed = false;
      this.renderTrapBuster();
    },

    prevTrap: function() {
      currentTrapIdx = (currentTrapIdx - 1 + TRAP_BUSTER_SCENARIOS.length) % TRAP_BUSTER_SCENARIOS.length;
      trapIsFixed = false;
      this.renderTrapBuster();
    }
  };

})();
