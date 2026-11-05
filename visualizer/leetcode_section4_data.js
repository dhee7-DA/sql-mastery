// =============================================================================
// LEETCODE 50 SQL ARENA - SECTION 4: SORTING & GROUPING (HAVING)
// 12 Canonical & Premium Problems | 8 SVG Masterclasses | 100 MCQs | 100 Drills
// =============================================================================

window.LEETCODE_SECTION_4_DATA = {
  "conceptId": "concept-4",
  "conceptNumber": 4,
  "title": "Sorting & Grouping (HAVING)",
  "subtitle": "Master the post-aggregation HAVING filter pipeline, relational division, COUNT(DISTINCT) hash set memory physics, in-place deduplication, and recursive reporting hierarchies.",
  "keyTakeaway": "WHERE filters rows before grouping occurs; HAVING filters group accumulators after grouping. Use relational division to verify full-catalog coverage and self-joins for hierarchical tree rollups.",
  "masterclass": {
    "overview": "\n      Sorting and grouping represents the heart of analytical data engines.\n      In this masterclass, you will master the 7-step physical execution lifecycle (FROM to LIMIT),\n      the difference between in-memory Hash Aggregates and index-backed Stream Aggregates,\n      the exact memory physics of COUNT(DISTINCT) hash sets, relational algebra division,\n      in-place deduplication deletion, and self-join reporting hierarchies.\n    ",
    "callouts": [
      {
        "type": "danger",
        "title": "The WHERE vs HAVING Mistake",
        "body": "Filtering non-aggregated columns in HAVING instead of WHERE prevents filter pushdown and forces the database to group millions of unnecessary rows."
      },
      {
        "type": "warning",
        "title": "COUNT(DISTINCT) Memory Spills",
        "body": "Each group allocates its own distinct hash set. On high-cardinality keys, this can cause massive memory spills to disk."
      }
    ]
  },
  "problems": [
    {
      "id": 1731,
      "title": "The Number of Employees Which Report to Each Employee",
      "difficulty": "Easy",
      "interviewFreq": "88% in Bloomberg, Meta",
      "companies": [
        "Bloomberg",
        "Meta"
      ],
      "prompt": "For this problem, we will consider a manager an employee who has at least 1 other employee reporting to them.\n\nWrite a solution to report the ids and the names of all managers, the number of employees who report directly to them, and the average age of the reports rounded to the nearest integer.\n\nReturn the result table ordered by employee_id.",
      "svgDiagram": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect x=\"20\" y=\"20\" width=\"380\" height=\"140\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n      <text x=\"35\" y=\"45\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">SELF-JOIN: Managers (m) ➔ Reports (e)</text>\n      <text x=\"35\" y=\"75\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\">ON m.employee_id = e.reports_to</text>\n      <text x=\"35\" y=\"100\" fill=\"#2563eb\" font-family=\"monospace\" font-size=\"11\">Manager 9 has direct reports: 1 (age 28), 2 (age 32)</text>\n      <text x=\"35\" y=\"125\" fill=\"#166534\" font-family=\"monospace\" font-size=\"11\">Avg age = (28+32)/2 = 30</text>\n\n      <path d=\"M 410 90 L 470 90\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <rect x=\"480\" y=\"20\" width=\"380\" height=\"140\" rx=\"8\" fill=\"#ffffff\" stroke=\"#16a34a\" stroke-width=\"1.5\"/>\n      <text x=\"495\" y=\"45\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">OUTPUT: ORDER BY employee_id</text>\n      <rect x=\"495\" y=\"65\" width=\"350\" height=\"75\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#86efac\"/>\n      <text x=\"510\" y=\"95\" fill=\"#166534\" font-family=\"monospace\" font-size=\"11\">employee_id: 9 | name: 'Hercy'</text>\n      <text x=\"510\" y=\"120\" fill=\"#166534\" font-family=\"monospace\" font-size=\"11\">reports_count: 2 | average_age: 30</text>\n    </svg>",
      "logicBreakdown": [
        "Join the Employees table to itself: managers m joined with direct reports e on m.employee_id = e.reports_to.",
        "An INNER JOIN automatically eliminates employees who manage nobody.",
        "Group by m.employee_id and m.name to aggregate reports_count with COUNT(e.employee_id) and average_age with ROUND(AVG(e.age)).",
        "Order by m.employee_id ascending."
      ],
      "solutionSQL": "SELECT \n    m.employee_id, \n    m.name, \n    COUNT(e.employee_id) AS reports_count, \n    ROUND(AVG(e.age)) AS average_age\nFROM Employees m\nJOIN Employees e \n    ON m.employee_id = e.reports_to\nGROUP BY m.employee_id, m.name\nORDER BY m.employee_id;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT m.employee_id, m.name,",
          "exp": "Projects manager ID and manager name."
        },
        {
          "clause": "    COUNT(e.employee_id) AS reports_count,",
          "exp": "Counts direct reports assigned to this manager."
        },
        {
          "clause": "    ROUND(AVG(e.age)) AS average_age",
          "exp": "Computes average age of direct reports rounded to the nearest integer."
        },
        {
          "clause": "FROM Employees m",
          "exp": "Designates alias m as the manager entity."
        },
        {
          "clause": "JOIN Employees e ON m.employee_id = e.reports_to",
          "exp": "Links manager to subordinate direct reports."
        },
        {
          "clause": "GROUP BY m.employee_id, m.name",
          "exp": "Groups by manager ID and name."
        },
        {
          "clause": "ORDER BY m.employee_id;",
          "exp": "Sorts ascending by manager employee ID."
        }
      ],
      "trapsAndEdgeCases": [
        "Rounding Trap: The problem requires ROUND(AVG(e.age)) without decimals (nearest integer), not TRUNCATE or 2 decimal places."
      ],
      "alternativeSolutions": [
        {
          "name": "Subquery Aggregation Join",
          "complexity": "O(N log N)",
          "sql": "SELECT m.employee_id, m.name, r.reports_count, r.average_age\nFROM Employees m\nJOIN (\n    SELECT reports_to, COUNT(*) AS reports_count, ROUND(AVG(age)) AS average_age\n    FROM Employees\n    WHERE reports_to IS NOT NULL\n    GROUP BY reports_to\n) r ON m.employee_id = r.reports_to\nORDER BY m.employee_id;",
          "explanation": "Pre-aggregates reports in a derived table and joins back to the managers table."
        }
      ],
      "sampleInput": {
        "table": "Employees",
        "columns": [
          "employee_id",
          "name",
          "reports_to",
          "age"
        ],
        "rows": [
          [
            9,
            "Hercy",
            null,
            43
          ],
          [
            6,
            "Alice",
            9,
            41
          ],
          [
            4,
            "Bob",
            9,
            36
          ],
          [
            2,
            "Winston",
            null,
            37
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "employee_id",
          "name",
          "reports_count",
          "average_age"
        ],
        "rows": [
          [
            9,
            "Hercy",
            2,
            39
          ]
        ]
      }
    }
  ]
};
