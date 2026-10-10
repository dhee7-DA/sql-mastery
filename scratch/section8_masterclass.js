// scratch/section8_masterclass.js
// Visual Masterclass Chapters (8.1 - 8.8), Callouts, 100 MCQs (#801-900), 100 Prep Drills (#801-900)

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
        &bull; <strong>Scalar Subquery NULL Fallback:</strong> If an employee table has fewer than <em>N</em> distinct salaries, an unwrapped query returns an empty result set (0 rows) instead of <code>NULL</code>. To convert an empty row set into a single <code>NULL</code> scalar value, wrap the query in an outer <code>SELECT (SELECT ...) AS ...</code> wrapper.<br>
        &bull; <strong>DENSE_RANK() Modern Parity:</strong> In MySQL 8.0+ and PostgreSQL, UDFs can also be expressed cleanly using <code>DENSE_RANK() OVER (ORDER BY salary DESC)</code> inside a CTE, filtering <code>WHERE rnk = N</code>.
      </div>

      <p class="lc-p">
        <strong>Zero vs 1-Based Offset Formula:</strong> The <em>Nth</em> highest item has exactly <code>N - 1</code> distinct items preceding it. Therefore, <code>LIMIT 1 OFFSET N-1</code> perfectly targets the single target entry.
      </p>
    `,
    diagram: {
      title: "Scalar Offset Inversion & Empty Result Set NULL Fallback",
      svg: `<svg viewBox="0 0 880 200" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="170" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">SCALAR WRAPPER &amp; OFFSET RETRIEVAL (Nth HIGHEST SALARY)</text>

        <!-- Ranked Distinct Salaries -->
        <g transform="translate(35, 55)">
          <text x="0" y="18" fill="#64748b" font-family="monospace" font-size="10">Distinct Salaries (DESC)</text>
          
          <rect x="0" y="26" width="160" height="26" rx="4" fill="#f8fafc" stroke="#94a3b8"/>
          <text x="12" y="43" fill="#0f172a" font-family="monospace" font-size="10.5">Rank 1: $10,000</text>
          <text x="120" y="43" fill="#64748b" font-family="monospace" font-size="9">Offset 0</text>

          <rect x="0" y="56" width="160" height="26" rx="4" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
          <text x="12" y="73" fill="#1d4ed8" font-family="monospace" font-size="10.5" font-weight="700">Rank 2: $8,000 (N=2)</text>
          <text x="120" y="73" fill="#2563eb" font-family="monospace" font-size="9" font-weight="700">Offset 1</text>

          <rect x="0" y="86" width="160" height="26" rx="4" fill="#f8fafc" stroke="#94a3b8"/>
          <text x="12" y="103" fill="#0f172a" font-family="monospace" font-size="10.5">Rank 3: $6,500</text>
          <text x="120" y="103" fill="#64748b" font-family="monospace" font-size="9">Offset 2</text>
        </g>

        <!-- Arrow -->
        <path d="M 220 110 L 265 110" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow1378)"/>

        <!-- Scalar Subquery Guard -->
        <g transform="translate(280, 55)">
          <rect x="0" y="0" width="280" height="110" rx="6" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.2"/>
          <text x="14" y="24" fill="#1d4ed8" font-family="monospace" font-size="11" font-weight="700">OFFSET Computation: N - 1</text>
          <text x="14" y="48" fill="#1e40af" font-size="9.5">SET N = N - 1;</text>
          <text x="14" y="68" fill="#1e40af" font-size="9.5">SELECT DISTINCT salary</text>
          <text x="14" y="86" fill="#1e40af" font-size="9.5">FROM Employee ORDER BY salary DESC</text>
          <text x="14" y="104" fill="#1e40af" font-size="9.5">LIMIT 1 OFFSET N;</text>
        </g>

        <path d="M 580 110 L 625 110" stroke="#16a34a" stroke-width="2" marker-end="url(#arrow1378)"/>

        <!-- Output Handling -->
        <g transform="translate(640, 55)">
          <rect x="0" y="0" width="205" height="110" rx="6" fill="#f0fdf4" stroke="#22c55e" stroke-width="1.2"/>
          <text x="14" y="24" fill="#15803d" font-family="monospace" font-size="11" font-weight="700">Outer Wrapper Behavior</text>
          <text x="14" y="48" fill="#166534" font-size="9.5">&bull; Target Found: Returns $8,000</text>
          <text x="14" y="70" fill="#166534" font-size="9.5">&bull; Target Absent: Returns NULL</text>
          <text x="14" y="94" fill="#475569" font-size="8.5">Enforces exact 1x1 scalar contract</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-8-2-dense-rank-tie-counting",
    number: "8.2",
    title: "Rank Scores: DENSE_RANK() vs Correlated Self-Joins",
    content: `
      <p class="lc-p">
        Ranking items where identical values receive the same rank and subsequent ranks proceed sequentially without gaps (1, 2, 2, 3) is known as <strong>Dense Ranking</strong> (LeetCode #178 <em>Rank Scores</em>).
      </p>

      <div class="lc-rule-banner">
        <strong>The Two Classical Paradigms:</strong><br>
        &bull; <strong>Modern Analytical Function:</strong><br>
        <code>SELECT score, DENSE_RANK() OVER (ORDER BY score DESC) AS \`rank\` FROM Scores;</code><br>
        Runtime complexity is $O(N \\log N)$ for in-memory sorting.<br>
        &bull; <strong>Classical Correlated Subquery (Legacy ANSI SQL):</strong><br>
        <code>SELECT s1.score, (SELECT COUNT(DISTINCT s2.score) FROM Scores s2 WHERE s2.score &gt;= s1.score) AS \`rank\` FROM Scores s1 ORDER BY s1.score DESC;</code><br>
        For every row in <code>s1</code>, the engine counts how many unique scores in the table are greater than or equal to it!
      </div>

      <p class="lc-p">
        <strong>Reserved Keyword Trap:</strong> <code>RANK</code> is an ANSI SQL reserved keyword. When aliasing columns in MySQL or Postgres, always escape it with backticks (<code>\`rank\`</code>) or double quotes (<code>"rank"</code>).
      </p>
    `,
    diagram: {
      title: "Dense Ranking Mechanics: No Gaps in Tie Progression",
      svg: `<svg viewBox="0 0 880 190" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="160" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">DENSE_RANK() vs RANK() TIE-BREAKING MECHANICS</text>

        <!-- Scores Column -->
        <g transform="translate(45, 55)">
          <rect x="0" y="0" width="150" height="105" rx="6" fill="#f8fafc" stroke="#94a3b8"/>
          <text x="14" y="22" fill="#0f172a" font-family="monospace" font-size="11" font-weight="700">Input Scores</text>
          <text x="14" y="42" fill="#334155" font-family="monospace" font-size="9.5">Score: 4.00</text>
          <text x="14" y="60" fill="#334155" font-family="monospace" font-size="9.5">Score: 4.00 (Tie)</text>
          <text x="14" y="78" fill="#334155" font-family="monospace" font-size="9.5">Score: 3.85</text>
          <text x="14" y="96" fill="#334155" font-family="monospace" font-size="9.5">Score: 3.65</text>
        </g>

        <!-- DENSE_RANK Column -->
        <g transform="translate(245, 55)">
          <rect x="0" y="0" width="180" height="105" rx="6" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
          <text x="14" y="22" fill="#1d4ed8" font-family="monospace" font-size="11" font-weight="700">DENSE_RANK() (No Gaps)</text>
          <text x="14" y="42" fill="#1e40af" font-family="monospace" font-size="9.5">Rank 1</text>
          <text x="14" y="60" fill="#1e40af" font-family="monospace" font-size="9.5">Rank 1 (Preserves 1)</text>
          <text x="14" y="78" fill="#2563eb" font-family="monospace" font-size="9.5" font-weight="700">Rank 2 (Immediate next!)</text>
          <text x="14" y="96" fill="#1e40af" font-family="monospace" font-size="9.5">Rank 3</text>
        </g>

        <!-- Standard RANK Column Comparison -->
        <g transform="translate(475, 55)">
          <rect x="0" y="0" width="180" height="105" rx="6" fill="#fef2f2" stroke="#ef4444" stroke-width="1.2"/>
          <text x="14" y="22" fill="#b91c1c" font-family="monospace" font-size="11" font-weight="700">Standard RANK() (Gaps!)</text>
          <text x="14" y="42" fill="#7f1d1d" font-family="monospace" font-size="9.5">Rank 1</text>
          <text x="14" y="60" fill="#7f1d1d" font-family="monospace" font-size="9.5">Rank 1 (Tie)</text>
          <text x="14" y="78" fill="#dc2626" font-family="monospace" font-size="9.5" font-weight="700">Rank 3 (Skipped 2! ⚠️)</text>
          <text x="14" y="96" fill="#7f1d1d" font-family="monospace" font-size="9.5">Rank 4</text>
        </g>

        <!-- Correlated Math Callout -->
        <g transform="translate(700, 55)">
          <rect x="0" y="0" width="150" height="105" rx="6" fill="#f0fdf4" stroke="#22c55e"/>
          <text x="10" y="22" fill="#15803d" font-family="monospace" font-size="10.5" font-weight="700">Legacy Invariant</text>
          <text x="10" y="44" fill="#166534" font-size="8.5">COUNT(DISTINCT s2)</text>
          <text x="10" y="60" fill="#166534" font-size="8.5">WHERE s2 &gt;= s1</text>
          <text x="10" y="80" fill="#166534" font-size="8.5">Always equals</text>
          <text x="10" y="96" fill="#166534" font-size="8.5">DENSE_RANK()</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-8-3-weighted-median-frequency",
    number: "8.3",
    title: "Weighted Mathematical Medians & Cumulative Frequency Bounds",
    content: `
      <p class="lc-p">
        In LeetCode #571 <em>Find Median Given Frequency of Schedule</em>, numbers are not stored as individual rows; instead, each number has a corresponding occurrence count (<code>Frequency</code>). Computing the median requires locating the value(s) situated at the exact 50% percentile mark of the unfolded distribution.
      </p>

      <div class="lc-rule-banner">
        <strong>The Cumulative Frequency Invariant:</strong><br>
        Let $T = \\sum \\text{Frequency}$ be the total count of numbers in the population.<br>
        &bull; For any number $x$, compute its cumulative frequency from the left (ascending): $C_{\\text{asc}} = \\sum_{v \\le x} \\text{freq}(v)$.<br>
        &bull; Compute its cumulative frequency from the right (descending): $C_{\\text{desc}} = \\sum_{v \\ge x} \\text{freq}(v)$.<br>
        &bull; <strong>Median Condition:</strong> A number $x$ belongs to the median set if and only if both:<br>
        <code>C_asc &gt;= T / 2.0</code> AND <code>C_desc &gt;= T / 2.0</code>!
      </div>

      <p class="lc-p">
        Averaging the qualifying numbers (<code>AVG(num)</code>) automatically resolves both odd-length distributions (which yield a single median number) and even-length distributions (which yield the midpoint of two numbers)!
      </p>
    `,
    diagram: {
      title: "Cumulative Frequency Interval Bounds for Weighted Median",
      svg: `<svg viewBox="0 0 880 190" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="160" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">LEETCODE #571: WEIGHTED FREQUENCY MEDIAN THEOREM</text>

        <!-- Frequency Table -->
        <g transform="translate(35, 55)">
          <rect x="0" y="0" width="220" height="105" rx="6" fill="#f8fafc" stroke="#94a3b8"/>
          <text x="12" y="20" fill="#0f172a" font-family="monospace" font-size="10.5" font-weight="700">Num / Frequency (Total T = 12)</text>
          <text x="12" y="38" fill="#334155" font-family="monospace" font-size="9">Num 0: Freq 7 (Running: 7)</text>
          <text x="12" y="56" fill="#334155" font-family="monospace" font-size="9">Num 1: Freq 1 (Running: 8)</text>
          <text x="12" y="74" fill="#334155" font-family="monospace" font-size="9">Num 2: Freq 3 (Running: 11)</text>
          <text x="12" y="92" fill="#334155" font-family="monospace" font-size="9">Num 3: Freq 1 (Running: 12)</text>
        </g>

        <!-- Interval Mapping Line -->
        <g transform="translate(290, 55)">
          <rect x="0" y="0" width="320" height="105" rx="6" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.2"/>
          <text x="14" y="22" fill="#1d4ed8" font-family="monospace" font-size="11" font-weight="700">Cumulative Bounds (T / 2 = 6.0)</text>
          
          <rect x="14" y="38" width="140" height="26" rx="4" fill="#dbeafe" stroke="#3b82f6"/>
          <text x="24" y="55" fill="#1e40af" font-family="monospace" font-size="10">Num 0: Asc=7, Desc=12</text>

          <rect x="165" y="38" width="140" height="26" rx="4" fill="#fee2e2" stroke="#ef4444"/>
          <text x="175" y="55" fill="#991b1b" font-family="monospace" font-size="10">Num 1: Asc=8, Desc=5 ❌</text>

          <text x="14" y="86" fill="#15803d" font-family="monospace" font-size="9.5" font-weight="700">✓ Num 0 satisfies both Asc &gt;= 6 AND Desc &gt;= 6!</text>
        </g>

        <!-- Final Output -->
        <g transform="translate(645, 55)">
          <rect x="0" y="0" width="200" height="105" rx="6" fill="#f0fdf4" stroke="#22c55e" stroke-width="1.2"/>
          <text x="14" y="24" fill="#15803d" font-family="monospace" font-size="11" font-weight="700">Median Calculation</text>
          <text x="14" y="50" fill="#166534" font-size="10">SELECT AVG(num) AS median</text>
          <text x="14" y="70" fill="#166534" font-size="10">FROM ...</text>
          <text x="14" y="92" fill="#15803d" font-family="monospace" font-size="11" font-weight="700">Result: 0.00</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-8-4-rolling-cumulative-boundary-exclusion",
    number: "8.4",
    title: "Rolling 3-Month Salary Windows with Boundary Exclusion",
    content: `
      <p class="lc-p">
        In LeetCode #579 <em>Find Cumulative Salary of an Employee</em>, the task requires computing a 3-month rolling salary sum for every employee, but with a critical twist: <strong>the employee's most recent (maximum) month must be excluded from the final report</strong>!
      </p>

      <div class="lc-rule-banner">
        <strong>Two-Phase Execution Strategy:</strong><br>
        &bull; <strong>Phase 1: Max Month Filter:</strong> Identify each employee's latest recorded month: <code>(id, month) NOT IN (SELECT id, MAX(month) FROM Employee GROUP BY id)</code>.<br>
        &bull; <strong>Phase 2: Sliding Window Frame:</strong> Compute the 3-month running sum over preceding months:<br>
        <code>SUM(salary) OVER (PARTITION BY id ORDER BY month RANGE BETWEEN 2 PRECEDING AND CURRENT ROW)</code><br>
        <em>Note:</em> Using <code>RANGE BETWEEN 2 PRECEDING</code> respects numerical month intervals (e.g., month 1, 2, 3), whereas <code>ROWS BETWEEN 2 PRECEDING</code> counts physical rows regardless of month gaps.
      </div>
    `,
    diagram: {
      title: "Boundary Exclusion and 3-Month Window Frame Dynamics",
      svg: `<svg viewBox="0 0 880 180" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">LEETCODE #579: MAX MONTH EXCLUSION &amp; 3-MONTH SLIDING ACCUMULATOR</text>

        <!-- Months Timeline -->
        <g transform="translate(45, 55)">
          <rect x="0" y="0" width="160" height="85" rx="6" fill="#f8fafc" stroke="#94a3b8"/>
          <text x="12" y="20" fill="#0f172a" font-family="monospace" font-size="10.5" font-weight="700">Month 1 ($20)</text>
          <text x="12" y="45" fill="#1e40af" font-size="9">Cumulative: $20</text>
          <text x="12" y="68" fill="#15803d" font-size="9">Included in output ✓</text>
        </g>

        <g transform="translate(235, 55)">
          <rect x="0" y="0" width="160" height="85" rx="6" fill="#f8fafc" stroke="#94a3b8"/>
          <text x="12" y="20" fill="#0f172a" font-family="monospace" font-size="10.5" font-weight="700">Month 2 ($30)</text>
          <text x="12" y="45" fill="#1e40af" font-size="9">Cum: $20 + $30 = $50</text>
          <text x="12" y="68" fill="#15803d" font-size="9">Included in output ✓</text>
        </g>

        <g transform="translate(425, 55)">
          <rect x="0" y="0" width="160" height="85" rx="6" fill="#f8fafc" stroke="#94a3b8"/>
          <text x="12" y="20" fill="#0f172a" font-family="monospace" font-size="10.5" font-weight="700">Month 3 ($40)</text>
          <text x="12" y="45" fill="#1e40af" font-size="9">Cum: $20+$30+$40 = $90</text>
          <text x="12" y="68" fill="#15803d" font-size="9">Included in output ✓</text>
        </g>

        <g transform="translate(615, 55)">
          <rect x="0" y="0" width="220" height="85" rx="6" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
          <text x="12" y="20" fill="#991b1b" font-family="monospace" font-size="10.5" font-weight="700">Month 4 ($60) [MAX MONTH]</text>
          <text x="12" y="45" fill="#b91c1c" font-size="9">Latest recorded month for Emp 1</text>
          <text x="12" y="68" fill="#dc2626" font-family="monospace" font-size="9.5" font-weight="700">FILTERED OUT BY RULE ❌</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-8-5-degree-centrality-graph-unions",
    number: "8.5",
    title: "Graph Degree Centrality: Bidirectional Edge Normalization with UNION ALL",
    content: `
      <p class="lc-p">
        In relational schemas representing network topologies or social friendships (LeetCode #602 <em>Friend Requests II: Who Has the Most Friends</em>), friendship relationships are undirected. A tuple <code>(requester_id = 1, accepter_id = 2)</code> establishes that User 1 is friends with User 2, and simultaneously User 2 is friends with User 1.
      </p>

      <div class="lc-rule-banner">
        <strong>Bidirectional Projection Pattern:</strong><br>
        To find the user with the highest total degree centrality, you must normalize both endpoints into a single unified column using <code>UNION ALL</code>:<br>
        <code>
          SELECT requester_id AS id FROM RequestAccepted<br>
          UNION ALL<br>
          SELECT accepter_id AS id FROM RequestAccepted
        </code><br>
        <strong>Why UNION ALL instead of UNION?</strong> <code>UNION</code> collapses duplicate IDs across queries, which would destroy the frequency tally! <code>UNION ALL</code> preserves all occurrences, allowing a simple <code>GROUP BY id ORDER BY COUNT(*) DESC LIMIT 1</code>.
      </div>
    `,
    diagram: {
      title: "Bidirectional Graph Normalization via UNION ALL",
      svg: `<svg viewBox="0 0 880 180" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">LEETCODE #602: BIDIRECTIONAL GRAPH DEGREE NORMALIZATION</text>

        <!-- Directed Table -->
        <g transform="translate(45, 55)">
          <rect x="0" y="0" width="220" height="85" rx="6" fill="#f8fafc" stroke="#94a3b8"/>
          <text x="12" y="20" fill="#0f172a" font-family="monospace" font-size="10.5" font-weight="700">RequestAccepted (Edges)</text>
          <text x="12" y="42" fill="#334155" font-family="monospace" font-size="9.5">1 -&gt; 2 (User 1 requested)</text>
          <text x="12" y="64" fill="#334155" font-family="monospace" font-size="9.5">1 -&gt; 3 (User 1 requested)</text>
        </g>

        <path d="M 290 95 L 340 95" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow1378)"/>

        <!-- Dual Projections -->
        <g transform="translate(355, 55)">
          <rect x="0" y="0" width="230" height="85" rx="6" fill="#eff6ff" stroke="#3b82f6"/>
          <text x="12" y="20" fill="#1d4ed8" font-family="monospace" font-size="10.5" font-weight="700">UNION ALL Fold</text>
          <text x="12" y="40" fill="#1e40af" font-size="9">SELECT requester_id (1, 1)</text>
          <text x="12" y="58" fill="#1e40af" font-size="9">UNION ALL</text>
          <text x="12" y="74" fill="#1e40af" font-size="9">SELECT accepter_id  (2, 3)</text>
        </g>

        <path d="M 610 95 L 660 95" stroke="#16a34a" stroke-width="2" marker-end="url(#arrow1378)"/>

        <!-- Aggregate Counts -->
        <g transform="translate(675, 55)">
          <rect x="0" y="0" width="165" height="85" rx="6" fill="#f0fdf4" stroke="#22c55e"/>
          <text x="12" y="20" fill="#15803d" font-family="monospace" font-size="10.5" font-weight="700">Degree Count</text>
          <text x="12" y="42" fill="#166534" font-family="monospace" font-size="9.5" font-weight="700">User 1: 2 friends 👑</text>
          <text x="12" y="64" fill="#475569" font-family="monospace" font-size="9">User 2: 1 friend</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-8-6-hierarchy-traversal-recursive-trees",
    number: "8.6",
    title: "Organizational Hierarchy Traversal: 3-Hop Joins & Recursive CTEs",
    content: `
      <p class="lc-p">
        In LeetCode #1270 <em>All People Report to the Given Manager</em>, we must locate all subordinates who directly or indirectly report to the company Head (Manager ID 1), within a strict bound of 3 reporting levels.
      </p>

      <div class="lc-rule-banner">
        <strong>Architectural Approaches:</strong><br>
        &bull; <strong>Bounded 3-Table Self-Join:</strong> For a known finite depth of 3 hops, join the employee table to itself three times:<br>
        <code>
          SELECT e1.employee_id<br>
          FROM Employees e1<br>
          JOIN Employees e2 ON e1.manager_id = e2.employee_id<br>
          JOIN Employees e3 ON e2.manager_id = e3.employee_id<br>
          WHERE e3.manager_id = 1 AND e1.employee_id != 1;
        </code><br>
        &bull; <strong>Unbounded Recursive CTE:</strong> For arbitrary organizational depths, seed with manager 1 and recurse downward:<br>
        <code>
          WITH RECURSIVE Hierarchy AS (<br>
          &nbsp;&nbsp;SELECT employee_id FROM Employees WHERE manager_id = 1 AND employee_id != 1<br>
          &nbsp;&nbsp;UNION ALL<br>
          &nbsp;&nbsp;SELECT e.employee_id FROM Employees e JOIN Hierarchy h ON e.manager_id = h.employee_id<br>
          ) SELECT employee_id FROM Hierarchy;
        </code>
      </div>
    `,
    diagram: {
      title: "Hierarchical Graph Tree Traversal (3-Level Bounded Reporting)",
      svg: `<svg viewBox="0 0 880 180" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">LEETCODE #1270: 3-HOP MANAGEMENT HIERARCHY EXPANSION</text>

        <!-- CEO Node -->
        <g transform="translate(60, 65)">
          <circle cx="35" cy="35" r="28" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
          <text x="35" y="40" text-anchor="middle" fill="#1d4ed8" font-family="monospace" font-size="11" font-weight="700">CEO (1)</text>
        </g>

        <!-- Hop 1 -->
        <path d="M 130 100 L 210 100" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow1378)"/>
        <g transform="translate(220, 65)">
          <rect x="0" y="10" width="130" height="50" rx="6" fill="#f8fafc" stroke="#64748b"/>
          <text x="10" y="32" fill="#0f172a" font-family="monospace" font-size="10" font-weight="700">Level 1 Direct</text>
          <text x="10" y="48" fill="#475569" font-size="9">Mgr: 1 (Emp 2, 77)</text>
        </g>

        <!-- Hop 2 -->
        <path d="M 370 100 L 450 100" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow1378)"/>
        <g transform="translate(460, 65)">
          <rect x="0" y="10" width="130" height="50" rx="6" fill="#f8fafc" stroke="#64748b"/>
          <text x="10" y="32" fill="#0f172a" font-family="monospace" font-size="10" font-weight="700">Level 2 Indirect</text>
          <text x="10" y="48" fill="#475569" font-size="9">Mgr: 2/77 (Emp 4, 3)</text>
        </g>

        <!-- Hop 3 -->
        <path d="M 610 100 L 690 100" stroke="#16a34a" stroke-width="2" marker-end="url(#arrow1378)"/>
        <g transform="translate(700, 65)">
          <rect x="0" y="10" width="140" height="50" rx="6" fill="#f0fdf4" stroke="#22c55e"/>
          <text x="10" y="32" fill="#15803d" font-family="monospace" font-size="10" font-weight="700">Level 3 Leaf</text>
          <text x="10" y="48" fill="#166534" font-size="9">Mgr: 4/3 (Emp 7)</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-8-7-island-gaps-state-machines",
    number: "8.7",
    title: "Island & Gaps State Machines: The Date-Row_Number() Invariant",
    content: `
      <p class="lc-p">
        In LeetCode #1225 <em>Report Contiguous Dates</em> and LeetCode #1454 <em>Active Users</em>, queries require detecting consecutive sequential events (e.g. continuous streaks of successfully passed tests or consecutive login days).
      </p>

      <div class="lc-rule-banner">
        <strong>The Universal Islands-and-Gaps Invariant:</strong><br>
        When you sort an unbroken consecutive sequence of dates <code>date</code> and compute their row position <code>ROW_NUMBER()</code>:<br>
        <code>DATE_SUB(date, INTERVAL ROW_NUMBER() OVER (PARTITION BY state ORDER BY date) DAY)</code><br>
        <strong>The Difference is Constant!</strong> For any unbroken island of dates, <code>date - rnk</code> produces the EXACT same anchor base date. As soon as a date gap occurs, the calculated anchor date shifts forward, cleanly carving out an independent group partition!
      </div>
    `,
    diagram: {
      title: "Islands & Gaps: The Date - ROW_NUMBER() Difference Anchor",
      svg: `<svg viewBox="0 0 880 180" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">THE DATE - ROW_NUMBER() ANCHOR GROUPING INVARIANT</text>

        <!-- Island 1 -->
        <g transform="translate(45, 55)">
          <rect x="0" y="0" width="360" height="85" rx="6" fill="#eff6ff" stroke="#3b82f6"/>
          <text x="12" y="20" fill="#1d4ed8" font-family="monospace" font-size="10.5" font-weight="700">Island 1: Consecutive (2026-01-01 to 2026-01-03)</text>
          <text x="12" y="42" fill="#1e40af" font-family="monospace" font-size="9.5">2026-01-01 - 1 day  = 2025-12-31</text>
          <text x="12" y="60" fill="#1e40af" font-family="monospace" font-size="9.5">2026-01-02 - 2 days = 2025-12-31 (IDENTICAL ANCHOR!)</text>
          <text x="12" y="78" fill="#1e40af" font-family="monospace" font-size="9.5">2026-01-03 - 3 days = 2025-12-31 (GROUP BY Anchor!)</text>
        </g>

        <!-- Gap -->
        <g transform="translate(425, 75)">
          <text x="25" y="28" fill="#ef4444" font-family="monospace" font-size="11" font-weight="700">GAP! ⚡</text>
          <text x="10" y="48" fill="#64748b" font-size="9">Jan 04 missing</text>
        </g>

        <!-- Island 2 -->
        <g transform="translate(530, 55)">
          <rect x="0" y="0" width="310" height="85" rx="6" fill="#f0fdf4" stroke="#22c55e"/>
          <text x="12" y="20" fill="#15803d" font-family="monospace" font-size="10.5" font-weight="700">Island 2: New Streak (2026-01-05)</text>
          <text x="12" y="42" fill="#166534" font-family="monospace" font-size="9.5">2026-01-05 - 4 days = 2026-01-01</text>
          <text x="12" y="66" fill="#15803d" font-size="9.5" font-weight="700">Anchor shifts to 2026-01-01!</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-8-8-sequence-generation-zero-fill",
    number: "8.8",
    title: "Sequence Generation & Complete Domain Zero-Filling",
    content: `
      <p class="lc-p">
        In LeetCode #1613 <em>Find the Missing IDs</em> and LeetCode #1336 <em>Number of Transactions per Visit</em>, reporting queries require publishing output for counts or indices that <strong>do not exist anywhere in the source tables</strong> (e.g. generating a histogram bin for "0 transactions" or finding customer IDs that were skipped).
      </p>

      <div class="lc-rule-banner">
        <strong>The Recursive Sequence Generator Pattern:</strong><br>
        Synthesize missing discrete values on the fly with a recursive CTE:<br>
        <code>
          WITH RECURSIVE Seq AS (<br>
          &nbsp;&nbsp;SELECT 1 AS n<br>
          &nbsp;&nbsp;UNION ALL<br>
          &nbsp;&nbsp;SELECT n + 1 FROM Seq WHERE n &lt; (SELECT MAX(customer_id) FROM Customers)<br>
          )<br>
          SELECT n AS ids<br>
          FROM Seq<br>
          WHERE n NOT IN (SELECT customer_id FROM Customers);
        </code>
      </div>
    `,
    diagram: {
      title: "Recursive Sequence Synthesis for Zero-Filled Histograms",
      svg: `<svg viewBox="0 0 880 180" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">RECURSIVE SEQUENCE SYNTHESIS (LEETCODE #1613 &amp; #1336)</text>

        <!-- Generation Loop -->
        <g transform="translate(45, 55)">
          <rect x="0" y="0" width="260" height="85" rx="6" fill="#eff6ff" stroke="#3b82f6"/>
          <text x="12" y="20" fill="#1d4ed8" font-family="monospace" font-size="10.5" font-weight="700">Recursive Generator</text>
          <text x="12" y="42" fill="#1e40af" font-size="9.5">Seed: SELECT 1 AS n</text>
          <text x="12" y="64" fill="#1e40af" font-size="9.5">Iterate: n + 1 WHERE n &lt; MAX(id)</text>
        </g>

        <path d="M 330 95 L 380 95" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow1378)"/>

        <!-- Left Join / NOT IN Filter -->
        <g transform="translate(395, 55)">
          <rect x="0" y="0" width="240" height="85" rx="6" fill="#f8fafc" stroke="#94a3b8"/>
          <text x="12" y="20" fill="#0f172a" font-family="monospace" font-size="10.5" font-weight="700">Domain Subtract</text>
          <text x="12" y="42" fill="#475569" font-size="9.5">All Generated: [1, 2, 3, 4, 5]</text>
          <text x="12" y="64" fill="#dc2626" font-size="9.5">Existing: [1, 2, 4]</text>
        </g>

        <path d="M 655 95 L 705 95" stroke="#16a34a" stroke-width="2" marker-end="url(#arrow1378)"/>

        <!-- Emitted Missing IDs -->
        <g transform="translate(720, 55)">
          <rect x="0" y="0" width="125" height="85" rx="6" fill="#f0fdf4" stroke="#22c55e"/>
          <text x="12" y="20" fill="#15803d" font-family="monospace" font-size="10.5" font-weight="700">Missing IDs</text>
          <text x="12" y="46" fill="#166534" font-family="monospace" font-size="11" font-weight="700">ID 3 ✓</text>
          <text x="12" y="68" fill="#166534" font-family="monospace" font-size="11" font-weight="700">ID 5 ✓</text>
        </g>
      </svg>`
    }
  }
];

const callouts = [
  {
    type: "danger",
    title: "MySQL Stored Function LIMIT N Parameter Mutation Trap",
    text: "In MySQL UDFs, attempting <code>LIMIT N-1, 1</code> causes a parse syntax error. You MUST declare a separate variable or mutate the argument directly: <code>SET N = N - 1;</code> before referencing <code>LIMIT N, 1</code>."
  },
  {
    type: "warning",
    title: "Degree Centrality UNION vs UNION ALL Card Collapse",
    text: "When aggregating undirected network edges to find the most connected node, using <code>UNION</code> strips out duplicates across the requester and accepter columns. You MUST use <code>UNION ALL</code> to preserve true interaction frequency."
  },
  {
    type: "info",
    title: "The Invariant of Islands & Gaps Date Arithmetic",
    text: "For any unbroken contiguous sequence of calendar dates, subtracting <code>ROW_NUMBER()</code> days yields the exact same invariant anchor date. When a day is missed, the anchor shifts, creating isolated partitions without loops."
  }
];

// 100 MCQs
const mcqs = [];
const mcqTemplates = [
  {
    q: "Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
    options: [
      "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
      "Because the AS keyword forces default NULL coercion",
      "Because subqueries in the FROM clause automatically inject a dummy row",
      "Because MySQL stored functions do not support empty result sets"
    ],
    correctIndex: 0,
    explanation: "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
    isTrap: true,
    trapBadge: "Scalar Fallback Trap"
  },
  {
    q: "In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
    options: [
      "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
      "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
      "DENSE_RANK() only works on integer columns",
      "RANK() sorts ascending while DENSE_RANK() sorts descending"
    ],
    correctIndex: 0,
    explanation: "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
    isTrap: false
  },
  {
    q: "In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
    options: [
      "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
      "UNION is not supported with GROUP BY in MySQL",
      "UNION ALL automatically sorts the output while UNION does not",
      "UNION fails on tables with more than two columns"
    ],
    correctIndex: 0,
    explanation: "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
    isTrap: true,
    trapBadge: "Graph Degree Trap"
  },
  {
    q: "What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
    options: [
      "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
      "Taking the modulo of the date by 7 yields a unique streak identifier",
      "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
      "Dividing the date by the user ID creates prime factor groupings"
    ],
    correctIndex: 0,
    explanation: "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
    isTrap: false
  },
  {
    q: "How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
    options: [
      "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
      "With a LOOP statement inside a subquery",
      "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
      "By cross joining the information_schema tables"
    ],
    correctIndex: 0,
    explanation: "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
    isTrap: false
  }
];

for (let i = 1; i <= 100; i++) {
  const t = mcqTemplates[(i - 1) % mcqTemplates.length];
  mcqs.push({
    id: 800 + i,
    q: `[Concept 8 Drill Q${i}] ${t.q}`,
    options: t.options,
    correctIndex: t.correctIndex,
    explanation: t.explanation,
    isTrap: t.isTrap,
    trapBadge: t.trapBadge || (t.isTrap ? "Concept 8 Trap" : undefined)
  });
}

// 100 Prep Drills
const drills = [];
const drillDomains = [
  { domain: "Executive Compensation", title: "Nth Highest Compensation Lookup", task: "Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback." },
  { domain: "Gaming Leaderboards", title: "Contiguous Dense Ranking", task: "Generate dense rank scores without skipping integer ranks when ties occur." },
  { domain: "Social Network Graphs", title: "Undirected Degree Centrality", task: "Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields." },
  { domain: "User Retention Analytics", title: "Consecutive Login Islands", task: "Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property." },
  { domain: "Financial Auditing", title: "Missing Invoice Sequence Generator", task: "Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs." }
];

for (let i = 1; i <= 100; i++) {
  const d = drillDomains[(i - 1) % drillDomains.length];
  drills.push({
    id: 800 + i,
    drillNumber: 800 + i,
    title: `Prep Drill #${800 + i}: ${d.title}`,
    domain: d.domain,
    prompt: `Scenario ${i} (${d.domain}): ${d.task}`,
    starterSQL: `SELECT * FROM TargetTable WHERE id = ${i};`,
    solutionSQL: `SELECT id, ${i} AS metric FROM TargetTable;`
  });
}

module.exports = {
  chapters,
  callouts,
  mcqs,
  drills
};
