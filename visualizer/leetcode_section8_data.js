// =============================================================================
// LEETCODE ARENA - CONCEPT 8: STATISTICAL DISTRIBUTIONS & CONTINUOUS MEDIANS
// 12 Curated LeetCode Problems | 8 Masterclass Chapters | 100 MCQs | 100 Drills
// =============================================================================

window.LEETCODE_SECTION_8_DATA = {
  "conceptId": "concept-8",
  "conceptNumber": 8,
  "title": "Statistical Distributions & Medians",
  "description": "Master continuous medians, frequency tables, DENSE_RANK tie-breakers, rolling multi-period sums, and user-defined scalar function wrappers.",
  "masterclass": {
    "chapters": [
      {
        "id": "chap-8-1-udf-scalar-offsets",
        "number": "8.1",
        "title": "User-Defined Functions, Scalar Wrappers & LIMIT Offsets",
        "content": "\n      <p class=\"lc-p\">\n        In technical interviews involving <em>Nth</em> statistics (e.g., LeetCode #177 <em>Nth Highest Salary</em>), database engines treat the <code>LIMIT</code> clause as a literal numerical token. Passing runtime expressions like <code>LIMIT N-1, 1</code> directly into an inline query triggers syntax errors in traditional MySQL syntax.\n      </p>\n\n      <div class=\"lc-rule-banner\">\n        <strong>The Stored Function &amp; Offset Invariant:</strong><br>\n        &bull; <strong>Variable Pre-computation:</strong> In MySQL UDFs (<code>CREATE FUNCTION</code>), you must decrement the input parameter in a procedural assignment block: <code>SET N = N - 1;</code> before executing the scalar query.<br>\n        &bull; <strong>Scalar Subquery NULL Fallback:</strong> If an employee table has fewer than <em>N</em> distinct salaries, an unwrapped query returns an empty result set (0 rows) instead of <code>NULL</code>. Wrap the query in an outer <code>SELECT (SELECT ...) AS ...</code> scalar wrapper.<br>\n        &bull; <strong>DENSE_RANK() Modern Parity:</strong> In modern SQL, UDFs can also be expressed cleanly using <code>DENSE_RANK() OVER (ORDER BY salary DESC)</code> inside a CTE, filtering <code>WHERE rnk = N</code>.\n      </div>\n    ",
        "diagram": {
          "title": "Scalar Offset Inversion & Empty Result Set NULL Fallback",
          "svg": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">SCALAR WRAPPER &amp; OFFSET RETRIEVAL (Nth HIGHEST SALARY)</text>\n        <g transform=\"translate(35, 55)\">\n          <rect x=\"0\" y=\"26\" width=\"160\" height=\"26\" rx=\"4\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n          <text x=\"12\" y=\"43\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\">Rank 1: $10,000</text>\n          <rect x=\"0\" y=\"56\" width=\"160\" height=\"26\" rx=\"4\" fill=\"#eff6ff\" stroke=\"#3b82f6\" stroke-width=\"1.5\"/>\n          <text x=\"12\" y=\"73\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">Rank 2: $8,000 (N=2)</text>\n        </g>\n        <path d=\"M 220 100 L 290 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrowC8)\"/>\n        <g transform=\"translate(310, 55)\">\n          <rect x=\"0\" y=\"26\" width=\"230\" height=\"56\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#16a34a\" stroke-width=\"1.5\"/>\n          <text x=\"12\" y=\"48\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">OFFSET: SET N = N - 1</text>\n          <text x=\"12\" y=\"68\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"9.5\">LIMIT 1 OFFSET 1 -> $8,000</text>\n        </g>\n        <g transform=\"translate(570, 55)\">\n          <rect x=\"0\" y=\"26\" width=\"260\" height=\"56\" rx=\"6\" fill=\"#fff7ed\" stroke=\"#ea580c\" stroke-width=\"1.5\"/>\n          <text x=\"12\" y=\"48\" fill=\"#c2410c\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">EMPTY RESULT GUARD</text>\n          <text x=\"12\" y=\"68\" fill=\"#9a3412\" font-family=\"monospace\" font-size=\"9.5\">SELECT (SELECT ...) -> Returns NULL</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-8-2-continuous-median-frequency",
        "number": "8.2",
        "title": "Continuous vs Discrete Median on Compressed Frequency Tables",
        "content": "\n      <p class=\"lc-p\">\n        In LeetCode #571 (<em>Find Median Given Frequency of Schedule</em>), numbers are stored compressed as <code>(num, frequency)</code> pairs. Expanding millions of rows with recursive joins is computationally catastrophic. The mathematically optimal solution calculates the <strong>cumulative frequency distribution</strong> from both directions.\n      </p>\n\n      <div class=\"lc-rule-banner\">\n        <strong>The Bi-Directional Cumulative Sum Median Theorem:</strong><br>\n        Let <code>total_count = SUM(frequency)</code> across the entire dataset.<br>\n        A number <em>X</em> qualifies as part of the median if and only if:<br>\n        <code>SUM(frequency) OVER (ORDER BY num ASC) &gt;= total_count / 2</code><br>\n        <strong>AND</strong><br>\n        <code>SUM(frequency) OVER (ORDER BY num DESC) &gt;= total_count / 2</code>.<br>\n        Averaging the qualifying numbers (<code>AVG(num)</code>) yields the exact median regardless of whether total count is odd or even!\n      </div>\n    ",
        "diagram": {
          "title": "Bi-Directional Cumulative Frequency Median Envelope",
          "svg": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">MEDIAN ON COMPRESSED FREQUENCIES (TOTAL COUNT = 12)</text>\n        <g transform=\"translate(40, 55)\">\n          <rect x=\"0\" y=\"25\" width=\"220\" height=\"26\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n          <text x=\"10\" y=\"42\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10\">Num: 0 | Freq: 7 | Asc: 7 | Desc: 12</text>\n          <rect x=\"0\" y=\"55\" width=\"220\" height=\"26\" fill=\"#ecfdf5\" stroke=\"#059669\" stroke-width=\"2\"/>\n          <text x=\"10\" y=\"72\" fill=\"#047857\" font-family=\"monospace\" font-size=\"10\" font-weight=\"700\">Num: 1 | Freq: 1 | Asc: 8 | Desc: 5</text>\n        </g>\n        <path d=\"M 280 100 L 350 100\" stroke=\"#059669\" stroke-width=\"2\"/>\n        <g transform=\"translate(370, 55)\">\n          <rect x=\"0\" y=\"25\" width=\"450\" height=\"60\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#16a34a\"/>\n          <text x=\"15\" y=\"48\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">MEDIAN CRITERION: Asc &gt;= 6 AND Desc &gt;= 6</text>\n          <text x=\"15\" y=\"68\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"9.5\">Num 0: Asc=7(&gt;=6), Desc=12(&gt;=6) -> INCLUDED in median average!</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-8-3-dense-rank-tie-breaker",
        "number": "8.3",
        "title": "DENSE_RANK() vs RANK() Invariants & Tie-Breaking Physics",
        "content": "\n      <p class=\"lc-p\">\n        In competitive leaderboard evaluation (e.g. LeetCode #178 <em>Rank Scores</em>), tie handling dictates analytical correctness.\n      </p>\n      <div class=\"lc-rule-banner\">\n        &bull; <code>ROW_NUMBER()</code> assigns strictly sequential unique integers (1, 2, 3, 4) ignoring ties.<br>\n        &bull; <code>RANK()</code> leaves gaps after ties: two tied at rank 1 produces (1, 1, 3).<br>\n        &bull; <code>DENSE_RANK()</code> never leaves gaps: two tied at rank 1 produces (1, 1, 2).\n      </div>\n    ",
        "diagram": {
          "title": "Ranking Semantics: ROW_NUMBER vs RANK vs DENSE_RANK",
          "svg": "<svg viewBox=\"0 0 880 160\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"130\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">RANKING SEMANTICS COMPARISON</text>\n        <g transform=\"translate(35, 55)\">\n          <rect x=\"0\" y=\"20\" width=\"180\" height=\"40\" fill=\"#f1f5f9\" stroke=\"#94a3b8\"/>\n          <text x=\"10\" y=\"36\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10\">Score: 4.0, 4.0, 3.85</text>\n          <text x=\"10\" y=\"52\" fill=\"#475569\" font-family=\"monospace\" font-size=\"9\">ROW_NUMBER: 1, 2, 3</text>\n        </g>\n        <g transform=\"translate(240, 55)\">\n          <rect x=\"0\" y=\"20\" width=\"180\" height=\"40\" fill=\"#fef2f2\" stroke=\"#ef4444\"/>\n          <text x=\"10\" y=\"36\" fill=\"#991b1b\" font-family=\"monospace\" font-size=\"10\">RANK(): 1, 1, 3</text>\n          <text x=\"10\" y=\"52\" fill=\"#b91c1c\" font-family=\"monospace\" font-size=\"9\">Gap after tie!</text>\n        </g>\n        <g transform=\"translate(445, 55)\">\n          <rect x=\"0\" y=\"20\" width=\"220\" height=\"40\" rx=\"4\" fill=\"#f0fdf4\" stroke=\"#16a34a\" stroke-width=\"2\"/>\n          <text x=\"10\" y=\"36\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\" font-weight=\"700\">DENSE_RANK(): 1, 1, 2</text>\n          <text x=\"10\" y=\"52\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"9\">Zero gaps (Consecutive)</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-8-4-percentiles-quantiles",
        "number": "8.4",
        "title": "Percentiles, Quantiles & Cumulative Distribution Functions",
        "content": "\n      <p class=\"lc-p\">\n        Beyond integer ranks, statistical querying uses normalized quantile functions:\n        <code>CUME_DIST()</code> returns the cumulative distribution ratio <code>(count &lt;= current) / total_rows</code>, while\n        <code>PERCENT_RANK()</code> returns <code>(rank - 1) / (total_rows - 1)</code>.\n      </p>\n    ",
        "diagram": {
          "title": "Cumulative Distribution Normalization",
          "svg": "<svg viewBox=\"0 0 880 150\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"120\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">CUME_DIST() VS PERCENT_RANK() NORMALIZATION</text>\n        <g transform=\"translate(40, 55)\">\n          <text x=\"0\" y=\"20\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10\">Values [10, 20, 20, 40] (N=4)</text>\n          <text x=\"0\" y=\"40\" fill=\"#2563eb\" font-family=\"monospace\" font-size=\"10\">CUME_DIST: 0.25, 0.75, 0.75, 1.00</text>\n          <text x=\"0\" y=\"60\" fill=\"#059669\" font-family=\"monospace\" font-size=\"10\">PERCENT_RANK: 0.00, 0.33, 0.33, 1.00</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-8-5-multi-period-moving-sums",
        "number": "8.5",
        "title": "Multi-Period Moving Sums & Triangular Window Partitions",
        "content": "\n      <p class=\"lc-p\">\n        In LeetCode #579 (<em>Find Cumulative Salary of an Employee</em>) and #1308 (<em>Running Total</em>), sliding windows require bounded physical rows:\n        <code>ROWS BETWEEN 2 PRECEDING AND CURRENT ROW</code> calculates rolling 3-period summaries while excluding the most recent active month via partition filters.\n      </p>\n    ",
        "diagram": {
          "title": "Bounded Sliding Window Frame Execution",
          "svg": "<svg viewBox=\"0 0 880 150\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"120\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">ROLLING 3-MONTH WINDOW (ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)</text>\n        <g transform=\"translate(40, 55)\">\n          <rect x=\"0\" y=\"15\" width=\"100\" height=\"30\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n          <text x=\"15\" y=\"34\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10\">Month 1: $20</text>\n          <rect x=\"110\" y=\"15\" width=\"100\" height=\"30\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n          <text x=\"125\" y=\"34\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10\">Month 2: $30</text>\n          <rect x=\"220\" y=\"15\" width=\"100\" height=\"30\" fill=\"#eff6ff\" stroke=\"#3b82f6\" stroke-width=\"2\"/>\n          <text x=\"235\" y=\"34\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10\" font-weight=\"700\">Month 3: $40</text>\n          <text x=\"340\" y=\"34\" fill=\"#16a34a\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">-> Rolling Sum: $90 ($20+$30+$40)</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-8-6-departmental-benchmarks",
        "number": "8.6",
        "title": "Departmental Benchmark Normalization & Dynamic Ratio Analysis",
        "content": "\n      <p class=\"lc-p\">\n        In LeetCode #615 (<em>Average Salary: Departments VS Company</em>), comparing an entity against its global container requires joining an unpartitioned aggregate with a partitioned group aggregate.\n      </p>\n    ",
        "diagram": {
          "title": "Company vs Department Average Salary Synthesis",
          "svg": "<svg viewBox=\"0 0 880 150\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"120\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">DEPARTMENT BENCHMARK VS COMPANY AVERAGE (AVG() OVER (PARTITION BY month))</text>\n        <g transform=\"translate(40, 55)\">\n          <text x=\"0\" y=\"20\" fill=\"#475569\" font-family=\"monospace\" font-size=\"10\">Dept 1 Avg: $9,000 | Company Avg: $7,000 -> 'higher'</text>\n          <text x=\"0\" y=\"45\" fill=\"#475569\" font-family=\"monospace\" font-size=\"10\">Dept 2 Avg: $6,000 | Company Avg: $7,000 -> 'lower'</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-8-7-outlier-detection-bounds",
        "number": "8.7",
        "title": "Outlier Detection & Extreme Exclusion: Quiet Student Analysis",
        "content": "\n      <p class=\"lc-p\">\n        In LeetCode #1412 (<em>Find the Quiet Students in All Exams</em>), high-dimensional filtering requires excluding candidates who attained the minimum or maximum score in any test, while verifying they took at least one exam.\n      </p>\n    ",
        "diagram": {
          "title": "Extrema Boundary Exclusion Pattern",
          "svg": "<svg viewBox=\"0 0 880 150\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"120\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">QUIET CANDIDATE EXCLUSION (SCORE &gt; MIN AND SCORE &lt; MAX)</text>\n        <g transform=\"translate(40, 55)\">\n          <text x=\"0\" y=\"20\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"10\">Exclusion Set: student_id IN (SELECT student_id WHERE score = min_score OR score = max_score)</text>\n          <text x=\"0\" y=\"45\" fill=\"#16a34a\" font-family=\"monospace\" font-size=\"10\">Result Set: Candidates taking exams NOT IN Exclusion Set</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-8-8-dynamic-ledger-balancing",
        "number": "8.8",
        "title": "Dynamic Ledger Balancing & Net Credit State Machines",
        "content": "\n      <p class=\"lc-p\">\n        In LeetCode #1555 (<em>Bank Account Summary</em>), accounts undergo bidirectional credit mutations (paid as sender, received as receiver). A multi-stage CTE calculates net changes via <code>SUM(CASE WHEN paid_by = user_id THEN -amount ELSE amount END)</code>.\n      </p>\n    ",
        "diagram": {
          "title": "Double-Entry Ledger Balancing Pipeline",
          "svg": "<svg viewBox=\"0 0 880 150\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"120\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">NET CREDIT LEDGER CALCULATION: INITIAL + INCOMING - OUTGOING</text>\n        <g transform=\"translate(40, 55)\">\n          <text x=\"0\" y=\"20\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10\">Debit: paid_by = user_id (-amount) | Credit: paid_to = user_id (+amount)</text>\n          <text x=\"0\" y=\"45\" fill=\"#2563eb\" font-family=\"monospace\" font-size=\"10\">Final Credit = initial_credit + IFNULL(net_change, 0) | credit_limit_breached = credit &lt; 0</text>\n        </g>\n      </svg>"
        }
      }
    ],
    "callouts": [
      {
        "type": "danger",
        "title": "Empty Result Set vs NULL in Stored Functions",
        "content": "When a query produces 0 rows (e.g. asking for the 10th highest salary when only 5 exist), an unwrapped SELECT query returns an empty set. In MySQL UDFs, this causes the function to return NULL only if wrapped in an outer scalar query: SELECT (SELECT DISTINCT ...). Without the outer SELECT, the function fails or produces incorrect empty states."
      },
      {
        "type": "warning",
        "title": "Compressed Frequency Median Pitfall",
        "content": "Never unnest or decompress frequency tables using recursive joins or cross joins on large datasets. A single row with frequency 100,000 will exhaust memory buffers. Always calculate medians on frequency tables using bi-directional cumulative frequency window sums."
      },
      {
        "type": "info",
        "title": "DENSE_RANK Partition Tie-Breaking",
        "content": "When multiple rows have identical values in the ORDER BY clause of DENSE_RANK(), they receive identical rank numbers without consuming downstream ranks. For top-K queries per group, DENSE_RANK() <= K guarantees you do not inadvertently skip valid tied records."
      }
    ]
  },
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
    }
  ]
};
