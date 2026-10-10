// scratch/gen_concept8.js
// Generates visualizer/leetcode_section8_data.js
// Concept 8: Statistical Distributions & Continuous Medians (12 Problems)
const fs = require('fs');
const path = require('path');

const batch1 = require('./section8_problems_batch1.js');
const batch2 = require('./section8_problems_batch2.js');
const allProbs = [...batch1, ...batch2];

const c8Ids = [177, 178, 571, 578, 579, 615, 1082, 1308, 1412, 1440, 1468, 1555];
const selectedProbs = c8Ids.map(id => allProbs.find(p => p.id === id)).filter(Boolean);

console.log(`Concept 8 matched ${selectedProbs.length} problems.`);

const masterclassData = require('./section8_masterclass.js');

// 8 focused chapters for Statistical Distributions & Medians
const chapters = [
  {
    id: "chap-8-1-udf-scalar-offsets",
    number: "8.1",
    title: "User-Defined Functions, Scalar Wrappers & LIMIT Offsets",
    content: `
      <p class="lc-p">
        In technical interviews involving <em>Nth</em> statistics (e.g., LeetCode #177 <em>Nth Highest Salary</em>), database engines treat the <code>LIMIT</code> clause as a literal numerical token. Passing runtime expressions like <code>LIMIT N-1, 1</code> directly into an inline query triggers syntax errors in traditional MySQL syntax.
      </p>

      <div class="lc-rule-banner">
        <strong>The Stored Function &amp; Offset Invariant:</strong><br>
        &bull; <strong>Variable Pre-computation:</strong> In MySQL UDFs (<code>CREATE FUNCTION</code>), you must decrement the input parameter in a procedural assignment block: <code>SET N = N - 1;</code> before executing the scalar query.<br>
        &bull; <strong>Scalar Subquery NULL Fallback:</strong> If an employee table has fewer than <em>N</em> distinct salaries, an unwrapped query returns an empty result set (0 rows) instead of <code>NULL</code>. Wrap the query in an outer <code>SELECT (SELECT ...) AS ...</code> scalar wrapper.<br>
        &bull; <strong>DENSE_RANK() Modern Parity:</strong> In modern SQL, UDFs can also be expressed cleanly using <code>DENSE_RANK() OVER (ORDER BY salary DESC)</code> inside a CTE, filtering <code>WHERE rnk = N</code>.
      </div>
    `,
    diagram: {
      title: "Scalar Offset Inversion & Empty Result Set NULL Fallback",
      svg: `<svg viewBox="0 0 880 180" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">SCALAR WRAPPER &amp; OFFSET RETRIEVAL (Nth HIGHEST SALARY)</text>
        <g transform="translate(35, 55)">
          <rect x="0" y="26" width="160" height="26" rx="4" fill="#f8fafc" stroke="#94a3b8"/>
          <text x="12" y="43" fill="#0f172a" font-family="monospace" font-size="10.5">Rank 1: $10,000</text>
          <rect x="0" y="56" width="160" height="26" rx="4" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
          <text x="12" y="73" fill="#1d4ed8" font-family="monospace" font-size="10.5" font-weight="700">Rank 2: $8,000 (N=2)</text>
        </g>
        <path d="M 220 100 L 290 100" stroke="#2563eb" stroke-width="2" marker-end="url(#arrowC8)"/>
        <g transform="translate(310, 55)">
          <rect x="0" y="26" width="230" height="56" rx="6" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
          <text x="12" y="48" fill="#166534" font-family="monospace" font-size="10.5" font-weight="700">OFFSET: SET N = N - 1</text>
          <text x="12" y="68" fill="#15803d" font-family="monospace" font-size="9.5">LIMIT 1 OFFSET 1 -> $8,000</text>
        </g>
        <g transform="translate(570, 55)">
          <rect x="0" y="26" width="260" height="56" rx="6" fill="#fff7ed" stroke="#ea580c" stroke-width="1.5"/>
          <text x="12" y="48" fill="#c2410c" font-family="monospace" font-size="10.5" font-weight="700">EMPTY RESULT GUARD</text>
          <text x="12" y="68" fill="#9a3412" font-family="monospace" font-size="9.5">SELECT (SELECT ...) -> Returns NULL</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-8-2-continuous-median-frequency",
    number: "8.2",
    title: "Continuous vs Discrete Median on Compressed Frequency Tables",
    content: `
      <p class="lc-p">
        In LeetCode #571 (<em>Find Median Given Frequency of Schedule</em>), numbers are stored compressed as <code>(num, frequency)</code> pairs. Expanding millions of rows with recursive joins is computationally catastrophic. The mathematically optimal solution calculates the <strong>cumulative frequency distribution</strong> from both directions.
      </p>

      <div class="lc-rule-banner">
        <strong>The Bi-Directional Cumulative Sum Median Theorem:</strong><br>
        Let <code>total_count = SUM(frequency)</code> across the entire dataset.<br>
        A number <em>X</em> qualifies as part of the median if and only if:<br>
        <code>SUM(frequency) OVER (ORDER BY num ASC) &gt;= total_count / 2</code><br>
        <strong>AND</strong><br>
        <code>SUM(frequency) OVER (ORDER BY num DESC) &gt;= total_count / 2</code>.<br>
        Averaging the qualifying numbers (<code>AVG(num)</code>) yields the exact median regardless of whether total count is odd or even!
      </div>
    `,
    diagram: {
      title: "Bi-Directional Cumulative Frequency Median Envelope",
      svg: `<svg viewBox="0 0 880 180" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">MEDIAN ON COMPRESSED FREQUENCIES (TOTAL COUNT = 12)</text>
        <g transform="translate(40, 55)">
          <rect x="0" y="25" width="220" height="26" fill="#f8fafc" stroke="#94a3b8"/>
          <text x="10" y="42" fill="#0f172a" font-family="monospace" font-size="10">Num: 0 | Freq: 7 | Asc: 7 | Desc: 12</text>
          <rect x="0" y="55" width="220" height="26" fill="#ecfdf5" stroke="#059669" stroke-width="2"/>
          <text x="10" y="72" fill="#047857" font-family="monospace" font-size="10" font-weight="700">Num: 1 | Freq: 1 | Asc: 8 | Desc: 5</text>
        </g>
        <path d="M 280 100 L 350 100" stroke="#059669" stroke-width="2"/>
        <g transform="translate(370, 55)">
          <rect x="0" y="25" width="450" height="60" rx="6" fill="#f0fdf4" stroke="#16a34a"/>
          <text x="15" y="48" fill="#166534" font-family="monospace" font-size="10.5" font-weight="700">MEDIAN CRITERION: Asc &gt;= 6 AND Desc &gt;= 6</text>
          <text x="15" y="68" fill="#15803d" font-family="monospace" font-size="9.5">Num 0: Asc=7(&gt;=6), Desc=12(&gt;=6) -> INCLUDED in median average!</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-8-3-dense-rank-tie-breaker",
    number: "8.3",
    title: "DENSE_RANK() vs RANK() Invariants & Tie-Breaking Physics",
    content: `
      <p class="lc-p">
        In competitive leaderboard evaluation (e.g. LeetCode #178 <em>Rank Scores</em>), tie handling dictates analytical correctness.
      </p>
      <div class="lc-rule-banner">
        &bull; <code>ROW_NUMBER()</code> assigns strictly sequential unique integers (1, 2, 3, 4) ignoring ties.<br>
        &bull; <code>RANK()</code> leaves gaps after ties: two tied at rank 1 produces (1, 1, 3).<br>
        &bull; <code>DENSE_RANK()</code> never leaves gaps: two tied at rank 1 produces (1, 1, 2).
      </div>
    `,
    diagram: {
      title: "Ranking Semantics: ROW_NUMBER vs RANK vs DENSE_RANK",
      svg: `<svg viewBox="0 0 880 160" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="130" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">RANKING SEMANTICS COMPARISON</text>
        <g transform="translate(35, 55)">
          <rect x="0" y="20" width="180" height="40" fill="#f1f5f9" stroke="#94a3b8"/>
          <text x="10" y="36" fill="#0f172a" font-family="monospace" font-size="10">Score: 4.0, 4.0, 3.85</text>
          <text x="10" y="52" fill="#475569" font-family="monospace" font-size="9">ROW_NUMBER: 1, 2, 3</text>
        </g>
        <g transform="translate(240, 55)">
          <rect x="0" y="20" width="180" height="40" fill="#fef2f2" stroke="#ef4444"/>
          <text x="10" y="36" fill="#991b1b" font-family="monospace" font-size="10">RANK(): 1, 1, 3</text>
          <text x="10" y="52" fill="#b91c1c" font-family="monospace" font-size="9">Gap after tie!</text>
        </g>
        <g transform="translate(445, 55)">
          <rect x="0" y="20" width="220" height="40" rx="4" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>
          <text x="10" y="36" fill="#166534" font-family="monospace" font-size="10" font-weight="700">DENSE_RANK(): 1, 1, 2</text>
          <text x="10" y="52" fill="#15803d" font-family="monospace" font-size="9">Zero gaps (Consecutive)</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-8-4-percentiles-quantiles",
    number: "8.4",
    title: "Percentiles, Quantiles & Cumulative Distribution Functions",
    content: `
      <p class="lc-p">
        Beyond integer ranks, statistical querying uses normalized quantile functions:
        <code>CUME_DIST()</code> returns the cumulative distribution ratio <code>(count &lt;= current) / total_rows</code>, while
        <code>PERCENT_RANK()</code> returns <code>(rank - 1) / (total_rows - 1)</code>.
      </p>
    `,
    diagram: {
      title: "Cumulative Distribution Normalization",
      svg: `<svg viewBox="0 0 880 150" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">CUME_DIST() VS PERCENT_RANK() NORMALIZATION</text>
        <g transform="translate(40, 55)">
          <text x="0" y="20" fill="#0f172a" font-family="monospace" font-size="10">Values [10, 20, 20, 40] (N=4)</text>
          <text x="0" y="40" fill="#2563eb" font-family="monospace" font-size="10">CUME_DIST: 0.25, 0.75, 0.75, 1.00</text>
          <text x="0" y="60" fill="#059669" font-family="monospace" font-size="10">PERCENT_RANK: 0.00, 0.33, 0.33, 1.00</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-8-5-multi-period-moving-sums",
    number: "8.5",
    title: "Multi-Period Moving Sums & Triangular Window Partitions",
    content: `
      <p class="lc-p">
        In LeetCode #579 (<em>Find Cumulative Salary of an Employee</em>) and #1308 (<em>Running Total</em>), sliding windows require bounded physical rows:
        <code>ROWS BETWEEN 2 PRECEDING AND CURRENT ROW</code> calculates rolling 3-period summaries while excluding the most recent active month via partition filters.
      </p>
    `,
    diagram: {
      title: "Bounded Sliding Window Frame Execution",
      svg: `<svg viewBox="0 0 880 150" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">ROLLING 3-MONTH WINDOW (ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)</text>
        <g transform="translate(40, 55)">
          <rect x="0" y="15" width="100" height="30" fill="#f8fafc" stroke="#94a3b8"/>
          <text x="15" y="34" fill="#0f172a" font-family="monospace" font-size="10">Month 1: $20</text>
          <rect x="110" y="15" width="100" height="30" fill="#eff6ff" stroke="#3b82f6"/>
          <text x="125" y="34" fill="#1d4ed8" font-family="monospace" font-size="10">Month 2: $30</text>
          <rect x="220" y="15" width="100" height="30" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
          <text x="235" y="34" fill="#1d4ed8" font-family="monospace" font-size="10" font-weight="700">Month 3: $40</text>
          <text x="340" y="34" fill="#16a34a" font-family="monospace" font-size="11" font-weight="700">-> Rolling Sum: $90 ($20+$30+$40)</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-8-6-departmental-benchmarks",
    number: "8.6",
    title: "Departmental Benchmark Normalization & Dynamic Ratio Analysis",
    content: `
      <p class="lc-p">
        In LeetCode #615 (<em>Average Salary: Departments VS Company</em>), comparing an entity against its global container requires joining an unpartitioned aggregate with a partitioned group aggregate.
      </p>
    `,
    diagram: {
      title: "Company vs Department Average Salary Synthesis",
      svg: `<svg viewBox="0 0 880 150" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">DEPARTMENT BENCHMARK VS COMPANY AVERAGE (AVG() OVER (PARTITION BY month))</text>
        <g transform="translate(40, 55)">
          <text x="0" y="20" fill="#475569" font-family="monospace" font-size="10">Dept 1 Avg: $9,000 | Company Avg: $7,000 -> 'higher'</text>
          <text x="0" y="45" fill="#475569" font-family="monospace" font-size="10">Dept 2 Avg: $6,000 | Company Avg: $7,000 -> 'lower'</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-8-7-outlier-detection-bounds",
    number: "8.7",
    title: "Outlier Detection & Extreme Exclusion: Quiet Student Analysis",
    content: `
      <p class="lc-p">
        In LeetCode #1412 (<em>Find the Quiet Students in All Exams</em>), high-dimensional filtering requires excluding candidates who attained the minimum or maximum score in any test, while verifying they took at least one exam.
      </p>
    `,
    diagram: {
      title: "Extrema Boundary Exclusion Pattern",
      svg: `<svg viewBox="0 0 880 150" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">QUIET CANDIDATE EXCLUSION (SCORE &gt; MIN AND SCORE &lt; MAX)</text>
        <g transform="translate(40, 55)">
          <text x="0" y="20" fill="#ef4444" font-family="monospace" font-size="10">Exclusion Set: student_id IN (SELECT student_id WHERE score = min_score OR score = max_score)</text>
          <text x="0" y="45" fill="#16a34a" font-family="monospace" font-size="10">Result Set: Candidates taking exams NOT IN Exclusion Set</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-8-8-dynamic-ledger-balancing",
    number: "8.8",
    title: "Dynamic Ledger Balancing & Net Credit State Machines",
    content: `
      <p class="lc-p">
        In LeetCode #1555 (<em>Bank Account Summary</em>), accounts undergo bidirectional credit mutations (paid as sender, received as receiver). A multi-stage CTE calculates net changes via <code>SUM(CASE WHEN paid_by = user_id THEN -amount ELSE amount END)</code>.
      </p>
    `,
    diagram: {
      title: "Double-Entry Ledger Balancing Pipeline",
      svg: `<svg viewBox="0 0 880 150" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">NET CREDIT LEDGER CALCULATION: INITIAL + INCOMING - OUTGOING</text>
        <g transform="translate(40, 55)">
          <text x="0" y="20" fill="#0f172a" font-family="monospace" font-size="10">Debit: paid_by = user_id (-amount) | Credit: paid_to = user_id (+amount)</text>
          <text x="0" y="45" fill="#2563eb" font-family="monospace" font-size="10">Final Credit = initial_credit + IFNULL(net_change, 0) | credit_limit_breached = credit &lt; 0</text>
        </g>
      </svg>`
    }
  }
];

const callouts = [
  {
    type: "danger",
    title: "Empty Result Set vs NULL in Stored Functions",
    content: "When a query produces 0 rows (e.g. asking for the 10th highest salary when only 5 exist), an unwrapped SELECT query returns an empty set. In MySQL UDFs, this causes the function to return NULL only if wrapped in an outer scalar query: SELECT (SELECT DISTINCT ...). Without the outer SELECT, the function fails or produces incorrect empty states."
  },
  {
    type: "warning",
    title: "Compressed Frequency Median Pitfall",
    content: "Never unnest or decompress frequency tables using recursive joins or cross joins on large datasets. A single row with frequency 100,000 will exhaust memory buffers. Always calculate medians on frequency tables using bi-directional cumulative frequency window sums."
  },
  {
    type: "info",
    title: "DENSE_RANK Partition Tie-Breaking",
    content: "When multiple rows have identical values in the ORDER BY clause of DENSE_RANK(), they receive identical rank numbers without consuming downstream ranks. For top-K queries per group, DENSE_RANK() <= K guarantees you do not inadvertently skip valid tied records."
  }
];

const mcqs = masterclassData.mcqs;
const drills = masterclassData.drills;

const section8Data = {
  conceptId: "concept-8",
  conceptNumber: 8,
  title: "Statistical Distributions & Medians",
  description: "Master continuous medians, frequency tables, DENSE_RANK tie-breakers, rolling multi-period sums, and user-defined scalar function wrappers.",
  masterclass: {
    chapters,
    callouts
  },
  mcqs,
  drills,
  problems: selectedProbs
};

const fileContent = `// =============================================================================
// LEETCODE ARENA - CONCEPT 8: STATISTICAL DISTRIBUTIONS & CONTINUOUS MEDIANS
// 12 Curated LeetCode Problems | 8 Masterclass Chapters | 100 MCQs | 100 Drills
// =============================================================================

window.LEETCODE_SECTION_8_DATA = ${JSON.stringify(section8Data, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../visualizer/leetcode_section8_data.js'), fileContent, 'utf8');
console.log(`Successfully generated visualizer/leetcode_section8_data.js with ${selectedProbs.length} problems!`);
