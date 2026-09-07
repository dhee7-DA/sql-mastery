// =============================================================================
// THE 550 MASTER MCQ VAULT: INSTITUTIONAL-GRADE TECHNICAL QUESTIONS
// Foundational SQL, Aggregations, Spatial Coordinates & Statistical Medians
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
      "Employees table requires a subquery to count rows"
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
      "Employees table requires a subquery to count rows",
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
      "Employees table requires a subquery to count rows",
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
      "Employees table requires a subquery to count rows"
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
      "Employees table requires a subquery to count rows",
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
      "Employees table requires a subquery to count rows"
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
      "Employees table requires a subquery to count rows",
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
      "Employees table requires a subquery to count rows"
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
      "Employees table requires a subquery to count rows",
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
      "Employees table requires a subquery to count rows",
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
    "question": "[SELECT #4] Can a SELECT clause contain a scalar subquery that computes a value per row?",
    "options": [
      "Only if the subquery returns at least 10 rows",
      "No, subqueries are strictly restricted to the FROM clause",
      "Only in NoSQL databases",
      "Yes, scalar subqueries returning a single value per row can be projected directly in SELECT"
    ],
    "correctIndex": 3,
    "explanation": "Correlated scalar subqueries in SELECT are valid, though they must return at most 1 row and 1 column, and can incur O(N) performance overhead."
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
    "question": "[SELECT #9] Can a SELECT clause contain a scalar subquery that computes a value per row? (Scenario Variant 2)",
    "options": [
      "Only in NoSQL databases",
      "Only if the subquery returns at least 10 rows",
      "Yes, scalar subqueries returning a single value per row can be projected directly in SELECT",
      "No, subqueries are strictly restricted to the FROM clause"
    ],
    "correctIndex": 2,
    "explanation": "Correlated scalar subqueries in SELECT are valid, though they must return at most 1 row and 1 column, and can incur O(N) performance overhead."
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
    "question": "[SELECT #14] Can a SELECT clause contain a scalar subquery that computes a value per row? (Scenario Variant 3)",
    "options": [
      "Yes, scalar subqueries returning a single value per row can be projected directly in SELECT",
      "Only in NoSQL databases",
      "No, subqueries are strictly restricted to the FROM clause",
      "Only if the subquery returns at least 10 rows"
    ],
    "correctIndex": 0,
    "explanation": "Correlated scalar subqueries in SELECT are valid, though they must return at most 1 row and 1 column, and can incur O(N) performance overhead."
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
    "question": "[SELECT #19] Can a SELECT clause contain a scalar subquery that computes a value per row? (Scenario Variant 4)",
    "options": [
      "Only if the subquery returns at least 10 rows",
      "Only in NoSQL databases",
      "Yes, scalar subqueries returning a single value per row can be projected directly in SELECT",
      "No, subqueries are strictly restricted to the FROM clause"
    ],
    "correctIndex": 2,
    "explanation": "Correlated scalar subqueries in SELECT are valid, though they must return at most 1 row and 1 column, and can incur O(N) performance overhead."
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
    "question": "[SELECT #24] Can a SELECT clause contain a scalar subquery that computes a value per row? (Scenario Variant 5)",
    "options": [
      "Only in NoSQL databases",
      "No, subqueries are strictly restricted to the FROM clause",
      "Only if the subquery returns at least 10 rows",
      "Yes, scalar subqueries returning a single value per row can be projected directly in SELECT"
    ],
    "correctIndex": 3,
    "explanation": "Correlated scalar subqueries in SELECT are valid, though they must return at most 1 row and 1 column, and can incur O(N) performance overhead."
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
    "question": "[SELECT #29] Can a SELECT clause contain a scalar subquery that computes a value per row? (Scenario Variant 6)",
    "options": [
      "Yes, scalar subqueries returning a single value per row can be projected directly in SELECT",
      "Only in NoSQL databases",
      "Only if the subquery returns at least 10 rows",
      "No, subqueries are strictly restricted to the FROM clause"
    ],
    "correctIndex": 0,
    "explanation": "Correlated scalar subqueries in SELECT are valid, though they must return at most 1 row and 1 column, and can incur O(N) performance overhead."
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
    "question": "[SELECT #34] Can a SELECT clause contain a scalar subquery that computes a value per row? (Scenario Variant 7)",
    "options": [
      "Only in NoSQL databases",
      "Only if the subquery returns at least 10 rows",
      "No, subqueries are strictly restricted to the FROM clause",
      "Yes, scalar subqueries returning a single value per row can be projected directly in SELECT"
    ],
    "correctIndex": 3,
    "explanation": "Correlated scalar subqueries in SELECT are valid, though they must return at most 1 row and 1 column, and can incur O(N) performance overhead."
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
    "question": "[SELECT #39] Can a SELECT clause contain a scalar subquery that computes a value per row? (Scenario Variant 8)",
    "options": [
      "Yes, scalar subqueries returning a single value per row can be projected directly in SELECT",
      "Only in NoSQL databases",
      "Only if the subquery returns at least 10 rows",
      "No, subqueries are strictly restricted to the FROM clause"
    ],
    "correctIndex": 0,
    "explanation": "Correlated scalar subqueries in SELECT are valid, though they must return at most 1 row and 1 column, and can incur O(N) performance overhead."
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
    "question": "[SELECT #44] Can a SELECT clause contain a scalar subquery that computes a value per row? (Scenario Variant 9)",
    "options": [
      "Only if the subquery returns at least 10 rows",
      "No, subqueries are strictly restricted to the FROM clause",
      "Only in NoSQL databases",
      "Yes, scalar subqueries returning a single value per row can be projected directly in SELECT"
    ],
    "correctIndex": 3,
    "explanation": "Correlated scalar subqueries in SELECT are valid, though they must return at most 1 row and 1 column, and can incur O(N) performance overhead."
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
    "question": "[SELECT #49] Can a SELECT clause contain a scalar subquery that computes a value per row? (Scenario Variant 10)",
    "options": [
      "Yes, scalar subqueries returning a single value per row can be projected directly in SELECT",
      "Only in NoSQL databases",
      "Only if the subquery returns at least 10 rows",
      "No, subqueries are strictly restricted to the FROM clause"
    ],
    "correctIndex": 0,
    "explanation": "Correlated scalar subqueries in SELECT are valid, though they must return at most 1 row and 1 column, and can incur O(N) performance overhead."
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
    "question": "[FROM #2] What is a \"derived table\" in the context of the FROM clause?",
    "options": [
      "A table created with the CREATE TABLE command",
      "A materialized view refreshed hourly",
      "A subquery placed inside the FROM clause that produces a temporary virtual relation with a required alias",
      "A physical disk backup partition"
    ],
    "correctIndex": 2,
    "explanation": "A derived table (or inline view) is a subquery in the FROM clause, e.g., \"FROM (SELECT id FROM Users) AS u\". Most engines strictly require an alias."
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
    "question": "[FROM #7] What is a \"derived table\" in the context of the FROM clause? (Scenario Variant 2)",
    "options": [
      "A materialized view refreshed hourly",
      "A table created with the CREATE TABLE command",
      "A physical disk backup partition",
      "A subquery placed inside the FROM clause that produces a temporary virtual relation with a required alias"
    ],
    "correctIndex": 3,
    "explanation": "A derived table (or inline view) is a subquery in the FROM clause, e.g., \"FROM (SELECT id FROM Users) AS u\". Most engines strictly require an alias."
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
    "question": "[FROM #12] What is a \"derived table\" in the context of the FROM clause? (Scenario Variant 3)",
    "options": [
      "A physical disk backup partition",
      "A subquery placed inside the FROM clause that produces a temporary virtual relation with a required alias",
      "A materialized view refreshed hourly",
      "A table created with the CREATE TABLE command"
    ],
    "correctIndex": 1,
    "explanation": "A derived table (or inline view) is a subquery in the FROM clause, e.g., \"FROM (SELECT id FROM Users) AS u\". Most engines strictly require an alias."
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
    "question": "[FROM #17] What is a \"derived table\" in the context of the FROM clause? (Scenario Variant 4)",
    "options": [
      "A table created with the CREATE TABLE command",
      "A subquery placed inside the FROM clause that produces a temporary virtual relation with a required alias",
      "A materialized view refreshed hourly",
      "A physical disk backup partition"
    ],
    "correctIndex": 1,
    "explanation": "A derived table (or inline view) is a subquery in the FROM clause, e.g., \"FROM (SELECT id FROM Users) AS u\". Most engines strictly require an alias."
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
    "question": "[FROM #22] What is a \"derived table\" in the context of the FROM clause? (Scenario Variant 5)",
    "options": [
      "A subquery placed inside the FROM clause that produces a temporary virtual relation with a required alias",
      "A materialized view refreshed hourly",
      "A table created with the CREATE TABLE command",
      "A physical disk backup partition"
    ],
    "correctIndex": 0,
    "explanation": "A derived table (or inline view) is a subquery in the FROM clause, e.g., \"FROM (SELECT id FROM Users) AS u\". Most engines strictly require an alias."
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
    "question": "[FROM #27] What is a \"derived table\" in the context of the FROM clause? (Scenario Variant 6)",
    "options": [
      "A materialized view refreshed hourly",
      "A subquery placed inside the FROM clause that produces a temporary virtual relation with a required alias",
      "A physical disk backup partition",
      "A table created with the CREATE TABLE command"
    ],
    "correctIndex": 1,
    "explanation": "A derived table (or inline view) is a subquery in the FROM clause, e.g., \"FROM (SELECT id FROM Users) AS u\". Most engines strictly require an alias."
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
    "question": "[FROM #32] What is a \"derived table\" in the context of the FROM clause? (Scenario Variant 7)",
    "options": [
      "A physical disk backup partition",
      "A table created with the CREATE TABLE command",
      "A materialized view refreshed hourly",
      "A subquery placed inside the FROM clause that produces a temporary virtual relation with a required alias"
    ],
    "correctIndex": 3,
    "explanation": "A derived table (or inline view) is a subquery in the FROM clause, e.g., \"FROM (SELECT id FROM Users) AS u\". Most engines strictly require an alias."
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
    "question": "[FROM #37] What is a \"derived table\" in the context of the FROM clause? (Scenario Variant 8)",
    "options": [
      "A materialized view refreshed hourly",
      "A table created with the CREATE TABLE command",
      "A subquery placed inside the FROM clause that produces a temporary virtual relation with a required alias",
      "A physical disk backup partition"
    ],
    "correctIndex": 2,
    "explanation": "A derived table (or inline view) is a subquery in the FROM clause, e.g., \"FROM (SELECT id FROM Users) AS u\". Most engines strictly require an alias."
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
    "question": "[FROM #42] What is a \"derived table\" in the context of the FROM clause? (Scenario Variant 9)",
    "options": [
      "A physical disk backup partition",
      "A table created with the CREATE TABLE command",
      "A materialized view refreshed hourly",
      "A subquery placed inside the FROM clause that produces a temporary virtual relation with a required alias"
    ],
    "correctIndex": 3,
    "explanation": "A derived table (or inline view) is a subquery in the FROM clause, e.g., \"FROM (SELECT id FROM Users) AS u\". Most engines strictly require an alias."
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
    "question": "[FROM #47] What is a \"derived table\" in the context of the FROM clause? (Scenario Variant 10)",
    "options": [
      "A subquery placed inside the FROM clause that produces a temporary virtual relation with a required alias",
      "A materialized view refreshed hourly",
      "A physical disk backup partition",
      "A table created with the CREATE TABLE command"
    ],
    "correctIndex": 0,
    "explanation": "A derived table (or inline view) is a subquery in the FROM clause, e.g., \"FROM (SELECT id FROM Users) AS u\". Most engines strictly require an alias."
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
      "User variables cannot be used in subqueries"
    ],
    "correctIndex": 0,
    "explanation": "The MySQL manual explicitly warns that order of evaluation of expressions involving user variables is undefined and may change between releases. Window functions (ROW_NUMBER) should always be used in MySQL 8.0+."
  },
  {
    "id": "mcq_math_14",
    "keyword": "MATH & MEDIANS",
    "tag": "🎯 Core Concept",
    "question": "[MATH & MEDIANS #14] Which window function generates the exact fractional relative rank (from 0.0 to 1.0) of a row within a partition?",
    "options": [
      "DENSE_RANK()",
      "PERCENT_RANK()",
      "ROW_NUMBER()",
      "NTILE(100)"
    ],
    "correctIndex": 1,
    "explanation": "PERCENT_RANK() calculates (rank - 1) / (total_rows - 1), producing values between 0.0 and 1.0. The median can be located where PERCENT_RANK() is closest to 0.5."
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
    "question": "[MATH & MEDIANS #47] In MySQL, can a window function like ROW_NUMBER() be used directly inside a WHERE clause without a subquery or CTE?",
    "options": [
      "Yes, as long as it has an OVER (ORDER BY) clause",
      "Yes, if placed inside parenthesis",
      "No, window functions are evaluated in the SELECT phase, which executes AFTER the WHERE clause; a CTE or derived table is required",
      "Yes, in MySQL 8.0 but not in MySQL 5.7"
    ],
    "correctIndex": 2,
    "explanation": "SQL execution order is FROM -> WHERE -> GROUP BY -> HAVING -> WINDOW/SELECT -> ORDER BY -> LIMIT. Because WHERE runs before window functions exist, filtering on ROW_NUMBER() requires wrapping it in a CTE or subquery."
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
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MCQS_VAULT_500: window.MCQS_VAULT_500 };
}
