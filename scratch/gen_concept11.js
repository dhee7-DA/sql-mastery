// scratch/gen_concept11.js
// Generates visualizer/leetcode_section11_data.js
// Concept 11: Recursive CTEs, Hierarchies & Workflows (13 Problems)
const fs = require('fs');
const path = require('path');

const batch1 = require('./section8_problems_batch1.js');
const batch2 = require('./section8_problems_batch2.js');
const allProbs = [...batch1, ...batch2];

const c11Ids = [1158, 1159, 1212, 1270, 1336, 1384, 1398, 1459, 1596, 1613, 1635, 1645, 1651];
const selectedProbs = c11Ids.map(id => allProbs.find(p => p.id === id)).filter(Boolean);

console.log(`Concept 11 matched ${selectedProbs.length} problems.`);

const chapters = [
  {
    id: "chap-11-1-recursive-cte-anatomy",
    number: "11.1",
    title: "Anatomy of a Recursive CTE: Anchor Member & Recursive Term",
    content: `
      <p class="lc-p">
        In complex enterprise queries (e.g. LeetCode #1270, #1384, #1613, #1635), static queries fail when traversing unknown graph depths or synthesizing continuous sequence dimensions. A <strong>Recursive CTE</strong> models dynamic loop execution directly within relational declarative semantics.
      </p>

      <div class="lc-rule-banner">
        <strong>The Two-Part Structure of Recursive CTEs:</strong><br>
        &bull; <strong>Anchor Member:</strong> The non-recursive base query executed exactly once at iteration $0$. It generates the initial frontier working set.<br>
        &bull; <strong>Recursive Member:</strong> Joined to the CTE itself via <code>UNION ALL</code>, repeatedly evaluating against the prior iteration's results until the working table becomes empty.<br>
        &bull; <strong>Termination Condition:</strong> A strict <code>WHERE</code> guard preventing infinite loops (e.g. <code>WHERE n &lt; max_val</code> or <code>WHERE depth &lt;= 3</code>).
      </div>
    `,
    diagram: {
      title: "Recursive CTE Working Table Lifecycle Engine",
      svg: `<svg viewBox="0 0 880 180" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">RECURSIVE CTE EXECUTION LIFECYCLE (ANCHOR -> RECURSIVE WORKING SET)</text>
        <g transform="translate(40, 55)">
          <rect x="0" y="20" width="180" height="40" rx="4" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
          <text x="12" y="38" fill="#1d4ed8" font-family="monospace" font-size="10.5" font-weight="700">ANCHOR MEMBER</text>
          <text x="12" y="52" fill="#2563eb" font-family="monospace" font-size="9.5">Initial row: n = 1 (Level 0)</text>
        </g>
        <path d="M 235 75 L 300 75" stroke="#2563eb" stroke-width="2"/>
        <g transform="translate(320, 55)">
          <rect x="0" y="10" width="230" height="60" rx="6" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
          <text x="12" y="30" fill="#166534" font-family="monospace" font-size="10.5" font-weight="700">RECURSIVE TERM</text>
          <text x="12" y="46" fill="#15803d" font-family="monospace" font-size="9">SELECT n + 1 FROM cte</text>
          <text x="12" y="60" fill="#15803d" font-family="monospace" font-size="9">WHERE n &lt; 10 (Loop guard)</text>
        </g>
        <path d="M 570 75 L 635 75" stroke="#16a34a" stroke-width="2"/>
        <g transform="translate(650, 55)">
          <rect x="0" y="15" width="190" height="50" rx="4" fill="#f8fafc" stroke="#94a3b8"/>
          <text x="12" y="34" fill="#0f172a" font-family="monospace" font-size="10" font-weight="700">UNION ALL RESULT</text>
          <text x="12" y="50" fill="#475569" font-family="monospace" font-size="9">Sequence [1, 2, 3 ... 10]</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-11-2-tree-hierarchy-traversal",
    number: "11.2",
    title: "Tree Hierarchy Traversal: Management Chains (LeetCode #1270)",
    content: `
      <p class="lc-p">
        In organizational trees (e.g., LeetCode #1270 <em>All People Report to the Given Manager</em>), an employee reports to a manager who reports to the company head. Recursive CTEs join <code>e.manager_id = tree.employee_id</code> down the graph up to depth 3, excluding the CEO's self-loop (<code>employee_id = 1</code>).
      </p>
    `,
    diagram: {
      title: "Hierarchical Graph Tree Traversal (3 Levels)",
      svg: `<svg viewBox="0 0 880 150" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">TREE TRAVERSAL: CEO (1) -> DIRECT (Level 1) -> INDIRECT (Level 2 & 3)</text>
        <g transform="translate(40, 55)">
          <text x="0" y="20" fill="#0f172a" font-family="monospace" font-size="10">Anchor: manager_id = 1 AND employee_id &lt;&gt; 1</text>
          <text x="0" y="45" fill="#2563eb" font-family="monospace" font-size="10">Recursive: e.manager_id = cte.employee_id (WHERE depth &lt; 3)</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-11-3-tally-sequence-generators",
    number: "11.3",
    title: "Recursive Number & Tally Generators on the Fly (LeetCode #1613)",
    content: `
      <p class="lc-p">
        When an analytical query requires finding missing IDs in a sequence (LeetCode #1613), a recursive CTE builds a complete integer series from $1$ to $\max(id)$, then anti-joins with the target table to identify absent records.
      </p>
    `,
    diagram: {
      title: "Tally Table Sequence Synthesis via Recursive CTE",
      svg: `<svg viewBox="0 0 880 150" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">TALLY GENERATOR &amp; ANTI-JOIN GAP DISCOVERY</text>
        <g transform="translate(40, 55)">
          <text x="0" y="20" fill="#0f172a" font-family="monospace" font-size="10">Tally CTE: 1, 2, 3, 4, 5 ... MAX(id) | Target Customers: 1, 2, 5</text>
          <text x="0" y="45" fill="#ef4444" font-family="monospace" font-size="10">WHERE tally_id NOT IN (SELECT customer_id) -> Missing: 3, 4</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-11-4-temporal-year-expansion",
    number: "11.4",
    title: "Temporal Calendar Expansion & Sales Proration (LeetCode #1384)",
    content: `
      <p class="lc-p">
        In LeetCode #1384 (<em>Total Sales Amount by Year</em>), sales spans cover multiple calendar years (e.g. 2018 to 2020). A recursive CTE expands each date interval into discrete yearly rows, computing exact overlapping active days per year:
        <code>DATEDIFF(LEAST(period_end, year_end), GREATEST(period_start, year_start)) + 1</code>.
      </p>
    `,
    diagram: {
      title: "Multi-Year Date Range Proration Engine",
      svg: `<svg viewBox="0 0 880 150" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">SALES YEAR PRORATION: LEAST(end, year_end) - GREATEST(start, year_start) + 1</text>
        <g transform="translate(40, 55)">
          <text x="0" y="20" fill="#0f172a" font-family="monospace" font-size="10">Contract: 2019-12-01 to 2020-01-31 -> 2019: 31 days | 2020: 31 days</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-11-5-tournament-scoring-matrix",
    number: "11.5",
    title: "Multi-Entity Tournament Scoring: Host vs Guest Matrix",
    content: `
      <p class="lc-p">
        In LeetCode #1212 (<em>Team Scores in Football Tournament</em>), match results must credit points to both host and guest teams (Win=3, Draw=1, Loss=0). Projecting matches from both perspectives via <code>UNION ALL</code> unifies team scoring.
      </p>
    `,
    diagram: {
      title: "Bidirectional Sports Tournament Scoring Pipeline",
      svg: `<svg viewBox="0 0 880 150" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">DUAL-PERSPECTIVE MATCH UNION ALL: (host_team, points) UNION ALL (guest_team, points)</text>
        <g transform="translate(40, 55)">
          <text x="0" y="20" fill="#0f172a" font-family="monospace" font-size="10">CASE WHEN host_goals &gt; guest_goals THEN 3 WHEN host_goals = guest_goals THEN 1 ELSE 0 END</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-11-6-complex-inclusion-exclusion",
    number: "11.6",
    title: "Complex Inclusion-Exclusion Logic: Products A & B but NOT C",
    content: `
      <p class="lc-p">
        In LeetCode #1398, multi-condition basket analysis uses conditional sums in a <code>HAVING</code> clause:
        <code>SUM(p = 'A') &gt; 0 AND SUM(p = 'B') &gt; 0 AND SUM(p = 'C') = 0</code>.
      </p>
    `,
    diagram: {
      title: "Tri-Condition Boolean Basket Filtration",
      svg: `<svg viewBox="0 0 880 150" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">BASKET ANALYSIS: SUM(p='A')&gt;0 AND SUM(p='B')&gt;0 AND SUM(p='C')=0</text>
        <g transform="translate(40, 55)">
          <text x="0" y="20" fill="#0f172a" font-family="monospace" font-size="10">Guarantees presence of A and B while mathematically certifying zero occurrences of C</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-11-7-geometric-rectangle-pairs",
    number: "11.7",
    title: "Geometric Combinations & Non-Degenerate Rectangle Synthesis",
    content: `
      <p class="lc-p">
        In LeetCode #1459 (<em>Rectangles Area</em>), 2D points pair to form rectangles if they do not share the same X or Y coordinate:
        <code>p1.id &lt; p2.id AND p1.x &lt;&gt; p2.x AND p1.y &lt;&gt; p2.y</code>, calculating area as <code>ABS(p1.x - p2.x) * ABS(p1.y - p2.y)</code>.
      </p>
    `,
    diagram: {
      title: "Non-Degenerate Rectangle Coordinate Pairing",
      svg: `<svg viewBox="0 0 880 150" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">RECTANGLE AREA: ABS(x1 - x2) * ABS(y1 - y2) (WHERE x1 &lt;&gt; x2 AND y1 &lt;&gt; y2)</text>
        <g transform="translate(40, 55)">
          <text x="0" y="20" fill="#0f172a" font-family="monospace" font-size="10">Ordering p1.id &lt; p2.id prevents duplicate permutations of the same diagonal</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-11-8-hopper-ride-pipelines",
    number: "11.8",
    title: "Multi-Stage Workflow Orchestration: The Hopper Ride Engine",
    content: `
      <p class="lc-p">
        In the famous Hopper trilogy (LeetCode #1635, #1645, #1651), calculating active drivers, accepted ride rates, and 3-month moving averages requires chaining 4-5 CTEs: a 12-month calendar CTE, a cumulative active driver CTE, an accepted ride CTE, and a sliding window aggregate.
      </p>
    `,
    diagram: {
      title: "Chained Multi-Stage CTE DAG Pipeline",
      svg: `<svg viewBox="0 0 880 150" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">HOPPER WORKFLOW: CALENDAR -> ACTIVE DRIVERS -> ACCEPTED RIDES -> MOVING AVG</text>
        <g transform="translate(40, 55)">
          <text x="0" y="20" fill="#0f172a" font-family="monospace" font-size="10">Months (1..12) LEFT JOIN Driver Join Dates -> LEFT JOIN Accepted Rides -> Rolling 3-Month AVG</text>
        </g>
      </svg>`
    }
  }
];

const callouts = [
  {
    type: "danger",
    title: "CTE Recursion Limit Exceeded",
    content: "By default, MySQL limits recursive CTE depth to 1,000 iterations (cte_max_recursion_depth). If generating sequences or traversing deep trees that exceed this threshold, you must configure SET SESSION cte_max_recursion_depth = 100000; or ensure your WHERE termination condition strictly caps loop depth."
  },
  {
    type: "warning",
    title: "Self-Loops in Hierarchical Graphs",
    content: "If an organizational chart has an executive reporting to themselves (e.g. employee_id = 1 and manager_id = 1), an unguarded recursive CTE enters an infinite loop! Always add employee_id <> manager_id or explicit visited tracking when traversing graphs."
  },
  {
    type: "info",
    title: "Calendar Scaffold Anti-Pattern",
    content: "Never rely on raw transaction dates when calculating monthly rates. Months with 0 sales or 0 rides will disappear completely from the output! Always generate a 12-month scaffold via a recursive CTE, and LEFT JOIN transaction activity to preserve all reporting periods."
  }
];

const mcqs = [];
const mcqTopics = [
  "Recursive CTE anchor member vs recursive term",
  "Termination condition guards against infinite loops",
  "Tree hierarchy traversal depth control",
  "Tally sequence generation from 1 to N",
  "Multi-year sales range proration",
  "Tournament dual-perspective match aggregation",
  "Multi-product inclusion and exclusion baskets",
  "Non-degenerate geometric pairing coordinates",
  "Hopper chained multi-stage CTE architecture",
  "Handling 0-transaction months via calendar scaffolds"
];

for (let i = 1; i <= 100; i++) {
  const qNum = 1100 + i;
  const topic = mcqTopics[(i - 1) % mcqTopics.length];
  mcqs.push({
    id: qNum,
    q: `[Q${qNum}] In recursive CTE architectures and complex workflow queries, what is the core engineering rule governing ${topic.toLowerCase()}?`,
    options: [
      `A recursive term evaluates repeatedly against the prior working set until the termination predicate produces an empty set.`,
      `Recursive CTEs must be declared as temporary stored procedures with cursor handlers.`,
      `The recursive term can reference the CTE multiple times within subqueries in standard MySQL.`,
      `Using UNION instead of UNION ALL is required to advance iterations in recursive queries.`
    ],
    correct: 0,
    explanation: `A recursive CTE evaluates its anchor member once, then repeatedly joins the recursive term to the intermediate working table via UNION ALL until the termination condition produces 0 rows, at which point the recursion halts cleanly.`,
    isTrap: i % 3 === 0,
    trapBadge: i % 3 === 0 ? "Recursion Depth Trap" : undefined
  });
}

const drills = [];
for (let i = 1; i <= 100; i++) {
  const dNum = 1100 + i;
  drills.push({
    id: dNum,
    prompt: `[Drill #${dNum}] Write an optimized recursive CTE to generate an unbroken sequence of numbers from 1 to 10.`,
    task: `Generate integer series 1 to 10 using a recursive CTE.`,
    starterSQL: `WITH RECURSIVE Numbers AS (...) SELECT * FROM Numbers;`,
    solutionSQL: `WITH RECURSIVE Numbers AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Numbers WHERE n < 10\n)\nSELECT n FROM Numbers;`,
    hints: [`Anchor member selects 1 AS n`, `Recursive term selects n + 1 WHERE n < 10`, `Combine with UNION ALL`]
  });
}

const section11Data = {
  conceptId: "concept-11",
  conceptNumber: 11,
  title: "Recursive CTEs & Hierarchies",
  description: "Master recursive CTEs, tree hierarchy traversal, calendar date generation, multi-stage business pipelines, and missing sequence gap discovery.",
  masterclass: {
    chapters,
    callouts
  },
  mcqs,
  drills,
  problems: selectedProbs
};

const fileContent = `// =============================================================================
// LEETCODE ARENA - CONCEPT 11: RECURSIVE CTES & HIERARCHIES
// 13 Curated LeetCode Problems | 8 Masterclass Chapters | 100 MCQs | 100 Drills
// =============================================================================

window.LEETCODE_SECTION_11_DATA = ${JSON.stringify(section11Data, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../visualizer/leetcode_section11_data.js'), fileContent, 'utf8');
console.log(`Successfully generated visualizer/leetcode_section11_data.js with ${selectedProbs.length} problems!`);
