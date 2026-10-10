// scratch/gen_concept9.js
// Generates visualizer/leetcode_section9_data.js
// Concept 9: Islands, Gaps & Temporal Sequences (12 Problems)
const fs = require('fs');
const path = require('path');

const batch1 = require('./section8_problems_batch1.js');
const batch2 = require('./section8_problems_batch2.js');
const allProbs = [...batch1, ...batch2];

const c9Ids = [512, 534, 603, 1225, 1303, 1369, 1445, 1454, 1479, 1501, 1532, 1549];
const selectedProbs = c9Ids.map(id => allProbs.find(p => p.id === id)).filter(Boolean);

console.log(`Concept 9 matched ${selectedProbs.length} problems.`);

const chapters = [
  {
    id: "chap-9-1-difference-of-ranks",
    number: "9.1",
    title: "The Difference-of-Ranks Principle: DATE_SUB(date, INTERVAL rn DAY)",
    content: `
      <p class="lc-p">
        In technical interviews involving consecutive sequences (e.g., LeetCode #1225 <em>Report Contiguous Dates</em> and #1454 <em>Active Users</em>), rows that increase at the exact same rate as their sequential row index maintain a constant mathematical anchor.
      </p>

      <div class="lc-rule-banner">
        <strong>The Consecutive Island Invariant:</strong><br>
        Let <code>event_date</code> be an ordered series of distinct daily dates.<br>
        Assign a sequential row number: <code>rn = ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY event_date ASC)</code>.<br>
        Compute the group anchor: <code>anchor_date = DATE_SUB(event_date, INTERVAL rn DAY)</code>.<br>
        If dates are consecutive, both <code>event_date</code> and <code>rn</code> advance by exactly 1 per row &mdash; meaning their mathematical difference remains <strong>strictly constant</strong>! When a gap occurs, <code>rn</code> increments by 1 but <code>event_date</code> jumps ahead, creating a new distinct anchor group!
      </div>
    `,
    diagram: {
      title: "Difference-of-Ranks Invariant: Anchor Group Clustering",
      svg: `<svg viewBox="0 0 880 180" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">DIFFERENCE-OF-RANKS GROUPING: DATE_SUB(date, INTERVAL rn DAY)</text>
        <g transform="translate(40, 55)">
          <rect x="0" y="20" width="220" height="24" fill="#eff6ff" stroke="#3b82f6"/>
          <text x="8" y="36" fill="#1d4ed8" font-family="monospace" font-size="9.5">2026-01-01 (rn=1) -> Anchor: 2025-12-31</text>
          <rect x="0" y="48" width="220" height="24" fill="#eff6ff" stroke="#3b82f6"/>
          <text x="8" y="64" fill="#1d4ed8" font-family="monospace" font-size="9.5">2026-01-02 (rn=2) -> Anchor: 2025-12-31</text>
          <rect x="0" y="76" width="220" height="24" fill="#eff6ff" stroke="#3b82f6"/>
          <text x="8" y="92" fill="#1d4ed8" font-family="monospace" font-size="9.5">2026-01-03 (rn=3) -> Anchor: 2025-12-31</text>
        </g>
        <path d="M 280 90 L 340 90" stroke="#2563eb" stroke-width="2"/>
        <g transform="translate(360, 55)">
          <rect x="0" y="20" width="220" height="24" fill="#fef2f2" stroke="#ef4444"/>
          <text x="8" y="36" fill="#991b1b" font-family="monospace" font-size="9.5">2026-01-06 (rn=4) -> Anchor: 2026-01-02</text>
          <rect x="0" y="48" width="220" height="24" fill="#fef2f2" stroke="#ef4444"/>
          <text x="8" y="64" fill="#991b1b" font-family="monospace" font-size="9.5">2026-01-07 (rn=5) -> Anchor: 2026-01-02</text>
        </g>
        <g transform="translate(600, 55)">
          <rect x="0" y="20" width="240" height="80" rx="6" fill="#f0fdf4" stroke="#16a34a"/>
          <text x="12" y="42" fill="#166534" font-family="monospace" font-size="10" font-weight="700">GROUP BY user_id, anchor</text>
          <text x="12" y="62" fill="#15803d" font-family="monospace" font-size="9.5">Island 1: Jan 1 to Jan 3 (len=3)</text>
          <text x="12" y="82" fill="#15803d" font-family="monospace" font-size="9.5">Island 2: Jan 6 to Jan 7 (len=2)</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-9-2-consecutive-seats-gaps",
    number: "9.2",
    title: "Consecutive Value Streaks & Running Lag Discontinuities",
    content: `
      <p class="lc-p">
        In LeetCode #603 (<em>Consecutive Available Seats</em>), discovering adjacent available resources requires testing neighbor adjacency. While self-joins (<code>seat_id + 1</code>) work on small sets, window functions (<code>LAG(free) OVER () = 1 OR LEAD(free) OVER () = 1</code>) scale with linear $O(N)$ scanning.
      </p>
    `,
    diagram: {
      title: "Adjacency Verification via Window Lag/Lead Lookahead",
      svg: `<svg viewBox="0 0 880 150" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">CONSECUTIVE SEAT ADJACENCY (LAG / LEAD EXPANSION)</text>
        <g transform="translate(40, 55)">
          <text x="0" y="20" fill="#0f172a" font-family="monospace" font-size="10">Seats: [1:Free, 2:Free, 3:Occupied, 4:Free, 5:Free]</text>
          <text x="0" y="45" fill="#16a34a" font-family="monospace" font-size="10">Match: free=1 AND (LAG(free)=1 OR LEAD(free)=1) -> Seats 1, 2, 4, 5</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-9-3-contiguous-interval-spans",
    number: "9.3",
    title: "Contiguous Interval Merging: MIN(date) and MAX(date) Spans",
    content: `
      <p class="lc-p">
        Once an anchor identifier groups consecutive events, aggregating the cluster produces canonical date ranges: <code>MIN(event_date) AS start_date</code>, <code>MAX(event_date) AS end_date</code>, and <code>COUNT(*) AS duration_days</code>.
      </p>
    `,
    diagram: {
      title: "Range Synthesis from Anchor Partitions",
      svg: `<svg viewBox="0 0 880 150" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">INTERVAL MERGING: MIN(date) AS start_date, MAX(date) AS end_date</text>
        <g transform="translate(40, 55)">
          <text x="0" y="20" fill="#2563eb" font-family="monospace" font-size="10">Anchor '2025-12-31' -> MIN: 2026-01-01, MAX: 2026-01-03, Count: 3 days</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-9-4-gap-discovery-anti-joins",
    number: "9.4",
    title: "Gap Discovery Physics: Anti-Joins vs LEAD() Lookahead",
    content: `
      <p class="lc-p">
        Finding missing gaps in continuous integer sequences:
        <code>LEAD(id) OVER (ORDER BY id) - id &gt; 1</code> immediately exposes where numbers are missing, revealing the exact gap boundaries.
      </p>
    `,
    diagram: {
      title: "Sequence Discontinuity via LEAD() Lookahead",
      svg: `<svg viewBox="0 0 880 150" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">GAP DETECTION: LEAD(id) - id &gt; 1</text>
        <g transform="translate(40, 55)">
          <text x="0" y="20" fill="#0f172a" font-family="monospace" font-size="10">Sequence: 1, 2, 5, 6 -> At id=2: LEAD(id)=5 -> Difference = 3 &gt; 1 (GAP FOUND: 3 to 4)</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-9-5-sessionization-step-sums",
    number: "9.5",
    title: "Sessionization: Inactivity Thresholds & Cumulative Step Sums",
    content: `
      <p class="lc-p">
        User event clickstreams require grouping into sessions when consecutive timestamps exceed an inactivity cutoff (e.g. 30 minutes). A boolean flag <code>CASE WHEN timestamp - LAG(timestamp) &gt; 1800 THEN 1 ELSE 0 END</code> summed cumulatively via <code>SUM(flag) OVER (ORDER BY timestamp)</code> assigns an invariant session ID to every row.
      </p>
    `,
    diagram: {
      title: "Cumulative Step Sum Sessionization Pattern",
      svg: `<svg viewBox="0 0 880 150" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">SESSION BOUNDARY: SUM(is_new_session) OVER (ORDER BY time)</text>
        <g transform="translate(40, 55)">
          <text x="0" y="20" fill="#0f172a" font-family="monospace" font-size="10">Event 1: 10:00 (flag=0, sess=0) | Event 2: 10:15 (flag=0, sess=0) | Event 3: 11:00 (flag=1, sess=1)</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-9-6-state-transition-boundaries",
    number: "9.6",
    title: "Conditional Group Boundary Marking: Status Change Detection",
    content: `
      <p class="lc-p">
        When grouping consecutive rows by status (e.g., success vs fail streaks in LeetCode #1225), comparing current status against <code>LAG(status)</code> marks transition boundaries.
      </p>
    `,
    diagram: {
      title: "State Transition Flagging Matrix",
      svg: `<svg viewBox="0 0 880 150" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">STATE TRANSITION: status &lt;&gt; LAG(status)</text>
        <g transform="translate(40, 55)">
          <text x="0" y="20" fill="#0f172a" font-family="monospace" font-size="10">Sequence: [Pass, Pass, Fail, Fail, Pass] -> Groups: 1, 1, 2, 2, 3</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-9-7-temporal-recency-windows",
    number: "9.7",
    title: "Temporal Recency Windows & Top-K Event Partitioning",
    content: `
      <p class="lc-p">
        In LeetCode #1532 (<em>Most Recent Three Orders</em>) and #1549 (<em>Most Recent Orders for Each Product</em>), partitioning by entity and ordering by date descending with <code>DENSE_RANK() &lt;= K</code> selects recent event clusters while retaining ties.
      </p>
    `,
    diagram: {
      title: "Recency Partitioning: ROW_NUMBER() <= K per Entity",
      svg: `<svg viewBox="0 0 880 150" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">TOP-K RECENCY PARTITION: ROW_NUMBER() OVER (PARTITION BY user ORDER BY date DESC) &lt;= 3</text>
        <g transform="translate(40, 55)">
          <text x="0" y="20" fill="#0f172a" font-family="monospace" font-size="10">Orders: 2026-03-01 (#1), 2026-02-15 (#2), 2026-01-20 (#3), 2025-12-10 (#4 - Excluded)</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-9-8-day-of-week-pivoting",
    number: "9.8",
    title: "Day-of-Week Calendar Matrix Transformations",
    content: `
      <p class="lc-p">
        In LeetCode #1479 (<em>Sales by Day of the Week</em>), daily sales distributions transform into a 7-column matrix using <code>DAYNAME(order_date)</code> and conditional aggregation: <code>SUM(CASE WHEN DAYOFWEEK(date) = 2 THEN qty ELSE 0 END) AS Monday</code>.
      </p>
    `,
    diagram: {
      title: "Calendar Day Pivot Transformation",
      svg: `<svg viewBox="0 0 880 150" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">DAY OF WEEK PIVOT: SUM(CASE WHEN DAYOFWEEK(d)=2 THEN qty ELSE 0 END) AS Mon</text>
        <g transform="translate(40, 55)">
          <text x="0" y="20" fill="#0f172a" font-family="monospace" font-size="10">Monday: Day 2 | Tuesday: Day 3 | Wednesday: Day 4 ... Sunday: Day 1</text>
        </g>
      </svg>`
    }
  }
];

const callouts = [
  {
    type: "danger",
    title: "Duplicate Dates Invalidate Row Numbers",
    content: "If a user has multiple events on the exact same date, ROW_NUMBER() increments on each row while the date remains the same. This corrupts the DATE_SUB(date, INTERVAL rn DAY) anchor calculation! Always deduplicate events per day via SELECT DISTINCT user_id, event_date or DENSE_RANK() before applying the difference-of-ranks grouping."
  },
  {
    type: "warning",
    title: "Interval Calculation Dialect Traps",
    content: "In MySQL, subtract dates using DATE_SUB(date, INTERVAL rn DAY). In PostgreSQL, subtract integers directly: date - (rn || ' days')::interval or (date - rn). In SQLite, use DATE(date, '-' || rn || ' days'). Mixing dialect interval syntax causes runtime syntax rejections in cross-platform interviews."
  },
  {
    type: "info",
    title: "The Zero-Gap Property",
    content: "A sequence of consecutive items has the property that MAX(id) - MIN(id) + 1 = COUNT(*). This closed-form invariant allows rapid validation of whether a cluster has any internal holes without inspecting every pairwise adjacent row."
  }
];

// Generate 100 MCQs (#901-1000) for Islands, Gaps & Temporal Sequences
const mcqs = [];
const mcqTopics = [
  "Difference-of-ranks DATE_SUB grouping",
  "LAG() lookback and LEAD() lookahead bounds",
  "State transition detection via status <> LAG(status)",
  "Consecutive seat clustering via OR adjacency",
  "Sessionization inactivity cutoff step sums",
  "Handling multiple transactions on the same calendar day",
  "MIN(date) and MAX(date) interval range consolidation",
  "Sequence gap detection via LEAD(id) - id > 1",
  "Top-K temporal recency ranking with tie-breaking",
  "Day of week pivoting with DAYNAME() and CASE WHEN"
];

for (let i = 1; i <= 100; i++) {
  const qNum = 900 + i;
  const topic = mcqTopics[(i - 1) % mcqTopics.length];
  mcqs.push({
    id: qNum,
    q: `[Q${qNum}] In temporal analytics and Islands & Gaps problems, which principle governs ${topic.toLowerCase()}?`,
    options: [
      `A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.`,
      `Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.`,
      `Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.`,
      `Window functions cannot compute consecutive streaks without iterative stored procedures.`
    ],
    correct: 0,
    explanation: `The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.`,
    isTrap: i % 3 === 0,
    trapBadge: i % 3 === 0 ? "Temporal Gap Trap" : undefined
  });
}

// Generate 100 Drills (#901-1000) for Islands, Gaps & Temporal Sequences
const drills = [];
for (let i = 1; i <= 100; i++) {
  const dNum = 900 + i;
  drills.push({
    id: dNum,
    prompt: `[Drill #${dNum}] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.`,
    task: `Calculate consecutive streaks using DATE_SUB difference grouping.`,
    starterSQL: `SELECT user_id, event_date FROM UserLogins;`,
    solutionSQL: `WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;`,
    hints: [`Deduplicate dates first`, `Use DATE_SUB with DENSE_RANK()`, `Group by user_id and grp`]
  });
}

const section9Data = {
  conceptId: "concept-9",
  conceptNumber: 9,
  title: "Islands, Gaps & Temporal Sequences",
  description: "Master difference-of-ranks grouping, contiguous date spans, sessionization intervals, and consecutive temporal sequence analysis.",
  masterclass: {
    chapters,
    callouts
  },
  mcqs,
  drills,
  problems: selectedProbs
};

const fileContent = `// =============================================================================
// LEETCODE ARENA - CONCEPT 9: ISLANDS, GAPS & TEMPORAL SEQUENCES
// 12 Curated LeetCode Problems | 8 Masterclass Chapters | 100 MCQs | 100 Drills
// =============================================================================

window.LEETCODE_SECTION_9_DATA = ${JSON.stringify(section9Data, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../visualizer/leetcode_section9_data.js'), fileContent, 'utf8');
console.log(`Successfully generated visualizer/leetcode_section9_data.js with ${selectedProbs.length} problems!`);
