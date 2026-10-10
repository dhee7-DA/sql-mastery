// =============================================================================
// LEETCODE ARENA - CONCEPT 11: RECURSIVE CTES & HIERARCHIES
// 13 Curated LeetCode Problems | 8 Masterclass Chapters | 100 MCQs | 100 Drills
// =============================================================================

window.LEETCODE_SECTION_11_DATA = {
  "conceptId": "concept-11",
  "conceptNumber": 11,
  "title": "Recursive CTEs & Hierarchies",
  "description": "Master recursive CTEs, tree hierarchy traversal, calendar date generation, multi-stage business pipelines, and missing sequence gap discovery.",
  "masterclass": {
    "chapters": [
      {
        "id": "chap-11-1-recursive-cte-anatomy",
        "number": "11.1",
        "title": "Anatomy of a Recursive CTE: Anchor Member & Recursive Term",
        "content": "\n      <p class=\"lc-p\">\n        In complex enterprise queries (e.g. LeetCode #1270, #1384, #1613, #1635), static queries fail when traversing unknown graph depths or synthesizing continuous sequence dimensions. A <strong>Recursive CTE</strong> models dynamic loop execution directly within relational declarative semantics.\n      </p>\n\n      <div class=\"lc-rule-banner\">\n        <strong>The Two-Part Structure of Recursive CTEs:</strong><br>\n        &bull; <strong>Anchor Member:</strong> The non-recursive base query executed exactly once at iteration $0$. It generates the initial frontier working set.<br>\n        &bull; <strong>Recursive Member:</strong> Joined to the CTE itself via <code>UNION ALL</code>, repeatedly evaluating against the prior iteration's results until the working table becomes empty.<br>\n        &bull; <strong>Termination Condition:</strong> A strict <code>WHERE</code> guard preventing infinite loops (e.g. <code>WHERE n &lt; max_val</code> or <code>WHERE depth &lt;= 3</code>).\n      </div>\n    ",
        "diagram": {
          "title": "Recursive CTE Working Table Lifecycle Engine",
          "svg": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">RECURSIVE CTE EXECUTION LIFECYCLE (ANCHOR -> RECURSIVE WORKING SET)</text>\n        <g transform=\"translate(40, 55)\">\n          <rect x=\"0\" y=\"20\" width=\"180\" height=\"40\" rx=\"4\" fill=\"#eff6ff\" stroke=\"#3b82f6\" stroke-width=\"1.5\"/>\n          <text x=\"12\" y=\"38\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">ANCHOR MEMBER</text>\n          <text x=\"12\" y=\"52\" fill=\"#2563eb\" font-family=\"monospace\" font-size=\"9.5\">Initial row: n = 1 (Level 0)</text>\n        </g>\n        <path d=\"M 235 75 L 300 75\" stroke=\"#2563eb\" stroke-width=\"2\"/>\n        <g transform=\"translate(320, 55)\">\n          <rect x=\"0\" y=\"10\" width=\"230\" height=\"60\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#16a34a\" stroke-width=\"1.5\"/>\n          <text x=\"12\" y=\"30\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">RECURSIVE TERM</text>\n          <text x=\"12\" y=\"46\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"9\">SELECT n + 1 FROM cte</text>\n          <text x=\"12\" y=\"60\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"9\">WHERE n &lt; 10 (Loop guard)</text>\n        </g>\n        <path d=\"M 570 75 L 635 75\" stroke=\"#16a34a\" stroke-width=\"2\"/>\n        <g transform=\"translate(650, 55)\">\n          <rect x=\"0\" y=\"15\" width=\"190\" height=\"50\" rx=\"4\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n          <text x=\"12\" y=\"34\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10\" font-weight=\"700\">UNION ALL RESULT</text>\n          <text x=\"12\" y=\"50\" fill=\"#475569\" font-family=\"monospace\" font-size=\"9\">Sequence [1, 2, 3 ... 10]</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-11-2-tree-hierarchy-traversal",
        "number": "11.2",
        "title": "Tree Hierarchy Traversal: Management Chains (LeetCode #1270)",
        "content": "\n      <p class=\"lc-p\">\n        In organizational trees (e.g., LeetCode #1270 <em>All People Report to the Given Manager</em>), an employee reports to a manager who reports to the company head. Recursive CTEs join <code>e.manager_id = tree.employee_id</code> down the graph up to depth 3, excluding the CEO's self-loop (<code>employee_id = 1</code>).\n      </p>\n    ",
        "diagram": {
          "title": "Hierarchical Graph Tree Traversal (3 Levels)",
          "svg": "<svg viewBox=\"0 0 880 150\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"120\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">TREE TRAVERSAL: CEO (1) -> DIRECT (Level 1) -> INDIRECT (Level 2 & 3)</text>\n        <g transform=\"translate(40, 55)\">\n          <text x=\"0\" y=\"20\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10\">Anchor: manager_id = 1 AND employee_id &lt;&gt; 1</text>\n          <text x=\"0\" y=\"45\" fill=\"#2563eb\" font-family=\"monospace\" font-size=\"10\">Recursive: e.manager_id = cte.employee_id (WHERE depth &lt; 3)</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-11-3-tally-sequence-generators",
        "number": "11.3",
        "title": "Recursive Number & Tally Generators on the Fly (LeetCode #1613)",
        "content": "\n      <p class=\"lc-p\">\n        When an analytical query requires finding missing IDs in a sequence (LeetCode #1613), a recursive CTE builds a complete integer series from $1$ to $max(id)$, then anti-joins with the target table to identify absent records.\n      </p>\n    ",
        "diagram": {
          "title": "Tally Table Sequence Synthesis via Recursive CTE",
          "svg": "<svg viewBox=\"0 0 880 150\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"120\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">TALLY GENERATOR &amp; ANTI-JOIN GAP DISCOVERY</text>\n        <g transform=\"translate(40, 55)\">\n          <text x=\"0\" y=\"20\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10\">Tally CTE: 1, 2, 3, 4, 5 ... MAX(id) | Target Customers: 1, 2, 5</text>\n          <text x=\"0\" y=\"45\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"10\">WHERE tally_id NOT IN (SELECT customer_id) -> Missing: 3, 4</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-11-4-temporal-year-expansion",
        "number": "11.4",
        "title": "Temporal Calendar Expansion & Sales Proration (LeetCode #1384)",
        "content": "\n      <p class=\"lc-p\">\n        In LeetCode #1384 (<em>Total Sales Amount by Year</em>), sales spans cover multiple calendar years (e.g. 2018 to 2020). A recursive CTE expands each date interval into discrete yearly rows, computing exact overlapping active days per year:\n        <code>DATEDIFF(LEAST(period_end, year_end), GREATEST(period_start, year_start)) + 1</code>.\n      </p>\n    ",
        "diagram": {
          "title": "Multi-Year Date Range Proration Engine",
          "svg": "<svg viewBox=\"0 0 880 150\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"120\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">SALES YEAR PRORATION: LEAST(end, year_end) - GREATEST(start, year_start) + 1</text>\n        <g transform=\"translate(40, 55)\">\n          <text x=\"0\" y=\"20\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10\">Contract: 2019-12-01 to 2020-01-31 -> 2019: 31 days | 2020: 31 days</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-11-5-tournament-scoring-matrix",
        "number": "11.5",
        "title": "Multi-Entity Tournament Scoring: Host vs Guest Matrix",
        "content": "\n      <p class=\"lc-p\">\n        In LeetCode #1212 (<em>Team Scores in Football Tournament</em>), match results must credit points to both host and guest teams (Win=3, Draw=1, Loss=0). Projecting matches from both perspectives via <code>UNION ALL</code> unifies team scoring.\n      </p>\n    ",
        "diagram": {
          "title": "Bidirectional Sports Tournament Scoring Pipeline",
          "svg": "<svg viewBox=\"0 0 880 150\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"120\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">DUAL-PERSPECTIVE MATCH UNION ALL: (host_team, points) UNION ALL (guest_team, points)</text>\n        <g transform=\"translate(40, 55)\">\n          <text x=\"0\" y=\"20\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10\">CASE WHEN host_goals &gt; guest_goals THEN 3 WHEN host_goals = guest_goals THEN 1 ELSE 0 END</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-11-6-complex-inclusion-exclusion",
        "number": "11.6",
        "title": "Complex Inclusion-Exclusion Logic: Products A & B but NOT C",
        "content": "\n      <p class=\"lc-p\">\n        In LeetCode #1398, multi-condition basket analysis uses conditional sums in a <code>HAVING</code> clause:\n        <code>SUM(p = 'A') &gt; 0 AND SUM(p = 'B') &gt; 0 AND SUM(p = 'C') = 0</code>.\n      </p>\n    ",
        "diagram": {
          "title": "Tri-Condition Boolean Basket Filtration",
          "svg": "<svg viewBox=\"0 0 880 150\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"120\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">BASKET ANALYSIS: SUM(p='A')&gt;0 AND SUM(p='B')&gt;0 AND SUM(p='C')=0</text>\n        <g transform=\"translate(40, 55)\">\n          <text x=\"0\" y=\"20\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10\">Guarantees presence of A and B while mathematically certifying zero occurrences of C</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-11-7-geometric-rectangle-pairs",
        "number": "11.7",
        "title": "Geometric Combinations & Non-Degenerate Rectangle Synthesis",
        "content": "\n      <p class=\"lc-p\">\n        In LeetCode #1459 (<em>Rectangles Area</em>), 2D points pair to form rectangles if they do not share the same X or Y coordinate:\n        <code>p1.id &lt; p2.id AND p1.x &lt;&gt; p2.x AND p1.y &lt;&gt; p2.y</code>, calculating area as <code>ABS(p1.x - p2.x) * ABS(p1.y - p2.y)</code>.\n      </p>\n    ",
        "diagram": {
          "title": "Non-Degenerate Rectangle Coordinate Pairing",
          "svg": "<svg viewBox=\"0 0 880 150\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"120\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">RECTANGLE AREA: ABS(x1 - x2) * ABS(y1 - y2) (WHERE x1 &lt;&gt; x2 AND y1 &lt;&gt; y2)</text>\n        <g transform=\"translate(40, 55)\">\n          <text x=\"0\" y=\"20\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10\">Ordering p1.id &lt; p2.id prevents duplicate permutations of the same diagonal</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-11-8-hopper-ride-pipelines",
        "number": "11.8",
        "title": "Multi-Stage Workflow Orchestration: The Hopper Ride Engine",
        "content": "\n      <p class=\"lc-p\">\n        In the famous Hopper trilogy (LeetCode #1635, #1645, #1651), calculating active drivers, accepted ride rates, and 3-month moving averages requires chaining 4-5 CTEs: a 12-month calendar CTE, a cumulative active driver CTE, an accepted ride CTE, and a sliding window aggregate.\n      </p>\n    ",
        "diagram": {
          "title": "Chained Multi-Stage CTE DAG Pipeline",
          "svg": "<svg viewBox=\"0 0 880 150\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"120\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">HOPPER WORKFLOW: CALENDAR -> ACTIVE DRIVERS -> ACCEPTED RIDES -> MOVING AVG</text>\n        <g transform=\"translate(40, 55)\">\n          <text x=\"0\" y=\"20\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10\">Months (1..12) LEFT JOIN Driver Join Dates -> LEFT JOIN Accepted Rides -> Rolling 3-Month AVG</text>\n        </g>\n      </svg>"
        }
      }
    ],
    "callouts": [
      {
        "type": "danger",
        "title": "CTE Recursion Limit Exceeded",
        "content": "By default, MySQL limits recursive CTE depth to 1,000 iterations (cte_max_recursion_depth). If generating sequences or traversing deep trees that exceed this threshold, you must configure SET SESSION cte_max_recursion_depth = 100000; or ensure your WHERE termination condition strictly caps loop depth."
      },
      {
        "type": "warning",
        "title": "Self-Loops in Hierarchical Graphs",
        "content": "If an organizational chart has an executive reporting to themselves (e.g. employee_id = 1 and manager_id = 1), an unguarded recursive CTE enters an infinite loop! Always add employee_id <> manager_id or explicit visited tracking when traversing graphs."
      },
      {
        "type": "info",
        "title": "Calendar Scaffold Anti-Pattern",
        "content": "Never rely on raw transaction dates when calculating monthly rates. Months with 0 sales or 0 rides will disappear completely from the output! Always generate a 12-month scaffold via a recursive CTE, and LEFT JOIN transaction activity to preserve all reporting periods."
      }
    ]
  },
  "mcqs": [
    {
      "id": 1101,
      "q": "[Q1101] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing recursive cte anchor member vs recursive term?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1102,
      "q": "[Q1102] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing termination condition guards against infinite loops?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1103,
      "q": "[Q1103] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing tree hierarchy traversal depth control?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1104,
      "q": "[Q1104] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing tally sequence generation from 1 to n?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1105,
      "q": "[Q1105] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing multi-year sales range proration?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1106,
      "q": "[Q1106] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing tournament dual-perspective match aggregation?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1107,
      "q": "[Q1107] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing multi-product inclusion and exclusion baskets?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1108,
      "q": "[Q1108] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing non-degenerate geometric pairing coordinates?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1109,
      "q": "[Q1109] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing hopper chained multi-stage cte architecture?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1110,
      "q": "[Q1110] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing handling 0-transaction months via calendar scaffolds?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1111,
      "q": "[Q1111] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing recursive cte anchor member vs recursive term?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1112,
      "q": "[Q1112] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing termination condition guards against infinite loops?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1113,
      "q": "[Q1113] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing tree hierarchy traversal depth control?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1114,
      "q": "[Q1114] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing tally sequence generation from 1 to n?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1115,
      "q": "[Q1115] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing multi-year sales range proration?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1116,
      "q": "[Q1116] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing tournament dual-perspective match aggregation?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1117,
      "q": "[Q1117] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing multi-product inclusion and exclusion baskets?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1118,
      "q": "[Q1118] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing non-degenerate geometric pairing coordinates?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1119,
      "q": "[Q1119] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing hopper chained multi-stage cte architecture?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1120,
      "q": "[Q1120] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing handling 0-transaction months via calendar scaffolds?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1121,
      "q": "[Q1121] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing recursive cte anchor member vs recursive term?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1122,
      "q": "[Q1122] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing termination condition guards against infinite loops?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1123,
      "q": "[Q1123] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing tree hierarchy traversal depth control?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1124,
      "q": "[Q1124] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing tally sequence generation from 1 to n?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1125,
      "q": "[Q1125] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing multi-year sales range proration?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1126,
      "q": "[Q1126] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing tournament dual-perspective match aggregation?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1127,
      "q": "[Q1127] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing multi-product inclusion and exclusion baskets?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1128,
      "q": "[Q1128] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing non-degenerate geometric pairing coordinates?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1129,
      "q": "[Q1129] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing hopper chained multi-stage cte architecture?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1130,
      "q": "[Q1130] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing handling 0-transaction months via calendar scaffolds?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1131,
      "q": "[Q1131] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing recursive cte anchor member vs recursive term?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1132,
      "q": "[Q1132] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing termination condition guards against infinite loops?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1133,
      "q": "[Q1133] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing tree hierarchy traversal depth control?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1134,
      "q": "[Q1134] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing tally sequence generation from 1 to n?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1135,
      "q": "[Q1135] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing multi-year sales range proration?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1136,
      "q": "[Q1136] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing tournament dual-perspective match aggregation?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1137,
      "q": "[Q1137] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing multi-product inclusion and exclusion baskets?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1138,
      "q": "[Q1138] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing non-degenerate geometric pairing coordinates?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1139,
      "q": "[Q1139] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing hopper chained multi-stage cte architecture?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1140,
      "q": "[Q1140] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing handling 0-transaction months via calendar scaffolds?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1141,
      "q": "[Q1141] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing recursive cte anchor member vs recursive term?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1142,
      "q": "[Q1142] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing termination condition guards against infinite loops?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1143,
      "q": "[Q1143] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing tree hierarchy traversal depth control?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1144,
      "q": "[Q1144] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing tally sequence generation from 1 to n?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1145,
      "q": "[Q1145] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing multi-year sales range proration?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1146,
      "q": "[Q1146] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing tournament dual-perspective match aggregation?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1147,
      "q": "[Q1147] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing multi-product inclusion and exclusion baskets?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1148,
      "q": "[Q1148] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing non-degenerate geometric pairing coordinates?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1149,
      "q": "[Q1149] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing hopper chained multi-stage cte architecture?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1150,
      "q": "[Q1150] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing handling 0-transaction months via calendar scaffolds?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1151,
      "q": "[Q1151] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing recursive cte anchor member vs recursive term?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1152,
      "q": "[Q1152] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing termination condition guards against infinite loops?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1153,
      "q": "[Q1153] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing tree hierarchy traversal depth control?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1154,
      "q": "[Q1154] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing tally sequence generation from 1 to n?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1155,
      "q": "[Q1155] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing multi-year sales range proration?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1156,
      "q": "[Q1156] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing tournament dual-perspective match aggregation?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1157,
      "q": "[Q1157] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing multi-product inclusion and exclusion baskets?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1158,
      "q": "[Q1158] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing non-degenerate geometric pairing coordinates?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1159,
      "q": "[Q1159] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing hopper chained multi-stage cte architecture?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1160,
      "q": "[Q1160] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing handling 0-transaction months via calendar scaffolds?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1161,
      "q": "[Q1161] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing recursive cte anchor member vs recursive term?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1162,
      "q": "[Q1162] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing termination condition guards against infinite loops?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1163,
      "q": "[Q1163] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing tree hierarchy traversal depth control?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1164,
      "q": "[Q1164] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing tally sequence generation from 1 to n?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1165,
      "q": "[Q1165] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing multi-year sales range proration?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1166,
      "q": "[Q1166] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing tournament dual-perspective match aggregation?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1167,
      "q": "[Q1167] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing multi-product inclusion and exclusion baskets?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1168,
      "q": "[Q1168] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing non-degenerate geometric pairing coordinates?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1169,
      "q": "[Q1169] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing hopper chained multi-stage cte architecture?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1170,
      "q": "[Q1170] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing handling 0-transaction months via calendar scaffolds?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1171,
      "q": "[Q1171] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing recursive cte anchor member vs recursive term?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1172,
      "q": "[Q1172] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing termination condition guards against infinite loops?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1173,
      "q": "[Q1173] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing tree hierarchy traversal depth control?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1174,
      "q": "[Q1174] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing tally sequence generation from 1 to n?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1175,
      "q": "[Q1175] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing multi-year sales range proration?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1176,
      "q": "[Q1176] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing tournament dual-perspective match aggregation?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1177,
      "q": "[Q1177] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing multi-product inclusion and exclusion baskets?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1178,
      "q": "[Q1178] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing non-degenerate geometric pairing coordinates?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1179,
      "q": "[Q1179] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing hopper chained multi-stage cte architecture?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1180,
      "q": "[Q1180] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing handling 0-transaction months via calendar scaffolds?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1181,
      "q": "[Q1181] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing recursive cte anchor member vs recursive term?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1182,
      "q": "[Q1182] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing termination condition guards against infinite loops?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1183,
      "q": "[Q1183] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing tree hierarchy traversal depth control?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1184,
      "q": "[Q1184] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing tally sequence generation from 1 to n?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1185,
      "q": "[Q1185] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing multi-year sales range proration?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1186,
      "q": "[Q1186] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing tournament dual-perspective match aggregation?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1187,
      "q": "[Q1187] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing multi-product inclusion and exclusion baskets?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1188,
      "q": "[Q1188] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing non-degenerate geometric pairing coordinates?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1189,
      "q": "[Q1189] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing hopper chained multi-stage cte architecture?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1190,
      "q": "[Q1190] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing handling 0-transaction months via calendar scaffolds?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1191,
      "q": "[Q1191] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing recursive cte anchor member vs recursive term?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1192,
      "q": "[Q1192] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing termination condition guards against infinite loops?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1193,
      "q": "[Q1193] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing tree hierarchy traversal depth control?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1194,
      "q": "[Q1194] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing tally sequence generation from 1 to n?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1195,
      "q": "[Q1195] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing multi-year sales range proration?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1196,
      "q": "[Q1196] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing tournament dual-perspective match aggregation?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1197,
      "q": "[Q1197] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing multi-product inclusion and exclusion baskets?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1198,
      "q": "[Q1198] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing non-degenerate geometric pairing coordinates?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    },
    {
      "id": 1199,
      "q": "[Q1199] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing hopper chained multi-stage cte architecture?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": true,
      "trapBadge": "Recursion Depth Trap"
    },
    {
      "id": 1200,
      "q": "[Q1200] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing handling 0-transaction months via calendar scaffolds?",
      "options": [
        "A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.",
        "Recursive CTEs must be declared as temporary stored procedures with cursor handlers.",
        "The recursive term can reference the CTE multiple times within subqueries in standard MySQL.",
        "Using UNION instead of UNION ALL is required to advance iterations in recursive queries."
      ],
      "correct": 0,
      "explanation": "A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.",
      "isTrap": false
    }
  ],
  "drills": [
    {
      "id": 1101,
      "prompt": "[Drill #1101] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1102,
      "prompt": "[Drill #1102] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1103,
      "prompt": "[Drill #1103] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1104,
      "prompt": "[Drill #1104] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1105,
      "prompt": "[Drill #1105] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1106,
      "prompt": "[Drill #1106] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1107,
      "prompt": "[Drill #1107] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1108,
      "prompt": "[Drill #1108] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1109,
      "prompt": "[Drill #1109] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1110,
      "prompt": "[Drill #1110] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1111,
      "prompt": "[Drill #1111] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1112,
      "prompt": "[Drill #1112] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1113,
      "prompt": "[Drill #1113] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1114,
      "prompt": "[Drill #1114] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1115,
      "prompt": "[Drill #1115] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1116,
      "prompt": "[Drill #1116] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1117,
      "prompt": "[Drill #1117] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1118,
      "prompt": "[Drill #1118] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1119,
      "prompt": "[Drill #1119] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1120,
      "prompt": "[Drill #1120] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1121,
      "prompt": "[Drill #1121] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1122,
      "prompt": "[Drill #1122] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1123,
      "prompt": "[Drill #1123] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1124,
      "prompt": "[Drill #1124] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1125,
      "prompt": "[Drill #1125] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1126,
      "prompt": "[Drill #1126] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1127,
      "prompt": "[Drill #1127] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1128,
      "prompt": "[Drill #1128] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1129,
      "prompt": "[Drill #1129] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1130,
      "prompt": "[Drill #1130] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1131,
      "prompt": "[Drill #1131] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1132,
      "prompt": "[Drill #1132] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1133,
      "prompt": "[Drill #1133] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1134,
      "prompt": "[Drill #1134] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1135,
      "prompt": "[Drill #1135] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1136,
      "prompt": "[Drill #1136] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1137,
      "prompt": "[Drill #1137] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1138,
      "prompt": "[Drill #1138] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1139,
      "prompt": "[Drill #1139] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1140,
      "prompt": "[Drill #1140] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1141,
      "prompt": "[Drill #1141] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1142,
      "prompt": "[Drill #1142] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1143,
      "prompt": "[Drill #1143] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1144,
      "prompt": "[Drill #1144] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1145,
      "prompt": "[Drill #1145] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1146,
      "prompt": "[Drill #1146] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1147,
      "prompt": "[Drill #1147] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1148,
      "prompt": "[Drill #1148] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1149,
      "prompt": "[Drill #1149] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1150,
      "prompt": "[Drill #1150] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1151,
      "prompt": "[Drill #1151] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1152,
      "prompt": "[Drill #1152] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1153,
      "prompt": "[Drill #1153] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1154,
      "prompt": "[Drill #1154] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1155,
      "prompt": "[Drill #1155] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1156,
      "prompt": "[Drill #1156] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1157,
      "prompt": "[Drill #1157] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1158,
      "prompt": "[Drill #1158] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1159,
      "prompt": "[Drill #1159] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1160,
      "prompt": "[Drill #1160] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1161,
      "prompt": "[Drill #1161] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1162,
      "prompt": "[Drill #1162] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1163,
      "prompt": "[Drill #1163] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1164,
      "prompt": "[Drill #1164] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1165,
      "prompt": "[Drill #1165] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1166,
      "prompt": "[Drill #1166] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1167,
      "prompt": "[Drill #1167] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1168,
      "prompt": "[Drill #1168] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1169,
      "prompt": "[Drill #1169] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1170,
      "prompt": "[Drill #1170] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1171,
      "prompt": "[Drill #1171] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1172,
      "prompt": "[Drill #1172] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1173,
      "prompt": "[Drill #1173] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1174,
      "prompt": "[Drill #1174] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1175,
      "prompt": "[Drill #1175] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1176,
      "prompt": "[Drill #1176] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1177,
      "prompt": "[Drill #1177] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1178,
      "prompt": "[Drill #1178] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1179,
      "prompt": "[Drill #1179] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1180,
      "prompt": "[Drill #1180] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1181,
      "prompt": "[Drill #1181] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1182,
      "prompt": "[Drill #1182] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1183,
      "prompt": "[Drill #1183] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1184,
      "prompt": "[Drill #1184] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1185,
      "prompt": "[Drill #1185] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1186,
      "prompt": "[Drill #1186] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1187,
      "prompt": "[Drill #1187] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1188,
      "prompt": "[Drill #1188] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1189,
      "prompt": "[Drill #1189] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1190,
      "prompt": "[Drill #1190] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1191,
      "prompt": "[Drill #1191] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1192,
      "prompt": "[Drill #1192] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1193,
      "prompt": "[Drill #1193] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1194,
      "prompt": "[Drill #1194] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1195,
      "prompt": "[Drill #1195] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1196,
      "prompt": "[Drill #1196] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1197,
      "prompt": "[Drill #1197] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1198,
      "prompt": "[Drill #1198] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1199,
      "prompt": "[Drill #1199] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    },
    {
      "id": 1200,
      "prompt": "[Drill #1200] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.",
      "task": "Generate integer series 1 to 10 using a recursive CTE.",
      "starterSQL": "WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;",
      "solutionSQL": "WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;",
      "hints": [
        "Anchor member selects 1 AS n",
        "Recursive term selects n + 1 WHERE n < 10",
        "Combine with UNION ALL"
      ]
    }
  ],
  "problems": [
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
