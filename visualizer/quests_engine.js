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
  }
];
