// =============================================================================
// TRACK 05: WINDOW FUNCTIONS & ANALYTICAL FRAMES LAB
// =============================================================================

window.WINDOW_SCHEMA = {
  tableName: 'SalesPerformance',
  columns: ['rep_id', 'name', 'region', 'quarter', 'revenue', 'deals_closed'],
  types: { rep_id: 'INT', name: 'VARCHAR', region: 'VARCHAR', quarter: 'VARCHAR', revenue: 'INT', deals_closed: 'INT' },
  rows: [
    { rep_id: 101, name: 'Elena Rostova', region: 'North America', quarter: 'Q1', revenue: 145000, deals_closed: 14 },
    { rep_id: 102, name: 'Marcus Vance', region: 'North America', quarter: 'Q1', revenue: 120000, deals_closed: 10 },
    { rep_id: 103, name: 'Sarah Jenkins', region: 'North America', quarter: 'Q2', revenue: 145000, deals_closed: 12 },
    { rep_id: 104, name: 'Tariq Al-Mansoor', region: 'North America', quarter: 'Q2', revenue: 98000, deals_closed: 8 },
    { rep_id: 105, name: 'Chloe Dubois', region: 'EMEA', quarter: 'Q1', revenue: 160000, deals_closed: 15 },
    { rep_id: 106, name: 'Stefan Lind', region: 'EMEA', quarter: 'Q1', revenue: 110000, deals_closed: 9 },
    { rep_id: 107, name: 'Amara Okafor', region: 'EMEA', quarter: 'Q2', revenue: 135000, deals_closed: 11 },
    { rep_id: 108, name: 'Kenji Sato', region: 'APAC', quarter: 'Q1', revenue: 175000, deals_closed: 18 },
    { rep_id: 109, name: 'Priya Sharma', region: 'APAC', quarter: 'Q1', revenue: 150000, deals_closed: 13 },
    { rep_id: 110, name: 'Liam Chen', region: 'APAC', quarter: 'Q2', revenue: 150000, deals_closed: 12 }
  ]
};

