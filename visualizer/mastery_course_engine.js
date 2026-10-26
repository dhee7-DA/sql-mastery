/**
 * SQL FOUNDRY - BEGINNER-TO-PRO MASTERY COURSE ENGINE
 * Natural Pedagogical Order of Learning:
 *   Topic 01: SELECT & FROM (The Foundation: Inspecting Tables, Picking Columns, Aliases & Math)
 *   Topic 02: Filtering Rows with WHERE (Comparisons, AND/OR, LIKE, IN, IS NULL)
 *   Topic 03: Sorting & Limiting (ORDER BY & LIMIT, ASC/DESC, Top-N Slicing, Pagination)
 *   Topic 04: Summarizing Data (COUNT, SUM, AVG, MIN, MAX across a Table)
 *   Topic 05: Grouping Data (GROUP BY & HAVING, Categories & Group Filtering)
 *   Topic 06: Combining Tables (INNER JOIN & LEFT JOIN, Primary & Foreign Keys)
 *   Topic 07: Advanced Joins & Sets (RIGHT, FULL OUTER, Self-Joins, and UNION)
 *   Topic 08: Conditional Logic & Transformations (CASE WHEN, COALESCE, Text & Date Functions)
 *   Topic 09: Multi-Step Queries (CTEs & Subqueries, The WITH Clause)
 *   Topic 10: Advanced Analytics (Window Functions, ROW_NUMBER, RANK, Running Totals)
 */

