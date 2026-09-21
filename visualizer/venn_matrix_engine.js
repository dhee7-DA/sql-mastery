// =============================================================================
// SQL FOUNDRY — INTERACTIVE VENN & EULER DIAGRAM MATRIX
// Dynamic Live-Row Relational Set Physics, Challenges, Schema & Concept Hub
// =============================================================================

(function () {
  'use strict';

  // --- DATASETS ---
  const DATASETS = {
    joins: {
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
          sql: `SELECT e.emp_id, e.name, d.dept_name, d.location\nFROM Employees AS e\nINNER JOIN Departments AS d\n  ON e.dept_id = d.dept_id;`,
          tagline: 'Matches only where keys exist on BOTH sides',
          explanation: 'Only rows with a valid relational match across both tables survive. Unmatched rows (Evan with NULL dept, and Research with 0 employees) are silently dropped.',
          gotcha: 'NULL never matches NULL in SQL! If dept_id is NULL on both tables, INNER JOIN drops them because NULL = NULL yields UNKNOWN, not TRUE.',
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
          sql: `SELECT e.emp_id, e.name, d.dept_name, d.location\nFROM Employees AS e\nLEFT JOIN Departments AS d\n  ON e.dept_id = d.dept_id;`,
          tagline: 'Preserves EVERY row from Left; pads missing Right with NULL',
          explanation: 'All 5 employees are guaranteed in output. Alice, Bob, Charlie, and Diana receive department metadata. Evan has no department, so his department columns are safely padded with NULL.',
          gotcha: 'Filtering Table B in WHERE turns a LEFT JOIN into an INNER JOIN! If you write WHERE d.location = \'San Francisco\', Evan is dropped because NULL = \'SF\' is FALSE. Put filters in the ON clause instead!',
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
          sql: `SELECT e.emp_id, e.name, d.dept_name, d.location\nFROM Employees AS e\nRIGHT JOIN Departments AS d\n  ON e.dept_id = d.dept_id;`,
          tagline: 'Preserves EVERY row from Right; pads missing Left with NULL',
          explanation: 'All 4 departments are guaranteed in output. Engineering, Marketing, and Sales receive employee records. Research has 0 employees, so its employee columns are padded with NULL.',
          gotcha: 'RIGHT JOINs are rarely used in corporate SQL style guides because humans read left-to-right. Best practice: swap table order and write as LEFT JOIN for cleaner maintainability.',
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
          sql: `-- Standard ANSI SQL\nSELECT e.emp_id, e.name, d.dept_name, d.location\nFROM Employees AS e\nFULL OUTER JOIN Departments AS d\n  ON e.dept_id = d.dept_id;\n\n-- MySQL 8.0 Emulation (via UNION):\nSELECT e.emp_id, e.name, d.dept_name, d.location FROM Employees e LEFT JOIN Departments d ON e.dept_id = d.dept_id\nUNION\nSELECT e.emp_id, e.name, d.dept_name, d.location FROM Employees e RIGHT JOIN Departments d ON e.dept_id = d.dept_id;`,
          tagline: 'Preserves every row from BOTH sides with NULL-padding',
          explanation: 'Combines the output of LEFT JOIN and RIGHT JOIN. Alice, Bob, Charlie, Diana match normally. Evan appears with NULL dept info. Research appears with NULL employee info. Total 6 rows.',
          gotcha: 'MySQL natively lacks FULL OUTER JOIN syntax! In MySQL, you emulate it by taking a LEFT JOIN, a RIGHT JOIN, and combining them with UNION (which deduplicates the intersection).',
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
          sql: `SELECT e.emp_id, e.name, e.salary\nFROM Employees AS e\nLEFT JOIN Departments AS d\n  ON e.dept_id = d.dept_id\nWHERE d.dept_id IS NULL;`,
          tagline: 'Isolates rows in Left table that have NO match in Right',
          explanation: 'The ultimate data-quality filter. Discards all employees with active departments. Only catches Evan Vance (#5), who has no matching department key.',
          gotcha: 'Always filter the PRIMARY KEY of Table B with IS NULL in the WHERE clause. Filtering a nullable column could trigger false positives if that column naturally contains NULLs.',
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
          sql: `SELECT d.dept_id, d.dept_name, d.location\nFROM Employees AS e\nRIGHT JOIN Departments AS d\n  ON e.dept_id = d.dept_id\nWHERE e.emp_id IS NULL;`,
          tagline: 'Isolates rows in Right table that have ZERO references from Left',
          explanation: 'Finds orphan departments with 0 assigned staff. Research (#40, Boston) has 0 employees and is caught exclusively.',
          gotcha: 'Useful for auditing unused lookups, dormant categories, or empty tenant partitions in enterprise databases before dropping old tables.',
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
          sql: `SELECT e.name, d.dept_name\nFROM Employees AS e\nCROSS JOIN Departments AS d;`,
          tagline: 'Pairs EVERY row from Left with EVERY row from Right',
          explanation: 'Creates a full Cartesian product. 5 employees × 4 departments = 20 total output rows. No ON condition exists.',
          gotcha: 'Dangerous in production! Joining two tables with 10,000 rows each produces 100,000,000 rows, exhausting server memory and crashing database instances.',
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
    setOps: {
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
          sql: `SELECT cust_id, name, tier FROM Customers_Online\nUNION\nSELECT cust_id, name, tier FROM Customers_Retail\nORDER BY cust_id;`,
          tagline: 'Merges both sets and REMOVES duplicate records',
          explanation: 'Combines Online and Retail customer lists. Bob (#102) and David (#103) exist in both channels, so UNION eliminates their duplicates. 8 unique customers returned.',
          gotcha: 'UNION performs an expensive sorting and hash-deduplication pass in memory. If you know sets are disjoint, or do not care about duplicates, use UNION ALL for faster execution.',
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
          sql: `SELECT cust_id, name, tier FROM Customers_Online\nUNION ALL\nSELECT cust_id, name, tier FROM Customers_Retail\nORDER BY cust_id;`,
          tagline: 'Stacks both sets directly without deduplication',
          explanation: 'All 5 online records and all 5 retail records are appended together. Bob (#102) and David (#103) appear twice. Total: 10 rows.',
          gotcha: 'UNION ALL is significantly faster than UNION because the database skips the expensive sort-and-distinct pipeline pass. Always default to UNION ALL unless deduplication is required.',
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
          sql: `-- ANSI SQL / PostgreSQL / SQL Server / Oracle:\nSELECT cust_id, name, tier FROM Customers_Online\nINTERSECT\nSELECT cust_id, name, tier FROM Customers_Retail;\n\n-- MySQL 8.0 Emulation (via INNER JOIN):\nSELECT o.cust_id, o.name, o.tier\nFROM Customers_Online o\nINNER JOIN Customers_Retail r ON o.cust_id = r.cust_id;`,
          tagline: 'Returns only records present in BOTH datasets',
          explanation: 'Finds omnichannel shoppers who buy both Online and Retail. Only Bob (#102) and David (#103) exist in both tables. Exactly 2 rows returned.',
          gotcha: 'INTERSECT compares ALL selected columns, not just primary keys! If Bob is \'Silver\' in Online but has been updated to \'Gold\' in Retail, standard INTERSECT considers them different and drops them!',
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
          sql: `-- ANSI SQL / PostgreSQL / SQL Server (EXCEPT):\nSELECT cust_id, name, tier FROM Customers_Online\nEXCEPT\nSELECT cust_id, name, tier FROM Customers_Retail;\n\n-- Oracle uses MINUS keyword instead of EXCEPT\n\n-- MySQL 8.0 Emulation (via LEFT JOIN):\nSELECT o.cust_id, o.name, o.tier\nFROM Customers_Online o\nLEFT JOIN Customers_Retail r ON o.cust_id = r.cust_id\nWHERE r.cust_id IS NULL;`,
          tagline: 'Returns records in the first set that do NOT exist in the second',
          explanation: 'Finds pure Online-only customers. Alice (#101), Fiona (#104), and Grace (#105) have never shopped retail. Bob and David are removed because they exist in retail.',
          gotcha: 'Order of tables matters! A EXCEPT B produces Online-only shoppers (3 rows). B EXCEPT A produces Retail-only shoppers (Charlie, Hannah, Ian - 3 rows).',
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

  // --- SCHEMA METADATA ---
  const SCHEMA_INFO = {
    joins: {
      title: 'Relational Schema: Employees & Departments',
      relationship: 'Employees.dept_id (Foreign Key, Many) ───► Departments.dept_id (Primary Key, One)',
      tables: [
        {
          name: 'Employees',
          alias: 'e',
          type: 'Referencing Child Entity (Many)',
          description: 'Stores individual personnel records. Each employee can belong to at most one department.',
          orphanNotice: 'Row #5 (Evan Vance) has dept_id = NULL. He is an orphan record with no assigned department.',
          columns: [
            { name: 'emp_id', type: 'INT', key: 'PK', desc: 'Primary key; unique employee ID' },
            { name: 'name', type: 'VARCHAR(50)', key: '', desc: 'Full legal employee name' },
            { name: 'dept_id', type: 'INT', key: 'FK', desc: 'Foreign key to Departments.dept_id (NULLABLE)' },
            { name: 'salary', type: 'VARCHAR(20)', key: '', desc: 'Annual base compensation' }
          ]
        },
        {
          name: 'Departments',
          alias: 'd',
          type: 'Referenced Parent Entity (One)',
          description: 'Stores corporate division units and geographic locations.',
          orphanNotice: 'Row #40 (Research) has 0 employees referencing it. It is an unreferenced parent division.',
          columns: [
            { name: 'dept_id', type: 'INT', key: 'PK', desc: 'Primary key; unique department code' },
            { name: 'dept_name', type: 'VARCHAR(50)', key: '', desc: 'Division title (Engineering, Sales, etc.)' },
            { name: 'location', type: 'VARCHAR(50)', key: '', desc: 'Office campus headquarters city' }
          ]
        }
      ]
    },
    setOps: {
      title: 'Set Schema: Customers_Online & Customers_Retail',
      relationship: 'Homogeneous schemas compared vertically via Mathematical Set Operations',
      tables: [
        {
          name: 'Customers_Online',
          alias: 'online',
          type: 'E-Commerce Channel Entity',
          description: 'Users who placed digital orders via the web application or mobile app.',
          orphanNotice: 'Alice (#101), Fiona (#104), and Grace (#105) shop exclusively online.',
          columns: [
            { name: 'cust_id', type: 'INT', key: 'PK', desc: 'Primary key; unique customer number' },
            { name: 'name', type: 'VARCHAR(50)', key: '', desc: 'Registered customer full name' },
            { name: 'tier', type: 'VARCHAR(20)', key: '', desc: 'Loyalty status (Gold, Silver, Platinum, Bronze)' }
          ]
        },
        {
          name: 'Customers_Retail',
          alias: 'retail',
          type: 'Physical Store Channel Entity',
          description: 'Shoppers who checked out at physical flagship retail stores.',
          orphanNotice: 'Charlie (#106), Hannah (#107), and Ian (#108) shop exclusively in brick-and-mortar stores.',
          columns: [
            { name: 'cust_id', type: 'INT', key: 'PK', desc: 'Primary key; unique customer number' },
            { name: 'name', type: 'VARCHAR(50)', key: '', desc: 'Registered customer full name' },
            { name: 'tier', type: 'VARCHAR(20)', key: '', desc: 'Loyalty status tier' }
          ]
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

  // --- CONCEPT MASTERY FLASHCARDS ---
  const CONCEPTS = [
    {
      id: 'c_on_where',
      title: 'The "ON vs WHERE" Filter Trap in Outer Joins',
      tag: 'Critical Join Trap',
      icon: '⚠️',
      summary: 'Placing right-table filters in the WHERE clause silently transforms a LEFT JOIN into an INNER JOIN.',
      problem: 'When you write `LEFT JOIN Departments d ON e.dept_id = d.dept_id WHERE d.location = \'San Francisco\'`, the database first computes the LEFT JOIN (padding Evan with NULL). Then the WHERE clause evaluates `d.location = \'San Francisco\'`. For Evan, `NULL = \'San Francisco\'` evaluates to FALSE/UNKNOWN, so Evan is silently dropped!',
      solution: 'Move filters on the preserved/optional table into the `ON` clause: `LEFT JOIN Departments d ON e.dept_id = d.dept_id AND d.location = \'San Francisco\'`. This guarantees all employees are preserved.',
      codeBad: `-- ❌ BUG: Silently acts as INNER JOIN\nSELECT e.name, d.location\nFROM Employees e\nLEFT JOIN Departments d ON e.dept_id = d.dept_id\nWHERE d.location = 'San Francisco';`,
      codeGood: `-- ✅ CORRECT: Preserves all employees\nSELECT e.name, d.location\nFROM Employees e\nLEFT JOIN Departments d ON e.dept_id = d.dept_id\n  AND d.location = 'San Francisco';`
    },
    {
      id: 'c_null_paradox',
      title: 'The 3-Valued Logic NULL Paradox',
      tag: 'Relational Theory',
      icon: '⚡',
      summary: 'NULL is not a value; it is a state of unknown data. Therefore, `NULL = NULL` is UNKNOWN, never TRUE.',
      problem: 'If two tables both contain a row where `dept_id` is NULL, an `INNER JOIN ... ON e.dept_id = d.dept_id` will NEVER match them! In SQL\'s 3-valued logic, `NULL = NULL` yields `UNKNOWN`, which fails the join predicate.',
      solution: 'If you ever need to match rows where keys may be NULL on both sides, use NULL-safe equality operators: `<=>` in MySQL, or `IS NOT DISTINCT FROM` in PostgreSQL and modern ANSI SQL.',
      codeBad: `-- ❌ Will never match two NULL keys\nSELECT *\nFROM TableA a\nINNER JOIN TableB b ON a.nullable_key = b.nullable_key;`,
      codeGood: `-- ✅ Matches values AND matches NULL to NULL\n-- PostgreSQL / ANSI:\nSELECT * FROM TableA a INNER JOIN TableB b ON a.nullable_key IS NOT DISTINCT FROM b.nullable_key;\n-- MySQL:\nSELECT * FROM TableA a INNER JOIN TableB b ON a.nullable_key <=> b.nullable_key;`
    },
    {
      id: 'c_antijoin_battle',
      title: 'Anti-Join Battle: NOT EXISTS vs LEFT JOIN / IS NULL vs NOT IN',
      tag: 'Performance & Safety',
      icon: '🛡️',
      summary: 'Why NOT IN is dangerous when NULLs exist, and why NOT EXISTS is the industry gold standard.',
      problem: 'If you write `WHERE emp_id NOT IN (SELECT emp_id FROM ...)`, and that subquery returns even a SINGLE row containing `NULL`, the entire NOT IN expression evaluates to `UNKNOWN` for every row, returning 0 total records!',
      solution: 'Always use `NOT EXISTS` or `LEFT JOIN ... WHERE right.pk IS NULL`. Modern query optimizers (Postgres, MySQL 8, Oracle) rewrite them into Hash Anti-Joins for maximum execution performance.',
      codeBad: `-- ⚠️ DANGEROUS: If subquery returns a NULL, 0 rows returned!\nSELECT * FROM Employees\nWHERE dept_id NOT IN (SELECT dept_id FROM Departments);`,
      codeGood: `-- ✅ SAFE & FAST: Handled by Hash Anti-Join engine\nSELECT * FROM Employees e\nWHERE NOT EXISTS (\n  SELECT 1 FROM Departments d WHERE d.dept_id = e.dept_id\n);`
    },
    {
      id: 'c_union_perf',
      title: 'UNION vs UNION ALL: Memory & Sorting Architecture',
      tag: 'Query Optimization',
      icon: '🚀',
      summary: 'UNION enforces mathematical set purity via expensive sorting; UNION ALL is a high-speed stream append.',
      problem: '`UNION` forces the database engine to allocate temporary memory buffers or spill to disk to sort and hash all rows to eliminate duplicates ($O(N \\log N)$ complexity). On multi-gigabyte datasets, this can cause out-of-memory errors.',
      solution: 'Default to `UNION ALL` ($O(N)$ direct stream concatenation). Only use `UNION` when business requirements explicitly mandate unique row deduplication.',
      codeBad: `-- ❌ Unnecessary sort & hash overhead\nSELECT transaction_id, amount FROM Sales_2025\nUNION\nSELECT transaction_id, amount FROM Sales_2026;`,
      codeGood: `-- ✅ Blazing fast stream append (disjoint by year!)\nSELECT transaction_id, amount FROM Sales_2025\nUNION ALL\nSELECT transaction_id, amount FROM Sales_2026;`
    }
  ];

  // --- STATE ---
  const state = {
    mode: 'joins', // 'joins' | 'setOps'
    selectedOpIndex: 0,
    activeSubtab: 'visualizer', // 'visualizer' | 'challenges' | 'schema' | 'concepts'
    hoveredChipId: null,
    currentChallengeIdx: 0,
    solvedChallenges: new Set(),
    selectedChallengeOption: null,
    challengeAnswerFeedback: null
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

    setMode: function (mode) {
      if (state.mode === mode) return;
      state.mode = mode;
      state.selectedOpIndex = 0;
      state.hoveredChipId = null;
      this.render();
      if (window.AudioFX) window.AudioFX.playPop();
    },

    selectOp: function (index) {
      state.selectedOpIndex = index;
      state.hoveredChipId = null;
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
          // Left crescent -> Left Anti-Join
          const idx = DATASETS.joins.operations.findIndex(o => o.id === 'left_antijoin');
          if (idx !== -1) this.selectOp(idx);
        } else if (zone === 'overlap') {
          // Center lens -> Inner Join
          const idx = DATASETS.joins.operations.findIndex(o => o.id === 'inner_join');
          if (idx !== -1) this.selectOp(idx);
        } else if (zone === 'right') {
          // Right crescent -> Right Anti-Join
          const idx = DATASETS.joins.operations.findIndex(o => o.id === 'right_antijoin');
          if (idx !== -1) this.selectOp(idx);
        }
      } else {
        if (zone === 'left') {
          // Left crescent -> EXCEPT
          const idx = DATASETS.setOps.operations.findIndex(o => o.id === 'except');
          if (idx !== -1) this.selectOp(idx);
        } else if (zone === 'overlap') {
          // Center lens -> INTERSECT
          const idx = DATASETS.setOps.operations.findIndex(o => o.id === 'intersect');
          if (idx !== -1) this.selectOp(idx);
        } else if (zone === 'right') {
          // Right crescent -> UNION
          const idx = DATASETS.setOps.operations.findIndex(o => o.id === 'union');
          if (idx !== -1) this.selectOp(idx);
        }
      }
      if (window.AudioFX) window.AudioFX.playPop();
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
      if (navigator.clipboard && currentOp) {
        navigator.clipboard.writeText(currentOp.sql).then(() => {
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

      const sqlInput = document.getElementById('sqlInput');
      if (sqlInput) {
        sqlInput.value = currentOp.sql.trim();
      }

      if (typeof window.switchMainView === 'function') {
        window.switchMainView('viewStudio');
      }

      if (typeof window.parseAndBuildPipeline === 'function') {
        window.parseAndBuildPipeline(currentOp.sql);
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

          // Award XP via soundFX if available
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
      const currentOp = currentDataset.operations[state.selectedOpIndex];
      const activeZones = currentOp ? (currentOp.activeZones || []) : [];

      const outputRows = currentOp ? currentOp.outputGenerator(
        currentDataset.leftTable.rows,
        currentDataset.rightTable.rows
      ) : [];

      const solvedCount = state.solvedChallenges.size;
      const totalChallenges = CHALLENGES.length;

      container.innerHTML = `
        <div class="venn-matrix-wrapper">
          <!-- Top Header Strip -->
          <div class="venn-matrix-header">
            <div class="venn-header-left">
              <div class="venn-title-row">
                <span class="venn-icon">⭕</span>
                <h1 class="venn-title">Relational Set &amp; Join Topology Matrix</h1>
                <span class="venn-status-pill">Interactive Row Physics &amp; Practice</span>
              </div>
              <p class="venn-subtitle">
                Master physical intersections, outer preserves, anti-join exclusions, schema keys, and real business challenges in one unified hub.
              </p>
            </div>

            <!-- Mode Switcher: Joins vs Set Operations -->
            <div class="venn-mode-toggle">
              <button class="venn-mode-btn ${state.mode === 'joins' ? 'active' : ''}" onclick="window.VennMatrixEngine.setMode('joins')">
                <span class="mode-icon">🔗</span> Multi-Table Joins
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
      return `
        <!-- Compact Schema Key Indicator Strip -->
        <div class="venn-schema-key-strip">
          <div class="schema-key-info">
            <span class="key-pill-label">RELATIONAL BINDING:</span>
            ${state.mode === 'joins' ? `
              <span class="key-pill fk">Employees.dept_id [FK]</span>
              <span class="key-arrow">───►</span>
              <span class="key-pill pk">Departments.dept_id [PK]</span>
            ` : `
              <span class="key-pill set">Customers_Online (5 Rows)</span>
              <span class="key-arrow">⋃</span>
              <span class="key-pill set">Customers_Retail (5 Rows)</span>
            `}
          </div>
          <div class="schema-orphan-links">
            ${state.mode === 'joins' ? `
              <button class="orphan-action-pill left" onclick="window.VennMatrixEngine.clickVennZone('left')" title="Click to isolate Left Orphan">
                ⚠️ Orphan Employee: Evan (#5, dept_id IS NULL)
              </button>
              <button class="orphan-action-pill right" onclick="window.VennMatrixEngine.clickVennZone('right')" title="Click to isolate Right Orphan">
                ⚠️ Orphan Dept: Research (#40, 0 staff)
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

        <!-- Main Interactive Stage: SVG Canvas & Details Grid -->
        <div class="venn-stage-grid">
          <!-- Left Panel: Interactive Dynamic SVG Venn Diagram with Clickable Zones -->
          <div class="venn-canvas-card">
            <div class="venn-canvas-header">
              <div class="venn-canvas-title">
                <span>${currentOp.name}</span>
                <span class="op-symbol-badge">${currentOp.symbol}</span>
              </div>
              <span class="venn-canvas-hint">💡 Click any circle region directly to switch operations!</span>
            </div>

            <div class="venn-svg-container">
              ${this.renderVennSvg(activeZones, currentDataset)}
            </div>

            <!-- Legend with Direct Click Shortcuts -->
            <div class="venn-legend">
              <button class="legend-chip left ${activeZones.includes('left') ? 'active' : ''}" onclick="window.VennMatrixEngine.clickVennZone('left')">
                <span class="indicator"></span> Table A: ${currentDataset.leftTable.name} (Click A \\ B)
              </button>
              <button class="legend-chip overlap ${activeZones.includes('overlap') ? 'active' : ''}" onclick="window.VennMatrixEngine.clickVennZone('overlap')">
                <span class="indicator"></span> Overlap A ∩ B (Click Inner/Intersect)
              </button>
              <button class="legend-chip right ${activeZones.includes('right') ? 'active' : ''}" onclick="window.VennMatrixEngine.clickVennZone('right')">
                <span class="indicator"></span> Table B: ${currentDataset.rightTable.name} (Click B \\ A)
              </button>
            </div>
          </div>

          <!-- Right Panel: Operation Intelligence & SQL Generator -->
          <div class="venn-intel-card">
            <div class="venn-intel-header">
              <div class="intel-tagline">${currentOp.tagline}</div>
            </div>

            <div class="venn-concept-box">
              <p class="venn-explanation">${currentOp.explanation}</p>
            </div>

            <!-- SQL Code Generator Card -->
            <div class="venn-sql-box">
              <div class="venn-sql-header">
                <span class="sql-label">PRODUCTION ANSI SQL CODE</span>
                <div class="sql-actions">
                  <button id="btnCopyVennSQL" class="venn-btn-copy" onclick="window.VennMatrixEngine.copySQL()">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    Copy SQL
                  </button>
                  <button class="venn-btn-studio" onclick="window.VennMatrixEngine.runInStudio()">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    Run in Studio
                  </button>
                </div>
              </div>
              <pre class="venn-code-block"><code>${this.escapeHtml(currentOp.sql)}</code></pre>
            </div>

            <!-- Gotcha Alert Strip -->
            <div class="venn-gotcha-strip">
              <div class="gotcha-badge">⚠️ Relational Trap &amp; Internals:</div>
              <div class="gotcha-text">${currentOp.gotcha}</div>
            </div>
          </div>
        </div>

        <!-- Bottom Stage: Side-by-Side Source Tables & Output Diff Matrix -->
        <div class="venn-tables-matrix">
          <div class="venn-tables-header">
            <span class="matrix-title">Physical Transformation Inspection (Input &rarr; Output)</span>
            <span class="matrix-tally">Output: <strong>${outputRows.length}</strong> Rows Generated</span>
          </div>

          <div class="venn-tables-grid">
            <!-- Source Table A -->
            <div class="source-table-card">
              <div class="source-card-header">
                <span class="table-name-pill table-a">Left (A): ${currentDataset.leftTable.name}</span>
                <span class="row-count">${currentDataset.leftTable.rows.length} rows</span>
              </div>
              <div class="table-scroll-wrapper">
                <table class="venn-data-table">
                  <thead>
                    <tr>
                      ${currentDataset.leftTable.columns.map(c => `<th>${c}</th>`).join('')}
                    </tr>
                  </thead>
                  <tbody>
                    ${currentDataset.leftTable.rows.map(row => `
                      <tr class="venn-inspect-row" data-row-key="${row.emp_id || row.cust_id}">
                        ${currentDataset.leftTable.columns.map(col => `
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
                <span class="table-name-pill table-b">Right (B): ${currentDataset.rightTable.name}</span>
                <span class="row-count">${currentDataset.rightTable.rows.length} rows</span>
              </div>
              <div class="table-scroll-wrapper">
                <table class="venn-data-table">
                  <thead>
                    <tr>
                      ${currentDataset.rightTable.columns.map(c => `<th>${c}</th>`).join('')}
                    </tr>
                  </thead>
                  <tbody>
                    ${currentDataset.rightTable.rows.map(row => `
                      <tr class="venn-inspect-row" data-row-key="${row.dept_id || row.cust_id}">
                        ${currentDataset.rightTable.columns.map(col => `
                          <td>${row[col] === null ? '<span class="null-val">NULL</span>' : row[col]}</td>
                        `).join('')}
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Result Output Table -->
            <div class="result-table-card">
              <div class="result-card-header">
                <span class="table-name-pill table-result">Generated Result (${currentOp.name})</span>
                <span class="result-count">${outputRows.length} Rows Produced</span>
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
      `;
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
          <!-- Challenge Header & Stats -->
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

          <!-- Challenge Carousel Strip -->
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

          <!-- Active Challenge Card -->
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

              <!-- Options Grid -->
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

              <!-- Feedback & Actions Area -->
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
      const currentSchema = SCHEMA_INFO[state.mode];

      return `
        <div class="venn-schema-container">
          <div class="schema-header-card">
            <h2 class="schema-main-title">${currentSchema.title}</h2>
            <div class="schema-relationship-banner">
              <span class="banner-icon">🔗</span>
              <span class="banner-text">${currentSchema.relationship}</span>
            </div>
            <p class="schema-subtext">
              Examine the exact database structure, data types, primary &amp; foreign key constraints, and orphan anomaly conditions that govern join and set behavior.
            </p>
          </div>

          <!-- Entity Tables Side-by-Side Grid -->
          <div class="schema-tables-grid">
            ${currentSchema.tables.map(tbl => `
              <div class="schema-entity-card">
                <div class="entity-card-header">
                  <div class="entity-title-row">
                    <span class="entity-name">${tbl.name}</span>
                    <span class="entity-alias">Alias: <code>${tbl.alias}</code></span>
                  </div>
                  <span class="entity-type-badge">${tbl.type}</span>
                </div>

                <div class="entity-card-body">
                  <p class="entity-desc">${tbl.description}</p>

                  <div class="entity-columns-table-wrapper">
                    <table class="schema-columns-table">
                      <thead>
                        <tr>
                          <th>Key</th>
                          <th>Column Name</th>
                          <th>Data Type</th>
                          <th>Semantic Role &amp; Constraints</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${tbl.columns.map(col => `
                          <tr>
                            <td>
                              ${col.key === 'PK' ? '<span class="key-badge pk">PK</span>' : ''}
                              ${col.key === 'FK' ? '<span class="key-badge fk">FK</span>' : ''}
                            </td>
                            <td><code>${col.name}</code></td>
                            <td><span class="col-type">${col.type}</span></td>
                            <td class="col-desc">${col.desc}</td>
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  </div>

                  <!-- Orphan / Anomaly Warning Notice -->
                  <div class="entity-anomaly-box">
                    <div class="anomaly-label">⚠️ Relational Set Anomaly:</div>
                    <div class="anomaly-text">${tbl.orphanNotice}</div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Relational Connector Diagram Card -->
          <div class="schema-connector-card">
            <div class="connector-header">
              <span class="connector-title">Cardinality &amp; Physical Key Binding Map</span>
            </div>
            <div class="connector-content">
              ${state.mode === 'joins' ? `
                <div class="connector-diagram-box">
                  <div class="entity-node left">
                    <span class="node-title">Employees (Child)</span>
                    <div class="node-row matched">Alice Chen &rarr; dept_id: 10</div>
                    <div class="node-row matched">Bob Smith &rarr; dept_id: 20</div>
                    <div class="node-row matched">Charlie Kim &rarr; dept_id: 10</div>
                    <div class="node-row matched">Diana Ross &rarr; dept_id: 30</div>
                    <div class="node-row orphan">⚡ Evan Vance &rarr; dept_id: NULL (Orphan Child)</div>
                  </div>
                  <div class="connector-arrows">
                    <div class="arrow-line">────── [FK 🔗 PK] ──────►</div>
                    <span class="cardinality-text">Many-to-One (N:1)</span>
                  </div>
                  <div class="entity-node right">
                    <span class="node-title">Departments (Parent)</span>
                    <div class="node-row matched">dept_id: 10 &larr; Engineering</div>
                    <div class="node-row matched">dept_id: 20 &larr; Marketing</div>
                    <div class="node-row matched">dept_id: 30 &larr; Sales</div>
                    <div class="node-row orphan">⚡ dept_id: 40 &larr; Research (0 Employees - Orphan Parent)</div>
                  </div>
                </div>
              ` : `
                <div class="connector-diagram-box">
                  <div class="entity-node left">
                    <span class="node-title">Customers_Online (5 Rows)</span>
                    <div class="node-row exclusive">#101 Alice (Gold) - Online Only</div>
                    <div class="node-row matched">#102 Bob (Silver) - Omnichannel Shared</div>
                    <div class="node-row matched">#103 David (Platinum) - Omnichannel Shared</div>
                    <div class="node-row exclusive">#104 Fiona (Bronze) - Online Only</div>
                    <div class="node-row exclusive">#105 Grace (Gold) - Online Only</div>
                  </div>
                  <div class="connector-arrows">
                    <div class="arrow-line">◄───── [Set Operations] ─────►</div>
                    <span class="cardinality-text">Set Intersection &amp; Diff</span>
                  </div>
                  <div class="entity-node right">
                    <span class="node-title">Customers_Retail (5 Rows)</span>
                    <div class="node-row matched">#102 Bob (Silver) - Omnichannel Shared</div>
                    <div class="node-row matched">#103 David (Platinum) - Omnichannel Shared</div>
                    <div class="node-row exclusive">#106 Charlie (Bronze) - Retail Only</div>
                    <div class="node-row exclusive">#107 Hannah (Silver) - Retail Only</div>
                    <div class="node-row exclusive">#108 Ian (Gold) - Retail Only</div>
                  </div>
                </div>
              `}
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
            ${CONCEPTS.map(c => `
              <div class="concept-card">
                <div class="concept-card-header">
                  <div class="concept-card-title-row">
                    <span class="concept-icon">${c.icon}</span>
                    <h3 class="concept-title">${c.title}</h3>
                  </div>
                  <span class="concept-tag">${c.tag}</span>
                </div>

                <div class="concept-card-body">
                  <div class="concept-summary-box">
                    <p class="summary-text">${c.summary}</p>
                  </div>

                  <div class="concept-section">
                    <h4 class="section-subtitle">The Engineering Trap:</h4>
                    <p class="section-body">${c.problem}</p>
                  </div>

                  <div class="concept-section">
                    <h4 class="section-subtitle">The Production Solution:</h4>
                    <p class="section-body">${c.solution}</p>
                  </div>

                  <!-- Code Comparison -->
                  <div class="concept-code-comparison">
                    <div class="code-col bad">
                      <span class="code-label error">Antipattern / Bug</span>
                      <pre class="concept-code"><code>${this.escapeHtml(c.codeBad)}</code></pre>
                    </div>
                    <div class="code-col good">
                      <span class="code-label success">Production Pattern</span>
                      <pre class="concept-code"><code>${this.escapeHtml(c.codeGood)}</code></pre>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    },

    // --- SVG VENN GENERATOR WITH DIRECT CLICKABLE ZONES ---
    renderVennSvg: function (activeZones, dataset) {
      const isLeftActive = activeZones.includes('left');
      const isOverlapActive = activeZones.includes('overlap');
      const isRightActive = activeZones.includes('right');

      if (state.mode === 'joins') {
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

            <!-- Circle Outline Borders for high-contrast crispness -->
            <circle cx="230" cy="190" r="140" class="venn-circle-stroke ${isLeftActive ? 'stroke-active' : ''}" pointer-events="none" />
            <circle cx="410" cy="190" r="140" class="venn-circle-stroke ${isRightActive ? 'stroke-active' : ''}" pointer-events="none" />

            <!-- Labels -->
            <text x="140" y="65" class="venn-label-title" pointer-events="none">Table A: Employees</text>
            <text x="500" y="65" class="venn-label-title" pointer-events="none">Table B: Departments</text>

            <!-- Floating Interactive Row Chips -->
            <!-- Zone A (Left Only): Evan Vance (Orphan dept_id = null) -->
            <g class="venn-chip-group ${isLeftActive ? 'chip-active' : 'chip-dim'}"
               onmouseenter="window.VennMatrixEngine.highlightChip(5)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="110" y="165" width="115" height="32" rx="6" class="venn-row-chip chip-orphan" />
              <text x="167" y="186" class="chip-text">#5 Evan (NULL)</text>
            </g>

            <!-- Zone Overlap (A ∩ B): Alice, Bob, Charlie, Diana -->
            <g class="venn-chip-group ${isOverlapActive ? 'chip-active' : 'chip-dim'}"
               onmouseenter="window.VennMatrixEngine.highlightChip(1)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="270" y="115" width="100" height="28" rx="6" class="venn-row-chip" />
              <text x="320" y="133" class="chip-text">#1 Alice (10)</text>
            </g>

            <g class="venn-chip-group ${isOverlapActive ? 'chip-active' : 'chip-dim'}"
               onmouseenter="window.VennMatrixEngine.highlightChip(2)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="270" y="152" width="100" height="28" rx="6" class="venn-row-chip" />
              <text x="320" y="170" class="chip-text">#2 Bob (20)</text>
            </g>

            <g class="venn-chip-group ${isOverlapActive ? 'chip-active' : 'chip-dim'}"
               onmouseenter="window.VennMatrixEngine.highlightChip(3)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="270" y="189" width="100" height="28" rx="6" class="venn-row-chip" />
              <text x="320" y="207" class="chip-text">#3 Charlie (10)</text>
            </g>

            <g class="venn-chip-group ${isOverlapActive ? 'chip-active' : 'chip-dim'}"
               onmouseenter="window.VennMatrixEngine.highlightChip(4)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="270" y="226" width="100" height="28" rx="6" class="venn-row-chip" />
              <text x="320" y="244" class="chip-text">#4 Diana (30)</text>
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
      } else {
        // Set Operations Mode
        return `
          <svg viewBox="0 0 640 380" class="venn-interactive-svg" xmlns="http://www.w3.org/2000/svg">
            <!-- Left Crescent (Exclusive Left A \\ B) -->
            <path d="M 320,82.8 A 140,140 0 1,0 320,297.2 A 140,140 0 0,0 320,82.8 Z"
                  class="venn-zone-path zone-left ${isLeftActive ? 'zone-active' : 'zone-dim'}"
                  onclick="window.VennMatrixEngine.clickVennZone('left')">
              <title>Left Crescent: Click to isolate EXCEPT (A \\ B)</title>
            </path>

            <!-- Center Lens (Intersection A ∩ B) -->
            <path d="M 320,82.8 A 140,140 0 0,1 320,297.2 A 140,140 0 0,1 320,82.8 Z"
                  class="venn-zone-path zone-overlap ${isOverlapActive ? 'zone-active' : 'zone-dim'}"
                  onclick="window.VennMatrixEngine.clickVennZone('overlap')">
              <title>Center Lens: Click to isolate INTERSECT (A ∩ B)</title>
            </path>

            <!-- Right Crescent (Exclusive Right B \\ A) -->
            <path d="M 320,82.8 A 140,140 0 0,0 320,297.2 A 140,140 0 1,1 320,82.8 Z"
                  class="venn-zone-path zone-right ${isRightActive ? 'zone-active' : 'zone-dim'}"
                  onclick="window.VennMatrixEngine.clickVennZone('right')">
              <title>Right Crescent: Click to isolate UNION</title>
            </path>

            <!-- Outlines -->
            <circle cx="230" cy="190" r="140" class="venn-circle-stroke ${isLeftActive ? 'stroke-active' : ''}" pointer-events="none" />
            <circle cx="410" cy="190" r="140" class="venn-circle-stroke ${isRightActive ? 'stroke-active' : ''}" pointer-events="none" />

            <text x="140" y="65" class="venn-label-title" pointer-events="none">Online Customers</text>
            <text x="500" y="65" class="venn-label-title" pointer-events="none">Retail Customers</text>

            <!-- Left Only Chips: Alice, Fiona, Grace -->
            <g class="venn-chip-group ${isLeftActive ? 'chip-active' : 'chip-dim'}"
               onmouseenter="window.VennMatrixEngine.highlightChip(101)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="110" y="130" width="110" height="26" rx="5" class="venn-row-chip" />
              <text x="165" y="147" class="chip-text">#101 Alice (Gold)</text>
            </g>
            <g class="venn-chip-group ${isLeftActive ? 'chip-active' : 'chip-dim'}"
               onmouseenter="window.VennMatrixEngine.highlightChip(104)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="110" y="165" width="110" height="26" rx="5" class="venn-row-chip" />
              <text x="165" y="182" class="chip-text">#104 Fiona (Brz)</text>
            </g>
            <g class="venn-chip-group ${isLeftActive ? 'chip-active' : 'chip-dim'}"
               onmouseenter="window.VennMatrixEngine.highlightChip(105)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="110" y="200" width="110" height="26" rx="5" class="venn-row-chip" />
              <text x="165" y="217" class="chip-text">#105 Grace (Gold)</text>
            </g>

            <!-- Overlap Chips: Bob, David -->
            <g class="venn-chip-group ${isOverlapActive ? 'chip-active' : 'chip-dim'}"
               onmouseenter="window.VennMatrixEngine.highlightChip(102)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="270" y="150" width="100" height="28" rx="6" class="venn-row-chip" />
              <text x="320" y="168" class="chip-text">#102 Bob (Slv)</text>
            </g>
            <g class="venn-chip-group ${isOverlapActive ? 'chip-active' : 'chip-dim'}"
               onmouseenter="window.VennMatrixEngine.highlightChip(103)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="270" y="190" width="100" height="28" rx="6" class="venn-row-chip" />
              <text x="320" y="208" class="chip-text">#103 David (Plt)</text>
            </g>

            <!-- Right Only Chips: Charlie, Hannah, Ian -->
            <g class="venn-chip-group ${isRightActive ? 'chip-active' : 'chip-dim'}"
               onmouseenter="window.VennMatrixEngine.highlightChip(106)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="420" y="130" width="110" height="26" rx="5" class="venn-row-chip" />
              <text x="475" y="147" class="chip-text">#106 Charlie</text>
            </g>
            <g class="venn-chip-group ${isRightActive ? 'chip-active' : 'chip-dim'}"
               onmouseenter="window.VennMatrixEngine.highlightChip(107)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="420" y="165" width="110" height="26" rx="5" class="venn-row-chip" />
              <text x="475" y="182" class="chip-text">#107 Hannah</text>
            </g>
            <g class="venn-chip-group ${isRightActive ? 'chip-active' : 'chip-dim'}"
               onmouseenter="window.VennMatrixEngine.highlightChip(108)"
               onmouseleave="window.VennMatrixEngine.clearHighlight()">
              <rect x="420" y="200" width="110" height="26" rx="5" class="venn-row-chip" />
              <text x="475" y="217" class="chip-text">#108 Ian</text>
            </g>
          </svg>
        `;
      }
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
