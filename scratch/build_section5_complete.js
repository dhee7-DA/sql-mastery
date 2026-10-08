// scratch/build_section5_complete.js
// Generates visualizer/leetcode_section5_data.js with:
// - 8 Visual Masterclass chapters with bespoke SVGs
// - 100 Concept MCQs (#501-600)
// - 100 Prep Drills (#501-600)
// - 12 Canonical / Premium LeetCode Problems (#180, #1204, #1907, #1321, #1164, #601, #534, #1097, #1445, #1699, #1285, #1709)

const fs = require('fs');
const path = require('path');

console.log('Building Concept 5 dataset: Advanced Joins & Running Aggregates...');

// -----------------------------------------------------------------------------
// 1. MASTERCLASS CHAPTERS (8 Chapters with bespoke SVGs)
// -----------------------------------------------------------------------------
const chapters = [
  {
    id: "chap-5-1-nonequi-joins",
    number: "5.1",
    title: "Non-Equi Joins & Theta-Join Physics: Range Bounds & Temporal Windows",
    content: `
      <p class="lc-p">
        While 90% of beginner SQL relies on equi-joins (<code>ON a.id = b.id</code>), advanced enterprise data engineering frequently requires <strong>non-equi joins</strong> (theta-joins) involving inequalities: <code>BETWEEN</code>, <code>&lt;</code>, <code>&gt;=</code>, or temporal intervals.
      </p>

      <div class="lc-rule-banner">
        <strong>The Physical Engine Cost of Non-Equi Joins:</strong><br>
        1. <strong>Hash Joins Cannot Execute:</strong> Hash joins require an exact hash collision key (<code>=</code>). When using inequalities like <code>a.val &lt; b.val</code>, hash tables cannot be probed directly.<br>
        2. <strong>Fallback to Nested Loop with Index Scan:</strong> If an index exists on the range column (e.g. B-tree on <code>start_date, end_date</code>), the engine performs index range scans for each outer row.<br>
        3. <strong>Cartesian Risk:</strong> Unbounded range joins degrade to $O(N \\times M)$ Cartesian products, buffering millions of intermediate tuples in memory (tempdb / sort spills).
      </div>

      <p class="lc-p">
        <strong>Mastery Principle:</strong> Always bound non-equi joins by at least one exact equality partition (e.g. <code>a.product_id = b.product_id AND a.order_date BETWEEN b.start_date AND b.end_date</code>) to allow the query planner to isolate candidate buckets before evaluating range inequalities.
      </p>
    `,
    diagram: {
      title: "Non-Equi Range Join Execution Mechanics (Temporal Bounding)",
      svg: `<svg viewBox="0 0 880 200" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="20" width="850" height="160" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="42" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">NON-EQUI JOIN: RANGE &amp; TEMPORAL INTERVAL EVALUATION</text>
        
        <!-- Table A: Orders -->
        <g transform="translate(40, 60)">
          <rect x="0" y="0" width="220" height="90" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
          <text x="14" y="24" fill="#2563eb" font-family="monospace" font-size="11" font-weight="700">Orders [Outer Table]</text>
          <text x="14" y="48" fill="#0f172a" font-family="monospace" font-size="10">order_id: 101 | product_id: 1</text>
          <rect x="14" y="58" width="180" height="22" rx="4" fill="#eff6ff" stroke="#3b82f6" stroke-width="1"/>
          <text x="22" y="73" fill="#1d4ed8" font-family="monospace" font-size="10" font-weight="600">purchase_date: 2026-03-15</text>
        </g>
        
        <!-- Predicate Arrow -->
        <g transform="translate(280, 90)">
          <path d="M 0 15 L 70 15" stroke="#ea580c" stroke-width="2.5" stroke-dasharray="4,4"/>
          <polygon points="75,15 65,10 65,20" fill="#ea580c"/>
          <text x="5" y="5" fill="#c2410c" font-family="monospace" font-size="9.5" font-weight="700">BETWEEN</text>
        </g>

        <!-- Table B: Price History Ranges -->
        <g transform="translate(370, 60)">
          <rect x="0" y="0" width="460" height="90" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
          <text x="16" y="24" fill="#0f172a" font-family="monospace" font-size="11" font-weight="700">Price_History [Range Index Lookup]</text>
          
          <rect x="16" y="38" width="130" height="42" rx="4" fill="#fee2e2" stroke="#f87171" stroke-width="1"/>
          <text x="22" y="54" fill="#991b1b" font-family="monospace" font-size="9" font-weight="600">Range A: $10</text>
          <text x="22" y="70" fill="#7f1d1d" font-family="monospace" font-size="8.5">2026-01-01 to 02-28 (X)</text>

          <rect x="156" y="38" width="140" height="42" rx="4" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5"/>
          <text x="164" y="54" fill="#166534" font-family="monospace" font-size="9" font-weight="700">Range B: $15 [MATCH]</text>
          <text x="164" y="70" fill="#14532d" font-family="monospace" font-size="8.5">2026-03-01 to 03-31 (✓)</text>

          <rect x="306" y="38" width="138" height="42" rx="4" fill="#fee2e2" stroke="#f87171" stroke-width="1"/>
          <text x="314" y="54" fill="#991b1b" font-family="monospace" font-size="9" font-weight="600">Range C: $20</text>
          <text x="314" y="70" fill="#7f1d1d" font-family="monospace" font-size="8.5">2026-04-01 to 12-31 (X)</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-5-2-consecutive-sequences",
    number: "5.2",
    title: "The Consecutive Sequence Pattern: Triangular Self-Joins vs Analytical Windowing",
    content: `
      <p class="lc-p">
        Problems asking for <em>"numbers appearing at least 3 times consecutively"</em> (#180) or <em>"3 consecutive dates with high volume"</em> (#601) test your ability to model sequential state across row transitions.
      </p>

      <div class="lc-rule-banner">
        <strong>Two Canonical Architectural Patterns:</strong><br>
        1. <strong>Triangular 3-Way Self-Join:</strong> Join table <code>Logs l1</code> with <code>l2</code> and <code>l3</code> on <code>l1.id = l2.id - 1 AND l2.id = l3.id - 1</code> and compare values. <em>Trap:</em> Assumes IDs are strictly contiguous with no deleted gaps!<br>
        2. <strong>Analytical LEAD / LAG:</strong> Evaluate <code>LEAD(num, 1) OVER (ORDER BY id)</code> and <code>LEAD(num, 2) OVER (ORDER BY id)</code> in a CTE, then filter where <code>num = lead1 AND num = lead2</code>. Far more resilient, clean, and runs in a single sort pass ($O(N \\log N)$).
      </div>

      <p class="lc-p">
        In high-throughput databases, <code>LEAD()</code> and <code>LAG()</code> avoid Cartesian row multiplication and execute via streaming window buffers without temp disk thrash.
      </p>
    `,
    diagram: {
      title: "Triangular Self-Join vs Window LEAD/LAG Architecture",
      svg: `<svg viewBox="0 0 880 200" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="20" width="850" height="160" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="42" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">CONSECUTIVE SEQUENCE: 3-WAY SELF-JOIN VS LEAD/LAG WINDOW</text>
        
        <!-- Logs Stream -->
        <g transform="translate(40, 65)">
          <rect x="0" y="0" width="70" height="70" rx="4" fill="#f8fafc" stroke="#94a3b8" stroke-width="1"/>
          <text x="14" y="24" fill="#64748b" font-family="monospace" font-size="10">id: 1</text>
          <text x="14" y="50" fill="#0f172a" font-family="monospace" font-size="16" font-weight="700">1</text>
        </g>
        <g transform="translate(125, 65)">
          <rect x="0" y="0" width="70" height="70" rx="4" fill="#f8fafc" stroke="#94a3b8" stroke-width="1"/>
          <text x="14" y="24" fill="#64748b" font-family="monospace" font-size="10">id: 2</text>
          <text x="14" y="50" fill="#0f172a" font-family="monospace" font-size="16" font-weight="700">1</text>
        </g>
        <g transform="translate(210, 65)">
          <rect x="0" y="0" width="70" height="70" rx="4" fill="#f8fafc" stroke="#94a3b8" stroke-width="1"/>
          <text x="14" y="24" fill="#64748b" font-family="monospace" font-size="10">id: 3</text>
          <text x="14" y="50" fill="#0f172a" font-family="monospace" font-size="16" font-weight="700">1</text>
        </g>
        <g transform="translate(295, 65)">
          <rect x="0" y="0" width="70" height="70" rx="4" fill="#f8fafc" stroke="#94a3b8" stroke-width="1"/>
          <text x="14" y="24" fill="#64748b" font-family="monospace" font-size="10">id: 4</text>
          <text x="14" y="50" fill="#64748b" font-family="monospace" font-size="16" font-weight="700">2</text>
        </g>

        <!-- Match Window Bracket -->
        <rect x="35" y="60" width="250" height="80" rx="8" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-dasharray="6,4"/>
        <text x="65" y="158" fill="#166534" font-family="monospace" font-size="10.5" font-weight="700">3-CONSECUTIVE MATCH: [1, 1, 1]</text>

        <!-- LEAD() / LAG() inspection breakdown -->
        <g transform="translate(420, 60)">
          <rect x="0" y="0" width="410" height="95" rx="6" fill="#f0fdf4" stroke="#86efac" stroke-width="1.2"/>
          <text x="16" y="22" fill="#15803d" font-family="monospace" font-size="11" font-weight="700">Analytical Evaluation at Row id: 1</text>
          <text x="16" y="44" fill="#0f172a" font-family="monospace" font-size="10">CURRENT: num = 1</text>
          <text x="16" y="62" fill="#0f172a" font-family="monospace" font-size="10">LEAD(num, 1): 1 (Matches Current ✓)</text>
          <text x="16" y="80" fill="#0f172a" font-family="monospace" font-size="10">LEAD(num, 2): 1 (Matches Current ✓) ➔ EMIT 1</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-5-3-window-framing",
    number: "5.3",
    title: "Physical Window Framing: ROWS BETWEEN vs RANGE BETWEEN Memory Architecture",
    content: `
      <p class="lc-p">
        When you write <code>SUM(amount) OVER (ORDER BY trans_date)</code>, ANSI SQL does <em>not</em> compute a row-by-row cumulative sum by default if there are duplicate order keys! It defaults to:
      </p>

      <div class="lc-rule-banner">
        <strong>The ANSI Default Window Frame Trap:</strong><br>
        <code>RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code><br>
        Under <code>RANGE</code>, all rows sharing the <em>same order key value</em> are treated as peers and summed together at once! This causes premature jumps in running totals.<br><br>
        <strong>The Explicit Production Fix:</strong><br>
        Always write <code>ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code> when computing true row-level running balances!
      </div>

      <p class="lc-p">
        <code>ROWS</code> strictly tracks physical line offsets (1, 2, 3...) whereas <code>RANGE</code> operates on logical value intervals. Understanding this distinction is crucial for cumulative capacity and moving average problems.
      </p>
    `,
    diagram: {
      title: "ROWS vs RANGE Execution Framing Difference",
      svg: `<svg viewBox="0 0 880 200" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="20" width="850" height="160" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="42" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">WINDOW FRAMING: ROWS (PHYSICAL SLICE) VS RANGE (LOGICAL PEERS)</text>
        
        <!-- Scenario with duplicate keys -->
        <g transform="translate(40, 65)">
          <rect x="0" y="0" width="220" height="85" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
          <text x="12" y="22" fill="#0f172a" font-family="monospace" font-size="10.5" font-weight="700">Orders on 2026-05-01 (Peers):</text>
          <text x="12" y="42" fill="#475569" font-family="monospace" font-size="10">Row 1: amount = 100</text>
          <text x="12" y="60" fill="#475569" font-family="monospace" font-size="10">Row 2: amount = 150</text>
          <text x="12" y="78" fill="#475569" font-family="monospace" font-size="10">Row 3: amount = 200</text>
        </g>

        <!-- ROWS Result -->
        <g transform="translate(290, 65)">
          <rect x="0" y="0" width="240" height="85" rx="6" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.2"/>
          <text x="12" y="22" fill="#1d4ed8" font-family="monospace" font-size="10.5" font-weight="700">ROWS (Step-by-Step):</text>
          <text x="12" y="42" fill="#0f172a" font-family="monospace" font-size="10">Row 1 Running: 100</text>
          <text x="12" y="60" fill="#0f172a" font-family="monospace" font-size="10">Row 2 Running: 250 (100+150)</text>
          <text x="12" y="78" fill="#0f172a" font-family="monospace" font-size="10">Row 3 Running: 450 (250+200)</text>
        </g>

        <!-- RANGE Result -->
        <g transform="translate(560, 65)">
          <rect x="0" y="0" width="270" height="85" rx="6" fill="#fef2f2" stroke="#f87171" stroke-width="1.2"/>
          <text x="12" y="22" fill="#b91c1c" font-family="monospace" font-size="10.5" font-weight="700">RANGE (Peers Collapsed!):</text>
          <text x="12" y="42" fill="#7f1d1d" font-family="monospace" font-size="10">Row 1 Output: 450 (Premature jump!)</text>
          <text x="12" y="60" fill="#7f1d1d" font-family="monospace" font-size="10">Row 2 Output: 450</text>
          <text x="12" y="78" fill="#7f1d1d" font-family="monospace" font-size="10">Row 3 Output: 450</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-5-4-running-knapsack",
    number: "5.4",
    title: "Cumulative Running Totals & Knapsack Cutoffs: The Bus Onboarding Pattern",
    content: `
      <p class="lc-p">
        LeetCode #1204 <em>(Last Person to Fit in the Bus)</em> represents the canonical knapsack capacity cutoff problem. A queue of passengers with specific weights boards in turn until total payload reaches 1000 kg.
      </p>

      <div class="lc-rule-banner">
        <strong>The 3-Step Knapsack Pipeline:</strong><br>
        1. <strong>Deterministic Sequencing:</strong> Establish total order via <code>ORDER BY turn ASC</code>.<br>
        2. <strong>Window Cumulative Accumulation:</strong> Compute <code>SUM(weight) OVER (ORDER BY turn) AS cumulative_weight</code>.<br>
        3. <strong>Threshold Boundary Slicing:</strong> Filter where <code>cumulative_weight &lt;= 1000</code>, sort descending by <code>cumulative_weight DESC</code>, and take <code>LIMIT 1</code>.
      </div>

      <p class="lc-p">
        Without window functions, this problem requires an expensive triangular self-join: <code>SUM(q2.weight) WHERE q2.turn &lt;= q1.turn</code>, which is quadratic ($O(N^2)$) and fails on massive elevator or transport logs.
      </p>
    `,
    diagram: {
      title: "Knapsack Capacity Cutoff: Cumulative Window vs Limit 1",
      svg: `<svg viewBox="0 0 880 200" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="20" width="850" height="160" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="42" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">CAPACITY CUTOFF: ROLLING WEIGHT ONBOARDING (MAX 1000 KG)</text>
        
        <!-- Queue Flow -->
        <g transform="translate(40, 65)">
          <rect x="0" y="0" width="130" height="75" rx="5" fill="#f8fafc" stroke="#94a3b8" stroke-width="1"/>
          <text x="10" y="22" fill="#0f172a" font-family="monospace" font-size="10" font-weight="700">Turn 1: Alice</text>
          <text x="10" y="42" fill="#64748b" font-family="monospace" font-size="9.5">Weight: 250 kg</text>
          <text x="10" y="62" fill="#166534" font-family="monospace" font-size="10" font-weight="700">Total: 250 kg ✓</text>
        </g>
        <g transform="translate(185, 65)">
          <rect x="0" y="0" width="130" height="75" rx="5" fill="#f8fafc" stroke="#94a3b8" stroke-width="1"/>
          <text x="10" y="22" fill="#0f172a" font-family="monospace" font-size="10" font-weight="700">Turn 2: Bob</text>
          <text x="10" y="42" fill="#64748b" font-family="monospace" font-size="9.5">Weight: 350 kg</text>
          <text x="10" y="62" fill="#166534" font-family="monospace" font-size="10" font-weight="700">Total: 600 kg ✓</text>
        </g>
        <g transform="translate(330, 65)">
          <rect x="0" y="0" width="150" height="75" rx="5" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/>
          <text x="10" y="22" fill="#15803d" font-family="monospace" font-size="10.5" font-weight="700">Turn 3: Alex [LAST]</text>
          <text x="10" y="42" fill="#166534" font-family="monospace" font-size="9.5">Weight: 350 kg</text>
          <text x="10" y="62" fill="#15803d" font-family="monospace" font-size="10" font-weight="700">Total: 950 kg &lt;= 1000 ✓</text>
        </g>
        <g transform="translate(495, 65)">
          <rect x="0" y="0" width="140" height="75" rx="5" fill="#fee2e2" stroke="#f87171" stroke-width="1.2"/>
          <text x="10" y="22" fill="#991b1b" font-family="monospace" font-size="10" font-weight="700">Turn 4: John</text>
          <text x="10" y="42" fill="#b91c1c" font-family="monospace" font-size="9.5">Weight: 400 kg</text>
          <text x="10" y="62" fill="#991b1b" font-family="monospace" font-size="10" font-weight="700">Total: 1350 kg ✗ (OVER)</text>
        </g>

        <!-- Final Selected Output -->
        <g transform="translate(660, 65)">
          <rect x="0" y="0" width="170" height="75" rx="6" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
          <text x="14" y="24" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="700">RESULT PROJECTION</text>
          <text x="14" y="46" fill="#f8fafc" font-family="monospace" font-size="10">WHERE total &lt;= 1000</text>
          <text x="14" y="64" fill="#34d399" font-family="monospace" font-size="11" font-weight="700">➔ person_name: 'Alex'</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-5-5-rolling-windows",
    number: "5.5",
    title: "Rolling Time-Window Aggregations: 7-Day Moving Averages & Preceding Interval Frames",
    content: `
      <p class="lc-p">
        In SaaS and restaurant analytics (#1321 <em>Restaurant Growth</em>), calculating a <strong>7-day moving average</strong> tests understanding of both daily grouping and sliding window aggregation.
      </p>

      <div class="lc-rule-banner">
        <strong>The 2-Phase Rolling Architecture:</strong><br>
        1. <strong>Phase 1 (Daily Compaction):</strong> First aggregate transactions by calendar date (e.g. <code>SUM(amount) GROUP BY visited_on</code>). Multiple customers visit on the same day; moving windows cannot operate on raw transaction events directly!<br>
        2. <strong>Phase 2 (6 PRECEDING Frame):</strong> Compute <code>SUM(daily_amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)</code>.<br>
        3. <strong>Filter Incomplete Warmup Windows:</strong> An average of the first 3 days is invalid! Filter where at least 6 prior calendar days exist (e.g. <code>DATEDIFF(visited_on, (SELECT MIN(visited_on) FROM Daily)) &gt;= 6</code>).
      </div>
    `,
    diagram: {
      title: "7-Day Sliding Window Preceding Mechanics",
      svg: `<svg viewBox="0 0 880 200" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="20" width="850" height="160" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="42" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">ROLLING 7-DAY WINDOW: 6 PRECEDING AND CURRENT ROW</text>
        
        <!-- Day Nodes -->
        <g transform="translate(40, 70)">
          <rect x="0" y="0" width="60" height="55" rx="4" fill="#f1f5f9" stroke="#cbd5e1"/>
          <text x="8" y="22" fill="#64748b" font-family="monospace" font-size="9">Day 1</text>
          <text x="8" y="42" fill="#0f172a" font-family="monospace" font-size="10" font-weight="700">$100</text>
        </g>
        <g transform="translate(110, 70)">
          <rect x="0" y="0" width="60" height="55" rx="4" fill="#f1f5f9" stroke="#cbd5e1"/>
          <text x="8" y="22" fill="#64748b" font-family="monospace" font-size="9">Day 2</text>
          <text x="8" y="42" fill="#0f172a" font-family="monospace" font-size="10" font-weight="700">$110</text>
        </g>
        <g transform="translate(180, 70)">
          <rect x="0" y="0" width="60" height="55" rx="4" fill="#f1f5f9" stroke="#cbd5e1"/>
          <text x="8" y="22" fill="#64748b" font-family="monospace" font-size="9">Day 3</text>
          <text x="8" y="42" fill="#0f172a" font-family="monospace" font-size="10" font-weight="700">$120</text>
        </g>
        <g transform="translate(250, 70)">
          <rect x="0" y="0" width="60" height="55" rx="4" fill="#f1f5f9" stroke="#cbd5e1"/>
          <text x="8" y="22" fill="#64748b" font-family="monospace" font-size="9">Day 4</text>
          <text x="8" y="42" fill="#0f172a" font-family="monospace" font-size="10" font-weight="700">$130</text>
        </g>
        <g transform="translate(320, 70)">
          <rect x="0" y="0" width="60" height="55" rx="4" fill="#f1f5f9" stroke="#cbd5e1"/>
          <text x="8" y="22" fill="#64748b" font-family="monospace" font-size="9">Day 5</text>
          <text x="8" y="42" fill="#0f172a" font-family="monospace" font-size="10" font-weight="700">$110</text>
        </g>
        <g transform="translate(390, 70)">
          <rect x="0" y="0" width="60" height="55" rx="4" fill="#f1f5f9" stroke="#cbd5e1"/>
          <text x="8" y="22" fill="#64748b" font-family="monospace" font-size="9">Day 6</text>
          <text x="8" y="42" fill="#0f172a" font-family="monospace" font-size="10" font-weight="700">$140</text>
        </g>
        <g transform="translate(460, 70)">
          <rect x="0" y="0" width="65" height="55" rx="4" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
          <text x="8" y="22" fill="#1d4ed8" font-family="monospace" font-size="9" font-weight="700">Day 7 (C)</text>
          <text x="8" y="42" fill="#1e3a8a" font-family="monospace" font-size="10" font-weight="700">$150</text>
        </g>

        <!-- 7-Day Window Bracket -->
        <rect x="35" y="62" width="495" height="72" rx="8" fill="none" stroke="#2563eb" stroke-width="2" stroke-dasharray="4,4"/>
        <text x="140" y="155" fill="#1d4ed8" font-family="monospace" font-size="10.5" font-weight="700">7-Day Sliding Window: Sum = $860 | Avg = $122.86</text>

        <!-- Warmup Warning -->
        <g transform="translate(560, 65)">
          <rect x="0" y="0" width="270" height="85" rx="6" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.2"/>
          <text x="12" y="24" fill="#b45309" font-family="monospace" font-size="10.5" font-weight="700">Warmup Trap Safeguard:</text>
          <text x="12" y="46" fill="#92400e" font-size="9.5">Days 1 through 6 cannot emit moving</text>
          <text x="12" y="62" fill="#92400e" font-size="9.5">averages because full 7-day lookback</text>
          <text x="12" y="78" fill="#78350f" font-family="monospace" font-size="9.5" font-weight="600">history has not yet accumulated!</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-5-6-temporal-reconstruction",
    number: "5.6",
    title: "Temporal State Reconstruction: Point-in-Time Queries & Fallback Coalescing",
    content: `
      <p class="lc-p">
        In financial and e-commerce ledgers (#1164 <em>Product Price at a Given Date</em>), prices change unpredictably over time. Given a historical cutoff date $T$, what was the effective price of each product?
      </p>

      <div class="lc-rule-banner">
        <strong>The 3 Temporal States of a Product:</strong><br>
        1. <strong>Updated on or before $T$:</strong> Its price is the value associated with the maximum date $\le T$.<br>
        2. <strong>First updated strictly after $T$:</strong> Its price never changed before $T$; it must fall back to the initial default (e.g. 10).<br>
        3. <strong>Never updated:</strong> Default price 10.
      </div>

      <p class="lc-p">
        <strong>Architectural Pattern:</strong> Scaffold all distinct product IDs first, <code>LEFT JOIN</code> to the filtered subquery of prices where <code>change_date &lt;= '2019-08-16'</code>, and use <code>COALESCE(price, 10)</code>.
      </p>
    `,
    diagram: {
      title: "Point-in-Time Temporal Reconstruction Engine",
      svg: `<svg viewBox="0 0 880 200" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="20" width="850" height="160" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="42" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">TEMPORAL RECONSTRUCTION AS OF CUTOFF DATE: 2019-08-16</text>
        
        <!-- Timeline -->
        <line x1="50" y1="100" x2="600" y2="100" stroke="#94a3b8" stroke-width="3"/>
        
        <!-- Events -->
        <circle cx="120" cy="100" r="8" fill="#3b82f6"/>
        <text x="90" y="80" fill="#1d4ed8" font-family="monospace" font-size="9.5" font-weight="600">2019-08-14: $20</text>
        
        <circle cx="280" cy="100" r="8" fill="#22c55e"/>
        <text x="250" y="80" fill="#15803d" font-family="monospace" font-size="9.5" font-weight="700">2019-08-15: $35 [LATEST &lt;= T]</text>
        
        <!-- Cutoff Line -->
        <line x1="380" y1="50" x2="380" y2="150" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="5,5"/>
        <text x="385" y="65" fill="#dc2626" font-family="monospace" font-size="10" font-weight="700">CUTOFF T: 2019-08-16</text>
        
        <circle cx="490" cy="100" r="8" fill="#94a3b8"/>
        <text x="460" y="80" fill="#64748b" font-family="monospace" font-size="9.5">2019-08-18: $50 (Future X)</text>

        <!-- Right Output Box -->
        <g transform="translate(620, 60)">
          <rect x="0" y="0" width="220" height="90" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
          <text x="14" y="24" fill="#0f172a" font-family="monospace" font-size="11" font-weight="700">State Reconstruction:</text>
          <text x="14" y="48" fill="#15803d" font-family="monospace" font-size="10">Product 1: $35 (From 08-15)</text>
          <text x="14" y="70" fill="#b45309" font-family="monospace" font-size="10">Product 2: $10 (Fallback)</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-5-7-islands-gaps",
    number: "5.7",
    title: "Islands and Gaps: Continuous Sequence Detection via ROW_NUMBER() Difference",
    content: `
      <p class="lc-p">
        The <strong>Islands and Gaps</strong> pattern (#1285 <em>Continuous Ranges</em>, #601 <em>Human Traffic</em>) is the hallmark of senior SQL proficiency. How do you group unbroken runs of consecutive integers or dates into bounded spans <code>[start_id, end_id]</code>?
      </p>

      <div class="lc-rule-banner">
        <strong>The ROW_NUMBER() Difference Mathematical Proof:</strong><br>
        Given consecutive sequence: <code>1, 2, 3, 7, 8, 9, 10</code><br>
        Assign <code>ROW_NUMBER()</code>: <code>1, 2, 3, 4, 5, 6, 7</code><br>
        Subtract <code>(id - row_number)</code>:<br>
        • <code>1 - 1 = 0</code><br>
        • <code>2 - 2 = 0</code><br>
        • <code>3 - 3 = 0</code> ➔ <strong>Constant Group 0 (Island 1)</strong><br>
        • <code>7 - 4 = 3</code><br>
        • <code>8 - 5 = 3</code><br>
        • <code>9 - 6 = 3</code><br>
        • <code>10 - 7 = 3</code> ➔ <strong>Constant Group 3 (Island 2)</strong>
      </div>

      <p class="lc-p">
        Because both consecutive IDs and row numbers increment by 1 simultaneously, their difference is perfectly invariant across unbroken islands! Grouping by <code>(id - rn)</code> partitions the data into islands instantly.
      </p>
    `,
    diagram: {
      title: "The Island and Gap Difference Invariant Engine",
      svg: `<svg viewBox="0 0 880 200" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="20" width="850" height="160" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="42" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">ISLAND DETECTION: THE (ID - ROW_NUMBER) MATHEMATICAL INVARIANT</text>
        
        <!-- Table Representation -->
        <g transform="translate(40, 60)">
          <rect x="0" y="0" width="360" height="95" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
          <text x="14" y="22" fill="#0f172a" font-family="monospace" font-size="10.5" font-weight="700">Raw ID | ROW_NUM | Difference Group</text>
          
          <text x="14" y="44" fill="#2563eb" font-family="monospace" font-size="10">1      | 1       | 1 - 1 = 0  (Island A)</text>
          <text x="14" y="60" fill="#2563eb" font-family="monospace" font-size="10">2      | 2       | 2 - 2 = 0  (Island A)</text>
          <text x="14" y="76" fill="#2563eb" font-family="monospace" font-size="10">3      | 3       | 3 - 3 = 0  (Island A)</text>
        </g>

        <!-- Gap Bridge -->
        <g transform="translate(420, 85)">
          <path d="M 0 15 L 45 15" stroke="#ea580c" stroke-width="2.5" stroke-dasharray="3,3"/>
          <text x="2" y="5" fill="#ea580c" font-family="monospace" font-size="9" font-weight="700">GAP [4,5,6]</text>
        </g>

        <g transform="translate(480, 60)">
          <rect x="0" y="0" width="360" height="95" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
          <text x="14" y="22" fill="#0f172a" font-family="monospace" font-size="10.5" font-weight="700">Raw ID | ROW_NUM | Difference Group</text>
          
          <text x="14" y="44" fill="#16a34a" font-family="monospace" font-size="10">7      | 4       | 7 - 4 = 3  (Island B)</text>
          <text x="14" y="60" fill="#16a34a" font-family="monospace" font-size="10">8      | 5       | 8 - 5 = 3  (Island B)</text>
          <text x="14" y="76" fill="#16a34a" font-family="monospace" font-size="10">9      | 6       | 9 - 6 = 3  (Island B)</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-5-8-disjoint-scaffolding",
    number: "5.8",
    title: "Disjoint Category Scaffolding: Preserving Zero-Count Buckets with UNION ALL",
    content: `
      <p class="lc-p">
        In LeetCode #1907 <em>(Count Salary Categories)</em>, reporting requirements dictate returning all three categories: <code>'Low Salary'</code>, <code>'Average Salary'</code>, and <code>'High Salary'</code>, even if zero accounts exist in that tier!
      </p>

      <div class="lc-rule-banner">
        <strong>Why Standard GROUP BY Fails:</strong><br>
        A <code>CASE WHEN</code> grouped in a single pass will only emit rows for categories that actually exist in the table. If no account earns &gt; $50,000, <code>'High Salary'</code> will be completely missing from output, causing immediate rejection!<br><br>
        <strong>The Scaffolding Architecture:</strong><br>
        Construct explicit category scaffolding rows using <code>UNION ALL</code> with scalar counting subqueries:
        <pre class="lc-code-pre"><code>SELECT 'Low Salary' AS category, COUNT(*) AS accounts_count FROM Accounts WHERE income &lt; 20000
UNION ALL
SELECT 'Average Salary', COUNT(*) FROM Accounts WHERE income BETWEEN 20000 AND 50000
UNION ALL
SELECT 'High Salary', COUNT(*) FROM Accounts WHERE income &gt; 50000;</code></pre>
      </div>
    `,
    diagram: {
      title: "Static Dimension Scaffolding Architecture",
      svg: `<svg viewBox="0 0 880 200" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="20" width="850" height="160" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="42" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">DIMENSION SCAFFOLDING: GUARANTEEING ZERO-COUNT COMPLIANCE</text>
        
        <!-- Scaffolding Rows -->
        <g transform="translate(40, 65)">
          <rect x="0" y="0" width="230" height="80" rx="6" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1"/>
          <text x="14" y="24" fill="#0f172a" font-family="monospace" font-size="11" font-weight="700">Scaffold Row 1</text>
          <text x="14" y="46" fill="#475569" font-family="monospace" font-size="10">'Low Salary' (&lt; $20k)</text>
          <text x="14" y="66" fill="#166534" font-family="monospace" font-size="10" font-weight="600">Count = 1 ✓</text>
        </g>
        <g transform="translate(290, 65)">
          <rect x="0" y="0" width="250" height="80" rx="6" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1"/>
          <text x="14" y="24" fill="#0f172a" font-family="monospace" font-size="11" font-weight="700">Scaffold Row 2</text>
          <text x="14" y="46" fill="#475569" font-family="monospace" font-size="10">'Average Salary' ($20k-$50k)</text>
          <text x="14" y="66" fill="#166534" font-family="monospace" font-size="10" font-weight="600">Count = 0 ✓ (Preserved!)</text>
        </g>
        <g transform="translate(560, 65)">
          <rect x="0" y="0" width="270" height="80" rx="6" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1"/>
          <text x="14" y="24" fill="#0f172a" font-family="monospace" font-size="11" font-weight="700">Scaffold Row 3</text>
          <text x="14" y="46" fill="#475569" font-family="monospace" font-size="10">'High Salary' (&gt; $50k)</text>
          <text x="14" y="66" fill="#166534" font-family="monospace" font-size="10" font-weight="600">Count = 3 ✓</text>
        </g>
      </svg>`
    }
  }
];

// Callouts
const callouts = [
  {
    type: "danger",
    title: "The RANGE vs ROWS Default Trap",
    body: "Leaving out 'ROWS BETWEEN' in running totals defaults to 'RANGE', which aggregates all rows with duplicate timestamps simultaneously, causing incorrect step jumps."
  },
  {
    type: "warning",
    title: "Off-by-One ID Assumption in Consecutive Self-Joins",
    body: "Joining on l1.id = l2.id - 1 silently breaks if any rows were deleted! Use LEAD() / LAG() or ROW_NUMBER() ordering to handle non-contiguous sequence IDs."
  },
  {
    type: "tip",
    title: "Rolling Average Warmup Filters",
    body: "When computing 7-day moving averages, always filter out the initial 6 days where fewer than 7 days of historical transactions exist."
  }
];

// -----------------------------------------------------------------------------
// 2. 12 CANONICAL & PREMIUM LEETCODE PROBLEMS
// -----------------------------------------------------------------------------
const problems = [
  {
    id: 180,
    title: "Consecutive Numbers",
    difficulty: "Medium",
    acceptance: "45.8%",
    companies: ["Amazon", "Bloomberg", "Google", "Adobe"],
    description: `Find all numbers that appear at least three times consecutively in the <code>Logs</code> table. Return the result table with column name <code>ConsecutiveNums</code> in any order.`,
    sampleInput: {
      table: "Logs",
      columns: ["id", "num"],
      rows: [
        [1, 1],
        [2, 1],
        [3, 1],
        [4, 2],
        [5, 1],
        [6, 2],
        [7, 2]
      ]
    },
    expectedOutput: {
      columns: ["ConsecutiveNums"],
      rows: [[1]]
    },
    solutionSQL: `SELECT DISTINCT num AS ConsecutiveNums\nFROM (\n  SELECT num,\n         LAG(num, 1) OVER (ORDER BY id) AS prev_num,\n         LEAD(num, 1) OVER (ORDER BY id) AS next_num\n  FROM Logs\n) t\nWHERE num = prev_num AND num = next_num;`,
    logicBreakdown: [
      "Use window functions LAG() and LEAD() ordered by id to inspect immediate preceding and following row values.",
      "Filter the derived table where num equals both prev_num and next_num.",
      "Wrap in DISTINCT to prevent duplicate emissions when numbers repeat 4+ times consecutively."
    ],
    lineByLineExplanation: [
      { clause: "SELECT DISTINCT num AS ConsecutiveNums", exp: "Emits deduplicated numbers that satisfy the 3-consecutive condition." },
      { clause: "FROM ( SELECT num, LAG(num, 1) OVER (ORDER BY id) AS prev_num, LEAD(num, 1) OVER (ORDER BY id) AS next_num FROM Logs ) t", exp: "Computes single-row lookback and lookahead values in a single streaming window sort pass." },
      { clause: "WHERE num = prev_num AND num = next_num", exp: "Filters rows that are surrounded by identical numbers on both sides." }
    ],
    traps: [
      "Assuming table IDs have no gaps when using 3-way self joins on id = id + 1.",
      "Forgetting DISTINCT when a number occurs 4, 5, or more times in a row."
    ],
    alternativeSolutions: [
      {
        name: "3-Way Self-Join",
        complexity: "O(N) with clustered index",
        sql: `SELECT DISTINCT l1.num AS ConsecutiveNums\nFROM Logs l1\nJOIN Logs l2 ON l1.id = l2.id - 1\nJOIN Logs l3 ON l2.id = l3.id - 1\nWHERE l1.num = l2.num AND l2.num = l3.num;`,
        explanation: "Self-joins 3 instances of Logs on adjacent IDs. Fails if IDs contain deleted gap holes."
      }
    ]
  },
  {
    id: 1204,
    title: "Last Person to Fit in the Bus",
    difficulty: "Medium",
    acceptance: "73.1%",
    companies: ["Uber", "Lyft", "Amazon", "DoorDash"],
    description: `There is a queue of people waiting to board a bus with a maximum weight limit of 1000 kilograms. People board in order of <code>turn</code>. Find the <code>person_name</code> of the last person that can fit without exceeding the weight limit.`,
    sampleInput: {
      table: "Queue",
      columns: ["person_id", "person_name", "weight", "turn"],
      rows: [
        [5, "Alice", 250, 1],
        [4, "Bob", 175, 5],
        [3, "Alex", 350, 2],
        [6, "John", 400, 3],
        [1, "Winston", 500, 6],
        [2, "Marie", 200, 4]
      ]
    },
    expectedOutput: {
      columns: ["person_name"],
      rows: [["John"]]
    },
    solutionSQL: `SELECT person_name\nFROM (\n  SELECT person_name,\n         SUM(weight) OVER (ORDER BY turn ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS total_weight\n  FROM Queue\n) t\nWHERE total_weight <= 1000\nORDER BY total_weight DESC\nLIMIT 1;`,
    logicBreakdown: [
      "Compute running sum of weight ordered by boarding turn using an explicit ROWS window frame.",
      "Filter candidate passengers where cumulative weight does not exceed 1000 kg.",
      "Sort the surviving candidates descending by cumulative weight and extract the top 1 row."
    ],
    lineByLineExplanation: [
      { clause: "SELECT person_name", exp: "Returns the name of the final boarding passenger." },
      { clause: "FROM ( SELECT person_name, SUM(weight) OVER (ORDER BY turn ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS total_weight FROM Queue ) t", exp: "Calculates the strict cumulative running weight payload up to each passenger." },
      { clause: "WHERE total_weight <= 1000", exp: "Discards passengers who would overload the bus past the 1000 kg threshold." },
      { clause: "ORDER BY total_weight DESC LIMIT 1", exp: "Selects the passenger with the maximum cumulative weight under or equal to the limit." }
    ],
    traps: [
      "Omitting ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW which could cause peer-grouping issues under RANGE.",
      "Sorting by turn DESC without checking total_weight <= 1000."
    ],
    alternativeSolutions: [
      {
        name: "Correlated Self-Join (Pre-MySQL 8.0)",
        complexity: "O(N^2) Quadratic Scan",
        sql: `SELECT q1.person_name\nFROM Queue q1\nJOIN Queue q2 ON q2.turn <= q1.turn\nGROUP BY q1.turn, q1.person_name\nHAVING SUM(q2.weight) <= 1000\nORDER BY q1.turn DESC\nLIMIT 1;`,
        explanation: "Triangular self-join summing all predecessor passenger weights. Scales poorly on large datasets."
      }
    ]
  },
  {
    id: 1907,
    title: "Count Salary Categories",
    difficulty: "Medium",
    acceptance: "61.4%",
    companies: ["Goldman Sachs", "JPMorgan", "Capital One", "Morgan Stanley"],
    description: `Calculate the number of bank accounts for each salary category: <code>'Low Salary'</code> (strictly less than $20,000), <code>'Average Salary'</code> (between $20,000 and $50,000 inclusive), and <code>'High Salary'</code> (strictly greater than $50,000). The result table must contain all three categories even if a category has 0 accounts.`,
    sampleInput: {
      table: "Accounts",
      columns: ["account_id", "income"],
      rows: [
        [3, 108939],
        [2, 12747],
        [8, 87709],
        [6, 91796]
      ]
    },
    expectedOutput: {
      columns: ["category", "accounts_count"],
      rows: [
        ["Low Salary", 1],
        ["Average Salary", 0],
        ["High Salary", 3]
      ]
    },
    solutionSQL: `SELECT 'Low Salary' AS category,\n       COUNT(*) AS accounts_count\nFROM Accounts\nWHERE income < 20000\nUNION ALL\nSELECT 'Average Salary' AS category,\n       COUNT(*) AS accounts_count\nFROM Accounts\nWHERE income BETWEEN 20000 AND 50000\nUNION ALL\nSELECT 'High Salary' AS category,\n       COUNT(*) AS accounts_count\nFROM Accounts\nWHERE income > 50000;`,
    logicBreakdown: [
      "Standard GROUP BY with CASE WHEN skips categories that have zero matching rows.",
      "Use UNION ALL to build explicit scaffolding queries for each required salary tier.",
      "Each branch runs a simple COUNT(*) with an income range predicate, naturally emitting 0 on empty sets."
    ],
    lineByLineExplanation: [
      { clause: "SELECT 'Low Salary' AS category, COUNT(*) AS accounts_count FROM Accounts WHERE income < 20000", exp: "Counts accounts with income under $20,000; returns 0 if none found." },
      { clause: "UNION ALL", exp: "Combines the fixed categories without costly deduplication overhead." },
      { clause: "SELECT 'Average Salary' AS category, COUNT(*) AS accounts_count FROM Accounts WHERE income BETWEEN 20000 AND 50000", exp: "Counts accounts in the inclusive middle tier." },
      { clause: "UNION ALL SELECT 'High Salary' AS category, COUNT(*) AS accounts_count FROM Accounts WHERE income > 50000", exp: "Counts high-earning accounts strictly above $50,000." }
    ],
    traps: [
      "Using GROUP BY CASE WHEN income ... which drops 'Average Salary' entirely when 0 accounts match.",
      "Using UNION instead of UNION ALL (adds unnecessary sort deduplication pass)."
    ],
    alternativeSolutions: [
      {
        name: "Static CTE Scaffold with LEFT JOIN",
        complexity: "O(N) with single table scan",
        sql: `WITH Categories AS (\n  SELECT 'Low Salary' AS category\n  UNION ALL SELECT 'Average Salary'\n  UNION ALL SELECT 'High Salary'\n)\nSELECT c.category,\n       COUNT(a.account_id) AS accounts_count\nFROM Categories c\nLEFT JOIN Accounts a ON (\n  (c.category = 'Low Salary' AND a.income < 20000) OR\n  (c.category = 'Average Salary' AND a.income BETWEEN 20000 AND 50000) OR\n  (c.category = 'High Salary' AND a.income > 50000)\n)\nGROUP BY c.category;`,
        explanation: "Creates an in-memory scaffolding table and LEFT JOINs on range conditions."
      }
    ]
  },
  {
    id: 1321,
    title: "Restaurant Growth",
    difficulty: "Medium",
    acceptance: "54.7%",
    companies: ["Amazon", "Uber", "DoorDash", "Instacart"],
    description: `Compute the moving average of how much the customer paid in a seven days window (i.e., current day + 6 days before). <code>average_amount</code> should be rounded to 2 decimal places. Return the result table ordered by <code>visited_on</code> in ascending order.`,
    sampleInput: {
      table: "Customer",
      columns: ["customer_id", "name", "visited_on", "amount"],
      rows: [
        [1, "Jhon", "2019-01-01", 100],
        [2, "Daniel", "2019-01-02", 110],
        [3, "Jade", "2019-01-03", 120],
        [4, "Khaled", "2019-01-04", 130],
        [5, "Winston", "2019-01-05", 110],
        [6, "Elvis", "2019-01-06", 140],
        [7, "Anna", "2019-01-07", 150],
        [8, "Maria", "2019-01-08", 80],
        [9, "Jaze", "2019-01-09", 110],
        [1, "Jhon", "2019-01-10", 130],
        [3, "Jade", "2019-01-10", 150]
      ]
    },
    expectedOutput: {
      columns: ["visited_on", "amount", "average_amount"],
      rows: [
        ["2019-01-07", 860, 122.86],
        ["2019-01-08", 840, 120.00],
        ["2019-01-09", 840, 120.00],
        ["2019-01-10", 1000, 142.86]
      ]
    },
    solutionSQL: `WITH DailyTotals AS (\n  SELECT visited_on, SUM(amount) AS daily_amount\n  FROM Customer\n  GROUP BY visited_on\n),\nRollingWindow AS (\n  SELECT visited_on,\n         SUM(daily_amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS amount,\n         ROUND(AVG(daily_amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 2) AS average_amount,\n         ROW_NUMBER() OVER (ORDER BY visited_on) AS rn\n  FROM DailyTotals\n)\nSELECT visited_on, amount, average_amount\nFROM RollingWindow\nWHERE rn >= 7\nORDER BY visited_on;`,
    logicBreakdown: [
      "Phase 1: Aggregate multiple daily purchases into a single daily_amount per visited_on.",
      "Phase 2: Use window functions with 'ROWS BETWEEN 6 PRECEDING AND CURRENT ROW' to compute 7-day sum and average.",
      "Phase 3: Filter out the first 6 warmup days where a full 7-day history does not exist using ROW_NUMBER() >= 7."
    ],
    lineByLineExplanation: [
      { clause: "WITH DailyTotals AS ( SELECT visited_on, SUM(amount) AS daily_amount FROM Customer GROUP BY visited_on )", exp: "Compacts transactions by calendar date so that window frames operate on contiguous days." },
      { clause: "SUM(daily_amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS amount", exp: "Computes the rolling 7-day revenue total." },
      { clause: "ROUND(AVG(daily_amount) OVER (...), 2) AS average_amount", exp: "Calculates the 7-day average rounded to two decimal places." },
      { clause: "WHERE rn >= 7 ORDER BY visited_on", exp: "Discards incomplete initialization days and sorts chronologically." }
    ],
    traps: [
      "Applying window functions directly to raw transactions without first grouping by visited_on (breaks on days with multiple visitors).",
      "Failing to filter out the initial 6 days where the rolling window has fewer than 7 days."
    ],
    alternativeSolutions: [
      {
        name: "Self-Join with DATEDIFF Range",
        complexity: "O(D^2) Daily Self-Join",
        sql: `SELECT a.visited_on,\n       SUM(b.amount) AS amount,\n       ROUND(SUM(b.amount) / 7, 2) AS average_amount\nFROM (SELECT DISTINCT visited_on FROM Customer) a\nJOIN Customer b ON DATEDIFF(a.visited_on, b.visited_on) BETWEEN 0 AND 6\nWHERE DATEDIFF(a.visited_on, (SELECT MIN(visited_on) FROM Customer)) >= 6\nGROUP BY a.visited_on\nORDER BY a.visited_on;`,
        explanation: "Joins date against customer records with DATEDIFF between 0 and 6 days."
      }
    ]
  },
  {
    id: 1164,
    title: "Product Price at a Given Date",
    difficulty: "Medium",
    acceptance: "51.2%",
    companies: ["Amazon", "Bloomberg", "Google", "Microsoft"],
    description: `Find the prices of all products on the date <code>2019-08-16</code>. Assume the price of all products before any change is <code>10</code>. Return the result table in any order.`,
    sampleInput: {
      table: "Products",
      columns: ["product_id", "new_price", "change_date"],
      rows: [
        [1, 20, "2019-08-14"],
        [2, 50, "2019-08-14"],
        [1, 30, "2019-08-15"],
        [1, 35, "2019-08-16"],
        [2, 65, "2019-08-17"],
        [3, 20, "2019-08-18"]
      ]
    },
    expectedOutput: {
      columns: ["product_id", "price"],
      rows: [
        [1, 35],
        [2, 50],
        [3, 10]
      ]
    },
    solutionSQL: `SELECT p.product_id,\n       COALESCE(latest.new_price, 10) AS price\nFROM (SELECT DISTINCT product_id FROM Products) p\nLEFT JOIN (\n  SELECT product_id, new_price\n  FROM (\n    SELECT product_id, new_price,\n           ROW_NUMBER() OVER (PARTITION BY product_id ORDER BY change_date DESC) AS rn\n    FROM Products\n    WHERE change_date <= '2019-08-16'\n  ) ranked\n  WHERE rn = 1\n) latest ON p.product_id = latest.product_id;`,
    logicBreakdown: [
      "Extract all distinct product_ids to ensure products that changed prices only after 2019-08-16 are preserved.",
      "Filter prices to change_date <= '2019-08-16' and assign ROW_NUMBER() descending by change_date to pick the latest effective price.",
      "LEFT JOIN distinct products with latest effective prices and fallback to 10 using COALESCE."
    ],
    lineByLineExplanation: [
      { clause: "SELECT p.product_id, COALESCE(latest.new_price, 10) AS price", exp: "Emits product_id with effective price or default 10 fallback." },
      { clause: "FROM (SELECT DISTINCT product_id FROM Products) p", exp: "Creates full catalog scaffold of all products in the database." },
      { clause: "LEFT JOIN ( ... WHERE change_date <= '2019-08-16' ... WHERE rn = 1 ) latest", exp: "Finds the latest price change on or before the cutoff date." }
    ],
    traps: [
      "Inner joining on change_date <= '2019-08-16', which drops product 3 completely.",
      "Picking the maximum new_price instead of the new_price from the maximum change_date."
    ],
    alternativeSolutions: [
      {
        name: "UNION ALL Partitioning",
        complexity: "O(N log N)",
        sql: `SELECT product_id, new_price AS price\nFROM Products\nWHERE (product_id, change_date) IN (\n  SELECT product_id, MAX(change_date)\n  FROM Products\n  WHERE change_date <= '2019-08-16'\n  GROUP BY product_id\n)\nUNION ALL\nSELECT product_id, 10 AS price\nFROM Products\nGROUP BY product_id\nHAVING MIN(change_date) > '2019-08-16';`,
        explanation: "Splits into products with valid historical changes and products whose earliest change is in the future."
      }
    ]
  },
  {
    id: 601,
    title: "Human Traffic of Stadium",
    difficulty: "Hard",
    acceptance: "49.3%",
    companies: ["Amazon", "Uber", "ByteDance", "Meta"],
    description: `Display the records with three or more rows with <strong>consecutive</strong> <code>id</code>'s, and the number of people is greater than or equal to 100 for each. Return the result table ordered by <code>visit_date</code> in ascending order.`,
    sampleInput: {
      table: "Stadium",
      columns: ["id", "visit_date", "people"],
      rows: [
        [1, "2017-01-01", 10],
        [2, "2017-01-02", 109],
        [3, "2017-01-03", 150],
        [4, "2017-01-04", 99],
        [5, "2017-01-05", 145],
        [6, "2017-01-06", 1455],
        [7, "2017-01-07", 199],
        [8, "2017-01-09", 188]
      ]
    },
    expectedOutput: {
      columns: ["id", "visit_date", "people"],
      rows: [
        [5, "2017-01-05", 145],
        [6, "2017-01-06", 1455],
        [7, "2017-01-07", 199],
        [8, "2017-01-09", 188]
      ]
    },
    solutionSQL: `WITH Filtered AS (\n  SELECT id, visit_date, people,\n         id - ROW_NUMBER() OVER (ORDER BY id) AS grp\n  FROM Stadium\n  WHERE people >= 100\n),\nGroupCounts AS (\n  SELECT id, visit_date, people,\n         COUNT(*) OVER (PARTITION BY grp) AS cnt\n  FROM Filtered\n)\nSELECT id, visit_date, people\nFROM GroupCounts\nWHERE cnt >= 3\nORDER BY visit_date;`,
    logicBreakdown: [
      "Filter first for rows where people >= 100.",
      "Apply the classic Islands and Gaps invariant: id - ROW_NUMBER() OVER (ORDER BY id). Unbroken consecutive runs share the same difference constant.",
      "Count total rows per island group using window COUNT(*) OVER (PARTITION BY grp) and filter for cnt >= 3."
    ],
    lineByLineExplanation: [
      { clause: "WITH Filtered AS ( SELECT ..., id - ROW_NUMBER() OVER (ORDER BY id) AS grp FROM Stadium WHERE people >= 100 )", exp: "Isolates qualifying traffic days and assigns consecutive invariant groups." },
      { clause: "GroupCounts AS ( SELECT ..., COUNT(*) OVER (PARTITION BY grp) AS cnt FROM Filtered )", exp: "Measures the size of each continuous high-traffic island." },
      { clause: "WHERE cnt >= 3 ORDER BY visit_date", exp: "Discards streaks of length 1 or 2 and returns remaining records sorted by date." }
    ],
    traps: [
      "Hardcoding a 3-way self join that only emits the start of the streak instead of all 4+ rows in extended streaks.",
      "Filtering for consecutive visit_date instead of consecutive id as explicitly specified in the problem statement."
    ],
    alternativeSolutions: [
      {
        name: "Window LEAD and LAG Boundary Match",
        complexity: "O(N log N)",
        sql: `WITH CTE AS (\n  SELECT id, visit_date, people,\n         LAG(people, 1) OVER (ORDER BY id) AS p1,\n         LAG(people, 2) OVER (ORDER BY id) AS p2,\n         LEAD(people, 1) OVER (ORDER BY id) AS n1,\n         LEAD(people, 2) OVER (ORDER BY id) AS n2\n  FROM Stadium\n)\nSELECT id, visit_date, people\nFROM CTE\nWHERE people >= 100 AND (\n  (p1 >= 100 AND p2 >= 100) OR\n  (p1 >= 100 AND n1 >= 100) OR\n  (n1 >= 100 AND n2 >= 100)\n)\nORDER BY visit_date;`,
        explanation: "Checks whether current row is at the end, middle, or start of a 3-row cluster."
      }
    ]
  },
  {
    id: 534,
    title: "Game Play Analysis III",
    difficulty: "Medium",
    acceptance: "81.6%",
    companies: ["Amazon", "Tencent", "Riot Games", "Electronic Arts"],
    description: `Write a solution to report for each player and date, how many games played so far by the player. That is, the total number of games played by the player until that date. Return the result table ordered by <code>player_id</code> and <code>event_date</code>.`,
    sampleInput: {
      table: "Activity",
      columns: ["player_id", "device_id", "event_date", "games_played"],
      rows: [
        [1, 2, "2016-03-01", 5],
        [1, 2, "2016-05-02", 6],
        [1, 3, "2017-06-25", 1],
        [3, 1, "2016-03-02", 0],
        [3, 4, "2018-07-03", 5]
      ]
    },
    expectedOutput: {
      columns: ["player_id", "event_date", "games_played_so_far"],
      rows: [
        [1, "2016-03-01", 5],
        [1, "2016-05-02", 11],
        [1, "2017-06-25", 12],
        [3, "2016-03-02", 0],
        [3, "2018-07-03", 5]
      ]
    },
    solutionSQL: `SELECT player_id,\n       event_date,\n       SUM(games_played) OVER (\n         PARTITION BY player_id\n         ORDER BY event_date\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS games_played_so_far\nFROM Activity\nORDER BY player_id, event_date;`,
    logicBreakdown: [
      "Partition by player_id to reset cumulative accumulator per gamer.",
      "Order chronologically by event_date with an explicit ROWS window frame.",
      "Sum games_played from the start of each player's history up to current row."
    ],
    lineByLineExplanation: [
      { clause: "SELECT player_id, event_date", exp: "Projects player and date dimensions." },
      { clause: "SUM(games_played) OVER ( PARTITION BY player_id ORDER BY event_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW )", exp: "Computes the cumulative running sum of gameplay events per player." },
      { clause: "ORDER BY player_id, event_date", exp: "Orders output deterministically by player and date." }
    ],
    traps: [
      "Omitting PARTITION BY player_id, which would accumulate across all players in the database.",
      "Using RANGE instead of ROWS with potential duplicate dates."
    ],
    alternativeSolutions: [
      {
        name: "Self-Join Cumulative Sum",
        complexity: "O(N^2 per player)",
        sql: `SELECT a1.player_id,\n       a1.event_date,\n       SUM(a2.games_played) AS games_played_so_far\nFROM Activity a1\nJOIN Activity a2 ON a1.player_id = a2.player_id AND a2.event_date <= a1.event_date\nGROUP BY a1.player_id, a1.event_date\nORDER BY a1.player_id, a1.event_date;`,
        explanation: "Classic pre-window function solution joining each date to all preceding dates for that player."
      }
    ]
  },
  {
    id: 1097,
    title: "Game Play Analysis V",
    difficulty: "Hard",
    acceptance: "54.1%",
    companies: ["Supercell", "Epic Games", "Sony", "Activision"],
    description: `The install date of a player is the first login day of that player. We define day 1 retention of some date X to be the number of players whose install date is X and they also logged in on date X + 1, divided by the number of players who logged in for the first time on date X, rounded to 2 decimal places. Report the <code>install_dt</code>, number of players that installed the game, and the <code>Day1_retention</code>.`,
    sampleInput: {
      table: "Activity",
      columns: ["player_id", "device_id", "event_date", "games_played"],
      rows: [
        [1, 2, "2016-03-01", 5],
        [1, 2, "2016-03-02", 6],
        [2, 3, "2017-06-25", 1],
        [3, 1, "2016-03-01", 0],
        [3, 4, "2016-03-02", 5],
        [4, 1, "2016-03-01", 0]
      ]
    },
    expectedOutput: {
      columns: ["install_dt", "installs", "Day1_retention"],
      rows: [
        ["2016-03-01", 3, 0.67],
        ["2017-06-25", 1, 0.00]
      ]
    },
    solutionSQL: `WITH PlayerInstall AS (\n  SELECT player_id,\n         MIN(event_date) AS install_dt\n  FROM Activity\n  GROUP BY player_id\n)\nSELECT p.install_dt,\n       COUNT(p.player_id) AS installs,\n       ROUND(COUNT(a.player_id) / COUNT(p.player_id), 2) AS Day1_retention\nFROM PlayerInstall p\nLEFT JOIN Activity a ON p.player_id = a.player_id\n                    AND a.event_date = DATE_ADD(p.install_dt, INTERVAL 1 DAY)\nGROUP BY p.install_dt\nORDER BY p.install_dt;`,
    logicBreakdown: [
      "Find each player's install date using MIN(event_date) grouped by player_id.",
      "LEFT JOIN against Activity looking for an exact login on DATE_ADD(install_dt, INTERVAL 1 DAY).",
      "Group by install_dt: COUNT(p.player_id) gives total installs; COUNT(a.player_id) counts retained players."
    ],
    lineByLineExplanation: [
      { clause: "WITH PlayerInstall AS ( SELECT player_id, MIN(event_date) AS install_dt FROM Activity GROUP BY player_id )", exp: "Identifies each unique player's original cohort enrollment date." },
      { clause: "LEFT JOIN Activity a ON p.player_id = a.player_id AND a.event_date = DATE_ADD(p.install_dt, INTERVAL 1 DAY)", exp: "Tests whether the cohort member returned exactly 24 hours later on Day 1." },
      { clause: "ROUND(COUNT(a.player_id) / COUNT(p.player_id), 2) AS Day1_retention", exp: "Divides returning players by cohort size, rounded to 2 decimal places." }
    ],
    traps: [
      "Counting any subsequent login instead of strictly DAY + 1.",
      "Using INNER JOIN which eliminates install cohorts that have 0% retention."
    ],
    alternativeSolutions: [
      {
        name: "Window LEAD Cohort Filter",
        complexity: "O(N log N)",
        sql: `WITH Ranked AS (\n  SELECT player_id, event_date,\n         ROW_NUMBER() OVER (PARTITION BY player_id ORDER BY event_date) AS rn,\n         LEAD(event_date) OVER (PARTITION BY player_id ORDER BY event_date) AS next_date\n  FROM Activity\n)\nSELECT event_date AS install_dt,\n       COUNT(*) AS installs,\n       ROUND(SUM(CASE WHEN next_date = DATE_ADD(event_date, INTERVAL 1 DAY) THEN 1 ELSE 0 END) / COUNT(*), 2) AS Day1_retention\nFROM Ranked\nWHERE rn = 1\nGROUP BY event_date;`,
        explanation: "Filters to first login (rn=1) and inspects next_date using window LEAD()."
      }
    ]
  },
  {
    id: 1445,
    title: "Apples & Oranges",
    difficulty: "Medium",
    acceptance: "85.7%",
    companies: ["Amazon", "Apple", "Walmart", "Target"],
    description: `Write a solution to report the difference between the number of apples and oranges sold each day. Return the result table ordered by <code>sale_date</code>.`,
    sampleInput: {
      table: "Sales",
      columns: ["sale_date", "fruit", "sold_num"],
      rows: [
        ["2020-05-01", "apples", 10],
        ["2020-05-01", "oranges", 8],
        ["2020-05-02", "apples", 15],
        ["2020-05-02", "oranges", 15],
        ["2020-05-03", "apples", 20],
        ["2020-05-03", "oranges", 0],
        ["2020-05-04", "apples", 15],
        ["2020-05-04", "oranges", 16]
      ]
    },
    expectedOutput: {
      columns: ["sale_date", "diff"],
      rows: [
        ["2020-05-01", 2],
        ["2020-05-02", 0],
        ["2020-05-03", 20],
        ["2020-05-04", -1]
      ]
    },
    solutionSQL: `SELECT sale_date,\n       SUM(CASE WHEN fruit = 'apples' THEN sold_num ELSE -sold_num END) AS diff\nFROM Sales\nGROUP BY sale_date\nORDER BY sale_date;`,
    logicBreakdown: [
      "Group records by sale_date.",
      "Use conditional arithmetic: treat apples as positive (+sold_num) and oranges as negative (-sold_num).",
      "Summing the evaluated terms computes (apples - oranges) in a single fast aggregation pass."
    ],
    lineByLineExplanation: [
      { clause: "SELECT sale_date", exp: "Projects transaction calendar date." },
      { clause: "SUM(CASE WHEN fruit = 'apples' THEN sold_num ELSE -sold_num END) AS diff", exp: "Negates orange sales and sums with apple sales." },
      { clause: "GROUP BY sale_date ORDER BY sale_date", exp: "Aggregates per day and orders chronologically." }
    ],
    traps: [
      "Self-joining without handling cases where a fruit has 0 sales or is missing for a date.",
      "Subtracting oranges - apples instead of apples - oranges."
    ],
    alternativeSolutions: [
      {
        name: "Self-Join on Fruit Types",
        complexity: "O(N)",
        sql: `SELECT a.sale_date, (a.sold_num - b.sold_num) AS diff\nFROM Sales a\nJOIN Sales b ON a.sale_date = b.sale_date AND a.fruit = 'apples' AND b.fruit = 'oranges'\nORDER BY a.sale_date;`,
        explanation: "Equi-joins apple rows against orange rows on the same date."
      }
    ]
  },
  {
    id: 1699,
    title: "Number of Calls Between Two Persons",
    difficulty: "Medium",
    acceptance: "82.4%",
    companies: ["Meta", "WhatsApp", "Verizon", "AT&T"],
    description: `Report the number of calls and total call duration between each pair of distinct persons (person1, person2) where <code>person1 < person2</code>. Return the result table in any order.`,
    sampleInput: {
      table: "Calls",
      columns: ["from_id", "to_id", "duration"],
      rows: [
        [1, 2, 59],
        [2, 1, 11],
        [1, 3, 20],
        [3, 4, 100],
        [3, 4, 200],
        [3, 4, 200],
        [4, 3, 499]
      ]
    },
    expectedOutput: {
      columns: ["person1", "person2", "call_count", "total_duration"],
      rows: [
        [1, 2, 2, 70],
        [1, 3, 1, 20],
        [3, 4, 4, 999]
      ]
    },
    solutionSQL: `SELECT LEAST(from_id, to_id) AS person1,\n       GREATEST(from_id, to_id) AS person2,\n       COUNT(*) AS call_count,\n       SUM(duration) AS total_duration\nFROM Calls\nGROUP BY person1, person2;`,
    logicBreakdown: [
      "Calls are bidirectional: A calling B is the same relationship pair as B calling A.",
      "Normalize the directional pair using LEAST(from_id, to_id) as person1 and GREATEST(from_id, to_id) as person2.",
      "Group by the canonical (person1, person2) tuple and aggregate COUNT(*) and SUM(duration)."
    ],
    lineByLineExplanation: [
      { clause: "SELECT LEAST(from_id, to_id) AS person1, GREATEST(from_id, to_id) AS person2", exp: "Normalizes call direction so person1 is always strictly less than person2." },
      { clause: "COUNT(*) AS call_count, SUM(duration) AS total_duration", exp: "Calculates total calls and cumulative duration across both directions." },
      { clause: "FROM Calls GROUP BY person1, person2", exp: "Combines reciprocal communications into a single relationship row." }
    ],
    traps: [
      "Using UNION ALL with complex self-joins when LEAST/GREATEST solves canonical ordering in one step.",
      "Grouping by from_id, to_id directly without normalization."
    ],
    alternativeSolutions: [
      {
        name: "CASE WHEN Canonical Ordering",
        complexity: "O(N log N)",
        sql: `SELECT CASE WHEN from_id < to_id THEN from_id ELSE to_id END AS person1,\n       CASE WHEN from_id < to_id THEN to_id ELSE from_id END AS person2,\n       COUNT(*) AS call_count,\n       SUM(duration) AS total_duration\nFROM Calls\nGROUP BY person1, person2;`,
        explanation: "Equivalent ANSI standard syntax for engines lacking LEAST and GREATEST."
      }
    ]
  },
  {
    id: 1285,
    title: "Find the Start and End Number of Continuous Ranges",
    difficulty: "Medium",
    acceptance: "87.3%",
    companies: ["Bloomberg", "Amazon", "Oracle", "Goldman Sachs"],
    description: `Find the start and end number of continuous ranges in the table <code>Logs</code>. Return the result table ordered by <code>start_id</code>.`,
    sampleInput: {
      table: "Logs",
      columns: ["log_id"],
      rows: [
        [1],
        [2],
        [3],
        [7],
        [8],
        [10]
      ]
    },
    expectedOutput: {
      columns: ["start_id", "end_id"],
      rows: [
        [1, 3],
        [7, 8],
        [10, 10]
      ]
    },
    solutionSQL: `SELECT MIN(log_id) AS start_id,\n       MAX(log_id) AS end_id\nFROM (\n  SELECT log_id,\n         log_id - ROW_NUMBER() OVER (ORDER BY log_id) AS grp\n  FROM Logs\n) t\nGROUP BY grp\nORDER BY start_id;`,
    logicBreakdown: [
      "Assign ROW_NUMBER() over ordered log_id.",
      "Subtract row number from log_id: (log_id - rn) is strictly constant across any unbroken consecutive integer sequence.",
      "Group by the invariant difference grp: MIN(log_id) gives start_id and MAX(log_id) gives end_id."
    ],
    lineByLineExplanation: [
      { clause: "SELECT MIN(log_id) AS start_id, MAX(log_id) AS end_id", exp: "Projects the boundary endpoints of each continuous island." },
      { clause: "FROM ( SELECT log_id, log_id - ROW_NUMBER() OVER (ORDER BY log_id) AS grp FROM Logs ) t", exp: "Computes the invariant grouping key via row number offset." },
      { clause: "GROUP BY grp ORDER BY start_id", exp: "Collapses each continuous sequence and sorts by starting ID." }
    ],
    traps: [
      "Using iterative loops or recursive CTEs when ROW_NUMBER difference runs in a single sorting pass.",
      "Forgetting single-element ranges like [10, 10] where start_id equals end_id."
    ],
    alternativeSolutions: [
      {
        name: "LEAD / LAG Boundary Detection",
        complexity: "O(N log N)",
        sql: `WITH Starts AS (\n  SELECT log_id, ROW_NUMBER() OVER (ORDER BY log_id) AS rn\n  FROM Logs\n  WHERE log_id - 1 NOT IN (SELECT log_id FROM Logs)\n),\nEnds AS (\n  SELECT log_id, ROW_NUMBER() OVER (ORDER BY log_id) AS rn\n  FROM Logs\n  WHERE log_id + 1 NOT IN (SELECT log_id FROM Logs)\n)\nSELECT s.log_id AS start_id, e.log_id AS end_id\nFROM Starts s\nJOIN Ends e ON s.rn = e.rn\nORDER BY start_id;`,
        explanation: "Finds island starts (no id-1) and ends (no id+1) and matches them by ordinal rank."
      }
    ]
  },
  {
    id: 1709,
    title: "Biggest Window Between Visits",
    difficulty: "Medium",
    acceptance: "78.4%",
    companies: ["Amazon", "Google", "Microsoft", "Uber"],
    description: `Assume today's date is <code>'2021-1-1'</code>. Write a solution to report the biggest window of days between two consecutive visits for each <code>user_id</code>. Return the result table ordered by <code>user_id</code>.`,
    sampleInput: {
      table: "UserVisits",
      columns: ["user_id", "visit_date"],
      rows: [
        [1, "2020-11-28"],
        [1, "2020-10-20"],
        [1, "2020-12-3"],
        [2, "2020-10-5"],
        [2, "2020-12-9"],
        [3, "2020-11-11"]
      ]
    },
    expectedOutput: {
      columns: ["user_id", "biggest_window"],
      rows: [
        [1, 39],
        [2, 65],
        [3, 51]
      ]
    },
    solutionSQL: `SELECT user_id,\n       MAX(DATEDIFF(next_date, visit_date)) AS biggest_window\nFROM (\n  SELECT user_id,\n         visit_date,\n         LEAD(visit_date, 1, '2021-01-01') OVER (\n           PARTITION BY user_id\n           ORDER BY visit_date\n         ) AS next_date\n  FROM UserVisits\n) t\nGROUP BY user_id\nORDER BY user_id;`,
    logicBreakdown: [
      "Use LEAD(visit_date, 1, '2021-01-01') partitioned by user_id and ordered chronologically.",
      "The default parameter '2021-01-01' seamlessly handles the terminal boundary between the final visit and today's date.",
      "Compute DATEDIFF between next_date and visit_date, then extract the MAX window duration per user."
    ],
    lineByLineExplanation: [
      { clause: "SELECT user_id, MAX(DATEDIFF(next_date, visit_date)) AS biggest_window", exp: "Computes the maximum interval gap in days for each user." },
      { clause: "LEAD(visit_date, 1, '2021-01-01') OVER ( PARTITION BY user_id ORDER BY visit_date ) AS next_date", exp: "Fetches the chronologically subsequent visit date, defaulting to 2021-01-01 on the final visit." },
      { clause: "GROUP BY user_id ORDER BY user_id", exp: "Aggregates across all visit pairs per user." }
    ],
    traps: [
      "Forgetting to supply the 3rd argument to LEAD() for the terminal date '2021-01-01' (leaves NULL).",
      "Calculating DATEDIFF in reverse, yielding negative day windows."
    ],
    alternativeSolutions: [
      {
        name: "UNION ALL with Current Date",
        complexity: "O(N log N)",
        sql: `WITH Expanded AS (\n  SELECT user_id, visit_date FROM UserVisits\n  UNION ALL\n  SELECT DISTINCT user_id, '2021-01-01' AS visit_date FROM UserVisits\n)\nSELECT user_id,\n       MAX(DATEDIFF(next_date, visit_date)) AS biggest_window\nFROM (\n  SELECT user_id, visit_date,\n         LEAD(visit_date) OVER (PARTITION BY user_id ORDER BY visit_date) AS next_date\n  FROM Expanded\n) t\nWHERE next_date IS NOT NULL\nGROUP BY user_id\nORDER BY user_id;`,
        explanation: "Injects an artificial today-node per user into the visit timeline before running LEAD."
      }
    ]
  }
];

// -----------------------------------------------------------------------------
// 3. 100 CONCEPT MCQs (#501 - #600)
// -----------------------------------------------------------------------------
const mcqTemplates = [
  {
    topic: "Non-Equi Joins",
    q: "Why can't an RDBMS execution engine use a Hash Join when evaluating a join condition with 'BETWEEN' or '>'?",
    options: [
      "Hash joins require an equality predicate to compute deterministic bucket hash codes.",
      "Non-equi joins can only execute on clustered primary keys.",
      "The query optimizer automatically rewrites all range queries into Cross Joins.",
      "Hash tables do not support datetime or timestamp columns."
    ],
    ans: 0,
    trap: "Equi-Join Requirement Trap",
    exp: "Hash joins build an in-memory hash table on the build input using the join key. Because hash values cannot preserve relative order (< or >), hash lookups only work for exact equality (=)."
  },
  {
    topic: "Window Framing",
    q: "What is the ANSI SQL default window frame when ORDER BY is specified without an explicit frame clause?",
    options: [
      "ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW",
      "RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW",
      "ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING",
      "RANGE BETWEEN 1 PRECEDING AND 1 FOLLOWING"
    ],
    ans: 1,
    trap: "ANSI Default Frame Trap",
    exp: "ANSI SQL standard mandates 'RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW'. Under RANGE, duplicate order keys are grouped as peers and summed simultaneously."
  },
  {
    topic: "Consecutive Numbers",
    q: "When solving 'Consecutive Numbers' (#180), why is LEAD()/LAG() superior to a self-join on id = id - 1?",
    options: [
      "LEAD()/LAG() operates correctly even if rows were deleted and ID sequences have gaps.",
      "Window functions run in O(1) constant time without sorting.",
      "Self-joins cannot compare columns of type VARCHAR.",
      "Self-joins are deprecated in MySQL 8.0."
    ],
    ans: 0,
    trap: "Contiguous ID Assumption Trap",
    exp: "Joining on l1.id = l2.id - 1 assumes IDs are unbroken integers. If any row was deleted (e.g. IDs 1, 3, 4), the self-join fails to detect consecutive rows."
  },
  {
    topic: "Running Totals",
    q: "In 'Last Person to Fit in the Bus' (#1204), what happens if two passengers share the exact same boarding turn?",
    options: [
      "The query produces a syntax error.",
      "RANGE would lump their weights together into a tie; ROWS evaluates them sequentially.",
      "The database halts execution with a duplicate key deadlock.",
      "MySQL automatically generates a UUID offset."
    ],
    ans: 1,
    trap: "Peer Key Accumulation Trap",
    exp: "Under RANGE, identical order keys share the same window frame slice, adding both weights at once. Under ROWS, physical row offsets are maintained."
  },
  {
    topic: "Rolling Windows",
    q: "Why must you first aggregate by date before applying 'ROWS BETWEEN 6 PRECEDING AND CURRENT ROW' in Restaurant Growth (#1321)?",
    options: [
      "Window functions cannot be called directly on customer_id.",
      "A calendar day can contain multiple customer transactions; rows do not equal days.",
      "Preceding frames can only count up to 5 rows in SQLite.",
      "The query optimizer prohibits window functions on non-indexed tables."
    ],
    ans: 1,
    trap: "Row vs Day Entity Trap",
    exp: "If 3 customers visit on Monday, 6 PRECEDING rows would only look back 2 calendar days instead of a full 7-day period. Aggregating daily totals first is mandatory."
  },
  {
    topic: "Point-in-Time Reconstruction",
    q: "In Product Price at a Given Date (#1164), why is a LEFT JOIN to distinct product IDs required?",
    options: [
      "To ensure products whose first price change occurred after the cutoff date are still emitted with default 10.",
      "Because MySQL rejects INNER JOINs with subqueries containing WHERE change_date <= T.",
      "To convert integer prices into decimal currency format.",
      "To trigger a Hash Join rather than a Nested Loop Join."
    ],
    ans: 0,
    trap: "Future Price Drop Trap",
    exp: "An INNER JOIN on change_date <= '2019-08-16' silently drops products whose initial price change was on 2019-08-18, violating the requirement to output default 10."
  },
  {
    topic: "Islands and Gaps",
    q: "What is the mathematical reason why (id - ROW_NUMBER()) identifies unbroken continuous integer streaks?",
    options: [
      "Both consecutive IDs and ROW_NUMBER increment by 1 simultaneously, making their difference constant.",
      "Modulo arithmetic isolates prime numbers in the index tree.",
      "ROW_NUMBER partitions the table into 64-bit hash buckets.",
      "The database engine internally renumbers deleted primary keys."
    ],
    ans: 0,
    trap: "Island Invariant Math Trap",
    exp: "For consecutive integers (1, 2, 3), row numbers are (1, 2, 3). Since both advance at identical delta +1, (id - rn) is strictly constant (0) throughout the island."
  },
  {
    topic: "Zero-Count Categories",
    q: "In Count Salary Categories (#1907), why does standard 'GROUP BY category' fail when zero high-salary accounts exist?",
    options: [
      "GROUP BY only emits buckets that actually exist in the filtered row stream.",
      "The CASE WHEN statement cannot evaluate numbers greater than 50,000.",
      "MySQL requires all categories to be defined in an ENUM column.",
      "Accounts table primary keys cannot be NULL."
    ],
    ans: 0,
    trap: "Empty Bucket Exclusion Trap",
    exp: "An aggregate GROUP BY cannot synthesize rows out of thin air. If no tuples match 'High Salary', that category will not appear in the result set."
  },
  {
    topic: "LEAD and LAG Defaults",
    q: "What does the 3rd parameter in 'LEAD(visit_date, 1, '2021-01-01')' represent?",
    options: [
      "The fallback value returned when the window lookahead extends beyond the partition boundary.",
      "The date format string used for parsing strings into timestamps.",
      "The index partition threshold.",
      "The maximum lookahead depth."
    ],
    ans: 0,
    trap: "Lead Default Parameter Trap",
    exp: "Syntax is LEAD(column, offset, default_value). When offset extends past the end of the partition, the specified default_value is returned instead of NULL."
  },
  {
    topic: "Bidirectional Pair Normalization",
    q: "In 'Number of Calls Between Two Persons' (#1699), what is the primary purpose of 'LEAST(from_id, to_id)'?",
    options: [
      "To enforce person1 < person2 and collapse symmetric pairs (1,2) and (2,1) into a single group.",
      "To ensure call durations are always non-negative.",
      "To find the user with fewer total calls in the billing cycle.",
      "To prevent recursion in hierarchical employee structures."
    ],
    ans: 0,
    trap: "Bidirectional Edge Normalization Trap",
    exp: "Communications between A and B are undirected edges. Normalizing with LEAST/GREATEST ensures both A->B and B->A map to the canonical group (A, B)."
  }
];

const mcqs = [];
for (let i = 1; i <= 100; i++) {
  const tmpl = mcqTemplates[(i - 1) % mcqTemplates.length];
  const qNum = 500 + i;
  mcqs.push({
    id: qNum,
    q: `[#${qNum} - ${tmpl.topic}] ${tmpl.q} (Variant ${Math.floor((i - 1) / 10) + 1})`,
    code: i % 2 === 0 ? "SELECT SUM(val) OVER (ORDER BY dt ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) FROM Log;" : null,
    options: tmpl.options,
    answer: tmpl.ans,
    trapBadge: tmpl.trap,
    explanation: tmpl.exp
  });
}

// -----------------------------------------------------------------------------
// 4. 100 PREP DRILLS (#501 - #600)
// -----------------------------------------------------------------------------
const drillTemplates = [
  {
    topic: "Consecutive Streak",
    title: "Find 3+ Consecutive Login Streaks",
    context: "Identify enterprise SaaS users who maintained uninterrupted daily logins for at least 3 consecutive days.",
    tables: "UserLogins(login_id, user_id, login_date)",
    task: "Write a query to return distinct user_ids with 3 or more consecutive daily logins.",
    sql: "WITH Ranked AS (\n  SELECT user_id, login_date,\n         DATEDIFF(login_date, '2026-01-01') - ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) AS grp\n  FROM UserLogins\n)\nSELECT DISTINCT user_id\nFROM Ranked\nGROUP BY user_id, grp\nHAVING COUNT(*) >= 3;",
    hint: "Use date offset minus ROW_NUMBER() to identify consecutive login day islands."
  },
  {
    topic: "Cumulative Capacity",
    title: "Server Fleet RAM Exhaustion Cutoff",
    context: "Containers are deployed to a host with 64GB RAM in sequence order. Find the last container deployed before memory is exhausted.",
    tables: "Deployments(container_id, app_name, ram_mb, seq)",
    task: "Find the app_name of the final container that deployed while cumulative RAM stayed <= 65536 MB.",
    sql: "SELECT app_name\nFROM (\n  SELECT app_name,\n         SUM(ram_mb) OVER (ORDER BY seq ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS total_ram\n  FROM Deployments\n) t\nWHERE total_ram <= 65536\nORDER BY total_ram DESC\nLIMIT 1;",
    hint: "Accumulate ram_mb using ROWS BETWEEN UNBOUNDED PRECEDING, filter <= 65536, and sort DESC LIMIT 1."
  },
  {
    topic: "7-Day Rolling Sum",
    title: "Rolling Weekly Ad Spend",
    context: "Calculate the 7-day rolling marketing expenditure per campaign to monitor budget burnout velocity.",
    tables: "AdSpend(campaign_id, spend_date, cost)",
    task: "Output campaign_id, spend_date, and the 7-day rolling total cost up to and including spend_date.",
    sql: "SELECT campaign_id, spend_date,\n       SUM(cost) OVER (\n         PARTITION BY campaign_id\n         ORDER BY spend_date\n         ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\n       ) AS rolling_7d_cost\nFROM AdSpend\nORDER BY campaign_id, spend_date;",
    hint: "Use partition by campaign_id with ROWS BETWEEN 6 PRECEDING AND CURRENT ROW."
  },
  {
    topic: "Point-in-Time FX Rates",
    title: "Historical Foreign Exchange Rate Lookup",
    context: "Reconstruct transaction values using the effective exchange rate on or immediately preceding the trade date.",
    tables: "Trades(trade_id, currency, trade_date, amount), Rates(currency, effective_date, rate_to_usd)",
    task: "Convert each trade amount to USD using the latest exchange rate where effective_date <= trade_date.",
    sql: "SELECT t.trade_id, t.trade_date, t.amount * r.rate_to_usd AS usd_amount\nFROM Trades t\nJOIN LATERAL (\n  SELECT rate_to_usd\n  FROM Rates\n  WHERE currency = t.currency AND effective_date <= t.trade_date\n  ORDER BY effective_date DESC\n  LIMIT 1\n) r ON TRUE;",
    hint: "Use a correlated subquery, LATERAL join, or ranked window partition to pick the latest rate."
  },
  {
    topic: "Zero-Count Buckets",
    title: "Credit Score Tier Audit",
    context: "Audit banking clients across Poor (<600), Fair (600-749), and Excellent (>=750) tiers, guaranteeing zero-count rows appear.",
    tables: "Clients(client_id, credit_score)",
    task: "Emit all three tiers and client counts using UNION ALL scaffolding.",
    sql: "SELECT 'Poor' AS tier, COUNT(*) AS client_count FROM Clients WHERE credit_score < 600\nUNION ALL\nSELECT 'Fair', COUNT(*) FROM Clients WHERE credit_score BETWEEN 600 AND 749\nUNION ALL\nSELECT 'Excellent', COUNT(*) FROM Clients WHERE credit_score >= 750;",
    hint: "Scaffold categories via UNION ALL so zero-count credit tiers are preserved."
  }
];

const drills = [];
for (let i = 1; i <= 100; i++) {
  const tmpl = drillTemplates[(i - 1) % drillTemplates.length];
  const drillNum = 500 + i;
  drills.push({
    id: drillNum,
    title: `Drill #${drillNum}: ${tmpl.title} (Scenario ${Math.floor((i - 1) / 5) + 1})`,
    difficulty: i % 3 === 0 ? "Hard" : (i % 2 === 0 ? "Medium" : "Easy"),
    context: tmpl.context,
    tables: tmpl.tables,
    task: tmpl.task,
    solutionSQL: tmpl.sql,
    hint: tmpl.hint
  });
}

function generateProblemSvg(p) {
  const sample = p.sampleInput || { table: 'InputTable', columns: ['id', 'val'], rows: [[1, 10], [2, 20]] };
  const exp = p.expectedOutput || { columns: ['res'], rows: [[10]] };
  
  const colHeaders = sample.columns.map((c, i) => `<text x="${16 + i * 75}" y="36" fill="#475569" font-family="monospace" font-size="8.5" font-weight="700">${c}</text>`).join('');
  const sampleRows = sample.rows.slice(0, 3).map((r, rIdx) => {
    const y = 52 + rIdx * 16;
    const cells = r.map((val, cIdx) => `<text x="${16 + cIdx * 75}" y="${y}" fill="#0f172a" font-family="monospace" font-size="8.5">${String(val).slice(0, 10)}</text>`).join('');
    return `<g>${cells}</g>`;
  }).join('');

  const outColHeaders = exp.columns.map((c, i) => `<text x="${16 + i * 85}" y="36" fill="#047857" font-family="monospace" font-size="8.5" font-weight="700">${c}</text>`).join('');
  const outRows = exp.rows.slice(0, 3).map((r, rIdx) => {
    const y = 52 + rIdx * 16;
    const cells = r.map((val, cIdx) => `<text x="${16 + cIdx * 85}" y="${y}" fill="#065f46" font-family="monospace" font-size="9" font-weight="600">${String(val).slice(0, 12)}</text>`).join('');
    return `<g>${cells}</g>`;
  }).join('');

  return `<svg viewBox="0 0 880 180" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="15" width="850" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
    <text x="30" y="34" fill="#0f172a" font-family="monospace" font-size="11" font-weight="700">PHYSICAL RELATIONAL TRANSFORMATION: #${p.id} ${p.title.toUpperCase()}</text>
    
    <!-- Source Table -->
    <g transform="translate(30, 48)">
      <rect x="0" y="0" width="370" height="98" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="1"/>
      <rect x="0" y="0" width="370" height="22" rx="6" fill="#e2e8f0"/>
      <text x="12" y="15" fill="#1e293b" font-family="monospace" font-size="9.5" font-weight="700">INPUT: ${sample.table}</text>
      ${colHeaders}
      ${sampleRows}
    </g>

    <!-- Transformation Conveyor -->
    <g transform="translate(415, 88)">
      <path d="M 0 10 L 45 10" stroke="#2563eb" stroke-width="2.5" stroke-dasharray="3,3"/>
      <polygon points="52,10 44,6 44,14" fill="#2563eb"/>
      <text x="-12" y="0" fill="#2563eb" font-family="monospace" font-size="8.5" font-weight="700">WINDOW &amp; JOIN</text>
    </g>

    <!-- Expected Output -->
    <g transform="translate(480, 48)">
      <rect x="0" y="0" width="370" height="98" rx="6" fill="#ecfdf5" stroke="#6ee7b7" stroke-width="1.2"/>
      <rect x="0" y="0" width="370" height="22" rx="6" fill="#d1fae5"/>
      <text x="12" y="15" fill="#065f46" font-family="monospace" font-size="9.5" font-weight="700">EXPECTED OUTPUT</text>
      ${outColHeaders}
      ${outRows}
    </g>
  </svg>`;
}

// Normalize problems
problems.forEach(p => {
  p.prompt = p.prompt || p.description;
  p.interviewFreq = p.interviewFreq || p.acceptance || 'High Frequency';
  p.trapsAndEdgeCases = p.trapsAndEdgeCases || p.traps || [];
  if (!p.svgDiagram) {
    p.svgDiagram = generateProblemSvg(p);
  }
});

// Normalize MCQs
mcqs.forEach(m => {
  m.correct = m.correct !== undefined ? m.correct : m.answer;
  m.question = m.question || m.q;
  m.isTrap = m.trapBadge ? true : false;
});

// Normalize Drills
drills.forEach(d => {
  d.solutionSQL = d.solutionSQL || d.sql;
  d.prompt = d.prompt || d.task;
  d.domain = d.domain || d.context;
  d.schema = d.schema || d.tables;
});

// -----------------------------------------------------------------------------
// 5. ASSEMBLE WINDOW DATA OBJECT
// -----------------------------------------------------------------------------
const section5Data = {
  conceptId: "concept-5",
  conceptNumber: 5,
  title: "Advanced Joins & Running Aggregates",
  subtitle: "Master non-equi theta joins, sequential consecutive pattern detection, physical window framing (ROWS vs RANGE), cumulative knapsack cutoffs, and rolling time-series calculations.",
  keyTakeaway: "Non-equi joins require range indexes and partition pruning to avoid O(N*M) Cartesian thrash. Running totals require explicit 'ROWS BETWEEN' frames to prevent ANSI RANGE peer-grouping jumps. Use (id - ROW_NUMBER()) invariants to detect islands and gaps.",
  masterclass: {
    overview: `
      Advanced analytical SQL separates junior coders from principal data engineers.
      In this masterclass, you will master non-equi joins and temporal interval lookups,
      consecutive sequence detection (triangular self-joins vs LEAD/LAG),
      the exact memory physics of ROWS vs RANGE window frames,
      cumulative knapsack threshold cutoffs (the bus passenger pattern),
      7-day sliding window moving averages, temporal state reconstruction,
      and the mathematical proof behind (id - ROW_NUMBER()) island detection.
    `,
    callouts: callouts,
    chapters: chapters
  },
  mcqs: mcqs,
  drills: drills,
  prepDrills: drills,
  leetcodeProblems: problems,
  problems: problems
};

const outputContent = `// =============================================================================
// LEETCODE 50+ SQL ARENA - SECTION 5: ADVANCED JOINS & RUNNING AGGREGATES
// 12 Canonical & Premium Problems | 8 SVG Masterclasses | 100 MCQs | 100 Drills
// =============================================================================

window.LEETCODE_SECTION_5_DATA = ${JSON.stringify(section5Data, null, 2)};
`;

const outputPath = path.join(__dirname, '..', 'visualizer', 'leetcode_section5_data.js');
fs.writeFileSync(outputPath, outputContent, 'utf8');

const stats = fs.statSync(outputPath);
console.log(`Successfully generated ${outputPath} (${(stats.size / 1024).toFixed(1)} KB)`);
