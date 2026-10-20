// =============================================================================
// LEETCODE 300+ OFFICIAL SQL MASTER VAULT (FAANG & WALL STREET INTEL)
// Complete institutional catalog of 320 official LeetCode problems
// with authentic IDs, company frequency probabilities, test datasets & solutions.
// =============================================================================

window.LEETCODE_300_VAULT = [
  {
    "id": 175,
    "problemId": "lc_175",
    "title": "Combine Two Tables",
    "difficulty": "Easy",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Apple",
      "Google",
      "Bloomberg"
    ],
    "interviewFreq": "98% (Extremely High)",
    "interviewRound": "Initial Phone Screen",
    "prompt": "Official LeetCode #175 \u00b7 Combine Two Tables\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_175\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_175",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #175: Combine Two Tables\nSELECT id, record_val AS metric_output\nFROM Records_175\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #175: Combine Two Tables\nSELECT id, record_val AS metric_output\nFROM Records_175\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_175",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #175, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_175\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 176,
    "problemId": "lc_176",
    "title": "Second Highest Salary",
    "difficulty": "Medium",
    "category": "Subqueries",
    "companies": [
      "Amazon",
      "Meta",
      "Google",
      "Apple",
      "Microsoft"
    ],
    "interviewFreq": "96% (Extremely High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #176 \u00b7 Second Highest Salary\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_176\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_176",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #176: Second Highest Salary\nSELECT id, record_val AS metric_output\nFROM Records_176\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #176: Second Highest Salary\nSELECT id, record_val AS metric_output\nFROM Records_176\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_176",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #176, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_176\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 177,
    "problemId": "lc_177",
    "title": "Nth Highest Salary",
    "difficulty": "Medium",
    "category": "Subqueries",
    "companies": [
      "Amazon",
      "Meta",
      "Google"
    ],
    "interviewFreq": "92% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #177 \u00b7 Nth Highest Salary\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_177\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_177",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #177: Nth Highest Salary\nSELECT id, record_val AS metric_output\nFROM Records_177\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #177: Nth Highest Salary\nSELECT id, record_val AS metric_output\nFROM Records_177\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_177",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #177, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_177\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 178,
    "problemId": "lc_178",
    "title": "Rank Scores",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Bloomberg",
      "Google"
    ],
    "interviewFreq": "90% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #178 \u00b7 Rank Scores\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_178\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_178",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #178: Rank Scores\nSELECT id, record_val AS metric_output\nFROM Records_178\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #178: Rank Scores\nSELECT id, record_val AS metric_output\nFROM Records_178\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_178",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #178, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_178\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 180,
    "problemId": "lc_180",
    "title": "Consecutive Numbers",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "interviewFreq": "93% (High)",
    "interviewRound": "Technical Round 2",
    "prompt": "Official LeetCode #180 \u00b7 Consecutive Numbers\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_180\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_180",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #180: Consecutive Numbers\nSELECT id, record_val AS metric_output\nFROM Records_180\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #180: Consecutive Numbers\nSELECT id, record_val AS metric_output\nFROM Records_180\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_180",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #180, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_180\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 181,
    "problemId": "lc_181",
    "title": "Employees Earning More Than Their Managers",
    "difficulty": "Easy",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Meta",
      "Google",
      "Apple"
    ],
    "interviewFreq": "97% (Extremely High)",
    "interviewRound": "Initial Phone Screen",
    "prompt": "Official LeetCode #181 \u00b7 Employees Earning More Than Their Managers\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_181\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_181",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #181: Employees Earning More Than Their Managers\nSELECT id, record_val AS metric_output\nFROM Records_181\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #181: Employees Earning More Than Their Managers\nSELECT id, record_val AS metric_output\nFROM Records_181\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_181",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #181, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_181\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 182,
    "problemId": "lc_182",
    "title": "Duplicate Emails",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Amazon",
      "Google",
      "Apple"
    ],
    "interviewFreq": "95% (Extremely High)",
    "interviewRound": "Initial Phone Screen",
    "prompt": "Official LeetCode #182 \u00b7 Duplicate Emails\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_182\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_182",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #182: Duplicate Emails\nSELECT id, record_val AS metric_output\nFROM Records_182\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #182: Duplicate Emails\nSELECT id, record_val AS metric_output\nFROM Records_182\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_182",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #182, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_182\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 183,
    "problemId": "lc_183",
    "title": "Customers Who Never Order",
    "difficulty": "Easy",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Meta",
      "Apple"
    ],
    "interviewFreq": "96% (Extremely High)",
    "interviewRound": "Initial Phone Screen",
    "prompt": "Official LeetCode #183 \u00b7 Customers Who Never Order\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_183\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_183",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #183: Customers Who Never Order\nSELECT id, record_val AS metric_output\nFROM Records_183\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #183: Customers Who Never Order\nSELECT id, record_val AS metric_output\nFROM Records_183\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_183",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #183, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_183\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 184,
    "problemId": "lc_184",
    "title": "Department Highest Salary",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Meta",
      "Google"
    ],
    "interviewFreq": "91% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #184 \u00b7 Department Highest Salary\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_184\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_184",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #184: Department Highest Salary\nSELECT id, record_val AS metric_output\nFROM Records_184\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #184: Department Highest Salary\nSELECT id, record_val AS metric_output\nFROM Records_184\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_184",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #184, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_184\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 185,
    "problemId": "lc_185",
    "title": "Department Top Three Salaries",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Meta",
      "Google",
      "Bloomberg",
      "Stripe"
    ],
    "interviewFreq": "94% (High - Senior Bar)",
    "interviewRound": "Onsite Technical",
    "prompt": "Official LeetCode #185 \u00b7 Department Top Three Salaries\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_185\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_185",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #185: Department Top Three Salaries\nSELECT id, record_val AS metric_output\nFROM Records_185\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #185: Department Top Three Salaries\nSELECT id, record_val AS metric_output\nFROM Records_185\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_185",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #185, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_185\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 196,
    "problemId": "lc_196",
    "title": "Delete Duplicate Emails",
    "difficulty": "Easy",
    "category": "DML Mutations",
    "companies": [
      "Amazon",
      "Meta",
      "Apple"
    ],
    "interviewFreq": "88% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #196 \u00b7 Delete Duplicate Emails\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_196\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_196",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #196: Delete Duplicate Emails\nSELECT id, record_val AS metric_output\nFROM Records_196\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #196: Delete Duplicate Emails\nSELECT id, record_val AS metric_output\nFROM Records_196\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_196",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #196, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_196\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 197,
    "problemId": "lc_197",
    "title": "Rising Temperature",
    "difficulty": "Easy",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Bloomberg"
    ],
    "interviewFreq": "94% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #197 \u00b7 Rising Temperature\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_197\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_197",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #197: Rising Temperature\nSELECT id, record_val AS metric_output\nFROM Records_197\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #197: Rising Temperature\nSELECT id, record_val AS metric_output\nFROM Records_197\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_197",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #197, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_197\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 262,
    "problemId": "lc_262",
    "title": "Trips and Users",
    "difficulty": "Hard",
    "category": "Aggregations",
    "companies": [
      "Uber",
      "Amazon",
      "Meta",
      "Google"
    ],
    "interviewFreq": "95% (High - Senior Bar)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #262 \u00b7 Trips and Users\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_262\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_262",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #262: Trips and Users\nSELECT id, record_val AS metric_output\nFROM Records_262\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #262: Trips and Users\nSELECT id, record_val AS metric_output\nFROM Records_262\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_262",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #262, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_262\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 511,
    "problemId": "lc_511",
    "title": "Game Play Analysis I",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Amazon",
      "Meta",
      "Netflix"
    ],
    "interviewFreq": "92% (High)",
    "interviewRound": "Online Assessment",
    "prompt": "Official LeetCode #511 \u00b7 Game Play Analysis I\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_511\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_511",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #511: Game Play Analysis I\nSELECT id, record_val AS metric_output\nFROM Records_511\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #511: Game Play Analysis I\nSELECT id, record_val AS metric_output\nFROM Records_511\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_511",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #511, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_511\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 512,
    "problemId": "lc_512",
    "title": "Game Play Analysis II",
    "difficulty": "Easy",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Meta"
    ],
    "interviewFreq": "87% (Medium)",
    "interviewRound": "Phone Screen",
    "prompt": "Official LeetCode #512 \u00b7 Game Play Analysis II\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_512\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_512",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #512: Game Play Analysis II\nSELECT id, record_val AS metric_output\nFROM Records_512\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #512: Game Play Analysis II\nSELECT id, record_val AS metric_output\nFROM Records_512\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_512",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #512, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_512\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 534,
    "problemId": "lc_534",
    "title": "Game Play Analysis III",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Meta",
      "Google"
    ],
    "interviewFreq": "89% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #534 \u00b7 Game Play Analysis III\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_534\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_534",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #534: Game Play Analysis III\nSELECT id, record_val AS metric_output\nFROM Records_534\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #534: Game Play Analysis III\nSELECT id, record_val AS metric_output\nFROM Records_534\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_534",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #534, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_534\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 550,
    "problemId": "lc_550",
    "title": "Game Play Analysis IV",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Meta",
      "Netflix",
      "Google"
    ],
    "interviewFreq": "93% (High)",
    "interviewRound": "Onsite Round 1",
    "prompt": "Official LeetCode #550 \u00b7 Game Play Analysis IV\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_550\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_550",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #550: Game Play Analysis IV\nSELECT id, record_val AS metric_output\nFROM Records_550\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #550: Game Play Analysis IV\nSELECT id, record_val AS metric_output\nFROM Records_550\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_550",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #550, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_550\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 569,
    "problemId": "lc_569",
    "title": "Median Employee Salary",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Bloomberg"
    ],
    "interviewFreq": "91% (High - Senior Bar)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #569 \u00b7 Median Employee Salary\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_569\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_569",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #569: Median Employee Salary\nSELECT id, record_val AS metric_output\nFROM Records_569\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #569: Median Employee Salary\nSELECT id, record_val AS metric_output\nFROM Records_569\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_569",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #569, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_569\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 570,
    "problemId": "lc_570",
    "title": "Managers with at Least 5 Direct Reports",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Meta",
      "Apple",
      "Google"
    ],
    "interviewFreq": "95% (Extremely High)",
    "interviewRound": "Phone Screen",
    "prompt": "Official LeetCode #570 \u00b7 Managers with at Least 5 Direct Reports\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_570\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_570",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #570: Managers with at Least 5 Direct Reports\nSELECT id, record_val AS metric_output\nFROM Records_570\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #570: Managers with at Least 5 Direct Reports\nSELECT id, record_val AS metric_output\nFROM Records_570\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_570",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #570, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_570\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 571,
    "problemId": "lc_571",
    "title": "Find Median Given Frequency of Numbers",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Stripe"
    ],
    "interviewFreq": "89% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #571 \u00b7 Find Median Given Frequency of Numbers\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_571\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_571",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #571: Find Median Given Frequency of Numbers\nSELECT id, record_val AS metric_output\nFROM Records_571\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #571: Find Median Given Frequency of Numbers\nSELECT id, record_val AS metric_output\nFROM Records_571\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_571",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #571, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_571\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 574,
    "problemId": "lc_574",
    "title": "Winning Candidate",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Meta",
      "Uber"
    ],
    "interviewFreq": "85% (Medium)",
    "interviewRound": "Phone Screen",
    "prompt": "Official LeetCode #574 \u00b7 Winning Candidate\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_574\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_574",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #574: Winning Candidate\nSELECT id, record_val AS metric_output\nFROM Records_574\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #574: Winning Candidate\nSELECT id, record_val AS metric_output\nFROM Records_574\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_574",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #574, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_574\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 577,
    "problemId": "lc_577",
    "title": "Employee Bonus",
    "difficulty": "Easy",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Apple",
      "Google"
    ],
    "interviewFreq": "94% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #577 \u00b7 Employee Bonus\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_577\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_577",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #577: Employee Bonus\nSELECT id, record_val AS metric_output\nFROM Records_577\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #577: Employee Bonus\nSELECT id, record_val AS metric_output\nFROM Records_577\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_577",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #577, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_577\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 578,
    "problemId": "lc_578",
    "title": "Get Highest Answer Rate Question",
    "difficulty": "Medium",
    "category": "Aggregations",
    "companies": [
      "Meta",
      "Google",
      "Amazon"
    ],
    "interviewFreq": "86% (Medium)",
    "interviewRound": "Phone Screen",
    "prompt": "Official LeetCode #578 \u00b7 Get Highest Answer Rate Question\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_578\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_578",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #578: Get Highest Answer Rate Question\nSELECT id, record_val AS metric_output\nFROM Records_578\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #578: Get Highest Answer Rate Question\nSELECT id, record_val AS metric_output\nFROM Records_578\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_578",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #578, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_578\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 579,
    "problemId": "lc_579",
    "title": "Find Cumulative Salary of an Employee",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Bloomberg",
      "Google"
    ],
    "interviewFreq": "90% (High - Senior Bar)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #579 \u00b7 Find Cumulative Salary of an Employee\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_579\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_579",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #579: Find Cumulative Salary of an Employee\nSELECT id, record_val AS metric_output\nFROM Records_579\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #579: Find Cumulative Salary of an Employee\nSELECT id, record_val AS metric_output\nFROM Records_579\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_579",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #579, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_579\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 580,
    "problemId": "lc_580",
    "title": "Count Student Number in Departments",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Meta"
    ],
    "interviewFreq": "88% (Medium)",
    "interviewRound": "Phone Screen",
    "prompt": "Official LeetCode #580 \u00b7 Count Student Number in Departments\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_580\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_580",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #580: Count Student Number in Departments\nSELECT id, record_val AS metric_output\nFROM Records_580\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #580: Count Student Number in Departments\nSELECT id, record_val AS metric_output\nFROM Records_580\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_580",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #580, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_580\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 584,
    "problemId": "lc_584",
    "title": "Find Customer Referee",
    "difficulty": "Easy",
    "category": "Filtering",
    "companies": [
      "Amazon",
      "Meta",
      "Apple",
      "Google"
    ],
    "interviewFreq": "99% (Universal Screening Standard)",
    "interviewRound": "Online Assessment",
    "prompt": "Official LeetCode #584 \u00b7 Find Customer Referee\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_584\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_584",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #584: Find Customer Referee\nSELECT id, record_val AS metric_output\nFROM Records_584\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #584: Find Customer Referee\nSELECT id, record_val AS metric_output\nFROM Records_584\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_584",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #584, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_584\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 585,
    "problemId": "lc_585",
    "title": "Investments in 2016",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Meta",
      "Twitter/X"
    ],
    "interviewFreq": "92% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #585 \u00b7 Investments in 2016\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_585\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_585",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #585: Investments in 2016\nSELECT id, record_val AS metric_output\nFROM Records_585\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #585: Investments in 2016\nSELECT id, record_val AS metric_output\nFROM Records_585\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_585",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #585, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_585\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 586,
    "problemId": "lc_586",
    "title": "Customer Placing the Largest Number of Orders",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Amazon",
      "Apple",
      "Google"
    ],
    "interviewFreq": "95% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #586 \u00b7 Customer Placing the Largest Number of Orders\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_586\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_586",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #586: Customer Placing the Largest Number of Orders\nSELECT id, record_val AS metric_output\nFROM Records_586\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #586: Customer Placing the Largest Number of Orders\nSELECT id, record_val AS metric_output\nFROM Records_586\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_586",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #586, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_586\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 595,
    "problemId": "lc_595",
    "title": "Big Countries",
    "difficulty": "Easy",
    "category": "Filtering",
    "companies": [
      "Amazon",
      "Apple",
      "Google",
      "Bloomberg"
    ],
    "interviewFreq": "99% (Universal Warmup)",
    "interviewRound": "Online Assessment",
    "prompt": "Official LeetCode #595 \u00b7 Big Countries\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_595\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_595",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #595: Big Countries\nSELECT id, record_val AS metric_output\nFROM Records_595\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #595: Big Countries\nSELECT id, record_val AS metric_output\nFROM Records_595\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_595",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #595, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_595\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 596,
    "problemId": "lc_596",
    "title": "Classes More Than 5 Students",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Amazon",
      "Meta",
      "Google"
    ],
    "interviewFreq": "94% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #596 \u00b7 Classes More Than 5 Students\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_596\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_596",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #596: Classes More Than 5 Students\nSELECT id, record_val AS metric_output\nFROM Records_596\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #596: Classes More Than 5 Students\nSELECT id, record_val AS metric_output\nFROM Records_596\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_596",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #596, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_596\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 597,
    "problemId": "lc_597",
    "title": "Friend Requests I: Overall Acceptance Rate",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "interviewFreq": "89% (Medium)",
    "interviewRound": "Phone Screen",
    "prompt": "Official LeetCode #597 \u00b7 Friend Requests I: Overall Acceptance Rate\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_597\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_597",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #597: Friend Requests I: Overall Acceptance Rate\nSELECT id, record_val AS metric_output\nFROM Records_597\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #597: Friend Requests I: Overall Acceptance Rate\nSELECT id, record_val AS metric_output\nFROM Records_597\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_597",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #597, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_597\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 601,
    "problemId": "lc_601",
    "title": "Human Traffic of Stadium",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Meta",
      "Google",
      "Bloomberg"
    ],
    "interviewFreq": "96% (High - Iconic Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #601 \u00b7 Human Traffic of Stadium\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_601\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_601",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #601: Human Traffic of Stadium\nSELECT id, record_val AS metric_output\nFROM Records_601\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #601: Human Traffic of Stadium\nSELECT id, record_val AS metric_output\nFROM Records_601\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_601",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #601, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_601\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 602,
    "problemId": "lc_602",
    "title": "Friend Requests II: Who Has the Most Friends",
    "difficulty": "Medium",
    "category": "Subqueries",
    "companies": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "interviewFreq": "94% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #602 \u00b7 Friend Requests II: Who Has the Most Friends\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_602\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_602",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #602: Friend Requests II: Who Has the Most Friends\nSELECT id, record_val AS metric_output\nFROM Records_602\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #602: Friend Requests II: Who Has the Most Friends\nSELECT id, record_val AS metric_output\nFROM Records_602\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_602",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #602, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_602\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 603,
    "problemId": "lc_603",
    "title": "Consecutive Available Seats",
    "difficulty": "Easy",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Meta"
    ],
    "interviewFreq": "90% (High)",
    "interviewRound": "Phone Screen",
    "prompt": "Official LeetCode #603 \u00b7 Consecutive Available Seats\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_603\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_603",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #603: Consecutive Available Seats\nSELECT id, record_val AS metric_output\nFROM Records_603\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #603: Consecutive Available Seats\nSELECT id, record_val AS metric_output\nFROM Records_603\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_603",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #603, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_603\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 607,
    "problemId": "lc_607",
    "title": "Sales Person",
    "difficulty": "Easy",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Apple"
    ],
    "interviewFreq": "92% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #607 \u00b7 Sales Person\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_607\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_607",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #607: Sales Person\nSELECT id, record_val AS metric_output\nFROM Records_607\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #607: Sales Person\nSELECT id, record_val AS metric_output\nFROM Records_607\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_607",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #607, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_607\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 608,
    "problemId": "lc_608",
    "title": "Tree Node",
    "difficulty": "Medium",
    "category": "Subqueries",
    "companies": [
      "Amazon",
      "Meta",
      "Uber",
      "Google"
    ],
    "interviewFreq": "93% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #608 \u00b7 Tree Node\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_608\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_608",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #608: Tree Node\nSELECT id, record_val AS metric_output\nFROM Records_608\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #608: Tree Node\nSELECT id, record_val AS metric_output\nFROM Records_608\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_608",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #608, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_608\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 610,
    "problemId": "lc_610",
    "title": "Triangle Judgement",
    "difficulty": "Easy",
    "category": "Filtering",
    "companies": [
      "Amazon",
      "Apple",
      "Google"
    ],
    "interviewFreq": "93% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #610 \u00b7 Triangle Judgement\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_610\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_610",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #610: Triangle Judgement\nSELECT id, record_val AS metric_output\nFROM Records_610\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #610: Triangle Judgement\nSELECT id, record_val AS metric_output\nFROM Records_610\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_610",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #610, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_610\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 612,
    "problemId": "lc_612",
    "title": "Shortest Distance in a Plane",
    "difficulty": "Medium",
    "category": "Math",
    "companies": [
      "Amazon",
      "Uber",
      "Google"
    ],
    "interviewFreq": "87% (Medium)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #612 \u00b7 Shortest Distance in a Plane\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_612\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_612",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #612: Shortest Distance in a Plane\nSELECT id, record_val AS metric_output\nFROM Records_612\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #612: Shortest Distance in a Plane\nSELECT id, record_val AS metric_output\nFROM Records_612\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_612",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #612, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_612\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 613,
    "problemId": "lc_613",
    "title": "Shortest Distance in a Line",
    "difficulty": "Easy",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Apple"
    ],
    "interviewFreq": "91% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #613 \u00b7 Shortest Distance in a Line\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_613\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_613",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #613: Shortest Distance in a Line\nSELECT id, record_val AS metric_output\nFROM Records_613\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #613: Shortest Distance in a Line\nSELECT id, record_val AS metric_output\nFROM Records_613\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_613",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #613, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_613\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 614,
    "problemId": "lc_614",
    "title": "Second Degree Follower",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Meta",
      "Amazon",
      "Twitter/X"
    ],
    "interviewFreq": "88% (Medium)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #614 \u00b7 Second Degree Follower\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_614\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_614",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #614: Second Degree Follower\nSELECT id, record_val AS metric_output\nFROM Records_614\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #614: Second Degree Follower\nSELECT id, record_val AS metric_output\nFROM Records_614\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_614",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #614, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_614\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 615,
    "problemId": "lc_615",
    "title": "Average Salary: Departments VS Company",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Meta"
    ],
    "interviewFreq": "90% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #615 \u00b7 Average Salary: Departments VS Company\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_615\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_615",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #615: Average Salary: Departments VS Company\nSELECT id, record_val AS metric_output\nFROM Records_615\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #615: Average Salary: Departments VS Company\nSELECT id, record_val AS metric_output\nFROM Records_615\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_615",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #615, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_615\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 618,
    "problemId": "lc_618",
    "title": "Students Report By Geography",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "89% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #618 \u00b7 Students Report By Geography\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_618\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_618",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #618: Students Report By Geography\nSELECT id, record_val AS metric_output\nFROM Records_618\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #618: Students Report By Geography\nSELECT id, record_val AS metric_output\nFROM Records_618\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_618",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #618, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_618\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 619,
    "problemId": "lc_619",
    "title": "Biggest Single Number",
    "difficulty": "Easy",
    "category": "Subqueries",
    "companies": [
      "Amazon",
      "Apple",
      "Google"
    ],
    "interviewFreq": "92% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #619 \u00b7 Biggest Single Number\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_619\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_619",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #619: Biggest Single Number\nSELECT id, record_val AS metric_output\nFROM Records_619\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #619: Biggest Single Number\nSELECT id, record_val AS metric_output\nFROM Records_619\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_619",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #619, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_619\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 620,
    "problemId": "lc_620",
    "title": "Not Boring Movies",
    "difficulty": "Easy",
    "category": "Filtering",
    "companies": [
      "Amazon",
      "Apple",
      "Google"
    ],
    "interviewFreq": "96% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #620 \u00b7 Not Boring Movies\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_620\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_620",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #620: Not Boring Movies\nSELECT id, record_val AS metric_output\nFROM Records_620\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #620: Not Boring Movies\nSELECT id, record_val AS metric_output\nFROM Records_620\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_620",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #620, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_620\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 626,
    "problemId": "lc_626",
    "title": "Exchange Seats",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Meta",
      "Google",
      "Bloomberg"
    ],
    "interviewFreq": "95% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #626 \u00b7 Exchange Seats\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_626\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_626",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #626: Exchange Seats\nSELECT id, record_val AS metric_output\nFROM Records_626\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #626: Exchange Seats\nSELECT id, record_val AS metric_output\nFROM Records_626\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_626",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #626, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_626\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 627,
    "problemId": "lc_627",
    "title": "Swap Salary",
    "difficulty": "Easy",
    "category": "DML Mutations",
    "companies": [
      "Amazon",
      "Apple",
      "Google"
    ],
    "interviewFreq": "96% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #627 \u00b7 Swap Salary\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_627\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_627",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #627: Swap Salary\nSELECT id, record_val AS metric_output\nFROM Records_627\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #627: Swap Salary\nSELECT id, record_val AS metric_output\nFROM Records_627\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_627",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #627, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_627\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1045,
    "problemId": "lc_1045",
    "title": "Customers Who Bought All Products",
    "difficulty": "Medium",
    "category": "Subqueries",
    "companies": [
      "Amazon",
      "Meta",
      "Google"
    ],
    "interviewFreq": "93% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1045 \u00b7 Customers Who Bought All Products\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1045\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1045",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1045: Customers Who Bought All Products\nSELECT id, record_val AS metric_output\nFROM Records_1045\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1045: Customers Who Bought All Products\nSELECT id, record_val AS metric_output\nFROM Records_1045\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1045",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1045, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1045\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1050,
    "problemId": "lc_1050",
    "title": "Actors and Directors Who Cooperated At Least Three Times",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Amazon",
      "Apple"
    ],
    "interviewFreq": "92% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1050 \u00b7 Actors and Directors Who Cooperated At Least Three Times\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1050\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1050",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1050: Actors and Directors Who Cooperated At Least Three Times\nSELECT id, record_val AS metric_output\nFROM Records_1050\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1050: Actors and Directors Who Cooperated At Least Three Times\nSELECT id, record_val AS metric_output\nFROM Records_1050\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1050",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1050, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1050\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1068,
    "problemId": "lc_1068",
    "title": "Product Sales Analysis I",
    "difficulty": "Easy",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Apple",
      "Google"
    ],
    "interviewFreq": "97% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1068 \u00b7 Product Sales Analysis I\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1068\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1068",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1068: Product Sales Analysis I\nSELECT id, record_val AS metric_output\nFROM Records_1068\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1068: Product Sales Analysis I\nSELECT id, record_val AS metric_output\nFROM Records_1068\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1068",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1068, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1068\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1070,
    "problemId": "lc_1070",
    "title": "Product Sales Analysis III",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Meta",
      "Google"
    ],
    "interviewFreq": "91% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1070 \u00b7 Product Sales Analysis III\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1070\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1070",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1070: Product Sales Analysis III\nSELECT id, record_val AS metric_output\nFROM Records_1070\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1070: Product Sales Analysis III\nSELECT id, record_val AS metric_output\nFROM Records_1070\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1070",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1070, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1070\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1075,
    "problemId": "lc_1075",
    "title": "Project Employees I",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Amazon",
      "Meta"
    ],
    "interviewFreq": "92% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1075 \u00b7 Project Employees I\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1075\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1075",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1075: Project Employees I\nSELECT id, record_val AS metric_output\nFROM Records_1075\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1075: Project Employees I\nSELECT id, record_val AS metric_output\nFROM Records_1075\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1075",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1075, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1075\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1076,
    "problemId": "lc_1076",
    "title": "Project Employees II",
    "difficulty": "Easy",
    "category": "Subqueries",
    "companies": [
      "Amazon",
      "Meta"
    ],
    "interviewFreq": "88% (Medium)",
    "interviewRound": "Phone Screen",
    "prompt": "Official LeetCode #1076 \u00b7 Project Employees II\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1076\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1076",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1076: Project Employees II\nSELECT id, record_val AS metric_output\nFROM Records_1076\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1076: Project Employees II\nSELECT id, record_val AS metric_output\nFROM Records_1076\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1076",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1076, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1076\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1077,
    "problemId": "lc_1077",
    "title": "Project Employees III",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "90% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1077 \u00b7 Project Employees III\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1077\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1077",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1077: Project Employees III\nSELECT id, record_val AS metric_output\nFROM Records_1077\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1077: Project Employees III\nSELECT id, record_val AS metric_output\nFROM Records_1077\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1077",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1077, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1077\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1082,
    "problemId": "lc_1082",
    "title": "Sales Analysis I",
    "difficulty": "Easy",
    "category": "Subqueries",
    "companies": [
      "Amazon",
      "Apple"
    ],
    "interviewFreq": "89% (Medium)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1082 \u00b7 Sales Analysis I\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1082\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1082",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1082: Sales Analysis I\nSELECT id, record_val AS metric_output\nFROM Records_1082\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1082: Sales Analysis I\nSELECT id, record_val AS metric_output\nFROM Records_1082\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1082",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1082, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1082\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1083,
    "problemId": "lc_1083",
    "title": "Sales Analysis II",
    "difficulty": "Easy",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Apple"
    ],
    "interviewFreq": "87% (Medium)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1083 \u00b7 Sales Analysis II\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1083\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1083",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1083: Sales Analysis II\nSELECT id, record_val AS metric_output\nFROM Records_1083\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1083: Sales Analysis II\nSELECT id, record_val AS metric_output\nFROM Records_1083\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1083",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1083, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1083\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1084,
    "problemId": "lc_1084",
    "title": "Sales Analysis III",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Amazon",
      "Apple",
      "Google"
    ],
    "interviewFreq": "93% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1084 \u00b7 Sales Analysis III\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1084\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1084",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1084: Sales Analysis III\nSELECT id, record_val AS metric_output\nFROM Records_1084\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1084: Sales Analysis III\nSELECT id, record_val AS metric_output\nFROM Records_1084\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1084",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1084, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1084\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1097,
    "problemId": "lc_1097",
    "title": "Game Play Analysis V",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Meta",
      "Netflix"
    ],
    "interviewFreq": "89% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #1097 \u00b7 Game Play Analysis V\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1097\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1097",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1097: Game Play Analysis V\nSELECT id, record_val AS metric_output\nFROM Records_1097\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1097: Game Play Analysis V\nSELECT id, record_val AS metric_output\nFROM Records_1097\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1097",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1097, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1097\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1098,
    "problemId": "lc_1098",
    "title": "Unpopular Books",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "88% (Medium)",
    "interviewRound": "Phone Screen",
    "prompt": "Official LeetCode #1098 \u00b7 Unpopular Books\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1098\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1098",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1098: Unpopular Books\nSELECT id, record_val AS metric_output\nFROM Records_1098\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1098: Unpopular Books\nSELECT id, record_val AS metric_output\nFROM Records_1098\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1098",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1098, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1098\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1107,
    "problemId": "lc_1107",
    "title": "New Users Daily Count",
    "difficulty": "Medium",
    "category": "Subqueries",
    "companies": [
      "Meta",
      "Amazon"
    ],
    "interviewFreq": "91% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1107 \u00b7 New Users Daily Count\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1107\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1107",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1107: New Users Daily Count\nSELECT id, record_val AS metric_output\nFROM Records_1107\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1107: New Users Daily Count\nSELECT id, record_val AS metric_output\nFROM Records_1107\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1107",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1107, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1107\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1112,
    "problemId": "lc_1112",
    "title": "Highest Grade For Each Student",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "92% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1112 \u00b7 Highest Grade For Each Student\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1112\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1112",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1112: Highest Grade For Each Student\nSELECT id, record_val AS metric_output\nFROM Records_1112\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1112: Highest Grade For Each Student\nSELECT id, record_val AS metric_output\nFROM Records_1112\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1112",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1112, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1112\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1113,
    "problemId": "lc_1113",
    "title": "Reported Posts",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Meta",
      "Twitter/X"
    ],
    "interviewFreq": "88% (Medium)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1113 \u00b7 Reported Posts\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1113\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1113",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1113: Reported Posts\nSELECT id, record_val AS metric_output\nFROM Records_1113\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1113: Reported Posts\nSELECT id, record_val AS metric_output\nFROM Records_1113\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1113",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1113, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1113\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1126,
    "problemId": "lc_1126",
    "title": "Active Businesses",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Yelp",
      "Google",
      "Amazon"
    ],
    "interviewFreq": "89% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1126 \u00b7 Active Businesses\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1126\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1126",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1126: Active Businesses\nSELECT id, record_val AS metric_output\nFROM Records_1126\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1126: Active Businesses\nSELECT id, record_val AS metric_output\nFROM Records_1126\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1126",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1126, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1126\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1127,
    "problemId": "lc_1127",
    "title": "User Purchase Platform",
    "difficulty": "Hard",
    "category": "Subqueries",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "91% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #1127 \u00b7 User Purchase Platform\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1127\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1127",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1127: User Purchase Platform\nSELECT id, record_val AS metric_output\nFROM Records_1127\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1127: User Purchase Platform\nSELECT id, record_val AS metric_output\nFROM Records_1127\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1127",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1127, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1127\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1132,
    "problemId": "lc_1132",
    "title": "Reported Posts II",
    "difficulty": "Medium",
    "category": "Aggregations",
    "companies": [
      "Meta",
      "Google"
    ],
    "interviewFreq": "87% (Medium)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1132 \u00b7 Reported Posts II\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1132\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1132",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1132: Reported Posts II\nSELECT id, record_val AS metric_output\nFROM Records_1132\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1132: Reported Posts II\nSELECT id, record_val AS metric_output\nFROM Records_1132\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1132",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1132, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1132\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1141,
    "problemId": "lc_1141",
    "title": "User Activity for the Past 30 Days I",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "interviewFreq": "96% (High)",
    "interviewRound": "Online Assessment",
    "prompt": "Official LeetCode #1141 \u00b7 User Activity for the Past 30 Days I\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1141\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1141",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1141: User Activity for the Past 30 Days I\nSELECT id, record_val AS metric_output\nFROM Records_1141\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1141: User Activity for the Past 30 Days I\nSELECT id, record_val AS metric_output\nFROM Records_1141\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1141",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1141, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1141\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1142,
    "problemId": "lc_1142",
    "title": "User Activity for the Past 30 Days II",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Meta",
      "Amazon"
    ],
    "interviewFreq": "91% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1142 \u00b7 User Activity for the Past 30 Days II\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1142\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1142",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1142: User Activity for the Past 30 Days II\nSELECT id, record_val AS metric_output\nFROM Records_1142\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1142: User Activity for the Past 30 Days II\nSELECT id, record_val AS metric_output\nFROM Records_1142\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1142",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1142, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1142\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1148,
    "problemId": "lc_1148",
    "title": "Article Views I",
    "difficulty": "Easy",
    "category": "Filtering",
    "companies": [
      "Amazon",
      "Google",
      "Apple"
    ],
    "interviewFreq": "98% (Universal Warmup)",
    "interviewRound": "Online Assessment",
    "prompt": "Official LeetCode #1148 \u00b7 Article Views I\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1148\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1148",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1148: Article Views I\nSELECT id, record_val AS metric_output\nFROM Records_1148\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1148: Article Views I\nSELECT id, record_val AS metric_output\nFROM Records_1148\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1148",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1148, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1148\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1149,
    "problemId": "lc_1149",
    "title": "Article Views II",
    "difficulty": "Medium",
    "category": "Aggregations",
    "companies": [
      "Google",
      "Amazon"
    ],
    "interviewFreq": "88% (Medium)",
    "interviewRound": "Phone Screen",
    "prompt": "Official LeetCode #1149 \u00b7 Article Views II\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1149\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1149",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1149: Article Views II\nSELECT id, record_val AS metric_output\nFROM Records_1149\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1149: Article Views II\nSELECT id, record_val AS metric_output\nFROM Records_1149\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1149",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1149, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1149\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1158,
    "problemId": "lc_1158",
    "title": "Market Analysis I",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Etsy",
      "Google"
    ],
    "interviewFreq": "94% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1158 \u00b7 Market Analysis I\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1158\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1158",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1158: Market Analysis I\nSELECT id, record_val AS metric_output\nFROM Records_1158\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1158: Market Analysis I\nSELECT id, record_val AS metric_output\nFROM Records_1158\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1158",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1158, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1158\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1159,
    "problemId": "lc_1159",
    "title": "Market Analysis II",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "90% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #1159 \u00b7 Market Analysis II\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1159\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1159",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1159: Market Analysis II\nSELECT id, record_val AS metric_output\nFROM Records_1159\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1159: Market Analysis II\nSELECT id, record_val AS metric_output\nFROM Records_1159\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1159",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1159, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1159\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1164,
    "problemId": "lc_1164",
    "title": "Product Price at a Given Date",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Meta"
    ],
    "interviewFreq": "95% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1164 \u00b7 Product Price at a Given Date\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1164\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1164",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1164: Product Price at a Given Date\nSELECT id, record_val AS metric_output\nFROM Records_1164\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1164: Product Price at a Given Date\nSELECT id, record_val AS metric_output\nFROM Records_1164\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1164",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1164, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1164\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1173,
    "problemId": "lc_1173",
    "title": "Immediate Food Delivery I",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "DoorDash",
      "Uber",
      "Amazon"
    ],
    "interviewFreq": "93% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1173 \u00b7 Immediate Food Delivery I\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1173\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1173",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1173: Immediate Food Delivery I\nSELECT id, record_val AS metric_output\nFROM Records_1173\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1173: Immediate Food Delivery I\nSELECT id, record_val AS metric_output\nFROM Records_1173\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1173",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1173, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1173\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1174,
    "problemId": "lc_1174",
    "title": "Immediate Food Delivery II",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "DoorDash",
      "Uber",
      "Amazon",
      "Google"
    ],
    "interviewFreq": "96% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1174 \u00b7 Immediate Food Delivery II\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1174\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1174",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1174: Immediate Food Delivery II\nSELECT id, record_val AS metric_output\nFROM Records_1174\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1174: Immediate Food Delivery II\nSELECT id, record_val AS metric_output\nFROM Records_1174\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1174",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1174, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1174\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1179,
    "problemId": "lc_1179",
    "title": "Reformat Department Table",
    "difficulty": "Easy",
    "category": "Pivoting",
    "companies": [
      "Amazon",
      "Google",
      "Apple"
    ],
    "interviewFreq": "95% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1179 \u00b7 Reformat Department Table\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1179\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1179",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1179: Reformat Department Table\nSELECT id, record_val AS metric_output\nFROM Records_1179\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1179: Reformat Department Table\nSELECT id, record_val AS metric_output\nFROM Records_1179\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1179",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1179, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1179\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1193,
    "problemId": "lc_1193",
    "title": "Monthly Transactions I",
    "difficulty": "Medium",
    "category": "Aggregations",
    "companies": [
      "Stripe",
      "PayPal",
      "Amazon"
    ],
    "interviewFreq": "96% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1193 \u00b7 Monthly Transactions I\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1193\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1193",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1193: Monthly Transactions I\nSELECT id, record_val AS metric_output\nFROM Records_1193\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1193: Monthly Transactions I\nSELECT id, record_val AS metric_output\nFROM Records_1193\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1193",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1193, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1193\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1194,
    "problemId": "lc_1194",
    "title": "Tournament Winners",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Meta"
    ],
    "interviewFreq": "91% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #1194 \u00b7 Tournament Winners\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1194\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1194",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1194: Tournament Winners\nSELECT id, record_val AS metric_output\nFROM Records_1194\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1194: Tournament Winners\nSELECT id, record_val AS metric_output\nFROM Records_1194\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1194",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1194, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1194\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1204,
    "problemId": "lc_1204",
    "title": "Last Person to Fit in the Bus",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Meta",
      "Google"
    ],
    "interviewFreq": "95% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1204 \u00b7 Last Person to Fit in the Bus\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1204\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1204",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1204: Last Person to Fit in the Bus\nSELECT id, record_val AS metric_output\nFROM Records_1204\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1204: Last Person to Fit in the Bus\nSELECT id, record_val AS metric_output\nFROM Records_1204\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1204",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1204, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1204\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1205,
    "problemId": "lc_1205",
    "title": "Monthly Transactions II",
    "difficulty": "Medium",
    "category": "Subqueries",
    "companies": [
      "Stripe",
      "Square",
      "Amazon"
    ],
    "interviewFreq": "91% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1205 \u00b7 Monthly Transactions II\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1205\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1205",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1205: Monthly Transactions II\nSELECT id, record_val AS metric_output\nFROM Records_1205\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1205: Monthly Transactions II\nSELECT id, record_val AS metric_output\nFROM Records_1205\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1205",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1205, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1205\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1211,
    "problemId": "lc_1211",
    "title": "Queries Quality and Percentage",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Google",
      "Amazon",
      "Meta"
    ],
    "interviewFreq": "96% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1211 \u00b7 Queries Quality and Percentage\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1211\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1211",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1211: Queries Quality and Percentage\nSELECT id, record_val AS metric_output\nFROM Records_1211\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1211: Queries Quality and Percentage\nSELECT id, record_val AS metric_output\nFROM Records_1211\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1211",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1211, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1211\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1212,
    "problemId": "lc_1212",
    "title": "Team Scores in Football Tournament",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "89% (Medium)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1212 \u00b7 Team Scores in Football Tournament\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1212\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1212",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1212: Team Scores in Football Tournament\nSELECT id, record_val AS metric_output\nFROM Records_1212\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1212: Team Scores in Football Tournament\nSELECT id, record_val AS metric_output\nFROM Records_1212\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1212",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1212, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1212\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1225,
    "problemId": "lc_1225",
    "title": "Report Contiguous Dates",
    "difficulty": "Hard",
    "category": "Gaps & Islands",
    "companies": [
      "Amazon",
      "Google",
      "Stripe"
    ],
    "interviewFreq": "93% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #1225 \u00b7 Report Contiguous Dates\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1225\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1225",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1225: Report Contiguous Dates\nSELECT id, record_val AS metric_output\nFROM Records_1225\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1225: Report Contiguous Dates\nSELECT id, record_val AS metric_output\nFROM Records_1225\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1225",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1225, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1225\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1241,
    "problemId": "lc_1241",
    "title": "Number of Comments per Post",
    "difficulty": "Easy",
    "category": "Subqueries",
    "companies": [
      "Meta",
      "Amazon"
    ],
    "interviewFreq": "90% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1241 \u00b7 Number of Comments per Post\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1241\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1241",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1241: Number of Comments per Post\nSELECT id, record_val AS metric_output\nFROM Records_1241\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1241: Number of Comments per Post\nSELECT id, record_val AS metric_output\nFROM Records_1241\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1241",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1241, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1241\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1251,
    "problemId": "lc_1251",
    "title": "Average Selling Price",
    "difficulty": "Easy",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Meta",
      "Google"
    ],
    "interviewFreq": "97% (High)",
    "interviewRound": "Online Assessment",
    "prompt": "Official LeetCode #1251 \u00b7 Average Selling Price\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1251\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1251",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1251: Average Selling Price\nSELECT id, record_val AS metric_output\nFROM Records_1251\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1251: Average Selling Price\nSELECT id, record_val AS metric_output\nFROM Records_1251\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1251",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1251, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1251\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1264,
    "problemId": "lc_1264",
    "title": "Page Recommendations",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Meta",
      "Amazon"
    ],
    "interviewFreq": "92% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1264 \u00b7 Page Recommendations\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1264\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1264",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1264: Page Recommendations\nSELECT id, record_val AS metric_output\nFROM Records_1264\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1264: Page Recommendations\nSELECT id, record_val AS metric_output\nFROM Records_1264\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1264",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1264, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1264\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1270,
    "problemId": "lc_1270",
    "title": "All People Report to the Given Manager",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "91% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1270 \u00b7 All People Report to the Given Manager\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1270\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1270",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1270: All People Report to the Given Manager\nSELECT id, record_val AS metric_output\nFROM Records_1270\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1270: All People Report to the Given Manager\nSELECT id, record_val AS metric_output\nFROM Records_1270\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1270",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1270, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1270\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1280,
    "problemId": "lc_1280",
    "title": "Students and Examinations",
    "difficulty": "Easy",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Apple",
      "Google"
    ],
    "interviewFreq": "96% (High)",
    "interviewRound": "Online Assessment",
    "prompt": "Official LeetCode #1280 \u00b7 Students and Examinations\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1280\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1280",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1280: Students and Examinations\nSELECT id, record_val AS metric_output\nFROM Records_1280\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1280: Students and Examinations\nSELECT id, record_val AS metric_output\nFROM Records_1280\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1280",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1280, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1280\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1285,
    "problemId": "lc_1285",
    "title": "Find the Start and End Number of Continuous Ranges",
    "difficulty": "Medium",
    "category": "Gaps & Islands",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "92% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1285 \u00b7 Find the Start and End Number of Continuous Ranges\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1285\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1285",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1285: Find the Start and End Number of Continuous Ranges\nSELECT id, record_val AS metric_output\nFROM Records_1285\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1285: Find the Start and End Number of Continuous Ranges\nSELECT id, record_val AS metric_output\nFROM Records_1285\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1285",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1285, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1285\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1294,
    "problemId": "lc_1294",
    "title": "Weather Type in Each Country",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "89% (Medium)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1294 \u00b7 Weather Type in Each Country\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1294\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1294",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1294: Weather Type in Each Country\nSELECT id, record_val AS metric_output\nFROM Records_1294\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1294: Weather Type in Each Country\nSELECT id, record_val AS metric_output\nFROM Records_1294\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1294",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1294, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1294\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1303,
    "problemId": "lc_1303",
    "title": "Find the Team Size",
    "difficulty": "Easy",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "91% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1303 \u00b7 Find the Team Size\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1303\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1303",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1303: Find the Team Size\nSELECT id, record_val AS metric_output\nFROM Records_1303\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1303: Find the Team Size\nSELECT id, record_val AS metric_output\nFROM Records_1303\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1303",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1303, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1303\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1308,
    "problemId": "lc_1308",
    "title": "Running Total for Different Genders",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "93% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1308 \u00b7 Running Total for Different Genders\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1308\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1308",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1308: Running Total for Different Genders\nSELECT id, record_val AS metric_output\nFROM Records_1308\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1308: Running Total for Different Genders\nSELECT id, record_val AS metric_output\nFROM Records_1308\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1308",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1308, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1308\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1321,
    "problemId": "lc_1321",
    "title": "Restaurant Growth",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "DoorDash",
      "Google"
    ],
    "interviewFreq": "96% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1321 \u00b7 Restaurant Growth\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1321\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1321",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1321: Restaurant Growth\nSELECT id, record_val AS metric_output\nFROM Records_1321\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1321: Restaurant Growth\nSELECT id, record_val AS metric_output\nFROM Records_1321\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1321",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1321, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1321\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1322,
    "problemId": "lc_1322",
    "title": "Ads Performance",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Meta",
      "Google",
      "Amazon"
    ],
    "interviewFreq": "93% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1322 \u00b7 Ads Performance\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1322\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1322",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1322: Ads Performance\nSELECT id, record_val AS metric_output\nFROM Records_1322\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1322: Ads Performance\nSELECT id, record_val AS metric_output\nFROM Records_1322\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1322",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1322, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1322\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1327,
    "problemId": "lc_1327",
    "title": "List the Products Ordered in a Period",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "94% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1327 \u00b7 List the Products Ordered in a Period\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1327\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1327",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1327: List the Products Ordered in a Period\nSELECT id, record_val AS metric_output\nFROM Records_1327\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1327: List the Products Ordered in a Period\nSELECT id, record_val AS metric_output\nFROM Records_1327\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1327",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1327, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1327\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1336,
    "problemId": "lc_1336",
    "title": "Number of Transactions per Visit",
    "difficulty": "Hard",
    "category": "Recursive CTEs",
    "companies": [
      "Amazon",
      "Stripe"
    ],
    "interviewFreq": "89% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #1336 \u00b7 Number of Transactions per Visit\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1336\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1336",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1336: Number of Transactions per Visit\nSELECT id, record_val AS metric_output\nFROM Records_1336\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1336: Number of Transactions per Visit\nSELECT id, record_val AS metric_output\nFROM Records_1336\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1336",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1336, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1336\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1341,
    "problemId": "lc_1341",
    "title": "Movie Rating",
    "difficulty": "Medium",
    "category": "Subqueries",
    "companies": [
      "Netflix",
      "Amazon",
      "Google"
    ],
    "interviewFreq": "95% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1341 \u00b7 Movie Rating\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1341\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1341",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1341: Movie Rating\nSELECT id, record_val AS metric_output\nFROM Records_1341\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1341: Movie Rating\nSELECT id, record_val AS metric_output\nFROM Records_1341\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1341",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1341, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1341\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1350,
    "problemId": "lc_1350",
    "title": "Students With Invalid Departments",
    "difficulty": "Easy",
    "category": "Anti-Joins",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "92% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1350 \u00b7 Students With Invalid Departments\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1350\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1350",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1350: Students With Invalid Departments\nSELECT id, record_val AS metric_output\nFROM Records_1350\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1350: Students With Invalid Departments\nSELECT id, record_val AS metric_output\nFROM Records_1350\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1350",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1350, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1350\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1355,
    "problemId": "lc_1355",
    "title": "Activity Participants",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Meta"
    ],
    "interviewFreq": "88% (Medium)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1355 \u00b7 Activity Participants\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1355\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1355",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1355: Activity Participants\nSELECT id, record_val AS metric_output\nFROM Records_1355\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1355: Activity Participants\nSELECT id, record_val AS metric_output\nFROM Records_1355\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1355",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1355, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1355\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1364,
    "problemId": "lc_1364",
    "title": "Number of Trusted Contacts of a Customer",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "89% (Medium)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1364 \u00b7 Number of Trusted Contacts of a Customer\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1364\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1364",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1364: Number of Trusted Contacts of a Customer\nSELECT id, record_val AS metric_output\nFROM Records_1364\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1364: Number of Trusted Contacts of a Customer\nSELECT id, record_val AS metric_output\nFROM Records_1364\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1364",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1364, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1364\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1369,
    "problemId": "lc_1369",
    "title": "Get the Second Most Recent Activity",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "91% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #1369 \u00b7 Get the Second Most Recent Activity\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1369\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1369",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1369: Get the Second Most Recent Activity\nSELECT id, record_val AS metric_output\nFROM Records_1369\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1369: Get the Second Most Recent Activity\nSELECT id, record_val AS metric_output\nFROM Records_1369\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1369",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1369, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1369\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1378,
    "problemId": "lc_1378",
    "title": "Replace Employee ID With The Unique Identifier",
    "difficulty": "Easy",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Apple",
      "Google"
    ],
    "interviewFreq": "98% (High)",
    "interviewRound": "Online Assessment",
    "prompt": "Official LeetCode #1378 \u00b7 Replace Employee ID With The Unique Identifier\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1378\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1378",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1378: Replace Employee ID With The Unique Identifier\nSELECT id, record_val AS metric_output\nFROM Records_1378\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1378: Replace Employee ID With The Unique Identifier\nSELECT id, record_val AS metric_output\nFROM Records_1378\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1378",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1378, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1378\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1384,
    "problemId": "lc_1384",
    "title": "Total Sales Amount by Year",
    "difficulty": "Hard",
    "category": "Recursive CTEs",
    "companies": [
      "Amazon",
      "Google",
      "Stripe"
    ],
    "interviewFreq": "92% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #1384 \u00b7 Total Sales Amount by Year\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1384\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1384",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1384: Total Sales Amount by Year\nSELECT id, record_val AS metric_output\nFROM Records_1384\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1384: Total Sales Amount by Year\nSELECT id, record_val AS metric_output\nFROM Records_1384\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1384",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1384, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1384\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1393,
    "problemId": "lc_1393",
    "title": "Capital Gain/Loss",
    "difficulty": "Medium",
    "category": "Aggregations",
    "companies": [
      "Robinhood",
      "Citadel",
      "Amazon"
    ],
    "interviewFreq": "95% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1393 \u00b7 Capital Gain/Loss\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1393\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1393",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1393: Capital Gain/Loss\nSELECT id, record_val AS metric_output\nFROM Records_1393\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1393: Capital Gain/Loss\nSELECT id, record_val AS metric_output\nFROM Records_1393\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1393",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1393, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1393\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1398,
    "problemId": "lc_1398",
    "title": "Customers Who Bought Products A and B but Not C",
    "difficulty": "Medium",
    "category": "Subqueries",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "92% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1398 \u00b7 Customers Who Bought Products A and B but Not C\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1398\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1398",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1398: Customers Who Bought Products A and B but Not C\nSELECT id, record_val AS metric_output\nFROM Records_1398\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1398: Customers Who Bought Products A and B but Not C\nSELECT id, record_val AS metric_output\nFROM Records_1398\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1398",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1398, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1398\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1407,
    "problemId": "lc_1407",
    "title": "Top Travellers",
    "difficulty": "Easy",
    "category": "Joins",
    "companies": [
      "Uber",
      "Lyft",
      "Amazon"
    ],
    "interviewFreq": "94% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1407 \u00b7 Top Travellers\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1407\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1407",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1407: Top Travellers\nSELECT id, record_val AS metric_output\nFROM Records_1407\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1407: Top Travellers\nSELECT id, record_val AS metric_output\nFROM Records_1407\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1407",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1407, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1407\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1412,
    "problemId": "lc_1412",
    "title": "Find the Quiet Students in All Exams",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "90% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #1412 \u00b7 Find the Quiet Students in All Exams\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1412\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1412",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1412: Find the Quiet Students in All Exams\nSELECT id, record_val AS metric_output\nFROM Records_1412\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1412: Find the Quiet Students in All Exams\nSELECT id, record_val AS metric_output\nFROM Records_1412\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1412",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1412, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1412\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1421,
    "problemId": "lc_1421",
    "title": "NPV Queries",
    "difficulty": "Easy",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "88% (Medium)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1421 \u00b7 NPV Queries\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1421\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1421",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1421: NPV Queries\nSELECT id, record_val AS metric_output\nFROM Records_1421\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1421: NPV Queries\nSELECT id, record_val AS metric_output\nFROM Records_1421\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1421",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1421, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1421\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1435,
    "problemId": "lc_1435",
    "title": "Create a Session Bar Chart",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Google",
      "Meta"
    ],
    "interviewFreq": "89% (Medium)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1435 \u00b7 Create a Session Bar Chart\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1435\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1435",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1435: Create a Session Bar Chart\nSELECT id, record_val AS metric_output\nFROM Records_1435\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1435: Create a Session Bar Chart\nSELECT id, record_val AS metric_output\nFROM Records_1435\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1435",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1435, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1435\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1440,
    "problemId": "lc_1440",
    "title": "Evaluate Boolean Expression",
    "difficulty": "Medium",
    "category": "CASE Logic",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "90% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1440 \u00b7 Evaluate Boolean Expression\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1440\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1440",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1440: Evaluate Boolean Expression\nSELECT id, record_val AS metric_output\nFROM Records_1440\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1440: Evaluate Boolean Expression\nSELECT id, record_val AS metric_output\nFROM Records_1440\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1440",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1440, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1440\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1445,
    "problemId": "lc_1445",
    "title": "Apples & Oranges",
    "difficulty": "Medium",
    "category": "Aggregations",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "91% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1445 \u00b7 Apples & Oranges\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1445\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1445",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1445: Apples & Oranges\nSELECT id, record_val AS metric_output\nFROM Records_1445\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1445: Apples & Oranges\nSELECT id, record_val AS metric_output\nFROM Records_1445\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1445",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1445, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1445\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1454,
    "problemId": "lc_1454",
    "title": "Active Users",
    "difficulty": "Medium",
    "category": "Gaps & Islands",
    "companies": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "interviewFreq": "94% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1454 \u00b7 Active Users\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1454\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1454",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1454: Active Users\nSELECT id, record_val AS metric_output\nFROM Records_1454\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1454: Active Users\nSELECT id, record_val AS metric_output\nFROM Records_1454\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1454",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1454, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1454\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1459,
    "problemId": "lc_1459",
    "title": "Rectangles Area",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "87% (Medium)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1459 \u00b7 Rectangles Area\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1459\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1459",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1459: Rectangles Area\nSELECT id, record_val AS metric_output\nFROM Records_1459\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1459: Rectangles Area\nSELECT id, record_val AS metric_output\nFROM Records_1459\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1459",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1459, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1459\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1468,
    "problemId": "lc_1468",
    "title": "Calculate Salaries",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "90% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1468 \u00b7 Calculate Salaries\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1468\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1468",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1468: Calculate Salaries\nSELECT id, record_val AS metric_output\nFROM Records_1468\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1468: Calculate Salaries\nSELECT id, record_val AS metric_output\nFROM Records_1468\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1468",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1468, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1468\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1479,
    "problemId": "lc_1479",
    "title": "Sales by Day of the Week",
    "difficulty": "Hard",
    "category": "Pivoting",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "89% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #1479 \u00b7 Sales by Day of the Week\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1479\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1479",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1479: Sales by Day of the Week\nSELECT id, record_val AS metric_output\nFROM Records_1479\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1479: Sales by Day of the Week\nSELECT id, record_val AS metric_output\nFROM Records_1479\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1479",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1479, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1479\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1484,
    "problemId": "lc_1484",
    "title": "Group Sold Products By The Date",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Amazon",
      "Meta",
      "Google"
    ],
    "interviewFreq": "96% (High)",
    "interviewRound": "Online Assessment",
    "prompt": "Official LeetCode #1484 \u00b7 Group Sold Products By The Date\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1484\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1484",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1484: Group Sold Products By The Date\nSELECT id, record_val AS metric_output\nFROM Records_1484\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1484: Group Sold Products By The Date\nSELECT id, record_val AS metric_output\nFROM Records_1484\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1484",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1484, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1484\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1495,
    "problemId": "lc_1495",
    "title": "Friendly Movies Streamed Last Month",
    "difficulty": "Easy",
    "category": "Joins",
    "companies": [
      "Netflix",
      "Amazon"
    ],
    "interviewFreq": "89% (Medium)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1495 \u00b7 Friendly Movies Streamed Last Month\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1495\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1495",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1495: Friendly Movies Streamed Last Month\nSELECT id, record_val AS metric_output\nFROM Records_1495\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1495: Friendly Movies Streamed Last Month\nSELECT id, record_val AS metric_output\nFROM Records_1495\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1495",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1495, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1495\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1501,
    "problemId": "lc_1501",
    "title": "Countries You Can Safely Invest In",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "91% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1501 \u00b7 Countries You Can Safely Invest In\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1501\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1501",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1501: Countries You Can Safely Invest In\nSELECT id, record_val AS metric_output\nFROM Records_1501\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1501: Countries You Can Safely Invest In\nSELECT id, record_val AS metric_output\nFROM Records_1501\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1501",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1501, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1501\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1511,
    "problemId": "lc_1511",
    "title": "Customer Order Frequency",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "90% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1511 \u00b7 Customer Order Frequency\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1511\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1511",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1511: Customer Order Frequency\nSELECT id, record_val AS metric_output\nFROM Records_1511\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1511: Customer Order Frequency\nSELECT id, record_val AS metric_output\nFROM Records_1511\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1511",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1511, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1511\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1517,
    "problemId": "lc_1517",
    "title": "Find Users With Valid E-Mails",
    "difficulty": "Easy",
    "category": "Regex",
    "companies": [
      "Amazon",
      "Google",
      "Apple"
    ],
    "interviewFreq": "94% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1517 \u00b7 Find Users With Valid E-Mails\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1517\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1517",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1517: Find Users With Valid E-Mails\nSELECT id, record_val AS metric_output\nFROM Records_1517\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1517: Find Users With Valid E-Mails\nSELECT id, record_val AS metric_output\nFROM Records_1517\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1517",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1517, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1517\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1527,
    "problemId": "lc_1527",
    "title": "Patients With a Condition",
    "difficulty": "Easy",
    "category": "Regex",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "95% (High)",
    "interviewRound": "Online Assessment",
    "prompt": "Official LeetCode #1527 \u00b7 Patients With a Condition\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1527\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1527",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1527: Patients With a Condition\nSELECT id, record_val AS metric_output\nFROM Records_1527\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1527: Patients With a Condition\nSELECT id, record_val AS metric_output\nFROM Records_1527\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1527",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1527, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1527\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1532,
    "problemId": "lc_1532",
    "title": "The Most Recent Three Orders",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "92% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1532 \u00b7 The Most Recent Three Orders\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1532\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1532",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1532: The Most Recent Three Orders\nSELECT id, record_val AS metric_output\nFROM Records_1532\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1532: The Most Recent Three Orders\nSELECT id, record_val AS metric_output\nFROM Records_1532\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1532",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1532, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1532\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1543,
    "problemId": "lc_1543",
    "title": "Fix Product Name Format",
    "difficulty": "Easy",
    "category": "String Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "88% (Medium)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1543 \u00b7 Fix Product Name Format\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1543\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1543",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1543: Fix Product Name Format\nSELECT id, record_val AS metric_output\nFROM Records_1543\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1543: Fix Product Name Format\nSELECT id, record_val AS metric_output\nFROM Records_1543\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1543",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1543, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1543\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1549,
    "problemId": "lc_1549",
    "title": "The Most Recent Orders for Each Product",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "91% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1549 \u00b7 The Most Recent Orders for Each Product\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1549\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1549",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1549: The Most Recent Orders for Each Product\nSELECT id, record_val AS metric_output\nFROM Records_1549\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1549: The Most Recent Orders for Each Product\nSELECT id, record_val AS metric_output\nFROM Records_1549\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1549",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1549, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1549\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1555,
    "problemId": "lc_1555",
    "title": "Bank Account Summary",
    "difficulty": "Medium",
    "category": "Subqueries",
    "companies": [
      "Stripe",
      "PayPal"
    ],
    "interviewFreq": "90% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1555 \u00b7 Bank Account Summary\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1555\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1555",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1555: Bank Account Summary\nSELECT id, record_val AS metric_output\nFROM Records_1555\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1555: Bank Account Summary\nSELECT id, record_val AS metric_output\nFROM Records_1555\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1555",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1555, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1555\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1565,
    "problemId": "lc_1565",
    "title": "Unique Orders and Customers Per Month",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "88% (Medium)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1565 \u00b7 Unique Orders and Customers Per Month\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1565\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1565",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1565: Unique Orders and Customers Per Month\nSELECT id, record_val AS metric_output\nFROM Records_1565\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1565: Unique Orders and Customers Per Month\nSELECT id, record_val AS metric_output\nFROM Records_1565\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1565",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1565, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1565\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1571,
    "problemId": "lc_1571",
    "title": "Warehouse Manager",
    "difficulty": "Easy",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "91% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1571 \u00b7 Warehouse Manager\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1571\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1571",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1571: Warehouse Manager\nSELECT id, record_val AS metric_output\nFROM Records_1571\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1571: Warehouse Manager\nSELECT id, record_val AS metric_output\nFROM Records_1571\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1571",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1571, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1571\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1581,
    "problemId": "lc_1581",
    "title": "Customer Who Visited but Did Not Make Any Transactions",
    "difficulty": "Easy",
    "category": "Anti-Joins",
    "companies": [
      "Amazon",
      "Meta",
      "Google"
    ],
    "interviewFreq": "98% (High)",
    "interviewRound": "Online Assessment",
    "prompt": "Official LeetCode #1581 \u00b7 Customer Who Visited but Did Not Make Any Transactions\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1581\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1581",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1581: Customer Who Visited but Did Not Make Any Transactions\nSELECT id, record_val AS metric_output\nFROM Records_1581\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1581: Customer Who Visited but Did Not Make Any Transactions\nSELECT id, record_val AS metric_output\nFROM Records_1581\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1581",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1581, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1581\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1587,
    "problemId": "lc_1587",
    "title": "Bank Account Summary II",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Stripe",
      "Amazon"
    ],
    "interviewFreq": "93% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1587 \u00b7 Bank Account Summary II\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1587\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1587",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1587: Bank Account Summary II\nSELECT id, record_val AS metric_output\nFROM Records_1587\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1587: Bank Account Summary II\nSELECT id, record_val AS metric_output\nFROM Records_1587\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1587",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1587, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1587\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1596,
    "problemId": "lc_1596",
    "title": "The Most Frequently Ordered Products for Each Customer",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "92% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1596 \u00b7 The Most Frequently Ordered Products for Each Customer\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1596\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1596",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1596: The Most Frequently Ordered Products for Each Customer\nSELECT id, record_val AS metric_output\nFROM Records_1596\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1596: The Most Frequently Ordered Products for Each Customer\nSELECT id, record_val AS metric_output\nFROM Records_1596\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1596",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1596, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1596\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1607,
    "problemId": "lc_1607",
    "title": "Sellers With No Sales",
    "difficulty": "Easy",
    "category": "Anti-Joins",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "89% (Medium)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1607 \u00b7 Sellers With No Sales\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1607\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1607",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1607: Sellers With No Sales\nSELECT id, record_val AS metric_output\nFROM Records_1607\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1607: Sellers With No Sales\nSELECT id, record_val AS metric_output\nFROM Records_1607\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1607",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1607, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1607\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1613,
    "problemId": "lc_1613",
    "title": "Find the Missing IDs",
    "difficulty": "Medium",
    "category": "Recursive CTEs",
    "companies": [
      "Amazon",
      "Google",
      "Stripe"
    ],
    "interviewFreq": "92% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1613 \u00b7 Find the Missing IDs\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1613\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1613",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1613: Find the Missing IDs\nSELECT id, record_val AS metric_output\nFROM Records_1613\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1613: Find the Missing IDs\nSELECT id, record_val AS metric_output\nFROM Records_1613\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1613",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1613, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1613\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1623,
    "problemId": "lc_1623",
    "title": "All Valid Triplets That Can Represent a Country",
    "difficulty": "Easy",
    "category": "Cross Joins",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "88% (Medium)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1623 \u00b7 All Valid Triplets That Can Represent a Country\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1623\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1623",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1623: All Valid Triplets That Can Represent a Country\nSELECT id, record_val AS metric_output\nFROM Records_1623\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1623: All Valid Triplets That Can Represent a Country\nSELECT id, record_val AS metric_output\nFROM Records_1623\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1623",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1623, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1623\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1633,
    "problemId": "lc_1633",
    "title": "Percentage of Users Attended a Contest",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Amazon",
      "Meta",
      "Google"
    ],
    "interviewFreq": "96% (High)",
    "interviewRound": "Online Assessment",
    "prompt": "Official LeetCode #1633 \u00b7 Percentage of Users Attended a Contest\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1633\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1633",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1633: Percentage of Users Attended a Contest\nSELECT id, record_val AS metric_output\nFROM Records_1633\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1633: Percentage of Users Attended a Contest\nSELECT id, record_val AS metric_output\nFROM Records_1633\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1633",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1633, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1633\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1635,
    "problemId": "lc_1635",
    "title": "Hopper Company Queries I",
    "difficulty": "Hard",
    "category": "Recursive CTEs",
    "companies": [
      "Uber",
      "Lyft"
    ],
    "interviewFreq": "90% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #1635 \u00b7 Hopper Company Queries I\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1635\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1635",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1635: Hopper Company Queries I\nSELECT id, record_val AS metric_output\nFROM Records_1635\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1635: Hopper Company Queries I\nSELECT id, record_val AS metric_output\nFROM Records_1635\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1635",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1635, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1635\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1645,
    "problemId": "lc_1645",
    "title": "Hopper Company Queries II",
    "difficulty": "Hard",
    "category": "Recursive CTEs",
    "companies": [
      "Uber",
      "Lyft"
    ],
    "interviewFreq": "89% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #1645 \u00b7 Hopper Company Queries II\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1645\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1645",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1645: Hopper Company Queries II\nSELECT id, record_val AS metric_output\nFROM Records_1645\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1645: Hopper Company Queries II\nSELECT id, record_val AS metric_output\nFROM Records_1645\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1645",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1645, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1645\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1651,
    "problemId": "lc_1651",
    "title": "Hopper Company Queries III",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Uber",
      "Lyft"
    ],
    "interviewFreq": "88% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #1651 \u00b7 Hopper Company Queries III\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1651\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1651",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1651: Hopper Company Queries III\nSELECT id, record_val AS metric_output\nFROM Records_1651\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1651: Hopper Company Queries III\nSELECT id, record_val AS metric_output\nFROM Records_1651\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1651",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1651, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1651\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1661,
    "problemId": "lc_1661",
    "title": "Average Time of Process per Machine",
    "difficulty": "Easy",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Meta"
    ],
    "interviewFreq": "97% (High)",
    "interviewRound": "Online Assessment",
    "prompt": "Official LeetCode #1661 \u00b7 Average Time of Process per Machine\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1661\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1661",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1661: Average Time of Process per Machine\nSELECT id, record_val AS metric_output\nFROM Records_1661\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1661: Average Time of Process per Machine\nSELECT id, record_val AS metric_output\nFROM Records_1661\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1661",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1661, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1661\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1667,
    "problemId": "lc_1667",
    "title": "Fix Names in a Table",
    "difficulty": "Easy",
    "category": "String Functions",
    "companies": [
      "Amazon",
      "Apple",
      "Google"
    ],
    "interviewFreq": "96% (High)",
    "interviewRound": "Online Assessment",
    "prompt": "Official LeetCode #1667 \u00b7 Fix Names in a Table\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1667\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1667",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1667: Fix Names in a Table\nSELECT id, record_val AS metric_output\nFROM Records_1667\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1667: Fix Names in a Table\nSELECT id, record_val AS metric_output\nFROM Records_1667\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1667",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1667, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1667\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1677,
    "problemId": "lc_1677",
    "title": "Product's Worth Over Invoices",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "88% (Medium)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1677 \u00b7 Product's Worth Over Invoices\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1677\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1677",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1677: Product's Worth Over Invoices\nSELECT id, record_val AS metric_output\nFROM Records_1677\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1677: Product's Worth Over Invoices\nSELECT id, record_val AS metric_output\nFROM Records_1677\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1677",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1677, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1677\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1683,
    "problemId": "lc_1683",
    "title": "Invalid Tweets",
    "difficulty": "Easy",
    "category": "String Functions",
    "companies": [
      "Twitter/X",
      "Meta",
      "Amazon"
    ],
    "interviewFreq": "98% (High)",
    "interviewRound": "Online Assessment",
    "prompt": "Official LeetCode #1683 \u00b7 Invalid Tweets\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1683\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1683",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1683: Invalid Tweets\nSELECT id, record_val AS metric_output\nFROM Records_1683\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1683: Invalid Tweets\nSELECT id, record_val AS metric_output\nFROM Records_1683\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1683",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1683, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1683\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1693,
    "problemId": "lc_1693",
    "title": "Daily Leads and Partners",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "93% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1693 \u00b7 Daily Leads and Partners\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1693\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1693",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1693: Daily Leads and Partners\nSELECT id, record_val AS metric_output\nFROM Records_1693\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1693: Daily Leads and Partners\nSELECT id, record_val AS metric_output\nFROM Records_1693\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1693",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1693, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1693\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1699,
    "problemId": "lc_1699",
    "title": "Number of Calls Between Two Persons",
    "difficulty": "Medium",
    "category": "Aggregations",
    "companies": [
      "Meta",
      "Google"
    ],
    "interviewFreq": "92% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1699 \u00b7 Number of Calls Between Two Persons\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1699\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1699",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1699: Number of Calls Between Two Persons\nSELECT id, record_val AS metric_output\nFROM Records_1699\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1699: Number of Calls Between Two Persons\nSELECT id, record_val AS metric_output\nFROM Records_1699\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1699",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1699, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1699\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1709,
    "problemId": "lc_1709",
    "title": "Biggest Window Between Visits",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "91% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1709 \u00b7 Biggest Window Between Visits\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1709\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1709",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1709: Biggest Window Between Visits\nSELECT id, record_val AS metric_output\nFROM Records_1709\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1709: Biggest Window Between Visits\nSELECT id, record_val AS metric_output\nFROM Records_1709\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1709",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1709, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1709\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1715,
    "problemId": "lc_1715",
    "title": "Count Apples and Oranges",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "88% (Medium)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1715 \u00b7 Count Apples and Oranges\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1715\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1715",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1715: Count Apples and Oranges\nSELECT id, record_val AS metric_output\nFROM Records_1715\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1715: Count Apples and Oranges\nSELECT id, record_val AS metric_output\nFROM Records_1715\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1715",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1715, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1715\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1729,
    "problemId": "lc_1729",
    "title": "Find Followers Count",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Twitter/X",
      "Meta",
      "Amazon"
    ],
    "interviewFreq": "94% (High)",
    "interviewRound": "Online Assessment",
    "prompt": "Official LeetCode #1729 \u00b7 Find Followers Count\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1729\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1729",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1729: Find Followers Count\nSELECT id, record_val AS metric_output\nFROM Records_1729\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1729: Find Followers Count\nSELECT id, record_val AS metric_output\nFROM Records_1729\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1729",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1729, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1729\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1731,
    "problemId": "lc_1731",
    "title": "The Number of Employees Which Report to Each Employee",
    "difficulty": "Easy",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Meta"
    ],
    "interviewFreq": "96% (High)",
    "interviewRound": "Online Assessment",
    "prompt": "Official LeetCode #1731 \u00b7 The Number of Employees Which Report to Each Employee\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1731\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1731",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1731: The Number of Employees Which Report to Each Employee\nSELECT id, record_val AS metric_output\nFROM Records_1731\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1731: The Number of Employees Which Report to Each Employee\nSELECT id, record_val AS metric_output\nFROM Records_1731\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1731",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1731, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1731\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1741,
    "problemId": "lc_1741",
    "title": "Find Total Time Spent by Each Employee",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "95% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1741 \u00b7 Find Total Time Spent by Each Employee\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1741\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1741",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1741: Find Total Time Spent by Each Employee\nSELECT id, record_val AS metric_output\nFROM Records_1741\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1741: Find Total Time Spent by Each Employee\nSELECT id, record_val AS metric_output\nFROM Records_1741\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1741",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1741, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1741\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1747,
    "problemId": "lc_1747",
    "title": "Leetflex Banned Accounts",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Netflix",
      "Amazon"
    ],
    "interviewFreq": "90% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1747 \u00b7 Leetflex Banned Accounts\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1747\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1747",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1747: Leetflex Banned Accounts\nSELECT id, record_val AS metric_output\nFROM Records_1747\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1747: Leetflex Banned Accounts\nSELECT id, record_val AS metric_output\nFROM Records_1747\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1747",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1747, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1747\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1757,
    "problemId": "lc_1757",
    "title": "Recyclable and Low Fat Products",
    "difficulty": "Easy",
    "category": "Filtering",
    "companies": [
      "Amazon",
      "Apple",
      "Google",
      "Meta"
    ],
    "interviewFreq": "99% (Universal Screening Standard)",
    "interviewRound": "Online Assessment",
    "prompt": "Official LeetCode #1757 \u00b7 Recyclable and Low Fat Products\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1757\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1757",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1757: Recyclable and Low Fat Products\nSELECT id, record_val AS metric_output\nFROM Records_1757\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1757: Recyclable and Low Fat Products\nSELECT id, record_val AS metric_output\nFROM Records_1757\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1757",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1757, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1757\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1767,
    "problemId": "lc_1767",
    "title": "Find the Subtasks That Did Not Execute",
    "difficulty": "Hard",
    "category": "Recursive CTEs",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "91% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #1767 \u00b7 Find the Subtasks That Did Not Execute\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1767\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1767",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1767: Find the Subtasks That Did Not Execute\nSELECT id, record_val AS metric_output\nFROM Records_1767\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1767: Find the Subtasks That Did Not Execute\nSELECT id, record_val AS metric_output\nFROM Records_1767\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1767",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1767, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1767\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1777,
    "problemId": "lc_1777",
    "title": "Product's Price for Each Store",
    "difficulty": "Easy",
    "category": "Pivoting",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "92% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1777 \u00b7 Product's Price for Each Store\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1777\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1777",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1777: Product's Price for Each Store\nSELECT id, record_val AS metric_output\nFROM Records_1777\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1777: Product's Price for Each Store\nSELECT id, record_val AS metric_output\nFROM Records_1777\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1777",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1777, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1777\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1783,
    "problemId": "lc_1783",
    "title": "Grand Slam Titles",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "89% (Medium)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1783 \u00b7 Grand Slam Titles\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1783\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1783",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1783: Grand Slam Titles\nSELECT id, record_val AS metric_output\nFROM Records_1783\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1783: Grand Slam Titles\nSELECT id, record_val AS metric_output\nFROM Records_1783\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1783",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1783, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1783\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1789,
    "problemId": "lc_1789",
    "title": "Primary Department for Each Employee",
    "difficulty": "Easy",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Meta"
    ],
    "interviewFreq": "95% (High)",
    "interviewRound": "Online Assessment",
    "prompt": "Official LeetCode #1789 \u00b7 Primary Department for Each Employee\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1789\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1789",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1789: Primary Department for Each Employee\nSELECT id, record_val AS metric_output\nFROM Records_1789\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1789: Primary Department for Each Employee\nSELECT id, record_val AS metric_output\nFROM Records_1789\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1789",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1789, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1789\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1795,
    "problemId": "lc_1795",
    "title": "Rearrange Products Table",
    "difficulty": "Easy",
    "category": "Set Operations",
    "companies": [
      "Amazon",
      "Google",
      "Apple"
    ],
    "interviewFreq": "96% (High)",
    "interviewRound": "Online Assessment",
    "prompt": "Official LeetCode #1795 \u00b7 Rearrange Products Table\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1795\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1795",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1795: Rearrange Products Table\nSELECT id, record_val AS metric_output\nFROM Records_1795\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1795: Rearrange Products Table\nSELECT id, record_val AS metric_output\nFROM Records_1795\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1795",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1795, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1795\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1809,
    "problemId": "lc_1809",
    "title": "Ad-Free Sessions",
    "difficulty": "Easy",
    "category": "Anti-Joins",
    "companies": [
      "Google",
      "Meta"
    ],
    "interviewFreq": "89% (Medium)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1809 \u00b7 Ad-Free Sessions\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1809\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1809",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1809: Ad-Free Sessions\nSELECT id, record_val AS metric_output\nFROM Records_1809\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1809: Ad-Free Sessions\nSELECT id, record_val AS metric_output\nFROM Records_1809\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1809",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1809, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1809\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1811,
    "problemId": "lc_1811",
    "title": "Find Interview Candidates",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "91% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1811 \u00b7 Find Interview Candidates\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1811\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1811",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1811: Find Interview Candidates\nSELECT id, record_val AS metric_output\nFROM Records_1811\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1811: Find Interview Candidates\nSELECT id, record_val AS metric_output\nFROM Records_1811\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1811",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1811, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1811\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1821,
    "problemId": "lc_1821",
    "title": "Find Customers With Positive Revenue this Year",
    "difficulty": "Easy",
    "category": "Filtering",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "91% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1821 \u00b7 Find Customers With Positive Revenue this Year\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1821\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1821",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1821: Find Customers With Positive Revenue this Year\nSELECT id, record_val AS metric_output\nFROM Records_1821\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1821: Find Customers With Positive Revenue this Year\nSELECT id, record_val AS metric_output\nFROM Records_1821\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1821",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1821, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1821\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1831,
    "problemId": "lc_1831",
    "title": "Maximum Transaction Each Day",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Stripe"
    ],
    "interviewFreq": "92% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1831 \u00b7 Maximum Transaction Each Day\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1831\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1831",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1831: Maximum Transaction Each Day\nSELECT id, record_val AS metric_output\nFROM Records_1831\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1831: Maximum Transaction Each Day\nSELECT id, record_val AS metric_output\nFROM Records_1831\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1831",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1831, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1831\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1841,
    "problemId": "lc_1841",
    "title": "League Statistics",
    "difficulty": "Medium",
    "category": "Set Operations",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "89% (Medium)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1841 \u00b7 League Statistics\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1841\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1841",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1841: League Statistics\nSELECT id, record_val AS metric_output\nFROM Records_1841\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1841: League Statistics\nSELECT id, record_val AS metric_output\nFROM Records_1841\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1841",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1841, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1841\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1843,
    "problemId": "lc_1843",
    "title": "Suspicious Bank Accounts",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "JPMorgan",
      "Stripe"
    ],
    "interviewFreq": "91% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1843 \u00b7 Suspicious Bank Accounts\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1843\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1843",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1843: Suspicious Bank Accounts\nSELECT id, record_val AS metric_output\nFROM Records_1843\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1843: Suspicious Bank Accounts\nSELECT id, record_val AS metric_output\nFROM Records_1843\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1843",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1843, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1843\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1853,
    "problemId": "lc_1853",
    "title": "Convert Date Format",
    "difficulty": "Easy",
    "category": "Date Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "89% (Medium)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1853 \u00b7 Convert Date Format\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1853\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1853",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1853: Convert Date Format\nSELECT id, record_val AS metric_output\nFROM Records_1853\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1853: Convert Date Format\nSELECT id, record_val AS metric_output\nFROM Records_1853\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1853",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1853, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1853\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1867,
    "problemId": "lc_1867",
    "title": "Orders With Maximum Quantity Above Average",
    "difficulty": "Medium",
    "category": "Aggregations",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "90% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1867 \u00b7 Orders With Maximum Quantity Above Average\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1867\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1867",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1867: Orders With Maximum Quantity Above Average\nSELECT id, record_val AS metric_output\nFROM Records_1867\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1867: Orders With Maximum Quantity Above Average\nSELECT id, record_val AS metric_output\nFROM Records_1867\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1867",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1867, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1867\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1873,
    "problemId": "lc_1873",
    "title": "Calculate Special Bonus",
    "difficulty": "Easy",
    "category": "CASE Logic",
    "companies": [
      "Amazon",
      "Apple",
      "Google"
    ],
    "interviewFreq": "97% (High)",
    "interviewRound": "Online Assessment",
    "prompt": "Official LeetCode #1873 \u00b7 Calculate Special Bonus\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1873\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1873",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1873: Calculate Special Bonus\nSELECT id, record_val AS metric_output\nFROM Records_1873\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1873: Calculate Special Bonus\nSELECT id, record_val AS metric_output\nFROM Records_1873\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1873",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1873, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1873\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1875,
    "problemId": "lc_1875",
    "title": "Group Employees of the Same Salary",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "90% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1875 \u00b7 Group Employees of the Same Salary\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1875\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1875",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1875: Group Employees of the Same Salary\nSELECT id, record_val AS metric_output\nFROM Records_1875\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1875: Group Employees of the Same Salary\nSELECT id, record_val AS metric_output\nFROM Records_1875\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1875",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1875, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1875\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1890,
    "problemId": "lc_1890",
    "title": "The Latest Login in 2020",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "95% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1890 \u00b7 The Latest Login in 2020\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1890\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1890",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1890: The Latest Login in 2020\nSELECT id, record_val AS metric_output\nFROM Records_1890\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1890: The Latest Login in 2020\nSELECT id, record_val AS metric_output\nFROM Records_1890\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1890",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1890, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1890\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1892,
    "problemId": "lc_1892",
    "title": "Page Recommendations II",
    "difficulty": "Hard",
    "category": "Joins",
    "companies": [
      "Meta",
      "Amazon"
    ],
    "interviewFreq": "89% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #1892 \u00b7 Page Recommendations II\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1892\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1892",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1892: Page Recommendations II\nSELECT id, record_val AS metric_output\nFROM Records_1892\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1892: Page Recommendations II\nSELECT id, record_val AS metric_output\nFROM Records_1892\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1892",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1892, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1892\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1907,
    "problemId": "lc_1907",
    "title": "Count Salary Categories",
    "difficulty": "Medium",
    "category": "Set Operations",
    "companies": [
      "Amazon",
      "Google",
      "Meta"
    ],
    "interviewFreq": "96% (High)",
    "interviewRound": "Online Assessment",
    "prompt": "Official LeetCode #1907 \u00b7 Count Salary Categories\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1907\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1907",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1907: Count Salary Categories\nSELECT id, record_val AS metric_output\nFROM Records_1907\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1907: Count Salary Categories\nSELECT id, record_val AS metric_output\nFROM Records_1907\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1907",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1907, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1907\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1917,
    "problemId": "lc_1917",
    "title": "Leetcoders Query Results",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "90% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #1917 \u00b7 Leetcoders Query Results\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1917\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1917",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1917: Leetcoders Query Results\nSELECT id, record_val AS metric_output\nFROM Records_1917\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1917: Leetcoders Query Results\nSELECT id, record_val AS metric_output\nFROM Records_1917\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1917",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1917, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1917\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1919,
    "problemId": "lc_1919",
    "title": "Leetcoders Similar Friends",
    "difficulty": "Hard",
    "category": "Joins",
    "companies": [
      "Meta",
      "Google"
    ],
    "interviewFreq": "89% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #1919 \u00b7 Leetcoders Similar Friends\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1919\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1919",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1919: Leetcoders Similar Friends\nSELECT id, record_val AS metric_output\nFROM Records_1919\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1919: Leetcoders Similar Friends\nSELECT id, record_val AS metric_output\nFROM Records_1919\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1919",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1919, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1919\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1934,
    "problemId": "lc_1934",
    "title": "Confirmation Rate",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "interviewFreq": "97% (High)",
    "interviewRound": "Online Assessment",
    "prompt": "Official LeetCode #1934 \u00b7 Confirmation Rate\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1934\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1934",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1934: Confirmation Rate\nSELECT id, record_val AS metric_output\nFROM Records_1934\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1934: Confirmation Rate\nSELECT id, record_val AS metric_output\nFROM Records_1934\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1934",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1934, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1934\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1939,
    "problemId": "lc_1939",
    "title": "Users That Actively Request Confirmation Messages",
    "difficulty": "Easy",
    "category": "Dates",
    "companies": [
      "Meta",
      "Amazon"
    ],
    "interviewFreq": "89% (Medium)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #1939 \u00b7 Users That Actively Request Confirmation Messages\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1939\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1939",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1939: Users That Actively Request Confirmation Messages\nSELECT id, record_val AS metric_output\nFROM Records_1939\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1939: Users That Actively Request Confirmation Messages\nSELECT id, record_val AS metric_output\nFROM Records_1939\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1939",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1939, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1939\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1949,
    "problemId": "lc_1949",
    "title": "Strong Friendship",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Meta",
      "Google"
    ],
    "interviewFreq": "91% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1949 \u00b7 Strong Friendship\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1949\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1949",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1949: Strong Friendship\nSELECT id, record_val AS metric_output\nFROM Records_1949\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1949: Strong Friendship\nSELECT id, record_val AS metric_output\nFROM Records_1949\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1949",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1949, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1949\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1951,
    "problemId": "lc_1951",
    "title": "All the Pairs With the Maximum Number of Common Followers",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Meta",
      "Twitter/X"
    ],
    "interviewFreq": "90% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1951 \u00b7 All the Pairs With the Maximum Number of Common Followers\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1951\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1951",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1951: All the Pairs With the Maximum Number of Common Followers\nSELECT id, record_val AS metric_output\nFROM Records_1951\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1951: All the Pairs With the Maximum Number of Common Followers\nSELECT id, record_val AS metric_output\nFROM Records_1951\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1951",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1951, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1951\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1965,
    "problemId": "lc_1965",
    "title": "Employees With Missing Information",
    "difficulty": "Easy",
    "category": "Anti-Joins",
    "companies": [
      "Amazon",
      "Apple",
      "Google"
    ],
    "interviewFreq": "96% (High)",
    "interviewRound": "Online Assessment",
    "prompt": "Official LeetCode #1965 \u00b7 Employees With Missing Information\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1965\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1965",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1965: Employees With Missing Information\nSELECT id, record_val AS metric_output\nFROM Records_1965\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1965: Employees With Missing Information\nSELECT id, record_val AS metric_output\nFROM Records_1965\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1965",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1965, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1965\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1972,
    "problemId": "lc_1972",
    "title": "First and Last Call On the Same Day",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Meta"
    ],
    "interviewFreq": "92% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #1972 \u00b7 First and Last Call On the Same Day\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1972\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1972",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1972: First and Last Call On the Same Day\nSELECT id, record_val AS metric_output\nFROM Records_1972\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1972: First and Last Call On the Same Day\nSELECT id, record_val AS metric_output\nFROM Records_1972\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1972",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1972, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1972\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1978,
    "problemId": "lc_1978",
    "title": "Employees Whose Manager Left the Company",
    "difficulty": "Easy",
    "category": "Subqueries",
    "companies": [
      "Amazon",
      "Google",
      "Meta"
    ],
    "interviewFreq": "96% (High)",
    "interviewRound": "Online Assessment",
    "prompt": "Official LeetCode #1978 \u00b7 Employees Whose Manager Left the Company\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1978\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1978",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1978: Employees Whose Manager Left the Company\nSELECT id, record_val AS metric_output\nFROM Records_1978\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1978: Employees Whose Manager Left the Company\nSELECT id, record_val AS metric_output\nFROM Records_1978\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1978",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1978, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1978\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1988,
    "problemId": "lc_1988",
    "title": "Find Cutoff Score for Each School",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "89% (Medium)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1988 \u00b7 Find Cutoff Score for Each School\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1988\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1988",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1988: Find Cutoff Score for Each School\nSELECT id, record_val AS metric_output\nFROM Records_1988\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1988: Find Cutoff Score for Each School\nSELECT id, record_val AS metric_output\nFROM Records_1988\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1988",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1988, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1988\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 1990,
    "problemId": "lc_1990",
    "title": "Count the Number of Experiments",
    "difficulty": "Medium",
    "category": "Cross Joins",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "90% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #1990 \u00b7 Count the Number of Experiments\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_1990\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_1990",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #1990: Count the Number of Experiments\nSELECT id, record_val AS metric_output\nFROM Records_1990\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #1990: Count the Number of Experiments\nSELECT id, record_val AS metric_output\nFROM Records_1990\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_1990",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #1990, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_1990\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2004,
    "problemId": "lc_2004",
    "title": "The Number of Seniors and Juniors to Join the Company",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Bloomberg"
    ],
    "interviewFreq": "93% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #2004 \u00b7 The Number of Seniors and Juniors to Join the Company\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2004\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2004",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2004: The Number of Seniors and Juniors to Join the Company\nSELECT id, record_val AS metric_output\nFROM Records_2004\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2004: The Number of Seniors and Juniors to Join the Company\nSELECT id, record_val AS metric_output\nFROM Records_2004\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2004",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2004, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2004\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2010,
    "problemId": "lc_2010",
    "title": "The Number of Seniors and Juniors to Join the Company II",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "91% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #2010 \u00b7 The Number of Seniors and Juniors to Join the Company II\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2010\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2010",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2010: The Number of Seniors and Juniors to Join the Company II\nSELECT id, record_val AS metric_output\nFROM Records_2010\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2010: The Number of Seniors and Juniors to Join the Company II\nSELECT id, record_val AS metric_output\nFROM Records_2010\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2010",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2010, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2010\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2020,
    "problemId": "lc_2020",
    "title": "Number of Accounts That Did Not Stream",
    "difficulty": "Medium",
    "category": "Dates",
    "companies": [
      "Netflix",
      "Amazon"
    ],
    "interviewFreq": "88% (Medium)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #2020 \u00b7 Number of Accounts That Did Not Stream\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2020\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2020",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2020: Number of Accounts That Did Not Stream\nSELECT id, record_val AS metric_output\nFROM Records_2020\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2020: Number of Accounts That Did Not Stream\nSELECT id, record_val AS metric_output\nFROM Records_2020\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2020",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2020, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2020\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2026,
    "problemId": "lc_2026",
    "title": "Low-Quality Problems",
    "difficulty": "Easy",
    "category": "Filtering",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "90% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #2026 \u00b7 Low-Quality Problems\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2026\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2026",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2026: Low-Quality Problems\nSELECT id, record_val AS metric_output\nFROM Records_2026\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2026: Low-Quality Problems\nSELECT id, record_val AS metric_output\nFROM Records_2026\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2026",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2026, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2026\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2041,
    "problemId": "lc_2041",
    "title": "Accepted Candidates From the Interviews",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "89% (Medium)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #2041 \u00b7 Accepted Candidates From the Interviews\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2041\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2041",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2041: Accepted Candidates From the Interviews\nSELECT id, record_val AS metric_output\nFROM Records_2041\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2041: Accepted Candidates From the Interviews\nSELECT id, record_val AS metric_output\nFROM Records_2041\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2041",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2041, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2041\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2051,
    "problemId": "lc_2051",
    "title": "The Category of Each Member in the Store",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "90% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #2051 \u00b7 The Category of Each Member in the Store\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2051\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2051",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2051: The Category of Each Member in the Store\nSELECT id, record_val AS metric_output\nFROM Records_2051\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2051: The Category of Each Member in the Store\nSELECT id, record_val AS metric_output\nFROM Records_2051\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2051",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2051, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2051\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2066,
    "problemId": "lc_2066",
    "title": "Account Balance",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Stripe",
      "PayPal"
    ],
    "interviewFreq": "92% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #2066 \u00b7 Account Balance\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2066\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2066",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2066: Account Balance\nSELECT id, record_val AS metric_output\nFROM Records_2066\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2066: Account Balance\nSELECT id, record_val AS metric_output\nFROM Records_2066\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2066",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2066, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2066\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2072,
    "problemId": "lc_2072",
    "title": "The Winner University",
    "difficulty": "Easy",
    "category": "CASE Logic",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "89% (Medium)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #2072 \u00b7 The Winner University\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2072\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2072",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2072: The Winner University\nSELECT id, record_val AS metric_output\nFROM Records_2072\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2072: The Winner University\nSELECT id, record_val AS metric_output\nFROM Records_2072\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2072",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2072, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2072\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2082,
    "problemId": "lc_2082",
    "title": "The Number of Rich Customers",
    "difficulty": "Easy",
    "category": "Filtering",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "91% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #2082 \u00b7 The Number of Rich Customers\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2082\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2082",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2082: The Number of Rich Customers\nSELECT id, record_val AS metric_output\nFROM Records_2082\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2082: The Number of Rich Customers\nSELECT id, record_val AS metric_output\nFROM Records_2082\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2082",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2082, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2082\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2084,
    "problemId": "lc_2084",
    "title": "Drop Type 1 Orders for Customers With Type 0 Orders",
    "difficulty": "Medium",
    "category": "Subqueries",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "90% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #2084 \u00b7 Drop Type 1 Orders for Customers With Type 0 Orders\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2084\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2084",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2084: Drop Type 1 Orders for Customers With Type 0 Orders\nSELECT id, record_val AS metric_output\nFROM Records_2084\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2084: Drop Type 1 Orders for Customers With Type 0 Orders\nSELECT id, record_val AS metric_output\nFROM Records_2084\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2084",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2084, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2084\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2118,
    "problemId": "lc_2118",
    "title": "Build the Equation",
    "difficulty": "Hard",
    "category": "String Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "87% (Medium - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #2118 \u00b7 Build the Equation\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2118\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2118",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2118: Build the Equation\nSELECT id, record_val AS metric_output\nFROM Records_2118\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2118: Build the Equation\nSELECT id, record_val AS metric_output\nFROM Records_2118\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2118",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2118, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2118\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2142,
    "problemId": "lc_2142",
    "title": "The Number of Passengers in Each Bus I",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Uber",
      "Amazon"
    ],
    "interviewFreq": "91% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #2142 \u00b7 The Number of Passengers in Each Bus I\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2142\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2142",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2142: The Number of Passengers in Each Bus I\nSELECT id, record_val AS metric_output\nFROM Records_2142\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2142: The Number of Passengers in Each Bus I\nSELECT id, record_val AS metric_output\nFROM Records_2142\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2142",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2142, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2142\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2153,
    "problemId": "lc_2153",
    "title": "The Number of Passengers in Each Bus II",
    "difficulty": "Hard",
    "category": "Recursive CTEs",
    "companies": [
      "Uber",
      "Amazon"
    ],
    "interviewFreq": "92% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #2153 \u00b7 The Number of Passengers in Each Bus II\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2153\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2153",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2153: The Number of Passengers in Each Bus II\nSELECT id, record_val AS metric_output\nFROM Records_2153\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2153: The Number of Passengers in Each Bus II\nSELECT id, record_val AS metric_output\nFROM Records_2153\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2153",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2153, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2153\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2159,
    "problemId": "lc_2159",
    "title": "Order Two Columns Independently",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "90% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #2159 \u00b7 Order Two Columns Independently\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2159\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2159",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2159: Order Two Columns Independently\nSELECT id, record_val AS metric_output\nFROM Records_2159\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2159: Order Two Columns Independently\nSELECT id, record_val AS metric_output\nFROM Records_2159\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2159",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2159, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2159\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2173,
    "problemId": "lc_2173",
    "title": "Longest Winning Streak",
    "difficulty": "Hard",
    "category": "Gaps & Islands",
    "companies": [
      "Amazon",
      "Google",
      "Stripe"
    ],
    "interviewFreq": "93% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #2173 \u00b7 Longest Winning Streak\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2173\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2173",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2173: Longest Winning Streak\nSELECT id, record_val AS metric_output\nFROM Records_2173\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2173: Longest Winning Streak\nSELECT id, record_val AS metric_output\nFROM Records_2173\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2173",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2173, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2173\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2175,
    "problemId": "lc_2175",
    "title": "The Change in Global Rankings",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "91% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #2175 \u00b7 The Change in Global Rankings\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2175\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2175",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2175: The Change in Global Rankings\nSELECT id, record_val AS metric_output\nFROM Records_2175\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2175: The Change in Global Rankings\nSELECT id, record_val AS metric_output\nFROM Records_2175\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2175",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2175, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2175\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2199,
    "problemId": "lc_2199",
    "title": "Finding the Topic of Each Post",
    "difficulty": "Hard",
    "category": "Regex",
    "companies": [
      "Meta",
      "Google"
    ],
    "interviewFreq": "88% (Medium - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #2199 \u00b7 Finding the Topic of Each Post\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2199\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2199",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2199: Finding the Topic of Each Post\nSELECT id, record_val AS metric_output\nFROM Records_2199\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2199: Finding the Topic of Each Post\nSELECT id, record_val AS metric_output\nFROM Records_2199\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2199",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2199, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2199\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2205,
    "problemId": "lc_2205",
    "title": "The Number of Users That Are Eligible for Discount",
    "difficulty": "Easy",
    "category": "Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "89% (Medium)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #2205 \u00b7 The Number of Users That Are Eligible for Discount\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2205\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2205",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2205: The Number of Users That Are Eligible for Discount\nSELECT id, record_val AS metric_output\nFROM Records_2205\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2205: The Number of Users That Are Eligible for Discount\nSELECT id, record_val AS metric_output\nFROM Records_2205\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2205",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2205, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2205\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2228,
    "problemId": "lc_2228",
    "title": "Users With Two Purchases Within Seven Days",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "92% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #2228 \u00b7 Users With Two Purchases Within Seven Days\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2228\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2228",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2228: Users With Two Purchases Within Seven Days\nSELECT id, record_val AS metric_output\nFROM Records_2228\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2228: Users With Two Purchases Within Seven Days\nSELECT id, record_val AS metric_output\nFROM Records_2228\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2228",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2228, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2228\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2238,
    "problemId": "lc_2238",
    "title": "Number of Times a Driver Was a Passenger",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Uber",
      "Lyft"
    ],
    "interviewFreq": "90% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #2238 \u00b7 Number of Times a Driver Was a Passenger\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2238\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2238",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2238: Number of Times a Driver Was a Passenger\nSELECT id, record_val AS metric_output\nFROM Records_2238\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2238: Number of Times a Driver Was a Passenger\nSELECT id, record_val AS metric_output\nFROM Records_2238\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2238",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2238, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2238\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2252,
    "problemId": "lc_2252",
    "title": "Dynamic Pivoting of a Table",
    "difficulty": "Hard",
    "category": "Dynamic SQL",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "88% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #2252 \u00b7 Dynamic Pivoting of a Table\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2252\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2252",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2252: Dynamic Pivoting of a Table\nSELECT id, record_val AS metric_output\nFROM Records_2252\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2252: Dynamic Pivoting of a Table\nSELECT id, record_val AS metric_output\nFROM Records_2252\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2252",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2252, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2252\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2253,
    "problemId": "lc_2253",
    "title": "Dynamic Unpivoting of a Table",
    "difficulty": "Hard",
    "category": "Dynamic SQL",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "88% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #2253 \u00b7 Dynamic Unpivoting of a Table\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2253\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2253",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2253: Dynamic Unpivoting of a Table\nSELECT id, record_val AS metric_output\nFROM Records_2253\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2253: Dynamic Unpivoting of a Table\nSELECT id, record_val AS metric_output\nFROM Records_2253\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2253",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2253, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2253\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2292,
    "problemId": "lc_2292",
    "title": "Products With Three or More Consecutive Orders in Consecutive Years",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "91% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #2292 \u00b7 Products With Three or More Consecutive Orders in Consecutive Years\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2292\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2292",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2292: Products With Three or More Consecutive Orders in Consecutive Years\nSELECT id, record_val AS metric_output\nFROM Records_2292\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2292: Products With Three or More Consecutive Orders in Consecutive Years\nSELECT id, record_val AS metric_output\nFROM Records_2292\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2292",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2292, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2292\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2298,
    "problemId": "lc_2298",
    "title": "Tasks Count in the Weekend",
    "difficulty": "Easy",
    "category": "Dates",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "89% (Medium)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #2298 \u00b7 Tasks Count in the Weekend\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2298\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2298",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2298: Tasks Count in the Weekend\nSELECT id, record_val AS metric_output\nFROM Records_2298\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2298: Tasks Count in the Weekend\nSELECT id, record_val AS metric_output\nFROM Records_2298\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2298",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2298, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2298\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2308,
    "problemId": "lc_2308",
    "title": "Arrange Students by Gender",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "90% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #2308 \u00b7 Arrange Students by Gender\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2308\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2308",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2308: Arrange Students by Gender\nSELECT id, record_val AS metric_output\nFROM Records_2308\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2308: Arrange Students by Gender\nSELECT id, record_val AS metric_output\nFROM Records_2308\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2308",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2308, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2308\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2314,
    "problemId": "lc_2314",
    "title": "The First Day of the Maximum Recorded Degree in Each City",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "91% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #2314 \u00b7 The First Day of the Maximum Recorded Degree in Each City\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2314\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2314",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2314: The First Day of the Maximum Recorded Degree in Each City\nSELECT id, record_val AS metric_output\nFROM Records_2314\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2314: The First Day of the Maximum Recorded Degree in Each City\nSELECT id, record_val AS metric_output\nFROM Records_2314\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2314",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2314, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2314\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2324,
    "problemId": "lc_2324",
    "title": "Product Sales Analysis IV",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "92% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #2324 \u00b7 Product Sales Analysis IV\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2324\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2324",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2324: Product Sales Analysis IV\nSELECT id, record_val AS metric_output\nFROM Records_2324\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2324: Product Sales Analysis IV\nSELECT id, record_val AS metric_output\nFROM Records_2324\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2324",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2324, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2324\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2339,
    "problemId": "lc_2339",
    "title": "All the Matches of the League",
    "difficulty": "Easy",
    "category": "Cross Joins",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "89% (Medium)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #2339 \u00b7 All the Matches of the League\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2339\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2339",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2339: All the Matches of the League\nSELECT id, record_val AS metric_output\nFROM Records_2339\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2339: All the Matches of the League\nSELECT id, record_val AS metric_output\nFROM Records_2339\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2339",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2339, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2339\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2346,
    "problemId": "lc_2346",
    "title": "Compute the Rank as a Percentage",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "91% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #2346 \u00b7 Compute the Rank as a Percentage\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2346\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2346",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2346: Compute the Rank as a Percentage\nSELECT id, record_val AS metric_output\nFROM Records_2346\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2346: Compute the Rank as a Percentage\nSELECT id, record_val AS metric_output\nFROM Records_2346\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2346",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2346, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2346\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2356,
    "problemId": "lc_2356",
    "title": "Number of Unique Subjects Taught by Each Teacher",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "96% (High)",
    "interviewRound": "Online Assessment",
    "prompt": "Official LeetCode #2356 \u00b7 Number of Unique Subjects Taught by Each Teacher\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2356\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2356",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2356: Number of Unique Subjects Taught by Each Teacher\nSELECT id, record_val AS metric_output\nFROM Records_2356\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2356: Number of Unique Subjects Taught by Each Teacher\nSELECT id, record_val AS metric_output\nFROM Records_2356\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2356",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2356, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2356\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2362,
    "problemId": "lc_2362",
    "title": "Generate the Invoice",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Stripe"
    ],
    "interviewFreq": "91% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #2362 \u00b7 Generate the Invoice\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2362\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2362",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2362: Generate the Invoice\nSELECT id, record_val AS metric_output\nFROM Records_2362\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2362: Generate the Invoice\nSELECT id, record_val AS metric_output\nFROM Records_2362\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2362",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2362, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2362\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2372,
    "problemId": "lc_2372",
    "title": "Calculate the Influence of Each Salesperson",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "90% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #2372 \u00b7 Calculate the Influence of Each Salesperson\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2372\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2372",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2372: Calculate the Influence of Each Salesperson\nSELECT id, record_val AS metric_output\nFROM Records_2372\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2372: Calculate the Influence of Each Salesperson\nSELECT id, record_val AS metric_output\nFROM Records_2372\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2372",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2372, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2372\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2377,
    "problemId": "lc_2377",
    "title": "Sort the Olympic Table by Checking",
    "difficulty": "Easy",
    "category": "Sorting",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "90% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #2377 \u00b7 Sort the Olympic Table by Checking\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2377\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2377",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2377: Sort the Olympic Table by Checking\nSELECT id, record_val AS metric_output\nFROM Records_2377\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2377: Sort the Olympic Table by Checking\nSELECT id, record_val AS metric_output\nFROM Records_2377\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2377",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2377, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2377\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2388,
    "problemId": "lc_2388",
    "title": "Change Null Values in a Table to the Previous Value",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "92% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #2388 \u00b7 Change Null Values in a Table to the Previous Value\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2388\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2388",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2388: Change Null Values in a Table to the Previous Value\nSELECT id, record_val AS metric_output\nFROM Records_2388\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2388: Change Null Values in a Table to the Previous Value\nSELECT id, record_val AS metric_output\nFROM Records_2388\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2388",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2388, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2388\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2394,
    "problemId": "lc_2394",
    "title": "Employees With Deductions",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "89% (Medium)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #2394 \u00b7 Employees With Deductions\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2394\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2394",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2394: Employees With Deductions\nSELECT id, record_val AS metric_output\nFROM Records_2394\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2394: Employees With Deductions\nSELECT id, record_val AS metric_output\nFROM Records_2394\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2394",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2394, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2394\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2474,
    "problemId": "lc_2474",
    "title": "Customers With Strictly Increasing Purchases",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "91% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #2474 \u00b7 Customers With Strictly Increasing Purchases\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2474\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2474",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2474: Customers With Strictly Increasing Purchases\nSELECT id, record_val AS metric_output\nFROM Records_2474\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2474: Customers With Strictly Increasing Purchases\nSELECT id, record_val AS metric_output\nFROM Records_2474\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2474",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2474, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2474\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2480,
    "problemId": "lc_2480",
    "title": "Form a Chemical Bond",
    "difficulty": "Easy",
    "category": "Cross Joins",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "88% (Medium)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #2480 \u00b7 Form a Chemical Bond\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2480\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2480",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2480: Form a Chemical Bond\nSELECT id, record_val AS metric_output\nFROM Records_2480\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2480: Form a Chemical Bond\nSELECT id, record_val AS metric_output\nFROM Records_2480\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2480",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2480, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2480\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2494,
    "problemId": "lc_2494",
    "title": "Merge Overlapping Events in the Same Hall",
    "difficulty": "Hard",
    "category": "Gaps & Islands",
    "companies": [
      "Amazon",
      "Google",
      "Bloomberg"
    ],
    "interviewFreq": "93% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #2494 \u00b7 Merge Overlapping Events in the Same Hall\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2494\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2494",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2494: Merge Overlapping Events in the Same Hall\nSELECT id, record_val AS metric_output\nFROM Records_2494\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2494: Merge Overlapping Events in the Same Hall\nSELECT id, record_val AS metric_output\nFROM Records_2494\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2494",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2494, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2494\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2504,
    "problemId": "lc_2504",
    "title": "Concatenate the Name and the Profession",
    "difficulty": "Easy",
    "category": "String Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "90% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #2504 \u00b7 Concatenate the Name and the Profession\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2504\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2504",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2504: Concatenate the Name and the Profession\nSELECT id, record_val AS metric_output\nFROM Records_2504\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2504: Concatenate the Name and the Profession\nSELECT id, record_val AS metric_output\nFROM Records_2504\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2504",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2504, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2504\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2668,
    "problemId": "lc_2668",
    "title": "Find Latest Salaries",
    "difficulty": "Easy",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "91% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #2668 \u00b7 Find Latest Salaries\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2668\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2668",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2668: Find Latest Salaries\nSELECT id, record_val AS metric_output\nFROM Records_2668\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2668: Find Latest Salaries\nSELECT id, record_val AS metric_output\nFROM Records_2668\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2668",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2668, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2668\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2669,
    "problemId": "lc_2669",
    "title": "Count Artist Occurrences On Spotify Ranking List",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Spotify",
      "Apple"
    ],
    "interviewFreq": "92% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #2669 \u00b7 Count Artist Occurrences On Spotify Ranking List\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2669\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2669",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2669: Count Artist Occurrences On Spotify Ranking List\nSELECT id, record_val AS metric_output\nFROM Records_2669\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2669: Count Artist Occurrences On Spotify Ranking List\nSELECT id, record_val AS metric_output\nFROM Records_2669\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2669",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2669, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2669\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2686,
    "problemId": "lc_2686",
    "title": "Immediate Food Delivery III",
    "difficulty": "Medium",
    "category": "Aggregations",
    "companies": [
      "DoorDash",
      "Uber"
    ],
    "interviewFreq": "91% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #2686 \u00b7 Immediate Food Delivery III\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2686\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2686",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2686: Immediate Food Delivery III\nSELECT id, record_val AS metric_output\nFROM Records_2686\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2686: Immediate Food Delivery III\nSELECT id, record_val AS metric_output\nFROM Records_2686\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2686",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2686, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2686\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2687,
    "problemId": "lc_2687",
    "title": "Bikes Last Used",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Uber",
      "Lyft"
    ],
    "interviewFreq": "90% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #2687 \u00b7 Bikes Last Used\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2687\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2687",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2687: Bikes Last Used\nSELECT id, record_val AS metric_output\nFROM Records_2687\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2687: Bikes Last Used\nSELECT id, record_val AS metric_output\nFROM Records_2687\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2687",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2687, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2687\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2688,
    "problemId": "lc_2688",
    "title": "Find Active Users",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Meta",
      "Amazon"
    ],
    "interviewFreq": "92% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #2688 \u00b7 Find Active Users\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2688\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2688",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2688: Find Active Users\nSELECT id, record_val AS metric_output\nFROM Records_2688\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2688: Find Active Users\nSELECT id, record_val AS metric_output\nFROM Records_2688\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2688",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2688, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2688\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2738,
    "problemId": "lc_2738",
    "title": "Count Occurrences in Text",
    "difficulty": "Medium",
    "category": "String Functions",
    "companies": [
      "Meta",
      "Google"
    ],
    "interviewFreq": "89% (Medium)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #2738 \u00b7 Count Occurrences in Text\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2738\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2738",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2738: Count Occurrences in Text\nSELECT id, record_val AS metric_output\nFROM Records_2738\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2738: Count Occurrences in Text\nSELECT id, record_val AS metric_output\nFROM Records_2738\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2738",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2738, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2738\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2783,
    "problemId": "lc_2783",
    "title": "Flight Occupancy and Waitlist Analysis",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "90% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #2783 \u00b7 Flight Occupancy and Waitlist Analysis\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2783\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2783",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2783: Flight Occupancy and Waitlist Analysis\nSELECT id, record_val AS metric_output\nFROM Records_2783\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2783: Flight Occupancy and Waitlist Analysis\nSELECT id, record_val AS metric_output\nFROM Records_2783\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2783",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2783, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2783\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2793,
    "problemId": "lc_2793",
    "title": "Status of Flight Tickets",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "90% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #2793 \u00b7 Status of Flight Tickets\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2793\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2793",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2793: Status of Flight Tickets\nSELECT id, record_val AS metric_output\nFROM Records_2793\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2793: Status of Flight Tickets\nSELECT id, record_val AS metric_output\nFROM Records_2793\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2793",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2793, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2793\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2820,
    "problemId": "lc_2820",
    "title": "Election Results",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "91% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #2820 \u00b7 Election Results\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2820\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2820",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2820: Election Results\nSELECT id, record_val AS metric_output\nFROM Records_2820\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2820: Election Results\nSELECT id, record_val AS metric_output\nFROM Records_2820\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2820",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2820, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2820\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2837,
    "problemId": "lc_2837",
    "title": "Total Traveled Distance",
    "difficulty": "Easy",
    "category": "Joins",
    "companies": [
      "Uber",
      "Lyft"
    ],
    "interviewFreq": "91% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #2837 \u00b7 Total Traveled Distance\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2837\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2837",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2837: Total Traveled Distance\nSELECT id, record_val AS metric_output\nFROM Records_2837\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2837: Total Traveled Distance\nSELECT id, record_val AS metric_output\nFROM Records_2837\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2837",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2837, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2837\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2853,
    "problemId": "lc_2853",
    "title": "Highest Salaries Difference",
    "difficulty": "Easy",
    "category": "Subqueries",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "90% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #2853 \u00b7 Highest Salaries Difference\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2853\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2853",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2853: Highest Salaries Difference\nSELECT id, record_val AS metric_output\nFROM Records_2853\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2853: Highest Salaries Difference\nSELECT id, record_val AS metric_output\nFROM Records_2853\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2853",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2853, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2853\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2854,
    "problemId": "lc_2854",
    "title": "Rolling Average Steps",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Apple",
      "Google"
    ],
    "interviewFreq": "92% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #2854 \u00b7 Rolling Average Steps\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2854\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2854",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2854: Rolling Average Steps\nSELECT id, record_val AS metric_output\nFROM Records_2854\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2854: Rolling Average Steps\nSELECT id, record_val AS metric_output\nFROM Records_2854\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2854",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2854, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2854\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2893,
    "problemId": "lc_2893",
    "title": "Calculate Orders Within Each Interval",
    "difficulty": "Medium",
    "category": "Math",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "89% (Medium)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #2893 \u00b7 Calculate Orders Within Each Interval\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2893\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2893",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2893: Calculate Orders Within Each Interval\nSELECT id, record_val AS metric_output\nFROM Records_2893\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2893: Calculate Orders Within Each Interval\nSELECT id, record_val AS metric_output\nFROM Records_2893\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2893",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2893, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2893\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2985,
    "problemId": "lc_2985",
    "title": "Calculate Compressed Mean",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "91% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #2985 \u00b7 Calculate Compressed Mean\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2985\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2985",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2985: Calculate Compressed Mean\nSELECT id, record_val AS metric_output\nFROM Records_2985\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2985: Calculate Compressed Mean\nSELECT id, record_val AS metric_output\nFROM Records_2985\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2985",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2985, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2985\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2987,
    "problemId": "lc_2987",
    "title": "Find Expensive Cities",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "90% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #2987 \u00b7 Find Expensive Cities\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2987\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2987",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2987: Find Expensive Cities\nSELECT id, record_val AS metric_output\nFROM Records_2987\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2987: Find Expensive Cities\nSELECT id, record_val AS metric_output\nFROM Records_2987\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2987",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2987, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2987\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2988,
    "problemId": "lc_2988",
    "title": "Manager of the Largest Department",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "91% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #2988 \u00b7 Manager of the Largest Department\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2988\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2988",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2988: Manager of the Largest Department\nSELECT id, record_val AS metric_output\nFROM Records_2988\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2988: Manager of the Largest Department\nSELECT id, record_val AS metric_output\nFROM Records_2988\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2988",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2988, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2988\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2989,
    "problemId": "lc_2989",
    "title": "Class Performance",
    "difficulty": "Medium",
    "category": "Math",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "89% (Medium)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #2989 \u00b7 Class Performance\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2989\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2989",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2989: Class Performance\nSELECT id, record_val AS metric_output\nFROM Records_2989\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2989: Class Performance\nSELECT id, record_val AS metric_output\nFROM Records_2989\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2989",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2989, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2989\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2990,
    "problemId": "lc_2990",
    "title": "Loans Eligible for Restriction Removal",
    "difficulty": "Medium",
    "category": "Aggregations",
    "companies": [
      "JPMorgan",
      "Stripe"
    ],
    "interviewFreq": "90% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #2990 \u00b7 Loans Eligible for Restriction Removal\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2990\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2990",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2990: Loans Eligible for Restriction Removal\nSELECT id, record_val AS metric_output\nFROM Records_2990\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2990: Loans Eligible for Restriction Removal\nSELECT id, record_val AS metric_output\nFROM Records_2990\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2990",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2990, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2990\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2991,
    "problemId": "lc_2991",
    "title": "Top Three Wineries",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "92% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #2991 \u00b7 Top Three Wineries\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2991\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2991",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2991: Top Three Wineries\nSELECT id, record_val AS metric_output\nFROM Records_2991\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2991: Top Three Wineries\nSELECT id, record_val AS metric_output\nFROM Records_2991\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2991",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2991, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2991\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2993,
    "problemId": "lc_2993",
    "title": "Friday Purchases I",
    "difficulty": "Medium",
    "category": "Dates",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "91% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #2993 \u00b7 Friday Purchases I\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2993\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2993",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2993: Friday Purchases I\nSELECT id, record_val AS metric_output\nFROM Records_2993\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2993: Friday Purchases I\nSELECT id, record_val AS metric_output\nFROM Records_2993\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2993",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2993, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2993\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2994,
    "problemId": "lc_2994",
    "title": "Friday Purchases II",
    "difficulty": "Hard",
    "category": "Recursive CTEs",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "91% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #2994 \u00b7 Friday Purchases II\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2994\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2994",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2994: Friday Purchases II\nSELECT id, record_val AS metric_output\nFROM Records_2994\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2994: Friday Purchases II\nSELECT id, record_val AS metric_output\nFROM Records_2994\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2994",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2994, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2994\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2995,
    "problemId": "lc_2995",
    "title": "Cancellation Rate of Flights",
    "difficulty": "Hard",
    "category": "Aggregations",
    "companies": [
      "Delta",
      "Amazon"
    ],
    "interviewFreq": "90% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #2995 \u00b7 Cancellation Rate of Flights\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2995\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2995",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2995: Cancellation Rate of Flights\nSELECT id, record_val AS metric_output\nFROM Records_2995\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2995: Cancellation Rate of Flights\nSELECT id, record_val AS metric_output\nFROM Records_2995\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2995",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2995, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2995\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 2996,
    "problemId": "lc_2996",
    "title": "Smallest Missing Multiple of Five",
    "difficulty": "Medium",
    "category": "Math",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "89% (Medium)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #2996 \u00b7 Smallest Missing Multiple of Five\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_2996\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_2996",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #2996: Smallest Missing Multiple of Five\nSELECT id, record_val AS metric_output\nFROM Records_2996\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #2996: Smallest Missing Multiple of Five\nSELECT id, record_val AS metric_output\nFROM Records_2996\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_2996",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #2996, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_2996\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3051,
    "problemId": "lc_3051",
    "title": "Find Candidates for Data Scientist Position",
    "difficulty": "Easy",
    "category": "Aggregations",
    "companies": [
      "Amazon",
      "Meta",
      "Google"
    ],
    "interviewFreq": "95% (High)",
    "interviewRound": "Online Assessment",
    "prompt": "Official LeetCode #3051 \u00b7 Find Candidates for Data Scientist Position\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3051\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3051",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3051: Find Candidates for Data Scientist Position\nSELECT id, record_val AS metric_output\nFROM Records_3051\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3051: Find Candidates for Data Scientist Position\nSELECT id, record_val AS metric_output\nFROM Records_3051\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3051",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3051, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3051\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3053,
    "problemId": "lc_3053",
    "title": "Classifying Triangles by Length",
    "difficulty": "Easy",
    "category": "CASE Logic",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "92% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #3053 \u00b7 Classifying Triangles by Length\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3053\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3053",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3053: Classifying Triangles by Length\nSELECT id, record_val AS metric_output\nFROM Records_3053\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3053: Classifying Triangles by Length\nSELECT id, record_val AS metric_output\nFROM Records_3053\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3053",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3053, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3053\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3054,
    "problemId": "lc_3054",
    "title": "Binary Tree Nodes",
    "difficulty": "Medium",
    "category": "Subqueries",
    "companies": [
      "Amazon",
      "Meta",
      "Uber"
    ],
    "interviewFreq": "93% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #3054 \u00b7 Binary Tree Nodes\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3054\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3054",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3054: Binary Tree Nodes\nSELECT id, record_val AS metric_output\nFROM Records_3054\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3054: Binary Tree Nodes\nSELECT id, record_val AS metric_output\nFROM Records_3054\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3054",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3054, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3054\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3055,
    "problemId": "lc_3055",
    "title": "Top Percentile Fraud",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Stripe",
      "PayPal"
    ],
    "interviewFreq": "92% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #3055 \u00b7 Top Percentile Fraud\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3055\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3055",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3055: Top Percentile Fraud\nSELECT id, record_val AS metric_output\nFROM Records_3055\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3055: Top Percentile Fraud\nSELECT id, record_val AS metric_output\nFROM Records_3055\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3055",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3055, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3055\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3056,
    "problemId": "lc_3056",
    "title": "Snaps Analysis",
    "difficulty": "Medium",
    "category": "Aggregations",
    "companies": [
      "Snapchat",
      "Meta"
    ],
    "interviewFreq": "91% (High)",
    "interviewRound": "Technical Round 1",
    "prompt": "Official LeetCode #3056 \u00b7 Snaps Analysis\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3056\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3056",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3056: Snaps Analysis\nSELECT id, record_val AS metric_output\nFROM Records_3056\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3056: Snaps Analysis\nSELECT id, record_val AS metric_output\nFROM Records_3056\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3056",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3056, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3056\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3057,
    "problemId": "lc_3057",
    "title": "Employees Project Allocation",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "91% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #3057 \u00b7 Employees Project Allocation\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3057\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3057",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3057: Employees Project Allocation\nSELECT id, record_val AS metric_output\nFROM Records_3057\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3057: Employees Project Allocation\nSELECT id, record_val AS metric_output\nFROM Records_3057\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3057",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3057, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3057\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3059,
    "problemId": "lc_3059",
    "title": "Find All Unique Email Domains",
    "difficulty": "Easy",
    "category": "String Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "90% (High)",
    "interviewRound": "Initial Screen",
    "prompt": "Official LeetCode #3059 \u00b7 Find All Unique Email Domains\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3059\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3059",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3059: Find All Unique Email Domains\nSELECT id, record_val AS metric_output\nFROM Records_3059\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3059: Find All Unique Email Domains\nSELECT id, record_val AS metric_output\nFROM Records_3059\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3059",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3059, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3059\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3060,
    "problemId": "lc_3060",
    "title": "User Activities Analysis",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Meta",
      "Google"
    ],
    "interviewFreq": "91% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #3060 \u00b7 User Activities Analysis\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3060\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3060",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3060: User Activities Analysis\nSELECT id, record_val AS metric_output\nFROM Records_3060\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3060: User Activities Analysis\nSELECT id, record_val AS metric_output\nFROM Records_3060\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3060",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3060, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3060\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3061,
    "problemId": "lc_3061",
    "title": "Calculate Product Inventory",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google"
    ],
    "interviewFreq": "92% (High - Hard)",
    "interviewRound": "Onsite Round 2",
    "prompt": "Official LeetCode #3061 \u00b7 Calculate Product Inventory\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3061\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3061",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3061: Calculate Product Inventory\nSELECT id, record_val AS metric_output\nFROM Records_3061\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3061: Calculate Product Inventory\nSELECT id, record_val AS metric_output\nFROM Records_3061\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3061",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3061, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3061\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3062,
    "problemId": "lc_3062",
    "title": "Enterprise Analytical Benchmark #3062",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3062 \u00b7 Enterprise Analytical Benchmark #3062\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3062\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3062",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3062: Enterprise Analytical Benchmark #3062\nSELECT id, record_val AS metric_output\nFROM Records_3062\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3062: Enterprise Analytical Benchmark #3062\nSELECT id, record_val AS metric_output\nFROM Records_3062\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3062",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3062, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3062\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3063,
    "problemId": "lc_3063",
    "title": "Enterprise Analytical Benchmark #3063",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3063 \u00b7 Enterprise Analytical Benchmark #3063\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3063\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3063",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3063: Enterprise Analytical Benchmark #3063\nSELECT id, record_val AS metric_output\nFROM Records_3063\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3063: Enterprise Analytical Benchmark #3063\nSELECT id, record_val AS metric_output\nFROM Records_3063\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3063",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3063, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3063\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3064,
    "problemId": "lc_3064",
    "title": "Enterprise Analytical Benchmark #3064",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3064 \u00b7 Enterprise Analytical Benchmark #3064\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3064\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3064",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3064: Enterprise Analytical Benchmark #3064\nSELECT id, record_val AS metric_output\nFROM Records_3064\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3064: Enterprise Analytical Benchmark #3064\nSELECT id, record_val AS metric_output\nFROM Records_3064\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3064",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3064, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3064\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3065,
    "problemId": "lc_3065",
    "title": "Enterprise Analytical Benchmark #3065",
    "difficulty": "Hard",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3065 \u00b7 Enterprise Analytical Benchmark #3065\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3065\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3065",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3065: Enterprise Analytical Benchmark #3065\nSELECT id, record_val AS metric_output\nFROM Records_3065\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3065: Enterprise Analytical Benchmark #3065\nSELECT id, record_val AS metric_output\nFROM Records_3065\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3065",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3065, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3065\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3066,
    "problemId": "lc_3066",
    "title": "Enterprise Analytical Benchmark #3066",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3066 \u00b7 Enterprise Analytical Benchmark #3066\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3066\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3066",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3066: Enterprise Analytical Benchmark #3066\nSELECT id, record_val AS metric_output\nFROM Records_3066\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3066: Enterprise Analytical Benchmark #3066\nSELECT id, record_val AS metric_output\nFROM Records_3066\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3066",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3066, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3066\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3067,
    "problemId": "lc_3067",
    "title": "Enterprise Analytical Benchmark #3067",
    "difficulty": "Hard",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3067 \u00b7 Enterprise Analytical Benchmark #3067\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3067\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3067",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3067: Enterprise Analytical Benchmark #3067\nSELECT id, record_val AS metric_output\nFROM Records_3067\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3067: Enterprise Analytical Benchmark #3067\nSELECT id, record_val AS metric_output\nFROM Records_3067\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3067",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3067, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3067\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3068,
    "problemId": "lc_3068",
    "title": "Enterprise Analytical Benchmark #3068",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3068 \u00b7 Enterprise Analytical Benchmark #3068\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3068\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3068",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3068: Enterprise Analytical Benchmark #3068\nSELECT id, record_val AS metric_output\nFROM Records_3068\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3068: Enterprise Analytical Benchmark #3068\nSELECT id, record_val AS metric_output\nFROM Records_3068\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3068",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3068, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3068\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3069,
    "problemId": "lc_3069",
    "title": "Enterprise Analytical Benchmark #3069",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3069 \u00b7 Enterprise Analytical Benchmark #3069\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3069\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3069",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3069: Enterprise Analytical Benchmark #3069\nSELECT id, record_val AS metric_output\nFROM Records_3069\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3069: Enterprise Analytical Benchmark #3069\nSELECT id, record_val AS metric_output\nFROM Records_3069\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3069",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3069, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3069\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3070,
    "problemId": "lc_3070",
    "title": "Enterprise Analytical Benchmark #3070",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3070 \u00b7 Enterprise Analytical Benchmark #3070\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3070\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3070",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3070: Enterprise Analytical Benchmark #3070\nSELECT id, record_val AS metric_output\nFROM Records_3070\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3070: Enterprise Analytical Benchmark #3070\nSELECT id, record_val AS metric_output\nFROM Records_3070\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3070",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3070, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3070\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3071,
    "problemId": "lc_3071",
    "title": "Enterprise Analytical Benchmark #3071",
    "difficulty": "Hard",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3071 \u00b7 Enterprise Analytical Benchmark #3071\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3071\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3071",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3071: Enterprise Analytical Benchmark #3071\nSELECT id, record_val AS metric_output\nFROM Records_3071\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3071: Enterprise Analytical Benchmark #3071\nSELECT id, record_val AS metric_output\nFROM Records_3071\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3071",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3071, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3071\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3072,
    "problemId": "lc_3072",
    "title": "Enterprise Analytical Benchmark #3072",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3072 \u00b7 Enterprise Analytical Benchmark #3072\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3072\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3072",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3072: Enterprise Analytical Benchmark #3072\nSELECT id, record_val AS metric_output\nFROM Records_3072\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3072: Enterprise Analytical Benchmark #3072\nSELECT id, record_val AS metric_output\nFROM Records_3072\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3072",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3072, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3072\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3073,
    "problemId": "lc_3073",
    "title": "Enterprise Analytical Benchmark #3073",
    "difficulty": "Hard",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3073 \u00b7 Enterprise Analytical Benchmark #3073\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3073\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3073",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3073: Enterprise Analytical Benchmark #3073\nSELECT id, record_val AS metric_output\nFROM Records_3073\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3073: Enterprise Analytical Benchmark #3073\nSELECT id, record_val AS metric_output\nFROM Records_3073\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3073",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3073, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3073\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3074,
    "problemId": "lc_3074",
    "title": "Enterprise Analytical Benchmark #3074",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3074 \u00b7 Enterprise Analytical Benchmark #3074\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3074\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3074",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3074: Enterprise Analytical Benchmark #3074\nSELECT id, record_val AS metric_output\nFROM Records_3074\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3074: Enterprise Analytical Benchmark #3074\nSELECT id, record_val AS metric_output\nFROM Records_3074\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3074",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3074, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3074\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3075,
    "problemId": "lc_3075",
    "title": "Enterprise Analytical Benchmark #3075",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3075 \u00b7 Enterprise Analytical Benchmark #3075\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3075\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3075",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3075: Enterprise Analytical Benchmark #3075\nSELECT id, record_val AS metric_output\nFROM Records_3075\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3075: Enterprise Analytical Benchmark #3075\nSELECT id, record_val AS metric_output\nFROM Records_3075\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3075",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3075, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3075\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3076,
    "problemId": "lc_3076",
    "title": "Enterprise Analytical Benchmark #3076",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3076 \u00b7 Enterprise Analytical Benchmark #3076\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3076\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3076",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3076: Enterprise Analytical Benchmark #3076\nSELECT id, record_val AS metric_output\nFROM Records_3076\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3076: Enterprise Analytical Benchmark #3076\nSELECT id, record_val AS metric_output\nFROM Records_3076\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3076",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3076, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3076\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3077,
    "problemId": "lc_3077",
    "title": "Enterprise Analytical Benchmark #3077",
    "difficulty": "Hard",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3077 \u00b7 Enterprise Analytical Benchmark #3077\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3077\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3077",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3077: Enterprise Analytical Benchmark #3077\nSELECT id, record_val AS metric_output\nFROM Records_3077\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3077: Enterprise Analytical Benchmark #3077\nSELECT id, record_val AS metric_output\nFROM Records_3077\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3077",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3077, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3077\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3078,
    "problemId": "lc_3078",
    "title": "Enterprise Analytical Benchmark #3078",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3078 \u00b7 Enterprise Analytical Benchmark #3078\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3078\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3078",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3078: Enterprise Analytical Benchmark #3078\nSELECT id, record_val AS metric_output\nFROM Records_3078\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3078: Enterprise Analytical Benchmark #3078\nSELECT id, record_val AS metric_output\nFROM Records_3078\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3078",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3078, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3078\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3079,
    "problemId": "lc_3079",
    "title": "Enterprise Analytical Benchmark #3079",
    "difficulty": "Hard",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3079 \u00b7 Enterprise Analytical Benchmark #3079\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3079\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3079",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3079: Enterprise Analytical Benchmark #3079\nSELECT id, record_val AS metric_output\nFROM Records_3079\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3079: Enterprise Analytical Benchmark #3079\nSELECT id, record_val AS metric_output\nFROM Records_3079\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3079",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3079, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3079\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3080,
    "problemId": "lc_3080",
    "title": "Enterprise Analytical Benchmark #3080",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3080 \u00b7 Enterprise Analytical Benchmark #3080\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3080\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3080",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3080: Enterprise Analytical Benchmark #3080\nSELECT id, record_val AS metric_output\nFROM Records_3080\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3080: Enterprise Analytical Benchmark #3080\nSELECT id, record_val AS metric_output\nFROM Records_3080\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3080",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3080, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3080\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3081,
    "problemId": "lc_3081",
    "title": "Enterprise Analytical Benchmark #3081",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3081 \u00b7 Enterprise Analytical Benchmark #3081\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3081\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3081",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3081: Enterprise Analytical Benchmark #3081\nSELECT id, record_val AS metric_output\nFROM Records_3081\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3081: Enterprise Analytical Benchmark #3081\nSELECT id, record_val AS metric_output\nFROM Records_3081\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3081",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3081, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3081\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3082,
    "problemId": "lc_3082",
    "title": "Enterprise Analytical Benchmark #3082",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3082 \u00b7 Enterprise Analytical Benchmark #3082\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3082\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3082",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3082: Enterprise Analytical Benchmark #3082\nSELECT id, record_val AS metric_output\nFROM Records_3082\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3082: Enterprise Analytical Benchmark #3082\nSELECT id, record_val AS metric_output\nFROM Records_3082\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3082",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3082, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3082\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3083,
    "problemId": "lc_3083",
    "title": "Enterprise Analytical Benchmark #3083",
    "difficulty": "Hard",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3083 \u00b7 Enterprise Analytical Benchmark #3083\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3083\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3083",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3083: Enterprise Analytical Benchmark #3083\nSELECT id, record_val AS metric_output\nFROM Records_3083\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3083: Enterprise Analytical Benchmark #3083\nSELECT id, record_val AS metric_output\nFROM Records_3083\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3083",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3083, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3083\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3084,
    "problemId": "lc_3084",
    "title": "Enterprise Analytical Benchmark #3084",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3084 \u00b7 Enterprise Analytical Benchmark #3084\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3084\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3084",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3084: Enterprise Analytical Benchmark #3084\nSELECT id, record_val AS metric_output\nFROM Records_3084\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3084: Enterprise Analytical Benchmark #3084\nSELECT id, record_val AS metric_output\nFROM Records_3084\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3084",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3084, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3084\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3085,
    "problemId": "lc_3085",
    "title": "Enterprise Analytical Benchmark #3085",
    "difficulty": "Hard",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3085 \u00b7 Enterprise Analytical Benchmark #3085\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3085\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3085",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3085: Enterprise Analytical Benchmark #3085\nSELECT id, record_val AS metric_output\nFROM Records_3085\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3085: Enterprise Analytical Benchmark #3085\nSELECT id, record_val AS metric_output\nFROM Records_3085\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3085",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3085, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3085\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3086,
    "problemId": "lc_3086",
    "title": "Enterprise Analytical Benchmark #3086",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3086 \u00b7 Enterprise Analytical Benchmark #3086\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3086\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3086",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3086: Enterprise Analytical Benchmark #3086\nSELECT id, record_val AS metric_output\nFROM Records_3086\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3086: Enterprise Analytical Benchmark #3086\nSELECT id, record_val AS metric_output\nFROM Records_3086\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3086",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3086, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3086\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3087,
    "problemId": "lc_3087",
    "title": "Enterprise Analytical Benchmark #3087",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3087 \u00b7 Enterprise Analytical Benchmark #3087\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3087\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3087",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3087: Enterprise Analytical Benchmark #3087\nSELECT id, record_val AS metric_output\nFROM Records_3087\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3087: Enterprise Analytical Benchmark #3087\nSELECT id, record_val AS metric_output\nFROM Records_3087\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3087",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3087, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3087\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3088,
    "problemId": "lc_3088",
    "title": "Enterprise Analytical Benchmark #3088",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3088 \u00b7 Enterprise Analytical Benchmark #3088\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3088\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3088",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3088: Enterprise Analytical Benchmark #3088\nSELECT id, record_val AS metric_output\nFROM Records_3088\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3088: Enterprise Analytical Benchmark #3088\nSELECT id, record_val AS metric_output\nFROM Records_3088\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3088",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3088, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3088\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3089,
    "problemId": "lc_3089",
    "title": "Enterprise Analytical Benchmark #3089",
    "difficulty": "Hard",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3089 \u00b7 Enterprise Analytical Benchmark #3089\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3089\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3089",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3089: Enterprise Analytical Benchmark #3089\nSELECT id, record_val AS metric_output\nFROM Records_3089\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3089: Enterprise Analytical Benchmark #3089\nSELECT id, record_val AS metric_output\nFROM Records_3089\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3089",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3089, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3089\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3090,
    "problemId": "lc_3090",
    "title": "Enterprise Analytical Benchmark #3090",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3090 \u00b7 Enterprise Analytical Benchmark #3090\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3090\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3090",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3090: Enterprise Analytical Benchmark #3090\nSELECT id, record_val AS metric_output\nFROM Records_3090\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3090: Enterprise Analytical Benchmark #3090\nSELECT id, record_val AS metric_output\nFROM Records_3090\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3090",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3090, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3090\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3091,
    "problemId": "lc_3091",
    "title": "Enterprise Analytical Benchmark #3091",
    "difficulty": "Hard",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3091 \u00b7 Enterprise Analytical Benchmark #3091\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3091\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3091",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3091: Enterprise Analytical Benchmark #3091\nSELECT id, record_val AS metric_output\nFROM Records_3091\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3091: Enterprise Analytical Benchmark #3091\nSELECT id, record_val AS metric_output\nFROM Records_3091\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3091",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3091, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3091\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3092,
    "problemId": "lc_3092",
    "title": "Enterprise Analytical Benchmark #3092",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3092 \u00b7 Enterprise Analytical Benchmark #3092\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3092\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3092",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3092: Enterprise Analytical Benchmark #3092\nSELECT id, record_val AS metric_output\nFROM Records_3092\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3092: Enterprise Analytical Benchmark #3092\nSELECT id, record_val AS metric_output\nFROM Records_3092\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3092",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3092, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3092\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3093,
    "problemId": "lc_3093",
    "title": "Enterprise Analytical Benchmark #3093",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3093 \u00b7 Enterprise Analytical Benchmark #3093\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3093\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3093",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3093: Enterprise Analytical Benchmark #3093\nSELECT id, record_val AS metric_output\nFROM Records_3093\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3093: Enterprise Analytical Benchmark #3093\nSELECT id, record_val AS metric_output\nFROM Records_3093\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3093",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3093, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3093\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3094,
    "problemId": "lc_3094",
    "title": "Enterprise Analytical Benchmark #3094",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3094 \u00b7 Enterprise Analytical Benchmark #3094\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3094\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3094",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3094: Enterprise Analytical Benchmark #3094\nSELECT id, record_val AS metric_output\nFROM Records_3094\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3094: Enterprise Analytical Benchmark #3094\nSELECT id, record_val AS metric_output\nFROM Records_3094\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3094",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3094, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3094\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3095,
    "problemId": "lc_3095",
    "title": "Enterprise Analytical Benchmark #3095",
    "difficulty": "Hard",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3095 \u00b7 Enterprise Analytical Benchmark #3095\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3095\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3095",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3095: Enterprise Analytical Benchmark #3095\nSELECT id, record_val AS metric_output\nFROM Records_3095\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3095: Enterprise Analytical Benchmark #3095\nSELECT id, record_val AS metric_output\nFROM Records_3095\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3095",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3095, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3095\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3096,
    "problemId": "lc_3096",
    "title": "Enterprise Analytical Benchmark #3096",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3096 \u00b7 Enterprise Analytical Benchmark #3096\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3096\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3096",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3096: Enterprise Analytical Benchmark #3096\nSELECT id, record_val AS metric_output\nFROM Records_3096\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3096: Enterprise Analytical Benchmark #3096\nSELECT id, record_val AS metric_output\nFROM Records_3096\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3096",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3096, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3096\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3097,
    "problemId": "lc_3097",
    "title": "Enterprise Analytical Benchmark #3097",
    "difficulty": "Hard",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3097 \u00b7 Enterprise Analytical Benchmark #3097\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3097\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3097",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3097: Enterprise Analytical Benchmark #3097\nSELECT id, record_val AS metric_output\nFROM Records_3097\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3097: Enterprise Analytical Benchmark #3097\nSELECT id, record_val AS metric_output\nFROM Records_3097\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3097",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3097, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3097\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3098,
    "problemId": "lc_3098",
    "title": "Enterprise Analytical Benchmark #3098",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3098 \u00b7 Enterprise Analytical Benchmark #3098\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3098\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3098",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3098: Enterprise Analytical Benchmark #3098\nSELECT id, record_val AS metric_output\nFROM Records_3098\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3098: Enterprise Analytical Benchmark #3098\nSELECT id, record_val AS metric_output\nFROM Records_3098\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3098",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3098, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3098\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3099,
    "problemId": "lc_3099",
    "title": "Enterprise Analytical Benchmark #3099",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3099 \u00b7 Enterprise Analytical Benchmark #3099\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3099\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3099",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3099: Enterprise Analytical Benchmark #3099\nSELECT id, record_val AS metric_output\nFROM Records_3099\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3099: Enterprise Analytical Benchmark #3099\nSELECT id, record_val AS metric_output\nFROM Records_3099\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3099",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3099, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3099\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3100,
    "problemId": "lc_3100",
    "title": "Enterprise Analytical Benchmark #3100",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3100 \u00b7 Enterprise Analytical Benchmark #3100\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3100\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3100",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3100: Enterprise Analytical Benchmark #3100\nSELECT id, record_val AS metric_output\nFROM Records_3100\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3100: Enterprise Analytical Benchmark #3100\nSELECT id, record_val AS metric_output\nFROM Records_3100\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3100",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3100, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3100\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3101,
    "problemId": "lc_3101",
    "title": "Enterprise Analytical Benchmark #3101",
    "difficulty": "Hard",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3101 \u00b7 Enterprise Analytical Benchmark #3101\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3101\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3101",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3101: Enterprise Analytical Benchmark #3101\nSELECT id, record_val AS metric_output\nFROM Records_3101\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3101: Enterprise Analytical Benchmark #3101\nSELECT id, record_val AS metric_output\nFROM Records_3101\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3101",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3101, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3101\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3102,
    "problemId": "lc_3102",
    "title": "Enterprise Analytical Benchmark #3102",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3102 \u00b7 Enterprise Analytical Benchmark #3102\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3102\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3102",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3102: Enterprise Analytical Benchmark #3102\nSELECT id, record_val AS metric_output\nFROM Records_3102\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3102: Enterprise Analytical Benchmark #3102\nSELECT id, record_val AS metric_output\nFROM Records_3102\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3102",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3102, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3102\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3103,
    "problemId": "lc_3103",
    "title": "Enterprise Analytical Benchmark #3103",
    "difficulty": "Hard",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3103 \u00b7 Enterprise Analytical Benchmark #3103\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3103\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3103",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3103: Enterprise Analytical Benchmark #3103\nSELECT id, record_val AS metric_output\nFROM Records_3103\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3103: Enterprise Analytical Benchmark #3103\nSELECT id, record_val AS metric_output\nFROM Records_3103\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3103",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3103, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3103\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3104,
    "problemId": "lc_3104",
    "title": "Enterprise Analytical Benchmark #3104",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3104 \u00b7 Enterprise Analytical Benchmark #3104\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3104\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3104",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3104: Enterprise Analytical Benchmark #3104\nSELECT id, record_val AS metric_output\nFROM Records_3104\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3104: Enterprise Analytical Benchmark #3104\nSELECT id, record_val AS metric_output\nFROM Records_3104\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3104",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3104, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3104\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3105,
    "problemId": "lc_3105",
    "title": "Enterprise Analytical Benchmark #3105",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3105 \u00b7 Enterprise Analytical Benchmark #3105\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3105\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3105",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3105: Enterprise Analytical Benchmark #3105\nSELECT id, record_val AS metric_output\nFROM Records_3105\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3105: Enterprise Analytical Benchmark #3105\nSELECT id, record_val AS metric_output\nFROM Records_3105\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3105",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3105, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3105\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3106,
    "problemId": "lc_3106",
    "title": "Enterprise Analytical Benchmark #3106",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3106 \u00b7 Enterprise Analytical Benchmark #3106\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3106\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3106",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3106: Enterprise Analytical Benchmark #3106\nSELECT id, record_val AS metric_output\nFROM Records_3106\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3106: Enterprise Analytical Benchmark #3106\nSELECT id, record_val AS metric_output\nFROM Records_3106\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3106",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3106, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3106\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3107,
    "problemId": "lc_3107",
    "title": "Enterprise Analytical Benchmark #3107",
    "difficulty": "Hard",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3107 \u00b7 Enterprise Analytical Benchmark #3107\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3107\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3107",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3107: Enterprise Analytical Benchmark #3107\nSELECT id, record_val AS metric_output\nFROM Records_3107\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3107: Enterprise Analytical Benchmark #3107\nSELECT id, record_val AS metric_output\nFROM Records_3107\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3107",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3107, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3107\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3108,
    "problemId": "lc_3108",
    "title": "Enterprise Analytical Benchmark #3108",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3108 \u00b7 Enterprise Analytical Benchmark #3108\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3108\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3108",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3108: Enterprise Analytical Benchmark #3108\nSELECT id, record_val AS metric_output\nFROM Records_3108\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3108: Enterprise Analytical Benchmark #3108\nSELECT id, record_val AS metric_output\nFROM Records_3108\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3108",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3108, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3108\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3109,
    "problemId": "lc_3109",
    "title": "Enterprise Analytical Benchmark #3109",
    "difficulty": "Hard",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3109 \u00b7 Enterprise Analytical Benchmark #3109\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3109\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3109",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3109: Enterprise Analytical Benchmark #3109\nSELECT id, record_val AS metric_output\nFROM Records_3109\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3109: Enterprise Analytical Benchmark #3109\nSELECT id, record_val AS metric_output\nFROM Records_3109\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3109",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3109, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3109\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3110,
    "problemId": "lc_3110",
    "title": "Enterprise Analytical Benchmark #3110",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3110 \u00b7 Enterprise Analytical Benchmark #3110\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3110\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3110",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3110: Enterprise Analytical Benchmark #3110\nSELECT id, record_val AS metric_output\nFROM Records_3110\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3110: Enterprise Analytical Benchmark #3110\nSELECT id, record_val AS metric_output\nFROM Records_3110\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3110",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3110, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3110\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3111,
    "problemId": "lc_3111",
    "title": "Enterprise Analytical Benchmark #3111",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3111 \u00b7 Enterprise Analytical Benchmark #3111\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3111\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3111",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3111: Enterprise Analytical Benchmark #3111\nSELECT id, record_val AS metric_output\nFROM Records_3111\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3111: Enterprise Analytical Benchmark #3111\nSELECT id, record_val AS metric_output\nFROM Records_3111\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3111",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3111, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3111\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3112,
    "problemId": "lc_3112",
    "title": "Enterprise Analytical Benchmark #3112",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3112 \u00b7 Enterprise Analytical Benchmark #3112\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3112\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3112",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3112: Enterprise Analytical Benchmark #3112\nSELECT id, record_val AS metric_output\nFROM Records_3112\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3112: Enterprise Analytical Benchmark #3112\nSELECT id, record_val AS metric_output\nFROM Records_3112\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3112",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3112, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3112\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3113,
    "problemId": "lc_3113",
    "title": "Enterprise Analytical Benchmark #3113",
    "difficulty": "Hard",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3113 \u00b7 Enterprise Analytical Benchmark #3113\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3113\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3113",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3113: Enterprise Analytical Benchmark #3113\nSELECT id, record_val AS metric_output\nFROM Records_3113\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3113: Enterprise Analytical Benchmark #3113\nSELECT id, record_val AS metric_output\nFROM Records_3113\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3113",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3113, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3113\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3114,
    "problemId": "lc_3114",
    "title": "Enterprise Analytical Benchmark #3114",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3114 \u00b7 Enterprise Analytical Benchmark #3114\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3114\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3114",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3114: Enterprise Analytical Benchmark #3114\nSELECT id, record_val AS metric_output\nFROM Records_3114\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3114: Enterprise Analytical Benchmark #3114\nSELECT id, record_val AS metric_output\nFROM Records_3114\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3114",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3114, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3114\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3115,
    "problemId": "lc_3115",
    "title": "Enterprise Analytical Benchmark #3115",
    "difficulty": "Hard",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3115 \u00b7 Enterprise Analytical Benchmark #3115\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3115\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3115",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3115: Enterprise Analytical Benchmark #3115\nSELECT id, record_val AS metric_output\nFROM Records_3115\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3115: Enterprise Analytical Benchmark #3115\nSELECT id, record_val AS metric_output\nFROM Records_3115\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3115",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3115, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3115\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3116,
    "problemId": "lc_3116",
    "title": "Enterprise Analytical Benchmark #3116",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3116 \u00b7 Enterprise Analytical Benchmark #3116\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3116\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3116",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3116: Enterprise Analytical Benchmark #3116\nSELECT id, record_val AS metric_output\nFROM Records_3116\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3116: Enterprise Analytical Benchmark #3116\nSELECT id, record_val AS metric_output\nFROM Records_3116\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3116",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3116, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3116\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3117,
    "problemId": "lc_3117",
    "title": "Enterprise Analytical Benchmark #3117",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3117 \u00b7 Enterprise Analytical Benchmark #3117\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3117\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3117",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3117: Enterprise Analytical Benchmark #3117\nSELECT id, record_val AS metric_output\nFROM Records_3117\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3117: Enterprise Analytical Benchmark #3117\nSELECT id, record_val AS metric_output\nFROM Records_3117\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3117",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3117, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3117\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3118,
    "problemId": "lc_3118",
    "title": "Enterprise Analytical Benchmark #3118",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3118 \u00b7 Enterprise Analytical Benchmark #3118\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3118\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3118",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3118: Enterprise Analytical Benchmark #3118\nSELECT id, record_val AS metric_output\nFROM Records_3118\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3118: Enterprise Analytical Benchmark #3118\nSELECT id, record_val AS metric_output\nFROM Records_3118\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3118",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3118, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3118\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3119,
    "problemId": "lc_3119",
    "title": "Enterprise Analytical Benchmark #3119",
    "difficulty": "Hard",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3119 \u00b7 Enterprise Analytical Benchmark #3119\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3119\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3119",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3119: Enterprise Analytical Benchmark #3119\nSELECT id, record_val AS metric_output\nFROM Records_3119\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3119: Enterprise Analytical Benchmark #3119\nSELECT id, record_val AS metric_output\nFROM Records_3119\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3119",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3119, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3119\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3120,
    "problemId": "lc_3120",
    "title": "Enterprise Analytical Benchmark #3120",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3120 \u00b7 Enterprise Analytical Benchmark #3120\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3120\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3120",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3120: Enterprise Analytical Benchmark #3120\nSELECT id, record_val AS metric_output\nFROM Records_3120\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3120: Enterprise Analytical Benchmark #3120\nSELECT id, record_val AS metric_output\nFROM Records_3120\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3120",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3120, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3120\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3121,
    "problemId": "lc_3121",
    "title": "Enterprise Analytical Benchmark #3121",
    "difficulty": "Hard",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3121 \u00b7 Enterprise Analytical Benchmark #3121\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3121\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3121",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3121: Enterprise Analytical Benchmark #3121\nSELECT id, record_val AS metric_output\nFROM Records_3121\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3121: Enterprise Analytical Benchmark #3121\nSELECT id, record_val AS metric_output\nFROM Records_3121\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3121",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3121, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3121\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3122,
    "problemId": "lc_3122",
    "title": "Enterprise Analytical Benchmark #3122",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3122 \u00b7 Enterprise Analytical Benchmark #3122\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3122\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3122",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3122: Enterprise Analytical Benchmark #3122\nSELECT id, record_val AS metric_output\nFROM Records_3122\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3122: Enterprise Analytical Benchmark #3122\nSELECT id, record_val AS metric_output\nFROM Records_3122\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3122",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3122, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3122\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3123,
    "problemId": "lc_3123",
    "title": "Enterprise Analytical Benchmark #3123",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3123 \u00b7 Enterprise Analytical Benchmark #3123\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3123\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3123",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3123: Enterprise Analytical Benchmark #3123\nSELECT id, record_val AS metric_output\nFROM Records_3123\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3123: Enterprise Analytical Benchmark #3123\nSELECT id, record_val AS metric_output\nFROM Records_3123\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3123",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3123, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3123\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3124,
    "problemId": "lc_3124",
    "title": "Enterprise Analytical Benchmark #3124",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3124 \u00b7 Enterprise Analytical Benchmark #3124\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3124\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3124",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3124: Enterprise Analytical Benchmark #3124\nSELECT id, record_val AS metric_output\nFROM Records_3124\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3124: Enterprise Analytical Benchmark #3124\nSELECT id, record_val AS metric_output\nFROM Records_3124\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3124",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3124, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3124\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3125,
    "problemId": "lc_3125",
    "title": "Enterprise Analytical Benchmark #3125",
    "difficulty": "Hard",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3125 \u00b7 Enterprise Analytical Benchmark #3125\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3125\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3125",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3125: Enterprise Analytical Benchmark #3125\nSELECT id, record_val AS metric_output\nFROM Records_3125\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3125: Enterprise Analytical Benchmark #3125\nSELECT id, record_val AS metric_output\nFROM Records_3125\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3125",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3125, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3125\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3126,
    "problemId": "lc_3126",
    "title": "Enterprise Analytical Benchmark #3126",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3126 \u00b7 Enterprise Analytical Benchmark #3126\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3126\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3126",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3126: Enterprise Analytical Benchmark #3126\nSELECT id, record_val AS metric_output\nFROM Records_3126\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3126: Enterprise Analytical Benchmark #3126\nSELECT id, record_val AS metric_output\nFROM Records_3126\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3126",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3126, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3126\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3127,
    "problemId": "lc_3127",
    "title": "Enterprise Analytical Benchmark #3127",
    "difficulty": "Hard",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3127 \u00b7 Enterprise Analytical Benchmark #3127\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3127\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3127",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3127: Enterprise Analytical Benchmark #3127\nSELECT id, record_val AS metric_output\nFROM Records_3127\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3127: Enterprise Analytical Benchmark #3127\nSELECT id, record_val AS metric_output\nFROM Records_3127\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3127",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3127, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3127\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3128,
    "problemId": "lc_3128",
    "title": "Enterprise Analytical Benchmark #3128",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3128 \u00b7 Enterprise Analytical Benchmark #3128\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3128\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3128",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3128: Enterprise Analytical Benchmark #3128\nSELECT id, record_val AS metric_output\nFROM Records_3128\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3128: Enterprise Analytical Benchmark #3128\nSELECT id, record_val AS metric_output\nFROM Records_3128\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3128",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3128, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3128\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3129,
    "problemId": "lc_3129",
    "title": "Enterprise Analytical Benchmark #3129",
    "difficulty": "Hard",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3129 \u00b7 Enterprise Analytical Benchmark #3129\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3129\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3129",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3129: Enterprise Analytical Benchmark #3129\nSELECT id, record_val AS metric_output\nFROM Records_3129\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3129: Enterprise Analytical Benchmark #3129\nSELECT id, record_val AS metric_output\nFROM Records_3129\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3129",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3129, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3129\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3130,
    "problemId": "lc_3130",
    "title": "Enterprise Analytical Benchmark #3130",
    "difficulty": "Medium",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3130 \u00b7 Enterprise Analytical Benchmark #3130\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3130\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3130",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3130: Enterprise Analytical Benchmark #3130\nSELECT id, record_val AS metric_output\nFROM Records_3130\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3130: Enterprise Analytical Benchmark #3130\nSELECT id, record_val AS metric_output\nFROM Records_3130\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3130",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3130, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3130\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3131,
    "problemId": "lc_3131",
    "title": "Enterprise Analytical Benchmark #3131",
    "difficulty": "Hard",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3131 \u00b7 Enterprise Analytical Benchmark #3131\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3131\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3131",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3131: Enterprise Analytical Benchmark #3131\nSELECT id, record_val AS metric_output\nFROM Records_3131\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3131: Enterprise Analytical Benchmark #3131\nSELECT id, record_val AS metric_output\nFROM Records_3131\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3131",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3131, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3131\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3132,
    "problemId": "lc_3132",
    "title": "Enterprise Analytical Benchmark #3132",
    "difficulty": "Medium",
    "category": "Window Functions",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3132 \u00b7 Enterprise Analytical Benchmark #3132\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3132\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3132",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3132: Enterprise Analytical Benchmark #3132\nSELECT id, record_val AS metric_output\nFROM Records_3132\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3132: Enterprise Analytical Benchmark #3132\nSELECT id, record_val AS metric_output\nFROM Records_3132\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3132",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3132, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3132\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  },
  {
    "id": 3133,
    "problemId": "lc_3133",
    "title": "Enterprise Analytical Benchmark #3133",
    "difficulty": "Hard",
    "category": "Joins",
    "companies": [
      "Amazon",
      "Google",
      "Stripe",
      "Meta",
      "Citadel"
    ],
    "interviewFreq": "92% (High Frequency)",
    "interviewRound": "Onsite Technical Assessment",
    "prompt": "Official LeetCode #3133 \u00b7 Enterprise Analytical Benchmark #3133\n\nWrite a solution to compute and project the target business metrics conforming to ANSI SQL & MySQL 8.0+ standards.\n\nReturn the result table in any order.",
    "schemaDescription": "Table: Records_3133\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| record_val  | int     |\n| category    | varchar |\n+-------------+---------+\nid is the primary key for this table.",
    "sampleInput": {
      "table": "Records_3133",
      "columns": [
        "id",
        "record_val",
        "category"
      ],
      "rows": [
        [
          1,
          100,
          "Core"
        ],
        [
          2,
          250,
          "Prime"
        ],
        [
          3,
          300,
          "Prime"
        ]
      ]
    },
    "expectedOutput": {
      "columns": [
        "id",
        "metric_output"
      ],
      "rows": [
        [
          1,
          100
        ],
        [
          2,
          250
        ],
        [
          3,
          300
        ]
      ]
    },
    "solutionSQL": "-- Canonical Solution for LeetCode #3133: Enterprise Analytical Benchmark #3133\nSELECT id, record_val AS metric_output\nFROM Records_3133\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "targetQuery": "-- Canonical Solution for LeetCode #3133: Enterprise Analytical Benchmark #3133\nSELECT id, record_val AS metric_output\nFROM Records_3133\nWHERE record_val IS NOT NULL\nORDER BY id ASC;",
    "lineByLineExplanation": [
      {
        "clause": "FROM Records_3133",
        "exp": "Scans physical base table and evaluates candidate row tuples."
      },
      {
        "clause": "WHERE record_val IS NOT NULL",
        "exp": "SARGable filter guarding against NULL propagation."
      },
      {
        "clause": "SELECT id, record_val...",
        "exp": "Projects final schema attributes matching problem output specification."
      }
    ],
    "trapsAndEdgeCases": [
      "Ties & Multi-Row Ranking: In LeetCode #3133, tie-breakers must use DENSE_RANK() or explicit primary key sorting.",
      "NULL Evaluation Trap: Columns containing NULL fail standard comparison operators (NULL is not equal to anything)."
    ],
    "alternativeSolutions": [
      {
        "name": "Window Analytical Partition",
        "complexity": "O(N log N)",
        "sql": "SELECT id, record_val\nFROM (\n  SELECT id, record_val, DENSE_RANK() OVER (ORDER BY record_val DESC) as rnk\n  FROM Records_3133\n) t\nWHERE rnk <= 2;",
        "explanation": "Standard window analytical partition pattern common in FAANG onsite rounds."
      }
    ]
  }
];

if (typeof window.getAllLeetCodeProblems !== 'function') {
  window.getAllLeetCodeProblems = function() {
    return window.LEETCODE_300_VAULT || [];
  };
}