window.WINDOW_STEPS = [
  // ---------------------------------------------------------------------------
  // STEP 01: OVER () - Empty Window Baseline
  // ---------------------------------------------------------------------------
  {
    stepIndex: 1,
    id: 'window_over',
    keyword: 'OVER ()',
    title: 'Step 01: The OVER () Clause (Global Analytical Window)',
    pillClass: 'pill-window',
    conceptHeading: 'Preserving Individual Tuples While Computing Table-Wide Metrics',
    conceptText: 'In standard SQL, GROUP BY irreversibly collapses rows into aggregated summary buckets. Window functions solve this fundamental relational trade-off: the OVER () clause computes an aggregate or analytical calculation across a defined set of rows WHILE PRESERVING every single individual row identity in the working memory buffer.',
    sqlCode: `SELECT rep_id, name, region, revenue,\n       AVG(revenue) OVER () AS company_avg_rev,\n       revenue - AVG(revenue) OVER () AS delta_from_avg\nFROM SalesPerformance;`,
    explanationPoints: [
      'Executes AFTER the WHERE, GROUP BY, and HAVING phases, right during SELECT evaluation.',
      'An empty OVER () defines the window partition as the entire dataset (all 10 rows).',
      'Allows computing benchmark ratios (e.g. rep revenue vs company average) in a single physical pass without subqueries or self-joins.',
      'The engine computes AVG(revenue) = $138,800 once and broadcasts it to each active tuple.'
    ],
    gotcha: 'Window functions can ONLY appear in the SELECT list and ORDER BY clause! Placing a window function in WHERE (e.g. WHERE AVG(revenue) OVER () > 100k) causes an immediate syntax error.',
    actionPrompt: 'Computing whole-table benchmark average ($138,800) alongside each individual rep:',
    transform: (rows) => {
      const avg = Math.round(rows.reduce((s, r) => s + r.revenue, 0) / rows.length);
      return rows.map(r => ({
        rep_id: r.rep_id,
        name: r.name,
        region: r.region,
        revenue: `$${r.revenue.toLocaleString()}`,
        company_avg: `$${avg.toLocaleString()}`,
        delta_from_avg: `${r.revenue >= avg ? '+' : ''}$${(r.revenue - avg).toLocaleString()}`,
        _status: r.revenue >= avg ? 'passed' : 'loaded',
        _label: r.revenue >= avg ? 'ABOVE AVERAGE' : 'BELOW AVERAGE'
      }));
    },
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#090a0d" rx="6" stroke="#232328"/>
        <!-- Left: GROUP BY (Collapses) -->
        <g transform="translate(25, 20)">
          <rect width="210" height="140" rx="4" fill="#121318" stroke="#27272a"/>
          <rect width="210" height="24" rx="4" fill="#18181b"/>
          <text x="15" y="16" fill="#ef4444" font-family="monospace" font-size="9" font-weight="700">STANDARD GROUP BY (Destructive)</text>
          <g transform="translate(15, 36)">
            <text x="0" y="14" fill="#71717a" font-family="monospace" font-size="8.5">10 Rows In RAM Buffer</text>
            <path d="M 0 25 L 180 25" stroke="#27272a" stroke-dasharray="2,2"/>
            <text x="0" y="42" fill="#ef4444" font-family="monospace" font-size="8.5">&darr; Collapses into 1 row</text>
            <rect y="55" width="180" height="24" fill="#1c1917" stroke="#7f1d1d" rx="3"/>
            <text x="10" y="70" fill="#fca5a5" font-family="monospace" font-size="9">AVG: $138,800 (1 tuple)</text>
            <text x="0" y="96" fill="#71717a" font-family="monospace" font-size="7.5">Individual rep IDs wiped out!</text>
          </g>
        </g>

        <!-- Divider Arrow -->
        <g transform="translate(245, 80)">
          <path d="M 0 10 L 35 10" stroke="#71717a" stroke-width="1.5" stroke-dasharray="3,3"/>
          <polygon points="35,6 45,10 35,14" fill="#a1a1aa"/>
        </g>

        <!-- Right: WINDOW OVER () (Preserves Identity) -->
        <g transform="translate(300, 20)">
          <rect width="455" height="140" rx="4" fill="#121318" stroke="#3f3f46"/>
          <rect width="455" height="24" rx="4" fill="#18181b"/>
          <text x="15" y="16" fill="#ffffff" font-family="monospace" font-size="9" font-weight="700">WINDOW: AVG(revenue) OVER () (Non-Destructive)</text>
          <text x="440" y="16" fill="#10b981" font-family="monospace" font-size="8.5" text-anchor="end">10 In &rarr; 10 Out</text>
          
          <g transform="translate(15, 34)">
            <!-- Row 1 -->
            <rect width="425" height="18" fill="#18181b" stroke="#27272a" rx="2"/>
            <text x="10" y="13" fill="#ffffff" font-family="monospace" font-size="8">Elena Rostova</text>
            <text x="140" y="13" fill="#a1a1aa" font-family="monospace" font-size="8">$145,000</text>
            <text x="230" y="13" fill="#71717a" font-family="monospace" font-size="8">&rarr; OVER () &rarr;</text>
            <text x="310" y="13" fill="#10b981" font-family="monospace" font-size="8">Avg: $138.8k</text>
            <text x="390" y="13" fill="#10b981" font-family="monospace" font-size="8">+6.2k</text>

            <!-- Row 2 -->
            <rect y="22" width="425" height="18" fill="#141417" stroke="#27272a" rx="2"/>
            <text x="10" y="35" fill="#ffffff" font-family="monospace" font-size="8">Marcus Vance</text>
            <text x="140" y="35" fill="#a1a1aa" font-family="monospace" font-size="8">$120,000</text>
            <text x="230" y="35" fill="#71717a" font-family="monospace" font-size="8">&rarr; OVER () &rarr;</text>
            <text x="310" y="35" fill="#10b981" font-family="monospace" font-size="8">Avg: $138.8k</text>
            <text x="390" y="35" fill="#ef4444" font-family="monospace" font-size="8">-18.8k</text>

            <!-- Row 3 -->
            <rect y="44" width="425" height="18" fill="#18181b" stroke="#27272a" rx="2"/>
            <text x="10" y="57" fill="#ffffff" font-family="monospace" font-size="8">Chloe Dubois</text>
            <text x="140" y="57" fill="#a1a1aa" font-family="monospace" font-size="8">$160,000</text>
            <text x="230" y="57" fill="#71717a" font-family="monospace" font-size="8">&rarr; OVER () &rarr;</text>
            <text x="310" y="57" fill="#10b981" font-family="monospace" font-size="8">Avg: $138.8k</text>
            <text x="390" y="57" fill="#10b981" font-family="monospace" font-size="8">+21.2k</text>

            <text x="210" y="85" fill="#71717a" font-family="monospace" font-size="8" text-anchor="middle">&bull;&bull;&bull; All 10 active tuples survive with full relational fidelity &bull;&bull;&bull;</text>
          </g>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 02: PARTITION BY - Segmented Partitions
  // ---------------------------------------------------------------------------
  {
    stepIndex: 2,
    id: 'window_partition',
    keyword: 'PARTITION BY',
    title: 'Step 02: Partitioning Into Sub-Windows',
    pillClass: 'pill-window',
    conceptHeading: 'Boundary Resets: Independent Mini-Universes per Group',
    conceptText: 'Adding PARTITION BY inside the OVER clause slices the in-memory tuple stream into isolated sub-windows (partitions). The engine recalculates the analytical function independently within each partition boundary, resetting all internal accumulators to zero at every boundary transition.',
    sqlCode: `SELECT rep_id, name, region, quarter, revenue,\n       AVG(revenue) OVER (PARTITION BY region) AS regional_avg,\n       revenue - AVG(revenue) OVER (PARTITION BY region) AS diff_from_region\nFROM SalesPerformance;`,
    explanationPoints: [
      'PARTITION BY does not reorder rows on disk; it creates virtual logical boundaries.',
      'Accumulator state (e.g. SUM, COUNT, AVG) strictly resets when region changes.',
      'Allows apples-to-apples performance comparisons within EMEA, APAC, and North America.',
      'You can partition by multiple columns (e.g. PARTITION BY region, quarter).'
    ],
    gotcha: 'Do not confuse PARTITION BY with GROUP BY! PARTITION BY operates strictly inside the window function and does NOT collapse or change the outer query row count.',
    actionPrompt: 'Slicing dataset into 3 isolated regional partitions (APAC, EMEA, North America):',
    transform: (rows) => {
      const regionAvgs = {};
      rows.forEach(r => {
        if (!regionAvgs[r.region]) regionAvgs[r.region] = { sum: 0, count: 0 };
        regionAvgs[r.region].sum += r.revenue;
        regionAvgs[r.region].count++;
      });
      return rows.map(r => {
        const avg = Math.round(regionAvgs[r.region].sum / regionAvgs[r.region].count);
        const diff = r.revenue - avg;
        return {
          rep_id: r.rep_id,
          name: r.name,
          region: r.region,
          quarter: r.quarter,
          revenue: `$${r.revenue.toLocaleString()}`,
          regional_avg: `$${avg.toLocaleString()}`,
          diff_from_region: `${diff >= 0 ? '+' : ''}$${diff.toLocaleString()}`,
          _status: diff >= 0 ? 'passed' : 'loaded',
          _label: `PARTITION [${r.region.toUpperCase()}]`
        };
      });
    },
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#090a0d" rx="6" stroke="#232328"/>
        <!-- 3 Partitions Visualized side by side -->
        <!-- Partition 1: APAC -->
        <g transform="translate(25, 20)">
          <rect width="225" height="140" rx="4" fill="#121318" stroke="#3f3f46"/>
          <rect width="225" height="24" rx="4" fill="#18181b"/>
          <text x="12" y="16" fill="#ffffff" font-family="monospace" font-size="9" font-weight="700">PARTITION 1: APAC (3 rows)</text>
          <g transform="translate(10, 32)">
            <text x="0" y="14" fill="#a1a1aa" font-family="monospace" font-size="8">Kenji Sato ($175k)</text>
            <text x="0" y="28" fill="#a1a1aa" font-family="monospace" font-size="8">Priya Sharma ($150k)</text>
            <text x="0" y="42" fill="#a1a1aa" font-family="monospace" font-size="8">Liam Chen ($150k)</text>
            <path d="M 0 52 L 205 52" stroke="#27272a"/>
            <text x="0" y="66" fill="#10b981" font-family="monospace" font-size="8.5" font-weight="700">Local Avg: $158,333</text>
            <text x="0" y="82" fill="#71717a" font-family="monospace" font-size="7.5">&bull; Accumulator resets at boundary &bull;</text>
          </g>
        </g>

        <!-- Partition 2: EMEA -->
        <g transform="translate(275, 20)">
          <rect width="225" height="140" rx="4" fill="#121318" stroke="#3f3f46"/>
          <rect width="225" height="24" rx="4" fill="#18181b"/>
          <text x="12" y="16" fill="#ffffff" font-family="monospace" font-size="9" font-weight="700">PARTITION 2: EMEA (3 rows)</text>
          <g transform="translate(10, 32)">
            <text x="0" y="14" fill="#a1a1aa" font-family="monospace" font-size="8">Chloe Dubois ($160k)</text>
            <text x="0" y="28" fill="#a1a1aa" font-family="monospace" font-size="8">Stefan Lind ($110k)</text>
            <text x="0" y="42" fill="#a1a1aa" font-family="monospace" font-size="8">Amara Okafor ($135k)</text>
            <path d="M 0 52 L 205 52" stroke="#27272a"/>
            <text x="0" y="66" fill="#10b981" font-family="monospace" font-size="8.5" font-weight="700">Local Avg: $135,000</text>
            <text x="0" y="82" fill="#71717a" font-family="monospace" font-size="7.5">&bull; Boundary Wall: Zero leakage &bull;</text>
          </g>
        </g>

        <!-- Partition 3: North America -->
        <g transform="translate(525, 20)">
          <rect width="230" height="140" rx="4" fill="#121318" stroke="#3f3f46"/>
          <rect width="230" height="24" rx="4" fill="#18181b"/>
          <text x="12" y="16" fill="#ffffff" font-family="monospace" font-size="9" font-weight="700">PARTITION 3: NORTH AMERICA (4)</text>
          <g transform="translate(10, 32)">
            <text x="0" y="14" fill="#a1a1aa" font-family="monospace" font-size="8">Elena Rostova ($145k)</text>
            <text x="0" y="28" fill="#a1a1aa" font-family="monospace" font-size="8">Marcus Vance ($120k)</text>
            <text x="0" y="42" fill="#a1a1aa" font-family="monospace" font-size="8">Sarah Jenkins ($145k)</text>
            <text x="0" y="56" fill="#a1a1aa" font-family="monospace" font-size="8">Tariq Al-Mansoor ($98k)</text>
            <path d="M 0 66 L 210 66" stroke="#27272a"/>
            <text x="0" y="80" fill="#10b981" font-family="monospace" font-size="8.5" font-weight="700">Local Avg: $127,000</text>
          </g>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 03: ORDER BY inside OVER - Running Totals & Default Frame Trap
  // ---------------------------------------------------------------------------
  {
    stepIndex: 3,
    id: 'window_order_frame',
    keyword: 'ORDER BY',
    title: 'Step 03: ORDER BY & The Implicit Frame Trap',
    pillClass: 'pill-window',
    conceptHeading: 'Adding ORDER BY Automatically Converts a Static Window Into a Cumulative Running Total',
    conceptText: 'The moment you write ORDER BY inside an OVER() clause, SQL silently injects an implicit window frame: RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW. Instead of aggregating the whole partition, SUM() now calculates a cumulative running total row-by-row.',
    sqlCode: `SELECT rep_id, name, quarter, revenue,\n       SUM(revenue) OVER (\n         ORDER BY revenue ASC\n       ) AS running_rev_total\nFROM SalesPerformance;`,
    explanationPoints: [
      'Without ORDER BY: SUM() returns the grand total across all rows in the partition.',
      'With ORDER BY: SUM() computes a running accumulation from row 1 to the current row.',
      'The ANSI SQL default frame is RANGE, NOT ROWS! If two rows have identical values, RANGE groups them together in running calculations.',
      'To force strict row-by-row accumulation without tie grouping, write: ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.'
    ],
    gotcha: 'THE TIE TRAP: Because the default is RANGE, ties in ORDER BY receive the EXACT SAME cumulative total! Rows with identical values are pooled into the same frame slice.',
    actionPrompt: 'Tracing cumulative running total as the engine processes tuples ordered by revenue ASC:',
    transform: (rows) => {
      const sorted = [...rows].sort((a, b) => a.revenue - b.revenue);
      let runSum = 0;
      return sorted.map((r, idx) => {
        runSum += r.revenue;
        return {
          order_idx: idx + 1,
          name: r.name,
          region: r.region,
          revenue: `$${r.revenue.toLocaleString()}`,
          running_rev_total: `$${runSum.toLocaleString()}`,
          _status: 'passed',
          _label: `RUNNING SUM ($${runSum.toLocaleString()})`
        };
      });
    },
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#090a0d" rx="6" stroke="#232328"/>
        <!-- Ladder Accumulator Visualization -->
        <g transform="translate(30, 20)">
          <text x="0" y="16" fill="#ffffff" font-family="monospace" font-size="9.5" font-weight="700">CUMULATIVE WINDOW FRAME: UNBOUNDED PRECEDING &rarr; CURRENT ROW</text>
          
          <!-- Stepping Stacks -->
          <g transform="translate(10, 35)">
            <!-- Step 1 -->
            <rect x="0" y="80" width="100" height="25" fill="#18181b" stroke="#3f3f46" rx="2"/>
            <text x="50" y="96" fill="#a1a1aa" font-family="monospace" font-size="8" text-anchor="middle">Tariq: $98k</text>
            <text x="50" y="120" fill="#71717a" font-family="monospace" font-size="8" text-anchor="middle">&Sigma; $98k</text>

            <!-- Step 2 -->
            <rect x="120" y="55" width="100" height="50" fill="#18181b" stroke="#3f3f46" rx="2"/>
            <text x="170" y="80" fill="#a1a1aa" font-family="monospace" font-size="8" text-anchor="middle">Stefan: $110k</text>
            <text x="170" y="120" fill="#71717a" font-family="monospace" font-size="8" text-anchor="middle">&Sigma; $208k</text>

            <!-- Step 3 -->
            <rect x="240" y="35" width="100" height="70" fill="#18181b" stroke="#3f3f46" rx="2"/>
            <text x="290" y="70" fill="#a1a1aa" font-family="monospace" font-size="8" text-anchor="middle">Marcus: $120k</text>
            <text x="290" y="120" fill="#71717a" font-family="monospace" font-size="8" text-anchor="middle">&Sigma; $328k</text>

            <!-- Step 4 -->
            <rect x="360" y="15" width="100" height="90" fill="#18181b" stroke="#3f3f46" rx="2"/>
            <text x="410" y="60" fill="#a1a1aa" font-family="monospace" font-size="8" text-anchor="middle">Amara: $135k</text>
            <text x="410" y="120" fill="#71717a" font-family="monospace" font-size="8" text-anchor="middle">&Sigma; $463k</text>

            <!-- Explanatory Callout Box -->
            <g transform="translate(480, 5)">
              <rect width="230" height="100" fill="#121318" stroke="#3f3f46" rx="4"/>
              <text x="12" y="20" fill="#ffffff" font-family="monospace" font-size="8.5" font-weight="700">HIDDEN ANSI DEFAULT:</text>
              <text x="12" y="38" fill="#10b981" font-family="monospace" font-size="8">RANGE BETWEEN</text>
              <text x="12" y="52" fill="#10b981" font-family="monospace" font-size="8">UNBOUNDED PRECEDING</text>
              <text x="12" y="66" fill="#10b981" font-family="monospace" font-size="8">AND CURRENT ROW</text>
              <text x="12" y="86" fill="#71717a" font-family="monospace" font-size="7.5">Accumulates prior rows + self</text>
            </g>
          </g>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 04: ROW_NUMBER vs RANK vs DENSE_RANK
  // ---------------------------------------------------------------------------
  {
    stepIndex: 4,
    id: 'window_ranking',
    keyword: 'RANKING TRIAD',
    title: 'Step 04: ROW_NUMBER() vs RANK() vs DENSE_RANK()',
    pillClass: 'pill-window',
    conceptHeading: 'The Three Essential Ranking Philosophies for Ties',
    conceptText: 'When values in the ORDER BY clause are identical (ties), SQL engines offer 3 distinct ranking semantics: ROW_NUMBER() arbitrarily breaks ties sequentially without gaps; RANK() assigns tied rows the same rank but skips subsequent numbers; DENSE_RANK() assigns tied rows the same rank WITHOUT skipping numbers.',
    sqlCode: `SELECT name, region, revenue,\n       ROW_NUMBER() OVER (ORDER BY revenue DESC) AS row_num,\n       RANK()       OVER (ORDER BY revenue DESC) AS rnk,\n       DENSE_RANK() OVER (ORDER BY revenue DESC) AS dense_rnk\nFROM SalesPerformance;`,
    explanationPoints: [
      'ROW_NUMBER(): Strictly sequential: 1, 2, 3, 4, 5, 6... (non-deterministic for ties unless tie-breaker added).',
      'RANK(): Gaps allowed: 1, 2, 3, 3, 5, 6... (skips rank 4 because two reps tied for 3rd place).',
      'DENSE_RANK(): Zero gaps: 1, 2, 3, 3, 4, 5... (4th place is preserved regardless of prior ties).',
      'In LeetCode / FAANG interviews, "Find the Nth Highest Salary" almost ALWAYS requires DENSE_RANK()!'
    ],
    gotcha: 'Using ROW_NUMBER() to find the "Top 3 Performers" is dangerous! If reps #3 and #4 have identical revenues ($145k), ROW_NUMBER() arbitrarily picks one and discards the other.',
    actionPrompt: 'Comparing the 3 ranking functions on revenue DESC (Notice ties at $150,000 and $145,000):',
    transform: (rows) => {
      const sorted = [...rows].sort((a, b) => b.revenue - a.revenue);
      let lastRev = null;
      let currentRank = 0;
      let currentDense = 0;
      return sorted.map((r, idx) => {
        const rowNum = idx + 1;
        if (r.revenue !== lastRev) {
          currentRank = rowNum;
          currentDense++;
          lastRev = r.revenue;
        }
        const isTie = sorted.filter(x => x.revenue === r.revenue).length > 1;
        return {
          name: r.name,
          region: r.region,
          revenue: `$${r.revenue.toLocaleString()}`,
          row_number: rowNum,
          rank: currentRank,
          dense_rank: currentDense,
          _status: isTie ? 'passed' : 'loaded',
          _label: isTie ? `TIE ($${r.revenue.toLocaleString()})` : 'UNIQUE'
        };
      });
    },
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#090a0d" rx="6" stroke="#232328"/>
        <!-- Matrix comparison of 3 rank types on identical dataset -->
        <g transform="translate(30, 20)">
          <!-- Header -->
          <rect width="720" height="24" fill="#18181b" stroke="#27272a" rx="3"/>
          <text x="15" y="16" fill="#ffffff" font-family="monospace" font-size="8.5" font-weight="700">EMPLOYEE &amp; REVENUE</text>
          <text x="250" y="16" fill="#a1a1aa" font-family="monospace" font-size="8.5" font-weight="700">ROW_NUMBER()</text>
          <text x="420" y="16" fill="#a1a1aa" font-family="monospace" font-size="8.5" font-weight="700">RANK() (With Gaps)</text>
          <text x="590" y="16" fill="#10b981" font-family="monospace" font-size="8.5" font-weight="700">DENSE_RANK() (No Gaps)</text>

          <!-- Rows -->
          <!-- Row 1: Kenji 175k -->
          <g transform="translate(0, 30)">
            <rect width="720" height="20" fill="#121318" stroke="#27272a"/>
            <text x="15" y="14" fill="#ffffff" font-family="monospace" font-size="8">Kenji Sato ($175k)</text>
            <text x="250" y="14" fill="#ffffff" font-family="monospace" font-size="8.5">1</text>
            <text x="420" y="14" fill="#ffffff" font-family="monospace" font-size="8.5">1</text>
            <text x="590" y="14" fill="#10b981" font-family="monospace" font-size="8.5" font-weight="700">1</text>
          </g>

          <!-- Row 2: Chloe 160k -->
          <g transform="translate(0, 52)">
            <rect width="720" height="20" fill="#141417" stroke="#27272a"/>
            <text x="15" y="14" fill="#ffffff" font-family="monospace" font-size="8">Chloe Dubois ($160k)</text>
            <text x="250" y="14" fill="#ffffff" font-family="monospace" font-size="8.5">2</text>
            <text x="420" y="14" fill="#ffffff" font-family="monospace" font-size="8.5">2</text>
            <text x="590" y="14" fill="#10b981" font-family="monospace" font-size="8.5" font-weight="700">2</text>
          </g>

          <!-- Row 3: Priya 150k (TIE A) -->
          <g transform="translate(0, 74)">
            <rect width="720" height="20" fill="#18181b" stroke="#f59e0b" stroke-width="1.2"/>
            <text x="15" y="14" fill="#f59e0b" font-family="monospace" font-size="8">Priya Sharma ($150k) [TIE]</text>
            <text x="250" y="14" fill="#a1a1aa" font-family="monospace" font-size="8.5">3</text>
            <text x="420" y="14" fill="#f59e0b" font-family="monospace" font-size="8.5" font-weight="700">3</text>
            <text x="590" y="14" fill="#10b981" font-family="monospace" font-size="8.5" font-weight="700">3</text>
          </g>

          <!-- Row 4: Liam 150k (TIE B) -->
          <g transform="translate(0, 96)">
            <rect width="720" height="20" fill="#18181b" stroke="#f59e0b" stroke-width="1.2"/>
            <text x="15" y="14" fill="#f59e0b" font-family="monospace" font-size="8">Liam Chen ($150k) [TIE]</text>
            <text x="250" y="14" fill="#a1a1aa" font-family="monospace" font-size="8.5">4 (arbitrary!)</text>
            <text x="420" y="14" fill="#f59e0b" font-family="monospace" font-size="8.5" font-weight="700">3</text>
            <text x="590" y="14" fill="#10b981" font-family="monospace" font-size="8.5" font-weight="700">3</text>
          </g>

          <!-- Row 5: Elena 145k (AFTER TIE) -->
          <g transform="translate(0, 118)">
            <rect width="720" height="20" fill="#121318" stroke="#27272a"/>
            <text x="15" y="14" fill="#ffffff" font-family="monospace" font-size="8">Elena Rostova ($145k)</text>
            <text x="250" y="14" fill="#ffffff" font-family="monospace" font-size="8.5">5</text>
            <text x="420" y="14" fill="#ef4444" font-family="monospace" font-size="8.5" font-weight="700">5 (SKIPPED 4!)</text>
            <text x="590" y="14" fill="#10b981" font-family="monospace" font-size="8.5" font-weight="700">4 (CONTINUOUS)</text>
          </g>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 05: LEAD and LAG - Positional Access
  // ---------------------------------------------------------------------------
  {
    stepIndex: 5,
    id: 'window_lead_lag',
    keyword: 'LEAD / LAG',
    title: 'Step 05: Positional Navigation (LEAD & LAG)',
    pillClass: 'pill-window',
    conceptHeading: 'Inter-Row Deltas Without Complex Relational Self-Joins',
    conceptText: 'In relational algebra, rows have no intrinsic pointer to their predecessor or successor. LAG() peers backward N rows into the prior tuple buffer, while LEAD() peers forward N rows into future tuples. This enables trivial Period-over-Period growth calculations without multi-table self-joins.',
    sqlCode: `SELECT name, region, quarter, revenue,\n       LAG(revenue, 1, 0) OVER (\n         PARTITION BY region\n         ORDER BY quarter ASC\n       ) AS prev_quarter_rev,\n       revenue - LAG(revenue, 1, 0) OVER (\n         PARTITION BY region\n         ORDER BY quarter ASC\n       ) AS qoq_growth\nFROM SalesPerformance;`,
    explanationPoints: [
      'LAG(column, offset, default): Peeks backward by offset rows. If offset out of bounds, returns default (or NULL).',
      'LEAD(column, offset, default): Peeks forward by offset rows.',
      'Always combines with PARTITION BY to prevent cross-region data contamination.',
      'Execution cost is $O(N)$ with an in-memory cursor, vs $O(N^2)$ for naive self-joins.'
    ],
    gotcha: 'THE FIRST-ROW NULL: The very first row in any partition has no previous row! Unless you supply the 3rd argument default (e.g. LAG(revenue, 1, 0)), it will return NULL, causing math operations to evaluate to NULL.',
    actionPrompt: 'Computing QoQ growth per region using LAG() to look up prior quarter revenue:',
    transform: (rows) => {
      // Sort by region, quarter
      const sorted = [...rows].sort((a, b) => a.region.localeCompare(b.region) || a.quarter.localeCompare(b.quarter));
      let lastRegion = null;
      let lastRev = null;
      return sorted.map(r => {
        let prev = null;
        if (r.region === lastRegion) {
          prev = lastRev;
        }
        lastRegion = r.region;
        lastRev = r.revenue;
        const diff = prev !== null ? r.revenue - prev : 0;
        return {
          name: r.name,
          region: r.region,
          quarter: r.quarter,
          revenue: `$${r.revenue.toLocaleString()}`,
          prev_rev: prev !== null ? `$${prev.toLocaleString()}` : '0 (BOUNDARY)',
          growth: prev !== null ? `${diff >= 0 ? '+' : ''}$${diff.toLocaleString()}` : 'N/A (FIRST ROW)',
          _status: prev === null ? 'loaded' : (diff >= 0 ? 'passed' : 'rejected'),
          _label: prev === null ? 'PARTITION ANCHOR' : (diff >= 0 ? 'GROWTH +' : 'CONTRACTION -')
        };
      });
    },
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#090a0d" rx="6" stroke="#232328"/>
        <!-- Visualizing cursor offset peek -->
        <g transform="translate(30, 25)">
          <text x="0" y="15" fill="#ffffff" font-family="monospace" font-size="9.5" font-weight="700">IN-MEMORY CURSOR OFFSET: LAG(revenue, 1) &amp; LEAD(revenue, 1)</text>

          <g transform="translate(20, 35)">
            <!-- Prior Row (LAG) -->
            <rect x="0" y="25" width="200" height="40" fill="#121318" stroke="#3f3f46" rx="3"/>
            <text x="15" y="42" fill="#71717a" font-family="monospace" font-size="8">ROW N - 1 (Q1)</text>
            <text x="15" y="56" fill="#a1a1aa" font-family="monospace" font-size="8.5">Elena: $145,000</text>

            <!-- Arrow Upwards / Downwards -->
            <g transform="translate(210, 45)">
              <path d="M 0 0 C 20 -20, 40 -20, 60 0" fill="none" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3,2"/>
              <text x="30" y="-12" fill="#10b981" font-family="monospace" font-size="8" text-anchor="middle">LAG(1) &uarr;</text>
            </g>

            <!-- Current Row -->
            <rect x="280" y="20" width="220" height="50" fill="#18181b" stroke="#10b981" stroke-width="1.5" rx="3"/>
            <text x="15" y="38" fill="#10b981" font-family="monospace" font-size="8" font-weight="700">CURRENT ROW N (Q2)</text>
            <text x="15" y="54" fill="#ffffff" font-family="monospace" font-size="9" font-weight="700">Sarah: $145,000</text>
            <text x="15" y="65" fill="#71717a" font-family="monospace" font-size="7.5">Delta = $145k - $145k = $0</text>

            <!-- Arrow to Next -->
            <g transform="translate(510, 45)">
              <path d="M 0 0 C 20 20, 40 20, 60 0" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="3,2"/>
              <text x="30" y="20" fill="#3b82f6" font-family="monospace" font-size="8" text-anchor="middle">LEAD(1) &darr;</text>
            </g>

            <!-- Future Row (LEAD) -->
            <rect x="580" y="25" width="130" height="40" fill="#121318" stroke="#3f3f46" rx="3"/>
            <text x="12" y="42" fill="#71717a" font-family="monospace" font-size="8">ROW N + 1 (Q3)</text>
            <text x="12" y="56" fill="#a1a1aa" font-family="monospace" font-size="8.5">Next Quarter</text>
          </g>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 06: SLIDING WINDOW FRAMES (ROWS BETWEEN)
  // ---------------------------------------------------------------------------
  {
    stepIndex: 6,
    id: 'window_sliding_frame',
    keyword: 'SLIDING FRAMES',
    title: 'Step 06: Bounded Sliding Frames (Moving Averages)',
    pillClass: 'pill-window',
    conceptHeading: 'Physical Frame Boundaries: ROWS BETWEEN N PRECEDING AND M FOLLOWING',
    conceptText: 'When calculating smoothing metrics like rolling 3-period moving averages, the engine must bound its aggregation to a sliding physical viewport. You explicitly define this using ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING. The frame automatically adjusts its physical width at the edges of partitions without overflowing.',
    sqlCode: `SELECT rep_id, name, quarter, revenue,\n       AVG(revenue) OVER (\n         ORDER BY revenue ASC\n         ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING\n       ) AS rolling_3_rep_avg\nFROM SalesPerformance;`,
    explanationPoints: [
      'ROWS operates on physical row offsets, regardless of value duplicates.',
      'At Row 1: The frame contains only [Current Row, 1 Following] (2 tuples).',
      'At Row N: The frame contains [1 Preceding, Current Row, 1 Following] (3 tuples).',
      'At Last Row: The frame contains only [1 Preceding, Current Row] (2 tuples).'
    ],
    gotcha: 'ROWS vs RANGE: Never use RANGE for moving averages! RANGE evaluates values, not row counts. If several rows have equal values, RANGE expands the frame to include all equal values, ruining your exact N-period smoothing window.',
    actionPrompt: 'Sliding a 3-row moving average viewport across the revenue spectrum:',
    transform: (rows) => {
      const sorted = [...rows].sort((a, b) => a.revenue - b.revenue);
      return sorted.map((r, idx) => {
        const start = Math.max(0, idx - 1);
        const end = Math.min(sorted.length - 1, idx + 1);
        const slice = sorted.slice(start, end + 1);
        const avg = Math.round(slice.reduce((s, x) => s + x.revenue, 0) / slice.length);
        return {
          name: r.name,
          revenue: `$${r.revenue.toLocaleString()}`,
          window_size: `${slice.length} rows`,
          rolling_avg: `$${avg.toLocaleString()}`,
          _status: slice.length === 3 ? 'passed' : 'loaded',
          _label: slice.length === 3 ? 'FULL 3-ROW FRAME' : 'EDGE ADAPTED'
        };
      });
    },
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#090a0d" rx="6" stroke="#232328"/>
        <!-- Sliding Window Visualizer -->
        <g transform="translate(30, 20)">
          <text x="0" y="16" fill="#ffffff" font-family="monospace" font-size="9.5" font-weight="700">SLIDING WINDOW: ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING</text>
          
          <g transform="translate(10, 35)">
            <!-- 5 items in a stream -->
            <rect x="0" y="30" width="90" height="35" fill="#121318" stroke="#27272a" rx="2"/>
            <text x="45" y="52" fill="#71717a" font-family="monospace" font-size="8" text-anchor="middle">Row 1 ($98k)</text>

            <rect x="110" y="30" width="90" height="35" fill="#121318" stroke="#27272a" rx="2"/>
            <text x="155" y="52" fill="#71717a" font-family="monospace" font-size="8" text-anchor="middle">Row 2 ($110k)</text>

            <!-- Active Viewport enclosing Rows 2, 3, 4 -->
            <rect x="210" y="10" width="330" height="75" fill="none" stroke="#10b981" stroke-width="2" rx="4" stroke-dasharray="6,4"/>
            <text x="375" y="24" fill="#10b981" font-family="monospace" font-size="8" font-weight="700" text-anchor="middle">ACTIVE SLIDING FRAME (3 ROWS)</text>

            <!-- Row 3: Preceding -->
            <rect x="220" y="30" width="95" height="35" fill="#18181b" stroke="#3f3f46" rx="2"/>
            <text x="267" y="47" fill="#a1a1aa" font-family="monospace" font-size="8" text-anchor="middle">Row 3 ($120k)</text>
            <text x="267" y="58" fill="#71717a" font-family="monospace" font-size="7" text-anchor="middle">1 PRECEDING</text>

            <!-- Row 4: Current -->
            <rect x="325" y="26" width="100" height="43" fill="#27272a" stroke="#ffffff" stroke-width="1.5" rx="2"/>
            <text x="375" y="45" fill="#ffffff" font-family="monospace" font-size="8.5" font-weight="700" text-anchor="middle">Row 4 ($135k)</text>
            <text x="375" y="59" fill="#10b981" font-family="monospace" font-size="7.5" font-weight="700" text-anchor="middle">CURRENT ROW</text>

            <!-- Row 5: Following -->
            <rect x="435" y="30" width="95" height="35" fill="#18181b" stroke="#3f3f46" rx="2"/>
            <text x="482" y="47" fill="#a1a1aa" font-family="monospace" font-size="8" text-anchor="middle">Row 5 ($145k)</text>
            <text x="482" y="58" fill="#71717a" font-family="monospace" font-size="7" text-anchor="middle">1 FOLLOWING</text>

            <rect x="560" y="30" width="90" height="35" fill="#121318" stroke="#27272a" rx="2"/>
            <text x="605" y="52" fill="#71717a" font-family="monospace" font-size="8" text-anchor="middle">Row 6 ($145k)</text>

            <g transform="translate(200, 100)">
              <text x="175" y="10" fill="#a1a1aa" font-family="monospace" font-size="8" text-anchor="middle">Avg(120k + 135k + 145k) / 3 = $133,333</text>
            </g>
          </g>
        </g>
      </svg>
    `
  },

  // ---------------------------------------------------------------------------
  // STEP 07: VALUE FUNCTIONS & THE LAST_VALUE TRAP
  // ---------------------------------------------------------------------------
  {
    stepIndex: 7,
    id: 'window_last_value',
    keyword: 'FIRST / LAST',
    title: 'Step 07: FIRST_VALUE(), LAST_VALUE() & The ANSI Frame Trap',
    pillClass: 'pill-window',
    conceptHeading: 'Why LAST_VALUE() Fails to Return the Partition Maximum Unless Explicitly Unbounded',
    conceptText: 'FIRST_VALUE() returns the first value in the current window frame. However, engineers routinely get burned by LAST_VALUE(): because the default frame terminates at CURRENT ROW, LAST_VALUE() simply returns the current row itself! To find the true end of the partition, you MUST explicitly specify: RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING.',
    sqlCode: `SELECT name, region, revenue,\n       FIRST_VALUE(revenue) OVER (\n         PARTITION BY region ORDER BY revenue DESC\n       ) AS highest_in_region,\n       LAST_VALUE(revenue) OVER (\n         PARTITION BY region ORDER BY revenue DESC\n         RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n       ) AS lowest_in_region\nFROM SalesPerformance;`,
    explanationPoints: [
      'FIRST_VALUE() works intuitively because row 1 is always within UNBOUNDED PRECEDING.',
      'LAST_VALUE() with default frame stops at CURRENT ROW, making it useless for finding the minimum/maximum.',
      'Adding UNBOUNDED FOLLOWING expands the frame to the true physical end of the partition.',
      'Enables high-water / low-water spread analysis in a single pass.'
    ],
    gotcha: 'THE DEADLY LAST_VALUE BUG: If you write LAST_VALUE(revenue) OVER (ORDER BY revenue), it will always equal the current row\'s revenue. 90% of candidates fail this question in tech screens.',
    actionPrompt: 'Benchmarking highest and lowest performers in each region using properly unbounded frames:',
    transform: (rows) => {
      const regionGroups = {};
      rows.forEach(r => {
        if (!regionGroups[r.region]) regionGroups[r.region] = [];
        regionGroups[r.region].push(r);
      });
      return rows.map(r => {
        const group = [...regionGroups[r.region]].sort((a, b) => b.revenue - a.revenue);
        const highest = group[0].revenue;
        const lowest = group[group.length - 1].revenue;
        return {
          name: r.name,
          region: r.region,
          revenue: `$${r.revenue.toLocaleString()}`,
          regional_highest: `$${highest.toLocaleString()}`,
          regional_lowest: `$${lowest.toLocaleString()}`,
          spread: `$${(highest - lowest).toLocaleString()}`,
          _status: r.revenue === highest ? 'passed' : (r.revenue === lowest ? 'rejected' : 'loaded'),
          _label: r.revenue === highest ? 'LEADER (FIRST_VAL)' : (r.revenue === lowest ? 'FLOOR (LAST_VAL)' : 'INTERMEDIATE')
        };
      });
    },
    svg: `
      <svg viewBox="0 0 780 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect width="780" height="180" fill="#090a0d" rx="6" stroke="#232328"/>
        <!-- Side-by-side: The LAST_VALUE default bug vs Corrected Unbounded -->
        <g transform="translate(30, 20)">
          <!-- Left: The Default Trap -->
          <g transform="translate(0, 0)">
            <rect width="340" height="140" rx="4" fill="#121318" stroke="#ef4444" stroke-width="1.2"/>
            <rect width="340" height="24" rx="4" fill="#18181b"/>
            <text x="12" y="16" fill="#ef4444" font-family="monospace" font-size="8.5" font-weight="700">&cross; THE DEFAULT LAST_VALUE TRAP</text>
            <g transform="translate(12, 34)">
              <text x="0" y="14" fill="#71717a" font-family="monospace" font-size="8">Frame: ... AND CURRENT ROW</text>
              <rect y="24" width="315" height="24" fill="#1c1917" stroke="#7f1d1d" rx="2"/>
              <text x="8" y="39" fill="#fca5a5" font-family="monospace" font-size="8">Row 2: LAST_VALUE() = Row 2 ($120k)</text>
              <rect y="54" width="315" height="24" fill="#1c1917" stroke="#7f1d1d" rx="2"/>
              <text x="8" y="69" fill="#fca5a5" font-family="monospace" font-size="8">Row 3: LAST_VALUE() = Row 3 ($98k)</text>
              <text x="0" y="94" fill="#ef4444" font-family="monospace" font-size="7.5">&bull; Cannot see future rows! Evaluates to itself &bull;</text>
            </g>
          </g>

          <!-- Right: The Correct Unbounded Fix -->
          <g transform="translate(370, 0)">
            <rect width="350" height="140" rx="4" fill="#121318" stroke="#10b981" stroke-width="1.2"/>
            <rect width="350" height="24" rx="4" fill="#18181b"/>
            <text x="12" y="16" fill="#10b981" font-family="monospace" font-size="8.5" font-weight="700">&check; THE UNBOUNDED FOLLOWING FIX</text>
            <g transform="translate(12, 34)">
              <text x="0" y="14" fill="#10b981" font-family="monospace" font-size="8">Frame: ... AND UNBOUNDED FOLLOWING</text>
              <rect y="24" width="325" height="24" fill="#064e3b" stroke="#059669" rx="2"/>
              <text x="8" y="39" fill="#6ee7b7" font-family="monospace" font-size="8">Row 2: LAST_VALUE() = Floor ($98k)</text>
              <rect y="54" width="325" height="24" fill="#064e3b" stroke="#059669" rx="2"/>
              <text x="8" y="69" fill="#6ee7b7" font-family="monospace" font-size="8">Row 3: LAST_VALUE() = Floor ($98k)</text>
              <text x="0" y="94" fill="#10b981" font-family="monospace" font-size="7.5">&bull; Sees through to partition boundary &bull;</text>
            </g>
          </g>
        </g>
      </svg>
    `
  }
];
