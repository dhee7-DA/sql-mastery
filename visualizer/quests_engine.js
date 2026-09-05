// =============================================================================
// DUOLINGO-STYLE INTERACTIVE SQL QUESTS & FILL-IN-THE-BLANKS ENGINE
// =============================================================================

window.QUESTS_DATA = [
  // ---------------------------------------------------------------------------
  // LEVEL 01: Fill-in-the-Blank: SELECT & FROM
  // ---------------------------------------------------------------------------
  {
    id: 1,
    title: 'Level 01: Basic Projection & Table Source',
    subtitle: 'Fill in the missing keywords to read employee names and salaries from disk.',
    type: 'fill_blank',
    category: 'Foundations',
    task: "Complete the query to retrieve the 'name' and 'salary' columns from the 'Employees' table.",
    template: [
      { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
      { text: ' name, salary\n', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
      { text: ' Employees;', isBlank: false }
    ],
    slots: {
      slot1: {
        correct: 'SELECT',
        options: ['SELECT', 'EXTRACT', 'GET', 'CHOOSE']
      },
      slot2: {
        correct: 'FROM',
        options: ['FROM', 'INTO', 'TABLE', 'SOURCE']
      }
    },
    explanation: "SELECT specifies the columns or expressions to project, while FROM tells the database engine which physical table to read into working memory."
  },

  // ---------------------------------------------------------------------------
  // LEVEL 02: Fill-in-the-Blank: Computed Expression & AS Alias
  // ---------------------------------------------------------------------------
  {
    id: 2,
    title: 'Level 02: Computed Columns & Aliasing',
    subtitle: 'Calculate a 10% annual bonus and assign it a clean column name.',
    type: 'fill_blank',
    category: 'Foundations',
    task: "Calculate 'salary * 0.10' and alias the resulting column as 'annual_bonus'.",
    template: [
      { text: 'SELECT name, salary,\n       salary * 0.10 ', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
      { text: ' annual_bonus\nFROM Employees;', isBlank: false }
    ],
    slots: {
      slot1: {
        correct: 'AS',
        options: ['AS', 'NAME', 'LABEL', 'INTO']
      }
    },
    explanation: "The AS keyword assigns a human-readable alias to a computed scalar expression so downstream applications know how to reference it."
  },

  // ---------------------------------------------------------------------------
  // LEVEL 03: Fill-in-the-Blank: WHERE Predicate Filter
  // ---------------------------------------------------------------------------
  {
    id: 3,
    title: 'Level 03: Row-Level Filtering with WHERE',
    subtitle: 'Filter raw rows before they reach the SELECT projection phase.',
    type: 'fill_blank',
    category: 'Filtering',
    task: "Filter the employees so only staff earning at least $75,000 are returned.",
    template: [
      { text: 'SELECT name, department, salary\nFROM Employees\n', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
      { text: ' salary ', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
      { text: ' 75000;', isBlank: false }
    ],
    slots: {
      slot1: {
        correct: 'WHERE',
        options: ['WHERE', 'HAVING', 'FILTER', 'WHEN']
      },
      slot2: {
        correct: '>=',
        options: ['>=', '==', 'IS', 'CONTAINS']
      }
    },
    explanation: "WHERE operates row-by-row on disk pages loaded by FROM. It evaluates conditions and only allows rows evaluating to TRUE to pass into memory."
  },

  // ---------------------------------------------------------------------------
  // LEVEL 04: Fill-in-the-Blank: Pattern Matching with LIKE
  // ---------------------------------------------------------------------------
  {
    id: 4,
    title: 'Level 04: Wildcard Pattern Matching with LIKE',
    subtitle: 'Find all employees whose names start with the capital letter A.',
    type: 'fill_blank',
    category: 'Operators',
    task: "Find all employees whose names begin with 'A' followed by any number of characters.",
    template: [
      { text: "SELECT name, department\nFROM Employees\nWHERE name ", isBlank: false },
      { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
      { text: " '", isBlank: false },
      { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
      { text: "';", isBlank: false }
    ],
    slots: {
      slot1: {
        correct: 'LIKE',
        options: ['LIKE', 'MATCHES', 'EQUALS', 'SIMILAR']
      },
      slot2: {
        correct: 'A%',
        options: ['A%', '%A', 'A_', '_A']
      }
    },
    explanation: "In ANSI SQL, LIKE paired with '%' matches zero or more characters. 'A%' matches 'Alice', 'Andrew', etc."
  },

  // ---------------------------------------------------------------------------
  // LEVEL 05: Fill-in-the-Blank: Range Filtering with BETWEEN
  // ---------------------------------------------------------------------------
  {
    id: 5,
    title: 'Level 05: Inclusive Range Matching with BETWEEN',
    subtitle: 'Filter salaries falling inside an inclusive monetary boundary.',
    type: 'fill_blank',
    category: 'Operators',
    task: "Select all employees whose salaries fall between $70,000 and $90,000 inclusive.",
    template: [
      { text: 'SELECT name, salary\nFROM Employees\nWHERE salary ', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
      { text: ' 70000 ', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
      { text: ' 90000;', isBlank: false }
    ],
    slots: {
      slot1: {
        correct: 'BETWEEN',
        options: ['BETWEEN', 'RANGE', 'IN', 'WITHIN']
      },
      slot2: {
        correct: 'AND',
        options: ['AND', 'TO', 'THROUGH', 'OR']
      }
    },
    explanation: "BETWEEN is always paired with AND and is inclusive on both boundaries: 70000 <= salary <= 90000."
  },

  // ---------------------------------------------------------------------------
  // LEVEL 06: Fill-in-the-Blank: Set Membership with IN
  // ---------------------------------------------------------------------------
  {
    id: 6,
    title: 'Level 06: Set Membership with IN',
    subtitle: 'Filter rows matching any value in a discrete target list.',
    type: 'fill_blank',
    category: 'Operators',
    task: "Select employees who work in either 'Engineering' or 'Sales'.",
    template: [
      { text: 'SELECT name, department\nFROM Employees\nWHERE department ', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
      { text: " ('Engineering', 'Sales');", isBlank: false }
    ],
    slots: {
      slot1: {
        correct: 'IN',
        options: ['IN', 'CONTAINS', 'HAS', 'OF']
      }
    },
    explanation: "The IN operator checks if a column's value exists inside a comma-separated list of constants, acting as shorthand for multiple OR conditions."
  },

  // ---------------------------------------------------------------------------
  // LEVEL 07: Fill-in-the-Blank: Deduplication with DISTINCT
  // ---------------------------------------------------------------------------
  {
    id: 7,
    title: 'Level 07: Deduplicating Rows with DISTINCT',
    subtitle: 'Collapse duplicate department tuples into a unique list.',
    type: 'fill_blank',
    category: 'Foundations',
    task: "Retrieve a list of all unique department names, removing any duplicate rows.",
    template: [
      { text: 'SELECT ', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
      { text: ' department\nFROM Employees;', isBlank: false }
    ],
    slots: {
      slot1: {
        correct: 'DISTINCT',
        options: ['DISTINCT', 'UNIQUE', 'ONLY', 'COLLAPSE']
      }
    },
    explanation: "DISTINCT applies to the entire projected row tuple and removes duplicates using an in-memory hash table or sort step."
  },

  // ---------------------------------------------------------------------------
  // LEVEL 08: Fill-in-the-Blank: Sorting & Tie-Breakers with ORDER BY
  // ---------------------------------------------------------------------------
  {
    id: 8,
    title: 'Level 08: Sorting & Deterministic Tie-Breakers',
    subtitle: 'Sort salaries from highest to lowest, breaking ties alphabetically by name.',
    type: 'fill_blank',
    category: 'Foundations',
    task: "Sort by salary in descending order, then by name in ascending order.",
    template: [
      { text: 'SELECT name, salary\nFROM Employees\n', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
      { text: ' salary ', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
      { text: ', name ', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
      { text: ';', isBlank: false }
    ],
    slots: {
      slot1: {
        correct: 'ORDER BY',
        options: ['ORDER BY', 'SORT BY', 'RANK BY', 'GROUP BY']
      },
      slot2: {
        correct: 'DESC',
        options: ['DESC', 'DOWN', 'HIGH', 'REVERSE']
      },
      slot3: {
        correct: 'ASC',
        options: ['ASC', 'UP', 'NORMAL', 'ALPHA']
      }
    },
    explanation: "ORDER BY executes near the end of the query lifecycle. DESC sorts largest to smallest; ASC sorts smallest to largest (and A-Z)."
  },

  // ---------------------------------------------------------------------------
  // LEVEL 09: Fill-in-the-Blank: Row Slicing with LIMIT
  // ---------------------------------------------------------------------------
  {
    id: 9,
    title: 'Level 09: Truncating Results with LIMIT',
    subtitle: 'Slice the surviving rows to return only the Top 3 highest earners.',
    type: 'fill_blank',
    category: 'Foundations',
    task: "Restrict the output to only return the top 3 rows.",
    template: [
      { text: 'SELECT name, salary\nFROM Employees\nORDER BY salary DESC\n', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
      { text: ' 3;', isBlank: false }
    ],
    slots: {
      slot1: {
        correct: 'LIMIT',
        options: ['LIMIT', 'TOP', 'CLIP', 'TAKE']
      }
    },
    explanation: "LIMIT is the very final step of execution. Once the rows are sorted, LIMIT clips the buffer and discards all remaining rows."
  },

  // ---------------------------------------------------------------------------
  // LEVEL 10: The Live Interactive Threshold Slider (Salary Tiering)
  // ---------------------------------------------------------------------------
  {
    id: 10,
    title: 'Level 10: The Interactive CASE WHEN Threshold Slider',
    subtitle: 'Move the slider to see how a CASE WHEN expression dynamically buckets rows live in memory!',
    type: 'slider',
    category: 'Conditional Logic',
    defaultThreshold: 80000,
    minSalary: 55000,
    maxSalary: 95000,
    step: 1000,
    highLabel: 'Senior',
    lowLabel: 'Standard',
    alias: 'salary_tier',
    hint: 'Notice how CASE computes a brand new column value on the fly without changing the original salary numbers!'
  },

  // ---------------------------------------------------------------------------
  // LEVEL 11: Fill-in-the-Blank: The Complete CASE WHEN Structure
  // ---------------------------------------------------------------------------
  {
    id: 11,
    title: 'Level 11: The Anatomy of CASE WHEN',
    subtitle: 'Complete all 5 control keywords of a conditional CASE block.',
    type: 'fill_blank',
    category: 'Conditional Logic',
    task: "Assemble the full conditional expression: CASE, WHEN, THEN, ELSE, and END.",
    template: [
      { text: 'SELECT name,\n       ', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
      { text: '\n         ', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
      { text: " salary >= 80000 ", isBlank: false },
      { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
      { text: " 'Executive'\n         ", isBlank: false },
      { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' },
      { text: " 'Associate'\n       ", isBlank: false },
      { text: '', isBlank: true, slotId: 'slot5', placeholder: '[ ___ ]' },
      { text: ' AS pay_grade\nFROM Employees;', isBlank: false }
    ],
    slots: {
      slot1: { correct: 'CASE', options: ['CASE', 'IF', 'SWITCH', 'EVAL'] },
      slot2: { correct: 'WHEN', options: ['WHEN', 'IF', 'CONDITION', 'WHERE'] },
      slot3: { correct: 'THEN', options: ['THEN', 'DO', 'RETURN', 'GOTO'] },
      slot4: { correct: 'ELSE', options: ['ELSE', 'DEFAULT', 'OTHERWISE', 'CATCH'] },
      slot5: { correct: 'END', options: ['END', 'FINISH', 'STOP', 'DONE'] }
    },
    explanation: "The 5 immutable pillars of a Searched CASE expression: CASE opens, WHEN tests condition, THEN returns value, ELSE catches unmatches, END closes the block."
  },

  // ---------------------------------------------------------------------------
  // LEVEL 12: Spot the Bug & Fix the Waterfall (The Triangle Trap)
  // ---------------------------------------------------------------------------
  {
    id: 12,
    title: 'Level 12: Spot the Waterfall Bug (The Triangle Trap)',
    subtitle: 'Why did row (20, 20, 40) fail its geometry test? Fix the branch ordering to pass!',
    type: 'spot_bug',
    category: 'Interview Puzzles',
    testRow: { A: 20, B: 20, C: 40 },
    buggyQuery: `SELECT CASE\n         WHEN A = B THEN 'Isosceles'            -- &cross; BUG: Matches first!\n         WHEN A + B <= C THEN 'Not A Triangle'  -- Unreachable!\n         ELSE 'Scalene'\n       END AS shape\nFROM TRIANGLES;`,
    fixedQuery: `SELECT CASE\n         WHEN A + B <= C THEN 'Not A Triangle'  -- &check; Correct: Checked first!\n         WHEN A = B THEN 'Isosceles'\n         ELSE 'Scalene'\n       END AS shape\nFROM TRIANGLES;`,
    bugExplanation: 'Because SQL evaluates CASE from top to bottom and short-circuits at the first TRUE condition, row (20, 20, 40) saw "20 = 20" (TRUE) and exited as Isosceles! But 20 + 20 = 40, which violates the triangle inequality theorem (sum of two sides must be strictly greater than the third). It is not a triangle at all!',
    fixedExplanation: 'Perfect! By moving "WHEN A + B <= C" to the top of the waterfall, the invalid shape is caught and rejected immediately before the equality test can ever fire.'
  },

  // ---------------------------------------------------------------------------
  // LEVEL 13: The Big 5 Aggregate Functions
  // ---------------------------------------------------------------------------
  {
    id: 13,
    title: 'Level 13: The Big 5 Aggregations',
    subtitle: 'Compute the total headcount, sum of payroll, and average salary across all records.',
    type: 'fill_blank',
    category: 'Pillar 2: Aggregations',
    codeTemplate: [
      { text: 'SELECT ', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
      { text: '(*) AS total_staff,\n       ', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
      { text: '(salary) AS total_payroll,\n       ', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
      { text: '(salary) AS avg_salary\nFROM Employees;', isBlank: false }
    ],
    slots: {
      slot1: { correct: 'COUNT', options: ['COUNT', 'TOTAL', 'NUM', 'ROWS'] },
      slot2: { correct: 'SUM', options: ['SUM', 'ADD', 'PLUS', 'ACCUM'] },
      slot3: { correct: 'AVG', options: ['AVG', 'MEAN', 'AVERAGE', 'MEDIAN'] }
    },
    explanation: "COUNT(*) counts rows, SUM(salary) computes arithmetic total, and AVG(salary) calculates mean value across non-NULL records."
  },

  // ---------------------------------------------------------------------------
  // LEVEL 14: The NULL Trap: COUNT(*) vs COUNT(column)
  // ---------------------------------------------------------------------------
  {
    id: 14,
    title: 'Level 14: The NULL Trap (COUNT vs COUNT DISTINCT)',
    subtitle: 'Count unique department names while skipping duplicates.',
    type: 'fill_blank',
    category: 'Pillar 2: Aggregations',
    codeTemplate: [
      { text: 'SELECT COUNT(', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
      { text: ' department) AS distinct_dept_count,\n       COUNT(', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
      { text: ') AS all_rows\nFROM Employees;', isBlank: false }
    ],
    slots: {
      slot1: { correct: 'DISTINCT', options: ['DISTINCT', 'UNIQUE', 'DIFFERENT', 'SET'] },
      slot2: { correct: '*', options: ['*', 'ALL', '1', 'ROWS'] }
    },
    explanation: "COUNT(DISTINCT column) deduplicates values before counting, while COUNT(*) counts every single row in the table including NULLs."
  },

  // ---------------------------------------------------------------------------
  // LEVEL 15: The GROUP BY Bucket Sorter
  // ---------------------------------------------------------------------------
  {
    id: 15,
    title: 'Level 15: The GROUP BY Bucket Sorter',
    subtitle: 'Partition rows into department buckets and calculate average salary per team.',
    type: 'fill_blank',
    category: 'Pillar 2: Aggregations',
    codeTemplate: [
      { text: 'SELECT department, AVG(salary) AS avg_pay\nFROM Employees\n', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
      { text: ' ', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
      { text: ' department;', isBlank: false }
    ],
    slots: {
      slot1: { correct: 'GROUP', options: ['GROUP', 'PARTITION', 'ORDER', 'CLUSTER'] },
      slot2: { correct: 'BY', options: ['BY', 'ON', 'OVER', 'WITH'] }
    },
    explanation: "GROUP BY partitions data into independent summary buckets, allowing aggregate functions to compute separately within each department."
  },

  // ---------------------------------------------------------------------------
  // LEVEL 16: The WHERE vs HAVING Gateway
  // ---------------------------------------------------------------------------
  {
    id: 16,
    title: 'Level 16: The WHERE vs HAVING Gateway',
    subtitle: 'Filter individual salaries first with WHERE, then filter departmental aggregates with HAVING.',
    type: 'fill_blank',
    category: 'Pillar 2: Aggregations',
    codeTemplate: [
      { text: 'SELECT department, COUNT(*) AS team_size\nFROM Employees\n', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
      { text: ' salary >= 60000\nGROUP BY department\n', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
      { text: ' COUNT(*) >= 2;', isBlank: false }
    ],
    slots: {
      slot1: { correct: 'WHERE', options: ['WHERE', 'HAVING', 'FILTER', 'WHEN'] },
      slot2: { correct: 'HAVING', options: ['HAVING', 'WHERE', 'AND', 'FILTER'] }
    },
    explanation: "WHERE filters raw individual records BEFORE grouping. HAVING filters summary buckets AFTER aggregation has computed."
  },

  // ---------------------------------------------------------------------------
  // LEVEL 17: INNER JOIN (The Key Intersection)
  // ---------------------------------------------------------------------------
  {
    id: 17,
    title: 'Level 17: INNER JOIN Relational Bridge',
    subtitle: 'Bridge Employees to Departments using the primary and foreign key match.',
    type: 'fill_blank',
    category: 'Pillar 3: Relational JOINs',
    codeTemplate: [
      { text: 'SELECT e.name, d.dept_name\nFROM Employees AS e\n', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
      { text: ' Departments AS d\n  ', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
      { text: ' e.dept_id = d.dept_id;', isBlank: false }
    ],
    slots: {
      slot1: { correct: 'INNER JOIN', options: ['INNER JOIN', 'LEFT JOIN', 'CROSS JOIN', 'UNION'] },
      slot2: { correct: 'ON', options: ['ON', 'WHERE', 'USING', 'WITH'] }
    },
    explanation: "INNER JOIN connects records that satisfy the ON predicate on both sides, excluding unassigned rows."
  },

  // ---------------------------------------------------------------------------
  // LEVEL 18: The Anti-Join (Isolating Orphaned Records)
  // ---------------------------------------------------------------------------
  {
    id: 18,
    title: 'Level 18: The Anti-Join (Orphan Hunter)',
    subtitle: 'Find all employees who have NOT been assigned to any department.',
    type: 'fill_blank',
    category: 'Pillar 3: Relational JOINs',
    codeTemplate: [
      { text: 'SELECT e.emp_id, e.name\nFROM Employees AS e\n', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
      { text: ' Departments AS d\n  ON e.dept_id = d.dept_id\nWHERE d.dept_id ', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
      { text: ';', isBlank: false }
    ],
    slots: {
      slot1: { correct: 'LEFT JOIN', options: ['LEFT JOIN', 'INNER JOIN', 'RIGHT JOIN', 'CROSS JOIN'] },
      slot2: { correct: 'IS NULL', options: ['IS NULL', '= NULL', 'IS NOT NULL', '!= 0'] }
    },
    explanation: "An Anti-Join combines LEFT JOIN with WHERE right_table.id IS NULL to isolate orphaned records with zero matches."
  },

  // ---------------------------------------------------------------------------
  // LEVEL 19: The Self-Join (Manager Hierarchy Tree)
  // ---------------------------------------------------------------------------
  {
    id: 19,
    title: 'Level 19: The Self-Join (Org Chart Tree)',
    subtitle: 'Join Employees table to itself to match each worker with their direct manager.',
    type: 'fill_blank',
    category: 'Pillar 3: Relational JOINs',
    codeTemplate: [
      { text: 'SELECT emp.name AS employee,\n       mgr.name AS manager\nFROM Employees AS emp\nLEFT JOIN ', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
      { text: ' AS mgr\n  ON emp.', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
      { text: ' = mgr.emp_id;', isBlank: false }
    ],
    slots: {
      slot1: { correct: 'Employees', options: ['Employees', 'Managers', 'Staff', 'OrgChart'] },
      slot2: { correct: 'manager_id', options: ['manager_id', 'emp_id', 'dept_id', 'role_id'] }
    },
    explanation: "A Self-Join pairs a table with itself using distinct aliases (emp vs mgr) to resolve hierarchical relationships."
  },

  // ---------------------------------------------------------------------------
  // LEVEL 20: The ON vs WHERE Outer Join Filter Trap
  // ---------------------------------------------------------------------------
  {
    id: 20,
    title: 'Level 20: The Outer Join Filter Trap (ON vs WHERE)',
    subtitle: 'Filter department location during join without dropping unassigned employees!',
    type: 'fill_blank',
    category: 'Pillar 3: Relational JOINs',
    codeTemplate: [
      { text: 'SELECT e.name, d.location\nFROM Employees AS e\nLEFT JOIN Departments AS d\n  ', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
      { text: ' e.dept_id = d.dept_id\n  ', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
      { text: " d.location = 'San Francisco';", isBlank: false }
    ],
    slots: {
      slot1: { correct: 'ON', options: ['ON', 'WHERE', 'HAVING', 'USING'] },
      slot2: { correct: 'AND', options: ['AND', 'WHERE', 'OR', 'THEN'] }
    },
    explanation: "Filtering right-table attributes in the ON clause preserves all left-table rows with NULLs. Putting it in WHERE silently turns the query into an INNER JOIN!"
  },

  // ---------------------------------------------------------------------------
  // LEVEL 21: The Statistical Spread (MAX & MIN Range)
  // ---------------------------------------------------------------------------
  {
    id: 21,
    title: 'Level 21: The Statistical Spread (MAX - MIN Range)',
    subtitle: 'Calculate the salary compensation spread between the top earner and entry level.',
    type: 'fill_blank',
    category: 'Pillar 2: Aggregations',
    codeTemplate: [
      { text: 'SELECT department,\n       ', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
      { text: '(salary) - ', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
      { text: '(salary) AS salary_spread\nFROM Employees\nGROUP BY department;', isBlank: false }
    ],
    slots: {
      slot1: { correct: 'MAX', options: ['MAX', 'PEAK', 'HIGH', 'TOP'] },
      slot2: { correct: 'MIN', options: ['MIN', 'BASE', 'LOW', 'BOTTOM'] }
    },
    explanation: "Subtracting MIN(salary) from MAX(salary) directly computes the statistical range of compensation within each department."
  },

  // ---------------------------------------------------------------------------
  // LEVEL 22: The NULL Trap: COUNT(*) vs COUNT(column)
  // ---------------------------------------------------------------------------
  {
    id: 22,
    title: 'Level 22: The NULL Trap (COUNT(*) vs COUNT(col))',
    subtitle: 'Verify that COUNT(bonus) skips unassigned bonuses while COUNT(*) tallies all staff.',
    type: 'fill_blank',
    category: 'Pillar 2: Aggregations',
    codeTemplate: [
      { text: 'SELECT department,\n       COUNT(', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
      { text: ') AS total_staff,\n       COUNT(', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
      { text: ') AS bonus_recipients\nFROM Employees\nGROUP BY department;', isBlank: false }
    ],
    slots: {
      slot1: { correct: '*', options: ['*', 'ALL', '1', 'name'] },
      slot2: { correct: 'bonus', options: ['bonus', '*', '1', 'salary'] }
    },
    explanation: "COUNT(*) counts every physical row in the partition, while COUNT(bonus) strictly tallies employees who have a non-NULL bonus value."
  },

  // ---------------------------------------------------------------------------
  // LEVEL 23: Multi-Dimensional GROUP BY (Dept & Location)
  // ---------------------------------------------------------------------------
  {
    id: 23,
    title: 'Level 23: Multi-Dimensional GROUP BY',
    subtitle: 'Group headcount across both department and office location simultaneously.',
    type: 'fill_blank',
    category: 'Pillar 2: Aggregations',
    codeTemplate: [
      { text: 'SELECT department, office_location,\n       COUNT(*) AS office_headcount,\n       ROUND(AVG(salary), 2) AS avg_location_pay\nFROM Employees\n', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
      { text: ' ', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
      { text: ' department, office_location\nORDER BY office_headcount DESC;', isBlank: false }
    ],
    slots: {
      slot1: { correct: 'GROUP', options: ['GROUP', 'PARTITION', 'ORDER', 'CLUSTER'] },
      slot2: { correct: 'BY', options: ['BY', 'ON', 'OVER', 'WITH'] }
    },
    explanation: "Grouping by multiple columns partitions data into composite buckets, calculating metrics for every unique combination of (department, office_location)."
  },

  // ---------------------------------------------------------------------------
  // LEVEL 24: Spot the Bug (The ONLY_FULL_GROUP_BY Trap)
  // ---------------------------------------------------------------------------
  {
    id: 24,
    title: 'Level 24: Spot the Bug (ONLY_FULL_GROUP_BY)',
    subtitle: 'Fix the non-aggregated column in the projection list that causes database syntax failure!',
    type: 'spot_bug',
    category: 'Interview Puzzles',
    testRow: { department: 'Engineering', name: 'Alice', salary: 95000 },
    buggyQuery: `SELECT department, name, AVG(salary) AS avg_sal\nFROM Employees\nGROUP BY department;`,
    fixedQuery: `SELECT department, AVG(salary) AS avg_sal\nFROM Employees\nGROUP BY department;`,
    bugExplanation: 'Column "name" is neither wrapped in an aggregate function nor included in the GROUP BY clause. In standard SQL (ONLY_FULL_GROUP_BY), this causes an error because multiple names exist per department and the engine cannot guess which one to return.',
    fixedExplanation: 'Excellent! By removing the unaggregated "name" column from the projection, the query cleanly returns one summary row per department.'
  },

  // ---------------------------------------------------------------------------
  // LEVEL 25: Conditional Aggregation (Pivoting with CASE)
  // ---------------------------------------------------------------------------
  {
    id: 25,
    title: 'Level 25: Conditional Aggregation (Pivoting with CASE)',
    subtitle: 'Count high-earning seniors earning >= $90,000 using conditional SUM.',
    type: 'fill_blank',
    category: 'Pillar 2: Aggregations',
    codeTemplate: [
      { text: 'SELECT department,\n       ', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
      { text: '(CASE WHEN salary >= 90000 THEN ', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
      { text: ' ELSE 0 END) AS high_earners_count\nFROM Employees\nGROUP BY department;', isBlank: false }
    ],
    slots: {
      slot1: { correct: 'SUM', options: ['SUM', 'COUNT', 'AVG', 'TOTAL'] },
      slot2: { correct: '1', options: ['1', 'salary', 'TRUE', '100'] }
    },
    explanation: "Summing 1 when the condition matches and 0 otherwise is the universal SQL pattern for conditional frequency counting."
  },

  // ---------------------------------------------------------------------------
  // LEVEL 26: Compound HAVING Gatekeeper
  // ---------------------------------------------------------------------------
  {
    id: 26,
    title: 'Level 26: Compound HAVING Gatekeeper',
    subtitle: 'Filter for departments that have both at least 2 staff AND an average salary above $75,000.',
    type: 'fill_blank',
    category: 'Pillar 2: Aggregations',
    codeTemplate: [
      { text: 'SELECT department, COUNT(*) AS headcount, AVG(salary) AS avg_pay\nFROM Employees\nGROUP BY department\n', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
      { text: ' COUNT(*) >= 2\n  ', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
      { text: ' AVG(salary) > 75000;', isBlank: false }
    ],
    slots: {
      slot1: { correct: 'HAVING', options: ['HAVING', 'WHERE', 'WHEN', 'FILTER'] },
      slot2: { correct: 'AND', options: ['AND', 'OR', 'THEN', 'WITH'] }
    },
    explanation: "HAVING supports boolean operators (AND, OR) to filter aggregated groups across multiple statistical thresholds simultaneously."
  }
];
