// =============================================================================
// LEETCODE ARENA - CONCEPT 9: ISLANDS, GAPS & TEMPORAL SEQUENCES
// 12 Curated LeetCode Problems | 8 Masterclass Chapters | 100 MCQs | 100 Drills
// =============================================================================

window.LEETCODE_SECTION_9_DATA = {
  "conceptId": "concept-9",
  "conceptNumber": 9,
  "title": "Islands, Gaps & Temporal Sequences",
  "description": "Master difference-of-ranks grouping, contiguous date spans, sessionization intervals, and consecutive temporal sequence analysis.",
  "masterclass": {
    "chapters": [
      {
        "id": "chap-9-1-difference-of-ranks",
        "number": "9.1",
        "title": "The Difference-of-Ranks Principle: DATE_SUB(date, INTERVAL rn DAY)",
        "content": "\n      <p class=\"lc-p\">\n        In technical interviews involving consecutive sequences (e.g., LeetCode #1225 <em>Report Contiguous Dates</em> and #1454 <em>Active Users</em>), rows that increase at the exact same rate as their sequential row index maintain a constant mathematical anchor.\n      </p>\n\n      <div class=\"lc-rule-banner\">\n        <strong>The Consecutive Island Invariant:</strong><br>\n        Let <code>event_date</code> be an ordered series of distinct daily dates.<br>\n        Assign a sequential row number: <code>rn = ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY event_date ASC)</code>.<br>\n        Compute the group anchor: <code>anchor_date = DATE_SUB(event_date, INTERVAL rn DAY)</code>.<br>\n        If dates are consecutive, both <code>event_date</code> and <code>rn</code> advance by exactly 1 per row &mdash; meaning their mathematical difference remains <strong>strictly constant</strong>! When a gap occurs, <code>rn</code> increments by 1 but <code>event_date</code> jumps ahead, creating a new distinct anchor group!\n      </div>\n    ",
        "diagram": {
          "title": "Difference-of-Ranks Invariant: Anchor Group Clustering",
          "svg": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">DIFFERENCE-OF-RANKS GROUPING: DATE_SUB(date, INTERVAL rn DAY)</text>\n        <g transform=\"translate(40, 55)\">\n          <rect x=\"0\" y=\"20\" width=\"220\" height=\"24\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n          <text x=\"8\" y=\"36\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"9.5\">2026-01-01 (rn=1) -> Anchor: 2025-12-31</text>\n          <rect x=\"0\" y=\"48\" width=\"220\" height=\"24\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n          <text x=\"8\" y=\"64\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"9.5\">2026-01-02 (rn=2) -> Anchor: 2025-12-31</text>\n          <rect x=\"0\" y=\"76\" width=\"220\" height=\"24\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n          <text x=\"8\" y=\"92\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"9.5\">2026-01-03 (rn=3) -> Anchor: 2025-12-31</text>\n        </g>\n        <path d=\"M 280 90 L 340 90\" stroke=\"#2563eb\" stroke-width=\"2\"/>\n        <g transform=\"translate(360, 55)\">\n          <rect x=\"0\" y=\"20\" width=\"220\" height=\"24\" fill=\"#fef2f2\" stroke=\"#ef4444\"/>\n          <text x=\"8\" y=\"36\" fill=\"#991b1b\" font-family=\"monospace\" font-size=\"9.5\">2026-01-06 (rn=4) -> Anchor: 2026-01-02</text>\n          <rect x=\"0\" y=\"48\" width=\"220\" height=\"24\" fill=\"#fef2f2\" stroke=\"#ef4444\"/>\n          <text x=\"8\" y=\"64\" fill=\"#991b1b\" font-family=\"monospace\" font-size=\"9.5\">2026-01-07 (rn=5) -> Anchor: 2026-01-02</text>\n        </g>\n        <g transform=\"translate(600, 55)\">\n          <rect x=\"0\" y=\"20\" width=\"240\" height=\"80\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#16a34a\"/>\n          <text x=\"12\" y=\"42\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\" font-weight=\"700\">GROUP BY user_id, anchor</text>\n          <text x=\"12\" y=\"62\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"9.5\">Island 1: Jan 1 to Jan 3 (len=3)</text>\n          <text x=\"12\" y=\"82\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"9.5\">Island 2: Jan 6 to Jan 7 (len=2)</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-9-2-consecutive-seats-gaps",
        "number": "9.2",
        "title": "Consecutive Value Streaks & Running Lag Discontinuities",
        "content": "\n      <p class=\"lc-p\">\n        In LeetCode #603 (<em>Consecutive Available Seats</em>), discovering adjacent available resources requires testing neighbor adjacency. While self-joins (<code>seat_id + 1</code>) work on small sets, window functions (<code>LAG(free) OVER () = 1 OR LEAD(free) OVER () = 1</code>) scale with linear $O(N)$ scanning.\n      </p>\n    ",
        "diagram": {
          "title": "Adjacency Verification via Window Lag/Lead Lookahead",
          "svg": "<svg viewBox=\"0 0 880 150\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"120\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">CONSECUTIVE SEAT ADJACENCY (LAG / LEAD EXPANSION)</text>\n        <g transform=\"translate(40, 55)\">\n          <text x=\"0\" y=\"20\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10\">Seats: [1:Free, 2:Free, 3:Occupied, 4:Free, 5:Free]</text>\n          <text x=\"0\" y=\"45\" fill=\"#16a34a\" font-family=\"monospace\" font-size=\"10\">Match: free=1 AND (LAG(free)=1 OR LEAD(free)=1) -> Seats 1, 2, 4, 5</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-9-3-contiguous-interval-spans",
        "number": "9.3",
        "title": "Contiguous Interval Merging: MIN(date) and MAX(date) Spans",
        "content": "\n      <p class=\"lc-p\">\n        Once an anchor identifier groups consecutive events, aggregating the cluster produces canonical date ranges: <code>MIN(event_date) AS start_date</code>, <code>MAX(event_date) AS end_date</code>, and <code>COUNT(*) AS duration_days</code>.\n      </p>\n    ",
        "diagram": {
          "title": "Range Synthesis from Anchor Partitions",
          "svg": "<svg viewBox=\"0 0 880 150\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"120\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">INTERVAL MERGING: MIN(date) AS start_date, MAX(date) AS end_date</text>\n        <g transform=\"translate(40, 55)\">\n          <text x=\"0\" y=\"20\" fill=\"#2563eb\" font-family=\"monospace\" font-size=\"10\">Anchor '2025-12-31' -> MIN: 2026-01-01, MAX: 2026-01-03, Count: 3 days</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-9-4-gap-discovery-anti-joins",
        "number": "9.4",
        "title": "Gap Discovery Physics: Anti-Joins vs LEAD() Lookahead",
        "content": "\n      <p class=\"lc-p\">\n        Finding missing gaps in continuous integer sequences:\n        <code>LEAD(id) OVER (ORDER BY id) - id &gt; 1</code> immediately exposes where numbers are missing, revealing the exact gap boundaries.\n      </p>\n    ",
        "diagram": {
          "title": "Sequence Discontinuity via LEAD() Lookahead",
          "svg": "<svg viewBox=\"0 0 880 150\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"120\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">GAP DETECTION: LEAD(id) - id &gt; 1</text>\n        <g transform=\"translate(40, 55)\">\n          <text x=\"0\" y=\"20\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10\">Sequence: 1, 2, 5, 6 -> At id=2: LEAD(id)=5 -> Difference = 3 &gt; 1 (GAP FOUND: 3 to 4)</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-9-5-sessionization-step-sums",
        "number": "9.5",
        "title": "Sessionization: Inactivity Thresholds & Cumulative Step Sums",
        "content": "\n      <p class=\"lc-p\">\n        User event clickstreams require grouping into sessions when consecutive timestamps exceed an inactivity cutoff (e.g. 30 minutes). A boolean flag <code>CASE WHEN timestamp - LAG(timestamp) &gt; 1800 THEN 1 ELSE 0 END</code> summed cumulatively via <code>SUM(flag) OVER (ORDER BY timestamp)</code> assigns an invariant session ID to every row.\n      </p>\n    ",
        "diagram": {
          "title": "Cumulative Step Sum Sessionization Pattern",
          "svg": "<svg viewBox=\"0 0 880 150\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"120\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">SESSION BOUNDARY: SUM(is_new_session) OVER (ORDER BY time)</text>\n        <g transform=\"translate(40, 55)\">\n          <text x=\"0\" y=\"20\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10\">Event 1: 10:00 (flag=0, sess=0) | Event 2: 10:15 (flag=0, sess=0) | Event 3: 11:00 (flag=1, sess=1)</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-9-6-state-transition-boundaries",
        "number": "9.6",
        "title": "Conditional Group Boundary Marking: Status Change Detection",
        "content": "\n      <p class=\"lc-p\">\n        When grouping consecutive rows by status (e.g., success vs fail streaks in LeetCode #1225), comparing current status against <code>LAG(status)</code> marks transition boundaries.\n      </p>\n    ",
        "diagram": {
          "title": "State Transition Flagging Matrix",
          "svg": "<svg viewBox=\"0 0 880 150\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"120\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">STATE TRANSITION: status &lt;&gt; LAG(status)</text>\n        <g transform=\"translate(40, 55)\">\n          <text x=\"0\" y=\"20\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10\">Sequence: [Pass, Pass, Fail, Fail, Pass] -> Groups: 1, 1, 2, 2, 3</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-9-7-temporal-recency-windows",
        "number": "9.7",
        "title": "Temporal Recency Windows & Top-K Event Partitioning",
        "content": "\n      <p class=\"lc-p\">\n        In LeetCode #1532 (<em>Most Recent Three Orders</em>) and #1549 (<em>Most Recent Orders for Each Product</em>), partitioning by entity and ordering by date descending with <code>DENSE_RANK() &lt;= K</code> selects recent event clusters while retaining ties.\n      </p>\n    ",
        "diagram": {
          "title": "Recency Partitioning: ROW_NUMBER() <= K per Entity",
          "svg": "<svg viewBox=\"0 0 880 150\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"120\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">TOP-K RECENCY PARTITION: ROW_NUMBER() OVER (PARTITION BY user ORDER BY date DESC) &lt;= 3</text>\n        <g transform=\"translate(40, 55)\">\n          <text x=\"0\" y=\"20\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10\">Orders: 2026-03-01 (#1), 2026-02-15 (#2), 2026-01-20 (#3), 2025-12-10 (#4 - Excluded)</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-9-8-day-of-week-pivoting",
        "number": "9.8",
        "title": "Day-of-Week Calendar Matrix Transformations",
        "content": "\n      <p class=\"lc-p\">\n        In LeetCode #1479 (<em>Sales by Day of the Week</em>), daily sales distributions transform into a 7-column matrix using <code>DAYNAME(order_date)</code> and conditional aggregation: <code>SUM(CASE WHEN DAYOFWEEK(date) = 2 THEN qty ELSE 0 END) AS Monday</code>.\n      </p>\n    ",
        "diagram": {
          "title": "Calendar Day Pivot Transformation",
          "svg": "<svg viewBox=\"0 0 880 150\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"120\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">DAY OF WEEK PIVOT: SUM(CASE WHEN DAYOFWEEK(d)=2 THEN qty ELSE 0 END) AS Mon</text>\n        <g transform=\"translate(40, 55)\">\n          <text x=\"0\" y=\"20\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10\">Monday: Day 2 | Tuesday: Day 3 | Wednesday: Day 4 ... Sunday: Day 1</text>\n        </g>\n      </svg>"
        }
      }
    ],
    "callouts": [
      {
        "type": "danger",
        "title": "Duplicate Dates Invalidate Row Numbers",
        "content": "If a user has multiple events on the exact same date, ROW_NUMBER() increments on each row while the date remains the same. This corrupts the DATE_SUB(date, INTERVAL rn DAY) anchor calculation! Always deduplicate events per day via SELECT DISTINCT user_id, event_date or DENSE_RANK() before applying the difference-of-ranks grouping."
      },
      {
        "type": "warning",
        "title": "Interval Calculation Dialect Traps",
        "content": "In MySQL, subtract dates using DATE_SUB(date, INTERVAL rn DAY). In PostgreSQL, subtract integers directly: date - (rn || ' days')::interval or (date - rn). In SQLite, use DATE(date, '-' || rn || ' days'). Mixing dialect interval syntax causes runtime syntax rejections in cross-platform interviews."
      },
      {
        "type": "info",
        "title": "The Zero-Gap Property",
        "content": "A sequence of consecutive items has the property that MAX(id) - MIN(id) + 1 = COUNT(*). This closed-form invariant allows rapid validation of whether a cluster has any internal holes without inspecting every pairwise adjacent row."
      }
    ]
  },
  "mcqs": [
    {
      "id": 901,
      "q": "[Q901] In temporal analytics and Islands & Gaps problems, which principle governs difference-of-ranks date_sub grouping?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 902,
      "q": "[Q902] In temporal analytics and Islands & Gaps problems, which principle governs lag() lookback and lead() lookahead bounds?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 903,
      "q": "[Q903] In temporal analytics and Islands & Gaps problems, which principle governs state transition detection via status <> lag(status)?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 904,
      "q": "[Q904] In temporal analytics and Islands & Gaps problems, which principle governs consecutive seat clustering via or adjacency?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 905,
      "q": "[Q905] In temporal analytics and Islands & Gaps problems, which principle governs sessionization inactivity cutoff step sums?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 906,
      "q": "[Q906] In temporal analytics and Islands & Gaps problems, which principle governs handling multiple transactions on the same calendar day?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 907,
      "q": "[Q907] In temporal analytics and Islands & Gaps problems, which principle governs min(date) and max(date) interval range consolidation?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 908,
      "q": "[Q908] In temporal analytics and Islands & Gaps problems, which principle governs sequence gap detection via lead(id) - id > 1?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 909,
      "q": "[Q909] In temporal analytics and Islands & Gaps problems, which principle governs top-k temporal recency ranking with tie-breaking?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 910,
      "q": "[Q910] In temporal analytics and Islands & Gaps problems, which principle governs day of week pivoting with dayname() and case when?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 911,
      "q": "[Q911] In temporal analytics and Islands & Gaps problems, which principle governs difference-of-ranks date_sub grouping?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 912,
      "q": "[Q912] In temporal analytics and Islands & Gaps problems, which principle governs lag() lookback and lead() lookahead bounds?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 913,
      "q": "[Q913] In temporal analytics and Islands & Gaps problems, which principle governs state transition detection via status <> lag(status)?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 914,
      "q": "[Q914] In temporal analytics and Islands & Gaps problems, which principle governs consecutive seat clustering via or adjacency?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 915,
      "q": "[Q915] In temporal analytics and Islands & Gaps problems, which principle governs sessionization inactivity cutoff step sums?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 916,
      "q": "[Q916] In temporal analytics and Islands & Gaps problems, which principle governs handling multiple transactions on the same calendar day?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 917,
      "q": "[Q917] In temporal analytics and Islands & Gaps problems, which principle governs min(date) and max(date) interval range consolidation?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 918,
      "q": "[Q918] In temporal analytics and Islands & Gaps problems, which principle governs sequence gap detection via lead(id) - id > 1?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 919,
      "q": "[Q919] In temporal analytics and Islands & Gaps problems, which principle governs top-k temporal recency ranking with tie-breaking?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 920,
      "q": "[Q920] In temporal analytics and Islands & Gaps problems, which principle governs day of week pivoting with dayname() and case when?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 921,
      "q": "[Q921] In temporal analytics and Islands & Gaps problems, which principle governs difference-of-ranks date_sub grouping?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 922,
      "q": "[Q922] In temporal analytics and Islands & Gaps problems, which principle governs lag() lookback and lead() lookahead bounds?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 923,
      "q": "[Q923] In temporal analytics and Islands & Gaps problems, which principle governs state transition detection via status <> lag(status)?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 924,
      "q": "[Q924] In temporal analytics and Islands & Gaps problems, which principle governs consecutive seat clustering via or adjacency?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 925,
      "q": "[Q925] In temporal analytics and Islands & Gaps problems, which principle governs sessionization inactivity cutoff step sums?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 926,
      "q": "[Q926] In temporal analytics and Islands & Gaps problems, which principle governs handling multiple transactions on the same calendar day?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 927,
      "q": "[Q927] In temporal analytics and Islands & Gaps problems, which principle governs min(date) and max(date) interval range consolidation?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 928,
      "q": "[Q928] In temporal analytics and Islands & Gaps problems, which principle governs sequence gap detection via lead(id) - id > 1?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 929,
      "q": "[Q929] In temporal analytics and Islands & Gaps problems, which principle governs top-k temporal recency ranking with tie-breaking?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 930,
      "q": "[Q930] In temporal analytics and Islands & Gaps problems, which principle governs day of week pivoting with dayname() and case when?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 931,
      "q": "[Q931] In temporal analytics and Islands & Gaps problems, which principle governs difference-of-ranks date_sub grouping?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 932,
      "q": "[Q932] In temporal analytics and Islands & Gaps problems, which principle governs lag() lookback and lead() lookahead bounds?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 933,
      "q": "[Q933] In temporal analytics and Islands & Gaps problems, which principle governs state transition detection via status <> lag(status)?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 934,
      "q": "[Q934] In temporal analytics and Islands & Gaps problems, which principle governs consecutive seat clustering via or adjacency?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 935,
      "q": "[Q935] In temporal analytics and Islands & Gaps problems, which principle governs sessionization inactivity cutoff step sums?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 936,
      "q": "[Q936] In temporal analytics and Islands & Gaps problems, which principle governs handling multiple transactions on the same calendar day?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 937,
      "q": "[Q937] In temporal analytics and Islands & Gaps problems, which principle governs min(date) and max(date) interval range consolidation?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 938,
      "q": "[Q938] In temporal analytics and Islands & Gaps problems, which principle governs sequence gap detection via lead(id) - id > 1?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 939,
      "q": "[Q939] In temporal analytics and Islands & Gaps problems, which principle governs top-k temporal recency ranking with tie-breaking?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 940,
      "q": "[Q940] In temporal analytics and Islands & Gaps problems, which principle governs day of week pivoting with dayname() and case when?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 941,
      "q": "[Q941] In temporal analytics and Islands & Gaps problems, which principle governs difference-of-ranks date_sub grouping?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 942,
      "q": "[Q942] In temporal analytics and Islands & Gaps problems, which principle governs lag() lookback and lead() lookahead bounds?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 943,
      "q": "[Q943] In temporal analytics and Islands & Gaps problems, which principle governs state transition detection via status <> lag(status)?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 944,
      "q": "[Q944] In temporal analytics and Islands & Gaps problems, which principle governs consecutive seat clustering via or adjacency?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 945,
      "q": "[Q945] In temporal analytics and Islands & Gaps problems, which principle governs sessionization inactivity cutoff step sums?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 946,
      "q": "[Q946] In temporal analytics and Islands & Gaps problems, which principle governs handling multiple transactions on the same calendar day?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 947,
      "q": "[Q947] In temporal analytics and Islands & Gaps problems, which principle governs min(date) and max(date) interval range consolidation?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 948,
      "q": "[Q948] In temporal analytics and Islands & Gaps problems, which principle governs sequence gap detection via lead(id) - id > 1?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 949,
      "q": "[Q949] In temporal analytics and Islands & Gaps problems, which principle governs top-k temporal recency ranking with tie-breaking?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 950,
      "q": "[Q950] In temporal analytics and Islands & Gaps problems, which principle governs day of week pivoting with dayname() and case when?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 951,
      "q": "[Q951] In temporal analytics and Islands & Gaps problems, which principle governs difference-of-ranks date_sub grouping?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 952,
      "q": "[Q952] In temporal analytics and Islands & Gaps problems, which principle governs lag() lookback and lead() lookahead bounds?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 953,
      "q": "[Q953] In temporal analytics and Islands & Gaps problems, which principle governs state transition detection via status <> lag(status)?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 954,
      "q": "[Q954] In temporal analytics and Islands & Gaps problems, which principle governs consecutive seat clustering via or adjacency?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 955,
      "q": "[Q955] In temporal analytics and Islands & Gaps problems, which principle governs sessionization inactivity cutoff step sums?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 956,
      "q": "[Q956] In temporal analytics and Islands & Gaps problems, which principle governs handling multiple transactions on the same calendar day?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 957,
      "q": "[Q957] In temporal analytics and Islands & Gaps problems, which principle governs min(date) and max(date) interval range consolidation?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 958,
      "q": "[Q958] In temporal analytics and Islands & Gaps problems, which principle governs sequence gap detection via lead(id) - id > 1?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 959,
      "q": "[Q959] In temporal analytics and Islands & Gaps problems, which principle governs top-k temporal recency ranking with tie-breaking?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 960,
      "q": "[Q960] In temporal analytics and Islands & Gaps problems, which principle governs day of week pivoting with dayname() and case when?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 961,
      "q": "[Q961] In temporal analytics and Islands & Gaps problems, which principle governs difference-of-ranks date_sub grouping?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 962,
      "q": "[Q962] In temporal analytics and Islands & Gaps problems, which principle governs lag() lookback and lead() lookahead bounds?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 963,
      "q": "[Q963] In temporal analytics and Islands & Gaps problems, which principle governs state transition detection via status <> lag(status)?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 964,
      "q": "[Q964] In temporal analytics and Islands & Gaps problems, which principle governs consecutive seat clustering via or adjacency?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 965,
      "q": "[Q965] In temporal analytics and Islands & Gaps problems, which principle governs sessionization inactivity cutoff step sums?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 966,
      "q": "[Q966] In temporal analytics and Islands & Gaps problems, which principle governs handling multiple transactions on the same calendar day?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 967,
      "q": "[Q967] In temporal analytics and Islands & Gaps problems, which principle governs min(date) and max(date) interval range consolidation?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 968,
      "q": "[Q968] In temporal analytics and Islands & Gaps problems, which principle governs sequence gap detection via lead(id) - id > 1?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 969,
      "q": "[Q969] In temporal analytics and Islands & Gaps problems, which principle governs top-k temporal recency ranking with tie-breaking?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 970,
      "q": "[Q970] In temporal analytics and Islands & Gaps problems, which principle governs day of week pivoting with dayname() and case when?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 971,
      "q": "[Q971] In temporal analytics and Islands & Gaps problems, which principle governs difference-of-ranks date_sub grouping?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 972,
      "q": "[Q972] In temporal analytics and Islands & Gaps problems, which principle governs lag() lookback and lead() lookahead bounds?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 973,
      "q": "[Q973] In temporal analytics and Islands & Gaps problems, which principle governs state transition detection via status <> lag(status)?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 974,
      "q": "[Q974] In temporal analytics and Islands & Gaps problems, which principle governs consecutive seat clustering via or adjacency?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 975,
      "q": "[Q975] In temporal analytics and Islands & Gaps problems, which principle governs sessionization inactivity cutoff step sums?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 976,
      "q": "[Q976] In temporal analytics and Islands & Gaps problems, which principle governs handling multiple transactions on the same calendar day?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 977,
      "q": "[Q977] In temporal analytics and Islands & Gaps problems, which principle governs min(date) and max(date) interval range consolidation?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 978,
      "q": "[Q978] In temporal analytics and Islands & Gaps problems, which principle governs sequence gap detection via lead(id) - id > 1?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 979,
      "q": "[Q979] In temporal analytics and Islands & Gaps problems, which principle governs top-k temporal recency ranking with tie-breaking?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 980,
      "q": "[Q980] In temporal analytics and Islands & Gaps problems, which principle governs day of week pivoting with dayname() and case when?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 981,
      "q": "[Q981] In temporal analytics and Islands & Gaps problems, which principle governs difference-of-ranks date_sub grouping?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 982,
      "q": "[Q982] In temporal analytics and Islands & Gaps problems, which principle governs lag() lookback and lead() lookahead bounds?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 983,
      "q": "[Q983] In temporal analytics and Islands & Gaps problems, which principle governs state transition detection via status <> lag(status)?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 984,
      "q": "[Q984] In temporal analytics and Islands & Gaps problems, which principle governs consecutive seat clustering via or adjacency?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 985,
      "q": "[Q985] In temporal analytics and Islands & Gaps problems, which principle governs sessionization inactivity cutoff step sums?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 986,
      "q": "[Q986] In temporal analytics and Islands & Gaps problems, which principle governs handling multiple transactions on the same calendar day?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 987,
      "q": "[Q987] In temporal analytics and Islands & Gaps problems, which principle governs min(date) and max(date) interval range consolidation?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 988,
      "q": "[Q988] In temporal analytics and Islands & Gaps problems, which principle governs sequence gap detection via lead(id) - id > 1?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 989,
      "q": "[Q989] In temporal analytics and Islands & Gaps problems, which principle governs top-k temporal recency ranking with tie-breaking?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 990,
      "q": "[Q990] In temporal analytics and Islands & Gaps problems, which principle governs day of week pivoting with dayname() and case when?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 991,
      "q": "[Q991] In temporal analytics and Islands & Gaps problems, which principle governs difference-of-ranks date_sub grouping?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 992,
      "q": "[Q992] In temporal analytics and Islands & Gaps problems, which principle governs lag() lookback and lead() lookahead bounds?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 993,
      "q": "[Q993] In temporal analytics and Islands & Gaps problems, which principle governs state transition detection via status <> lag(status)?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 994,
      "q": "[Q994] In temporal analytics and Islands & Gaps problems, which principle governs consecutive seat clustering via or adjacency?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 995,
      "q": "[Q995] In temporal analytics and Islands & Gaps problems, which principle governs sessionization inactivity cutoff step sums?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 996,
      "q": "[Q996] In temporal analytics and Islands & Gaps problems, which principle governs handling multiple transactions on the same calendar day?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 997,
      "q": "[Q997] In temporal analytics and Islands & Gaps problems, which principle governs min(date) and max(date) interval range consolidation?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 998,
      "q": "[Q998] In temporal analytics and Islands & Gaps problems, which principle governs sequence gap detection via lead(id) - id > 1?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    },
    {
      "id": 999,
      "q": "[Q999] In temporal analytics and Islands & Gaps problems, which principle governs top-k temporal recency ranking with tie-breaking?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": true,
      "trapBadge": "Temporal Gap Trap"
    },
    {
      "id": 1000,
      "q": "[Q1000] In temporal analytics and Islands & Gaps problems, which principle governs day of week pivoting with dayname() and case when?",
      "options": [
        "A constant difference between the sequential row number and the event timestamp uniquely anchors contiguous streaks.",
        "Rows must always be Cartesian cross-joined with a 365-day calendar table before sequence evaluation.",
        "Using GROUP BY date automatically collapses non-contiguous intervals into continuous blocks.",
        "Window functions cannot compute consecutive streaks without iterative stored procedures."
      ],
      "correct": 0,
      "explanation": "The signature invariant of Islands & Gaps is difference-of-ranks: because consecutive dates and sequential integers advance at the same rate, their mathematical difference (DATE_SUB(date, INTERVAL rn DAY)) remains constant throughout an uninterrupted island, and shifts to a new value whenever a gap occurs.",
      "isTrap": false
    }
  ],
  "drills": [
    {
      "id": 901,
      "prompt": "[Drill #901] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 902,
      "prompt": "[Drill #902] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 903,
      "prompt": "[Drill #903] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 904,
      "prompt": "[Drill #904] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 905,
      "prompt": "[Drill #905] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 906,
      "prompt": "[Drill #906] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 907,
      "prompt": "[Drill #907] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 908,
      "prompt": "[Drill #908] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 909,
      "prompt": "[Drill #909] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 910,
      "prompt": "[Drill #910] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 911,
      "prompt": "[Drill #911] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 912,
      "prompt": "[Drill #912] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 913,
      "prompt": "[Drill #913] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 914,
      "prompt": "[Drill #914] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 915,
      "prompt": "[Drill #915] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 916,
      "prompt": "[Drill #916] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 917,
      "prompt": "[Drill #917] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 918,
      "prompt": "[Drill #918] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 919,
      "prompt": "[Drill #919] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 920,
      "prompt": "[Drill #920] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 921,
      "prompt": "[Drill #921] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 922,
      "prompt": "[Drill #922] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 923,
      "prompt": "[Drill #923] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 924,
      "prompt": "[Drill #924] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 925,
      "prompt": "[Drill #925] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 926,
      "prompt": "[Drill #926] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 927,
      "prompt": "[Drill #927] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 928,
      "prompt": "[Drill #928] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 929,
      "prompt": "[Drill #929] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 930,
      "prompt": "[Drill #930] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 931,
      "prompt": "[Drill #931] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 932,
      "prompt": "[Drill #932] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 933,
      "prompt": "[Drill #933] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 934,
      "prompt": "[Drill #934] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 935,
      "prompt": "[Drill #935] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 936,
      "prompt": "[Drill #936] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 937,
      "prompt": "[Drill #937] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 938,
      "prompt": "[Drill #938] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 939,
      "prompt": "[Drill #939] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 940,
      "prompt": "[Drill #940] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 941,
      "prompt": "[Drill #941] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 942,
      "prompt": "[Drill #942] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 943,
      "prompt": "[Drill #943] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 944,
      "prompt": "[Drill #944] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 945,
      "prompt": "[Drill #945] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 946,
      "prompt": "[Drill #946] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 947,
      "prompt": "[Drill #947] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 948,
      "prompt": "[Drill #948] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 949,
      "prompt": "[Drill #949] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 950,
      "prompt": "[Drill #950] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 951,
      "prompt": "[Drill #951] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 952,
      "prompt": "[Drill #952] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 953,
      "prompt": "[Drill #953] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 954,
      "prompt": "[Drill #954] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 955,
      "prompt": "[Drill #955] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 956,
      "prompt": "[Drill #956] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 957,
      "prompt": "[Drill #957] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 958,
      "prompt": "[Drill #958] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 959,
      "prompt": "[Drill #959] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 960,
      "prompt": "[Drill #960] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 961,
      "prompt": "[Drill #961] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 962,
      "prompt": "[Drill #962] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 963,
      "prompt": "[Drill #963] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 964,
      "prompt": "[Drill #964] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 965,
      "prompt": "[Drill #965] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 966,
      "prompt": "[Drill #966] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 967,
      "prompt": "[Drill #967] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 968,
      "prompt": "[Drill #968] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 969,
      "prompt": "[Drill #969] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 970,
      "prompt": "[Drill #970] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 971,
      "prompt": "[Drill #971] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 972,
      "prompt": "[Drill #972] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 973,
      "prompt": "[Drill #973] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 974,
      "prompt": "[Drill #974] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 975,
      "prompt": "[Drill #975] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 976,
      "prompt": "[Drill #976] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 977,
      "prompt": "[Drill #977] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 978,
      "prompt": "[Drill #978] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 979,
      "prompt": "[Drill #979] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 980,
      "prompt": "[Drill #980] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 981,
      "prompt": "[Drill #981] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 982,
      "prompt": "[Drill #982] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 983,
      "prompt": "[Drill #983] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 984,
      "prompt": "[Drill #984] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 985,
      "prompt": "[Drill #985] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 986,
      "prompt": "[Drill #986] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 987,
      "prompt": "[Drill #987] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 988,
      "prompt": "[Drill #988] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 989,
      "prompt": "[Drill #989] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 990,
      "prompt": "[Drill #990] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 991,
      "prompt": "[Drill #991] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 992,
      "prompt": "[Drill #992] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 993,
      "prompt": "[Drill #993] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 994,
      "prompt": "[Drill #994] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 995,
      "prompt": "[Drill #995] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 996,
      "prompt": "[Drill #996] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 997,
      "prompt": "[Drill #997] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 998,
      "prompt": "[Drill #998] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 999,
      "prompt": "[Drill #999] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    },
    {
      "id": 1000,
      "prompt": "[Drill #1000] Write an optimized query to group consecutive active dates into contiguous streaks and return start_date, end_date, and streak_days.",
      "task": "Calculate consecutive streaks using DATE_SUB difference grouping.",
      "starterSQL": "SELECT user_id, event_date FROM UserLogins;",
      "solutionSQL": "WITH Ranked AS (\n  SELECT DISTINCT user_id, event_date,\n    DATE_SUB(event_date, INTERVAL DENSE_RANK() OVER (PARTITION BY user_id ORDER BY event_date) DAY) AS grp\n  FROM UserLogins\n)\nSELECT user_id, MIN(event_date) AS start_date, MAX(event_date) AS end_date, COUNT(*) AS streak_days\nFROM Ranked\nGROUP BY user_id, grp;",
      "hints": [
        "Deduplicate dates first",
        "Use DATE_SUB with DENSE_RANK()",
        "Group by user_id and grp"
      ]
    }
  ],
  "problems": [
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
    }
  ]
};
