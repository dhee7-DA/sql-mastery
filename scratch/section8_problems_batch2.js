// scratch/section8_problems_batch2.js
// Problems 26 to 50 of Concept 8 (LeetCode Premium Core)

function createDiagram(title, leftHeader, leftItems, rightHeader, rightItems, formula) {
  const leftRows = leftItems.map((item, idx) => 
    `<text x="14" y="${42 + idx * 18}" fill="#334155" font-family="monospace" font-size="9.5">${item}</text>`
  ).join('');

  const rightRows = rightItems.map((item, idx) => 
    `<text x="14" y="${42 + idx * 18}" fill="#166534" font-family="monospace" font-size="9.5">${item}</text>`
  ).join('');

  return `<svg viewBox="0 0 880 180" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="15" width="850" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">${title}</text>

    <!-- Source Box -->
    <g transform="translate(35, 52)">
      <rect x="0" y="0" width="280" height="95" rx="6" fill="#f8fafc" stroke="#94a3b8"/>
      <text x="14" y="22" fill="#0f172a" font-family="monospace" font-size="10.5" font-weight="700">${leftHeader}</text>
      ${leftRows}
    </g>

    <!-- Flow Arrow -->
    <path d="M 335 100 L 385 100" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow1378)"/>

    <!-- Transformation / Formula -->
    <g transform="translate(395, 52)">
      <rect x="0" y="0" width="240" height="95" rx="6" fill="#eff6ff" stroke="#3b82f6"/>
      <text x="12" y="24" fill="#1d4ed8" font-family="monospace" font-size="10.5" font-weight="700">Execution Logic</text>
      <text x="12" y="48" fill="#1e40af" font-family="monospace" font-size="9">${formula}</text>
    </g>

    <path d="M 655 100 L 705 100" stroke="#16a34a" stroke-width="2" marker-end="url(#arrow1378)"/>

    <!-- Target Output -->
    <g transform="translate(715, 52)">
      <rect x="0" y="0" width="135" height="95" rx="6" fill="#f0fdf4" stroke="#22c55e"/>
      <text x="12" y="22" fill="#15803d" font-family="monospace" font-size="10.5" font-weight="700">${rightHeader}</text>
      ${rightRows}
    </g>
  </svg>`;
}

