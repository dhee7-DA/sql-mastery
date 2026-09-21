// =============================================================================
// SQL FOUNDRY — INTERACTIVE VENN & EULER DIAGRAM MATRIX
// Dynamic Live-Row Relational Set Physics for Joins, Anti-Joins & Set Operations
// =============================================================================

(function () {
  'use strict';

  // --- DATASETS ---
  const DATASETS = {
    joins: {
      leftTable: {
        name: 'Employees',
        alias: 'e',
        key: 'dept_id',
        columns: ['emp_id', 'name', 'dept_id', 'salary'],
        rows: [
          { emp_id: 1, name: 'Alice Chen', dept_id: 10, salary: '$95,000' },
          { emp_id: 2, name: 'Bob Smith', dept_id: 20, salary: '$78,000' },
          { emp_id: 3, name: 'Charlie Kim', dept_id: 10, salary: '$110,000' },
          { emp_id: 4, name: 'Diana Ross', dept_id: 30, salary: '$82,000' },
          { emp_id: 5, name: 'Evan Vance', dept_id: null, salary: '$65,000' } // Orphan employee (dept_id IS NULL)
        ]
      },
      rightTable: {
        name: 'Departments',
        alias: 'd',
        key: 'dept_id',
        columns: ['dept_id', 'dept_name', 'location'],
        rows: [
          { dept_id: 10, dept_name: 'Engineering', location: 'San Francisco' },
          { dept_id: 20, dept_name: 'Marketing', location: 'New York' },
          { dept_id: 30, dept_name: 'Sales', location: 'Austin' },
          { dept_id: 40, dept_name: 'Research', location: 'Boston' } // Orphan department (no matching employees)
        ]
      },
      operations: [
        {
          id: 'inner_join',
          name: 'INNER JOIN',
          symbol: 'A ∩ B',
          tag: 'Intersection',
          activeZones: ['overlap'],
          sql: `SELECT e.emp_id, e.name, d.dept_name, d.location\nFROM Employees AS e\nINNER JOIN Departments AS d\n  ON e.dept_id = d.dept_id;`,
          tagline: 'Matches only where keys exist on BOTH sides',
          explanation: 'Only rows with a valid relational match across both tables survive. Unmatched rows (Evan with NULL dept, and Research with 0 employees) are silently dropped.',
          gotcha: 'NULL never matches NULL in SQL! If dept_id is NULL on both tables, INNER JOIN drops them because NULL = NULL yields UNKNOWN, not TRUE.',
          outputGenerator: (eRows, dRows) => {
            const out = [];
            eRows.forEach(e => {
              if (e.dept_id !== null) {
                const match = dRows.find(d => d.dept_id === e.dept_id);
                if (match) {
                  out.push({
                    status: 'matched',
                    emp_id: e.emp_id,
                    name: e.name,
                    dept_id: e.dept_id,
                    dept_name: match.dept_name,
                    location: match.location
                  });
                }
              }
            });
            return out;
          }
        },
        {
          id: 'left_join',
          name: 'LEFT JOIN',
          symbol: 'A + (A ∩ B)',
          tag: 'Preserve Left',
          activeZones: ['left', 'overlap'],
          sql: `SELECT e.emp_id, e.name, d.dept_name, d.location\nFROM Employees AS e\nLEFT JOIN Departments AS d\n  ON e.dept_id = d.dept_id;`,
          tagline: 'Preserves EVERY row from Left; pads missing Right with NULL',
          explanation: 'All 5 employees are guaranteed in output. Alice, Bob, Charlie, and Diana receive department metadata. Evan has no department, so his department columns are safely padded with NULL.',
          gotcha: 'Filtering Table B in WHERE turns a LEFT JOIN into an INNER JOIN! If you write WHERE d.location = \'San Francisco\', Evan is dropped because NULL = \'SF\' is FALSE. Put filters in the ON clause instead!',
          outputGenerator: (eRows, dRows) => {
            const out = [];
            eRows.forEach(e => {
              const match = e.dept_id !== null ? dRows.find(d => d.dept_id === e.dept_id) : null;
              if (match) {
                out.push({
                  status: 'matched',
                  emp_id: e.emp_id,
                  name: e.name,
                  dept_id: e.dept_id,
                  dept_name: match.dept_name,
                  location: match.location
                });
              } else {
                out.push({
                  status: 'null_padded',
                  emp_id: e.emp_id,
                  name: e.name,
                  dept_id: null,
                  dept_name: null,
                  location: null
                });
              }
            });
            return out;
          }
        },
        {
          id: 'right_join',
          name: 'RIGHT JOIN',
          symbol: '(A ∩ B) + B',
          tag: 'Preserve Right',
          activeZones: ['overlap', 'right'],
          sql: `SELECT e.emp_id, e.name, d.dept_name, d.location\nFROM Employees AS e\nRIGHT JOIN Departments AS d\n  ON e.dept_id = d.dept_id;`,
          tagline: 'Preserves EVERY row from Right; pads missing Left with NULL',
          explanation: 'All 4 departments are guaranteed in output. Engineering, Marketing, and Sales receive employee records. Research has 0 employees, so its employee columns are padded with NULL.',
          gotcha: 'RIGHT JOINs are rarely used in corporate SQL style guides because humans read left-to-right. Best practice: swap table order and write as LEFT JOIN for cleaner maintainability.',
          outputGenerator: (eRows, dRows) => {
            const out = [];
            dRows.forEach(d => {
              const matches = eRows.filter(e => e.dept_id === d.dept_id);
              if (matches.length > 0) {
                matches.forEach(e => {
                  out.push({
                    status: 'matched',
                    emp_id: e.emp_id,
                    name: e.name,
                    dept_id: d.dept_id,
                    dept_name: d.dept_name,
                    location: d.location
                  });
                });
              } else {
                out.push({
                  status: 'null_padded',
                  emp_id: null,
                  name: null,
                  dept_id: d.dept_id,
                  dept_name: d.dept_name,
                  location: d.location
                });
              }
            });
            return out;
          }
        },
        {
          id: 'full_outer_join',
          name: 'FULL OUTER JOIN',
          symbol: 'A ∪ B',
          tag: 'Preserve Both',
          activeZones: ['left', 'overlap', 'right'],
          sql: `-- Standard ANSI SQL\nSELECT e.emp_id, e.name, d.dept_name, d.location\nFROM Employees AS e\nFULL OUTER JOIN Departments AS d\n  ON e.dept_id = d.dept_id;\n\n-- MySQL 8.0 Emulation (via UNION):\nSELECT e.emp_id, e.name, d.dept_name, d.location FROM Employees e LEFT JOIN Departments d ON e.dept_id = d.dept_id\nUNION\nSELECT e.emp_id, e.name, d.dept_name, d.location FROM Employees e RIGHT JOIN Departments d ON e.dept_id = d.dept_id;`,
          tagline: 'Preserves every row from BOTH sides with NULL-padding',
          explanation: 'Combines the output of LEFT JOIN and RIGHT JOIN. Alice, Bob, Charlie, Diana match normally. Evan appears with NULL dept info. Research appears with NULL employee info. Total 6 rows.',
          gotcha: 'MySQL natively lacks FULL OUTER JOIN syntax! In MySQL, you emulate it by taking a LEFT JOIN, a RIGHT JOIN, and combining them with UNION (which deduplicates the intersection).',
          outputGenerator: (eRows, dRows) => {
            const out = [];
            // Left join part
            eRows.forEach(e => {
              const match = e.dept_id !== null ? dRows.find(d => d.dept_id === e.dept_id) : null;
              if (match) {
                out.push({
                  status: 'matched',
                  emp_id: e.emp_id,
                  name: e.name,
                  dept_id: e.dept_id,
                  dept_name: match.dept_name,
                  location: match.location
                });
              } else {
                out.push({
                  status: 'null_padded',
                  emp_id: e.emp_id,
                  name: e.name,
                  dept_id: null,
                  dept_name: null,
                  location: null
                });
              }
            });
            // Right orphans
            dRows.forEach(d => {
              const hasMatch = eRows.some(e => e.dept_id === d.dept_id);
              if (!hasMatch) {
                out.push({
                  status: 'null_padded',
                  emp_id: null,
                  name: null,
                  dept_id: d.dept_id,
                  dept_name: d.dept_name,
                  location: d.location
                });
              }
            });
            return out;
          }
        },
        {
          id: 'left_anti_join',
          name: 'LEFT ANTI-JOIN',
          symbol: 'A \\ B',
          tag: 'Orphans Only',
          activeZones: ['left'],
          sql: `SELECT e.emp_id, e.name, e.salary\nFROM Employees AS e\nLEFT JOIN Departments AS d\n  ON e.dept_id = d.dept_id\nWHERE d.dept_id IS NULL;`,
          tagline: 'Returns rows from Left that have NO match in Right',
          explanation: 'The classic orphan finder. We perform a LEFT JOIN, then filter for WHERE d.dept_id IS NULL. Only Evan Vance (#5) survives, identifying employees missing departmental assignment.',
          gotcha: 'Crucial performance idiom: LEFT JOIN ... WHERE right.key IS NULL is frequently faster than NOT IN (SELECT key FROM right) because NOT IN fails if the subquery contains ANY nulls!',
          outputGenerator: (eRows, dRows) => {
            return eRows
              .filter(e => e.dept_id === null || !dRows.some(d => d.dept_id === e.dept_id))
              .map(e => ({
                status: 'exclusive',
                emp_id: e.emp_id,
                name: e.name,
                dept_id: 'NULL (Unassigned)',
                dept_name: '---',
                location: '---'
              }));
          }
        },
        {
          id: 'right_anti_join',
          name: 'RIGHT ANTI-JOIN',
          symbol: 'B \\ A',
          tag: 'Unused Right',
          activeZones: ['right'],
          sql: `SELECT d.dept_id, d.dept_name, d.location\nFROM Employees AS e\nRIGHT JOIN Departments AS d\n  ON e.dept_id = d.dept_id\nWHERE e.emp_id IS NULL;`,
          tagline: 'Returns rows from Right that have NO match in Left',
          explanation: 'Finds unused foreign keys or vacant departments. Only Research (dept_id 40) survives because no employees work in Boston.',
          gotcha: 'Useful in database audits to detect unused catalog categories, abandoned shopping carts, or zero-activity customer accounts.',
          outputGenerator: (eRows, dRows) => {
            return dRows
              .filter(d => !eRows.some(e => e.dept_id === d.dept_id))
              .map(d => ({
                status: 'exclusive',
                emp_id: '---',
                name: '---',
                dept_id: d.dept_id,
                dept_name: d.dept_name,
                location: d.location
              }));
          }
        },
        {
          id: 'cross_join',
          name: 'CROSS JOIN',
          symbol: 'A × B',
          tag: 'Cartesian Product',
          activeZones: ['left', 'overlap', 'right'],
          isCartesian: true,
          sql: `SELECT e.name, d.dept_name\nFROM Employees AS e\nCROSS JOIN Departments AS d;\n-- Produces: 5 rows × 4 rows = 20 total rows!`,
          tagline: 'Cartesian product: pairs EVERY row in A with EVERY row in B',
          explanation: 'No ON condition. Multiplies the sets together. Used intentionally for matrix reporting (e.g. all products across all calendar months), but deadly if done by accident in production.',
          gotcha: 'The catastrophic accident: Forgetting an ON clause or writing FROM tableA, tableB creates a Cartesian product! With 1,000 employees and 100 departments, that yields 100,000 rows and crashes database buffers.',
          outputGenerator: (eRows, dRows) => {
            const out = [];
            eRows.forEach(e => {
              dRows.forEach(d => {
                out.push({
                  status: 'cartesian',
                  emp_id: e.emp_id,
                  name: e.name,
                  dept_id: d.dept_id,
                  dept_name: d.dept_name,
                  location: d.location
                });
              });
            });
            return out;
          }
        }
      ]
    },

    setOps: {
      leftTable: {
        name: 'Customers_Online',
        alias: 'A',
        key: 'cust_id',
        columns: ['cust_id', 'name', 'tier'],
        rows: [
          { cust_id: 101, name: 'Alice Chen', tier: 'Gold' },
          { cust_id: 102, name: 'Bob Smith', tier: 'Silver' },
          { cust_id: 103, name: 'David Miller', tier: 'Platinum' },
          { cust_id: 104, name: 'Fiona Gallagher', tier: 'Bronze' },
          { cust_id: 105, name: 'Grace Hopper', tier: 'Gold' }
        ]
      },
      rightTable: {
        name: 'Customers_Retail',
        alias: 'B',
        key: 'cust_id',
        columns: ['cust_id', 'name', 'tier'],
        rows: [
          { cust_id: 102, name: 'Bob Smith', tier: 'Silver' },
          { cust_id: 103, name: 'David Miller', tier: 'Platinum' },
          { cust_id: 106, name: 'Charlie Brown', tier: 'Bronze' },
          { cust_id: 107, name: 'Hannah Abbott', tier: 'Silver' },
          { cust_id: 108, name: 'Ian Malcolm', tier: 'Gold' }
        ]
      },
      operations: [
        {
          id: 'union_all',
          name: 'UNION ALL',
          symbol: 'A ⊎ B',
          tag: 'Preserve Duplicates',
          activeZones: ['left', 'overlap', 'right'],
          sql: `SELECT cust_id, name, tier FROM Customers_Online\nUNION ALL\nSELECT cust_id, name, tier FROM Customers_Retail;`,
          tagline: 'Appends rows without sorting or deduplication (Fastest)',
          explanation: 'Stacks the two sets on top of each other. Bob Smith (#102) and David Miller (#103) appear twice because both shop online and retail. Total: 5 + 5 = 10 rows.',
          gotcha: 'Always prefer UNION ALL over UNION unless you explicitly require deduplication! UNION incurs a costly sort/hash deduplication pass over the entire result set in tempdb memory.',
          outputGenerator: (aRows, bRows) => {
            return [...aRows.map(r => ({ ...r, status: 'source_a' })), ...bRows.map(r => ({ ...r, status: 'source_b' }))];
          }
        },
        {
          id: 'union',
          name: 'UNION (DISTINCT)',
          symbol: 'A ∪ B',
          tag: 'Deduplicated',
          activeZones: ['left', 'overlap', 'right'],
          sql: `SELECT cust_id, name, tier FROM Customers_Online\nUNION\nSELECT cust_id, name, tier FROM Customers_Retail;`,
          tagline: 'Combines sets and strips duplicate rows (8 unique customers)',
          explanation: 'Merges both customer lists and eliminates identical records. Bob Smith and David Miller are deduplicated into single rows. Total: 8 unique customer profiles.',
          gotcha: 'UNION compares ALL projected columns! If Table A has tier = "Gold" and Table B has tier = "Silver" for the same customer ID, both rows will survive because the tuples are distinct.',
          outputGenerator: (aRows, bRows) => {
            const map = new Map();
            aRows.forEach(r => map.set(r.cust_id, { ...r, status: 'matched' }));
            bRows.forEach(r => {
              if (map.has(r.cust_id)) {
                map.set(r.cust_id, { ...r, status: 'matched' });
              } else {
                map.set(r.cust_id, { ...r, status: 'source_b' });
              }
            });
            return Array.from(map.values());
          }
        },
        {
          id: 'intersect',
          name: 'INTERSECT',
          symbol: 'A ∩ B',
          tag: 'Omni-channel',
          activeZones: ['overlap'],
          sql: `-- ANSI SQL Standard\nSELECT cust_id, name, tier FROM Customers_Online\nINTERSECT\nSELECT cust_id, name, tier FROM Customers_Retail;`,
          tagline: 'Returns only records present in BOTH queries (Omni-channel)',
          explanation: 'Finds the exact intersection. Only Bob Smith (#102) and David Miller (#103) shop both online and in-store. Exactly 2 rows returned.',
          gotcha: 'In MySQL versions prior to 8.0.31, INTERSECT was not supported. You emulate it with an INNER JOIN on all columns or with WHERE EXISTS.',
          outputGenerator: (aRows, bRows) => {
            return aRows
              .filter(a => bRows.some(b => b.cust_id === a.cust_id))
              .map(r => ({ ...r, status: 'matched' }));
          }
        },
        {
          id: 'except',
          name: 'EXCEPT / MINUS',
          symbol: 'A \\ B',
          tag: 'Online-Only',
          activeZones: ['left'],
          sql: `-- ANSI SQL Standard (EXCEPT in PostgreSQL/SQL Server, MINUS in Oracle)\nSELECT cust_id, name, tier FROM Customers_Online\nEXCEPT\nSELECT cust_id, name, tier FROM Customers_Retail;`,
          tagline: 'Returns records in Set A that do NOT appear in Set B',
          explanation: 'Subtracts all retail shoppers from the online list. Alice, Fiona, and Grace have never made a retail purchase. Exactly 3 rows returned.',
          gotcha: 'Order of queries matters critically! (A EXCEPT B) is completely different from (B EXCEPT A). Subtraction is NOT commutative!',
          outputGenerator: (aRows, bRows) => {
            return aRows
              .filter(a => !bRows.some(b => b.cust_id === a.cust_id))
              .map(r => ({ ...r, status: 'exclusive' }));
          }
        },
        {
          id: 'sym_difference',
          name: 'SYMMETRIC DIFFERENCE',
          symbol: '(A \\ B) ∪ (B \\ A)',
          tag: 'Single-Channel Only',
          activeZones: ['left', 'right'],
          sql: `(SELECT cust_id, name, tier FROM Customers_Online EXCEPT SELECT cust_id, name, tier FROM Customers_Retail)\nUNION ALL\n(SELECT cust_id, name, tier FROM Customers_Retail EXCEPT SELECT cust_id, name, tier FROM Customers_Online);`,
          tagline: 'Customers who shop in ONLY ONE channel (disjoint union)',
          explanation: 'Selects customers who shop exclusively online (Alice, Fiona, Grace) OR exclusively retail (Charlie, Hannah, Ian), completely discarding the shared overlap. Exactly 6 rows.',
          gotcha: 'Essential for churn and segregation analysis: finding customers who refuse to adopt your digital app or customers who have abandoned physical retail.',
          outputGenerator: (aRows, bRows) => {
            const aOnly = aRows.filter(a => !bRows.some(b => b.cust_id === a.cust_id)).map(r => ({ ...r, status: 'exclusive' }));
            const bOnly = bRows.filter(b => !aRows.some(a => a.cust_id === b.cust_id)).map(r => ({ ...r, status: 'exclusive' }));
            return [...aOnly, ...bOnly];
          }
        }
      ]
    }
  };

  // --- STATE ---
  const state = {
    mode: 'joins', // 'joins' | 'setOps'
    selectedOpIndex: 0,
    hoveredChipId: null
  };

  // --- CONTROLLER ---
  const VennMatrixEngine = {
    init: function () {
      const container = document.getElementById('viewVennMatrix');
      if (!container) return;
      this.render();
    },

    setMode: function (mode) {
      if (state.mode === mode) return;
      state.mode = mode;
      state.selectedOpIndex = 0;
      state.hoveredChipId = null;
      this.render();
      if (window.AudioFX) window.AudioFX.playPop();
    },

    selectOp: function (index) {
      state.selectedOpIndex = index;
      state.hoveredChipId = null;
      this.render();
      if (window.AudioFX) window.AudioFX.playClick();
    },

    highlightChip: function (chipId) {
      state.hoveredChipId = chipId;
      this.updateRowHighlights(chipId);
    },

    clearHighlight: function () {
      state.hoveredChipId = null;
      this.updateRowHighlights(null);
    },

    updateRowHighlights: function (chipId) {
      const rows = document.querySelectorAll('.venn-inspect-row');
      rows.forEach(r => {
        if (!chipId) {
          r.classList.remove('highlighted');
        } else {
          const rowKey = r.getAttribute('data-row-key');
          if (rowKey === String(chipId)) {
            r.classList.add('highlighted');
          } else {
            r.classList.remove('highlighted');
          }
        }
      });
    },

    copySQL: function () {
      const currentOp = DATASETS[state.mode].operations[state.selectedOpIndex];
      if (navigator.clipboard && currentOp) {
        navigator.clipboard.writeText(currentOp.sql).then(() => {
          const btn = document.getElementById('btnCopyVennSQL');
          if (btn) {
            const originalText = btn.innerHTML;
            btn.innerHTML = '✓ Copied to Clipboard!';
            btn.classList.add('copied');
            setTimeout(() => {
              btn.innerHTML = originalText;
              btn.classList.remove('copied');
            }, 2000);
          }
          if (window.AudioFX) window.AudioFX.playSuccess();
        });
      }
    },

    runInStudio: function () {
      const currentOp = DATASETS[state.mode].operations[state.selectedOpIndex];
      if (!currentOp) return;

      const sqlInput = document.getElementById('sqlInput');
      if (sqlInput) {
        sqlInput.value = currentOp.sql.trim();
      }

      if (typeof window.switchMainView === 'function') {
        window.switchMainView('viewStudio');
      }

      // If parser function exists, execute it
      if (typeof window.parseAndBuildPipeline === 'function') {
        window.parseAndBuildPipeline(currentOp.sql);
      }

      if (window.AudioFX) window.AudioFX.playLaunch();
    },

    render: function () {
      const container = document.getElementById('viewVennMatrix');
      if (!container) return;

      const currentDataset = DATASETS[state.mode];
      const currentOp = currentDataset.operations[state.selectedOpIndex];
      const activeZones = currentOp.activeZones || [];

      // Calculate output rows
      const outputRows = currentOp.outputGenerator(
        currentDataset.leftTable.rows,
        currentDataset.rightTable.rows
      );

      container.innerHTML = `
        <div class="venn-matrix-wrapper">
          <!-- Top Header Strip -->
          <div class="venn-matrix-header">
            <div class="venn-header-left">
              <div class="venn-title-row">
                <span class="venn-icon">⭕</span>
                <h1 class="venn-title">Relational Set &amp; Join Topology Matrix</h1>
                <span class="venn-status-pill">Interactive Row Physics</span>
              </div>
              <p class="venn-subtitle">
                Inspect physical set intersections, outer preserves, and anti-join exclusions with live row chips moving in real-time.
              </p>
            </div>

            <!-- Mode Switcher: Joins vs Set Operations -->
            <div class="venn-mode-toggle">
              <button class="venn-mode-btn ${state.mode === 'joins' ? 'active' : ''}" onclick="window.VennMatrixEngine.setMode('joins')">
                <span class="mode-icon">🔗</span> Multi-Table Joins
              </button>
              <button class="venn-mode-btn ${state.mode === 'setOps' ? 'active' : ''}" onclick="window.VennMatrixEngine.setMode('setOps')">
                <span class="mode-icon">⋃</span> Set Operations
              </button>
            </div>
          </div>

          <!-- Operation Selector Dock -->
          <div class="venn-ops-dock">
            <div class="venn-ops-label">Select Relational Operation:</div>
            <div class="venn-ops-pills">
              ${currentDataset.operations.map((op, idx) => `
                <button class="venn-op-pill ${idx === state.selectedOpIndex ? 'active' : ''}" onclick="window.VennMatrixEngine.selectOp(${idx})">
                  <span class="op-symbol">${op.symbol}</span>
                  <span class="op-name">${op.name}</span>
                  <span class="op-tag">${op.tag}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Main Interactive Stage: SVG Canvas & Details Grid -->
          <div class="venn-stage-grid">
            <!-- Left Panel: Interactive Dynamic SVG Venn Diagram -->
            <div class="venn-canvas-card">
              <div class="venn-canvas-header">
                <div class="venn-canvas-title">
                  <span>${currentOp.name}</span>
                  <span class="op-symbol-badge">${currentOp.symbol}</span>
                </div>
                <span class="venn-canvas-hint">Hover row chips to trace relational links</span>
              </div>

              <div class="venn-svg-container">
                ${this.renderVennSvg(activeZones, currentDataset)}
              </div>

              <!-- Legend -->
              <div class="venn-legend">
                <span class="legend-chip left ${activeZones.includes('left') ? 'active' : ''}">
                  <span class="indicator"></span> Table A: ${currentDataset.leftTable.name}
                </span>
                <span class="legend-chip overlap ${activeZones.includes('overlap') ? 'active' : ''}">
                  <span class="indicator"></span> Intersection (Key Match)
                </span>
                <span class="legend-chip right ${activeZones.includes('right') ? 'active' : ''}">
                  <span class="indicator"></span> Table B: ${currentDataset.rightTable.name}
                </span>
              </div>
            </div>

            <!-- Right Panel: Operation Intelligence & SQL Generator -->
            <div class="venn-intel-card">
              <div class="venn-intel-header">
                <div class="intel-tagline">${currentOp.tagline}</div>
              </div>

              <div class="venn-concept-box">
                <p class="venn-explanation">${currentOp.explanation}</p>
              </div>

              <!-- SQL Code Generator Card -->
              <div class="venn-sql-box">
                <div class="venn-sql-header">
                  <span class="sql-label">PRODUCTION ANSI SQL CODE</span>
                  <div class="sql-actions">
                    <button id="btnCopyVennSQL" class="venn-btn-copy" onclick="window.VennMatrixEngine.copySQL()">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                      Copy SQL
                    </button>
                    <button class="venn-btn-studio" onclick="window.VennMatrixEngine.runInStudio()">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                      Run in Studio
                    </button>
                  </div>
                </div>
                <pre class="venn-code-block"><code>${this.escapeHtml(currentOp.sql)}</code></pre>
              </div>

              <!-- Gotcha Alert Strip -->
              <div class="venn-gotcha-strip">
                <div class="gotcha-badge">⚠️ Relational Trap &amp; Internals:</div>
                <div class="gotcha-text">${currentOp.gotcha}</div>
              </div>
            </div>
          </div>

          <!-- Bottom Stage: Side-by-Side Source Tables & Output Diff Matrix -->
          <div class="venn-tables-matrix">
            <div class="venn-tables-header">
              <span class="matrix-title">Physical Transformation Inspection (Input &rarr; Output)</span>
              <span class="matrix-tally">Output: <strong>${outputRows.length}</strong> Rows</span>
            </div>

            <div class="venn-tables-grid">
              <!-- Source Table A -->
              <div class="source-table-card">
                <div class="source-card-header">
                  <span class="table-name-pill table-a">Left (A): ${currentDataset.leftTable.name}</span>
                  <span class="row-count">${currentDataset.leftTable.rows.length} rows</span>
                </div>
                <div class="table-scroll-wrapper">
                  <table class="venn-data-table">
                    <thead>
                      <tr>
                        ${currentDataset.leftTable.columns.map(c => `<th>${c}</th>`).join('')}
                      </tr>
                    </thead>
                    <tbody>
                      ${currentDataset.leftTable.rows.map(row => `
                        <tr class="venn-inspect-row" data-row-key="${row.emp_id || row.cust_id}">
                          ${currentDataset.leftTable.columns.map(col => `
                            <td>${row[col] === null ? '<span class="null-val">NULL</span>' : row[col]}</td>
                          `).join('')}
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Source Table B -->
              <div class="source-table-card">
                <div class="source-card-header">
                  <span class="table-name-pill table-b">Right (B): ${currentDataset.rightTable.name}</span>
                  <span class="row-count">${currentDataset.rightTable.rows.length} rows</span>
                </div>
                <div class="table-scroll-wrapper">
                  <table class="venn-data-table">
                    <thead>
                      <tr>
                        ${currentDataset.rightTable.columns.map(c => `<th>${c}</th>`).join('')}
                      </tr>
                    </thead>
                    <tbody>
                      ${currentDataset.rightTable.rows.map(row => `
                        <tr class="venn-inspect-row" data-row-key="${row.dept_id || row.cust_id}">
                          ${currentDataset.rightTable.columns.map(col => `
                            <td>${row[col] === null ? '<span class="null-val">NULL</span>' : row[col]}</td>
                          `).join('')}
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Result Output Table -->
              <div class="result-table-card">
                <div class="result-card-header">
                  <span class="table-name-pill table-result">Generated Result (${currentOp.name})</span>
                  <span class="result-count">${outputRows.length} Rows Produced</span>
                </div>
                <div class="table-scroll-wrapper">
                  <table class="venn-data-table result-table">
                    <thead>
                      <tr>
                        <th>Status</th>
                        ${this.getResultColumns(outputRows).map(c => `<th>${c}</th>`).join('')}
                      </tr>
                    </thead>
                    <tbody>
                      ${outputRows.map(r => `
                        <tr class="venn-output-row status-${r.status}">
                          <td><span class="status-badge badge-${r.status}">${this.formatStatus(r.status)}</span></td>
                          ${this.getResultColumns(outputRows).map(col => `
                            <td>${r[col] === null ? '<span class="null-val">NULL</span>' : (r[col] || '---')}</td>
                          `).join('')}
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    },

    renderVennSvg: function (activeZones, dataset) {
      const isLeftActive = activeZones.includes('left');
      const isOverlapActive = activeZones.includes('overlap');
      const isRightActive = activeZones.includes('right');

      if (state.mode === 'joins') {
        return `
          <svg viewBox="0 0 640 380" class="venn-interactive-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <!-- Filters & Glows -->
              <filter id="vennGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <!-- Clip Paths for Lens Overlap -->
              <clipPath id="clipLeftCircle">
                <circle cx="230" cy="190" r="140" />
              </clipPath>
            </defs>

            <!-- Base SVG Circles Backdrop -->
            <!-- Left Circle (Table A) -->
            <circle cx="230" cy="190" r="140" class="venn-circle-base ${isLeftActive ? 'zone-active' : 'zone-dim'}" />

            <!-- Right Circle (Table B) -->
            <circle cx="410" cy="190" r="140" class="venn-circle-base ${isRightActive ? 'zone-active' : 'zone-dim'}" />

            <!-- Center Lens (Overlap A ∩ B) -->
            <circle cx="410" cy="190" r="140" clip-path="url(#clipLeftCircle)" class="venn-lens-overlap ${isOverlapActive ? 'zone-active' : 'zone-dim'}" />

            <!-- Circle Outline Borders -->
            <circle cx="230" cy="190" r="140" class="venn-circle-stroke ${isLeftActive ? 'stroke-active' : ''}" />
            <circle cx="410" cy="190" r="140" class="venn-circle-stroke ${isRightActive ? 'stroke-active' : ''}" />

            <!-- Labels -->
            <text x="140" y="70" class="venn-label-title">Table A: Employees</text>
            <text x="500" y="70" class="venn-label-title">Table B: Departments</text>

            <!-- Floating Interactive Row Chips -->
            <!-- Zone A (Left Only): Evan Vance (Orphan dept_id = null) -->
            <g class="venn-chip-group ${isLeftActive ? 'chip-active' : 'chip-dim'}"
               onmouseenter="window.VennMatrixEngine.highlightChip(5)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="110" y="165" width="115" height="32" rx="6" class="venn-row-chip chip-orphan" />
              <text x="167" y="186" class="chip-text">#5 Evan (NULL)</text>
            </g>

            <!-- Zone Overlap (A ∩ B): Alice, Bob, Charlie, Diana -->
            <g class="venn-chip-group ${isOverlapActive ? 'chip-active' : 'chip-dim'}"
               onmouseenter="window.VennMatrixEngine.highlightChip(1)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="270" y="115" width="100" height="28" rx="6" class="venn-row-chip" />
              <text x="320" y="133" class="chip-text">#1 Alice (10)</text>
            </g>

            <g class="venn-chip-group ${isOverlapActive ? 'chip-active' : 'chip-dim'}"
               onmouseenter="window.VennMatrixEngine.highlightChip(2)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="270" y="152" width="100" height="28" rx="6" class="venn-row-chip" />
              <text x="320" y="170" class="chip-text">#2 Bob (20)</text>
            </g>

            <g class="venn-chip-group ${isOverlapActive ? 'chip-active' : 'chip-dim'}"
               onmouseenter="window.VennMatrixEngine.highlightChip(3)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="270" y="189" width="100" height="28" rx="6" class="venn-row-chip" />
              <text x="320" y="207" class="chip-text">#3 Charlie (10)</text>
            </g>

            <g class="venn-chip-group ${isOverlapActive ? 'chip-active' : 'chip-dim'}"
               onmouseenter="window.VennMatrixEngine.highlightChip(4)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="270" y="226" width="100" height="28" rx="6" class="venn-row-chip" />
              <text x="320" y="244" class="chip-text">#4 Diana (30)</text>
            </g>

            <!-- Zone B (Right Only): Research (Orphan dept_id = 40, 0 employees) -->
            <g class="venn-chip-group ${isRightActive ? 'chip-active' : 'chip-dim'}"
               onmouseenter="window.VennMatrixEngine.highlightChip(40)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="415" y="165" width="125" height="32" rx="6" class="venn-row-chip chip-orphan" />
              <text x="477" y="186" class="chip-text">#40 Research (0)</text>
            </g>
          </svg>
        `;
      } else {
        // Set Operations Mode
        return `
          <svg viewBox="0 0 640 380" class="venn-interactive-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id="clipLeftCircleSet">
                <circle cx="230" cy="190" r="140" />
              </clipPath>
            </defs>

            <!-- Circles -->
            <circle cx="230" cy="190" r="140" class="venn-circle-base ${isLeftActive ? 'zone-active' : 'zone-dim'}" />
            <circle cx="410" cy="190" r="140" class="venn-circle-base ${isRightActive ? 'zone-active' : 'zone-dim'}" />
            <circle cx="410" cy="190" r="140" clip-path="url(#clipLeftCircleSet)" class="venn-lens-overlap ${isOverlapActive ? 'zone-active' : 'zone-dim'}" />

            <!-- Outlines -->
            <circle cx="230" cy="190" r="140" class="venn-circle-stroke ${isLeftActive ? 'stroke-active' : ''}" />
            <circle cx="410" cy="190" r="140" class="venn-circle-stroke ${isRightActive ? 'stroke-active' : ''}" />

            <text x="140" y="70" class="venn-label-title">Online Customers</text>
            <text x="500" y="70" class="venn-label-title">Retail Customers</text>

            <!-- Left Only Chips: Alice, Fiona, Grace -->
            <g class="venn-chip-group ${isLeftActive ? 'chip-active' : 'chip-dim'}"
               onmouseenter="window.VennMatrixEngine.highlightChip(101)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="110" y="130" width="110" height="26" rx="5" class="venn-row-chip" />
              <text x="165" y="147" class="chip-text">#101 Alice (Gold)</text>
            </g>
            <g class="venn-chip-group ${isLeftActive ? 'chip-active' : 'chip-dim'}"
               onmouseenter="window.VennMatrixEngine.highlightChip(104)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="110" y="165" width="110" height="26" rx="5" class="venn-row-chip" />
              <text x="165" y="182" class="chip-text">#104 Fiona (Brz)</text>
            </g>
            <g class="venn-chip-group ${isLeftActive ? 'chip-active' : 'chip-dim'}"
               onmouseenter="window.VennMatrixEngine.highlightChip(105)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="110" y="200" width="110" height="26" rx="5" class="venn-row-chip" />
              <text x="165" y="217" class="chip-text">#105 Grace (Gold)</text>
            </g>

            <!-- Overlap Chips: Bob, David -->
            <g class="venn-chip-group ${isOverlapActive ? 'chip-active' : 'chip-dim'}"
               onmouseenter="window.VennMatrixEngine.highlightChip(102)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="270" y="150" width="100" height="28" rx="6" class="venn-row-chip" />
              <text x="320" y="168" class="chip-text">#102 Bob (Slv)</text>
            </g>
            <g class="venn-chip-group ${isOverlapActive ? 'chip-active' : 'chip-dim'}"
               onmouseenter="window.VennMatrixEngine.highlightChip(103)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="270" y="190" width="100" height="28" rx="6" class="venn-row-chip" />
              <text x="320" y="208" class="chip-text">#103 David (Plt)</text>
            </g>

            <!-- Right Only Chips: Charlie, Hannah, Ian -->
            <g class="venn-chip-group ${isRightActive ? 'chip-active' : 'chip-dim'}"
               onmouseenter="window.VennMatrixEngine.highlightChip(106)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="420" y="130" width="110" height="26" rx="5" class="venn-row-chip" />
              <text x="475" y="147" class="chip-text">#106 Charlie</text>
            </g>
            <g class="venn-chip-group ${isRightActive ? 'chip-active' : 'chip-dim'}"
               onmouseenter="window.VennMatrixEngine.highlightChip(107)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="420" y="165" width="110" height="26" rx="5" class="venn-row-chip" />
              <text x="475" y="182" class="chip-text">#107 Hannah</text>
            </g>
            <g class="venn-chip-group ${isRightActive ? 'chip-active' : 'chip-dim'}"
               onmouseenter="window.VennMatrixEngine.highlightChip(108)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="420" y="200" width="110" height="26" rx="5" class="venn-row-chip" />
              <text x="475" y="217" class="chip-text">#108 Ian</text>
            </g>
          </svg>
        `;
      }
    },

    getResultColumns: function (rows) {
      if (!rows || rows.length === 0) return [];
      const keys = Object.keys(rows[0]).filter(k => k !== 'status');
      return keys;
    },

    formatStatus: function (status) {
      switch (status) {
        case 'matched': return '✓ MATCHED';
        case 'null_padded': return '⊘ NULL-PADDED';
        case 'exclusive': return '★ EXCLUSIVE';
        case 'cartesian': return '× PRODUCT';
        case 'source_a': return 'A (ONLINE)';
        case 'source_b': return 'B (RETAIL)';
        default: return status.toUpperCase();
      }
    },

    escapeHtml: function (str) {
      return (str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }
  };

  // Expose globally
  window.VennMatrixEngine = VennMatrixEngine;
})();