window.MasteryCourseEngine = (function () {
  'use strict';

  // State Management
  const state = {
    activePhaseId: 'topic_01_select_from',
    activeStep: 'theory', // 'theory', 'mcqs', 'case', 'problem'
    problemInput: {}, // key: phaseId => string (user query code)
    testResults: {}, // key: phaseId => { passed, message, userRows, expRows, userCols, expCols }
    visualMode: 'diagram', // 'diagram' | 'sandbox'
    diagramStep: 0, // 0: overview, 1: scan, 2: op, 3: emit
    completedPhases: new Set(),
    mcqAnswers: {}, // key: `${phaseId}_${qIdx}` => selectedOptionIndex
    showSolution: {}, // key: phaseId => boolean
    simState: {
      topic_01_select_from: 'columns', // 'all', 'columns', 'math'
      topic_02_where: 'salary_gt_100k', // 'salary_gt_100k', 'dept_eng', 'between', 'all'
      topic_03_order_limit: 'salary_desc', // 'salary_desc', 'name_asc', 'top3', 'page2'
      topic_04_aggregates: 'count', // 'count', 'sum', 'avg', 'min_max', 'distinct'
      topic_05_groupby_having: 'count', // 'count', 'avg', 'having_filter'
      topic_06_joins: 'inner', // 'inner', 'left', 'anti_left'
      topic_07_adv_joins_union: 'union_all', // 'union_all', 'union_distinct', 'full_join'
      topic_08_case_when: 'tiers', // 'tiers', 'pass_fail', 'coalesce'
      topic_09_ctes: 'both', // 'step1', 'step2', 'both'
      topic_10_window_functions: 'row_number' // 'row_number', 'rank', 'dense_rank', 'running_total'
    }
  };

  // Load progress from localStorage safely
  try {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('sql_foundry_learning_order_v1');
      if (saved) {
        JSON.parse(saved).forEach(id => state.completedPhases.add(id));
      }
    }
  } catch (e) {
    console.warn('Failed to load completed phases from localStorage', e);
  }

  // Consistent Mock Data Used in Beginner Simulators
  const SIM_DATA = {
    employees: [
      { id: 101, first_name: 'Ashley', department: 'Analytics', salary: 115000, tenure: 14, bonus: 5000 },
      { id: 102, first_name: 'David', department: 'Engineering', salary: 125000, tenure: 36, bonus: 8000 },
      { id: 103, first_name: 'Julia', department: 'Analytics', salary: 92000, tenure: 8, bonus: null },
      { id: 104, first_name: 'Kevin', department: 'Finance', salary: 88000, tenure: 22, bonus: 4000 },
      { id: 105, first_name: 'Samantha', department: 'Engineering', salary: 145000, tenure: 48, bonus: 12000 },
      { id: 106, first_name: 'Patrick', department: 'Sales', salary: 62000, tenure: 6, bonus: null },
      { id: 107, first_name: 'Rose', department: 'Finance', salary: 108000, tenure: 19, bonus: 6000 },
      { id: 108, first_name: 'Belvet', department: 'Analytics', salary: 97000, tenure: 11, bonus: 3500 }
    ],
    orders: [
      { order_id: 101, customer_id: 5, amount: '$250', date: '2024-01-12' },
      { order_id: 102, customer_id: 8, amount: '$120', date: '2024-01-14' },
      { order_id: 103, customer_id: 9, amount: '$80',  date: '2024-01-15' },
      { order_id: 104, customer_id: 5, amount: '$310', date: '2024-01-18' }
    ],
    customers: [
      { customer_id: 5, name: 'Alice Smith', city: 'London' },
      { customer_id: 8, name: 'Bob Jones', city: 'New York' },
      { customer_id: 12, name: 'Charlie Lee', city: 'Tokyo' }
    ]
  };

  // ===========================================================================
  // 10 STEP-BY-STEP PROGRESSIVE CURRICULUM TOPICS
  // ===========================================================================
  const PHASES = (typeof window !== 'undefined' && window.MASTERY_COURSE_DATA && window.MASTERY_COURSE_DATA.length > 0)
    ? window.MASTERY_COURSE_DATA
    : [
    // -------------------------------------------------------------------------
    // TOPIC 01: SELECT & FROM
    // -------------------------------------------------------------------------
    {
      id: 'topic_01_select_from',
      seq: '01',
      title: 'SELECT & FROM',
      name: 'The Starting Line: Inspecting Tables, Picking Columns, and Math',
      shortName: '01. SELECT & FROM',
      icon: '📖',
      execRank: 'Level 1: Foundation',
      summary: 'Learn what a table is, how to view all or specific columns, rename with AS, and do simple math.',

      lesson: {
        intro: `In SQL, everything starts with two simple questions: **"What table do I want to look at, and which columns do I want to see?"**
A database table is just like an Excel spreadsheet: vertical columns (fields) and horizontal rows (records). The **FROM** clause tells SQL which table to open, and the **SELECT** clause tells SQL which columns to display on your screen.`,
        analogy: `Think of ordering at a restaurant. <code>FROM Menu</code> tells the waiter which restaurant menu you are looking at. <code>SELECT dish_name, price</code> tells them you only want to see the dish name and price, skipping the calorie count, chef notes, and allergens.`,
        steps: [
          {
            title: '1. Seeing All Columns with SELECT *',
            body: `
The asterisk (<code>*</code>) is SQL shorthand for *"give me every single column in the table"*:
\`\`\`sql
SELECT * 
FROM Employees;
\`\`\`
This opens the <code>Employees</code> table and shows all rows and all columns.
`
          },
          {
            title: '2. Choosing Specific Columns (Clean & Fast)',
            body: `
In real projects, tables can have 50+ columns! You usually only want a few:
\`\`\`sql
SELECT first_name, department, salary
FROM Employees;
\`\`\`
Separate column names with a comma. You can list them in whatever order you want to see them.
`
          },
          {
            title: '3. Renaming Output Columns with AS (Aliases)',
            body: `
You can give any column a cleaner, user-friendly label using <code>AS</code>:
\`\`\`sql
SELECT 
  first_name AS employee_name,
  salary AS annual_compensation
FROM Employees;
\`\`\`
The original table name doesn't change—only the header on your result screen!
`
          },
          {
            title: '4. Doing Simple Math Expressions in SELECT',
            body: `
You can use standard math operators: <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>:
\`\`\`sql
SELECT 
  first_name, 
  salary,
  salary / 12 AS monthly_pay,
  salary * 1.10 AS salary_with_10pct_bonus
FROM Employees;
\`\`\`
`
          }
        ],
        proTips: [
          {
            title: 'Rookie Tip: Don\'t Put a Comma After the Last Column',
            text: 'Writing <code>SELECT first_name, department, FROM Employees</code> is the #1 syntax error for beginners! Never leave a trailing comma before the FROM clause.'
          },
          {
            title: 'SQL is Case-Insensitive (Mostly)',
            text: '<code>select * from employees;</code> works the same as <code>SELECT * FROM Employees;</code>. However, typing SQL keywords in UPPERCASE makes your queries much easier to read and maintain.'
          }
        ]
      },

      diff: {
        badTitle: 'Anti-Pattern: Blindly Using SELECT * Everywhere',
        badSql: `-- INEFFICIENT: Pulls 60 columns over the network
SELECT *
FROM CustomerOrders;`,
        badExplanation: 'Fetching columns you do not need wastes memory, network bandwidth, and database disk I/O.',
        goodTitle: 'Best Practice: Explicit Column Selection',
        goodSql: `-- CLEAN & FAST: Only requests what the app displays
SELECT order_id, order_total, order_date
FROM CustomerOrders;`,
        goodExplanation: 'Specifying exact columns is faster, safer for application APIs, and keeps queries readable.'
      },

      mcqs: [
        {
          id: 'mcq_t1_1',
          question: 'What does the asterisk (*) mean in `SELECT * FROM Employees;`?',
          options: [
            'Multiply all numbers in the table',
            'Select all columns from the table',
            'Select only rows with a star rating',
            'Sort the table alphabetically'
          ],
          correct: 1,
          explanation: 'The asterisk (*) is wildcard shorthand meaning "return all columns".'
        },
        {
          id: 'mcq_t1_2',
          question: 'How do you rename a column called `dept` to `department_name` in your query output?',
          options: [
            'RENAME dept TO department_name',
            'SELECT dept AS department_name',
            'SELECT dept = department_name',
            'UPDATE dept SET department_name'
          ],
          correct: 1,
          explanation: 'The AS keyword creates a temporary column alias in the query output.'
        },
        {
          id: 'mcq_t1_3',
          question: 'Which of the following queries has a syntax error?',
          options: [
            'SELECT first_name, salary FROM Employees;',
            'SELECT first_name, salary, FROM Employees;',
            'SELECT * FROM Employees;',
            'SELECT salary * 2 AS double_pay FROM Employees;'
          ],
          correct: 1,
          explanation: 'Having a trailing comma after salary before FROM is a syntax error.'
        }
      ],

      caseStudy: {
        company: 'YouTube',
        role: 'Junior Data Analyst',
        title: 'Video Catalog Projection and Estimated Watch Time',
        scenario: 'YouTube creators want a simple dashboard showing their video titles, total view counts, and an estimated total watch time in hours (assuming an average watch duration of 4 minutes per view). Write a query pulling from the VideoStats table.',
        schema: 'VideoStats: (video_id INT, title VARCHAR, view_count INT, likes INT, upload_date DATE)',
        recommendedQuery: `SELECT 
  title AS video_title,
  view_count,
  ROUND((view_count * 4.0) / 60.0, 1) AS estimated_watch_hours
FROM VideoStats;`
      },

      problem: {
        title: 'Calculate Monthly Employee Compensation',
        difficulty: 'easy',
        spec: 'Write a query selecting first_name, department, and salary from the Employees table. Add a calculated column dividing salary by 12 with the alias monthly_salary (rounded to 2 decimal places using ROUND(salary / 12.0, 2)).',
        starterSql: `SELECT 
  first_name,
  department,
  salary,
  ROUND(salary / 12.0, 2) AS monthly_salary
FROM Employees;`,
        targetTable: 'Employees'
      }
    },

    // -------------------------------------------------------------------------
    // TOPIC 02: FILTERING WITH WHERE
    // -------------------------------------------------------------------------
    {
      id: 'topic_02_where',
      seq: '02',
      title: 'Filtering Rows with WHERE',
      name: 'Finding Specific Rows: Comparisons, AND/OR, LIKE, and NULLs',
      shortName: '02. WHERE',
      icon: '🔍',
      execRank: 'Level 2: Row Filtering',
      summary: 'Act as a bouncer at the door: only rows that match your filter rules are allowed into the results.',

      lesson: {
        intro: `Now that you can view tables, you rarely want to see all 100,000 rows at once. The **WHERE** clause lets you filter rows: every single row is checked against your rule. If the rule evaluates to **TRUE**, the row appears; if it evaluates to **FALSE**, it is dropped.`,
        analogy: `Think of searching on Amazon or Airbnb. You set filters: price under $100 AND "Free Shipping". The catalog checks every product, and only items meeting all your rules appear on your screen.`,
        steps: [
          {
            title: '1. Everyday Comparison Operators',
            body: `
- <code>=</code>: Exact match (e.g. <code>WHERE department = 'Engineering'</code>).
- <code>!=</code> or <code><></code>: Not equal to.
- <code>></code>, <code><</code>, <code>>=</code>, <code><=</code>: Numbers or dates (e.g. <code>WHERE salary >= 100000</code>).
`
          },
          {
            title: '2. Combining Multiple Conditions (AND / OR)',
            body: `
- **AND**: Both conditions must be true:
  <code>WHERE department = 'Engineering' AND salary > 120000</code>
- **OR**: At least one condition must be true:
  <code>WHERE department = 'Engineering' OR department = 'Analytics'</code>
- **Parentheses Matter**: Always wrap OR groups in parentheses:
  <code>WHERE (department = 'Engineering' OR department = 'Analytics') AND salary > 100000</code>
`
          },
          {
            title: '3. Lists & Ranges: IN and BETWEEN',
            body: `
Instead of typing multiple ORs, use <code>IN</code>:
\`\`\`sql
WHERE department IN ('Engineering', 'Analytics', 'Finance')
\`\`\`
For continuous number or date ranges, use <code>BETWEEN</code>:
\`\`\`sql
WHERE salary BETWEEN 90000 AND 120000 -- Includes 90k and 120k!
\`\`\`
`
          },
          {
            title: '4. Pattern Matching with LIKE',
            body: `
Use <code>%</code> as a wildcard (matches zero or more characters):
- <code>WHERE first_name LIKE 'A%'</code>: Starts with 'A' (Ashley, Alice, Alex).
- <code>WHERE email LIKE '%@gmail.com'</code>: Ends with @gmail.com.
- <code>WHERE title LIKE '%Engineer%'</code>: Contains the word Engineer anywhere.
`
          },
          {
            title: '5. The NULL Trap (Missing Data)',
            body: `
In SQL, <code>NULL</code> means missing or unknown information.
Writing <code>WHERE bonus = NULL</code> **never works** (it always returns 0 rows)!
You **must** write:
\`\`\`sql
WHERE bonus IS NULL       -- Finds rows with no bonus
WHERE bonus IS NOT NULL   -- Finds rows that have a bonus
\`\`\`
`
          }
        ],
        proTips: [
          {
            title: 'Strings Need Single Quotes',
            text: 'Text values must be wrapped in single quotes: <code>WHERE department = \'Sales\'</code>. Numbers do not use quotes: <code>WHERE salary > 80000</code>.'
          }
        ]
      },

      diff: {
        badTitle: 'Anti-Pattern: Comparing NULL with = Operator',
        badSql: `-- BROKEN: Returns 0 rows every single time!
SELECT *
FROM Employees
WHERE bonus = NULL;`,
        badExplanation: 'In SQL, nothing equals NULL—not even NULL equals NULL! The check evaluates to UNKNOWN, so every row gets dropped.',
        goodTitle: 'Best Practice: Use IS NULL / IS NOT NULL',
        goodSql: `-- CORRECT: Successfully finds employees without a bonus
SELECT first_name, department
FROM Employees
WHERE bonus IS NULL;`,
        goodExplanation: 'IS NULL is the dedicated SQL operator to check for empty/missing values.'
      },

      mcqs: [
        {
          id: 'mcq_t2_1',
          question: 'How do you find all employees who earn between $80,000 and $100,000 inclusive?',
          options: [
            'WHERE salary 80000 TO 100000',
            'WHERE salary BETWEEN 80000 AND 100000',
            'WHERE salary IN (80000, 100000)',
            'WHERE salary >= 80000 OR salary <= 100000'
          ],
          correct: 1,
          explanation: 'BETWEEN x AND y checks for an inclusive range.'
        },
        {
          id: 'mcq_t2_2',
          question: 'Which query finds customers whose name starts with the letter "J"?',
          options: [
            'WHERE name = "J*"',
            'WHERE name LIKE "J%"',
            'WHERE name = "J%"',
            'WHERE name CONTAINS "J"'
          ],
          correct: 1,
          explanation: 'LIKE "J%" uses the % wildcard to match any characters following J.'
        },
        {
          id: 'mcq_t2_3',
          question: 'Why does `WHERE bonus = NULL` fail to return records with no bonus?',
          options: [
            'bonus is a reserved word',
            'In SQL, comparisons with NULL must use IS NULL, not =',
            'NULL cannot be stored in database tables',
            'WHERE only works on text columns'
          ],
          correct: 1,
          explanation: 'NULL represents unknown data. Equality checks with NULL evaluate to UNKNOWN, which WHERE drops.'
        }
      ],

      caseStudy: {
        company: 'Uber',
        role: 'Operations Analyst',
        title: 'Filtering Completed High-Value Surge Rides',
        scenario: 'Uber operations needs to audit airport trips that had a surge multiplier strictly greater than 1.5, were completed successfully, and had non-null driver tip amounts.',
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
        spec: 'Select first_name, department, salary, and months_tenure from the Employees table where department is either "Engineering" or "Analytics", salary is strictly greater than $95,000, and months_tenure is at least 12.',
        starterSql: `SELECT 
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
    // TOPIC 03: ORDER BY & LIMIT
    // -------------------------------------------------------------------------
    {
      id: 'topic_03_order_limit',
      seq: '03',
      title: 'Sorting & Limiting (ORDER BY & LIMIT)',
      name: 'Arranging Rows (ASC/DESC), Tie-Breakers, and Top-N Slicing',
      shortName: '03. ORDER BY & LIMIT',
      icon: '📶',
      execRank: 'Level 3: Sorting & Paging',
      summary: 'Sort your results ascending or descending, break ties, and slice top rows with LIMIT & OFFSET.',

      lesson: {
        intro: `By default, relational databases do not guarantee the order of your query results! If you want your output arranged alphabetically, by highest revenue, or most recent date, you must explicitly use **ORDER BY**.
And if you only want to see the Top 5 or Top 10 items, you add **LIMIT**.`,
        analogy: `Think of a leaderboard in a video game. First, you sort all players from highest score to lowest (<code>ORDER BY score DESC</code>). Then, you display only the Top 10 on the screen (<code>LIMIT 10</code>).`,
        steps: [
          {
            title: '1. Sorting Direction: ASC vs DESC',
            body: `
- **ASC** (Ascending): Smallest to largest, or A to Z (default if omitted):
  <code>ORDER BY salary ASC</code>
- **DESC** (Descending): Largest to smallest, or Z to A:
  <code>ORDER BY salary DESC</code>
`
          },
          {
            title: '2. Multi-Column Sorting (Tie-Breakers)',
            body: `
What happens if two people have the exact same salary? You add a second column as a tie-breaker:
\`\`\`sql
ORDER BY department ASC, salary DESC;
\`\`\`
This first alphabetizes by department. Within each department, the highest earner appears first.
`
          },
          {
            title: '3. Taking the Top N with LIMIT',
            body: `
To find the Top 3 highest paid employees:
\`\`\`sql
SELECT first_name, salary
FROM Employees
ORDER BY salary DESC
LIMIT 3;
\`\`\`
`
          },
          {
            title: '4. Page-Based Pagination with OFFSET',
            body: `
To build pages in an app (e.g. Page 2 showing items 11 to 20):
\`\`\`sql
LIMIT 10 OFFSET 10; -- Skips first 10, gives next 10
\`\`\`
`
          }
        ],
        proTips: [
          {
            title: 'Always Pair LIMIT with ORDER BY',
            text: 'Writing <code>LIMIT 5</code> without an ORDER BY returns 5 unpredictable rows. If you want the "top" or "latest", always sort first.'
          }
        ]
      },

      diff: {
        badTitle: 'Anti-Pattern: LIMIT Without ORDER BY',
        badSql: `-- UNPREDICTABLE: Returns random rows
SELECT *
FROM Products
LIMIT 5;`,
        badExplanation: 'Without ORDER BY, the database can return any 5 rows in any order.',
        goodTitle: 'Best Practice: Deterministic Top-N Slicing',
        goodSql: `-- PREDICTABLE & ACCURATE: Always gives top 5 by sales
SELECT product_name, sales_count
FROM Products
ORDER BY sales_count DESC, product_id ASC
LIMIT 5;`,
        goodExplanation: 'Adding product_id as a tie-breaker guarantees the exact same 5 rows every time.'
      },

      mcqs: [
        {
          id: 'mcq_t3_1',
          question: 'Which keyword sorts numbers from highest to lowest?',
          options: ['ASC', 'DESC', 'TOP', 'HIGH'],
          correct: 1,
          explanation: 'DESC stands for descending order (highest to lowest).'
        },
        {
          id: 'mcq_t3_2',
          question: 'How do you find the 2nd highest salary in a table?',
          options: [
            'ORDER BY salary DESC LIMIT 1 OFFSET 1',
            'ORDER BY salary DESC LIMIT 2',
            'SELECT salary WHERE rank = 2',
            'ORDER BY salary ASC LIMIT 1'
          ],
          correct: 0,
          explanation: 'ORDER BY salary DESC puts the highest first. OFFSET 1 skips the 1st, and LIMIT 1 takes the 2nd.'
        }
      ],

      caseStudy: {
        company: 'Spotify',
        role: 'Playlist Curator',
        title: 'Weekly Top 5 Most-Streamed Tracks',
        scenario: 'Spotify generates a weekly Top 5 chart for pop music. Write a query selecting track_name, artist_name, and stream_count for the pop genre, sorted from most streamed to least streamed, limited to 5 songs.',
        schema: 'Tracks: (track_id INT, track_name VARCHAR, artist_name VARCHAR, genre VARCHAR, stream_count INT)',
        recommendedQuery: `SELECT 
  track_name,
  artist_name,
  stream_count
FROM Tracks
WHERE genre = 'Pop'
ORDER BY stream_count DESC
LIMIT 5;`
      },

      problem: {
        title: 'Top 3 Seniority Leaders in Engineering',
        difficulty: 'easy',
        spec: 'Select first_name, department, salary, and months_tenure from the Employees table for all employees in the "Engineering" department, ordered by months_tenure descending, returning only the top 3 most senior employees.',
        starterSql: `SELECT 
  first_name,
  department,
  salary,
  months_tenure
FROM Employees
WHERE department = 'Engineering'
ORDER BY months_tenure DESC
LIMIT 3;`,
        targetTable: 'Employees'
      }
    },

    // -------------------------------------------------------------------------
    // TOPIC 04: AGGREGATE FUNCTIONS
    // -------------------------------------------------------------------------
    {
      id: 'topic_04_aggregates',
      seq: '04',
      title: 'Summarizing Data (Aggregates)',
      name: 'Whole-Table Statistics: Counting, Totaling, and Averaging',
      shortName: '04. Aggregates',
      icon: '📊',
      execRank: 'Level 4: Summary Math',
      summary: 'Answer whole-table questions like total revenue, average salary, and row counts.',

      lesson: {
        intro: `Up to this point, queries return lists of individual rows. But managers and stakeholders often need single summary numbers: *"What is our total company payroll?"* or *"What is the average transaction size?"*
**Aggregate functions** perform calculations across multiple rows to output a single summarized number.`,
        analogy: `Think of stepping on a luggage scale at the airport. You don't care how much each individual shirt weighs; you want the total combined weight of the entire suitcase.`,
        steps: [
          {
            title: '1. The 5 Core Aggregate Functions',
            body: `
- <code>COUNT(*)</code>: Counts total rows in the table.
- <code>SUM(salary)</code>: Adds all numbers in the salary column.
- <code>AVG(salary)</code>: Computes the average salary (ignores NULLs).
- <code>MIN(salary)</code>: Finds the lowest salary.
- <code>MAX(salary)</code>: Finds the highest salary.
`
          },
          {
            title: '2. Counting Unique Values: COUNT(DISTINCT)',
            body: `
If 500 orders were placed, but only by 10 different people:
- <code>COUNT(customer_id)</code> = 500 (total orders).
- <code>COUNT(DISTINCT customer_id)</code> = 10 (unique customers).
\`\`\`sql
SELECT COUNT(DISTINCT department) AS total_departments
FROM Employees;
\`\`\`
`
          },
          {
            title: '3. COUNT(*) vs COUNT(column)',
            body: `
- <code>COUNT(*)</code>: Counts every row, even if some columns have NULL.
- <code>COUNT(bonus)</code>: Counts **only** rows where bonus is NOT NULL!
`
          }
        ],
        proTips: [
          {
            title: 'Round Your Averages',
            text: '<code>AVG(salary)</code> often returns messy numbers like 98333.3333333. Wrap it in <code>ROUND(AVG(salary), 2)</code> for clean currency output.'
          }
        ]
      },

      diff: {
        badTitle: 'Anti-Pattern: Assuming COUNT(column) Counts All Rows',
        badSql: `-- BUG: Skips employees whose bonus is NULL!
SELECT COUNT(bonus) AS total_employees
FROM Employees;`,
        badExplanation: 'If 3 employees have NULL bonus, COUNT(bonus) returns 5 instead of 8.',
        goodTitle: 'Best Practice: Use COUNT(*) for Total Rows',
        goodSql: `-- ACCURATE: Always counts all rows
SELECT COUNT(*) AS total_employees, COUNT(bonus) AS employees_with_bonus
FROM Employees;`,
        goodExplanation: 'COUNT(*) accurately counts rows regardless of nulls in individual columns.'
      },

      mcqs: [
        {
          id: 'mcq_t4_1',
          question: 'If a table has 10 rows and 3 of them have NULL in the `bonus` column, what does `COUNT(bonus)` return?',
          options: ['10', '7', '3', 'NULL'],
          correct: 1,
          explanation: 'COUNT(column) ignores NULL values and counts only the 7 non-null entries.'
        },
        {
          id: 'mcq_t4_2',
          question: 'How do you count how many DIFFERENT cities your customers live in?',
          options: [
            'COUNT(city)',
            'COUNT(DISTINCT city)',
            'DISTINCT(COUNT(city))',
            'SUM(city)'
          ],
          correct: 1,
          explanation: 'COUNT(DISTINCT city) collapses duplicate city names and counts unique occurrences.'
        }
      ],

      caseStudy: {
        company: 'Amazon',
        role: 'Finance Analyst',
        title: 'Cyber Monday High-Level Sales Summary',
        scenario: 'Amazon executives need a single summary row of Cyber Monday sales metrics: total revenue, average order value, smallest order, largest order, and total unique customers who bought something.',
        schema: 'Orders: (order_id INT, customer_id INT, order_total FLOAT, order_date DATE)',
        recommendedQuery: `SELECT 
  COUNT(*) AS total_orders,
  COUNT(DISTINCT customer_id) AS total_unique_buyers,
  ROUND(SUM(order_total), 2) AS total_revenue,
  ROUND(AVG(order_total), 2) AS avg_order_value,
  MIN(order_total) AS smallest_order,
  MAX(order_total) AS largest_order
FROM Orders
WHERE order_date = '2024-11-25';`
      },

      problem: {
        title: 'Company-Wide Payroll & Headcount Metrics',
        difficulty: 'easy',
        spec: 'Write a query returning the total number of employees (as total_staff), the total salary expense (as total_payroll), the average salary rounded to 2 decimals (as avg_salary), and the difference between the highest and lowest salary (as salary_spread).',
        starterSql: `SELECT 
  COUNT(*) AS total_staff,
  SUM(salary) AS total_payroll,
  ROUND(AVG(salary), 2) AS avg_salary,
  MAX(salary) - MIN(salary) AS salary_spread
FROM Employees;`,
        targetTable: 'Employees'
      }
    },

    // -------------------------------------------------------------------------
    // TOPIC 05: GROUP BY & HAVING
    // -------------------------------------------------------------------------
    {
      id: 'topic_05_groupby_having',
      seq: '05',
      title: 'Grouping Data (GROUP BY & HAVING)',
      name: 'Category Summaries and Filtering Aggregated Groups',
      shortName: '05. GROUP BY & HAVING',
      icon: '📦',
      execRank: 'Level 5: Categorization',
      summary: 'Split data into category buckets (e.g. sales per department) and filter the buckets with HAVING.',

      lesson: {
        intro: `Now that you know how to calculate totals across an entire table, what if you need the total **for each department**?
That is what **GROUP BY** does: it sorts rows into category buckets and calculates aggregates for each bucket.
And what if you only want to see departments that have more than 2 employees? That's what **HAVING** is for!`,
        analogy: `Think of sorting laundry into colored baskets: whites in one, darks in another. Once sorted into baskets, you don't look at single shirts—you weigh each basket or count how many total shirts are in it. Then HAVING checks each basket, and drops any basket with fewer than 3 shirts.`,
        steps: [
          {
            title: '1. Basic GROUP BY Syntax',
            body: `
\`\`\`sql
SELECT department, COUNT(*) AS headcount, AVG(salary) AS avg_pay
FROM Employees
GROUP BY department;
\`\`\`
SQL creates a separate summary row for each unique department.
`
          },
          {
            title: '2. The Golden Rule of GROUP BY',
            body: `
**Every column in your SELECT clause that is NOT inside an aggregate function (COUNT, SUM, etc.) MUST be listed in GROUP BY!**
If you write <code>SELECT department, first_name, COUNT(*) FROM Employees GROUP BY department;</code>, which employee's first_name should SQL display for the whole department? It makes no sense, so SQL rejects it.
`
          },
          {
            title: '3. What is HAVING? (WHERE vs HAVING)',
            body: `
- **WHERE**: Filters raw individual rows **before** they are grouped. Cannot use aggregates!
- **HAVING**: Filters group summaries **after** they are calculated. Can use aggregates!
\`\`\`sql
SELECT department, COUNT(*) AS staff_count
FROM Employees
GROUP BY department
HAVING COUNT(*) >= 3; -- Keeps only departments with 3+ staff
\`\`\`
`
          }
        ],
        proTips: [
          {
            title: 'Combining Both WHERE and HAVING',
            text: 'You can use both! <code>WHERE tenure > 12</code> filters out junior staff first, then <code>GROUP BY department</code> groups senior staff, then <code>HAVING AVG(salary) > 100k</code> keeps only high-earning departments.'
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
        goodSql: `-- VALID & CLEAN: Uses HAVING for group thresholds
SELECT department, COUNT(*) AS team_size
FROM Employees
GROUP BY department
HAVING COUNT(*) > 2;`,
        goodExplanation: 'HAVING runs after GROUP BY has calculated the counts, filtering the groups accurately.'
      },

      mcqs: [
        {
          id: 'mcq_t5_1',
          question: 'What is the Golden Rule of SQL GROUP BY queries?',
          options: [
            'All columns must be numbers',
            'Every column in SELECT not wrapped in an aggregate function must be listed in GROUP BY',
            'GROUP BY must always be followed by LIMIT',
            'You cannot use WHERE with GROUP BY'
          ],
          correct: 1,
          explanation: 'Non-aggregated columns must be part of the group key so the database knows how to collapse rows.'
        },
        {
          id: 'mcq_t5_2',
          question: 'When should you use HAVING instead of WHERE?',
          options: [
            'Whenever you want to sort rows',
            'To filter on aggregated values like COUNT(*), SUM(), or AVG() after grouping',
            'When filtering by text strings',
            'HAVING is just an older synonym for WHERE'
          ],
          correct: 1,
          explanation: 'WHERE filters raw rows before grouping; HAVING filters aggregated group summaries.'
        }
      ],

      caseStudy: {
        company: 'DoorDash',
        role: 'Merchant Strategy Analyst',
        title: 'Top Performing Restaurant Categories by Order Volume',
        scenario: 'DoorDash wants to identify restaurant cuisine categories that have generated at least 500 total orders and maintain an average delivery rating strictly above 4.5.',
        schema: 'RestaurantOrders: (order_id INT, category VARCHAR, rating FLOAT, order_amount FLOAT)',
        recommendedQuery: `SELECT 
  category,
  COUNT(*) AS total_orders,
  ROUND(AVG(rating), 2) AS avg_customer_rating,
  ROUND(SUM(order_amount), 2) AS total_gross_sales
FROM RestaurantOrders
GROUP BY category
HAVING COUNT(*) >= 500
   AND AVG(rating) > 4.5
ORDER BY total_orders DESC;`
      },

      problem: {
        title: 'Department Headcount and Budget Threshold',
        difficulty: 'medium',
        spec: 'Write a query grouping the Employees table by department. Return department, the total number of employees (as headcount), and average salary rounded to 2 decimals (as avg_salary). Only show departments that have at least 2 employees AND an average salary greater than $95,000.',
        starterSql: `SELECT 
  department,
  COUNT(*) AS headcount,
  ROUND(AVG(salary), 2) AS avg_salary
FROM Employees
GROUP BY department
HAVING COUNT(*) >= 2
   AND AVG(salary) > 95000;`,
        targetTable: 'Employees'
      }
    },

    // -------------------------------------------------------------------------
    // TOPIC 06: COMBINING TABLES (INNER & LEFT JOIN)
    // -------------------------------------------------------------------------
    {
      id: 'topic_06_joins',
      seq: '06',
      title: 'Combining Tables (INNER & LEFT JOIN)',
      name: 'Connecting Related Tables with Primary and Foreign Keys',
      shortName: '06. JOINs',
      icon: '🔗',
      execRank: 'Level 6: Multi-Table Joins',
      summary: 'Connect rows across different tables using shared ID keys like matching puzzle pieces.',

      lesson: {
        intro: `Real databases split data across multiple tables to stay clean and organized. For example, customers are stored in <code>Customers</code>, and purchases are stored in <code>Orders</code>.
A **JOIN** lets you connect rows from both tables using a shared key (like <code>customer_id</code>).`,
        analogy: `Think of matching puzzle pieces. Order #101 has Customer ID #5. You look up Customer #5 in your customer directory, find "Alice Smith", and attach her name and city to the order receipt!`,
        steps: [
          {
            title: '1. Primary Keys vs Foreign Keys',
            body: `
- **Primary Key (PK)**: The unique ID identifying a row (e.g. <code>customer_id</code> in Customers).
- **Foreign Key (FK)**: A column in another table pointing back to the Primary Key (e.g. <code>customer_id</code> in Orders).
`
          },
          {
            title: '2. INNER JOIN (Matches in Both Tables Only)',
            body: `
Only keeps rows where the matching key exists in **both** tables:
\`\`\`sql
SELECT o.order_id, o.amount, c.name, c.city
FROM Orders o
INNER JOIN Customers c ON o.customer_id = c.customer_id;
\`\`\`
If an order has an invalid customer ID, or a customer placed 0 orders, they are excluded.
`
          },
          {
            title: '3. LEFT JOIN (Keep All Rows From Left Table)',
            body: `
What if you want a list of ALL customers, including those who haven't ordered yet?
\`\`\`sql
SELECT c.name, c.city, o.order_id, o.amount
FROM Customers c
LEFT JOIN Orders o ON c.customer_id = o.customer_id;
\`\`\`
Customers with 0 orders still appear—their order columns are simply filled with <code>NULL</code>!
`
          },
          {
            title: '4. Left Anti-Join: Finding What Didn\'t Match',
            body: `
To find customers who have NEVER placed an order:
\`\`\`sql
SELECT c.name, c.city
FROM Customers c
LEFT JOIN Orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL; -- Kept only unmatched customers!
\`\`\`
`
          }
        ],
        proTips: [
          {
            title: 'Always Use Table Aliases',
            text: 'Typing <code>FROM Customers c LEFT JOIN Orders o ON c.id = o.customer_id</code> saves typing and prevents ambiguous column errors.'
          }
        ]
      },

      diff: {
        badTitle: 'Anti-Pattern: WHERE Clause Killing a LEFT JOIN',
        badSql: `-- BUG: Accidentally turns LEFT JOIN into an INNER JOIN!
SELECT c.name, o.amount
FROM Customers c
LEFT JOIN Orders o ON c.customer_id = o.customer_id
WHERE o.amount > 100;`,
        badExplanation: 'Because o.amount > 100 drops NULLs, all customers with 0 orders are eliminated.',
        goodTitle: 'Best Practice: Move Filter to ON Clause for Left Joins',
        goodSql: `-- PRESERVES ALL CUSTOMERS:
SELECT c.name, o.amount
FROM Customers c
LEFT JOIN Orders o ON c.customer_id = o.customer_id AND o.amount > 100;`,
        goodExplanation: 'Putting the condition in the ON clause keeps all customers, showing NULL for those without orders > 100.'
      },

      mcqs: [
        {
          id: 'mcq_t6_1',
          question: 'You want a list of all products, including products that have never been sold. Which JOIN should you use?',
          options: [
            'INNER JOIN Sales ON Products.id = Sales.product_id',
            'LEFT JOIN Sales ON Products.id = Sales.product_id (Products as left table)',
            'CROSS JOIN Sales',
            'RIGHT JOIN Products'
          ],
          correct: 1,
          explanation: 'LEFT JOIN keeps all rows from the primary table even if no matching sales exist.'
        },
        {
          id: 'mcq_t6_2',
          question: 'What value appears in the joined columns when a LEFT JOIN finds no match?',
          options: ['0', '"" (Empty string)', 'NULL', 'Throws an error'],
          correct: 2,
          explanation: 'Missing matching data in outer joins is represented by NULL.'
        }
      ],

      caseStudy: {
        company: 'Spotify',
        role: 'Data Analyst',
        title: 'Win-Back Campaign for Inactive Premium Users',
        scenario: 'Find users who currently pay for a Premium subscription but have streamed zero songs in the last 30 days. Use a LEFT JOIN between Users and StreamLogs to find users with null stream activity.',
        schema: 'Users: (user_id INT, email VARCHAR, plan VARCHAR)\nStreamLogs: (stream_id INT, user_id INT, played_at DATE)',
        recommendedQuery: `SELECT 
  u.user_id,
  u.email
FROM Users u
LEFT JOIN StreamLogs s ON u.user_id = s.user_id
WHERE u.plan = 'Premium'
  AND s.stream_id IS NULL;`
      },

      problem: {
        title: 'Match Customers with Orders (Including Inactive Customers)',
        difficulty: 'easy',
        spec: 'Write a query returning customer_id, first_name, and city from Customers, joined with Orders to show order_id and order_total. If a customer has never ordered, their customer info should still appear with NULL order details.',
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
    // TOPIC 07: ADVANCED JOINS & SETS (RIGHT, FULL, UNION)
    // -------------------------------------------------------------------------
    {
      id: 'topic_07_adv_joins_union',
      seq: '07',
      title: 'Advanced Joins & Sets (RIGHT, FULL & UNION)',
      name: 'Outer Joins, Self-Joins, and Stacking Queries with UNION',
      shortName: '07. Advanced Joins & UNION',
      icon: '🔄',
      execRank: 'Level 7: Set Operations',
      summary: 'Master FULL OUTER JOIN, Self-Joins (managers & employees), and vertical query stacking with UNION ALL.',

      lesson: {
        intro: `Now that you know basic INNER and LEFT joins, let's complete your joining toolkit.
What if you need to keep unmatched rows from *both* tables? That's a **FULL OUTER JOIN**.
What if employees and their managers are stored in the *same* table? That's a **Self-Join**.
And what if you want to stack results from two queries on top of each other? That's **UNION**.`,
        analogy: `A JOIN connects tables horizontally side-by-side (adds more columns). A UNION stacks tables vertically on top of each other (adds more rows).`,
        steps: [
          {
            title: '1. FULL OUTER JOIN (Keep Everything)',
            body: `
Keeps all rows from both tables, filling NULLs on whichever side had no match:
\`\`\`sql
SELECT c.name, o.order_id
FROM Customers c
FULL OUTER JOIN Orders o ON c.customer_id = o.customer_id;
\`\`\`
`
          },
          {
            title: '2. Self-Joins (Joining a Table to Itself)',
            body: `
Imagine an <code>Employees</code> table where each employee has a <code>manager_id</code> pointing to another employee's <code>id</code>:
\`\`\`sql
SELECT 
  e.first_name AS employee,
  m.first_name AS manager
FROM Employees e
LEFT JOIN Employees m ON e.manager_id = m.id;
\`\`\`
`
          },
          {
            title: '3. UNION vs UNION ALL',
            body: `
Both stack results from two queries vertically:
- **UNION**: Removes duplicate rows (takes extra time to sort/deduplicate).
- **UNION ALL**: Keeps all rows including duplicates (much faster!).
\`\`\`sql
SELECT city FROM Customers
UNION ALL
SELECT city FROM Suppliers;
\`\`\`
`
          }
        ],
        proTips: [
          {
            title: 'Rules for UNION',
            text: 'Both queries must return the same number of columns, with compatible data types in the same order.'
          }
        ]
      },

      diff: {
        badTitle: 'Anti-Pattern: Using UNION When Duplicates Cannot Exist',
        badSql: `-- SLOW: Forces unnecessary deduplication sort
SELECT customer_id, 'Active' AS status FROM ActiveUsers
UNION
SELECT customer_id, 'Archived' AS status FROM ArchivedUsers;`,
        badExplanation: 'Active and Archived users are already distinct sets. Using UNION forces an expensive deduplication sort.',
        goodTitle: 'Best Practice: Use UNION ALL for Fast Concatenation',
        goodSql: `-- FAST: Directly appends rows without memory sorting
SELECT customer_id, 'Active' AS status FROM ActiveUsers
UNION ALL
SELECT customer_id, 'Archived' AS status FROM ArchivedUsers;`,
        goodExplanation: 'UNION ALL directly streams both result sets without wasted CPU cycles.'
      },

      mcqs: [
        {
          id: 'mcq_t7_1',
          question: 'What is the key difference between UNION and UNION ALL?',
          options: [
            'UNION combines columns; UNION ALL combines rows',
            'UNION removes duplicate rows; UNION ALL keeps all rows and is faster',
            'UNION only works in MySQL',
            'UNION ALL requires tables to have different column names'
          ],
          correct: 1,
          explanation: 'UNION deduplicates rows, whereas UNION ALL directly stacks all rows without deduplication.'
        }
      ],

      caseStudy: {
        company: 'LinkedIn',
        role: 'Data Engineer',
        title: 'Building Unified Activity Feed Across Posts and Comments',
        scenario: 'LinkedIn wants to create a unified chronological activity feed showing both user posts and user comments in a single stream. Combine both event tables with UNION ALL.',
        schema: 'Posts: (post_id INT, user_id INT, content VARCHAR, created_at TIMESTAMP)\nComments: (comment_id INT, user_id INT, text VARCHAR, created_at TIMESTAMP)',
        recommendedQuery: `SELECT 
  user_id,
  'POST' AS activity_type,
  content AS message,
  created_at
FROM Posts
WHERE user_id = 1042
UNION ALL
SELECT 
  user_id,
  'COMMENT' AS activity_type,
  text AS message,
  created_at
FROM Comments
WHERE user_id = 1042
ORDER BY created_at DESC;`
      },

      problem: {
        title: 'Combine Domestic and International Customer Contacts',
        difficulty: 'medium',
        spec: 'Write a query using UNION ALL that selects customer_id, first_name, and city from Customers where country = "USA", and combines it with customer_id, first_name, and city where country = "CAN" or country = "GBR". Order final results by city ascending.',
        starterSql: `SELECT customer_id, first_name, city, 'Domestic' AS market_tier
FROM Customers
WHERE country = 'USA'
UNION ALL
SELECT customer_id, first_name, city, 'International' AS market_tier
FROM Customers
WHERE country IN ('CAN', 'GBR')
ORDER BY city ASC;`,
        targetTable: 'Customers'
      }
    },

    // -------------------------------------------------------------------------
    // TOPIC 08: CASE WHEN & TRANSFORMATIONS
    // -------------------------------------------------------------------------
    {
      id: 'topic_08_case_when',
      seq: '08',
      title: 'Conditional Logic & Functions (CASE WHEN)',
      name: 'IF/THEN/ELSE Logic, Cleaning Data, and NULL Handling (COALESCE)',
      shortName: '08. CASE WHEN',
      icon: '🔀',
      execRank: 'Level 8: Conditional Logic',
      summary: 'Add If/Else business rules to your queries and handle missing data with COALESCE.',

      lesson: {
        intro: `Real business data is full of special rules: *"If an order is over $200, label it 'High Priority', otherwise label it 'Standard'"*.
In SQL, you write If/Else logic using **CASE WHEN**.
You will also learn **COALESCE**, which lets you replace ugly NULL values with friendly fallbacks.`,
        analogy: `Think of a sorting gate on a factory conveyor belt: If item weight > 50kg, stamp "HEAVY". If weight > 20kg, stamp "MEDIUM". Otherwise, stamp "LIGHT".`,
        steps: [
          {
            title: '1. Basic CASE WHEN Syntax',
            body: `
\`\`\`sql
SELECT 
  first_name,
  salary,
  CASE 
    WHEN salary >= 120000 THEN 'Executive Tier'
    WHEN salary >= 90000  THEN 'Mid Tier'
    ELSE 'Associate Tier'
  END AS salary_bracket
FROM Employees;
\`\`\`
- Always starts with <code>CASE</code>.
- Has one or more <code>WHEN condition THEN result</code> lines.
- Optional <code>ELSE default_result</code>.
- Always closes with <code>END</code>!
`
          },
          {
            title: '2. Handling Missing Data with COALESCE',
            body: `
<code>COALESCE(val1, val2, ...)</code> returns the **first non-null value** in the list:
\`\`\`sql
SELECT 
  first_name,
  COALESCE(bonus, 0) AS safe_bonus,
  COALESCE(phone, email, 'No Contact Info') AS primary_contact
FROM Employees;
\`\`\`
`
          },
          {
            title: '3. Conditional Aggregation (Interview Superpower!)',
            body: `
You can count specific categories in a single query:
\`\`\`sql
SELECT 
  department,
  COUNT(*) AS total_staff,
  COUNT(CASE WHEN salary >= 100000 THEN 1 END) AS count_high_earners
FROM Employees
GROUP BY department;
\`\`\`
`
          }
        ],
        proTips: [
          {
            title: 'Always Remember the END Keyword',
            text: 'Forgetting <code>END</code> at the end of a CASE statement is the most common syntax error beginners make!'
          }
        ]
      },

      diff: {
        badTitle: 'Anti-Pattern: Multiple Queries to Count Categories',
        badSql: `-- INEFFICIENT: Requires running 3 separate queries
SELECT COUNT(*) FROM Orders WHERE status = 'COMPLETED';
SELECT COUNT(*) FROM Orders WHERE status = 'PENDING';
SELECT COUNT(*) FROM Orders WHERE status = 'CANCELLED';`,
        badExplanation: 'Executing multiple queries wastes database roundtrips.',
        goodTitle: 'Best Practice: Pivot with CASE WHEN in a Single Query',
        goodSql: `-- FAST: Calculates all 3 counts in 1 pass over the table
SELECT 
  COUNT(CASE WHEN status = 'COMPLETED' THEN 1 END) AS completed_count,
  COUNT(CASE WHEN status = 'PENDING'   THEN 1 END) AS pending_count,
  COUNT(CASE WHEN status = 'CANCELLED' THEN 1 END) AS cancelled_count
FROM Orders;`,
        goodExplanation: 'Conditional aggregation calculates all counts in a single efficient pass over the table.'
      },

      mcqs: [
        {
          id: 'mcq_t8_1',
          question: 'What keyword MUST always close a CASE expression in SQL?',
          options: ['STOP', 'DONE', 'END', 'EXIT'],
          correct: 2,
          explanation: 'Every CASE expression must be terminated with the END keyword.'
        },
        {
          id: 'mcq_t8_2',
          question: 'What does `COALESCE(bonus, 0)` return if `bonus` is NULL?',
          options: ['NULL', '0', 'Throws an error', 'Empty string'],
          correct: 1,
          explanation: 'COALESCE returns the first non-null argument, so it falls back to 0.'
        }
      ],

      caseStudy: {
        company: 'Airbnb',
        role: 'Pricing Analyst',
        title: 'Listing Price Categorization and Tier Labeling',
        scenario: 'Categorize rental listings into pricing tiers based on nightly rates: "Luxury" ($300+), "Upscale" ($150–$299), "Economy" ($75–$149), and "Budget" (under $75).',
        schema: 'Listings: (listing_id INT, title VARCHAR, price_per_night FLOAT)',
        recommendedQuery: `SELECT 
  listing_id,
  title,
  price_per_night,
  CASE 
    WHEN price_per_night >= 300 THEN 'Luxury'
    WHEN price_per_night >= 150 THEN 'Upscale'
    WHEN price_per_night >= 75  THEN 'Economy'
    ELSE 'Budget'
  END AS price_tier
FROM Listings
ORDER BY price_per_night DESC;`
      },

      problem: {
        title: 'Categorize Employee Tenure Tiers',
        difficulty: 'easy',
        spec: 'Select first_name, department, and months_tenure from Employees. Add a column tenure_bracket using CASE WHEN that returns "Veteran" for 24+ months, "Core" for 12 to 23 months, and "New Hire" for under 12 months.',
        starterSql: `SELECT 
  first_name,
  department,
  months_tenure,
  CASE 
    WHEN months_tenure >= 24 THEN 'Veteran'
    WHEN months_tenure >= 12 THEN 'Core'
    ELSE 'New Hire'
  END AS tenure_bracket
FROM Employees
ORDER BY months_tenure DESC;`,
        targetTable: 'Employees'
      }
    },

    // -------------------------------------------------------------------------
    // TOPIC 09: MULTI-STEP QUERIES (CTES & SUBQUERIES)
    // -------------------------------------------------------------------------
    {
      id: 'topic_09_ctes',
      seq: '09',
      title: 'Multi-Step Queries (CTEs & Subqueries)',
      name: 'Breaking Complex Logic into Readable Steps with the WITH Clause',
      shortName: '09. CTEs (WITH)',
      icon: '🧱',
      execRank: 'Level 9: Modular Pipelines',
      summary: 'Break terrifying 50-line queries into clean, readable, modular steps using Common Table Expressions.',

      lesson: {
        intro: `When building real-world business reports, doing everything in one giant query gets overwhelming. A **CTE** (Common Table Expression), created using the **WITH** keyword, lets you create temporary named tables step-by-step.`,
        analogy: `Think of cooking a recipe. Instead of scrambling to chop onions and grate cheese while your skillet is burning, you prep your ingredients into clean prep bowls first (the CTEs). Then your final dish (the main SELECT) is simple, clean, and stress-free!`,
        steps: [
          {
            title: '1. Basic CTE Syntax',
            body: `
\`\`\`sql
-- Step 1: Create the temporary prep table
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
            title: '2. Chaining Multiple CTEs Together',
            body: `
You can chain several CTEs together separated by commas:
\`\`\`sql
WITH 
  HighEarners AS (
    SELECT * FROM Employees WHERE salary > 100000
  ),
  DeptCounts AS (
    SELECT department, COUNT(*) AS count_100k
    FROM HighEarners
    GROUP BY department
  )
SELECT * FROM DeptCounts;
\`\`\`
`
          },
          {
            title: '3. CTEs vs Subqueries: Why CTEs Win',
            body: `Subqueries read inside-out. CTEs read naturally from top-to-bottom like clean software code.`
          }
        ],
        proTips: [
          {
            title: 'CTEs Don\'t Write to Disk',
            text: 'CTEs exist only in memory during the query execution. They disappear when the query finishes.'
          }
        ]
      },

      diff: {
        badTitle: 'Anti-Pattern: Hard-to-Read Nested Subqueries',
        badSql: `-- HARD TO READ: Nested 3 levels deep inside-out
SELECT * FROM (
  SELECT department, AVG(salary) AS avg_s 
  FROM (SELECT * FROM Employees WHERE months_tenure > 12) sub1 
  GROUP BY department
) sub2 WHERE avg_s > 100000;`,
        badExplanation: 'Nested subqueries read inside-out, making debugging and maintenance difficult.',
        goodTitle: 'Best Practice: Clean Chained CTEs (WITH Clause)',
        goodSql: `-- CLEAN & MODULAR: Reads top to bottom
WITH SeniorStaff AS (
  SELECT * FROM Employees WHERE months_tenure > 12
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
          id: 'mcq_t9_1',
          question: 'What keyword is used to define a Common Table Expression (CTE)?',
          options: ['TEMPORARY', 'WITH', 'CREATE CTE', 'VIEW'],
          correct: 1,
          explanation: 'The WITH keyword starts a Common Table Expression definition.'
        },
        {
          id: 'mcq_t9_2',
          question: 'What is the main benefit of CTEs over nested subqueries?',
          options: [
            'CTEs make complex queries readable top-to-bottom instead of inside-out',
            'CTEs permanently save tables to disk',
            'CTEs can only be used with numbers',
            'CTEs bypass user permission checks'
          ],
          correct: 0,
          explanation: 'CTEs dramatically improve code readability and maintainability by structuring logic in linear steps.'
        }
      ],

      caseStudy: {
        company: 'Stripe',
        role: 'Fraud Risk Analyst',
        title: 'Multi-Step Merchant Volume Anomaly Detector',
        scenario: 'Calculate the total daily transaction volume per merchant, and then find merchants whose daily volume exceeds 5x their 30-day historical average volume.',
        schema: 'Transactions: (tx_id INT, merchant_id INT, amount FLOAT, tx_date DATE)',
        recommendedQuery: `WITH DailyTotals AS (
  SELECT merchant_id, SUM(amount) AS daily_vol
  FROM Transactions
  WHERE tx_date = CURRENT_DATE
  GROUP BY merchant_id
),
HistoricalAvg AS (
  SELECT merchant_id, AVG(amount) * 20 AS expected_daily_benchmark
  FROM Transactions
  WHERE tx_date >= CURRENT_DATE - INTERVAL 30 DAY
  GROUP BY merchant_id
)
SELECT 
  d.merchant_id,
  d.daily_vol,
  h.expected_daily_benchmark
FROM DailyTotals d
JOIN HistoricalAvg h ON d.merchant_id = h.merchant_id
WHERE d.daily_vol > (h.expected_daily_benchmark * 5);`
      },

      problem: {
        title: 'Employees Earning Above Department Average',
        difficulty: 'medium',
        spec: 'Write a query using a CTE that calculates the average salary for each department. Then join that CTE back to Employees to return first_name, department, salary, and the department average for all employees earning strictly more than their department average.',
        starterSql: `WITH DeptAvg AS (
  SELECT department, AVG(salary) AS avg_dept_salary
  FROM Employees
  GROUP BY department
)
SELECT 
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
    // TOPIC 10: WINDOW FUNCTIONS
    // -------------------------------------------------------------------------
    {
      id: 'topic_10_window_functions',
      seq: '10',
      title: 'Advanced Analytics (Window Functions)',
      name: 'Rankings, Running Totals, and Moving Averages without Collapsing Rows',
      shortName: '10. Window Functions',
      icon: '🪟',
      execRank: 'Level 10: Advanced Analytics',
      summary: 'Compute rankings, cumulative running totals, and partition calculations without collapsing rows.',

      lesson: {
        intro: `You have reached advanced SQL mastery!
Normally, <code>GROUP BY</code> collapses your rows into a single summary row. **Window Functions** let you calculate rankings (ROW_NUMBER, RANK, DENSE_RANK), running totals, and moving averages **while keeping every individual row intact**!`,
        analogy: `Think of a marathon race. Every runner keeps their own finish-line photo, but you also stamp their overall place (1st, 2nd, 3rd) and their age-bracket rank right onto their personal race bib!`,
        steps: [
          {
            title: '1. The OVER() Clause & PARTITION BY',
            body: `
Every window function uses <code>OVER()</code>:
- <code>PARTITION BY department</code>: Resets calculations per category (e.g. ranks reset for each department).
- <code>ORDER BY salary DESC</code>: How to sort rows inside that category window.
\`\`\`sql
SELECT first_name, department, salary,
       RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank
FROM Employees;
\`\`\`
`
          },
          {
            title: '2. The Big 3 Ranking Functions (Interview Classic)',
            body: `
If two employees tie for $100,000 salary:
- **ROW_NUMBER()**: Always unique sequential numbers: <code>1, 2, 3</code> (breaks ties arbitrarily).
- **RANK()**: Handles ties, but **skips** numbers: <code>1, 1, 3</code> (skips 2).
- **DENSE_RANK()**: Handles ties, and **never skips** numbers: <code>1, 1, 2</code>.
`
          },
          {
            title: '3. Running Cumulative Totals',
            body: `
\`\`\`sql
SELECT first_name, department, salary,
       SUM(salary) OVER (PARTITION BY department ORDER BY salary DESC) AS running_dept_payroll
FROM Employees;
\`\`\`
`
          }
        ],
        proTips: [
          {
            title: 'Filtering Window Functions',
            text: 'You cannot put a window function directly into WHERE! Wrap the query in a CTE first: <code>WITH Ranked AS (...) SELECT * FROM Ranked WHERE rank <= 3;</code>.'
          }
        ]
      },

      diff: {
        badTitle: 'Anti-Pattern: Trying to Filter Window Function in WHERE',
        badSql: `-- SYNTAX ERROR: Window functions not allowed in WHERE
SELECT first_name, salary
FROM Employees
WHERE ROW_NUMBER() OVER (ORDER BY salary DESC) <= 3;`,
        badExplanation: 'WHERE runs before Window functions are calculated.',
        goodTitle: 'Best Practice: Wrap in a CTE to Filter Top Ranks',
        goodSql: `-- CLEAN & VALID: Filters top 3 earners cleanly
WITH RankedStaff AS (
  SELECT first_name, department, salary,
         DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk
  FROM Employees
)
SELECT * FROM RankedStaff WHERE rnk <= 3;`,
        goodExplanation: 'The CTE calculates the ranks first, allowing the outer WHERE clause to filter cleanly.'
      },

      mcqs: [
        {
          id: 'mcq_t10_1',
          question: 'How do Window Functions differ from GROUP BY?',
          options: [
            'Window functions collapse all rows into one summary',
            'Window functions calculate aggregates while keeping every individual row intact',
            'Window functions only work with text',
            'Window functions are only used in Python'
          ],
          correct: 1,
          explanation: 'Window functions preserve individual rows while adding calculated partition aggregates.'
        },
        {
          id: 'mcq_t10_2',
          question: 'If two employees tie for 1st place, what rank does the next person get with DENSE_RANK()?',
          options: ['1', '2', '3', 'NULL'],
          correct: 1,
          explanation: 'DENSE_RANK() does not skip numbers after ties (1, 1, 2).'
        }
      ],

      caseStudy: {
        company: 'Jane Street',
        role: 'Quantitative Platform Engineer',
        title: 'Running VWAP and Desk-Level Trade Size Rankings',
        scenario: 'Calculate cumulative running volume totals and rank order sizes within each trading desk throughout the trading day without collapsing individual trade ticks.',
        schema: 'Trades: (trade_id INT, symbol VARCHAR, shares INT, price FLOAT, trade_time TIMESTAMP)',
        recommendedQuery: `SELECT 
  trade_time,
  symbol,
  shares,
  price,
  DENSE_RANK() OVER (PARTITION BY symbol ORDER BY shares DESC) AS trade_size_rank,
  SUM(shares) OVER (PARTITION BY symbol ORDER BY trade_time) AS cumulative_shares
FROM Trades;`
      },

      problem: {
        title: 'Rank Employees by Salary Within Department',
        difficulty: 'medium',
        spec: 'For each employee in Employees, return first_name, department, salary, their department-level salary rank using DENSE_RANK() (as dept_rank), and a running cumulative department salary total (as running_dept_payroll).',
        starterSql: `SELECT 
  first_name,
  department,
  salary,
  DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank,
  SUM(salary) OVER (PARTITION BY department ORDER BY salary DESC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_dept_payroll
FROM Employees;`,
        targetTable: 'Employees'
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
                <span class="course-pill-tag">Step-by-Step Learning Track</span>
              </h1>
              <p class="course-subline">
                Beginner to Advanced: 10 structured topics designed for gradual, progressive learning
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

        <!-- 2. The 10-Topic Progressive Navigation Rail -->
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
  // SVG EXPLAINER DIAGRAM GENERATOR (WITH INTERACTIVE STEPPER & SPOTLIGHT)
  // ===========================================================================
  function escapeXml(str) {
    return (str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderSvgDiagram(phase) {
    const diag = phase.svgDiagram;
    if (!diag) return '<div style="padding: 24px; text-align: center; color: var(--text-muted);">Architectural diagram loading...</div>';
    const src = diag.sourceTable || {};
    const res = diag.resultTable || {};
    const op = diag.operation || 'SQL Transformation';
    const callout = diag.callout || { badge: 'Operation', text: '' };

    const step = state.diagramStep || 0; // 0: all, 1: src, 2: op, 3: res

    const cardW = 300;
    const cardH = 260;
    const srcX = 20;
    const srcY = 20;
    const midX = 340;
    const midW = 280;
    const resX = 640;
    const resY = 20;

    // Opacity and highlights based on step
    const srcOpacity = (step === 0 || step === 1) ? '1.0' : '0.35';
    const opOpacity = (step === 0 || step === 2) ? '1.0' : '0.35';
    const resOpacity = (step === 0 || step === 3) ? '1.0' : '0.35';

    const srcStroke = step === 1 ? '#2563eb' : '#d4d4d8';
    const srcStrokeW = step === 1 ? '2.5' : '1';
    const resStroke = step === 3 ? '#10b981' : '#10b981';
    const resStrokeW = step === 3 ? '2.5' : '1.5';

    const srcCols = (src.cols || []).slice(0, 4);
    const colW = Math.floor((cardW - 16) / Math.max(srcCols.length, 1));
    let srcRowsSvg = '';
    (src.rows || []).slice(0, 4).forEach((r, rIdx) => {
      const y = srcY + 80 + (rIdx * 34);
      const isEven = rIdx % 2 === 0;
      srcRowsSvg += `
        <rect x="${srcX + 8}" y="${y - 18}" width="${cardW - 16}" height="30" rx="4" fill="${isEven ? '#ffffff' : '#fcfcfd'}" stroke="#f4f4f5" stroke-width="1"/>
        ${r.slice(0, 4).map((cell, cIdx) => `
          <text x="${srcX + 16 + (cIdx * colW)}" y="${y}" font-family="monospace" font-size="11" fill="#27272a">${escapeXml(String(cell))}</text>
        `).join('')}
      `;
    });

    const resCols = (res.cols || []).slice(0, 4);
    const resColW = Math.floor((cardW - 16) / Math.max(resCols.length, 1));
    let resRowsSvg = '';
    (res.rows || []).slice(0, 4).forEach((r, rIdx) => {
      const y = resY + 80 + (rIdx * 34);
      resRowsSvg += `
        <rect x="${resX + 8}" y="${y - 18}" width="${cardW - 16}" height="30" rx="4" fill="rgba(16, 185, 129, 0.08)" stroke="rgba(16, 185, 129, 0.25)" stroke-width="1"/>
        ${r.slice(0, 4).map((cell, cIdx) => `
          <text x="${resX + 16 + (cIdx * resColW)}" y="${y}" font-family="monospace" font-size="11" font-weight="600" fill="#065f46">${escapeXml(String(cell))}</text>
        `).join('')}
      `;
    });

    const words = (callout.text || '').split(' ');
    const lines = [];
    let currLine = '';
    words.forEach(w => {
      if ((currLine + ' ' + w).length > 36) {
        lines.push(currLine.trim());
        currLine = w;
      } else {
        currLine += (currLine ? ' ' : '') + w;
      }
    });
    if (currLine) lines.push(currLine.trim());

    return `
      <div class="course-svg-diagram-card">
        <svg viewBox="0 0 960 300" class="course-explainer-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gBluePill" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#2563eb"/>
              <stop offset="100%" stop-color="#1d4ed8"/>
            </linearGradient>
            <linearGradient id="gCalloutBg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#ffffff"/>
              <stop offset="100%" stop-color="#f8fafc"/>
            </linearGradient>
            <filter id="shadowCard" x="-5%" y="-5%" width="110%" height="115%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.06"/>
            </filter>
            <marker id="arrowHead" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#2563eb"/>
            </marker>
          </defs>
          <rect x="0" y="0" width="960" height="300" rx="12" fill="#fafafa" stroke="#e4e4e7" stroke-width="1"/>
          
          <!-- 1. Source Table Group -->
          <g id="sourceTableGroup" opacity="${srcOpacity}" style="transition: opacity 0.3s ease;">
            <rect x="${srcX}" y="${srcY}" width="${cardW}" height="${cardH}" rx="8" fill="#ffffff" stroke="${srcStroke}" stroke-width="${srcStrokeW}" filter="url(#shadowCard)"/>
            <path d="M ${srcX} ${srcY + 8} Q ${srcX} ${srcY} ${srcX + 8} ${srcY} L ${srcX + cardW - 8} ${srcY} Q ${srcX + cardW} ${srcY} ${srcX + cardW} ${srcY + 8} L ${srcX + cardW} ${srcY + 36} L ${srcX} ${srcY + 36} Z" fill="${step === 1 ? '#dbeafe' : '#f4f4f5'}"/>
            <text x="${srcX + 14}" y="${srcY + 23}" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="${step === 1 ? '#1d4ed8' : '#27272a'}">📁 ${escapeXml(src.name)} ${step === 1 ? '• SCANNING' : ''}</text>
            ${srcCols.map((col, idx) => `
              <text x="${srcX + 16 + (idx * colW)}" y="${srcY + 54}" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#71717a">${escapeXml(col)}</text>
            `).join('')}
            <line x1="${srcX + 8}" y1="${srcY + 62}" x2="${srcX + cardW - 8}" y2="${srcY + 62}" stroke="#e4e4e7" stroke-width="1"/>
            ${srcRowsSvg}
          </g>

          <!-- 2. Operations & Callout Bridge -->
          <g id="operationBridgeGroup" opacity="${opOpacity}" style="transition: opacity 0.3s ease;">
            <rect x="${midX}" y="${srcY + 6}" width="${midW}" height="32" rx="16" fill="url(#gBluePill)" filter="url(#shadowCard)"/>
            <text x="${midX + (midW / 2)}" y="${srcY + 26}" text-anchor="middle" font-family="monospace" font-size="11" font-weight="700" fill="#ffffff">⚡ ${escapeXml(op)}</text>
            <path d="M ${srcX + cardW + 8} 80 L ${resX - 12} 80" stroke="#2563eb" stroke-width="2.5" stroke-dasharray="6,4" fill="none" marker-end="url(#arrowHead)"/>
            <rect x="${midX}" y="${srcY + 80}" width="${midW}" height="150" rx="8" fill="url(#gCalloutBg)" stroke="${step === 2 ? '#2563eb' : '#bfdbfe'}" stroke-width="${step === 2 ? '2' : '1.5'}" filter="url(#shadowCard)"/>
            <rect x="${midX + 12}" y="${srcY + 92}" width="140" height="20" rx="4" fill="#dbeafe"/>
            <text x="${midX + 18}" y="${srcY + 106}" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#1d4ed8">💡 ${escapeXml(callout.badge)}</text>
            ${lines.map((l, lIdx) => `
              <text x="${midX + 14}" y="${srcY + 130 + (lIdx * 18)}" font-family="system-ui, sans-serif" font-size="11.5" fill="#334155">${escapeXml(l)}</text>
            `).join('')}
          </g>

          <!-- 3. Result Table Group -->
          <g id="resultTableGroup" opacity="${resOpacity}" style="transition: opacity 0.3s ease;">
            <rect x="${resX}" y="${resY}" width="${cardW}" height="${cardH}" rx="8" fill="#ffffff" stroke="${resStroke}" stroke-width="${resStrokeW}" filter="url(#shadowCard)"/>
            <path d="M ${resX} ${resY + 8} Q ${resX} ${resY} ${resX + 8} ${resY} L ${resX + cardW - 8} ${resY} Q ${resX + cardW} ${resY} ${resX + cardW} ${resY + 8} L ${resX + cardW} ${resY + 36} L ${resX} ${resY + 36} Z" fill="${step === 3 ? '#d1fae5' : '#ecfdf5'}"/>
            <text x="${resX + 14}" y="${resY + 23}" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#065f46">✨ ${escapeXml(res.name)} ${step === 3 ? '• EMITTED' : ''}</text>
            ${resCols.map((col, idx) => `
              <text x="${resX + 16 + (idx * resColW)}" y="${resY + 54}" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#047857">${escapeXml(col)}</text>
            `).join('')}
            <line x1="${resX + 8}" y1="${resY + 62}" x2="${resX + cardW - 8}" y2="${resY + 62}" stroke="#a7f3d0" stroke-width="1"/>
            ${resRowsSvg}
          </g>
        </svg>

        <!-- Interactive Diagram Stepper Bar -->
        <div class="diagram-stepper-bar">
          <button class="diagram-step-btn ${step === 0 ? 'active' : ''}" onclick="window.MasteryCourseEngine.setDiagramStep(0)">
            <span>👁️ Overview</span>
          </button>
          <button class="diagram-step-btn ${step === 1 ? 'active' : ''}" onclick="window.MasteryCourseEngine.setDiagramStep(1)">
            <span>1️⃣ Step 1: Scan Table</span>
          </button>
          <button class="diagram-step-btn ${step === 2 ? 'active' : ''}" onclick="window.MasteryCourseEngine.setDiagramStep(2)">
            <span>2️⃣ Step 2: Transform / Filter</span>
          </button>
          <button class="diagram-step-btn ${step === 3 ? 'active' : ''}" onclick="window.MasteryCourseEngine.setDiagramStep(3)">
            <span>3️⃣ Step 3: Emit Result</span>
          </button>
        </div>
      </div>
    `;
  }

  // ===========================================================================
  // STAGE 1: LEARN & VISUALIZE (LESSON + SVG DIAGRAM + LIVE SIMULATOR)
  // ===========================================================================
  function renderTheoryStage(phase) {
    const lesson = phase.lesson || {};
    const analogy = phase.analogy || { metaphor: 'Everyday Metaphor', story: lesson.analogy || '', takeaway: '' };
    const deepTheory = (phase.deepTheory && phase.deepTheory.length > 0)
      ? phase.deepTheory
      : (lesson.steps || []).map(s => ({ title: s.title, body: s.body }));
    const traps = phase.traps || [];
    const tricks = phase.tricks || [];
    const patterns = phase.patterns || [];
    const interview = phase.interviewDefense || null;
    const visualMode = state.visualMode || 'diagram';

    return `
      <div class="stage-theory-container">
        <!-- Visual Studio Card: SVG Architecture Diagram or Live Simulator -->
        <div class="interactive-simulator-card">
          <div class="visual-mode-toggle-bar">
            <div class="visual-mode-title-group">
              <span>${visualMode === 'diagram' ? '🎨' : '✨'}</span>
              <span>${visualMode === 'diagram' ? 'Visual Architecture Explainer Diagram' : 'Interactive Live Data Sandbox'}</span>
            </div>
            <div class="visual-mode-toggle-group">
              <button class="visual-toggle-btn ${visualMode === 'diagram' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setVisualMode('diagram')">
                <span>🎨 Visual Diagram</span>
              </button>
              <button class="visual-toggle-btn ${visualMode === 'sandbox' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setVisualMode('sandbox')">
                <span>⚡ Live Sandbox</span>
              </button>
            </div>
          </div>

          ${visualMode === 'diagram' ? renderSvgDiagram(phase) : renderInteractiveSimulator(phase)}
        </div>

        <!-- Everyday Analogy Hero Card -->
        <div class="analogy-hero-card" id="section-analogy">
          <div class="analogy-hero-header">
            <span style="font-size: 24px;">🎯</span>
            <h3 class="analogy-hero-title">Everyday Analogy: ${escapeHtml(analogy.metaphor)}</h3>
          </div>
          <div class="analogy-hero-story">
            ${escapeHtml(analogy.story)}
          </div>
          ${analogy.takeaway ? `
            <div class="analogy-hero-takeaway">
              <strong>💡 Golden Takeaway:</strong> ${escapeHtml(analogy.takeaway)}
            </div>
          ` : ''}
        </div>

        <!-- Main Lesson Content & Guidance Grid -->
        <div class="theory-content-grid">
          <!-- Left Column: Step-by-Step Lessons & Code Examples -->
          <div class="theory-main-column">
            <!-- Comprehensive Step-by-Step Chapters -->
            <div id="section-theory">
              ${deepTheory.map((chapter) => `
                <div class="theory-text-card">
                  <h3 class="theory-card-heading">
                    <span>${escapeHtml(chapter.title)}</span>
                  </h3>
                  <div class="theory-card-body">
                    ${formatTheoryMarkdown(chapter.body)}
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Traps, Gotchas & Corporate Impact Section -->
            ${traps.length > 0 ? `
              <div class="traps-compendium-section" id="section-traps">
                <div class="theory-card-heading" style="margin-top: 10px;">
                  <span>⚠️ High-Yield Traps &amp; Corporate Gotchas</span>
                </div>
                ${traps.map(trap => {
                  const encodedGood = encodeURIComponent(trap.goodSql || '');
                  return `
                    <div class="trap-card">
                      <div class="trap-header">
                        <div class="trap-title-group">
                          <span class="trap-severity-badge severity-${trap.severity.toLowerCase()}">${trap.severity}</span>
                          <span class="trap-title">${escapeHtml(trap.title)}</span>
                        </div>
                      </div>

                      <div class="trap-diff-grid">
                        <div class="diff-col bad">
                          <div class="diff-col-header">
                            <span>❌ Common Mistake</span>
                          </div>
                          <pre class="diff-code">${escapeHtml(trap.badSql)}</pre>
                        </div>
                        <div class="diff-col good">
                          <div class="diff-col-header">
                            <span>✅ Production Standard</span>
                          </div>
                          <div class="code-action-strip">
                            <span class="code-lang-tag">SQL SOLUTION</span>
                            <div class="code-action-btns">
                              <button class="code-btn-copy" onclick="window.MasteryCourseEngine.copyCode(this, '${encodedGood}')">
                                <span>📋 Copy</span>
                              </button>
                              <button class="code-btn-studio" onclick="window.MasteryCourseEngine.solveInStudio('${encodedGood}', 'Employees')">
                                <span>⚡ Test in Studio</span>
                              </button>
                            </div>
                          </div>
                          <pre class="diff-code">${escapeHtml(trap.goodSql)}</pre>
                        </div>
                      </div>

                      <div class="trap-callout-why">
                        <strong>🔍 Why It Breaks Under the Hood:</strong> ${escapeHtml(trap.whyItBreaks)}
                      </div>
                      <div class="trap-callout-impact">
                        <strong>🚨 Corporate Impact:</strong> ${escapeHtml(trap.corporateImpact)}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            ` : ''}

            <!-- Patterns to Remember & Practice Section -->
            ${patterns.length > 0 ? `
              <div class="patterns-compendium-section" id="section-patterns">
                <div class="theory-card-heading" style="margin-top: 10px;">
                  <span>📐 Patterns to Remember &amp; Practice</span>
                </div>
                ${patterns.map(pat => {
                  const encodedTemplate = encodeURIComponent(pat.sqlTemplate || '');
                  return `
                    <div class="pattern-card">
                      <div class="pattern-header">
                        <span class="pattern-title">${escapeHtml(pat.title)}</span>
                        <span class="pattern-formula-tag">${escapeHtml(pat.formula)}</span>
                      </div>
                      <div class="pattern-when">
                        <strong>📌 When to Use:</strong> ${escapeHtml(pat.whenToUse)}
                      </div>
                      <div class="code-action-strip">
                        <span class="code-lang-tag">REUSABLE PATTERN</span>
                        <div class="code-action-btns">
                          <button class="code-btn-copy" onclick="window.MasteryCourseEngine.copyCode(this, '${encodedTemplate}')">
                            <span>📋 Copy</span>
                          </button>
                          <button class="code-btn-studio" onclick="window.MasteryCourseEngine.solveInStudio('${encodedTemplate}', 'Employees')">
                            <span>⚡ Test in Studio</span>
                          </button>
                        </div>
                      </div>
                      <pre class="pattern-code">${escapeHtml(pat.sqlTemplate)}</pre>
                      <div class="pattern-explanation">${escapeHtml(pat.explanation)}</div>
                    </div>
                  `;
                }).join('')}
              </div>
            ` : ''}
          </div>

          <!-- Right Column: Sticky Navigation, Interview Defense & Senior Tricks -->
          <div class="theory-sidebar-column">
            <!-- 1. Quick Navigation Outline (TOC) -->
            <div class="course-toc-card">
              <div class="course-toc-title">
                <span>🧭</span>
                <span>Module Outline</span>
              </div>
              <div class="course-toc-list">
                <a href="#section-analogy" class="course-toc-item" onclick="event.preventDefault(); document.getElementById('section-analogy').scrollIntoView({ behavior: 'smooth' });">
                  <span>🎯 Everyday Analogy</span>
                </a>
                <a href="#section-theory" class="course-toc-item" onclick="event.preventDefault(); document.getElementById('section-theory').scrollIntoView({ behavior: 'smooth' });">
                  <span>📖 Core Theory Chapters</span>
                </a>
                ${traps.length > 0 ? `
                  <a href="#section-traps" class="course-toc-item" onclick="event.preventDefault(); document.getElementById('section-traps').scrollIntoView({ behavior: 'smooth' });">
                    <span>⚠️ Traps &amp; Gotchas</span>
                  </a>
                ` : ''}
                ${patterns.length > 0 ? `
                  <a href="#section-patterns" class="course-toc-item" onclick="event.preventDefault(); document.getElementById('section-patterns').scrollIntoView({ behavior: 'smooth' });">
                    <span>📐 Reusable Patterns</span>
                  </a>
                ` : ''}
                ${interview ? `
                  <a href="#section-interview" class="course-toc-item" onclick="event.preventDefault(); document.getElementById('section-interview').scrollIntoView({ behavior: 'smooth' });">
                    <span>🎙️ Spoken Interview Script</span>
                  </a>
                ` : ''}
                ${tricks.length > 0 ? `
                  <a href="#section-tricks" class="course-toc-item" onclick="event.preventDefault(); document.getElementById('section-tricks').scrollIntoView({ behavior: 'smooth' });">
                    <span>💡 Senior FAANG Secrets</span>
                  </a>
                ` : ''}
              </div>
            </div>

            <!-- 2. Spoken Interview Defense Script -->
            ${interview ? `
              <div class="spoken-defense-card" id="section-interview">
                <div class="defense-header">
                  <span class="defense-badge">🎙️ FAANG Screening Script</span>
                  <span style="font-size: 11px; font-weight: 700; color: var(--text-muted);">${escapeHtml(interview.difficulty)}</span>
                </div>
                <h4 class="defense-question">${escapeHtml(interview.question)}</h4>

                <div class="defense-intent-box">
                  <strong>🕵️ Interviewer Intent:</strong> ${escapeHtml(interview.interviewerIntent)}
                </div>

                <div class="spoken-script-box">
                  <div class="spoken-script-label">
                    <span>💬</span>
                    <span>What to Say Out Loud (30-Sec Script):</span>
                  </div>
                  "${escapeHtml(interview.spokenAnswer)}"
                </div>

                ${interview.codeSnippet ? `
                  <div class="code-action-strip">
                    <span class="code-lang-tag">INTERVIEW PROOF</span>
                    <div class="code-action-btns">
                      <button class="code-btn-copy" onclick="window.MasteryCourseEngine.copyCode(this, '${encodeURIComponent(interview.codeSnippet)}')">
                        <span>📋 Copy</span>
                      </button>
                      <button class="code-btn-studio" onclick="window.MasteryCourseEngine.solveInStudio('${encodeURIComponent(interview.codeSnippet)}', 'Employees')">
                        <span>⚡ Test in Studio</span>
                      </button>
                    </div>
                  </div>
                  <pre class="diff-code" style="margin-top: 0; border-top-left-radius: 0; border-top-right-radius: 0;">${escapeHtml(interview.codeSnippet)}</pre>
                ` : ''}

                ${interview.powerKeywords && interview.powerKeywords.length > 0 ? `
                  <div>
                    <div style="font-size: 10.5px; font-weight: 800; text-transform: uppercase; color: var(--text-muted); margin-bottom: 4px;">
                      Power Keywords to Drop:
                    </div>
                    <div class="keywords-cloud">
                      ${interview.powerKeywords.map(kw => `<span class="keyword-badge">${escapeHtml(kw)}</span>`).join('')}
                    </div>
                  </div>
                ` : ''}
              </div>
            ` : ''}

            <!-- 3. Senior Tricks & FAANG Interview Secrets -->
            ${tricks.length > 0 ? `
              <div class="senior-tricks-section" id="section-tricks">
                <div class="theory-card-heading">
                  <span>💡 Senior Tricks &amp; FAANG Secrets</span>
                </div>
                ${tricks.map(trick => `
                  <div class="trick-card">
                    <div class="trick-concept">${escapeHtml(trick.concept)}</div>
                    <div class="trick-title">${escapeHtml(trick.title)}</div>
                    <div class="code-action-strip">
                      <span class="code-lang-tag">SQL TRICK</span>
                      <div class="code-action-btns">
                        <button class="code-btn-copy" onclick="window.MasteryCourseEngine.copyCode(this, '${encodeURIComponent(trick.codeSnippet || '')}')">
                          <span>📋 Copy</span>
                        </button>
                        <button class="code-btn-studio" onclick="window.MasteryCourseEngine.solveInStudio('${encodeURIComponent(trick.codeSnippet || '')}', 'Employees')">
                          <span>⚡ Test in Studio</span>
                        </button>
                      </div>
                    </div>
                    <pre class="trick-code">${escapeHtml(trick.codeSnippet)}</pre>
                    <div class="trick-explanation">${escapeHtml(trick.explanation)}</div>
                    <div class="trick-analyst-value">
                      <strong>🏆 Value:</strong> ${escapeHtml(trick.analystValue)}
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            <!-- 4. Learning Level Progression Card -->
            <div class="theory-text-card" style="background: var(--bg-card-subtle);">
              <h4 style="margin: 0 0 6px 0; font-size: 12px; font-weight: 800; text-transform: uppercase; color: var(--accent);">
                Curriculum Progression
              </h4>
              <p style="margin: 0; font-size: 12.5px; color: var(--text-secondary); line-height: 1.5;">
                <strong>${phase.execRank}</strong>. Master this step before advancing to the next topic.
              </p>
            </div>

            <!-- 5. Next Step CTA -->
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
    if (phase.id === 'topic_01_select_from') return renderSelectFromSimulator();
    if (phase.id === 'topic_02_where') return renderWhereSimulator();
    if (phase.id === 'topic_03_order_limit') return renderOrderLimitSimulator();
    if (phase.id === 'topic_04_aggregates') return renderAggregatesSimulator();
    if (phase.id === 'topic_05_groupby_having') return renderGroupByHavingSimulator();
    if (phase.id === 'topic_06_joins') return renderJoinsSimulator();
    if (phase.id === 'topic_07_adv_joins_union') return renderAdvJoinsUnionSimulator();
    if (phase.id === 'topic_08_case_when') return renderCaseWhenSimulator();
    if (phase.id === 'topic_09_ctes') return renderCteSimulator();
    if (phase.id === 'topic_10_window_functions') return renderWindowSimulator();

    return `<div style="padding: 20px;">Simulator ready</div>`;
  }

  // --- 1. SELECT & FROM SIMULATOR ---
  function renderSelectFromSimulator() {
    const mode = state.simState.topic_01_select_from || 'columns';

    let queryText = '';
    let explanation = '';
    let headers = [];
    let rows = [];

    if (mode === 'all') {
      queryText = 'SELECT * FROM Employees;';
      headers = ['id', 'first_name', 'department', 'salary', 'tenure'];
      rows = SIM_DATA.employees.slice(0, 4).map(e => [e.id, e.first_name, e.department, '$' + e.salary.toLocaleString(), e.tenure + ' mos']);
      explanation = '<code>SELECT *</code> returns <strong>every single column</strong> in the Employees table.';
    } else if (mode === 'columns') {
      queryText = 'SELECT first_name, department, salary FROM Employees;';
      headers = ['first_name', 'department', 'salary'];
      rows = SIM_DATA.employees.slice(0, 4).map(e => [e.first_name, e.department, '$' + e.salary.toLocaleString()]);
      explanation = 'Selecting specific columns keeps the output clean, only showing the fields you asked for.';
    } else if (mode === 'math') {
      queryText = 'SELECT first_name, salary, salary / 12 AS monthly_pay FROM Employees;';
      headers = ['first_name', 'salary', 'monthly_pay (Calculated)'];
      rows = SIM_DATA.employees.slice(0, 4).map(e => [e.first_name, '$' + e.salary.toLocaleString(), '$' + Math.round(e.salary / 12).toLocaleString()]);
      explanation = 'Inline math expressions can calculate new columns dynamically, labeled with <code>AS monthly_pay</code>.';
    }

    return `
      <div class="sim-control-strip">
        <div class="sim-title-group">
          <span>✨</span>
          <span>Interactive Column Projection Simulator (Click options to see output change live)</span>
        </div>
        <div class="sim-toggle-group">
          <button class="sim-toggle-btn ${mode === 'all' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('topic_01_select_from', 'all')">SELECT * (All Columns)</button>
          <button class="sim-toggle-btn ${mode === 'columns' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('topic_01_select_from', 'columns')">Specific Columns</button>
          <button class="sim-toggle-btn ${mode === 'math' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('topic_01_select_from', 'math')">Math &amp; Aliases (AS)</button>
        </div>
      </div>

      <div class="sim-viewport">
        <div class="sim-result-box">
          <div class="sim-result-header">
            <span>Executed Query: <code>${queryText}</code></span>
            <span class="course-pill-tag">${headers.length} Columns &bull; 4 of ${SIM_DATA.employees.length} Rows Shown</span>
          </div>
          <div class="course-sim-table-wrap">
            <table class="course-sim-data-table">
              <thead>
                <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
              </thead>
              <tbody>
                ${rows.map(r => `
                  <tr class="highlight-match">
                    ${r.map(cell => `<td>${cell}</td>`).join('')}
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
    const filter = state.simState.topic_02_where || 'salary_gt_100k';

    let conditionLabel = '';
    let predicate = () => true;

    if (filter === 'salary_gt_100k') {
      conditionLabel = 'salary > 100000';
      predicate = e => e.salary > 100000;
    } else if (filter === 'dept_eng') {
      conditionLabel = "department = 'Engineering'";
      predicate = e => e.department === 'Engineering';
    } else if (filter === 'between') {
      conditionLabel = 'salary BETWEEN 90000 AND 120000';
      predicate = e => e.salary >= 90000 && e.salary <= 120000;
    } else {
      conditionLabel = 'No Filter (All Rows)';
      predicate = () => true;
    }

    const rows = SIM_DATA.employees;
    const passedRows = rows.filter(predicate);

    return `
      <div class="sim-control-strip">
        <div class="sim-title-group">
          <span>🔍</span>
          <span>Interactive Filter Simulator (Click a rule to test row filtering)</span>
        </div>
        <div class="sim-toggle-group">
          <button class="sim-toggle-btn ${filter === 'salary_gt_100k' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('topic_02_where', 'salary_gt_100k')">salary > 100k</button>
          <button class="sim-toggle-btn ${filter === 'dept_eng' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('topic_02_where', 'dept_eng')">dept = 'Engineering'</button>
          <button class="sim-toggle-btn ${filter === 'between' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('topic_02_where', 'between')">BETWEEN 90k AND 120k</button>
          <button class="sim-toggle-btn ${filter === 'all' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('topic_02_where', 'all')">Show All</button>
        </div>
      </div>

      <div class="sim-viewport">
        <div class="sim-result-box">
          <div class="sim-result-header">
            <span>Evaluating Rule: <code>WHERE ${conditionLabel}</code></span>
            <span class="course-pill-tag">${passedRows.length} of ${rows.length} Passed</span>
          </div>
          <div class="course-sim-table-wrap">
            <table class="course-sim-data-table">
              <thead>
                <tr><th>first_name</th><th>department</th><th>salary</th><th>tenure</th><th>Filter Result</th></tr>
              </thead>
              <tbody>
                ${rows.map(e => {
                  const pass = predicate(e);
                  return `
                    <tr class="${pass ? 'highlight-match' : 'highlight-drop'}">
                      <td>${e.first_name}</td>
                      <td>${e.department}</td>
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
            The <code>WHERE</code> clause checks each row individually. Only rows that evaluate to <strong>TRUE</strong> are included.
          </div>
        </div>
      </div>
    `;
  }

  // --- 3. ORDER BY & LIMIT SIMULATOR ---
  function renderOrderLimitSimulator() {
    const mode = state.simState.topic_03_order_limit || 'salary_desc';

    let list = [...SIM_DATA.employees];
    let queryCode = '';
    let explanation = '';

    if (mode === 'salary_desc') {
      list.sort((a, b) => b.salary - a.salary);
      queryCode = 'ORDER BY salary DESC;';
      explanation = 'Rows are sorted from highest salary to lowest salary.';
    } else if (mode === 'name_asc') {
      list.sort((a, b) => a.first_name.localeCompare(b.first_name));
      queryCode = 'ORDER BY first_name ASC;';
      explanation = 'Rows are sorted alphabetically A-to-Z by first name.';
    } else if (mode === 'top3') {
      list.sort((a, b) => b.salary - a.salary);
      list = list.slice(0, 3);
      queryCode = 'ORDER BY salary DESC LIMIT 3;';
      explanation = 'Finds the Top 3 highest earners in the company by sorting first, then taking 3 rows.';
    } else if (mode === 'page2') {
      list.sort((a, b) => b.salary - a.salary);
      list = list.slice(3, 6);
      queryCode = 'ORDER BY salary DESC LIMIT 3 OFFSET 3;';
      explanation = 'Skips the first 3 rows (Page 1) and returns the next 3 rows (Page 2).';
    }

    return `
      <div class="sim-control-strip">
        <div class="sim-title-group">
          <span>📶</span>
          <span>Interactive Sorter &amp; Slicer</span>
        </div>
        <div class="sim-toggle-group">
          <button class="sim-toggle-btn ${mode === 'salary_desc' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('topic_03_order_limit', 'salary_desc')">salary DESC</button>
          <button class="sim-toggle-btn ${mode === 'name_asc' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('topic_03_order_limit', 'name_asc')">first_name ASC</button>
          <button class="sim-toggle-btn ${mode === 'top3' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('topic_03_order_limit', 'top3')">Top 3 (LIMIT 3)</button>
          <button class="sim-toggle-btn ${mode === 'page2' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('topic_03_order_limit', 'page2')">Page 2 (OFFSET 3)</button>
        </div>
      </div>

      <div class="sim-viewport">
        <div class="sim-result-box">
          <div class="sim-result-header">
            <span>Query: <code>SELECT first_name, department, salary FROM Employees ${queryCode}</code></span>
            <span class="course-pill-tag">${list.length} Rows</span>
          </div>
          <div class="course-sim-table-wrap">
            <table class="course-sim-data-table">
              <thead>
                <tr><th>#</th><th>first_name</th><th>department</th><th>salary</th></tr>
              </thead>
              <tbody>
                ${list.map((e, idx) => `
                  <tr class="highlight-match">
                    <td><strong>#${idx + 1}</strong></td>
                    <td>${e.first_name}</td>
                    <td>${e.department}</td>
                    <td>$${e.salary.toLocaleString()}</td>
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

  // --- 4. AGGREGATES SIMULATOR ---
  function renderAggregatesSimulator() {
    const agg = state.simState.topic_04_aggregates || 'count';
    const list = SIM_DATA.employees;

    const totalSalary = list.reduce((acc, c) => acc + c.salary, 0);
    const avgSalary = Math.round(totalSalary / list.length);
    const minSalary = Math.min(...list.map(x => x.salary));
    const maxSalary = Math.max(...list.map(x => x.salary));
    const distinctDepts = new Set(list.map(x => x.department)).size;

    return `
      <div class="sim-control-strip">
        <div class="sim-title-group">
          <span>📊</span>
          <span>Interactive Whole-Table Aggregate Calculator</span>
        </div>
        <div class="sim-toggle-group">
          <button class="sim-toggle-btn ${agg === 'count' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('topic_04_aggregates', 'count')">COUNT(*)</button>
          <button class="sim-toggle-btn ${agg === 'sum' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('topic_04_aggregates', 'sum')">SUM(salary)</button>
          <button class="sim-toggle-btn ${agg === 'avg' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('topic_04_aggregates', 'avg')">AVG(salary)</button>
          <button class="sim-toggle-btn ${agg === 'min_max' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('topic_04_aggregates', 'min_max')">MIN &amp; MAX</button>
          <button class="sim-toggle-btn ${agg === 'distinct' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('topic_04_aggregates', 'distinct')">COUNT(DISTINCT dept)</button>
        </div>
      </div>

      <div class="sim-viewport">
        <div class="sim-result-box">
          <div class="sim-result-header">
            <span>Summary Output (1 Single Aggregated Row)</span>
            <span class="course-pill-tag">Calculated Across ${list.length} Rows</span>
          </div>
          <div style="padding: 20px; font-size: 14px; color: var(--text-primary); line-height: 1.6;">
            ${agg === 'count' ? `<div><code>SELECT COUNT(*) FROM Employees;</code> ➔ <strong>${list.length} total employees</strong></div>` : ''}
            ${agg === 'sum' ? `<div><code>SELECT SUM(salary) FROM Employees;</code> ➔ <strong>$${totalSalary.toLocaleString()} total payroll</strong></div>` : ''}
            ${agg === 'avg' ? `<div><code>SELECT ROUND(AVG(salary), 2) FROM Employees;</code> ➔ <strong>$${avgSalary.toLocaleString()} average salary</strong></div>` : ''}
            ${agg === 'min_max' ? `<div><code>SELECT MIN(salary), MAX(salary) FROM Employees;</code> ➔ <strong>Lowest: $${minSalary.toLocaleString()} &bull; Highest: $${maxSalary.toLocaleString()}</strong></div>` : ''}
            ${agg === 'distinct' ? `<div><code>SELECT COUNT(DISTINCT department) FROM Employees;</code> ➔ <strong>${distinctDepts} unique departments</strong> (Analytics, Engineering, Finance, Sales)</div>` : ''}
          </div>
        </div>
      </div>
    `;
  }

  // --- 5. GROUP BY & HAVING SIMULATOR ---
  function renderGroupByHavingSimulator() {
    const mode = state.simState.topic_05_groupby_having || 'count';

    const groups = {
      Analytics: SIM_DATA.employees.filter(e => e.department === 'Analytics'),
      Engineering: SIM_DATA.employees.filter(e => e.department === 'Engineering'),
      Finance: SIM_DATA.employees.filter(e => e.department === 'Finance'),
      Sales: SIM_DATA.employees.filter(e => e.department === 'Sales')
    };

    let deptKeys = Object.keys(groups);
    if (mode === 'having_filter') {
      deptKeys = deptKeys.filter(d => groups[d].length >= 3);
    }

    return `
      <div class="sim-control-strip">
        <div class="sim-title-group">
          <span>📦</span>
          <span>Interactive Grouping Simulator</span>
        </div>
        <div class="sim-toggle-group">
          <button class="sim-toggle-btn ${mode === 'count' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('topic_05_groupby_having', 'count')">GROUP BY dept (COUNT)</button>
          <button class="sim-toggle-btn ${mode === 'avg' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('topic_05_groupby_having', 'avg')">GROUP BY dept (AVG)</button>
          <button class="sim-toggle-btn ${mode === 'having_filter' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('topic_05_groupby_having', 'having_filter')">HAVING COUNT(*) >= 3</button>
        </div>
      </div>

      <div class="sim-viewport">
        <div class="sim-tables-row">
          ${deptKeys.map(d => {
            const list = groups[d];
            const avg = Math.round(list.reduce((acc, c) => acc + c.salary, 0) / list.length);
            return `
              <div class="sim-table-card">
                <div class="sim-table-title">
                  <span>Department: '${d}'</span>
                  <span class="course-pill-tag">${list.length} Staff</span>
                </div>
                <div style="padding: 10px 12px; font-size: 12px; color: var(--text-secondary);">
                  <div>Staff: ${list.map(x => x.first_name).join(', ')}</div>
                  <div style="margin-top: 6px; font-weight: 700; color: var(--accent);">
                    ${mode === 'avg' ? `AVG = $${avg.toLocaleString()}` : `COUNT = ${list.length}`}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
        <div class="sim-explanation-callout">
          ${mode === 'having_filter' ? '<code>HAVING COUNT(*) >= 3</code> filters out Engineering, Finance, and Sales because they have fewer than 3 staff members!' : 'GROUP BY compresses all employees into a single summary row per department.'}
        </div>
      </div>
    `;
  }

  // --- 6. JOINS SIMULATOR ---
  function renderJoinsSimulator() {
    const mode = state.simState.topic_06_joins || 'inner';

    let results = [];
    if (mode === 'inner') {
      results = [
        { order_id: 101, amount: '$250', name: 'Alice Smith', city: 'London', status: 'match' },
        { order_id: 102, amount: '$120', name: 'Bob Jones', city: 'New York', status: 'match' },
        { order_id: 104, amount: '$310', name: 'Alice Smith', city: 'London', status: 'match' }
      ];
    } else if (mode === 'left') {
      results = [
        { order_id: 101, amount: '$250', name: 'Alice Smith', city: 'London', status: 'match' },
        { order_id: 102, amount: '$120', name: 'Bob Jones', city: 'New York', status: 'match' },
        { order_id: 103, amount: '$80',  name: 'NULL', city: 'NULL', status: 'null' },
        { order_id: 104, amount: '$310', name: 'Alice Smith', city: 'London', status: 'match' }
      ];
    } else if (mode === 'anti_left') {
      results = [
        { order_id: 'NULL', amount: 'NULL', name: 'Charlie Lee', city: 'Tokyo (0 Orders)', status: 'null' }
      ];
    }

    return `
      <div class="sim-control-strip">
        <div class="sim-title-group">
          <span>🔗</span>
          <span>Interactive Join Simulator</span>
        </div>
        <div class="sim-toggle-group">
          <button class="sim-toggle-btn ${mode === 'inner' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('topic_06_joins', 'inner')">INNER JOIN (Matches Only)</button>
          <button class="sim-toggle-btn ${mode === 'left' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('topic_06_joins', 'left')">LEFT JOIN (All Orders)</button>
          <button class="sim-toggle-btn ${mode === 'anti_left' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('topic_06_joins', 'anti_left')">Customers with 0 Orders</button>
        </div>
      </div>

      <div class="sim-viewport">
        <div class="sim-result-box">
          <div class="sim-result-header">
            <span>Result Rows</span>
            <span class="course-pill-tag">${results.length} Rows</span>
          </div>
          <div class="course-sim-table-wrap">
            <table class="course-sim-data-table">
              <thead>
                <tr><th>order_id</th><th>amount</th><th>customer_name</th><th>city</th><th>Status</th></tr>
              </thead>
              <tbody>
                ${results.map(r => `
                  <tr class="${r.status === 'match' ? 'highlight-match' : 'highlight-null'}">
                    <td>${r.order_id}</td>
                    <td>${r.amount}</td>
                    <td>${r.name}</td>
                    <td>${r.city}</td>
                    <td><span class="sim-badge ${r.status === 'match' ? 'match' : 'null'}">${r.status === 'match' ? '✓ Matched' : '⚠️ NULL'}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  // --- 7. ADVANCED JOINS & UNION SIMULATOR ---
  function renderAdvJoinsUnionSimulator() {
    const mode = state.simState.topic_07_adv_joins_union || 'union_all';

    return `
      <div class="sim-control-strip">
        <div class="sim-title-group">
          <span>🔄</span>
          <span>Interactive Set Operations (UNION vs UNION ALL)</span>
        </div>
        <div class="sim-toggle-group">
          <button class="sim-toggle-btn ${mode === 'union_all' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('topic_07_adv_joins_union', 'union_all')">UNION ALL (Fast / Keeps Dups)</button>
          <button class="sim-toggle-btn ${mode === 'union_distinct' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('topic_07_adv_joins_union', 'union_distinct')">UNION (Deduplicated)</button>
        </div>
      </div>

      <div class="sim-viewport">
        <div class="sim-result-box">
          <div class="sim-result-header">
            <span>Stacking Cities Vertically from 2 Queries</span>
          </div>
          <div style="padding: 18px 20px; font-size: 13px; line-height: 1.6;">
            ${mode === 'union_all' ? `
              <div><strong>UNION ALL Output:</strong> London, New York, Tokyo, London, New York (5 rows total - keeps duplicates without sorting).</div>
            ` : `
              <div><strong>UNION Output:</strong> London, New York, Tokyo (3 rows total - collapsed duplicate cities into unique list).</div>
            `}
          </div>
        </div>
      </div>
    `;
  }

  // --- 8. CASE WHEN SIMULATOR ---
  function renderCaseWhenSimulator() {
    const mode = state.simState.topic_08_case_when || 'tiers';

    return `
      <div class="sim-control-strip">
        <div class="sim-title-group">
          <span>🔀</span>
          <span>Interactive CASE WHEN Branching</span>
        </div>
      </div>

      <div class="sim-viewport">
        <div class="sim-result-box">
          <div class="sim-result-header">
            <span>Evaluating Salary Tiers: <code>CASE WHEN salary >= 120k THEN 'Executive' ... END</code></span>
          </div>
          <div class="course-sim-table-wrap">
            <table class="course-sim-data-table">
              <thead><tr><th>first_name</th><th>salary</th><th>tenure</th><th>Assigned Tier</th></tr></thead>
              <tbody>
                <tr class="highlight-match"><td>David</td><td>$125,000</td><td>36 mos</td><td><span class="sim-badge match">Executive</span></td></tr>
                <tr class="highlight-match"><td>Samantha</td><td>$145,000</td><td>48 mos</td><td><span class="sim-badge match">Executive</span></td></tr>
                <tr class="highlight-match"><td>Ashley</td><td>$115,000</td><td>14 mos</td><td><span class="sim-badge match">Mid-Tier</span></td></tr>
                <tr class="highlight-match"><td>Patrick</td><td>$62,000</td><td>6 mos</td><td><span class="sim-badge drop">Associate</span></td></tr>
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
          <span>Interactive Multi-Step CTE Pipeline</span>
        </div>
      </div>

      <div class="sim-viewport">
        <div class="sim-tables-row">
          <div class="sim-table-card">
            <div class="sim-table-title"><span>Step 1: WITH HighEarners AS (...)</span></div>
            <div style="padding: 10px 14px; font-size: 11.5px; font-family: monospace;">
              SELECT * FROM Employees WHERE salary > 100k;
            </div>
            <div style="padding: 10px 14px; font-size: 11.5px; color: var(--text-secondary);">
              Temporary table created in memory with 4 employees.
            </div>
          </div>
          <div class="sim-table-card">
            <div class="sim-table-title"><span>Step 2: Main Query Uses Step 1</span></div>
            <div style="padding: 10px 14px; font-size: 11.5px; font-family: monospace;">
              SELECT department, COUNT(*) FROM HighEarners GROUP BY department;
            </div>
            <div style="padding: 10px 14px; font-size: 11.5px; color: var(--text-secondary);">
              Clean final summary report without nested subquery confusion.
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // --- 10. WINDOW SIMULATOR ---
  function renderWindowSimulator() {
    const fn = state.simState.topic_10_window_functions || 'row_number';

    return `
      <div class="sim-control-strip">
        <div class="sim-title-group">
          <span>🪟</span>
          <span>Interactive Window Function Simulator (Keeps all rows intact!)</span>
        </div>
        <div class="sim-toggle-group">
          <button class="sim-toggle-btn ${fn === 'row_number' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('topic_10_window_functions', 'row_number')">ROW_NUMBER()</button>
          <button class="sim-toggle-btn ${fn === 'rank' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('topic_10_window_functions', 'rank')">RANK() (Skips)</button>
          <button class="sim-toggle-btn ${fn === 'dense_rank' ? 'active' : ''}" onclick="window.MasteryCourseEngine.setSimState('topic_10_window_functions', 'dense_rank')">DENSE_RANK() (No Skips)</button>
        </div>
      </div>

      <div class="sim-viewport">
        <div class="sim-result-box">
          <div class="sim-result-header">
            <span>Ranking Calculation: <code>${fn.toUpperCase()} OVER (PARTITION BY department ORDER BY salary DESC)</code></span>
          </div>
          <div class="course-sim-table-wrap">
            <table class="course-sim-data-table">
              <thead><tr><th>first_name</th><th>department</th><th>salary</th><th>Calculated Rank</th></tr></thead>
              <tbody>
                <tr class="highlight-match"><td>Samantha</td><td>Engineering</td><td>$145,000</td><td><strong>1</strong></td></tr>
                <tr class="highlight-match"><td>David</td><td>Engineering</td><td>$125,000</td><td><strong>2</strong></td></tr>
                <tr class="highlight-match"><td>Belvet</td><td>Analytics</td><td>$115,000 (Tie)</td><td><strong>1</strong></td></tr>
                <tr class="highlight-match"><td>Julia</td><td>Analytics</td><td>$115,000 (Tie)</td><td><strong>${fn === 'row_number' ? '2' : '1'}</strong></td></tr>
                <tr class="highlight-match"><td>Ashley</td><td>Analytics</td><td>$92,000</td><td><strong>${fn === 'row_number' ? '3' : (fn === 'rank' ? '3' : '2')}</strong></td></tr>
              </tbody>
            </table>
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

                <div class="mcq-feedback-banner ${hasAnswered ? 'show' : ''} ${selectedOpt === q.correct ? 'correct' : 'incorrect'}">
                  <div class="feedback-headline">
                    <span>${selectedOpt === q.correct ? '✅ Correct! Brilliant understanding.' : `❌ Option ${selectedOpt + 1} is a Common Trap!`}</span>
                  </div>
                  ${selectedOpt !== q.correct ? `
                    <div class="distractor-why">
                      <strong>⚠️ Why this answer catches candidates:</strong>
                      <p style="margin: 4px 0 0 0;">${(q.distractorExplanations && q.distractorExplanations[selectedOpt]) || 'This choice violates relational execution order.'}</p>
                    </div>
                    <div class="correct-answer-reveal">
                      <strong>💡 Correct Solution (Option ${q.correct + 1}):</strong>
                      <p style="margin: 4px 0 0 0;">${q.explanation}</p>
                    </div>
                  ` : `
                    <div class="verdict-details" style="margin: 0;">
                      ${q.explanation}
                    </div>
                  `}
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
    const userCode = state.problemInput[phase.id] !== undefined ? state.problemInput[phase.id] : prob.starterSql;
    const testVerdict = state.testResults[phase.id];

    let verdictHtml = '';
    if (testVerdict) {
      if (testVerdict.passed) {
        const rows = testVerdict.userRows || [];
        const cols = testVerdict.userCols || Object.keys(rows[0] || {});
        verdictHtml = `
          <div class="test-verdict-card passed">
            <div class="verdict-status-row">
              <span>🎉 Accepted! (All ${rows.length} rows matched expected output)</span>
            </div>
            <div class="verdict-details">${escapeHtml(testVerdict.message)}</div>
            <div class="course-sim-table-wrap" style="max-height: 220px; overflow-y: auto;">
              <table class="course-sim-data-table">
                <thead><tr>${cols.map(c => `<th>${escapeHtml(c)}</th>`).join('')}</tr></thead>
                <tbody>
                  ${rows.map(r => `
                    <tr class="highlight-match">
                      ${cols.map(c => `<td>${escapeHtml(String(r[c] !== undefined ? r[c] : ''))}</td>`).join('')}
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
      } else {
        const uRows = testVerdict.userRows || [];
        const eRows = testVerdict.expRows || [];
        const uCols = testVerdict.userCols || Object.keys(uRows[0] || {});
        const eCols = testVerdict.expCols || Object.keys(eRows[0] || {});

        verdictHtml = `
          <div class="test-verdict-card failed">
            <div class="verdict-status-row">
              <span>❌ Output Mismatch</span>
            </div>
            <div class="verdict-details">${escapeHtml(testVerdict.message)}</div>
            <div class="test-diff-grid">
              <div class="diff-table-card">
                <div class="diff-table-title">Your Query Output (${uRows.length} rows)</div>
                <div class="course-sim-table-wrap" style="max-height: 180px; overflow-y: auto;">
                  <table class="course-sim-data-table">
                    <thead><tr>${uCols.map(c => `<th>${escapeHtml(c)}</th>`).join('')}</tr></thead>
                    <tbody>
                      ${uRows.slice(0, 5).map(r => `
                        <tr>${uCols.map(c => `<td>${escapeHtml(String(r[c] !== undefined ? r[c] : ''))}</td>`).join('')}</tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="diff-table-card">
                <div class="diff-table-title">Expected Solution Output (${eRows.length} rows)</div>
                <div class="course-sim-table-wrap" style="max-height: 180px; overflow-y: auto;">
                  <table class="course-sim-data-table">
                    <thead><tr>${eCols.map(c => `<th>${escapeHtml(c)}</th>`).join('')}</tr></thead>
                    <tbody>
                      ${eRows.slice(0, 5).map(r => `
                        <tr class="highlight-match">${eCols.map(c => `<td>${escapeHtml(String(r[c] !== undefined ? r[c] : ''))}</td>`).join('')}</tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    }

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

          <!-- In-Place Interactive Query Verifier Engine -->
          <div class="problem-runner-wrap">
            <div class="problem-runner-header">
              <div class="problem-runner-title">
                <span>⚡ Interactive Query Verifier (Target Table: <code>${prob.targetTable}</code>)</span>
              </div>
              <span class="course-pill-tag">In-Memory SQL Engine</span>
            </div>

            <textarea id="courseProblemEditor" class="course-code-editor" spellcheck="false" placeholder="Write your SQL solution here..." oninput="window.MasteryCourseEngine.updateProblemInput('${phase.id}', this.value)">${escapeHtml(userCode)}</textarea>

            <div class="problem-action-strip">
              <button class="btn-verify-query" onclick="window.MasteryCourseEngine.verifyProblemSolution('${phase.id}')">
                <span>▶ Run &amp; Verify Solution</span>
              </button>
              <button class="phase-nav-btn" onclick="window.MasteryCourseEngine.solveInStudio(encodeURIComponent(document.getElementById('courseProblemEditor') ? document.getElementById('courseProblemEditor').value : '${encodeURIComponent(prob.starterSql)}'), '${prob.targetTable}')">
                <span>⚡ Open in Full Studio</span>
              </button>
              <button class="phase-nav-btn" onclick="window.MasteryCourseEngine.toggleSolution('${phase.id}')">
                <span>${isShowingSol ? 'Hide Expected Solution' : '👁️ View Solution'}</span>
              </button>
              <button class="phase-nav-btn" style="margin-left: auto;" onclick="window.MasteryCourseEngine.resetProblemCode('${phase.id}')">
                <span>🔄 Reset Starter</span>
              </button>
            </div>

            ${verdictHtml}
          </div>

          ${isShowingSol ? `
            <div style="margin-top: 14px; padding: 14px; background: var(--bg-card-subtle); border-radius: 8px; border: 1px solid var(--border-default);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 12px; font-weight: 800; color: var(--accent);">Expected Solution SQL:</span>
                <button class="code-btn-copy" onclick="window.MasteryCourseEngine.copyCode(this, '${encodeURIComponent(prob.expectedSolutionSql || prob.starterSql)}')">
                  <span>📋 Copy Solution</span>
                </button>
              </div>
              <pre class="problem-starter-code" style="background: var(--bg-surface);">${escapeHtml(prob.expectedSolutionSql || prob.starterSql)}</pre>
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
          localStorage.setItem('sql_foundry_learning_order_v1', JSON.stringify(Array.from(state.completedPhases)));
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

    if (typeof window !== 'undefined' && typeof window.removeEventListener === 'function') {
      window.removeEventListener('keydown', window.__courseKeydownHandler);
      window.__courseKeydownHandler = handleKeydown;
      window.addEventListener('keydown', handleKeydown);
    }
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

  function setDiagramStep(step) {
    state.diagramStep = step;
    init();
  }

  function copyCode(btn, encodedText) {
    const text = decodeURIComponent(encodedText);
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showCopied(btn);
      }).catch(() => {
        fallbackCopy(btn, text);
      });
    } else {
      fallbackCopy(btn, text);
    }
  }

  function fallbackCopy(btn, text) {
    if (typeof document === 'undefined' || !document.body) {
      showCopied(btn);
      return;
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showCopied(btn);
    } catch (e) {
      console.warn('Copy failed', e);
    }
    document.body.removeChild(ta);
  }

  function showCopied(btn) {
    if (!btn) return;
    const origHtml = btn.innerHTML;
    btn.innerHTML = '<span>✓ Copied!</span>';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.innerHTML = origHtml;
      btn.classList.remove('copied');
    }, 2000);
  }

  function escapeHtml(str) {
    return (str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

    function formatTheoryMarkdown(text) {
    if (!text) return '';
    let html = text;

    // Callout blocks
    html = html.replace(/>\s*\[!TIP\]\s*([^\n]+)\n([\s\S]*?)(?=(?:\n\s*>|\n\n|$))/gi, (m, title, body) => {
      const cleanBody = body.replace(/^>\s*/gm, '').trim();
      return `<div class="theory-callout tip"><div class="callout-header"><span>💡</span> <span>${escapeHtml(title || 'Pro Tip')}</span></div><p>${cleanBody}</p></div>`;
    });
    html = html.replace(/>\s*\[!WARNING\]\s*([^\n]+)\n([\s\S]*?)(?=(?:\n\s*>|\n\n|$))/gi, (m, title, body) => {
      const cleanBody = body.replace(/^>\s*/gm, '').trim();
      return `<div class="theory-callout warning"><div class="callout-header"><span>⚠️</span> <span>${escapeHtml(title || 'Common Trap')}</span></div><p>${cleanBody}</p></div>`;
    });
    html = html.replace(/>\s*\[!NOTE\]\s*([^\n]+)\n([\s\S]*?)(?=(?:\n\s*>|\n\n|$))/gi, (m, title, body) => {
      const cleanBody = body.replace(/^>\s*/gm, '').trim();
      return `<div class="theory-callout note"><div class="callout-header"><span>📌</span> <span>${escapeHtml(title || 'Mental Model')}</span></div><p>${cleanBody}</p></div>`;
    });
    html = html.replace(/>\s*\[!IMPORTANT\]\s*([^\n]+)\n([\s\S]*?)(?=(?:\n\s*>|\n\n|$))/gi, (m, title, body) => {
      const cleanBody = body.replace(/^>\s*/gm, '').trim();
      return `<div class="theory-callout important"><div class="callout-header"><span>⚡</span> <span>${escapeHtml(title || 'Optimizer Note')}</span></div><p>${cleanBody}</p></div>`;
    });
    html = html.replace(/>\s*\[!RULE\]\s*([^\n]+)\n([\s\S]*?)(?=(?:\n\s*>|\n\n|$))/gi, (m, title, body) => {
      const cleanBody = body.replace(/^>\s*/gm, '').trim();
      return `<div class="theory-callout rule"><div class="callout-header"><span>💼</span> <span>${escapeHtml(title || 'Production Rule of Thumb')}</span></div><p>${cleanBody}</p></div>`;
    });

    html = html
      .replace(/```sql([\s\S]*?)```/g, '<pre class="theory-code-snippet">$1</pre>')
      .replace(/`([^\`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n- /g, '<br>&bull; ');

    return html;
  }


  function updateProblemInput(phaseId, value) {
    state.problemInput[phaseId] = value;
  }

  function resetProblemCode(phaseId) {
    const phase = getPhase(phaseId);
    if (phase && phase.problem) {
      state.problemInput[phaseId] = phase.problem.starterSql;
      delete state.testResults[phaseId];
      init();
    }
  }

  function executeQuerySafe(sql, targetTable) {
    try {
      if (typeof window.parseAndBuildPipeline === 'function') {
        window.parseAndBuildPipeline(sql);
        const steps = window.EngineState && (window.EngineState.steps || window.EngineState.pipelineSteps);
        if (steps && steps.length > 0) {
          const lastStep = steps[steps.length - 1];
          return {
            columns: lastStep.columns || Object.keys((lastStep.rows && lastStep.rows[0]) || {}),
            rows: (lastStep.rows || []).map(r => {
              const cleanRow = { ...r };
              delete cleanRow._passed;
              delete cleanRow._reason;
              return cleanRow;
            })
          };
        }
      }
      return { columns: ['result'], rows: [{ result: 'Executed' }] };
    } catch (err) {
      return { error: err.message || 'Execution error' };
    }
  }

  function verifyProblemSolution(phaseId) {
    const phase = getPhase(phaseId);
    const prob = phase.problem;
    const editor = document.getElementById('courseProblemEditor');
    const userSql = editor ? editor.value.trim() : (state.problemInput[phaseId] || prob.starterSql);
    state.problemInput[phaseId] = userSql;

    const expectedSql = prob.expectedSolutionSql || prob.starterSql;

    const userRes = executeQuerySafe(userSql, prob.targetTable);
    const expRes = executeQuerySafe(expectedSql, prob.targetTable);

    if (userRes.error) {
      state.testResults[phaseId] = {
        passed: false,
        error: userRes.error,
        message: 'SQL Syntax / Execution Error: ' + userRes.error
      };
      init();
      return;
    }

    const userRows = userRes.rows || [];
    const expRows = expRes.rows || [];
    const userCols = userRes.columns || [];
    const expCols = expRes.columns || [];

    const rowCountMatch = userRows.length === expRows.length;
    const norm = (arr) => arr.map(r => Object.values(r).join('|')).sort();
    const contentMatch = JSON.stringify(norm(userRows)) === JSON.stringify(norm(expRows));

    if (rowCountMatch && (contentMatch || userRows.length === 0)) {
      state.testResults[phaseId] = {
        passed: true,
        userRows,
        expRows,
        userCols,
        expCols,
        message: `Accepted! All ${userRows.length} rows matched expected relational output perfectly.`
      };
      state.completedPhases.add(phaseId);
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('sql_foundry_learning_order_v1', JSON.stringify(Array.from(state.completedPhases)));
        }
      } catch (e) {}
      if (window.soundFX && typeof window.soundFX.playPop === 'function') {
        window.soundFX.playPop();
      }
    } else {
      let mismatchMsg = `Row count mismatch: Your query returned ${userRows.length} rows, but expected solution returned ${expRows.length} rows.`;
      if (rowCountMatch && !contentMatch) {
        mismatchMsg = `Content mismatch: Returned ${userRows.length} rows, but row values or projected columns differ from expected solution.`;
      }
      state.testResults[phaseId] = {
        passed: false,
        userRows,
        expRows,
        userCols,
        expCols,
        message: mismatchMsg
      };
    }

    init();
  }

  return {
    init,
    getPhases: () => PHASES,
    selectPhase: (phaseId) => { state.activePhaseId = phaseId; init(); },
    setVisualMode: (mode) => { state.visualMode = mode; init(); },
    setDiagramStep,
    copyCode,
    setSimState,
    switchStep,
    handleOptionClick,
    toggleSolution,
    solveInStudio,
    updateProblemInput,
    resetProblemCode,
    verifyProblemSolution
  };

})();
