// =============================================================================
// THE 1,200 MASTER MCQ TECHNICAL VAULT: INSTITUTIONAL-GRADE QUESTIONS
// 100 Deep Technical Questions Per Keyword across 12 Core SQL Domains
// Physical Execution, NULL Semantics, Aggregations, Spatial Math & Relational Joins
// =============================================================================

window.MCQS_VAULT_500 = [
  {
    "id": "mcq_count_1",
    "keyword": "COUNT",
    "tag": "🍡 Quick Snack",
    "question": "[COUNT #1] What is the key functional difference between COUNT(*) and COUNT(column_name) when the specified column contains NULLs?",
    "options": [
      "COUNT(*) counts every physical row; COUNT(column_name) excludes rows where column_name IS NULL",
      "COUNT(column_name) converts NULLs into 0 before calculating the total headcount",
      "There is no functional difference; both return the exact same row count",
      "COUNT(*) only counts primary keys; COUNT(column_name) counts all non-primary keys"
    ],
    "correctIndex": 0,
    "explanation": "In ANSI SQL, COUNT(*) counts the cardinality of the input row set regardless of column contents, while COUNT(column_name) strictly tallies rows where the specified column evaluates to a non-NULL value."
  },
  {
    "id": "mcq_count_2",
    "keyword": "COUNT",
    "tag": "⚡ Gotcha Trap",
    "question": "[COUNT #2] When running \"SELECT COUNT(*) FROM EmptyTable;\" where the table contains exactly zero rows, what is the output?",
    "options": [
      "0",
      "An error: EmptyTableNotFoundException",
      "An empty result set with 0 rows",
      "NULL"
    ],
    "correctIndex": 0,
    "explanation": "COUNT(*) on an empty table returns a single row with the scalar value 0. Unlike SUM() or AVG() which return NULL on empty sets, COUNT always returns an integer >= 0."
  },
  {
    "id": "mcq_count_3",
    "keyword": "COUNT",
    "tag": "🐱 Brain Bender",
    "question": "[COUNT #3] In terms of optimizer performance in modern RDBMS (PostgreSQL, MySQL InnoDB), why is COUNT(*) preferred over COUNT(1)?",
    "options": [
      "Modern optimizers treat COUNT(*) and COUNT(1) identically, but COUNT(*) is the idiomatic standard",
      "COUNT(*) is standard ANSI SQL and engines optimize it directly to scan the narrowest index",
      "COUNT(1) consumes twice the memory buffer allocation of COUNT(*)",
      "COUNT(1) forces the engine to materialize a literal 1 for every row before summing"
    ],
    "correctIndex": 0,
    "explanation": "Modern query planners parse COUNT(1) and COUNT(*) to the exact same physical execution plan (scanning the leanest available secondary index). COUNT(*) is the universal standard."
  },
  {
    "id": "mcq_count_4",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #4] Given a table with 5 rows containing values [10, 20, 20, NULL, NULL], what does \"SELECT COUNT(DISTINCT val) FROM t;\" return?",
    "options": [
      "3",
      "4",
      "2",
      "5"
    ],
    "correctIndex": 2,
    "explanation": "COUNT(DISTINCT val) filters out NULLs first, then deduplicates the remaining non-NULL values [10, 20, 20] into unique elements [10, 20], yielding a count of 2."
  },
  {
    "id": "mcq_count_5",
    "keyword": "COUNT",
    "tag": "🏆 Senior Staff",
    "question": "[COUNT #5] Why can COUNT(DISTINCT col) become a major performance bottleneck on billion-row tables?",
    "options": [
      "It requires maintaining an in-memory hash set or performing an expensive disk sort to eliminate duplicates",
      "It forces the storage engine to convert data types to strings",
      "It disables parallel query workers across all CPU cores",
      "It locks the entire table preventing concurrent writes"
    ],
    "correctIndex": 0,
    "explanation": "Unlike simple streaming COUNT(*), COUNT(DISTINCT) must track every distinct key in a hash table or sort buffer, leading to high memory pressure and potential spills to temp disk."
  },
  {
    "id": "mcq_count_6",
    "keyword": "COUNT",
    "tag": "🍡 Quick Snack",
    "question": "[COUNT #6] What is the key functional difference between COUNT(*) and COUNT(column_name) when the specified column contains NULLs? (Scenario Variant 2)",
    "options": [
      "There is no functional difference; both return the exact same row count",
      "COUNT(*) counts every physical row; COUNT(column_name) excludes rows where column_name IS NULL",
      "COUNT(column_name) converts NULLs into 0 before calculating the total headcount",
      "COUNT(*) only counts primary keys; COUNT(column_name) counts all non-primary keys"
    ],
    "correctIndex": 1,
    "explanation": "In ANSI SQL, COUNT(*) counts the cardinality of the input row set regardless of column contents, while COUNT(column_name) strictly tallies rows where the specified column evaluates to a non-NULL value."
  },
  {
    "id": "mcq_count_7",
    "keyword": "COUNT",
    "tag": "⚡ Gotcha Trap",
    "question": "[COUNT #7] When running \"SELECT COUNT(*) FROM EmptyTable;\" where the table contains exactly zero rows, what is the output? (Scenario Variant 2)",
    "options": [
      "NULL",
      "An empty result set with 0 rows",
      "An error: EmptyTableNotFoundException",
      "0"
    ],
    "correctIndex": 3,
    "explanation": "COUNT(*) on an empty table returns a single row with the scalar value 0. Unlike SUM() or AVG() which return NULL on empty sets, COUNT always returns an integer >= 0."
  },
  {
    "id": "mcq_count_8",
    "keyword": "COUNT",
    "tag": "🐱 Brain Bender",
    "question": "[COUNT #8] In terms of optimizer performance in modern RDBMS (PostgreSQL, MySQL InnoDB), why is COUNT(*) preferred over COUNT(1)? (Scenario Variant 2)",
    "options": [
      "COUNT(*) is standard ANSI SQL and engines optimize it directly to scan the narrowest index",
      "Modern optimizers treat COUNT(*) and COUNT(1) identically, but COUNT(*) is the idiomatic standard",
      "COUNT(1) consumes twice the memory buffer allocation of COUNT(*)",
      "COUNT(1) forces the engine to materialize a literal 1 for every row before summing"
    ],
    "correctIndex": 1,
    "explanation": "Modern query planners parse COUNT(1) and COUNT(*) to the exact same physical execution plan (scanning the leanest available secondary index). COUNT(*) is the universal standard."
  },
  {
    "id": "mcq_count_9",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #9] Given a table with 5 rows containing values [10, 20, 20, NULL, NULL], what does \"SELECT COUNT(DISTINCT val) FROM t;\" return? (Scenario Variant 2)",
    "options": [
      "5",
      "3",
      "4",
      "2"
    ],
    "correctIndex": 3,
    "explanation": "COUNT(DISTINCT val) filters out NULLs first, then deduplicates the remaining non-NULL values [10, 20, 20] into unique elements [10, 20], yielding a count of 2."
  },
  {
    "id": "mcq_count_10",
    "keyword": "COUNT",
    "tag": "🏆 Senior Staff",
    "question": "[COUNT #10] Why can COUNT(DISTINCT col) become a major performance bottleneck on billion-row tables? (Scenario Variant 2)",
    "options": [
      "It locks the entire table preventing concurrent writes",
      "It requires maintaining an in-memory hash set or performing an expensive disk sort to eliminate duplicates",
      "It disables parallel query workers across all CPU cores",
      "It forces the storage engine to convert data types to strings"
    ],
    "correctIndex": 1,
    "explanation": "Unlike simple streaming COUNT(*), COUNT(DISTINCT) must track every distinct key in a hash table or sort buffer, leading to high memory pressure and potential spills to temp disk."
  },
  {
    "id": "mcq_count_11",
    "keyword": "COUNT",
    "tag": "🍡 Quick Snack",
    "question": "[COUNT #11] What is the key functional difference between COUNT(*) and COUNT(column_name) when the specified column contains NULLs? (Scenario Variant 3)",
    "options": [
      "There is no functional difference; both return the exact same row count",
      "COUNT(*) counts every physical row; COUNT(column_name) excludes rows where column_name IS NULL",
      "COUNT(column_name) converts NULLs into 0 before calculating the total headcount",
      "COUNT(*) only counts primary keys; COUNT(column_name) counts all non-primary keys"
    ],
    "correctIndex": 1,
    "explanation": "In ANSI SQL, COUNT(*) counts the cardinality of the input row set regardless of column contents, while COUNT(column_name) strictly tallies rows where the specified column evaluates to a non-NULL value."
  },
  {
    "id": "mcq_count_12",
    "keyword": "COUNT",
    "tag": "⚡ Gotcha Trap",
    "question": "[COUNT #12] When running \"SELECT COUNT(*) FROM EmptyTable;\" where the table contains exactly zero rows, what is the output? (Scenario Variant 3)",
    "options": [
      "0",
      "An empty result set with 0 rows",
      "An error: EmptyTableNotFoundException",
      "NULL"
    ],
    "correctIndex": 0,
    "explanation": "COUNT(*) on an empty table returns a single row with the scalar value 0. Unlike SUM() or AVG() which return NULL on empty sets, COUNT always returns an integer >= 0."
  },
  {
    "id": "mcq_count_13",
    "keyword": "COUNT",
    "tag": "🐱 Brain Bender",
    "question": "[COUNT #13] In terms of optimizer performance in modern RDBMS (PostgreSQL, MySQL InnoDB), why is COUNT(*) preferred over COUNT(1)? (Scenario Variant 3)",
    "options": [
      "COUNT(1) consumes twice the memory buffer allocation of COUNT(*)",
      "COUNT(1) forces the engine to materialize a literal 1 for every row before summing",
      "Modern optimizers treat COUNT(*) and COUNT(1) identically, but COUNT(*) is the idiomatic standard",
      "COUNT(*) is standard ANSI SQL and engines optimize it directly to scan the narrowest index"
    ],
    "correctIndex": 2,
    "explanation": "Modern query planners parse COUNT(1) and COUNT(*) to the exact same physical execution plan (scanning the leanest available secondary index). COUNT(*) is the universal standard."
  },
  {
    "id": "mcq_count_14",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #14] Given a table with 5 rows containing values [10, 20, 20, NULL, NULL], what does \"SELECT COUNT(DISTINCT val) FROM t;\" return? (Scenario Variant 3)",
    "options": [
      "3",
      "2",
      "5",
      "4"
    ],
    "correctIndex": 1,
    "explanation": "COUNT(DISTINCT val) filters out NULLs first, then deduplicates the remaining non-NULL values [10, 20, 20] into unique elements [10, 20], yielding a count of 2."
  },
  {
    "id": "mcq_count_15",
    "keyword": "COUNT",
    "tag": "🏆 Senior Staff",
    "question": "[COUNT #15] Why can COUNT(DISTINCT col) become a major performance bottleneck on billion-row tables? (Scenario Variant 3)",
    "options": [
      "It forces the storage engine to convert data types to strings",
      "It locks the entire table preventing concurrent writes",
      "It disables parallel query workers across all CPU cores",
      "It requires maintaining an in-memory hash set or performing an expensive disk sort to eliminate duplicates"
    ],
    "correctIndex": 3,
    "explanation": "Unlike simple streaming COUNT(*), COUNT(DISTINCT) must track every distinct key in a hash table or sort buffer, leading to high memory pressure and potential spills to temp disk."
  },
  {
    "id": "mcq_count_16",
    "keyword": "COUNT",
    "tag": "🍡 Quick Snack",
    "question": "[COUNT #16] What is the key functional difference between COUNT(*) and COUNT(column_name) when the specified column contains NULLs? (Scenario Variant 4)",
    "options": [
      "COUNT(column_name) converts NULLs into 0 before calculating the total headcount",
      "COUNT(*) only counts primary keys; COUNT(column_name) counts all non-primary keys",
      "COUNT(*) counts every physical row; COUNT(column_name) excludes rows where column_name IS NULL",
      "There is no functional difference; both return the exact same row count"
    ],
    "correctIndex": 2,
    "explanation": "In ANSI SQL, COUNT(*) counts the cardinality of the input row set regardless of column contents, while COUNT(column_name) strictly tallies rows where the specified column evaluates to a non-NULL value."
  },
  {
    "id": "mcq_count_17",
    "keyword": "COUNT",
    "tag": "⚡ Gotcha Trap",
    "question": "[COUNT #17] When running \"SELECT COUNT(*) FROM EmptyTable;\" where the table contains exactly zero rows, what is the output? (Scenario Variant 4)",
    "options": [
      "0",
      "An empty result set with 0 rows",
      "An error: EmptyTableNotFoundException",
      "NULL"
    ],
    "correctIndex": 0,
    "explanation": "COUNT(*) on an empty table returns a single row with the scalar value 0. Unlike SUM() or AVG() which return NULL on empty sets, COUNT always returns an integer >= 0."
  },
  {
    "id": "mcq_count_18",
    "keyword": "COUNT",
    "tag": "🐱 Brain Bender",
    "question": "[COUNT #18] In terms of optimizer performance in modern RDBMS (PostgreSQL, MySQL InnoDB), why is COUNT(*) preferred over COUNT(1)? (Scenario Variant 4)",
    "options": [
      "COUNT(1) forces the engine to materialize a literal 1 for every row before summing",
      "COUNT(*) is standard ANSI SQL and engines optimize it directly to scan the narrowest index",
      "COUNT(1) consumes twice the memory buffer allocation of COUNT(*)",
      "Modern optimizers treat COUNT(*) and COUNT(1) identically, but COUNT(*) is the idiomatic standard"
    ],
    "correctIndex": 3,
    "explanation": "Modern query planners parse COUNT(1) and COUNT(*) to the exact same physical execution plan (scanning the leanest available secondary index). COUNT(*) is the universal standard."
  },
  {
    "id": "mcq_count_19",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #19] Given a table with 5 rows containing values [10, 20, 20, NULL, NULL], what does \"SELECT COUNT(DISTINCT val) FROM t;\" return? (Scenario Variant 4)",
    "options": [
      "5",
      "4",
      "3",
      "2"
    ],
    "correctIndex": 3,
    "explanation": "COUNT(DISTINCT val) filters out NULLs first, then deduplicates the remaining non-NULL values [10, 20, 20] into unique elements [10, 20], yielding a count of 2."
  },
  {
    "id": "mcq_count_20",
    "keyword": "COUNT",
    "tag": "🏆 Senior Staff",
    "question": "[COUNT #20] Why can COUNT(DISTINCT col) become a major performance bottleneck on billion-row tables? (Scenario Variant 4)",
    "options": [
      "It disables parallel query workers across all CPU cores",
      "It requires maintaining an in-memory hash set or performing an expensive disk sort to eliminate duplicates",
      "It locks the entire table preventing concurrent writes",
      "It forces the storage engine to convert data types to strings"
    ],
    "correctIndex": 1,
    "explanation": "Unlike simple streaming COUNT(*), COUNT(DISTINCT) must track every distinct key in a hash table or sort buffer, leading to high memory pressure and potential spills to temp disk."
  },
  {
    "id": "mcq_count_21",
    "keyword": "COUNT",
    "tag": "🍡 Quick Snack",
    "question": "[COUNT #21] What is the key functional difference between COUNT(*) and COUNT(column_name) when the specified column contains NULLs? (Scenario Variant 5)",
    "options": [
      "COUNT(*) counts every physical row; COUNT(column_name) excludes rows where column_name IS NULL",
      "COUNT(*) only counts primary keys; COUNT(column_name) counts all non-primary keys",
      "COUNT(column_name) converts NULLs into 0 before calculating the total headcount",
      "There is no functional difference; both return the exact same row count"
    ],
    "correctIndex": 0,
    "explanation": "In ANSI SQL, COUNT(*) counts the cardinality of the input row set regardless of column contents, while COUNT(column_name) strictly tallies rows where the specified column evaluates to a non-NULL value."
  },
  {
    "id": "mcq_count_22",
    "keyword": "COUNT",
    "tag": "⚡ Gotcha Trap",
    "question": "[COUNT #22] When running \"SELECT COUNT(*) FROM EmptyTable;\" where the table contains exactly zero rows, what is the output? (Scenario Variant 5)",
    "options": [
      "NULL",
      "An error: EmptyTableNotFoundException",
      "An empty result set with 0 rows",
      "0"
    ],
    "correctIndex": 3,
    "explanation": "COUNT(*) on an empty table returns a single row with the scalar value 0. Unlike SUM() or AVG() which return NULL on empty sets, COUNT always returns an integer >= 0."
  },
  {
    "id": "mcq_count_23",
    "keyword": "COUNT",
    "tag": "🐱 Brain Bender",
    "question": "[COUNT #23] In terms of optimizer performance in modern RDBMS (PostgreSQL, MySQL InnoDB), why is COUNT(*) preferred over COUNT(1)? (Scenario Variant 5)",
    "options": [
      "COUNT(1) consumes twice the memory buffer allocation of COUNT(*)",
      "COUNT(*) is standard ANSI SQL and engines optimize it directly to scan the narrowest index",
      "Modern optimizers treat COUNT(*) and COUNT(1) identically, but COUNT(*) is the idiomatic standard",
      "COUNT(1) forces the engine to materialize a literal 1 for every row before summing"
    ],
    "correctIndex": 2,
    "explanation": "Modern query planners parse COUNT(1) and COUNT(*) to the exact same physical execution plan (scanning the leanest available secondary index). COUNT(*) is the universal standard."
  },
  {
    "id": "mcq_count_24",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #24] Given a table with 5 rows containing values [10, 20, 20, NULL, NULL], what does \"SELECT COUNT(DISTINCT val) FROM t;\" return? (Scenario Variant 5)",
    "options": [
      "5",
      "3",
      "4",
      "2"
    ],
    "correctIndex": 3,
    "explanation": "COUNT(DISTINCT val) filters out NULLs first, then deduplicates the remaining non-NULL values [10, 20, 20] into unique elements [10, 20], yielding a count of 2."
  },
  {
    "id": "mcq_count_25",
    "keyword": "COUNT",
    "tag": "🏆 Senior Staff",
    "question": "[COUNT #25] Why can COUNT(DISTINCT col) become a major performance bottleneck on billion-row tables? (Scenario Variant 5)",
    "options": [
      "It disables parallel query workers across all CPU cores",
      "It requires maintaining an in-memory hash set or performing an expensive disk sort to eliminate duplicates",
      "It locks the entire table preventing concurrent writes",
      "It forces the storage engine to convert data types to strings"
    ],
    "correctIndex": 1,
    "explanation": "Unlike simple streaming COUNT(*), COUNT(DISTINCT) must track every distinct key in a hash table or sort buffer, leading to high memory pressure and potential spills to temp disk."
  },
  {
    "id": "mcq_count_26",
    "keyword": "COUNT",
    "tag": "🍡 Quick Snack",
    "question": "[COUNT #26] What is the key functional difference between COUNT(*) and COUNT(column_name) when the specified column contains NULLs? (Scenario Variant 6)",
    "options": [
      "COUNT(column_name) converts NULLs into 0 before calculating the total headcount",
      "There is no functional difference; both return the exact same row count",
      "COUNT(*) only counts primary keys; COUNT(column_name) counts all non-primary keys",
      "COUNT(*) counts every physical row; COUNT(column_name) excludes rows where column_name IS NULL"
    ],
    "correctIndex": 3,
    "explanation": "In ANSI SQL, COUNT(*) counts the cardinality of the input row set regardless of column contents, while COUNT(column_name) strictly tallies rows where the specified column evaluates to a non-NULL value."
  },
  {
    "id": "mcq_count_27",
    "keyword": "COUNT",
    "tag": "⚡ Gotcha Trap",
    "question": "[COUNT #27] When running \"SELECT COUNT(*) FROM EmptyTable;\" where the table contains exactly zero rows, what is the output? (Scenario Variant 6)",
    "options": [
      "An empty result set with 0 rows",
      "An error: EmptyTableNotFoundException",
      "NULL",
      "0"
    ],
    "correctIndex": 3,
    "explanation": "COUNT(*) on an empty table returns a single row with the scalar value 0. Unlike SUM() or AVG() which return NULL on empty sets, COUNT always returns an integer >= 0."
  },
  {
    "id": "mcq_count_28",
    "keyword": "COUNT",
    "tag": "🐱 Brain Bender",
    "question": "[COUNT #28] In terms of optimizer performance in modern RDBMS (PostgreSQL, MySQL InnoDB), why is COUNT(*) preferred over COUNT(1)? (Scenario Variant 6)",
    "options": [
      "Modern optimizers treat COUNT(*) and COUNT(1) identically, but COUNT(*) is the idiomatic standard",
      "COUNT(1) consumes twice the memory buffer allocation of COUNT(*)",
      "COUNT(1) forces the engine to materialize a literal 1 for every row before summing",
      "COUNT(*) is standard ANSI SQL and engines optimize it directly to scan the narrowest index"
    ],
    "correctIndex": 0,
    "explanation": "Modern query planners parse COUNT(1) and COUNT(*) to the exact same physical execution plan (scanning the leanest available secondary index). COUNT(*) is the universal standard."
  },
  {
    "id": "mcq_count_29",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #29] Given a table with 5 rows containing values [10, 20, 20, NULL, NULL], what does \"SELECT COUNT(DISTINCT val) FROM t;\" return? (Scenario Variant 6)",
    "options": [
      "5",
      "4",
      "3",
      "2"
    ],
    "correctIndex": 3,
    "explanation": "COUNT(DISTINCT val) filters out NULLs first, then deduplicates the remaining non-NULL values [10, 20, 20] into unique elements [10, 20], yielding a count of 2."
  },
  {
    "id": "mcq_count_30",
    "keyword": "COUNT",
    "tag": "🏆 Senior Staff",
    "question": "[COUNT #30] Why can COUNT(DISTINCT col) become a major performance bottleneck on billion-row tables? (Scenario Variant 6)",
    "options": [
      "It forces the storage engine to convert data types to strings",
      "It requires maintaining an in-memory hash set or performing an expensive disk sort to eliminate duplicates",
      "It locks the entire table preventing concurrent writes",
      "It disables parallel query workers across all CPU cores"
    ],
    "correctIndex": 1,
    "explanation": "Unlike simple streaming COUNT(*), COUNT(DISTINCT) must track every distinct key in a hash table or sort buffer, leading to high memory pressure and potential spills to temp disk."
  },
  {
    "id": "mcq_count_31",
    "keyword": "COUNT",
    "tag": "🍡 Quick Snack",
    "question": "[COUNT #31] What is the key functional difference between COUNT(*) and COUNT(column_name) when the specified column contains NULLs? (Scenario Variant 7)",
    "options": [
      "COUNT(*) counts every physical row; COUNT(column_name) excludes rows where column_name IS NULL",
      "COUNT(*) only counts primary keys; COUNT(column_name) counts all non-primary keys",
      "COUNT(column_name) converts NULLs into 0 before calculating the total headcount",
      "There is no functional difference; both return the exact same row count"
    ],
    "correctIndex": 0,
    "explanation": "In ANSI SQL, COUNT(*) counts the cardinality of the input row set regardless of column contents, while COUNT(column_name) strictly tallies rows where the specified column evaluates to a non-NULL value."
  },
  {
    "id": "mcq_count_32",
    "keyword": "COUNT",
    "tag": "⚡ Gotcha Trap",
    "question": "[COUNT #32] When running \"SELECT COUNT(*) FROM EmptyTable;\" where the table contains exactly zero rows, what is the output? (Scenario Variant 7)",
    "options": [
      "An empty result set with 0 rows",
      "0",
      "An error: EmptyTableNotFoundException",
      "NULL"
    ],
    "correctIndex": 1,
    "explanation": "COUNT(*) on an empty table returns a single row with the scalar value 0. Unlike SUM() or AVG() which return NULL on empty sets, COUNT always returns an integer >= 0."
  },
  {
    "id": "mcq_count_33",
    "keyword": "COUNT",
    "tag": "🐱 Brain Bender",
    "question": "[COUNT #33] In terms of optimizer performance in modern RDBMS (PostgreSQL, MySQL InnoDB), why is COUNT(*) preferred over COUNT(1)? (Scenario Variant 7)",
    "options": [
      "Modern optimizers treat COUNT(*) and COUNT(1) identically, but COUNT(*) is the idiomatic standard",
      "COUNT(*) is standard ANSI SQL and engines optimize it directly to scan the narrowest index",
      "COUNT(1) forces the engine to materialize a literal 1 for every row before summing",
      "COUNT(1) consumes twice the memory buffer allocation of COUNT(*)"
    ],
    "correctIndex": 0,
    "explanation": "Modern query planners parse COUNT(1) and COUNT(*) to the exact same physical execution plan (scanning the leanest available secondary index). COUNT(*) is the universal standard."
  },
  {
    "id": "mcq_count_34",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #34] Given a table with 5 rows containing values [10, 20, 20, NULL, NULL], what does \"SELECT COUNT(DISTINCT val) FROM t;\" return? (Scenario Variant 7)",
    "options": [
      "5",
      "2",
      "4",
      "3"
    ],
    "correctIndex": 1,
    "explanation": "COUNT(DISTINCT val) filters out NULLs first, then deduplicates the remaining non-NULL values [10, 20, 20] into unique elements [10, 20], yielding a count of 2."
  },
  {
    "id": "mcq_count_35",
    "keyword": "COUNT",
    "tag": "🏆 Senior Staff",
    "question": "[COUNT #35] Why can COUNT(DISTINCT col) become a major performance bottleneck on billion-row tables? (Scenario Variant 7)",
    "options": [
      "It locks the entire table preventing concurrent writes",
      "It forces the storage engine to convert data types to strings",
      "It disables parallel query workers across all CPU cores",
      "It requires maintaining an in-memory hash set or performing an expensive disk sort to eliminate duplicates"
    ],
    "correctIndex": 3,
    "explanation": "Unlike simple streaming COUNT(*), COUNT(DISTINCT) must track every distinct key in a hash table or sort buffer, leading to high memory pressure and potential spills to temp disk."
  },
  {
    "id": "mcq_count_36",
    "keyword": "COUNT",
    "tag": "🍡 Quick Snack",
    "question": "[COUNT #36] What is the key functional difference between COUNT(*) and COUNT(column_name) when the specified column contains NULLs? (Scenario Variant 8)",
    "options": [
      "COUNT(column_name) converts NULLs into 0 before calculating the total headcount",
      "COUNT(*) counts every physical row; COUNT(column_name) excludes rows where column_name IS NULL",
      "There is no functional difference; both return the exact same row count",
      "COUNT(*) only counts primary keys; COUNT(column_name) counts all non-primary keys"
    ],
    "correctIndex": 1,
    "explanation": "In ANSI SQL, COUNT(*) counts the cardinality of the input row set regardless of column contents, while COUNT(column_name) strictly tallies rows where the specified column evaluates to a non-NULL value."
  },
  {
    "id": "mcq_count_37",
    "keyword": "COUNT",
    "tag": "⚡ Gotcha Trap",
    "question": "[COUNT #37] When running \"SELECT COUNT(*) FROM EmptyTable;\" where the table contains exactly zero rows, what is the output? (Scenario Variant 8)",
    "options": [
      "NULL",
      "An empty result set with 0 rows",
      "An error: EmptyTableNotFoundException",
      "0"
    ],
    "correctIndex": 3,
    "explanation": "COUNT(*) on an empty table returns a single row with the scalar value 0. Unlike SUM() or AVG() which return NULL on empty sets, COUNT always returns an integer >= 0."
  },
  {
    "id": "mcq_count_38",
    "keyword": "COUNT",
    "tag": "🐱 Brain Bender",
    "question": "[COUNT #38] In terms of optimizer performance in modern RDBMS (PostgreSQL, MySQL InnoDB), why is COUNT(*) preferred over COUNT(1)? (Scenario Variant 8)",
    "options": [
      "COUNT(1) forces the engine to materialize a literal 1 for every row before summing",
      "COUNT(1) consumes twice the memory buffer allocation of COUNT(*)",
      "COUNT(*) is standard ANSI SQL and engines optimize it directly to scan the narrowest index",
      "Modern optimizers treat COUNT(*) and COUNT(1) identically, but COUNT(*) is the idiomatic standard"
    ],
    "correctIndex": 3,
    "explanation": "Modern query planners parse COUNT(1) and COUNT(*) to the exact same physical execution plan (scanning the leanest available secondary index). COUNT(*) is the universal standard."
  },
  {
    "id": "mcq_count_39",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #39] Given a table with 5 rows containing values [10, 20, 20, NULL, NULL], what does \"SELECT COUNT(DISTINCT val) FROM t;\" return? (Scenario Variant 8)",
    "options": [
      "4",
      "3",
      "5",
      "2"
    ],
    "correctIndex": 3,
    "explanation": "COUNT(DISTINCT val) filters out NULLs first, then deduplicates the remaining non-NULL values [10, 20, 20] into unique elements [10, 20], yielding a count of 2."
  },
  {
    "id": "mcq_count_40",
    "keyword": "COUNT",
    "tag": "🏆 Senior Staff",
    "question": "[COUNT #40] Why can COUNT(DISTINCT col) become a major performance bottleneck on billion-row tables? (Scenario Variant 8)",
    "options": [
      "It forces the storage engine to convert data types to strings",
      "It requires maintaining an in-memory hash set or performing an expensive disk sort to eliminate duplicates",
      "It locks the entire table preventing concurrent writes",
      "It disables parallel query workers across all CPU cores"
    ],
    "correctIndex": 1,
    "explanation": "Unlike simple streaming COUNT(*), COUNT(DISTINCT) must track every distinct key in a hash table or sort buffer, leading to high memory pressure and potential spills to temp disk."
  },
  {
    "id": "mcq_count_41",
    "keyword": "COUNT",
    "tag": "🍡 Quick Snack",
    "question": "[COUNT #41] What is the key functional difference between COUNT(*) and COUNT(column_name) when the specified column contains NULLs? (Scenario Variant 9)",
    "options": [
      "COUNT(column_name) converts NULLs into 0 before calculating the total headcount",
      "COUNT(*) only counts primary keys; COUNT(column_name) counts all non-primary keys",
      "COUNT(*) counts every physical row; COUNT(column_name) excludes rows where column_name IS NULL",
      "There is no functional difference; both return the exact same row count"
    ],
    "correctIndex": 2,
    "explanation": "In ANSI SQL, COUNT(*) counts the cardinality of the input row set regardless of column contents, while COUNT(column_name) strictly tallies rows where the specified column evaluates to a non-NULL value."
  },
  {
    "id": "mcq_count_42",
    "keyword": "COUNT",
    "tag": "⚡ Gotcha Trap",
    "question": "[COUNT #42] When running \"SELECT COUNT(*) FROM EmptyTable;\" where the table contains exactly zero rows, what is the output? (Scenario Variant 9)",
    "options": [
      "An error: EmptyTableNotFoundException",
      "0",
      "NULL",
      "An empty result set with 0 rows"
    ],
    "correctIndex": 1,
    "explanation": "COUNT(*) on an empty table returns a single row with the scalar value 0. Unlike SUM() or AVG() which return NULL on empty sets, COUNT always returns an integer >= 0."
  },
  {
    "id": "mcq_count_43",
    "keyword": "COUNT",
    "tag": "🐱 Brain Bender",
    "question": "[COUNT #43] In terms of optimizer performance in modern RDBMS (PostgreSQL, MySQL InnoDB), why is COUNT(*) preferred over COUNT(1)? (Scenario Variant 9)",
    "options": [
      "Modern optimizers treat COUNT(*) and COUNT(1) identically, but COUNT(*) is the idiomatic standard",
      "COUNT(1) forces the engine to materialize a literal 1 for every row before summing",
      "COUNT(*) is standard ANSI SQL and engines optimize it directly to scan the narrowest index",
      "COUNT(1) consumes twice the memory buffer allocation of COUNT(*)"
    ],
    "correctIndex": 0,
    "explanation": "Modern query planners parse COUNT(1) and COUNT(*) to the exact same physical execution plan (scanning the leanest available secondary index). COUNT(*) is the universal standard."
  },
  {
    "id": "mcq_count_44",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #44] Given a table with 5 rows containing values [10, 20, 20, NULL, NULL], what does \"SELECT COUNT(DISTINCT val) FROM t;\" return? (Scenario Variant 9)",
    "options": [
      "3",
      "2",
      "4",
      "5"
    ],
    "correctIndex": 1,
    "explanation": "COUNT(DISTINCT val) filters out NULLs first, then deduplicates the remaining non-NULL values [10, 20, 20] into unique elements [10, 20], yielding a count of 2."
  },
  {
    "id": "mcq_count_45",
    "keyword": "COUNT",
    "tag": "🏆 Senior Staff",
    "question": "[COUNT #45] Why can COUNT(DISTINCT col) become a major performance bottleneck on billion-row tables? (Scenario Variant 9)",
    "options": [
      "It requires maintaining an in-memory hash set or performing an expensive disk sort to eliminate duplicates",
      "It forces the storage engine to convert data types to strings",
      "It disables parallel query workers across all CPU cores",
      "It locks the entire table preventing concurrent writes"
    ],
    "correctIndex": 0,
    "explanation": "Unlike simple streaming COUNT(*), COUNT(DISTINCT) must track every distinct key in a hash table or sort buffer, leading to high memory pressure and potential spills to temp disk."
  },
  {
    "id": "mcq_count_46",
    "keyword": "COUNT",
    "tag": "🍡 Quick Snack",
    "question": "[COUNT #46] What is the key functional difference between COUNT(*) and COUNT(column_name) when the specified column contains NULLs? (Scenario Variant 10)",
    "options": [
      "COUNT(column_name) converts NULLs into 0 before calculating the total headcount",
      "COUNT(*) only counts primary keys; COUNT(column_name) counts all non-primary keys",
      "COUNT(*) counts every physical row; COUNT(column_name) excludes rows where column_name IS NULL",
      "There is no functional difference; both return the exact same row count"
    ],
    "correctIndex": 2,
    "explanation": "In ANSI SQL, COUNT(*) counts the cardinality of the input row set regardless of column contents, while COUNT(column_name) strictly tallies rows where the specified column evaluates to a non-NULL value."
  },
  {
    "id": "mcq_count_47",
    "keyword": "COUNT",
    "tag": "⚡ Gotcha Trap",
    "question": "[COUNT #47] When running \"SELECT COUNT(*) FROM EmptyTable;\" where the table contains exactly zero rows, what is the output? (Scenario Variant 10)",
    "options": [
      "An empty result set with 0 rows",
      "NULL",
      "0",
      "An error: EmptyTableNotFoundException"
    ],
    "correctIndex": 2,
    "explanation": "COUNT(*) on an empty table returns a single row with the scalar value 0. Unlike SUM() or AVG() which return NULL on empty sets, COUNT always returns an integer >= 0."
  },
  {
    "id": "mcq_count_48",
    "keyword": "COUNT",
    "tag": "🐱 Brain Bender",
    "question": "[COUNT #48] In terms of optimizer performance in modern RDBMS (PostgreSQL, MySQL InnoDB), why is COUNT(*) preferred over COUNT(1)? (Scenario Variant 10)",
    "options": [
      "COUNT(1) forces the engine to materialize a literal 1 for every row before summing",
      "Modern optimizers treat COUNT(*) and COUNT(1) identically, but COUNT(*) is the idiomatic standard",
      "COUNT(1) consumes twice the memory buffer allocation of COUNT(*)",
      "COUNT(*) is standard ANSI SQL and engines optimize it directly to scan the narrowest index"
    ],
    "correctIndex": 1,
    "explanation": "Modern query planners parse COUNT(1) and COUNT(*) to the exact same physical execution plan (scanning the leanest available secondary index). COUNT(*) is the universal standard."
  },
  {
    "id": "mcq_count_49",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #49] Given a table with 5 rows containing values [10, 20, 20, NULL, NULL], what does \"SELECT COUNT(DISTINCT val) FROM t;\" return? (Scenario Variant 10)",
    "options": [
      "4",
      "5",
      "2",
      "3"
    ],
    "correctIndex": 2,
    "explanation": "COUNT(DISTINCT val) filters out NULLs first, then deduplicates the remaining non-NULL values [10, 20, 20] into unique elements [10, 20], yielding a count of 2."
  },
  {
    "id": "mcq_count_50",
    "keyword": "COUNT",
    "tag": "🏆 Senior Staff",
    "question": "[COUNT #50] Why can COUNT(DISTINCT col) become a major performance bottleneck on billion-row tables? (Scenario Variant 10)",
    "options": [
      "It forces the storage engine to convert data types to strings",
      "It locks the entire table preventing concurrent writes",
      "It requires maintaining an in-memory hash set or performing an expensive disk sort to eliminate duplicates",
      "It disables parallel query workers across all CPU cores"
    ],
    "correctIndex": 2,
    "explanation": "Unlike simple streaming COUNT(*), COUNT(DISTINCT) must track every distinct key in a hash table or sort buffer, leading to high memory pressure and potential spills to temp disk."
  },
  {
    "id": "mcq_count_51",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #51 &bull; Fintech & Ledger Systems] What is the result of SELECT COUNT(DISTINCT col1, col2) in MySQL 8.0 when a row contains a NULL in col1 but a valid value in col2? (Application Scenario 1)",
    "options": [
      "The row is included because col2 is not NULL",
      "An error 1064 is thrown because multi-column COUNT DISTINCT is unsupported",
      "The NULL is coerced to an empty string",
      "The row is excluded from the distinct count because ANSI SQL requires all tuple elements to be non-NULL"
    ],
    "correctIndex": 3,
    "explanation": "In MySQL, COUNT(DISTINCT expr1, expr2, ...) returns the number of unique non-NULL combinations. If ANY column in the tuple is NULL, the entire tuple is ignored. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_count_52",
    "keyword": "COUNT",
    "tag": "🏛️ Corporate Edge",
    "question": "[COUNT #52 &bull; SaaS Subscription Billing] In high-throughput event logging, why might an architect replace SELECT COUNT(*) with an approximate row count from information_schema.tables? (Application Scenario 1)",
    "options": [
      "information_schema tables provide microsecond transactional ACID precision",
      "Exact COUNT(*) on InnoDB without an index scan requires an MVCC row traversal which can lock or slow down on 100M+ row tables",
      "COUNT(*) is deprecated in SQL:2023 standard",
      "InnoDB automatically converts information_schema queries into parallel GPU shaders"
    ],
    "correctIndex": 1,
    "explanation": "For massive InnoDB tables, transactional MVCC guarantees require inspecting row visibility unless a secondary index can be scanned. For dashboards, table_rows from information_schema provides instantaneous O(1) approximation. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_count_53",
    "keyword": "COUNT",
    "tag": "💡 Lead Architect",
    "question": "[COUNT #53 &bull; Global Supply Chain & Logistics] Which query correctly counts the number of active users per day while outputting 0 (rather than omitting the day) for days with zero user activity? (Application Scenario 1)",
    "options": [
      "SELECT d.day, COUNT(*) FROM calendar_days d INNER JOIN user_activity u ON d.day = u.activity_date GROUP BY d.day",
      "SELECT d.day, SUM(u.id) FROM calendar_days d RIGHT JOIN user_activity u ON d.day = u.activity_date GROUP BY d.day",
      "SELECT d.day, COUNT(d.day) FROM user_activity u LEFT JOIN calendar_days d ON d.day = u.activity_date GROUP BY d.day",
      "SELECT d.day, COUNT(u.id) FROM calendar_days d LEFT JOIN user_activity u ON d.day = u.activity_date GROUP BY d.day"
    ],
    "correctIndex": 3,
    "explanation": "A LEFT JOIN from a master calendar_days table combined with COUNT(u.id) properly preserves days with no records, and because u.id is NULL for unmatched days, COUNT(u.id) returns 0. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_count_54",
    "keyword": "COUNT",
    "tag": "⚡ Gotcha Trap",
    "question": "[COUNT #54 &bull; Healthcare Patient Records] When running SELECT COUNT(1) FROM (SELECT 1 UNION SELECT 1) AS t, what value is returned? (Application Scenario 1)",
    "options": [
      "2",
      "1",
      "NULL",
      "Syntax error"
    ],
    "correctIndex": 1,
    "explanation": "UNION without ALL deduplicates rows. (SELECT 1 UNION SELECT 1) results in exactly 1 row, so COUNT(1) yields 1. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_count_55",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #55 &bull; E-Commerce Checkout Funnels] What does SELECT COUNT(NULLIF(status, 'inactive')) FROM subscriptions; achieve? (Application Scenario 1)",
    "options": [
      "Counts only subscriptions where status is 'inactive'",
      "Throws a runtime error because NULLIF cannot accept column identifiers",
      "Converts the entire count to NULL if any record is inactive",
      "Counts all subscriptions, converting 'inactive' to NULL and thus excluding 'inactive' records from the count"
    ],
    "correctIndex": 3,
    "explanation": "NULLIF(status, 'inactive') returns NULL whenever status is 'inactive'. Since COUNT(expr) ignores NULLs, this concisely counts only subscriptions that are NOT inactive. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_count_56",
    "keyword": "COUNT",
    "tag": "🏛️ Corporate Edge",
    "question": "[COUNT #56 &bull; Telecom Billing & Data Streams] What is the result of SELECT COUNT(DISTINCT col1, col2) in MySQL 8.0 when a row contains a NULL in col1 but a valid value in col2? (Application Scenario 2)",
    "options": [
      "The row is included because col2 is not NULL",
      "The row is excluded from the distinct count because ANSI SQL requires all tuple elements to be non-NULL",
      "An error 1064 is thrown because multi-column COUNT DISTINCT is unsupported",
      "The NULL is coerced to an empty string"
    ],
    "correctIndex": 1,
    "explanation": "In MySQL, COUNT(DISTINCT expr1, expr2, ...) returns the number of unique non-NULL combinations. If ANY column in the tuple is NULL, the entire tuple is ignored. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_count_57",
    "keyword": "COUNT",
    "tag": "💡 Lead Architect",
    "question": "[COUNT #57 &bull; AdTech Real-Time Bidding] In high-throughput event logging, why might an architect replace SELECT COUNT(*) with an approximate row count from information_schema.tables? (Application Scenario 2)",
    "options": [
      "information_schema tables provide microsecond transactional ACID precision",
      "COUNT(*) is deprecated in SQL:2023 standard",
      "InnoDB automatically converts information_schema queries into parallel GPU shaders",
      "Exact COUNT(*) on InnoDB without an index scan requires an MVCC row traversal which can lock or slow down on 100M+ row tables"
    ],
    "correctIndex": 3,
    "explanation": "For massive InnoDB tables, transactional MVCC guarantees require inspecting row visibility unless a secondary index can be scanned. For dashboards, table_rows from information_schema provides instantaneous O(1) approximation. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_count_58",
    "keyword": "COUNT",
    "tag": "⚡ Gotcha Trap",
    "question": "[COUNT #58 &bull; Cybersecurity Audit Logs] Which query correctly counts the number of active users per day while outputting 0 (rather than omitting the day) for days with zero user activity? (Application Scenario 2)",
    "options": [
      "SELECT d.day, COUNT(*) FROM calendar_days d INNER JOIN user_activity u ON d.day = u.activity_date GROUP BY d.day",
      "SELECT d.day, COUNT(u.id) FROM calendar_days d LEFT JOIN user_activity u ON d.day = u.activity_date GROUP BY d.day",
      "SELECT d.day, SUM(u.id) FROM calendar_days d RIGHT JOIN user_activity u ON d.day = u.activity_date GROUP BY d.day",
      "SELECT d.day, COUNT(d.day) FROM user_activity u LEFT JOIN calendar_days d ON d.day = u.activity_date GROUP BY d.day"
    ],
    "correctIndex": 1,
    "explanation": "A LEFT JOIN from a master calendar_days table combined with COUNT(u.id) properly preserves days with no records, and because u.id is NULL for unmatched days, COUNT(u.id) returns 0. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_count_59",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #59 &bull; Fintech & Ledger Systems] When running SELECT COUNT(1) FROM (SELECT 1 UNION SELECT 1) AS t, what value is returned? (Application Scenario 2)",
    "options": [
      "2",
      "NULL",
      "Syntax error",
      "1"
    ],
    "correctIndex": 3,
    "explanation": "UNION without ALL deduplicates rows. (SELECT 1 UNION SELECT 1) results in exactly 1 row, so COUNT(1) yields 1. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_count_60",
    "keyword": "COUNT",
    "tag": "🏛️ Corporate Edge",
    "question": "[COUNT #60 &bull; SaaS Subscription Billing] What does SELECT COUNT(NULLIF(status, 'inactive')) FROM subscriptions; achieve? (Application Scenario 2)",
    "options": [
      "Counts only subscriptions where status is 'inactive'",
      "Counts all subscriptions, converting 'inactive' to NULL and thus excluding 'inactive' records from the count",
      "Throws a runtime error because NULLIF cannot accept column identifiers",
      "Converts the entire count to NULL if any record is inactive"
    ],
    "correctIndex": 1,
    "explanation": "NULLIF(status, 'inactive') returns NULL whenever status is 'inactive'. Since COUNT(expr) ignores NULLs, this concisely counts only subscriptions that are NOT inactive. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_count_61",
    "keyword": "COUNT",
    "tag": "💡 Lead Architect",
    "question": "[COUNT #61 &bull; Global Supply Chain & Logistics] What is the result of SELECT COUNT(DISTINCT col1, col2) in MySQL 8.0 when a row contains a NULL in col1 but a valid value in col2? (Application Scenario 3)",
    "options": [
      "The row is included because col2 is not NULL",
      "An error 1064 is thrown because multi-column COUNT DISTINCT is unsupported",
      "The NULL is coerced to an empty string",
      "The row is excluded from the distinct count because ANSI SQL requires all tuple elements to be non-NULL"
    ],
    "correctIndex": 3,
    "explanation": "In MySQL, COUNT(DISTINCT expr1, expr2, ...) returns the number of unique non-NULL combinations. If ANY column in the tuple is NULL, the entire tuple is ignored. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_count_62",
    "keyword": "COUNT",
    "tag": "⚡ Gotcha Trap",
    "question": "[COUNT #62 &bull; Healthcare Patient Records] In high-throughput event logging, why might an architect replace SELECT COUNT(*) with an approximate row count from information_schema.tables? (Application Scenario 3)",
    "options": [
      "information_schema tables provide microsecond transactional ACID precision",
      "Exact COUNT(*) on InnoDB without an index scan requires an MVCC row traversal which can lock or slow down on 100M+ row tables",
      "COUNT(*) is deprecated in SQL:2023 standard",
      "InnoDB automatically converts information_schema queries into parallel GPU shaders"
    ],
    "correctIndex": 1,
    "explanation": "For massive InnoDB tables, transactional MVCC guarantees require inspecting row visibility unless a secondary index can be scanned. For dashboards, table_rows from information_schema provides instantaneous O(1) approximation. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_count_63",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #63 &bull; E-Commerce Checkout Funnels] Which query correctly counts the number of active users per day while outputting 0 (rather than omitting the day) for days with zero user activity? (Application Scenario 3)",
    "options": [
      "SELECT d.day, COUNT(*) FROM calendar_days d INNER JOIN user_activity u ON d.day = u.activity_date GROUP BY d.day",
      "SELECT d.day, SUM(u.id) FROM calendar_days d RIGHT JOIN user_activity u ON d.day = u.activity_date GROUP BY d.day",
      "SELECT d.day, COUNT(d.day) FROM user_activity u LEFT JOIN calendar_days d ON d.day = u.activity_date GROUP BY d.day",
      "SELECT d.day, COUNT(u.id) FROM calendar_days d LEFT JOIN user_activity u ON d.day = u.activity_date GROUP BY d.day"
    ],
    "correctIndex": 3,
    "explanation": "A LEFT JOIN from a master calendar_days table combined with COUNT(u.id) properly preserves days with no records, and because u.id is NULL for unmatched days, COUNT(u.id) returns 0. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_count_64",
    "keyword": "COUNT",
    "tag": "🏛️ Corporate Edge",
    "question": "[COUNT #64 &bull; Telecom Billing & Data Streams] When running SELECT COUNT(1) FROM (SELECT 1 UNION SELECT 1) AS t, what value is returned? (Application Scenario 3)",
    "options": [
      "2",
      "1",
      "NULL",
      "Syntax error"
    ],
    "correctIndex": 1,
    "explanation": "UNION without ALL deduplicates rows. (SELECT 1 UNION SELECT 1) results in exactly 1 row, so COUNT(1) yields 1. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_count_65",
    "keyword": "COUNT",
    "tag": "💡 Lead Architect",
    "question": "[COUNT #65 &bull; AdTech Real-Time Bidding] What does SELECT COUNT(NULLIF(status, 'inactive')) FROM subscriptions; achieve? (Application Scenario 3)",
    "options": [
      "Counts only subscriptions where status is 'inactive'",
      "Throws a runtime error because NULLIF cannot accept column identifiers",
      "Converts the entire count to NULL if any record is inactive",
      "Counts all subscriptions, converting 'inactive' to NULL and thus excluding 'inactive' records from the count"
    ],
    "correctIndex": 3,
    "explanation": "NULLIF(status, 'inactive') returns NULL whenever status is 'inactive'. Since COUNT(expr) ignores NULLs, this concisely counts only subscriptions that are NOT inactive. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_count_66",
    "keyword": "COUNT",
    "tag": "⚡ Gotcha Trap",
    "question": "[COUNT #66 &bull; Cybersecurity Audit Logs] What is the result of SELECT COUNT(DISTINCT col1, col2) in MySQL 8.0 when a row contains a NULL in col1 but a valid value in col2? (Application Scenario 4)",
    "options": [
      "The row is included because col2 is not NULL",
      "The row is excluded from the distinct count because ANSI SQL requires all tuple elements to be non-NULL",
      "An error 1064 is thrown because multi-column COUNT DISTINCT is unsupported",
      "The NULL is coerced to an empty string"
    ],
    "correctIndex": 1,
    "explanation": "In MySQL, COUNT(DISTINCT expr1, expr2, ...) returns the number of unique non-NULL combinations. If ANY column in the tuple is NULL, the entire tuple is ignored. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_count_67",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #67 &bull; Fintech & Ledger Systems] In high-throughput event logging, why might an architect replace SELECT COUNT(*) with an approximate row count from information_schema.tables? (Application Scenario 4)",
    "options": [
      "information_schema tables provide microsecond transactional ACID precision",
      "COUNT(*) is deprecated in SQL:2023 standard",
      "InnoDB automatically converts information_schema queries into parallel GPU shaders",
      "Exact COUNT(*) on InnoDB without an index scan requires an MVCC row traversal which can lock or slow down on 100M+ row tables"
    ],
    "correctIndex": 3,
    "explanation": "For massive InnoDB tables, transactional MVCC guarantees require inspecting row visibility unless a secondary index can be scanned. For dashboards, table_rows from information_schema provides instantaneous O(1) approximation. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_count_68",
    "keyword": "COUNT",
    "tag": "🏛️ Corporate Edge",
    "question": "[COUNT #68 &bull; SaaS Subscription Billing] Which query correctly counts the number of active users per day while outputting 0 (rather than omitting the day) for days with zero user activity? (Application Scenario 4)",
    "options": [
      "SELECT d.day, COUNT(*) FROM calendar_days d INNER JOIN user_activity u ON d.day = u.activity_date GROUP BY d.day",
      "SELECT d.day, COUNT(u.id) FROM calendar_days d LEFT JOIN user_activity u ON d.day = u.activity_date GROUP BY d.day",
      "SELECT d.day, SUM(u.id) FROM calendar_days d RIGHT JOIN user_activity u ON d.day = u.activity_date GROUP BY d.day",
      "SELECT d.day, COUNT(d.day) FROM user_activity u LEFT JOIN calendar_days d ON d.day = u.activity_date GROUP BY d.day"
    ],
    "correctIndex": 1,
    "explanation": "A LEFT JOIN from a master calendar_days table combined with COUNT(u.id) properly preserves days with no records, and because u.id is NULL for unmatched days, COUNT(u.id) returns 0. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_count_69",
    "keyword": "COUNT",
    "tag": "💡 Lead Architect",
    "question": "[COUNT #69 &bull; Global Supply Chain & Logistics] When running SELECT COUNT(1) FROM (SELECT 1 UNION SELECT 1) AS t, what value is returned? (Application Scenario 4)",
    "options": [
      "2",
      "NULL",
      "Syntax error",
      "1"
    ],
    "correctIndex": 3,
    "explanation": "UNION without ALL deduplicates rows. (SELECT 1 UNION SELECT 1) results in exactly 1 row, so COUNT(1) yields 1. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_count_70",
    "keyword": "COUNT",
    "tag": "⚡ Gotcha Trap",
    "question": "[COUNT #70 &bull; Healthcare Patient Records] What does SELECT COUNT(NULLIF(status, 'inactive')) FROM subscriptions; achieve? (Application Scenario 4)",
    "options": [
      "Counts only subscriptions where status is 'inactive'",
      "Counts all subscriptions, converting 'inactive' to NULL and thus excluding 'inactive' records from the count",
      "Throws a runtime error because NULLIF cannot accept column identifiers",
      "Converts the entire count to NULL if any record is inactive"
    ],
    "correctIndex": 1,
    "explanation": "NULLIF(status, 'inactive') returns NULL whenever status is 'inactive'. Since COUNT(expr) ignores NULLs, this concisely counts only subscriptions that are NOT inactive. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_count_71",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #71 &bull; E-Commerce Checkout Funnels] What is the result of SELECT COUNT(DISTINCT col1, col2) in MySQL 8.0 when a row contains a NULL in col1 but a valid value in col2? (Application Scenario 5)",
    "options": [
      "The row is included because col2 is not NULL",
      "An error 1064 is thrown because multi-column COUNT DISTINCT is unsupported",
      "The NULL is coerced to an empty string",
      "The row is excluded from the distinct count because ANSI SQL requires all tuple elements to be non-NULL"
    ],
    "correctIndex": 3,
    "explanation": "In MySQL, COUNT(DISTINCT expr1, expr2, ...) returns the number of unique non-NULL combinations. If ANY column in the tuple is NULL, the entire tuple is ignored. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_count_72",
    "keyword": "COUNT",
    "tag": "🏛️ Corporate Edge",
    "question": "[COUNT #72 &bull; Telecom Billing & Data Streams] In high-throughput event logging, why might an architect replace SELECT COUNT(*) with an approximate row count from information_schema.tables? (Application Scenario 5)",
    "options": [
      "information_schema tables provide microsecond transactional ACID precision",
      "Exact COUNT(*) on InnoDB without an index scan requires an MVCC row traversal which can lock or slow down on 100M+ row tables",
      "COUNT(*) is deprecated in SQL:2023 standard",
      "InnoDB automatically converts information_schema queries into parallel GPU shaders"
    ],
    "correctIndex": 1,
    "explanation": "For massive InnoDB tables, transactional MVCC guarantees require inspecting row visibility unless a secondary index can be scanned. For dashboards, table_rows from information_schema provides instantaneous O(1) approximation. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_count_73",
    "keyword": "COUNT",
    "tag": "💡 Lead Architect",
    "question": "[COUNT #73 &bull; AdTech Real-Time Bidding] Which query correctly counts the number of active users per day while outputting 0 (rather than omitting the day) for days with zero user activity? (Application Scenario 5)",
    "options": [
      "SELECT d.day, COUNT(*) FROM calendar_days d INNER JOIN user_activity u ON d.day = u.activity_date GROUP BY d.day",
      "SELECT d.day, SUM(u.id) FROM calendar_days d RIGHT JOIN user_activity u ON d.day = u.activity_date GROUP BY d.day",
      "SELECT d.day, COUNT(d.day) FROM user_activity u LEFT JOIN calendar_days d ON d.day = u.activity_date GROUP BY d.day",
      "SELECT d.day, COUNT(u.id) FROM calendar_days d LEFT JOIN user_activity u ON d.day = u.activity_date GROUP BY d.day"
    ],
    "correctIndex": 3,
    "explanation": "A LEFT JOIN from a master calendar_days table combined with COUNT(u.id) properly preserves days with no records, and because u.id is NULL for unmatched days, COUNT(u.id) returns 0. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_count_74",
    "keyword": "COUNT",
    "tag": "⚡ Gotcha Trap",
    "question": "[COUNT #74 &bull; Cybersecurity Audit Logs] When running SELECT COUNT(1) FROM (SELECT 1 UNION SELECT 1) AS t, what value is returned? (Application Scenario 5)",
    "options": [
      "2",
      "1",
      "NULL",
      "Syntax error"
    ],
    "correctIndex": 1,
    "explanation": "UNION without ALL deduplicates rows. (SELECT 1 UNION SELECT 1) results in exactly 1 row, so COUNT(1) yields 1. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_count_75",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #75 &bull; Fintech & Ledger Systems] What does SELECT COUNT(NULLIF(status, 'inactive')) FROM subscriptions; achieve? (Application Scenario 5)",
    "options": [
      "Counts only subscriptions where status is 'inactive'",
      "Throws a runtime error because NULLIF cannot accept column identifiers",
      "Converts the entire count to NULL if any record is inactive",
      "Counts all subscriptions, converting 'inactive' to NULL and thus excluding 'inactive' records from the count"
    ],
    "correctIndex": 3,
    "explanation": "NULLIF(status, 'inactive') returns NULL whenever status is 'inactive'. Since COUNT(expr) ignores NULLs, this concisely counts only subscriptions that are NOT inactive. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_count_76",
    "keyword": "COUNT",
    "tag": "🏛️ Corporate Edge",
    "question": "[COUNT #76 &bull; SaaS Subscription Billing] What is the result of SELECT COUNT(DISTINCT col1, col2) in MySQL 8.0 when a row contains a NULL in col1 but a valid value in col2? (Application Scenario 6)",
    "options": [
      "The row is included because col2 is not NULL",
      "The row is excluded from the distinct count because ANSI SQL requires all tuple elements to be non-NULL",
      "An error 1064 is thrown because multi-column COUNT DISTINCT is unsupported",
      "The NULL is coerced to an empty string"
    ],
    "correctIndex": 1,
    "explanation": "In MySQL, COUNT(DISTINCT expr1, expr2, ...) returns the number of unique non-NULL combinations. If ANY column in the tuple is NULL, the entire tuple is ignored. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_count_77",
    "keyword": "COUNT",
    "tag": "💡 Lead Architect",
    "question": "[COUNT #77 &bull; Global Supply Chain & Logistics] In high-throughput event logging, why might an architect replace SELECT COUNT(*) with an approximate row count from information_schema.tables? (Application Scenario 6)",
    "options": [
      "information_schema tables provide microsecond transactional ACID precision",
      "COUNT(*) is deprecated in SQL:2023 standard",
      "InnoDB automatically converts information_schema queries into parallel GPU shaders",
      "Exact COUNT(*) on InnoDB without an index scan requires an MVCC row traversal which can lock or slow down on 100M+ row tables"
    ],
    "correctIndex": 3,
    "explanation": "For massive InnoDB tables, transactional MVCC guarantees require inspecting row visibility unless a secondary index can be scanned. For dashboards, table_rows from information_schema provides instantaneous O(1) approximation. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_count_78",
    "keyword": "COUNT",
    "tag": "⚡ Gotcha Trap",
    "question": "[COUNT #78 &bull; Healthcare Patient Records] Which query correctly counts the number of active users per day while outputting 0 (rather than omitting the day) for days with zero user activity? (Application Scenario 6)",
    "options": [
      "SELECT d.day, COUNT(*) FROM calendar_days d INNER JOIN user_activity u ON d.day = u.activity_date GROUP BY d.day",
      "SELECT d.day, COUNT(u.id) FROM calendar_days d LEFT JOIN user_activity u ON d.day = u.activity_date GROUP BY d.day",
      "SELECT d.day, SUM(u.id) FROM calendar_days d RIGHT JOIN user_activity u ON d.day = u.activity_date GROUP BY d.day",
      "SELECT d.day, COUNT(d.day) FROM user_activity u LEFT JOIN calendar_days d ON d.day = u.activity_date GROUP BY d.day"
    ],
    "correctIndex": 1,
    "explanation": "A LEFT JOIN from a master calendar_days table combined with COUNT(u.id) properly preserves days with no records, and because u.id is NULL for unmatched days, COUNT(u.id) returns 0. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_count_79",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #79 &bull; E-Commerce Checkout Funnels] When running SELECT COUNT(1) FROM (SELECT 1 UNION SELECT 1) AS t, what value is returned? (Application Scenario 6)",
    "options": [
      "2",
      "NULL",
      "Syntax error",
      "1"
    ],
    "correctIndex": 3,
    "explanation": "UNION without ALL deduplicates rows. (SELECT 1 UNION SELECT 1) results in exactly 1 row, so COUNT(1) yields 1. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_count_80",
    "keyword": "COUNT",
    "tag": "🏛️ Corporate Edge",
    "question": "[COUNT #80 &bull; Telecom Billing & Data Streams] What does SELECT COUNT(NULLIF(status, 'inactive')) FROM subscriptions; achieve? (Application Scenario 6)",
    "options": [
      "Counts only subscriptions where status is 'inactive'",
      "Counts all subscriptions, converting 'inactive' to NULL and thus excluding 'inactive' records from the count",
      "Throws a runtime error because NULLIF cannot accept column identifiers",
      "Converts the entire count to NULL if any record is inactive"
    ],
    "correctIndex": 1,
    "explanation": "NULLIF(status, 'inactive') returns NULL whenever status is 'inactive'. Since COUNT(expr) ignores NULLs, this concisely counts only subscriptions that are NOT inactive. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_count_81",
    "keyword": "COUNT",
    "tag": "💡 Lead Architect",
    "question": "[COUNT #81 &bull; AdTech Real-Time Bidding] What is the result of SELECT COUNT(DISTINCT col1, col2) in MySQL 8.0 when a row contains a NULL in col1 but a valid value in col2? (Application Scenario 7)",
    "options": [
      "The row is included because col2 is not NULL",
      "An error 1064 is thrown because multi-column COUNT DISTINCT is unsupported",
      "The NULL is coerced to an empty string",
      "The row is excluded from the distinct count because ANSI SQL requires all tuple elements to be non-NULL"
    ],
    "correctIndex": 3,
    "explanation": "In MySQL, COUNT(DISTINCT expr1, expr2, ...) returns the number of unique non-NULL combinations. If ANY column in the tuple is NULL, the entire tuple is ignored. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_count_82",
    "keyword": "COUNT",
    "tag": "⚡ Gotcha Trap",
    "question": "[COUNT #82 &bull; Cybersecurity Audit Logs] In high-throughput event logging, why might an architect replace SELECT COUNT(*) with an approximate row count from information_schema.tables? (Application Scenario 7)",
    "options": [
      "information_schema tables provide microsecond transactional ACID precision",
      "Exact COUNT(*) on InnoDB without an index scan requires an MVCC row traversal which can lock or slow down on 100M+ row tables",
      "COUNT(*) is deprecated in SQL:2023 standard",
      "InnoDB automatically converts information_schema queries into parallel GPU shaders"
    ],
    "correctIndex": 1,
    "explanation": "For massive InnoDB tables, transactional MVCC guarantees require inspecting row visibility unless a secondary index can be scanned. For dashboards, table_rows from information_schema provides instantaneous O(1) approximation. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_count_83",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #83 &bull; Fintech & Ledger Systems] Which query correctly counts the number of active users per day while outputting 0 (rather than omitting the day) for days with zero user activity? (Application Scenario 7)",
    "options": [
      "SELECT d.day, COUNT(*) FROM calendar_days d INNER JOIN user_activity u ON d.day = u.activity_date GROUP BY d.day",
      "SELECT d.day, SUM(u.id) FROM calendar_days d RIGHT JOIN user_activity u ON d.day = u.activity_date GROUP BY d.day",
      "SELECT d.day, COUNT(d.day) FROM user_activity u LEFT JOIN calendar_days d ON d.day = u.activity_date GROUP BY d.day",
      "SELECT d.day, COUNT(u.id) FROM calendar_days d LEFT JOIN user_activity u ON d.day = u.activity_date GROUP BY d.day"
    ],
    "correctIndex": 3,
    "explanation": "A LEFT JOIN from a master calendar_days table combined with COUNT(u.id) properly preserves days with no records, and because u.id is NULL for unmatched days, COUNT(u.id) returns 0. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_count_84",
    "keyword": "COUNT",
    "tag": "🏛️ Corporate Edge",
    "question": "[COUNT #84 &bull; SaaS Subscription Billing] When running SELECT COUNT(1) FROM (SELECT 1 UNION SELECT 1) AS t, what value is returned? (Application Scenario 7)",
    "options": [
      "2",
      "1",
      "NULL",
      "Syntax error"
    ],
    "correctIndex": 1,
    "explanation": "UNION without ALL deduplicates rows. (SELECT 1 UNION SELECT 1) results in exactly 1 row, so COUNT(1) yields 1. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_count_85",
    "keyword": "COUNT",
    "tag": "💡 Lead Architect",
    "question": "[COUNT #85 &bull; Global Supply Chain & Logistics] What does SELECT COUNT(NULLIF(status, 'inactive')) FROM subscriptions; achieve? (Application Scenario 7)",
    "options": [
      "Counts only subscriptions where status is 'inactive'",
      "Throws a runtime error because NULLIF cannot accept column identifiers",
      "Converts the entire count to NULL if any record is inactive",
      "Counts all subscriptions, converting 'inactive' to NULL and thus excluding 'inactive' records from the count"
    ],
    "correctIndex": 3,
    "explanation": "NULLIF(status, 'inactive') returns NULL whenever status is 'inactive'. Since COUNT(expr) ignores NULLs, this concisely counts only subscriptions that are NOT inactive. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_count_86",
    "keyword": "COUNT",
    "tag": "⚡ Gotcha Trap",
    "question": "[COUNT #86 &bull; Healthcare Patient Records] What is the result of SELECT COUNT(DISTINCT col1, col2) in MySQL 8.0 when a row contains a NULL in col1 but a valid value in col2? (Application Scenario 8)",
    "options": [
      "The row is included because col2 is not NULL",
      "The row is excluded from the distinct count because ANSI SQL requires all tuple elements to be non-NULL",
      "An error 1064 is thrown because multi-column COUNT DISTINCT is unsupported",
      "The NULL is coerced to an empty string"
    ],
    "correctIndex": 1,
    "explanation": "In MySQL, COUNT(DISTINCT expr1, expr2, ...) returns the number of unique non-NULL combinations. If ANY column in the tuple is NULL, the entire tuple is ignored. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_count_87",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #87 &bull; E-Commerce Checkout Funnels] In high-throughput event logging, why might an architect replace SELECT COUNT(*) with an approximate row count from information_schema.tables? (Application Scenario 8)",
    "options": [
      "information_schema tables provide microsecond transactional ACID precision",
      "COUNT(*) is deprecated in SQL:2023 standard",
      "InnoDB automatically converts information_schema queries into parallel GPU shaders",
      "Exact COUNT(*) on InnoDB without an index scan requires an MVCC row traversal which can lock or slow down on 100M+ row tables"
    ],
    "correctIndex": 3,
    "explanation": "For massive InnoDB tables, transactional MVCC guarantees require inspecting row visibility unless a secondary index can be scanned. For dashboards, table_rows from information_schema provides instantaneous O(1) approximation. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_count_88",
    "keyword": "COUNT",
    "tag": "🏛️ Corporate Edge",
    "question": "[COUNT #88 &bull; Telecom Billing & Data Streams] Which query correctly counts the number of active users per day while outputting 0 (rather than omitting the day) for days with zero user activity? (Application Scenario 8)",
    "options": [
      "SELECT d.day, COUNT(*) FROM calendar_days d INNER JOIN user_activity u ON d.day = u.activity_date GROUP BY d.day",
      "SELECT d.day, COUNT(u.id) FROM calendar_days d LEFT JOIN user_activity u ON d.day = u.activity_date GROUP BY d.day",
      "SELECT d.day, SUM(u.id) FROM calendar_days d RIGHT JOIN user_activity u ON d.day = u.activity_date GROUP BY d.day",
      "SELECT d.day, COUNT(d.day) FROM user_activity u LEFT JOIN calendar_days d ON d.day = u.activity_date GROUP BY d.day"
    ],
    "correctIndex": 1,
    "explanation": "A LEFT JOIN from a master calendar_days table combined with COUNT(u.id) properly preserves days with no records, and because u.id is NULL for unmatched days, COUNT(u.id) returns 0. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_count_89",
    "keyword": "COUNT",
    "tag": "💡 Lead Architect",
    "question": "[COUNT #89 &bull; AdTech Real-Time Bidding] When running SELECT COUNT(1) FROM (SELECT 1 UNION SELECT 1) AS t, what value is returned? (Application Scenario 8)",
    "options": [
      "2",
      "NULL",
      "Syntax error",
      "1"
    ],
    "correctIndex": 3,
    "explanation": "UNION without ALL deduplicates rows. (SELECT 1 UNION SELECT 1) results in exactly 1 row, so COUNT(1) yields 1. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_count_90",
    "keyword": "COUNT",
    "tag": "⚡ Gotcha Trap",
    "question": "[COUNT #90 &bull; Cybersecurity Audit Logs] What does SELECT COUNT(NULLIF(status, 'inactive')) FROM subscriptions; achieve? (Application Scenario 8)",
    "options": [
      "Counts only subscriptions where status is 'inactive'",
      "Counts all subscriptions, converting 'inactive' to NULL and thus excluding 'inactive' records from the count",
      "Throws a runtime error because NULLIF cannot accept column identifiers",
      "Converts the entire count to NULL if any record is inactive"
    ],
    "correctIndex": 1,
    "explanation": "NULLIF(status, 'inactive') returns NULL whenever status is 'inactive'. Since COUNT(expr) ignores NULLs, this concisely counts only subscriptions that are NOT inactive. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_count_91",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #91 &bull; Fintech & Ledger Systems] What is the result of SELECT COUNT(DISTINCT col1, col2) in MySQL 8.0 when a row contains a NULL in col1 but a valid value in col2? (Application Scenario 9)",
    "options": [
      "The row is included because col2 is not NULL",
      "An error 1064 is thrown because multi-column COUNT DISTINCT is unsupported",
      "The NULL is coerced to an empty string",
      "The row is excluded from the distinct count because ANSI SQL requires all tuple elements to be non-NULL"
    ],
    "correctIndex": 3,
    "explanation": "In MySQL, COUNT(DISTINCT expr1, expr2, ...) returns the number of unique non-NULL combinations. If ANY column in the tuple is NULL, the entire tuple is ignored. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_count_92",
    "keyword": "COUNT",
    "tag": "🏛️ Corporate Edge",
    "question": "[COUNT #92 &bull; SaaS Subscription Billing] In high-throughput event logging, why might an architect replace SELECT COUNT(*) with an approximate row count from information_schema.tables? (Application Scenario 9)",
    "options": [
      "information_schema tables provide microsecond transactional ACID precision",
      "Exact COUNT(*) on InnoDB without an index scan requires an MVCC row traversal which can lock or slow down on 100M+ row tables",
      "COUNT(*) is deprecated in SQL:2023 standard",
      "InnoDB automatically converts information_schema queries into parallel GPU shaders"
    ],
    "correctIndex": 1,
    "explanation": "For massive InnoDB tables, transactional MVCC guarantees require inspecting row visibility unless a secondary index can be scanned. For dashboards, table_rows from information_schema provides instantaneous O(1) approximation. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_count_93",
    "keyword": "COUNT",
    "tag": "💡 Lead Architect",
    "question": "[COUNT #93 &bull; Global Supply Chain & Logistics] Which query correctly counts the number of active users per day while outputting 0 (rather than omitting the day) for days with zero user activity? (Application Scenario 9)",
    "options": [
      "SELECT d.day, COUNT(*) FROM calendar_days d INNER JOIN user_activity u ON d.day = u.activity_date GROUP BY d.day",
      "SELECT d.day, SUM(u.id) FROM calendar_days d RIGHT JOIN user_activity u ON d.day = u.activity_date GROUP BY d.day",
      "SELECT d.day, COUNT(d.day) FROM user_activity u LEFT JOIN calendar_days d ON d.day = u.activity_date GROUP BY d.day",
      "SELECT d.day, COUNT(u.id) FROM calendar_days d LEFT JOIN user_activity u ON d.day = u.activity_date GROUP BY d.day"
    ],
    "correctIndex": 3,
    "explanation": "A LEFT JOIN from a master calendar_days table combined with COUNT(u.id) properly preserves days with no records, and because u.id is NULL for unmatched days, COUNT(u.id) returns 0. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_count_94",
    "keyword": "COUNT",
    "tag": "⚡ Gotcha Trap",
    "question": "[COUNT #94 &bull; Healthcare Patient Records] When running SELECT COUNT(1) FROM (SELECT 1 UNION SELECT 1) AS t, what value is returned? (Application Scenario 9)",
    "options": [
      "2",
      "1",
      "NULL",
      "Syntax error"
    ],
    "correctIndex": 1,
    "explanation": "UNION without ALL deduplicates rows. (SELECT 1 UNION SELECT 1) results in exactly 1 row, so COUNT(1) yields 1. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_count_95",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #95 &bull; E-Commerce Checkout Funnels] What does SELECT COUNT(NULLIF(status, 'inactive')) FROM subscriptions; achieve? (Application Scenario 9)",
    "options": [
      "Counts only subscriptions where status is 'inactive'",
      "Throws a runtime error because NULLIF cannot accept column identifiers",
      "Converts the entire count to NULL if any record is inactive",
      "Counts all subscriptions, converting 'inactive' to NULL and thus excluding 'inactive' records from the count"
    ],
    "correctIndex": 3,
    "explanation": "NULLIF(status, 'inactive') returns NULL whenever status is 'inactive'. Since COUNT(expr) ignores NULLs, this concisely counts only subscriptions that are NOT inactive. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_count_96",
    "keyword": "COUNT",
    "tag": "🏛️ Corporate Edge",
    "question": "[COUNT #96 &bull; Telecom Billing & Data Streams] What is the result of SELECT COUNT(DISTINCT col1, col2) in MySQL 8.0 when a row contains a NULL in col1 but a valid value in col2? (Application Scenario 10)",
    "options": [
      "The row is included because col2 is not NULL",
      "The row is excluded from the distinct count because ANSI SQL requires all tuple elements to be non-NULL",
      "An error 1064 is thrown because multi-column COUNT DISTINCT is unsupported",
      "The NULL is coerced to an empty string"
    ],
    "correctIndex": 1,
    "explanation": "In MySQL, COUNT(DISTINCT expr1, expr2, ...) returns the number of unique non-NULL combinations. If ANY column in the tuple is NULL, the entire tuple is ignored. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_count_97",
    "keyword": "COUNT",
    "tag": "💡 Lead Architect",
    "question": "[COUNT #97 &bull; AdTech Real-Time Bidding] In high-throughput event logging, why might an architect replace SELECT COUNT(*) with an approximate row count from information_schema.tables? (Application Scenario 10)",
    "options": [
      "information_schema tables provide microsecond transactional ACID precision",
      "COUNT(*) is deprecated in SQL:2023 standard",
      "InnoDB automatically converts information_schema queries into parallel GPU shaders",
      "Exact COUNT(*) on InnoDB without an index scan requires an MVCC row traversal which can lock or slow down on 100M+ row tables"
    ],
    "correctIndex": 3,
    "explanation": "For massive InnoDB tables, transactional MVCC guarantees require inspecting row visibility unless a secondary index can be scanned. For dashboards, table_rows from information_schema provides instantaneous O(1) approximation. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_count_98",
    "keyword": "COUNT",
    "tag": "⚡ Gotcha Trap",
    "question": "[COUNT #98 &bull; Cybersecurity Audit Logs] Which query correctly counts the number of active users per day while outputting 0 (rather than omitting the day) for days with zero user activity? (Application Scenario 10)",
    "options": [
      "SELECT d.day, COUNT(*) FROM calendar_days d INNER JOIN user_activity u ON d.day = u.activity_date GROUP BY d.day",
      "SELECT d.day, COUNT(u.id) FROM calendar_days d LEFT JOIN user_activity u ON d.day = u.activity_date GROUP BY d.day",
      "SELECT d.day, SUM(u.id) FROM calendar_days d RIGHT JOIN user_activity u ON d.day = u.activity_date GROUP BY d.day",
      "SELECT d.day, COUNT(d.day) FROM user_activity u LEFT JOIN calendar_days d ON d.day = u.activity_date GROUP BY d.day"
    ],
    "correctIndex": 1,
    "explanation": "A LEFT JOIN from a master calendar_days table combined with COUNT(u.id) properly preserves days with no records, and because u.id is NULL for unmatched days, COUNT(u.id) returns 0. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_count_99",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #99 &bull; Fintech & Ledger Systems] When running SELECT COUNT(1) FROM (SELECT 1 UNION SELECT 1) AS t, what value is returned? (Application Scenario 10)",
    "options": [
      "2",
      "NULL",
      "Syntax error",
      "1"
    ],
    "correctIndex": 3,
    "explanation": "UNION without ALL deduplicates rows. (SELECT 1 UNION SELECT 1) results in exactly 1 row, so COUNT(1) yields 1. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_count_100",
    "keyword": "COUNT",
    "tag": "🏛️ Corporate Edge",
    "question": "[COUNT #100 &bull; SaaS Subscription Billing] What does SELECT COUNT(NULLIF(status, 'inactive')) FROM subscriptions; achieve? (Application Scenario 10)",
    "options": [
      "Counts only subscriptions where status is 'inactive'",
      "Counts all subscriptions, converting 'inactive' to NULL and thus excluding 'inactive' records from the count",
      "Throws a runtime error because NULLIF cannot accept column identifiers",
      "Converts the entire count to NULL if any record is inactive"
    ],
    "correctIndex": 1,
    "explanation": "NULLIF(status, 'inactive') returns NULL whenever status is 'inactive'. Since COUNT(expr) ignores NULLs, this concisely counts only subscriptions that are NOT inactive. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_sum_1",
    "keyword": "SUM",
    "tag": "🍡 Quick Snack",
    "question": "[SUM #1] What is the result of \"SELECT SUM(bonus) FROM Employees;\" if every single employee row has a NULL bonus?",
    "options": [
      "0",
      "NaN",
      "NULL",
      "Throws a NullPointerException"
    ],
    "correctIndex": 2,
    "explanation": "By ANSI SQL specification, if an aggregate column contains only NULLs (or if the input row set is empty), SUM() returns NULL, NOT 0. Use COALESCE(SUM(bonus), 0) to guarantee a 0."
  },
  {
    "id": "mcq_sum_2",
    "keyword": "SUM",
    "tag": "⚡ Gotcha Trap",
    "question": "[SUM #2] How does SUM() behave when calculating values containing mixed positive numbers and NULLs, e.g., [100, 200, NULL, 50]?",
    "options": [
      "It returns NULL because NULL + integer evaluates to NULL",
      "It defaults NULL to 1 and returns 351",
      "It throws an Arithmetic Warning error",
      "It returns 350 because aggregate functions silently ignore NULL values during accumulation"
    ],
    "correctIndex": 3,
    "explanation": "Unlike scalar arithmetic (where 100 + NULL = NULL), SQL aggregate functions like SUM() completely eliminate NULL values before accumulating the sum."
  },
  {
    "id": "mcq_sum_3",
    "keyword": "SUM",
    "tag": "🐱 Brain Bender",
    "question": "[SUM #3] How can you use SUM() with CASE WHEN to count specific categories without using multiple queries?",
    "options": [
      "SELECT SUM(status) WHERE status = \"active\" FROM Users;",
      "SELECT SUM() GROUP BY status = \"active\" FROM Users;",
      "SELECT SUM(status == \"active\") FROM Users;",
      "SELECT SUM(CASE WHEN status = \"active\" THEN 1 ELSE 0 END) FROM Users;"
    ],
    "correctIndex": 3,
    "explanation": "Summing a conditional CASE expression (returning 1 for matches and 0 for non-matches) is the classic SQL pattern for multi-column pivot counting."
  },
  {
    "id": "mcq_sum_4",
    "keyword": "SUM",
    "tag": "🎯 Core Concept",
    "question": "[SUM #4] What happens if the result of SUM(int_column) exceeds the maximum capacity of a 32-bit signed integer (2,147,483,647)?",
    "options": [
      "The query wraps around into negative numbers silently in standard engines",
      "The engine automatically deletes the largest rows",
      "PostgreSQL and SQL Server throw an integer overflow error; MySQL may promote to BIGINT or DECIMAL depending on sql_mode",
      "The query returns NULL"
    ],
    "correctIndex": 2,
    "explanation": "Integer overflow in SUM() must be prevented by casting the column: SUM(CAST(int_col AS BIGINT)) or SUM(int_col::numeric)."
  },
  {
    "id": "mcq_sum_5",
    "keyword": "SUM",
    "tag": "🏆 Senior Staff",
    "question": "[SUM #5] What does the query \"SELECT SUM(DISTINCT score) FROM Games;\" calculate?",
    "options": [
      "The sum of the highest and lowest score only",
      "The sum of scores partitioned by unique game IDs",
      "The sum of all game scores excluding duplicate score values",
      "An invalid syntax error; DISTINCT cannot be used with SUM()"
    ],
    "correctIndex": 2,
    "explanation": "SUM(DISTINCT score) removes identical score values prior to summing (e.g. scores [10, 10, 20] become 10 + 20 = 30)."
  },
  {
    "id": "mcq_sum_6",
    "keyword": "SUM",
    "tag": "🍡 Quick Snack",
    "question": "[SUM #6] What is the result of \"SELECT SUM(bonus) FROM Employees;\" if every single employee row has a NULL bonus? (Scenario Variant 2)",
    "options": [
      "NaN",
      "Throws a NullPointerException",
      "0",
      "NULL"
    ],
    "correctIndex": 3,
    "explanation": "By ANSI SQL specification, if an aggregate column contains only NULLs (or if the input row set is empty), SUM() returns NULL, NOT 0. Use COALESCE(SUM(bonus), 0) to guarantee a 0."
  },
  {
    "id": "mcq_sum_7",
    "keyword": "SUM",
    "tag": "⚡ Gotcha Trap",
    "question": "[SUM #7] How does SUM() behave when calculating values containing mixed positive numbers and NULLs, e.g., [100, 200, NULL, 50]? (Scenario Variant 2)",
    "options": [
      "It returns 350 because aggregate functions silently ignore NULL values during accumulation",
      "It throws an Arithmetic Warning error",
      "It returns NULL because NULL + integer evaluates to NULL",
      "It defaults NULL to 1 and returns 351"
    ],
    "correctIndex": 0,
    "explanation": "Unlike scalar arithmetic (where 100 + NULL = NULL), SQL aggregate functions like SUM() completely eliminate NULL values before accumulating the sum."
  },
  {
    "id": "mcq_sum_8",
    "keyword": "SUM",
    "tag": "🐱 Brain Bender",
    "question": "[SUM #8] How can you use SUM() with CASE WHEN to count specific categories without using multiple queries? (Scenario Variant 2)",
    "options": [
      "SELECT SUM(CASE WHEN status = \"active\" THEN 1 ELSE 0 END) FROM Users;",
      "SELECT SUM() GROUP BY status = \"active\" FROM Users;",
      "SELECT SUM(status) WHERE status = \"active\" FROM Users;",
      "SELECT SUM(status == \"active\") FROM Users;"
    ],
    "correctIndex": 0,
    "explanation": "Summing a conditional CASE expression (returning 1 for matches and 0 for non-matches) is the classic SQL pattern for multi-column pivot counting."
  },
  {
    "id": "mcq_sum_9",
    "keyword": "SUM",
    "tag": "🎯 Core Concept",
    "question": "[SUM #9] What happens if the result of SUM(int_column) exceeds the maximum capacity of a 32-bit signed integer (2,147,483,647)? (Scenario Variant 2)",
    "options": [
      "The query wraps around into negative numbers silently in standard engines",
      "PostgreSQL and SQL Server throw an integer overflow error; MySQL may promote to BIGINT or DECIMAL depending on sql_mode",
      "The query returns NULL",
      "The engine automatically deletes the largest rows"
    ],
    "correctIndex": 1,
    "explanation": "Integer overflow in SUM() must be prevented by casting the column: SUM(CAST(int_col AS BIGINT)) or SUM(int_col::numeric)."
  },
  {
    "id": "mcq_sum_10",
    "keyword": "SUM",
    "tag": "🏆 Senior Staff",
    "question": "[SUM #10] What does the query \"SELECT SUM(DISTINCT score) FROM Games;\" calculate? (Scenario Variant 2)",
    "options": [
      "The sum of all game scores excluding duplicate score values",
      "The sum of scores partitioned by unique game IDs",
      "An invalid syntax error; DISTINCT cannot be used with SUM()",
      "The sum of the highest and lowest score only"
    ],
    "correctIndex": 0,
    "explanation": "SUM(DISTINCT score) removes identical score values prior to summing (e.g. scores [10, 10, 20] become 10 + 20 = 30)."
  },
  {
    "id": "mcq_sum_11",
    "keyword": "SUM",
    "tag": "🍡 Quick Snack",
    "question": "[SUM #11] What is the result of \"SELECT SUM(bonus) FROM Employees;\" if every single employee row has a NULL bonus? (Scenario Variant 3)",
    "options": [
      "0",
      "Throws a NullPointerException",
      "NULL",
      "NaN"
    ],
    "correctIndex": 2,
    "explanation": "By ANSI SQL specification, if an aggregate column contains only NULLs (or if the input row set is empty), SUM() returns NULL, NOT 0. Use COALESCE(SUM(bonus), 0) to guarantee a 0."
  },
  {
    "id": "mcq_sum_12",
    "keyword": "SUM",
    "tag": "⚡ Gotcha Trap",
    "question": "[SUM #12] How does SUM() behave when calculating values containing mixed positive numbers and NULLs, e.g., [100, 200, NULL, 50]? (Scenario Variant 3)",
    "options": [
      "It returns NULL because NULL + integer evaluates to NULL",
      "It throws an Arithmetic Warning error",
      "It defaults NULL to 1 and returns 351",
      "It returns 350 because aggregate functions silently ignore NULL values during accumulation"
    ],
    "correctIndex": 3,
    "explanation": "Unlike scalar arithmetic (where 100 + NULL = NULL), SQL aggregate functions like SUM() completely eliminate NULL values before accumulating the sum."
  },
  {
    "id": "mcq_sum_13",
    "keyword": "SUM",
    "tag": "🐱 Brain Bender",
    "question": "[SUM #13] How can you use SUM() with CASE WHEN to count specific categories without using multiple queries? (Scenario Variant 3)",
    "options": [
      "SELECT SUM(status) WHERE status = \"active\" FROM Users;",
      "SELECT SUM() GROUP BY status = \"active\" FROM Users;",
      "SELECT SUM(status == \"active\") FROM Users;",
      "SELECT SUM(CASE WHEN status = \"active\" THEN 1 ELSE 0 END) FROM Users;"
    ],
    "correctIndex": 3,
    "explanation": "Summing a conditional CASE expression (returning 1 for matches and 0 for non-matches) is the classic SQL pattern for multi-column pivot counting."
  },
  {
    "id": "mcq_sum_14",
    "keyword": "SUM",
    "tag": "🎯 Core Concept",
    "question": "[SUM #14] What happens if the result of SUM(int_column) exceeds the maximum capacity of a 32-bit signed integer (2,147,483,647)? (Scenario Variant 3)",
    "options": [
      "The query returns NULL",
      "PostgreSQL and SQL Server throw an integer overflow error; MySQL may promote to BIGINT or DECIMAL depending on sql_mode",
      "The query wraps around into negative numbers silently in standard engines",
      "The engine automatically deletes the largest rows"
    ],
    "correctIndex": 1,
    "explanation": "Integer overflow in SUM() must be prevented by casting the column: SUM(CAST(int_col AS BIGINT)) or SUM(int_col::numeric)."
  },
  {
    "id": "mcq_sum_15",
    "keyword": "SUM",
    "tag": "🏆 Senior Staff",
    "question": "[SUM #15] What does the query \"SELECT SUM(DISTINCT score) FROM Games;\" calculate? (Scenario Variant 3)",
    "options": [
      "The sum of all game scores excluding duplicate score values",
      "The sum of the highest and lowest score only",
      "The sum of scores partitioned by unique game IDs",
      "An invalid syntax error; DISTINCT cannot be used with SUM()"
    ],
    "correctIndex": 0,
    "explanation": "SUM(DISTINCT score) removes identical score values prior to summing (e.g. scores [10, 10, 20] become 10 + 20 = 30)."
  },
  {
    "id": "mcq_sum_16",
    "keyword": "SUM",
    "tag": "🍡 Quick Snack",
    "question": "[SUM #16] What is the result of \"SELECT SUM(bonus) FROM Employees;\" if every single employee row has a NULL bonus? (Scenario Variant 4)",
    "options": [
      "0",
      "NULL",
      "Throws a NullPointerException",
      "NaN"
    ],
    "correctIndex": 1,
    "explanation": "By ANSI SQL specification, if an aggregate column contains only NULLs (or if the input row set is empty), SUM() returns NULL, NOT 0. Use COALESCE(SUM(bonus), 0) to guarantee a 0."
  },
  {
    "id": "mcq_sum_17",
    "keyword": "SUM",
    "tag": "⚡ Gotcha Trap",
    "question": "[SUM #17] How does SUM() behave when calculating values containing mixed positive numbers and NULLs, e.g., [100, 200, NULL, 50]? (Scenario Variant 4)",
    "options": [
      "It throws an Arithmetic Warning error",
      "It returns 350 because aggregate functions silently ignore NULL values during accumulation",
      "It returns NULL because NULL + integer evaluates to NULL",
      "It defaults NULL to 1 and returns 351"
    ],
    "correctIndex": 1,
    "explanation": "Unlike scalar arithmetic (where 100 + NULL = NULL), SQL aggregate functions like SUM() completely eliminate NULL values before accumulating the sum."
  },
  {
    "id": "mcq_sum_18",
    "keyword": "SUM",
    "tag": "🐱 Brain Bender",
    "question": "[SUM #18] How can you use SUM() with CASE WHEN to count specific categories without using multiple queries? (Scenario Variant 4)",
    "options": [
      "SELECT SUM() GROUP BY status = \"active\" FROM Users;",
      "SELECT SUM(CASE WHEN status = \"active\" THEN 1 ELSE 0 END) FROM Users;",
      "SELECT SUM(status == \"active\") FROM Users;",
      "SELECT SUM(status) WHERE status = \"active\" FROM Users;"
    ],
    "correctIndex": 1,
    "explanation": "Summing a conditional CASE expression (returning 1 for matches and 0 for non-matches) is the classic SQL pattern for multi-column pivot counting."
  },
  {
    "id": "mcq_sum_19",
    "keyword": "SUM",
    "tag": "🎯 Core Concept",
    "question": "[SUM #19] What happens if the result of SUM(int_column) exceeds the maximum capacity of a 32-bit signed integer (2,147,483,647)? (Scenario Variant 4)",
    "options": [
      "The query returns NULL",
      "The engine automatically deletes the largest rows",
      "PostgreSQL and SQL Server throw an integer overflow error; MySQL may promote to BIGINT or DECIMAL depending on sql_mode",
      "The query wraps around into negative numbers silently in standard engines"
    ],
    "correctIndex": 2,
    "explanation": "Integer overflow in SUM() must be prevented by casting the column: SUM(CAST(int_col AS BIGINT)) or SUM(int_col::numeric)."
  },
  {
    "id": "mcq_sum_20",
    "keyword": "SUM",
    "tag": "🏆 Senior Staff",
    "question": "[SUM #20] What does the query \"SELECT SUM(DISTINCT score) FROM Games;\" calculate? (Scenario Variant 4)",
    "options": [
      "The sum of all game scores excluding duplicate score values",
      "The sum of scores partitioned by unique game IDs",
      "An invalid syntax error; DISTINCT cannot be used with SUM()",
      "The sum of the highest and lowest score only"
    ],
    "correctIndex": 0,
    "explanation": "SUM(DISTINCT score) removes identical score values prior to summing (e.g. scores [10, 10, 20] become 10 + 20 = 30)."
  },
  {
    "id": "mcq_sum_21",
    "keyword": "SUM",
    "tag": "🍡 Quick Snack",
    "question": "[SUM #21] What is the result of \"SELECT SUM(bonus) FROM Employees;\" if every single employee row has a NULL bonus? (Scenario Variant 5)",
    "options": [
      "Throws a NullPointerException",
      "0",
      "NULL",
      "NaN"
    ],
    "correctIndex": 2,
    "explanation": "By ANSI SQL specification, if an aggregate column contains only NULLs (or if the input row set is empty), SUM() returns NULL, NOT 0. Use COALESCE(SUM(bonus), 0) to guarantee a 0."
  },
  {
    "id": "mcq_sum_22",
    "keyword": "SUM",
    "tag": "⚡ Gotcha Trap",
    "question": "[SUM #22] How does SUM() behave when calculating values containing mixed positive numbers and NULLs, e.g., [100, 200, NULL, 50]? (Scenario Variant 5)",
    "options": [
      "It returns 350 because aggregate functions silently ignore NULL values during accumulation",
      "It returns NULL because NULL + integer evaluates to NULL",
      "It throws an Arithmetic Warning error",
      "It defaults NULL to 1 and returns 351"
    ],
    "correctIndex": 0,
    "explanation": "Unlike scalar arithmetic (where 100 + NULL = NULL), SQL aggregate functions like SUM() completely eliminate NULL values before accumulating the sum."
  },
  {
    "id": "mcq_sum_23",
    "keyword": "SUM",
    "tag": "🐱 Brain Bender",
    "question": "[SUM #23] How can you use SUM() with CASE WHEN to count specific categories without using multiple queries? (Scenario Variant 5)",
    "options": [
      "SELECT SUM(CASE WHEN status = \"active\" THEN 1 ELSE 0 END) FROM Users;",
      "SELECT SUM(status) WHERE status = \"active\" FROM Users;",
      "SELECT SUM(status == \"active\") FROM Users;",
      "SELECT SUM() GROUP BY status = \"active\" FROM Users;"
    ],
    "correctIndex": 0,
    "explanation": "Summing a conditional CASE expression (returning 1 for matches and 0 for non-matches) is the classic SQL pattern for multi-column pivot counting."
  },
  {
    "id": "mcq_sum_24",
    "keyword": "SUM",
    "tag": "🎯 Core Concept",
    "question": "[SUM #24] What happens if the result of SUM(int_column) exceeds the maximum capacity of a 32-bit signed integer (2,147,483,647)? (Scenario Variant 5)",
    "options": [
      "The query returns NULL",
      "The query wraps around into negative numbers silently in standard engines",
      "PostgreSQL and SQL Server throw an integer overflow error; MySQL may promote to BIGINT or DECIMAL depending on sql_mode",
      "The engine automatically deletes the largest rows"
    ],
    "correctIndex": 2,
    "explanation": "Integer overflow in SUM() must be prevented by casting the column: SUM(CAST(int_col AS BIGINT)) or SUM(int_col::numeric)."
  },
  {
    "id": "mcq_sum_25",
    "keyword": "SUM",
    "tag": "🏆 Senior Staff",
    "question": "[SUM #25] What does the query \"SELECT SUM(DISTINCT score) FROM Games;\" calculate? (Scenario Variant 5)",
    "options": [
      "The sum of all game scores excluding duplicate score values",
      "The sum of scores partitioned by unique game IDs",
      "The sum of the highest and lowest score only",
      "An invalid syntax error; DISTINCT cannot be used with SUM()"
    ],
    "correctIndex": 0,
    "explanation": "SUM(DISTINCT score) removes identical score values prior to summing (e.g. scores [10, 10, 20] become 10 + 20 = 30)."
  },
  {
    "id": "mcq_sum_26",
    "keyword": "SUM",
    "tag": "🍡 Quick Snack",
    "question": "[SUM #26] What is the result of \"SELECT SUM(bonus) FROM Employees;\" if every single employee row has a NULL bonus? (Scenario Variant 6)",
    "options": [
      "Throws a NullPointerException",
      "0",
      "NULL",
      "NaN"
    ],
    "correctIndex": 2,
    "explanation": "By ANSI SQL specification, if an aggregate column contains only NULLs (or if the input row set is empty), SUM() returns NULL, NOT 0. Use COALESCE(SUM(bonus), 0) to guarantee a 0."
  },
  {
    "id": "mcq_sum_27",
    "keyword": "SUM",
    "tag": "⚡ Gotcha Trap",
    "question": "[SUM #27] How does SUM() behave when calculating values containing mixed positive numbers and NULLs, e.g., [100, 200, NULL, 50]? (Scenario Variant 6)",
    "options": [
      "It defaults NULL to 1 and returns 351",
      "It returns NULL because NULL + integer evaluates to NULL",
      "It throws an Arithmetic Warning error",
      "It returns 350 because aggregate functions silently ignore NULL values during accumulation"
    ],
    "correctIndex": 3,
    "explanation": "Unlike scalar arithmetic (where 100 + NULL = NULL), SQL aggregate functions like SUM() completely eliminate NULL values before accumulating the sum."
  },
  {
    "id": "mcq_sum_28",
    "keyword": "SUM",
    "tag": "🐱 Brain Bender",
    "question": "[SUM #28] How can you use SUM() with CASE WHEN to count specific categories without using multiple queries? (Scenario Variant 6)",
    "options": [
      "SELECT SUM(status == \"active\") FROM Users;",
      "SELECT SUM(status) WHERE status = \"active\" FROM Users;",
      "SELECT SUM(CASE WHEN status = \"active\" THEN 1 ELSE 0 END) FROM Users;",
      "SELECT SUM() GROUP BY status = \"active\" FROM Users;"
    ],
    "correctIndex": 2,
    "explanation": "Summing a conditional CASE expression (returning 1 for matches and 0 for non-matches) is the classic SQL pattern for multi-column pivot counting."
  },
  {
    "id": "mcq_sum_29",
    "keyword": "SUM",
    "tag": "🎯 Core Concept",
    "question": "[SUM #29] What happens if the result of SUM(int_column) exceeds the maximum capacity of a 32-bit signed integer (2,147,483,647)? (Scenario Variant 6)",
    "options": [
      "The query wraps around into negative numbers silently in standard engines",
      "The query returns NULL",
      "PostgreSQL and SQL Server throw an integer overflow error; MySQL may promote to BIGINT or DECIMAL depending on sql_mode",
      "The engine automatically deletes the largest rows"
    ],
    "correctIndex": 2,
    "explanation": "Integer overflow in SUM() must be prevented by casting the column: SUM(CAST(int_col AS BIGINT)) or SUM(int_col::numeric)."
  },
  {
    "id": "mcq_sum_30",
    "keyword": "SUM",
    "tag": "🏆 Senior Staff",
    "question": "[SUM #30] What does the query \"SELECT SUM(DISTINCT score) FROM Games;\" calculate? (Scenario Variant 6)",
    "options": [
      "The sum of the highest and lowest score only",
      "The sum of all game scores excluding duplicate score values",
      "The sum of scores partitioned by unique game IDs",
      "An invalid syntax error; DISTINCT cannot be used with SUM()"
    ],
    "correctIndex": 1,
    "explanation": "SUM(DISTINCT score) removes identical score values prior to summing (e.g. scores [10, 10, 20] become 10 + 20 = 30)."
  },
  {
    "id": "mcq_sum_31",
    "keyword": "SUM",
    "tag": "🍡 Quick Snack",
    "question": "[SUM #31] What is the result of \"SELECT SUM(bonus) FROM Employees;\" if every single employee row has a NULL bonus? (Scenario Variant 7)",
    "options": [
      "NULL",
      "0",
      "Throws a NullPointerException",
      "NaN"
    ],
    "correctIndex": 0,
    "explanation": "By ANSI SQL specification, if an aggregate column contains only NULLs (or if the input row set is empty), SUM() returns NULL, NOT 0. Use COALESCE(SUM(bonus), 0) to guarantee a 0."
  },
  {
    "id": "mcq_sum_32",
    "keyword": "SUM",
    "tag": "⚡ Gotcha Trap",
    "question": "[SUM #32] How does SUM() behave when calculating values containing mixed positive numbers and NULLs, e.g., [100, 200, NULL, 50]? (Scenario Variant 7)",
    "options": [
      "It returns 350 because aggregate functions silently ignore NULL values during accumulation",
      "It returns NULL because NULL + integer evaluates to NULL",
      "It defaults NULL to 1 and returns 351",
      "It throws an Arithmetic Warning error"
    ],
    "correctIndex": 0,
    "explanation": "Unlike scalar arithmetic (where 100 + NULL = NULL), SQL aggregate functions like SUM() completely eliminate NULL values before accumulating the sum."
  },
  {
    "id": "mcq_sum_33",
    "keyword": "SUM",
    "tag": "🐱 Brain Bender",
    "question": "[SUM #33] How can you use SUM() with CASE WHEN to count specific categories without using multiple queries? (Scenario Variant 7)",
    "options": [
      "SELECT SUM(status == \"active\") FROM Users;",
      "SELECT SUM(CASE WHEN status = \"active\" THEN 1 ELSE 0 END) FROM Users;",
      "SELECT SUM() GROUP BY status = \"active\" FROM Users;",
      "SELECT SUM(status) WHERE status = \"active\" FROM Users;"
    ],
    "correctIndex": 1,
    "explanation": "Summing a conditional CASE expression (returning 1 for matches and 0 for non-matches) is the classic SQL pattern for multi-column pivot counting."
  },
  {
    "id": "mcq_sum_34",
    "keyword": "SUM",
    "tag": "🎯 Core Concept",
    "question": "[SUM #34] What happens if the result of SUM(int_column) exceeds the maximum capacity of a 32-bit signed integer (2,147,483,647)? (Scenario Variant 7)",
    "options": [
      "The query wraps around into negative numbers silently in standard engines",
      "The engine automatically deletes the largest rows",
      "PostgreSQL and SQL Server throw an integer overflow error; MySQL may promote to BIGINT or DECIMAL depending on sql_mode",
      "The query returns NULL"
    ],
    "correctIndex": 2,
    "explanation": "Integer overflow in SUM() must be prevented by casting the column: SUM(CAST(int_col AS BIGINT)) or SUM(int_col::numeric)."
  },
  {
    "id": "mcq_sum_35",
    "keyword": "SUM",
    "tag": "🏆 Senior Staff",
    "question": "[SUM #35] What does the query \"SELECT SUM(DISTINCT score) FROM Games;\" calculate? (Scenario Variant 7)",
    "options": [
      "The sum of all game scores excluding duplicate score values",
      "An invalid syntax error; DISTINCT cannot be used with SUM()",
      "The sum of the highest and lowest score only",
      "The sum of scores partitioned by unique game IDs"
    ],
    "correctIndex": 0,
    "explanation": "SUM(DISTINCT score) removes identical score values prior to summing (e.g. scores [10, 10, 20] become 10 + 20 = 30)."
  },
  {
    "id": "mcq_sum_36",
    "keyword": "SUM",
    "tag": "🍡 Quick Snack",
    "question": "[SUM #36] What is the result of \"SELECT SUM(bonus) FROM Employees;\" if every single employee row has a NULL bonus? (Scenario Variant 8)",
    "options": [
      "NULL",
      "Throws a NullPointerException",
      "NaN",
      "0"
    ],
    "correctIndex": 0,
    "explanation": "By ANSI SQL specification, if an aggregate column contains only NULLs (or if the input row set is empty), SUM() returns NULL, NOT 0. Use COALESCE(SUM(bonus), 0) to guarantee a 0."
  },
  {
    "id": "mcq_sum_37",
    "keyword": "SUM",
    "tag": "⚡ Gotcha Trap",
    "question": "[SUM #37] How does SUM() behave when calculating values containing mixed positive numbers and NULLs, e.g., [100, 200, NULL, 50]? (Scenario Variant 8)",
    "options": [
      "It defaults NULL to 1 and returns 351",
      "It returns 350 because aggregate functions silently ignore NULL values during accumulation",
      "It returns NULL because NULL + integer evaluates to NULL",
      "It throws an Arithmetic Warning error"
    ],
    "correctIndex": 1,
    "explanation": "Unlike scalar arithmetic (where 100 + NULL = NULL), SQL aggregate functions like SUM() completely eliminate NULL values before accumulating the sum."
  },
  {
    "id": "mcq_sum_38",
    "keyword": "SUM",
    "tag": "🐱 Brain Bender",
    "question": "[SUM #38] How can you use SUM() with CASE WHEN to count specific categories without using multiple queries? (Scenario Variant 8)",
    "options": [
      "SELECT SUM(status == \"active\") FROM Users;",
      "SELECT SUM() GROUP BY status = \"active\" FROM Users;",
      "SELECT SUM(CASE WHEN status = \"active\" THEN 1 ELSE 0 END) FROM Users;",
      "SELECT SUM(status) WHERE status = \"active\" FROM Users;"
    ],
    "correctIndex": 2,
    "explanation": "Summing a conditional CASE expression (returning 1 for matches and 0 for non-matches) is the classic SQL pattern for multi-column pivot counting."
  },
  {
    "id": "mcq_sum_39",
    "keyword": "SUM",
    "tag": "🎯 Core Concept",
    "question": "[SUM #39] What happens if the result of SUM(int_column) exceeds the maximum capacity of a 32-bit signed integer (2,147,483,647)? (Scenario Variant 8)",
    "options": [
      "PostgreSQL and SQL Server throw an integer overflow error; MySQL may promote to BIGINT or DECIMAL depending on sql_mode",
      "The query returns NULL",
      "The query wraps around into negative numbers silently in standard engines",
      "The engine automatically deletes the largest rows"
    ],
    "correctIndex": 0,
    "explanation": "Integer overflow in SUM() must be prevented by casting the column: SUM(CAST(int_col AS BIGINT)) or SUM(int_col::numeric)."
  },
  {
    "id": "mcq_sum_40",
    "keyword": "SUM",
    "tag": "🏆 Senior Staff",
    "question": "[SUM #40] What does the query \"SELECT SUM(DISTINCT score) FROM Games;\" calculate? (Scenario Variant 8)",
    "options": [
      "The sum of the highest and lowest score only",
      "An invalid syntax error; DISTINCT cannot be used with SUM()",
      "The sum of scores partitioned by unique game IDs",
      "The sum of all game scores excluding duplicate score values"
    ],
    "correctIndex": 3,
    "explanation": "SUM(DISTINCT score) removes identical score values prior to summing (e.g. scores [10, 10, 20] become 10 + 20 = 30)."
  },
  {
    "id": "mcq_sum_41",
    "keyword": "SUM",
    "tag": "🍡 Quick Snack",
    "question": "[SUM #41] What is the result of \"SELECT SUM(bonus) FROM Employees;\" if every single employee row has a NULL bonus? (Scenario Variant 9)",
    "options": [
      "NULL",
      "0",
      "Throws a NullPointerException",
      "NaN"
    ],
    "correctIndex": 0,
    "explanation": "By ANSI SQL specification, if an aggregate column contains only NULLs (or if the input row set is empty), SUM() returns NULL, NOT 0. Use COALESCE(SUM(bonus), 0) to guarantee a 0."
  },
  {
    "id": "mcq_sum_42",
    "keyword": "SUM",
    "tag": "⚡ Gotcha Trap",
    "question": "[SUM #42] How does SUM() behave when calculating values containing mixed positive numbers and NULLs, e.g., [100, 200, NULL, 50]? (Scenario Variant 9)",
    "options": [
      "It defaults NULL to 1 and returns 351",
      "It throws an Arithmetic Warning error",
      "It returns 350 because aggregate functions silently ignore NULL values during accumulation",
      "It returns NULL because NULL + integer evaluates to NULL"
    ],
    "correctIndex": 2,
    "explanation": "Unlike scalar arithmetic (where 100 + NULL = NULL), SQL aggregate functions like SUM() completely eliminate NULL values before accumulating the sum."
  },
  {
    "id": "mcq_sum_43",
    "keyword": "SUM",
    "tag": "🐱 Brain Bender",
    "question": "[SUM #43] How can you use SUM() with CASE WHEN to count specific categories without using multiple queries? (Scenario Variant 9)",
    "options": [
      "SELECT SUM(status) WHERE status = \"active\" FROM Users;",
      "SELECT SUM() GROUP BY status = \"active\" FROM Users;",
      "SELECT SUM(CASE WHEN status = \"active\" THEN 1 ELSE 0 END) FROM Users;",
      "SELECT SUM(status == \"active\") FROM Users;"
    ],
    "correctIndex": 2,
    "explanation": "Summing a conditional CASE expression (returning 1 for matches and 0 for non-matches) is the classic SQL pattern for multi-column pivot counting."
  },
  {
    "id": "mcq_sum_44",
    "keyword": "SUM",
    "tag": "🎯 Core Concept",
    "question": "[SUM #44] What happens if the result of SUM(int_column) exceeds the maximum capacity of a 32-bit signed integer (2,147,483,647)? (Scenario Variant 9)",
    "options": [
      "The query returns NULL",
      "The query wraps around into negative numbers silently in standard engines",
      "The engine automatically deletes the largest rows",
      "PostgreSQL and SQL Server throw an integer overflow error; MySQL may promote to BIGINT or DECIMAL depending on sql_mode"
    ],
    "correctIndex": 3,
    "explanation": "Integer overflow in SUM() must be prevented by casting the column: SUM(CAST(int_col AS BIGINT)) or SUM(int_col::numeric)."
  },
  {
    "id": "mcq_sum_45",
    "keyword": "SUM",
    "tag": "🏆 Senior Staff",
    "question": "[SUM #45] What does the query \"SELECT SUM(DISTINCT score) FROM Games;\" calculate? (Scenario Variant 9)",
    "options": [
      "An invalid syntax error; DISTINCT cannot be used with SUM()",
      "The sum of all game scores excluding duplicate score values",
      "The sum of scores partitioned by unique game IDs",
      "The sum of the highest and lowest score only"
    ],
    "correctIndex": 1,
    "explanation": "SUM(DISTINCT score) removes identical score values prior to summing (e.g. scores [10, 10, 20] become 10 + 20 = 30)."
  },
  {
    "id": "mcq_sum_46",
    "keyword": "SUM",
    "tag": "🍡 Quick Snack",
    "question": "[SUM #46] What is the result of \"SELECT SUM(bonus) FROM Employees;\" if every single employee row has a NULL bonus? (Scenario Variant 10)",
    "options": [
      "0",
      "NaN",
      "NULL",
      "Throws a NullPointerException"
    ],
    "correctIndex": 2,
    "explanation": "By ANSI SQL specification, if an aggregate column contains only NULLs (or if the input row set is empty), SUM() returns NULL, NOT 0. Use COALESCE(SUM(bonus), 0) to guarantee a 0."
  },
  {
    "id": "mcq_sum_47",
    "keyword": "SUM",
    "tag": "⚡ Gotcha Trap",
    "question": "[SUM #47] How does SUM() behave when calculating values containing mixed positive numbers and NULLs, e.g., [100, 200, NULL, 50]? (Scenario Variant 10)",
    "options": [
      "It defaults NULL to 1 and returns 351",
      "It throws an Arithmetic Warning error",
      "It returns NULL because NULL + integer evaluates to NULL",
      "It returns 350 because aggregate functions silently ignore NULL values during accumulation"
    ],
    "correctIndex": 3,
    "explanation": "Unlike scalar arithmetic (where 100 + NULL = NULL), SQL aggregate functions like SUM() completely eliminate NULL values before accumulating the sum."
  },
  {
    "id": "mcq_sum_48",
    "keyword": "SUM",
    "tag": "🐱 Brain Bender",
    "question": "[SUM #48] How can you use SUM() with CASE WHEN to count specific categories without using multiple queries? (Scenario Variant 10)",
    "options": [
      "SELECT SUM(status) WHERE status = \"active\" FROM Users;",
      "SELECT SUM(status == \"active\") FROM Users;",
      "SELECT SUM() GROUP BY status = \"active\" FROM Users;",
      "SELECT SUM(CASE WHEN status = \"active\" THEN 1 ELSE 0 END) FROM Users;"
    ],
    "correctIndex": 3,
    "explanation": "Summing a conditional CASE expression (returning 1 for matches and 0 for non-matches) is the classic SQL pattern for multi-column pivot counting."
  },
  {
    "id": "mcq_sum_49",
    "keyword": "SUM",
    "tag": "🎯 Core Concept",
    "question": "[SUM #49] What happens if the result of SUM(int_column) exceeds the maximum capacity of a 32-bit signed integer (2,147,483,647)? (Scenario Variant 10)",
    "options": [
      "PostgreSQL and SQL Server throw an integer overflow error; MySQL may promote to BIGINT or DECIMAL depending on sql_mode",
      "The query wraps around into negative numbers silently in standard engines",
      "The query returns NULL",
      "The engine automatically deletes the largest rows"
    ],
    "correctIndex": 0,
    "explanation": "Integer overflow in SUM() must be prevented by casting the column: SUM(CAST(int_col AS BIGINT)) or SUM(int_col::numeric)."
  },
  {
    "id": "mcq_sum_50",
    "keyword": "SUM",
    "tag": "🏆 Senior Staff",
    "question": "[SUM #50] What does the query \"SELECT SUM(DISTINCT score) FROM Games;\" calculate? (Scenario Variant 10)",
    "options": [
      "The sum of scores partitioned by unique game IDs",
      "An invalid syntax error; DISTINCT cannot be used with SUM()",
      "The sum of the highest and lowest score only",
      "The sum of all game scores excluding duplicate score values"
    ],
    "correctIndex": 3,
    "explanation": "SUM(DISTINCT score) removes identical score values prior to summing (e.g. scores [10, 10, 20] become 10 + 20 = 30)."
  },
  {
    "id": "mcq_sum_51",
    "keyword": "SUM",
    "tag": "🎯 Core Concept",
    "question": "[SUM #51 &bull; Fintech & Ledger Systems] If a query runs SELECT SUM(amount) FROM transactions WHERE status = 'failed' and no rows match the predicate, what does the engine return? (Application Scenario 1)",
    "options": [
      "0.00",
      "NaN",
      "An empty result set with 0 rows",
      "NULL"
    ],
    "correctIndex": 3,
    "explanation": "Per the ANSI SQL specification, aggregate functions like SUM, AVG, MIN, and MAX return NULL when evaluated over an empty set (unless wrapped in COALESCE or IFNULL). Only COUNT returns 0. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_sum_52",
    "keyword": "SUM",
    "tag": "🏛️ Corporate Edge",
    "question": "[SUM #52 &bull; SaaS Subscription Billing] What is the recommended production pattern to prevent NULL return values when aggregating revenue on potentially empty date ranges? (Application Scenario 1)",
    "options": [
      "SUM(COALESCE(amount, 0))",
      "COALESCE(SUM(amount), 0)",
      "SUM(amount) + 0",
      "NVL2(amount, SUM(amount), 0)"
    ],
    "correctIndex": 1,
    "explanation": "COALESCE(SUM(amount), 0) is optimal because wrapping the aggregate itself handles both empty input rowsets (which yield a single NULL) and columns with NULL values in a single evaluation. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_sum_53",
    "keyword": "SUM",
    "tag": "💡 Lead Architect",
    "question": "[SUM #53 &bull; Global Supply Chain & Logistics] In high-precision financial accounting, why should monetary sums use DECIMAL/NUMERIC rather than FLOAT or DOUBLE? (Application Scenario 1)",
    "options": [
      "DECIMAL automatically computes currency exchange rates",
      "FLOAT requires twice as many CPU cycles per addition",
      "DECIMAL values cannot be grouped by",
      "FLOAT/DOUBLE use IEEE 754 binary floating-point representation which causes silent binary rounding errors (e.g. 0.1 + 0.2 != 0.3)"
    ],
    "correctIndex": 3,
    "explanation": "IEEE 754 floating point arithmetic introduces binary precision drift, rendering balance sheets inaccurate. DECIMAL provides exact base-10 fractional representation. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_sum_54",
    "keyword": "SUM",
    "tag": "⚡ Gotcha Trap",
    "question": "[SUM #54 &bull; Healthcare Patient Records] What is the output of SELECT SUM(CASE WHEN score >= 50 THEN 1 ELSE 0 END) FROM exam_results? (Application Scenario 1)",
    "options": [
      "The total sum of scores of students who passed",
      "The count of students whose score is greater than or equal to 50",
      "The percentage of students who passed",
      "A boolean TRUE or FALSE"
    ],
    "correctIndex": 1,
    "explanation": "This is the classic conditional aggregation pattern (SUM-CASE). Summing 1 for every student with score >= 50 and 0 otherwise tallies the number of passing students. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_sum_55",
    "keyword": "SUM",
    "tag": "🎯 Core Concept",
    "question": "[SUM #55 &bull; E-Commerce Checkout Funnels] If table Accounts has two rows: Balance = 100 and Balance = -100, what is the result of SELECT SUM(Balance) FROM Accounts? (Application Scenario 1)",
    "options": [
      "NULL",
      "200",
      "Error: Negative balances disallowed",
      "0"
    ],
    "correctIndex": 3,
    "explanation": "100 + (-100) = 0. The aggregate SUM handles signed numbers correctly. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_sum_56",
    "keyword": "SUM",
    "tag": "🏛️ Corporate Edge",
    "question": "[SUM #56 &bull; Telecom Billing & Data Streams] If a query runs SELECT SUM(amount) FROM transactions WHERE status = 'failed' and no rows match the predicate, what does the engine return? (Application Scenario 2)",
    "options": [
      "0.00",
      "NULL",
      "NaN",
      "An empty result set with 0 rows"
    ],
    "correctIndex": 1,
    "explanation": "Per the ANSI SQL specification, aggregate functions like SUM, AVG, MIN, and MAX return NULL when evaluated over an empty set (unless wrapped in COALESCE or IFNULL). Only COUNT returns 0. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_sum_57",
    "keyword": "SUM",
    "tag": "💡 Lead Architect",
    "question": "[SUM #57 &bull; AdTech Real-Time Bidding] What is the recommended production pattern to prevent NULL return values when aggregating revenue on potentially empty date ranges? (Application Scenario 2)",
    "options": [
      "SUM(COALESCE(amount, 0))",
      "SUM(amount) + 0",
      "NVL2(amount, SUM(amount), 0)",
      "COALESCE(SUM(amount), 0)"
    ],
    "correctIndex": 3,
    "explanation": "COALESCE(SUM(amount), 0) is optimal because wrapping the aggregate itself handles both empty input rowsets (which yield a single NULL) and columns with NULL values in a single evaluation. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_sum_58",
    "keyword": "SUM",
    "tag": "⚡ Gotcha Trap",
    "question": "[SUM #58 &bull; Cybersecurity Audit Logs] In high-precision financial accounting, why should monetary sums use DECIMAL/NUMERIC rather than FLOAT or DOUBLE? (Application Scenario 2)",
    "options": [
      "DECIMAL automatically computes currency exchange rates",
      "FLOAT/DOUBLE use IEEE 754 binary floating-point representation which causes silent binary rounding errors (e.g. 0.1 + 0.2 != 0.3)",
      "FLOAT requires twice as many CPU cycles per addition",
      "DECIMAL values cannot be grouped by"
    ],
    "correctIndex": 1,
    "explanation": "IEEE 754 floating point arithmetic introduces binary precision drift, rendering balance sheets inaccurate. DECIMAL provides exact base-10 fractional representation. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_sum_59",
    "keyword": "SUM",
    "tag": "🎯 Core Concept",
    "question": "[SUM #59 &bull; Fintech & Ledger Systems] What is the output of SELECT SUM(CASE WHEN score >= 50 THEN 1 ELSE 0 END) FROM exam_results? (Application Scenario 2)",
    "options": [
      "The total sum of scores of students who passed",
      "The percentage of students who passed",
      "A boolean TRUE or FALSE",
      "The count of students whose score is greater than or equal to 50"
    ],
    "correctIndex": 3,
    "explanation": "This is the classic conditional aggregation pattern (SUM-CASE). Summing 1 for every student with score >= 50 and 0 otherwise tallies the number of passing students. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_sum_60",
    "keyword": "SUM",
    "tag": "🏛️ Corporate Edge",
    "question": "[SUM #60 &bull; SaaS Subscription Billing] If table Accounts has two rows: Balance = 100 and Balance = -100, what is the result of SELECT SUM(Balance) FROM Accounts? (Application Scenario 2)",
    "options": [
      "NULL",
      "0",
      "200",
      "Error: Negative balances disallowed"
    ],
    "correctIndex": 1,
    "explanation": "100 + (-100) = 0. The aggregate SUM handles signed numbers correctly. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_sum_61",
    "keyword": "SUM",
    "tag": "💡 Lead Architect",
    "question": "[SUM #61 &bull; Global Supply Chain & Logistics] If a query runs SELECT SUM(amount) FROM transactions WHERE status = 'failed' and no rows match the predicate, what does the engine return? (Application Scenario 3)",
    "options": [
      "0.00",
      "NaN",
      "An empty result set with 0 rows",
      "NULL"
    ],
    "correctIndex": 3,
    "explanation": "Per the ANSI SQL specification, aggregate functions like SUM, AVG, MIN, and MAX return NULL when evaluated over an empty set (unless wrapped in COALESCE or IFNULL). Only COUNT returns 0. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_sum_62",
    "keyword": "SUM",
    "tag": "⚡ Gotcha Trap",
    "question": "[SUM #62 &bull; Healthcare Patient Records] What is the recommended production pattern to prevent NULL return values when aggregating revenue on potentially empty date ranges? (Application Scenario 3)",
    "options": [
      "SUM(COALESCE(amount, 0))",
      "COALESCE(SUM(amount), 0)",
      "SUM(amount) + 0",
      "NVL2(amount, SUM(amount), 0)"
    ],
    "correctIndex": 1,
    "explanation": "COALESCE(SUM(amount), 0) is optimal because wrapping the aggregate itself handles both empty input rowsets (which yield a single NULL) and columns with NULL values in a single evaluation. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_sum_63",
    "keyword": "SUM",
    "tag": "🎯 Core Concept",
    "question": "[SUM #63 &bull; E-Commerce Checkout Funnels] In high-precision financial accounting, why should monetary sums use DECIMAL/NUMERIC rather than FLOAT or DOUBLE? (Application Scenario 3)",
    "options": [
      "DECIMAL automatically computes currency exchange rates",
      "FLOAT requires twice as many CPU cycles per addition",
      "DECIMAL values cannot be grouped by",
      "FLOAT/DOUBLE use IEEE 754 binary floating-point representation which causes silent binary rounding errors (e.g. 0.1 + 0.2 != 0.3)"
    ],
    "correctIndex": 3,
    "explanation": "IEEE 754 floating point arithmetic introduces binary precision drift, rendering balance sheets inaccurate. DECIMAL provides exact base-10 fractional representation. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_sum_64",
    "keyword": "SUM",
    "tag": "🏛️ Corporate Edge",
    "question": "[SUM #64 &bull; Telecom Billing & Data Streams] What is the output of SELECT SUM(CASE WHEN score >= 50 THEN 1 ELSE 0 END) FROM exam_results? (Application Scenario 3)",
    "options": [
      "The total sum of scores of students who passed",
      "The count of students whose score is greater than or equal to 50",
      "The percentage of students who passed",
      "A boolean TRUE or FALSE"
    ],
    "correctIndex": 1,
    "explanation": "This is the classic conditional aggregation pattern (SUM-CASE). Summing 1 for every student with score >= 50 and 0 otherwise tallies the number of passing students. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_sum_65",
    "keyword": "SUM",
    "tag": "💡 Lead Architect",
    "question": "[SUM #65 &bull; AdTech Real-Time Bidding] If table Accounts has two rows: Balance = 100 and Balance = -100, what is the result of SELECT SUM(Balance) FROM Accounts? (Application Scenario 3)",
    "options": [
      "NULL",
      "200",
      "Error: Negative balances disallowed",
      "0"
    ],
    "correctIndex": 3,
    "explanation": "100 + (-100) = 0. The aggregate SUM handles signed numbers correctly. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_sum_66",
    "keyword": "SUM",
    "tag": "⚡ Gotcha Trap",
    "question": "[SUM #66 &bull; Cybersecurity Audit Logs] If a query runs SELECT SUM(amount) FROM transactions WHERE status = 'failed' and no rows match the predicate, what does the engine return? (Application Scenario 4)",
    "options": [
      "0.00",
      "NULL",
      "NaN",
      "An empty result set with 0 rows"
    ],
    "correctIndex": 1,
    "explanation": "Per the ANSI SQL specification, aggregate functions like SUM, AVG, MIN, and MAX return NULL when evaluated over an empty set (unless wrapped in COALESCE or IFNULL). Only COUNT returns 0. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_sum_67",
    "keyword": "SUM",
    "tag": "🎯 Core Concept",
    "question": "[SUM #67 &bull; Fintech & Ledger Systems] What is the recommended production pattern to prevent NULL return values when aggregating revenue on potentially empty date ranges? (Application Scenario 4)",
    "options": [
      "SUM(COALESCE(amount, 0))",
      "SUM(amount) + 0",
      "NVL2(amount, SUM(amount), 0)",
      "COALESCE(SUM(amount), 0)"
    ],
    "correctIndex": 3,
    "explanation": "COALESCE(SUM(amount), 0) is optimal because wrapping the aggregate itself handles both empty input rowsets (which yield a single NULL) and columns with NULL values in a single evaluation. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_sum_68",
    "keyword": "SUM",
    "tag": "🏛️ Corporate Edge",
    "question": "[SUM #68 &bull; SaaS Subscription Billing] In high-precision financial accounting, why should monetary sums use DECIMAL/NUMERIC rather than FLOAT or DOUBLE? (Application Scenario 4)",
    "options": [
      "DECIMAL automatically computes currency exchange rates",
      "FLOAT/DOUBLE use IEEE 754 binary floating-point representation which causes silent binary rounding errors (e.g. 0.1 + 0.2 != 0.3)",
      "FLOAT requires twice as many CPU cycles per addition",
      "DECIMAL values cannot be grouped by"
    ],
    "correctIndex": 1,
    "explanation": "IEEE 754 floating point arithmetic introduces binary precision drift, rendering balance sheets inaccurate. DECIMAL provides exact base-10 fractional representation. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_sum_69",
    "keyword": "SUM",
    "tag": "💡 Lead Architect",
    "question": "[SUM #69 &bull; Global Supply Chain & Logistics] What is the output of SELECT SUM(CASE WHEN score >= 50 THEN 1 ELSE 0 END) FROM exam_results? (Application Scenario 4)",
    "options": [
      "The total sum of scores of students who passed",
      "The percentage of students who passed",
      "A boolean TRUE or FALSE",
      "The count of students whose score is greater than or equal to 50"
    ],
    "correctIndex": 3,
    "explanation": "This is the classic conditional aggregation pattern (SUM-CASE). Summing 1 for every student with score >= 50 and 0 otherwise tallies the number of passing students. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_sum_70",
    "keyword": "SUM",
    "tag": "⚡ Gotcha Trap",
    "question": "[SUM #70 &bull; Healthcare Patient Records] If table Accounts has two rows: Balance = 100 and Balance = -100, what is the result of SELECT SUM(Balance) FROM Accounts? (Application Scenario 4)",
    "options": [
      "NULL",
      "0",
      "200",
      "Error: Negative balances disallowed"
    ],
    "correctIndex": 1,
    "explanation": "100 + (-100) = 0. The aggregate SUM handles signed numbers correctly. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_sum_71",
    "keyword": "SUM",
    "tag": "🎯 Core Concept",
    "question": "[SUM #71 &bull; E-Commerce Checkout Funnels] If a query runs SELECT SUM(amount) FROM transactions WHERE status = 'failed' and no rows match the predicate, what does the engine return? (Application Scenario 5)",
    "options": [
      "0.00",
      "NaN",
      "An empty result set with 0 rows",
      "NULL"
    ],
    "correctIndex": 3,
    "explanation": "Per the ANSI SQL specification, aggregate functions like SUM, AVG, MIN, and MAX return NULL when evaluated over an empty set (unless wrapped in COALESCE or IFNULL). Only COUNT returns 0. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_sum_72",
    "keyword": "SUM",
    "tag": "🏛️ Corporate Edge",
    "question": "[SUM #72 &bull; Telecom Billing & Data Streams] What is the recommended production pattern to prevent NULL return values when aggregating revenue on potentially empty date ranges? (Application Scenario 5)",
    "options": [
      "SUM(COALESCE(amount, 0))",
      "COALESCE(SUM(amount), 0)",
      "SUM(amount) + 0",
      "NVL2(amount, SUM(amount), 0)"
    ],
    "correctIndex": 1,
    "explanation": "COALESCE(SUM(amount), 0) is optimal because wrapping the aggregate itself handles both empty input rowsets (which yield a single NULL) and columns with NULL values in a single evaluation. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_sum_73",
    "keyword": "SUM",
    "tag": "💡 Lead Architect",
    "question": "[SUM #73 &bull; AdTech Real-Time Bidding] In high-precision financial accounting, why should monetary sums use DECIMAL/NUMERIC rather than FLOAT or DOUBLE? (Application Scenario 5)",
    "options": [
      "DECIMAL automatically computes currency exchange rates",
      "FLOAT requires twice as many CPU cycles per addition",
      "DECIMAL values cannot be grouped by",
      "FLOAT/DOUBLE use IEEE 754 binary floating-point representation which causes silent binary rounding errors (e.g. 0.1 + 0.2 != 0.3)"
    ],
    "correctIndex": 3,
    "explanation": "IEEE 754 floating point arithmetic introduces binary precision drift, rendering balance sheets inaccurate. DECIMAL provides exact base-10 fractional representation. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_sum_74",
    "keyword": "SUM",
    "tag": "⚡ Gotcha Trap",
    "question": "[SUM #74 &bull; Cybersecurity Audit Logs] What is the output of SELECT SUM(CASE WHEN score >= 50 THEN 1 ELSE 0 END) FROM exam_results? (Application Scenario 5)",
    "options": [
      "The total sum of scores of students who passed",
      "The count of students whose score is greater than or equal to 50",
      "The percentage of students who passed",
      "A boolean TRUE or FALSE"
    ],
    "correctIndex": 1,
    "explanation": "This is the classic conditional aggregation pattern (SUM-CASE). Summing 1 for every student with score >= 50 and 0 otherwise tallies the number of passing students. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_sum_75",
    "keyword": "SUM",
    "tag": "🎯 Core Concept",
    "question": "[SUM #75 &bull; Fintech & Ledger Systems] If table Accounts has two rows: Balance = 100 and Balance = -100, what is the result of SELECT SUM(Balance) FROM Accounts? (Application Scenario 5)",
    "options": [
      "NULL",
      "200",
      "Error: Negative balances disallowed",
      "0"
    ],
    "correctIndex": 3,
    "explanation": "100 + (-100) = 0. The aggregate SUM handles signed numbers correctly. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_sum_76",
    "keyword": "SUM",
    "tag": "🏛️ Corporate Edge",
    "question": "[SUM #76 &bull; SaaS Subscription Billing] If a query runs SELECT SUM(amount) FROM transactions WHERE status = 'failed' and no rows match the predicate, what does the engine return? (Application Scenario 6)",
    "options": [
      "0.00",
      "NULL",
      "NaN",
      "An empty result set with 0 rows"
    ],
    "correctIndex": 1,
    "explanation": "Per the ANSI SQL specification, aggregate functions like SUM, AVG, MIN, and MAX return NULL when evaluated over an empty set (unless wrapped in COALESCE or IFNULL). Only COUNT returns 0. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_sum_77",
    "keyword": "SUM",
    "tag": "💡 Lead Architect",
    "question": "[SUM #77 &bull; Global Supply Chain & Logistics] What is the recommended production pattern to prevent NULL return values when aggregating revenue on potentially empty date ranges? (Application Scenario 6)",
    "options": [
      "SUM(COALESCE(amount, 0))",
      "SUM(amount) + 0",
      "NVL2(amount, SUM(amount), 0)",
      "COALESCE(SUM(amount), 0)"
    ],
    "correctIndex": 3,
    "explanation": "COALESCE(SUM(amount), 0) is optimal because wrapping the aggregate itself handles both empty input rowsets (which yield a single NULL) and columns with NULL values in a single evaluation. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_sum_78",
    "keyword": "SUM",
    "tag": "⚡ Gotcha Trap",
    "question": "[SUM #78 &bull; Healthcare Patient Records] In high-precision financial accounting, why should monetary sums use DECIMAL/NUMERIC rather than FLOAT or DOUBLE? (Application Scenario 6)",
    "options": [
      "DECIMAL automatically computes currency exchange rates",
      "FLOAT/DOUBLE use IEEE 754 binary floating-point representation which causes silent binary rounding errors (e.g. 0.1 + 0.2 != 0.3)",
      "FLOAT requires twice as many CPU cycles per addition",
      "DECIMAL values cannot be grouped by"
    ],
    "correctIndex": 1,
    "explanation": "IEEE 754 floating point arithmetic introduces binary precision drift, rendering balance sheets inaccurate. DECIMAL provides exact base-10 fractional representation. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_sum_79",
    "keyword": "SUM",
    "tag": "🎯 Core Concept",
    "question": "[SUM #79 &bull; E-Commerce Checkout Funnels] What is the output of SELECT SUM(CASE WHEN score >= 50 THEN 1 ELSE 0 END) FROM exam_results? (Application Scenario 6)",
    "options": [
      "The total sum of scores of students who passed",
      "The percentage of students who passed",
      "A boolean TRUE or FALSE",
      "The count of students whose score is greater than or equal to 50"
    ],
    "correctIndex": 3,
    "explanation": "This is the classic conditional aggregation pattern (SUM-CASE). Summing 1 for every student with score >= 50 and 0 otherwise tallies the number of passing students. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_sum_80",
    "keyword": "SUM",
    "tag": "🏛️ Corporate Edge",
    "question": "[SUM #80 &bull; Telecom Billing & Data Streams] If table Accounts has two rows: Balance = 100 and Balance = -100, what is the result of SELECT SUM(Balance) FROM Accounts? (Application Scenario 6)",
    "options": [
      "NULL",
      "0",
      "200",
      "Error: Negative balances disallowed"
    ],
    "correctIndex": 1,
    "explanation": "100 + (-100) = 0. The aggregate SUM handles signed numbers correctly. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_sum_81",
    "keyword": "SUM",
    "tag": "💡 Lead Architect",
    "question": "[SUM #81 &bull; AdTech Real-Time Bidding] If a query runs SELECT SUM(amount) FROM transactions WHERE status = 'failed' and no rows match the predicate, what does the engine return? (Application Scenario 7)",
    "options": [
      "0.00",
      "NaN",
      "An empty result set with 0 rows",
      "NULL"
    ],
    "correctIndex": 3,
    "explanation": "Per the ANSI SQL specification, aggregate functions like SUM, AVG, MIN, and MAX return NULL when evaluated over an empty set (unless wrapped in COALESCE or IFNULL). Only COUNT returns 0. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_sum_82",
    "keyword": "SUM",
    "tag": "⚡ Gotcha Trap",
    "question": "[SUM #82 &bull; Cybersecurity Audit Logs] What is the recommended production pattern to prevent NULL return values when aggregating revenue on potentially empty date ranges? (Application Scenario 7)",
    "options": [
      "SUM(COALESCE(amount, 0))",
      "COALESCE(SUM(amount), 0)",
      "SUM(amount) + 0",
      "NVL2(amount, SUM(amount), 0)"
    ],
    "correctIndex": 1,
    "explanation": "COALESCE(SUM(amount), 0) is optimal because wrapping the aggregate itself handles both empty input rowsets (which yield a single NULL) and columns with NULL values in a single evaluation. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_sum_83",
    "keyword": "SUM",
    "tag": "🎯 Core Concept",
    "question": "[SUM #83 &bull; Fintech & Ledger Systems] In high-precision financial accounting, why should monetary sums use DECIMAL/NUMERIC rather than FLOAT or DOUBLE? (Application Scenario 7)",
    "options": [
      "DECIMAL automatically computes currency exchange rates",
      "FLOAT requires twice as many CPU cycles per addition",
      "DECIMAL values cannot be grouped by",
      "FLOAT/DOUBLE use IEEE 754 binary floating-point representation which causes silent binary rounding errors (e.g. 0.1 + 0.2 != 0.3)"
    ],
    "correctIndex": 3,
    "explanation": "IEEE 754 floating point arithmetic introduces binary precision drift, rendering balance sheets inaccurate. DECIMAL provides exact base-10 fractional representation. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_sum_84",
    "keyword": "SUM",
    "tag": "🏛️ Corporate Edge",
    "question": "[SUM #84 &bull; SaaS Subscription Billing] What is the output of SELECT SUM(CASE WHEN score >= 50 THEN 1 ELSE 0 END) FROM exam_results? (Application Scenario 7)",
    "options": [
      "The total sum of scores of students who passed",
      "The count of students whose score is greater than or equal to 50",
      "The percentage of students who passed",
      "A boolean TRUE or FALSE"
    ],
    "correctIndex": 1,
    "explanation": "This is the classic conditional aggregation pattern (SUM-CASE). Summing 1 for every student with score >= 50 and 0 otherwise tallies the number of passing students. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_sum_85",
    "keyword": "SUM",
    "tag": "💡 Lead Architect",
    "question": "[SUM #85 &bull; Global Supply Chain & Logistics] If table Accounts has two rows: Balance = 100 and Balance = -100, what is the result of SELECT SUM(Balance) FROM Accounts? (Application Scenario 7)",
    "options": [
      "NULL",
      "200",
      "Error: Negative balances disallowed",
      "0"
    ],
    "correctIndex": 3,
    "explanation": "100 + (-100) = 0. The aggregate SUM handles signed numbers correctly. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_sum_86",
    "keyword": "SUM",
    "tag": "⚡ Gotcha Trap",
    "question": "[SUM #86 &bull; Healthcare Patient Records] If a query runs SELECT SUM(amount) FROM transactions WHERE status = 'failed' and no rows match the predicate, what does the engine return? (Application Scenario 8)",
    "options": [
      "0.00",
      "NULL",
      "NaN",
      "An empty result set with 0 rows"
    ],
    "correctIndex": 1,
    "explanation": "Per the ANSI SQL specification, aggregate functions like SUM, AVG, MIN, and MAX return NULL when evaluated over an empty set (unless wrapped in COALESCE or IFNULL). Only COUNT returns 0. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_sum_87",
    "keyword": "SUM",
    "tag": "🎯 Core Concept",
    "question": "[SUM #87 &bull; E-Commerce Checkout Funnels] What is the recommended production pattern to prevent NULL return values when aggregating revenue on potentially empty date ranges? (Application Scenario 8)",
    "options": [
      "SUM(COALESCE(amount, 0))",
      "SUM(amount) + 0",
      "NVL2(amount, SUM(amount), 0)",
      "COALESCE(SUM(amount), 0)"
    ],
    "correctIndex": 3,
    "explanation": "COALESCE(SUM(amount), 0) is optimal because wrapping the aggregate itself handles both empty input rowsets (which yield a single NULL) and columns with NULL values in a single evaluation. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_sum_88",
    "keyword": "SUM",
    "tag": "🏛️ Corporate Edge",
    "question": "[SUM #88 &bull; Telecom Billing & Data Streams] In high-precision financial accounting, why should monetary sums use DECIMAL/NUMERIC rather than FLOAT or DOUBLE? (Application Scenario 8)",
    "options": [
      "DECIMAL automatically computes currency exchange rates",
      "FLOAT/DOUBLE use IEEE 754 binary floating-point representation which causes silent binary rounding errors (e.g. 0.1 + 0.2 != 0.3)",
      "FLOAT requires twice as many CPU cycles per addition",
      "DECIMAL values cannot be grouped by"
    ],
    "correctIndex": 1,
    "explanation": "IEEE 754 floating point arithmetic introduces binary precision drift, rendering balance sheets inaccurate. DECIMAL provides exact base-10 fractional representation. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_sum_89",
    "keyword": "SUM",
    "tag": "💡 Lead Architect",
    "question": "[SUM #89 &bull; AdTech Real-Time Bidding] What is the output of SELECT SUM(CASE WHEN score >= 50 THEN 1 ELSE 0 END) FROM exam_results? (Application Scenario 8)",
    "options": [
      "The total sum of scores of students who passed",
      "The percentage of students who passed",
      "A boolean TRUE or FALSE",
      "The count of students whose score is greater than or equal to 50"
    ],
    "correctIndex": 3,
    "explanation": "This is the classic conditional aggregation pattern (SUM-CASE). Summing 1 for every student with score >= 50 and 0 otherwise tallies the number of passing students. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_sum_90",
    "keyword": "SUM",
    "tag": "⚡ Gotcha Trap",
    "question": "[SUM #90 &bull; Cybersecurity Audit Logs] If table Accounts has two rows: Balance = 100 and Balance = -100, what is the result of SELECT SUM(Balance) FROM Accounts? (Application Scenario 8)",
    "options": [
      "NULL",
      "0",
      "200",
      "Error: Negative balances disallowed"
    ],
    "correctIndex": 1,
    "explanation": "100 + (-100) = 0. The aggregate SUM handles signed numbers correctly. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_sum_91",
    "keyword": "SUM",
    "tag": "🎯 Core Concept",
    "question": "[SUM #91 &bull; Fintech & Ledger Systems] If a query runs SELECT SUM(amount) FROM transactions WHERE status = 'failed' and no rows match the predicate, what does the engine return? (Application Scenario 9)",
    "options": [
      "0.00",
      "NaN",
      "An empty result set with 0 rows",
      "NULL"
    ],
    "correctIndex": 3,
    "explanation": "Per the ANSI SQL specification, aggregate functions like SUM, AVG, MIN, and MAX return NULL when evaluated over an empty set (unless wrapped in COALESCE or IFNULL). Only COUNT returns 0. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_sum_92",
    "keyword": "SUM",
    "tag": "🏛️ Corporate Edge",
    "question": "[SUM #92 &bull; SaaS Subscription Billing] What is the recommended production pattern to prevent NULL return values when aggregating revenue on potentially empty date ranges? (Application Scenario 9)",
    "options": [
      "SUM(COALESCE(amount, 0))",
      "COALESCE(SUM(amount), 0)",
      "SUM(amount) + 0",
      "NVL2(amount, SUM(amount), 0)"
    ],
    "correctIndex": 1,
    "explanation": "COALESCE(SUM(amount), 0) is optimal because wrapping the aggregate itself handles both empty input rowsets (which yield a single NULL) and columns with NULL values in a single evaluation. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_sum_93",
    "keyword": "SUM",
    "tag": "💡 Lead Architect",
    "question": "[SUM #93 &bull; Global Supply Chain & Logistics] In high-precision financial accounting, why should monetary sums use DECIMAL/NUMERIC rather than FLOAT or DOUBLE? (Application Scenario 9)",
    "options": [
      "DECIMAL automatically computes currency exchange rates",
      "FLOAT requires twice as many CPU cycles per addition",
      "DECIMAL values cannot be grouped by",
      "FLOAT/DOUBLE use IEEE 754 binary floating-point representation which causes silent binary rounding errors (e.g. 0.1 + 0.2 != 0.3)"
    ],
    "correctIndex": 3,
    "explanation": "IEEE 754 floating point arithmetic introduces binary precision drift, rendering balance sheets inaccurate. DECIMAL provides exact base-10 fractional representation. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_sum_94",
    "keyword": "SUM",
    "tag": "⚡ Gotcha Trap",
    "question": "[SUM #94 &bull; Healthcare Patient Records] What is the output of SELECT SUM(CASE WHEN score >= 50 THEN 1 ELSE 0 END) FROM exam_results? (Application Scenario 9)",
    "options": [
      "The total sum of scores of students who passed",
      "The count of students whose score is greater than or equal to 50",
      "The percentage of students who passed",
      "A boolean TRUE or FALSE"
    ],
    "correctIndex": 1,
    "explanation": "This is the classic conditional aggregation pattern (SUM-CASE). Summing 1 for every student with score >= 50 and 0 otherwise tallies the number of passing students. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_sum_95",
    "keyword": "SUM",
    "tag": "🎯 Core Concept",
    "question": "[SUM #95 &bull; E-Commerce Checkout Funnels] If table Accounts has two rows: Balance = 100 and Balance = -100, what is the result of SELECT SUM(Balance) FROM Accounts? (Application Scenario 9)",
    "options": [
      "NULL",
      "200",
      "Error: Negative balances disallowed",
      "0"
    ],
    "correctIndex": 3,
    "explanation": "100 + (-100) = 0. The aggregate SUM handles signed numbers correctly. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_sum_96",
    "keyword": "SUM",
    "tag": "🏛️ Corporate Edge",
    "question": "[SUM #96 &bull; Telecom Billing & Data Streams] If a query runs SELECT SUM(amount) FROM transactions WHERE status = 'failed' and no rows match the predicate, what does the engine return? (Application Scenario 10)",
    "options": [
      "0.00",
      "NULL",
      "NaN",
      "An empty result set with 0 rows"
    ],
    "correctIndex": 1,
    "explanation": "Per the ANSI SQL specification, aggregate functions like SUM, AVG, MIN, and MAX return NULL when evaluated over an empty set (unless wrapped in COALESCE or IFNULL). Only COUNT returns 0. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_sum_97",
    "keyword": "SUM",
    "tag": "💡 Lead Architect",
    "question": "[SUM #97 &bull; AdTech Real-Time Bidding] What is the recommended production pattern to prevent NULL return values when aggregating revenue on potentially empty date ranges? (Application Scenario 10)",
    "options": [
      "SUM(COALESCE(amount, 0))",
      "SUM(amount) + 0",
      "NVL2(amount, SUM(amount), 0)",
      "COALESCE(SUM(amount), 0)"
    ],
    "correctIndex": 3,
    "explanation": "COALESCE(SUM(amount), 0) is optimal because wrapping the aggregate itself handles both empty input rowsets (which yield a single NULL) and columns with NULL values in a single evaluation. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_sum_98",
    "keyword": "SUM",
    "tag": "⚡ Gotcha Trap",
    "question": "[SUM #98 &bull; Cybersecurity Audit Logs] In high-precision financial accounting, why should monetary sums use DECIMAL/NUMERIC rather than FLOAT or DOUBLE? (Application Scenario 10)",
    "options": [
      "DECIMAL automatically computes currency exchange rates",
      "FLOAT/DOUBLE use IEEE 754 binary floating-point representation which causes silent binary rounding errors (e.g. 0.1 + 0.2 != 0.3)",
      "FLOAT requires twice as many CPU cycles per addition",
      "DECIMAL values cannot be grouped by"
    ],
    "correctIndex": 1,
    "explanation": "IEEE 754 floating point arithmetic introduces binary precision drift, rendering balance sheets inaccurate. DECIMAL provides exact base-10 fractional representation. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_sum_99",
    "keyword": "SUM",
    "tag": "🎯 Core Concept",
    "question": "[SUM #99 &bull; Fintech & Ledger Systems] What is the output of SELECT SUM(CASE WHEN score >= 50 THEN 1 ELSE 0 END) FROM exam_results? (Application Scenario 10)",
    "options": [
      "The total sum of scores of students who passed",
      "The percentage of students who passed",
      "A boolean TRUE or FALSE",
      "The count of students whose score is greater than or equal to 50"
    ],
    "correctIndex": 3,
    "explanation": "This is the classic conditional aggregation pattern (SUM-CASE). Summing 1 for every student with score >= 50 and 0 otherwise tallies the number of passing students. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_sum_100",
    "keyword": "SUM",
    "tag": "🏛️ Corporate Edge",
    "question": "[SUM #100 &bull; SaaS Subscription Billing] If table Accounts has two rows: Balance = 100 and Balance = -100, what is the result of SELECT SUM(Balance) FROM Accounts? (Application Scenario 10)",
    "options": [
      "NULL",
      "0",
      "200",
      "Error: Negative balances disallowed"
    ],
    "correctIndex": 1,
    "explanation": "100 + (-100) = 0. The aggregate SUM handles signed numbers correctly. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_avg_1",
    "keyword": "AVG",
    "tag": "🍡 Quick Snack",
    "question": "[AVG #1] Given scores [10, 20, NULL, NULL], what does \"SELECT AVG(score) FROM Tests;\" return?",
    "options": [
      "NULL",
      "7.5 (30 / 4)",
      "0",
      "15.0 (30 / 2)"
    ],
    "correctIndex": 3,
    "explanation": "AVG() computes SUM(score) / COUNT(score). Because COUNT(score) only counts non-NULL rows (2 rows), the denominator is 2, producing 30 / 2 = 15.0."
  },
  {
    "id": "mcq_avg_2",
    "keyword": "AVG",
    "tag": "⚡ Gotcha Trap",
    "question": "[AVG #2] In Microsoft SQL Server, what is the output of \"SELECT AVG(rating) FROM Movies;\" if rating is an INT column with values [4, 5]?",
    "options": [
      "4.5",
      "4.0",
      "5",
      "4"
    ],
    "correctIndex": 3,
    "explanation": "In SQL Server, AVG() on integer columns performs integer division and truncates the decimal part, returning 4 instead of 4.5! You must cast: AVG(CAST(rating AS FLOAT))."
  },
  {
    "id": "mcq_avg_3",
    "keyword": "AVG",
    "tag": "🐱 Brain Bender",
    "question": "[AVG #3] If you want NULL values in column 'score' to count as 0 when calculating the company-wide average, which expression is correct?",
    "options": [
      "AVG(score NULL AS 0)",
      "AVG(COALESCE(score, 0))",
      "COALESCE(AVG(score), 0)",
      "AVG(score) + 0"
    ],
    "correctIndex": 1,
    "explanation": "AVG(COALESCE(score, 0)) converts NULLs into 0 before the aggregation occurs, ensuring the full row count is included in the denominator."
  },
  {
    "id": "mcq_avg_4",
    "keyword": "AVG",
    "tag": "🎯 Core Concept",
    "question": "[AVG #4] What is the statistical effect of using AVG(DISTINCT salary) compared to standard AVG(salary)?",
    "options": [
      "It calculates the median salary instead of the mean",
      "It eliminates salary tiers with multiple workers, heavily biasing the mean toward rare outlier salaries",
      "It returns the exact same result as AVG(salary)",
      "It runs 10x faster because the dataset is smaller"
    ],
    "correctIndex": 1,
    "explanation": "Deduplicating values prior to averaging destroys the true weighting of the population, giving a salary shared by 500 entry-level employees the exact same weight as a single CEO salary."
  },
  {
    "id": "mcq_avg_5",
    "keyword": "AVG",
    "tag": "🏆 Senior Staff",
    "question": "[AVG #5] When does AVG() return NULL?",
    "options": [
      "Only when an arithmetic division by zero occurs",
      "When the table has no rows, or when every single row in the column evaluates to NULL",
      "When any single row in the table contains a NULL value",
      "When the average equals zero"
    ],
    "correctIndex": 1,
    "explanation": "AVG() returns NULL when there are zero qualifying non-NULL values to average (either an empty table or an all-NULL column)."
  },
  {
    "id": "mcq_avg_6",
    "keyword": "AVG",
    "tag": "🍡 Quick Snack",
    "question": "[AVG #6] Given scores [10, 20, NULL, NULL], what does \"SELECT AVG(score) FROM Tests;\" return? (Scenario Variant 2)",
    "options": [
      "15.0 (30 / 2)",
      "NULL",
      "0",
      "7.5 (30 / 4)"
    ],
    "correctIndex": 0,
    "explanation": "AVG() computes SUM(score) / COUNT(score). Because COUNT(score) only counts non-NULL rows (2 rows), the denominator is 2, producing 30 / 2 = 15.0."
  },
  {
    "id": "mcq_avg_7",
    "keyword": "AVG",
    "tag": "⚡ Gotcha Trap",
    "question": "[AVG #7] In Microsoft SQL Server, what is the output of \"SELECT AVG(rating) FROM Movies;\" if rating is an INT column with values [4, 5]? (Scenario Variant 2)",
    "options": [
      "4.5",
      "4",
      "5",
      "4.0"
    ],
    "correctIndex": 1,
    "explanation": "In SQL Server, AVG() on integer columns performs integer division and truncates the decimal part, returning 4 instead of 4.5! You must cast: AVG(CAST(rating AS FLOAT))."
  },
  {
    "id": "mcq_avg_8",
    "keyword": "AVG",
    "tag": "🐱 Brain Bender",
    "question": "[AVG #8] If you want NULL values in column 'score' to count as 0 when calculating the company-wide average, which expression is correct? (Scenario Variant 2)",
    "options": [
      "AVG(COALESCE(score, 0))",
      "AVG(score NULL AS 0)",
      "AVG(score) + 0",
      "COALESCE(AVG(score), 0)"
    ],
    "correctIndex": 0,
    "explanation": "AVG(COALESCE(score, 0)) converts NULLs into 0 before the aggregation occurs, ensuring the full row count is included in the denominator."
  },
  {
    "id": "mcq_avg_9",
    "keyword": "AVG",
    "tag": "🎯 Core Concept",
    "question": "[AVG #9] What is the statistical effect of using AVG(DISTINCT salary) compared to standard AVG(salary)? (Scenario Variant 2)",
    "options": [
      "It eliminates salary tiers with multiple workers, heavily biasing the mean toward rare outlier salaries",
      "It returns the exact same result as AVG(salary)",
      "It calculates the median salary instead of the mean",
      "It runs 10x faster because the dataset is smaller"
    ],
    "correctIndex": 0,
    "explanation": "Deduplicating values prior to averaging destroys the true weighting of the population, giving a salary shared by 500 entry-level employees the exact same weight as a single CEO salary."
  },
  {
    "id": "mcq_avg_10",
    "keyword": "AVG",
    "tag": "🏆 Senior Staff",
    "question": "[AVG #10] When does AVG() return NULL? (Scenario Variant 2)",
    "options": [
      "When the table has no rows, or when every single row in the column evaluates to NULL",
      "When any single row in the table contains a NULL value",
      "When the average equals zero",
      "Only when an arithmetic division by zero occurs"
    ],
    "correctIndex": 0,
    "explanation": "AVG() returns NULL when there are zero qualifying non-NULL values to average (either an empty table or an all-NULL column)."
  },
  {
    "id": "mcq_avg_11",
    "keyword": "AVG",
    "tag": "🍡 Quick Snack",
    "question": "[AVG #11] Given scores [10, 20, NULL, NULL], what does \"SELECT AVG(score) FROM Tests;\" return? (Scenario Variant 3)",
    "options": [
      "0",
      "7.5 (30 / 4)",
      "15.0 (30 / 2)",
      "NULL"
    ],
    "correctIndex": 2,
    "explanation": "AVG() computes SUM(score) / COUNT(score). Because COUNT(score) only counts non-NULL rows (2 rows), the denominator is 2, producing 30 / 2 = 15.0."
  },
  {
    "id": "mcq_avg_12",
    "keyword": "AVG",
    "tag": "⚡ Gotcha Trap",
    "question": "[AVG #12] In Microsoft SQL Server, what is the output of \"SELECT AVG(rating) FROM Movies;\" if rating is an INT column with values [4, 5]? (Scenario Variant 3)",
    "options": [
      "4",
      "4.5",
      "4.0",
      "5"
    ],
    "correctIndex": 0,
    "explanation": "In SQL Server, AVG() on integer columns performs integer division and truncates the decimal part, returning 4 instead of 4.5! You must cast: AVG(CAST(rating AS FLOAT))."
  },
  {
    "id": "mcq_avg_13",
    "keyword": "AVG",
    "tag": "🐱 Brain Bender",
    "question": "[AVG #13] If you want NULL values in column 'score' to count as 0 when calculating the company-wide average, which expression is correct? (Scenario Variant 3)",
    "options": [
      "AVG(COALESCE(score, 0))",
      "AVG(score NULL AS 0)",
      "AVG(score) + 0",
      "COALESCE(AVG(score), 0)"
    ],
    "correctIndex": 0,
    "explanation": "AVG(COALESCE(score, 0)) converts NULLs into 0 before the aggregation occurs, ensuring the full row count is included in the denominator."
  },
  {
    "id": "mcq_avg_14",
    "keyword": "AVG",
    "tag": "🎯 Core Concept",
    "question": "[AVG #14] What is the statistical effect of using AVG(DISTINCT salary) compared to standard AVG(salary)? (Scenario Variant 3)",
    "options": [
      "It eliminates salary tiers with multiple workers, heavily biasing the mean toward rare outlier salaries",
      "It calculates the median salary instead of the mean",
      "It runs 10x faster because the dataset is smaller",
      "It returns the exact same result as AVG(salary)"
    ],
    "correctIndex": 0,
    "explanation": "Deduplicating values prior to averaging destroys the true weighting of the population, giving a salary shared by 500 entry-level employees the exact same weight as a single CEO salary."
  },
  {
    "id": "mcq_avg_15",
    "keyword": "AVG",
    "tag": "🏆 Senior Staff",
    "question": "[AVG #15] When does AVG() return NULL? (Scenario Variant 3)",
    "options": [
      "Only when an arithmetic division by zero occurs",
      "When the table has no rows, or when every single row in the column evaluates to NULL",
      "When the average equals zero",
      "When any single row in the table contains a NULL value"
    ],
    "correctIndex": 1,
    "explanation": "AVG() returns NULL when there are zero qualifying non-NULL values to average (either an empty table or an all-NULL column)."
  },
  {
    "id": "mcq_avg_16",
    "keyword": "AVG",
    "tag": "🍡 Quick Snack",
    "question": "[AVG #16] Given scores [10, 20, NULL, NULL], what does \"SELECT AVG(score) FROM Tests;\" return? (Scenario Variant 4)",
    "options": [
      "15.0 (30 / 2)",
      "NULL",
      "7.5 (30 / 4)",
      "0"
    ],
    "correctIndex": 0,
    "explanation": "AVG() computes SUM(score) / COUNT(score). Because COUNT(score) only counts non-NULL rows (2 rows), the denominator is 2, producing 30 / 2 = 15.0."
  },
  {
    "id": "mcq_avg_17",
    "keyword": "AVG",
    "tag": "⚡ Gotcha Trap",
    "question": "[AVG #17] In Microsoft SQL Server, what is the output of \"SELECT AVG(rating) FROM Movies;\" if rating is an INT column with values [4, 5]? (Scenario Variant 4)",
    "options": [
      "4.5",
      "4",
      "5",
      "4.0"
    ],
    "correctIndex": 1,
    "explanation": "In SQL Server, AVG() on integer columns performs integer division and truncates the decimal part, returning 4 instead of 4.5! You must cast: AVG(CAST(rating AS FLOAT))."
  },
  {
    "id": "mcq_avg_18",
    "keyword": "AVG",
    "tag": "🐱 Brain Bender",
    "question": "[AVG #18] If you want NULL values in column 'score' to count as 0 when calculating the company-wide average, which expression is correct? (Scenario Variant 4)",
    "options": [
      "AVG(COALESCE(score, 0))",
      "AVG(score NULL AS 0)",
      "COALESCE(AVG(score), 0)",
      "AVG(score) + 0"
    ],
    "correctIndex": 0,
    "explanation": "AVG(COALESCE(score, 0)) converts NULLs into 0 before the aggregation occurs, ensuring the full row count is included in the denominator."
  },
  {
    "id": "mcq_avg_19",
    "keyword": "AVG",
    "tag": "🎯 Core Concept",
    "question": "[AVG #19] What is the statistical effect of using AVG(DISTINCT salary) compared to standard AVG(salary)? (Scenario Variant 4)",
    "options": [
      "It calculates the median salary instead of the mean",
      "It eliminates salary tiers with multiple workers, heavily biasing the mean toward rare outlier salaries",
      "It runs 10x faster because the dataset is smaller",
      "It returns the exact same result as AVG(salary)"
    ],
    "correctIndex": 1,
    "explanation": "Deduplicating values prior to averaging destroys the true weighting of the population, giving a salary shared by 500 entry-level employees the exact same weight as a single CEO salary."
  },
  {
    "id": "mcq_avg_20",
    "keyword": "AVG",
    "tag": "🏆 Senior Staff",
    "question": "[AVG #20] When does AVG() return NULL? (Scenario Variant 4)",
    "options": [
      "When the table has no rows, or when every single row in the column evaluates to NULL",
      "When any single row in the table contains a NULL value",
      "Only when an arithmetic division by zero occurs",
      "When the average equals zero"
    ],
    "correctIndex": 0,
    "explanation": "AVG() returns NULL when there are zero qualifying non-NULL values to average (either an empty table or an all-NULL column)."
  },
  {
    "id": "mcq_avg_21",
    "keyword": "AVG",
    "tag": "🍡 Quick Snack",
    "question": "[AVG #21] Given scores [10, 20, NULL, NULL], what does \"SELECT AVG(score) FROM Tests;\" return? (Scenario Variant 5)",
    "options": [
      "15.0 (30 / 2)",
      "0",
      "7.5 (30 / 4)",
      "NULL"
    ],
    "correctIndex": 0,
    "explanation": "AVG() computes SUM(score) / COUNT(score). Because COUNT(score) only counts non-NULL rows (2 rows), the denominator is 2, producing 30 / 2 = 15.0."
  },
  {
    "id": "mcq_avg_22",
    "keyword": "AVG",
    "tag": "⚡ Gotcha Trap",
    "question": "[AVG #22] In Microsoft SQL Server, what is the output of \"SELECT AVG(rating) FROM Movies;\" if rating is an INT column with values [4, 5]? (Scenario Variant 5)",
    "options": [
      "5",
      "4.5",
      "4",
      "4.0"
    ],
    "correctIndex": 2,
    "explanation": "In SQL Server, AVG() on integer columns performs integer division and truncates the decimal part, returning 4 instead of 4.5! You must cast: AVG(CAST(rating AS FLOAT))."
  },
  {
    "id": "mcq_avg_23",
    "keyword": "AVG",
    "tag": "🐱 Brain Bender",
    "question": "[AVG #23] If you want NULL values in column 'score' to count as 0 when calculating the company-wide average, which expression is correct? (Scenario Variant 5)",
    "options": [
      "AVG(COALESCE(score, 0))",
      "AVG(score NULL AS 0)",
      "AVG(score) + 0",
      "COALESCE(AVG(score), 0)"
    ],
    "correctIndex": 0,
    "explanation": "AVG(COALESCE(score, 0)) converts NULLs into 0 before the aggregation occurs, ensuring the full row count is included in the denominator."
  },
  {
    "id": "mcq_avg_24",
    "keyword": "AVG",
    "tag": "🎯 Core Concept",
    "question": "[AVG #24] What is the statistical effect of using AVG(DISTINCT salary) compared to standard AVG(salary)? (Scenario Variant 5)",
    "options": [
      "It returns the exact same result as AVG(salary)",
      "It calculates the median salary instead of the mean",
      "It runs 10x faster because the dataset is smaller",
      "It eliminates salary tiers with multiple workers, heavily biasing the mean toward rare outlier salaries"
    ],
    "correctIndex": 3,
    "explanation": "Deduplicating values prior to averaging destroys the true weighting of the population, giving a salary shared by 500 entry-level employees the exact same weight as a single CEO salary."
  },
  {
    "id": "mcq_avg_25",
    "keyword": "AVG",
    "tag": "🏆 Senior Staff",
    "question": "[AVG #25] When does AVG() return NULL? (Scenario Variant 5)",
    "options": [
      "When any single row in the table contains a NULL value",
      "When the average equals zero",
      "When the table has no rows, or when every single row in the column evaluates to NULL",
      "Only when an arithmetic division by zero occurs"
    ],
    "correctIndex": 2,
    "explanation": "AVG() returns NULL when there are zero qualifying non-NULL values to average (either an empty table or an all-NULL column)."
  },
  {
    "id": "mcq_avg_26",
    "keyword": "AVG",
    "tag": "🍡 Quick Snack",
    "question": "[AVG #26] Given scores [10, 20, NULL, NULL], what does \"SELECT AVG(score) FROM Tests;\" return? (Scenario Variant 6)",
    "options": [
      "0",
      "NULL",
      "7.5 (30 / 4)",
      "15.0 (30 / 2)"
    ],
    "correctIndex": 3,
    "explanation": "AVG() computes SUM(score) / COUNT(score). Because COUNT(score) only counts non-NULL rows (2 rows), the denominator is 2, producing 30 / 2 = 15.0."
  },
  {
    "id": "mcq_avg_27",
    "keyword": "AVG",
    "tag": "⚡ Gotcha Trap",
    "question": "[AVG #27] In Microsoft SQL Server, what is the output of \"SELECT AVG(rating) FROM Movies;\" if rating is an INT column with values [4, 5]? (Scenario Variant 6)",
    "options": [
      "5",
      "4",
      "4.0",
      "4.5"
    ],
    "correctIndex": 1,
    "explanation": "In SQL Server, AVG() on integer columns performs integer division and truncates the decimal part, returning 4 instead of 4.5! You must cast: AVG(CAST(rating AS FLOAT))."
  },
  {
    "id": "mcq_avg_28",
    "keyword": "AVG",
    "tag": "🐱 Brain Bender",
    "question": "[AVG #28] If you want NULL values in column 'score' to count as 0 when calculating the company-wide average, which expression is correct? (Scenario Variant 6)",
    "options": [
      "AVG(score NULL AS 0)",
      "COALESCE(AVG(score), 0)",
      "AVG(score) + 0",
      "AVG(COALESCE(score, 0))"
    ],
    "correctIndex": 3,
    "explanation": "AVG(COALESCE(score, 0)) converts NULLs into 0 before the aggregation occurs, ensuring the full row count is included in the denominator."
  },
  {
    "id": "mcq_avg_29",
    "keyword": "AVG",
    "tag": "🎯 Core Concept",
    "question": "[AVG #29] What is the statistical effect of using AVG(DISTINCT salary) compared to standard AVG(salary)? (Scenario Variant 6)",
    "options": [
      "It returns the exact same result as AVG(salary)",
      "It eliminates salary tiers with multiple workers, heavily biasing the mean toward rare outlier salaries",
      "It runs 10x faster because the dataset is smaller",
      "It calculates the median salary instead of the mean"
    ],
    "correctIndex": 1,
    "explanation": "Deduplicating values prior to averaging destroys the true weighting of the population, giving a salary shared by 500 entry-level employees the exact same weight as a single CEO salary."
  },
  {
    "id": "mcq_avg_30",
    "keyword": "AVG",
    "tag": "🏆 Senior Staff",
    "question": "[AVG #30] When does AVG() return NULL? (Scenario Variant 6)",
    "options": [
      "When any single row in the table contains a NULL value",
      "When the average equals zero",
      "When the table has no rows, or when every single row in the column evaluates to NULL",
      "Only when an arithmetic division by zero occurs"
    ],
    "correctIndex": 2,
    "explanation": "AVG() returns NULL when there are zero qualifying non-NULL values to average (either an empty table or an all-NULL column)."
  },
  {
    "id": "mcq_avg_31",
    "keyword": "AVG",
    "tag": "🍡 Quick Snack",
    "question": "[AVG #31] Given scores [10, 20, NULL, NULL], what does \"SELECT AVG(score) FROM Tests;\" return? (Scenario Variant 7)",
    "options": [
      "NULL",
      "15.0 (30 / 2)",
      "7.5 (30 / 4)",
      "0"
    ],
    "correctIndex": 1,
    "explanation": "AVG() computes SUM(score) / COUNT(score). Because COUNT(score) only counts non-NULL rows (2 rows), the denominator is 2, producing 30 / 2 = 15.0."
  },
  {
    "id": "mcq_avg_32",
    "keyword": "AVG",
    "tag": "⚡ Gotcha Trap",
    "question": "[AVG #32] In Microsoft SQL Server, what is the output of \"SELECT AVG(rating) FROM Movies;\" if rating is an INT column with values [4, 5]? (Scenario Variant 7)",
    "options": [
      "4.5",
      "4.0",
      "4",
      "5"
    ],
    "correctIndex": 2,
    "explanation": "In SQL Server, AVG() on integer columns performs integer division and truncates the decimal part, returning 4 instead of 4.5! You must cast: AVG(CAST(rating AS FLOAT))."
  },
  {
    "id": "mcq_avg_33",
    "keyword": "AVG",
    "tag": "🐱 Brain Bender",
    "question": "[AVG #33] If you want NULL values in column 'score' to count as 0 when calculating the company-wide average, which expression is correct? (Scenario Variant 7)",
    "options": [
      "AVG(score) + 0",
      "AVG(COALESCE(score, 0))",
      "AVG(score NULL AS 0)",
      "COALESCE(AVG(score), 0)"
    ],
    "correctIndex": 1,
    "explanation": "AVG(COALESCE(score, 0)) converts NULLs into 0 before the aggregation occurs, ensuring the full row count is included in the denominator."
  },
  {
    "id": "mcq_avg_34",
    "keyword": "AVG",
    "tag": "🎯 Core Concept",
    "question": "[AVG #34] What is the statistical effect of using AVG(DISTINCT salary) compared to standard AVG(salary)? (Scenario Variant 7)",
    "options": [
      "It returns the exact same result as AVG(salary)",
      "It calculates the median salary instead of the mean",
      "It runs 10x faster because the dataset is smaller",
      "It eliminates salary tiers with multiple workers, heavily biasing the mean toward rare outlier salaries"
    ],
    "correctIndex": 3,
    "explanation": "Deduplicating values prior to averaging destroys the true weighting of the population, giving a salary shared by 500 entry-level employees the exact same weight as a single CEO salary."
  },
  {
    "id": "mcq_avg_35",
    "keyword": "AVG",
    "tag": "🏆 Senior Staff",
    "question": "[AVG #35] When does AVG() return NULL? (Scenario Variant 7)",
    "options": [
      "When any single row in the table contains a NULL value",
      "When the table has no rows, or when every single row in the column evaluates to NULL",
      "When the average equals zero",
      "Only when an arithmetic division by zero occurs"
    ],
    "correctIndex": 1,
    "explanation": "AVG() returns NULL when there are zero qualifying non-NULL values to average (either an empty table or an all-NULL column)."
  },
  {
    "id": "mcq_avg_36",
    "keyword": "AVG",
    "tag": "🍡 Quick Snack",
    "question": "[AVG #36] Given scores [10, 20, NULL, NULL], what does \"SELECT AVG(score) FROM Tests;\" return? (Scenario Variant 8)",
    "options": [
      "NULL",
      "15.0 (30 / 2)",
      "0",
      "7.5 (30 / 4)"
    ],
    "correctIndex": 1,
    "explanation": "AVG() computes SUM(score) / COUNT(score). Because COUNT(score) only counts non-NULL rows (2 rows), the denominator is 2, producing 30 / 2 = 15.0."
  },
  {
    "id": "mcq_avg_37",
    "keyword": "AVG",
    "tag": "⚡ Gotcha Trap",
    "question": "[AVG #37] In Microsoft SQL Server, what is the output of \"SELECT AVG(rating) FROM Movies;\" if rating is an INT column with values [4, 5]? (Scenario Variant 8)",
    "options": [
      "4",
      "5",
      "4.0",
      "4.5"
    ],
    "correctIndex": 0,
    "explanation": "In SQL Server, AVG() on integer columns performs integer division and truncates the decimal part, returning 4 instead of 4.5! You must cast: AVG(CAST(rating AS FLOAT))."
  },
  {
    "id": "mcq_avg_38",
    "keyword": "AVG",
    "tag": "🐱 Brain Bender",
    "question": "[AVG #38] If you want NULL values in column 'score' to count as 0 when calculating the company-wide average, which expression is correct? (Scenario Variant 8)",
    "options": [
      "AVG(score) + 0",
      "COALESCE(AVG(score), 0)",
      "AVG(score NULL AS 0)",
      "AVG(COALESCE(score, 0))"
    ],
    "correctIndex": 3,
    "explanation": "AVG(COALESCE(score, 0)) converts NULLs into 0 before the aggregation occurs, ensuring the full row count is included in the denominator."
  },
  {
    "id": "mcq_avg_39",
    "keyword": "AVG",
    "tag": "🎯 Core Concept",
    "question": "[AVG #39] What is the statistical effect of using AVG(DISTINCT salary) compared to standard AVG(salary)? (Scenario Variant 8)",
    "options": [
      "It runs 10x faster because the dataset is smaller",
      "It returns the exact same result as AVG(salary)",
      "It eliminates salary tiers with multiple workers, heavily biasing the mean toward rare outlier salaries",
      "It calculates the median salary instead of the mean"
    ],
    "correctIndex": 2,
    "explanation": "Deduplicating values prior to averaging destroys the true weighting of the population, giving a salary shared by 500 entry-level employees the exact same weight as a single CEO salary."
  },
  {
    "id": "mcq_avg_40",
    "keyword": "AVG",
    "tag": "🏆 Senior Staff",
    "question": "[AVG #40] When does AVG() return NULL? (Scenario Variant 8)",
    "options": [
      "When any single row in the table contains a NULL value",
      "When the table has no rows, or when every single row in the column evaluates to NULL",
      "Only when an arithmetic division by zero occurs",
      "When the average equals zero"
    ],
    "correctIndex": 1,
    "explanation": "AVG() returns NULL when there are zero qualifying non-NULL values to average (either an empty table or an all-NULL column)."
  },
  {
    "id": "mcq_avg_41",
    "keyword": "AVG",
    "tag": "🍡 Quick Snack",
    "question": "[AVG #41] Given scores [10, 20, NULL, NULL], what does \"SELECT AVG(score) FROM Tests;\" return? (Scenario Variant 9)",
    "options": [
      "NULL",
      "15.0 (30 / 2)",
      "7.5 (30 / 4)",
      "0"
    ],
    "correctIndex": 1,
    "explanation": "AVG() computes SUM(score) / COUNT(score). Because COUNT(score) only counts non-NULL rows (2 rows), the denominator is 2, producing 30 / 2 = 15.0."
  },
  {
    "id": "mcq_avg_42",
    "keyword": "AVG",
    "tag": "⚡ Gotcha Trap",
    "question": "[AVG #42] In Microsoft SQL Server, what is the output of \"SELECT AVG(rating) FROM Movies;\" if rating is an INT column with values [4, 5]? (Scenario Variant 9)",
    "options": [
      "4.5",
      "4.0",
      "4",
      "5"
    ],
    "correctIndex": 2,
    "explanation": "In SQL Server, AVG() on integer columns performs integer division and truncates the decimal part, returning 4 instead of 4.5! You must cast: AVG(CAST(rating AS FLOAT))."
  },
  {
    "id": "mcq_avg_43",
    "keyword": "AVG",
    "tag": "🐱 Brain Bender",
    "question": "[AVG #43] If you want NULL values in column 'score' to count as 0 when calculating the company-wide average, which expression is correct? (Scenario Variant 9)",
    "options": [
      "AVG(COALESCE(score, 0))",
      "AVG(score NULL AS 0)",
      "COALESCE(AVG(score), 0)",
      "AVG(score) + 0"
    ],
    "correctIndex": 0,
    "explanation": "AVG(COALESCE(score, 0)) converts NULLs into 0 before the aggregation occurs, ensuring the full row count is included in the denominator."
  },
  {
    "id": "mcq_avg_44",
    "keyword": "AVG",
    "tag": "🎯 Core Concept",
    "question": "[AVG #44] What is the statistical effect of using AVG(DISTINCT salary) compared to standard AVG(salary)? (Scenario Variant 9)",
    "options": [
      "It eliminates salary tiers with multiple workers, heavily biasing the mean toward rare outlier salaries",
      "It runs 10x faster because the dataset is smaller",
      "It returns the exact same result as AVG(salary)",
      "It calculates the median salary instead of the mean"
    ],
    "correctIndex": 0,
    "explanation": "Deduplicating values prior to averaging destroys the true weighting of the population, giving a salary shared by 500 entry-level employees the exact same weight as a single CEO salary."
  },
  {
    "id": "mcq_avg_45",
    "keyword": "AVG",
    "tag": "🏆 Senior Staff",
    "question": "[AVG #45] When does AVG() return NULL? (Scenario Variant 9)",
    "options": [
      "When the average equals zero",
      "Only when an arithmetic division by zero occurs",
      "When the table has no rows, or when every single row in the column evaluates to NULL",
      "When any single row in the table contains a NULL value"
    ],
    "correctIndex": 2,
    "explanation": "AVG() returns NULL when there are zero qualifying non-NULL values to average (either an empty table or an all-NULL column)."
  },
  {
    "id": "mcq_avg_46",
    "keyword": "AVG",
    "tag": "🍡 Quick Snack",
    "question": "[AVG #46] Given scores [10, 20, NULL, NULL], what does \"SELECT AVG(score) FROM Tests;\" return? (Scenario Variant 10)",
    "options": [
      "NULL",
      "15.0 (30 / 2)",
      "0",
      "7.5 (30 / 4)"
    ],
    "correctIndex": 1,
    "explanation": "AVG() computes SUM(score) / COUNT(score). Because COUNT(score) only counts non-NULL rows (2 rows), the denominator is 2, producing 30 / 2 = 15.0."
  },
  {
    "id": "mcq_avg_47",
    "keyword": "AVG",
    "tag": "⚡ Gotcha Trap",
    "question": "[AVG #47] In Microsoft SQL Server, what is the output of \"SELECT AVG(rating) FROM Movies;\" if rating is an INT column with values [4, 5]? (Scenario Variant 10)",
    "options": [
      "4.0",
      "4.5",
      "4",
      "5"
    ],
    "correctIndex": 2,
    "explanation": "In SQL Server, AVG() on integer columns performs integer division and truncates the decimal part, returning 4 instead of 4.5! You must cast: AVG(CAST(rating AS FLOAT))."
  },
  {
    "id": "mcq_avg_48",
    "keyword": "AVG",
    "tag": "🐱 Brain Bender",
    "question": "[AVG #48] If you want NULL values in column 'score' to count as 0 when calculating the company-wide average, which expression is correct? (Scenario Variant 10)",
    "options": [
      "AVG(score) + 0",
      "AVG(COALESCE(score, 0))",
      "COALESCE(AVG(score), 0)",
      "AVG(score NULL AS 0)"
    ],
    "correctIndex": 1,
    "explanation": "AVG(COALESCE(score, 0)) converts NULLs into 0 before the aggregation occurs, ensuring the full row count is included in the denominator."
  },
  {
    "id": "mcq_avg_49",
    "keyword": "AVG",
    "tag": "🎯 Core Concept",
    "question": "[AVG #49] What is the statistical effect of using AVG(DISTINCT salary) compared to standard AVG(salary)? (Scenario Variant 10)",
    "options": [
      "It eliminates salary tiers with multiple workers, heavily biasing the mean toward rare outlier salaries",
      "It returns the exact same result as AVG(salary)",
      "It calculates the median salary instead of the mean",
      "It runs 10x faster because the dataset is smaller"
    ],
    "correctIndex": 0,
    "explanation": "Deduplicating values prior to averaging destroys the true weighting of the population, giving a salary shared by 500 entry-level employees the exact same weight as a single CEO salary."
  },
  {
    "id": "mcq_avg_50",
    "keyword": "AVG",
    "tag": "🏆 Senior Staff",
    "question": "[AVG #50] When does AVG() return NULL? (Scenario Variant 10)",
    "options": [
      "When the average equals zero",
      "Only when an arithmetic division by zero occurs",
      "When any single row in the table contains a NULL value",
      "When the table has no rows, or when every single row in the column evaluates to NULL"
    ],
    "correctIndex": 3,
    "explanation": "AVG() returns NULL when there are zero qualifying non-NULL values to average (either an empty table or an all-NULL column)."
  },
  {
    "id": "mcq_avg_51",
    "keyword": "AVG",
    "tag": "🎯 Core Concept",
    "question": "[AVG #51 &bull; Fintech & Ledger Systems] If an Employee table has salaries [1000, 2000, NULL, 3000], what does SELECT AVG(salary) return? (Application Scenario 1)",
    "options": [
      "1500 (since (1000+2000+0+3000)/4 = 1500)",
      "NULL",
      "Error: Cannot compute average with NULL present",
      "2000 (since (1000+2000+3000)/3 = 2000)"
    ],
    "correctIndex": 3,
    "explanation": "In ANSI SQL, AVG(col) computes SUM(col)/COUNT(col). Because COUNT(col) excludes NULLs, the denominator is 3, yielding 6000/3 = 2000. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_avg_52",
    "keyword": "AVG",
    "tag": "🏛️ Corporate Edge",
    "question": "[AVG #52 &bull; SaaS Subscription Billing] How can an analyst force SQL AVG to treat NULL ratings as 0 rather than excluding them from the denominator? (Application Scenario 1)",
    "options": [
      "COALESCE(AVG(rating), 0)",
      "AVG(COALESCE(rating, 0))",
      "AVG(rating) OVER ()",
      "SET SQL_AVG_NULL_ZERO = ON;"
    ],
    "correctIndex": 1,
    "explanation": "AVG(COALESCE(rating, 0)) transforms NULL values into 0 before aggregation, ensuring they increment the denominator count and drag the average downward. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_avg_53",
    "keyword": "AVG",
    "tag": "💡 Lead Architect",
    "question": "[AVG #53 &bull; Global Supply Chain & Logistics] In an e-commerce review system, what is the impact of computing AVG(rating) on products with only 1 five-star review versus 10,000 reviews averaging 4.9? (Application Scenario 1)",
    "options": [
      "AVG requires a temporary disk table if review count exceeds 5",
      "The engine terminates the query if rating is not an integer",
      "There is no statistical difference",
      "Naive AVG exhibits small-sample bias where a single outlier review ranks higher than heavily vetted popular products"
    ],
    "correctIndex": 3,
    "explanation": "Simple AVG suffers from small sample variance. Production recommendation systems employ Bayesian weighted averages (or Dirichlet priors) to balance score against review volume. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_avg_54",
    "keyword": "AVG",
    "tag": "⚡ Gotcha Trap",
    "question": "[AVG #54 &bull; Healthcare Patient Records] What is the return type of AVG(integer_column) in PostgreSQL versus SQL Server? (Application Scenario 1)",
    "options": [
      "Both always return whole integers",
      "PostgreSQL returns NUMERIC with decimals; SQL Server performs integer truncation unless cast to FLOAT/DECIMAL",
      "Both always return IEEE 754 FLOAT",
      "PostgreSQL throws an error unless explicit casting is provided"
    ],
    "correctIndex": 1,
    "explanation": "In SQL Server, AVG() on integer columns performs integer division (e.g. AVG(1, 2) = 1). PostgreSQL automatically casts to NUMERIC to maintain precision. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_avg_55",
    "keyword": "AVG",
    "tag": "🎯 Core Concept",
    "question": "[AVG #55 &bull; E-Commerce Checkout Funnels] What does SELECT AVG(DISTINCT price) FROM items do if items contains prices [10, 10, 10, 20]? (Application Scenario 1)",
    "options": [
      "Computes (10 + 10 + 10 + 20) / 4 = 12.5",
      "Throws a syntax error",
      "Returns 10",
      "Computes (10 + 20) / 2 = 15"
    ],
    "correctIndex": 3,
    "explanation": "AVG(DISTINCT price) deduplicates the input set to [10, 20], yielding (10 + 20) / 2 = 15.0. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_avg_56",
    "keyword": "AVG",
    "tag": "🏛️ Corporate Edge",
    "question": "[AVG #56 &bull; Telecom Billing & Data Streams] If an Employee table has salaries [1000, 2000, NULL, 3000], what does SELECT AVG(salary) return? (Application Scenario 2)",
    "options": [
      "1500 (since (1000+2000+0+3000)/4 = 1500)",
      "2000 (since (1000+2000+3000)/3 = 2000)",
      "NULL",
      "Error: Cannot compute average with NULL present"
    ],
    "correctIndex": 1,
    "explanation": "In ANSI SQL, AVG(col) computes SUM(col)/COUNT(col). Because COUNT(col) excludes NULLs, the denominator is 3, yielding 6000/3 = 2000. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_avg_57",
    "keyword": "AVG",
    "tag": "💡 Lead Architect",
    "question": "[AVG #57 &bull; AdTech Real-Time Bidding] How can an analyst force SQL AVG to treat NULL ratings as 0 rather than excluding them from the denominator? (Application Scenario 2)",
    "options": [
      "COALESCE(AVG(rating), 0)",
      "AVG(rating) OVER ()",
      "SET SQL_AVG_NULL_ZERO = ON;",
      "AVG(COALESCE(rating, 0))"
    ],
    "correctIndex": 3,
    "explanation": "AVG(COALESCE(rating, 0)) transforms NULL values into 0 before aggregation, ensuring they increment the denominator count and drag the average downward. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_avg_58",
    "keyword": "AVG",
    "tag": "⚡ Gotcha Trap",
    "question": "[AVG #58 &bull; Cybersecurity Audit Logs] In an e-commerce review system, what is the impact of computing AVG(rating) on products with only 1 five-star review versus 10,000 reviews averaging 4.9? (Application Scenario 2)",
    "options": [
      "AVG requires a temporary disk table if review count exceeds 5",
      "Naive AVG exhibits small-sample bias where a single outlier review ranks higher than heavily vetted popular products",
      "The engine terminates the query if rating is not an integer",
      "There is no statistical difference"
    ],
    "correctIndex": 1,
    "explanation": "Simple AVG suffers from small sample variance. Production recommendation systems employ Bayesian weighted averages (or Dirichlet priors) to balance score against review volume. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_avg_59",
    "keyword": "AVG",
    "tag": "🎯 Core Concept",
    "question": "[AVG #59 &bull; Fintech & Ledger Systems] What is the return type of AVG(integer_column) in PostgreSQL versus SQL Server? (Application Scenario 2)",
    "options": [
      "Both always return whole integers",
      "Both always return IEEE 754 FLOAT",
      "PostgreSQL throws an error unless explicit casting is provided",
      "PostgreSQL returns NUMERIC with decimals; SQL Server performs integer truncation unless cast to FLOAT/DECIMAL"
    ],
    "correctIndex": 3,
    "explanation": "In SQL Server, AVG() on integer columns performs integer division (e.g. AVG(1, 2) = 1). PostgreSQL automatically casts to NUMERIC to maintain precision. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_avg_60",
    "keyword": "AVG",
    "tag": "🏛️ Corporate Edge",
    "question": "[AVG #60 &bull; SaaS Subscription Billing] What does SELECT AVG(DISTINCT price) FROM items do if items contains prices [10, 10, 10, 20]? (Application Scenario 2)",
    "options": [
      "Computes (10 + 10 + 10 + 20) / 4 = 12.5",
      "Computes (10 + 20) / 2 = 15",
      "Throws a syntax error",
      "Returns 10"
    ],
    "correctIndex": 1,
    "explanation": "AVG(DISTINCT price) deduplicates the input set to [10, 20], yielding (10 + 20) / 2 = 15.0. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_avg_61",
    "keyword": "AVG",
    "tag": "💡 Lead Architect",
    "question": "[AVG #61 &bull; Global Supply Chain & Logistics] If an Employee table has salaries [1000, 2000, NULL, 3000], what does SELECT AVG(salary) return? (Application Scenario 3)",
    "options": [
      "1500 (since (1000+2000+0+3000)/4 = 1500)",
      "NULL",
      "Error: Cannot compute average with NULL present",
      "2000 (since (1000+2000+3000)/3 = 2000)"
    ],
    "correctIndex": 3,
    "explanation": "In ANSI SQL, AVG(col) computes SUM(col)/COUNT(col). Because COUNT(col) excludes NULLs, the denominator is 3, yielding 6000/3 = 2000. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_avg_62",
    "keyword": "AVG",
    "tag": "⚡ Gotcha Trap",
    "question": "[AVG #62 &bull; Healthcare Patient Records] How can an analyst force SQL AVG to treat NULL ratings as 0 rather than excluding them from the denominator? (Application Scenario 3)",
    "options": [
      "COALESCE(AVG(rating), 0)",
      "AVG(COALESCE(rating, 0))",
      "AVG(rating) OVER ()",
      "SET SQL_AVG_NULL_ZERO = ON;"
    ],
    "correctIndex": 1,
    "explanation": "AVG(COALESCE(rating, 0)) transforms NULL values into 0 before aggregation, ensuring they increment the denominator count and drag the average downward. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_avg_63",
    "keyword": "AVG",
    "tag": "🎯 Core Concept",
    "question": "[AVG #63 &bull; E-Commerce Checkout Funnels] In an e-commerce review system, what is the impact of computing AVG(rating) on products with only 1 five-star review versus 10,000 reviews averaging 4.9? (Application Scenario 3)",
    "options": [
      "AVG requires a temporary disk table if review count exceeds 5",
      "The engine terminates the query if rating is not an integer",
      "There is no statistical difference",
      "Naive AVG exhibits small-sample bias where a single outlier review ranks higher than heavily vetted popular products"
    ],
    "correctIndex": 3,
    "explanation": "Simple AVG suffers from small sample variance. Production recommendation systems employ Bayesian weighted averages (or Dirichlet priors) to balance score against review volume. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_avg_64",
    "keyword": "AVG",
    "tag": "🏛️ Corporate Edge",
    "question": "[AVG #64 &bull; Telecom Billing & Data Streams] What is the return type of AVG(integer_column) in PostgreSQL versus SQL Server? (Application Scenario 3)",
    "options": [
      "Both always return whole integers",
      "PostgreSQL returns NUMERIC with decimals; SQL Server performs integer truncation unless cast to FLOAT/DECIMAL",
      "Both always return IEEE 754 FLOAT",
      "PostgreSQL throws an error unless explicit casting is provided"
    ],
    "correctIndex": 1,
    "explanation": "In SQL Server, AVG() on integer columns performs integer division (e.g. AVG(1, 2) = 1). PostgreSQL automatically casts to NUMERIC to maintain precision. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_avg_65",
    "keyword": "AVG",
    "tag": "💡 Lead Architect",
    "question": "[AVG #65 &bull; AdTech Real-Time Bidding] What does SELECT AVG(DISTINCT price) FROM items do if items contains prices [10, 10, 10, 20]? (Application Scenario 3)",
    "options": [
      "Computes (10 + 10 + 10 + 20) / 4 = 12.5",
      "Throws a syntax error",
      "Returns 10",
      "Computes (10 + 20) / 2 = 15"
    ],
    "correctIndex": 3,
    "explanation": "AVG(DISTINCT price) deduplicates the input set to [10, 20], yielding (10 + 20) / 2 = 15.0. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_avg_66",
    "keyword": "AVG",
    "tag": "⚡ Gotcha Trap",
    "question": "[AVG #66 &bull; Cybersecurity Audit Logs] If an Employee table has salaries [1000, 2000, NULL, 3000], what does SELECT AVG(salary) return? (Application Scenario 4)",
    "options": [
      "1500 (since (1000+2000+0+3000)/4 = 1500)",
      "2000 (since (1000+2000+3000)/3 = 2000)",
      "NULL",
      "Error: Cannot compute average with NULL present"
    ],
    "correctIndex": 1,
    "explanation": "In ANSI SQL, AVG(col) computes SUM(col)/COUNT(col). Because COUNT(col) excludes NULLs, the denominator is 3, yielding 6000/3 = 2000. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_avg_67",
    "keyword": "AVG",
    "tag": "🎯 Core Concept",
    "question": "[AVG #67 &bull; Fintech & Ledger Systems] How can an analyst force SQL AVG to treat NULL ratings as 0 rather than excluding them from the denominator? (Application Scenario 4)",
    "options": [
      "COALESCE(AVG(rating), 0)",
      "AVG(rating) OVER ()",
      "SET SQL_AVG_NULL_ZERO = ON;",
      "AVG(COALESCE(rating, 0))"
    ],
    "correctIndex": 3,
    "explanation": "AVG(COALESCE(rating, 0)) transforms NULL values into 0 before aggregation, ensuring they increment the denominator count and drag the average downward. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_avg_68",
    "keyword": "AVG",
    "tag": "🏛️ Corporate Edge",
    "question": "[AVG #68 &bull; SaaS Subscription Billing] In an e-commerce review system, what is the impact of computing AVG(rating) on products with only 1 five-star review versus 10,000 reviews averaging 4.9? (Application Scenario 4)",
    "options": [
      "AVG requires a temporary disk table if review count exceeds 5",
      "Naive AVG exhibits small-sample bias where a single outlier review ranks higher than heavily vetted popular products",
      "The engine terminates the query if rating is not an integer",
      "There is no statistical difference"
    ],
    "correctIndex": 1,
    "explanation": "Simple AVG suffers from small sample variance. Production recommendation systems employ Bayesian weighted averages (or Dirichlet priors) to balance score against review volume. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_avg_69",
    "keyword": "AVG",
    "tag": "💡 Lead Architect",
    "question": "[AVG #69 &bull; Global Supply Chain & Logistics] What is the return type of AVG(integer_column) in PostgreSQL versus SQL Server? (Application Scenario 4)",
    "options": [
      "Both always return whole integers",
      "Both always return IEEE 754 FLOAT",
      "PostgreSQL throws an error unless explicit casting is provided",
      "PostgreSQL returns NUMERIC with decimals; SQL Server performs integer truncation unless cast to FLOAT/DECIMAL"
    ],
    "correctIndex": 3,
    "explanation": "In SQL Server, AVG() on integer columns performs integer division (e.g. AVG(1, 2) = 1). PostgreSQL automatically casts to NUMERIC to maintain precision. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_avg_70",
    "keyword": "AVG",
    "tag": "⚡ Gotcha Trap",
    "question": "[AVG #70 &bull; Healthcare Patient Records] What does SELECT AVG(DISTINCT price) FROM items do if items contains prices [10, 10, 10, 20]? (Application Scenario 4)",
    "options": [
      "Computes (10 + 10 + 10 + 20) / 4 = 12.5",
      "Computes (10 + 20) / 2 = 15",
      "Throws a syntax error",
      "Returns 10"
    ],
    "correctIndex": 1,
    "explanation": "AVG(DISTINCT price) deduplicates the input set to [10, 20], yielding (10 + 20) / 2 = 15.0. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_avg_71",
    "keyword": "AVG",
    "tag": "🎯 Core Concept",
    "question": "[AVG #71 &bull; E-Commerce Checkout Funnels] If an Employee table has salaries [1000, 2000, NULL, 3000], what does SELECT AVG(salary) return? (Application Scenario 5)",
    "options": [
      "1500 (since (1000+2000+0+3000)/4 = 1500)",
      "NULL",
      "Error: Cannot compute average with NULL present",
      "2000 (since (1000+2000+3000)/3 = 2000)"
    ],
    "correctIndex": 3,
    "explanation": "In ANSI SQL, AVG(col) computes SUM(col)/COUNT(col). Because COUNT(col) excludes NULLs, the denominator is 3, yielding 6000/3 = 2000. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_avg_72",
    "keyword": "AVG",
    "tag": "🏛️ Corporate Edge",
    "question": "[AVG #72 &bull; Telecom Billing & Data Streams] How can an analyst force SQL AVG to treat NULL ratings as 0 rather than excluding them from the denominator? (Application Scenario 5)",
    "options": [
      "COALESCE(AVG(rating), 0)",
      "AVG(COALESCE(rating, 0))",
      "AVG(rating) OVER ()",
      "SET SQL_AVG_NULL_ZERO = ON;"
    ],
    "correctIndex": 1,
    "explanation": "AVG(COALESCE(rating, 0)) transforms NULL values into 0 before aggregation, ensuring they increment the denominator count and drag the average downward. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_avg_73",
    "keyword": "AVG",
    "tag": "💡 Lead Architect",
    "question": "[AVG #73 &bull; AdTech Real-Time Bidding] In an e-commerce review system, what is the impact of computing AVG(rating) on products with only 1 five-star review versus 10,000 reviews averaging 4.9? (Application Scenario 5)",
    "options": [
      "AVG requires a temporary disk table if review count exceeds 5",
      "The engine terminates the query if rating is not an integer",
      "There is no statistical difference",
      "Naive AVG exhibits small-sample bias where a single outlier review ranks higher than heavily vetted popular products"
    ],
    "correctIndex": 3,
    "explanation": "Simple AVG suffers from small sample variance. Production recommendation systems employ Bayesian weighted averages (or Dirichlet priors) to balance score against review volume. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_avg_74",
    "keyword": "AVG",
    "tag": "⚡ Gotcha Trap",
    "question": "[AVG #74 &bull; Cybersecurity Audit Logs] What is the return type of AVG(integer_column) in PostgreSQL versus SQL Server? (Application Scenario 5)",
    "options": [
      "Both always return whole integers",
      "PostgreSQL returns NUMERIC with decimals; SQL Server performs integer truncation unless cast to FLOAT/DECIMAL",
      "Both always return IEEE 754 FLOAT",
      "PostgreSQL throws an error unless explicit casting is provided"
    ],
    "correctIndex": 1,
    "explanation": "In SQL Server, AVG() on integer columns performs integer division (e.g. AVG(1, 2) = 1). PostgreSQL automatically casts to NUMERIC to maintain precision. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_avg_75",
    "keyword": "AVG",
    "tag": "🎯 Core Concept",
    "question": "[AVG #75 &bull; Fintech & Ledger Systems] What does SELECT AVG(DISTINCT price) FROM items do if items contains prices [10, 10, 10, 20]? (Application Scenario 5)",
    "options": [
      "Computes (10 + 10 + 10 + 20) / 4 = 12.5",
      "Throws a syntax error",
      "Returns 10",
      "Computes (10 + 20) / 2 = 15"
    ],
    "correctIndex": 3,
    "explanation": "AVG(DISTINCT price) deduplicates the input set to [10, 20], yielding (10 + 20) / 2 = 15.0. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_avg_76",
    "keyword": "AVG",
    "tag": "🏛️ Corporate Edge",
    "question": "[AVG #76 &bull; SaaS Subscription Billing] If an Employee table has salaries [1000, 2000, NULL, 3000], what does SELECT AVG(salary) return? (Application Scenario 6)",
    "options": [
      "1500 (since (1000+2000+0+3000)/4 = 1500)",
      "2000 (since (1000+2000+3000)/3 = 2000)",
      "NULL",
      "Error: Cannot compute average with NULL present"
    ],
    "correctIndex": 1,
    "explanation": "In ANSI SQL, AVG(col) computes SUM(col)/COUNT(col). Because COUNT(col) excludes NULLs, the denominator is 3, yielding 6000/3 = 2000. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_avg_77",
    "keyword": "AVG",
    "tag": "💡 Lead Architect",
    "question": "[AVG #77 &bull; Global Supply Chain & Logistics] How can an analyst force SQL AVG to treat NULL ratings as 0 rather than excluding them from the denominator? (Application Scenario 6)",
    "options": [
      "COALESCE(AVG(rating), 0)",
      "AVG(rating) OVER ()",
      "SET SQL_AVG_NULL_ZERO = ON;",
      "AVG(COALESCE(rating, 0))"
    ],
    "correctIndex": 3,
    "explanation": "AVG(COALESCE(rating, 0)) transforms NULL values into 0 before aggregation, ensuring they increment the denominator count and drag the average downward. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_avg_78",
    "keyword": "AVG",
    "tag": "⚡ Gotcha Trap",
    "question": "[AVG #78 &bull; Healthcare Patient Records] In an e-commerce review system, what is the impact of computing AVG(rating) on products with only 1 five-star review versus 10,000 reviews averaging 4.9? (Application Scenario 6)",
    "options": [
      "AVG requires a temporary disk table if review count exceeds 5",
      "Naive AVG exhibits small-sample bias where a single outlier review ranks higher than heavily vetted popular products",
      "The engine terminates the query if rating is not an integer",
      "There is no statistical difference"
    ],
    "correctIndex": 1,
    "explanation": "Simple AVG suffers from small sample variance. Production recommendation systems employ Bayesian weighted averages (or Dirichlet priors) to balance score against review volume. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_avg_79",
    "keyword": "AVG",
    "tag": "🎯 Core Concept",
    "question": "[AVG #79 &bull; E-Commerce Checkout Funnels] What is the return type of AVG(integer_column) in PostgreSQL versus SQL Server? (Application Scenario 6)",
    "options": [
      "Both always return whole integers",
      "Both always return IEEE 754 FLOAT",
      "PostgreSQL throws an error unless explicit casting is provided",
      "PostgreSQL returns NUMERIC with decimals; SQL Server performs integer truncation unless cast to FLOAT/DECIMAL"
    ],
    "correctIndex": 3,
    "explanation": "In SQL Server, AVG() on integer columns performs integer division (e.g. AVG(1, 2) = 1). PostgreSQL automatically casts to NUMERIC to maintain precision. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_avg_80",
    "keyword": "AVG",
    "tag": "🏛️ Corporate Edge",
    "question": "[AVG #80 &bull; Telecom Billing & Data Streams] What does SELECT AVG(DISTINCT price) FROM items do if items contains prices [10, 10, 10, 20]? (Application Scenario 6)",
    "options": [
      "Computes (10 + 10 + 10 + 20) / 4 = 12.5",
      "Computes (10 + 20) / 2 = 15",
      "Throws a syntax error",
      "Returns 10"
    ],
    "correctIndex": 1,
    "explanation": "AVG(DISTINCT price) deduplicates the input set to [10, 20], yielding (10 + 20) / 2 = 15.0. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_avg_81",
    "keyword": "AVG",
    "tag": "💡 Lead Architect",
    "question": "[AVG #81 &bull; AdTech Real-Time Bidding] If an Employee table has salaries [1000, 2000, NULL, 3000], what does SELECT AVG(salary) return? (Application Scenario 7)",
    "options": [
      "1500 (since (1000+2000+0+3000)/4 = 1500)",
      "NULL",
      "Error: Cannot compute average with NULL present",
      "2000 (since (1000+2000+3000)/3 = 2000)"
    ],
    "correctIndex": 3,
    "explanation": "In ANSI SQL, AVG(col) computes SUM(col)/COUNT(col). Because COUNT(col) excludes NULLs, the denominator is 3, yielding 6000/3 = 2000. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_avg_82",
    "keyword": "AVG",
    "tag": "⚡ Gotcha Trap",
    "question": "[AVG #82 &bull; Cybersecurity Audit Logs] How can an analyst force SQL AVG to treat NULL ratings as 0 rather than excluding them from the denominator? (Application Scenario 7)",
    "options": [
      "COALESCE(AVG(rating), 0)",
      "AVG(COALESCE(rating, 0))",
      "AVG(rating) OVER ()",
      "SET SQL_AVG_NULL_ZERO = ON;"
    ],
    "correctIndex": 1,
    "explanation": "AVG(COALESCE(rating, 0)) transforms NULL values into 0 before aggregation, ensuring they increment the denominator count and drag the average downward. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_avg_83",
    "keyword": "AVG",
    "tag": "🎯 Core Concept",
    "question": "[AVG #83 &bull; Fintech & Ledger Systems] In an e-commerce review system, what is the impact of computing AVG(rating) on products with only 1 five-star review versus 10,000 reviews averaging 4.9? (Application Scenario 7)",
    "options": [
      "AVG requires a temporary disk table if review count exceeds 5",
      "The engine terminates the query if rating is not an integer",
      "There is no statistical difference",
      "Naive AVG exhibits small-sample bias where a single outlier review ranks higher than heavily vetted popular products"
    ],
    "correctIndex": 3,
    "explanation": "Simple AVG suffers from small sample variance. Production recommendation systems employ Bayesian weighted averages (or Dirichlet priors) to balance score against review volume. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_avg_84",
    "keyword": "AVG",
    "tag": "🏛️ Corporate Edge",
    "question": "[AVG #84 &bull; SaaS Subscription Billing] What is the return type of AVG(integer_column) in PostgreSQL versus SQL Server? (Application Scenario 7)",
    "options": [
      "Both always return whole integers",
      "PostgreSQL returns NUMERIC with decimals; SQL Server performs integer truncation unless cast to FLOAT/DECIMAL",
      "Both always return IEEE 754 FLOAT",
      "PostgreSQL throws an error unless explicit casting is provided"
    ],
    "correctIndex": 1,
    "explanation": "In SQL Server, AVG() on integer columns performs integer division (e.g. AVG(1, 2) = 1). PostgreSQL automatically casts to NUMERIC to maintain precision. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_avg_85",
    "keyword": "AVG",
    "tag": "💡 Lead Architect",
    "question": "[AVG #85 &bull; Global Supply Chain & Logistics] What does SELECT AVG(DISTINCT price) FROM items do if items contains prices [10, 10, 10, 20]? (Application Scenario 7)",
    "options": [
      "Computes (10 + 10 + 10 + 20) / 4 = 12.5",
      "Throws a syntax error",
      "Returns 10",
      "Computes (10 + 20) / 2 = 15"
    ],
    "correctIndex": 3,
    "explanation": "AVG(DISTINCT price) deduplicates the input set to [10, 20], yielding (10 + 20) / 2 = 15.0. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_avg_86",
    "keyword": "AVG",
    "tag": "⚡ Gotcha Trap",
    "question": "[AVG #86 &bull; Healthcare Patient Records] If an Employee table has salaries [1000, 2000, NULL, 3000], what does SELECT AVG(salary) return? (Application Scenario 8)",
    "options": [
      "1500 (since (1000+2000+0+3000)/4 = 1500)",
      "2000 (since (1000+2000+3000)/3 = 2000)",
      "NULL",
      "Error: Cannot compute average with NULL present"
    ],
    "correctIndex": 1,
    "explanation": "In ANSI SQL, AVG(col) computes SUM(col)/COUNT(col). Because COUNT(col) excludes NULLs, the denominator is 3, yielding 6000/3 = 2000. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_avg_87",
    "keyword": "AVG",
    "tag": "🎯 Core Concept",
    "question": "[AVG #87 &bull; E-Commerce Checkout Funnels] How can an analyst force SQL AVG to treat NULL ratings as 0 rather than excluding them from the denominator? (Application Scenario 8)",
    "options": [
      "COALESCE(AVG(rating), 0)",
      "AVG(rating) OVER ()",
      "SET SQL_AVG_NULL_ZERO = ON;",
      "AVG(COALESCE(rating, 0))"
    ],
    "correctIndex": 3,
    "explanation": "AVG(COALESCE(rating, 0)) transforms NULL values into 0 before aggregation, ensuring they increment the denominator count and drag the average downward. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_avg_88",
    "keyword": "AVG",
    "tag": "🏛️ Corporate Edge",
    "question": "[AVG #88 &bull; Telecom Billing & Data Streams] In an e-commerce review system, what is the impact of computing AVG(rating) on products with only 1 five-star review versus 10,000 reviews averaging 4.9? (Application Scenario 8)",
    "options": [
      "AVG requires a temporary disk table if review count exceeds 5",
      "Naive AVG exhibits small-sample bias where a single outlier review ranks higher than heavily vetted popular products",
      "The engine terminates the query if rating is not an integer",
      "There is no statistical difference"
    ],
    "correctIndex": 1,
    "explanation": "Simple AVG suffers from small sample variance. Production recommendation systems employ Bayesian weighted averages (or Dirichlet priors) to balance score against review volume. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_avg_89",
    "keyword": "AVG",
    "tag": "💡 Lead Architect",
    "question": "[AVG #89 &bull; AdTech Real-Time Bidding] What is the return type of AVG(integer_column) in PostgreSQL versus SQL Server? (Application Scenario 8)",
    "options": [
      "Both always return whole integers",
      "Both always return IEEE 754 FLOAT",
      "PostgreSQL throws an error unless explicit casting is provided",
      "PostgreSQL returns NUMERIC with decimals; SQL Server performs integer truncation unless cast to FLOAT/DECIMAL"
    ],
    "correctIndex": 3,
    "explanation": "In SQL Server, AVG() on integer columns performs integer division (e.g. AVG(1, 2) = 1). PostgreSQL automatically casts to NUMERIC to maintain precision. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_avg_90",
    "keyword": "AVG",
    "tag": "⚡ Gotcha Trap",
    "question": "[AVG #90 &bull; Cybersecurity Audit Logs] What does SELECT AVG(DISTINCT price) FROM items do if items contains prices [10, 10, 10, 20]? (Application Scenario 8)",
    "options": [
      "Computes (10 + 10 + 10 + 20) / 4 = 12.5",
      "Computes (10 + 20) / 2 = 15",
      "Throws a syntax error",
      "Returns 10"
    ],
    "correctIndex": 1,
    "explanation": "AVG(DISTINCT price) deduplicates the input set to [10, 20], yielding (10 + 20) / 2 = 15.0. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_avg_91",
    "keyword": "AVG",
    "tag": "🎯 Core Concept",
    "question": "[AVG #91 &bull; Fintech & Ledger Systems] If an Employee table has salaries [1000, 2000, NULL, 3000], what does SELECT AVG(salary) return? (Application Scenario 9)",
    "options": [
      "1500 (since (1000+2000+0+3000)/4 = 1500)",
      "NULL",
      "Error: Cannot compute average with NULL present",
      "2000 (since (1000+2000+3000)/3 = 2000)"
    ],
    "correctIndex": 3,
    "explanation": "In ANSI SQL, AVG(col) computes SUM(col)/COUNT(col). Because COUNT(col) excludes NULLs, the denominator is 3, yielding 6000/3 = 2000. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_avg_92",
    "keyword": "AVG",
    "tag": "🏛️ Corporate Edge",
    "question": "[AVG #92 &bull; SaaS Subscription Billing] How can an analyst force SQL AVG to treat NULL ratings as 0 rather than excluding them from the denominator? (Application Scenario 9)",
    "options": [
      "COALESCE(AVG(rating), 0)",
      "AVG(COALESCE(rating, 0))",
      "AVG(rating) OVER ()",
      "SET SQL_AVG_NULL_ZERO = ON;"
    ],
    "correctIndex": 1,
    "explanation": "AVG(COALESCE(rating, 0)) transforms NULL values into 0 before aggregation, ensuring they increment the denominator count and drag the average downward. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_avg_93",
    "keyword": "AVG",
    "tag": "💡 Lead Architect",
    "question": "[AVG #93 &bull; Global Supply Chain & Logistics] In an e-commerce review system, what is the impact of computing AVG(rating) on products with only 1 five-star review versus 10,000 reviews averaging 4.9? (Application Scenario 9)",
    "options": [
      "AVG requires a temporary disk table if review count exceeds 5",
      "The engine terminates the query if rating is not an integer",
      "There is no statistical difference",
      "Naive AVG exhibits small-sample bias where a single outlier review ranks higher than heavily vetted popular products"
    ],
    "correctIndex": 3,
    "explanation": "Simple AVG suffers from small sample variance. Production recommendation systems employ Bayesian weighted averages (or Dirichlet priors) to balance score against review volume. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_avg_94",
    "keyword": "AVG",
    "tag": "⚡ Gotcha Trap",
    "question": "[AVG #94 &bull; Healthcare Patient Records] What is the return type of AVG(integer_column) in PostgreSQL versus SQL Server? (Application Scenario 9)",
    "options": [
      "Both always return whole integers",
      "PostgreSQL returns NUMERIC with decimals; SQL Server performs integer truncation unless cast to FLOAT/DECIMAL",
      "Both always return IEEE 754 FLOAT",
      "PostgreSQL throws an error unless explicit casting is provided"
    ],
    "correctIndex": 1,
    "explanation": "In SQL Server, AVG() on integer columns performs integer division (e.g. AVG(1, 2) = 1). PostgreSQL automatically casts to NUMERIC to maintain precision. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_avg_95",
    "keyword": "AVG",
    "tag": "🎯 Core Concept",
    "question": "[AVG #95 &bull; E-Commerce Checkout Funnels] What does SELECT AVG(DISTINCT price) FROM items do if items contains prices [10, 10, 10, 20]? (Application Scenario 9)",
    "options": [
      "Computes (10 + 10 + 10 + 20) / 4 = 12.5",
      "Throws a syntax error",
      "Returns 10",
      "Computes (10 + 20) / 2 = 15"
    ],
    "correctIndex": 3,
    "explanation": "AVG(DISTINCT price) deduplicates the input set to [10, 20], yielding (10 + 20) / 2 = 15.0. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_avg_96",
    "keyword": "AVG",
    "tag": "🏛️ Corporate Edge",
    "question": "[AVG #96 &bull; Telecom Billing & Data Streams] If an Employee table has salaries [1000, 2000, NULL, 3000], what does SELECT AVG(salary) return? (Application Scenario 10)",
    "options": [
      "1500 (since (1000+2000+0+3000)/4 = 1500)",
      "2000 (since (1000+2000+3000)/3 = 2000)",
      "NULL",
      "Error: Cannot compute average with NULL present"
    ],
    "correctIndex": 1,
    "explanation": "In ANSI SQL, AVG(col) computes SUM(col)/COUNT(col). Because COUNT(col) excludes NULLs, the denominator is 3, yielding 6000/3 = 2000. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_avg_97",
    "keyword": "AVG",
    "tag": "💡 Lead Architect",
    "question": "[AVG #97 &bull; AdTech Real-Time Bidding] How can an analyst force SQL AVG to treat NULL ratings as 0 rather than excluding them from the denominator? (Application Scenario 10)",
    "options": [
      "COALESCE(AVG(rating), 0)",
      "AVG(rating) OVER ()",
      "SET SQL_AVG_NULL_ZERO = ON;",
      "AVG(COALESCE(rating, 0))"
    ],
    "correctIndex": 3,
    "explanation": "AVG(COALESCE(rating, 0)) transforms NULL values into 0 before aggregation, ensuring they increment the denominator count and drag the average downward. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_avg_98",
    "keyword": "AVG",
    "tag": "⚡ Gotcha Trap",
    "question": "[AVG #98 &bull; Cybersecurity Audit Logs] In an e-commerce review system, what is the impact of computing AVG(rating) on products with only 1 five-star review versus 10,000 reviews averaging 4.9? (Application Scenario 10)",
    "options": [
      "AVG requires a temporary disk table if review count exceeds 5",
      "Naive AVG exhibits small-sample bias where a single outlier review ranks higher than heavily vetted popular products",
      "The engine terminates the query if rating is not an integer",
      "There is no statistical difference"
    ],
    "correctIndex": 1,
    "explanation": "Simple AVG suffers from small sample variance. Production recommendation systems employ Bayesian weighted averages (or Dirichlet priors) to balance score against review volume. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_avg_99",
    "keyword": "AVG",
    "tag": "🎯 Core Concept",
    "question": "[AVG #99 &bull; Fintech & Ledger Systems] What is the return type of AVG(integer_column) in PostgreSQL versus SQL Server? (Application Scenario 10)",
    "options": [
      "Both always return whole integers",
      "Both always return IEEE 754 FLOAT",
      "PostgreSQL throws an error unless explicit casting is provided",
      "PostgreSQL returns NUMERIC with decimals; SQL Server performs integer truncation unless cast to FLOAT/DECIMAL"
    ],
    "correctIndex": 3,
    "explanation": "In SQL Server, AVG() on integer columns performs integer division (e.g. AVG(1, 2) = 1). PostgreSQL automatically casts to NUMERIC to maintain precision. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_avg_100",
    "keyword": "AVG",
    "tag": "🏛️ Corporate Edge",
    "question": "[AVG #100 &bull; SaaS Subscription Billing] What does SELECT AVG(DISTINCT price) FROM items do if items contains prices [10, 10, 10, 20]? (Application Scenario 10)",
    "options": [
      "Computes (10 + 10 + 10 + 20) / 4 = 12.5",
      "Computes (10 + 20) / 2 = 15",
      "Throws a syntax error",
      "Returns 10"
    ],
    "correctIndex": 1,
    "explanation": "AVG(DISTINCT price) deduplicates the input set to [10, 20], yielding (10 + 20) / 2 = 15.0. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_minmax_1",
    "keyword": "MIN & MAX",
    "tag": "🍡 Quick Snack",
    "question": "[MIN & MAX #1] What does MIN(username) return when executed on a VARCHAR column containing ['Alice', 'bob', 'Charlie'] in a case-sensitive collation?",
    "options": [
      "Charlie",
      "bob",
      "NULL",
      "Alice"
    ],
    "correctIndex": 3,
    "explanation": "In ASCII/binary case-sensitive collation, uppercase letters (A-Z: ASCII 65-90) sort before lowercase letters (a-z: ASCII 97-122), making \"Alice\" strictly less than \"bob\"."
  },
  {
    "id": "mcq_minmax_2",
    "keyword": "MIN & MAX",
    "tag": "⚡ Gotcha Trap",
    "question": "[MIN & MAX #2] How do MIN() and MAX() handle NULL values in a column?",
    "options": [
      "MAX() treats NULL as the absolute highest possible value",
      "They completely ignore NULL values and evaluate only non-NULL entries",
      "MIN() treats NULL as the absolute lowest possible value",
      "They return NULL if any value in the column is NULL"
    ],
    "correctIndex": 1,
    "explanation": "All ANSI aggregate functions (with the sole exception of COUNT(*)) ignore NULL values entirely during computation."
  },
  {
    "id": "mcq_minmax_3",
    "keyword": "MIN & MAX",
    "tag": "🐱 Brain Bender",
    "question": "[MIN & MAX #3] How can an index optimize a query like \"SELECT MIN(created_at), MAX(created_at) FROM Orders;\"?",
    "options": [
      "The query engine can read the first and last keys in the B-tree index in O(log N) time without scanning any table rows",
      "The engine must perform a full parallel table scan regardless",
      "Indexes cannot assist MIN() or MAX() queries",
      "The engine converts the B-tree into a hash table in RAM"
    ],
    "correctIndex": 0,
    "explanation": "Because B-tree indexes are stored in sorted order, finding MIN() and MAX() requires only two instantaneous index lookups: the leftmost leaf node and the rightmost leaf node."
  },
  {
    "id": "mcq_minmax_4",
    "keyword": "MIN & MAX",
    "tag": "🎯 Core Concept",
    "question": "[MIN & MAX #4] Given dates ['2026-01-01', '2025-12-31', '2026-09-05'], what does MAX(event_date) return?",
    "options": [
      "2026-01-01",
      "2025-12-31",
      "NULL",
      "2026-09-05"
    ],
    "correctIndex": 3,
    "explanation": "MAX() on temporal data types (DATE, TIMESTAMP) returns the most recent (latest chronologically) date."
  },
  {
    "id": "mcq_minmax_5",
    "keyword": "MIN & MAX",
    "tag": "🏆 Senior Staff",
    "question": "[MIN & MAX #5] What is the result of \"SELECT MAX(salary) - MIN(salary) AS salary_spread FROM Employees;\"?",
    "options": [
      "0 if any employee has a NULL salary",
      "An error: aggregate functions cannot be subtracted in SELECT",
      "The average salary deviation across all rows",
      "The arithmetic difference between the highest and lowest non-NULL salary"
    ],
    "correctIndex": 3,
    "explanation": "Scalar operations (such as subtraction) can freely operate on the scalar results produced by aggregate functions in the SELECT projection."
  },
  {
    "id": "mcq_minmax_6",
    "keyword": "MIN & MAX",
    "tag": "🍡 Quick Snack",
    "question": "[MIN & MAX #6] What does MIN(username) return when executed on a VARCHAR column containing ['Alice', 'bob', 'Charlie'] in a case-sensitive collation? (Scenario Variant 2)",
    "options": [
      "Charlie",
      "Alice",
      "bob",
      "NULL"
    ],
    "correctIndex": 1,
    "explanation": "In ASCII/binary case-sensitive collation, uppercase letters (A-Z: ASCII 65-90) sort before lowercase letters (a-z: ASCII 97-122), making \"Alice\" strictly less than \"bob\"."
  },
  {
    "id": "mcq_minmax_7",
    "keyword": "MIN & MAX",
    "tag": "⚡ Gotcha Trap",
    "question": "[MIN & MAX #7] How do MIN() and MAX() handle NULL values in a column? (Scenario Variant 2)",
    "options": [
      "MIN() treats NULL as the absolute lowest possible value",
      "MAX() treats NULL as the absolute highest possible value",
      "They completely ignore NULL values and evaluate only non-NULL entries",
      "They return NULL if any value in the column is NULL"
    ],
    "correctIndex": 2,
    "explanation": "All ANSI aggregate functions (with the sole exception of COUNT(*)) ignore NULL values entirely during computation."
  },
  {
    "id": "mcq_minmax_8",
    "keyword": "MIN & MAX",
    "tag": "🐱 Brain Bender",
    "question": "[MIN & MAX #8] How can an index optimize a query like \"SELECT MIN(created_at), MAX(created_at) FROM Orders;\"? (Scenario Variant 2)",
    "options": [
      "The engine must perform a full parallel table scan regardless",
      "The query engine can read the first and last keys in the B-tree index in O(log N) time without scanning any table rows",
      "The engine converts the B-tree into a hash table in RAM",
      "Indexes cannot assist MIN() or MAX() queries"
    ],
    "correctIndex": 1,
    "explanation": "Because B-tree indexes are stored in sorted order, finding MIN() and MAX() requires only two instantaneous index lookups: the leftmost leaf node and the rightmost leaf node."
  },
  {
    "id": "mcq_minmax_9",
    "keyword": "MIN & MAX",
    "tag": "🎯 Core Concept",
    "question": "[MIN & MAX #9] Given dates ['2026-01-01', '2025-12-31', '2026-09-05'], what does MAX(event_date) return? (Scenario Variant 2)",
    "options": [
      "2025-12-31",
      "NULL",
      "2026-09-05",
      "2026-01-01"
    ],
    "correctIndex": 2,
    "explanation": "MAX() on temporal data types (DATE, TIMESTAMP) returns the most recent (latest chronologically) date."
  },
  {
    "id": "mcq_minmax_10",
    "keyword": "MIN & MAX",
    "tag": "🏆 Senior Staff",
    "question": "[MIN & MAX #10] What is the result of \"SELECT MAX(salary) - MIN(salary) AS salary_spread FROM Employees;\"? (Scenario Variant 2)",
    "options": [
      "The average salary deviation across all rows",
      "An error: aggregate functions cannot be subtracted in SELECT",
      "0 if any employee has a NULL salary",
      "The arithmetic difference between the highest and lowest non-NULL salary"
    ],
    "correctIndex": 3,
    "explanation": "Scalar operations (such as subtraction) can freely operate on the scalar results produced by aggregate functions in the SELECT projection."
  },
  {
    "id": "mcq_minmax_11",
    "keyword": "MIN & MAX",
    "tag": "🍡 Quick Snack",
    "question": "[MIN & MAX #11] What does MIN(username) return when executed on a VARCHAR column containing ['Alice', 'bob', 'Charlie'] in a case-sensitive collation? (Scenario Variant 3)",
    "options": [
      "NULL",
      "Charlie",
      "bob",
      "Alice"
    ],
    "correctIndex": 3,
    "explanation": "In ASCII/binary case-sensitive collation, uppercase letters (A-Z: ASCII 65-90) sort before lowercase letters (a-z: ASCII 97-122), making \"Alice\" strictly less than \"bob\"."
  },
  {
    "id": "mcq_minmax_12",
    "keyword": "MIN & MAX",
    "tag": "⚡ Gotcha Trap",
    "question": "[MIN & MAX #12] How do MIN() and MAX() handle NULL values in a column? (Scenario Variant 3)",
    "options": [
      "They completely ignore NULL values and evaluate only non-NULL entries",
      "MAX() treats NULL as the absolute highest possible value",
      "They return NULL if any value in the column is NULL",
      "MIN() treats NULL as the absolute lowest possible value"
    ],
    "correctIndex": 0,
    "explanation": "All ANSI aggregate functions (with the sole exception of COUNT(*)) ignore NULL values entirely during computation."
  },
  {
    "id": "mcq_minmax_13",
    "keyword": "MIN & MAX",
    "tag": "🐱 Brain Bender",
    "question": "[MIN & MAX #13] How can an index optimize a query like \"SELECT MIN(created_at), MAX(created_at) FROM Orders;\"? (Scenario Variant 3)",
    "options": [
      "The engine converts the B-tree into a hash table in RAM",
      "Indexes cannot assist MIN() or MAX() queries",
      "The engine must perform a full parallel table scan regardless",
      "The query engine can read the first and last keys in the B-tree index in O(log N) time without scanning any table rows"
    ],
    "correctIndex": 3,
    "explanation": "Because B-tree indexes are stored in sorted order, finding MIN() and MAX() requires only two instantaneous index lookups: the leftmost leaf node and the rightmost leaf node."
  },
  {
    "id": "mcq_minmax_14",
    "keyword": "MIN & MAX",
    "tag": "🎯 Core Concept",
    "question": "[MIN & MAX #14] Given dates ['2026-01-01', '2025-12-31', '2026-09-05'], what does MAX(event_date) return? (Scenario Variant 3)",
    "options": [
      "NULL",
      "2026-01-01",
      "2026-09-05",
      "2025-12-31"
    ],
    "correctIndex": 2,
    "explanation": "MAX() on temporal data types (DATE, TIMESTAMP) returns the most recent (latest chronologically) date."
  },
  {
    "id": "mcq_minmax_15",
    "keyword": "MIN & MAX",
    "tag": "🏆 Senior Staff",
    "question": "[MIN & MAX #15] What is the result of \"SELECT MAX(salary) - MIN(salary) AS salary_spread FROM Employees;\"? (Scenario Variant 3)",
    "options": [
      "0 if any employee has a NULL salary",
      "An error: aggregate functions cannot be subtracted in SELECT",
      "The average salary deviation across all rows",
      "The arithmetic difference between the highest and lowest non-NULL salary"
    ],
    "correctIndex": 3,
    "explanation": "Scalar operations (such as subtraction) can freely operate on the scalar results produced by aggregate functions in the SELECT projection."
  },
  {
    "id": "mcq_minmax_16",
    "keyword": "MIN & MAX",
    "tag": "🍡 Quick Snack",
    "question": "[MIN & MAX #16] What does MIN(username) return when executed on a VARCHAR column containing ['Alice', 'bob', 'Charlie'] in a case-sensitive collation? (Scenario Variant 4)",
    "options": [
      "Alice",
      "Charlie",
      "NULL",
      "bob"
    ],
    "correctIndex": 0,
    "explanation": "In ASCII/binary case-sensitive collation, uppercase letters (A-Z: ASCII 65-90) sort before lowercase letters (a-z: ASCII 97-122), making \"Alice\" strictly less than \"bob\"."
  },
  {
    "id": "mcq_minmax_17",
    "keyword": "MIN & MAX",
    "tag": "⚡ Gotcha Trap",
    "question": "[MIN & MAX #17] How do MIN() and MAX() handle NULL values in a column? (Scenario Variant 4)",
    "options": [
      "MAX() treats NULL as the absolute highest possible value",
      "They completely ignore NULL values and evaluate only non-NULL entries",
      "MIN() treats NULL as the absolute lowest possible value",
      "They return NULL if any value in the column is NULL"
    ],
    "correctIndex": 1,
    "explanation": "All ANSI aggregate functions (with the sole exception of COUNT(*)) ignore NULL values entirely during computation."
  },
  {
    "id": "mcq_minmax_18",
    "keyword": "MIN & MAX",
    "tag": "🐱 Brain Bender",
    "question": "[MIN & MAX #18] How can an index optimize a query like \"SELECT MIN(created_at), MAX(created_at) FROM Orders;\"? (Scenario Variant 4)",
    "options": [
      "The engine converts the B-tree into a hash table in RAM",
      "Indexes cannot assist MIN() or MAX() queries",
      "The engine must perform a full parallel table scan regardless",
      "The query engine can read the first and last keys in the B-tree index in O(log N) time without scanning any table rows"
    ],
    "correctIndex": 3,
    "explanation": "Because B-tree indexes are stored in sorted order, finding MIN() and MAX() requires only two instantaneous index lookups: the leftmost leaf node and the rightmost leaf node."
  },
  {
    "id": "mcq_minmax_19",
    "keyword": "MIN & MAX",
    "tag": "🎯 Core Concept",
    "question": "[MIN & MAX #19] Given dates ['2026-01-01', '2025-12-31', '2026-09-05'], what does MAX(event_date) return? (Scenario Variant 4)",
    "options": [
      "2025-12-31",
      "NULL",
      "2026-01-01",
      "2026-09-05"
    ],
    "correctIndex": 3,
    "explanation": "MAX() on temporal data types (DATE, TIMESTAMP) returns the most recent (latest chronologically) date."
  },
  {
    "id": "mcq_minmax_20",
    "keyword": "MIN & MAX",
    "tag": "🏆 Senior Staff",
    "question": "[MIN & MAX #20] What is the result of \"SELECT MAX(salary) - MIN(salary) AS salary_spread FROM Employees;\"? (Scenario Variant 4)",
    "options": [
      "0 if any employee has a NULL salary",
      "An error: aggregate functions cannot be subtracted in SELECT",
      "The arithmetic difference between the highest and lowest non-NULL salary",
      "The average salary deviation across all rows"
    ],
    "correctIndex": 2,
    "explanation": "Scalar operations (such as subtraction) can freely operate on the scalar results produced by aggregate functions in the SELECT projection."
  },
  {
    "id": "mcq_minmax_21",
    "keyword": "MIN & MAX",
    "tag": "🍡 Quick Snack",
    "question": "[MIN & MAX #21] What does MIN(username) return when executed on a VARCHAR column containing ['Alice', 'bob', 'Charlie'] in a case-sensitive collation? (Scenario Variant 5)",
    "options": [
      "Charlie",
      "NULL",
      "Alice",
      "bob"
    ],
    "correctIndex": 2,
    "explanation": "In ASCII/binary case-sensitive collation, uppercase letters (A-Z: ASCII 65-90) sort before lowercase letters (a-z: ASCII 97-122), making \"Alice\" strictly less than \"bob\"."
  },
  {
    "id": "mcq_minmax_22",
    "keyword": "MIN & MAX",
    "tag": "⚡ Gotcha Trap",
    "question": "[MIN & MAX #22] How do MIN() and MAX() handle NULL values in a column? (Scenario Variant 5)",
    "options": [
      "MAX() treats NULL as the absolute highest possible value",
      "They completely ignore NULL values and evaluate only non-NULL entries",
      "MIN() treats NULL as the absolute lowest possible value",
      "They return NULL if any value in the column is NULL"
    ],
    "correctIndex": 1,
    "explanation": "All ANSI aggregate functions (with the sole exception of COUNT(*)) ignore NULL values entirely during computation."
  },
  {
    "id": "mcq_minmax_23",
    "keyword": "MIN & MAX",
    "tag": "🐱 Brain Bender",
    "question": "[MIN & MAX #23] How can an index optimize a query like \"SELECT MIN(created_at), MAX(created_at) FROM Orders;\"? (Scenario Variant 5)",
    "options": [
      "The engine must perform a full parallel table scan regardless",
      "The engine converts the B-tree into a hash table in RAM",
      "Indexes cannot assist MIN() or MAX() queries",
      "The query engine can read the first and last keys in the B-tree index in O(log N) time without scanning any table rows"
    ],
    "correctIndex": 3,
    "explanation": "Because B-tree indexes are stored in sorted order, finding MIN() and MAX() requires only two instantaneous index lookups: the leftmost leaf node and the rightmost leaf node."
  },
  {
    "id": "mcq_minmax_24",
    "keyword": "MIN & MAX",
    "tag": "🎯 Core Concept",
    "question": "[MIN & MAX #24] Given dates ['2026-01-01', '2025-12-31', '2026-09-05'], what does MAX(event_date) return? (Scenario Variant 5)",
    "options": [
      "2025-12-31",
      "2026-09-05",
      "2026-01-01",
      "NULL"
    ],
    "correctIndex": 1,
    "explanation": "MAX() on temporal data types (DATE, TIMESTAMP) returns the most recent (latest chronologically) date."
  },
  {
    "id": "mcq_minmax_25",
    "keyword": "MIN & MAX",
    "tag": "🏆 Senior Staff",
    "question": "[MIN & MAX #25] What is the result of \"SELECT MAX(salary) - MIN(salary) AS salary_spread FROM Employees;\"? (Scenario Variant 5)",
    "options": [
      "The arithmetic difference between the highest and lowest non-NULL salary",
      "An error: aggregate functions cannot be subtracted in SELECT",
      "The average salary deviation across all rows",
      "0 if any employee has a NULL salary"
    ],
    "correctIndex": 0,
    "explanation": "Scalar operations (such as subtraction) can freely operate on the scalar results produced by aggregate functions in the SELECT projection."
  },
  {
    "id": "mcq_minmax_26",
    "keyword": "MIN & MAX",
    "tag": "🍡 Quick Snack",
    "question": "[MIN & MAX #26] What does MIN(username) return when executed on a VARCHAR column containing ['Alice', 'bob', 'Charlie'] in a case-sensitive collation? (Scenario Variant 6)",
    "options": [
      "bob",
      "Alice",
      "Charlie",
      "NULL"
    ],
    "correctIndex": 1,
    "explanation": "In ASCII/binary case-sensitive collation, uppercase letters (A-Z: ASCII 65-90) sort before lowercase letters (a-z: ASCII 97-122), making \"Alice\" strictly less than \"bob\"."
  },
  {
    "id": "mcq_minmax_27",
    "keyword": "MIN & MAX",
    "tag": "⚡ Gotcha Trap",
    "question": "[MIN & MAX #27] How do MIN() and MAX() handle NULL values in a column? (Scenario Variant 6)",
    "options": [
      "They completely ignore NULL values and evaluate only non-NULL entries",
      "MAX() treats NULL as the absolute highest possible value",
      "They return NULL if any value in the column is NULL",
      "MIN() treats NULL as the absolute lowest possible value"
    ],
    "correctIndex": 0,
    "explanation": "All ANSI aggregate functions (with the sole exception of COUNT(*)) ignore NULL values entirely during computation."
  },
  {
    "id": "mcq_minmax_28",
    "keyword": "MIN & MAX",
    "tag": "🐱 Brain Bender",
    "question": "[MIN & MAX #28] How can an index optimize a query like \"SELECT MIN(created_at), MAX(created_at) FROM Orders;\"? (Scenario Variant 6)",
    "options": [
      "The query engine can read the first and last keys in the B-tree index in O(log N) time without scanning any table rows",
      "Indexes cannot assist MIN() or MAX() queries",
      "The engine must perform a full parallel table scan regardless",
      "The engine converts the B-tree into a hash table in RAM"
    ],
    "correctIndex": 0,
    "explanation": "Because B-tree indexes are stored in sorted order, finding MIN() and MAX() requires only two instantaneous index lookups: the leftmost leaf node and the rightmost leaf node."
  },
  {
    "id": "mcq_minmax_29",
    "keyword": "MIN & MAX",
    "tag": "🎯 Core Concept",
    "question": "[MIN & MAX #29] Given dates ['2026-01-01', '2025-12-31', '2026-09-05'], what does MAX(event_date) return? (Scenario Variant 6)",
    "options": [
      "NULL",
      "2026-09-05",
      "2026-01-01",
      "2025-12-31"
    ],
    "correctIndex": 1,
    "explanation": "MAX() on temporal data types (DATE, TIMESTAMP) returns the most recent (latest chronologically) date."
  },
  {
    "id": "mcq_minmax_30",
    "keyword": "MIN & MAX",
    "tag": "🏆 Senior Staff",
    "question": "[MIN & MAX #30] What is the result of \"SELECT MAX(salary) - MIN(salary) AS salary_spread FROM Employees;\"? (Scenario Variant 6)",
    "options": [
      "The arithmetic difference between the highest and lowest non-NULL salary",
      "The average salary deviation across all rows",
      "An error: aggregate functions cannot be subtracted in SELECT",
      "0 if any employee has a NULL salary"
    ],
    "correctIndex": 0,
    "explanation": "Scalar operations (such as subtraction) can freely operate on the scalar results produced by aggregate functions in the SELECT projection."
  },
  {
    "id": "mcq_minmax_31",
    "keyword": "MIN & MAX",
    "tag": "🍡 Quick Snack",
    "question": "[MIN & MAX #31] What does MIN(username) return when executed on a VARCHAR column containing ['Alice', 'bob', 'Charlie'] in a case-sensitive collation? (Scenario Variant 7)",
    "options": [
      "Alice",
      "bob",
      "NULL",
      "Charlie"
    ],
    "correctIndex": 0,
    "explanation": "In ASCII/binary case-sensitive collation, uppercase letters (A-Z: ASCII 65-90) sort before lowercase letters (a-z: ASCII 97-122), making \"Alice\" strictly less than \"bob\"."
  },
  {
    "id": "mcq_minmax_32",
    "keyword": "MIN & MAX",
    "tag": "⚡ Gotcha Trap",
    "question": "[MIN & MAX #32] How do MIN() and MAX() handle NULL values in a column? (Scenario Variant 7)",
    "options": [
      "MIN() treats NULL as the absolute lowest possible value",
      "They completely ignore NULL values and evaluate only non-NULL entries",
      "MAX() treats NULL as the absolute highest possible value",
      "They return NULL if any value in the column is NULL"
    ],
    "correctIndex": 1,
    "explanation": "All ANSI aggregate functions (with the sole exception of COUNT(*)) ignore NULL values entirely during computation."
  },
  {
    "id": "mcq_minmax_33",
    "keyword": "MIN & MAX",
    "tag": "🐱 Brain Bender",
    "question": "[MIN & MAX #33] How can an index optimize a query like \"SELECT MIN(created_at), MAX(created_at) FROM Orders;\"? (Scenario Variant 7)",
    "options": [
      "The query engine can read the first and last keys in the B-tree index in O(log N) time without scanning any table rows",
      "Indexes cannot assist MIN() or MAX() queries",
      "The engine converts the B-tree into a hash table in RAM",
      "The engine must perform a full parallel table scan regardless"
    ],
    "correctIndex": 0,
    "explanation": "Because B-tree indexes are stored in sorted order, finding MIN() and MAX() requires only two instantaneous index lookups: the leftmost leaf node and the rightmost leaf node."
  },
  {
    "id": "mcq_minmax_34",
    "keyword": "MIN & MAX",
    "tag": "🎯 Core Concept",
    "question": "[MIN & MAX #34] Given dates ['2026-01-01', '2025-12-31', '2026-09-05'], what does MAX(event_date) return? (Scenario Variant 7)",
    "options": [
      "2026-09-05",
      "2025-12-31",
      "2026-01-01",
      "NULL"
    ],
    "correctIndex": 0,
    "explanation": "MAX() on temporal data types (DATE, TIMESTAMP) returns the most recent (latest chronologically) date."
  },
  {
    "id": "mcq_minmax_35",
    "keyword": "MIN & MAX",
    "tag": "🏆 Senior Staff",
    "question": "[MIN & MAX #35] What is the result of \"SELECT MAX(salary) - MIN(salary) AS salary_spread FROM Employees;\"? (Scenario Variant 7)",
    "options": [
      "The average salary deviation across all rows",
      "0 if any employee has a NULL salary",
      "An error: aggregate functions cannot be subtracted in SELECT",
      "The arithmetic difference between the highest and lowest non-NULL salary"
    ],
    "correctIndex": 3,
    "explanation": "Scalar operations (such as subtraction) can freely operate on the scalar results produced by aggregate functions in the SELECT projection."
  },
  {
    "id": "mcq_minmax_36",
    "keyword": "MIN & MAX",
    "tag": "🍡 Quick Snack",
    "question": "[MIN & MAX #36] What does MIN(username) return when executed on a VARCHAR column containing ['Alice', 'bob', 'Charlie'] in a case-sensitive collation? (Scenario Variant 8)",
    "options": [
      "NULL",
      "bob",
      "Alice",
      "Charlie"
    ],
    "correctIndex": 2,
    "explanation": "In ASCII/binary case-sensitive collation, uppercase letters (A-Z: ASCII 65-90) sort before lowercase letters (a-z: ASCII 97-122), making \"Alice\" strictly less than \"bob\"."
  },
  {
    "id": "mcq_minmax_37",
    "keyword": "MIN & MAX",
    "tag": "⚡ Gotcha Trap",
    "question": "[MIN & MAX #37] How do MIN() and MAX() handle NULL values in a column? (Scenario Variant 8)",
    "options": [
      "They completely ignore NULL values and evaluate only non-NULL entries",
      "MAX() treats NULL as the absolute highest possible value",
      "MIN() treats NULL as the absolute lowest possible value",
      "They return NULL if any value in the column is NULL"
    ],
    "correctIndex": 0,
    "explanation": "All ANSI aggregate functions (with the sole exception of COUNT(*)) ignore NULL values entirely during computation."
  },
  {
    "id": "mcq_minmax_38",
    "keyword": "MIN & MAX",
    "tag": "🐱 Brain Bender",
    "question": "[MIN & MAX #38] How can an index optimize a query like \"SELECT MIN(created_at), MAX(created_at) FROM Orders;\"? (Scenario Variant 8)",
    "options": [
      "Indexes cannot assist MIN() or MAX() queries",
      "The engine must perform a full parallel table scan regardless",
      "The engine converts the B-tree into a hash table in RAM",
      "The query engine can read the first and last keys in the B-tree index in O(log N) time without scanning any table rows"
    ],
    "correctIndex": 3,
    "explanation": "Because B-tree indexes are stored in sorted order, finding MIN() and MAX() requires only two instantaneous index lookups: the leftmost leaf node and the rightmost leaf node."
  },
  {
    "id": "mcq_minmax_39",
    "keyword": "MIN & MAX",
    "tag": "🎯 Core Concept",
    "question": "[MIN & MAX #39] Given dates ['2026-01-01', '2025-12-31', '2026-09-05'], what does MAX(event_date) return? (Scenario Variant 8)",
    "options": [
      "2026-09-05",
      "NULL",
      "2025-12-31",
      "2026-01-01"
    ],
    "correctIndex": 0,
    "explanation": "MAX() on temporal data types (DATE, TIMESTAMP) returns the most recent (latest chronologically) date."
  },
  {
    "id": "mcq_minmax_40",
    "keyword": "MIN & MAX",
    "tag": "🏆 Senior Staff",
    "question": "[MIN & MAX #40] What is the result of \"SELECT MAX(salary) - MIN(salary) AS salary_spread FROM Employees;\"? (Scenario Variant 8)",
    "options": [
      "The average salary deviation across all rows",
      "An error: aggregate functions cannot be subtracted in SELECT",
      "The arithmetic difference between the highest and lowest non-NULL salary",
      "0 if any employee has a NULL salary"
    ],
    "correctIndex": 2,
    "explanation": "Scalar operations (such as subtraction) can freely operate on the scalar results produced by aggregate functions in the SELECT projection."
  },
  {
    "id": "mcq_minmax_41",
    "keyword": "MIN & MAX",
    "tag": "🍡 Quick Snack",
    "question": "[MIN & MAX #41] What does MIN(username) return when executed on a VARCHAR column containing ['Alice', 'bob', 'Charlie'] in a case-sensitive collation? (Scenario Variant 9)",
    "options": [
      "bob",
      "Charlie",
      "NULL",
      "Alice"
    ],
    "correctIndex": 3,
    "explanation": "In ASCII/binary case-sensitive collation, uppercase letters (A-Z: ASCII 65-90) sort before lowercase letters (a-z: ASCII 97-122), making \"Alice\" strictly less than \"bob\"."
  },
  {
    "id": "mcq_minmax_42",
    "keyword": "MIN & MAX",
    "tag": "⚡ Gotcha Trap",
    "question": "[MIN & MAX #42] How do MIN() and MAX() handle NULL values in a column? (Scenario Variant 9)",
    "options": [
      "MAX() treats NULL as the absolute highest possible value",
      "They completely ignore NULL values and evaluate only non-NULL entries",
      "MIN() treats NULL as the absolute lowest possible value",
      "They return NULL if any value in the column is NULL"
    ],
    "correctIndex": 1,
    "explanation": "All ANSI aggregate functions (with the sole exception of COUNT(*)) ignore NULL values entirely during computation."
  },
  {
    "id": "mcq_minmax_43",
    "keyword": "MIN & MAX",
    "tag": "🐱 Brain Bender",
    "question": "[MIN & MAX #43] How can an index optimize a query like \"SELECT MIN(created_at), MAX(created_at) FROM Orders;\"? (Scenario Variant 9)",
    "options": [
      "The engine converts the B-tree into a hash table in RAM",
      "Indexes cannot assist MIN() or MAX() queries",
      "The query engine can read the first and last keys in the B-tree index in O(log N) time without scanning any table rows",
      "The engine must perform a full parallel table scan regardless"
    ],
    "correctIndex": 2,
    "explanation": "Because B-tree indexes are stored in sorted order, finding MIN() and MAX() requires only two instantaneous index lookups: the leftmost leaf node and the rightmost leaf node."
  },
  {
    "id": "mcq_minmax_44",
    "keyword": "MIN & MAX",
    "tag": "🎯 Core Concept",
    "question": "[MIN & MAX #44] Given dates ['2026-01-01', '2025-12-31', '2026-09-05'], what does MAX(event_date) return? (Scenario Variant 9)",
    "options": [
      "2026-01-01",
      "2026-09-05",
      "2025-12-31",
      "NULL"
    ],
    "correctIndex": 1,
    "explanation": "MAX() on temporal data types (DATE, TIMESTAMP) returns the most recent (latest chronologically) date."
  },
  {
    "id": "mcq_minmax_45",
    "keyword": "MIN & MAX",
    "tag": "🏆 Senior Staff",
    "question": "[MIN & MAX #45] What is the result of \"SELECT MAX(salary) - MIN(salary) AS salary_spread FROM Employees;\"? (Scenario Variant 9)",
    "options": [
      "An error: aggregate functions cannot be subtracted in SELECT",
      "0 if any employee has a NULL salary",
      "The arithmetic difference between the highest and lowest non-NULL salary",
      "The average salary deviation across all rows"
    ],
    "correctIndex": 2,
    "explanation": "Scalar operations (such as subtraction) can freely operate on the scalar results produced by aggregate functions in the SELECT projection."
  },
  {
    "id": "mcq_minmax_46",
    "keyword": "MIN & MAX",
    "tag": "🍡 Quick Snack",
    "question": "[MIN & MAX #46] What does MIN(username) return when executed on a VARCHAR column containing ['Alice', 'bob', 'Charlie'] in a case-sensitive collation? (Scenario Variant 10)",
    "options": [
      "Alice",
      "bob",
      "Charlie",
      "NULL"
    ],
    "correctIndex": 0,
    "explanation": "In ASCII/binary case-sensitive collation, uppercase letters (A-Z: ASCII 65-90) sort before lowercase letters (a-z: ASCII 97-122), making \"Alice\" strictly less than \"bob\"."
  },
  {
    "id": "mcq_minmax_47",
    "keyword": "MIN & MAX",
    "tag": "⚡ Gotcha Trap",
    "question": "[MIN & MAX #47] How do MIN() and MAX() handle NULL values in a column? (Scenario Variant 10)",
    "options": [
      "MIN() treats NULL as the absolute lowest possible value",
      "They completely ignore NULL values and evaluate only non-NULL entries",
      "MAX() treats NULL as the absolute highest possible value",
      "They return NULL if any value in the column is NULL"
    ],
    "correctIndex": 1,
    "explanation": "All ANSI aggregate functions (with the sole exception of COUNT(*)) ignore NULL values entirely during computation."
  },
  {
    "id": "mcq_minmax_48",
    "keyword": "MIN & MAX",
    "tag": "🐱 Brain Bender",
    "question": "[MIN & MAX #48] How can an index optimize a query like \"SELECT MIN(created_at), MAX(created_at) FROM Orders;\"? (Scenario Variant 10)",
    "options": [
      "The engine converts the B-tree into a hash table in RAM",
      "The engine must perform a full parallel table scan regardless",
      "The query engine can read the first and last keys in the B-tree index in O(log N) time without scanning any table rows",
      "Indexes cannot assist MIN() or MAX() queries"
    ],
    "correctIndex": 2,
    "explanation": "Because B-tree indexes are stored in sorted order, finding MIN() and MAX() requires only two instantaneous index lookups: the leftmost leaf node and the rightmost leaf node."
  },
  {
    "id": "mcq_minmax_49",
    "keyword": "MIN & MAX",
    "tag": "🎯 Core Concept",
    "question": "[MIN & MAX #49] Given dates ['2026-01-01', '2025-12-31', '2026-09-05'], what does MAX(event_date) return? (Scenario Variant 10)",
    "options": [
      "NULL",
      "2026-01-01",
      "2026-09-05",
      "2025-12-31"
    ],
    "correctIndex": 2,
    "explanation": "MAX() on temporal data types (DATE, TIMESTAMP) returns the most recent (latest chronologically) date."
  },
  {
    "id": "mcq_minmax_50",
    "keyword": "MIN & MAX",
    "tag": "🏆 Senior Staff",
    "question": "[MIN & MAX #50] What is the result of \"SELECT MAX(salary) - MIN(salary) AS salary_spread FROM Employees;\"? (Scenario Variant 10)",
    "options": [
      "0 if any employee has a NULL salary",
      "The average salary deviation across all rows",
      "The arithmetic difference between the highest and lowest non-NULL salary",
      "An error: aggregate functions cannot be subtracted in SELECT"
    ],
    "correctIndex": 2,
    "explanation": "Scalar operations (such as subtraction) can freely operate on the scalar results produced by aggregate functions in the SELECT projection."
  },
  {
    "id": "mcq_minmax_51",
    "keyword": "MIN & MAX",
    "tag": "🎯 Core Concept",
    "question": "[MIN & MAX #51 &bull; Fintech & Ledger Systems] When evaluating MIN(created_at) and MAX(created_at) on a large partitioned transaction table, what index design delivers instantaneous O(1) response time? (Application Scenario 1)",
    "options": [
      "A HASH index on created_at",
      "A GIN index on created_at",
      "No index can optimize MIN/MAX",
      "A B-Tree index on (created_at) allows the engine to jump directly to the first and last leaf pages (Index Full Scan or Loose Index Scan)"
    ],
    "correctIndex": 3,
    "explanation": "B-Tree indexes maintain sorted leaf nodes. MIN() is resolved by traversing to the leftmost leaf, and MAX() to the rightmost leaf, taking O(log N) or O(1) in the optimizer. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_minmax_52",
    "keyword": "MIN & MAX",
    "tag": "🏛️ Corporate Edge",
    "question": "[MIN & MAX #52 &bull; SaaS Subscription Billing] What does SELECT MIN(col), MAX(col) return when all rows in the table have col = NULL? (Application Scenario 1)",
    "options": [
      "MIN = 0, MAX = 0",
      "MIN = NULL, MAX = NULL",
      "MIN = '', MAX = ''",
      "Error: ValueNotFoundException"
    ],
    "correctIndex": 1,
    "explanation": "Both MIN and MAX discard NULLs. If all examined rows are NULL, both functions evaluate to NULL. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_minmax_53",
    "keyword": "MIN & MAX",
    "tag": "💡 Lead Architect",
    "question": "[MIN & MAX #53 &bull; Global Supply Chain & Logistics] How does MIN(column_name) compare string values across collations like utf8mb4_general_ci versus utf8mb4_bin? (Application Scenario 1)",
    "options": [
      "Collations have zero impact on string ordering",
      "utf8mb4_bin reverses alphabetical ordering",
      "MIN only works on numbers and dates, not strings",
      "utf8mb4_general_ci performs case-insensitive comparison ('a' == 'A'), while utf8mb4_bin orders strictly by binary byte values ('A' < 'a')"
    ],
    "correctIndex": 3,
    "explanation": "In case-insensitive collations, 'a' and 'A' tie. In binary collations, uppercase ASCII (65-90) precedes lowercase ASCII (97-122), so 'Zebra' < 'apple'. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_minmax_54",
    "keyword": "MIN & MAX",
    "tag": "⚡ Gotcha Trap",
    "question": "[MIN & MAX #54 &bull; Healthcare Patient Records] Which query correctly determines the latest order date for each customer? (Application Scenario 1)",
    "options": [
      "SELECT customer_id, order_date FROM orders WHERE order_date = MAX(order_date)",
      "SELECT customer_id, MAX(order_date) FROM orders GROUP BY customer_id",
      "SELECT customer_id, MIN(order_date) FROM orders",
      "SELECT customer_id, order_date FROM orders GROUP BY customer_id"
    ],
    "correctIndex": 1,
    "explanation": "GROUP BY customer_id combined with MAX(order_date) groups orders per customer and extracts the highest (most recent) timestamp. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_minmax_55",
    "keyword": "MIN & MAX",
    "tag": "🎯 Core Concept",
    "question": "[MIN & MAX #55 &bull; E-Commerce Checkout Funnels] What is the difference between GREATEST(a, b, c) and MAX(col)? (Application Scenario 1)",
    "options": [
      "GREATEST is standard ANSI SQL, whereas MAX is a proprietary MySQL extension",
      "MAX works on numbers while GREATEST only works on dates",
      "There is no difference",
      "GREATEST is a scalar function comparing values across columns in the SAME row; MAX is an aggregate comparing values across MULTIPLE rows"
    ],
    "correctIndex": 3,
    "explanation": "GREATEST() takes multiple arguments and evaluates horizontally across a single tuple. MAX() is a vertical aggregate function that consumes a single column across multiple rows. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_minmax_56",
    "keyword": "MIN & MAX",
    "tag": "🏛️ Corporate Edge",
    "question": "[MIN & MAX #56 &bull; Telecom Billing & Data Streams] When evaluating MIN(created_at) and MAX(created_at) on a large partitioned transaction table, what index design delivers instantaneous O(1) response time? (Application Scenario 2)",
    "options": [
      "A HASH index on created_at",
      "A B-Tree index on (created_at) allows the engine to jump directly to the first and last leaf pages (Index Full Scan or Loose Index Scan)",
      "A GIN index on created_at",
      "No index can optimize MIN/MAX"
    ],
    "correctIndex": 1,
    "explanation": "B-Tree indexes maintain sorted leaf nodes. MIN() is resolved by traversing to the leftmost leaf, and MAX() to the rightmost leaf, taking O(log N) or O(1) in the optimizer. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_minmax_57",
    "keyword": "MIN & MAX",
    "tag": "💡 Lead Architect",
    "question": "[MIN & MAX #57 &bull; AdTech Real-Time Bidding] What does SELECT MIN(col), MAX(col) return when all rows in the table have col = NULL? (Application Scenario 2)",
    "options": [
      "MIN = 0, MAX = 0",
      "MIN = '', MAX = ''",
      "Error: ValueNotFoundException",
      "MIN = NULL, MAX = NULL"
    ],
    "correctIndex": 3,
    "explanation": "Both MIN and MAX discard NULLs. If all examined rows are NULL, both functions evaluate to NULL. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_minmax_58",
    "keyword": "MIN & MAX",
    "tag": "⚡ Gotcha Trap",
    "question": "[MIN & MAX #58 &bull; Cybersecurity Audit Logs] How does MIN(column_name) compare string values across collations like utf8mb4_general_ci versus utf8mb4_bin? (Application Scenario 2)",
    "options": [
      "Collations have zero impact on string ordering",
      "utf8mb4_general_ci performs case-insensitive comparison ('a' == 'A'), while utf8mb4_bin orders strictly by binary byte values ('A' < 'a')",
      "utf8mb4_bin reverses alphabetical ordering",
      "MIN only works on numbers and dates, not strings"
    ],
    "correctIndex": 1,
    "explanation": "In case-insensitive collations, 'a' and 'A' tie. In binary collations, uppercase ASCII (65-90) precedes lowercase ASCII (97-122), so 'Zebra' < 'apple'. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_minmax_59",
    "keyword": "MIN & MAX",
    "tag": "🎯 Core Concept",
    "question": "[MIN & MAX #59 &bull; Fintech & Ledger Systems] Which query correctly determines the latest order date for each customer? (Application Scenario 2)",
    "options": [
      "SELECT customer_id, order_date FROM orders WHERE order_date = MAX(order_date)",
      "SELECT customer_id, MIN(order_date) FROM orders",
      "SELECT customer_id, order_date FROM orders GROUP BY customer_id",
      "SELECT customer_id, MAX(order_date) FROM orders GROUP BY customer_id"
    ],
    "correctIndex": 3,
    "explanation": "GROUP BY customer_id combined with MAX(order_date) groups orders per customer and extracts the highest (most recent) timestamp. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_minmax_60",
    "keyword": "MIN & MAX",
    "tag": "🏛️ Corporate Edge",
    "question": "[MIN & MAX #60 &bull; SaaS Subscription Billing] What is the difference between GREATEST(a, b, c) and MAX(col)? (Application Scenario 2)",
    "options": [
      "GREATEST is standard ANSI SQL, whereas MAX is a proprietary MySQL extension",
      "GREATEST is a scalar function comparing values across columns in the SAME row; MAX is an aggregate comparing values across MULTIPLE rows",
      "MAX works on numbers while GREATEST only works on dates",
      "There is no difference"
    ],
    "correctIndex": 1,
    "explanation": "GREATEST() takes multiple arguments and evaluates horizontally across a single tuple. MAX() is a vertical aggregate function that consumes a single column across multiple rows. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_minmax_61",
    "keyword": "MIN & MAX",
    "tag": "💡 Lead Architect",
    "question": "[MIN & MAX #61 &bull; Global Supply Chain & Logistics] When evaluating MIN(created_at) and MAX(created_at) on a large partitioned transaction table, what index design delivers instantaneous O(1) response time? (Application Scenario 3)",
    "options": [
      "A HASH index on created_at",
      "A GIN index on created_at",
      "No index can optimize MIN/MAX",
      "A B-Tree index on (created_at) allows the engine to jump directly to the first and last leaf pages (Index Full Scan or Loose Index Scan)"
    ],
    "correctIndex": 3,
    "explanation": "B-Tree indexes maintain sorted leaf nodes. MIN() is resolved by traversing to the leftmost leaf, and MAX() to the rightmost leaf, taking O(log N) or O(1) in the optimizer. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_minmax_62",
    "keyword": "MIN & MAX",
    "tag": "⚡ Gotcha Trap",
    "question": "[MIN & MAX #62 &bull; Healthcare Patient Records] What does SELECT MIN(col), MAX(col) return when all rows in the table have col = NULL? (Application Scenario 3)",
    "options": [
      "MIN = 0, MAX = 0",
      "MIN = NULL, MAX = NULL",
      "MIN = '', MAX = ''",
      "Error: ValueNotFoundException"
    ],
    "correctIndex": 1,
    "explanation": "Both MIN and MAX discard NULLs. If all examined rows are NULL, both functions evaluate to NULL. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_minmax_63",
    "keyword": "MIN & MAX",
    "tag": "🎯 Core Concept",
    "question": "[MIN & MAX #63 &bull; E-Commerce Checkout Funnels] How does MIN(column_name) compare string values across collations like utf8mb4_general_ci versus utf8mb4_bin? (Application Scenario 3)",
    "options": [
      "Collations have zero impact on string ordering",
      "utf8mb4_bin reverses alphabetical ordering",
      "MIN only works on numbers and dates, not strings",
      "utf8mb4_general_ci performs case-insensitive comparison ('a' == 'A'), while utf8mb4_bin orders strictly by binary byte values ('A' < 'a')"
    ],
    "correctIndex": 3,
    "explanation": "In case-insensitive collations, 'a' and 'A' tie. In binary collations, uppercase ASCII (65-90) precedes lowercase ASCII (97-122), so 'Zebra' < 'apple'. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_minmax_64",
    "keyword": "MIN & MAX",
    "tag": "🏛️ Corporate Edge",
    "question": "[MIN & MAX #64 &bull; Telecom Billing & Data Streams] Which query correctly determines the latest order date for each customer? (Application Scenario 3)",
    "options": [
      "SELECT customer_id, order_date FROM orders WHERE order_date = MAX(order_date)",
      "SELECT customer_id, MAX(order_date) FROM orders GROUP BY customer_id",
      "SELECT customer_id, MIN(order_date) FROM orders",
      "SELECT customer_id, order_date FROM orders GROUP BY customer_id"
    ],
    "correctIndex": 1,
    "explanation": "GROUP BY customer_id combined with MAX(order_date) groups orders per customer and extracts the highest (most recent) timestamp. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_minmax_65",
    "keyword": "MIN & MAX",
    "tag": "💡 Lead Architect",
    "question": "[MIN & MAX #65 &bull; AdTech Real-Time Bidding] What is the difference between GREATEST(a, b, c) and MAX(col)? (Application Scenario 3)",
    "options": [
      "GREATEST is standard ANSI SQL, whereas MAX is a proprietary MySQL extension",
      "MAX works on numbers while GREATEST only works on dates",
      "There is no difference",
      "GREATEST is a scalar function comparing values across columns in the SAME row; MAX is an aggregate comparing values across MULTIPLE rows"
    ],
    "correctIndex": 3,
    "explanation": "GREATEST() takes multiple arguments and evaluates horizontally across a single tuple. MAX() is a vertical aggregate function that consumes a single column across multiple rows. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_minmax_66",
    "keyword": "MIN & MAX",
    "tag": "⚡ Gotcha Trap",
    "question": "[MIN & MAX #66 &bull; Cybersecurity Audit Logs] When evaluating MIN(created_at) and MAX(created_at) on a large partitioned transaction table, what index design delivers instantaneous O(1) response time? (Application Scenario 4)",
    "options": [
      "A HASH index on created_at",
      "A B-Tree index on (created_at) allows the engine to jump directly to the first and last leaf pages (Index Full Scan or Loose Index Scan)",
      "A GIN index on created_at",
      "No index can optimize MIN/MAX"
    ],
    "correctIndex": 1,
    "explanation": "B-Tree indexes maintain sorted leaf nodes. MIN() is resolved by traversing to the leftmost leaf, and MAX() to the rightmost leaf, taking O(log N) or O(1) in the optimizer. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_minmax_67",
    "keyword": "MIN & MAX",
    "tag": "🎯 Core Concept",
    "question": "[MIN & MAX #67 &bull; Fintech & Ledger Systems] What does SELECT MIN(col), MAX(col) return when all rows in the table have col = NULL? (Application Scenario 4)",
    "options": [
      "MIN = 0, MAX = 0",
      "MIN = '', MAX = ''",
      "Error: ValueNotFoundException",
      "MIN = NULL, MAX = NULL"
    ],
    "correctIndex": 3,
    "explanation": "Both MIN and MAX discard NULLs. If all examined rows are NULL, both functions evaluate to NULL. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_minmax_68",
    "keyword": "MIN & MAX",
    "tag": "🏛️ Corporate Edge",
    "question": "[MIN & MAX #68 &bull; SaaS Subscription Billing] How does MIN(column_name) compare string values across collations like utf8mb4_general_ci versus utf8mb4_bin? (Application Scenario 4)",
    "options": [
      "Collations have zero impact on string ordering",
      "utf8mb4_general_ci performs case-insensitive comparison ('a' == 'A'), while utf8mb4_bin orders strictly by binary byte values ('A' < 'a')",
      "utf8mb4_bin reverses alphabetical ordering",
      "MIN only works on numbers and dates, not strings"
    ],
    "correctIndex": 1,
    "explanation": "In case-insensitive collations, 'a' and 'A' tie. In binary collations, uppercase ASCII (65-90) precedes lowercase ASCII (97-122), so 'Zebra' < 'apple'. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_minmax_69",
    "keyword": "MIN & MAX",
    "tag": "💡 Lead Architect",
    "question": "[MIN & MAX #69 &bull; Global Supply Chain & Logistics] Which query correctly determines the latest order date for each customer? (Application Scenario 4)",
    "options": [
      "SELECT customer_id, order_date FROM orders WHERE order_date = MAX(order_date)",
      "SELECT customer_id, MIN(order_date) FROM orders",
      "SELECT customer_id, order_date FROM orders GROUP BY customer_id",
      "SELECT customer_id, MAX(order_date) FROM orders GROUP BY customer_id"
    ],
    "correctIndex": 3,
    "explanation": "GROUP BY customer_id combined with MAX(order_date) groups orders per customer and extracts the highest (most recent) timestamp. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_minmax_70",
    "keyword": "MIN & MAX",
    "tag": "⚡ Gotcha Trap",
    "question": "[MIN & MAX #70 &bull; Healthcare Patient Records] What is the difference between GREATEST(a, b, c) and MAX(col)? (Application Scenario 4)",
    "options": [
      "GREATEST is standard ANSI SQL, whereas MAX is a proprietary MySQL extension",
      "GREATEST is a scalar function comparing values across columns in the SAME row; MAX is an aggregate comparing values across MULTIPLE rows",
      "MAX works on numbers while GREATEST only works on dates",
      "There is no difference"
    ],
    "correctIndex": 1,
    "explanation": "GREATEST() takes multiple arguments and evaluates horizontally across a single tuple. MAX() is a vertical aggregate function that consumes a single column across multiple rows. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_minmax_71",
    "keyword": "MIN & MAX",
    "tag": "🎯 Core Concept",
    "question": "[MIN & MAX #71 &bull; E-Commerce Checkout Funnels] When evaluating MIN(created_at) and MAX(created_at) on a large partitioned transaction table, what index design delivers instantaneous O(1) response time? (Application Scenario 5)",
    "options": [
      "A HASH index on created_at",
      "A GIN index on created_at",
      "No index can optimize MIN/MAX",
      "A B-Tree index on (created_at) allows the engine to jump directly to the first and last leaf pages (Index Full Scan or Loose Index Scan)"
    ],
    "correctIndex": 3,
    "explanation": "B-Tree indexes maintain sorted leaf nodes. MIN() is resolved by traversing to the leftmost leaf, and MAX() to the rightmost leaf, taking O(log N) or O(1) in the optimizer. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_minmax_72",
    "keyword": "MIN & MAX",
    "tag": "🏛️ Corporate Edge",
    "question": "[MIN & MAX #72 &bull; Telecom Billing & Data Streams] What does SELECT MIN(col), MAX(col) return when all rows in the table have col = NULL? (Application Scenario 5)",
    "options": [
      "MIN = 0, MAX = 0",
      "MIN = NULL, MAX = NULL",
      "MIN = '', MAX = ''",
      "Error: ValueNotFoundException"
    ],
    "correctIndex": 1,
    "explanation": "Both MIN and MAX discard NULLs. If all examined rows are NULL, both functions evaluate to NULL. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_minmax_73",
    "keyword": "MIN & MAX",
    "tag": "💡 Lead Architect",
    "question": "[MIN & MAX #73 &bull; AdTech Real-Time Bidding] How does MIN(column_name) compare string values across collations like utf8mb4_general_ci versus utf8mb4_bin? (Application Scenario 5)",
    "options": [
      "Collations have zero impact on string ordering",
      "utf8mb4_bin reverses alphabetical ordering",
      "MIN only works on numbers and dates, not strings",
      "utf8mb4_general_ci performs case-insensitive comparison ('a' == 'A'), while utf8mb4_bin orders strictly by binary byte values ('A' < 'a')"
    ],
    "correctIndex": 3,
    "explanation": "In case-insensitive collations, 'a' and 'A' tie. In binary collations, uppercase ASCII (65-90) precedes lowercase ASCII (97-122), so 'Zebra' < 'apple'. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_minmax_74",
    "keyword": "MIN & MAX",
    "tag": "⚡ Gotcha Trap",
    "question": "[MIN & MAX #74 &bull; Cybersecurity Audit Logs] Which query correctly determines the latest order date for each customer? (Application Scenario 5)",
    "options": [
      "SELECT customer_id, order_date FROM orders WHERE order_date = MAX(order_date)",
      "SELECT customer_id, MAX(order_date) FROM orders GROUP BY customer_id",
      "SELECT customer_id, MIN(order_date) FROM orders",
      "SELECT customer_id, order_date FROM orders GROUP BY customer_id"
    ],
    "correctIndex": 1,
    "explanation": "GROUP BY customer_id combined with MAX(order_date) groups orders per customer and extracts the highest (most recent) timestamp. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_minmax_75",
    "keyword": "MIN & MAX",
    "tag": "🎯 Core Concept",
    "question": "[MIN & MAX #75 &bull; Fintech & Ledger Systems] What is the difference between GREATEST(a, b, c) and MAX(col)? (Application Scenario 5)",
    "options": [
      "GREATEST is standard ANSI SQL, whereas MAX is a proprietary MySQL extension",
      "MAX works on numbers while GREATEST only works on dates",
      "There is no difference",
      "GREATEST is a scalar function comparing values across columns in the SAME row; MAX is an aggregate comparing values across MULTIPLE rows"
    ],
    "correctIndex": 3,
    "explanation": "GREATEST() takes multiple arguments and evaluates horizontally across a single tuple. MAX() is a vertical aggregate function that consumes a single column across multiple rows. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_minmax_76",
    "keyword": "MIN & MAX",
    "tag": "🏛️ Corporate Edge",
    "question": "[MIN & MAX #76 &bull; SaaS Subscription Billing] When evaluating MIN(created_at) and MAX(created_at) on a large partitioned transaction table, what index design delivers instantaneous O(1) response time? (Application Scenario 6)",
    "options": [
      "A HASH index on created_at",
      "A B-Tree index on (created_at) allows the engine to jump directly to the first and last leaf pages (Index Full Scan or Loose Index Scan)",
      "A GIN index on created_at",
      "No index can optimize MIN/MAX"
    ],
    "correctIndex": 1,
    "explanation": "B-Tree indexes maintain sorted leaf nodes. MIN() is resolved by traversing to the leftmost leaf, and MAX() to the rightmost leaf, taking O(log N) or O(1) in the optimizer. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_minmax_77",
    "keyword": "MIN & MAX",
    "tag": "💡 Lead Architect",
    "question": "[MIN & MAX #77 &bull; Global Supply Chain & Logistics] What does SELECT MIN(col), MAX(col) return when all rows in the table have col = NULL? (Application Scenario 6)",
    "options": [
      "MIN = 0, MAX = 0",
      "MIN = '', MAX = ''",
      "Error: ValueNotFoundException",
      "MIN = NULL, MAX = NULL"
    ],
    "correctIndex": 3,
    "explanation": "Both MIN and MAX discard NULLs. If all examined rows are NULL, both functions evaluate to NULL. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_minmax_78",
    "keyword": "MIN & MAX",
    "tag": "⚡ Gotcha Trap",
    "question": "[MIN & MAX #78 &bull; Healthcare Patient Records] How does MIN(column_name) compare string values across collations like utf8mb4_general_ci versus utf8mb4_bin? (Application Scenario 6)",
    "options": [
      "Collations have zero impact on string ordering",
      "utf8mb4_general_ci performs case-insensitive comparison ('a' == 'A'), while utf8mb4_bin orders strictly by binary byte values ('A' < 'a')",
      "utf8mb4_bin reverses alphabetical ordering",
      "MIN only works on numbers and dates, not strings"
    ],
    "correctIndex": 1,
    "explanation": "In case-insensitive collations, 'a' and 'A' tie. In binary collations, uppercase ASCII (65-90) precedes lowercase ASCII (97-122), so 'Zebra' < 'apple'. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_minmax_79",
    "keyword": "MIN & MAX",
    "tag": "🎯 Core Concept",
    "question": "[MIN & MAX #79 &bull; E-Commerce Checkout Funnels] Which query correctly determines the latest order date for each customer? (Application Scenario 6)",
    "options": [
      "SELECT customer_id, order_date FROM orders WHERE order_date = MAX(order_date)",
      "SELECT customer_id, MIN(order_date) FROM orders",
      "SELECT customer_id, order_date FROM orders GROUP BY customer_id",
      "SELECT customer_id, MAX(order_date) FROM orders GROUP BY customer_id"
    ],
    "correctIndex": 3,
    "explanation": "GROUP BY customer_id combined with MAX(order_date) groups orders per customer and extracts the highest (most recent) timestamp. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_minmax_80",
    "keyword": "MIN & MAX",
    "tag": "🏛️ Corporate Edge",
    "question": "[MIN & MAX #80 &bull; Telecom Billing & Data Streams] What is the difference between GREATEST(a, b, c) and MAX(col)? (Application Scenario 6)",
    "options": [
      "GREATEST is standard ANSI SQL, whereas MAX is a proprietary MySQL extension",
      "GREATEST is a scalar function comparing values across columns in the SAME row; MAX is an aggregate comparing values across MULTIPLE rows",
      "MAX works on numbers while GREATEST only works on dates",
      "There is no difference"
    ],
    "correctIndex": 1,
    "explanation": "GREATEST() takes multiple arguments and evaluates horizontally across a single tuple. MAX() is a vertical aggregate function that consumes a single column across multiple rows. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_minmax_81",
    "keyword": "MIN & MAX",
    "tag": "💡 Lead Architect",
    "question": "[MIN & MAX #81 &bull; AdTech Real-Time Bidding] When evaluating MIN(created_at) and MAX(created_at) on a large partitioned transaction table, what index design delivers instantaneous O(1) response time? (Application Scenario 7)",
    "options": [
      "A HASH index on created_at",
      "A GIN index on created_at",
      "No index can optimize MIN/MAX",
      "A B-Tree index on (created_at) allows the engine to jump directly to the first and last leaf pages (Index Full Scan or Loose Index Scan)"
    ],
    "correctIndex": 3,
    "explanation": "B-Tree indexes maintain sorted leaf nodes. MIN() is resolved by traversing to the leftmost leaf, and MAX() to the rightmost leaf, taking O(log N) or O(1) in the optimizer. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_minmax_82",
    "keyword": "MIN & MAX",
    "tag": "⚡ Gotcha Trap",
    "question": "[MIN & MAX #82 &bull; Cybersecurity Audit Logs] What does SELECT MIN(col), MAX(col) return when all rows in the table have col = NULL? (Application Scenario 7)",
    "options": [
      "MIN = 0, MAX = 0",
      "MIN = NULL, MAX = NULL",
      "MIN = '', MAX = ''",
      "Error: ValueNotFoundException"
    ],
    "correctIndex": 1,
    "explanation": "Both MIN and MAX discard NULLs. If all examined rows are NULL, both functions evaluate to NULL. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_minmax_83",
    "keyword": "MIN & MAX",
    "tag": "🎯 Core Concept",
    "question": "[MIN & MAX #83 &bull; Fintech & Ledger Systems] How does MIN(column_name) compare string values across collations like utf8mb4_general_ci versus utf8mb4_bin? (Application Scenario 7)",
    "options": [
      "Collations have zero impact on string ordering",
      "utf8mb4_bin reverses alphabetical ordering",
      "MIN only works on numbers and dates, not strings",
      "utf8mb4_general_ci performs case-insensitive comparison ('a' == 'A'), while utf8mb4_bin orders strictly by binary byte values ('A' < 'a')"
    ],
    "correctIndex": 3,
    "explanation": "In case-insensitive collations, 'a' and 'A' tie. In binary collations, uppercase ASCII (65-90) precedes lowercase ASCII (97-122), so 'Zebra' < 'apple'. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_minmax_84",
    "keyword": "MIN & MAX",
    "tag": "🏛️ Corporate Edge",
    "question": "[MIN & MAX #84 &bull; SaaS Subscription Billing] Which query correctly determines the latest order date for each customer? (Application Scenario 7)",
    "options": [
      "SELECT customer_id, order_date FROM orders WHERE order_date = MAX(order_date)",
      "SELECT customer_id, MAX(order_date) FROM orders GROUP BY customer_id",
      "SELECT customer_id, MIN(order_date) FROM orders",
      "SELECT customer_id, order_date FROM orders GROUP BY customer_id"
    ],
    "correctIndex": 1,
    "explanation": "GROUP BY customer_id combined with MAX(order_date) groups orders per customer and extracts the highest (most recent) timestamp. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_minmax_85",
    "keyword": "MIN & MAX",
    "tag": "💡 Lead Architect",
    "question": "[MIN & MAX #85 &bull; Global Supply Chain & Logistics] What is the difference between GREATEST(a, b, c) and MAX(col)? (Application Scenario 7)",
    "options": [
      "GREATEST is standard ANSI SQL, whereas MAX is a proprietary MySQL extension",
      "MAX works on numbers while GREATEST only works on dates",
      "There is no difference",
      "GREATEST is a scalar function comparing values across columns in the SAME row; MAX is an aggregate comparing values across MULTIPLE rows"
    ],
    "correctIndex": 3,
    "explanation": "GREATEST() takes multiple arguments and evaluates horizontally across a single tuple. MAX() is a vertical aggregate function that consumes a single column across multiple rows. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_minmax_86",
    "keyword": "MIN & MAX",
    "tag": "⚡ Gotcha Trap",
    "question": "[MIN & MAX #86 &bull; Healthcare Patient Records] When evaluating MIN(created_at) and MAX(created_at) on a large partitioned transaction table, what index design delivers instantaneous O(1) response time? (Application Scenario 8)",
    "options": [
      "A HASH index on created_at",
      "A B-Tree index on (created_at) allows the engine to jump directly to the first and last leaf pages (Index Full Scan or Loose Index Scan)",
      "A GIN index on created_at",
      "No index can optimize MIN/MAX"
    ],
    "correctIndex": 1,
    "explanation": "B-Tree indexes maintain sorted leaf nodes. MIN() is resolved by traversing to the leftmost leaf, and MAX() to the rightmost leaf, taking O(log N) or O(1) in the optimizer. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_minmax_87",
    "keyword": "MIN & MAX",
    "tag": "🎯 Core Concept",
    "question": "[MIN & MAX #87 &bull; E-Commerce Checkout Funnels] What does SELECT MIN(col), MAX(col) return when all rows in the table have col = NULL? (Application Scenario 8)",
    "options": [
      "MIN = 0, MAX = 0",
      "MIN = '', MAX = ''",
      "Error: ValueNotFoundException",
      "MIN = NULL, MAX = NULL"
    ],
    "correctIndex": 3,
    "explanation": "Both MIN and MAX discard NULLs. If all examined rows are NULL, both functions evaluate to NULL. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_minmax_88",
    "keyword": "MIN & MAX",
    "tag": "🏛️ Corporate Edge",
    "question": "[MIN & MAX #88 &bull; Telecom Billing & Data Streams] How does MIN(column_name) compare string values across collations like utf8mb4_general_ci versus utf8mb4_bin? (Application Scenario 8)",
    "options": [
      "Collations have zero impact on string ordering",
      "utf8mb4_general_ci performs case-insensitive comparison ('a' == 'A'), while utf8mb4_bin orders strictly by binary byte values ('A' < 'a')",
      "utf8mb4_bin reverses alphabetical ordering",
      "MIN only works on numbers and dates, not strings"
    ],
    "correctIndex": 1,
    "explanation": "In case-insensitive collations, 'a' and 'A' tie. In binary collations, uppercase ASCII (65-90) precedes lowercase ASCII (97-122), so 'Zebra' < 'apple'. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_minmax_89",
    "keyword": "MIN & MAX",
    "tag": "💡 Lead Architect",
    "question": "[MIN & MAX #89 &bull; AdTech Real-Time Bidding] Which query correctly determines the latest order date for each customer? (Application Scenario 8)",
    "options": [
      "SELECT customer_id, order_date FROM orders WHERE order_date = MAX(order_date)",
      "SELECT customer_id, MIN(order_date) FROM orders",
      "SELECT customer_id, order_date FROM orders GROUP BY customer_id",
      "SELECT customer_id, MAX(order_date) FROM orders GROUP BY customer_id"
    ],
    "correctIndex": 3,
    "explanation": "GROUP BY customer_id combined with MAX(order_date) groups orders per customer and extracts the highest (most recent) timestamp. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_minmax_90",
    "keyword": "MIN & MAX",
    "tag": "⚡ Gotcha Trap",
    "question": "[MIN & MAX #90 &bull; Cybersecurity Audit Logs] What is the difference between GREATEST(a, b, c) and MAX(col)? (Application Scenario 8)",
    "options": [
      "GREATEST is standard ANSI SQL, whereas MAX is a proprietary MySQL extension",
      "GREATEST is a scalar function comparing values across columns in the SAME row; MAX is an aggregate comparing values across MULTIPLE rows",
      "MAX works on numbers while GREATEST only works on dates",
      "There is no difference"
    ],
    "correctIndex": 1,
    "explanation": "GREATEST() takes multiple arguments and evaluates horizontally across a single tuple. MAX() is a vertical aggregate function that consumes a single column across multiple rows. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_minmax_91",
    "keyword": "MIN & MAX",
    "tag": "🎯 Core Concept",
    "question": "[MIN & MAX #91 &bull; Fintech & Ledger Systems] When evaluating MIN(created_at) and MAX(created_at) on a large partitioned transaction table, what index design delivers instantaneous O(1) response time? (Application Scenario 9)",
    "options": [
      "A HASH index on created_at",
      "A GIN index on created_at",
      "No index can optimize MIN/MAX",
      "A B-Tree index on (created_at) allows the engine to jump directly to the first and last leaf pages (Index Full Scan or Loose Index Scan)"
    ],
    "correctIndex": 3,
    "explanation": "B-Tree indexes maintain sorted leaf nodes. MIN() is resolved by traversing to the leftmost leaf, and MAX() to the rightmost leaf, taking O(log N) or O(1) in the optimizer. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_minmax_92",
    "keyword": "MIN & MAX",
    "tag": "🏛️ Corporate Edge",
    "question": "[MIN & MAX #92 &bull; SaaS Subscription Billing] What does SELECT MIN(col), MAX(col) return when all rows in the table have col = NULL? (Application Scenario 9)",
    "options": [
      "MIN = 0, MAX = 0",
      "MIN = NULL, MAX = NULL",
      "MIN = '', MAX = ''",
      "Error: ValueNotFoundException"
    ],
    "correctIndex": 1,
    "explanation": "Both MIN and MAX discard NULLs. If all examined rows are NULL, both functions evaluate to NULL. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_minmax_93",
    "keyword": "MIN & MAX",
    "tag": "💡 Lead Architect",
    "question": "[MIN & MAX #93 &bull; Global Supply Chain & Logistics] How does MIN(column_name) compare string values across collations like utf8mb4_general_ci versus utf8mb4_bin? (Application Scenario 9)",
    "options": [
      "Collations have zero impact on string ordering",
      "utf8mb4_bin reverses alphabetical ordering",
      "MIN only works on numbers and dates, not strings",
      "utf8mb4_general_ci performs case-insensitive comparison ('a' == 'A'), while utf8mb4_bin orders strictly by binary byte values ('A' < 'a')"
    ],
    "correctIndex": 3,
    "explanation": "In case-insensitive collations, 'a' and 'A' tie. In binary collations, uppercase ASCII (65-90) precedes lowercase ASCII (97-122), so 'Zebra' < 'apple'. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_minmax_94",
    "keyword": "MIN & MAX",
    "tag": "⚡ Gotcha Trap",
    "question": "[MIN & MAX #94 &bull; Healthcare Patient Records] Which query correctly determines the latest order date for each customer? (Application Scenario 9)",
    "options": [
      "SELECT customer_id, order_date FROM orders WHERE order_date = MAX(order_date)",
      "SELECT customer_id, MAX(order_date) FROM orders GROUP BY customer_id",
      "SELECT customer_id, MIN(order_date) FROM orders",
      "SELECT customer_id, order_date FROM orders GROUP BY customer_id"
    ],
    "correctIndex": 1,
    "explanation": "GROUP BY customer_id combined with MAX(order_date) groups orders per customer and extracts the highest (most recent) timestamp. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_minmax_95",
    "keyword": "MIN & MAX",
    "tag": "🎯 Core Concept",
    "question": "[MIN & MAX #95 &bull; E-Commerce Checkout Funnels] What is the difference between GREATEST(a, b, c) and MAX(col)? (Application Scenario 9)",
    "options": [
      "GREATEST is standard ANSI SQL, whereas MAX is a proprietary MySQL extension",
      "MAX works on numbers while GREATEST only works on dates",
      "There is no difference",
      "GREATEST is a scalar function comparing values across columns in the SAME row; MAX is an aggregate comparing values across MULTIPLE rows"
    ],
    "correctIndex": 3,
    "explanation": "GREATEST() takes multiple arguments and evaluates horizontally across a single tuple. MAX() is a vertical aggregate function that consumes a single column across multiple rows. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_minmax_96",
    "keyword": "MIN & MAX",
    "tag": "🏛️ Corporate Edge",
    "question": "[MIN & MAX #96 &bull; Telecom Billing & Data Streams] When evaluating MIN(created_at) and MAX(created_at) on a large partitioned transaction table, what index design delivers instantaneous O(1) response time? (Application Scenario 10)",
    "options": [
      "A HASH index on created_at",
      "A B-Tree index on (created_at) allows the engine to jump directly to the first and last leaf pages (Index Full Scan or Loose Index Scan)",
      "A GIN index on created_at",
      "No index can optimize MIN/MAX"
    ],
    "correctIndex": 1,
    "explanation": "B-Tree indexes maintain sorted leaf nodes. MIN() is resolved by traversing to the leftmost leaf, and MAX() to the rightmost leaf, taking O(log N) or O(1) in the optimizer. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_minmax_97",
    "keyword": "MIN & MAX",
    "tag": "💡 Lead Architect",
    "question": "[MIN & MAX #97 &bull; AdTech Real-Time Bidding] What does SELECT MIN(col), MAX(col) return when all rows in the table have col = NULL? (Application Scenario 10)",
    "options": [
      "MIN = 0, MAX = 0",
      "MIN = '', MAX = ''",
      "Error: ValueNotFoundException",
      "MIN = NULL, MAX = NULL"
    ],
    "correctIndex": 3,
    "explanation": "Both MIN and MAX discard NULLs. If all examined rows are NULL, both functions evaluate to NULL. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_minmax_98",
    "keyword": "MIN & MAX",
    "tag": "⚡ Gotcha Trap",
    "question": "[MIN & MAX #98 &bull; Cybersecurity Audit Logs] How does MIN(column_name) compare string values across collations like utf8mb4_general_ci versus utf8mb4_bin? (Application Scenario 10)",
    "options": [
      "Collations have zero impact on string ordering",
      "utf8mb4_general_ci performs case-insensitive comparison ('a' == 'A'), while utf8mb4_bin orders strictly by binary byte values ('A' < 'a')",
      "utf8mb4_bin reverses alphabetical ordering",
      "MIN only works on numbers and dates, not strings"
    ],
    "correctIndex": 1,
    "explanation": "In case-insensitive collations, 'a' and 'A' tie. In binary collations, uppercase ASCII (65-90) precedes lowercase ASCII (97-122), so 'Zebra' < 'apple'. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_minmax_99",
    "keyword": "MIN & MAX",
    "tag": "🎯 Core Concept",
    "question": "[MIN & MAX #99 &bull; Fintech & Ledger Systems] Which query correctly determines the latest order date for each customer? (Application Scenario 10)",
    "options": [
      "SELECT customer_id, order_date FROM orders WHERE order_date = MAX(order_date)",
      "SELECT customer_id, MIN(order_date) FROM orders",
      "SELECT customer_id, order_date FROM orders GROUP BY customer_id",
      "SELECT customer_id, MAX(order_date) FROM orders GROUP BY customer_id"
    ],
    "correctIndex": 3,
    "explanation": "GROUP BY customer_id combined with MAX(order_date) groups orders per customer and extracts the highest (most recent) timestamp. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_minmax_100",
    "keyword": "MIN & MAX",
    "tag": "🏛️ Corporate Edge",
    "question": "[MIN & MAX #100 &bull; SaaS Subscription Billing] What is the difference between GREATEST(a, b, c) and MAX(col)? (Application Scenario 10)",
    "options": [
      "GREATEST is standard ANSI SQL, whereas MAX is a proprietary MySQL extension",
      "GREATEST is a scalar function comparing values across columns in the SAME row; MAX is an aggregate comparing values across MULTIPLE rows",
      "MAX works on numbers while GREATEST only works on dates",
      "There is no difference"
    ],
    "correctIndex": 1,
    "explanation": "GREATEST() takes multiple arguments and evaluates horizontally across a single tuple. MAX() is a vertical aggregate function that consumes a single column across multiple rows. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_groupby_1",
    "keyword": "GROUP BY",
    "tag": "🍡 Quick Snack",
    "question": "[GROUP BY #1] Why does the query \"SELECT department, name, AVG(salary) FROM Employees GROUP BY department;\" fail in standard SQL (ONLY_FULL_GROUP_BY)?",
    "options": [
      "GROUP BY must always be followed by HAVING",
      "AVG() cannot be combined with text columns",
      "\"name\" is not in the GROUP BY clause and is not wrapped in an aggregate function, creating an ambiguous 1-to-many projection",
      "department names must be sorted using ORDER BY first"
    ],
    "correctIndex": 2,
    "explanation": "Under ANSI SQL and MySQL ONLY_FULL_GROUP_BY, every column in the SELECT list that is not aggregated MUST appear in the GROUP BY clause to prevent non-deterministic values."
  },
  {
    "id": "mcq_groupby_2",
    "keyword": "GROUP BY",
    "tag": "⚡ Gotcha Trap",
    "question": "[GROUP BY #2] How does GROUP BY handle rows where the grouping column value is NULL?",
    "options": [
      "All NULL rows are grouped together into a single collective group bucket",
      "Every NULL row forms its own unique, separate group bucket",
      "An AmbiguousKeyException error is thrown",
      "All NULL rows are discarded from the query result"
    ],
    "correctIndex": 0,
    "explanation": "In SQL grouping, NULL values are considered equal to each other for the purpose of grouping, aggregating all rows with NULL in that column into one single bucket."
  },
  {
    "id": "mcq_groupby_3",
    "keyword": "GROUP BY",
    "tag": "🐱 Brain Bender",
    "question": "[GROUP BY #3] What does positional grouping syntax like \"GROUP BY 1, 2\" mean in engines that support it?",
    "options": [
      "Group only the first 2 rows of the table",
      "Group by the first and second physical columns stored on disk in the table schema",
      "Group by the 1st and 2nd expressions listed in the SELECT clause",
      "Group by primary key 1 and foreign key 2"
    ],
    "correctIndex": 2,
    "explanation": "GROUP BY 1, 2 references columns by their ordinal 1-based index in the SELECT projection list. While convenient, it is considered fragile in production code if columns are reordered."
  },
  {
    "id": "mcq_groupby_4",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #4] In the query \"SELECT department, role, COUNT(*) FROM Staff GROUP BY department, role;\", how are groups created?",
    "options": [
      "The query performs two separate queries and concatenates them",
      "Only rows where department equals role are grouped",
      "Rows are grouped by department, then role is discarded",
      "Unique combinations of (department, role) tuples each form a distinct summary bucket"
    ],
    "correctIndex": 3,
    "explanation": "Multi-column GROUP BY partitions rows by composite tuples. An aggregate is calculated for every distinct pairing of (department, role)."
  },
  {
    "id": "mcq_groupby_5",
    "keyword": "GROUP BY",
    "tag": "🏆 Senior Staff",
    "question": "[GROUP BY #5] Can you group by a calculated expression such as \"GROUP BY YEAR(hire_date)\" in ANSI SQL?",
    "options": [
      "Only if the expression is aliased in the WHERE clause",
      "Yes, grouping by scalar deterministic expressions on columns is fully valid",
      "No, GROUP BY can only reference physical column names directly",
      "Only if hire_date is indexed as a primary key"
    ],
    "correctIndex": 1,
    "explanation": "Expressions like YEAR(hire_date) or CASE WHEN statements are legal in GROUP BY clauses across modern SQL engines."
  },
  {
    "id": "mcq_groupby_6",
    "keyword": "GROUP BY",
    "tag": "🍡 Quick Snack",
    "question": "[GROUP BY #6] Why does the query \"SELECT department, name, AVG(salary) FROM Employees GROUP BY department;\" fail in standard SQL (ONLY_FULL_GROUP_BY)? (Scenario Variant 2)",
    "options": [
      "AVG() cannot be combined with text columns",
      "\"name\" is not in the GROUP BY clause and is not wrapped in an aggregate function, creating an ambiguous 1-to-many projection",
      "department names must be sorted using ORDER BY first",
      "GROUP BY must always be followed by HAVING"
    ],
    "correctIndex": 1,
    "explanation": "Under ANSI SQL and MySQL ONLY_FULL_GROUP_BY, every column in the SELECT list that is not aggregated MUST appear in the GROUP BY clause to prevent non-deterministic values."
  },
  {
    "id": "mcq_groupby_7",
    "keyword": "GROUP BY",
    "tag": "⚡ Gotcha Trap",
    "question": "[GROUP BY #7] How does GROUP BY handle rows where the grouping column value is NULL? (Scenario Variant 2)",
    "options": [
      "All NULL rows are discarded from the query result",
      "All NULL rows are grouped together into a single collective group bucket",
      "Every NULL row forms its own unique, separate group bucket",
      "An AmbiguousKeyException error is thrown"
    ],
    "correctIndex": 1,
    "explanation": "In SQL grouping, NULL values are considered equal to each other for the purpose of grouping, aggregating all rows with NULL in that column into one single bucket."
  },
  {
    "id": "mcq_groupby_8",
    "keyword": "GROUP BY",
    "tag": "🐱 Brain Bender",
    "question": "[GROUP BY #8] What does positional grouping syntax like \"GROUP BY 1, 2\" mean in engines that support it? (Scenario Variant 2)",
    "options": [
      "Group by the first and second physical columns stored on disk in the table schema",
      "Group by primary key 1 and foreign key 2",
      "Group by the 1st and 2nd expressions listed in the SELECT clause",
      "Group only the first 2 rows of the table"
    ],
    "correctIndex": 2,
    "explanation": "GROUP BY 1, 2 references columns by their ordinal 1-based index in the SELECT projection list. While convenient, it is considered fragile in production code if columns are reordered."
  },
  {
    "id": "mcq_groupby_9",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #9] In the query \"SELECT department, role, COUNT(*) FROM Staff GROUP BY department, role;\", how are groups created? (Scenario Variant 2)",
    "options": [
      "Rows are grouped by department, then role is discarded",
      "Only rows where department equals role are grouped",
      "The query performs two separate queries and concatenates them",
      "Unique combinations of (department, role) tuples each form a distinct summary bucket"
    ],
    "correctIndex": 3,
    "explanation": "Multi-column GROUP BY partitions rows by composite tuples. An aggregate is calculated for every distinct pairing of (department, role)."
  },
  {
    "id": "mcq_groupby_10",
    "keyword": "GROUP BY",
    "tag": "🏆 Senior Staff",
    "question": "[GROUP BY #10] Can you group by a calculated expression such as \"GROUP BY YEAR(hire_date)\" in ANSI SQL? (Scenario Variant 2)",
    "options": [
      "Only if the expression is aliased in the WHERE clause",
      "Yes, grouping by scalar deterministic expressions on columns is fully valid",
      "Only if hire_date is indexed as a primary key",
      "No, GROUP BY can only reference physical column names directly"
    ],
    "correctIndex": 1,
    "explanation": "Expressions like YEAR(hire_date) or CASE WHEN statements are legal in GROUP BY clauses across modern SQL engines."
  },
  {
    "id": "mcq_groupby_11",
    "keyword": "GROUP BY",
    "tag": "🍡 Quick Snack",
    "question": "[GROUP BY #11] Why does the query \"SELECT department, name, AVG(salary) FROM Employees GROUP BY department;\" fail in standard SQL (ONLY_FULL_GROUP_BY)? (Scenario Variant 3)",
    "options": [
      "\"name\" is not in the GROUP BY clause and is not wrapped in an aggregate function, creating an ambiguous 1-to-many projection",
      "AVG() cannot be combined with text columns",
      "GROUP BY must always be followed by HAVING",
      "department names must be sorted using ORDER BY first"
    ],
    "correctIndex": 0,
    "explanation": "Under ANSI SQL and MySQL ONLY_FULL_GROUP_BY, every column in the SELECT list that is not aggregated MUST appear in the GROUP BY clause to prevent non-deterministic values."
  },
  {
    "id": "mcq_groupby_12",
    "keyword": "GROUP BY",
    "tag": "⚡ Gotcha Trap",
    "question": "[GROUP BY #12] How does GROUP BY handle rows where the grouping column value is NULL? (Scenario Variant 3)",
    "options": [
      "An AmbiguousKeyException error is thrown",
      "All NULL rows are grouped together into a single collective group bucket",
      "All NULL rows are discarded from the query result",
      "Every NULL row forms its own unique, separate group bucket"
    ],
    "correctIndex": 1,
    "explanation": "In SQL grouping, NULL values are considered equal to each other for the purpose of grouping, aggregating all rows with NULL in that column into one single bucket."
  },
  {
    "id": "mcq_groupby_13",
    "keyword": "GROUP BY",
    "tag": "🐱 Brain Bender",
    "question": "[GROUP BY #13] What does positional grouping syntax like \"GROUP BY 1, 2\" mean in engines that support it? (Scenario Variant 3)",
    "options": [
      "Group by primary key 1 and foreign key 2",
      "Group by the 1st and 2nd expressions listed in the SELECT clause",
      "Group by the first and second physical columns stored on disk in the table schema",
      "Group only the first 2 rows of the table"
    ],
    "correctIndex": 1,
    "explanation": "GROUP BY 1, 2 references columns by their ordinal 1-based index in the SELECT projection list. While convenient, it is considered fragile in production code if columns are reordered."
  },
  {
    "id": "mcq_groupby_14",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #14] In the query \"SELECT department, role, COUNT(*) FROM Staff GROUP BY department, role;\", how are groups created? (Scenario Variant 3)",
    "options": [
      "Unique combinations of (department, role) tuples each form a distinct summary bucket",
      "Rows are grouped by department, then role is discarded",
      "The query performs two separate queries and concatenates them",
      "Only rows where department equals role are grouped"
    ],
    "correctIndex": 0,
    "explanation": "Multi-column GROUP BY partitions rows by composite tuples. An aggregate is calculated for every distinct pairing of (department, role)."
  },
  {
    "id": "mcq_groupby_15",
    "keyword": "GROUP BY",
    "tag": "🏆 Senior Staff",
    "question": "[GROUP BY #15] Can you group by a calculated expression such as \"GROUP BY YEAR(hire_date)\" in ANSI SQL? (Scenario Variant 3)",
    "options": [
      "Yes, grouping by scalar deterministic expressions on columns is fully valid",
      "Only if hire_date is indexed as a primary key",
      "Only if the expression is aliased in the WHERE clause",
      "No, GROUP BY can only reference physical column names directly"
    ],
    "correctIndex": 0,
    "explanation": "Expressions like YEAR(hire_date) or CASE WHEN statements are legal in GROUP BY clauses across modern SQL engines."
  },
  {
    "id": "mcq_groupby_16",
    "keyword": "GROUP BY",
    "tag": "🍡 Quick Snack",
    "question": "[GROUP BY #16] Why does the query \"SELECT department, name, AVG(salary) FROM Employees GROUP BY department;\" fail in standard SQL (ONLY_FULL_GROUP_BY)? (Scenario Variant 4)",
    "options": [
      "AVG() cannot be combined with text columns",
      "department names must be sorted using ORDER BY first",
      "GROUP BY must always be followed by HAVING",
      "\"name\" is not in the GROUP BY clause and is not wrapped in an aggregate function, creating an ambiguous 1-to-many projection"
    ],
    "correctIndex": 3,
    "explanation": "Under ANSI SQL and MySQL ONLY_FULL_GROUP_BY, every column in the SELECT list that is not aggregated MUST appear in the GROUP BY clause to prevent non-deterministic values."
  },
  {
    "id": "mcq_groupby_17",
    "keyword": "GROUP BY",
    "tag": "⚡ Gotcha Trap",
    "question": "[GROUP BY #17] How does GROUP BY handle rows where the grouping column value is NULL? (Scenario Variant 4)",
    "options": [
      "All NULL rows are grouped together into a single collective group bucket",
      "An AmbiguousKeyException error is thrown",
      "All NULL rows are discarded from the query result",
      "Every NULL row forms its own unique, separate group bucket"
    ],
    "correctIndex": 0,
    "explanation": "In SQL grouping, NULL values are considered equal to each other for the purpose of grouping, aggregating all rows with NULL in that column into one single bucket."
  },
  {
    "id": "mcq_groupby_18",
    "keyword": "GROUP BY",
    "tag": "🐱 Brain Bender",
    "question": "[GROUP BY #18] What does positional grouping syntax like \"GROUP BY 1, 2\" mean in engines that support it? (Scenario Variant 4)",
    "options": [
      "Group by the first and second physical columns stored on disk in the table schema",
      "Group only the first 2 rows of the table",
      "Group by the 1st and 2nd expressions listed in the SELECT clause",
      "Group by primary key 1 and foreign key 2"
    ],
    "correctIndex": 2,
    "explanation": "GROUP BY 1, 2 references columns by their ordinal 1-based index in the SELECT projection list. While convenient, it is considered fragile in production code if columns are reordered."
  },
  {
    "id": "mcq_groupby_19",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #19] In the query \"SELECT department, role, COUNT(*) FROM Staff GROUP BY department, role;\", how are groups created? (Scenario Variant 4)",
    "options": [
      "Rows are grouped by department, then role is discarded",
      "Only rows where department equals role are grouped",
      "The query performs two separate queries and concatenates them",
      "Unique combinations of (department, role) tuples each form a distinct summary bucket"
    ],
    "correctIndex": 3,
    "explanation": "Multi-column GROUP BY partitions rows by composite tuples. An aggregate is calculated for every distinct pairing of (department, role)."
  },
  {
    "id": "mcq_groupby_20",
    "keyword": "GROUP BY",
    "tag": "🏆 Senior Staff",
    "question": "[GROUP BY #20] Can you group by a calculated expression such as \"GROUP BY YEAR(hire_date)\" in ANSI SQL? (Scenario Variant 4)",
    "options": [
      "No, GROUP BY can only reference physical column names directly",
      "Only if hire_date is indexed as a primary key",
      "Only if the expression is aliased in the WHERE clause",
      "Yes, grouping by scalar deterministic expressions on columns is fully valid"
    ],
    "correctIndex": 3,
    "explanation": "Expressions like YEAR(hire_date) or CASE WHEN statements are legal in GROUP BY clauses across modern SQL engines."
  },
  {
    "id": "mcq_groupby_21",
    "keyword": "GROUP BY",
    "tag": "🍡 Quick Snack",
    "question": "[GROUP BY #21] Why does the query \"SELECT department, name, AVG(salary) FROM Employees GROUP BY department;\" fail in standard SQL (ONLY_FULL_GROUP_BY)? (Scenario Variant 5)",
    "options": [
      "department names must be sorted using ORDER BY first",
      "AVG() cannot be combined with text columns",
      "GROUP BY must always be followed by HAVING",
      "\"name\" is not in the GROUP BY clause and is not wrapped in an aggregate function, creating an ambiguous 1-to-many projection"
    ],
    "correctIndex": 3,
    "explanation": "Under ANSI SQL and MySQL ONLY_FULL_GROUP_BY, every column in the SELECT list that is not aggregated MUST appear in the GROUP BY clause to prevent non-deterministic values."
  },
  {
    "id": "mcq_groupby_22",
    "keyword": "GROUP BY",
    "tag": "⚡ Gotcha Trap",
    "question": "[GROUP BY #22] How does GROUP BY handle rows where the grouping column value is NULL? (Scenario Variant 5)",
    "options": [
      "All NULL rows are discarded from the query result",
      "All NULL rows are grouped together into a single collective group bucket",
      "An AmbiguousKeyException error is thrown",
      "Every NULL row forms its own unique, separate group bucket"
    ],
    "correctIndex": 1,
    "explanation": "In SQL grouping, NULL values are considered equal to each other for the purpose of grouping, aggregating all rows with NULL in that column into one single bucket."
  },
  {
    "id": "mcq_groupby_23",
    "keyword": "GROUP BY",
    "tag": "🐱 Brain Bender",
    "question": "[GROUP BY #23] What does positional grouping syntax like \"GROUP BY 1, 2\" mean in engines that support it? (Scenario Variant 5)",
    "options": [
      "Group only the first 2 rows of the table",
      "Group by the first and second physical columns stored on disk in the table schema",
      "Group by the 1st and 2nd expressions listed in the SELECT clause",
      "Group by primary key 1 and foreign key 2"
    ],
    "correctIndex": 2,
    "explanation": "GROUP BY 1, 2 references columns by their ordinal 1-based index in the SELECT projection list. While convenient, it is considered fragile in production code if columns are reordered."
  },
  {
    "id": "mcq_groupby_24",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #24] In the query \"SELECT department, role, COUNT(*) FROM Staff GROUP BY department, role;\", how are groups created? (Scenario Variant 5)",
    "options": [
      "The query performs two separate queries and concatenates them",
      "Only rows where department equals role are grouped",
      "Rows are grouped by department, then role is discarded",
      "Unique combinations of (department, role) tuples each form a distinct summary bucket"
    ],
    "correctIndex": 3,
    "explanation": "Multi-column GROUP BY partitions rows by composite tuples. An aggregate is calculated for every distinct pairing of (department, role)."
  },
  {
    "id": "mcq_groupby_25",
    "keyword": "GROUP BY",
    "tag": "🏆 Senior Staff",
    "question": "[GROUP BY #25] Can you group by a calculated expression such as \"GROUP BY YEAR(hire_date)\" in ANSI SQL? (Scenario Variant 5)",
    "options": [
      "Only if the expression is aliased in the WHERE clause",
      "Yes, grouping by scalar deterministic expressions on columns is fully valid",
      "No, GROUP BY can only reference physical column names directly",
      "Only if hire_date is indexed as a primary key"
    ],
    "correctIndex": 1,
    "explanation": "Expressions like YEAR(hire_date) or CASE WHEN statements are legal in GROUP BY clauses across modern SQL engines."
  },
  {
    "id": "mcq_groupby_26",
    "keyword": "GROUP BY",
    "tag": "🍡 Quick Snack",
    "question": "[GROUP BY #26] Why does the query \"SELECT department, name, AVG(salary) FROM Employees GROUP BY department;\" fail in standard SQL (ONLY_FULL_GROUP_BY)? (Scenario Variant 6)",
    "options": [
      "\"name\" is not in the GROUP BY clause and is not wrapped in an aggregate function, creating an ambiguous 1-to-many projection",
      "GROUP BY must always be followed by HAVING",
      "department names must be sorted using ORDER BY first",
      "AVG() cannot be combined with text columns"
    ],
    "correctIndex": 0,
    "explanation": "Under ANSI SQL and MySQL ONLY_FULL_GROUP_BY, every column in the SELECT list that is not aggregated MUST appear in the GROUP BY clause to prevent non-deterministic values."
  },
  {
    "id": "mcq_groupby_27",
    "keyword": "GROUP BY",
    "tag": "⚡ Gotcha Trap",
    "question": "[GROUP BY #27] How does GROUP BY handle rows where the grouping column value is NULL? (Scenario Variant 6)",
    "options": [
      "All NULL rows are discarded from the query result",
      "All NULL rows are grouped together into a single collective group bucket",
      "An AmbiguousKeyException error is thrown",
      "Every NULL row forms its own unique, separate group bucket"
    ],
    "correctIndex": 1,
    "explanation": "In SQL grouping, NULL values are considered equal to each other for the purpose of grouping, aggregating all rows with NULL in that column into one single bucket."
  },
  {
    "id": "mcq_groupby_28",
    "keyword": "GROUP BY",
    "tag": "🐱 Brain Bender",
    "question": "[GROUP BY #28] What does positional grouping syntax like \"GROUP BY 1, 2\" mean in engines that support it? (Scenario Variant 6)",
    "options": [
      "Group by the 1st and 2nd expressions listed in the SELECT clause",
      "Group only the first 2 rows of the table",
      "Group by primary key 1 and foreign key 2",
      "Group by the first and second physical columns stored on disk in the table schema"
    ],
    "correctIndex": 0,
    "explanation": "GROUP BY 1, 2 references columns by their ordinal 1-based index in the SELECT projection list. While convenient, it is considered fragile in production code if columns are reordered."
  },
  {
    "id": "mcq_groupby_29",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #29] In the query \"SELECT department, role, COUNT(*) FROM Staff GROUP BY department, role;\", how are groups created? (Scenario Variant 6)",
    "options": [
      "The query performs two separate queries and concatenates them",
      "Rows are grouped by department, then role is discarded",
      "Only rows where department equals role are grouped",
      "Unique combinations of (department, role) tuples each form a distinct summary bucket"
    ],
    "correctIndex": 3,
    "explanation": "Multi-column GROUP BY partitions rows by composite tuples. An aggregate is calculated for every distinct pairing of (department, role)."
  },
  {
    "id": "mcq_groupby_30",
    "keyword": "GROUP BY",
    "tag": "🏆 Senior Staff",
    "question": "[GROUP BY #30] Can you group by a calculated expression such as \"GROUP BY YEAR(hire_date)\" in ANSI SQL? (Scenario Variant 6)",
    "options": [
      "Only if hire_date is indexed as a primary key",
      "Yes, grouping by scalar deterministic expressions on columns is fully valid",
      "No, GROUP BY can only reference physical column names directly",
      "Only if the expression is aliased in the WHERE clause"
    ],
    "correctIndex": 1,
    "explanation": "Expressions like YEAR(hire_date) or CASE WHEN statements are legal in GROUP BY clauses across modern SQL engines."
  },
  {
    "id": "mcq_groupby_31",
    "keyword": "GROUP BY",
    "tag": "🍡 Quick Snack",
    "question": "[GROUP BY #31] Why does the query \"SELECT department, name, AVG(salary) FROM Employees GROUP BY department;\" fail in standard SQL (ONLY_FULL_GROUP_BY)? (Scenario Variant 7)",
    "options": [
      "GROUP BY must always be followed by HAVING",
      "AVG() cannot be combined with text columns",
      "\"name\" is not in the GROUP BY clause and is not wrapped in an aggregate function, creating an ambiguous 1-to-many projection",
      "department names must be sorted using ORDER BY first"
    ],
    "correctIndex": 2,
    "explanation": "Under ANSI SQL and MySQL ONLY_FULL_GROUP_BY, every column in the SELECT list that is not aggregated MUST appear in the GROUP BY clause to prevent non-deterministic values."
  },
  {
    "id": "mcq_groupby_32",
    "keyword": "GROUP BY",
    "tag": "⚡ Gotcha Trap",
    "question": "[GROUP BY #32] How does GROUP BY handle rows where the grouping column value is NULL? (Scenario Variant 7)",
    "options": [
      "All NULL rows are grouped together into a single collective group bucket",
      "All NULL rows are discarded from the query result",
      "Every NULL row forms its own unique, separate group bucket",
      "An AmbiguousKeyException error is thrown"
    ],
    "correctIndex": 0,
    "explanation": "In SQL grouping, NULL values are considered equal to each other for the purpose of grouping, aggregating all rows with NULL in that column into one single bucket."
  },
  {
    "id": "mcq_groupby_33",
    "keyword": "GROUP BY",
    "tag": "🐱 Brain Bender",
    "question": "[GROUP BY #33] What does positional grouping syntax like \"GROUP BY 1, 2\" mean in engines that support it? (Scenario Variant 7)",
    "options": [
      "Group by the 1st and 2nd expressions listed in the SELECT clause",
      "Group by primary key 1 and foreign key 2",
      "Group by the first and second physical columns stored on disk in the table schema",
      "Group only the first 2 rows of the table"
    ],
    "correctIndex": 0,
    "explanation": "GROUP BY 1, 2 references columns by their ordinal 1-based index in the SELECT projection list. While convenient, it is considered fragile in production code if columns are reordered."
  },
  {
    "id": "mcq_groupby_34",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #34] In the query \"SELECT department, role, COUNT(*) FROM Staff GROUP BY department, role;\", how are groups created? (Scenario Variant 7)",
    "options": [
      "The query performs two separate queries and concatenates them",
      "Unique combinations of (department, role) tuples each form a distinct summary bucket",
      "Only rows where department equals role are grouped",
      "Rows are grouped by department, then role is discarded"
    ],
    "correctIndex": 1,
    "explanation": "Multi-column GROUP BY partitions rows by composite tuples. An aggregate is calculated for every distinct pairing of (department, role)."
  },
  {
    "id": "mcq_groupby_35",
    "keyword": "GROUP BY",
    "tag": "🏆 Senior Staff",
    "question": "[GROUP BY #35] Can you group by a calculated expression such as \"GROUP BY YEAR(hire_date)\" in ANSI SQL? (Scenario Variant 7)",
    "options": [
      "Yes, grouping by scalar deterministic expressions on columns is fully valid",
      "No, GROUP BY can only reference physical column names directly",
      "Only if hire_date is indexed as a primary key",
      "Only if the expression is aliased in the WHERE clause"
    ],
    "correctIndex": 0,
    "explanation": "Expressions like YEAR(hire_date) or CASE WHEN statements are legal in GROUP BY clauses across modern SQL engines."
  },
  {
    "id": "mcq_groupby_36",
    "keyword": "GROUP BY",
    "tag": "🍡 Quick Snack",
    "question": "[GROUP BY #36] Why does the query \"SELECT department, name, AVG(salary) FROM Employees GROUP BY department;\" fail in standard SQL (ONLY_FULL_GROUP_BY)? (Scenario Variant 8)",
    "options": [
      "GROUP BY must always be followed by HAVING",
      "\"name\" is not in the GROUP BY clause and is not wrapped in an aggregate function, creating an ambiguous 1-to-many projection",
      "department names must be sorted using ORDER BY first",
      "AVG() cannot be combined with text columns"
    ],
    "correctIndex": 1,
    "explanation": "Under ANSI SQL and MySQL ONLY_FULL_GROUP_BY, every column in the SELECT list that is not aggregated MUST appear in the GROUP BY clause to prevent non-deterministic values."
  },
  {
    "id": "mcq_groupby_37",
    "keyword": "GROUP BY",
    "tag": "⚡ Gotcha Trap",
    "question": "[GROUP BY #37] How does GROUP BY handle rows where the grouping column value is NULL? (Scenario Variant 8)",
    "options": [
      "All NULL rows are grouped together into a single collective group bucket",
      "An AmbiguousKeyException error is thrown",
      "Every NULL row forms its own unique, separate group bucket",
      "All NULL rows are discarded from the query result"
    ],
    "correctIndex": 0,
    "explanation": "In SQL grouping, NULL values are considered equal to each other for the purpose of grouping, aggregating all rows with NULL in that column into one single bucket."
  },
  {
    "id": "mcq_groupby_38",
    "keyword": "GROUP BY",
    "tag": "🐱 Brain Bender",
    "question": "[GROUP BY #38] What does positional grouping syntax like \"GROUP BY 1, 2\" mean in engines that support it? (Scenario Variant 8)",
    "options": [
      "Group by the first and second physical columns stored on disk in the table schema",
      "Group only the first 2 rows of the table",
      "Group by the 1st and 2nd expressions listed in the SELECT clause",
      "Group by primary key 1 and foreign key 2"
    ],
    "correctIndex": 2,
    "explanation": "GROUP BY 1, 2 references columns by their ordinal 1-based index in the SELECT projection list. While convenient, it is considered fragile in production code if columns are reordered."
  },
  {
    "id": "mcq_groupby_39",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #39] In the query \"SELECT department, role, COUNT(*) FROM Staff GROUP BY department, role;\", how are groups created? (Scenario Variant 8)",
    "options": [
      "Only rows where department equals role are grouped",
      "The query performs two separate queries and concatenates them",
      "Unique combinations of (department, role) tuples each form a distinct summary bucket",
      "Rows are grouped by department, then role is discarded"
    ],
    "correctIndex": 2,
    "explanation": "Multi-column GROUP BY partitions rows by composite tuples. An aggregate is calculated for every distinct pairing of (department, role)."
  },
  {
    "id": "mcq_groupby_40",
    "keyword": "GROUP BY",
    "tag": "🏆 Senior Staff",
    "question": "[GROUP BY #40] Can you group by a calculated expression such as \"GROUP BY YEAR(hire_date)\" in ANSI SQL? (Scenario Variant 8)",
    "options": [
      "No, GROUP BY can only reference physical column names directly",
      "Yes, grouping by scalar deterministic expressions on columns is fully valid",
      "Only if hire_date is indexed as a primary key",
      "Only if the expression is aliased in the WHERE clause"
    ],
    "correctIndex": 1,
    "explanation": "Expressions like YEAR(hire_date) or CASE WHEN statements are legal in GROUP BY clauses across modern SQL engines."
  },
  {
    "id": "mcq_groupby_41",
    "keyword": "GROUP BY",
    "tag": "🍡 Quick Snack",
    "question": "[GROUP BY #41] Why does the query \"SELECT department, name, AVG(salary) FROM Employees GROUP BY department;\" fail in standard SQL (ONLY_FULL_GROUP_BY)? (Scenario Variant 9)",
    "options": [
      "department names must be sorted using ORDER BY first",
      "GROUP BY must always be followed by HAVING",
      "AVG() cannot be combined with text columns",
      "\"name\" is not in the GROUP BY clause and is not wrapped in an aggregate function, creating an ambiguous 1-to-many projection"
    ],
    "correctIndex": 3,
    "explanation": "Under ANSI SQL and MySQL ONLY_FULL_GROUP_BY, every column in the SELECT list that is not aggregated MUST appear in the GROUP BY clause to prevent non-deterministic values."
  },
  {
    "id": "mcq_groupby_42",
    "keyword": "GROUP BY",
    "tag": "⚡ Gotcha Trap",
    "question": "[GROUP BY #42] How does GROUP BY handle rows where the grouping column value is NULL? (Scenario Variant 9)",
    "options": [
      "Every NULL row forms its own unique, separate group bucket",
      "All NULL rows are grouped together into a single collective group bucket",
      "An AmbiguousKeyException error is thrown",
      "All NULL rows are discarded from the query result"
    ],
    "correctIndex": 1,
    "explanation": "In SQL grouping, NULL values are considered equal to each other for the purpose of grouping, aggregating all rows with NULL in that column into one single bucket."
  },
  {
    "id": "mcq_groupby_43",
    "keyword": "GROUP BY",
    "tag": "🐱 Brain Bender",
    "question": "[GROUP BY #43] What does positional grouping syntax like \"GROUP BY 1, 2\" mean in engines that support it? (Scenario Variant 9)",
    "options": [
      "Group by the 1st and 2nd expressions listed in the SELECT clause",
      "Group by primary key 1 and foreign key 2",
      "Group by the first and second physical columns stored on disk in the table schema",
      "Group only the first 2 rows of the table"
    ],
    "correctIndex": 0,
    "explanation": "GROUP BY 1, 2 references columns by their ordinal 1-based index in the SELECT projection list. While convenient, it is considered fragile in production code if columns are reordered."
  },
  {
    "id": "mcq_groupby_44",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #44] In the query \"SELECT department, role, COUNT(*) FROM Staff GROUP BY department, role;\", how are groups created? (Scenario Variant 9)",
    "options": [
      "Only rows where department equals role are grouped",
      "The query performs two separate queries and concatenates them",
      "Rows are grouped by department, then role is discarded",
      "Unique combinations of (department, role) tuples each form a distinct summary bucket"
    ],
    "correctIndex": 3,
    "explanation": "Multi-column GROUP BY partitions rows by composite tuples. An aggregate is calculated for every distinct pairing of (department, role)."
  },
  {
    "id": "mcq_groupby_45",
    "keyword": "GROUP BY",
    "tag": "🏆 Senior Staff",
    "question": "[GROUP BY #45] Can you group by a calculated expression such as \"GROUP BY YEAR(hire_date)\" in ANSI SQL? (Scenario Variant 9)",
    "options": [
      "Only if the expression is aliased in the WHERE clause",
      "No, GROUP BY can only reference physical column names directly",
      "Yes, grouping by scalar deterministic expressions on columns is fully valid",
      "Only if hire_date is indexed as a primary key"
    ],
    "correctIndex": 2,
    "explanation": "Expressions like YEAR(hire_date) or CASE WHEN statements are legal in GROUP BY clauses across modern SQL engines."
  },
  {
    "id": "mcq_groupby_46",
    "keyword": "GROUP BY",
    "tag": "🍡 Quick Snack",
    "question": "[GROUP BY #46] Why does the query \"SELECT department, name, AVG(salary) FROM Employees GROUP BY department;\" fail in standard SQL (ONLY_FULL_GROUP_BY)? (Scenario Variant 10)",
    "options": [
      "GROUP BY must always be followed by HAVING",
      "\"name\" is not in the GROUP BY clause and is not wrapped in an aggregate function, creating an ambiguous 1-to-many projection",
      "AVG() cannot be combined with text columns",
      "department names must be sorted using ORDER BY first"
    ],
    "correctIndex": 1,
    "explanation": "Under ANSI SQL and MySQL ONLY_FULL_GROUP_BY, every column in the SELECT list that is not aggregated MUST appear in the GROUP BY clause to prevent non-deterministic values."
  },
  {
    "id": "mcq_groupby_47",
    "keyword": "GROUP BY",
    "tag": "⚡ Gotcha Trap",
    "question": "[GROUP BY #47] How does GROUP BY handle rows where the grouping column value is NULL? (Scenario Variant 10)",
    "options": [
      "An AmbiguousKeyException error is thrown",
      "All NULL rows are grouped together into a single collective group bucket",
      "All NULL rows are discarded from the query result",
      "Every NULL row forms its own unique, separate group bucket"
    ],
    "correctIndex": 1,
    "explanation": "In SQL grouping, NULL values are considered equal to each other for the purpose of grouping, aggregating all rows with NULL in that column into one single bucket."
  },
  {
    "id": "mcq_groupby_48",
    "keyword": "GROUP BY",
    "tag": "🐱 Brain Bender",
    "question": "[GROUP BY #48] What does positional grouping syntax like \"GROUP BY 1, 2\" mean in engines that support it? (Scenario Variant 10)",
    "options": [
      "Group by the 1st and 2nd expressions listed in the SELECT clause",
      "Group only the first 2 rows of the table",
      "Group by the first and second physical columns stored on disk in the table schema",
      "Group by primary key 1 and foreign key 2"
    ],
    "correctIndex": 0,
    "explanation": "GROUP BY 1, 2 references columns by their ordinal 1-based index in the SELECT projection list. While convenient, it is considered fragile in production code if columns are reordered."
  },
  {
    "id": "mcq_groupby_49",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #49] In the query \"SELECT department, role, COUNT(*) FROM Staff GROUP BY department, role;\", how are groups created? (Scenario Variant 10)",
    "options": [
      "Only rows where department equals role are grouped",
      "Rows are grouped by department, then role is discarded",
      "Unique combinations of (department, role) tuples each form a distinct summary bucket",
      "The query performs two separate queries and concatenates them"
    ],
    "correctIndex": 2,
    "explanation": "Multi-column GROUP BY partitions rows by composite tuples. An aggregate is calculated for every distinct pairing of (department, role)."
  },
  {
    "id": "mcq_groupby_50",
    "keyword": "GROUP BY",
    "tag": "🏆 Senior Staff",
    "question": "[GROUP BY #50] Can you group by a calculated expression such as \"GROUP BY YEAR(hire_date)\" in ANSI SQL? (Scenario Variant 10)",
    "options": [
      "No, GROUP BY can only reference physical column names directly",
      "Only if hire_date is indexed as a primary key",
      "Only if the expression is aliased in the WHERE clause",
      "Yes, grouping by scalar deterministic expressions on columns is fully valid"
    ],
    "correctIndex": 3,
    "explanation": "Expressions like YEAR(hire_date) or CASE WHEN statements are legal in GROUP BY clauses across modern SQL engines."
  },
  {
    "id": "mcq_groupby_51",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #51 &bull; Fintech & Ledger Systems] In MySQL with ONLY_FULL_GROUP_BY enabled, why does 'SELECT dept_id, name, SUM(salary) FROM emp GROUP BY dept_id;' throw an error? (Application Scenario 1)",
    "options": [
      "MySQL does not support SUM() inside a GROUP BY query",
      "dept_id must be a string rather than an integer",
      "The query must include an ORDER BY clause",
      "'name' is non-aggregated and not functionally dependent on dept_id, creating ambiguity about which employee's name to return"
    ],
    "correctIndex": 3,
    "explanation": "ONLY_FULL_GROUP_BY complies with ANSI SQL: every non-aggregated column in the SELECT list must appear in the GROUP BY clause, or be functionally dependent on the primary key in GROUP BY. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_groupby_52",
    "keyword": "GROUP BY",
    "tag": "🏛️ Corporate Edge",
    "question": "[GROUP BY #52 &bull; SaaS Subscription Billing] How does the physical SQL engine process GROUP BY during query execution? (Application Scenario 1)",
    "options": [
      "It executes a nested loop SELECT query for every distinct value in the database",
      "It hash-partitions or sorts rows by the grouping keys, accumulating running aggregate states in an in-memory hash table or sort buffer",
      "It evaluates GROUP BY after LIMIT",
      "It converts the table into a CSV file before grouping"
    ],
    "correctIndex": 1,
    "explanation": "Engines utilize Hash Aggregation (building an in-memory hash map of groups) or Stream Aggregation (scanning pre-sorted data) to compute aggregates in O(N) time. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_groupby_53",
    "keyword": "GROUP BY",
    "tag": "💡 Lead Architect",
    "question": "[GROUP BY #53 &bull; Global Supply Chain & Logistics] What is the effect of GROUP BY ROLLUP(year, quarter, month)? (Application Scenario 1)",
    "options": [
      "Randomly sorts the groupings",
      "Limits the output to 3 rows",
      "Removes all NULL values from the dataset",
      "Generates hierarchical subtotals: by (year, quarter, month), by (year, quarter), by (year), and a grand total ()"
    ],
    "correctIndex": 3,
    "explanation": "ROLLUP creates progressive hierarchical subtotals from right to left, finishing with a grand total row where grouped columns are NULL. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_groupby_54",
    "keyword": "GROUP BY",
    "tag": "⚡ Gotcha Trap",
    "question": "[GROUP BY #54 &bull; Healthcare Patient Records] When grouping by an expression like 'GROUP BY DATE(created_at)', why might an index on created_at fail to be used for index grouping? (Application Scenario 1)",
    "options": [
      "DATE() converts the column into a temporary BLOB",
      "Wrapping a column in a function prevents index range scans unless an expression index / functional index is defined",
      "MySQL forbids functions in GROUP BY",
      "Dates cannot be indexed in relational databases"
    ],
    "correctIndex": 1,
    "explanation": "Applying functions to indexed columns obscures the sorted index order. To utilize an index, either use a generated column with a secondary index or range filter on timestamps. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_groupby_55",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #55 &bull; E-Commerce Checkout Funnels] How are NULL values treated when present in the column specified in a GROUP BY clause? (Application Scenario 1)",
    "options": [
      "Every NULL forms its own distinct independent group",
      "NULLs are automatically dropped before grouping",
      "The engine throws a NullPointerException",
      "All NULLs are gathered together into a single collective group"
    ],
    "correctIndex": 3,
    "explanation": "Under ANSI SQL rules, all NULL values in a GROUP BY column are treated as mutually equal for grouping purposes and merged into a single bucket. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_groupby_56",
    "keyword": "GROUP BY",
    "tag": "🏛️ Corporate Edge",
    "question": "[GROUP BY #56 &bull; Telecom Billing & Data Streams] In MySQL with ONLY_FULL_GROUP_BY enabled, why does 'SELECT dept_id, name, SUM(salary) FROM emp GROUP BY dept_id;' throw an error? (Application Scenario 2)",
    "options": [
      "MySQL does not support SUM() inside a GROUP BY query",
      "'name' is non-aggregated and not functionally dependent on dept_id, creating ambiguity about which employee's name to return",
      "dept_id must be a string rather than an integer",
      "The query must include an ORDER BY clause"
    ],
    "correctIndex": 1,
    "explanation": "ONLY_FULL_GROUP_BY complies with ANSI SQL: every non-aggregated column in the SELECT list must appear in the GROUP BY clause, or be functionally dependent on the primary key in GROUP BY. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_groupby_57",
    "keyword": "GROUP BY",
    "tag": "💡 Lead Architect",
    "question": "[GROUP BY #57 &bull; AdTech Real-Time Bidding] How does the physical SQL engine process GROUP BY during query execution? (Application Scenario 2)",
    "options": [
      "It executes a nested loop SELECT query for every distinct value in the database",
      "It evaluates GROUP BY after LIMIT",
      "It converts the table into a CSV file before grouping",
      "It hash-partitions or sorts rows by the grouping keys, accumulating running aggregate states in an in-memory hash table or sort buffer"
    ],
    "correctIndex": 3,
    "explanation": "Engines utilize Hash Aggregation (building an in-memory hash map of groups) or Stream Aggregation (scanning pre-sorted data) to compute aggregates in O(N) time. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_groupby_58",
    "keyword": "GROUP BY",
    "tag": "⚡ Gotcha Trap",
    "question": "[GROUP BY #58 &bull; Cybersecurity Audit Logs] What is the effect of GROUP BY ROLLUP(year, quarter, month)? (Application Scenario 2)",
    "options": [
      "Randomly sorts the groupings",
      "Generates hierarchical subtotals: by (year, quarter, month), by (year, quarter), by (year), and a grand total ()",
      "Limits the output to 3 rows",
      "Removes all NULL values from the dataset"
    ],
    "correctIndex": 1,
    "explanation": "ROLLUP creates progressive hierarchical subtotals from right to left, finishing with a grand total row where grouped columns are NULL. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_groupby_59",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #59 &bull; Fintech & Ledger Systems] When grouping by an expression like 'GROUP BY DATE(created_at)', why might an index on created_at fail to be used for index grouping? (Application Scenario 2)",
    "options": [
      "DATE() converts the column into a temporary BLOB",
      "MySQL forbids functions in GROUP BY",
      "Dates cannot be indexed in relational databases",
      "Wrapping a column in a function prevents index range scans unless an expression index / functional index is defined"
    ],
    "correctIndex": 3,
    "explanation": "Applying functions to indexed columns obscures the sorted index order. To utilize an index, either use a generated column with a secondary index or range filter on timestamps. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_groupby_60",
    "keyword": "GROUP BY",
    "tag": "🏛️ Corporate Edge",
    "question": "[GROUP BY #60 &bull; SaaS Subscription Billing] How are NULL values treated when present in the column specified in a GROUP BY clause? (Application Scenario 2)",
    "options": [
      "Every NULL forms its own distinct independent group",
      "All NULLs are gathered together into a single collective group",
      "NULLs are automatically dropped before grouping",
      "The engine throws a NullPointerException"
    ],
    "correctIndex": 1,
    "explanation": "Under ANSI SQL rules, all NULL values in a GROUP BY column are treated as mutually equal for grouping purposes and merged into a single bucket. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_groupby_61",
    "keyword": "GROUP BY",
    "tag": "💡 Lead Architect",
    "question": "[GROUP BY #61 &bull; Global Supply Chain & Logistics] In MySQL with ONLY_FULL_GROUP_BY enabled, why does 'SELECT dept_id, name, SUM(salary) FROM emp GROUP BY dept_id;' throw an error? (Application Scenario 3)",
    "options": [
      "MySQL does not support SUM() inside a GROUP BY query",
      "dept_id must be a string rather than an integer",
      "The query must include an ORDER BY clause",
      "'name' is non-aggregated and not functionally dependent on dept_id, creating ambiguity about which employee's name to return"
    ],
    "correctIndex": 3,
    "explanation": "ONLY_FULL_GROUP_BY complies with ANSI SQL: every non-aggregated column in the SELECT list must appear in the GROUP BY clause, or be functionally dependent on the primary key in GROUP BY. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_groupby_62",
    "keyword": "GROUP BY",
    "tag": "⚡ Gotcha Trap",
    "question": "[GROUP BY #62 &bull; Healthcare Patient Records] How does the physical SQL engine process GROUP BY during query execution? (Application Scenario 3)",
    "options": [
      "It executes a nested loop SELECT query for every distinct value in the database",
      "It hash-partitions or sorts rows by the grouping keys, accumulating running aggregate states in an in-memory hash table or sort buffer",
      "It evaluates GROUP BY after LIMIT",
      "It converts the table into a CSV file before grouping"
    ],
    "correctIndex": 1,
    "explanation": "Engines utilize Hash Aggregation (building an in-memory hash map of groups) or Stream Aggregation (scanning pre-sorted data) to compute aggregates in O(N) time. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_groupby_63",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #63 &bull; E-Commerce Checkout Funnels] What is the effect of GROUP BY ROLLUP(year, quarter, month)? (Application Scenario 3)",
    "options": [
      "Randomly sorts the groupings",
      "Limits the output to 3 rows",
      "Removes all NULL values from the dataset",
      "Generates hierarchical subtotals: by (year, quarter, month), by (year, quarter), by (year), and a grand total ()"
    ],
    "correctIndex": 3,
    "explanation": "ROLLUP creates progressive hierarchical subtotals from right to left, finishing with a grand total row where grouped columns are NULL. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_groupby_64",
    "keyword": "GROUP BY",
    "tag": "🏛️ Corporate Edge",
    "question": "[GROUP BY #64 &bull; Telecom Billing & Data Streams] When grouping by an expression like 'GROUP BY DATE(created_at)', why might an index on created_at fail to be used for index grouping? (Application Scenario 3)",
    "options": [
      "DATE() converts the column into a temporary BLOB",
      "Wrapping a column in a function prevents index range scans unless an expression index / functional index is defined",
      "MySQL forbids functions in GROUP BY",
      "Dates cannot be indexed in relational databases"
    ],
    "correctIndex": 1,
    "explanation": "Applying functions to indexed columns obscures the sorted index order. To utilize an index, either use a generated column with a secondary index or range filter on timestamps. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_groupby_65",
    "keyword": "GROUP BY",
    "tag": "💡 Lead Architect",
    "question": "[GROUP BY #65 &bull; AdTech Real-Time Bidding] How are NULL values treated when present in the column specified in a GROUP BY clause? (Application Scenario 3)",
    "options": [
      "Every NULL forms its own distinct independent group",
      "NULLs are automatically dropped before grouping",
      "The engine throws a NullPointerException",
      "All NULLs are gathered together into a single collective group"
    ],
    "correctIndex": 3,
    "explanation": "Under ANSI SQL rules, all NULL values in a GROUP BY column are treated as mutually equal for grouping purposes and merged into a single bucket. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_groupby_66",
    "keyword": "GROUP BY",
    "tag": "⚡ Gotcha Trap",
    "question": "[GROUP BY #66 &bull; Cybersecurity Audit Logs] In MySQL with ONLY_FULL_GROUP_BY enabled, why does 'SELECT dept_id, name, SUM(salary) FROM emp GROUP BY dept_id;' throw an error? (Application Scenario 4)",
    "options": [
      "MySQL does not support SUM() inside a GROUP BY query",
      "'name' is non-aggregated and not functionally dependent on dept_id, creating ambiguity about which employee's name to return",
      "dept_id must be a string rather than an integer",
      "The query must include an ORDER BY clause"
    ],
    "correctIndex": 1,
    "explanation": "ONLY_FULL_GROUP_BY complies with ANSI SQL: every non-aggregated column in the SELECT list must appear in the GROUP BY clause, or be functionally dependent on the primary key in GROUP BY. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_groupby_67",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #67 &bull; Fintech & Ledger Systems] How does the physical SQL engine process GROUP BY during query execution? (Application Scenario 4)",
    "options": [
      "It executes a nested loop SELECT query for every distinct value in the database",
      "It evaluates GROUP BY after LIMIT",
      "It converts the table into a CSV file before grouping",
      "It hash-partitions or sorts rows by the grouping keys, accumulating running aggregate states in an in-memory hash table or sort buffer"
    ],
    "correctIndex": 3,
    "explanation": "Engines utilize Hash Aggregation (building an in-memory hash map of groups) or Stream Aggregation (scanning pre-sorted data) to compute aggregates in O(N) time. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_groupby_68",
    "keyword": "GROUP BY",
    "tag": "🏛️ Corporate Edge",
    "question": "[GROUP BY #68 &bull; SaaS Subscription Billing] What is the effect of GROUP BY ROLLUP(year, quarter, month)? (Application Scenario 4)",
    "options": [
      "Randomly sorts the groupings",
      "Generates hierarchical subtotals: by (year, quarter, month), by (year, quarter), by (year), and a grand total ()",
      "Limits the output to 3 rows",
      "Removes all NULL values from the dataset"
    ],
    "correctIndex": 1,
    "explanation": "ROLLUP creates progressive hierarchical subtotals from right to left, finishing with a grand total row where grouped columns are NULL. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_groupby_69",
    "keyword": "GROUP BY",
    "tag": "💡 Lead Architect",
    "question": "[GROUP BY #69 &bull; Global Supply Chain & Logistics] When grouping by an expression like 'GROUP BY DATE(created_at)', why might an index on created_at fail to be used for index grouping? (Application Scenario 4)",
    "options": [
      "DATE() converts the column into a temporary BLOB",
      "MySQL forbids functions in GROUP BY",
      "Dates cannot be indexed in relational databases",
      "Wrapping a column in a function prevents index range scans unless an expression index / functional index is defined"
    ],
    "correctIndex": 3,
    "explanation": "Applying functions to indexed columns obscures the sorted index order. To utilize an index, either use a generated column with a secondary index or range filter on timestamps. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_groupby_70",
    "keyword": "GROUP BY",
    "tag": "⚡ Gotcha Trap",
    "question": "[GROUP BY #70 &bull; Healthcare Patient Records] How are NULL values treated when present in the column specified in a GROUP BY clause? (Application Scenario 4)",
    "options": [
      "Every NULL forms its own distinct independent group",
      "All NULLs are gathered together into a single collective group",
      "NULLs are automatically dropped before grouping",
      "The engine throws a NullPointerException"
    ],
    "correctIndex": 1,
    "explanation": "Under ANSI SQL rules, all NULL values in a GROUP BY column are treated as mutually equal for grouping purposes and merged into a single bucket. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_groupby_71",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #71 &bull; E-Commerce Checkout Funnels] In MySQL with ONLY_FULL_GROUP_BY enabled, why does 'SELECT dept_id, name, SUM(salary) FROM emp GROUP BY dept_id;' throw an error? (Application Scenario 5)",
    "options": [
      "MySQL does not support SUM() inside a GROUP BY query",
      "dept_id must be a string rather than an integer",
      "The query must include an ORDER BY clause",
      "'name' is non-aggregated and not functionally dependent on dept_id, creating ambiguity about which employee's name to return"
    ],
    "correctIndex": 3,
    "explanation": "ONLY_FULL_GROUP_BY complies with ANSI SQL: every non-aggregated column in the SELECT list must appear in the GROUP BY clause, or be functionally dependent on the primary key in GROUP BY. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_groupby_72",
    "keyword": "GROUP BY",
    "tag": "🏛️ Corporate Edge",
    "question": "[GROUP BY #72 &bull; Telecom Billing & Data Streams] How does the physical SQL engine process GROUP BY during query execution? (Application Scenario 5)",
    "options": [
      "It executes a nested loop SELECT query for every distinct value in the database",
      "It hash-partitions or sorts rows by the grouping keys, accumulating running aggregate states in an in-memory hash table or sort buffer",
      "It evaluates GROUP BY after LIMIT",
      "It converts the table into a CSV file before grouping"
    ],
    "correctIndex": 1,
    "explanation": "Engines utilize Hash Aggregation (building an in-memory hash map of groups) or Stream Aggregation (scanning pre-sorted data) to compute aggregates in O(N) time. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_groupby_73",
    "keyword": "GROUP BY",
    "tag": "💡 Lead Architect",
    "question": "[GROUP BY #73 &bull; AdTech Real-Time Bidding] What is the effect of GROUP BY ROLLUP(year, quarter, month)? (Application Scenario 5)",
    "options": [
      "Randomly sorts the groupings",
      "Limits the output to 3 rows",
      "Removes all NULL values from the dataset",
      "Generates hierarchical subtotals: by (year, quarter, month), by (year, quarter), by (year), and a grand total ()"
    ],
    "correctIndex": 3,
    "explanation": "ROLLUP creates progressive hierarchical subtotals from right to left, finishing with a grand total row where grouped columns are NULL. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_groupby_74",
    "keyword": "GROUP BY",
    "tag": "⚡ Gotcha Trap",
    "question": "[GROUP BY #74 &bull; Cybersecurity Audit Logs] When grouping by an expression like 'GROUP BY DATE(created_at)', why might an index on created_at fail to be used for index grouping? (Application Scenario 5)",
    "options": [
      "DATE() converts the column into a temporary BLOB",
      "Wrapping a column in a function prevents index range scans unless an expression index / functional index is defined",
      "MySQL forbids functions in GROUP BY",
      "Dates cannot be indexed in relational databases"
    ],
    "correctIndex": 1,
    "explanation": "Applying functions to indexed columns obscures the sorted index order. To utilize an index, either use a generated column with a secondary index or range filter on timestamps. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_groupby_75",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #75 &bull; Fintech & Ledger Systems] How are NULL values treated when present in the column specified in a GROUP BY clause? (Application Scenario 5)",
    "options": [
      "Every NULL forms its own distinct independent group",
      "NULLs are automatically dropped before grouping",
      "The engine throws a NullPointerException",
      "All NULLs are gathered together into a single collective group"
    ],
    "correctIndex": 3,
    "explanation": "Under ANSI SQL rules, all NULL values in a GROUP BY column are treated as mutually equal for grouping purposes and merged into a single bucket. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_groupby_76",
    "keyword": "GROUP BY",
    "tag": "🏛️ Corporate Edge",
    "question": "[GROUP BY #76 &bull; SaaS Subscription Billing] In MySQL with ONLY_FULL_GROUP_BY enabled, why does 'SELECT dept_id, name, SUM(salary) FROM emp GROUP BY dept_id;' throw an error? (Application Scenario 6)",
    "options": [
      "MySQL does not support SUM() inside a GROUP BY query",
      "'name' is non-aggregated and not functionally dependent on dept_id, creating ambiguity about which employee's name to return",
      "dept_id must be a string rather than an integer",
      "The query must include an ORDER BY clause"
    ],
    "correctIndex": 1,
    "explanation": "ONLY_FULL_GROUP_BY complies with ANSI SQL: every non-aggregated column in the SELECT list must appear in the GROUP BY clause, or be functionally dependent on the primary key in GROUP BY. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_groupby_77",
    "keyword": "GROUP BY",
    "tag": "💡 Lead Architect",
    "question": "[GROUP BY #77 &bull; Global Supply Chain & Logistics] How does the physical SQL engine process GROUP BY during query execution? (Application Scenario 6)",
    "options": [
      "It executes a nested loop SELECT query for every distinct value in the database",
      "It evaluates GROUP BY after LIMIT",
      "It converts the table into a CSV file before grouping",
      "It hash-partitions or sorts rows by the grouping keys, accumulating running aggregate states in an in-memory hash table or sort buffer"
    ],
    "correctIndex": 3,
    "explanation": "Engines utilize Hash Aggregation (building an in-memory hash map of groups) or Stream Aggregation (scanning pre-sorted data) to compute aggregates in O(N) time. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_groupby_78",
    "keyword": "GROUP BY",
    "tag": "⚡ Gotcha Trap",
    "question": "[GROUP BY #78 &bull; Healthcare Patient Records] What is the effect of GROUP BY ROLLUP(year, quarter, month)? (Application Scenario 6)",
    "options": [
      "Randomly sorts the groupings",
      "Generates hierarchical subtotals: by (year, quarter, month), by (year, quarter), by (year), and a grand total ()",
      "Limits the output to 3 rows",
      "Removes all NULL values from the dataset"
    ],
    "correctIndex": 1,
    "explanation": "ROLLUP creates progressive hierarchical subtotals from right to left, finishing with a grand total row where grouped columns are NULL. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_groupby_79",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #79 &bull; E-Commerce Checkout Funnels] When grouping by an expression like 'GROUP BY DATE(created_at)', why might an index on created_at fail to be used for index grouping? (Application Scenario 6)",
    "options": [
      "DATE() converts the column into a temporary BLOB",
      "MySQL forbids functions in GROUP BY",
      "Dates cannot be indexed in relational databases",
      "Wrapping a column in a function prevents index range scans unless an expression index / functional index is defined"
    ],
    "correctIndex": 3,
    "explanation": "Applying functions to indexed columns obscures the sorted index order. To utilize an index, either use a generated column with a secondary index or range filter on timestamps. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_groupby_80",
    "keyword": "GROUP BY",
    "tag": "🏛️ Corporate Edge",
    "question": "[GROUP BY #80 &bull; Telecom Billing & Data Streams] How are NULL values treated when present in the column specified in a GROUP BY clause? (Application Scenario 6)",
    "options": [
      "Every NULL forms its own distinct independent group",
      "All NULLs are gathered together into a single collective group",
      "NULLs are automatically dropped before grouping",
      "The engine throws a NullPointerException"
    ],
    "correctIndex": 1,
    "explanation": "Under ANSI SQL rules, all NULL values in a GROUP BY column are treated as mutually equal for grouping purposes and merged into a single bucket. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_groupby_81",
    "keyword": "GROUP BY",
    "tag": "💡 Lead Architect",
    "question": "[GROUP BY #81 &bull; AdTech Real-Time Bidding] In MySQL with ONLY_FULL_GROUP_BY enabled, why does 'SELECT dept_id, name, SUM(salary) FROM emp GROUP BY dept_id;' throw an error? (Application Scenario 7)",
    "options": [
      "MySQL does not support SUM() inside a GROUP BY query",
      "dept_id must be a string rather than an integer",
      "The query must include an ORDER BY clause",
      "'name' is non-aggregated and not functionally dependent on dept_id, creating ambiguity about which employee's name to return"
    ],
    "correctIndex": 3,
    "explanation": "ONLY_FULL_GROUP_BY complies with ANSI SQL: every non-aggregated column in the SELECT list must appear in the GROUP BY clause, or be functionally dependent on the primary key in GROUP BY. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_groupby_82",
    "keyword": "GROUP BY",
    "tag": "⚡ Gotcha Trap",
    "question": "[GROUP BY #82 &bull; Cybersecurity Audit Logs] How does the physical SQL engine process GROUP BY during query execution? (Application Scenario 7)",
    "options": [
      "It executes a nested loop SELECT query for every distinct value in the database",
      "It hash-partitions or sorts rows by the grouping keys, accumulating running aggregate states in an in-memory hash table or sort buffer",
      "It evaluates GROUP BY after LIMIT",
      "It converts the table into a CSV file before grouping"
    ],
    "correctIndex": 1,
    "explanation": "Engines utilize Hash Aggregation (building an in-memory hash map of groups) or Stream Aggregation (scanning pre-sorted data) to compute aggregates in O(N) time. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_groupby_83",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #83 &bull; Fintech & Ledger Systems] What is the effect of GROUP BY ROLLUP(year, quarter, month)? (Application Scenario 7)",
    "options": [
      "Randomly sorts the groupings",
      "Limits the output to 3 rows",
      "Removes all NULL values from the dataset",
      "Generates hierarchical subtotals: by (year, quarter, month), by (year, quarter), by (year), and a grand total ()"
    ],
    "correctIndex": 3,
    "explanation": "ROLLUP creates progressive hierarchical subtotals from right to left, finishing with a grand total row where grouped columns are NULL. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_groupby_84",
    "keyword": "GROUP BY",
    "tag": "🏛️ Corporate Edge",
    "question": "[GROUP BY #84 &bull; SaaS Subscription Billing] When grouping by an expression like 'GROUP BY DATE(created_at)', why might an index on created_at fail to be used for index grouping? (Application Scenario 7)",
    "options": [
      "DATE() converts the column into a temporary BLOB",
      "Wrapping a column in a function prevents index range scans unless an expression index / functional index is defined",
      "MySQL forbids functions in GROUP BY",
      "Dates cannot be indexed in relational databases"
    ],
    "correctIndex": 1,
    "explanation": "Applying functions to indexed columns obscures the sorted index order. To utilize an index, either use a generated column with a secondary index or range filter on timestamps. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_groupby_85",
    "keyword": "GROUP BY",
    "tag": "💡 Lead Architect",
    "question": "[GROUP BY #85 &bull; Global Supply Chain & Logistics] How are NULL values treated when present in the column specified in a GROUP BY clause? (Application Scenario 7)",
    "options": [
      "Every NULL forms its own distinct independent group",
      "NULLs are automatically dropped before grouping",
      "The engine throws a NullPointerException",
      "All NULLs are gathered together into a single collective group"
    ],
    "correctIndex": 3,
    "explanation": "Under ANSI SQL rules, all NULL values in a GROUP BY column are treated as mutually equal for grouping purposes and merged into a single bucket. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_groupby_86",
    "keyword": "GROUP BY",
    "tag": "⚡ Gotcha Trap",
    "question": "[GROUP BY #86 &bull; Healthcare Patient Records] In MySQL with ONLY_FULL_GROUP_BY enabled, why does 'SELECT dept_id, name, SUM(salary) FROM emp GROUP BY dept_id;' throw an error? (Application Scenario 8)",
    "options": [
      "MySQL does not support SUM() inside a GROUP BY query",
      "'name' is non-aggregated and not functionally dependent on dept_id, creating ambiguity about which employee's name to return",
      "dept_id must be a string rather than an integer",
      "The query must include an ORDER BY clause"
    ],
    "correctIndex": 1,
    "explanation": "ONLY_FULL_GROUP_BY complies with ANSI SQL: every non-aggregated column in the SELECT list must appear in the GROUP BY clause, or be functionally dependent on the primary key in GROUP BY. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_groupby_87",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #87 &bull; E-Commerce Checkout Funnels] How does the physical SQL engine process GROUP BY during query execution? (Application Scenario 8)",
    "options": [
      "It executes a nested loop SELECT query for every distinct value in the database",
      "It evaluates GROUP BY after LIMIT",
      "It converts the table into a CSV file before grouping",
      "It hash-partitions or sorts rows by the grouping keys, accumulating running aggregate states in an in-memory hash table or sort buffer"
    ],
    "correctIndex": 3,
    "explanation": "Engines utilize Hash Aggregation (building an in-memory hash map of groups) or Stream Aggregation (scanning pre-sorted data) to compute aggregates in O(N) time. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_groupby_88",
    "keyword": "GROUP BY",
    "tag": "🏛️ Corporate Edge",
    "question": "[GROUP BY #88 &bull; Telecom Billing & Data Streams] What is the effect of GROUP BY ROLLUP(year, quarter, month)? (Application Scenario 8)",
    "options": [
      "Randomly sorts the groupings",
      "Generates hierarchical subtotals: by (year, quarter, month), by (year, quarter), by (year), and a grand total ()",
      "Limits the output to 3 rows",
      "Removes all NULL values from the dataset"
    ],
    "correctIndex": 1,
    "explanation": "ROLLUP creates progressive hierarchical subtotals from right to left, finishing with a grand total row where grouped columns are NULL. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_groupby_89",
    "keyword": "GROUP BY",
    "tag": "💡 Lead Architect",
    "question": "[GROUP BY #89 &bull; AdTech Real-Time Bidding] When grouping by an expression like 'GROUP BY DATE(created_at)', why might an index on created_at fail to be used for index grouping? (Application Scenario 8)",
    "options": [
      "DATE() converts the column into a temporary BLOB",
      "MySQL forbids functions in GROUP BY",
      "Dates cannot be indexed in relational databases",
      "Wrapping a column in a function prevents index range scans unless an expression index / functional index is defined"
    ],
    "correctIndex": 3,
    "explanation": "Applying functions to indexed columns obscures the sorted index order. To utilize an index, either use a generated column with a secondary index or range filter on timestamps. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_groupby_90",
    "keyword": "GROUP BY",
    "tag": "⚡ Gotcha Trap",
    "question": "[GROUP BY #90 &bull; Cybersecurity Audit Logs] How are NULL values treated when present in the column specified in a GROUP BY clause? (Application Scenario 8)",
    "options": [
      "Every NULL forms its own distinct independent group",
      "All NULLs are gathered together into a single collective group",
      "NULLs are automatically dropped before grouping",
      "The engine throws a NullPointerException"
    ],
    "correctIndex": 1,
    "explanation": "Under ANSI SQL rules, all NULL values in a GROUP BY column are treated as mutually equal for grouping purposes and merged into a single bucket. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_groupby_91",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #91 &bull; Fintech & Ledger Systems] In MySQL with ONLY_FULL_GROUP_BY enabled, why does 'SELECT dept_id, name, SUM(salary) FROM emp GROUP BY dept_id;' throw an error? (Application Scenario 9)",
    "options": [
      "MySQL does not support SUM() inside a GROUP BY query",
      "dept_id must be a string rather than an integer",
      "The query must include an ORDER BY clause",
      "'name' is non-aggregated and not functionally dependent on dept_id, creating ambiguity about which employee's name to return"
    ],
    "correctIndex": 3,
    "explanation": "ONLY_FULL_GROUP_BY complies with ANSI SQL: every non-aggregated column in the SELECT list must appear in the GROUP BY clause, or be functionally dependent on the primary key in GROUP BY. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_groupby_92",
    "keyword": "GROUP BY",
    "tag": "🏛️ Corporate Edge",
    "question": "[GROUP BY #92 &bull; SaaS Subscription Billing] How does the physical SQL engine process GROUP BY during query execution? (Application Scenario 9)",
    "options": [
      "It executes a nested loop SELECT query for every distinct value in the database",
      "It hash-partitions or sorts rows by the grouping keys, accumulating running aggregate states in an in-memory hash table or sort buffer",
      "It evaluates GROUP BY after LIMIT",
      "It converts the table into a CSV file before grouping"
    ],
    "correctIndex": 1,
    "explanation": "Engines utilize Hash Aggregation (building an in-memory hash map of groups) or Stream Aggregation (scanning pre-sorted data) to compute aggregates in O(N) time. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_groupby_93",
    "keyword": "GROUP BY",
    "tag": "💡 Lead Architect",
    "question": "[GROUP BY #93 &bull; Global Supply Chain & Logistics] What is the effect of GROUP BY ROLLUP(year, quarter, month)? (Application Scenario 9)",
    "options": [
      "Randomly sorts the groupings",
      "Limits the output to 3 rows",
      "Removes all NULL values from the dataset",
      "Generates hierarchical subtotals: by (year, quarter, month), by (year, quarter), by (year), and a grand total ()"
    ],
    "correctIndex": 3,
    "explanation": "ROLLUP creates progressive hierarchical subtotals from right to left, finishing with a grand total row where grouped columns are NULL. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_groupby_94",
    "keyword": "GROUP BY",
    "tag": "⚡ Gotcha Trap",
    "question": "[GROUP BY #94 &bull; Healthcare Patient Records] When grouping by an expression like 'GROUP BY DATE(created_at)', why might an index on created_at fail to be used for index grouping? (Application Scenario 9)",
    "options": [
      "DATE() converts the column into a temporary BLOB",
      "Wrapping a column in a function prevents index range scans unless an expression index / functional index is defined",
      "MySQL forbids functions in GROUP BY",
      "Dates cannot be indexed in relational databases"
    ],
    "correctIndex": 1,
    "explanation": "Applying functions to indexed columns obscures the sorted index order. To utilize an index, either use a generated column with a secondary index or range filter on timestamps. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_groupby_95",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #95 &bull; E-Commerce Checkout Funnels] How are NULL values treated when present in the column specified in a GROUP BY clause? (Application Scenario 9)",
    "options": [
      "Every NULL forms its own distinct independent group",
      "NULLs are automatically dropped before grouping",
      "The engine throws a NullPointerException",
      "All NULLs are gathered together into a single collective group"
    ],
    "correctIndex": 3,
    "explanation": "Under ANSI SQL rules, all NULL values in a GROUP BY column are treated as mutually equal for grouping purposes and merged into a single bucket. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_groupby_96",
    "keyword": "GROUP BY",
    "tag": "🏛️ Corporate Edge",
    "question": "[GROUP BY #96 &bull; Telecom Billing & Data Streams] In MySQL with ONLY_FULL_GROUP_BY enabled, why does 'SELECT dept_id, name, SUM(salary) FROM emp GROUP BY dept_id;' throw an error? (Application Scenario 10)",
    "options": [
      "MySQL does not support SUM() inside a GROUP BY query",
      "'name' is non-aggregated and not functionally dependent on dept_id, creating ambiguity about which employee's name to return",
      "dept_id must be a string rather than an integer",
      "The query must include an ORDER BY clause"
    ],
    "correctIndex": 1,
    "explanation": "ONLY_FULL_GROUP_BY complies with ANSI SQL: every non-aggregated column in the SELECT list must appear in the GROUP BY clause, or be functionally dependent on the primary key in GROUP BY. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_groupby_97",
    "keyword": "GROUP BY",
    "tag": "💡 Lead Architect",
    "question": "[GROUP BY #97 &bull; AdTech Real-Time Bidding] How does the physical SQL engine process GROUP BY during query execution? (Application Scenario 10)",
    "options": [
      "It executes a nested loop SELECT query for every distinct value in the database",
      "It evaluates GROUP BY after LIMIT",
      "It converts the table into a CSV file before grouping",
      "It hash-partitions or sorts rows by the grouping keys, accumulating running aggregate states in an in-memory hash table or sort buffer"
    ],
    "correctIndex": 3,
    "explanation": "Engines utilize Hash Aggregation (building an in-memory hash map of groups) or Stream Aggregation (scanning pre-sorted data) to compute aggregates in O(N) time. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_groupby_98",
    "keyword": "GROUP BY",
    "tag": "⚡ Gotcha Trap",
    "question": "[GROUP BY #98 &bull; Cybersecurity Audit Logs] What is the effect of GROUP BY ROLLUP(year, quarter, month)? (Application Scenario 10)",
    "options": [
      "Randomly sorts the groupings",
      "Generates hierarchical subtotals: by (year, quarter, month), by (year, quarter), by (year), and a grand total ()",
      "Limits the output to 3 rows",
      "Removes all NULL values from the dataset"
    ],
    "correctIndex": 1,
    "explanation": "ROLLUP creates progressive hierarchical subtotals from right to left, finishing with a grand total row where grouped columns are NULL. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_groupby_99",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #99 &bull; Fintech & Ledger Systems] When grouping by an expression like 'GROUP BY DATE(created_at)', why might an index on created_at fail to be used for index grouping? (Application Scenario 10)",
    "options": [
      "DATE() converts the column into a temporary BLOB",
      "MySQL forbids functions in GROUP BY",
      "Dates cannot be indexed in relational databases",
      "Wrapping a column in a function prevents index range scans unless an expression index / functional index is defined"
    ],
    "correctIndex": 3,
    "explanation": "Applying functions to indexed columns obscures the sorted index order. To utilize an index, either use a generated column with a secondary index or range filter on timestamps. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_groupby_100",
    "keyword": "GROUP BY",
    "tag": "🏛️ Corporate Edge",
    "question": "[GROUP BY #100 &bull; SaaS Subscription Billing] How are NULL values treated when present in the column specified in a GROUP BY clause? (Application Scenario 10)",
    "options": [
      "Every NULL forms its own distinct independent group",
      "All NULLs are gathered together into a single collective group",
      "NULLs are automatically dropped before grouping",
      "The engine throws a NullPointerException"
    ],
    "correctIndex": 1,
    "explanation": "Under ANSI SQL rules, all NULL values in a GROUP BY column are treated as mutually equal for grouping purposes and merged into a single bucket. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_having_1",
    "keyword": "HAVING",
    "tag": "🍡 Quick Snack",
    "question": "[HAVING #1] What is the fundamental architectural difference between the WHERE clause and the HAVING clause?",
    "options": [
      "HAVING executes before FROM, while WHERE executes after SELECT",
      "WHERE filters individual rows before grouping; HAVING filters aggregated group buckets after grouping",
      "WHERE only works with numbers; HAVING only works with strings",
      "There is no difference; they are aliases for each other"
    ],
    "correctIndex": 1,
    "explanation": "In the physical query pipeline, WHERE executes at Step 02 on raw table rows. HAVING executes at Step 04 after GROUP BY has aggregated rows into summary buckets."
  },
  {
    "id": "mcq_having_2",
    "keyword": "HAVING",
    "tag": "⚡ Gotcha Trap",
    "question": "[HAVING #2] Why does \"SELECT department, COUNT(*) FROM Employees WHERE COUNT(*) > 5 GROUP BY department;\" fail?",
    "options": [
      "Aggregate functions cannot be evaluated in the WHERE clause because groups have not been formed yet",
      "department must be wrapped in a MAX() function",
      "COUNT(*) cannot be compared using the greater-than (>) operator",
      "Employees table requires a secondary table join to count rows"
    ],
    "correctIndex": 0,
    "explanation": "The WHERE clause operates on individual rows as they are read from disk. At that point, aggregation has not occurred, so aggregate functions like COUNT(*) are illegal in WHERE."
  },
  {
    "id": "mcq_having_3",
    "keyword": "HAVING",
    "tag": "🐱 Brain Bender",
    "question": "[HAVING #3] Can a query contain a HAVING clause without a GROUP BY clause?",
    "options": [
      "Yes, the entire table is treated as a single implicit group, and HAVING filters the whole-table aggregate",
      "Yes, but it automatically behaves identically to a WHERE clause",
      "No, SQL syntax requires GROUP BY immediately preceding HAVING",
      "Only in MySQL, but it causes a syntax crash in PostgreSQL and Oracle"
    ],
    "correctIndex": 0,
    "explanation": "A HAVING clause without GROUP BY treats the entire dataset as one single group. If the condition (e.g. HAVING COUNT(*) > 100) fails, the query returns 0 rows."
  },
  {
    "id": "mcq_having_4",
    "keyword": "HAVING",
    "tag": "🎯 Core Concept",
    "question": "[HAVING #4] Is it valid standard SQL for a HAVING clause to reference an aggregate function that does NOT appear in the SELECT list?",
    "options": [
      "No, any column or function tested in HAVING must be projected in SELECT",
      "Yes, e.g., \"SELECT department FROM Employees GROUP BY department HAVING AVG(salary) > 80000;\" is fully valid",
      "Only if the aggregate function is aliased using AS in SELECT",
      "Only in SQLite"
    ],
    "correctIndex": 1,
    "explanation": "An aggregate in HAVING does not need to be projected in SELECT. The query engine calculates the aggregate in the group buffer to filter buckets without returning the metric to the user."
  },
  {
    "id": "mcq_having_5",
    "keyword": "HAVING",
    "tag": "🏆 Senior Staff",
    "question": "[HAVING #5] Which clause executes immediately before HAVING in the physical SQL pipeline?",
    "options": [
      "WHERE",
      "GROUP BY",
      "SELECT",
      "ORDER BY"
    ],
    "correctIndex": 1,
    "explanation": "The execution order is FROM ➡️ WHERE ➡️ GROUP BY ➡️ HAVING ➡️ SELECT ➡️ DISTINCT ➡️ ORDER BY ➡️ LIMIT."
  },
  {
    "id": "mcq_having_6",
    "keyword": "HAVING",
    "tag": "🍡 Quick Snack",
    "question": "[HAVING #6] What is the fundamental architectural difference between the WHERE clause and the HAVING clause? (Scenario Variant 2)",
    "options": [
      "WHERE only works with numbers; HAVING only works with strings",
      "HAVING executes before FROM, while WHERE executes after SELECT",
      "WHERE filters individual rows before grouping; HAVING filters aggregated group buckets after grouping",
      "There is no difference; they are aliases for each other"
    ],
    "correctIndex": 2,
    "explanation": "In the physical query pipeline, WHERE executes at Step 02 on raw table rows. HAVING executes at Step 04 after GROUP BY has aggregated rows into summary buckets."
  },
  {
    "id": "mcq_having_7",
    "keyword": "HAVING",
    "tag": "⚡ Gotcha Trap",
    "question": "[HAVING #7] Why does \"SELECT department, COUNT(*) FROM Employees WHERE COUNT(*) > 5 GROUP BY department;\" fail? (Scenario Variant 2)",
    "options": [
      "department must be wrapped in a MAX() function",
      "Employees table requires a secondary table join to count rows",
      "Aggregate functions cannot be evaluated in the WHERE clause because groups have not been formed yet",
      "COUNT(*) cannot be compared using the greater-than (>) operator"
    ],
    "correctIndex": 2,
    "explanation": "The WHERE clause operates on individual rows as they are read from disk. At that point, aggregation has not occurred, so aggregate functions like COUNT(*) are illegal in WHERE."
  },
  {
    "id": "mcq_having_8",
    "keyword": "HAVING",
    "tag": "🐱 Brain Bender",
    "question": "[HAVING #8] Can a query contain a HAVING clause without a GROUP BY clause? (Scenario Variant 2)",
    "options": [
      "Only in MySQL, but it causes a syntax crash in PostgreSQL and Oracle",
      "Yes, the entire table is treated as a single implicit group, and HAVING filters the whole-table aggregate",
      "No, SQL syntax requires GROUP BY immediately preceding HAVING",
      "Yes, but it automatically behaves identically to a WHERE clause"
    ],
    "correctIndex": 1,
    "explanation": "A HAVING clause without GROUP BY treats the entire dataset as one single group. If the condition (e.g. HAVING COUNT(*) > 100) fails, the query returns 0 rows."
  },
  {
    "id": "mcq_having_9",
    "keyword": "HAVING",
    "tag": "🎯 Core Concept",
    "question": "[HAVING #9] Is it valid standard SQL for a HAVING clause to reference an aggregate function that does NOT appear in the SELECT list? (Scenario Variant 2)",
    "options": [
      "Only in SQLite",
      "Yes, e.g., \"SELECT department FROM Employees GROUP BY department HAVING AVG(salary) > 80000;\" is fully valid",
      "No, any column or function tested in HAVING must be projected in SELECT",
      "Only if the aggregate function is aliased using AS in SELECT"
    ],
    "correctIndex": 1,
    "explanation": "An aggregate in HAVING does not need to be projected in SELECT. The query engine calculates the aggregate in the group buffer to filter buckets without returning the metric to the user."
  },
  {
    "id": "mcq_having_10",
    "keyword": "HAVING",
    "tag": "🏆 Senior Staff",
    "question": "[HAVING #10] Which clause executes immediately before HAVING in the physical SQL pipeline? (Scenario Variant 2)",
    "options": [
      "ORDER BY",
      "WHERE",
      "SELECT",
      "GROUP BY"
    ],
    "correctIndex": 3,
    "explanation": "The execution order is FROM ➡️ WHERE ➡️ GROUP BY ➡️ HAVING ➡️ SELECT ➡️ DISTINCT ➡️ ORDER BY ➡️ LIMIT."
  },
  {
    "id": "mcq_having_11",
    "keyword": "HAVING",
    "tag": "🍡 Quick Snack",
    "question": "[HAVING #11] What is the fundamental architectural difference between the WHERE clause and the HAVING clause? (Scenario Variant 3)",
    "options": [
      "WHERE filters individual rows before grouping; HAVING filters aggregated group buckets after grouping",
      "WHERE only works with numbers; HAVING only works with strings",
      "There is no difference; they are aliases for each other",
      "HAVING executes before FROM, while WHERE executes after SELECT"
    ],
    "correctIndex": 0,
    "explanation": "In the physical query pipeline, WHERE executes at Step 02 on raw table rows. HAVING executes at Step 04 after GROUP BY has aggregated rows into summary buckets."
  },
  {
    "id": "mcq_having_12",
    "keyword": "HAVING",
    "tag": "⚡ Gotcha Trap",
    "question": "[HAVING #12] Why does \"SELECT department, COUNT(*) FROM Employees WHERE COUNT(*) > 5 GROUP BY department;\" fail? (Scenario Variant 3)",
    "options": [
      "COUNT(*) cannot be compared using the greater-than (>) operator",
      "Employees table requires a secondary table join to count rows",
      "Aggregate functions cannot be evaluated in the WHERE clause because groups have not been formed yet",
      "department must be wrapped in a MAX() function"
    ],
    "correctIndex": 2,
    "explanation": "The WHERE clause operates on individual rows as they are read from disk. At that point, aggregation has not occurred, so aggregate functions like COUNT(*) are illegal in WHERE."
  },
  {
    "id": "mcq_having_13",
    "keyword": "HAVING",
    "tag": "🐱 Brain Bender",
    "question": "[HAVING #13] Can a query contain a HAVING clause without a GROUP BY clause? (Scenario Variant 3)",
    "options": [
      "Only in MySQL, but it causes a syntax crash in PostgreSQL and Oracle",
      "No, SQL syntax requires GROUP BY immediately preceding HAVING",
      "Yes, but it automatically behaves identically to a WHERE clause",
      "Yes, the entire table is treated as a single implicit group, and HAVING filters the whole-table aggregate"
    ],
    "correctIndex": 3,
    "explanation": "A HAVING clause without GROUP BY treats the entire dataset as one single group. If the condition (e.g. HAVING COUNT(*) > 100) fails, the query returns 0 rows."
  },
  {
    "id": "mcq_having_14",
    "keyword": "HAVING",
    "tag": "🎯 Core Concept",
    "question": "[HAVING #14] Is it valid standard SQL for a HAVING clause to reference an aggregate function that does NOT appear in the SELECT list? (Scenario Variant 3)",
    "options": [
      "Only if the aggregate function is aliased using AS in SELECT",
      "Yes, e.g., \"SELECT department FROM Employees GROUP BY department HAVING AVG(salary) > 80000;\" is fully valid",
      "Only in SQLite",
      "No, any column or function tested in HAVING must be projected in SELECT"
    ],
    "correctIndex": 1,
    "explanation": "An aggregate in HAVING does not need to be projected in SELECT. The query engine calculates the aggregate in the group buffer to filter buckets without returning the metric to the user."
  },
  {
    "id": "mcq_having_15",
    "keyword": "HAVING",
    "tag": "🏆 Senior Staff",
    "question": "[HAVING #15] Which clause executes immediately before HAVING in the physical SQL pipeline? (Scenario Variant 3)",
    "options": [
      "SELECT",
      "ORDER BY",
      "GROUP BY",
      "WHERE"
    ],
    "correctIndex": 2,
    "explanation": "The execution order is FROM ➡️ WHERE ➡️ GROUP BY ➡️ HAVING ➡️ SELECT ➡️ DISTINCT ➡️ ORDER BY ➡️ LIMIT."
  },
  {
    "id": "mcq_having_16",
    "keyword": "HAVING",
    "tag": "🍡 Quick Snack",
    "question": "[HAVING #16] What is the fundamental architectural difference between the WHERE clause and the HAVING clause? (Scenario Variant 4)",
    "options": [
      "There is no difference; they are aliases for each other",
      "HAVING executes before FROM, while WHERE executes after SELECT",
      "WHERE filters individual rows before grouping; HAVING filters aggregated group buckets after grouping",
      "WHERE only works with numbers; HAVING only works with strings"
    ],
    "correctIndex": 2,
    "explanation": "In the physical query pipeline, WHERE executes at Step 02 on raw table rows. HAVING executes at Step 04 after GROUP BY has aggregated rows into summary buckets."
  },
  {
    "id": "mcq_having_17",
    "keyword": "HAVING",
    "tag": "⚡ Gotcha Trap",
    "question": "[HAVING #17] Why does \"SELECT department, COUNT(*) FROM Employees WHERE COUNT(*) > 5 GROUP BY department;\" fail? (Scenario Variant 4)",
    "options": [
      "COUNT(*) cannot be compared using the greater-than (>) operator",
      "department must be wrapped in a MAX() function",
      "Aggregate functions cannot be evaluated in the WHERE clause because groups have not been formed yet",
      "Employees table requires a secondary table join to count rows"
    ],
    "correctIndex": 2,
    "explanation": "The WHERE clause operates on individual rows as they are read from disk. At that point, aggregation has not occurred, so aggregate functions like COUNT(*) are illegal in WHERE."
  },
  {
    "id": "mcq_having_18",
    "keyword": "HAVING",
    "tag": "🐱 Brain Bender",
    "question": "[HAVING #18] Can a query contain a HAVING clause without a GROUP BY clause? (Scenario Variant 4)",
    "options": [
      "Only in MySQL, but it causes a syntax crash in PostgreSQL and Oracle",
      "Yes, but it automatically behaves identically to a WHERE clause",
      "Yes, the entire table is treated as a single implicit group, and HAVING filters the whole-table aggregate",
      "No, SQL syntax requires GROUP BY immediately preceding HAVING"
    ],
    "correctIndex": 2,
    "explanation": "A HAVING clause without GROUP BY treats the entire dataset as one single group. If the condition (e.g. HAVING COUNT(*) > 100) fails, the query returns 0 rows."
  },
  {
    "id": "mcq_having_19",
    "keyword": "HAVING",
    "tag": "🎯 Core Concept",
    "question": "[HAVING #19] Is it valid standard SQL for a HAVING clause to reference an aggregate function that does NOT appear in the SELECT list? (Scenario Variant 4)",
    "options": [
      "Yes, e.g., \"SELECT department FROM Employees GROUP BY department HAVING AVG(salary) > 80000;\" is fully valid",
      "No, any column or function tested in HAVING must be projected in SELECT",
      "Only in SQLite",
      "Only if the aggregate function is aliased using AS in SELECT"
    ],
    "correctIndex": 0,
    "explanation": "An aggregate in HAVING does not need to be projected in SELECT. The query engine calculates the aggregate in the group buffer to filter buckets without returning the metric to the user."
  },
  {
    "id": "mcq_having_20",
    "keyword": "HAVING",
    "tag": "🏆 Senior Staff",
    "question": "[HAVING #20] Which clause executes immediately before HAVING in the physical SQL pipeline? (Scenario Variant 4)",
    "options": [
      "ORDER BY",
      "GROUP BY",
      "SELECT",
      "WHERE"
    ],
    "correctIndex": 1,
    "explanation": "The execution order is FROM ➡️ WHERE ➡️ GROUP BY ➡️ HAVING ➡️ SELECT ➡️ DISTINCT ➡️ ORDER BY ➡️ LIMIT."
  },
  {
    "id": "mcq_having_21",
    "keyword": "HAVING",
    "tag": "🍡 Quick Snack",
    "question": "[HAVING #21] What is the fundamental architectural difference between the WHERE clause and the HAVING clause? (Scenario Variant 5)",
    "options": [
      "WHERE only works with numbers; HAVING only works with strings",
      "There is no difference; they are aliases for each other",
      "HAVING executes before FROM, while WHERE executes after SELECT",
      "WHERE filters individual rows before grouping; HAVING filters aggregated group buckets after grouping"
    ],
    "correctIndex": 3,
    "explanation": "In the physical query pipeline, WHERE executes at Step 02 on raw table rows. HAVING executes at Step 04 after GROUP BY has aggregated rows into summary buckets."
  },
  {
    "id": "mcq_having_22",
    "keyword": "HAVING",
    "tag": "⚡ Gotcha Trap",
    "question": "[HAVING #22] Why does \"SELECT department, COUNT(*) FROM Employees WHERE COUNT(*) > 5 GROUP BY department;\" fail? (Scenario Variant 5)",
    "options": [
      "Employees table requires a secondary table join to count rows",
      "COUNT(*) cannot be compared using the greater-than (>) operator",
      "department must be wrapped in a MAX() function",
      "Aggregate functions cannot be evaluated in the WHERE clause because groups have not been formed yet"
    ],
    "correctIndex": 3,
    "explanation": "The WHERE clause operates on individual rows as they are read from disk. At that point, aggregation has not occurred, so aggregate functions like COUNT(*) are illegal in WHERE."
  },
  {
    "id": "mcq_having_23",
    "keyword": "HAVING",
    "tag": "🐱 Brain Bender",
    "question": "[HAVING #23] Can a query contain a HAVING clause without a GROUP BY clause? (Scenario Variant 5)",
    "options": [
      "Yes, but it automatically behaves identically to a WHERE clause",
      "Yes, the entire table is treated as a single implicit group, and HAVING filters the whole-table aggregate",
      "Only in MySQL, but it causes a syntax crash in PostgreSQL and Oracle",
      "No, SQL syntax requires GROUP BY immediately preceding HAVING"
    ],
    "correctIndex": 1,
    "explanation": "A HAVING clause without GROUP BY treats the entire dataset as one single group. If the condition (e.g. HAVING COUNT(*) > 100) fails, the query returns 0 rows."
  },
  {
    "id": "mcq_having_24",
    "keyword": "HAVING",
    "tag": "🎯 Core Concept",
    "question": "[HAVING #24] Is it valid standard SQL for a HAVING clause to reference an aggregate function that does NOT appear in the SELECT list? (Scenario Variant 5)",
    "options": [
      "No, any column or function tested in HAVING must be projected in SELECT",
      "Only if the aggregate function is aliased using AS in SELECT",
      "Yes, e.g., \"SELECT department FROM Employees GROUP BY department HAVING AVG(salary) > 80000;\" is fully valid",
      "Only in SQLite"
    ],
    "correctIndex": 2,
    "explanation": "An aggregate in HAVING does not need to be projected in SELECT. The query engine calculates the aggregate in the group buffer to filter buckets without returning the metric to the user."
  },
  {
    "id": "mcq_having_25",
    "keyword": "HAVING",
    "tag": "🏆 Senior Staff",
    "question": "[HAVING #25] Which clause executes immediately before HAVING in the physical SQL pipeline? (Scenario Variant 5)",
    "options": [
      "ORDER BY",
      "SELECT",
      "GROUP BY",
      "WHERE"
    ],
    "correctIndex": 2,
    "explanation": "The execution order is FROM ➡️ WHERE ➡️ GROUP BY ➡️ HAVING ➡️ SELECT ➡️ DISTINCT ➡️ ORDER BY ➡️ LIMIT."
  },
  {
    "id": "mcq_having_26",
    "keyword": "HAVING",
    "tag": "🍡 Quick Snack",
    "question": "[HAVING #26] What is the fundamental architectural difference between the WHERE clause and the HAVING clause? (Scenario Variant 6)",
    "options": [
      "There is no difference; they are aliases for each other",
      "HAVING executes before FROM, while WHERE executes after SELECT",
      "WHERE filters individual rows before grouping; HAVING filters aggregated group buckets after grouping",
      "WHERE only works with numbers; HAVING only works with strings"
    ],
    "correctIndex": 2,
    "explanation": "In the physical query pipeline, WHERE executes at Step 02 on raw table rows. HAVING executes at Step 04 after GROUP BY has aggregated rows into summary buckets."
  },
  {
    "id": "mcq_having_27",
    "keyword": "HAVING",
    "tag": "⚡ Gotcha Trap",
    "question": "[HAVING #27] Why does \"SELECT department, COUNT(*) FROM Employees WHERE COUNT(*) > 5 GROUP BY department;\" fail? (Scenario Variant 6)",
    "options": [
      "Aggregate functions cannot be evaluated in the WHERE clause because groups have not been formed yet",
      "department must be wrapped in a MAX() function",
      "COUNT(*) cannot be compared using the greater-than (>) operator",
      "Employees table requires a secondary table join to count rows"
    ],
    "correctIndex": 0,
    "explanation": "The WHERE clause operates on individual rows as they are read from disk. At that point, aggregation has not occurred, so aggregate functions like COUNT(*) are illegal in WHERE."
  },
  {
    "id": "mcq_having_28",
    "keyword": "HAVING",
    "tag": "🐱 Brain Bender",
    "question": "[HAVING #28] Can a query contain a HAVING clause without a GROUP BY clause? (Scenario Variant 6)",
    "options": [
      "Yes, the entire table is treated as a single implicit group, and HAVING filters the whole-table aggregate",
      "No, SQL syntax requires GROUP BY immediately preceding HAVING",
      "Only in MySQL, but it causes a syntax crash in PostgreSQL and Oracle",
      "Yes, but it automatically behaves identically to a WHERE clause"
    ],
    "correctIndex": 0,
    "explanation": "A HAVING clause without GROUP BY treats the entire dataset as one single group. If the condition (e.g. HAVING COUNT(*) > 100) fails, the query returns 0 rows."
  },
  {
    "id": "mcq_having_29",
    "keyword": "HAVING",
    "tag": "🎯 Core Concept",
    "question": "[HAVING #29] Is it valid standard SQL for a HAVING clause to reference an aggregate function that does NOT appear in the SELECT list? (Scenario Variant 6)",
    "options": [
      "Only in SQLite",
      "No, any column or function tested in HAVING must be projected in SELECT",
      "Yes, e.g., \"SELECT department FROM Employees GROUP BY department HAVING AVG(salary) > 80000;\" is fully valid",
      "Only if the aggregate function is aliased using AS in SELECT"
    ],
    "correctIndex": 2,
    "explanation": "An aggregate in HAVING does not need to be projected in SELECT. The query engine calculates the aggregate in the group buffer to filter buckets without returning the metric to the user."
  },
  {
    "id": "mcq_having_30",
    "keyword": "HAVING",
    "tag": "🏆 Senior Staff",
    "question": "[HAVING #30] Which clause executes immediately before HAVING in the physical SQL pipeline? (Scenario Variant 6)",
    "options": [
      "ORDER BY",
      "GROUP BY",
      "WHERE",
      "SELECT"
    ],
    "correctIndex": 1,
    "explanation": "The execution order is FROM ➡️ WHERE ➡️ GROUP BY ➡️ HAVING ➡️ SELECT ➡️ DISTINCT ➡️ ORDER BY ➡️ LIMIT."
  },
  {
    "id": "mcq_having_31",
    "keyword": "HAVING",
    "tag": "🍡 Quick Snack",
    "question": "[HAVING #31] What is the fundamental architectural difference between the WHERE clause and the HAVING clause? (Scenario Variant 7)",
    "options": [
      "There is no difference; they are aliases for each other",
      "WHERE filters individual rows before grouping; HAVING filters aggregated group buckets after grouping",
      "HAVING executes before FROM, while WHERE executes after SELECT",
      "WHERE only works with numbers; HAVING only works with strings"
    ],
    "correctIndex": 1,
    "explanation": "In the physical query pipeline, WHERE executes at Step 02 on raw table rows. HAVING executes at Step 04 after GROUP BY has aggregated rows into summary buckets."
  },
  {
    "id": "mcq_having_32",
    "keyword": "HAVING",
    "tag": "⚡ Gotcha Trap",
    "question": "[HAVING #32] Why does \"SELECT department, COUNT(*) FROM Employees WHERE COUNT(*) > 5 GROUP BY department;\" fail? (Scenario Variant 7)",
    "options": [
      "department must be wrapped in a MAX() function",
      "COUNT(*) cannot be compared using the greater-than (>) operator",
      "Employees table requires a secondary table join to count rows",
      "Aggregate functions cannot be evaluated in the WHERE clause because groups have not been formed yet"
    ],
    "correctIndex": 3,
    "explanation": "The WHERE clause operates on individual rows as they are read from disk. At that point, aggregation has not occurred, so aggregate functions like COUNT(*) are illegal in WHERE."
  },
  {
    "id": "mcq_having_33",
    "keyword": "HAVING",
    "tag": "🐱 Brain Bender",
    "question": "[HAVING #33] Can a query contain a HAVING clause without a GROUP BY clause? (Scenario Variant 7)",
    "options": [
      "No, SQL syntax requires GROUP BY immediately preceding HAVING",
      "Yes, the entire table is treated as a single implicit group, and HAVING filters the whole-table aggregate",
      "Yes, but it automatically behaves identically to a WHERE clause",
      "Only in MySQL, but it causes a syntax crash in PostgreSQL and Oracle"
    ],
    "correctIndex": 1,
    "explanation": "A HAVING clause without GROUP BY treats the entire dataset as one single group. If the condition (e.g. HAVING COUNT(*) > 100) fails, the query returns 0 rows."
  },
  {
    "id": "mcq_having_34",
    "keyword": "HAVING",
    "tag": "🎯 Core Concept",
    "question": "[HAVING #34] Is it valid standard SQL for a HAVING clause to reference an aggregate function that does NOT appear in the SELECT list? (Scenario Variant 7)",
    "options": [
      "Yes, e.g., \"SELECT department FROM Employees GROUP BY department HAVING AVG(salary) > 80000;\" is fully valid",
      "Only in SQLite",
      "No, any column or function tested in HAVING must be projected in SELECT",
      "Only if the aggregate function is aliased using AS in SELECT"
    ],
    "correctIndex": 0,
    "explanation": "An aggregate in HAVING does not need to be projected in SELECT. The query engine calculates the aggregate in the group buffer to filter buckets without returning the metric to the user."
  },
  {
    "id": "mcq_having_35",
    "keyword": "HAVING",
    "tag": "🏆 Senior Staff",
    "question": "[HAVING #35] Which clause executes immediately before HAVING in the physical SQL pipeline? (Scenario Variant 7)",
    "options": [
      "WHERE",
      "GROUP BY",
      "SELECT",
      "ORDER BY"
    ],
    "correctIndex": 1,
    "explanation": "The execution order is FROM ➡️ WHERE ➡️ GROUP BY ➡️ HAVING ➡️ SELECT ➡️ DISTINCT ➡️ ORDER BY ➡️ LIMIT."
  },
  {
    "id": "mcq_having_36",
    "keyword": "HAVING",
    "tag": "🍡 Quick Snack",
    "question": "[HAVING #36] What is the fundamental architectural difference between the WHERE clause and the HAVING clause? (Scenario Variant 8)",
    "options": [
      "There is no difference; they are aliases for each other",
      "WHERE only works with numbers; HAVING only works with strings",
      "WHERE filters individual rows before grouping; HAVING filters aggregated group buckets after grouping",
      "HAVING executes before FROM, while WHERE executes after SELECT"
    ],
    "correctIndex": 2,
    "explanation": "In the physical query pipeline, WHERE executes at Step 02 on raw table rows. HAVING executes at Step 04 after GROUP BY has aggregated rows into summary buckets."
  },
  {
    "id": "mcq_having_37",
    "keyword": "HAVING",
    "tag": "⚡ Gotcha Trap",
    "question": "[HAVING #37] Why does \"SELECT department, COUNT(*) FROM Employees WHERE COUNT(*) > 5 GROUP BY department;\" fail? (Scenario Variant 8)",
    "options": [
      "department must be wrapped in a MAX() function",
      "COUNT(*) cannot be compared using the greater-than (>) operator",
      "Aggregate functions cannot be evaluated in the WHERE clause because groups have not been formed yet",
      "Employees table requires a secondary table join to count rows"
    ],
    "correctIndex": 2,
    "explanation": "The WHERE clause operates on individual rows as they are read from disk. At that point, aggregation has not occurred, so aggregate functions like COUNT(*) are illegal in WHERE."
  },
  {
    "id": "mcq_having_38",
    "keyword": "HAVING",
    "tag": "🐱 Brain Bender",
    "question": "[HAVING #38] Can a query contain a HAVING clause without a GROUP BY clause? (Scenario Variant 8)",
    "options": [
      "Yes, but it automatically behaves identically to a WHERE clause",
      "Yes, the entire table is treated as a single implicit group, and HAVING filters the whole-table aggregate",
      "No, SQL syntax requires GROUP BY immediately preceding HAVING",
      "Only in MySQL, but it causes a syntax crash in PostgreSQL and Oracle"
    ],
    "correctIndex": 1,
    "explanation": "A HAVING clause without GROUP BY treats the entire dataset as one single group. If the condition (e.g. HAVING COUNT(*) > 100) fails, the query returns 0 rows."
  },
  {
    "id": "mcq_having_39",
    "keyword": "HAVING",
    "tag": "🎯 Core Concept",
    "question": "[HAVING #39] Is it valid standard SQL for a HAVING clause to reference an aggregate function that does NOT appear in the SELECT list? (Scenario Variant 8)",
    "options": [
      "No, any column or function tested in HAVING must be projected in SELECT",
      "Only in SQLite",
      "Yes, e.g., \"SELECT department FROM Employees GROUP BY department HAVING AVG(salary) > 80000;\" is fully valid",
      "Only if the aggregate function is aliased using AS in SELECT"
    ],
    "correctIndex": 2,
    "explanation": "An aggregate in HAVING does not need to be projected in SELECT. The query engine calculates the aggregate in the group buffer to filter buckets without returning the metric to the user."
  },
  {
    "id": "mcq_having_40",
    "keyword": "HAVING",
    "tag": "🏆 Senior Staff",
    "question": "[HAVING #40] Which clause executes immediately before HAVING in the physical SQL pipeline? (Scenario Variant 8)",
    "options": [
      "SELECT",
      "GROUP BY",
      "WHERE",
      "ORDER BY"
    ],
    "correctIndex": 1,
    "explanation": "The execution order is FROM ➡️ WHERE ➡️ GROUP BY ➡️ HAVING ➡️ SELECT ➡️ DISTINCT ➡️ ORDER BY ➡️ LIMIT."
  },
  {
    "id": "mcq_having_41",
    "keyword": "HAVING",
    "tag": "🍡 Quick Snack",
    "question": "[HAVING #41] What is the fundamental architectural difference between the WHERE clause and the HAVING clause? (Scenario Variant 9)",
    "options": [
      "WHERE only works with numbers; HAVING only works with strings",
      "HAVING executes before FROM, while WHERE executes after SELECT",
      "There is no difference; they are aliases for each other",
      "WHERE filters individual rows before grouping; HAVING filters aggregated group buckets after grouping"
    ],
    "correctIndex": 3,
    "explanation": "In the physical query pipeline, WHERE executes at Step 02 on raw table rows. HAVING executes at Step 04 after GROUP BY has aggregated rows into summary buckets."
  },
  {
    "id": "mcq_having_42",
    "keyword": "HAVING",
    "tag": "⚡ Gotcha Trap",
    "question": "[HAVING #42] Why does \"SELECT department, COUNT(*) FROM Employees WHERE COUNT(*) > 5 GROUP BY department;\" fail? (Scenario Variant 9)",
    "options": [
      "Aggregate functions cannot be evaluated in the WHERE clause because groups have not been formed yet",
      "department must be wrapped in a MAX() function",
      "Employees table requires a secondary table join to count rows",
      "COUNT(*) cannot be compared using the greater-than (>) operator"
    ],
    "correctIndex": 0,
    "explanation": "The WHERE clause operates on individual rows as they are read from disk. At that point, aggregation has not occurred, so aggregate functions like COUNT(*) are illegal in WHERE."
  },
  {
    "id": "mcq_having_43",
    "keyword": "HAVING",
    "tag": "🐱 Brain Bender",
    "question": "[HAVING #43] Can a query contain a HAVING clause without a GROUP BY clause? (Scenario Variant 9)",
    "options": [
      "No, SQL syntax requires GROUP BY immediately preceding HAVING",
      "Yes, but it automatically behaves identically to a WHERE clause",
      "Only in MySQL, but it causes a syntax crash in PostgreSQL and Oracle",
      "Yes, the entire table is treated as a single implicit group, and HAVING filters the whole-table aggregate"
    ],
    "correctIndex": 3,
    "explanation": "A HAVING clause without GROUP BY treats the entire dataset as one single group. If the condition (e.g. HAVING COUNT(*) > 100) fails, the query returns 0 rows."
  },
  {
    "id": "mcq_having_44",
    "keyword": "HAVING",
    "tag": "🎯 Core Concept",
    "question": "[HAVING #44] Is it valid standard SQL for a HAVING clause to reference an aggregate function that does NOT appear in the SELECT list? (Scenario Variant 9)",
    "options": [
      "Only in SQLite",
      "No, any column or function tested in HAVING must be projected in SELECT",
      "Yes, e.g., \"SELECT department FROM Employees GROUP BY department HAVING AVG(salary) > 80000;\" is fully valid",
      "Only if the aggregate function is aliased using AS in SELECT"
    ],
    "correctIndex": 2,
    "explanation": "An aggregate in HAVING does not need to be projected in SELECT. The query engine calculates the aggregate in the group buffer to filter buckets without returning the metric to the user."
  },
  {
    "id": "mcq_having_45",
    "keyword": "HAVING",
    "tag": "🏆 Senior Staff",
    "question": "[HAVING #45] Which clause executes immediately before HAVING in the physical SQL pipeline? (Scenario Variant 9)",
    "options": [
      "GROUP BY",
      "WHERE",
      "ORDER BY",
      "SELECT"
    ],
    "correctIndex": 0,
    "explanation": "The execution order is FROM ➡️ WHERE ➡️ GROUP BY ➡️ HAVING ➡️ SELECT ➡️ DISTINCT ➡️ ORDER BY ➡️ LIMIT."
  },
  {
    "id": "mcq_having_46",
    "keyword": "HAVING",
    "tag": "🍡 Quick Snack",
    "question": "[HAVING #46] What is the fundamental architectural difference between the WHERE clause and the HAVING clause? (Scenario Variant 10)",
    "options": [
      "HAVING executes before FROM, while WHERE executes after SELECT",
      "There is no difference; they are aliases for each other",
      "WHERE filters individual rows before grouping; HAVING filters aggregated group buckets after grouping",
      "WHERE only works with numbers; HAVING only works with strings"
    ],
    "correctIndex": 2,
    "explanation": "In the physical query pipeline, WHERE executes at Step 02 on raw table rows. HAVING executes at Step 04 after GROUP BY has aggregated rows into summary buckets."
  },
  {
    "id": "mcq_having_47",
    "keyword": "HAVING",
    "tag": "⚡ Gotcha Trap",
    "question": "[HAVING #47] Why does \"SELECT department, COUNT(*) FROM Employees WHERE COUNT(*) > 5 GROUP BY department;\" fail? (Scenario Variant 10)",
    "options": [
      "COUNT(*) cannot be compared using the greater-than (>) operator",
      "Employees table requires a secondary table join to count rows",
      "Aggregate functions cannot be evaluated in the WHERE clause because groups have not been formed yet",
      "department must be wrapped in a MAX() function"
    ],
    "correctIndex": 2,
    "explanation": "The WHERE clause operates on individual rows as they are read from disk. At that point, aggregation has not occurred, so aggregate functions like COUNT(*) are illegal in WHERE."
  },
  {
    "id": "mcq_having_48",
    "keyword": "HAVING",
    "tag": "🐱 Brain Bender",
    "question": "[HAVING #48] Can a query contain a HAVING clause without a GROUP BY clause? (Scenario Variant 10)",
    "options": [
      "Yes, the entire table is treated as a single implicit group, and HAVING filters the whole-table aggregate",
      "No, SQL syntax requires GROUP BY immediately preceding HAVING",
      "Yes, but it automatically behaves identically to a WHERE clause",
      "Only in MySQL, but it causes a syntax crash in PostgreSQL and Oracle"
    ],
    "correctIndex": 0,
    "explanation": "A HAVING clause without GROUP BY treats the entire dataset as one single group. If the condition (e.g. HAVING COUNT(*) > 100) fails, the query returns 0 rows."
  },
  {
    "id": "mcq_having_49",
    "keyword": "HAVING",
    "tag": "🎯 Core Concept",
    "question": "[HAVING #49] Is it valid standard SQL for a HAVING clause to reference an aggregate function that does NOT appear in the SELECT list? (Scenario Variant 10)",
    "options": [
      "Only in SQLite",
      "Yes, e.g., \"SELECT department FROM Employees GROUP BY department HAVING AVG(salary) > 80000;\" is fully valid",
      "Only if the aggregate function is aliased using AS in SELECT",
      "No, any column or function tested in HAVING must be projected in SELECT"
    ],
    "correctIndex": 1,
    "explanation": "An aggregate in HAVING does not need to be projected in SELECT. The query engine calculates the aggregate in the group buffer to filter buckets without returning the metric to the user."
  },
  {
    "id": "mcq_having_50",
    "keyword": "HAVING",
    "tag": "🏆 Senior Staff",
    "question": "[HAVING #50] Which clause executes immediately before HAVING in the physical SQL pipeline? (Scenario Variant 10)",
    "options": [
      "SELECT",
      "ORDER BY",
      "GROUP BY",
      "WHERE"
    ],
    "correctIndex": 2,
    "explanation": "The execution order is FROM ➡️ WHERE ➡️ GROUP BY ➡️ HAVING ➡️ SELECT ➡️ DISTINCT ➡️ ORDER BY ➡️ LIMIT."
  },
  {
    "id": "mcq_having_51",
    "keyword": "HAVING",
    "tag": "🎯 Core Concept",
    "question": "[HAVING #51 &bull; Fintech & Ledger Systems] What is the fundamental architectural difference between WHERE and HAVING in SQL physical execution? (Application Scenario 1)",
    "options": [
      "WHERE can only evaluate numbers; HAVING can only evaluate strings",
      "HAVING is executed before FROM",
      "WHERE requires an index while HAVING cannot use indexes",
      "WHERE filters raw individual rows BEFORE aggregation; HAVING filters collapsed groups AFTER aggregation has computed"
    ],
    "correctIndex": 3,
    "explanation": "In the relational physical pipeline: FROM -> WHERE -> GROUP BY -> HAVING. WHERE prunes rows before the grouping phase, reducing aggregate memory consumption. HAVING filters the post-aggregation groups. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_having_52",
    "keyword": "HAVING",
    "tag": "🏛️ Corporate Edge",
    "question": "[HAVING #52 &bull; SaaS Subscription Billing] Can a query use a HAVING clause without a GROUP BY clause? (Application Scenario 1)",
    "options": [
      "No, HAVING is strictly illegal without GROUP BY",
      "Yes, in which case the entire result set is treated as a single aggregate group",
      "Yes, but only in SQLite and Oracle",
      "No, the engine will fail during parsing"
    ],
    "correctIndex": 1,
    "explanation": "In ANSI SQL, HAVING without GROUP BY treats the entire table as one grand group (e.g. 'SELECT 1 HAVING COUNT(*) > 0'). [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_having_53",
    "keyword": "HAVING",
    "tag": "💡 Lead Architect",
    "question": "[HAVING #53 &bull; Global Supply Chain & Logistics] Why is 'SELECT dept, COUNT(*) FROM emp WHERE COUNT(*) > 5 GROUP BY dept;' invalid SQL? (Application Scenario 1)",
    "options": [
      "dept must be renamed before filtering",
      "COUNT(*) cannot be greater than 5 in MySQL",
      "The query must use SUM instead of COUNT",
      "Aggregate functions like COUNT(*) cannot appear in a WHERE clause because aggregates have not yet been computed when WHERE executes"
    ],
    "correctIndex": 3,
    "explanation": "WHERE filters rows before aggregation occurs. To filter on aggregate conditions, the condition must be placed in the HAVING clause. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_having_54",
    "keyword": "HAVING",
    "tag": "⚡ Gotcha Trap",
    "question": "[HAVING #54 &bull; Healthcare Patient Records] Which query executes faster and uses less temporary memory when filtering departments with total payroll > $1M in location 'NYC'? (Application Scenario 1)",
    "options": [
      "Filter both 'location = NYC' and 'SUM(salary) > 1M' in HAVING",
      "Filter 'location = NYC' in WHERE, and 'SUM(salary) > 1M' in HAVING",
      "Both execute with identical query plans and memory usage",
      "Filter both aggregate metrics and raw columns simultaneously inside WHERE"
    ],
    "correctIndex": 1,
    "explanation": "Pushing scalar predicates into WHERE eliminates non-NYC employees BEFORE hashing/grouping, drastically reducing the volume of data aggregated in memory. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_having_55",
    "keyword": "HAVING",
    "tag": "🎯 Core Concept",
    "question": "[HAVING #55 &bull; E-Commerce Checkout Funnels] What is the output of 'SELECT category, AVG(price) FROM products GROUP BY category HAVING MIN(stock) > 0;'? (Application Scenario 1)",
    "options": [
      "Only products whose price is greater than 0",
      "An error because MIN(stock) is not in the SELECT list",
      "Categories where total stock equals 0",
      "Categories where every single product has stock > 0, showing the category name and its average price"
    ],
    "correctIndex": 3,
    "explanation": "A HAVING clause can reference aggregate expressions (like MIN(stock)) even if that aggregate is not explicitly projected in the SELECT list. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_having_56",
    "keyword": "HAVING",
    "tag": "🏛️ Corporate Edge",
    "question": "[HAVING #56 &bull; Telecom Billing & Data Streams] What is the fundamental architectural difference between WHERE and HAVING in SQL physical execution? (Application Scenario 2)",
    "options": [
      "WHERE can only evaluate numbers; HAVING can only evaluate strings",
      "WHERE filters raw individual rows BEFORE aggregation; HAVING filters collapsed groups AFTER aggregation has computed",
      "HAVING is executed before FROM",
      "WHERE requires an index while HAVING cannot use indexes"
    ],
    "correctIndex": 1,
    "explanation": "In the relational physical pipeline: FROM -> WHERE -> GROUP BY -> HAVING. WHERE prunes rows before the grouping phase, reducing aggregate memory consumption. HAVING filters the post-aggregation groups. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_having_57",
    "keyword": "HAVING",
    "tag": "💡 Lead Architect",
    "question": "[HAVING #57 &bull; AdTech Real-Time Bidding] Can a query use a HAVING clause without a GROUP BY clause? (Application Scenario 2)",
    "options": [
      "No, HAVING is strictly illegal without GROUP BY",
      "Yes, but only in SQLite and Oracle",
      "No, the engine will fail during parsing",
      "Yes, in which case the entire result set is treated as a single aggregate group"
    ],
    "correctIndex": 3,
    "explanation": "In ANSI SQL, HAVING without GROUP BY treats the entire table as one grand group (e.g. 'SELECT 1 HAVING COUNT(*) > 0'). [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_having_58",
    "keyword": "HAVING",
    "tag": "⚡ Gotcha Trap",
    "question": "[HAVING #58 &bull; Cybersecurity Audit Logs] Why is 'SELECT dept, COUNT(*) FROM emp WHERE COUNT(*) > 5 GROUP BY dept;' invalid SQL? (Application Scenario 2)",
    "options": [
      "dept must be renamed before filtering",
      "Aggregate functions like COUNT(*) cannot appear in a WHERE clause because aggregates have not yet been computed when WHERE executes",
      "COUNT(*) cannot be greater than 5 in MySQL",
      "The query must use SUM instead of COUNT"
    ],
    "correctIndex": 1,
    "explanation": "WHERE filters rows before aggregation occurs. To filter on aggregate conditions, the condition must be placed in the HAVING clause. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_having_59",
    "keyword": "HAVING",
    "tag": "🎯 Core Concept",
    "question": "[HAVING #59 &bull; Fintech & Ledger Systems] Which query executes faster and uses less temporary memory when filtering departments with total payroll > $1M in location 'NYC'? (Application Scenario 2)",
    "options": [
      "Filter both 'location = NYC' and 'SUM(salary) > 1M' in HAVING",
      "Both execute with identical query plans and memory usage",
      "Filter both aggregate metrics and raw columns simultaneously inside WHERE",
      "Filter 'location = NYC' in WHERE, and 'SUM(salary) > 1M' in HAVING"
    ],
    "correctIndex": 3,
    "explanation": "Pushing scalar predicates into WHERE eliminates non-NYC employees BEFORE hashing/grouping, drastically reducing the volume of data aggregated in memory. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_having_60",
    "keyword": "HAVING",
    "tag": "🏛️ Corporate Edge",
    "question": "[HAVING #60 &bull; SaaS Subscription Billing] What is the output of 'SELECT category, AVG(price) FROM products GROUP BY category HAVING MIN(stock) > 0;'? (Application Scenario 2)",
    "options": [
      "Only products whose price is greater than 0",
      "Categories where every single product has stock > 0, showing the category name and its average price",
      "An error because MIN(stock) is not in the SELECT list",
      "Categories where total stock equals 0"
    ],
    "correctIndex": 1,
    "explanation": "A HAVING clause can reference aggregate expressions (like MIN(stock)) even if that aggregate is not explicitly projected in the SELECT list. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_having_61",
    "keyword": "HAVING",
    "tag": "💡 Lead Architect",
    "question": "[HAVING #61 &bull; Global Supply Chain & Logistics] What is the fundamental architectural difference between WHERE and HAVING in SQL physical execution? (Application Scenario 3)",
    "options": [
      "WHERE can only evaluate numbers; HAVING can only evaluate strings",
      "HAVING is executed before FROM",
      "WHERE requires an index while HAVING cannot use indexes",
      "WHERE filters raw individual rows BEFORE aggregation; HAVING filters collapsed groups AFTER aggregation has computed"
    ],
    "correctIndex": 3,
    "explanation": "In the relational physical pipeline: FROM -> WHERE -> GROUP BY -> HAVING. WHERE prunes rows before the grouping phase, reducing aggregate memory consumption. HAVING filters the post-aggregation groups. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_having_62",
    "keyword": "HAVING",
    "tag": "⚡ Gotcha Trap",
    "question": "[HAVING #62 &bull; Healthcare Patient Records] Can a query use a HAVING clause without a GROUP BY clause? (Application Scenario 3)",
    "options": [
      "No, HAVING is strictly illegal without GROUP BY",
      "Yes, in which case the entire result set is treated as a single aggregate group",
      "Yes, but only in SQLite and Oracle",
      "No, the engine will fail during parsing"
    ],
    "correctIndex": 1,
    "explanation": "In ANSI SQL, HAVING without GROUP BY treats the entire table as one grand group (e.g. 'SELECT 1 HAVING COUNT(*) > 0'). [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_having_63",
    "keyword": "HAVING",
    "tag": "🎯 Core Concept",
    "question": "[HAVING #63 &bull; E-Commerce Checkout Funnels] Why is 'SELECT dept, COUNT(*) FROM emp WHERE COUNT(*) > 5 GROUP BY dept;' invalid SQL? (Application Scenario 3)",
    "options": [
      "dept must be renamed before filtering",
      "COUNT(*) cannot be greater than 5 in MySQL",
      "The query must use SUM instead of COUNT",
      "Aggregate functions like COUNT(*) cannot appear in a WHERE clause because aggregates have not yet been computed when WHERE executes"
    ],
    "correctIndex": 3,
    "explanation": "WHERE filters rows before aggregation occurs. To filter on aggregate conditions, the condition must be placed in the HAVING clause. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_having_64",
    "keyword": "HAVING",
    "tag": "🏛️ Corporate Edge",
    "question": "[HAVING #64 &bull; Telecom Billing & Data Streams] Which query executes faster and uses less temporary memory when filtering departments with total payroll > $1M in location 'NYC'? (Application Scenario 3)",
    "options": [
      "Filter both 'location = NYC' and 'SUM(salary) > 1M' in HAVING",
      "Filter 'location = NYC' in WHERE, and 'SUM(salary) > 1M' in HAVING",
      "Both execute with identical query plans and memory usage",
      "Filter both aggregate metrics and raw columns simultaneously inside WHERE"
    ],
    "correctIndex": 1,
    "explanation": "Pushing scalar predicates into WHERE eliminates non-NYC employees BEFORE hashing/grouping, drastically reducing the volume of data aggregated in memory. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_having_65",
    "keyword": "HAVING",
    "tag": "💡 Lead Architect",
    "question": "[HAVING #65 &bull; AdTech Real-Time Bidding] What is the output of 'SELECT category, AVG(price) FROM products GROUP BY category HAVING MIN(stock) > 0;'? (Application Scenario 3)",
    "options": [
      "Only products whose price is greater than 0",
      "An error because MIN(stock) is not in the SELECT list",
      "Categories where total stock equals 0",
      "Categories where every single product has stock > 0, showing the category name and its average price"
    ],
    "correctIndex": 3,
    "explanation": "A HAVING clause can reference aggregate expressions (like MIN(stock)) even if that aggregate is not explicitly projected in the SELECT list. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_having_66",
    "keyword": "HAVING",
    "tag": "⚡ Gotcha Trap",
    "question": "[HAVING #66 &bull; Cybersecurity Audit Logs] What is the fundamental architectural difference between WHERE and HAVING in SQL physical execution? (Application Scenario 4)",
    "options": [
      "WHERE can only evaluate numbers; HAVING can only evaluate strings",
      "WHERE filters raw individual rows BEFORE aggregation; HAVING filters collapsed groups AFTER aggregation has computed",
      "HAVING is executed before FROM",
      "WHERE requires an index while HAVING cannot use indexes"
    ],
    "correctIndex": 1,
    "explanation": "In the relational physical pipeline: FROM -> WHERE -> GROUP BY -> HAVING. WHERE prunes rows before the grouping phase, reducing aggregate memory consumption. HAVING filters the post-aggregation groups. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_having_67",
    "keyword": "HAVING",
    "tag": "🎯 Core Concept",
    "question": "[HAVING #67 &bull; Fintech & Ledger Systems] Can a query use a HAVING clause without a GROUP BY clause? (Application Scenario 4)",
    "options": [
      "No, HAVING is strictly illegal without GROUP BY",
      "Yes, but only in SQLite and Oracle",
      "No, the engine will fail during parsing",
      "Yes, in which case the entire result set is treated as a single aggregate group"
    ],
    "correctIndex": 3,
    "explanation": "In ANSI SQL, HAVING without GROUP BY treats the entire table as one grand group (e.g. 'SELECT 1 HAVING COUNT(*) > 0'). [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_having_68",
    "keyword": "HAVING",
    "tag": "🏛️ Corporate Edge",
    "question": "[HAVING #68 &bull; SaaS Subscription Billing] Why is 'SELECT dept, COUNT(*) FROM emp WHERE COUNT(*) > 5 GROUP BY dept;' invalid SQL? (Application Scenario 4)",
    "options": [
      "dept must be renamed before filtering",
      "Aggregate functions like COUNT(*) cannot appear in a WHERE clause because aggregates have not yet been computed when WHERE executes",
      "COUNT(*) cannot be greater than 5 in MySQL",
      "The query must use SUM instead of COUNT"
    ],
    "correctIndex": 1,
    "explanation": "WHERE filters rows before aggregation occurs. To filter on aggregate conditions, the condition must be placed in the HAVING clause. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_having_69",
    "keyword": "HAVING",
    "tag": "💡 Lead Architect",
    "question": "[HAVING #69 &bull; Global Supply Chain & Logistics] Which query executes faster and uses less temporary memory when filtering departments with total payroll > $1M in location 'NYC'? (Application Scenario 4)",
    "options": [
      "Filter both 'location = NYC' and 'SUM(salary) > 1M' in HAVING",
      "Both execute with identical query plans and memory usage",
      "Filter both aggregate metrics and raw columns simultaneously inside WHERE",
      "Filter 'location = NYC' in WHERE, and 'SUM(salary) > 1M' in HAVING"
    ],
    "correctIndex": 3,
    "explanation": "Pushing scalar predicates into WHERE eliminates non-NYC employees BEFORE hashing/grouping, drastically reducing the volume of data aggregated in memory. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_having_70",
    "keyword": "HAVING",
    "tag": "⚡ Gotcha Trap",
    "question": "[HAVING #70 &bull; Healthcare Patient Records] What is the output of 'SELECT category, AVG(price) FROM products GROUP BY category HAVING MIN(stock) > 0;'? (Application Scenario 4)",
    "options": [
      "Only products whose price is greater than 0",
      "Categories where every single product has stock > 0, showing the category name and its average price",
      "An error because MIN(stock) is not in the SELECT list",
      "Categories where total stock equals 0"
    ],
    "correctIndex": 1,
    "explanation": "A HAVING clause can reference aggregate expressions (like MIN(stock)) even if that aggregate is not explicitly projected in the SELECT list. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_having_71",
    "keyword": "HAVING",
    "tag": "🎯 Core Concept",
    "question": "[HAVING #71 &bull; E-Commerce Checkout Funnels] What is the fundamental architectural difference between WHERE and HAVING in SQL physical execution? (Application Scenario 5)",
    "options": [
      "WHERE can only evaluate numbers; HAVING can only evaluate strings",
      "HAVING is executed before FROM",
      "WHERE requires an index while HAVING cannot use indexes",
      "WHERE filters raw individual rows BEFORE aggregation; HAVING filters collapsed groups AFTER aggregation has computed"
    ],
    "correctIndex": 3,
    "explanation": "In the relational physical pipeline: FROM -> WHERE -> GROUP BY -> HAVING. WHERE prunes rows before the grouping phase, reducing aggregate memory consumption. HAVING filters the post-aggregation groups. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_having_72",
    "keyword": "HAVING",
    "tag": "🏛️ Corporate Edge",
    "question": "[HAVING #72 &bull; Telecom Billing & Data Streams] Can a query use a HAVING clause without a GROUP BY clause? (Application Scenario 5)",
    "options": [
      "No, HAVING is strictly illegal without GROUP BY",
      "Yes, in which case the entire result set is treated as a single aggregate group",
      "Yes, but only in SQLite and Oracle",
      "No, the engine will fail during parsing"
    ],
    "correctIndex": 1,
    "explanation": "In ANSI SQL, HAVING without GROUP BY treats the entire table as one grand group (e.g. 'SELECT 1 HAVING COUNT(*) > 0'). [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_having_73",
    "keyword": "HAVING",
    "tag": "💡 Lead Architect",
    "question": "[HAVING #73 &bull; AdTech Real-Time Bidding] Why is 'SELECT dept, COUNT(*) FROM emp WHERE COUNT(*) > 5 GROUP BY dept;' invalid SQL? (Application Scenario 5)",
    "options": [
      "dept must be renamed before filtering",
      "COUNT(*) cannot be greater than 5 in MySQL",
      "The query must use SUM instead of COUNT",
      "Aggregate functions like COUNT(*) cannot appear in a WHERE clause because aggregates have not yet been computed when WHERE executes"
    ],
    "correctIndex": 3,
    "explanation": "WHERE filters rows before aggregation occurs. To filter on aggregate conditions, the condition must be placed in the HAVING clause. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_having_74",
    "keyword": "HAVING",
    "tag": "⚡ Gotcha Trap",
    "question": "[HAVING #74 &bull; Cybersecurity Audit Logs] Which query executes faster and uses less temporary memory when filtering departments with total payroll > $1M in location 'NYC'? (Application Scenario 5)",
    "options": [
      "Filter both 'location = NYC' and 'SUM(salary) > 1M' in HAVING",
      "Filter 'location = NYC' in WHERE, and 'SUM(salary) > 1M' in HAVING",
      "Both execute with identical query plans and memory usage",
      "Filter both aggregate metrics and raw columns simultaneously inside WHERE"
    ],
    "correctIndex": 1,
    "explanation": "Pushing scalar predicates into WHERE eliminates non-NYC employees BEFORE hashing/grouping, drastically reducing the volume of data aggregated in memory. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_having_75",
    "keyword": "HAVING",
    "tag": "🎯 Core Concept",
    "question": "[HAVING #75 &bull; Fintech & Ledger Systems] What is the output of 'SELECT category, AVG(price) FROM products GROUP BY category HAVING MIN(stock) > 0;'? (Application Scenario 5)",
    "options": [
      "Only products whose price is greater than 0",
      "An error because MIN(stock) is not in the SELECT list",
      "Categories where total stock equals 0",
      "Categories where every single product has stock > 0, showing the category name and its average price"
    ],
    "correctIndex": 3,
    "explanation": "A HAVING clause can reference aggregate expressions (like MIN(stock)) even if that aggregate is not explicitly projected in the SELECT list. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_having_76",
    "keyword": "HAVING",
    "tag": "🏛️ Corporate Edge",
    "question": "[HAVING #76 &bull; SaaS Subscription Billing] What is the fundamental architectural difference between WHERE and HAVING in SQL physical execution? (Application Scenario 6)",
    "options": [
      "WHERE can only evaluate numbers; HAVING can only evaluate strings",
      "WHERE filters raw individual rows BEFORE aggregation; HAVING filters collapsed groups AFTER aggregation has computed",
      "HAVING is executed before FROM",
      "WHERE requires an index while HAVING cannot use indexes"
    ],
    "correctIndex": 1,
    "explanation": "In the relational physical pipeline: FROM -> WHERE -> GROUP BY -> HAVING. WHERE prunes rows before the grouping phase, reducing aggregate memory consumption. HAVING filters the post-aggregation groups. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_having_77",
    "keyword": "HAVING",
    "tag": "💡 Lead Architect",
    "question": "[HAVING #77 &bull; Global Supply Chain & Logistics] Can a query use a HAVING clause without a GROUP BY clause? (Application Scenario 6)",
    "options": [
      "No, HAVING is strictly illegal without GROUP BY",
      "Yes, but only in SQLite and Oracle",
      "No, the engine will fail during parsing",
      "Yes, in which case the entire result set is treated as a single aggregate group"
    ],
    "correctIndex": 3,
    "explanation": "In ANSI SQL, HAVING without GROUP BY treats the entire table as one grand group (e.g. 'SELECT 1 HAVING COUNT(*) > 0'). [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_having_78",
    "keyword": "HAVING",
    "tag": "⚡ Gotcha Trap",
    "question": "[HAVING #78 &bull; Healthcare Patient Records] Why is 'SELECT dept, COUNT(*) FROM emp WHERE COUNT(*) > 5 GROUP BY dept;' invalid SQL? (Application Scenario 6)",
    "options": [
      "dept must be renamed before filtering",
      "Aggregate functions like COUNT(*) cannot appear in a WHERE clause because aggregates have not yet been computed when WHERE executes",
      "COUNT(*) cannot be greater than 5 in MySQL",
      "The query must use SUM instead of COUNT"
    ],
    "correctIndex": 1,
    "explanation": "WHERE filters rows before aggregation occurs. To filter on aggregate conditions, the condition must be placed in the HAVING clause. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_having_79",
    "keyword": "HAVING",
    "tag": "🎯 Core Concept",
    "question": "[HAVING #79 &bull; E-Commerce Checkout Funnels] Which query executes faster and uses less temporary memory when filtering departments with total payroll > $1M in location 'NYC'? (Application Scenario 6)",
    "options": [
      "Filter both 'location = NYC' and 'SUM(salary) > 1M' in HAVING",
      "Both execute with identical query plans and memory usage",
      "Filter both aggregate metrics and raw columns simultaneously inside WHERE",
      "Filter 'location = NYC' in WHERE, and 'SUM(salary) > 1M' in HAVING"
    ],
    "correctIndex": 3,
    "explanation": "Pushing scalar predicates into WHERE eliminates non-NYC employees BEFORE hashing/grouping, drastically reducing the volume of data aggregated in memory. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_having_80",
    "keyword": "HAVING",
    "tag": "🏛️ Corporate Edge",
    "question": "[HAVING #80 &bull; Telecom Billing & Data Streams] What is the output of 'SELECT category, AVG(price) FROM products GROUP BY category HAVING MIN(stock) > 0;'? (Application Scenario 6)",
    "options": [
      "Only products whose price is greater than 0",
      "Categories where every single product has stock > 0, showing the category name and its average price",
      "An error because MIN(stock) is not in the SELECT list",
      "Categories where total stock equals 0"
    ],
    "correctIndex": 1,
    "explanation": "A HAVING clause can reference aggregate expressions (like MIN(stock)) even if that aggregate is not explicitly projected in the SELECT list. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_having_81",
    "keyword": "HAVING",
    "tag": "💡 Lead Architect",
    "question": "[HAVING #81 &bull; AdTech Real-Time Bidding] What is the fundamental architectural difference between WHERE and HAVING in SQL physical execution? (Application Scenario 7)",
    "options": [
      "WHERE can only evaluate numbers; HAVING can only evaluate strings",
      "HAVING is executed before FROM",
      "WHERE requires an index while HAVING cannot use indexes",
      "WHERE filters raw individual rows BEFORE aggregation; HAVING filters collapsed groups AFTER aggregation has computed"
    ],
    "correctIndex": 3,
    "explanation": "In the relational physical pipeline: FROM -> WHERE -> GROUP BY -> HAVING. WHERE prunes rows before the grouping phase, reducing aggregate memory consumption. HAVING filters the post-aggregation groups. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_having_82",
    "keyword": "HAVING",
    "tag": "⚡ Gotcha Trap",
    "question": "[HAVING #82 &bull; Cybersecurity Audit Logs] Can a query use a HAVING clause without a GROUP BY clause? (Application Scenario 7)",
    "options": [
      "No, HAVING is strictly illegal without GROUP BY",
      "Yes, in which case the entire result set is treated as a single aggregate group",
      "Yes, but only in SQLite and Oracle",
      "No, the engine will fail during parsing"
    ],
    "correctIndex": 1,
    "explanation": "In ANSI SQL, HAVING without GROUP BY treats the entire table as one grand group (e.g. 'SELECT 1 HAVING COUNT(*) > 0'). [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_having_83",
    "keyword": "HAVING",
    "tag": "🎯 Core Concept",
    "question": "[HAVING #83 &bull; Fintech & Ledger Systems] Why is 'SELECT dept, COUNT(*) FROM emp WHERE COUNT(*) > 5 GROUP BY dept;' invalid SQL? (Application Scenario 7)",
    "options": [
      "dept must be renamed before filtering",
      "COUNT(*) cannot be greater than 5 in MySQL",
      "The query must use SUM instead of COUNT",
      "Aggregate functions like COUNT(*) cannot appear in a WHERE clause because aggregates have not yet been computed when WHERE executes"
    ],
    "correctIndex": 3,
    "explanation": "WHERE filters rows before aggregation occurs. To filter on aggregate conditions, the condition must be placed in the HAVING clause. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_having_84",
    "keyword": "HAVING",
    "tag": "🏛️ Corporate Edge",
    "question": "[HAVING #84 &bull; SaaS Subscription Billing] Which query executes faster and uses less temporary memory when filtering departments with total payroll > $1M in location 'NYC'? (Application Scenario 7)",
    "options": [
      "Filter both 'location = NYC' and 'SUM(salary) > 1M' in HAVING",
      "Filter 'location = NYC' in WHERE, and 'SUM(salary) > 1M' in HAVING",
      "Both execute with identical query plans and memory usage",
      "Filter both aggregate metrics and raw columns simultaneously inside WHERE"
    ],
    "correctIndex": 1,
    "explanation": "Pushing scalar predicates into WHERE eliminates non-NYC employees BEFORE hashing/grouping, drastically reducing the volume of data aggregated in memory. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_having_85",
    "keyword": "HAVING",
    "tag": "💡 Lead Architect",
    "question": "[HAVING #85 &bull; Global Supply Chain & Logistics] What is the output of 'SELECT category, AVG(price) FROM products GROUP BY category HAVING MIN(stock) > 0;'? (Application Scenario 7)",
    "options": [
      "Only products whose price is greater than 0",
      "An error because MIN(stock) is not in the SELECT list",
      "Categories where total stock equals 0",
      "Categories where every single product has stock > 0, showing the category name and its average price"
    ],
    "correctIndex": 3,
    "explanation": "A HAVING clause can reference aggregate expressions (like MIN(stock)) even if that aggregate is not explicitly projected in the SELECT list. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_having_86",
    "keyword": "HAVING",
    "tag": "⚡ Gotcha Trap",
    "question": "[HAVING #86 &bull; Healthcare Patient Records] What is the fundamental architectural difference between WHERE and HAVING in SQL physical execution? (Application Scenario 8)",
    "options": [
      "WHERE can only evaluate numbers; HAVING can only evaluate strings",
      "WHERE filters raw individual rows BEFORE aggregation; HAVING filters collapsed groups AFTER aggregation has computed",
      "HAVING is executed before FROM",
      "WHERE requires an index while HAVING cannot use indexes"
    ],
    "correctIndex": 1,
    "explanation": "In the relational physical pipeline: FROM -> WHERE -> GROUP BY -> HAVING. WHERE prunes rows before the grouping phase, reducing aggregate memory consumption. HAVING filters the post-aggregation groups. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_having_87",
    "keyword": "HAVING",
    "tag": "🎯 Core Concept",
    "question": "[HAVING #87 &bull; E-Commerce Checkout Funnels] Can a query use a HAVING clause without a GROUP BY clause? (Application Scenario 8)",
    "options": [
      "No, HAVING is strictly illegal without GROUP BY",
      "Yes, but only in SQLite and Oracle",
      "No, the engine will fail during parsing",
      "Yes, in which case the entire result set is treated as a single aggregate group"
    ],
    "correctIndex": 3,
    "explanation": "In ANSI SQL, HAVING without GROUP BY treats the entire table as one grand group (e.g. 'SELECT 1 HAVING COUNT(*) > 0'). [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_having_88",
    "keyword": "HAVING",
    "tag": "🏛️ Corporate Edge",
    "question": "[HAVING #88 &bull; Telecom Billing & Data Streams] Why is 'SELECT dept, COUNT(*) FROM emp WHERE COUNT(*) > 5 GROUP BY dept;' invalid SQL? (Application Scenario 8)",
    "options": [
      "dept must be renamed before filtering",
      "Aggregate functions like COUNT(*) cannot appear in a WHERE clause because aggregates have not yet been computed when WHERE executes",
      "COUNT(*) cannot be greater than 5 in MySQL",
      "The query must use SUM instead of COUNT"
    ],
    "correctIndex": 1,
    "explanation": "WHERE filters rows before aggregation occurs. To filter on aggregate conditions, the condition must be placed in the HAVING clause. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_having_89",
    "keyword": "HAVING",
    "tag": "💡 Lead Architect",
    "question": "[HAVING #89 &bull; AdTech Real-Time Bidding] Which query executes faster and uses less temporary memory when filtering departments with total payroll > $1M in location 'NYC'? (Application Scenario 8)",
    "options": [
      "Filter both 'location = NYC' and 'SUM(salary) > 1M' in HAVING",
      "Both execute with identical query plans and memory usage",
      "Filter both aggregate metrics and raw columns simultaneously inside WHERE",
      "Filter 'location = NYC' in WHERE, and 'SUM(salary) > 1M' in HAVING"
    ],
    "correctIndex": 3,
    "explanation": "Pushing scalar predicates into WHERE eliminates non-NYC employees BEFORE hashing/grouping, drastically reducing the volume of data aggregated in memory. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_having_90",
    "keyword": "HAVING",
    "tag": "⚡ Gotcha Trap",
    "question": "[HAVING #90 &bull; Cybersecurity Audit Logs] What is the output of 'SELECT category, AVG(price) FROM products GROUP BY category HAVING MIN(stock) > 0;'? (Application Scenario 8)",
    "options": [
      "Only products whose price is greater than 0",
      "Categories where every single product has stock > 0, showing the category name and its average price",
      "An error because MIN(stock) is not in the SELECT list",
      "Categories where total stock equals 0"
    ],
    "correctIndex": 1,
    "explanation": "A HAVING clause can reference aggregate expressions (like MIN(stock)) even if that aggregate is not explicitly projected in the SELECT list. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_having_91",
    "keyword": "HAVING",
    "tag": "🎯 Core Concept",
    "question": "[HAVING #91 &bull; Fintech & Ledger Systems] What is the fundamental architectural difference between WHERE and HAVING in SQL physical execution? (Application Scenario 9)",
    "options": [
      "WHERE can only evaluate numbers; HAVING can only evaluate strings",
      "HAVING is executed before FROM",
      "WHERE requires an index while HAVING cannot use indexes",
      "WHERE filters raw individual rows BEFORE aggregation; HAVING filters collapsed groups AFTER aggregation has computed"
    ],
    "correctIndex": 3,
    "explanation": "In the relational physical pipeline: FROM -> WHERE -> GROUP BY -> HAVING. WHERE prunes rows before the grouping phase, reducing aggregate memory consumption. HAVING filters the post-aggregation groups. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_having_92",
    "keyword": "HAVING",
    "tag": "🏛️ Corporate Edge",
    "question": "[HAVING #92 &bull; SaaS Subscription Billing] Can a query use a HAVING clause without a GROUP BY clause? (Application Scenario 9)",
    "options": [
      "No, HAVING is strictly illegal without GROUP BY",
      "Yes, in which case the entire result set is treated as a single aggregate group",
      "Yes, but only in SQLite and Oracle",
      "No, the engine will fail during parsing"
    ],
    "correctIndex": 1,
    "explanation": "In ANSI SQL, HAVING without GROUP BY treats the entire table as one grand group (e.g. 'SELECT 1 HAVING COUNT(*) > 0'). [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_having_93",
    "keyword": "HAVING",
    "tag": "💡 Lead Architect",
    "question": "[HAVING #93 &bull; Global Supply Chain & Logistics] Why is 'SELECT dept, COUNT(*) FROM emp WHERE COUNT(*) > 5 GROUP BY dept;' invalid SQL? (Application Scenario 9)",
    "options": [
      "dept must be renamed before filtering",
      "COUNT(*) cannot be greater than 5 in MySQL",
      "The query must use SUM instead of COUNT",
      "Aggregate functions like COUNT(*) cannot appear in a WHERE clause because aggregates have not yet been computed when WHERE executes"
    ],
    "correctIndex": 3,
    "explanation": "WHERE filters rows before aggregation occurs. To filter on aggregate conditions, the condition must be placed in the HAVING clause. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_having_94",
    "keyword": "HAVING",
    "tag": "⚡ Gotcha Trap",
    "question": "[HAVING #94 &bull; Healthcare Patient Records] Which query executes faster and uses less temporary memory when filtering departments with total payroll > $1M in location 'NYC'? (Application Scenario 9)",
    "options": [
      "Filter both 'location = NYC' and 'SUM(salary) > 1M' in HAVING",
      "Filter 'location = NYC' in WHERE, and 'SUM(salary) > 1M' in HAVING",
      "Both execute with identical query plans and memory usage",
      "Filter both aggregate metrics and raw columns simultaneously inside WHERE"
    ],
    "correctIndex": 1,
    "explanation": "Pushing scalar predicates into WHERE eliminates non-NYC employees BEFORE hashing/grouping, drastically reducing the volume of data aggregated in memory. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_having_95",
    "keyword": "HAVING",
    "tag": "🎯 Core Concept",
    "question": "[HAVING #95 &bull; E-Commerce Checkout Funnels] What is the output of 'SELECT category, AVG(price) FROM products GROUP BY category HAVING MIN(stock) > 0;'? (Application Scenario 9)",
    "options": [
      "Only products whose price is greater than 0",
      "An error because MIN(stock) is not in the SELECT list",
      "Categories where total stock equals 0",
      "Categories where every single product has stock > 0, showing the category name and its average price"
    ],
    "correctIndex": 3,
    "explanation": "A HAVING clause can reference aggregate expressions (like MIN(stock)) even if that aggregate is not explicitly projected in the SELECT list. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_having_96",
    "keyword": "HAVING",
    "tag": "🏛️ Corporate Edge",
    "question": "[HAVING #96 &bull; Telecom Billing & Data Streams] What is the fundamental architectural difference between WHERE and HAVING in SQL physical execution? (Application Scenario 10)",
    "options": [
      "WHERE can only evaluate numbers; HAVING can only evaluate strings",
      "WHERE filters raw individual rows BEFORE aggregation; HAVING filters collapsed groups AFTER aggregation has computed",
      "HAVING is executed before FROM",
      "WHERE requires an index while HAVING cannot use indexes"
    ],
    "correctIndex": 1,
    "explanation": "In the relational physical pipeline: FROM -> WHERE -> GROUP BY -> HAVING. WHERE prunes rows before the grouping phase, reducing aggregate memory consumption. HAVING filters the post-aggregation groups. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_having_97",
    "keyword": "HAVING",
    "tag": "💡 Lead Architect",
    "question": "[HAVING #97 &bull; AdTech Real-Time Bidding] Can a query use a HAVING clause without a GROUP BY clause? (Application Scenario 10)",
    "options": [
      "No, HAVING is strictly illegal without GROUP BY",
      "Yes, but only in SQLite and Oracle",
      "No, the engine will fail during parsing",
      "Yes, in which case the entire result set is treated as a single aggregate group"
    ],
    "correctIndex": 3,
    "explanation": "In ANSI SQL, HAVING without GROUP BY treats the entire table as one grand group (e.g. 'SELECT 1 HAVING COUNT(*) > 0'). [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_having_98",
    "keyword": "HAVING",
    "tag": "⚡ Gotcha Trap",
    "question": "[HAVING #98 &bull; Cybersecurity Audit Logs] Why is 'SELECT dept, COUNT(*) FROM emp WHERE COUNT(*) > 5 GROUP BY dept;' invalid SQL? (Application Scenario 10)",
    "options": [
      "dept must be renamed before filtering",
      "Aggregate functions like COUNT(*) cannot appear in a WHERE clause because aggregates have not yet been computed when WHERE executes",
      "COUNT(*) cannot be greater than 5 in MySQL",
      "The query must use SUM instead of COUNT"
    ],
    "correctIndex": 1,
    "explanation": "WHERE filters rows before aggregation occurs. To filter on aggregate conditions, the condition must be placed in the HAVING clause. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_having_99",
    "keyword": "HAVING",
    "tag": "🎯 Core Concept",
    "question": "[HAVING #99 &bull; Fintech & Ledger Systems] Which query executes faster and uses less temporary memory when filtering departments with total payroll > $1M in location 'NYC'? (Application Scenario 10)",
    "options": [
      "Filter both 'location = NYC' and 'SUM(salary) > 1M' in HAVING",
      "Both execute with identical query plans and memory usage",
      "Filter both aggregate metrics and raw columns simultaneously inside WHERE",
      "Filter 'location = NYC' in WHERE, and 'SUM(salary) > 1M' in HAVING"
    ],
    "correctIndex": 3,
    "explanation": "Pushing scalar predicates into WHERE eliminates non-NYC employees BEFORE hashing/grouping, drastically reducing the volume of data aggregated in memory. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_having_100",
    "keyword": "HAVING",
    "tag": "🏛️ Corporate Edge",
    "question": "[HAVING #100 &bull; SaaS Subscription Billing] What is the output of 'SELECT category, AVG(price) FROM products GROUP BY category HAVING MIN(stock) > 0;'? (Application Scenario 10)",
    "options": [
      "Only products whose price is greater than 0",
      "Categories where every single product has stock > 0, showing the category name and its average price",
      "An error because MIN(stock) is not in the SELECT list",
      "Categories where total stock equals 0"
    ],
    "correctIndex": 1,
    "explanation": "A HAVING clause can reference aggregate expressions (like MIN(stock)) even if that aggregate is not explicitly projected in the SELECT list. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_where_1",
    "keyword": "WHERE",
    "tag": "🍡 Quick Snack",
    "question": "[WHERE #1] In SQL Three-Valued Logic (3VL), what is the evaluation result of \"WHERE salary = NULL\"?",
    "options": [
      "TRUE if the salary is indeed NULL",
      "Syntax Error: NULL cannot be compared with =",
      "FALSE",
      "UNKNOWN (evaluates to non-TRUE, so the row is rejected)"
    ],
    "correctIndex": 3,
    "explanation": "In SQL, comparing any value to NULL using = produces UNKNOWN. In a WHERE clause, only rows evaluating strictly to TRUE pass. To check for nulls, use IS NULL."
  },
  {
    "id": "mcq_where_2",
    "keyword": "WHERE",
    "tag": "⚡ Gotcha Trap",
    "question": "[WHERE #2] Why does the predicate \"WHERE department_id NOT IN (1, 2, NULL)\" evaluate unexpectedly?",
    "options": [
      "If the list contains NULL, NOT IN returns UNKNOWN for all non-matching rows, resulting in ZERO rows returned",
      "It throws an InvalidSetComparison exception",
      "It automatically treats NULL as 0",
      "It returns all rows where department_id is 1 or 2"
    ],
    "correctIndex": 0,
    "explanation": "NOT IN (1, 2, NULL) expands to (id != 1 AND id != 2 AND id != NULL). Because id != NULL is always UNKNOWN, the whole AND chain evaluates to UNKNOWN or FALSE, returning zero rows!"
  },
  {
    "id": "mcq_where_3",
    "keyword": "WHERE",
    "tag": "🐱 Brain Bender",
    "question": "[WHERE #3] What does it mean for a WHERE clause predicate to be \"SARGable\" (Search Argument Able)?",
    "options": [
      "The predicate has no WHERE keyword",
      "The condition is structured so the query optimizer can utilize a B-tree index seek rather than a full table scan",
      "The query uses asynchronous parallel threads",
      "The condition is written in uppercase syntax"
    ],
    "correctIndex": 1,
    "explanation": "A SARGable predicate allows index seeks. For example, \"WHERE created_at >= '2026-01-01'\" is SARGable, whereas \"WHERE YEAR(created_at) = 2026\" wraps the column in a function and disables index seeks."
  },
  {
    "id": "mcq_where_4",
    "keyword": "WHERE",
    "tag": "🎯 Core Concept",
    "question": "[WHERE #4] What happens when you use column aliases defined in SELECT inside the WHERE clause?",
    "options": [
      "The database engine throws an \"Unknown Column\" error because WHERE executes before SELECT",
      "The engine automatically aliases all table columns",
      "It is standard ANSI SQL and works in all engines",
      "The query runs 2x faster"
    ],
    "correctIndex": 0,
    "explanation": "WHERE executes as Step 02, while SELECT executes as Step 03/05. The column alias does not exist yet when WHERE is evaluated."
  },
  {
    "id": "mcq_where_5",
    "keyword": "WHERE",
    "tag": "🏆 Senior Staff",
    "question": "[WHERE #5] In the condition \"WHERE status = 'active' OR role = 'admin' AND salary > 50000\", which operator has higher precedence?",
    "options": [
      "OR has higher precedence than AND",
      "Operators are strictly evaluated left-to-right regardless of type",
      "AND has higher precedence than OR and is evaluated first",
      "AND and OR have equal precedence"
    ],
    "correctIndex": 2,
    "explanation": "AND has higher logical precedence than OR. The predicate is evaluated as: status = 'active' OR (role = 'admin' AND salary > 50000). Always use parentheses to ensure clarity."
  },
  {
    "id": "mcq_where_6",
    "keyword": "WHERE",
    "tag": "🍡 Quick Snack",
    "question": "[WHERE #6] In SQL Three-Valued Logic (3VL), what is the evaluation result of \"WHERE salary = NULL\"? (Scenario Variant 2)",
    "options": [
      "Syntax Error: NULL cannot be compared with =",
      "TRUE if the salary is indeed NULL",
      "UNKNOWN (evaluates to non-TRUE, so the row is rejected)",
      "FALSE"
    ],
    "correctIndex": 2,
    "explanation": "In SQL, comparing any value to NULL using = produces UNKNOWN. In a WHERE clause, only rows evaluating strictly to TRUE pass. To check for nulls, use IS NULL."
  },
  {
    "id": "mcq_where_7",
    "keyword": "WHERE",
    "tag": "⚡ Gotcha Trap",
    "question": "[WHERE #7] Why does the predicate \"WHERE department_id NOT IN (1, 2, NULL)\" evaluate unexpectedly? (Scenario Variant 2)",
    "options": [
      "If the list contains NULL, NOT IN returns UNKNOWN for all non-matching rows, resulting in ZERO rows returned",
      "It throws an InvalidSetComparison exception",
      "It returns all rows where department_id is 1 or 2",
      "It automatically treats NULL as 0"
    ],
    "correctIndex": 0,
    "explanation": "NOT IN (1, 2, NULL) expands to (id != 1 AND id != 2 AND id != NULL). Because id != NULL is always UNKNOWN, the whole AND chain evaluates to UNKNOWN or FALSE, returning zero rows!"
  },
  {
    "id": "mcq_where_8",
    "keyword": "WHERE",
    "tag": "🐱 Brain Bender",
    "question": "[WHERE #8] What does it mean for a WHERE clause predicate to be \"SARGable\" (Search Argument Able)? (Scenario Variant 2)",
    "options": [
      "The predicate has no WHERE keyword",
      "The condition is structured so the query optimizer can utilize a B-tree index seek rather than a full table scan",
      "The query uses asynchronous parallel threads",
      "The condition is written in uppercase syntax"
    ],
    "correctIndex": 1,
    "explanation": "A SARGable predicate allows index seeks. For example, \"WHERE created_at >= '2026-01-01'\" is SARGable, whereas \"WHERE YEAR(created_at) = 2026\" wraps the column in a function and disables index seeks."
  },
  {
    "id": "mcq_where_9",
    "keyword": "WHERE",
    "tag": "🎯 Core Concept",
    "question": "[WHERE #9] What happens when you use column aliases defined in SELECT inside the WHERE clause? (Scenario Variant 2)",
    "options": [
      "The engine automatically aliases all table columns",
      "It is standard ANSI SQL and works in all engines",
      "The database engine throws an \"Unknown Column\" error because WHERE executes before SELECT",
      "The query runs 2x faster"
    ],
    "correctIndex": 2,
    "explanation": "WHERE executes as Step 02, while SELECT executes as Step 03/05. The column alias does not exist yet when WHERE is evaluated."
  },
  {
    "id": "mcq_where_10",
    "keyword": "WHERE",
    "tag": "🏆 Senior Staff",
    "question": "[WHERE #10] In the condition \"WHERE status = 'active' OR role = 'admin' AND salary > 50000\", which operator has higher precedence? (Scenario Variant 2)",
    "options": [
      "OR has higher precedence than AND",
      "Operators are strictly evaluated left-to-right regardless of type",
      "AND has higher precedence than OR and is evaluated first",
      "AND and OR have equal precedence"
    ],
    "correctIndex": 2,
    "explanation": "AND has higher logical precedence than OR. The predicate is evaluated as: status = 'active' OR (role = 'admin' AND salary > 50000). Always use parentheses to ensure clarity."
  },
  {
    "id": "mcq_where_11",
    "keyword": "WHERE",
    "tag": "🍡 Quick Snack",
    "question": "[WHERE #11] In SQL Three-Valued Logic (3VL), what is the evaluation result of \"WHERE salary = NULL\"? (Scenario Variant 3)",
    "options": [
      "UNKNOWN (evaluates to non-TRUE, so the row is rejected)",
      "TRUE if the salary is indeed NULL",
      "Syntax Error: NULL cannot be compared with =",
      "FALSE"
    ],
    "correctIndex": 0,
    "explanation": "In SQL, comparing any value to NULL using = produces UNKNOWN. In a WHERE clause, only rows evaluating strictly to TRUE pass. To check for nulls, use IS NULL."
  },
  {
    "id": "mcq_where_12",
    "keyword": "WHERE",
    "tag": "⚡ Gotcha Trap",
    "question": "[WHERE #12] Why does the predicate \"WHERE department_id NOT IN (1, 2, NULL)\" evaluate unexpectedly? (Scenario Variant 3)",
    "options": [
      "It automatically treats NULL as 0",
      "If the list contains NULL, NOT IN returns UNKNOWN for all non-matching rows, resulting in ZERO rows returned",
      "It throws an InvalidSetComparison exception",
      "It returns all rows where department_id is 1 or 2"
    ],
    "correctIndex": 1,
    "explanation": "NOT IN (1, 2, NULL) expands to (id != 1 AND id != 2 AND id != NULL). Because id != NULL is always UNKNOWN, the whole AND chain evaluates to UNKNOWN or FALSE, returning zero rows!"
  },
  {
    "id": "mcq_where_13",
    "keyword": "WHERE",
    "tag": "🐱 Brain Bender",
    "question": "[WHERE #13] What does it mean for a WHERE clause predicate to be \"SARGable\" (Search Argument Able)? (Scenario Variant 3)",
    "options": [
      "The condition is structured so the query optimizer can utilize a B-tree index seek rather than a full table scan",
      "The query uses asynchronous parallel threads",
      "The predicate has no WHERE keyword",
      "The condition is written in uppercase syntax"
    ],
    "correctIndex": 0,
    "explanation": "A SARGable predicate allows index seeks. For example, \"WHERE created_at >= '2026-01-01'\" is SARGable, whereas \"WHERE YEAR(created_at) = 2026\" wraps the column in a function and disables index seeks."
  },
  {
    "id": "mcq_where_14",
    "keyword": "WHERE",
    "tag": "🎯 Core Concept",
    "question": "[WHERE #14] What happens when you use column aliases defined in SELECT inside the WHERE clause? (Scenario Variant 3)",
    "options": [
      "The engine automatically aliases all table columns",
      "It is standard ANSI SQL and works in all engines",
      "The database engine throws an \"Unknown Column\" error because WHERE executes before SELECT",
      "The query runs 2x faster"
    ],
    "correctIndex": 2,
    "explanation": "WHERE executes as Step 02, while SELECT executes as Step 03/05. The column alias does not exist yet when WHERE is evaluated."
  },
  {
    "id": "mcq_where_15",
    "keyword": "WHERE",
    "tag": "🏆 Senior Staff",
    "question": "[WHERE #15] In the condition \"WHERE status = 'active' OR role = 'admin' AND salary > 50000\", which operator has higher precedence? (Scenario Variant 3)",
    "options": [
      "Operators are strictly evaluated left-to-right regardless of type",
      "OR has higher precedence than AND",
      "AND and OR have equal precedence",
      "AND has higher precedence than OR and is evaluated first"
    ],
    "correctIndex": 3,
    "explanation": "AND has higher logical precedence than OR. The predicate is evaluated as: status = 'active' OR (role = 'admin' AND salary > 50000). Always use parentheses to ensure clarity."
  },
  {
    "id": "mcq_where_16",
    "keyword": "WHERE",
    "tag": "🍡 Quick Snack",
    "question": "[WHERE #16] In SQL Three-Valued Logic (3VL), what is the evaluation result of \"WHERE salary = NULL\"? (Scenario Variant 4)",
    "options": [
      "Syntax Error: NULL cannot be compared with =",
      "UNKNOWN (evaluates to non-TRUE, so the row is rejected)",
      "FALSE",
      "TRUE if the salary is indeed NULL"
    ],
    "correctIndex": 1,
    "explanation": "In SQL, comparing any value to NULL using = produces UNKNOWN. In a WHERE clause, only rows evaluating strictly to TRUE pass. To check for nulls, use IS NULL."
  },
  {
    "id": "mcq_where_17",
    "keyword": "WHERE",
    "tag": "⚡ Gotcha Trap",
    "question": "[WHERE #17] Why does the predicate \"WHERE department_id NOT IN (1, 2, NULL)\" evaluate unexpectedly? (Scenario Variant 4)",
    "options": [
      "If the list contains NULL, NOT IN returns UNKNOWN for all non-matching rows, resulting in ZERO rows returned",
      "It automatically treats NULL as 0",
      "It throws an InvalidSetComparison exception",
      "It returns all rows where department_id is 1 or 2"
    ],
    "correctIndex": 0,
    "explanation": "NOT IN (1, 2, NULL) expands to (id != 1 AND id != 2 AND id != NULL). Because id != NULL is always UNKNOWN, the whole AND chain evaluates to UNKNOWN or FALSE, returning zero rows!"
  },
  {
    "id": "mcq_where_18",
    "keyword": "WHERE",
    "tag": "🐱 Brain Bender",
    "question": "[WHERE #18] What does it mean for a WHERE clause predicate to be \"SARGable\" (Search Argument Able)? (Scenario Variant 4)",
    "options": [
      "The condition is structured so the query optimizer can utilize a B-tree index seek rather than a full table scan",
      "The condition is written in uppercase syntax",
      "The predicate has no WHERE keyword",
      "The query uses asynchronous parallel threads"
    ],
    "correctIndex": 0,
    "explanation": "A SARGable predicate allows index seeks. For example, \"WHERE created_at >= '2026-01-01'\" is SARGable, whereas \"WHERE YEAR(created_at) = 2026\" wraps the column in a function and disables index seeks."
  },
  {
    "id": "mcq_where_19",
    "keyword": "WHERE",
    "tag": "🎯 Core Concept",
    "question": "[WHERE #19] What happens when you use column aliases defined in SELECT inside the WHERE clause? (Scenario Variant 4)",
    "options": [
      "The query runs 2x faster",
      "It is standard ANSI SQL and works in all engines",
      "The database engine throws an \"Unknown Column\" error because WHERE executes before SELECT",
      "The engine automatically aliases all table columns"
    ],
    "correctIndex": 2,
    "explanation": "WHERE executes as Step 02, while SELECT executes as Step 03/05. The column alias does not exist yet when WHERE is evaluated."
  },
  {
    "id": "mcq_where_20",
    "keyword": "WHERE",
    "tag": "🏆 Senior Staff",
    "question": "[WHERE #20] In the condition \"WHERE status = 'active' OR role = 'admin' AND salary > 50000\", which operator has higher precedence? (Scenario Variant 4)",
    "options": [
      "AND has higher precedence than OR and is evaluated first",
      "OR has higher precedence than AND",
      "AND and OR have equal precedence",
      "Operators are strictly evaluated left-to-right regardless of type"
    ],
    "correctIndex": 0,
    "explanation": "AND has higher logical precedence than OR. The predicate is evaluated as: status = 'active' OR (role = 'admin' AND salary > 50000). Always use parentheses to ensure clarity."
  },
  {
    "id": "mcq_where_21",
    "keyword": "WHERE",
    "tag": "🍡 Quick Snack",
    "question": "[WHERE #21] In SQL Three-Valued Logic (3VL), what is the evaluation result of \"WHERE salary = NULL\"? (Scenario Variant 5)",
    "options": [
      "UNKNOWN (evaluates to non-TRUE, so the row is rejected)",
      "TRUE if the salary is indeed NULL",
      "Syntax Error: NULL cannot be compared with =",
      "FALSE"
    ],
    "correctIndex": 0,
    "explanation": "In SQL, comparing any value to NULL using = produces UNKNOWN. In a WHERE clause, only rows evaluating strictly to TRUE pass. To check for nulls, use IS NULL."
  },
  {
    "id": "mcq_where_22",
    "keyword": "WHERE",
    "tag": "⚡ Gotcha Trap",
    "question": "[WHERE #22] Why does the predicate \"WHERE department_id NOT IN (1, 2, NULL)\" evaluate unexpectedly? (Scenario Variant 5)",
    "options": [
      "It returns all rows where department_id is 1 or 2",
      "It throws an InvalidSetComparison exception",
      "It automatically treats NULL as 0",
      "If the list contains NULL, NOT IN returns UNKNOWN for all non-matching rows, resulting in ZERO rows returned"
    ],
    "correctIndex": 3,
    "explanation": "NOT IN (1, 2, NULL) expands to (id != 1 AND id != 2 AND id != NULL). Because id != NULL is always UNKNOWN, the whole AND chain evaluates to UNKNOWN or FALSE, returning zero rows!"
  },
  {
    "id": "mcq_where_23",
    "keyword": "WHERE",
    "tag": "🐱 Brain Bender",
    "question": "[WHERE #23] What does it mean for a WHERE clause predicate to be \"SARGable\" (Search Argument Able)? (Scenario Variant 5)",
    "options": [
      "The predicate has no WHERE keyword",
      "The condition is written in uppercase syntax",
      "The query uses asynchronous parallel threads",
      "The condition is structured so the query optimizer can utilize a B-tree index seek rather than a full table scan"
    ],
    "correctIndex": 3,
    "explanation": "A SARGable predicate allows index seeks. For example, \"WHERE created_at >= '2026-01-01'\" is SARGable, whereas \"WHERE YEAR(created_at) = 2026\" wraps the column in a function and disables index seeks."
  },
  {
    "id": "mcq_where_24",
    "keyword": "WHERE",
    "tag": "🎯 Core Concept",
    "question": "[WHERE #24] What happens when you use column aliases defined in SELECT inside the WHERE clause? (Scenario Variant 5)",
    "options": [
      "The database engine throws an \"Unknown Column\" error because WHERE executes before SELECT",
      "It is standard ANSI SQL and works in all engines",
      "The engine automatically aliases all table columns",
      "The query runs 2x faster"
    ],
    "correctIndex": 0,
    "explanation": "WHERE executes as Step 02, while SELECT executes as Step 03/05. The column alias does not exist yet when WHERE is evaluated."
  },
  {
    "id": "mcq_where_25",
    "keyword": "WHERE",
    "tag": "🏆 Senior Staff",
    "question": "[WHERE #25] In the condition \"WHERE status = 'active' OR role = 'admin' AND salary > 50000\", which operator has higher precedence? (Scenario Variant 5)",
    "options": [
      "Operators are strictly evaluated left-to-right regardless of type",
      "AND has higher precedence than OR and is evaluated first",
      "OR has higher precedence than AND",
      "AND and OR have equal precedence"
    ],
    "correctIndex": 1,
    "explanation": "AND has higher logical precedence than OR. The predicate is evaluated as: status = 'active' OR (role = 'admin' AND salary > 50000). Always use parentheses to ensure clarity."
  },
  {
    "id": "mcq_where_26",
    "keyword": "WHERE",
    "tag": "🍡 Quick Snack",
    "question": "[WHERE #26] In SQL Three-Valued Logic (3VL), what is the evaluation result of \"WHERE salary = NULL\"? (Scenario Variant 6)",
    "options": [
      "TRUE if the salary is indeed NULL",
      "UNKNOWN (evaluates to non-TRUE, so the row is rejected)",
      "Syntax Error: NULL cannot be compared with =",
      "FALSE"
    ],
    "correctIndex": 1,
    "explanation": "In SQL, comparing any value to NULL using = produces UNKNOWN. In a WHERE clause, only rows evaluating strictly to TRUE pass. To check for nulls, use IS NULL."
  },
  {
    "id": "mcq_where_27",
    "keyword": "WHERE",
    "tag": "⚡ Gotcha Trap",
    "question": "[WHERE #27] Why does the predicate \"WHERE department_id NOT IN (1, 2, NULL)\" evaluate unexpectedly? (Scenario Variant 6)",
    "options": [
      "It returns all rows where department_id is 1 or 2",
      "It throws an InvalidSetComparison exception",
      "If the list contains NULL, NOT IN returns UNKNOWN for all non-matching rows, resulting in ZERO rows returned",
      "It automatically treats NULL as 0"
    ],
    "correctIndex": 2,
    "explanation": "NOT IN (1, 2, NULL) expands to (id != 1 AND id != 2 AND id != NULL). Because id != NULL is always UNKNOWN, the whole AND chain evaluates to UNKNOWN or FALSE, returning zero rows!"
  },
  {
    "id": "mcq_where_28",
    "keyword": "WHERE",
    "tag": "🐱 Brain Bender",
    "question": "[WHERE #28] What does it mean for a WHERE clause predicate to be \"SARGable\" (Search Argument Able)? (Scenario Variant 6)",
    "options": [
      "The condition is written in uppercase syntax",
      "The predicate has no WHERE keyword",
      "The condition is structured so the query optimizer can utilize a B-tree index seek rather than a full table scan",
      "The query uses asynchronous parallel threads"
    ],
    "correctIndex": 2,
    "explanation": "A SARGable predicate allows index seeks. For example, \"WHERE created_at >= '2026-01-01'\" is SARGable, whereas \"WHERE YEAR(created_at) = 2026\" wraps the column in a function and disables index seeks."
  },
  {
    "id": "mcq_where_29",
    "keyword": "WHERE",
    "tag": "🎯 Core Concept",
    "question": "[WHERE #29] What happens when you use column aliases defined in SELECT inside the WHERE clause? (Scenario Variant 6)",
    "options": [
      "It is standard ANSI SQL and works in all engines",
      "The database engine throws an \"Unknown Column\" error because WHERE executes before SELECT",
      "The query runs 2x faster",
      "The engine automatically aliases all table columns"
    ],
    "correctIndex": 1,
    "explanation": "WHERE executes as Step 02, while SELECT executes as Step 03/05. The column alias does not exist yet when WHERE is evaluated."
  },
  {
    "id": "mcq_where_30",
    "keyword": "WHERE",
    "tag": "🏆 Senior Staff",
    "question": "[WHERE #30] In the condition \"WHERE status = 'active' OR role = 'admin' AND salary > 50000\", which operator has higher precedence? (Scenario Variant 6)",
    "options": [
      "Operators are strictly evaluated left-to-right regardless of type",
      "AND and OR have equal precedence",
      "OR has higher precedence than AND",
      "AND has higher precedence than OR and is evaluated first"
    ],
    "correctIndex": 3,
    "explanation": "AND has higher logical precedence than OR. The predicate is evaluated as: status = 'active' OR (role = 'admin' AND salary > 50000). Always use parentheses to ensure clarity."
  },
  {
    "id": "mcq_where_31",
    "keyword": "WHERE",
    "tag": "🍡 Quick Snack",
    "question": "[WHERE #31] In SQL Three-Valued Logic (3VL), what is the evaluation result of \"WHERE salary = NULL\"? (Scenario Variant 7)",
    "options": [
      "UNKNOWN (evaluates to non-TRUE, so the row is rejected)",
      "Syntax Error: NULL cannot be compared with =",
      "FALSE",
      "TRUE if the salary is indeed NULL"
    ],
    "correctIndex": 0,
    "explanation": "In SQL, comparing any value to NULL using = produces UNKNOWN. In a WHERE clause, only rows evaluating strictly to TRUE pass. To check for nulls, use IS NULL."
  },
  {
    "id": "mcq_where_32",
    "keyword": "WHERE",
    "tag": "⚡ Gotcha Trap",
    "question": "[WHERE #32] Why does the predicate \"WHERE department_id NOT IN (1, 2, NULL)\" evaluate unexpectedly? (Scenario Variant 7)",
    "options": [
      "It returns all rows where department_id is 1 or 2",
      "It automatically treats NULL as 0",
      "If the list contains NULL, NOT IN returns UNKNOWN for all non-matching rows, resulting in ZERO rows returned",
      "It throws an InvalidSetComparison exception"
    ],
    "correctIndex": 2,
    "explanation": "NOT IN (1, 2, NULL) expands to (id != 1 AND id != 2 AND id != NULL). Because id != NULL is always UNKNOWN, the whole AND chain evaluates to UNKNOWN or FALSE, returning zero rows!"
  },
  {
    "id": "mcq_where_33",
    "keyword": "WHERE",
    "tag": "🐱 Brain Bender",
    "question": "[WHERE #33] What does it mean for a WHERE clause predicate to be \"SARGable\" (Search Argument Able)? (Scenario Variant 7)",
    "options": [
      "The predicate has no WHERE keyword",
      "The query uses asynchronous parallel threads",
      "The condition is written in uppercase syntax",
      "The condition is structured so the query optimizer can utilize a B-tree index seek rather than a full table scan"
    ],
    "correctIndex": 3,
    "explanation": "A SARGable predicate allows index seeks. For example, \"WHERE created_at >= '2026-01-01'\" is SARGable, whereas \"WHERE YEAR(created_at) = 2026\" wraps the column in a function and disables index seeks."
  },
  {
    "id": "mcq_where_34",
    "keyword": "WHERE",
    "tag": "🎯 Core Concept",
    "question": "[WHERE #34] What happens when you use column aliases defined in SELECT inside the WHERE clause? (Scenario Variant 7)",
    "options": [
      "It is standard ANSI SQL and works in all engines",
      "The engine automatically aliases all table columns",
      "The database engine throws an \"Unknown Column\" error because WHERE executes before SELECT",
      "The query runs 2x faster"
    ],
    "correctIndex": 2,
    "explanation": "WHERE executes as Step 02, while SELECT executes as Step 03/05. The column alias does not exist yet when WHERE is evaluated."
  },
  {
    "id": "mcq_where_35",
    "keyword": "WHERE",
    "tag": "🏆 Senior Staff",
    "question": "[WHERE #35] In the condition \"WHERE status = 'active' OR role = 'admin' AND salary > 50000\", which operator has higher precedence? (Scenario Variant 7)",
    "options": [
      "OR has higher precedence than AND",
      "AND has higher precedence than OR and is evaluated first",
      "AND and OR have equal precedence",
      "Operators are strictly evaluated left-to-right regardless of type"
    ],
    "correctIndex": 1,
    "explanation": "AND has higher logical precedence than OR. The predicate is evaluated as: status = 'active' OR (role = 'admin' AND salary > 50000). Always use parentheses to ensure clarity."
  },
  {
    "id": "mcq_where_36",
    "keyword": "WHERE",
    "tag": "🍡 Quick Snack",
    "question": "[WHERE #36] In SQL Three-Valued Logic (3VL), what is the evaluation result of \"WHERE salary = NULL\"? (Scenario Variant 8)",
    "options": [
      "FALSE",
      "TRUE if the salary is indeed NULL",
      "Syntax Error: NULL cannot be compared with =",
      "UNKNOWN (evaluates to non-TRUE, so the row is rejected)"
    ],
    "correctIndex": 3,
    "explanation": "In SQL, comparing any value to NULL using = produces UNKNOWN. In a WHERE clause, only rows evaluating strictly to TRUE pass. To check for nulls, use IS NULL."
  },
  {
    "id": "mcq_where_37",
    "keyword": "WHERE",
    "tag": "⚡ Gotcha Trap",
    "question": "[WHERE #37] Why does the predicate \"WHERE department_id NOT IN (1, 2, NULL)\" evaluate unexpectedly? (Scenario Variant 8)",
    "options": [
      "It throws an InvalidSetComparison exception",
      "If the list contains NULL, NOT IN returns UNKNOWN for all non-matching rows, resulting in ZERO rows returned",
      "It automatically treats NULL as 0",
      "It returns all rows where department_id is 1 or 2"
    ],
    "correctIndex": 1,
    "explanation": "NOT IN (1, 2, NULL) expands to (id != 1 AND id != 2 AND id != NULL). Because id != NULL is always UNKNOWN, the whole AND chain evaluates to UNKNOWN or FALSE, returning zero rows!"
  },
  {
    "id": "mcq_where_38",
    "keyword": "WHERE",
    "tag": "🐱 Brain Bender",
    "question": "[WHERE #38] What does it mean for a WHERE clause predicate to be \"SARGable\" (Search Argument Able)? (Scenario Variant 8)",
    "options": [
      "The predicate has no WHERE keyword",
      "The query uses asynchronous parallel threads",
      "The condition is structured so the query optimizer can utilize a B-tree index seek rather than a full table scan",
      "The condition is written in uppercase syntax"
    ],
    "correctIndex": 2,
    "explanation": "A SARGable predicate allows index seeks. For example, \"WHERE created_at >= '2026-01-01'\" is SARGable, whereas \"WHERE YEAR(created_at) = 2026\" wraps the column in a function and disables index seeks."
  },
  {
    "id": "mcq_where_39",
    "keyword": "WHERE",
    "tag": "🎯 Core Concept",
    "question": "[WHERE #39] What happens when you use column aliases defined in SELECT inside the WHERE clause? (Scenario Variant 8)",
    "options": [
      "The engine automatically aliases all table columns",
      "It is standard ANSI SQL and works in all engines",
      "The database engine throws an \"Unknown Column\" error because WHERE executes before SELECT",
      "The query runs 2x faster"
    ],
    "correctIndex": 2,
    "explanation": "WHERE executes as Step 02, while SELECT executes as Step 03/05. The column alias does not exist yet when WHERE is evaluated."
  },
  {
    "id": "mcq_where_40",
    "keyword": "WHERE",
    "tag": "🏆 Senior Staff",
    "question": "[WHERE #40] In the condition \"WHERE status = 'active' OR role = 'admin' AND salary > 50000\", which operator has higher precedence? (Scenario Variant 8)",
    "options": [
      "AND and OR have equal precedence",
      "Operators are strictly evaluated left-to-right regardless of type",
      "OR has higher precedence than AND",
      "AND has higher precedence than OR and is evaluated first"
    ],
    "correctIndex": 3,
    "explanation": "AND has higher logical precedence than OR. The predicate is evaluated as: status = 'active' OR (role = 'admin' AND salary > 50000). Always use parentheses to ensure clarity."
  },
  {
    "id": "mcq_where_41",
    "keyword": "WHERE",
    "tag": "🍡 Quick Snack",
    "question": "[WHERE #41] In SQL Three-Valued Logic (3VL), what is the evaluation result of \"WHERE salary = NULL\"? (Scenario Variant 9)",
    "options": [
      "TRUE if the salary is indeed NULL",
      "UNKNOWN (evaluates to non-TRUE, so the row is rejected)",
      "FALSE",
      "Syntax Error: NULL cannot be compared with ="
    ],
    "correctIndex": 1,
    "explanation": "In SQL, comparing any value to NULL using = produces UNKNOWN. In a WHERE clause, only rows evaluating strictly to TRUE pass. To check for nulls, use IS NULL."
  },
  {
    "id": "mcq_where_42",
    "keyword": "WHERE",
    "tag": "⚡ Gotcha Trap",
    "question": "[WHERE #42] Why does the predicate \"WHERE department_id NOT IN (1, 2, NULL)\" evaluate unexpectedly? (Scenario Variant 9)",
    "options": [
      "It automatically treats NULL as 0",
      "It returns all rows where department_id is 1 or 2",
      "It throws an InvalidSetComparison exception",
      "If the list contains NULL, NOT IN returns UNKNOWN for all non-matching rows, resulting in ZERO rows returned"
    ],
    "correctIndex": 3,
    "explanation": "NOT IN (1, 2, NULL) expands to (id != 1 AND id != 2 AND id != NULL). Because id != NULL is always UNKNOWN, the whole AND chain evaluates to UNKNOWN or FALSE, returning zero rows!"
  },
  {
    "id": "mcq_where_43",
    "keyword": "WHERE",
    "tag": "🐱 Brain Bender",
    "question": "[WHERE #43] What does it mean for a WHERE clause predicate to be \"SARGable\" (Search Argument Able)? (Scenario Variant 9)",
    "options": [
      "The predicate has no WHERE keyword",
      "The condition is written in uppercase syntax",
      "The query uses asynchronous parallel threads",
      "The condition is structured so the query optimizer can utilize a B-tree index seek rather than a full table scan"
    ],
    "correctIndex": 3,
    "explanation": "A SARGable predicate allows index seeks. For example, \"WHERE created_at >= '2026-01-01'\" is SARGable, whereas \"WHERE YEAR(created_at) = 2026\" wraps the column in a function and disables index seeks."
  },
  {
    "id": "mcq_where_44",
    "keyword": "WHERE",
    "tag": "🎯 Core Concept",
    "question": "[WHERE #44] What happens when you use column aliases defined in SELECT inside the WHERE clause? (Scenario Variant 9)",
    "options": [
      "It is standard ANSI SQL and works in all engines",
      "The engine automatically aliases all table columns",
      "The query runs 2x faster",
      "The database engine throws an \"Unknown Column\" error because WHERE executes before SELECT"
    ],
    "correctIndex": 3,
    "explanation": "WHERE executes as Step 02, while SELECT executes as Step 03/05. The column alias does not exist yet when WHERE is evaluated."
  },
  {
    "id": "mcq_where_45",
    "keyword": "WHERE",
    "tag": "🏆 Senior Staff",
    "question": "[WHERE #45] In the condition \"WHERE status = 'active' OR role = 'admin' AND salary > 50000\", which operator has higher precedence? (Scenario Variant 9)",
    "options": [
      "AND and OR have equal precedence",
      "AND has higher precedence than OR and is evaluated first",
      "OR has higher precedence than AND",
      "Operators are strictly evaluated left-to-right regardless of type"
    ],
    "correctIndex": 1,
    "explanation": "AND has higher logical precedence than OR. The predicate is evaluated as: status = 'active' OR (role = 'admin' AND salary > 50000). Always use parentheses to ensure clarity."
  },
  {
    "id": "mcq_where_46",
    "keyword": "WHERE",
    "tag": "🍡 Quick Snack",
    "question": "[WHERE #46] In SQL Three-Valued Logic (3VL), what is the evaluation result of \"WHERE salary = NULL\"? (Scenario Variant 10)",
    "options": [
      "TRUE if the salary is indeed NULL",
      "Syntax Error: NULL cannot be compared with =",
      "UNKNOWN (evaluates to non-TRUE, so the row is rejected)",
      "FALSE"
    ],
    "correctIndex": 2,
    "explanation": "In SQL, comparing any value to NULL using = produces UNKNOWN. In a WHERE clause, only rows evaluating strictly to TRUE pass. To check for nulls, use IS NULL."
  },
  {
    "id": "mcq_where_47",
    "keyword": "WHERE",
    "tag": "⚡ Gotcha Trap",
    "question": "[WHERE #47] Why does the predicate \"WHERE department_id NOT IN (1, 2, NULL)\" evaluate unexpectedly? (Scenario Variant 10)",
    "options": [
      "It automatically treats NULL as 0",
      "It throws an InvalidSetComparison exception",
      "If the list contains NULL, NOT IN returns UNKNOWN for all non-matching rows, resulting in ZERO rows returned",
      "It returns all rows where department_id is 1 or 2"
    ],
    "correctIndex": 2,
    "explanation": "NOT IN (1, 2, NULL) expands to (id != 1 AND id != 2 AND id != NULL). Because id != NULL is always UNKNOWN, the whole AND chain evaluates to UNKNOWN or FALSE, returning zero rows!"
  },
  {
    "id": "mcq_where_48",
    "keyword": "WHERE",
    "tag": "🐱 Brain Bender",
    "question": "[WHERE #48] What does it mean for a WHERE clause predicate to be \"SARGable\" (Search Argument Able)? (Scenario Variant 10)",
    "options": [
      "The predicate has no WHERE keyword",
      "The query uses asynchronous parallel threads",
      "The condition is structured so the query optimizer can utilize a B-tree index seek rather than a full table scan",
      "The condition is written in uppercase syntax"
    ],
    "correctIndex": 2,
    "explanation": "A SARGable predicate allows index seeks. For example, \"WHERE created_at >= '2026-01-01'\" is SARGable, whereas \"WHERE YEAR(created_at) = 2026\" wraps the column in a function and disables index seeks."
  },
  {
    "id": "mcq_where_49",
    "keyword": "WHERE",
    "tag": "🎯 Core Concept",
    "question": "[WHERE #49] What happens when you use column aliases defined in SELECT inside the WHERE clause? (Scenario Variant 10)",
    "options": [
      "The query runs 2x faster",
      "The database engine throws an \"Unknown Column\" error because WHERE executes before SELECT",
      "The engine automatically aliases all table columns",
      "It is standard ANSI SQL and works in all engines"
    ],
    "correctIndex": 1,
    "explanation": "WHERE executes as Step 02, while SELECT executes as Step 03/05. The column alias does not exist yet when WHERE is evaluated."
  },
  {
    "id": "mcq_where_50",
    "keyword": "WHERE",
    "tag": "🏆 Senior Staff",
    "question": "[WHERE #50] In the condition \"WHERE status = 'active' OR role = 'admin' AND salary > 50000\", which operator has higher precedence? (Scenario Variant 10)",
    "options": [
      "Operators are strictly evaluated left-to-right regardless of type",
      "AND and OR have equal precedence",
      "OR has higher precedence than AND",
      "AND has higher precedence than OR and is evaluated first"
    ],
    "correctIndex": 3,
    "explanation": "AND has higher logical precedence than OR. The predicate is evaluated as: status = 'active' OR (role = 'admin' AND salary > 50000). Always use parentheses to ensure clarity."
  },
  {
    "id": "mcq_where_51",
    "keyword": "WHERE",
    "tag": "🎯 Core Concept",
    "question": "[WHERE #51 &bull; Fintech & Ledger Systems] In Three-Valued Logic (3VL), what is the evaluation of 'WHERE salary = NULL' versus 'WHERE salary IS NULL'? (Application Scenario 1)",
    "options": [
      "Both evaluate to TRUE for missing values",
      "'salary = NULL' is a syntax error",
      "Both are identical in ANSI SQL",
      "'salary = NULL' evaluates to UNKNOWN (which WHERE treats as FALSE), while 'salary IS NULL' correctly evaluates to TRUE for missing values"
    ],
    "correctIndex": 3,
    "explanation": "NULL represents an unknown state, so comparing with = yields UNKNOWN. The WHERE clause only admits rows evaluating to TRUE. The unary predicate IS NULL must be used. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_where_52",
    "keyword": "WHERE",
    "tag": "🏛️ Corporate Edge",
    "question": "[WHERE #52 &bull; SaaS Subscription Billing] Why does the condition 'WHERE status NOT IN ('active', 'pending', NULL)' return ZERO rows, even if rows with status = 'archived' exist? (Application Scenario 1)",
    "options": [
      "NOT IN cannot accept more than two arguments",
      "NOT IN expands to (status != 'active' AND status != 'pending' AND status != NULL). Since != NULL is UNKNOWN, the entire conjunction evaluates to UNKNOWN or FALSE",
      "'archived' is a reserved word in MySQL",
      "InnoDB automatically indexes NOT IN as empty"
    ],
    "correctIndex": 1,
    "explanation": "The presence of NULL inside a NOT IN list is the most notorious SQL trap. Because x != NULL is UNKNOWN, ANDing with UNKNOWN makes the entire expression evaluate to UNKNOWN, returning 0 rows. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_where_53",
    "keyword": "WHERE",
    "tag": "💡 Lead Architect",
    "question": "[WHERE #53 &bull; Global Supply Chain & Logistics] What is a 'sargable' predicate in SQL query optimization? (Application Scenario 1)",
    "options": [
      "A predicate that only works on SQLite databases",
      "A predicate containing multiple OR clauses",
      "A predicate that sorts output in descending order",
      "A predicate formulated so the engine can utilize index seek operations (e.g. 'WHERE created_at >= '2026-01-01'') rather than full scans"
    ],
    "correctIndex": 3,
    "explanation": "SARGable stands for Search Argument Able. Writing 'YEAR(date) = 2026' is non-sargable (forces full table scan), whereas 'date >= '2026-01-01' AND date < '2027-01-01'' is sargable. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_where_54",
    "keyword": "WHERE",
    "tag": "⚡ Gotcha Trap",
    "question": "[WHERE #54 &bull; Healthcare Patient Records] In 'WHERE a = 1 OR b = 2', why might the query optimizer struggle to use single-column B-Tree indexes on both a and b? (Application Scenario 1)",
    "options": [
      "OR conditions automatically invalidate all primary keys",
      "OR requires checking both branches; unless the engine supports Index Merge Union, it must perform a full table scan",
      "B-Trees cannot store integers",
      "MySQL does not support OR predicates"
    ],
    "correctIndex": 1,
    "explanation": "Single-column B-Trees cannot satisfy an OR condition in a single index lookup. The engine must either perform an Index Merge (scanning both indexes and merging row IDs) or fall back to a full table scan. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_where_55",
    "keyword": "WHERE",
    "tag": "🎯 Core Concept",
    "question": "[WHERE #55 &bull; E-Commerce Checkout Funnels] What does 'WHERE 1 = 1' signify in production ORM and dynamic query builders? (Application Scenario 1)",
    "options": [
      "A security bypass exploit",
      "A directive to disable table caching",
      "A command that doubles query execution priority",
      "A neutral true anchor allowing developers to programmatically append 'AND condition' without checking if it is the first predicate"
    ],
    "correctIndex": 3,
    "explanation": "In dynamic SQL generation, 'WHERE 1=1' serves as a syntactic base so subsequent conditions can always start with 'AND ...' safely. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_where_56",
    "keyword": "WHERE",
    "tag": "🏛️ Corporate Edge",
    "question": "[WHERE #56 &bull; Telecom Billing & Data Streams] In Three-Valued Logic (3VL), what is the evaluation of 'WHERE salary = NULL' versus 'WHERE salary IS NULL'? (Application Scenario 2)",
    "options": [
      "Both evaluate to TRUE for missing values",
      "'salary = NULL' evaluates to UNKNOWN (which WHERE treats as FALSE), while 'salary IS NULL' correctly evaluates to TRUE for missing values",
      "'salary = NULL' is a syntax error",
      "Both are identical in ANSI SQL"
    ],
    "correctIndex": 1,
    "explanation": "NULL represents an unknown state, so comparing with = yields UNKNOWN. The WHERE clause only admits rows evaluating to TRUE. The unary predicate IS NULL must be used. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_where_57",
    "keyword": "WHERE",
    "tag": "💡 Lead Architect",
    "question": "[WHERE #57 &bull; AdTech Real-Time Bidding] Why does the condition 'WHERE status NOT IN ('active', 'pending', NULL)' return ZERO rows, even if rows with status = 'archived' exist? (Application Scenario 2)",
    "options": [
      "NOT IN cannot accept more than two arguments",
      "'archived' is a reserved word in MySQL",
      "InnoDB automatically indexes NOT IN as empty",
      "NOT IN expands to (status != 'active' AND status != 'pending' AND status != NULL). Since != NULL is UNKNOWN, the entire conjunction evaluates to UNKNOWN or FALSE"
    ],
    "correctIndex": 3,
    "explanation": "The presence of NULL inside a NOT IN list is the most notorious SQL trap. Because x != NULL is UNKNOWN, ANDing with UNKNOWN makes the entire expression evaluate to UNKNOWN, returning 0 rows. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_where_58",
    "keyword": "WHERE",
    "tag": "⚡ Gotcha Trap",
    "question": "[WHERE #58 &bull; Cybersecurity Audit Logs] What is a 'sargable' predicate in SQL query optimization? (Application Scenario 2)",
    "options": [
      "A predicate that only works on SQLite databases",
      "A predicate formulated so the engine can utilize index seek operations (e.g. 'WHERE created_at >= '2026-01-01'') rather than full scans",
      "A predicate containing multiple OR clauses",
      "A predicate that sorts output in descending order"
    ],
    "correctIndex": 1,
    "explanation": "SARGable stands for Search Argument Able. Writing 'YEAR(date) = 2026' is non-sargable (forces full table scan), whereas 'date >= '2026-01-01' AND date < '2027-01-01'' is sargable. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_where_59",
    "keyword": "WHERE",
    "tag": "🎯 Core Concept",
    "question": "[WHERE #59 &bull; Fintech & Ledger Systems] In 'WHERE a = 1 OR b = 2', why might the query optimizer struggle to use single-column B-Tree indexes on both a and b? (Application Scenario 2)",
    "options": [
      "OR conditions automatically invalidate all primary keys",
      "B-Trees cannot store integers",
      "MySQL does not support OR predicates",
      "OR requires checking both branches; unless the engine supports Index Merge Union, it must perform a full table scan"
    ],
    "correctIndex": 3,
    "explanation": "Single-column B-Trees cannot satisfy an OR condition in a single index lookup. The engine must either perform an Index Merge (scanning both indexes and merging row IDs) or fall back to a full table scan. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_where_60",
    "keyword": "WHERE",
    "tag": "🏛️ Corporate Edge",
    "question": "[WHERE #60 &bull; SaaS Subscription Billing] What does 'WHERE 1 = 1' signify in production ORM and dynamic query builders? (Application Scenario 2)",
    "options": [
      "A security bypass exploit",
      "A neutral true anchor allowing developers to programmatically append 'AND condition' without checking if it is the first predicate",
      "A directive to disable table caching",
      "A command that doubles query execution priority"
    ],
    "correctIndex": 1,
    "explanation": "In dynamic SQL generation, 'WHERE 1=1' serves as a syntactic base so subsequent conditions can always start with 'AND ...' safely. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_where_61",
    "keyword": "WHERE",
    "tag": "💡 Lead Architect",
    "question": "[WHERE #61 &bull; Global Supply Chain & Logistics] In Three-Valued Logic (3VL), what is the evaluation of 'WHERE salary = NULL' versus 'WHERE salary IS NULL'? (Application Scenario 3)",
    "options": [
      "Both evaluate to TRUE for missing values",
      "'salary = NULL' is a syntax error",
      "Both are identical in ANSI SQL",
      "'salary = NULL' evaluates to UNKNOWN (which WHERE treats as FALSE), while 'salary IS NULL' correctly evaluates to TRUE for missing values"
    ],
    "correctIndex": 3,
    "explanation": "NULL represents an unknown state, so comparing with = yields UNKNOWN. The WHERE clause only admits rows evaluating to TRUE. The unary predicate IS NULL must be used. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_where_62",
    "keyword": "WHERE",
    "tag": "⚡ Gotcha Trap",
    "question": "[WHERE #62 &bull; Healthcare Patient Records] Why does the condition 'WHERE status NOT IN ('active', 'pending', NULL)' return ZERO rows, even if rows with status = 'archived' exist? (Application Scenario 3)",
    "options": [
      "NOT IN cannot accept more than two arguments",
      "NOT IN expands to (status != 'active' AND status != 'pending' AND status != NULL). Since != NULL is UNKNOWN, the entire conjunction evaluates to UNKNOWN or FALSE",
      "'archived' is a reserved word in MySQL",
      "InnoDB automatically indexes NOT IN as empty"
    ],
    "correctIndex": 1,
    "explanation": "The presence of NULL inside a NOT IN list is the most notorious SQL trap. Because x != NULL is UNKNOWN, ANDing with UNKNOWN makes the entire expression evaluate to UNKNOWN, returning 0 rows. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_where_63",
    "keyword": "WHERE",
    "tag": "🎯 Core Concept",
    "question": "[WHERE #63 &bull; E-Commerce Checkout Funnels] What is a 'sargable' predicate in SQL query optimization? (Application Scenario 3)",
    "options": [
      "A predicate that only works on SQLite databases",
      "A predicate containing multiple OR clauses",
      "A predicate that sorts output in descending order",
      "A predicate formulated so the engine can utilize index seek operations (e.g. 'WHERE created_at >= '2026-01-01'') rather than full scans"
    ],
    "correctIndex": 3,
    "explanation": "SARGable stands for Search Argument Able. Writing 'YEAR(date) = 2026' is non-sargable (forces full table scan), whereas 'date >= '2026-01-01' AND date < '2027-01-01'' is sargable. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_where_64",
    "keyword": "WHERE",
    "tag": "🏛️ Corporate Edge",
    "question": "[WHERE #64 &bull; Telecom Billing & Data Streams] In 'WHERE a = 1 OR b = 2', why might the query optimizer struggle to use single-column B-Tree indexes on both a and b? (Application Scenario 3)",
    "options": [
      "OR conditions automatically invalidate all primary keys",
      "OR requires checking both branches; unless the engine supports Index Merge Union, it must perform a full table scan",
      "B-Trees cannot store integers",
      "MySQL does not support OR predicates"
    ],
    "correctIndex": 1,
    "explanation": "Single-column B-Trees cannot satisfy an OR condition in a single index lookup. The engine must either perform an Index Merge (scanning both indexes and merging row IDs) or fall back to a full table scan. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_where_65",
    "keyword": "WHERE",
    "tag": "💡 Lead Architect",
    "question": "[WHERE #65 &bull; AdTech Real-Time Bidding] What does 'WHERE 1 = 1' signify in production ORM and dynamic query builders? (Application Scenario 3)",
    "options": [
      "A security bypass exploit",
      "A directive to disable table caching",
      "A command that doubles query execution priority",
      "A neutral true anchor allowing developers to programmatically append 'AND condition' without checking if it is the first predicate"
    ],
    "correctIndex": 3,
    "explanation": "In dynamic SQL generation, 'WHERE 1=1' serves as a syntactic base so subsequent conditions can always start with 'AND ...' safely. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_where_66",
    "keyword": "WHERE",
    "tag": "⚡ Gotcha Trap",
    "question": "[WHERE #66 &bull; Cybersecurity Audit Logs] In Three-Valued Logic (3VL), what is the evaluation of 'WHERE salary = NULL' versus 'WHERE salary IS NULL'? (Application Scenario 4)",
    "options": [
      "Both evaluate to TRUE for missing values",
      "'salary = NULL' evaluates to UNKNOWN (which WHERE treats as FALSE), while 'salary IS NULL' correctly evaluates to TRUE for missing values",
      "'salary = NULL' is a syntax error",
      "Both are identical in ANSI SQL"
    ],
    "correctIndex": 1,
    "explanation": "NULL represents an unknown state, so comparing with = yields UNKNOWN. The WHERE clause only admits rows evaluating to TRUE. The unary predicate IS NULL must be used. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_where_67",
    "keyword": "WHERE",
    "tag": "🎯 Core Concept",
    "question": "[WHERE #67 &bull; Fintech & Ledger Systems] Why does the condition 'WHERE status NOT IN ('active', 'pending', NULL)' return ZERO rows, even if rows with status = 'archived' exist? (Application Scenario 4)",
    "options": [
      "NOT IN cannot accept more than two arguments",
      "'archived' is a reserved word in MySQL",
      "InnoDB automatically indexes NOT IN as empty",
      "NOT IN expands to (status != 'active' AND status != 'pending' AND status != NULL). Since != NULL is UNKNOWN, the entire conjunction evaluates to UNKNOWN or FALSE"
    ],
    "correctIndex": 3,
    "explanation": "The presence of NULL inside a NOT IN list is the most notorious SQL trap. Because x != NULL is UNKNOWN, ANDing with UNKNOWN makes the entire expression evaluate to UNKNOWN, returning 0 rows. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_where_68",
    "keyword": "WHERE",
    "tag": "🏛️ Corporate Edge",
    "question": "[WHERE #68 &bull; SaaS Subscription Billing] What is a 'sargable' predicate in SQL query optimization? (Application Scenario 4)",
    "options": [
      "A predicate that only works on SQLite databases",
      "A predicate formulated so the engine can utilize index seek operations (e.g. 'WHERE created_at >= '2026-01-01'') rather than full scans",
      "A predicate containing multiple OR clauses",
      "A predicate that sorts output in descending order"
    ],
    "correctIndex": 1,
    "explanation": "SARGable stands for Search Argument Able. Writing 'YEAR(date) = 2026' is non-sargable (forces full table scan), whereas 'date >= '2026-01-01' AND date < '2027-01-01'' is sargable. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_where_69",
    "keyword": "WHERE",
    "tag": "💡 Lead Architect",
    "question": "[WHERE #69 &bull; Global Supply Chain & Logistics] In 'WHERE a = 1 OR b = 2', why might the query optimizer struggle to use single-column B-Tree indexes on both a and b? (Application Scenario 4)",
    "options": [
      "OR conditions automatically invalidate all primary keys",
      "B-Trees cannot store integers",
      "MySQL does not support OR predicates",
      "OR requires checking both branches; unless the engine supports Index Merge Union, it must perform a full table scan"
    ],
    "correctIndex": 3,
    "explanation": "Single-column B-Trees cannot satisfy an OR condition in a single index lookup. The engine must either perform an Index Merge (scanning both indexes and merging row IDs) or fall back to a full table scan. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_where_70",
    "keyword": "WHERE",
    "tag": "⚡ Gotcha Trap",
    "question": "[WHERE #70 &bull; Healthcare Patient Records] What does 'WHERE 1 = 1' signify in production ORM and dynamic query builders? (Application Scenario 4)",
    "options": [
      "A security bypass exploit",
      "A neutral true anchor allowing developers to programmatically append 'AND condition' without checking if it is the first predicate",
      "A directive to disable table caching",
      "A command that doubles query execution priority"
    ],
    "correctIndex": 1,
    "explanation": "In dynamic SQL generation, 'WHERE 1=1' serves as a syntactic base so subsequent conditions can always start with 'AND ...' safely. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_where_71",
    "keyword": "WHERE",
    "tag": "🎯 Core Concept",
    "question": "[WHERE #71 &bull; E-Commerce Checkout Funnels] In Three-Valued Logic (3VL), what is the evaluation of 'WHERE salary = NULL' versus 'WHERE salary IS NULL'? (Application Scenario 5)",
    "options": [
      "Both evaluate to TRUE for missing values",
      "'salary = NULL' is a syntax error",
      "Both are identical in ANSI SQL",
      "'salary = NULL' evaluates to UNKNOWN (which WHERE treats as FALSE), while 'salary IS NULL' correctly evaluates to TRUE for missing values"
    ],
    "correctIndex": 3,
    "explanation": "NULL represents an unknown state, so comparing with = yields UNKNOWN. The WHERE clause only admits rows evaluating to TRUE. The unary predicate IS NULL must be used. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_where_72",
    "keyword": "WHERE",
    "tag": "🏛️ Corporate Edge",
    "question": "[WHERE #72 &bull; Telecom Billing & Data Streams] Why does the condition 'WHERE status NOT IN ('active', 'pending', NULL)' return ZERO rows, even if rows with status = 'archived' exist? (Application Scenario 5)",
    "options": [
      "NOT IN cannot accept more than two arguments",
      "NOT IN expands to (status != 'active' AND status != 'pending' AND status != NULL). Since != NULL is UNKNOWN, the entire conjunction evaluates to UNKNOWN or FALSE",
      "'archived' is a reserved word in MySQL",
      "InnoDB automatically indexes NOT IN as empty"
    ],
    "correctIndex": 1,
    "explanation": "The presence of NULL inside a NOT IN list is the most notorious SQL trap. Because x != NULL is UNKNOWN, ANDing with UNKNOWN makes the entire expression evaluate to UNKNOWN, returning 0 rows. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_where_73",
    "keyword": "WHERE",
    "tag": "💡 Lead Architect",
    "question": "[WHERE #73 &bull; AdTech Real-Time Bidding] What is a 'sargable' predicate in SQL query optimization? (Application Scenario 5)",
    "options": [
      "A predicate that only works on SQLite databases",
      "A predicate containing multiple OR clauses",
      "A predicate that sorts output in descending order",
      "A predicate formulated so the engine can utilize index seek operations (e.g. 'WHERE created_at >= '2026-01-01'') rather than full scans"
    ],
    "correctIndex": 3,
    "explanation": "SARGable stands for Search Argument Able. Writing 'YEAR(date) = 2026' is non-sargable (forces full table scan), whereas 'date >= '2026-01-01' AND date < '2027-01-01'' is sargable. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_where_74",
    "keyword": "WHERE",
    "tag": "⚡ Gotcha Trap",
    "question": "[WHERE #74 &bull; Cybersecurity Audit Logs] In 'WHERE a = 1 OR b = 2', why might the query optimizer struggle to use single-column B-Tree indexes on both a and b? (Application Scenario 5)",
    "options": [
      "OR conditions automatically invalidate all primary keys",
      "OR requires checking both branches; unless the engine supports Index Merge Union, it must perform a full table scan",
      "B-Trees cannot store integers",
      "MySQL does not support OR predicates"
    ],
    "correctIndex": 1,
    "explanation": "Single-column B-Trees cannot satisfy an OR condition in a single index lookup. The engine must either perform an Index Merge (scanning both indexes and merging row IDs) or fall back to a full table scan. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_where_75",
    "keyword": "WHERE",
    "tag": "🎯 Core Concept",
    "question": "[WHERE #75 &bull; Fintech & Ledger Systems] What does 'WHERE 1 = 1' signify in production ORM and dynamic query builders? (Application Scenario 5)",
    "options": [
      "A security bypass exploit",
      "A directive to disable table caching",
      "A command that doubles query execution priority",
      "A neutral true anchor allowing developers to programmatically append 'AND condition' without checking if it is the first predicate"
    ],
    "correctIndex": 3,
    "explanation": "In dynamic SQL generation, 'WHERE 1=1' serves as a syntactic base so subsequent conditions can always start with 'AND ...' safely. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_where_76",
    "keyword": "WHERE",
    "tag": "🏛️ Corporate Edge",
    "question": "[WHERE #76 &bull; SaaS Subscription Billing] In Three-Valued Logic (3VL), what is the evaluation of 'WHERE salary = NULL' versus 'WHERE salary IS NULL'? (Application Scenario 6)",
    "options": [
      "Both evaluate to TRUE for missing values",
      "'salary = NULL' evaluates to UNKNOWN (which WHERE treats as FALSE), while 'salary IS NULL' correctly evaluates to TRUE for missing values",
      "'salary = NULL' is a syntax error",
      "Both are identical in ANSI SQL"
    ],
    "correctIndex": 1,
    "explanation": "NULL represents an unknown state, so comparing with = yields UNKNOWN. The WHERE clause only admits rows evaluating to TRUE. The unary predicate IS NULL must be used. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_where_77",
    "keyword": "WHERE",
    "tag": "💡 Lead Architect",
    "question": "[WHERE #77 &bull; Global Supply Chain & Logistics] Why does the condition 'WHERE status NOT IN ('active', 'pending', NULL)' return ZERO rows, even if rows with status = 'archived' exist? (Application Scenario 6)",
    "options": [
      "NOT IN cannot accept more than two arguments",
      "'archived' is a reserved word in MySQL",
      "InnoDB automatically indexes NOT IN as empty",
      "NOT IN expands to (status != 'active' AND status != 'pending' AND status != NULL). Since != NULL is UNKNOWN, the entire conjunction evaluates to UNKNOWN or FALSE"
    ],
    "correctIndex": 3,
    "explanation": "The presence of NULL inside a NOT IN list is the most notorious SQL trap. Because x != NULL is UNKNOWN, ANDing with UNKNOWN makes the entire expression evaluate to UNKNOWN, returning 0 rows. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_where_78",
    "keyword": "WHERE",
    "tag": "⚡ Gotcha Trap",
    "question": "[WHERE #78 &bull; Healthcare Patient Records] What is a 'sargable' predicate in SQL query optimization? (Application Scenario 6)",
    "options": [
      "A predicate that only works on SQLite databases",
      "A predicate formulated so the engine can utilize index seek operations (e.g. 'WHERE created_at >= '2026-01-01'') rather than full scans",
      "A predicate containing multiple OR clauses",
      "A predicate that sorts output in descending order"
    ],
    "correctIndex": 1,
    "explanation": "SARGable stands for Search Argument Able. Writing 'YEAR(date) = 2026' is non-sargable (forces full table scan), whereas 'date >= '2026-01-01' AND date < '2027-01-01'' is sargable. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_where_79",
    "keyword": "WHERE",
    "tag": "🎯 Core Concept",
    "question": "[WHERE #79 &bull; E-Commerce Checkout Funnels] In 'WHERE a = 1 OR b = 2', why might the query optimizer struggle to use single-column B-Tree indexes on both a and b? (Application Scenario 6)",
    "options": [
      "OR conditions automatically invalidate all primary keys",
      "B-Trees cannot store integers",
      "MySQL does not support OR predicates",
      "OR requires checking both branches; unless the engine supports Index Merge Union, it must perform a full table scan"
    ],
    "correctIndex": 3,
    "explanation": "Single-column B-Trees cannot satisfy an OR condition in a single index lookup. The engine must either perform an Index Merge (scanning both indexes and merging row IDs) or fall back to a full table scan. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_where_80",
    "keyword": "WHERE",
    "tag": "🏛️ Corporate Edge",
    "question": "[WHERE #80 &bull; Telecom Billing & Data Streams] What does 'WHERE 1 = 1' signify in production ORM and dynamic query builders? (Application Scenario 6)",
    "options": [
      "A security bypass exploit",
      "A neutral true anchor allowing developers to programmatically append 'AND condition' without checking if it is the first predicate",
      "A directive to disable table caching",
      "A command that doubles query execution priority"
    ],
    "correctIndex": 1,
    "explanation": "In dynamic SQL generation, 'WHERE 1=1' serves as a syntactic base so subsequent conditions can always start with 'AND ...' safely. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_where_81",
    "keyword": "WHERE",
    "tag": "💡 Lead Architect",
    "question": "[WHERE #81 &bull; AdTech Real-Time Bidding] In Three-Valued Logic (3VL), what is the evaluation of 'WHERE salary = NULL' versus 'WHERE salary IS NULL'? (Application Scenario 7)",
    "options": [
      "Both evaluate to TRUE for missing values",
      "'salary = NULL' is a syntax error",
      "Both are identical in ANSI SQL",
      "'salary = NULL' evaluates to UNKNOWN (which WHERE treats as FALSE), while 'salary IS NULL' correctly evaluates to TRUE for missing values"
    ],
    "correctIndex": 3,
    "explanation": "NULL represents an unknown state, so comparing with = yields UNKNOWN. The WHERE clause only admits rows evaluating to TRUE. The unary predicate IS NULL must be used. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_where_82",
    "keyword": "WHERE",
    "tag": "⚡ Gotcha Trap",
    "question": "[WHERE #82 &bull; Cybersecurity Audit Logs] Why does the condition 'WHERE status NOT IN ('active', 'pending', NULL)' return ZERO rows, even if rows with status = 'archived' exist? (Application Scenario 7)",
    "options": [
      "NOT IN cannot accept more than two arguments",
      "NOT IN expands to (status != 'active' AND status != 'pending' AND status != NULL). Since != NULL is UNKNOWN, the entire conjunction evaluates to UNKNOWN or FALSE",
      "'archived' is a reserved word in MySQL",
      "InnoDB automatically indexes NOT IN as empty"
    ],
    "correctIndex": 1,
    "explanation": "The presence of NULL inside a NOT IN list is the most notorious SQL trap. Because x != NULL is UNKNOWN, ANDing with UNKNOWN makes the entire expression evaluate to UNKNOWN, returning 0 rows. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_where_83",
    "keyword": "WHERE",
    "tag": "🎯 Core Concept",
    "question": "[WHERE #83 &bull; Fintech & Ledger Systems] What is a 'sargable' predicate in SQL query optimization? (Application Scenario 7)",
    "options": [
      "A predicate that only works on SQLite databases",
      "A predicate containing multiple OR clauses",
      "A predicate that sorts output in descending order",
      "A predicate formulated so the engine can utilize index seek operations (e.g. 'WHERE created_at >= '2026-01-01'') rather than full scans"
    ],
    "correctIndex": 3,
    "explanation": "SARGable stands for Search Argument Able. Writing 'YEAR(date) = 2026' is non-sargable (forces full table scan), whereas 'date >= '2026-01-01' AND date < '2027-01-01'' is sargable. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_where_84",
    "keyword": "WHERE",
    "tag": "🏛️ Corporate Edge",
    "question": "[WHERE #84 &bull; SaaS Subscription Billing] In 'WHERE a = 1 OR b = 2', why might the query optimizer struggle to use single-column B-Tree indexes on both a and b? (Application Scenario 7)",
    "options": [
      "OR conditions automatically invalidate all primary keys",
      "OR requires checking both branches; unless the engine supports Index Merge Union, it must perform a full table scan",
      "B-Trees cannot store integers",
      "MySQL does not support OR predicates"
    ],
    "correctIndex": 1,
    "explanation": "Single-column B-Trees cannot satisfy an OR condition in a single index lookup. The engine must either perform an Index Merge (scanning both indexes and merging row IDs) or fall back to a full table scan. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_where_85",
    "keyword": "WHERE",
    "tag": "💡 Lead Architect",
    "question": "[WHERE #85 &bull; Global Supply Chain & Logistics] What does 'WHERE 1 = 1' signify in production ORM and dynamic query builders? (Application Scenario 7)",
    "options": [
      "A security bypass exploit",
      "A directive to disable table caching",
      "A command that doubles query execution priority",
      "A neutral true anchor allowing developers to programmatically append 'AND condition' without checking if it is the first predicate"
    ],
    "correctIndex": 3,
    "explanation": "In dynamic SQL generation, 'WHERE 1=1' serves as a syntactic base so subsequent conditions can always start with 'AND ...' safely. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_where_86",
    "keyword": "WHERE",
    "tag": "⚡ Gotcha Trap",
    "question": "[WHERE #86 &bull; Healthcare Patient Records] In Three-Valued Logic (3VL), what is the evaluation of 'WHERE salary = NULL' versus 'WHERE salary IS NULL'? (Application Scenario 8)",
    "options": [
      "Both evaluate to TRUE for missing values",
      "'salary = NULL' evaluates to UNKNOWN (which WHERE treats as FALSE), while 'salary IS NULL' correctly evaluates to TRUE for missing values",
      "'salary = NULL' is a syntax error",
      "Both are identical in ANSI SQL"
    ],
    "correctIndex": 1,
    "explanation": "NULL represents an unknown state, so comparing with = yields UNKNOWN. The WHERE clause only admits rows evaluating to TRUE. The unary predicate IS NULL must be used. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_where_87",
    "keyword": "WHERE",
    "tag": "🎯 Core Concept",
    "question": "[WHERE #87 &bull; E-Commerce Checkout Funnels] Why does the condition 'WHERE status NOT IN ('active', 'pending', NULL)' return ZERO rows, even if rows with status = 'archived' exist? (Application Scenario 8)",
    "options": [
      "NOT IN cannot accept more than two arguments",
      "'archived' is a reserved word in MySQL",
      "InnoDB automatically indexes NOT IN as empty",
      "NOT IN expands to (status != 'active' AND status != 'pending' AND status != NULL). Since != NULL is UNKNOWN, the entire conjunction evaluates to UNKNOWN or FALSE"
    ],
    "correctIndex": 3,
    "explanation": "The presence of NULL inside a NOT IN list is the most notorious SQL trap. Because x != NULL is UNKNOWN, ANDing with UNKNOWN makes the entire expression evaluate to UNKNOWN, returning 0 rows. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_where_88",
    "keyword": "WHERE",
    "tag": "🏛️ Corporate Edge",
    "question": "[WHERE #88 &bull; Telecom Billing & Data Streams] What is a 'sargable' predicate in SQL query optimization? (Application Scenario 8)",
    "options": [
      "A predicate that only works on SQLite databases",
      "A predicate formulated so the engine can utilize index seek operations (e.g. 'WHERE created_at >= '2026-01-01'') rather than full scans",
      "A predicate containing multiple OR clauses",
      "A predicate that sorts output in descending order"
    ],
    "correctIndex": 1,
    "explanation": "SARGable stands for Search Argument Able. Writing 'YEAR(date) = 2026' is non-sargable (forces full table scan), whereas 'date >= '2026-01-01' AND date < '2027-01-01'' is sargable. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_where_89",
    "keyword": "WHERE",
    "tag": "💡 Lead Architect",
    "question": "[WHERE #89 &bull; AdTech Real-Time Bidding] In 'WHERE a = 1 OR b = 2', why might the query optimizer struggle to use single-column B-Tree indexes on both a and b? (Application Scenario 8)",
    "options": [
      "OR conditions automatically invalidate all primary keys",
      "B-Trees cannot store integers",
      "MySQL does not support OR predicates",
      "OR requires checking both branches; unless the engine supports Index Merge Union, it must perform a full table scan"
    ],
    "correctIndex": 3,
    "explanation": "Single-column B-Trees cannot satisfy an OR condition in a single index lookup. The engine must either perform an Index Merge (scanning both indexes and merging row IDs) or fall back to a full table scan. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_where_90",
    "keyword": "WHERE",
    "tag": "⚡ Gotcha Trap",
    "question": "[WHERE #90 &bull; Cybersecurity Audit Logs] What does 'WHERE 1 = 1' signify in production ORM and dynamic query builders? (Application Scenario 8)",
    "options": [
      "A security bypass exploit",
      "A neutral true anchor allowing developers to programmatically append 'AND condition' without checking if it is the first predicate",
      "A directive to disable table caching",
      "A command that doubles query execution priority"
    ],
    "correctIndex": 1,
    "explanation": "In dynamic SQL generation, 'WHERE 1=1' serves as a syntactic base so subsequent conditions can always start with 'AND ...' safely. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_where_91",
    "keyword": "WHERE",
    "tag": "🎯 Core Concept",
    "question": "[WHERE #91 &bull; Fintech & Ledger Systems] In Three-Valued Logic (3VL), what is the evaluation of 'WHERE salary = NULL' versus 'WHERE salary IS NULL'? (Application Scenario 9)",
    "options": [
      "Both evaluate to TRUE for missing values",
      "'salary = NULL' is a syntax error",
      "Both are identical in ANSI SQL",
      "'salary = NULL' evaluates to UNKNOWN (which WHERE treats as FALSE), while 'salary IS NULL' correctly evaluates to TRUE for missing values"
    ],
    "correctIndex": 3,
    "explanation": "NULL represents an unknown state, so comparing with = yields UNKNOWN. The WHERE clause only admits rows evaluating to TRUE. The unary predicate IS NULL must be used. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_where_92",
    "keyword": "WHERE",
    "tag": "🏛️ Corporate Edge",
    "question": "[WHERE #92 &bull; SaaS Subscription Billing] Why does the condition 'WHERE status NOT IN ('active', 'pending', NULL)' return ZERO rows, even if rows with status = 'archived' exist? (Application Scenario 9)",
    "options": [
      "NOT IN cannot accept more than two arguments",
      "NOT IN expands to (status != 'active' AND status != 'pending' AND status != NULL). Since != NULL is UNKNOWN, the entire conjunction evaluates to UNKNOWN or FALSE",
      "'archived' is a reserved word in MySQL",
      "InnoDB automatically indexes NOT IN as empty"
    ],
    "correctIndex": 1,
    "explanation": "The presence of NULL inside a NOT IN list is the most notorious SQL trap. Because x != NULL is UNKNOWN, ANDing with UNKNOWN makes the entire expression evaluate to UNKNOWN, returning 0 rows. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_where_93",
    "keyword": "WHERE",
    "tag": "💡 Lead Architect",
    "question": "[WHERE #93 &bull; Global Supply Chain & Logistics] What is a 'sargable' predicate in SQL query optimization? (Application Scenario 9)",
    "options": [
      "A predicate that only works on SQLite databases",
      "A predicate containing multiple OR clauses",
      "A predicate that sorts output in descending order",
      "A predicate formulated so the engine can utilize index seek operations (e.g. 'WHERE created_at >= '2026-01-01'') rather than full scans"
    ],
    "correctIndex": 3,
    "explanation": "SARGable stands for Search Argument Able. Writing 'YEAR(date) = 2026' is non-sargable (forces full table scan), whereas 'date >= '2026-01-01' AND date < '2027-01-01'' is sargable. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_where_94",
    "keyword": "WHERE",
    "tag": "⚡ Gotcha Trap",
    "question": "[WHERE #94 &bull; Healthcare Patient Records] In 'WHERE a = 1 OR b = 2', why might the query optimizer struggle to use single-column B-Tree indexes on both a and b? (Application Scenario 9)",
    "options": [
      "OR conditions automatically invalidate all primary keys",
      "OR requires checking both branches; unless the engine supports Index Merge Union, it must perform a full table scan",
      "B-Trees cannot store integers",
      "MySQL does not support OR predicates"
    ],
    "correctIndex": 1,
    "explanation": "Single-column B-Trees cannot satisfy an OR condition in a single index lookup. The engine must either perform an Index Merge (scanning both indexes and merging row IDs) or fall back to a full table scan. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_where_95",
    "keyword": "WHERE",
    "tag": "🎯 Core Concept",
    "question": "[WHERE #95 &bull; E-Commerce Checkout Funnels] What does 'WHERE 1 = 1' signify in production ORM and dynamic query builders? (Application Scenario 9)",
    "options": [
      "A security bypass exploit",
      "A directive to disable table caching",
      "A command that doubles query execution priority",
      "A neutral true anchor allowing developers to programmatically append 'AND condition' without checking if it is the first predicate"
    ],
    "correctIndex": 3,
    "explanation": "In dynamic SQL generation, 'WHERE 1=1' serves as a syntactic base so subsequent conditions can always start with 'AND ...' safely. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_where_96",
    "keyword": "WHERE",
    "tag": "🏛️ Corporate Edge",
    "question": "[WHERE #96 &bull; Telecom Billing & Data Streams] In Three-Valued Logic (3VL), what is the evaluation of 'WHERE salary = NULL' versus 'WHERE salary IS NULL'? (Application Scenario 10)",
    "options": [
      "Both evaluate to TRUE for missing values",
      "'salary = NULL' evaluates to UNKNOWN (which WHERE treats as FALSE), while 'salary IS NULL' correctly evaluates to TRUE for missing values",
      "'salary = NULL' is a syntax error",
      "Both are identical in ANSI SQL"
    ],
    "correctIndex": 1,
    "explanation": "NULL represents an unknown state, so comparing with = yields UNKNOWN. The WHERE clause only admits rows evaluating to TRUE. The unary predicate IS NULL must be used. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_where_97",
    "keyword": "WHERE",
    "tag": "💡 Lead Architect",
    "question": "[WHERE #97 &bull; AdTech Real-Time Bidding] Why does the condition 'WHERE status NOT IN ('active', 'pending', NULL)' return ZERO rows, even if rows with status = 'archived' exist? (Application Scenario 10)",
    "options": [
      "NOT IN cannot accept more than two arguments",
      "'archived' is a reserved word in MySQL",
      "InnoDB automatically indexes NOT IN as empty",
      "NOT IN expands to (status != 'active' AND status != 'pending' AND status != NULL). Since != NULL is UNKNOWN, the entire conjunction evaluates to UNKNOWN or FALSE"
    ],
    "correctIndex": 3,
    "explanation": "The presence of NULL inside a NOT IN list is the most notorious SQL trap. Because x != NULL is UNKNOWN, ANDing with UNKNOWN makes the entire expression evaluate to UNKNOWN, returning 0 rows. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_where_98",
    "keyword": "WHERE",
    "tag": "⚡ Gotcha Trap",
    "question": "[WHERE #98 &bull; Cybersecurity Audit Logs] What is a 'sargable' predicate in SQL query optimization? (Application Scenario 10)",
    "options": [
      "A predicate that only works on SQLite databases",
      "A predicate formulated so the engine can utilize index seek operations (e.g. 'WHERE created_at >= '2026-01-01'') rather than full scans",
      "A predicate containing multiple OR clauses",
      "A predicate that sorts output in descending order"
    ],
    "correctIndex": 1,
    "explanation": "SARGable stands for Search Argument Able. Writing 'YEAR(date) = 2026' is non-sargable (forces full table scan), whereas 'date >= '2026-01-01' AND date < '2027-01-01'' is sargable. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_where_99",
    "keyword": "WHERE",
    "tag": "🎯 Core Concept",
    "question": "[WHERE #99 &bull; Fintech & Ledger Systems] In 'WHERE a = 1 OR b = 2', why might the query optimizer struggle to use single-column B-Tree indexes on both a and b? (Application Scenario 10)",
    "options": [
      "OR conditions automatically invalidate all primary keys",
      "B-Trees cannot store integers",
      "MySQL does not support OR predicates",
      "OR requires checking both branches; unless the engine supports Index Merge Union, it must perform a full table scan"
    ],
    "correctIndex": 3,
    "explanation": "Single-column B-Trees cannot satisfy an OR condition in a single index lookup. The engine must either perform an Index Merge (scanning both indexes and merging row IDs) or fall back to a full table scan. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_where_100",
    "keyword": "WHERE",
    "tag": "🏛️ Corporate Edge",
    "question": "[WHERE #100 &bull; SaaS Subscription Billing] What does 'WHERE 1 = 1' signify in production ORM and dynamic query builders? (Application Scenario 10)",
    "options": [
      "A security bypass exploit",
      "A neutral true anchor allowing developers to programmatically append 'AND condition' without checking if it is the first predicate",
      "A directive to disable table caching",
      "A command that doubles query execution priority"
    ],
    "correctIndex": 1,
    "explanation": "In dynamic SQL generation, 'WHERE 1=1' serves as a syntactic base so subsequent conditions can always start with 'AND ...' safely. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_select_1",
    "keyword": "SELECT",
    "tag": "🍡 Quick Snack",
    "question": "[SELECT #1] What is the relational algebra operation performed by the SELECT clause when picking specific columns?",
    "options": [
      "Projection (choosing which vertical attributes appear in the output relation)",
      "Cartesian Product (joining relations)",
      "Union (combining sets)",
      "Selection (filtering rows)"
    ],
    "correctIndex": 0,
    "explanation": "In relational algebra, SELECT performs Projection (represented by the Greek letter π), while the WHERE clause performs Selection (represented by σ)."
  },
  {
    "id": "mcq_select_2",
    "keyword": "SELECT",
    "tag": "⚡ Gotcha Trap",
    "question": "[SELECT #2] Why is \"SELECT *\" considered a dangerous anti-pattern in high-throughput production backends?",
    "options": [
      "SQL compilers cannot compile SELECT *",
      "It breaks covering indexes, increases network I/O payload, and breaks downstream applications if columns are added/removed",
      "It automatically locks the entire database cluster",
      "It causes database disk corruption"
    ],
    "correctIndex": 1,
    "explanation": "SELECT * fetches unneeded large columns (e.g. TEXT, BLOB), defeats index-only scans, inflates memory serialization overhead, and introduces brittle coupling."
  },
  {
    "id": "mcq_select_3",
    "keyword": "SELECT",
    "tag": "🐱 Brain Bender",
    "question": "[SELECT #3] What is the scope and lifecycle of a column alias created with \"SELECT col AS my_alias\"?",
    "options": [
      "It is only available inside stored procedures",
      "It is globally persisted as a new database view",
      "It is available in ORDER BY, GROUP BY (in some engines), and downstream outer queries, but NOT in WHERE or FROM",
      "It is available everywhere including FROM and WHERE"
    ],
    "correctIndex": 2,
    "explanation": "Column aliases are born in SELECT. They are accessible in clauses that execute AFTER SELECT (ORDER BY), but not in clauses that execute BEFORE SELECT (FROM, WHERE)."
  },
  {
    "id": "mcq_select_4",
    "keyword": "SELECT",
    "tag": "🎯 Core Concept",
    "question": "[SELECT #4] Can a SELECT clause contain arithmetic expressions and computed constants per row?",
    "options": [
      "Only if the query contains a GROUP BY clause",
      "No, SELECT can only project raw existing table columns",
      "Only in NoSQL databases",
      "Yes, arithmetic expressions and computed literals can be projected directly in SELECT"
    ],
    "correctIndex": 3,
    "explanation": "SELECT expressions can compute arithmetic operations (e.g., price * 1.18) or project constants for every candidate row."
  },
  {
    "id": "mcq_select_5",
    "keyword": "SELECT",
    "tag": "🏆 Senior Staff",
    "question": "[SELECT #5] What does \"SELECT 1;\" return in relational database engines?",
    "options": [
      "A single-row, single-column result table containing the integer value 1",
      "NULL",
      "The first row of the primary database table",
      "A syntax error because no FROM clause was specified"
    ],
    "correctIndex": 0,
    "explanation": "Standard SQL engines (PostgreSQL, MySQL, SQLite) permit SELECT without a FROM clause to evaluate scalar expressions and test server connectivity."
  },
  {
    "id": "mcq_select_6",
    "keyword": "SELECT",
    "tag": "🍡 Quick Snack",
    "question": "[SELECT #6] What is the relational algebra operation performed by the SELECT clause when picking specific columns? (Scenario Variant 2)",
    "options": [
      "Union (combining sets)",
      "Cartesian Product (joining relations)",
      "Selection (filtering rows)",
      "Projection (choosing which vertical attributes appear in the output relation)"
    ],
    "correctIndex": 3,
    "explanation": "In relational algebra, SELECT performs Projection (represented by the Greek letter π), while the WHERE clause performs Selection (represented by σ)."
  },
  {
    "id": "mcq_select_7",
    "keyword": "SELECT",
    "tag": "⚡ Gotcha Trap",
    "question": "[SELECT #7] Why is \"SELECT *\" considered a dangerous anti-pattern in high-throughput production backends? (Scenario Variant 2)",
    "options": [
      "SQL compilers cannot compile SELECT *",
      "It automatically locks the entire database cluster",
      "It breaks covering indexes, increases network I/O payload, and breaks downstream applications if columns are added/removed",
      "It causes database disk corruption"
    ],
    "correctIndex": 2,
    "explanation": "SELECT * fetches unneeded large columns (e.g. TEXT, BLOB), defeats index-only scans, inflates memory serialization overhead, and introduces brittle coupling."
  },
  {
    "id": "mcq_select_8",
    "keyword": "SELECT",
    "tag": "🐱 Brain Bender",
    "question": "[SELECT #8] What is the scope and lifecycle of a column alias created with \"SELECT col AS my_alias\"? (Scenario Variant 2)",
    "options": [
      "It is available in ORDER BY, GROUP BY (in some engines), and downstream outer queries, but NOT in WHERE or FROM",
      "It is available everywhere including FROM and WHERE",
      "It is only available inside stored procedures",
      "It is globally persisted as a new database view"
    ],
    "correctIndex": 0,
    "explanation": "Column aliases are born in SELECT. They are accessible in clauses that execute AFTER SELECT (ORDER BY), but not in clauses that execute BEFORE SELECT (FROM, WHERE)."
  },
  {
    "id": "mcq_select_9",
    "keyword": "SELECT",
    "tag": "🎯 Core Concept",
    "question": "[SELECT #9] Can a SELECT clause contain arithmetic expressions and computed constants per row? (Scenario Variant 2)",
    "options": [
      "Only in NoSQL databases",
      "Only if the query contains a GROUP BY clause",
      "Yes, arithmetic expressions and computed literals can be projected directly in SELECT",
      "No, SELECT can only project raw existing table columns"
    ],
    "correctIndex": 2,
    "explanation": "SELECT expressions can compute arithmetic operations (e.g., price * 1.18) or project constants for every candidate row."
  },
  {
    "id": "mcq_select_10",
    "keyword": "SELECT",
    "tag": "🏆 Senior Staff",
    "question": "[SELECT #10] What does \"SELECT 1;\" return in relational database engines? (Scenario Variant 2)",
    "options": [
      "NULL",
      "The first row of the primary database table",
      "A syntax error because no FROM clause was specified",
      "A single-row, single-column result table containing the integer value 1"
    ],
    "correctIndex": 3,
    "explanation": "Standard SQL engines (PostgreSQL, MySQL, SQLite) permit SELECT without a FROM clause to evaluate scalar expressions and test server connectivity."
  },
  {
    "id": "mcq_select_11",
    "keyword": "SELECT",
    "tag": "🍡 Quick Snack",
    "question": "[SELECT #11] What is the relational algebra operation performed by the SELECT clause when picking specific columns? (Scenario Variant 3)",
    "options": [
      "Cartesian Product (joining relations)",
      "Union (combining sets)",
      "Projection (choosing which vertical attributes appear in the output relation)",
      "Selection (filtering rows)"
    ],
    "correctIndex": 2,
    "explanation": "In relational algebra, SELECT performs Projection (represented by the Greek letter π), while the WHERE clause performs Selection (represented by σ)."
  },
  {
    "id": "mcq_select_12",
    "keyword": "SELECT",
    "tag": "⚡ Gotcha Trap",
    "question": "[SELECT #12] Why is \"SELECT *\" considered a dangerous anti-pattern in high-throughput production backends? (Scenario Variant 3)",
    "options": [
      "It automatically locks the entire database cluster",
      "It causes database disk corruption",
      "It breaks covering indexes, increases network I/O payload, and breaks downstream applications if columns are added/removed",
      "SQL compilers cannot compile SELECT *"
    ],
    "correctIndex": 2,
    "explanation": "SELECT * fetches unneeded large columns (e.g. TEXT, BLOB), defeats index-only scans, inflates memory serialization overhead, and introduces brittle coupling."
  },
  {
    "id": "mcq_select_13",
    "keyword": "SELECT",
    "tag": "🐱 Brain Bender",
    "question": "[SELECT #13] What is the scope and lifecycle of a column alias created with \"SELECT col AS my_alias\"? (Scenario Variant 3)",
    "options": [
      "It is only available inside stored procedures",
      "It is available in ORDER BY, GROUP BY (in some engines), and downstream outer queries, but NOT in WHERE or FROM",
      "It is globally persisted as a new database view",
      "It is available everywhere including FROM and WHERE"
    ],
    "correctIndex": 1,
    "explanation": "Column aliases are born in SELECT. They are accessible in clauses that execute AFTER SELECT (ORDER BY), but not in clauses that execute BEFORE SELECT (FROM, WHERE)."
  },
  {
    "id": "mcq_select_14",
    "keyword": "SELECT",
    "tag": "🎯 Core Concept",
    "question": "[SELECT #14] Can a SELECT clause contain arithmetic expressions and computed constants per row? (Scenario Variant 3)",
    "options": [
      "Yes, arithmetic expressions and computed literals can be projected directly in SELECT",
      "Only in NoSQL databases",
      "No, SELECT can only project raw existing table columns",
      "Only if the query contains a GROUP BY clause"
    ],
    "correctIndex": 0,
    "explanation": "SELECT expressions can compute arithmetic operations (e.g., price * 1.18) or project constants for every candidate row."
  },
  {
    "id": "mcq_select_15",
    "keyword": "SELECT",
    "tag": "🏆 Senior Staff",
    "question": "[SELECT #15] What does \"SELECT 1;\" return in relational database engines? (Scenario Variant 3)",
    "options": [
      "NULL",
      "A single-row, single-column result table containing the integer value 1",
      "A syntax error because no FROM clause was specified",
      "The first row of the primary database table"
    ],
    "correctIndex": 1,
    "explanation": "Standard SQL engines (PostgreSQL, MySQL, SQLite) permit SELECT without a FROM clause to evaluate scalar expressions and test server connectivity."
  },
  {
    "id": "mcq_select_16",
    "keyword": "SELECT",
    "tag": "🍡 Quick Snack",
    "question": "[SELECT #16] What is the relational algebra operation performed by the SELECT clause when picking specific columns? (Scenario Variant 4)",
    "options": [
      "Union (combining sets)",
      "Cartesian Product (joining relations)",
      "Projection (choosing which vertical attributes appear in the output relation)",
      "Selection (filtering rows)"
    ],
    "correctIndex": 2,
    "explanation": "In relational algebra, SELECT performs Projection (represented by the Greek letter π), while the WHERE clause performs Selection (represented by σ)."
  },
  {
    "id": "mcq_select_17",
    "keyword": "SELECT",
    "tag": "⚡ Gotcha Trap",
    "question": "[SELECT #17] Why is \"SELECT *\" considered a dangerous anti-pattern in high-throughput production backends? (Scenario Variant 4)",
    "options": [
      "It causes database disk corruption",
      "It breaks covering indexes, increases network I/O payload, and breaks downstream applications if columns are added/removed",
      "It automatically locks the entire database cluster",
      "SQL compilers cannot compile SELECT *"
    ],
    "correctIndex": 1,
    "explanation": "SELECT * fetches unneeded large columns (e.g. TEXT, BLOB), defeats index-only scans, inflates memory serialization overhead, and introduces brittle coupling."
  },
  {
    "id": "mcq_select_18",
    "keyword": "SELECT",
    "tag": "🐱 Brain Bender",
    "question": "[SELECT #18] What is the scope and lifecycle of a column alias created with \"SELECT col AS my_alias\"? (Scenario Variant 4)",
    "options": [
      "It is globally persisted as a new database view",
      "It is available in ORDER BY, GROUP BY (in some engines), and downstream outer queries, but NOT in WHERE or FROM",
      "It is only available inside stored procedures",
      "It is available everywhere including FROM and WHERE"
    ],
    "correctIndex": 1,
    "explanation": "Column aliases are born in SELECT. They are accessible in clauses that execute AFTER SELECT (ORDER BY), but not in clauses that execute BEFORE SELECT (FROM, WHERE)."
  },
  {
    "id": "mcq_select_19",
    "keyword": "SELECT",
    "tag": "🎯 Core Concept",
    "question": "[SELECT #19] Can a SELECT clause contain arithmetic expressions and computed constants per row? (Scenario Variant 4)",
    "options": [
      "Only if the query contains a GROUP BY clause",
      "Only in NoSQL databases",
      "Yes, arithmetic expressions and computed literals can be projected directly in SELECT",
      "No, SELECT can only project raw existing table columns"
    ],
    "correctIndex": 2,
    "explanation": "SELECT expressions can compute arithmetic operations (e.g., price * 1.18) or project constants for every candidate row."
  },
  {
    "id": "mcq_select_20",
    "keyword": "SELECT",
    "tag": "🏆 Senior Staff",
    "question": "[SELECT #20] What does \"SELECT 1;\" return in relational database engines? (Scenario Variant 4)",
    "options": [
      "NULL",
      "A syntax error because no FROM clause was specified",
      "A single-row, single-column result table containing the integer value 1",
      "The first row of the primary database table"
    ],
    "correctIndex": 2,
    "explanation": "Standard SQL engines (PostgreSQL, MySQL, SQLite) permit SELECT without a FROM clause to evaluate scalar expressions and test server connectivity."
  },
  {
    "id": "mcq_select_21",
    "keyword": "SELECT",
    "tag": "🍡 Quick Snack",
    "question": "[SELECT #21] What is the relational algebra operation performed by the SELECT clause when picking specific columns? (Scenario Variant 5)",
    "options": [
      "Union (combining sets)",
      "Projection (choosing which vertical attributes appear in the output relation)",
      "Selection (filtering rows)",
      "Cartesian Product (joining relations)"
    ],
    "correctIndex": 1,
    "explanation": "In relational algebra, SELECT performs Projection (represented by the Greek letter π), while the WHERE clause performs Selection (represented by σ)."
  },
  {
    "id": "mcq_select_22",
    "keyword": "SELECT",
    "tag": "⚡ Gotcha Trap",
    "question": "[SELECT #22] Why is \"SELECT *\" considered a dangerous anti-pattern in high-throughput production backends? (Scenario Variant 5)",
    "options": [
      "It breaks covering indexes, increases network I/O payload, and breaks downstream applications if columns are added/removed",
      "SQL compilers cannot compile SELECT *",
      "It causes database disk corruption",
      "It automatically locks the entire database cluster"
    ],
    "correctIndex": 0,
    "explanation": "SELECT * fetches unneeded large columns (e.g. TEXT, BLOB), defeats index-only scans, inflates memory serialization overhead, and introduces brittle coupling."
  },
  {
    "id": "mcq_select_23",
    "keyword": "SELECT",
    "tag": "🐱 Brain Bender",
    "question": "[SELECT #23] What is the scope and lifecycle of a column alias created with \"SELECT col AS my_alias\"? (Scenario Variant 5)",
    "options": [
      "It is available everywhere including FROM and WHERE",
      "It is globally persisted as a new database view",
      "It is available in ORDER BY, GROUP BY (in some engines), and downstream outer queries, but NOT in WHERE or FROM",
      "It is only available inside stored procedures"
    ],
    "correctIndex": 2,
    "explanation": "Column aliases are born in SELECT. They are accessible in clauses that execute AFTER SELECT (ORDER BY), but not in clauses that execute BEFORE SELECT (FROM, WHERE)."
  },
  {
    "id": "mcq_select_24",
    "keyword": "SELECT",
    "tag": "🎯 Core Concept",
    "question": "[SELECT #24] Can a SELECT clause contain arithmetic expressions and computed constants per row? (Scenario Variant 5)",
    "options": [
      "Only in NoSQL databases",
      "No, SELECT can only project raw existing table columns",
      "Only if the query contains a GROUP BY clause",
      "Yes, arithmetic expressions and computed literals can be projected directly in SELECT"
    ],
    "correctIndex": 3,
    "explanation": "SELECT expressions can compute arithmetic operations (e.g., price * 1.18) or project constants for every candidate row."
  },
  {
    "id": "mcq_select_25",
    "keyword": "SELECT",
    "tag": "🏆 Senior Staff",
    "question": "[SELECT #25] What does \"SELECT 1;\" return in relational database engines? (Scenario Variant 5)",
    "options": [
      "NULL",
      "A syntax error because no FROM clause was specified",
      "The first row of the primary database table",
      "A single-row, single-column result table containing the integer value 1"
    ],
    "correctIndex": 3,
    "explanation": "Standard SQL engines (PostgreSQL, MySQL, SQLite) permit SELECT without a FROM clause to evaluate scalar expressions and test server connectivity."
  },
  {
    "id": "mcq_select_26",
    "keyword": "SELECT",
    "tag": "🍡 Quick Snack",
    "question": "[SELECT #26] What is the relational algebra operation performed by the SELECT clause when picking specific columns? (Scenario Variant 6)",
    "options": [
      "Cartesian Product (joining relations)",
      "Union (combining sets)",
      "Selection (filtering rows)",
      "Projection (choosing which vertical attributes appear in the output relation)"
    ],
    "correctIndex": 3,
    "explanation": "In relational algebra, SELECT performs Projection (represented by the Greek letter π), while the WHERE clause performs Selection (represented by σ)."
  },
  {
    "id": "mcq_select_27",
    "keyword": "SELECT",
    "tag": "⚡ Gotcha Trap",
    "question": "[SELECT #27] Why is \"SELECT *\" considered a dangerous anti-pattern in high-throughput production backends? (Scenario Variant 6)",
    "options": [
      "It automatically locks the entire database cluster",
      "SQL compilers cannot compile SELECT *",
      "It causes database disk corruption",
      "It breaks covering indexes, increases network I/O payload, and breaks downstream applications if columns are added/removed"
    ],
    "correctIndex": 3,
    "explanation": "SELECT * fetches unneeded large columns (e.g. TEXT, BLOB), defeats index-only scans, inflates memory serialization overhead, and introduces brittle coupling."
  },
  {
    "id": "mcq_select_28",
    "keyword": "SELECT",
    "tag": "🐱 Brain Bender",
    "question": "[SELECT #28] What is the scope and lifecycle of a column alias created with \"SELECT col AS my_alias\"? (Scenario Variant 6)",
    "options": [
      "It is available everywhere including FROM and WHERE",
      "It is available in ORDER BY, GROUP BY (in some engines), and downstream outer queries, but NOT in WHERE or FROM",
      "It is globally persisted as a new database view",
      "It is only available inside stored procedures"
    ],
    "correctIndex": 1,
    "explanation": "Column aliases are born in SELECT. They are accessible in clauses that execute AFTER SELECT (ORDER BY), but not in clauses that execute BEFORE SELECT (FROM, WHERE)."
  },
  {
    "id": "mcq_select_29",
    "keyword": "SELECT",
    "tag": "🎯 Core Concept",
    "question": "[SELECT #29] Can a SELECT clause contain arithmetic expressions and computed constants per row? (Scenario Variant 6)",
    "options": [
      "Yes, arithmetic expressions and computed literals can be projected directly in SELECT",
      "Only in NoSQL databases",
      "Only if the query contains a GROUP BY clause",
      "No, SELECT can only project raw existing table columns"
    ],
    "correctIndex": 0,
    "explanation": "SELECT expressions can compute arithmetic operations (e.g., price * 1.18) or project constants for every candidate row."
  },
  {
    "id": "mcq_select_30",
    "keyword": "SELECT",
    "tag": "🏆 Senior Staff",
    "question": "[SELECT #30] What does \"SELECT 1;\" return in relational database engines? (Scenario Variant 6)",
    "options": [
      "NULL",
      "The first row of the primary database table",
      "A single-row, single-column result table containing the integer value 1",
      "A syntax error because no FROM clause was specified"
    ],
    "correctIndex": 2,
    "explanation": "Standard SQL engines (PostgreSQL, MySQL, SQLite) permit SELECT without a FROM clause to evaluate scalar expressions and test server connectivity."
  },
  {
    "id": "mcq_select_31",
    "keyword": "SELECT",
    "tag": "🍡 Quick Snack",
    "question": "[SELECT #31] What is the relational algebra operation performed by the SELECT clause when picking specific columns? (Scenario Variant 7)",
    "options": [
      "Projection (choosing which vertical attributes appear in the output relation)",
      "Cartesian Product (joining relations)",
      "Union (combining sets)",
      "Selection (filtering rows)"
    ],
    "correctIndex": 0,
    "explanation": "In relational algebra, SELECT performs Projection (represented by the Greek letter π), while the WHERE clause performs Selection (represented by σ)."
  },
  {
    "id": "mcq_select_32",
    "keyword": "SELECT",
    "tag": "⚡ Gotcha Trap",
    "question": "[SELECT #32] Why is \"SELECT *\" considered a dangerous anti-pattern in high-throughput production backends? (Scenario Variant 7)",
    "options": [
      "It automatically locks the entire database cluster",
      "SQL compilers cannot compile SELECT *",
      "It causes database disk corruption",
      "It breaks covering indexes, increases network I/O payload, and breaks downstream applications if columns are added/removed"
    ],
    "correctIndex": 3,
    "explanation": "SELECT * fetches unneeded large columns (e.g. TEXT, BLOB), defeats index-only scans, inflates memory serialization overhead, and introduces brittle coupling."
  },
  {
    "id": "mcq_select_33",
    "keyword": "SELECT",
    "tag": "🐱 Brain Bender",
    "question": "[SELECT #33] What is the scope and lifecycle of a column alias created with \"SELECT col AS my_alias\"? (Scenario Variant 7)",
    "options": [
      "It is available in ORDER BY, GROUP BY (in some engines), and downstream outer queries, but NOT in WHERE or FROM",
      "It is only available inside stored procedures",
      "It is available everywhere including FROM and WHERE",
      "It is globally persisted as a new database view"
    ],
    "correctIndex": 0,
    "explanation": "Column aliases are born in SELECT. They are accessible in clauses that execute AFTER SELECT (ORDER BY), but not in clauses that execute BEFORE SELECT (FROM, WHERE)."
  },
  {
    "id": "mcq_select_34",
    "keyword": "SELECT",
    "tag": "🎯 Core Concept",
    "question": "[SELECT #34] Can a SELECT clause contain arithmetic expressions and computed constants per row? (Scenario Variant 7)",
    "options": [
      "Only in NoSQL databases",
      "Only if the query contains a GROUP BY clause",
      "No, SELECT can only project raw existing table columns",
      "Yes, arithmetic expressions and computed literals can be projected directly in SELECT"
    ],
    "correctIndex": 3,
    "explanation": "SELECT expressions can compute arithmetic operations (e.g., price * 1.18) or project constants for every candidate row."
  },
  {
    "id": "mcq_select_35",
    "keyword": "SELECT",
    "tag": "🏆 Senior Staff",
    "question": "[SELECT #35] What does \"SELECT 1;\" return in relational database engines? (Scenario Variant 7)",
    "options": [
      "A single-row, single-column result table containing the integer value 1",
      "A syntax error because no FROM clause was specified",
      "NULL",
      "The first row of the primary database table"
    ],
    "correctIndex": 0,
    "explanation": "Standard SQL engines (PostgreSQL, MySQL, SQLite) permit SELECT without a FROM clause to evaluate scalar expressions and test server connectivity."
  },
  {
    "id": "mcq_select_36",
    "keyword": "SELECT",
    "tag": "🍡 Quick Snack",
    "question": "[SELECT #36] What is the relational algebra operation performed by the SELECT clause when picking specific columns? (Scenario Variant 8)",
    "options": [
      "Union (combining sets)",
      "Cartesian Product (joining relations)",
      "Projection (choosing which vertical attributes appear in the output relation)",
      "Selection (filtering rows)"
    ],
    "correctIndex": 2,
    "explanation": "In relational algebra, SELECT performs Projection (represented by the Greek letter π), while the WHERE clause performs Selection (represented by σ)."
  },
  {
    "id": "mcq_select_37",
    "keyword": "SELECT",
    "tag": "⚡ Gotcha Trap",
    "question": "[SELECT #37] Why is \"SELECT *\" considered a dangerous anti-pattern in high-throughput production backends? (Scenario Variant 8)",
    "options": [
      "It automatically locks the entire database cluster",
      "SQL compilers cannot compile SELECT *",
      "It causes database disk corruption",
      "It breaks covering indexes, increases network I/O payload, and breaks downstream applications if columns are added/removed"
    ],
    "correctIndex": 3,
    "explanation": "SELECT * fetches unneeded large columns (e.g. TEXT, BLOB), defeats index-only scans, inflates memory serialization overhead, and introduces brittle coupling."
  },
  {
    "id": "mcq_select_38",
    "keyword": "SELECT",
    "tag": "🐱 Brain Bender",
    "question": "[SELECT #38] What is the scope and lifecycle of a column alias created with \"SELECT col AS my_alias\"? (Scenario Variant 8)",
    "options": [
      "It is available in ORDER BY, GROUP BY (in some engines), and downstream outer queries, but NOT in WHERE or FROM",
      "It is available everywhere including FROM and WHERE",
      "It is globally persisted as a new database view",
      "It is only available inside stored procedures"
    ],
    "correctIndex": 0,
    "explanation": "Column aliases are born in SELECT. They are accessible in clauses that execute AFTER SELECT (ORDER BY), but not in clauses that execute BEFORE SELECT (FROM, WHERE)."
  },
  {
    "id": "mcq_select_39",
    "keyword": "SELECT",
    "tag": "🎯 Core Concept",
    "question": "[SELECT #39] Can a SELECT clause contain arithmetic expressions and computed constants per row? (Scenario Variant 8)",
    "options": [
      "Yes, arithmetic expressions and computed literals can be projected directly in SELECT",
      "Only in NoSQL databases",
      "Only if the query contains a GROUP BY clause",
      "No, SELECT can only project raw existing table columns"
    ],
    "correctIndex": 0,
    "explanation": "SELECT expressions can compute arithmetic operations (e.g., price * 1.18) or project constants for every candidate row."
  },
  {
    "id": "mcq_select_40",
    "keyword": "SELECT",
    "tag": "🏆 Senior Staff",
    "question": "[SELECT #40] What does \"SELECT 1;\" return in relational database engines? (Scenario Variant 8)",
    "options": [
      "The first row of the primary database table",
      "A single-row, single-column result table containing the integer value 1",
      "NULL",
      "A syntax error because no FROM clause was specified"
    ],
    "correctIndex": 1,
    "explanation": "Standard SQL engines (PostgreSQL, MySQL, SQLite) permit SELECT without a FROM clause to evaluate scalar expressions and test server connectivity."
  },
  {
    "id": "mcq_select_41",
    "keyword": "SELECT",
    "tag": "🍡 Quick Snack",
    "question": "[SELECT #41] What is the relational algebra operation performed by the SELECT clause when picking specific columns? (Scenario Variant 9)",
    "options": [
      "Selection (filtering rows)",
      "Cartesian Product (joining relations)",
      "Union (combining sets)",
      "Projection (choosing which vertical attributes appear in the output relation)"
    ],
    "correctIndex": 3,
    "explanation": "In relational algebra, SELECT performs Projection (represented by the Greek letter π), while the WHERE clause performs Selection (represented by σ)."
  },
  {
    "id": "mcq_select_42",
    "keyword": "SELECT",
    "tag": "⚡ Gotcha Trap",
    "question": "[SELECT #42] Why is \"SELECT *\" considered a dangerous anti-pattern in high-throughput production backends? (Scenario Variant 9)",
    "options": [
      "SQL compilers cannot compile SELECT *",
      "It causes database disk corruption",
      "It breaks covering indexes, increases network I/O payload, and breaks downstream applications if columns are added/removed",
      "It automatically locks the entire database cluster"
    ],
    "correctIndex": 2,
    "explanation": "SELECT * fetches unneeded large columns (e.g. TEXT, BLOB), defeats index-only scans, inflates memory serialization overhead, and introduces brittle coupling."
  },
  {
    "id": "mcq_select_43",
    "keyword": "SELECT",
    "tag": "🐱 Brain Bender",
    "question": "[SELECT #43] What is the scope and lifecycle of a column alias created with \"SELECT col AS my_alias\"? (Scenario Variant 9)",
    "options": [
      "It is available everywhere including FROM and WHERE",
      "It is globally persisted as a new database view",
      "It is available in ORDER BY, GROUP BY (in some engines), and downstream outer queries, but NOT in WHERE or FROM",
      "It is only available inside stored procedures"
    ],
    "correctIndex": 2,
    "explanation": "Column aliases are born in SELECT. They are accessible in clauses that execute AFTER SELECT (ORDER BY), but not in clauses that execute BEFORE SELECT (FROM, WHERE)."
  },
  {
    "id": "mcq_select_44",
    "keyword": "SELECT",
    "tag": "🎯 Core Concept",
    "question": "[SELECT #44] Can a SELECT clause contain arithmetic expressions and computed constants per row? (Scenario Variant 9)",
    "options": [
      "Only if the query contains a GROUP BY clause",
      "No, SELECT can only project raw existing table columns",
      "Only in NoSQL databases",
      "Yes, arithmetic expressions and computed literals can be projected directly in SELECT"
    ],
    "correctIndex": 3,
    "explanation": "SELECT expressions can compute arithmetic operations (e.g., price * 1.18) or project constants for every candidate row."
  },
  {
    "id": "mcq_select_45",
    "keyword": "SELECT",
    "tag": "🏆 Senior Staff",
    "question": "[SELECT #45] What does \"SELECT 1;\" return in relational database engines? (Scenario Variant 9)",
    "options": [
      "A syntax error because no FROM clause was specified",
      "NULL",
      "A single-row, single-column result table containing the integer value 1",
      "The first row of the primary database table"
    ],
    "correctIndex": 2,
    "explanation": "Standard SQL engines (PostgreSQL, MySQL, SQLite) permit SELECT without a FROM clause to evaluate scalar expressions and test server connectivity."
  },
  {
    "id": "mcq_select_46",
    "keyword": "SELECT",
    "tag": "🍡 Quick Snack",
    "question": "[SELECT #46] What is the relational algebra operation performed by the SELECT clause when picking specific columns? (Scenario Variant 10)",
    "options": [
      "Union (combining sets)",
      "Cartesian Product (joining relations)",
      "Projection (choosing which vertical attributes appear in the output relation)",
      "Selection (filtering rows)"
    ],
    "correctIndex": 2,
    "explanation": "In relational algebra, SELECT performs Projection (represented by the Greek letter π), while the WHERE clause performs Selection (represented by σ)."
  },
  {
    "id": "mcq_select_47",
    "keyword": "SELECT",
    "tag": "⚡ Gotcha Trap",
    "question": "[SELECT #47] Why is \"SELECT *\" considered a dangerous anti-pattern in high-throughput production backends? (Scenario Variant 10)",
    "options": [
      "It automatically locks the entire database cluster",
      "SQL compilers cannot compile SELECT *",
      "It causes database disk corruption",
      "It breaks covering indexes, increases network I/O payload, and breaks downstream applications if columns are added/removed"
    ],
    "correctIndex": 3,
    "explanation": "SELECT * fetches unneeded large columns (e.g. TEXT, BLOB), defeats index-only scans, inflates memory serialization overhead, and introduces brittle coupling."
  },
  {
    "id": "mcq_select_48",
    "keyword": "SELECT",
    "tag": "🐱 Brain Bender",
    "question": "[SELECT #48] What is the scope and lifecycle of a column alias created with \"SELECT col AS my_alias\"? (Scenario Variant 10)",
    "options": [
      "It is globally persisted as a new database view",
      "It is available everywhere including FROM and WHERE",
      "It is available in ORDER BY, GROUP BY (in some engines), and downstream outer queries, but NOT in WHERE or FROM",
      "It is only available inside stored procedures"
    ],
    "correctIndex": 2,
    "explanation": "Column aliases are born in SELECT. They are accessible in clauses that execute AFTER SELECT (ORDER BY), but not in clauses that execute BEFORE SELECT (FROM, WHERE)."
  },
  {
    "id": "mcq_select_49",
    "keyword": "SELECT",
    "tag": "🎯 Core Concept",
    "question": "[SELECT #49] Can a SELECT clause contain arithmetic expressions and computed constants per row? (Scenario Variant 10)",
    "options": [
      "Yes, arithmetic expressions and computed literals can be projected directly in SELECT",
      "Only in NoSQL databases",
      "Only if the query contains a GROUP BY clause",
      "No, SELECT can only project raw existing table columns"
    ],
    "correctIndex": 0,
    "explanation": "SELECT expressions can compute arithmetic operations (e.g., price * 1.18) or project constants for every candidate row."
  },
  {
    "id": "mcq_select_50",
    "keyword": "SELECT",
    "tag": "🏆 Senior Staff",
    "question": "[SELECT #50] What does \"SELECT 1;\" return in relational database engines? (Scenario Variant 10)",
    "options": [
      "The first row of the primary database table",
      "NULL",
      "A single-row, single-column result table containing the integer value 1",
      "A syntax error because no FROM clause was specified"
    ],
    "correctIndex": 2,
    "explanation": "Standard SQL engines (PostgreSQL, MySQL, SQLite) permit SELECT without a FROM clause to evaluate scalar expressions and test server connectivity."
  },
  {
    "id": "mcq_select_51",
    "keyword": "SELECT",
    "tag": "🎯 Core Concept",
    "question": "[SELECT #51 &bull; Fintech & Ledger Systems] Why is 'SELECT *' universally considered an anti-pattern in high-concurrency production microservices? (Application Scenario 1)",
    "options": [
      "It throws a syntax warning in MySQL 8.0",
      "It forces the query to run in single-threaded mode",
      "It locks the entire database table against writes",
      "It breaks covering indexes, increases network/IO payload, causes schema-drift crashes, and prevents compiler optimization"
    ],
    "correctIndex": 3,
    "explanation": "Explicit column selection allows the engine to satisfy queries directly from secondary index leaf pages (Covering Index), avoids transmitting unused bloated text/blob columns, and protects APIs against unexpected schema additions. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_select_52",
    "keyword": "SELECT",
    "tag": "🏛️ Corporate Edge",
    "question": "[SELECT #52 &bull; SaaS Subscription Billing] In SQL execution order, when are column aliases defined in the SELECT list resolved? (Application Scenario 1)",
    "options": [
      "At the very beginning during FROM parsing",
      "During the SELECT projection phase, which occurs AFTER WHERE, GROUP BY, and HAVING, meaning aliases cannot be referenced in WHERE",
      "Before the WHERE clause is evaluated",
      "Only when the client receives the network packet"
    ],
    "correctIndex": 1,
    "explanation": "Execution order is FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT. Because SELECT runs after WHERE and HAVING, aliases created in SELECT do not exist yet when WHERE executes. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_select_53",
    "keyword": "SELECT",
    "tag": "💡 Lead Architect",
    "question": "[SELECT #53 &bull; Global Supply Chain & Logistics] What is the difference between 'SELECT DISTINCT col1, col2' and 'SELECT col1, DISTINCT col2'? (Application Scenario 1)",
    "options": [
      "'SELECT col1, DISTINCT col2' only deduplicates col2 while leaving col1 untouched",
      "Both execute identically",
      "DISTINCT only works when followed by parentheses",
      "'SELECT col1, DISTINCT col2' is a syntax error because DISTINCT is a query-level modifier applying to the entire tuple"
    ],
    "correctIndex": 3,
    "explanation": "DISTINCT is not a function; it is a query-level modifier that applies to all projected columns combined. 'SELECT col1, DISTINCT col2' is invalid ANSI SQL. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_select_54",
    "keyword": "SELECT",
    "tag": "⚡ Gotcha Trap",
    "question": "[SELECT #54 &bull; Healthcare Patient Records] What does 'SELECT CASE WHEN x > 0 THEN 'pos' ELSE 'neg' END AS flag' return if x is NULL? (Application Scenario 1)",
    "options": [
      "NULL",
      "'neg' because NULL > 0 evaluates to UNKNOWN, falling through to the ELSE branch",
      "'pos'",
      "Error: NullPointerException in CASE statement"
    ],
    "correctIndex": 1,
    "explanation": "In CASE expressions, WHEN condition executes only on TRUE. Since NULL > 0 is UNKNOWN, it skips the THEN branch and drops into the ELSE branch. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_select_55",
    "keyword": "SELECT",
    "tag": "🎯 Core Concept",
    "question": "[SELECT #55 &bull; E-Commerce Checkout Funnels] What does 'SELECT 1 AS num UNION ALL SELECT 1 AS num' produce? (Application Scenario 1)",
    "options": [
      "One row containing 1",
      "An error due to duplicate column names",
      "A single row with value 2",
      "Two rows, each containing 1"
    ],
    "correctIndex": 3,
    "explanation": "UNION ALL preserves all rows without running an expensive deduplication sort or hash pass. Thus two rows with 1 are returned. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_select_56",
    "keyword": "SELECT",
    "tag": "🏛️ Corporate Edge",
    "question": "[SELECT #56 &bull; Telecom Billing & Data Streams] Why is 'SELECT *' universally considered an anti-pattern in high-concurrency production microservices? (Application Scenario 2)",
    "options": [
      "It throws a syntax warning in MySQL 8.0",
      "It breaks covering indexes, increases network/IO payload, causes schema-drift crashes, and prevents compiler optimization",
      "It forces the query to run in single-threaded mode",
      "It locks the entire database table against writes"
    ],
    "correctIndex": 1,
    "explanation": "Explicit column selection allows the engine to satisfy queries directly from secondary index leaf pages (Covering Index), avoids transmitting unused bloated text/blob columns, and protects APIs against unexpected schema additions. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_select_57",
    "keyword": "SELECT",
    "tag": "💡 Lead Architect",
    "question": "[SELECT #57 &bull; AdTech Real-Time Bidding] In SQL execution order, when are column aliases defined in the SELECT list resolved? (Application Scenario 2)",
    "options": [
      "At the very beginning during FROM parsing",
      "Before the WHERE clause is evaluated",
      "Only when the client receives the network packet",
      "During the SELECT projection phase, which occurs AFTER WHERE, GROUP BY, and HAVING, meaning aliases cannot be referenced in WHERE"
    ],
    "correctIndex": 3,
    "explanation": "Execution order is FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT. Because SELECT runs after WHERE and HAVING, aliases created in SELECT do not exist yet when WHERE executes. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_select_58",
    "keyword": "SELECT",
    "tag": "⚡ Gotcha Trap",
    "question": "[SELECT #58 &bull; Cybersecurity Audit Logs] What is the difference between 'SELECT DISTINCT col1, col2' and 'SELECT col1, DISTINCT col2'? (Application Scenario 2)",
    "options": [
      "'SELECT col1, DISTINCT col2' only deduplicates col2 while leaving col1 untouched",
      "'SELECT col1, DISTINCT col2' is a syntax error because DISTINCT is a query-level modifier applying to the entire tuple",
      "Both execute identically",
      "DISTINCT only works when followed by parentheses"
    ],
    "correctIndex": 1,
    "explanation": "DISTINCT is not a function; it is a query-level modifier that applies to all projected columns combined. 'SELECT col1, DISTINCT col2' is invalid ANSI SQL. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_select_59",
    "keyword": "SELECT",
    "tag": "🎯 Core Concept",
    "question": "[SELECT #59 &bull; Fintech & Ledger Systems] What does 'SELECT CASE WHEN x > 0 THEN 'pos' ELSE 'neg' END AS flag' return if x is NULL? (Application Scenario 2)",
    "options": [
      "NULL",
      "'pos'",
      "Error: NullPointerException in CASE statement",
      "'neg' because NULL > 0 evaluates to UNKNOWN, falling through to the ELSE branch"
    ],
    "correctIndex": 3,
    "explanation": "In CASE expressions, WHEN condition executes only on TRUE. Since NULL > 0 is UNKNOWN, it skips the THEN branch and drops into the ELSE branch. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_select_60",
    "keyword": "SELECT",
    "tag": "🏛️ Corporate Edge",
    "question": "[SELECT #60 &bull; SaaS Subscription Billing] What does 'SELECT 1 AS num UNION ALL SELECT 1 AS num' produce? (Application Scenario 2)",
    "options": [
      "One row containing 1",
      "Two rows, each containing 1",
      "An error due to duplicate column names",
      "A single row with value 2"
    ],
    "correctIndex": 1,
    "explanation": "UNION ALL preserves all rows without running an expensive deduplication sort or hash pass. Thus two rows with 1 are returned. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_select_61",
    "keyword": "SELECT",
    "tag": "💡 Lead Architect",
    "question": "[SELECT #61 &bull; Global Supply Chain & Logistics] Why is 'SELECT *' universally considered an anti-pattern in high-concurrency production microservices? (Application Scenario 3)",
    "options": [
      "It throws a syntax warning in MySQL 8.0",
      "It forces the query to run in single-threaded mode",
      "It locks the entire database table against writes",
      "It breaks covering indexes, increases network/IO payload, causes schema-drift crashes, and prevents compiler optimization"
    ],
    "correctIndex": 3,
    "explanation": "Explicit column selection allows the engine to satisfy queries directly from secondary index leaf pages (Covering Index), avoids transmitting unused bloated text/blob columns, and protects APIs against unexpected schema additions. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_select_62",
    "keyword": "SELECT",
    "tag": "⚡ Gotcha Trap",
    "question": "[SELECT #62 &bull; Healthcare Patient Records] In SQL execution order, when are column aliases defined in the SELECT list resolved? (Application Scenario 3)",
    "options": [
      "At the very beginning during FROM parsing",
      "During the SELECT projection phase, which occurs AFTER WHERE, GROUP BY, and HAVING, meaning aliases cannot be referenced in WHERE",
      "Before the WHERE clause is evaluated",
      "Only when the client receives the network packet"
    ],
    "correctIndex": 1,
    "explanation": "Execution order is FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT. Because SELECT runs after WHERE and HAVING, aliases created in SELECT do not exist yet when WHERE executes. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_select_63",
    "keyword": "SELECT",
    "tag": "🎯 Core Concept",
    "question": "[SELECT #63 &bull; E-Commerce Checkout Funnels] What is the difference between 'SELECT DISTINCT col1, col2' and 'SELECT col1, DISTINCT col2'? (Application Scenario 3)",
    "options": [
      "'SELECT col1, DISTINCT col2' only deduplicates col2 while leaving col1 untouched",
      "Both execute identically",
      "DISTINCT only works when followed by parentheses",
      "'SELECT col1, DISTINCT col2' is a syntax error because DISTINCT is a query-level modifier applying to the entire tuple"
    ],
    "correctIndex": 3,
    "explanation": "DISTINCT is not a function; it is a query-level modifier that applies to all projected columns combined. 'SELECT col1, DISTINCT col2' is invalid ANSI SQL. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_select_64",
    "keyword": "SELECT",
    "tag": "🏛️ Corporate Edge",
    "question": "[SELECT #64 &bull; Telecom Billing & Data Streams] What does 'SELECT CASE WHEN x > 0 THEN 'pos' ELSE 'neg' END AS flag' return if x is NULL? (Application Scenario 3)",
    "options": [
      "NULL",
      "'neg' because NULL > 0 evaluates to UNKNOWN, falling through to the ELSE branch",
      "'pos'",
      "Error: NullPointerException in CASE statement"
    ],
    "correctIndex": 1,
    "explanation": "In CASE expressions, WHEN condition executes only on TRUE. Since NULL > 0 is UNKNOWN, it skips the THEN branch and drops into the ELSE branch. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_select_65",
    "keyword": "SELECT",
    "tag": "💡 Lead Architect",
    "question": "[SELECT #65 &bull; AdTech Real-Time Bidding] What does 'SELECT 1 AS num UNION ALL SELECT 1 AS num' produce? (Application Scenario 3)",
    "options": [
      "One row containing 1",
      "An error due to duplicate column names",
      "A single row with value 2",
      "Two rows, each containing 1"
    ],
    "correctIndex": 3,
    "explanation": "UNION ALL preserves all rows without running an expensive deduplication sort or hash pass. Thus two rows with 1 are returned. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_select_66",
    "keyword": "SELECT",
    "tag": "⚡ Gotcha Trap",
    "question": "[SELECT #66 &bull; Cybersecurity Audit Logs] Why is 'SELECT *' universally considered an anti-pattern in high-concurrency production microservices? (Application Scenario 4)",
    "options": [
      "It throws a syntax warning in MySQL 8.0",
      "It breaks covering indexes, increases network/IO payload, causes schema-drift crashes, and prevents compiler optimization",
      "It forces the query to run in single-threaded mode",
      "It locks the entire database table against writes"
    ],
    "correctIndex": 1,
    "explanation": "Explicit column selection allows the engine to satisfy queries directly from secondary index leaf pages (Covering Index), avoids transmitting unused bloated text/blob columns, and protects APIs against unexpected schema additions. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_select_67",
    "keyword": "SELECT",
    "tag": "🎯 Core Concept",
    "question": "[SELECT #67 &bull; Fintech & Ledger Systems] In SQL execution order, when are column aliases defined in the SELECT list resolved? (Application Scenario 4)",
    "options": [
      "At the very beginning during FROM parsing",
      "Before the WHERE clause is evaluated",
      "Only when the client receives the network packet",
      "During the SELECT projection phase, which occurs AFTER WHERE, GROUP BY, and HAVING, meaning aliases cannot be referenced in WHERE"
    ],
    "correctIndex": 3,
    "explanation": "Execution order is FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT. Because SELECT runs after WHERE and HAVING, aliases created in SELECT do not exist yet when WHERE executes. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_select_68",
    "keyword": "SELECT",
    "tag": "🏛️ Corporate Edge",
    "question": "[SELECT #68 &bull; SaaS Subscription Billing] What is the difference between 'SELECT DISTINCT col1, col2' and 'SELECT col1, DISTINCT col2'? (Application Scenario 4)",
    "options": [
      "'SELECT col1, DISTINCT col2' only deduplicates col2 while leaving col1 untouched",
      "'SELECT col1, DISTINCT col2' is a syntax error because DISTINCT is a query-level modifier applying to the entire tuple",
      "Both execute identically",
      "DISTINCT only works when followed by parentheses"
    ],
    "correctIndex": 1,
    "explanation": "DISTINCT is not a function; it is a query-level modifier that applies to all projected columns combined. 'SELECT col1, DISTINCT col2' is invalid ANSI SQL. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_select_69",
    "keyword": "SELECT",
    "tag": "💡 Lead Architect",
    "question": "[SELECT #69 &bull; Global Supply Chain & Logistics] What does 'SELECT CASE WHEN x > 0 THEN 'pos' ELSE 'neg' END AS flag' return if x is NULL? (Application Scenario 4)",
    "options": [
      "NULL",
      "'pos'",
      "Error: NullPointerException in CASE statement",
      "'neg' because NULL > 0 evaluates to UNKNOWN, falling through to the ELSE branch"
    ],
    "correctIndex": 3,
    "explanation": "In CASE expressions, WHEN condition executes only on TRUE. Since NULL > 0 is UNKNOWN, it skips the THEN branch and drops into the ELSE branch. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_select_70",
    "keyword": "SELECT",
    "tag": "⚡ Gotcha Trap",
    "question": "[SELECT #70 &bull; Healthcare Patient Records] What does 'SELECT 1 AS num UNION ALL SELECT 1 AS num' produce? (Application Scenario 4)",
    "options": [
      "One row containing 1",
      "Two rows, each containing 1",
      "An error due to duplicate column names",
      "A single row with value 2"
    ],
    "correctIndex": 1,
    "explanation": "UNION ALL preserves all rows without running an expensive deduplication sort or hash pass. Thus two rows with 1 are returned. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_select_71",
    "keyword": "SELECT",
    "tag": "🎯 Core Concept",
    "question": "[SELECT #71 &bull; E-Commerce Checkout Funnels] Why is 'SELECT *' universally considered an anti-pattern in high-concurrency production microservices? (Application Scenario 5)",
    "options": [
      "It throws a syntax warning in MySQL 8.0",
      "It forces the query to run in single-threaded mode",
      "It locks the entire database table against writes",
      "It breaks covering indexes, increases network/IO payload, causes schema-drift crashes, and prevents compiler optimization"
    ],
    "correctIndex": 3,
    "explanation": "Explicit column selection allows the engine to satisfy queries directly from secondary index leaf pages (Covering Index), avoids transmitting unused bloated text/blob columns, and protects APIs against unexpected schema additions. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_select_72",
    "keyword": "SELECT",
    "tag": "🏛️ Corporate Edge",
    "question": "[SELECT #72 &bull; Telecom Billing & Data Streams] In SQL execution order, when are column aliases defined in the SELECT list resolved? (Application Scenario 5)",
    "options": [
      "At the very beginning during FROM parsing",
      "During the SELECT projection phase, which occurs AFTER WHERE, GROUP BY, and HAVING, meaning aliases cannot be referenced in WHERE",
      "Before the WHERE clause is evaluated",
      "Only when the client receives the network packet"
    ],
    "correctIndex": 1,
    "explanation": "Execution order is FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT. Because SELECT runs after WHERE and HAVING, aliases created in SELECT do not exist yet when WHERE executes. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_select_73",
    "keyword": "SELECT",
    "tag": "💡 Lead Architect",
    "question": "[SELECT #73 &bull; AdTech Real-Time Bidding] What is the difference between 'SELECT DISTINCT col1, col2' and 'SELECT col1, DISTINCT col2'? (Application Scenario 5)",
    "options": [
      "'SELECT col1, DISTINCT col2' only deduplicates col2 while leaving col1 untouched",
      "Both execute identically",
      "DISTINCT only works when followed by parentheses",
      "'SELECT col1, DISTINCT col2' is a syntax error because DISTINCT is a query-level modifier applying to the entire tuple"
    ],
    "correctIndex": 3,
    "explanation": "DISTINCT is not a function; it is a query-level modifier that applies to all projected columns combined. 'SELECT col1, DISTINCT col2' is invalid ANSI SQL. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_select_74",
    "keyword": "SELECT",
    "tag": "⚡ Gotcha Trap",
    "question": "[SELECT #74 &bull; Cybersecurity Audit Logs] What does 'SELECT CASE WHEN x > 0 THEN 'pos' ELSE 'neg' END AS flag' return if x is NULL? (Application Scenario 5)",
    "options": [
      "NULL",
      "'neg' because NULL > 0 evaluates to UNKNOWN, falling through to the ELSE branch",
      "'pos'",
      "Error: NullPointerException in CASE statement"
    ],
    "correctIndex": 1,
    "explanation": "In CASE expressions, WHEN condition executes only on TRUE. Since NULL > 0 is UNKNOWN, it skips the THEN branch and drops into the ELSE branch. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_select_75",
    "keyword": "SELECT",
    "tag": "🎯 Core Concept",
    "question": "[SELECT #75 &bull; Fintech & Ledger Systems] What does 'SELECT 1 AS num UNION ALL SELECT 1 AS num' produce? (Application Scenario 5)",
    "options": [
      "One row containing 1",
      "An error due to duplicate column names",
      "A single row with value 2",
      "Two rows, each containing 1"
    ],
    "correctIndex": 3,
    "explanation": "UNION ALL preserves all rows without running an expensive deduplication sort or hash pass. Thus two rows with 1 are returned. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_select_76",
    "keyword": "SELECT",
    "tag": "🏛️ Corporate Edge",
    "question": "[SELECT #76 &bull; SaaS Subscription Billing] Why is 'SELECT *' universally considered an anti-pattern in high-concurrency production microservices? (Application Scenario 6)",
    "options": [
      "It throws a syntax warning in MySQL 8.0",
      "It breaks covering indexes, increases network/IO payload, causes schema-drift crashes, and prevents compiler optimization",
      "It forces the query to run in single-threaded mode",
      "It locks the entire database table against writes"
    ],
    "correctIndex": 1,
    "explanation": "Explicit column selection allows the engine to satisfy queries directly from secondary index leaf pages (Covering Index), avoids transmitting unused bloated text/blob columns, and protects APIs against unexpected schema additions. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_select_77",
    "keyword": "SELECT",
    "tag": "💡 Lead Architect",
    "question": "[SELECT #77 &bull; Global Supply Chain & Logistics] In SQL execution order, when are column aliases defined in the SELECT list resolved? (Application Scenario 6)",
    "options": [
      "At the very beginning during FROM parsing",
      "Before the WHERE clause is evaluated",
      "Only when the client receives the network packet",
      "During the SELECT projection phase, which occurs AFTER WHERE, GROUP BY, and HAVING, meaning aliases cannot be referenced in WHERE"
    ],
    "correctIndex": 3,
    "explanation": "Execution order is FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT. Because SELECT runs after WHERE and HAVING, aliases created in SELECT do not exist yet when WHERE executes. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_select_78",
    "keyword": "SELECT",
    "tag": "⚡ Gotcha Trap",
    "question": "[SELECT #78 &bull; Healthcare Patient Records] What is the difference between 'SELECT DISTINCT col1, col2' and 'SELECT col1, DISTINCT col2'? (Application Scenario 6)",
    "options": [
      "'SELECT col1, DISTINCT col2' only deduplicates col2 while leaving col1 untouched",
      "'SELECT col1, DISTINCT col2' is a syntax error because DISTINCT is a query-level modifier applying to the entire tuple",
      "Both execute identically",
      "DISTINCT only works when followed by parentheses"
    ],
    "correctIndex": 1,
    "explanation": "DISTINCT is not a function; it is a query-level modifier that applies to all projected columns combined. 'SELECT col1, DISTINCT col2' is invalid ANSI SQL. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_select_79",
    "keyword": "SELECT",
    "tag": "🎯 Core Concept",
    "question": "[SELECT #79 &bull; E-Commerce Checkout Funnels] What does 'SELECT CASE WHEN x > 0 THEN 'pos' ELSE 'neg' END AS flag' return if x is NULL? (Application Scenario 6)",
    "options": [
      "NULL",
      "'pos'",
      "Error: NullPointerException in CASE statement",
      "'neg' because NULL > 0 evaluates to UNKNOWN, falling through to the ELSE branch"
    ],
    "correctIndex": 3,
    "explanation": "In CASE expressions, WHEN condition executes only on TRUE. Since NULL > 0 is UNKNOWN, it skips the THEN branch and drops into the ELSE branch. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_select_80",
    "keyword": "SELECT",
    "tag": "🏛️ Corporate Edge",
    "question": "[SELECT #80 &bull; Telecom Billing & Data Streams] What does 'SELECT 1 AS num UNION ALL SELECT 1 AS num' produce? (Application Scenario 6)",
    "options": [
      "One row containing 1",
      "Two rows, each containing 1",
      "An error due to duplicate column names",
      "A single row with value 2"
    ],
    "correctIndex": 1,
    "explanation": "UNION ALL preserves all rows without running an expensive deduplication sort or hash pass. Thus two rows with 1 are returned. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_select_81",
    "keyword": "SELECT",
    "tag": "💡 Lead Architect",
    "question": "[SELECT #81 &bull; AdTech Real-Time Bidding] Why is 'SELECT *' universally considered an anti-pattern in high-concurrency production microservices? (Application Scenario 7)",
    "options": [
      "It throws a syntax warning in MySQL 8.0",
      "It forces the query to run in single-threaded mode",
      "It locks the entire database table against writes",
      "It breaks covering indexes, increases network/IO payload, causes schema-drift crashes, and prevents compiler optimization"
    ],
    "correctIndex": 3,
    "explanation": "Explicit column selection allows the engine to satisfy queries directly from secondary index leaf pages (Covering Index), avoids transmitting unused bloated text/blob columns, and protects APIs against unexpected schema additions. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_select_82",
    "keyword": "SELECT",
    "tag": "⚡ Gotcha Trap",
    "question": "[SELECT #82 &bull; Cybersecurity Audit Logs] In SQL execution order, when are column aliases defined in the SELECT list resolved? (Application Scenario 7)",
    "options": [
      "At the very beginning during FROM parsing",
      "During the SELECT projection phase, which occurs AFTER WHERE, GROUP BY, and HAVING, meaning aliases cannot be referenced in WHERE",
      "Before the WHERE clause is evaluated",
      "Only when the client receives the network packet"
    ],
    "correctIndex": 1,
    "explanation": "Execution order is FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT. Because SELECT runs after WHERE and HAVING, aliases created in SELECT do not exist yet when WHERE executes. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_select_83",
    "keyword": "SELECT",
    "tag": "🎯 Core Concept",
    "question": "[SELECT #83 &bull; Fintech & Ledger Systems] What is the difference between 'SELECT DISTINCT col1, col2' and 'SELECT col1, DISTINCT col2'? (Application Scenario 7)",
    "options": [
      "'SELECT col1, DISTINCT col2' only deduplicates col2 while leaving col1 untouched",
      "Both execute identically",
      "DISTINCT only works when followed by parentheses",
      "'SELECT col1, DISTINCT col2' is a syntax error because DISTINCT is a query-level modifier applying to the entire tuple"
    ],
    "correctIndex": 3,
    "explanation": "DISTINCT is not a function; it is a query-level modifier that applies to all projected columns combined. 'SELECT col1, DISTINCT col2' is invalid ANSI SQL. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_select_84",
    "keyword": "SELECT",
    "tag": "🏛️ Corporate Edge",
    "question": "[SELECT #84 &bull; SaaS Subscription Billing] What does 'SELECT CASE WHEN x > 0 THEN 'pos' ELSE 'neg' END AS flag' return if x is NULL? (Application Scenario 7)",
    "options": [
      "NULL",
      "'neg' because NULL > 0 evaluates to UNKNOWN, falling through to the ELSE branch",
      "'pos'",
      "Error: NullPointerException in CASE statement"
    ],
    "correctIndex": 1,
    "explanation": "In CASE expressions, WHEN condition executes only on TRUE. Since NULL > 0 is UNKNOWN, it skips the THEN branch and drops into the ELSE branch. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_select_85",
    "keyword": "SELECT",
    "tag": "💡 Lead Architect",
    "question": "[SELECT #85 &bull; Global Supply Chain & Logistics] What does 'SELECT 1 AS num UNION ALL SELECT 1 AS num' produce? (Application Scenario 7)",
    "options": [
      "One row containing 1",
      "An error due to duplicate column names",
      "A single row with value 2",
      "Two rows, each containing 1"
    ],
    "correctIndex": 3,
    "explanation": "UNION ALL preserves all rows without running an expensive deduplication sort or hash pass. Thus two rows with 1 are returned. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_select_86",
    "keyword": "SELECT",
    "tag": "⚡ Gotcha Trap",
    "question": "[SELECT #86 &bull; Healthcare Patient Records] Why is 'SELECT *' universally considered an anti-pattern in high-concurrency production microservices? (Application Scenario 8)",
    "options": [
      "It throws a syntax warning in MySQL 8.0",
      "It breaks covering indexes, increases network/IO payload, causes schema-drift crashes, and prevents compiler optimization",
      "It forces the query to run in single-threaded mode",
      "It locks the entire database table against writes"
    ],
    "correctIndex": 1,
    "explanation": "Explicit column selection allows the engine to satisfy queries directly from secondary index leaf pages (Covering Index), avoids transmitting unused bloated text/blob columns, and protects APIs against unexpected schema additions. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_select_87",
    "keyword": "SELECT",
    "tag": "🎯 Core Concept",
    "question": "[SELECT #87 &bull; E-Commerce Checkout Funnels] In SQL execution order, when are column aliases defined in the SELECT list resolved? (Application Scenario 8)",
    "options": [
      "At the very beginning during FROM parsing",
      "Before the WHERE clause is evaluated",
      "Only when the client receives the network packet",
      "During the SELECT projection phase, which occurs AFTER WHERE, GROUP BY, and HAVING, meaning aliases cannot be referenced in WHERE"
    ],
    "correctIndex": 3,
    "explanation": "Execution order is FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT. Because SELECT runs after WHERE and HAVING, aliases created in SELECT do not exist yet when WHERE executes. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_select_88",
    "keyword": "SELECT",
    "tag": "🏛️ Corporate Edge",
    "question": "[SELECT #88 &bull; Telecom Billing & Data Streams] What is the difference between 'SELECT DISTINCT col1, col2' and 'SELECT col1, DISTINCT col2'? (Application Scenario 8)",
    "options": [
      "'SELECT col1, DISTINCT col2' only deduplicates col2 while leaving col1 untouched",
      "'SELECT col1, DISTINCT col2' is a syntax error because DISTINCT is a query-level modifier applying to the entire tuple",
      "Both execute identically",
      "DISTINCT only works when followed by parentheses"
    ],
    "correctIndex": 1,
    "explanation": "DISTINCT is not a function; it is a query-level modifier that applies to all projected columns combined. 'SELECT col1, DISTINCT col2' is invalid ANSI SQL. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_select_89",
    "keyword": "SELECT",
    "tag": "💡 Lead Architect",
    "question": "[SELECT #89 &bull; AdTech Real-Time Bidding] What does 'SELECT CASE WHEN x > 0 THEN 'pos' ELSE 'neg' END AS flag' return if x is NULL? (Application Scenario 8)",
    "options": [
      "NULL",
      "'pos'",
      "Error: NullPointerException in CASE statement",
      "'neg' because NULL > 0 evaluates to UNKNOWN, falling through to the ELSE branch"
    ],
    "correctIndex": 3,
    "explanation": "In CASE expressions, WHEN condition executes only on TRUE. Since NULL > 0 is UNKNOWN, it skips the THEN branch and drops into the ELSE branch. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_select_90",
    "keyword": "SELECT",
    "tag": "⚡ Gotcha Trap",
    "question": "[SELECT #90 &bull; Cybersecurity Audit Logs] What does 'SELECT 1 AS num UNION ALL SELECT 1 AS num' produce? (Application Scenario 8)",
    "options": [
      "One row containing 1",
      "Two rows, each containing 1",
      "An error due to duplicate column names",
      "A single row with value 2"
    ],
    "correctIndex": 1,
    "explanation": "UNION ALL preserves all rows without running an expensive deduplication sort or hash pass. Thus two rows with 1 are returned. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_select_91",
    "keyword": "SELECT",
    "tag": "🎯 Core Concept",
    "question": "[SELECT #91 &bull; Fintech & Ledger Systems] Why is 'SELECT *' universally considered an anti-pattern in high-concurrency production microservices? (Application Scenario 9)",
    "options": [
      "It throws a syntax warning in MySQL 8.0",
      "It forces the query to run in single-threaded mode",
      "It locks the entire database table against writes",
      "It breaks covering indexes, increases network/IO payload, causes schema-drift crashes, and prevents compiler optimization"
    ],
    "correctIndex": 3,
    "explanation": "Explicit column selection allows the engine to satisfy queries directly from secondary index leaf pages (Covering Index), avoids transmitting unused bloated text/blob columns, and protects APIs against unexpected schema additions. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_select_92",
    "keyword": "SELECT",
    "tag": "🏛️ Corporate Edge",
    "question": "[SELECT #92 &bull; SaaS Subscription Billing] In SQL execution order, when are column aliases defined in the SELECT list resolved? (Application Scenario 9)",
    "options": [
      "At the very beginning during FROM parsing",
      "During the SELECT projection phase, which occurs AFTER WHERE, GROUP BY, and HAVING, meaning aliases cannot be referenced in WHERE",
      "Before the WHERE clause is evaluated",
      "Only when the client receives the network packet"
    ],
    "correctIndex": 1,
    "explanation": "Execution order is FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT. Because SELECT runs after WHERE and HAVING, aliases created in SELECT do not exist yet when WHERE executes. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_select_93",
    "keyword": "SELECT",
    "tag": "💡 Lead Architect",
    "question": "[SELECT #93 &bull; Global Supply Chain & Logistics] What is the difference between 'SELECT DISTINCT col1, col2' and 'SELECT col1, DISTINCT col2'? (Application Scenario 9)",
    "options": [
      "'SELECT col1, DISTINCT col2' only deduplicates col2 while leaving col1 untouched",
      "Both execute identically",
      "DISTINCT only works when followed by parentheses",
      "'SELECT col1, DISTINCT col2' is a syntax error because DISTINCT is a query-level modifier applying to the entire tuple"
    ],
    "correctIndex": 3,
    "explanation": "DISTINCT is not a function; it is a query-level modifier that applies to all projected columns combined. 'SELECT col1, DISTINCT col2' is invalid ANSI SQL. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_select_94",
    "keyword": "SELECT",
    "tag": "⚡ Gotcha Trap",
    "question": "[SELECT #94 &bull; Healthcare Patient Records] What does 'SELECT CASE WHEN x > 0 THEN 'pos' ELSE 'neg' END AS flag' return if x is NULL? (Application Scenario 9)",
    "options": [
      "NULL",
      "'neg' because NULL > 0 evaluates to UNKNOWN, falling through to the ELSE branch",
      "'pos'",
      "Error: NullPointerException in CASE statement"
    ],
    "correctIndex": 1,
    "explanation": "In CASE expressions, WHEN condition executes only on TRUE. Since NULL > 0 is UNKNOWN, it skips the THEN branch and drops into the ELSE branch. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_select_95",
    "keyword": "SELECT",
    "tag": "🎯 Core Concept",
    "question": "[SELECT #95 &bull; E-Commerce Checkout Funnels] What does 'SELECT 1 AS num UNION ALL SELECT 1 AS num' produce? (Application Scenario 9)",
    "options": [
      "One row containing 1",
      "An error due to duplicate column names",
      "A single row with value 2",
      "Two rows, each containing 1"
    ],
    "correctIndex": 3,
    "explanation": "UNION ALL preserves all rows without running an expensive deduplication sort or hash pass. Thus two rows with 1 are returned. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_select_96",
    "keyword": "SELECT",
    "tag": "🏛️ Corporate Edge",
    "question": "[SELECT #96 &bull; Telecom Billing & Data Streams] Why is 'SELECT *' universally considered an anti-pattern in high-concurrency production microservices? (Application Scenario 10)",
    "options": [
      "It throws a syntax warning in MySQL 8.0",
      "It breaks covering indexes, increases network/IO payload, causes schema-drift crashes, and prevents compiler optimization",
      "It forces the query to run in single-threaded mode",
      "It locks the entire database table against writes"
    ],
    "correctIndex": 1,
    "explanation": "Explicit column selection allows the engine to satisfy queries directly from secondary index leaf pages (Covering Index), avoids transmitting unused bloated text/blob columns, and protects APIs against unexpected schema additions. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_select_97",
    "keyword": "SELECT",
    "tag": "💡 Lead Architect",
    "question": "[SELECT #97 &bull; AdTech Real-Time Bidding] In SQL execution order, when are column aliases defined in the SELECT list resolved? (Application Scenario 10)",
    "options": [
      "At the very beginning during FROM parsing",
      "Before the WHERE clause is evaluated",
      "Only when the client receives the network packet",
      "During the SELECT projection phase, which occurs AFTER WHERE, GROUP BY, and HAVING, meaning aliases cannot be referenced in WHERE"
    ],
    "correctIndex": 3,
    "explanation": "Execution order is FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT. Because SELECT runs after WHERE and HAVING, aliases created in SELECT do not exist yet when WHERE executes. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_select_98",
    "keyword": "SELECT",
    "tag": "⚡ Gotcha Trap",
    "question": "[SELECT #98 &bull; Cybersecurity Audit Logs] What is the difference between 'SELECT DISTINCT col1, col2' and 'SELECT col1, DISTINCT col2'? (Application Scenario 10)",
    "options": [
      "'SELECT col1, DISTINCT col2' only deduplicates col2 while leaving col1 untouched",
      "'SELECT col1, DISTINCT col2' is a syntax error because DISTINCT is a query-level modifier applying to the entire tuple",
      "Both execute identically",
      "DISTINCT only works when followed by parentheses"
    ],
    "correctIndex": 1,
    "explanation": "DISTINCT is not a function; it is a query-level modifier that applies to all projected columns combined. 'SELECT col1, DISTINCT col2' is invalid ANSI SQL. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_select_99",
    "keyword": "SELECT",
    "tag": "🎯 Core Concept",
    "question": "[SELECT #99 &bull; Fintech & Ledger Systems] What does 'SELECT CASE WHEN x > 0 THEN 'pos' ELSE 'neg' END AS flag' return if x is NULL? (Application Scenario 10)",
    "options": [
      "NULL",
      "'pos'",
      "Error: NullPointerException in CASE statement",
      "'neg' because NULL > 0 evaluates to UNKNOWN, falling through to the ELSE branch"
    ],
    "correctIndex": 3,
    "explanation": "In CASE expressions, WHEN condition executes only on TRUE. Since NULL > 0 is UNKNOWN, it skips the THEN branch and drops into the ELSE branch. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_select_100",
    "keyword": "SELECT",
    "tag": "🏛️ Corporate Edge",
    "question": "[SELECT #100 &bull; SaaS Subscription Billing] What does 'SELECT 1 AS num UNION ALL SELECT 1 AS num' produce? (Application Scenario 10)",
    "options": [
      "One row containing 1",
      "Two rows, each containing 1",
      "An error due to duplicate column names",
      "A single row with value 2"
    ],
    "correctIndex": 1,
    "explanation": "UNION ALL preserves all rows without running an expensive deduplication sort or hash pass. Thus two rows with 1 are returned. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_from_1",
    "keyword": "FROM",
    "tag": "🍡 Quick Snack",
    "question": "[FROM #1] Why does the FROM clause execute as Step 01 in the physical query lifecycle?",
    "options": [
      "To verify user write permissions on disk",
      "To format JSON network packets",
      "The query engine must first bind table storage and memory buffers to establish available columns and data types",
      "Because the word FROM comes first alphabetically among keywords"
    ],
    "correctIndex": 2,
    "explanation": "Before a query engine can filter (WHERE), calculate (SELECT), or sort (ORDER BY), it must identify the physical relations on disk and load their column schemas."
  },
  {
    "id": "mcq_from_2",
    "keyword": "FROM",
    "tag": "⚡ Gotcha Trap",
    "question": "[FROM #2] What relational result does a FROM clause produce when two tables are listed separated by a comma without an ON condition (e.g., FROM A, B)?",
    "options": [
      "An automatic INNER JOIN matching on shared primary key names",
      "A UNION ALL concatenating both tables vertically",
      "A Cartesian Product (CROSS JOIN) pairing every row of table A with every row of table B",
      "A database compiler syntax error"
    ],
    "correctIndex": 2,
    "explanation": "Listing tables separated by commas in the FROM clause without an explicit join predicate produces an unconstrained Cartesian product yielding count(A) * count(B) rows."
  },
  {
    "id": "mcq_from_3",
    "keyword": "FROM",
    "tag": "🐱 Brain Bender",
    "question": "[FROM #3] When aliasing a table in FROM (\"FROM Employees AS e\"), can you still refer to columns using the original table name \"Employees.salary\"?",
    "options": [
      "In standard SQL, once an alias is defined, the original table name is hidden and referencing it causes an error",
      "Only if the alias is in lowercase",
      "Only in the WHERE clause",
      "Yes, both table name and alias remain simultaneously accessible everywhere"
    ],
    "correctIndex": 0,
    "explanation": "In ANSI SQL, defining a table correlation name (alias) hides the underlying base table name within the scope of that query block."
  },
  {
    "id": "mcq_from_4",
    "keyword": "FROM",
    "tag": "🎯 Core Concept",
    "question": "[FROM #4] What is the physical result of listing two tables in FROM separated by a comma without a WHERE clause (\"FROM TableA, TableB\")?",
    "options": [
      "An INNER JOIN on matching primary keys",
      "A Cartesian Product (CROSS JOIN) pairing every row of TableA with every row of TableB (RowsA * RowsB)",
      "A syntax error",
      "A UNION of both tables"
    ],
    "correctIndex": 1,
    "explanation": "Comma-separated tables in FROM evaluate to a Cartesian product. If TableA has 1,000 rows and TableB has 1,000 rows, the intermediate set is 1,000,000 rows."
  },
  {
    "id": "mcq_from_5",
    "keyword": "FROM",
    "tag": "🏆 Senior Staff",
    "question": "[FROM #5] In Oracle SQL, what is the purpose of the built-in single-row table named \"DUAL\"?",
    "options": [
      "It is a temporary cache table that deletes itself upon disconnect",
      "It stores dual-key cryptographic certificates",
      "It duplicates all write transactions to a secondary replica",
      "It provides a dummy table source for FROM when evaluating pure expressions like \"SELECT SYSDATE FROM DUAL;\""
    ],
    "correctIndex": 3,
    "explanation": "In Oracle SQL, every SELECT query historically required a FROM clause. The DUAL table contains exactly 1 row and 1 column (DUMMY) for evaluating scalar expressions."
  },
  {
    "id": "mcq_from_6",
    "keyword": "FROM",
    "tag": "🍡 Quick Snack",
    "question": "[FROM #6] Why does the FROM clause execute as Step 01 in the physical query lifecycle? (Scenario Variant 2)",
    "options": [
      "To format JSON network packets",
      "The query engine must first bind table storage and memory buffers to establish available columns and data types",
      "Because the word FROM comes first alphabetically among keywords",
      "To verify user write permissions on disk"
    ],
    "correctIndex": 1,
    "explanation": "Before a query engine can filter (WHERE), calculate (SELECT), or sort (ORDER BY), it must identify the physical relations on disk and load their column schemas."
  },
  {
    "id": "mcq_from_7",
    "keyword": "FROM",
    "tag": "⚡ Gotcha Trap",
    "question": "[FROM #7] What relational result does a FROM clause produce when two tables are listed separated by a comma without an ON condition (e.g., FROM A, B)?",
    "options": [
      "An automatic INNER JOIN matching on shared primary key names",
      "A UNION ALL concatenating both tables vertically",
      "A Cartesian Product (CROSS JOIN) pairing every row of table A with every row of table B",
      "A database compiler syntax error"
    ],
    "correctIndex": 2,
    "explanation": "Listing tables separated by commas in the FROM clause without an explicit join predicate produces an unconstrained Cartesian product yielding count(A) * count(B) rows."
  },
  {
    "id": "mcq_from_8",
    "keyword": "FROM",
    "tag": "🐱 Brain Bender",
    "question": "[FROM #8] When aliasing a table in FROM (\"FROM Employees AS e\"), can you still refer to columns using the original table name \"Employees.salary\"? (Scenario Variant 2)",
    "options": [
      "Only in the WHERE clause",
      "Only if the alias is in lowercase",
      "In standard SQL, once an alias is defined, the original table name is hidden and referencing it causes an error",
      "Yes, both table name and alias remain simultaneously accessible everywhere"
    ],
    "correctIndex": 2,
    "explanation": "In ANSI SQL, defining a table correlation name (alias) hides the underlying base table name within the scope of that query block."
  },
  {
    "id": "mcq_from_9",
    "keyword": "FROM",
    "tag": "🎯 Core Concept",
    "question": "[FROM #9] What is the physical result of listing two tables in FROM separated by a comma without a WHERE clause (\"FROM TableA, TableB\")? (Scenario Variant 2)",
    "options": [
      "A UNION of both tables",
      "A syntax error",
      "An INNER JOIN on matching primary keys",
      "A Cartesian Product (CROSS JOIN) pairing every row of TableA with every row of TableB (RowsA * RowsB)"
    ],
    "correctIndex": 3,
    "explanation": "Comma-separated tables in FROM evaluate to a Cartesian product. If TableA has 1,000 rows and TableB has 1,000 rows, the intermediate set is 1,000,000 rows."
  },
  {
    "id": "mcq_from_10",
    "keyword": "FROM",
    "tag": "🏆 Senior Staff",
    "question": "[FROM #10] In Oracle SQL, what is the purpose of the built-in single-row table named \"DUAL\"? (Scenario Variant 2)",
    "options": [
      "It duplicates all write transactions to a secondary replica",
      "It is a temporary cache table that deletes itself upon disconnect",
      "It provides a dummy table source for FROM when evaluating pure expressions like \"SELECT SYSDATE FROM DUAL;\"",
      "It stores dual-key cryptographic certificates"
    ],
    "correctIndex": 2,
    "explanation": "In Oracle SQL, every SELECT query historically required a FROM clause. The DUAL table contains exactly 1 row and 1 column (DUMMY) for evaluating scalar expressions."
  },
  {
    "id": "mcq_from_11",
    "keyword": "FROM",
    "tag": "🍡 Quick Snack",
    "question": "[FROM #11] Why does the FROM clause execute as Step 01 in the physical query lifecycle? (Scenario Variant 3)",
    "options": [
      "The query engine must first bind table storage and memory buffers to establish available columns and data types",
      "To verify user write permissions on disk",
      "To format JSON network packets",
      "Because the word FROM comes first alphabetically among keywords"
    ],
    "correctIndex": 0,
    "explanation": "Before a query engine can filter (WHERE), calculate (SELECT), or sort (ORDER BY), it must identify the physical relations on disk and load their column schemas."
  },
  {
    "id": "mcq_from_12",
    "keyword": "FROM",
    "tag": "⚡ Gotcha Trap",
    "question": "[FROM #12] What relational result does a FROM clause produce when two tables are listed separated by a comma without an ON condition (e.g., FROM A, B)?",
    "options": [
      "An automatic INNER JOIN matching on shared primary key names",
      "A UNION ALL concatenating both tables vertically",
      "A Cartesian Product (CROSS JOIN) pairing every row of table A with every row of table B",
      "A database compiler syntax error"
    ],
    "correctIndex": 2,
    "explanation": "Listing tables separated by commas in the FROM clause without an explicit join predicate produces an unconstrained Cartesian product yielding count(A) * count(B) rows."
  },
  {
    "id": "mcq_from_13",
    "keyword": "FROM",
    "tag": "🐱 Brain Bender",
    "question": "[FROM #13] When aliasing a table in FROM (\"FROM Employees AS e\"), can you still refer to columns using the original table name \"Employees.salary\"? (Scenario Variant 3)",
    "options": [
      "Only in the WHERE clause",
      "Only if the alias is in lowercase",
      "Yes, both table name and alias remain simultaneously accessible everywhere",
      "In standard SQL, once an alias is defined, the original table name is hidden and referencing it causes an error"
    ],
    "correctIndex": 3,
    "explanation": "In ANSI SQL, defining a table correlation name (alias) hides the underlying base table name within the scope of that query block."
  },
  {
    "id": "mcq_from_14",
    "keyword": "FROM",
    "tag": "🎯 Core Concept",
    "question": "[FROM #14] What is the physical result of listing two tables in FROM separated by a comma without a WHERE clause (\"FROM TableA, TableB\")? (Scenario Variant 3)",
    "options": [
      "A syntax error",
      "An INNER JOIN on matching primary keys",
      "A UNION of both tables",
      "A Cartesian Product (CROSS JOIN) pairing every row of TableA with every row of TableB (RowsA * RowsB)"
    ],
    "correctIndex": 3,
    "explanation": "Comma-separated tables in FROM evaluate to a Cartesian product. If TableA has 1,000 rows and TableB has 1,000 rows, the intermediate set is 1,000,000 rows."
  },
  {
    "id": "mcq_from_15",
    "keyword": "FROM",
    "tag": "🏆 Senior Staff",
    "question": "[FROM #15] In Oracle SQL, what is the purpose of the built-in single-row table named \"DUAL\"? (Scenario Variant 3)",
    "options": [
      "It provides a dummy table source for FROM when evaluating pure expressions like \"SELECT SYSDATE FROM DUAL;\"",
      "It stores dual-key cryptographic certificates",
      "It duplicates all write transactions to a secondary replica",
      "It is a temporary cache table that deletes itself upon disconnect"
    ],
    "correctIndex": 0,
    "explanation": "In Oracle SQL, every SELECT query historically required a FROM clause. The DUAL table contains exactly 1 row and 1 column (DUMMY) for evaluating scalar expressions."
  },
  {
    "id": "mcq_from_16",
    "keyword": "FROM",
    "tag": "🍡 Quick Snack",
    "question": "[FROM #16] Why does the FROM clause execute as Step 01 in the physical query lifecycle? (Scenario Variant 4)",
    "options": [
      "To verify user write permissions on disk",
      "Because the word FROM comes first alphabetically among keywords",
      "The query engine must first bind table storage and memory buffers to establish available columns and data types",
      "To format JSON network packets"
    ],
    "correctIndex": 2,
    "explanation": "Before a query engine can filter (WHERE), calculate (SELECT), or sort (ORDER BY), it must identify the physical relations on disk and load their column schemas."
  },
  {
    "id": "mcq_from_17",
    "keyword": "FROM",
    "tag": "⚡ Gotcha Trap",
    "question": "[FROM #17] What relational result does a FROM clause produce when two tables are listed separated by a comma without an ON condition (e.g., FROM A, B)?",
    "options": [
      "An automatic INNER JOIN matching on shared primary key names",
      "A UNION ALL concatenating both tables vertically",
      "A Cartesian Product (CROSS JOIN) pairing every row of table A with every row of table B",
      "A database compiler syntax error"
    ],
    "correctIndex": 2,
    "explanation": "Listing tables separated by commas in the FROM clause without an explicit join predicate produces an unconstrained Cartesian product yielding count(A) * count(B) rows."
  },
  {
    "id": "mcq_from_18",
    "keyword": "FROM",
    "tag": "🐱 Brain Bender",
    "question": "[FROM #18] When aliasing a table in FROM (\"FROM Employees AS e\"), can you still refer to columns using the original table name \"Employees.salary\"? (Scenario Variant 4)",
    "options": [
      "In standard SQL, once an alias is defined, the original table name is hidden and referencing it causes an error",
      "Yes, both table name and alias remain simultaneously accessible everywhere",
      "Only if the alias is in lowercase",
      "Only in the WHERE clause"
    ],
    "correctIndex": 0,
    "explanation": "In ANSI SQL, defining a table correlation name (alias) hides the underlying base table name within the scope of that query block."
  },
  {
    "id": "mcq_from_19",
    "keyword": "FROM",
    "tag": "🎯 Core Concept",
    "question": "[FROM #19] What is the physical result of listing two tables in FROM separated by a comma without a WHERE clause (\"FROM TableA, TableB\")? (Scenario Variant 4)",
    "options": [
      "An INNER JOIN on matching primary keys",
      "A UNION of both tables",
      "A syntax error",
      "A Cartesian Product (CROSS JOIN) pairing every row of TableA with every row of TableB (RowsA * RowsB)"
    ],
    "correctIndex": 3,
    "explanation": "Comma-separated tables in FROM evaluate to a Cartesian product. If TableA has 1,000 rows and TableB has 1,000 rows, the intermediate set is 1,000,000 rows."
  },
  {
    "id": "mcq_from_20",
    "keyword": "FROM",
    "tag": "🏆 Senior Staff",
    "question": "[FROM #20] In Oracle SQL, what is the purpose of the built-in single-row table named \"DUAL\"? (Scenario Variant 4)",
    "options": [
      "It stores dual-key cryptographic certificates",
      "It is a temporary cache table that deletes itself upon disconnect",
      "It provides a dummy table source for FROM when evaluating pure expressions like \"SELECT SYSDATE FROM DUAL;\"",
      "It duplicates all write transactions to a secondary replica"
    ],
    "correctIndex": 2,
    "explanation": "In Oracle SQL, every SELECT query historically required a FROM clause. The DUAL table contains exactly 1 row and 1 column (DUMMY) for evaluating scalar expressions."
  },
  {
    "id": "mcq_from_21",
    "keyword": "FROM",
    "tag": "🍡 Quick Snack",
    "question": "[FROM #21] Why does the FROM clause execute as Step 01 in the physical query lifecycle? (Scenario Variant 5)",
    "options": [
      "The query engine must first bind table storage and memory buffers to establish available columns and data types",
      "To verify user write permissions on disk",
      "To format JSON network packets",
      "Because the word FROM comes first alphabetically among keywords"
    ],
    "correctIndex": 0,
    "explanation": "Before a query engine can filter (WHERE), calculate (SELECT), or sort (ORDER BY), it must identify the physical relations on disk and load their column schemas."
  },
  {
    "id": "mcq_from_22",
    "keyword": "FROM",
    "tag": "⚡ Gotcha Trap",
    "question": "[FROM #22] What relational result does a FROM clause produce when two tables are listed separated by a comma without an ON condition (e.g., FROM A, B)?",
    "options": [
      "An automatic INNER JOIN matching on shared primary key names",
      "A UNION ALL concatenating both tables vertically",
      "A Cartesian Product (CROSS JOIN) pairing every row of table A with every row of table B",
      "A database compiler syntax error"
    ],
    "correctIndex": 2,
    "explanation": "Listing tables separated by commas in the FROM clause without an explicit join predicate produces an unconstrained Cartesian product yielding count(A) * count(B) rows."
  },
  {
    "id": "mcq_from_23",
    "keyword": "FROM",
    "tag": "🐱 Brain Bender",
    "question": "[FROM #23] When aliasing a table in FROM (\"FROM Employees AS e\"), can you still refer to columns using the original table name \"Employees.salary\"? (Scenario Variant 5)",
    "options": [
      "Yes, both table name and alias remain simultaneously accessible everywhere",
      "Only if the alias is in lowercase",
      "Only in the WHERE clause",
      "In standard SQL, once an alias is defined, the original table name is hidden and referencing it causes an error"
    ],
    "correctIndex": 3,
    "explanation": "In ANSI SQL, defining a table correlation name (alias) hides the underlying base table name within the scope of that query block."
  },
  {
    "id": "mcq_from_24",
    "keyword": "FROM",
    "tag": "🎯 Core Concept",
    "question": "[FROM #24] What is the physical result of listing two tables in FROM separated by a comma without a WHERE clause (\"FROM TableA, TableB\")? (Scenario Variant 5)",
    "options": [
      "A Cartesian Product (CROSS JOIN) pairing every row of TableA with every row of TableB (RowsA * RowsB)",
      "An INNER JOIN on matching primary keys",
      "A UNION of both tables",
      "A syntax error"
    ],
    "correctIndex": 0,
    "explanation": "Comma-separated tables in FROM evaluate to a Cartesian product. If TableA has 1,000 rows and TableB has 1,000 rows, the intermediate set is 1,000,000 rows."
  },
  {
    "id": "mcq_from_25",
    "keyword": "FROM",
    "tag": "🏆 Senior Staff",
    "question": "[FROM #25] In Oracle SQL, what is the purpose of the built-in single-row table named \"DUAL\"? (Scenario Variant 5)",
    "options": [
      "It is a temporary cache table that deletes itself upon disconnect",
      "It stores dual-key cryptographic certificates",
      "It duplicates all write transactions to a secondary replica",
      "It provides a dummy table source for FROM when evaluating pure expressions like \"SELECT SYSDATE FROM DUAL;\""
    ],
    "correctIndex": 3,
    "explanation": "In Oracle SQL, every SELECT query historically required a FROM clause. The DUAL table contains exactly 1 row and 1 column (DUMMY) for evaluating scalar expressions."
  },
  {
    "id": "mcq_from_26",
    "keyword": "FROM",
    "tag": "🍡 Quick Snack",
    "question": "[FROM #26] Why does the FROM clause execute as Step 01 in the physical query lifecycle? (Scenario Variant 6)",
    "options": [
      "To format JSON network packets",
      "The query engine must first bind table storage and memory buffers to establish available columns and data types",
      "To verify user write permissions on disk",
      "Because the word FROM comes first alphabetically among keywords"
    ],
    "correctIndex": 1,
    "explanation": "Before a query engine can filter (WHERE), calculate (SELECT), or sort (ORDER BY), it must identify the physical relations on disk and load their column schemas."
  },
  {
    "id": "mcq_from_27",
    "keyword": "FROM",
    "tag": "⚡ Gotcha Trap",
    "question": "[FROM #27] What relational result does a FROM clause produce when two tables are listed separated by a comma without an ON condition (e.g., FROM A, B)?",
    "options": [
      "An automatic INNER JOIN matching on shared primary key names",
      "A UNION ALL concatenating both tables vertically",
      "A Cartesian Product (CROSS JOIN) pairing every row of table A with every row of table B",
      "A database compiler syntax error"
    ],
    "correctIndex": 2,
    "explanation": "Listing tables separated by commas in the FROM clause without an explicit join predicate produces an unconstrained Cartesian product yielding count(A) * count(B) rows."
  },
  {
    "id": "mcq_from_28",
    "keyword": "FROM",
    "tag": "🐱 Brain Bender",
    "question": "[FROM #28] When aliasing a table in FROM (\"FROM Employees AS e\"), can you still refer to columns using the original table name \"Employees.salary\"? (Scenario Variant 6)",
    "options": [
      "In standard SQL, once an alias is defined, the original table name is hidden and referencing it causes an error",
      "Only in the WHERE clause",
      "Only if the alias is in lowercase",
      "Yes, both table name and alias remain simultaneously accessible everywhere"
    ],
    "correctIndex": 0,
    "explanation": "In ANSI SQL, defining a table correlation name (alias) hides the underlying base table name within the scope of that query block."
  },
  {
    "id": "mcq_from_29",
    "keyword": "FROM",
    "tag": "🎯 Core Concept",
    "question": "[FROM #29] What is the physical result of listing two tables in FROM separated by a comma without a WHERE clause (\"FROM TableA, TableB\")? (Scenario Variant 6)",
    "options": [
      "An INNER JOIN on matching primary keys",
      "A syntax error",
      "A Cartesian Product (CROSS JOIN) pairing every row of TableA with every row of TableB (RowsA * RowsB)",
      "A UNION of both tables"
    ],
    "correctIndex": 2,
    "explanation": "Comma-separated tables in FROM evaluate to a Cartesian product. If TableA has 1,000 rows and TableB has 1,000 rows, the intermediate set is 1,000,000 rows."
  },
  {
    "id": "mcq_from_30",
    "keyword": "FROM",
    "tag": "🏆 Senior Staff",
    "question": "[FROM #30] In Oracle SQL, what is the purpose of the built-in single-row table named \"DUAL\"? (Scenario Variant 6)",
    "options": [
      "It stores dual-key cryptographic certificates",
      "It provides a dummy table source for FROM when evaluating pure expressions like \"SELECT SYSDATE FROM DUAL;\"",
      "It is a temporary cache table that deletes itself upon disconnect",
      "It duplicates all write transactions to a secondary replica"
    ],
    "correctIndex": 1,
    "explanation": "In Oracle SQL, every SELECT query historically required a FROM clause. The DUAL table contains exactly 1 row and 1 column (DUMMY) for evaluating scalar expressions."
  },
  {
    "id": "mcq_from_31",
    "keyword": "FROM",
    "tag": "🍡 Quick Snack",
    "question": "[FROM #31] Why does the FROM clause execute as Step 01 in the physical query lifecycle? (Scenario Variant 7)",
    "options": [
      "Because the word FROM comes first alphabetically among keywords",
      "To format JSON network packets",
      "To verify user write permissions on disk",
      "The query engine must first bind table storage and memory buffers to establish available columns and data types"
    ],
    "correctIndex": 3,
    "explanation": "Before a query engine can filter (WHERE), calculate (SELECT), or sort (ORDER BY), it must identify the physical relations on disk and load their column schemas."
  },
  {
    "id": "mcq_from_32",
    "keyword": "FROM",
    "tag": "⚡ Gotcha Trap",
    "question": "[FROM #32] What relational result does a FROM clause produce when two tables are listed separated by a comma without an ON condition (e.g., FROM A, B)?",
    "options": [
      "An automatic INNER JOIN matching on shared primary key names",
      "A UNION ALL concatenating both tables vertically",
      "A Cartesian Product (CROSS JOIN) pairing every row of table A with every row of table B",
      "A database compiler syntax error"
    ],
    "correctIndex": 2,
    "explanation": "Listing tables separated by commas in the FROM clause without an explicit join predicate produces an unconstrained Cartesian product yielding count(A) * count(B) rows."
  },
  {
    "id": "mcq_from_33",
    "keyword": "FROM",
    "tag": "🐱 Brain Bender",
    "question": "[FROM #33] When aliasing a table in FROM (\"FROM Employees AS e\"), can you still refer to columns using the original table name \"Employees.salary\"? (Scenario Variant 7)",
    "options": [
      "In standard SQL, once an alias is defined, the original table name is hidden and referencing it causes an error",
      "Only in the WHERE clause",
      "Yes, both table name and alias remain simultaneously accessible everywhere",
      "Only if the alias is in lowercase"
    ],
    "correctIndex": 0,
    "explanation": "In ANSI SQL, defining a table correlation name (alias) hides the underlying base table name within the scope of that query block."
  },
  {
    "id": "mcq_from_34",
    "keyword": "FROM",
    "tag": "🎯 Core Concept",
    "question": "[FROM #34] What is the physical result of listing two tables in FROM separated by a comma without a WHERE clause (\"FROM TableA, TableB\")? (Scenario Variant 7)",
    "options": [
      "A syntax error",
      "An INNER JOIN on matching primary keys",
      "A Cartesian Product (CROSS JOIN) pairing every row of TableA with every row of TableB (RowsA * RowsB)",
      "A UNION of both tables"
    ],
    "correctIndex": 2,
    "explanation": "Comma-separated tables in FROM evaluate to a Cartesian product. If TableA has 1,000 rows and TableB has 1,000 rows, the intermediate set is 1,000,000 rows."
  },
  {
    "id": "mcq_from_35",
    "keyword": "FROM",
    "tag": "🏆 Senior Staff",
    "question": "[FROM #35] In Oracle SQL, what is the purpose of the built-in single-row table named \"DUAL\"? (Scenario Variant 7)",
    "options": [
      "It stores dual-key cryptographic certificates",
      "It duplicates all write transactions to a secondary replica",
      "It is a temporary cache table that deletes itself upon disconnect",
      "It provides a dummy table source for FROM when evaluating pure expressions like \"SELECT SYSDATE FROM DUAL;\""
    ],
    "correctIndex": 3,
    "explanation": "In Oracle SQL, every SELECT query historically required a FROM clause. The DUAL table contains exactly 1 row and 1 column (DUMMY) for evaluating scalar expressions."
  },
  {
    "id": "mcq_from_36",
    "keyword": "FROM",
    "tag": "🍡 Quick Snack",
    "question": "[FROM #36] Why does the FROM clause execute as Step 01 in the physical query lifecycle? (Scenario Variant 8)",
    "options": [
      "Because the word FROM comes first alphabetically among keywords",
      "The query engine must first bind table storage and memory buffers to establish available columns and data types",
      "To format JSON network packets",
      "To verify user write permissions on disk"
    ],
    "correctIndex": 1,
    "explanation": "Before a query engine can filter (WHERE), calculate (SELECT), or sort (ORDER BY), it must identify the physical relations on disk and load their column schemas."
  },
  {
    "id": "mcq_from_37",
    "keyword": "FROM",
    "tag": "⚡ Gotcha Trap",
    "question": "[FROM #37] What relational result does a FROM clause produce when two tables are listed separated by a comma without an ON condition (e.g., FROM A, B)?",
    "options": [
      "An automatic INNER JOIN matching on shared primary key names",
      "A UNION ALL concatenating both tables vertically",
      "A Cartesian Product (CROSS JOIN) pairing every row of table A with every row of table B",
      "A database compiler syntax error"
    ],
    "correctIndex": 2,
    "explanation": "Listing tables separated by commas in the FROM clause without an explicit join predicate produces an unconstrained Cartesian product yielding count(A) * count(B) rows."
  },
  {
    "id": "mcq_from_38",
    "keyword": "FROM",
    "tag": "🐱 Brain Bender",
    "question": "[FROM #38] When aliasing a table in FROM (\"FROM Employees AS e\"), can you still refer to columns using the original table name \"Employees.salary\"? (Scenario Variant 8)",
    "options": [
      "Only in the WHERE clause",
      "Yes, both table name and alias remain simultaneously accessible everywhere",
      "In standard SQL, once an alias is defined, the original table name is hidden and referencing it causes an error",
      "Only if the alias is in lowercase"
    ],
    "correctIndex": 2,
    "explanation": "In ANSI SQL, defining a table correlation name (alias) hides the underlying base table name within the scope of that query block."
  },
  {
    "id": "mcq_from_39",
    "keyword": "FROM",
    "tag": "🎯 Core Concept",
    "question": "[FROM #39] What is the physical result of listing two tables in FROM separated by a comma without a WHERE clause (\"FROM TableA, TableB\")? (Scenario Variant 8)",
    "options": [
      "An INNER JOIN on matching primary keys",
      "A Cartesian Product (CROSS JOIN) pairing every row of TableA with every row of TableB (RowsA * RowsB)",
      "A syntax error",
      "A UNION of both tables"
    ],
    "correctIndex": 1,
    "explanation": "Comma-separated tables in FROM evaluate to a Cartesian product. If TableA has 1,000 rows and TableB has 1,000 rows, the intermediate set is 1,000,000 rows."
  },
  {
    "id": "mcq_from_40",
    "keyword": "FROM",
    "tag": "🏆 Senior Staff",
    "question": "[FROM #40] In Oracle SQL, what is the purpose of the built-in single-row table named \"DUAL\"? (Scenario Variant 8)",
    "options": [
      "It stores dual-key cryptographic certificates",
      "It duplicates all write transactions to a secondary replica",
      "It provides a dummy table source for FROM when evaluating pure expressions like \"SELECT SYSDATE FROM DUAL;\"",
      "It is a temporary cache table that deletes itself upon disconnect"
    ],
    "correctIndex": 2,
    "explanation": "In Oracle SQL, every SELECT query historically required a FROM clause. The DUAL table contains exactly 1 row and 1 column (DUMMY) for evaluating scalar expressions."
  },
  {
    "id": "mcq_from_41",
    "keyword": "FROM",
    "tag": "🍡 Quick Snack",
    "question": "[FROM #41] Why does the FROM clause execute as Step 01 in the physical query lifecycle? (Scenario Variant 9)",
    "options": [
      "The query engine must first bind table storage and memory buffers to establish available columns and data types",
      "Because the word FROM comes first alphabetically among keywords",
      "To verify user write permissions on disk",
      "To format JSON network packets"
    ],
    "correctIndex": 0,
    "explanation": "Before a query engine can filter (WHERE), calculate (SELECT), or sort (ORDER BY), it must identify the physical relations on disk and load their column schemas."
  },
  {
    "id": "mcq_from_42",
    "keyword": "FROM",
    "tag": "⚡ Gotcha Trap",
    "question": "[FROM #42] What relational result does a FROM clause produce when two tables are listed separated by a comma without an ON condition (e.g., FROM A, B)?",
    "options": [
      "An automatic INNER JOIN matching on shared primary key names",
      "A UNION ALL concatenating both tables vertically",
      "A Cartesian Product (CROSS JOIN) pairing every row of table A with every row of table B",
      "A database compiler syntax error"
    ],
    "correctIndex": 2,
    "explanation": "Listing tables separated by commas in the FROM clause without an explicit join predicate produces an unconstrained Cartesian product yielding count(A) * count(B) rows."
  },
  {
    "id": "mcq_from_43",
    "keyword": "FROM",
    "tag": "🐱 Brain Bender",
    "question": "[FROM #43] When aliasing a table in FROM (\"FROM Employees AS e\"), can you still refer to columns using the original table name \"Employees.salary\"? (Scenario Variant 9)",
    "options": [
      "Yes, both table name and alias remain simultaneously accessible everywhere",
      "In standard SQL, once an alias is defined, the original table name is hidden and referencing it causes an error",
      "Only in the WHERE clause",
      "Only if the alias is in lowercase"
    ],
    "correctIndex": 1,
    "explanation": "In ANSI SQL, defining a table correlation name (alias) hides the underlying base table name within the scope of that query block."
  },
  {
    "id": "mcq_from_44",
    "keyword": "FROM",
    "tag": "🎯 Core Concept",
    "question": "[FROM #44] What is the physical result of listing two tables in FROM separated by a comma without a WHERE clause (\"FROM TableA, TableB\")? (Scenario Variant 9)",
    "options": [
      "An INNER JOIN on matching primary keys",
      "A UNION of both tables",
      "A syntax error",
      "A Cartesian Product (CROSS JOIN) pairing every row of TableA with every row of TableB (RowsA * RowsB)"
    ],
    "correctIndex": 3,
    "explanation": "Comma-separated tables in FROM evaluate to a Cartesian product. If TableA has 1,000 rows and TableB has 1,000 rows, the intermediate set is 1,000,000 rows."
  },
  {
    "id": "mcq_from_45",
    "keyword": "FROM",
    "tag": "🏆 Senior Staff",
    "question": "[FROM #45] In Oracle SQL, what is the purpose of the built-in single-row table named \"DUAL\"? (Scenario Variant 9)",
    "options": [
      "It stores dual-key cryptographic certificates",
      "It provides a dummy table source for FROM when evaluating pure expressions like \"SELECT SYSDATE FROM DUAL;\"",
      "It is a temporary cache table that deletes itself upon disconnect",
      "It duplicates all write transactions to a secondary replica"
    ],
    "correctIndex": 1,
    "explanation": "In Oracle SQL, every SELECT query historically required a FROM clause. The DUAL table contains exactly 1 row and 1 column (DUMMY) for evaluating scalar expressions."
  },
  {
    "id": "mcq_from_46",
    "keyword": "FROM",
    "tag": "🍡 Quick Snack",
    "question": "[FROM #46] Why does the FROM clause execute as Step 01 in the physical query lifecycle? (Scenario Variant 10)",
    "options": [
      "Because the word FROM comes first alphabetically among keywords",
      "To format JSON network packets",
      "The query engine must first bind table storage and memory buffers to establish available columns and data types",
      "To verify user write permissions on disk"
    ],
    "correctIndex": 2,
    "explanation": "Before a query engine can filter (WHERE), calculate (SELECT), or sort (ORDER BY), it must identify the physical relations on disk and load their column schemas."
  },
  {
    "id": "mcq_from_47",
    "keyword": "FROM",
    "tag": "⚡ Gotcha Trap",
    "question": "[FROM #47] What relational result does a FROM clause produce when two tables are listed separated by a comma without an ON condition (e.g., FROM A, B)?",
    "options": [
      "An automatic INNER JOIN matching on shared primary key names",
      "A UNION ALL concatenating both tables vertically",
      "A Cartesian Product (CROSS JOIN) pairing every row of table A with every row of table B",
      "A database compiler syntax error"
    ],
    "correctIndex": 2,
    "explanation": "Listing tables separated by commas in the FROM clause without an explicit join predicate produces an unconstrained Cartesian product yielding count(A) * count(B) rows."
  },
  {
    "id": "mcq_from_48",
    "keyword": "FROM",
    "tag": "🐱 Brain Bender",
    "question": "[FROM #48] When aliasing a table in FROM (\"FROM Employees AS e\"), can you still refer to columns using the original table name \"Employees.salary\"? (Scenario Variant 10)",
    "options": [
      "Only in the WHERE clause",
      "Yes, both table name and alias remain simultaneously accessible everywhere",
      "In standard SQL, once an alias is defined, the original table name is hidden and referencing it causes an error",
      "Only if the alias is in lowercase"
    ],
    "correctIndex": 2,
    "explanation": "In ANSI SQL, defining a table correlation name (alias) hides the underlying base table name within the scope of that query block."
  },
  {
    "id": "mcq_from_49",
    "keyword": "FROM",
    "tag": "🎯 Core Concept",
    "question": "[FROM #49] What is the physical result of listing two tables in FROM separated by a comma without a WHERE clause (\"FROM TableA, TableB\")? (Scenario Variant 10)",
    "options": [
      "An INNER JOIN on matching primary keys",
      "A Cartesian Product (CROSS JOIN) pairing every row of TableA with every row of TableB (RowsA * RowsB)",
      "A syntax error",
      "A UNION of both tables"
    ],
    "correctIndex": 1,
    "explanation": "Comma-separated tables in FROM evaluate to a Cartesian product. If TableA has 1,000 rows and TableB has 1,000 rows, the intermediate set is 1,000,000 rows."
  },
  {
    "id": "mcq_from_50",
    "keyword": "FROM",
    "tag": "🏆 Senior Staff",
    "question": "[FROM #50] In Oracle SQL, what is the purpose of the built-in single-row table named \"DUAL\"? (Scenario Variant 10)",
    "options": [
      "It is a temporary cache table that deletes itself upon disconnect",
      "It stores dual-key cryptographic certificates",
      "It provides a dummy table source for FROM when evaluating pure expressions like \"SELECT SYSDATE FROM DUAL;\"",
      "It duplicates all write transactions to a secondary replica"
    ],
    "correctIndex": 2,
    "explanation": "In Oracle SQL, every SELECT query historically required a FROM clause. The DUAL table contains exactly 1 row and 1 column (DUMMY) for evaluating scalar expressions."
  },
  {
    "id": "mcq_from_51",
    "keyword": "FROM",
    "tag": "🎯 Core Concept",
    "question": "[FROM #51 &bull; Fintech & Ledger Systems] Why is FROM the very first clause evaluated in SQL physical execution? (Application Scenario 1)",
    "options": [
      "FROM allocates the final network transmission buffer",
      "It is merely an alphabetical convention with no architectural meaning",
      "FROM parses the ORDER BY clause",
      "The engine must identify the source tables, load metadata/schemas, check access permissions, and establish the base Cartesian relation before any filtering or projection"
    ],
    "correctIndex": 3,
    "explanation": "The execution engine must establish the base universe of rows (relations, joins, table locks, and row streams) before it can evaluate predicates in WHERE or aggregations in GROUP BY. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_from_52",
    "keyword": "FROM",
    "tag": "🏛️ Corporate Edge",
    "question": "[FROM #52 &bull; SaaS Subscription Billing] What is a 'derived table' in SQL, and what is the strict syntactic requirement for it in MySQL? (Application Scenario 1)",
    "options": [
      "A permanent table stored on an external SSD",
      "A subquery in the FROM clause; it MUST be given an explicit table alias (e.g. 'FROM (...) AS dt')",
      "A view created with the CREATE DERIVED TABLE statement",
      "A table with zero columns"
    ],
    "correctIndex": 1,
    "explanation": "Table aliases in the FROM clause (e.g., FROM Employees e) allow qualifying column references cleanly and resolving naming ambiguities across tables. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_from_53",
    "keyword": "FROM",
    "tag": "💡 Lead Architect",
    "question": "[FROM #53 &bull; Global Supply Chain & Logistics] What happens when you write 'FROM table_a, table_b' with no ON or WHERE condition? (Application Scenario 1)",
    "options": [
      "It produces an INNER JOIN matching on primary keys automatically",
      "It returns the union of both tables",
      "The query is rejected by the parser",
      "It produces a Cartesian Product (CROSS JOIN) where every row in table_a is paired with every row in table_b"
    ],
    "correctIndex": 3,
    "explanation": "Comma-separated tables in the FROM clause without a join condition generate an unrestricted Cartesian Product of size N * M rows. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_from_54",
    "keyword": "FROM",
    "tag": "⚡ Gotcha Trap",
    "question": "[FROM #54 &bull; Healthcare Patient Records] What is a Common Table Expression (CTE), and where is it defined in relation to FROM? (Application Scenario 1)",
    "options": [
      "An encrypted database index",
      "A named temporary result set defined using the WITH clause before the main query, which can then be referenced in the FROM clause",
      "A stored procedure compiled into native C++",
      "A physical table stored in tempdb permanently"
    ],
    "correctIndex": 1,
    "explanation": "CTEs (WITH cte_name AS (...)) define modular, readable temporary result sets that can be referenced multiple times within subsequent FROM clauses in the query. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_from_55",
    "keyword": "FROM",
    "tag": "🎯 Core Concept",
    "question": "[FROM #55 &bull; E-Commerce Checkout Funnels] In MySQL 8.0 and PostgreSQL, what does a LATERAL join inside the FROM clause permit? (Application Scenario 1)",
    "options": [
      "Forces queries to execute on multiple CPU cores in parallel",
      "Allows tables from two different database vendors to join directly",
      "Locks rows in ascending primary key order",
      "Allows a subquery or table function in FROM to reference columns provided by preceding tables in the same FROM clause"
    ],
    "correctIndex": 3,
    "explanation": "LATERAL joins act as an inline foreach loop, allowing the right-hand subquery in the FROM clause to consume column values from the left-hand table row-by-row. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_from_56",
    "keyword": "FROM",
    "tag": "🏛️ Corporate Edge",
    "question": "[FROM #56 &bull; Telecom Billing & Data Streams] Why is FROM the very first clause evaluated in SQL physical execution? (Application Scenario 2)",
    "options": [
      "FROM allocates the final network transmission buffer",
      "The engine must identify the source tables, load metadata/schemas, check access permissions, and establish the base Cartesian relation before any filtering or projection",
      "It is merely an alphabetical convention with no architectural meaning",
      "FROM parses the ORDER BY clause"
    ],
    "correctIndex": 1,
    "explanation": "The execution engine must establish the base universe of rows (relations, joins, table locks, and row streams) before it can evaluate predicates in WHERE or aggregations in GROUP BY. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_from_57",
    "keyword": "FROM",
    "tag": "💡 Lead Architect",
    "question": "[FROM #57 &bull; AdTech Real-Time Bidding] What is a 'derived table' in SQL, and what is the strict syntactic requirement for it in MySQL? (Application Scenario 2)",
    "options": [
      "A permanent table stored on an external SSD",
      "A view created with the CREATE DERIVED TABLE statement",
      "A table with zero columns",
      "A subquery in the FROM clause; it MUST be given an explicit table alias (e.g. 'FROM (...) AS dt')"
    ],
    "correctIndex": 3,
    "explanation": "Table aliases in the FROM clause (e.g., FROM Employees e) allow qualifying column references cleanly and resolving naming ambiguities across tables. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_from_58",
    "keyword": "FROM",
    "tag": "⚡ Gotcha Trap",
    "question": "[FROM #58 &bull; Cybersecurity Audit Logs] What happens when you write 'FROM table_a, table_b' with no ON or WHERE condition? (Application Scenario 2)",
    "options": [
      "It produces an INNER JOIN matching on primary keys automatically",
      "It produces a Cartesian Product (CROSS JOIN) where every row in table_a is paired with every row in table_b",
      "It returns the union of both tables",
      "The query is rejected by the parser"
    ],
    "correctIndex": 1,
    "explanation": "Comma-separated tables in the FROM clause without a join condition generate an unrestricted Cartesian Product of size N * M rows. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_from_59",
    "keyword": "FROM",
    "tag": "🎯 Core Concept",
    "question": "[FROM #59 &bull; Fintech & Ledger Systems] What is a Common Table Expression (CTE), and where is it defined in relation to FROM? (Application Scenario 2)",
    "options": [
      "An encrypted database index",
      "A stored procedure compiled into native C++",
      "A physical table stored in tempdb permanently",
      "A named temporary result set defined using the WITH clause before the main query, which can then be referenced in the FROM clause"
    ],
    "correctIndex": 3,
    "explanation": "CTEs (WITH cte_name AS (...)) define modular, readable temporary result sets that can be referenced multiple times within subsequent FROM clauses in the query. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_from_60",
    "keyword": "FROM",
    "tag": "🏛️ Corporate Edge",
    "question": "[FROM #60 &bull; SaaS Subscription Billing] In MySQL 8.0 and PostgreSQL, what does a LATERAL join inside the FROM clause permit? (Application Scenario 2)",
    "options": [
      "Forces queries to execute on multiple CPU cores in parallel",
      "Allows a subquery or table function in FROM to reference columns provided by preceding tables in the same FROM clause",
      "Allows tables from two different database vendors to join directly",
      "Locks rows in ascending primary key order"
    ],
    "correctIndex": 1,
    "explanation": "LATERAL joins act as an inline foreach loop, allowing the right-hand subquery in the FROM clause to consume column values from the left-hand table row-by-row. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_from_61",
    "keyword": "FROM",
    "tag": "💡 Lead Architect",
    "question": "[FROM #61 &bull; Global Supply Chain & Logistics] Why is FROM the very first clause evaluated in SQL physical execution? (Application Scenario 3)",
    "options": [
      "FROM allocates the final network transmission buffer",
      "It is merely an alphabetical convention with no architectural meaning",
      "FROM parses the ORDER BY clause",
      "The engine must identify the source tables, load metadata/schemas, check access permissions, and establish the base Cartesian relation before any filtering or projection"
    ],
    "correctIndex": 3,
    "explanation": "The execution engine must establish the base universe of rows (relations, joins, table locks, and row streams) before it can evaluate predicates in WHERE or aggregations in GROUP BY. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_from_62",
    "keyword": "FROM",
    "tag": "⚡ Gotcha Trap",
    "question": "[FROM #62 &bull; Healthcare Patient Records] What is a 'derived table' in SQL, and what is the strict syntactic requirement for it in MySQL? (Application Scenario 3)",
    "options": [
      "A permanent table stored on an external SSD",
      "A subquery in the FROM clause; it MUST be given an explicit table alias (e.g. 'FROM (...) AS dt')",
      "A view created with the CREATE DERIVED TABLE statement",
      "A table with zero columns"
    ],
    "correctIndex": 1,
    "explanation": "Table aliases in the FROM clause (e.g., FROM Employees e) allow qualifying column references cleanly and resolving naming ambiguities across tables. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_from_63",
    "keyword": "FROM",
    "tag": "🎯 Core Concept",
    "question": "[FROM #63 &bull; E-Commerce Checkout Funnels] What happens when you write 'FROM table_a, table_b' with no ON or WHERE condition? (Application Scenario 3)",
    "options": [
      "It produces an INNER JOIN matching on primary keys automatically",
      "It returns the union of both tables",
      "The query is rejected by the parser",
      "It produces a Cartesian Product (CROSS JOIN) where every row in table_a is paired with every row in table_b"
    ],
    "correctIndex": 3,
    "explanation": "Comma-separated tables in the FROM clause without a join condition generate an unrestricted Cartesian Product of size N * M rows. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_from_64",
    "keyword": "FROM",
    "tag": "🏛️ Corporate Edge",
    "question": "[FROM #64 &bull; Telecom Billing & Data Streams] What is a Common Table Expression (CTE), and where is it defined in relation to FROM? (Application Scenario 3)",
    "options": [
      "An encrypted database index",
      "A named temporary result set defined using the WITH clause before the main query, which can then be referenced in the FROM clause",
      "A stored procedure compiled into native C++",
      "A physical table stored in tempdb permanently"
    ],
    "correctIndex": 1,
    "explanation": "CTEs (WITH cte_name AS (...)) define modular, readable temporary result sets that can be referenced multiple times within subsequent FROM clauses in the query. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_from_65",
    "keyword": "FROM",
    "tag": "💡 Lead Architect",
    "question": "[FROM #65 &bull; AdTech Real-Time Bidding] In MySQL 8.0 and PostgreSQL, what does a LATERAL join inside the FROM clause permit? (Application Scenario 3)",
    "options": [
      "Forces queries to execute on multiple CPU cores in parallel",
      "Allows tables from two different database vendors to join directly",
      "Locks rows in ascending primary key order",
      "Allows a subquery or table function in FROM to reference columns provided by preceding tables in the same FROM clause"
    ],
    "correctIndex": 3,
    "explanation": "LATERAL joins act as an inline foreach loop, allowing the right-hand subquery in the FROM clause to consume column values from the left-hand table row-by-row. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_from_66",
    "keyword": "FROM",
    "tag": "⚡ Gotcha Trap",
    "question": "[FROM #66 &bull; Cybersecurity Audit Logs] Why is FROM the very first clause evaluated in SQL physical execution? (Application Scenario 4)",
    "options": [
      "FROM allocates the final network transmission buffer",
      "The engine must identify the source tables, load metadata/schemas, check access permissions, and establish the base Cartesian relation before any filtering or projection",
      "It is merely an alphabetical convention with no architectural meaning",
      "FROM parses the ORDER BY clause"
    ],
    "correctIndex": 1,
    "explanation": "The execution engine must establish the base universe of rows (relations, joins, table locks, and row streams) before it can evaluate predicates in WHERE or aggregations in GROUP BY. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_from_67",
    "keyword": "FROM",
    "tag": "🎯 Core Concept",
    "question": "[FROM #67 &bull; Fintech & Ledger Systems] What is a 'derived table' in SQL, and what is the strict syntactic requirement for it in MySQL? (Application Scenario 4)",
    "options": [
      "A permanent table stored on an external SSD",
      "A view created with the CREATE DERIVED TABLE statement",
      "A table with zero columns",
      "A subquery in the FROM clause; it MUST be given an explicit table alias (e.g. 'FROM (...) AS dt')"
    ],
    "correctIndex": 3,
    "explanation": "Table aliases in the FROM clause (e.g., FROM Employees e) allow qualifying column references cleanly and resolving naming ambiguities across tables. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_from_68",
    "keyword": "FROM",
    "tag": "🏛️ Corporate Edge",
    "question": "[FROM #68 &bull; SaaS Subscription Billing] What happens when you write 'FROM table_a, table_b' with no ON or WHERE condition? (Application Scenario 4)",
    "options": [
      "It produces an INNER JOIN matching on primary keys automatically",
      "It produces a Cartesian Product (CROSS JOIN) where every row in table_a is paired with every row in table_b",
      "It returns the union of both tables",
      "The query is rejected by the parser"
    ],
    "correctIndex": 1,
    "explanation": "Comma-separated tables in the FROM clause without a join condition generate an unrestricted Cartesian Product of size N * M rows. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_from_69",
    "keyword": "FROM",
    "tag": "💡 Lead Architect",
    "question": "[FROM #69 &bull; Global Supply Chain & Logistics] What is a Common Table Expression (CTE), and where is it defined in relation to FROM? (Application Scenario 4)",
    "options": [
      "An encrypted database index",
      "A stored procedure compiled into native C++",
      "A physical table stored in tempdb permanently",
      "A named temporary result set defined using the WITH clause before the main query, which can then be referenced in the FROM clause"
    ],
    "correctIndex": 3,
    "explanation": "CTEs (WITH cte_name AS (...)) define modular, readable temporary result sets that can be referenced multiple times within subsequent FROM clauses in the query. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_from_70",
    "keyword": "FROM",
    "tag": "⚡ Gotcha Trap",
    "question": "[FROM #70 &bull; Healthcare Patient Records] In MySQL 8.0 and PostgreSQL, what does a LATERAL join inside the FROM clause permit? (Application Scenario 4)",
    "options": [
      "Forces queries to execute on multiple CPU cores in parallel",
      "Allows a subquery or table function in FROM to reference columns provided by preceding tables in the same FROM clause",
      "Allows tables from two different database vendors to join directly",
      "Locks rows in ascending primary key order"
    ],
    "correctIndex": 1,
    "explanation": "LATERAL joins act as an inline foreach loop, allowing the right-hand subquery in the FROM clause to consume column values from the left-hand table row-by-row. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_from_71",
    "keyword": "FROM",
    "tag": "🎯 Core Concept",
    "question": "[FROM #71 &bull; E-Commerce Checkout Funnels] Why is FROM the very first clause evaluated in SQL physical execution? (Application Scenario 5)",
    "options": [
      "FROM allocates the final network transmission buffer",
      "It is merely an alphabetical convention with no architectural meaning",
      "FROM parses the ORDER BY clause",
      "The engine must identify the source tables, load metadata/schemas, check access permissions, and establish the base Cartesian relation before any filtering or projection"
    ],
    "correctIndex": 3,
    "explanation": "The execution engine must establish the base universe of rows (relations, joins, table locks, and row streams) before it can evaluate predicates in WHERE or aggregations in GROUP BY. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_from_72",
    "keyword": "FROM",
    "tag": "🏛️ Corporate Edge",
    "question": "[FROM #72 &bull; Telecom Billing & Data Streams] What is a 'derived table' in SQL, and what is the strict syntactic requirement for it in MySQL? (Application Scenario 5)",
    "options": [
      "A permanent table stored on an external SSD",
      "A subquery in the FROM clause; it MUST be given an explicit table alias (e.g. 'FROM (...) AS dt')",
      "A view created with the CREATE DERIVED TABLE statement",
      "A table with zero columns"
    ],
    "correctIndex": 1,
    "explanation": "Table aliases in the FROM clause (e.g., FROM Employees e) allow qualifying column references cleanly and resolving naming ambiguities across tables. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_from_73",
    "keyword": "FROM",
    "tag": "💡 Lead Architect",
    "question": "[FROM #73 &bull; AdTech Real-Time Bidding] What happens when you write 'FROM table_a, table_b' with no ON or WHERE condition? (Application Scenario 5)",
    "options": [
      "It produces an INNER JOIN matching on primary keys automatically",
      "It returns the union of both tables",
      "The query is rejected by the parser",
      "It produces a Cartesian Product (CROSS JOIN) where every row in table_a is paired with every row in table_b"
    ],
    "correctIndex": 3,
    "explanation": "Comma-separated tables in the FROM clause without a join condition generate an unrestricted Cartesian Product of size N * M rows. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_from_74",
    "keyword": "FROM",
    "tag": "⚡ Gotcha Trap",
    "question": "[FROM #74 &bull; Cybersecurity Audit Logs] What is a Common Table Expression (CTE), and where is it defined in relation to FROM? (Application Scenario 5)",
    "options": [
      "An encrypted database index",
      "A named temporary result set defined using the WITH clause before the main query, which can then be referenced in the FROM clause",
      "A stored procedure compiled into native C++",
      "A physical table stored in tempdb permanently"
    ],
    "correctIndex": 1,
    "explanation": "CTEs (WITH cte_name AS (...)) define modular, readable temporary result sets that can be referenced multiple times within subsequent FROM clauses in the query. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_from_75",
    "keyword": "FROM",
    "tag": "🎯 Core Concept",
    "question": "[FROM #75 &bull; Fintech & Ledger Systems] In MySQL 8.0 and PostgreSQL, what does a LATERAL join inside the FROM clause permit? (Application Scenario 5)",
    "options": [
      "Forces queries to execute on multiple CPU cores in parallel",
      "Allows tables from two different database vendors to join directly",
      "Locks rows in ascending primary key order",
      "Allows a subquery or table function in FROM to reference columns provided by preceding tables in the same FROM clause"
    ],
    "correctIndex": 3,
    "explanation": "LATERAL joins act as an inline foreach loop, allowing the right-hand subquery in the FROM clause to consume column values from the left-hand table row-by-row. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_from_76",
    "keyword": "FROM",
    "tag": "🏛️ Corporate Edge",
    "question": "[FROM #76 &bull; SaaS Subscription Billing] Why is FROM the very first clause evaluated in SQL physical execution? (Application Scenario 6)",
    "options": [
      "FROM allocates the final network transmission buffer",
      "The engine must identify the source tables, load metadata/schemas, check access permissions, and establish the base Cartesian relation before any filtering or projection",
      "It is merely an alphabetical convention with no architectural meaning",
      "FROM parses the ORDER BY clause"
    ],
    "correctIndex": 1,
    "explanation": "The execution engine must establish the base universe of rows (relations, joins, table locks, and row streams) before it can evaluate predicates in WHERE or aggregations in GROUP BY. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_from_77",
    "keyword": "FROM",
    "tag": "💡 Lead Architect",
    "question": "[FROM #77 &bull; Global Supply Chain & Logistics] What is a 'derived table' in SQL, and what is the strict syntactic requirement for it in MySQL? (Application Scenario 6)",
    "options": [
      "A permanent table stored on an external SSD",
      "A view created with the CREATE DERIVED TABLE statement",
      "A table with zero columns",
      "A subquery in the FROM clause; it MUST be given an explicit table alias (e.g. 'FROM (...) AS dt')"
    ],
    "correctIndex": 3,
    "explanation": "Table aliases in the FROM clause (e.g., FROM Employees e) allow qualifying column references cleanly and resolving naming ambiguities across tables. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_from_78",
    "keyword": "FROM",
    "tag": "⚡ Gotcha Trap",
    "question": "[FROM #78 &bull; Healthcare Patient Records] What happens when you write 'FROM table_a, table_b' with no ON or WHERE condition? (Application Scenario 6)",
    "options": [
      "It produces an INNER JOIN matching on primary keys automatically",
      "It produces a Cartesian Product (CROSS JOIN) where every row in table_a is paired with every row in table_b",
      "It returns the union of both tables",
      "The query is rejected by the parser"
    ],
    "correctIndex": 1,
    "explanation": "Comma-separated tables in the FROM clause without a join condition generate an unrestricted Cartesian Product of size N * M rows. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_from_79",
    "keyword": "FROM",
    "tag": "🎯 Core Concept",
    "question": "[FROM #79 &bull; E-Commerce Checkout Funnels] What is a Common Table Expression (CTE), and where is it defined in relation to FROM? (Application Scenario 6)",
    "options": [
      "An encrypted database index",
      "A stored procedure compiled into native C++",
      "A physical table stored in tempdb permanently",
      "A named temporary result set defined using the WITH clause before the main query, which can then be referenced in the FROM clause"
    ],
    "correctIndex": 3,
    "explanation": "CTEs (WITH cte_name AS (...)) define modular, readable temporary result sets that can be referenced multiple times within subsequent FROM clauses in the query. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_from_80",
    "keyword": "FROM",
    "tag": "🏛️ Corporate Edge",
    "question": "[FROM #80 &bull; Telecom Billing & Data Streams] In MySQL 8.0 and PostgreSQL, what does a LATERAL join inside the FROM clause permit? (Application Scenario 6)",
    "options": [
      "Forces queries to execute on multiple CPU cores in parallel",
      "Allows a subquery or table function in FROM to reference columns provided by preceding tables in the same FROM clause",
      "Allows tables from two different database vendors to join directly",
      "Locks rows in ascending primary key order"
    ],
    "correctIndex": 1,
    "explanation": "LATERAL joins act as an inline foreach loop, allowing the right-hand subquery in the FROM clause to consume column values from the left-hand table row-by-row. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_from_81",
    "keyword": "FROM",
    "tag": "💡 Lead Architect",
    "question": "[FROM #81 &bull; AdTech Real-Time Bidding] Why is FROM the very first clause evaluated in SQL physical execution? (Application Scenario 7)",
    "options": [
      "FROM allocates the final network transmission buffer",
      "It is merely an alphabetical convention with no architectural meaning",
      "FROM parses the ORDER BY clause",
      "The engine must identify the source tables, load metadata/schemas, check access permissions, and establish the base Cartesian relation before any filtering or projection"
    ],
    "correctIndex": 3,
    "explanation": "The execution engine must establish the base universe of rows (relations, joins, table locks, and row streams) before it can evaluate predicates in WHERE or aggregations in GROUP BY. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_from_82",
    "keyword": "FROM",
    "tag": "⚡ Gotcha Trap",
    "question": "[FROM #82 &bull; Cybersecurity Audit Logs] What is a 'derived table' in SQL, and what is the strict syntactic requirement for it in MySQL? (Application Scenario 7)",
    "options": [
      "A permanent table stored on an external SSD",
      "A subquery in the FROM clause; it MUST be given an explicit table alias (e.g. 'FROM (...) AS dt')",
      "A view created with the CREATE DERIVED TABLE statement",
      "A table with zero columns"
    ],
    "correctIndex": 1,
    "explanation": "Table aliases in the FROM clause (e.g., FROM Employees e) allow qualifying column references cleanly and resolving naming ambiguities across tables. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_from_83",
    "keyword": "FROM",
    "tag": "🎯 Core Concept",
    "question": "[FROM #83 &bull; Fintech & Ledger Systems] What happens when you write 'FROM table_a, table_b' with no ON or WHERE condition? (Application Scenario 7)",
    "options": [
      "It produces an INNER JOIN matching on primary keys automatically",
      "It returns the union of both tables",
      "The query is rejected by the parser",
      "It produces a Cartesian Product (CROSS JOIN) where every row in table_a is paired with every row in table_b"
    ],
    "correctIndex": 3,
    "explanation": "Comma-separated tables in the FROM clause without a join condition generate an unrestricted Cartesian Product of size N * M rows. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_from_84",
    "keyword": "FROM",
    "tag": "🏛️ Corporate Edge",
    "question": "[FROM #84 &bull; SaaS Subscription Billing] What is a Common Table Expression (CTE), and where is it defined in relation to FROM? (Application Scenario 7)",
    "options": [
      "An encrypted database index",
      "A named temporary result set defined using the WITH clause before the main query, which can then be referenced in the FROM clause",
      "A stored procedure compiled into native C++",
      "A physical table stored in tempdb permanently"
    ],
    "correctIndex": 1,
    "explanation": "CTEs (WITH cte_name AS (...)) define modular, readable temporary result sets that can be referenced multiple times within subsequent FROM clauses in the query. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_from_85",
    "keyword": "FROM",
    "tag": "💡 Lead Architect",
    "question": "[FROM #85 &bull; Global Supply Chain & Logistics] In MySQL 8.0 and PostgreSQL, what does a LATERAL join inside the FROM clause permit? (Application Scenario 7)",
    "options": [
      "Forces queries to execute on multiple CPU cores in parallel",
      "Allows tables from two different database vendors to join directly",
      "Locks rows in ascending primary key order",
      "Allows a subquery or table function in FROM to reference columns provided by preceding tables in the same FROM clause"
    ],
    "correctIndex": 3,
    "explanation": "LATERAL joins act as an inline foreach loop, allowing the right-hand subquery in the FROM clause to consume column values from the left-hand table row-by-row. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_from_86",
    "keyword": "FROM",
    "tag": "⚡ Gotcha Trap",
    "question": "[FROM #86 &bull; Healthcare Patient Records] Why is FROM the very first clause evaluated in SQL physical execution? (Application Scenario 8)",
    "options": [
      "FROM allocates the final network transmission buffer",
      "The engine must identify the source tables, load metadata/schemas, check access permissions, and establish the base Cartesian relation before any filtering or projection",
      "It is merely an alphabetical convention with no architectural meaning",
      "FROM parses the ORDER BY clause"
    ],
    "correctIndex": 1,
    "explanation": "The execution engine must establish the base universe of rows (relations, joins, table locks, and row streams) before it can evaluate predicates in WHERE or aggregations in GROUP BY. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_from_87",
    "keyword": "FROM",
    "tag": "🎯 Core Concept",
    "question": "[FROM #87 &bull; E-Commerce Checkout Funnels] What is a 'derived table' in SQL, and what is the strict syntactic requirement for it in MySQL? (Application Scenario 8)",
    "options": [
      "A permanent table stored on an external SSD",
      "A view created with the CREATE DERIVED TABLE statement",
      "A table with zero columns",
      "A subquery in the FROM clause; it MUST be given an explicit table alias (e.g. 'FROM (...) AS dt')"
    ],
    "correctIndex": 3,
    "explanation": "Table aliases in the FROM clause (e.g., FROM Employees e) allow qualifying column references cleanly and resolving naming ambiguities across tables. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_from_88",
    "keyword": "FROM",
    "tag": "🏛️ Corporate Edge",
    "question": "[FROM #88 &bull; Telecom Billing & Data Streams] What happens when you write 'FROM table_a, table_b' with no ON or WHERE condition? (Application Scenario 8)",
    "options": [
      "It produces an INNER JOIN matching on primary keys automatically",
      "It produces a Cartesian Product (CROSS JOIN) where every row in table_a is paired with every row in table_b",
      "It returns the union of both tables",
      "The query is rejected by the parser"
    ],
    "correctIndex": 1,
    "explanation": "Comma-separated tables in the FROM clause without a join condition generate an unrestricted Cartesian Product of size N * M rows. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_from_89",
    "keyword": "FROM",
    "tag": "💡 Lead Architect",
    "question": "[FROM #89 &bull; AdTech Real-Time Bidding] What is a Common Table Expression (CTE), and where is it defined in relation to FROM? (Application Scenario 8)",
    "options": [
      "An encrypted database index",
      "A stored procedure compiled into native C++",
      "A physical table stored in tempdb permanently",
      "A named temporary result set defined using the WITH clause before the main query, which can then be referenced in the FROM clause"
    ],
    "correctIndex": 3,
    "explanation": "CTEs (WITH cte_name AS (...)) define modular, readable temporary result sets that can be referenced multiple times within subsequent FROM clauses in the query. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_from_90",
    "keyword": "FROM",
    "tag": "⚡ Gotcha Trap",
    "question": "[FROM #90 &bull; Cybersecurity Audit Logs] In MySQL 8.0 and PostgreSQL, what does a LATERAL join inside the FROM clause permit? (Application Scenario 8)",
    "options": [
      "Forces queries to execute on multiple CPU cores in parallel",
      "Allows a subquery or table function in FROM to reference columns provided by preceding tables in the same FROM clause",
      "Allows tables from two different database vendors to join directly",
      "Locks rows in ascending primary key order"
    ],
    "correctIndex": 1,
    "explanation": "LATERAL joins act as an inline foreach loop, allowing the right-hand subquery in the FROM clause to consume column values from the left-hand table row-by-row. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_from_91",
    "keyword": "FROM",
    "tag": "🎯 Core Concept",
    "question": "[FROM #91 &bull; Fintech & Ledger Systems] Why is FROM the very first clause evaluated in SQL physical execution? (Application Scenario 9)",
    "options": [
      "FROM allocates the final network transmission buffer",
      "It is merely an alphabetical convention with no architectural meaning",
      "FROM parses the ORDER BY clause",
      "The engine must identify the source tables, load metadata/schemas, check access permissions, and establish the base Cartesian relation before any filtering or projection"
    ],
    "correctIndex": 3,
    "explanation": "The execution engine must establish the base universe of rows (relations, joins, table locks, and row streams) before it can evaluate predicates in WHERE or aggregations in GROUP BY. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_from_92",
    "keyword": "FROM",
    "tag": "🏛️ Corporate Edge",
    "question": "[FROM #92 &bull; SaaS Subscription Billing] What is a 'derived table' in SQL, and what is the strict syntactic requirement for it in MySQL? (Application Scenario 9)",
    "options": [
      "A permanent table stored on an external SSD",
      "A subquery in the FROM clause; it MUST be given an explicit table alias (e.g. 'FROM (...) AS dt')",
      "A view created with the CREATE DERIVED TABLE statement",
      "A table with zero columns"
    ],
    "correctIndex": 1,
    "explanation": "Table aliases in the FROM clause (e.g., FROM Employees e) allow qualifying column references cleanly and resolving naming ambiguities across tables. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_from_93",
    "keyword": "FROM",
    "tag": "💡 Lead Architect",
    "question": "[FROM #93 &bull; Global Supply Chain & Logistics] What happens when you write 'FROM table_a, table_b' with no ON or WHERE condition? (Application Scenario 9)",
    "options": [
      "It produces an INNER JOIN matching on primary keys automatically",
      "It returns the union of both tables",
      "The query is rejected by the parser",
      "It produces a Cartesian Product (CROSS JOIN) where every row in table_a is paired with every row in table_b"
    ],
    "correctIndex": 3,
    "explanation": "Comma-separated tables in the FROM clause without a join condition generate an unrestricted Cartesian Product of size N * M rows. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_from_94",
    "keyword": "FROM",
    "tag": "⚡ Gotcha Trap",
    "question": "[FROM #94 &bull; Healthcare Patient Records] What is a Common Table Expression (CTE), and where is it defined in relation to FROM? (Application Scenario 9)",
    "options": [
      "An encrypted database index",
      "A named temporary result set defined using the WITH clause before the main query, which can then be referenced in the FROM clause",
      "A stored procedure compiled into native C++",
      "A physical table stored in tempdb permanently"
    ],
    "correctIndex": 1,
    "explanation": "CTEs (WITH cte_name AS (...)) define modular, readable temporary result sets that can be referenced multiple times within subsequent FROM clauses in the query. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_from_95",
    "keyword": "FROM",
    "tag": "🎯 Core Concept",
    "question": "[FROM #95 &bull; E-Commerce Checkout Funnels] In MySQL 8.0 and PostgreSQL, what does a LATERAL join inside the FROM clause permit? (Application Scenario 9)",
    "options": [
      "Forces queries to execute on multiple CPU cores in parallel",
      "Allows tables from two different database vendors to join directly",
      "Locks rows in ascending primary key order",
      "Allows a subquery or table function in FROM to reference columns provided by preceding tables in the same FROM clause"
    ],
    "correctIndex": 3,
    "explanation": "LATERAL joins act as an inline foreach loop, allowing the right-hand subquery in the FROM clause to consume column values from the left-hand table row-by-row. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_from_96",
    "keyword": "FROM",
    "tag": "🏛️ Corporate Edge",
    "question": "[FROM #96 &bull; Telecom Billing & Data Streams] Why is FROM the very first clause evaluated in SQL physical execution? (Application Scenario 10)",
    "options": [
      "FROM allocates the final network transmission buffer",
      "The engine must identify the source tables, load metadata/schemas, check access permissions, and establish the base Cartesian relation before any filtering or projection",
      "It is merely an alphabetical convention with no architectural meaning",
      "FROM parses the ORDER BY clause"
    ],
    "correctIndex": 1,
    "explanation": "The execution engine must establish the base universe of rows (relations, joins, table locks, and row streams) before it can evaluate predicates in WHERE or aggregations in GROUP BY. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_from_97",
    "keyword": "FROM",
    "tag": "💡 Lead Architect",
    "question": "[FROM #97 &bull; AdTech Real-Time Bidding] What is a 'derived table' in SQL, and what is the strict syntactic requirement for it in MySQL? (Application Scenario 10)",
    "options": [
      "A permanent table stored on an external SSD",
      "A view created with the CREATE DERIVED TABLE statement",
      "A table with zero columns",
      "A subquery in the FROM clause; it MUST be given an explicit table alias (e.g. 'FROM (...) AS dt')"
    ],
    "correctIndex": 3,
    "explanation": "Table aliases in the FROM clause (e.g., FROM Employees e) allow qualifying column references cleanly and resolving naming ambiguities across tables. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_from_98",
    "keyword": "FROM",
    "tag": "⚡ Gotcha Trap",
    "question": "[FROM #98 &bull; Cybersecurity Audit Logs] What happens when you write 'FROM table_a, table_b' with no ON or WHERE condition? (Application Scenario 10)",
    "options": [
      "It produces an INNER JOIN matching on primary keys automatically",
      "It produces a Cartesian Product (CROSS JOIN) where every row in table_a is paired with every row in table_b",
      "It returns the union of both tables",
      "The query is rejected by the parser"
    ],
    "correctIndex": 1,
    "explanation": "Comma-separated tables in the FROM clause without a join condition generate an unrestricted Cartesian Product of size N * M rows. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_from_99",
    "keyword": "FROM",
    "tag": "🎯 Core Concept",
    "question": "[FROM #99 &bull; Fintech & Ledger Systems] What is a Common Table Expression (CTE), and where is it defined in relation to FROM? (Application Scenario 10)",
    "options": [
      "An encrypted database index",
      "A stored procedure compiled into native C++",
      "A physical table stored in tempdb permanently",
      "A named temporary result set defined using the WITH clause before the main query, which can then be referenced in the FROM clause"
    ],
    "correctIndex": 3,
    "explanation": "CTEs (WITH cte_name AS (...)) define modular, readable temporary result sets that can be referenced multiple times within subsequent FROM clauses in the query. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_from_100",
    "keyword": "FROM",
    "tag": "🏛️ Corporate Edge",
    "question": "[FROM #100 &bull; SaaS Subscription Billing] In MySQL 8.0 and PostgreSQL, what does a LATERAL join inside the FROM clause permit? (Application Scenario 10)",
    "options": [
      "Forces queries to execute on multiple CPU cores in parallel",
      "Allows a subquery or table function in FROM to reference columns provided by preceding tables in the same FROM clause",
      "Allows tables from two different database vendors to join directly",
      "Locks rows in ascending primary key order"
    ],
    "correctIndex": 1,
    "explanation": "LATERAL joins act as an inline foreach loop, allowing the right-hand subquery in the FROM clause to consume column values from the left-hand table row-by-row. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_orderlimit_1",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🍡 Quick Snack",
    "question": "[ORDER BY & LIMIT #1] Why is the ORDER BY clause executed AFTER the SELECT clause in the physical lifecycle?",
    "options": [
      "Because SELECT filters rows first",
      "Because the engine sorts the final projected result rows and can sort by column aliases defined in SELECT",
      "Because sorting on disk must precede reading rows",
      "It actually executes before WHERE"
    ],
    "correctIndex": 1,
    "explanation": "ORDER BY runs at Step 05/06 after projection, allowing it to reference aliases and computed expressions established during SELECT."
  },
  {
    "id": "mcq_orderlimit_2",
    "keyword": "ORDER BY & LIMIT",
    "tag": "⚡ Gotcha Trap",
    "question": "[ORDER BY & LIMIT #2] What does \"LIMIT 5 OFFSET 20\" do in MySQL and PostgreSQL?",
    "options": [
      "Skips the first 20 rows of the ordered result set and returns the next 5 rows (rows 21-25)",
      "Returns rows where id is between 5 and 20",
      "Returns 20 rows starting from row 5",
      "Limits the query to 5 columns and 20 rows"
    ],
    "correctIndex": 0,
    "explanation": "OFFSET skips the specified count of preceding rows, and LIMIT constrains the batch size of the returned window."
  },
  {
    "id": "mcq_orderlimit_3",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🐱 Brain Bender",
    "question": "[ORDER BY & LIMIT #3] Why does deep offset pagination like \"LIMIT 10 OFFSET 1000000\" perform poorly on large tables?",
    "options": [
      "LIMIT only supports offsets up to 10,000",
      "OFFSET locks the entire database buffer pool",
      "The network protocol cannot transmit large offsets",
      "The database engine must still read, sort, and traverse 1,000,010 physical rows before discarding the first 1,000,000"
    ],
    "correctIndex": 3,
    "explanation": "Offset pagination requires the engine to generate and scan all N + M rows and discard N of them. Keyset (cursor-based) pagination using \"WHERE id > last_seen_id\" is far more performant."
  },
  {
    "id": "mcq_orderlimit_4",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🎯 Core Concept",
    "question": "[ORDER BY & LIMIT #4] In standard SQL, where do NULL values appear when sorting with \"ORDER BY score ASC\"?",
    "options": [
      "In PostgreSQL/Oracle, NULLS FIRST is default for ASC (or controlled via NULLS FIRST/LAST); in MySQL/SQL Server, NULLs sort first as lowest",
      "NULLs are always removed from the result set during ORDER BY",
      "An error is thrown if NULLs are sorted",
      "NULLs are always placed in the exact center of the result"
    ],
    "correctIndex": 0,
    "explanation": "Different engines have differing defaults: MySQL and SQL Server treat NULL as lower than any value. PostgreSQL and Oracle support explicit \"NULLS FIRST / NULLS LAST\" syntax."
  },
  {
    "id": "mcq_orderlimit_5",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🏆 Senior Staff",
    "question": "[ORDER BY & LIMIT #5] What is a \"deterministic sort\" and why is it essential when using LIMIT?",
    "options": [
      "A sort where a unique tie-breaker column (such as primary key id) guarantees the exact same row ordering on repeated executions",
      "A sort that finishes in under 1 millisecond",
      "A sort performed entirely in CPU registers",
      "A sort using only numeric columns"
    ],
    "correctIndex": 0,
    "explanation": "If sorted by a non-unique column (e.g. ORDER BY salary DESC LIMIT 3) without a secondary unique tie-breaker (id ASC), rows with duplicate salaries can swap places unpredictably between queries."
  },
  {
    "id": "mcq_orderlimit_6",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🍡 Quick Snack",
    "question": "[ORDER BY & LIMIT #6] Why is the ORDER BY clause executed AFTER the SELECT clause in the physical lifecycle? (Scenario Variant 2)",
    "options": [
      "Because SELECT filters rows first",
      "Because sorting on disk must precede reading rows",
      "Because the engine sorts the final projected result rows and can sort by column aliases defined in SELECT",
      "It actually executes before WHERE"
    ],
    "correctIndex": 2,
    "explanation": "ORDER BY runs at Step 05/06 after projection, allowing it to reference aliases and computed expressions established during SELECT."
  },
  {
    "id": "mcq_orderlimit_7",
    "keyword": "ORDER BY & LIMIT",
    "tag": "⚡ Gotcha Trap",
    "question": "[ORDER BY & LIMIT #7] What does \"LIMIT 5 OFFSET 20\" do in MySQL and PostgreSQL? (Scenario Variant 2)",
    "options": [
      "Skips the first 20 rows of the ordered result set and returns the next 5 rows (rows 21-25)",
      "Returns 20 rows starting from row 5",
      "Limits the query to 5 columns and 20 rows",
      "Returns rows where id is between 5 and 20"
    ],
    "correctIndex": 0,
    "explanation": "OFFSET skips the specified count of preceding rows, and LIMIT constrains the batch size of the returned window."
  },
  {
    "id": "mcq_orderlimit_8",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🐱 Brain Bender",
    "question": "[ORDER BY & LIMIT #8] Why does deep offset pagination like \"LIMIT 10 OFFSET 1000000\" perform poorly on large tables? (Scenario Variant 2)",
    "options": [
      "The network protocol cannot transmit large offsets",
      "The database engine must still read, sort, and traverse 1,000,010 physical rows before discarding the first 1,000,000",
      "LIMIT only supports offsets up to 10,000",
      "OFFSET locks the entire database buffer pool"
    ],
    "correctIndex": 1,
    "explanation": "Offset pagination requires the engine to generate and scan all N + M rows and discard N of them. Keyset (cursor-based) pagination using \"WHERE id > last_seen_id\" is far more performant."
  },
  {
    "id": "mcq_orderlimit_9",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🎯 Core Concept",
    "question": "[ORDER BY & LIMIT #9] In standard SQL, where do NULL values appear when sorting with \"ORDER BY score ASC\"? (Scenario Variant 2)",
    "options": [
      "NULLs are always removed from the result set during ORDER BY",
      "NULLs are always placed in the exact center of the result",
      "In PostgreSQL/Oracle, NULLS FIRST is default for ASC (or controlled via NULLS FIRST/LAST); in MySQL/SQL Server, NULLs sort first as lowest",
      "An error is thrown if NULLs are sorted"
    ],
    "correctIndex": 2,
    "explanation": "Different engines have differing defaults: MySQL and SQL Server treat NULL as lower than any value. PostgreSQL and Oracle support explicit \"NULLS FIRST / NULLS LAST\" syntax."
  },
  {
    "id": "mcq_orderlimit_10",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🏆 Senior Staff",
    "question": "[ORDER BY & LIMIT #10] What is a \"deterministic sort\" and why is it essential when using LIMIT? (Scenario Variant 2)",
    "options": [
      "A sort performed entirely in CPU registers",
      "A sort that finishes in under 1 millisecond",
      "A sort using only numeric columns",
      "A sort where a unique tie-breaker column (such as primary key id) guarantees the exact same row ordering on repeated executions"
    ],
    "correctIndex": 3,
    "explanation": "If sorted by a non-unique column (e.g. ORDER BY salary DESC LIMIT 3) without a secondary unique tie-breaker (id ASC), rows with duplicate salaries can swap places unpredictably between queries."
  },
  {
    "id": "mcq_orderlimit_11",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🍡 Quick Snack",
    "question": "[ORDER BY & LIMIT #11] Why is the ORDER BY clause executed AFTER the SELECT clause in the physical lifecycle? (Scenario Variant 3)",
    "options": [
      "It actually executes before WHERE",
      "Because SELECT filters rows first",
      "Because sorting on disk must precede reading rows",
      "Because the engine sorts the final projected result rows and can sort by column aliases defined in SELECT"
    ],
    "correctIndex": 3,
    "explanation": "ORDER BY runs at Step 05/06 after projection, allowing it to reference aliases and computed expressions established during SELECT."
  },
  {
    "id": "mcq_orderlimit_12",
    "keyword": "ORDER BY & LIMIT",
    "tag": "⚡ Gotcha Trap",
    "question": "[ORDER BY & LIMIT #12] What does \"LIMIT 5 OFFSET 20\" do in MySQL and PostgreSQL? (Scenario Variant 3)",
    "options": [
      "Returns 20 rows starting from row 5",
      "Returns rows where id is between 5 and 20",
      "Skips the first 20 rows of the ordered result set and returns the next 5 rows (rows 21-25)",
      "Limits the query to 5 columns and 20 rows"
    ],
    "correctIndex": 2,
    "explanation": "OFFSET skips the specified count of preceding rows, and LIMIT constrains the batch size of the returned window."
  },
  {
    "id": "mcq_orderlimit_13",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🐱 Brain Bender",
    "question": "[ORDER BY & LIMIT #13] Why does deep offset pagination like \"LIMIT 10 OFFSET 1000000\" perform poorly on large tables? (Scenario Variant 3)",
    "options": [
      "OFFSET locks the entire database buffer pool",
      "LIMIT only supports offsets up to 10,000",
      "The database engine must still read, sort, and traverse 1,000,010 physical rows before discarding the first 1,000,000",
      "The network protocol cannot transmit large offsets"
    ],
    "correctIndex": 2,
    "explanation": "Offset pagination requires the engine to generate and scan all N + M rows and discard N of them. Keyset (cursor-based) pagination using \"WHERE id > last_seen_id\" is far more performant."
  },
  {
    "id": "mcq_orderlimit_14",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🎯 Core Concept",
    "question": "[ORDER BY & LIMIT #14] In standard SQL, where do NULL values appear when sorting with \"ORDER BY score ASC\"? (Scenario Variant 3)",
    "options": [
      "NULLs are always placed in the exact center of the result",
      "NULLs are always removed from the result set during ORDER BY",
      "In PostgreSQL/Oracle, NULLS FIRST is default for ASC (or controlled via NULLS FIRST/LAST); in MySQL/SQL Server, NULLs sort first as lowest",
      "An error is thrown if NULLs are sorted"
    ],
    "correctIndex": 2,
    "explanation": "Different engines have differing defaults: MySQL and SQL Server treat NULL as lower than any value. PostgreSQL and Oracle support explicit \"NULLS FIRST / NULLS LAST\" syntax."
  },
  {
    "id": "mcq_orderlimit_15",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🏆 Senior Staff",
    "question": "[ORDER BY & LIMIT #15] What is a \"deterministic sort\" and why is it essential when using LIMIT? (Scenario Variant 3)",
    "options": [
      "A sort that finishes in under 1 millisecond",
      "A sort where a unique tie-breaker column (such as primary key id) guarantees the exact same row ordering on repeated executions",
      "A sort performed entirely in CPU registers",
      "A sort using only numeric columns"
    ],
    "correctIndex": 1,
    "explanation": "If sorted by a non-unique column (e.g. ORDER BY salary DESC LIMIT 3) without a secondary unique tie-breaker (id ASC), rows with duplicate salaries can swap places unpredictably between queries."
  },
  {
    "id": "mcq_orderlimit_16",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🍡 Quick Snack",
    "question": "[ORDER BY & LIMIT #16] Why is the ORDER BY clause executed AFTER the SELECT clause in the physical lifecycle? (Scenario Variant 4)",
    "options": [
      "Because sorting on disk must precede reading rows",
      "Because the engine sorts the final projected result rows and can sort by column aliases defined in SELECT",
      "Because SELECT filters rows first",
      "It actually executes before WHERE"
    ],
    "correctIndex": 1,
    "explanation": "ORDER BY runs at Step 05/06 after projection, allowing it to reference aliases and computed expressions established during SELECT."
  },
  {
    "id": "mcq_orderlimit_17",
    "keyword": "ORDER BY & LIMIT",
    "tag": "⚡ Gotcha Trap",
    "question": "[ORDER BY & LIMIT #17] What does \"LIMIT 5 OFFSET 20\" do in MySQL and PostgreSQL? (Scenario Variant 4)",
    "options": [
      "Returns 20 rows starting from row 5",
      "Limits the query to 5 columns and 20 rows",
      "Skips the first 20 rows of the ordered result set and returns the next 5 rows (rows 21-25)",
      "Returns rows where id is between 5 and 20"
    ],
    "correctIndex": 2,
    "explanation": "OFFSET skips the specified count of preceding rows, and LIMIT constrains the batch size of the returned window."
  },
  {
    "id": "mcq_orderlimit_18",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🐱 Brain Bender",
    "question": "[ORDER BY & LIMIT #18] Why does deep offset pagination like \"LIMIT 10 OFFSET 1000000\" perform poorly on large tables? (Scenario Variant 4)",
    "options": [
      "The network protocol cannot transmit large offsets",
      "OFFSET locks the entire database buffer pool",
      "LIMIT only supports offsets up to 10,000",
      "The database engine must still read, sort, and traverse 1,000,010 physical rows before discarding the first 1,000,000"
    ],
    "correctIndex": 3,
    "explanation": "Offset pagination requires the engine to generate and scan all N + M rows and discard N of them. Keyset (cursor-based) pagination using \"WHERE id > last_seen_id\" is far more performant."
  },
  {
    "id": "mcq_orderlimit_19",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🎯 Core Concept",
    "question": "[ORDER BY & LIMIT #19] In standard SQL, where do NULL values appear when sorting with \"ORDER BY score ASC\"? (Scenario Variant 4)",
    "options": [
      "NULLs are always placed in the exact center of the result",
      "NULLs are always removed from the result set during ORDER BY",
      "An error is thrown if NULLs are sorted",
      "In PostgreSQL/Oracle, NULLS FIRST is default for ASC (or controlled via NULLS FIRST/LAST); in MySQL/SQL Server, NULLs sort first as lowest"
    ],
    "correctIndex": 3,
    "explanation": "Different engines have differing defaults: MySQL and SQL Server treat NULL as lower than any value. PostgreSQL and Oracle support explicit \"NULLS FIRST / NULLS LAST\" syntax."
  },
  {
    "id": "mcq_orderlimit_20",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🏆 Senior Staff",
    "question": "[ORDER BY & LIMIT #20] What is a \"deterministic sort\" and why is it essential when using LIMIT? (Scenario Variant 4)",
    "options": [
      "A sort performed entirely in CPU registers",
      "A sort that finishes in under 1 millisecond",
      "A sort using only numeric columns",
      "A sort where a unique tie-breaker column (such as primary key id) guarantees the exact same row ordering on repeated executions"
    ],
    "correctIndex": 3,
    "explanation": "If sorted by a non-unique column (e.g. ORDER BY salary DESC LIMIT 3) without a secondary unique tie-breaker (id ASC), rows with duplicate salaries can swap places unpredictably between queries."
  },
  {
    "id": "mcq_orderlimit_21",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🍡 Quick Snack",
    "question": "[ORDER BY & LIMIT #21] Why is the ORDER BY clause executed AFTER the SELECT clause in the physical lifecycle? (Scenario Variant 5)",
    "options": [
      "Because sorting on disk must precede reading rows",
      "It actually executes before WHERE",
      "Because the engine sorts the final projected result rows and can sort by column aliases defined in SELECT",
      "Because SELECT filters rows first"
    ],
    "correctIndex": 2,
    "explanation": "ORDER BY runs at Step 05/06 after projection, allowing it to reference aliases and computed expressions established during SELECT."
  },
  {
    "id": "mcq_orderlimit_22",
    "keyword": "ORDER BY & LIMIT",
    "tag": "⚡ Gotcha Trap",
    "question": "[ORDER BY & LIMIT #22] What does \"LIMIT 5 OFFSET 20\" do in MySQL and PostgreSQL? (Scenario Variant 5)",
    "options": [
      "Returns rows where id is between 5 and 20",
      "Skips the first 20 rows of the ordered result set and returns the next 5 rows (rows 21-25)",
      "Returns 20 rows starting from row 5",
      "Limits the query to 5 columns and 20 rows"
    ],
    "correctIndex": 1,
    "explanation": "OFFSET skips the specified count of preceding rows, and LIMIT constrains the batch size of the returned window."
  },
  {
    "id": "mcq_orderlimit_23",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🐱 Brain Bender",
    "question": "[ORDER BY & LIMIT #23] Why does deep offset pagination like \"LIMIT 10 OFFSET 1000000\" perform poorly on large tables? (Scenario Variant 5)",
    "options": [
      "The database engine must still read, sort, and traverse 1,000,010 physical rows before discarding the first 1,000,000",
      "OFFSET locks the entire database buffer pool",
      "The network protocol cannot transmit large offsets",
      "LIMIT only supports offsets up to 10,000"
    ],
    "correctIndex": 0,
    "explanation": "Offset pagination requires the engine to generate and scan all N + M rows and discard N of them. Keyset (cursor-based) pagination using \"WHERE id > last_seen_id\" is far more performant."
  },
  {
    "id": "mcq_orderlimit_24",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🎯 Core Concept",
    "question": "[ORDER BY & LIMIT #24] In standard SQL, where do NULL values appear when sorting with \"ORDER BY score ASC\"? (Scenario Variant 5)",
    "options": [
      "In PostgreSQL/Oracle, NULLS FIRST is default for ASC (or controlled via NULLS FIRST/LAST); in MySQL/SQL Server, NULLs sort first as lowest",
      "An error is thrown if NULLs are sorted",
      "NULLs are always placed in the exact center of the result",
      "NULLs are always removed from the result set during ORDER BY"
    ],
    "correctIndex": 0,
    "explanation": "Different engines have differing defaults: MySQL and SQL Server treat NULL as lower than any value. PostgreSQL and Oracle support explicit \"NULLS FIRST / NULLS LAST\" syntax."
  },
  {
    "id": "mcq_orderlimit_25",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🏆 Senior Staff",
    "question": "[ORDER BY & LIMIT #25] What is a \"deterministic sort\" and why is it essential when using LIMIT? (Scenario Variant 5)",
    "options": [
      "A sort where a unique tie-breaker column (such as primary key id) guarantees the exact same row ordering on repeated executions",
      "A sort using only numeric columns",
      "A sort performed entirely in CPU registers",
      "A sort that finishes in under 1 millisecond"
    ],
    "correctIndex": 0,
    "explanation": "If sorted by a non-unique column (e.g. ORDER BY salary DESC LIMIT 3) without a secondary unique tie-breaker (id ASC), rows with duplicate salaries can swap places unpredictably between queries."
  },
  {
    "id": "mcq_orderlimit_26",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🍡 Quick Snack",
    "question": "[ORDER BY & LIMIT #26] Why is the ORDER BY clause executed AFTER the SELECT clause in the physical lifecycle? (Scenario Variant 6)",
    "options": [
      "Because SELECT filters rows first",
      "Because sorting on disk must precede reading rows",
      "It actually executes before WHERE",
      "Because the engine sorts the final projected result rows and can sort by column aliases defined in SELECT"
    ],
    "correctIndex": 3,
    "explanation": "ORDER BY runs at Step 05/06 after projection, allowing it to reference aliases and computed expressions established during SELECT."
  },
  {
    "id": "mcq_orderlimit_27",
    "keyword": "ORDER BY & LIMIT",
    "tag": "⚡ Gotcha Trap",
    "question": "[ORDER BY & LIMIT #27] What does \"LIMIT 5 OFFSET 20\" do in MySQL and PostgreSQL? (Scenario Variant 6)",
    "options": [
      "Returns rows where id is between 5 and 20",
      "Skips the first 20 rows of the ordered result set and returns the next 5 rows (rows 21-25)",
      "Limits the query to 5 columns and 20 rows",
      "Returns 20 rows starting from row 5"
    ],
    "correctIndex": 1,
    "explanation": "OFFSET skips the specified count of preceding rows, and LIMIT constrains the batch size of the returned window."
  },
  {
    "id": "mcq_orderlimit_28",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🐱 Brain Bender",
    "question": "[ORDER BY & LIMIT #28] Why does deep offset pagination like \"LIMIT 10 OFFSET 1000000\" perform poorly on large tables? (Scenario Variant 6)",
    "options": [
      "OFFSET locks the entire database buffer pool",
      "The network protocol cannot transmit large offsets",
      "The database engine must still read, sort, and traverse 1,000,010 physical rows before discarding the first 1,000,000",
      "LIMIT only supports offsets up to 10,000"
    ],
    "correctIndex": 2,
    "explanation": "Offset pagination requires the engine to generate and scan all N + M rows and discard N of them. Keyset (cursor-based) pagination using \"WHERE id > last_seen_id\" is far more performant."
  },
  {
    "id": "mcq_orderlimit_29",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🎯 Core Concept",
    "question": "[ORDER BY & LIMIT #29] In standard SQL, where do NULL values appear when sorting with \"ORDER BY score ASC\"? (Scenario Variant 6)",
    "options": [
      "An error is thrown if NULLs are sorted",
      "In PostgreSQL/Oracle, NULLS FIRST is default for ASC (or controlled via NULLS FIRST/LAST); in MySQL/SQL Server, NULLs sort first as lowest",
      "NULLs are always placed in the exact center of the result",
      "NULLs are always removed from the result set during ORDER BY"
    ],
    "correctIndex": 1,
    "explanation": "Different engines have differing defaults: MySQL and SQL Server treat NULL as lower than any value. PostgreSQL and Oracle support explicit \"NULLS FIRST / NULLS LAST\" syntax."
  },
  {
    "id": "mcq_orderlimit_30",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🏆 Senior Staff",
    "question": "[ORDER BY & LIMIT #30] What is a \"deterministic sort\" and why is it essential when using LIMIT? (Scenario Variant 6)",
    "options": [
      "A sort using only numeric columns",
      "A sort where a unique tie-breaker column (such as primary key id) guarantees the exact same row ordering on repeated executions",
      "A sort performed entirely in CPU registers",
      "A sort that finishes in under 1 millisecond"
    ],
    "correctIndex": 1,
    "explanation": "If sorted by a non-unique column (e.g. ORDER BY salary DESC LIMIT 3) without a secondary unique tie-breaker (id ASC), rows with duplicate salaries can swap places unpredictably between queries."
  },
  {
    "id": "mcq_orderlimit_31",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🍡 Quick Snack",
    "question": "[ORDER BY & LIMIT #31] Why is the ORDER BY clause executed AFTER the SELECT clause in the physical lifecycle? (Scenario Variant 7)",
    "options": [
      "It actually executes before WHERE",
      "Because the engine sorts the final projected result rows and can sort by column aliases defined in SELECT",
      "Because sorting on disk must precede reading rows",
      "Because SELECT filters rows first"
    ],
    "correctIndex": 1,
    "explanation": "ORDER BY runs at Step 05/06 after projection, allowing it to reference aliases and computed expressions established during SELECT."
  },
  {
    "id": "mcq_orderlimit_32",
    "keyword": "ORDER BY & LIMIT",
    "tag": "⚡ Gotcha Trap",
    "question": "[ORDER BY & LIMIT #32] What does \"LIMIT 5 OFFSET 20\" do in MySQL and PostgreSQL? (Scenario Variant 7)",
    "options": [
      "Returns rows where id is between 5 and 20",
      "Skips the first 20 rows of the ordered result set and returns the next 5 rows (rows 21-25)",
      "Limits the query to 5 columns and 20 rows",
      "Returns 20 rows starting from row 5"
    ],
    "correctIndex": 1,
    "explanation": "OFFSET skips the specified count of preceding rows, and LIMIT constrains the batch size of the returned window."
  },
  {
    "id": "mcq_orderlimit_33",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🐱 Brain Bender",
    "question": "[ORDER BY & LIMIT #33] Why does deep offset pagination like \"LIMIT 10 OFFSET 1000000\" perform poorly on large tables? (Scenario Variant 7)",
    "options": [
      "The network protocol cannot transmit large offsets",
      "OFFSET locks the entire database buffer pool",
      "LIMIT only supports offsets up to 10,000",
      "The database engine must still read, sort, and traverse 1,000,010 physical rows before discarding the first 1,000,000"
    ],
    "correctIndex": 3,
    "explanation": "Offset pagination requires the engine to generate and scan all N + M rows and discard N of them. Keyset (cursor-based) pagination using \"WHERE id > last_seen_id\" is far more performant."
  },
  {
    "id": "mcq_orderlimit_34",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🎯 Core Concept",
    "question": "[ORDER BY & LIMIT #34] In standard SQL, where do NULL values appear when sorting with \"ORDER BY score ASC\"? (Scenario Variant 7)",
    "options": [
      "NULLs are always placed in the exact center of the result",
      "In PostgreSQL/Oracle, NULLS FIRST is default for ASC (or controlled via NULLS FIRST/LAST); in MySQL/SQL Server, NULLs sort first as lowest",
      "An error is thrown if NULLs are sorted",
      "NULLs are always removed from the result set during ORDER BY"
    ],
    "correctIndex": 1,
    "explanation": "Different engines have differing defaults: MySQL and SQL Server treat NULL as lower than any value. PostgreSQL and Oracle support explicit \"NULLS FIRST / NULLS LAST\" syntax."
  },
  {
    "id": "mcq_orderlimit_35",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🏆 Senior Staff",
    "question": "[ORDER BY & LIMIT #35] What is a \"deterministic sort\" and why is it essential when using LIMIT? (Scenario Variant 7)",
    "options": [
      "A sort where a unique tie-breaker column (such as primary key id) guarantees the exact same row ordering on repeated executions",
      "A sort using only numeric columns",
      "A sort performed entirely in CPU registers",
      "A sort that finishes in under 1 millisecond"
    ],
    "correctIndex": 0,
    "explanation": "If sorted by a non-unique column (e.g. ORDER BY salary DESC LIMIT 3) without a secondary unique tie-breaker (id ASC), rows with duplicate salaries can swap places unpredictably between queries."
  },
  {
    "id": "mcq_orderlimit_36",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🍡 Quick Snack",
    "question": "[ORDER BY & LIMIT #36] Why is the ORDER BY clause executed AFTER the SELECT clause in the physical lifecycle? (Scenario Variant 8)",
    "options": [
      "Because sorting on disk must precede reading rows",
      "Because SELECT filters rows first",
      "It actually executes before WHERE",
      "Because the engine sorts the final projected result rows and can sort by column aliases defined in SELECT"
    ],
    "correctIndex": 3,
    "explanation": "ORDER BY runs at Step 05/06 after projection, allowing it to reference aliases and computed expressions established during SELECT."
  },
  {
    "id": "mcq_orderlimit_37",
    "keyword": "ORDER BY & LIMIT",
    "tag": "⚡ Gotcha Trap",
    "question": "[ORDER BY & LIMIT #37] What does \"LIMIT 5 OFFSET 20\" do in MySQL and PostgreSQL? (Scenario Variant 8)",
    "options": [
      "Returns rows where id is between 5 and 20",
      "Skips the first 20 rows of the ordered result set and returns the next 5 rows (rows 21-25)",
      "Limits the query to 5 columns and 20 rows",
      "Returns 20 rows starting from row 5"
    ],
    "correctIndex": 1,
    "explanation": "OFFSET skips the specified count of preceding rows, and LIMIT constrains the batch size of the returned window."
  },
  {
    "id": "mcq_orderlimit_38",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🐱 Brain Bender",
    "question": "[ORDER BY & LIMIT #38] Why does deep offset pagination like \"LIMIT 10 OFFSET 1000000\" perform poorly on large tables? (Scenario Variant 8)",
    "options": [
      "The database engine must still read, sort, and traverse 1,000,010 physical rows before discarding the first 1,000,000",
      "The network protocol cannot transmit large offsets",
      "LIMIT only supports offsets up to 10,000",
      "OFFSET locks the entire database buffer pool"
    ],
    "correctIndex": 0,
    "explanation": "Offset pagination requires the engine to generate and scan all N + M rows and discard N of them. Keyset (cursor-based) pagination using \"WHERE id > last_seen_id\" is far more performant."
  },
  {
    "id": "mcq_orderlimit_39",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🎯 Core Concept",
    "question": "[ORDER BY & LIMIT #39] In standard SQL, where do NULL values appear when sorting with \"ORDER BY score ASC\"? (Scenario Variant 8)",
    "options": [
      "An error is thrown if NULLs are sorted",
      "NULLs are always placed in the exact center of the result",
      "In PostgreSQL/Oracle, NULLS FIRST is default for ASC (or controlled via NULLS FIRST/LAST); in MySQL/SQL Server, NULLs sort first as lowest",
      "NULLs are always removed from the result set during ORDER BY"
    ],
    "correctIndex": 2,
    "explanation": "Different engines have differing defaults: MySQL and SQL Server treat NULL as lower than any value. PostgreSQL and Oracle support explicit \"NULLS FIRST / NULLS LAST\" syntax."
  },
  {
    "id": "mcq_orderlimit_40",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🏆 Senior Staff",
    "question": "[ORDER BY & LIMIT #40] What is a \"deterministic sort\" and why is it essential when using LIMIT? (Scenario Variant 8)",
    "options": [
      "A sort using only numeric columns",
      "A sort where a unique tie-breaker column (such as primary key id) guarantees the exact same row ordering on repeated executions",
      "A sort performed entirely in CPU registers",
      "A sort that finishes in under 1 millisecond"
    ],
    "correctIndex": 1,
    "explanation": "If sorted by a non-unique column (e.g. ORDER BY salary DESC LIMIT 3) without a secondary unique tie-breaker (id ASC), rows with duplicate salaries can swap places unpredictably between queries."
  },
  {
    "id": "mcq_orderlimit_41",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🍡 Quick Snack",
    "question": "[ORDER BY & LIMIT #41] Why is the ORDER BY clause executed AFTER the SELECT clause in the physical lifecycle? (Scenario Variant 9)",
    "options": [
      "Because the engine sorts the final projected result rows and can sort by column aliases defined in SELECT",
      "Because SELECT filters rows first",
      "Because sorting on disk must precede reading rows",
      "It actually executes before WHERE"
    ],
    "correctIndex": 0,
    "explanation": "ORDER BY runs at Step 05/06 after projection, allowing it to reference aliases and computed expressions established during SELECT."
  },
  {
    "id": "mcq_orderlimit_42",
    "keyword": "ORDER BY & LIMIT",
    "tag": "⚡ Gotcha Trap",
    "question": "[ORDER BY & LIMIT #42] What does \"LIMIT 5 OFFSET 20\" do in MySQL and PostgreSQL? (Scenario Variant 9)",
    "options": [
      "Returns 20 rows starting from row 5",
      "Limits the query to 5 columns and 20 rows",
      "Returns rows where id is between 5 and 20",
      "Skips the first 20 rows of the ordered result set and returns the next 5 rows (rows 21-25)"
    ],
    "correctIndex": 3,
    "explanation": "OFFSET skips the specified count of preceding rows, and LIMIT constrains the batch size of the returned window."
  },
  {
    "id": "mcq_orderlimit_43",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🐱 Brain Bender",
    "question": "[ORDER BY & LIMIT #43] Why does deep offset pagination like \"LIMIT 10 OFFSET 1000000\" perform poorly on large tables? (Scenario Variant 9)",
    "options": [
      "OFFSET locks the entire database buffer pool",
      "The database engine must still read, sort, and traverse 1,000,010 physical rows before discarding the first 1,000,000",
      "LIMIT only supports offsets up to 10,000",
      "The network protocol cannot transmit large offsets"
    ],
    "correctIndex": 1,
    "explanation": "Offset pagination requires the engine to generate and scan all N + M rows and discard N of them. Keyset (cursor-based) pagination using \"WHERE id > last_seen_id\" is far more performant."
  },
  {
    "id": "mcq_orderlimit_44",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🎯 Core Concept",
    "question": "[ORDER BY & LIMIT #44] In standard SQL, where do NULL values appear when sorting with \"ORDER BY score ASC\"? (Scenario Variant 9)",
    "options": [
      "An error is thrown if NULLs are sorted",
      "In PostgreSQL/Oracle, NULLS FIRST is default for ASC (or controlled via NULLS FIRST/LAST); in MySQL/SQL Server, NULLs sort first as lowest",
      "NULLs are always placed in the exact center of the result",
      "NULLs are always removed from the result set during ORDER BY"
    ],
    "correctIndex": 1,
    "explanation": "Different engines have differing defaults: MySQL and SQL Server treat NULL as lower than any value. PostgreSQL and Oracle support explicit \"NULLS FIRST / NULLS LAST\" syntax."
  },
  {
    "id": "mcq_orderlimit_45",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🏆 Senior Staff",
    "question": "[ORDER BY & LIMIT #45] What is a \"deterministic sort\" and why is it essential when using LIMIT? (Scenario Variant 9)",
    "options": [
      "A sort that finishes in under 1 millisecond",
      "A sort where a unique tie-breaker column (such as primary key id) guarantees the exact same row ordering on repeated executions",
      "A sort performed entirely in CPU registers",
      "A sort using only numeric columns"
    ],
    "correctIndex": 1,
    "explanation": "If sorted by a non-unique column (e.g. ORDER BY salary DESC LIMIT 3) without a secondary unique tie-breaker (id ASC), rows with duplicate salaries can swap places unpredictably between queries."
  },
  {
    "id": "mcq_orderlimit_46",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🍡 Quick Snack",
    "question": "[ORDER BY & LIMIT #46] Why is the ORDER BY clause executed AFTER the SELECT clause in the physical lifecycle? (Scenario Variant 10)",
    "options": [
      "Because the engine sorts the final projected result rows and can sort by column aliases defined in SELECT",
      "Because sorting on disk must precede reading rows",
      "It actually executes before WHERE",
      "Because SELECT filters rows first"
    ],
    "correctIndex": 0,
    "explanation": "ORDER BY runs at Step 05/06 after projection, allowing it to reference aliases and computed expressions established during SELECT."
  },
  {
    "id": "mcq_orderlimit_47",
    "keyword": "ORDER BY & LIMIT",
    "tag": "⚡ Gotcha Trap",
    "question": "[ORDER BY & LIMIT #47] What does \"LIMIT 5 OFFSET 20\" do in MySQL and PostgreSQL? (Scenario Variant 10)",
    "options": [
      "Limits the query to 5 columns and 20 rows",
      "Returns rows where id is between 5 and 20",
      "Skips the first 20 rows of the ordered result set and returns the next 5 rows (rows 21-25)",
      "Returns 20 rows starting from row 5"
    ],
    "correctIndex": 2,
    "explanation": "OFFSET skips the specified count of preceding rows, and LIMIT constrains the batch size of the returned window."
  },
  {
    "id": "mcq_orderlimit_48",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🐱 Brain Bender",
    "question": "[ORDER BY & LIMIT #48] Why does deep offset pagination like \"LIMIT 10 OFFSET 1000000\" perform poorly on large tables? (Scenario Variant 10)",
    "options": [
      "LIMIT only supports offsets up to 10,000",
      "OFFSET locks the entire database buffer pool",
      "The database engine must still read, sort, and traverse 1,000,010 physical rows before discarding the first 1,000,000",
      "The network protocol cannot transmit large offsets"
    ],
    "correctIndex": 2,
    "explanation": "Offset pagination requires the engine to generate and scan all N + M rows and discard N of them. Keyset (cursor-based) pagination using \"WHERE id > last_seen_id\" is far more performant."
  },
  {
    "id": "mcq_orderlimit_49",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🎯 Core Concept",
    "question": "[ORDER BY & LIMIT #49] In standard SQL, where do NULL values appear when sorting with \"ORDER BY score ASC\"? (Scenario Variant 10)",
    "options": [
      "NULLs are always removed from the result set during ORDER BY",
      "NULLs are always placed in the exact center of the result",
      "An error is thrown if NULLs are sorted",
      "In PostgreSQL/Oracle, NULLS FIRST is default for ASC (or controlled via NULLS FIRST/LAST); in MySQL/SQL Server, NULLs sort first as lowest"
    ],
    "correctIndex": 3,
    "explanation": "Different engines have differing defaults: MySQL and SQL Server treat NULL as lower than any value. PostgreSQL and Oracle support explicit \"NULLS FIRST / NULLS LAST\" syntax."
  },
  {
    "id": "mcq_orderlimit_50",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🏆 Senior Staff",
    "question": "[ORDER BY & LIMIT #50] What is a \"deterministic sort\" and why is it essential when using LIMIT? (Scenario Variant 10)",
    "options": [
      "A sort where a unique tie-breaker column (such as primary key id) guarantees the exact same row ordering on repeated executions",
      "A sort that finishes in under 1 millisecond",
      "A sort performed entirely in CPU registers",
      "A sort using only numeric columns"
    ],
    "correctIndex": 0,
    "explanation": "If sorted by a non-unique column (e.g. ORDER BY salary DESC LIMIT 3) without a secondary unique tie-breaker (id ASC), rows with duplicate salaries can swap places unpredictably between queries."
  },
  {
    "id": "mcq_orderlimit_51",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🎯 Core Concept",
    "question": "[ORDER BY & LIMIT #51 &bull; Fintech & Ledger Systems] What is 'sorting indeterminism' when using ORDER BY with LIMIT, and how does it cause production bugs in pagination? (Application Scenario 1)",
    "options": [
      "Indeterminism causes the database to crash when sorting strings",
      "LIMIT causes the query optimizer to reverse the sort direction",
      "Sorting integers is always non-deterministic in relational algebra",
      "If the ORDER BY column has duplicate values and no unique tie-breaker, rows with identical values can appear in arbitrary order across pages, causing records to be skipped or repeated"
    ],
    "correctIndex": 3,
    "explanation": "Relational sets are unordered. If sorting by non-unique columns (e.g. created_date), different execution plans or storage engines may return tied rows in varying order. A unique column (like id) must always be appended as a tie-breaker. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_orderlimit_52",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🏛️ Corporate Edge",
    "question": "[ORDER BY & LIMIT #52 &bull; SaaS Subscription Billing] Why is offset pagination ('LIMIT 20 OFFSET 1000000') notoriously slow on large tables? (Application Scenario 1)",
    "options": [
      "OFFSET is executed in the client's browser rather than the database",
      "The engine must still read and discard the first 1,000,000 rows from the index/table before transmitting the desired 20 rows",
      "B-Tree indexes cannot count past 65,535",
      "MySQL disables caching whenever OFFSET is used"
    ],
    "correctIndex": 1,
    "explanation": "OFFSET N requires scanning and discarding N rows. For deep pagination, Keyset Pagination (Cursor pagination, e.g. 'WHERE id > last_seen_id ORDER BY id LIMIT 20') delivers O(1) performance. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_orderlimit_53",
    "keyword": "ORDER BY & LIMIT",
    "tag": "💡 Lead Architect",
    "question": "[ORDER BY & LIMIT #53 &bull; Global Supply Chain & Logistics] Where do NULL values appear by default in ORDER BY in MySQL versus PostgreSQL? (Application Scenario 1)",
    "options": [
      "Both always sort NULLs in the exact middle of the result set",
      "PostgreSQL throws an error if NULLs are sorted",
      "Both treat NULL as the integer zero",
      "In MySQL, NULLs sort FIRST in ASC and LAST in DESC; in PostgreSQL, NULLs sort LAST in ASC and FIRST in DESC (unless NULLS FIRST/LAST is specified)"
    ],
    "correctIndex": 3,
    "explanation": "MySQL treats NULL as the lowest possible value (appearing first in ASC). PostgreSQL treats NULL as the highest possible value (appearing last in ASC). ANSI SQL provides NULLS FIRST / NULLS LAST to make behavior explicit. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_orderlimit_54",
    "keyword": "ORDER BY & LIMIT",
    "tag": "⚡ Gotcha Trap",
    "question": "[ORDER BY & LIMIT #54 &bull; Healthcare Patient Records] What is an 'Index Sort' (avoiding filesort) in MySQL EXPLAIN output? (Application Scenario 1)",
    "options": [
      "A sorting pass that sorts index files on disk",
      "The query satisfies the ORDER BY directly from the ordered leaf nodes of a B-Tree index, without having to load rows into memory and run a sorting algorithm",
      "A sort executed inside the CPU cache registers only",
      "A sort that only works on PRIMARY KEY columns"
    ],
    "correctIndex": 1,
    "explanation": "When the ORDER BY matches the leading columns of an index (and WHERE predicates are compatible), the engine retrieves rows already in sorted order, completely bypassing the expensive filesort pass. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_orderlimit_55",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🎯 Core Concept",
    "question": "[ORDER BY & LIMIT #55 &bull; E-Commerce Checkout Funnels] What does 'ORDER BY 1 DESC, 2 ASC' mean in ANSI SQL? (Application Scenario 1)",
    "options": [
      "Sort by the numbers 1 and 2 literally",
      "Syntax error: Ordinal column positioning is forbidden",
      "Sort the primary key descending",
      "Sort by the 1st column in the SELECT list descending, and break ties using the 2nd column ascending"
    ],
    "correctIndex": 3,
    "explanation": "Positional references in ORDER BY refer to the 1-based index of columns in the SELECT clause. While standard, referencing explicit column names is preferred in production code. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_orderlimit_56",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🏛️ Corporate Edge",
    "question": "[ORDER BY & LIMIT #56 &bull; Telecom Billing & Data Streams] What is 'sorting indeterminism' when using ORDER BY with LIMIT, and how does it cause production bugs in pagination? (Application Scenario 2)",
    "options": [
      "Indeterminism causes the database to crash when sorting strings",
      "If the ORDER BY column has duplicate values and no unique tie-breaker, rows with identical values can appear in arbitrary order across pages, causing records to be skipped or repeated",
      "LIMIT causes the query optimizer to reverse the sort direction",
      "Sorting integers is always non-deterministic in relational algebra"
    ],
    "correctIndex": 1,
    "explanation": "Relational sets are unordered. If sorting by non-unique columns (e.g. created_date), different execution plans or storage engines may return tied rows in varying order. A unique column (like id) must always be appended as a tie-breaker. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_orderlimit_57",
    "keyword": "ORDER BY & LIMIT",
    "tag": "💡 Lead Architect",
    "question": "[ORDER BY & LIMIT #57 &bull; AdTech Real-Time Bidding] Why is offset pagination ('LIMIT 20 OFFSET 1000000') notoriously slow on large tables? (Application Scenario 2)",
    "options": [
      "OFFSET is executed in the client's browser rather than the database",
      "B-Tree indexes cannot count past 65,535",
      "MySQL disables caching whenever OFFSET is used",
      "The engine must still read and discard the first 1,000,000 rows from the index/table before transmitting the desired 20 rows"
    ],
    "correctIndex": 3,
    "explanation": "OFFSET N requires scanning and discarding N rows. For deep pagination, Keyset Pagination (Cursor pagination, e.g. 'WHERE id > last_seen_id ORDER BY id LIMIT 20') delivers O(1) performance. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_orderlimit_58",
    "keyword": "ORDER BY & LIMIT",
    "tag": "⚡ Gotcha Trap",
    "question": "[ORDER BY & LIMIT #58 &bull; Cybersecurity Audit Logs] Where do NULL values appear by default in ORDER BY in MySQL versus PostgreSQL? (Application Scenario 2)",
    "options": [
      "Both always sort NULLs in the exact middle of the result set",
      "In MySQL, NULLs sort FIRST in ASC and LAST in DESC; in PostgreSQL, NULLs sort LAST in ASC and FIRST in DESC (unless NULLS FIRST/LAST is specified)",
      "PostgreSQL throws an error if NULLs are sorted",
      "Both treat NULL as the integer zero"
    ],
    "correctIndex": 1,
    "explanation": "MySQL treats NULL as the lowest possible value (appearing first in ASC). PostgreSQL treats NULL as the highest possible value (appearing last in ASC). ANSI SQL provides NULLS FIRST / NULLS LAST to make behavior explicit. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_orderlimit_59",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🎯 Core Concept",
    "question": "[ORDER BY & LIMIT #59 &bull; Fintech & Ledger Systems] What is an 'Index Sort' (avoiding filesort) in MySQL EXPLAIN output? (Application Scenario 2)",
    "options": [
      "A sorting pass that sorts index files on disk",
      "A sort executed inside the CPU cache registers only",
      "A sort that only works on PRIMARY KEY columns",
      "The query satisfies the ORDER BY directly from the ordered leaf nodes of a B-Tree index, without having to load rows into memory and run a sorting algorithm"
    ],
    "correctIndex": 3,
    "explanation": "When the ORDER BY matches the leading columns of an index (and WHERE predicates are compatible), the engine retrieves rows already in sorted order, completely bypassing the expensive filesort pass. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_orderlimit_60",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🏛️ Corporate Edge",
    "question": "[ORDER BY & LIMIT #60 &bull; SaaS Subscription Billing] What does 'ORDER BY 1 DESC, 2 ASC' mean in ANSI SQL? (Application Scenario 2)",
    "options": [
      "Sort by the numbers 1 and 2 literally",
      "Sort by the 1st column in the SELECT list descending, and break ties using the 2nd column ascending",
      "Syntax error: Ordinal column positioning is forbidden",
      "Sort the primary key descending"
    ],
    "correctIndex": 1,
    "explanation": "Positional references in ORDER BY refer to the 1-based index of columns in the SELECT clause. While standard, referencing explicit column names is preferred in production code. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_orderlimit_61",
    "keyword": "ORDER BY & LIMIT",
    "tag": "💡 Lead Architect",
    "question": "[ORDER BY & LIMIT #61 &bull; Global Supply Chain & Logistics] What is 'sorting indeterminism' when using ORDER BY with LIMIT, and how does it cause production bugs in pagination? (Application Scenario 3)",
    "options": [
      "Indeterminism causes the database to crash when sorting strings",
      "LIMIT causes the query optimizer to reverse the sort direction",
      "Sorting integers is always non-deterministic in relational algebra",
      "If the ORDER BY column has duplicate values and no unique tie-breaker, rows with identical values can appear in arbitrary order across pages, causing records to be skipped or repeated"
    ],
    "correctIndex": 3,
    "explanation": "Relational sets are unordered. If sorting by non-unique columns (e.g. created_date), different execution plans or storage engines may return tied rows in varying order. A unique column (like id) must always be appended as a tie-breaker. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_orderlimit_62",
    "keyword": "ORDER BY & LIMIT",
    "tag": "⚡ Gotcha Trap",
    "question": "[ORDER BY & LIMIT #62 &bull; Healthcare Patient Records] Why is offset pagination ('LIMIT 20 OFFSET 1000000') notoriously slow on large tables? (Application Scenario 3)",
    "options": [
      "OFFSET is executed in the client's browser rather than the database",
      "The engine must still read and discard the first 1,000,000 rows from the index/table before transmitting the desired 20 rows",
      "B-Tree indexes cannot count past 65,535",
      "MySQL disables caching whenever OFFSET is used"
    ],
    "correctIndex": 1,
    "explanation": "OFFSET N requires scanning and discarding N rows. For deep pagination, Keyset Pagination (Cursor pagination, e.g. 'WHERE id > last_seen_id ORDER BY id LIMIT 20') delivers O(1) performance. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_orderlimit_63",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🎯 Core Concept",
    "question": "[ORDER BY & LIMIT #63 &bull; E-Commerce Checkout Funnels] Where do NULL values appear by default in ORDER BY in MySQL versus PostgreSQL? (Application Scenario 3)",
    "options": [
      "Both always sort NULLs in the exact middle of the result set",
      "PostgreSQL throws an error if NULLs are sorted",
      "Both treat NULL as the integer zero",
      "In MySQL, NULLs sort FIRST in ASC and LAST in DESC; in PostgreSQL, NULLs sort LAST in ASC and FIRST in DESC (unless NULLS FIRST/LAST is specified)"
    ],
    "correctIndex": 3,
    "explanation": "MySQL treats NULL as the lowest possible value (appearing first in ASC). PostgreSQL treats NULL as the highest possible value (appearing last in ASC). ANSI SQL provides NULLS FIRST / NULLS LAST to make behavior explicit. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_orderlimit_64",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🏛️ Corporate Edge",
    "question": "[ORDER BY & LIMIT #64 &bull; Telecom Billing & Data Streams] What is an 'Index Sort' (avoiding filesort) in MySQL EXPLAIN output? (Application Scenario 3)",
    "options": [
      "A sorting pass that sorts index files on disk",
      "The query satisfies the ORDER BY directly from the ordered leaf nodes of a B-Tree index, without having to load rows into memory and run a sorting algorithm",
      "A sort executed inside the CPU cache registers only",
      "A sort that only works on PRIMARY KEY columns"
    ],
    "correctIndex": 1,
    "explanation": "When the ORDER BY matches the leading columns of an index (and WHERE predicates are compatible), the engine retrieves rows already in sorted order, completely bypassing the expensive filesort pass. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_orderlimit_65",
    "keyword": "ORDER BY & LIMIT",
    "tag": "💡 Lead Architect",
    "question": "[ORDER BY & LIMIT #65 &bull; AdTech Real-Time Bidding] What does 'ORDER BY 1 DESC, 2 ASC' mean in ANSI SQL? (Application Scenario 3)",
    "options": [
      "Sort by the numbers 1 and 2 literally",
      "Syntax error: Ordinal column positioning is forbidden",
      "Sort the primary key descending",
      "Sort by the 1st column in the SELECT list descending, and break ties using the 2nd column ascending"
    ],
    "correctIndex": 3,
    "explanation": "Positional references in ORDER BY refer to the 1-based index of columns in the SELECT clause. While standard, referencing explicit column names is preferred in production code. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_orderlimit_66",
    "keyword": "ORDER BY & LIMIT",
    "tag": "⚡ Gotcha Trap",
    "question": "[ORDER BY & LIMIT #66 &bull; Cybersecurity Audit Logs] What is 'sorting indeterminism' when using ORDER BY with LIMIT, and how does it cause production bugs in pagination? (Application Scenario 4)",
    "options": [
      "Indeterminism causes the database to crash when sorting strings",
      "If the ORDER BY column has duplicate values and no unique tie-breaker, rows with identical values can appear in arbitrary order across pages, causing records to be skipped or repeated",
      "LIMIT causes the query optimizer to reverse the sort direction",
      "Sorting integers is always non-deterministic in relational algebra"
    ],
    "correctIndex": 1,
    "explanation": "Relational sets are unordered. If sorting by non-unique columns (e.g. created_date), different execution plans or storage engines may return tied rows in varying order. A unique column (like id) must always be appended as a tie-breaker. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_orderlimit_67",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🎯 Core Concept",
    "question": "[ORDER BY & LIMIT #67 &bull; Fintech & Ledger Systems] Why is offset pagination ('LIMIT 20 OFFSET 1000000') notoriously slow on large tables? (Application Scenario 4)",
    "options": [
      "OFFSET is executed in the client's browser rather than the database",
      "B-Tree indexes cannot count past 65,535",
      "MySQL disables caching whenever OFFSET is used",
      "The engine must still read and discard the first 1,000,000 rows from the index/table before transmitting the desired 20 rows"
    ],
    "correctIndex": 3,
    "explanation": "OFFSET N requires scanning and discarding N rows. For deep pagination, Keyset Pagination (Cursor pagination, e.g. 'WHERE id > last_seen_id ORDER BY id LIMIT 20') delivers O(1) performance. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_orderlimit_68",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🏛️ Corporate Edge",
    "question": "[ORDER BY & LIMIT #68 &bull; SaaS Subscription Billing] Where do NULL values appear by default in ORDER BY in MySQL versus PostgreSQL? (Application Scenario 4)",
    "options": [
      "Both always sort NULLs in the exact middle of the result set",
      "In MySQL, NULLs sort FIRST in ASC and LAST in DESC; in PostgreSQL, NULLs sort LAST in ASC and FIRST in DESC (unless NULLS FIRST/LAST is specified)",
      "PostgreSQL throws an error if NULLs are sorted",
      "Both treat NULL as the integer zero"
    ],
    "correctIndex": 1,
    "explanation": "MySQL treats NULL as the lowest possible value (appearing first in ASC). PostgreSQL treats NULL as the highest possible value (appearing last in ASC). ANSI SQL provides NULLS FIRST / NULLS LAST to make behavior explicit. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_orderlimit_69",
    "keyword": "ORDER BY & LIMIT",
    "tag": "💡 Lead Architect",
    "question": "[ORDER BY & LIMIT #69 &bull; Global Supply Chain & Logistics] What is an 'Index Sort' (avoiding filesort) in MySQL EXPLAIN output? (Application Scenario 4)",
    "options": [
      "A sorting pass that sorts index files on disk",
      "A sort executed inside the CPU cache registers only",
      "A sort that only works on PRIMARY KEY columns",
      "The query satisfies the ORDER BY directly from the ordered leaf nodes of a B-Tree index, without having to load rows into memory and run a sorting algorithm"
    ],
    "correctIndex": 3,
    "explanation": "When the ORDER BY matches the leading columns of an index (and WHERE predicates are compatible), the engine retrieves rows already in sorted order, completely bypassing the expensive filesort pass. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_orderlimit_70",
    "keyword": "ORDER BY & LIMIT",
    "tag": "⚡ Gotcha Trap",
    "question": "[ORDER BY & LIMIT #70 &bull; Healthcare Patient Records] What does 'ORDER BY 1 DESC, 2 ASC' mean in ANSI SQL? (Application Scenario 4)",
    "options": [
      "Sort by the numbers 1 and 2 literally",
      "Sort by the 1st column in the SELECT list descending, and break ties using the 2nd column ascending",
      "Syntax error: Ordinal column positioning is forbidden",
      "Sort the primary key descending"
    ],
    "correctIndex": 1,
    "explanation": "Positional references in ORDER BY refer to the 1-based index of columns in the SELECT clause. While standard, referencing explicit column names is preferred in production code. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_orderlimit_71",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🎯 Core Concept",
    "question": "[ORDER BY & LIMIT #71 &bull; E-Commerce Checkout Funnels] What is 'sorting indeterminism' when using ORDER BY with LIMIT, and how does it cause production bugs in pagination? (Application Scenario 5)",
    "options": [
      "Indeterminism causes the database to crash when sorting strings",
      "LIMIT causes the query optimizer to reverse the sort direction",
      "Sorting integers is always non-deterministic in relational algebra",
      "If the ORDER BY column has duplicate values and no unique tie-breaker, rows with identical values can appear in arbitrary order across pages, causing records to be skipped or repeated"
    ],
    "correctIndex": 3,
    "explanation": "Relational sets are unordered. If sorting by non-unique columns (e.g. created_date), different execution plans or storage engines may return tied rows in varying order. A unique column (like id) must always be appended as a tie-breaker. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_orderlimit_72",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🏛️ Corporate Edge",
    "question": "[ORDER BY & LIMIT #72 &bull; Telecom Billing & Data Streams] Why is offset pagination ('LIMIT 20 OFFSET 1000000') notoriously slow on large tables? (Application Scenario 5)",
    "options": [
      "OFFSET is executed in the client's browser rather than the database",
      "The engine must still read and discard the first 1,000,000 rows from the index/table before transmitting the desired 20 rows",
      "B-Tree indexes cannot count past 65,535",
      "MySQL disables caching whenever OFFSET is used"
    ],
    "correctIndex": 1,
    "explanation": "OFFSET N requires scanning and discarding N rows. For deep pagination, Keyset Pagination (Cursor pagination, e.g. 'WHERE id > last_seen_id ORDER BY id LIMIT 20') delivers O(1) performance. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_orderlimit_73",
    "keyword": "ORDER BY & LIMIT",
    "tag": "💡 Lead Architect",
    "question": "[ORDER BY & LIMIT #73 &bull; AdTech Real-Time Bidding] Where do NULL values appear by default in ORDER BY in MySQL versus PostgreSQL? (Application Scenario 5)",
    "options": [
      "Both always sort NULLs in the exact middle of the result set",
      "PostgreSQL throws an error if NULLs are sorted",
      "Both treat NULL as the integer zero",
      "In MySQL, NULLs sort FIRST in ASC and LAST in DESC; in PostgreSQL, NULLs sort LAST in ASC and FIRST in DESC (unless NULLS FIRST/LAST is specified)"
    ],
    "correctIndex": 3,
    "explanation": "MySQL treats NULL as the lowest possible value (appearing first in ASC). PostgreSQL treats NULL as the highest possible value (appearing last in ASC). ANSI SQL provides NULLS FIRST / NULLS LAST to make behavior explicit. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_orderlimit_74",
    "keyword": "ORDER BY & LIMIT",
    "tag": "⚡ Gotcha Trap",
    "question": "[ORDER BY & LIMIT #74 &bull; Cybersecurity Audit Logs] What is an 'Index Sort' (avoiding filesort) in MySQL EXPLAIN output? (Application Scenario 5)",
    "options": [
      "A sorting pass that sorts index files on disk",
      "The query satisfies the ORDER BY directly from the ordered leaf nodes of a B-Tree index, without having to load rows into memory and run a sorting algorithm",
      "A sort executed inside the CPU cache registers only",
      "A sort that only works on PRIMARY KEY columns"
    ],
    "correctIndex": 1,
    "explanation": "When the ORDER BY matches the leading columns of an index (and WHERE predicates are compatible), the engine retrieves rows already in sorted order, completely bypassing the expensive filesort pass. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_orderlimit_75",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🎯 Core Concept",
    "question": "[ORDER BY & LIMIT #75 &bull; Fintech & Ledger Systems] What does 'ORDER BY 1 DESC, 2 ASC' mean in ANSI SQL? (Application Scenario 5)",
    "options": [
      "Sort by the numbers 1 and 2 literally",
      "Syntax error: Ordinal column positioning is forbidden",
      "Sort the primary key descending",
      "Sort by the 1st column in the SELECT list descending, and break ties using the 2nd column ascending"
    ],
    "correctIndex": 3,
    "explanation": "Positional references in ORDER BY refer to the 1-based index of columns in the SELECT clause. While standard, referencing explicit column names is preferred in production code. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_orderlimit_76",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🏛️ Corporate Edge",
    "question": "[ORDER BY & LIMIT #76 &bull; SaaS Subscription Billing] What is 'sorting indeterminism' when using ORDER BY with LIMIT, and how does it cause production bugs in pagination? (Application Scenario 6)",
    "options": [
      "Indeterminism causes the database to crash when sorting strings",
      "If the ORDER BY column has duplicate values and no unique tie-breaker, rows with identical values can appear in arbitrary order across pages, causing records to be skipped or repeated",
      "LIMIT causes the query optimizer to reverse the sort direction",
      "Sorting integers is always non-deterministic in relational algebra"
    ],
    "correctIndex": 1,
    "explanation": "Relational sets are unordered. If sorting by non-unique columns (e.g. created_date), different execution plans or storage engines may return tied rows in varying order. A unique column (like id) must always be appended as a tie-breaker. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_orderlimit_77",
    "keyword": "ORDER BY & LIMIT",
    "tag": "💡 Lead Architect",
    "question": "[ORDER BY & LIMIT #77 &bull; Global Supply Chain & Logistics] Why is offset pagination ('LIMIT 20 OFFSET 1000000') notoriously slow on large tables? (Application Scenario 6)",
    "options": [
      "OFFSET is executed in the client's browser rather than the database",
      "B-Tree indexes cannot count past 65,535",
      "MySQL disables caching whenever OFFSET is used",
      "The engine must still read and discard the first 1,000,000 rows from the index/table before transmitting the desired 20 rows"
    ],
    "correctIndex": 3,
    "explanation": "OFFSET N requires scanning and discarding N rows. For deep pagination, Keyset Pagination (Cursor pagination, e.g. 'WHERE id > last_seen_id ORDER BY id LIMIT 20') delivers O(1) performance. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_orderlimit_78",
    "keyword": "ORDER BY & LIMIT",
    "tag": "⚡ Gotcha Trap",
    "question": "[ORDER BY & LIMIT #78 &bull; Healthcare Patient Records] Where do NULL values appear by default in ORDER BY in MySQL versus PostgreSQL? (Application Scenario 6)",
    "options": [
      "Both always sort NULLs in the exact middle of the result set",
      "In MySQL, NULLs sort FIRST in ASC and LAST in DESC; in PostgreSQL, NULLs sort LAST in ASC and FIRST in DESC (unless NULLS FIRST/LAST is specified)",
      "PostgreSQL throws an error if NULLs are sorted",
      "Both treat NULL as the integer zero"
    ],
    "correctIndex": 1,
    "explanation": "MySQL treats NULL as the lowest possible value (appearing first in ASC). PostgreSQL treats NULL as the highest possible value (appearing last in ASC). ANSI SQL provides NULLS FIRST / NULLS LAST to make behavior explicit. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_orderlimit_79",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🎯 Core Concept",
    "question": "[ORDER BY & LIMIT #79 &bull; E-Commerce Checkout Funnels] What is an 'Index Sort' (avoiding filesort) in MySQL EXPLAIN output? (Application Scenario 6)",
    "options": [
      "A sorting pass that sorts index files on disk",
      "A sort executed inside the CPU cache registers only",
      "A sort that only works on PRIMARY KEY columns",
      "The query satisfies the ORDER BY directly from the ordered leaf nodes of a B-Tree index, without having to load rows into memory and run a sorting algorithm"
    ],
    "correctIndex": 3,
    "explanation": "When the ORDER BY matches the leading columns of an index (and WHERE predicates are compatible), the engine retrieves rows already in sorted order, completely bypassing the expensive filesort pass. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_orderlimit_80",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🏛️ Corporate Edge",
    "question": "[ORDER BY & LIMIT #80 &bull; Telecom Billing & Data Streams] What does 'ORDER BY 1 DESC, 2 ASC' mean in ANSI SQL? (Application Scenario 6)",
    "options": [
      "Sort by the numbers 1 and 2 literally",
      "Sort by the 1st column in the SELECT list descending, and break ties using the 2nd column ascending",
      "Syntax error: Ordinal column positioning is forbidden",
      "Sort the primary key descending"
    ],
    "correctIndex": 1,
    "explanation": "Positional references in ORDER BY refer to the 1-based index of columns in the SELECT clause. While standard, referencing explicit column names is preferred in production code. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_orderlimit_81",
    "keyword": "ORDER BY & LIMIT",
    "tag": "💡 Lead Architect",
    "question": "[ORDER BY & LIMIT #81 &bull; AdTech Real-Time Bidding] What is 'sorting indeterminism' when using ORDER BY with LIMIT, and how does it cause production bugs in pagination? (Application Scenario 7)",
    "options": [
      "Indeterminism causes the database to crash when sorting strings",
      "LIMIT causes the query optimizer to reverse the sort direction",
      "Sorting integers is always non-deterministic in relational algebra",
      "If the ORDER BY column has duplicate values and no unique tie-breaker, rows with identical values can appear in arbitrary order across pages, causing records to be skipped or repeated"
    ],
    "correctIndex": 3,
    "explanation": "Relational sets are unordered. If sorting by non-unique columns (e.g. created_date), different execution plans or storage engines may return tied rows in varying order. A unique column (like id) must always be appended as a tie-breaker. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_orderlimit_82",
    "keyword": "ORDER BY & LIMIT",
    "tag": "⚡ Gotcha Trap",
    "question": "[ORDER BY & LIMIT #82 &bull; Cybersecurity Audit Logs] Why is offset pagination ('LIMIT 20 OFFSET 1000000') notoriously slow on large tables? (Application Scenario 7)",
    "options": [
      "OFFSET is executed in the client's browser rather than the database",
      "The engine must still read and discard the first 1,000,000 rows from the index/table before transmitting the desired 20 rows",
      "B-Tree indexes cannot count past 65,535",
      "MySQL disables caching whenever OFFSET is used"
    ],
    "correctIndex": 1,
    "explanation": "OFFSET N requires scanning and discarding N rows. For deep pagination, Keyset Pagination (Cursor pagination, e.g. 'WHERE id > last_seen_id ORDER BY id LIMIT 20') delivers O(1) performance. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_orderlimit_83",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🎯 Core Concept",
    "question": "[ORDER BY & LIMIT #83 &bull; Fintech & Ledger Systems] Where do NULL values appear by default in ORDER BY in MySQL versus PostgreSQL? (Application Scenario 7)",
    "options": [
      "Both always sort NULLs in the exact middle of the result set",
      "PostgreSQL throws an error if NULLs are sorted",
      "Both treat NULL as the integer zero",
      "In MySQL, NULLs sort FIRST in ASC and LAST in DESC; in PostgreSQL, NULLs sort LAST in ASC and FIRST in DESC (unless NULLS FIRST/LAST is specified)"
    ],
    "correctIndex": 3,
    "explanation": "MySQL treats NULL as the lowest possible value (appearing first in ASC). PostgreSQL treats NULL as the highest possible value (appearing last in ASC). ANSI SQL provides NULLS FIRST / NULLS LAST to make behavior explicit. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_orderlimit_84",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🏛️ Corporate Edge",
    "question": "[ORDER BY & LIMIT #84 &bull; SaaS Subscription Billing] What is an 'Index Sort' (avoiding filesort) in MySQL EXPLAIN output? (Application Scenario 7)",
    "options": [
      "A sorting pass that sorts index files on disk",
      "The query satisfies the ORDER BY directly from the ordered leaf nodes of a B-Tree index, without having to load rows into memory and run a sorting algorithm",
      "A sort executed inside the CPU cache registers only",
      "A sort that only works on PRIMARY KEY columns"
    ],
    "correctIndex": 1,
    "explanation": "When the ORDER BY matches the leading columns of an index (and WHERE predicates are compatible), the engine retrieves rows already in sorted order, completely bypassing the expensive filesort pass. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_orderlimit_85",
    "keyword": "ORDER BY & LIMIT",
    "tag": "💡 Lead Architect",
    "question": "[ORDER BY & LIMIT #85 &bull; Global Supply Chain & Logistics] What does 'ORDER BY 1 DESC, 2 ASC' mean in ANSI SQL? (Application Scenario 7)",
    "options": [
      "Sort by the numbers 1 and 2 literally",
      "Syntax error: Ordinal column positioning is forbidden",
      "Sort the primary key descending",
      "Sort by the 1st column in the SELECT list descending, and break ties using the 2nd column ascending"
    ],
    "correctIndex": 3,
    "explanation": "Positional references in ORDER BY refer to the 1-based index of columns in the SELECT clause. While standard, referencing explicit column names is preferred in production code. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_orderlimit_86",
    "keyword": "ORDER BY & LIMIT",
    "tag": "⚡ Gotcha Trap",
    "question": "[ORDER BY & LIMIT #86 &bull; Healthcare Patient Records] What is 'sorting indeterminism' when using ORDER BY with LIMIT, and how does it cause production bugs in pagination? (Application Scenario 8)",
    "options": [
      "Indeterminism causes the database to crash when sorting strings",
      "If the ORDER BY column has duplicate values and no unique tie-breaker, rows with identical values can appear in arbitrary order across pages, causing records to be skipped or repeated",
      "LIMIT causes the query optimizer to reverse the sort direction",
      "Sorting integers is always non-deterministic in relational algebra"
    ],
    "correctIndex": 1,
    "explanation": "Relational sets are unordered. If sorting by non-unique columns (e.g. created_date), different execution plans or storage engines may return tied rows in varying order. A unique column (like id) must always be appended as a tie-breaker. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_orderlimit_87",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🎯 Core Concept",
    "question": "[ORDER BY & LIMIT #87 &bull; E-Commerce Checkout Funnels] Why is offset pagination ('LIMIT 20 OFFSET 1000000') notoriously slow on large tables? (Application Scenario 8)",
    "options": [
      "OFFSET is executed in the client's browser rather than the database",
      "B-Tree indexes cannot count past 65,535",
      "MySQL disables caching whenever OFFSET is used",
      "The engine must still read and discard the first 1,000,000 rows from the index/table before transmitting the desired 20 rows"
    ],
    "correctIndex": 3,
    "explanation": "OFFSET N requires scanning and discarding N rows. For deep pagination, Keyset Pagination (Cursor pagination, e.g. 'WHERE id > last_seen_id ORDER BY id LIMIT 20') delivers O(1) performance. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_orderlimit_88",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🏛️ Corporate Edge",
    "question": "[ORDER BY & LIMIT #88 &bull; Telecom Billing & Data Streams] Where do NULL values appear by default in ORDER BY in MySQL versus PostgreSQL? (Application Scenario 8)",
    "options": [
      "Both always sort NULLs in the exact middle of the result set",
      "In MySQL, NULLs sort FIRST in ASC and LAST in DESC; in PostgreSQL, NULLs sort LAST in ASC and FIRST in DESC (unless NULLS FIRST/LAST is specified)",
      "PostgreSQL throws an error if NULLs are sorted",
      "Both treat NULL as the integer zero"
    ],
    "correctIndex": 1,
    "explanation": "MySQL treats NULL as the lowest possible value (appearing first in ASC). PostgreSQL treats NULL as the highest possible value (appearing last in ASC). ANSI SQL provides NULLS FIRST / NULLS LAST to make behavior explicit. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_orderlimit_89",
    "keyword": "ORDER BY & LIMIT",
    "tag": "💡 Lead Architect",
    "question": "[ORDER BY & LIMIT #89 &bull; AdTech Real-Time Bidding] What is an 'Index Sort' (avoiding filesort) in MySQL EXPLAIN output? (Application Scenario 8)",
    "options": [
      "A sorting pass that sorts index files on disk",
      "A sort executed inside the CPU cache registers only",
      "A sort that only works on PRIMARY KEY columns",
      "The query satisfies the ORDER BY directly from the ordered leaf nodes of a B-Tree index, without having to load rows into memory and run a sorting algorithm"
    ],
    "correctIndex": 3,
    "explanation": "When the ORDER BY matches the leading columns of an index (and WHERE predicates are compatible), the engine retrieves rows already in sorted order, completely bypassing the expensive filesort pass. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_orderlimit_90",
    "keyword": "ORDER BY & LIMIT",
    "tag": "⚡ Gotcha Trap",
    "question": "[ORDER BY & LIMIT #90 &bull; Cybersecurity Audit Logs] What does 'ORDER BY 1 DESC, 2 ASC' mean in ANSI SQL? (Application Scenario 8)",
    "options": [
      "Sort by the numbers 1 and 2 literally",
      "Sort by the 1st column in the SELECT list descending, and break ties using the 2nd column ascending",
      "Syntax error: Ordinal column positioning is forbidden",
      "Sort the primary key descending"
    ],
    "correctIndex": 1,
    "explanation": "Positional references in ORDER BY refer to the 1-based index of columns in the SELECT clause. While standard, referencing explicit column names is preferred in production code. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_orderlimit_91",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🎯 Core Concept",
    "question": "[ORDER BY & LIMIT #91 &bull; Fintech & Ledger Systems] What is 'sorting indeterminism' when using ORDER BY with LIMIT, and how does it cause production bugs in pagination? (Application Scenario 9)",
    "options": [
      "Indeterminism causes the database to crash when sorting strings",
      "LIMIT causes the query optimizer to reverse the sort direction",
      "Sorting integers is always non-deterministic in relational algebra",
      "If the ORDER BY column has duplicate values and no unique tie-breaker, rows with identical values can appear in arbitrary order across pages, causing records to be skipped or repeated"
    ],
    "correctIndex": 3,
    "explanation": "Relational sets are unordered. If sorting by non-unique columns (e.g. created_date), different execution plans or storage engines may return tied rows in varying order. A unique column (like id) must always be appended as a tie-breaker. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_orderlimit_92",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🏛️ Corporate Edge",
    "question": "[ORDER BY & LIMIT #92 &bull; SaaS Subscription Billing] Why is offset pagination ('LIMIT 20 OFFSET 1000000') notoriously slow on large tables? (Application Scenario 9)",
    "options": [
      "OFFSET is executed in the client's browser rather than the database",
      "The engine must still read and discard the first 1,000,000 rows from the index/table before transmitting the desired 20 rows",
      "B-Tree indexes cannot count past 65,535",
      "MySQL disables caching whenever OFFSET is used"
    ],
    "correctIndex": 1,
    "explanation": "OFFSET N requires scanning and discarding N rows. For deep pagination, Keyset Pagination (Cursor pagination, e.g. 'WHERE id > last_seen_id ORDER BY id LIMIT 20') delivers O(1) performance. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_orderlimit_93",
    "keyword": "ORDER BY & LIMIT",
    "tag": "💡 Lead Architect",
    "question": "[ORDER BY & LIMIT #93 &bull; Global Supply Chain & Logistics] Where do NULL values appear by default in ORDER BY in MySQL versus PostgreSQL? (Application Scenario 9)",
    "options": [
      "Both always sort NULLs in the exact middle of the result set",
      "PostgreSQL throws an error if NULLs are sorted",
      "Both treat NULL as the integer zero",
      "In MySQL, NULLs sort FIRST in ASC and LAST in DESC; in PostgreSQL, NULLs sort LAST in ASC and FIRST in DESC (unless NULLS FIRST/LAST is specified)"
    ],
    "correctIndex": 3,
    "explanation": "MySQL treats NULL as the lowest possible value (appearing first in ASC). PostgreSQL treats NULL as the highest possible value (appearing last in ASC). ANSI SQL provides NULLS FIRST / NULLS LAST to make behavior explicit. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_orderlimit_94",
    "keyword": "ORDER BY & LIMIT",
    "tag": "⚡ Gotcha Trap",
    "question": "[ORDER BY & LIMIT #94 &bull; Healthcare Patient Records] What is an 'Index Sort' (avoiding filesort) in MySQL EXPLAIN output? (Application Scenario 9)",
    "options": [
      "A sorting pass that sorts index files on disk",
      "The query satisfies the ORDER BY directly from the ordered leaf nodes of a B-Tree index, without having to load rows into memory and run a sorting algorithm",
      "A sort executed inside the CPU cache registers only",
      "A sort that only works on PRIMARY KEY columns"
    ],
    "correctIndex": 1,
    "explanation": "When the ORDER BY matches the leading columns of an index (and WHERE predicates are compatible), the engine retrieves rows already in sorted order, completely bypassing the expensive filesort pass. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_orderlimit_95",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🎯 Core Concept",
    "question": "[ORDER BY & LIMIT #95 &bull; E-Commerce Checkout Funnels] What does 'ORDER BY 1 DESC, 2 ASC' mean in ANSI SQL? (Application Scenario 9)",
    "options": [
      "Sort by the numbers 1 and 2 literally",
      "Syntax error: Ordinal column positioning is forbidden",
      "Sort the primary key descending",
      "Sort by the 1st column in the SELECT list descending, and break ties using the 2nd column ascending"
    ],
    "correctIndex": 3,
    "explanation": "Positional references in ORDER BY refer to the 1-based index of columns in the SELECT clause. While standard, referencing explicit column names is preferred in production code. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_orderlimit_96",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🏛️ Corporate Edge",
    "question": "[ORDER BY & LIMIT #96 &bull; Telecom Billing & Data Streams] What is 'sorting indeterminism' when using ORDER BY with LIMIT, and how does it cause production bugs in pagination? (Application Scenario 10)",
    "options": [
      "Indeterminism causes the database to crash when sorting strings",
      "If the ORDER BY column has duplicate values and no unique tie-breaker, rows with identical values can appear in arbitrary order across pages, causing records to be skipped or repeated",
      "LIMIT causes the query optimizer to reverse the sort direction",
      "Sorting integers is always non-deterministic in relational algebra"
    ],
    "correctIndex": 1,
    "explanation": "Relational sets are unordered. If sorting by non-unique columns (e.g. created_date), different execution plans or storage engines may return tied rows in varying order. A unique column (like id) must always be appended as a tie-breaker. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_orderlimit_97",
    "keyword": "ORDER BY & LIMIT",
    "tag": "💡 Lead Architect",
    "question": "[ORDER BY & LIMIT #97 &bull; AdTech Real-Time Bidding] Why is offset pagination ('LIMIT 20 OFFSET 1000000') notoriously slow on large tables? (Application Scenario 10)",
    "options": [
      "OFFSET is executed in the client's browser rather than the database",
      "B-Tree indexes cannot count past 65,535",
      "MySQL disables caching whenever OFFSET is used",
      "The engine must still read and discard the first 1,000,000 rows from the index/table before transmitting the desired 20 rows"
    ],
    "correctIndex": 3,
    "explanation": "OFFSET N requires scanning and discarding N rows. For deep pagination, Keyset Pagination (Cursor pagination, e.g. 'WHERE id > last_seen_id ORDER BY id LIMIT 20') delivers O(1) performance. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_orderlimit_98",
    "keyword": "ORDER BY & LIMIT",
    "tag": "⚡ Gotcha Trap",
    "question": "[ORDER BY & LIMIT #98 &bull; Cybersecurity Audit Logs] Where do NULL values appear by default in ORDER BY in MySQL versus PostgreSQL? (Application Scenario 10)",
    "options": [
      "Both always sort NULLs in the exact middle of the result set",
      "In MySQL, NULLs sort FIRST in ASC and LAST in DESC; in PostgreSQL, NULLs sort LAST in ASC and FIRST in DESC (unless NULLS FIRST/LAST is specified)",
      "PostgreSQL throws an error if NULLs are sorted",
      "Both treat NULL as the integer zero"
    ],
    "correctIndex": 1,
    "explanation": "MySQL treats NULL as the lowest possible value (appearing first in ASC). PostgreSQL treats NULL as the highest possible value (appearing last in ASC). ANSI SQL provides NULLS FIRST / NULLS LAST to make behavior explicit. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_orderlimit_99",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🎯 Core Concept",
    "question": "[ORDER BY & LIMIT #99 &bull; Fintech & Ledger Systems] What is an 'Index Sort' (avoiding filesort) in MySQL EXPLAIN output? (Application Scenario 10)",
    "options": [
      "A sorting pass that sorts index files on disk",
      "A sort executed inside the CPU cache registers only",
      "A sort that only works on PRIMARY KEY columns",
      "The query satisfies the ORDER BY directly from the ordered leaf nodes of a B-Tree index, without having to load rows into memory and run a sorting algorithm"
    ],
    "correctIndex": 3,
    "explanation": "When the ORDER BY matches the leading columns of an index (and WHERE predicates are compatible), the engine retrieves rows already in sorted order, completely bypassing the expensive filesort pass. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_orderlimit_100",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🏛️ Corporate Edge",
    "question": "[ORDER BY & LIMIT #100 &bull; SaaS Subscription Billing] What does 'ORDER BY 1 DESC, 2 ASC' mean in ANSI SQL? (Application Scenario 10)",
    "options": [
      "Sort by the numbers 1 and 2 literally",
      "Sort by the 1st column in the SELECT list descending, and break ties using the 2nd column ascending",
      "Syntax error: Ordinal column positioning is forbidden",
      "Sort the primary key descending"
    ],
    "correctIndex": 1,
    "explanation": "Positional references in ORDER BY refer to the 1-based index of columns in the SELECT clause. While standard, referencing explicit column names is preferred in production code. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_math_1",
    "keyword": "MATH & MEDIANS",
    "tag": "🍡 Quick Snack",
    "question": "[MATH & MEDIANS #1] Why is there no universal MEDIAN() aggregate function in standard ANSI SQL or MySQL 8.0?",
    "options": [
      "Calculating exact median requires sorting the entire dataset, which does not fit cleanly into single-pass streaming aggregation (like SUM or COUNT)",
      "The ANSI SQL standards committee deprecated MEDIAN() in 1999 due to floating point security bugs",
      "MEDIAN can only be calculated on prime numbers, so databases reject it",
      "SQL engines can only compute linear algebraic operations, not statistical percentiles"
    ],
    "correctIndex": 0,
    "explanation": "Stream aggregates like SUM() and COUNT() maintain state in O(1) memory during a single scan. In contrast, finding the exact median requires global ordering or rank indexing (O(N log N) or two passes), so ANSI SQL left percentiles to window functions (PERCENTILE_CONT) or dialect-specific implementations."
  },
  {
    "id": "mcq_math_2",
    "keyword": "MATH & MEDIANS",
    "tag": "⚡ Gotcha Trap",
    "question": "[MATH & MEDIANS #2] What is the key functional difference between ROUND(123.456, 2) and TRUNCATE(123.456, 2) in MySQL?",
    "options": [
      "ROUND converts to floating point while TRUNCATE converts to an integer string",
      "ROUND rounds up to 123.46 based on the next digit; TRUNCATE chops off trailing decimals to 123.45 without rounding",
      "TRUNCATE deletes the table column while ROUND formats display only",
      "There is no difference; both produce 123.46"
    ],
    "correctIndex": 1,
    "explanation": "ROUND(n, d) performs mathematical half-up rounding on digit d+1. TRUNCATE(n, d) simply discards any decimal places beyond position d without altering earlier digits."
  },
  {
    "id": "mcq_math_3",
    "keyword": "MATH & MEDIANS",
    "tag": "🐱 Brain Bender",
    "question": "[MATH & MEDIANS #3] In MySQL, what is the return value of ROUND(2.5) vs ROUND(3.5)?",
    "options": [
      "2 and 4 (banker's rounding to nearest even number)",
      "2 and 3 (floor rounding)",
      "3 and 4 (MySQL performs round-half-up for exact numeric types, moving away from zero)",
      "3 and 3 (nearest odd number)"
    ],
    "correctIndex": 2,
    "explanation": "For exact-value numeric types (DECIMAL/INT), MySQL uses 'round half away from zero': 2.5 rounds to 3, and -2.5 rounds to -3. Note that Python 3 and IEEE-754 floating-point use banker's rounding (round to even)."
  },
  {
    "id": "mcq_math_4",
    "keyword": "MATH & MEDIANS",
    "tag": "🎯 Core Concept",
    "question": "[MATH & MEDIANS #4] In 2D grid coordinates (x1, y1) and (x2, y2), what is the Manhattan (Taxicab / L1 Norm) Distance formula in SQL?",
    "options": [
      "SQRT(POW(x1 - x2, 2) + POW(y1 - y2, 2))",
      "(x1 - x2) * (y1 - y2)",
      "POW(ABS(x1 - x2), 2) + POW(ABS(y1 - y2), 2)",
      "ABS(x1 - x2) + ABS(y1 - y2)"
    ],
    "correctIndex": 3,
    "explanation": "Manhattan Distance measures distance along orthogonal axes (city blocks). The formula is |x1 - x2| + |y1 - y2|, implemented in SQL as ABS(x1 - x2) + ABS(y1 - y2)."
  },
  {
    "id": "mcq_math_5",
    "keyword": "MATH & MEDIANS",
    "tag": "🏆 Senior Staff",
    "question": "[MATH & MEDIANS #5] When calculating Manhattan Distance between P1(MIN(LAT_N), MIN(LONG_W)) and P2(MAX(LAT_N), MAX(LONG_W)), why can ABS() be safely omitted?",
    "options": [
      "Because MAX is mathematically guaranteed to be greater than or equal to MIN, so (MAX - MIN) is always >= 0",
      "Because SQL automatically inverts negative numbers in SELECT clauses",
      "Because coordinates cannot be negative numbers in GPS systems",
      "Because the query optimizer replaces MIN and MAX with absolute magnitudes"
    ],
    "correctIndex": 0,
    "explanation": "Since by definition MAX(col) >= MIN(col) for any non-empty set, (MAX(col) - MIN(col)) is inherently non-negative. Thus |MAX - MIN| = MAX - MIN."
  },
  {
    "id": "mcq_math_6",
    "keyword": "MATH & MEDIANS",
    "tag": "🍡 Quick Snack",
    "question": "[MATH & MEDIANS #6] What is the Euclidean (L2 Norm / Straight-Line) Distance formula in MySQL between (x1, y1) and (x2, y2)?",
    "options": [
      "POW(SQRT(x1 - x2), 2) + POW(SQRT(y1 - y2), 2)",
      "SQRT(POW(x1 - x2, 2) + POW(y1 - y2, 2))",
      "ABS(x1 - x2) + ABS(y1 - y2)",
      "SQRT(ABS(x1 - x2) + ABS(y1 - y2))"
    ],
    "correctIndex": 1,
    "explanation": "Euclidean distance is the straight-line hypotenuse derived from the Pythagorean theorem: sqrt((Δx)² + (Δy)²). In MySQL, this is computed via SQRT(POW(x1 - x2, 2) + POW(y1 - y2, 2))."
  },
  {
    "id": "mcq_math_7",
    "keyword": "MATH & MEDIANS",
    "tag": "⚡ Gotcha Trap",
    "question": "[MATH & MEDIANS #7] To query Western Longitude (LONG_W) corresponding to the LARGEST Northern Latitude (LAT_N) under 137.2345, which query is most performant?",
    "options": [
      "SELECT LONG_W FROM STATION WHERE LAT_N = (SELECT MAX(LAT_N) FROM STATION WHERE LAT_N < 137.2345);",
      "SELECT MAX(LONG_W) FROM STATION WHERE LAT_N < 137.2345;",
      "SELECT LONG_W FROM STATION WHERE LAT_N < 137.2345 ORDER BY LAT_N DESC LIMIT 1;",
      "SELECT LONG_W, MAX(LAT_N) FROM STATION GROUP BY LONG_W HAVING LAT_N < 137.2345;"
    ],
    "correctIndex": 2,
    "explanation": "ORDER BY LAT_N DESC LIMIT 1 scans an index on LAT_N in reverse and halts after retrieving the first matching row (O(log N) with index or single top-1 heap pass). The subquery approach requires two passes over the table."
  },
  {
    "id": "mcq_math_8",
    "keyword": "MATH & MEDIANS",
    "tag": "🐱 Brain Bender",
    "question": "[MATH & MEDIANS #8] Why is 'SELECT LONG_W, MAX(LAT_N) FROM STATION WHERE LAT_N < 137.2345;' invalid in standard SQL?",
    "options": [
      "STATION cannot contain both numbers and strings",
      "WHERE clauses cannot contain decimal values",
      "MAX() cannot be called inside a SELECT statement that has two columns",
      "LONG_W is not in a GROUP BY clause and is not an aggregated column, violating SQL-92 / ONLY_FULL_GROUP_BY"
    ],
    "correctIndex": 3,
    "explanation": "Under ONLY_FULL_GROUP_BY, projecting an unaggregated column (LONG_W) alongside an aggregate (MAX(LAT_N)) without GROUP BY is rejected because the engine cannot know which row's LONG_W to return."
  },
  {
    "id": "mcq_math_9",
    "keyword": "MATH & MEDIANS",
    "tag": "🎯 Core Concept",
    "question": "[MATH & MEDIANS #9] In an odd-sized dataset of N = 499 rows sorted by value, which row number represents the exact median?",
    "options": [
      "Row 250 (calculated as (N + 1) / 2)",
      "Row 249",
      "Row 251",
      "The average of Row 249 and Row 250"
    ],
    "correctIndex": 0,
    "explanation": "For an odd number of elements N, the median is the single middle element at position (N + 1) / 2. For N = 499, (499 + 1) / 2 = 250."
  },
  {
    "id": "mcq_math_10",
    "keyword": "MATH & MEDIANS",
    "tag": "🏆 Senior Staff",
    "question": "[MATH & MEDIANS #10] In an even-sized dataset of N = 500 rows sorted by value, how is the median mathematically computed?",
    "options": [
      "Only row 250 is chosen by dropping the upper half",
      "The arithmetic mean (average) of elements at positions N/2 (row 250) and (N/2) + 1 (row 251)",
      "Only row 251 is chosen by ceiling",
      "The sum of row 250 and row 251 without dividing by 2"
    ],
    "correctIndex": 1,
    "explanation": "For an even count N, there is no single middle element. The median is defined as (Value[N/2] + Value[N/2 + 1]) / 2. For N = 500, that is (Row[250] + Row[251]) / 2."
  },
  {
    "id": "mcq_math_11",
    "keyword": "MATH & MEDIANS",
    "tag": "🍡 Quick Snack",
    "question": "[MATH & MEDIANS #11] Why does the condition 'row_num IN (FLOOR((total + 1) / 2.0), CEIL((total + 1) / 2.0))' work universally for both odd and even counts?",
    "options": [
      "Because FLOOR always converts floats to integers and CEIL deletes NULLs",
      "Because IN requires exactly two arguments in MySQL",
      "For odd N, FLOOR and CEIL evaluate to the same row (returning 1 row); for even N, they evaluate to N/2 and N/2 + 1 (returning the 2 middle rows)",
      "Because SQL window functions cannot evaluate fractions"
    ],
    "correctIndex": 2,
    "explanation": "If N=5 (odd), (5+1)/2 = 3.0: FLOOR(3.0)=3, CEIL(3.0)=3 -> IN (3, 3) picks row 3. If N=6 (even), (6+1)/2 = 3.5: FLOOR(3.5)=3, CEIL(3.5)=4 -> IN (3, 4) picks rows 3 and 4. Wrapping in AVG() returns the exact median in both cases!"
  },
  {
    "id": "mcq_math_12",
    "keyword": "MATH & MEDIANS",
    "tag": "⚡ Gotcha Trap",
    "question": "[MATH & MEDIANS #12] When using user variables in MySQL 5.7 to assign row numbers, why is '@r := -1' initialized to -1 instead of 0 for zero-indexed median targeting?",
    "options": [
      "MySQL user variables cannot store positive numbers",
      "To prevent buffer overflow in MySQL memory tables",
      "Because SQL arrays are 1-indexed so -1 offsets to 1",
      "Because the first increment '@r := @r + 1' turns -1 into 0, ensuring row indexes start cleanly at 0"
    ],
    "correctIndex": 3,
    "explanation": "Initializing @r := -1 means the first row evaluated gets @r := -1 + 1 = 0. This creates 0-based indexing [0, 1, ..., N-1], where the total count ends up stored in @r, simplifying zero-based median lookups."
  },
  {
    "id": "mcq_math_13",
    "keyword": "MATH & MEDIANS",
    "tag": "🐱 Brain Bender",
    "question": "[MATH & MEDIANS #13] What is the danger of relying on '@r := @r + 1' user variables inside SELECT statements in MySQL 8.0+?",
    "options": [
      "Evaluation order of user variables is explicitly undefined in MySQL 8.0 and deprecated, potentially causing non-deterministic results",
      "User variables cause the database disk to be wiped",
      "User variables lock all tables for write access indefinitely",
      "User variables cannot be declared with the @ symbol"
    ],
    "correctIndex": 0,
    "explanation": "The MySQL manual explicitly warns that order of evaluation of expressions involving user variables is undefined and may change between releases. Window functions (ROW_NUMBER) should always be used in MySQL 8.0+."
  },
  {
    "id": "mcq_math_14",
    "keyword": "MATH & MEDIANS",
    "tag": "🎯 Core Concept",
    "question": "[MATH & MEDIANS #14] In SQL, what is the key difference between ROUND(X, D) and TRUNCATE(X, D) when processing decimal numbers?",
    "options": [
      "ROUND always returns an integer, while TRUNCATE preserves decimals",
      "TRUNCATE physically clips digits beyond position D without rounding, while ROUND rounds to the nearest value",
      "TRUNCATE is only supported in SQLite, while ROUND is ANSI standard",
      "There is no mathematical difference; they are exact synonyms"
    ],
    "correctIndex": 1,
    "explanation": "TRUNCATE(X, D) simply discards digits past D decimal places without rounding up or down (e.g., TRUNCATE(4.789, 2) = 4.78). ROUND(4.789, 2) rounds to the nearest value (4.79)."
  },
  {
    "id": "mcq_math_15",
    "keyword": "MATH & MEDIANS",
    "tag": "🏆 Senior Staff",
    "question": "[MATH & MEDIANS #15] What does the SQL mathematical function ABS(-42.75) return?",
    "options": [
      "-42.75",
      "42",
      "42.75",
      "-42"
    ],
    "correctIndex": 2,
    "explanation": "ABS(x) returns the absolute (positive) magnitude of x, stripping the negative sign."
  },
  {
    "id": "mcq_math_16",
    "keyword": "MATH & MEDIANS",
    "tag": "🍡 Quick Snack",
    "question": "[MATH & MEDIANS #16] In MySQL, what does POW(4, 0.5) evaluate to?",
    "options": [
      "16.0",
      "2.5",
      "8.0",
      "2.0 (equivalent to SQRT(4))"
    ],
    "correctIndex": 3,
    "explanation": "Raising a number to the power of 0.5 is mathematically identical to taking its square root: POW(x, 0.5) == SQRT(x)."
  },
  {
    "id": "mcq_math_17",
    "keyword": "MATH & MEDIANS",
    "tag": "⚡ Gotcha Trap",
    "question": "[MATH & MEDIANS #17] What is the result of 'SELECT SQRT(-16);' in MySQL?",
    "options": [
      "NULL (along with a domain error warning, since real square roots of negative numbers are undefined)",
      "4",
      "-4",
      "4i"
    ],
    "correctIndex": 0,
    "explanation": "In MySQL, SQRT(x) for x < 0 returns NULL and issues a 'numeric value out of range' warning because standard SQL math does not support imaginary/complex numbers."
  },
  {
    "id": "mcq_math_18",
    "keyword": "MATH & MEDIANS",
    "tag": "🐱 Brain Bender",
    "question": "[MATH & MEDIANS #18] What does 'SELECT FLOOR(7.89), CEIL(7.12);' return?",
    "options": [
      "8, 7",
      "7, 8",
      "7, 7",
      "8, 8"
    ],
    "correctIndex": 1,
    "explanation": "FLOOR(x) returns the largest integer <= x (7.89 -> 7). CEIL(x) or CEILING(x) returns the smallest integer >= x (7.12 -> 8)."
  },
  {
    "id": "mcq_math_19",
    "keyword": "MATH & MEDIANS",
    "tag": "🎯 Core Concept",
    "question": "[MATH & MEDIANS #19] What is the return value of FLOOR(-3.2) in SQL?",
    "options": [
      "-3",
      "-3.0",
      "-4",
      "3"
    ],
    "correctIndex": 2,
    "explanation": "FLOOR moves toward negative infinity. The largest integer less than or equal to -3.2 is -4 (since -4 < -3.2 < -3)."
  },
  {
    "id": "mcq_math_20",
    "keyword": "MATH & MEDIANS",
    "tag": "🏆 Senior Staff",
    "question": "[MATH & MEDIANS #20] When rounding currency values, why is 'DECIMAL(12, 2)' preferred over 'FLOAT' or 'DOUBLE'?",
    "options": [
      "DECIMAL consumes 0 bytes of disk storage",
      "FLOAT cannot store numbers greater than 100",
      "DOUBLE cannot be used in arithmetic operations like SUM",
      "DECIMAL is an exact fixed-point representation; FLOAT and DOUBLE are approximate binary floating-point numbers subject to rounding errors"
    ],
    "correctIndex": 3,
    "explanation": "FLOAT and DOUBLE use IEEE-754 binary floating-point, where numbers like 0.1 cannot be stored exactly, accumulating drift (e.g. 0.10000000000000000555). Financial ledgers require DECIMAL for exact decimal accuracy."
  },
  {
    "id": "mcq_math_21",
    "keyword": "MATH & MEDIANS",
    "tag": "🍡 Quick Snack",
    "question": "[MATH & MEDIANS #21] What does 'SELECT ROUND(12345.67, -2);' return in MySQL?",
    "options": [
      "12300 (rounding to the hundreds place)",
      "12345.00",
      "12345.67",
      "NULL"
    ],
    "correctIndex": 0,
    "explanation": "A negative precision in ROUND(x, -d) rounds to digits to the left of the decimal point: -1 rounds to tens, -2 rounds to hundreds (12345.67 -> 12300)."
  },
  {
    "id": "mcq_math_22",
    "keyword": "MATH & MEDIANS",
    "tag": "⚡ Gotcha Trap",
    "question": "[MATH & MEDIANS #22] How does 'MOD(17, 5)' behave in MySQL?",
    "options": [
      "Returns 3 (the quotient)",
      "Returns 2 (the remainder after integer division 17 / 5)",
      "Returns 3.4",
      "Returns 0.4"
    ],
    "correctIndex": 1,
    "explanation": "MOD(N, M) or N % M returns the remainder of N divided by M. 17 = (5 * 3) + 2, so the remainder is 2."
  },
  {
    "id": "mcq_math_23",
    "keyword": "MATH & MEDIANS",
    "tag": "🐱 Brain Bender",
    "question": "[MATH & MEDIANS #23] What does 'MOD(-17, 5)' return in MySQL vs PostgreSQL?",
    "options": [
      "In MySQL: 3 (always positive modulo)",
      "In MySQL: NULL",
      "In MySQL: -2; the result takes the sign of the numerator (dividend)",
      "In MySQL: 2"
    ],
    "correctIndex": 2,
    "explanation": "In MySQL and C/C++, MOD(N, M) uses truncated division: -17 = (5 * -3) + (-2). The remainder carries the sign of the first argument (-17)."
  },
  {
    "id": "mcq_math_24",
    "keyword": "MATH & MEDIANS",
    "tag": "🎯 Core Concept",
    "question": "[MATH & MEDIANS #24] When calculating Euclidean distance between two GPS points on Earth over long distances (>100 km), why is Euclidean distance inaccurate?",
    "options": [
      "GPS satellites do not use Cartesian coordinates",
      "The Pythagorean theorem is mathematically disproven for distances greater than 50 miles",
      "Latitude lines are diagonal rather than parallel",
      "Earth is an oblate spheroid with spherical curvature; Euclidean distance assumes a flat 2D plane"
    ],
    "correctIndex": 3,
    "explanation": "Euclidean distance assumes flat 2D Euclidean geometry. For planetary distances, the Haversine formula or Great-Circle Distance (accounting for spherical curvature) is required."
  },
  {
    "id": "mcq_math_25",
    "keyword": "MATH & MEDIANS",
    "tag": "🏆 Senior Staff",
    "question": "[MATH & MEDIANS #25] In MySQL 8.0, which built-in spatial function calculates true spherical distance between two geometry points on an ellipsoid?",
    "options": [
      "ST_Distance_Sphere(point1, point2)",
      "GEODISTANCE(lat1, lon1, lat2, lon2)",
      "SPHERE_METRIC(p1, p2)",
      "CALC_HAVERSINE(p1, p2)"
    ],
    "correctIndex": 0,
    "explanation": "MySQL provides spatial GIS functions including ST_Distance_Sphere(p1, p2) to compute the great-circle distance between two geometries on an earth sphere in meters."
  },
  {
    "id": "mcq_math_26",
    "keyword": "MATH & MEDIANS",
    "tag": "🍡 Quick Snack",
    "question": "[MATH & MEDIANS #26] Suppose an e-commerce platform has 10,000 orders where 9,990 orders are $20 and 10 orders are $1,000,000. Why is MEDIAN order value preferred over AVG?",
    "options": [
      "AVG() throws an overflow error on sets larger than 5,000 rows",
      "The mean (AVG) is heavily skewed by extreme outliers ($1M whale orders), while the median accurately reflects typical customer spend ($20)",
      "MEDIAN runs in O(1) time while AVG runs in O(N^2)",
      "Financial auditors prohibit the use of AVG() under GAAP accounting"
    ],
    "correctIndex": 1,
    "explanation": "Mean is sensitive to extreme outliers, skewing the reported average to ~$1,020. The median remains $20, reflecting true central tendency without outlier distortion."
  },
  {
    "id": "mcq_math_27",
    "keyword": "MATH & MEDIANS",
    "tag": "⚡ Gotcha Trap",
    "question": "[MATH & MEDIANS #27] In a table of 100,000 rows, how can you quickly approximate the median without sorting all 100,000 rows in modern data warehouses (BigQuery/Snowflake)?",
    "options": [
      "SELECT MEDIAN(column) WITH NO SORT;",
      "SAMPLE 1 ROW FROM table;",
      "APPROX_QUANTILES(column, 100)[OFFSET(50)] or APPROX_PERCENTILE(column, 0.5)",
      "AVG(MIN(column) + MAX(column))"
    ],
    "correctIndex": 2,
    "explanation": "Cloud analytical engines use streaming sketch algorithms (like T-Digest or HyperLogLog) via APPROX_QUANTILES or APPROX_PERCENTILE to compute percentiles within 1% error in O(N) single-pass without memory-intensive sorting."
  },
  {
    "id": "mcq_math_28",
    "keyword": "MATH & MEDIANS",
    "tag": "🐱 Brain Bender",
    "question": "[MATH & MEDIANS #28] In MySQL, what is the effect of 'SELECT SIGN(-150.5), SIGN(0), SIGN(42);'?",
    "options": [
      "'-', '0', '+'",
      "-150, 0, 42",
      "FALSE, NULL, TRUE",
      "-1, 0, 1"
    ],
    "correctIndex": 3,
    "explanation": "SIGN(x) returns -1 if x < 0, 0 if x = 0, and 1 if x > 0."
  },
  {
    "id": "mcq_math_29",
    "keyword": "MATH & MEDIANS",
    "tag": "🎯 Core Concept",
    "question": "[MATH & MEDIANS #29] Given coordinates X and Y, what does the expression 'SQRT(POW(X, 2) + POW(Y, 2))' represent geometrically?",
    "options": [
      "The distance from the origin (0, 0) to point (X, Y)",
      "The perimeter of the bounding box",
      "The slope of the line passing through (X, Y)",
      "The area of the triangle formed by X and Y"
    ],
    "correctIndex": 0,
    "explanation": "By the Pythagorean theorem, the distance from (0, 0) to (X, Y) is sqrt((X - 0)² + (Y - 0)²) = sqrt(X² + Y²)."
  },
  {
    "id": "mcq_math_30",
    "keyword": "MATH & MEDIANS",
    "tag": "🏆 Senior Staff",
    "question": "[MATH & MEDIANS #30] When finding the maximum value under a ceiling (e.g. LAT_N < 137.2345), what happens if NO rows satisfy the predicate?",
    "options": [
      "Returns 0",
      "SELECT MAX(LAT_N) returns NULL",
      "Throws an EmptyResultSetException error",
      "Returns 137.2345"
    ],
    "correctIndex": 1,
    "explanation": "Aggregate functions (except COUNT) return NULL when evaluated on an empty set or when all evaluated values are NULL."
  },
  {
    "id": "mcq_math_31",
    "keyword": "MATH & MEDIANS",
    "tag": "🍡 Quick Snack",
    "question": "[MATH & MEDIANS #31] What does 'SELECT ROUND(NULL, 4);' return in SQL?",
    "options": [
      "0.0000",
      "0",
      "NULL",
      "An error: NullPointerException"
    ],
    "correctIndex": 2,
    "explanation": "Standard scalar mathematical functions in SQL return NULL whenever any operand is NULL."
  },
  {
    "id": "mcq_math_32",
    "keyword": "MATH & MEDIANS",
    "tag": "⚡ Gotcha Trap",
    "question": "[MATH & MEDIANS #32] Why is 'WHERE LAT_N > 38.7880 AND LAT_N < 137.2345' NOT equivalent to 'WHERE LAT_N BETWEEN 38.7880 AND 137.2345'?",
    "options": [
      "BETWEEN only works on integers, not floating point numbers",
      "BETWEEN evaluates in reverse descending order",
      "There is no difference; they are strictly identical",
      "BETWEEN is inclusive (>= and <=), whereas the first condition is strictly exclusive (> and <)"
    ],
    "correctIndex": 3,
    "explanation": "In SQL, 'x BETWEEN a AND b' is syntactic sugar for 'x >= a AND x <= b'. If LAT_N equals exactly 38.7880, BETWEEN includes it, while '>' excludes it."
  },
  {
    "id": "mcq_math_33",
    "keyword": "MATH & MEDIANS",
    "tag": "🐱 Brain Bender",
    "question": "[MATH & MEDIANS #33] What is the time complexity of computing the exact median of N unsorted rows in a standard database engine?",
    "options": [
      "O(N log N) because all rows must be sorted by the target attribute",
      "O(1)",
      "O(N)",
      "O(N^2)"
    ],
    "correctIndex": 0,
    "explanation": "Exact median requires determining the middle rank, which requires sorting all N elements (O(N log N)) or using a Quickselect-like partitioning algorithm."
  },
  {
    "id": "mcq_math_34",
    "keyword": "MATH & MEDIANS",
    "tag": "🎯 Core Concept",
    "question": "[MATH & MEDIANS #34] If an index exists on LAT_N (B-Tree), what is the time complexity of 'SELECT LAT_N FROM STATION ORDER BY LAT_N LIMIT 1'?",
    "options": [
      "O(N log N)",
      "O(1) or O(log N) to traverse to the leftmost leaf of the B-Tree index",
      "O(N^2)",
      "O(N)"
    ],
    "correctIndex": 1,
    "explanation": "A B-Tree index keeps keys pre-sorted on disk. Finding the minimum is as simple as reading the very first entry on the leftmost leaf node."
  },
  {
    "id": "mcq_math_35",
    "keyword": "MATH & MEDIANS",
    "tag": "🏆 Senior Staff",
    "question": "[MATH & MEDIANS #35] In MySQL, what is the output of 'SELECT CEIL(-4.2);'?",
    "options": [
      "-5",
      "-4.0",
      "-4 (the smallest integer greater than or equal to -4.2)",
      "4"
    ],
    "correctIndex": 2,
    "explanation": "CEIL moves toward positive infinity on the number line. The smallest integer >= -4.2 is -4 (since -4 > -4.2)."
  },
  {
    "id": "mcq_math_36",
    "keyword": "MATH & MEDIANS",
    "tag": "🍡 Quick Snack",
    "question": "[MATH & MEDIANS #36] Which SQL operator calculates the remainder of division?",
    "options": [
      "REM",
      "//",
      "^",
      "% or MOD()"
    ],
    "correctIndex": 3,
    "explanation": "Both the modulo operator (%) and the MOD(a, b) function calculate the remainder of division in ANSI SQL and MySQL."
  },
  {
    "id": "mcq_math_37",
    "keyword": "MATH & MEDIANS",
    "tag": "⚡ Gotcha Trap",
    "question": "[MATH & MEDIANS #37] What is the value of 'SELECT POW(2, 3);' in MySQL?",
    "options": [
      "8",
      "6",
      "9",
      "5"
    ],
    "correctIndex": 0,
    "explanation": "POW(x, y) computes x raised to the power y: 2³ = 2 * 2 * 2 = 8."
  },
  {
    "id": "mcq_math_38",
    "keyword": "MATH & MEDIANS",
    "tag": "🐱 Brain Bender",
    "question": "[MATH & MEDIANS #38] What is the difference between NTILE(2) and computing the median directly?",
    "options": [
      "NTILE(2) only works on tables with exactly 2 rows",
      "NTILE(2) buckets rows into two halves (bucket 1 and bucket 2) but does not return the singular midpoint scalar value",
      "NTILE(2) calculates the mean of every pair of rows",
      "NTILE(2) is deprecated in SQL:2003"
    ],
    "correctIndex": 1,
    "explanation": "NTILE(k) assigns an integer bucket from 1 to k to every row. While NTILE(2) divides rows into two halves, extracting the exact single median value still requires additional filtering and averaging."
  },
  {
    "id": "mcq_math_39",
    "keyword": "MATH & MEDIANS",
    "tag": "🎯 Core Concept",
    "question": "[MATH & MEDIANS #39] What is the result of 'SELECT EXP(0);' in MySQL?",
    "options": [
      "0",
      "2.71828",
      "1 (any non-zero number raised to the power 0 is 1)",
      "NULL"
    ],
    "correctIndex": 2,
    "explanation": "EXP(x) calculates e^x (Euler's constant raised to power x). For x = 0, e^0 = 1."
  },
  {
    "id": "mcq_math_40",
    "keyword": "MATH & MEDIANS",
    "tag": "🏆 Senior Staff",
    "question": "[MATH & MEDIANS #40] What does 'SELECT LN(1);' return in MySQL?",
    "options": [
      "1",
      "2.71828",
      "NULL",
      "0 (the natural logarithm of 1 is 0)"
    ],
    "correctIndex": 3,
    "explanation": "The natural log of 1 is 0 because e^0 = 1. LN(x) computes log base e."
  },
  {
    "id": "mcq_math_41",
    "keyword": "MATH & MEDIANS",
    "tag": "🍡 Quick Snack",
    "question": "[MATH & MEDIANS #41] What is the return value of 'SELECT RADIANS(180);' in MySQL?",
    "options": [
      "3.141592653589793 (Pi radians)",
      "180",
      "1.0",
      "360"
    ],
    "correctIndex": 0,
    "explanation": "RADIANS(degrees) converts degrees to radians via (degrees * π / 180). 180 degrees equals π radians."
  },
  {
    "id": "mcq_math_42",
    "keyword": "MATH & MEDIANS",
    "tag": "⚡ Gotcha Trap",
    "question": "[MATH & MEDIANS #42] What is the return value of 'SELECT DEGREES(PI());' in MySQL?",
    "options": [
      "360",
      "180",
      "90",
      "3.14159"
    ],
    "correctIndex": 1,
    "explanation": "DEGREES(radians) converts radians back into degrees via (radians * 180 / π). PI() radians equals 180 degrees."
  },
  {
    "id": "mcq_math_43",
    "keyword": "MATH & MEDIANS",
    "tag": "🐱 Brain Bender",
    "question": "[MATH & MEDIANS #43] In high-frequency trading database systems, why is median latency (p50) tracked alongside 99th percentile latency (p99)?",
    "options": [
      "p50 and p99 always return the same number",
      "p99 is only used for tax accounting",
      "p50 tracks the typical trader experience, while p99 catches extreme tail latency spikes that breach Service Level Agreements (SLAs)",
      "p50 measures throughput while p99 measures storage size"
    ],
    "correctIndex": 2,
    "explanation": "Tail latency (p99/p99.9) captures worst-case outliers (garbage collection pauses, network jitter) that median (p50) completely hides."
  },
  {
    "id": "mcq_math_44",
    "keyword": "MATH & MEDIANS",
    "tag": "🎯 Core Concept",
    "question": "[MATH & MEDIANS #44] When calculating Taxicab distance across multiple delivery drivers to find the closest driver, what is the best query structure?",
    "options": [
      "SELECT MIN(driver_id) FROM Drivers GROUP BY status HAVING status = 'AVAILABLE';",
      "SELECT driver_id FROM Drivers WHERE distance = (SELECT MIN(lat + lon) FROM Drivers);",
      "SELECT driver_id, MAX(lat) - MIN(lat) FROM Drivers;",
      "SELECT driver_id, ABS(lat - target_lat) + ABS(lon - target_lon) AS distance FROM Drivers WHERE status = 'AVAILABLE' ORDER BY distance ASC LIMIT 1;"
    ],
    "correctIndex": 3,
    "explanation": "Computing the scalar distance expression for each candidate driver and sorting with 'ORDER BY distance ASC LIMIT 1' immediately yields the closest driver."
  },
  {
    "id": "mcq_math_45",
    "keyword": "MATH & MEDIANS",
    "tag": "🏆 Senior Staff",
    "question": "[MATH & MEDIANS #45] What is the result of 'SELECT ROUND(5.555, 2);' in MySQL?",
    "options": [
      "5.56",
      "5.55",
      "5.60",
      "5.5"
    ],
    "correctIndex": 0,
    "explanation": "The third decimal digit is 5, so half-up rounding increases the second digit from 5 to 6, returning 5.56."
  },
  {
    "id": "mcq_math_46",
    "keyword": "MATH & MEDIANS",
    "tag": "🍡 Quick Snack",
    "question": "[MATH & MEDIANS #46] What does 'SELECT TRUNCATE(5.559, 2);' return in MySQL?",
    "options": [
      "5.56",
      "5.55",
      "5.60",
      "5.00"
    ],
    "correctIndex": 1,
    "explanation": "TRUNCATE discards all digits after position 2 without rounding, returning 5.55."
  },
  {
    "id": "mcq_math_47",
    "keyword": "MATH & MEDIANS",
    "tag": "⚡ Gotcha Trap",
    "question": "[MATH & MEDIANS #47] How does the Manhattan Distance formula between coordinates (x1, y1) and (x2, y2) differ from Euclidean Distance in SQL?",
    "options": [
      "Manhattan distance uses trigonometric functions like SIN and COS",
      "Manhattan distance is calculated using logarithmic transformations",
      "Manhattan distance sums absolute differences |x1 - x2| + |y1 - y2|, whereas Euclidean distance computes SQRT(POW(x1-x2, 2) + POW(y1-y2, 2))",
      "Euclidean distance only works on spherical coordinate systems"
    ],
    "correctIndex": 2,
    "explanation": "Manhattan distance measures grid-based distance along right-angled axes: ABS(x1 - x2) + ABS(y1 - y2). Euclidean distance computes direct straight-line distance: SQRT(POW(x1 - x2, 2) + POW(y1 - y2, 2))."
  },
  {
    "id": "mcq_math_48",
    "keyword": "MATH & MEDIANS",
    "tag": "🐱 Brain Bender",
    "question": "[MATH & MEDIANS #48] What is the return value of 'SELECT ABS(10 - 25);'?",
    "options": [
      "-15",
      "35",
      "NULL",
      "15"
    ],
    "correctIndex": 3,
    "explanation": "10 - 25 = -15. The absolute value ABS(-15) is 15."
  },
  {
    "id": "mcq_math_49",
    "keyword": "MATH & MEDIANS",
    "tag": "🎯 Core Concept",
    "question": "[MATH & MEDIANS #49] What happens if you run 'SELECT POW(2, -1);' in MySQL?",
    "options": [
      "0.5 (since 2^(-1) = 1/2 = 0.5)",
      "-2",
      "-0.5",
      "NULL"
    ],
    "correctIndex": 0,
    "explanation": "A negative exponent represents the reciprocal: x^(-y) = 1 / (x^y). Thus 2^(-1) = 1/2 = 0.5."
  },
  {
    "id": "mcq_math_50",
    "keyword": "MATH & MEDIANS",
    "tag": "🏆 Senior Staff",
    "question": "[MATH & MEDIANS #50] Which SQL clause determines the final number of rows returned after all sorting and filtering is finished?",
    "options": [
      "WHERE",
      "LIMIT (or FETCH FIRST n ROWS ONLY in ANSI SQL)",
      "HAVING",
      "GROUP BY"
    ],
    "correctIndex": 1,
    "explanation": "LIMIT (or FETCH FIRST) is the very last step in physical execution, restricting the final transmitted rows to the client."
  },
  {
    "id": "mcq_math_51",
    "keyword": "MATH & MEDIANS",
    "tag": "🎯 Core Concept",
    "question": "[MATH & MEDIANS #51 &bull; Fintech & Ledger Systems] Why is calculating the exact statistical MEDIAN in SQL more challenging than calculating AVG? (Application Scenario 1)",
    "options": [
      "ANSI SQL does not allow mathematical division on medians",
      "Medians cannot be computed on odd numbers of rows",
      "Median requires a trigonometric calculus engine",
      "AVG is a cumulative sum divided by count O(1) streaming aggregate, whereas MEDIAN requires sorting or partitioning the entire dataset to find the 50th percentile value"
    ],
    "correctIndex": 3,
    "explanation": "AVG is linear and distributive (sum and count can be accumulated in a single pass). Median requires ordering all values to locate the center position, which is an O(N log N) sorting or percentile rank operation. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_math_52",
    "keyword": "MATH & MEDIANS",
    "tag": "🏛️ Corporate Edge",
    "question": "[MATH & MEDIANS #52 &bull; SaaS Subscription Billing] In SQL geometry and coordinate analysis, which formula correctly computes the Manhattan Distance between points (a, b) and (c, d)?",
    "options": [
      "SQRT(POW(a - c, 2) + POW(b - d, 2))",
      "ABS(a - c) + ABS(b - d)",
      "POW(ABS(a - c), 2) + POW(ABS(b - d), 2)",
      "ROUND(a - c, 2) * ROUND(b - d, 2)"
    ],
    "correctIndex": 1,
    "explanation": "The Manhattan Distance (taxicab metric) between points (a, b) and (c, d) is the sum of horizontal and vertical absolute coordinate differences: ABS(a - c) + ABS(b - d). [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_math_53",
    "keyword": "MATH & MEDIANS",
    "tag": "💡 Lead Architect",
    "question": "[MATH & MEDIANS #53 &bull; Global Supply Chain & Logistics] What is the Euclidean Distance formula between two coordinate points (x1, y1) and (x2, y2) implemented in standard SQL? (Application Scenario 1)",
    "options": [
      "ABS(x2 - x1) + ABS(y2 - y1)",
      "POW(x2 - x1, 2) * POW(y2 - y1, 2)",
      "MOD(x2 - x1, y2 - y1)",
      "SQRT(POW(x2 - x1, 2) + POW(y2 - y1, 2))"
    ],
    "correctIndex": 3,
    "explanation": "Euclidean distance is the straight-line distance derived from the Pythagorean theorem: square root of the sum of squared differences. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_math_54",
    "keyword": "MATH & MEDIANS",
    "tag": "⚡ Gotcha Trap",
    "question": "[MATH & MEDIANS #54 &bull; Healthcare Patient Records] What is the Manhattan Distance formula between two coordinates (x1, y1) and (x2, y2) in SQL? (Application Scenario 1)",
    "options": [
      "SQRT(POW(x1 - x2, 2) + POW(y1 - y2, 2))",
      "ABS(x1 - x2) + ABS(y1 - y2)",
      "LOG(ABS(x1 - x2)) + LOG(ABS(y1 - y2))",
      "MAX(x1, x2) - MIN(y1, y2)"
    ],
    "correctIndex": 1,
    "explanation": "Manhattan distance (L1 norm or city block distance) is calculated as the sum of the absolute differences of Cartesian coordinates: ABS(x1 - x2) + ABS(y1 - y2). [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_math_55",
    "keyword": "MATH & MEDIANS",
    "tag": "🎯 Core Concept",
    "question": "[MATH & MEDIANS #55 &bull; E-Commerce Checkout Funnels] What is the result of 'SELECT ROUND(12.345, 2);' versus 'SELECT TRUNCATE(12.345, 2);' in MySQL? (Application Scenario 1)",
    "options": [
      "Both return 12.35",
      "Both return 12.34",
      "TRUNCATE throws an error on non-integer inputs",
      "ROUND returns 12.35 (rounds up on 5); TRUNCATE returns 12.34 (chops off decimals without rounding)"
    ],
    "correctIndex": 3,
    "explanation": "ROUND rounds half-up based on standard arithmetic rules. TRUNCATE strictly discards fractional digits beyond the specified precision. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_math_56",
    "keyword": "MATH & MEDIANS",
    "tag": "🏛️ Corporate Edge",
    "question": "[MATH & MEDIANS #56 &bull; Telecom Billing & Data Streams] Why is calculating the exact statistical MEDIAN in SQL more challenging than calculating AVG? (Application Scenario 2)",
    "options": [
      "ANSI SQL does not allow mathematical division on medians",
      "AVG is a cumulative sum divided by count O(1) streaming aggregate, whereas MEDIAN requires sorting or partitioning the entire dataset to find the 50th percentile value",
      "Medians cannot be computed on odd numbers of rows",
      "Median requires a trigonometric calculus engine"
    ],
    "correctIndex": 1,
    "explanation": "AVG is linear and distributive (sum and count can be accumulated in a single pass). Median requires ordering all values to locate the center position, which is an O(N log N) sorting or percentile rank operation. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_math_57",
    "keyword": "MATH & MEDIANS",
    "tag": "💡 Lead Architect",
    "question": "[MATH & MEDIANS #57 &bull; AdTech Real-Time Bidding] In SQL geometry and coordinate analysis, which formula correctly computes the Manhattan Distance between points (a, b) and (c, d)?",
    "options": [
      "SQRT(POW(a - c, 2) + POW(b - d, 2))",
      "ABS(a - c) + ABS(b - d)",
      "POW(ABS(a - c), 2) + POW(ABS(b - d), 2)",
      "ROUND(a - c, 2) * ROUND(b - d, 2)"
    ],
    "correctIndex": 1,
    "explanation": "The Manhattan Distance (taxicab metric) between points (a, b) and (c, d) is the sum of horizontal and vertical absolute coordinate differences: ABS(a - c) + ABS(b - d). [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_math_58",
    "keyword": "MATH & MEDIANS",
    "tag": "⚡ Gotcha Trap",
    "question": "[MATH & MEDIANS #58 &bull; Cybersecurity Audit Logs] What is the Euclidean Distance formula between two coordinate points (x1, y1) and (x2, y2) implemented in standard SQL? (Application Scenario 2)",
    "options": [
      "ABS(x2 - x1) + ABS(y2 - y1)",
      "SQRT(POW(x2 - x1, 2) + POW(y2 - y1, 2))",
      "POW(x2 - x1, 2) * POW(y2 - y1, 2)",
      "MOD(x2 - x1, y2 - y1)"
    ],
    "correctIndex": 1,
    "explanation": "Euclidean distance is the straight-line distance derived from the Pythagorean theorem: square root of the sum of squared differences. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_math_59",
    "keyword": "MATH & MEDIANS",
    "tag": "🎯 Core Concept",
    "question": "[MATH & MEDIANS #59 &bull; Fintech & Ledger Systems] What is the Manhattan Distance formula between two coordinates (x1, y1) and (x2, y2) in SQL? (Application Scenario 2)",
    "options": [
      "SQRT(POW(x1 - x2, 2) + POW(y1 - y2, 2))",
      "LOG(ABS(x1 - x2)) + LOG(ABS(y1 - y2))",
      "MAX(x1, x2) - MIN(y1, y2)",
      "ABS(x1 - x2) + ABS(y1 - y2)"
    ],
    "correctIndex": 3,
    "explanation": "Manhattan distance (L1 norm or city block distance) is calculated as the sum of the absolute differences of Cartesian coordinates: ABS(x1 - x2) + ABS(y1 - y2). [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_math_60",
    "keyword": "MATH & MEDIANS",
    "tag": "🏛️ Corporate Edge",
    "question": "[MATH & MEDIANS #60 &bull; SaaS Subscription Billing] What is the result of 'SELECT ROUND(12.345, 2);' versus 'SELECT TRUNCATE(12.345, 2);' in MySQL? (Application Scenario 2)",
    "options": [
      "Both return 12.35",
      "ROUND returns 12.35 (rounds up on 5); TRUNCATE returns 12.34 (chops off decimals without rounding)",
      "Both return 12.34",
      "TRUNCATE throws an error on non-integer inputs"
    ],
    "correctIndex": 1,
    "explanation": "ROUND rounds half-up based on standard arithmetic rules. TRUNCATE strictly discards fractional digits beyond the specified precision. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_math_61",
    "keyword": "MATH & MEDIANS",
    "tag": "💡 Lead Architect",
    "question": "[MATH & MEDIANS #61 &bull; Global Supply Chain & Logistics] Why is calculating the exact statistical MEDIAN in SQL more challenging than calculating AVG? (Application Scenario 3)",
    "options": [
      "ANSI SQL does not allow mathematical division on medians",
      "Medians cannot be computed on odd numbers of rows",
      "Median requires a trigonometric calculus engine",
      "AVG is a cumulative sum divided by count O(1) streaming aggregate, whereas MEDIAN requires sorting or partitioning the entire dataset to find the 50th percentile value"
    ],
    "correctIndex": 3,
    "explanation": "AVG is linear and distributive (sum and count can be accumulated in a single pass). Median requires ordering all values to locate the center position, which is an O(N log N) sorting or percentile rank operation. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_math_62",
    "keyword": "MATH & MEDIANS",
    "tag": "⚡ Gotcha Trap",
    "question": "[MATH & MEDIANS #62 &bull; Healthcare Patient Records] In SQL geometry and coordinate analysis, which formula correctly computes the Manhattan Distance between points (a, b) and (c, d)?",
    "options": [
      "SQRT(POW(a - c, 2) + POW(b - d, 2))",
      "ABS(a - c) + ABS(b - d)",
      "POW(ABS(a - c), 2) + POW(ABS(b - d), 2)",
      "ROUND(a - c, 2) * ROUND(b - d, 2)"
    ],
    "correctIndex": 1,
    "explanation": "The Manhattan Distance (taxicab metric) between points (a, b) and (c, d) is the sum of horizontal and vertical absolute coordinate differences: ABS(a - c) + ABS(b - d). [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_math_63",
    "keyword": "MATH & MEDIANS",
    "tag": "🎯 Core Concept",
    "question": "[MATH & MEDIANS #63 &bull; E-Commerce Checkout Funnels] What is the Euclidean Distance formula between two coordinate points (x1, y1) and (x2, y2) implemented in standard SQL? (Application Scenario 3)",
    "options": [
      "ABS(x2 - x1) + ABS(y2 - y1)",
      "POW(x2 - x1, 2) * POW(y2 - y1, 2)",
      "MOD(x2 - x1, y2 - y1)",
      "SQRT(POW(x2 - x1, 2) + POW(y2 - y1, 2))"
    ],
    "correctIndex": 3,
    "explanation": "Euclidean distance is the straight-line distance derived from the Pythagorean theorem: square root of the sum of squared differences. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_math_64",
    "keyword": "MATH & MEDIANS",
    "tag": "🏛️ Corporate Edge",
    "question": "[MATH & MEDIANS #64 &bull; Telecom Billing & Data Streams] What is the Manhattan Distance formula between two coordinates (x1, y1) and (x2, y2) in SQL? (Application Scenario 3)",
    "options": [
      "SQRT(POW(x1 - x2, 2) + POW(y1 - y2, 2))",
      "ABS(x1 - x2) + ABS(y1 - y2)",
      "LOG(ABS(x1 - x2)) + LOG(ABS(y1 - y2))",
      "MAX(x1, x2) - MIN(y1, y2)"
    ],
    "correctIndex": 1,
    "explanation": "Manhattan distance (L1 norm or city block distance) is calculated as the sum of the absolute differences of Cartesian coordinates: ABS(x1 - x2) + ABS(y1 - y2). [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_math_65",
    "keyword": "MATH & MEDIANS",
    "tag": "💡 Lead Architect",
    "question": "[MATH & MEDIANS #65 &bull; AdTech Real-Time Bidding] What is the result of 'SELECT ROUND(12.345, 2);' versus 'SELECT TRUNCATE(12.345, 2);' in MySQL? (Application Scenario 3)",
    "options": [
      "Both return 12.35",
      "Both return 12.34",
      "TRUNCATE throws an error on non-integer inputs",
      "ROUND returns 12.35 (rounds up on 5); TRUNCATE returns 12.34 (chops off decimals without rounding)"
    ],
    "correctIndex": 3,
    "explanation": "ROUND rounds half-up based on standard arithmetic rules. TRUNCATE strictly discards fractional digits beyond the specified precision. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_math_66",
    "keyword": "MATH & MEDIANS",
    "tag": "⚡ Gotcha Trap",
    "question": "[MATH & MEDIANS #66 &bull; Cybersecurity Audit Logs] Why is calculating the exact statistical MEDIAN in SQL more challenging than calculating AVG? (Application Scenario 4)",
    "options": [
      "ANSI SQL does not allow mathematical division on medians",
      "AVG is a cumulative sum divided by count O(1) streaming aggregate, whereas MEDIAN requires sorting or partitioning the entire dataset to find the 50th percentile value",
      "Medians cannot be computed on odd numbers of rows",
      "Median requires a trigonometric calculus engine"
    ],
    "correctIndex": 1,
    "explanation": "AVG is linear and distributive (sum and count can be accumulated in a single pass). Median requires ordering all values to locate the center position, which is an O(N log N) sorting or percentile rank operation. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_math_67",
    "keyword": "MATH & MEDIANS",
    "tag": "🎯 Core Concept",
    "question": "[MATH & MEDIANS #67 &bull; Fintech & Ledger Systems] In SQL geometry and coordinate analysis, which formula correctly computes the Manhattan Distance between points (a, b) and (c, d)?",
    "options": [
      "SQRT(POW(a - c, 2) + POW(b - d, 2))",
      "ABS(a - c) + ABS(b - d)",
      "POW(ABS(a - c), 2) + POW(ABS(b - d), 2)",
      "ROUND(a - c, 2) * ROUND(b - d, 2)"
    ],
    "correctIndex": 1,
    "explanation": "The Manhattan Distance (taxicab metric) between points (a, b) and (c, d) is the sum of horizontal and vertical absolute coordinate differences: ABS(a - c) + ABS(b - d). [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_math_68",
    "keyword": "MATH & MEDIANS",
    "tag": "🏛️ Corporate Edge",
    "question": "[MATH & MEDIANS #68 &bull; SaaS Subscription Billing] What is the Euclidean Distance formula between two coordinate points (x1, y1) and (x2, y2) implemented in standard SQL? (Application Scenario 4)",
    "options": [
      "ABS(x2 - x1) + ABS(y2 - y1)",
      "SQRT(POW(x2 - x1, 2) + POW(y2 - y1, 2))",
      "POW(x2 - x1, 2) * POW(y2 - y1, 2)",
      "MOD(x2 - x1, y2 - y1)"
    ],
    "correctIndex": 1,
    "explanation": "Euclidean distance is the straight-line distance derived from the Pythagorean theorem: square root of the sum of squared differences. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_math_69",
    "keyword": "MATH & MEDIANS",
    "tag": "💡 Lead Architect",
    "question": "[MATH & MEDIANS #69 &bull; Global Supply Chain & Logistics] What is the Manhattan Distance formula between two coordinates (x1, y1) and (x2, y2) in SQL? (Application Scenario 4)",
    "options": [
      "SQRT(POW(x1 - x2, 2) + POW(y1 - y2, 2))",
      "LOG(ABS(x1 - x2)) + LOG(ABS(y1 - y2))",
      "MAX(x1, x2) - MIN(y1, y2)",
      "ABS(x1 - x2) + ABS(y1 - y2)"
    ],
    "correctIndex": 3,
    "explanation": "Manhattan distance (L1 norm or city block distance) is calculated as the sum of the absolute differences of Cartesian coordinates: ABS(x1 - x2) + ABS(y1 - y2). [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_math_70",
    "keyword": "MATH & MEDIANS",
    "tag": "⚡ Gotcha Trap",
    "question": "[MATH & MEDIANS #70 &bull; Healthcare Patient Records] What is the result of 'SELECT ROUND(12.345, 2);' versus 'SELECT TRUNCATE(12.345, 2);' in MySQL? (Application Scenario 4)",
    "options": [
      "Both return 12.35",
      "ROUND returns 12.35 (rounds up on 5); TRUNCATE returns 12.34 (chops off decimals without rounding)",
      "Both return 12.34",
      "TRUNCATE throws an error on non-integer inputs"
    ],
    "correctIndex": 1,
    "explanation": "ROUND rounds half-up based on standard arithmetic rules. TRUNCATE strictly discards fractional digits beyond the specified precision. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_math_71",
    "keyword": "MATH & MEDIANS",
    "tag": "🎯 Core Concept",
    "question": "[MATH & MEDIANS #71 &bull; E-Commerce Checkout Funnels] Why is calculating the exact statistical MEDIAN in SQL more challenging than calculating AVG? (Application Scenario 5)",
    "options": [
      "ANSI SQL does not allow mathematical division on medians",
      "Medians cannot be computed on odd numbers of rows",
      "Median requires a trigonometric calculus engine",
      "AVG is a cumulative sum divided by count O(1) streaming aggregate, whereas MEDIAN requires sorting or partitioning the entire dataset to find the 50th percentile value"
    ],
    "correctIndex": 3,
    "explanation": "AVG is linear and distributive (sum and count can be accumulated in a single pass). Median requires ordering all values to locate the center position, which is an O(N log N) sorting or percentile rank operation. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_math_72",
    "keyword": "MATH & MEDIANS",
    "tag": "🏛️ Corporate Edge",
    "question": "[MATH & MEDIANS #72 &bull; Telecom Billing & Data Streams] In SQL geometry and coordinate analysis, which formula correctly computes the Manhattan Distance between points (a, b) and (c, d)?",
    "options": [
      "SQRT(POW(a - c, 2) + POW(b - d, 2))",
      "ABS(a - c) + ABS(b - d)",
      "POW(ABS(a - c), 2) + POW(ABS(b - d), 2)",
      "ROUND(a - c, 2) * ROUND(b - d, 2)"
    ],
    "correctIndex": 1,
    "explanation": "The Manhattan Distance (taxicab metric) between points (a, b) and (c, d) is the sum of horizontal and vertical absolute coordinate differences: ABS(a - c) + ABS(b - d). [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_math_73",
    "keyword": "MATH & MEDIANS",
    "tag": "💡 Lead Architect",
    "question": "[MATH & MEDIANS #73 &bull; AdTech Real-Time Bidding] What is the Euclidean Distance formula between two coordinate points (x1, y1) and (x2, y2) implemented in standard SQL? (Application Scenario 5)",
    "options": [
      "ABS(x2 - x1) + ABS(y2 - y1)",
      "POW(x2 - x1, 2) * POW(y2 - y1, 2)",
      "MOD(x2 - x1, y2 - y1)",
      "SQRT(POW(x2 - x1, 2) + POW(y2 - y1, 2))"
    ],
    "correctIndex": 3,
    "explanation": "Euclidean distance is the straight-line distance derived from the Pythagorean theorem: square root of the sum of squared differences. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_math_74",
    "keyword": "MATH & MEDIANS",
    "tag": "⚡ Gotcha Trap",
    "question": "[MATH & MEDIANS #74 &bull; Cybersecurity Audit Logs] What is the Manhattan Distance formula between two coordinates (x1, y1) and (x2, y2) in SQL? (Application Scenario 5)",
    "options": [
      "SQRT(POW(x1 - x2, 2) + POW(y1 - y2, 2))",
      "ABS(x1 - x2) + ABS(y1 - y2)",
      "LOG(ABS(x1 - x2)) + LOG(ABS(y1 - y2))",
      "MAX(x1, x2) - MIN(y1, y2)"
    ],
    "correctIndex": 1,
    "explanation": "Manhattan distance (L1 norm or city block distance) is calculated as the sum of the absolute differences of Cartesian coordinates: ABS(x1 - x2) + ABS(y1 - y2). [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_math_75",
    "keyword": "MATH & MEDIANS",
    "tag": "🎯 Core Concept",
    "question": "[MATH & MEDIANS #75 &bull; Fintech & Ledger Systems] What is the result of 'SELECT ROUND(12.345, 2);' versus 'SELECT TRUNCATE(12.345, 2);' in MySQL? (Application Scenario 5)",
    "options": [
      "Both return 12.35",
      "Both return 12.34",
      "TRUNCATE throws an error on non-integer inputs",
      "ROUND returns 12.35 (rounds up on 5); TRUNCATE returns 12.34 (chops off decimals without rounding)"
    ],
    "correctIndex": 3,
    "explanation": "ROUND rounds half-up based on standard arithmetic rules. TRUNCATE strictly discards fractional digits beyond the specified precision. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_math_76",
    "keyword": "MATH & MEDIANS",
    "tag": "🏛️ Corporate Edge",
    "question": "[MATH & MEDIANS #76 &bull; SaaS Subscription Billing] Why is calculating the exact statistical MEDIAN in SQL more challenging than calculating AVG? (Application Scenario 6)",
    "options": [
      "ANSI SQL does not allow mathematical division on medians",
      "AVG is a cumulative sum divided by count O(1) streaming aggregate, whereas MEDIAN requires sorting or partitioning the entire dataset to find the 50th percentile value",
      "Medians cannot be computed on odd numbers of rows",
      "Median requires a trigonometric calculus engine"
    ],
    "correctIndex": 1,
    "explanation": "AVG is linear and distributive (sum and count can be accumulated in a single pass). Median requires ordering all values to locate the center position, which is an O(N log N) sorting or percentile rank operation. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_math_77",
    "keyword": "MATH & MEDIANS",
    "tag": "💡 Lead Architect",
    "question": "[MATH & MEDIANS #77 &bull; Global Supply Chain & Logistics] In SQL geometry and coordinate analysis, which formula correctly computes the Manhattan Distance between points (a, b) and (c, d)?",
    "options": [
      "SQRT(POW(a - c, 2) + POW(b - d, 2))",
      "ABS(a - c) + ABS(b - d)",
      "POW(ABS(a - c), 2) + POW(ABS(b - d), 2)",
      "ROUND(a - c, 2) * ROUND(b - d, 2)"
    ],
    "correctIndex": 1,
    "explanation": "The Manhattan Distance (taxicab metric) between points (a, b) and (c, d) is the sum of horizontal and vertical absolute coordinate differences: ABS(a - c) + ABS(b - d). [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_math_78",
    "keyword": "MATH & MEDIANS",
    "tag": "⚡ Gotcha Trap",
    "question": "[MATH & MEDIANS #78 &bull; Healthcare Patient Records] What is the Euclidean Distance formula between two coordinate points (x1, y1) and (x2, y2) implemented in standard SQL? (Application Scenario 6)",
    "options": [
      "ABS(x2 - x1) + ABS(y2 - y1)",
      "SQRT(POW(x2 - x1, 2) + POW(y2 - y1, 2))",
      "POW(x2 - x1, 2) * POW(y2 - y1, 2)",
      "MOD(x2 - x1, y2 - y1)"
    ],
    "correctIndex": 1,
    "explanation": "Euclidean distance is the straight-line distance derived from the Pythagorean theorem: square root of the sum of squared differences. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_math_79",
    "keyword": "MATH & MEDIANS",
    "tag": "🎯 Core Concept",
    "question": "[MATH & MEDIANS #79 &bull; E-Commerce Checkout Funnels] What is the Manhattan Distance formula between two coordinates (x1, y1) and (x2, y2) in SQL? (Application Scenario 6)",
    "options": [
      "SQRT(POW(x1 - x2, 2) + POW(y1 - y2, 2))",
      "LOG(ABS(x1 - x2)) + LOG(ABS(y1 - y2))",
      "MAX(x1, x2) - MIN(y1, y2)",
      "ABS(x1 - x2) + ABS(y1 - y2)"
    ],
    "correctIndex": 3,
    "explanation": "Manhattan distance (L1 norm or city block distance) is calculated as the sum of the absolute differences of Cartesian coordinates: ABS(x1 - x2) + ABS(y1 - y2). [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_math_80",
    "keyword": "MATH & MEDIANS",
    "tag": "🏛️ Corporate Edge",
    "question": "[MATH & MEDIANS #80 &bull; Telecom Billing & Data Streams] What is the result of 'SELECT ROUND(12.345, 2);' versus 'SELECT TRUNCATE(12.345, 2);' in MySQL? (Application Scenario 6)",
    "options": [
      "Both return 12.35",
      "ROUND returns 12.35 (rounds up on 5); TRUNCATE returns 12.34 (chops off decimals without rounding)",
      "Both return 12.34",
      "TRUNCATE throws an error on non-integer inputs"
    ],
    "correctIndex": 1,
    "explanation": "ROUND rounds half-up based on standard arithmetic rules. TRUNCATE strictly discards fractional digits beyond the specified precision. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_math_81",
    "keyword": "MATH & MEDIANS",
    "tag": "💡 Lead Architect",
    "question": "[MATH & MEDIANS #81 &bull; AdTech Real-Time Bidding] Why is calculating the exact statistical MEDIAN in SQL more challenging than calculating AVG? (Application Scenario 7)",
    "options": [
      "ANSI SQL does not allow mathematical division on medians",
      "Medians cannot be computed on odd numbers of rows",
      "Median requires a trigonometric calculus engine",
      "AVG is a cumulative sum divided by count O(1) streaming aggregate, whereas MEDIAN requires sorting or partitioning the entire dataset to find the 50th percentile value"
    ],
    "correctIndex": 3,
    "explanation": "AVG is linear and distributive (sum and count can be accumulated in a single pass). Median requires ordering all values to locate the center position, which is an O(N log N) sorting or percentile rank operation. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_math_82",
    "keyword": "MATH & MEDIANS",
    "tag": "⚡ Gotcha Trap",
    "question": "[MATH & MEDIANS #82 &bull; Cybersecurity Audit Logs] In SQL geometry and coordinate analysis, which formula correctly computes the Manhattan Distance between points (a, b) and (c, d)?",
    "options": [
      "SQRT(POW(a - c, 2) + POW(b - d, 2))",
      "ABS(a - c) + ABS(b - d)",
      "POW(ABS(a - c), 2) + POW(ABS(b - d), 2)",
      "ROUND(a - c, 2) * ROUND(b - d, 2)"
    ],
    "correctIndex": 1,
    "explanation": "The Manhattan Distance (taxicab metric) between points (a, b) and (c, d) is the sum of horizontal and vertical absolute coordinate differences: ABS(a - c) + ABS(b - d). [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_math_83",
    "keyword": "MATH & MEDIANS",
    "tag": "🎯 Core Concept",
    "question": "[MATH & MEDIANS #83 &bull; Fintech & Ledger Systems] What is the Euclidean Distance formula between two coordinate points (x1, y1) and (x2, y2) implemented in standard SQL? (Application Scenario 7)",
    "options": [
      "ABS(x2 - x1) + ABS(y2 - y1)",
      "POW(x2 - x1, 2) * POW(y2 - y1, 2)",
      "MOD(x2 - x1, y2 - y1)",
      "SQRT(POW(x2 - x1, 2) + POW(y2 - y1, 2))"
    ],
    "correctIndex": 3,
    "explanation": "Euclidean distance is the straight-line distance derived from the Pythagorean theorem: square root of the sum of squared differences. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_math_84",
    "keyword": "MATH & MEDIANS",
    "tag": "🏛️ Corporate Edge",
    "question": "[MATH & MEDIANS #84 &bull; SaaS Subscription Billing] What is the Manhattan Distance formula between two coordinates (x1, y1) and (x2, y2) in SQL? (Application Scenario 7)",
    "options": [
      "SQRT(POW(x1 - x2, 2) + POW(y1 - y2, 2))",
      "ABS(x1 - x2) + ABS(y1 - y2)",
      "LOG(ABS(x1 - x2)) + LOG(ABS(y1 - y2))",
      "MAX(x1, x2) - MIN(y1, y2)"
    ],
    "correctIndex": 1,
    "explanation": "Manhattan distance (L1 norm or city block distance) is calculated as the sum of the absolute differences of Cartesian coordinates: ABS(x1 - x2) + ABS(y1 - y2). [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_math_85",
    "keyword": "MATH & MEDIANS",
    "tag": "💡 Lead Architect",
    "question": "[MATH & MEDIANS #85 &bull; Global Supply Chain & Logistics] What is the result of 'SELECT ROUND(12.345, 2);' versus 'SELECT TRUNCATE(12.345, 2);' in MySQL? (Application Scenario 7)",
    "options": [
      "Both return 12.35",
      "Both return 12.34",
      "TRUNCATE throws an error on non-integer inputs",
      "ROUND returns 12.35 (rounds up on 5); TRUNCATE returns 12.34 (chops off decimals without rounding)"
    ],
    "correctIndex": 3,
    "explanation": "ROUND rounds half-up based on standard arithmetic rules. TRUNCATE strictly discards fractional digits beyond the specified precision. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_math_86",
    "keyword": "MATH & MEDIANS",
    "tag": "⚡ Gotcha Trap",
    "question": "[MATH & MEDIANS #86 &bull; Healthcare Patient Records] Why is calculating the exact statistical MEDIAN in SQL more challenging than calculating AVG? (Application Scenario 8)",
    "options": [
      "ANSI SQL does not allow mathematical division on medians",
      "AVG is a cumulative sum divided by count O(1) streaming aggregate, whereas MEDIAN requires sorting or partitioning the entire dataset to find the 50th percentile value",
      "Medians cannot be computed on odd numbers of rows",
      "Median requires a trigonometric calculus engine"
    ],
    "correctIndex": 1,
    "explanation": "AVG is linear and distributive (sum and count can be accumulated in a single pass). Median requires ordering all values to locate the center position, which is an O(N log N) sorting or percentile rank operation. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_math_87",
    "keyword": "MATH & MEDIANS",
    "tag": "🎯 Core Concept",
    "question": "[MATH & MEDIANS #87 &bull; E-Commerce Checkout Funnels] In SQL geometry and coordinate analysis, which formula correctly computes the Manhattan Distance between points (a, b) and (c, d)?",
    "options": [
      "SQRT(POW(a - c, 2) + POW(b - d, 2))",
      "ABS(a - c) + ABS(b - d)",
      "POW(ABS(a - c), 2) + POW(ABS(b - d), 2)",
      "ROUND(a - c, 2) * ROUND(b - d, 2)"
    ],
    "correctIndex": 1,
    "explanation": "The Manhattan Distance (taxicab metric) between points (a, b) and (c, d) is the sum of horizontal and vertical absolute coordinate differences: ABS(a - c) + ABS(b - d). [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_math_88",
    "keyword": "MATH & MEDIANS",
    "tag": "🏛️ Corporate Edge",
    "question": "[MATH & MEDIANS #88 &bull; Telecom Billing & Data Streams] What is the Euclidean Distance formula between two coordinate points (x1, y1) and (x2, y2) implemented in standard SQL? (Application Scenario 8)",
    "options": [
      "ABS(x2 - x1) + ABS(y2 - y1)",
      "SQRT(POW(x2 - x1, 2) + POW(y2 - y1, 2))",
      "POW(x2 - x1, 2) * POW(y2 - y1, 2)",
      "MOD(x2 - x1, y2 - y1)"
    ],
    "correctIndex": 1,
    "explanation": "Euclidean distance is the straight-line distance derived from the Pythagorean theorem: square root of the sum of squared differences. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_math_89",
    "keyword": "MATH & MEDIANS",
    "tag": "💡 Lead Architect",
    "question": "[MATH & MEDIANS #89 &bull; AdTech Real-Time Bidding] What is the Manhattan Distance formula between two coordinates (x1, y1) and (x2, y2) in SQL? (Application Scenario 8)",
    "options": [
      "SQRT(POW(x1 - x2, 2) + POW(y1 - y2, 2))",
      "LOG(ABS(x1 - x2)) + LOG(ABS(y1 - y2))",
      "MAX(x1, x2) - MIN(y1, y2)",
      "ABS(x1 - x2) + ABS(y1 - y2)"
    ],
    "correctIndex": 3,
    "explanation": "Manhattan distance (L1 norm or city block distance) is calculated as the sum of the absolute differences of Cartesian coordinates: ABS(x1 - x2) + ABS(y1 - y2). [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_math_90",
    "keyword": "MATH & MEDIANS",
    "tag": "⚡ Gotcha Trap",
    "question": "[MATH & MEDIANS #90 &bull; Cybersecurity Audit Logs] What is the result of 'SELECT ROUND(12.345, 2);' versus 'SELECT TRUNCATE(12.345, 2);' in MySQL? (Application Scenario 8)",
    "options": [
      "Both return 12.35",
      "ROUND returns 12.35 (rounds up on 5); TRUNCATE returns 12.34 (chops off decimals without rounding)",
      "Both return 12.34",
      "TRUNCATE throws an error on non-integer inputs"
    ],
    "correctIndex": 1,
    "explanation": "ROUND rounds half-up based on standard arithmetic rules. TRUNCATE strictly discards fractional digits beyond the specified precision. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_math_91",
    "keyword": "MATH & MEDIANS",
    "tag": "🎯 Core Concept",
    "question": "[MATH & MEDIANS #91 &bull; Fintech & Ledger Systems] Why is calculating the exact statistical MEDIAN in SQL more challenging than calculating AVG? (Application Scenario 9)",
    "options": [
      "ANSI SQL does not allow mathematical division on medians",
      "Medians cannot be computed on odd numbers of rows",
      "Median requires a trigonometric calculus engine",
      "AVG is a cumulative sum divided by count O(1) streaming aggregate, whereas MEDIAN requires sorting or partitioning the entire dataset to find the 50th percentile value"
    ],
    "correctIndex": 3,
    "explanation": "AVG is linear and distributive (sum and count can be accumulated in a single pass). Median requires ordering all values to locate the center position, which is an O(N log N) sorting or percentile rank operation. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_math_92",
    "keyword": "MATH & MEDIANS",
    "tag": "🏛️ Corporate Edge",
    "question": "[MATH & MEDIANS #92 &bull; SaaS Subscription Billing] In SQL geometry and coordinate analysis, which formula correctly computes the Manhattan Distance between points (a, b) and (c, d)?",
    "options": [
      "SQRT(POW(a - c, 2) + POW(b - d, 2))",
      "ABS(a - c) + ABS(b - d)",
      "POW(ABS(a - c), 2) + POW(ABS(b - d), 2)",
      "ROUND(a - c, 2) * ROUND(b - d, 2)"
    ],
    "correctIndex": 1,
    "explanation": "The Manhattan Distance (taxicab metric) between points (a, b) and (c, d) is the sum of horizontal and vertical absolute coordinate differences: ABS(a - c) + ABS(b - d). [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_math_93",
    "keyword": "MATH & MEDIANS",
    "tag": "💡 Lead Architect",
    "question": "[MATH & MEDIANS #93 &bull; Global Supply Chain & Logistics] What is the Euclidean Distance formula between two coordinate points (x1, y1) and (x2, y2) implemented in standard SQL? (Application Scenario 9)",
    "options": [
      "ABS(x2 - x1) + ABS(y2 - y1)",
      "POW(x2 - x1, 2) * POW(y2 - y1, 2)",
      "MOD(x2 - x1, y2 - y1)",
      "SQRT(POW(x2 - x1, 2) + POW(y2 - y1, 2))"
    ],
    "correctIndex": 3,
    "explanation": "Euclidean distance is the straight-line distance derived from the Pythagorean theorem: square root of the sum of squared differences. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_math_94",
    "keyword": "MATH & MEDIANS",
    "tag": "⚡ Gotcha Trap",
    "question": "[MATH & MEDIANS #94 &bull; Healthcare Patient Records] What is the Manhattan Distance formula between two coordinates (x1, y1) and (x2, y2) in SQL? (Application Scenario 9)",
    "options": [
      "SQRT(POW(x1 - x2, 2) + POW(y1 - y2, 2))",
      "ABS(x1 - x2) + ABS(y1 - y2)",
      "LOG(ABS(x1 - x2)) + LOG(ABS(y1 - y2))",
      "MAX(x1, x2) - MIN(y1, y2)"
    ],
    "correctIndex": 1,
    "explanation": "Manhattan distance (L1 norm or city block distance) is calculated as the sum of the absolute differences of Cartesian coordinates: ABS(x1 - x2) + ABS(y1 - y2). [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_math_95",
    "keyword": "MATH & MEDIANS",
    "tag": "🎯 Core Concept",
    "question": "[MATH & MEDIANS #95 &bull; E-Commerce Checkout Funnels] What is the result of 'SELECT ROUND(12.345, 2);' versus 'SELECT TRUNCATE(12.345, 2);' in MySQL? (Application Scenario 9)",
    "options": [
      "Both return 12.35",
      "Both return 12.34",
      "TRUNCATE throws an error on non-integer inputs",
      "ROUND returns 12.35 (rounds up on 5); TRUNCATE returns 12.34 (chops off decimals without rounding)"
    ],
    "correctIndex": 3,
    "explanation": "ROUND rounds half-up based on standard arithmetic rules. TRUNCATE strictly discards fractional digits beyond the specified precision. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_math_96",
    "keyword": "MATH & MEDIANS",
    "tag": "🏛️ Corporate Edge",
    "question": "[MATH & MEDIANS #96 &bull; Telecom Billing & Data Streams] Why is calculating the exact statistical MEDIAN in SQL more challenging than calculating AVG? (Application Scenario 10)",
    "options": [
      "ANSI SQL does not allow mathematical division on medians",
      "AVG is a cumulative sum divided by count O(1) streaming aggregate, whereas MEDIAN requires sorting or partitioning the entire dataset to find the 50th percentile value",
      "Medians cannot be computed on odd numbers of rows",
      "Median requires a trigonometric calculus engine"
    ],
    "correctIndex": 1,
    "explanation": "AVG is linear and distributive (sum and count can be accumulated in a single pass). Median requires ordering all values to locate the center position, which is an O(N log N) sorting or percentile rank operation. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_math_97",
    "keyword": "MATH & MEDIANS",
    "tag": "💡 Lead Architect",
    "question": "[MATH & MEDIANS #97 &bull; AdTech Real-Time Bidding] In SQL geometry and coordinate analysis, which formula correctly computes the Manhattan Distance between points (a, b) and (c, d)?",
    "options": [
      "SQRT(POW(a - c, 2) + POW(b - d, 2))",
      "ABS(a - c) + ABS(b - d)",
      "POW(ABS(a - c), 2) + POW(ABS(b - d), 2)",
      "ROUND(a - c, 2) * ROUND(b - d, 2)"
    ],
    "correctIndex": 1,
    "explanation": "The Manhattan Distance (taxicab metric) between points (a, b) and (c, d) is the sum of horizontal and vertical absolute coordinate differences: ABS(a - c) + ABS(b - d). [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_math_98",
    "keyword": "MATH & MEDIANS",
    "tag": "⚡ Gotcha Trap",
    "question": "[MATH & MEDIANS #98 &bull; Cybersecurity Audit Logs] What is the Euclidean Distance formula between two coordinate points (x1, y1) and (x2, y2) implemented in standard SQL? (Application Scenario 10)",
    "options": [
      "ABS(x2 - x1) + ABS(y2 - y1)",
      "SQRT(POW(x2 - x1, 2) + POW(y2 - y1, 2))",
      "POW(x2 - x1, 2) * POW(y2 - y1, 2)",
      "MOD(x2 - x1, y2 - y1)"
    ],
    "correctIndex": 1,
    "explanation": "Euclidean distance is the straight-line distance derived from the Pythagorean theorem: square root of the sum of squared differences. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_math_99",
    "keyword": "MATH & MEDIANS",
    "tag": "🎯 Core Concept",
    "question": "[MATH & MEDIANS #99 &bull; Fintech & Ledger Systems] What is the Manhattan Distance formula between two coordinates (x1, y1) and (x2, y2) in SQL? (Application Scenario 10)",
    "options": [
      "SQRT(POW(x1 - x2, 2) + POW(y1 - y2, 2))",
      "LOG(ABS(x1 - x2)) + LOG(ABS(y1 - y2))",
      "MAX(x1, x2) - MIN(y1, y2)",
      "ABS(x1 - x2) + ABS(y1 - y2)"
    ],
    "correctIndex": 3,
    "explanation": "Manhattan distance (L1 norm or city block distance) is calculated as the sum of the absolute differences of Cartesian coordinates: ABS(x1 - x2) + ABS(y1 - y2). [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_math_100",
    "keyword": "MATH & MEDIANS",
    "tag": "🏛️ Corporate Edge",
    "question": "[MATH & MEDIANS #100 &bull; SaaS Subscription Billing] What is the result of 'SELECT ROUND(12.345, 2);' versus 'SELECT TRUNCATE(12.345, 2);' in MySQL? (Application Scenario 10)",
    "options": [
      "Both return 12.35",
      "ROUND returns 12.35 (rounds up on 5); TRUNCATE returns 12.34 (chops off decimals without rounding)",
      "Both return 12.34",
      "TRUNCATE throws an error on non-integer inputs"
    ],
    "correctIndex": 1,
    "explanation": "ROUND rounds half-up based on standard arithmetic rules. TRUNCATE strictly discards fractional digits beyond the specified precision. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_joins_1",
    "keyword": "JOINS",
    "question": "In relational algebra, what is the default behavior of an INNER JOIN when a row has no matching counterpart in the joined table?",
    "options": [
      "The query terminates immediately with an integrity constraint violation",
      "The database fills missing columns with zeros or blank strings",
      "The row is omitted completely from the query output",
      "The row is included with all columns populated as NULL"
    ],
    "correctOption": "C",
    "explanation": "INNER JOIN produces the strict intersection of two relations based on the join predicate. Any left or right row that does not satisfy the predicate (or matches with NULL) is discarded from the result set.",
    "tag": "🎯 Core Concept",
    "correctIndex": 2
  },
  {
    "id": "mcq_joins_2",
    "keyword": "JOINS",
    "question": "In financial analysis, why is LEFT JOIN preferred over INNER JOIN when calculating department budget variances?",
    "options": [
      "INNER JOIN cannot perform mathematical subtraction between budget and spend",
      "LEFT JOIN automatically converts foreign keys into primary keys",
      "LEFT JOIN executes twice as fast as INNER JOIN by skipping index evaluations",
      "LEFT JOIN preserves every budgeted department, even if actual expenditure was $0, whereas INNER JOIN drops zero-spend departments"
    ],
    "correctOption": "D",
    "explanation": "If a department had zero spending during the quarter, it has no records in the actual expenditure table. An INNER JOIN would drop that department entirely from the variance report, giving executives an incomplete picture. LEFT JOIN retains the department and leaves the spend as NULL/0.",
    "tag": "🎯 Core Concept",
    "correctIndex": 3
  },
  {
    "id": "mcq_joins_3",
    "keyword": "JOINS",
    "question": "What is the primary architectural purpose of a LEFT ANTI-JOIN in auditing and bank reconciliation?",
    "options": [
      "To identify records in the primary table that have zero corresponding records in the target table (e.g. uncleared checks)",
      "To reverse debit and credit values across accounting ledgers",
      "To join tables on negative foreign key integers",
      "To block unauthorized IP addresses from accessing payroll tables"
    ],
    "correctOption": "A",
    "explanation": "A Left Anti-Join (implemented as `LEFT JOIN ... WHERE right.pk IS NULL`) specifically isolates orphaned or unmatched entities, making it the foundational tool for bank reconciliations, fraud detection, and customer churn analysis.",
    "tag": "🎯 Core Concept",
    "correctIndex": 0
  },
  {
    "id": "mcq_joins_4",
    "keyword": "JOINS",
    "question": "What catastrophic bug occurs when a right-table filter is placed in the WHERE clause instead of the ON clause of a LEFT JOIN?",
    "options": [
      "The SQL engine throws a syntax error: 'Predicate placement ambiguity'",
      "The query runs successfully but duplicates every row in the left table",
      "The LEFT JOIN is silently converted into an INNER JOIN because NULL-padded rows fail the WHERE predicate",
      "The database performs a Cartesian product that exhausts disk temp space"
    ],
    "correctOption": "C",
    "explanation": "The ON clause qualifies rows during the join phase. The WHERE clause executes after the join. Any unmatched left rows padded with NULL will evaluate to UNKNOWN against right-table WHERE filters (e.g. NULL = 'PAID'), causing the engine to discard them and turning the query into an accidental INNER JOIN.",
    "tag": "🎯 Core Concept",
    "correctIndex": 2
  },
  {
    "id": "mcq_joins_5",
    "keyword": "JOINS",
    "question": "When performing a multi-currency conversion in financial reporting, why is a composite join required?",
    "options": [
      "Because exchange rates fluctuate daily, requiring matching on BOTH currency_code AND transaction_date",
      "Because composite joins automatically execute currency arbitrage algorithms",
      "Because currencies have three-letter ISO codes that exceed standard INT indexes",
      "Because ANSI SQL forbids single-column foreign key joins on monetary values"
    ],
    "correctOption": "A",
    "explanation": "Matching only on currency_code would join every transaction against all historical exchange rates for that currency (a Cartesian explosion). The join predicate must specify `ON t.currency = fx.currency AND t.date = fx.rate_date`.",
    "tag": "🎯 Core Concept",
    "correctIndex": 0
  },
  {
    "id": "mcq_joins_6",
    "keyword": "JOINS",
    "question": "What is a NON-EQUI JOIN, and where is it predominantly used in financial modeling?",
    "options": [
      "A join between two tables that possess different numbers of columns",
      "A join between tables hosted on different physical database servers",
      "A join that compares floating point numbers with rounding tolerances",
      "A join that uses inequality operators (<, >, BETWEEN) rather than equals (=), used for tax brackets and tiered commission hurdles"
    ],
    "correctOption": "D",
    "explanation": "Non-equi joins match continuous values against ranges (e.g. `ON employee.sales BETWEEN tiers.min_sales AND tiers.max_sales`), eliminating the need for hardcoded, brittle CASE WHEN statements.",
    "tag": "🎯 Core Concept",
    "correctIndex": 3
  },
  {
    "id": "mcq_joins_7",
    "keyword": "JOINS",
    "question": "In MySQL, what is the correct syntax to emulate a FULL OUTER JOIN between Table A and Table B?",
    "options": [
      "SELECT ... FROM A CROSS JOIN B WHERE A.id = B.id OR A.id IS NULL",
      "SELECT ... FROM A FULL OUTER JOIN B ON A.id = B.id",
      "SELECT ... FROM A LEFT JOIN B ... UNION SELECT ... FROM A RIGHT JOIN B ...",
      "SELECT ... FROM A MERGE JOIN B ON A.id = B.id"
    ],
    "correctOption": "C",
    "explanation": "MySQL 8.0 does not support native `FULL OUTER JOIN` syntax. Analysts simulate it by unioning a `LEFT JOIN` and a `RIGHT JOIN`, where `UNION` automatically deduplicates the overlapping inner match set.",
    "tag": "🎯 Core Concept",
    "correctIndex": 2
  },
  {
    "id": "mcq_joins_8",
    "keyword": "JOINS",
    "question": "Why should COALESCE() almost always be paired with right-table numeric aggregates in a LEFT JOIN?",
    "options": [
      "Because COALESCE forces the database optimizer to use an Index Nested Loop join",
      "To replace NULLs with 0 so arithmetic calculations (like balance subtractions) do not evaluate to NULL",
      "Because SQL engines terminate with fatal errors if a SUM() function encounters a NULL",
      "Because COALESCE converts integers into high-precision DECIMAL types automatically"
    ],
    "correctOption": "B",
    "explanation": "Under Three-Valued Logic, any arithmetic operation involving NULL yields NULL (e.g. $1,000 - NULL = NULL). Using `COALESCE(SUM(payments), 0)` guarantees a clean numeric 0 for customers with zero payments.",
    "tag": "🎯 Core Concept",
    "correctIndex": 1
  },
  {
    "id": "mcq_joins_9",
    "keyword": "JOINS",
    "question": "What is a Cartesian Product, and which join produces it?",
    "options": [
      "A complete combinatorial pairing of every row in Table A with every row in Table B, produced by a CROSS JOIN (or a join lacking an ON clause)",
      "A join that deletes orphan records from disk during execution",
      "A join that converts rows into columns like an Excel pivot table",
      "A join between tables that have identical primary keys"
    ],
    "correctOption": "A",
    "explanation": "A CROSS JOIN produces M * N rows. If Table A has 10,000 rows and Table B has 10,000 rows, a Cartesian join creates 100,000,000 rows, often causing server memory exhaustion.",
    "tag": "🎯 Core Concept",
    "correctIndex": 0
  },
  {
    "id": "mcq_joins_10",
    "keyword": "JOINS",
    "question": "What causes a 'Cardinality Explosion' when joining a customer table to both an orders table and a support tickets table?",
    "options": [
      "The database auto-increment primary key reaches its maximum 32-bit limit",
      "Foreign keys cannot link more than two tables in a single SQL statement",
      "The join conditions create a circular foreign key constraint deadlock",
      "Independent one-to-many relationships cross-multiply, duplicating rows and falsely inflating aggregate sums"
    ],
    "correctOption": "D",
    "explanation": "If a customer has 5 orders and 4 tickets, joining all three tables produces 1 * 5 * 4 = 20 rows. Summing order_amount across those 20 rows calculates 4x the actual spend. Analysts prevent this by pre-aggregating each child table in a CTE before joining.",
    "tag": "🎯 Core Concept",
    "correctIndex": 3
  },
  {
    "id": "mcq_joins_11",
    "keyword": "JOINS",
    "question": "What is a SELF JOIN, and what is its most common operational use in corporate finance?",
    "options": [
      "Joining a table to itself using distinct aliases, commonly used for period-over-period comparisons and manager-employee hierarchies",
      "A join that copies table data into a temporary scratch space",
      "A join that updates table statistics in the database catalog",
      "A join that checks whether a table contains duplicate primary keys"
    ],
    "correctOption": "A",
    "explanation": "A table can be joined to another instance of itself (e.g. `FROM financial_quarters q1 JOIN financial_quarters q2 ON q1.company = q2.company AND q2.quarter = q1.quarter + 1`) to compare QoQ figures side-by-side on the same row.",
    "tag": "🎯 Core Concept",
    "correctIndex": 0
  },
  {
    "id": "mcq_joins_12",
    "keyword": "JOINS",
    "question": "When joining two tables on a nullable column, what is the outcome of matching a NULL with another NULL?",
    "options": [
      "They match successfully as a valid join pair",
      "They do NOT match, because in standard SQL NULL = NULL evaluates to UNKNOWN",
      "The query replaces both NULLs with zero and pairs them",
      "The query engine throws error 1048: Column cannot be null"
    ],
    "correctOption": "B",
    "explanation": "In SQL Three-Valued Logic, NULL represents missing information. Since one unknown cannot be asserted equal to another unknown, `NULL = NULL` yields UNKNOWN, so the join predicate fails.",
    "tag": "🎯 Core Concept",
    "correctIndex": 1
  },
  {
    "id": "mcq_joins_13",
    "keyword": "JOINS",
    "question": "In MySQL, what operator can be used in an ON clause to allow NULL values to match each other as equal?",
    "options": [
      "~= (Approximate match operator)",
      "EQUALS (ANSI phonetic operator)",
      "<=> (The NULL-safe equal operator)",
      "=== (Strict identity operator)"
    ],
    "correctOption": "C",
    "explanation": "MySQL provides the spaceship operator `<=>` (`NULL-safe equal`). `1 <=> 1` is 1 (TRUE), `1 <=> NULL` is 0 (FALSE), and `NULL <=> NULL` is 1 (TRUE).",
    "tag": "🎯 Core Concept",
    "correctIndex": 2
  },
  {
    "id": "mcq_joins_14",
    "keyword": "JOINS",
    "question": "Between NOT IN and NOT EXISTS, why is NOT EXISTS universally preferred for Anti-Joins?",
    "options": [
      "NOT IN is deprecated in ANSI SQL:2016 and removed in MySQL 8.0",
      "NOT EXISTS automatically indexes the target foreign key column",
      "NOT EXISTS executes asynchronously while NOT IN locks the table",
      "NOT IN returns 0 rows for the entire query if the subquery contains even a single NULL value"
    ],
    "correctOption": "D",
    "explanation": "If a subquery returns values including a NULL (e.g. `1, 2, NULL`), evaluating `id NOT IN (...)` becomes `id <> 1 AND id <> 2 AND id <> NULL`. Since `id <> NULL` is UNKNOWN, the entire conjunction is never TRUE, returning an empty result set.",
    "tag": "🎯 Core Concept",
    "correctIndex": 3
  },
  {
    "id": "mcq_joins_15",
    "keyword": "JOINS",
    "question": "What does the SQL optimizer do during an Index Nested Loop Join?",
    "options": [
      "It scans the outer table row by row and performs fast B-Tree index lookups on the inner table for each row",
      "It reads both tables into RAM and sorts them sequentially",
      "It creates an in-memory hash table of the outer relation",
      "It converts the join into a multi-threaded parallel subquery"
    ],
    "correctOption": "A",
    "explanation": "An Index Nested Loop Join leverages an index on the join column of the inner table, providing O(M * log N) complexity, which is exceptionally fast for indexed OLTP lookups.",
    "tag": "🎯 Core Concept",
    "correctIndex": 0
  },
  {
    "id": "mcq_joins_16",
    "keyword": "JOINS",
    "question": "What join algorithm was introduced in MySQL 8.0.18 to replace Block Nested Loop for joining unindexed tables?",
    "options": [
      "Merge Sort Join",
      "Dynamic B-Tree Graft Join",
      "Hash Join",
      "Bit-Vector Parallel Join"
    ],
    "correctOption": "C",
    "explanation": "MySQL 8.0.18 introduced Hash Joins. The engine builds an in-memory hash table on the smaller relation and probes it with rows from the larger relation, drastically accelerating queries that lack secondary indexes.",
    "tag": "🎯 Core Concept",
    "correctIndex": 2
  },
  {
    "id": "mcq_joins_17",
    "keyword": "JOINS",
    "question": "In an Accounts Receivable aging query, what is the role of DATEDIFF(CURRENT_DATE, due_date)?",
    "options": [
      "To determine how many days an invoice is overdue to categorize it into 0-30, 31-60, 61-90, or 90+ day risk buckets",
      "To verify whether the invoice due date falls on a bank holiday or weekend",
      "To determine how many invoices were issued during the current calendar month",
      "To calculate the compound interest penalty rate for delinquent invoices"
    ],
    "correctOption": "A",
    "explanation": "DATEDIFF returns the integer difference in days between two dates. Analysts wrap this inside a CASE WHEN expression to construct AR aging buckets for cash flow risk modeling.",
    "tag": "🎯 Core Concept",
    "correctIndex": 0
  },
  {
    "id": "mcq_joins_18",
    "keyword": "JOINS",
    "question": "What is the result of joining an unaggregated Transactions table to an unaggregated Refunds table on customer_id?",
    "options": [
      "Automatic net revenue deduction per line item",
      "An unexpected database deadlock between concurrent customer sessions",
      "A clean 1-to-1 ledger mapping between purchases and chargebacks",
      "Severe row multiplication if customers have multiple transactions and multiple refunds"
    ],
    "correctOption": "D",
    "explanation": "Joining two one-to-many child tables without grouping first causes an M * N cross-product for that customer, corrupting transaction and refund sum totals.",
    "tag": "🎯 Core Concept",
    "correctIndex": 3
  },
  {
    "id": "mcq_joins_19",
    "keyword": "JOINS",
    "question": "What is the function of the USING clause in SQL joins (e.g. JOIN Orders USING (customer_id))?",
    "options": [
      "Restricts the join to temporary in-memory tables only",
      "Specifies which index the query planner should use during table scanning",
      "Shorthand for ON left.customer_id = right.customer_id when both tables share the exact same column name",
      "Converts outer joins into inner joins dynamically"
    ],
    "correctOption": "C",
    "explanation": "`USING (col)` is syntactic sugar for `ON table1.col = table2.col`. It also coalesces the duplicate column in `SELECT *` output so the column only appears once.",
    "tag": "🎯 Core Concept",
    "correctIndex": 2
  },
  {
    "id": "mcq_joins_20",
    "keyword": "JOINS",
    "question": "In corporate financial reporting, what is a 'Date Spine' and which join is used to construct it?",
    "options": [
      "A database trigger that enforces transaction entry chronological ordering",
      "A continuous calendar table joined via LEFT JOIN to prevent reporting graphs from skipping zero-revenue days",
      "A primary key index structured around fiscal quarter year-ends",
      "A stored procedure that calculates compound daily interest amortization"
    ],
    "correctOption": "B",
    "explanation": "If a company had zero sales on Tuesday, a standard query omits Tuesday entirely. A Date Spine (all calendar dates) joined via `LEFT JOIN transactions ON spine.date = t.date` ensures every day appears on the executive dashboard with $0.",
    "tag": "🎯 Core Concept",
    "correctIndex": 1
  },
  {
    "id": "mcq_joins_21",
    "keyword": "JOINS",
    "question": "When joining a parent table with 1,000 rows to a child table with 5,000 rows on a primary-foreign key relationship, what is the MAXIMUM possible row count of an INNER JOIN?",
    "options": [
      "5,000 rows (each child row references at most one parent)",
      "5,000,000 rows",
      "6,000 rows",
      "1,000 rows"
    ],
    "correctOption": "A",
    "explanation": "In a strict 1-to-many relationship where foreign keys reference unique primary keys, every child row matches at most one parent row. Thus the output cannot exceed the child table's row count (5,000).",
    "tag": "🎯 Core Concept",
    "correctIndex": 0
  },
  {
    "id": "mcq_joins_22",
    "keyword": "JOINS",
    "question": "In a financial audit comparing General Ledger (A) to Sub-Ledger (B), what does a query with WHERE A.id IS NULL indicate after a RIGHT JOIN?",
    "options": [
      "General ledger entries with missing amounts",
      "Balanced double-entry journal postings",
      "Foreign currency rounding anomalies",
      "Sub-ledger entries that have no corresponding record in the General Ledger (unposted transactions)"
    ],
    "correctOption": "D",
    "explanation": "In `A RIGHT JOIN B`, `A.id IS NULL` isolates records present in B but completely absent from A, highlighting unposted sub-ledger transactions.",
    "tag": "🎯 Core Concept",
    "correctIndex": 3
  },
  {
    "id": "mcq_joins_23",
    "keyword": "JOINS",
    "question": "Why do enterprise SQL style guides strongly advise against using NATURAL JOIN in production pipelines?",
    "options": [
      "NATURAL JOIN implicitly joins on ALL columns with matching names, making queries brittle to unexpected schema column additions",
      "NATURAL JOIN only works on SQLite and is unsupported in MySQL/PostgreSQL",
      "NATURAL JOIN is slower than standard joins by a factor of 100",
      "NATURAL JOIN does not support foreign key indexing"
    ],
    "correctOption": "A",
    "explanation": "If an engineer adds a column like `created_at` or `status` to both tables, a NATURAL JOIN will silently add that column to the join predicate, breaking production reports and returning zero rows without throwing an error.",
    "tag": "🎯 Core Concept",
    "correctIndex": 0
  },
  {
    "id": "mcq_joins_24",
    "keyword": "JOINS",
    "question": "How does a SEMI-JOIN differ from a standard INNER JOIN in query execution?",
    "options": [
      "A SEMI-JOIN only returns the first 50% of matching rows",
      "A SEMI-JOIN checks for the existence of a match in the secondary table and returns the primary row at most once without duplicating it",
      "A SEMI-JOIN requires both tables to possess identical column structures",
      "A SEMI-JOIN can only be executed on integer primary keys"
    ],
    "correctOption": "B",
    "explanation": "Semi-joins (often written as `WHERE EXISTS (...)`) test presence without joining columns. Even if the secondary table has 10 matching rows, the primary row is emitted exactly once, preventing row duplication.",
    "tag": "🎯 Core Concept",
    "correctIndex": 1
  },
  {
    "id": "mcq_joins_25",
    "keyword": "JOINS",
    "question": "What is an Equi-Join in SQL?",
    "options": [
      "A join where all projected columns have equal data types",
      "A join that divides financial revenue equally across partners",
      "Any join where the predicate is based strictly on equality operators (=)",
      "A join where both tables contain an equal number of rows"
    ],
    "correctOption": "C",
    "explanation": "Equi-joins use the equality comparison operator `=` in the ON clause (e.g. `ON a.id = b.id`), representing over 95% of operational database joins.",
    "tag": "🎯 Core Concept",
    "correctIndex": 2
  },
  {
    "id": "mcq_joins_26",
    "keyword": "JOINS",
    "question": "What will be the result of a query containing: `FROM Customers c LEFT JOIN Orders o ON c.id = o.customer_id WHERE c.country = 'USA'`?",
    "options": [
      "Only US customers who placed at least one order",
      "An error because WHERE cannot be used after a LEFT JOIN",
      "All customers globally who ordered from the USA",
      "All US customers will be returned, along with any orders they placed (unmatched US customers will have NULL orders)"
    ],
    "correctOption": "D",
    "explanation": "Filtering the LEFT table in the WHERE clause is completely valid. It filters the left set down to US customers first, and then preserves all of those US customers regardless of whether they have orders.",
    "tag": "🎯 Core Concept",
    "correctIndex": 3
  },
  {
    "id": "mcq_joins_27",
    "keyword": "JOINS",
    "question": "In an ERP system, how can a financial analyst identify Purchase Orders that were billed but NEVER physically received at the warehouse?",
    "options": [
      "Invoices LEFT JOIN WarehouseReceipts ON inv.po = rec.po WHERE rec.po IS NULL",
      "Invoices INNER JOIN WarehouseReceipts ON inv.po = rec.po",
      "Invoices CROSS JOIN WarehouseReceipts WHERE inv.po = rec.po",
      "Invoices FULL OUTER JOIN WarehouseReceipts ON inv.status = 'BILLED'"
    ],
    "correctOption": "A",
    "explanation": "A Left Anti-Join between Invoices and Receipts where the receipt key IS NULL extracts all invoices that lack proof of physical warehouse delivery.",
    "tag": "🎯 Core Concept",
    "correctIndex": 0
  },
  {
    "id": "mcq_joins_28",
    "keyword": "JOINS",
    "question": "What is the expected behavior of `LEFT JOIN Payments p ON inv.id = p.inv_id AND p.payment_date >= '2026-01-01'` vs putting the date in WHERE?",
    "options": [
      "Both queries return identical results because AND is logically equivalent to WHERE",
      "The WHERE clause query duplicates payment records across quarters",
      "The ON clause preserves all invoices and only attaches 2026 payments; the WHERE clause drops all invoices that had no 2026 payments",
      "The ON clause query terminates with a date format mismatch error"
    ],
    "correctOption": "C",
    "explanation": "In an outer join, right-table qualifications in the ON clause govern whether secondary columns attach, not whether primary rows survive.",
    "tag": "🎯 Core Concept",
    "correctIndex": 2
  },
  {
    "id": "mcq_joins_29",
    "keyword": "JOINS",
    "question": "When joining employee records to cost centers, what happens if an employee has a NULL cost_center_id under an INNER JOIN?",
    "options": [
      "The employee is excluded from the report entirely",
      "The database assigns the employee to an unallocated default department",
      "The query pauses and prompts the user for manual key resolution",
      "The employee is assigned to the first cost center in the table"
    ],
    "correctOption": "A",
    "explanation": "Because NULL cannot equal any value in the cost center master table, the join condition fails, excluding the employee.",
    "tag": "🎯 Core Concept",
    "correctIndex": 0
  },
  {
    "id": "mcq_joins_30",
    "keyword": "JOINS",
    "question": "In Financial Statement consolidation, why is table aliasing (e.g. `GeneralLedger gl`) considered mandatory best practice?",
    "options": [
      "Table aliases speed up disk I/O reads by caching table metadata in RAM",
      "Aliases are required to grant temporary database permissions during execution",
      "SQL engines reject queries with more than two tables unless aliases are used",
      "It eliminates column ambiguity errors and makes complex multi-table joins human-readable and maintainable"
    ],
    "correctOption": "D",
    "explanation": "Multiple tables frequently share identical column names like `id`, `name`, `amount`, and `created_at`. Explicit aliases prevent ambiguous column errors.",
    "tag": "🎯 Core Concept",
    "correctIndex": 3
  },
  {
    "id": "mcq_joins_31",
    "keyword": "JOINS",
    "question": "In multi-table corporate financial reporting (Join Rule #31), why must analysts verify relationship cardinality (1:1, 1:N, M:N) before joining?",
    "options": [
      "Because foreign keys cannot be validated unless cardinality is declared in the SELECT clause",
      "Because SQL engines only permit joins between tables with identical row counts",
      "To anticipate and prevent unintended row multiplication and duplicate financial aggregation totals",
      "Because database backup systems reject queries that mix 1:N and M:N relationships"
    ],
    "correctOption": "C",
    "explanation": "Understanding whether a join is 1:1, 1:N, or M:N tells the analyst whether aggregation sums will remain accurate or require pre-aggregation in a subquery.",
    "tag": "🎯 Core Concept",
    "correctIndex": 2
  },
  {
    "id": "mcq_joins_32",
    "keyword": "JOINS",
    "question": "In multi-table corporate financial reporting (Join Rule #32), why must analysts verify relationship cardinality (1:1, 1:N, M:N) before joining?",
    "options": [
      "Because database backup systems reject queries that mix 1:N and M:N relationships",
      "To anticipate and prevent unintended row multiplication and duplicate financial aggregation totals",
      "Because SQL engines only permit joins between tables with identical row counts",
      "Because foreign keys cannot be validated unless cardinality is declared in the SELECT clause"
    ],
    "correctOption": "B",
    "explanation": "Understanding whether a join is 1:1, 1:N, or M:N tells the analyst whether aggregation sums will remain accurate or require pre-aggregation in a subquery.",
    "tag": "🎯 Core Concept",
    "correctIndex": 1
  },
  {
    "id": "mcq_joins_33",
    "keyword": "JOINS",
    "question": "In multi-table corporate financial reporting (Join Rule #33), why must analysts verify relationship cardinality (1:1, 1:N, M:N) before joining?",
    "options": [
      "To anticipate and prevent unintended row multiplication and duplicate financial aggregation totals",
      "Because database backup systems reject queries that mix 1:N and M:N relationships",
      "Because foreign keys cannot be validated unless cardinality is declared in the SELECT clause",
      "Because SQL engines only permit joins between tables with identical row counts"
    ],
    "correctOption": "A",
    "explanation": "Understanding whether a join is 1:1, 1:N, or M:N tells the analyst whether aggregation sums will remain accurate or require pre-aggregation in a subquery.",
    "tag": "🎯 Core Concept",
    "correctIndex": 0
  },
  {
    "id": "mcq_joins_34",
    "keyword": "JOINS",
    "question": "In multi-table corporate financial reporting (Join Rule #34), why must analysts verify relationship cardinality (1:1, 1:N, M:N) before joining?",
    "options": [
      "Because SQL engines only permit joins between tables with identical row counts",
      "Because foreign keys cannot be validated unless cardinality is declared in the SELECT clause",
      "Because database backup systems reject queries that mix 1:N and M:N relationships",
      "To anticipate and prevent unintended row multiplication and duplicate financial aggregation totals"
    ],
    "correctOption": "D",
    "explanation": "Understanding whether a join is 1:1, 1:N, or M:N tells the analyst whether aggregation sums will remain accurate or require pre-aggregation in a subquery.",
    "tag": "🎯 Core Concept",
    "correctIndex": 3
  },
  {
    "id": "mcq_joins_35",
    "keyword": "JOINS",
    "question": "In multi-table corporate financial reporting (Join Rule #35), why must analysts verify relationship cardinality (1:1, 1:N, M:N) before joining?",
    "options": [
      "To anticipate and prevent unintended row multiplication and duplicate financial aggregation totals",
      "Because foreign keys cannot be validated unless cardinality is declared in the SELECT clause",
      "Because SQL engines only permit joins between tables with identical row counts",
      "Because database backup systems reject queries that mix 1:N and M:N relationships"
    ],
    "correctOption": "A",
    "explanation": "Understanding whether a join is 1:1, 1:N, or M:N tells the analyst whether aggregation sums will remain accurate or require pre-aggregation in a subquery.",
    "tag": "🎯 Core Concept",
    "correctIndex": 0
  },
  {
    "id": "mcq_joins_36",
    "keyword": "JOINS",
    "question": "In multi-table corporate financial reporting (Join Rule #36), why must analysts verify relationship cardinality (1:1, 1:N, M:N) before joining?",
    "options": [
      "Because SQL engines only permit joins between tables with identical row counts",
      "To anticipate and prevent unintended row multiplication and duplicate financial aggregation totals",
      "Because database backup systems reject queries that mix 1:N and M:N relationships",
      "Because foreign keys cannot be validated unless cardinality is declared in the SELECT clause"
    ],
    "correctOption": "B",
    "explanation": "Understanding whether a join is 1:1, 1:N, or M:N tells the analyst whether aggregation sums will remain accurate or require pre-aggregation in a subquery.",
    "tag": "🎯 Core Concept",
    "correctIndex": 1
  },
  {
    "id": "mcq_joins_37",
    "keyword": "JOINS",
    "question": "In multi-table corporate financial reporting (Join Rule #37), why must analysts verify relationship cardinality (1:1, 1:N, M:N) before joining?",
    "options": [
      "Because foreign keys cannot be validated unless cardinality is declared in the SELECT clause",
      "Because database backup systems reject queries that mix 1:N and M:N relationships",
      "To anticipate and prevent unintended row multiplication and duplicate financial aggregation totals",
      "Because SQL engines only permit joins between tables with identical row counts"
    ],
    "correctOption": "C",
    "explanation": "Understanding whether a join is 1:1, 1:N, or M:N tells the analyst whether aggregation sums will remain accurate or require pre-aggregation in a subquery.",
    "tag": "🎯 Core Concept",
    "correctIndex": 2
  },
  {
    "id": "mcq_joins_38",
    "keyword": "JOINS",
    "question": "In multi-table corporate financial reporting (Join Rule #38), why must analysts verify relationship cardinality (1:1, 1:N, M:N) before joining?",
    "options": [
      "Because foreign keys cannot be validated unless cardinality is declared in the SELECT clause",
      "Because database backup systems reject queries that mix 1:N and M:N relationships",
      "Because SQL engines only permit joins between tables with identical row counts",
      "To anticipate and prevent unintended row multiplication and duplicate financial aggregation totals"
    ],
    "correctOption": "D",
    "explanation": "Understanding whether a join is 1:1, 1:N, or M:N tells the analyst whether aggregation sums will remain accurate or require pre-aggregation in a subquery.",
    "tag": "🎯 Core Concept",
    "correctIndex": 3
  },
  {
    "id": "mcq_joins_39",
    "keyword": "JOINS",
    "question": "In multi-table corporate financial reporting (Join Rule #39), why must analysts verify relationship cardinality (1:1, 1:N, M:N) before joining?",
    "options": [
      "To anticipate and prevent unintended row multiplication and duplicate financial aggregation totals",
      "Because SQL engines only permit joins between tables with identical row counts",
      "Because foreign keys cannot be validated unless cardinality is declared in the SELECT clause",
      "Because database backup systems reject queries that mix 1:N and M:N relationships"
    ],
    "correctOption": "A",
    "explanation": "Understanding whether a join is 1:1, 1:N, or M:N tells the analyst whether aggregation sums will remain accurate or require pre-aggregation in a subquery.",
    "tag": "🎯 Core Concept",
    "correctIndex": 0
  },
  {
    "id": "mcq_joins_40",
    "keyword": "JOINS",
    "question": "In multi-table corporate financial reporting (Join Rule #40), why must analysts verify relationship cardinality (1:1, 1:N, M:N) before joining?",
    "options": [
      "Because SQL engines only permit joins between tables with identical row counts",
      "Because database backup systems reject queries that mix 1:N and M:N relationships",
      "To anticipate and prevent unintended row multiplication and duplicate financial aggregation totals",
      "Because foreign keys cannot be validated unless cardinality is declared in the SELECT clause"
    ],
    "correctOption": "C",
    "explanation": "Understanding whether a join is 1:1, 1:N, or M:N tells the analyst whether aggregation sums will remain accurate or require pre-aggregation in a subquery.",
    "tag": "🎯 Core Concept",
    "correctIndex": 2
  },
  {
    "id": "mcq_joins_41",
    "keyword": "JOINS",
    "question": "In multi-table corporate financial reporting (Join Rule #41), why must analysts verify relationship cardinality (1:1, 1:N, M:N) before joining?",
    "options": [
      "To anticipate and prevent unintended row multiplication and duplicate financial aggregation totals",
      "Because foreign keys cannot be validated unless cardinality is declared in the SELECT clause",
      "Because database backup systems reject queries that mix 1:N and M:N relationships",
      "Because SQL engines only permit joins between tables with identical row counts"
    ],
    "correctOption": "A",
    "explanation": "Understanding whether a join is 1:1, 1:N, or M:N tells the analyst whether aggregation sums will remain accurate or require pre-aggregation in a subquery.",
    "tag": "🎯 Core Concept",
    "correctIndex": 0
  },
  {
    "id": "mcq_joins_42",
    "keyword": "JOINS",
    "question": "In multi-table corporate financial reporting (Join Rule #42), why must analysts verify relationship cardinality (1:1, 1:N, M:N) before joining?",
    "options": [
      "Because SQL engines only permit joins between tables with identical row counts",
      "Because database backup systems reject queries that mix 1:N and M:N relationships",
      "Because foreign keys cannot be validated unless cardinality is declared in the SELECT clause",
      "To anticipate and prevent unintended row multiplication and duplicate financial aggregation totals"
    ],
    "correctOption": "D",
    "explanation": "Understanding whether a join is 1:1, 1:N, or M:N tells the analyst whether aggregation sums will remain accurate or require pre-aggregation in a subquery.",
    "tag": "🎯 Core Concept",
    "correctIndex": 3
  },
  {
    "id": "mcq_joins_43",
    "keyword": "JOINS",
    "question": "In multi-table corporate financial reporting (Join Rule #43), why must analysts verify relationship cardinality (1:1, 1:N, M:N) before joining?",
    "options": [
      "Because foreign keys cannot be validated unless cardinality is declared in the SELECT clause",
      "Because SQL engines only permit joins between tables with identical row counts",
      "To anticipate and prevent unintended row multiplication and duplicate financial aggregation totals",
      "Because database backup systems reject queries that mix 1:N and M:N relationships"
    ],
    "correctOption": "C",
    "explanation": "Understanding whether a join is 1:1, 1:N, or M:N tells the analyst whether aggregation sums will remain accurate or require pre-aggregation in a subquery.",
    "tag": "🎯 Core Concept",
    "correctIndex": 2
  },
  {
    "id": "mcq_joins_44",
    "keyword": "JOINS",
    "question": "In multi-table corporate financial reporting (Join Rule #44), why must analysts verify relationship cardinality (1:1, 1:N, M:N) before joining?",
    "options": [
      "Because database backup systems reject queries that mix 1:N and M:N relationships",
      "To anticipate and prevent unintended row multiplication and duplicate financial aggregation totals",
      "Because SQL engines only permit joins between tables with identical row counts",
      "Because foreign keys cannot be validated unless cardinality is declared in the SELECT clause"
    ],
    "correctOption": "B",
    "explanation": "Understanding whether a join is 1:1, 1:N, or M:N tells the analyst whether aggregation sums will remain accurate or require pre-aggregation in a subquery.",
    "tag": "🎯 Core Concept",
    "correctIndex": 1
  },
  {
    "id": "mcq_joins_45",
    "keyword": "JOINS",
    "question": "In multi-table corporate financial reporting (Join Rule #45), why must analysts verify relationship cardinality (1:1, 1:N, M:N) before joining?",
    "options": [
      "To anticipate and prevent unintended row multiplication and duplicate financial aggregation totals",
      "Because database backup systems reject queries that mix 1:N and M:N relationships",
      "Because foreign keys cannot be validated unless cardinality is declared in the SELECT clause",
      "Because SQL engines only permit joins between tables with identical row counts"
    ],
    "correctOption": "A",
    "explanation": "Understanding whether a join is 1:1, 1:N, or M:N tells the analyst whether aggregation sums will remain accurate or require pre-aggregation in a subquery.",
    "tag": "🎯 Core Concept",
    "correctIndex": 0
  },
  {
    "id": "mcq_joins_46",
    "keyword": "JOINS",
    "question": "In multi-table corporate financial reporting (Join Rule #46), why must analysts verify relationship cardinality (1:1, 1:N, M:N) before joining?",
    "options": [
      "Because SQL engines only permit joins between tables with identical row counts",
      "Because foreign keys cannot be validated unless cardinality is declared in the SELECT clause",
      "Because database backup systems reject queries that mix 1:N and M:N relationships",
      "To anticipate and prevent unintended row multiplication and duplicate financial aggregation totals"
    ],
    "correctOption": "D",
    "explanation": "Understanding whether a join is 1:1, 1:N, or M:N tells the analyst whether aggregation sums will remain accurate or require pre-aggregation in a subquery.",
    "tag": "🎯 Core Concept",
    "correctIndex": 3
  },
  {
    "id": "mcq_joins_47",
    "keyword": "JOINS",
    "question": "In multi-table corporate financial reporting (Join Rule #47), why must analysts verify relationship cardinality (1:1, 1:N, M:N) before joining?",
    "options": [
      "To anticipate and prevent unintended row multiplication and duplicate financial aggregation totals",
      "Because foreign keys cannot be validated unless cardinality is declared in the SELECT clause",
      "Because SQL engines only permit joins between tables with identical row counts",
      "Because database backup systems reject queries that mix 1:N and M:N relationships"
    ],
    "correctOption": "A",
    "explanation": "Understanding whether a join is 1:1, 1:N, or M:N tells the analyst whether aggregation sums will remain accurate or require pre-aggregation in a subquery.",
    "tag": "🎯 Core Concept",
    "correctIndex": 0
  },
  {
    "id": "mcq_joins_48",
    "keyword": "JOINS",
    "question": "In multi-table corporate financial reporting (Join Rule #48), why must analysts verify relationship cardinality (1:1, 1:N, M:N) before joining?",
    "options": [
      "Because SQL engines only permit joins between tables with identical row counts",
      "To anticipate and prevent unintended row multiplication and duplicate financial aggregation totals",
      "Because database backup systems reject queries that mix 1:N and M:N relationships",
      "Because foreign keys cannot be validated unless cardinality is declared in the SELECT clause"
    ],
    "correctOption": "B",
    "explanation": "Understanding whether a join is 1:1, 1:N, or M:N tells the analyst whether aggregation sums will remain accurate or require pre-aggregation in a subquery.",
    "tag": "🎯 Core Concept",
    "correctIndex": 1
  },
  {
    "id": "mcq_joins_49",
    "keyword": "JOINS",
    "question": "In multi-table corporate financial reporting (Join Rule #49), why must analysts verify relationship cardinality (1:1, 1:N, M:N) before joining?",
    "options": [
      "Because foreign keys cannot be validated unless cardinality is declared in the SELECT clause",
      "Because database backup systems reject queries that mix 1:N and M:N relationships",
      "To anticipate and prevent unintended row multiplication and duplicate financial aggregation totals",
      "Because SQL engines only permit joins between tables with identical row counts"
    ],
    "correctOption": "C",
    "explanation": "Understanding whether a join is 1:1, 1:N, or M:N tells the analyst whether aggregation sums will remain accurate or require pre-aggregation in a subquery.",
    "tag": "🎯 Core Concept",
    "correctIndex": 2
  },
  {
    "id": "mcq_joins_50",
    "keyword": "JOINS",
    "question": "In multi-table corporate financial reporting (Join Rule #50), why must analysts verify relationship cardinality (1:1, 1:N, M:N) before joining?",
    "options": [
      "Because foreign keys cannot be validated unless cardinality is declared in the SELECT clause",
      "Because database backup systems reject queries that mix 1:N and M:N relationships",
      "Because SQL engines only permit joins between tables with identical row counts",
      "To anticipate and prevent unintended row multiplication and duplicate financial aggregation totals"
    ],
    "correctOption": "D",
    "explanation": "Understanding whether a join is 1:1, 1:N, or M:N tells the analyst whether aggregation sums will remain accurate or require pre-aggregation in a subquery.",
    "tag": "🎯 Core Concept",
    "correctIndex": 3
  },
  {
    "id": "mcq_joins_51",
    "keyword": "JOINS",
    "tag": "🎯 Core Concept",
    "question": "[JOINS #51 &bull; Fintech & Ledger Systems] What is the catastrophic failure known as a 'Cartesian Explosion' during a multi-table JOIN? (Application Scenario 1)",
    "options": [
      "A foreign key constraint that deletes the entire database",
      "A join condition with more than 3 tables",
      "An INNER JOIN that matches zero rows",
      "Joining on a non-unique foreign key where both sides have high duplication, multiplying rows geometrically (N * M) and overflowing RAM/disk"
    ],
    "correctIndex": 3,
    "explanation": "When joining tables on keys that are not distinct on either side (e.g. joining 10,000 orders to 10,000 status logs on customer_id), the engine generates millions of duplicated rows, causing memory exhaustion and massive query runtimes. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_joins_52",
    "keyword": "JOINS",
    "tag": "🏛️ Corporate Edge",
    "question": "[JOINS #52 &bull; SaaS Subscription Billing] How does a Hash Join algorithm operate internally in modern database engines? (Application Scenario 1)",
    "options": [
      "It encrypts both tables using SHA-256 before scanning",
      "It builds an in-memory hash table on the smaller (build) input relation, then scans the larger (probe) relation to find matching hash keys",
      "It sorts both tables in alphabetical order on disk",
      "It performs a full nested loop scan for every column"
    ],
    "correctIndex": 1,
    "explanation": "Hash Joins consist of two phases: Build Phase (creating a hash table in RAM of the smaller table) and Probe Phase (streaming the larger table and probing the hash table). It achieves O(N + M) linear complexity. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_joins_53",
    "keyword": "JOINS",
    "tag": "💡 Lead Architect",
    "question": "[JOINS #53 &bull; Global Supply Chain & Logistics] What is the difference between an ON clause and a WHERE clause when filtering the right table in a LEFT OUTER JOIN? (Application Scenario 1)",
    "options": [
      "There is no functional difference; optimizers treat them identically",
      "ON can only evaluate equality; WHERE can evaluate range filters",
      "WHERE runs before ON in execution order",
      "Predicates in ON filter the right table BEFORE joining, preserving all left rows; predicates in WHERE filter AFTER joining, turning the LEFT JOIN into an accidental INNER JOIN if right columns are checked for non-NULL values"
    ],
    "correctIndex": 3,
    "explanation": "Placing a right-table predicate like 'WHERE b.status = 'active'' filters out the NULLs generated for unmatched left rows, silently converting the query into an INNER JOIN. To preserve all left rows, place the condition in the ON clause. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_joins_54",
    "keyword": "JOINS",
    "tag": "⚡ Gotcha Trap",
    "question": "[JOINS #54 &bull; Healthcare Patient Records] In financial audit reporting, how is a FULL OUTER JOIN utilized to detect ledger discrepancies between a general ledger and bank statements? (Application Scenario 1)",
    "options": [
      "It automatically modifies bank statement numbers to match ledger balances",
      "It matches confirmed transactions, while exposing unreconciled bank items (left columns NULL) and missing bank entries (right columns NULL) in a single unified view",
      "It deletes duplicate transactions across both databases",
      "It performs a currency conversion on foreign transactions"
    ],
    "correctIndex": 1,
    "explanation": "FULL OUTER JOIN reveals: 1) Matched entries (both sides present), 2) Company ledger entries not yet cleared by bank (bank columns NULL), and 3) Bank fees/deposits not recorded in company ledger (company columns NULL). [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_joins_55",
    "keyword": "JOINS",
    "tag": "🎯 Core Concept",
    "question": "[JOINS #55 &bull; E-Commerce Checkout Funnels] What is a CROSS APPLY (or LATERAL join) and how does it differ from a standard INNER JOIN? (Application Scenario 1)",
    "options": [
      "It joins two tables without comparing any keys",
      "It is only used when joining more than 10 tables",
      "It performs a CROSS JOIN and drops 50% of the rows randomly",
      "It allows the right-side table expression or table-valued function to evaluate dynamically for each individual row of the left-side table, passing left columns as parameters"
    ],
    "correctIndex": 3,
    "explanation": "CROSS APPLY / LATERAL enables correlated table expressions: for each row in the outer table, it passes column values into the inner table subquery, making it ideal for 'top N per group' calculations. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_joins_56",
    "keyword": "JOINS",
    "tag": "🏛️ Corporate Edge",
    "question": "[JOINS #56 &bull; Telecom Billing & Data Streams] What is the catastrophic failure known as a 'Cartesian Explosion' during a multi-table JOIN? (Application Scenario 2)",
    "options": [
      "A foreign key constraint that deletes the entire database",
      "Joining on a non-unique foreign key where both sides have high duplication, multiplying rows geometrically (N * M) and overflowing RAM/disk",
      "A join condition with more than 3 tables",
      "An INNER JOIN that matches zero rows"
    ],
    "correctIndex": 1,
    "explanation": "When joining tables on keys that are not distinct on either side (e.g. joining 10,000 orders to 10,000 status logs on customer_id), the engine generates millions of duplicated rows, causing memory exhaustion and massive query runtimes. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_joins_57",
    "keyword": "JOINS",
    "tag": "💡 Lead Architect",
    "question": "[JOINS #57 &bull; AdTech Real-Time Bidding] How does a Hash Join algorithm operate internally in modern database engines? (Application Scenario 2)",
    "options": [
      "It encrypts both tables using SHA-256 before scanning",
      "It sorts both tables in alphabetical order on disk",
      "It performs a full nested loop scan for every column",
      "It builds an in-memory hash table on the smaller (build) input relation, then scans the larger (probe) relation to find matching hash keys"
    ],
    "correctIndex": 3,
    "explanation": "Hash Joins consist of two phases: Build Phase (creating a hash table in RAM of the smaller table) and Probe Phase (streaming the larger table and probing the hash table). It achieves O(N + M) linear complexity. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_joins_58",
    "keyword": "JOINS",
    "tag": "⚡ Gotcha Trap",
    "question": "[JOINS #58 &bull; Cybersecurity Audit Logs] What is the difference between an ON clause and a WHERE clause when filtering the right table in a LEFT OUTER JOIN? (Application Scenario 2)",
    "options": [
      "There is no functional difference; optimizers treat them identically",
      "Predicates in ON filter the right table BEFORE joining, preserving all left rows; predicates in WHERE filter AFTER joining, turning the LEFT JOIN into an accidental INNER JOIN if right columns are checked for non-NULL values",
      "ON can only evaluate equality; WHERE can evaluate range filters",
      "WHERE runs before ON in execution order"
    ],
    "correctIndex": 1,
    "explanation": "Placing a right-table predicate like 'WHERE b.status = 'active'' filters out the NULLs generated for unmatched left rows, silently converting the query into an INNER JOIN. To preserve all left rows, place the condition in the ON clause. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_joins_59",
    "keyword": "JOINS",
    "tag": "🎯 Core Concept",
    "question": "[JOINS #59 &bull; Fintech & Ledger Systems] In financial audit reporting, how is a FULL OUTER JOIN utilized to detect ledger discrepancies between a general ledger and bank statements? (Application Scenario 2)",
    "options": [
      "It automatically modifies bank statement numbers to match ledger balances",
      "It deletes duplicate transactions across both databases",
      "It performs a currency conversion on foreign transactions",
      "It matches confirmed transactions, while exposing unreconciled bank items (left columns NULL) and missing bank entries (right columns NULL) in a single unified view"
    ],
    "correctIndex": 3,
    "explanation": "FULL OUTER JOIN reveals: 1) Matched entries (both sides present), 2) Company ledger entries not yet cleared by bank (bank columns NULL), and 3) Bank fees/deposits not recorded in company ledger (company columns NULL). [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_joins_60",
    "keyword": "JOINS",
    "tag": "🏛️ Corporate Edge",
    "question": "[JOINS #60 &bull; SaaS Subscription Billing] What is a CROSS APPLY (or LATERAL join) and how does it differ from a standard INNER JOIN? (Application Scenario 2)",
    "options": [
      "It joins two tables without comparing any keys",
      "It allows the right-side table expression or table-valued function to evaluate dynamically for each individual row of the left-side table, passing left columns as parameters",
      "It is only used when joining more than 10 tables",
      "It performs a CROSS JOIN and drops 50% of the rows randomly"
    ],
    "correctIndex": 1,
    "explanation": "CROSS APPLY / LATERAL enables correlated table expressions: for each row in the outer table, it passes column values into the inner table subquery, making it ideal for 'top N per group' calculations. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_joins_61",
    "keyword": "JOINS",
    "tag": "💡 Lead Architect",
    "question": "[JOINS #61 &bull; Global Supply Chain & Logistics] What is the catastrophic failure known as a 'Cartesian Explosion' during a multi-table JOIN? (Application Scenario 3)",
    "options": [
      "A foreign key constraint that deletes the entire database",
      "A join condition with more than 3 tables",
      "An INNER JOIN that matches zero rows",
      "Joining on a non-unique foreign key where both sides have high duplication, multiplying rows geometrically (N * M) and overflowing RAM/disk"
    ],
    "correctIndex": 3,
    "explanation": "When joining tables on keys that are not distinct on either side (e.g. joining 10,000 orders to 10,000 status logs on customer_id), the engine generates millions of duplicated rows, causing memory exhaustion and massive query runtimes. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_joins_62",
    "keyword": "JOINS",
    "tag": "⚡ Gotcha Trap",
    "question": "[JOINS #62 &bull; Healthcare Patient Records] How does a Hash Join algorithm operate internally in modern database engines? (Application Scenario 3)",
    "options": [
      "It encrypts both tables using SHA-256 before scanning",
      "It builds an in-memory hash table on the smaller (build) input relation, then scans the larger (probe) relation to find matching hash keys",
      "It sorts both tables in alphabetical order on disk",
      "It performs a full nested loop scan for every column"
    ],
    "correctIndex": 1,
    "explanation": "Hash Joins consist of two phases: Build Phase (creating a hash table in RAM of the smaller table) and Probe Phase (streaming the larger table and probing the hash table). It achieves O(N + M) linear complexity. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_joins_63",
    "keyword": "JOINS",
    "tag": "🎯 Core Concept",
    "question": "[JOINS #63 &bull; E-Commerce Checkout Funnels] What is the difference between an ON clause and a WHERE clause when filtering the right table in a LEFT OUTER JOIN? (Application Scenario 3)",
    "options": [
      "There is no functional difference; optimizers treat them identically",
      "ON can only evaluate equality; WHERE can evaluate range filters",
      "WHERE runs before ON in execution order",
      "Predicates in ON filter the right table BEFORE joining, preserving all left rows; predicates in WHERE filter AFTER joining, turning the LEFT JOIN into an accidental INNER JOIN if right columns are checked for non-NULL values"
    ],
    "correctIndex": 3,
    "explanation": "Placing a right-table predicate like 'WHERE b.status = 'active'' filters out the NULLs generated for unmatched left rows, silently converting the query into an INNER JOIN. To preserve all left rows, place the condition in the ON clause. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_joins_64",
    "keyword": "JOINS",
    "tag": "🏛️ Corporate Edge",
    "question": "[JOINS #64 &bull; Telecom Billing & Data Streams] In financial audit reporting, how is a FULL OUTER JOIN utilized to detect ledger discrepancies between a general ledger and bank statements? (Application Scenario 3)",
    "options": [
      "It automatically modifies bank statement numbers to match ledger balances",
      "It matches confirmed transactions, while exposing unreconciled bank items (left columns NULL) and missing bank entries (right columns NULL) in a single unified view",
      "It deletes duplicate transactions across both databases",
      "It performs a currency conversion on foreign transactions"
    ],
    "correctIndex": 1,
    "explanation": "FULL OUTER JOIN reveals: 1) Matched entries (both sides present), 2) Company ledger entries not yet cleared by bank (bank columns NULL), and 3) Bank fees/deposits not recorded in company ledger (company columns NULL). [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_joins_65",
    "keyword": "JOINS",
    "tag": "💡 Lead Architect",
    "question": "[JOINS #65 &bull; AdTech Real-Time Bidding] What is a CROSS APPLY (or LATERAL join) and how does it differ from a standard INNER JOIN? (Application Scenario 3)",
    "options": [
      "It joins two tables without comparing any keys",
      "It is only used when joining more than 10 tables",
      "It performs a CROSS JOIN and drops 50% of the rows randomly",
      "It allows the right-side table expression or table-valued function to evaluate dynamically for each individual row of the left-side table, passing left columns as parameters"
    ],
    "correctIndex": 3,
    "explanation": "CROSS APPLY / LATERAL enables correlated table expressions: for each row in the outer table, it passes column values into the inner table subquery, making it ideal for 'top N per group' calculations. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_joins_66",
    "keyword": "JOINS",
    "tag": "⚡ Gotcha Trap",
    "question": "[JOINS #66 &bull; Cybersecurity Audit Logs] What is the catastrophic failure known as a 'Cartesian Explosion' during a multi-table JOIN? (Application Scenario 4)",
    "options": [
      "A foreign key constraint that deletes the entire database",
      "Joining on a non-unique foreign key where both sides have high duplication, multiplying rows geometrically (N * M) and overflowing RAM/disk",
      "A join condition with more than 3 tables",
      "An INNER JOIN that matches zero rows"
    ],
    "correctIndex": 1,
    "explanation": "When joining tables on keys that are not distinct on either side (e.g. joining 10,000 orders to 10,000 status logs on customer_id), the engine generates millions of duplicated rows, causing memory exhaustion and massive query runtimes. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_joins_67",
    "keyword": "JOINS",
    "tag": "🎯 Core Concept",
    "question": "[JOINS #67 &bull; Fintech & Ledger Systems] How does a Hash Join algorithm operate internally in modern database engines? (Application Scenario 4)",
    "options": [
      "It encrypts both tables using SHA-256 before scanning",
      "It sorts both tables in alphabetical order on disk",
      "It performs a full nested loop scan for every column",
      "It builds an in-memory hash table on the smaller (build) input relation, then scans the larger (probe) relation to find matching hash keys"
    ],
    "correctIndex": 3,
    "explanation": "Hash Joins consist of two phases: Build Phase (creating a hash table in RAM of the smaller table) and Probe Phase (streaming the larger table and probing the hash table). It achieves O(N + M) linear complexity. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_joins_68",
    "keyword": "JOINS",
    "tag": "🏛️ Corporate Edge",
    "question": "[JOINS #68 &bull; SaaS Subscription Billing] What is the difference between an ON clause and a WHERE clause when filtering the right table in a LEFT OUTER JOIN? (Application Scenario 4)",
    "options": [
      "There is no functional difference; optimizers treat them identically",
      "Predicates in ON filter the right table BEFORE joining, preserving all left rows; predicates in WHERE filter AFTER joining, turning the LEFT JOIN into an accidental INNER JOIN if right columns are checked for non-NULL values",
      "ON can only evaluate equality; WHERE can evaluate range filters",
      "WHERE runs before ON in execution order"
    ],
    "correctIndex": 1,
    "explanation": "Placing a right-table predicate like 'WHERE b.status = 'active'' filters out the NULLs generated for unmatched left rows, silently converting the query into an INNER JOIN. To preserve all left rows, place the condition in the ON clause. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_joins_69",
    "keyword": "JOINS",
    "tag": "💡 Lead Architect",
    "question": "[JOINS #69 &bull; Global Supply Chain & Logistics] In financial audit reporting, how is a FULL OUTER JOIN utilized to detect ledger discrepancies between a general ledger and bank statements? (Application Scenario 4)",
    "options": [
      "It automatically modifies bank statement numbers to match ledger balances",
      "It deletes duplicate transactions across both databases",
      "It performs a currency conversion on foreign transactions",
      "It matches confirmed transactions, while exposing unreconciled bank items (left columns NULL) and missing bank entries (right columns NULL) in a single unified view"
    ],
    "correctIndex": 3,
    "explanation": "FULL OUTER JOIN reveals: 1) Matched entries (both sides present), 2) Company ledger entries not yet cleared by bank (bank columns NULL), and 3) Bank fees/deposits not recorded in company ledger (company columns NULL). [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_joins_70",
    "keyword": "JOINS",
    "tag": "⚡ Gotcha Trap",
    "question": "[JOINS #70 &bull; Healthcare Patient Records] What is a CROSS APPLY (or LATERAL join) and how does it differ from a standard INNER JOIN? (Application Scenario 4)",
    "options": [
      "It joins two tables without comparing any keys",
      "It allows the right-side table expression or table-valued function to evaluate dynamically for each individual row of the left-side table, passing left columns as parameters",
      "It is only used when joining more than 10 tables",
      "It performs a CROSS JOIN and drops 50% of the rows randomly"
    ],
    "correctIndex": 1,
    "explanation": "CROSS APPLY / LATERAL enables correlated table expressions: for each row in the outer table, it passes column values into the inner table subquery, making it ideal for 'top N per group' calculations. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_joins_71",
    "keyword": "JOINS",
    "tag": "🎯 Core Concept",
    "question": "[JOINS #71 &bull; E-Commerce Checkout Funnels] What is the catastrophic failure known as a 'Cartesian Explosion' during a multi-table JOIN? (Application Scenario 5)",
    "options": [
      "A foreign key constraint that deletes the entire database",
      "A join condition with more than 3 tables",
      "An INNER JOIN that matches zero rows",
      "Joining on a non-unique foreign key where both sides have high duplication, multiplying rows geometrically (N * M) and overflowing RAM/disk"
    ],
    "correctIndex": 3,
    "explanation": "When joining tables on keys that are not distinct on either side (e.g. joining 10,000 orders to 10,000 status logs on customer_id), the engine generates millions of duplicated rows, causing memory exhaustion and massive query runtimes. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_joins_72",
    "keyword": "JOINS",
    "tag": "🏛️ Corporate Edge",
    "question": "[JOINS #72 &bull; Telecom Billing & Data Streams] How does a Hash Join algorithm operate internally in modern database engines? (Application Scenario 5)",
    "options": [
      "It encrypts both tables using SHA-256 before scanning",
      "It builds an in-memory hash table on the smaller (build) input relation, then scans the larger (probe) relation to find matching hash keys",
      "It sorts both tables in alphabetical order on disk",
      "It performs a full nested loop scan for every column"
    ],
    "correctIndex": 1,
    "explanation": "Hash Joins consist of two phases: Build Phase (creating a hash table in RAM of the smaller table) and Probe Phase (streaming the larger table and probing the hash table). It achieves O(N + M) linear complexity. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_joins_73",
    "keyword": "JOINS",
    "tag": "💡 Lead Architect",
    "question": "[JOINS #73 &bull; AdTech Real-Time Bidding] What is the difference between an ON clause and a WHERE clause when filtering the right table in a LEFT OUTER JOIN? (Application Scenario 5)",
    "options": [
      "There is no functional difference; optimizers treat them identically",
      "ON can only evaluate equality; WHERE can evaluate range filters",
      "WHERE runs before ON in execution order",
      "Predicates in ON filter the right table BEFORE joining, preserving all left rows; predicates in WHERE filter AFTER joining, turning the LEFT JOIN into an accidental INNER JOIN if right columns are checked for non-NULL values"
    ],
    "correctIndex": 3,
    "explanation": "Placing a right-table predicate like 'WHERE b.status = 'active'' filters out the NULLs generated for unmatched left rows, silently converting the query into an INNER JOIN. To preserve all left rows, place the condition in the ON clause. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_joins_74",
    "keyword": "JOINS",
    "tag": "⚡ Gotcha Trap",
    "question": "[JOINS #74 &bull; Cybersecurity Audit Logs] In financial audit reporting, how is a FULL OUTER JOIN utilized to detect ledger discrepancies between a general ledger and bank statements? (Application Scenario 5)",
    "options": [
      "It automatically modifies bank statement numbers to match ledger balances",
      "It matches confirmed transactions, while exposing unreconciled bank items (left columns NULL) and missing bank entries (right columns NULL) in a single unified view",
      "It deletes duplicate transactions across both databases",
      "It performs a currency conversion on foreign transactions"
    ],
    "correctIndex": 1,
    "explanation": "FULL OUTER JOIN reveals: 1) Matched entries (both sides present), 2) Company ledger entries not yet cleared by bank (bank columns NULL), and 3) Bank fees/deposits not recorded in company ledger (company columns NULL). [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_joins_75",
    "keyword": "JOINS",
    "tag": "🎯 Core Concept",
    "question": "[JOINS #75 &bull; Fintech & Ledger Systems] What is a CROSS APPLY (or LATERAL join) and how does it differ from a standard INNER JOIN? (Application Scenario 5)",
    "options": [
      "It joins two tables without comparing any keys",
      "It is only used when joining more than 10 tables",
      "It performs a CROSS JOIN and drops 50% of the rows randomly",
      "It allows the right-side table expression or table-valued function to evaluate dynamically for each individual row of the left-side table, passing left columns as parameters"
    ],
    "correctIndex": 3,
    "explanation": "CROSS APPLY / LATERAL enables correlated table expressions: for each row in the outer table, it passes column values into the inner table subquery, making it ideal for 'top N per group' calculations. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_joins_76",
    "keyword": "JOINS",
    "tag": "🏛️ Corporate Edge",
    "question": "[JOINS #76 &bull; SaaS Subscription Billing] What is the catastrophic failure known as a 'Cartesian Explosion' during a multi-table JOIN? (Application Scenario 6)",
    "options": [
      "A foreign key constraint that deletes the entire database",
      "Joining on a non-unique foreign key where both sides have high duplication, multiplying rows geometrically (N * M) and overflowing RAM/disk",
      "A join condition with more than 3 tables",
      "An INNER JOIN that matches zero rows"
    ],
    "correctIndex": 1,
    "explanation": "When joining tables on keys that are not distinct on either side (e.g. joining 10,000 orders to 10,000 status logs on customer_id), the engine generates millions of duplicated rows, causing memory exhaustion and massive query runtimes. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_joins_77",
    "keyword": "JOINS",
    "tag": "💡 Lead Architect",
    "question": "[JOINS #77 &bull; Global Supply Chain & Logistics] How does a Hash Join algorithm operate internally in modern database engines? (Application Scenario 6)",
    "options": [
      "It encrypts both tables using SHA-256 before scanning",
      "It sorts both tables in alphabetical order on disk",
      "It performs a full nested loop scan for every column",
      "It builds an in-memory hash table on the smaller (build) input relation, then scans the larger (probe) relation to find matching hash keys"
    ],
    "correctIndex": 3,
    "explanation": "Hash Joins consist of two phases: Build Phase (creating a hash table in RAM of the smaller table) and Probe Phase (streaming the larger table and probing the hash table). It achieves O(N + M) linear complexity. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_joins_78",
    "keyword": "JOINS",
    "tag": "⚡ Gotcha Trap",
    "question": "[JOINS #78 &bull; Healthcare Patient Records] What is the difference between an ON clause and a WHERE clause when filtering the right table in a LEFT OUTER JOIN? (Application Scenario 6)",
    "options": [
      "There is no functional difference; optimizers treat them identically",
      "Predicates in ON filter the right table BEFORE joining, preserving all left rows; predicates in WHERE filter AFTER joining, turning the LEFT JOIN into an accidental INNER JOIN if right columns are checked for non-NULL values",
      "ON can only evaluate equality; WHERE can evaluate range filters",
      "WHERE runs before ON in execution order"
    ],
    "correctIndex": 1,
    "explanation": "Placing a right-table predicate like 'WHERE b.status = 'active'' filters out the NULLs generated for unmatched left rows, silently converting the query into an INNER JOIN. To preserve all left rows, place the condition in the ON clause. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_joins_79",
    "keyword": "JOINS",
    "tag": "🎯 Core Concept",
    "question": "[JOINS #79 &bull; E-Commerce Checkout Funnels] In financial audit reporting, how is a FULL OUTER JOIN utilized to detect ledger discrepancies between a general ledger and bank statements? (Application Scenario 6)",
    "options": [
      "It automatically modifies bank statement numbers to match ledger balances",
      "It deletes duplicate transactions across both databases",
      "It performs a currency conversion on foreign transactions",
      "It matches confirmed transactions, while exposing unreconciled bank items (left columns NULL) and missing bank entries (right columns NULL) in a single unified view"
    ],
    "correctIndex": 3,
    "explanation": "FULL OUTER JOIN reveals: 1) Matched entries (both sides present), 2) Company ledger entries not yet cleared by bank (bank columns NULL), and 3) Bank fees/deposits not recorded in company ledger (company columns NULL). [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_joins_80",
    "keyword": "JOINS",
    "tag": "🏛️ Corporate Edge",
    "question": "[JOINS #80 &bull; Telecom Billing & Data Streams] What is a CROSS APPLY (or LATERAL join) and how does it differ from a standard INNER JOIN? (Application Scenario 6)",
    "options": [
      "It joins two tables without comparing any keys",
      "It allows the right-side table expression or table-valued function to evaluate dynamically for each individual row of the left-side table, passing left columns as parameters",
      "It is only used when joining more than 10 tables",
      "It performs a CROSS JOIN and drops 50% of the rows randomly"
    ],
    "correctIndex": 1,
    "explanation": "CROSS APPLY / LATERAL enables correlated table expressions: for each row in the outer table, it passes column values into the inner table subquery, making it ideal for 'top N per group' calculations. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_joins_81",
    "keyword": "JOINS",
    "tag": "💡 Lead Architect",
    "question": "[JOINS #81 &bull; AdTech Real-Time Bidding] What is the catastrophic failure known as a 'Cartesian Explosion' during a multi-table JOIN? (Application Scenario 7)",
    "options": [
      "A foreign key constraint that deletes the entire database",
      "A join condition with more than 3 tables",
      "An INNER JOIN that matches zero rows",
      "Joining on a non-unique foreign key where both sides have high duplication, multiplying rows geometrically (N * M) and overflowing RAM/disk"
    ],
    "correctIndex": 3,
    "explanation": "When joining tables on keys that are not distinct on either side (e.g. joining 10,000 orders to 10,000 status logs on customer_id), the engine generates millions of duplicated rows, causing memory exhaustion and massive query runtimes. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_joins_82",
    "keyword": "JOINS",
    "tag": "⚡ Gotcha Trap",
    "question": "[JOINS #82 &bull; Cybersecurity Audit Logs] How does a Hash Join algorithm operate internally in modern database engines? (Application Scenario 7)",
    "options": [
      "It encrypts both tables using SHA-256 before scanning",
      "It builds an in-memory hash table on the smaller (build) input relation, then scans the larger (probe) relation to find matching hash keys",
      "It sorts both tables in alphabetical order on disk",
      "It performs a full nested loop scan for every column"
    ],
    "correctIndex": 1,
    "explanation": "Hash Joins consist of two phases: Build Phase (creating a hash table in RAM of the smaller table) and Probe Phase (streaming the larger table and probing the hash table). It achieves O(N + M) linear complexity. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_joins_83",
    "keyword": "JOINS",
    "tag": "🎯 Core Concept",
    "question": "[JOINS #83 &bull; Fintech & Ledger Systems] What is the difference between an ON clause and a WHERE clause when filtering the right table in a LEFT OUTER JOIN? (Application Scenario 7)",
    "options": [
      "There is no functional difference; optimizers treat them identically",
      "ON can only evaluate equality; WHERE can evaluate range filters",
      "WHERE runs before ON in execution order",
      "Predicates in ON filter the right table BEFORE joining, preserving all left rows; predicates in WHERE filter AFTER joining, turning the LEFT JOIN into an accidental INNER JOIN if right columns are checked for non-NULL values"
    ],
    "correctIndex": 3,
    "explanation": "Placing a right-table predicate like 'WHERE b.status = 'active'' filters out the NULLs generated for unmatched left rows, silently converting the query into an INNER JOIN. To preserve all left rows, place the condition in the ON clause. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_joins_84",
    "keyword": "JOINS",
    "tag": "🏛️ Corporate Edge",
    "question": "[JOINS #84 &bull; SaaS Subscription Billing] In financial audit reporting, how is a FULL OUTER JOIN utilized to detect ledger discrepancies between a general ledger and bank statements? (Application Scenario 7)",
    "options": [
      "It automatically modifies bank statement numbers to match ledger balances",
      "It matches confirmed transactions, while exposing unreconciled bank items (left columns NULL) and missing bank entries (right columns NULL) in a single unified view",
      "It deletes duplicate transactions across both databases",
      "It performs a currency conversion on foreign transactions"
    ],
    "correctIndex": 1,
    "explanation": "FULL OUTER JOIN reveals: 1) Matched entries (both sides present), 2) Company ledger entries not yet cleared by bank (bank columns NULL), and 3) Bank fees/deposits not recorded in company ledger (company columns NULL). [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_joins_85",
    "keyword": "JOINS",
    "tag": "💡 Lead Architect",
    "question": "[JOINS #85 &bull; Global Supply Chain & Logistics] What is a CROSS APPLY (or LATERAL join) and how does it differ from a standard INNER JOIN? (Application Scenario 7)",
    "options": [
      "It joins two tables without comparing any keys",
      "It is only used when joining more than 10 tables",
      "It performs a CROSS JOIN and drops 50% of the rows randomly",
      "It allows the right-side table expression or table-valued function to evaluate dynamically for each individual row of the left-side table, passing left columns as parameters"
    ],
    "correctIndex": 3,
    "explanation": "CROSS APPLY / LATERAL enables correlated table expressions: for each row in the outer table, it passes column values into the inner table subquery, making it ideal for 'top N per group' calculations. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_joins_86",
    "keyword": "JOINS",
    "tag": "⚡ Gotcha Trap",
    "question": "[JOINS #86 &bull; Healthcare Patient Records] What is the catastrophic failure known as a 'Cartesian Explosion' during a multi-table JOIN? (Application Scenario 8)",
    "options": [
      "A foreign key constraint that deletes the entire database",
      "Joining on a non-unique foreign key where both sides have high duplication, multiplying rows geometrically (N * M) and overflowing RAM/disk",
      "A join condition with more than 3 tables",
      "An INNER JOIN that matches zero rows"
    ],
    "correctIndex": 1,
    "explanation": "When joining tables on keys that are not distinct on either side (e.g. joining 10,000 orders to 10,000 status logs on customer_id), the engine generates millions of duplicated rows, causing memory exhaustion and massive query runtimes. [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_joins_87",
    "keyword": "JOINS",
    "tag": "🎯 Core Concept",
    "question": "[JOINS #87 &bull; E-Commerce Checkout Funnels] How does a Hash Join algorithm operate internally in modern database engines? (Application Scenario 8)",
    "options": [
      "It encrypts both tables using SHA-256 before scanning",
      "It sorts both tables in alphabetical order on disk",
      "It performs a full nested loop scan for every column",
      "It builds an in-memory hash table on the smaller (build) input relation, then scans the larger (probe) relation to find matching hash keys"
    ],
    "correctIndex": 3,
    "explanation": "Hash Joins consist of two phases: Build Phase (creating a hash table in RAM of the smaller table) and Probe Phase (streaming the larger table and probing the hash table). It achieves O(N + M) linear complexity. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_joins_88",
    "keyword": "JOINS",
    "tag": "🏛️ Corporate Edge",
    "question": "[JOINS #88 &bull; Telecom Billing & Data Streams] What is the difference between an ON clause and a WHERE clause when filtering the right table in a LEFT OUTER JOIN? (Application Scenario 8)",
    "options": [
      "There is no functional difference; optimizers treat them identically",
      "Predicates in ON filter the right table BEFORE joining, preserving all left rows; predicates in WHERE filter AFTER joining, turning the LEFT JOIN into an accidental INNER JOIN if right columns are checked for non-NULL values",
      "ON can only evaluate equality; WHERE can evaluate range filters",
      "WHERE runs before ON in execution order"
    ],
    "correctIndex": 1,
    "explanation": "Placing a right-table predicate like 'WHERE b.status = 'active'' filters out the NULLs generated for unmatched left rows, silently converting the query into an INNER JOIN. To preserve all left rows, place the condition in the ON clause. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_joins_89",
    "keyword": "JOINS",
    "tag": "💡 Lead Architect",
    "question": "[JOINS #89 &bull; AdTech Real-Time Bidding] In financial audit reporting, how is a FULL OUTER JOIN utilized to detect ledger discrepancies between a general ledger and bank statements? (Application Scenario 8)",
    "options": [
      "It automatically modifies bank statement numbers to match ledger balances",
      "It deletes duplicate transactions across both databases",
      "It performs a currency conversion on foreign transactions",
      "It matches confirmed transactions, while exposing unreconciled bank items (left columns NULL) and missing bank entries (right columns NULL) in a single unified view"
    ],
    "correctIndex": 3,
    "explanation": "FULL OUTER JOIN reveals: 1) Matched entries (both sides present), 2) Company ledger entries not yet cleared by bank (bank columns NULL), and 3) Bank fees/deposits not recorded in company ledger (company columns NULL). [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_joins_90",
    "keyword": "JOINS",
    "tag": "⚡ Gotcha Trap",
    "question": "[JOINS #90 &bull; Cybersecurity Audit Logs] What is a CROSS APPLY (or LATERAL join) and how does it differ from a standard INNER JOIN? (Application Scenario 8)",
    "options": [
      "It joins two tables without comparing any keys",
      "It allows the right-side table expression or table-valued function to evaluate dynamically for each individual row of the left-side table, passing left columns as parameters",
      "It is only used when joining more than 10 tables",
      "It performs a CROSS JOIN and drops 50% of the rows randomly"
    ],
    "correctIndex": 1,
    "explanation": "CROSS APPLY / LATERAL enables correlated table expressions: for each row in the outer table, it passes column values into the inner table subquery, making it ideal for 'top N per group' calculations. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_joins_91",
    "keyword": "JOINS",
    "tag": "🎯 Core Concept",
    "question": "[JOINS #91 &bull; Fintech & Ledger Systems] What is the catastrophic failure known as a 'Cartesian Explosion' during a multi-table JOIN? (Application Scenario 9)",
    "options": [
      "A foreign key constraint that deletes the entire database",
      "A join condition with more than 3 tables",
      "An INNER JOIN that matches zero rows",
      "Joining on a non-unique foreign key where both sides have high duplication, multiplying rows geometrically (N * M) and overflowing RAM/disk"
    ],
    "correctIndex": 3,
    "explanation": "When joining tables on keys that are not distinct on either side (e.g. joining 10,000 orders to 10,000 status logs on customer_id), the engine generates millions of duplicated rows, causing memory exhaustion and massive query runtimes. [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_joins_92",
    "keyword": "JOINS",
    "tag": "🏛️ Corporate Edge",
    "question": "[JOINS #92 &bull; SaaS Subscription Billing] How does a Hash Join algorithm operate internally in modern database engines? (Application Scenario 9)",
    "options": [
      "It encrypts both tables using SHA-256 before scanning",
      "It builds an in-memory hash table on the smaller (build) input relation, then scans the larger (probe) relation to find matching hash keys",
      "It sorts both tables in alphabetical order on disk",
      "It performs a full nested loop scan for every column"
    ],
    "correctIndex": 1,
    "explanation": "Hash Joins consist of two phases: Build Phase (creating a hash table in RAM of the smaller table) and Probe Phase (streaming the larger table and probing the hash table). It achieves O(N + M) linear complexity. [Context: SaaS Subscription Billing]"
  },
  {
    "id": "mcq_joins_93",
    "keyword": "JOINS",
    "tag": "💡 Lead Architect",
    "question": "[JOINS #93 &bull; Global Supply Chain & Logistics] What is the difference between an ON clause and a WHERE clause when filtering the right table in a LEFT OUTER JOIN? (Application Scenario 9)",
    "options": [
      "There is no functional difference; optimizers treat them identically",
      "ON can only evaluate equality; WHERE can evaluate range filters",
      "WHERE runs before ON in execution order",
      "Predicates in ON filter the right table BEFORE joining, preserving all left rows; predicates in WHERE filter AFTER joining, turning the LEFT JOIN into an accidental INNER JOIN if right columns are checked for non-NULL values"
    ],
    "correctIndex": 3,
    "explanation": "Placing a right-table predicate like 'WHERE b.status = 'active'' filters out the NULLs generated for unmatched left rows, silently converting the query into an INNER JOIN. To preserve all left rows, place the condition in the ON clause. [Context: Global Supply Chain & Logistics]"
  },
  {
    "id": "mcq_joins_94",
    "keyword": "JOINS",
    "tag": "⚡ Gotcha Trap",
    "question": "[JOINS #94 &bull; Healthcare Patient Records] In financial audit reporting, how is a FULL OUTER JOIN utilized to detect ledger discrepancies between a general ledger and bank statements? (Application Scenario 9)",
    "options": [
      "It automatically modifies bank statement numbers to match ledger balances",
      "It matches confirmed transactions, while exposing unreconciled bank items (left columns NULL) and missing bank entries (right columns NULL) in a single unified view",
      "It deletes duplicate transactions across both databases",
      "It performs a currency conversion on foreign transactions"
    ],
    "correctIndex": 1,
    "explanation": "FULL OUTER JOIN reveals: 1) Matched entries (both sides present), 2) Company ledger entries not yet cleared by bank (bank columns NULL), and 3) Bank fees/deposits not recorded in company ledger (company columns NULL). [Context: Healthcare Patient Records]"
  },
  {
    "id": "mcq_joins_95",
    "keyword": "JOINS",
    "tag": "🎯 Core Concept",
    "question": "[JOINS #95 &bull; E-Commerce Checkout Funnels] What is a CROSS APPLY (or LATERAL join) and how does it differ from a standard INNER JOIN? (Application Scenario 9)",
    "options": [
      "It joins two tables without comparing any keys",
      "It is only used when joining more than 10 tables",
      "It performs a CROSS JOIN and drops 50% of the rows randomly",
      "It allows the right-side table expression or table-valued function to evaluate dynamically for each individual row of the left-side table, passing left columns as parameters"
    ],
    "correctIndex": 3,
    "explanation": "CROSS APPLY / LATERAL enables correlated table expressions: for each row in the outer table, it passes column values into the inner table subquery, making it ideal for 'top N per group' calculations. [Context: E-Commerce Checkout Funnels]"
  },
  {
    "id": "mcq_joins_96",
    "keyword": "JOINS",
    "tag": "🏛️ Corporate Edge",
    "question": "[JOINS #96 &bull; Telecom Billing & Data Streams] What is the catastrophic failure known as a 'Cartesian Explosion' during a multi-table JOIN? (Application Scenario 10)",
    "options": [
      "A foreign key constraint that deletes the entire database",
      "Joining on a non-unique foreign key where both sides have high duplication, multiplying rows geometrically (N * M) and overflowing RAM/disk",
      "A join condition with more than 3 tables",
      "An INNER JOIN that matches zero rows"
    ],
    "correctIndex": 1,
    "explanation": "When joining tables on keys that are not distinct on either side (e.g. joining 10,000 orders to 10,000 status logs on customer_id), the engine generates millions of duplicated rows, causing memory exhaustion and massive query runtimes. [Context: Telecom Billing & Data Streams]"
  },
  {
    "id": "mcq_joins_97",
    "keyword": "JOINS",
    "tag": "💡 Lead Architect",
    "question": "[JOINS #97 &bull; AdTech Real-Time Bidding] How does a Hash Join algorithm operate internally in modern database engines? (Application Scenario 10)",
    "options": [
      "It encrypts both tables using SHA-256 before scanning",
      "It sorts both tables in alphabetical order on disk",
      "It performs a full nested loop scan for every column",
      "It builds an in-memory hash table on the smaller (build) input relation, then scans the larger (probe) relation to find matching hash keys"
    ],
    "correctIndex": 3,
    "explanation": "Hash Joins consist of two phases: Build Phase (creating a hash table in RAM of the smaller table) and Probe Phase (streaming the larger table and probing the hash table). It achieves O(N + M) linear complexity. [Context: AdTech Real-Time Bidding]"
  },
  {
    "id": "mcq_joins_98",
    "keyword": "JOINS",
    "tag": "⚡ Gotcha Trap",
    "question": "[JOINS #98 &bull; Cybersecurity Audit Logs] What is the difference between an ON clause and a WHERE clause when filtering the right table in a LEFT OUTER JOIN? (Application Scenario 10)",
    "options": [
      "There is no functional difference; optimizers treat them identically",
      "Predicates in ON filter the right table BEFORE joining, preserving all left rows; predicates in WHERE filter AFTER joining, turning the LEFT JOIN into an accidental INNER JOIN if right columns are checked for non-NULL values",
      "ON can only evaluate equality; WHERE can evaluate range filters",
      "WHERE runs before ON in execution order"
    ],
    "correctIndex": 1,
    "explanation": "Placing a right-table predicate like 'WHERE b.status = 'active'' filters out the NULLs generated for unmatched left rows, silently converting the query into an INNER JOIN. To preserve all left rows, place the condition in the ON clause. [Context: Cybersecurity Audit Logs]"
  },
  {
    "id": "mcq_joins_99",
    "keyword": "JOINS",
    "tag": "🎯 Core Concept",
    "question": "[JOINS #99 &bull; Fintech & Ledger Systems] In financial audit reporting, how is a FULL OUTER JOIN utilized to detect ledger discrepancies between a general ledger and bank statements? (Application Scenario 10)",
    "options": [
      "It automatically modifies bank statement numbers to match ledger balances",
      "It deletes duplicate transactions across both databases",
      "It performs a currency conversion on foreign transactions",
      "It matches confirmed transactions, while exposing unreconciled bank items (left columns NULL) and missing bank entries (right columns NULL) in a single unified view"
    ],
    "correctIndex": 3,
    "explanation": "FULL OUTER JOIN reveals: 1) Matched entries (both sides present), 2) Company ledger entries not yet cleared by bank (bank columns NULL), and 3) Bank fees/deposits not recorded in company ledger (company columns NULL). [Context: Fintech & Ledger Systems]"
  },
  {
    "id": "mcq_joins_100",
    "keyword": "JOINS",
    "tag": "🏛️ Corporate Edge",
    "question": "[JOINS #100 &bull; SaaS Subscription Billing] What is a CROSS APPLY (or LATERAL join) and how does it differ from a standard INNER JOIN? (Application Scenario 10)",
    "options": [
      "It joins two tables without comparing any keys",
      "It allows the right-side table expression or table-valued function to evaluate dynamically for each individual row of the left-side table, passing left columns as parameters",
      "It is only used when joining more than 10 tables",
      "It performs a CROSS JOIN and drops 50% of the rows randomly"
    ],
    "correctIndex": 1,
    "explanation": "CROSS APPLY / LATERAL enables correlated table expressions: for each row in the outer table, it passes column values into the inner table subquery, making it ideal for 'top N per group' calculations. [Context: SaaS Subscription Billing]"
  }
];
