/**
 * SQL FOUNDRY - MASTERY COURSE ENGINE (REVAMPED)
 * 10-Topic Comprehensive Masterclass in Natural Order of Learning & Execution
 * - Plain-English, Human-First Teaching Language (Zero Overwhelming Jargon)
 * - Interactive Live Simulators for all 10 Topics (Theme-Native)
 * - 4-Step Order of Learning:
 *     Step 1: 📖 Learn & Visualize (Interactive Simulator + Rich Lesson)
 *     Step 2: 🧠 Quick Quiz (3-4 Practical MCQs with Explanations)
 *     Step 3: 🏢 Real Company Case (Netflix, Spotify, Uber, Amazon, Stripe)
 *     Step 4: ⚡ Try in Query Studio (1-Click Execution Sandbox)
 */

window.MasteryCourseEngine = (function () {
  'use strict';

  // State Management
  const state = {
    activePhaseId: 'phase_01_joins',
    activeStep: 'theory', // 'theory', 'mcqs', 'case', 'problem'
    completedPhases: new Set(),
    mcqAnswers: {}, // key: `${phaseId}_${qIdx}` => selectedOptionIndex
    showSolution: {}, // key: phaseId => boolean
    simState: {
      phase_01_joins: 'inner', // 'inner', 'left', 'right', 'full'
      phase_02_where: 'salary_gt_100k', // 'salary_gt_100k', 'dept_eng', 'tenure_gte_18', 'all'
      phase_03_groupby: 'count', // 'count', 'sum', 'avg', 'min_max'
      phase_04_having: 'count_gte_3', // 'count_gte_3', 'avg_gte_115k', 'all'
      phase_05_select_window: 'row_number', // 'row_number', 'rank', 'dense_rank', 'running_total'
      phase_06_distinct: 'distinct_city', // 'all', 'distinct_city', 'distinct_pair'
      phase_07_orderby: 'salary_desc', // 'salary_desc', 'name_asc', 'dept_salary'
      phase_08_limit_offset: 'page_1', // 'page_1', 'page_2', 'page_3'
      phase_09_ctes: 'both', // 'cte_only', 'query_only', 'both'
      phase_10_storage_defense: 'seek' // 'scan', 'seek'
    }
  };

  // Load progress from localStorage safely
  try {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('sql_mastery_course_completed_v2');
      if (saved) {
        JSON.parse(saved).forEach(id => state.completedPhases.add(id));
      }
    }
  } catch (e) {
    console.warn('Failed to load completed phases from localStorage', e);
  }

  // Sample Mock Datasets for Interactive Simulators
  const SIM_DATA = {
    orders: [
      { order_id: 101, customer_id: 5, amount: '$250', date: '2024-01-12' },
      { order_id: 102, customer_id: 8, amount: '$120', date: '2024-01-14' },
      { order_id: 103, customer_id: 9, amount: '$80',  date: '2024-01-15' }, // No matching customer
      { order_id: 104, customer_id: 5, amount: '$310', date: '2024-01-18' }
    ],
    customers: [
      { customer_id: 5, name: 'Alice Smith', city: 'London' },
      { customer_id: 8, name: 'Bob Jones', city: 'New York' },
      { customer_id: 12, name: 'Charlie Lee', city: 'Tokyo' } // Has no orders
    ],
    employees: [
      { id: 101, name: 'Ashley Miller', dept: 'Analytics', salary: 115000, tenure: 14 },
      { id: 102, name: 'David Chen', dept: 'Engineering', salary: 125000, tenure: 36 },
      { id: 103, name: 'Julia Smith', dept: 'Analytics', salary: 92000, tenure: 8 },
      { id: 104, name: 'Kevin Brown', dept: 'Finance', salary: 88000, tenure: 22 },
      { id: 105, name: 'Samantha Davis', dept: 'Engineering', salary: 145000, tenure: 48 },
      { id: 106, name: 'Patrick Wilson', dept: 'Sales', salary: 62000, tenure: 6 },
      { id: 107, name: 'Rose Taylor', dept: 'Finance', salary: 108000, tenure: 19 },
      { id: 108, name: 'Belvet Anderson', dept: 'Analytics', salary: 97000, tenure: 11 }
    ]
  };

  // ===========================================================================
  // 10 COMPREHENSIVE CURRICULUM TOPICS
  // ===========================================================================
  const PHASES = [
    // -------------------------------------------------------------------------
    // TOPIC 01: COMBINING TABLES WITH JOINS
    // -------------------------------------------------------------------------
    {
      id: 'phase_01_joins',
      seq: '01',
      title: 'Combining Tables with JOINs',
      name: 'Connecting Related Data Across Tables (INNER, LEFT, RIGHT, FULL)',
      shortName: '01. JOINs',
      icon: '🔗',
      execRank: 'Executes 1st (FROM & JOIN)',
      summary: 'Learn how to combine rows from multiple tables using shared ID keys like puzzle pieces.',

      lesson: {
        intro: `In real applications, data is rarely stored in a single giant spreadsheet. Instead, databases split data across related tables to avoid repeating information. For example, your store might have an <code>Orders</code> table and a <code>Customers</code> table. A **JOIN** lets you connect rows from both tables using a shared key (like <code>customer_id</code>).`,
        analogy: `Think of a JOIN like matching puzzle pieces. You hold an Order ticket with Customer ID #5, look up Customer #5 in your customer directory, and copy their name and shipping address onto the order receipt.`,
        steps: [
          {
            title: '1. The 4 Essential Types of Joins',
            body: `
- **INNER JOIN**: Only keeps rows that find a match in **both** tables. If a customer never placed an order, or an order has an invalid customer ID, they are excluded.
- **LEFT JOIN**: Keeps **every single row** from the left table, regardless of whether a match exists on the right. Missing matches on the right are filled with <code>NULL</code>.
- **RIGHT JOIN**: The mirror image of LEFT JOIN—keeps all rows from the right table.
- **FULL OUTER JOIN**: Keeps **everything** from both tables, filling <code>NULL</code> on whichever side is missing.
`
          },
          {
            title: '2. Basic Syntax & How to Write It',
            body: `
\`\`\`sql
-- Example: Fetch each order with the customer's name
SELECT 
  o.order_id, 
  o.amount, 
  c.name, 
  c.city
FROM Orders o
INNER JOIN Customers c ON o.customer_id = c.customer_id;
\`\`\`
- <code>FROM Orders o</code>: Defines the left table and gives it a handy alias <code>o</code>.
- <code>INNER JOIN Customers c</code>: Defines the right table with alias <code>c</code>.
- <code>ON o.customer_id = c.customer_id</code>: The matching rule (the shared puzzle tab).
`
          },
          {
            title: '3. Why Execution Order Matters (Executes 1st)',
            body: `The database engine executes <code>FROM & JOIN</code> **first**, before it filters rows or calculates anything. It builds the combined dataset in memory first so that subsequent clauses (like <code>WHERE</code> and <code>SELECT</code>) have all the columns available to work with.`
          }
        ],
        proTips: [
          {
            title: 'The Silent Killer: Filtering a LEFT JOIN in the WHERE Clause',
            text: 'If you do a LEFT JOIN and then write <code>WHERE c.city = "London"</code>, any customer that was NULL gets dropped! This accidentally turns your LEFT JOIN back into an INNER JOIN. Put the condition inside the <code>ON</code> clause instead if you want to keep all left rows.'
          },
          {
            title: 'Always Qualify Column Names',
            text: 'If both tables have an <code>id</code> column, writing <code>SELECT id</code> will throw an "ambiguous column name" error. Always specify the table prefix like <code>o.order_id</code> or <code>c.customer_id</code>.'
          }
        ]
      },

      diff: {
        badTitle: 'Anti-Pattern: Accidental Cartesian Product (Missing ON)',
        badSql: `-- DANGEROUS: Forgetting the ON condition
SELECT o.order_id, c.name
FROM Orders o, Customers c;`,
        badExplanation: 'Without a matching condition, the database pairs every order with EVERY customer (e.g. 1,000 orders x 1,000 customers = 1,000,000 rows!).',
        goodTitle: 'Best Practice: Explicit Explicit INNER/LEFT JOIN with ON',
        goodSql: `-- CLEAN & SAFE: Explicit JOIN syntax
SELECT o.order_id, o.amount, c.name
FROM Orders o
INNER JOIN Customers c ON o.customer_id = c.customer_id;`,
        goodExplanation: 'Explicit JOIN syntax is readable, prevents accidental row explosions, and makes the matching condition crystal clear.'
      },

      mcqs: [
        {
          id: 'mcq_p1_1',
          question: 'You want a list of ALL customers, including those who have never placed an order. Which JOIN should you use?',
          options: [
            'INNER JOIN Orders ON Customers.id = Orders.customer_id',
            'LEFT JOIN Orders ON Customers.id = Orders.customer_id (with Customers as the left table)',
            'CROSS JOIN Orders',
            'RIGHT JOIN Customers (with Orders as the right table)'
          ],
          correct: 1,
          explanation: 'LEFT JOIN preserves all rows from the primary (left) table even if no matching records exist in the joined table.'
        },
        {
          id: 'mcq_p1_2',
          question: 'What value appears in the joined columns when a LEFT JOIN finds no match in the right table?',
          options: [
            '0 (Zero)',
            'An empty string ""',
            'NULL',
            'The database throws an error'
          ],
          correct: 2,
          explanation: 'In SQL, missing data on the unmatched side of an outer join is represented as NULL.'
        },
        {
          id: 'mcq_p1_3',
          question: 'How do you find customers who have NEVER placed any orders?',
          options: [
            'SELECT * FROM Customers WHERE orders = 0',
            'SELECT c.* FROM Customers c LEFT JOIN Orders o ON c.customer_id = o.customer_id WHERE o.order_id IS NULL',
            'SELECT * FROM Customers INNER JOIN Orders ON c.id <> o.customer_id',
            'SELECT * FROM Customers WHERE order_id = NULL'
          ],
          correct: 1,
          explanation: 'This is the classic "Left Anti-Join" pattern. A LEFT JOIN brings all customers; filtering WHERE right_id IS NULL keeps only those without orders.'
        }
      ],

      caseStudy: {
        company: 'Spotify',
        role: 'Data Analyst',
        title: 'Identifying Inactive Subscribers for Win-Back Campaign',
        scenario: 'Spotify wants to run a re-engagement email campaign for users who have an active Premium subscription but have listened to zero songs in the last 30 days. You need to combine the Users table with the RecentStreams table to find users with no stream activity.',
        schema: 'Users: (user_id INT, email VARCHAR, plan_type VARCHAR)\nRecentStreams: (stream_id INT, user_id INT, song_id INT, stream_date DATE)',
        recommendedQuery: `SELECT 
  u.user_id,
  u.email,
  u.plan_type
FROM Users u
LEFT JOIN RecentStreams s ON u.user_id = s.user_id
WHERE u.plan_type = 'Premium'
  AND s.stream_id IS NULL;`
      },

      problem: {
        title: 'Find Customers With Unsettled Orders',
        difficulty: 'easy',
        spec: 'Write a query returning customer_id, first_name, and city from Customers, joined with Orders, displaying their order_id and order_total. If a customer has no orders, their customer info should still appear with NULL order details.',
        starterSql: `SELECT 
  c.customer_id,
  c.first_name,
  c.city,
  o.order_id,
  o.order_total
FROM Customers c
LEFT JOIN Orders o ON c.customer_id = o.customer_id
ORDER BY c.customer_id;`,
        targetTable: 'Customers'
      }
    },

    // -------------------------------------------------------------------------
    // TOPIC 02: FILTERING ROWS WITH WHERE
    // -------------------------------------------------------------------------
    {
      id: 'phase_02_where',
      seq: '02',
      title: 'Filtering Rows with WHERE',
      name: 'Condition Rules, Boolean Logic (AND/OR/NOT), and the NULL Trap',
      shortName: '02. WHERE',
      icon: '🛡️',
      execRank: 'Executes 2nd (Row-by-Row Filter)',
      summary: 'Act as a bouncer at the door: only rows that evaluate to TRUE are allowed to pass through.',

      lesson: {
        intro: `The **WHERE** clause is your data filter. After the tables are joined in the <code>FROM</code> step, the database engine examines every single row one by one. If a row satisfies your condition (evaluates to <code>TRUE</code>), it continues forward. If it evaluates to <code>FALSE</code> or <code>UNKNOWN</code>, it is discarded immediately.`,
        analogy: `Think of WHERE as a security guard checking IDs at a venue door. The guard only lets guests in if they are over 21 AND on the guest list. If your ID says 19, or you have no ID (NULL), you cannot enter.`,
        steps: [
          {
            title: '1. Common Operators You Will Use Everyday',
            body: `
- **Comparisons**: <code>=</code> (equals), <code>!=</code> or <code><></code> (not equal), <code><</code>, <code>></code>, <code><=</code>, <code>>=</code>.
- **Multiple Conditions**: <code>AND</code> (both must be true), <code>OR</code> (at least one is true), <code>NOT</code> (inverts).
- **Sets and Ranges**: <code>IN ('NY', 'CA', 'TX')</code>, <code>BETWEEN 50000 AND 100000</code>.
- **Pattern Matching**: <code>LIKE 'A%'</code> (starts with A), <code>LIKE '%tech%'</code> (contains tech).
`
          },
          {
            title: '2. The #1 Interview Trap: Three-Valued Logic (3VL) & NULL',
            body: `In standard programming, boolean logic is binary: <code>TRUE</code> or <code>FALSE</code>. But in SQL, there is a third state: **UNKNOWN**.
Because <code>NULL</code> represents missing or unknown data, comparing anything to NULL with <code>=</code> (like <code>salary = NULL</code>) evaluates to **UNKNOWN**, which the WHERE clause drops!
Always use <code>IS NULL</code> or <code>IS NOT NULL</code>.`
          },
          {
            title: '3. Why You Cannot Use Aliases in WHERE',
            body: `Because <code>WHERE</code> executes **2nd** (before <code>SELECT</code> runs 5th), the database has not created your column aliases yet!
Writing <code>SELECT salary * 1.1 AS new_salary ... WHERE new_salary > 100000</code> will fail. You must repeat the expression in WHERE: <code>WHERE salary * 1.1 > 100000</code>.`
          }
        ],
        proTips: [
          {
            title: 'Always Use Parentheses When Combining AND with OR',
            text: '<code>AND</code> has higher precedence than <code>OR</code>! Writing <code>WHERE dept = "Eng" OR dept = "Sales" AND salary > 100k</code> means: everyone in Eng PLUS sales reps earning >100k. Always write <code>WHERE (dept = "Eng" OR dept = "Sales") AND salary > 100k</code>.'
          }
        ]
      },

      diff: {
        badTitle: 'Anti-Pattern: Comparing NULL with = Operator',
        badSql: `-- BROKEN: Returns 0 rows every single time!
SELECT *
FROM Employees
WHERE department = NULL;`,
        badExplanation: 'In SQL, nothing equals NULL—not even NULL equals NULL! The expression returns UNKNOWN, so every row is dropped.',
        goodTitle: 'Best Practice: Use IS NULL / IS NOT NULL',
        goodSql: `-- CORRECT: Finds unassigned employees
SELECT *
FROM Employees
WHERE department IS NULL;`,
        goodExplanation: 'IS NULL specifically checks for the presence of missing data and evaluates reliably to TRUE or FALSE.'
      },

      mcqs: [
        {
          id: 'mcq_p2_1',
          question: 'What does the expression `NULL = NULL` evaluate to in SQL?',
          options: [
            'TRUE',
            'FALSE',
            'UNKNOWN',
            'Throws a syntax error'
          ],
          correct: 2,
          explanation: 'In SQL three-valued logic, comparing anything with NULL using = evaluates to UNKNOWN.'
        },
        {
          id: 'mcq_p2_2',
          question: 'Why does `SELECT salary * 12 AS annual_pay FROM Employees WHERE annual_pay > 100000;` fail in SQL?',
          options: [
            'SQL cannot do math inside queries',
            'annual_pay is an invalid column name',
            'WHERE executes before SELECT, so the alias annual_pay does not exist yet',
            'WHERE only works on primary key columns'
          ],
          correct: 2,
          explanation: 'In the physical order of execution, WHERE runs 2nd and SELECT runs 5th. Column aliases are unknown during WHERE filtering.'
        }
      ],

      caseStudy: {
        company: 'Uber',
        role: 'Operations Analyst',
        title: 'Filtering High-Surge Airport Trips with Completed Status',
        scenario: 'Uber needs to analyze high-value airport pickups during peak demand hours. Write a query filtering trips that originated at airport zones, had a surge multiplier strictly greater than 1.5, were completed successfully, and had non-null driver tip amounts.',
        schema: 'Trips: (trip_id INT, pickup_zone VARCHAR, surge_multiplier FLOAT, status VARCHAR, tip_amount FLOAT)',
        recommendedQuery: `SELECT 
  trip_id,
  pickup_zone,
  surge_multiplier,
  tip_amount
FROM Trips
WHERE pickup_zone LIKE '%Airport%'
  AND surge_multiplier > 1.5
  AND status = 'COMPLETED'
  AND tip_amount IS NOT NULL;`
      },

      problem: {
        title: 'Filter High-Tenure Engineering Talent',
        difficulty: 'easy',
        spec: 'Select all employees from the Employees table who work in either "Engineering" or "Analytics", earn more than $95,000, and have been with the company for at least 12 months.',
        starterSql: `SELECT 
  emp_id,
  first_name,
  department,
  salary,
  months_tenure
FROM Employees
WHERE (department = 'Engineering' OR department = 'Analytics')
  AND salary > 95000
  AND months_tenure >= 12;`,
        targetTable: 'Employees'
      }
    },

    // -------------------------------------------------------------------------
    // TOPIC 03: GROUPING DATA & AGGREGATES (GROUP BY)
    // -------------------------------------------------------------------------
    {
      id: 'phase_03_groupby',
      seq: '03',
      title: 'Grouping Data & Aggregates',
      name: 'Sorting Rows into Buckets (COUNT, SUM, AVG, MIN, MAX)',
      shortName: '03. GROUP BY',
      icon: '📦',
      execRank: 'Executes 3rd (Row Compression into Groups)',
      summary: 'Sort individual rows into labeled buckets and calculate totals, averages, or counts for each bucket.',

      lesson: {
        intro: `Up to this point, queries operate on individual rows. But businesses often need summary answers: *"What is the total sales per region?"* or *"How many employees work in each department?"* That is what **GROUP BY** does. It sorts all surviving rows into categorized buckets, and compresses each bucket into a single summary row.`,
        analogy: `Think of sorting laundry into colored baskets: whites in one, darks in another, towels in a third. Once sorted, you stop counting individual socks—you weigh each basket or count how many total items are in it.`,
        steps: [
          {
            title: '1. The 5 Core Aggregate Functions',
            body: `
- <code>COUNT(*)</code>: Counts total rows in the group (including rows with NULLs).
- <code>COUNT(column)</code>: Counts non-null entries in that column.
- <code>SUM(column)</code>: Adds up numeric values in the group.
- <code>AVG(column)</code>: Calculates the mathematical average (ignores NULLs).
- <code>MIN(column)</code> & <code>MAX(column)</code>: Finds the smallest and largest values.
`
          },
          {
            title: '2. The Golden Rule of GROUP BY',
            body: `Every column in your <code>SELECT</code> clause that is **not** wrapped inside an aggregate function (like SUM or COUNT) **must** appear in the <code>GROUP BY</code> clause!
If you write <code>SELECT department, first_name, COUNT(*) FROM Employees GROUP BY department;</code>, which employee's first_name should the database pick for the whole department? It makes no sense, so the database rejects it.`
          },
          {
            title: '3. Grouping by Multiple Columns',
            body: `You can create sub-categories by grouping by multiple columns:
\`\`\`sql
SELECT department, city, COUNT(*) AS headcount, AVG(salary) AS avg_salary
FROM Employees
GROUP BY department, city;
\`\`\`
This creates a separate bucket for "Engineering in New York", "Engineering in London", "Sales in New York", etc.`
          }
        ],
        proTips: [
          {
            title: 'COUNT(*) vs COUNT(column)',
            text: '<code>COUNT(*)</code> counts rows. <code>COUNT(bonus)</code> counts only rows where bonus is NOT NULL. If 3 out of 10 employees received a bonus, COUNT(*) is 10, but COUNT(bonus) is 3.'
          }
        ]
      },

      diff: {
        badTitle: 'Anti-Pattern: Selecting Non-Aggregated Columns Without Grouping',
        badSql: `-- INVALID SQL (Fails with ONLY_FULL_GROUP_BY error)
SELECT department, first_name, AVG(salary)
FROM Employees
GROUP BY department;`,
        badExplanation: 'first_name has multiple different values per department. SQL cannot decide which name to display on the single summary row.',
        goodTitle: 'Best Practice: Include All Non-Aggregated Columns in GROUP BY',
        goodSql: `-- CLEAN & DETERMINISTIC
SELECT department, COUNT(*) AS employee_count, ROUND(AVG(salary), 2) AS avg_salary
FROM Employees
GROUP BY department;`,
        goodExplanation: 'Every non-aggregated column in the SELECT list is properly grouped, producing clean, predictable summary rows.'
      },

      mcqs: [
        {
          id: 'mcq_p3_1',
          question: 'What is the Golden Rule of SQL GROUP BY queries?',
          options: [
            'All numeric columns must be summed',
            'Every column in SELECT that is not in an aggregate function must be listed in GROUP BY',
            'GROUP BY must always be followed by ORDER BY',
            'You cannot use WHERE and GROUP BY in the same query'
          ],
          correct: 1,
          explanation: 'Columns outside aggregate functions must be part of the group key so the database knows how to collapse rows.'
        },
        {
          id: 'mcq_p3_2',
          question: 'If a table has 5 rows and 2 of them have NULL in column `bonus`, what does `COUNT(bonus)` return?',
          options: [
            '5',
            '3',
            '2',
            'NULL'
          ],
          correct: 1,
          explanation: 'COUNT(column_name) ignores NULL values and counts only rows where the specified column has a non-null value.'
        }
      ],

      caseStudy: {
        company: 'Netflix',
        role: 'Content Strategist',
        title: 'Analyzing Viewer Engagement Hours by Content Genre',
        scenario: 'Netflix wants to determine which movie genres generate the highest total watch time and viewer count to guide future production budgets. Group viewing sessions by genre and compute the total hours watched and unique viewer count.',
        schema: 'WatchSessions: (session_id INT, user_id INT, genre VARCHAR, minutes_watched INT)',
        recommendedQuery: `SELECT 
  genre,
  COUNT(DISTINCT user_id) AS total_viewers,
  ROUND(SUM(minutes_watched) / 60.0, 1) AS total_hours_watched,
  ROUND(AVG(minutes_watched), 1) AS avg_session_minutes
FROM WatchSessions
GROUP BY genre
ORDER BY total_hours_watched DESC;`
      },

      problem: {
        title: 'Department Headcount & Payroll Summary',
        difficulty: 'easy',
        spec: 'Write a query grouping the Employees table by department. For each department, return the department name, total headcount (as emp_count), total salary payroll (as total_payroll), and average salary rounded to 2 decimal places (as avg_salary).',
        starterSql: `SELECT 
  department,
  COUNT(*) AS emp_count,
  SUM(salary) AS total_payroll,
  ROUND(AVG(salary), 2) AS avg_salary
FROM Employees
GROUP BY department
ORDER BY total_payroll DESC;`,
        targetTable: 'Employees'
      }
    },

    // -------------------------------------------------------------------------
    // TOPIC 04: FILTERING GROUPS WITH HAVING
    // -------------------------------------------------------------------------
    {
      id: 'phase_04_having',
      seq: '04',
      title: 'Filtering Groups with HAVING',
      name: 'Filtering Summarized Groups vs Individual Rows (WHERE vs HAVING)',
      shortName: '04. HAVING',
      icon: '🔍',
      execRank: 'Executes 4th (Post-Aggregation Filter)',
      summary: 'Filter the summary buckets after they are calculated (e.g. only departments with 5+ employees).',

      lesson: {
        intro: `One of the most common questions in SQL is: *"What is the difference between WHERE and HAVING?"*
The answer is simple: **WHERE** filters individual raw rows *before* they are grouped. **HAVING** filters the summarized groups *after* they have been calculated.`,
        analogy: `Think of a basketball tournament. WHERE checks each player's age before they join a team (individual filter). HAVING checks each team after the rosters are finalized, and disqualifies any team that has fewer than 5 players (group filter).`,
        steps: [
          {
            title: '1. Side-by-Side Comparison: WHERE vs HAVING',
            body: `
- **WHERE**:
  - Filters raw rows **before** grouping.
  - Runs **2nd** in execution.
  - **Cannot** use aggregate functions like <code>SUM()</code> or <code>COUNT()</code> (e.g. <code>WHERE COUNT(*) > 5</code> is illegal!).
- **HAVING**:
  - Filters group summaries **after** grouping.
  - Runs **4th** in execution.
  - **Can** use aggregate functions (e.g. <code>HAVING COUNT(*) > 5</code> or <code>HAVING AVG(salary) > 100k</code>).
`
          },
          {
            title: '2. Using Both WHERE and HAVING Together',
            body: `Professional queries frequently combine both clauses for maximum efficiency:
\`\`\`sql
SELECT department, COUNT(*) AS active_staff, AVG(salary) AS avg_pay
FROM Employees
WHERE months_tenure >= 12         -- 1. First: drop junior staff
GROUP BY department              -- 2. Then: group remaining senior staff
HAVING COUNT(*) >= 2;            -- 3. Finally: keep only departments with 2+ staff
\`\`\``
          }
        ],
        proTips: [
          {
            title: 'Performance Rule: Filter Early with WHERE',
            text: 'Never put a condition in HAVING if it could have been in WHERE! If you write <code>HAVING department = "Engineering"</code>, the engine groups thousands of irrelevant rows first before discarding them. Put row-level checks in WHERE.'
          }
        ]
      },

      diff: {
        badTitle: 'Anti-Pattern: Trying to Filter Aggregates in WHERE',
        badSql: `-- SYNTAX ERROR: WHERE cannot evaluate aggregates
SELECT department, COUNT(*)
FROM Employees
WHERE COUNT(*) > 2
GROUP BY department;`,
        badExplanation: 'WHERE runs before the groups are formed! It has no idea what COUNT(*) will be yet.',
        goodTitle: 'Best Practice: Use HAVING for Aggregate Filters',
        goodSql: `-- CLEAN & VALID
SELECT department, COUNT(*) AS team_size
FROM Employees
GROUP BY department
HAVING COUNT(*) > 2;`,
        goodExplanation: 'HAVING runs after GROUP BY has calculated the counts, filtering the groups accurately.'
      },

      mcqs: [
        {
          id: 'mcq_p4_1',
          question: 'Why does `SELECT department FROM Employees WHERE AVG(salary) > 100000 GROUP BY department;` fail?',
          options: [
            'salary is not a valid column',
            'WHERE executes before GROUP BY, so aggregate values like AVG(salary) do not exist yet',
            'AVG cannot be used with GROUP BY',
            'You must include first_name in the query'
          ],
          correct: 1,
          explanation: 'WHERE filters raw rows before grouping. To filter on calculated aggregates like AVG(), you must use HAVING.'
        }
      ],

      caseStudy: {
        company: 'Amazon',
        role: 'Fulfillment Operations Analyst',
        title: 'Detecting Bottleneck Fulfillment Centers with High Defect Rates',
        scenario: 'Amazon wants to identify distribution centers that have processed at least 1,000 packages but have an average delivery delay exceeding 45 minutes.',
        schema: 'Shipments: (shipment_id INT, warehouse_id VARCHAR, delay_minutes INT, status VARCHAR)',
        recommendedQuery: `SELECT 
  warehouse_id,
  COUNT(*) AS total_packages,
  ROUND(AVG(delay_minutes), 1) AS avg_delay_minutes
FROM Shipments
WHERE status = 'DELIVERED'
GROUP BY warehouse_id
HAVING COUNT(*) >= 1000
   AND AVG(delay_minutes) > 45;`
      },

      problem: {
        title: 'Filter Departments by Minimum Staff & Budget',
        difficulty: 'medium',
        spec: 'Write a query that groups the Employees table by department, returning department and average salary (as avg_salary). Only include departments that have at least 3 employees AND an average salary strictly greater than $90,000.',
        starterSql: `SELECT 
  department,
  COUNT(*) AS headcount,
  ROUND(AVG(salary), 2) AS avg_salary
FROM Employees
GROUP BY department
HAVING COUNT(*) >= 3
   AND AVG(salary) > 90000;`,
        targetTable: 'Employees'
      }
    },

    // -------------------------------------------------------------------------
    // TOPIC 05: SELECT & WINDOW FUNCTIONS
    // -------------------------------------------------------------------------
    {
      id: 'phase_05_select_window',
      seq: '05',
      title: 'SELECT & Window Functions',
      name: 'Column Projections, Running Totals, and In-Place Rankings',
      shortName: '05. Window Functions',
      icon: '🪟',
      execRank: 'Executes 5th (Column Projection & Window Math)',
      summary: 'Compute rankings, moving averages, and running totals without collapsing your rows.',

      lesson: {
        intro: `In declarative SQL, <code>SELECT</code> is the first word you write, but under the hood, the engine executes it **5th**!
This is where columns are projected, math expressions are calculated, and **Window Functions** run.
Unlike <code>GROUP BY</code> (which collapses rows into a single summary row), Window Functions calculate summaries **while keeping every individual row intact**!`,
        analogy: `Think of a class report card. GROUP BY tells you the class average (1 number for the whole room). A Window Function adds a column to each student's personal report card showing both their individual score AND their rank in the class!`,
        steps: [
          {
            title: '1. The Anatomy of an OVER() Clause',
            body: `
Every window function uses the <code>OVER()</code> clause with two optional superpowers:
- <code>PARTITION BY department</code>: Divides the rows into mini-windows (e.g. ranks reset for each department).
- <code>ORDER BY salary DESC</code>: Defines how rows are sorted inside each window.
\`\`\`sql
SELECT 
  first_name, 
  department, 
  salary,
  RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank
FROM Employees;
\`\`\`
`
          },
          {
            title: '2. The Big 3 Ranking Functions (Interview Classic)',
            body: `Suppose three employees earn $100k, $100k (tie), and $90k:
- **ROW_NUMBER()**: Always assigns unique sequential numbers: <code>1, 2, 3</code> (breaks ties arbitrarily).
- **RANK()**: Handles ties but **skips** numbers: <code>1, 1, 3</code> (skips 2).
- **DENSE_RANK()**: Handles ties and **never skips** numbers: <code>1, 1, 2</code>.
`
          },
          {
            title: '3. Running Totals & Cumulative Sums',
            body: `You can calculate cumulative revenue over time:
\`\`\`sql
SELECT order_date, amount,
       SUM(amount) OVER (ORDER BY order_date) AS running_total
FROM Orders;
\`\`\``
          }
        ],
        proTips: [
          {
            title: 'Cannot Put Window Functions in WHERE',
            text: 'Because WHERE executes 2nd and Window Functions execute 5th, you cannot write <code>WHERE RANK() OVER (...) <= 3</code> directly! Wrap the query in a CTE or subquery first, then filter on the rank column.'
          }
        ]
      },

      diff: {
        badTitle: 'Anti-Pattern: Trying to Filter Window Function in WHERE',
        badSql: `-- SYNTAX ERROR: Window functions not allowed in WHERE
SELECT first_name, salary
FROM Employees
WHERE ROW_NUMBER() OVER (ORDER BY salary DESC) <= 3;`,
        badExplanation: 'WHERE runs before SELECT and Window functions exist.',
        goodTitle: 'Best Practice: Wrap in a CTE or Subquery to Filter Ranks',
        goodSql: `-- CLEAN & ELEGANT: Use CTE to filter Top 3
WITH RankedStaff AS (
  SELECT first_name, department, salary,
         DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk
  FROM Employees
)
SELECT * FROM RankedStaff WHERE rnk <= 3;`,
        goodExplanation: 'The CTE calculates the ranks first, allowing the outer query WHERE clause to cleanly filter the top earners.'
      },

      mcqs: [
        {
          id: 'mcq_p5_1',
          question: 'If two employees tie for 2nd place, what ranks will DENSE_RANK() assign to the top 4 employees?',
          options: [
            '1, 2, 3, 4',
            '1, 2, 2, 4',
            '1, 2, 2, 3',
            '1, 2, 3, 3'
          ],
          correct: 2,
          explanation: 'DENSE_RANK() handles ties by giving both tied rows rank 2, and then assigns rank 3 to the next row without skipping numbers.'
        }
      ],

      caseStudy: {
        company: 'Jane Street',
        role: 'Quantitative Data Engineer',
        title: 'Real-Time Cumulative VWAP & Running Volume Calculation',
        scenario: 'Trading desks require real-time running volume totals and volume-weighted average prices throughout the trading day without collapsing individual trade ticks.',
        schema: 'Trades: (trade_id INT, symbol VARCHAR, shares INT, price FLOAT, trade_time TIMESTAMP)',
        recommendedQuery: `SELECT 
  trade_time,
  symbol,
  shares,
  price,
  SUM(shares) OVER (PARTITION BY symbol ORDER BY trade_time) AS cumulative_shares,
  ROUND(SUM(shares * price) OVER (PARTITION BY symbol ORDER BY trade_time) / 
        SUM(shares) OVER (PARTITION BY symbol ORDER BY trade_time), 4) AS running_vwap
FROM Trades;`
      },

      problem: {
        title: 'Running Department Payroll & Seniority Ranks',
        difficulty: 'medium',
        spec: 'For each employee in the Employees table, return their first_name, department, salary, their department-level salary rank using DENSE_RANK() (as dept_salary_rank), and a running cumulative department salary total (as running_dept_payroll).',
        starterSql: `SELECT 
  first_name,
  department,
  salary,
  DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_salary_rank,
  SUM(salary) OVER (PARTITION BY department ORDER BY salary DESC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_dept_payroll
FROM Employees;`,
        targetTable: 'Employees'
      }
    },

    // -------------------------------------------------------------------------
    // TOPIC 06: REMOVING DUPLICATES WITH DISTINCT
    // -------------------------------------------------------------------------
    {
      id: 'phase_06_distinct',
      seq: '06',
      title: 'Removing Duplicates with DISTINCT',
      name: 'Eliminating Redundant Rows and Multi-Column Tuple Uniqueness',
      shortName: '06. DISTINCT',
      icon: '✨',
      execRank: 'Executes 6th (Duplicate Row Collapsing)',
      summary: 'Keep only one copy of each identical result row, collapsing duplicates into clean unique lists.',

      lesson: {
        intro: `When querying large databases, the result set often contains duplicate values. For instance, querying the city column from an orders table might return "New York" 500 times. Adding **DISTINCT** tells the database to collapse all identical rows into a single unique row.`,
        analogy: `Think of making a guest list from RSVP responses. If Bob RSVPs three times, you don't write Bob's name down three times on your clipboard—you keep one entry for Bob and discard the duplicates.`,
        steps: [
          {
            title: '1. Single Column vs Multi-Column DISTINCT',
            body: `
- <code>SELECT DISTINCT city FROM Customers;</code>: Returns unique cities.
- <code>SELECT DISTINCT city, state FROM Customers;</code>: Returns unique **pairs**! If you have "Springfield, IL" and "Springfield, MO", both stay because the combination is unique.
- **Common Myth**: Writing <code>SELECT DISTINCT(city), state</code> does **NOT** apply distinct only to city. In SQL, DISTINCT always applies to the entire row of selected columns.
`
          },
          {
            title: '2. Combining with Aggregates: COUNT(DISTINCT)',
            body: `To count how many *different* customers placed orders this month:
\`\`\`sql
SELECT COUNT(DISTINCT customer_id) AS unique_active_buyers
FROM Orders
WHERE order_date >= '2024-01-01';
\`\`\``
          }
        ],
        proTips: [
          {
            title: 'Performance Cost',
            text: 'DISTINCT requires the database to sort or build a hash set of all rows in memory to detect duplicates. If your primary keys or WHERE conditions already guarantee unique rows, do not add DISTINCT just in case.'
          }
        ]
      },

      diff: {
        badTitle: 'Anti-Pattern: Adding DISTINCT Blindly to Fix Faulty JOINs',
        badSql: `-- CODE SMELL: Masking a duplicate row explosion
SELECT DISTINCT o.order_id, o.order_total, c.first_name
FROM Orders o
LEFT JOIN Customers c ON o.customer_id = c.customer_id;`,
        badExplanation: 'If orders are duplicating, fix the JOIN condition or group key instead of forcing the engine to run an expensive DISTINCT deduplication step.',
        goodTitle: 'Best Practice: Use DISTINCT Purposefully for Unique Lookups',
        goodSql: `-- CLEAN & FAST
SELECT DISTINCT city, state
FROM Customers
ORDER BY state, city;`,
        goodExplanation: 'Correctly extracts a clean catalog of unique geographical markets served by customers.'
      },

      mcqs: [
        {
          id: 'mcq_p6_1',
          question: 'What does `SELECT DISTINCT city, state FROM Customers;` return?',
          options: [
            'Unique cities, but all states duplicated',
            'Unique combinations (pairs) of city and state',
            'Only cities that have no state assigned',
            'Throws a syntax error because DISTINCT only takes 1 column'
          ],
          correct: 1,
          explanation: 'DISTINCT applies across all columns in the SELECT clause, keeping only unique row tuples.'
        }
      ],

      caseStudy: {
        company: 'Airbnb',
        role: 'Market Growth Analyst',
        title: 'Cataloging Unique Destination Cities with Active Listings',
        scenario: 'Airbnb wants to build a search dropdown of distinct destination cities and countries that currently have active, verified property listings.',
        schema: 'Listings: (listing_id INT, host_id INT, city VARCHAR, country VARCHAR, status VARCHAR)',
        recommendedQuery: `SELECT DISTINCT 
  city, 
  country
FROM Listings
WHERE status = 'ACTIVE'
ORDER BY country, city;`
      },

      problem: {
        title: 'Extract Unique Customer Geographic Markets',
        difficulty: 'easy',
        spec: 'Write a query returning all unique combinations of city, state, and country from the Customers table, ordered alphabetically by country, then state, then city.',
        starterSql: `SELECT DISTINCT 
  city,
  state,
  country
FROM Customers
ORDER BY country, state, city;`,
        targetTable: 'Customers'
      }
    },

    // -------------------------------------------------------------------------
    // TOPIC 07: SORTING RESULTS WITH ORDER BY
    // -------------------------------------------------------------------------
    {
      id: 'phase_07_orderby',
      seq: '07',
      title: 'Sorting Results with ORDER BY',
      name: 'Deterministic Sorting, Multi-Column Tie-Breakers, and Expressions',
      shortName: '07. ORDER BY',
      icon: '📶',
      execRank: 'Executes 7th (Final Output Sorting)',
      summary: 'Sort your final rows ascending or descending, with tie-breakers and expressions.',

      lesson: {
        intro: `Relational databases store data as unordered sets of tuples. Unless you explicitly add an **ORDER BY** clause, the database does not guarantee the order of your results! It could return rows differently each time based on how pages were read from disk.`,
        analogy: `Think of a leaderboard. After all points are calculated, you sort the contestants from highest score to lowest. If two people tie on points, you check who completed the race faster as a tie-breaker.`,
        steps: [
          {
            title: '1. Direction: ASC vs DESC',
            body: `
- <code>ORDER BY salary ASC</code>: Lowest to highest (default if omitted).
- <code>ORDER BY salary DESC</code>: Highest to lowest.
- <code>ORDER BY department ASC, salary DESC</code>: First groups by department alphabetically; within each department, sorts highest earners first.
`
          },
          {
            title: '2. Aliases Work in ORDER BY!',
            body: `Because <code>ORDER BY</code> executes **7th** (after <code>SELECT</code> has run 5th), column aliases created in SELECT are fully available here!
\`\`\`sql
SELECT first_name, salary * 12 AS annual_pay
FROM Employees
ORDER BY annual_pay DESC; -- Perfectly valid!
\`\`\``
          },
          {
            title: '3. Deterministic Sorting (The Interview Pro-Tip)',
            body: `When building paginated APIs, if multiple rows have the exact same sort value, page 1 and page 2 might show duplicate rows or miss rows! Always add a unique column (like <code>id</code>) as the final tie-breaker:
<code>ORDER BY salary DESC, emp_id ASC</code>.`
          }
        ],
        proTips: [
          {
            title: 'NULL Sorting Behavior',
            text: 'In PostgreSQL and SQLite, NULLs sort LAST in ASC, and FIRST in DESC. In MySQL, NULLs sort FIRST in ASC. Use <code>NULLS LAST</code> or <code>NULLS FIRST</code> if your database supports it to be explicit.'
          }
        ]
      },

      diff: {
        badTitle: 'Anti-Pattern: Non-Deterministic Sorting in Paginated APIs',
        badSql: `-- FLAKY: Ties cause jumping rows during page navigation
SELECT *
FROM Employees
ORDER BY salary DESC
LIMIT 5 OFFSET 0;`,
        badExplanation: 'If 4 employees earn $100,000, their relative position is random and can change between page requests.',
        goodTitle: 'Best Practice: Deterministic Sorting with Unique Tie-Breaker',
        goodSql: `-- ROCK SOLID: Always deterministic
SELECT *
FROM Employees
ORDER BY salary DESC, emp_id ASC
LIMIT 5 OFFSET 0;`,
        goodExplanation: 'Adding emp_id ensures an absolute, repeatable order for every single row.'
      },

      mcqs: [
        {
          id: 'mcq_p7_1',
          question: 'Why can you use column aliases in ORDER BY, but not in WHERE?',
          options: [
            'ORDER BY uses a different database parser',
            'ORDER BY executes 7th (after SELECT creates aliases in step 5), whereas WHERE executes 2nd (before SELECT)',
            'WHERE only accepts numeric column names',
            'You cannot use aliases in ORDER BY either'
          ],
          correct: 1,
          explanation: 'In the physical query execution order, SELECT runs 5th and ORDER BY runs 7th, making aliases available to ORDER BY.'
        }
      ],

      caseStudy: {
        company: 'Two Sigma',
        role: 'Quantitative Platform Engineer',
        title: 'Deterministic Millisecond Market Tick Sorting with Tie-Breakers',
        scenario: 'Financial backtesting models require deterministic tick ordering. Order market ticks by trade timestamp descending, and use tick_id ascending as the tie-breaker for trades executing in the exact same millisecond.',
        schema: 'MarketTicks: (tick_id INT, ticker VARCHAR, price FLOAT, volume INT, tick_time TIMESTAMP)',
        recommendedQuery: `SELECT 
  ticker,
  price,
  volume,
  tick_time
FROM MarketTicks
WHERE ticker = 'AAPL'
ORDER BY tick_time DESC, tick_id ASC;`
      },

      problem: {
        title: 'Deterministic Student Honors Ranking',
        difficulty: 'easy',
        spec: 'Select ID, Name, and Marks from the STUDENTS table where Marks > 75. Sort the results by the LAST 3 CHARACTERS of each student\'s Name (using SUBSTR(Name, -3) or RIGHT(Name, 3)). If two students have names ending in the same 3 characters, break the tie by ID ascending.',
        starterSql: `SELECT 
  ID, 
  Name, 
  Marks
FROM STUDENTS
WHERE Marks > 75
ORDER BY SUBSTR(Name, LENGTH(Name) - 2, 3) ASC, ID ASC;`,
        targetTable: 'STUDENTS'
      }
    },

    // -------------------------------------------------------------------------
    // TOPIC 08: PAGINATION WITH LIMIT & OFFSET
    // -------------------------------------------------------------------------
    {
      id: 'phase_08_limit_offset',
      seq: '08',
      title: 'Pagination with LIMIT & OFFSET',
      name: 'Slicing Result Sets, Top-N Queries, and Keyset Pagination',
      shortName: '08. LIMIT & OFFSET',
      icon: '✂️',
      execRank: 'Executes 8th (Final Row Truncation)',
      summary: 'Take only the first N rows or skip forward to load page 2, 3, or 4 of results.',

      lesson: {
        intro: `After sorting your results, you often don't want to send 1,000,000 rows across the network to a mobile app. **LIMIT** and **OFFSET** let you slice the final output:
- **LIMIT N**: Stop after delivering N rows.
- **OFFSET M**: Skip the first M rows before returning rows.`,
        analogy: `Think of reading a book. LIMIT 10 OFFSET 20 means: open the book, skip the first 20 pages, and read the next 10 pages.`,
        steps: [
          {
            title: '1. Standard Page-Based Pagination Formula',
            body: `
For a page size of 10:
- **Page 1**: <code>LIMIT 10 OFFSET 0</code>
- **Page 2**: <code>LIMIT 10 OFFSET 10</code>
- **Page 3**: <code>LIMIT 10 OFFSET 20</code>
Formula: <code>OFFSET = (PageNumber - 1) * PageSize</code>.
`
          },
          {
            title: '2. The Big Offset Performance Trap (Interview Favorite)',
            body: `If you write <code>LIMIT 10 OFFSET 1000000</code>, the database does **not** jump to row 1,000,000!
It reads and sorts all 1,000,010 rows from disk, discards the first 1,000,000, and returns 10. This causes severe lag on large tables.
**Solution**: Use *Keyset (Cursor) Pagination*:
\`\`\`sql
SELECT * FROM Posts
WHERE id > 1000000 -- Fast B-Tree jump!
ORDER BY id ASC
LIMIT 10;
\`\`\``
          }
        ],
        proTips: [
          {
            title: 'Always Use LIMIT with ORDER BY',
            text: 'Writing LIMIT without ORDER BY is dangerous because relational databases are unordered by default. You will get unpredictable rows.'
          }
        ]
      },

      diff: {
        badTitle: 'Anti-Pattern: High-Offset Pagination on Massive Tables',
        badSql: `-- SLOW: Reads and throws away 500,000 rows!
SELECT *
FROM Transactions
ORDER BY tx_id ASC
LIMIT 20 OFFSET 500000;`,
        badExplanation: 'The engine must traverse 500,000 records before returning just 20.',
        goodTitle: 'Best Practice: Keyset / Cursor Pagination',
        goodSql: `-- FAST: Directly seeks the target in 1 index jump
SELECT *
FROM Transactions
WHERE tx_id > 500000
ORDER BY tx_id ASC
LIMIT 20;`,
        goodExplanation: 'Uses the B-Tree index to jump straight to tx_id > 500000 in less than 1 millisecond.'
      },

      mcqs: [
        {
          id: 'mcq_p8_1',
          question: 'How do you find the 2nd highest salary in a company using LIMIT and OFFSET?',
          options: [
            'SELECT salary FROM Employees ORDER BY salary DESC LIMIT 1 OFFSET 1;',
            'SELECT salary FROM Employees WHERE rank = 2;',
            'SELECT salary FROM Employees LIMIT 2;',
            'SELECT MAX(salary) - 1 FROM Employees;'
          ],
          correct: 0,
          explanation: 'ORDER BY salary DESC puts the highest first. OFFSET 1 skips the 1st highest, and LIMIT 1 takes the 2nd highest.'
        }
      ],

      caseStudy: {
        company: 'X / Twitter',
        role: 'Timeline Infrastructure Engineer',
        title: 'Infinite Scroll Timeline Pagination with Cursors',
        scenario: 'Twitter timelines cannot use OFFSET 10000 because new tweets are posted every second. Use cursor-based pagination to fetch the next 20 tweets older than the last loaded tweet ID.',
        schema: 'Tweets: (tweet_id BIGINT, user_id INT, content VARCHAR, created_at TIMESTAMP)',
        recommendedQuery: `SELECT 
  tweet_id,
  user_id,
  content,
  created_at
FROM Tweets
WHERE tweet_id < 1849204918294
ORDER BY tweet_id DESC
LIMIT 20;`
      },

      problem: {
        title: 'Extract Second Highest Salary',
        difficulty: 'medium',
        spec: 'Write a query that finds the second highest unique salary from the Employees table. Return it with the column alias SecondHighestSalary. If there is no second highest salary, return NULL.',
        starterSql: `SELECT (
  SELECT DISTINCT salary
  FROM Employees
  ORDER BY salary DESC
  LIMIT 1 OFFSET 1
) AS SecondHighestSalary;`,
        targetTable: 'Employees'
      }
    },

    // -------------------------------------------------------------------------
    // TOPIC 09: SUBQUERIES & REUSABLE LOGIC (CTES)
    // -------------------------------------------------------------------------
    {
      id: 'phase_09_ctes',
      seq: '09',
      title: 'Subqueries & Reusable Logic (CTEs)',
      name: 'Breaking Complex Queries into Clean Steps with the WITH Clause',
      shortName: '09. CTEs (WITH)',
      icon: '🧱',
      execRank: 'Executes as Named Pipelines (WITH)',
      summary: 'Break terrifying 50-line queries into clean, readable, modular steps using Common Table Expressions.',

      lesson: {
        intro: `When building complex business reports, queries can quickly become unreadable messes of nested subqueries. A **CTE** (Common Table Expression), created with the **WITH** clause, lets you define temporary named tables that exist only for the duration of your query.`,
        analogy: `Think of cooking a recipe. Instead of scrambling to chop onions and grate cheese while your skillet is on fire, you prep your ingredients into clean prep bowls first (the CTEs). Then your final dish (the main SELECT) is simple, clean, and stress-free.`,
        steps: [
          {
            title: '1. Basic CTE Syntax',
            body: `
\`\`\`sql
-- Step 1: Define the temporary CTE
WITH DepartmentBudgets AS (
  SELECT department, SUM(salary) AS total_payroll
  FROM Employees
  GROUP BY department
)
-- Step 2: Use it just like a regular table
SELECT *
FROM DepartmentBudgets
WHERE total_payroll > 200000;
\`\`\`
`
          },
          {
            title: '2. Chaining Multiple CTEs',
            body: `You can chain several CTEs together separated by commas:
\`\`\`sql
WITH 
  HighEarners AS (
    SELECT * FROM Employees WHERE salary > 100000
  ),
  DeptTotals AS (
    SELECT department, COUNT(*) AS count_100k 
    FROM HighEarners 
    GROUP BY department
  )
SELECT * FROM DeptTotals;
\`\`\``
          }
        ],
        proTips: [
          {
            title: 'Readability vs Temp Tables',
            text: 'CTEs do not write data to disk. They are logical views that make your SQL readable, maintainable, and easy to debug clause by clause.'
          }
        ]
      },

      diff: {
        badTitle: 'Anti-Pattern: Hard-to-Read Nested Subqueries',
        badSql: `-- HARD TO READ: Nested 3 levels deep
SELECT * FROM (
  SELECT department, AVG(salary) AS avg_s 
  FROM (SELECT * FROM Employees WHERE tenure > 10) sub1 
  GROUP BY department
) sub2 WHERE avg_s > 100000;`,
        badExplanation: 'Nested subqueries read inside-out, making debugging and maintenance difficult.',
        goodTitle: 'Best Practice: Clean Chained CTEs (WITH Clause)',
        goodSql: `-- CLEAN & MODULAR: Reads top to bottom
WITH SeniorStaff AS (
  SELECT * FROM Employees WHERE tenure > 10
),
DeptSalaries AS (
  SELECT department, AVG(salary) AS avg_salary
  FROM SeniorStaff
  GROUP BY department
)
SELECT * FROM DeptSalaries WHERE avg_salary > 100000;`,
        goodExplanation: 'CTEs structure your logic top-to-bottom like readable software functions.'
      },

      mcqs: [
        {
          id: 'mcq_p9_1',
          question: 'What is the primary advantage of using a CTE (WITH clause) over nested subqueries?',
          options: [
            'CTEs make code modular and readable from top-to-bottom instead of inside-out',
            'CTEs permanently save tables to the hard drive',
            'CTEs automatically create indexes',
            'CTEs can only be used in MySQL'
          ],
          correct: 0,
          explanation: 'CTEs allow you to break down complex queries into logical, named, readable transformation steps.'
        }
      ],

      caseStudy: {
        company: 'Goldman Sachs',
        role: 'Risk Management Analyst',
        title: 'Multi-Step Counterparty Exposure Analysis',
        scenario: 'Goldman Sachs needs a risk report calculating the percentage of company-wide customer deposits held by high-net-worth accounts. Use a CTE to calculate total bank-wide deposits, and an outer query to compute each account\'s percentage share.',
        schema: 'Accounts: (account_id INT, customer_name VARCHAR, balance FLOAT)',
        recommendedQuery: `WITH BankTotals AS (
  SELECT SUM(balance) AS total_bank_deposits
  FROM Accounts
)
SELECT 
  a.account_id,
  a.customer_name,
  a.balance,
  ROUND((a.balance / b.total_bank_deposits) * 100, 3) AS pct_of_total_deposits
FROM Accounts a
CROSS JOIN BankTotals b
WHERE a.balance > 1000000
ORDER BY a.balance DESC;`
      },

      problem: {
        title: 'Employees Earning Above Department Average',
        difficulty: 'medium',
        spec: 'Write a query using a CTE that calculates the average salary for each department. Then, join that CTE back to the Employees table to find all employees whose salary is strictly greater than their department average.',
        starterSql: `WITH DeptAvg AS (
  SELECT department, AVG(salary) AS avg_dept_salary
  FROM Employees
  GROUP BY department
)
SELECT 
  e.emp_id,
  e.first_name,
  e.department,
  e.salary,
  ROUND(d.avg_dept_salary, 2) AS dept_average
FROM Employees e
JOIN DeptAvg d ON e.department = d.department
WHERE e.salary > d.avg_dept_salary
ORDER BY e.department, e.salary DESC;`,
        targetTable: 'Employees'
      }
    },

    // -------------------------------------------------------------------------
    // TOPIC 10: STORAGE, INDEXES & INTERVIEW DEFENSE
    // -------------------------------------------------------------------------
    {
      id: 'phase_10_storage_defense',
      seq: '10',
      title: 'Storage, Indexes & Performance',
      name: 'B-Trees, Full Table Scans vs Index Seeks, and Covering Indexes',
      shortName: '10. Performance & Indexes',
      icon: '⚡',
      execRank: 'Physical Disk & Buffer Pool Architecture',
      summary: 'Understand how databases store data on disk and use B-Tree indexes to turn slow queries into millisecond lookups.',

      lesson: {
        intro: `In senior software and data engineering interviews, writing syntactically correct SQL is only half the battle. The interviewer will ask: *"This query takes 4 seconds on a 50-million-row table. How would you optimize it?"*
To answer with confidence, you need to understand how databases actually retrieve rows from disk.`,
        analogy: `Think of a 1,000-page encyclopedia. A Full Table Scan is reading all 1,000 pages cover-to-cover to find mentions of "Database". An Index Seek is flipping to the Index at the back, seeing "Database: page 421", and jumping straight to page 421 in 2 seconds.`,
        steps: [
          {
            title: '1. Full Table Scan vs Index Seek',
            body: `
- **Full Table Scan**: The engine reads every single data block from storage into memory. If the table has 50M rows, this takes seconds and thrashes server RAM.
- **Index Seek**: Using a balanced tree (B-Tree), the engine navigates parent $\\rightarrow$ child $\\rightarrow$ leaf nodes in 3 or 4 quick seeks (microseconds!).
`
          },
          {
            title: '2. The Holy Grail: Covering Index (Index-Only Scan)',
            body: `Normally, a secondary index lookup finds the record ID, then makes a second hop to the main table to fetch other columns.
If your index contains **all** columns requested by the query:
\`\`\`sql
CREATE INDEX idx_orders_cust ON Orders (customer_id, order_date, total_amount);
\`\`\`
The engine satisfies the query **entirely from the index** without ever touching the physical table! This is known as an *Index-Only Scan*.`
          },
          {
            title: '3. What Disables an Index (SARGability Trap)',
            body: `Wrapping an indexed column in a function prevents the database from using the index:
- ❌ **Slow**: <code>WHERE YEAR(order_date) = 2024</code> (Forces a full table scan because it must run the function on every row!).
- ✅ **Fast**: <code>WHERE order_date >= '2024-01-01' AND order_date < '2025-01-01'</code> (Uses the B-Tree index seek).`
          }
        ],
        proTips: [
          {
            title: 'The 3-Step Whiteboard Interview Defense Formula',
            text: 'When asked how to optimize a query in an interview: 1. Run EXPLAIN to check access type (Scan vs Seek). 2. Check the cardinality of the filtered column. 3. Propose a composite or covering index.'
          }
        ]
      },

      diff: {
        badTitle: 'Anti-Pattern: Function on Indexed Column (Kills Index)',
        badSql: `-- SLOW: Forces Full Table Scan on 10M rows
SELECT *
FROM Orders
WHERE DATE(created_at) = '2024-06-01';`,
        badExplanation: 'Wrapping created_at in DATE() prevents the B-Tree index from jumping directly to the date range.',
        goodTitle: 'Best Practice: SARGable Range Condition (Uses Index)',
        goodSql: `-- ULTRA FAST: Instant B-Tree Index Seek
SELECT order_id, created_at, amount
FROM Orders
WHERE created_at >= '2024-06-01 00:00:00'
  AND created_at <  '2024-06-02 00:00:00';`,
        goodExplanation: 'The raw column is compared to literals, allowing the database to jump straight to the start position in the index.'
      },

      mcqs: [
        {
          id: 'mcq_p10_1',
          question: 'What is a "Covering Index" in database optimization?',
          options: [
            'An index that covers more than 10 tables at once',
            'An index that contains all columns requested by a query, allowing the engine to satisfy the query entirely from the index without reading the main table',
            'An index created exclusively on the primary key',
            'An encrypted index for security compliance'
          ],
          correct: 1,
          explanation: 'A covering index provides all needed data directly from the index leaf pages, eliminating table lookups.'
        }
      ],

      caseStudy: {
        company: 'JPMorgan Chase',
        role: 'Database Reliability Engineer',
        title: 'Optimizing Trade Blotter Status Inquiries Under Heavy Concurrency',
        scenario: 'A high-frequency desk executes 30,000 queries per second checking settled trade volumes by desk. Design an index strategy to achieve zero-disk-I/O response times.',
        schema: 'Trades: (trade_id INT, desk_id INT, status VARCHAR, amount FLOAT, executed_at TIMESTAMP)',
        recommendedQuery: `-- Supported by composite index: (desk_id, status, amount)
SELECT status, SUM(amount) AS desk_total
FROM Trades
WHERE desk_id = 104
GROUP BY status;`
      },

      problem: {
        title: 'Prime Broker Custody Reconciliation Capstone',
        difficulty: 'hard',
        spec: 'Write a full outer reconciliation query comparing internal_trade_blotter and custodian_clearing_feed, identifying orphan custody breaks and quantity mismatches.',
        starterSql: `SELECT 
  COALESCE(b.trade_id, c.clearing_ref) AS trade_identifier,
  COALESCE(b.ticker, c.security_id) AS symbol,
  b.trade_qty AS blotter_qty,
  c.cleared_qty AS custody_qty,
  CASE 
    WHEN b.trade_id IS NULL THEN 'ORPHAN_CUSTODY_BREAK'
    WHEN c.clearing_ref IS NULL THEN 'FAIL_TO_DELIVER_UNMATCHED'
    WHEN b.trade_qty <> c.cleared_qty THEN 'QUANTITY_MISMATCH'
    ELSE 'PERFECT_MATCH_SETTLED'
  END AS reconciliation_status
FROM internal_trade_blotter b
FULL OUTER JOIN custodian_clearing_feed c ON b.trade_id = c.internal_trade_id;`,
        targetTable: 'internal_trade_blotter'
      }
    }
  ];

  function getPhase(id) {
    return PHASES.find(p => p.id === id) || PHASES[0];
  }

  function getPhaseIndex(id) {
    return PHASES.findIndex(p => p.id === id);
  }

  // ===========================================================================
  // INITIALIZATION & RENDER
  // ===========================================================================
  function init() {
    const container = document.getElementById('viewMasteryCourse');
    if (!container) return;

    renderCourseShell(container);
    bindCourseEvents(container);
  }

  function renderCourseShell(container) {
    const active = getPhase(state.activePhaseId);
    const completedCount = state.completedPhases.size;
    const progressPct = Math.round((completedCount / PHASES.length) * 100);

    container.innerHTML = `
      <div class="mastery-course-wrapper">
        <!-- 1. Sleek Course Top Header -->
        <header class="course-header-bar">
          <div class="course-header-left">
            <span class="course-badge-icon">📖</span>
            <div class="course-title-col">
              <h1 class="course-headline">
                SQL Mastery &amp; Technical Interview Preparation
                <span class="course-pill-tag">Interactive Curriculum</span>
              </h1>
              <p class="course-subline">
                Master SQL fundamentals, practical patterns &bull; Crack FAANG &amp; tech interviews with confidence
              </p>
            </div>
          </div>

          <div class="course-header-right">
            <div class="course-mastery-meter" title="${completedCount} of ${PHASES.length} Topics Mastered">
              <span class="meter-label">${completedCount}/${PHASES.length} Complete (${progressPct}%)</span>
              <div class="meter-track">
                <div class="meter-fill" style="width: ${progressPct}%;"></div>
              </div>
            </div>
          </div>
        </header>

        <!-- 2. The 10-Topic Horizontal Navigation Rail -->
        <nav class="phase-execution-rail" id="phaseExecutionRail">
          ${PHASES.map((p, idx) => {
            const isActive = p.id === state.activePhaseId;
            const isDone = state.completedPhases.has(p.id);
            const sep = idx < PHASES.length - 1 ? '<span class="phase-rail-sep">➔</span>' : '';
            return `
              <button class="phase-node-btn ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}" data-phase="${p.id}">
                <span class="phase-seq-tag">${p.seq}</span>
                <span class="phase-name-tag">${p.shortName}</span>
                ${isDone ? '<span style="font-size: 10px;">✓</span>' : ''}
              </button>
              ${sep}
            `;
          }).join('')}
        </nav>

        <!-- 3. Active Topic Banner & 4-Step Navigation Tabs -->
        <section class="active-phase-card">
          <div class="phase-hero-info">
            <div class="phase-hero-badge">${active.icon}</div>
            <div class="phase-hero-text">
              <h2>Topic ${active.seq}: ${active.title}</h2>
              <p>${active.summary}</p>
            </div>
          </div>

          <div class="step-order-tabs">
            <button class="step-tab-btn ${state.activeStep === 'theory' ? 'active' : ''}" data-step="theory">
              <span>📖 1. Learn &amp; Visualize</span>
            </button>
            <button class="step-tab-btn ${state.activeStep === 'mcqs' ? 'active' : ''}" data-step="mcqs">
              <span>🧠 2. Quick Quiz</span>
              <span class="step-count-pill">${active.mcqs ? active.mcqs.length : 0}</span>
            </button>
            <button class="step-tab-btn ${state.activeStep === 'case' ? 'active' : ''}" data-step="case">
              <span>🏢 3. Real Case</span>
              <span class="step-count-pill">${active.caseStudy ? active.caseStudy.company : ''}</span>
            </button>
            <button class="step-tab-btn ${state.activeStep === 'problem' ? 'active' : ''}" data-step="problem">
              <span>⚡ 4. Query Studio</span>
              <span class="step-count-pill">${active.problem ? active.problem.difficulty : ''}</span>
            </button>
          </div>
        </section>

        <!-- 4. Active Step Content -->
        <main class="course-active-step-content" id="courseStepContent">
          ${renderActiveStepContent(active)}
        </main>

        <!-- 5. Bottom Navigation Bar -->
        <footer class="course-footer-nav">
          <button id="btnPrevPhase" class="phase-nav-btn" ${getPhaseIndex(active.id) === 0 ? 'disabled' : ''}>
            <span>◀ Previous Topic</span>
          </button>

          <div style="display: flex; gap: 8px;">
            <button id="btnMarkComplete" class="phase-nav-btn" style="border-color: var(--accent); color: var(--accent);">
              <span>${state.completedPhases.has(active.id) ? '✓ Topic Completed' : 'Mark Topic Complete'}</span>
            </button>
          </div>

          <button id="btnNextPhase" class="phase-nav-btn" ${getPhaseIndex(active.id) === PHASES.length - 1 ? 'disabled' : ''}>
            <span>Next Topic ▶</span>
          </button>
        </footer>
      </div>
    `;
  }

  // ===========================================================================
  // RENDER ACTIVE STEP CONTENT
  // ===========================================================================
  function renderActiveStepContent(phase) {
    if (state.activeStep === 'theory') {
      return renderTheoryStage(phase);
    }
    if (state.activeStep === 'mcqs') {
      return renderMcqsStage(phase);
    }
    if (state.activeStep === 'case') {
      return renderCaseStage(phase);
    }
    if (state.activeStep === 'problem') {
      return renderProblemStage(phase);
    }
    return '';
  }

  // ===========================================================================
  // STAGE 1: LEARN & VISUALIZE (LESSON + LIVE SIMULATOR)
  // ===========================================================================
  function renderTheoryStage(phase) {
    const lesson = phase.lesson;

    return `
      <div class="stage-theory-container">
        <!-- Interactive Live Simulator Widget -->
        <div class="interactive-simulator-card">
          ${renderInteractiveSimulator(phase)}
        </div>

        <!-- Main Lesson Content & Guidance -->
        <div class="theory-content-grid">
          <!-- Left Column: Step-by-Step Lessons & Code Examples -->
          <div class="theory-main-column">
            <div class="theory-text-card">
              <h3 class="theory-card-heading">
                <span>💡 The Core Concept</span>
              </h3>
              <div class="theory-card-body">
                <p>${lesson.intro}</p>
                <div class="theory-callout analogy">
                  <span style="font-size: 18px;">🎯</span>
                  <div><strong>Simple Analogy:</strong> ${lesson.analogy}</div>
                </div>
              </div>
            </div>

            ${(lesson.steps || []).map(step => `
              <div class="theory-text-card">
                <h3 class="theory-card-heading">
                  <span>${step.title}</span>
                </h3>
                <div class="theory-card-body">
                  ${formatTheoryMarkdown(step.body)}
                </div>
              </div>
            `).join('')}

            <!-- Best Practice vs Anti-Pattern Diff Card -->
            ${phase.diff ? `
              <div class="architecture-diff-card">
                <div class="diff-header-row">
                  <span class="diff-title">⚡ Best Practice vs Common Anti-Pattern</span>
                </div>
                <div class="diff-columns-grid">
                  <div class="diff-col bad">
                    <div class="diff-col-header">
                      <span>❌</span>
                      <span>${phase.diff.badTitle}</span>
                    </div>
                    <pre class="diff-code">${escapeHtml(phase.diff.badSql)}</pre>
                    <div class="diff-reason">${phase.diff.badExplanation}</div>
                  </div>
                  <div class="diff-col good">
                    <div class="diff-col-header">
                      <span>✅</span>
                      <span>${phase.diff.goodTitle}</span>
                    </div>
                    <pre class="diff-code">${escapeHtml(phase.diff.goodSql)}</pre>
                    <div class="diff-reason">${phase.diff.goodExplanation}</div>
                  </div>
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Right Column: Pro Tips, Execution Order & Next Step Button -->
          <div class="theory-sidebar-column">
            <!-- Pro Tips Card -->
            <div class="senior-gotchas-card">
              <div class="gotchas-title">
                <span>💡</span>
                <span>Pro Tips &amp; Interview Secrets</span>
              </div>
              <div class="gotchas-list">
                ${(lesson.proTips || []).map(tip => `
                  <div class="gotcha-item">
                    <div class="gotcha-item-title">${tip.title}</div>
                    <div class="gotcha-item-text">${tip.text}</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Execution Rank Card -->
            <div class="theory-text-card" style="background: var(--bg-card-subtle);">
              <h4 style="margin: 0 0 6px 0; font-size: 12px; font-weight: 800; text-transform: uppercase; color: var(--accent);">
                Physical Engine Order
              </h4>
              <p style="margin: 0; font-size: 12.5px; color: var(--text-secondary); line-height: 1.5;">
                <strong>${phase.execRank}</strong>. The database optimizer processes this clause at this specific stage of execution.
              </p>
            </div>

            <!-- Next Step CTA -->
            <button class="case-solve-cta" onclick="window.MasteryCourseEngine.switchStep('mcqs')">
              <span>Next: Quick Quiz (Step 2) ➔</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // ===========================================================================
  // INTERACTIVE LIVE SIMULATOR DISPATCHER
  // ===========================================================================
  function renderInteractiveSimulator(phase) {
    if (phase.id === 'phase_01_joins') return renderJoinSimulator();
    if (phase.id === 'phase_02_where') return renderWhereSimulator();
    if (phase.id === 'phase_03_groupby') return renderGroupBySimulator();
    if (phase.id === 'phase_04_having') return renderHavingSimulator();
    if (phase.id === 'phase_05_select_window') return renderWindowSimulator();
    if (phase.id === 'phase_06_distinct') return renderDistinctSimulator();
    if (phase.id === 'phase_07_orderby') return renderOrderBySimulator();
    if (phase.id === 'phase_08_limit_offset') return renderLimitSimulator();
    if (phase.id === 'phase_09_ctes') return renderCteSimulator();
    if (phase.id === 'phase_10_storage_defense') return renderIndexSimulator();

    return `<div style="padding: 20px;">Simulator ready</div>`;
  }

  // --- 1. JOIN SIMULATOR ---
  function renderJoinSimulator() {
    const mode = state.simState.phase_01_joins || 'inner';

    // Calculate joined result rows based on mode
    let results = [];
    let explanation = '';

    if (mode === 'inner') {
      results = [
        { order_id: 101, amount: '$250', cust_id: 5, name: 'Alice Smith', city: 'London', status: 'match' },
        { order_id: 102, amount: '$120', cust_id: 8, name: 'Bob Jones', city: 'New York', status: 'match' },
        { order_id: 104, amount: '$310', cust_id: 5, name: 'Alice Smith', city: 'London', status: 'match' }
      ];
      explanation = '<strong>INNER JOIN</strong>: Only keeps rows where the customer_id matches in BOTH tables. Order #103 (no matching customer) and Charlie Lee (no orders) are excluded.';
    } else if (mode === 'left') {
      results = [
        { order_id: 101, amount: '$250', cust_id: 5, name: 'Alice Smith', city: 'London', status: 'match' },
        { order_id: 102, amount: '$120', cust_id: 8, name: 'Bob Jones', city: 'New York', status: 'match' },
        { order_id: 103, amount: '$80',  cust_id: 'NULL', name: 'NULL', city: 'NULL', status: 'null' },
        { order_id: 104, amount: '$310', cust_id: 5, name: 'Alice Smith', city: 'London', status: 'match' }
      ];
      explanation = '<strong>LEFT JOIN</strong>: Keeps EVERY row from Orders (left table). Order #103 has customer_id 9 (which does not exist in Customers), so customer columns are filled with <code>NULL</code>.';
    } else if (mode === 'right') {
      results = [
        { order_id: 101, amount: '$250', cust_id: 5, name: 'Alice Smith', city: 'London', status: 'match' },
        { order_id: 104, amount: '$310', cust_id: 5, name: 'Alice Smith', city: 'London', status: 'match' },
        { order_id: 102, amount: '$120', cust_id: 8, name: 'Bob Jones', city: 'New York', status: 'match' },
        { order_id: 'NULL', amount: 'NULL', cust_id: 12, name: 'Charlie Lee', city: 'Tokyo', status: 'null' }
      ];
      explanation = '<strong>RIGHT JOIN</strong>: Keeps EVERY customer (right table). Charlie Lee has placed 0 orders, so order columns are filled with <code>NULL</code>.';
    } else if (mode === 'full') {
      results = [
        { order_id: 101, amount: '$250', cust_id: 5, name: 'Alice Smith', city: 'London', status: 'match' },
        { order_id: 102, amount: '$120', cust_id: 8, name: 'Bob Jones', city: 'New York', status: 'match' },
        { order_id: 103, amount: '$80',  cust_id: 'NULL', name: 'NULL', city: 'NULL', status: 'null' },
        { order_id: 104, amount: '$310', cust_id: 5, name: 'Alice Smith', city: 'London', status: 'match' },
        { order_id: 'NULL', amount: 'NULL', cust_id: 12, name: 'Charlie Lee', city: 'Tokyo', status: 'null' }
      ];
      explanation = '<strong>FULL OUTER JOIN</strong>: Keeps all records from BOTH tables, with NULLs on whichever side had no match.';
    }

    return `
      <div class="sim-control-strip">
        <div class="sim-title-group">
          <span>✨</span>
          <span>Interactive Join Simulator (Click a Join type to test live)</span>
        </div>
        <div class="sim-toggle-group">
          <button class="sim-toggle-btn ${mode === 'inner' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('phase_01_joins', 'inner')">INNER JOIN</button>
          <button class="sim-toggle-btn ${mode === 'left' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('phase_01_joins', 'left')">LEFT JOIN</button>
          <button class="sim-toggle-btn ${mode === 'right' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('phase_01_joins', 'right')">RIGHT JOIN</button>
          <button class="sim-toggle-btn ${mode === 'full' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('phase_01_joins', 'full')">FULL JOIN</button>
        </div>
      </div>

      <div class="sim-viewport">
        <!-- Tables Row -->
        <div class="sim-tables-row">
          <!-- Left Table: Orders -->
          <div class="sim-table-card">
            <div class="sim-table-title">
              <span>Orders (Left Table)</span>
              <span class="course-pill-tag">4 Rows</span>
            </div>
            <div class="sim-table-wrap">
              <table class="sim-data-table">
                <thead>
                  <tr><th>order_id</th><th>customer_id</th><th>amount</th></tr>
                </thead>
                <tbody>
                  <tr class="${mode === 'inner' || mode === 'left' || mode === 'full' ? 'highlight-match' : ''}"><td>#101</td><td><strong>5</strong></td><td>$250</td></tr>
                  <tr class="${mode === 'inner' || mode === 'left' || mode === 'full' ? 'highlight-match' : ''}"><td>#102</td><td><strong>8</strong></td><td>$120</td></tr>
                  <tr class="${mode === 'inner' ? 'highlight-drop' : 'highlight-null'}"><td>#103</td><td>9 (Unmatched)</td><td>$80</td></tr>
                  <tr class="${mode === 'inner' || mode === 'left' || mode === 'full' ? 'highlight-match' : ''}"><td>#104</td><td><strong>5</strong></td><td>$310</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Right Table: Customers -->
          <div class="sim-table-card">
            <div class="sim-table-title">
              <span>Customers (Right Table)</span>
              <span class="course-pill-tag">3 Rows</span>
            </div>
            <div class="sim-table-wrap">
              <table class="sim-data-table">
                <thead>
                  <tr><th>customer_id</th><th>name</th><th>city</th></tr>
                </thead>
                <tbody>
                  <tr class="highlight-match"><td><strong>5</strong></td><td>Alice Smith</td><td>London</td></tr>
                  <tr class="highlight-match"><td><strong>8</strong></td><td>Bob Jones</td><td>New York</td></tr>
                  <tr class="${mode === 'inner' || mode === 'left' ? 'highlight-drop' : 'highlight-null'}"><td>12</td><td>Charlie Lee</td><td>Tokyo</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Result Box -->
        <div class="sim-result-box">
          <div class="sim-result-header">
            <span>Query Output: <code>FROM Orders ${mode.toUpperCase()} JOIN Customers ON Orders.customer_id = Customers.customer_id</code></span>
            <span class="course-pill-tag">${results.length} Rows Returned</span>
          </div>
          <div class="sim-table-wrap">
            <table class="sim-data-table">
              <thead>
                <tr><th>order_id</th><th>amount</th><th>customer_id</th><th>name</th><th>city</th><th>Status</th></tr>
              </thead>
              <tbody>
                ${results.map(r => `
                  <tr class="${r.status === 'match' ? 'highlight-match' : 'highlight-null'}">
                    <td>${r.order_id}</td>
                    <td>${r.amount}</td>
                    <td>${r.cust_id}</td>
                    <td>${r.name}</td>
                    <td>${r.city}</td>
                    <td><span class="sim-badge ${r.status === 'match' ? 'match' : 'null'}">${r.status === 'match' ? '✓ Matched' : '⚠️ NULL-Filled'}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <div class="sim-explanation-callout">
            ${explanation}
          </div>
        </div>
      </div>
    `;
  }

  // --- 2. WHERE SIMULATOR ---
  function renderWhereSimulator() {
    const filter = state.simState.phase_02_where || 'salary_gt_100k';

    let conditionLabel = '';
    let predicate = () => true;

    if (filter === 'salary_gt_100k') {
      conditionLabel = 'salary > 100000';
      predicate = e => e.salary > 100000;
    } else if (filter === 'dept_eng') {
      conditionLabel = "department = 'Engineering'";
      predicate = e => e.dept === 'Engineering';
    } else if (filter === 'tenure_gte_18') {
      conditionLabel = 'tenure >= 18';
      predicate = e => e.tenure >= 18;
    } else {
      conditionLabel = 'No Filter (All Rows)';
      predicate = () => true;
    }

    const rows = SIM_DATA.employees;
    const passedRows = rows.filter(predicate);

    return `
      <div class="sim-control-strip">
        <div class="sim-title-group">
          <span>🛡️</span>
          <span>Interactive Filter Simulator (Select a rule to filter raw rows)</span>
        </div>
        <div class="sim-toggle-group">
          <button class="sim-toggle-btn ${filter === 'salary_gt_100k' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('phase_02_where', 'salary_gt_100k')">salary > 100k</button>
          <button class="sim-toggle-btn ${filter === 'dept_eng' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('phase_02_where', 'dept_eng')">dept = 'Engineering'</button>
          <button class="sim-toggle-btn ${filter === 'tenure_gte_18' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('phase_02_where', 'tenure_gte_18')">tenure >= 18 mos</button>
          <button class="sim-toggle-btn ${filter === 'all' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('phase_02_where', 'all')">Show All</button>
        </div>
      </div>

      <div class="sim-viewport">
        <div class="sim-result-box">
          <div class="sim-result-header">
            <span>Evaluating Rule: <code>WHERE ${conditionLabel}</code></span>
            <span class="course-pill-tag">${passedRows.length} of ${rows.length} Passed</span>
          </div>
          <div class="sim-table-wrap">
            <table class="sim-data-table">
              <thead>
                <tr><th>id</th><th>name</th><th>department</th><th>salary</th><th>tenure</th><th>Filter Result</th></tr>
              </thead>
              <tbody>
                ${rows.map(e => {
                  const pass = predicate(e);
                  return `
                    <tr class="${pass ? 'highlight-match' : 'highlight-drop'}">
                      <td>${e.id}</td>
                      <td>${e.name}</td>
                      <td>${e.dept}</td>
                      <td>$${e.salary.toLocaleString()}</td>
                      <td>${e.tenure} mos</td>
                      <td>
                        <span class="sim-badge ${pass ? 'match' : 'drop'}">${pass ? '✓ PASSED (TRUE)' : '❌ DROPPED (FALSE)'}</span>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
          <div class="sim-explanation-callout">
            The <code>WHERE</code> clause evaluates row-by-row. Only rows returning <strong>TRUE</strong> survive to step 3 (GROUP BY).
          </div>
        </div>
      </div>
    `;
  }

  // --- 3. GROUP BY SIMULATOR ---
  function renderGroupBySimulator() {
    const agg = state.simState.phase_03_groupby || 'count';

    // Group employees by department
    const groups = {};
    SIM_DATA.employees.forEach(e => {
      if (!groups[e.dept]) groups[e.dept] = [];
      groups[e.dept].push(e);
    });

    return `
      <div class="sim-control-strip">
        <div class="sim-title-group">
          <span>📦</span>
          <span>Interactive Grouping Simulator (Select an aggregation function)</span>
        </div>
        <div class="sim-toggle-group">
          <button class="sim-toggle-btn ${agg === 'count' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('phase_03_groupby', 'count')">COUNT(*)</button>
          <button class="sim-toggle-btn ${agg === 'sum' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('phase_03_groupby', 'sum')">SUM(salary)</button>
          <button class="sim-toggle-btn ${agg === 'avg' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('phase_03_groupby', 'avg')">AVG(salary)</button>
        </div>
      </div>

      <div class="sim-viewport">
        <!-- Buckets Row -->
        <div class="sim-tables-row">
          ${Object.keys(groups).map(dept => {
            const list = groups[dept];
            const totalSalary = list.reduce((acc, curr) => acc + curr.salary, 0);
            const avgSalary = Math.round(totalSalary / list.length);

            return `
              <div class="sim-table-card">
                <div class="sim-table-title">
                  <span>Bucket: '${dept}'</span>
                  <span class="course-pill-tag">${list.length} Staff</span>
                </div>
                <div style="padding: 10px 12px; font-size: 11.5px; color: var(--text-secondary);">
                  <div style="margin-bottom: 6px;">Staff: ${list.map(x => x.name.split(' ')[0]).join(', ')}</div>
                  <div style="font-weight: 700; color: var(--accent);">
                    ${agg === 'count' ? `COUNT(*) = ${list.length}` : ''}
                    ${agg === 'sum' ? `SUM(salary) = $${totalSalary.toLocaleString()}` : ''}
                    ${agg === 'avg' ? `AVG(salary) = $${avgSalary.toLocaleString()}` : ''}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Result Summary Table -->
        <div class="sim-result-box">
          <div class="sim-result-header">
            <span>Summary Output: <code>SELECT department, ${agg.toUpperCase()} FROM Employees GROUP BY department</code></span>
            <span class="course-pill-tag">${Object.keys(groups).length} Grouped Rows</span>
          </div>
          <div class="sim-table-wrap">
            <table class="sim-data-table">
              <thead>
                <tr>
                  <th>department</th>
                  <th>${agg === 'count' ? 'headcount' : (agg === 'sum' ? 'total_payroll' : 'avg_salary')}</th>
                </tr>
              </thead>
              <tbody>
                ${Object.keys(groups).map(dept => {
                  const list = groups[dept];
                  const total = list.reduce((acc, c) => acc + c.salary, 0);
                  const avg = Math.round(total / list.length);
                  return `
                    <tr class="highlight-match">
                      <td>${dept}</td>
                      <td><strong>${agg === 'count' ? list.length : (agg === 'sum' ? '$' + total.toLocaleString() : '$' + avg.toLocaleString())}</strong></td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  // --- 4. HAVING SIMULATOR ---
  function renderHavingSimulator() {
    const filter = state.simState.phase_04_having || 'count_gte_3';

    const groups = [
      { dept: 'Analytics', count: 3, avgSalary: 101333 },
      { dept: 'Engineering', count: 2, avgSalary: 135000 },
      { dept: 'Finance', count: 2, avgSalary: 98000 },
      { dept: 'Sales', count: 1, avgSalary: 62000 }
    ];

    let rule = g => true;
    let label = 'No Filter';
    if (filter === 'count_gte_3') {
      rule = g => g.count >= 3;
      label = 'HAVING COUNT(*) >= 3';
    } else if (filter === 'avg_gte_115k') {
      rule = g => g.avgSalary >= 115000;
      label = 'HAVING AVG(salary) >= 115000';
    }

    const passed = groups.filter(rule);

    return `
      <div class="sim-control-strip">
        <div class="sim-title-group">
          <span>🔍</span>
          <span>Interactive Group Filter (HAVING checks the calculated buckets)</span>
        </div>
        <div class="sim-toggle-group">
          <button class="sim-toggle-btn ${filter === 'count_gte_3' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('phase_04_having', 'count_gte_3')">HAVING COUNT(*) >= 3</button>
          <button class="sim-toggle-btn ${filter === 'avg_gte_115k' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('phase_04_having', 'avg_gte_115k')">HAVING AVG(salary) >= 115k</button>
          <button class="sim-toggle-btn ${filter === 'all' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('phase_04_having', 'all')">Show All Groups</button>
        </div>
      </div>

      <div class="sim-viewport">
        <div class="sim-result-box">
          <div class="sim-result-header">
            <span>Evaluating: <code>${label}</code></span>
            <span class="course-pill-tag">${passed.length} of ${groups.length} Groups Kept</span>
          </div>
          <div class="sim-table-wrap">
            <table class="sim-data-table">
              <thead>
                <tr><th>department</th><th>count</th><th>avg_salary</th><th>HAVING Verdict</th></tr>
              </thead>
              <tbody>
                ${groups.map(g => {
                  const keep = rule(g);
                  return `
                    <tr class="${keep ? 'highlight-match' : 'highlight-drop'}">
                      <td>${g.dept}</td>
                      <td>${g.count} staff</td>
                      <td>$${g.avgSalary.toLocaleString()}</td>
                      <td><span class="sim-badge ${keep ? 'match' : 'drop'}">${keep ? '✓ KEPT' : '❌ ELIMINATED BY HAVING'}</span></td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
          <div class="sim-explanation-callout">
            Notice how <strong>WHERE</strong> operates on single rows, but <strong>HAVING</strong> operates on the computed department summaries!
          </div>
        </div>
      </div>
    `;
  }

  // --- 5. WINDOW SIMULATOR ---
  function renderWindowSimulator() {
    const fn = state.simState.phase_05_select_window || 'row_number';

    return `
      <div class="sim-control-strip">
        <div class="sim-title-group">
          <span>🪟</span>
          <span>Interactive Window Function Simulator (Keeps all rows intact!)</span>
        </div>
        <div class="sim-toggle-group">
          <button class="sim-toggle-btn ${fn === 'row_number' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('phase_05_select_window', 'row_number')">ROW_NUMBER()</button>
          <button class="sim-toggle-btn ${fn === 'rank' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('phase_05_select_window', 'rank')">RANK() (Skips)</button>
          <button class="sim-toggle-btn ${fn === 'dense_rank' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('phase_05_select_window', 'dense_rank')">DENSE_RANK() (No Skips)</button>
          <button class="sim-toggle-btn ${fn === 'running_total' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('phase_05_select_window', 'running_total')">Running Total</button>
        </div>
      </div>

      <div class="sim-viewport">
        <div class="sim-result-box">
          <div class="sim-result-header">
            <span>Window Calculation: <code>OVER (PARTITION BY department ORDER BY salary DESC)</code></span>
            <span class="course-pill-tag">8 Rows (Zero Compression)</span>
          </div>
          <div class="sim-table-wrap">
            <table class="sim-data-table">
              <thead>
                <tr><th>name</th><th>department</th><th>salary</th><th>Window Calculated Result</th></tr>
              </thead>
              <tbody>
                <tr class="highlight-match"><td>Samantha Davis</td><td>Engineering</td><td>$145,000</td><td><strong>${fn === 'running_total' ? '$145,000' : '1'}</strong></td></tr>
                <tr class="highlight-match"><td>David Chen</td><td>Engineering</td><td>$125,000</td><td><strong>${fn === 'running_total' ? '$270,000' : '2'}</strong></td></tr>
                <tr class="highlight-match"><td>Belvet Anderson</td><td>Analytics</td><td>$115,000</td><td><strong>${fn === 'running_total' ? '$115,000' : '1'}</strong></td></tr>
                <tr class="highlight-match"><td>Julia Smith</td><td>Analytics</td><td>$115,000 (Tie)</td><td><strong>${fn === 'row_number' ? '2' : (fn === 'rank' ? '1' : (fn === 'dense_rank' ? '1' : '$230,000'))}</strong></td></tr>
                <tr class="highlight-match"><td>Ashley Miller</td><td>Analytics</td><td>$92,000</td><td><strong>${fn === 'row_number' ? '3' : (fn === 'rank' ? '3' : (fn === 'dense_rank' ? '2' : '$322,000'))}</strong></td></tr>
              </tbody>
            </table>
          </div>
          <div class="sim-explanation-callout">
            ${fn === 'dense_rank' ? '<strong>DENSE_RANK()</strong>: Notice for Analytics: Belvet and Julia both earn $115k and get rank 1. Ashley gets rank 2 with <em>no skipped numbers</em>.' : ''}
            ${fn === 'rank' ? '<strong>RANK()</strong>: When Belvet and Julia tie for rank 1, RANK() skips rank 2 and assigns rank 3 to Ashley.' : ''}
            ${fn === 'running_total' ? '<strong>Running Total</strong>: Computes cumulative payroll row-by-row within each department window.' : ''}
            ${fn === 'row_number' ? '<strong>ROW_NUMBER()</strong>: Simple sequential count 1, 2, 3... without respecting ties.' : ''}
          </div>
        </div>
      </div>
    `;
  }

  // --- 6. DISTINCT SIMULATOR ---
  function renderDistinctSimulator() {
    const mode = state.simState.phase_06_distinct || 'distinct_city';

    const rawRows = [
      { id: 1, name: 'Alice', city: 'London', state: 'UK' },
      { id: 2, name: 'Bob', city: 'New York', state: 'NY' },
      { id: 3, name: 'Charlie', city: 'London', state: 'UK' },
      { id: 4, name: 'David', city: 'London', state: 'ON' }, // London, Ontario
      { id: 5, name: 'Elena', city: 'New York', state: 'NY' }
    ];

    let displayRows = [];
    if (mode === 'all') {
      displayRows = rawRows.map(r => ({ ...r, isDup: false }));
    } else if (mode === 'distinct_city') {
      displayRows = [
        { city: 'London', note: 'Combined 3 records' },
        { city: 'New York', note: 'Combined 2 records' }
      ];
    } else if (mode === 'distinct_pair') {
      displayRows = [
        { city: 'London', state: 'UK', note: 'Unique Pair' },
        { city: 'New York', state: 'NY', note: 'Unique Pair' },
        { city: 'London', state: 'ON (Canada)', note: 'Unique Pair' }
      ];
    }

    return `
      <div class="sim-control-strip">
        <div class="sim-title-group">
          <span>✨</span>
          <span>Interactive Deduplication Simulator</span>
        </div>
        <div class="sim-toggle-group">
          <button class="sim-toggle-btn ${mode === 'all' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('phase_06_distinct', 'all')">Raw Rows (With Duplicates)</button>
          <button class="sim-toggle-btn ${mode === 'distinct_city' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('phase_06_distinct', 'distinct_city')">DISTINCT city</button>
          <button class="sim-toggle-btn ${mode === 'distinct_pair' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('phase_06_distinct', 'distinct_pair')">DISTINCT city, state</button>
        </div>
      </div>

      <div class="sim-viewport">
        <div class="sim-result-box">
          <div class="sim-result-header">
            <span>Result: <code>${mode === 'all' ? 'SELECT city, state' : (mode === 'distinct_city' ? 'SELECT DISTINCT city' : 'SELECT DISTINCT city, state')}</code></span>
            <span class="course-pill-tag">${displayRows.length} Unique Rows</span>
          </div>
          <div class="sim-table-wrap">
            <table class="sim-data-table">
              <thead>
                <tr><th>city</th>${mode !== 'distinct_city' ? '<th>state</th>' : ''}<th>Note</th></tr>
              </thead>
              <tbody>
                ${displayRows.map(r => `
                  <tr class="highlight-match">
                    <td><strong>${r.city}</strong></td>
                    ${mode !== 'distinct_city' ? `<td>${r.state}</td>` : ''}
                    <td><span class="sim-badge match">${r.note || 'Original'}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <div class="sim-explanation-callout">
            ${mode === 'distinct_pair' ? 'Notice: "London, UK" and "London, ON" both survive because the <strong>pair</strong> is distinct!' : 'DISTINCT collapses identical rows into a single unique row.'}
          </div>
        </div>
      </div>
    `;
  }

  // --- 7. ORDER BY SIMULATOR ---
  function renderOrderBySimulator() {
    const mode = state.simState.phase_07_orderby || 'salary_desc';

    let list = [...SIM_DATA.employees];
    if (mode === 'salary_desc') {
      list.sort((a, b) => b.salary - a.salary);
    } else if (mode === 'name_asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (mode === 'dept_salary') {
      list.sort((a, b) => a.dept.localeCompare(b.dept) || b.salary - a.salary);
    }

    return `
      <div class="sim-control-strip">
        <div class="sim-title-group">
          <span>📶</span>
          <span>Interactive Sorter Simulator</span>
        </div>
        <div class="sim-toggle-group">
          <button class="sim-toggle-btn ${mode === 'salary_desc' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('phase_07_orderby', 'salary_desc')">ORDER BY salary DESC</button>
          <button class="sim-toggle-btn ${mode === 'name_asc' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('phase_07_orderby', 'name_asc')">ORDER BY name ASC</button>
          <button class="sim-toggle-btn ${mode === 'dept_salary' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('phase_07_orderby', 'dept_salary')">ORDER BY dept, salary DESC</button>
        </div>
      </div>

      <div class="sim-viewport">
        <div class="sim-result-box">
          <div class="sim-result-header">
            <span>Sorted Output (Step 7)</span>
            <span class="course-pill-tag">${list.length} Rows</span>
          </div>
          <div class="sim-table-wrap">
            <table class="sim-data-table">
              <thead>
                <tr><th>Rank</th><th>name</th><th>department</th><th>salary</th></tr>
              </thead>
              <tbody>
                ${list.slice(0, 5).map((e, idx) => `
                  <tr class="highlight-match">
                    <td>#${idx + 1}</td>
                    <td>${e.name}</td>
                    <td>${e.dept}</td>
                    <td>$${e.salary.toLocaleString()}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  // --- 8. LIMIT & OFFSET SIMULATOR ---
  function renderLimitSimulator() {
    const page = state.simState.phase_08_limit_offset || 'page_1';

    let offset = 0;
    if (page === 'page_2') offset = 3;
    if (page === 'page_3') offset = 6;

    const list = SIM_DATA.employees;
    const pageRows = list.slice(offset, offset + 3);

    return `
      <div class="sim-control-strip">
        <div class="sim-title-group">
          <span>✂️</span>
          <span>Interactive Pagination Slicer</span>
        </div>
        <div class="sim-toggle-group">
          <button class="sim-toggle-btn ${page === 'page_1' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('phase_08_limit_offset', 'page_1')">Page 1: LIMIT 3 OFFSET 0</button>
          <button class="sim-toggle-btn ${page === 'page_2' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('phase_08_limit_offset', 'page_2')">Page 2: LIMIT 3 OFFSET 3</button>
          <button class="sim-toggle-btn ${page === 'page_3' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('phase_08_limit_offset', 'page_3')">Page 3: LIMIT 3 OFFSET 6</button>
        </div>
      </div>

      <div class="sim-viewport">
        <div class="sim-result-box">
          <div class="sim-result-header">
            <span>Displaying Page Window: <code>LIMIT 3 OFFSET ${offset}</code></span>
            <span class="course-pill-tag">Rows ${offset + 1} to ${offset + pageRows.length} of ${list.length}</span>
          </div>
          <div class="sim-table-wrap">
            <table class="sim-data-table">
              <thead>
                <tr><th>Row #</th><th>name</th><th>department</th><th>salary</th><th>Status</th></tr>
              </thead>
              <tbody>
                ${list.map((e, idx) => {
                  const inWindow = idx >= offset && idx < offset + 3;
                  return `
                    <tr class="${inWindow ? 'highlight-match' : 'highlight-drop'}">
                      <td>#${idx + 1}</td>
                      <td>${e.name}</td>
                      <td>${e.dept}</td>
                      <td>$${e.salary.toLocaleString()}</td>
                      <td><span class="sim-badge ${inWindow ? 'match' : 'drop'}">${inWindow ? 'DELIVERED IN PAGE' : 'SKIPPED BY OFFSET'}</span></td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  // --- 9. CTE SIMULATOR ---
  function renderCteSimulator() {
    return `
      <div class="sim-control-strip">
        <div class="sim-title-group">
          <span>🧱</span>
          <span>Interactive Query Pipeline (CTEs vs Final Query)</span>
        </div>
      </div>

      <div class="sim-viewport">
        <div class="sim-tables-row">
          <!-- Step 1: CTE -->
          <div class="sim-table-card">
            <div class="sim-table-title">
              <span>Step 1: WITH HighEarners AS (...)</span>
              <span class="course-pill-tag">Temporary Named Table</span>
            </div>
            <div style="padding: 10px 14px; font-size: 11.5px; font-family: monospace;">
              SELECT * FROM Employees WHERE salary > 100k;
            </div>
            <div class="sim-table-wrap">
              <table class="sim-data-table">
                <thead><tr><th>name</th><th>salary</th></tr></thead>
                <tbody>
                  <tr class="highlight-match"><td>David Chen</td><td>$125,000</td></tr>
                  <tr class="highlight-match"><td>Samantha Davis</td><td>$145,000</td></tr>
                  <tr class="highlight-match"><td>Rose Taylor</td><td>$108,000</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Step 2: Final Query -->
          <div class="sim-table-card">
            <div class="sim-table-title">
              <span>Step 2: Main Query Uses CTE</span>
              <span class="course-pill-tag">Final Report</span>
            </div>
            <div style="padding: 10px 14px; font-size: 11.5px; font-family: monospace;">
              SELECT department, COUNT(*) FROM HighEarners GROUP BY department;
            </div>
            <div class="sim-table-wrap">
              <table class="sim-data-table">
                <thead><tr><th>department</th><th>count_above_100k</th></tr></thead>
                <tbody>
                  <tr class="highlight-match"><td>Engineering</td><td>2 staff</td></tr>
                  <tr class="highlight-match"><td>Finance</td><td>1 staff</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // --- 10. INDEX SIMULATOR ---
  function renderIndexSimulator() {
    const mode = state.simState.phase_10_storage_defense || 'seek';

    return `
      <div class="sim-control-strip">
        <div class="sim-title-group">
          <span>⚡</span>
          <span>Interactive Performance Simulator: Table Scan vs B-Tree Seek</span>
        </div>
        <div class="sim-toggle-group">
          <button class="sim-toggle-btn ${mode === 'scan' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('phase_10_storage_defense', 'scan')">Full Table Scan (No Index)</button>
          <button class="sim-toggle-btn ${mode === 'seek' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('phase_10_storage_defense', 'seek')">B-Tree Index Seek (With Index)</button>
        </div>
      </div>

      <div class="sim-viewport">
        <div class="sim-result-box">
          <div class="sim-result-header">
            <span>Query: <code>SELECT * FROM Customers WHERE customer_id = 502;</code></span>
            <span class="course-pill-tag">${mode === 'seek' ? '⚡ 0.2ms Latency' : '⚠️ 420ms Latency'}</span>
          </div>
          <div style="padding: 18px 20px;">
            ${mode === 'scan' ? `
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <div style="font-weight: 700; color: #dc2626;">❌ Full Table Scan: Scanned 10,000,000 rows on disk!</div>
                <div style="font-size: 12.5px; color: var(--text-secondary); line-height: 1.5;">
                  Because no index exists on customer_id, the database engine must load and read every single 16KB data page from the hard drive, checking every row one by one.
                </div>
              </div>
            ` : `
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <div style="font-weight: 700; color: #16a34a;">✅ B-Tree Index Seek: Exactly 3 Page Hops (Microseconds)</div>
                <div style="font-size: 12.5px; color: var(--text-secondary); line-height: 1.5;">
                  Root Node ➔ Branch Node ➔ Leaf Node. The database skips 9,999,997 irrelevant records and reads only the exact matching row in 0.2 milliseconds!
                </div>
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  }

  // ===========================================================================
  // STAGE 2: QUICK QUIZ (MCQS)
  // ===========================================================================
  function renderMcqsStage(phase) {
    const questions = phase.mcqs || [];

    return `
      <div class="stage-mcqs-container">
        <div class="mcqs-header-strip">
          <span class="mcqs-header-info">
            Topic ${phase.seq} Knowledge Check: ${questions.length} Practical Questions
          </span>
          <span class="course-pill-tag">Keys 1, 2, 3, 4</span>
        </div>

        <div class="mcqs-list-grid">
          ${questions.map((q, qIdx) => {
            const answeredKey = `${phase.id}_${qIdx}`;
            const selectedOpt = state.mcqAnswers[answeredKey];
            const hasAnswered = selectedOpt !== undefined;

            return `
              <div class="course-mcq-card" data-qidx="${qIdx}">
                <div class="mcq-prompt-row">
                  <span class="mcq-index-badge">Q${qIdx + 1}</span>
                  <div class="mcq-question-text">${q.question}</div>
                </div>

                <div class="mcq-options-grid">
                  ${q.options.map((opt, optIdx) => {
                    let optClass = '';
                    if (hasAnswered) {
                      if (optIdx === q.correct) optClass = 'correct';
                      else if (optIdx === selectedOpt) optClass = 'wrong';
                    }
                    return `
                      <button class="course-opt-btn ${optClass}" ${hasAnswered ? 'disabled' : ''} onclick="window.MasteryCourseEngine.handleOptionClick('${phase.id}', ${qIdx}, ${optIdx})">
                        <span class="opt-key-badge">${optIdx + 1}</span>
                        <span>${opt}</span>
                      </button>
                    `;
                  }).join('')}
                </div>

                <div class="mcq-explanation-box ${hasAnswered ? 'show' : ''}">
                  <strong>Explanation:</strong> ${q.explanation}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <button class="case-solve-cta" style="margin-top: 10px;" onclick="window.MasteryCourseEngine.switchStep('case')">
          <span>Next: Real Company Case (Step 3) ➔</span>
        </button>
      </div>
    `;
  }

  // ===========================================================================
  // STAGE 3: REAL COMPANY CASE STUDY
  // ===========================================================================
  function renderCaseStage(phase) {
    const cs = phase.caseStudy;
    if (!cs) return '<div style="padding: 24px;">No case study defined for this topic.</div>';

    return `
      <div class="stage-case-container">
        <div class="case-dossier-card">
          <div class="case-header-row">
            <div class="case-employer-chip">
              <span style="font-size: 20px;">🏛️</span>
              <span class="case-company-name">${cs.company}</span>
              <span class="case-role-pill">${cs.role}</span>
            </div>
            <span class="course-pill-tag">Real Industry Case Study</span>
          </div>

          <h3 class="case-title">${cs.title}</h3>
          <div class="case-scenario-desc">${formatTheoryMarkdown(cs.scenario)}</div>

          <div>
            <div style="font-size: 11.5px; font-weight: 800; font-family: monospace; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px;">Target Schema:</div>
            <pre class="case-schema-preview">${escapeHtml(cs.schema)}</pre>
          </div>

          <div style="display: flex; gap: 10px; margin-top: 8px; flex-wrap: wrap;">
            <button class="case-solve-cta" onclick="window.MasteryCourseEngine.solveInStudio('${encodeURIComponent(cs.recommendedQuery)}', '${phase.problem ? phase.problem.targetTable : 'TRIANGLES'}')">
              <span>⚡ Load &amp; Test in Query Studio ➔</span>
            </button>
            <button class="phase-nav-btn" onclick="window.MasteryCourseEngine.switchStep('problem')">
              <span>Next: Hands-on Practice (Step 4) ➔</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // ===========================================================================
  // STAGE 4: QUERY PROBLEM & STUDIO SOLVER
  // ===========================================================================
  function renderProblemStage(phase) {
    const prob = phase.problem;
    if (!prob) return '<div style="padding: 24px;">No problem defined for this topic.</div>';

    const isShowingSol = state.showSolution[phase.id];

    return `
      <div class="stage-problems-container">
        <div class="problem-challenge-card">
          <div class="problem-header-row">
            <h3 class="problem-title">${prob.title}</h3>
            <span class="problem-difficulty-badge ${prob.difficulty}">${prob.difficulty}</span>
          </div>

          <div class="problem-spec-desc">
            ${formatTheoryMarkdown(prob.spec)}
          </div>

          <div>
            <div style="font-size: 11px; font-weight: 800; font-family: monospace; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px;">
              Starter Query Template (Editable in Studio):
            </div>
            <pre class="problem-starter-code">${escapeHtml(prob.starterSql)}</pre>
          </div>

          <div class="problem-actions-row">
            <button class="case-solve-cta" id="btnSolveStudio" onclick="window.MasteryCourseEngine.solveInStudio('${encodeURIComponent(prob.starterSql)}', '${prob.targetTable || 'TRIANGLES'}')">
              <span>⚡ Solve in Query Studio</span>
            </button>
            <button class="phase-nav-btn" onclick="window.MasteryCourseEngine.toggleSolution('${phase.id}')">
              <span>${isShowingSol ? 'Hide Expected Solution' : '👁️ View Solution'}</span>
            </button>
          </div>

          ${isShowingSol ? `
            <div style="margin-top: 12px; padding: 14px; background: var(--bg-card-subtle); border-radius: 6px; border: 1px solid var(--border-default);">
              <div style="font-size: 12px; font-weight: 800; color: var(--accent); margin-bottom: 6px;">Expected Solution:</div>
              <pre class="problem-starter-code" style="background: var(--bg-surface);">${escapeHtml(prob.starterSql)}</pre>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  // ===========================================================================
  // EVENT BINDINGS
  // ===========================================================================
  function bindCourseEvents(container) {
    // Phase Rail Clicks
    container.querySelectorAll('.phase-node-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const phaseId = btn.dataset.phase;
        if (phaseId && phaseId !== state.activePhaseId) {
          state.activePhaseId = phaseId;
          init();
        }
      });
    });

    // Step Order Tabs Clicks
    container.querySelectorAll('.step-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const step = btn.dataset.step;
        if (step && step !== state.activeStep) {
          state.activeStep = step;
          init();
        }
      });
    });

    // Prev / Next Navigation Buttons
    const btnPrev = container.querySelector('#btnPrevPhase');
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        const currIdx = getPhaseIndex(state.activePhaseId);
        if (currIdx > 0) {
          state.activePhaseId = PHASES[currIdx - 1].id;
          init();
        }
      });
    }

    const btnNext = container.querySelector('#btnNextPhase');
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        const currIdx = getPhaseIndex(state.activePhaseId);
        if (currIdx < PHASES.length - 1) {
          state.activePhaseId = PHASES[currIdx + 1].id;
          init();
        }
      });
    }

    // Mark Complete Button
    const btnComplete = container.querySelector('#btnMarkComplete');
    if (btnComplete) {
      btnComplete.addEventListener('click', () => {
        if (state.completedPhases.has(state.activePhaseId)) {
          state.completedPhases.delete(state.activePhaseId);
        } else {
          state.completedPhases.add(state.activePhaseId);
          if (window.soundFX) window.soundFX.playSuccess();
        }
        try {
          localStorage.setItem('sql_mastery_course_completed_v2', JSON.stringify(Array.from(state.completedPhases)));
        } catch (e) {}
        init();
      });
    }

    // Keyboard Shortcuts (1-4 for MCQs)
    const handleKeydown = (e) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) return;
      if (state.activeStep !== 'mcqs') return;

      const key = e.key;
      if (['1', '2', '3', '4'].includes(key)) {
        const optIdx = parseInt(key, 10) - 1;
        const phase = getPhase(state.activePhaseId);
        const unansweredIdx = (phase.mcqs || []).findIndex((_, qIdx) => state.mcqAnswers[`${phase.id}_${qIdx}`] === undefined);
        if (unansweredIdx !== -1) {
          handleOptionClick(phase.id, unansweredIdx, optIdx);
        }
      }
    };

    window.removeEventListener('keydown', window.__courseKeydownHandler);
    window.__courseKeydownHandler = handleKeydown;
    window.addEventListener('keydown', handleKeydown);
  }

  // ===========================================================================
  // PUBLIC CONTROLLER METHODS
  // ===========================================================================
  function setSimState(phaseId, val) {
    state.simState[phaseId] = val;
    init();
  }

  function handleOptionClick(phaseId, qIdx, optIdx) {
    const phase = getPhase(phaseId);
    const q = (phase.mcqs || [])[qIdx];
    if (!q) return;

    state.mcqAnswers[`${phaseId}_${qIdx}`] = optIdx;
    if (optIdx === q.correct) {
      if (window.soundFX) window.soundFX.playPop();
    } else {
      if (window.soundFX) window.soundFX.playWhoosh();
    }
    init();
  }

  function switchStep(stepName) {
    state.activeStep = stepName;
    init();
  }

  function toggleSolution(phaseId) {
    state.showSolution[phaseId] = !state.showSolution[phaseId];
    init();
  }

  function solveInStudio(encodedQuery, table) {
    const query = decodeURIComponent(encodedQuery);
    if (typeof window.switchMainView === 'function') {
      window.switchMainView('viewStudio');
    }
    if (window.StudioWorkbenchEngine && typeof window.StudioWorkbenchEngine.loadQuery === 'function') {
      window.StudioWorkbenchEngine.loadQuery(query, table);
    }
  }

  function escapeHtml(str) {
    return (str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function formatTheoryMarkdown(text) {
    return (text || '')
      .replace(/```sql([\s\S]*?)```/g, '<pre class="theory-code-snippet">$1</pre>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n- /g, '<br>&bull; ');
  }

  return {
    init,
    getPhases: () => PHASES,
    setSimState,
    switchStep,
    handleOptionClick,
    toggleSolution,
    solveInStudio
  };

})();
