/**
 * LeetCode SQL Arena - Concept 8 Data File
 * Concept: Advanced Premium Core & Analytics
 * Includes:
 *   - 8 Visual Masterclass Chapters with bespoke Vector SVGs
 *   - 3 Masterclass Callouts (Danger, Warning, Info)
 *   - 100 Concept MCQs (#801-900)
 *   - 100 Prep Drills (#801-900)
 *   - 50 Curated LeetCode Premium Problems (Problems #77 to #126 in Arena)
 */

window.LEETCODE_SECTION_8_DATA = {
  "conceptId": "concept-8",
  "conceptNumber": 8,
  "title": "Advanced Premium Core & Analytics",
  "subtitle": "50 LeetCode Premium Classics: UDFs, Dense Ranks, Weighted Medians, Graph Degrees & Island-Gaps",
  "description": "Master the official LeetCode Advanced SQL 50 and canonical premium interview questions asked by Amazon, Meta, Google, Uber, Twitter, and Apple. Deep-dive into user-defined scalar functions, weighted frequency medians, rolling window exclusions, bidirectional graph normalization, organizational hierarchy traversal, and Islands & Gaps state machines.",
  "masterclass": {
    "chapters": [
      {
        "id": "chap-8-1-udf-scalar-offsets",
        "number": "8.1",
        "title": "User-Defined Functions, Scalar Wrappers & LIMIT Offsets",
        "content": "\n      <p class=\"lc-p\">\n        In technical interviews involving <em>Nth</em> statistics (e.g., LeetCode #177 <em>Nth Highest Salary</em>), database engines treat the <code>LIMIT</code> clause as a literal numerical token. Passing runtime expressions like <code>LIMIT N-1, 1</code> directly into an inline query triggers syntax errors in traditional MySQL syntax.\n      </p>\n\n      <div class=\"lc-rule-banner\">\n        <strong>The Stored Function &amp; Offset Invariant:</strong><br>\n        &bull; <strong>Variable Pre-computation:</strong> In MySQL UDFs (<code>CREATE FUNCTION</code>), you must decrement the input parameter in a procedural assignment block: <code>SET N = N - 1;</code> before executing the scalar query.<br>\n        &bull; <strong>Scalar Subquery NULL Fallback:</strong> If an employee table has fewer than <em>N</em> distinct salaries, an unwrapped query returns an empty result set (0 rows) instead of <code>NULL</code>. To convert an empty row set into a single <code>NULL</code> scalar value, wrap the query in an outer <code>SELECT (SELECT ...) AS ...</code> wrapper.<br>\n        &bull; <strong>DENSE_RANK() Modern Parity:</strong> In MySQL 8.0+ and PostgreSQL, UDFs can also be expressed cleanly using <code>DENSE_RANK() OVER (ORDER BY salary DESC)</code> inside a CTE, filtering <code>WHERE rnk = N</code>.\n      </div>\n\n      <p class=\"lc-p\">\n        <strong>Zero vs 1-Based Offset Formula:</strong> The <em>Nth</em> highest item has exactly <code>N - 1</code> distinct items preceding it. Therefore, <code>LIMIT 1 OFFSET N-1</code> perfectly targets the single target entry.\n      </p>\n    ",
        "diagram": {
          "title": "Scalar Offset Inversion & Empty Result Set NULL Fallback",
          "svg": "<svg viewBox=\"0 0 880 200\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"170\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">SCALAR WRAPPER &amp; OFFSET RETRIEVAL (Nth HIGHEST SALARY)</text>\n\n        <!-- Ranked Distinct Salaries -->\n        <g transform=\"translate(35, 55)\">\n          <text x=\"0\" y=\"18\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"10\">Distinct Salaries (DESC)</text>\n          \n          <rect x=\"0\" y=\"26\" width=\"160\" height=\"26\" rx=\"4\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n          <text x=\"12\" y=\"43\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\">Rank 1: $10,000</text>\n          <text x=\"120\" y=\"43\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"9\">Offset 0</text>\n\n          <rect x=\"0\" y=\"56\" width=\"160\" height=\"26\" rx=\"4\" fill=\"#eff6ff\" stroke=\"#3b82f6\" stroke-width=\"1.5\"/>\n          <text x=\"12\" y=\"73\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Rank 2: $8,000 (N=2)</text>\n          <text x=\"120\" y=\"73\" fill=\"#2563eb\" font-family=\"monospace\" font-size=\"9\" font-weight=\"700\">Offset 1</text>\n\n          <rect x=\"0\" y=\"86\" width=\"160\" height=\"26\" rx=\"4\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n          <text x=\"12\" y=\"103\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\">Rank 3: $6,500</text>\n          <text x=\"120\" y=\"103\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"9\">Offset 2</text>\n        </g>\n\n        <!-- Arrow -->\n        <path d=\"M 220 110 L 265 110\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n        <!-- Scalar Subquery Guard -->\n        <g transform=\"translate(280, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"280\" height=\"110\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\" stroke-width=\"1.2\"/>\n          <text x=\"14\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">OFFSET Computation: N - 1</text>\n          <text x=\"14\" y=\"48\" fill=\"#1e40af\" font-size=\"9.5\">SET N = N - 1;</text>\n          <text x=\"14\" y=\"68\" fill=\"#1e40af\" font-size=\"9.5\">SELECT DISTINCT salary</text>\n          <text x=\"14\" y=\"86\" fill=\"#1e40af\" font-size=\"9.5\">FROM Employee ORDER BY salary DESC</text>\n          <text x=\"14\" y=\"104\" fill=\"#1e40af\" font-size=\"9.5\">LIMIT 1 OFFSET N;</text>\n        </g>\n\n        <path d=\"M 580 110 L 625 110\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n        <!-- Output Handling -->\n        <g transform=\"translate(640, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"205\" height=\"110\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\" stroke-width=\"1.2\"/>\n          <text x=\"14\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Outer Wrapper Behavior</text>\n          <text x=\"14\" y=\"48\" fill=\"#166534\" font-size=\"9.5\">&bull; Target Found: Returns $8,000</text>\n          <text x=\"14\" y=\"70\" fill=\"#166534\" font-size=\"9.5\">&bull; Target Absent: Returns NULL</text>\n          <text x=\"14\" y=\"94\" fill=\"#475569\" font-size=\"8.5\">Enforces exact 1x1 scalar contract</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-8-2-dense-rank-tie-counting",
        "number": "8.2",
        "title": "Rank Scores: DENSE_RANK() vs Correlated Self-Joins",
        "content": "\n      <p class=\"lc-p\">\n        Ranking items where identical values receive the same rank and subsequent ranks proceed sequentially without gaps (1, 2, 2, 3) is known as <strong>Dense Ranking</strong> (LeetCode #178 <em>Rank Scores</em>).\n      </p>\n\n      <div class=\"lc-rule-banner\">\n        <strong>The Two Classical Paradigms:</strong><br>\n        &bull; <strong>Modern Analytical Function:</strong><br>\n        <code>SELECT score, DENSE_RANK() OVER (ORDER BY score DESC) AS `rank` FROM Scores;</code><br>\n        Runtime complexity is $O(N \\log N)$ for in-memory sorting.<br>\n        &bull; <strong>Classical Correlated Subquery (Legacy ANSI SQL):</strong><br>\n        <code>SELECT s1.score, (SELECT COUNT(DISTINCT s2.score) FROM Scores s2 WHERE s2.score &gt;= s1.score) AS `rank` FROM Scores s1 ORDER BY s1.score DESC;</code><br>\n        For every row in <code>s1</code>, the engine counts how many unique scores in the table are greater than or equal to it!\n      </div>\n\n      <p class=\"lc-p\">\n        <strong>Reserved Keyword Trap:</strong> <code>RANK</code> is an ANSI SQL reserved keyword. When aliasing columns in MySQL or Postgres, always escape it with backticks (<code>`rank`</code>) or double quotes (<code>\"rank\"</code>).\n      </p>\n    ",
        "diagram": {
          "title": "Dense Ranking Mechanics: No Gaps in Tie Progression",
          "svg": "<svg viewBox=\"0 0 880 190\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"160\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">DENSE_RANK() vs RANK() TIE-BREAKING MECHANICS</text>\n\n        <!-- Scores Column -->\n        <g transform=\"translate(45, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"150\" height=\"105\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n          <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Input Scores</text>\n          <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Score: 4.00</text>\n          <text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Score: 4.00 (Tie)</text>\n          <text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Score: 3.85</text>\n          <text x=\"14\" y=\"96\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Score: 3.65</text>\n        </g>\n\n        <!-- DENSE_RANK Column -->\n        <g transform=\"translate(245, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"180\" height=\"105\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\" stroke-width=\"1.5\"/>\n          <text x=\"14\" y=\"22\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">DENSE_RANK() (No Gaps)</text>\n          <text x=\"14\" y=\"42\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">Rank 1</text>\n          <text x=\"14\" y=\"60\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">Rank 1 (Preserves 1)</text>\n          <text x=\"14\" y=\"78\" fill=\"#2563eb\" font-family=\"monospace\" font-size=\"9.5\" font-weight=\"700\">Rank 2 (Immediate next!)</text>\n          <text x=\"14\" y=\"96\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">Rank 3</text>\n        </g>\n\n        <!-- Standard RANK Column Comparison -->\n        <g transform=\"translate(475, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"180\" height=\"105\" rx=\"6\" fill=\"#fef2f2\" stroke=\"#ef4444\" stroke-width=\"1.2\"/>\n          <text x=\"14\" y=\"22\" fill=\"#b91c1c\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Standard RANK() (Gaps!)</text>\n          <text x=\"14\" y=\"42\" fill=\"#7f1d1d\" font-family=\"monospace\" font-size=\"9.5\">Rank 1</text>\n          <text x=\"14\" y=\"60\" fill=\"#7f1d1d\" font-family=\"monospace\" font-size=\"9.5\">Rank 1 (Tie)</text>\n          <text x=\"14\" y=\"78\" fill=\"#dc2626\" font-family=\"monospace\" font-size=\"9.5\" font-weight=\"700\">Rank 3 (Skipped 2! ⚠️)</text>\n          <text x=\"14\" y=\"96\" fill=\"#7f1d1d\" font-family=\"monospace\" font-size=\"9.5\">Rank 4</text>\n        </g>\n\n        <!-- Correlated Math Callout -->\n        <g transform=\"translate(700, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"150\" height=\"105\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n          <text x=\"10\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Legacy Invariant</text>\n          <text x=\"10\" y=\"44\" fill=\"#166534\" font-size=\"8.5\">COUNT(DISTINCT s2)</text>\n          <text x=\"10\" y=\"60\" fill=\"#166534\" font-size=\"8.5\">WHERE s2 &gt;= s1</text>\n          <text x=\"10\" y=\"80\" fill=\"#166534\" font-size=\"8.5\">Always equals</text>\n          <text x=\"10\" y=\"96\" fill=\"#166534\" font-size=\"8.5\">DENSE_RANK()</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-8-3-weighted-median-frequency",
        "number": "8.3",
        "title": "Weighted Mathematical Medians & Cumulative Frequency Bounds",
        "content": "\n      <p class=\"lc-p\">\n        In LeetCode #571 <em>Find Median Given Frequency of Schedule</em>, numbers are not stored as individual rows; instead, each number has a corresponding occurrence count (<code>Frequency</code>). Computing the median requires locating the value(s) situated at the exact 50% percentile mark of the unfolded distribution.\n      </p>\n\n      <div class=\"lc-rule-banner\">\n        <strong>The Cumulative Frequency Invariant:</strong><br>\n        Let $T = \\sum \\text{Frequency}$ be the total count of numbers in the population.<br>\n        &bull; For any number $x$, compute its cumulative frequency from the left (ascending): $C_{\\text{asc}} = \\sum_{v \\le x} \\text{freq}(v)$.<br>\n        &bull; Compute its cumulative frequency from the right (descending): $C_{\\text{desc}} = \\sum_{v \\ge x} \\text{freq}(v)$.<br>\n        &bull; <strong>Median Condition:</strong> A number $x$ belongs to the median set if and only if both:<br>\n        <code>C_asc &gt;= T / 2.0</code> AND <code>C_desc &gt;= T / 2.0</code>!\n      </div>\n\n      <p class=\"lc-p\">\n        Averaging the qualifying numbers (<code>AVG(num)</code>) automatically resolves both odd-length distributions (which yield a single median number) and even-length distributions (which yield the midpoint of two numbers)!\n      </p>\n    ",
        "diagram": {
          "title": "Cumulative Frequency Interval Bounds for Weighted Median",
          "svg": "<svg viewBox=\"0 0 880 190\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"160\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #571: WEIGHTED FREQUENCY MEDIAN THEOREM</text>\n\n        <!-- Frequency Table -->\n        <g transform=\"translate(35, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"220\" height=\"105\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n          <text x=\"12\" y=\"20\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Num / Frequency (Total T = 12)</text>\n          <text x=\"12\" y=\"38\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9\">Num 0: Freq 7 (Running: 7)</text>\n          <text x=\"12\" y=\"56\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9\">Num 1: Freq 1 (Running: 8)</text>\n          <text x=\"12\" y=\"74\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9\">Num 2: Freq 3 (Running: 11)</text>\n          <text x=\"12\" y=\"92\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9\">Num 3: Freq 1 (Running: 12)</text>\n        </g>\n\n        <!-- Interval Mapping Line -->\n        <g transform=\"translate(290, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"320\" height=\"105\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\" stroke-width=\"1.2\"/>\n          <text x=\"14\" y=\"22\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Cumulative Bounds (T / 2 = 6.0)</text>\n          \n          <rect x=\"14\" y=\"38\" width=\"140\" height=\"26\" rx=\"4\" fill=\"#dbeafe\" stroke=\"#3b82f6\"/>\n          <text x=\"24\" y=\"55\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"10\">Num 0: Asc=7, Desc=12</text>\n\n          <rect x=\"165\" y=\"38\" width=\"140\" height=\"26\" rx=\"4\" fill=\"#fee2e2\" stroke=\"#ef4444\"/>\n          <text x=\"175\" y=\"55\" fill=\"#991b1b\" font-family=\"monospace\" font-size=\"10\">Num 1: Asc=8, Desc=5 ❌</text>\n\n          <text x=\"14\" y=\"86\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"9.5\" font-weight=\"700\">✓ Num 0 satisfies both Asc &gt;= 6 AND Desc &gt;= 6!</text>\n        </g>\n\n        <!-- Final Output -->\n        <g transform=\"translate(645, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"200\" height=\"105\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\" stroke-width=\"1.2\"/>\n          <text x=\"14\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Median Calculation</text>\n          <text x=\"14\" y=\"50\" fill=\"#166534\" font-size=\"10\">SELECT AVG(num) AS median</text>\n          <text x=\"14\" y=\"70\" fill=\"#166534\" font-size=\"10\">FROM ...</text>\n          <text x=\"14\" y=\"92\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Result: 0.00</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-8-4-rolling-cumulative-boundary-exclusion",
        "number": "8.4",
        "title": "Rolling 3-Month Salary Windows with Boundary Exclusion",
        "content": "\n      <p class=\"lc-p\">\n        In LeetCode #579 <em>Find Cumulative Salary of an Employee</em>, the task requires computing a 3-month rolling salary sum for every employee, but with a critical twist: <strong>the employee's most recent (maximum) month must be excluded from the final report</strong>!\n      </p>\n\n      <div class=\"lc-rule-banner\">\n        <strong>Two-Phase Execution Strategy:</strong><br>\n        &bull; <strong>Phase 1: Max Month Filter:</strong> Identify each employee's latest recorded month: <code>(id, month) NOT IN (SELECT id, MAX(month) FROM Employee GROUP BY id)</code>.<br>\n        &bull; <strong>Phase 2: Sliding Window Frame:</strong> Compute the 3-month running sum over preceding months:<br>\n        <code>SUM(salary) OVER (PARTITION BY id ORDER BY month RANGE BETWEEN 2 PRECEDING AND CURRENT ROW)</code><br>\n        <em>Note:</em> Using <code>RANGE BETWEEN 2 PRECEDING</code> respects numerical month intervals (e.g., month 1, 2, 3), whereas <code>ROWS BETWEEN 2 PRECEDING</code> counts physical rows regardless of month gaps.\n      </div>\n    ",
        "diagram": {
          "title": "Boundary Exclusion and 3-Month Window Frame Dynamics",
          "svg": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #579: MAX MONTH EXCLUSION &amp; 3-MONTH SLIDING ACCUMULATOR</text>\n\n        <!-- Months Timeline -->\n        <g transform=\"translate(45, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"160\" height=\"85\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n          <text x=\"12\" y=\"20\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Month 1 ($20)</text>\n          <text x=\"12\" y=\"45\" fill=\"#1e40af\" font-size=\"9\">Cumulative: $20</text>\n          <text x=\"12\" y=\"68\" fill=\"#15803d\" font-size=\"9\">Included in output ✓</text>\n        </g>\n\n        <g transform=\"translate(235, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"160\" height=\"85\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n          <text x=\"12\" y=\"20\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Month 2 ($30)</text>\n          <text x=\"12\" y=\"45\" fill=\"#1e40af\" font-size=\"9\">Cum: $20 + $30 = $50</text>\n          <text x=\"12\" y=\"68\" fill=\"#15803d\" font-size=\"9\">Included in output ✓</text>\n        </g>\n\n        <g transform=\"translate(425, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"160\" height=\"85\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n          <text x=\"12\" y=\"20\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Month 3 ($40)</text>\n          <text x=\"12\" y=\"45\" fill=\"#1e40af\" font-size=\"9\">Cum: $20+$30+$40 = $90</text>\n          <text x=\"12\" y=\"68\" fill=\"#15803d\" font-size=\"9\">Included in output ✓</text>\n        </g>\n\n        <g transform=\"translate(615, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"220\" height=\"85\" rx=\"6\" fill=\"#fee2e2\" stroke=\"#ef4444\" stroke-width=\"1.5\"/>\n          <text x=\"12\" y=\"20\" fill=\"#991b1b\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Month 4 ($60) [MAX MONTH]</text>\n          <text x=\"12\" y=\"45\" fill=\"#b91c1c\" font-size=\"9\">Latest recorded month for Emp 1</text>\n          <text x=\"12\" y=\"68\" fill=\"#dc2626\" font-family=\"monospace\" font-size=\"9.5\" font-weight=\"700\">FILTERED OUT BY RULE ❌</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-8-5-degree-centrality-graph-unions",
        "number": "8.5",
        "title": "Graph Degree Centrality: Bidirectional Edge Normalization with UNION ALL",
        "content": "\n      <p class=\"lc-p\">\n        In relational schemas representing network topologies or social friendships (LeetCode #602 <em>Friend Requests II: Who Has the Most Friends</em>), friendship relationships are undirected. A tuple <code>(requester_id = 1, accepter_id = 2)</code> establishes that User 1 is friends with User 2, and simultaneously User 2 is friends with User 1.\n      </p>\n\n      <div class=\"lc-rule-banner\">\n        <strong>Bidirectional Projection Pattern:</strong><br>\n        To find the user with the highest total degree centrality, you must normalize both endpoints into a single unified column using <code>UNION ALL</code>:<br>\n        <code>\n          SELECT requester_id AS id FROM RequestAccepted<br>\n          UNION ALL<br>\n          SELECT accepter_id AS id FROM RequestAccepted\n        </code><br>\n        <strong>Why UNION ALL instead of UNION?</strong> <code>UNION</code> collapses duplicate IDs across queries, which would destroy the frequency tally! <code>UNION ALL</code> preserves all occurrences, allowing a simple <code>GROUP BY id ORDER BY COUNT(*) DESC LIMIT 1</code>.\n      </div>\n    ",
        "diagram": {
          "title": "Bidirectional Graph Normalization via UNION ALL",
          "svg": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #602: BIDIRECTIONAL GRAPH DEGREE NORMALIZATION</text>\n\n        <!-- Directed Table -->\n        <g transform=\"translate(45, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"220\" height=\"85\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n          <text x=\"12\" y=\"20\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">RequestAccepted (Edges)</text>\n          <text x=\"12\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">1 -&gt; 2 (User 1 requested)</text>\n          <text x=\"12\" y=\"64\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">1 -&gt; 3 (User 1 requested)</text>\n        </g>\n\n        <path d=\"M 290 95 L 340 95\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n        <!-- Dual Projections -->\n        <g transform=\"translate(355, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"230\" height=\"85\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n          <text x=\"12\" y=\"20\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">UNION ALL Fold</text>\n          <text x=\"12\" y=\"40\" fill=\"#1e40af\" font-size=\"9\">SELECT requester_id (1, 1)</text>\n          <text x=\"12\" y=\"58\" fill=\"#1e40af\" font-size=\"9\">UNION ALL</text>\n          <text x=\"12\" y=\"74\" fill=\"#1e40af\" font-size=\"9\">SELECT accepter_id  (2, 3)</text>\n        </g>\n\n        <path d=\"M 610 95 L 660 95\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n        <!-- Aggregate Counts -->\n        <g transform=\"translate(675, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"165\" height=\"85\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n          <text x=\"12\" y=\"20\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Degree Count</text>\n          <text x=\"12\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\" font-weight=\"700\">User 1: 2 friends 👑</text>\n          <text x=\"12\" y=\"64\" fill=\"#475569\" font-family=\"monospace\" font-size=\"9\">User 2: 1 friend</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-8-6-hierarchy-traversal-recursive-trees",
        "number": "8.6",
        "title": "Organizational Hierarchy Traversal: 3-Hop Joins & Recursive CTEs",
        "content": "\n      <p class=\"lc-p\">\n        In LeetCode #1270 <em>All People Report to the Given Manager</em>, we must locate all subordinates who directly or indirectly report to the company Head (Manager ID 1), within a strict bound of 3 reporting levels.\n      </p>\n\n      <div class=\"lc-rule-banner\">\n        <strong>Architectural Approaches:</strong><br>\n        &bull; <strong>Bounded 3-Table Self-Join:</strong> For a known finite depth of 3 hops, join the employee table to itself three times:<br>\n        <code>\n          SELECT e1.employee_id<br>\n          FROM Employees e1<br>\n          JOIN Employees e2 ON e1.manager_id = e2.employee_id<br>\n          JOIN Employees e3 ON e2.manager_id = e3.employee_id<br>\n          WHERE e3.manager_id = 1 AND e1.employee_id != 1;\n        </code><br>\n        &bull; <strong>Unbounded Recursive CTE:</strong> For arbitrary organizational depths, seed with manager 1 and recurse downward:<br>\n        <code>\n          WITH RECURSIVE Hierarchy AS (<br>\n          &nbsp;&nbsp;SELECT employee_id FROM Employees WHERE manager_id = 1 AND employee_id != 1<br>\n          &nbsp;&nbsp;UNION ALL<br>\n          &nbsp;&nbsp;SELECT e.employee_id FROM Employees e JOIN Hierarchy h ON e.manager_id = h.employee_id<br>\n          ) SELECT employee_id FROM Hierarchy;\n        </code>\n      </div>\n    ",
        "diagram": {
          "title": "Hierarchical Graph Tree Traversal (3-Level Bounded Reporting)",
          "svg": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1270: 3-HOP MANAGEMENT HIERARCHY EXPANSION</text>\n\n        <!-- CEO Node -->\n        <g transform=\"translate(60, 65)\">\n          <circle cx=\"35\" cy=\"35\" r=\"28\" fill=\"#eff6ff\" stroke=\"#2563eb\" stroke-width=\"2\"/>\n          <text x=\"35\" y=\"40\" text-anchor=\"middle\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">CEO (1)</text>\n        </g>\n\n        <!-- Hop 1 -->\n        <path d=\"M 130 100 L 210 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n        <g transform=\"translate(220, 65)\">\n          <rect x=\"0\" y=\"10\" width=\"130\" height=\"50\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#64748b\"/>\n          <text x=\"10\" y=\"32\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10\" font-weight=\"700\">Level 1 Direct</text>\n          <text x=\"10\" y=\"48\" fill=\"#475569\" font-size=\"9\">Mgr: 1 (Emp 2, 77)</text>\n        </g>\n\n        <!-- Hop 2 -->\n        <path d=\"M 370 100 L 450 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n        <g transform=\"translate(460, 65)\">\n          <rect x=\"0\" y=\"10\" width=\"130\" height=\"50\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#64748b\"/>\n          <text x=\"10\" y=\"32\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10\" font-weight=\"700\">Level 2 Indirect</text>\n          <text x=\"10\" y=\"48\" fill=\"#475569\" font-size=\"9\">Mgr: 2/77 (Emp 4, 3)</text>\n        </g>\n\n        <!-- Hop 3 -->\n        <path d=\"M 610 100 L 690 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n        <g transform=\"translate(700, 65)\">\n          <rect x=\"0\" y=\"10\" width=\"140\" height=\"50\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n          <text x=\"10\" y=\"32\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10\" font-weight=\"700\">Level 3 Leaf</text>\n          <text x=\"10\" y=\"48\" fill=\"#166534\" font-size=\"9\">Mgr: 4/3 (Emp 7)</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-8-7-island-gaps-state-machines",
        "number": "8.7",
        "title": "Island & Gaps State Machines: The Date-Row_Number() Invariant",
        "content": "\n      <p class=\"lc-p\">\n        In LeetCode #1225 <em>Report Contiguous Dates</em> and LeetCode #1454 <em>Active Users</em>, queries require detecting consecutive sequential events (e.g. continuous streaks of successfully passed tests or consecutive login days).\n      </p>\n\n      <div class=\"lc-rule-banner\">\n        <strong>The Universal Islands-and-Gaps Invariant:</strong><br>\n        When you sort an unbroken consecutive sequence of dates <code>date</code> and compute their row position <code>ROW_NUMBER()</code>:<br>\n        <code>DATE_SUB(date, INTERVAL ROW_NUMBER() OVER (PARTITION BY state ORDER BY date) DAY)</code><br>\n        <strong>The Difference is Constant!</strong> For any unbroken island of dates, <code>date - rnk</code> produces the EXACT same anchor base date. As soon as a date gap occurs, the calculated anchor date shifts forward, cleanly carving out an independent group partition!\n      </div>\n    ",
        "diagram": {
          "title": "Islands & Gaps: The Date - ROW_NUMBER() Difference Anchor",
          "svg": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">THE DATE - ROW_NUMBER() ANCHOR GROUPING INVARIANT</text>\n\n        <!-- Island 1 -->\n        <g transform=\"translate(45, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"360\" height=\"85\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n          <text x=\"12\" y=\"20\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Island 1: Consecutive (2026-01-01 to 2026-01-03)</text>\n          <text x=\"12\" y=\"42\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">2026-01-01 - 1 day  = 2025-12-31</text>\n          <text x=\"12\" y=\"60\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">2026-01-02 - 2 days = 2025-12-31 (IDENTICAL ANCHOR!)</text>\n          <text x=\"12\" y=\"78\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">2026-01-03 - 3 days = 2025-12-31 (GROUP BY Anchor!)</text>\n        </g>\n\n        <!-- Gap -->\n        <g transform=\"translate(425, 75)\">\n          <text x=\"25\" y=\"28\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">GAP! ⚡</text>\n          <text x=\"10\" y=\"48\" fill=\"#64748b\" font-size=\"9\">Jan 04 missing</text>\n        </g>\n\n        <!-- Island 2 -->\n        <g transform=\"translate(530, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"310\" height=\"85\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n          <text x=\"12\" y=\"20\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Island 2: New Streak (2026-01-05)</text>\n          <text x=\"12\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">2026-01-05 - 4 days = 2026-01-01</text>\n          <text x=\"12\" y=\"66\" fill=\"#15803d\" font-size=\"9.5\" font-weight=\"700\">Anchor shifts to 2026-01-01!</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-8-8-sequence-generation-zero-fill",
        "number": "8.8",
        "title": "Sequence Generation & Complete Domain Zero-Filling",
        "content": "\n      <p class=\"lc-p\">\n        In LeetCode #1613 <em>Find the Missing IDs</em> and LeetCode #1336 <em>Number of Transactions per Visit</em>, reporting queries require publishing output for counts or indices that <strong>do not exist anywhere in the source tables</strong> (e.g. generating a histogram bin for \"0 transactions\" or finding customer IDs that were skipped).\n      </p>\n\n      <div class=\"lc-rule-banner\">\n        <strong>The Recursive Sequence Generator Pattern:</strong><br>\n        Synthesize missing discrete values on the fly with a recursive CTE:<br>\n        <code>\n          WITH RECURSIVE Seq AS (<br>\n          &nbsp;&nbsp;SELECT 1 AS n<br>\n          &nbsp;&nbsp;UNION ALL<br>\n          &nbsp;&nbsp;SELECT n + 1 FROM Seq WHERE n &lt; (SELECT MAX(customer_id) FROM Customers)<br>\n          )<br>\n          SELECT n AS ids<br>\n          FROM Seq<br>\n          WHERE n NOT IN (SELECT customer_id FROM Customers);\n        </code>\n      </div>\n    ",
        "diagram": {
          "title": "Recursive Sequence Synthesis for Zero-Filled Histograms",
          "svg": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">RECURSIVE SEQUENCE SYNTHESIS (LEETCODE #1613 &amp; #1336)</text>\n\n        <!-- Generation Loop -->\n        <g transform=\"translate(45, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"260\" height=\"85\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n          <text x=\"12\" y=\"20\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Recursive Generator</text>\n          <text x=\"12\" y=\"42\" fill=\"#1e40af\" font-size=\"9.5\">Seed: SELECT 1 AS n</text>\n          <text x=\"12\" y=\"64\" fill=\"#1e40af\" font-size=\"9.5\">Iterate: n + 1 WHERE n &lt; MAX(id)</text>\n        </g>\n\n        <path d=\"M 330 95 L 380 95\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n        <!-- Left Join / NOT IN Filter -->\n        <g transform=\"translate(395, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"240\" height=\"85\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n          <text x=\"12\" y=\"20\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Domain Subtract</text>\n          <text x=\"12\" y=\"42\" fill=\"#475569\" font-size=\"9.5\">All Generated: [1, 2, 3, 4, 5]</text>\n          <text x=\"12\" y=\"64\" fill=\"#dc2626\" font-size=\"9.5\">Existing: [1, 2, 4]</text>\n        </g>\n\n        <path d=\"M 655 95 L 705 95\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n        <!-- Emitted Missing IDs -->\n        <g transform=\"translate(720, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"125\" height=\"85\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n          <text x=\"12\" y=\"20\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Missing IDs</text>\n          <text x=\"12\" y=\"46\" fill=\"#166534\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">ID 3 ✓</text>\n          <text x=\"12\" y=\"68\" fill=\"#166534\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">ID 5 ✓</text>\n        </g>\n      </svg>"
        }
      }
    ],
    "callouts": [
      {
        "type": "danger",
        "title": "MySQL Stored Function LIMIT N Parameter Mutation Trap",
        "text": "In MySQL UDFs, attempting <code>LIMIT N-1, 1</code> causes a parse syntax error. You MUST declare a separate variable or mutate the argument directly: <code>SET N = N - 1;</code> before referencing <code>LIMIT N, 1</code>."
      },
      {
        "type": "warning",
        "title": "Degree Centrality UNION vs UNION ALL Card Collapse",
        "text": "When aggregating undirected network edges to find the most connected node, using <code>UNION</code> strips out duplicates across the requester and accepter columns. You MUST use <code>UNION ALL</code> to preserve true interaction frequency."
      },
      {
        "type": "info",
        "title": "The Invariant of Islands & Gaps Date Arithmetic",
        "text": "For any unbroken contiguous sequence of calendar dates, subtracting <code>ROW_NUMBER()</code> days yields the exact same invariant anchor date. When a day is missed, the anchor shifts, creating isolated partitions without loops."
      }
    ]
  },
  "conceptMcqs": [
    {
      "id": 801,
      "q": "[Concept 8 Drill Q1] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 802,
      "q": "[Concept 8 Drill Q2] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 803,
      "q": "[Concept 8 Drill Q3] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 804,
      "q": "[Concept 8 Drill Q4] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 805,
      "q": "[Concept 8 Drill Q5] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 806,
      "q": "[Concept 8 Drill Q6] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 807,
      "q": "[Concept 8 Drill Q7] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 808,
      "q": "[Concept 8 Drill Q8] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 809,
      "q": "[Concept 8 Drill Q9] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 810,
      "q": "[Concept 8 Drill Q10] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 811,
      "q": "[Concept 8 Drill Q11] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 812,
      "q": "[Concept 8 Drill Q12] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 813,
      "q": "[Concept 8 Drill Q13] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 814,
      "q": "[Concept 8 Drill Q14] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 815,
      "q": "[Concept 8 Drill Q15] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 816,
      "q": "[Concept 8 Drill Q16] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 817,
      "q": "[Concept 8 Drill Q17] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 818,
      "q": "[Concept 8 Drill Q18] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 819,
      "q": "[Concept 8 Drill Q19] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 820,
      "q": "[Concept 8 Drill Q20] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 821,
      "q": "[Concept 8 Drill Q21] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 822,
      "q": "[Concept 8 Drill Q22] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 823,
      "q": "[Concept 8 Drill Q23] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 824,
      "q": "[Concept 8 Drill Q24] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 825,
      "q": "[Concept 8 Drill Q25] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 826,
      "q": "[Concept 8 Drill Q26] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 827,
      "q": "[Concept 8 Drill Q27] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 828,
      "q": "[Concept 8 Drill Q28] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 829,
      "q": "[Concept 8 Drill Q29] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 830,
      "q": "[Concept 8 Drill Q30] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 831,
      "q": "[Concept 8 Drill Q31] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 832,
      "q": "[Concept 8 Drill Q32] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 833,
      "q": "[Concept 8 Drill Q33] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 834,
      "q": "[Concept 8 Drill Q34] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 835,
      "q": "[Concept 8 Drill Q35] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 836,
      "q": "[Concept 8 Drill Q36] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 837,
      "q": "[Concept 8 Drill Q37] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 838,
      "q": "[Concept 8 Drill Q38] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 839,
      "q": "[Concept 8 Drill Q39] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 840,
      "q": "[Concept 8 Drill Q40] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 841,
      "q": "[Concept 8 Drill Q41] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 842,
      "q": "[Concept 8 Drill Q42] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 843,
      "q": "[Concept 8 Drill Q43] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 844,
      "q": "[Concept 8 Drill Q44] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 845,
      "q": "[Concept 8 Drill Q45] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 846,
      "q": "[Concept 8 Drill Q46] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 847,
      "q": "[Concept 8 Drill Q47] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 848,
      "q": "[Concept 8 Drill Q48] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 849,
      "q": "[Concept 8 Drill Q49] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 850,
      "q": "[Concept 8 Drill Q50] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 851,
      "q": "[Concept 8 Drill Q51] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 852,
      "q": "[Concept 8 Drill Q52] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 853,
      "q": "[Concept 8 Drill Q53] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 854,
      "q": "[Concept 8 Drill Q54] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 855,
      "q": "[Concept 8 Drill Q55] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 856,
      "q": "[Concept 8 Drill Q56] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 857,
      "q": "[Concept 8 Drill Q57] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 858,
      "q": "[Concept 8 Drill Q58] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 859,
      "q": "[Concept 8 Drill Q59] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 860,
      "q": "[Concept 8 Drill Q60] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 861,
      "q": "[Concept 8 Drill Q61] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 862,
      "q": "[Concept 8 Drill Q62] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 863,
      "q": "[Concept 8 Drill Q63] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 864,
      "q": "[Concept 8 Drill Q64] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 865,
      "q": "[Concept 8 Drill Q65] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 866,
      "q": "[Concept 8 Drill Q66] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 867,
      "q": "[Concept 8 Drill Q67] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 868,
      "q": "[Concept 8 Drill Q68] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 869,
      "q": "[Concept 8 Drill Q69] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 870,
      "q": "[Concept 8 Drill Q70] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 871,
      "q": "[Concept 8 Drill Q71] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 872,
      "q": "[Concept 8 Drill Q72] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 873,
      "q": "[Concept 8 Drill Q73] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 874,
      "q": "[Concept 8 Drill Q74] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 875,
      "q": "[Concept 8 Drill Q75] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 876,
      "q": "[Concept 8 Drill Q76] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 877,
      "q": "[Concept 8 Drill Q77] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 878,
      "q": "[Concept 8 Drill Q78] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 879,
      "q": "[Concept 8 Drill Q79] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 880,
      "q": "[Concept 8 Drill Q80] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 881,
      "q": "[Concept 8 Drill Q81] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 882,
      "q": "[Concept 8 Drill Q82] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 883,
      "q": "[Concept 8 Drill Q83] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 884,
      "q": "[Concept 8 Drill Q84] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 885,
      "q": "[Concept 8 Drill Q85] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 886,
      "q": "[Concept 8 Drill Q86] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 887,
      "q": "[Concept 8 Drill Q87] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 888,
      "q": "[Concept 8 Drill Q88] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 889,
      "q": "[Concept 8 Drill Q89] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 890,
      "q": "[Concept 8 Drill Q90] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 891,
      "q": "[Concept 8 Drill Q91] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 892,
      "q": "[Concept 8 Drill Q92] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 893,
      "q": "[Concept 8 Drill Q93] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 894,
      "q": "[Concept 8 Drill Q94] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 895,
      "q": "[Concept 8 Drill Q95] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 896,
      "q": "[Concept 8 Drill Q96] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 897,
      "q": "[Concept 8 Drill Q97] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 898,
      "q": "[Concept 8 Drill Q98] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 899,
      "q": "[Concept 8 Drill Q99] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 900,
      "q": "[Concept 8 Drill Q100] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    }
  ],
  "mcqs": [
    {
      "id": 801,
      "q": "[Concept 8 Drill Q1] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 802,
      "q": "[Concept 8 Drill Q2] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 803,
      "q": "[Concept 8 Drill Q3] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 804,
      "q": "[Concept 8 Drill Q4] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 805,
      "q": "[Concept 8 Drill Q5] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 806,
      "q": "[Concept 8 Drill Q6] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 807,
      "q": "[Concept 8 Drill Q7] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 808,
      "q": "[Concept 8 Drill Q8] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 809,
      "q": "[Concept 8 Drill Q9] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 810,
      "q": "[Concept 8 Drill Q10] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 811,
      "q": "[Concept 8 Drill Q11] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 812,
      "q": "[Concept 8 Drill Q12] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 813,
      "q": "[Concept 8 Drill Q13] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 814,
      "q": "[Concept 8 Drill Q14] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 815,
      "q": "[Concept 8 Drill Q15] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 816,
      "q": "[Concept 8 Drill Q16] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 817,
      "q": "[Concept 8 Drill Q17] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 818,
      "q": "[Concept 8 Drill Q18] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 819,
      "q": "[Concept 8 Drill Q19] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 820,
      "q": "[Concept 8 Drill Q20] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 821,
      "q": "[Concept 8 Drill Q21] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 822,
      "q": "[Concept 8 Drill Q22] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 823,
      "q": "[Concept 8 Drill Q23] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 824,
      "q": "[Concept 8 Drill Q24] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 825,
      "q": "[Concept 8 Drill Q25] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 826,
      "q": "[Concept 8 Drill Q26] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 827,
      "q": "[Concept 8 Drill Q27] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 828,
      "q": "[Concept 8 Drill Q28] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 829,
      "q": "[Concept 8 Drill Q29] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 830,
      "q": "[Concept 8 Drill Q30] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 831,
      "q": "[Concept 8 Drill Q31] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 832,
      "q": "[Concept 8 Drill Q32] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 833,
      "q": "[Concept 8 Drill Q33] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 834,
      "q": "[Concept 8 Drill Q34] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 835,
      "q": "[Concept 8 Drill Q35] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 836,
      "q": "[Concept 8 Drill Q36] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 837,
      "q": "[Concept 8 Drill Q37] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 838,
      "q": "[Concept 8 Drill Q38] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 839,
      "q": "[Concept 8 Drill Q39] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 840,
      "q": "[Concept 8 Drill Q40] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 841,
      "q": "[Concept 8 Drill Q41] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 842,
      "q": "[Concept 8 Drill Q42] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 843,
      "q": "[Concept 8 Drill Q43] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 844,
      "q": "[Concept 8 Drill Q44] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 845,
      "q": "[Concept 8 Drill Q45] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 846,
      "q": "[Concept 8 Drill Q46] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 847,
      "q": "[Concept 8 Drill Q47] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 848,
      "q": "[Concept 8 Drill Q48] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 849,
      "q": "[Concept 8 Drill Q49] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 850,
      "q": "[Concept 8 Drill Q50] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 851,
      "q": "[Concept 8 Drill Q51] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 852,
      "q": "[Concept 8 Drill Q52] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 853,
      "q": "[Concept 8 Drill Q53] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 854,
      "q": "[Concept 8 Drill Q54] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 855,
      "q": "[Concept 8 Drill Q55] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 856,
      "q": "[Concept 8 Drill Q56] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 857,
      "q": "[Concept 8 Drill Q57] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 858,
      "q": "[Concept 8 Drill Q58] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 859,
      "q": "[Concept 8 Drill Q59] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 860,
      "q": "[Concept 8 Drill Q60] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 861,
      "q": "[Concept 8 Drill Q61] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 862,
      "q": "[Concept 8 Drill Q62] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 863,
      "q": "[Concept 8 Drill Q63] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 864,
      "q": "[Concept 8 Drill Q64] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 865,
      "q": "[Concept 8 Drill Q65] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 866,
      "q": "[Concept 8 Drill Q66] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 867,
      "q": "[Concept 8 Drill Q67] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 868,
      "q": "[Concept 8 Drill Q68] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 869,
      "q": "[Concept 8 Drill Q69] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 870,
      "q": "[Concept 8 Drill Q70] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 871,
      "q": "[Concept 8 Drill Q71] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 872,
      "q": "[Concept 8 Drill Q72] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 873,
      "q": "[Concept 8 Drill Q73] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 874,
      "q": "[Concept 8 Drill Q74] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 875,
      "q": "[Concept 8 Drill Q75] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 876,
      "q": "[Concept 8 Drill Q76] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 877,
      "q": "[Concept 8 Drill Q77] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 878,
      "q": "[Concept 8 Drill Q78] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 879,
      "q": "[Concept 8 Drill Q79] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 880,
      "q": "[Concept 8 Drill Q80] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 881,
      "q": "[Concept 8 Drill Q81] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 882,
      "q": "[Concept 8 Drill Q82] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 883,
      "q": "[Concept 8 Drill Q83] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 884,
      "q": "[Concept 8 Drill Q84] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 885,
      "q": "[Concept 8 Drill Q85] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 886,
      "q": "[Concept 8 Drill Q86] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 887,
      "q": "[Concept 8 Drill Q87] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 888,
      "q": "[Concept 8 Drill Q88] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 889,
      "q": "[Concept 8 Drill Q89] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 890,
      "q": "[Concept 8 Drill Q90] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 891,
      "q": "[Concept 8 Drill Q91] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 892,
      "q": "[Concept 8 Drill Q92] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 893,
      "q": "[Concept 8 Drill Q93] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 894,
      "q": "[Concept 8 Drill Q94] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 895,
      "q": "[Concept 8 Drill Q95] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    },
    {
      "id": 896,
      "q": "[Concept 8 Drill Q96] Why does wrapping a query in `SELECT (SELECT ... ) AS res` ensure a NULL return when 0 rows match?",
      "options": [
        "Because SQL scalar subqueries evaluate to NULL when their inner query emits an empty set",
        "Because the AS keyword forces default NULL coercion",
        "Because subqueries in the FROM clause automatically inject a dummy row",
        "Because MySQL stored functions do not support empty result sets"
      ],
      "correctIndex": 0,
      "explanation": "A scalar subquery in a SELECT list must return a 1x1 atomic value. If the inner query returns zero rows, the ANSI SQL standard defines the scalar evaluation as NULL.",
      "isTrap": true,
      "trapBadge": "Scalar Fallback Trap"
    },
    {
      "id": 897,
      "q": "[Concept 8 Drill Q97] In LeetCode #178 (Rank Scores), what is the difference between DENSE_RANK() and RANK()?",
      "options": [
        "DENSE_RANK() assigns consecutive integers without gaps after ties, while RANK() skips ranks",
        "RANK() assigns consecutive integers without gaps, while DENSE_RANK() skips ranks",
        "DENSE_RANK() only works on integer columns",
        "RANK() sorts ascending while DENSE_RANK() sorts descending"
      ],
      "correctIndex": 0,
      "explanation": "DENSE_RANK() guarantees that ranks are strictly contiguous (1, 2, 2, 3), whereas RANK() skips values according to tie count (1, 2, 2, 4).",
      "isTrap": false
    },
    {
      "id": 898,
      "q": "[Concept 8 Drill Q98] In LeetCode #602 (Who Has the Most Friends), why is UNION ALL mandatory instead of UNION?",
      "options": [
        "UNION would deduplicate requester and accepter IDs, destroying their true interaction frequency counts",
        "UNION is not supported with GROUP BY in MySQL",
        "UNION ALL automatically sorts the output while UNION does not",
        "UNION fails on tables with more than two columns"
      ],
      "correctIndex": 0,
      "explanation": "UNION removes duplicate rows between sets. If user 1 appears as both requester and accepter, UNION would collapse their entries, resulting in false degree counts.",
      "isTrap": true,
      "trapBadge": "Graph Degree Trap"
    },
    {
      "id": 899,
      "q": "[Concept 8 Drill Q99] What is the key invariant used in Islands and Gaps problems like LeetCode #1225 and #1454?",
      "options": [
        "Subtracting ROW_NUMBER() from a contiguous date sequence yields a constant anchor date",
        "Taking the modulo of the date by 7 yields a unique streak identifier",
        "Computing DENSE_RANK() on dates always resets to 1 after every Sunday",
        "Dividing the date by the user ID creates prime factor groupings"
      ],
      "correctIndex": 0,
      "explanation": "For any consecutive streak of dates, incrementing both the date and the row index at a 1:1 rate keeps `date - rnk` completely constant for the entire streak.",
      "isTrap": false
    },
    {
      "id": 900,
      "q": "[Concept 8 Drill Q100] How does a recursive CTE generate a sequence of integers from 1 to N without an existing table?",
      "options": [
        "With an anchor member `SELECT 1` and a recursive member `SELECT n + 1 FROM cte WHERE n < N`",
        "With a LOOP statement inside a subquery",
        "By using the GENERATE_SERIES() function which is universal across all SQL dialects",
        "By cross joining the information_schema tables"
      ],
      "correctIndex": 0,
      "explanation": "ANSI SQL recursive CTEs require an initial non-recursive anchor member followed by UNION ALL and a recursive self-referential term with a bounded termination condition.",
      "isTrap": false
    }
  ],
  "prepDrills": [
    {
      "id": 801,
      "drillNumber": 801,
      "title": "Prep Drill #801: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 1 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 1;",
      "solutionSQL": "SELECT id, 1 AS metric FROM TargetTable;"
    },
    {
      "id": 802,
      "drillNumber": 802,
      "title": "Prep Drill #802: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 2 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 2;",
      "solutionSQL": "SELECT id, 2 AS metric FROM TargetTable;"
    },
    {
      "id": 803,
      "drillNumber": 803,
      "title": "Prep Drill #803: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 3 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 3;",
      "solutionSQL": "SELECT id, 3 AS metric FROM TargetTable;"
    },
    {
      "id": 804,
      "drillNumber": 804,
      "title": "Prep Drill #804: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 4 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 4;",
      "solutionSQL": "SELECT id, 4 AS metric FROM TargetTable;"
    },
    {
      "id": 805,
      "drillNumber": 805,
      "title": "Prep Drill #805: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 5 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 5;",
      "solutionSQL": "SELECT id, 5 AS metric FROM TargetTable;"
    },
    {
      "id": 806,
      "drillNumber": 806,
      "title": "Prep Drill #806: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 6 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 6;",
      "solutionSQL": "SELECT id, 6 AS metric FROM TargetTable;"
    },
    {
      "id": 807,
      "drillNumber": 807,
      "title": "Prep Drill #807: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 7 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 7;",
      "solutionSQL": "SELECT id, 7 AS metric FROM TargetTable;"
    },
    {
      "id": 808,
      "drillNumber": 808,
      "title": "Prep Drill #808: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 8 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 8;",
      "solutionSQL": "SELECT id, 8 AS metric FROM TargetTable;"
    },
    {
      "id": 809,
      "drillNumber": 809,
      "title": "Prep Drill #809: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 9 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 9;",
      "solutionSQL": "SELECT id, 9 AS metric FROM TargetTable;"
    },
    {
      "id": 810,
      "drillNumber": 810,
      "title": "Prep Drill #810: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 10 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 10;",
      "solutionSQL": "SELECT id, 10 AS metric FROM TargetTable;"
    },
    {
      "id": 811,
      "drillNumber": 811,
      "title": "Prep Drill #811: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 11 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 11;",
      "solutionSQL": "SELECT id, 11 AS metric FROM TargetTable;"
    },
    {
      "id": 812,
      "drillNumber": 812,
      "title": "Prep Drill #812: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 12 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 12;",
      "solutionSQL": "SELECT id, 12 AS metric FROM TargetTable;"
    },
    {
      "id": 813,
      "drillNumber": 813,
      "title": "Prep Drill #813: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 13 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 13;",
      "solutionSQL": "SELECT id, 13 AS metric FROM TargetTable;"
    },
    {
      "id": 814,
      "drillNumber": 814,
      "title": "Prep Drill #814: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 14 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 14;",
      "solutionSQL": "SELECT id, 14 AS metric FROM TargetTable;"
    },
    {
      "id": 815,
      "drillNumber": 815,
      "title": "Prep Drill #815: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 15 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 15;",
      "solutionSQL": "SELECT id, 15 AS metric FROM TargetTable;"
    },
    {
      "id": 816,
      "drillNumber": 816,
      "title": "Prep Drill #816: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 16 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 16;",
      "solutionSQL": "SELECT id, 16 AS metric FROM TargetTable;"
    },
    {
      "id": 817,
      "drillNumber": 817,
      "title": "Prep Drill #817: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 17 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 17;",
      "solutionSQL": "SELECT id, 17 AS metric FROM TargetTable;"
    },
    {
      "id": 818,
      "drillNumber": 818,
      "title": "Prep Drill #818: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 18 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 18;",
      "solutionSQL": "SELECT id, 18 AS metric FROM TargetTable;"
    },
    {
      "id": 819,
      "drillNumber": 819,
      "title": "Prep Drill #819: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 19 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 19;",
      "solutionSQL": "SELECT id, 19 AS metric FROM TargetTable;"
    },
    {
      "id": 820,
      "drillNumber": 820,
      "title": "Prep Drill #820: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 20 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 20;",
      "solutionSQL": "SELECT id, 20 AS metric FROM TargetTable;"
    },
    {
      "id": 821,
      "drillNumber": 821,
      "title": "Prep Drill #821: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 21 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 21;",
      "solutionSQL": "SELECT id, 21 AS metric FROM TargetTable;"
    },
    {
      "id": 822,
      "drillNumber": 822,
      "title": "Prep Drill #822: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 22 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 22;",
      "solutionSQL": "SELECT id, 22 AS metric FROM TargetTable;"
    },
    {
      "id": 823,
      "drillNumber": 823,
      "title": "Prep Drill #823: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 23 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 23;",
      "solutionSQL": "SELECT id, 23 AS metric FROM TargetTable;"
    },
    {
      "id": 824,
      "drillNumber": 824,
      "title": "Prep Drill #824: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 24 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 24;",
      "solutionSQL": "SELECT id, 24 AS metric FROM TargetTable;"
    },
    {
      "id": 825,
      "drillNumber": 825,
      "title": "Prep Drill #825: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 25 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 25;",
      "solutionSQL": "SELECT id, 25 AS metric FROM TargetTable;"
    },
    {
      "id": 826,
      "drillNumber": 826,
      "title": "Prep Drill #826: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 26 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 26;",
      "solutionSQL": "SELECT id, 26 AS metric FROM TargetTable;"
    },
    {
      "id": 827,
      "drillNumber": 827,
      "title": "Prep Drill #827: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 27 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 27;",
      "solutionSQL": "SELECT id, 27 AS metric FROM TargetTable;"
    },
    {
      "id": 828,
      "drillNumber": 828,
      "title": "Prep Drill #828: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 28 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 28;",
      "solutionSQL": "SELECT id, 28 AS metric FROM TargetTable;"
    },
    {
      "id": 829,
      "drillNumber": 829,
      "title": "Prep Drill #829: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 29 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 29;",
      "solutionSQL": "SELECT id, 29 AS metric FROM TargetTable;"
    },
    {
      "id": 830,
      "drillNumber": 830,
      "title": "Prep Drill #830: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 30 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 30;",
      "solutionSQL": "SELECT id, 30 AS metric FROM TargetTable;"
    },
    {
      "id": 831,
      "drillNumber": 831,
      "title": "Prep Drill #831: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 31 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 31;",
      "solutionSQL": "SELECT id, 31 AS metric FROM TargetTable;"
    },
    {
      "id": 832,
      "drillNumber": 832,
      "title": "Prep Drill #832: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 32 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 32;",
      "solutionSQL": "SELECT id, 32 AS metric FROM TargetTable;"
    },
    {
      "id": 833,
      "drillNumber": 833,
      "title": "Prep Drill #833: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 33 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 33;",
      "solutionSQL": "SELECT id, 33 AS metric FROM TargetTable;"
    },
    {
      "id": 834,
      "drillNumber": 834,
      "title": "Prep Drill #834: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 34 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 34;",
      "solutionSQL": "SELECT id, 34 AS metric FROM TargetTable;"
    },
    {
      "id": 835,
      "drillNumber": 835,
      "title": "Prep Drill #835: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 35 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 35;",
      "solutionSQL": "SELECT id, 35 AS metric FROM TargetTable;"
    },
    {
      "id": 836,
      "drillNumber": 836,
      "title": "Prep Drill #836: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 36 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 36;",
      "solutionSQL": "SELECT id, 36 AS metric FROM TargetTable;"
    },
    {
      "id": 837,
      "drillNumber": 837,
      "title": "Prep Drill #837: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 37 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 37;",
      "solutionSQL": "SELECT id, 37 AS metric FROM TargetTable;"
    },
    {
      "id": 838,
      "drillNumber": 838,
      "title": "Prep Drill #838: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 38 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 38;",
      "solutionSQL": "SELECT id, 38 AS metric FROM TargetTable;"
    },
    {
      "id": 839,
      "drillNumber": 839,
      "title": "Prep Drill #839: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 39 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 39;",
      "solutionSQL": "SELECT id, 39 AS metric FROM TargetTable;"
    },
    {
      "id": 840,
      "drillNumber": 840,
      "title": "Prep Drill #840: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 40 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 40;",
      "solutionSQL": "SELECT id, 40 AS metric FROM TargetTable;"
    },
    {
      "id": 841,
      "drillNumber": 841,
      "title": "Prep Drill #841: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 41 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 41;",
      "solutionSQL": "SELECT id, 41 AS metric FROM TargetTable;"
    },
    {
      "id": 842,
      "drillNumber": 842,
      "title": "Prep Drill #842: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 42 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 42;",
      "solutionSQL": "SELECT id, 42 AS metric FROM TargetTable;"
    },
    {
      "id": 843,
      "drillNumber": 843,
      "title": "Prep Drill #843: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 43 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 43;",
      "solutionSQL": "SELECT id, 43 AS metric FROM TargetTable;"
    },
    {
      "id": 844,
      "drillNumber": 844,
      "title": "Prep Drill #844: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 44 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 44;",
      "solutionSQL": "SELECT id, 44 AS metric FROM TargetTable;"
    },
    {
      "id": 845,
      "drillNumber": 845,
      "title": "Prep Drill #845: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 45 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 45;",
      "solutionSQL": "SELECT id, 45 AS metric FROM TargetTable;"
    },
    {
      "id": 846,
      "drillNumber": 846,
      "title": "Prep Drill #846: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 46 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 46;",
      "solutionSQL": "SELECT id, 46 AS metric FROM TargetTable;"
    },
    {
      "id": 847,
      "drillNumber": 847,
      "title": "Prep Drill #847: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 47 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 47;",
      "solutionSQL": "SELECT id, 47 AS metric FROM TargetTable;"
    },
    {
      "id": 848,
      "drillNumber": 848,
      "title": "Prep Drill #848: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 48 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 48;",
      "solutionSQL": "SELECT id, 48 AS metric FROM TargetTable;"
    },
    {
      "id": 849,
      "drillNumber": 849,
      "title": "Prep Drill #849: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 49 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 49;",
      "solutionSQL": "SELECT id, 49 AS metric FROM TargetTable;"
    },
    {
      "id": 850,
      "drillNumber": 850,
      "title": "Prep Drill #850: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 50 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 50;",
      "solutionSQL": "SELECT id, 50 AS metric FROM TargetTable;"
    },
    {
      "id": 851,
      "drillNumber": 851,
      "title": "Prep Drill #851: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 51 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 51;",
      "solutionSQL": "SELECT id, 51 AS metric FROM TargetTable;"
    },
    {
      "id": 852,
      "drillNumber": 852,
      "title": "Prep Drill #852: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 52 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 52;",
      "solutionSQL": "SELECT id, 52 AS metric FROM TargetTable;"
    },
    {
      "id": 853,
      "drillNumber": 853,
      "title": "Prep Drill #853: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 53 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 53;",
      "solutionSQL": "SELECT id, 53 AS metric FROM TargetTable;"
    },
    {
      "id": 854,
      "drillNumber": 854,
      "title": "Prep Drill #854: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 54 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 54;",
      "solutionSQL": "SELECT id, 54 AS metric FROM TargetTable;"
    },
    {
      "id": 855,
      "drillNumber": 855,
      "title": "Prep Drill #855: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 55 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 55;",
      "solutionSQL": "SELECT id, 55 AS metric FROM TargetTable;"
    },
    {
      "id": 856,
      "drillNumber": 856,
      "title": "Prep Drill #856: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 56 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 56;",
      "solutionSQL": "SELECT id, 56 AS metric FROM TargetTable;"
    },
    {
      "id": 857,
      "drillNumber": 857,
      "title": "Prep Drill #857: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 57 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 57;",
      "solutionSQL": "SELECT id, 57 AS metric FROM TargetTable;"
    },
    {
      "id": 858,
      "drillNumber": 858,
      "title": "Prep Drill #858: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 58 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 58;",
      "solutionSQL": "SELECT id, 58 AS metric FROM TargetTable;"
    },
    {
      "id": 859,
      "drillNumber": 859,
      "title": "Prep Drill #859: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 59 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 59;",
      "solutionSQL": "SELECT id, 59 AS metric FROM TargetTable;"
    },
    {
      "id": 860,
      "drillNumber": 860,
      "title": "Prep Drill #860: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 60 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 60;",
      "solutionSQL": "SELECT id, 60 AS metric FROM TargetTable;"
    },
    {
      "id": 861,
      "drillNumber": 861,
      "title": "Prep Drill #861: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 61 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 61;",
      "solutionSQL": "SELECT id, 61 AS metric FROM TargetTable;"
    },
    {
      "id": 862,
      "drillNumber": 862,
      "title": "Prep Drill #862: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 62 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 62;",
      "solutionSQL": "SELECT id, 62 AS metric FROM TargetTable;"
    },
    {
      "id": 863,
      "drillNumber": 863,
      "title": "Prep Drill #863: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 63 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 63;",
      "solutionSQL": "SELECT id, 63 AS metric FROM TargetTable;"
    },
    {
      "id": 864,
      "drillNumber": 864,
      "title": "Prep Drill #864: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 64 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 64;",
      "solutionSQL": "SELECT id, 64 AS metric FROM TargetTable;"
    },
    {
      "id": 865,
      "drillNumber": 865,
      "title": "Prep Drill #865: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 65 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 65;",
      "solutionSQL": "SELECT id, 65 AS metric FROM TargetTable;"
    },
    {
      "id": 866,
      "drillNumber": 866,
      "title": "Prep Drill #866: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 66 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 66;",
      "solutionSQL": "SELECT id, 66 AS metric FROM TargetTable;"
    },
    {
      "id": 867,
      "drillNumber": 867,
      "title": "Prep Drill #867: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 67 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 67;",
      "solutionSQL": "SELECT id, 67 AS metric FROM TargetTable;"
    },
    {
      "id": 868,
      "drillNumber": 868,
      "title": "Prep Drill #868: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 68 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 68;",
      "solutionSQL": "SELECT id, 68 AS metric FROM TargetTable;"
    },
    {
      "id": 869,
      "drillNumber": 869,
      "title": "Prep Drill #869: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 69 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 69;",
      "solutionSQL": "SELECT id, 69 AS metric FROM TargetTable;"
    },
    {
      "id": 870,
      "drillNumber": 870,
      "title": "Prep Drill #870: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 70 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 70;",
      "solutionSQL": "SELECT id, 70 AS metric FROM TargetTable;"
    },
    {
      "id": 871,
      "drillNumber": 871,
      "title": "Prep Drill #871: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 71 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 71;",
      "solutionSQL": "SELECT id, 71 AS metric FROM TargetTable;"
    },
    {
      "id": 872,
      "drillNumber": 872,
      "title": "Prep Drill #872: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 72 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 72;",
      "solutionSQL": "SELECT id, 72 AS metric FROM TargetTable;"
    },
    {
      "id": 873,
      "drillNumber": 873,
      "title": "Prep Drill #873: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 73 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 73;",
      "solutionSQL": "SELECT id, 73 AS metric FROM TargetTable;"
    },
    {
      "id": 874,
      "drillNumber": 874,
      "title": "Prep Drill #874: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 74 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 74;",
      "solutionSQL": "SELECT id, 74 AS metric FROM TargetTable;"
    },
    {
      "id": 875,
      "drillNumber": 875,
      "title": "Prep Drill #875: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 75 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 75;",
      "solutionSQL": "SELECT id, 75 AS metric FROM TargetTable;"
    },
    {
      "id": 876,
      "drillNumber": 876,
      "title": "Prep Drill #876: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 76 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 76;",
      "solutionSQL": "SELECT id, 76 AS metric FROM TargetTable;"
    },
    {
      "id": 877,
      "drillNumber": 877,
      "title": "Prep Drill #877: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 77 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 77;",
      "solutionSQL": "SELECT id, 77 AS metric FROM TargetTable;"
    },
    {
      "id": 878,
      "drillNumber": 878,
      "title": "Prep Drill #878: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 78 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 78;",
      "solutionSQL": "SELECT id, 78 AS metric FROM TargetTable;"
    },
    {
      "id": 879,
      "drillNumber": 879,
      "title": "Prep Drill #879: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 79 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 79;",
      "solutionSQL": "SELECT id, 79 AS metric FROM TargetTable;"
    },
    {
      "id": 880,
      "drillNumber": 880,
      "title": "Prep Drill #880: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 80 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 80;",
      "solutionSQL": "SELECT id, 80 AS metric FROM TargetTable;"
    },
    {
      "id": 881,
      "drillNumber": 881,
      "title": "Prep Drill #881: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 81 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 81;",
      "solutionSQL": "SELECT id, 81 AS metric FROM TargetTable;"
    },
    {
      "id": 882,
      "drillNumber": 882,
      "title": "Prep Drill #882: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 82 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 82;",
      "solutionSQL": "SELECT id, 82 AS metric FROM TargetTable;"
    },
    {
      "id": 883,
      "drillNumber": 883,
      "title": "Prep Drill #883: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 83 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 83;",
      "solutionSQL": "SELECT id, 83 AS metric FROM TargetTable;"
    },
    {
      "id": 884,
      "drillNumber": 884,
      "title": "Prep Drill #884: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 84 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 84;",
      "solutionSQL": "SELECT id, 84 AS metric FROM TargetTable;"
    },
    {
      "id": 885,
      "drillNumber": 885,
      "title": "Prep Drill #885: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 85 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 85;",
      "solutionSQL": "SELECT id, 85 AS metric FROM TargetTable;"
    },
    {
      "id": 886,
      "drillNumber": 886,
      "title": "Prep Drill #886: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 86 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 86;",
      "solutionSQL": "SELECT id, 86 AS metric FROM TargetTable;"
    },
    {
      "id": 887,
      "drillNumber": 887,
      "title": "Prep Drill #887: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 87 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 87;",
      "solutionSQL": "SELECT id, 87 AS metric FROM TargetTable;"
    },
    {
      "id": 888,
      "drillNumber": 888,
      "title": "Prep Drill #888: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 88 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 88;",
      "solutionSQL": "SELECT id, 88 AS metric FROM TargetTable;"
    },
    {
      "id": 889,
      "drillNumber": 889,
      "title": "Prep Drill #889: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 89 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 89;",
      "solutionSQL": "SELECT id, 89 AS metric FROM TargetTable;"
    },
    {
      "id": 890,
      "drillNumber": 890,
      "title": "Prep Drill #890: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 90 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 90;",
      "solutionSQL": "SELECT id, 90 AS metric FROM TargetTable;"
    },
    {
      "id": 891,
      "drillNumber": 891,
      "title": "Prep Drill #891: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 91 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 91;",
      "solutionSQL": "SELECT id, 91 AS metric FROM TargetTable;"
    },
    {
      "id": 892,
      "drillNumber": 892,
      "title": "Prep Drill #892: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 92 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 92;",
      "solutionSQL": "SELECT id, 92 AS metric FROM TargetTable;"
    },
    {
      "id": 893,
      "drillNumber": 893,
      "title": "Prep Drill #893: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 93 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 93;",
      "solutionSQL": "SELECT id, 93 AS metric FROM TargetTable;"
    },
    {
      "id": 894,
      "drillNumber": 894,
      "title": "Prep Drill #894: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 94 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 94;",
      "solutionSQL": "SELECT id, 94 AS metric FROM TargetTable;"
    },
    {
      "id": 895,
      "drillNumber": 895,
      "title": "Prep Drill #895: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 95 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 95;",
      "solutionSQL": "SELECT id, 95 AS metric FROM TargetTable;"
    },
    {
      "id": 896,
      "drillNumber": 896,
      "title": "Prep Drill #896: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 96 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 96;",
      "solutionSQL": "SELECT id, 96 AS metric FROM TargetTable;"
    },
    {
      "id": 897,
      "drillNumber": 897,
      "title": "Prep Drill #897: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 97 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 97;",
      "solutionSQL": "SELECT id, 97 AS metric FROM TargetTable;"
    },
    {
      "id": 898,
      "drillNumber": 898,
      "title": "Prep Drill #898: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 98 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 98;",
      "solutionSQL": "SELECT id, 98 AS metric FROM TargetTable;"
    },
    {
      "id": 899,
      "drillNumber": 899,
      "title": "Prep Drill #899: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 99 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 99;",
      "solutionSQL": "SELECT id, 99 AS metric FROM TargetTable;"
    },
    {
      "id": 900,
      "drillNumber": 900,
      "title": "Prep Drill #900: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 100 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 100;",
      "solutionSQL": "SELECT id, 100 AS metric FROM TargetTable;"
    }
  ],
  "drills": [
    {
      "id": 801,
      "drillNumber": 801,
      "title": "Prep Drill #801: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 1 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 1;",
      "solutionSQL": "SELECT id, 1 AS metric FROM TargetTable;"
    },
    {
      "id": 802,
      "drillNumber": 802,
      "title": "Prep Drill #802: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 2 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 2;",
      "solutionSQL": "SELECT id, 2 AS metric FROM TargetTable;"
    },
    {
      "id": 803,
      "drillNumber": 803,
      "title": "Prep Drill #803: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 3 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 3;",
      "solutionSQL": "SELECT id, 3 AS metric FROM TargetTable;"
    },
    {
      "id": 804,
      "drillNumber": 804,
      "title": "Prep Drill #804: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 4 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 4;",
      "solutionSQL": "SELECT id, 4 AS metric FROM TargetTable;"
    },
    {
      "id": 805,
      "drillNumber": 805,
      "title": "Prep Drill #805: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 5 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 5;",
      "solutionSQL": "SELECT id, 5 AS metric FROM TargetTable;"
    },
    {
      "id": 806,
      "drillNumber": 806,
      "title": "Prep Drill #806: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 6 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 6;",
      "solutionSQL": "SELECT id, 6 AS metric FROM TargetTable;"
    },
    {
      "id": 807,
      "drillNumber": 807,
      "title": "Prep Drill #807: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 7 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 7;",
      "solutionSQL": "SELECT id, 7 AS metric FROM TargetTable;"
    },
    {
      "id": 808,
      "drillNumber": 808,
      "title": "Prep Drill #808: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 8 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 8;",
      "solutionSQL": "SELECT id, 8 AS metric FROM TargetTable;"
    },
    {
      "id": 809,
      "drillNumber": 809,
      "title": "Prep Drill #809: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 9 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 9;",
      "solutionSQL": "SELECT id, 9 AS metric FROM TargetTable;"
    },
    {
      "id": 810,
      "drillNumber": 810,
      "title": "Prep Drill #810: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 10 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 10;",
      "solutionSQL": "SELECT id, 10 AS metric FROM TargetTable;"
    },
    {
      "id": 811,
      "drillNumber": 811,
      "title": "Prep Drill #811: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 11 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 11;",
      "solutionSQL": "SELECT id, 11 AS metric FROM TargetTable;"
    },
    {
      "id": 812,
      "drillNumber": 812,
      "title": "Prep Drill #812: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 12 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 12;",
      "solutionSQL": "SELECT id, 12 AS metric FROM TargetTable;"
    },
    {
      "id": 813,
      "drillNumber": 813,
      "title": "Prep Drill #813: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 13 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 13;",
      "solutionSQL": "SELECT id, 13 AS metric FROM TargetTable;"
    },
    {
      "id": 814,
      "drillNumber": 814,
      "title": "Prep Drill #814: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 14 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 14;",
      "solutionSQL": "SELECT id, 14 AS metric FROM TargetTable;"
    },
    {
      "id": 815,
      "drillNumber": 815,
      "title": "Prep Drill #815: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 15 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 15;",
      "solutionSQL": "SELECT id, 15 AS metric FROM TargetTable;"
    },
    {
      "id": 816,
      "drillNumber": 816,
      "title": "Prep Drill #816: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 16 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 16;",
      "solutionSQL": "SELECT id, 16 AS metric FROM TargetTable;"
    },
    {
      "id": 817,
      "drillNumber": 817,
      "title": "Prep Drill #817: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 17 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 17;",
      "solutionSQL": "SELECT id, 17 AS metric FROM TargetTable;"
    },
    {
      "id": 818,
      "drillNumber": 818,
      "title": "Prep Drill #818: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 18 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 18;",
      "solutionSQL": "SELECT id, 18 AS metric FROM TargetTable;"
    },
    {
      "id": 819,
      "drillNumber": 819,
      "title": "Prep Drill #819: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 19 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 19;",
      "solutionSQL": "SELECT id, 19 AS metric FROM TargetTable;"
    },
    {
      "id": 820,
      "drillNumber": 820,
      "title": "Prep Drill #820: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 20 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 20;",
      "solutionSQL": "SELECT id, 20 AS metric FROM TargetTable;"
    },
    {
      "id": 821,
      "drillNumber": 821,
      "title": "Prep Drill #821: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 21 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 21;",
      "solutionSQL": "SELECT id, 21 AS metric FROM TargetTable;"
    },
    {
      "id": 822,
      "drillNumber": 822,
      "title": "Prep Drill #822: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 22 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 22;",
      "solutionSQL": "SELECT id, 22 AS metric FROM TargetTable;"
    },
    {
      "id": 823,
      "drillNumber": 823,
      "title": "Prep Drill #823: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 23 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 23;",
      "solutionSQL": "SELECT id, 23 AS metric FROM TargetTable;"
    },
    {
      "id": 824,
      "drillNumber": 824,
      "title": "Prep Drill #824: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 24 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 24;",
      "solutionSQL": "SELECT id, 24 AS metric FROM TargetTable;"
    },
    {
      "id": 825,
      "drillNumber": 825,
      "title": "Prep Drill #825: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 25 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 25;",
      "solutionSQL": "SELECT id, 25 AS metric FROM TargetTable;"
    },
    {
      "id": 826,
      "drillNumber": 826,
      "title": "Prep Drill #826: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 26 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 26;",
      "solutionSQL": "SELECT id, 26 AS metric FROM TargetTable;"
    },
    {
      "id": 827,
      "drillNumber": 827,
      "title": "Prep Drill #827: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 27 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 27;",
      "solutionSQL": "SELECT id, 27 AS metric FROM TargetTable;"
    },
    {
      "id": 828,
      "drillNumber": 828,
      "title": "Prep Drill #828: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 28 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 28;",
      "solutionSQL": "SELECT id, 28 AS metric FROM TargetTable;"
    },
    {
      "id": 829,
      "drillNumber": 829,
      "title": "Prep Drill #829: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 29 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 29;",
      "solutionSQL": "SELECT id, 29 AS metric FROM TargetTable;"
    },
    {
      "id": 830,
      "drillNumber": 830,
      "title": "Prep Drill #830: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 30 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 30;",
      "solutionSQL": "SELECT id, 30 AS metric FROM TargetTable;"
    },
    {
      "id": 831,
      "drillNumber": 831,
      "title": "Prep Drill #831: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 31 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 31;",
      "solutionSQL": "SELECT id, 31 AS metric FROM TargetTable;"
    },
    {
      "id": 832,
      "drillNumber": 832,
      "title": "Prep Drill #832: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 32 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 32;",
      "solutionSQL": "SELECT id, 32 AS metric FROM TargetTable;"
    },
    {
      "id": 833,
      "drillNumber": 833,
      "title": "Prep Drill #833: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 33 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 33;",
      "solutionSQL": "SELECT id, 33 AS metric FROM TargetTable;"
    },
    {
      "id": 834,
      "drillNumber": 834,
      "title": "Prep Drill #834: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 34 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 34;",
      "solutionSQL": "SELECT id, 34 AS metric FROM TargetTable;"
    },
    {
      "id": 835,
      "drillNumber": 835,
      "title": "Prep Drill #835: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 35 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 35;",
      "solutionSQL": "SELECT id, 35 AS metric FROM TargetTable;"
    },
    {
      "id": 836,
      "drillNumber": 836,
      "title": "Prep Drill #836: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 36 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 36;",
      "solutionSQL": "SELECT id, 36 AS metric FROM TargetTable;"
    },
    {
      "id": 837,
      "drillNumber": 837,
      "title": "Prep Drill #837: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 37 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 37;",
      "solutionSQL": "SELECT id, 37 AS metric FROM TargetTable;"
    },
    {
      "id": 838,
      "drillNumber": 838,
      "title": "Prep Drill #838: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 38 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 38;",
      "solutionSQL": "SELECT id, 38 AS metric FROM TargetTable;"
    },
    {
      "id": 839,
      "drillNumber": 839,
      "title": "Prep Drill #839: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 39 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 39;",
      "solutionSQL": "SELECT id, 39 AS metric FROM TargetTable;"
    },
    {
      "id": 840,
      "drillNumber": 840,
      "title": "Prep Drill #840: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 40 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 40;",
      "solutionSQL": "SELECT id, 40 AS metric FROM TargetTable;"
    },
    {
      "id": 841,
      "drillNumber": 841,
      "title": "Prep Drill #841: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 41 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 41;",
      "solutionSQL": "SELECT id, 41 AS metric FROM TargetTable;"
    },
    {
      "id": 842,
      "drillNumber": 842,
      "title": "Prep Drill #842: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 42 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 42;",
      "solutionSQL": "SELECT id, 42 AS metric FROM TargetTable;"
    },
    {
      "id": 843,
      "drillNumber": 843,
      "title": "Prep Drill #843: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 43 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 43;",
      "solutionSQL": "SELECT id, 43 AS metric FROM TargetTable;"
    },
    {
      "id": 844,
      "drillNumber": 844,
      "title": "Prep Drill #844: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 44 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 44;",
      "solutionSQL": "SELECT id, 44 AS metric FROM TargetTable;"
    },
    {
      "id": 845,
      "drillNumber": 845,
      "title": "Prep Drill #845: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 45 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 45;",
      "solutionSQL": "SELECT id, 45 AS metric FROM TargetTable;"
    },
    {
      "id": 846,
      "drillNumber": 846,
      "title": "Prep Drill #846: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 46 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 46;",
      "solutionSQL": "SELECT id, 46 AS metric FROM TargetTable;"
    },
    {
      "id": 847,
      "drillNumber": 847,
      "title": "Prep Drill #847: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 47 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 47;",
      "solutionSQL": "SELECT id, 47 AS metric FROM TargetTable;"
    },
    {
      "id": 848,
      "drillNumber": 848,
      "title": "Prep Drill #848: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 48 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 48;",
      "solutionSQL": "SELECT id, 48 AS metric FROM TargetTable;"
    },
    {
      "id": 849,
      "drillNumber": 849,
      "title": "Prep Drill #849: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 49 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 49;",
      "solutionSQL": "SELECT id, 49 AS metric FROM TargetTable;"
    },
    {
      "id": 850,
      "drillNumber": 850,
      "title": "Prep Drill #850: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 50 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 50;",
      "solutionSQL": "SELECT id, 50 AS metric FROM TargetTable;"
    },
    {
      "id": 851,
      "drillNumber": 851,
      "title": "Prep Drill #851: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 51 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 51;",
      "solutionSQL": "SELECT id, 51 AS metric FROM TargetTable;"
    },
    {
      "id": 852,
      "drillNumber": 852,
      "title": "Prep Drill #852: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 52 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 52;",
      "solutionSQL": "SELECT id, 52 AS metric FROM TargetTable;"
    },
    {
      "id": 853,
      "drillNumber": 853,
      "title": "Prep Drill #853: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 53 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 53;",
      "solutionSQL": "SELECT id, 53 AS metric FROM TargetTable;"
    },
    {
      "id": 854,
      "drillNumber": 854,
      "title": "Prep Drill #854: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 54 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 54;",
      "solutionSQL": "SELECT id, 54 AS metric FROM TargetTable;"
    },
    {
      "id": 855,
      "drillNumber": 855,
      "title": "Prep Drill #855: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 55 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 55;",
      "solutionSQL": "SELECT id, 55 AS metric FROM TargetTable;"
    },
    {
      "id": 856,
      "drillNumber": 856,
      "title": "Prep Drill #856: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 56 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 56;",
      "solutionSQL": "SELECT id, 56 AS metric FROM TargetTable;"
    },
    {
      "id": 857,
      "drillNumber": 857,
      "title": "Prep Drill #857: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 57 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 57;",
      "solutionSQL": "SELECT id, 57 AS metric FROM TargetTable;"
    },
    {
      "id": 858,
      "drillNumber": 858,
      "title": "Prep Drill #858: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 58 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 58;",
      "solutionSQL": "SELECT id, 58 AS metric FROM TargetTable;"
    },
    {
      "id": 859,
      "drillNumber": 859,
      "title": "Prep Drill #859: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 59 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 59;",
      "solutionSQL": "SELECT id, 59 AS metric FROM TargetTable;"
    },
    {
      "id": 860,
      "drillNumber": 860,
      "title": "Prep Drill #860: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 60 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 60;",
      "solutionSQL": "SELECT id, 60 AS metric FROM TargetTable;"
    },
    {
      "id": 861,
      "drillNumber": 861,
      "title": "Prep Drill #861: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 61 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 61;",
      "solutionSQL": "SELECT id, 61 AS metric FROM TargetTable;"
    },
    {
      "id": 862,
      "drillNumber": 862,
      "title": "Prep Drill #862: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 62 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 62;",
      "solutionSQL": "SELECT id, 62 AS metric FROM TargetTable;"
    },
    {
      "id": 863,
      "drillNumber": 863,
      "title": "Prep Drill #863: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 63 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 63;",
      "solutionSQL": "SELECT id, 63 AS metric FROM TargetTable;"
    },
    {
      "id": 864,
      "drillNumber": 864,
      "title": "Prep Drill #864: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 64 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 64;",
      "solutionSQL": "SELECT id, 64 AS metric FROM TargetTable;"
    },
    {
      "id": 865,
      "drillNumber": 865,
      "title": "Prep Drill #865: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 65 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 65;",
      "solutionSQL": "SELECT id, 65 AS metric FROM TargetTable;"
    },
    {
      "id": 866,
      "drillNumber": 866,
      "title": "Prep Drill #866: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 66 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 66;",
      "solutionSQL": "SELECT id, 66 AS metric FROM TargetTable;"
    },
    {
      "id": 867,
      "drillNumber": 867,
      "title": "Prep Drill #867: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 67 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 67;",
      "solutionSQL": "SELECT id, 67 AS metric FROM TargetTable;"
    },
    {
      "id": 868,
      "drillNumber": 868,
      "title": "Prep Drill #868: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 68 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 68;",
      "solutionSQL": "SELECT id, 68 AS metric FROM TargetTable;"
    },
    {
      "id": 869,
      "drillNumber": 869,
      "title": "Prep Drill #869: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 69 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 69;",
      "solutionSQL": "SELECT id, 69 AS metric FROM TargetTable;"
    },
    {
      "id": 870,
      "drillNumber": 870,
      "title": "Prep Drill #870: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 70 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 70;",
      "solutionSQL": "SELECT id, 70 AS metric FROM TargetTable;"
    },
    {
      "id": 871,
      "drillNumber": 871,
      "title": "Prep Drill #871: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 71 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 71;",
      "solutionSQL": "SELECT id, 71 AS metric FROM TargetTable;"
    },
    {
      "id": 872,
      "drillNumber": 872,
      "title": "Prep Drill #872: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 72 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 72;",
      "solutionSQL": "SELECT id, 72 AS metric FROM TargetTable;"
    },
    {
      "id": 873,
      "drillNumber": 873,
      "title": "Prep Drill #873: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 73 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 73;",
      "solutionSQL": "SELECT id, 73 AS metric FROM TargetTable;"
    },
    {
      "id": 874,
      "drillNumber": 874,
      "title": "Prep Drill #874: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 74 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 74;",
      "solutionSQL": "SELECT id, 74 AS metric FROM TargetTable;"
    },
    {
      "id": 875,
      "drillNumber": 875,
      "title": "Prep Drill #875: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 75 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 75;",
      "solutionSQL": "SELECT id, 75 AS metric FROM TargetTable;"
    },
    {
      "id": 876,
      "drillNumber": 876,
      "title": "Prep Drill #876: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 76 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 76;",
      "solutionSQL": "SELECT id, 76 AS metric FROM TargetTable;"
    },
    {
      "id": 877,
      "drillNumber": 877,
      "title": "Prep Drill #877: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 77 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 77;",
      "solutionSQL": "SELECT id, 77 AS metric FROM TargetTable;"
    },
    {
      "id": 878,
      "drillNumber": 878,
      "title": "Prep Drill #878: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 78 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 78;",
      "solutionSQL": "SELECT id, 78 AS metric FROM TargetTable;"
    },
    {
      "id": 879,
      "drillNumber": 879,
      "title": "Prep Drill #879: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 79 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 79;",
      "solutionSQL": "SELECT id, 79 AS metric FROM TargetTable;"
    },
    {
      "id": 880,
      "drillNumber": 880,
      "title": "Prep Drill #880: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 80 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 80;",
      "solutionSQL": "SELECT id, 80 AS metric FROM TargetTable;"
    },
    {
      "id": 881,
      "drillNumber": 881,
      "title": "Prep Drill #881: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 81 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 81;",
      "solutionSQL": "SELECT id, 81 AS metric FROM TargetTable;"
    },
    {
      "id": 882,
      "drillNumber": 882,
      "title": "Prep Drill #882: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 82 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 82;",
      "solutionSQL": "SELECT id, 82 AS metric FROM TargetTable;"
    },
    {
      "id": 883,
      "drillNumber": 883,
      "title": "Prep Drill #883: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 83 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 83;",
      "solutionSQL": "SELECT id, 83 AS metric FROM TargetTable;"
    },
    {
      "id": 884,
      "drillNumber": 884,
      "title": "Prep Drill #884: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 84 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 84;",
      "solutionSQL": "SELECT id, 84 AS metric FROM TargetTable;"
    },
    {
      "id": 885,
      "drillNumber": 885,
      "title": "Prep Drill #885: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 85 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 85;",
      "solutionSQL": "SELECT id, 85 AS metric FROM TargetTable;"
    },
    {
      "id": 886,
      "drillNumber": 886,
      "title": "Prep Drill #886: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 86 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 86;",
      "solutionSQL": "SELECT id, 86 AS metric FROM TargetTable;"
    },
    {
      "id": 887,
      "drillNumber": 887,
      "title": "Prep Drill #887: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 87 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 87;",
      "solutionSQL": "SELECT id, 87 AS metric FROM TargetTable;"
    },
    {
      "id": 888,
      "drillNumber": 888,
      "title": "Prep Drill #888: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 88 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 88;",
      "solutionSQL": "SELECT id, 88 AS metric FROM TargetTable;"
    },
    {
      "id": 889,
      "drillNumber": 889,
      "title": "Prep Drill #889: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 89 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 89;",
      "solutionSQL": "SELECT id, 89 AS metric FROM TargetTable;"
    },
    {
      "id": 890,
      "drillNumber": 890,
      "title": "Prep Drill #890: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 90 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 90;",
      "solutionSQL": "SELECT id, 90 AS metric FROM TargetTable;"
    },
    {
      "id": 891,
      "drillNumber": 891,
      "title": "Prep Drill #891: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 91 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 91;",
      "solutionSQL": "SELECT id, 91 AS metric FROM TargetTable;"
    },
    {
      "id": 892,
      "drillNumber": 892,
      "title": "Prep Drill #892: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 92 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 92;",
      "solutionSQL": "SELECT id, 92 AS metric FROM TargetTable;"
    },
    {
      "id": 893,
      "drillNumber": 893,
      "title": "Prep Drill #893: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 93 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 93;",
      "solutionSQL": "SELECT id, 93 AS metric FROM TargetTable;"
    },
    {
      "id": 894,
      "drillNumber": 894,
      "title": "Prep Drill #894: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 94 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 94;",
      "solutionSQL": "SELECT id, 94 AS metric FROM TargetTable;"
    },
    {
      "id": 895,
      "drillNumber": 895,
      "title": "Prep Drill #895: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 95 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 95;",
      "solutionSQL": "SELECT id, 95 AS metric FROM TargetTable;"
    },
    {
      "id": 896,
      "drillNumber": 896,
      "title": "Prep Drill #896: Nth Highest Compensation Lookup",
      "domain": "Executive Compensation",
      "prompt": "Scenario 96 (Executive Compensation): Query the Nth highest compensation tier using offset parameterization and scalar NULL fallback.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 96;",
      "solutionSQL": "SELECT id, 96 AS metric FROM TargetTable;"
    },
    {
      "id": 897,
      "drillNumber": 897,
      "title": "Prep Drill #897: Contiguous Dense Ranking",
      "domain": "Gaming Leaderboards",
      "prompt": "Scenario 97 (Gaming Leaderboards): Generate dense rank scores without skipping integer ranks when ties occur.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 97;",
      "solutionSQL": "SELECT id, 97 AS metric FROM TargetTable;"
    },
    {
      "id": 898,
      "drillNumber": 898,
      "title": "Prep Drill #898: Undirected Degree Centrality",
      "domain": "Social Network Graphs",
      "prompt": "Scenario 98 (Social Network Graphs): Compute bidirectional friend degrees using UNION ALL normalization across requester and accepter fields.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 98;",
      "solutionSQL": "SELECT id, 98 AS metric FROM TargetTable;"
    },
    {
      "id": 899,
      "drillNumber": 899,
      "title": "Prep Drill #899: Consecutive Login Islands",
      "domain": "User Retention Analytics",
      "prompt": "Scenario 99 (User Retention Analytics): Detect continuous 5-day active user streaks using the date - ROW_NUMBER() grouping property.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 99;",
      "solutionSQL": "SELECT id, 99 AS metric FROM TargetTable;"
    },
    {
      "id": 900,
      "drillNumber": 900,
      "title": "Prep Drill #900: Missing Invoice Sequence Generator",
      "domain": "Financial Auditing",
      "prompt": "Scenario 100 (Financial Auditing): Synthesize missing transactional IDs in an unbroken integer sequence using recursive CTEs.",
      "starterSQL": "SELECT * FROM TargetTable WHERE id = 100;",
      "solutionSQL": "SELECT id, 100 AS metric FROM TargetTable;"
    }
  ],
  "leetcodeProblems": [
    {
      "id": 177,
      "title": "Nth Highest Salary",
      "difficulty": "Medium",
      "acceptance": "38.2%",
      "interviewFreq": "Very High • Amazon, Apple, Meta, Google",
      "companies": [
        "Amazon",
        "Apple",
        "Meta",
        "Google"
      ],
      "prompt": "Write a SQL query to get the nth highest salary from the Employee table. If there is no nth highest salary, the query should return null.",
      "sampleInput": {
        "table": "Employee",
        "columns": [
          "id",
          "salary"
        ],
        "rows": [
          [
            1,
            100
          ],
          [
            2,
            200
          ],
          [
            3,
            300
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "getNthHighestSalary(2)"
        ],
        "rows": [
          [
            200
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #177: Nth HIGHEST SALARY VIA OFFSET PARAMETERIZATION</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Employee Table</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">1: $100</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">2: $200</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">3: $300</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">SET N = N - 1;\\nLIMIT 1 OFFSET N</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Scalar Output</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">getNthHighestSalary(2): 200</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "In MySQL functions, variables passed to LIMIT cannot be calculated in-line (e.g., LIMIT N-1).",
        "Mutate the input parameter first: SET N = N - 1.",
        "Query distinct salaries ordered descending with LIMIT 1 OFFSET N.",
        "The scalar wrapper returns NULL automatically if no matching row exists."
      ],
      "trapsAndEdgeCases": [
        "Duplicate salaries trap: Must use SELECT DISTINCT salary so duplicate values share the same rank.",
        "Fewer than N distinct salaries: Empty set must resolve to NULL via scalar subquery."
      ],
      "solutionSQL": "CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT\nBEGIN\n  SET N = N - 1;\n  RETURN (\n    SELECT DISTINCT salary\n    FROM Employee\n    ORDER BY salary DESC\n    LIMIT 1 OFFSET N\n  );\nEND;",
      "lineByLineExplanation": [
        {
          "clause": "SET N = N - 1;",
          "exp": "Decrements N to convert 1-based rank to 0-based OFFSET."
        },
        {
          "clause": "SELECT DISTINCT salary",
          "exp": "Deduplicates identical salaries."
        },
        {
          "clause": "FROM Employee ORDER BY salary DESC",
          "exp": "Sorts compensation from highest to lowest."
        },
        {
          "clause": "LIMIT 1 OFFSET N",
          "exp": "Skips N rows and extracts the exact Nth distinct item."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "DENSE_RANK() Window CTE",
          "complexity": "O(N log N)",
          "sql": "CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT\nBEGIN\n  RETURN (\n    WITH Ranked AS (\n      SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk\n      FROM Employee\n    )\n    SELECT DISTINCT salary FROM Ranked WHERE rnk = N\n  );\nEND;",
          "explanation": "Uses DENSE_RANK() to assign contiguous integer ranks directly without manual offset decrements."
        }
      ]
    },
    {
      "id": 178,
      "title": "Rank Scores",
      "difficulty": "Medium",
      "acceptance": "62.1%",
      "interviewFreq": "Very High • Amazon, Adobe, Microsoft",
      "companies": [
        "Amazon",
        "Adobe",
        "Microsoft"
      ],
      "prompt": "Write a solution to find the rank of the scores. The ranking should be calculated according to the following rules:\n- Scores ranked from highest to lowest.\n- Tied scores share the same rank.\n- Ranks are consecutive without gaps.\nReturn the result table ordered by score in descending order.",
      "sampleInput": {
        "table": "Scores",
        "columns": [
          "id",
          "score"
        ],
        "rows": [
          [
            1,
            3.5
          ],
          [
            2,
            3.65
          ],
          [
            3,
            4
          ],
          [
            4,
            3.85
          ],
          [
            5,
            4
          ],
          [
            6,
            3.65
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "score",
          "rank"
        ],
        "rows": [
          [
            4,
            1
          ],
          [
            4,
            1
          ],
          [
            3.85,
            2
          ],
          [
            3.65,
            3
          ],
          [
            3.65,
            3
          ],
          [
            3.5,
            4
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #178: DENSE_RANK TIE-PRESERVATION WITHOUT HOLES</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Scores Table</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">3: 4.00</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">5: 4.00</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">4: 3.85</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">DENSE_RANK() OVER\\n(ORDER BY score DESC)</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Ranked Table</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">4.00 -> Rank 1</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">4.00 -> Rank 1</text><text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">3.85 -> Rank 2</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Standard RANK() skips ranks on ties (1, 1, 3), which violates the problem specification.",
        "DENSE_RANK() guarantees contiguous ranks (1, 1, 2).",
        "The alias 'rank' is an SQL reserved word and must be escaped with backticks in MySQL."
      ],
      "trapsAndEdgeCases": [
        "Reserved keyword collision: Aliasing without quotes (`rank`) can cause syntax errors.",
        "Floating point ordering: Precision sorting must be exact."
      ],
      "solutionSQL": "SELECT score,\n       DENSE_RANK() OVER (ORDER BY score DESC) AS `rank`\nFROM Scores\nORDER BY score DESC;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT score,",
          "exp": "Projects the original floating point score."
        },
        {
          "clause": "DENSE_RANK() OVER (ORDER BY score DESC) AS `rank`",
          "exp": "Calculates dense ranking in descending order."
        },
        {
          "clause": "FROM Scores",
          "exp": "Source scores table."
        },
        {
          "clause": "ORDER BY score DESC",
          "exp": "Ensures result table is presented highest to lowest."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Legacy Correlated Subquery",
          "complexity": "O(N^2)",
          "sql": "SELECT s1.score,\n       (SELECT COUNT(DISTINCT s2.score) FROM Scores s2 WHERE s2.score >= s1.score) AS `rank`\nFROM Scores s1\nORDER BY s1.score DESC;",
          "explanation": "Pre-window function ANSI approach counting unique scores greater than or equal to current score."
        }
      ]
    },
    {
      "id": 512,
      "title": "Game Play Analysis II",
      "difficulty": "Easy",
      "acceptance": "54.8%",
      "interviewFreq": "High • Meta, Twitch, Blizzard",
      "companies": [
        "Meta",
        "Twitch",
        "Blizzard"
      ],
      "prompt": "Write a solution to report the device that is first logged in for each player.\nReturn the result table in any order.",
      "sampleInput": {
        "table": "Activity",
        "columns": [
          "player_id",
          "device_id",
          "event_date",
          "games_played"
        ],
        "rows": [
          [
            1,
            2,
            "2016-03-01",
            5
          ],
          [
            1,
            2,
            "2016-05-02",
            6
          ],
          [
            2,
            3,
            "2017-06-25",
            1
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "player_id",
          "device_id"
        ],
        "rows": [
          [
            1,
            2
          ],
          [
            2,
            3
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #512: FIRST LOGIN DEVICE EXTRACTION</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Activity</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P1: 2016-03-01, Dev 2</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P1: 2016-05-02, Dev 2</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P2: 2017-06-25, Dev 3</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">WHERE (player_id, event_date) IN\\n(MIN(event_date))</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">First Device</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">P1 -> Dev 2</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">P2 -> Dev 3</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Find the minimum event_date for each player.",
        "Filter the original table to match both player_id and that minimum date.",
        "Select the corresponding device_id."
      ],
      "trapsAndEdgeCases": [
        "Multiple logins on same date: The problem specifies (player_id, event_date) is primary key, ensuring uniqueness."
      ],
      "solutionSQL": "SELECT player_id, device_id\nFROM Activity\nWHERE (player_id, event_date) IN (\n    SELECT player_id, MIN(event_date)\n    FROM Activity\n    GROUP BY player_id\n);",
      "lineByLineExplanation": [
        {
          "clause": "SELECT player_id, device_id",
          "exp": "Projects player and first login device."
        },
        {
          "clause": "FROM Activity",
          "exp": "Source activity log."
        },
        {
          "clause": "WHERE (player_id, event_date) IN (...)",
          "exp": "Tuple filter matching each player's earliest date."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "ROW_NUMBER() Window Filter",
          "complexity": "O(N log N)",
          "sql": "WITH Ranked AS (\n  SELECT player_id, device_id,\n         ROW_NUMBER() OVER (PARTITION BY player_id ORDER BY event_date ASC) AS rnk\n  FROM Activity\n)\nSELECT player_id, device_id FROM Ranked WHERE rnk = 1;",
          "explanation": "Partitions by player, orders chronologically, and extracts the top row."
        }
      ]
    },
    {
      "id": 534,
      "title": "Game Play Analysis III",
      "difficulty": "Medium",
      "acceptance": "81.0%",
      "interviewFreq": "High • Meta, Netflix",
      "companies": [
        "Meta",
        "Netflix"
      ],
      "prompt": "Write a solution to report for each player and date, how many games played so far by the player. That is, the total number of games played by the player until that date.",
      "sampleInput": {
        "table": "Activity",
        "columns": [
          "player_id",
          "device_id",
          "event_date",
          "games_played"
        ],
        "rows": [
          [
            1,
            2,
            "2016-03-01",
            5
          ],
          [
            1,
            2,
            "2016-05-02",
            6
          ],
          [
            1,
            3,
            "2017-06-25",
            1
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "player_id",
          "event_date",
          "games_played_so_far"
        ],
        "rows": [
          [
            1,
            "2016-03-01",
            5
          ],
          [
            1,
            "2016-05-02",
            11
          ],
          [
            1,
            "2017-06-25",
            12
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #534: CUMULATIVE RUNNING SUM PER PLAYER</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Games Played</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P1 (03-01): 5</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P1 (05-02): 6</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P1 (06-25): 1</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">SUM(games_played) OVER\\n(PARTITION BY player_id ORDER BY date)</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Running Total</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">03-01: 5</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">05-02: 11 (5+6)</text><text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">06-25: 12 (11+1)</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Use window aggregation SUM(games_played) partitioned by player_id and ordered by event_date.",
        "The default window frame with ORDER BY is RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.",
        "This accumulates all past games played up to and including the current date."
      ],
      "trapsAndEdgeCases": [
        "Unbounded following trap: Omitting ORDER BY causes SUM() to compute the grand total for the player instead of running total."
      ],
      "solutionSQL": "SELECT player_id,\n       event_date,\n       SUM(games_played) OVER (\n           PARTITION BY player_id\n           ORDER BY event_date\n       ) AS games_played_so_far\nFROM Activity;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT player_id, event_date,",
          "exp": "Emits player and chronological activity date."
        },
        {
          "clause": "SUM(games_played) OVER (PARTITION BY player_id ORDER BY event_date) AS games_played_so_far",
          "exp": "Running cumulative sum per player."
        },
        {
          "clause": "FROM Activity",
          "exp": "Source activity log."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Self-Join Cumulative Sum",
          "complexity": "O(N^2)",
          "sql": "SELECT a1.player_id, a1.event_date, SUM(a2.games_played) AS games_played_so_far\nFROM Activity a1\nJOIN Activity a2 ON a1.player_id = a2.player_id AND a2.event_date <= a1.event_date\nGROUP BY a1.player_id, a1.event_date;",
          "explanation": "ANSI self-join joining prior records and aggregating with SUM."
        }
      ]
    },
    {
      "id": 571,
      "title": "Find Median Given Frequency of Schedule",
      "difficulty": "Hard",
      "acceptance": "44.6%",
      "interviewFreq": "Very High • Pinterest, Meta, Google",
      "companies": [
        "Pinterest",
        "Meta",
        "Google"
      ],
      "prompt": "The median is the value separating the higher half from the lower half of a data sample. Write a solution to calculate the median of all the numbers in the Numbers table and round it to 1 decimal place.",
      "sampleInput": {
        "table": "Numbers",
        "columns": [
          "num",
          "frequency"
        ],
        "rows": [
          [
            0,
            7
          ],
          [
            1,
            1
          ],
          [
            2,
            3
          ],
          [
            3,
            1
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "median"
        ],
        "rows": [
          [
            0
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #571: WEIGHTED FREQUENCY MEDIAN THEOREM</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Frequency Counts</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">0 (Freq 7)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">1 (Freq 1)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">2 (Freq 3)</text><text x=\"14\" y=\"96\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">3 (Freq 1)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">Asc_Cum >= T/2 AND\\nDesc_Cum >= T/2</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Median Value</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">median: 0.0</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Calculate total count of numbers: T = SUM(frequency).",
        "Compute ascending cumulative frequency and descending cumulative frequency for each number.",
        "A number is a median candidate if both its ascending and descending cumulative sums are >= T / 2.0.",
        "Average the qualifying numbers to handle both odd and even distribution parity."
      ],
      "trapsAndEdgeCases": [
        "Even count midpoint: If T is even, two distinct numbers may qualify; AVG(num) resolves to their midpoint.",
        "Rounding requirement: Must format to 1 decimal place using ROUND(..., 1)."
      ],
      "solutionSQL": "WITH Cumulative AS (\n    SELECT num,\n           frequency,\n           SUM(frequency) OVER (ORDER BY num ASC) AS asc_cum,\n           SUM(frequency) OVER (ORDER BY num DESC) AS desc_cum,\n           SUM(frequency) OVER () AS total_cnt\n    FROM Numbers\n)\nSELECT ROUND(AVG(num), 1) AS median\nFROM Cumulative\nWHERE asc_cum >= total_cnt / 2.0\n  AND desc_cum >= total_cnt / 2.0;",
      "lineByLineExplanation": [
        {
          "clause": "WITH Cumulative AS (...)",
          "exp": "Calculates ascending, descending, and grand total frequencies."
        },
        {
          "clause": "WHERE asc_cum >= total_cnt / 2.0 AND desc_cum >= total_cnt / 2.0",
          "exp": "Filters numbers falling on the median boundary interval."
        },
        {
          "clause": "SELECT ROUND(AVG(num), 1) AS median",
          "exp": "Averages the median set and rounds to 1 decimal place."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Recursive Number Unfolding",
          "complexity": "O(Total Frequency)",
          "sql": "WITH RECURSIVE Expanded AS (\n  SELECT num, frequency, 1 AS seq FROM Numbers\n  UNION ALL\n  SELECT num, frequency, seq + 1 FROM Expanded WHERE seq < frequency\n)\nSELECT ROUND(AVG(num), 1) AS median FROM (\n  SELECT num, ROW_NUMBER() OVER(ORDER BY num) AS rnk, COUNT(*) OVER() AS total FROM Expanded\n) t WHERE rnk IN (FLOOR((total+1)/2), CEIL((total+1)/2));",
          "explanation": "Physically unfolds frequencies into individual rows and applies standard ordinal median selection."
        }
      ]
    },
    {
      "id": 574,
      "title": "Winning Candidate",
      "difficulty": "Medium",
      "acceptance": "60.4%",
      "interviewFreq": "High • Uber, Amazon",
      "companies": [
        "Uber",
        "Amazon"
      ],
      "prompt": "Write a solution to report the name of the winning candidate (i.e., the candidate who got the largest number of votes).\nIt is guaranteed that there is exactly one winning candidate.",
      "sampleInput": {
        "table": "Candidate",
        "columns": [
          "id",
          "name"
        ],
        "rows": [
          [
            1,
            "A"
          ],
          [
            2,
            "B"
          ],
          [
            3,
            "C"
          ],
          [
            4,
            "D"
          ],
          [
            5,
            "E"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "name"
        ],
        "rows": [
          [
            "B"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #574: VOTE TALLY AGGREGATION</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Votes</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">V1: Candidate 2</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">V2: Candidate 4</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">V3: Candidate 2</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">GROUP BY candidateId\\nORDER BY COUNT(*) DESC LIMIT 1</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Winner</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">name: B (2 votes)</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Group the Vote table by candidateId and order by COUNT(*) descending with LIMIT 1.",
        "Join the resulting candidateId back to the Candidate table to retrieve the candidate's name."
      ],
      "trapsAndEdgeCases": [
        "Candidate with 0 votes: Joining Candidate first requires LEFT JOIN, but querying Vote first is much faster."
      ],
      "solutionSQL": "SELECT c.name\nFROM Candidate c\nJOIN (\n    SELECT candidateId\n    FROM Vote\n    GROUP BY candidateId\n    ORDER BY COUNT(*) DESC\n    LIMIT 1\n) v ON c.id = v.candidateId;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT c.name",
          "exp": "Emits the winner's name."
        },
        {
          "clause": "FROM Candidate c",
          "exp": "Source candidates table."
        },
        {
          "clause": "JOIN (SELECT candidateId ... LIMIT 1) v",
          "exp": "Subquery identifying the candidate with maximum votes."
        },
        {
          "clause": "ON c.id = v.candidateId",
          "exp": "Matches winner's ID."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "CTE with DENSE_RANK()",
          "complexity": "O(V log V)",
          "sql": "WITH Tally AS (\n  SELECT candidateId, DENSE_RANK() OVER (ORDER BY COUNT(*) DESC) AS rnk\n  FROM Vote GROUP BY candidateId\n)\nSELECT name FROM Candidate c JOIN Tally t ON c.id = t.candidateId WHERE t.rnk = 1;",
          "explanation": "Window rank alternative handling potential multi-candidate ties."
        }
      ]
    },
    {
      "id": 578,
      "title": "Get Highest Answer Rate Question",
      "difficulty": "Medium",
      "acceptance": "41.5%",
      "interviewFreq": "High • Meta, Snap",
      "companies": [
        "Meta",
        "Snap"
      ],
      "prompt": "The answer rate for a question is the number of times a user answered the question by the number of times it was shown. Write a solution to report the question that has the highest answer rate. If multiple questions have the same maximum rate, return the one with the smallest question_id.",
      "sampleInput": {
        "table": "SurveyLog",
        "columns": [
          "id",
          "action",
          "question_id",
          "answer_id",
          "q_num",
          "timestamp"
        ],
        "rows": [
          [
            5,
            "show",
            285,
            null,
            1,
            123
          ],
          [
            5,
            "answer",
            285,
            124124,
            1,
            124
          ],
          [
            5,
            "show",
            369,
            null,
            2,
            125
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "survey_log"
        ],
        "rows": [
          [
            285
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #578: RATIO CALCULATION WITH TIE-BREAKING</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">SurveyLog</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Q285: show, answer</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Q369: show (no answer)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">SUM(action='answer') /\\nSUM(action='show')</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Highest Rate</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">survey_log: 285 (100%)</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "For each question_id, count how many times action = 'answer' and action = 'show'.",
        "Compute answer_rate = SUM(action = 'answer') / SUM(action = 'show').",
        "Order by answer_rate DESC, question_id ASC with LIMIT 1."
      ],
      "trapsAndEdgeCases": [
        "Tie-breaking rule: Must sort question_id ASC as the secondary sort key."
      ],
      "solutionSQL": "SELECT question_id AS survey_log\nFROM SurveyLog\nGROUP BY question_id\nORDER BY SUM(action = 'answer') / SUM(action = 'show') DESC,\n         question_id ASC\nLIMIT 1;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT question_id AS survey_log",
          "exp": "Projects the winning question ID aliased as survey_log."
        },
        {
          "clause": "FROM SurveyLog GROUP BY question_id",
          "exp": "Aggregates actions per question."
        },
        {
          "clause": "ORDER BY SUM(action = 'answer') / SUM(action = 'show') DESC, question_id ASC",
          "exp": "Ranks by answer rate, breaking ties by lowest ID."
        },
        {
          "clause": "LIMIT 1",
          "exp": "Emits the top question."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "COUNT(answer_id) Optimization",
          "complexity": "O(N log N)",
          "sql": "SELECT question_id AS survey_log\nFROM SurveyLog\nGROUP BY question_id\nORDER BY COUNT(answer_id) / COUNT(IF(action = 'show', 1, NULL)) DESC, question_id ASC\nLIMIT 1;",
          "explanation": "Leverages the fact that answer_id is non-null only for answer events."
        }
      ]
    },
    {
      "id": 579,
      "title": "Find Cumulative Salary of an Employee",
      "difficulty": "Hard",
      "acceptance": "44.9%",
      "interviewFreq": "Very High • Amazon, Oracle",
      "companies": [
        "Amazon",
        "Oracle"
      ],
      "prompt": "Write a solution to calculate the cumulative salary summary for every employee in a single table, excluding the most recent month for each employee. The cumulative salary is the sum of salaries in the current month and the previous 2 months. Return the result table ordered by id in ascending order, and then by month in descending order.",
      "sampleInput": {
        "table": "Employee",
        "columns": [
          "id",
          "month",
          "salary"
        ],
        "rows": [
          [
            1,
            1,
            20
          ],
          [
            1,
            2,
            30
          ],
          [
            1,
            3,
            40
          ],
          [
            1,
            4,
            60
          ],
          [
            2,
            1,
            20
          ],
          [
            3,
            1,
            20
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "id",
          "month",
          "Salary"
        ],
        "rows": [
          [
            1,
            3,
            90
          ],
          [
            1,
            2,
            50
          ],
          [
            1,
            1,
            20
          ],
          [
            2,
            1,
            20
          ],
          [
            3,
            1,
            20
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #579: 3-MONTH ROLLING SUM WITH MAX MONTH EXCLUDED</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Emp 1 History</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">M1: 20 -> Cum 20</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">M2: 30 -> Cum 50</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">M3: 40 -> Cum 90</text><text x=\"14\" y=\"96\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">M4: 60 (MAX EXCLUDED)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">SUM(salary) OVER(ROWS\\nBETWEEN 2 PRECEDING) & !MAX</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Report Table</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">1, M3, 90</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">1, M2, 50</text><text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">1, M1, 20</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Filter out each employee's most recent (maximum) month: (id, month) NOT IN (SELECT id, MAX(month) FROM Employee GROUP BY id).",
        "Calculate 3-month rolling sum: SUM(salary) OVER (PARTITION BY id ORDER BY month RANGE BETWEEN 2 PRECEDING AND CURRENT ROW).",
        "Order final results by id ASC, month DESC."
      ],
      "trapsAndEdgeCases": [
        "Employees with only 1 month: Their only month is also their max month, so they are completely omitted from the output."
      ],
      "solutionSQL": "SELECT id,\n       month,\n       SUM(salary) OVER (\n           PARTITION BY id\n           ORDER BY month\n           RANGE BETWEEN 2 PRECEDING AND CURRENT ROW\n       ) AS Salary\nFROM Employee\nWHERE (id, month) NOT IN (\n    SELECT id, MAX(month)\n    FROM Employee\n    GROUP BY id\n)\nORDER BY id ASC, month DESC;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT id, month,",
          "exp": "Emits employee ID and active month."
        },
        {
          "clause": "SUM(salary) OVER (PARTITION BY id ORDER BY month RANGE BETWEEN 2 PRECEDING AND CURRENT ROW) AS Salary",
          "exp": "Computes 3-month rolling sum."
        },
        {
          "clause": "WHERE (id, month) NOT IN (...)",
          "exp": "Excludes the employee's latest recorded month."
        },
        {
          "clause": "ORDER BY id ASC, month DESC",
          "exp": "Sorts by ID ascending, then chronological month descending."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Self-Join 3-Month Range",
          "complexity": "O(N^2)",
          "sql": "SELECT e1.id, e1.month, SUM(e2.salary) AS Salary\nFROM Employee e1\nJOIN Employee e2 ON e1.id = e2.id AND e2.month BETWEEN e1.month - 2 AND e1.month\nWHERE (e1.id, e1.month) NOT IN (SELECT id, MAX(month) FROM Employee GROUP BY id)\nGROUP BY e1.id, e1.month\nORDER BY e1.id ASC, e1.month DESC;",
          "explanation": "Pre-window function self-join matching records within a 2-month lookback window."
        }
      ]
    },
    {
      "id": 586,
      "title": "Customer Placing the Largest Number of Orders",
      "difficulty": "Easy",
      "acceptance": "75.4%",
      "interviewFreq": "Very High • Twitter, Amazon",
      "companies": [
        "Twitter",
        "Amazon"
      ],
      "prompt": "Write a solution to find the customer_number for the customer who has placed the largest number of orders.\nThe test cases are generated so that exactly one customer will have placed more orders than any other customer.",
      "sampleInput": {
        "table": "orders",
        "columns": [
          "order_number",
          "customer_number"
        ],
        "rows": [
          [
            1,
            1
          ],
          [
            2,
            2
          ],
          [
            3,
            3
          ],
          [
            4,
            3
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "customer_number"
        ],
        "rows": [
          [
            3
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #586: TOP ORDER FREQUENCY</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Orders</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Cust 1: 1 order</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Cust 2: 1 order</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Cust 3: 2 orders</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">GROUP BY customer_number\\nORDER BY COUNT(*) DESC LIMIT 1</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Top Customer</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">customer_number: 3</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Group orders by customer_number.",
        "Sort by COUNT(*) descending to place the customer with the highest volume at the top.",
        "Use LIMIT 1 to return the winner."
      ],
      "trapsAndEdgeCases": [
        "Ties handling: The problem explicitly guarantees exactly one customer has the maximum order count."
      ],
      "solutionSQL": "SELECT customer_number\nFROM orders\nGROUP BY customer_number\nORDER BY COUNT(*) DESC\nLIMIT 1;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT customer_number",
          "exp": "Emits the customer identifier."
        },
        {
          "clause": "FROM orders GROUP BY customer_number",
          "exp": "Aggregates orders per customer."
        },
        {
          "clause": "ORDER BY COUNT(*) DESC LIMIT 1",
          "exp": "Extracts the customer with the highest order count."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Window DENSE_RANK for Ties",
          "complexity": "O(N log N)",
          "sql": "WITH Ranked AS (\n  SELECT customer_number, DENSE_RANK() OVER (ORDER BY COUNT(*) DESC) AS rnk\n  FROM orders GROUP BY customer_number\n)\nSELECT customer_number FROM Ranked WHERE rnk = 1;",
          "explanation": "Handles potential ties by outputting all customers tied for first place."
        }
      ]
    },
    {
      "id": 602,
      "title": "Friend Requests II: Who Has the Most Friends",
      "difficulty": "Medium",
      "acceptance": "61.3%",
      "interviewFreq": "Very High • Meta, Amazon",
      "companies": [
        "Meta",
        "Amazon"
      ],
      "prompt": "Write a solution to find the people who have the most friends and the most friends number. The test cases are generated so that only one person has the most friends.",
      "sampleInput": {
        "table": "RequestAccepted",
        "columns": [
          "requester_id",
          "accepter_id",
          "accept_date"
        ],
        "rows": [
          [
            1,
            2,
            "2016/06/03"
          ],
          [
            1,
            3,
            "2016/06/08"
          ],
          [
            2,
            3,
            "2016/06/08"
          ],
          [
            3,
            4,
            "2016/06/09"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "id",
          "num"
        ],
        "rows": [
          [
            3,
            3
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #602: BIDIRECTIONAL DEGREE CENTRALITY</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Friendships</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">1 - 2</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">1 - 3</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">2 - 3</text><text x=\"14\" y=\"96\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">3 - 4</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">UNION ALL Projections\\nGROUP BY id ORDER BY COUNT(*) DESC</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Most Connected</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">User 3: 3 friends (👑)</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Friendship is bidirectional: being requester or accepter both count as 1 friend.",
        "Project requester_id AS id and accepter_id AS id using UNION ALL to preserve all occurrences.",
        "Group by id, count occurrences, and extract the top user with LIMIT 1."
      ],
      "trapsAndEdgeCases": [
        "UNION deduplication trap: Using UNION collapses duplicate entries, undercounting friends. Always use UNION ALL."
      ],
      "solutionSQL": "WITH AllFriends AS (\n    SELECT requester_id AS id FROM RequestAccepted\n    UNION ALL\n    SELECT accepter_id AS id FROM RequestAccepted\n)\nSELECT id, COUNT(*) AS num\nFROM AllFriends\nGROUP BY id\nORDER BY num DESC\nLIMIT 1;",
      "lineByLineExplanation": [
        {
          "clause": "WITH AllFriends AS (SELECT requester_id AS id ... UNION ALL SELECT accepter_id AS id)",
          "exp": "Normalizes both endpoints into a single stream."
        },
        {
          "clause": "SELECT id, COUNT(*) AS num",
          "exp": "Counts total friend degree per user."
        },
        {
          "clause": "GROUP BY id ORDER BY num DESC LIMIT 1",
          "exp": "Ranks by degree and emits the top user."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Subquery Inline Derivation",
          "complexity": "O(N log N)",
          "sql": "SELECT id, COUNT(*) AS num\nFROM (\n    SELECT requester_id AS id FROM RequestAccepted\n    UNION ALL\n    SELECT accepter_id AS id FROM RequestAccepted\n) t\nGROUP BY id\nORDER BY num DESC\nLIMIT 1;",
          "explanation": "Equivalent ANSI standard inline derived table."
        }
      ]
    },
    {
      "id": 603,
      "title": "Consecutive Available Seats",
      "difficulty": "Easy",
      "acceptance": "67.8%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Find all the consecutive available seats in the cinema. Return the result table ordered by seat_id in ascending order.",
      "sampleInput": {
        "table": "Cinema",
        "columns": [
          "seat_id",
          "free"
        ],
        "rows": [
          [
            1,
            1
          ],
          [
            2,
            0
          ],
          [
            3,
            1
          ],
          [
            4,
            1
          ],
          [
            5,
            1
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "seat_id"
        ],
        "rows": [
          [
            3
          ],
          [
            4
          ],
          [
            5
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #603: CONSECUTIVE FREE SEATS</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Cinema</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Seat 1: Free (1)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Seat 2: Taken (0)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Seats 3,4,5: Free (1)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">c1.free=1 AND c2.free=1\\nAND ABS(c1.id - c2.id) = 1</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Consecutive</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">seat_id: 3</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">seat_id: 4</text><text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">seat_id: 5</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Join the table to itself on consecutive seat IDs: ABS(c1.seat_id - c2.seat_id) = 1.",
        "Filter for rows where both seats are free: c1.free = 1 AND c2.free = 1.",
        "Select DISTINCT c1.seat_id ordered by seat_id ASC."
      ],
      "trapsAndEdgeCases": [
        "Duplicate seat listings: A seat flanked by two available seats (e.g., seat 4 surrounded by 3 and 5) will match twice; DISTINCT is mandatory."
      ],
      "solutionSQL": "SELECT DISTINCT c1.seat_id\nFROM Cinema c1\nJOIN Cinema c2\n  ON ABS(c1.seat_id - c2.seat_id) = 1\nWHERE c1.free = 1 AND c2.free = 1\nORDER BY c1.seat_id ASC;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT DISTINCT c1.seat_id",
          "exp": "Emits unique available seat IDs."
        },
        {
          "clause": "FROM Cinema c1 JOIN Cinema c2",
          "exp": "Self-joins cinema seating table."
        },
        {
          "clause": "ON ABS(c1.seat_id - c2.seat_id) = 1",
          "exp": "Pairs adjacent neighbor seats."
        },
        {
          "clause": "WHERE c1.free = 1 AND c2.free = 1",
          "exp": "Ensures both adjacent seats are vacant."
        },
        {
          "clause": "ORDER BY c1.seat_id ASC",
          "exp": "Orders in ascending sequence."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Window LEAD / LAG",
          "complexity": "O(N log N)",
          "sql": "SELECT seat_id\nFROM (\n  SELECT seat_id, free,\n         LAG(free) OVER (ORDER BY seat_id) AS prev_free,\n         LEAD(free) OVER (ORDER BY seat_id) AS next_free\n  FROM Cinema\n) t\nWHERE free = 1 AND (prev_free = 1 OR next_free = 1)\nORDER BY seat_id;",
          "explanation": "Window function approach checking either immediate preceding or succeeding seat availability."
        }
      ]
    },
    {
      "id": 612,
      "title": "Shortest Distance in a Plane",
      "difficulty": "Medium",
      "acceptance": "60.9%",
      "interviewFreq": "High • Twitter, Uber",
      "companies": [
        "Twitter",
        "Uber"
      ],
      "prompt": "Write a solution to report the shortest distance between any two points from the Point2D table. Round the distance to 2 decimal places.",
      "sampleInput": {
        "table": "Point2D",
        "columns": [
          "x",
          "y"
        ],
        "rows": [
          [
            -1,
            -1
          ],
          [
            0,
            0
          ],
          [
            -1,
            -2
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "shortest"
        ],
        "rows": [
          [
            1
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #612: 2D EUCLIDEAN DISTANCE</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Point2D</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P1: (-1, -1)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P2: (0, 0)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P3: (-1, -2)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">SQRT((p1.x-p2.x)^2 +\\n(p1.y-p2.y)^2)</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Shortest Distance</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">shortest: 1.00 (between P1 & P3)</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Join Point2D with itself where points are distinct (p1.x, p1.y) != (p2.x, p2.y).",
        "Calculate 2D Euclidean distance: SQRT(POW(p1.x - p2.x, 2) + POW(p1.y - p2.y, 2)).",
        "Enforce non-symmetric pairing (e.g. p1.x < p2.x OR (p1.x = p2.x AND p1.y < p2.y)) to avoid comparing a point with itself.",
        "Round the minimum distance to 2 decimal places."
      ],
      "trapsAndEdgeCases": [
        "Zero distance self-comparison: Comparing a point to itself yields 0.00; inequality join condition is required."
      ],
      "solutionSQL": "SELECT ROUND(MIN(SQRT(POW(p1.x - p2.x, 2) + POW(p1.y - p2.y, 2))), 2) AS shortest\nFROM Point2D p1\nJOIN Point2D p2\n  ON (p1.x < p2.x) OR (p1.x = p2.x AND p1.y < p2.y);",
      "lineByLineExplanation": [
        {
          "clause": "SELECT ROUND(MIN(SQRT(...)), 2) AS shortest",
          "exp": "Computes minimum Euclidean distance rounded to 2 decimal places."
        },
        {
          "clause": "FROM Point2D p1 JOIN Point2D p2",
          "exp": "Self-joins Cartesian coordinates."
        },
        {
          "clause": "ON (p1.x < p2.x) OR (p1.x = p2.x AND p1.y < p2.y)",
          "exp": "Strictly pairs unique distinct coordinate pairs."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Standard Inequality Self-Join",
          "complexity": "O(N^2)",
          "sql": "SELECT ROUND(MIN(SQRT(POW(p1.x - p2.x, 2) + POW(p1.y - p2.y, 2))), 2) AS shortest\nFROM Point2D p1\nJOIN Point2D p2 ON NOT (p1.x = p2.x AND p1.y = p2.y);",
          "explanation": "Simple != inequality across coordinates."
        }
      ]
    },
    {
      "id": 614,
      "title": "Second Degree Follower",
      "difficulty": "Medium",
      "acceptance": "37.5%",
      "interviewFreq": "High • Twitter, Meta",
      "companies": [
        "Twitter",
        "Meta"
      ],
      "prompt": "In social networks, a second-degree follower is a user who:\n- follows at least one user, and\n- has at least one follower.\nWrite a solution to report the second-degree followers and the number of their followers. Return the result table ordered by follower in alphabetical order.",
      "sampleInput": {
        "table": "Follow",
        "columns": [
          "followee",
          "follower"
        ],
        "rows": [
          [
            "Alice",
            "Bob"
          ],
          [
            "Bob",
            "Cena"
          ],
          [
            "Bob",
            "Dan"
          ],
          [
            "Bob",
            "Alice"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "follower",
          "num"
        ],
        "rows": [
          [
            "Bob",
            3
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #614: SECOND DEGREE FOLLOWER GRAPH FILTER</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Follow Edges</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Bob follows Cena</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Alice follows Bob</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Dan follows Bob</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">followee IN (followers)\\nGROUP BY followee</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Second Degree</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">follower: Bob, num: 3</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "A second degree follower is someone who is BOTH followed by others (acts as followee) AND follows someone else (acts as follower).",
        "Filter for followees who exist in the follower column.",
        "Count distinct followers for each such followee.",
        "Order by follower name alphabetically."
      ],
      "trapsAndEdgeCases": [
        "Column renaming trap: The problem asks to alias the person being followed as 'follower' in the final output column header."
      ],
      "solutionSQL": "SELECT followee AS follower,\n       COUNT(DISTINCT follower) AS num\nFROM Follow\nWHERE followee IN (\n    SELECT follower\n    FROM Follow\n)\nGROUP BY followee\nORDER BY follower ASC;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT followee AS follower, COUNT(DISTINCT follower) AS num",
          "exp": "Counts followers for each user, aliasing column as requested."
        },
        {
          "clause": "FROM Follow",
          "exp": "Source social graph table."
        },
        {
          "clause": "WHERE followee IN (SELECT follower FROM Follow)",
          "exp": "Restricts to users who themselves follow at least one person."
        },
        {
          "clause": "GROUP BY followee ORDER BY follower ASC",
          "exp": "Aggregates per user and sorts alphabetically."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "JOIN Filter",
          "complexity": "O(N log N)",
          "sql": "SELECT f1.followee AS follower, COUNT(DISTINCT f1.follower) AS num\nFROM Follow f1\nJOIN Follow f2 ON f1.followee = f2.follower\nGROUP BY f1.followee\nORDER BY follower ASC;",
          "explanation": "Inner join between followee and follower roles."
        }
      ]
    },
    {
      "id": 615,
      "title": "Average Salary: Departments VS Company",
      "difficulty": "Hard",
      "acceptance": "54.8%",
      "interviewFreq": "Very High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to compare the average salary of each department to the company's average salary for each month. Return result with columns pay_month, department_id, and comparison ('higher', 'lower', or 'same').",
      "sampleInput": {
        "table": "Salary / Employee",
        "columns": [
          "id",
          "employee_id",
          "amount",
          "pay_date",
          "department_id"
        ],
        "rows": [
          [
            1,
            1,
            9000,
            "2017-03-31",
            1
          ],
          [
            2,
            2,
            6000,
            "2017-03-31",
            2
          ],
          [
            3,
            3,
            10000,
            "2017-03-31",
            2
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "pay_month",
          "department_id",
          "comparison"
        ],
        "rows": [
          [
            "2017-03",
            1,
            "higher"
          ],
          [
            "2017-03",
            2,
            "lower"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #615: DEPARTMENT VS COMPANY MONTHLY BENCHMARK</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">March Salaries</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Dept 1 Avg: $9,000</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Dept 2 Avg: $8,000</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Company Avg: $8,333</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">CASE WHEN dept_avg > comp_avg\\nTHEN 'higher' ...</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Benchmark</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Dept 1: higher</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Dept 2: lower</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Format pay_date to YYYY-MM: DATE_FORMAT(pay_date, '%Y-%m').",
        "Calculate company monthly average salary using AVG(amount) OVER (PARTITION BY pay_month).",
        "Calculate department monthly average salary using AVG(amount) OVER (PARTITION BY pay_month, department_id).",
        "Compare the two averages using CASE WHEN."
      ],
      "trapsAndEdgeCases": [
        "Precision matching: Use standard floating point comparisons; 'same' triggers when department avg equals company avg exactly."
      ],
      "solutionSQL": "WITH MonthlyAvgs AS (\n    SELECT DISTINCT\n           DATE_FORMAT(s.pay_date, '%Y-%m') AS pay_month,\n           e.department_id,\n           AVG(s.amount) OVER (PARTITION BY DATE_FORMAT(s.pay_date, '%Y-%m'), e.department_id) AS dept_avg,\n           AVG(s.amount) OVER (PARTITION BY DATE_FORMAT(s.pay_date, '%Y-%m')) AS comp_avg\n    FROM Salary s\n    JOIN Employee e ON s.employee_id = e.employee_id\n)\nSELECT pay_month,\n       department_id,\n       CASE\n           WHEN dept_avg > comp_avg THEN 'higher'\n           WHEN dept_avg < comp_avg THEN 'lower'\n           ELSE 'same'\n       END AS comparison\nFROM MonthlyAvgs;",
      "lineByLineExplanation": [
        {
          "clause": "WITH MonthlyAvgs AS (...)",
          "exp": "Computes department and company averages in parallel via window partitions."
        },
        {
          "clause": "SELECT pay_month, department_id,",
          "exp": "Emits month and department."
        },
        {
          "clause": "CASE WHEN dept_avg > comp_avg THEN 'higher' ... END AS comparison",
          "exp": "Classifies department performance against company baseline."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Two-Step Aggregation Join",
          "complexity": "O(N log N)",
          "sql": "WITH Dept AS (\n  SELECT DATE_FORMAT(s.pay_date, '%Y-%m') AS pay_month, e.department_id, AVG(s.amount) AS dept_avg\n  FROM Salary s JOIN Employee e ON s.employee_id = e.employee_id\n  GROUP BY 1, 2\n), Comp AS (\n  SELECT DATE_FORMAT(pay_date, '%Y-%m') AS pay_month, AVG(amount) AS comp_avg\n  FROM Salary GROUP BY 1\n)\nSELECT d.pay_month, d.department_id,\n       CASE WHEN d.dept_avg > c.comp_avg THEN 'higher' WHEN d.dept_avg < c.comp_avg THEN 'lower' ELSE 'same' END AS comparison\nFROM Dept d JOIN Comp c ON d.pay_month = c.pay_month;",
          "explanation": "Aggregates department and company tables independently and joins on pay_month."
        }
      ]
    },
    {
      "id": 1077,
      "title": "Project Employees III",
      "difficulty": "Medium",
      "acceptance": "75.8%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to report the most experienced employee in each project. In case of a tie, report all employees with the maximum number of experience years.",
      "sampleInput": {
        "table": "Project / Employee",
        "columns": [
          "project_id",
          "employee_id",
          "experience_years"
        ],
        "rows": [
          [
            1,
            1,
            3
          ],
          [
            1,
            2,
            2
          ],
          [
            1,
            3,
            3
          ],
          [
            2,
            1,
            3
          ],
          [
            2,
            4,
            2
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "project_id",
          "employee_id"
        ],
        "rows": [
          [
            1,
            1
          ],
          [
            1,
            3
          ],
          [
            2,
            1
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1077: MOST EXPERIENCED PROJECT MEMBERS</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Project 1</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Emp 1: 3 yrs (Max)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Emp 2: 2 yrs</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Emp 3: 3 yrs (Max)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">DENSE_RANK() OVER\\n(PARTITION BY project_id ORDER BY yrs DESC)</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Selected</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Proj 1 -> Emp 1</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Proj 1 -> Emp 3</text><text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Proj 2 -> Emp 1</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Join Project and Employee on employee_id.",
        "Partition by project_id and rank employees by experience_years descending using DENSE_RANK().",
        "Filter for rnk = 1 to capture all ties."
      ],
      "trapsAndEdgeCases": [
        "Ties must be included: Using ROW_NUMBER() would arbitrarily drop ties; DENSE_RANK() or RANK() is required."
      ],
      "solutionSQL": "WITH Ranked AS (\n    SELECT p.project_id,\n           p.employee_id,\n           DENSE_RANK() OVER (\n               PARTITION BY p.project_id\n               ORDER BY e.experience_years DESC\n           ) AS rnk\n    FROM Project p\n    JOIN Employee e ON p.employee_id = e.employee_id\n)\nSELECT project_id, employee_id\nFROM Ranked\nWHERE rnk = 1;",
      "lineByLineExplanation": [
        {
          "clause": "WITH Ranked AS (...)",
          "exp": "Ranks employees within each project by experience."
        },
        {
          "clause": "SELECT project_id, employee_id FROM Ranked WHERE rnk = 1",
          "exp": "Filters for top experience rank including ties."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Correlated Subquery MAX",
          "complexity": "O(N^2)",
          "sql": "SELECT p.project_id, p.employee_id\nFROM Project p\nJOIN Employee e ON p.employee_id = e.employee_id\nWHERE (p.project_id, e.experience_years) IN (\n    SELECT p2.project_id, MAX(e2.experience_years)\n    FROM Project p2\n    JOIN Employee e2 ON p2.employee_id = e2.employee_id\n    GROUP BY p2.project_id\n);",
          "explanation": "Classic tuple IN filter against max experience years per project."
        }
      ]
    },
    {
      "id": 1082,
      "title": "Sales Analysis I",
      "difficulty": "Easy",
      "acceptance": "74.1%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to report the best seller by total sales price. If there is a tie, report them all.",
      "sampleInput": {
        "table": "Sales",
        "columns": [
          "seller_id",
          "product_id",
          "buyer_id",
          "sale_date",
          "quantity",
          "price"
        ],
        "rows": [
          [
            1,
            1,
            1,
            "2019-01-21",
            2,
            2000
          ],
          [
            1,
            2,
            2,
            "2019-02-17",
            1,
            800
          ],
          [
            2,
            2,
            3,
            "2019-06-02",
            1,
            800
          ],
          [
            3,
            3,
            4,
            "2019-05-13",
            2,
            2800
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "seller_id"
        ],
        "rows": [
          [
            1
          ],
          [
            3
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1082: TOP REVENUE SELLERS (TIES INCLUDED)</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Sales Summary</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Seller 1: $2,800 (Max)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Seller 2: $800</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Seller 3: $2,800 (Max)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">DENSE_RANK() OVER\\n(ORDER BY SUM(price) DESC) = 1</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Best Sellers</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">seller_id: 1</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">seller_id: 3</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Group sales by seller_id and sum total revenue: SUM(price).",
        "Rank sellers by total sales descending with DENSE_RANK().",
        "Filter for rnk = 1 to include all tied top sellers."
      ],
      "trapsAndEdgeCases": [
        "Ties omission: ORDER BY SUM(price) DESC LIMIT 1 fails on ties; DENSE_RANK() is required."
      ],
      "solutionSQL": "WITH SellerRevenue AS (\n    SELECT seller_id,\n           DENSE_RANK() OVER (ORDER BY SUM(price) DESC) AS rnk\n    FROM Sales\n    GROUP BY seller_id\n)\nSELECT seller_id\nFROM SellerRevenue\nWHERE rnk = 1;",
      "lineByLineExplanation": [
        {
          "clause": "WITH SellerRevenue AS (SELECT seller_id, DENSE_RANK() OVER (ORDER BY SUM(price) DESC) AS rnk ...)",
          "exp": "Aggregates revenue and ranks sellers."
        },
        {
          "clause": "SELECT seller_id FROM SellerRevenue WHERE rnk = 1",
          "exp": "Filters for top rank."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "HAVING SUM >= ALL",
          "complexity": "O(N^2)",
          "sql": "SELECT seller_id FROM Sales GROUP BY seller_id\nHAVING SUM(price) >= ALL(SELECT SUM(price) FROM Sales GROUP BY seller_id);",
          "explanation": "Subquery with >= ALL quantifier."
        }
      ]
    },
    {
      "id": 1083,
      "title": "Sales Analysis II",
      "difficulty": "Easy",
      "acceptance": "52.3%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to report the buyers who have bought S8 but not iPhone. Note that S8 and iPhone are products presented in the Product table.",
      "sampleInput": {
        "table": "Product / Sales",
        "columns": [
          "product_id",
          "product_name",
          "buyer_id"
        ],
        "rows": [
          [
            1,
            "S8",
            1
          ],
          [
            2,
            "G4",
            1
          ],
          [
            3,
            "iPhone",
            2
          ],
          [
            1,
            "S8",
            3
          ],
          [
            3,
            "iPhone",
            3
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "buyer_id"
        ],
        "rows": [
          [
            1
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1083: SET DIFFERENCE: BOUGHT S8 BUT NOT IPHONE</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Buyer History</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Buyer 1: S8, G4 (Valid ✓)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Buyer 2: iPhone (No S8 ❌)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Buyer 3: S8, iPhone (Has iPhone ❌)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">SUM(prod='S8') > 0 AND\\nSUM(prod='iPhone') = 0</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Qualifying Buyers</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">buyer_id: 1</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Join Sales with Product to get product_name per sale.",
        "Group by buyer_id.",
        "Apply HAVING filter: SUM(product_name = 'S8') > 0 AND SUM(product_name = 'iPhone') = 0."
      ],
      "trapsAndEdgeCases": [
        "Buyers who bought both: Buyer 3 bought both S8 and iPhone; they must be excluded."
      ],
      "solutionSQL": "SELECT s.buyer_id\nFROM Sales s\nJOIN Product p ON s.product_id = p.product_id\nGROUP BY s.buyer_id\nHAVING SUM(p.product_name = 'S8') > 0\n   AND SUM(p.product_name = 'iPhone') = 0;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT s.buyer_id FROM Sales s JOIN Product p ON s.product_id = p.product_id",
          "exp": "Joins transactions with product catalog."
        },
        {
          "clause": "GROUP BY s.buyer_id",
          "exp": "Aggregates per buyer."
        },
        {
          "clause": "HAVING SUM(p.product_name = 'S8') > 0 AND SUM(p.product_name = 'iPhone') = 0",
          "exp": "Demands at least one S8 purchase and strictly zero iPhone purchases."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "EXCEPT / NOT IN",
          "complexity": "O(N log N)",
          "sql": "SELECT DISTINCT buyer_id FROM Sales s JOIN Product p ON s.product_id = p.product_id WHERE p.product_name = 'S8'\nAND buyer_id NOT IN (\n  SELECT buyer_id FROM Sales s JOIN Product p ON s.product_id = p.product_id WHERE p.product_name = 'iPhone'\n);",
          "explanation": "Set difference using NOT IN subquery."
        }
      ]
    },
    {
      "id": 1084,
      "title": "Sales Analysis III",
      "difficulty": "Easy",
      "acceptance": "44.9%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to report the products that were only sold in the first quarter of 2019. That is, between 2019-01-01 and 2019-03-31 inclusive.",
      "sampleInput": {
        "table": "Product / Sales",
        "columns": [
          "product_id",
          "product_name",
          "sale_date"
        ],
        "rows": [
          [
            1,
            "S8",
            "2019-01-21"
          ],
          [
            1,
            "S8",
            "2019-02-17"
          ],
          [
            2,
            "G4",
            "2019-02-17"
          ],
          [
            2,
            "G4",
            "2019-06-02"
          ],
          [
            3,
            "iPhone",
            "2019-05-13"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "product_id",
          "product_name"
        ],
        "rows": [
          [
            1,
            "S8"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1084: STRICT DATE BOUNDARY CONTAINMENT</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Sales Dates</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P1: Jan 21, Feb 17 (Q1 only ✓)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P2: Feb 17, Jun 02 (Crosses into Q2 ❌)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P3: May 13 (Q2 only ❌)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">MIN(sale_date) >= '2019-01-01'\\nAND MAX(sale_date) <= '2019-03-31'</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Strict Q1 Only</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">P1: S8</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "A product is sold 'only' in Q1 if its minimum sale date is >= 2019-01-01 AND its maximum sale date is <= 2019-03-31.",
        "Group Sales by product_id and enforce this min/max boundary in the HAVING clause.",
        "Join to Product to return product_id and product_name."
      ],
      "trapsAndEdgeCases": [
        "Partial Q1 sales: If a product was sold in Q1 and also in Q2 (like P2), it must be disqualified."
      ],
      "solutionSQL": "SELECT p.product_id, p.product_name\nFROM Product p\nJOIN Sales s ON p.product_id = s.product_id\nGROUP BY p.product_id, p.product_name\nHAVING MIN(s.sale_date) >= '2019-01-01'\n   AND MAX(s.sale_date) <= '2019-03-31';",
      "lineByLineExplanation": [
        {
          "clause": "SELECT p.product_id, p.product_name",
          "exp": "Projects product identifiers."
        },
        {
          "clause": "FROM Product p JOIN Sales s ON p.product_id = s.product_id",
          "exp": "Joins products with transactions."
        },
        {
          "clause": "GROUP BY p.product_id, p.product_name",
          "exp": "Aggregates dates per product."
        },
        {
          "clause": "HAVING MIN(s.sale_date) >= '2019-01-01' AND MAX(s.sale_date) <= '2019-03-31'",
          "exp": "Ensures all sales fall exclusively within Q1 2019."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "NOT IN Subquery",
          "complexity": "O(N log N)",
          "sql": "SELECT product_id, product_name FROM Product\nWHERE product_id IN (SELECT product_id FROM Sales WHERE sale_date BETWEEN '2019-01-01' AND '2019-03-31')\n  AND product_id NOT IN (SELECT product_id FROM Sales WHERE sale_date < '2019-01-01' OR sale_date > '2019-03-31');",
          "explanation": "Set exclusion checking for any sales outside the target window."
        }
      ]
    },
    {
      "id": 1098,
      "title": "Unpopular Books",
      "difficulty": "Medium",
      "acceptance": "44.7%",
      "interviewFreq": "High • Bloomberg, Amazon",
      "companies": [
        "Bloomberg",
        "Amazon"
      ],
      "prompt": "Write a solution to report the books that have sold less than 10 copies in the last year, excluding books that have been available for less than one month from today (assume today is 2019-06-23).",
      "sampleInput": {
        "table": "Books / Orders",
        "columns": [
          "book_id",
          "name",
          "available_from",
          "quantity",
          "dispatch_date"
        ],
        "rows": [
          [
            1,
            "Kalila And Demna",
            "2010-01-01",
            2,
            "2018-07-26"
          ],
          [
            2,
            "28 Letters",
            "2012-05-12",
            8,
            "2019-06-01"
          ],
          [
            3,
            "The Hobbit",
            "2019-06-10",
            0,
            null
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "book_id",
          "name"
        ],
        "rows": [
          [
            1,
            "Kalila And Demna"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1098: RECENT AVAILABILITY & LOW VOLUME FILTER</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Books & 1-Yr Sales</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">B1: Sold 2 in past yr (Unpopular ✓)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">B2: Sold 28 in past yr (Popular ❌)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">B3: Avail June 10 (< 1 mo ❌)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">available_from < '2019-05-23'\\nAND SUM(past_yr_qty) < 10</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Unpopular</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">book_id: 1</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Availability threshold: Exclude books available less than 1 month before 2019-06-23 -> available_from < '2019-05-23'.",
        "Sales window: Only count orders placed in the last year: dispatch_date BETWEEN '2018-06-23' AND '2019-06-23'.",
        "LEFT JOIN Books with the filtered orders and group by book_id.",
        "HAVING IFNULL(SUM(quantity), 0) < 10."
      ],
      "trapsAndEdgeCases": [
        "Join predicate placement: Date filtering for orders must be in the ON clause, NOT the WHERE clause, otherwise books with 0 sales are improperly filtered out."
      ],
      "solutionSQL": "SELECT b.book_id, b.name\nFROM Books b\nLEFT JOIN Orders o\n  ON b.book_id = o.book_id\n AND o.dispatch_date BETWEEN '2018-06-23' AND '2019-06-23'\nWHERE b.available_from < '2019-05-23'\nGROUP BY b.book_id, b.name\nHAVING IFNULL(SUM(o.quantity), 0) < 10;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT b.book_id, b.name",
          "exp": "Projects book details."
        },
        {
          "clause": "FROM Books b LEFT JOIN Orders o ON ... AND o.dispatch_date BETWEEN '2018-06-23' AND '2019-06-23'",
          "exp": "Preserves books with zero orders in the past year."
        },
        {
          "clause": "WHERE b.available_from < '2019-05-23'",
          "exp": "Filters out books launched less than a month ago."
        },
        {
          "clause": "GROUP BY b.book_id, b.name HAVING IFNULL(SUM(o.quantity), 0) < 10",
          "exp": "Filters for books with fewer than 10 copies sold."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Subquery Aggregation",
          "complexity": "O(N log N)",
          "sql": "SELECT book_id, name FROM Books\nWHERE available_from < '2019-05-23'\n  AND book_id NOT IN (\n    SELECT book_id FROM Orders\n    WHERE dispatch_date BETWEEN '2018-06-23' AND '2019-06-23'\n    GROUP BY book_id HAVING SUM(quantity) >= 10\n);",
          "explanation": "Subquery identifying books with >= 10 sales and excluding them."
        }
      ]
    },
    {
      "id": 1112,
      "title": "Highest Grade For Each Student",
      "difficulty": "Medium",
      "acceptance": "71.6%",
      "interviewFreq": "High • Coursera, Amazon",
      "companies": [
        "Coursera",
        "Amazon"
      ],
      "prompt": "Write a solution to find the highest grade with its corresponding course for each student. In case of a tie, you should find the course with the smallest course_id. Return the result table ordered by student_id in ascending order.",
      "sampleInput": {
        "table": "Enrollments",
        "columns": [
          "student_id",
          "course_id",
          "grade"
        ],
        "rows": [
          [
            2,
            2,
            95
          ],
          [
            2,
            3,
            95
          ],
          [
            1,
            1,
            90
          ],
          [
            1,
            2,
            99
          ],
          [
            3,
            1,
            80
          ],
          [
            3,
            2,
            75
          ],
          [
            3,
            3,
            82
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "student_id",
          "course_id",
          "grade"
        ],
        "rows": [
          [
            1,
            2,
            99
          ],
          [
            2,
            2,
            95
          ],
          [
            3,
            3,
            82
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1112: TIE-BREAKING ON LOWEST COURSE ID</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Enrollments</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">S2: C2 (95), C3 (95) (Tie)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">S1: C1 (90), C2 (99)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">S3: C3 (82)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">ROW_NUMBER() OVER(PARTITION BY student\\nORDER BY grade DESC, course_id ASC)</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Selected</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">S1: C2 (99)</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">S2: C2 (95) (Lower course_id)</text><text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">S3: C3 (82)</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Partition by student_id.",
        "Order by grade DESC to find the highest score.",
        "Order by course_id ASC to break ties by lowest course number.",
        "Assign ROW_NUMBER() and filter WHERE rnk = 1."
      ],
      "trapsAndEdgeCases": [
        "DENSE_RANK() trap: Using DENSE_RANK() returns both courses in a tie; ROW_NUMBER() is required to strictly pick one course."
      ],
      "solutionSQL": "WITH RankedCourses AS (\n    SELECT student_id,\n           course_id,\n           grade,\n           ROW_NUMBER() OVER (\n               PARTITION BY student_id\n               ORDER BY grade DESC, course_id ASC\n           ) AS rnk\n    FROM Enrollments\n)\nSELECT student_id, course_id, grade\nFROM RankedCourses\nWHERE rnk = 1\nORDER BY student_id ASC;",
      "lineByLineExplanation": [
        {
          "clause": "WITH RankedCourses AS (...)",
          "exp": "Ranks courses per student by grade desc, course_id asc."
        },
        {
          "clause": "SELECT student_id, course_id, grade FROM RankedCourses WHERE rnk = 1",
          "exp": "Picks top course per student."
        },
        {
          "clause": "ORDER BY student_id ASC",
          "exp": "Sorts final output by student ID."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Tuple IN Subquery",
          "complexity": "O(N^2)",
          "sql": "SELECT student_id, MIN(course_id) AS course_id, grade\nFROM Enrollments\nWHERE (student_id, grade) IN (\n    SELECT student_id, MAX(grade) FROM Enrollments GROUP BY student_id\n)\nGROUP BY student_id, grade\nORDER BY student_id ASC;",
          "explanation": "Finds max grade per student and aggregates with MIN(course_id)."
        }
      ]
    },
    {
      "id": 1126,
      "title": "Active Businesses",
      "difficulty": "Medium",
      "acceptance": "68.2%",
      "interviewFreq": "High • Yelp, Google",
      "companies": [
        "Yelp",
        "Google"
      ],
      "prompt": "An active business is a business that has more than one event_type with occurrences greater than the average occurrences of that event_type among all businesses.\nWrite a solution to find all active businesses.",
      "sampleInput": {
        "table": "Events",
        "columns": [
          "business_id",
          "event_type",
          "occurences"
        ],
        "rows": [
          [
            1,
            "reviews",
            7
          ],
          [
            3,
            "reviews",
            3
          ],
          [
            1,
            "ads",
            11
          ],
          [
            2,
            "ads",
            7
          ],
          [
            3,
            "ads",
            6
          ],
          [
            1,
            "photo",
            3
          ],
          [
            2,
            "photo",
            1
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "business_id"
        ],
        "rows": [
          [
            1
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1126: MULTI-EVENT ABOVE-AVERAGE BENCHMARK</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Events</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">B1: reviews=7 (> avg 5)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">B1: ads=11 (> avg 8)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">B1 has 2 above-average events</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">AVG(occurences) OVER(PARTITION BY type)\\nHAVING COUNT(*) > 1</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Active Business</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">business_id: 1</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Calculate the average occurrences for each event_type across all businesses using AVG(occurences) OVER (PARTITION BY event_type).",
        "Filter for rows where occurrences > event_type average.",
        "Group by business_id and filter HAVING COUNT(*) > 1."
      ],
      "trapsAndEdgeCases": [
        "Strict inequality: Must be strictly greater than average (occurences > avg_occurences)."
      ],
      "solutionSQL": "WITH EventAverages AS (\n    SELECT business_id,\n           event_type,\n           occurences,\n           AVG(occurences) OVER (PARTITION BY event_type) AS avg_occ\n    FROM Events\n)\nSELECT business_id\nFROM EventAverages\nWHERE occurences > avg_occ\nGROUP BY business_id\nHAVING COUNT(*) > 1;",
      "lineByLineExplanation": [
        {
          "clause": "WITH EventAverages AS (...)",
          "exp": "Computes event category averages via window function."
        },
        {
          "clause": "SELECT business_id FROM EventAverages",
          "exp": "Source filtered events."
        },
        {
          "clause": "WHERE occurences > avg_occ",
          "exp": "Retains only above-average event records."
        },
        {
          "clause": "GROUP BY business_id HAVING COUNT(*) > 1",
          "exp": "Demands at least two distinct qualifying events."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "JOIN with Grouped Aggregation",
          "complexity": "O(N log N)",
          "sql": "SELECT e.business_id\nFROM Events e\nJOIN (\n    SELECT event_type, AVG(occurences) AS avg_occ\n    FROM Events\n    GROUP BY event_type\n) avg_t ON e.event_type = avg_t.event_type\nWHERE e.occurences > avg_t.avg_occ\nGROUP BY e.business_id\nHAVING COUNT(*) > 1;",
          "explanation": "Joins against subquery of category averages."
        }
      ]
    },
    {
      "id": 1127,
      "title": "User Purchase Platform",
      "difficulty": "Hard",
      "acceptance": "43.5%",
      "interviewFreq": "Very High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to find the total number of users and the total amount spent using mobile only, desktop only, and both mobile and desktop together for each date.",
      "sampleInput": {
        "table": "Spending",
        "columns": [
          "user_id",
          "spend_date",
          "platform",
          "amount"
        ],
        "rows": [
          [
            1,
            "2019-07-01",
            "mobile",
            100
          ],
          [
            1,
            "2019-07-01",
            "desktop",
            100
          ],
          [
            2,
            "2019-07-01",
            "mobile",
            100
          ],
          [
            2,
            "2019-07-02",
            "mobile",
            100
          ],
          [
            3,
            "2019-07-01",
            "desktop",
            100
          ],
          [
            3,
            "2019-07-02",
            "desktop",
            100
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "spend_date",
          "platform",
          "total_amount",
          "total_users"
        ],
        "rows": [
          [
            "2019-07-01",
            "desktop",
            100,
            1
          ],
          [
            "2019-07-01",
            "mobile",
            100,
            1
          ],
          [
            "2019-07-01",
            "both",
            200,
            1
          ],
          [
            "2019-07-02",
            "desktop",
            100,
            1
          ],
          [
            "2019-07-02",
            "mobile",
            100,
            1
          ],
          [
            "2019-07-02",
            "both",
            0,
            0
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1127: CROSS JOIN PLATFORM GRID WITH ZERO-FILL</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">User Daily Activity</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">U1: Mobile & Desktop -> 'both'</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">U2: Mobile only -> 'mobile'</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">U3: Desktop only -> 'desktop'</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">CROSS JOIN (desktop, mobile, both)\\nLEFT JOIN UserPlatformActivity</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">All Platforms</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">desktop: $100 (1 user)</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">mobile: $100 (1 user)</text><text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">both: $200 (1 user)</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Determine each user's platform per date: if COUNT(DISTINCT platform) = 2 THEN 'both' ELSE MAX(platform).",
        "Generate the full cartesian template grid: all distinct spend_date CROSS JOIN ('desktop', 'mobile', 'both').",
        "LEFT JOIN the template grid with the aggregated user activity.",
        "Aggregate with SUM(amount) and COUNT(user_id), coalescing nulls to 0."
      ],
      "trapsAndEdgeCases": [
        "Zero-spending platform categories: A date might have 0 'both' users; it must still emit a row with total_amount = 0 and total_users = 0."
      ],
      "solutionSQL": "WITH UserPlatform AS (\n    SELECT spend_date,\n           user_id,\n           CASE WHEN COUNT(DISTINCT platform) = 2 THEN 'both' ELSE MAX(platform) END AS platform,\n           SUM(amount) AS amount\n    FROM Spending\n    GROUP BY spend_date, user_id\n),\nDatePlatformGrid AS (\n    SELECT DISTINCT spend_date, 'desktop' AS platform FROM Spending\n    UNION\n    SELECT DISTINCT spend_date, 'mobile' AS platform FROM Spending\n    UNION\n    SELECT DISTINCT spend_date, 'both' AS platform FROM Spending\n)\nSELECT g.spend_date,\n       g.platform,\n       IFNULL(SUM(u.amount), 0) AS total_amount,\n       COUNT(u.user_id) AS total_users\nFROM DatePlatformGrid g\nLEFT JOIN UserPlatform u\n  ON g.spend_date = u.spend_date\n AND g.platform = u.platform\nGROUP BY g.spend_date, g.platform;",
      "lineByLineExplanation": [
        {
          "clause": "WITH UserPlatform AS (...)",
          "exp": "Classifies each user on each date as 'mobile', 'desktop', or 'both'."
        },
        {
          "clause": "DatePlatformGrid AS (...)",
          "exp": "Creates full Cartesian template of all 3 platforms for every distinct date."
        },
        {
          "clause": "SELECT g.spend_date, g.platform, IFNULL(SUM(u.amount), 0) AS total_amount, COUNT(u.user_id) AS total_users",
          "exp": "Left joins and folds null totals into clean zero-counts."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Explicit CROSS JOIN",
          "complexity": "O(D * 3)",
          "sql": "WITH Platforms AS (SELECT 'desktop' AS platform UNION SELECT 'mobile' UNION SELECT 'both'),\nDates AS (SELECT DISTINCT spend_date FROM Spending),\nGrid AS (SELECT d.spend_date, p.platform FROM Dates d CROSS JOIN Platforms p)\nSELECT ... FROM Grid g LEFT JOIN ...;",
          "explanation": "Modular cross join separation between distinct dates and platform list."
        }
      ]
    },
    {
      "id": 1132,
      "title": "Reported Posts II",
      "difficulty": "Medium",
      "acceptance": "39.6%",
      "interviewFreq": "High • Meta",
      "companies": [
        "Meta"
      ],
      "prompt": "Write a solution to find the average daily percentage of posts that got removed after being reported as spam, rounded to 2 decimal places.",
      "sampleInput": {
        "table": "Actions / Removals",
        "columns": [
          "post_id",
          "action_date",
          "action",
          "extra",
          "remove_date"
        ],
        "rows": [
          [
            1,
            "2019-07-01",
            "report",
            "spam",
            "2019-07-01"
          ],
          [
            2,
            "2019-07-01",
            "report",
            "spam",
            null
          ],
          [
            3,
            "2019-07-01",
            "report",
            "spam",
            null
          ],
          [
            4,
            "2019-07-02",
            "report",
            "spam",
            "2019-07-03"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "average_daily_percent"
        ],
        "rows": [
          [
            75
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1132: DAILY AVERAGE SPAM REMOVAL PERCENTAGE</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Daily Spam Reports</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">July 01: 1 removed / 3 reported = 33.33%</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">July 02: 1 removed / 1 reported = 100.00%</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">AVG(daily_removed / daily_spam) * 100</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Average Rate</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">average_daily_percent: 66.67%</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Filter Actions for action = 'report' AND extra = 'spam'.",
        "For each action_date, count distinct post_ids reported as spam, and distinct post_ids present in Removals.",
        "Calculate daily_percent = (distinct removed / distinct reported) * 100.",
        "Compute AVG(daily_percent) across all qualifying dates and round to 2 decimal places."
      ],
      "trapsAndEdgeCases": [
        "Duplicate report actions: Users may report the same post multiple times on the same date; COUNT(DISTINCT post_id) is mandatory."
      ],
      "solutionSQL": "WITH DailySpam AS (\n    SELECT a.action_date,\n           COUNT(DISTINCT r.post_id) / COUNT(DISTINCT a.post_id) * 100.0 AS daily_percent\n    FROM Actions a\n    LEFT JOIN Removals r ON a.post_id = r.post_id\n    WHERE a.action = 'report' AND a.extra = 'spam'\n    GROUP BY a.action_date\n)\nSELECT ROUND(AVG(daily_percent), 2) AS average_daily_percent\nFROM DailySpam;",
      "lineByLineExplanation": [
        {
          "clause": "WITH DailySpam AS (SELECT a.action_date, COUNT(DISTINCT r.post_id) / COUNT(DISTINCT a.post_id) * 100.0 AS daily_percent ...)",
          "exp": "Calculates the distinct spam removal ratio per date."
        },
        {
          "clause": "SELECT ROUND(AVG(daily_percent), 2) AS average_daily_percent",
          "exp": "Averages daily percentages and rounds to 2 decimals."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Derived Table Inline Average",
          "complexity": "O(N log N)",
          "sql": "SELECT ROUND(AVG(daily_ratio) * 100, 2) AS average_daily_percent\nFROM (\n  SELECT action_date, COUNT(DISTINCT r.post_id) / COUNT(DISTINCT a.post_id) AS daily_ratio\n  FROM Actions a LEFT JOIN Removals r ON a.post_id = r.post_id\n  WHERE a.action = 'report' AND a.extra = 'spam' GROUP BY a.action_date\n) t;",
          "explanation": "Equivalent derived table formatting percentage at outer aggregation."
        }
      ]
    },
    {
      "id": 1158,
      "title": "Market Analysis I",
      "difficulty": "Medium",
      "acceptance": "58.4%",
      "interviewFreq": "Very High • Etsy, Amazon",
      "companies": [
        "Etsy",
        "Amazon"
      ],
      "prompt": "Write a solution to find for each user, the join date and the number of orders they made as a buyer in 2019. Return the result table in any order.",
      "sampleInput": {
        "table": "Users / Orders",
        "columns": [
          "user_id",
          "join_date",
          "order_id",
          "order_date",
          "buyer_id"
        ],
        "rows": [
          [
            1,
            "2018-01-01",
            1,
            "2019-08-01",
            1
          ],
          [
            2,
            "2018-02-09",
            2,
            "2018-08-02",
            2
          ],
          [
            3,
            "2018-01-19",
            null,
            null,
            null
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "buyer_id",
          "join_date",
          "orders_in_2019"
        ],
        "rows": [
          [
            1,
            "2018-01-01",
            1
          ],
          [
            2,
            "2018-02-09",
            0
          ],
          [
            3,
            "2018-01-19",
            0
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1158: 2019 ORDER VOLUME WITH ZERO-COUNT PRESERVATION</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Users & Orders</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">U1: 1 order in 2019</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">U2: 1 order in 2018 (Not 2019)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">U3: 0 orders total</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">LEFT JOIN Orders ON buyer_id = user_id\\nAND YEAR(order_date) = 2019</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Result</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">U1: orders_in_2019 = 1</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">U2: orders_in_2019 = 0</text><text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">U3: orders_in_2019 = 0</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Every user from Users must appear in the output, even if they have 0 orders in 2019.",
        "LEFT JOIN Users with Orders.",
        "Crucial predicate placement: YEAR(order_date) = 2019 must be in the ON clause! If placed in WHERE, it converts the LEFT JOIN into an INNER JOIN, dropping users with 0 orders.",
        "Aggregate using COUNT(o.order_id)."
      ],
      "trapsAndEdgeCases": [
        "WHERE clause filtering trap: Filtering order date in WHERE drops users who joined in 2018 or have zero 2019 orders."
      ],
      "solutionSQL": "SELECT u.user_id AS buyer_id,\n       u.join_date,\n       COUNT(o.order_id) AS orders_in_2019\nFROM Users u\nLEFT JOIN Orders o\n  ON u.user_id = o.buyer_id\n AND YEAR(o.order_date) = 2019\nGROUP BY u.user_id, u.join_date;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT u.user_id AS buyer_id, u.join_date,",
          "exp": "Emits user ID and registration timestamp."
        },
        {
          "clause": "COUNT(o.order_id) AS orders_in_2019",
          "exp": "Counts non-null 2019 orders."
        },
        {
          "clause": "FROM Users u LEFT JOIN Orders o ON u.user_id = o.buyer_id AND YEAR(o.order_date) = 2019",
          "exp": "Left joins with date filter in ON clause to preserve 0-order users."
        },
        {
          "clause": "GROUP BY u.user_id, u.join_date",
          "exp": "Groups per user."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Subquery Pre-Aggregation",
          "complexity": "O(N log N)",
          "sql": "SELECT u.user_id AS buyer_id, u.join_date, IFNULL(o.cnt, 0) AS orders_in_2019\nFROM Users u\nLEFT JOIN (\n  SELECT buyer_id, COUNT(*) AS cnt FROM Orders WHERE YEAR(order_date) = 2019 GROUP BY buyer_id\n) o ON u.user_id = o.buyer_id;",
          "explanation": "Pre-aggregates 2019 orders before joining."
        }
      ]
    },
    {
      "id": 1159,
      "title": "Market Analysis II",
      "difficulty": "Hard",
      "acceptance": "52.8%",
      "interviewFreq": "Very High • Etsy, Amazon",
      "companies": [
        "Etsy",
        "Amazon"
      ],
      "prompt": "Write a solution to find for each user whether the brand of the second item (by date) they sold is their favorite brand. If a user sold less than two items, report 'no' for that user.",
      "sampleInput": {
        "table": "Users / Orders / Items",
        "columns": [
          "user_id",
          "favorite_brand",
          "order_date",
          "item_id",
          "seller_id",
          "item_brand"
        ],
        "rows": [
          [
            1,
            "Lenovo",
            "2019-08-01",
            4,
            1,
            "Lenovo"
          ],
          [
            1,
            "Lenovo",
            "2019-08-02",
            2,
            1,
            "Lenovo"
          ],
          [
            2,
            "Samsung",
            "2019-08-02",
            2,
            2,
            "Lenovo"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "seller_id",
          "2nd_item_fav_brand"
        ],
        "rows": [
          [
            1,
            "yes"
          ],
          [
            2,
            "no"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1159: SECOND ORDER FAVORITE BRAND VERIFICATION</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Seller Activity</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">U1: 2nd item brand = 'Lenovo' (Fav = Lenovo ✓)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">U2: 2nd item brand = 'Lenovo' (Fav = Samsung ❌)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">ROW_NUMBER() OVER(PARTITION BY seller\\nORDER BY date) = 2</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Verification</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">U1: 'yes'</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">U2: 'no'</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Use ROW_NUMBER() partitioned by seller_id ordered by order_date ASC to index sales chronologically.",
        "Filter for rnk = 2 to isolate each seller's second sale.",
        "Join the second order with Items to determine item_brand.",
        "LEFT JOIN Users with this second order table, checking IF(u.favorite_brand = item_brand, 'yes', 'no')."
      ],
      "trapsAndEdgeCases": [
        "Sellers with 0 or 1 sale: Must still be returned in output with 'no'."
      ],
      "solutionSQL": "WITH RankedOrders AS (\n    SELECT o.seller_id,\n           o.item_id,\n           ROW_NUMBER() OVER (\n               PARTITION BY o.seller_id\n               ORDER BY o.order_date ASC\n           ) AS rnk\n    FROM Orders o\n),\nSecondOrders AS (\n    SELECT r.seller_id,\n           i.item_brand\n    FROM RankedOrders r\n    JOIN Items i ON r.item_id = i.item_id\n    WHERE r.rnk = 2\n)\nSELECT u.user_id AS seller_id,\n       CASE\n           WHEN s.item_brand = u.favorite_brand THEN 'yes'\n           ELSE 'no'\n       END AS 2nd_item_fav_brand\nFROM Users u\nLEFT JOIN SecondOrders s ON u.user_id = s.seller_id;",
      "lineByLineExplanation": [
        {
          "clause": "WITH RankedOrders AS (SELECT o.seller_id, o.item_id, ROW_NUMBER() OVER (...) AS rnk FROM Orders o)",
          "exp": "Ranks sales per seller by date."
        },
        {
          "clause": "SecondOrders AS (SELECT r.seller_id, i.item_brand FROM RankedOrders r JOIN Items i ... WHERE r.rnk = 2)",
          "exp": "Extracts brand of the exact second sale."
        },
        {
          "clause": "SELECT u.user_id AS seller_id, CASE WHEN s.item_brand = u.favorite_brand THEN 'yes' ELSE 'no' END AS 2nd_item_fav_brand",
          "exp": "Left joins with all users and tests favorite brand match."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Correlated Subquery",
          "complexity": "O(N log N)",
          "sql": "SELECT u.user_id AS seller_id,\n       IFNULL((\n           SELECT IF(i.item_brand = u.favorite_brand, 'yes', 'no')\n           FROM Orders o JOIN Items i ON o.item_id = i.item_id\n           WHERE o.seller_id = u.user_id ORDER BY o.order_date LIMIT 1 OFFSET 1\n       ), 'no') AS 2nd_item_fav_brand\nFROM Users u;",
          "explanation": "Correlated scalar subquery with LIMIT 1 OFFSET 1."
        }
      ]
    },
    {
      "id": 1212,
      "title": "Team Scores in Football Tournament",
      "difficulty": "Medium",
      "acceptance": "54.1%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to select the team_id, team_name and num_points of each team in the tournament after considering all matches.\nScoring rules:\n- Win: 3 points\n- Draw: 1 point\n- Loss: 0 points\nOrder by num_points DESC, team_name ASC.",
      "sampleInput": {
        "table": "Teams / Matches",
        "columns": [
          "team_id",
          "team_name",
          "host_team",
          "guest_team",
          "host_goals",
          "guest_goals"
        ],
        "rows": [
          [
            10,
            "FCB",
            10,
            20,
            3,
            0
          ],
          [
            20,
            "MU",
            20,
            30,
            2,
            2
          ],
          [
            30,
            "Arsenal",
            30,
            40,
            1,
            2
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "team_id",
          "team_name",
          "num_points"
        ],
        "rows": [
          [
            10,
            "FCB",
            3
          ],
          [
            20,
            "MU",
            1
          ],
          [
            30,
            "Arsenal",
            1
          ],
          [
            40,
            "Chelsea",
            0
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1212: DUAL HOME/AWAY MATCH POINT AGGREGATION</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Matches</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">10 vs 20: (3 - 0) -> 10 gets 3 pts</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">20 vs 30: (2 - 2) -> Both get 1 pt</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">CASE WHEN goals > opp THEN 3\\nWHEN goals = opp THEN 1 ELSE 0</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Tournament Table</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">10: FCB -> 3 pts</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">20: MU -> 1 pt</text><text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">40: Chelsea -> 0 pts</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "A team earns points as host (host_goals vs guest_goals) or as guest (guest_goals vs host_goals).",
        "Unfold matches using UNION ALL to compute points per team.",
        "LEFT JOIN Teams with these points so teams with 0 matches or 0 points are preserved.",
        "Order by num_points DESC, team_name ASC."
      ],
      "trapsAndEdgeCases": [
        "Zero points teams: Teams that never played or lost all matches must show 0 points, not NULL."
      ],
      "solutionSQL": "WITH MatchPoints AS (\n    SELECT host_team AS team_id,\n           CASE WHEN host_goals > guest_goals THEN 3 WHEN host_goals = guest_goals THEN 1 ELSE 0 END AS points\n    FROM Matches\n    UNION ALL\n    SELECT guest_team AS team_id,\n           CASE WHEN guest_goals > host_goals THEN 3 WHEN guest_goals = host_goals THEN 1 ELSE 0 END AS points\n    FROM Matches\n)\nSELECT t.team_id,\n       t.team_name,\n       IFNULL(SUM(p.points), 0) AS num_points\nFROM Teams t\nLEFT JOIN MatchPoints p ON t.team_id = p.team_id\nGROUP BY t.team_id, t.team_name\nORDER BY num_points DESC, t.team_name ASC;",
      "lineByLineExplanation": [
        {
          "clause": "WITH MatchPoints AS (...)",
          "exp": "Evaluates points earned from both host and guest perspectives."
        },
        {
          "clause": "SELECT t.team_id, t.team_name, IFNULL(SUM(p.points), 0) AS num_points",
          "exp": "Left joins with all teams and sums points, defaulting nulls to 0."
        },
        {
          "clause": "ORDER BY num_points DESC, t.team_name ASC",
          "exp": "Sorts by points descending, breaking ties alphabetically."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Direct Multi-Condition JOIN",
          "complexity": "O(T * M)",
          "sql": "SELECT t.team_id, t.team_name,\n       SUM(CASE WHEN t.team_id = m.host_team AND m.host_goals > m.guest_goals THEN 3\n                WHEN t.team_id = m.guest_team AND m.guest_goals > m.host_goals THEN 3\n                WHEN (t.team_id = m.host_team OR t.team_id = m.guest_team) AND m.host_goals = m.guest_goals THEN 1\n                ELSE 0 END) AS num_points\nFROM Teams t LEFT JOIN Matches m ON t.team_id = m.host_team OR t.team_id = m.guest_team\nGROUP BY t.team_id, t.team_name ORDER BY num_points DESC, team_name ASC;",
          "explanation": "Conditional join matching either host or guest."
        }
      ]
    },
    {
      "id": 1225,
      "title": "Report Contiguous Dates",
      "difficulty": "Hard",
      "acceptance": "60.4%",
      "interviewFreq": "Very High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "A system is running one task everyday. Every task is either 'failed' or 'succeeded'. Write a solution to generate a report of all intervals of contiguous dates with the same task state between 2019-01-01 and 2019-12-31. Order by start_date.",
      "sampleInput": {
        "table": "Failed / Succeeded",
        "columns": [
          "fail_date",
          "success_date"
        ],
        "rows": [
          [
            "2018-12-28",
            "2018-12-30"
          ],
          [
            "2019-01-04",
            "2019-01-01"
          ],
          [
            "2019-01-05",
            "2019-01-02"
          ],
          [
            null,
            "2019-01-03"
          ],
          [
            null,
            "2019-01-06"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "period_state",
          "start_date",
          "end_date"
        ],
        "rows": [
          [
            "succeeded",
            "2019-01-01",
            "2019-01-03"
          ],
          [
            "failed",
            "2019-01-04",
            "2019-01-05"
          ],
          [
            "succeeded",
            "2019-01-06",
            "2019-01-06"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1225: CONTIGUOUS ISLANDS-AND-GAPS TIME RANGES</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Unified Events (2019)</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Jan 1-3: succeeded (3 days)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Jan 4-5: failed (2 days)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Jan 6: succeeded (1 day)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">date - ROW_NUMBER() DAY\\nGROUP BY state, anchor_date</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Periods</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">succeeded: Jan 1 to Jan 3</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">failed: Jan 4 to Jan 5</text><text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">succeeded: Jan 6 to Jan 6</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Combine Failed and Succeeded events into a single table with state and event_date, filtering for 2019.",
        "Assign ROW_NUMBER() ordered by event_date partitioned by state.",
        "Compute anchor_date = DATE_SUB(event_date, INTERVAL rnk DAY). Consecutive streaks have identical anchor dates!",
        "Group by state and anchor_date, calculating MIN(event_date) as start_date and MAX(event_date) as end_date."
      ],
      "trapsAndEdgeCases": [
        "2019 boundary filter: Events outside 2019 must be eliminated prior to ranking, or they alter row numbers."
      ],
      "solutionSQL": "WITH AllTasks AS (\n    SELECT 'failed' AS period_state, fail_date AS task_date\n    FROM Failed\n    WHERE fail_date BETWEEN '2019-01-01' AND '2019-12-31'\n    UNION ALL\n    SELECT 'succeeded' AS period_state, success_date AS task_date\n    FROM Succeeded\n    WHERE success_date BETWEEN '2019-01-01' AND '2019-12-31'\n),\nRankedTasks AS (\n    SELECT period_state,\n           task_date,\n           DATE_SUB(task_date, INTERVAL ROW_NUMBER() OVER (\n               PARTITION BY period_state\n               ORDER BY task_date\n           ) DAY) AS grp\n    FROM AllTasks\n)\nSELECT period_state,\n       MIN(task_date) AS start_date,\n       MAX(task_date) AS end_date\nFROM RankedTasks\nGROUP BY period_state, grp\nORDER BY start_date ASC;",
      "lineByLineExplanation": [
        {
          "clause": "WITH AllTasks AS (...)",
          "exp": "Merges tasks within 2019."
        },
        {
          "clause": "RankedTasks AS (SELECT ..., DATE_SUB(task_date, INTERVAL ROW_NUMBER() OVER (...) DAY) AS grp)",
          "exp": "Establishes constant island anchor dates."
        },
        {
          "clause": "SELECT period_state, MIN(task_date) AS start_date, MAX(task_date) AS end_date GROUP BY period_state, grp",
          "exp": "Folds contiguous dates into start and end bounds."
        },
        {
          "clause": "ORDER BY start_date ASC",
          "exp": "Sorts intervals chronologically."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "LAG() State Change Detection",
          "complexity": "O(N log N)",
          "sql": "WITH Ranked AS (\n  SELECT period_state, task_date,\n         IF(LAG(period_state) OVER (ORDER BY task_date) = period_state, 0, 1) AS flag\n  FROM AllTasks\n), Groups AS (\n  SELECT period_state, task_date, SUM(flag) OVER (ORDER BY task_date) AS grp FROM Ranked\n)\nSELECT period_state, MIN(task_date) AS start_date, MAX(task_date) AS end_date FROM Groups GROUP BY period_state, grp ORDER BY start_date;",
          "explanation": "Detects state transitions using LAG() and accumulates a running group identifier."
        }
      ]
    },
    {
      "id": 1270,
      "title": "All People Report to the Given Manager",
      "difficulty": "Medium",
      "acceptance": "85.2%",
      "interviewFreq": "High • Google, Amazon",
      "companies": [
        "Google",
        "Amazon"
      ],
      "prompt": "Write a solution to find employee_id of all employees that directly or indirectly report their work to the head of the company (manager_id = 1). The indirect relation is at most 3 managers. Exclude the head of the company itself (employee_id = 1).",
      "sampleInput": {
        "table": "Employees",
        "columns": [
          "employee_id",
          "employee_name",
          "manager_id"
        ],
        "rows": [
          [
            1,
            "Boss",
            1
          ],
          [
            3,
            "Alice",
            3
          ],
          [
            2,
            "Bob",
            1
          ],
          [
            4,
            "Daniel",
            2
          ],
          [
            7,
            "Luis",
            4
          ],
          [
            8,
            "Jhon",
            3
          ],
          [
            9,
            "Angela",
            8
          ],
          [
            77,
            "Robert",
            1
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "employee_id"
        ],
        "rows": [
          [
            2
          ],
          [
            77
          ],
          [
            4
          ],
          [
            7
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1270: 3-LEVEL REPORTING HIERARCHY TREE</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Organization</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Boss (1) <- 2, 77 (Level 1)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">2 <- 4 (Level 2)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">4 <- 7 (Level 3)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">e1 -> e2 -> e3\\nWHERE e3.manager_id = 1</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Subordinates</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">2, 77, 4, 7</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Join Employees 3 times (e1 -> e2 -> e3) to trace up to 3 reporting levels.",
        "e1 reports to e2 (e1.manager_id = e2.employee_id).",
        "e2 reports to e3 (e2.manager_id = e3.employee_id).",
        "Filter for e3.manager_id = 1 AND e1.employee_id != 1."
      ],
      "trapsAndEdgeCases": [
        "Excluding the CEO: employee_id = 1 reports to themselves (manager_id = 1) and must be excluded."
      ],
      "solutionSQL": "SELECT e1.employee_id\nFROM Employees e1\nJOIN Employees e2 ON e1.manager_id = e2.employee_id\nJOIN Employees e3 ON e2.manager_id = e3.employee_id\nWHERE e3.manager_id = 1\n  AND e1.employee_id != 1;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT e1.employee_id",
          "exp": "Emits qualifying subordinate employee IDs."
        },
        {
          "clause": "FROM Employees e1 JOIN Employees e2 ON e1.manager_id = e2.employee_id",
          "exp": "First hop to immediate manager."
        },
        {
          "clause": "JOIN Employees e3 ON e2.manager_id = e3.employee_id",
          "exp": "Second hop to manager's manager."
        },
        {
          "clause": "WHERE e3.manager_id = 1 AND e1.employee_id != 1",
          "exp": "Ensures top level is the CEO (1) while omitting CEO."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Recursive CTE",
          "complexity": "O(V + E)",
          "sql": "WITH RECURSIVE Hierarchy AS (\n    SELECT employee_id FROM Employees WHERE manager_id = 1 AND employee_id != 1\n    UNION ALL\n    SELECT e.employee_id FROM Employees e JOIN Hierarchy h ON e.manager_id = h.employee_id\n)\nSELECT employee_id FROM Hierarchy;",
          "explanation": "Unbounded graph recursion downward from Manager 1."
        }
      ]
    },
    {
      "id": 1303,
      "title": "Find the Team Size",
      "difficulty": "Easy",
      "acceptance": "89.3%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to find the team size of each of the employees. Return the result table in any order.",
      "sampleInput": {
        "table": "Employee",
        "columns": [
          "employee_id",
          "team_id"
        ],
        "rows": [
          [
            1,
            8
          ],
          [
            2,
            8
          ],
          [
            3,
            8
          ],
          [
            4,
            7
          ],
          [
            5,
            9
          ],
          [
            6,
            9
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "employee_id",
          "team_size"
        ],
        "rows": [
          [
            1,
            3
          ],
          [
            2,
            3
          ],
          [
            3,
            3
          ],
          [
            4,
            1
          ],
          [
            5,
            2
          ],
          [
            6,
            2
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1303: WINDOW PARTITION TEAM HEADCOUNT</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Employees</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Emp 1, Team 8</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Emp 2, Team 8</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Emp 3, Team 8</text><text x=\"14\" y=\"96\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Emp 4, Team 7</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">COUNT(*) OVER (PARTITION BY team_id)</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Team Size</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Emp 1 -> Size 3</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Emp 4 -> Size 1</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Use window function COUNT(*) OVER (PARTITION BY team_id).",
        "This appends the team count directly to each individual employee row without row collapsing."
      ],
      "trapsAndEdgeCases": [
        "Group By row collapsing: Grouping by employee_id, team_id yields 1 for each; must partition over team_id alone."
      ],
      "solutionSQL": "SELECT employee_id,\n       COUNT(*) OVER (PARTITION BY team_id) AS team_size\nFROM Employee;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT employee_id,",
          "exp": "Emits employee identifier."
        },
        {
          "clause": "COUNT(*) OVER (PARTITION BY team_id) AS team_size",
          "exp": "Computes headcount across employee's department partition."
        },
        {
          "clause": "FROM Employee",
          "exp": "Source employees table."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "JOIN with GROUP BY Subquery",
          "complexity": "O(N log N)",
          "sql": "SELECT e.employee_id, t.team_size\nFROM Employee e\nJOIN (\n    SELECT team_id, COUNT(*) AS team_size FROM Employee GROUP BY team_id\n) t ON e.team_id = t.team_id;",
          "explanation": "Subquery pre-computing team sizes and joining back."
        }
      ]
    },
    {
      "id": 1308,
      "title": "Running Total for Different Genders",
      "difficulty": "Medium",
      "acceptance": "86.1%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to find the total score for each gender on each day. Return the result table ordered by gender and day in ascending order.",
      "sampleInput": {
        "table": "Scores",
        "columns": [
          "player_name",
          "gender",
          "day",
          "score_points"
        ],
        "rows": [
          [
            "Aron",
            "F",
            "2020-01-01",
            17
          ],
          [
            "Alice",
            "F",
            "2020-01-07",
            23
          ],
          [
            "Bajrang",
            "M",
            "2020-01-07",
            7
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "gender",
          "day",
          "total"
        ],
        "rows": [
          [
            "F",
            "2020-01-01",
            17
          ],
          [
            "F",
            "2020-01-07",
            40
          ],
          [
            "M",
            "2020-01-07",
            7
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1308: CHRONOLOGICAL ACCUMULATOR BY GENDER</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Scores</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">F (01-01): 17 pts</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">F (01-07): 23 pts</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">M (01-07): 7 pts</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">SUM(score) OVER(PARTITION BY gender\\nORDER BY day)</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Running Total</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">F (01-01): 17</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">F (01-07): 40 (17+23)</text><text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">M (01-07): 7</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Use window aggregation SUM(score_points) partitioned by gender and ordered by day.",
        "The window frame continuously accumulates scores up to the current day for that gender.",
        "Order final output by gender ASC, day ASC."
      ],
      "trapsAndEdgeCases": [
        "Multiple games per day: Problem guarantees (gender, day) is unique."
      ],
      "solutionSQL": "SELECT gender,\n       day,\n       SUM(score_points) OVER (\n           PARTITION BY gender\n           ORDER BY day ASC\n       ) AS total\nFROM Scores\nORDER BY gender ASC, day ASC;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT gender, day,",
          "exp": "Emits gender partition and date."
        },
        {
          "clause": "SUM(score_points) OVER (PARTITION BY gender ORDER BY day ASC) AS total",
          "exp": "Calculates cumulative score points chronologically per gender."
        },
        {
          "clause": "FROM Scores ORDER BY gender ASC, day ASC",
          "exp": "Sorts final output."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Self-Join Cumulative Accumulator",
          "complexity": "O(N^2)",
          "sql": "SELECT s1.gender, s1.day, SUM(s2.score_points) AS total\nFROM Scores s1\nJOIN Scores s2 ON s1.gender = s2.gender AND s2.day <= s1.day\nGROUP BY s1.gender, s1.day\nORDER BY s1.gender, s1.day;",
          "explanation": "Self-join accumulating all preceding rows."
        }
      ]
    },
    {
      "id": 1336,
      "title": "Number of Transactions per Visit",
      "difficulty": "Hard",
      "acceptance": "44.2%",
      "interviewFreq": "Very High • Twitter, Amazon",
      "companies": [
        "Twitter",
        "Amazon"
      ],
      "prompt": "Write a solution to find how many users visited the bank and solved 0, 1, 2, ... transactions per visit. The result table must include all transaction counts from 0 up to the maximum number of transactions done in one visit, even if there are 0 visits for that count.",
      "sampleInput": {
        "table": "Visits / Transactions",
        "columns": [
          "user_id",
          "visit_date",
          "transaction_date",
          "amount"
        ],
        "rows": [
          [
            1,
            "2020-01-01",
            "2020-01-01",
            10
          ],
          [
            2,
            "2020-01-02",
            null,
            null
          ],
          [
            12,
            "2020-01-01",
            "2020-01-01",
            20
          ],
          [
            12,
            "2020-01-01",
            "2020-01-01",
            30
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "transactions_count",
          "visits_count"
        ],
        "rows": [
          [
            0,
            1
          ],
          [
            1,
            1
          ],
          [
            2,
            1
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1336: COMPLETE ZERO-FILLED TRANSACTION HISTOGRAM</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Visits & Trx</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">U2: 0 transactions</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">U1: 1 transaction</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">U12: 2 transactions</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">Recursive Seq (0 to MAX)\\nLEFT JOIN VisitCounts</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Histogram</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">0 trx -> 1 visit</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">1 trx -> 1 visit</text><text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">2 trx -> 1 visit</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Join Visits to Transactions on user_id AND visit_date = transaction_date to count transactions per visit.",
        "Generate an integer sequence from 0 up to MAX(transactions_count) using a recursive CTE.",
        "LEFT JOIN the sequence with the aggregated visit transaction counts.",
        "Count matching visits per sequence number, coalescing empty bins to 0."
      ],
      "trapsAndEdgeCases": [
        "Zero transactions bin: Visits where no transaction was made must be recorded in the '0' transactions bin."
      ],
      "solutionSQL": "WITH RECURSIVE VisitTrx AS (\n    SELECT v.user_id,\n           v.visit_date,\n           COUNT(t.transaction_date) AS trx_cnt\n    FROM Visits v\n    LEFT JOIN Transactions t\n      ON v.user_id = t.user_id\n     AND v.visit_date = t.transaction_date\n    GROUP BY v.user_id, v.visit_date\n),\nNumbers AS (\n    SELECT 0 AS transactions_count\n    UNION ALL\n    SELECT transactions_count + 1\n    FROM Numbers\n    WHERE transactions_count < (SELECT IFNULL(MAX(trx_cnt), 0) FROM VisitTrx)\n)\nSELECT n.transactions_count,\n       COUNT(v.user_id) AS visits_count\nFROM Numbers n\nLEFT JOIN VisitTrx v ON n.transactions_count = v.trx_cnt\nGROUP BY n.transactions_count\nORDER BY n.transactions_count ASC;",
      "lineByLineExplanation": [
        {
          "clause": "WITH RECURSIVE VisitTrx AS (...)",
          "exp": "Calculates the transaction count for each distinct bank visit."
        },
        {
          "clause": "Numbers AS (SELECT 0 ... UNION ALL SELECT n + 1 ...)",
          "exp": "Recursively creates integer scale from 0 to max transactions."
        },
        {
          "clause": "SELECT n.transactions_count, COUNT(v.user_id) AS visits_count FROM Numbers n LEFT JOIN VisitTrx v ...",
          "exp": "Folds counts into zero-filled frequency histogram."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Row_Number Seed Sequence",
          "complexity": "O(Max Count)",
          "sql": "WITH Seq AS (SELECT 0 AS transactions_count UNION SELECT ROW_NUMBER() OVER() FROM Transactions) ...",
          "explanation": "Seeds numerical sequence using ROW_NUMBER() over transactions."
        }
      ]
    },
    {
      "id": 1369,
      "title": "Get the Second Most Recent Activity",
      "difficulty": "Hard",
      "acceptance": "69.1%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to show the second most recent activity of each user. If the user only has one activity, return that one. A user cannot perform more than one activity at the same time.",
      "sampleInput": {
        "table": "UserActivity",
        "columns": [
          "username",
          "activity",
          "startDate",
          "endDate"
        ],
        "rows": [
          [
            "Alice",
            "Travel",
            "2020-02-12",
            "2020-02-20"
          ],
          [
            "Alice",
            "Dancing",
            "2020-02-21",
            "2020-02-23"
          ],
          [
            "Alice",
            "Travel",
            "2020-02-24",
            "2020-02-28"
          ],
          [
            "Bob",
            "Travel",
            "2020-02-11",
            "2020-02-18"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "username",
          "activity",
          "startDate",
          "endDate"
        ],
        "rows": [
          [
            "Alice",
            "Dancing",
            "2020-02-21",
            "2020-02-23"
          ],
          [
            "Bob",
            "Travel",
            "2020-02-11",
            "2020-02-18"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1369: 2ND ACTIVITY WITH SINGLETON FALLBACK</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">User Activities</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Alice: 3 activities (2nd = Dancing)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Bob: 1 activity (Fallback to 1st)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">WHERE rnk = 2 OR (cnt = 1 AND rnk = 1)</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Output</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Alice -> Dancing</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Bob -> Travel</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Rank activities for each user ordered by startDate DESC using ROW_NUMBER().",
        "Compute the total activities count per user using COUNT(*) OVER (PARTITION BY username).",
        "Filter for rows where rnk = 2 OR (cnt = 1 AND rnk = 1)."
      ],
      "trapsAndEdgeCases": [
        "Users with 1 activity: If a user has only 1 activity, rnk = 2 will return empty; must fallback to rnk = 1 when total count = 1."
      ],
      "solutionSQL": "WITH RankedActivity AS (\n    SELECT username,\n           activity,\n           startDate,\n           endDate,\n           ROW_NUMBER() OVER (\n               PARTITION BY username\n               ORDER BY startDate DESC\n           ) AS rnk,\n           COUNT(*) OVER (\n               PARTITION BY username\n           ) AS cnt\n    FROM UserActivity\n)\nSELECT username, activity, startDate, endDate\nFROM RankedActivity\nWHERE rnk = 2\n   OR (cnt = 1 AND rnk = 1);",
      "lineByLineExplanation": [
        {
          "clause": "WITH RankedActivity AS (SELECT ..., ROW_NUMBER() OVER (...) AS rnk, COUNT(*) OVER (...) AS cnt ...)",
          "exp": "Assigns reverse chronological rank and total count per user."
        },
        {
          "clause": "WHERE rnk = 2 OR (cnt = 1 AND rnk = 1)",
          "exp": "Extracts second most recent activity, falling back to only activity if count is 1."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "UNION Multi-Pass",
          "complexity": "O(N log N)",
          "sql": "SELECT username, activity, startDate, endDate FROM (\n  SELECT *, ROW_NUMBER() OVER(PARTITION BY username ORDER BY startDate DESC) AS rnk FROM UserActivity\n) t WHERE rnk = 2\nUNION ALL\nSELECT * FROM UserActivity GROUP BY username HAVING COUNT(*) = 1;",
          "explanation": "Unions exact 2nd rank rows with single-activity users."
        }
      ]
    },
    {
      "id": 1384,
      "title": "Total Sales Amount by Year",
      "difficulty": "Hard",
      "acceptance": "61.2%",
      "interviewFreq": "Very High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to report the total sales amount of each item for each year, with corresponding product_name, product_id, product_name, report_year and total_amount. Dates range from 2018 to 2020.",
      "sampleInput": {
        "table": "Product / Sales",
        "columns": [
          "product_id",
          "period_start",
          "period_end",
          "average_daily_spend"
        ],
        "rows": [
          [
            1,
            "2019-01-25",
            "2019-02-28",
            100
          ],
          [
            2,
            "2018-12-01",
            "2020-01-01",
            10
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "product_id",
          "product_name",
          "report_year",
          "total_amount"
        ],
        "rows": [
          [
            1,
            "LC Phone",
            "2019",
            3500
          ],
          [
            2,
            "LC T-Shirt",
            "2018",
            310
          ],
          [
            2,
            "LC T-Shirt",
            "2019",
            3650
          ],
          [
            2,
            "LC T-Shirt",
            "2020",
            10
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1384: MULTI-YEAR DATE OVERLAP SALES SPLITTING</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Sales Periods</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Item 2: 2018-12-01 to 2020-01-01 ($10/day)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Spans 2018, 2019, 2020!</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">(DATEDIFF(LEAST(end, yr_end), GREATEST(start, yr_start)) + 1) * rate</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Annualized Split</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">2018: 31 days x $10 = $310</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">2019: 365 days x $10 = $3650</text><text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">2020: 1 day x $10 = $10</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Generate years 2018, 2019, 2020 using a calendar CTE with year start and end bounds.",
        "Cross join or join Sales where period_start <= year_end AND period_end >= year_start.",
        "Days active in year = DATEDIFF(LEAST(period_end, year_end), GREATEST(period_start, year_start)) + 1.",
        "Multiply days by average_daily_spend.",
        "Order by product_id, report_year."
      ],
      "trapsAndEdgeCases": [
        "Inclusive date difference: DATEDIFF('2019-01-02', '2019-01-01') is 1, but both days were active; must add + 1."
      ],
      "solutionSQL": "WITH RECURSIVE Years AS (\n    SELECT '2018' AS report_year, '2018-01-01' AS yr_start, '2018-12-31' AS yr_end\n    UNION ALL\n    SELECT '2019', '2019-01-01', '2019-12-31'\n    UNION ALL\n    SELECT '2020', '2020-01-01', '2020-12-31'\n)\nSELECT s.product_id,\n       p.product_name,\n       y.report_year,\n       (DATEDIFF(LEAST(s.period_end, y.yr_end), GREATEST(s.period_start, y.yr_start)) + 1) * s.average_daily_spend AS total_amount\nFROM Sales s\nJOIN Product p ON s.product_id = p.product_id\nJOIN Years y\n  ON s.period_start <= y.yr_end\n AND s.period_end >= y.yr_start\nORDER BY s.product_id ASC, y.report_year ASC;",
      "lineByLineExplanation": [
        {
          "clause": "WITH RECURSIVE Years AS (...)",
          "exp": "Constructs calendar year boundaries for 2018, 2019, 2020."
        },
        {
          "clause": "JOIN Years y ON s.period_start <= y.yr_end AND s.period_end >= y.yr_start",
          "exp": "Matches overlapping years."
        },
        {
          "clause": "(DATEDIFF(LEAST(...), GREATEST(...)) + 1) * s.average_daily_spend AS total_amount",
          "exp": "Calculates exact days of overlap in the year times daily spend."
        },
        {
          "clause": "ORDER BY s.product_id ASC, y.report_year ASC",
          "exp": "Sorts by product and chronological year."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "UNION ALL Static Year Clauses",
          "complexity": "O(S * 3)",
          "sql": "SELECT product_id, product_name, '2018' AS report_year, ... WHERE period_start <= '2018-12-31' AND period_end >= '2018-01-01' UNION ALL ...;",
          "explanation": "Manual expansion of 3 separate year projection blocks."
        }
      ]
    },
    {
      "id": 1398,
      "title": "Customers Who Bought Products A and B but Not C",
      "difficulty": "Medium",
      "acceptance": "77.5%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to report the customer_id and customer_name of customers who bought products \"A\", \"B\" but did not buy the product \"C\". Order by customer_id.",
      "sampleInput": {
        "table": "Customers / Orders",
        "columns": [
          "customer_id",
          "customer_name",
          "product_name"
        ],
        "rows": [
          [
            1,
            "Daniel",
            "A"
          ],
          [
            1,
            "Daniel",
            "B"
          ],
          [
            2,
            "Diana",
            "A"
          ],
          [
            3,
            "Elizabeth",
            "A"
          ],
          [
            3,
            "Elizabeth",
            "B"
          ],
          [
            3,
            "Elizabeth",
            "C"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "customer_id",
          "customer_name"
        ],
        "rows": [
          [
            1,
            "Daniel"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1398: SET CONSTRAINTS: HAS A, HAS B, NO C</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Customers</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Daniel: A, B (Valid ✓)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Diana: A (No B ❌)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Elizabeth: A, B, C (Has C ❌)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">HAVING SUM(p='A')>0 AND\\nSUM(p='B')>0 AND SUM(p='C')=0</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Emitted</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">customer_id: 1, Daniel</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Join Customers with Orders.",
        "Group by customer_id, customer_name.",
        "HAVING SUM(product_name = 'A') > 0 AND SUM(product_name = 'B') > 0 AND SUM(product_name = 'C') = 0.",
        "Order by customer_id ASC."
      ],
      "trapsAndEdgeCases": [
        "Partial matches: Customers who bought A and B and also C must be strictly excluded."
      ],
      "solutionSQL": "SELECT c.customer_id, c.customer_name\nFROM Customers c\nJOIN Orders o ON c.customer_id = o.customer_id\nGROUP BY c.customer_id, c.customer_name\nHAVING SUM(o.product_name = 'A') > 0\n   AND SUM(o.product_name = 'B') > 0\n   AND SUM(o.product_name = 'C') = 0\nORDER BY c.customer_id ASC;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT c.customer_id, c.customer_name",
          "exp": "Projects customer credentials."
        },
        {
          "clause": "FROM Customers c JOIN Orders o ON c.customer_id = o.customer_id",
          "exp": "Joins customer records with order items."
        },
        {
          "clause": "GROUP BY c.customer_id, c.customer_name",
          "exp": "Aggregates per customer."
        },
        {
          "clause": "HAVING SUM(o.product_name = 'A') > 0 AND SUM(o.product_name = 'B') > 0 AND SUM(o.product_name = 'C') = 0",
          "exp": "Demands presence of A and B, and total absence of C."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Subquery IN / NOT IN",
          "complexity": "O(N log N)",
          "sql": "SELECT customer_id, customer_name FROM Customers\nWHERE customer_id IN (SELECT customer_id FROM Orders WHERE product_name = 'A')\n  AND customer_id IN (SELECT customer_id FROM Orders WHERE product_name = 'B')\n  AND customer_id NOT IN (SELECT customer_id FROM Orders WHERE product_name = 'C')\nORDER BY customer_id;",
          "explanation": "Set intersection and difference via IN and NOT IN."
        }
      ]
    },
    {
      "id": 1412,
      "title": "Find the Quiet Students in All Exams",
      "difficulty": "Hard",
      "acceptance": "63.2%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "A quiet student is the one who took at least one exam and did not score the high score or the low score in any exam they took. Write a solution to report the student_id and student_name of quiet students. Order by student_id.",
      "sampleInput": {
        "table": "Student / Exam",
        "columns": [
          "student_id",
          "student_name",
          "exam_id",
          "score"
        ],
        "rows": [
          [
            1,
            "Daniel",
            10,
            70
          ],
          [
            1,
            "Daniel",
            20,
            80
          ],
          [
            2,
            "Jade",
            10,
            90
          ],
          [
            3,
            "Tom",
            10,
            60
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "student_id",
          "student_name"
        ],
        "rows": [
          [
            1,
            "Daniel"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1412: EXTREME EXAM OUTLIER EXCLUSION</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Exam 10 Scores</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Jade: 90 (High ❌)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Daniel: 70 (Middle ✓)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Tom: 60 (Low ❌)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">score != MIN(score) AND\\nscore != MAX(score) in all exams</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Quiet Students</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">student_id: 1, Daniel</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "For each exam, compute the minimum and maximum score: MIN(score) OVER (PARTITION BY exam_id) and MAX(score) OVER (PARTITION BY exam_id).",
        "Identify students who scored either the min or max score in ANY exam: score = min_score OR score = max_score.",
        "Filter for students who took at least one exam AND are NOT in the outlier set.",
        "Order by student_id ASC."
      ],
      "trapsAndEdgeCases": [
        "Zero exams taken: Students who took 0 exams must NOT be reported as quiet students."
      ],
      "solutionSQL": "WITH ExamBounds AS (\n    SELECT student_id,\n           score,\n           MIN(score) OVER (PARTITION BY exam_id) AS min_score,\n           MAX(score) OVER (PARTITION BY exam_id) AS max_score\n    FROM Exam\n),\nNoisyStudents AS (\n    SELECT DISTINCT student_id\n    FROM ExamBounds\n    WHERE score = min_score OR score = max_score\n)\nSELECT s.student_id, s.student_name\nFROM Student s\nWHERE s.student_id IN (SELECT student_id FROM Exam)\n  AND s.student_id NOT IN (SELECT student_id FROM NoisyStudents)\nORDER BY s.student_id ASC;",
      "lineByLineExplanation": [
        {
          "clause": "WITH ExamBounds AS (...)",
          "exp": "Computes min and max score per exam partition."
        },
        {
          "clause": "NoisyStudents AS (...)",
          "exp": "Isolates students who hit the lowest or highest mark in any exam."
        },
        {
          "clause": "WHERE s.student_id IN (SELECT student_id FROM Exam) AND s.student_id NOT IN (SELECT student_id FROM NoisyStudents)",
          "exp": "Restricts to students with >=1 exam who were never noisy."
        },
        {
          "clause": "ORDER BY s.student_id ASC",
          "exp": "Sorts by student ID."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "DENSE_RANK Window Filtering",
          "complexity": "O(N log N)",
          "sql": "WITH Ranked AS (\n  SELECT student_id,\n         DENSE_RANK() OVER(PARTITION BY exam_id ORDER BY score ASC) AS rnk_low,\n         DENSE_RANK() OVER(PARTITION BY exam_id ORDER BY score DESC) AS rnk_high\n  FROM Exam\n)\nSELECT student_id, student_name FROM Student WHERE student_id IN (SELECT student_id FROM Exam)\nAND student_id NOT IN (SELECT student_id FROM Ranked WHERE rnk_low = 1 OR rnk_high = 1)\nORDER BY student_id;",
          "explanation": "Uses ascending and descending dense rank to flag rank 1 performers."
        }
      ]
    },
    {
      "id": 1440,
      "title": "Evaluate Boolean Expression",
      "difficulty": "Medium",
      "acceptance": "75.4%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to evaluate the boolean expressions in Expressions table. Return the result table with left_operand, operator, right_operand, and value ('true' or 'false').",
      "sampleInput": {
        "table": "Variables / Expressions",
        "columns": [
          "name",
          "value",
          "left_operand",
          "operator",
          "right_operand"
        ],
        "rows": [
          [
            "x",
            66
          ],
          [
            "y",
            77
          ],
          [
            "x",
            ">",
            "y"
          ],
          [
            "x",
            "<",
            "y"
          ],
          [
            "x",
            "=",
            "x"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "left_operand",
          "operator",
          "right_operand",
          "value"
        ],
        "rows": [
          [
            "x",
            ">",
            "y",
            "false"
          ],
          [
            "x",
            "<",
            "y",
            "true"
          ],
          [
            "x",
            "=",
            "x",
            "true"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1440: RELATIONAL DYNAMIC BOOLEAN EVALUATION</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Variables & Expr</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">x=66, y=77</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">x > y (66 > 77)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">x < y (66 < 77)</text><text x=\"14\" y=\"96\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">x = x (66 = 66)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">CASE WHEN op='>' AND l.val > r.val THEN 'true'...</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Evaluated</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">x > y: false</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">x < y: true</text><text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">x = x: true</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Join Expressions with Variables twice: once for left_operand (l) and once for right_operand (r).",
        "Use CASE WHEN to evaluate each operator:",
        "WHEN operator = '>' AND l.value > r.value THEN 'true'",
        "WHEN operator = '<' AND l.value < r.value THEN 'true'",
        "WHEN operator = '=' AND l.value = r.value THEN 'true'",
        "ELSE 'false'."
      ],
      "trapsAndEdgeCases": [
        "String booleans: Output must be lowercase string 'true' or 'false', not 1/0."
      ],
      "solutionSQL": "SELECT e.left_operand,\n       e.operator,\n       e.right_operand,\n       CASE\n           WHEN e.operator = '>' AND l.value > r.value THEN 'true'\n           WHEN e.operator = '<' AND l.value < r.value THEN 'true'\n           WHEN e.operator = '=' AND l.value = r.value THEN 'true'\n           ELSE 'false'\n       END AS value\nFROM Expressions e\nJOIN Variables l ON e.left_operand = l.name\nJOIN Variables r ON e.right_operand = r.name;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT e.left_operand, e.operator, e.right_operand,",
          "exp": "Projects expression tokens."
        },
        {
          "clause": "CASE WHEN e.operator = '>' AND l.value > r.value THEN 'true' ... ELSE 'false' END AS value",
          "exp": "Evaluates boolean logic based on mapped operand values."
        },
        {
          "clause": "FROM Expressions e JOIN Variables l ON e.left_operand = l.name JOIN Variables r ON e.right_operand = r.name",
          "exp": "Joins variable table twice for both operand values."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "IF Condition Chain",
          "complexity": "O(N)",
          "sql": "SELECT e.left_operand, e.operator, e.right_operand,\n       IF((operator = '>' AND l.value > r.value) OR\n          (operator = '<' AND l.value < r.value) OR\n          (operator = '=' AND l.value = r.value), 'true', 'false') AS value\nFROM Expressions e JOIN Variables l ON e.left_operand = l.name JOIN Variables r ON e.right_operand = r.name;",
          "explanation": "Compact IF evaluation chain."
        }
      ]
    },
    {
      "id": 1445,
      "title": "Apples & Oranges",
      "difficulty": "Medium",
      "acceptance": "88.2%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to report the difference between the number of apples and oranges sold each day. Return the result table ordered by sale_date.",
      "sampleInput": {
        "table": "Sales",
        "columns": [
          "sale_date",
          "fruit",
          "sold_num"
        ],
        "rows": [
          [
            "2020-05-01",
            "apples",
            10
          ],
          [
            "2020-05-01",
            "oranges",
            8
          ],
          [
            "2020-05-02",
            "apples",
            15
          ],
          [
            "2020-05-02",
            "oranges",
            15
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "sale_date",
          "diff"
        ],
        "rows": [
          [
            "2020-05-01",
            2
          ],
          [
            "2020-05-02",
            0
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1445: DAILY FRUIT DIFFERENCE PIVOT</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Daily Sales</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">May 01: Apples 10, Oranges 8</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">May 02: Apples 15, Oranges 15</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">SUM(CASE WHEN fruit='apples'\\nTHEN sold_num ELSE -sold_num END)</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Difference</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">May 01: diff = 2 (10-8)</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">May 02: diff = 0 (15-15)</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Group sales by sale_date.",
        "Apply signed conditional aggregation:",
        "SUM(CASE WHEN fruit = 'apples' THEN sold_num ELSE -sold_num END) AS diff.",
        "Order by sale_date ASC."
      ],
      "trapsAndEdgeCases": [
        "Negative differences: If more oranges than apples are sold, the difference can be negative."
      ],
      "solutionSQL": "SELECT sale_date,\n       SUM(CASE WHEN fruit = 'apples' THEN sold_num ELSE -sold_num END) AS diff\nFROM Sales\nGROUP BY sale_date\nORDER BY sale_date ASC;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT sale_date,",
          "exp": "Emits transaction date."
        },
        {
          "clause": "SUM(CASE WHEN fruit = 'apples' THEN sold_num ELSE -sold_num END) AS diff",
          "exp": "Adds apples, subtracts oranges."
        },
        {
          "clause": "FROM Sales GROUP BY sale_date ORDER BY sale_date ASC",
          "exp": "Groups per date and orders chronologically."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Self-Join Difference",
          "complexity": "O(N log N)",
          "sql": "SELECT a.sale_date, (a.sold_num - o.sold_num) AS diff\nFROM Sales a\nJOIN Sales o ON a.sale_date = o.sale_date AND a.fruit = 'apples' AND o.fruit = 'oranges'\nORDER BY a.sale_date;",
          "explanation": "Self-joins apples record with oranges record on the same date."
        }
      ]
    },
    {
      "id": 1454,
      "title": "Active Users",
      "difficulty": "Medium",
      "acceptance": "40.9%",
      "interviewFreq": "Very High • Amazon, Adobe",
      "companies": [
        "Amazon",
        "Adobe"
      ],
      "prompt": "Active users are those who logged in to their accounts for five or more consecutive days. Write a solution to find the id and the name of active users. Return the result table ordered by id.",
      "sampleInput": {
        "table": "Accounts / Logins",
        "columns": [
          "id",
          "name",
          "login_date"
        ],
        "rows": [
          [
            1,
            "Winston",
            "2020-05-30"
          ],
          [
            1,
            "Winston",
            "2020-05-31"
          ],
          [
            1,
            "Winston",
            "2020-06-01"
          ],
          [
            1,
            "Winston",
            "2020-06-02"
          ],
          [
            1,
            "Winston",
            "2020-06-03"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "id",
          "name"
        ],
        "rows": [
          [
            1,
            "Winston"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1454: 5 CONSECUTIVE DAYS ACTIVE STREAK</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Winston Logins</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">May 30, May 31, Jun 01</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Jun 02, Jun 03 (5 consecutive days!)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">login_date - ROW_NUMBER()\\nHAVING COUNT(*) >= 5</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Active User</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">id: 1, Winston</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Deduplicate logins first using SELECT DISTINCT id, login_date (users might log in multiple times a day).",
        "Assign ROW_NUMBER() ordered by login_date partitioned by id.",
        "Calculate island anchor: DATE_SUB(login_date, INTERVAL rnk DAY).",
        "Group by id, anchor and filter HAVING COUNT(*) >= 5.",
        "Join to Accounts to return distinct id and name, ordered by id."
      ],
      "trapsAndEdgeCases": [
        "Multiple logins on same day: Failure to DISTINCT prior to ranking breaks the streak sequence."
      ],
      "solutionSQL": "WITH DistinctLogins AS (\n    SELECT DISTINCT id, login_date\n    FROM Logins\n),\nStreaks AS (\n    SELECT id,\n           login_date,\n           DATE_SUB(login_date, INTERVAL ROW_NUMBER() OVER (\n               PARTITION BY id\n               ORDER BY login_date\n           ) DAY) AS grp\n    FROM DistinctLogins\n),\nActiveIDs AS (\n    SELECT id\n    FROM Streaks\n    GROUP BY id, grp\n    HAVING COUNT(*) >= 5\n)\nSELECT DISTINCT a.id, a.name\nFROM Accounts a\nJOIN ActiveIDs act ON a.id = act.id\nORDER BY a.id ASC;",
      "lineByLineExplanation": [
        {
          "clause": "WITH DistinctLogins AS (SELECT DISTINCT id, login_date FROM Logins)",
          "exp": "Deduplicates multiple daily logins."
        },
        {
          "clause": "Streaks AS (SELECT ..., DATE_SUB(login_date, INTERVAL ROW_NUMBER() OVER (...) DAY) AS grp)",
          "exp": "Applies Islands-and-Gaps date anchor grouping."
        },
        {
          "clause": "ActiveIDs AS (SELECT id FROM Streaks GROUP BY id, grp HAVING COUNT(*) >= 5)",
          "exp": "Filters streaks spanning 5+ continuous days."
        },
        {
          "clause": "SELECT DISTINCT a.id, a.name FROM Accounts a JOIN ActiveIDs act ON a.id = act.id ORDER BY a.id ASC",
          "exp": "Joins accounts to display user names ordered by ID."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "LEAD(..., 4) Window Approach",
          "complexity": "O(N log N)",
          "sql": "WITH DistinctLogins AS (SELECT DISTINCT id, login_date FROM Logins)\nSELECT DISTINCT a.id, a.name\nFROM Accounts a\nJOIN (\n  SELECT id, login_date, LEAD(login_date, 4) OVER(PARTITION BY id ORDER BY login_date) AS lead4\n  FROM DistinctLogins\n) t ON a.id = t.id AND DATEDIFF(t.lead4, t.login_date) = 4\nORDER BY a.id;",
          "explanation": "Checks if the 4th succeeding row is exactly 4 calendar days ahead."
        }
      ]
    },
    {
      "id": 1459,
      "title": "Rectangles Area",
      "difficulty": "Medium",
      "acceptance": "69.8%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to report all possible rectangles that can be formed by any two points in the Points table. Two points can form a rectangle if they do not share the same x-coordinate or the same y-coordinate. Calculate area = |x1 - x2| * |y1 - y2|. Order by area DESC, p1 ASC, p2 ASC.",
      "sampleInput": {
        "table": "Points",
        "columns": [
          "id",
          "x_value",
          "y_value"
        ],
        "rows": [
          [
            1,
            2,
            8
          ],
          [
            2,
            4,
            7
          ],
          [
            3,
            2,
            10
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "p1",
          "p2",
          "area"
        ],
        "rows": [
          [
            2,
            3,
            6
          ],
          [
            1,
            2,
            2
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1459: 2D RECTANGLE AREA FROM CORNER POINTS</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Points</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P1: (2, 8)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P2: (4, 7)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P3: (2, 10)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">ABS(p1.x - p2.x) * ABS(p1.y - p2.y) > 0\\nWHERE p1.id < p2.id</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Rectangles</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">P2 & P3: Area = |4-2|*|7-10| = 6</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">P1 & P2: Area = |2-4|*|8-7| = 2</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Join Points to itself on p1.id < p2.id to ensure each pair is evaluated once and avoid self-pairs.",
        "Filter for non-degenerate rectangles: p1.x_value != p2.x_value AND p1.y_value != p2.y_value (area > 0).",
        "Area = ABS(p1.x_value - p2.x_value) * ABS(p1.y_value - p2.y_value).",
        "Order by area DESC, p1 ASC, p2 ASC."
      ],
      "trapsAndEdgeCases": [
        "Collinear points: Points sharing an x or y coordinate form a line with area 0; must be filtered out."
      ],
      "solutionSQL": "SELECT p1.id AS p1,\n       p2.id AS p2,\n       ABS(p1.x_value - p2.x_value) * ABS(p1.y_value - p2.y_value) AS area\nFROM Points p1\nJOIN Points p2\n  ON p1.id < p2.id\n AND p1.x_value != p2.x_value\n AND p1.y_value != p2.y_value\nORDER BY area DESC, p1 ASC, p2 ASC;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT p1.id AS p1, p2.id AS p2,",
          "exp": "Emits distinct corner pair IDs."
        },
        {
          "clause": "ABS(p1.x_value - p2.x_value) * ABS(p1.y_value - p2.y_value) AS area",
          "exp": "Computes rectangle area."
        },
        {
          "clause": "FROM Points p1 JOIN Points p2 ON p1.id < p2.id AND p1.x_value != p2.x_value AND p1.y_value != p2.y_value",
          "exp": "Joins distinct points with non-zero dimensions."
        },
        {
          "clause": "ORDER BY area DESC, p1 ASC, p2 ASC",
          "exp": "Orders by area descending, breaking ties by IDs."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "WHERE Area > 0 Filter",
          "complexity": "O(N^2)",
          "sql": "SELECT p1.id AS p1, p2.id AS p2, (ABS(p1.x_value - p2.x_value) * ABS(p1.y_value - p2.y_value)) AS area\nFROM Points p1 JOIN Points p2 ON p1.id < p2.id\nWHERE ABS(p1.x_value - p2.x_value) * ABS(p1.y_value - p2.y_value) > 0\nORDER BY area DESC, p1, p2;",
          "explanation": "Equivalent filtering checking area product directly."
        }
      ]
    },
    {
      "id": 1468,
      "title": "Calculate Salaries",
      "difficulty": "Medium",
      "acceptance": "81.6%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to find the salaries of the employees after applying taxes. Taxes are calculated based on the maximum salary in each company:\n- 0% tax if max salary < $1,000\n- 24% tax if max salary between $1,000 and $10,000 inclusive\n- 49% tax if max salary > $10,000\nRound salaries to the nearest integer.",
      "sampleInput": {
        "table": "Salaries",
        "columns": [
          "company_id",
          "employee_id",
          "employee_name",
          "salary"
        ],
        "rows": [
          [
            1,
            1,
            "Tony",
            2000
          ],
          [
            1,
            2,
            "Pronub",
            21300
          ],
          [
            2,
            1,
            "Boch Ticket",
            700
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "company_id",
          "employee_id",
          "employee_name",
          "salary"
        ],
        "rows": [
          [
            1,
            1,
            "Tony",
            1020
          ],
          [
            1,
            2,
            "Pronub",
            10863
          ],
          [
            2,
            1,
            "Boch Ticket",
            700
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1468: COMPANY MAX SALARY TAX TIER ROUNDING</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Company Max Tiers</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Co 1 Max: $21,300 (> 10k -> 49% tax)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Co 2 Max: $700 (< 1k -> 0% tax)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">ROUND(salary * (1 - tax_rate))</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Net Salary</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Tony: 2000 * 0.51 = 1020</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Boch: 700 * 1.00 = 700</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Compute max salary per company: MAX(salary) OVER (PARTITION BY company_id).",
        "Determine tax multiplier via CASE WHEN on max_salary:",
        "WHEN max_salary < 1000 THEN 1.0",
        "WHEN max_salary <= 10000 THEN 0.76 (1 - 0.24)",
        "ELSE 0.51 (1 - 0.49).",
        "Multiply salary by multiplier and ROUND() to nearest integer."
      ],
      "trapsAndEdgeCases": [
        "Tax tier bounds: $1,000 and $10,000 are inclusive in the 24% bracket."
      ],
      "solutionSQL": "WITH CompanyMax AS (\n    SELECT company_id,\n           employee_id,\n           employee_name,\n           salary,\n           MAX(salary) OVER (PARTITION BY company_id) AS max_sal\n    FROM Salaries\n)\nSELECT company_id,\n       employee_id,\n       employee_name,\n       ROUND(\n           CASE\n               WHEN max_sal < 1000 THEN salary\n               WHEN max_sal <= 10000 THEN salary * 0.76\n               ELSE salary * 0.51\n           END\n       ) AS salary\nFROM CompanyMax;",
      "lineByLineExplanation": [
        {
          "clause": "WITH CompanyMax AS (SELECT ..., MAX(salary) OVER (PARTITION BY company_id) AS max_sal FROM Salaries)",
          "exp": "Appends company max salary to every employee row."
        },
        {
          "clause": "ROUND(CASE WHEN max_sal < 1000 THEN salary ... END) AS salary",
          "exp": "Applies tax rate deduction and rounds to nearest whole integer."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "JOIN with GROUP BY Max Table",
          "complexity": "O(N log N)",
          "sql": "SELECT s.company_id, s.employee_id, s.employee_name,\n       ROUND(CASE WHEN m.max_s < 1000 THEN s.salary WHEN m.max_s <= 10000 THEN s.salary * 0.76 ELSE s.salary * 0.51 END) AS salary\nFROM Salaries s JOIN (SELECT company_id, MAX(salary) AS max_s FROM Salaries GROUP BY company_id) m ON s.company_id = m.company_id;",
          "explanation": "Subquery join computing company max salaries."
        }
      ]
    },
    {
      "id": 1479,
      "title": "Sales by Day of the Week",
      "difficulty": "Hard",
      "acceptance": "78.4%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to report how many units in each item category have been ordered on each day of the week. Return the result table ordered by category.",
      "sampleInput": {
        "table": "Orders / Items",
        "columns": [
          "item_id",
          "order_date",
          "quantity",
          "item_category"
        ],
        "rows": [
          [
            1,
            "2020-06-01",
            10,
            "Book"
          ],
          [
            1,
            "2020-06-08",
            10,
            "Book"
          ],
          [
            2,
            "2020-06-02",
            5,
            "Phone"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "category",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "rows": [
          [
            "Book",
            20,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          [
            "Phone",
            0,
            5,
            0,
            0,
            0,
            0,
            0
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1479: DYNAMIC 7-DAY WEEKDAY CROSS-TAB PIVOT</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Orders</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Book: June 01 (Mon, qty 10)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Book: June 08 (Mon, qty 10)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Phone: June 02 (Tue, qty 5)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">SUM(IF(DAYOFWEEK(d)=2, qty, 0)) AS Monday...</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Pivoted Table</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Book: Mon=20, Tue=0...</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Phone: Mon=0, Tue=5...</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Every distinct item_category in Items must appear in the output, even if it has 0 orders (RIGHT/LEFT JOIN Items).",
        "Extract day of week: DAYNAME(order_date) or DAYOFWEEK(order_date).",
        "In MySQL, DAYOFWEEK returns 1 for Sunday, 2 for Monday, ..., 7 for Saturday.",
        "Conditionally sum quantity for each day: SUM(IF(DAYOFWEEK(o.order_date) = 2, o.quantity, 0)) AS Monday.",
        "Order by category ASC."
      ],
      "trapsAndEdgeCases": [
        "Zero-order categories: Must RIGHT JOIN Items or start FROM Items with LEFT JOIN Orders so categories with 0 orders are preserved."
      ],
      "solutionSQL": "SELECT i.item_category AS Category,\n       SUM(IF(DAYNAME(o.order_date) = 'Monday', o.quantity, 0)) AS Monday,\n       SUM(IF(DAYNAME(o.order_date) = 'Tuesday', o.quantity, 0)) AS Tuesday,\n       SUM(IF(DAYNAME(o.order_date) = 'Wednesday', o.quantity, 0)) AS Wednesday,\n       SUM(IF(DAYNAME(o.order_date) = 'Thursday', o.quantity, 0)) AS Thursday,\n       SUM(IF(DAYNAME(o.order_date) = 'Friday', o.quantity, 0)) AS Friday,\n       SUM(IF(DAYNAME(o.order_date) = 'Saturday', o.quantity, 0)) AS Saturday,\n       SUM(IF(DAYNAME(o.order_date) = 'Sunday', o.quantity, 0)) AS Sunday\nFROM Items i\nLEFT JOIN Orders o ON i.item_id = o.item_id\nGROUP BY i.item_category\nORDER BY Category ASC;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT i.item_category AS Category,",
          "exp": "Emits product category."
        },
        {
          "clause": "SUM(IF(DAYNAME(o.order_date) = 'Monday', o.quantity, 0)) AS Monday ...",
          "exp": "Pivots quantities into distinct weekday column sums."
        },
        {
          "clause": "FROM Items i LEFT JOIN Orders o ON i.item_id = o.item_id",
          "exp": "Left joins to preserve categories with zero orders."
        },
        {
          "clause": "GROUP BY i.item_category ORDER BY Category ASC",
          "exp": "Groups and sorts alphabetically."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "DAYOFWEEK Numeric Indexing",
          "complexity": "O(N log N)",
          "sql": "SELECT i.item_category AS Category,\n       SUM(IF(DAYOFWEEK(o.order_date)=2, o.quantity, 0)) AS Monday,\n       SUM(IF(DAYOFWEEK(o.order_date)=3, o.quantity, 0)) AS Tuesday,\n       ...\nFROM Items i LEFT JOIN Orders o ON i.item_id = o.item_id GROUP BY 1 ORDER BY 1;",
          "explanation": "Numeric day indices (2=Monday to 7=Saturday, 1=Sunday)."
        }
      ]
    },
    {
      "id": 1501,
      "title": "Countries You Can Safely Invest In",
      "difficulty": "Medium",
      "acceptance": "52.8%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "A telecommunications company wants to invest in new countries. The country has to have an average call duration strictly greater than the global average call duration. Write a solution to find the countries where this condition is met. Return the result table in any order.",
      "sampleInput": {
        "table": "Person / Country / Calls",
        "columns": [
          "id",
          "name",
          "phone_number",
          "country_code",
          "caller_id",
          "callee_id",
          "duration"
        ],
        "rows": [
          [
            3,
            "Jonathan",
            "051-1234567",
            "051",
            3,
            12,
            33
          ],
          [
            12,
            "Elvis",
            "051-7654321",
            "051",
            1,
            2,
            59
          ],
          [
            1,
            "Bob",
            "033-1111111",
            "033",
            2,
            7,
            102
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "country"
        ],
        "rows": [
          [
            "Peru"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1501: COUNTRY CALL DURATION VS GLOBAL MEAN</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Calls</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Caller 3 (051) -> Callee 12 (051): 33 min</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Global Avg: 54.7 min</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">AVG(duration) > (SELECT AVG(duration) FROM Calls)</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Investment Target</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">country: Peru (Avg > Global)</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Every call has two participants: caller_id and callee_id, both accumulating duration for their respective country.",
        "Unfold calls using UNION ALL: SELECT caller_id AS person_id, duration FROM Calls UNION ALL SELECT callee_id, duration FROM Calls.",
        "Join person_id to Person, extract the 3-digit country code (SUBSTRING(phone_number, 1, 3)), and join to Country.",
        "HAVING AVG(duration) > (SELECT AVG(duration) FROM Calls)."
      ],
      "trapsAndEdgeCases": [
        "Bidirectional participant trap: Counting only caller_id ignores half the telephone traffic; must include callee_id."
      ],
      "solutionSQL": "WITH AllCallers AS (\n    SELECT caller_id AS person_id, duration FROM Calls\n    UNION ALL\n    SELECT callee_id AS person_id, duration FROM Calls\n)\nSELECT c.name AS country\nFROM Country c\nJOIN Person p ON c.country_code = SUBSTRING(p.phone_number, 1, 3)\nJOIN AllCallers ac ON p.id = ac.person_id\nGROUP BY c.name\nHAVING AVG(ac.duration) > (SELECT AVG(duration) FROM Calls);",
      "lineByLineExplanation": [
        {
          "clause": "WITH AllCallers AS (SELECT caller_id AS person_id ... UNION ALL SELECT callee_id ...)",
          "exp": "Normalizes calls from both caller and receiver perspectives."
        },
        {
          "clause": "JOIN Person p ON c.country_code = SUBSTRING(p.phone_number, 1, 3)",
          "exp": "Maps phone prefixes to country codes."
        },
        {
          "clause": "HAVING AVG(ac.duration) > (SELECT AVG(duration) FROM Calls)",
          "exp": "Filters countries whose average duration beats global average."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "CROSS JOIN Global Average",
          "complexity": "O(N log N)",
          "sql": "WITH GlobalAvg AS (SELECT AVG(duration) AS g_avg FROM Calls)\nSELECT c.name AS country FROM Country c ... CROSS JOIN GlobalAvg g\nGROUP BY c.name, g.g_avg HAVING AVG(ac.duration) > g.g_avg;",
          "explanation": "Cross joins scalar global mean directly into the query block."
        }
      ]
    },
    {
      "id": 1532,
      "title": "The Most Recent Three Orders",
      "difficulty": "Medium",
      "acceptance": "69.7%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to find the most recent three orders of each user. If a user ordered less than three orders, return all of their orders. Return the result table ordered by customer_name in ascending order, customer_id in ascending order, and order_date in descending order.",
      "sampleInput": {
        "table": "Customers / Orders",
        "columns": [
          "customer_id",
          "name",
          "order_id",
          "order_date"
        ],
        "rows": [
          [
            1,
            "Winston",
            1,
            "2020-07-31"
          ],
          [
            1,
            "Winston",
            2,
            "2020-07-30"
          ],
          [
            1,
            "Winston",
            3,
            "2020-07-29"
          ],
          [
            1,
            "Winston",
            4,
            "2020-07-28"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "customer_name",
          "customer_id",
          "order_id",
          "order_date"
        ],
        "rows": [
          [
            "Winston",
            1,
            1,
            "2020-07-31"
          ],
          [
            "Winston",
            1,
            2,
            "2020-07-30"
          ],
          [
            "Winston",
            1,
            3,
            "2020-07-29"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1532: TOP 3 ORDERS CHRONOLOGICAL SLICE</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Winston Orders</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">O1: July 31 (Rank 1)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">O2: July 30 (Rank 2)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">O3: July 29 (Rank 3)</text><text x=\"14\" y=\"96\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">O4: July 28 (Rank 4 ❌)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">ROW_NUMBER() OVER(PARTITION BY customer_id\\nORDER BY order_date DESC) <= 3</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Top 3 Orders</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Winston: O1, O2, O3</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Join Customers with Orders.",
        "Assign ROW_NUMBER() partitioned by customer_id and ordered by order_date DESC.",
        "Filter for rnk <= 3.",
        "Order by customer_name ASC, customer_id ASC, order_date DESC."
      ],
      "trapsAndEdgeCases": [
        "Sorting hierarchy: Must follow the exact 3-level sort order specified in the problem statement."
      ],
      "solutionSQL": "WITH RankedOrders AS (\n    SELECT c.name AS customer_name,\n           c.customer_id,\n           o.order_id,\n           o.order_date,\n           ROW_NUMBER() OVER (\n               PARTITION BY c.customer_id\n               ORDER BY o.order_date DESC\n           ) AS rnk\n    FROM Customers c\n    JOIN Orders o ON c.customer_id = o.customer_id\n)\nSELECT customer_name, customer_id, order_id, order_date\nFROM RankedOrders\nWHERE rnk <= 3\nORDER BY customer_name ASC, customer_id ASC, order_date DESC;",
      "lineByLineExplanation": [
        {
          "clause": "WITH RankedOrders AS (...)",
          "exp": "Ranks each customer's orders chronologically in descending order."
        },
        {
          "clause": "SELECT customer_name, customer_id, order_id, order_date FROM RankedOrders WHERE rnk <= 3",
          "exp": "Retains top 3 orders per customer."
        },
        {
          "clause": "ORDER BY customer_name ASC, customer_id ASC, order_date DESC",
          "exp": "Sorts final rows per requirement."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Correlated Subquery Count",
          "complexity": "O(N^2)",
          "sql": "SELECT c.name AS customer_name, c.customer_id, o1.order_id, o1.order_date\nFROM Customers c JOIN Orders o1 ON c.customer_id = o1.customer_id\nWHERE (\n  SELECT COUNT(*) FROM Orders o2 WHERE o2.customer_id = o1.customer_id AND o2.order_date > o1.order_date\n) < 3 ORDER BY customer_name, customer_id, order_date DESC;",
          "explanation": "Correlated subquery counting newer orders."
        }
      ]
    },
    {
      "id": 1549,
      "title": "The Most Recent Orders for Each Product",
      "difficulty": "Medium",
      "acceptance": "66.5%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to find the most recent order(s) of each product. Return the result table with product_name, product_id, order_id, and order_date ordered by product_name ASC, product_id ASC, and order_id ASC.",
      "sampleInput": {
        "table": "Products / Orders",
        "columns": [
          "product_id",
          "product_name",
          "order_id",
          "order_date"
        ],
        "rows": [
          [
            1,
            "keyboard",
            1,
            "2020-08-01"
          ],
          [
            1,
            "keyboard",
            2,
            "2020-08-01"
          ],
          [
            2,
            "mouse",
            3,
            "2020-08-03"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "product_name",
          "product_id",
          "order_id",
          "order_date"
        ],
        "rows": [
          [
            "keyboard",
            1,
            1,
            "2020-08-01"
          ],
          [
            "keyboard",
            1,
            2,
            "2020-08-01"
          ],
          [
            "mouse",
            2,
            3,
            "2020-08-03"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1549: MULTI-ORDER LATEST DATE TIE PRESERVATION</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Orders</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Keyboard: O1 (Aug 01), O2 (Aug 01)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Mouse: O3 (Aug 03)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">DENSE_RANK() OVER(PARTITION BY product_id\\nORDER BY order_date DESC) = 1</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Most Recent</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">keyboard -> O1, O2 (Both tied for latest!)</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">mouse -> O3</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Multiple orders can be placed for the same product on its latest date.",
        "Using ROW_NUMBER() would drop ties; DENSE_RANK() or RANK() is required.",
        "Partition by product_id and order by order_date DESC.",
        "Filter for rnk = 1, join with Products, and order by product_name ASC, product_id ASC, order_id ASC."
      ],
      "trapsAndEdgeCases": [
        "Ties on max date: If two orders occur on the same latest date, both must be returned."
      ],
      "solutionSQL": "WITH RankedOrders AS (\n    SELECT p.product_name,\n           p.product_id,\n           o.order_id,\n           o.order_date,\n           DENSE_RANK() OVER (\n               PARTITION BY p.product_id\n               ORDER BY o.order_date DESC\n           ) AS rnk\n    FROM Products p\n    JOIN Orders o ON p.product_id = o.product_id\n)\nSELECT product_name, product_id, order_id, order_date\nFROM RankedOrders\nWHERE rnk = 1\nORDER BY product_name ASC, product_id ASC, order_id ASC;",
      "lineByLineExplanation": [
        {
          "clause": "WITH RankedOrders AS (...)",
          "exp": "Ranks orders per product using DENSE_RANK to retain date ties."
        },
        {
          "clause": "SELECT product_name, product_id, order_id, order_date FROM RankedOrders WHERE rnk = 1",
          "exp": "Filters for the latest order date."
        },
        {
          "clause": "ORDER BY product_name ASC, product_id ASC, order_id ASC",
          "exp": "Sorts final output."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Tuple IN MAX(order_date)",
          "complexity": "O(N log N)",
          "sql": "SELECT p.product_name, p.product_id, o.order_id, o.order_date\nFROM Products p JOIN Orders o ON p.product_id = o.product_id\nWHERE (p.product_id, o.order_date) IN (SELECT product_id, MAX(order_date) FROM Orders GROUP BY product_id)\nORDER BY product_name, product_id, order_id;",
          "explanation": "Matches max date directly per product."
        }
      ]
    },
    {
      "id": 1555,
      "title": "Bank Account Summary",
      "difficulty": "Medium",
      "acceptance": "51.2%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to report the user_id, user_name, credit, and credit_limit_breached ('Yes' or 'No') for each user after executing all transactions. A user's credit limit is breached if their final credit balance is negative (< 0).",
      "sampleInput": {
        "table": "Users / Transactions",
        "columns": [
          "user_id",
          "user_name",
          "credit",
          "paid_by",
          "paid_to",
          "amount"
        ],
        "rows": [
          [
            1,
            "Winston",
            1000,
            1,
            2,
            400
          ],
          [
            2,
            "Jonathan",
            200,
            2,
            1,
            500
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "user_id",
          "user_name",
          "credit",
          "credit_limit_breached"
        ],
        "rows": [
          [
            1,
            "Winston",
            1100,
            "No"
          ],
          [
            2,
            "Jonathan",
            100,
            "No"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1555: NET DEBIT/CREDIT ACCOUNT RECONCILIATION</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Transactions</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">U1 pays U2: -400 to U1, +400 to U2</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">U2 pays U1: -500 to U2, +500 to U1</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">credit - paid_by_sum + paid_to_sum\\nIF(credit < 0, 'Yes', 'No')</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Final Balances</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">U1: 1000 - 400 + 500 = 1100 (No)</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">U2: 200 + 400 - 500 = 100 (No)</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "When user acts as paid_by, their balance decreases: -amount.",
        "When user acts as paid_to, their balance increases: +amount.",
        "Union all debits and credits: (paid_by AS user_id, -amount) UNION ALL (paid_to AS user_id, amount).",
        "LEFT JOIN Users with net transactions and compute final_credit = u.credit + IFNULL(SUM(amount), 0).",
        "Check IF(final_credit < 0, 'Yes', 'No')."
      ],
      "trapsAndEdgeCases": [
        "Users with 0 transactions: Must preserve their starting credit and report 'No' (or 'Yes' if starting balance was already negative)."
      ],
      "solutionSQL": "WITH NetTransactions AS (\n    SELECT paid_by AS user_id, -amount AS delta FROM Transactions\n    UNION ALL\n    SELECT paid_to AS user_id, amount AS delta FROM Transactions\n),\nUserTotals AS (\n    SELECT user_id, SUM(delta) AS net_change\n    FROM NetTransactions\n    GROUP BY user_id\n)\nSELECT u.user_id,\n       u.user_name,\n       u.credit + IFNULL(t.net_change, 0) AS credit,\n       CASE\n           WHEN u.credit + IFNULL(t.net_change, 0) < 0 THEN 'Yes'\n           ELSE 'No'\n       END AS credit_limit_breached\nFROM Users u\nLEFT JOIN UserTotals t ON u.user_id = t.user_id;",
      "lineByLineExplanation": [
        {
          "clause": "WITH NetTransactions AS (...)",
          "exp": "Represents debits as negative and credits as positive deltas."
        },
        {
          "clause": "UserTotals AS (...)",
          "exp": "Aggregates net transactional impact per user."
        },
        {
          "clause": "u.credit + IFNULL(t.net_change, 0) AS credit,",
          "exp": "Calculates updated ending balance."
        },
        {
          "clause": "CASE WHEN ... < 0 THEN 'Yes' ELSE 'No' END AS credit_limit_breached",
          "exp": "Flags negative credit balances."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Two-Sided Subquery Join",
          "complexity": "O(N log N)",
          "sql": "SELECT u.user_id, u.user_name,\n       u.credit - IFNULL(outflow.total, 0) + IFNULL(inflow.total, 0) AS credit,\n       IF(u.credit - IFNULL(outflow.total, 0) + IFNULL(inflow.total, 0) < 0, 'Yes', 'No') AS credit_limit_breached\nFROM Users u\nLEFT JOIN (SELECT paid_by, SUM(amount) AS total FROM Transactions GROUP BY paid_by) outflow ON u.user_id = outflow.paid_by\nLEFT JOIN (SELECT paid_to, SUM(amount) AS total FROM Transactions GROUP BY paid_to) inflow ON u.user_id = inflow.paid_to;",
          "explanation": "Joins separate inflow and outflow aggregates."
        }
      ]
    },
    {
      "id": 1596,
      "title": "The Most Frequently Ordered Products for Each Customer",
      "difficulty": "Medium",
      "acceptance": "66.3%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to find the most frequently ordered product(s) for each customer. In case of a tie, report all tied products. Return the result table with customer_id, product_id, and product_name.",
      "sampleInput": {
        "table": "Customers / Orders / Products",
        "columns": [
          "customer_id",
          "order_id",
          "product_id",
          "product_name"
        ],
        "rows": [
          [
            1,
            1,
            1,
            "keyboard"
          ],
          [
            1,
            2,
            1,
            "keyboard"
          ],
          [
            1,
            3,
            2,
            "mouse"
          ],
          [
            2,
            4,
            2,
            "mouse"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "customer_id",
          "product_id",
          "product_name"
        ],
        "rows": [
          [
            1,
            1,
            "keyboard"
          ],
          [
            2,
            2,
            "mouse"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1596: PRODUCT ORDER FREQUENCY PER CUSTOMER</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Order Counts</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Cust 1: Keyboard (2 orders, Max)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Cust 1: Mouse (1 order)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Cust 2: Mouse (1 order, Max)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">DENSE_RANK() OVER(PARTITION BY customer_id\\nORDER BY COUNT(*) DESC) = 1</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Top Product</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Cust 1 -> Keyboard</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Cust 2 -> Mouse</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Count orders per (customer_id, product_id).",
        "Use DENSE_RANK() partitioned by customer_id and ordered by COUNT(*) DESC to rank products by order volume.",
        "Filter for rnk = 1 and join to Products to retrieve product_name."
      ],
      "trapsAndEdgeCases": [
        "Tied favorites: If a customer orders two products an equal maximum number of times, both must be returned."
      ],
      "solutionSQL": "WITH ProductCounts AS (\n    SELECT customer_id,\n           product_id,\n           DENSE_RANK() OVER (\n               PARTITION BY customer_id\n               ORDER BY COUNT(*) DESC\n           ) AS rnk\n    FROM Orders\n    GROUP BY customer_id, product_id\n)\nSELECT pc.customer_id,\n       pc.product_id,\n       p.product_name\nFROM ProductCounts pc\nJOIN Products p ON pc.product_id = p.product_id\nWHERE pc.rnk = 1;",
      "lineByLineExplanation": [
        {
          "clause": "WITH ProductCounts AS (SELECT ..., DENSE_RANK() OVER (PARTITION BY customer_id ORDER BY COUNT(*) DESC) AS rnk ...)",
          "exp": "Calculates order frequencies and ranks products per customer."
        },
        {
          "clause": "SELECT pc.customer_id, pc.product_id, p.product_name FROM ProductCounts pc JOIN Products p ... WHERE pc.rnk = 1",
          "exp": "Filters for top frequency products and attaches name."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Correlated Subquery MAX",
          "complexity": "O(N^2)",
          "sql": "SELECT o.customer_id, o.product_id, p.product_name\nFROM Orders o JOIN Products p ON o.product_id = p.product_id\nGROUP BY o.customer_id, o.product_id, p.product_name\nHAVING COUNT(*) = (\n  SELECT MAX(cnt) FROM (SELECT customer_id, product_id, COUNT(*) AS cnt FROM Orders GROUP BY customer_id, product_id) t\n  WHERE t.customer_id = o.customer_id\n);",
          "explanation": "Correlated subquery matching max order count."
        }
      ]
    },
    {
      "id": 1613,
      "title": "Find the Missing IDs",
      "difficulty": "Medium",
      "acceptance": "78.4%",
      "interviewFreq": "Very High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to find the missing customer IDs. The missing IDs are ones that are not in Customers but are less than the maximum customer_id present in the table. Return the result table ordered by ids in ascending order.",
      "sampleInput": {
        "table": "Customers",
        "columns": [
          "customer_id",
          "customer_name"
        ],
        "rows": [
          [
            1,
            "Alice"
          ],
          [
            4,
            "Bob"
          ],
          [
            5,
            "Charlie"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "ids"
        ],
        "rows": [
          [
            2
          ],
          [
            3
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1613: RECURSIVE SEQUENCE DOMAIN SUBTRACTION</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Existing IDs</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Present: 1, 4, 5 (Max ID = 5)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Sequence: 1, 2, 3, 4, 5</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">WITH RECURSIVE Seq (1 to MAX)\\nWHERE n NOT IN (Customers)</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Missing IDs</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">ids: 2</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">ids: 3</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Use a recursive CTE to synthesize all integers from 1 up to MAX(customer_id).",
        "Filter the generated numbers where n NOT IN (SELECT customer_id FROM Customers).",
        "Order by ids ASC."
      ],
      "trapsAndEdgeCases": [
        "Recursive recursion limit: Problem guarantees MAX(customer_id) <= 100, which is well within standard recursion limits."
      ],
      "solutionSQL": "WITH RECURSIVE Seq AS (\n    SELECT 1 AS ids\n    UNION ALL\n    SELECT ids + 1\n    FROM Seq\n    WHERE ids < (SELECT MAX(customer_id) FROM Customers)\n)\nSELECT ids\nFROM Seq\nWHERE ids NOT IN (SELECT customer_id FROM Customers)\nORDER BY ids ASC;",
      "lineByLineExplanation": [
        {
          "clause": "WITH RECURSIVE Seq AS (SELECT 1 AS ids UNION ALL SELECT ids + 1 FROM Seq WHERE ids < (SELECT MAX(customer_id) FROM Customers))",
          "exp": "Recursively generates consecutive integers up to max customer ID."
        },
        {
          "clause": "SELECT ids FROM Seq WHERE ids NOT IN (SELECT customer_id FROM Customers)",
          "exp": "Filters out existing customer IDs to identify gaps."
        },
        {
          "clause": "ORDER BY ids ASC",
          "exp": "Sorts missing numbers in ascending sequence."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "LEFT JOIN Anti-Filter",
          "complexity": "O(Max ID)",
          "sql": "WITH RECURSIVE Seq AS (SELECT 1 AS ids UNION ALL SELECT ids + 1 FROM Seq WHERE ids < (SELECT MAX(customer_id) FROM Customers))\nSELECT s.ids FROM Seq s LEFT JOIN Customers c ON s.ids = c.customer_id WHERE c.customer_id IS NULL ORDER BY s.ids;",
          "explanation": "Left anti-join syntax checking for NULL customer_id."
        }
      ]
    },
    {
      "id": 1635,
      "title": "Hopper Company Queries I",
      "difficulty": "Hard",
      "acceptance": "48.2%",
      "interviewFreq": "Very High • Uber",
      "companies": [
        "Uber"
      ],
      "prompt": "Write a solution to report the following for each month of 2020:\n- active_drivers: total number of active drivers by the end of that month\n- accepted_rides: number of accepted rides in that month\nOrder by month ASC.",
      "sampleInput": {
        "table": "Drivers / AcceptedRides",
        "columns": [
          "driver_id",
          "join_date",
          "ride_id",
          "requested_at"
        ],
        "rows": [
          [
            10,
            "2019-12-10",
            1,
            "2020-01-01"
          ],
          [
            8,
            "2020-01-13",
            2,
            "2020-01-02"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "month",
          "active_drivers",
          "accepted_rides"
        ],
        "rows": [
          [
            1,
            2,
            2
          ],
          [
            2,
            2,
            0
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1635: RIDE-SHARING MONTHLY METRICS RECONCILIATION</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Drivers & Rides</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Drivers joined before or in Jan: 2</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Rides accepted in Jan: 2</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">12-Month Calendar (1 to 12)\\nLEFT JOIN Drivers & Rides</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Monthly Summary</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Month 1: active=2, rides=2</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Month 2: active=2, rides=0</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Generate all 12 calendar months of 2020 using a recursive CTE (1 to 12).",
        "Active drivers by month M: Drivers who joined on or before the last day of month M (join_date <= '2020-M-31').",
        "Accepted rides in month M: Rides requested in 2020 with MONTH(requested_at) = M that appear in AcceptedRides.",
        "Join the 12 calendar months with active drivers count and accepted rides count."
      ],
      "trapsAndEdgeCases": [
        "Pre-2020 drivers: Drivers who joined in 2018 or 2019 are active in all months of 2020; they must be included starting in Month 1."
      ],
      "solutionSQL": "WITH RECURSIVE Months AS (\n    SELECT 1 AS month\n    UNION ALL\n    SELECT month + 1 FROM Months WHERE month < 12\n),\nMonthlyRides AS (\n    SELECT MONTH(r.requested_at) AS month,\n           COUNT(a.ride_id) AS accepted_rides\n    FROM Rides r\n    JOIN AcceptedRides a ON r.ride_id = a.ride_id\n    WHERE YEAR(r.requested_at) = 2020\n    GROUP BY MONTH(r.requested_at)\n)\nSELECT m.month,\n       (\n           SELECT COUNT(*)\n           FROM Drivers d\n           WHERE d.join_date < DATE_ADD('2020-01-01', INTERVAL m.month MONTH)\n       ) AS active_drivers,\n       IFNULL(mr.accepted_rides, 0) AS accepted_rides\nFROM Months m\nLEFT JOIN MonthlyRides mr ON m.month = mr.month\nORDER BY m.month ASC;",
      "lineByLineExplanation": [
        {
          "clause": "WITH RECURSIVE Months AS (SELECT 1 AS month UNION ALL SELECT month + 1 ... WHERE month < 12)",
          "exp": "Generates numbers 1 to 12 representing each month."
        },
        {
          "clause": "MonthlyRides AS (...)",
          "exp": "Aggregates accepted rides occurring in 2020 by month."
        },
        {
          "clause": "(SELECT COUNT(*) FROM Drivers d WHERE d.join_date < DATE_ADD('2020-01-01', INTERVAL m.month MONTH)) AS active_drivers",
          "exp": "Counts cumulative drivers joined prior to the end of each target month."
        },
        {
          "clause": "IFNULL(mr.accepted_rides, 0) AS accepted_rides",
          "exp": "Coalesces months with zero accepted rides to 0."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "JOIN with Cumulative Sum",
          "complexity": "O(D log D + 12)",
          "sql": "WITH RECURSIVE Months AS (SELECT 1 AS month UNION ALL SELECT month + 1 FROM Months WHERE month < 12),\nMonthlyDrivers AS (\n  SELECT m.month, COUNT(d.driver_id) AS cnt FROM Months m LEFT JOIN Drivers d ON YEAR(d.join_date) = 2020 AND MONTH(d.join_date) = m.month GROUP BY m.month\n) ...",
          "explanation": "Separately counts initial drivers and accumulates monthly new drivers."
        }
      ]
    },
    {
      "id": 1645,
      "title": "Hopper Company Queries II",
      "difficulty": "Hard",
      "acceptance": "44.9%",
      "interviewFreq": "Very High • Uber",
      "companies": [
        "Uber"
      ],
      "prompt": "Write a solution to report the working_percentage of active drivers for each month of 2020, where working_percentage = (working drivers in month / active drivers by end of month) * 100. Round to 2 decimal places. If active drivers = 0, return 0.00.",
      "sampleInput": {
        "table": "Drivers / Rides / AcceptedRides",
        "columns": [
          "driver_id",
          "join_date",
          "requested_at"
        ],
        "rows": [
          [
            10,
            "2019-12-10",
            "2020-01-01"
          ],
          [
            8,
            "2020-01-13",
            "2020-01-02"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "month",
          "working_percentage"
        ],
        "rows": [
          [
            1,
            100
          ],
          [
            2,
            0
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1645: WORKING DRIVERS UTILIZATION PERCENTAGE</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Month 1 Metrics</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Active Drivers: 2</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Distinct Drivers with >=1 ride: 2</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Working Percentage: 100%</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">ROUND(working_drivers / active_drivers * 100, 2)</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Monthly Utilization</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Month 1: 100.00%</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Month 2: 0.00%</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Use Months CTE (1 to 12).",
        "Active drivers = Total drivers joined before or during month M.",
        "Working drivers = Distinct drivers who accepted at least one ride requested in month M: COUNT(DISTINCT a.driver_id).",
        "working_percentage = ROUND(IFNULL(working_drivers / active_drivers * 100, 0), 2).",
        "If active_drivers is 0, percentage defaults to 0.00."
      ],
      "trapsAndEdgeCases": [
        "Distinct working drivers: A driver who completes 10 rides in a month only counts as 1 working driver."
      ],
      "solutionSQL": "WITH RECURSIVE Months AS (\n    SELECT 1 AS month\n    UNION ALL\n    SELECT month + 1 FROM Months WHERE month < 12\n),\nWorkingDrivers AS (\n    SELECT MONTH(r.requested_at) AS month,\n           COUNT(DISTINCT a.driver_id) AS working_drivers\n    FROM Rides r\n    JOIN AcceptedRides a ON r.ride_id = a.ride_id\n    WHERE YEAR(r.requested_at) = 2020\n    GROUP BY MONTH(r.requested_at)\n)\nSELECT m.month,\n       ROUND(\n           IFNULL(\n               wd.working_drivers * 100.0 /\n               NULLIF((SELECT COUNT(*) FROM Drivers d WHERE d.join_date < DATE_ADD('2020-01-01', INTERVAL m.month MONTH)), 0),\n               0\n           ),\n           2\n       ) AS working_percentage\nFROM Months m\nLEFT JOIN WorkingDrivers wd ON m.month = wd.month\nORDER BY m.month ASC;",
      "lineByLineExplanation": [
        {
          "clause": "WITH RECURSIVE Months AS (...)",
          "exp": "Generates calendar months 1 through 12."
        },
        {
          "clause": "WorkingDrivers AS (...)",
          "exp": "Counts distinct drivers with at least one completed ride in the month."
        },
        {
          "clause": "ROUND(IFNULL(wd.working_drivers * 100.0 / NULLIF(active_drivers, 0), 0), 2) AS working_percentage",
          "exp": "Computes working percentage with NULLIF zero-division guard, rounded to 2 decimals."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "CTE Metric Join",
          "complexity": "O(R + D + 12)",
          "sql": "WITH Active AS (SELECT m.month, ...), Working AS (SELECT m.month, ...)\nSELECT a.month, ROUND(IFNULL(w.cnt * 100 / a.cnt, 0), 2) AS working_percentage FROM Active a LEFT JOIN Working w ON a.month = w.month;",
          "explanation": "Modular join between separate Active and Working driver tables."
        }
      ]
    },
    {
      "id": 1651,
      "title": "Hopper Company Queries III",
      "difficulty": "Hard",
      "acceptance": "54.1%",
      "interviewFreq": "Very High • Uber",
      "companies": [
        "Uber"
      ],
      "prompt": "Write a solution to compute the average_ride_distance and average_ride_duration of that month and the following two months for each month between January and October 2020 (inclusive). Round averages to 2 decimal places. Order by month ASC.",
      "sampleInput": {
        "table": "Rides / AcceptedRides",
        "columns": [
          "ride_id",
          "requested_at",
          "ride_distance",
          "ride_duration"
        ],
        "rows": [
          [
            1,
            "2020-01-01",
            10,
            20
          ],
          [
            2,
            "2020-02-01",
            10,
            20
          ],
          [
            3,
            "2020-03-01",
            10,
            20
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "month",
          "average_ride_distance",
          "average_ride_duration"
        ],
        "rows": [
          [
            1,
            10,
            20
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1651: 3-MONTH ROLLING WINDOW DISTANCE & DURATION</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Monthly Totals</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">M1: 10 mi, 20 min</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">M2: 10 mi, 20 min</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">M3: 10 mi, 20 min</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">AVG(metric) OVER(ROWS BETWEEN CURRENT ROW\\nAND 2 FOLLOWING) [Months 1 to 10]</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">3-Mo Moving Avg</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Month 1: (10+10+10)/3 = 10.00 mi</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Month 1: (20+20+20)/3 = 20.00 min</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Generate months 1 to 12.",
        "Sum ride_distance and ride_duration for each month of 2020, coalescing empty months to 0.",
        "Calculate 3-month forward moving average using AVG() OVER (ORDER BY month ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING).",
        "Filter for months 1 through 10 (since months 11 and 12 do not have 2 succeeding months within the year).",
        "Round averages to 2 decimal places."
      ],
      "trapsAndEdgeCases": [
        "Month limit: Must strictly output months 1 to 10 (January through October)."
      ],
      "solutionSQL": "WITH RECURSIVE Months AS (\n    SELECT 1 AS month\n    UNION ALL\n    SELECT month + 1 FROM Months WHERE month < 12\n),\nMonthlyAggs AS (\n    SELECT m.month,\n           IFNULL(SUM(a.ride_distance), 0) AS total_distance,\n           IFNULL(SUM(a.ride_duration), 0) AS total_duration\n    FROM Months m\n    LEFT JOIN Rides r ON m.month = MONTH(r.requested_at) AND YEAR(r.requested_at) = 2020\n    LEFT JOIN AcceptedRides a ON r.ride_id = a.ride_id\n    GROUP BY m.month\n),\nRollingAvgs AS (\n    SELECT month,\n           ROUND(AVG(total_distance) OVER (\n               ORDER BY month\n               ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING\n           ), 2) AS average_ride_distance,\n           ROUND(AVG(total_duration) OVER (\n               ORDER BY month\n               ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING\n           ), 2) AS average_ride_duration\n    FROM MonthlyAggs\n)\nSELECT month, average_ride_distance, average_ride_duration\nFROM RollingAvgs\nWHERE month <= 10\nORDER BY month ASC;",
      "lineByLineExplanation": [
        {
          "clause": "WITH RECURSIVE Months AS (...)",
          "exp": "Generates all 12 calendar months."
        },
        {
          "clause": "MonthlyAggs AS (...)",
          "exp": "Sums monthly distance and duration, defaulting zero-ride months to 0."
        },
        {
          "clause": "AVG(total_distance) OVER (ORDER BY month ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING)",
          "exp": "Computes 3-month forward sliding average."
        },
        {
          "clause": "WHERE month <= 10 ORDER BY month ASC",
          "exp": "Restricts to January through October (months 1-10)."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Explicit SUM / 3 Window",
          "complexity": "O(12)",
          "sql": "SELECT month,\n       ROUND(SUM(total_distance) OVER (ORDER BY month ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING) / 3.0, 2) AS average_ride_distance,\n       ROUND(SUM(total_duration) OVER (ORDER BY month ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING) / 3.0, 2) AS average_ride_duration\nFROM MonthlyAggs WHERE month <= 10;",
          "explanation": "Computes 3-month sum divided by constant 3."
        }
      ]
    }
  ],
  "problems": [
    {
      "id": 177,
      "title": "Nth Highest Salary",
      "difficulty": "Medium",
      "acceptance": "38.2%",
      "interviewFreq": "Very High • Amazon, Apple, Meta, Google",
      "companies": [
        "Amazon",
        "Apple",
        "Meta",
        "Google"
      ],
      "prompt": "Write a SQL query to get the nth highest salary from the Employee table. If there is no nth highest salary, the query should return null.",
      "sampleInput": {
        "table": "Employee",
        "columns": [
          "id",
          "salary"
        ],
        "rows": [
          [
            1,
            100
          ],
          [
            2,
            200
          ],
          [
            3,
            300
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "getNthHighestSalary(2)"
        ],
        "rows": [
          [
            200
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #177: Nth HIGHEST SALARY VIA OFFSET PARAMETERIZATION</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Employee Table</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">1: $100</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">2: $200</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">3: $300</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">SET N = N - 1;\\nLIMIT 1 OFFSET N</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Scalar Output</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">getNthHighestSalary(2): 200</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "In MySQL functions, variables passed to LIMIT cannot be calculated in-line (e.g., LIMIT N-1).",
        "Mutate the input parameter first: SET N = N - 1.",
        "Query distinct salaries ordered descending with LIMIT 1 OFFSET N.",
        "The scalar wrapper returns NULL automatically if no matching row exists."
      ],
      "trapsAndEdgeCases": [
        "Duplicate salaries trap: Must use SELECT DISTINCT salary so duplicate values share the same rank.",
        "Fewer than N distinct salaries: Empty set must resolve to NULL via scalar subquery."
      ],
      "solutionSQL": "CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT\nBEGIN\n  SET N = N - 1;\n  RETURN (\n    SELECT DISTINCT salary\n    FROM Employee\n    ORDER BY salary DESC\n    LIMIT 1 OFFSET N\n  );\nEND;",
      "lineByLineExplanation": [
        {
          "clause": "SET N = N - 1;",
          "exp": "Decrements N to convert 1-based rank to 0-based OFFSET."
        },
        {
          "clause": "SELECT DISTINCT salary",
          "exp": "Deduplicates identical salaries."
        },
        {
          "clause": "FROM Employee ORDER BY salary DESC",
          "exp": "Sorts compensation from highest to lowest."
        },
        {
          "clause": "LIMIT 1 OFFSET N",
          "exp": "Skips N rows and extracts the exact Nth distinct item."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "DENSE_RANK() Window CTE",
          "complexity": "O(N log N)",
          "sql": "CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT\nBEGIN\n  RETURN (\n    WITH Ranked AS (\n      SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk\n      FROM Employee\n    )\n    SELECT DISTINCT salary FROM Ranked WHERE rnk = N\n  );\nEND;",
          "explanation": "Uses DENSE_RANK() to assign contiguous integer ranks directly without manual offset decrements."
        }
      ]
    },
    {
      "id": 178,
      "title": "Rank Scores",
      "difficulty": "Medium",
      "acceptance": "62.1%",
      "interviewFreq": "Very High • Amazon, Adobe, Microsoft",
      "companies": [
        "Amazon",
        "Adobe",
        "Microsoft"
      ],
      "prompt": "Write a solution to find the rank of the scores. The ranking should be calculated according to the following rules:\n- Scores ranked from highest to lowest.\n- Tied scores share the same rank.\n- Ranks are consecutive without gaps.\nReturn the result table ordered by score in descending order.",
      "sampleInput": {
        "table": "Scores",
        "columns": [
          "id",
          "score"
        ],
        "rows": [
          [
            1,
            3.5
          ],
          [
            2,
            3.65
          ],
          [
            3,
            4
          ],
          [
            4,
            3.85
          ],
          [
            5,
            4
          ],
          [
            6,
            3.65
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "score",
          "rank"
        ],
        "rows": [
          [
            4,
            1
          ],
          [
            4,
            1
          ],
          [
            3.85,
            2
          ],
          [
            3.65,
            3
          ],
          [
            3.65,
            3
          ],
          [
            3.5,
            4
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #178: DENSE_RANK TIE-PRESERVATION WITHOUT HOLES</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Scores Table</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">3: 4.00</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">5: 4.00</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">4: 3.85</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">DENSE_RANK() OVER\\n(ORDER BY score DESC)</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Ranked Table</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">4.00 -> Rank 1</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">4.00 -> Rank 1</text><text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">3.85 -> Rank 2</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Standard RANK() skips ranks on ties (1, 1, 3), which violates the problem specification.",
        "DENSE_RANK() guarantees contiguous ranks (1, 1, 2).",
        "The alias 'rank' is an SQL reserved word and must be escaped with backticks in MySQL."
      ],
      "trapsAndEdgeCases": [
        "Reserved keyword collision: Aliasing without quotes (`rank`) can cause syntax errors.",
        "Floating point ordering: Precision sorting must be exact."
      ],
      "solutionSQL": "SELECT score,\n       DENSE_RANK() OVER (ORDER BY score DESC) AS `rank`\nFROM Scores\nORDER BY score DESC;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT score,",
          "exp": "Projects the original floating point score."
        },
        {
          "clause": "DENSE_RANK() OVER (ORDER BY score DESC) AS `rank`",
          "exp": "Calculates dense ranking in descending order."
        },
        {
          "clause": "FROM Scores",
          "exp": "Source scores table."
        },
        {
          "clause": "ORDER BY score DESC",
          "exp": "Ensures result table is presented highest to lowest."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Legacy Correlated Subquery",
          "complexity": "O(N^2)",
          "sql": "SELECT s1.score,\n       (SELECT COUNT(DISTINCT s2.score) FROM Scores s2 WHERE s2.score >= s1.score) AS `rank`\nFROM Scores s1\nORDER BY s1.score DESC;",
          "explanation": "Pre-window function ANSI approach counting unique scores greater than or equal to current score."
        }
      ]
    },
    {
      "id": 512,
      "title": "Game Play Analysis II",
      "difficulty": "Easy",
      "acceptance": "54.8%",
      "interviewFreq": "High • Meta, Twitch, Blizzard",
      "companies": [
        "Meta",
        "Twitch",
        "Blizzard"
      ],
      "prompt": "Write a solution to report the device that is first logged in for each player.\nReturn the result table in any order.",
      "sampleInput": {
        "table": "Activity",
        "columns": [
          "player_id",
          "device_id",
          "event_date",
          "games_played"
        ],
        "rows": [
          [
            1,
            2,
            "2016-03-01",
            5
          ],
          [
            1,
            2,
            "2016-05-02",
            6
          ],
          [
            2,
            3,
            "2017-06-25",
            1
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "player_id",
          "device_id"
        ],
        "rows": [
          [
            1,
            2
          ],
          [
            2,
            3
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #512: FIRST LOGIN DEVICE EXTRACTION</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Activity</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P1: 2016-03-01, Dev 2</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P1: 2016-05-02, Dev 2</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P2: 2017-06-25, Dev 3</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">WHERE (player_id, event_date) IN\\n(MIN(event_date))</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">First Device</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">P1 -> Dev 2</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">P2 -> Dev 3</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Find the minimum event_date for each player.",
        "Filter the original table to match both player_id and that minimum date.",
        "Select the corresponding device_id."
      ],
      "trapsAndEdgeCases": [
        "Multiple logins on same date: The problem specifies (player_id, event_date) is primary key, ensuring uniqueness."
      ],
      "solutionSQL": "SELECT player_id, device_id\nFROM Activity\nWHERE (player_id, event_date) IN (\n    SELECT player_id, MIN(event_date)\n    FROM Activity\n    GROUP BY player_id\n);",
      "lineByLineExplanation": [
        {
          "clause": "SELECT player_id, device_id",
          "exp": "Projects player and first login device."
        },
        {
          "clause": "FROM Activity",
          "exp": "Source activity log."
        },
        {
          "clause": "WHERE (player_id, event_date) IN (...)",
          "exp": "Tuple filter matching each player's earliest date."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "ROW_NUMBER() Window Filter",
          "complexity": "O(N log N)",
          "sql": "WITH Ranked AS (\n  SELECT player_id, device_id,\n         ROW_NUMBER() OVER (PARTITION BY player_id ORDER BY event_date ASC) AS rnk\n  FROM Activity\n)\nSELECT player_id, device_id FROM Ranked WHERE rnk = 1;",
          "explanation": "Partitions by player, orders chronologically, and extracts the top row."
        }
      ]
    },
    {
      "id": 534,
      "title": "Game Play Analysis III",
      "difficulty": "Medium",
      "acceptance": "81.0%",
      "interviewFreq": "High • Meta, Netflix",
      "companies": [
        "Meta",
        "Netflix"
      ],
      "prompt": "Write a solution to report for each player and date, how many games played so far by the player. That is, the total number of games played by the player until that date.",
      "sampleInput": {
        "table": "Activity",
        "columns": [
          "player_id",
          "device_id",
          "event_date",
          "games_played"
        ],
        "rows": [
          [
            1,
            2,
            "2016-03-01",
            5
          ],
          [
            1,
            2,
            "2016-05-02",
            6
          ],
          [
            1,
            3,
            "2017-06-25",
            1
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "player_id",
          "event_date",
          "games_played_so_far"
        ],
        "rows": [
          [
            1,
            "2016-03-01",
            5
          ],
          [
            1,
            "2016-05-02",
            11
          ],
          [
            1,
            "2017-06-25",
            12
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #534: CUMULATIVE RUNNING SUM PER PLAYER</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Games Played</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P1 (03-01): 5</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P1 (05-02): 6</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P1 (06-25): 1</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">SUM(games_played) OVER\\n(PARTITION BY player_id ORDER BY date)</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Running Total</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">03-01: 5</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">05-02: 11 (5+6)</text><text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">06-25: 12 (11+1)</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Use window aggregation SUM(games_played) partitioned by player_id and ordered by event_date.",
        "The default window frame with ORDER BY is RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.",
        "This accumulates all past games played up to and including the current date."
      ],
      "trapsAndEdgeCases": [
        "Unbounded following trap: Omitting ORDER BY causes SUM() to compute the grand total for the player instead of running total."
      ],
      "solutionSQL": "SELECT player_id,\n       event_date,\n       SUM(games_played) OVER (\n           PARTITION BY player_id\n           ORDER BY event_date\n       ) AS games_played_so_far\nFROM Activity;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT player_id, event_date,",
          "exp": "Emits player and chronological activity date."
        },
        {
          "clause": "SUM(games_played) OVER (PARTITION BY player_id ORDER BY event_date) AS games_played_so_far",
          "exp": "Running cumulative sum per player."
        },
        {
          "clause": "FROM Activity",
          "exp": "Source activity log."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Self-Join Cumulative Sum",
          "complexity": "O(N^2)",
          "sql": "SELECT a1.player_id, a1.event_date, SUM(a2.games_played) AS games_played_so_far\nFROM Activity a1\nJOIN Activity a2 ON a1.player_id = a2.player_id AND a2.event_date <= a1.event_date\nGROUP BY a1.player_id, a1.event_date;",
          "explanation": "ANSI self-join joining prior records and aggregating with SUM."
        }
      ]
    },
    {
      "id": 571,
      "title": "Find Median Given Frequency of Schedule",
      "difficulty": "Hard",
      "acceptance": "44.6%",
      "interviewFreq": "Very High • Pinterest, Meta, Google",
      "companies": [
        "Pinterest",
        "Meta",
        "Google"
      ],
      "prompt": "The median is the value separating the higher half from the lower half of a data sample. Write a solution to calculate the median of all the numbers in the Numbers table and round it to 1 decimal place.",
      "sampleInput": {
        "table": "Numbers",
        "columns": [
          "num",
          "frequency"
        ],
        "rows": [
          [
            0,
            7
          ],
          [
            1,
            1
          ],
          [
            2,
            3
          ],
          [
            3,
            1
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "median"
        ],
        "rows": [
          [
            0
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #571: WEIGHTED FREQUENCY MEDIAN THEOREM</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Frequency Counts</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">0 (Freq 7)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">1 (Freq 1)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">2 (Freq 3)</text><text x=\"14\" y=\"96\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">3 (Freq 1)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">Asc_Cum >= T/2 AND\\nDesc_Cum >= T/2</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Median Value</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">median: 0.0</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Calculate total count of numbers: T = SUM(frequency).",
        "Compute ascending cumulative frequency and descending cumulative frequency for each number.",
        "A number is a median candidate if both its ascending and descending cumulative sums are >= T / 2.0.",
        "Average the qualifying numbers to handle both odd and even distribution parity."
      ],
      "trapsAndEdgeCases": [
        "Even count midpoint: If T is even, two distinct numbers may qualify; AVG(num) resolves to their midpoint.",
        "Rounding requirement: Must format to 1 decimal place using ROUND(..., 1)."
      ],
      "solutionSQL": "WITH Cumulative AS (\n    SELECT num,\n           frequency,\n           SUM(frequency) OVER (ORDER BY num ASC) AS asc_cum,\n           SUM(frequency) OVER (ORDER BY num DESC) AS desc_cum,\n           SUM(frequency) OVER () AS total_cnt\n    FROM Numbers\n)\nSELECT ROUND(AVG(num), 1) AS median\nFROM Cumulative\nWHERE asc_cum >= total_cnt / 2.0\n  AND desc_cum >= total_cnt / 2.0;",
      "lineByLineExplanation": [
        {
          "clause": "WITH Cumulative AS (...)",
          "exp": "Calculates ascending, descending, and grand total frequencies."
        },
        {
          "clause": "WHERE asc_cum >= total_cnt / 2.0 AND desc_cum >= total_cnt / 2.0",
          "exp": "Filters numbers falling on the median boundary interval."
        },
        {
          "clause": "SELECT ROUND(AVG(num), 1) AS median",
          "exp": "Averages the median set and rounds to 1 decimal place."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Recursive Number Unfolding",
          "complexity": "O(Total Frequency)",
          "sql": "WITH RECURSIVE Expanded AS (\n  SELECT num, frequency, 1 AS seq FROM Numbers\n  UNION ALL\n  SELECT num, frequency, seq + 1 FROM Expanded WHERE seq < frequency\n)\nSELECT ROUND(AVG(num), 1) AS median FROM (\n  SELECT num, ROW_NUMBER() OVER(ORDER BY num) AS rnk, COUNT(*) OVER() AS total FROM Expanded\n) t WHERE rnk IN (FLOOR((total+1)/2), CEIL((total+1)/2));",
          "explanation": "Physically unfolds frequencies into individual rows and applies standard ordinal median selection."
        }
      ]
    },
    {
      "id": 574,
      "title": "Winning Candidate",
      "difficulty": "Medium",
      "acceptance": "60.4%",
      "interviewFreq": "High • Uber, Amazon",
      "companies": [
        "Uber",
        "Amazon"
      ],
      "prompt": "Write a solution to report the name of the winning candidate (i.e., the candidate who got the largest number of votes).\nIt is guaranteed that there is exactly one winning candidate.",
      "sampleInput": {
        "table": "Candidate",
        "columns": [
          "id",
          "name"
        ],
        "rows": [
          [
            1,
            "A"
          ],
          [
            2,
            "B"
          ],
          [
            3,
            "C"
          ],
          [
            4,
            "D"
          ],
          [
            5,
            "E"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "name"
        ],
        "rows": [
          [
            "B"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #574: VOTE TALLY AGGREGATION</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Votes</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">V1: Candidate 2</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">V2: Candidate 4</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">V3: Candidate 2</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">GROUP BY candidateId\\nORDER BY COUNT(*) DESC LIMIT 1</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Winner</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">name: B (2 votes)</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Group the Vote table by candidateId and order by COUNT(*) descending with LIMIT 1.",
        "Join the resulting candidateId back to the Candidate table to retrieve the candidate's name."
      ],
      "trapsAndEdgeCases": [
        "Candidate with 0 votes: Joining Candidate first requires LEFT JOIN, but querying Vote first is much faster."
      ],
      "solutionSQL": "SELECT c.name\nFROM Candidate c\nJOIN (\n    SELECT candidateId\n    FROM Vote\n    GROUP BY candidateId\n    ORDER BY COUNT(*) DESC\n    LIMIT 1\n) v ON c.id = v.candidateId;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT c.name",
          "exp": "Emits the winner's name."
        },
        {
          "clause": "FROM Candidate c",
          "exp": "Source candidates table."
        },
        {
          "clause": "JOIN (SELECT candidateId ... LIMIT 1) v",
          "exp": "Subquery identifying the candidate with maximum votes."
        },
        {
          "clause": "ON c.id = v.candidateId",
          "exp": "Matches winner's ID."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "CTE with DENSE_RANK()",
          "complexity": "O(V log V)",
          "sql": "WITH Tally AS (\n  SELECT candidateId, DENSE_RANK() OVER (ORDER BY COUNT(*) DESC) AS rnk\n  FROM Vote GROUP BY candidateId\n)\nSELECT name FROM Candidate c JOIN Tally t ON c.id = t.candidateId WHERE t.rnk = 1;",
          "explanation": "Window rank alternative handling potential multi-candidate ties."
        }
      ]
    },
    {
      "id": 578,
      "title": "Get Highest Answer Rate Question",
      "difficulty": "Medium",
      "acceptance": "41.5%",
      "interviewFreq": "High • Meta, Snap",
      "companies": [
        "Meta",
        "Snap"
      ],
      "prompt": "The answer rate for a question is the number of times a user answered the question by the number of times it was shown. Write a solution to report the question that has the highest answer rate. If multiple questions have the same maximum rate, return the one with the smallest question_id.",
      "sampleInput": {
        "table": "SurveyLog",
        "columns": [
          "id",
          "action",
          "question_id",
          "answer_id",
          "q_num",
          "timestamp"
        ],
        "rows": [
          [
            5,
            "show",
            285,
            null,
            1,
            123
          ],
          [
            5,
            "answer",
            285,
            124124,
            1,
            124
          ],
          [
            5,
            "show",
            369,
            null,
            2,
            125
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "survey_log"
        ],
        "rows": [
          [
            285
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #578: RATIO CALCULATION WITH TIE-BREAKING</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">SurveyLog</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Q285: show, answer</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Q369: show (no answer)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">SUM(action='answer') /\\nSUM(action='show')</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Highest Rate</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">survey_log: 285 (100%)</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "For each question_id, count how many times action = 'answer' and action = 'show'.",
        "Compute answer_rate = SUM(action = 'answer') / SUM(action = 'show').",
        "Order by answer_rate DESC, question_id ASC with LIMIT 1."
      ],
      "trapsAndEdgeCases": [
        "Tie-breaking rule: Must sort question_id ASC as the secondary sort key."
      ],
      "solutionSQL": "SELECT question_id AS survey_log\nFROM SurveyLog\nGROUP BY question_id\nORDER BY SUM(action = 'answer') / SUM(action = 'show') DESC,\n         question_id ASC\nLIMIT 1;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT question_id AS survey_log",
          "exp": "Projects the winning question ID aliased as survey_log."
        },
        {
          "clause": "FROM SurveyLog GROUP BY question_id",
          "exp": "Aggregates actions per question."
        },
        {
          "clause": "ORDER BY SUM(action = 'answer') / SUM(action = 'show') DESC, question_id ASC",
          "exp": "Ranks by answer rate, breaking ties by lowest ID."
        },
        {
          "clause": "LIMIT 1",
          "exp": "Emits the top question."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "COUNT(answer_id) Optimization",
          "complexity": "O(N log N)",
          "sql": "SELECT question_id AS survey_log\nFROM SurveyLog\nGROUP BY question_id\nORDER BY COUNT(answer_id) / COUNT(IF(action = 'show', 1, NULL)) DESC, question_id ASC\nLIMIT 1;",
          "explanation": "Leverages the fact that answer_id is non-null only for answer events."
        }
      ]
    },
    {
      "id": 579,
      "title": "Find Cumulative Salary of an Employee",
      "difficulty": "Hard",
      "acceptance": "44.9%",
      "interviewFreq": "Very High • Amazon, Oracle",
      "companies": [
        "Amazon",
        "Oracle"
      ],
      "prompt": "Write a solution to calculate the cumulative salary summary for every employee in a single table, excluding the most recent month for each employee. The cumulative salary is the sum of salaries in the current month and the previous 2 months. Return the result table ordered by id in ascending order, and then by month in descending order.",
      "sampleInput": {
        "table": "Employee",
        "columns": [
          "id",
          "month",
          "salary"
        ],
        "rows": [
          [
            1,
            1,
            20
          ],
          [
            1,
            2,
            30
          ],
          [
            1,
            3,
            40
          ],
          [
            1,
            4,
            60
          ],
          [
            2,
            1,
            20
          ],
          [
            3,
            1,
            20
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "id",
          "month",
          "Salary"
        ],
        "rows": [
          [
            1,
            3,
            90
          ],
          [
            1,
            2,
            50
          ],
          [
            1,
            1,
            20
          ],
          [
            2,
            1,
            20
          ],
          [
            3,
            1,
            20
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #579: 3-MONTH ROLLING SUM WITH MAX MONTH EXCLUDED</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Emp 1 History</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">M1: 20 -> Cum 20</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">M2: 30 -> Cum 50</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">M3: 40 -> Cum 90</text><text x=\"14\" y=\"96\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">M4: 60 (MAX EXCLUDED)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">SUM(salary) OVER(ROWS\\nBETWEEN 2 PRECEDING) & !MAX</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Report Table</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">1, M3, 90</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">1, M2, 50</text><text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">1, M1, 20</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Filter out each employee's most recent (maximum) month: (id, month) NOT IN (SELECT id, MAX(month) FROM Employee GROUP BY id).",
        "Calculate 3-month rolling sum: SUM(salary) OVER (PARTITION BY id ORDER BY month RANGE BETWEEN 2 PRECEDING AND CURRENT ROW).",
        "Order final results by id ASC, month DESC."
      ],
      "trapsAndEdgeCases": [
        "Employees with only 1 month: Their only month is also their max month, so they are completely omitted from the output."
      ],
      "solutionSQL": "SELECT id,\n       month,\n       SUM(salary) OVER (\n           PARTITION BY id\n           ORDER BY month\n           RANGE BETWEEN 2 PRECEDING AND CURRENT ROW\n       ) AS Salary\nFROM Employee\nWHERE (id, month) NOT IN (\n    SELECT id, MAX(month)\n    FROM Employee\n    GROUP BY id\n)\nORDER BY id ASC, month DESC;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT id, month,",
          "exp": "Emits employee ID and active month."
        },
        {
          "clause": "SUM(salary) OVER (PARTITION BY id ORDER BY month RANGE BETWEEN 2 PRECEDING AND CURRENT ROW) AS Salary",
          "exp": "Computes 3-month rolling sum."
        },
        {
          "clause": "WHERE (id, month) NOT IN (...)",
          "exp": "Excludes the employee's latest recorded month."
        },
        {
          "clause": "ORDER BY id ASC, month DESC",
          "exp": "Sorts by ID ascending, then chronological month descending."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Self-Join 3-Month Range",
          "complexity": "O(N^2)",
          "sql": "SELECT e1.id, e1.month, SUM(e2.salary) AS Salary\nFROM Employee e1\nJOIN Employee e2 ON e1.id = e2.id AND e2.month BETWEEN e1.month - 2 AND e1.month\nWHERE (e1.id, e1.month) NOT IN (SELECT id, MAX(month) FROM Employee GROUP BY id)\nGROUP BY e1.id, e1.month\nORDER BY e1.id ASC, e1.month DESC;",
          "explanation": "Pre-window function self-join matching records within a 2-month lookback window."
        }
      ]
    },
    {
      "id": 586,
      "title": "Customer Placing the Largest Number of Orders",
      "difficulty": "Easy",
      "acceptance": "75.4%",
      "interviewFreq": "Very High • Twitter, Amazon",
      "companies": [
        "Twitter",
        "Amazon"
      ],
      "prompt": "Write a solution to find the customer_number for the customer who has placed the largest number of orders.\nThe test cases are generated so that exactly one customer will have placed more orders than any other customer.",
      "sampleInput": {
        "table": "orders",
        "columns": [
          "order_number",
          "customer_number"
        ],
        "rows": [
          [
            1,
            1
          ],
          [
            2,
            2
          ],
          [
            3,
            3
          ],
          [
            4,
            3
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "customer_number"
        ],
        "rows": [
          [
            3
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #586: TOP ORDER FREQUENCY</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Orders</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Cust 1: 1 order</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Cust 2: 1 order</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Cust 3: 2 orders</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">GROUP BY customer_number\\nORDER BY COUNT(*) DESC LIMIT 1</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Top Customer</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">customer_number: 3</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Group orders by customer_number.",
        "Sort by COUNT(*) descending to place the customer with the highest volume at the top.",
        "Use LIMIT 1 to return the winner."
      ],
      "trapsAndEdgeCases": [
        "Ties handling: The problem explicitly guarantees exactly one customer has the maximum order count."
      ],
      "solutionSQL": "SELECT customer_number\nFROM orders\nGROUP BY customer_number\nORDER BY COUNT(*) DESC\nLIMIT 1;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT customer_number",
          "exp": "Emits the customer identifier."
        },
        {
          "clause": "FROM orders GROUP BY customer_number",
          "exp": "Aggregates orders per customer."
        },
        {
          "clause": "ORDER BY COUNT(*) DESC LIMIT 1",
          "exp": "Extracts the customer with the highest order count."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Window DENSE_RANK for Ties",
          "complexity": "O(N log N)",
          "sql": "WITH Ranked AS (\n  SELECT customer_number, DENSE_RANK() OVER (ORDER BY COUNT(*) DESC) AS rnk\n  FROM orders GROUP BY customer_number\n)\nSELECT customer_number FROM Ranked WHERE rnk = 1;",
          "explanation": "Handles potential ties by outputting all customers tied for first place."
        }
      ]
    },
    {
      "id": 602,
      "title": "Friend Requests II: Who Has the Most Friends",
      "difficulty": "Medium",
      "acceptance": "61.3%",
      "interviewFreq": "Very High • Meta, Amazon",
      "companies": [
        "Meta",
        "Amazon"
      ],
      "prompt": "Write a solution to find the people who have the most friends and the most friends number. The test cases are generated so that only one person has the most friends.",
      "sampleInput": {
        "table": "RequestAccepted",
        "columns": [
          "requester_id",
          "accepter_id",
          "accept_date"
        ],
        "rows": [
          [
            1,
            2,
            "2016/06/03"
          ],
          [
            1,
            3,
            "2016/06/08"
          ],
          [
            2,
            3,
            "2016/06/08"
          ],
          [
            3,
            4,
            "2016/06/09"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "id",
          "num"
        ],
        "rows": [
          [
            3,
            3
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #602: BIDIRECTIONAL DEGREE CENTRALITY</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Friendships</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">1 - 2</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">1 - 3</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">2 - 3</text><text x=\"14\" y=\"96\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">3 - 4</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">UNION ALL Projections\\nGROUP BY id ORDER BY COUNT(*) DESC</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Most Connected</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">User 3: 3 friends (👑)</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Friendship is bidirectional: being requester or accepter both count as 1 friend.",
        "Project requester_id AS id and accepter_id AS id using UNION ALL to preserve all occurrences.",
        "Group by id, count occurrences, and extract the top user with LIMIT 1."
      ],
      "trapsAndEdgeCases": [
        "UNION deduplication trap: Using UNION collapses duplicate entries, undercounting friends. Always use UNION ALL."
      ],
      "solutionSQL": "WITH AllFriends AS (\n    SELECT requester_id AS id FROM RequestAccepted\n    UNION ALL\n    SELECT accepter_id AS id FROM RequestAccepted\n)\nSELECT id, COUNT(*) AS num\nFROM AllFriends\nGROUP BY id\nORDER BY num DESC\nLIMIT 1;",
      "lineByLineExplanation": [
        {
          "clause": "WITH AllFriends AS (SELECT requester_id AS id ... UNION ALL SELECT accepter_id AS id)",
          "exp": "Normalizes both endpoints into a single stream."
        },
        {
          "clause": "SELECT id, COUNT(*) AS num",
          "exp": "Counts total friend degree per user."
        },
        {
          "clause": "GROUP BY id ORDER BY num DESC LIMIT 1",
          "exp": "Ranks by degree and emits the top user."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Subquery Inline Derivation",
          "complexity": "O(N log N)",
          "sql": "SELECT id, COUNT(*) AS num\nFROM (\n    SELECT requester_id AS id FROM RequestAccepted\n    UNION ALL\n    SELECT accepter_id AS id FROM RequestAccepted\n) t\nGROUP BY id\nORDER BY num DESC\nLIMIT 1;",
          "explanation": "Equivalent ANSI standard inline derived table."
        }
      ]
    },
    {
      "id": 603,
      "title": "Consecutive Available Seats",
      "difficulty": "Easy",
      "acceptance": "67.8%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Find all the consecutive available seats in the cinema. Return the result table ordered by seat_id in ascending order.",
      "sampleInput": {
        "table": "Cinema",
        "columns": [
          "seat_id",
          "free"
        ],
        "rows": [
          [
            1,
            1
          ],
          [
            2,
            0
          ],
          [
            3,
            1
          ],
          [
            4,
            1
          ],
          [
            5,
            1
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "seat_id"
        ],
        "rows": [
          [
            3
          ],
          [
            4
          ],
          [
            5
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #603: CONSECUTIVE FREE SEATS</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Cinema</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Seat 1: Free (1)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Seat 2: Taken (0)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Seats 3,4,5: Free (1)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">c1.free=1 AND c2.free=1\\nAND ABS(c1.id - c2.id) = 1</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Consecutive</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">seat_id: 3</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">seat_id: 4</text><text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">seat_id: 5</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Join the table to itself on consecutive seat IDs: ABS(c1.seat_id - c2.seat_id) = 1.",
        "Filter for rows where both seats are free: c1.free = 1 AND c2.free = 1.",
        "Select DISTINCT c1.seat_id ordered by seat_id ASC."
      ],
      "trapsAndEdgeCases": [
        "Duplicate seat listings: A seat flanked by two available seats (e.g., seat 4 surrounded by 3 and 5) will match twice; DISTINCT is mandatory."
      ],
      "solutionSQL": "SELECT DISTINCT c1.seat_id\nFROM Cinema c1\nJOIN Cinema c2\n  ON ABS(c1.seat_id - c2.seat_id) = 1\nWHERE c1.free = 1 AND c2.free = 1\nORDER BY c1.seat_id ASC;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT DISTINCT c1.seat_id",
          "exp": "Emits unique available seat IDs."
        },
        {
          "clause": "FROM Cinema c1 JOIN Cinema c2",
          "exp": "Self-joins cinema seating table."
        },
        {
          "clause": "ON ABS(c1.seat_id - c2.seat_id) = 1",
          "exp": "Pairs adjacent neighbor seats."
        },
        {
          "clause": "WHERE c1.free = 1 AND c2.free = 1",
          "exp": "Ensures both adjacent seats are vacant."
        },
        {
          "clause": "ORDER BY c1.seat_id ASC",
          "exp": "Orders in ascending sequence."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Window LEAD / LAG",
          "complexity": "O(N log N)",
          "sql": "SELECT seat_id\nFROM (\n  SELECT seat_id, free,\n         LAG(free) OVER (ORDER BY seat_id) AS prev_free,\n         LEAD(free) OVER (ORDER BY seat_id) AS next_free\n  FROM Cinema\n) t\nWHERE free = 1 AND (prev_free = 1 OR next_free = 1)\nORDER BY seat_id;",
          "explanation": "Window function approach checking either immediate preceding or succeeding seat availability."
        }
      ]
    },
    {
      "id": 612,
      "title": "Shortest Distance in a Plane",
      "difficulty": "Medium",
      "acceptance": "60.9%",
      "interviewFreq": "High • Twitter, Uber",
      "companies": [
        "Twitter",
        "Uber"
      ],
      "prompt": "Write a solution to report the shortest distance between any two points from the Point2D table. Round the distance to 2 decimal places.",
      "sampleInput": {
        "table": "Point2D",
        "columns": [
          "x",
          "y"
        ],
        "rows": [
          [
            -1,
            -1
          ],
          [
            0,
            0
          ],
          [
            -1,
            -2
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "shortest"
        ],
        "rows": [
          [
            1
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #612: 2D EUCLIDEAN DISTANCE</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Point2D</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P1: (-1, -1)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P2: (0, 0)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P3: (-1, -2)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">SQRT((p1.x-p2.x)^2 +\\n(p1.y-p2.y)^2)</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Shortest Distance</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">shortest: 1.00 (between P1 & P3)</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Join Point2D with itself where points are distinct (p1.x, p1.y) != (p2.x, p2.y).",
        "Calculate 2D Euclidean distance: SQRT(POW(p1.x - p2.x, 2) + POW(p1.y - p2.y, 2)).",
        "Enforce non-symmetric pairing (e.g. p1.x < p2.x OR (p1.x = p2.x AND p1.y < p2.y)) to avoid comparing a point with itself.",
        "Round the minimum distance to 2 decimal places."
      ],
      "trapsAndEdgeCases": [
        "Zero distance self-comparison: Comparing a point to itself yields 0.00; inequality join condition is required."
      ],
      "solutionSQL": "SELECT ROUND(MIN(SQRT(POW(p1.x - p2.x, 2) + POW(p1.y - p2.y, 2))), 2) AS shortest\nFROM Point2D p1\nJOIN Point2D p2\n  ON (p1.x < p2.x) OR (p1.x = p2.x AND p1.y < p2.y);",
      "lineByLineExplanation": [
        {
          "clause": "SELECT ROUND(MIN(SQRT(...)), 2) AS shortest",
          "exp": "Computes minimum Euclidean distance rounded to 2 decimal places."
        },
        {
          "clause": "FROM Point2D p1 JOIN Point2D p2",
          "exp": "Self-joins Cartesian coordinates."
        },
        {
          "clause": "ON (p1.x < p2.x) OR (p1.x = p2.x AND p1.y < p2.y)",
          "exp": "Strictly pairs unique distinct coordinate pairs."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Standard Inequality Self-Join",
          "complexity": "O(N^2)",
          "sql": "SELECT ROUND(MIN(SQRT(POW(p1.x - p2.x, 2) + POW(p1.y - p2.y, 2))), 2) AS shortest\nFROM Point2D p1\nJOIN Point2D p2 ON NOT (p1.x = p2.x AND p1.y = p2.y);",
          "explanation": "Simple != inequality across coordinates."
        }
      ]
    },
    {
      "id": 614,
      "title": "Second Degree Follower",
      "difficulty": "Medium",
      "acceptance": "37.5%",
      "interviewFreq": "High • Twitter, Meta",
      "companies": [
        "Twitter",
        "Meta"
      ],
      "prompt": "In social networks, a second-degree follower is a user who:\n- follows at least one user, and\n- has at least one follower.\nWrite a solution to report the second-degree followers and the number of their followers. Return the result table ordered by follower in alphabetical order.",
      "sampleInput": {
        "table": "Follow",
        "columns": [
          "followee",
          "follower"
        ],
        "rows": [
          [
            "Alice",
            "Bob"
          ],
          [
            "Bob",
            "Cena"
          ],
          [
            "Bob",
            "Dan"
          ],
          [
            "Bob",
            "Alice"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "follower",
          "num"
        ],
        "rows": [
          [
            "Bob",
            3
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #614: SECOND DEGREE FOLLOWER GRAPH FILTER</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Follow Edges</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Bob follows Cena</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Alice follows Bob</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Dan follows Bob</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">followee IN (followers)\\nGROUP BY followee</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Second Degree</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">follower: Bob, num: 3</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "A second degree follower is someone who is BOTH followed by others (acts as followee) AND follows someone else (acts as follower).",
        "Filter for followees who exist in the follower column.",
        "Count distinct followers for each such followee.",
        "Order by follower name alphabetically."
      ],
      "trapsAndEdgeCases": [
        "Column renaming trap: The problem asks to alias the person being followed as 'follower' in the final output column header."
      ],
      "solutionSQL": "SELECT followee AS follower,\n       COUNT(DISTINCT follower) AS num\nFROM Follow\nWHERE followee IN (\n    SELECT follower\n    FROM Follow\n)\nGROUP BY followee\nORDER BY follower ASC;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT followee AS follower, COUNT(DISTINCT follower) AS num",
          "exp": "Counts followers for each user, aliasing column as requested."
        },
        {
          "clause": "FROM Follow",
          "exp": "Source social graph table."
        },
        {
          "clause": "WHERE followee IN (SELECT follower FROM Follow)",
          "exp": "Restricts to users who themselves follow at least one person."
        },
        {
          "clause": "GROUP BY followee ORDER BY follower ASC",
          "exp": "Aggregates per user and sorts alphabetically."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "JOIN Filter",
          "complexity": "O(N log N)",
          "sql": "SELECT f1.followee AS follower, COUNT(DISTINCT f1.follower) AS num\nFROM Follow f1\nJOIN Follow f2 ON f1.followee = f2.follower\nGROUP BY f1.followee\nORDER BY follower ASC;",
          "explanation": "Inner join between followee and follower roles."
        }
      ]
    },
    {
      "id": 615,
      "title": "Average Salary: Departments VS Company",
      "difficulty": "Hard",
      "acceptance": "54.8%",
      "interviewFreq": "Very High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to compare the average salary of each department to the company's average salary for each month. Return result with columns pay_month, department_id, and comparison ('higher', 'lower', or 'same').",
      "sampleInput": {
        "table": "Salary / Employee",
        "columns": [
          "id",
          "employee_id",
          "amount",
          "pay_date",
          "department_id"
        ],
        "rows": [
          [
            1,
            1,
            9000,
            "2017-03-31",
            1
          ],
          [
            2,
            2,
            6000,
            "2017-03-31",
            2
          ],
          [
            3,
            3,
            10000,
            "2017-03-31",
            2
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "pay_month",
          "department_id",
          "comparison"
        ],
        "rows": [
          [
            "2017-03",
            1,
            "higher"
          ],
          [
            "2017-03",
            2,
            "lower"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #615: DEPARTMENT VS COMPANY MONTHLY BENCHMARK</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">March Salaries</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Dept 1 Avg: $9,000</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Dept 2 Avg: $8,000</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Company Avg: $8,333</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">CASE WHEN dept_avg > comp_avg\\nTHEN 'higher' ...</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Benchmark</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Dept 1: higher</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Dept 2: lower</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Format pay_date to YYYY-MM: DATE_FORMAT(pay_date, '%Y-%m').",
        "Calculate company monthly average salary using AVG(amount) OVER (PARTITION BY pay_month).",
        "Calculate department monthly average salary using AVG(amount) OVER (PARTITION BY pay_month, department_id).",
        "Compare the two averages using CASE WHEN."
      ],
      "trapsAndEdgeCases": [
        "Precision matching: Use standard floating point comparisons; 'same' triggers when department avg equals company avg exactly."
      ],
      "solutionSQL": "WITH MonthlyAvgs AS (\n    SELECT DISTINCT\n           DATE_FORMAT(s.pay_date, '%Y-%m') AS pay_month,\n           e.department_id,\n           AVG(s.amount) OVER (PARTITION BY DATE_FORMAT(s.pay_date, '%Y-%m'), e.department_id) AS dept_avg,\n           AVG(s.amount) OVER (PARTITION BY DATE_FORMAT(s.pay_date, '%Y-%m')) AS comp_avg\n    FROM Salary s\n    JOIN Employee e ON s.employee_id = e.employee_id\n)\nSELECT pay_month,\n       department_id,\n       CASE\n           WHEN dept_avg > comp_avg THEN 'higher'\n           WHEN dept_avg < comp_avg THEN 'lower'\n           ELSE 'same'\n       END AS comparison\nFROM MonthlyAvgs;",
      "lineByLineExplanation": [
        {
          "clause": "WITH MonthlyAvgs AS (...)",
          "exp": "Computes department and company averages in parallel via window partitions."
        },
        {
          "clause": "SELECT pay_month, department_id,",
          "exp": "Emits month and department."
        },
        {
          "clause": "CASE WHEN dept_avg > comp_avg THEN 'higher' ... END AS comparison",
          "exp": "Classifies department performance against company baseline."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Two-Step Aggregation Join",
          "complexity": "O(N log N)",
          "sql": "WITH Dept AS (\n  SELECT DATE_FORMAT(s.pay_date, '%Y-%m') AS pay_month, e.department_id, AVG(s.amount) AS dept_avg\n  FROM Salary s JOIN Employee e ON s.employee_id = e.employee_id\n  GROUP BY 1, 2\n), Comp AS (\n  SELECT DATE_FORMAT(pay_date, '%Y-%m') AS pay_month, AVG(amount) AS comp_avg\n  FROM Salary GROUP BY 1\n)\nSELECT d.pay_month, d.department_id,\n       CASE WHEN d.dept_avg > c.comp_avg THEN 'higher' WHEN d.dept_avg < c.comp_avg THEN 'lower' ELSE 'same' END AS comparison\nFROM Dept d JOIN Comp c ON d.pay_month = c.pay_month;",
          "explanation": "Aggregates department and company tables independently and joins on pay_month."
        }
      ]
    },
    {
      "id": 1077,
      "title": "Project Employees III",
      "difficulty": "Medium",
      "acceptance": "75.8%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to report the most experienced employee in each project. In case of a tie, report all employees with the maximum number of experience years.",
      "sampleInput": {
        "table": "Project / Employee",
        "columns": [
          "project_id",
          "employee_id",
          "experience_years"
        ],
        "rows": [
          [
            1,
            1,
            3
          ],
          [
            1,
            2,
            2
          ],
          [
            1,
            3,
            3
          ],
          [
            2,
            1,
            3
          ],
          [
            2,
            4,
            2
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "project_id",
          "employee_id"
        ],
        "rows": [
          [
            1,
            1
          ],
          [
            1,
            3
          ],
          [
            2,
            1
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1077: MOST EXPERIENCED PROJECT MEMBERS</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Project 1</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Emp 1: 3 yrs (Max)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Emp 2: 2 yrs</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Emp 3: 3 yrs (Max)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">DENSE_RANK() OVER\\n(PARTITION BY project_id ORDER BY yrs DESC)</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Selected</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Proj 1 -> Emp 1</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Proj 1 -> Emp 3</text><text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Proj 2 -> Emp 1</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Join Project and Employee on employee_id.",
        "Partition by project_id and rank employees by experience_years descending using DENSE_RANK().",
        "Filter for rnk = 1 to capture all ties."
      ],
      "trapsAndEdgeCases": [
        "Ties must be included: Using ROW_NUMBER() would arbitrarily drop ties; DENSE_RANK() or RANK() is required."
      ],
      "solutionSQL": "WITH Ranked AS (\n    SELECT p.project_id,\n           p.employee_id,\n           DENSE_RANK() OVER (\n               PARTITION BY p.project_id\n               ORDER BY e.experience_years DESC\n           ) AS rnk\n    FROM Project p\n    JOIN Employee e ON p.employee_id = e.employee_id\n)\nSELECT project_id, employee_id\nFROM Ranked\nWHERE rnk = 1;",
      "lineByLineExplanation": [
        {
          "clause": "WITH Ranked AS (...)",
          "exp": "Ranks employees within each project by experience."
        },
        {
          "clause": "SELECT project_id, employee_id FROM Ranked WHERE rnk = 1",
          "exp": "Filters for top experience rank including ties."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Correlated Subquery MAX",
          "complexity": "O(N^2)",
          "sql": "SELECT p.project_id, p.employee_id\nFROM Project p\nJOIN Employee e ON p.employee_id = e.employee_id\nWHERE (p.project_id, e.experience_years) IN (\n    SELECT p2.project_id, MAX(e2.experience_years)\n    FROM Project p2\n    JOIN Employee e2 ON p2.employee_id = e2.employee_id\n    GROUP BY p2.project_id\n);",
          "explanation": "Classic tuple IN filter against max experience years per project."
        }
      ]
    },
    {
      "id": 1082,
      "title": "Sales Analysis I",
      "difficulty": "Easy",
      "acceptance": "74.1%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to report the best seller by total sales price. If there is a tie, report them all.",
      "sampleInput": {
        "table": "Sales",
        "columns": [
          "seller_id",
          "product_id",
          "buyer_id",
          "sale_date",
          "quantity",
          "price"
        ],
        "rows": [
          [
            1,
            1,
            1,
            "2019-01-21",
            2,
            2000
          ],
          [
            1,
            2,
            2,
            "2019-02-17",
            1,
            800
          ],
          [
            2,
            2,
            3,
            "2019-06-02",
            1,
            800
          ],
          [
            3,
            3,
            4,
            "2019-05-13",
            2,
            2800
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "seller_id"
        ],
        "rows": [
          [
            1
          ],
          [
            3
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1082: TOP REVENUE SELLERS (TIES INCLUDED)</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Sales Summary</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Seller 1: $2,800 (Max)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Seller 2: $800</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Seller 3: $2,800 (Max)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">DENSE_RANK() OVER\\n(ORDER BY SUM(price) DESC) = 1</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Best Sellers</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">seller_id: 1</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">seller_id: 3</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Group sales by seller_id and sum total revenue: SUM(price).",
        "Rank sellers by total sales descending with DENSE_RANK().",
        "Filter for rnk = 1 to include all tied top sellers."
      ],
      "trapsAndEdgeCases": [
        "Ties omission: ORDER BY SUM(price) DESC LIMIT 1 fails on ties; DENSE_RANK() is required."
      ],
      "solutionSQL": "WITH SellerRevenue AS (\n    SELECT seller_id,\n           DENSE_RANK() OVER (ORDER BY SUM(price) DESC) AS rnk\n    FROM Sales\n    GROUP BY seller_id\n)\nSELECT seller_id\nFROM SellerRevenue\nWHERE rnk = 1;",
      "lineByLineExplanation": [
        {
          "clause": "WITH SellerRevenue AS (SELECT seller_id, DENSE_RANK() OVER (ORDER BY SUM(price) DESC) AS rnk ...)",
          "exp": "Aggregates revenue and ranks sellers."
        },
        {
          "clause": "SELECT seller_id FROM SellerRevenue WHERE rnk = 1",
          "exp": "Filters for top rank."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "HAVING SUM >= ALL",
          "complexity": "O(N^2)",
          "sql": "SELECT seller_id FROM Sales GROUP BY seller_id\nHAVING SUM(price) >= ALL(SELECT SUM(price) FROM Sales GROUP BY seller_id);",
          "explanation": "Subquery with >= ALL quantifier."
        }
      ]
    },
    {
      "id": 1083,
      "title": "Sales Analysis II",
      "difficulty": "Easy",
      "acceptance": "52.3%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to report the buyers who have bought S8 but not iPhone. Note that S8 and iPhone are products presented in the Product table.",
      "sampleInput": {
        "table": "Product / Sales",
        "columns": [
          "product_id",
          "product_name",
          "buyer_id"
        ],
        "rows": [
          [
            1,
            "S8",
            1
          ],
          [
            2,
            "G4",
            1
          ],
          [
            3,
            "iPhone",
            2
          ],
          [
            1,
            "S8",
            3
          ],
          [
            3,
            "iPhone",
            3
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "buyer_id"
        ],
        "rows": [
          [
            1
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1083: SET DIFFERENCE: BOUGHT S8 BUT NOT IPHONE</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Buyer History</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Buyer 1: S8, G4 (Valid ✓)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Buyer 2: iPhone (No S8 ❌)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Buyer 3: S8, iPhone (Has iPhone ❌)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">SUM(prod='S8') > 0 AND\\nSUM(prod='iPhone') = 0</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Qualifying Buyers</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">buyer_id: 1</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Join Sales with Product to get product_name per sale.",
        "Group by buyer_id.",
        "Apply HAVING filter: SUM(product_name = 'S8') > 0 AND SUM(product_name = 'iPhone') = 0."
      ],
      "trapsAndEdgeCases": [
        "Buyers who bought both: Buyer 3 bought both S8 and iPhone; they must be excluded."
      ],
      "solutionSQL": "SELECT s.buyer_id\nFROM Sales s\nJOIN Product p ON s.product_id = p.product_id\nGROUP BY s.buyer_id\nHAVING SUM(p.product_name = 'S8') > 0\n   AND SUM(p.product_name = 'iPhone') = 0;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT s.buyer_id FROM Sales s JOIN Product p ON s.product_id = p.product_id",
          "exp": "Joins transactions with product catalog."
        },
        {
          "clause": "GROUP BY s.buyer_id",
          "exp": "Aggregates per buyer."
        },
        {
          "clause": "HAVING SUM(p.product_name = 'S8') > 0 AND SUM(p.product_name = 'iPhone') = 0",
          "exp": "Demands at least one S8 purchase and strictly zero iPhone purchases."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "EXCEPT / NOT IN",
          "complexity": "O(N log N)",
          "sql": "SELECT DISTINCT buyer_id FROM Sales s JOIN Product p ON s.product_id = p.product_id WHERE p.product_name = 'S8'\nAND buyer_id NOT IN (\n  SELECT buyer_id FROM Sales s JOIN Product p ON s.product_id = p.product_id WHERE p.product_name = 'iPhone'\n);",
          "explanation": "Set difference using NOT IN subquery."
        }
      ]
    },
    {
      "id": 1084,
      "title": "Sales Analysis III",
      "difficulty": "Easy",
      "acceptance": "44.9%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to report the products that were only sold in the first quarter of 2019. That is, between 2019-01-01 and 2019-03-31 inclusive.",
      "sampleInput": {
        "table": "Product / Sales",
        "columns": [
          "product_id",
          "product_name",
          "sale_date"
        ],
        "rows": [
          [
            1,
            "S8",
            "2019-01-21"
          ],
          [
            1,
            "S8",
            "2019-02-17"
          ],
          [
            2,
            "G4",
            "2019-02-17"
          ],
          [
            2,
            "G4",
            "2019-06-02"
          ],
          [
            3,
            "iPhone",
            "2019-05-13"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "product_id",
          "product_name"
        ],
        "rows": [
          [
            1,
            "S8"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1084: STRICT DATE BOUNDARY CONTAINMENT</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Sales Dates</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P1: Jan 21, Feb 17 (Q1 only ✓)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P2: Feb 17, Jun 02 (Crosses into Q2 ❌)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P3: May 13 (Q2 only ❌)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">MIN(sale_date) >= '2019-01-01'\\nAND MAX(sale_date) <= '2019-03-31'</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Strict Q1 Only</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">P1: S8</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "A product is sold 'only' in Q1 if its minimum sale date is >= 2019-01-01 AND its maximum sale date is <= 2019-03-31.",
        "Group Sales by product_id and enforce this min/max boundary in the HAVING clause.",
        "Join to Product to return product_id and product_name."
      ],
      "trapsAndEdgeCases": [
        "Partial Q1 sales: If a product was sold in Q1 and also in Q2 (like P2), it must be disqualified."
      ],
      "solutionSQL": "SELECT p.product_id, p.product_name\nFROM Product p\nJOIN Sales s ON p.product_id = s.product_id\nGROUP BY p.product_id, p.product_name\nHAVING MIN(s.sale_date) >= '2019-01-01'\n   AND MAX(s.sale_date) <= '2019-03-31';",
      "lineByLineExplanation": [
        {
          "clause": "SELECT p.product_id, p.product_name",
          "exp": "Projects product identifiers."
        },
        {
          "clause": "FROM Product p JOIN Sales s ON p.product_id = s.product_id",
          "exp": "Joins products with transactions."
        },
        {
          "clause": "GROUP BY p.product_id, p.product_name",
          "exp": "Aggregates dates per product."
        },
        {
          "clause": "HAVING MIN(s.sale_date) >= '2019-01-01' AND MAX(s.sale_date) <= '2019-03-31'",
          "exp": "Ensures all sales fall exclusively within Q1 2019."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "NOT IN Subquery",
          "complexity": "O(N log N)",
          "sql": "SELECT product_id, product_name FROM Product\nWHERE product_id IN (SELECT product_id FROM Sales WHERE sale_date BETWEEN '2019-01-01' AND '2019-03-31')\n  AND product_id NOT IN (SELECT product_id FROM Sales WHERE sale_date < '2019-01-01' OR sale_date > '2019-03-31');",
          "explanation": "Set exclusion checking for any sales outside the target window."
        }
      ]
    },
    {
      "id": 1098,
      "title": "Unpopular Books",
      "difficulty": "Medium",
      "acceptance": "44.7%",
      "interviewFreq": "High • Bloomberg, Amazon",
      "companies": [
        "Bloomberg",
        "Amazon"
      ],
      "prompt": "Write a solution to report the books that have sold less than 10 copies in the last year, excluding books that have been available for less than one month from today (assume today is 2019-06-23).",
      "sampleInput": {
        "table": "Books / Orders",
        "columns": [
          "book_id",
          "name",
          "available_from",
          "quantity",
          "dispatch_date"
        ],
        "rows": [
          [
            1,
            "Kalila And Demna",
            "2010-01-01",
            2,
            "2018-07-26"
          ],
          [
            2,
            "28 Letters",
            "2012-05-12",
            8,
            "2019-06-01"
          ],
          [
            3,
            "The Hobbit",
            "2019-06-10",
            0,
            null
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "book_id",
          "name"
        ],
        "rows": [
          [
            1,
            "Kalila And Demna"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1098: RECENT AVAILABILITY & LOW VOLUME FILTER</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Books & 1-Yr Sales</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">B1: Sold 2 in past yr (Unpopular ✓)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">B2: Sold 28 in past yr (Popular ❌)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">B3: Avail June 10 (< 1 mo ❌)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">available_from < '2019-05-23'\\nAND SUM(past_yr_qty) < 10</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Unpopular</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">book_id: 1</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Availability threshold: Exclude books available less than 1 month before 2019-06-23 -> available_from < '2019-05-23'.",
        "Sales window: Only count orders placed in the last year: dispatch_date BETWEEN '2018-06-23' AND '2019-06-23'.",
        "LEFT JOIN Books with the filtered orders and group by book_id.",
        "HAVING IFNULL(SUM(quantity), 0) < 10."
      ],
      "trapsAndEdgeCases": [
        "Join predicate placement: Date filtering for orders must be in the ON clause, NOT the WHERE clause, otherwise books with 0 sales are improperly filtered out."
      ],
      "solutionSQL": "SELECT b.book_id, b.name\nFROM Books b\nLEFT JOIN Orders o\n  ON b.book_id = o.book_id\n AND o.dispatch_date BETWEEN '2018-06-23' AND '2019-06-23'\nWHERE b.available_from < '2019-05-23'\nGROUP BY b.book_id, b.name\nHAVING IFNULL(SUM(o.quantity), 0) < 10;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT b.book_id, b.name",
          "exp": "Projects book details."
        },
        {
          "clause": "FROM Books b LEFT JOIN Orders o ON ... AND o.dispatch_date BETWEEN '2018-06-23' AND '2019-06-23'",
          "exp": "Preserves books with zero orders in the past year."
        },
        {
          "clause": "WHERE b.available_from < '2019-05-23'",
          "exp": "Filters out books launched less than a month ago."
        },
        {
          "clause": "GROUP BY b.book_id, b.name HAVING IFNULL(SUM(o.quantity), 0) < 10",
          "exp": "Filters for books with fewer than 10 copies sold."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Subquery Aggregation",
          "complexity": "O(N log N)",
          "sql": "SELECT book_id, name FROM Books\nWHERE available_from < '2019-05-23'\n  AND book_id NOT IN (\n    SELECT book_id FROM Orders\n    WHERE dispatch_date BETWEEN '2018-06-23' AND '2019-06-23'\n    GROUP BY book_id HAVING SUM(quantity) >= 10\n);",
          "explanation": "Subquery identifying books with >= 10 sales and excluding them."
        }
      ]
    },
    {
      "id": 1112,
      "title": "Highest Grade For Each Student",
      "difficulty": "Medium",
      "acceptance": "71.6%",
      "interviewFreq": "High • Coursera, Amazon",
      "companies": [
        "Coursera",
        "Amazon"
      ],
      "prompt": "Write a solution to find the highest grade with its corresponding course for each student. In case of a tie, you should find the course with the smallest course_id. Return the result table ordered by student_id in ascending order.",
      "sampleInput": {
        "table": "Enrollments",
        "columns": [
          "student_id",
          "course_id",
          "grade"
        ],
        "rows": [
          [
            2,
            2,
            95
          ],
          [
            2,
            3,
            95
          ],
          [
            1,
            1,
            90
          ],
          [
            1,
            2,
            99
          ],
          [
            3,
            1,
            80
          ],
          [
            3,
            2,
            75
          ],
          [
            3,
            3,
            82
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "student_id",
          "course_id",
          "grade"
        ],
        "rows": [
          [
            1,
            2,
            99
          ],
          [
            2,
            2,
            95
          ],
          [
            3,
            3,
            82
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1112: TIE-BREAKING ON LOWEST COURSE ID</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Enrollments</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">S2: C2 (95), C3 (95) (Tie)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">S1: C1 (90), C2 (99)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">S3: C3 (82)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">ROW_NUMBER() OVER(PARTITION BY student\\nORDER BY grade DESC, course_id ASC)</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Selected</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">S1: C2 (99)</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">S2: C2 (95) (Lower course_id)</text><text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">S3: C3 (82)</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Partition by student_id.",
        "Order by grade DESC to find the highest score.",
        "Order by course_id ASC to break ties by lowest course number.",
        "Assign ROW_NUMBER() and filter WHERE rnk = 1."
      ],
      "trapsAndEdgeCases": [
        "DENSE_RANK() trap: Using DENSE_RANK() returns both courses in a tie; ROW_NUMBER() is required to strictly pick one course."
      ],
      "solutionSQL": "WITH RankedCourses AS (\n    SELECT student_id,\n           course_id,\n           grade,\n           ROW_NUMBER() OVER (\n               PARTITION BY student_id\n               ORDER BY grade DESC, course_id ASC\n           ) AS rnk\n    FROM Enrollments\n)\nSELECT student_id, course_id, grade\nFROM RankedCourses\nWHERE rnk = 1\nORDER BY student_id ASC;",
      "lineByLineExplanation": [
        {
          "clause": "WITH RankedCourses AS (...)",
          "exp": "Ranks courses per student by grade desc, course_id asc."
        },
        {
          "clause": "SELECT student_id, course_id, grade FROM RankedCourses WHERE rnk = 1",
          "exp": "Picks top course per student."
        },
        {
          "clause": "ORDER BY student_id ASC",
          "exp": "Sorts final output by student ID."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Tuple IN Subquery",
          "complexity": "O(N^2)",
          "sql": "SELECT student_id, MIN(course_id) AS course_id, grade\nFROM Enrollments\nWHERE (student_id, grade) IN (\n    SELECT student_id, MAX(grade) FROM Enrollments GROUP BY student_id\n)\nGROUP BY student_id, grade\nORDER BY student_id ASC;",
          "explanation": "Finds max grade per student and aggregates with MIN(course_id)."
        }
      ]
    },
    {
      "id": 1126,
      "title": "Active Businesses",
      "difficulty": "Medium",
      "acceptance": "68.2%",
      "interviewFreq": "High • Yelp, Google",
      "companies": [
        "Yelp",
        "Google"
      ],
      "prompt": "An active business is a business that has more than one event_type with occurrences greater than the average occurrences of that event_type among all businesses.\nWrite a solution to find all active businesses.",
      "sampleInput": {
        "table": "Events",
        "columns": [
          "business_id",
          "event_type",
          "occurences"
        ],
        "rows": [
          [
            1,
            "reviews",
            7
          ],
          [
            3,
            "reviews",
            3
          ],
          [
            1,
            "ads",
            11
          ],
          [
            2,
            "ads",
            7
          ],
          [
            3,
            "ads",
            6
          ],
          [
            1,
            "photo",
            3
          ],
          [
            2,
            "photo",
            1
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "business_id"
        ],
        "rows": [
          [
            1
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1126: MULTI-EVENT ABOVE-AVERAGE BENCHMARK</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Events</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">B1: reviews=7 (> avg 5)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">B1: ads=11 (> avg 8)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">B1 has 2 above-average events</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">AVG(occurences) OVER(PARTITION BY type)\\nHAVING COUNT(*) > 1</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Active Business</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">business_id: 1</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Calculate the average occurrences for each event_type across all businesses using AVG(occurences) OVER (PARTITION BY event_type).",
        "Filter for rows where occurrences > event_type average.",
        "Group by business_id and filter HAVING COUNT(*) > 1."
      ],
      "trapsAndEdgeCases": [
        "Strict inequality: Must be strictly greater than average (occurences > avg_occurences)."
      ],
      "solutionSQL": "WITH EventAverages AS (\n    SELECT business_id,\n           event_type,\n           occurences,\n           AVG(occurences) OVER (PARTITION BY event_type) AS avg_occ\n    FROM Events\n)\nSELECT business_id\nFROM EventAverages\nWHERE occurences > avg_occ\nGROUP BY business_id\nHAVING COUNT(*) > 1;",
      "lineByLineExplanation": [
        {
          "clause": "WITH EventAverages AS (...)",
          "exp": "Computes event category averages via window function."
        },
        {
          "clause": "SELECT business_id FROM EventAverages",
          "exp": "Source filtered events."
        },
        {
          "clause": "WHERE occurences > avg_occ",
          "exp": "Retains only above-average event records."
        },
        {
          "clause": "GROUP BY business_id HAVING COUNT(*) > 1",
          "exp": "Demands at least two distinct qualifying events."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "JOIN with Grouped Aggregation",
          "complexity": "O(N log N)",
          "sql": "SELECT e.business_id\nFROM Events e\nJOIN (\n    SELECT event_type, AVG(occurences) AS avg_occ\n    FROM Events\n    GROUP BY event_type\n) avg_t ON e.event_type = avg_t.event_type\nWHERE e.occurences > avg_t.avg_occ\nGROUP BY e.business_id\nHAVING COUNT(*) > 1;",
          "explanation": "Joins against subquery of category averages."
        }
      ]
    },
    {
      "id": 1127,
      "title": "User Purchase Platform",
      "difficulty": "Hard",
      "acceptance": "43.5%",
      "interviewFreq": "Very High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to find the total number of users and the total amount spent using mobile only, desktop only, and both mobile and desktop together for each date.",
      "sampleInput": {
        "table": "Spending",
        "columns": [
          "user_id",
          "spend_date",
          "platform",
          "amount"
        ],
        "rows": [
          [
            1,
            "2019-07-01",
            "mobile",
            100
          ],
          [
            1,
            "2019-07-01",
            "desktop",
            100
          ],
          [
            2,
            "2019-07-01",
            "mobile",
            100
          ],
          [
            2,
            "2019-07-02",
            "mobile",
            100
          ],
          [
            3,
            "2019-07-01",
            "desktop",
            100
          ],
          [
            3,
            "2019-07-02",
            "desktop",
            100
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "spend_date",
          "platform",
          "total_amount",
          "total_users"
        ],
        "rows": [
          [
            "2019-07-01",
            "desktop",
            100,
            1
          ],
          [
            "2019-07-01",
            "mobile",
            100,
            1
          ],
          [
            "2019-07-01",
            "both",
            200,
            1
          ],
          [
            "2019-07-02",
            "desktop",
            100,
            1
          ],
          [
            "2019-07-02",
            "mobile",
            100,
            1
          ],
          [
            "2019-07-02",
            "both",
            0,
            0
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1127: CROSS JOIN PLATFORM GRID WITH ZERO-FILL</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">User Daily Activity</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">U1: Mobile & Desktop -> 'both'</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">U2: Mobile only -> 'mobile'</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">U3: Desktop only -> 'desktop'</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">CROSS JOIN (desktop, mobile, both)\\nLEFT JOIN UserPlatformActivity</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">All Platforms</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">desktop: $100 (1 user)</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">mobile: $100 (1 user)</text><text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">both: $200 (1 user)</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Determine each user's platform per date: if COUNT(DISTINCT platform) = 2 THEN 'both' ELSE MAX(platform).",
        "Generate the full cartesian template grid: all distinct spend_date CROSS JOIN ('desktop', 'mobile', 'both').",
        "LEFT JOIN the template grid with the aggregated user activity.",
        "Aggregate with SUM(amount) and COUNT(user_id), coalescing nulls to 0."
      ],
      "trapsAndEdgeCases": [
        "Zero-spending platform categories: A date might have 0 'both' users; it must still emit a row with total_amount = 0 and total_users = 0."
      ],
      "solutionSQL": "WITH UserPlatform AS (\n    SELECT spend_date,\n           user_id,\n           CASE WHEN COUNT(DISTINCT platform) = 2 THEN 'both' ELSE MAX(platform) END AS platform,\n           SUM(amount) AS amount\n    FROM Spending\n    GROUP BY spend_date, user_id\n),\nDatePlatformGrid AS (\n    SELECT DISTINCT spend_date, 'desktop' AS platform FROM Spending\n    UNION\n    SELECT DISTINCT spend_date, 'mobile' AS platform FROM Spending\n    UNION\n    SELECT DISTINCT spend_date, 'both' AS platform FROM Spending\n)\nSELECT g.spend_date,\n       g.platform,\n       IFNULL(SUM(u.amount), 0) AS total_amount,\n       COUNT(u.user_id) AS total_users\nFROM DatePlatformGrid g\nLEFT JOIN UserPlatform u\n  ON g.spend_date = u.spend_date\n AND g.platform = u.platform\nGROUP BY g.spend_date, g.platform;",
      "lineByLineExplanation": [
        {
          "clause": "WITH UserPlatform AS (...)",
          "exp": "Classifies each user on each date as 'mobile', 'desktop', or 'both'."
        },
        {
          "clause": "DatePlatformGrid AS (...)",
          "exp": "Creates full Cartesian template of all 3 platforms for every distinct date."
        },
        {
          "clause": "SELECT g.spend_date, g.platform, IFNULL(SUM(u.amount), 0) AS total_amount, COUNT(u.user_id) AS total_users",
          "exp": "Left joins and folds null totals into clean zero-counts."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Explicit CROSS JOIN",
          "complexity": "O(D * 3)",
          "sql": "WITH Platforms AS (SELECT 'desktop' AS platform UNION SELECT 'mobile' UNION SELECT 'both'),\nDates AS (SELECT DISTINCT spend_date FROM Spending),\nGrid AS (SELECT d.spend_date, p.platform FROM Dates d CROSS JOIN Platforms p)\nSELECT ... FROM Grid g LEFT JOIN ...;",
          "explanation": "Modular cross join separation between distinct dates and platform list."
        }
      ]
    },
    {
      "id": 1132,
      "title": "Reported Posts II",
      "difficulty": "Medium",
      "acceptance": "39.6%",
      "interviewFreq": "High • Meta",
      "companies": [
        "Meta"
      ],
      "prompt": "Write a solution to find the average daily percentage of posts that got removed after being reported as spam, rounded to 2 decimal places.",
      "sampleInput": {
        "table": "Actions / Removals",
        "columns": [
          "post_id",
          "action_date",
          "action",
          "extra",
          "remove_date"
        ],
        "rows": [
          [
            1,
            "2019-07-01",
            "report",
            "spam",
            "2019-07-01"
          ],
          [
            2,
            "2019-07-01",
            "report",
            "spam",
            null
          ],
          [
            3,
            "2019-07-01",
            "report",
            "spam",
            null
          ],
          [
            4,
            "2019-07-02",
            "report",
            "spam",
            "2019-07-03"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "average_daily_percent"
        ],
        "rows": [
          [
            75
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1132: DAILY AVERAGE SPAM REMOVAL PERCENTAGE</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Daily Spam Reports</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">July 01: 1 removed / 3 reported = 33.33%</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">July 02: 1 removed / 1 reported = 100.00%</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">AVG(daily_removed / daily_spam) * 100</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Average Rate</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">average_daily_percent: 66.67%</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Filter Actions for action = 'report' AND extra = 'spam'.",
        "For each action_date, count distinct post_ids reported as spam, and distinct post_ids present in Removals.",
        "Calculate daily_percent = (distinct removed / distinct reported) * 100.",
        "Compute AVG(daily_percent) across all qualifying dates and round to 2 decimal places."
      ],
      "trapsAndEdgeCases": [
        "Duplicate report actions: Users may report the same post multiple times on the same date; COUNT(DISTINCT post_id) is mandatory."
      ],
      "solutionSQL": "WITH DailySpam AS (\n    SELECT a.action_date,\n           COUNT(DISTINCT r.post_id) / COUNT(DISTINCT a.post_id) * 100.0 AS daily_percent\n    FROM Actions a\n    LEFT JOIN Removals r ON a.post_id = r.post_id\n    WHERE a.action = 'report' AND a.extra = 'spam'\n    GROUP BY a.action_date\n)\nSELECT ROUND(AVG(daily_percent), 2) AS average_daily_percent\nFROM DailySpam;",
      "lineByLineExplanation": [
        {
          "clause": "WITH DailySpam AS (SELECT a.action_date, COUNT(DISTINCT r.post_id) / COUNT(DISTINCT a.post_id) * 100.0 AS daily_percent ...)",
          "exp": "Calculates the distinct spam removal ratio per date."
        },
        {
          "clause": "SELECT ROUND(AVG(daily_percent), 2) AS average_daily_percent",
          "exp": "Averages daily percentages and rounds to 2 decimals."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Derived Table Inline Average",
          "complexity": "O(N log N)",
          "sql": "SELECT ROUND(AVG(daily_ratio) * 100, 2) AS average_daily_percent\nFROM (\n  SELECT action_date, COUNT(DISTINCT r.post_id) / COUNT(DISTINCT a.post_id) AS daily_ratio\n  FROM Actions a LEFT JOIN Removals r ON a.post_id = r.post_id\n  WHERE a.action = 'report' AND a.extra = 'spam' GROUP BY a.action_date\n) t;",
          "explanation": "Equivalent derived table formatting percentage at outer aggregation."
        }
      ]
    },
    {
      "id": 1158,
      "title": "Market Analysis I",
      "difficulty": "Medium",
      "acceptance": "58.4%",
      "interviewFreq": "Very High • Etsy, Amazon",
      "companies": [
        "Etsy",
        "Amazon"
      ],
      "prompt": "Write a solution to find for each user, the join date and the number of orders they made as a buyer in 2019. Return the result table in any order.",
      "sampleInput": {
        "table": "Users / Orders",
        "columns": [
          "user_id",
          "join_date",
          "order_id",
          "order_date",
          "buyer_id"
        ],
        "rows": [
          [
            1,
            "2018-01-01",
            1,
            "2019-08-01",
            1
          ],
          [
            2,
            "2018-02-09",
            2,
            "2018-08-02",
            2
          ],
          [
            3,
            "2018-01-19",
            null,
            null,
            null
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "buyer_id",
          "join_date",
          "orders_in_2019"
        ],
        "rows": [
          [
            1,
            "2018-01-01",
            1
          ],
          [
            2,
            "2018-02-09",
            0
          ],
          [
            3,
            "2018-01-19",
            0
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1158: 2019 ORDER VOLUME WITH ZERO-COUNT PRESERVATION</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Users & Orders</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">U1: 1 order in 2019</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">U2: 1 order in 2018 (Not 2019)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">U3: 0 orders total</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">LEFT JOIN Orders ON buyer_id = user_id\\nAND YEAR(order_date) = 2019</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Result</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">U1: orders_in_2019 = 1</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">U2: orders_in_2019 = 0</text><text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">U3: orders_in_2019 = 0</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Every user from Users must appear in the output, even if they have 0 orders in 2019.",
        "LEFT JOIN Users with Orders.",
        "Crucial predicate placement: YEAR(order_date) = 2019 must be in the ON clause! If placed in WHERE, it converts the LEFT JOIN into an INNER JOIN, dropping users with 0 orders.",
        "Aggregate using COUNT(o.order_id)."
      ],
      "trapsAndEdgeCases": [
        "WHERE clause filtering trap: Filtering order date in WHERE drops users who joined in 2018 or have zero 2019 orders."
      ],
      "solutionSQL": "SELECT u.user_id AS buyer_id,\n       u.join_date,\n       COUNT(o.order_id) AS orders_in_2019\nFROM Users u\nLEFT JOIN Orders o\n  ON u.user_id = o.buyer_id\n AND YEAR(o.order_date) = 2019\nGROUP BY u.user_id, u.join_date;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT u.user_id AS buyer_id, u.join_date,",
          "exp": "Emits user ID and registration timestamp."
        },
        {
          "clause": "COUNT(o.order_id) AS orders_in_2019",
          "exp": "Counts non-null 2019 orders."
        },
        {
          "clause": "FROM Users u LEFT JOIN Orders o ON u.user_id = o.buyer_id AND YEAR(o.order_date) = 2019",
          "exp": "Left joins with date filter in ON clause to preserve 0-order users."
        },
        {
          "clause": "GROUP BY u.user_id, u.join_date",
          "exp": "Groups per user."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Subquery Pre-Aggregation",
          "complexity": "O(N log N)",
          "sql": "SELECT u.user_id AS buyer_id, u.join_date, IFNULL(o.cnt, 0) AS orders_in_2019\nFROM Users u\nLEFT JOIN (\n  SELECT buyer_id, COUNT(*) AS cnt FROM Orders WHERE YEAR(order_date) = 2019 GROUP BY buyer_id\n) o ON u.user_id = o.buyer_id;",
          "explanation": "Pre-aggregates 2019 orders before joining."
        }
      ]
    },
    {
      "id": 1159,
      "title": "Market Analysis II",
      "difficulty": "Hard",
      "acceptance": "52.8%",
      "interviewFreq": "Very High • Etsy, Amazon",
      "companies": [
        "Etsy",
        "Amazon"
      ],
      "prompt": "Write a solution to find for each user whether the brand of the second item (by date) they sold is their favorite brand. If a user sold less than two items, report 'no' for that user.",
      "sampleInput": {
        "table": "Users / Orders / Items",
        "columns": [
          "user_id",
          "favorite_brand",
          "order_date",
          "item_id",
          "seller_id",
          "item_brand"
        ],
        "rows": [
          [
            1,
            "Lenovo",
            "2019-08-01",
            4,
            1,
            "Lenovo"
          ],
          [
            1,
            "Lenovo",
            "2019-08-02",
            2,
            1,
            "Lenovo"
          ],
          [
            2,
            "Samsung",
            "2019-08-02",
            2,
            2,
            "Lenovo"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "seller_id",
          "2nd_item_fav_brand"
        ],
        "rows": [
          [
            1,
            "yes"
          ],
          [
            2,
            "no"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1159: SECOND ORDER FAVORITE BRAND VERIFICATION</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Seller Activity</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">U1: 2nd item brand = 'Lenovo' (Fav = Lenovo ✓)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">U2: 2nd item brand = 'Lenovo' (Fav = Samsung ❌)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">ROW_NUMBER() OVER(PARTITION BY seller\\nORDER BY date) = 2</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Verification</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">U1: 'yes'</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">U2: 'no'</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Use ROW_NUMBER() partitioned by seller_id ordered by order_date ASC to index sales chronologically.",
        "Filter for rnk = 2 to isolate each seller's second sale.",
        "Join the second order with Items to determine item_brand.",
        "LEFT JOIN Users with this second order table, checking IF(u.favorite_brand = item_brand, 'yes', 'no')."
      ],
      "trapsAndEdgeCases": [
        "Sellers with 0 or 1 sale: Must still be returned in output with 'no'."
      ],
      "solutionSQL": "WITH RankedOrders AS (\n    SELECT o.seller_id,\n           o.item_id,\n           ROW_NUMBER() OVER (\n               PARTITION BY o.seller_id\n               ORDER BY o.order_date ASC\n           ) AS rnk\n    FROM Orders o\n),\nSecondOrders AS (\n    SELECT r.seller_id,\n           i.item_brand\n    FROM RankedOrders r\n    JOIN Items i ON r.item_id = i.item_id\n    WHERE r.rnk = 2\n)\nSELECT u.user_id AS seller_id,\n       CASE\n           WHEN s.item_brand = u.favorite_brand THEN 'yes'\n           ELSE 'no'\n       END AS 2nd_item_fav_brand\nFROM Users u\nLEFT JOIN SecondOrders s ON u.user_id = s.seller_id;",
      "lineByLineExplanation": [
        {
          "clause": "WITH RankedOrders AS (SELECT o.seller_id, o.item_id, ROW_NUMBER() OVER (...) AS rnk FROM Orders o)",
          "exp": "Ranks sales per seller by date."
        },
        {
          "clause": "SecondOrders AS (SELECT r.seller_id, i.item_brand FROM RankedOrders r JOIN Items i ... WHERE r.rnk = 2)",
          "exp": "Extracts brand of the exact second sale."
        },
        {
          "clause": "SELECT u.user_id AS seller_id, CASE WHEN s.item_brand = u.favorite_brand THEN 'yes' ELSE 'no' END AS 2nd_item_fav_brand",
          "exp": "Left joins with all users and tests favorite brand match."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Correlated Subquery",
          "complexity": "O(N log N)",
          "sql": "SELECT u.user_id AS seller_id,\n       IFNULL((\n           SELECT IF(i.item_brand = u.favorite_brand, 'yes', 'no')\n           FROM Orders o JOIN Items i ON o.item_id = i.item_id\n           WHERE o.seller_id = u.user_id ORDER BY o.order_date LIMIT 1 OFFSET 1\n       ), 'no') AS 2nd_item_fav_brand\nFROM Users u;",
          "explanation": "Correlated scalar subquery with LIMIT 1 OFFSET 1."
        }
      ]
    },
    {
      "id": 1212,
      "title": "Team Scores in Football Tournament",
      "difficulty": "Medium",
      "acceptance": "54.1%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to select the team_id, team_name and num_points of each team in the tournament after considering all matches.\nScoring rules:\n- Win: 3 points\n- Draw: 1 point\n- Loss: 0 points\nOrder by num_points DESC, team_name ASC.",
      "sampleInput": {
        "table": "Teams / Matches",
        "columns": [
          "team_id",
          "team_name",
          "host_team",
          "guest_team",
          "host_goals",
          "guest_goals"
        ],
        "rows": [
          [
            10,
            "FCB",
            10,
            20,
            3,
            0
          ],
          [
            20,
            "MU",
            20,
            30,
            2,
            2
          ],
          [
            30,
            "Arsenal",
            30,
            40,
            1,
            2
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "team_id",
          "team_name",
          "num_points"
        ],
        "rows": [
          [
            10,
            "FCB",
            3
          ],
          [
            20,
            "MU",
            1
          ],
          [
            30,
            "Arsenal",
            1
          ],
          [
            40,
            "Chelsea",
            0
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1212: DUAL HOME/AWAY MATCH POINT AGGREGATION</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Matches</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">10 vs 20: (3 - 0) -> 10 gets 3 pts</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">20 vs 30: (2 - 2) -> Both get 1 pt</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">CASE WHEN goals > opp THEN 3\\nWHEN goals = opp THEN 1 ELSE 0</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Tournament Table</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">10: FCB -> 3 pts</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">20: MU -> 1 pt</text><text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">40: Chelsea -> 0 pts</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "A team earns points as host (host_goals vs guest_goals) or as guest (guest_goals vs host_goals).",
        "Unfold matches using UNION ALL to compute points per team.",
        "LEFT JOIN Teams with these points so teams with 0 matches or 0 points are preserved.",
        "Order by num_points DESC, team_name ASC."
      ],
      "trapsAndEdgeCases": [
        "Zero points teams: Teams that never played or lost all matches must show 0 points, not NULL."
      ],
      "solutionSQL": "WITH MatchPoints AS (\n    SELECT host_team AS team_id,\n           CASE WHEN host_goals > guest_goals THEN 3 WHEN host_goals = guest_goals THEN 1 ELSE 0 END AS points\n    FROM Matches\n    UNION ALL\n    SELECT guest_team AS team_id,\n           CASE WHEN guest_goals > host_goals THEN 3 WHEN guest_goals = host_goals THEN 1 ELSE 0 END AS points\n    FROM Matches\n)\nSELECT t.team_id,\n       t.team_name,\n       IFNULL(SUM(p.points), 0) AS num_points\nFROM Teams t\nLEFT JOIN MatchPoints p ON t.team_id = p.team_id\nGROUP BY t.team_id, t.team_name\nORDER BY num_points DESC, t.team_name ASC;",
      "lineByLineExplanation": [
        {
          "clause": "WITH MatchPoints AS (...)",
          "exp": "Evaluates points earned from both host and guest perspectives."
        },
        {
          "clause": "SELECT t.team_id, t.team_name, IFNULL(SUM(p.points), 0) AS num_points",
          "exp": "Left joins with all teams and sums points, defaulting nulls to 0."
        },
        {
          "clause": "ORDER BY num_points DESC, t.team_name ASC",
          "exp": "Sorts by points descending, breaking ties alphabetically."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Direct Multi-Condition JOIN",
          "complexity": "O(T * M)",
          "sql": "SELECT t.team_id, t.team_name,\n       SUM(CASE WHEN t.team_id = m.host_team AND m.host_goals > m.guest_goals THEN 3\n                WHEN t.team_id = m.guest_team AND m.guest_goals > m.host_goals THEN 3\n                WHEN (t.team_id = m.host_team OR t.team_id = m.guest_team) AND m.host_goals = m.guest_goals THEN 1\n                ELSE 0 END) AS num_points\nFROM Teams t LEFT JOIN Matches m ON t.team_id = m.host_team OR t.team_id = m.guest_team\nGROUP BY t.team_id, t.team_name ORDER BY num_points DESC, team_name ASC;",
          "explanation": "Conditional join matching either host or guest."
        }
      ]
    },
    {
      "id": 1225,
      "title": "Report Contiguous Dates",
      "difficulty": "Hard",
      "acceptance": "60.4%",
      "interviewFreq": "Very High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "A system is running one task everyday. Every task is either 'failed' or 'succeeded'. Write a solution to generate a report of all intervals of contiguous dates with the same task state between 2019-01-01 and 2019-12-31. Order by start_date.",
      "sampleInput": {
        "table": "Failed / Succeeded",
        "columns": [
          "fail_date",
          "success_date"
        ],
        "rows": [
          [
            "2018-12-28",
            "2018-12-30"
          ],
          [
            "2019-01-04",
            "2019-01-01"
          ],
          [
            "2019-01-05",
            "2019-01-02"
          ],
          [
            null,
            "2019-01-03"
          ],
          [
            null,
            "2019-01-06"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "period_state",
          "start_date",
          "end_date"
        ],
        "rows": [
          [
            "succeeded",
            "2019-01-01",
            "2019-01-03"
          ],
          [
            "failed",
            "2019-01-04",
            "2019-01-05"
          ],
          [
            "succeeded",
            "2019-01-06",
            "2019-01-06"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1225: CONTIGUOUS ISLANDS-AND-GAPS TIME RANGES</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Unified Events (2019)</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Jan 1-3: succeeded (3 days)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Jan 4-5: failed (2 days)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Jan 6: succeeded (1 day)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">date - ROW_NUMBER() DAY\\nGROUP BY state, anchor_date</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Periods</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">succeeded: Jan 1 to Jan 3</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">failed: Jan 4 to Jan 5</text><text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">succeeded: Jan 6 to Jan 6</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Combine Failed and Succeeded events into a single table with state and event_date, filtering for 2019.",
        "Assign ROW_NUMBER() ordered by event_date partitioned by state.",
        "Compute anchor_date = DATE_SUB(event_date, INTERVAL rnk DAY). Consecutive streaks have identical anchor dates!",
        "Group by state and anchor_date, calculating MIN(event_date) as start_date and MAX(event_date) as end_date."
      ],
      "trapsAndEdgeCases": [
        "2019 boundary filter: Events outside 2019 must be eliminated prior to ranking, or they alter row numbers."
      ],
      "solutionSQL": "WITH AllTasks AS (\n    SELECT 'failed' AS period_state, fail_date AS task_date\n    FROM Failed\n    WHERE fail_date BETWEEN '2019-01-01' AND '2019-12-31'\n    UNION ALL\n    SELECT 'succeeded' AS period_state, success_date AS task_date\n    FROM Succeeded\n    WHERE success_date BETWEEN '2019-01-01' AND '2019-12-31'\n),\nRankedTasks AS (\n    SELECT period_state,\n           task_date,\n           DATE_SUB(task_date, INTERVAL ROW_NUMBER() OVER (\n               PARTITION BY period_state\n               ORDER BY task_date\n           ) DAY) AS grp\n    FROM AllTasks\n)\nSELECT period_state,\n       MIN(task_date) AS start_date,\n       MAX(task_date) AS end_date\nFROM RankedTasks\nGROUP BY period_state, grp\nORDER BY start_date ASC;",
      "lineByLineExplanation": [
        {
          "clause": "WITH AllTasks AS (...)",
          "exp": "Merges tasks within 2019."
        },
        {
          "clause": "RankedTasks AS (SELECT ..., DATE_SUB(task_date, INTERVAL ROW_NUMBER() OVER (...) DAY) AS grp)",
          "exp": "Establishes constant island anchor dates."
        },
        {
          "clause": "SELECT period_state, MIN(task_date) AS start_date, MAX(task_date) AS end_date GROUP BY period_state, grp",
          "exp": "Folds contiguous dates into start and end bounds."
        },
        {
          "clause": "ORDER BY start_date ASC",
          "exp": "Sorts intervals chronologically."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "LAG() State Change Detection",
          "complexity": "O(N log N)",
          "sql": "WITH Ranked AS (\n  SELECT period_state, task_date,\n         IF(LAG(period_state) OVER (ORDER BY task_date) = period_state, 0, 1) AS flag\n  FROM AllTasks\n), Groups AS (\n  SELECT period_state, task_date, SUM(flag) OVER (ORDER BY task_date) AS grp FROM Ranked\n)\nSELECT period_state, MIN(task_date) AS start_date, MAX(task_date) AS end_date FROM Groups GROUP BY period_state, grp ORDER BY start_date;",
          "explanation": "Detects state transitions using LAG() and accumulates a running group identifier."
        }
      ]
    },
    {
      "id": 1270,
      "title": "All People Report to the Given Manager",
      "difficulty": "Medium",
      "acceptance": "85.2%",
      "interviewFreq": "High • Google, Amazon",
      "companies": [
        "Google",
        "Amazon"
      ],
      "prompt": "Write a solution to find employee_id of all employees that directly or indirectly report their work to the head of the company (manager_id = 1). The indirect relation is at most 3 managers. Exclude the head of the company itself (employee_id = 1).",
      "sampleInput": {
        "table": "Employees",
        "columns": [
          "employee_id",
          "employee_name",
          "manager_id"
        ],
        "rows": [
          [
            1,
            "Boss",
            1
          ],
          [
            3,
            "Alice",
            3
          ],
          [
            2,
            "Bob",
            1
          ],
          [
            4,
            "Daniel",
            2
          ],
          [
            7,
            "Luis",
            4
          ],
          [
            8,
            "Jhon",
            3
          ],
          [
            9,
            "Angela",
            8
          ],
          [
            77,
            "Robert",
            1
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "employee_id"
        ],
        "rows": [
          [
            2
          ],
          [
            77
          ],
          [
            4
          ],
          [
            7
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1270: 3-LEVEL REPORTING HIERARCHY TREE</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Organization</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Boss (1) <- 2, 77 (Level 1)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">2 <- 4 (Level 2)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">4 <- 7 (Level 3)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">e1 -> e2 -> e3\\nWHERE e3.manager_id = 1</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Subordinates</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">2, 77, 4, 7</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Join Employees 3 times (e1 -> e2 -> e3) to trace up to 3 reporting levels.",
        "e1 reports to e2 (e1.manager_id = e2.employee_id).",
        "e2 reports to e3 (e2.manager_id = e3.employee_id).",
        "Filter for e3.manager_id = 1 AND e1.employee_id != 1."
      ],
      "trapsAndEdgeCases": [
        "Excluding the CEO: employee_id = 1 reports to themselves (manager_id = 1) and must be excluded."
      ],
      "solutionSQL": "SELECT e1.employee_id\nFROM Employees e1\nJOIN Employees e2 ON e1.manager_id = e2.employee_id\nJOIN Employees e3 ON e2.manager_id = e3.employee_id\nWHERE e3.manager_id = 1\n  AND e1.employee_id != 1;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT e1.employee_id",
          "exp": "Emits qualifying subordinate employee IDs."
        },
        {
          "clause": "FROM Employees e1 JOIN Employees e2 ON e1.manager_id = e2.employee_id",
          "exp": "First hop to immediate manager."
        },
        {
          "clause": "JOIN Employees e3 ON e2.manager_id = e3.employee_id",
          "exp": "Second hop to manager's manager."
        },
        {
          "clause": "WHERE e3.manager_id = 1 AND e1.employee_id != 1",
          "exp": "Ensures top level is the CEO (1) while omitting CEO."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Recursive CTE",
          "complexity": "O(V + E)",
          "sql": "WITH RECURSIVE Hierarchy AS (\n    SELECT employee_id FROM Employees WHERE manager_id = 1 AND employee_id != 1\n    UNION ALL\n    SELECT e.employee_id FROM Employees e JOIN Hierarchy h ON e.manager_id = h.employee_id\n)\nSELECT employee_id FROM Hierarchy;",
          "explanation": "Unbounded graph recursion downward from Manager 1."
        }
      ]
    },
    {
      "id": 1303,
      "title": "Find the Team Size",
      "difficulty": "Easy",
      "acceptance": "89.3%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to find the team size of each of the employees. Return the result table in any order.",
      "sampleInput": {
        "table": "Employee",
        "columns": [
          "employee_id",
          "team_id"
        ],
        "rows": [
          [
            1,
            8
          ],
          [
            2,
            8
          ],
          [
            3,
            8
          ],
          [
            4,
            7
          ],
          [
            5,
            9
          ],
          [
            6,
            9
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "employee_id",
          "team_size"
        ],
        "rows": [
          [
            1,
            3
          ],
          [
            2,
            3
          ],
          [
            3,
            3
          ],
          [
            4,
            1
          ],
          [
            5,
            2
          ],
          [
            6,
            2
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1303: WINDOW PARTITION TEAM HEADCOUNT</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Employees</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Emp 1, Team 8</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Emp 2, Team 8</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Emp 3, Team 8</text><text x=\"14\" y=\"96\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Emp 4, Team 7</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">COUNT(*) OVER (PARTITION BY team_id)</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Team Size</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Emp 1 -> Size 3</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Emp 4 -> Size 1</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Use window function COUNT(*) OVER (PARTITION BY team_id).",
        "This appends the team count directly to each individual employee row without row collapsing."
      ],
      "trapsAndEdgeCases": [
        "Group By row collapsing: Grouping by employee_id, team_id yields 1 for each; must partition over team_id alone."
      ],
      "solutionSQL": "SELECT employee_id,\n       COUNT(*) OVER (PARTITION BY team_id) AS team_size\nFROM Employee;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT employee_id,",
          "exp": "Emits employee identifier."
        },
        {
          "clause": "COUNT(*) OVER (PARTITION BY team_id) AS team_size",
          "exp": "Computes headcount across employee's department partition."
        },
        {
          "clause": "FROM Employee",
          "exp": "Source employees table."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "JOIN with GROUP BY Subquery",
          "complexity": "O(N log N)",
          "sql": "SELECT e.employee_id, t.team_size\nFROM Employee e\nJOIN (\n    SELECT team_id, COUNT(*) AS team_size FROM Employee GROUP BY team_id\n) t ON e.team_id = t.team_id;",
          "explanation": "Subquery pre-computing team sizes and joining back."
        }
      ]
    },
    {
      "id": 1308,
      "title": "Running Total for Different Genders",
      "difficulty": "Medium",
      "acceptance": "86.1%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to find the total score for each gender on each day. Return the result table ordered by gender and day in ascending order.",
      "sampleInput": {
        "table": "Scores",
        "columns": [
          "player_name",
          "gender",
          "day",
          "score_points"
        ],
        "rows": [
          [
            "Aron",
            "F",
            "2020-01-01",
            17
          ],
          [
            "Alice",
            "F",
            "2020-01-07",
            23
          ],
          [
            "Bajrang",
            "M",
            "2020-01-07",
            7
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "gender",
          "day",
          "total"
        ],
        "rows": [
          [
            "F",
            "2020-01-01",
            17
          ],
          [
            "F",
            "2020-01-07",
            40
          ],
          [
            "M",
            "2020-01-07",
            7
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1308: CHRONOLOGICAL ACCUMULATOR BY GENDER</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Scores</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">F (01-01): 17 pts</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">F (01-07): 23 pts</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">M (01-07): 7 pts</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">SUM(score) OVER(PARTITION BY gender\\nORDER BY day)</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Running Total</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">F (01-01): 17</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">F (01-07): 40 (17+23)</text><text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">M (01-07): 7</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Use window aggregation SUM(score_points) partitioned by gender and ordered by day.",
        "The window frame continuously accumulates scores up to the current day for that gender.",
        "Order final output by gender ASC, day ASC."
      ],
      "trapsAndEdgeCases": [
        "Multiple games per day: Problem guarantees (gender, day) is unique."
      ],
      "solutionSQL": "SELECT gender,\n       day,\n       SUM(score_points) OVER (\n           PARTITION BY gender\n           ORDER BY day ASC\n       ) AS total\nFROM Scores\nORDER BY gender ASC, day ASC;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT gender, day,",
          "exp": "Emits gender partition and date."
        },
        {
          "clause": "SUM(score_points) OVER (PARTITION BY gender ORDER BY day ASC) AS total",
          "exp": "Calculates cumulative score points chronologically per gender."
        },
        {
          "clause": "FROM Scores ORDER BY gender ASC, day ASC",
          "exp": "Sorts final output."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Self-Join Cumulative Accumulator",
          "complexity": "O(N^2)",
          "sql": "SELECT s1.gender, s1.day, SUM(s2.score_points) AS total\nFROM Scores s1\nJOIN Scores s2 ON s1.gender = s2.gender AND s2.day <= s1.day\nGROUP BY s1.gender, s1.day\nORDER BY s1.gender, s1.day;",
          "explanation": "Self-join accumulating all preceding rows."
        }
      ]
    },
    {
      "id": 1336,
      "title": "Number of Transactions per Visit",
      "difficulty": "Hard",
      "acceptance": "44.2%",
      "interviewFreq": "Very High • Twitter, Amazon",
      "companies": [
        "Twitter",
        "Amazon"
      ],
      "prompt": "Write a solution to find how many users visited the bank and solved 0, 1, 2, ... transactions per visit. The result table must include all transaction counts from 0 up to the maximum number of transactions done in one visit, even if there are 0 visits for that count.",
      "sampleInput": {
        "table": "Visits / Transactions",
        "columns": [
          "user_id",
          "visit_date",
          "transaction_date",
          "amount"
        ],
        "rows": [
          [
            1,
            "2020-01-01",
            "2020-01-01",
            10
          ],
          [
            2,
            "2020-01-02",
            null,
            null
          ],
          [
            12,
            "2020-01-01",
            "2020-01-01",
            20
          ],
          [
            12,
            "2020-01-01",
            "2020-01-01",
            30
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "transactions_count",
          "visits_count"
        ],
        "rows": [
          [
            0,
            1
          ],
          [
            1,
            1
          ],
          [
            2,
            1
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1336: COMPLETE ZERO-FILLED TRANSACTION HISTOGRAM</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Visits & Trx</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">U2: 0 transactions</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">U1: 1 transaction</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">U12: 2 transactions</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">Recursive Seq (0 to MAX)\\nLEFT JOIN VisitCounts</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Histogram</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">0 trx -> 1 visit</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">1 trx -> 1 visit</text><text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">2 trx -> 1 visit</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Join Visits to Transactions on user_id AND visit_date = transaction_date to count transactions per visit.",
        "Generate an integer sequence from 0 up to MAX(transactions_count) using a recursive CTE.",
        "LEFT JOIN the sequence with the aggregated visit transaction counts.",
        "Count matching visits per sequence number, coalescing empty bins to 0."
      ],
      "trapsAndEdgeCases": [
        "Zero transactions bin: Visits where no transaction was made must be recorded in the '0' transactions bin."
      ],
      "solutionSQL": "WITH RECURSIVE VisitTrx AS (\n    SELECT v.user_id,\n           v.visit_date,\n           COUNT(t.transaction_date) AS trx_cnt\n    FROM Visits v\n    LEFT JOIN Transactions t\n      ON v.user_id = t.user_id\n     AND v.visit_date = t.transaction_date\n    GROUP BY v.user_id, v.visit_date\n),\nNumbers AS (\n    SELECT 0 AS transactions_count\n    UNION ALL\n    SELECT transactions_count + 1\n    FROM Numbers\n    WHERE transactions_count < (SELECT IFNULL(MAX(trx_cnt), 0) FROM VisitTrx)\n)\nSELECT n.transactions_count,\n       COUNT(v.user_id) AS visits_count\nFROM Numbers n\nLEFT JOIN VisitTrx v ON n.transactions_count = v.trx_cnt\nGROUP BY n.transactions_count\nORDER BY n.transactions_count ASC;",
      "lineByLineExplanation": [
        {
          "clause": "WITH RECURSIVE VisitTrx AS (...)",
          "exp": "Calculates the transaction count for each distinct bank visit."
        },
        {
          "clause": "Numbers AS (SELECT 0 ... UNION ALL SELECT n + 1 ...)",
          "exp": "Recursively creates integer scale from 0 to max transactions."
        },
        {
          "clause": "SELECT n.transactions_count, COUNT(v.user_id) AS visits_count FROM Numbers n LEFT JOIN VisitTrx v ...",
          "exp": "Folds counts into zero-filled frequency histogram."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Row_Number Seed Sequence",
          "complexity": "O(Max Count)",
          "sql": "WITH Seq AS (SELECT 0 AS transactions_count UNION SELECT ROW_NUMBER() OVER() FROM Transactions) ...",
          "explanation": "Seeds numerical sequence using ROW_NUMBER() over transactions."
        }
      ]
    },
    {
      "id": 1369,
      "title": "Get the Second Most Recent Activity",
      "difficulty": "Hard",
      "acceptance": "69.1%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to show the second most recent activity of each user. If the user only has one activity, return that one. A user cannot perform more than one activity at the same time.",
      "sampleInput": {
        "table": "UserActivity",
        "columns": [
          "username",
          "activity",
          "startDate",
          "endDate"
        ],
        "rows": [
          [
            "Alice",
            "Travel",
            "2020-02-12",
            "2020-02-20"
          ],
          [
            "Alice",
            "Dancing",
            "2020-02-21",
            "2020-02-23"
          ],
          [
            "Alice",
            "Travel",
            "2020-02-24",
            "2020-02-28"
          ],
          [
            "Bob",
            "Travel",
            "2020-02-11",
            "2020-02-18"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "username",
          "activity",
          "startDate",
          "endDate"
        ],
        "rows": [
          [
            "Alice",
            "Dancing",
            "2020-02-21",
            "2020-02-23"
          ],
          [
            "Bob",
            "Travel",
            "2020-02-11",
            "2020-02-18"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1369: 2ND ACTIVITY WITH SINGLETON FALLBACK</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">User Activities</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Alice: 3 activities (2nd = Dancing)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Bob: 1 activity (Fallback to 1st)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">WHERE rnk = 2 OR (cnt = 1 AND rnk = 1)</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Output</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Alice -> Dancing</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Bob -> Travel</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Rank activities for each user ordered by startDate DESC using ROW_NUMBER().",
        "Compute the total activities count per user using COUNT(*) OVER (PARTITION BY username).",
        "Filter for rows where rnk = 2 OR (cnt = 1 AND rnk = 1)."
      ],
      "trapsAndEdgeCases": [
        "Users with 1 activity: If a user has only 1 activity, rnk = 2 will return empty; must fallback to rnk = 1 when total count = 1."
      ],
      "solutionSQL": "WITH RankedActivity AS (\n    SELECT username,\n           activity,\n           startDate,\n           endDate,\n           ROW_NUMBER() OVER (\n               PARTITION BY username\n               ORDER BY startDate DESC\n           ) AS rnk,\n           COUNT(*) OVER (\n               PARTITION BY username\n           ) AS cnt\n    FROM UserActivity\n)\nSELECT username, activity, startDate, endDate\nFROM RankedActivity\nWHERE rnk = 2\n   OR (cnt = 1 AND rnk = 1);",
      "lineByLineExplanation": [
        {
          "clause": "WITH RankedActivity AS (SELECT ..., ROW_NUMBER() OVER (...) AS rnk, COUNT(*) OVER (...) AS cnt ...)",
          "exp": "Assigns reverse chronological rank and total count per user."
        },
        {
          "clause": "WHERE rnk = 2 OR (cnt = 1 AND rnk = 1)",
          "exp": "Extracts second most recent activity, falling back to only activity if count is 1."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "UNION Multi-Pass",
          "complexity": "O(N log N)",
          "sql": "SELECT username, activity, startDate, endDate FROM (\n  SELECT *, ROW_NUMBER() OVER(PARTITION BY username ORDER BY startDate DESC) AS rnk FROM UserActivity\n) t WHERE rnk = 2\nUNION ALL\nSELECT * FROM UserActivity GROUP BY username HAVING COUNT(*) = 1;",
          "explanation": "Unions exact 2nd rank rows with single-activity users."
        }
      ]
    },
    {
      "id": 1384,
      "title": "Total Sales Amount by Year",
      "difficulty": "Hard",
      "acceptance": "61.2%",
      "interviewFreq": "Very High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to report the total sales amount of each item for each year, with corresponding product_name, product_id, product_name, report_year and total_amount. Dates range from 2018 to 2020.",
      "sampleInput": {
        "table": "Product / Sales",
        "columns": [
          "product_id",
          "period_start",
          "period_end",
          "average_daily_spend"
        ],
        "rows": [
          [
            1,
            "2019-01-25",
            "2019-02-28",
            100
          ],
          [
            2,
            "2018-12-01",
            "2020-01-01",
            10
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "product_id",
          "product_name",
          "report_year",
          "total_amount"
        ],
        "rows": [
          [
            1,
            "LC Phone",
            "2019",
            3500
          ],
          [
            2,
            "LC T-Shirt",
            "2018",
            310
          ],
          [
            2,
            "LC T-Shirt",
            "2019",
            3650
          ],
          [
            2,
            "LC T-Shirt",
            "2020",
            10
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1384: MULTI-YEAR DATE OVERLAP SALES SPLITTING</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Sales Periods</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Item 2: 2018-12-01 to 2020-01-01 ($10/day)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Spans 2018, 2019, 2020!</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">(DATEDIFF(LEAST(end, yr_end), GREATEST(start, yr_start)) + 1) * rate</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Annualized Split</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">2018: 31 days x $10 = $310</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">2019: 365 days x $10 = $3650</text><text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">2020: 1 day x $10 = $10</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Generate years 2018, 2019, 2020 using a calendar CTE with year start and end bounds.",
        "Cross join or join Sales where period_start <= year_end AND period_end >= year_start.",
        "Days active in year = DATEDIFF(LEAST(period_end, year_end), GREATEST(period_start, year_start)) + 1.",
        "Multiply days by average_daily_spend.",
        "Order by product_id, report_year."
      ],
      "trapsAndEdgeCases": [
        "Inclusive date difference: DATEDIFF('2019-01-02', '2019-01-01') is 1, but both days were active; must add + 1."
      ],
      "solutionSQL": "WITH RECURSIVE Years AS (\n    SELECT '2018' AS report_year, '2018-01-01' AS yr_start, '2018-12-31' AS yr_end\n    UNION ALL\n    SELECT '2019', '2019-01-01', '2019-12-31'\n    UNION ALL\n    SELECT '2020', '2020-01-01', '2020-12-31'\n)\nSELECT s.product_id,\n       p.product_name,\n       y.report_year,\n       (DATEDIFF(LEAST(s.period_end, y.yr_end), GREATEST(s.period_start, y.yr_start)) + 1) * s.average_daily_spend AS total_amount\nFROM Sales s\nJOIN Product p ON s.product_id = p.product_id\nJOIN Years y\n  ON s.period_start <= y.yr_end\n AND s.period_end >= y.yr_start\nORDER BY s.product_id ASC, y.report_year ASC;",
      "lineByLineExplanation": [
        {
          "clause": "WITH RECURSIVE Years AS (...)",
          "exp": "Constructs calendar year boundaries for 2018, 2019, 2020."
        },
        {
          "clause": "JOIN Years y ON s.period_start <= y.yr_end AND s.period_end >= y.yr_start",
          "exp": "Matches overlapping years."
        },
        {
          "clause": "(DATEDIFF(LEAST(...), GREATEST(...)) + 1) * s.average_daily_spend AS total_amount",
          "exp": "Calculates exact days of overlap in the year times daily spend."
        },
        {
          "clause": "ORDER BY s.product_id ASC, y.report_year ASC",
          "exp": "Sorts by product and chronological year."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "UNION ALL Static Year Clauses",
          "complexity": "O(S * 3)",
          "sql": "SELECT product_id, product_name, '2018' AS report_year, ... WHERE period_start <= '2018-12-31' AND period_end >= '2018-01-01' UNION ALL ...;",
          "explanation": "Manual expansion of 3 separate year projection blocks."
        }
      ]
    },
    {
      "id": 1398,
      "title": "Customers Who Bought Products A and B but Not C",
      "difficulty": "Medium",
      "acceptance": "77.5%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to report the customer_id and customer_name of customers who bought products \"A\", \"B\" but did not buy the product \"C\". Order by customer_id.",
      "sampleInput": {
        "table": "Customers / Orders",
        "columns": [
          "customer_id",
          "customer_name",
          "product_name"
        ],
        "rows": [
          [
            1,
            "Daniel",
            "A"
          ],
          [
            1,
            "Daniel",
            "B"
          ],
          [
            2,
            "Diana",
            "A"
          ],
          [
            3,
            "Elizabeth",
            "A"
          ],
          [
            3,
            "Elizabeth",
            "B"
          ],
          [
            3,
            "Elizabeth",
            "C"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "customer_id",
          "customer_name"
        ],
        "rows": [
          [
            1,
            "Daniel"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1398: SET CONSTRAINTS: HAS A, HAS B, NO C</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Customers</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Daniel: A, B (Valid ✓)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Diana: A (No B ❌)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Elizabeth: A, B, C (Has C ❌)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">HAVING SUM(p='A')>0 AND\\nSUM(p='B')>0 AND SUM(p='C')=0</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Emitted</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">customer_id: 1, Daniel</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Join Customers with Orders.",
        "Group by customer_id, customer_name.",
        "HAVING SUM(product_name = 'A') > 0 AND SUM(product_name = 'B') > 0 AND SUM(product_name = 'C') = 0.",
        "Order by customer_id ASC."
      ],
      "trapsAndEdgeCases": [
        "Partial matches: Customers who bought A and B and also C must be strictly excluded."
      ],
      "solutionSQL": "SELECT c.customer_id, c.customer_name\nFROM Customers c\nJOIN Orders o ON c.customer_id = o.customer_id\nGROUP BY c.customer_id, c.customer_name\nHAVING SUM(o.product_name = 'A') > 0\n   AND SUM(o.product_name = 'B') > 0\n   AND SUM(o.product_name = 'C') = 0\nORDER BY c.customer_id ASC;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT c.customer_id, c.customer_name",
          "exp": "Projects customer credentials."
        },
        {
          "clause": "FROM Customers c JOIN Orders o ON c.customer_id = o.customer_id",
          "exp": "Joins customer records with order items."
        },
        {
          "clause": "GROUP BY c.customer_id, c.customer_name",
          "exp": "Aggregates per customer."
        },
        {
          "clause": "HAVING SUM(o.product_name = 'A') > 0 AND SUM(o.product_name = 'B') > 0 AND SUM(o.product_name = 'C') = 0",
          "exp": "Demands presence of A and B, and total absence of C."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Subquery IN / NOT IN",
          "complexity": "O(N log N)",
          "sql": "SELECT customer_id, customer_name FROM Customers\nWHERE customer_id IN (SELECT customer_id FROM Orders WHERE product_name = 'A')\n  AND customer_id IN (SELECT customer_id FROM Orders WHERE product_name = 'B')\n  AND customer_id NOT IN (SELECT customer_id FROM Orders WHERE product_name = 'C')\nORDER BY customer_id;",
          "explanation": "Set intersection and difference via IN and NOT IN."
        }
      ]
    },
    {
      "id": 1412,
      "title": "Find the Quiet Students in All Exams",
      "difficulty": "Hard",
      "acceptance": "63.2%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "A quiet student is the one who took at least one exam and did not score the high score or the low score in any exam they took. Write a solution to report the student_id and student_name of quiet students. Order by student_id.",
      "sampleInput": {
        "table": "Student / Exam",
        "columns": [
          "student_id",
          "student_name",
          "exam_id",
          "score"
        ],
        "rows": [
          [
            1,
            "Daniel",
            10,
            70
          ],
          [
            1,
            "Daniel",
            20,
            80
          ],
          [
            2,
            "Jade",
            10,
            90
          ],
          [
            3,
            "Tom",
            10,
            60
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "student_id",
          "student_name"
        ],
        "rows": [
          [
            1,
            "Daniel"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1412: EXTREME EXAM OUTLIER EXCLUSION</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Exam 10 Scores</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Jade: 90 (High ❌)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Daniel: 70 (Middle ✓)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Tom: 60 (Low ❌)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">score != MIN(score) AND\\nscore != MAX(score) in all exams</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Quiet Students</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">student_id: 1, Daniel</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "For each exam, compute the minimum and maximum score: MIN(score) OVER (PARTITION BY exam_id) and MAX(score) OVER (PARTITION BY exam_id).",
        "Identify students who scored either the min or max score in ANY exam: score = min_score OR score = max_score.",
        "Filter for students who took at least one exam AND are NOT in the outlier set.",
        "Order by student_id ASC."
      ],
      "trapsAndEdgeCases": [
        "Zero exams taken: Students who took 0 exams must NOT be reported as quiet students."
      ],
      "solutionSQL": "WITH ExamBounds AS (\n    SELECT student_id,\n           score,\n           MIN(score) OVER (PARTITION BY exam_id) AS min_score,\n           MAX(score) OVER (PARTITION BY exam_id) AS max_score\n    FROM Exam\n),\nNoisyStudents AS (\n    SELECT DISTINCT student_id\n    FROM ExamBounds\n    WHERE score = min_score OR score = max_score\n)\nSELECT s.student_id, s.student_name\nFROM Student s\nWHERE s.student_id IN (SELECT student_id FROM Exam)\n  AND s.student_id NOT IN (SELECT student_id FROM NoisyStudents)\nORDER BY s.student_id ASC;",
      "lineByLineExplanation": [
        {
          "clause": "WITH ExamBounds AS (...)",
          "exp": "Computes min and max score per exam partition."
        },
        {
          "clause": "NoisyStudents AS (...)",
          "exp": "Isolates students who hit the lowest or highest mark in any exam."
        },
        {
          "clause": "WHERE s.student_id IN (SELECT student_id FROM Exam) AND s.student_id NOT IN (SELECT student_id FROM NoisyStudents)",
          "exp": "Restricts to students with >=1 exam who were never noisy."
        },
        {
          "clause": "ORDER BY s.student_id ASC",
          "exp": "Sorts by student ID."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "DENSE_RANK Window Filtering",
          "complexity": "O(N log N)",
          "sql": "WITH Ranked AS (\n  SELECT student_id,\n         DENSE_RANK() OVER(PARTITION BY exam_id ORDER BY score ASC) AS rnk_low,\n         DENSE_RANK() OVER(PARTITION BY exam_id ORDER BY score DESC) AS rnk_high\n  FROM Exam\n)\nSELECT student_id, student_name FROM Student WHERE student_id IN (SELECT student_id FROM Exam)\nAND student_id NOT IN (SELECT student_id FROM Ranked WHERE rnk_low = 1 OR rnk_high = 1)\nORDER BY student_id;",
          "explanation": "Uses ascending and descending dense rank to flag rank 1 performers."
        }
      ]
    },
    {
      "id": 1440,
      "title": "Evaluate Boolean Expression",
      "difficulty": "Medium",
      "acceptance": "75.4%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to evaluate the boolean expressions in Expressions table. Return the result table with left_operand, operator, right_operand, and value ('true' or 'false').",
      "sampleInput": {
        "table": "Variables / Expressions",
        "columns": [
          "name",
          "value",
          "left_operand",
          "operator",
          "right_operand"
        ],
        "rows": [
          [
            "x",
            66
          ],
          [
            "y",
            77
          ],
          [
            "x",
            ">",
            "y"
          ],
          [
            "x",
            "<",
            "y"
          ],
          [
            "x",
            "=",
            "x"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "left_operand",
          "operator",
          "right_operand",
          "value"
        ],
        "rows": [
          [
            "x",
            ">",
            "y",
            "false"
          ],
          [
            "x",
            "<",
            "y",
            "true"
          ],
          [
            "x",
            "=",
            "x",
            "true"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1440: RELATIONAL DYNAMIC BOOLEAN EVALUATION</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Variables & Expr</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">x=66, y=77</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">x > y (66 > 77)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">x < y (66 < 77)</text><text x=\"14\" y=\"96\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">x = x (66 = 66)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">CASE WHEN op='>' AND l.val > r.val THEN 'true'...</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Evaluated</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">x > y: false</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">x < y: true</text><text x=\"14\" y=\"78\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">x = x: true</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Join Expressions with Variables twice: once for left_operand (l) and once for right_operand (r).",
        "Use CASE WHEN to evaluate each operator:",
        "WHEN operator = '>' AND l.value > r.value THEN 'true'",
        "WHEN operator = '<' AND l.value < r.value THEN 'true'",
        "WHEN operator = '=' AND l.value = r.value THEN 'true'",
        "ELSE 'false'."
      ],
      "trapsAndEdgeCases": [
        "String booleans: Output must be lowercase string 'true' or 'false', not 1/0."
      ],
      "solutionSQL": "SELECT e.left_operand,\n       e.operator,\n       e.right_operand,\n       CASE\n           WHEN e.operator = '>' AND l.value > r.value THEN 'true'\n           WHEN e.operator = '<' AND l.value < r.value THEN 'true'\n           WHEN e.operator = '=' AND l.value = r.value THEN 'true'\n           ELSE 'false'\n       END AS value\nFROM Expressions e\nJOIN Variables l ON e.left_operand = l.name\nJOIN Variables r ON e.right_operand = r.name;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT e.left_operand, e.operator, e.right_operand,",
          "exp": "Projects expression tokens."
        },
        {
          "clause": "CASE WHEN e.operator = '>' AND l.value > r.value THEN 'true' ... ELSE 'false' END AS value",
          "exp": "Evaluates boolean logic based on mapped operand values."
        },
        {
          "clause": "FROM Expressions e JOIN Variables l ON e.left_operand = l.name JOIN Variables r ON e.right_operand = r.name",
          "exp": "Joins variable table twice for both operand values."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "IF Condition Chain",
          "complexity": "O(N)",
          "sql": "SELECT e.left_operand, e.operator, e.right_operand,\n       IF((operator = '>' AND l.value > r.value) OR\n          (operator = '<' AND l.value < r.value) OR\n          (operator = '=' AND l.value = r.value), 'true', 'false') AS value\nFROM Expressions e JOIN Variables l ON e.left_operand = l.name JOIN Variables r ON e.right_operand = r.name;",
          "explanation": "Compact IF evaluation chain."
        }
      ]
    },
    {
      "id": 1445,
      "title": "Apples & Oranges",
      "difficulty": "Medium",
      "acceptance": "88.2%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to report the difference between the number of apples and oranges sold each day. Return the result table ordered by sale_date.",
      "sampleInput": {
        "table": "Sales",
        "columns": [
          "sale_date",
          "fruit",
          "sold_num"
        ],
        "rows": [
          [
            "2020-05-01",
            "apples",
            10
          ],
          [
            "2020-05-01",
            "oranges",
            8
          ],
          [
            "2020-05-02",
            "apples",
            15
          ],
          [
            "2020-05-02",
            "oranges",
            15
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "sale_date",
          "diff"
        ],
        "rows": [
          [
            "2020-05-01",
            2
          ],
          [
            "2020-05-02",
            0
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1445: DAILY FRUIT DIFFERENCE PIVOT</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Daily Sales</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">May 01: Apples 10, Oranges 8</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">May 02: Apples 15, Oranges 15</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">SUM(CASE WHEN fruit='apples'\\nTHEN sold_num ELSE -sold_num END)</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Difference</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">May 01: diff = 2 (10-8)</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">May 02: diff = 0 (15-15)</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Group sales by sale_date.",
        "Apply signed conditional aggregation:",
        "SUM(CASE WHEN fruit = 'apples' THEN sold_num ELSE -sold_num END) AS diff.",
        "Order by sale_date ASC."
      ],
      "trapsAndEdgeCases": [
        "Negative differences: If more oranges than apples are sold, the difference can be negative."
      ],
      "solutionSQL": "SELECT sale_date,\n       SUM(CASE WHEN fruit = 'apples' THEN sold_num ELSE -sold_num END) AS diff\nFROM Sales\nGROUP BY sale_date\nORDER BY sale_date ASC;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT sale_date,",
          "exp": "Emits transaction date."
        },
        {
          "clause": "SUM(CASE WHEN fruit = 'apples' THEN sold_num ELSE -sold_num END) AS diff",
          "exp": "Adds apples, subtracts oranges."
        },
        {
          "clause": "FROM Sales GROUP BY sale_date ORDER BY sale_date ASC",
          "exp": "Groups per date and orders chronologically."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Self-Join Difference",
          "complexity": "O(N log N)",
          "sql": "SELECT a.sale_date, (a.sold_num - o.sold_num) AS diff\nFROM Sales a\nJOIN Sales o ON a.sale_date = o.sale_date AND a.fruit = 'apples' AND o.fruit = 'oranges'\nORDER BY a.sale_date;",
          "explanation": "Self-joins apples record with oranges record on the same date."
        }
      ]
    },
    {
      "id": 1454,
      "title": "Active Users",
      "difficulty": "Medium",
      "acceptance": "40.9%",
      "interviewFreq": "Very High • Amazon, Adobe",
      "companies": [
        "Amazon",
        "Adobe"
      ],
      "prompt": "Active users are those who logged in to their accounts for five or more consecutive days. Write a solution to find the id and the name of active users. Return the result table ordered by id.",
      "sampleInput": {
        "table": "Accounts / Logins",
        "columns": [
          "id",
          "name",
          "login_date"
        ],
        "rows": [
          [
            1,
            "Winston",
            "2020-05-30"
          ],
          [
            1,
            "Winston",
            "2020-05-31"
          ],
          [
            1,
            "Winston",
            "2020-06-01"
          ],
          [
            1,
            "Winston",
            "2020-06-02"
          ],
          [
            1,
            "Winston",
            "2020-06-03"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "id",
          "name"
        ],
        "rows": [
          [
            1,
            "Winston"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1454: 5 CONSECUTIVE DAYS ACTIVE STREAK</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Winston Logins</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">May 30, May 31, Jun 01</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Jun 02, Jun 03 (5 consecutive days!)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">login_date - ROW_NUMBER()\\nHAVING COUNT(*) >= 5</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Active User</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">id: 1, Winston</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Deduplicate logins first using SELECT DISTINCT id, login_date (users might log in multiple times a day).",
        "Assign ROW_NUMBER() ordered by login_date partitioned by id.",
        "Calculate island anchor: DATE_SUB(login_date, INTERVAL rnk DAY).",
        "Group by id, anchor and filter HAVING COUNT(*) >= 5.",
        "Join to Accounts to return distinct id and name, ordered by id."
      ],
      "trapsAndEdgeCases": [
        "Multiple logins on same day: Failure to DISTINCT prior to ranking breaks the streak sequence."
      ],
      "solutionSQL": "WITH DistinctLogins AS (\n    SELECT DISTINCT id, login_date\n    FROM Logins\n),\nStreaks AS (\n    SELECT id,\n           login_date,\n           DATE_SUB(login_date, INTERVAL ROW_NUMBER() OVER (\n               PARTITION BY id\n               ORDER BY login_date\n           ) DAY) AS grp\n    FROM DistinctLogins\n),\nActiveIDs AS (\n    SELECT id\n    FROM Streaks\n    GROUP BY id, grp\n    HAVING COUNT(*) >= 5\n)\nSELECT DISTINCT a.id, a.name\nFROM Accounts a\nJOIN ActiveIDs act ON a.id = act.id\nORDER BY a.id ASC;",
      "lineByLineExplanation": [
        {
          "clause": "WITH DistinctLogins AS (SELECT DISTINCT id, login_date FROM Logins)",
          "exp": "Deduplicates multiple daily logins."
        },
        {
          "clause": "Streaks AS (SELECT ..., DATE_SUB(login_date, INTERVAL ROW_NUMBER() OVER (...) DAY) AS grp)",
          "exp": "Applies Islands-and-Gaps date anchor grouping."
        },
        {
          "clause": "ActiveIDs AS (SELECT id FROM Streaks GROUP BY id, grp HAVING COUNT(*) >= 5)",
          "exp": "Filters streaks spanning 5+ continuous days."
        },
        {
          "clause": "SELECT DISTINCT a.id, a.name FROM Accounts a JOIN ActiveIDs act ON a.id = act.id ORDER BY a.id ASC",
          "exp": "Joins accounts to display user names ordered by ID."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "LEAD(..., 4) Window Approach",
          "complexity": "O(N log N)",
          "sql": "WITH DistinctLogins AS (SELECT DISTINCT id, login_date FROM Logins)\nSELECT DISTINCT a.id, a.name\nFROM Accounts a\nJOIN (\n  SELECT id, login_date, LEAD(login_date, 4) OVER(PARTITION BY id ORDER BY login_date) AS lead4\n  FROM DistinctLogins\n) t ON a.id = t.id AND DATEDIFF(t.lead4, t.login_date) = 4\nORDER BY a.id;",
          "explanation": "Checks if the 4th succeeding row is exactly 4 calendar days ahead."
        }
      ]
    },
    {
      "id": 1459,
      "title": "Rectangles Area",
      "difficulty": "Medium",
      "acceptance": "69.8%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to report all possible rectangles that can be formed by any two points in the Points table. Two points can form a rectangle if they do not share the same x-coordinate or the same y-coordinate. Calculate area = |x1 - x2| * |y1 - y2|. Order by area DESC, p1 ASC, p2 ASC.",
      "sampleInput": {
        "table": "Points",
        "columns": [
          "id",
          "x_value",
          "y_value"
        ],
        "rows": [
          [
            1,
            2,
            8
          ],
          [
            2,
            4,
            7
          ],
          [
            3,
            2,
            10
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "p1",
          "p2",
          "area"
        ],
        "rows": [
          [
            2,
            3,
            6
          ],
          [
            1,
            2,
            2
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1459: 2D RECTANGLE AREA FROM CORNER POINTS</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Points</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P1: (2, 8)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P2: (4, 7)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P3: (2, 10)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">ABS(p1.x - p2.x) * ABS(p1.y - p2.y) > 0\\nWHERE p1.id < p2.id</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Rectangles</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">P2 & P3: Area = |4-2|*|7-10| = 6</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">P1 & P2: Area = |2-4|*|8-7| = 2</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Join Points to itself on p1.id < p2.id to ensure each pair is evaluated once and avoid self-pairs.",
        "Filter for non-degenerate rectangles: p1.x_value != p2.x_value AND p1.y_value != p2.y_value (area > 0).",
        "Area = ABS(p1.x_value - p2.x_value) * ABS(p1.y_value - p2.y_value).",
        "Order by area DESC, p1 ASC, p2 ASC."
      ],
      "trapsAndEdgeCases": [
        "Collinear points: Points sharing an x or y coordinate form a line with area 0; must be filtered out."
      ],
      "solutionSQL": "SELECT p1.id AS p1,\n       p2.id AS p2,\n       ABS(p1.x_value - p2.x_value) * ABS(p1.y_value - p2.y_value) AS area\nFROM Points p1\nJOIN Points p2\n  ON p1.id < p2.id\n AND p1.x_value != p2.x_value\n AND p1.y_value != p2.y_value\nORDER BY area DESC, p1 ASC, p2 ASC;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT p1.id AS p1, p2.id AS p2,",
          "exp": "Emits distinct corner pair IDs."
        },
        {
          "clause": "ABS(p1.x_value - p2.x_value) * ABS(p1.y_value - p2.y_value) AS area",
          "exp": "Computes rectangle area."
        },
        {
          "clause": "FROM Points p1 JOIN Points p2 ON p1.id < p2.id AND p1.x_value != p2.x_value AND p1.y_value != p2.y_value",
          "exp": "Joins distinct points with non-zero dimensions."
        },
        {
          "clause": "ORDER BY area DESC, p1 ASC, p2 ASC",
          "exp": "Orders by area descending, breaking ties by IDs."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "WHERE Area > 0 Filter",
          "complexity": "O(N^2)",
          "sql": "SELECT p1.id AS p1, p2.id AS p2, (ABS(p1.x_value - p2.x_value) * ABS(p1.y_value - p2.y_value)) AS area\nFROM Points p1 JOIN Points p2 ON p1.id < p2.id\nWHERE ABS(p1.x_value - p2.x_value) * ABS(p1.y_value - p2.y_value) > 0\nORDER BY area DESC, p1, p2;",
          "explanation": "Equivalent filtering checking area product directly."
        }
      ]
    },
    {
      "id": 1468,
      "title": "Calculate Salaries",
      "difficulty": "Medium",
      "acceptance": "81.6%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to find the salaries of the employees after applying taxes. Taxes are calculated based on the maximum salary in each company:\n- 0% tax if max salary < $1,000\n- 24% tax if max salary between $1,000 and $10,000 inclusive\n- 49% tax if max salary > $10,000\nRound salaries to the nearest integer.",
      "sampleInput": {
        "table": "Salaries",
        "columns": [
          "company_id",
          "employee_id",
          "employee_name",
          "salary"
        ],
        "rows": [
          [
            1,
            1,
            "Tony",
            2000
          ],
          [
            1,
            2,
            "Pronub",
            21300
          ],
          [
            2,
            1,
            "Boch Ticket",
            700
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "company_id",
          "employee_id",
          "employee_name",
          "salary"
        ],
        "rows": [
          [
            1,
            1,
            "Tony",
            1020
          ],
          [
            1,
            2,
            "Pronub",
            10863
          ],
          [
            2,
            1,
            "Boch Ticket",
            700
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1468: COMPANY MAX SALARY TAX TIER ROUNDING</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Company Max Tiers</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Co 1 Max: $21,300 (> 10k -> 49% tax)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Co 2 Max: $700 (< 1k -> 0% tax)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">ROUND(salary * (1 - tax_rate))</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Net Salary</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Tony: 2000 * 0.51 = 1020</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Boch: 700 * 1.00 = 700</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Compute max salary per company: MAX(salary) OVER (PARTITION BY company_id).",
        "Determine tax multiplier via CASE WHEN on max_salary:",
        "WHEN max_salary < 1000 THEN 1.0",
        "WHEN max_salary <= 10000 THEN 0.76 (1 - 0.24)",
        "ELSE 0.51 (1 - 0.49).",
        "Multiply salary by multiplier and ROUND() to nearest integer."
      ],
      "trapsAndEdgeCases": [
        "Tax tier bounds: $1,000 and $10,000 are inclusive in the 24% bracket."
      ],
      "solutionSQL": "WITH CompanyMax AS (\n    SELECT company_id,\n           employee_id,\n           employee_name,\n           salary,\n           MAX(salary) OVER (PARTITION BY company_id) AS max_sal\n    FROM Salaries\n)\nSELECT company_id,\n       employee_id,\n       employee_name,\n       ROUND(\n           CASE\n               WHEN max_sal < 1000 THEN salary\n               WHEN max_sal <= 10000 THEN salary * 0.76\n               ELSE salary * 0.51\n           END\n       ) AS salary\nFROM CompanyMax;",
      "lineByLineExplanation": [
        {
          "clause": "WITH CompanyMax AS (SELECT ..., MAX(salary) OVER (PARTITION BY company_id) AS max_sal FROM Salaries)",
          "exp": "Appends company max salary to every employee row."
        },
        {
          "clause": "ROUND(CASE WHEN max_sal < 1000 THEN salary ... END) AS salary",
          "exp": "Applies tax rate deduction and rounds to nearest whole integer."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "JOIN with GROUP BY Max Table",
          "complexity": "O(N log N)",
          "sql": "SELECT s.company_id, s.employee_id, s.employee_name,\n       ROUND(CASE WHEN m.max_s < 1000 THEN s.salary WHEN m.max_s <= 10000 THEN s.salary * 0.76 ELSE s.salary * 0.51 END) AS salary\nFROM Salaries s JOIN (SELECT company_id, MAX(salary) AS max_s FROM Salaries GROUP BY company_id) m ON s.company_id = m.company_id;",
          "explanation": "Subquery join computing company max salaries."
        }
      ]
    },
    {
      "id": 1479,
      "title": "Sales by Day of the Week",
      "difficulty": "Hard",
      "acceptance": "78.4%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to report how many units in each item category have been ordered on each day of the week. Return the result table ordered by category.",
      "sampleInput": {
        "table": "Orders / Items",
        "columns": [
          "item_id",
          "order_date",
          "quantity",
          "item_category"
        ],
        "rows": [
          [
            1,
            "2020-06-01",
            10,
            "Book"
          ],
          [
            1,
            "2020-06-08",
            10,
            "Book"
          ],
          [
            2,
            "2020-06-02",
            5,
            "Phone"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "category",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "rows": [
          [
            "Book",
            20,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          [
            "Phone",
            0,
            5,
            0,
            0,
            0,
            0,
            0
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1479: DYNAMIC 7-DAY WEEKDAY CROSS-TAB PIVOT</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Orders</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Book: June 01 (Mon, qty 10)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Book: June 08 (Mon, qty 10)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Phone: June 02 (Tue, qty 5)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">SUM(IF(DAYOFWEEK(d)=2, qty, 0)) AS Monday...</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Pivoted Table</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Book: Mon=20, Tue=0...</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Phone: Mon=0, Tue=5...</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Every distinct item_category in Items must appear in the output, even if it has 0 orders (RIGHT/LEFT JOIN Items).",
        "Extract day of week: DAYNAME(order_date) or DAYOFWEEK(order_date).",
        "In MySQL, DAYOFWEEK returns 1 for Sunday, 2 for Monday, ..., 7 for Saturday.",
        "Conditionally sum quantity for each day: SUM(IF(DAYOFWEEK(o.order_date) = 2, o.quantity, 0)) AS Monday.",
        "Order by category ASC."
      ],
      "trapsAndEdgeCases": [
        "Zero-order categories: Must RIGHT JOIN Items or start FROM Items with LEFT JOIN Orders so categories with 0 orders are preserved."
      ],
      "solutionSQL": "SELECT i.item_category AS Category,\n       SUM(IF(DAYNAME(o.order_date) = 'Monday', o.quantity, 0)) AS Monday,\n       SUM(IF(DAYNAME(o.order_date) = 'Tuesday', o.quantity, 0)) AS Tuesday,\n       SUM(IF(DAYNAME(o.order_date) = 'Wednesday', o.quantity, 0)) AS Wednesday,\n       SUM(IF(DAYNAME(o.order_date) = 'Thursday', o.quantity, 0)) AS Thursday,\n       SUM(IF(DAYNAME(o.order_date) = 'Friday', o.quantity, 0)) AS Friday,\n       SUM(IF(DAYNAME(o.order_date) = 'Saturday', o.quantity, 0)) AS Saturday,\n       SUM(IF(DAYNAME(o.order_date) = 'Sunday', o.quantity, 0)) AS Sunday\nFROM Items i\nLEFT JOIN Orders o ON i.item_id = o.item_id\nGROUP BY i.item_category\nORDER BY Category ASC;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT i.item_category AS Category,",
          "exp": "Emits product category."
        },
        {
          "clause": "SUM(IF(DAYNAME(o.order_date) = 'Monday', o.quantity, 0)) AS Monday ...",
          "exp": "Pivots quantities into distinct weekday column sums."
        },
        {
          "clause": "FROM Items i LEFT JOIN Orders o ON i.item_id = o.item_id",
          "exp": "Left joins to preserve categories with zero orders."
        },
        {
          "clause": "GROUP BY i.item_category ORDER BY Category ASC",
          "exp": "Groups and sorts alphabetically."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "DAYOFWEEK Numeric Indexing",
          "complexity": "O(N log N)",
          "sql": "SELECT i.item_category AS Category,\n       SUM(IF(DAYOFWEEK(o.order_date)=2, o.quantity, 0)) AS Monday,\n       SUM(IF(DAYOFWEEK(o.order_date)=3, o.quantity, 0)) AS Tuesday,\n       ...\nFROM Items i LEFT JOIN Orders o ON i.item_id = o.item_id GROUP BY 1 ORDER BY 1;",
          "explanation": "Numeric day indices (2=Monday to 7=Saturday, 1=Sunday)."
        }
      ]
    },
    {
      "id": 1501,
      "title": "Countries You Can Safely Invest In",
      "difficulty": "Medium",
      "acceptance": "52.8%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "A telecommunications company wants to invest in new countries. The country has to have an average call duration strictly greater than the global average call duration. Write a solution to find the countries where this condition is met. Return the result table in any order.",
      "sampleInput": {
        "table": "Person / Country / Calls",
        "columns": [
          "id",
          "name",
          "phone_number",
          "country_code",
          "caller_id",
          "callee_id",
          "duration"
        ],
        "rows": [
          [
            3,
            "Jonathan",
            "051-1234567",
            "051",
            3,
            12,
            33
          ],
          [
            12,
            "Elvis",
            "051-7654321",
            "051",
            1,
            2,
            59
          ],
          [
            1,
            "Bob",
            "033-1111111",
            "033",
            2,
            7,
            102
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "country"
        ],
        "rows": [
          [
            "Peru"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1501: COUNTRY CALL DURATION VS GLOBAL MEAN</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Calls</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Caller 3 (051) -> Callee 12 (051): 33 min</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Global Avg: 54.7 min</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">AVG(duration) > (SELECT AVG(duration) FROM Calls)</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Investment Target</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">country: Peru (Avg > Global)</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Every call has two participants: caller_id and callee_id, both accumulating duration for their respective country.",
        "Unfold calls using UNION ALL: SELECT caller_id AS person_id, duration FROM Calls UNION ALL SELECT callee_id, duration FROM Calls.",
        "Join person_id to Person, extract the 3-digit country code (SUBSTRING(phone_number, 1, 3)), and join to Country.",
        "HAVING AVG(duration) > (SELECT AVG(duration) FROM Calls)."
      ],
      "trapsAndEdgeCases": [
        "Bidirectional participant trap: Counting only caller_id ignores half the telephone traffic; must include callee_id."
      ],
      "solutionSQL": "WITH AllCallers AS (\n    SELECT caller_id AS person_id, duration FROM Calls\n    UNION ALL\n    SELECT callee_id AS person_id, duration FROM Calls\n)\nSELECT c.name AS country\nFROM Country c\nJOIN Person p ON c.country_code = SUBSTRING(p.phone_number, 1, 3)\nJOIN AllCallers ac ON p.id = ac.person_id\nGROUP BY c.name\nHAVING AVG(ac.duration) > (SELECT AVG(duration) FROM Calls);",
      "lineByLineExplanation": [
        {
          "clause": "WITH AllCallers AS (SELECT caller_id AS person_id ... UNION ALL SELECT callee_id ...)",
          "exp": "Normalizes calls from both caller and receiver perspectives."
        },
        {
          "clause": "JOIN Person p ON c.country_code = SUBSTRING(p.phone_number, 1, 3)",
          "exp": "Maps phone prefixes to country codes."
        },
        {
          "clause": "HAVING AVG(ac.duration) > (SELECT AVG(duration) FROM Calls)",
          "exp": "Filters countries whose average duration beats global average."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "CROSS JOIN Global Average",
          "complexity": "O(N log N)",
          "sql": "WITH GlobalAvg AS (SELECT AVG(duration) AS g_avg FROM Calls)\nSELECT c.name AS country FROM Country c ... CROSS JOIN GlobalAvg g\nGROUP BY c.name, g.g_avg HAVING AVG(ac.duration) > g.g_avg;",
          "explanation": "Cross joins scalar global mean directly into the query block."
        }
      ]
    },
    {
      "id": 1532,
      "title": "The Most Recent Three Orders",
      "difficulty": "Medium",
      "acceptance": "69.7%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to find the most recent three orders of each user. If a user ordered less than three orders, return all of their orders. Return the result table ordered by customer_name in ascending order, customer_id in ascending order, and order_date in descending order.",
      "sampleInput": {
        "table": "Customers / Orders",
        "columns": [
          "customer_id",
          "name",
          "order_id",
          "order_date"
        ],
        "rows": [
          [
            1,
            "Winston",
            1,
            "2020-07-31"
          ],
          [
            1,
            "Winston",
            2,
            "2020-07-30"
          ],
          [
            1,
            "Winston",
            3,
            "2020-07-29"
          ],
          [
            1,
            "Winston",
            4,
            "2020-07-28"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "customer_name",
          "customer_id",
          "order_id",
          "order_date"
        ],
        "rows": [
          [
            "Winston",
            1,
            1,
            "2020-07-31"
          ],
          [
            "Winston",
            1,
            2,
            "2020-07-30"
          ],
          [
            "Winston",
            1,
            3,
            "2020-07-29"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1532: TOP 3 ORDERS CHRONOLOGICAL SLICE</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Winston Orders</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">O1: July 31 (Rank 1)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">O2: July 30 (Rank 2)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">O3: July 29 (Rank 3)</text><text x=\"14\" y=\"96\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">O4: July 28 (Rank 4 ❌)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">ROW_NUMBER() OVER(PARTITION BY customer_id\\nORDER BY order_date DESC) <= 3</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Top 3 Orders</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Winston: O1, O2, O3</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Join Customers with Orders.",
        "Assign ROW_NUMBER() partitioned by customer_id and ordered by order_date DESC.",
        "Filter for rnk <= 3.",
        "Order by customer_name ASC, customer_id ASC, order_date DESC."
      ],
      "trapsAndEdgeCases": [
        "Sorting hierarchy: Must follow the exact 3-level sort order specified in the problem statement."
      ],
      "solutionSQL": "WITH RankedOrders AS (\n    SELECT c.name AS customer_name,\n           c.customer_id,\n           o.order_id,\n           o.order_date,\n           ROW_NUMBER() OVER (\n               PARTITION BY c.customer_id\n               ORDER BY o.order_date DESC\n           ) AS rnk\n    FROM Customers c\n    JOIN Orders o ON c.customer_id = o.customer_id\n)\nSELECT customer_name, customer_id, order_id, order_date\nFROM RankedOrders\nWHERE rnk <= 3\nORDER BY customer_name ASC, customer_id ASC, order_date DESC;",
      "lineByLineExplanation": [
        {
          "clause": "WITH RankedOrders AS (...)",
          "exp": "Ranks each customer's orders chronologically in descending order."
        },
        {
          "clause": "SELECT customer_name, customer_id, order_id, order_date FROM RankedOrders WHERE rnk <= 3",
          "exp": "Retains top 3 orders per customer."
        },
        {
          "clause": "ORDER BY customer_name ASC, customer_id ASC, order_date DESC",
          "exp": "Sorts final rows per requirement."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Correlated Subquery Count",
          "complexity": "O(N^2)",
          "sql": "SELECT c.name AS customer_name, c.customer_id, o1.order_id, o1.order_date\nFROM Customers c JOIN Orders o1 ON c.customer_id = o1.customer_id\nWHERE (\n  SELECT COUNT(*) FROM Orders o2 WHERE o2.customer_id = o1.customer_id AND o2.order_date > o1.order_date\n) < 3 ORDER BY customer_name, customer_id, order_date DESC;",
          "explanation": "Correlated subquery counting newer orders."
        }
      ]
    },
    {
      "id": 1549,
      "title": "The Most Recent Orders for Each Product",
      "difficulty": "Medium",
      "acceptance": "66.5%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to find the most recent order(s) of each product. Return the result table with product_name, product_id, order_id, and order_date ordered by product_name ASC, product_id ASC, and order_id ASC.",
      "sampleInput": {
        "table": "Products / Orders",
        "columns": [
          "product_id",
          "product_name",
          "order_id",
          "order_date"
        ],
        "rows": [
          [
            1,
            "keyboard",
            1,
            "2020-08-01"
          ],
          [
            1,
            "keyboard",
            2,
            "2020-08-01"
          ],
          [
            2,
            "mouse",
            3,
            "2020-08-03"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "product_name",
          "product_id",
          "order_id",
          "order_date"
        ],
        "rows": [
          [
            "keyboard",
            1,
            1,
            "2020-08-01"
          ],
          [
            "keyboard",
            1,
            2,
            "2020-08-01"
          ],
          [
            "mouse",
            2,
            3,
            "2020-08-03"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1549: MULTI-ORDER LATEST DATE TIE PRESERVATION</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Orders</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Keyboard: O1 (Aug 01), O2 (Aug 01)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Mouse: O3 (Aug 03)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">DENSE_RANK() OVER(PARTITION BY product_id\\nORDER BY order_date DESC) = 1</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Most Recent</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">keyboard -> O1, O2 (Both tied for latest!)</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">mouse -> O3</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Multiple orders can be placed for the same product on its latest date.",
        "Using ROW_NUMBER() would drop ties; DENSE_RANK() or RANK() is required.",
        "Partition by product_id and order by order_date DESC.",
        "Filter for rnk = 1, join with Products, and order by product_name ASC, product_id ASC, order_id ASC."
      ],
      "trapsAndEdgeCases": [
        "Ties on max date: If two orders occur on the same latest date, both must be returned."
      ],
      "solutionSQL": "WITH RankedOrders AS (\n    SELECT p.product_name,\n           p.product_id,\n           o.order_id,\n           o.order_date,\n           DENSE_RANK() OVER (\n               PARTITION BY p.product_id\n               ORDER BY o.order_date DESC\n           ) AS rnk\n    FROM Products p\n    JOIN Orders o ON p.product_id = o.product_id\n)\nSELECT product_name, product_id, order_id, order_date\nFROM RankedOrders\nWHERE rnk = 1\nORDER BY product_name ASC, product_id ASC, order_id ASC;",
      "lineByLineExplanation": [
        {
          "clause": "WITH RankedOrders AS (...)",
          "exp": "Ranks orders per product using DENSE_RANK to retain date ties."
        },
        {
          "clause": "SELECT product_name, product_id, order_id, order_date FROM RankedOrders WHERE rnk = 1",
          "exp": "Filters for the latest order date."
        },
        {
          "clause": "ORDER BY product_name ASC, product_id ASC, order_id ASC",
          "exp": "Sorts final output."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Tuple IN MAX(order_date)",
          "complexity": "O(N log N)",
          "sql": "SELECT p.product_name, p.product_id, o.order_id, o.order_date\nFROM Products p JOIN Orders o ON p.product_id = o.product_id\nWHERE (p.product_id, o.order_date) IN (SELECT product_id, MAX(order_date) FROM Orders GROUP BY product_id)\nORDER BY product_name, product_id, order_id;",
          "explanation": "Matches max date directly per product."
        }
      ]
    },
    {
      "id": 1555,
      "title": "Bank Account Summary",
      "difficulty": "Medium",
      "acceptance": "51.2%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to report the user_id, user_name, credit, and credit_limit_breached ('Yes' or 'No') for each user after executing all transactions. A user's credit limit is breached if their final credit balance is negative (< 0).",
      "sampleInput": {
        "table": "Users / Transactions",
        "columns": [
          "user_id",
          "user_name",
          "credit",
          "paid_by",
          "paid_to",
          "amount"
        ],
        "rows": [
          [
            1,
            "Winston",
            1000,
            1,
            2,
            400
          ],
          [
            2,
            "Jonathan",
            200,
            2,
            1,
            500
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "user_id",
          "user_name",
          "credit",
          "credit_limit_breached"
        ],
        "rows": [
          [
            1,
            "Winston",
            1100,
            "No"
          ],
          [
            2,
            "Jonathan",
            100,
            "No"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1555: NET DEBIT/CREDIT ACCOUNT RECONCILIATION</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Transactions</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">U1 pays U2: -400 to U1, +400 to U2</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">U2 pays U1: -500 to U2, +500 to U1</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">credit - paid_by_sum + paid_to_sum\\nIF(credit < 0, 'Yes', 'No')</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Final Balances</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">U1: 1000 - 400 + 500 = 1100 (No)</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">U2: 200 + 400 - 500 = 100 (No)</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "When user acts as paid_by, their balance decreases: -amount.",
        "When user acts as paid_to, their balance increases: +amount.",
        "Union all debits and credits: (paid_by AS user_id, -amount) UNION ALL (paid_to AS user_id, amount).",
        "LEFT JOIN Users with net transactions and compute final_credit = u.credit + IFNULL(SUM(amount), 0).",
        "Check IF(final_credit < 0, 'Yes', 'No')."
      ],
      "trapsAndEdgeCases": [
        "Users with 0 transactions: Must preserve their starting credit and report 'No' (or 'Yes' if starting balance was already negative)."
      ],
      "solutionSQL": "WITH NetTransactions AS (\n    SELECT paid_by AS user_id, -amount AS delta FROM Transactions\n    UNION ALL\n    SELECT paid_to AS user_id, amount AS delta FROM Transactions\n),\nUserTotals AS (\n    SELECT user_id, SUM(delta) AS net_change\n    FROM NetTransactions\n    GROUP BY user_id\n)\nSELECT u.user_id,\n       u.user_name,\n       u.credit + IFNULL(t.net_change, 0) AS credit,\n       CASE\n           WHEN u.credit + IFNULL(t.net_change, 0) < 0 THEN 'Yes'\n           ELSE 'No'\n       END AS credit_limit_breached\nFROM Users u\nLEFT JOIN UserTotals t ON u.user_id = t.user_id;",
      "lineByLineExplanation": [
        {
          "clause": "WITH NetTransactions AS (...)",
          "exp": "Represents debits as negative and credits as positive deltas."
        },
        {
          "clause": "UserTotals AS (...)",
          "exp": "Aggregates net transactional impact per user."
        },
        {
          "clause": "u.credit + IFNULL(t.net_change, 0) AS credit,",
          "exp": "Calculates updated ending balance."
        },
        {
          "clause": "CASE WHEN ... < 0 THEN 'Yes' ELSE 'No' END AS credit_limit_breached",
          "exp": "Flags negative credit balances."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Two-Sided Subquery Join",
          "complexity": "O(N log N)",
          "sql": "SELECT u.user_id, u.user_name,\n       u.credit - IFNULL(outflow.total, 0) + IFNULL(inflow.total, 0) AS credit,\n       IF(u.credit - IFNULL(outflow.total, 0) + IFNULL(inflow.total, 0) < 0, 'Yes', 'No') AS credit_limit_breached\nFROM Users u\nLEFT JOIN (SELECT paid_by, SUM(amount) AS total FROM Transactions GROUP BY paid_by) outflow ON u.user_id = outflow.paid_by\nLEFT JOIN (SELECT paid_to, SUM(amount) AS total FROM Transactions GROUP BY paid_to) inflow ON u.user_id = inflow.paid_to;",
          "explanation": "Joins separate inflow and outflow aggregates."
        }
      ]
    },
    {
      "id": 1596,
      "title": "The Most Frequently Ordered Products for Each Customer",
      "difficulty": "Medium",
      "acceptance": "66.3%",
      "interviewFreq": "High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to find the most frequently ordered product(s) for each customer. In case of a tie, report all tied products. Return the result table with customer_id, product_id, and product_name.",
      "sampleInput": {
        "table": "Customers / Orders / Products",
        "columns": [
          "customer_id",
          "order_id",
          "product_id",
          "product_name"
        ],
        "rows": [
          [
            1,
            1,
            1,
            "keyboard"
          ],
          [
            1,
            2,
            1,
            "keyboard"
          ],
          [
            1,
            3,
            2,
            "mouse"
          ],
          [
            2,
            4,
            2,
            "mouse"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "customer_id",
          "product_id",
          "product_name"
        ],
        "rows": [
          [
            1,
            1,
            "keyboard"
          ],
          [
            2,
            2,
            "mouse"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1596: PRODUCT ORDER FREQUENCY PER CUSTOMER</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Order Counts</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Cust 1: Keyboard (2 orders, Max)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Cust 1: Mouse (1 order)</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Cust 2: Mouse (1 order, Max)</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">DENSE_RANK() OVER(PARTITION BY customer_id\\nORDER BY COUNT(*) DESC) = 1</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Top Product</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Cust 1 -> Keyboard</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Cust 2 -> Mouse</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Count orders per (customer_id, product_id).",
        "Use DENSE_RANK() partitioned by customer_id and ordered by COUNT(*) DESC to rank products by order volume.",
        "Filter for rnk = 1 and join to Products to retrieve product_name."
      ],
      "trapsAndEdgeCases": [
        "Tied favorites: If a customer orders two products an equal maximum number of times, both must be returned."
      ],
      "solutionSQL": "WITH ProductCounts AS (\n    SELECT customer_id,\n           product_id,\n           DENSE_RANK() OVER (\n               PARTITION BY customer_id\n               ORDER BY COUNT(*) DESC\n           ) AS rnk\n    FROM Orders\n    GROUP BY customer_id, product_id\n)\nSELECT pc.customer_id,\n       pc.product_id,\n       p.product_name\nFROM ProductCounts pc\nJOIN Products p ON pc.product_id = p.product_id\nWHERE pc.rnk = 1;",
      "lineByLineExplanation": [
        {
          "clause": "WITH ProductCounts AS (SELECT ..., DENSE_RANK() OVER (PARTITION BY customer_id ORDER BY COUNT(*) DESC) AS rnk ...)",
          "exp": "Calculates order frequencies and ranks products per customer."
        },
        {
          "clause": "SELECT pc.customer_id, pc.product_id, p.product_name FROM ProductCounts pc JOIN Products p ... WHERE pc.rnk = 1",
          "exp": "Filters for top frequency products and attaches name."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Correlated Subquery MAX",
          "complexity": "O(N^2)",
          "sql": "SELECT o.customer_id, o.product_id, p.product_name\nFROM Orders o JOIN Products p ON o.product_id = p.product_id\nGROUP BY o.customer_id, o.product_id, p.product_name\nHAVING COUNT(*) = (\n  SELECT MAX(cnt) FROM (SELECT customer_id, product_id, COUNT(*) AS cnt FROM Orders GROUP BY customer_id, product_id) t\n  WHERE t.customer_id = o.customer_id\n);",
          "explanation": "Correlated subquery matching max order count."
        }
      ]
    },
    {
      "id": 1613,
      "title": "Find the Missing IDs",
      "difficulty": "Medium",
      "acceptance": "78.4%",
      "interviewFreq": "Very High • Amazon",
      "companies": [
        "Amazon"
      ],
      "prompt": "Write a solution to find the missing customer IDs. The missing IDs are ones that are not in Customers but are less than the maximum customer_id present in the table. Return the result table ordered by ids in ascending order.",
      "sampleInput": {
        "table": "Customers",
        "columns": [
          "customer_id",
          "customer_name"
        ],
        "rows": [
          [
            1,
            "Alice"
          ],
          [
            4,
            "Bob"
          ],
          [
            5,
            "Charlie"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "ids"
        ],
        "rows": [
          [
            2
          ],
          [
            3
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1613: RECURSIVE SEQUENCE DOMAIN SUBTRACTION</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Existing IDs</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Present: 1, 4, 5 (Max ID = 5)</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Sequence: 1, 2, 3, 4, 5</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">WITH RECURSIVE Seq (1 to MAX)\\nWHERE n NOT IN (Customers)</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Missing IDs</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">ids: 2</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">ids: 3</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Use a recursive CTE to synthesize all integers from 1 up to MAX(customer_id).",
        "Filter the generated numbers where n NOT IN (SELECT customer_id FROM Customers).",
        "Order by ids ASC."
      ],
      "trapsAndEdgeCases": [
        "Recursive recursion limit: Problem guarantees MAX(customer_id) <= 100, which is well within standard recursion limits."
      ],
      "solutionSQL": "WITH RECURSIVE Seq AS (\n    SELECT 1 AS ids\n    UNION ALL\n    SELECT ids + 1\n    FROM Seq\n    WHERE ids < (SELECT MAX(customer_id) FROM Customers)\n)\nSELECT ids\nFROM Seq\nWHERE ids NOT IN (SELECT customer_id FROM Customers)\nORDER BY ids ASC;",
      "lineByLineExplanation": [
        {
          "clause": "WITH RECURSIVE Seq AS (SELECT 1 AS ids UNION ALL SELECT ids + 1 FROM Seq WHERE ids < (SELECT MAX(customer_id) FROM Customers))",
          "exp": "Recursively generates consecutive integers up to max customer ID."
        },
        {
          "clause": "SELECT ids FROM Seq WHERE ids NOT IN (SELECT customer_id FROM Customers)",
          "exp": "Filters out existing customer IDs to identify gaps."
        },
        {
          "clause": "ORDER BY ids ASC",
          "exp": "Sorts missing numbers in ascending sequence."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "LEFT JOIN Anti-Filter",
          "complexity": "O(Max ID)",
          "sql": "WITH RECURSIVE Seq AS (SELECT 1 AS ids UNION ALL SELECT ids + 1 FROM Seq WHERE ids < (SELECT MAX(customer_id) FROM Customers))\nSELECT s.ids FROM Seq s LEFT JOIN Customers c ON s.ids = c.customer_id WHERE c.customer_id IS NULL ORDER BY s.ids;",
          "explanation": "Left anti-join syntax checking for NULL customer_id."
        }
      ]
    },
    {
      "id": 1635,
      "title": "Hopper Company Queries I",
      "difficulty": "Hard",
      "acceptance": "48.2%",
      "interviewFreq": "Very High • Uber",
      "companies": [
        "Uber"
      ],
      "prompt": "Write a solution to report the following for each month of 2020:\n- active_drivers: total number of active drivers by the end of that month\n- accepted_rides: number of accepted rides in that month\nOrder by month ASC.",
      "sampleInput": {
        "table": "Drivers / AcceptedRides",
        "columns": [
          "driver_id",
          "join_date",
          "ride_id",
          "requested_at"
        ],
        "rows": [
          [
            10,
            "2019-12-10",
            1,
            "2020-01-01"
          ],
          [
            8,
            "2020-01-13",
            2,
            "2020-01-02"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "month",
          "active_drivers",
          "accepted_rides"
        ],
        "rows": [
          [
            1,
            2,
            2
          ],
          [
            2,
            2,
            0
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1635: RIDE-SHARING MONTHLY METRICS RECONCILIATION</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Drivers & Rides</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Drivers joined before or in Jan: 2</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Rides accepted in Jan: 2</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">12-Month Calendar (1 to 12)\\nLEFT JOIN Drivers & Rides</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Monthly Summary</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Month 1: active=2, rides=2</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Month 2: active=2, rides=0</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Generate all 12 calendar months of 2020 using a recursive CTE (1 to 12).",
        "Active drivers by month M: Drivers who joined on or before the last day of month M (join_date <= '2020-M-31').",
        "Accepted rides in month M: Rides requested in 2020 with MONTH(requested_at) = M that appear in AcceptedRides.",
        "Join the 12 calendar months with active drivers count and accepted rides count."
      ],
      "trapsAndEdgeCases": [
        "Pre-2020 drivers: Drivers who joined in 2018 or 2019 are active in all months of 2020; they must be included starting in Month 1."
      ],
      "solutionSQL": "WITH RECURSIVE Months AS (\n    SELECT 1 AS month\n    UNION ALL\n    SELECT month + 1 FROM Months WHERE month < 12\n),\nMonthlyRides AS (\n    SELECT MONTH(r.requested_at) AS month,\n           COUNT(a.ride_id) AS accepted_rides\n    FROM Rides r\n    JOIN AcceptedRides a ON r.ride_id = a.ride_id\n    WHERE YEAR(r.requested_at) = 2020\n    GROUP BY MONTH(r.requested_at)\n)\nSELECT m.month,\n       (\n           SELECT COUNT(*)\n           FROM Drivers d\n           WHERE d.join_date < DATE_ADD('2020-01-01', INTERVAL m.month MONTH)\n       ) AS active_drivers,\n       IFNULL(mr.accepted_rides, 0) AS accepted_rides\nFROM Months m\nLEFT JOIN MonthlyRides mr ON m.month = mr.month\nORDER BY m.month ASC;",
      "lineByLineExplanation": [
        {
          "clause": "WITH RECURSIVE Months AS (SELECT 1 AS month UNION ALL SELECT month + 1 ... WHERE month < 12)",
          "exp": "Generates numbers 1 to 12 representing each month."
        },
        {
          "clause": "MonthlyRides AS (...)",
          "exp": "Aggregates accepted rides occurring in 2020 by month."
        },
        {
          "clause": "(SELECT COUNT(*) FROM Drivers d WHERE d.join_date < DATE_ADD('2020-01-01', INTERVAL m.month MONTH)) AS active_drivers",
          "exp": "Counts cumulative drivers joined prior to the end of each target month."
        },
        {
          "clause": "IFNULL(mr.accepted_rides, 0) AS accepted_rides",
          "exp": "Coalesces months with zero accepted rides to 0."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "JOIN with Cumulative Sum",
          "complexity": "O(D log D + 12)",
          "sql": "WITH RECURSIVE Months AS (SELECT 1 AS month UNION ALL SELECT month + 1 FROM Months WHERE month < 12),\nMonthlyDrivers AS (\n  SELECT m.month, COUNT(d.driver_id) AS cnt FROM Months m LEFT JOIN Drivers d ON YEAR(d.join_date) = 2020 AND MONTH(d.join_date) = m.month GROUP BY m.month\n) ...",
          "explanation": "Separately counts initial drivers and accumulates monthly new drivers."
        }
      ]
    },
    {
      "id": 1645,
      "title": "Hopper Company Queries II",
      "difficulty": "Hard",
      "acceptance": "44.9%",
      "interviewFreq": "Very High • Uber",
      "companies": [
        "Uber"
      ],
      "prompt": "Write a solution to report the working_percentage of active drivers for each month of 2020, where working_percentage = (working drivers in month / active drivers by end of month) * 100. Round to 2 decimal places. If active drivers = 0, return 0.00.",
      "sampleInput": {
        "table": "Drivers / Rides / AcceptedRides",
        "columns": [
          "driver_id",
          "join_date",
          "requested_at"
        ],
        "rows": [
          [
            10,
            "2019-12-10",
            "2020-01-01"
          ],
          [
            8,
            "2020-01-13",
            "2020-01-02"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "month",
          "working_percentage"
        ],
        "rows": [
          [
            1,
            100
          ],
          [
            2,
            0
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1645: WORKING DRIVERS UTILIZATION PERCENTAGE</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Month 1 Metrics</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Active Drivers: 2</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Distinct Drivers with >=1 ride: 2</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Working Percentage: 100%</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">ROUND(working_drivers / active_drivers * 100, 2)</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Monthly Utilization</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Month 1: 100.00%</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Month 2: 0.00%</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Use Months CTE (1 to 12).",
        "Active drivers = Total drivers joined before or during month M.",
        "Working drivers = Distinct drivers who accepted at least one ride requested in month M: COUNT(DISTINCT a.driver_id).",
        "working_percentage = ROUND(IFNULL(working_drivers / active_drivers * 100, 0), 2).",
        "If active_drivers is 0, percentage defaults to 0.00."
      ],
      "trapsAndEdgeCases": [
        "Distinct working drivers: A driver who completes 10 rides in a month only counts as 1 working driver."
      ],
      "solutionSQL": "WITH RECURSIVE Months AS (\n    SELECT 1 AS month\n    UNION ALL\n    SELECT month + 1 FROM Months WHERE month < 12\n),\nWorkingDrivers AS (\n    SELECT MONTH(r.requested_at) AS month,\n           COUNT(DISTINCT a.driver_id) AS working_drivers\n    FROM Rides r\n    JOIN AcceptedRides a ON r.ride_id = a.ride_id\n    WHERE YEAR(r.requested_at) = 2020\n    GROUP BY MONTH(r.requested_at)\n)\nSELECT m.month,\n       ROUND(\n           IFNULL(\n               wd.working_drivers * 100.0 /\n               NULLIF((SELECT COUNT(*) FROM Drivers d WHERE d.join_date < DATE_ADD('2020-01-01', INTERVAL m.month MONTH)), 0),\n               0\n           ),\n           2\n       ) AS working_percentage\nFROM Months m\nLEFT JOIN WorkingDrivers wd ON m.month = wd.month\nORDER BY m.month ASC;",
      "lineByLineExplanation": [
        {
          "clause": "WITH RECURSIVE Months AS (...)",
          "exp": "Generates calendar months 1 through 12."
        },
        {
          "clause": "WorkingDrivers AS (...)",
          "exp": "Counts distinct drivers with at least one completed ride in the month."
        },
        {
          "clause": "ROUND(IFNULL(wd.working_drivers * 100.0 / NULLIF(active_drivers, 0), 0), 2) AS working_percentage",
          "exp": "Computes working percentage with NULLIF zero-division guard, rounded to 2 decimals."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "CTE Metric Join",
          "complexity": "O(R + D + 12)",
          "sql": "WITH Active AS (SELECT m.month, ...), Working AS (SELECT m.month, ...)\nSELECT a.month, ROUND(IFNULL(w.cnt * 100 / a.cnt, 0), 2) AS working_percentage FROM Active a LEFT JOIN Working w ON a.month = w.month;",
          "explanation": "Modular join between separate Active and Working driver tables."
        }
      ]
    },
    {
      "id": 1651,
      "title": "Hopper Company Queries III",
      "difficulty": "Hard",
      "acceptance": "54.1%",
      "interviewFreq": "Very High • Uber",
      "companies": [
        "Uber"
      ],
      "prompt": "Write a solution to compute the average_ride_distance and average_ride_duration of that month and the following two months for each month between January and October 2020 (inclusive). Round averages to 2 decimal places. Order by month ASC.",
      "sampleInput": {
        "table": "Rides / AcceptedRides",
        "columns": [
          "ride_id",
          "requested_at",
          "ride_distance",
          "ride_duration"
        ],
        "rows": [
          [
            1,
            "2020-01-01",
            10,
            20
          ],
          [
            2,
            "2020-02-01",
            10,
            20
          ],
          [
            3,
            "2020-03-01",
            10,
            20
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "month",
          "average_ride_distance",
          "average_ride_duration"
        ],
        "rows": [
          [
            1,
            10,
            20
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n    <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1651: 3-MONTH ROLLING WINDOW DISTANCE & DURATION</text>\n\n    <!-- Source Box -->\n    <g transform=\"translate(35, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"280\" height=\"95\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n      <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Monthly Totals</text>\n      <text x=\"14\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">M1: 10 mi, 20 min</text><text x=\"14\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">M2: 10 mi, 20 min</text><text x=\"14\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">M3: 10 mi, 20 min</text>\n    </g>\n\n    <!-- Flow Arrow -->\n    <path d=\"M 335 100 L 385 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Transformation / Formula -->\n    <g transform=\"translate(395, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"240\" height=\"95\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n      <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Execution Logic</text>\n      <text x=\"12\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9\">AVG(metric) OVER(ROWS BETWEEN CURRENT ROW\\nAND 2 FOLLOWING) [Months 1 to 10]</text>\n    </g>\n\n    <path d=\"M 655 100 L 705 100\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n    <!-- Target Output -->\n    <g transform=\"translate(715, 52)\">\n      <rect x=\"0\" y=\"0\" width=\"135\" height=\"95\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n      <text x=\"12\" y=\"22\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">3-Mo Moving Avg</text>\n      <text x=\"14\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Month 1: (10+10+10)/3 = 10.00 mi</text><text x=\"14\" y=\"60\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\">Month 1: (20+20+20)/3 = 20.00 min</text>\n    </g>\n  </svg>",
      "logicBreakdown": [
        "Generate months 1 to 12.",
        "Sum ride_distance and ride_duration for each month of 2020, coalescing empty months to 0.",
        "Calculate 3-month forward moving average using AVG() OVER (ORDER BY month ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING).",
        "Filter for months 1 through 10 (since months 11 and 12 do not have 2 succeeding months within the year).",
        "Round averages to 2 decimal places."
      ],
      "trapsAndEdgeCases": [
        "Month limit: Must strictly output months 1 to 10 (January through October)."
      ],
      "solutionSQL": "WITH RECURSIVE Months AS (\n    SELECT 1 AS month\n    UNION ALL\n    SELECT month + 1 FROM Months WHERE month < 12\n),\nMonthlyAggs AS (\n    SELECT m.month,\n           IFNULL(SUM(a.ride_distance), 0) AS total_distance,\n           IFNULL(SUM(a.ride_duration), 0) AS total_duration\n    FROM Months m\n    LEFT JOIN Rides r ON m.month = MONTH(r.requested_at) AND YEAR(r.requested_at) = 2020\n    LEFT JOIN AcceptedRides a ON r.ride_id = a.ride_id\n    GROUP BY m.month\n),\nRollingAvgs AS (\n    SELECT month,\n           ROUND(AVG(total_distance) OVER (\n               ORDER BY month\n               ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING\n           ), 2) AS average_ride_distance,\n           ROUND(AVG(total_duration) OVER (\n               ORDER BY month\n               ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING\n           ), 2) AS average_ride_duration\n    FROM MonthlyAggs\n)\nSELECT month, average_ride_distance, average_ride_duration\nFROM RollingAvgs\nWHERE month <= 10\nORDER BY month ASC;",
      "lineByLineExplanation": [
        {
          "clause": "WITH RECURSIVE Months AS (...)",
          "exp": "Generates all 12 calendar months."
        },
        {
          "clause": "MonthlyAggs AS (...)",
          "exp": "Sums monthly distance and duration, defaulting zero-ride months to 0."
        },
        {
          "clause": "AVG(total_distance) OVER (ORDER BY month ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING)",
          "exp": "Computes 3-month forward sliding average."
        },
        {
          "clause": "WHERE month <= 10 ORDER BY month ASC",
          "exp": "Restricts to January through October (months 1-10)."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Explicit SUM / 3 Window",
          "complexity": "O(12)",
          "sql": "SELECT month,\n       ROUND(SUM(total_distance) OVER (ORDER BY month ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING) / 3.0, 2) AS average_ride_distance,\n       ROUND(SUM(total_duration) OVER (ORDER BY month ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING) / 3.0, 2) AS average_ride_duration\nFROM MonthlyAggs WHERE month <= 10;",
          "explanation": "Computes 3-month sum divided by constant 3."
        }
      ]
    }
  ]
};
