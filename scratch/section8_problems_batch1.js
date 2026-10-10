// scratch/section8_problems_batch1.js
// Problems 1 to 25 of Concept 8 (LeetCode Premium Core)

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

const problemsBatch1 = [
  // 1. #177 Nth Highest Salary
  {
    id: 177,
    title: "Nth Highest Salary",
    difficulty: "Medium",
    acceptance: "38.2%",
    interviewFreq: "Very High • Amazon, Apple, Meta, Google",
    companies: ["Amazon", "Apple", "Meta", "Google"],
    prompt: `Write a SQL query to get the nth highest salary from the Employee table. If there is no nth highest salary, the query should return null.`,
    sampleInput: { table: "Employee", columns: ["id", "salary"], rows: [[1, 100], [2, 200], [3, 300]] },
    expectedOutput: { columns: ["getNthHighestSalary(2)"], rows: [[200]] },
    svgDiagram: createDiagram(
      "LEETCODE #177: Nth HIGHEST SALARY VIA OFFSET PARAMETERIZATION",
      "Employee Table",
      ["1: $100", "2: $200", "3: $300"],
      "Scalar Output",
      ["getNthHighestSalary(2): 200"],
      "SET N = N - 1;\\nLIMIT 1 OFFSET N"
    ),
    logicBreakdown: [
      "In MySQL functions, variables passed to LIMIT cannot be calculated in-line (e.g., LIMIT N-1).",
      "Mutate the input parameter first: SET N = N - 1.",
      "Query distinct salaries ordered descending with LIMIT 1 OFFSET N.",
      "The scalar wrapper returns NULL automatically if no matching row exists."
    ],
    trapsAndEdgeCases: [
      "Duplicate salaries trap: Must use SELECT DISTINCT salary so duplicate values share the same rank.",
      "Fewer than N distinct salaries: Empty set must resolve to NULL via scalar subquery."
    ],
    solutionSQL: `CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
  SET N = N - 1;
  RETURN (
    SELECT DISTINCT salary
    FROM Employee
    ORDER BY salary DESC
    LIMIT 1 OFFSET N
  );
END;`,
    lineByLineExplanation: [
      { clause: "SET N = N - 1;", exp: "Decrements N to convert 1-based rank to 0-based OFFSET." },
      { clause: "SELECT DISTINCT salary", exp: "Deduplicates identical salaries." },
      { clause: "FROM Employee ORDER BY salary DESC", exp: "Sorts compensation from highest to lowest." },
      { clause: "LIMIT 1 OFFSET N", exp: "Skips N rows and extracts the exact Nth distinct item." }
    ],
    alternativeSolutions: [
      {
        name: "DENSE_RANK() Window CTE",
        complexity: "O(N log N)",
        sql: `CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
  RETURN (
    WITH Ranked AS (
      SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
      FROM Employee
    )
    SELECT DISTINCT salary FROM Ranked WHERE rnk = N
  );
END;`,
        explanation: "Uses DENSE_RANK() to assign contiguous integer ranks directly without manual offset decrements."
      }
    ]
  },

  // 2. #178 Rank Scores
  {
    id: 178,
    title: "Rank Scores",
    difficulty: "Medium",
    acceptance: "62.1%",
    interviewFreq: "Very High • Amazon, Adobe, Microsoft",
    companies: ["Amazon", "Adobe", "Microsoft"],
    prompt: `Write a solution to find the rank of the scores. The ranking should be calculated according to the following rules:\n- Scores ranked from highest to lowest.\n- Tied scores share the same rank.\n- Ranks are consecutive without gaps.\nReturn the result table ordered by score in descending order.`,
    sampleInput: { table: "Scores", columns: ["id", "score"], rows: [[1, 3.50], [2, 3.65], [3, 4.00], [4, 3.85], [5, 4.00], [6, 3.65]] },
    expectedOutput: { columns: ["score", "rank"], rows: [[4.00, 1], [4.00, 1], [3.85, 2], [3.65, 3], [3.65, 3], [3.50, 4]] },
    svgDiagram: createDiagram(
      "LEETCODE #178: DENSE_RANK TIE-PRESERVATION WITHOUT HOLES",
      "Scores Table",
      ["3: 4.00", "5: 4.00", "4: 3.85"],
      "Ranked Table",
      ["4.00 -> Rank 1", "4.00 -> Rank 1", "3.85 -> Rank 2"],
      "DENSE_RANK() OVER\\n(ORDER BY score DESC)"
    ),
    logicBreakdown: [
      "Standard RANK() skips ranks on ties (1, 1, 3), which violates the problem specification.",
      "DENSE_RANK() guarantees contiguous ranks (1, 1, 2).",
      "The alias 'rank' is an SQL reserved word and must be escaped with backticks in MySQL."
    ],
    trapsAndEdgeCases: [
      "Reserved keyword collision: Aliasing without quotes (`rank`) can cause syntax errors.",
      "Floating point ordering: Precision sorting must be exact."
    ],
    solutionSQL: `SELECT score,
       DENSE_RANK() OVER (ORDER BY score DESC) AS \`rank\`
FROM Scores
ORDER BY score DESC;`,
    lineByLineExplanation: [
      { clause: "SELECT score,", exp: "Projects the original floating point score." },
      { clause: "DENSE_RANK() OVER (ORDER BY score DESC) AS `rank`", exp: "Calculates dense ranking in descending order." },
      { clause: "FROM Scores", exp: "Source scores table." },
      { clause: "ORDER BY score DESC", exp: "Ensures result table is presented highest to lowest." }
    ],
    alternativeSolutions: [
      {
        name: "Legacy Correlated Subquery",
        complexity: "O(N^2)",
        sql: `SELECT s1.score,
       (SELECT COUNT(DISTINCT s2.score) FROM Scores s2 WHERE s2.score >= s1.score) AS \`rank\`
FROM Scores s1
ORDER BY s1.score DESC;`,
        explanation: "Pre-window function ANSI approach counting unique scores greater than or equal to current score."
      }
    ]
  },

  // 3. #512 Game Play Analysis II
  {
    id: 512,
    title: "Game Play Analysis II",
    difficulty: "Easy",
    acceptance: "54.8%",
    interviewFreq: "High • Meta, Twitch, Blizzard",
    companies: ["Meta", "Twitch", "Blizzard"],
    prompt: `Write a solution to report the device that is first logged in for each player.\nReturn the result table in any order.`,
    sampleInput: { table: "Activity", columns: ["player_id", "device_id", "event_date", "games_played"], rows: [[1, 2, "2016-03-01", 5], [1, 2, "2016-05-02", 6], [2, 3, "2017-06-25", 1]] },
    expectedOutput: { columns: ["player_id", "device_id"], rows: [[1, 2], [2, 3]] },
    svgDiagram: createDiagram(
      "LEETCODE #512: FIRST LOGIN DEVICE EXTRACTION",
      "Activity",
      ["P1: 2016-03-01, Dev 2", "P1: 2016-05-02, Dev 2", "P2: 2017-06-25, Dev 3"],
      "First Device",
      ["P1 -> Dev 2", "P2 -> Dev 3"],
      "WHERE (player_id, event_date) IN\\n(MIN(event_date))"
    ),
    logicBreakdown: [
      "Find the minimum event_date for each player.",
      "Filter the original table to match both player_id and that minimum date.",
      "Select the corresponding device_id."
    ],
    trapsAndEdgeCases: [
      "Multiple logins on same date: The problem specifies (player_id, event_date) is primary key, ensuring uniqueness."
    ],
    solutionSQL: `SELECT player_id, device_id
FROM Activity
WHERE (player_id, event_date) IN (
    SELECT player_id, MIN(event_date)
    FROM Activity
    GROUP BY player_id
);`,
    lineByLineExplanation: [
      { clause: "SELECT player_id, device_id", exp: "Projects player and first login device." },
      { clause: "FROM Activity", exp: "Source activity log." },
      { clause: "WHERE (player_id, event_date) IN (...)", exp: "Tuple filter matching each player's earliest date." }
    ],
    alternativeSolutions: [
      {
        name: "ROW_NUMBER() Window Filter",
        complexity: "O(N log N)",
        sql: `WITH Ranked AS (
  SELECT player_id, device_id,
         ROW_NUMBER() OVER (PARTITION BY player_id ORDER BY event_date ASC) AS rnk
  FROM Activity
)
SELECT player_id, device_id FROM Ranked WHERE rnk = 1;`,
        explanation: "Partitions by player, orders chronologically, and extracts the top row."
      }
    ]
  },

  // 4. #534 Game Play Analysis III
  {
    id: 534,
    title: "Game Play Analysis III",
    difficulty: "Medium",
    acceptance: "81.0%",
    interviewFreq: "High • Meta, Netflix",
    companies: ["Meta", "Netflix"],
    prompt: `Write a solution to report for each player and date, how many games played so far by the player. That is, the total number of games played by the player until that date.`,
    sampleInput: { table: "Activity", columns: ["player_id", "device_id", "event_date", "games_played"], rows: [[1, 2, "2016-03-01", 5], [1, 2, "2016-05-02", 6], [1, 3, "2017-06-25", 1]] },
    expectedOutput: { columns: ["player_id", "event_date", "games_played_so_far"], rows: [[1, "2016-03-01", 5], [1, "2016-05-02", 11], [1, "2017-06-25", 12]] },
    svgDiagram: createDiagram(
      "LEETCODE #534: CUMULATIVE RUNNING SUM PER PLAYER",
      "Games Played",
      ["P1 (03-01): 5", "P1 (05-02): 6", "P1 (06-25): 1"],
      "Running Total",
      ["03-01: 5", "05-02: 11 (5+6)", "06-25: 12 (11+1)"],
      "SUM(games_played) OVER\\n(PARTITION BY player_id ORDER BY date)"
    ),
    logicBreakdown: [
      "Use window aggregation SUM(games_played) partitioned by player_id and ordered by event_date.",
      "The default window frame with ORDER BY is RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.",
      "This accumulates all past games played up to and including the current date."
    ],
    trapsAndEdgeCases: [
      "Unbounded following trap: Omitting ORDER BY causes SUM() to compute the grand total for the player instead of running total."
    ],
    solutionSQL: `SELECT player_id,
       event_date,
       SUM(games_played) OVER (
           PARTITION BY player_id
           ORDER BY event_date
       ) AS games_played_so_far
FROM Activity;`,
    lineByLineExplanation: [
      { clause: "SELECT player_id, event_date,", exp: "Emits player and chronological activity date." },
      { clause: "SUM(games_played) OVER (PARTITION BY player_id ORDER BY event_date) AS games_played_so_far", exp: "Running cumulative sum per player." },
      { clause: "FROM Activity", exp: "Source activity log." }
    ],
    alternativeSolutions: [
      {
        name: "Self-Join Cumulative Sum",
        complexity: "O(N^2)",
        sql: `SELECT a1.player_id, a1.event_date, SUM(a2.games_played) AS games_played_so_far
FROM Activity a1
JOIN Activity a2 ON a1.player_id = a2.player_id AND a2.event_date <= a1.event_date
GROUP BY a1.player_id, a1.event_date;`,
        explanation: "ANSI self-join joining prior records and aggregating with SUM."
      }
    ]
  },

  // 5. #571 Find Median Given Frequency of Schedule
  {
    id: 571,
    title: "Find Median Given Frequency of Schedule",
    difficulty: "Hard",
    acceptance: "44.6%",
    interviewFreq: "Very High • Pinterest, Meta, Google",
    companies: ["Pinterest", "Meta", "Google"],
    prompt: `The median is the value separating the higher half from the lower half of a data sample. Write a solution to calculate the median of all the numbers in the Numbers table and round it to 1 decimal place.`,
    sampleInput: { table: "Numbers", columns: ["num", "frequency"], rows: [[0, 7], [1, 1], [2, 3], [3, 1]] },
    expectedOutput: { columns: ["median"], rows: [[0.0]] },
    svgDiagram: createDiagram(
      "LEETCODE #571: WEIGHTED FREQUENCY MEDIAN THEOREM",
      "Frequency Counts",
      ["0 (Freq 7)", "1 (Freq 1)", "2 (Freq 3)", "3 (Freq 1)"],
      "Median Value",
      ["median: 0.0"],
      "Asc_Cum >= T/2 AND\\nDesc_Cum >= T/2"
    ),
    logicBreakdown: [
      "Calculate total count of numbers: T = SUM(frequency).",
      "Compute ascending cumulative frequency and descending cumulative frequency for each number.",
      "A number is a median candidate if both its ascending and descending cumulative sums are >= T / 2.0.",
      "Average the qualifying numbers to handle both odd and even distribution parity."
    ],
    trapsAndEdgeCases: [
      "Even count midpoint: If T is even, two distinct numbers may qualify; AVG(num) resolves to their midpoint.",
      "Rounding requirement: Must format to 1 decimal place using ROUND(..., 1)."
    ],
    solutionSQL: `WITH Cumulative AS (
    SELECT num,
           frequency,
           SUM(frequency) OVER (ORDER BY num ASC) AS asc_cum,
           SUM(frequency) OVER (ORDER BY num DESC) AS desc_cum,
           SUM(frequency) OVER () AS total_cnt
    FROM Numbers
)
SELECT ROUND(AVG(num), 1) AS median
FROM Cumulative
WHERE asc_cum >= total_cnt / 2.0
  AND desc_cum >= total_cnt / 2.0;`,
    lineByLineExplanation: [
      { clause: "WITH Cumulative AS (...)", exp: "Calculates ascending, descending, and grand total frequencies." },
      { clause: "WHERE asc_cum >= total_cnt / 2.0 AND desc_cum >= total_cnt / 2.0", exp: "Filters numbers falling on the median boundary interval." },
      { clause: "SELECT ROUND(AVG(num), 1) AS median", exp: "Averages the median set and rounds to 1 decimal place." }
    ],
    alternativeSolutions: [
      {
        name: "Recursive Number Unfolding",
        complexity: "O(Total Frequency)",
        sql: `WITH RECURSIVE Expanded AS (
  SELECT num, frequency, 1 AS seq FROM Numbers
  UNION ALL
  SELECT num, frequency, seq + 1 FROM Expanded WHERE seq < frequency
)
SELECT ROUND(AVG(num), 1) AS median FROM (
  SELECT num, ROW_NUMBER() OVER(ORDER BY num) AS rnk, COUNT(*) OVER() AS total FROM Expanded
) t WHERE rnk IN (FLOOR((total+1)/2), CEIL((total+1)/2));`,
        explanation: "Physically unfolds frequencies into individual rows and applies standard ordinal median selection."
      }
    ]
  },

  // 6. #574 Winning Candidate
  {
    id: 574,
    title: "Winning Candidate",
    difficulty: "Medium",
    acceptance: "60.4%",
    interviewFreq: "High • Uber, Amazon",
    companies: ["Uber", "Amazon"],
    prompt: `Write a solution to report the name of the winning candidate (i.e., the candidate who got the largest number of votes).\nIt is guaranteed that there is exactly one winning candidate.`,
    sampleInput: { table: "Candidate", columns: ["id", "name"], rows: [[1, "A"], [2, "B"], [3, "C"], [4, "D"], [5, "E"]] },
    expectedOutput: { columns: ["name"], rows: [["B"]] },
    svgDiagram: createDiagram(
      "LEETCODE #574: VOTE TALLY AGGREGATION",
      "Votes",
      ["V1: Candidate 2", "V2: Candidate 4", "V3: Candidate 2"],
      "Winner",
      ["name: B (2 votes)"],
      "GROUP BY candidateId\\nORDER BY COUNT(*) DESC LIMIT 1"
    ),
    logicBreakdown: [
      "Group the Vote table by candidateId and order by COUNT(*) descending with LIMIT 1.",
      "Join the resulting candidateId back to the Candidate table to retrieve the candidate's name."
    ],
    trapsAndEdgeCases: [
      "Candidate with 0 votes: Joining Candidate first requires LEFT JOIN, but querying Vote first is much faster."
    ],
    solutionSQL: `SELECT c.name
FROM Candidate c
JOIN (
    SELECT candidateId
    FROM Vote
    GROUP BY candidateId
    ORDER BY COUNT(*) DESC
    LIMIT 1
) v ON c.id = v.candidateId;`,
    lineByLineExplanation: [
      { clause: "SELECT c.name", exp: "Emits the winner's name." },
      { clause: "FROM Candidate c", exp: "Source candidates table." },
      { clause: "JOIN (SELECT candidateId ... LIMIT 1) v", exp: "Subquery identifying the candidate with maximum votes." },
      { clause: "ON c.id = v.candidateId", exp: "Matches winner's ID." }
    ],
    alternativeSolutions: [
      {
        name: "CTE with DENSE_RANK()",
        complexity: "O(V log V)",
        sql: `WITH Tally AS (
  SELECT candidateId, DENSE_RANK() OVER (ORDER BY COUNT(*) DESC) AS rnk
  FROM Vote GROUP BY candidateId
)
SELECT name FROM Candidate c JOIN Tally t ON c.id = t.candidateId WHERE t.rnk = 1;`,
        explanation: "Window rank alternative handling potential multi-candidate ties."
      }
    ]
  },

  // 7. #578 Get Highest Answer Rate Question
  {
    id: 578,
    title: "Get Highest Answer Rate Question",
    difficulty: "Medium",
    acceptance: "41.5%",
    interviewFreq: "High • Meta, Snap",
    companies: ["Meta", "Snap"],
    prompt: `The answer rate for a question is the number of times a user answered the question by the number of times it was shown. Write a solution to report the question that has the highest answer rate. If multiple questions have the same maximum rate, return the one with the smallest question_id.`,
    sampleInput: { table: "SurveyLog", columns: ["id", "action", "question_id", "answer_id", "q_num", "timestamp"], rows: [[5, "show", 285, null, 1, 123], [5, "answer", 285, 124124, 1, 124], [5, "show", 369, null, 2, 125]] },
    expectedOutput: { columns: ["survey_log"], rows: [[285]] },
    svgDiagram: createDiagram(
      "LEETCODE #578: RATIO CALCULATION WITH TIE-BREAKING",
      "SurveyLog",
      ["Q285: show, answer", "Q369: show (no answer)"],
      "Highest Rate",
      ["survey_log: 285 (100%)"],
      "SUM(action='answer') /\\nSUM(action='show')"
    ),
    logicBreakdown: [
      "For each question_id, count how many times action = 'answer' and action = 'show'.",
      "Compute answer_rate = SUM(action = 'answer') / SUM(action = 'show').",
      "Order by answer_rate DESC, question_id ASC with LIMIT 1."
    ],
    trapsAndEdgeCases: [
      "Tie-breaking rule: Must sort question_id ASC as the secondary sort key."
    ],
    solutionSQL: `SELECT question_id AS survey_log
FROM SurveyLog
GROUP BY question_id
ORDER BY SUM(action = 'answer') / SUM(action = 'show') DESC,
         question_id ASC
LIMIT 1;`,
    lineByLineExplanation: [
      { clause: "SELECT question_id AS survey_log", exp: "Projects the winning question ID aliased as survey_log." },
      { clause: "FROM SurveyLog GROUP BY question_id", exp: "Aggregates actions per question." },
      { clause: "ORDER BY SUM(action = 'answer') / SUM(action = 'show') DESC, question_id ASC", exp: "Ranks by answer rate, breaking ties by lowest ID." },
      { clause: "LIMIT 1", exp: "Emits the top question." }
    ],
    alternativeSolutions: [
      {
        name: "COUNT(answer_id) Optimization",
        complexity: "O(N log N)",
        sql: `SELECT question_id AS survey_log
FROM SurveyLog
GROUP BY question_id
ORDER BY COUNT(answer_id) / COUNT(IF(action = 'show', 1, NULL)) DESC, question_id ASC
LIMIT 1;`,
        explanation: "Leverages the fact that answer_id is non-null only for answer events."
      }
    ]
  },

  // 8. #579 Find Cumulative Salary of an Employee
  {
    id: 579,
    title: "Find Cumulative Salary of an Employee",
    difficulty: "Hard",
    acceptance: "44.9%",
    interviewFreq: "Very High • Amazon, Oracle",
    companies: ["Amazon", "Oracle"],
    prompt: `Write a solution to calculate the cumulative salary summary for every employee in a single table, excluding the most recent month for each employee. The cumulative salary is the sum of salaries in the current month and the previous 2 months. Return the result table ordered by id in ascending order, and then by month in descending order.`,
    sampleInput: { table: "Employee", columns: ["id", "month", "salary"], rows: [[1, 1, 20], [1, 2, 30], [1, 3, 40], [1, 4, 60], [2, 1, 20], [3, 1, 20]] },
    expectedOutput: { columns: ["id", "month", "Salary"], rows: [[1, 3, 90], [1, 2, 50], [1, 1, 20], [2, 1, 20], [3, 1, 20]] },
    svgDiagram: createDiagram(
      "LEETCODE #579: 3-MONTH ROLLING SUM WITH MAX MONTH EXCLUDED",
      "Emp 1 History",
      ["M1: 20 -> Cum 20", "M2: 30 -> Cum 50", "M3: 40 -> Cum 90", "M4: 60 (MAX EXCLUDED)"],
      "Report Table",
      ["1, M3, 90", "1, M2, 50", "1, M1, 20"],
      "SUM(salary) OVER(ROWS\\nBETWEEN 2 PRECEDING) & !MAX"
    ),
    logicBreakdown: [
      "Filter out each employee's most recent (maximum) month: (id, month) NOT IN (SELECT id, MAX(month) FROM Employee GROUP BY id).",
      "Calculate 3-month rolling sum: SUM(salary) OVER (PARTITION BY id ORDER BY month RANGE BETWEEN 2 PRECEDING AND CURRENT ROW).",
      "Order final results by id ASC, month DESC."
    ],
    trapsAndEdgeCases: [
      "Employees with only 1 month: Their only month is also their max month, so they are completely omitted from the output."
    ],
    solutionSQL: `SELECT id,
       month,
       SUM(salary) OVER (
           PARTITION BY id
           ORDER BY month
           RANGE BETWEEN 2 PRECEDING AND CURRENT ROW
       ) AS Salary
FROM Employee
WHERE (id, month) NOT IN (
    SELECT id, MAX(month)
    FROM Employee
    GROUP BY id
)
ORDER BY id ASC, month DESC;`,
    lineByLineExplanation: [
      { clause: "SELECT id, month,", exp: "Emits employee ID and active month." },
      { clause: "SUM(salary) OVER (PARTITION BY id ORDER BY month RANGE BETWEEN 2 PRECEDING AND CURRENT ROW) AS Salary", exp: "Computes 3-month rolling sum." },
      { clause: "WHERE (id, month) NOT IN (...)", exp: "Excludes the employee's latest recorded month." },
      { clause: "ORDER BY id ASC, month DESC", exp: "Sorts by ID ascending, then chronological month descending." }
    ],
    alternativeSolutions: [
      {
        name: "Self-Join 3-Month Range",
        complexity: "O(N^2)",
        sql: `SELECT e1.id, e1.month, SUM(e2.salary) AS Salary
FROM Employee e1
JOIN Employee e2 ON e1.id = e2.id AND e2.month BETWEEN e1.month - 2 AND e1.month
WHERE (e1.id, e1.month) NOT IN (SELECT id, MAX(month) FROM Employee GROUP BY id)
GROUP BY e1.id, e1.month
ORDER BY e1.id ASC, e1.month DESC;`,
        explanation: "Pre-window function self-join matching records within a 2-month lookback window."
      }
    ]
  },

  // 9. #586 Customer Placing the Largest Number of Orders
  {
    id: 586,
    title: "Customer Placing the Largest Number of Orders",
    difficulty: "Easy",
    acceptance: "75.4%",
    interviewFreq: "Very High • Twitter, Amazon",
    companies: ["Twitter", "Amazon"],
    prompt: `Write a solution to find the customer_number for the customer who has placed the largest number of orders.\nThe test cases are generated so that exactly one customer will have placed more orders than any other customer.`,
    sampleInput: { table: "orders", columns: ["order_number", "customer_number"], rows: [[1, 1], [2, 2], [3, 3], [4, 3]] },
    expectedOutput: { columns: ["customer_number"], rows: [[3]] },
    svgDiagram: createDiagram(
      "LEETCODE #586: TOP ORDER FREQUENCY",
      "Orders",
      ["Cust 1: 1 order", "Cust 2: 1 order", "Cust 3: 2 orders"],
      "Top Customer",
      ["customer_number: 3"],
      "GROUP BY customer_number\\nORDER BY COUNT(*) DESC LIMIT 1"
    ),
    logicBreakdown: [
      "Group orders by customer_number.",
      "Sort by COUNT(*) descending to place the customer with the highest volume at the top.",
      "Use LIMIT 1 to return the winner."
    ],
    trapsAndEdgeCases: [
      "Ties handling: The problem explicitly guarantees exactly one customer has the maximum order count."
    ],
    solutionSQL: `SELECT customer_number
FROM orders
GROUP BY customer_number
ORDER BY COUNT(*) DESC
LIMIT 1;`,
    lineByLineExplanation: [
      { clause: "SELECT customer_number", exp: "Emits the customer identifier." },
      { clause: "FROM orders GROUP BY customer_number", exp: "Aggregates orders per customer." },
      { clause: "ORDER BY COUNT(*) DESC LIMIT 1", exp: "Extracts the customer with the highest order count." }
    ],
    alternativeSolutions: [
      {
        name: "Window DENSE_RANK for Ties",
        complexity: "O(N log N)",
        sql: `WITH Ranked AS (
  SELECT customer_number, DENSE_RANK() OVER (ORDER BY COUNT(*) DESC) AS rnk
  FROM orders GROUP BY customer_number
)
SELECT customer_number FROM Ranked WHERE rnk = 1;`,
        explanation: "Handles potential ties by outputting all customers tied for first place."
      }
    ]
  },

  // 10. #602 Friend Requests II: Who Has the Most Friends
  {
    id: 602,
    title: "Friend Requests II: Who Has the Most Friends",
    difficulty: "Medium",
    acceptance: "61.3%",
    interviewFreq: "Very High • Meta, Amazon",
    companies: ["Meta", "Amazon"],
    prompt: `Write a solution to find the people who have the most friends and the most friends number. The test cases are generated so that only one person has the most friends.`,
    sampleInput: { table: "RequestAccepted", columns: ["requester_id", "accepter_id", "accept_date"], rows: [[1, 2, "2016/06/03"], [1, 3, "2016/06/08"], [2, 3, "2016/06/08"], [3, 4, "2016/06/09"]] },
    expectedOutput: { columns: ["id", "num"], rows: [[3, 3]] },
    svgDiagram: createDiagram(
      "LEETCODE #602: BIDIRECTIONAL DEGREE CENTRALITY",
      "Friendships",
      ["1 - 2", "1 - 3", "2 - 3", "3 - 4"],
      "Most Connected",
      ["User 3: 3 friends (👑)"],
      "UNION ALL Projections\\nGROUP BY id ORDER BY COUNT(*) DESC"
    ),
    logicBreakdown: [
      "Friendship is bidirectional: being requester or accepter both count as 1 friend.",
      "Project requester_id AS id and accepter_id AS id using UNION ALL to preserve all occurrences.",
      "Group by id, count occurrences, and extract the top user with LIMIT 1."
    ],
    trapsAndEdgeCases: [
      "UNION deduplication trap: Using UNION collapses duplicate entries, undercounting friends. Always use UNION ALL."
    ],
    solutionSQL: `WITH AllFriends AS (
    SELECT requester_id AS id FROM RequestAccepted
    UNION ALL
    SELECT accepter_id AS id FROM RequestAccepted
)
SELECT id, COUNT(*) AS num
FROM AllFriends
GROUP BY id
ORDER BY num DESC
LIMIT 1;`,
    lineByLineExplanation: [
      { clause: "WITH AllFriends AS (SELECT requester_id AS id ... UNION ALL SELECT accepter_id AS id)", exp: "Normalizes both endpoints into a single stream." },
      { clause: "SELECT id, COUNT(*) AS num", exp: "Counts total friend degree per user." },
      { clause: "GROUP BY id ORDER BY num DESC LIMIT 1", exp: "Ranks by degree and emits the top user." }
    ],
    alternativeSolutions: [
      {
        name: "Subquery Inline Derivation",
        complexity: "O(N log N)",
        sql: `SELECT id, COUNT(*) AS num
FROM (
    SELECT requester_id AS id FROM RequestAccepted
    UNION ALL
    SELECT accepter_id AS id FROM RequestAccepted
) t
GROUP BY id
ORDER BY num DESC
LIMIT 1;`,
        explanation: "Equivalent ANSI standard inline derived table."
      }
    ]
  },

  // 11. #603 Consecutive Available Seats
  {
    id: 603,
    title: "Consecutive Available Seats",
    difficulty: "Easy",
    acceptance: "67.8%",
    interviewFreq: "High • Amazon",
    companies: ["Amazon"],
    prompt: `Find all the consecutive available seats in the cinema. Return the result table ordered by seat_id in ascending order.`,
    sampleInput: { table: "Cinema", columns: ["seat_id", "free"], rows: [[1, 1], [2, 0], [3, 1], [4, 1], [5, 1]] },
    expectedOutput: { columns: ["seat_id"], rows: [[3], [4], [5]] },
    svgDiagram: createDiagram(
      "LEETCODE #603: CONSECUTIVE FREE SEATS",
      "Cinema",
      ["Seat 1: Free (1)", "Seat 2: Taken (0)", "Seats 3,4,5: Free (1)"],
      "Consecutive",
      ["seat_id: 3", "seat_id: 4", "seat_id: 5"],
      "c1.free=1 AND c2.free=1\\nAND ABS(c1.id - c2.id) = 1"
    ),
    logicBreakdown: [
      "Join the table to itself on consecutive seat IDs: ABS(c1.seat_id - c2.seat_id) = 1.",
      "Filter for rows where both seats are free: c1.free = 1 AND c2.free = 1.",
      "Select DISTINCT c1.seat_id ordered by seat_id ASC."
    ],
    trapsAndEdgeCases: [
      "Duplicate seat listings: A seat flanked by two available seats (e.g., seat 4 surrounded by 3 and 5) will match twice; DISTINCT is mandatory."
    ],
    solutionSQL: `SELECT DISTINCT c1.seat_id
FROM Cinema c1
JOIN Cinema c2
  ON ABS(c1.seat_id - c2.seat_id) = 1
WHERE c1.free = 1 AND c2.free = 1
ORDER BY c1.seat_id ASC;`,
    lineByLineExplanation: [
      { clause: "SELECT DISTINCT c1.seat_id", exp: "Emits unique available seat IDs." },
      { clause: "FROM Cinema c1 JOIN Cinema c2", exp: "Self-joins cinema seating table." },
      { clause: "ON ABS(c1.seat_id - c2.seat_id) = 1", exp: "Pairs adjacent neighbor seats." },
      { clause: "WHERE c1.free = 1 AND c2.free = 1", exp: "Ensures both adjacent seats are vacant." },
      { clause: "ORDER BY c1.seat_id ASC", exp: "Orders in ascending sequence." }
    ],
    alternativeSolutions: [
      {
        name: "Window LEAD / LAG",
        complexity: "O(N log N)",
        sql: `SELECT seat_id
FROM (
  SELECT seat_id, free,
         LAG(free) OVER (ORDER BY seat_id) AS prev_free,
         LEAD(free) OVER (ORDER BY seat_id) AS next_free
  FROM Cinema
) t
WHERE free = 1 AND (prev_free = 1 OR next_free = 1)
ORDER BY seat_id;`,
        explanation: "Window function approach checking either immediate preceding or succeeding seat availability."
      }
    ]
  },

  // 12. #612 Shortest Distance in a Plane
  {
    id: 612,
    title: "Shortest Distance in a Plane",
    difficulty: "Medium",
    acceptance: "60.9%",
    interviewFreq: "High • Twitter, Uber",
    companies: ["Twitter", "Uber"],
    prompt: `Write a solution to report the shortest distance between any two points from the Point2D table. Round the distance to 2 decimal places.`,
    sampleInput: { table: "Point2D", columns: ["x", "y"], rows: [[-1, -1], [0, 0], [-1, -2]] },
    expectedOutput: { columns: ["shortest"], rows: [[1.00]] },
    svgDiagram: createDiagram(
      "LEETCODE #612: 2D EUCLIDEAN DISTANCE",
      "Point2D",
      ["P1: (-1, -1)", "P2: (0, 0)", "P3: (-1, -2)"],
      "Shortest Distance",
      ["shortest: 1.00 (between P1 & P3)"],
      "SQRT((p1.x-p2.x)^2 +\\n(p1.y-p2.y)^2)"
    ),
    logicBreakdown: [
      "Join Point2D with itself where points are distinct (p1.x, p1.y) != (p2.x, p2.y).",
      "Calculate 2D Euclidean distance: SQRT(POW(p1.x - p2.x, 2) + POW(p1.y - p2.y, 2)).",
      "Enforce non-symmetric pairing (e.g. p1.x < p2.x OR (p1.x = p2.x AND p1.y < p2.y)) to avoid comparing a point with itself.",
      "Round the minimum distance to 2 decimal places."
    ],
    trapsAndEdgeCases: [
      "Zero distance self-comparison: Comparing a point to itself yields 0.00; inequality join condition is required."
    ],
    solutionSQL: `SELECT ROUND(MIN(SQRT(POW(p1.x - p2.x, 2) + POW(p1.y - p2.y, 2))), 2) AS shortest
FROM Point2D p1
JOIN Point2D p2
  ON (p1.x < p2.x) OR (p1.x = p2.x AND p1.y < p2.y);`,
    lineByLineExplanation: [
      { clause: "SELECT ROUND(MIN(SQRT(...)), 2) AS shortest", exp: "Computes minimum Euclidean distance rounded to 2 decimal places." },
      { clause: "FROM Point2D p1 JOIN Point2D p2", exp: "Self-joins Cartesian coordinates." },
      { clause: "ON (p1.x < p2.x) OR (p1.x = p2.x AND p1.y < p2.y)", exp: "Strictly pairs unique distinct coordinate pairs." }
    ],
    alternativeSolutions: [
      {
        name: "Standard Inequality Self-Join",
        complexity: "O(N^2)",
        sql: `SELECT ROUND(MIN(SQRT(POW(p1.x - p2.x, 2) + POW(p1.y - p2.y, 2))), 2) AS shortest
FROM Point2D p1
JOIN Point2D p2 ON NOT (p1.x = p2.x AND p1.y = p2.y);`,
        explanation: "Simple != inequality across coordinates."
      }
    ]
  },

  // 13. #614 Second Degree Follower
  {
    id: 614,
    title: "Second Degree Follower",
    difficulty: "Medium",
    acceptance: "37.5%",
    interviewFreq: "High • Twitter, Meta",
    companies: ["Twitter", "Meta"],
    prompt: `In social networks, a second-degree follower is a user who:\n- follows at least one user, and\n- has at least one follower.\nWrite a solution to report the second-degree followers and the number of their followers. Return the result table ordered by follower in alphabetical order.`,
    sampleInput: { table: "Follow", columns: ["followee", "follower"], rows: [["Alice", "Bob"], ["Bob", "Cena"], ["Bob", "Dan"], ["Bob", "Alice"]] },
    expectedOutput: { columns: ["follower", "num"], rows: [["Bob", 3]] },
    svgDiagram: createDiagram(
      "LEETCODE #614: SECOND DEGREE FOLLOWER GRAPH FILTER",
      "Follow Edges",
      ["Bob follows Cena", "Alice follows Bob", "Dan follows Bob"],
      "Second Degree",
      ["follower: Bob, num: 3"],
      "followee IN (followers)\\nGROUP BY followee"
    ),
    logicBreakdown: [
      "A second degree follower is someone who is BOTH followed by others (acts as followee) AND follows someone else (acts as follower).",
      "Filter for followees who exist in the follower column.",
      "Count distinct followers for each such followee.",
      "Order by follower name alphabetically."
    ],
    trapsAndEdgeCases: [
      "Column renaming trap: The problem asks to alias the person being followed as 'follower' in the final output column header."
    ],
    solutionSQL: `SELECT followee AS follower,
       COUNT(DISTINCT follower) AS num
FROM Follow
WHERE followee IN (
    SELECT follower
    FROM Follow
)
GROUP BY followee
ORDER BY follower ASC;`,
    lineByLineExplanation: [
      { clause: "SELECT followee AS follower, COUNT(DISTINCT follower) AS num", exp: "Counts followers for each user, aliasing column as requested." },
      { clause: "FROM Follow", exp: "Source social graph table." },
      { clause: "WHERE followee IN (SELECT follower FROM Follow)", exp: "Restricts to users who themselves follow at least one person." },
      { clause: "GROUP BY followee ORDER BY follower ASC", exp: "Aggregates per user and sorts alphabetically." }
    ],
    alternativeSolutions: [
      {
        name: "JOIN Filter",
        complexity: "O(N log N)",
        sql: `SELECT f1.followee AS follower, COUNT(DISTINCT f1.follower) AS num
FROM Follow f1
JOIN Follow f2 ON f1.followee = f2.follower
GROUP BY f1.followee
ORDER BY follower ASC;`,
        explanation: "Inner join between followee and follower roles."
      }
    ]
  },

  // 14. #615 Average Salary: Departments VS Company
  {
    id: 615,
    title: "Average Salary: Departments VS Company",
    difficulty: "Hard",
    acceptance: "54.8%",
    interviewFreq: "Very High • Amazon",
    companies: ["Amazon"],
    prompt: `Write a solution to compare the average salary of each department to the company's average salary for each month. Return result with columns pay_month, department_id, and comparison ('higher', 'lower', or 'same').`,
    sampleInput: { table: "Salary / Employee", columns: ["id", "employee_id", "amount", "pay_date", "department_id"], rows: [[1, 1, 9000, "2017-03-31", 1], [2, 2, 6000, "2017-03-31", 2], [3, 3, 10000, "2017-03-31", 2]] },
    expectedOutput: { columns: ["pay_month", "department_id", "comparison"], rows: [["2017-03", 1, "higher"], ["2017-03", 2, "lower"]] },
    svgDiagram: createDiagram(
      "LEETCODE #615: DEPARTMENT VS COMPANY MONTHLY BENCHMARK",
      "March Salaries",
      ["Dept 1 Avg: $9,000", "Dept 2 Avg: $8,000", "Company Avg: $8,333"],
      "Benchmark",
      ["Dept 1: higher", "Dept 2: lower"],
      "CASE WHEN dept_avg > comp_avg\\nTHEN 'higher' ..."
    ),
    logicBreakdown: [
      "Format pay_date to YYYY-MM: DATE_FORMAT(pay_date, '%Y-%m').",
      "Calculate company monthly average salary using AVG(amount) OVER (PARTITION BY pay_month).",
      "Calculate department monthly average salary using AVG(amount) OVER (PARTITION BY pay_month, department_id).",
      "Compare the two averages using CASE WHEN."
    ],
    trapsAndEdgeCases: [
      "Precision matching: Use standard floating point comparisons; 'same' triggers when department avg equals company avg exactly."
    ],
    solutionSQL: `WITH MonthlyAvgs AS (
    SELECT DISTINCT
           DATE_FORMAT(s.pay_date, '%Y-%m') AS pay_month,
           e.department_id,
           AVG(s.amount) OVER (PARTITION BY DATE_FORMAT(s.pay_date, '%Y-%m'), e.department_id) AS dept_avg,
           AVG(s.amount) OVER (PARTITION BY DATE_FORMAT(s.pay_date, '%Y-%m')) AS comp_avg
    FROM Salary s
    JOIN Employee e ON s.employee_id = e.employee_id
)
SELECT pay_month,
       department_id,
       CASE
           WHEN dept_avg > comp_avg THEN 'higher'
           WHEN dept_avg < comp_avg THEN 'lower'
           ELSE 'same'
       END AS comparison
FROM MonthlyAvgs;`,
    lineByLineExplanation: [
      { clause: "WITH MonthlyAvgs AS (...)", exp: "Computes department and company averages in parallel via window partitions." },
      { clause: "SELECT pay_month, department_id,", exp: "Emits month and department." },
      { clause: "CASE WHEN dept_avg > comp_avg THEN 'higher' ... END AS comparison", exp: "Classifies department performance against company baseline." }
    ],
    alternativeSolutions: [
      {
        name: "Two-Step Aggregation Join",
        complexity: "O(N log N)",
        sql: `WITH Dept AS (
  SELECT DATE_FORMAT(s.pay_date, '%Y-%m') AS pay_month, e.department_id, AVG(s.amount) AS dept_avg
  FROM Salary s JOIN Employee e ON s.employee_id = e.employee_id
  GROUP BY 1, 2
), Comp AS (
  SELECT DATE_FORMAT(pay_date, '%Y-%m') AS pay_month, AVG(amount) AS comp_avg
  FROM Salary GROUP BY 1
)
SELECT d.pay_month, d.department_id,
       CASE WHEN d.dept_avg > c.comp_avg THEN 'higher' WHEN d.dept_avg < c.comp_avg THEN 'lower' ELSE 'same' END AS comparison
FROM Dept d JOIN Comp c ON d.pay_month = c.pay_month;`,
        explanation: "Aggregates department and company tables independently and joins on pay_month."
      }
    ]
  },

  // 15. #1077 Project Employees III
  {
    id: 1077,
    title: "Project Employees III",
    difficulty: "Medium",
    acceptance: "75.8%",
    interviewFreq: "High • Amazon",
    companies: ["Amazon"],
    prompt: `Write a solution to report the most experienced employee in each project. In case of a tie, report all employees with the maximum number of experience years.`,
    sampleInput: { table: "Project / Employee", columns: ["project_id", "employee_id", "experience_years"], rows: [[1, 1, 3], [1, 2, 2], [1, 3, 3], [2, 1, 3], [2, 4, 2]] },
    expectedOutput: { columns: ["project_id", "employee_id"], rows: [[1, 1], [1, 3], [2, 1]] },
    svgDiagram: createDiagram(
      "LEETCODE #1077: MOST EXPERIENCED PROJECT MEMBERS",
      "Project 1",
      ["Emp 1: 3 yrs (Max)", "Emp 2: 2 yrs", "Emp 3: 3 yrs (Max)"],
      "Selected",
      ["Proj 1 -> Emp 1", "Proj 1 -> Emp 3", "Proj 2 -> Emp 1"],
      "DENSE_RANK() OVER\\n(PARTITION BY project_id ORDER BY yrs DESC)"
    ),
    logicBreakdown: [
      "Join Project and Employee on employee_id.",
      "Partition by project_id and rank employees by experience_years descending using DENSE_RANK().",
      "Filter for rnk = 1 to capture all ties."
    ],
    trapsAndEdgeCases: [
      "Ties must be included: Using ROW_NUMBER() would arbitrarily drop ties; DENSE_RANK() or RANK() is required."
    ],
    solutionSQL: `WITH Ranked AS (
    SELECT p.project_id,
           p.employee_id,
           DENSE_RANK() OVER (
               PARTITION BY p.project_id
               ORDER BY e.experience_years DESC
           ) AS rnk
    FROM Project p
    JOIN Employee e ON p.employee_id = e.employee_id
)
SELECT project_id, employee_id
FROM Ranked
WHERE rnk = 1;`,
    lineByLineExplanation: [
      { clause: "WITH Ranked AS (...)", exp: "Ranks employees within each project by experience." },
      { clause: "SELECT project_id, employee_id FROM Ranked WHERE rnk = 1", exp: "Filters for top experience rank including ties." }
    ],
    alternativeSolutions: [
      {
        name: "Correlated Subquery MAX",
        complexity: "O(N^2)",
        sql: `SELECT p.project_id, p.employee_id
FROM Project p
JOIN Employee e ON p.employee_id = e.employee_id
WHERE (p.project_id, e.experience_years) IN (
    SELECT p2.project_id, MAX(e2.experience_years)
    FROM Project p2
    JOIN Employee e2 ON p2.employee_id = e2.employee_id
    GROUP BY p2.project_id
);`,
        explanation: "Classic tuple IN filter against max experience years per project."
      }
    ]
  },

  // 16. #1082 Sales Analysis I
  {
    id: 1082,
    title: "Sales Analysis I",
    difficulty: "Easy",
    acceptance: "74.1%",
    interviewFreq: "High • Amazon",
    companies: ["Amazon"],
    prompt: `Write a solution to report the best seller by total sales price. If there is a tie, report them all.`,
    sampleInput: { table: "Sales", columns: ["seller_id", "product_id", "buyer_id", "sale_date", "quantity", "price"], rows: [[1, 1, 1, "2019-01-21", 2, 2000], [1, 2, 2, "2019-02-17", 1, 800], [2, 2, 3, "2019-06-02", 1, 800], [3, 3, 4, "2019-05-13", 2, 2800]] },
    expectedOutput: { columns: ["seller_id"], rows: [[1], [3]] },
    svgDiagram: createDiagram(
      "LEETCODE #1082: TOP REVENUE SELLERS (TIES INCLUDED)",
      "Sales Summary",
      ["Seller 1: $2,800 (Max)", "Seller 2: $800", "Seller 3: $2,800 (Max)"],
      "Best Sellers",
      ["seller_id: 1", "seller_id: 3"],
      "DENSE_RANK() OVER\\n(ORDER BY SUM(price) DESC) = 1"
    ),
    logicBreakdown: [
      "Group sales by seller_id and sum total revenue: SUM(price).",
      "Rank sellers by total sales descending with DENSE_RANK().",
      "Filter for rnk = 1 to include all tied top sellers."
    ],
    trapsAndEdgeCases: [
      "Ties omission: ORDER BY SUM(price) DESC LIMIT 1 fails on ties; DENSE_RANK() is required."
    ],
    solutionSQL: `WITH SellerRevenue AS (
    SELECT seller_id,
           DENSE_RANK() OVER (ORDER BY SUM(price) DESC) AS rnk
    FROM Sales
    GROUP BY seller_id
)
SELECT seller_id
FROM SellerRevenue
WHERE rnk = 1;`,
    lineByLineExplanation: [
      { clause: "WITH SellerRevenue AS (SELECT seller_id, DENSE_RANK() OVER (ORDER BY SUM(price) DESC) AS rnk ...)", exp: "Aggregates revenue and ranks sellers." },
      { clause: "SELECT seller_id FROM SellerRevenue WHERE rnk = 1", exp: "Filters for top rank." }
    ],
    alternativeSolutions: [
      {
        name: "HAVING SUM >= ALL",
        complexity: "O(N^2)",
        sql: `SELECT seller_id FROM Sales GROUP BY seller_id
HAVING SUM(price) >= ALL(SELECT SUM(price) FROM Sales GROUP BY seller_id);`,
        explanation: "Subquery with >= ALL quantifier."
      }
    ]
  },

  // 17. #1083 Sales Analysis II
  {
    id: 1083,
    title: "Sales Analysis II",
    difficulty: "Easy",
    acceptance: "52.3%",
    interviewFreq: "High • Amazon",
    companies: ["Amazon"],
    prompt: `Write a solution to report the buyers who have bought S8 but not iPhone. Note that S8 and iPhone are products presented in the Product table.`,
    sampleInput: { table: "Product / Sales", columns: ["product_id", "product_name", "buyer_id"], rows: [[1, "S8", 1], [2, "G4", 1], [3, "iPhone", 2], [1, "S8", 3], [3, "iPhone", 3]] },
    expectedOutput: { columns: ["buyer_id"], rows: [[1]] },
    svgDiagram: createDiagram(
      "LEETCODE #1083: SET DIFFERENCE: BOUGHT S8 BUT NOT IPHONE",
      "Buyer History",
      ["Buyer 1: S8, G4 (Valid ✓)", "Buyer 2: iPhone (No S8 ❌)", "Buyer 3: S8, iPhone (Has iPhone ❌)"],
      "Qualifying Buyers",
      ["buyer_id: 1"],
      "SUM(prod='S8') > 0 AND\\nSUM(prod='iPhone') = 0"
    ),
    logicBreakdown: [
      "Join Sales with Product to get product_name per sale.",
      "Group by buyer_id.",
      "Apply HAVING filter: SUM(product_name = 'S8') > 0 AND SUM(product_name = 'iPhone') = 0."
    ],
    trapsAndEdgeCases: [
      "Buyers who bought both: Buyer 3 bought both S8 and iPhone; they must be excluded."
    ],
    solutionSQL: `SELECT s.buyer_id
FROM Sales s
JOIN Product p ON s.product_id = p.product_id
GROUP BY s.buyer_id
HAVING SUM(p.product_name = 'S8') > 0
   AND SUM(p.product_name = 'iPhone') = 0;`,
    lineByLineExplanation: [
      { clause: "SELECT s.buyer_id FROM Sales s JOIN Product p ON s.product_id = p.product_id", exp: "Joins transactions with product catalog." },
      { clause: "GROUP BY s.buyer_id", exp: "Aggregates per buyer." },
      { clause: "HAVING SUM(p.product_name = 'S8') > 0 AND SUM(p.product_name = 'iPhone') = 0", exp: "Demands at least one S8 purchase and strictly zero iPhone purchases." }
    ],
    alternativeSolutions: [
      {
        name: "EXCEPT / NOT IN",
        complexity: "O(N log N)",
        sql: `SELECT DISTINCT buyer_id FROM Sales s JOIN Product p ON s.product_id = p.product_id WHERE p.product_name = 'S8'
AND buyer_id NOT IN (
  SELECT buyer_id FROM Sales s JOIN Product p ON s.product_id = p.product_id WHERE p.product_name = 'iPhone'
);`,
        explanation: "Set difference using NOT IN subquery."
      }
    ]
  },

  // 18. #1084 Sales Analysis III
  {
    id: 1084,
    title: "Sales Analysis III",
    difficulty: "Easy",
    acceptance: "44.9%",
    interviewFreq: "High • Amazon",
    companies: ["Amazon"],
    prompt: `Write a solution to report the products that were only sold in the first quarter of 2019. That is, between 2019-01-01 and 2019-03-31 inclusive.`,
    sampleInput: { table: "Product / Sales", columns: ["product_id", "product_name", "sale_date"], rows: [[1, "S8", "2019-01-21"], [1, "S8", "2019-02-17"], [2, "G4", "2019-02-17"], [2, "G4", "2019-06-02"], [3, "iPhone", "2019-05-13"]] },
    expectedOutput: { columns: ["product_id", "product_name"], rows: [[1, "S8"]] },
    svgDiagram: createDiagram(
      "LEETCODE #1084: STRICT DATE BOUNDARY CONTAINMENT",
      "Sales Dates",
      ["P1: Jan 21, Feb 17 (Q1 only ✓)", "P2: Feb 17, Jun 02 (Crosses into Q2 ❌)", "P3: May 13 (Q2 only ❌)"],
      "Strict Q1 Only",
      ["P1: S8"],
      "MIN(sale_date) >= '2019-01-01'\\nAND MAX(sale_date) <= '2019-03-31'"
    ),
    logicBreakdown: [
      "A product is sold 'only' in Q1 if its minimum sale date is >= 2019-01-01 AND its maximum sale date is <= 2019-03-31.",
      "Group Sales by product_id and enforce this min/max boundary in the HAVING clause.",
      "Join to Product to return product_id and product_name."
    ],
    trapsAndEdgeCases: [
      "Partial Q1 sales: If a product was sold in Q1 and also in Q2 (like P2), it must be disqualified."
    ],
    solutionSQL: `SELECT p.product_id, p.product_name
FROM Product p
JOIN Sales s ON p.product_id = s.product_id
GROUP BY p.product_id, p.product_name
HAVING MIN(s.sale_date) >= '2019-01-01'
   AND MAX(s.sale_date) <= '2019-03-31';`,
    lineByLineExplanation: [
      { clause: "SELECT p.product_id, p.product_name", exp: "Projects product identifiers." },
      { clause: "FROM Product p JOIN Sales s ON p.product_id = s.product_id", exp: "Joins products with transactions." },
      { clause: "GROUP BY p.product_id, p.product_name", exp: "Aggregates dates per product." },
      { clause: "HAVING MIN(s.sale_date) >= '2019-01-01' AND MAX(s.sale_date) <= '2019-03-31'", exp: "Ensures all sales fall exclusively within Q1 2019." }
    ],
    alternativeSolutions: [
      {
        name: "NOT IN Subquery",
        complexity: "O(N log N)",
        sql: `SELECT product_id, product_name FROM Product
WHERE product_id IN (SELECT product_id FROM Sales WHERE sale_date BETWEEN '2019-01-01' AND '2019-03-31')
  AND product_id NOT IN (SELECT product_id FROM Sales WHERE sale_date < '2019-01-01' OR sale_date > '2019-03-31');`,
        explanation: "Set exclusion checking for any sales outside the target window."
      }
    ]
  },

  // 19. #1098 Unpopular Books
  {
    id: 1098,
    title: "Unpopular Books",
    difficulty: "Medium",
    acceptance: "44.7%",
    interviewFreq: "High • Bloomberg, Amazon",
    companies: ["Bloomberg", "Amazon"],
    prompt: `Write a solution to report the books that have sold less than 10 copies in the last year, excluding books that have been available for less than one month from today (assume today is 2019-06-23).`,
    sampleInput: { table: "Books / Orders", columns: ["book_id", "name", "available_from", "quantity", "dispatch_date"], rows: [[1, "Kalila And Demna", "2010-01-01", 2, "2018-07-26"], [2, "28 Letters", "2012-05-12", 8, "2019-06-01"], [3, "The Hobbit", "2019-06-10", 0, null]] },
    expectedOutput: { columns: ["book_id", "name"], rows: [[1, "Kalila And Demna"]] },
    svgDiagram: createDiagram(
      "LEETCODE #1098: RECENT AVAILABILITY & LOW VOLUME FILTER",
      "Books & 1-Yr Sales",
      ["B1: Sold 2 in past yr (Unpopular ✓)", "B2: Sold 28 in past yr (Popular ❌)", "B3: Avail June 10 (< 1 mo ❌)"],
      "Unpopular",
      ["book_id: 1"],
      "available_from < '2019-05-23'\\nAND SUM(past_yr_qty) < 10"
    ),
    logicBreakdown: [
      "Availability threshold: Exclude books available less than 1 month before 2019-06-23 -> available_from < '2019-05-23'.",
      "Sales window: Only count orders placed in the last year: dispatch_date BETWEEN '2018-06-23' AND '2019-06-23'.",
      "LEFT JOIN Books with the filtered orders and group by book_id.",
      "HAVING IFNULL(SUM(quantity), 0) < 10."
    ],
    trapsAndEdgeCases: [
      "Join predicate placement: Date filtering for orders must be in the ON clause, NOT the WHERE clause, otherwise books with 0 sales are improperly filtered out."
    ],
    solutionSQL: `SELECT b.book_id, b.name
FROM Books b
LEFT JOIN Orders o
  ON b.book_id = o.book_id
 AND o.dispatch_date BETWEEN '2018-06-23' AND '2019-06-23'
WHERE b.available_from < '2019-05-23'
GROUP BY b.book_id, b.name
HAVING IFNULL(SUM(o.quantity), 0) < 10;`,
    lineByLineExplanation: [
      { clause: "SELECT b.book_id, b.name", exp: "Projects book details." },
      { clause: "FROM Books b LEFT JOIN Orders o ON ... AND o.dispatch_date BETWEEN '2018-06-23' AND '2019-06-23'", exp: "Preserves books with zero orders in the past year." },
      { clause: "WHERE b.available_from < '2019-05-23'", exp: "Filters out books launched less than a month ago." },
      { clause: "GROUP BY b.book_id, b.name HAVING IFNULL(SUM(o.quantity), 0) < 10", exp: "Filters for books with fewer than 10 copies sold." }
    ],
    alternativeSolutions: [
      {
        name: "Subquery Aggregation",
        complexity: "O(N log N)",
        sql: `SELECT book_id, name FROM Books
WHERE available_from < '2019-05-23'
  AND book_id NOT IN (
    SELECT book_id FROM Orders
    WHERE dispatch_date BETWEEN '2018-06-23' AND '2019-06-23'
    GROUP BY book_id HAVING SUM(quantity) >= 10
);`,
        explanation: "Subquery identifying books with >= 10 sales and excluding them."
      }
    ]
  },

  // 20. #1112 Highest Grade For Each Student
  {
    id: 1112,
    title: "Highest Grade For Each Student",
    difficulty: "Medium",
    acceptance: "71.6%",
    interviewFreq: "High • Coursera, Amazon",
    companies: ["Coursera", "Amazon"],
    prompt: `Write a solution to find the highest grade with its corresponding course for each student. In case of a tie, you should find the course with the smallest course_id. Return the result table ordered by student_id in ascending order.`,
    sampleInput: { table: "Enrollments", columns: ["student_id", "course_id", "grade"], rows: [[2, 2, 95], [2, 3, 95], [1, 1, 90], [1, 2, 99], [3, 1, 80], [3, 2, 75], [3, 3, 82]] },
    expectedOutput: { columns: ["student_id", "course_id", "grade"], rows: [[1, 2, 99], [2, 2, 95], [3, 3, 82]] },
    svgDiagram: createDiagram(
      "LEETCODE #1112: TIE-BREAKING ON LOWEST COURSE ID",
      "Enrollments",
      ["S2: C2 (95), C3 (95) (Tie)", "S1: C1 (90), C2 (99)", "S3: C3 (82)"],
      "Selected",
      ["S1: C2 (99)", "S2: C2 (95) (Lower course_id)", "S3: C3 (82)"],
      "ROW_NUMBER() OVER(PARTITION BY student\\nORDER BY grade DESC, course_id ASC)"
    ),
    logicBreakdown: [
      "Partition by student_id.",
      "Order by grade DESC to find the highest score.",
      "Order by course_id ASC to break ties by lowest course number.",
      "Assign ROW_NUMBER() and filter WHERE rnk = 1."
    ],
    trapsAndEdgeCases: [
      "DENSE_RANK() trap: Using DENSE_RANK() returns both courses in a tie; ROW_NUMBER() is required to strictly pick one course."
    ],
    solutionSQL: `WITH RankedCourses AS (
    SELECT student_id,
           course_id,
           grade,
           ROW_NUMBER() OVER (
               PARTITION BY student_id
               ORDER BY grade DESC, course_id ASC
           ) AS rnk
    FROM Enrollments
)
SELECT student_id, course_id, grade
FROM RankedCourses
WHERE rnk = 1
ORDER BY student_id ASC;`,
    lineByLineExplanation: [
      { clause: "WITH RankedCourses AS (...)", exp: "Ranks courses per student by grade desc, course_id asc." },
      { clause: "SELECT student_id, course_id, grade FROM RankedCourses WHERE rnk = 1", exp: "Picks top course per student." },
      { clause: "ORDER BY student_id ASC", exp: "Sorts final output by student ID." }
    ],
    alternativeSolutions: [
      {
        name: "Tuple IN Subquery",
        complexity: "O(N^2)",
        sql: `SELECT student_id, MIN(course_id) AS course_id, grade
FROM Enrollments
WHERE (student_id, grade) IN (
    SELECT student_id, MAX(grade) FROM Enrollments GROUP BY student_id
)
GROUP BY student_id, grade
ORDER BY student_id ASC;`,
        explanation: "Finds max grade per student and aggregates with MIN(course_id)."
      }
    ]
  },

  // 21. #1126 Active Businesses
  {
    id: 1126,
    title: "Active Businesses",
    difficulty: "Medium",
    acceptance: "68.2%",
    interviewFreq: "High • Yelp, Google",
    companies: ["Yelp", "Google"],
    prompt: `An active business is a business that has more than one event_type with occurrences greater than the average occurrences of that event_type among all businesses.\nWrite a solution to find all active businesses.`,
    sampleInput: { table: "Events", columns: ["business_id", "event_type", "occurences"], rows: [[1, "reviews", 7], [3, "reviews", 3], [1, "ads", 11], [2, "ads", 7], [3, "ads", 6], [1, "photo", 3], [2, "photo", 1]] },
    expectedOutput: { columns: ["business_id"], rows: [[1]] },
    svgDiagram: createDiagram(
      "LEETCODE #1126: MULTI-EVENT ABOVE-AVERAGE BENCHMARK",
      "Events",
      ["B1: reviews=7 (> avg 5)", "B1: ads=11 (> avg 8)", "B1 has 2 above-average events"],
      "Active Business",
      ["business_id: 1"],
      "AVG(occurences) OVER(PARTITION BY type)\\nHAVING COUNT(*) > 1"
    ),
    logicBreakdown: [
      "Calculate the average occurrences for each event_type across all businesses using AVG(occurences) OVER (PARTITION BY event_type).",
      "Filter for rows where occurrences > event_type average.",
      "Group by business_id and filter HAVING COUNT(*) > 1."
    ],
    trapsAndEdgeCases: [
      "Strict inequality: Must be strictly greater than average (occurences > avg_occurences)."
    ],
    solutionSQL: `WITH EventAverages AS (
    SELECT business_id,
           event_type,
           occurences,
           AVG(occurences) OVER (PARTITION BY event_type) AS avg_occ
    FROM Events
)
SELECT business_id
FROM EventAverages
WHERE occurences > avg_occ
GROUP BY business_id
HAVING COUNT(*) > 1;`,
    lineByLineExplanation: [
      { clause: "WITH EventAverages AS (...)", exp: "Computes event category averages via window function." },
      { clause: "SELECT business_id FROM EventAverages", exp: "Source filtered events." },
      { clause: "WHERE occurences > avg_occ", exp: "Retains only above-average event records." },
      { clause: "GROUP BY business_id HAVING COUNT(*) > 1", exp: "Demands at least two distinct qualifying events." }
    ],
    alternativeSolutions: [
      {
        name: "JOIN with Grouped Aggregation",
        complexity: "O(N log N)",
        sql: `SELECT e.business_id
FROM Events e
JOIN (
    SELECT event_type, AVG(occurences) AS avg_occ
    FROM Events
    GROUP BY event_type
) avg_t ON e.event_type = avg_t.event_type
WHERE e.occurences > avg_t.avg_occ
GROUP BY e.business_id
HAVING COUNT(*) > 1;`,
        explanation: "Joins against subquery of category averages."
      }
    ]
  },

  // 22. #1127 User Purchase Platform
  {
    id: 1127,
    title: "User Purchase Platform",
    difficulty: "Hard",
    acceptance: "43.5%",
    interviewFreq: "Very High • Amazon",
    companies: ["Amazon"],
    prompt: `Write a solution to find the total number of users and the total amount spent using mobile only, desktop only, and both mobile and desktop together for each date.`,
    sampleInput: { table: "Spending", columns: ["user_id", "spend_date", "platform", "amount"], rows: [[1, "2019-07-01", "mobile", 100], [1, "2019-07-01", "desktop", 100], [2, "2019-07-01", "mobile", 100], [2, "2019-07-02", "mobile", 100], [3, "2019-07-01", "desktop", 100], [3, "2019-07-02", "desktop", 100]] },
    expectedOutput: { columns: ["spend_date", "platform", "total_amount", "total_users"], rows: [["2019-07-01", "desktop", 100, 1], ["2019-07-01", "mobile", 100, 1], ["2019-07-01", "both", 200, 1], ["2019-07-02", "desktop", 100, 1], ["2019-07-02", "mobile", 100, 1], ["2019-07-02", "both", 0, 0]] },
    svgDiagram: createDiagram(
      "LEETCODE #1127: CROSS JOIN PLATFORM GRID WITH ZERO-FILL",
      "User Daily Activity",
      ["U1: Mobile & Desktop -> 'both'", "U2: Mobile only -> 'mobile'", "U3: Desktop only -> 'desktop'"],
      "All Platforms",
      ["desktop: $100 (1 user)", "mobile: $100 (1 user)", "both: $200 (1 user)"],
      "CROSS JOIN (desktop, mobile, both)\\nLEFT JOIN UserPlatformActivity"
    ),
    logicBreakdown: [
      "Determine each user's platform per date: if COUNT(DISTINCT platform) = 2 THEN 'both' ELSE MAX(platform).",
      "Generate the full cartesian template grid: all distinct spend_date CROSS JOIN ('desktop', 'mobile', 'both').",
      "LEFT JOIN the template grid with the aggregated user activity.",
      "Aggregate with SUM(amount) and COUNT(user_id), coalescing nulls to 0."
    ],
    trapsAndEdgeCases: [
      "Zero-spending platform categories: A date might have 0 'both' users; it must still emit a row with total_amount = 0 and total_users = 0."
    ],
    solutionSQL: `WITH UserPlatform AS (
    SELECT spend_date,
           user_id,
           CASE WHEN COUNT(DISTINCT platform) = 2 THEN 'both' ELSE MAX(platform) END AS platform,
           SUM(amount) AS amount
    FROM Spending
    GROUP BY spend_date, user_id
),
DatePlatformGrid AS (
    SELECT DISTINCT spend_date, 'desktop' AS platform FROM Spending
    UNION
    SELECT DISTINCT spend_date, 'mobile' AS platform FROM Spending
    UNION
    SELECT DISTINCT spend_date, 'both' AS platform FROM Spending
)
SELECT g.spend_date,
       g.platform,
       IFNULL(SUM(u.amount), 0) AS total_amount,
       COUNT(u.user_id) AS total_users
FROM DatePlatformGrid g
LEFT JOIN UserPlatform u
  ON g.spend_date = u.spend_date
 AND g.platform = u.platform
GROUP BY g.spend_date, g.platform;`,
    lineByLineExplanation: [
      { clause: "WITH UserPlatform AS (...)", exp: "Classifies each user on each date as 'mobile', 'desktop', or 'both'." },
      { clause: "DatePlatformGrid AS (...)", exp: "Creates full Cartesian template of all 3 platforms for every distinct date." },
      { clause: "SELECT g.spend_date, g.platform, IFNULL(SUM(u.amount), 0) AS total_amount, COUNT(u.user_id) AS total_users", exp: "Left joins and folds null totals into clean zero-counts." }
    ],
    alternativeSolutions: [
      {
        name: "Explicit CROSS JOIN",
        complexity: "O(D * 3)",
        sql: `WITH Platforms AS (SELECT 'desktop' AS platform UNION SELECT 'mobile' UNION SELECT 'both'),
Dates AS (SELECT DISTINCT spend_date FROM Spending),
Grid AS (SELECT d.spend_date, p.platform FROM Dates d CROSS JOIN Platforms p)
SELECT ... FROM Grid g LEFT JOIN ...;`,
        explanation: "Modular cross join separation between distinct dates and platform list."
      }
    ]
  },

  // 23. #1132 Reported Posts II
  {
    id: 1132,
    title: "Reported Posts II",
    difficulty: "Medium",
    acceptance: "39.6%",
    interviewFreq: "High • Meta",
    companies: ["Meta"],
    prompt: `Write a solution to find the average daily percentage of posts that got removed after being reported as spam, rounded to 2 decimal places.`,
    sampleInput: { table: "Actions / Removals", columns: ["post_id", "action_date", "action", "extra", "remove_date"], rows: [[1, "2019-07-01", "report", "spam", "2019-07-01"], [2, "2019-07-01", "report", "spam", null], [3, "2019-07-01", "report", "spam", null], [4, "2019-07-02", "report", "spam", "2019-07-03"]] },
    expectedOutput: { columns: ["average_daily_percent"], rows: [[75.00]] },
    svgDiagram: createDiagram(
      "LEETCODE #1132: DAILY AVERAGE SPAM REMOVAL PERCENTAGE",
      "Daily Spam Reports",
      ["July 01: 1 removed / 3 reported = 33.33%", "July 02: 1 removed / 1 reported = 100.00%"],
      "Average Rate",
      ["average_daily_percent: 66.67%"],
      "AVG(daily_removed / daily_spam) * 100"
    ),
    logicBreakdown: [
      "Filter Actions for action = 'report' AND extra = 'spam'.",
      "For each action_date, count distinct post_ids reported as spam, and distinct post_ids present in Removals.",
      "Calculate daily_percent = (distinct removed / distinct reported) * 100.",
      "Compute AVG(daily_percent) across all qualifying dates and round to 2 decimal places."
    ],
    trapsAndEdgeCases: [
      "Duplicate report actions: Users may report the same post multiple times on the same date; COUNT(DISTINCT post_id) is mandatory."
    ],
    solutionSQL: `WITH DailySpam AS (
    SELECT a.action_date,
           COUNT(DISTINCT r.post_id) / COUNT(DISTINCT a.post_id) * 100.0 AS daily_percent
    FROM Actions a
    LEFT JOIN Removals r ON a.post_id = r.post_id
    WHERE a.action = 'report' AND a.extra = 'spam'
    GROUP BY a.action_date
)
SELECT ROUND(AVG(daily_percent), 2) AS average_daily_percent
FROM DailySpam;`,
    lineByLineExplanation: [
      { clause: "WITH DailySpam AS (SELECT a.action_date, COUNT(DISTINCT r.post_id) / COUNT(DISTINCT a.post_id) * 100.0 AS daily_percent ...)", exp: "Calculates the distinct spam removal ratio per date." },
      { clause: "SELECT ROUND(AVG(daily_percent), 2) AS average_daily_percent", exp: "Averages daily percentages and rounds to 2 decimals." }
    ],
    alternativeSolutions: [
      {
        name: "Derived Table Inline Average",
        complexity: "O(N log N)",
        sql: `SELECT ROUND(AVG(daily_ratio) * 100, 2) AS average_daily_percent
FROM (
  SELECT action_date, COUNT(DISTINCT r.post_id) / COUNT(DISTINCT a.post_id) AS daily_ratio
  FROM Actions a LEFT JOIN Removals r ON a.post_id = r.post_id
  WHERE a.action = 'report' AND a.extra = 'spam' GROUP BY a.action_date
) t;`,
        explanation: "Equivalent derived table formatting percentage at outer aggregation."
      }
    ]
  },

  // 24. #1158 Market Analysis I
  {
    id: 1158,
    title: "Market Analysis I",
    difficulty: "Medium",
    acceptance: "58.4%",
    interviewFreq: "Very High • Etsy, Amazon",
    companies: ["Etsy", "Amazon"],
    prompt: `Write a solution to find for each user, the join date and the number of orders they made as a buyer in 2019. Return the result table in any order.`,
    sampleInput: { table: "Users / Orders", columns: ["user_id", "join_date", "order_id", "order_date", "buyer_id"], rows: [[1, "2018-01-01", 1, "2019-08-01", 1], [2, "2018-02-09", 2, "2018-08-02", 2], [3, "2018-01-19", null, null, null]] },
    expectedOutput: { columns: ["buyer_id", "join_date", "orders_in_2019"], rows: [[1, "2018-01-01", 1], [2, "2018-02-09", 0], [3, "2018-01-19", 0]] },
    svgDiagram: createDiagram(
      "LEETCODE #1158: 2019 ORDER VOLUME WITH ZERO-COUNT PRESERVATION",
      "Users & Orders",
      ["U1: 1 order in 2019", "U2: 1 order in 2018 (Not 2019)", "U3: 0 orders total"],
      "Result",
      ["U1: orders_in_2019 = 1", "U2: orders_in_2019 = 0", "U3: orders_in_2019 = 0"],
      "LEFT JOIN Orders ON buyer_id = user_id\\nAND YEAR(order_date) = 2019"
    ),
    logicBreakdown: [
      "Every user from Users must appear in the output, even if they have 0 orders in 2019.",
      "LEFT JOIN Users with Orders.",
      "Crucial predicate placement: YEAR(order_date) = 2019 must be in the ON clause! If placed in WHERE, it converts the LEFT JOIN into an INNER JOIN, dropping users with 0 orders.",
      "Aggregate using COUNT(o.order_id)."
    ],
    trapsAndEdgeCases: [
      "WHERE clause filtering trap: Filtering order date in WHERE drops users who joined in 2018 or have zero 2019 orders."
    ],
    solutionSQL: `SELECT u.user_id AS buyer_id,
       u.join_date,
       COUNT(o.order_id) AS orders_in_2019
FROM Users u
LEFT JOIN Orders o
  ON u.user_id = o.buyer_id
 AND YEAR(o.order_date) = 2019
GROUP BY u.user_id, u.join_date;`,
    lineByLineExplanation: [
      { clause: "SELECT u.user_id AS buyer_id, u.join_date,", exp: "Emits user ID and registration timestamp." },
      { clause: "COUNT(o.order_id) AS orders_in_2019", exp: "Counts non-null 2019 orders." },
      { clause: "FROM Users u LEFT JOIN Orders o ON u.user_id = o.buyer_id AND YEAR(o.order_date) = 2019", exp: "Left joins with date filter in ON clause to preserve 0-order users." },
      { clause: "GROUP BY u.user_id, u.join_date", exp: "Groups per user." }
    ],
    alternativeSolutions: [
      {
        name: "Subquery Pre-Aggregation",
        complexity: "O(N log N)",
        sql: `SELECT u.user_id AS buyer_id, u.join_date, IFNULL(o.cnt, 0) AS orders_in_2019
FROM Users u
LEFT JOIN (
  SELECT buyer_id, COUNT(*) AS cnt FROM Orders WHERE YEAR(order_date) = 2019 GROUP BY buyer_id
) o ON u.user_id = o.buyer_id;`,
        explanation: "Pre-aggregates 2019 orders before joining."
      }
    ]
  },

  // 25. #1159 Market Analysis II
  {
    id: 1159,
    title: "Market Analysis II",
    difficulty: "Hard",
    acceptance: "52.8%",
    interviewFreq: "Very High • Etsy, Amazon",
    companies: ["Etsy", "Amazon"],
    prompt: `Write a solution to find for each user whether the brand of the second item (by date) they sold is their favorite brand. If a user sold less than two items, report 'no' for that user.`,
    sampleInput: { table: "Users / Orders / Items", columns: ["user_id", "favorite_brand", "order_date", "item_id", "seller_id", "item_brand"], rows: [[1, "Lenovo", "2019-08-01", 4, 1, "Lenovo"], [1, "Lenovo", "2019-08-02", 2, 1, "Lenovo"], [2, "Samsung", "2019-08-02", 2, 2, "Lenovo"]] },
    expectedOutput: { columns: ["seller_id", "2nd_item_fav_brand"], rows: [[1, "yes"], [2, "no"]] },
    svgDiagram: createDiagram(
      "LEETCODE #1159: SECOND ORDER FAVORITE BRAND VERIFICATION",
      "Seller Activity",
      ["U1: 2nd item brand = 'Lenovo' (Fav = Lenovo ✓)", "U2: 2nd item brand = 'Lenovo' (Fav = Samsung ❌)"],
      "Verification",
      ["U1: 'yes'", "U2: 'no'"],
      "ROW_NUMBER() OVER(PARTITION BY seller\\nORDER BY date) = 2"
    ),
    logicBreakdown: [
      "Use ROW_NUMBER() partitioned by seller_id ordered by order_date ASC to index sales chronologically.",
      "Filter for rnk = 2 to isolate each seller's second sale.",
      "Join the second order with Items to determine item_brand.",
      "LEFT JOIN Users with this second order table, checking IF(u.favorite_brand = item_brand, 'yes', 'no')."
    ],
    trapsAndEdgeCases: [
      "Sellers with 0 or 1 sale: Must still be returned in output with 'no'."
    ],
    solutionSQL: `WITH RankedOrders AS (
    SELECT o.seller_id,
           o.item_id,
           ROW_NUMBER() OVER (
               PARTITION BY o.seller_id
               ORDER BY o.order_date ASC
           ) AS rnk
    FROM Orders o
),
SecondOrders AS (
    SELECT r.seller_id,
           i.item_brand
    FROM RankedOrders r
    JOIN Items i ON r.item_id = i.item_id
    WHERE r.rnk = 2
)
SELECT u.user_id AS seller_id,
       CASE
           WHEN s.item_brand = u.favorite_brand THEN 'yes'
           ELSE 'no'
       END AS 2nd_item_fav_brand
FROM Users u
LEFT JOIN SecondOrders s ON u.user_id = s.seller_id;`,
    lineByLineExplanation: [
      { clause: "WITH RankedOrders AS (SELECT o.seller_id, o.item_id, ROW_NUMBER() OVER (...) AS rnk FROM Orders o)", exp: "Ranks sales per seller by date." },
      { clause: "SecondOrders AS (SELECT r.seller_id, i.item_brand FROM RankedOrders r JOIN Items i ... WHERE r.rnk = 2)", exp: "Extracts brand of the exact second sale." },
      { clause: "SELECT u.user_id AS seller_id, CASE WHEN s.item_brand = u.favorite_brand THEN 'yes' ELSE 'no' END AS 2nd_item_fav_brand", exp: "Left joins with all users and tests favorite brand match." }
    ],
    alternativeSolutions: [
      {
        name: "Correlated Subquery",
        complexity: "O(N log N)",
        sql: `SELECT u.user_id AS seller_id,
       IFNULL((
           SELECT IF(i.item_brand = u.favorite_brand, 'yes', 'no')
           FROM Orders o JOIN Items i ON o.item_id = i.item_id
           WHERE o.seller_id = u.user_id ORDER BY o.order_date LIMIT 1 OFFSET 1
       ), 'no') AS 2nd_item_fav_brand
FROM Users u;`,
        explanation: "Correlated scalar subquery with LIMIT 1 OFFSET 1."
      }
    ]
  }
];

module.exports = problemsBatch1;