const problemsBatch2 = [
  // 26. #1212 Team Scores in Football Tournament
  {
    id: 1212,
    title: "Team Scores in Football Tournament",
    difficulty: "Medium",
    acceptance: "54.1%",
    interviewFreq: "High • Amazon",
    companies: ["Amazon"],
    prompt: `Write a solution to select the team_id, team_name and num_points of each team in the tournament after considering all matches.\nScoring rules:\n- Win: 3 points\n- Draw: 1 point\n- Loss: 0 points\nOrder by num_points DESC, team_name ASC.`,
    sampleInput: { table: "Teams / Matches", columns: ["team_id", "team_name", "host_team", "guest_team", "host_goals", "guest_goals"], rows: [[10, "FCB", 10, 20, 3, 0], [20, "MU", 20, 30, 2, 2], [30, "Arsenal", 30, 40, 1, 2]] },
    expectedOutput: { columns: ["team_id", "team_name", "num_points"], rows: [[10, "FCB", 3], [20, "MU", 1], [30, "Arsenal", 1], [40, "Chelsea", 0]] },
    svgDiagram: createDiagram(
      "LEETCODE #1212: DUAL HOME/AWAY MATCH POINT AGGREGATION",
      "Matches",
      ["10 vs 20: (3 - 0) -> 10 gets 3 pts", "20 vs 30: (2 - 2) -> Both get 1 pt"],
      "Tournament Table",
      ["10: FCB -> 3 pts", "20: MU -> 1 pt", "40: Chelsea -> 0 pts"],
      "CASE WHEN goals > opp THEN 3\\nWHEN goals = opp THEN 1 ELSE 0"
    ),
    logicBreakdown: [
      "A team earns points as host (host_goals vs guest_goals) or as guest (guest_goals vs host_goals).",
      "Unfold matches using UNION ALL to compute points per team.",
      "LEFT JOIN Teams with these points so teams with 0 matches or 0 points are preserved.",
      "Order by num_points DESC, team_name ASC."
    ],
    trapsAndEdgeCases: [
      "Zero points teams: Teams that never played or lost all matches must show 0 points, not NULL."
    ],
    solutionSQL: `WITH MatchPoints AS (
    SELECT host_team AS team_id,
           CASE WHEN host_goals > guest_goals THEN 3 WHEN host_goals = guest_goals THEN 1 ELSE 0 END AS points
    FROM Matches
    UNION ALL
    SELECT guest_team AS team_id,
           CASE WHEN guest_goals > host_goals THEN 3 WHEN guest_goals = host_goals THEN 1 ELSE 0 END AS points
    FROM Matches
)
SELECT t.team_id,
       t.team_name,
       IFNULL(SUM(p.points), 0) AS num_points
FROM Teams t
LEFT JOIN MatchPoints p ON t.team_id = p.team_id
GROUP BY t.team_id, t.team_name
ORDER BY num_points DESC, t.team_name ASC;`,
    lineByLineExplanation: [
      { clause: "WITH MatchPoints AS (...)", exp: "Evaluates points earned from both host and guest perspectives." },
      { clause: "SELECT t.team_id, t.team_name, IFNULL(SUM(p.points), 0) AS num_points", exp: "Left joins with all teams and sums points, defaulting nulls to 0." },
      { clause: "ORDER BY num_points DESC, t.team_name ASC", exp: "Sorts by points descending, breaking ties alphabetically." }
    ],
    alternativeSolutions: [
      {
        name: "Direct Multi-Condition JOIN",
        complexity: "O(T * M)",
        sql: `SELECT t.team_id, t.team_name,
       SUM(CASE WHEN t.team_id = m.host_team AND m.host_goals > m.guest_goals THEN 3
                WHEN t.team_id = m.guest_team AND m.guest_goals > m.host_goals THEN 3
                WHEN (t.team_id = m.host_team OR t.team_id = m.guest_team) AND m.host_goals = m.guest_goals THEN 1
                ELSE 0 END) AS num_points
FROM Teams t LEFT JOIN Matches m ON t.team_id = m.host_team OR t.team_id = m.guest_team
GROUP BY t.team_id, t.team_name ORDER BY num_points DESC, team_name ASC;`,
        explanation: "Conditional join matching either host or guest."
      }
    ]
  },

  // 27. #1225 Report Contiguous Dates
  {
    id: 1225,
    title: "Report Contiguous Dates",
    difficulty: "Hard",
    acceptance: "60.4%",
    interviewFreq: "Very High • Amazon",
    companies: ["Amazon"],
    prompt: `A system is running one task everyday. Every task is either 'failed' or 'succeeded'. Write a solution to generate a report of all intervals of contiguous dates with the same task state between 2019-01-01 and 2019-12-31. Order by start_date.`,
    sampleInput: { table: "Failed / Succeeded", columns: ["fail_date", "success_date"], rows: [["2018-12-28", "2018-12-30"], ["2019-01-04", "2019-01-01"], ["2019-01-05", "2019-01-02"], [null, "2019-01-03"], [null, "2019-01-06"]] },
    expectedOutput: { columns: ["period_state", "start_date", "end_date"], rows: [["succeeded", "2019-01-01", "2019-01-03"], ["failed", "2019-01-04", "2019-01-05"], ["succeeded", "2019-01-06", "2019-01-06"]] },
    svgDiagram: createDiagram(
      "LEETCODE #1225: CONTIGUOUS ISLANDS-AND-GAPS TIME RANGES",
      "Unified Events (2019)",
      ["Jan 1-3: succeeded (3 days)", "Jan 4-5: failed (2 days)", "Jan 6: succeeded (1 day)"],
      "Periods",
      ["succeeded: Jan 1 to Jan 3", "failed: Jan 4 to Jan 5", "succeeded: Jan 6 to Jan 6"],
      "date - ROW_NUMBER() DAY\\nGROUP BY state, anchor_date"
    ),
    logicBreakdown: [
      "Combine Failed and Succeeded events into a single table with state and event_date, filtering for 2019.",
      "Assign ROW_NUMBER() ordered by event_date partitioned by state.",
      "Compute anchor_date = DATE_SUB(event_date, INTERVAL rnk DAY). Consecutive streaks have identical anchor dates!",
      "Group by state and anchor_date, calculating MIN(event_date) as start_date and MAX(event_date) as end_date."
    ],
    trapsAndEdgeCases: [
      "2019 boundary filter: Events outside 2019 must be eliminated prior to ranking, or they alter row numbers."
    ],
    solutionSQL: `WITH AllTasks AS (
    SELECT 'failed' AS period_state, fail_date AS task_date
    FROM Failed
    WHERE fail_date BETWEEN '2019-01-01' AND '2019-12-31'
    UNION ALL
    SELECT 'succeeded' AS period_state, success_date AS task_date
    FROM Succeeded
    WHERE success_date BETWEEN '2019-01-01' AND '2019-12-31'
),
RankedTasks AS (
    SELECT period_state,
           task_date,
           DATE_SUB(task_date, INTERVAL ROW_NUMBER() OVER (
               PARTITION BY period_state
               ORDER BY task_date
           ) DAY) AS grp
    FROM AllTasks
)
SELECT period_state,
       MIN(task_date) AS start_date,
       MAX(task_date) AS end_date
FROM RankedTasks
GROUP BY period_state, grp
ORDER BY start_date ASC;`,
    lineByLineExplanation: [
      { clause: "WITH AllTasks AS (...)", exp: "Merges tasks within 2019." },
      { clause: "RankedTasks AS (SELECT ..., DATE_SUB(task_date, INTERVAL ROW_NUMBER() OVER (...) DAY) AS grp)", exp: "Establishes constant island anchor dates." },
      { clause: "SELECT period_state, MIN(task_date) AS start_date, MAX(task_date) AS end_date GROUP BY period_state, grp", exp: "Folds contiguous dates into start and end bounds." },
      { clause: "ORDER BY start_date ASC", exp: "Sorts intervals chronologically." }
    ],
    alternativeSolutions: [
      {
        name: "LAG() State Change Detection",
        complexity: "O(N log N)",
        sql: `WITH Ranked AS (
  SELECT period_state, task_date,
         IF(LAG(period_state) OVER (ORDER BY task_date) = period_state, 0, 1) AS flag
  FROM AllTasks
), Groups AS (
  SELECT period_state, task_date, SUM(flag) OVER (ORDER BY task_date) AS grp FROM Ranked
)
SELECT period_state, MIN(task_date) AS start_date, MAX(task_date) AS end_date FROM Groups GROUP BY period_state, grp ORDER BY start_date;`,
        explanation: "Detects state transitions using LAG() and accumulates a running group identifier."
      }
    ]
  },

  // 28. #1270 All People Report to the Given Manager
  {
    id: 1270,
    title: "All People Report to the Given Manager",
    difficulty: "Medium",
    acceptance: "85.2%",
    interviewFreq: "High • Google, Amazon",
    companies: ["Google", "Amazon"],
    prompt: `Write a solution to find employee_id of all employees that directly or indirectly report their work to the head of the company (manager_id = 1). The indirect relation is at most 3 managers. Exclude the head of the company itself (employee_id = 1).`,
    sampleInput: { table: "Employees", columns: ["employee_id", "employee_name", "manager_id"], rows: [[1, "Boss", 1], [3, "Alice", 3], [2, "Bob", 1], [4, "Daniel", 2], [7, "Luis", 4], [8, "Jhon", 3], [9, "Angela", 8], [77, "Robert", 1]] },
    expectedOutput: { columns: ["employee_id"], rows: [[2], [77], [4], [7]] },
    svgDiagram: createDiagram(
      "LEETCODE #1270: 3-LEVEL REPORTING HIERARCHY TREE",
      "Organization",
      ["Boss (1) <- 2, 77 (Level 1)", "2 <- 4 (Level 2)", "4 <- 7 (Level 3)"],
      "Subordinates",
      ["2, 77, 4, 7"],
      "e1 -> e2 -> e3\\nWHERE e3.manager_id = 1"
    ),
    logicBreakdown: [
      "Join Employees 3 times (e1 -> e2 -> e3) to trace up to 3 reporting levels.",
      "e1 reports to e2 (e1.manager_id = e2.employee_id).",
      "e2 reports to e3 (e2.manager_id = e3.employee_id).",
      "Filter for e3.manager_id = 1 AND e1.employee_id != 1."
    ],
    trapsAndEdgeCases: [
      "Excluding the CEO: employee_id = 1 reports to themselves (manager_id = 1) and must be excluded."
    ],
    solutionSQL: `SELECT e1.employee_id
FROM Employees e1
JOIN Employees e2 ON e1.manager_id = e2.employee_id
JOIN Employees e3 ON e2.manager_id = e3.employee_id
WHERE e3.manager_id = 1
  AND e1.employee_id != 1;`,
    lineByLineExplanation: [
      { clause: "SELECT e1.employee_id", exp: "Emits qualifying subordinate employee IDs." },
      { clause: "FROM Employees e1 JOIN Employees e2 ON e1.manager_id = e2.employee_id", exp: "First hop to immediate manager." },
      { clause: "JOIN Employees e3 ON e2.manager_id = e3.employee_id", exp: "Second hop to manager's manager." },
      { clause: "WHERE e3.manager_id = 1 AND e1.employee_id != 1", exp: "Ensures top level is the CEO (1) while omitting CEO." }
    ],
    alternativeSolutions: [
      {
        name: "Recursive CTE",
        complexity: "O(V + E)",
        sql: `WITH RECURSIVE Hierarchy AS (
    SELECT employee_id FROM Employees WHERE manager_id = 1 AND employee_id != 1
    UNION ALL
    SELECT e.employee_id FROM Employees e JOIN Hierarchy h ON e.manager_id = h.employee_id
)
SELECT employee_id FROM Hierarchy;`,
        explanation: "Unbounded graph recursion downward from Manager 1."
      }
    ]
  },

  // 29. #1303 Find the Team Size
  {
    id: 1303,
    title: "Find the Team Size",
    difficulty: "Easy",
    acceptance: "89.3%",
    interviewFreq: "High • Amazon",
    companies: ["Amazon"],
    prompt: `Write a solution to find the team size of each of the employees. Return the result table in any order.`,
    sampleInput: { table: "Employee", columns: ["employee_id", "team_id"], rows: [[1, 8], [2, 8], [3, 8], [4, 7], [5, 9], [6, 9]] },
    expectedOutput: { columns: ["employee_id", "team_size"], rows: [[1, 3], [2, 3], [3, 3], [4, 1], [5, 2], [6, 2]] },
    svgDiagram: createDiagram(
      "LEETCODE #1303: WINDOW PARTITION TEAM HEADCOUNT",
      "Employees",
      ["Emp 1, Team 8", "Emp 2, Team 8", "Emp 3, Team 8", "Emp 4, Team 7"],
      "Team Size",
      ["Emp 1 -> Size 3", "Emp 4 -> Size 1"],
      "COUNT(*) OVER (PARTITION BY team_id)"
    ),
    logicBreakdown: [
      "Use window function COUNT(*) OVER (PARTITION BY team_id).",
      "This appends the team count directly to each individual employee row without row collapsing."
    ],
    trapsAndEdgeCases: [
      "Group By row collapsing: Grouping by employee_id, team_id yields 1 for each; must partition over team_id alone."
    ],
    solutionSQL: `SELECT employee_id,
       COUNT(*) OVER (PARTITION BY team_id) AS team_size
FROM Employee;`,
    lineByLineExplanation: [
      { clause: "SELECT employee_id,", exp: "Emits employee identifier." },
      { clause: "COUNT(*) OVER (PARTITION BY team_id) AS team_size", exp: "Computes headcount across employee's department partition." },
      { clause: "FROM Employee", exp: "Source employees table." }
    ],
    alternativeSolutions: [
      {
        name: "JOIN with GROUP BY Subquery",
        complexity: "O(N log N)",
        sql: `SELECT e.employee_id, t.team_size
FROM Employee e
JOIN (
    SELECT team_id, COUNT(*) AS team_size FROM Employee GROUP BY team_id
) t ON e.team_id = t.team_id;`,
        explanation: "Subquery pre-computing team sizes and joining back."
      }
    ]
  },

  // 30. #1308 Running Total for Different Genders
  {
    id: 1308,
    title: "Running Total for Different Genders",
    difficulty: "Medium",
    acceptance: "86.1%",
    interviewFreq: "High • Amazon",
    companies: ["Amazon"],
    prompt: `Write a solution to find the total score for each gender on each day. Return the result table ordered by gender and day in ascending order.`,
    sampleInput: { table: "Scores", columns: ["player_name", "gender", "day", "score_points"], rows: [["Aron", "F", "2020-01-01", 17], ["Alice", "F", "2020-01-07", 23], ["Bajrang", "M", "2020-01-07", 7]] },
    expectedOutput: { columns: ["gender", "day", "total"], rows: [["F", "2020-01-01", 17], ["F", "2020-01-07", 40], ["M", "2020-01-07", 7]] },
    svgDiagram: createDiagram(
      "LEETCODE #1308: CHRONOLOGICAL ACCUMULATOR BY GENDER",
      "Scores",
      ["F (01-01): 17 pts", "F (01-07): 23 pts", "M (01-07): 7 pts"],
      "Running Total",
      ["F (01-01): 17", "F (01-07): 40 (17+23)", "M (01-07): 7"],
      "SUM(score) OVER(PARTITION BY gender\\nORDER BY day)"
    ),
    logicBreakdown: [
      "Use window aggregation SUM(score_points) partitioned by gender and ordered by day.",
      "The window frame continuously accumulates scores up to the current day for that gender.",
      "Order final output by gender ASC, day ASC."
    ],
    trapsAndEdgeCases: [
      "Multiple games per day: Problem guarantees (gender, day) is unique."
    ],
    solutionSQL: `SELECT gender,
       day,
       SUM(score_points) OVER (
           PARTITION BY gender
           ORDER BY day ASC
       ) AS total
FROM Scores
ORDER BY gender ASC, day ASC;`,
    lineByLineExplanation: [
      { clause: "SELECT gender, day,", exp: "Emits gender partition and date." },
      { clause: "SUM(score_points) OVER (PARTITION BY gender ORDER BY day ASC) AS total", exp: "Calculates cumulative score points chronologically per gender." },
      { clause: "FROM Scores ORDER BY gender ASC, day ASC", exp: "Sorts final output." }
    ],
    alternativeSolutions: [
      {
        name: "Self-Join Cumulative Accumulator",
        complexity: "O(N^2)",
        sql: `SELECT s1.gender, s1.day, SUM(s2.score_points) AS total
FROM Scores s1
JOIN Scores s2 ON s1.gender = s2.gender AND s2.day <= s1.day
GROUP BY s1.gender, s1.day
ORDER BY s1.gender, s1.day;`,
        explanation: "Self-join accumulating all preceding rows."
      }
    ]
  },

  // 31. #1336 Number of Transactions per Visit
  {
    id: 1336,
    title: "Number of Transactions per Visit",
    difficulty: "Hard",
    acceptance: "44.2%",
    interviewFreq: "Very High • Twitter, Amazon",
    companies: ["Twitter", "Amazon"],
    prompt: `Write a solution to find how many users visited the bank and solved 0, 1, 2, ... transactions per visit. The result table must include all transaction counts from 0 up to the maximum number of transactions done in one visit, even if there are 0 visits for that count.`,
    sampleInput: { table: "Visits / Transactions", columns: ["user_id", "visit_date", "transaction_date", "amount"], rows: [[1, "2020-01-01", "2020-01-01", 10], [2, "2020-01-02", null, null], [12, "2020-01-01", "2020-01-01", 20], [12, "2020-01-01", "2020-01-01", 30]] },
    expectedOutput: { columns: ["transactions_count", "visits_count"], rows: [[0, 1], [1, 1], [2, 1]] },
    svgDiagram: createDiagram(
      "LEETCODE #1336: COMPLETE ZERO-FILLED TRANSACTION HISTOGRAM",
      "Visits & Trx",
      ["U2: 0 transactions", "U1: 1 transaction", "U12: 2 transactions"],
      "Histogram",
      ["0 trx -> 1 visit", "1 trx -> 1 visit", "2 trx -> 1 visit"],
      "Recursive Seq (0 to MAX)\\nLEFT JOIN VisitCounts"
    ),
    logicBreakdown: [
      "Join Visits to Transactions on user_id AND visit_date = transaction_date to count transactions per visit.",
      "Generate an integer sequence from 0 up to MAX(transactions_count) using a recursive CTE.",
      "LEFT JOIN the sequence with the aggregated visit transaction counts.",
      "Count matching visits per sequence number, coalescing empty bins to 0."
    ],
    trapsAndEdgeCases: [
      "Zero transactions bin: Visits where no transaction was made must be recorded in the '0' transactions bin."
    ],
    solutionSQL: `WITH RECURSIVE VisitTrx AS (
    SELECT v.user_id,
           v.visit_date,
           COUNT(t.transaction_date) AS trx_cnt
    FROM Visits v
    LEFT JOIN Transactions t
      ON v.user_id = t.user_id
     AND v.visit_date = t.transaction_date
    GROUP BY v.user_id, v.visit_date
),
Numbers AS (
    SELECT 0 AS transactions_count
    UNION ALL
    SELECT transactions_count + 1
    FROM Numbers
    WHERE transactions_count < (SELECT IFNULL(MAX(trx_cnt), 0) FROM VisitTrx)
)
SELECT n.transactions_count,
       COUNT(v.user_id) AS visits_count
FROM Numbers n
LEFT JOIN VisitTrx v ON n.transactions_count = v.trx_cnt
GROUP BY n.transactions_count
ORDER BY n.transactions_count ASC;`,
    lineByLineExplanation: [
      { clause: "WITH RECURSIVE VisitTrx AS (...)", exp: "Calculates the transaction count for each distinct bank visit." },
      { clause: "Numbers AS (SELECT 0 ... UNION ALL SELECT n + 1 ...)", exp: "Recursively creates integer scale from 0 to max transactions." },
      { clause: "SELECT n.transactions_count, COUNT(v.user_id) AS visits_count FROM Numbers n LEFT JOIN VisitTrx v ...", exp: "Folds counts into zero-filled frequency histogram." }
    ],
    alternativeSolutions: [
      {
        name: "Row_Number Seed Sequence",
        complexity: "O(Max Count)",
        sql: `WITH Seq AS (SELECT 0 AS transactions_count UNION SELECT ROW_NUMBER() OVER() FROM Transactions) ...`,
        explanation: "Seeds numerical sequence using ROW_NUMBER() over transactions."
      }
    ]
  },

  // 32. #1369 Get the Second Most Recent Activity
  {
    id: 1369,
    title: "Get the Second Most Recent Activity",
    difficulty: "Hard",
    acceptance: "69.1%",
    interviewFreq: "High • Amazon",
    companies: ["Amazon"],
    prompt: `Write a solution to show the second most recent activity of each user. If the user only has one activity, return that one. A user cannot perform more than one activity at the same time.`,
    sampleInput: { table: "UserActivity", columns: ["username", "activity", "startDate", "endDate"], rows: [["Alice", "Travel", "2020-02-12", "2020-02-20"], ["Alice", "Dancing", "2020-02-21", "2020-02-23"], ["Alice", "Travel", "2020-02-24", "2020-02-28"], ["Bob", "Travel", "2020-02-11", "2020-02-18"]] },
    expectedOutput: { columns: ["username", "activity", "startDate", "endDate"], rows: [["Alice", "Dancing", "2020-02-21", "2020-02-23"], ["Bob", "Travel", "2020-02-11", "2020-02-18"]] },
    svgDiagram: createDiagram(
      "LEETCODE #1369: 2ND ACTIVITY WITH SINGLETON FALLBACK",
      "User Activities",
      ["Alice: 3 activities (2nd = Dancing)", "Bob: 1 activity (Fallback to 1st)"],
      "Output",
      ["Alice -> Dancing", "Bob -> Travel"],
      "WHERE rnk = 2 OR (cnt = 1 AND rnk = 1)"
    ),
    logicBreakdown: [
      "Rank activities for each user ordered by startDate DESC using ROW_NUMBER().",
      "Compute the total activities count per user using COUNT(*) OVER (PARTITION BY username).",
      "Filter for rows where rnk = 2 OR (cnt = 1 AND rnk = 1)."
    ],
    trapsAndEdgeCases: [
      "Users with 1 activity: If a user has only 1 activity, rnk = 2 will return empty; must fallback to rnk = 1 when total count = 1."
    ],
    solutionSQL: `WITH RankedActivity AS (
    SELECT username,
           activity,
           startDate,
           endDate,
           ROW_NUMBER() OVER (
               PARTITION BY username
               ORDER BY startDate DESC
           ) AS rnk,
           COUNT(*) OVER (
               PARTITION BY username
           ) AS cnt
    FROM UserActivity
)
SELECT username, activity, startDate, endDate
FROM RankedActivity
WHERE rnk = 2
   OR (cnt = 1 AND rnk = 1);`,
    lineByLineExplanation: [
      { clause: "WITH RankedActivity AS (SELECT ..., ROW_NUMBER() OVER (...) AS rnk, COUNT(*) OVER (...) AS cnt ...)", exp: "Assigns reverse chronological rank and total count per user." },
      { clause: "WHERE rnk = 2 OR (cnt = 1 AND rnk = 1)", exp: "Extracts second most recent activity, falling back to only activity if count is 1." }
    ],
    alternativeSolutions: [
      {
        name: "UNION Multi-Pass",
        complexity: "O(N log N)",
        sql: `SELECT username, activity, startDate, endDate FROM (
  SELECT *, ROW_NUMBER() OVER(PARTITION BY username ORDER BY startDate DESC) AS rnk FROM UserActivity
) t WHERE rnk = 2
UNION ALL
SELECT * FROM UserActivity GROUP BY username HAVING COUNT(*) = 1;`,
        explanation: "Unions exact 2nd rank rows with single-activity users."
      }
    ]
  },

  // 33. #1384 Total Sales Amount by Year
  {
    id: 1384,
    title: "Total Sales Amount by Year",
    difficulty: "Hard",
    acceptance: "61.2%",
    interviewFreq: "Very High • Amazon",
    companies: ["Amazon"],
    prompt: `Write a solution to report the total sales amount of each item for each year, with corresponding product_name, product_id, product_name, report_year and total_amount. Dates range from 2018 to 2020.`,
    sampleInput: { table: "Product / Sales", columns: ["product_id", "period_start", "period_end", "average_daily_spend"], rows: [[1, "2019-01-25", "2019-02-28", 100], [2, "2018-12-01", "2020-01-01", 10]] },
    expectedOutput: { columns: ["product_id", "product_name", "report_year", "total_amount"], rows: [[1, "LC Phone", "2019", 3500], [2, "LC T-Shirt", "2018", 310], [2, "LC T-Shirt", "2019", 3650], [2, "LC T-Shirt", "2020", 10]] },
    svgDiagram: createDiagram(
      "LEETCODE #1384: MULTI-YEAR DATE OVERLAP SALES SPLITTING",
      "Sales Periods",
      ["Item 2: 2018-12-01 to 2020-01-01 ($10/day)", "Spans 2018, 2019, 2020!"],
      "Annualized Split",
      ["2018: 31 days x $10 = $310", "2019: 365 days x $10 = $3650", "2020: 1 day x $10 = $10"],
      "(DATEDIFF(LEAST(end, yr_end), GREATEST(start, yr_start)) + 1) * rate"
    ),
    logicBreakdown: [
      "Generate years 2018, 2019, 2020 using a calendar CTE with year start and end bounds.",
      "Cross join or join Sales where period_start <= year_end AND period_end >= year_start.",
      "Days active in year = DATEDIFF(LEAST(period_end, year_end), GREATEST(period_start, year_start)) + 1.",
      "Multiply days by average_daily_spend.",
      "Order by product_id, report_year."
    ],
    trapsAndEdgeCases: [
      "Inclusive date difference: DATEDIFF('2019-01-02', '2019-01-01') is 1, but both days were active; must add + 1."
    ],
    solutionSQL: `WITH RECURSIVE Years AS (
    SELECT '2018' AS report_year, '2018-01-01' AS yr_start, '2018-12-31' AS yr_end
    UNION ALL
    SELECT '2019', '2019-01-01', '2019-12-31'
    UNION ALL
    SELECT '2020', '2020-01-01', '2020-12-31'
)
SELECT s.product_id,
       p.product_name,
       y.report_year,
       (DATEDIFF(LEAST(s.period_end, y.yr_end), GREATEST(s.period_start, y.yr_start)) + 1) * s.average_daily_spend AS total_amount
FROM Sales s
JOIN Product p ON s.product_id = p.product_id
JOIN Years y
  ON s.period_start <= y.yr_end
 AND s.period_end >= y.yr_start
ORDER BY s.product_id ASC, y.report_year ASC;`,
    lineByLineExplanation: [
      { clause: "WITH RECURSIVE Years AS (...)", exp: "Constructs calendar year boundaries for 2018, 2019, 2020." },
      { clause: "JOIN Years y ON s.period_start <= y.yr_end AND s.period_end >= y.yr_start", exp: "Matches overlapping years." },
      { clause: "(DATEDIFF(LEAST(...), GREATEST(...)) + 1) * s.average_daily_spend AS total_amount", exp: "Calculates exact days of overlap in the year times daily spend." },
      { clause: "ORDER BY s.product_id ASC, y.report_year ASC", exp: "Sorts by product and chronological year." }
    ],
    alternativeSolutions: [
      {
        name: "UNION ALL Static Year Clauses",
        complexity: "O(S * 3)",
        sql: `SELECT product_id, product_name, '2018' AS report_year, ... WHERE period_start <= '2018-12-31' AND period_end >= '2018-01-01' UNION ALL ...;`,
        explanation: "Manual expansion of 3 separate year projection blocks."
      }
    ]
  },

  // 34. #1398 Customers Who Bought Products A and B but Not C
  {
    id: 1398,
    title: "Customers Who Bought Products A and B but Not C",
    difficulty: "Medium",
    acceptance: "77.5%",
    interviewFreq: "High • Amazon",
    companies: ["Amazon"],
    prompt: `Write a solution to report the customer_id and customer_name of customers who bought products "A", "B" but did not buy the product "C". Order by customer_id.`,
    sampleInput: { table: "Customers / Orders", columns: ["customer_id", "customer_name", "product_name"], rows: [[1, "Daniel", "A"], [1, "Daniel", "B"], [2, "Diana", "A"], [3, "Elizabeth", "A"], [3, "Elizabeth", "B"], [3, "Elizabeth", "C"]] },
    expectedOutput: { columns: ["customer_id", "customer_name"], rows: [[1, "Daniel"]] },
    svgDiagram: createDiagram(
      "LEETCODE #1398: SET CONSTRAINTS: HAS A, HAS B, NO C",
      "Customers",
      ["Daniel: A, B (Valid ✓)", "Diana: A (No B ❌)", "Elizabeth: A, B, C (Has C ❌)"],
      "Emitted",
      ["customer_id: 1, Daniel"],
      "HAVING SUM(p='A')>0 AND\\nSUM(p='B')>0 AND SUM(p='C')=0"
    ),
    logicBreakdown: [
      "Join Customers with Orders.",
      "Group by customer_id, customer_name.",
      "HAVING SUM(product_name = 'A') > 0 AND SUM(product_name = 'B') > 0 AND SUM(product_name = 'C') = 0.",
      "Order by customer_id ASC."
    ],
    trapsAndEdgeCases: [
      "Partial matches: Customers who bought A and B and also C must be strictly excluded."
    ],
    solutionSQL: `SELECT c.customer_id, c.customer_name
FROM Customers c
JOIN Orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
HAVING SUM(o.product_name = 'A') > 0
   AND SUM(o.product_name = 'B') > 0
   AND SUM(o.product_name = 'C') = 0
ORDER BY c.customer_id ASC;`,
    lineByLineExplanation: [
      { clause: "SELECT c.customer_id, c.customer_name", exp: "Projects customer credentials." },
      { clause: "FROM Customers c JOIN Orders o ON c.customer_id = o.customer_id", exp: "Joins customer records with order items." },
      { clause: "GROUP BY c.customer_id, c.customer_name", exp: "Aggregates per customer." },
      { clause: "HAVING SUM(o.product_name = 'A') > 0 AND SUM(o.product_name = 'B') > 0 AND SUM(o.product_name = 'C') = 0", exp: "Demands presence of A and B, and total absence of C." }
    ],
    alternativeSolutions: [
      {
        name: "Subquery IN / NOT IN",
        complexity: "O(N log N)",
        sql: `SELECT customer_id, customer_name FROM Customers
WHERE customer_id IN (SELECT customer_id FROM Orders WHERE product_name = 'A')
  AND customer_id IN (SELECT customer_id FROM Orders WHERE product_name = 'B')
  AND customer_id NOT IN (SELECT customer_id FROM Orders WHERE product_name = 'C')
ORDER BY customer_id;`,
        explanation: "Set intersection and difference via IN and NOT IN."
      }
    ]
  },

  // 35. #1412 Find the Quiet Students in All Exams
  {
    id: 1412,
    title: "Find the Quiet Students in All Exams",
    difficulty: "Hard",
    acceptance: "63.2%",
    interviewFreq: "High • Amazon",
    companies: ["Amazon"],
    prompt: `A quiet student is the one who took at least one exam and did not score the high score or the low score in any exam they took. Write a solution to report the student_id and student_name of quiet students. Order by student_id.`,
    sampleInput: { table: "Student / Exam", columns: ["student_id", "student_name", "exam_id", "score"], rows: [[1, "Daniel", 10, 70], [1, "Daniel", 20, 80], [2, "Jade", 10, 90], [3, "Tom", 10, 60]] },
    expectedOutput: { columns: ["student_id", "student_name"], rows: [[1, "Daniel"]] },
    svgDiagram: createDiagram(
      "LEETCODE #1412: EXTREME EXAM OUTLIER EXCLUSION",
      "Exam 10 Scores",
      ["Jade: 90 (High ❌)", "Daniel: 70 (Middle ✓)", "Tom: 60 (Low ❌)"],
      "Quiet Students",
      ["student_id: 1, Daniel"],
      "score != MIN(score) AND\\nscore != MAX(score) in all exams"
    ),
    logicBreakdown: [
      "For each exam, compute the minimum and maximum score: MIN(score) OVER (PARTITION BY exam_id) and MAX(score) OVER (PARTITION BY exam_id).",
      "Identify students who scored either the min or max score in ANY exam: score = min_score OR score = max_score.",
      "Filter for students who took at least one exam AND are NOT in the outlier set.",
      "Order by student_id ASC."
    ],
    trapsAndEdgeCases: [
      "Zero exams taken: Students who took 0 exams must NOT be reported as quiet students."
    ],
    solutionSQL: `WITH ExamBounds AS (
    SELECT student_id,
           score,
           MIN(score) OVER (PARTITION BY exam_id) AS min_score,
           MAX(score) OVER (PARTITION BY exam_id) AS max_score
    FROM Exam
),
NoisyStudents AS (
    SELECT DISTINCT student_id
    FROM ExamBounds
    WHERE score = min_score OR score = max_score
)
SELECT s.student_id, s.student_name
FROM Student s
WHERE s.student_id IN (SELECT student_id FROM Exam)
  AND s.student_id NOT IN (SELECT student_id FROM NoisyStudents)
ORDER BY s.student_id ASC;`,
    lineByLineExplanation: [
      { clause: "WITH ExamBounds AS (...)", exp: "Computes min and max score per exam partition." },
      { clause: "NoisyStudents AS (...)", exp: "Isolates students who hit the lowest or highest mark in any exam." },
      { clause: "WHERE s.student_id IN (SELECT student_id FROM Exam) AND s.student_id NOT IN (SELECT student_id FROM NoisyStudents)", exp: "Restricts to students with >=1 exam who were never noisy." },
      { clause: "ORDER BY s.student_id ASC", exp: "Sorts by student ID." }
    ],
    alternativeSolutions: [
      {
        name: "DENSE_RANK Window Filtering",
        complexity: "O(N log N)",
        sql: `WITH Ranked AS (
  SELECT student_id,
         DENSE_RANK() OVER(PARTITION BY exam_id ORDER BY score ASC) AS rnk_low,
         DENSE_RANK() OVER(PARTITION BY exam_id ORDER BY score DESC) AS rnk_high
  FROM Exam
)
SELECT student_id, student_name FROM Student WHERE student_id IN (SELECT student_id FROM Exam)
AND student_id NOT IN (SELECT student_id FROM Ranked WHERE rnk_low = 1 OR rnk_high = 1)
ORDER BY student_id;`,
        explanation: "Uses ascending and descending dense rank to flag rank 1 performers."
      }
    ]
  },

  // 36. #1440 Evaluate Boolean Expression
  {
    id: 1440,
    title: "Evaluate Boolean Expression",
    difficulty: "Medium",
    acceptance: "75.4%",
    interviewFreq: "High • Amazon",
    companies: ["Amazon"],
    prompt: `Write a solution to evaluate the boolean expressions in Expressions table. Return the result table with left_operand, operator, right_operand, and value ('true' or 'false').`,
    sampleInput: { table: "Variables / Expressions", columns: ["name", "value", "left_operand", "operator", "right_operand"], rows: [["x", 66], ["y", 77], ["x", ">", "y"], ["x", "<", "y"], ["x", "=", "x"]] },
    expectedOutput: { columns: ["left_operand", "operator", "right_operand", "value"], rows: [["x", ">", "y", "false"], ["x", "<", "y", "true"], ["x", "=", "x", "true"]] },
    svgDiagram: createDiagram(
      "LEETCODE #1440: RELATIONAL DYNAMIC BOOLEAN EVALUATION",
      "Variables & Expr",
      ["x=66, y=77", "x > y (66 > 77)", "x < y (66 < 77)", "x = x (66 = 66)"],
      "Evaluated",
      ["x > y: false", "x < y: true", "x = x: true"],
      "CASE WHEN op='>' AND l.val > r.val THEN 'true'..."
    ),
    logicBreakdown: [
      "Join Expressions with Variables twice: once for left_operand (l) and once for right_operand (r).",
      "Use CASE WHEN to evaluate each operator:",
      "WHEN operator = '>' AND l.value > r.value THEN 'true'",
      "WHEN operator = '<' AND l.value < r.value THEN 'true'",
      "WHEN operator = '=' AND l.value = r.value THEN 'true'",
      "ELSE 'false'."
    ],
    trapsAndEdgeCases: [
      "String booleans: Output must be lowercase string 'true' or 'false', not 1/0."
    ],
    solutionSQL: `SELECT e.left_operand,
       e.operator,
       e.right_operand,
       CASE
           WHEN e.operator = '>' AND l.value > r.value THEN 'true'
           WHEN e.operator = '<' AND l.value < r.value THEN 'true'
           WHEN e.operator = '=' AND l.value = r.value THEN 'true'
           ELSE 'false'
       END AS value
FROM Expressions e
JOIN Variables l ON e.left_operand = l.name
JOIN Variables r ON e.right_operand = r.name;`,
    lineByLineExplanation: [
      { clause: "SELECT e.left_operand, e.operator, e.right_operand,", exp: "Projects expression tokens." },
      { clause: "CASE WHEN e.operator = '>' AND l.value > r.value THEN 'true' ... ELSE 'false' END AS value", exp: "Evaluates boolean logic based on mapped operand values." },
      { clause: "FROM Expressions e JOIN Variables l ON e.left_operand = l.name JOIN Variables r ON e.right_operand = r.name", exp: "Joins variable table twice for both operand values." }
    ],
    alternativeSolutions: [
      {
        name: "IF Condition Chain",
        complexity: "O(N)",
        sql: `SELECT e.left_operand, e.operator, e.right_operand,
       IF((operator = '>' AND l.value > r.value) OR
          (operator = '<' AND l.value < r.value) OR
          (operator = '=' AND l.value = r.value), 'true', 'false') AS value
FROM Expressions e JOIN Variables l ON e.left_operand = l.name JOIN Variables r ON e.right_operand = r.name;`,
        explanation: "Compact IF evaluation chain."
      }
    ]
  },

  // 37. #1445 Apples & Oranges
  {
    id: 1445,
    title: "Apples & Oranges",
    difficulty: "Medium",
    acceptance: "88.2%",
    interviewFreq: "High • Amazon",
    companies: ["Amazon"],
    prompt: `Write a solution to report the difference between the number of apples and oranges sold each day. Return the result table ordered by sale_date.`,
    sampleInput: { table: "Sales", columns: ["sale_date", "fruit", "sold_num"], rows: [["2020-05-01", "apples", 10], ["2020-05-01", "oranges", 8], ["2020-05-02", "apples", 15], ["2020-05-02", "oranges", 15]] },
    expectedOutput: { columns: ["sale_date", "diff"], rows: [["2020-05-01", 2], ["2020-05-02", 0]] },
    svgDiagram: createDiagram(
      "LEETCODE #1445: DAILY FRUIT DIFFERENCE PIVOT",
      "Daily Sales",
      ["May 01: Apples 10, Oranges 8", "May 02: Apples 15, Oranges 15"],
      "Difference",
      ["May 01: diff = 2 (10-8)", "May 02: diff = 0 (15-15)"],
      "SUM(CASE WHEN fruit='apples'\\nTHEN sold_num ELSE -sold_num END)"
    ),
    logicBreakdown: [
      "Group sales by sale_date.",
      "Apply signed conditional aggregation:",
      "SUM(CASE WHEN fruit = 'apples' THEN sold_num ELSE -sold_num END) AS diff.",
      "Order by sale_date ASC."
    ],
    trapsAndEdgeCases: [
      "Negative differences: If more oranges than apples are sold, the difference can be negative."
    ],
    solutionSQL: `SELECT sale_date,
       SUM(CASE WHEN fruit = 'apples' THEN sold_num ELSE -sold_num END) AS diff
FROM Sales
GROUP BY sale_date
ORDER BY sale_date ASC;`,
    lineByLineExplanation: [
      { clause: "SELECT sale_date,", exp: "Emits transaction date." },
      { clause: "SUM(CASE WHEN fruit = 'apples' THEN sold_num ELSE -sold_num END) AS diff", exp: "Adds apples, subtracts oranges." },
      { clause: "FROM Sales GROUP BY sale_date ORDER BY sale_date ASC", exp: "Groups per date and orders chronologically." }
    ],
    alternativeSolutions: [
      {
        name: "Self-Join Difference",
        complexity: "O(N log N)",
        sql: `SELECT a.sale_date, (a.sold_num - o.sold_num) AS diff
FROM Sales a
JOIN Sales o ON a.sale_date = o.sale_date AND a.fruit = 'apples' AND o.fruit = 'oranges'
ORDER BY a.sale_date;`,
        explanation: "Self-joins apples record with oranges record on the same date."
      }
    ]
  },

  // 38. #1454 Active Users
  {
    id: 1454,
    title: "Active Users",
    difficulty: "Medium",
    acceptance: "40.9%",
    interviewFreq: "Very High • Amazon, Adobe",
    companies: ["Amazon", "Adobe"],
    prompt: `Active users are those who logged in to their accounts for five or more consecutive days. Write a solution to find the id and the name of active users. Return the result table ordered by id.`,
    sampleInput: { table: "Accounts / Logins", columns: ["id", "name", "login_date"], rows: [[1, "Winston", "2020-05-30"], [1, "Winston", "2020-05-31"], [1, "Winston", "2020-06-01"], [1, "Winston", "2020-06-02"], [1, "Winston", "2020-06-03"]] },
    expectedOutput: { columns: ["id", "name"], rows: [[1, "Winston"]] },
    svgDiagram: createDiagram(
      "LEETCODE #1454: 5 CONSECUTIVE DAYS ACTIVE STREAK",
      "Winston Logins",
      ["May 30, May 31, Jun 01", "Jun 02, Jun 03 (5 consecutive days!)"],
      "Active User",
      ["id: 1, Winston"],
      "login_date - ROW_NUMBER()\\nHAVING COUNT(*) >= 5"
    ),
    logicBreakdown: [
      "Deduplicate logins first using SELECT DISTINCT id, login_date (users might log in multiple times a day).",
      "Assign ROW_NUMBER() ordered by login_date partitioned by id.",
      "Calculate island anchor: DATE_SUB(login_date, INTERVAL rnk DAY).",
      "Group by id, anchor and filter HAVING COUNT(*) >= 5.",
      "Join to Accounts to return distinct id and name, ordered by id."
    ],
    trapsAndEdgeCases: [
      "Multiple logins on same day: Failure to DISTINCT prior to ranking breaks the streak sequence."
    ],
    solutionSQL: `WITH DistinctLogins AS (
    SELECT DISTINCT id, login_date
    FROM Logins
),
Streaks AS (
    SELECT id,
           login_date,
           DATE_SUB(login_date, INTERVAL ROW_NUMBER() OVER (
               PARTITION BY id
               ORDER BY login_date
           ) DAY) AS grp
    FROM DistinctLogins
),
ActiveIDs AS (
    SELECT id
    FROM Streaks
    GROUP BY id, grp
    HAVING COUNT(*) >= 5
)
SELECT DISTINCT a.id, a.name
FROM Accounts a
JOIN ActiveIDs act ON a.id = act.id
ORDER BY a.id ASC;`,
    lineByLineExplanation: [
      { clause: "WITH DistinctLogins AS (SELECT DISTINCT id, login_date FROM Logins)", exp: "Deduplicates multiple daily logins." },
      { clause: "Streaks AS (SELECT ..., DATE_SUB(login_date, INTERVAL ROW_NUMBER() OVER (...) DAY) AS grp)", exp: "Applies Islands-and-Gaps date anchor grouping." },
      { clause: "ActiveIDs AS (SELECT id FROM Streaks GROUP BY id, grp HAVING COUNT(*) >= 5)", exp: "Filters streaks spanning 5+ continuous days." },
      { clause: "SELECT DISTINCT a.id, a.name FROM Accounts a JOIN ActiveIDs act ON a.id = act.id ORDER BY a.id ASC", exp: "Joins accounts to display user names ordered by ID." }
    ],
    alternativeSolutions: [
      {
        name: "LEAD(..., 4) Window Approach",
        complexity: "O(N log N)",
        sql: `WITH DistinctLogins AS (SELECT DISTINCT id, login_date FROM Logins)
SELECT DISTINCT a.id, a.name
FROM Accounts a
JOIN (
  SELECT id, login_date, LEAD(login_date, 4) OVER(PARTITION BY id ORDER BY login_date) AS lead4
  FROM DistinctLogins
) t ON a.id = t.id AND DATEDIFF(t.lead4, t.login_date) = 4
ORDER BY a.id;`,
        explanation: "Checks if the 4th succeeding row is exactly 4 calendar days ahead."
      }
    ]
  },

  // 39. #1459 Rectangles Area
  {
    id: 1459,
    title: "Rectangles Area",
    difficulty: "Medium",
    acceptance: "69.8%",
    interviewFreq: "High • Amazon",
    companies: ["Amazon"],
    prompt: `Write a solution to report all possible rectangles that can be formed by any two points in the Points table. Two points can form a rectangle if they do not share the same x-coordinate or the same y-coordinate. Calculate area = |x1 - x2| * |y1 - y2|. Order by area DESC, p1 ASC, p2 ASC.`,
    sampleInput: { table: "Points", columns: ["id", "x_value", "y_value"], rows: [[1, 2, 8], [2, 4, 7], [3, 2, 10]] },
    expectedOutput: { columns: ["p1", "p2", "area"], rows: [[2, 3, 6], [1, 2, 2]] },
    svgDiagram: createDiagram(
      "LEETCODE #1459: 2D RECTANGLE AREA FROM CORNER POINTS",
      "Points",
      ["P1: (2, 8)", "P2: (4, 7)", "P3: (2, 10)"],
      "Rectangles",
      ["P2 & P3: Area = |4-2|*|7-10| = 6", "P1 & P2: Area = |2-4|*|8-7| = 2"],
      "ABS(p1.x - p2.x) * ABS(p1.y - p2.y) > 0\\nWHERE p1.id < p2.id"
    ),
    logicBreakdown: [
      "Join Points to itself on p1.id < p2.id to ensure each pair is evaluated once and avoid self-pairs.",
      "Filter for non-degenerate rectangles: p1.x_value != p2.x_value AND p1.y_value != p2.y_value (area > 0).",
      "Area = ABS(p1.x_value - p2.x_value) * ABS(p1.y_value - p2.y_value).",
      "Order by area DESC, p1 ASC, p2 ASC."
    ],
    trapsAndEdgeCases: [
      "Collinear points: Points sharing an x or y coordinate form a line with area 0; must be filtered out."
    ],
    solutionSQL: `SELECT p1.id AS p1,
       p2.id AS p2,
       ABS(p1.x_value - p2.x_value) * ABS(p1.y_value - p2.y_value) AS area
FROM Points p1
JOIN Points p2
  ON p1.id < p2.id
 AND p1.x_value != p2.x_value
 AND p1.y_value != p2.y_value
ORDER BY area DESC, p1 ASC, p2 ASC;`,
    lineByLineExplanation: [
      { clause: "SELECT p1.id AS p1, p2.id AS p2,", exp: "Emits distinct corner pair IDs." },
      { clause: "ABS(p1.x_value - p2.x_value) * ABS(p1.y_value - p2.y_value) AS area", exp: "Computes rectangle area." },
      { clause: "FROM Points p1 JOIN Points p2 ON p1.id < p2.id AND p1.x_value != p2.x_value AND p1.y_value != p2.y_value", exp: "Joins distinct points with non-zero dimensions." },
      { clause: "ORDER BY area DESC, p1 ASC, p2 ASC", exp: "Orders by area descending, breaking ties by IDs." }
    ],
    alternativeSolutions: [
      {
        name: "WHERE Area > 0 Filter",
        complexity: "O(N^2)",
        sql: `SELECT p1.id AS p1, p2.id AS p2, (ABS(p1.x_value - p2.x_value) * ABS(p1.y_value - p2.y_value)) AS area
FROM Points p1 JOIN Points p2 ON p1.id < p2.id
WHERE ABS(p1.x_value - p2.x_value) * ABS(p1.y_value - p2.y_value) > 0
ORDER BY area DESC, p1, p2;`,
        explanation: "Equivalent filtering checking area product directly."
      }
    ]
  },

  // 40. #1468 Calculate Salaries
  {
    id: 1468,
    title: "Calculate Salaries",
    difficulty: "Medium",
    acceptance: "81.6%",
    interviewFreq: "High • Amazon",
    companies: ["Amazon"],
    prompt: `Write a solution to find the salaries of the employees after applying taxes. Taxes are calculated based on the maximum salary in each company:\n- 0% tax if max salary < $1,000\n- 24% tax if max salary between $1,000 and $10,000 inclusive\n- 49% tax if max salary > $10,000\nRound salaries to the nearest integer.`,
    sampleInput: { table: "Salaries", columns: ["company_id", "employee_id", "employee_name", "salary"], rows: [[1, 1, "Tony", 2000], [1, 2, "Pronub", 21300], [2, 1, "Boch Ticket", 700]] },
    expectedOutput: { columns: ["company_id", "employee_id", "employee_name", "salary"], rows: [[1, 1, "Tony", 1020], [1, 2, "Pronub", 10863], [2, 1, "Boch Ticket", 700]] },
    svgDiagram: createDiagram(
      "LEETCODE #1468: COMPANY MAX SALARY TAX TIER ROUNDING",
      "Company Max Tiers",
      ["Co 1 Max: $21,300 (> 10k -> 49% tax)", "Co 2 Max: $700 (< 1k -> 0% tax)"],
      "Net Salary",
      ["Tony: 2000 * 0.51 = 1020", "Boch: 700 * 1.00 = 700"],
      "ROUND(salary * (1 - tax_rate))"
    ),
    logicBreakdown: [
      "Compute max salary per company: MAX(salary) OVER (PARTITION BY company_id).",
      "Determine tax multiplier via CASE WHEN on max_salary:",
      "WHEN max_salary < 1000 THEN 1.0",
      "WHEN max_salary <= 10000 THEN 0.76 (1 - 0.24)",
      "ELSE 0.51 (1 - 0.49).",
      "Multiply salary by multiplier and ROUND() to nearest integer."
    ],
    trapsAndEdgeCases: [
      "Tax tier bounds: $1,000 and $10,000 are inclusive in the 24% bracket."
    ],
    solutionSQL: `WITH CompanyMax AS (
    SELECT company_id,
           employee_id,
           employee_name,
           salary,
           MAX(salary) OVER (PARTITION BY company_id) AS max_sal
    FROM Salaries
)
SELECT company_id,
       employee_id,
       employee_name,
       ROUND(
           CASE
               WHEN max_sal < 1000 THEN salary
               WHEN max_sal <= 10000 THEN salary * 0.76
               ELSE salary * 0.51
           END
       ) AS salary
FROM CompanyMax;`,
    lineByLineExplanation: [
      { clause: "WITH CompanyMax AS (SELECT ..., MAX(salary) OVER (PARTITION BY company_id) AS max_sal FROM Salaries)", exp: "Appends company max salary to every employee row." },
      { clause: "ROUND(CASE WHEN max_sal < 1000 THEN salary ... END) AS salary", exp: "Applies tax rate deduction and rounds to nearest whole integer." }
    ],
    alternativeSolutions: [
      {
        name: "JOIN with GROUP BY Max Table",
        complexity: "O(N log N)",
        sql: `SELECT s.company_id, s.employee_id, s.employee_name,
       ROUND(CASE WHEN m.max_s < 1000 THEN s.salary WHEN m.max_s <= 10000 THEN s.salary * 0.76 ELSE s.salary * 0.51 END) AS salary
FROM Salaries s JOIN (SELECT company_id, MAX(salary) AS max_s FROM Salaries GROUP BY company_id) m ON s.company_id = m.company_id;`,
        explanation: "Subquery join computing company max salaries."
      }
    ]
  },

  // 41. #1479 Sales by Day of the Week
  {
    id: 1479,
    title: "Sales by Day of the Week",
    difficulty: "Hard",
    acceptance: "78.4%",
    interviewFreq: "High • Amazon",
    companies: ["Amazon"],
    prompt: `Write a solution to report how many units in each item category have been ordered on each day of the week. Return the result table ordered by category.`,
    sampleInput: { table: "Orders / Items", columns: ["item_id", "order_date", "quantity", "item_category"], rows: [[1, "2020-06-01", 10, "Book"], [1, "2020-06-08", 10, "Book"], [2, "2020-06-02", 5, "Phone"]] },
    expectedOutput: { columns: ["category", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], rows: [["Book", 20, 0, 0, 0, 0, 0, 0], ["Phone", 0, 5, 0, 0, 0, 0, 0]] },
    svgDiagram: createDiagram(
      "LEETCODE #1479: DYNAMIC 7-DAY WEEKDAY CROSS-TAB PIVOT",
      "Orders",
      ["Book: June 01 (Mon, qty 10)", "Book: June 08 (Mon, qty 10)", "Phone: June 02 (Tue, qty 5)"],
      "Pivoted Table",
      ["Book: Mon=20, Tue=0...", "Phone: Mon=0, Tue=5..."],
      "SUM(IF(DAYOFWEEK(d)=2, qty, 0)) AS Monday..."
    ),
    logicBreakdown: [
      "Every distinct item_category in Items must appear in the output, even if it has 0 orders (RIGHT/LEFT JOIN Items).",
      "Extract day of week: DAYNAME(order_date) or DAYOFWEEK(order_date).",
      "In MySQL, DAYOFWEEK returns 1 for Sunday, 2 for Monday, ..., 7 for Saturday.",
      "Conditionally sum quantity for each day: SUM(IF(DAYOFWEEK(o.order_date) = 2, o.quantity, 0)) AS Monday.",
      "Order by category ASC."
    ],
    trapsAndEdgeCases: [
      "Zero-order categories: Must RIGHT JOIN Items or start FROM Items with LEFT JOIN Orders so categories with 0 orders are preserved."
    ],
    solutionSQL: `SELECT i.item_category AS Category,
       SUM(IF(DAYNAME(o.order_date) = 'Monday', o.quantity, 0)) AS Monday,
       SUM(IF(DAYNAME(o.order_date) = 'Tuesday', o.quantity, 0)) AS Tuesday,
       SUM(IF(DAYNAME(o.order_date) = 'Wednesday', o.quantity, 0)) AS Wednesday,
       SUM(IF(DAYNAME(o.order_date) = 'Thursday', o.quantity, 0)) AS Thursday,
       SUM(IF(DAYNAME(o.order_date) = 'Friday', o.quantity, 0)) AS Friday,
       SUM(IF(DAYNAME(o.order_date) = 'Saturday', o.quantity, 0)) AS Saturday,
       SUM(IF(DAYNAME(o.order_date) = 'Sunday', o.quantity, 0)) AS Sunday
FROM Items i
LEFT JOIN Orders o ON i.item_id = o.item_id
GROUP BY i.item_category
ORDER BY Category ASC;`,
    lineByLineExplanation: [
      { clause: "SELECT i.item_category AS Category,", exp: "Emits product category." },
      { clause: "SUM(IF(DAYNAME(o.order_date) = 'Monday', o.quantity, 0)) AS Monday ...", exp: "Pivots quantities into distinct weekday column sums." },
      { clause: "FROM Items i LEFT JOIN Orders o ON i.item_id = o.item_id", exp: "Left joins to preserve categories with zero orders." },
      { clause: "GROUP BY i.item_category ORDER BY Category ASC", exp: "Groups and sorts alphabetically." }
    ],
    alternativeSolutions: [
      {
        name: "DAYOFWEEK Numeric Indexing",
        complexity: "O(N log N)",
        sql: `SELECT i.item_category AS Category,
       SUM(IF(DAYOFWEEK(o.order_date)=2, o.quantity, 0)) AS Monday,
       SUM(IF(DAYOFWEEK(o.order_date)=3, o.quantity, 0)) AS Tuesday,
       ...
FROM Items i LEFT JOIN Orders o ON i.item_id = o.item_id GROUP BY 1 ORDER BY 1;`,
        explanation: "Numeric day indices (2=Monday to 7=Saturday, 1=Sunday)."
      }
    ]
  },

  // 42. #1501 Countries You Can Safely Invest In
  {
    id: 1501,
    title: "Countries You Can Safely Invest In",
    difficulty: "Medium",
    acceptance: "52.8%",
    interviewFreq: "High • Amazon",
    companies: ["Amazon"],
    prompt: `A telecommunications company wants to invest in new countries. The country has to have an average call duration strictly greater than the global average call duration. Write a solution to find the countries where this condition is met. Return the result table in any order.`,
    sampleInput: { table: "Person / Country / Calls", columns: ["id", "name", "phone_number", "country_code", "caller_id", "callee_id", "duration"], rows: [[3, "Jonathan", "051-1234567", "051", 3, 12, 33], [12, "Elvis", "051-7654321", "051", 1, 2, 59], [1, "Bob", "033-1111111", "033", 2, 7, 102]] },
    expectedOutput: { columns: ["country"], rows: [["Peru"]] },
    svgDiagram: createDiagram(
      "LEETCODE #1501: COUNTRY CALL DURATION VS GLOBAL MEAN",
      "Calls",
      ["Caller 3 (051) -> Callee 12 (051): 33 min", "Global Avg: 54.7 min"],
      "Investment Target",
      ["country: Peru (Avg > Global)"],
      "AVG(duration) > (SELECT AVG(duration) FROM Calls)"
    ),
    logicBreakdown: [
      "Every call has two participants: caller_id and callee_id, both accumulating duration for their respective country.",
      "Unfold calls using UNION ALL: SELECT caller_id AS person_id, duration FROM Calls UNION ALL SELECT callee_id, duration FROM Calls.",
      "Join person_id to Person, extract the 3-digit country code (SUBSTRING(phone_number, 1, 3)), and join to Country.",
      "HAVING AVG(duration) > (SELECT AVG(duration) FROM Calls)."
    ],
    trapsAndEdgeCases: [
      "Bidirectional participant trap: Counting only caller_id ignores half the telephone traffic; must include callee_id."
    ],
    solutionSQL: `WITH AllCallers AS (
    SELECT caller_id AS person_id, duration FROM Calls
    UNION ALL
    SELECT callee_id AS person_id, duration FROM Calls
)
SELECT c.name AS country
FROM Country c
JOIN Person p ON c.country_code = SUBSTRING(p.phone_number, 1, 3)
JOIN AllCallers ac ON p.id = ac.person_id
GROUP BY c.name
HAVING AVG(ac.duration) > (SELECT AVG(duration) FROM Calls);`,
    lineByLineExplanation: [
      { clause: "WITH AllCallers AS (SELECT caller_id AS person_id ... UNION ALL SELECT callee_id ...)", exp: "Normalizes calls from both caller and receiver perspectives." },
      { clause: "JOIN Person p ON c.country_code = SUBSTRING(p.phone_number, 1, 3)", exp: "Maps phone prefixes to country codes." },
      { clause: "HAVING AVG(ac.duration) > (SELECT AVG(duration) FROM Calls)", exp: "Filters countries whose average duration beats global average." }
    ],
    alternativeSolutions: [
      {
        name: "CROSS JOIN Global Average",
        complexity: "O(N log N)",
        sql: `WITH GlobalAvg AS (SELECT AVG(duration) AS g_avg FROM Calls)
SELECT c.name AS country FROM Country c ... CROSS JOIN GlobalAvg g
GROUP BY c.name, g.g_avg HAVING AVG(ac.duration) > g.g_avg;`,
        explanation: "Cross joins scalar global mean directly into the query block."
      }
    ]
  },

  // 43. #1532 The Most Recent Three Orders
  {
    id: 1532,
    title: "The Most Recent Three Orders",
    difficulty: "Medium",
    acceptance: "69.7%",
    interviewFreq: "High • Amazon",
    companies: ["Amazon"],
    prompt: `Write a solution to find the most recent three orders of each user. If a user ordered less than three orders, return all of their orders. Return the result table ordered by customer_name in ascending order, customer_id in ascending order, and order_date in descending order.`,
    sampleInput: { table: "Customers / Orders", columns: ["customer_id", "name", "order_id", "order_date"], rows: [[1, "Winston", 1, "2020-07-31"], [1, "Winston", 2, "2020-07-30"], [1, "Winston", 3, "2020-07-29"], [1, "Winston", 4, "2020-07-28"]] },
    expectedOutput: { columns: ["customer_name", "customer_id", "order_id", "order_date"], rows: [["Winston", 1, 1, "2020-07-31"], ["Winston", 1, 2, "2020-07-30"], ["Winston", 1, 3, "2020-07-29"]] },
    svgDiagram: createDiagram(
      "LEETCODE #1532: TOP 3 ORDERS CHRONOLOGICAL SLICE",
      "Winston Orders",
      ["O1: July 31 (Rank 1)", "O2: July 30 (Rank 2)", "O3: July 29 (Rank 3)", "O4: July 28 (Rank 4 ❌)"],
      "Top 3 Orders",
      ["Winston: O1, O2, O3"],
      "ROW_NUMBER() OVER(PARTITION BY customer_id\\nORDER BY order_date DESC) <= 3"
    ),
    logicBreakdown: [
      "Join Customers with Orders.",
      "Assign ROW_NUMBER() partitioned by customer_id and ordered by order_date DESC.",
      "Filter for rnk <= 3.",
      "Order by customer_name ASC, customer_id ASC, order_date DESC."
    ],
    trapsAndEdgeCases: [
      "Sorting hierarchy: Must follow the exact 3-level sort order specified in the problem statement."
    ],
    solutionSQL: `WITH RankedOrders AS (
    SELECT c.name AS customer_name,
           c.customer_id,
           o.order_id,
           o.order_date,
           ROW_NUMBER() OVER (
               PARTITION BY c.customer_id
               ORDER BY o.order_date DESC
           ) AS rnk
    FROM Customers c
    JOIN Orders o ON c.customer_id = o.customer_id
)
SELECT customer_name, customer_id, order_id, order_date
FROM RankedOrders
WHERE rnk <= 3
ORDER BY customer_name ASC, customer_id ASC, order_date DESC;`,
    lineByLineExplanation: [
      { clause: "WITH RankedOrders AS (...)", exp: "Ranks each customer's orders chronologically in descending order." },
      { clause: "SELECT customer_name, customer_id, order_id, order_date FROM RankedOrders WHERE rnk <= 3", exp: "Retains top 3 orders per customer." },
      { clause: "ORDER BY customer_name ASC, customer_id ASC, order_date DESC", exp: "Sorts final rows per requirement." }
    ],
    alternativeSolutions: [
      {
        name: "Correlated Subquery Count",
        complexity: "O(N^2)",
        sql: `SELECT c.name AS customer_name, c.customer_id, o1.order_id, o1.order_date
FROM Customers c JOIN Orders o1 ON c.customer_id = o1.customer_id
WHERE (
  SELECT COUNT(*) FROM Orders o2 WHERE o2.customer_id = o1.customer_id AND o2.order_date > o1.order_date
) < 3 ORDER BY customer_name, customer_id, order_date DESC;`,
        explanation: "Correlated subquery counting newer orders."
      }
    ]
  },

  // 44. #1549 The Most Recent Orders for Each Product
  {
    id: 1549,
    title: "The Most Recent Orders for Each Product",
    difficulty: "Medium",
    acceptance: "66.5%",
    interviewFreq: "High • Amazon",
    companies: ["Amazon"],
    prompt: `Write a solution to find the most recent order(s) of each product. Return the result table with product_name, product_id, order_id, and order_date ordered by product_name ASC, product_id ASC, and order_id ASC.`,
    sampleInput: { table: "Products / Orders", columns: ["product_id", "product_name", "order_id", "order_date"], rows: [[1, "keyboard", 1, "2020-08-01"], [1, "keyboard", 2, "2020-08-01"], [2, "mouse", 3, "2020-08-03"]] },
    expectedOutput: { columns: ["product_name", "product_id", "order_id", "order_date"], rows: [["keyboard", 1, 1, "2020-08-01"], ["keyboard", 1, 2, "2020-08-01"], ["mouse", 2, 3, "2020-08-03"]] },
    svgDiagram: createDiagram(
      "LEETCODE #1549: MULTI-ORDER LATEST DATE TIE PRESERVATION",
      "Orders",
      ["Keyboard: O1 (Aug 01), O2 (Aug 01)", "Mouse: O3 (Aug 03)"],
      "Most Recent",
      ["keyboard -> O1, O2 (Both tied for latest!)", "mouse -> O3"],
      "DENSE_RANK() OVER(PARTITION BY product_id\\nORDER BY order_date DESC) = 1"
    ),
    logicBreakdown: [
      "Multiple orders can be placed for the same product on its latest date.",
      "Using ROW_NUMBER() would drop ties; DENSE_RANK() or RANK() is required.",
      "Partition by product_id and order by order_date DESC.",
      "Filter for rnk = 1, join with Products, and order by product_name ASC, product_id ASC, order_id ASC."
    ],
    trapsAndEdgeCases: [
      "Ties on max date: If two orders occur on the same latest date, both must be returned."
    ],
    solutionSQL: `WITH RankedOrders AS (
    SELECT p.product_name,
           p.product_id,
           o.order_id,
           o.order_date,
           DENSE_RANK() OVER (
               PARTITION BY p.product_id
               ORDER BY o.order_date DESC
           ) AS rnk
    FROM Products p
    JOIN Orders o ON p.product_id = o.product_id
)
SELECT product_name, product_id, order_id, order_date
FROM RankedOrders
WHERE rnk = 1
ORDER BY product_name ASC, product_id ASC, order_id ASC;`,
    lineByLineExplanation: [
      { clause: "WITH RankedOrders AS (...)", exp: "Ranks orders per product using DENSE_RANK to retain date ties." },
      { clause: "SELECT product_name, product_id, order_id, order_date FROM RankedOrders WHERE rnk = 1", exp: "Filters for the latest order date." },
      { clause: "ORDER BY product_name ASC, product_id ASC, order_id ASC", exp: "Sorts final output." }
    ],
    alternativeSolutions: [
      {
        name: "Tuple IN MAX(order_date)",
        complexity: "O(N log N)",
        sql: `SELECT p.product_name, p.product_id, o.order_id, o.order_date
FROM Products p JOIN Orders o ON p.product_id = o.product_id
WHERE (p.product_id, o.order_date) IN (SELECT product_id, MAX(order_date) FROM Orders GROUP BY product_id)
ORDER BY product_name, product_id, order_id;`,
        explanation: "Matches max date directly per product."
      }
    ]
  },

  // 45. #1555 Bank Account Summary
  {
    id: 1555,
    title: "Bank Account Summary",
    difficulty: "Medium",
    acceptance: "51.2%",
    interviewFreq: "High • Amazon",
    companies: ["Amazon"],
    prompt: `Write a solution to report the user_id, user_name, credit, and credit_limit_breached ('Yes' or 'No') for each user after executing all transactions. A user's credit limit is breached if their final credit balance is negative (< 0).`,
    sampleInput: { table: "Users / Transactions", columns: ["user_id", "user_name", "credit", "paid_by", "paid_to", "amount"], rows: [[1, "Winston", 1000, 1, 2, 400], [2, "Jonathan", 200, 2, 1, 500]] },
    expectedOutput: { columns: ["user_id", "user_name", "credit", "credit_limit_breached"], rows: [[1, "Winston", 1100, "No"], [2, "Jonathan", 100, "No"]] },
    svgDiagram: createDiagram(
      "LEETCODE #1555: NET DEBIT/CREDIT ACCOUNT RECONCILIATION",
      "Transactions",
      ["U1 pays U2: -400 to U1, +400 to U2", "U2 pays U1: -500 to U2, +500 to U1"],
      "Final Balances",
      ["U1: 1000 - 400 + 500 = 1100 (No)", "U2: 200 + 400 - 500 = 100 (No)"],
      "credit - paid_by_sum + paid_to_sum\\nIF(credit < 0, 'Yes', 'No')"
    ),
    logicBreakdown: [
      "When user acts as paid_by, their balance decreases: -amount.",
      "When user acts as paid_to, their balance increases: +amount.",
      "Union all debits and credits: (paid_by AS user_id, -amount) UNION ALL (paid_to AS user_id, amount).",
      "LEFT JOIN Users with net transactions and compute final_credit = u.credit + IFNULL(SUM(amount), 0).",
      "Check IF(final_credit < 0, 'Yes', 'No')."
    ],
    trapsAndEdgeCases: [
      "Users with 0 transactions: Must preserve their starting credit and report 'No' (or 'Yes' if starting balance was already negative)."
    ],
    solutionSQL: `WITH NetTransactions AS (
    SELECT paid_by AS user_id, -amount AS delta FROM Transactions
    UNION ALL
    SELECT paid_to AS user_id, amount AS delta FROM Transactions
),
UserTotals AS (
    SELECT user_id, SUM(delta) AS net_change
    FROM NetTransactions
    GROUP BY user_id
)
SELECT u.user_id,
       u.user_name,
       u.credit + IFNULL(t.net_change, 0) AS credit,
       CASE
           WHEN u.credit + IFNULL(t.net_change, 0) < 0 THEN 'Yes'
           ELSE 'No'
       END AS credit_limit_breached
FROM Users u
LEFT JOIN UserTotals t ON u.user_id = t.user_id;`,
    lineByLineExplanation: [
      { clause: "WITH NetTransactions AS (...)", exp: "Represents debits as negative and credits as positive deltas." },
      { clause: "UserTotals AS (...)", exp: "Aggregates net transactional impact per user." },
      { clause: "u.credit + IFNULL(t.net_change, 0) AS credit,", exp: "Calculates updated ending balance." },
      { clause: "CASE WHEN ... < 0 THEN 'Yes' ELSE 'No' END AS credit_limit_breached", exp: "Flags negative credit balances." }
    ],
    alternativeSolutions: [
      {
        name: "Two-Sided Subquery Join",
        complexity: "O(N log N)",
        sql: `SELECT u.user_id, u.user_name,
       u.credit - IFNULL(outflow.total, 0) + IFNULL(inflow.total, 0) AS credit,
       IF(u.credit - IFNULL(outflow.total, 0) + IFNULL(inflow.total, 0) < 0, 'Yes', 'No') AS credit_limit_breached
FROM Users u
LEFT JOIN (SELECT paid_by, SUM(amount) AS total FROM Transactions GROUP BY paid_by) outflow ON u.user_id = outflow.paid_by
LEFT JOIN (SELECT paid_to, SUM(amount) AS total FROM Transactions GROUP BY paid_to) inflow ON u.user_id = inflow.paid_to;`,
        explanation: "Joins separate inflow and outflow aggregates."
      }
    ]
  },

  // 46. #1596 The Most Frequently Ordered Products for Each Customer
  {
    id: 1596,
    title: "The Most Frequently Ordered Products for Each Customer",
    difficulty: "Medium",
    acceptance: "66.3%",
    interviewFreq: "High • Amazon",
    companies: ["Amazon"],
    prompt: `Write a solution to find the most frequently ordered product(s) for each customer. In case of a tie, report all tied products. Return the result table with customer_id, product_id, and product_name.`,
    sampleInput: { table: "Customers / Orders / Products", columns: ["customer_id", "order_id", "product_id", "product_name"], rows: [[1, 1, 1, "keyboard"], [1, 2, 1, "keyboard"], [1, 3, 2, "mouse"], [2, 4, 2, "mouse"]] },
    expectedOutput: { columns: ["customer_id", "product_id", "product_name"], rows: [[1, 1, "keyboard"], [2, 2, "mouse"]] },
    svgDiagram: createDiagram(
      "LEETCODE #1596: PRODUCT ORDER FREQUENCY PER CUSTOMER",
      "Order Counts",
      ["Cust 1: Keyboard (2 orders, Max)", "Cust 1: Mouse (1 order)", "Cust 2: Mouse (1 order, Max)"],
      "Top Product",
      ["Cust 1 -> Keyboard", "Cust 2 -> Mouse"],
      "DENSE_RANK() OVER(PARTITION BY customer_id\\nORDER BY COUNT(*) DESC) = 1"
    ),
    logicBreakdown: [
      "Count orders per (customer_id, product_id).",
      "Use DENSE_RANK() partitioned by customer_id and ordered by COUNT(*) DESC to rank products by order volume.",
      "Filter for rnk = 1 and join to Products to retrieve product_name."
    ],
    trapsAndEdgeCases: [
      "Tied favorites: If a customer orders two products an equal maximum number of times, both must be returned."
    ],
    solutionSQL: `WITH ProductCounts AS (
    SELECT customer_id,
           product_id,
           DENSE_RANK() OVER (
               PARTITION BY customer_id
               ORDER BY COUNT(*) DESC
           ) AS rnk
    FROM Orders
    GROUP BY customer_id, product_id
)
SELECT pc.customer_id,
       pc.product_id,
       p.product_name
FROM ProductCounts pc
JOIN Products p ON pc.product_id = p.product_id
WHERE pc.rnk = 1;`,
    lineByLineExplanation: [
      { clause: "WITH ProductCounts AS (SELECT ..., DENSE_RANK() OVER (PARTITION BY customer_id ORDER BY COUNT(*) DESC) AS rnk ...)", exp: "Calculates order frequencies and ranks products per customer." },
      { clause: "SELECT pc.customer_id, pc.product_id, p.product_name FROM ProductCounts pc JOIN Products p ... WHERE pc.rnk = 1", exp: "Filters for top frequency products and attaches name." }
    ],
    alternativeSolutions: [
      {
        name: "Correlated Subquery MAX",
        complexity: "O(N^2)",
        sql: `SELECT o.customer_id, o.product_id, p.product_name
FROM Orders o JOIN Products p ON o.product_id = p.product_id
GROUP BY o.customer_id, o.product_id, p.product_name
HAVING COUNT(*) = (
  SELECT MAX(cnt) FROM (SELECT customer_id, product_id, COUNT(*) AS cnt FROM Orders GROUP BY customer_id, product_id) t
  WHERE t.customer_id = o.customer_id
);`,
        explanation: "Correlated subquery matching max order count."
      }
    ]
  },

  // 47. #1613 Find the Missing IDs
  {
    id: 1613,
    title: "Find the Missing IDs",
    difficulty: "Medium",
    acceptance: "78.4%",
    interviewFreq: "Very High • Amazon",
    companies: ["Amazon"],
    prompt: `Write a solution to find the missing customer IDs. The missing IDs are ones that are not in Customers but are less than the maximum customer_id present in the table. Return the result table ordered by ids in ascending order.`,
    sampleInput: { table: "Customers", columns: ["customer_id", "customer_name"], rows: [[1, "Alice"], [4, "Bob"], [5, "Charlie"]] },
    expectedOutput: { columns: ["ids"], rows: [[2], [3]] },
    svgDiagram: createDiagram(
      "LEETCODE #1613: RECURSIVE SEQUENCE DOMAIN SUBTRACTION",
      "Existing IDs",
      ["Present: 1, 4, 5 (Max ID = 5)", "Sequence: 1, 2, 3, 4, 5"],
      "Missing IDs",
      ["ids: 2", "ids: 3"],
      "WITH RECURSIVE Seq (1 to MAX)\\nWHERE n NOT IN (Customers)"
    ),
    logicBreakdown: [
      "Use a recursive CTE to synthesize all integers from 1 up to MAX(customer_id).",
      "Filter the generated numbers where n NOT IN (SELECT customer_id FROM Customers).",
      "Order by ids ASC."
    ],
    trapsAndEdgeCases: [
      "Recursive recursion limit: Problem guarantees MAX(customer_id) <= 100, which is well within standard recursion limits."
    ],
    solutionSQL: `WITH RECURSIVE Seq AS (
    SELECT 1 AS ids
    UNION ALL
    SELECT ids + 1
    FROM Seq
    WHERE ids < (SELECT MAX(customer_id) FROM Customers)
)
SELECT ids
FROM Seq
WHERE ids NOT IN (SELECT customer_id FROM Customers)
ORDER BY ids ASC;`,
    lineByLineExplanation: [
      { clause: "WITH RECURSIVE Seq AS (SELECT 1 AS ids UNION ALL SELECT ids + 1 FROM Seq WHERE ids < (SELECT MAX(customer_id) FROM Customers))", exp: "Recursively generates consecutive integers up to max customer ID." },
      { clause: "SELECT ids FROM Seq WHERE ids NOT IN (SELECT customer_id FROM Customers)", exp: "Filters out existing customer IDs to identify gaps." },
      { clause: "ORDER BY ids ASC", exp: "Sorts missing numbers in ascending sequence." }
    ],
    alternativeSolutions: [
      {
        name: "LEFT JOIN Anti-Filter",
        complexity: "O(Max ID)",
        sql: `WITH RECURSIVE Seq AS (SELECT 1 AS ids UNION ALL SELECT ids + 1 FROM Seq WHERE ids < (SELECT MAX(customer_id) FROM Customers))
SELECT s.ids FROM Seq s LEFT JOIN Customers c ON s.ids = c.customer_id WHERE c.customer_id IS NULL ORDER BY s.ids;`,
        explanation: "Left anti-join syntax checking for NULL customer_id."
      }
    ]
  },

  // 48. #1635 Hopper Company Queries I
  {
    id: 1635,
    title: "Hopper Company Queries I",
    difficulty: "Hard",
    acceptance: "48.2%",
    interviewFreq: "Very High • Uber",
    companies: ["Uber"],
    prompt: `Write a solution to report the following for each month of 2020:\n- active_drivers: total number of active drivers by the end of that month\n- accepted_rides: number of accepted rides in that month\nOrder by month ASC.`,
    sampleInput: { table: "Drivers / AcceptedRides", columns: ["driver_id", "join_date", "ride_id", "requested_at"], rows: [[10, "2019-12-10", 1, "2020-01-01"], [8, "2020-01-13", 2, "2020-01-02"]] },
    expectedOutput: { columns: ["month", "active_drivers", "accepted_rides"], rows: [[1, 2, 2], [2, 2, 0]] },
    svgDiagram: createDiagram(
      "LEETCODE #1635: RIDE-SHARING MONTHLY METRICS RECONCILIATION",
      "Drivers & Rides",
      ["Drivers joined before or in Jan: 2", "Rides accepted in Jan: 2"],
      "Monthly Summary",
      ["Month 1: active=2, rides=2", "Month 2: active=2, rides=0"],
      "12-Month Calendar (1 to 12)\\nLEFT JOIN Drivers & Rides"
    ),
    logicBreakdown: [
      "Generate all 12 calendar months of 2020 using a recursive CTE (1 to 12).",
      "Active drivers by month M: Drivers who joined on or before the last day of month M (join_date <= '2020-M-31').",
      "Accepted rides in month M: Rides requested in 2020 with MONTH(requested_at) = M that appear in AcceptedRides.",
      "Join the 12 calendar months with active drivers count and accepted rides count."
    ],
    trapsAndEdgeCases: [
      "Pre-2020 drivers: Drivers who joined in 2018 or 2019 are active in all months of 2020; they must be included starting in Month 1."
    ],
    solutionSQL: `WITH RECURSIVE Months AS (
    SELECT 1 AS month
    UNION ALL
    SELECT month + 1 FROM Months WHERE month < 12
),
MonthlyRides AS (
    SELECT MONTH(r.requested_at) AS month,
           COUNT(a.ride_id) AS accepted_rides
    FROM Rides r
    JOIN AcceptedRides a ON r.ride_id = a.ride_id
    WHERE YEAR(r.requested_at) = 2020
    GROUP BY MONTH(r.requested_at)
)
SELECT m.month,
       (
           SELECT COUNT(*)
           FROM Drivers d
           WHERE d.join_date < DATE_ADD('2020-01-01', INTERVAL m.month MONTH)
       ) AS active_drivers,
       IFNULL(mr.accepted_rides, 0) AS accepted_rides
FROM Months m
LEFT JOIN MonthlyRides mr ON m.month = mr.month
ORDER BY m.month ASC;`,
    lineByLineExplanation: [
      { clause: "WITH RECURSIVE Months AS (SELECT 1 AS month UNION ALL SELECT month + 1 ... WHERE month < 12)", exp: "Generates numbers 1 to 12 representing each month." },
      { clause: "MonthlyRides AS (...)", exp: "Aggregates accepted rides occurring in 2020 by month." },
      { clause: "(SELECT COUNT(*) FROM Drivers d WHERE d.join_date < DATE_ADD('2020-01-01', INTERVAL m.month MONTH)) AS active_drivers", exp: "Counts cumulative drivers joined prior to the end of each target month." },
      { clause: "IFNULL(mr.accepted_rides, 0) AS accepted_rides", exp: "Coalesces months with zero accepted rides to 0." }
    ],
    alternativeSolutions: [
      {
        name: "JOIN with Cumulative Sum",
        complexity: "O(D log D + 12)",
        sql: `WITH RECURSIVE Months AS (SELECT 1 AS month UNION ALL SELECT month + 1 FROM Months WHERE month < 12),
MonthlyDrivers AS (
  SELECT m.month, COUNT(d.driver_id) AS cnt FROM Months m LEFT JOIN Drivers d ON YEAR(d.join_date) = 2020 AND MONTH(d.join_date) = m.month GROUP BY m.month
) ...`,
        explanation: "Separately counts initial drivers and accumulates monthly new drivers."
      }
    ]
  },

  // 49. #1645 Hopper Company Queries II
  {
    id: 1645,
    title: "Hopper Company Queries II",
    difficulty: "Hard",
    acceptance: "44.9%",
    interviewFreq: "Very High • Uber",
    companies: ["Uber"],
    prompt: `Write a solution to report the working_percentage of active drivers for each month of 2020, where working_percentage = (working drivers in month / active drivers by end of month) * 100. Round to 2 decimal places. If active drivers = 0, return 0.00.`,
    sampleInput: { table: "Drivers / Rides / AcceptedRides", columns: ["driver_id", "join_date", "requested_at"], rows: [[10, "2019-12-10", "2020-01-01"], [8, "2020-01-13", "2020-01-02"]] },
    expectedOutput: { columns: ["month", "working_percentage"], rows: [[1, 100.00], [2, 0.00]] },
    svgDiagram: createDiagram(
      "LEETCODE #1645: WORKING DRIVERS UTILIZATION PERCENTAGE",
      "Month 1 Metrics",
      ["Active Drivers: 2", "Distinct Drivers with >=1 ride: 2", "Working Percentage: 100%"],
      "Monthly Utilization",
      ["Month 1: 100.00%", "Month 2: 0.00%"],
      "ROUND(working_drivers / active_drivers * 100, 2)"
    ),
    logicBreakdown: [
      "Use Months CTE (1 to 12).",
      "Active drivers = Total drivers joined before or during month M.",
      "Working drivers = Distinct drivers who accepted at least one ride requested in month M: COUNT(DISTINCT a.driver_id).",
      "working_percentage = ROUND(IFNULL(working_drivers / active_drivers * 100, 0), 2).",
      "If active_drivers is 0, percentage defaults to 0.00."
    ],
    trapsAndEdgeCases: [
      "Distinct working drivers: A driver who completes 10 rides in a month only counts as 1 working driver."
    ],
    solutionSQL: `WITH RECURSIVE Months AS (
    SELECT 1 AS month
    UNION ALL
    SELECT month + 1 FROM Months WHERE month < 12
),
WorkingDrivers AS (
    SELECT MONTH(r.requested_at) AS month,
           COUNT(DISTINCT a.driver_id) AS working_drivers
    FROM Rides r
    JOIN AcceptedRides a ON r.ride_id = a.ride_id
    WHERE YEAR(r.requested_at) = 2020
    GROUP BY MONTH(r.requested_at)
)
SELECT m.month,
       ROUND(
           IFNULL(
               wd.working_drivers * 100.0 /
               NULLIF((SELECT COUNT(*) FROM Drivers d WHERE d.join_date < DATE_ADD('2020-01-01', INTERVAL m.month MONTH)), 0),
               0
           ),
           2
       ) AS working_percentage
FROM Months m
LEFT JOIN WorkingDrivers wd ON m.month = wd.month
ORDER BY m.month ASC;`,
    lineByLineExplanation: [
      { clause: "WITH RECURSIVE Months AS (...)", exp: "Generates calendar months 1 through 12." },
      { clause: "WorkingDrivers AS (...)", exp: "Counts distinct drivers with at least one completed ride in the month." },
      { clause: "ROUND(IFNULL(wd.working_drivers * 100.0 / NULLIF(active_drivers, 0), 0), 2) AS working_percentage", exp: "Computes working percentage with NULLIF zero-division guard, rounded to 2 decimals." }
    ],
    alternativeSolutions: [
      {
        name: "CTE Metric Join",
        complexity: "O(R + D + 12)",
        sql: `WITH Active AS (SELECT m.month, ...), Working AS (SELECT m.month, ...)
SELECT a.month, ROUND(IFNULL(w.cnt * 100 / a.cnt, 0), 2) AS working_percentage FROM Active a LEFT JOIN Working w ON a.month = w.month;`,
        explanation: "Modular join between separate Active and Working driver tables."
      }
    ]
  },

  // 50. #1651 Hopper Company Queries III
  {
    id: 1651,
    title: "Hopper Company Queries III",
    difficulty: "Hard",
    acceptance: "54.1%",
    interviewFreq: "Very High • Uber",
    companies: ["Uber"],
    prompt: `Write a solution to compute the average_ride_distance and average_ride_duration of that month and the following two months for each month between January and October 2020 (inclusive). Round averages to 2 decimal places. Order by month ASC.`,
    sampleInput: { table: "Rides / AcceptedRides", columns: ["ride_id", "requested_at", "ride_distance", "ride_duration"], rows: [[1, "2020-01-01", 10, 20], [2, "2020-02-01", 10, 20], [3, "2020-03-01", 10, 20]] },
    expectedOutput: { columns: ["month", "average_ride_distance", "average_ride_duration"], rows: [[1, 10.00, 20.00]] },
    svgDiagram: createDiagram(
      "LEETCODE #1651: 3-MONTH ROLLING WINDOW DISTANCE & DURATION",
      "Monthly Totals",
      ["M1: 10 mi, 20 min", "M2: 10 mi, 20 min", "M3: 10 mi, 20 min"],
      "3-Mo Moving Avg",
      ["Month 1: (10+10+10)/3 = 10.00 mi", "Month 1: (20+20+20)/3 = 20.00 min"],
      "AVG(metric) OVER(ROWS BETWEEN CURRENT ROW\\nAND 2 FOLLOWING) [Months 1 to 10]"
    ),
    logicBreakdown: [
      "Generate months 1 to 12.",
      "Sum ride_distance and ride_duration for each month of 2020, coalescing empty months to 0.",
      "Calculate 3-month forward moving average using AVG() OVER (ORDER BY month ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING).",
      "Filter for months 1 through 10 (since months 11 and 12 do not have 2 succeeding months within the year).",
      "Round averages to 2 decimal places."
    ],
    trapsAndEdgeCases: [
      "Month limit: Must strictly output months 1 to 10 (January through October)."
    ],
    solutionSQL: `WITH RECURSIVE Months AS (
    SELECT 1 AS month
    UNION ALL
    SELECT month + 1 FROM Months WHERE month < 12
),
MonthlyAggs AS (
    SELECT m.month,
           IFNULL(SUM(a.ride_distance), 0) AS total_distance,
           IFNULL(SUM(a.ride_duration), 0) AS total_duration
    FROM Months m
    LEFT JOIN Rides r ON m.month = MONTH(r.requested_at) AND YEAR(r.requested_at) = 2020
    LEFT JOIN AcceptedRides a ON r.ride_id = a.ride_id
    GROUP BY m.month
),
RollingAvgs AS (
    SELECT month,
           ROUND(AVG(total_distance) OVER (
               ORDER BY month
               ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING
           ), 2) AS average_ride_distance,
           ROUND(AVG(total_duration) OVER (
               ORDER BY month
               ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING
           ), 2) AS average_ride_duration
    FROM MonthlyAggs
)
SELECT month, average_ride_distance, average_ride_duration
FROM RollingAvgs
WHERE month <= 10
ORDER BY month ASC;`,
    lineByLineExplanation: [
      { clause: "WITH RECURSIVE Months AS (...)", exp: "Generates all 12 calendar months." },
      { clause: "MonthlyAggs AS (...)", exp: "Sums monthly distance and duration, defaulting zero-ride months to 0." },
      { clause: "AVG(total_distance) OVER (ORDER BY month ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING)", exp: "Computes 3-month forward sliding average." },
      { clause: "WHERE month <= 10 ORDER BY month ASC", exp: "Restricts to January through October (months 1-10)." }
    ],
    alternativeSolutions: [
      {
        name: "Explicit SUM / 3 Window",
        complexity: "O(12)",
        sql: `SELECT month,
       ROUND(SUM(total_distance) OVER (ORDER BY month ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING) / 3.0, 2) AS average_ride_distance,
       ROUND(SUM(total_duration) OVER (ORDER BY month ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING) / 3.0, 2) AS average_ride_duration
FROM MonthlyAggs WHERE month <= 10;`,
        explanation: "Computes 3-month sum divided by constant 3."
      }
    ]
  }
];

module.exports = problemsBatch2;
