// =============================================================================
// SQL FOUNDRY — INTERACTIVE VENN & EULER DIAGRAM MATRIX
// Advanced Live-Row Relational Physics, 3-Table Euler, Split Cockpit & Dialects
// =============================================================================

(function () {
  'use strict';

  // --- DATASETS ---
  const DATASETS = {
    joins: {
      title: '2-Table Relational Joins',
      leftTable: {
        name: 'Employees',
        alias: 'e',
        key: 'dept_id',
        columns: ['emp_id', 'name', 'dept_id', 'salary'],
        rows: [
          { emp_id: 1, name: 'Alice Chen', dept_id: 10, salary: '$95,000' },
          { emp_id: 2, name: 'Bob Smith', dept_id: 20, salary: '$78,000' },
          { emp_id: 3, name: 'Charlie Kim', dept_id: 10, salary: '$110,000' },
          { emp_id: 4, name: 'Diana Ross', dept_id: 30, salary: '$82,000' },
          { emp_id: 5, name: 'Evan Vance', dept_id: null, salary: '$65,000' } // Orphan employee (dept_id IS NULL)
        ]
      },
      rightTable: {
        name: 'Departments',
        alias: 'd',
        key: 'dept_id',
        columns: ['dept_id', 'dept_name', 'location'],
        rows: [
          { dept_id: 10, dept_name: 'Engineering', location: 'San Francisco' },
          { dept_id: 20, dept_name: 'Marketing', location: 'New York' },
          { dept_id: 30, dept_name: 'Sales', location: 'Austin' },
          { dept_id: 40, dept_name: 'Research', location: 'Boston' } // Orphan department (no matching employees)
        ]
      },
      operations: [
        {
          id: 'inner_join',
          name: 'INNER JOIN',
          symbol: 'A ∩ B',
          tag: 'Intersection',
          activeZones: ['overlap'],
          sqlByDialect: {
            mysql: `SELECT e.emp_id, e.name, d.dept_name, d.location\nFROM Employees AS e\nINNER JOIN Departments AS d\n  ON e.dept_id = d.dept_id;`,
            postgres: `SELECT e.emp_id, e.name, d.dept_name, d.location\nFROM Employees AS e\nINNER JOIN Departments AS d\n  ON e.dept_id = d.dept_id;`,
            oracle: `SELECT e.emp_id, e.name, d.dept_name, d.location\nFROM Employees e\nINNER JOIN Departments d\n  ON e.dept_id = d.dept_id;`,
            sqlserver: `SELECT e.emp_id, e.name, d.dept_name, d.location\nFROM Employees AS e\nINNER JOIN Departments AS d\n  ON e.dept_id = d.dept_id;`
          },
          tagline: 'Matches only where keys exist on BOTH sides',
          explanation: 'Only rows with a valid relational match across both tables survive. Unmatched rows (Evan with NULL dept, and Research with 0 employees) are silently dropped.',
          gotcha: 'NULL never matches NULL in SQL! If dept_id is NULL on both tables, INNER JOIN drops them because NULL = NULL yields UNKNOWN, not TRUE.',
          quickDrill: {
            question: 'Why is Evan Vance (#5) dropped from this result set?',
            options: [
              { id: 'A', text: 'His salary is below the department threshold', isCorrect: false },
              { id: 'B', text: 'His dept_id is NULL, so e.dept_id = d.dept_id evaluates to UNKNOWN', isCorrect: true },
              { id: 'C', text: 'Departments table has no primary key index', isCorrect: false }
            ],
            explanation: 'In 3-valued SQL logic, NULL = 10 (or NULL = NULL) is UNKNOWN, not TRUE. INNER JOIN only retains rows where the predicate is strictly TRUE.'
          },
          outputGenerator: (eRows, dRows) => {
            const out = [];
            eRows.forEach(e => {
              if (e.dept_id !== null) {
                const match = dRows.find(d => d.dept_id === e.dept_id);
                if (match) {
                  out.push({
                    status: 'matched',
                    emp_id: e.emp_id,
                    name: e.name,
                    dept_id: e.dept_id,
                    dept_name: match.dept_name,
                    location: match.location
                  });
                }
              }
            });
            return out;
          }
        },
        {
          id: 'left_join',
          name: 'LEFT JOIN',
          symbol: 'A + (A ∩ B)',
          tag: 'Preserve Left',
          activeZones: ['left', 'overlap'],
          sqlByDialect: {
            mysql: `SELECT e.emp_id, e.name, d.dept_name, d.location\nFROM Employees AS e\nLEFT JOIN Departments AS d\n  ON e.dept_id = d.dept_id;`,
            postgres: `SELECT e.emp_id, e.name, d.dept_name, d.location\nFROM Employees AS e\nLEFT JOIN Departments AS d\n  ON e.dept_id = d.dept_id;`,
            oracle: `-- Modern ANSI SQL:\nSELECT e.emp_id, e.name, d.dept_name, d.location\nFROM Employees e\nLEFT JOIN Departments d\n  ON e.dept_id = d.dept_id;\n\n-- Legacy Oracle (+):\nSELECT e.emp_id, e.name, d.dept_name, d.location\nFROM Employees e, Departments d\nWHERE e.dept_id = d.dept_id(+);`,
            sqlserver: `SELECT e.emp_id, e.name, d.dept_name, d.location\nFROM Employees AS e\nLEFT OUTER JOIN Departments AS d\n  ON e.dept_id = d.dept_id;`
          },
          tagline: 'Preserves EVERY row from Left; pads missing Right with NULL',
          explanation: 'All 5 employees are guaranteed in output. Alice, Bob, Charlie, and Diana receive department metadata. Evan has no department, so his department columns are safely padded with NULL.',
          gotcha: 'Filtering Table B in WHERE turns a LEFT JOIN into an INNER JOIN! If you write WHERE d.location = \'San Francisco\', Evan is dropped because NULL = \'SF\' is FALSE. Put filters in the ON clause instead!',
          quickDrill: {
            question: 'What happens if you add "WHERE d.location = \'Austin\'" to this query?',
            options: [
              { id: 'A', text: 'Evan Vance remains in the output with NULLs', isCorrect: false },
              { id: 'B', text: 'The query silently converts into an INNER JOIN, dropping Evan', isCorrect: true },
              { id: 'C', text: 'A syntax error occurs because WHERE cannot follow LEFT JOIN', isCorrect: false }
            ],
            explanation: 'Because Evan has d.location = NULL, the WHERE clause evaluates NULL = \'Austin\' to FALSE/UNKNOWN, silently eliminating him!'
          },
          outputGenerator: (eRows, dRows) => {
            const out = [];
            eRows.forEach(e => {
              const match = e.dept_id !== null ? dRows.find(d => d.dept_id === e.dept_id) : null;
              if (match) {
                out.push({
                  status: 'matched',
                  emp_id: e.emp_id,
                  name: e.name,
                  dept_id: e.dept_id,
                  dept_name: match.dept_name,
                  location: match.location
                });
              } else {
                out.push({
                  status: 'null_padded',
                  emp_id: e.emp_id,
                  name: e.name,
                  dept_id: null,
                  dept_name: null,
                  location: null
                });
              }
            });
            return out;
          }
        },
        {
          id: 'right_join',
          name: 'RIGHT JOIN',
          symbol: '(A ∩ B) + B',
          tag: 'Preserve Right',
          activeZones: ['overlap', 'right'],
          sqlByDialect: {
            mysql: `SELECT e.emp_id, e.name, d.dept_name, d.location\nFROM Employees AS e\nRIGHT JOIN Departments AS d\n  ON e.dept_id = d.dept_id;`,
            postgres: `SELECT e.emp_id, e.name, d.dept_name, d.location\nFROM Employees AS e\nRIGHT JOIN Departments AS d\n  ON e.dept_id = d.dept_id;`,
            oracle: `SELECT e.emp_id, e.name, d.dept_name, d.location\nFROM Employees e\nRIGHT JOIN Departments d\n  ON e.dept_id = d.dept_id;`,
            sqlserver: `SELECT e.emp_id, e.name, d.dept_name, d.location\nFROM Employees AS e\nRIGHT OUTER JOIN Departments AS d\n  ON e.dept_id = d.dept_id;`
          },
          tagline: 'Preserves EVERY row from Right; pads missing Left with NULL',
          explanation: 'All 4 departments are guaranteed in output. Engineering, Marketing, and Sales receive employee records. Research has 0 employees, so its employee columns are padded with NULL.',
          gotcha: 'RIGHT JOINs are rarely used in corporate SQL style guides because humans read left-to-right. Best practice: swap table order and write as LEFT JOIN for cleaner maintainability.',
          quickDrill: {
            question: 'Why does Research (#40) show NULL for emp_id and name?',
            options: [
              { id: 'A', text: 'Research was dropped by the optimizer', isCorrect: false },
              { id: 'B', text: 'Zero employees have dept_id = 40, so missing Table A columns are padded with NULL', isCorrect: true },
              { id: 'C', text: 'RIGHT JOIN deletes unreferenced records', isCorrect: false }
            ],
            explanation: 'RIGHT JOIN guarantees all rows of Table B survive. Missing matches from Table A are filled with relational NULLs.'
          },
          outputGenerator: (eRows, dRows) => {
            const out = [];
            dRows.forEach(d => {
              const matches = eRows.filter(e => e.dept_id === d.dept_id);
              if (matches.length > 0) {
                matches.forEach(e => {
                  out.push({
                    status: 'matched',
                    emp_id: e.emp_id,
                    name: e.name,
                    dept_id: d.dept_id,
                    dept_name: d.dept_name,
                    location: d.location
                  });
                });
              } else {
                out.push({
                  status: 'null_padded',
                  emp_id: null,
                  name: null,
                  dept_id: d.dept_id,
                  dept_name: d.dept_name,
                  location: d.location
                });
              }
            });
            return out;
          }
        },
        {
          id: 'full_outer_join',
          name: 'FULL OUTER JOIN',
          symbol: 'A ∪ B',
          tag: 'Preserve Both',
          activeZones: ['left', 'overlap', 'right'],
          sqlByDialect: {
            mysql: `-- MySQL lacks native FULL OUTER JOIN syntax.\n-- Emulated via LEFT JOIN + UNION + RIGHT JOIN:\nSELECT e.emp_id, e.name, d.dept_name, d.location\nFROM Employees e LEFT JOIN Departments d ON e.dept_id = d.dept_id\nUNION\nSELECT e.emp_id, e.name, d.dept_name, d.location\nFROM Employees e RIGHT JOIN Departments d ON e.dept_id = d.dept_id;`,
            postgres: `SELECT e.emp_id, e.name, d.dept_name, d.location\nFROM Employees AS e\nFULL OUTER JOIN Departments AS d\n  ON e.dept_id = d.dept_id;`,
            oracle: `SELECT e.emp_id, e.name, d.dept_name, d.location\nFROM Employees e\nFULL OUTER JOIN Departments d\n  ON e.dept_id = d.dept_id;`,
            sqlserver: `SELECT e.emp_id, e.name, d.dept_name, d.location\nFROM Employees AS e\nFULL OUTER JOIN Departments AS d\n  ON e.dept_id = d.dept_id;`
          },
          tagline: 'Preserves every row from BOTH sides with NULL-padding',
          explanation: 'Combines the output of LEFT JOIN and RIGHT JOIN. Alice, Bob, Charlie, Diana match normally. Evan appears with NULL dept info. Research appears with NULL employee info. Total 6 rows.',
          gotcha: 'MySQL natively lacks FULL OUTER JOIN syntax! In MySQL, you emulate it by taking a LEFT JOIN, a RIGHT JOIN, and combining them with UNION (which deduplicates the intersection).',
          quickDrill: {
            question: 'How do you execute a FULL OUTER JOIN in MySQL 8.0?',
            options: [
              { id: 'A', text: 'Write FULL JOIN directly', isCorrect: false },
              { id: 'B', text: 'Combine a LEFT JOIN and a RIGHT JOIN using UNION', isCorrect: true },
              { id: 'C', text: 'MySQL does not support any outer joins', isCorrect: false }
            ],
            explanation: 'MySQL throws a syntax error on FULL OUTER JOIN. Enterprise MySQL code combines LEFT JOIN and RIGHT JOIN via UNION.'
          },
          outputGenerator: (eRows, dRows) => {
            const out = [];
            eRows.forEach(e => {
              const match = e.dept_id !== null ? dRows.find(d => d.dept_id === e.dept_id) : null;
              if (match) {
                out.push({
                  status: 'matched',
                  emp_id: e.emp_id,
                  name: e.name,
                  dept_id: e.dept_id,
                  dept_name: match.dept_name,
                  location: match.location
                });
              } else {
                out.push({
                  status: 'null_padded',
                  emp_id: e.emp_id,
                  name: e.name,
                  dept_id: null,
                  dept_name: null,
                  location: null
                });
              }
            });
            dRows.forEach(d => {
              const hasMatch = eRows.some(e => e.dept_id === d.dept_id);
              if (!hasMatch) {
                out.push({
                  status: 'null_padded',
                  emp_id: null,
                  name: null,
                  dept_id: d.dept_id,
                  dept_name: d.dept_name,
                  location: d.location
                });
              }
            });
            return out;
          }
        },
        {
          id: 'left_antijoin',
          name: 'LEFT ANTI-JOIN',
          symbol: 'A \\ B',
          tag: 'Orphans Only',
          activeZones: ['left'],
          sqlByDialect: {
            mysql: `SELECT e.emp_id, e.name, e.salary\nFROM Employees AS e\nLEFT JOIN Departments AS d\n  ON e.dept_id = d.dept_id\nWHERE d.dept_id IS NULL;`,
            postgres: `SELECT e.emp_id, e.name, e.salary\nFROM Employees AS e\nLEFT JOIN Departments AS d\n  ON e.dept_id = d.dept_id\nWHERE d.dept_id IS NULL;\n\n-- Alternative via NOT EXISTS:\nSELECT e.emp_id, e.name, e.salary FROM Employees e\nWHERE NOT EXISTS (SELECT 1 FROM Departments d WHERE d.dept_id = e.dept_id);`,
            oracle: `SELECT e.emp_id, e.name, e.salary\nFROM Employees e\nLEFT JOIN Departments d\n  ON e.dept_id = d.dept_id\nWHERE d.dept_id IS NULL;`,
            sqlserver: `SELECT e.emp_id, e.name, e.salary\nFROM Employees AS e\nLEFT JOIN Departments AS d\n  ON e.dept_id = d.dept_id\nWHERE d.dept_id IS NULL;`
          },
          tagline: 'Isolates rows in Left table that have NO match in Right',
          explanation: 'The ultimate data-quality filter. Discards all employees with active departments. Only catches Evan Vance (#5), who has no matching department key.',
          gotcha: 'Always filter the PRIMARY KEY of Table B with IS NULL in the WHERE clause. Filtering a nullable column could trigger false positives if that column naturally contains NULLs.',
          quickDrill: {
            question: 'Why must you filter the PRIMARY KEY of Table B with IS NULL?',
            options: [
              { id: 'A', text: 'Because primary keys can never naturally be NULL in Table B', isCorrect: true },
              { id: 'B', text: 'Because foreign keys cannot be indexed', isCorrect: false },
              { id: 'C', text: 'Because the database crashes otherwise', isCorrect: false }
            ],
            explanation: 'Filtering a nullable column (e.g. location IS NULL) might match existing valid departments with missing location data. Primary keys are guaranteed NOT NULL.'
          },
          outputGenerator: (eRows, dRows) => {
            const out = [];
            eRows.forEach(e => {
              const match = e.dept_id !== null ? dRows.find(d => d.dept_id === e.dept_id) : null;
              if (!match) {
                out.push({
                  status: 'exclusive',
                  emp_id: e.emp_id,
                  name: e.name,
                  dept_id: null,
                  dept_name: '---',
                  location: '---'
                });
              }
            });
            return out;
          }
        },
        {
          id: 'right_antijoin',
          name: 'RIGHT ANTI-JOIN',
          symbol: 'B \\ A',
          tag: 'Unused Right',
          activeZones: ['right'],
          sqlByDialect: {
            mysql: `SELECT d.dept_id, d.dept_name, d.location\nFROM Employees AS e\nRIGHT JOIN Departments AS d\n  ON e.dept_id = d.dept_id\nWHERE e.emp_id IS NULL;`,
            postgres: `SELECT d.dept_id, d.dept_name, d.location\nFROM Employees AS e\nRIGHT JOIN Departments AS d\n  ON e.dept_id = d.dept_id\nWHERE e.emp_id IS NULL;`,
            oracle: `SELECT d.dept_id, d.dept_name, d.location\nFROM Employees e\nRIGHT JOIN Departments d\n  ON e.dept_id = d.dept_id\nWHERE e.emp_id IS NULL;`,
            sqlserver: `SELECT d.dept_id, d.dept_name, d.location\nFROM Employees AS e\nRIGHT JOIN Departments AS d\n  ON e.dept_id = d.dept_id\nWHERE e.emp_id IS NULL;`
          },
          tagline: 'Isolates rows in Right table that have ZERO references from Left',
          explanation: 'Finds orphan departments with 0 assigned staff. Research (#40, Boston) has 0 employees and is caught exclusively.',
          gotcha: 'Useful for auditing unused lookups, dormant categories, or empty tenant partitions in enterprise databases before dropping old tables.',
          quickDrill: {
            question: 'What business purpose does a RIGHT ANTI-JOIN solve?',
            options: [
              { id: 'A', text: 'Identifies unreferenced parent entities (e.g. empty departments, inactive categories)', isCorrect: true },
              { id: 'B', text: 'Calculates total payroll expenditure', isCorrect: false },
              { id: 'C', text: 'Merges employee names with department codes', isCorrect: false }
            ],
            explanation: 'It isolates parent lookup rows that have zero child foreign-key references, perfect for database deprecation and cleanup audits.'
          },
          outputGenerator: (eRows, dRows) => {
            const out = [];
            dRows.forEach(d => {
              const hasMatch = eRows.some(e => e.dept_id === d.dept_id);
              if (!hasMatch) {
                out.push({
                  status: 'exclusive',
                  emp_id: null,
                  name: '---',
                  dept_id: d.dept_id,
                  dept_name: d.dept_name,
                  location: d.location
                });
              }
            });
            return out;
          }
        },
        {
          id: 'cross_join',
          name: 'CROSS JOIN',
          symbol: 'A × B',
          tag: 'Cartesian Product',
          activeZones: ['left', 'overlap', 'right'],
          sqlByDialect: {
            mysql: `SELECT e.name, d.dept_name\nFROM Employees AS e\nCROSS JOIN Departments AS d;`,
            postgres: `SELECT e.name, d.dept_name\nFROM Employees AS e\nCROSS JOIN Departments AS d;`,
            oracle: `SELECT e.name, d.dept_name\nFROM Employees e\nCROSS JOIN Departments d;`,
            sqlserver: `SELECT e.name, d.dept_name\nFROM Employees AS e\nCROSS JOIN Departments AS d;`
          },
          tagline: 'Pairs EVERY row from Left with EVERY row from Right',
          explanation: 'Creates a full Cartesian product. 5 employees × 4 departments = 20 total output rows. No ON condition exists.',
          gotcha: 'Dangerous in production! Joining two tables with 10,000 rows each produces 100,000,000 rows, exhausting server memory and crashing database instances.',
          quickDrill: {
            question: 'If Table A has 1,000 rows and Table B has 5,000 rows, how many rows does CROSS JOIN yield?',
            options: [
              { id: 'A', text: '6,000 rows', isCorrect: false },
              { id: 'B', text: '5,000,000 rows (Cartesian product)', isCorrect: true },
              { id: 'C', text: '4,000 rows', isCorrect: false }
            ],
            explanation: 'CROSS JOIN multiplies row counts: |A| × |B| = 1,000 × 5,000 = 5,000,000 rows.'
          },
          outputGenerator: (eRows, dRows) => {
            const out = [];
            eRows.forEach(e => {
              dRows.forEach(d => {
                out.push({
                  status: 'cartesian',
                  emp_id: e.emp_id,
                  name: e.name,
                  dept_id: d.dept_id,
                  dept_name: d.dept_name,
                  location: d.location
                });
              });
            });
            return out;
          }
        }
      ]
    },

    // --- 3-TABLE EULER DATASET (NEW FEATURE #3) ---
    euler3: {
      title: '3-Table Euler Joins (Chained Relational Pipeline)',
      tableA: {
        name: 'Employees (A)',
        alias: 'e',
        columns: ['emp_id', 'name', 'dept_id'],
        rows: [
          { emp_id: 1, name: 'Alice Chen', dept_id: 10 },
          { emp_id: 2, name: 'Bob Smith', dept_id: 20 },
          { emp_id: 3, name: 'Charlie Kim', dept_id: 10 },
          { emp_id: 4, name: 'Diana Ross', dept_id: 30 },
          { emp_id: 5, name: 'Evan Vance', dept_id: null }
        ]
      },
      tableB: {
        name: 'Departments (B)',
        alias: 'd',
        columns: ['dept_id', 'dept_name'],
        rows: [
          { dept_id: 10, dept_name: 'Engineering' },
          { dept_id: 20, dept_name: 'Marketing' },
          { dept_id: 30, dept_name: 'Sales' },
          { dept_id: 40, dept_name: 'Research' }
        ]
      },
      tableC: {
        name: 'Projects (C)',
        alias: 'p',
        columns: ['proj_id', 'proj_name', 'dept_id'],
        rows: [
          { proj_id: 101, proj_name: 'Cloud Migration', dept_id: 10 },
          { proj_id: 102, proj_name: 'Brand Refresh', dept_id: 20 },
          { proj_id: 103, proj_name: 'Enterprise CRM', dept_id: 30 },
          { proj_id: 104, proj_name: 'AI Quantum Stealth', dept_id: 50 } // Orphan project (dept 50 does not exist!)
        ]
      },
      operations: [
        {
          id: 'euler_3way_inner',
          name: '3-WAY INNER JOIN',
          symbol: 'A ∩ B ∩ C',
          tag: 'Central Triple Overlap',
          activeZones: ['center_abc'],
          sqlByDialect: {
            mysql: `SELECT e.name, d.dept_name, p.proj_name\nFROM Employees AS e\nINNER JOIN Departments AS d ON e.dept_id = d.dept_id\nINNER JOIN Projects AS p ON d.dept_id = p.dept_id;`,
            postgres: `SELECT e.name, d.dept_name, p.proj_name\nFROM Employees AS e\nINNER JOIN Departments AS d ON e.dept_id = d.dept_id\nINNER JOIN Projects AS p ON d.dept_id = p.dept_id;`,
            oracle: `SELECT e.name, d.dept_name, p.proj_name\nFROM Employees e\nINNER JOIN Departments d ON e.dept_id = d.dept_id\nINNER JOIN Projects p ON d.dept_id = p.dept_id;`,
            sqlserver: `SELECT e.name, d.dept_name, p.proj_name\nFROM Employees AS e\nINNER JOIN Departments AS d ON e.dept_id = d.dept_id\nINNER JOIN Projects AS p ON d.dept_id = p.dept_id;`
          },
          tagline: 'Matches only where keys exist in ALL 3 TABLES simultaneously',
          explanation: 'Finds employees who belong to a department that currently owns an active project. Evan (#5, no dept), Research (#40, no staff or projects), and AI Quantum Lab (#104, unassigned dept 50) are all excluded.',
          gotcha: 'Multi-table INNER joins are associative: the optimizer can join A to B first, or B to C first, picking the order that produces the smallest intermediate hash table.',
          quickDrill: {
            question: 'Why is Project #104 (AI Quantum Stealth) missing from the 3-WAY INNER JOIN?',
            options: [
              { id: 'A', text: 'Its dept_id = 50 does not exist in Departments or Employees', isCorrect: true },
              { id: 'B', text: 'Projects cannot be joined with Employees', isCorrect: false },
              { id: 'C', text: 'Its budget exceeded the query timeout', isCorrect: false }
            ],
            explanation: 'Project #104 references dept_id 50, which has no matching department record, so the ON condition fails.'
          },
          outputGenerator: (eRows, dRows, pRows) => {
            const out = [];
            eRows.forEach(e => {
              if (e.dept_id !== null) {
                const dMatch = dRows.find(d => d.dept_id === e.dept_id);
                if (dMatch) {
                  const pMatches = pRows.filter(p => p.dept_id === dMatch.dept_id);
                  pMatches.forEach(p => {
                    out.push({
                      status: 'matched',
                      emp_name: e.name,
                      dept_name: dMatch.dept_name,
                      proj_name: p.proj_name
                    });
                  });
                }
              }
            });
            return out;
          }
        },
        {
          id: 'euler_chained_left',
          name: 'CHAINED LEFT JOIN',
          symbol: 'A → B → C',
          tag: 'Preserve All Personnel',
          activeZones: ['left_a', 'overlap_ab', 'center_abc'],
          sqlByDialect: {
            mysql: `SELECT e.name, d.dept_name, p.proj_name\nFROM Employees AS e\nLEFT JOIN Departments AS d ON e.dept_id = d.dept_id\nLEFT JOIN Projects AS p ON d.dept_id = p.dept_id;`,
            postgres: `SELECT e.name, d.dept_name, p.proj_name\nFROM Employees AS e\nLEFT JOIN Departments AS d ON e.dept_id = d.dept_id\nLEFT JOIN Projects AS p ON d.dept_id = p.dept_id;`,
            oracle: `SELECT e.name, d.dept_name, p.proj_name\nFROM Employees e\nLEFT JOIN Departments d ON e.dept_id = d.dept_id\nLEFT JOIN Projects p ON d.dept_id = p.dept_id;`,
            sqlserver: `SELECT e.name, d.dept_name, p.proj_name\nFROM Employees AS e\nLEFT JOIN Departments AS d ON e.dept_id = d.dept_id\nLEFT JOIN Projects AS p ON d.dept_id = p.dept_id;`
          },
          tagline: 'Guarantees EVERY employee, pulling in departments and projects when available',
          explanation: 'Alice, Bob, Charlie, and Diana show full department and project details. Evan Vance (#5) has no department, so department and project attributes both populate with NULL.',
          gotcha: 'If the second join were an INNER JOIN (A LEFT JOIN B INNER JOIN C), Evan Vance would be dropped! To preserve Table A through multiple joins, all downstream joins must also be LEFT JOINs.',
          quickDrill: {
            question: 'What happens if you write "A LEFT JOIN B INNER JOIN C"?',
            options: [
              { id: 'A', text: 'All employees are still preserved', isCorrect: false },
              { id: 'B', text: 'The second INNER JOIN drops rows where B was padded with NULL, losing employees like Evan', isCorrect: true },
              { id: 'C', text: 'The SQL engine throws a chaining violation error', isCorrect: false }
            ],
            explanation: 'An downstream INNER JOIN requires a match on Table C. Because Evan has NULL for Table B keys, he fails the Table C join and is discarded.'
          },
          outputGenerator: (eRows, dRows, pRows) => {
            const out = [];
            eRows.forEach(e => {
              const dMatch = e.dept_id !== null ? dRows.find(d => d.dept_id === e.dept_id) : null;
              if (dMatch) {
                const pMatches = pRows.filter(p => p.dept_id === dMatch.dept_id);
                if (pMatches.length > 0) {
                  pMatches.forEach(p => {
                    out.push({
                      status: 'matched',
                      emp_name: e.name,
                      dept_name: dMatch.dept_name,
                      proj_name: p.proj_name
                    });
                  });
                } else {
                  out.push({
                    status: 'null_padded',
                    emp_name: e.name,
                    dept_name: dMatch.dept_name,
                    proj_name: null
                  });
                }
              } else {
                out.push({
                  status: 'null_padded',
                  emp_name: e.name,
                  dept_name: null,
                  proj_name: null
                });
              }
            });
            return out;
          }
        },
        {
          id: 'euler_project_orphans',
          name: 'PROJECT ORPHANS ANTI-JOIN',
          symbol: 'C \\ (A ∪ B)',
          tag: 'Unassigned Projects',
          activeZones: ['bottom_c'],
          sqlByDialect: {
            mysql: `SELECT p.proj_id, p.proj_name, p.dept_id\nFROM Projects AS p\nLEFT JOIN Departments AS d ON p.dept_id = d.dept_id\nWHERE d.dept_id IS NULL;`,
            postgres: `SELECT p.proj_id, p.proj_name, p.dept_id\nFROM Projects AS p\nLEFT JOIN Departments AS d ON p.dept_id = d.dept_id\nWHERE d.dept_id IS NULL;`,
            oracle: `SELECT p.proj_id, p.proj_name, p.dept_id\nFROM Projects p\nLEFT JOIN Departments d ON p.dept_id = d.dept_id\nWHERE d.dept_id IS NULL;`,
            sqlserver: `SELECT p.proj_id, p.proj_name, p.dept_id\nFROM Projects AS p\nLEFT JOIN Departments AS d ON p.dept_id = d.dept_id\nWHERE d.dept_id IS NULL;`
          },
          tagline: 'Isolates projects that reference non-existent departments',
          explanation: 'Detects broken foreign keys in Projects. Isolates Project #104 (AI Quantum Stealth), which references non-existent department #50.',
          gotcha: 'Foreign key integrity checks are essential when databases allow orphaned records or lack database-level FOREIGN KEY REFERENCES constraints.',
          quickDrill: {
            question: 'Why does Project #104 exist without a valid department?',
            options: [
              { id: 'A', text: 'Database lacks or disabled foreign key constraints, allowing orphan keys', isCorrect: true },
              { id: 'B', text: 'Projects are always joined with FULL OUTER JOIN', isCorrect: false },
              { id: 'C', text: 'Project #104 is an index artifact', isCorrect: false }
            ],
            explanation: 'In distributed data warehouses or legacy schemas without enforced FK constraints, orphan keys frequently occur.'
          },
          outputGenerator: (eRows, dRows, pRows) => {
            const out = [];
            pRows.forEach(p => {
              const dMatch = dRows.find(d => d.dept_id === p.dept_id);
              if (!dMatch) {
                out.push({
                  status: 'exclusive',
                  proj_id: p.proj_id,
                  proj_name: p.proj_name,
                  dept_id: p.dept_id,
                  status_note: 'Orphan (No Department)'
                });
              }
            });
            return out;
          }
        }
      ]
    },

    setOps: {
      title: 'Set Operations (Mathematical Sets)',
      leftTable: {
        name: 'Customers_Online',
        alias: 'online',
        columns: ['cust_id', 'name', 'tier'],
        rows: [
          { cust_id: 101, name: 'Alice Chen', tier: 'Gold' },
          { cust_id: 102, name: 'Bob Smith', tier: 'Silver' },
          { cust_id: 103, name: 'David Lee', tier: 'Platinum' },
          { cust_id: 104, name: 'Fiona Gallagher', tier: 'Bronze' },
          { cust_id: 105, name: 'Grace Hopper', tier: 'Gold' }
        ]
      },
      rightTable: {
        name: 'Customers_Retail',
        alias: 'retail',
        columns: ['cust_id', 'name', 'tier'],
        rows: [
          { cust_id: 102, name: 'Bob Smith', tier: 'Silver' },
          { cust_id: 103, name: 'David Lee', tier: 'Platinum' },
          { cust_id: 106, name: 'Charlie Kim', tier: 'Bronze' },
          { cust_id: 107, name: 'Hannah Abbott', tier: 'Silver' },
          { cust_id: 108, name: 'Ian Wright', tier: 'Gold' }
        ]
      },
      operations: [
        {
          id: 'union',
          name: 'UNION',
          symbol: 'A ∪ B (Distinct)',
          tag: 'Deduplicated Union',
          activeZones: ['left', 'overlap', 'right'],
          sqlByDialect: {
            mysql: `SELECT cust_id, name, tier FROM Customers_Online\nUNION\nSELECT cust_id, name, tier FROM Customers_Retail\nORDER BY cust_id;`,
            postgres: `SELECT cust_id, name, tier FROM Customers_Online\nUNION\nSELECT cust_id, name, tier FROM Customers_Retail\nORDER BY cust_id;`,
            oracle: `SELECT cust_id, name, tier FROM Customers_Online\nUNION\nSELECT cust_id, name, tier FROM Customers_Retail\nORDER BY cust_id;`,
            sqlserver: `SELECT cust_id, name, tier FROM Customers_Online\nUNION\nSELECT cust_id, name, tier FROM Customers_Retail\nORDER BY cust_id;`
          },
          tagline: 'Merges both sets and REMOVES duplicate records',
          explanation: 'Combines Online and Retail customer lists. Bob (#102) and David (#103) exist in both channels, so UNION eliminates their duplicates. 8 unique customers returned.',
          gotcha: 'UNION performs an expensive sorting and hash-deduplication pass in memory. If you know sets are disjoint, or do not care about duplicates, use UNION ALL for faster execution.',
          quickDrill: {
            question: 'What computational complexity penalty does UNION have compared to UNION ALL?',
            options: [
              { id: 'A', text: 'O(N log N) sorting / hash deduplication vs O(N) direct streaming', isCorrect: true },
              { id: 'B', text: 'No difference in performance', isCorrect: false },
              { id: 'C', text: 'UNION is always faster than UNION ALL', isCorrect: false }
            ],
            explanation: 'UNION must compare and deduplicate all records, requiring a sort pass or hash table.'
          },
          outputGenerator: (lRows, rRows) => {
            const map = new Map();
            lRows.forEach(r => map.set(r.cust_id, { status: 'source_a', ...r }));
            rRows.forEach(r => {
              if (map.has(r.cust_id)) {
                map.set(r.cust_id, { status: 'matched', ...r });
              } else {
                map.set(r.cust_id, { status: 'source_b', ...r });
              }
            });
            return Array.from(map.values()).sort((a, b) => a.cust_id - b.cust_id);
          }
        },
        {
          id: 'union_all',
          name: 'UNION ALL',
          symbol: 'A + B (Raw)',
          tag: 'Preserve Duplicates',
          activeZones: ['left', 'overlap', 'right'],
          sqlByDialect: {
            mysql: `SELECT cust_id, name, tier FROM Customers_Online\nUNION ALL\nSELECT cust_id, name, tier FROM Customers_Retail\nORDER BY cust_id;`,
            postgres: `SELECT cust_id, name, tier FROM Customers_Online\nUNION ALL\nSELECT cust_id, name, tier FROM Customers_Retail\nORDER BY cust_id;`,
            oracle: `SELECT cust_id, name, tier FROM Customers_Online\nUNION ALL\nSELECT cust_id, name, tier FROM Customers_Retail\nORDER BY cust_id;`,
            sqlserver: `SELECT cust_id, name, tier FROM Customers_Online\nUNION ALL\nSELECT cust_id, name, tier FROM Customers_Retail\nORDER BY cust_id;`
          },
          tagline: 'Stacks both sets directly without deduplication',
          explanation: 'All 5 online records and all 5 retail records are appended together. Bob (#102) and David (#103) appear twice. Total: 10 rows.',
          gotcha: 'UNION ALL is significantly faster than UNION because the database skips the expensive sort-and-distinct pipeline pass. Always default to UNION ALL unless deduplication is required.',
          quickDrill: {
            question: 'When should you choose UNION ALL over UNION?',
            options: [
              { id: 'A', text: 'When you know sets are disjoint or duplicate entries are acceptable', isCorrect: true },
              { id: 'B', text: 'When you need to drop duplicate IDs', isCorrect: false },
              { id: 'C', text: 'Only when joining tables with different column counts', isCorrect: false }
            ],
            explanation: 'UNION ALL streams directly without sorting, making it orders of magnitude faster on large data volumes.'
          },
          outputGenerator: (lRows, rRows) => {
            const out = [];
            lRows.forEach(r => out.push({ status: 'source_a', ...r }));
            rRows.forEach(r => out.push({ status: 'source_b', ...r }));
            return out.sort((a, b) => a.cust_id - b.cust_id);
          }
        },
        {
          id: 'intersect',
          name: 'INTERSECT',
          symbol: 'A ∩ B',
          tag: 'Common In Both',
          activeZones: ['overlap'],
          sqlByDialect: {
            mysql: `-- MySQL 8.0 Emulation (via INNER JOIN):\nSELECT o.cust_id, o.name, o.tier\nFROM Customers_Online o\nINNER JOIN Customers_Retail r ON o.cust_id = r.cust_id;`,
            postgres: `SELECT cust_id, name, tier FROM Customers_Online\nINTERSECT\nSELECT cust_id, name, tier FROM Customers_Retail;`,
            oracle: `SELECT cust_id, name, tier FROM Customers_Online\nINTERSECT\nSELECT cust_id, name, tier FROM Customers_Retail;`,
            sqlserver: `SELECT cust_id, name, tier FROM Customers_Online\nINTERSECT\nSELECT cust_id, name, tier FROM Customers_Retail;`
          },
          tagline: 'Returns only records present in BOTH datasets',
          explanation: 'Finds omnichannel shoppers who buy both Online and Retail. Only Bob (#102) and David (#103) exist in both tables. Exactly 2 rows returned.',
          gotcha: 'INTERSECT compares ALL selected columns, not just primary keys! If Bob is \'Silver\' in Online but has been updated to \'Gold\' in Retail, standard INTERSECT considers them different and drops them!',
          quickDrill: {
            question: 'If Bob is "Silver" Online but "Gold" in Retail, does "SELECT * FROM Online INTERSECT SELECT * FROM Retail" match him?',
            options: [
              { id: 'A', text: 'Yes, because cust_id matches', isCorrect: false },
              { id: 'B', text: 'No, because INTERSECT compares entire row values across all columns', isCorrect: true },
              { id: 'C', text: 'It creates a duplicate row', isCorrect: false }
            ],
            explanation: 'Set operations compare all projected columns simultaneously. Different column values mean the row is not an exact match.'
          },
          outputGenerator: (lRows, rRows) => {
            const out = [];
            lRows.forEach(l => {
              const match = rRows.find(r => r.cust_id === l.cust_id);
              if (match) {
                out.push({ status: 'matched', ...l });
              }
            });
            return out;
          }
        },
        {
          id: 'except',
          name: 'EXCEPT / MINUS',
          symbol: 'A \\ B',
          tag: 'Left Exclusive',
          activeZones: ['left'],
          sqlByDialect: {
            mysql: `-- MySQL 8.0 Emulation (via LEFT JOIN):\nSELECT o.cust_id, o.name, o.tier\nFROM Customers_Online o\nLEFT JOIN Customers_Retail r ON o.cust_id = r.cust_id\nWHERE r.cust_id IS NULL;`,
            postgres: `SELECT cust_id, name, tier FROM Customers_Online\nEXCEPT\nSELECT cust_id, name, tier FROM Customers_Retail;`,
            oracle: `-- Oracle uses MINUS keyword:\nSELECT cust_id, name, tier FROM Customers_Online\nMINUS\nSELECT cust_id, name, tier FROM Customers_Retail;`,
            sqlserver: `SELECT cust_id, name, tier FROM Customers_Online\nEXCEPT\nSELECT cust_id, name, tier FROM Customers_Retail;`
          },
          tagline: 'Returns records in the first set that do NOT exist in the second',
          explanation: 'Finds pure Online-only customers. Alice (#101), Fiona (#104), and Grace (#105) have never shopped retail. Bob and David are removed because they exist in retail.',
          gotcha: 'Order of tables matters! A EXCEPT B produces Online-only shoppers (3 rows). B EXCEPT A produces Retail-only shoppers (Charlie, Hannah, Ian - 3 rows).',
          quickDrill: {
            question: 'What keyword does Oracle SQL use instead of EXCEPT?',
            options: [
              { id: 'A', text: 'MINUS', isCorrect: true },
              { id: 'B', text: 'DIFFERENCE', isCorrect: false },
              { id: 'C', text: 'EXCLUDE', isCorrect: false }
            ],
            explanation: 'Oracle Database historically implemented the MINUS operator rather than the standard ANSI EXCEPT keyword.'
          },
          outputGenerator: (lRows, rRows) => {
            const out = [];
            lRows.forEach(l => {
              const hasMatch = rRows.some(r => r.cust_id === l.cust_id);
              if (!hasMatch) {
                out.push({ status: 'exclusive', ...l });
              }
            });
            return out;
          }
        }
      ]
    }
  };

  // --- PRACTICE CHALLENGES (10 Real-World Business & FAANG Scenarios) ---
  const CHALLENGES = [
    {
      id: 'c1',
      number: 1,
      title: 'Unassigned New Hires Audit',
      company: 'Stripe • HR Systems',
      difficulty: 'Medium',
      mode: 'joins',
      targetOpId: 'left_antijoin',
      scenario: 'HR operations needs an urgent automated report listing all newly hired employees who have NOT yet been assigned to any department (i.e. dept_id is missing or unassigned). Active employees assigned to Engineering or Marketing must NOT appear.',
      prompt: 'Which relational query pattern isolates unassigned employees without returning matched department staff?',
      options: [
        {
          id: 'A',
          text: 'INNER JOIN Departments ON e.dept_id = d.dept_id',
          isCorrect: false,
          explanation: 'Incorrect: INNER JOIN requires matching keys on BOTH sides, so Evan Vance (#5, dept_id IS NULL) will be completely dropped from the result!'
        },
        {
          id: 'B',
          text: 'LEFT JOIN Departments ON e.dept_id = d.dept_id WHERE d.dept_id IS NULL (Left Anti-Join)',
          isCorrect: true,
          explanation: 'Correct! A LEFT JOIN preserves all employees from Table A, and filtering Table B\'s primary key with WHERE d.dept_id IS NULL isolates orphan employees like Evan Vance (#5)!'
        },
        {
          id: 'C',
          text: 'RIGHT JOIN Departments ON e.dept_id = d.dept_id',
          isCorrect: false,
          explanation: 'Incorrect: RIGHT JOIN preserves all departments, not unassigned employees.'
        },
        {
          id: 'D',
          text: 'CROSS JOIN Departments',
          isCorrect: false,
          explanation: 'Incorrect: CROSS JOIN produces a Cartesian product pairing all employees with all departments.'
        }
      ],
      xpReward: 20
    },
    {
      id: 'c2',
      number: 2,
      title: 'Ghost Department Cost Centers',
      company: 'Amazon • Finance & Audit',
      difficulty: 'Medium',
      mode: 'joins',
      targetOpId: 'right_antijoin',
      scenario: 'Finance needs to eliminate inactive zombie cost centers. They require a query that lists every department in the database that currently has ZERO employees working in it.',
      prompt: 'Which relational pattern cleanly isolates departments that have no employee records pointing to them?',
      options: [
        {
          id: 'A',
          text: 'FULL OUTER JOIN with no WHERE clause',
          isCorrect: false,
          explanation: 'Incorrect: FULL OUTER JOIN returns all employees and all departments together, rather than isolating empty departments.'
        },
        {
          id: 'B',
          text: 'RIGHT JOIN Departments ON e.dept_id = d.dept_id WHERE e.emp_id IS NULL (Right Anti-Join)',
          isCorrect: true,
          explanation: 'Correct! Preserves all departments from Table B and checks WHERE e.emp_id IS NULL to isolate divisions with zero staff (catching Research #40).'
        },
        {
          id: 'C',
          text: 'INNER JOIN Departments ON e.dept_id = d.dept_id',
          isCorrect: false,
          explanation: 'Incorrect: INNER JOIN drops empty departments because they have no matching employees.'
        },
        {
          id: 'D',
          text: 'LEFT JOIN Departments ON e.dept_id = d.dept_id WHERE d.dept_id IS NOT NULL',
          isCorrect: false,
          explanation: 'Incorrect: This returns employees with assigned departments, the exact opposite of our goal.'
        }
      ],
      xpReward: 20
    },
    {
      id: 'c3',
      number: 3,
      title: 'Active Payroll Verification',
      company: 'Meta • Payroll Engineering',
      difficulty: 'Easy',
      mode: 'joins',
      targetOpId: 'inner_join',
      scenario: 'Payroll needs to generate tax disbursements for active personnel. Only employees who belong to an active, valid department must be included. Unassigned new hires and empty departments must be completely omitted.',
      prompt: 'Which join ensures only fully validated pairs of employees and departments appear in the output?',
      options: [
        {
          id: 'A',
          text: 'INNER JOIN Departments ON e.dept_id = d.dept_id',
          isCorrect: true,
          explanation: 'Correct! INNER JOIN retains only the strict intersection (A ∩ B) where foreign keys match. Evan and Research are both safely excluded.'
        },
        {
          id: 'B',
          text: 'LEFT JOIN Departments ON e.dept_id = d.dept_id',
          isCorrect: false,
          explanation: 'Incorrect: LEFT JOIN would keep Evan Vance with NULL department data.'
        },
        {
          id: 'C',
          text: 'FULL OUTER JOIN Departments ON e.dept_id = d.dept_id',
          isCorrect: false,
          explanation: 'Incorrect: FULL OUTER JOIN would keep both unassigned employees and empty departments.'
        },
        {
          id: 'D',
          text: 'CROSS JOIN Departments',
          isCorrect: false,
          explanation: 'Incorrect: CROSS JOIN creates 20 rows of meaningless combinations.'
        }
      ],
      xpReward: 20
    },
    {
      id: 'c4',
      number: 4,
      title: 'Complete Staff Roster With Null-Padding',
      company: 'Google • Workspace HR',
      difficulty: 'Easy',
      mode: 'joins',
      targetOpId: 'left_join',
      scenario: 'A company-wide directory must list EVERY single employee in the organization. If an employee does not yet have an assigned department, their name must still be listed with department fields displayed as NULL.',
      prompt: 'Which join preserves 100% of the employee records regardless of department assignment?',
      options: [
        {
          id: 'A',
          text: 'INNER JOIN Departments ON e.dept_id = d.dept_id',
          isCorrect: false,
          explanation: 'Incorrect: INNER JOIN will silently drop Evan Vance because he has no department.'
        },
        {
          id: 'B',
          text: 'LEFT JOIN Departments ON e.dept_id = d.dept_id',
          isCorrect: true,
          explanation: 'Correct! LEFT JOIN preserves all rows from Table A (Employees) and pads missing Right-table attributes with NULL.'
        },
        {
          id: 'C',
          text: 'RIGHT JOIN Departments ON e.dept_id = d.dept_id',
          isCorrect: false,
          explanation: 'Incorrect: RIGHT JOIN guarantees departments, but drops unassigned employees like Evan.'
        },
        {
          id: 'D',
          text: 'EXCEPT SELECT * FROM Departments',
          isCorrect: false,
          explanation: 'Incorrect: EXCEPT is a set operation requiring identical schemas, not a relational join.'
        }
      ],
      xpReward: 20
    },
    {
      id: 'c5',
      number: 5,
      title: 'Executive M&A Reconciliation Matrix',
      company: 'Deloitte • Tech Due Diligence',
      difficulty: 'Hard',
      mode: 'joins',
      targetOpId: 'full_outer_join',
      scenario: 'During a corporate acquisition, auditors need a comprehensive reconciliation matrix showing all employees AND all departments in a single table, ensuring no records from either side are discarded.',
      prompt: 'Which join operation produces a complete bi-directional union of both tables with NULL padding?',
      options: [
        {
          id: 'A',
          text: 'INNER JOIN Departments ON e.dept_id = d.dept_id',
          isCorrect: false,
          explanation: 'Incorrect: Drops Evan Vance and Research Department.'
        },
        {
          id: 'B',
          text: 'LEFT JOIN Departments ON e.dept_id = d.dept_id',
          isCorrect: false,
          explanation: 'Incorrect: Discards Research Department because it has 0 employees.'
        },
        {
          id: 'C',
          text: 'FULL OUTER JOIN Departments ON e.dept_id = d.dept_id',
          isCorrect: true,
          explanation: 'Correct! FULL OUTER JOIN preserves all rows from both tables. Evan appears with NULL department data, and Research appears with NULL employee data (6 total rows).'
        },
        {
          id: 'D',
          text: 'CROSS JOIN Departments ON e.dept_id = d.dept_id',
          isCorrect: false,
          explanation: 'Incorrect: CROSS JOIN does not take an ON clause in standard ANSI SQL.'
        }
      ],
      xpReward: 20
    },
    {
      id: 'c6',
      number: 6,
      title: 'Hypothetical Shift Coverage Pairings',
      company: 'FedEx • Operations Dispatch',
      difficulty: 'Medium',
      mode: 'joins',
      targetOpId: 'cross_join',
      scenario: 'Operations planning wants to model emergency disaster coverage by generating every possible combination of all 5 employees assigned to each of the 4 facilities without requiring any matching keys.',
      prompt: 'Which join produces the complete mathematical Cartesian product (5 × 4 = 20 rows)?',
      options: [
        {
          id: 'A',
          text: 'CROSS JOIN Departments',
          isCorrect: true,
          explanation: 'Correct! CROSS JOIN pairs each row of Table A with every row of Table B (Cartesian product: 5 × 4 = 20 rows).'
        },
        {
          id: 'B',
          text: 'LEFT JOIN Departments ON e.dept_id = d.dept_id',
          isCorrect: false,
          explanation: 'Incorrect: Produces only 5 rows based on existing foreign keys.'
        },
        {
          id: 'C',
          text: 'UNION ALL',
          isCorrect: false,
          explanation: 'Incorrect: Stacks records vertically rather than pairing columns horizontally.'
        },
        {
          id: 'D',
          text: 'INTERSECT',
          isCorrect: false,
          explanation: 'Incorrect: INTERSECT finds overlapping rows in identical schemas.'
        }
      ],
      xpReward: 20
    },
    {
      id: 'c7',
      number: 7,
      title: 'Online-Exclusive Shopper Segment',
      company: 'Shopify • Growth Analytics',
      difficulty: 'Medium',
      mode: 'setOps',
      targetOpId: 'except',
      scenario: 'Marketing wants to send an exclusive digital onboarding offer to customers who have made purchases Online BUT have NEVER shopped at a physical Retail store.',
      prompt: 'Which set operation isolates customers found in Customers_Online who do not exist in Customers_Retail?',
      options: [
        {
          id: 'A',
          text: 'SELECT ... FROM Customers_Online INTERSECT SELECT ... FROM Customers_Retail',
          isCorrect: false,
          explanation: 'Incorrect: INTERSECT isolates omnichannel shoppers who bought in BOTH channels.'
        },
        {
          id: 'B',
          text: 'SELECT ... FROM Customers_Online EXCEPT SELECT ... FROM Customers_Retail',
          isCorrect: true,
          explanation: 'Correct! EXCEPT (or MINUS in Oracle) takes the left set and removes any element found in the right set, yielding Alice (#101), Fiona (#104), and Grace (#105)!'
        },
        {
          id: 'C',
          text: 'SELECT ... FROM Customers_Online UNION SELECT ... FROM Customers_Retail',
          isCorrect: false,
          explanation: 'Incorrect: UNION includes all customers from both channels.'
        },
        {
          id: 'D',
          text: 'SELECT ... FROM Customers_Online UNION ALL SELECT ... FROM Customers_Retail',
          isCorrect: false,
          explanation: 'Incorrect: UNION ALL includes all records without filtering.'
        }
      ],
      xpReward: 20
    },
    {
      id: 'c8',
      number: 8,
      title: 'Omnichannel VIP Club Invitation',
      company: 'Nike Direct • CRM',
      difficulty: 'Easy',
      mode: 'setOps',
      targetOpId: 'intersect',
      scenario: 'The loyalty team wants to identify VIP customers who shop in BOTH channels (Online AND physical Retail stores) to invite them to an exclusive in-person launch event.',
      prompt: 'Which set operation returns only the records shared between both customer tables?',
      options: [
        {
          id: 'A',
          text: 'SELECT ... FROM Customers_Online INTERSECT SELECT ... FROM Customers_Retail',
          isCorrect: true,
          explanation: 'Correct! INTERSECT finds the shared set intersection (A ∩ B): Bob Smith (#102) and David Lee (#103).'
        },
        {
          id: 'B',
          text: 'SELECT ... FROM Customers_Online EXCEPT SELECT ... FROM Customers_Retail',
          isCorrect: false,
          explanation: 'Incorrect: EXCEPT finds Online-only customers.'
        },
        {
          id: 'C',
          text: 'SELECT ... FROM Customers_Retail EXCEPT SELECT ... FROM Customers_Online',
          isCorrect: false,
          explanation: 'Incorrect: Finds Retail-only customers.'
        },
        {
          id: 'D',
          text: 'SELECT ... FROM Customers_Online CROSS JOIN Customers_Retail',
          isCorrect: false,
          explanation: 'Incorrect: CROSS JOIN pairs columns instead of matching customer identity.'
        }
      ],
      xpReward: 20
    },
    {
      id: 'c9',
      number: 9,
      title: 'Deduplicated Master Mailing List',
      company: 'Target • Direct Mail Marketing',
      difficulty: 'Easy',
      mode: 'setOps',
      targetOpId: 'union',
      scenario: 'To comply with budget limits and avoid sending duplicate catalogs to the same household, marketing wants a single master list of all unique customer names across both channels.',
      prompt: 'Which operator merges both customer lists and automatically eliminates duplicate entries?',
      options: [
        {
          id: 'A',
          text: 'SELECT name FROM Online UNION ALL SELECT name FROM Retail',
          isCorrect: false,
          explanation: 'Incorrect: UNION ALL preserves duplicates, sending two catalogs to Bob and David.'
        },
        {
          id: 'B',
          text: 'SELECT name FROM Online UNION SELECT name FROM Retail',
          isCorrect: true,
          explanation: 'Correct! UNION merges both sets and runs a deduplication sort pass, returning exactly 8 unique customer names.'
        },
        {
          id: 'C',
          text: 'SELECT name FROM Online INTERSECT SELECT name FROM Retail',
          isCorrect: false,
          explanation: 'Incorrect: INTERSECT only returns customers who bought in both places.'
        },
        {
          id: 'D',
          text: 'SELECT name FROM Online EXCEPT SELECT name FROM Retail',
          isCorrect: false,
          explanation: 'Incorrect: Drops all retail customers.'
        }
      ],
      xpReward: 20
    },
    {
      id: 'c10',
      number: 10,
      title: 'High-Throughput Raw Event Streaming',
      company: 'Netflix • Big Data Platform',
      difficulty: 'Medium',
      mode: 'setOps',
      targetOpId: 'union_all',
      scenario: 'Data engineering is streaming billions of clickstream events from Server A and Server B. Duplicate events must be preserved for accurate auditing, and no CPU cycles should be wasted on sorting or hashing.',
      prompt: 'Which operator concatenates both streams with maximum execution speed and zero deduplication overhead?',
      options: [
        {
          id: 'A',
          text: 'SELECT ... UNION SELECT ...',
          isCorrect: false,
          explanation: 'Incorrect: UNION consumes massive RAM and CPU sorting and de-duplicating rows.'
        },
        {
          id: 'B',
          text: 'SELECT ... UNION ALL SELECT ...',
          isCorrect: true,
          explanation: 'Correct! UNION ALL performs a linear stream concatenation without sorting or deduplication overhead ($O(N)$ vs $O(N \\log N)$).'
        },
        {
          id: 'C',
          text: 'SELECT ... INTERSECT SELECT ...',
          isCorrect: false,
          explanation: 'Incorrect: Discards events that only occurred on one server.'
        },
        {
          id: 'D',
          text: 'SELECT ... EXCEPT SELECT ...',
          isCorrect: false,
          explanation: 'Incorrect: Subtracts streams.'
        }
      ],
      xpReward: 20
    }
  ];

  // --- STATE ---
  const state = {
    mode: 'joins', // 'joins' | 'euler3' | 'setOps'
    cockpitLayout: 'split', // 'split' | 'diagram' | 'matrix'
    selectedOpIndex: 0,
    selectedDialect: 'mysql', // 'mysql' | 'postgres' | 'oracle' | 'sqlserver'
    activeSubtab: 'visualizer', // 'visualizer' | 'challenges' | 'schema' | 'concepts'
    hoveredChipId: null,
    currentChallengeIdx: 0,
    solvedChallenges: new Set(),
    selectedChallengeOption: null,
    challengeAnswerFeedback: null,
    customRowOverrides: new Map(), // emp_id -> { dept_id }
    activeWhatIfEmpId: null, // emp_id currently open in what-if popover
    quickDrillAnswers: {} // opId -> { selectedId, isCorrect }
  };

  // Load solved challenges from localStorage
  try {
    const saved = localStorage.getItem('sqlfoundry_venn_solved_challenges');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        state.solvedChallenges = new Set(parsed);
      }
    }
  } catch (e) {
    console.warn('Could not read localStorage for challenges:', e);
  }

  // --- ENGINE OBJECT ---
  const VennMatrixEngine = {
    init: function () {
      const container = document.getElementById('viewVennMatrix');
      if (!container) return;
      this.render();
    },

    setSubtab: function (tabName) {
      if (state.activeSubtab === tabName) return;
      state.activeSubtab = tabName;
      this.render();
      if (window.AudioFX) window.AudioFX.playClick();
    },

    setLayout: function (layout) {
      if (state.cockpitLayout === layout) return;
      state.cockpitLayout = layout;
      this.render();
      if (window.AudioFX) window.AudioFX.playClick();
    },

    setMode: function (mode) {
      if (state.mode === mode) return;
      state.mode = mode;
      state.selectedOpIndex = 0;
      state.hoveredChipId = null;
      state.activeWhatIfEmpId = null;
      this.render();
      if (window.AudioFX) window.AudioFX.playPop();
    },

    setDialect: function (dialect) {
      if (state.selectedDialect === dialect) return;
      state.selectedDialect = dialect;
      this.render();
      if (window.AudioFX) window.AudioFX.playClick();
    },

    selectOp: function (index) {
      state.selectedOpIndex = index;
      state.hoveredChipId = null;
      state.activeWhatIfEmpId = null;
      if (state.activeSubtab !== 'visualizer') {
        state.activeSubtab = 'visualizer';
      }
      this.render();
      if (window.AudioFX) window.AudioFX.playClick();
    },

    // Click direct SVG Venn Zone
    clickVennZone: function (zone) {
      if (state.mode === 'joins') {
        if (zone === 'left') {
          const idx = DATASETS.joins.operations.findIndex(o => o.id === 'left_antijoin');
          if (idx !== -1) this.selectOp(idx);
        } else if (zone === 'overlap') {
          const idx = DATASETS.joins.operations.findIndex(o => o.id === 'inner_join');
          if (idx !== -1) this.selectOp(idx);
        } else if (zone === 'right') {
          const idx = DATASETS.joins.operations.findIndex(o => o.id === 'right_antijoin');
          if (idx !== -1) this.selectOp(idx);
        }
      } else if (state.mode === 'euler3') {
        if (zone === 'center_abc') {
          const idx = DATASETS.euler3.operations.findIndex(o => o.id === 'euler_3way_inner');
          if (idx !== -1) this.selectOp(idx);
        } else if (zone === 'bottom_c') {
          const idx = DATASETS.euler3.operations.findIndex(o => o.id === 'euler_project_orphans');
          if (idx !== -1) this.selectOp(idx);
        } else {
          const idx = DATASETS.euler3.operations.findIndex(o => o.id === 'euler_chained_left');
          if (idx !== -1) this.selectOp(idx);
        }
      } else {
        if (zone === 'left') {
          const idx = DATASETS.setOps.operations.findIndex(o => o.id === 'except');
          if (idx !== -1) this.selectOp(idx);
        } else if (zone === 'overlap') {
          const idx = DATASETS.setOps.operations.findIndex(o => o.id === 'intersect');
          if (idx !== -1) this.selectOp(idx);
        } else if (zone === 'right') {
          const idx = DATASETS.setOps.operations.findIndex(o => o.id === 'union');
          if (idx !== -1) this.selectOp(idx);
        }
      }
      if (window.AudioFX) window.AudioFX.playPop();
    },

    // --- FEATURE #2: WHAT-IF KEY SIMULATOR METHODS ---
    openWhatIf: function (empId, e) {
      if (e) e.stopPropagation();
      state.activeWhatIfEmpId = empId;
      this.render();
      if (window.AudioFX) window.AudioFX.playPop();
    },

    closeWhatIf: function () {
      state.activeWhatIfEmpId = null;
      this.render();
    },

    mutateRowKey: function (empId, newDeptId) {
      state.customRowOverrides.set(empId, newDeptId);
      state.activeWhatIfEmpId = null;
      this.render();
      if (window.AudioFX) window.AudioFX.playSuccess();
    },

    resetDataOverrides: function () {
      state.customRowOverrides.clear();
      state.activeWhatIfEmpId = null;
      this.render();
      if (window.AudioFX) window.AudioFX.playPop();
    },

    // Helper: gets effective employee rows reflecting What-If mutations
    getEffectiveEmployees: function () {
      const baseRows = DATASETS.joins.leftTable.rows;
      return baseRows.map(r => {
        if (state.customRowOverrides.has(r.emp_id)) {
          return { ...r, dept_id: state.customRowOverrides.get(r.emp_id) };
        }
        return { ...r };
      });
    },

    // --- FEATURE #5: QUICK DRILL METHODS ---
    answerQuickDrill: function (opId, selectedId) {
      const currentOp = DATASETS[state.mode].operations[state.selectedOpIndex];
      if (!currentOp || !currentOp.quickDrill) return;

      const opt = currentOp.quickDrill.options.find(o => o.id === selectedId);
      if (!opt) return;

      state.quickDrillAnswers[opId] = {
        selectedId: selectedId,
        isCorrect: opt.isCorrect
      };

      if (opt.isCorrect) {
        if (window.soundFX && typeof window.soundFX.addXP === 'function') {
          window.soundFX.addXP(10, 'Quick Drill Mastered!');
        } else if (window.AudioFX) {
          window.AudioFX.playSuccess();
        }
      } else {
        if (window.AudioFX) window.AudioFX.playError();
      }

      this.render();
    },

    highlightChip: function (chipId) {
      state.hoveredChipId = chipId;
      this.updateRowHighlights(chipId);
    },

    clearHighlight: function () {
      state.hoveredChipId = null;
      this.updateRowHighlights(null);
    },

    updateRowHighlights: function (chipId) {
      const rows = document.querySelectorAll('.venn-inspect-row');
      rows.forEach(r => {
        if (!chipId) {
          r.classList.remove('highlighted');
        } else {
          const rowKey = r.getAttribute('data-row-key');
          if (rowKey === String(chipId)) {
            r.classList.add('highlighted');
          } else {
            r.classList.remove('highlighted');
          }
        }
      });
    },

    copySQL: function () {
      const currentOp = DATASETS[state.mode].operations[state.selectedOpIndex];
      if (!currentOp) return;
      const sql = currentOp.sqlByDialect[state.selectedDialect] || currentOp.sqlByDialect.mysql;

      if (navigator.clipboard && sql) {
        navigator.clipboard.writeText(sql).then(() => {
          const btn = document.getElementById('btnCopyVennSQL');
          if (btn) {
            const originalText = btn.innerHTML;
            btn.innerHTML = '✓ Copied to Clipboard!';
            btn.classList.add('copied');
            setTimeout(() => {
              btn.innerHTML = originalText;
              btn.classList.remove('copied');
            }, 2000);
          }
          if (window.AudioFX) window.AudioFX.playSuccess();
        });
      }
    },

    runInStudio: function () {
      const currentOp = DATASETS[state.mode].operations[state.selectedOpIndex];
      if (!currentOp) return;
      const sql = currentOp.sqlByDialect[state.selectedDialect] || currentOp.sqlByDialect.mysql;

      const sqlInput = document.getElementById('sqlInput');
      if (sqlInput) {
        sqlInput.value = sql.trim();
      }

      if (typeof window.switchMainView === 'function') {
        window.switchMainView('viewStudio');
      }

      if (typeof window.parseAndBuildPipeline === 'function') {
        window.parseAndBuildPipeline(sql);
      }

      if (window.AudioFX) window.AudioFX.playLaunch();
    },

    // --- CHALLENGE METHODS ---
    jumpToChallenge: function (index) {
      if (index < 0 || index >= CHALLENGES.length) return;
      state.currentChallengeIdx = index;
      state.selectedChallengeOption = null;
      state.challengeAnswerFeedback = null;
      this.render();
      if (window.AudioFX) window.AudioFX.playClick();
    },

    submitChallengeAnswer: function (optionId) {
      const challenge = CHALLENGES[state.currentChallengeIdx];
      if (!challenge) return;

      const selectedOpt = challenge.options.find(o => o.id === optionId);
      if (!selectedOpt) return;

      state.selectedChallengeOption = optionId;
      state.challengeAnswerFeedback = {
        isCorrect: selectedOpt.isCorrect,
        explanation: selectedOpt.explanation
      };

      if (selectedOpt.isCorrect) {
        if (!state.solvedChallenges.has(challenge.id)) {
          state.solvedChallenges.add(challenge.id);
          try {
            localStorage.setItem(
              'sqlfoundry_venn_solved_challenges',
              JSON.stringify(Array.from(state.solvedChallenges))
            );
          } catch (e) {}

          if (window.soundFX && typeof window.soundFX.addXP === 'function') {
            window.soundFX.addXP(challenge.xpReward, `Venn Challenge #${challenge.number} Mastered!`);
          } else if (window.AudioFX) {
            window.AudioFX.playSuccess();
          }
        } else {
          if (window.AudioFX) window.AudioFX.playSuccess();
        }
      } else {
        if (window.AudioFX) window.AudioFX.playError();
      }

      this.render();
    },

    inspectChallengeInVisualizer: function (mode, targetOpId) {
      state.mode = mode;
      const opIdx = DATASETS[mode].operations.findIndex(o => o.id === targetOpId);
      if (opIdx !== -1) {
        state.selectedOpIndex = opIdx;
      }
      state.activeSubtab = 'visualizer';
      this.render();
      if (window.AudioFX) window.AudioFX.playLaunch();
    },

    resetChallengeProgress: function () {
      if (confirm('Reset all Venn Challenge progress and start fresh?')) {
        state.solvedChallenges.clear();
        try {
          localStorage.removeItem('sqlfoundry_venn_solved_challenges');
        } catch (e) {}
        state.selectedChallengeOption = null;
        state.challengeAnswerFeedback = null;
        this.render();
        if (window.AudioFX) window.AudioFX.playPop();
      }
    },

    // --- MAIN RENDER DISPATCHER ---
    render: function () {
      const container = document.getElementById('viewVennMatrix');
      if (!container) return;

      const currentDataset = DATASETS[state.mode];
      const currentOp = currentDataset.operations[state.selectedOpIndex] || currentDataset.operations[0];
      const activeZones = currentOp ? (currentOp.activeZones || []) : [];

      // Calculate output rows reflecting any What-If mutations
      let outputRows = [];
      if (state.mode === 'joins') {
        const effectiveEmployees = this.getEffectiveEmployees();
        outputRows = currentOp.outputGenerator(effectiveEmployees, currentDataset.rightTable.rows);
      } else if (state.mode === 'euler3') {
        outputRows = currentOp.outputGenerator(
          currentDataset.tableA.rows,
          currentDataset.tableB.rows,
          currentDataset.tableC.rows
        );
      } else {
        outputRows = currentOp.outputGenerator(
          currentDataset.leftTable.rows,
          currentDataset.rightTable.rows
        );
      }

      const solvedCount = state.solvedChallenges.size;
      const totalChallenges = CHALLENGES.length;

      container.innerHTML = `
        <div class="venn-matrix-wrapper layout-${state.cockpitLayout}">
          <!-- Top Header Strip -->
          <div class="venn-matrix-header">
            <div class="venn-header-left">
              <div class="venn-title-row">
                <span class="venn-icon">⭕</span>
                <h1 class="venn-title">Relational Set &amp; Join Topology Matrix</h1>
                <span class="venn-status-pill">Interactive Cockpit &amp; Live Physics</span>
              </div>
              <p class="venn-subtitle">
                Master physical intersections, 3-table Euler chains, what-if key mutations, multi-dialect SQL, and FAANG challenges in one unified cockpit.
              </p>
            </div>

            <!-- Mode Switcher: 2-Table Joins vs 3-Table Euler vs Set Operations -->
            <div class="venn-mode-toggle">
              <button class="venn-mode-btn ${state.mode === 'joins' ? 'active' : ''}" onclick="window.VennMatrixEngine.setMode('joins')">
                <span class="mode-icon">🔗</span> 2-Table Joins
              </button>
              <button class="venn-mode-btn ${state.mode === 'euler3' ? 'active' : ''}" onclick="window.VennMatrixEngine.setMode('euler3')">
                <span class="mode-icon">🌐</span> 3-Table Euler Joins
              </button>
              <button class="venn-mode-btn ${state.mode === 'setOps' ? 'active' : ''}" onclick="window.VennMatrixEngine.setMode('setOps')">
                <span class="mode-icon">⋃</span> Set Operations
              </button>
            </div>
          </div>

          <!-- Section Subtabs Navigation Bar -->
          <div class="venn-subnav-bar">
            <button class="venn-subnav-tab ${state.activeSubtab === 'visualizer' ? 'active' : ''}" onclick="window.VennMatrixEngine.setSubtab('visualizer')">
              <span class="tab-icon">🔬</span>
              <span class="tab-text">Interactive Visualizer</span>
            </button>
            <button class="venn-subnav-tab ${state.activeSubtab === 'challenges' ? 'active' : ''}" onclick="window.VennMatrixEngine.setSubtab('challenges')">
              <span class="tab-icon">🎯</span>
              <span class="tab-text">Practice Challenges</span>
              <span class="tab-badge ${solvedCount > 0 ? 'badge-active' : ''}">${solvedCount}/${totalChallenges} Solved</span>
            </button>
            <button class="venn-subnav-tab ${state.activeSubtab === 'schema' ? 'active' : ''}" onclick="window.VennMatrixEngine.setSubtab('schema')">
              <span class="tab-icon">🗄️</span>
              <span class="tab-text">Schema &amp; Entity Models</span>
            </button>
            <button class="venn-subnav-tab ${state.activeSubtab === 'concepts' ? 'active' : ''}" onclick="window.VennMatrixEngine.setSubtab('concepts')">
              <span class="tab-icon">🧠</span>
              <span class="tab-text">Concept Mastery Guide</span>
            </button>
          </div>

          <!-- Subtab Renderers -->
          ${state.activeSubtab === 'visualizer' ? this.renderVisualizerTab(currentDataset, currentOp, activeZones, outputRows) : ''}
          ${state.activeSubtab === 'challenges' ? this.renderChallengesTab() : ''}
          ${state.activeSubtab === 'schema' ? this.renderSchemaTab() : ''}
          ${state.activeSubtab === 'concepts' ? this.renderConceptsTab() : ''}
        </div>
      `;
    },

    // --- TAB 1: VISUALIZER & ROW PHYSICS ---
    renderVisualizerTab: function (currentDataset, currentOp, activeZones, outputRows) {
      const activeSQL = currentOp.sqlByDialect[state.selectedDialect] || currentOp.sqlByDialect.mysql;
      const drillAnswer = state.quickDrillAnswers[currentOp.id];

      return `
        <!-- FEATURE #1: Cockpit Layout Switcher & What-If Reset Bar -->
        <div class="venn-cockpit-toolbar">
          <div class="layout-toggle-group">
            <button class="btn-layout-pill ${state.cockpitLayout === 'split' ? 'active' : ''}" onclick="window.VennMatrixEngine.setLayout('split')">
              <span class="layout-icon">⚡</span> Split Cockpit (Zero-Scroll)
            </button>
            <button class="btn-layout-pill ${state.cockpitLayout === 'diagram' ? 'active' : ''}" onclick="window.VennMatrixEngine.setLayout('diagram')">
              <span class="layout-icon">📐</span> Focus Diagram
            </button>
            <button class="btn-layout-pill ${state.cockpitLayout === 'matrix' ? 'active' : ''}" onclick="window.VennMatrixEngine.setLayout('matrix')">
              <span class="layout-icon">📊</span> 3-Table Matrix
            </button>
          </div>

          <div class="cockpit-right-actions">
            ${state.customRowOverrides.size > 0 ? `
              <button class="btn-reset-whatif" onclick="window.VennMatrixEngine.resetDataOverrides()">
                ↺ Reset What-If Data (${state.customRowOverrides.size} altered)
              </button>
            ` : `
              <span class="whatif-hint-pill">🧪 Tip: Click any row chip inside the circle to simulate key changes live!</span>
            `}
          </div>
        </div>

        <!-- Compact Relational Key Strip -->
        <div class="venn-schema-key-strip">
          <div class="schema-key-info">
            <span class="key-pill-label">RELATIONAL BINDING:</span>
            ${state.mode === 'joins' ? `
              <span class="key-pill fk">Employees.dept_id [FK]</span>
              <span class="key-arrow">───►</span>
              <span class="key-pill pk">Departments.dept_id [PK]</span>
            ` : state.mode === 'euler3' ? `
              <span class="key-pill fk">Employees.dept_id</span>
              <span class="key-arrow">──►</span>
              <span class="key-pill pk">Departments.dept_id</span>
              <span class="key-arrow">◄──</span>
              <span class="key-pill fk">Projects.dept_id</span>
            ` : `
              <span class="key-pill set">Customers_Online (5 Rows)</span>
              <span class="key-arrow">⋃</span>
              <span class="key-pill set">Customers_Retail (5 Rows)</span>
            `}
          </div>
          <div class="schema-orphan-links">
            ${state.mode === 'joins' ? `
              <button class="orphan-action-pill left" onclick="window.VennMatrixEngine.clickVennZone('left')" title="Click to isolate Left Orphan">
                ⚠️ Left Orphan: Evan (#5, dept_id IS NULL)
              </button>
              <button class="orphan-action-pill right" onclick="window.VennMatrixEngine.clickVennZone('right')" title="Click to isolate Right Orphan">
                ⚠️ Right Orphan: Research (#40, 0 staff)
              </button>
            ` : state.mode === 'euler3' ? `
              <button class="orphan-action-pill right" onclick="window.VennMatrixEngine.clickVennZone('bottom_c')">
                ⚠️ Orphan Project: AI Quantum (#104, dept 50)
              </button>
            ` : `
              <span class="orphan-action-pill info">
                💡 Bob (#102) &amp; David (#103) are common omnichannel shoppers
              </span>
            `}
          </div>
        </div>

        <!-- Operation Selector Dock -->
        <div class="venn-ops-dock">
          <div class="venn-ops-label">Select Relational Operation:</div>
          <div class="venn-ops-pills">
            ${currentDataset.operations.map((op, idx) => `
              <button class="venn-op-pill ${idx === state.selectedOpIndex ? 'active' : ''}" onclick="window.VennMatrixEngine.selectOp(${idx})">
                <span class="op-symbol">${op.symbol}</span>
                <span class="op-name">${op.name}</span>
                <span class="op-tag">${op.tag}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- MAIN INTERACTIVE STAGE -->
        <div class="venn-stage-grid cockpit-${state.cockpitLayout}">
          <!-- Left Column: SVG Diagram + Quick Drill -->
          <div class="venn-canvas-card">
            <div class="venn-canvas-header">
              <div class="venn-canvas-title">
                <span>${currentOp.name}</span>
                <span class="op-symbol-badge">${currentOp.symbol}</span>
              </div>
              <span class="venn-canvas-hint">💡 Click any zone to toggle join! Click row chips to mutate keys.</span>
            </div>

            <!-- SVG Container with Live Row Physics -->
            <div class="venn-svg-container">
              ${this.renderVennSvg(activeZones, currentDataset)}
              ${this.renderWhatIfPopover()}
            </div>

            <!-- Legend with Direct Zone Shortcuts -->
            <div class="venn-legend">
              ${state.mode === 'joins' ? `
                <button class="legend-chip left ${activeZones.includes('left') ? 'active' : ''}" onclick="window.VennMatrixEngine.clickVennZone('left')">
                  <span class="indicator"></span> Table A: Employees (Click A \\ B)
                </button>
                <button class="legend-chip overlap ${activeZones.includes('overlap') ? 'active' : ''}" onclick="window.VennMatrixEngine.clickVennZone('overlap')">
                  <span class="indicator"></span> Overlap A ∩ B (Click Inner)
                </button>
                <button class="legend-chip right ${activeZones.includes('right') ? 'active' : ''}" onclick="window.VennMatrixEngine.clickVennZone('right')">
                  <span class="indicator"></span> Table B: Departments (Click B \\ A)
                </button>
              ` : state.mode === 'euler3' ? `
                <button class="legend-chip left" onclick="window.VennMatrixEngine.clickVennZone('center_abc')">
                  <span class="indicator"></span> A ∩ B ∩ C (Triple Overlap)
                </button>
                <button class="legend-chip overlap" onclick="window.VennMatrixEngine.clickVennZone('chained')">
                  <span class="indicator"></span> A → B → C (Chained Pipeline)
                </button>
                <button class="legend-chip right" onclick="window.VennMatrixEngine.clickVennZone('bottom_c')">
                  <span class="indicator"></span> C \\ (A ∪ B) (Project Orphans)
                </button>
              ` : `
                <button class="legend-chip left" onclick="window.VennMatrixEngine.clickVennZone('left')">
                  <span class="indicator"></span> Online Only (Click EXCEPT)
                </button>
                <button class="legend-chip overlap" onclick="window.VennMatrixEngine.clickVennZone('overlap')">
                  <span class="indicator"></span> Omnichannel (Click INTERSECT)
                </button>
                <button class="legend-chip right" onclick="window.VennMatrixEngine.clickVennZone('right')">
                  <span class="indicator"></span> Retail Only (Click UNION)
                </button>
              `}
            </div>

            <!-- FEATURE #5: In-Visualizer Contextual Quick Drill -->
            ${currentOp.quickDrill ? `
              <div class="venn-quick-drill-card">
                <div class="quick-drill-header">
                  <span class="drill-badge">🎯 Quick Check</span>
                  <span class="drill-title">${currentOp.quickDrill.question}</span>
                </div>
                <div class="drill-options-row">
                  ${currentOp.quickDrill.options.map(opt => {
                    const isAnswered = !!drillAnswer;
                    const isSelected = isAnswered && drillAnswer.selectedId === opt.id;
                    let optClass = '';
                    if (isAnswered) {
                      if (isSelected) optClass = opt.isCorrect ? 'drill-correct' : 'drill-incorrect';
                      else if (opt.isCorrect) optClass = 'drill-correct';
                    }
                    return `
                      <button class="drill-option-btn ${optClass}" onclick="window.VennMatrixEngine.answerQuickDrill('${currentOp.id}', '${opt.id}')">
                        <span class="opt-letter">${opt.id}</span>
                        <span class="opt-text">${opt.text}</span>
                      </button>
                    `;
                  }).join('')}
                </div>
                ${drillAnswer ? `
                  <div class="drill-feedback-pill ${drillAnswer.isCorrect ? 'correct' : 'incorrect'}">
                    ${drillAnswer.isCorrect ? '✓ Correct! +10 XP awarded.' : '❌ Incorrect.'} ${currentOp.quickDrill.explanation}
                  </div>
                ` : ''}
              </div>
            ` : ''}
          </div>

          <!-- Right Column: Live Generated Result Table & SQL Generator (Split Cockpit) -->
          <div class="venn-intel-card">
            <!-- If Split Cockpit, show the Generated Output Table right here at the top! -->
            <div class="cockpit-result-box">
              <div class="result-card-header">
                <div class="result-title-group">
                  <span class="table-name-pill table-result">Live Transformation Result (${currentOp.name})</span>
                  <span class="result-count"><strong>${outputRows.length}</strong> Rows Produced</span>
                </div>
                <div class="result-tagline-mini">${currentOp.tagline}</div>
              </div>
              <div class="table-scroll-wrapper cockpit-table-scroll">
                <table class="venn-data-table result-table">
                  <thead>
                    <tr>
                      <th>Status</th>
                      ${this.getResultColumns(outputRows).map(c => `<th>${c}</th>`).join('')}
                    </tr>
                  </thead>
                  <tbody>
                    ${outputRows.map(r => `
                      <tr class="venn-output-row status-${r.status}">
                        <td><span class="status-badge badge-${r.status}">${this.formatStatus(r.status)}</span></td>
                        ${this.getResultColumns(outputRows).map(col => `
                          <td>${r[col] === null ? '<span class="null-val">NULL</span>' : (r[col] || '---')}</td>
                        `).join('')}
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- FEATURE #4: Multi-Dialect SQL Box -->
            <div class="venn-sql-box">
              <div class="venn-sql-header">
                <div class="sql-left-dock">
                  <span class="sql-label">PRODUCTION SQL CODE</span>
                  <!-- Dialect Switcher Pills -->
                  <div class="dialect-pills">
                    <button class="dialect-btn ${state.selectedDialect === 'mysql' ? 'active' : ''}" onclick="window.VennMatrixEngine.setDialect('mysql')">MySQL 8</button>
                    <button class="dialect-btn ${state.selectedDialect === 'postgres' ? 'active' : ''}" onclick="window.VennMatrixEngine.setDialect('postgres')">Postgres</button>
                    <button class="dialect-btn ${state.selectedDialect === 'oracle' ? 'active' : ''}" onclick="window.VennMatrixEngine.setDialect('oracle')">Oracle</button>
                    <button class="dialect-btn ${state.selectedDialect === 'sqlserver' ? 'active' : ''}" onclick="window.VennMatrixEngine.setDialect('sqlserver')">T-SQL</button>
                  </div>
                </div>

                <div class="sql-actions">
                  <button id="btnCopyVennSQL" class="venn-btn-copy" onclick="window.VennMatrixEngine.copySQL()">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    Copy
                  </button>
                  <button class="venn-btn-studio" onclick="window.VennMatrixEngine.runInStudio()">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    Run in Studio
                  </button>
                </div>
              </div>
              <pre class="venn-code-block"><code>${this.escapeHtml(activeSQL)}</code></pre>
            </div>

            <!-- Gotcha Alert Strip -->
            <div class="venn-gotcha-strip">
              <div class="gotcha-badge">⚠️ Relational Trap &amp; Optimizer Internals (${state.selectedDialect.toUpperCase()}):</div>
              <div class="gotcha-text">${currentOp.gotcha}</div>
            </div>
          </div>
        </div>

        <!-- Full 3-Table Data Diff Matrix (Visible in 'matrix' or 'diagram' modes) -->
        ${state.cockpitLayout !== 'split' ? `
          <div class="venn-tables-matrix">
            <div class="venn-tables-header">
              <span class="matrix-title">Physical Transformation Inspection (Input &rarr; Output)</span>
              <span class="matrix-tally">Output: <strong>${outputRows.length}</strong> Rows</span>
            </div>

            <div class="venn-tables-grid">
              <!-- Source Table A -->
              <div class="source-table-card">
                <div class="source-card-header">
                  <span class="table-name-pill table-a">Left (A): ${currentDataset.leftTable ? currentDataset.leftTable.name : currentDataset.tableA.name}</span>
                </div>
                <div class="table-scroll-wrapper">
                  <table class="venn-data-table">
                    <thead>
                      <tr>${(currentDataset.leftTable ? currentDataset.leftTable.columns : currentDataset.tableA.columns).map(c => `<th>${c}</th>`).join('')}</tr>
                    </thead>
                    <tbody>
                      ${(state.mode === 'joins' ? this.getEffectiveEmployees() : (currentDataset.leftTable ? currentDataset.leftTable.rows : currentDataset.tableA.rows)).map(row => `
                        <tr class="venn-inspect-row" data-row-key="${row.emp_id || row.cust_id}">
                          ${(currentDataset.leftTable ? currentDataset.leftTable.columns : currentDataset.tableA.columns).map(col => `
                            <td>${row[col] === null ? '<span class="null-val">NULL</span>' : row[col]}</td>
                          `).join('')}
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Source Table B -->
              <div class="source-table-card">
                <div class="source-card-header">
                  <span class="table-name-pill table-b">Right (B): ${currentDataset.rightTable ? currentDataset.rightTable.name : currentDataset.tableB.name}</span>
                </div>
                <div class="table-scroll-wrapper">
                  <table class="venn-data-table">
                    <thead>
                      <tr>${(currentDataset.rightTable ? currentDataset.rightTable.columns : currentDataset.tableB.columns).map(c => `<th>${c}</th>`).join('')}</tr>
                    </thead>
                    <tbody>
                      ${(currentDataset.rightTable ? currentDataset.rightTable.rows : currentDataset.tableB.rows).map(row => `
                        <tr class="venn-inspect-row" data-row-key="${row.dept_id || row.cust_id}">
                          ${(currentDataset.rightTable ? currentDataset.rightTable.columns : currentDataset.tableB.columns).map(col => `
                            <td>${row[col] === null ? '<span class="null-val">NULL</span>' : row[col]}</td>
                          `).join('')}
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Generated Result Table -->
              <div class="result-table-card">
                <div class="result-card-header">
                  <span class="table-name-pill table-result">Generated Result (${currentOp.name})</span>
                  <span class="result-count">${outputRows.length} Rows</span>
                </div>
                <div class="table-scroll-wrapper">
                  <table class="venn-data-table result-table">
                    <thead>
                      <tr>
                        <th>Status</th>
                        ${this.getResultColumns(outputRows).map(c => `<th>${c}</th>`).join('')}
                      </tr>
                    </thead>
                    <tbody>
                      ${outputRows.map(r => `
                        <tr class="venn-output-row status-${r.status}">
                          <td><span class="status-badge badge-${r.status}">${this.formatStatus(r.status)}</span></td>
                          ${this.getResultColumns(outputRows).map(col => `
                            <td>${r[col] === null ? '<span class="null-val">NULL</span>' : (r[col] || '---')}</td>
                          `).join('')}
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ` : ''}
      `;
    },

    // --- FEATURE #2: WHAT-IF POPOVER RENDERER ---
    renderWhatIfPopover: function () {
      if (!state.activeWhatIfEmpId) return '';
      const empId = state.activeWhatIfEmpId;
      const effectiveEmployees = this.getEffectiveEmployees();
      const emp = effectiveEmployees.find(e => e.emp_id === empId);
      if (!emp) return '';

      return `
        <div class="whatif-popover-backdrop" onclick="window.VennMatrixEngine.closeWhatIf()">
          <div class="whatif-popover-card" onclick="event.stopPropagation()">
            <div class="whatif-popover-header">
              <span class="whatif-title">🧪 What-If Simulator: ${emp.name}</span>
              <button class="whatif-close-btn" onclick="window.VennMatrixEngine.closeWhatIf()">✕</button>
            </div>
            <div class="whatif-popover-body">
              <p class="whatif-intro">
                Reassign <strong>${emp.name}</strong>'s foreign key (<code>dept_id</code>) and watch the row physically animate across relational zones in real-time!
              </p>
              <div class="whatif-buttons-grid">
                <button class="whatif-dept-btn ${emp.dept_id === null ? 'current' : ''}" onclick="window.VennMatrixEngine.mutateRowKey(${empId}, null)">
                  <span class="dept-badge">NULL</span> Orphan (No Dept)
                </button>
                <button class="whatif-dept-btn ${emp.dept_id === 10 ? 'current' : ''}" onclick="window.VennMatrixEngine.mutateRowKey(${empId}, 10)">
                  <span class="dept-badge">#10</span> Engineering (SF)
                </button>
                <button class="whatif-dept-btn ${emp.dept_id === 20 ? 'current' : ''}" onclick="window.VennMatrixEngine.mutateRowKey(${empId}, 20)">
                  <span class="dept-badge">#20</span> Marketing (NY)
                </button>
                <button class="whatif-dept-btn ${emp.dept_id === 30 ? 'current' : ''}" onclick="window.VennMatrixEngine.mutateRowKey(${empId}, 30)">
                  <span class="dept-badge">#30</span> Sales (Austin)
                </button>
                <button class="whatif-dept-btn ${emp.dept_id === 40 ? 'current' : ''}" onclick="window.VennMatrixEngine.mutateRowKey(${empId}, 40)">
                  <span class="dept-badge">#40</span> Research (Boston)
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    },

    // --- SVG VENN GENERATOR (2-TABLE & 3-TABLE EULER) ---
    renderVennSvg: function (activeZones, dataset) {
      const isLeftActive = activeZones.includes('left') || activeZones.includes('left_a');
      const isOverlapActive = activeZones.includes('overlap') || activeZones.includes('center_abc') || activeZones.includes('overlap_ab');
      const isRightActive = activeZones.includes('right') || activeZones.includes('right_b');

      if (state.mode === 'joins') {
        const effectiveEmployees = this.getEffectiveEmployees();
        const evan = effectiveEmployees.find(e => e.emp_id === 5);
        const evanDept = evan ? evan.dept_id : null;

        // Determine Evan's physical coordinate based on What-If key
        let evanX = 110, evanY = 165;
        let evanInOverlap = false;
        if (evanDept !== null) {
          evanInOverlap = true;
          if (evanDept === 40) {
            evanX = 415; evanY = 205; // moves to research
          } else {
            evanX = 270; evanY = 262; // moves into overlap lens
          }
        }

        return `
          <svg viewBox="0 0 640 380" class="venn-interactive-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="vennGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <!-- MATHEMATICALLY EXACT CLICKABLE ZONES -->
            <!-- Left Crescent (Exclusive Left A \\ B) -->
            <path d="M 320,82.8 A 140,140 0 1,0 320,297.2 A 140,140 0 0,0 320,82.8 Z"
                  class="venn-zone-path zone-left ${isLeftActive ? 'zone-active' : 'zone-dim'}"
                  onclick="window.VennMatrixEngine.clickVennZone('left')">
              <title>Left Crescent: Click to isolate Left Anti-Join (A \\ B)</title>
            </path>

            <!-- Center Lens (Intersection A ∩ B) -->
            <path d="M 320,82.8 A 140,140 0 0,1 320,297.2 A 140,140 0 0,1 320,82.8 Z"
                  class="venn-zone-path zone-overlap ${isOverlapActive ? 'zone-active' : 'zone-dim'}"
                  onclick="window.VennMatrixEngine.clickVennZone('overlap')">
              <title>Center Lens: Click to isolate INNER JOIN (A ∩ B)</title>
            </path>

            <!-- Right Crescent (Exclusive Right B \\ A) -->
            <path d="M 320,82.8 A 140,140 0 0,0 320,297.2 A 140,140 0 1,1 320,82.8 Z"
                  class="venn-zone-path zone-right ${isRightActive ? 'zone-active' : 'zone-dim'}"
                  onclick="window.VennMatrixEngine.clickVennZone('right')">
              <title>Right Crescent: Click to isolate Right Anti-Join (B \\ A)</title>
            </path>

            <!-- Circle Outline Borders -->
            <circle cx="230" cy="190" r="140" class="venn-circle-stroke ${isLeftActive ? 'stroke-active' : ''}" pointer-events="none" />
            <circle cx="410" cy="190" r="140" class="venn-circle-stroke ${isRightActive ? 'stroke-active' : ''}" pointer-events="none" />

            <!-- Labels -->
            <text x="140" y="65" class="venn-label-title" pointer-events="none">Table A: Employees</text>
            <text x="500" y="65" class="venn-label-title" pointer-events="none">Table B: Departments</text>

            <!-- Floating Interactive Row Chips (Click to trigger What-If Simulator) -->
            <!-- Evan Vance Chip with Physics Animation -->
            <g class="venn-chip-group ${(evanInOverlap ? isOverlapActive : isLeftActive) ? 'chip-active' : 'chip-dim'} chip-whatif-trigger"
               style="transform: translate(${evanX - 110}px, ${evanY - 165}px); transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);"
               onclick="window.VennMatrixEngine.openWhatIf(5, event)"
               onmouseenter="window.VennMatrixEngine.highlightChip(5)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="110" y="165" width="125" height="32" rx="6" class="venn-row-chip chip-orphan chip-interactive" />
              <text x="172" y="186" class="chip-text">#5 Evan (${evanDept === null ? 'NULL' : evanDept}) 🧪</text>
            </g>

            <!-- Overlap Chips: Alice, Bob, Charlie, Diana -->
            <g class="venn-chip-group ${isOverlapActive ? 'chip-active' : 'chip-dim'} chip-whatif-trigger"
               onclick="window.VennMatrixEngine.openWhatIf(1, event)"
               onmouseenter="window.VennMatrixEngine.highlightChip(1)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="270" y="115" width="105" height="28" rx="6" class="venn-row-chip chip-interactive" />
              <text x="322" y="133" class="chip-text">#1 Alice (10)</text>
            </g>

            <g class="venn-chip-group ${isOverlapActive ? 'chip-active' : 'chip-dim'} chip-whatif-trigger"
               onclick="window.VennMatrixEngine.openWhatIf(2, event)"
               onmouseenter="window.VennMatrixEngine.highlightChip(2)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="270" y="152" width="105" height="28" rx="6" class="venn-row-chip chip-interactive" />
              <text x="322" y="170" class="chip-text">#2 Bob (20)</text>
            </g>

            <g class="venn-chip-group ${isOverlapActive ? 'chip-active' : 'chip-dim'} chip-whatif-trigger"
               onclick="window.VennMatrixEngine.openWhatIf(3, event)"
               onmouseenter="window.VennMatrixEngine.highlightChip(3)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="270" y="189" width="105" height="28" rx="6" class="venn-row-chip chip-interactive" />
              <text x="322" y="207" class="chip-text">#3 Charlie (10)</text>
            </g>

            <g class="venn-chip-group ${isOverlapActive ? 'chip-active' : 'chip-dim'} chip-whatif-trigger"
               onclick="window.VennMatrixEngine.openWhatIf(4, event)"
               onmouseenter="window.VennMatrixEngine.highlightChip(4)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="270" y="226" width="105" height="28" rx="6" class="venn-row-chip chip-interactive" />
              <text x="322" y="244" class="chip-text">#4 Diana (30)</text>
            </g>

            <!-- Zone B (Right Only): Research (Orphan dept_id = 40, 0 employees) -->
            <g class="venn-chip-group ${isRightActive ? 'chip-active' : 'chip-dim'}"
               onmouseenter="window.VennMatrixEngine.highlightChip(40)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="415" y="165" width="125" height="32" rx="6" class="venn-row-chip chip-orphan" />
              <text x="477" y="186" class="chip-text">#40 Research (0)</text>
            </g>
          </svg>
        `;
      } else if (state.mode === 'euler3') {
        // --- FEATURE #3: 3-TABLE EULER DIAGRAM SVG ---
        const isTripleActive = activeZones.includes('center_abc');
        const isChainActive = activeZones.includes('overlap_ab') || activeZones.includes('center_abc');
        const isOrphanActive = activeZones.includes('bottom_c');

        return `
          <svg viewBox="0 0 640 400" class="venn-interactive-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id="clipEulerA"><circle cx="240" cy="160" r="120" /></clipPath>
              <clipPath id="clipEulerB"><circle cx="400" cy="160" r="120" /></clipPath>
              <clipPath id="clipEulerC"><circle cx="320" cy="270" r="120" /></clipPath>
            </defs>

            <!-- 3 Circles Base -->
            <!-- Circle A: Employees (Top Left) -->
            <circle cx="240" cy="160" r="120" class="venn-circle-base ${isChainActive ? 'zone-active' : 'zone-dim'}" />
            <!-- Circle B: Departments (Top Right) -->
            <circle cx="400" cy="160" r="120" class="venn-circle-base ${isChainActive ? 'zone-active' : 'zone-dim'}" />
            <!-- Circle C: Projects (Bottom Center) -->
            <circle cx="320" cy="270" r="120" class="venn-circle-base ${isOrphanActive ? 'zone-active' : 'zone-dim'}" />

            <!-- Central Triple Intersection (A ∩ B ∩ C) -->
            <circle cx="320" cy="270" r="120" clip-path="url(#clipEulerA)" class="venn-lens-overlap ${isTripleActive ? 'zone-active' : 'zone-dim'}"
                    onclick="window.VennMatrixEngine.clickVennZone('center_abc')">
              <title>Click to isolate 3-WAY INNER JOIN (A ∩ B ∩ C)</title>
            </circle>

            <!-- Circle Outlines -->
            <circle cx="240" cy="160" r="120" class="venn-circle-stroke ${isChainActive ? 'stroke-active' : ''}" pointer-events="none" />
            <circle cx="400" cy="160" r="120" class="venn-circle-stroke ${isChainActive ? 'stroke-active' : ''}" pointer-events="none" />
            <circle cx="320" cy="270" r="120" class="venn-circle-stroke ${isOrphanActive ? 'stroke-active' : ''}" pointer-events="none" />

            <!-- Titles -->
            <text x="160" y="55" class="venn-label-title" pointer-events="none">Employees (A)</text>
            <text x="480" y="55" class="venn-label-title" pointer-events="none">Departments (B)</text>
            <text x="320" y="380" class="venn-label-title" text-anchor="middle" pointer-events="none">Projects (C)</text>

            <!-- Row Chips for 3-Table Euler -->
            <!-- Evan Vance (A only) -->
            <g class="venn-chip-group ${isChainActive ? 'chip-active' : 'chip-dim'}">
              <rect x="140" y="145" width="95" height="26" rx="5" class="venn-row-chip chip-orphan" />
              <text x="187" y="162" class="chip-text">Evan (Orphan)</text>
            </g>

            <!-- Central Overlap Chips (Alice & Charlie in Eng, Bob in Mkt, Diana in Sales) -->
            <g class="venn-chip-group ${isTripleActive ? 'chip-active' : 'chip-dim'}"
               onclick="window.VennMatrixEngine.clickVennZone('center_abc')">
              <rect x="270" y="180" width="100" height="24" rx="4" class="venn-row-chip" />
              <text x="320" y="196" class="chip-text">Alice &amp; Charlie</text>
            </g>
            <g class="venn-chip-group ${isTripleActive ? 'chip-active' : 'chip-dim'}"
               onclick="window.VennMatrixEngine.clickVennZone('center_abc')">
              <rect x="270" y="210" width="100" height="24" rx="4" class="venn-row-chip" />
              <text x="320" y="226" class="chip-text">Bob (Mkt)</text>
            </g>

            <!-- Research (B only) -->
            <g class="venn-chip-group ${isChainActive ? 'chip-active' : 'chip-dim'}">
              <rect x="420" y="145" width="95" height="26" rx="5" class="venn-row-chip chip-orphan" />
              <text x="467" y="162" class="chip-text">Research (0)</text>
            </g>

            <!-- AI Quantum Lab (C only - Orphan Project) -->
            <g class="venn-chip-group ${isOrphanActive ? 'chip-active' : 'chip-dim'}"
               onclick="window.VennMatrixEngine.clickVennZone('bottom_c')">
              <rect x="260" y="315" width="120" height="28" rx="6" class="venn-row-chip chip-orphan chip-interactive" />
              <text x="320" y="333" class="chip-text">#104 Quantum (50)</text>
            </g>
          </svg>
        `;
      } else {
        // Set Operations Mode
        return `
          <svg viewBox="0 0 640 380" class="venn-interactive-svg" xmlns="http://www.w3.org/2000/svg">
            <path d="M 320,82.8 A 140,140 0 1,0 320,297.2 A 140,140 0 0,0 320,82.8 Z"
                  class="venn-zone-path zone-left ${isLeftActive ? 'zone-active' : 'zone-dim'}"
                  onclick="window.VennMatrixEngine.clickVennZone('left')">
              <title>Left Crescent: Click to isolate EXCEPT (A \\ B)</title>
            </path>

            <path d="M 320,82.8 A 140,140 0 0,1 320,297.2 A 140,140 0 0,1 320,82.8 Z"
                  class="venn-zone-path zone-overlap ${isOverlapActive ? 'zone-active' : 'zone-dim'}"
                  onclick="window.VennMatrixEngine.clickVennZone('overlap')">
              <title>Center Lens: Click to isolate INTERSECT (A ∩ B)</title>
            </path>

            <path d="M 320,82.8 A 140,140 0 0,0 320,297.2 A 140,140 0 1,1 320,82.8 Z"
                  class="venn-zone-path zone-right ${isRightActive ? 'zone-active' : 'zone-dim'}"
                  onclick="window.VennMatrixEngine.clickVennZone('right')">
              <title>Right Crescent: Click to isolate UNION</title>
            </path>

            <circle cx="230" cy="190" r="140" class="venn-circle-stroke ${isLeftActive ? 'stroke-active' : ''}" pointer-events="none" />
            <circle cx="410" cy="190" r="140" class="venn-circle-stroke ${isRightActive ? 'stroke-active' : ''}" pointer-events="none" />

            <text x="140" y="65" class="venn-label-title" pointer-events="none">Online Customers</text>
            <text x="500" y="65" class="venn-label-title" pointer-events="none">Retail Customers</text>

            <!-- Left Only Chips -->
            <g class="venn-chip-group ${isLeftActive ? 'chip-active' : 'chip-dim'}">
              <rect x="110" y="130" width="110" height="26" rx="5" class="venn-row-chip" />
              <text x="165" y="147" class="chip-text">#101 Alice (Gold)</text>
            </g>
            <g class="venn-chip-group ${isLeftActive ? 'chip-active' : 'chip-dim'}">
              <rect x="110" y="165" width="110" height="26" rx="5" class="venn-row-chip" />
              <text x="165" y="182" class="chip-text">#104 Fiona (Brz)</text>
            </g>
            <g class="venn-chip-group ${isLeftActive ? 'chip-active' : 'chip-dim'}">
              <rect x="110" y="200" width="110" height="26" rx="5" class="venn-row-chip" />
              <text x="165" y="217" class="chip-text">#105 Grace (Gold)</text>
            </g>

            <!-- Overlap Chips -->
            <g class="venn-chip-group ${isOverlapActive ? 'chip-active' : 'chip-dim'}">
              <rect x="270" y="150" width="100" height="28" rx="6" class="venn-row-chip" />
              <text x="320" y="168" class="chip-text">#102 Bob (Slv)</text>
            </g>
            <g class="venn-chip-group ${isOverlapActive ? 'chip-active' : 'chip-dim'}">
              <rect x="270" y="190" width="100" height="28" rx="6" class="venn-row-chip" />
              <text x="320" y="208" class="chip-text">#103 David (Plt)</text>
            </g>

            <!-- Right Only Chips -->
            <g class="venn-chip-group ${isRightActive ? 'chip-active' : 'chip-dim'}">
              <rect x="420" y="130" width="110" height="26" rx="5" class="venn-row-chip" />
              <text x="475" y="147" class="chip-text">#106 Charlie</text>
            </g>
            <g class="venn-chip-group ${isRightActive ? 'chip-active' : 'chip-dim'}">
              <rect x="420" y="165" width="110" height="26" rx="5" class="venn-row-chip" />
              <text x="475" y="182" class="chip-text">#107 Hannah</text>
            </g>
            <g class="venn-chip-group ${isRightActive ? 'chip-active' : 'chip-dim'}">
              <rect x="420" y="200" width="110" height="26" rx="5" class="venn-row-chip" />
              <text x="475" y="217" class="chip-text">#108 Ian</text>
            </g>
          </svg>
        `;
      }
    },

    // --- TAB 2: PRACTICE CHALLENGES ---
    renderChallengesTab: function () {
      const currentChallenge = CHALLENGES[state.currentChallengeIdx];
      const solvedCount = state.solvedChallenges.size;
      const totalCount = CHALLENGES.length;
      const progressPercent = Math.round((solvedCount / totalCount) * 100);
      const isCurrentSolved = state.solvedChallenges.has(currentChallenge.id);

      return `
        <div class="venn-challenges-container">
          <div class="challenge-overview-card">
            <div class="challenge-overview-left">
              <h2 class="challenge-main-heading">🎯 Real-World Relational &amp; Set Challenges</h2>
              <p class="challenge-main-subtext">
                Solve enterprise SQL scenarios from FAANG interviews and production systems. Identify the right join or set operation, verify with row-level physics, and earn XP.
              </p>
            </div>
            <div class="challenge-progress-box">
              <div class="progress-stats-row">
                <span class="progress-stat-label">SOLVED:</span>
                <span class="progress-stat-value">${solvedCount} / ${totalCount}</span>
                <span class="progress-xp-badge">+${solvedCount * 20} XP Earned</span>
              </div>
              <div class="challenge-progress-bar">
                <div class="challenge-progress-fill" style="width: ${progressPercent}%;"></div>
              </div>
              <div class="challenge-reset-row">
                <button class="btn-reset-challenges" onclick="window.VennMatrixEngine.resetChallengeProgress()">Reset Progress</button>
              </div>
            </div>
          </div>

          <div class="challenge-carousel-strip">
            ${CHALLENGES.map((ch, idx) => {
              const isSolved = state.solvedChallenges.has(ch.id);
              const isActive = idx === state.currentChallengeIdx;
              return `
                <button class="challenge-strip-btn ${isActive ? 'active' : ''} ${isSolved ? 'solved' : ''}" onclick="window.VennMatrixEngine.jumpToChallenge(${idx})">
                  <span class="ch-num">${isSolved ? '✓' : '#' + ch.number}</span>
                  <span class="ch-strip-title">${ch.title}</span>
                  <span class="ch-strip-diff ${ch.difficulty.toLowerCase()}">${ch.difficulty}</span>
                </button>
              `;
            }).join('')}
          </div>

          <div class="challenge-active-card">
            <div class="challenge-card-header">
              <div class="challenge-meta-tags">
                <span class="tag-company">${currentChallenge.company}</span>
                <span class="tag-category">${currentChallenge.mode === 'joins' ? 'Multi-Table Join' : 'Set Operation'}</span>
                <span class="tag-difficulty ${currentChallenge.difficulty.toLowerCase()}">${currentChallenge.difficulty}</span>
              </div>
              <div class="challenge-xp-chip">+${currentChallenge.xpReward} XP</div>
            </div>

            <div class="challenge-body">
              <h3 class="challenge-scenario-title">Scenario #${currentChallenge.number}: ${currentChallenge.title}</h3>
              <div class="challenge-scenario-box">
                <p class="scenario-text">${currentChallenge.scenario}</p>
              </div>

              <div class="challenge-prompt-text">${currentChallenge.prompt}</div>

              <div class="challenge-options-grid">
                ${currentChallenge.options.map((opt) => {
                  const isSelected = state.selectedChallengeOption === opt.id;
                  let optClass = '';
                  if (state.challengeAnswerFeedback && isSelected) {
                    optClass = opt.isCorrect ? 'correct' : 'incorrect';
                  } else if (isCurrentSolved && opt.isCorrect) {
                    optClass = 'correct';
                  }

                  return `
                    <button class="challenge-option-btn ${optClass}" onclick="window.VennMatrixEngine.submitChallengeAnswer('${opt.id}')">
                      <span class="opt-letter">${opt.id}</span>
                      <span class="opt-text">${opt.text}</span>
                    </button>
                  `;
                }).join('')}
              </div>

              ${state.challengeAnswerFeedback ? `
                <div class="challenge-feedback-banner ${state.challengeAnswerFeedback.isCorrect ? 'feedback-success' : 'feedback-error'}">
                  <div class="feedback-header">
                    <span class="feedback-icon">${state.challengeAnswerFeedback.isCorrect ? '🎉' : '❌'}</span>
                    <span class="feedback-title">${state.challengeAnswerFeedback.isCorrect ? 'Mastered! Correct Selection' : 'Incorrect Query Logic'}</span>
                  </div>
                  <p class="feedback-explanation">${state.challengeAnswerFeedback.explanation}</p>
                  
                  <div class="feedback-actions">
                    <button class="btn-inspect-diagram" onclick="window.VennMatrixEngine.inspectChallengeInVisualizer('${currentChallenge.mode}', '${currentChallenge.targetOpId}')">
                      🔬 View in Visualizer &amp; Row Physics &rarr;
                    </button>
                    ${state.currentChallengeIdx < CHALLENGES.length - 1 ? `
                      <button class="btn-next-challenge" onclick="window.VennMatrixEngine.jumpToChallenge(${state.currentChallengeIdx + 1})">
                        Next Challenge &rarr;
                      </button>
                    ` : ''}
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    },

    // --- TAB 3: SCHEMA & ENTITY MODELS ---
    renderSchemaTab: function () {
      return `
        <div class="venn-schema-container">
          <div class="schema-header-card">
            <h2 class="schema-main-title">Physical Schema Architecture &amp; Foreign Key Bindings</h2>
            <div class="schema-relationship-banner">
              <span class="banner-icon">🔗</span>
              <span class="banner-text">Employees.dept_id [FK] ───► Departments.dept_id [PK] ◄─── Projects.dept_id [FK]</span>
            </div>
            <p class="schema-subtext">
              Examine database structure, column types, primary &amp; foreign key constraints, and orphan anomaly conditions that govern join and set behavior.
            </p>
          </div>

          <div class="schema-tables-grid">
            <div class="schema-entity-card">
              <div class="entity-card-header">
                <div class="entity-title-row">
                  <span class="entity-name">Employees</span>
                  <span class="entity-alias">Alias: <code>e</code></span>
                </div>
                <span class="entity-type-badge">Referencing Child Entity (Many)</span>
              </div>
              <div class="entity-card-body">
                <p class="entity-desc">Stores individual personnel records. Evan Vance (#5) has dept_id = NULL.</p>
                <div class="entity-columns-table-wrapper">
                  <table class="schema-columns-table">
                    <thead><tr><th>Key</th><th>Column</th><th>Type</th><th>Description</th></tr></thead>
                    <tbody>
                      <tr><td><span class="key-badge pk">PK</span></td><td><code>emp_id</code></td><td>INT</td><td>Unique employee record identifier</td></tr>
                      <tr><td></td><td><code>name</code></td><td>VARCHAR(50)</td><td>Full legal employee name</td></tr>
                      <tr><td><span class="key-badge fk">FK</span></td><td><code>dept_id</code></td><td>INT (NULL)</td><td>Foreign key to Departments.dept_id</td></tr>
                      <tr><td></td><td><code>salary</code></td><td>VARCHAR(20)</td><td>Annual base salary</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="schema-entity-card">
              <div class="entity-card-header">
                <div class="entity-title-row">
                  <span class="entity-name">Departments</span>
                  <span class="entity-alias">Alias: <code>d</code></span>
                </div>
                <span class="entity-type-badge">Referenced Parent Entity (One)</span>
              </div>
              <div class="entity-card-body">
                <p class="entity-desc">Stores organizational business divisions. Research (#40) has 0 employees.</p>
                <div class="entity-columns-table-wrapper">
                  <table class="schema-columns-table">
                    <thead><tr><th>Key</th><th>Column</th><th>Type</th><th>Description</th></tr></thead>
                    <tbody>
                      <tr><td><span class="key-badge pk">PK</span></td><td><code>dept_id</code></td><td>INT</td><td>Primary key; unique department code</td></tr>
                      <tr><td></td><td><code>dept_name</code></td><td>VARCHAR(50)</td><td>Division title</td></tr>
                      <tr><td></td><td><code>location</code></td><td>VARCHAR(50)</td><td>Office campus city</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    },

    // --- TAB 4: CONCEPT MASTERY GUIDE ---
    renderConceptsTab: function () {
      return `
        <div class="venn-concepts-container">
          <div class="concepts-header-card">
            <h2 class="concepts-main-title">🧠 Relational Theory &amp; Join Performance Guide</h2>
            <p class="concepts-subtext">
              Crucial production SQL design principles, optimizer execution models, and interview traps to elevate your database engineering skills.
            </p>
          </div>

          <div class="concepts-grid">
            <div class="concept-card">
              <div class="concept-card-header">
                <div class="concept-card-title-row">
                  <span class="concept-icon">⚠️</span>
                  <h3 class="concept-title">The "ON vs WHERE" Filter Trap in Outer Joins</h3>
                </div>
                <span class="concept-tag">Critical Join Trap</span>
              </div>
              <div class="concept-card-body">
                <div class="concept-summary-box">
                  <p class="summary-text">Placing right-table filters in WHERE silently converts a LEFT JOIN into an INNER JOIN.</p>
                </div>
                <div class="concept-section">
                  <h4 class="section-subtitle">The Engineering Trap:</h4>
                  <p class="section-body">When you write WHERE d.location = 'San Francisco', Evan Vance (whose department fields are NULL) fails the filter because NULL = 'SF' evaluates to UNKNOWN/FALSE. Evan is silently dropped!</p>
                </div>
                <div class="concept-section">
                  <h4 class="section-subtitle">Production Solution:</h4>
                  <p class="section-body">Place the condition inside the ON clause: <code>LEFT JOIN Departments d ON e.dept_id = d.dept_id AND d.location = 'San Francisco'</code>.</p>
                </div>
              </div>
            </div>

            <div class="concept-card">
              <div class="concept-card-header">
                <div class="concept-card-title-row">
                  <span class="concept-icon">⚡</span>
                  <h3 class="concept-title">The 3-Valued Logic NULL Paradox</h3>
                </div>
                <span class="concept-tag">Relational Theory</span>
              </div>
              <div class="concept-card-body">
                <div class="concept-summary-box">
                  <p class="summary-text">NULL is not a value; it is an unknown state. Therefore NULL = NULL is UNKNOWN, never TRUE.</p>
                </div>
                <div class="concept-section">
                  <h4 class="section-subtitle">The Engineering Trap:</h4>
                  <p class="section-body">Two rows with NULL keys never match in an INNER JOIN. To match NULLs, use NULL-safe equality: <code>&lt;=&gt;</code> in MySQL or <code>IS NOT DISTINCT FROM</code> in PostgreSQL/ANSI.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    },

    getResultColumns: function (rows) {
      if (!rows || rows.length === 0) return [];
      const keys = Object.keys(rows[0]).filter(k => k !== 'status');
      return keys;
    },

    formatStatus: function (status) {
      switch (status) {
        case 'matched': return '✓ MATCHED';
        case 'null_padded': return '⊘ NULL-PADDED';
        case 'exclusive': return '★ EXCLUSIVE';
        case 'cartesian': return '× PRODUCT';
        case 'source_a': return 'A (ONLINE)';
        case 'source_b': return 'B (RETAIL)';
        default: return status.toUpperCase();
      }
    },

    escapeHtml: function (str) {
      return (str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }
  };

  // Expose globally
  window.VennMatrixEngine = VennMatrixEngine;
})();
